// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/** Libellés affichés pour le type d'une ressource proposée. */
export const RESOURCE_TYPE_LABELS = {
  article: 'Article',
  book: 'Livre',
  video: 'Vidéo',
  course: 'Cours',
  website: 'Site web',
  tool: 'Outil IA',
} as const;

export type ResourceType = keyof typeof RESOURCE_TYPE_LABELS;

/** Libellé lisible d'un type de ressource, utilisé dans l'e-mail de proposition. */
export const resourceTypeLabel = (type: ResourceType): string => RESOURCE_TYPE_LABELS[type];
