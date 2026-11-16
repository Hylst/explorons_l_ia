// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Navigation principale : source unique pour Header (desktop) et MobileMenu.

export interface NavLink {
  text: string;
  href: string;
}

export interface NavCategory {
  id: string;
  title: string;
  items: NavLink[];
}

export const navCategories: NavCategory[] = [
  {
    id: 'fundamentals',
    title: 'Fondamentaux',
    items: [
      { text: 'Les bases', href: '/les-bases' },
      { text: "Types d'IA", href: '/types-ia' },
      { text: "Niveaux d'IA", href: '/niveaux-ia' },
      { text: 'Machine learning', href: '/machine-learning' },
      { text: 'IA multimodale', href: '/ia-multimodale' },
      { text: "IA pour les enfants", href: '/ia-expliquee-aux-enfants' },
    ],
  },
  {
    id: 'applications',
    title: 'Applications',
    items: [
      { text: "Cas d'usage", href: '/cas-usage' },
      { text: 'Histoire', href: '/histoire' },
      { text: 'Éthique', href: '/ethique' },
    ],
  },
  {
    id: 'resources',
    title: 'Ressources',
    items: [
      { text: 'Glossaire', href: '/glossaire' },
      { text: 'Cours approfondis', href: '/cours-approfondis' },
      { text: 'Ressources', href: '/ressources' },
      { text: 'Écosystème Hylst', href: '/ressources?tab=ecosysteme' },
      { text: 'Veille', href: '/actualites' },
    ],
  },
];

export const aboutLink: NavLink = { text: 'À propos', href: '/about' };

/** Liste à plat de toutes les entrées du menu. */
export const navLinks: NavLink[] = [...navCategories.flatMap((c) => c.items), aboutLink];
