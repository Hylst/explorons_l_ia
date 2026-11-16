// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { parseCsv, type ParsedTable } from './csv.ts';
import { profileDataset, type DatasetProfile } from './profile.ts';

/**
 * Calculs lourds des outils de données (lecture d'un CSV, profil d'un jeu de données) et protocole d'échange avec
 * le Web Worker qui les exécute (dataWorker.ts). Ce fichier ne touche ni au DOM ni au worker : Node peut le charger.
 */

export type TaskRequest =
  | { type: 'parse'; text: string }
  | { type: 'profile'; headers: string[]; rows: string[][]; target?: string }
  /** Profil du dernier tableau lu par le worker : évite de lui renvoyer toutes les lignes. */
  | { type: 'profileCached'; tableId: number; target?: string };

export interface WorkerRequest {
  id: number;
  task: TaskRequest;
}

export type WorkerResponse =
  | { id: number; ok: true; type: 'parse'; value: ParsedTable }
  | { id: number; ok: true; type: 'profile'; value: DatasetProfile }
  | { id: number; ok: false; message: string; cacheMiss: boolean };

interface CachedTable {
  id: number;
  headers: string[];
  rows: string[][];
}

/** Mémoire du worker : le dernier tableau lu, identifié par l'identifiant de la requête de lecture. */
export interface TaskState {
  cached: CachedTable | null;
}

export const createTaskState = (): TaskState => ({ cached: null });

export function handleRequest(request: WorkerRequest, state: TaskState): WorkerResponse {
  const { id, task } = request;
  try {
    if (task.type === 'parse') {
      const value = parseCsv(task.text);
      state.cached = { id, headers: value.headers, rows: value.rows };
      return { id, ok: true, type: 'parse', value };
    }
    if (task.type === 'profile') {
      return { id, ok: true, type: 'profile', value: profileDataset(task.headers, task.rows, task.target) };
    }
    const cached = state.cached;
    if (!cached || cached.id !== task.tableId) {
      return { id, ok: false, message: 'Tableau absent de la mémoire du worker.', cacheMiss: true };
    }
    return { id, ok: true, type: 'profile', value: profileDataset(cached.headers, cached.rows, task.target) };
  } catch (e) {
    return { id, ok: false, message: e instanceof Error ? e.message : 'Calcul impossible.', cacheMiss: false };
  }
}
