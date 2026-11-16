// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Contrôle réel des liens externes du site (remplace l'ancien « audit de liens » simulé, déplacé dans _archive/).
// Extrait les URL http(s) de src/ et d'index.html, interroge chaque hôte (un à la fois, avec une pause) et signale :
//   - morts : réponse 404 ou 410, vidéo YouTube indisponible (API oEmbed), hôte injoignable (DNS, certificat, connexion refusée) ;
//   - déplacés : réponse 200 après une redirection vers un autre site ou vers une page d'accueil (à mettre à jour) ;
//   - incertains : 401, 403, 405, 429, 451, 503, 999, délai dépassé ou boucle de redirection (souvent une protection
//     anti-robot : ne fait pas échouer le contrôle ; à vérifier dans un navigateur avant de retirer un lien).
// hylst.fr n'est pas ignoré : les applications de l'auteur y sont hébergées et doivent rester joignables.
// Hors build (le réseau est nécessaire) : `npm run check:links`. Code de sortie 1 s'il y a au moins un lien mort.
// Option --json : sortie JSON. Les adresses d'exemple (api.example.com...) et les points d'accès d'API cités dans des
// exemples de code sont ignorés. Aucune dépendance.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const exec = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const asJson = process.argv.includes('--json');

const IGNORED_HOST = /(^|\.)(w3\.org|schema\.org|localhost|127\.0\.0\.1|exemple\.fr|googleapis\.com)$|(^|\.)example\.(com|org)$|^(api|sandbox\.api|staging\.api)\./;
const BOT_BLOCKED = new Set([401, 403, 405, 406, 429, 451, 503, 999]);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return entry.name === 'ui' && full.includes('components') ? [] : walk(full);
        return /\.(ts|tsx|html|json|webmanifest)$/.test(entry.name) ? [full] : [];
      })
    : [];

// 1. extraction
const occurrences = new Map();
for (const file of [...walk(path.join(root, 'src')), ...walk(path.join(root, 'public')), path.join(root, 'index.html')]) {
  if (!fs.existsSync(file)) continue;
  const rel = path.relative(root, file).split(path.sep).join('/');
  fs.readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      for (const match of line.matchAll(/https?:\/\/[^\s"'`)<>\\\]}]+/g)) {
        const url = match[0].replace(/[.,;:!?]+$/, '');
        if (url.includes('${')) continue;
        let host;
        try {
          host = new URL(url).hostname;
        } catch {
          continue;
        }
        if (IGNORED_HOST.test(host)) continue;
        if (!occurrences.has(url)) occurrences.set(url, []);
        occurrences.get(url).push(`${rel}:${index + 1}`);
      }
    });
}

// 2. requêtes
const request = async (url, method) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, { method, redirect: 'follow', signal: controller.signal, headers: { 'user-agent': UA, accept: 'text/html,*/*', 'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8' } });
    return { status: res.status, final: res.url };
  } finally {
    clearTimeout(timer);
  }
};

const viaCurl = async (url) => {
  try {
    // un fichier de cookies par hôte : certains sites (ai.google.dev) bouclent en redirection tant qu'aucun cookie n'est posé
    const jar = path.join(os.tmpdir(), `check-links-${new URL(url).hostname}.cookies`);
    const { stdout } = await exec('curl', ['-s', '-L', '--max-redirs', '8', '--max-time', '25', '-A', UA, '-c', jar, '-b', jar, '-o', process.platform === 'win32' ? 'nul' : '/dev/null', '-w', '%{http_code} %{url_effective}', url], { timeout: 40000 });
    const [code, ...rest] = stdout.trim().split(' ');
    return Number(code) > 0 ? { status: Number(code), final: rest.join(' ') } : null;
  } catch {
    return null;
  }
};

const check = async (url) => {
  if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) {
    try {
      const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`, { headers: { 'user-agent': UA } });
      return { status: res.status, final: url, youtube: true };
    } catch (error) {
      return { status: 0, final: url, error: String(error.message || error) };
    }
  }
  try {
    let result = await request(url, 'HEAD');
    if (result.status >= 400) result = await request(url, 'GET');
    return result;
  } catch (first) {
    try {
      return await request(url, 'GET');
    } catch (second) {
      // erreurs propres au client Node (en-têtes trop gros, TLS...) : on recoupe avec curl avant de conclure
      const curl = await viaCurl(url);
      if (curl) return curl;
      const cause = (second && second.cause && (second.cause.code || second.cause.message)) || (second && second.message) || String(second);
      // boucle de redirection (ex. ai.google.dev renvoie vers l'authentification Google aux clients sans navigateur) : incertain, pas mort
      // délai dépassé : l'hôte ne répond pas à ce client (souvent un CDN anti-robot, ex. adobe.com), incertain aussi
      return { status: 0, final: url, error: String(cause), loop: /redirect/i.test(String(cause)), timeout: /abort|timeout|timed out|ETIMEDOUT/i.test(String(cause)) };
    }
  }
};

const byHost = new Map();
for (const url of occurrences.keys()) {
  const host = new URL(url).hostname;
  if (!byHost.has(host)) byHost.set(host, []);
  byHost.get(host).push(url);
}
const results = [];
const hosts = [...byHost.keys()];
const worker = async () => {
  while (hosts.length > 0) {
    const host = hosts.shift();
    for (const url of byHost.get(host)) {
      results.push({ url, ...(await check(url)) });
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
};
await Promise.all(Array.from({ length: 10 }, worker));

// 3. classement
const isMoved = (r) => {
  try {
    const a = new URL(r.url);
    const b = new URL(r.final);
    const hostChanged = a.hostname.replace(/^www\./, '') !== b.hostname.replace(/^www\./, '');
    const toHome = a.pathname.replace(/\/$/, '') !== '' && b.pathname.replace(/\/$/, '') === '';
    return !r.youtube && r.status >= 200 && r.status < 300 && (hostChanged || toHome);
  } catch {
    return false;
  }
};
const dead = results.filter((r) => [404, 410].includes(r.status) || (r.youtube && r.status >= 400) || (r.status === 0 && !r.loop && !r.timeout));
const moved = results.filter(isMoved);
const uncertain = results.filter((r) => (BOT_BLOCKED.has(r.status) && !r.youtube) || r.loop || r.timeout);
const where = (url) => occurrences.get(url).slice(0, 2).join(', ');

if (asJson) {
  console.log(JSON.stringify({ total: results.length, dead, moved, uncertain }, null, 2));
} else {
  console.log(`${results.length} URL externes distinctes contrôlées sur ${byHost.size} hôtes.`);
  console.log(`\nLiens morts : ${dead.length}`);
  for (const r of dead) console.log(`  ${r.status || r.error} ${r.url}  <-  ${where(r.url)}`);
  console.log(`\nLiens déplacés (200 après redirection vers un autre site ou une page d'accueil) : ${moved.length}`);
  for (const r of moved) console.log(`  ${r.url} -> ${r.final}  <-  ${where(r.url)}`);
  console.log(`\nIncertains (protection anti-robot probable, à vérifier au besoin dans un navigateur) : ${uncertain.length}`);
  for (const r of uncertain) console.log(`  ${r.status || (r.timeout ? 'délai dépassé' : 'redirections sans fin')} ${r.url}  <-  ${where(r.url)}`);
}
process.exit(dead.length > 0 ? 1 : 0);
