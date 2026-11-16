// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { movingAverageTypeTokenRatio, tokenizeWords } from './textTokens';

export interface TextIndicator {
  type: string;
  description: string;
  weight: number;
  confidence: number;
}

/**
 * Indicateurs sur un texte. Aucun modèle de langage n'est utilisé : ce sont des comptages sur le texte lui-même.
 * Les seuils ne sont pas calibrés sur des corpus de référence. Ils ont été choisis pour ne pas se déclencher
 * sur des textes ordinaires (essais écrits pour la vérification, en français et en anglais) et ne se déclenchent
 * que sur des textes très répétitifs ou chargés d'expressions de liaison formelles. Un texte humain peut les déclencher, un texte
 * généré puis retouché presque jamais.
 */
export class TextDetectionEngine {
  /** Taille de la fenêtre de la diversité du vocabulaire : en dessous, la mesure n'est pas calculée. */
  static readonly MIN_WORDS_FOR_STATISTICS = 50;
  /** En dessous, les mesures de répétition (paires de mots, phrases) sont trop instables pour être affichées. */
  static readonly MIN_WORDS_FOR_REPETITION = 30;

  /** Mots anglais souvent cités comme typiques de textes générés (liste volontairement courte). */
  private readonly aiKeywords = [
    'furthermore', 'moreover', 'additionally', 'consequently',
    'comprehensive', 'multifaceted', 'holistic', 'nuanced', 'facilitate',
    'optimize', 'leverage', 'utilize', 'enhance', 'streamline'
  ];

  /**
   * Expressions de liaison formelles, en anglais puis en français (quelques-unes seulement).
   * Elles sont aussi très courantes dans les textes humains soignés (dissertations, rapports).
   */
  private readonly aiPhrases = [
    'it is important to note',
    'it is worth noting',
    'in conclusion',
    'to summarize',
    'in summary',
    'as previously mentioned',
    'it should be emphasized',
    'from this perspective',
    'il est important de noter',
    'il convient de souligner',
    'il est à noter que',
    'en conclusion',
    'en résumé',
    'en somme'
  ];

  analyzeTextIndicators(text: string): TextIndicator[] {
    const indicators: TextIndicator[] = [];
    const words = tokenizeWords(text);

    // Diversité du vocabulaire : part de mots distincts sur 50 mots consécutifs, en moyenne.
    // Sur des textes ordinaires de nos essais, elle reste entre 0,78 et 0,89 ; un texte qui se répète tombe très bas.
    const diversity = movingAverageTypeTokenRatio(words, TextDetectionEngine.MIN_WORDS_FOR_STATISTICS);
    if (diversity !== null && diversity < 0.6) {
      indicators.push({
        type: 'lexical_diversity',
        description: `Vocabulaire peu varié (${(diversity * 50).toFixed(0)} mots distincts en moyenne sur 50 mots consécutifs)`,
        weight: 0.5,
        confidence: Math.min((0.6 - diversity) / 0.3, 1)
      });
    }

    // Mots anglais fréquemment cités comme typiques des textes générés
    const aiKeywordCount = this.countAIKeywords(words);
    if (aiKeywordCount.count > 0 && aiKeywordCount.totalWords >= 20) {
      const density = aiKeywordCount.count / aiKeywordCount.totalWords;
      if (density > 0.02) {
        indicators.push({
          type: 'ai_keywords',
          description: `Densité élevée de mots anglais souvent cités dans les textes générés (${(density * 100).toFixed(1).replace('.', ',')}\u00A0%)`,
          weight: 0.4,
          confidence: Math.min(density / 0.05, 1)
        });
      }
    }

    // Expressions de liaison formelles (anglais et français)
    const phraseMatches = this.detectAIPhrases(text);
    if (phraseMatches.length > 0) {
      indicators.push({
        type: 'ai_phrases',
        description: `${phraseMatches.length} expression${phraseMatches.length > 1 ? 's' : ''} de liaison formelle${phraseMatches.length > 1 ? 's' : ''} relevée${phraseMatches.length > 1 ? 's' : ''}, aussi courante${phraseMatches.length > 1 ? 's' : ''} dans les textes humains soignés`,
        weight: 0.4,
        confidence: Math.min(phraseMatches.length / 5, 1)
      });
    }

    return indicators;
  }

  private countAIKeywords(words: string[]): { count: number; totalWords: number } {
    const aiKeywordCount = words.filter(word => this.aiKeywords.includes(word)).length;
    return { count: aiKeywordCount, totalWords: words.length };
  }

  private detectAIPhrases(text: string): string[] {
    const lowerText = text.normalize('NFC').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ');
    return this.aiPhrases.filter(phrase => lowerText.includes(phrase));
  }

  calculateConfidence(indicators: TextIndicator[]): number {
    if (indicators.length === 0) return 0;

    // Calcul pondéré de la confiance
    const weightedSum = indicators.reduce((sum, indicator) => 
      sum + (indicator.weight * indicator.confidence), 0
    );
    const totalWeight = indicators.reduce((sum, indicator) => sum + indicator.weight, 0);
    
    const baseConfidence = totalWeight > 0 ? weightedSum / totalWeight : 0;
    
    // Application d'une fonction sigmoïde pour lisser les résultats
    return Math.min(1 / (1 + Math.exp(-5 * (baseConfidence - 0.5))), 0.95);
  }
}
