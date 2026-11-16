// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Plugin Vite (build uniquement) pour un hébergement 100 % statique sous sous-chemin.
//
// Pourquoi : le Nginx de hylst.fr sert `try_files $uri $uri.html $uri/index.html`,
// sans repli vers index.html. Une SPA ne répondrait donc qu'à sa racine.
// Ce plugin :
//   1. vérifie que chaque route de src/App.tsx a son entrée dans src/data/seoData.ts
//      (et inversement), sinon le build échoue ;
//   2. écrit dist/<route>/index.html pour chaque route, avec title, description,
//      canonical, Open Graph et robots propres à la page (lisibles sans JavaScript) ;
//   3. écrit dist/404.html (noindex) et dist/sitemap.xml (routes indexables) ;
//   4. publie le fichier LICENSE du dépôt sous dist/LICENSE.txt (lien du pied de page).

import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { pageSEO, getSEOData, normalizePath } from '../src/data/seoData.ts';
import { SITE_NAME, SITE_URL, AUTHOR_NAME } from '../src/config/site.ts';
import { DEEP_COURSES, deepCoursePath } from '../src/content/cours-approfondis/registry.ts';

const SEO_MARKER = '<!--seo-->';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const escapeXml = escapeHtml;

/** JSON-LD sans risque de fermer la balise <script>. */
const jsonLd = (data: object) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

/** Routes déclarées dans src/App.tsx (attributs path="..." et route index), plus les cours approfondis du registre. */
export const readAppRoutes = (appFile: string): string[] => {
  const source = fs.readFileSync(appFile, 'utf8');
  const routes = new Set<string>(['/']);
  for (const match of source.matchAll(/<Route\s+path="([^"]+)"/g)) {
    const p = match[1];
    if (p === '/' || p === '*') continue;
    routes.add(normalizePath(`/${p}`));
  }
  // App.tsx crée ces routes par une boucle sur le même registre : elles n'ont pas d'attribut path littéral.
  for (const course of DEEP_COURSES) routes.add(normalizePath(deepCoursePath(course.slug)));
  return [...routes].sort();
};

const structuredData = (route: string, title: string, description: string, canonical: string) => {
  if (route === '/') {
    return jsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'fr-FR',
      description,
      author: { '@type': 'Person', name: AUTHOR_NAME },
    });
  }
  if (route.startsWith('/cours/')) {
    return jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: title,
      description,
      url: canonical,
      inLanguage: 'fr-FR',
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    });
  }
  return '';
};

const seoHead = (route: string) => {
  const seo = getSEOData(route);
  const pageTitle = pageSEO[normalizePath(route)]?.title ?? seo.title;
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow'}" />`,
    seo.canonical ? `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />` : '',
    `<meta property="og:type" content="${route === '/' ? 'website' : 'article'}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    seo.canonical ? `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />` : '',
    `<meta property="og:image" content="${escapeHtml(seo.image)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`,
    structuredData(route, pageTitle, seo.description, seo.canonical),
  ]
    .filter(Boolean)
    .join('\n    ');
};

const sitemapXml = (routes: string[], lastmod: string) => {
  const urls = routes
    .filter((route) => !pageSEO[route]?.noindex)
    .map((route) => {
      const seo = getSEOData(route);
      const priority = (pageSEO[route]?.priority ?? 0.5).toFixed(1);
      return `  <url><loc>${escapeXml(seo.canonical)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
};

export const staticRoutesPlugin = (options: { appFile: string }): Plugin => {
  let rootDir = process.cwd();
  let outDir = 'dist';
  let routes: string[] = [];

  return {
    name: 'static-routes',
    apply: 'build',

    configResolved(config) {
      rootDir = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },

    buildStart() {
      routes = readAppRoutes(options.appFile);
      const seoRoutes = Object.keys(pageSEO);
      const missingSeo = routes.filter((r) => !seoRoutes.includes(r));
      const orphanSeo = seoRoutes.filter((r) => !routes.includes(r));
      if (missingSeo.length || orphanSeo.length) {
        this.error(
          [
            'Routes et SEO désynchronisés :',
            missingSeo.length ? `  routes sans entrée dans src/data/seoData.ts : ${missingSeo.join(', ')}` : '',
            orphanSeo.length ? `  entrées SEO sans route dans src/App.tsx : ${orphanSeo.join(', ')}` : '',
          ]
            .filter(Boolean)
            .join('\n')
        );
      }
    },

    // index.html (route "/") reçoit les balises de l'accueil.
    transformIndexHtml(html) {
      if (!html.includes(SEO_MARKER)) {
        throw new Error(`index.html doit contenir le repère ${SEO_MARKER}`);
      }
      return html;
    },

    closeBundle() {
      const templatePath = path.join(outDir, 'index.html');
      if (!fs.existsSync(templatePath)) return;
      const template = fs.readFileSync(templatePath, 'utf8');
      const render = (route: string) => template.replace(SEO_MARKER, seoHead(route));

      for (const route of routes) {
        const file = route === '/' ? templatePath : path.join(outDir, route.slice(1), 'index.html');
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, render(route));
      }

      // Toute URL inconnue : la SPA affiche sa page 404 (Nginx : error_page 404 /explorons_l_ia/404.html).
      fs.writeFileSync(path.join(outDir, '404.html'), render('/__introuvable__'));

      const lastmod = new Date().toISOString().slice(0, 10);
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml(routes, lastmod));

      const licenseFile = path.join(rootDir, 'LICENSE');
      if (!fs.existsSync(licenseFile)) {
        this.error('Fichier LICENSE introuvable à la racine du dépôt (publié sous dist/LICENSE.txt).');
      }
      fs.copyFileSync(licenseFile, path.join(outDir, 'LICENSE.txt'));

      this.info?.(`static-routes : ${routes.length} pages, 404.html, sitemap.xml et LICENSE.txt générés`);
    },
  };
};
