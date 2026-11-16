// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ZodType } from 'zod';
import { DataError, type Collection, type StoredItem } from './types';

interface LocalCollectionOptions {
  /** Nombre maximal d'éléments gardés (les plus anciens sont retirés). */
  max?: number;
}

const readRaw = (key: string): unknown[] => {
  let text: string | null = null;
  try {
    text = window.localStorage.getItem(key);
  } catch {
    return []; // stockage désactivé (navigation privée stricte, réglages) : on fait comme s'il était vide
  }
  if (!text) return [];
  try {
    const value: unknown = JSON.parse(text);
    return Array.isArray(value) ? value : [];
  } catch {
    return []; // donnée abîmée : ignorée plutôt que de bloquer l'outil
  }
};

const writeRaw = (key: string, items: unknown[]) => {
  try {
    if (items.length === 0) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    const full = error instanceof DOMException && /quota/i.test(error.name + error.message);
    throw new DataError(
      full
        ? "Le stockage de ce navigateur est plein : supprimez d'anciens éléments ou exportez-les avant d'en ajouter."
        : "Ce navigateur n'autorise pas l'enregistrement local (navigation privée ou réglages)."
    );
  }
};

/** Collection enregistrée dans `localStorage` sous la clé donnée, du plus récent au plus ancien. */
export function createLocalCollection<T extends StoredItem>(
  key: string,
  schema: ZodType<T>,
  { max = 200 }: LocalCollectionOptions = {}
): Collection<T> {
  const parse = (value: unknown): T | null => {
    const result = schema.safeParse(value);
    return result.success ? result.data : null;
  };
  const read = (): T[] => readRaw(key).map(parse).filter((item): item is T => item !== null);

  return {
    name: key,
    parse,
    list: async () => read(),
    add: async (item) => {
      const valid = parse(item);
      if (!valid) throw new DataError('Élément invalide : il n\'a pas été enregistré.');
      writeRaw(key, [valid, ...read().filter((existing) => existing.id !== valid.id)].slice(0, max));
    },
    remove: async (id) => writeRaw(key, read().filter((item) => item.id !== id)),
    clear: async () => writeRaw(key, []),
    replaceAll: async (items) => writeRaw(key, items.map(parse).filter((item): item is T => item !== null).slice(0, max)),
  };
}
