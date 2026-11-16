// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { PricingTier } from './aiProvidersData.ts';

/**
 * Calcul du coût d'usage d'une API facturée au token. Prix en dollars US par million de tokens, comme sur les
 * pages des fournisseurs. Les remises de cache et de traitement par lots ne sont appliquées que si le visiteur
 * saisit lui-même les taux lus sur la page de son fournisseur : le site ne suppose aucun taux.
 */

export interface Scenario {
  inputTokens: number; // par requête
  outputTokens: number; // par requête
  users: number;
  requestsPerUser: number; // par utilisateur et par jour
  daysPerMonth: number;
  /** Part des tokens d'entrée servis par le cache du fournisseur, en pourcentage. */
  cachedInputShare: number;
  /** Remise du fournisseur sur ces tokens mis en cache, en pourcentage. */
  cacheDiscount: number;
  /** Part des requêtes envoyées en traitement par lots, en pourcentage. */
  batchRequestShare: number;
  /** Remise du fournisseur sur ces requêtes, en pourcentage. */
  batchDiscount: number;
}

export const DEFAULT_SCENARIO: Scenario = {
  inputTokens: 1000,
  outputTokens: 500,
  users: 10,
  requestsPerUser: 20,
  daysPerMonth: 30,
  cachedInputShare: 0,
  cacheDiscount: 0,
  batchRequestShare: 0,
  batchDiscount: 0
};

export const SCENARIO_LIMITS = {
  inputTokens: { min: 0, max: 10_000_000 },
  outputTokens: { min: 0, max: 1_000_000 },
  users: { min: 0, max: 10_000_000 },
  requestsPerUser: { min: 0, max: 100_000 },
  daysPerMonth: { min: 1, max: 31 },
  cachedInputShare: { min: 0, max: 100 },
  cacheDiscount: { min: 0, max: 100 },
  batchRequestShare: { min: 0, max: 100 },
  batchDiscount: { min: 0, max: 100 }
} as const;

/** Ramène une saisie à un entier dans les bornes (vide, négatif ou non numérique deviennent la borne basse). */
export function clampField(field: keyof Scenario, value: number): number {
  const { min, max } = SCENARIO_LIMITS[field];
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export interface CostBreakdown {
  inputCost: number;
  outputCost: number;
  perRequest: number;
  /** Coût d'une requête sans aucune remise : sert à chiffrer l'économie obtenue. */
  perRequestFull: number;
  requestsPerDay: number;
  perDay: number;
  perMonth: number;
  perYear: number;
  /** Économie mensuelle due aux remises saisies (cache et lots), en dollars. */
  discountPerMonth: number;
}

/**
 * Coût d'un usage. Les remises sont des pourcentages saisis par le visiteur : cache appliqué aux tokens
 * d'entrée, traitement par lots appliqué à une part des requêtes. À 0, le calcul est identique au prix plein.
 */
export function computeCost(scenario: Scenario, tier: Pick<PricingTier, 'inputPrice' | 'outputPrice'>): CostBreakdown {
  const inputTokensCost = (scenario.inputTokens / 1_000_000) * tier.inputPrice;
  const outputCost = (scenario.outputTokens / 1_000_000) * tier.outputPrice;
  const cacheFactor = 1 - (scenario.cachedInputShare / 100) * (scenario.cacheDiscount / 100);
  const batchFactor = 1 - (scenario.batchRequestShare / 100) * (scenario.batchDiscount / 100);
  const inputCost = inputTokensCost * cacheFactor;
  const perRequestFull = inputTokensCost + outputCost;
  const perRequest = (inputCost + outputCost) * batchFactor;
  const requestsPerDay = scenario.users * scenario.requestsPerUser;
  const perDay = perRequest * requestsPerDay;
  const perMonth = perDay * scenario.daysPerMonth;
  return {
    inputCost,
    outputCost,
    perRequest,
    perRequestFull,
    requestsPerDay,
    perDay,
    perMonth,
    perYear: perMonth * 12,
    discountPerMonth: (perRequestFull - perRequest) * requestsPerDay * scenario.daysPerMonth
  };
}

/** Montant en dollars, avec assez de chiffres significatifs pour les très petites sommes. */
export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return 'non défini';
  if (value === 0) return '0\u00A0$';
  const digits = value >= 100 ? 0 : value >= 1 ? 2 : Math.min(8, 2 - Math.floor(Math.log10(value)) + 1);
  return `${value.toLocaleString('fr-FR', { minimumFractionDigits: value >= 100 ? 0 : 2, maximumFractionDigits: digits })}\u00A0$`;
}

export const formatInt = (value: number) => Math.round(value).toLocaleString('fr-FR');
