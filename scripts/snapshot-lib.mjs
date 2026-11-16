// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Algorithme reproductible de l'arbre SHA-256 d'un snapshot statique.
// L'arbre est le SHA-256 de la concaténation des lignes `<chemin>|<sha256 du fichier>\n`, dans l'ordre
// lexicographique des chemins comparés octet par octet en UTF-8. Le fichier SNAPSHOT-MANIFEST.json est exclu.
import { createHash } from 'node:crypto';

export const TREE_ALGORITHM =
  "sha256 des lignes `<chemin>|<sha256 du fichier>\\n`, chemins triés octet par octet en UTF-8, " +
  "SNAPSHOT-MANIFEST.json exclu";

/** Calcule l'arbre à partir de paires [chemin, sha256]. L'ordre d'entrée n'a aucune importance. */
export const treeSha256 = (rows) => {
  const lines = [...rows]
    .sort(([a], [b]) => Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')))
    .map(([path, hash]) => `${path}|${hash}\n`)
    .join('');
  return createHash('sha256').update(lines).digest('hex');
};
