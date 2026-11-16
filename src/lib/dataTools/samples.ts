// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createRng, gaussian } from '../random.ts';
import { generateTable, type ColumnSpec } from './synth.ts';

/**
 * Jeux d'exemple FICTIFS, générés à la demande avec une graine fixe. Ils contiennent volontairement des défauts
 * (doublons, valeurs manquantes, valeur aberrante, fuite de données, écart entre groupes) pour que les outils
 * aient quelque chose à montrer. Aucun ne provient d'une source réelle.
 */

export interface Table {
  headers: string[];
  rows: string[][];
}

/** Locations de vélos fictives : analyse de qualité avant apprentissage. */
export function sampleBikeRentals(): Table {
  const specs: ColumnSpec[] = [
    { kind: 'identifiant', name: 'id_jour', prefix: 'J' },
    { kind: 'date', name: 'date', start: '2025-01-01', end: '2025-12-31', missingRate: 0 },
    { kind: 'catégorie', name: 'saison', values: 'hiver, printemps, été, automne', missingRate: 0 },
    { kind: 'décimal', name: 'temperature_c', distribution: 'normale', a: 14, b: 7, decimals: 1, missingRate: 0 },
    { kind: 'entier', name: 'humidite_pct', min: 30, max: 95, missingRate: 0.12 },
    { kind: 'booléen', name: 'jour_ferie', probability: 0.04, missingRate: 0 },
    { kind: 'linéaire', name: 'locations', source: 'temperature_c', slope: 160, intercept: 1500, noise: 900, decimals: 0, missingRate: 0 },
  ];
  const table = generateTable(specs, 360, 2026);
  const loc = table.headers.indexOf('locations');
  const hum = table.headers.indexOf('humidite_pct');
  // Cible binaire déséquilibrée, et une colonne qui la recopie (fuite de données).
  table.headers.push('forte_demande', 'prime_equipe_versee');
  for (const row of table.rows) {
    const high = Number(row[loc]) > 5200 ? 'oui' : 'non';
    row.push(high, high === 'oui' ? 'versée' : 'non versée');
  }
  table.rows[17][hum] = '999'; // erreur de saisie plausible
  table.rows[42][hum] = 'inconnu';
  table.rows.push(...table.rows.slice(100, 105).map((row) => [...row])); // doublons
  return table;
}

/**
 * Candidatures fictives pour l'auditeur de biais : un score produit par un modèle imaginaire, plus sévère avec
 * le groupe B à mérite égal (écart introduit volontairement), et des taux de base différents entre groupes.
 */
export function sampleApplications(): Table {
  const rng = createRng(7);
  const headers = ['id', 'groupe', 'retenu_reel', 'score_modele', 'prediction'];
  const rows: string[][] = [];
  for (let i = 0; i < 600; i++) {
    const group = rng() < 0.65 ? 'A' : 'B';
    const qualified = rng() < (group === 'A' ? 0.45 : 0.35);
    const raw = (qualified ? 0.66 : 0.38) + 0.13 * gaussian(rng) - (group === 'B' ? 0.08 : 0);
    const score = Math.min(1, Math.max(0, raw));
    rows.push([
      `C${String(i + 1).padStart(3, '0')}`,
      group,
      qualified ? '1' : '0',
      score.toFixed(3),
      score >= 0.5 ? '1' : '0',
    ]);
  }
  return { headers, rows };
}

/** Modèles de départ du générateur de données synthétiques. */
export const SYNTH_PRESETS: { id: string; label: string; specs: ColumnSpec[] }[] = [
  {
    id: 'ventes',
    label: 'Ventes fictives',
    specs: [
      { kind: 'identifiant', name: 'commande', prefix: 'CMD-' },
      { kind: 'date', name: 'date', start: '2026-01-01', end: '2026-06-30', missingRate: 0 },
      { kind: 'catégorie', name: 'canal', values: 'boutique:3, site:5, téléphone:1', missingRate: 0 },
      { kind: 'entier', name: 'articles', min: 1, max: 8, missingRate: 0 },
      { kind: 'linéaire', name: 'montant_eur', source: 'articles', slope: 18, intercept: 5, noise: 6, decimals: 2, missingRate: 0.02 },
      { kind: 'booléen', name: 'client_fidele', probability: 0.3, missingRate: 0 },
    ],
  },
  {
    id: 'capteurs',
    label: 'Capteurs fictifs',
    specs: [
      { kind: 'identifiant', name: 'mesure', prefix: 'M' },
      { kind: 'catégorie', name: 'capteur', values: 'nord, sud, est, ouest', missingRate: 0 },
      { kind: 'décimal', name: 'temperature_c', distribution: 'normale', a: 21, b: 2.5, decimals: 2, missingRate: 0.05 },
      { kind: 'linéaire', name: 'consommation_kwh', source: 'temperature_c', slope: -0.4, intercept: 15, noise: 0.8, decimals: 2, missingRate: 0 },
      { kind: 'booléen', name: 'alerte', probability: 0.05, missingRate: 0 },
    ],
  },
  {
    id: 'notes',
    label: 'Notes fictives',
    specs: [
      { kind: 'identifiant', name: 'eleve', prefix: 'E' },
      { kind: 'catégorie', name: 'classe', values: '3eA, 3eB, 3eC', missingRate: 0 },
      { kind: 'décimal', name: 'heures_travail', distribution: 'uniforme', a: 0, b: 10, decimals: 1, missingRate: 0 },
      { kind: 'linéaire', name: 'score_test', source: 'heures_travail', slope: 0.9, intercept: 8, noise: 2.5, decimals: 1, missingRate: 0.03 },
    ],
  },
];
