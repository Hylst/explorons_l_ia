// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { dataSource, type DataSource } from './index';
import { DataError } from './types';

/**
 * Sauvegarde et restauration de toutes les données des outils dans un fichier JSON, sur l'appareil du visiteur.
 * Le même format servirait à transférer ces données vers un compte, si un backend existait un jour.
 */

export const BACKUP_FORMAT = 'explorons-l-ia/sauvegarde';
export const BACKUP_VERSION = 1;

type CollectionName = keyof DataSource;
const NAMES = Object.keys(dataSource) as CollectionName[];

export interface Backup {
  format: typeof BACKUP_FORMAT;
  version: number;
  exportedAt: string;
  collections: Partial<Record<CollectionName, unknown[]>>;
}

export async function createBackup(): Promise<Backup> {
  const collections: Backup['collections'] = {};
  for (const name of NAMES) collections[name] = await dataSource[name].list();
  return { format: BACKUP_FORMAT, version: BACKUP_VERSION, exportedAt: new Date().toISOString(), collections };
}

export interface RestoreReport {
  added: number;
  ignored: number;
}

/**
 * Restaure une sauvegarde en la fusionnant avec les données présentes : un élément de même identifiant est
 * remplacé, les autres sont gardés. Les éléments invalides sont ignorés et comptés.
 */
export async function restoreBackup(text: string): Promise<RestoreReport> {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new DataError("Ce fichier n'est pas un JSON lisible.");
  }
  const backup = value as Partial<Backup> | null;
  if (!backup || backup.format !== BACKUP_FORMAT || typeof backup.collections !== 'object' || !backup.collections) {
    throw new DataError("Ce fichier n'est pas une sauvegarde d'Explorons l'IA.");
  }
  if (typeof backup.version !== 'number' || backup.version > BACKUP_VERSION) {
    throw new DataError('Cette sauvegarde vient d\'une version plus récente du site.');
  }
  const report: RestoreReport = { added: 0, ignored: 0 };
  for (const name of NAMES) {
    const incoming = backup.collections[name];
    if (!Array.isArray(incoming)) continue;
    const collection = dataSource[name] as DataSource[CollectionName];
    const valid = incoming.map((item) => collection.parse(item)).filter((item) => item !== null);
    report.ignored += incoming.length - valid.length;
    report.added += valid.length;
    const ids = new Set(valid.map((item) => item.id));
    const kept = (await collection.list()).filter((item) => !ids.has(item.id));
    await (collection.replaceAll as (items: unknown[]) => Promise<void>)([...valid, ...kept]);
  }
  return report;
}
