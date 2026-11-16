// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Serveur de test local qui imite le Nginx de hylst.fr pour cette section.
//   npm run build && npm run serve:dist  ->  http://localhost:4173/explorons_l_ia/
// Reproduit : sous-chemin, 301 sans slash final, try_files $uri $uri.html $uri/index.html,
// 404 de section, blocage .md / dotfiles, en-têtes de sécurité et CSP proposée pour la section.
// Le bloc Nginx réel (README) a été testé séparément avec un vrai Nginx et la configuration globale de la plateforme.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PREFIX = '/explorons_l_ia';
const PORT = Number(process.env.PORT || 4173);
// DIST_DIR permet de servir un autre dossier (par exemple un build de diagnostic non minifié).
const DIST = process.env.DIST_DIR
  ? path.resolve(process.env.DIST_DIR)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

// CSP à reporter dans le bloc Nginx de la section (voir README, section Déploiement).
export const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const securityHeaders = {
  'Content-Security-Policy': CSP,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-Frame-Options': 'SAMEORIGIN',
};

const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile();

const send = (res, status, file, extra = {}) => {
  const type = TYPES[path.extname(file)] || 'application/octet-stream';
  const cache = file.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache';
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': cache, ...securityHeaders, ...extra });
  fs.createReadStream(file)
    .on('error', (err) => {
      console.error('lecture', file, err.message);
      res.destroy();
    })
    .pipe(res);
};

const handle = (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === PREFIX) {
    res.writeHead(301, { Location: `${PREFIX}/${url.search}` });
    return res.end();
  }
  if (!pathname.startsWith(`${PREFIX}/`)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('404 hors section (racine hylst.fr non simulée)');
  }

  const rel = pathname.slice(PREFIX.length);
  if (/\/\.|\.(md|env|log|bak|old|swp)$/i.test(rel)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403');
  }

  const base = path.join(DIST, path.normalize(rel));
  if (!base.startsWith(DIST)) {
    res.writeHead(400);
    return res.end();
  }
  for (const candidate of [base, `${base}.html`, path.join(base, 'index.html')]) {
    if (isFile(candidate)) return send(res, 200, candidate);
  }
  return send(res, 404, path.join(DIST, '404.html'));
};

const server = http.createServer((req, res) => {
  try {
    handle(req, res);
  } catch (err) {
    console.error(req.url, err);
    if (!res.headersSent) res.writeHead(400);
    res.end();
  }
});
server.on('clientError', (err, socket) => socket.destroy());

server.listen(PORT, () => {
  console.log(`Section servie sur http://localhost:${PORT}${PREFIX}/ (dist : ${DIST})`);
});
