// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Règles de forme partagées par la vérification (`PromptOptimizer`) et le comparateur de variantes
 * (`PromptComparisonLab`). Elles reconnaissent des mots et une mise en forme, jamais le fond d'un prompt :
 * aucun modèle n'est appelé et un prompt qui coche toutes les cases n'est pas pour autant efficace.
 * Ce fichier est importé par `npm run test:unit` : pas de JSX, pas de dépendance React.
 */

export const MIN_PROMPT_LENGTH = 50;
export const MAX_PROMPT_LENGTH = 2000;

/** Longueur utile : assez de contexte, sans noyer la consigne. */
export const hasReasonableLength = (prompt: string): boolean =>
  prompt.trim().length >= MIN_PROMPT_LENGTH && prompt.length <= MAX_PROMPT_LENGTH;

/** Rôle ou point de vue explicite. */
export const definesRole = (prompt: string): boolean =>
  /tu es|vous êtes|agis comme|agissez comme|en tant que/.test(prompt.toLowerCase());

/** Consignes organisées : puces, étapes numérotées ou au moins trois lignes distinctes. */
export const hasStructuredInstructions = (prompt: string): boolean =>
  /\n\s*([-*•]|\d+[.)])\s/.test(prompt) || prompt.split('\n').filter((line) => line.trim() !== '').length >= 3;

/** Format de réponse demandé. */
export const asksForFormat = (prompt: string): boolean =>
  /format|tableau|liste|json|markdown|paragraphe|titres?\b|sections?|mots\b|lignes?\b|phrases?\b|en \d+/.test(prompt.toLowerCase());

/** Titres de section : un crochet qui les contient n'est pas un champ à compléter. */
const SECTION_LABELS = new Set([
  'contexte', 'tache', 'objectif', 'role', 'format', 'contraintes', 'public', 'exemple', 'exemples',
  'ton', 'style', 'donnees', 'instructions', 'sortie', 'entree', 'sources', 'criteres', 'rappel'
]);

const normalize = (text: string): string =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

/**
 * Emplacement restant à compléter (`[sujet]`, `[Titre]`, `[score et justification]`, `[à renseigner]`).
 * Ne sont pas comptés : un indice de tableau ou d'objet (`tableau[i]`, `arr[0]`, `data["clé"]`), un lien markdown
 * (`[texte](https://…)`), une citation numérique (`[1]`, `[1, 2]`) et un titre de section connu (`[Contexte]`,
 * `[Contraintes]`). Le reste est signalé : les gabarits du site utilisent tous les crochets comme champs à remplir.
 */
export const hasUnfilledPlaceholder = (prompt: string): boolean => {
  for (const match of prompt.matchAll(/(^|[^A-Za-z0-9_$()[\]{}])\[([^\]\n]{0,60})\](?!\()/g)) {
    const inner = match[2].trim();
    if (inner === '') continue;
    if (/[\][{}]/.test(inner)) continue;
    if (/^[\d\s.,;:+-]+$/.test(inner)) continue;
    if (SECTION_LABELS.has(normalize(inner))) continue;
    return true;
  }
  return false;
};
