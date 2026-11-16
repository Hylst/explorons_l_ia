// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Découpage en mots compatible Unicode : les lettres accentuées (é, è, ç, œ...) restent dans le mot,
 * et l'apostrophe interne est conservée (« l'idée », « aujourd'hui », « it's »).
 * L'ancien découpage `\b\w+\b` coupait « écrit » en « crit » et « déjà » en « d » et « j ».
 */
const WORD_PATTERN = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;

/** Mots du texte, en minuscules. */
export function tokenizeWords(text: string): string[] {
  return text.toLowerCase().match(WORD_PATTERN) ?? [];
}

/** Phrases du texte : coupure sur . ! ? … suivis d'une espace ou de la fin du texte. */
export function splitSentences(text: string): string[] {
  return text
    .split(/[.!?…]+(?=\s|$)/u)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}

/**
 * Part de mots distincts dans une fenêtre glissante de `windowSize` mots, moyennée sur tout le texte
 * (MATTR). Contrairement au simple rapport types/occurrences, elle ne baisse pas mécaniquement avec la longueur.
 * Renvoie null quand le texte compte moins de `windowSize` mots : la mesure n'a alors pas de sens.
 */
export function movingAverageTypeTokenRatio(words: string[], windowSize = 50): number | null {
  if (words.length < windowSize) return null;
  let sum = 0;
  let windows = 0;
  for (let i = 0; i + windowSize <= words.length; i++) {
    sum += new Set(words.slice(i, i + windowSize)).size / windowSize;
    windows++;
  }
  return sum / windows;
}
