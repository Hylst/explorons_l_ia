# Changelog - Explorons l'IA

## [Non publié]

### Code source publié (16/11/2026)
- Le code est publié dans le dépôt public `Hylst/explorons_l_ia` (un commit par version publiée, sans l'historique de travail). `SOURCE_URL` y renvoie : lien affiché dans le pied de page, la page À propos et les mentions légales, qui ne disent plus « communiqué sur demande ».
- Nouveau `scripts/export-public-repo.mjs` (adapté de celui d'Explorons la Data Science) : copie de `HEAD` dans un dossier vide, sans `_archive/`, consignes d'agents, notes de travail ni plans ; chemins locaux retirés de la documentation, renvois vers les fichiers non publiés corrigés ; échec en cas de chemin local, de secret, d'ancienne adresse ou de nom de fichier interdit.

- `todo.md` : la procédure de test du formulaire de contact vise `geoffroy.streit@ik.me`, adresse du site depuis le 14/11/2026.

### Plus de photographies Unsplash (14/11/2026)
- Les trois photographies Unsplash (`public/pics/unsplash/`, supprimé) sont remplacées par des illustrations générées localement avec Qwen Image 2.1 Turbo, en WebP : `pics/workflow/prompt.webp` et `pics/workflow/traitement.webp` (démonstration de la page « IA multimodale », dans le style des autres étapes) et `pics/python-post-it.webp` (cours « Python pour l'IA »).
- `src/index.css` exclut `_archive/` de la détection de sources de Tailwind 4 (`@source not`) : le dossier, suivi par Git, faisait générer des classes inutilisées, dont un fond chargé depuis images.unsplash.com.
- Mentions légales, pied de page, README et `LICENSE` : crédits mis à jour (plus d'exception Unsplash).

### Publication de Bf50djqm (14/11/2026)
- Source `90aa165` (branche `chore/static-hylst`), build `index-Bf50djqm.js`, CSS `index-CcCZrjNq.css` inchangé ; copie Docker identique à `dist/`, 202 anciens chunks de `CKdmXnuk` retirés, commit Docker `21cc08473`.
- `verify:prod` : **479/479** fichiers identiques ; `CKdmXnuk` en 404 ; fumée plateforme `verifier-prod.sh --full explorons_l_ia` 68 pages / 420 assets / 0 anomalie.
- Recette en production dans Chrome : Confidentialité, CGU et Gestion des données affichent « douze mois au plus », adresse ik.me sur les cinq pages contrôlées, aucune trace de l'ancienne adresse, 0 erreur console.

### Journaux du serveur et adresse de contact (14/11/2026)
- Confidentialité, CGU, Gestion des données et description SEO de la page Confidentialité : les journaux techniques du serveur sont conservés douze mois au plus (onze archives mensuelles en plus du mois en cours), réglage du serveur hylst.fr depuis le 14/11 ; les pages annonçaient environ six mois.
- Adresse de contact `geoffroy.streit@ik.me` dans `src/config/site.ts` et le glossaire. Le build publié l'avait reçue à la main le 12/11 ; un nouveau build ne réintroduit plus l'ancienne adresse.
- Vérifié : lint (0 erreur), 190 tests unitaires, build et verify-dist, test:ui, fumée du glossaire, pages légales contrôlées dans Chrome (texte, adresse, 0 erreur console).

### Publication de CKdmXnuk (06/11/2026)
- Source `chore/glossaire-ecosysteme` fusionnée en avance rapide dans `chore/static-hylst` (`9183308`) ; snapshot `CKdmXnuk` copié sans reconstruction, commit Docker `ea6d9719`, 204 anciens chunks orphelins de `BUkCTNp7` retirés.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-CKdmXnuk.js` en 200 (189 329 octets), CSS `index-CcCZrjNq.css` en 200 (275 294 octets), `BUkCTNp7` en 404, `SNAPSHOT-MANIFEST.json` en 404, sitemap 67 URL.
- Recette en production : section Hylst visible sur l'accueil, glossaire à 123 termes avec MCP, appel d'outils et cache de prompt, renvois sur Machine Learning et Éthique, 0 erreur console.

### Glossaire enrichi et liens écosystème Hylst (06/11/2026)
- Glossaire étendu à 123 termes (+3) : ajout de `MCP (Model Context Protocol)`, `Appel d'outils (function calling)` et `Cache de prompt (prompt caching)`, trois notions clés de 2026 couvertes par des cours approfondis du site. Le compteur de la page d'accueil passe dynamiquement à 123.
- Liens écosystème Hylst IT learning ajoutés :
  - Dans le menu principal (`navigation.ts`) : entrée « Écosystème Hylst » ajoutée dans la catégorie Ressources.
  - Dans le pied de page (`Footer.tsx`) : lien vers l'onglet Écosystème, et accès directs aux applications sœurs d'apprentissage (Explorons la Data Science, Guide Maths pour l'IA, DataLab Studio+, DataLittéracie, Boussole IA).
  - Sur la page d'accueil (`Home.tsx`) : nouvelle section « La plateforme Hylst IT learning » présentant les 5 applications d'apprentissage complémentaire avec lien vers l'écosystème complet.
  - Sur les pages `/machine-learning` et `/ethique` : encadrés de renvoi vers les applications de data science, de bases de données, de gouvernance et de Green IT.
- Tests : `test:unit` à 190 tests (nouveau bloc de validation du glossaire).
- Build `CKdmXnuk` : 479 fichiers, entrée `assets/index-CKdmXnuk.js`, CSS `index-CcCZrjNq.css`, arbre `33b2253b…` ; branche `chore/glossaire-ecosysteme`, publiée le 06/11/2026 (commit Docker `ea6d9719`).

### Publication de BUkCTNp7 (06/11/2026)
- Source `chore/catalogue-lot17` fusionnée en avance rapide dans `chore/static-hylst` (`8b1069d`) ; snapshot `BUkCTNp7` copié sans reconstruction, 202 anciens chunks orphelins de `DuqG4b_A` retirés.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-BUkCTNp7.js` en 200 (188 099 octets), `DuqG4b_A`, `BdgIgA7Y` et `CZ3AMObL` en 404, `SNAPSHOT-MANIFEST.json` en 404, sitemap 67 URL.
- Recette en production : Runway, Suno et Fireflies.ai affichent « Interface en anglais », Character.ai et Google Colab « Interface en français », Kimi, Albert et IBM watsonx « Interface en anglais », 0 erreur console.

### Runway, Suno et Fireflies qualifiés en anglais (06/11/2026)
- Audit pessimiste des fiches « Français disponible » (multi) : 17 fiches confirmées avec interface/site français, 3 fiches corrigées en anglais (`interfaceLanguage: "en"`).
- Runway : le centre d'aide officiel Runway (article n° 25563791920147) stipule expressément « Runway is currently only available in American English. To use Runway in a different language, Chrome offers an in-browser automatic translation service... » ; l'interface est donc en anglais et dépend de la traduction automatique du navigateur.
- Suno : l'interface studio/application/site est 100 % en anglais. Seule la génération de paroles et prompts gère le français (exactement comme ElevenLabs, classé `en`).
- Fireflies.ai : le tableau de bord et l'interface sont 100 % en anglais. Seule la transcription audio gère le français (exactement comme Otter.ai, classé `en`).
- Total : 85 fiches documentées, 81 avec langue (23 en français, 17 en multilingue, 41 en anglais).
- Tests : `test:unit` 188.
- Build `BUkCTNp7` : 479 fichiers, entrée `assets/index-BUkCTNp7.js`, CSS `index-BOutzI-1.css` inchangé, arbre `c3365a54…` ; branche `chore/catalogue-lot17`, publiée le 06/11/2026.

### Publication de DuqG4b_A (06/11/2026)
- Source `chore/langues-lot16b` fusionnée en avance rapide dans `chore/static-hylst` (`101a123`) ; snapshot `DuqG4b_A` copié sans reconstruction.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-DuqG4b_A.js` en 200 (188 099 octets), `BdgIgA7Y` et `CZ3AMObL` en 404, `SNAPSHOT-MANIFEST.json` en 404, sitemap 67 URL.
- Recette : fiches Character.ai et Google Colab désormais en « Interface en français ».

### Correction des langues d'interface (06/11/2026)
- Relecture dans Chrome réglé en `fr-FR` : Character.ai et Google Colab servent une interface française (`html lang="fr-FR"`, boutons et pages tarifaires traduits). Les deux fiches passent de « anglais » à « français » ; celle de Character.ai vient du lot 16, celle de Google Colab du lot 15.
- Les 38 autres fiches marquées « en » ont été revérifiées avec le même navigateur et restent en anglais.
- Les 39 liens incertains du contrôle ont été rouverts dans un navigateur : la plupart répondent 200 ; `x.ai/pricing`, Canva (2), Gamma (tarification), QuillBot Premium, Légifrance (2), Meta AI et les DOI ACM restent derrière un défi Cloudflare, Reuters derrière un paywall 401 et LinkedIn derrière un 999. Aucun lien mort.
- Build `DuqG4b_A` : 479 fichiers, entrée `assets/index-DuqG4b_A.js`, CSS `index-BOutzI-1.css` inchangé, arbre `0ceb5856…` ; `test:unit` 187, `test:ui` vert, smoke 134/0 clair et sombre, clics 134 passages / 1 898 clics / 0. Branche `chore/langues-lot16b`, en attente de publication ; il remplace `BdgIgA7Y`.

### Publication de BdgIgA7Y (06/11/2026)
- Source `chore/catalogue-lot16` fusionnée en avance rapide dans `chore/static-hylst` (`a0925b8`) ; snapshot `BdgIgA7Y` copié sans reconstruction, commit Docker `57f8c2ac`, 203 anciens chunks orphelins retirés.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-BdgIgA7Y.js` en 200, `CZ3AMObL` en 404, `SNAPSHOT-MANIFEST.json` en 404, sitemap 67 URL.
- Contrôle indépendant : hashes `index.html`, entrée et CSS identiques au manifeste ; 67 pages du sitemap ouvertes en production (369 ressources en 200/304, 0 erreur console, 0 débordement, un seul `h1` par page).

### Character.ai documenté, 85 fiches sur 85 (06/11/2026)
- Fiche Character.ai complétée après lecture des pages `/subscribe` et `/about` via `r.jina.ai` : interface en français (un navigateur réglé en `fr-FR` reçoit `html lang="fr-FR"` et des textes français ; l'adresse `/fr` redirige vers `/`), compte requis (« Inscrivez-vous pour discuter »), aucune API publique documentée, donc champ absent. `lastChecked` et `factsChecked` au 06/11/2026.
- Toutes les fiches sont documentées : 85 sur 85, dont 81 avec la langue de l'interface ; le test qui figeait l'exception est remplacé par un test de couverture complète.
- Trois liens `ai.google.dev` remplacés par leur URL finale AI Studio (`image-understanding`, `pricing`, `function-calling`), qui répondent 200 sans redirection ; le contrôle ne signale plus qu'une redirection de consentement (Nature).
- `LINKS_CHECKED_ON` passe au 06/11/2026 après un contrôle complet : 665 URL, 0 lien mort, 39 incertains anti-robot.
- Tests : `test:unit` 187 ; `test:ui` vert ; smoke 134/0 clair et sombre ; clics 134 passages / 1 882 clics / 0 ; `npm audit --omit=dev` 0 vulnérabilité.
- Build `BdgIgA7Y` : 479 fichiers, entrée `assets/index-BdgIgA7Y.js`, CSS `index-BOutzI-1.css` inchangé, arbre `85262a02…` ; branche `chore/catalogue-lot16`, publiée le 06/11/2026 (commit Docker `57f8c2ac`).

### Publication de CZ3AMObL (06/11/2026)
- Source `chore/outils-lot15` fusionnée en avance rapide dans `chore/static-hylst` (`a8d3a1e..df920e6`) ; snapshot `CZ3AMObL` copié sans reconstruction, commit Docker `4cc42f20`.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-CZ3AMObL.js` en 200, `BVL5KpEX` en 404, `SNAPSHOT-MANIFEST.json` en 404, sitemap 67 URL.
- Production : fumée plateforme 68 pages / 413 assets, 0 anomalie ; bascule constatée le 06/11/2026 à 11:53.
- Contrôle indépendant : 479/479 fichiers byte-identiques aux blobs Git, arbre `14118bd2…`, entrée `a3742979…`, index `9e0a0cd7…` ; `BVL5KpEX` et `2DDSKOs9` en 404 ; `index-CZ3AMObL.js` en 200 (`application/javascript`, 188 099 o) ; les cinq fiches Kimi, Albert, Kyutai, Google Colab et IBM watsonx sont présentes sur `/ressources`, 0 requête externe, 0 erreur console.

### Cinq outils de plus, 84 fiches sur 85 (06/11/2026)
- Cinq fiches ajoutées après lecture de leur page officielle : Kimi (assistant et API de Moonshot AI), Albert (optimisation publicitaire), Kyutai (laboratoire français d'IA ouverte), Google Colab (notebooks Python) et IBM watsonx (studio IA).
- Tarif daté pour Kimi (page API Moonshot) et IBM watsonx (page watsonx.ai) ; revue expliquée pour Albert (sur devis), Kyutai (démos gratuites, poids ouverts) et Google Colab (gratuit, offres Pro et Pro+ après connexion).
- Faits : interface en anglais pour les cinq ; compte requis pour Kimi, Albert, Google Colab et IBM watsonx, sans compte pour Kyutai ; API pour Kimi et IBM watsonx. 84 fiches documentées sur 85, Character.ai reste la seule sans faits.
- Total : 85 fiches (76 externes et 9 outils du site) ; 56 tarifs datés, 20 revues expliquées, 80 fiches avec langue.
- Corrigé au passage : le lien NVIDIA CUDA passe à `cuda-programming-guide` (l'ancienne adresse répond 404) et le lien tarifaire Kimi utilise l'URL finale `platform.kimi.ai/docs/pricing/chat`.
- Tests : `test:unit` 186 ; `test:ui` vert ; smoke clair et sombre 134/0 ; clics 134 passages / 1 888 clics / 0 ; `check:links` 666 URL, 0 lien mort ; `npm audit --omit=dev` 0 vulnérabilité.
- Build `CZ3AMObL` : 479 fichiers, entrée `assets/index-CZ3AMObL.js`, CSS `index-BOutzI-1.css` inchangé, arbre `14118bd2…` ; branche `chore/outils-lot15`, publiée le 06/11/2026 (commit Docker `4cc42f20`).

### Publication de BVL5KpEX (03/11/2026)
- Source `chore/tarifs-2026-11` fusionnée en avance rapide dans `chore/static-hylst` (`246322a..2be1ee3`) ; snapshot `BVL5KpEX` copié sans reconstruction, commit Docker `e077e136`.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-BVL5KpEX.js` en 200, `2DDSKOs9` en 404, `SNAPSHOT-MANIFEST.json` en 404, sitemap 67 URL.
- Production : fumée plateforme 68 pages / 413 assets, 0 anomalie ; bascule constatée le 03/11/2026 à 22:35:20.
- Contrôle indépendant : `verify:prod` **479/479**, `index-2DDSKOs9.js` et `SNAPSHOT-MANIFEST.json` en 404 ; calculateur et comparateur en production (Chrome) affichent `Mistral Large 4` (0,70 $ / 2,10 $), `Claude Haiku 5.5` (palier au-delà de 100 000 jetons), `GPT-6.1 Terra`, `Stable Audio 3.0` et `Flash / Turbo`, avec la date du 3 novembre 2026 ; `Llama 3.3 70B` absent, 0 erreur console.

### Relevé mensuel des tarifs API (03/11/2026)
- Les treize pages officielles ont été relues. Gemini a migré vers `https://aistudio.google.com/docs/pricing` (l'ancienne URL `ai.google.dev` redirige) ; la console Groq répond 403 depuis ce réseau, ses pages ont été lues via un proxy de lecture.
- OpenAI : GPT-6.1 Terra ajouté (1 $ / 5 $ par million de jetons, contexte de 1 050 000 tokens, même règle au-delà de 272 000 tokens). GPT-6 Astra, GPT-6.1 Sol, GPT-6 Luna, GPT-4o, GPT-4o mini, GPT Image 2, TTS-1, TTS-1 HD, Whisper et Text Embedding 3 Large sont inchangés.
- Anthropic : Claude Haiku 5.5 remplace Haiku 4.5 (0,10 $ / 0,50 $ jusqu'à 100 000 jetons par requête, 0,50 $ / 2,50 $ au-delà, contexte de 1 million de tokens). Fable 5.1, Opus 5.5 et Sonnet 5.5 sont inchangés.
- Mistral : Mistral Large 4 remplace Medium 3.5 et Large 3, dépréciés le 31/10/2026 (0,70 $ / 2,10 $, contexte de 1 million de tokens, préversion publique). Small 4, Codestral et Mistral Embed sont inchangés.
- Together AI : Qwen3.8 Flash passe à 0,15 $ / 0,47 $ ; Llama 3.3 70B est retiré, faute de tarif d'inférence sur la page. Kimi K3, MiniMax M3 et FLUX.2 [pro] sont inchangés.
- Stability AI : Stable Audio 3.0 passe de 26 à 8 crédits par génération (0,08 $). ElevenLabs : libellés alignés sur la page, « v2 Multilingual » et « Flash / Turbo », tarifs inchangés.
- Inchangés après relecture : Gemini 3.1 Pro, 3.8 Flash, 3.5 Flash-Lite et Embedding 2 ; Runway Gen-4.5 et Gen-4 Turbo ; Scribe v2 ; Command R+ ; Sonar ; Grok 4.7, 4.3 et Build 0.1 ; GPT-OSS 120B et 20B ; Meta Muse ; images Stability.
- Total : 13 fournisseurs, 47 modèles ; `PRICING_CHECKED_ON` passe au 03/11/2026.
- Tests : `test:unit` 185 ; `test:ui` vert ; smoke clair et sombre 134/0 ; clics 134 passages / 1 904 clics / 0 ; `check:links` 659 URL, 0 lien mort ; `npm audit --omit=dev` 0 vulnérabilité.
- Build `BVL5KpEX` : 479 fichiers, entrée `assets/index-BVL5KpEX.js`, CSS `index-BOutzI-1.css` inchangé, arbre `4055d1bc…` ; branche `chore/tarifs-2026-11` poussée (`801dfa9`, suivie de `dd76c42`), publiée le 03/11/2026 (commit Docker `e077e136`).

### Publication de 2DDSKOs9 (03/11/2026)
- Source `chore/outils-lot14` fusionnée en avance rapide dans `chore/static-hylst` (`cd7e4fd..864801c`) ; snapshot `2DDSKOs9` copié sans reconstruction, commit Docker `39dc466c`.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-2DDSKOs9.js` en 200, `DWHD0VaT` en 404, `SNAPSHOT-MANIFEST.json` en 404, sitemap 67 URL.
- Recette en production : 80 cartes, onglet « Outils IA (80) » ; les six nouveaux outils affichent leur tarif daté et leurs faits ; 0 erreur console.
- `BE9AAaQh` (lot 13) n'a jamais été publié : `2DDSKOs9` le remplace et contient ses quinze fiches.

### Six outils de plus, 79 fiches sur 80 (02/11/2026)
- Six fiches ajoutées après lecture de leur page officielle et de leur grille tarifaire : Luma AI (vidéo, payant), Ideogram (images, freemium), FLUX (images, payant), AssemblyAI (audio, freemium), Amazon Q Developer (développement, freemium) et Make (automatisation, freemium).
- Langue, compte et API relevés quand la page les montre ; Amazon Q Developer et Make n'affichent pas de langue d'interface vérifiable, seuls le compte et l'API sont renseignés. 79 fiches documentées sur 80 ; Character.ai reste sans faits à cause de sa protection anti-robot.
- Tests : `test:unit` 185 ; `test:ui` vert ; smoke clair et sombre 134/0 ; clics 134 passages / 1 882 clics / 0 ; `check:links` 658 URL, 0 lien mort.
- Build `2DDSKOs9` : 479 fichiers, CSS `index-BOutzI-1.css` inchangé, arbre `c0838d51…`. Branche `chore/outils-lot14`, publiée le 03/11/2026 (commit Docker `39dc466c`).

### Quinze fiches de plus, 69 sur 74 (02/11/2026)
- Langue relevée pour Grammarly, Replit Agent, Upscale.media, Replika, Artbreeder, Meta AI, Ollama, LM Studio, ComfyUI, Zapier, HeyGen, Kaggle, Cohere, LightOn et Lucie ; compte et API seulement quand une page officielle le montre.
- Total : 69 fiches documentées sur 74 (9 outils du site, 60 outils externes). Cinq fiches restent sans faits, faute de preuve : Stable Diffusion, Devin Desktop, Character.ai, Veo et Aleph Alpha. Un test unitaire fige cette liste pour qu'aucune nouvelle fiche n'arrive sans relevé.
- Tests : `test:unit` 184 ; `test:ui` vert ; smoke clair et sombre 134/0 ; clics 134 passages / 1 879 clics / 0.
- Build `BE9AAaQh` : 479 fichiers, CSS `index-BOutzI-1.css` inchangé. Branche `chore/outils-lot13`, non publiée : remplacée par `2DDSKOs9`.

### Publication de DWHD0VaT (02/11/2026)
- Source `chore/outils-lot12` fusionnée en avance rapide dans `chore/static-hylst` (`2f95aff..3ab6f55`) ; snapshot `DWHD0VaT` copié sans reconstruction, commit Docker `529eccfa`.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-DWHD0VaT.js` en 200, `TYqV8lWV` en 404, `SNAPSHOT-MANIFEST.json` en 404, sitemap 67 URL.
- Recette en production : « figma » → « Français disponible · Compte requis · relevé le 02/11/2026 » ; « n8n » → interface anglaise et API ; « remove.bg » affiche la fermeture annoncée au 1er décembre 2026 ; l'e-mail de proposition part avec « Type : Outil IA » ; 0 erreur console.
- Les 479 fichiers servis sont identiques au build local : les écarts LF/CRLF constatés dans le dossier Docker après copie ne touchent pas les octets servis.

### Quinze fiches de plus et e-mail de proposition corrigé (02/11/2026)
- Langue relevée pour Gemini Notebook, Figma AI, Jasper AI, Copy.ai, Loom AI, Beautiful.ai, Leonardo AI, Google AI Studio, n8n, Opus Clip, Krea, OpenRouter, Cleanup Pictures, Writesonic et remove.bg. Compte et API seulement quand la page officielle les montre.
- Total : 54 fiches documentées sur 74 (9 outils du site, 45 outils externes).
- remove.bg : le site autonome annonce sa fermeture au 1er décembre 2026 à 9 h (CET) et son passage dans Canva ; la fiche le dit avec la date du relevé.
- L'e-mail de proposition envoyait le code interne « Type : tool » : `resourceTypeLabels.ts` et `proposalMailto.ts` fournissent désormais « Type : Outil IA », avec un test unitaire et une vérification de bout en bout dans le navigateur.
- Tests : `test:unit` 183 ; `test:ui` vert ; smoke clair et sombre 134/0 ; clics 134 passages / 1 908 clics / 0.
- Build `DWHD0VaT` : 479 fichiers, CSS `index-BOutzI-1.css` inchangé. Branche `chore/outils-lot12`, publiée le 02/11/2026 (commit Docker `529eccfa`).

### Publication de TYqV8lWV (01/11/2026)
- `TYqV8lWV` publié dans un commit Docker unique avec accessibilité 0.5.15 : `a8b35c53`, au-dessus de `40a70ff`, n'indexant que `explorons_l_ia/` et `accessibilite/`.
- `verify:prod` : **479/479** fichiers identiques ; entrée `index-TYqV8lWV.js` en 200, `erCpVNC-`, `BgKc8PL6`, `BOE6JFOt` et `To9pBCuS` en 404, `SNAPSHOT-MANIFEST.json` en 404.
- Recette en production : « runway » → « Français disponible · relevé le 31/10/2026 » ; « descript » → « Interface en anglais · Compte requis · API » ; 0 erreur console.
- Le lot 11 remplace `erCpVNC-` et `BgKc8PL6` : aucune de ces deux images n'est publiée.

### Quinze fiches de plus documentées (31/10/2026)
- Langue relevée pour Runway, ElevenLabs, Pika, Suno, Grok, DeepSeek, Qwen, QuillBot, Otter.ai, Synthesia, Descript, Murf AI, Krisp, Fireflies.ai et Adobe Firefly.
- Compte et API renseignés uniquement quand la page officielle les montre (ElevenLabs, Pika, Grok, Otter, Synthesia, Descript, Murf, Krisp, Fireflies) ; sinon le fait reste absent.
- Total : 39 fiches documentées sur 74. `test:unit` 180 ; build `TYqV8lWV` : 479 fichiers, CSS inchangé, smoke 134/0, clics 134 passages / 1 877 clics / 0.
- Branche `chore/outils-lot11`, mergée en avance rapide dans `chore/static-hylst` ; publiée le 01/11/2026 dans le commit Docker `a8b35c53` avec accessibilité 0.5.15, en remplacement de `erCpVNC-` comme de `BgKc8PL6`.

### Faits vérifiés sur 24 fiches (31/10/2026)
- Nouveaux champs `interfaceLanguage`, `accountRequired`, `apiAvailable` et `factsChecked` : neuf outils du site (français, sans compte, sans API) et quinze outils externes (ChatGPT, Claude, Gemini, Copilot, Mistral Vibe, Perplexity, DeepL, Canva AI, Gamma, Notion AI, Hugging Face, Midjourney, GitHub Copilot, Cursor, Claude Code).
- Affichage : « Interface en français · Sans compte · Pas d'API publique · relevé le 31/10/2026 ». Les faits non vérifiés restent absents plutôt que devinés.
- Test de cohérence : tout fait renseigné exige une date de relevé ; la langue reste dans le vocabulaire fr / multi / en.
- Tests : `test:unit` 179 ; `test:ui` vérifie les faits d'un outil interne et de ChatGPT. Build `BgKc8PL6` : 479 fichiers, CSS inchangé, smoke 134/0, clics 134 passages / 1 878 clics / 0.
- Branche `chore/outils-lot10` ; remplacée par `TYqV8lWV` avant publication.

### Quatre outils et file de publication (31/10/2026)
- HeyGen (Free 0 $, Creator 29 $), Opus Clip (Free 0 $, Starter 15 $), Kaggle (gratuit, revue expliquée) et Cohere (essai gratuit, API payante) ajoutés ; trois tarifs datés.
- Catalogue : 65 outils externes, 74 fiches ; 48 tarifs datés, 17 revues expliquées.
- Tests : `test:unit` 178 ; `test:ui` à 74 fiches. Build `erCpVNC-` : 479 fichiers, CSS `index-BOutzI-1.css` inchangé, smoke 134/0 clair et sombre, clics 134 passages / 1 881 clics / 0. `check:links` : 646 URL, 0 lien mort, 28 incertains.
- Poussé sur `chore/outils-lot9` puis fusionné en avance rapide dans `chore/static-hylst` (commit `15bb292`) ; publication demandée groupée avec accessibilité 0.5.15 ; remplace `BOE6JFOt`.

### Revue tarifaire complète et deux outils (31/10/2026)
- Les 16 fiches sans grille publique reçoivent `pricingReviewed` et `pricingNote` : Midjourney, Stable Diffusion, Devin Desktop, Copy.ai, Replit Agent, remove.bg, Replika, DeepSeek, Veo, Adobe Firefly, Microsoft Copilot, Meta AI, Qwen, LightOn, Aleph Alpha, Lucie. Un test impose désormais « tarif daté ou revue expliquée » pour chaque outil externe.
- Deux outils ajoutés : Krea (Freemium, 100 unités par jour) et Zapier (Free 0 $, plans payants), tarifs datés.
- Catalogue : 61 outils externes, 70 fiches ; 45 tarifs datés, 16 revues expliquées. Cleanup Pictures et Character.ai ont finalement une grille publique et sont datées.
- Tests : `test:unit` 177 ; `test:ui` à 70 fiches. Build `BOE6JFOt` : 479 fichiers, CSS `index-BOutzI-1.css` inchangé, smoke 134/0 clair et sombre, clics 134 passages / 1 888 clics / 0. `check:links` : 640 URL, 0 lien mort, 29 incertains.
- Poussé sur `chore/outils-lot8` puis fusionné en avance rapide dans `chore/static-hylst` (commit `b05f59b`) ; remplacé par `erCpVNC-` avant publication ; `dist/` vérifié identique au snapshot (479/479).

### Fiches partageables et proposition d'outil (31/10/2026)
- Chaque fiche a une ancre stable `#outil-<slug>` et un lien permanent `?tab=outils&outil=<slug>` : défilement et anneau de repérage à l'ouverture, bouton « Copier le lien » avec repli `execCommand` si l'API Clipboard est refusée. Un test unitaire vérifie l'unicité des slugs.
- Le formulaire « Proposer une ressource » accepte le type « Outil IA ».
- Deux tarifs datés : Grok (Free 0 $, Plus 8 $, Premium 30 $) et Gemini Notebook (offre Google AI gratuite et payante) ; 41 tarifs datés sur 59 outils externes.
- Tests : `test:unit` 176, `test:ui` vérifie l'ancre, le repérage, la copie et l'option « Outil IA ». Build `CJgmncwL` : 479 fichiers, CSS `index-BOutzI-1.css` (nouvelles classes), smoke 134/0, clics 134 passages / 1 880 clics / 0. `check:links` : 634 URL, 0 lien mort, 29 incertains.
- Poussé sur `chore/outils-lot7` puis fusionné en avance rapide dans `chore/static-hylst` (commit `eead46d`) ; `dist/` vérifié identique au snapshot (479/479). Remplacé par `BOE6JFOt` avant publication.

### Publication de To9pBCuS (31/10/2026)
- `To9pBCuS` publié et vérifié : 479/479 fichiers identiques, entrée `index-To9pBCuS.js`, CSS `index-BEar4slS.css` inchangé, ancien `DNKojjo7` en 404, manifeste en 404. Commit applicatif `8247748`.
- 39 tarifs datés sur 59 outils externes, Krisp corrigé en Payant.
- Recette : filtre Payant 12 fiches ; Runway daté 31/10 ; 68 fiches ; 0 erreur, 0 requête externe.

### Deuxième relevé tarifaire (31/10/2026)
- Dix-sept grilles lues et datées : Runway, Jasper AI, Loom AI, Otter.ai, Synthesia, Descript, Murf AI, Beautiful.ai, Krisp, Fireflies.ai, Writesonic, Artbreeder, Pika, Suno, Hugging Face, Upscale.media, DeepL.
- Correction : Krisp passe de Freemium à Payant (essai gratuit de 7 jours, pas d'offre gratuite permanente).
- Catalogue : 39 tarifs datés sur 59 outils externes ; 12 libellés Payant.
- Tests : `test:unit` 174 ; `test:ui` inchangé. Build `To9pBCuS` : 479 fichiers, CSS inchangé, smoke 134/0 clair et sombre, clics 134 passages / 1 897 clics / 0. `check:links` : 633 URL, 0 lien mort, 29 incertains.
- Branche `chore/outils-lot6` ; snapshot figé, non copié.

### Snapshot reproductible et arbre SHA corrigé (31/10/2026)
- L'arbre agrégé n'utilisait pas un ordre reproductible (`localeCompare`). Nouvel algorithme documenté : SHA-256 des lignes `<chemin>|<sha256 du fichier>
`, chemins triés octet par octet en UTF-8, `SNAPSHOT-MANIFEST.json` exclu.
- `npm run snapshot -- <dossier> --commit <sha>` copie `dist/`, calcule les empreintes et écrit le manifeste, champ `treeAlgorithm` inclus.
- Pour les mêmes 479 fichiers de `DNKojjo7`, l'arbre corrigé est `83f764b2b4c6fb4cb9fdbdf1a1314f41285d6c6698a512f30f0488120e0434b4` ; l'ancien `37e4cf50…` dépendait de la locale. Entrée, index et CSS inchangés.
- `test:unit` : 173 tests (+1 sur l'algorithme). Aucun rebuild, aucune modification de `dist/`.

### Publication de DNKojjo7 (31/10/2026)
- `DNKojjo7` publié et vérifié : 479/479 fichiers identiques, entrée `index-DNKojjo7.js`, CSS `index-BEar4slS.css` inchangé, ancien `LFToWgGB` en 404, manifeste en 404. Commit applicatif `ad50e72`.
- Catalogue à 68 fiches (59 externes et 9 outils du site), 22 tarifs datés, douze outils ajoutés.
- Recette : 68 fiches ; tarif Gratuit 10 (Meta AI + 9 outils du site) ; Assistant IA 12 ; Ollama daté 30/10 avec « Voir les tarifs » ; Sora absent ; 0 erreur, 0 requête externe.

### Catalogue élargi : douze outils ajoutés (30/10/2026)
- Ajouts vérifiés dans Chrome : Microsoft Copilot, Meta AI, Qwen, Ollama, LM Studio, ComfyUI, Google AI Studio, OpenRouter, n8n, LightOn, Aleph Alpha, Lucie. Catégories : assistants, développement, génération d'images et automatisation.
- Six nouvelles grilles tarifaires datées : Ollama (gratuit en local, Pro 20 $/mois), LM Studio (Free 0 $, Bionic+ 20 $/mois), ComfyUI (exécutions offertes puis Standard 16 $/mois), Google AI Studio (palier gratuit puis API payante), OpenRouter (25+ modèles gratuits, frais de 5,5 %), n8n (édition auto-hébergée, offre hébergée à partir de 20 €/mois).
- Catalogue : 59 outils externes, 68 fiches, 22 tarifs datés. « Gratuit » n'est plus réservé aux outils du site : Meta AI y figure.
- Tests : `test:unit` 172 (+2), `test:ui` à 68 fiches. Build `DNKojjo7` : 479 fichiers, CSS inchangé, smoke 134/0 clair et sombre, clics 134 passages / 1 896 clics / 0. `check:links` : 616 URL, 0 lien mort, 29 incertains.
- Branche `chore/outils-lot5` ; snapshot figé, non copié.

### Publication de LFToWgGB (30/10/2026)
- `LFToWgGB` publié et vérifié : 479/479 fichiers identiques, entrée `index-LFToWgGB.js`, CSS `index-BEar4slS.css` inchangé, ancien `CGyclxOB` en 404, manifeste en 404. Commit applicatif `cb64df3`, commit plateforme `56e9d629`.
- Remplacement exact : 479 fichiers utiles, 202 anciens assets retirés, 202 ajoutés, 73 modifiés, 0 restant ; sitemap 67 URL.
- Recette : 56 fiches ; Canva 28/10 avec « Voir les tarifs » ; Cursor et Claude Code 30/10 via `cat=Programmation` ; ChatGPT 30/10 via `cat=Assistant IA` ; badge « Outil du site · sans compte » présent ; Sora absent ; 0 erreur, 0 requête externe.
- La recette précédente citait à tort `cat=Développement`, qui contient le calculateur de coûts, le comparateur de modèles et Hugging Face.

### Lot B : Sora retiré, tarifs datés (28 et 30/10/2026)
- Sora retiré : `sora.com` redirige vers `https://sora.chatgpt.com/sunset` (« Sora is no longer available »), constaté dans Chrome. Le catalogue passe à 47 outils externes et 56 fiches.
- Six liens réexaminés dans Chrome le 28/10 (Midjourney, Canva AI, Gamma, QuillBot, Character.ai, Leonardo) : les 403 du contrôle automatique venaient de l'anti-robot, les pages se chargent.
- Seize grilles tarifaires lues et datées : quatre le 28/10 (Canva, Gamma, QuillBot, Leonardo), douze le 30/10 (ChatGPT, Claude, Gemini, Mistral Vibe, GitHub Copilot, Cursor, Claude Code, Perplexity, Notion AI, Figma AI, Grammarly, ElevenLabs). Les libellés Freemium/Payant sont confirmés ; aucun montant n'est affiché sur le site.
- Affichage : « Tarif vérifié le … » distinct de « Lien vérifié le … », avertissement à 90 jours, lien vers la page tarifaire officielle, mention « les tarifs sont indicatifs ». Badge « Outil du site · sans compte » sur les neuf outils internes.
- Tests : `test:unit` 170 (+1) ; `test:ui` vérifie la date de tarif, le lien officiel et le badge. Build `LFToWgGB` : 479 fichiers, CSS inchangé, smoke 134/0 clair et sombre, clics 134 passages / 1 890 clics / 0.
- `check:links` : 599 URL, 0 lien mort, 31 incertains anti-robot. Poussé sur `chore/outils-lot4` puis fusionné en avance rapide dans `chore/static-hylst` (commit `cb64df3`) ; `dist/` vérifié identique au snapshot.

### Publication de CGyclxOB (28/10/2026)
- `CGyclxOB` publié et vérifié : 479/479 fichiers identiques, entrée `index-CGyclxOB.js`, ancien `DE7IOJJv` en 404, manifeste en 404.
- Premier déploiement en 502 lors du pull `nginx:alpine` ; registre retesté, même commit redéployé par `1081e32e`, sans changement de production entre-temps.
- Recette confirmée : Vidéo 5 fiches, Vidéo + Freemium 4, rechargement conserve les filtres, « ethique » 1 fiche, bandeau actif dans Toutes, 0 erreur, 0 requête externe.

### Lot A du catalogue d'outils (28/10/2026)
- Filtres : options de catégorie et de tarif prises sur le catalogue complet (elles ne disparaissent plus quand une recherche ne renvoie rien), catégorie et tarif conservés dans l'URL (`cat`, `tarif`), compteur d'onglet aligné sur la liste affichée, combinaison catégorie + tarif + recherche.
- Recherche : insensible aux accents et aux ligatures (`video` trouve `vidéo`, `donnees` trouve `données`), étendue à la catégorie, au tarif et aux fonctions ; tous les mots doivent apparaître (`src/lib/search.ts`).
- Affichage : filtres sujet et année masqués sur les onglets où ils ne s'appliquent pas ; phrase d'en-tête corrigée (outils et publications cités, promesse de gratuité nuancée) ; avertissement de filtre actif dans « Toutes ».
- Accessibilité : noms des liens « Visiter », « Utiliser l'outil » et « Signaler un problème » complétés par le nom de l'outil et « nouvel onglet » ; compteur en `aria-live`.
- Dates : `formatIsoDay` affiche JJ/MM/AAAA sans conversion de fuseau (UTC+12 affichait le lendemain).
- Tests : `test:unit` 168 (+8) ; `test:ui` vérifie compteur, options, combinaison, URL, restauration, recherche sans accent et noms accessibles. Build `CGyclxOB` : 479 fichiers, CSS inchangé, smoke 134/0 clair et sombre, clics 134 passages / 1 891 clics / 0.
- Poussé sur `chore/outils-lot3` puis fusionné en avance rapide dans `chore/static-hylst` (commit `6b249ae`) après annonce ; `dist/` vérifié identique au snapshot (479/479). Snapshot figé, non reconstruit.

### Contrôle complet des liens (26/10/2026)
- `npm run check:links` : 578 URL distinctes, 257 hôtes, **0 lien mort**.
- 1 redirection Nature déjà connue ; 25 incertains inchangés (403, 401, délais), aucun 404/410.
- Aucune URL modifiée ; `LINKS_CHECKED_ON` reste au 24/10/2026 pour éviter un build de date seule, à mettre à jour au prochain build éditorial.

### Audit rapide du catalogue d'outils (26/10/2026)
- 41 outils externes examinés : liens vivants ou protégés par anti-robot, aucune URL morte.
- Renommages 2026 confirmés par les pages officielles : Mistral Vibe, Devin Desktop, Gemini Notebook, Writesonic.
- Points à traiter : date de vérification par fiche, sources des mentions 2026 et ajout éventuel de Grok, DeepSeek, Cursor/Claude Code, Sora/Veo, Suno, Firefly.
- Aucune fiche modifiée ; `LINKS_CHECKED_ON` reste au 24/10 jusqu'au prochain build éditorial.

### Nouveau contrôle des liens (27/10/2026)
- `npm run check:links` : **0 lien mort**, 26 incertains anti-robot inchangés (403, 401, délais dépassés), aucune URL retirée.
- `https://www.nature.com/articles/nature16961` répond 303 puis 200 sur le même article : le rebond vient du consentement aux cookies, le lien reste valide. Aucune modification.
- `LINKS_CHECKED_ON` reste au 26/10/2026 : la date affichée ne changera qu'au prochain build.

### Remises fournisseur, fraîcheur des liens et build DE7IOJJv (27/10/2026)
- Calculateur de coûts : quatre taux facultatifs (part des tokens d'entrée en cache, remise du cache, part des requêtes en lots, remise des lots), à 0 par défaut. Le site ne suppose aucun taux ; l'URL conserve les valeurs et le détail affiche l'économie mensuelle. Quatre tests vérifient l'arithmétique et le retour au prix plein à 0.
- Catalogue : une fiche dont le lien n'a pas été revu depuis plus de 90 jours affiche « contrôle de plus de 90 jours, à revérifier » (`src/lib/freshness.ts`, deux tests).
- `test:unit` : **160 tests** (+4). Build `DE7IOJJv` : 479 fichiers, CSS `index-BEar4slS.css` inchangé, `verify-dist` 331 fichiers ; smoke clair et sombre 134/0, clics 134 passages / 1 919 clics / 0 ; `test:ui` vert. Recette navigateur du calculateur : 0,00035 $ puis 0,000325 $ par requête avec 50 % de cache à 50 % de remise, URL `cs=50&cd=50`.
- Lot préparé sur `chore/outils-lot2`, relu puis fusionné en avance rapide dans `chore/static-hylst` (commit `70ac11d`) après annonce ; `dist/` vérifié identique au snapshot (479/479). Snapshot figé, non copié : arbre `b2664d66ae76d3701d5dae12f1c1fa4135c7f07bcb4537728e9b130e44428d7b`, entrée `0957bafa…`, index `703f5a7f…`.

### Publication de 3Ux5DF-6 (27/10/2026)
- `3Ux5DF-6` publié et vérifié : 479/479 fichiers identiques, ancien `CHfbGw6G` en 404, manifeste en 404.
- Recette confirmée : variante du comparateur conservée au changement d'onglet, plus aucune option « Open source », un outil en « Gratuit / poids ouverts », 0 erreur, 0 requête externe.
- `verify:prod` 479/479 depuis la source.

### Audit pessimiste et build 3Ux5DF-6 (27/10/2026)
- **Correctif** : la requalification « Stable Diffusion → Gratuit / poids ouverts », annoncée pour `VY7hOiyK` puis `CHfbGw6G`, n'était dans aucun des deux builds ; le remplacement avait échoué sans erreur. Elle est appliquée ici et un test unitaire la verrouille.
- Comparateur de prompts : les trois variantes vivent dans la page et survivent au changement d'onglet (Radix démonte l'onglet inactif) ; bouton « Reprendre le prompt en cours ».
- Export CSV passé par `toCsv` et `downloadFile` : BOM UTF-8 pour Excel, fins de ligne CRLF et guillemets RFC 4180, au lieu d'un échappement recopié à la main.
- Règles de forme extraites dans `structureChecks.ts` et partagées par la vérification et le comparateur ; une seule vérité, importable par les tests.
- Champs à compléter : détection élargie aux gabarits du site (`[Titre]`, `[votre sujet]`, `[score et justification]`) sans faux positif sur `tableau[i]`, `arr[0]`, `data["clé"]`, `[texte](url)`, `[1, 2]`, ni sur les titres `[Contexte]` et `[Contraintes]`.
- Accessibilité : l'état présent ou absent de chaque critère est annoncé en texte (`sr-only`) au lieu de reposer sur une icône seule.
- `test:unit` : **156 tests** (+9) : intégrité du catalogue (48 fiches externes uniques, champs complets, dates plausibles, pas de doublon d'images), règles de forme dans les deux sens et échappement CSV.
- Build `3Ux5DF-6` : 479 fichiers, CSS `index-BEar4slS.css` inchangé, `verify-dist` 331 fichiers ; smoke clair et sombre 134/0, clics 134 passages / 1 901 clics / 0 ; `test:ui` vert ; `npm audit` 0.
- Snapshot figé, non copié : arbre `f46e54293169778e222920a43c658b5b18e49fb3dbcb6c7168a68148780e5981`. Production `CHfbGw6G` : `verify:prod` 479/479 avant ces changements.

### P0.19 : comparateur de prompts et build CHfbGw6G (26/10/2026)
- Ajout d'un comparateur local de trois variantes de prompt : cinq critères structurels, score sur 5, copie et export CSV, sans appel de modèle.
- Stable Diffusion requalifié « Gratuit / poids ouverts ».
- **Correction du 27/10** : cette requalification n'était pas effective dans ce build, le remplacement avait échoué sans erreur ; voir le build `3Ux5DF-6`.
- Build `CHfbGw6G` : 479 fichiers, **CSS `index-BEar4slS.css`**, `verify-dist` 331 fichiers.
- Contrôles : test:unit 147/147, test:ui vert, smoke 134/0, clics 134 passages / 1 912 clics / 0 ; onglet « Comparer » et trois zones vérifiés dans le navigateur.
- Snapshot figé, non copié : arbre `377b22ef4ed07d14290ef351284e23af618113a4ea4edf8f0c85afbfa069c276`. Publication en attente.

### Catalogue outils UX et build VY7hOiyK (26/10/2026)
- Prix et fonctionnalités affichés sur chaque carte ; filtres catégorie/tarif ; compteur et état vide.
- Mention remplacée par « Lien vérifié le » ; lien de signalement par outil.
- Doublon ChatGPT Images retiré, fonction Images rattachée à ChatGPT ; requalification Stable Diffusion annoncée mais **non appliquée dans ce build** (corrigée dans `3Ux5DF-6`).
- Catalogue à **48 outils externes**.
- Build `VY7hOiyK` : 479 fichiers, **CSS `index-Beo4Fxyz.css`**, `verify-dist` 331 fichiers.
- Contrôles : test:unit 147/147, test:ui vert, smoke 134/0, clics 134 passages / 1 903 clics / 0.
- Snapshot figé, non copié : arbre `7d8afd05349089a88802dddce16dcb6008ca0036f131f3d1d1e8d77f35725128`. Publication en attente.

### Publication de BL75JptX (26/10/2026)
- `BL75JptX` publié : commit `781a7893`, 479/479 fichiers, index `55fb4207…`, entrée `5da5012d…`.
- `/ressources` affiche 49 mentions « Vérifié le 26/10/2026 » et le lien Claude Code normalisé ; ancien `B46Rbebn` en 404.
- Aucun changement Nginx.

### Métadonnées des outils et build BL75JptX (26/10/2026)
- Date de vérification affichée pour les **49 outils externes**.
- Lien Claude Code normalisé vers `https://claude.com/product/claude-code` ; il ne reste qu'une redirection connue, Nature.
- Build `BL75JptX` : 479 fichiers, CSS `index-D5aaf5Zy.css` inchangé, `verify-dist` 331 fichiers.
- Contrôles : test:unit 147/147, test:ui vert, smoke 134/0, clics 134 passages / 1 927 clics / 0.
- Snapshot figé, non copié : arbre `5c3d6032556cb5ebada0d77606610dfcb7152d02ced1fc4095820a711fb237e4`. Publication en attente.

### Publication de B46Rbebn (26/10/2026)
- `B46Rbebn` publié : commit `8b18e1b6`, 479/479 fichiers, index `2d328c96…`, entrée `12b31232…`.
- Huit outils ajoutés, 49 outils externes ; `/ressources` les affiche, `LINKS_CHECKED_ON` au 26/10.
- Ancien `ED48dVqS` en 404, manifeste en 404, redirection 301 et 404 de section conformes.
- `check:links` : 585 URL, 0 lien mort, 2 redirections (Nature, Claude Code), 26 incertains anti-robot.

### Catalogue outils et build B46Rbebn (26/10/2026)
- Huit outils externes ajoutés après vérification des pages officielles : Grok, DeepSeek, Cursor, Claude Code, Sora, Veo, Suno, Adobe Firefly.
- Catalogue porté à **49 outils externes** ; `LINKS_CHECKED_ON` passe au 26/10/2026.
- Build `B46Rbebn` : 479 fichiers, CSS `index-D5aaf5Zy.css` inchangé, `verify-dist` 331 fichiers.
- Contrôles : test:unit 147/147, test:ui vert, smoke 134/0, clics 134 passages / 1 910 clics / 0.
- Snapshot figé, non copié : arbre `122ba610e48d904e55207cb0282e6728d9ffe5348df4cd28c0357d8a519c7ec6`. Publication en attente.

### Publication de ED48dVqS et contact confirmé (26/10/2026)
- `ED48dVqS` publié : commit `e6833560`, 479 fichiers, `verify:prod` 479/479, étiquettes et public restaurés, anciennes entrées `7aYfAVB9` et `BD1gFBUl` en 404.
- P0.3 confirmé par l'éditeur : les parcours « proposer une ressource » et « signaler » ont été testés et les e-mails reçus.

### Correctif métadonnées P1.5 et build ED48dVqS (26/10/2026)
- `CourseGuideLayout` restaure les **étiquettes** et le **public** de l’ancien `CourseHeader`, ainsi que le titre de l’auteur, dans la fiche d’information.
- Les 20 pages classiques transmettent à nouveau ces métadonnées ; aucune page n’avait perdu son contenu principal, mais cette information avait disparu de l’en-tête.
- Build `ED48dVqS` : 479 fichiers, CSS `index-D5aaf5Zy.css` inchangé, `verify-dist` 331 fichiers.
- Contrôles : test:unit 147/147, test:ui vert, smoke 134/0 clair et sombre, clics 134 passages / 1 916 clics / 0.
- Snapshot figé, non copié : arbre `7156710c23a01ad44118400840fffab97ee3d4ea9295d32d997fd5bcdd9997eb`. Publication en attente.

### Publication de 7aYfAVB9 (26/10/2026)
- `7aYfAVB9` publié : commit `8a137283`, 479 fichiers, entrée `index-7aYfAVB9.js`, CSS `index-D5aaf5Zy.css` inchangé.
- `verify:prod` 479/479 ; index `abcc241c…`, entrée `9fab09be…` conformes.
- Ancienne `BD1gFBUl` en 404, manifeste en 404, redirection sans slash en 301, 404 de section conservée.
- Commit documentaire `75afb616` postérieur, sans modification du snapshot.
- Contenu : 146 exercices, un par module.

### Vérification des applications Hylst (26/10/2026)
- Les 11 URL de `authorAppsData.ts` répondent 200 le 26/10/2026, y compris `Explorons la Data Science` en construction.
- Compteurs confirmés sur les pages : 88 outils, 42 assistants, 13 modules.
- `LINKS_CHECKED_ON` reste au 24/10/2026 : cette vérification ciblée ne remplace pas `npm run check:links`.
- `npm audit` : 0 vulnérabilité ; des mises à jour majeures restent disponibles, non appliquées sans revue.

### P1.1 terminé et build 7aYfAVB9 (26/10/2026)
- 107 exercices ajoutés : **146 exercices, un par module**, dans les 20 cours approfondis.
- Chaque énoncé porte sur le module, avec une solution repliable et vérifiable ; sources et textes existants inchangés.
- `checkedOn` des 20 cours au 26/10/2026 ; `test:unit` 147/147 et `test:ui` vert.
- Build `7aYfAVB9` : 479 fichiers, entrée `index-7aYfAVB9.js`, CSS `index-D5aaf5Zy.css` inchangé, `verify-dist` 331 fichiers.
- Smoke clair/sombre 134/0 ; clics 134 passages / 1 888 clics / 0.
- Snapshot figé, non copié : arbre `a1a5be1a4e6d5d3ad836883a6b67af0e707fff9e1fd945077b964b174e13a22a`. Publication en attente.

### Revue visuelle des 146 SVG (26/10/2026)
- 146 schémas passés en 13 planches contact, avec contrôle des pages publiées en clair/sombre, desktop/mobile.
- Aucun texte coupé, chevauchement ou contraste insuffisant relevé ; la correction du tableau `algorithmes-ia-generative` est bien intégrée.
- Aucun rebuild : la production reste `BD1gFBUl`.

### Publication de BD1gFBUl (26/10/2026)
- `BD1gFBUl` publié : commit applicatif `b624df0c`, suivi `4a766458`, 479/479 fichiers, CSS `index-D5aaf5Zy.css`.
- `verify:prod` 479/479, 67/67 routes, fumée 68 pages / 333 assets, 0 anomalie.
- Ancien `Bgja5M86` en 404 ; manifeste de snapshot exclu et en 404.
- P1.5 est terminé : les 20 pages classiques utilisent `CourseGuideLayout`.

### P1.5 terminé et build BD1gFBUl (26/10/2026)
- Cinq derniers cours migrés : `CoderAvecIA`, `IAEntreprise`, `IAEthique`, `NLPComprehension`, `PromptEngineering`.
- **Les 20 pages classiques utilisent `CourseGuideLayout`** ; contenu, composants, quiz, sources et conclusions conservés.
- Build `BD1gFBUl` : 479 fichiers, entrée `index-BD1gFBUl.js`, **CSS `index-D5aaf5Zy.css`** (le hash CSS change), `verify-dist` 331 fichiers.
- Contrôles : test:unit 147/147, smoke clair et sombre 134/0, clics 134 passages / 1 861 clics / 0.
- Snapshot figé, non copié : arbre SHA-256 `9688201ae78cbffe70f3c27cc637d3102b130bdcec65bf43a83bcc27da92534f`. Publication en attente.

### Publication de Bgja5M86 (25/10/2026)
- `Bgja5M86` publié : commit `c497cd5b`, suivi `53bac842`, 480/480 fichiers, `verify:prod` 480/480, fumée 68 pages / 334 assets, 0 anomalie.
- 67 routes du sitemap en 200 ; ancien `Dy38FhtF` en 404.
- Contenu : P1.5 lot 2, cinq cours classiques supplémentaires alignés sur `CourseGuideLayout`.

### P1.5 lot 2 et build Bgja5M86 (25/10/2026)
- Cinq cours classiques migrés vers `CourseGuideLayout` : `ApprentissageSupervise`, `IAMarketingVente`, `OrganiserServicesIA`, `UtiliserIAQuotidien`, `UtiliserIATravail`.
- Contenu, composants interactifs, quiz, sources et conclusions conservés ; plan, fiche d'information et liens liés alignés.
- Build `Bgja5M86` : 480 fichiers, entrée `index-Bgja5M86.js`, CSS `index-33I8zUXv.css`, `verify-dist` 332 fichiers.
- Contrôles : smoke clair et sombre 134/0, clics 134 passages / 1 863 clics / 0 ; revue des pages migrées.
- Snapshot figé, non copié dans le miroir : arbre SHA-256 `51e0a4f00da610ac3f09510d62f113cb178dc951b615784903c4b73c0326944c`. Publication en attente.

### Publication de Dy38FhtF (25/10/2026)
- `Dy38FhtF` publié : commit applicatif `f9dd48a4`, suivi `31e2ccd5`, 480/480 fichiers, ancien `AmZG0mbd` en 404.
- Contenu : P1.5 lot 1, quatre cours classiques alignés.

### P1.5 lot 1 et build Dy38FhtF (25/10/2026)
- Quatre cours classiques migrés vers `CourseGuideLayout` : `ApprentissageNonSupervise`, `ChainOfPrompts`, `BasesMathematiquesIA`, `ParametresLLM`.
- Contenu, composants, quiz, sources et conclusions conservés ; plan, fiche d'information et liens liés alignés.
- Build `Dy38FhtF` : 480 fichiers, entrée `index-Dy38FhtF.js`, CSS `index-33I8zUXv.css`, `verify-dist` 332 fichiers.
- Contrôles : smoke clair et sombre 134/0, clics 134 passages / 1 860 clics / 0 ; revue dev desktop/mobile et clair/sombre des quatre pages.
- Snapshot figé, non copié dans le miroir : arbre SHA-256 `e4a8ab2863cdde8e40ed456fc4f1f0256609adfe688be1d531cb525e00aaa780`. Publication en attente.

### Publication de AmZG0mbd (25/10/2026)
- `AmZG0mbd` publié : commit plateforme `c7746ecc`, 478 fichiers, `verify:prod` 478/478 ; ancien `DS8cPDWt` en 404.
- Contenu : correction du tableau SVG et relecture des 13 cours.

### Build correctif P1.3/P1.4 (25/10/2026)
- Build unique `AmZG0mbd` : 478 fichiers, entrée `index-AmZG0mbd.js`, CSS `index-33I8zUXv.css`.
- Contenu : correction du tableau SVG de `algorithmes-ia-generative` et corrections de la relecture des 13 cours ; `checkedOn` au 25/10/2026.
- Contrôles : `test:unit` 147/147, typecheck, lint 0 erreur, `verify-dist` 330 fichiers, smoke clair et sombre 134 chargements / 0 constat chacun, clics 134 passages / 1 880 clics / 0 constat.
- Snapshot figé, non copié dans le miroir : arbre SHA-256 `93893d8f8bed5ef346400e133499872eeaf133046f762e98cad60b3d8e064df2`. Publication en attente de l'annonce et de la plateforme.

### Relecture de style des 13 cours (25/10/2026)
- Relecture des 94 modules des 13 cours ajoutés en octobre 2026 : ton, vouvoiement, chiffres, analogies, quiz et renvois internes.
- Corrections ciblées : élisions (« n'utilise », « d'entraîner », « n'expose », « qu'Apache »), renvois de modules, compteurs de modules, accord (« une instrumentation »), formulation du résultat de l'étude LLM Wiki et comptage des poids de convolution.
- Aucun tutoiement pronominal, aucun tiret cadratin ; les emplois de « garanti » relevés sont critiques ou négatifs.
- `checkedOn` des 13 cours mis au 25/10/2026. `test:unit` : 147/147 après mise à jour du contrôle de date.
- Aucun build : ces corrections et celle du tableau SVG seront intégrées au prochain snapshot, annoncé avant copie.

### Publication de DS8cPDWt et couverture complète (25/10/2026)
- `DS8cPDWt` publié : commit plateforme `de9b87e0`, entrée `index-DS8cPDWt.js`, CSS `index-33I8zUXv.css`, 478 fichiers, `verify:prod` 478/478, fumée complète 68 pages / 332 assets, 0 anomalie. Ancien `DfQVX82f` en 404.
- Snapshot vérifié avant copie : index `8944f57d…`, entrée `464fcf5f…`, 478 fichiers utiles ; le 479e fichier, `SNAPSHOT-MANIFEST.json`, a été exclu. Copie byte-identique, `diff -rq` sans différence.
- Contenu publié : couverture complète des sources (146 modules, 341 liens) et audit des 146 schémas SVG avec cinq contrastes corrigés.
- Contrôles du build : `test:unit` 147/147, typecheck, lint 0 erreur, `verify-dist` 330 fichiers, smoke clair et sombre 134 chargements / 0 constat chacun, clics 134 passages / 1 854 clics / 0 constat.
- Aucun rebuild après la publication ; le miroir et `dist/` restent sur `DS8cPDWt`.

### Audit des schémas SVG (24/10/2026)
- Audit des 146 schémas : `viewBox`, `role="img"` et `aria-label` présents partout, aucun fond manquant.
- 2 550 textes contrôlés ; 5 libellés à `#64748b` (4,14:1) passés à `#94a3b8` pour dépasser 4,5:1.
- Les schémas conservent un fond sombre fixe et leur mention « illustratif, sans mesure ».
- Intégrés au build `DS8cPDWt` publié et au smoke complet (134 chargements clair et sombre, 0 constat). Revue géométrique rendue des 146 schémas : aucun texte hors cadre, aucun chevauchement après correction du tableau `algorithmes-ia-generative` / `synthese` ; cette correction attend le prochain build.

### Sources par module, couverture complète (24/10/2026)
- Derniers lots : `generation-mot-par-mot` (7 modules, 19 liens), `grokking` (6 modules, 13 liens), `llm-wiki` (6 modules, 14 liens), `mcp` (8 modules, 30 liens), `open-weights` (6 modules, 14 liens), `solutions-ia-b2b` (7 modules, 20 liens) et `reseau-de-neurones` (8 modules, 21 liens).
- Total : **146 modules sur 146** et **341 liens** de sources locales, sur les 20 cours.
- Contrôles source : `test:unit` 147/147, typecheck, lint 0 erreur.
- Intégrés au build `DS8cPDWt`, publié le 25/10 après annonce de l'entrée, du CSS et de l'arbre SHA-256 ; le manifeste de snapshot a été exclu de la copie.

### Sources par module, lot 5 (24/10/2026)
- Sources locales ajoutées aux modules de `boucles-agentiques` (8 modules, 17 liens), `cout-des-tokens` (7 modules, 23 liens) et `decodage-contraint` (6 modules, 18 liens).
- Total : **98 modules sur 146** et **210 liens** de sources locales.
- Contrôles : `test:unit` 147/147, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 330 fichiers, smoke des trois routes en clair et sombre (6 chargements, 0 constat chacun), clics ciblés (6 passages, 96 clics, 0 constat).
- Miroir local : 478/478 fichiers, entrée `index-DfQVX82f.js` ; snapshot gelé, arbre SHA-256 `12a0037178d30cf635a75c4386cab3c1632bbb765f74607d9236e1ad7dd8549b`. Publication suspendue après une course entre le build local et la recette plateforme ; la production sert encore `index-B0oZe3F8.js`.

### Sources par module, lot 4 (24/10/2026)
- Sources locales ajoutées aux modules de `flow-matching` (7 modules, 13 liens), `ia-generative-multimodale-agentique` (9 modules, 16 liens) et `injection-de-prompt` (6 modules, 14 liens).
- Total : **77 modules sur 146** et **152 liens** de sources locales.
- Contrôles : `test:unit` 147/147, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 330 fichiers, smoke des trois routes en clair et sombre (6 chargements, 0 constat chacun), clics ciblés (6 passages, 98 clics, 0 constat).
- Miroir local : 478/478 fichiers, entrée `index-B0oZe3F8.js` ; déploiement plateforme à faire.

### Sources par module, lot 3 (24/10/2026)
- Sources locales ajoutées aux modules de `fine-tuning` (8 modules, 16 liens), `ia-locale` (8 modules, 16 liens) et `jev` (8 modules, 14 liens).
- Total : **55 modules sur 146** et **109 liens** de sources locales.
- Contrôles : `test:unit` 147/147, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 330 fichiers, smoke des trois routes en clair et sombre (6 chargements, 0 constat chacun), clics ciblés (6 passages, 97 clics, 0 constat).
- Miroir local : 478/478 fichiers, entrée `index-DfLlf6u-.js` ; déploiement plateforme à faire.

### Sources par module, lot 2 (24/10/2026)
- Sources locales ajoutées aux modules de `gpu-cpu` (6 modules, 13 liens), `cnn-architectures-vision` (8 modules, 16 liens) et `algorithmes-ia-generative` (7 modules, 11 liens).
- Total : **31 modules sur 146** et **63 liens** de sources locales, après le pilote `rag`.
- Contrôles : `test:unit` 147/147, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 330 fichiers, smoke des trois routes en clair et sombre (6 chargements, 0 constat chacun), clics ciblés (6 passages, 103 clics, 0 constat).
- Miroir local : 478/478 fichiers, entrée `index-CVVjVwnS.js`. Déploiement plateforme : commit `6f04c6de`, production `index-CVVjVwnS.js`, ancien `DUwf_ReI` en 404, `verify:prod` 478/478.

### Sources par module, pilote RAG (24/10/2026)
- Ajout d’un champ optionnel `sources` à `DeepCourseModule`, validé par `schema.ts` et affiché sous la leçon dans `DeepModuleView`.
- Pilote sur `rag` : les 10 modules portent une ou plusieurs sources locales, soit 23 liens vers les articles et documentations déjà cités par le cours.
- Les autres cours conservent leur liste de sources en fin de page ; 136 modules sur 146 restent à couvrir.
- Contrôles : `test:unit` 147/147, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 330 fichiers, smoke `/cours/rag` en clair et sombre (2 chargements, 0 constat chacun), clics ciblés (2 passages, 36 clics, 0 constat).
- Miroir local : 478/478 fichiers, entrée `index-DUwf_ReI.js`. Déploiement plateforme : commit `b12d8982`, production `index-DUwf_ReI.js` et CSS `index-33I8zUXv.css`, `verify:prod` 478/478 ; ancien `DD9I1X_1` en 404.

### Déploiement plateforme (24/10/2026)
- Le miroir `Docker/explorons_l_ia/` a été commité et poussé par l’agent de plateforme sous le commit `7b20ea06`, avec l’entrée `index-DD9I1X_1.js`.
- `npm run verify:prod` compare les 477 fichiers de `dist/` à `https://hylst.fr` : 477 identiques, aucun fichier ignoré par Nginx. La production est conforme au build local.
- Aucun changement de source, de route, de Nginx ou de CSP n’a été nécessaire pour cette mise en ligne.

### Revue des liens incertains (24/10/2026)
- Les 25 URL classées incertaines par `check:links` ont été ouvertes dans Chrome : 21 répondent 200, 2 Reuters répondent 401, LinkedIn change de contexte pendant la navigation, 2 PDF Stanford dépassent le délai de 15 secondes.
- Aucun 404 ou 410. Aucune fiche de ressource n’a été modifiée et `LINKS_CHECKED_ON` reste au 24/10/2026.

### Exercices des cours approfondis, jalon 1 (24/10/2026)
- Un exercice de synthèse ajouté au dernier module des 17 cours qui n’en avaient pas : `boucles-agentiques`, `cnn-architectures-vision`, `cout-des-tokens`, `decodage-contraint`, `fine-tuning`, `generation-mot-par-mot`, `gpu-cpu`, `grokking`, `ia-generative-multimodale-agentique`, `ia-locale`, `injection-de-prompt`, `jev`, `llm-wiki`, `mcp`, `open-weights`, `rag` et `solutions-ia-b2b`.
- Total : **39 exercices** dans les **20 cours approfondis**. Les trois cours déjà équipés gardent 7, 7 et 8 exercices ; les 17 autres en ont un.
- **107 modules sur 146** restent sans exercice ; la cible d’un exercice par module est suivie dans `todo.md`.
- Les énoncés restent conceptuels, avec une solution repliable, sans chiffre inventé ni sortie de code fictive.
- Contrôles : `test:unit` 147/147, build 71 pages et `verify-dist` 329 fichiers, smoke complet desktop et mobile (134 chargements, 0 constat), smoke sombre complet (134 chargements, 0 constat), clics ciblés (34 passages, 340 clics, 0 constat), clics complets (134 passages, 652 clics, 0 constat), `test:ui` OK, `check:links` 0 lien mort sur 578 URL et 25 incertains.
- Miroir Docker : 477/477 fichiers identiques, entrée `index-DD9I1X_1.js`.

### Documentation et backlog (24/10/2026)
- Création de `todo.md` : backlog actif P0 à P3, état de référence, tableaux des 20 cours approfondis et des 11 applications, critères d'acceptation et périmètre exclu.
- Création de `structure.md` : arborescence, routage statique, cours classiques et approfondis, ressources, outils, couche de données, tests et déploiement.
- Création de `features.md` : inventaire fonctionnel, chiffres clés, applications Hylst, confidentialité, accessibilité, SEO et limites connues.
- `README.md` renvoie vers les trois documents, résume l'état actuel et rappelle que le test Nginx initial portait sur 47 pages alors que le build en compte 71.
- `AGENTS.md` et `CLAUDE.md` reçoivent la même section de documentation, les écarts de contenu actuels et la limite explicite sur DataLittéracie et `/data/`.
- `SUIVI_CONTENU.md` est marqué comme document historique ; la file active est `todo.md` et les anciennes tâches obsolètes ne sont pas migrées.
- Ce lot documentaire ne modifie ni comportement, ni dépendance, ni build.
- Contrôles : `git diff --check`, `npm run typecheck`, `npm run lint`, `test:unit` 147/147 et comparaison du corps de `AGENTS.md` et `CLAUDE.md`.

### Applications Hylst dans /ressources (24/10/2026)
- Nouvel onglet « Écosystème (11) » et section « Applications de l'auteur » dans « Toutes » : Boussole IA, CogniAI, Esprit Clair, DataLittéracie, DataLab Studio+, Explorons la Data Science (marqué en construction), Guide Maths, Confidentialité IA/RGPD/souveraineté, Green IT, À Votre Service et Mes Acolytes.
- Descriptions et liens relevés sur chaque site le 24/10/2026. « Data Science Memo » n'est pas listé : son ancienne adresse `https://hylst.fr/data/` répond 410 Gone.
- `check:links` ne neutralise plus `hylst.fr` : les applications de l'auteur sont désormais contrôlées avec le reste de la bibliothèque. Résultat : 578 URL, 0 lien mort, 1 redirection Nature préexistante, 25 incertains.
- `LINKS_CHECKED_ON` passe au 24/10/2026. Recherche appliquée aussi aux applications ; `test:unit` passe à 147 tests (fiches, liens uniques, formats) et `test:ui` vérifie l'onglet, les liens externes et le statut « En construction ».
- Contrôles : typecheck, lint 0 erreur, build 71 pages et `verify-dist` 329 fichiers ; smoke `/ressources` 2/0 en desktop et mobile, 2/0 en sombre ; clics `/ressources` 2 passages/60 clics/0 ; `test:ui` OK.
- Build copié dans `<dossier de la plateforme>` : 477/477 fichiers identiques, entrée `index-Blys25j7.js`.

### Dépendances et audit final (23/10/2026)
- `zod` passé de 3.25.76 à 4.6.7 ; adaptation de `z.record` à la signature à deux arguments. Le formulaire de proposition utilise un resolver local, car zod 4 expose `issues` et non `error.errors`. `@hookform/resolvers` est retiré. `npm audit` ne signale plus de vulnérabilité.
- `puppeteer-core` passé à 25.16.0 pour supprimer la dépendance `chromium-bidi` qui tirait une version vulnérable de zod.
- `test:ui` vérifie aussi la validation du formulaire de proposition de ressource après la migration zod 4.
- `check:links` : 566 URL, 0 lien mort, 1 redirection Nature préexistante, 29 incertains pour protection anti-robot ou délai.
- Le run complet de clics a signalé « NaN » dans une phrase explicative de `gpu-cpu` : faux positif du test, pas un affichage cassé. Formulation remplacée par « résultats non finis » et contrôle ciblé revenu à zéro constat.
- `npm ls` ne signale aucun paquet invalide.
- Contrôles finaux : smoke complet 67/0 en desktop, mobile et sombre ; clics complets 134 passages/1 015 clics/0 ; `test:ui` OK (formulaire invalide inclus).

### Exercices et derniers cours enrichis (23/10/2026)
- Ajout d'exercices « À vous de jouer » avec solution repliable dans le gabarit des cours approfondis.
- Vingt-deux exercices avec solution repliable ajoutés à `algorithmes-ia-generative`, `flow-matching` et `reseau-de-neurones`, avec des exemples supplémentaires.
- Un module de synthèse ajouté à chacun : « Choisir et évaluer un générateur », « Choisir un solveur et évaluer un flux » et « Du réseau jouet aux LLM ». Total : 94 modules pour les 13 nouveaux cours, 146 avec les 7 historiques.
- Contrôles : `test:unit` 146/146, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 328 fichiers ; smoke complet 67/0 en desktop, ciblé 3/0 mobile et 3/0 sombre, clics ciblés 6 passages/98 clics/0 ; `test:ui` vérifie aussi l'ouverture d'un exercice et de sa solution.

### Cours classiques et interface (23/10/2026)
- Quiz de 3 questions ajoutés à neuf cours classiques (quatorze au total avec le lot précédent) : apprentissage non supervisé, chaînes de prompts, coder avec l'IA, IA en entreprise, IA éthique, marketing et vente, NLP et LLM, organisation des services et usage au travail.
- 20 couvertures WebP abstraites ajoutées aux cartes des cours classiques, dans `public/pics/cours-classiques/`.
- Recherche, filtre par niveau et parcours recommandés sur `/cours-approfondis`.
- Bouton de copie du lien du module, durée de lecture ramenée à 160 mots par minute, impression, fiche de révision imprimable et JSON-LD `Course`.
- Trois laboratoires interactifs : convolution avec noyau, pas et padding ; seuil de décision JEV avec couverture et erreurs ; masque de tokens du décodage contraint.
- Test de distribution des réponses des quiz et test de présence des 20 couvertures.
- Contrôles : `test:unit` 146/146, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 327 fichiers ; smoke complet 67 pages en desktop, smoke ciblé 17 pages en mobile et 17 en sombre, 0 constat ; clics ciblés 34 passages et 377 clics, 0 constat ; `test:ui` vérifie recherche, filtres, trois laboratoires, JSON-LD et quiz classique.

### Enrichissement CNN et JEV (23/10/2026)
- `cnn-architectures-vision` et `jev` reçoivent chacun 7 exemples détaillés, un par module : calculs de convolution, champ récepteur, mémoire, comparaison historique, bloc résiduel, convolution séparable, patchs ViT ; routage, distribution d'options, comparaison de moteurs, jeu déséquilibré, seuil asymétrique, intégration dans un agent et dérive en production.
- Un module de synthèse est ajouté à chaque cours : « Choisir et déployer un modèle de vision » et « Comparer et choisir un moteur de décision ».
- Contrôles : `test:unit` 144/144, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 326 fichiers ; smoke ciblé sur les 2 routes en desktop et mobile (4 chargements, 0 constat) ; clics ciblés (4 passages, 47 clics, 0 constat).

### Enrichissement multimodal, B2B et fine-tuning (23/10/2026)
- `ia-generative-multimodale-agentique`, `solutions-ia-b2b` et `fine-tuning` reçoivent des exemples détaillés et un module de synthèse : « Choisir une architecture multimodale », « Construire une offre et un dossier client », « Dimensionner et choisir : VRAM, rang et matrice de décision ».
- Le total passe à 94 modules pour les 13 nouveaux cours, et 146 avec les 7 cours antérieurs.

### Quiz classiques et schémas de décodage contraint (23/10/2026)
- Cinq cours classiques reçoivent un quiz de 4 questions : `BasesMathematiquesIA`, `PromptEngineering`, `ParametresLLM`, `ApprentissageSupervise` et `UtiliserIAQuotidien`.
- `decodage-contraint` reçoit cinq schémas : pourquoi contraindre, grammaires et automates, JSON Schema et moteurs, compromis, limites. Les 6 modules ont désormais un schéma.
- Les réponses des quiz sont réparties entre les positions 0 à 3, et chaque correction explique le point vérifié.
- Contrôles : `test:unit` 144/144, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 326 fichiers ; smoke ciblé sur les 6 routes en desktop et mobile (12 chargements, 0 constat) ; clics ciblés (12 passages, 132 clics, 0 constat).

### Cours approfondis : 13 nouveaux sujets et couvertures (23/10/2026, branche `chore/static-hylst`)
- 13 nouveaux cours approfondis : `reseau-de-neurones`, `cnn-architectures-vision`, `gpu-cpu`, `algorithmes-ia-generative`, `flow-matching`, `fine-tuning`, `ia-locale`, `open-weights`, `jev`, `injection-de-prompt`, `ia-generative-multimodale-agentique`, `solutions-ia-b2b` et `llm-wiki` ; 94 modules pour ces 13 cours, 146 au total avec les 7 cours antérieurs.
- Les 7 cours approfondis antérieurs ont aussi reçu une couverture locale ; les 20 cours ont un WebP 1280 x 720 dans `public/pics/cours/`, affiché avant le résumé et jamais utilisé comme image OpenGraph.
- Schéma : `cover` optionnel contrôlé par le slug et `quiz` porté à 2 questions minimum par module, sans casser les cours existants.
- Contrôles : `test:unit` 144 tests, typecheck, lint 0 erreur, build 71 pages et `verify-dist` 326 fichiers ; smoke complet 67 pages en desktop clair, mobile clair et desktop sombre, 0 constat ; clics étendus sur les 67 routes, 502 en desktop et 468 en mobile (jusqu'à 8 contrôles par page), 0 constat ; `check:links` 566 URL, 0 lien mort, 1 redirection Nature préexistante et 37 incertains pour protection anti-robot ou délai.
- Aucun commit, push ou déploiement ; `LINKS_CHECKED_ON` passe au 2026-10-23.

### Liens et dépendances (20/10/2026)
- Cours MCP : placeholder `https://hôte/mcp` remplacé par `https://exemple.fr/mcp` dans le schéma SVG (faux positif de `check:links`, pas un lien cliquable)
- Calculateur de coûts : tarifs Stability AI pointés vers `https://docs.stability.ai/pricing` (ancienne URL redirigée)
- `npm audit fix` : Vite 8.3.2 -> 8.3.4 ; `npm audit` ne signale plus de vulnérabilité
- Contrôles : typecheck, lint (0 erreur), `test:unit` (65 tests), build et `verify-dist`, `check:links` (0 lien mort sur 494 URL ; 1 redirection Nature liée à la protection anti-robot, 31 incertains), smoke clair et sombre (108 + 108 chargements, 0 constat), clics (108 passages, 1 280 clics, 0 constat)

### Audit des cours historiques, vague 4 (20/10/2026, branche `audit/cours-20`)
- Cinq cours relus et corrigés : `/cours/chain-of-prompts`, `/cours/utiliser-ia-quotidien`, `/cours/utiliser-ia-travail`, `/cours/organiser-services-ia`, `/cours/ia-marketing-vente`
- Sources ajoutées aux cinq cours via `CourseSources` (5 à 6 références par cours) : Anthropic, OpenAI, Wei et al. (2022), Zhou et al. (2022), Madaan et al. (2023) ; CNIL, Commission européenne, Mistral AI et RGPD ; AI Act, règlement (UE) 2026/1744 (omnibus IA), RGPD, CNIL et Commission européenne ; Mozilla et CNIL ; RGPD, AI Act, directive 2011/83/UE, décision Air Canada, CNIL et Commission européenne
- Chain of prompts : durée portée à 45 à 60 minutes, « patterns » remplacés par « modèles », affirmations adoucies (une tâche découpée « peut être mieux traitée », le contexte « s'enrichit » au lieu de faire comprendre à l'IA), limites techniques précisées (fenêtre de contexte, latence cumulée, cache à vérifier), code de compression corrigé (`validatedSteps`), anglicismes francisés (`timeline`, `roadmap`, `KPI`, `COMEX`, `CTA`, `insights`, `healthchecks`, `mocks`, `logging`, `tests A/B`, `bottom-up`/`top-down`), objectif chiffré de 90 % retiré et hypothèses du prompt remplacées par des champs à compléter
- Utiliser l'IA au quotidien : Vibe de Mistral renommé Mistral Vibe (anciennement Le Chat)
- Utiliser l'IA au travail : article 4 du règlement (UE) 2024/1689 reformulé avec les termes de l'omnibus, description de lien alignée sur « retour sur investissement »
- Organiser ses services IA : date de fermeture de Pocket précisée (8 juillet 2025)
- IA marketing et vente : garanties du RGPD reformulées, « scoring de prospects » remplacé par « notation des prospects », « tests A/B automatisés » par « comparaisons automatisées de variantes », description de lien alignée sur « retour sur investissement »
- SEO : descriptions de `coursesData.ts` et `seoData.ts` vérifiées, inchangées
- Contrôles : typecheck, lint (0 erreur), `test:unit` (65 tests), build et `verify-dist` (300 fichiers), smoke des 5 routes en clair et en sombre (20 chargements, 0 constat), clics (54 clics, 0 constat), `check:links` (495 URL sur 236 hôtes ; seul lien mort préexistant : `src/content/cours-approfondis/mcp.json:473` ; 2 liens déplacés préexistants ; 27 incertains pour protection anti-robot ; nouvelles sources sans lien mort)

### Onglet « Agir » dans /ressources (20/10/2026, branche `audit/cours-20`)
- Nouvel onglet `Agir (9)` avec cinq sections de lecture (Comprendre, S'interroger, Prompts, Environnement, S'informer) et neuf actions (Apprendre, Écouter, Me protéger, Encadrer, Informer, Transmettre, Former, Contribuer, Expérimenter)
- 26 liens retenus, dont 2 liens internes (`/generateur-prompts`, `/cours`) ; liens écartés (Mistral, AFPA, Pharos, THESEE, Luc Julia, Charles Pépin, Flowers/Inria, calculateur INR)
- Filtres de la bibliothèque masqués dans l'onglet `Agir`, conservés dans les autres onglets
- Encart vers le guide dans `Toutes` ; compteur `Toutes` inchangé
- Notes `Point de vue`, `Dialogue social`, `Gratuit` et `Exemple daté` affichées dans les cartes d'action ; dates de Montpellier et Paris rappelées dans les descriptions
- `LINKS_CHECKED_ON` mis à jour après `npm run check:links` ; lien mort préexistant `mcp.json:473` hors périmètre
- Contrôles : typecheck, lint, test:unit, build et verify-dist ; smoke de `/ressources` en clair et en sombre ; clics sur `/ressources`

### Audit des cours historiques, vague 3 (20/10/2026, branche `audit/cours-20`)
- Cinq cours relus et corrigés : `/cours/ia-creativite`, `/cours/ia-entreprise`, `/cours/apprentissage-supervise`, `/cours/apprentissage-non-supervise`, `/cours/bases-mathematiques-ia`
- Sources ajoutées aux cinq cours via `CourseSources` (5 à 7 références par cours) : textes juridiques (CPI, Code pénal, directive (UE) 2019/790, règlement (UE) 2024/1689, Copyright Office), cadres de gouvernance (RAND, NIST, ISO/IEC 42001, CNIL), documentation scikit-learn, articles (Hastie, McKinney, Buolamwini et Gebru, Obermeyer, Gomez-Uribe et Hunt), supports de cours (Mathematics for Machine Learning, CS229), documentation NumPy et SciPy, article de Paul Graham
- Créativité : « est sanctionné » remplacé par « peut être sanctionné » dans la page et le quiz, originalité présentée comme appréciée au cas par cas par le juge, description SEO et fiche ressource alignées sur « écriture et image »
- Entreprise : clichés et promesses retirés, anglicismes francisés (`quick wins`, `IA by design`, `MVP`, `upskilling`, `rollback`, `KPIs`, `data-driven`, `business case`), durée portée à 4 à 5 heures, montants k€ rétablis après une erreur de remplacement
- Apprentissage supervisé : affirmation médicale reformulée et sourcée (évaluation rétrospective sur des mammographies, McKinney et al., 2020), `TypesSection` corrigé (régression simple, multiple, linéaire ou non), métriques précisées, exemples chiffrés non sourcés retirés, courbe d'apprentissage de `PerformanceVisualizer` corrigée, égalité 50/50 de l'arbre de décision traitée comme un refus, prédiction illustrative de `InteractiveChart` signalée comme telle
- Apprentissage non supervisé : « groupes naturels » et « structures cachées » remplacés par « groupes homogènes », « régularités » et « relations fréquentes » dans l'introduction, la comparaison, le clustering et les règles d'association ; citation de Gomez-Uribe et Hunt ajoutée, réduction de dimension nuancée (ACP, t-SNE, UMAP, autoencodeur), description SEO, sous-titre et fiche ressource corrigés
- Bases mathématiques : optimum global et local distingués, datation du filtre bayésien anti-spam précisée (début des années 2000, Paul Graham, 2002), raisonnement médical présenté en probabilités plutôt qu'en certitude
- SEO : descriptions de la créativité et de l'apprentissage non supervisé alignées sur le contenu
- Contrôles : typecheck, lint (0 erreur), `test:unit` (61 tests), build et `verify-dist` (300 fichiers), smoke des 5 routes en clair et en sombre (20 chargements, 0 constat), clics (158 clics, 0 constat), `check:links` (459 URL sur 216 hôtes ; seul lien mort préexistant : `src/content/cours-approfondis/mcp.json:473` ; 2 liens déplacés préexistants ; 31 incertains pour protection anti-robot)

### Audit des cours historiques, vague 2 (20/10/2026, branche `audit/cours-20`)
- Cinq cours relus et corrigés : `/cours/prompt-engineering`, `/cours/premier-modele-ml`, `/cours/deep-learning-pratique`, `/cours/python-ia`, `/cours/nlp-concepts`
- Sources ajoutées aux cinq cours via `CourseSources` (8 à 12 références par cours, vérifiées) ; liens de fin et mise en garde sur les données personnelles ajoutés au cours de prompt engineering
- Prompt engineering : scénario SaaS signalé comme fictif avec consigne de ne pas inventer de chiffres, « test A/B » requalifié en comparaison, formulations promotionnelles retirées, rachat de promptfoo présenté comme annoncé et soumis aux conditions de clôture, conclusion alignée sur le contenu
- Premier modèle : `load_boston` daté (version 1.2, décembre 2022) et remplacement indiqué, vocabulaire francisé (valeurs aberrantes, jeu de données), typographie des questions corrigée
- Deep learning : activation Windows documentée (PowerShell et invite de commandes), sélection du périphérique `cuda`/`mps`/`cpu`, import de `SmallCNN` et emplacement de `api.py` précisés, promesse de « code complet » remplacée par des exemples à exécuter dans l'ordre
- Python : import de NumPy dans l'exemple pandas (le remplacement de `None` par `np.nan` aurait sinon échoué), typographie des questions, noms d'outils en minuscules, formulations adoucies
- NLP : taille de téléchargement de GPT-2 précisée, biais signalés, exemple de questions-réponses complété par la détection d'une absence de réponse (SQuAD 2.0) et d'une fin incohérente, disparition du pipeline `question-answering` dans Transformers 5 expliquée
- SEO : descriptions de prompt engineering et de deep learning alignées sur le contenu
- Contrôles : typecheck, lint (0 erreur), `test:unit` (61 tests), build et `verify-dist` (300 fichiers), smoke des 5 routes en clair et en sombre (20 chargements, 0 constat), clics (84 clics, 0 constat), `check:links` (seul lien mort préexistant : `src/content/cours-approfondis/mcp.json:473`)

### Audit des cours historiques, vague 1 (20/10/2026, branche `audit/cours-20`)
- Cinq cours relus et corrigés : `/cours/nlp-comprehension`, `/cours/parametres-llm`, `/cours/ia-ethique`, `/cours/ia-environnement`, `/cours/coder-avec-ia`
- Nouveau composant `CourseSources` pour afficher les sources d'un cours ; listes ajoutées aux cours NLP, paramètres des LLM, éthique et coder avec l'IA, bloc de sources enrichi pour l'environnement
- NLP : promesses de traduction et de qualité humaine nuancées, coût d'entraînement de GPT-3 aligné sur 4,5 M$, parallélisation et scalabilité des RNN requalifiées
- Paramètres des LLM : limite de sortie portée à 128 000 tokens sur certains modèles, capacités émergentes présentées comme débattues (Wei et al. 2022, Schaeffer et al. 2023), dates de FinGPT et BioMedLM précisées, liens de fin ajoutés
- IA éthique : article 22 du RGPD précisé, article 86 indiqué applicable depuis le 2 août 2026, nouvelles interdictions du règlement (UE) 2026/1744 au 2 décembre 2026, risque juridique documenté par les affaires Amazon 2018 et COMPAS 2016, LIME et SHAP reclassés comme méthodes d'explication
- Environnement : part des terminaux recadrée sur l'empreinte carbone (ADEME, actualisation 2024), consommation d'un foyer américain portée à 10 791 kWh (EIA, 2022), PUE et eau sourcés (Uptime Institute 2024, Google et Microsoft), trafic vidéo et émissions vidéo sourcés (Sandvine 2024, AIE 2020 et Carbon Trust 2021)
- Coder avec l'IA : résultat de l'essai contrôlé randomisé de METR précisé, avec des tâches en moyenne 19 pour cent plus longues pour des développeurs expérimentés
- SEO : descriptions de NLP et d'IA et environnement alignées sur le contenu
- Contrôles : typecheck, lint (0 erreur), `test:unit` (61 tests), build et `verify-dist` (300 fichiers), smoke des 5 routes en clair et en sombre (20 chargements, 0 constat), clics (168 clics, 0 constat), `check:links` (seul lien mort préexistant : `src/content/cours-approfondis/mcp.json:473`)

### Cours approfondi « Le décodage contraint » (19/10/2026, branche `cours/decodage-contraint`)
- Nouveau cours `/cours/decodage-contraint` (niveau Intermédiaire, 6 modules, 12 sources) : pourquoi contraindre, masquage des tokens, grammaires et automates, JSON Schema et moteurs, compromis de latence, de débit et de qualité, limites
- Exemple de code en Python (bibliothèque standard) exécuté : automate, masque de tokens et renormalisation, sortie collée telle quelle (`outputVerified`) ; les scores du « modèle » y sont simulés et le cours le dit
- Aucun chiffre sans source : un seul, tiré du résumé de l'article XGrammar (2024), présenté comme annoncé par les auteurs
- Sources : seules les pages réellement ouvertes (README et documentations sur GitHub) sont décrites en détail ; les articles sont cités d'après leur résumé, ce que la liste des sources précise. Aucune source non consultée n'est citée. `npm run check:links` exécuté en local le 19/10/2026. Les liens du cours sont valides. Le contrôle global signale un lien préexistant hors cours.

### Cours approfondis, pilote (18/10/2026, branche `feat/cours-approfondis`)
- Nouvelle rubrique /cours-approfondis et moteur commun : modules, mise en contexte, analogies, exemples, schémas SVG commentés pas à pas (mise en avant des éléments, lecture automatique seulement à la demande et jamais avec « réduire les animations »), code avec sortie vérifiée ou signalée comme indicative, quiz, vocabulaire, sources
- Deux cours pilotes réécrits et vérifiés à partir des cours de l'auteur : « Le grokking » (6 modules, articles de Power et al. 2022 et Nanda et al. 2023 lus en entier, chiffres de la vidéo absents des articles retirés, code PyTorch exécuté) et « Le RAG » (10 modules, 25 sources vérifiées, 9 exemples exécutés en local, chiffres inventés de la source retirés)
- Dépendances : react-markdown, remark-gfm, remark-math, rehype-katex, KaTeX 0.18.11 (polices servies par le site, fichier chargé seulement par ces cours), 0 vulnérabilité
- `test:unit` : validation des cours ; correction du harnais, qui n'incrémentait pas le compteur d'échecs (le code de sortie restait 0)
- Mentions légales : paragraphe sur l'écriture des cours approfondis (aide d'outils d'IA, vérification sur les sources citées, code exécuté)
- Décision de l'auteur : aucune mention des vidéos dont les cours étaient partis, réécrits au point de n'en garder que le thème

### Décisions de l'éditeur du 18/10/2026
- Journaux du serveur : « environ six mois » (six archives mensuelles plus le mois en cours) sur /confidentialite, /cgu, /gestion-donnees-rgpd et dans la description SEO
- /confidentialite : serveur au Royaume-Uni (Hostinger, Manchester), décision d'adéquation européenne renouvelée en décembre 2025 jusqu'à fin 2031
- `services/detection/advancedImageAnalysis.ts`, plus importé depuis la refonte du détecteur, supprimé

### Quatrième relecture complète du contenu (17 et 18/10/2026)
- Six relecteurs (sous-agents Sonnet, lecture seule) sur les 50 routes et tous les composants qu'elles importent, avec vérification sur sources primaires : 677 constats (2 graves, 54 moyens), relus puis appliqués par l'assistant ; faits sensibles recontrôlés (règlement (UE) 2026/1744 sur EUR-Lex, guide de migration de Transformers 5, renommages de produits, intensités carbone)
- AI Act : calendrier à jour de l'omnibus numérique (règlement (UE) 2026/1744, en vigueur le 27/07/2026 : haut risque annexe III au 2/12/2027, annexe I au 2/08/2028, nouvelle rédaction de l'article 4) dans la frise, le glossaire, le cours d'éthique et le cours sur l'IA au travail ; interdiction de la reconnaissance des émotions au travail précisée (données biométriques seulement)
- Produits : Le Chat de Mistral devenu Vibe (mai 2026), Vertex AI devenu Gemini Enterprise Agent Platform (avril 2026), rachat de promptfoo par OpenAI (mars 2026), Twitter devenu X
- Erreurs corrigées : étapes d'entraînement et de validation inversées (/les-bases), AlphaGo rangé en « mémoire limitée » (/niveaux-ia), sens du gradient, sommes et moyennes pondérées (/cours/bases-mathematiques-ia), exemple `pipeline("question-answering")` retiré par Transformers 5 remplacé par un appel direct au modèle, matrice d'attention dont les lignes ne sommaient pas à 1, date d'abandon de l'outil de recrutement d'Amazon, équivariance des convolutions, exemple zero-shot
- Cours environnement : intensités carbone d'une même source et d'une même méthode (Ember, cycle de vie, 2025 : environ 40 g/kWh en France, 460 g dans le monde ; RTE, émissions directes : environ 20 g), sources ajoutées (ADEME 2026, de Vries 2023, RTE, Ember)
- Détecteur de contenu IA : indicateurs qui se déclenchaient sur tout texte retirés (pseudo-perplexité, mots-outils anglais, uniformité des phrases), découpage des mots compatible avec les accents, entropie corrigée, vraie transformée de Fourier pour l'audio, sous-scores d'image constants retirés, une seule échelle de lecture, délai artificiel de 800 ms retiré, formats annoncés alignés sur ceux qui sont traités ; textes ordinaires : indice de 36 à 48 avant, 0 après
- Optimiseur de workflow : les 19 gabarits vides (canevas effacé au chargement) ont un graphe, avec validation humaine pour les cas sensibles
- Divers : quiz de /ressources dont « Toutes les catégories » ne démarrait pas, filtre « Sujet » sans doublons de casse, droits des personnes et réclamation à la CNIL sur /confidentialite, page de la Commission sur l'AI Act ajoutée aux ressources, plan des cours en « Leçon », icônes des leçons masquées sur téléphone ; environ 400 corrections de langue (majuscules à l'anglaise, anglicismes, espaces insécables)

### Contrôle visuel des pages de contenu et corrections (11 au 17/10/2026)
- Contrôle visuel des 41 pages de contenu sur téléphone (375 px clair, 360 px sombre, onglets et sections ouverts) par un sous-agent : 71 constats, dont un vrai défaut de contenu présent depuis l'origine
- /histoire : la frise affichait un texte corrompu (« BERTEPLACED___ », phrases tronquées ou mélangées) ; le rendu des infobulles est réécrit en un seul passage
- Contrastes : 0 violation axe sur toutes les pages, en clair et en sombre (encadré « Analogie » et blocs pastel avec variantes sombres, pastilles numérotées sur fonds 600-700, légendes de graphiques en couleur de texte, blocs de code de nlp-comprehension illisibles en sombre)
- Mise en page sur téléphone : onglets dont les libellés se superposaient (/ressources, /les-bases, glossaire...), icônes écrasées (`svg.lucide { flex-shrink: 0 }`), cours d'apprentissage supervisé (en-têtes, commandes, schémas, tableaux défilables avec indice `ScrollHint`), images de /cas-usage en 16:9, radar de /types-ia, schéma mémoire de /les-bases refait en HTML lisible, titres de /niveaux-ia, dés des bases mathématiques, démo ACP, pied de page et « Dilemmes éthiques »
- `test:smoke` : défile toute la page puis attend la fin des animations avant axe-core (les blocs qui apparaissent au défilement n'étaient pas contrôlés), option `THEME=dark`, `ONLY` accepte une liste ; `npm audit fix` (source-map-js), 0 vulnérabilité

### Illustrations (11/10/2026)
- Les dix dernières illustrations d'origine (outil non documenté, dont deux avec du texte anglais incrusté) régénérées en local avec Z-Image Turbo (Apache 2.0), chacune regardée avant publication, exportées en 800 × 450 sans métadonnées et renommées (les anciens fichiers sont retirés) : agriculture de précision, alerte de fraude, apprentissage adaptatif, maintenance prédictive, analyse juridique, assistance vocale, bannière Éthique, cerveau en réseau, astronaute dans une jungle, avatars en huit styles
- Textes alternatifs propres à chaque image des exemples de /cas-usage ; bannière Éthique recadrée pour garder ses symboles visibles
- Mentions légales et pied de page exacts : toutes les illustrations viennent de Z-Image Turbo, sauf trois photographies d'Unsplash et deux visuels composés à partir de texte, sans IA (image de partage, schéma des sept niveaux)
- ESLint ignore `.claude/` (copies de travail des agents)

### React Router 7 (11/10/2026)
- `react-router-dom` 6.30.6 remplacé par `react-router` 7.18.4 (version du 15/09/2026, figée sans `^`), le paquet unique que recommande le guide de mise à niveau de la v7 ; les imports de 59 fichiers de `src/` passent de `"react-router-dom"` à `"react-router"`. Mode déclaratif conservé (`BrowserRouter`, `Routes`, `Route`) : ni mode framework ni `createBrowserRouter`, donc aucun `react-router/dom`. React reste en 18.3
- `npm audit` : l'avis sur `react-router` (redirection ouverte par barre oblique inverse dans `Link` et `useNavigate`, versions 6.0.0 à 7.17.0) disparaît ; `@remix-run/router` et `react-router-dom` quittent le verrou, `cookie` et `set-cookie-parser` y entrent (dépendances de `react-router`, sans effet sur le site statique). Reste l'avis sur `source-map-js` 1.2.1 (déni de service par un source map, outils de build : PostCSS et Tailwind), corrigeable par `npm audit fix`
- Changements de comportement de la v7 examinés usage par usage : `relativeSplatPath` sans effet (une seule route `*`, tous les liens et appels à `navigate` ont un chemin absolu ou une recherche/ancre) ; `startTransition` actif par défaut (les pages sont déjà déclarées avec `lazy` au niveau du module, comme le guide l'exige) : seule différence observée, lors d'une navigation vers une page dont le fichier n'est pas encore chargé, l'ancienne page reste affichée jusqu'à l'arrivée du fichier au lieu de montrer « Chargement... » (`useTransitions={false}` sur `BrowserRouter` rétablirait l'ancien affichage) ; `useLocation`, `useNavigate`, `useSearchParams` (onglets de /ressources, réglage du calculateur dans l'URL), `Link`, `Outlet`, route `*`, `ScrollToTop`, `useScrollToAnchor` et `basename` vérifiés, sans modification de code autre que l'import
- Contrôles : typecheck, lint (0 erreur), 32 tests unitaires, build de 50 pages et `verify-dist`, test de fumée (92 chargements, 0 constat), test de clics (1 097 clics, 0 constat), plus une vérification de navigation scriptée dans Chrome (liens, retour arrière et avance, `?tab=` sans empiler l'historique, réglage du calculateur dans l'URL, ancre, route 404) dont les résultats sont identiques avec la v6

### Relecture du contenu (10/10/2026)
- Production vérifiée : `npm run verify:prod` 323 fichiers sur 323 identiques au build du 09/10
- Typographie : espaces insécables avant « ? ! : ; % $ € » et à l'intérieur des guillemets (2 425, texte affiché seulement) ; bordures des champs à 3,4:1 au lieu de 1,3:1
- Audit du contenu (33 constats, tous vérifiés) puis corrections : liens directs vers les outils (pied de page, accueil) ; CGU et Confidentialité listent les neuf outils, section « Dans votre navigateur : aucune collecte » ; « AI Act » partout ; générateur de prompts (onglets « Modèles » et « Enregistrés », historique annoncé comme temporaire) ; en-tête du calculateur et carte « Estimations enregistrées » ; titres et descriptions SEO alignés sur les pages ; noms des outils unifiés (`src/config/tools.ts`) ; nombre de questions du quiz et de termes du glossaire calculés (`glossary/glossaryData.ts`) ; quatre termes ajoutés au glossaire (fuite de données, parité démographique et égalité des chances, faux positif et faux négatif, données synthétiques), 118 termes ; section audio de /ia-multimodale remplie (elle n'avait qu'un titre) ; ancres de l'accueil qui menaient à un contenu sans rapport ; identifiant en double ; textes alternatifs décrivant réellement les illustrations ; code mort d'un message « prochainement » ; bouton de retour sur douze cours ; ancres et onglets de /ressources suivis par l'URL ; DALL-E retiré des exemples actuels ; thèse d'un livre attribuée à son auteur ; À propos mentionne l'aide d'outils d'IA générative ; /histoire présentée « des années 1940 à 2025 » ; date « Liens vérifiés le » dans `src/config/site.ts` (`LINKS_CHECKED_ON`)

### Suggestions appliquées (09/10/2026)
- Outils de données : lecture du CSV et profil du jeu de données dans un Web Worker (`src/lib/dataTools/dataWorker.ts`, client `workerClient.ts`, repli dans la page si le worker est indisponible) ; mesuré sur 40 000 lignes : résultats en 0,3 s, page jamais bloquée plus de 80 ms ; le dernier tableau lu reste dans le worker pour recalculer avec une autre cible sans renvoyer les lignes
- Comparateur : la grille de test est enregistrée dans le navigateur (collection `testGrids`, clé `modelTestGrid`, incluse dans l'export et la restauration de « Vos données locales »), notes gardées par modèle, bouton « Vider la grille » avec confirmation ; barre « N modèle(s) sélectionné(s) » avec bouton « Comparer »
- Affichage sur téléphone (contrôle visuel en 375 et 360 px, thèmes clair et sombre) : débordement horizontal de toute la page sur « Tous les modèles » du calculateur (+147 px) et sur la grille de test (+400 px), causé par un texte réservé aux lecteurs d'écran qui sortait de son conteneur ; tableaux du calculateur, de la grille, de l'analyseur et de l'auditeur remplacés par des cartes sous 640 px ; colonne « Critère » collante dans la comparaison détaillée ; graphique de comparaison des coûts lisible ; bouton d'export qui débordait ; légende du graphique de l'auditeur au contraste suffisant ; poignée du curseur de seuil agrandie au toucher ; lien d'accueil de l'en-tête de 44 px
- Confidentialité : liste des données locales complétée (prompts, grille de test) et liste des outils à jour
- Tests : le test de clics mesure le défilement horizontal après chaque clic ; `ONLY` refuse une route absente du sitemap (sous Git Bash, la première route était convertie en chemin Windows et ignorée sans message) et accepte une liste dans le test de fumée

### Deuxième relecture pessimiste
- Nouveaux outils reliés aux cours qui en parlent (machine learning, apprentissage supervisé, premier modèle, IA éthique) : ils n'étaient accessibles que depuis /ressources
- Accueil : nombre d'outils calculé à partir des fiches (« 6 » écrit en dur alors qu'il y en a 9)
- Ressources ajoutées et vérifiées sur leur page : Fairlearn, fiche de la CNIL sur l'anonymisation, articles de Hardt, Price et Srebro (2016), Kleinberg, Mullainathan et Raghavan (2016), Chouldechova (2017) ; module « Équité » du cours de Google signalé ; adresse des tarifs de Mistral mise à jour
- Contraste : 26 textes en vert 600 (3,3:1 sur blanc) passés en vert 700, avec une variante pour le thème sombre
- Auditeur : seuil ramené au milieu de l'échelle quand les scores ne vont pas de 0 à 1 ; calculateur : adresse partagée avec un fournisseur sans modèle au token ramenée au défaut ; graphique de comparaison avec le nom du fournisseur
- `npm run test:unit` (32 tests des calculs des outils) ; test de clics : souris écartée et animations réduites avant axe-core (faux positifs de survol et de fondu)

### Outils
- Trois outils de données, 100 % navigateur : analyseur de jeu de données (types, valeurs manquantes, doublons, valeurs atypiques, corrélations, classes déséquilibrées, indices de fuite de données, rapport Markdown), générateur de données synthétiques (lois simples, graine, export CSV, passage direct à l'analyseur) et auditeur de biais (taux par groupe, parité, égalité des chances et des cotes, seuil réglable) ; les six autres fiches « À venir », irréalisables sans serveur, sont retirées
- Calculateur de coûts refait : scénario unique (tokens par requête, utilisateurs, requêtes par jour, jours par mois), palier tarifaire au choix, calcul détaillé pas à pas, alerte de dépassement de contexte, même usage comparé sur tous les modèles, réglage dans l'URL. Corrigés : « usage quotidien » qui multipliait par 1, tokens négatifs acceptés, « projection » qui empilait jour, semaine, mois et année, diagramme en secteurs sans signification, jugement « économique / élevé » sur des seuils arbitraires, étiquettes non reliées aux champs ; l'estimateur d'usage en double est fusionné
- Comparateur de modèles : onglet « Ma grille de test » (notes personnelles sur ses propres exemples, export CSV) et lien vers le calculateur avec le modèle choisi ; fiche sans « benchmarks » ni « métriques » qui n'existaient pas
- Générateur de prompts : compteur juste (54 modèles, l'en-tête en annonçait 45), catégories en double fusionnées et catégories vides retirées, gabarit précédent qui restait affiché après un changement, accolades d'un JSON ou d'un code saisi qui étaient remplacées par « [non spécifié] », délai factice de génération retiré, étiquettes reliées aux champs, nouvelle règle « champs à compléter »
- Simulateur : jeu de données « Quadrants (XOR) »
- Détecteur : pause du traitement par lots qui ne s'arrêtait pas, reprise qui réanalysait un fichier, délai artificiel entre fichiers, documents Word lus comme du texte brut ; plus d'icône rouge ou verte ni de phrase « semble d'origine humaine » qui valaient verdict
- `npm run test:clicks` : clics sur chaque page puis contrôle axe-core des états ouverts

### Données des outils (« prêt pour un backend », toujours sans backend)
- Couche de données `src/lib/data/` : collections asynchrones typées et validées (zod), une seule implémentation locale (navigateur) ; une donnée abîmée ou un stockage indisponible ne bloque plus l'outil (le calculateur plantait sur un `JSON.parse` sans garde)
- Générateur de prompts : les prompts « mis de côté » sont désormais enregistrés dans le navigateur (nouvelle clé `savedPrompts`) ; l'import valide chaque prompt (un fichier exporté faisait planter la page sur une date) ; bouton d'import accessible au clavier, boutons à icône nommés
- Page « Vos données locales » : sauvegarde complète en JSON et restauration (fusion par identifiant, éléments invalides ignorés et comptés), nombre d'éléments par clé
- Exports CSV conformes (guillemets doublés, BOM pour Excel) : un nom contenant une virgule décalait les colonnes ; le CSV du détecteur donne un indice de 0 à 100 et plus de colonne « IA détectée »
- Détecteur : délai artificiel de 2 secondes retiré de l'analyse de texte (il simulait un calcul qui n'existe pas)

### Transparence
- Confidentialité, CGU, Vos données locales, page enfants : distinction entre le navigateur (aucun cookie, aucun traceur, aucun outil de mesure d'audience) et le serveur (journaux techniques conservés six mois, statistiques de fréquentation agrégées produites localement avec GoAccess, sans transmission à des tiers) ; « ne collecte aucune donnée personnelle » était trop absolu (l'adresse IP figure dans les journaux)
- Illustrations générées par IA signalées dans le pied de page et détaillées dans les mentions légales (trois photographies d'Unsplash exceptées) ; image des avatars renommée et décrite comme un visage fictif
- À propos : « Depuis 2023 » au lieu de « Depuis plus de deux ans »
- `THIRD_PARTY_NOTICES.txt` : fins de ligne normalisées (une licence en CRLF faisait différer le fichier servi de 32 octets)

### Migration (branche `chore/tailwind4-vite`)
- Tailwind CSS 3 vers 4.3 (outil officiel `@tailwindcss/upgrade`, configuration déplacée dans `src/index.css`) et Vite 5 vers 8.3 (Rolldown), `@vitejs/plugin-react` 6 à la place de `@vitejs/plugin-react-swc` (recommandé par Vite 8) ; `autoprefixer` et `bun.lockb` (verrou périmé) retirés. `npm audit` : les avis sur `braces`, `micromatch`, `fast-glob`, `vite` et `esbuild` disparaissent, seul `react-router` 6 reste
- Corrections après l'outil : 27 variantes de composants « outline » qu'il avait réécrites à tort en « outline-solid » ; comportement de `space-x-*` et `space-y-*` de Tailwind 3 conservé ; curseur « main » des boutons conservé ; imports avec extension et `import.meta.dirname` pour le chargeur de configuration natif de Vite
- Contrôle : comparaison pixel par pixel des 47 pages avant et après (bureau et mobile, thèmes clair et sombre), test de fumée, test de clics

### Modifié
- Ton du site : plus aucune formule de vente ni « nous » d'organisation (accueil, parcours, ressources, actualités, cas d'usage, glossaire, cours) ; page À propos plus sobre (auteur unique, « Au-delà de ce site » à la place de l'annonce de recherche de projets) ; les cours « Chaînage de prompts » et « Paramètres des LLM » sont attribués à Geoffroy Streit et retrouvent un titre de page (h1) ; « 150+ templates » remplacé par le vrai compteur ; « sauvegarde » remplacé par « enregistrement dans ce navigateur » (calculateur) et « mettre de côté » (générateur de prompts, où rien n'était conservé au rechargement) ; « Recommandations » du calculateur devenu « Suggestions de l'auteur » ; détecteur : « Indices et limites » au lieu de « Rapports détaillés »
- Images : 26 illustrations remplacées par des illustrations sobres générées en local (Z-Image Turbo, licence Apache 2.0), sans texte ni visage réaliste : visages de stock photo, enfants, marque « Khanmigo », faux tableaux de bord et faux code illisibles, photos Unsplash hors sujet (code PHP pour un cours de Python, mains tatouées, tableau de bord d'un vrai logiciel) ; bandes noires de la frise historique supprimées ; principes de la page Éthique harmonisés (transparence, équité, vie privée) ; mentions légales complétées
- Accessibilité : zones défilantes atteignables au clavier (tableaux, arbre de décision, réseau, exemples de prompts), onglets du quiz Éthique nommés en mobile, un seul h1 sur le générateur de prompts

### Ajouté
- `npm run test:smoke` : test de fumée du build dans Chrome (47 pages, bureau et mobile : erreurs, requêtes en échec, débordement horizontal, h1, axe-core) ; dépendances de développement `puppeteer-core` et `axe-core`
- `npm run check:pricing` et procédure du relevé mensuel des tarifs (`SUIVI_CONTENU.md`) ; chaque fournisseur porte le lien de sa page officielle des tarifs, affiché dans le comparateur (« Vérifier le prix ») ; la date du dernier relevé (`PRICING_CHECKED_ON`) alimente l'avertissement des outils
- En-têtes SPDX (AGPL-3.0-or-later, Geoffroy Streit) dans les fichiers source écrits pour le projet ; les primitives shadcn/ui (MIT) en sont exclues

### Corrigé
- Détecteur d'images : suppression d'une qualité JPEG tirée au hasard qui pouvait afficher « Qualité JPEG très basse (0%) » à tort
- Contrastes et noms accessibles révélés après interaction (K-means, apprentissage supervisé et non supervisé, quiz, fermeture des notifications)
- Photo d'enfant, image inutilisée et composant non monté supprimés ; 4 images imitant des interfaces de logiciels remplacées par des icônes sur « IA multimodale »
- Mentions légales : code source communiqué sur demande, nom exact de l'hébergeur (Hostinger International Limited) ; Confidentialité : durée des journaux alignée sur la phrase définitive de la plateforme (« limitée à six mois », une archive par mois, six conservées), la rotation étant en place sur le serveur depuis le 04/10/2026
- Tarifs : lien mort remplacé (stratégie nationale pour l'IA, page de l'info.gouv.fr supprimée, remplacée par celle de l'economie.gouv.fr) ; contexte de Muse Spark 1.3 (1 048 576 tokens) et d'Embedding 3 Large (8 192), catégorie de Gen-4 Turbo (image vers vidéo), entrée image de Mistral Small 4 et de Grok 4.3, mention « modèle ouvert » non étayée retirée pour Qwen3.8 Flash, « Plus économiques » du calculateur ouvert aux modèles qui acceptent aussi des images
- Formulations : « Haute précision » devenu « Bonne exactitude » (forêt aléatoire) ; applications futures du NLP présentées sans promesse (assistant juridique, direction artistique)
- Deux citations inventées attribuées à Stuart Russell et à Yoshua Bengio (section AGI de « Types d'IA ») : leur texte est introuvable dans leurs écrits. Remplacées par la déclaration du Center for AI Safety de mai 2023 (phrase et signataires relus sur safe.ai), avec lien
- Page Deep Learning : une photo d'enfant avec un robot, légendée « réseau de neurones », est remplacée par une illustration générée par IA et une légende exacte (le fichier de la photo n'est plus référencé, sa suppression est à décider)
- Image des « 7 niveaux » (`ia_levels.jpg`) : « IA réactive » figurait deux fois, « mémoire limité » avait une faute et les niveaux ne correspondaient pas à ceux de la page ; refaite avec les sept niveaux de la page, les niveaux 3 à 7 étant signalés comme théoriques ou spéculatifs
- Faux scores de sentiment (0,92 ; 0,87 ; 0,51 et 0,49) présentés comme sorties de modèle, et « 95 % de précision » inventé : retirés
- `/ressources` : les filtres « Niveau » et « Langue » vidaient la liste dès qu'on les utilisait (aucune donnée derrière) ; retirés. Le sous-titre ne promet plus des ressources « francophones gratuites » (certaines sont en anglais ou payantes)
- Accueil : le compteur de ressources externes est calculé à partir des données (le « 85+ » saisi à la main était faux)
- Fiche d'application multimodale : bloc « Compatibilité » (Web, Mobile et Desktop en vert pour toutes les catégories, valeurs écrites en dur) retiré ; tableau des applications par domaine : colonne « Maturité » (jugement sans source) retirée
- Erreurs techniques : GAN décrits à l'envers, apprentissage par renforcement, LSTM « qui résolvent » la disparition du gradient, attention décrite comme performante sur les longues séquences (coût quadratique), « systèmes experts » avec embeddings, apprentissage fédéré qui « préserve la confidentialité » (les mises à jour peuvent fuiter des informations), RAG qui « réduit les hallucinations » sans réserve, Deep Blue en « recherche exhaustive », GAN cités comme technologie de Midjourney, GPT Image et Stable Diffusion, « styles d'apprentissage » (neuromythe), code Keras 3 (`input_shape` déprécié)
- Quiz : cinq questions avec deux réponses défendables reformulées, « IA Act » devient « AI Act », une explication qui présentait le consentement comme seule base légale du RGPD corrigée
- Statuts périmés : DALL-E (retiré de l'API d'OpenAI le 12 mai 2026), Udio (téléchargement désactivé depuis le 29 octobre 2025), dépôt Piper archivé le 6 octobre 2025 (lien vers le dépôt repris par l'Open Home Foundation), Copy.ai racheté par Fullcast le 15 octobre 2025, Google Assistant, IDx-DR rebaptisé LumineticsCore ; Coursera Coach réintégré (retiré à tort le 1er octobre)
- Réserves juridiques ajoutées aux exemples : AI Act (annexe III pour le recrutement, le crédit ; article 5 pour la reconnaissance faciale en temps réel et l'inférence des émotions au travail), article 33 de la loi du 23 mars 2019 sur le profilage des magistrats, article 226-8 du code pénal sur les contenus générés qui reprennent la voix ou l'image d'une personne, RGPD pour le marketing comportemental
- Démos qui affichaient des résultats fabriqués : arbre de décision (arbre écrit à la main et contredit par son propre tableau) désormais calculé par un vrai CART sur 20 dossiers fictifs générés, avec effectifs et indices de Gini réels ; règles d'association (support, confiance et lift faux) calculées sur les 10 tickets affichés ; « ACP » sans calcul étiquetée comme illustration (curseur limité à 3) ; graphique de classification et de régression (frontière qui coupait le nuage, « 150 m² donne 320 k€ » inventé, kg et cm sur des valeurs fictives) redessiné d'après les moindres carrés et étiqueté ; effectifs de la simulation de dés qui suivaient le curseur au lieu du dernier tirage
- Chiffres inventés retirés des cours : « 10 000 tickets », « 15 règles », « ventes +12 % », « 30 % et 80 % » (règles d'association), allégation non étayée sur Netflix remplacée par ce que dit l'article de Gomez-Uribe et Hunt (2015, lu en texte intégral)
- Cours de mathématiques et de machine learning : dates d'histoire fausses (probabilités, algèbre linéaire), image RGB de 1 000 x 1 000 pixels comptée pour 1 million de valeurs, formule d'une couche dense sans activation, formule de l'attention sans softmax, prix Nobel de chimie 2024 attribué au logiciel, descente de gradient promise « jusqu'au fond », forêt aléatoire et gradient boosting présentés comme à l'abri du sur-apprentissage, régression linéaire « sans sur-apprentissage », arbres « sans préparation des données », NumPy « base de TensorFlow et PyTorch », `A*B` étiqueté produit matriciel
- Rappel dans le générateur de prompts : la réponse d'un modèle ne remplace pas un professionnel (santé, droit, finances) et il vaut mieux ne pas saisir de données personnelles sensibles
- Générateur de prompts : les notes en étoiles (« 4,8 ») et les compteurs d'utilisations (« 2 340 utilisations ») des gabarits étaient saisis à la main alors que le site ne collecte rien ; affichage retiré, ainsi que le tri par « qualité » et « popularité » (tri par nom). Gabarits : « coach sportif certifié et nutritionniste », « thérapeute », « juriste expert », « expert DPO » reformulés avec garde-fous (conseil indicatif, pas de remplacement d'un professionnel), verdict « Signer/Modifier/Refuser » retiré, placeholders qui nommaient des marques, artistes, réalisateurs ou jeux réels remplacés, options chiffrées sans source (répartition 60/40, densité de mots-clés, LUFS, créneaux horaires) et « probabilités » produites par un modèle retirées, bibliographie et chiffres d'entreprise : demande de ne pas inventer, DALL-E retiré, inférence d'âge, de genre et d'émotions sur des images retirée
- Détecteur de contenu IA : l'onglet « Temps réel » (scores tirés au hasard, barres de progression feintes, message « tous les algorithmes ont été exécutés ») est retiré ; la vue « Fréquences » (un `sin` appliqué à chaque pixel) est renommée « Motif décoratif » ; le « score d'artificialité » devient « indice heuristique (aucune valeur de preuve) » ; la page ne promet plus de détecter les voix clonées ni la musique générée
- Cours de prompts, de code, d'environnement et de NLP : « CSAT+ » (cadre qui n'existe pas), « méthodologie REPL », tokens décrits comme unités sémantiques, SentencePiece présenté comme un algorithme, top-p décrit comme un pourcentage de mots, paramètres de température « entièrement sous votre contrôle », matrice d'attention dont une ligne sommait à 1,5, formule de l'attention sans division par √d_k, empreinte du numérique en France (2,5 % remplacé par 4,4 %, actualisation ADEME et Arcep de novembre 2024), cobalt, Gemini CLI remplacé par Antigravity CLI pour les comptes individuels depuis le 18 juin 2026, gain de productivité des assistants de code (essai METR 2025 cité), bug de validation dans un extrait de code (`includes('valide')` acceptait « invalide »), « MetalTech » (nom d'entreprise plausible) retiré, « Dernière mise à jour » qui affichait la date du jour de la visite
- Auteur : la biographie de la page À propos et la ligne de présentation des cours reprennent les indications de l'éditeur (ancien ingénieur en sciences de l'industrie, concepteur-développeur d'applications, vingt ans de commerce et de gestion, plus de deux ans d'autoformation en data science, IA, ML et Python) ; plus de titre de « consultant » ni d'« éducateur » ; constante `AUTHOR_TITLE` dans `site.ts`. Le site indique aussi que le contenu n'est ni rédigé par un chercheur ni relu par un comité
- Générateur de prompts : champs `quality` et `usageCount` supprimés des données (valeurs inventées, plus affichées)
- Cours sur les paramètres des LLM : plage du learning rate élargie et sourcée par méthode, modèles de code cités par nom retirés ; légende du graphe des types d'IA (liens thématiques, pas de dépendance technique)
- Cours d'apprentissage non supervisé : la démo de réduction de dimensionnalité calcule une vraie ACP sur cinq maisons fictives (variance expliquée par composante, poids des variables, coordonnées) au lieu de valeurs choisies à la main
- « Précision » remplacé par « exactitude » quand il s'agit de la part de bonnes réponses (simulateurs, courbes, forêt aléatoire) ; glossaire : exactitude, précision et rappel
- Langue : relecture complète du texte français (orthographe, accords, mots collés à l'affichage par un saut de ligne JSX, libellés et options restés en anglais, virgules décimales, « surapprentissage » harmonisé), 215 corrections
- Accessibilité (contrôle axe-core WCAG 2.1 AA sur 43 pages, thèmes clair et sombre) : contrastes du texte secondaire et du bleu en thème sombre, liens soulignés dans les paragraphes, noms accessibles des curseurs, barres de progression, listes déroulantes, champs de fichiers et boutons-icônes, zones défilantes accessibles au clavier, déclencheur de la frise chronologique devenu un vrai bouton
- Vocabulaire promotionnel ou promesses retirés (accueil, À propos, parcours d'apprentissage dont le niveau « Expert » que le site ne couvre pas, applications multimodales, cas d'usage) ; l'étape « Avancé » du parcours renvoie au cours « Premier modèle ML » au lieu de la page des cas d'usage ; le badge « IA au quotidien » renvoie au cours du même nom
- Animations CSS infinies décoratives retirées (fonds floutés, points qui pulsent) : règle « aucune boucle au repos » de `CLAUDE.md`

### Ajouté
- Calculateur et comparateur : Claude Fable 5.1 (10 $ et 50 $ par million de tokens, 1 million de tokens de contexte, d'après les pages d'Anthropic du 4 octobre 2026)
- Mentions légales : mention de l'assistance d'IA générative et de la responsabilité éditoriale de l'éditeur, illustrations générées par IA sans revendication de droit d'auteur, composants shadcn/ui exclus de la licence
- `dist/THIRD_PARTY_NOTICES.txt` liste aussi les composants shadcn/ui copiés dans `src/components/ui/` (licence MIT, copyright 2023 shadcn), dont la licence exige l'avis de copyright

### Vérifié
- Tarifs recontrôlés le 4 octobre 2026 sur les pages officielles des 13 fournisseurs (47 modèles, deux lectures identiques à quatre heures d'intervalle) : aucun prix d'entrée ou de sortie faux. Signalés dans les caractéristiques : retraits annoncés par OpenAI (TTS-1 et TTS-1 HD le 6 janvier 2027, Whisper le 26 février 2027) et tarif au-delà de 272 000 tokens des GPT-6
- Deuxième passe factuelle et juridique des pages d'entrée, types d'IA, histoire, actualités, machine learning, cas d'usage, éthique, quiz et applications multimodales par deux relecteurs indépendants, avec recontrôle sur sources primaires des points sensibles (safe.ai, Légifrance, page de dépréciation d'OpenAI, centre d'aide d'Udio, dépôt Piper, billet de Copy.ai) ; les journaux listent aussi ce qui s'est révélé exact (frise historique, IDx-DR, ORION, COIN, Mata v. Avianca, Blue River, Senseye)
- Services retirés le 1er octobre revérifiés : Ready Player Me (fermé le 31 janvier 2026), Replica Studios (fermé en juin 2025), Soul Machines (administration judiciaire en février 2026), Play.ht (fermé le 31 décembre 2025) sont bien morts ; Bardeen existe encore mais ne fait plus que de la prospection commerciale, son retrait de la liste « automatisation » reste justifié

## [2.1.0] - 2026-10-02 - Contenu vérifié, nouveau nom, navigation

### Modifié
- Renommage : « Explorer l'IA » devient « Explorons l'IA » (titres, logo, manifeste, mentions, paquet npm `explorons-l-ia`)
- Navigation desktop : un menu déroulant par catégorie (Fondamentaux, Applications, Ressources) dès 1024 px ; les 13 liens à plat écrasaient le logo et débordaient entre 768 et 1280 px
- Tarifs du calculateur et du comparateur relevés sur les pages officielles le 1er octobre 2026 ; modèles retirés remplacés par les modèles actuels ; GPT-4o, GPT-4o mini et TTS-1 HD conservés car toujours vendus au tarif de la page officielle ; Meta (API Muse) et Stability AI (facturation en crédits, 1 crédit = 0,01 $) ajoutés après lecture de leurs pages de tarifs ; Midjourney retiré (abonnement, pas d'API tarifée)
- Ressources relues sur leur page cible (titre, auteurs, éditeur, année) : fiches inventées remplacées par des documents réels (avis de l'ADEME de 2026, communiqué du Parlement européen sur l'AI Act, IRISA, dossier du CNRS...), auteurs et titres corrigés (Constitutional AI, AlphaGo, PaLM, BERT), dix années de vidéos corrigées, liens d'éditeurs plutôt qu'Amazon
- Outils : produits renommés ou fermés mis à jour (DALL-E devient ChatGPT Images, Codeium devient Devin Desktop, Le Chat devient Mistral Vibe, Ready Player Me, Play.ht, Replica Studios, Gen-2, MusicLM, CodeWhisperer...), offres gratuites ou payantes corrigées, superlatifs retirés
- Pages de cours : services fermés (Papers With Code, Bard, Google Assistant, Autopilot), modèles présentés comme les plus récents (GPT-4, Claude 3), tailles de modèles non publiées, horizons de dates inventés et formulations sur la théorie de l'esprit des LLM corrigés ; calendrier de l'AI Act mis à jour d'après la Commission européenne (haut risque : 2 décembre 2027 et 2 août 2028)
- Galerie de créations multimodales : présentée comme des exemples de démarche, le bouton mène à l'outil (« Découvrir l'outil »)
- Seconde relecture factuelle de 28 fichiers de cours, par deux relecteurs indépendants puis recontrôle des points sensibles sur sources primaires : décret américain de 2023 sur l'IA présenté « en cours » alors qu'il est abrogé depuis le 20 janvier 2025 ; citations et positions attribuées à tort à Bengio, Russell et Bostrom (remplacées par le rapport de Butlin et coll. de 2023 et une paraphrase signalée comme telle) ; article 4 de l'AI Act (mesures pour soutenir la maîtrise de l'IA, sans niveau imposé) ; « audit complet » du haut risque corrigé (évaluation de conformité, le plus souvent par contrôle interne du fournisseur) ; Tesla : le nom « Autopilot » n'a été abandonné que dans le marketing californien, en février 2026 ; anecdote de traduction automatique présentée comme apocryphe ; dimensions des embeddings, vocabulaires de tokens et chiffres de GPT-3 attribués au bon modèle
- Démos : photos libres de droits qui se faisaient passer pour des « sorties générées par IA » (workflow multimodal) présentées comme illustrations ; pourcentages de « niveau de maturité » inventés (capacités de l'IA) remplacés par des niveaux qualitatifs ; DALL-E (fermé le 12 mai 2026) remplacé là où il restait ; intitulés « 5 dimensions » et « 7 dimensions » alignés sur le nombre réel de cartes ; vocabulaire promotionnel retiré
- Image de partage Open Graph : elle affichait encore « Explorer l'IA » en gros ; refaite avec le nouveau nom et renommée `explorons_l_ia.jpg` (nouvelle adresse, donc les réseaux sociaux oublient l'aperçu en cache)
- TypeScript en mode `strict` ; `react-router-dom` 6.30.6

### Ajouté
- Rapports publics et cours gratuits vérifiés : OPECST (2017 et 2024), CNIL (2017), France Stratégie (2018), Institut Montaigne (2023), MOOC Inria et Cnam, Fidle, Elements of AI, Machine Learning Crash Course ; outils Mistral Vibe, Gemini, Gemini Notebook, Devin Desktop
- `dist/THIRD_PARTY_NOTICES.txt` généré au build (licences des bibliothèques livrées et de la police Inter), lié depuis les mentions légales
- `SUIVI_CONTENU.md` : procédure, garde-fous, file d'attente et couverture des cycles autonomes de vérification du contenu (reprise programmée toutes les 5 heures)

### Corrigé
- Menu mobile : il se refermait aussitôt ouvert
- Plugin `@tailwindcss/typography` jamais activé : classes `prose` inertes retirées
- Dépendances : `npm audit fix` sans `--force` (lockfile seulement : lodash, nanoid, glob, minimatch, picomatch, postcss, yaml, brace-expansion, @babel/runtime), avec `typescript-eslint` 8.71 monté en même temps qu'ESLint 9.39 (sinon `npm run lint` plantait). Restent les avis du serveur de développement (vite, esbuild) et de `react-router` 6 (correctif seulement en v7)
- `npm run check:links` : un délai dépassé n'est plus compté comme lien mort, et `curl` garde un fichier de cookies par hôte (faux « redirections sans fin » sur ai.google.dev) ; lien Adobe Firefly de la galerie remplacé par `firefly.adobe.com`
- `npm run verify:prod` n'accepte plus l'ancien nom du site

### Retiré
- `public/pics/.gitkeep` et `public/pics/image-placeholder.jpg` (textes de remplissage de 70 octets, jamais référencés), composant `ExternalResources.tsx` (jamais monté, ses fiches utiles sont dans les listes de ressources) et ses deux lignes dans `src/components/index.ts`

### Vérifié
- `npm run check:links` : 0 lien mort sur 219 URL ; 18 pages protégées par un anti-robot (403 ou 999), existence attestée par ailleurs ; une page de Nature signalée « déplacée » s'ouvre normalement dans Chrome (redirection d'authentification pour les robots)
- 47 pages testées en bureau et en mobile (689 contrôles cliqués) : 92 passages sur 94 sans anomalie, les deux autres sont le `np.nan` d'un exemple de code Python ; parcours des outils (simulateur, détecteur, calculateur, comparateur) : 22 vérifications sur 22
- `npm run typecheck`, `npm run lint` (0 erreur, 18 avertissements) et `npm run build` avec `verify-dist` sans erreur
- Tarifs de GPT-4o, GPT-4o mini, TTS-1 HD, Meta et Stability AI relus sur leurs pages officielles le 2 octobre 2026 ; article 4 de l'AI Act relu sur la FAQ de la Commission européenne ; Tesla relu sur la presse et le communiqué du DMV de Californie

### Non vérifié
- Le texte du règlement qui porte le calendrier modifié de l'AI Act n'a pas pu être lu sur EUR-Lex (page vide) : le site renvoie à la Commission européenne et ne cite pas de numéro de règlement
- Application de l'article 86 de l'AI Act après le report de l'annexe III, statut actuel du What-If Tool et d'AI Fairness 360, identité d'OBVIA avec l'« Observatoire des impacts de l'IA » (déduite, nom et mission confirmés sur obvia.ca)

### Reste à faire (manuel)
- Déposer le build dans la plateforme et la redéployer ; aucune émission de Radio France n'a pu être vérifiée automatiquement ; voir `SUIVI_CONTENU.md` pour les autres décisions (image inutilisée `history.jpg`, mises à jour majeures de Vite et de React Router, mention « Libre » du hub)

## [2.0.0] - 2026-09-30 - Version statique pour hylst.fr

### Ajouté
- Neuf pages de cours auparavant sans route (de 38 à 47 routes), reprises et complétées avec des sources : initiation à Python, construire son premier modèle de machine learning, NLP en Python, coder avec l'IA, utiliser l'IA au quotidien, utiliser l'IA au travail, organiser ses outils d'IA, l'IA pour le marketing et la vente, l'IA expliquée aux enfants. La page Histoire de l'IA, déjà routée, est réécrite avec des données datées. Composants communs `CourseGuideLayout`, `DoDontCard`, `RelatedLinks`
- Cours réécrits avec des sources et des dates : deep learning en pratique (PyTorch), IA et créativité, IA et environnement, et mise à jour de l'éthique, de l'IA en entreprise et du prompt engineering
- Simulateur d'entraînement qui entraîne réellement un petit réseau de neurones (descente de gradient par mini-lots, jeux de données synthétiques à graine, frontière de décision, lecture des courbes calculée sur les mesures)
- Dans le cours sur l'apprentissage supervisé : une vraie forêt aléatoire (vote de chaque arbre, précision hors échantillon, comparaison avec un arbre seul) et un vrai classifieur linéaire
- Workflow : analyse de la structure du graphe (tri topologique, nœuds isolés, boucles, chaîne longue, absence de vérification), import JSON, état conservé en changeant d'onglet
- Bandeau `SimulationNotice` sur toute illustration dont les valeurs ne sont pas calculées
- Page « L'IA expliquée aux enfants » dans le menu
- Contrôles hors build : `npm run check:links` (contrôle réel des liens externes : 404 et 410, vidéos YouTube indisponibles via l'API oEmbed, hôtes injoignables, liens déplacés ; il remplace l'ancien audit simulé) et `npm run verify:prod` (compare `dist/` à ce que sert la production, en SHA-256)

### Retiré (déplacé dans `_archive/`)

Le dossier `_archive/` (69 fichiers, 1,6 Mo) est conservé tel quel : exclu de `tsc` et d'ESLint, à ne pas importer.

- Supabase (client, fonction `deepseek-chat`, migrations) et l'assistant conversationnel DeepSeek
- Testeur d'API IA (clés des visiteurs stockées en clair dans le navigateur, appels vers des API tierces)
- Audit de liens (résultats simulés : tout lien était marqué « Vérifié ») et signalements stockés localement
- Faux détecteur ML (`@huggingface/transformers` : 21,6 Mo de WASM, modèle sans rapport avec la détection)
- Bannière cookies (aucun cookie), registre des traitements, service worker, script Lovable `gptengineer.js`
- Fausses fonctions présentées comme réelles : testeur de prompts (scores tirés au hasard, réponse type), analytics de workflow (247 exécutions, 94,7 % de succès, coût : tous inventés), exécution de workflow avec échecs aléatoires, auto-optimiseur aux économies chiffrées, comparaison d'algorithmes aux précisions prédéterminées
- Dix-huit composants et fichiers de données sans importeur, et un doublon de page sur l'environnement
- Dépendances : `@supabase/supabase-js`, `@huggingface/transformers`, `@google/generative-ai`, `react-markdown`, `@tanstack/react-query`, `lovable-tagger`
- Fiches de ressources dont le site a disparu ou changé de propriétaire (Tome, Codeium, Tabnine, France IA) ou sans équivalent vérifiable (trois spécialisations Coursera, un rapport de l'Assemblée nationale, un article de France Inter, un rapport de France Stratégie, des exemples multimodaux sur Play.ht et Ready Player Me)
- La plupart des fiches de `ExternalResources.tsx` (de 36 à 10), inventées ou mal attribuées : article HAL sans rapport avec l'IA, cours FUN MOOC aux auteurs faux, vidéos YouTube inexistantes, PDF et pages introuvables. Ce composant n'est affiché sur aucune page

### Modifié
- Renommage : « IA Explorer » devient « Explorer l'IA » (titres, logo, manifeste, mentions, paquet npm `explorer-l-ia`)
- Licence GNU AGPL v3 ou ultérieure (`AGPL-3.0-or-later`, comme la plateforme) : fichier `LICENSE`, publié sous `dist/LICENSE.txt`, lien dans le pied de page ; mentions légales et CGU réécrites (elles exigeaient un accord écrit pour toute réutilisation)
- Déploiement sous `/explorons_l_ia/` : base Vite, basename du routeur, helper `asset()` pour `public/`
- Build : une page HTML par route avec SEO propre (47 routes, dont 4 pages légales en `noindex`), `404.html`, `sitemap.xml` généré (43 URL), contrôle de cohérence routes et SEO
- Pages chargées à la demande : JS initial de 4,47 Mo à environ 300 Ko (environ 95 Ko gzip, mesuré sur le build du 01/10/2026)
- Aucune ressource tierce : police Inter et images Unsplash auto-hébergées, veille en liens directs (plus de proxy RSS)
- Pages légales réécrites (aucune collecte, hébergement Hostinger), page « Vos données locales »
- Détecteur de contenu présenté comme une démonstration, avec avertissement sur les faux positifs
- Chiffres inventés retirés (10 000 apprenants, 95 % de satisfaction, 50K prompts générés)
- Audit de contenu de tout le site : statistiques non sourcées remplacées par des ordres de grandeur ou des sources citées (étude Nature 2020 sur les mammographies, article Netflix 2015, enquête AI Impacts 2023, IDx-DR, JPMorgan COIN, UPS ORION, AI Index 2024, Patterson et al. 2021, concours ImageNet), résultats attribués à des entreprises retirés ou datés, titre « Dr. » et durées de cours fictifs supprimés, conclusions « vous maîtrisez » et promesses « résultats garantis » réécrites, perspectives datées présentées comme spéculatives
- Détecteur de contenu : scores présentés comme des indices (plus de « probabilité » ni de verdict IA / Humain), fiabilités inventées des méthodes remplacées par les limites connues, descriptions d'indicateurs nuancées
- Workflow : l'exécution devient une simulation annoncée comme telle, plus de coût, de durée ou de taux de succès affichés comme des mesures, page de fonctionnalités limitée à ce que l'outil fait
- Comparateur et calculateur : tarifs datés et signalés comme indicatifs, libellés alignés sur les données
- Graphiques du cours de machine learning : répartition des approches et progression des architectures (inventées) remplacées par des familles d'apprentissage et les résultats réels du concours ImageNet
- Mobile : débordements horizontaux corrigés sur les 47 pages à 375 et 320 px, grilles responsives avec colonne de base explicite
- Performance : animations infinies supprimées ou limitées aux éléments visibles, arêtes de workflow animées seulement pendant une simulation (CPU au repos proche de 0 %)
- ESLint : 0 erreur (types explicites à la place de `any`, blocs `case`, interfaces vides)
- Proposer une ressource et signaler un lien : par e-mail, plus de faux mot de passe administrateur
- Configuration centralisée : `src/config/site.ts`, `src/config/navigation.ts`, `src/data/seoData.ts`

### Corrigé
- Sécurité : le build contenait les clés Supabase du `.env` (objet d'environnement inliné par zustand via React Flow). `envPrefix` neutralisé, `.env` retiré de git, contrôle `scripts/verify-dist.mjs` après chaque build. Les clés présentes dans l'historique du dépôt ont été régénérées le 30/09/2026
- Une vingtaine de liens internes cassés (menu mobile, outils inexistants, cours renommés)
- Notifications radix jamais affichées (conteneur non monté)
- Boucle de rendu infinie de l'animation de la page À propos (CPU à 100 %)
- Retour en haut de page à chaque navigation, respect du réglage « réduire les animations »
- Avatar (URL LinkedIn expirée) et liens GitHub et LinkedIn de la page À propos
- Liens externes : un contrôle réseau sur 255 URL distinctes a trouvé 41 liens en 404 ou 410 et 5 vidéos YouTube indisponibles (une requête normale renvoie 200 même pour une vidéo supprimée). Les liens déplacés sont mis à jour, les documents retrouvés sont remplacés par leur adresse actuelle avec titre, éditeur et année relus sur la page (rapport CNIL de 2017, rapport de l'OPECST de mars 2017, rapport Villani, enquête de Pôle emploi de mai 2023, guide de l'ANSSI d'avril 2024...), les autres fiches sont retirées. Contrôle final : 0 lien mort sur 201 URL distinctes
- Page `/ressources` : la bannière datée d'avril 2025 (ressources « fictives », liens « pleinement fonctionnels ») est remplacée par la date de vérification des liens et la marche à suivre pour signaler un lien ; les 22 cours internes affichent 2026 au lieu de 2024 (avant la création du dépôt)
- Détecteur de contenu : l'intertitre « Verdict » devient « Lecture de l'indice » ; deux `console.log` de débogage retirés (détecteur, chargement des modèles de prompts)

---

## Janvier 2025 (version Lovable, historique)

> État de janvier 2025, dépassé depuis (voir 2.0.0 ci-dessus) : le site compte aujourd'hui 47 routes et 22 cours, Supabase et l'audit de liens ont été retirés, il n'y a ni backend ni analytics.

### ✅ Fonctionnalités Implémentées

#### Structure de l'Application
- **Architecture React/TypeScript** avec routage React Router
- **Design System** : Tailwind CSS + Shadcn UI
- **Thèmes** : Support mode sombre/clair
- **Responsive** : Interface adaptative mobile/desktop

#### Pages et Sections Principales
- **Accueil** (`/`) : Introduction et navigation
- **Les Bases** (`/les-bases`) : Concepts fondamentaux de l'IA
- **Types d'IA** (`/types-ia`) : Classification des différents types d'IA
- **Machine Learning** (`/machine-learning`) : Cours et visualisations ML
- **Deep Learning** (`/deep-learning`) : Concepts avancés
- **Cas d'Usage** (`/cas-usage`) : Applications pratiques
- **Ressources** (`/ressources`) : Centre de ressources externes
- **Cours Internes** : Modules de formation intégrés
- **Éthique** (`/ethique`) : Considérations éthiques de l'IA
- **Actualités** (`/actualites`) : Veille technologique
- **Chat IA** : Assistant conversationnel intégré

#### Système de Ressources
- **Base de données complète** : 80+ ressources catégorisées
- **Filtrage avancé** : Par type, année, sujet, langue
- **Onglets organisés** : Toutes, Cours, Publications, Outils, Vidéos
- **Miniatures YouTube** : Intégration automatique pour les vidéos
- **Système d'audit** : Vérification automatique des liens
- **Signalement utilisateur** : Interface de rapport de problèmes
- **Score qualité** : Évaluation automatique des ressources

#### Fonctionnalités Techniques
- **Service YouTube** : Extraction automatique des IDs et miniatures
- **Service d'audit** : Vérification périodique des liens (avec gestion CORS)
- **Hooks personnalisés** : `useResourceAudit`, `useTheme`, etc.
- **Composants réutilisables** : Cards, dialogs, formulaires
- **Gestion d'état** : React Query pour les données asynchrones

### 🔧 Corrections Récentes

#### Problèmes Résolus
- **Onglet Cours manquant** : Restauré dans la section ressources
- **Audit des liens défaillant** : Correction du service avec gestion CORS appropriée
- **Miniatures YouTube** : Implémentation complète avec fallback
- **Positionnement du contrôle qualité** : Déplacé en bas de page

#### Améliorations Techniques
- **Gestion d'erreurs améliorée** : Meilleure classification des erreurs réseau
- **Performance optimisée** : Réduction des requêtes avec cache intelligent
- **Interface utilisateur** : Indicateurs visuels de qualité des ressources

### 🚧 Points d'Attention et Améliorations Futures

#### Limitations Actuelles
- **CORS Limitations** : L'audit des liens côté client est limité par les politiques CORS
- **Validation de contenu** : Fonctionnalité limitée sans service backend
- **Cache local** : Stockage temporaire en mémoire seulement

#### Recommandations d'Amélioration
1. **Service Backend** : Implémenter un service serveur pour l'audit complet des liens
2. **Base de données** : Migration vers une solution persistante (Supabase configuré)
3. **Analytics** : Ajout de métriques d'utilisation
4. **PWA** : Transformation en Progressive Web App
5. **Tests** : Implémentation de tests unitaires et d'intégration

#### Structure des Fichiers
```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (Shadcn)
│   ├── resources/      # Composants spécifiques aux ressources
│   ├── courses/        # Composants des cours
│   └── ...
├── pages/              # Pages de l'application
├── services/           # Services métier
├── hooks/              # Hooks personnalisés
├── data/               # Données statiques
└── lib/                # Utilitaires
```

### 📊 Métriques de l'Application
- **Pages** : 20+ pages fonctionnelles
- **Composants** : 100+ composants React
- **Ressources** : 80+ ressources externes référencées
- **Cours internes** : 8 modules de formation
- **Langues** : Français (principal), ressources multilingues

### 🔗 Liens et Dépendances
- **React** 18.3.1 + **TypeScript**
- **Vite** pour le build
- **Tailwind CSS** + **Shadcn UI**
- **React Router** pour la navigation
- **React Query** pour la gestion d'état
- **Framer Motion** pour les animations
- **Supabase** (configuré mais non utilisé actuellement)

---

**Note** : Cette application est un projet éducatif visant à démocratiser l'accès aux connaissances en intelligence artificielle en français.
