# Fonctionnalités

Dernière mise à jour : 26/10/2026.

Inventaire fonctionnel d'Explorons l'IA. Les travaux en cours sont suivis dans les tickets (issues) du dépôt ; l'organisation technique est dans `structure.md`.

## Chiffres clés

- **40 cours** : 20 cours classiques et 20 cours approfondis.
- **146 modules** de cours approfondis, **341 liens de sources locales** ; le build publié contient cette couverture complète.
- **146 exercices** avec solution repliable, un par module, dans les 20 cours approfondis.
- **20 quiz classiques** et des quiz dans chaque module des cours approfondis.
- **20 couvertures classiques** et **20 couvertures approfondies**.
- **9 outils interactifs** internes et **76 outils externes** dans la bibliothèque, avec date de vérification du lien et filtres catégorie/tarif.
- **3 laboratoires** : convolution, seuil JEV, masque de tokens.
- **11 applications Hylst** dans `/ressources`, dont 10 actives et 1 en construction ; les 11 URL répondent 200 au 26/10/2026.
- **71 pages HTML** générées.
- **190 tests unitaires** ; contrôles de fumée, de clics, d'accessibilité et de liens.

## Pages publiques

- Accueil, histoire, glossaire, actualités, éthique et pages de vulgarisation.
- Bibliothèque `/ressources` avec recherche, filtres et sept onglets.
- Catalogue `/cours-approfondis` avec recherche, filtre par niveau et parcours recommandés.
- 20 cours approfondis sous `/cours/<slug>`.
- 20 cours classiques sous `/cours/<cours>`.
- Neuf outils interactifs.
- Pages de confidentialité, mentions légales, conditions d'utilisation et gestion des données locales.
- Page d'accessibilité et page « En version simple ».

## Cours classiques

Les 20 cours classiques couvrent notamment :

- apprentissage supervisé et non supervisé ;
- bases mathématiques de l'IA ;
- prompt engineering et chaînes de prompts ;
- paramètres des LLM et NLP ;
- deep learning et premier modèle de machine learning ;
- Python pour l'IA ;
- IA et créativité, IA en entreprise, IA éthique, IA et environnement ;
- usages quotidiens et professionnels de l'IA ;
- organisation des services IA et marketing-vente.

Chaque cours possède une page dédiée, une couverture, des sources et un quiz. Les 20 pages classiques utilisent `CourseGuideLayout`, avec étiquettes, public, niveau, durée et prérequis.

## Cours approfondis

- 20 cours, 146 modules.
- 7 cours historiques : `boucles-agentiques`, `cout-des-tokens`, `decodage-contraint`, `generation-mot-par-mot`, `grokking`, `mcp`, `rag`.
- 13 cours ajoutés en octobre 2026 : `reseau-de-neurones`, `cnn-architectures-vision`, `gpu-cpu`, `algorithmes-ia-generative`, `flow-matching`, `fine-tuning`, `ia-locale`, `open-weights`, `jev`, `injection-de-prompt`, `ia-generative-multimodale-agentique`, `solutions-ia-b2b`, `llm-wiki`.
- Chaque cours a une couverture WebP, un résumé, une introduction, des prérequis, des sources, des pages liées et un registre SEO.
- Chaque module contient un corps Markdown, des points clés, un quiz, un glossaire, un schéma SVG et des sources locales ; les 146 modules sont couverts, soit 341 liens.
- Certains modules ajoutent une analogie, un exemple, du code, un exercice ou un laboratoire.
- Les formules passent par KaTeX ; les textes Markdown par `DeepMarkdown`.
- Le bouton « Copier le lien du module », l'impression et la fiche de révision sont disponibles.
- Les trois laboratoires sont intégrés aux cours concernés : convolution, seuil JEV et masquage de tokens.

### Exercices

- **146 exercices** avec solution repliable, un par module, dans les 20 cours approfondis.
- Chaque énoncé porte sur le contenu du module et chaque réponse est vérifiable à partir du cours.
- Chaque exercice a un énoncé et une solution repliable.

## Outils interactifs

1. Calculateur de coûts d'API IA, avec remises de cache et de traitement par lots facultatives, dont les taux sont saisis par le visiteur.
2. Comparateur de modèles d'IA.
3. Générateur de prompts, avec comparaison locale de trois variantes (indice structurel sur cinq critères, export CSV, variantes conservées au changement d'onglet).
4. Simulateur d'entraînement IA.
5. Détecteur de contenu IA.
6. Optimiseur de workflow IA.
7. Analyseur de jeu de données.
8. Générateur de données synthétiques.
9. Auditeur de biais.

Dans `/ressources`, l'onglet Outils réunit 85 fiches (76 externes et 9 outils du site). Sora a été retiré le 28/10/2026 : le service n'est plus disponible. Deux filtres, catégorie et tarif, s'ajoutent à la recherche ; ils restent dans l'URL (`cat`, `tarif`) et le compteur suit la liste affichée. La recherche ignore les accents et porte sur le nom, la description, la catégorie, le tarif et les fonctions. Les filtres par sujet et par année ne s'affichent que sur les onglets où ils s'appliquent.

Les outils s'exécutent dans le navigateur. Aucun modèle n'est appelé par le site pour produire une réponse. Les prix sont saisis et datés à la main ; aucune remise n'est supposée par défaut. Pour les fiches externes, « Lien vérifié » et « Tarif vérifié » sont deux dates distinctes : la seconde porte sur la grille tarifaire du fournisseur et renvoie à sa page officielle ; cinquante-six fiches ont un tarif daté ; les vingt autres portent une revue tarifaire expliquée (sur devis, poids ouverts, grille non publique). Chaque fiche a une ancre stable et un lien permanent (`?tab=outils&outil=<slug>`), avec un bouton « Copier le lien » et un repérage visuel à l'ouverture. Quatre-vingt-une fiches indiquent la langue de l'interface, et parfois l'obligation d'un compte ou la présence d'une API, avec la date du relevé ; les 85 fiches sont documentées. Les neuf outils du site portent un badge « Outil du site · sans compte ». Une fiche de la bibliothèque dont le lien n'a pas été revu depuis plus de 90 jours affiche un avertissement. Les démonstrations qui ne calculent pas leurs valeurs portent une mention explicite.

## Applications de l'auteur

La section `/ressources` contient 11 applications Hylst :

| Application | État |
| --- | --- |
| Boussole IA | Active |
| CogniAI | Active |
| Esprit Clair | Active |
| DataLittéracie | Active |
| DataLab Studio+ | Active |
| Explorons la Data Science | En construction |
| Guide Maths | Active |
| Confidentialité IA, RGPD et souveraineté | Active |
| Le Green IT en clair | Active |
| À Votre Service | Active |
| Mes Acolytes | Active |

- Les 11 liens répondent 200 au 24/10/2026.
- La recherche et les filtres s'appliquent aussi aux applications.
- « Data Science Memo » n'est pas listé : `/data/` répond 410.
- DataLittéracie n'est pas modifiée par ce dépôt.
- Les compteurs affichés doivent être revérifiés avant dépôt : 88 outils, 42 assistants, 13 modules.

## Bibliothèque de ressources

Sept onglets sont disponibles :

- **Toutes** : vue réunissant les ressources.
- **Cours** : cours internes et approfondis.
- **Publications** : articles et publications scientifiques.
- **Outils** : outils interactifs et fiches d'outils.
- **Vidéos** : sélection de vidéos.
- **Écosystème** : applications de l'auteur.
- **Agir** : actions et ressources pour passer à la pratique.

La recherche et les filtres par type sont disponibles. La date « Liens vérifiés le » est alimentée par `LINKS_CHECKED_ON`.

## Confidentialité et sobriété

- Site entièrement statique, sans backend, sans compte et sans base de données.
- Aucun appel réseau à l'exécution : pas de CDN, pas de police distante, pas d'image distante, pas d'outil d'analyse.
- Seules des préférences et les données des outils sont conservées dans le `localStorage`, avec une liste centralisée et documentée.
- Export et restauration des données locales disponibles.
- Aucun cookie publicitaire et aucun traceur.
- Les journaux techniques du serveur sont traités par la plateforme, pas par l'application.

## Accessibilité

- Objectif WCAG 2.2 AA.
- Navigation clavier, focus visible, noms accessibles et cibles tactiles.
- Respect de `prefers-reduced-motion`.
- Thème clair et thème sombre.
- Alternatives aux graphiques et tableaux larges.
- Tests axe-core sur toutes les pages, en clair, en sombre et en mobile.
- Les 146 schémas SVG utilisent un fond sombre fixe et un contraste texte vérifié ; la revue visuelle finale sur `BD1gFBUl` n'a relevé aucun problème.

## SEO et partage

- Métadonnées propres à chaque route.
- Canonical, Open Graph et données structurées.
- Sitemap généré au build.
- `404.html` de section.
- Image de partage locale.
- Une page HTML par route pour le Nginx de production.

## Qualité et contrôles

- `test:unit` : schémas, cours, ressources, applications, calculs et coûts.
- `test:smoke` : pages du sitemap en desktop et mobile, erreurs, débordement, h1 et axe-core.
- `test:clicks` : contrôles, erreurs, valeurs affichées et axe-core.
- `test:ui` : recherche, filtres, laboratoires, JSON-LD, exercices, quiz et écosystème.
- `check:links` : liens externes, applications Hylst incluses.
- `verify:prod` : comparaison SHA-256 avec la production après déploiement.

## Limites connues

- Les 20 cours approfondis ont un exercice par module, soit 146 exercices.
- **146 modules sur 146** ont des sources locales (20 cours, 341 liens) et sont en production dans `BD1gFBUl`, commit `b624df0c`.
- Audit des 146 SVG terminé : structure accessible, contraste vérifié, 5 libellés éclaircis, 0 texte hors cadre et revue visuelle sans anomalie sur `BD1gFBUl`.
- Relecture de style des 13 nouveaux cours faite le 25/10/2026 ; `checkedOn` mis à jour. Les corrections sont dans `AmZG0mbd`, en attente de publication.
- Les 20 cours classiques partagent le même gabarit de présentation.
- `Explorons la Data Science` est en construction.
- 26 liens externes restent incertains (anti-robot probable) et doivent être revus manuellement.
- Data Science Memo reste exclu ; `/data/` répond 410.

Les priorités sont suivies dans les tickets (issues) du dépôt.
