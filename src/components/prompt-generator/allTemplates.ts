// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { promptTemplates, promptCategories, type PromptCategory, type PromptTemplate } from './promptTemplatesData';
import { enhancedPromptTemplates, enhancedPromptCategories } from './enhancedPromptTemplates';
import { allSpecializedTemplates, allSpecializedCategories } from './templates';

/**
 * Source unique des gabarits affichés : les trois fichiers de données réunis. Les catégories déclarées deux fois
 * (même identifiant dans deux fichiers) sont fusionnées, et celles qui ne contiennent aucun gabarit sont écartées,
 * pour que les compteurs affichés correspondent à ce que le visiteur peut réellement choisir.
 */
export const allTemplates: PromptTemplate[] = [...promptTemplates, ...enhancedPromptTemplates, ...allSpecializedTemplates];

const advancedIds = new Set([...enhancedPromptTemplates, ...allSpecializedTemplates].map((t) => t.id));
export const isAdvancedTemplate = (template: PromptTemplate) => advancedIds.has(template.id);

export const allCategories: PromptCategory[] = (() => {
  const used = new Set(allTemplates.map((t) => t.category));
  const byId = new Map<string, PromptCategory>();
  for (const category of [...promptCategories, ...enhancedPromptCategories, ...allSpecializedCategories]) {
    if (used.has(category.id) && !byId.has(category.id)) byId.set(category.id, category);
  }
  return [...byId.values()];
})();

export const templateCounts = {
  templates: allTemplates.length,
  categories: allCategories.length,
};
