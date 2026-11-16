// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Recherche de la bibliothèque : comparaison sans casse, sans accents et sans ligatures, pour qu'une
 * requête tapée sans accent (« video », « donnees ») trouve le texte accentué (« vidéo », « données »).
 * Tous les mots de la requête doivent apparaître ; une requête vide accepte tout.
 */
export const fold = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae');

export const matchesQuery = (haystack: string, query: string): boolean => {
  const tokens = fold(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const hay = fold(haystack);
  return tokens.every((token) => hay.includes(token));
};
