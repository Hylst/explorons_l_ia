// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Vérifie que la production sert exactement le build local : chaque fichier de dist/ est demandé à
// https://ia.hylst.fr/explorons_l_ia/ puis comparé en SHA-256. Contrôle aussi la redirection sans slash final, la 404 de section
// et l'absence de « supabase », de JWT ou de variable d'environnement dans les octets réellement servis.
// À lancer après le déploiement (réseau requis) : `npm run verify:prod`. PROD_BASE=https://... pour viser une autre adresse.
// Code de sortie 1 au moindre écart. Aucune dépendance.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const BASE = (process.env.PROD_BASE || 'https://ia.hylst.fr/explorons_l_ia/').replace(/\/?$/, '/');
const ORIGIN = new URL(BASE).origin;

if (!fs.existsSync(dist)) {
  console.error('dist/ introuvable : lancer `npm run build` d\'abord.');
  process.exit(2);
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const sha = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');
// Nginx bloque (403) les dotfiles et les extensions .md, .env, .log, .bak, .old, .swp : ils ne sont pas servis, donc pas comparés.
const BLOCKED = /(^|\/)\.[^/]+$|\.(md|env|log|bak|old|swp)$/i;
const all = walk(dist).map((f) => path.relative(dist, f).split(path.sep).join('/')).sort();
const files = all.filter((f) => !BLOCKED.test(f));

const problems = [];
const forbidden = { supabase: /supabase/i, jwt: /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}/, env: /VITE_[A-Z0-9_]{3,}/ };
let identical = 0;

const fetchFile = async (file) => {
  const url = BASE + file.split('/').map(encodeURIComponent).join('/');
  try {
    const res = await fetch(url, { redirect: 'manual' });
    if (res.status !== 200) {
      problems.push(`${res.status} au lieu de 200 : ${file}`);
      return;
    }
    const body = Buffer.from(await res.arrayBuffer());
    if (sha(body) === sha(fs.readFileSync(path.join(dist, file)))) identical++;
    else problems.push(`contenu différent du build local : ${file}`);
    const text = body.toString('utf8');
    for (const [name, re] of Object.entries(forbidden)) if (re.test(text)) problems.push(`${name} présent dans les octets servis : ${file}`);
  } catch (error) {
    problems.push(`erreur réseau (${error.cause && error.cause.code ? error.cause.code : error.message}) : ${file}`);
  }
};

const queue = [...files];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length > 0) await fetchFile(queue.shift());
  })
);

// redirection sans slash final et 404 de section
try {
  const res = await fetch(BASE.replace(/\/$/, ''), { redirect: 'manual' });
  const location = res.headers.get('location') || '';
  if (res.status !== 301 || !/\/explorons_l_ia\/$/.test(location)) problems.push(`redirection sans slash final : ${res.status} ${location}`);
} catch (error) {
  problems.push(`redirection sans slash final : erreur réseau (${error.message})`);
}
try {
  const res = await fetch(BASE + 'page-inexistante-verify-prod', { redirect: 'manual' });
  const body = await res.text();
  if (res.status !== 404 || !/Explorons l'IA/.test(body)) problems.push(`404 de section : ${res.status}, page du site ${/Explorons l'IA/.test(body) ? 'présente' : 'absente'}`);
} catch (error) {
  problems.push(`404 de section : erreur réseau (${error.message})`);
}

console.log(`${files.length} fichiers de dist/ comparés à ${ORIGIN} : ${identical} identiques (${all.length - files.length} fichier(s) bloqué(s) par Nginx ignoré(s)).`);
if (problems.length === 0) {
  console.log('Production conforme au build local.');
} else {
  console.log(`${problems.length} écart(s) :`);
  problems.slice(0, 40).forEach((p) => console.log('  ' + p));
}
process.exit(problems.length > 0 ? 1 : 0);
