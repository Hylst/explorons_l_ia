// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import { TextDetectionEngine, TextIndicator } from './textDetection';
import { ImageDetectionEngine, ImageIndicator } from './imageDetection';
import { AudioDetectionEngine, AudioIndicator } from './audioDetection';
import { PatternDetector } from './patternDetector';
import { EntropyCalculator } from './entropyCalculator';
import { tokenizeWords } from './textTokens';

export interface EnsembleResult {
  finalScore: number;
  methodScores: {
    statistical: number;
    pattern?: number;
    entropy?: number;
    advanced?: number;
  };
  /** Accord entre les méthodes (1 quand elles donnent le même score). Absent quand une seule méthode a servi. */
  confidence?: number;
  reasoning: string[];
  indicators: (TextIndicator | ImageIndicator | AudioIndicator)[];
}

/** Formate un pourcentage à la française : virgule décimale, espace insécable avant %. */
const percent = (value: number, digits = 1): string => `${(value * 100).toFixed(digits).replace('.', ',')}\u00A0%`;

export class EnsembleDetector {
  private textEngine = new TextDetectionEngine();
  private imageEngine = new ImageDetectionEngine();
  private audioEngine = new AudioDetectionEngine();

  async analyzeText(text: string): Promise<EnsembleResult> {
    const reasoning: string[] = [];
    const allIndicators: TextIndicator[] = [];
    const wordCount = tokenizeWords(text).length;
    const enoughWords = wordCount >= TextDetectionEngine.MIN_WORDS_FOR_REPETITION;

    // Méthode 1 : indicateurs du moteur de texte (diversité du vocabulaire, mots et expressions fréquents dans les textes générés)
    const statisticalIndicators = this.textEngine.analyzeTextIndicators(text);
    const statisticalScore = this.textEngine.calculateConfidence(statisticalIndicators);
    allIndicators.push(...statisticalIndicators);

    if (statisticalIndicators.length > 0) {
      reasoning.push(
        `Analyse statistique : ${statisticalIndicators.length} indicateur${statisticalIndicators.length > 1 ? 's' : ''} relevé${statisticalIndicators.length > 1 ? 's' : ''} (indice de ${percent(statisticalScore)})`
      );
    }

    // Méthode 2 : expressions de liaison et vocabulaire cités comme fréquents dans les textes générés (anglais, quelques tournures françaises)
    const patterns = PatternDetector.detectAIPatterns(text);
    const patternScore = patterns.reduce((sum, p) => sum + p.confidence, 0) / Math.max(patterns.length, 1);
    const patternCount = patterns.reduce((sum, p) => sum + p.count, 0);

    if (patternCount > 0) {
      reasoning.push(
        `${patternCount} expression${patternCount > 1 ? 's' : ''} ou mot${patternCount > 1 ? 's' : ''} souvent cité${patternCount > 1 ? 's' : ''} dans les textes générés relevé${patternCount > 1 ? 's' : ''} (indice moyen de ${percent(patternScore)}), aussi courants dans des textes humains soignés`
      );
    }

    // Méthode 3 : répétition des paires de mots. L'entropie des bigrammes est rapportée à son maximum
    // (1 quand aucune paire ne se répète) ; sur les textes ordinaires essayés elle reste au-dessus de 0,96.
    // L'ancienne version testait Shannon sur les caractères (toujours sous 4,5 bits, même sur un texte ordinaire)
    // et une « burstiness » qui valait 0 sur tous les textes : toutes deux retirées.
    const normalizedBigramEntropy = enoughWords ? EntropyCalculator.calculateNormalizedNGramEntropy(text, 2) : null;
    let entropyScore = 0;
    if (normalizedBigramEntropy !== null && normalizedBigramEntropy < 0.9) {
      entropyScore = Math.min((0.9 - normalizedBigramEntropy) / 0.4, 1);
      reasoning.push(
        `Paires de mots très répétées : entropie des bigrammes à ${percent(normalizedBigramEntropy, 0)} de son maximum`
      );
    }

    // Méthode 4 : phrases très proches les unes des autres
    const coherence = PatternDetector.calculateSemanticCoherence(text);
    const repetitiveness = PatternDetector.detectRepetitiveStructures(text);

    let semanticScore = 0;
    if (enoughWords && coherence > 0.8) semanticScore += 0.5;
    if (enoughWords && repetitiveness > 0.3) semanticScore += 0.5;

    if (semanticScore > 0) {
      reasoning.push(
        `Phrases très proches les unes des autres : vocabulaire partagé ${percent(coherence)}, phrases de même gabarit ${percent(repetitiveness)}`
      );
    }

    const methodScores = {
      statistical: statisticalScore,
      pattern: patternScore,
      entropy: entropyScore,
      advanced: semanticScore
    };

    const finalScore = this.calculateEnsembleScore(methodScores);
    const confidence = this.calculateEnsembleAgreement(methodScores);

    return {
      finalScore,
      methodScores,
      confidence,
      reasoning,
      indicators: allIndicators
    };
  }

  async analyzeImage(file: File): Promise<EnsembleResult> {
    const reasoning: string[] = [];
    const allIndicators: ImageIndicator[] = [];

    // Méthode 1 : indicateurs d'image (EXIF, distribution des couleurs, compression, dimensions, bruit)
    const standardIndicators = await this.imageEngine.analyzeImageIndicators(file);
    const standardScore = this.imageEngine.calculateConfidence(standardIndicators);
    allIndicators.push(...standardIndicators);

    if (standardIndicators.length > 0) {
      reasoning.push(
        `Analyse de l'image : ${standardIndicators.length} indicateur${standardIndicators.length > 1 ? 's' : ''} relevé${standardIndicators.length > 1 ? 's' : ''} (indice de ${percent(standardScore)})`
      );
    }

    // Méthode 2 : structure du fichier JPEG (présence d'EXIF)
    // L'ancien sous-score « analyse avancée » (variance de l'histogramme, variance des descripteurs de texture,
    // uniformité des contours) comparait des valeurs normalisées à des seuils prévus pour d'autres échelles : il
    // valait entre 0,6 et 0,7 sur presque toute image. Il est retiré faute de référence pour le recalibrer.
    const metadataScore = await this.analyzeImageMetadata(file);

    if (metadataScore > 0.5) {
      reasoning.push('Métadonnées absentes ou atypiques');
    }

    const methodScores = {
      statistical: standardScore,
      pattern: metadataScore
    };

    const finalScore = this.calculateEnsembleScore(methodScores);
    const confidence = this.calculateEnsembleAgreement(methodScores);

    return {
      finalScore,
      methodScores,
      confidence,
      reasoning,
      indicators: allIndicators
    };
  }

  async analyzeAudio(file: File): Promise<EnsembleResult> {
    const reasoning: string[] = [];
    const allIndicators: AudioIndicator[] = [];

    // Une seule méthode : mesures du signal décodé (voir audioDetection.ts).
    // L'ancienne « analyse temporelle avancée » (autocorrélation non normalisée comparée à 0,9, platitude spectrale
    // sur 256 échantillons) ne pouvait presque jamais se déclencher : elle est retirée.
    const standardIndicators = await this.audioEngine.analyzeAudioIndicators(file);
    const standardScore = this.audioEngine.calculateConfidence(standardIndicators);
    allIndicators.push(...standardIndicators);

    if (standardIndicators.length > 0) {
      reasoning.push(
        `Mesures du signal : ${standardIndicators.length} indicateur${standardIndicators.length > 1 ? 's' : ''} relevé${standardIndicators.length > 1 ? 's' : ''} (indice de ${percent(standardScore)})`
      );
    }

    const methodScores = { statistical: standardScore };
    const finalScore = this.calculateEnsembleScore(methodScores);

    return {
      finalScore,
      methodScores,
      reasoning,
      indicators: allIndicators
    };
  }

  private async analyzeImageMetadata(file: File): Promise<number> {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const dataView = new DataView(arrayBuffer);

          let suspicionScore = 0;

          // Marqueurs JPEG : absence d'EXIF, présence de données Photoshop
          if (dataView.byteLength >= 2 && dataView.getUint16(0) === 0xFFD8) {
            let hasExif = false;
            let hasPhotoshop = false;

            let offset = 2;
            while (offset < dataView.byteLength - 4) {
              const marker = dataView.getUint16(offset);

              if (marker === 0xFFE1) {
                const exifHeader = dataView.getUint32(offset + 4);
                if (exifHeader === 0x45786966) hasExif = true;
              }

              if (marker === 0xFFED) hasPhotoshop = true;
              if (marker === 0xFFDA) break;

              const segmentLength = dataView.getUint16(offset + 2);
              offset += 2 + segmentLength;
            }

            if (!hasExif) suspicionScore += 0.6;
            if (hasPhotoshop) suspicionScore -= 0.2;
          }

          resolve(Math.max(0, Math.min(suspicionScore, 1)));
        } catch {
          // Fichier tronqué ou structure inattendue : aucun indice
          resolve(0);
        }
      };

      reader.onerror = () => resolve(0);
      reader.readAsArrayBuffer(file);
    });
  }

  private calculateEnsembleScore(methodScores: Partial<Record<string, number>>): number {
    const weights = {
      statistical: 0.3,
      pattern: 0.25,
      entropy: 0.25,
      advanced: 0.2
    };

    let weightedSum = 0;
    let totalWeight = 0;

    for (const [method, score] of Object.entries(methodScores)) {
      if (typeof score === 'number' && weights[method as keyof typeof weights]) {
        const weight = weights[method as keyof typeof weights];
        weightedSum += score * weight;
        totalWeight += weight;
      }
    }

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  /** Accord entre les méthodes : 1 quand elles donnent le même score. Rien quand une seule méthode a servi. */
  private calculateEnsembleAgreement(methodScores: Partial<Record<string, number>>): number | undefined {
    const scores = Object.values(methodScores).filter(s => typeof s === 'number') as number[];
    if (scores.length < 2) return undefined;
    const variance = this.calculateVariance(scores);
    return 1 - Math.min(variance * 4, 1);
  }

  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return variance;
  }
}
