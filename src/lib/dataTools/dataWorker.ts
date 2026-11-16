// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createTaskState, handleRequest, type WorkerRequest, type WorkerResponse } from './dataTasks.ts';

/**
 * Web Worker des outils de données : lit un CSV et calcule le profil d'un jeu de données hors du fil principal,
 * pour que la page reste utilisable sur un gros fichier. Créé par workerClient.ts. Aucun accès réseau.
 */

// Le projet est compilé avec la bibliothèque DOM, pas WebWorker : on ne décrit que ce dont ce fichier se sert.
interface WorkerScope {
  addEventListener(type: 'message', listener: (event: MessageEvent<WorkerRequest>) => void): void;
  postMessage(message: WorkerResponse): void;
}

const scope = self as unknown as WorkerScope;
const state = createTaskState();

scope.addEventListener('message', (event) => {
  scope.postMessage(handleRequest(event.data, state));
});
