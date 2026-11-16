// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Types de fichiers réellement traités par le détecteur : texte brut (.txt, .md), HTML (.html, .htm, réduit à son
 * texte), images (JPEG, PNG, GIF, WebP...) et audio (MP3, WAV, OGG, M4A...). Ni PDF, ni Word, ni vidéo.
 * Certains navigateurs ne renseignent pas le type MIME d'un fichier .md : l'extension sert alors de repli.
 */
export type FileKind = 'text' | 'image' | 'audio';

const TEXT_EXTENSIONS = /\.(txt|md|markdown|html?)$/i;
const HTML_EXTENSIONS = /\.html?$/i;

/** Formats annoncés dans l'interface, identiques pour le sélecteur de fichiers et le traitement par lots. */
export const SUPPORTED_FORMATS_LABEL = 'texte (.txt, .md, .html), images (JPEG, PNG, GIF, WebP), audio (MP3, WAV, OGG, M4A)';

export function detectFileKind(file: File): FileKind | null {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('audio/')) return 'audio';
  if (file.type.startsWith('text/') || TEXT_EXTENSIONS.test(file.name)) return 'text';
  return null;
}

/** Texte d'un fichier HTML : sans balises, scripts ni styles. Le document est analysé sans rien exécuter ni charger. */
function htmlToText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script, style, noscript, template').forEach((node) => node.remove());
  return (doc.body?.textContent ?? '')
    .replace(/[ \t\u00A0]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

/** Lit un fichier texte ; un fichier HTML est réduit à son texte visible avant l'analyse. */
export async function readTextFile(file: File): Promise<string> {
  const raw = await file.text();
  return file.type === 'text/html' || HTML_EXTENSIONS.test(file.name) ? htmlToText(raw) : raw;
}
