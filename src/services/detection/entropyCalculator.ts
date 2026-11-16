// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { tokenizeWords } from './textTokens';

export class EntropyCalculator {
  /**
   * Entropie de Shannon (en bits) des n-grammes de mots du texte : la probabilité de chaque n-gramme est son
   * nombre d'occurrences divisé par le nombre TOTAL de n-grammes (et non par le nombre de n-grammes distincts,
   * ce qui donnait toujours log2 du nombre de n-grammes distincts, quel que soit le texte).
   * Elle dépend de la longueur : un texte sans aucune répétition vaut log2(nombre de n-grammes).
   */
  static calculateNGramEntropy(text: string, n: number = 2): number {
    const words = tokenizeWords(text);
    if (words.length < n) return 0;

    const ngrams = new Map<string, number>();
    let totalNgrams = 0;

    for (let i = 0; i <= words.length - n; i++) {
      const ngram = words.slice(i, i + n).join(' ');
      ngrams.set(ngram, (ngrams.get(ngram) || 0) + 1);
      totalNgrams++;
    }

    let entropy = 0;
    for (const frequency of ngrams.values()) {
      const probability = frequency / totalNgrams;
      entropy -= probability * Math.log2(probability);
    }

    return entropy;
  }

  /**
   * Entropie des n-grammes rapportée à son maximum, log2(nombre de n-grammes) : 1 quand aucun n-gramme ne se
   * répète, proche de 0 quand quelques n-grammes reviennent tout le temps. Indépendante de la longueur du texte.
   * Renvoie null quand il y a moins de deux n-grammes.
   */
  static calculateNormalizedNGramEntropy(text: string, n: number = 2): number | null {
    const total = Math.max(tokenizeWords(text).length - n + 1, 0);
    if (total < 2) return null;
    return this.calculateNGramEntropy(text, n) / Math.log2(total);
  }
}
