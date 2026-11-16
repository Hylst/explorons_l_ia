// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import { splitSentences, tokenizeWords } from './textTokens';

export interface PatternMatch {
  pattern: string;
  count: number;
  positions: number[];
  confidence: number;
}

export class PatternDetector {
  private static readonly AI_LINGUISTIC_PATTERNS = [
    // Hedge words and phrases
    { pattern: /\b(perhaps|possibly|potentially|likely|presumably|arguably)\b/gi, weight: 0.3 },
    { pattern: /\b(it (?:seems|appears) that|one might (?:argue|suggest))\b/gi, weight: 0.4 },
    { pattern: /\b(to some extent|in many cases|generally speaking)\b/gi, weight: 0.3 },
    
    // Formal connectives
    { pattern: /\b(furthermore|moreover|additionally|consequently|nevertheless)\b/gi, weight: 0.4 },
    { pattern: /\b(in conclusion|to summarize|in summary|as aforementioned)\b/gi, weight: 0.5 },
    { pattern: /\b(it is worth noting|it should be emphasized|it is important to)\b/gi, weight: 0.6 },
    
    // Overly structured language
    { pattern: /\b(firstly|secondly|thirdly|lastly)\b/gi, weight: 0.3 },
    { pattern: /\b(on one hand|on the other hand|in contrast|conversely)\b/gi, weight: 0.4 },
    
    // AI-specific vocabulary
    { pattern: /\b(optimize|leverage|utilize|facilitate|enhance|streamline)\b/gi, weight: 0.3 },
    { pattern: /\b(comprehensive|multifaceted|holistic|nuanced|intricate)\b/gi, weight: 0.4 },
    { pattern: /\b(paradigm|methodology|framework|synergy|innovative)\b/gi, weight: 0.3 },

    // Quelques équivalents français (liste courte). Ces tournures sont aussi très courantes dans les textes
    // humains soignés. Les limites de mots utilisent \p{L} : \b ne reconnaît pas les lettres accentuées.
    { pattern: /(?<!\p{L})(en outre|par ailleurs|de surcroît|néanmoins)(?!\p{L})/giu, weight: 0.4 },
    { pattern: /(?<!\p{L})(en conclusion|en résumé|pour conclure|en somme)(?!\p{L})/giu, weight: 0.5 },
    { pattern: /(?<!\p{L})(il est (?:important|essentiel) de|il convient de|il est à noter que)(?!\p{L})/giu, weight: 0.6 },
    { pattern: /(?<!\p{L})(tout d['’]abord|d['’]une part|d['’]autre part)(?!\p{L})/giu, weight: 0.3 }
  ];

  static detectAIPatterns(text: string): PatternMatch[] {
    const matches: PatternMatch[] = [];
    const totalWords = tokenizeWords(text).length;
    if (totalWords === 0) return matches;

    for (const { pattern, weight } of this.AI_LINGUISTIC_PATTERNS) {
      const patternMatches = Array.from(text.matchAll(pattern));
      
      if (patternMatches.length > 0) {
        const positions = patternMatches.map(match => match.index || 0);
        const density = patternMatches.length / totalWords;
        const confidence = Math.min(density * weight * 10, 1);
        
        matches.push({
          pattern: pattern.source,
          count: patternMatches.length,
          positions,
          confidence
        });
      }
    }
    
    return matches.sort((a, b) => b.confidence - a.confidence);
  }

  static calculateSemanticCoherence(text: string): number {
    const sentences = splitSentences(text);
    if (sentences.length < 2) return 1;
    
    let coherenceScore = 0;
    
    for (let i = 1; i < sentences.length; i++) {
      const prevWords = new Set(tokenizeWords(sentences[i - 1]));
      const currWords = new Set(tokenizeWords(sentences[i]));

      const intersection = new Set([...prevWords].filter(word => currWords.has(word)));
      const union = new Set([...prevWords, ...currWords]);

      const jaccardSimilarity = union.size > 0 ? intersection.size / union.size : 0;
      coherenceScore += jaccardSimilarity;
    }
    
    return coherenceScore / (sentences.length - 1);
  }

  static detectRepetitiveStructures(text: string): number {
    const sentences = splitSentences(text);
    if (sentences.length < 3) return 0;
    
    const structures = sentences.map(sentence => {
      const words = tokenizeWords(sentence);
      // Create a structural fingerprint based on word length patterns
      return words.map(word => word.length < 4 ? 'S' : word.length < 7 ? 'M' : 'L').join('');
    });
    
    const structureFreq = new Map<string, number>();
    structures.forEach(structure => {
      structureFreq.set(structure, (structureFreq.get(structure) || 0) + 1);
    });
    
    const repetitions = Array.from(structureFreq.values()).filter(freq => freq > 1);
    return repetitions.reduce((sum, freq) => sum + (freq - 1), 0) / sentences.length;
  }
}
