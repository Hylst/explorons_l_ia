// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Métadonnées SEO de toutes les routes : source unique.
// Lu à l'exécution (useDocumentMeta) ET au build (vite.config.ts génère une page
// HTML par route + sitemap.xml). Imports relatifs uniquement, pas d'alias "@/".
// Le build échoue si une route de src/App.tsx n'a pas d'entrée ici (et inversement).

import { SITE_NAME, SITE_TAGLINE, DEFAULT_OG_IMAGE, SITE_URL, absoluteUrl } from '../config/site.ts';
import { TOOLS } from '../config/tools.ts';
import { DEEP_COURSES, deepCoursePath } from '../content/cours-approfondis/registry.ts';

export interface PageSEO {
  title: string;
  description: string;
  /** Chemin d'image dans public/ (ex. "pics/ia_levels.jpg"). */
  image?: string;
  /** Exclure du sitemap et des moteurs (pages légales, utilitaires). */
  noindex?: boolean;
  /** Priorité sitemap (0.1 à 1.0). */
  priority?: number;
}

export const pageSEO: Record<string, PageSEO> = {
  '/': {
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: "Site pédagogique francophone pour comprendre l'intelligence artificielle\u00A0: bases, types d'IA, machine learning, cours interactifs, outils et éthique.",
    priority: 1.0,
  },

  // Fondamentaux
  '/les-bases': {
    title: "Les bases de l'IA",
    description: "Les concepts fondamentaux de l'intelligence artificielle expliqués simplement, avec analogies et exemples concrets.",
    priority: 0.9,
  },
  '/types-ia': {
    title: "Les types d'IA\u00A0: LLM, RAG, CNN, NLP",
    description: "Panorama des grandes familles d'IA\u00A0: modèles de langage, RAG, réseaux convolutifs, NLP, IA explicable et AGI.",
    priority: 0.9,
  },
  '/types-ia/llm': {
    title: 'Les modèles de langage (LLM)',
    description: 'Architecture, entraînement, RLHF et usages des grands modèles de langage, expliqués pas à pas.',
    priority: 0.8,
  },
  '/niveaux-ia': {
    title: "Les 7 niveaux d'intelligence artificielle",
    description: "De l'IA réactive à la superintelligence\u00A0: une taxonomie pour situer les systèmes d'IA actuels et futurs.",
    image: 'pics/ia_levels.jpg',
    priority: 0.9,
  },
  '/machine-learning': {
    title: 'Machine learning',
    description: "Apprentissage supervisé, non supervisé et par renforcement\u00A0: principes, algorithmes et visualisations interactives.",
    priority: 0.9,
  },
  '/deep-learning': {
    title: 'Deep Learning\u00A0: les bases',
    description: "Introduction au deep learning\u00A0: neurone artificiel, réseaux denses et réseaux convolutifs, avec du code Keras commenté.",
    priority: 0.8,
  },
  '/ia-multimodale': {
    title: 'IA et création multimodale',
    description: "Texte, image, son, vidéo\u00A0: comment l'IA générative transforme la création, avec exemples de prompts et workflows.",
    priority: 0.8,
  },
  '/ia-expliquee-aux-enfants': {
    title: "L'IA expliquée aux enfants",
    description: "Comprendre l'IA dès 12 ans\u00A0: comment elle fonctionne, ses limites et les bons réflexes pour l'utiliser en sécurité.",
    priority: 0.6,
  },

  // Applications et culture
  '/cas-usage': {
    title: "Cas d'usage de l'IA",
    description: "Applications concrètes de l'intelligence artificielle par secteur\u00A0: santé, industrie, éducation, juridique, agriculture.",
    image: 'pics/cas-usage.jpg',
    priority: 0.8,
  },
  '/histoire': {
    title: "Histoire de l'intelligence artificielle",
    description: "Les moments clés, les pionniers et les ruptures qui ont façonné l'IA, des années 1940 à 2024.",
    image: 'pics/frise-histoire-ia.jpg',
    priority: 0.7,
  },
  '/ethique': {
    title: "Éthique de l'IA",
    description: "Transparence, équité, vie privée, responsabilité\u00A0: les enjeux éthiques et sociétaux de l'intelligence artificielle.",
    image: 'pics/ethique-mains-coeur.jpg',
    priority: 0.8,
  },
  '/ethique-gouvernance': {
    title: "Éthique et gouvernance de l'IA",
    description: "Régulations, biais, transparence et bonnes pratiques de gouvernance des systèmes d'IA.",
    priority: 0.7,
  },
  '/glossaire': {
    title: "Glossaire de l'IA",
    description: "Définitions claires du vocabulaire technique et éthique de l'intelligence artificielle.",
    priority: 0.7,
  },
  '/ressources': {
    title: "Ressources pour apprendre l'IA",
    description: "Sélection de cours, vidéos, livres, publications et outils pour approfondir l'intelligence artificielle, avec un guide pour passer à l'action.",
    priority: 0.8,
  },
  '/actualites': {
    title: "Sources de veille sur l'IA",
    description: "Une sélection de médias, d'instituts de recherche et d'institutions, surtout francophones, pour suivre l'actualité de l'intelligence artificielle.",
    image: 'pics/veille-carnet.jpg',
    priority: 0.5,
  },
  '/about': {
    title: 'À propos',
    description: "La démarche d'Explorons l'IA\u00A0: rendre l'intelligence artificielle accessible et compréhensible pour tous.",
    priority: 0.4,
  },

  // Cours
  '/cours/apprentissage-supervise': {
    title: "Cours\u00A0: l'apprentissage supervisé",
    description: "Comprendre et pratiquer l'apprentissage supervisé\u00A0: régression, classification, arbres de décision, évaluation.",
    priority: 0.8,
  },
  '/cours/apprentissage-non-supervise': {
    title: "Cours\u00A0: l'apprentissage non supervisé",
    description: "Clustering, réduction de dimension, règles d'association\u00A0: repérer des groupes et des associations sans étiquettes.",
    priority: 0.8,
  },
  '/cours/bases-mathematiques-ia': {
    title: "Cours\u00A0: les bases mathématiques de l'IA",
    description: "Algèbre linéaire, calcul différentiel, probabilités et optimisation\u00A0: les maths de l'IA expliquées simplement.",
    priority: 0.8,
  },
  '/cours/prompt-engineering': {
    title: 'Cours\u00A0: le prompt engineering',
    description: "Techniques de rédaction de prompts pour les modèles de langage, avec des exemples et des repères pour comparer ses essais.",
    priority: 0.8,
  },
  '/cours/chain-of-prompts': {
    title: 'Cours\u00A0: le chaînage de prompts',
    description: "Construire des enchaînements de prompts pour obtenir des résultats à vérifier à chaque étape avec l'IA.",
    priority: 0.7,
  },
  '/cours/parametres-llm': {
    title: 'Cours\u00A0: les paramètres des LLM',
    description: "Architecture, taille, température, top-p\u00A0: comprendre et régler les paramètres des modèles de langage.",
    priority: 0.7,
  },
  '/cours/ia-creativite': {
    title: 'Cours\u00A0: IA et créativité',
    description: "Utiliser l'IA générative dans un processus créatif\u00A0: écriture et image, avec des repères sur les droits et la transparence.",
    priority: 0.7,
  },
  '/cours/deep-learning-pratique': {
    title: 'Cours\u00A0: le deep learning en pratique',
    description: "Construire, entraîner, évaluer et servir des réseaux de neurones avec PyTorch, étape par étape.",
    priority: 0.7,
  },
  '/cours/ia-ethique': {
    title: "Cours\u00A0: l'éthique de l'IA",
    description: "Principes éthiques, AI Act européen et mise en pratique d'une IA responsable.",
    priority: 0.7,
  },
  '/cours/ia-entreprise': {
    title: "Cours\u00A0: l'IA en entreprise",
    description: "Stratégie, cas d'usage, conduite du changement et retour sur investissement de l'IA en entreprise.",
    priority: 0.7,
  },
  '/cours/nlp-comprehension': {
    title: 'Cours\u00A0: NLP et compréhension du langage',
    description: "Du traitement automatique du langage aux transformers\u00A0: comment les machines traitent et génèrent le texte.",
    priority: 0.7,
  },
  '/cours/ia-environnement': {
    title: "Cours\u00A0: IA et environnement",
    description: "L'empreinte environnementale du numérique et de l'IA, et les leviers pour une IA plus sobre.",
    priority: 0.7,
  },
  '/cours-approfondis': {
    title: 'Cours approfondis',
    description: "Des cours longs sur des sujets précis de l'IA (RAG, grokking, agents, GPU, fine-tuning...), chacun inspiré d'une vidéo citée, réécrit et complété\u00A0: contexte, analogies, schémas pas à pas, code et quiz.",
    priority: 0.8,
  },
  '/cours/python-ia': {
    title: "Cours\u00A0: initiation à Python pour l'IA",
    description: "Les bases de Python, NumPy, pandas, Matplotlib et scikit-learn, avec des exemples de code et un mini-projet complet.",
    priority: 0.7,
  },
  '/cours/premier-modele-ml': {
    title: 'Cours\u00A0: construire son premier modèle de machine learning',
    description: "Un projet complet avec scikit-learn\u00A0: exploration, préparation des données, comparaison de modèles, réglages et déploiement.",
    priority: 0.7,
  },
  '/cours/nlp-concepts': {
    title: 'Cours\u00A0: le NLP en Python, concepts et outils',
    description: "Prétraitement, embeddings, transformers, classification, génération et questions-réponses, avec du code Python.",
    priority: 0.7,
  },
  '/cours/coder-avec-ia': {
    title: "Cours\u00A0: coder une application avec l'IA",
    description: "Assistants de code, intégration d'IA dans une application, no code, workflows avancés et risques du code généré.",
    priority: 0.7,
  },
  '/cours/utiliser-ia-quotidien': {
    title: "Cours\u00A0: utiliser l'IA au quotidien",
    description: "Reconnaître l'IA autour de soi, bien s'en servir et protéger sa vie privée.",
    priority: 0.6,
  },
  '/cours/utiliser-ia-travail': {
    title: "Cours\u00A0: utiliser l'IA au travail",
    description: "Choisir les bons usages, protéger les données, connaître le cadre légal et mesurer ce que l'IA apporte.",
    priority: 0.6,
  },
  '/cours/organiser-services-ia': {
    title: "Cours\u00A0: organiser ses outils d'IA",
    description: "Classer, documenter et sécuriser les services d'IA que l'on utilise, avec des modèles prêts à l'emploi.",
    priority: 0.5,
  },
  '/cours/ia-marketing-vente': {
    title: "Cours\u00A0: l'IA pour le marketing et la vente",
    description: "Personnalisation, analyse prédictive, automatisation et chatbots\u00A0: usages, indicateurs et points de vigilance.",
    priority: 0.6,
  },

  // Outils (100 % dans le navigateur)
  '/calculateur-couts-ia': {
    title: TOOLS.costCalculator.name,
    description: "Estimer le coût d'usage des API de modèles d'IA selon le volume de tokens. Tarifs indicatifs à vérifier auprès des fournisseurs.",
    priority: 0.7,
  },
  '/generateur-prompts': {
    title: TOOLS.promptGenerator.name,
    description: "Modèles de prompts prêts à personnaliser pour la rédaction, le code, l'image, la recherche et plus encore.",
    priority: 0.7,
  },
  '/simulateur-ia': {
    title: TOOLS.trainingSimulator.name,
    description: "Entraînez un petit réseau de neurones dans votre navigateur, sur quatre jeux de données, et observez l'effet du taux d'apprentissage, de la taille de lot, de la régularisation et de l'arrêt précoce.",
    priority: 0.7,
  },
  '/detecteur-contenu-ia': {
    title: `${TOOLS.contentDetector.name} (démonstration)`,
    description: "Démonstration pédagogique d'heuristiques de détection de contenu généré par IA, et de leurs limites. Ne permet pas de conclure sur l'origine d'un contenu.",
    priority: 0.6,
  },
  '/optimiseur-workflow-ia': {
    title: TOOLS.workflowOptimizer.name,
    description: "Concevoir visuellement une chaîne de traitement IA, simuler son exécution et repérer des points d'amélioration dans sa structure.",
    priority: 0.6,
  },
  '/comparateur-modeles-ia': {
    title: TOOLS.modelComparator.name,
    description: "Comparer prix indicatifs, contexte et capacités déclarées de modèles d'IA, puis les noter sur vos propres exemples avec une grille de test enregistrée dans votre navigateur.",
    priority: 0.7,
  },
  '/analyseur-donnees': {
    title: TOOLS.datasetAnalyzer.name,
    description: "Repérer dans un fichier CSV les valeurs manquantes, doublons, valeurs atypiques, classes déséquilibrées et indices de fuite de données, sans envoyer le fichier.",
    priority: 0.6,
  },
  '/generateur-donnees': {
    title: TOOLS.syntheticDataGenerator.name,
    description: "Créer un tableau de données fictives, reproductible grâce à une graine, pour s'exercer à l'analyse et à l'apprentissage automatique.",
    priority: 0.6,
  },
  '/auditeur-biais': {
    title: TOOLS.biasAuditor.name,
    description: "Comparer groupe par groupe les erreurs d'un classifieur (parité, égalité des chances, faux positifs) et comprendre les limites de chaque critère d'équité.",
    priority: 0.6,
  },

  // Légal
  '/mentions-legales': {
    title: 'Mentions légales',
    description: "Éditeur, hébergement, licence AGPL-3.0 et propriété intellectuelle du site Explorons l'IA.",
    noindex: true,
  },
  '/confidentialite': {
    title: 'Confidentialité',
    description: "Explorons l'IA ne dépose ni cookie ni traceur et ne demande aucun compte\u00A0; le serveur conserve douze mois au plus de journaux techniques.",
    noindex: true,
  },
  '/cgu': {
    title: "Conditions d'utilisation",
    description: "Conditions d'utilisation du site pédagogique Explorons l'IA.",
    noindex: true,
  },
  '/gestion-donnees-rgpd': {
    title: 'Vos données locales',
    description: "Consulter, exporter ou effacer les préférences enregistrées par Explorons l'IA dans votre navigateur.",
    noindex: true,
  },
};

// Cours approfondis : une entrée par cours du registre (titre et description tenus au même endroit).
for (const course of DEEP_COURSES) {
  pageSEO[deepCoursePath(course.slug)] = { title: `Cours\u00A0: ${course.title}`, description: course.description, priority: 0.7 };
}

export interface ResolvedSEO {
  title: string;
  description: string;
  /** URL canonique absolue, vide pour une page inconnue. */
  canonical: string;
  image: string;
  noindex: boolean;
}

const NOT_FOUND: PageSEO = {
  title: 'Page introuvable',
  description: "Cette page n'existe pas ou a été déplacée.",
  noindex: true,
};

/** Normalise un chemin de route ("/cours/x/" -> "/cours/x"). */
export const normalizePath = (pathname: string) => {
  const p = pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
};

export const getSEOData = (pathname: string): ResolvedSEO => {
  const path = normalizePath(pathname);
  const entry = pageSEO[path];
  const page = entry ?? NOT_FOUND;
  return {
    title: path === '/' && entry ? page.title : `${page.title} | ${SITE_NAME}`,
    description: page.description,
    // Page inconnue : pas de canonical (noindex).
    canonical: entry ? (path === '/' ? SITE_URL : absoluteUrl(path)) : '',
    image: page.image ? `${SITE_URL}${page.image}` : DEFAULT_OG_IMAGE,
    noindex: !entry || !!page.noindex,
  };
};
