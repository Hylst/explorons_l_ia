// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Vérifications ciblées des nouveautés d'interface après `npm run build`.
// Couvre la recherche, les filtres, le laboratoire de convolution, le seuil JEV,
// un quiz classique et le JSON-LD. À lancer avec `npm run test:ui`.
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = process.env.PORT || '4293';
const BASE = `http://localhost:${PORT}/explorons_l_ia`;
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
if (!fs.existsSync(`${DIST}sitemap.xml`)) {
  console.error('dist/sitemap.xml absent : lancer npm run build.');
  process.exit(2);
}
const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
].find((p) => p && fs.existsSync(p));
if (!chrome) {
  console.error('Chrome introuvable : définir CHROME_PATH.');
  process.exit(2);
}

const server = spawn(process.execPath, ['scripts/serve-dist.mjs'], {
  cwd: ROOT,
  env: { ...process.env, PORT },
  stdio: 'ignore',
});
let ready = false;
for (let i = 0; i < 60 && !ready; i++) {
  try { ready = (await fetch(`${BASE}/`)).ok; } catch { await new Promise((r) => setTimeout(r, 250)); }
}
if (!ready) {
  server.kill();
  console.error('Le serveur de test ne répond pas.');
  process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

try {
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') pageErrors.push(message.text()); });
  await page.setViewport({ width: 1280, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  // Recherche et filtre.
  await page.goto(`${BASE}/cours-approfondis`, { waitUntil: 'networkidle0' });
  const total = await page.$$eval('main ul li', (items) => items.length);
  await page.type('#recherche-cours', 'RAG');
  await new Promise((r) => setTimeout(r, 150));
  const searched = await page.$$eval('main ul li', (items) => items.length);
  check(searched > 0 && searched < total, `recherche : ${searched} résultats sur ${total}`);
  await page.click('button[aria-label="Effacer la recherche"]');
  await page.click('button[aria-pressed="false"]');
  await new Promise((r) => setTimeout(r, 150));
  const filtered = await page.$$eval('main ul li', (items) => items.length);
  check(filtered > 0 && filtered <= total, `filtre : ${filtered} résultats sur ${total}`);

  // Laboratoire de convolution.
  await page.goto(`${BASE}/cours/cnn-architectures-vision`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#lab-noyau', { timeout: 15000 });
  await page.select('#lab-noyau', 'horizontal');
  const summaryBefore = await page.$eval('#lab-conv-summary', (el) => el.textContent || '');
  await page.select('#lab-pas', '2');
  await new Promise((r) => setTimeout(r, 100));
  const summaryAfter = await page.$eval('#lab-conv-summary', (el) => el.textContent || '');
  check(summaryBefore !== summaryAfter && summaryAfter.includes('4 positions'), `convolution : « ${summaryAfter} »`);

  // Seuil JEV.
  await page.goto(`${BASE}/cours/jev#calibration`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#seuil-jev', { timeout: 15000 });
  await page.$eval('#seuil-jev', (el) => {
    const input = el;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    setter?.call(input, '0.5');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await new Promise((r) => setTimeout(r, 100));
  const metrics = await page.$$eval('[aria-live="polite"]', (els) => els.map((el) => el.textContent).join(' '));
  check(metrics.includes('12/20'), `seuil JEV : « ${metrics} »`);

  // Masque de tokens.
  await page.goto(`${BASE}/cours/decodage-contraint#masquage-des-tokens`, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => [...document.querySelectorAll('button')].some((b) => (b.textContent || '').includes('Bonjour')), { timeout: 15000 });
  const clickToken = async (label) => {
    const clicked = await page.$$eval('button', (buttons, text) => {
      const button = buttons.find((el) => (el.textContent || '').trim() === text);
      if (!button) return false;
      button.click();
      return true;
    }, label);
    if (!clicked) failures.push(`masque : token ${label} introuvable`);
  };
  await clickToken('Bonjour');
  await new Promise((r) => setTimeout(r, 100));
  const maskMessage = await page.$$eval('p[aria-live="polite"]', (els) => els.map((el) => el.textContent).join(' '));
  check(maskMessage.includes('interdit'), `masque : « ${maskMessage} »`);

  // Formulaire de proposition : la validation zod doit répondre sans erreur JS.
  await page.goto(`${BASE}/ressources`, { waitUntil: 'networkidle0' });
  const opened = await page.$$eval('button', (buttons) => {
    const button = buttons.find((el) => (el.textContent || '').trim() === 'Proposer une ressource');
    if (!button) return false;
    button.click();
    return true;
  });
  if (!opened) failures.push('formulaire : bouton Proposer une ressource introuvable');
  await page.waitForSelector('input[placeholder="Titre de la ressource"]', { timeout: 15000 });
  const typeOpened = await page.$$eval('button', (buttons) => {
    const button = buttons.find((b) => (b.textContent || '').trim() === 'Article');
    if (button) button.click();
    return Boolean(button);
  });
  check(typeOpened, 'formulaire : sélecteur de type introuvable');
  await page.waitForSelector('[role="option"]', { timeout: 5000 }).catch(() => {});
  const formOptions = await page.$$eval('[role="option"]', (options) => options.map((option) => (option.textContent || '').trim()));
  check(formOptions.includes('Outil IA'), `formulaire : option Outil IA absente (${formOptions.join(', ')})`);
  await page.$$eval('[role="option"]', (options) => {
    const option = options.find((item) => (item.textContent || '').trim() === 'Article');
    if (option) option.click();
  });
  await page.type('input[placeholder="Titre de la ressource"]', 'Ressource de test');
  await page.type('input[placeholder="Auteur ou organisation"]', 'Test');
  await page.type('textarea[placeholder="Description de la ressource"]', 'Une description suffisamment longue pour la validation.');
  await page.type('input[placeholder="https://exemple.fr"]', 'pas-une-url');
  await page.$$eval('button', (buttons) => {
    const button = buttons.find((el) => (el.textContent || '').trim() === "Préparer l'e-mail");
    if (button) button.click();
  });
  await new Promise((r) => setTimeout(r, 250));
  const validation = await page.$$eval('p', (els) => els.map((el) => el.textContent || '').join(' '));
  check(validation.includes('URL valide'), 'formulaire : validation URL absente');
  check(pageErrors.length === 0, `formulaire : erreurs JS ${pageErrors.join(' | ').slice(0, 200)}`);

  // Onglet Écosystème : applications de l'auteur, liens externes et état « en construction ».
  await page.goto(`${BASE}/ressources`, { waitUntil: 'networkidle0' });
  const switched = await page.$$eval('button', (buttons) => {
    const button = buttons.find((el) => (el.textContent || '').trim().startsWith('Écosystème'));
    if (!button) return false;
    button.click();
    return true;
  });
  if (!switched) failures.push('écosystème : onglet introuvable');
  await page.waitForFunction(() => new URL(location.href).searchParams.get('tab') === 'ecosysteme', { timeout: 5000 }).catch(() => {});
  const apps = await page.$$eval('main a[href^="https://hylst.fr/"]', (links) => links.map((a) => ({
    href: a.getAttribute('href') || '',
    target: a.getAttribute('target') || '',
    text: (a.textContent || '').trim(),
  })));
  check(apps.length >= 11, `écosystème : ${apps.length} applications`);
  check(apps.some((a) => a.href === 'https://hylst.fr/boussole-ia/'), 'écosystème : Boussole IA absente');
  check(apps.every((a) => a.target === '_blank'), 'écosystème : lien sans target=_blank');
  const construction = await page.$$eval('main', (mains) => mains.map((el) => el.textContent || '').join(' '));
  check(construction.includes('Explorons la Data Science') && construction.includes('En construction'), 'écosystème : état de construction absent');
  check(pageErrors.length === 0, `écosystème : erreurs JS ${pageErrors.join(' | ').slice(0, 200)}`);

  // Catalogue d'outils : compteur, filtres combinables, recherche sans accent, état dans l'URL.
  await page.goto(`${BASE}/ressources?tab=outils`, { waitUntil: 'networkidle0' });
  const toolCards = () => page.evaluate(() =>
    [...document.querySelectorAll('main a')]
      .filter((a) => /^(Visiter|Utiliser l'outil)/.test((a.textContent || '').trim())).length
  );
  const toolTabLabel = () => page.evaluate(() =>
    ([...document.querySelectorAll('button')].find((b) => (b.textContent || '').trim().startsWith('Outils IA')) || {}).textContent || ''
  );
  const searchField = 'input[placeholder="Rechercher des ressources..."]';
  const totalTools = await toolCards();
  check(totalTools === 85, `outils : ${totalTools} fiches au lieu de 85`);
  check((await toolTabLabel()).includes('(85)'), `outils : compteur « ${(await toolTabLabel()).trim()} »`);
  check(await page.$('button[aria-label="Sujet"]') === null, 'outils : filtre Sujet affiché alors qu\'il ne s\'applique pas');
  const externalNames = await page.$$eval('main a[target="_blank"]', (links) =>
    links.map((a) => (a.textContent || '').replace(/\s+/g, ' ').trim()).filter((name) => name.startsWith('Visiter '))
  );
  check(
    externalNames.length === 76 && externalNames.every((name) => /^Visiter .+ \(nouvel onglet\)$/.test(name)),
    `outils : nom accessible des liens externes « ${externalNames[0] || ''} »`
  );
  const optionsBefore = await page.$$eval('main select', (selects) => selects[0]?.options.length || 0);
  const [categorySelect, pricingSelect] = await page.$$('main select');
  await categorySelect.select('Vidéo');
  await page.waitForFunction(() => new URL(location.href).searchParams.get('cat') === 'Vidéo', { timeout: 5000 }).catch(() => {});
  const videoCount = await toolCards();
  check(videoCount === 7, `outils : filtre Vidéo -> ${videoCount} fiches`);
  check((await toolTabLabel()).includes('(7)'), `outils : compteur après filtre « ${(await toolTabLabel()).trim()} »`);
  check(new URL(page.url()).searchParams.get('cat') === 'Vidéo', 'outils : catégorie absente de l\'URL');
  const optionsAfter = await page.$$eval('main select', (selects) => selects[0]?.options.length || 0);
  check(optionsAfter === optionsBefore, `outils : ${optionsAfter} catégories proposées après filtrage au lieu de ${optionsBefore}`);
  await pricingSelect.select('Freemium');
  await page.waitForFunction(() => new URL(location.href).searchParams.get('tarif') === 'Freemium', { timeout: 5000 }).catch(() => {});
  check(await toolCards() === 5, 'outils : catégorie et tarif ne se combinent pas');
  await page.reload({ waitUntil: 'networkidle0' });
  const restored = await page.$$eval('main select', (selects) => selects.map((s) => s.value));
  check(restored[0] === 'Vidéo' && restored[1] === 'Freemium', `outils : filtres non restaurés (${restored.join(' / ')})`);
  // Une recherche qui ne correspond à rien ne doit ni vider les options ni perdre le filtre en cours.
  await page.type(searchField, 'midjourney');
  await new Promise((r) => setTimeout(r, 300));
  check(await toolCards() === 0, 'outils : une recherche sans résultat devrait afficher 0 fiche');
  const during = await page.$$eval('main select', (selects) => selects.map((s) => ({ value: s.value, options: s.options.length })));
  check(during[0].options === optionsBefore, `outils : ${during[0].options} catégories proposées pendant la recherche au lieu de ${optionsBefore}`);
  check(during[0].value === 'Vidéo' && during[1].value === 'Freemium', `outils : filtres perdus pendant la recherche (${during.map((s) => s.value).join(' / ')})`);
  await page.click(searchField);
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  await new Promise((r) => setTimeout(r, 300));
  const resetButton = await page.$$eval('button', (buttons) => {
    const button = buttons.find((b) => (b.textContent || '').trim() === 'Réinitialiser');
    if (button) button.click();
    return Boolean(button);
  });
  check(resetButton, 'outils : bouton Réinitialiser introuvable');
  await new Promise((r) => setTimeout(r, 300));
  check(await toolCards() === 85, 'outils : Réinitialiser ne rétablit pas la liste complète');
  check(new URL(page.url()).searchParams.has('cat') === false, 'outils : catégorie encore dans l\'URL après réinitialisation');
  await page.click(searchField);
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  await page.type(searchField, 'ethique');
  await new Promise((r) => setTimeout(r, 300));
  check(await toolCards() === 1, `outils : « ethique » sans accent -> ${await toolCards()} fiche(s)`);
  const auditeurText = await page.evaluate(() => document.body.innerText);
  check(auditeurText.includes('Outil du site · sans compte'), 'outils : badge « Outil du site » absent');

  // Faits vérifiés : langue, compte et API.
  await page.goto(`${BASE}/ressources?tab=outils`, { waitUntil: 'networkidle0' });
  await page.type(searchField, 'chatgpt');
  await new Promise((r) => setTimeout(r, 300));
  const chatgptText = await page.evaluate(() => document.body.innerText);
  check(chatgptText.includes('Français disponible · Compte requis · API'), 'outils : faits de ChatGPT absents');
  await page.goto(`${BASE}/ressources?tab=outils`, { waitUntil: 'networkidle0' });
  await page.type(searchField, 'calculateur');
  await new Promise((r) => setTimeout(r, 300));
  const internalText = await page.evaluate(() => document.body.innerText);
  check(internalText.includes("Interface en français · Sans compte · Pas d'API publique"), "outils : faits de l'outil interne absents");

  // Traçabilité du tarif : date distincte de celle du lien et page tarifaire officielle.
  await page.goto(`${BASE}/ressources?tab=outils&cat=Design`, { waitUntil: 'networkidle0' });
  const designText = await page.evaluate(() => document.body.innerText);
  check(designText.includes('Tarif vérifié le 28/10/2026'), 'outils : date de vérification du tarif absente');
  const pricingLinks = await page.$$eval('main a[href*="canva.com"]', (links) =>
    links.map((a) => ({ href: a.getAttribute('href'), text: (a.textContent || '').replace(/\s+/g, ' ').trim() }))
  );
  check(
    pricingLinks.some((link) => link.href === 'https://www.canva.com/fr_fr/tarification/' && link.text === 'Voir les tarifs de Canva AI (nouvel onglet)'),
    `outils : lien tarifaire absent (${JSON.stringify(pricingLinks)})`
  );

  // Lien permanent d'une fiche : ancre, mise en évidence et bouton de copie.
  await page.goto(`${BASE}/ressources?tab=outils&outil=ollama`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 500));
  const focused = await page.evaluate(() => {
    const element = document.getElementById('outil-ollama');
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    return { ring: element.className.includes('ring-2'), top: rect.top, bottom: rect.bottom, height: window.innerHeight };
  });
  check(focused !== null, 'outils : ancre #outil-ollama absente');
  check(Boolean(focused?.ring), 'outils : fiche ciblée non mise en évidence');
  check(Boolean(focused) && focused.top < focused.height && focused.bottom > 0, `outils : fiche ciblée hors écran (${focused?.top}/${focused?.height})`);
  const toolCopyButton = await page.$$eval('button', (buttons) =>
    buttons.some((button) => (button.textContent || '').includes('Copier le lien de la fiche Ollama'))
  );
  check(toolCopyButton, 'outils : bouton de copie du lien absent');
  const copied = await page.evaluate(() => {
    const button = [...document.querySelectorAll('button')].find((item) => (item.textContent || '').includes('Copier le lien de la fiche Ollama'));
    if (!button) return false;
    button.click();
    return true;
  });
  await new Promise((r) => setTimeout(r, 700));
  const toastText = await page.$$eval('[data-sonner-toast]', (toasts) => toasts.map((toast) => toast.textContent || '').join(' '));
  check(copied && toastText.includes('Lien de la fiche copié'), `outils : copie du lien (${toastText})`);

  // Exercice et solution repliable.
  await page.goto(`${BASE}/cours/algorithmes-ia-generative#trilemme`, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => [...document.querySelectorAll('summary')].some((el) => (el.textContent || '').includes('Exercice')), { timeout: 15000 });
  const exercise = await page.$$eval('summary', (els) => {
    const el = els.find((x) => (x.textContent || '').includes('Exercice'));
    if (!el) return false;
    el.click();
    return true;
  });
  if (!exercise) failures.push('exercice : résumé introuvable');
  await new Promise((r) => setTimeout(r, 100));
  const solution = await page.$$eval('summary', (els) => els.some((el) => (el.textContent || '').includes('Voir la solution')));
  check(solution, 'exercice : bouton de solution absent');

  // JSON-LD et bouton de copie.
  const hasJsonLd = await page.$('#cours-jsonld');
  check(Boolean(hasJsonLd), 'JSON-LD absent sur JEV');
  const copyButton = await page.$$eval('button', (els) => els.some((el) => (el.textContent || '').includes('Copier le lien')));
  check(copyButton, 'bouton de copie absent');

  // Quiz classique.
  await page.goto(`${BASE}/cours/ia-ethique`, { waitUntil: 'networkidle0' });
  const radio = await page.$('[role="radio"]');
  check(Boolean(radio), 'quiz classique : aucune option radio');
  if (radio) {
    await radio.click();
    const buttons = await page.$$('button');
    for (const button of buttons) {
      const text = await button.evaluate((el) => el.textContent || '');
      if (text.includes('Vérifier')) {
        await button.click();
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 150));
    const explanation = await page.$$eval('h4', (els) => els.map((el) => el.textContent).join(' '));
    check(explanation.includes('Explication'), 'quiz classique : explication absente');
  }
} catch (error) {
  failures.push(`exception : ${error instanceof Error ? error.message : String(error)}`);
} finally {
  await browser.close();
  server.kill();
}

if (failures.length) {
  for (const failure of failures) console.error('KO', failure);
  process.exit(1);
}
console.log('UI : recherche, filtre, laboratoires, JSON-LD et quiz vérifiés.');
