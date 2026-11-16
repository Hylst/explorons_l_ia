// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { mean, pearson, quantileSorted, std } from './stats.ts';

/**
 * Profil d'un jeu de données tabulaire et liste de points d'attention avant un apprentissage automatique.
 * Tout est calculé à partir des valeurs du fichier ; les seuils utilisés sont des repères courants, rappelés
 * dans les messages, pas des règles absolues.
 */

export type ColumnKind = 'numérique' | 'booléenne' | 'date' | 'catégorielle' | 'texte' | 'vide';

export interface ColumnProfile {
  name: string;
  kind: ColumnKind;
  missing: number;
  unique: number;
  /** Valeurs non manquantes qui ne correspondent pas au type majoritaire (ex. « abc » dans une colonne numérique). */
  mismatched: number;
  numeric?: { min: number; max: number; mean: number; median: number; std: number; q1: number; q3: number; outliers: number };
  top: { value: string; count: number }[];
}

export interface Issue {
  level: 'attention' | 'info';
  column?: string;
  title: string;
  detail: string;
}

export interface DatasetProfile {
  rows: number;
  columns: ColumnProfile[];
  duplicateRows: number;
  missingCells: number;
  correlations: { a: string; b: string; r: number; n: number }[];
  target?: { name: string; classes: { value: string; count: number }[] };
  issues: Issue[];
}

export const MAX_CORRELATION_COLUMNS = 30;

const MISSING = new Set(['', 'na', 'n/a', 'nan', 'null', 'none', '?', '#n/a']);
const TRUE_FALSE = new Set(['true', 'false', 'vrai', 'faux', 'oui', 'non', 'yes', 'no']);

export const isMissing = (value: string) => MISSING.has(value.trim().toLowerCase());

/** Nombre écrit avec un point ou une virgule décimale (« 3.5 », « 3,5 », « -1e3 ») ; null sinon. */
export function toNumber(value: string): number | null {
  const text = value.trim().replace(/\s/g, '');
  if (!/^[-+]?(\d+([.,]\d*)?|[.,]\d+)(e[-+]?\d+)?$/i.test(text)) return null;
  const n = Number(text.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

const isDate = (value: string) =>
  /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2})?)?/.test(value.trim()) || /^\d{2}\/\d{2}\/\d{4}$/.test(value.trim());

function inferKind(values: string[], rowCount: number): { kind: ColumnKind; mismatched: number } {
  if (values.length === 0) return { kind: 'vide', mismatched: 0 };
  const numeric = values.filter((v) => toNumber(v) !== null).length;
  const bool = values.filter((v) => TRUE_FALSE.has(v.trim().toLowerCase())).length;
  const dates = values.filter(isDate).length;
  const share = (n: number) => n / values.length;
  if (share(bool) >= 0.95) return { kind: 'booléenne', mismatched: values.length - bool };
  if (share(numeric) >= 0.9) return { kind: 'numérique', mismatched: values.length - numeric };
  if (share(dates) >= 0.9) return { kind: 'date', mismatched: values.length - dates };
  const unique = new Set(values).size;
  const kind = unique <= Math.max(20, rowCount * 0.05) ? 'catégorielle' : 'texte';
  return { kind, mismatched: 0 };
}

export function profileDataset(headers: string[], rows: string[][], targetName?: string): DatasetProfile {
  const issues: Issue[] = [];
  const rowCount = rows.length;
  const numericColumns: { name: string; values: (number | null)[] }[] = [];

  const columns: ColumnProfile[] = headers.map((name, index) => {
    const raw = rows.map((row) => row[index] ?? '');
    const present = raw.filter((v) => !isMissing(v));
    const missing = raw.length - present.length;
    const counts = new Map<string, number>();
    for (const v of present) counts.set(v.trim(), (counts.get(v.trim()) ?? 0) + 1);
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([value, count]) => ({ value, count }));
    const { kind, mismatched } = inferKind(present, rowCount);
    const profile: ColumnProfile = { name, kind, missing, unique: counts.size, mismatched, top };

    if (kind === 'numérique') {
      const parsed = raw.map((v) => (isMissing(v) ? null : toNumber(v)));
      const finite = parsed.filter((v): v is number => v !== null);
      const sorted = [...finite].sort((a, b) => a - b);
      const q1 = quantileSorted(sorted, 0.25);
      const q3 = quantileSorted(sorted, 0.75);
      const iqr = q3 - q1;
      const outliers = iqr > 0 ? finite.filter((v) => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr).length : 0;
      profile.numeric = {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        mean: mean(finite),
        median: quantileSorted(sorted, 0.5),
        std: std(finite),
        q1,
        q3,
        outliers,
      };
      numericColumns.push({ name, values: parsed });
    }
    return profile;
  });

  // Doublons exacts (lignes entières identiques)
  const seenRows = new Set<string>();
  let duplicateRows = 0;
  for (const row of rows) {
    const key = JSON.stringify(row);
    if (seenRows.has(key)) duplicateRows++;
    else seenRows.add(key);
  }
  const missingCells = columns.reduce((sum, c) => sum + c.missing, 0);

  if (rowCount < 100) {
    issues.push({
      level: 'info',
      title: `Peu de lignes (${rowCount})`,
      detail: "Avec si peu d'exemples, un modèle apprend surtout le bruit et les mesures de performance varient beaucoup d'un découpage à l'autre. Préférez des modèles simples et une validation croisée.",
    });
  }
  if (duplicateRows > 0) {
    issues.push({
      level: 'attention',
      title: `${duplicateRows} ligne(s) en double`,
      detail: "Une ligne présente à la fois dans les données d'entraînement et de test gonfle artificiellement les résultats. Vérifiez s'il s'agit de vrais doublons avant de les retirer.",
    });
  }

  for (const c of columns) {
    const missingShare = rowCount ? c.missing / rowCount : 0;
    if (c.kind === 'vide') {
      issues.push({ level: 'attention', column: c.name, title: 'Colonne vide', detail: "Aucune valeur\u00A0: elle n'apporte rien au modèle." });
      continue;
    }
    if (c.missing > 0) {
      issues.push({
        level: missingShare > 0.3 ? 'attention' : 'info',
        column: c.name,
        title: `${c.missing} valeur(s) manquante(s) (${Math.round(missingShare * 100)}\u00A0%)`,
        detail:
          missingShare > 0.3
            ? "Au-delà d'environ 30\u00A0% de valeurs manquantes, la colonne est souvent peu fiable\u00A0: la compléter (imputation) peut inventer de l'information. Demandez-vous aussi pourquoi elles manquent\u00A0: l'absence peut elle-même être liée à la cible."
            : "À traiter avant l'entraînement\u00A0: retirer les lignes, compléter (moyenne, médiane, valeur la plus fréquente) ou ajouter une colonne qui signale l'absence.",
      });
    }
    if (c.unique === 1 && c.missing < rowCount) {
      issues.push({ level: 'attention', column: c.name, title: 'Valeur constante', detail: 'Une seule valeur sur toutes les lignes\u00A0: la colonne ne peut rien expliquer, elle peut être retirée.' });
    }
    const present = rowCount - c.missing;
    // Presque toutes les valeurs distinctes (les doublons de lignes n'empêchent pas la détection). Pour une colonne
    // numérique, on exige en plus une suite d'entiers presque continue (1, 2, 3...), sinon une mesure précise serait signalée.
    if ((c.kind === 'texte' || c.kind === 'numérique') && present >= 20 && c.unique >= present * 0.95 && c.name !== targetName) {
      const sequence =
        c.kind === 'numérique' && c.numeric && Number.isInteger(c.numeric.min) && Number.isInteger(c.numeric.max) &&
        c.numeric.max - c.numeric.min + 1 <= c.unique * 1.5;
      if (c.kind === 'texte' || sequence) {
        issues.push({
          level: 'attention',
          column: c.name,
          title: 'Ressemble à un identifiant',
          detail: "Toutes les valeurs sont différentes. Un identifiant ne généralise pas\u00A0: s'il sert d'entrée, le modèle peut apprendre par cœur. À exclure des variables d'entrée, sauf raison précise.",
        });
      }
    }
    if (c.mismatched > 0) {
      issues.push({
        level: 'attention',
        column: c.name,
        title: `${c.mismatched} valeur(s) qui ne correspondent pas au type «\u00A0${c.kind}\u00A0»`,
        detail: 'Faute de frappe, unité écrite dans la cellule, ou code spécial («\u00A0inconnu\u00A0», «\u00A0-999\u00A0»...)\u00A0: à corriger ou à considérer comme manquant.',
      });
    }
    if (c.numeric && c.numeric.outliers > 0) {
      issues.push({
        level: 'info',
        column: c.name,
        title: `${c.numeric.outliers} valeur(s) hors de l'intervalle habituel`,
        detail:
          "Valeurs à plus de 1,5 écart interquartile du premier ou du troisième quartile (règle de Tukey). Ce n'est pas forcément une erreur\u00A0: vérifiez la saisie, puis gardez, plafonnez ou retirez en le justifiant.",
      });
    }
    if (c.kind === 'catégorielle' && c.unique > 50) {
      issues.push({ level: 'info', column: c.name, title: `${c.unique} catégories`, detail: 'Beaucoup de modalités\u00A0: regroupez les plus rares ou utilisez un encodage adapté, sinon le modèle aura peu d’exemples par catégorie.' });
    }
  }

  // Corrélations entre colonnes numériques (Pearson, paires complètes), limitées aux 30 premières colonnes
  // numériques pour garder un calcul rapide dans le navigateur.
  const correlations: DatasetProfile['correlations'] = [];
  // La cible passe en premier pour que la recherche de fuite la couvre toujours.
  const corrColumns = [
    ...numericColumns.filter((c) => c.name === targetName),
    ...numericColumns.filter((c) => c.name !== targetName),
  ].slice(0, MAX_CORRELATION_COLUMNS);
  for (let i = 0; i < corrColumns.length; i++) {
    for (let j = i + 1; j < corrColumns.length; j++) {
      const { r, n } = pearson(corrColumns[i].values, corrColumns[j].values);
      if (Number.isFinite(r)) correlations.push({ a: corrColumns[i].name, b: corrColumns[j].name, r, n });
    }
  }
  for (const pair of correlations) {
    if (Math.abs(pair.r) >= 0.95 && pair.a !== targetName && pair.b !== targetName) {
      issues.push({
        level: 'info',
        column: `${pair.a} / ${pair.b}`,
        title: `Colonnes très corrélées (r = ${pair.r.toFixed(2).replace('.', ',')})`,
        detail: "Elles portent presque la même information. Ce n'est pas une erreur, mais l'une des deux est souvent superflue, et l'interprétation des coefficients d'un modèle linéaire devient instable.",
      });
    }
  }

  // Cible : équilibre des classes et fuite possible
  let target: DatasetProfile['target'];
  const targetIndex = targetName ? headers.indexOf(targetName) : -1;
  if (targetName && targetIndex >= 0) {
    const tc = columns[targetIndex];
    const targetValues = rows.map((row) => (row[targetIndex] ?? '').trim());
    if (tc.kind !== 'numérique' || tc.unique <= 10) {
      const classes = tc.top.length < tc.unique ? countAll(targetValues) : tc.top;
      target = { name: targetName, classes };
      const total = classes.reduce((s, c) => s + c.count, 0);
      const minority = classes.length > 1 ? Math.min(...classes.map((c) => c.count)) / total : 1;
      if (classes.length > 1 && minority < 0.2) {
        issues.push({
          level: 'attention',
          column: targetName,
          title: `Classes déséquilibrées (classe minoritaire\u00A0: ${Math.round(minority * 100)}\u00A0%)`,
          detail:
            "Un modèle peut obtenir une bonne exactitude en ignorant la classe rare. Regardez le rappel et la précision de chaque classe, et envisagez une pondération ou un rééchantillonnage.",
        });
      }
      // Une colonne catégorielle qui donne toujours la même classe pour chaque valeur : fuite possible.
      headers.forEach((name, index) => {
        if (index === targetIndex) return;
        const c = columns[index];
        if (c.kind !== 'catégorielle' && c.kind !== 'booléenne') return;
        if (c.unique < 2 || c.unique >= rowCount * 0.5) return;
        const byValue = new Map<string, Set<string>>();
        rows.forEach((row, rowIndex) => {
          const v = (row[index] ?? '').trim();
          const t = targetValues[rowIndex];
          if (isMissing(v) || isMissing(t)) return;
          if (!byValue.has(v)) byValue.set(v, new Set());
          byValue.get(v)!.add(t);
        });
        if (byValue.size >= 2 && [...byValue.values()].every((set) => set.size === 1)) {
          issues.push({
            level: 'attention',
            column: name,
            title: 'Prédit parfaitement la cible',
            detail: `Chaque valeur de «\u00A0${name}\u00A0» correspond à une seule classe de la cible. C'est souvent une fuite de données (une information connue seulement après coup)\u00A0: vérifiez qu'elle sera disponible au moment de prédire.`,
          });
        }
      });
    }
    for (const pair of correlations) {
      if ((pair.a === targetName || pair.b === targetName) && Math.abs(pair.r) >= 0.95) {
        const other = pair.a === targetName ? pair.b : pair.a;
        issues.push({
          level: 'attention',
          column: other,
          title: `Presque identique à la cible (r = ${pair.r.toFixed(2).replace('.', ',')})`,
          detail: `Une corrélation aussi forte avec «\u00A0${targetName}\u00A0» évoque une fuite de données\u00A0: la colonne pourrait être calculée à partir de la cible ou connue après elle.`,
        });
      }
    }
  }

  return { rows: rowCount, columns, duplicateRows, missingCells, correlations, target, issues };
}

function countAll(values: string[]) {
  const counts = new Map<string, number>();
  for (const v of values) if (!isMissing(v)) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
}
