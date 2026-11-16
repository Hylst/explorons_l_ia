// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { highBandEnergyShare } from './spectrum';

export interface AudioIndicator {
  type: string;
  description: string;
  weight: number;
  confidence: number;
}

/** Taille des trames pour l'analyse de niveau et du spectre (environ 46 ms à 44,1 kHz). */
const FRAME_SIZE = 2048;
/** Sous ce niveau (en dBFS), une trame est considérée comme un silence numérique et sort du calcul de plage dynamique. */
const SILENCE_FLOOR_DB = -80;
/** Valeur attribuée aux trames strictement nulles, pour que les percentiles restent des nombres finis. */
const DIGITAL_ZERO_DB = -120;

/**
 * Indicateurs sur un signal audio. Aucun n'identifie une voix synthétique : ce sont des mesures du signal
 * (débit estimé, énergie au-dessus de 8 kHz par transformée de Fourier, niveaux par trame). Les seuils
 * ne sont pas calibrés sur des enregistrements de référence.
 */
export class AudioDetectionEngine {
  private audioContext: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }

  async analyzeAudioIndicators(file: File): Promise<AudioIndicator[]> {
    const indicators: AudioIndicator[] = [];

    try {
      // Le fichier n'est décodé qu'une fois : toutes les mesures lisent le même signal.
      const audioBuffer = await this.decodeAudioFile(file);
      const channelData = audioBuffer.getChannelData(0);
      const levels = this.frameLevelsDb(channelData);

      const candidates = [
        this.analyzeAudioQuality(file, audioBuffer.duration),
        this.analyzeHighBand(channelData, audioBuffer.sampleRate),
        this.analyzeDynamicRange(levels),
        this.analyzeTemporalRegularity(channelData),
        this.analyzeQuietPassages(levels),
      ];
      for (const candidate of candidates) {
        if (candidate) indicators.push(candidate);
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse audio:', error);
    }

    return indicators;
  }

  /** Débit moyen estimé d'un fichier compressé. Sans objet pour les formats non compressés (WAV, AIFF, FLAC). */
  private analyzeAudioQuality(file: File, duration: number): AudioIndicator | null {
    if (!(duration > 0)) return null;
    if (/wav|wave|aiff|flac/i.test(file.type) || /\.(wav|aiff?|flac)$/i.test(file.name)) return null;

    const estimatedBitrate = (file.size * 8) / (duration * 1000); // kbit/s

    if (estimatedBitrate > 320 || estimatedBitrate < 32) {
      return {
        type: 'quality',
        description: `Débit estimé inhabituel (${estimatedBitrate.toFixed(0)}\u00A0kbit/s) pour un enregistrement vocal compressé\u00A0: lié au mode de compression, pas une preuve`,
        weight: 0.3,
        confidence: estimatedBitrate > 320 ? 0.6 : (32 - estimatedBitrate) / 32
      };
    }

    return null;
  }

  /**
   * Part de l'énergie spectrale au-dessus de 8 kHz, par transformée de Fourier rapide sur des trames de
   * 2 048 échantillons fenêtrées par Hann, réparties sur tout le fichier. Calculée seulement quand le fichier
   * est échantillonné à 32 kHz ou plus : en dessous, la bande n'existe pas.
   */
  private analyzeHighBand(channelData: Float32Array, sampleRate: number): AudioIndicator | null {
    if (sampleRate < 32000) return null;
    const result = highBandEnergyShare(channelData, sampleRate, 8000, FRAME_SIZE);
    if (!result) return null;

    const threshold = 0.0005; // 0,05 % de l'énergie : repère de démonstration, non calibré
    if (result.share >= threshold) return null;

    return {
      type: 'spectral',
      description: `Très peu d'énergie au-dessus de 8\u00A0kHz (${(result.share * 100).toFixed(3).replace('.', ',')}\u00A0% de l'énergie, transformée de Fourier sur ${result.frames} trames)\u00A0: coupure des aigus, fréquente aussi après compression, rééchantillonnage ou enregistrement téléphonique`,
      weight: 0.3,
      confidence: Math.min((threshold - result.share) / threshold, 1)
    };
  }

  /** Écart entre les passages forts (95e centile) et faibles (10e centile) hors silence numérique. */
  private analyzeDynamicRange(levels: number[]): AudioIndicator | null {
    const audible = levels.filter((db) => db > SILENCE_FLOOR_DB);
    if (audible.length < 10) return null;

    const spread = this.percentile(audible, 0.95) - this.percentile(audible, 0.1);
    const threshold = 6; // dB, repère de démonstration non calibré

    if (spread < threshold) {
      return {
        type: 'dynamic_range',
        description: `Écart de niveau limité entre passages forts et faibles (${spread.toFixed(1).replace('.', ',')}\u00A0dB)\u00A0: compression marquée, fréquente aussi sur des enregistrements humains`,
        weight: 0.4,
        confidence: (threshold - spread) / threshold
      };
    }

    return null;
  }

  private analyzeTemporalRegularity(channelData: Float32Array): AudioIndicator | null {
    const regularity = this.calculateTemporalRegularity(channelData);

    if (regularity > 0.8) {
      return {
        type: 'temporal_regularity',
        description: `Niveau sonore très stable d'un segment à l'autre (${(regularity * 100).toFixed(1).replace('.', ',')}\u00A0%)\u00A0: peu de variations, ce qui peut aussi venir du montage ou d'un son continu`,
        weight: 0.4,
        confidence: (regularity - 0.8) / 0.2
      };
    }

    return null;
  }

  /** Niveau des 10 % de trames les plus calmes (10e centile), en dBFS. */
  private analyzeQuietPassages(levels: number[]): AudioIndicator | null {
    if (levels.length < 10) return null;

    const quiet = this.percentile(levels, 0.1);
    const threshold = -70; // dBFS, repère de démonstration non calibré

    if (quiet < threshold) {
      return {
        type: 'background_noise',
        description: `Passages les plus calmes à ${quiet.toFixed(0)}\u00A0dBFS\u00A0: niveau très bas, qui vient d'un enregistrement très propre, traité ou coupé en silence numérique, sans que cela prouve une synthèse`,
        weight: 0.5,
        confidence: Math.min((threshold - quiet) / 30, 1)
      };
    }

    return null;
  }

  private async decodeAudioFile(file: File): Promise<AudioBuffer> {
    const arrayBuffer = await file.arrayBuffer();
    const audioContext = this.getAudioContext();
    return audioContext.decodeAudioData(arrayBuffer);
  }

  /** Niveau RMS de chaque trame consécutive de FRAME_SIZE échantillons, en dBFS. */
  private frameLevelsDb(channelData: Float32Array): number[] {
    const levels: number[] = [];
    for (let start = 0; start + FRAME_SIZE <= channelData.length; start += FRAME_SIZE) {
      const rms = this.calculateRMS(channelData.subarray(start, start + FRAME_SIZE));
      levels.push(rms > 0 ? Math.max(20 * Math.log10(rms), DIGITAL_ZERO_DB) : DIGITAL_ZERO_DB);
    }
    return levels;
  }

  private percentile(values: number[], fraction: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.min(sorted.length - 1, Math.max(0, Math.round(fraction * (sorted.length - 1))));
    return sorted[index];
  }

  private calculateTemporalRegularity(channelData: Float32Array): number {
    const windowSize = Math.floor(channelData.length / 50);
    if (windowSize < 1) return 0;
    let regularitySum = 0;
    let windows = 0;

    for (let i = 0; i < channelData.length - windowSize * 2; i += windowSize) {
      const window1 = channelData.subarray(i, i + windowSize);
      const window2 = channelData.subarray(i + windowSize, i + windowSize * 2);

      const energy1 = this.calculateRMS(window1);
      const energy2 = this.calculateRMS(window2);

      const similarity = 1 - Math.abs(energy1 - energy2) / Math.max(energy1, energy2, 0.001);
      regularitySum += similarity;
      windows++;
    }

    return windows > 0 ? regularitySum / windows : 0;
  }

  private calculateRMS(samples: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < samples.length; i++) {
      sum += samples[i] * samples[i];
    }
    return samples.length > 0 ? Math.sqrt(sum / samples.length) : 0;
  }

  calculateConfidence(indicators: AudioIndicator[]): number {
    if (indicators.length === 0) return 0;

    const weightedSum = indicators.reduce((sum, indicator) =>
      sum + (indicator.weight * indicator.confidence), 0
    );
    const totalWeight = indicators.reduce((sum, indicator) => sum + indicator.weight, 0);

    const baseConfidence = totalWeight > 0 ? weightedSum / totalWeight : 0;

    return Math.min(1 / (1 + Math.exp(-3.5 * (baseConfidence - 0.5))), 0.88);
  }
}
