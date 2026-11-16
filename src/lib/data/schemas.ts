// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { z } from 'zod';

/**
 * Schémas des données enregistrées par les outils. Ils servent à relire le stockage local sans planter sur une
 * donnée ancienne ou abîmée, à valider un fichier importé, et décriraient les ressources d'une future API.
 */

/** Estimation enregistrée dans le calculateur de coûts (format historique de la clé `savedCostCalculations`). */
export const costEstimateSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  date: z.string(),
  provider: z.string(),
  model: z.string(),
  inputTokens: z.number().finite().nonnegative(),
  outputTokens: z.number().finite().nonnegative(),
  totalCost: z.number().finite().nonnegative(),
  usageType: z.string(),
});
export type CostEstimate = z.infer<typeof costEstimateSchema>;

/**
 * Analyse du détecteur de contenu. Seuls les champs lus par l'historique sont vérifiés ; les autres sont gardés
 * tels quels (passthrough) pour ne rien perdre des anciennes analyses.
 */
export const detectionEntrySchema = z
  .object({
    id: z.string().min(1),
    fileName: z.string(),
    fileType: z.enum(['text', 'image', 'audio']),
    confidence: z.number().finite(),
    analysis: z
      .object({
        method: z.string(),
        timestamp: z.string(),
        processingTime: z.number().finite(),
      })
      .passthrough(),
  })
  .passthrough();
export type DetectionEntry = z.infer<typeof detectionEntrySchema>;

/** Prompt mis de côté dans le générateur de prompts. */
export const savedPromptSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  content: z.string(),
  templateId: z.string(),
  templateName: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  variables: z.record(z.string(), z.string()),
});
export type SavedPrompt = z.infer<typeof savedPromptSchema>;

/** Identifiant de l'unique grille de test du comparateur de modèles. */
export const MODEL_TEST_GRID_ID = 'grille';

/** Bornes de la grille de test : elles servent à l'interface comme à la validation du stockage. */
export const MODEL_TEST_GRID_LIMITS = {
  examples: 50,
  exampleLength: 2000,
  models: 100,
  /** Une note par exemple et par modèle, au plus. */
  scores: 50 * 100,
} as const;

/**
 * Grille de test du comparateur de modèles : les exemples écrits par le visiteur et ses notes de 1 à 5.
 * Une seule grille est gardée (identifiant fixe). Une note vise un exemple par son rang (à partir de 0) et un
 * modèle par son identifiant : un modèle retiré de la sélection garde ses notes. `models` donne le nom affiché des
 * modèles notés, pour que la sauvegarde reste lisible.
 */
export const modelTestGridSchema = z
  .object({
    id: z.literal(MODEL_TEST_GRID_ID),
    examples: z.array(z.string().max(MODEL_TEST_GRID_LIMITS.exampleLength)).min(1).max(MODEL_TEST_GRID_LIMITS.examples),
    models: z.array(z.object({ id: z.string().min(1), name: z.string() })).max(MODEL_TEST_GRID_LIMITS.models),
    scores: z
      .array(
        z.object({
          example: z.number().int().nonnegative(),
          model: z.string().min(1),
          score: z.number().int().min(1).max(5),
        })
      )
      .max(MODEL_TEST_GRID_LIMITS.scores),
    updatedAt: z.string(),
  })
  .refine((grid) => grid.scores.every((s) => s.example < grid.examples.length), {
    message: "Une note vise un exemple qui n'existe pas.",
  });
export type ModelTestGrid = z.infer<typeof modelTestGridSchema>;
