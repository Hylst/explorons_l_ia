// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Préparation du Markdown des cours approfondis, partagée par l'affichage (DeepMarkdown) et le test unitaire.

/** remark-math ne traite « $$…$$ » en bloc que si les délimiteurs sont sur leurs propres lignes. */
export const normalizeDisplayMath = (source: string): string =>
  source.replace(/^[ \t]*\$\$([^\n]+?)\$\$[ \t]*$/gm, (_m, formula: string) => `$$\n${formula.trim()}\n$$`);

/** Champs d'un module rendus en Markdown (les autres sont du texte simple, sans formule). */
export const markdownFieldsOf = (module: {
  theory: string;
  keyTakeaways: string[];
  analogy?: { text: string };
  example?: { text: string };
}): string[] => [module.theory, ...module.keyTakeaways, module.analogy?.text ?? '', module.example?.text ?? ''].filter(Boolean);
