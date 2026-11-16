// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DetectionResult } from './aiDetectionService';
import { downloadFile, toCsv } from '@/lib/files';

export class ExportService {
  static exportToJson(results: DetectionResult[]): string {
    return JSON.stringify(results, null, 2);
  }

  /** CSV des analyses : un indice de 0 à 100, jamais un verdict (le détecteur ne prouve rien). */
  static exportToCsv(results: DetectionResult[]): string {
    return toCsv(
      ['Fichier', 'Type', 'Indice (0 à 100)', 'Méthode', 'Préréglage', 'Temps de traitement (ms)', 'Date'],
      results.map((r) => [
        r.fileName,
        r.fileType,
        Math.round(r.confidence * 100),
        r.analysis.method,
        r.analysis.preset || 'Aucun',
        r.analysis.processingTime,
        r.analysis.timestamp,
      ])
    );
  }

  static downloadFile(content: string, filename: string, mimeType: string): void {
    downloadFile(content, filename, mimeType);
  }
}
