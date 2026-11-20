# Structure du dépôt

Dernière mise à jour : 26/10/2026.

Ce document décrit l'organisation technique d'Explorons l'IA. Pour les commandes, les règles éditoriales et le déploiement, voir `README.md`.

## Vue d'ensemble

Explorons l'IA est une application **React 18 + TypeScript + Vite 8** entièrement statique. Le build produit une page HTML par route, sans serveur applicatif, sans base de données et sans appel réseau à l'exécution. Le site est servi sur `https://ia.hylst.fr/explorons_l_ia/` depuis le 20/11/2026.

- Source : `<racine du projet>`.
- Build : `dist/`, non versionné.
- Déploiement : dépôt de builds `Hylst/hylst.ia`, dossier `explorons_l_ia/` (le hub `hylst.fr/explorons_l_ia/` redirige en 301 depuis le 20/11/2026).
- Point d'entrée : `src/main.tsx`, monté par `src/App.tsx`.
- Production actuelle sur ia : entrée `index-f2PuJE-X.js`, CSS `index-CAPaubBX.css`, 67 URL au sitemap, 479 fichiers, source `38a316b`. Historique des builds jusqu'au 14/11/2026 : 71 pages HTML, entrée `index-Bf50djqm.js`, CSS `index-CcCZrjNq.css`, 479 fichiers vérifiés (`verify:prod` 479/479 le 14/11/2026). `CKdmXnuk`, `BUkCTNp7`, `DuqG4b_A`, `BdgIgA7Y`, `CZ3AMObL`, `BVL5KpEX`, `2DDSKOs9`, `DWHD0VaT`, `CJgmncwL`, `CcGsYR4Z`, `BOE6JFOt`, `BgKc8PL6`, `erCpVNC-` et `To9pBCuS` écartés ; commits Docker `a8b35c53` (lot 11), `529eccfa` (lot 12), `39dc466c` (lot 14), `e077e136` (relevé tarifaire), `4cc42f20` (lot 15), `57f8c2ac` (lot 16), `DuqG4b_A` (lot 16b), `BUkCTNp7` (lot 17) puis `ea6d9719` (lot 18) et `21cc08473` (journaux douze mois, adresse ik.me), `explorons_l_ia/` + `accessibilite/`. `CKdmXnuk` publié le 07/11/2026 : glossaire à 123 termes, liens écosystème Hylst sur l'accueil, le menu et le pied de page. `BE9AAaQh` (lot 13) n'a pas été publié et reste remplacé par `2DDSKOs9`.

## Arborescence utile

```text
.
├── src/
│   ├── App.tsx                 routes et chargement paresseux des pages
│   ├── main.tsx                point d'entrée React
│   ├── config/
│   │   ├── site.ts             constante SITE_BASE, identité, contact, dates
│   │   ├── tools.ts            noms et routes des neuf outils
│   │   └── navigation.ts       menus desktop et mobile
│   ├── data/
│   │   ├── seoData.ts          métadonnées de chaque route
│   │   └── ...                 données de pages
│   ├── pages/
│   │   ├── cours/              20 pages de cours classiques
│   │   ├── Ressources.tsx      page à onglets
│   │   └── ...                 pages de contenu, outils et pages légales
│   ├── components/
│   │   ├── courses/            gabarits et composants de cours
│   │   ├── resources/          cartes, onglets, applications de l'auteur
│   │   ├── cost-calculator/    données et calculs des coûts
│   │   ├── dataTools/          outils de données
│   │   ├── ml/                 simulateur d'entraînement
│   │   ├── workflow/           éditeur et analyse de workflow
│   │   ├── glossary/           glossaire et infobulles
│   │   └── ui/                 primitives shadcn/ui
│   ├── content/
│   │   └── cours-approfondis/  20 JSON, types, schéma et registre
│   ├── lib/
│   │   ├── data/               couche de données et sauvegarde JSON
│   │   ├── dataTools/          calculs, CSV, worker
│   │   ├── paths.ts            asset() pour les fichiers publics
│   │   └── random.ts           générateur à graine
│   └── hooks/                  hooks partagés
├── scripts/                    build, contrôles et tests
├── public/                     images, couvertures, favicon, partage
├── docs/
│   └── cours-approfondis/      correspondance des sources et couvertures
├── dist/                       build généré, non versionné
├── features.md                 inventaire fonctionnel
└── README.md                   commandes, principes, déploiement
```

## Routage et rendu statique

1. `src/App.tsx` déclare les routes et charge les pages avec `React.lazy`.
2. `src/data/seoData.ts` fournit le titre, la description et les métadonnées de chaque route.
3. `useDocumentMeta()` applique ces métadonnées lors de la navigation.
4. `scripts/static-routes.ts` lit les routes de `App.tsx` et de `src/content/cours-approfondis/registry.ts`, vérifie leur présence dans `seoData.ts`, puis écrit `dist/<route>/index.html` avec les balises propres à la page, `404.html` et `sitemap.xml`.
5. Le routeur utilise `BrowserRouter` et le `basename` fourni par `SITE_BASE`; les liens internes passent par `Link` ou `navigate`, jamais par un `href` absolu codé en dur.
6. Le Nginx de production fait `try_files $uri $uri.html $uri/index.html`, sans repli SPA. D'où une page HTML par route.

Le build échoue si une route n'a pas d'entrée SEO, si une URL interne sort du sous-chemin ou si `dist/` contient une chaîne interdite. Voir `scripts/static-routes.ts`, `scripts/verify-dist.mjs` et le bloc Nginx dans `README.md`.

## Cours

### Cours classiques

- 20 pages dans `src/pages/cours/`.
- Chaque page contient son contenu, ses composants, ses sources et son quiz.
- Les 20 pages classiques utilisent `CourseGuideLayout` ; les étiquettes et le public de l’ancien `CourseHeader` sont rendus dans la fiche d’information.
- Les cartes et couvertures sont référencées dans `src/components/resources/data/coursesData.ts`, avec les images dans `public/pics/cours-classiques/`.

### Cours approfondis

- 20 fichiers JSON dans `src/content/cours-approfondis/`, un par cours.
- `types.ts` définit le format, `schema.ts` le valide de façon stricte, `registry.ts` fournit les routes, le SEO, le sitemap et la liste de `/ressources`.
- 146 modules au total : 52 pour les 7 cours historiques, 94 pour les 13 cours ajoutés en octobre 2026.
- Chaque module contient un corps Markdown, des points clés, un quiz, un glossaire et un schéma SVG. Les champs optionnels sont l'analogie, l'exemple, le code, les exercices et les sources locales.
- Les textes Markdown passent par `DeepMarkdown`, avec GFM et KaTeX. Les montants en dollars sont écrits `\$` dans le JSON.
- Les couvertures sont dans `public/pics/cours/`.
- La correspondance avec les 20 articles HTML de référence est documentée dans `docs/cours-approfondis/sources-html.md`.
- Les 20 cours ont **146 exercices**, un par module. Les 13 cours ajoutés en octobre 2026 ont eu une relecture de style le 25/10/2026 (`checkedOn` mis à jour).
- Les **146 modules** portent des sources locales, soit **341 liens** ; chaque cours garde aussi sa liste de sources en fin de page.
- Les schémas sont des SVG écrits dans les JSON, sans ressource externe. Les 146 schémas ont été audités pour leur structure, leur contraste, leur géométrie et leur rendu visuel ; aucun problème résiduel sur `BD1gFBUl`.

## Ressources et applications

- `/ressources` utilise `src/pages/Ressources.tsx`, `UnifiedResourcesTabsSection.tsx` et `ResourcesHeader.tsx`.
- Onglets : `toutes`, `cours`, `publications`, `outils`, `videos`, `ecosysteme`, `agir`.
- Les données sont séparées dans `src/components/resources/data/` : cours, outils, livres, articles, vidéos, publications, sites et applications de l'auteur.
- Les **11 applications Hylst** sont dans `authorAppsData.ts` et affichées par `AuthorAppCard.tsx`.
- La recherche et les filtres s'appliquent aussi aux applications.
- `LINKS_CHECKED_ON` dans `src/config/site.ts` alimente la date « Liens vérifiés le ».
- `scripts/check-links.mjs` contrôle les liens externes, y compris les applications de l'auteur sur `hylst.fr`.

## Outils et données locales

- Les neuf outils sont déclarés dans `src/config/tools.ts`.
- Le calculateur de coûts et le comparateur s'appuient sur `src/components/cost-calculator/aiProvidersData.ts` et `costMath.ts`. Les prix sont saisis et datés à la main.
- Les outils de données sont dans `src/lib/dataTools/`; la lecture CSV et le profilage passent par un module Web Worker (`dataWorker.ts`, `workerClient.ts`) avec repli sur le thread principal.
- Le simulateur d'entraînement est dans `src/components/ml/simulator/miniNetwork.ts`.
- Les workflows utilisent `src/components/workflow/analysis.ts`, sans appel de modèle.
- Les données persistantes passent par `src/lib/data/`. Les composants ne lisent ni n'écrivent directement dans `localStorage`; ils utilisent `dataSource`, les collections typées et `backup.ts`.
- Les clés de stockage autorisées sont centralisées dans `LOCAL_STORAGE_KEYS` de `src/pages/GestionDonneesRGPD.tsx` et documentées dans les pages légales.

## SEO, accessibilité et sécurité

- Métadonnées par route, canonical, Open Graph, JSON-LD et sitemap générés au build.
- Image de partage : `public/pics/explorons_l_ia.jpg`, référence `DEFAULT_OG_IMAGE` dans `src/config/site.ts`.
- Accessibilité : cibles tactiles, focus visible, contrastes, `prefers-reduced-motion`, alternatives aux tableaux et aux graphiques.
- Les tests `smoke` et `clicks` vérifient aussi axe-core et les débordements horizontaux.
- Aucune ressource distante chargée à l'exécution.
- `vite.config.ts` utilise le préfixe `EXPLORER_PUBLIC_` pour éviter qu'un `.env` local soit intégré au JS public.
- Le build vérifie l'absence de secrets, de variables d'environnement, de « supabase » et de tirets cadratins.

## Tests et contrôles

| Commande | Rôle |
| --- | --- |
| `npm run test:unit` | calculs, schémas, cours, ressources, applications, coûts |
| `npm run typecheck` | TypeScript de l'application et des scripts |
| `npm run lint` | ESLint |
| `npm run build` | build statique puis `verify-dist` |
| `npm run serve:dist` | serveur local proche du Nginx de production |
| `npm run test:smoke` | toutes les pages du sitemap, desktop et mobile |
| `THEME=dark npm run test:smoke` | thème sombre |
| `npm run test:clicks` | clics, erreurs, valeurs affichées, axe-core |
| `npm run test:ui` | recherche, filtres, laboratoires, JSON-LD, exercices, quiz, écosystème |
| `npm run check:links` | liens externes, applications Hylst incluses |
| `npm run verify:prod` | comparaison SHA-256 avec la production |

Dernier build publié : 71 pages, `verify-dist` 331 fichiers, smoke clair et sombre 134 chargements / 0 constat chacun, clics 134 passages / 1 888 clics / 0 constat, `verify:prod` 479/479.

## Documentation

- `README.md` : principes, commandes, déploiement, Nginx, sécurité.
- `features.md` : inventaire fonctionnel et limites connues.
- `docs/cours-approfondis/sources-html.md` : correspondance entre les cours et les 20 articles HTML.

## Déploiement

1. `npm run build` puis `npm run serve:dist`.
2. Figer le snapshot : `npm run snapshot -- <dossier> --commit <sha>` copie `dist/` et écrit `SNAPSHOT-MANIFEST.json`. L'arbre SHA-256 est le SHA-256 des lignes `<chemin>|<sha256 du fichier>
`, chemins triés octet par octet en UTF-8 ; `SNAPSHOT-MANIFEST.json` est exclu. Annoncer l'entrée avant toute copie.
3. Laisser l'écrivain désigné (agent de plateforme, ou Claude quand la plateforme le demande) copier ce snapshot exact dans `explorons_l_ia/` du dépôt de builds `Hylst/hylst.ia` (`https://ia.hylst.fr/explorons_l_ia/`), manifeste exclu. Un seul écrivain à la fois ; ne lancer aucun rebuild pendant la recette.
4. Après mise en ligne, lancer `npm run verify:prod` sur le snapshot exact publié (l'adresse par défaut est celle d'ia depuis le 20/11/2026). Production du 20/11/2026 : entrée `index-f2PuJE-X.js`, `verify:prod` 477/479 au controle brut, les deux ecarts etant des fins de ligne CRLF du deploiement (contenu identique apres normalisation), sitemap 67 URL. Historique du 14/11/2026 : `Bf50djqm`, `CKdmXnuk` en 404, manifeste en 404. Préparer chaque lot sur une branche et annoncer l'entrée avant tout push sur la branche publiée ; ne pas reconstruire un snapshot déjà annoncé.

Le bloc Nginx, les en-têtes et la procédure complète restent dans `README.md`.
