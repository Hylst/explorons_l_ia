# Explorons l'IA

Site pédagogique francophone pour comprendre l'intelligence artificielle : bases, types d'IA, machine learning, cours interactifs, outils de démonstration et éthique.

- En ligne : https://hylst.fr/explorons_l_ia/ (plateforme [hylst.fr](https://hylst.fr/))
- Auteur : Geoffroy Streit, réalisé par Geoffroy avec assistance IA

## Principes

- **100 % statique et 100 % front** : aucun serveur, aucune base de données, aucun appel réseau à l'exécution. Polices, images et scripts sont servis depuis le site.
- **Aucune collecte dans le navigateur** : pas de compte, pas de cookie, pas de traceur. Seules quelques préférences et les données des outils restent dans le `localStorage` du navigateur (liste dans `src/pages/GestionDonneesRGPD.tsx`). Le serveur conserve six mois des journaux techniques (voir la page Confidentialité).
- **Contenu sobre et vérifiable** : pas de statistique inventée, pas de résultat attribué à une entreprise sans source et sans date, pas de promesse de gains. Les scénarios fictifs sont annoncés comme tels.
- **Outils pédagogiques** : tout se calcule dans le navigateur, et chaque outil dit ce qu'il fait réellement.
  - Le simulateur d'entraînement entraîne un vrai petit réseau de neurones (`src/components/ml/simulator/miniNetwork.ts`) sur des données synthétiques.
  - La démonstration de forêt aléatoire et le classifieur linéaire du cours sur l'apprentissage supervisé entraînent eux aussi de vrais modèles.
  - L'optimiseur de workflow analyse la structure du graphe et simule l'exécution : aucun modèle d'IA n'est appelé.
  - Le calculateur et le comparateur s'appuient sur des tarifs saisis à la main et datés, à vérifier chez les fournisseurs. Le calculateur (`cost-calculator/costMath.ts`) détaille son calcul et garde son réglage dans l'URL ; le comparateur propose une grille de notation personnelle, sans score inventé.
  - L'analyseur de jeu de données, le générateur de données synthétiques et l'auditeur de biais (`src/lib/dataTools/`) lisent ou produisent des CSV dans le navigateur ; leurs jeux d'exemple sont fictifs et générés avec une graine.
  - Le détecteur de contenu applique des heuristiques : ses scores sont des indices, sans valeur de preuve.
  - Toute illustration dont les valeurs ne sont pas calculées (animations, courbes schématiques, niveaux qualitatifs) porte le bandeau `SimulationNotice`.

## Stack

React 18, TypeScript, Vite 8 (Rolldown), Tailwind CSS 4, shadcn/ui (Radix), React Router, Framer Motion, Recharts, React Flow. Police Inter auto-hébergée (`@fontsource-variable/inter`).

## Documentation et état

- [`structure.md`](structure.md) : organisation du code, des contenus, du build et des tests.
- [`features.md`](features.md) : inventaire fonctionnel, chiffres clés et limites connues.
- [`docs/cours-approfondis/sources-html.md`](docs/cours-approfondis/sources-html.md) : correspondance avec les 20 articles HTML de référence.

État actuel : **40 cours** (20 classiques, 20 approfondis), **146 modules**, **146 exercices**, **11 applications Hylst** dont une en construction, **71 pages HTML**. Les écarts restants sont suivis dans les tickets (issues) du dépôt.

## Développement

```bash
npm install
npm run dev          # http://localhost:8080/explorons_l_ia/
npm run typecheck    # TypeScript (app + config de build)
npm run lint         # ESLint : 0 erreur (quelques avertissements react-hooks et fast-refresh)
npm run build        # sortie dans dist/, contrôlée par scripts/verify-dist.mjs
npm run serve:dist   # sert dist/ comme le Nginx de prod : http://localhost:4173/explorons_l_ia/
npm run check:links  # contrôle réel des liens externes (réseau requis), à lancer avant chaque dépôt
npm run verify:prod  # compare dist/ à ce que sert hylst.fr (SHA-256, réseau requis), à lancer après le déploiement
npm run test:smoke   # après le build : chaque page du sitemap en bureau et en mobile dans Chrome (erreurs, débordement, h1, axe-core après défilement) ; THEME=dark pour le thème sombre
npm run test:unit    # cours, ressources, applications et calculs des outils, sans navigateur
npm run test:clicks  # après le build : clique les contrôles de chaque page, puis erreurs, NaN affichés et axe-core sur les états ouverts
npm run test:ui      # recherche, filtres, laboratoires, JSON-LD, exercices, quiz et onglet Écosystème
npm run check:pricing # âge du dernier relevé des tarifs et pages officielles qui ne répondent plus (réseau requis)
```

`npm run test:unit` (Node 22.18 ou plus récent, sans build) vérifie les calculs des outils, les schémas et registres de cours, les fiches de ressources et les applications, notamment la lecture CSV, les statistiques, le profil d'un jeu de données, les taux d'équité, le générateur à graine et les coûts. `npm run test:smoke` (Chrome requis, `CHROME_PATH` si besoin) ouvre chaque page du build en bureau et en mobile et signale les erreurs JavaScript ou de console, les requêtes en échec, le défilement horizontal, un nombre de h1 différent de 1 et les violations axe-core graves ; il ne clique sur rien. `npm run test:clicks` complète : il clique jusqu'à 25 contrôles par page (en évitant les suppressions), puis relève erreurs, valeurs « NaN » ou « undefined » affichées, clics bloqués et violations axe-core dans les états ouverts. `npm run test:ui` vérifie la recherche, les filtres, les trois laboratoires, le JSON-LD, un exercice repliable, un quiz classique et l'onglet Écosystème. On vérifie donc aussi un changement en servant le site avec `serve:dist` puis en parcourant les pages touchées (la CSP fait apparaître toute ressource distante comme erreur de console). Les liens sortants vieillissent vite : `npm run check:links` signale les liens morts (404, vidéos YouTube supprimées, hôtes disparus) et les liens déplacés ; il sort en erreur s'il y a un lien mort. Les réponses 403 ou 429 sont des protections anti-robot : elles sont listées comme incertaines.

## Déploiement sur hylst.fr

Le site est servi sous le sous-chemin `/explorons_l_ia/`, défini une seule fois dans `src/config/site.ts` (`SITE_BASE`, repris par `vite.config.ts` et par le routeur).

Le Nginx de la plateforme sert `try_files $uri $uri.html $uri/index.html`, sans repli vers `index.html`. Le build génère donc une page HTML par route (`dist/<route>/index.html`, avec titre, description, canonical et Open Graph propres à la page), un `404.html`, le `sitemap.xml` et `LICENSE.txt` (voir `scripts/static-routes.ts`).

1. `npm run build`, puis `npm run serve:dist` pour tester le sous-chemin, la 404 et la CSP.
2. **Figer le snapshot** avant toute copie : `npm run snapshot -- <dossier> --commit <sha>` copie `dist/` et écrit `SNAPSHOT-MANIFEST.json`. L'arbre SHA-256 est le SHA-256 des lignes `<chemin>|<sha256 du fichier>
`, chemins triés octet par octet en UTF-8, manifeste exclu. Annoncer l'entrée, le CSS, le nombre de fichiers et l'arbre à la plateforme. Un seul écrivain copie dans le miroir ; aucun autre build ne doit modifier `dist/` pendant la recette.
3. Copier le **contenu** de ce snapshot dans `<dossier de la plateforme>`.
4. Suivre la procédure de déploiement de la plateforme de l'auteur (non publiée). `npm run verify:prod` ne vaut que pour le snapshot exact publié, jamais pour un `dist/` qui a avancé entre-temps.

Le statut de la mise en ligne (bloc Nginx, Search Console, vérification en production) n'est pas répété ici : il est suivi dans le dépôt de la plateforme.

### Bloc Nginx de la section

Sans ce bloc, la règle générale `location /` de la plateforme sert déjà le site, mais sans redirection du chemin sans slash, sans CSP, sans cache long pour les fichiers hashés (ils sont revalidés à chaque visite) et avec la 404 globale. À coller dans la « Custom Nginx Configuration », avant les `error_page` globales, à côté des autres sections. Les `add_header` d'un bloc `location` annulent l'héritage des en-têtes du bloc `server` : les en-têtes globaux y sont donc répétés.

```nginx
# Explorons l'IA (Vite + React, export statique) : https://hylst.fr/explorons_l_ia/
# /explorons_l_ia sans slash final redirige (URI relative : pas de souci de schéma derrière Traefik)
location = /explorons_l_ia {
    absolute_redirect off;
    return 301 /explorons_l_ia/;
}

# Fichiers à nom hashé produits par Vite : cache un an (aucune CSP nécessaire sur ces fichiers)
location ^~ /explorons_l_ia/assets/ {
    root /usr/share/nginx/html;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
}

# Pages HTML (une par route), 404 de section, sitemap, licence. Préfixe simple (pas de ^~) : les règles
# de blocage des .md, .env et fichiers cachés du bloc global continuent de s'appliquer à la section.
location /explorons_l_ia/ {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri.html $uri/index.html =404;
    error_page 404 /explorons_l_ia/404.html;
    # HTML toujours revalidé ; en-têtes globaux répétés (un add_header dans un location coupe l'héritage)
    add_header Cache-Control "no-cache" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob:; connect-src 'self'; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" always;
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
}
```

Ce bloc a été testé avec Nginx 1.30 et la configuration globale de la plateforme telle qu'elle est appliquée en production : 301 relatif sur `/explorons_l_ia`, pages avec et sans slash final en 200, dossier sans index et URL inconnue en 404 de section, `.md`, `.env` et `.git` refusés (403) tandis que `.well-known` reste accessible, en-têtes globaux présents une seule fois sur chaque réponse, cache immuable des fichiers de `assets/`, autres sections inchangées. Le test Nginx initial portait sur 47 pages, chargées dans Chrome sans erreur de console ni violation de CSP ; le build actuel en compte 71, à couvrir par `npm run test:smoke` et `npm run test:clicks` avant chaque dépôt. Le test a été fait avec `index index.html;` ; `index.htm` a été ajouté ensuite pour s'aligner sur les autres sections de la plateforme, sans effet sur ce site qui ne contient aucun `index.htm`.

## Licence

Code source et contenus rédigés pour le site : [GNU AGPL v3 ou ultérieure](LICENSE) (`AGPL-3.0-or-later`), comme les autres apps de la plateforme hylst.fr. Le build publie le fichier sous `dist/LICENSE.txt`, lié depuis le pied de page, et écrit `dist/THIRD_PARTY_NOTICES.txt` (licences des bibliothèques réellement livrées et de la police Inter), lié depuis les mentions légales. Le code de chaque version publiée est copié dans le dépôt public [Hylst/explorons_l_ia](https://github.com/Hylst/explorons_l_ia), sans l'historique de travail ; `SOURCE_URL` (dans `src/config/site.ts`) y renvoie depuis le pied de page, la page À propos et les mentions légales.

Exception : la police Inter (SIL OFL 1.1).

## Sécurité du build

- Le site n'utilise aucune variable d'environnement. `vite.config.ts` remplace le préfixe `VITE_` par `EXPLORER_PUBLIC_` : sans cela, un `.env` local finit dans le JS public (zustand, utilisé par React Flow, lit tout l'objet d'environnement et Vite l'inline).
- `.env` et `.env.*` sont ignorés par git. Ne jamais y mettre de secret pour ce projet.
- `npm run build` lance `scripts/verify-dist.mjs` : le build échoue si `dist/` contient « supabase », une variable d'environnement, une clé d'API ou un tiret cadratin.
- Le routage utilise `react-router` 7 (paquet unique, version figée dans `package.json` ; les imports viennent de `"react-router"`, plus de `react-router-dom`), en mode déclaratif avec `BrowserRouter`. `npm audit` ne signale plus `react-router` ; l'application ne passe toujours à `navigate` que des chemins internes tirés de ses propres fichiers de données. `date-fns` paraît inutilisé mais reste requis par `react-day-picker`. Après un `npm audit fix`, relancer `npm run lint` : ESLint et `typescript-eslint` se mettent à jour ensemble.

## Architecture

Vue détaillée et flux de build dans [`structure.md`](structure.md).

- `src/config/site.ts` : nom, URLs, contact (source unique).
- `src/config/tools.ts` : noms officiels et adresses des neuf outils (fiches de /ressources, titres SEO, liens). `LINKS_CHECKED_ON` dans `site.ts` : date « Liens vérifiés le » de /ressources, à changer après un `npm run check:links` complet.
- Typographie : espace insécable avant « ? ! : ; % $ € » et à l'intérieur des guillemets dans le texte affiché (pas dans les exemples de code, les modèles de prompts ni les exports en texte brut).
- `src/config/navigation.ts` : menus desktop (un menu déroulant par catégorie, dès 1024 px) et mobile.
- `src/data/seoData.ts` : titre et description de chaque route. Le build échoue si une route de `src/App.tsx` n'y figure pas, ou inversement.
- `src/App.tsx` : routes, pages chargées à la demande.
- `src/lib/paths.ts` : `asset('pics/x.jpg')` préfixe les fichiers de `public/` avec le sous-chemin. Ne jamais écrire `"/pics/..."` en dur. Pour les liens internes, toujours utiliser `Link` ou `navigate`, jamais `<a href="/...">`.
- `public/pics/explorons_l_ia.jpg` : image de partage (1200 x 630, `DEFAULT_OG_IMAGE` dans `site.ts`). Le nom du site est dessiné dans l'image : en cas de changement de nom, la refaire et lui donner un nouveau nom de fichier pour que les réseaux sociaux oublient l'aperçu en cache.
- `src/lib/random.ts` : générateur pseudo-aléatoire à graine, pour des démonstrations reproductibles.
- `src/lib/data/` : couche de données des outils (« prête pour un backend », sans backend). Les composants passent par `dataSource` (collections asynchrones typées et validées par zod) ; la seule implémentation enregistre dans le navigateur et tolère les données abîmées ou un stockage indisponible. `backup.ts` exporte et restaure toutes les données en JSON (page « Vos données locales »). Brancher une API un jour : écrire une autre implémentation de `DataSource`, ouvrir `connect-src` dans la CSP et mettre à jour les pages Confidentialité et Vos données locales, sans toucher aux composants.
- `src/lib/dataTools/` : calculs des outils de données (lecture CSV, statistiques, profil, équité, générateur à graine, jeux d'exemple). `dataWorker.ts` exécute la lecture et le profil hors de la page, `workerClient.ts` les expose en promesses et refait le calcul dans la page si le worker est indisponible ; la CSP autorise déjà `worker-src 'self'`.
- `src/lib/files.ts` : téléchargement d'un fichier généré, CSV conforme (guillemets, BOM pour Excel), lecture d'un fichier choisi, sans envoi réseau.
- `src/components/<domaine>/` : composants par section. Les contenus (ressources, templates de prompts, fournisseurs d'IA, etc.) sont des fichiers de données TypeScript à côté des composants.
- `src/content/cours-approfondis/` : cours approfondis, un fichier JSON par cours (format dans `types.ts`, validation dans `schema.ts`), registre `registry.ts` (routes `/cours/<slug>`, SEO, sitemap, liste de /ressources). Texte en Markdown avec formules KaTeX (`src/components/courses/deep/`), montants en dollars écrits `\$`. Chaque cours liste ses sources (articles, documentations) ; aucune vidéo n'est citée. `npm run test:unit` valide chaque cours (schéma, registre, règles éditoriales, formules).
- `src/components/common/SimulationNotice.tsx` : bandeau « illustration pédagogique » à placer dans toute démonstration dont les valeurs ne sont pas calculées.
- `src/components/workflow/analysis.ts` : analyse structurelle d'un workflow (tri topologique, nœuds isolés, boucles, chaîne longue), partagée par l'éditeur, l'onglet d'analyse et la simulation.
