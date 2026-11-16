// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Test de clics du build (`npm run build` puis `npm run test:clicks`).
// Sert dist/ avec scripts/serve-dist.mjs, ouvre chaque URL du sitemap en bureau et en mobile, clique jusqu'à
// MAX_CLICKS contrôles visibles (boutons, onglets, interrupteurs, cases, résumés), ferme ce qui s'ouvre avec Échap
// et revient sur la page si un clic a navigué. Signale :
//   - erreur JavaScript, erreur ou avertissement de la console ;
//   - « NaN », « undefined » ou « Infinity » affichés dans la page ;
//   - clic qui ne rend pas la main (plus de 8 s) ;
//   - défilement horizontal de la page après un clic (état ouvert qui déborde, par exemple un tableau en mobile) ;
//   - violations axe-core « serious » ou « critical » après les clics (états ouverts, onglets, listes remplies).
// Les boutons dont le libellé évoque une suppression sont évités ; window.open est neutralisé (liens externes).
// Variables : CHROME_PATH, PORT (4291), DIST_DIR, ONLY=/a,/b, MAX_CLICKS (25), NO_AXE=1, VIEWPORTS=desktop|mobile.
// Code de sortie 1 au moindre constat. Ferme seulement le Chrome qu'il a lancé.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const require = createRequire(import.meta.url);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = process.env.PORT || '4291';
const DIST = process.env.DIST_DIR || fileURLToPath(new URL('../dist/', import.meta.url));
const BASE = `http://localhost:${PORT}/explorons_l_ia`;
const MAX_CLICKS = Number(process.env.MAX_CLICKS) || 25;
const VIEWPORTS = {
  desktop: { width: 1280, height: 900 },
  mobile: { width: 375, height: 800, isMobile: true, hasTouch: true },
};
const wanted = (process.env.VIEWPORTS || 'desktop,mobile').split(',').filter((v) => VIEWPORTS[v]);
const SELECTOR = 'button:not([disabled]), [role="tab"], [role="switch"], [role="checkbox"], summary';

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

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('délai')), ms));
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });
const findings = [];
let clicks = 0;

try {
  for (const view of wanted) {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport(VIEWPORTS[view]);
      // Animations réduites : sinon axe mesure le contraste de textes encore en train d'apparaître (opacité partielle).
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      const issues = [];
      page.on('pageerror', (e) => issues.push('erreur JS : ' + e.message.slice(0, 160)));
      page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && issues.push(`console ${m.type()} : ${m.text().slice(0, 160)}`));
      page.on('dialog', (d) => d.dismiss());
      await page.evaluateOnNewDocument(() => {
        window.open = () => null;
      });
      await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 });
      const start = new URL(page.url()).pathname;
      let index = 0;
      let done = 0;
      const began = Date.now();
      while (done < MAX_CLICKS && Date.now() - began < 120000) {
        const handles = await Promise.race([page.$$(SELECTOR), wait(8000).then(() => null)]);
        if (!handles) {
          issues.push('page figée (sélection des contrôles impossible)');
          break;
        }
        if (index >= handles.length) break;
        const handle = handles[index++];
        const label = await handle
          .evaluate((el) => {
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            const text = (el.getAttribute('aria-label') || el.textContent || '').trim();
            if (/supprimer|effacer|vider|retirer|delete/i.test(text)) return null;
            if (r.width <= 2 || r.height <= 2 || s.visibility === 'hidden' || el.closest('[aria-hidden="true"]')) return null;
            return text.slice(0, 50);
          })
          .catch(() => null);
        if (label === null) continue;
        await handle.evaluate((el) => el.scrollIntoView({ block: 'center' })).catch(() => {});
        try {
          await Promise.race([handle.click({ delay: 10 }), timeout(8000)]);
          done++;
          clicks++;
        } catch (e) {
          if (e.message === 'délai') issues.push(`clic sans fin : « ${label} »`);
          continue;
        }
        await wait(150);
        // Défilement horizontal de la page dans l'état ouvert par ce clic (onglet, panneau) : le test de fumée
        // ne voit que l'état au chargement.
        const overflowX = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth).catch(() => 0);
        if (overflowX > 2) issues.push(`défilement horizontal de ${overflowX} px après « ${label} »`);
        await page.keyboard.press('Escape').catch(() => {});
        await page
          .waitForFunction(() => !document.body.hasAttribute('data-scroll-locked'), { timeout: 1500 })
          .catch(() => {});
        if (new URL(page.url()).pathname !== start) {
          await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 }).catch(() => {});
        }
      }
      const text = await page.evaluate(() => document.body.innerText).catch(() => '');
      const bad = text.match(/\bNaN\b|\bundefined\b|\bInfinity\b/);
      if (bad) issues.push(`« ${bad[0]} » affiché dans la page`);
      // Souris écartée (sinon axe mesure les couleurs de survol de l'élément cliqué) et fondus terminés.
      await page.mouse.move(0, 0).catch(() => {});
      await wait(1500);
      if (axeSource) {
        // Injecté par evaluate : une balise de script en ligne serait bloquée par la CSP de production.
        await page.evaluate(axeSource).catch(() => {});
        const violations = await page
          .evaluate(async () => {
            const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
            return r.violations
              .filter((v) => v.impact === 'serious' || v.impact === 'critical')
              .map((v) => `${v.id} (${v.nodes.length}) : ${v.nodes[0]?.target.join(' ')}`);
          })
          .catch(() => []);
        violations.forEach((v) => issues.push('axe après clics : ' + v));
      }
      [...new Set(issues)].forEach((issue) => findings.push(`${route} [${view}] ${issue}`));
      process.stdout.write(issues.length ? 'x' : '.');
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.kill();
}

console.log(`\n${routes.length * wanted.length} passage(s), ${clicks} clic(s), ${findings.length} constat(s).`);
findings.forEach((f) => console.log('  ' + f));
process.exit(findings.length ? 1 : 0);
