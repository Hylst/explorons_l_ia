// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { SITE_BASE } from '@/config/site';

/**
 * Préfixe un fichier de public/ avec la base Vite, pour que les chemins
 * fonctionnent sous le sous-chemin de déploiement (/explorons_l_ia/).
 * Exemple : asset('pics/veille-carnet.jpg') -> '/explorons_l_ia/pics/veille-carnet.jpg'
 */
export const asset = (path: string) => `${SITE_BASE}${path.replace(/^\//, '')}`;
