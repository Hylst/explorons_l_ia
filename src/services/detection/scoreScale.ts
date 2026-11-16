// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Échelle unique de lecture de l'indice (de 0 à 100), partagée par l'aide, la carte de résultat,
 * la vue détaillée, les libellés binaires et l'historique.
 * L'indice n'est pas une probabilité : les libellés parlent d'indices relevés, jamais d'origine démontrée.
 * Les bornes sont des repères de lecture, pas des seuils établis par une mesure.
 */
export type ScoreLevel = 'low' | 'medium' | 'high';

export interface ScoreLevelInfo {
  level: ScoreLevel;
  /** Borne basse incluse, sur l'indice arrondi affiché (0 à 100). */
  min: number;
  /** Intervalle affiché dans l'aide. */
  range: string;
  label: string;
  /** Classe de couleur du texte (clair et sombre), contrastes vérifiés par axe-core. */
  textClass: string;
}

/** Du niveau le plus élevé au plus bas. */
export const SCORE_LEVELS: readonly ScoreLevelInfo[] = [
  { level: 'high', min: 70, range: '70 à 100', label: 'Beaucoup d’indices', textClass: 'text-red-600 dark:text-red-400' },
  { level: 'medium', min: 40, range: '40 à 69', label: 'Quelques indices', textClass: 'text-yellow-700 dark:text-yellow-400' },
  { level: 'low', min: 0, range: '0 à 39', label: 'Peu d’indices', textClass: 'text-green-700 dark:text-green-400' },
];

/** Niveau correspondant à un indice entre 0 et 1, lu sur la valeur arrondie que l'écran affiche. */
export function getScoreLevel(score: number): ScoreLevelInfo {
  const shown = Math.round((Number.isFinite(score) ? score : 0) * 100);
  return SCORE_LEVELS.find((entry) => shown >= entry.min) ?? SCORE_LEVELS[SCORE_LEVELS.length - 1];
}

/** Vrai quand l'indice atteint le niveau le plus haut (valeur binaire conservée pour l'historique et les exports). */
export function isHighScore(score: number): boolean {
  return getScoreLevel(score).level === 'high';
}
