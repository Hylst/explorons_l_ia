// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Types de données
export interface Resource {
  title: string;
  source?: string;
  description: string;
  link: string;
  type: string;
  year?: number;
  tags?: string[];
  isInternal?: boolean;
  cover?: string;
}

export interface ScientificPublication {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  description: string;
  link: string;
}

export interface IAToolResource {
  name: string;
  description: string;
  /** Route interne ("/outil"), URL externe, ou "" si l'outil n'existe pas encore. */
  link: string;
  category: string;
  pricing: string;
  features: string[];
  /** Date de la dernière vérification de la fiche externe. */
  lastChecked?: string;
  /** Date du dernier relevé de la grille tarifaire (AAAA-MM-JJ), distincte du contrôle du lien. */
  pricingChecked?: string;
  /** Page tarifaire officielle lue pour ce relevé. */
  pricingUrl?: string;
  /** Date de la revue tarifaire quand aucune grille publique n'a pu être datée. */
  pricingReviewed?: string;
  /** Constat court affiché à la place d'une date de tarif. */
  pricingNote?: string;
  /** Langue de l'interface : fr (français), multi (français disponible), en (anglais). */
  interfaceLanguage?: 'fr' | 'multi' | 'en';
  /** Compte obligatoire pour utiliser l'outil. */
  accountRequired?: boolean;
  /** API publique documentée. */
  apiAvailable?: boolean;
  /** Date du relevé de la langue, du compte et de l'API. */
  factsChecked?: string;
}

export interface AuthorApp {
  name: string;
  description: string;
  link: string;
  category: string;
  /** Absent pour un site actif ; « en-construction » est affiché comme tel. */
  status?: 'en-construction';
  tags: string[];
}

// Import des données depuis les fichiers séparés
import { websites } from './data/websitesData';
import { books } from './data/booksData';
import { courses } from './data/coursesData';
import { videos } from './data/videosData';
import { articles } from './data/articlesData';
import { scientificPublications } from './data/scientificPublicationsData';
import { iaTools } from './data/toolsData';
import { authorApps } from './data/authorAppsData';

// Combine toutes les ressources
export const realResources: Resource[] = [
  ...websites,
  ...books,
  ...courses,
  ...videos,
  ...articles
];

// Export des données spécifiques
export { scientificPublications, iaTools, authorApps };
