// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Rappel du relevé mensuel des tarifs (`npm run check:pricing`, réseau requis).
// Lit PRICING_CHECKED_ON et les pricingUrl de src/components/cost-calculator/aiProvidersData.ts, puis :
//   - signale un relevé de plus de 35 jours (code de sortie 1) ;
//   - interroge chaque page officielle des tarifs et signale celles qui ne répondent plus (404, 410, hôte injoignable).
// Il ne lit PAS les prix : la relecture se fait à la main, page par page (procédure dans SUIVI_CONTENU.md,
// section « Relevé mensuel des tarifs »). Aucune dépendance.
import fs from 'node:fs';

const MAX_AGE_DAYS = 35;
const source = fs.readFileSync(new URL('../src/components/cost-calculator/aiProvidersData.ts', import.meta.url), 'utf8');

const checkedOn = source.match(/export const PRICING_CHECKED_ON = '(\d{4}-\d{2}-\d{2})'/)?.[1];
if (!checkedOn) {
  console.error('PRICING_CHECKED_ON introuvable dans aiProvidersData.ts');
  process.exit(1);
}
// Propriétés d'un fournisseur : 4 espaces d'indentation (celles des modèles en ont 8).
const providers = [...source.matchAll(/^ {4}name: '([^']+)',\r?$[\s\S]*?^ {4}pricingUrl: '([^']+)',/gm)].map((m) => ({ name: m[1], url: m[2] }));

const ageDays = Math.floor((Date.now() - Date.parse(`${checkedOn}T00:00:00Z`)) / 86_400_000);
let failed = false;
console.log(`Dernier contrôle complet des tarifs : ${checkedOn} (il y a ${ageDays} jour(s)).`);
if (ageDays > MAX_AGE_DAYS) {
  console.log(`  À refaire : plus de ${MAX_AGE_DAYS} jours.`);
  failed = true;
}

console.log(`\n${providers.length} page(s) officielle(s) de tarifs :`);
for (const { name, url } of providers) {
  let verdict;
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
      headers: { 'user-agent': 'Mozilla/5.0 (verification des liens d Explorons l IA)', accept: 'text/html,*/*' },
    });
    if (response.status === 404 || response.status === 410) {
      verdict = `MORTE (${response.status})`;
      failed = true;
    } else if (response.ok) {
      const moved = new URL(response.url).host !== new URL(url).host ? ` ; redirigée vers ${response.url}` : '';
      verdict = `répond ${response.status}${moved}`;
    } else {
      verdict = `incertaine (${response.status}, souvent une protection anti-robot : ouvrir dans un navigateur)`;
    }
  } catch (error) {
    verdict = `injoignable (${error.cause?.code ?? error.name})`;
    failed = true;
  }
  console.log(`  ${name.padEnd(18)} ${verdict}\n    ${url}`);
}

console.log('\nRappel : relire chaque page, corriger aiProvidersData.ts, puis changer PRICING_CHECKED_ON.');
process.exit(failed ? 1 : 0);
