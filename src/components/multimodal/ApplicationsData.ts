// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { 
  ImagePlus, Music, Code, Video, 
  MessagesSquare, FileText, Volume2, 
  Pencil, Palette, Braces, Sparkles, 
  Building, Users, UserSquare2
} from 'lucide-react';
import { asset } from '@/lib/paths';

export interface AppResource {
  title: string;
  url: string;
}

export interface AppExample {
  id: string;
  title: string;
  icon: string;
  iconComponent: React.ElementType;
  description: string;
  detailedDescription?: string[];
  link: string;
  imagePath: string;
  /** Texte alternatif de l'illustration (décrit la scène ; vide si l'image est décorative). */
  imageAlt?: string;
  tools: string[];
  examples: string[];
  resources?: AppResource[];
  compatibility?: {
    web: boolean;
    mobile: boolean;
    api: boolean;
    desktop: boolean;
  };
}

export const multimodalExamples: AppExample[] = [
  {
    id: "generation-images",
    title: "Génération d'images",
    description: "Création d'images à partir de descriptions textuelles avec des modèles comme Midjourney, GPT Image (ChatGPT), Gemini Image ou Stable Diffusion, pour matérialiser un concept visuel en le décrivant.",
    detailedDescription: [
      "Les modèles de génération d'images transforment des descriptions textuelles en images visuellement cohérentes, offrant un nouvel outil créatif pour les designers, artistes et professionnels du marketing.",
      "Ces technologies utilisent des modèles génératifs, le plus souvent des modèles de diffusion et parfois des modèles multimodaux autorégressifs (les réseaux antagonistes génératifs, plus anciens, sont moins utilisés pour cet usage), entraînés sur de très grandes quantités d'images pour comprendre la relation entre le langage et les représentations visuelles.",
      "La qualité des images générées dépend fortement de la précision des prompts, de leur richesse en détails techniques et stylistiques, ainsi que de la capacité du modèle à interpréter correctement ces instructions."
    ],
    icon: "ImagePlus",
    iconComponent: ImagePlus,
    link: "#generation-images",
    imagePath: asset("pics/generation-images.jpg"),
    imageAlt: "Illustration : un tableau encadré représentant un paysage stylisé (soleil orange, collines bleues, un arbre), avec une barre grise arrondie en bas à droite",
    tools: ["Midjourney", "GPT Image (ChatGPT)", "Stable Diffusion", "Gemini Image (Google)"],
    examples: [
      "Une forêt enchantée au crépuscule, avec des lanternes flottantes et des créatures magiques, style film d'animation japonais peint à la main, éclairage volumétrique",
      "Portrait d'une femme âgée, style renaissance italienne, éclairage dramatique Rembrandt, détails texturés, palette de couleurs chaudes",
      "Concept art futuriste d'une ville flottante avec des tours bioniques, architecture biomimétique, perspective aérienne, style cinématique"
    ],
    resources: [
      { title: "Guide de génération d'images (API OpenAI)", url: "https://developers.openai.com/api/docs/guides/image-generation" },
      { title: "Documentation Midjourney", url: "https://docs.midjourney.com/hc/en-us" },
      { title: "Guides Stability AI", url: "https://stability.ai/guides" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  },
  {
    id: "creation-musicale",
    title: "Création musicale",
    description: "Composition de musique assistée par IA qui permet de générer des mélodies, arrangements et accompagnements à partir de descriptions textuelles ou d'exemples sonores.",
    detailedDescription: [
      "Les outils de création musicale par IA permettent de composer des morceaux complets, des boucles ou des arrangements en spécifiant simplement le genre, l'ambiance et les instruments souhaités.",
      "Ces technologies utilisent des modèles de génération entraînés sur d'immenses corpus musicaux, capables d'identifier et reproduire les structures harmoniques, mélodiques et rythmiques propres à différents styles.",
      "Particulièrement utiles pour les créateurs de contenu, compositeurs et producteurs, ces outils peuvent servir d'inspiration, de base pour des productions professionnelles ou simplement générer des ambiances sonores personnalisées."
    ],
    icon: "Music",
    iconComponent: Music,
    link: "#creation-musicale",
    imagePath: "",
    tools: ["Suno", "Udio (téléchargement des morceaux désactivé depuis octobre 2025)", "Google Flow Music", "Stable Audio", "Mubert"],
    examples: [
      "Composition électronique ambient avec des sons d'eau, synthés relaxants, progression lente et réverbération profonde",
      "Mélodie joyeuse au piano avec progression d'accords en Do majeur, tempo modéré, inspiration classique romantique",
      "Musique orchestrale épique avec percussions puissantes, cuivres majestueux et chœur, inspiration musique de film contemporaine"
    ],
    resources: [
      { title: "Centre d'aide Suno", url: "https://help.suno.com/en" },
      { title: "Stable Audio (Stability AI)", url: "https://stableaudio.com/" },
      { title: "API Mubert", url: "https://mubert.com/api" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  },
  {
    id: "generation-code",
    title: "Génération de code",
    description: "Assistance à la programmation qui permet de générer, compléter ou optimiser du code source à partir de descriptions en langage naturel des fonctionnalités souhaitées.",
    detailedDescription: [
      "Les assistants de génération de code peuvent transformer des descriptions en langage naturel en code fonctionnel dans divers langages de programmation, ce qui peut accélérer certaines tâches\u00A0; les gains de productivité mesurés varient selon les études et les contextes. Le code généré doit être relu et testé.",
      "Au-delà de la simple génération, ces outils peuvent expliquer le code existant, suggérer des optimisations, identifier des bugs et même créer des tests automatisés.",
      "Pour des résultats optimaux, les développeurs doivent formuler des requêtes précises, incluant les contraintes techniques, les bibliothèques préférées et les modèles de conception (design patterns) à utiliser."
    ],
    icon: "Code",
    iconComponent: Code,
    link: "#generation-code",
    imagePath: asset("pics/generation-code.jpg"),
    imageAlt: "Illustration : une fenêtre d'éditeur sombre remplie de lignes de code colorées, avec une bulle portant une coche",
    tools: ["GitHub Copilot", "Kiro (AWS)", "Devin Desktop (ex-Windsurf)", "Replit Agent"],
    examples: [
      "Créer une fonction React qui valide un formulaire avec vérification d'email (regex), force du mot de passe et confirmation, avec retour visuel des erreurs",
      "Implémenter une API REST en Express.js pour gérer un système d'inventaire avec authentification JWT, validation des données et connexion MongoDB",
      "Développer une animation CSS pour un menu déroulant responsive avec transition fluide, compatible avec tous les navigateurs modernes"
    ],
    resources: [
      { title: "GitHub Copilot", url: "https://github.com/features/copilot" },
      { title: "Kiro (AWS), successeur de CodeWhisperer et Amazon Q Developer", url: "https://kiro.dev/" },
      { title: "Replit Agent", url: "https://replit.com/products/agent" }
    ],
    compatibility: {
      web: true,
      mobile: false,
      api: true,
      desktop: true
    }
  },
  {
    id: "creation-video",
    title: "Création vidéo",
    description: "Production de contenus vidéo générés ou modifiés par IA, permettant de créer des animations, effets spéciaux ou transformations à partir de texte ou d'images statiques.",
    detailedDescription: [
      "Les outils de création vidéo par IA permettent de générer des séquences animées à partir de descriptions textuelles ou d'images statiques, ouvrant de nouvelles possibilités créatives sans expertise technique.",
      "Ces technologies peuvent animer des personnages virtuels, générer des transformations entre images, créer des effets spéciaux ou même produire des clips entiers à partir de simples instructions.",
      "Particulièrement utiles pour le marketing, l'éducation et le divertissement, ces outils rendent la production vidéo plus accessible et peuvent réduire certains coûts et délais, avec des résultats qui demandent souvent une relecture et des retouches."
    ],
    icon: "Video",
    iconComponent: Video,
    link: "#creation-video",
    imagePath: "",
    tools: ["Runway", "Synthesia", "D-ID", "Pika", "Luma"],
    examples: [
      "Vidéo promotionnelle de 30 secondes présentant un smartphone avec animation 3D du produit, transitions fluides et texte explicatif des fonctionnalités",
      "Transformation d'une photo de paysage en vidéo avec mouvement de caméra cinématique, légère animation des éléments naturels et effets atmosphériques",
      "Personnage animé présentant une formation professionnelle avec synchronisation labiale parfaite, expressions faciales naturelles et gestuelle appropriée"
    ],
    resources: [
      { title: "Runway Academy (cours et tutoriels)", url: "https://academy.runwayml.com/" },
      { title: "Centre d'aide Synthesia", url: "https://help.synthesia.io/en/" },
      { title: "Documentation de l'API D-ID", url: "https://docs.d-id.com/reference/get-started" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  },
  {
    id: "conversation-multimodale",
    title: "Conversation multimodale",
    description: "Dialogues avec des systèmes d'IA capables d'intégrer et analyser simultanément du texte, des images et d'autres types de médias dans la même conversation.",
    detailedDescription: [
      "Les systèmes de conversation multimodale représentent une évolution majeure de l'IA conversationnelle, capables d'analyser et répondre à des contenus combinant texte, images, audio et parfois vidéo.",
      "Ces technologies permettent des interactions plus naturelles et complètes, comme demander des explications sur une image, identifier des éléments visuels ou comprendre des concepts présentés graphiquement.",
      "Les applications sont nombreuses\u00A0: analyse de documents, aide au diagnostic médical, assistance technique avec photos, éducation interactive ou encore services client avancés."
    ],
    icon: "MessagesSquare",
    iconComponent: MessagesSquare,
    link: "#conversation-multimodale",
    imagePath: "",
    tools: ["ChatGPT (OpenAI)", "Claude (Anthropic)", "Gemini (Google)", "Mistral Vibe"],
    examples: [
      "Analyse détaillée d'un graphique financier avec identification des tendances principales, anomalies statistiques et recommandations basées sur les données visibles",
      "Explication d'un schéma technique complexe avec annotations sur l'image originale pour identifier chaque composant et clarifier son fonctionnement",
      "Identification des plats dans une photo de repas avec estimation des ingrédients, valeurs nutritionnelles approximatives et suggestions de recettes similaires"
    ],
    resources: [
      { title: "Documentation OpenAI\u00A0: images et vision", url: "https://developers.openai.com/api/docs/guides/images-vision" },
      { title: "Présentation de Claude (documentation officielle)", url: "https://platform.claude.com/docs/en/intro" },
      { title: "Documentation Gemini API\u00A0: compréhension d'images", url: "https://aistudio.google.com/docs/image-understanding" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  },
  {
    id: "redaction-assistee",
    title: "Rédaction assistée",
    description: "Outils d'aide à l'écriture qui suggèrent, complètent ou rédigent intégralement des textes adaptés à différents contextes et formats, du courriel professionnel à l'article spécialisé.",
    detailedDescription: [
      "Les assistants de rédaction IA peuvent générer, reformuler ou améliorer des textes dans différents styles et formats, aidant les utilisateurs à produire plus rapidement des brouillons, à relire et corriger ensuite.",
      "Ces outils vont au-delà de la simple correction grammaticale, en offrant des suggestions stylistiques, des alternatives lexicales et même des structures argumentatives complètes.",
      "Pour obtenir les meilleurs résultats, il est essentiel de bien spécifier l'audience cible, le ton souhaité, le niveau de formalité et les contraintes spécifiques au type de document."
    ],
    icon: "FileText",
    iconComponent: FileText,
    link: "#redaction-assistee",
    imagePath: asset("pics/redaction-assistee.jpg"),
    imageAlt: "Illustration : une feuille couverte de lignes de texte, un crayon et deux bulles portant une coche",
    tools: ["ChatGPT", "Claude", "Mistral Vibe", "Notion AI", "Writer"],
    examples: [
      "Rédaction d'un article de blog technique sur l'IA explicable pour un public non-technique, style accessible, ton pédagogique, avec analogies concrètes",
      "Email professionnel pour proposer un partenariat stratégique à une entreprise du secteur financier, ton formel mais engageant, structure claire avec proposition de valeur",
      "Résumé concis d'un rapport de recherche scientifique de 20 pages sur les avancées en apprentissage par renforcement, en conservant les points clés et données essentielles"
    ],
    resources: [
      { title: "Guide Notion AI\u00A0: rédiger des notes et des documents", url: "https://www.notion.com/help/guides/notion-ai-for-docs" },
      { title: "Centre de ressources Jasper", url: "https://www.jasper.ai/resources" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  },
  {
    id: "synthese-vocale",
    title: "Synthèse vocale",
    description: "Conversion de texte en parole naturelle avec contrôle sur les voix, intonations et émotions, permettant de créer des narrations, dialogues ou messages personnalisés.",
    detailedDescription: [
      "Les technologies modernes de synthèse vocale permettent de convertir du texte en parole d'une qualité qui peut sembler très naturelle, avec contrôle précis sur l'intonation, le rythme et les émotions.",
      "Contrairement aux voix robotiques d'autrefois, ces outils peuvent créer des narrations expressives, des dialogues naturels pour différents personnages et même imiter des accents ou styles vocaux spécifiques.",
      "Les applications sont vastes\u00A0: livres audio, contenu accessible, voix off pour vidéos, assistants virtuels personnalisés, ou systèmes de communication automatisés avec une touche humaine. Reproduire la voix d'une personne sans son accord pose un problème juridique\u00A0: en France, publier un contenu généré par IA qui reprend sa voix ou son image sans consentement, sans indiquer qu'il est artificiel, est puni par l'article 226-8 du code pénal."
    ],
    icon: "Volume2",
    iconComponent: Volume2,
    link: "#synthese-vocale",
    imagePath: asset("pics/synthese-vocale.jpg"),
    imageAlt: "Illustration : un micro, une onde sonore et un haut-parleur, avec une bulle de dialogue",
    tools: ["ElevenLabs", "WellSaid", "Murf", "Inworld TTS", "Piper (open source, local)"],
    examples: [
      "Narration émotionnelle pour un documentaire sur la conservation marine, voix masculine grave, ton inspirant avec variations dynamiques pour souligner les enjeux",
      "Message d'accueil professionnel pour un standard téléphonique d'entreprise, voix féminine claire et chaleureuse, diction parfaite, rythme mesuré",
      "Livre audio avec différentes voix pour chaque personnage, incluant accents distinctifs et variations émotionnelles suivant l'évolution de l'intrigue"
    ],
    resources: [
      { title: "Documentation ElevenLabs", url: "https://elevenlabs.io/docs/overview/intro" },
      { title: "Inworld\u00A0: modèles de synthèse vocale", url: "https://docs.inworld.ai/tts/tts-models" },
      { title: "Piper, synthèse vocale locale (dépôt GitHub repris par l'Open Home Foundation)", url: "https://github.com/OHF-Voice/piper1-gpl" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  },
  {
    id: "design-graphique",
    title: "Design graphique",
    description: "Création assistée par IA de designs, logos, maquettes et éléments visuels à partir de descriptions textuelles ou de références, avec possibilité d'ajustements itératifs.",
    detailedDescription: [
      "Les outils de design graphique par IA permettent de créer rapidement des ébauches d'éléments visuels sans compétences poussées en design, en transformant des idées textuelles en créations visuelles\u00A0; un résultat soigné demande généralement des retouches.",
      "Ces technologies peuvent générer des logos, des maquettes de sites web, des illustrations, des modèles de présentation et divers éléments graphiques adaptés à différentes plateformes.",
      "Particulièrement utiles pour les entrepreneurs, startups et créateurs de contenu, ces outils peuvent accélérer les premières étapes du processus de design et réduire certains coûts."
    ],
    icon: "Palette",
    iconComponent: Palette,
    link: "#design-graphique",
    imagePath: asset("pics/astronaute-jungle.jpg"),
    imageAlt: "Illustration\u00A0: un astronaute marche sur un sentier dans une jungle luminescente aux teintes bleu-vert, entre des champignons géants, sous la pleine lune",
    tools: ["Canva", "Adobe Firefly", "Google Stitch (ex-Galileo AI)", "Designs.ai", "Brandmark"],
    examples: [
      "Logo minimaliste pour une startup technologique dans le domaine de la santé, couleurs bleu-vert, symbole abstrait évoquant la croissance et le bien-être",
      "Affiche promotionnelle pour un festival de musique style rétro années 80, typographie néon, palette vaporwave, imagerie synthwave avec éléments géométriques",
      "Modèle de présentation professionnelle avec palette de couleurs corporate, mise en page aérée, visualisations de données élégantes et typographie sobre"
    ],
    resources: [
      { title: "Canva\u00A0: ressources d'apprentissage", url: "https://www.canva.com/learn/" },
      { title: "Adobe Firefly", url: "https://firefly.adobe.com/" },
      { title: "Google Stitch", url: "https://stitch.withgoogle.com/" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: false,
      desktop: true
    }
  },
  {
    id: "edition-contenu",
    title: "Édition de contenu",
    description: "Amélioration et correction de textes existants pour optimiser leur clarté, style, ton et impact, avec adaptations possibles pour différents publics ou formats.",
    detailedDescription: [
      "Les outils d'édition de contenu par IA vont bien au-delà de la simple correction grammaticale en transformant des textes bruts en communications efficaces et engageantes.",
      "Ces technologies peuvent ajuster le niveau de langage, simplifier des concepts complexes, renforcer l'impact émotionnel d'un texte, ou adapter le contenu à différentes audiences.",
      "Utiles pour les professionnels de la communication, rédacteurs et universitaires, ces outils peuvent accélérer le processus d'édition\u00A0; leurs suggestions doivent être relues, car elles peuvent altérer le sens ou le ton voulu."
    ],
    icon: "Pencil",
    iconComponent: Pencil,
    link: "#edition-contenu",
    imagePath: "",
    tools: ["Grammarly", "DeepL Write", "Hemingway App", "ProWritingAid", "QuillBot"],
    examples: [
      "Amélioration stylistique d'un essai académique pour publication, renforcement de la clarté argumentative, élimination des répétitions et optimisation des transitions",
      "Simplification d'un texte technique sur l'intelligence artificielle pour un public non-spécialiste, avec analogies accessibles et définitions des termes complexes",
      "Correction et reformulation d'une traduction automatique brute d'un document juridique, avec adaptation aux conventions linguistiques et terminologiques du domaine"
    ],
    resources: [
      { title: "Blog Grammarly", url: "https://www.grammarly.com/blog" },
      { title: "DeepL Write (page du produit)", url: "https://www.deepl.com/write" },
      { title: "Blog ProWritingAid", url: "https://prowritingaid.com/blog" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  },
  {
    id: "automatisation-taches",
    title: "Automatisation de tâches",
    description: "Intégration d'IA dans les workflows pour automatiser des processus répétitifs, analyser des données et déclencher des actions basées sur des conditions prédéfinies.",
    detailedDescription: [
      "Les plateformes d'automatisation intelligente permettent de créer des workflows complexes où l'IA intervient pour analyser, décider et agir sans intervention humaine constante.",
      "Ces outils peuvent automatiser le traitement des emails, la catégorisation de documents, l'analyse de données, la génération de rapports ou encore l'extraction d'informations structurées.",
      "En combinant l'IA avec des connecteurs vers différentes applications professionnelles, ces plateformes peuvent alléger des tâches répétitives, à condition de superviser les résultats\u00A0: l'IA introduit aussi ses propres erreurs."
    ],
    icon: "Braces",
    iconComponent: Braces,
    link: "#automatisation-taches",
    imagePath: asset("pics/automatisation-taches.jpg"),
    imageAlt: "Illustration : trois pastilles reliées par des flèches (une enveloppe, un document, une cloche), avec un engrenage au-dessus",
    tools: ["Zapier", "Make", "n8n", "IFTTT"],
    examples: [
      "Automatisation du traitement des demandes clients avec analyse de sentiment, extraction des informations clés et classement par priorité avec réponse automatique pour les cas simples",
      "Système de classification automatique des emails entrants par département, urgence et type de demande, avec transfert intelligent et notification personnalisée",
      "Workflow d'approbation de documents avec extraction automatique des termes clés, comparaison avec les standards de l'entreprise et mise en évidence des points d'attention"
    ],
    resources: [
      { title: "Outils d'IA de Zapier", url: "https://zapier.com/blog/zapier-ai-guide/" },
      { title: "Centre d'aide Make", url: "https://www.make.com/en/help" },
      { title: "Documentation n8n", url: "https://docs.n8n.io/" }
    ],
    compatibility: {
      web: true,
      mobile: false,
      api: true,
      desktop: true
    }
  },
  {
    id: "marketing-ia",
    title: "Marketing IA",
    description: "Application de l'intelligence artificielle aux stratégies marketing pour personnaliser les contenus, optimiser les campagnes et analyser les comportements des consommateurs.",
    detailedDescription: [
      "Le marketing IA utilise l'intelligence artificielle pour créer et optimiser des campagnes marketing personnalisées à partir de données comportementales, dans le respect du RGPD (information des personnes, base légale, consentement lorsqu'il est requis).",
      "Ces technologies peuvent générer du contenu marketing adapté à différentes audiences, optimiser le timing et le ciblage des communications, et prédire l'efficacité de différentes approches.",
      "En automatisant l'analyse des tendances et le test des messages, ces outils permettent aux marketeurs de déployer des stratégies plus agiles et mieux adaptées aux préférences individuelles."
    ],
    icon: "Building",
    iconComponent: Building,
    link: "#marketing-ia",
    imagePath: asset("pics/marketing-ia.jpg"),
    imageAlt: "Illustration : un document entouré de deux mégaphones et de deux bulles de dialogue",
    tools: ["Copy.ai (racheté par Fullcast en octobre 2025)", "Persado", "MarketMuse", "Jacquard (ex-Phrasee)", "Albert"],
    examples: [
      "Génération de slogans accrocheurs pour une campagne de produits éco-responsables, ton inspirant, focus sur l'impact positif et l'engagement communautaire",
      "Création de contenu personnalisé pour email marketing avec tests A/B automatisés, segmentation avancée et optimisation du taux de conversion basée sur l'historique",
      "Optimisation SEO de textes avec suggestions de mots-clés pertinents, restructuration pour améliorer la lisibilité et adaptation aux intentions de recherche identifiées"
    ],
    resources: [
      { title: "Blog Copy.ai", url: "https://www.copy.ai/blog" },
      { title: "Études de cas Persado (résultats communiqués par l'éditeur)", url: "https://www.persado.com/resource-library/case-studies" },
      { title: "Centre d'aide MarketMuse", url: "https://help.marketmuse.com/support/home" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  },
  {
    id: "education-formation",
    title: "Éducation & Formation",
    description: "Utilisation de l'IA pour créer des expériences d'apprentissage personnalisées, des contenus pédagogiques adaptatifs et des outils d'évaluation intelligents.",
    detailedDescription: [
      "Les technologies d'IA éducative proposent des parcours personnalisés qui s'adaptent au rythme, aux préférences et aux difficultés spécifiques de chaque apprenant.",
      "Ces outils peuvent créer des exercices ciblés, générer des explications adaptées à différents niveaux de compréhension et fournir des retours détaillés pour aider à progresser efficacement.",
      "Particulièrement utiles dans l'apprentissage des langues, des sciences et des mathématiques, ces systèmes peuvent aider à repérer des lacunes et proposer des exercices ciblés, sous le regard de l'enseignant."
    ],
    icon: "Users",
    iconComponent: Users,
    link: "#education-formation",
    imagePath: asset("pics/salle-de-classe.jpg"),
    imageAlt: "Illustration : une salle de classe vide, avec un tableau portant une ampoule, une estrade et des pupitres",
    tools: ["Khanmigo", "Duolingo", "Quizlet", "Coursera Coach"],
    examples: [
      "Module d'apprentissage interactif sur la chimie organique avec visualisations 3D des molécules, explications adaptatives et exercices progressifs basés sur la maîtrise des concepts",
      "Exercices personnalisés de mathématiques qui identifient automatiquement les erreurs de raisonnement et proposent des exemples supplémentaires ciblant précisément les difficultés",
      "Simulation de dialogue pour l'apprentissage des langues avec reconnaissance de la prononciation, adaptation au niveau de l'apprenant et scénarios contextuels progressifs"
    ],
    resources: [
      { title: "Khanmigo (Khan Academy)", url: "https://khanmigo.ai/" },
      { title: "Quizlet pour les enseignants", url: "https://quizlet.com/teachers" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: false,
      desktop: true
    }
  },
  {
    id: "avatars-digitaux",
    title: "Avatars digitaux",
    description: "Création de représentations virtuelles interactives capables de simuler des conversations naturelles, des expressions faciales et des comportements humains.",
    detailedDescription: [
      "Les avatars digitaux représentent la convergence de plusieurs technologies d'IA\u00A0: génération d'images, synthèse vocale, animation faciale et traitement du langage naturel.",
      "Ces représentations virtuelles peuvent interagir en temps réel avec les utilisateurs, afficher des expressions émotionnelles appropriées et personnaliser leur comportement selon le contexte.",
      "Importants dans la formation, le service client, les présentations virtuelles et le divertissement, ces avatars permettent des interactions plus engageantes qu'un simple texte. Représenter une personne réelle (visage, voix) sans son accord peut engager la responsabilité de l'auteur, et il est recommandé d'indiquer qu'il s'agit d'un contenu généré par IA."
    ],
    icon: "UserSquare2",
    iconComponent: UserSquare2,
    link: "#avatars-digitaux",
    imagePath: asset("pics/double-numerique.jpg"),
    imageAlt: "Illustration : deux silhouettes face à face, l'une bleu foncé, l'autre turquoise et facettée, reliées par un trait",
    tools: ["Avaturn", "HeyGen", "Convai", "Synthesia", "Inworld AI"],
    examples: [
      "Avatar réaliste pour présentateur virtuel d'événements professionnels, capable de présenter du contenu technique, répondre aux questions et maintenir l'engagement de l'audience",
      "Personnage animé pour formation médicale avec expressions faciales réalistes, capacité à démontrer des procédures et à répondre à des questions spécifiques au domaine",
      "Assistant virtuel personnalisé pour service client, avec personnalité adaptée à la marque, capacité à reconnaître les émotions du client et à résoudre efficacement les problèmes courants"
    ],
    resources: [
      { title: "Avaturn\u00A0: avatar 3D à partir d'un selfie", url: "https://avaturn.me/" },
      { title: "Convai", url: "https://convai.com/" },
      { title: "Synthesia Academy (cours en ligne)", url: "https://academy.synthesia.io/" }
    ],
    compatibility: {
      web: true,
      mobile: true,
      api: true,
      desktop: true
    }
  }
];
