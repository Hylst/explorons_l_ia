// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createLocalCollection } from './localCollection';
import {
  costEstimateSchema,
  detectionEntrySchema,
  modelTestGridSchema,
  savedPromptSchema,
  type CostEstimate,
  type DetectionEntry,
  type ModelTestGrid,
  type SavedPrompt,
} from './schemas';
import type { Collection } from './types';

export type { Collection } from './types';
export { DataError } from './types';
export type { CostEstimate, DetectionEntry, ModelTestGrid, SavedPrompt } from './schemas';
export { MODEL_TEST_GRID_ID, MODEL_TEST_GRID_LIMITS } from './schemas';

/** Toutes les données que les outils peuvent enregistrer. */
export interface DataSource {
  costEstimates: Collection<CostEstimate>;
  detectionHistory: Collection<DetectionEntry>;
  savedPrompts: Collection<SavedPrompt>;
  /** Au plus une grille (identifiant fixe `MODEL_TEST_GRID_ID`). */
  testGrids: Collection<ModelTestGrid>;
}

/**
 * Clés du stockage local utilisées par les collections (noms historiques conservés pour ne rien perdre).
 * Elles figurent aussi dans `LOCAL_STORAGE_KEYS` (page « Vos données locales »).
 */
export const STORAGE_KEYS = {
  costEstimates: 'savedCostCalculations',
  detectionHistory: 'ai_detection_history',
  savedPrompts: 'savedPrompts',
  testGrids: 'modelTestGrid',
} as const;

/**
 * Source de données du site : uniquement le navigateur. Pour brancher un backend un jour, écrire une autre
 * implémentation de `DataSource` (mêmes interfaces, requêtes vers une API) et la choisir ici ; il faudrait aussi
 * ouvrir `connect-src` dans la CSP et mettre à jour les pages Confidentialité et Vos données locales.
 */
export const dataSource: DataSource = {
  costEstimates: createLocalCollection(STORAGE_KEYS.costEstimates, costEstimateSchema),
  detectionHistory: createLocalCollection(STORAGE_KEYS.detectionHistory, detectionEntrySchema, { max: 100 }),
  savedPrompts: createLocalCollection(STORAGE_KEYS.savedPrompts, savedPromptSchema),
  testGrids: createLocalCollection(STORAGE_KEYS.testGrids, modelTestGridSchema, { max: 1 }),
};
