// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { TextIndicator } from './detection/textDetection';
import type { ImageIndicator } from './detection/imageDetection';
import type { AudioIndicator } from './detection/audioDetection';
import { getPresetById } from './detection/detectionPresets';
import { ExportService } from './exportService';
import { EnsembleDetector, type EnsembleResult } from './detection/ensembleDetector';
import { MetadataAnalyzer } from './detection/metadataAnalyzer';
import { isHighScore } from './detection/scoreScale';
import { splitSentences, tokenizeWords } from './detection/textTokens';
import { dataSource, type DetectionEntry } from '@/lib/data';

export interface DetectionResult {
  id: string;
  fileName: string;
  fileType: 'text' | 'image' | 'audio';
  /** Vrai quand l'indice atteint le niveau « Beaucoup d'indices » de l'échelle commune (scoreScale.ts). Ce n'est pas un verdict. */
  isAIGenerated: boolean;
  confidence: number;
  analysis: {
    method: string;
    details: string;
    /** Phrases de synthèse des méthodes de l'ensemble. */
    indicators: string[];
    timestamp: string;
    preset?: string;
    processingTime: number;
  };
  metadata?: {
    fileSize: number;
    duration?: number;
    dimensions?: { width: number; height: number };
    metadataAnalysis?: unknown;
  };
  /** Indicateurs bruts des moteurs (type, poids, confiance, description) : une liste distincte des phrases de synthèse. */
  rawIndicators?: (TextIndicator | ImageIndicator | AudioIndicator)[];
}

/** Pourcentage à la française : virgule décimale, espace insécable avant %. */
const percent = (value: number): string => `${(value * 100).toFixed(1).replace('.', ',')}\u00A0%`;

class AIDetectionService {
  private ensembleDetector = new EnsembleDetector();

  /**
   * Applique la sensibilité du préréglage à l'indice affiché, puis le plafonne.
   * C'est la seule action d'un préréglage : l'échelle de lecture (scoreScale.ts) est la même pour tous.
   */
  private applyPreset(score: number, presetId: string | undefined, cap: number): number {
    const preset = presetId ? getPresetById(presetId) : undefined;
    const multiplier = preset ? this.getSensitivityMultiplier(preset.settings.sensitivity) : 1;
    return Math.min(score * multiplier, cap);
  }

  async detectText(text: string, presetId?: string): Promise<DetectionResult> {
    const startTime = performance.now();
    const preset = presetId ? getPresetById(presetId) : undefined;

    const ensembleResult = await this.ensembleDetector.analyzeText(text);
    const confidence = this.applyPreset(ensembleResult.finalScore, presetId, 0.95);
    const processingTime = performance.now() - startTime;

    // Détails d'analyse enrichis
    const analysisDetails = this.buildEnhancedTextAnalysisDetails(
      text,
      ensembleResult,
      confidence
    );

    return this.createDetectionResult({
      fileType: 'text',
      fileName: 'text_input.txt',
      confidence,
      method: 'Heuristiques statistiques (démonstration)',
      details: analysisDetails,
      indicators: [...ensembleResult.reasoning],
      preset: preset?.name,
      processingTime,
      metadata: { fileSize: text.length },
      rawIndicators: ensembleResult.indicators
    });
  }

  async detectImage(file: File, presetId?: string): Promise<DetectionResult> {
    const startTime = performance.now();
    const preset = presetId ? getPresetById(presetId) : undefined;

    // Analyse ensemble
    const ensembleResult = await this.ensembleDetector.analyzeImage(file);

    // Analyse des métadonnées
    const metadataResult = await MetadataAnalyzer.analyzeImageMetadata(file);
    const metadataConfidence = MetadataAnalyzer.calculateMetadataConfidence(metadataResult.indicators);

    // Combiner tous les résultats
    const combined = ensembleResult.finalScore * 0.55 + metadataConfidence * 0.45;
    const confidence = this.applyPreset(combined, presetId, 0.92);
    const processingTime = performance.now() - startTime;
    const dimensions = await this.getImageDimensions(file);

    const analysisDetails = this.buildEnhancedImageAnalysisDetails(
      ensembleResult,
      metadataResult,
      dimensions,
      file.size
    );

    const combinedReasoning = [
      ...ensembleResult.reasoning,
      ...metadataResult.indicators.map(ind => ind.description)
    ];

    return this.createDetectionResult({
      fileType: 'image',
      fileName: file.name,
      confidence,
      method: 'Heuristiques image et métadonnées (démonstration)',
      details: analysisDetails,
      indicators: combinedReasoning,
      preset: preset?.name,
      processingTime,
      metadata: {
        fileSize: file.size,
        dimensions,
        metadataAnalysis: metadataResult.metadata
      },
      rawIndicators: ensembleResult.indicators
    });
  }

  async detectAudio(file: File, presetId?: string): Promise<DetectionResult> {
    const startTime = performance.now();
    const preset = presetId ? getPresetById(presetId) : undefined;

    const ensembleResult = await this.ensembleDetector.analyzeAudio(file);
    const confidence = this.applyPreset(ensembleResult.finalScore, presetId, 0.88);
    const processingTime = performance.now() - startTime;
    const duration = await this.getAudioDuration(file);

    const analysisDetails = this.buildEnhancedAudioAnalysisDetails(
      ensembleResult,
      duration,
      file.size
    );

    return this.createDetectionResult({
      fileType: 'audio',
      fileName: file.name,
      confidence,
      method: 'Heuristiques audio (démonstration)',
      details: analysisDetails,
      indicators: ensembleResult.reasoning,
      preset: preset?.name,
      processingTime,
      metadata: {
        fileSize: file.size,
        duration,
      },
      rawIndicators: ensembleResult.indicators
    });
  }

  private buildEnhancedTextAnalysisDetails(
    text: string,
    ensembleResult: EnsembleResult,
    confidence: number
  ): string {
    const words = tokenizeWords(text);
    const sentences = splitSentences(text);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const scores = ensembleResult.methodScores;

    return `Analyse heuristique de ${text.length} caractères, ${words.length} mots, ${sentences.length} phrases, ${paragraphs.length} paragraphes. ` +
           `Méthodes\u00A0: indicateurs du texte = ${percent(scores.statistical)}, ` +
           `expressions fréquentes = ${percent(scores.pattern ?? 0)}, ` +
           `répétition des paires de mots = ${percent(scores.entropy ?? 0)}` +
           (scores.advanced !== undefined ? `, phrases proches = ${percent(scores.advanced)}. ` : '. ') +
           `Indice final (après préréglage)\u00A0: ${percent(confidence)}.` +
           (ensembleResult.confidence !== undefined ? ` Accord entre méthodes\u00A0: ${percent(ensembleResult.confidence)}.` : '');
  }

  private buildEnhancedImageAnalysisDetails(
    ensembleResult: EnsembleResult,
    metadataResult: { indicators: unknown[] },
    dimensions: { width: number; height: number },
    fileSize: number
  ): string {
    const megapixels = (dimensions.width * dimensions.height / 1000000).toFixed(1).replace('.', ',');
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2).replace('.', ',');
    const scores = ensembleResult.methodScores;
    const metadataCount = metadataResult.indicators.length;

    return `Image ${dimensions.width} × ${dimensions.height} (${megapixels}\u00A0Mpx), ${fileSizeMB}\u00A0Mo. ` +
           `Méthodes\u00A0: indicateurs de l'image = ${percent(scores.statistical)}, ` +
           `structure du fichier JPEG = ${percent(scores.pattern ?? 0)}. ` +
           `Analyse des métadonnées\u00A0: ${metadataCount} indicateur${metadataCount > 1 ? 's' : ''} relevé${metadataCount > 1 ? 's' : ''}.` +
           (ensembleResult.confidence !== undefined ? ` Accord entre méthodes\u00A0: ${percent(ensembleResult.confidence)}.` : '');
  }


  private buildEnhancedAudioAnalysisDetails(ensembleResult: EnsembleResult, duration: number, fileSize: number): string {
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2).replace('.', ',');
    const durationMin = (duration / 60).toFixed(1).replace('.', ',');
    const bitrate = duration > 0 ? `${((fileSize * 8) / (duration * 1000)).toFixed(0)}\u00A0kbit/s` : 'non disponible';

    return `Audio de ${durationMin}\u00A0min, ${fileSizeMB}\u00A0Mo, débit moyen estimé\u00A0: ${bitrate}. ` +
           `Une seule méthode\u00A0: mesures du signal décodé = ${percent(ensembleResult.methodScores.statistical)}.`;
  }

  private createDetectionResult(params: {
    fileType: 'text' | 'image' | 'audio';
    fileName: string;
    confidence: number;
    method: string;
    details: string;
    indicators: string[];
    preset?: string;
    processingTime: number;
    metadata?: DetectionResult['metadata'];
    rawIndicators?: DetectionResult['rawIndicators'];
  }): DetectionResult {
    return {
      id: `${params.fileType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fileName: params.fileName,
      fileType: params.fileType,
      isAIGenerated: isHighScore(params.confidence),
      confidence: params.confidence,
      analysis: {
        method: params.method,
        details: params.details,
        indicators: params.indicators,
        timestamp: new Date().toISOString(),
        preset: params.preset,
        processingTime: Math.round(params.processingTime)
      },
      metadata: params.metadata,
      rawIndicators: params.rawIndicators
    };
  }

  private getSensitivityMultiplier(sensitivity: 'low' | 'medium' | 'high'): number {
    switch (sensitivity) {
      case 'high': return 1.2;
      case 'low': return 0.8;
      default: return 1;
    }
  }

  private async getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ width: 0, height: 0 });
      };
      img.src = url;
    });
  }

  private async getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const audio = new Audio();
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve(audio.duration);
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(0);
      };
      audio.src = url;
    });
  }

  /** Historique local (100 analyses au plus), via la couche de données du site. */
  saveAnalysis(result: DetectionResult): Promise<void> {
    // Une interface TypeScript n'a pas de signature d'index : conversion explicite, la validation se fait à l'écriture.
    return dataSource.detectionHistory.add(result as unknown as DetectionEntry);
  }

  async getAnalysisHistory(): Promise<DetectionResult[]> {
    // Les entrées relues sont validées sur les champs affichés ; le reste est conservé tel quel.
    return (await dataSource.detectionHistory.list()) as unknown as DetectionResult[];
  }

  clearHistory(): Promise<void> {
    return dataSource.detectionHistory.clear();
  }

  exportResults(results: DetectionResult[], format: 'json' | 'csv'): string {
    return format === 'json'
      ? ExportService.exportToJson(results)
      : ExportService.exportToCsv(results);
  }

}

export const aiDetectionService = new AIDetectionService();
