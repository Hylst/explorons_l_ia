// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { parseCsv, type ParsedTable } from './csv.ts';
import { profileDataset, type DatasetProfile } from './profile.ts';
import type { TaskRequest, WorkerRequest, WorkerResponse } from './dataTasks.ts';

/**
 * Client du Web Worker des outils de données (dataWorker.ts) : lecture d'un CSV et profil d'un jeu de données
 * sous forme de promesses, sans bloquer la page.
 *
 * Repli : si `Worker` n'existe pas, si sa création échoue (navigateur ancien, CSP) ou si le worker plante, le même
 * calcul est fait dans le fil principal (la page se fige alors le temps du calcul, comme avant), pour les demandes
 * en cours comme pour les suivantes.
 *
 * Le worker garde le dernier tableau lu : demander le profil de ce tableau avec une autre cible ne lui renvoie pas
 * toutes les lignes. Il est arrêté après une minute d'inactivité pour libérer la mémoire ; il est recréé à la demande.
 */

const IDLE_MS = 60_000;

interface Pending {
  /** Le même calcul dans le fil principal, utilisé si le worker n'aboutit pas. */
  local: () => unknown;
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}

/** Le worker n'a plus le tableau en mémoire : il faut lui renvoyer les lignes. */
class CacheMiss extends Error {}

let worker: Worker | null = null;
let broken = false;
let epoch = 0;
let lastId = 0;
let idleTimer: ReturnType<typeof setTimeout> | undefined;
const pending = new Map<number, Pending>();
/** Tableaux lus par le worker (clé : leurs lignes côté page), avec l'instance de worker qui les a gardés. */
const knownTables = new WeakMap<string[][], { epoch: number; id: number }>();

/** Fait le calcul dans le fil principal, après un tour de boucle pour laisser la page afficher son indicateur. */
async function runLocal<T>(local: () => T): Promise<T> {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  return local();
}

function disposeWorker(): void {
  worker?.terminate();
  worker = null;
}

function scheduleIdle(): void {
  if (idleTimer !== undefined) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (pending.size === 0) disposeWorker();
  }, IDLE_MS);
}

/** Le worker est inutilisable : on l'abandonne pour de bon et on refait les demandes en cours dans le fil principal. */
function failWorker(): void {
  broken = true;
  disposeWorker();
  const entries = [...pending.values()];
  pending.clear();
  for (const entry of entries) runLocal(entry.local).then(entry.resolve, entry.reject);
}

function onMessage(event: MessageEvent<WorkerResponse>): void {
  const response = event.data;
  const entry = pending.get(response.id);
  if (!entry) return;
  pending.delete(response.id);
  if (!response.ok) entry.reject(response.cacheMiss ? new CacheMiss() : new Error(response.message));
  else {
    if (response.type === 'parse') knownTables.set(response.value.rows, { epoch, id: response.id });
    entry.resolve(response.value);
  }
  scheduleIdle();
}

function getWorker(): Worker | null {
  if (worker) return worker;
  if (broken || typeof Worker === 'undefined') return null;
  try {
    const created = new Worker(new URL('./dataWorker.ts', import.meta.url), { type: 'module' });
    created.addEventListener('message', onMessage);
    created.addEventListener('error', failWorker);
    created.addEventListener('messageerror', failWorker);
    worker = created;
    epoch++;
    return created;
  } catch {
    broken = true;
    return null;
  }
}

function run<T>(task: TaskRequest, local: () => T): Promise<T> {
  const current = getWorker();
  if (!current) return runLocal(local);
  return new Promise<T>((resolve, reject) => {
    const id = ++lastId;
    pending.set(id, { local, resolve: resolve as (value: unknown) => void, reject });
    try {
      const request: WorkerRequest = { id, task };
      current.postMessage(request);
    } catch {
      // Données impossibles à copier vers le worker : on les calcule ici.
      pending.delete(id);
      runLocal(local).then(resolve, reject);
    }
  });
}

/** Lit un texte CSV (voir parseCsv). Les erreurs de lecture gardent leur message. */
export function parseCsvAsync(text: string): Promise<ParsedTable> {
  return run({ type: 'parse', text }, () => parseCsv(text));
}

/** Profil d'un jeu de données (voir profileDataset). */
export async function profileDatasetAsync(headers: string[], rows: string[][], target?: string): Promise<DatasetProfile> {
  const local = () => profileDataset(headers, rows, target);
  const known = knownTables.get(rows);
  if (known && worker && known.epoch === epoch) {
    try {
      return await run({ type: 'profileCached', tableId: known.id, target }, local);
    } catch (e) {
      if (!(e instanceof CacheMiss)) throw e;
    }
  }
  return run({ type: 'profile', headers, rows, target }, local);
}
