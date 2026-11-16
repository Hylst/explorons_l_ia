// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Test de fumée du build (`npm run build` puis `npm run test:smoke`).
// Sert dist/ avec scripts/serve-dist.mjs (sous-chemin, 404 et CSP de production), ouvre chaque URL du sitemap
// en bureau (1280 px) et en mobile (375 px) dans Chrome, et signale :
//   - erreur JavaScript, erreur ou avertissement de la console (une ressource distante bloquée par la CSP en est une) ;
//   - requête vers le site en échec ou en erreur HTTP ;
//   - défilement horizontal de la page une fois les animations d'entrée terminées ;
//   - page sans titre h1, ou avec plusieurs h1 ;
//   - violations axe-core « serious » ou « critical » (WCAG 2.1 A et AA), après un défilement de toute la page.
// Ne teste ni les clics ni les états ouverts (menus, onglets) : il ne remplace pas une vérification à la main.
// Variables : CHROME_PATH (sinon emplacements usuels), PORT (4290), DIST_DIR (autre build), ONLY=/a,/b (sous Git Bash : MSYS_NO_PATHCONV=1), THEME=dark, NO_AXE=1,
// VIEWPORTS=desktop|mobile. Code de sortie 1 au moindre constat. Ferme seulement le Chrome qu'il a lancé.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const require = createRequire(import.meta.url);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = process.env.PORT || '4290';
const DIST = process.env.DIST_DIR || fileURLToPath(new URL('../dist/', import.meta.url));
const BASE = `http://localhost:${PORT}/explorons_l_ia`;
const VIEWPORTS = {
  desktop: { width: 1280, height: 900 },
  mobile: { width: 375, height: 800, isMobile: true, hasTouch: true },
};
const wanted = (process.env.VIEWPORTS || 'desktop,mobile').split(',').filter((v) => VIEWPORTS[v]);

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  const found = candidates.find((p) => p && fs.existsSync(p));
  if (!found) {
    console.error('Chrome introuvable : définir CHROME_PATH.');
    process.exit(2);
  }
  return found;
}

const sitemapPath = `${DIST.replace(/\/$/, '')}/sitemap.xml`;
if (!fs.existsSync(sitemapPath)) {
  console.error(`${sitemapPath} introuvable : lancer d'abord npm run build.`);
  process.exit(2);
}
let routes = [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>https:\/\/[^/]+\/explorons_l_ia(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
if (process.env.ONLY) routes = routes.filter((r) => process.env.ONLY.split(',').includes(r));
// Une route demandée mais absente (faute de frappe, ou chemin converti par Git Bash sans MSYS_NO_PATHCONV=1)
// ne doit pas être ignorée en silence.
const missingRoutes = (process.env.ONLY || '').split(',').filter((r) => r && !routes.includes(r));
if (missingRoutes.length) {
  console.error(`Route(s) absente(s) du sitemap : ${missingRoutes.join(', ')} (sous Git Bash, préfixer MSYS_NO_PATHCONV=1).`);
  process.exit(2);
}
const axeSource = process.env.NO_AXE ? null : fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const server = spawn(process.execPath, ['scripts/serve-dist.mjs'], {
  cwd: ROOT,
  env: { ...process.env, PORT, DIST_DIR: DIST },
  stdio: 'ignore',
});
let ready = false;
for (let i = 0; i < 60 && !ready; i++) {
  try {
    ready = (await fetch(`${BASE}/`)).ok;
  } catch {
    await new Promise((r) => setTimeout(r, 250));
  }
}
if (!ready) {
  server.kill();
  console.error(`Le serveur de test ne répond pas sur le port ${PORT} (déjà occupé ?).`);
  process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });
const findings = [];
const report = (route, viewport, message) => findings.push(`${route} [${viewport}] ${message}`);

try {
  for (const viewportName of wanted) {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport(VIEWPORTS[viewportName]);
      // THEME=dark : même contrôle en thème sombre (préférence enregistrée par le site et préférence système).
      const dark = process.env.THEME === 'dark';
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'no-preference' },
        { name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' },
      ]);
      if (dark) {
        await page.evaluateOnNewDocument(() => {
          try {
            localStorage.setItem('theme', 'dark');
          } catch {
            // stockage indisponible : la préférence système suffit
          }
        });
      }
      const issues = [];
      page.on('pageerror', (error) => issues.push(`erreur JS : ${error.message.slice(0, 160)}`));
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') issues.push(`console ${message.type()} : ${message.text().slice(0, 160)}`);
      });
      page.on('requestfailed', (request) => issues.push(`requête en échec : ${request.url()} (${request.failure()?.errorText})`));
      page.on('response', (response) => {
        if (response.url().startsWith(BASE) && response.status() >= 400) issues.push(`HTTP ${response.status()} : ${response.url()}`);
      });
      try {
        await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 45_000 });
        await new Promise((r) => setTimeout(r, 1500));
        const facts = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          h1: document.querySelectorAll('h1').length,
        }));
        if (facts.overflow > 1) issues.push(`défilement horizontal de ${facts.overflow} px`);
        if (facts.h1 !== 1) issues.push(`${facts.h1} titre(s) h1`);
        if (axeSource) {
          // Parcourt toute la page avant axe : les blocs qui apparaissent au défilement (whileInView) restent sinon
          // à opacité nulle, et axe ne contrôle pas le contraste d'un élément invisible.
          await page.evaluate(async () => {
            for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(window.innerHeight * 0.6)) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 120));
            }
          });
          // Attend la fin des fondus d'entrée (opacité intermédiaire posée en style par framer-motion), sinon axe
          // mesure le contraste d'un texte encore à moitié transparent ; 6 s au plus, puis on contrôle quand même.
          await page
            .waitForFunction(
              () => {
                // Animations finies encore en cours (framer-motion passe souvent par l'API d'animation du navigateur :
                // le style en ligne reste à « opacity: 0 » pendant le fondu) ; les boucles infinies sont ignorées.
                const running = document
                  .getAnimations()
                  .some((a) => a.playState === 'running' && a.effect?.getComputedTiming().endTime !== Infinity);
                const halfVisible = [...document.querySelectorAll('[style*="opacity"]')].some((el) => {
                  const o = parseFloat(getComputedStyle(el).opacity);
                  return o > 0.02 && o < 0.98;
                });
                // Les fondus déclenchés à l'apparition démarrent quelques centaines de ms après le défilement : on exige
                // une seconde complète sans mouvement, sinon la page paraît calme juste avant qu'ils ne commencent.
                const w = window;
                if (running || halfVisible) {
                  w.__calmSince = undefined;
                  return false;
                }
                w.__calmSince ??= performance.now();
                return performance.now() - w.__calmSince > 1000;
              },
              { timeout: 8000, polling: 200 }
            )
            .catch(() => {});
          await new Promise((r) => setTimeout(r, 300));
          await page.evaluate(axeSource);
          const violations = await page.evaluate(async () => {
            const result = await window.axe.run(document, {
              runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
              resultTypes: ['violations'],
            });
            return result.violations
              .filter((v) => v.impact === 'serious' || v.impact === 'critical')
              .map((v) => `${v.id} (${v.nodes.length}) : ${v.nodes[0]?.target.join(' ')}`);
          });
          violations.forEach((v) => issues.push(`axe ${v}`));
        }
      } catch (error) {
        issues.push(`chargement impossible : ${error.message.slice(0, 160)}`);
      }
      issues.forEach((issue) => report(route, viewportName, issue));
      process.stdout.write(issues.length ? 'x' : '.');
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.kill();
}

const pages = routes.length * wanted.length;
console.log(`\n${pages} chargement(s) de page, ${findings.length} constat(s).`);
findings.forEach((f) => console.log(`  ${f}`));
process.exit(findings.length ? 1 : 0);
