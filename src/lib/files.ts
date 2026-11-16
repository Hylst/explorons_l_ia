// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/** Fait télécharger un fichier généré dans le navigateur (aucun envoi réseau). */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  // Le BOM permet à Excel de lire les accents d'un CSV en UTF-8.
  const body = mimeType.startsWith('text/csv') ? '\uFEFF' + content : content;
  const url = URL.createObjectURL(new Blob([body], { type: mimeType }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Cellule CSV (RFC 4180) : entre guillemets si besoin, guillemets doublés. */
export function csvCell(value: unknown): string {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",;\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Tableau CSV avec séparateur virgule et fins de ligne CRLF. */
export function toCsv(headers: string[], rows: unknown[][]): string {
  return [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n');
}

/** Lit un fichier choisi par le visiteur, sans l'envoyer nulle part. */
export function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Lecture impossible'));
    reader.readAsText(file);
  });
}

/** Date du jour au format AAAA-MM-JJ, pour les noms de fichiers. */
export const todayStamp = () => new Date().toISOString().slice(0, 10);
