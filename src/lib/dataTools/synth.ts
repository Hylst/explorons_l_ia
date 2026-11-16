// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createRng, gaussian } from '../random.ts';

/**
 * Générateur de données synthétiques à graine : une même description et une même graine redonnent exactement
 * le même tableau. Les valeurs sont tirées de lois simples décrites par l'utilisateur ; elles ne reproduisent
 * aucune personne ni aucun jeu de données réel.
 */

export type ColumnSpec =
  | { kind: 'identifiant'; name: string; prefix: string }
  | { kind: 'entier'; name: string; min: number; max: number; missingRate: number }
  | { kind: 'décimal'; name: string; distribution: 'uniforme' | 'normale'; a: number; b: number; decimals: number; missingRate: number }
  | { kind: 'linéaire'; name: string; source: string; slope: number; intercept: number; noise: number; decimals: number; missingRate: number }
  | { kind: 'catégorie'; name: string; values: string; missingRate: number }
  | { kind: 'booléen'; name: string; probability: number; missingRate: number }
  | { kind: 'date'; name: string; start: string; end: string; missingRate: number };

export const MAX_SYNTH_ROWS = 10_000;

/** « A:3, B:1, C » : catégories avec poids (1 par défaut). */
export function parseCategories(text: string): { value: string; weight: number }[] {
  return text
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const match = part.match(/^(.*?)(?::\s*(\d+(?:[.,]\d+)?))?$/);
      const weight = match?.[2] ? Number(match[2].replace(',', '.')) : 1;
      return { value: (match?.[1] ?? part).trim(), weight: Number.isFinite(weight) && weight > 0 ? weight : 1 };
    })
    .filter((c) => c.value !== '');
}

const round = (value: number, decimals: number) => {
  const f = 10 ** Math.max(0, Math.min(6, decimals));
  return Math.round(value * f) / f;
};

/** Vérifie une description ; renvoie la liste des problèmes (vide si tout va bien). */
export function validateSpecs(specs: ColumnSpec[]): string[] {
  const problems: string[] = [];
  const names = specs.map((s) => s.name.trim());
  if (specs.length === 0) problems.push('Ajoutez au moins une colonne.');
  names.forEach((name, i) => {
    if (!name) problems.push(`La colonne ${i + 1} n'a pas de nom.`);
    else if (names.indexOf(name) !== i) problems.push(`Le nom «\u00A0${name}\u00A0» est utilisé deux fois.`);
  });
  specs.forEach((s) => {
    if (s.kind === 'entier' && !(s.min <= s.max)) problems.push(`«\u00A0${s.name}\u00A0»\u00A0: le minimum dépasse le maximum.`);
    if (s.kind === 'décimal' && s.distribution === 'uniforme' && !(s.a <= s.b)) problems.push(`«\u00A0${s.name}\u00A0»\u00A0: le minimum dépasse le maximum.`);
    if (s.kind === 'décimal' && s.distribution === 'normale' && !(s.b >= 0)) problems.push(`«\u00A0${s.name}\u00A0»\u00A0: l'écart-type doit être positif.`);
    if (s.kind === 'catégorie' && parseCategories(s.values).length === 0) problems.push(`«\u00A0${s.name}\u00A0»\u00A0: indiquez au moins une catégorie.`);
    if (s.kind === 'date' && !(Date.parse(s.start) <= Date.parse(s.end))) problems.push(`«\u00A0${s.name}\u00A0»\u00A0: dates invalides ou dans le désordre.`);
    if (s.kind === 'linéaire') {
      const source = specs.find((o) => o.name.trim() === s.source.trim());
      if (!source) problems.push(`«\u00A0${s.name}\u00A0»\u00A0: la colonne source «\u00A0${s.source}\u00A0» n'existe pas.`);
      else if (!['entier', 'décimal', 'linéaire'].includes(source.kind)) problems.push(`«\u00A0${s.name}\u00A0»\u00A0: la colonne source doit être numérique.`);
      else if (specs.indexOf(source) > specs.indexOf(s)) problems.push(`«\u00A0${s.name}\u00A0»\u00A0: placez la colonne source «\u00A0${s.source}\u00A0» avant elle.`);
    }
  });
  return problems;
}

/** Génère le tableau (en-têtes et lignes de texte, cellule vide pour une valeur manquante). */
export function generateTable(specs: ColumnSpec[], rowCount: number, seed: number): { headers: string[]; rows: string[][] } {
  const rng = createRng(seed);
  const n = Math.max(1, Math.min(MAX_SYNTH_ROWS, Math.floor(rowCount)));
  const headers = specs.map((s) => s.name.trim());
  const numeric: Record<string, (number | null)[]> = {};
  const columns: string[][] = specs.map((spec) => {
    const out: string[] = [];
    const nums: (number | null)[] = [];
    const categories = spec.kind === 'catégorie' ? parseCategories(spec.values) : [];
    const totalWeight = categories.reduce((s, c) => s + c.weight, 0);
    for (let i = 0; i < n; i++) {
      // Le tirage de la valeur a toujours lieu, même si elle est ensuite effacée : la graine reste stable.
      let value = '';
      let num: number | null = null;
      switch (spec.kind) {
        case 'identifiant':
          value = `${spec.prefix}${String(i + 1).padStart(String(n).length, '0')}`;
          break;
        case 'entier':
          num = Math.floor(spec.min + rng() * (spec.max - spec.min + 1));
          value = String(num);
          break;
        case 'décimal':
          num = round(spec.distribution === 'uniforme' ? spec.a + rng() * (spec.b - spec.a) : spec.a + spec.b * gaussian(rng), spec.decimals);
          value = String(num);
          break;
        case 'linéaire': {
          const x = numeric[spec.source.trim()]?.[i] ?? null;
          const noise = spec.noise * gaussian(rng);
          num = x === null ? null : round(spec.slope * x + spec.intercept + noise, spec.decimals);
          value = num === null ? '' : String(num);
          break;
        }
        case 'catégorie': {
          let pick = rng() * totalWeight;
          value = categories[categories.length - 1]?.value ?? '';
          for (const c of categories) {
            if ((pick -= c.weight) < 0) {
              value = c.value;
              break;
            }
          }
          break;
        }
        case 'booléen':
          value = rng() < spec.probability ? 'oui' : 'non';
          break;
        case 'date': {
          const from = Date.parse(spec.start);
          const to = Date.parse(spec.end);
          value = new Date(from + Math.floor(rng() * ((to - from) / 86_400_000 + 1)) * 86_400_000).toISOString().slice(0, 10);
          break;
        }
      }
      const missingRate = 'missingRate' in spec ? spec.missingRate : 0;
      if (missingRate > 0 && rng() < missingRate) {
        value = '';
        num = null;
      }
      out.push(value);
      nums.push(num);
    }
    numeric[spec.name.trim()] = nums;
    return out;
  });
  const rows = Array.from({ length: n }, (_, i) => columns.map((col) => col[i]));
  return { headers, rows };
}
