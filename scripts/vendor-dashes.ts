// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Plugin Vite (build uniquement) : la table de symboles de KaTeX contient des tirets cadratin et demi-cadratin
// (« --- » devient « — » en mode texte). Ce n'est pas du texte éditorial, mais verify-dist refuse ces caractères
// partout dans dist/. KaTeX est donc isolé dans son propre fichier (vite.config.ts, groupe « katex ») et, dans ce
// seul fichier, ces caractères sont écrits sous forme d'échappement JavaScript (—, –), sans changer
// le comportement. Le reste du code et du contenu reste contrôlé par verify-dist.

import type { Plugin } from 'vite';

export const isKatexModule = (id: string) => /[\\/]node_modules[\\/]katex[\\/]/.test(id);

export function vendorDashesPlugin(): Plugin {
  return {
    name: 'explorons-vendor-dashes',
    apply: 'build',
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== 'chunk' || !file.moduleIds.length || !file.moduleIds.every(isKatexModule)) continue;
        file.code = file.code.replace(/—/g, '\\u2014').replace(/–/g, '\\u2013');
      }
    },
  };
}
