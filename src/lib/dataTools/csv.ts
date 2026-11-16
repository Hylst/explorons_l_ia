// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Lecture de fichiers CSV dans le navigateur (RFC 4180 : champs entre guillemets, guillemets doublés, retours à la
 * ligne dans un champ). Le séparateur (virgule, point-virgule ou tabulation) est deviné sur les premières lignes.
 * Aucun module externe : le fichier ne quitte pas l'appareil.
 */

export interface ParsedTable {
  headers: string[];
  rows: string[][];
  delimiter: string;
  /** Lignes dont le nombre de champs ne correspond pas à l'en-tête (complétées ou tronquées). */
  irregularRows: number;
  /** Vrai si le fichier dépassait la limite de lignes et a été coupé. */
  truncated: boolean;
}

export const CSV_LIMITS = { maxBytes: 5 * 1024 * 1024, maxRows: 50_000, maxColumns: 200 } as const;

const CANDIDATES = [',', ';', '\t'];

/** Devine le séparateur : celui qui donne le même nombre de champs (> 1) sur le plus de lignes. */
export function detectDelimiter(text: string): string {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '').slice(0, 20);
  let best = ',';
  let bestScore = -1;
  for (const delimiter of CANDIDATES) {
    const counts = lines.map((line) => splitLine(line, delimiter).length);
    if (counts.length === 0 || counts[0] < 2) continue;
    const score = counts.filter((count) => count === counts[0]).length * 100 + counts[0];
    if (score > bestScore) {
      best = delimiter;
      bestScore = score;
    }
  }
  return best;
}

/** Découpe une ligne simple (sans retour à la ligne dans les guillemets), pour la détection du séparateur. */
function splitLine(line: string, delimiter: string): string[] {
  return parseRecords(line, delimiter, 1)[0] ?? [];
}

/** Analyse le texte en enregistrements ; s'arrête après `maxRecords`. */
function parseRecords(text: string, delimiter: string, maxRecords: number): string[][] {
  const records: string[][] = [];
  let field = '';
  let record: string[] = [];
  let inQuotes = false;
  let i = 0;
  const pushRecord = () => {
    record.push(field);
    field = '';
    if (!(record.length === 1 && record[0] === '')) records.push(record);
    record = [];
  };
  while (i < text.length && records.length < maxRecords) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
      } else {
        field += char;
      }
      i++;
      continue;
    }
    if (char === '"' && field === '') inQuotes = true;
    else if (char === delimiter) {
      record.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      pushRecord();
      if (char === '\r' && text[i + 1] === '\n') i++;
    } else field += char;
    i++;
  }
  if ((field !== '' || record.length > 0) && records.length < maxRecords) pushRecord();
  return records;
}

export function parseCsv(input: string, maxRows: number = CSV_LIMITS.maxRows): ParsedTable {
  const text = input.replace(/^\uFEFF/, '');
  const delimiter = detectDelimiter(text);
  const records = parseRecords(text, delimiter, maxRows + 2);
  if (records.length === 0) throw new Error('Le fichier est vide.');
  const rawHeaders = records[0].map((header) => header.trim());
  if (rawHeaders.length > CSV_LIMITS.maxColumns) {
    throw new Error(`Trop de colonnes (${rawHeaders.length})\u00A0: la limite est de ${CSV_LIMITS.maxColumns}.`);
  }
  // En-têtes vides ou en double : renommés pour rester distincts.
  const seen = new Map<string, number>();
  const headers = rawHeaders.map((header, index) => {
    const base = header || `colonne_${index + 1}`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}_${n}`;
  });
  const body = records.slice(1, maxRows + 1);
  let irregularRows = 0;
  const rows = body.map((record) => {
    if (record.length === headers.length) return record;
    irregularRows++;
    return record.length > headers.length
      ? record.slice(0, headers.length)
      : [...record, ...Array(headers.length - record.length).fill('')];
  });
  return { headers, rows, delimiter, irregularRows, truncated: records.length > maxRows + 1 };
}
