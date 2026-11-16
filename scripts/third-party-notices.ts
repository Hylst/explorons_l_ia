// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Plugin Vite (build uniquement) : écrit dist/THIRD_PARTY_NOTICES.txt.
//
// Pourquoi : les licences MIT, ISC, BSD, Apache et OFL des bibliothèques et de la police livrées
// dans le JS et le CSS publics demandent que leur avis de copyright accompagne les copies.
// La liste est tirée des modules réellement présents dans les fichiers générés (pas de package.json),
// le texte de chaque licence est recopié tel quel depuis node_modules.

import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const MIT_TEXT = `Texte de la licence MIT (pour les paquets publiés sans fichier de licence)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.`;

// Composants copiés dans src/components/ui/ (pas un paquet npm : le plugin ne peut pas les détecter).
// Texte repris de https://github.com/shadcn-ui/ui/blob/main/LICENSE.md
const SHADCN_NOTICE = `shadcn/ui (MIT)
https://ui.shadcn.com

Les composants du dossier src/components/ui/ (boutons, cartes, boîtes de dialogue, formulaires, etc.) et le
hook use-toast sont adaptés de shadcn/ui.

MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const LICENSE_FILES = /^(licen[cs]e|copying|notice)(\.(md|txt))?$/i;

/** Nom du paquet à partir du chemin d'un module (le dernier node_modules gagne, paquets à portée inclus). */
const packageOf = (id: string): string | null => {
  const normalized = id.replace(/\\/g, '/').replace(/^\0/, '').split('?')[0];
  const index = normalized.lastIndexOf('/node_modules/');
  if (index === -1) return null;
  const parts = normalized.slice(index + '/node_modules/'.length).split('/');
  return parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0];
};

export function thirdPartyNoticesPlugin(options: { rootDir: string; alwaysInclude?: string[] }): Plugin {
  let outDir = 'dist';
  return {
    name: 'third-party-notices',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    writeBundle(_output, bundle) {
      const names = new Set(options.alwaysInclude ?? []);
      for (const item of Object.values(bundle)) {
        if (item.type !== 'chunk') continue;
        for (const id of Object.keys(item.modules)) {
          const name = packageOf(id);
          if (name) names.add(name);
        }
      }

      const sections: string[] = [];
      const missing: string[] = [];
      for (const name of [...names].sort()) {
        const dir = path.join(options.rootDir, 'node_modules', name);
        const pkgFile = path.join(dir, 'package.json');
        if (!fs.existsSync(pkgFile)) continue;
        const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
        const license = typeof pkg.license === 'string' ? pkg.license : pkg.license?.type ?? 'non précisée';
        const files = fs.readdirSync(dir).filter((file) => LICENSE_FILES.test(file));
        if (files.length === 0) missing.push(name);
        // Fins de ligne normalisées : certains paquets livrent leur licence en CRLF, que git convertit au dépôt.
        const texts = files.map((file) => fs.readFileSync(path.join(dir, file), 'utf8').replace(/\r\n?/g, '\n').trim());
        if (files.length === 0) {
          const repo = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url;
          texts.push(
            `Le paquet publié ne contient pas de fichier de licence. Licence déclarée : ${license}` +
              (repo ? `, avis de copyright dans le dépôt du projet : ${repo.replace(/^git\+/, '').replace(/\.git$/, '')}` : '') +
              (license === 'MIT' ? '. Texte de la licence MIT : voir la fin de ce fichier.' : '.')
          );
        }
        sections.push(
          [`${pkg.name} ${pkg.version} (${license})`, pkg.homepage ? `${pkg.homepage}` : '', '', ...texts]
            .filter((line, i) => i !== 1 || line)
            .join('\n')
        );
      }

      sections.push(SHADCN_NOTICE);
      const header = [
        'Composants tiers livrés avec ce site',
        '',
        `Ce fichier liste les ${sections.length} bibliothèques, composants et polices inclus dans le JavaScript et le CSS publiés,`,
        'avec leur licence. Le code propre au site est sous licence AGPL-3.0-or-later (voir LICENSE.txt).',
      ];
      const separator = '\n\n' + '='.repeat(72) + '\n\n';
      const count = sections.length;
      if (missing.length > 0) sections.push(MIT_TEXT);
      fs.writeFileSync(path.join(outDir, 'THIRD_PARTY_NOTICES.txt'), header.join('\n') + separator + sections.join(separator) + '\n');
      this.info?.(`third-party-notices : ${count} composants listés dans THIRD_PARTY_NOTICES.txt`);
    },
  };
}
