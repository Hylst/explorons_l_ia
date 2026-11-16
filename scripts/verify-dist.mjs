// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Contrôle de dist/ après le build (lancé par "npm run build" via le script postbuild).
// Le site est 100 % statique : aucun secret, aucun service tiers. Le build échoue si l'une des
// chaînes ci-dessous se retrouve dans un fichier texte destiné à être publié.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const TEXT_EXT = new Set(['.html', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.svg', '.webmanifest', '.map']);

// secret : true = l'extrait n'est pas affiché, pour ne jamais recopier une clé dans un journal.
const RULES = [
  { name: 'Supabase (client, URL ou clé)', re: /supabase/i },
  { name: "variable d'environnement (VITE_* ou EXPLORER_PUBLIC_*)", re: /(?:VITE|EXPLORER_PUBLIC)_[A-Z0-9_]+/ },
  { name: "jeton JWT (clé d'API)", re: /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}/, secret: true },
  { name: "clé d'API de type sk-", re: /\bsk-[A-Za-z0-9_-]{20,}/, secret: true },
  { name: "clé d'API Google (AIza)", re: /AIza[0-9A-Za-z_-]{35}/, secret: true },
  // Règle éditoriale du site : les textes de licence tiers, recopiés tels quels, en sont exemptés.
  { name: 'tiret cadratin (règle éditoriale de la plateforme)', re: /—/, skip: /^THIRD_PARTY_NOTICES.txt$/ },
];

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

if (!fs.existsSync(DIST)) {
  console.error('verify-dist : dist/ est introuvable, lancer le build avant.');
  process.exit(1);
}

const problems = [];
let scanned = 0;

for (const file of walk(DIST)) {
  if (!TEXT_EXT.has(path.extname(file).toLowerCase())) continue;
  scanned += 1;
  const content = fs.readFileSync(file, 'utf8');
  for (const rule of RULES) {
    if (rule.skip?.test(path.relative(DIST, file))) continue;
    const match = rule.re.exec(content);
    if (!match) continue;
    const excerpt = rule.secret
      ? '(extrait masqué)'
      : JSON.stringify(content.slice(Math.max(0, match.index - 40), match.index + 60));
    problems.push(`  ${path.relative(DIST, file)} : ${rule.name} ${excerpt}`);
  }
}

if (problems.length > 0) {
  console.error(`verify-dist : ÉCHEC, ${problems.length} problème(s) dans dist/ :`);
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log(`verify-dist : ${scanned} fichiers texte contrôlés dans dist/, aucune chaîne interdite.`);
