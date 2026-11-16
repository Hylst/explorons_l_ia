// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Identité et URLs du site : source unique, aussi lue par vite.config.ts au build.
// Fichier aussi exécuté par Node au build : imports relatifs uniquement, aucune API propre à Vite.

export const SITE_NAME = "Explorons l'IA";
export const SITE_TAGLINE = "Comprendre l'intelligence artificielle, pas à pas";
export const SITE_ORIGIN = 'https://hylst.fr';
/** Sous-chemin de déploiement sur hylst.fr (avec slash final). */
export const SITE_BASE = '/explorons_l_ia/';
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`;

export const AUTHOR_NAME = 'Geoffroy Streit';
export const AUTHOR_CREDIT = 'Geoffroy avec assistance IA';
/** Ligne de présentation de l'auteur (cours, outils). Formulée d'après ses propres indications : pas de titre de consultant ni d'expert. */
export const AUTHOR_TITLE = "Ancien ingénieur en sciences de l'industrie, développeur d'applications, autodidacte en IA et en Python";
export const CONTACT_EMAIL = 'geoffroy.streit@ik.me';
export const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/geoffroy-streit/';
export const AUTHOR_GITHUB = 'https://github.com/Hylst';
export const PLATFORM_URL = `${SITE_ORIGIN}/`;
export const PLATFORM_LEGAL_URL = `${SITE_ORIGIN}/mentions-legales.html`;

/** Licence du code et des contenus rédigés pour le site (même règle que la plateforme hylst.fr). */
export const LICENSE_SPDX = 'AGPL-3.0-or-later';
export const LICENSE_NAME = 'GNU AGPL v3 ou ultérieure';
/** Copié depuis LICENSE vers dist/ par scripts/static-routes.ts (absent en `npm run dev`). */
export const LICENSE_FILE = 'LICENSE.txt';
/** Licences des bibliothèques et de la police livrées, écrit par scripts/third-party-notices.ts (absent en `npm run dev`). */
export const THIRD_PARTY_FILE = 'THIRD_PARTY_NOTICES.txt';
/**
 * Adresse publique du code source (`null` : aucun lien affiché). Ce dépôt de travail reste privé ; le code de chaque
 * version publiée est copié dans ce dépôt public par scripts/export-public-repo.mjs, sans l'historique.
 */
export const SOURCE_URL = 'https://github.com/Hylst/explorons_l_ia' as string | null;

export const DEFAULT_OG_IMAGE = `${SITE_URL}pics/explorons_l_ia.jpg`;

/** URL absolue d'une route interne, préfixée par SITE_URL. */
export const absoluteUrl = (path: string) => `${SITE_URL}${path.replace(/^\//, '')}`;

/** Lien mailto pré-rempli vers l'auteur. */
export const mailtoAuthor = (subject: string, body = '') =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

/**
 * Date (AAAA-MM-JJ) du dernier contrôle complet des liens externes, affichée en tête de /ressources.
 * À changer après un `npm run check:links` réussi et la relecture des 403 et délais dépassés, pas avant.
 */
export const LINKS_CHECKED_ON = '2026-11-06';
