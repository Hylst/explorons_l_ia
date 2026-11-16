# Sources HTML des cours approfondis

Dossier de référence : `D:\Downloads\cours-articles-ia`.

Audit du 23 octobre 2026 : les 20 fichiers HTML correspondent un à un aux 20 cours approfondis. Aucun fichier HTML n'est sans cours, aucun cours approfondi n'est sans source dans ce dossier. Les textes sont des réécritures : le recouvrement littéral de cinq mots est faible, il n'y a pas de copier-coller.

## Correspondance

| Fichier HTML | Cours | Modules source → cours | Dernière action |
| --- | --- | ---: | --- |
| `agentic-loops---comment-l-ia-passe-de-la-r-ponse---l-action-cours-interactif (2).html` | `boucles-agentiques` | 5 → 8 | Couverture |
| `algorithmes-de-l-ia-g-n-rative---vae--gan--diffusion---flow-matching-cours-interactif.html` | `algorithmes-ia-generative` | 6 → 7 | Couverture, exemples, exercices, module 7 |
| `cnn---architectures-vision---de-lenet-5---convnext-et-vision-transformers-cours-interactif.html` | `cnn-architectures-vision` | 26 → 8 | Couverture, 7 exemples, module 8 |
| `comment-chatgpt-g-n-re-vraiment-un-mot---l-architecture-compl-te-cours-interactif.html` | `generation-mot-par-mot` | 6 → 7 | Couverture |
| `comment-on-pirate-une-ia--sans-toucher---son-code--cours-interactif.html` | `injection-de-prompt` | 7 → 6 | Couverture |
| `comprendre-jev---les-mod-les-de-d-cision--system-one----d-cider-sans-g-n-rer-de-texte-cours-interactif.html` | `jev` | 13 → 8 | Couverture, 7 exemples, module 8 |
| `dans-les-entrailles-d-un-r-seau-de-neurones---d-mystifier-le-deep-learning-de-z-ro-cours-interactif.html` | `reseau-de-neurones` | 10 → 8 | Couverture, exemples, exercices, module 8 |
| `fine-tuning---lora--qlora--full-ft---quand-utiliser-quoi---cours-interactif.html` | `fine-tuning` | 9 → 8 | Couverture, exemples, module 8 |
| `flow-matching-simplifi----back-to-basics---la-r-volution-des-pixels-bruts-cours-interactif.html` | `flow-matching` | 6 → 7 | Couverture, exemples, exercices, module 7 |
| `ia-g-n-rative--multimodale---agentique---du-neurone-aux-syst-mes-multi-agents-cours-interactif.html` | `ia-generative-multimodale-agentique` | 11 → 9 | Couverture, exemples, module 9 |
| `ia-locale-pour-les-pros---le-guide-ultime-pour-passer---l--chelle-cours-interactif.html` | `ia-locale` | 10 → 8 | Couverture |
| `json-garanti---100----d-codage-contraint---logit-masking-cours-interactif.html` | `decodage-contraint` | 6 → 6 | Couverture, 5 schémas ajoutés |
| `le-co-t-des-tokens---combien-co-te-vraiment-un-llm--et-comment-l-estimer--cours-interactif.html` | `cout-des-tokens` | 7 → 7 | Couverture |
| `le-grokking---quand-une-ia-comprend-apr-s-avoir-m-moris--cours-interactif.html` | `grokking` | 6 → 6 | Couverture |
| `le-llm-wiki-de-karpathy---l-alternative-au-rag-expliqu-e-cours-interactif (1).html` | `llm-wiki` | 7 → 6 | Couverture |
| `le-plus-gros-mensonge-de-l-ia--open-weights-vs-open-source--cours-interactif.html` | `open-weights` | 6 → 6 | Couverture |
| `mcp-d-cortiqu----le--port-usb-c--qui-connecte-l-ia-au-monde-r-el-cours-interactif.html` | `mcp` | 7 → 8 | Couverture |
| `pourquoi-l-ia-tourne-sur-gpu-et-non-sur-cpu---architecture--tensor-cores---vram-cours-interactif.html` | `gpu-cpu` | 6 → 6 | Couverture |
| `rag-expliqu--simplement---la-technique-derri-re-les-ia-qui-marchent-cours-interactif.html` | `rag` | 10 → 10 | Couverture |
| `solutions-ia-b2b-2026---le-guide-complet-des-syst-mes---vendre-aux-entreprises-cours-interactif.html` | `solutions-ia-b2b` | 6 → 7 | Couverture, exemples, module 7 |

## État de l'intégration

- Les 7 cours historiques (`boucles-agentiques`, `cout-des-tokens`, `decodage-contraint`, `generation-mot-par-mot`, `grokking`, `mcp`, `rag`) sont globalement plus longs que leur HTML source ou proches. Ils n'ont pas été réécrits dans ce lot.
- Les 13 nouveaux cours ont tous reçu des exemples, des exercices ou un module supplémentaire. Les plus condensés restent `algorithmes-ia-generative`, `flow-matching` et `reseau-de-neurones`, désormais enrichis.
- `cnn-architectures-vision` et `jev` ont reçu un premier enrichissement : 7 exemples détaillés chacun, puis un huitième module consacré au choix et au déploiement.
- Les 13 nouveaux cours totalisent 94 modules ; les 20 cours approfondis en totalisent 146.
- Jalon 1 des exercices terminé le 24/10/2026 : les 20 cours ont au moins un exercice, soit 39 exercices ; 107 modules sur 146 restent sans exercice.
- Sources par module : schéma et affichage ajoutés ; **146 modules couverts sur 20 cours**, **341 liens**. La couverture est complète côté source ; le build public doit encore être refait et publié.

## Prochaine priorité

La prochaine priorité n'est plus l'ajout de modules : elle porte sur les exercices supplémentaires, les sources au niveau des modules, les SVG adaptés au thème clair et la relecture de style.

Ne pas recopier les HTML. Les titres de source sont parfois promotionnels (`100 %`, `guide ultime`) ; les cours du site gardent des titres et des formulations sobres, avec les limites explicites.
