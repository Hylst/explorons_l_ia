// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { resourceTypeLabel, type ResourceType } from "./resourceTypeLabels.ts";

export interface ProposalEmailInput {
  title: string;
  author: string;
  link: string;
  type: ResourceType;
  level: string;
  language: string;
  year?: number;
  topics?: string;
  description: string;
}

/**
 * Prépare l'e-mail de proposition de ressource.
 * Le corps est du texte brut : pas d'espace insécable (règle de typographie du site).
 */
export const buildProposalEmail = (data: ProposalEmailInput) => {
  const details = [
    `Titre : ${data.title}`,
    `Auteur / source : ${data.author}`,
    `Lien : ${data.link}`,
    `Type : ${resourceTypeLabel(data.type)} - Niveau : ${data.level} - Langue : ${data.language}`,
    data.year ? `Année : ${data.year}` : '',
    data.topics ? `Thèmes : ${data.topics}` : '',
  ].filter(Boolean);
  return {
    subject: `Explorons l'IA - proposition de ressource : ${data.title}`,
    body: ['Bonjour,', '', "Je propose cette ressource pour Explorons l'IA :", '', ...details, '', data.description].join('\n'),
  };
};
