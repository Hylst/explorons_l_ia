// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { IAToolResource } from './resourcesData.ts';
import { matchesQuery } from '../../lib/search.ts';

/**
 * Filtres du catalogue d'outils. Les options sont calculées sur le catalogue complet, jamais sur la
 * liste déjà filtrée : sinon une recherche fait disparaître des catégories et vide le filtre en cours.
 */

/** Ordre d'affichage des tarifs, du plus accessible au plus fermé. */
const PRICING_ORDER = ['Gratuit', 'Gratuit / poids ouverts', 'Freemium', 'Payant'];

const uniqueSorted = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b, 'fr'));

export const toolFilterOptions = (tools: IAToolResource[]): { categories: string[]; pricings: string[] } => ({
  categories: uniqueSorted(tools.map((tool) => tool.category)),
  pricings: [...new Set(tools.map((tool) => tool.pricing))].sort((a, b) => {
    const indexA = PRICING_ORDER.indexOf(a);
    const indexB = PRICING_ORDER.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b, 'fr');
  }),
});

export interface ToolFilters {
  category: string;
  pricing: string;
  query: string;
}

/** La recherche couvre le nom, la description, la catégorie, le tarif et les fonctions affichées. */
export const filterTools = (tools: IAToolResource[], { category, pricing, query }: ToolFilters): IAToolResource[] =>
  tools.filter((tool) =>
    (!category || tool.category === category) &&
    (!pricing || tool.pricing === pricing) &&
    matchesQuery(
      [tool.name, tool.description, tool.category, tool.pricing, ...tool.features].join(' '),
      query
    )
  );

/** Valeur venue de l'URL : ignorée si elle ne correspond plus à une option du catalogue. */
export const readToolFilter = (value: string | null, allowed: string[]): string =>
  value !== null && allowed.includes(value) ? value : '';

/** Identifiant d'ancre stable pour une fiche : ASCII, minuscules, tirets, sans accent. */
export const toolSlug = (name: string): string =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
