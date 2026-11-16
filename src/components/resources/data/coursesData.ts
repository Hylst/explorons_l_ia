// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Resource } from '../resourcesData';
import { DEEP_COURSES, deepCoursePath } from '../../../content/cours-approfondis/registry';

export const courses: Resource[] = [
  // Cours internes (développés dans l'app)
  {
    title: "Les bases de l'apprentissage supervisé\u00A0: guide pratique et interactif",
    source: "Explorons l'IA",
    description: "Les fondamentaux de l'apprentissage supervisé avec des exemples concrets, des analogies simples et des démonstrations interactives. Accessible aux débutants en machine learning.",
    link: "/cours/apprentissage-supervise",
    type: "cours",
    year: 2026,
    tags: ["Apprentissage Supervisé", "Machine Learning", "Débutant", "Interactif", "Interne"],
    isInternal: true
  },
  {
    title: "Apprentissage non supervisé\u00A0: explorer des groupes et des tendances",
    source: "Explorons l'IA",
    description: "Explorez les techniques d'apprentissage non supervisé\u00A0: clustering, réduction de dimensionnalité et règles d'association. Repérez des groupes, des axes de variation et des associations dans vos données, sans exemples étiquetés.",
    link: "/cours/apprentissage-non-supervise",
    type: "cours",
    year: 2026,
    tags: ["Apprentissage Non Supervisé", "Clustering", "Machine Learning", "Analyse de Données", "Interne"],
    isInternal: true
  },
  {
    title: "Les bases mathématiques derrière l'intelligence artificielle",
    source: "Explorons l'IA",
    description: "Guide accessible pour comprendre les fondements mathématiques de l'IA\u00A0: algèbre linéaire, calcul différentiel, probabilités et statistiques, avec des exemples concrets et des visualisations.",
    link: "/cours/bases-mathematiques-ia",
    type: "cours",
    year: 2026,
    tags: ["Mathématiques", "Algèbre Linéaire", "Probabilités", "Statistiques", "Fondamentaux", "Interne"],
    isInternal: true
  },
  {
    title: "Prompt engineering\u00A0: techniques et bonnes pratiques",
    source: "Explorons l'IA",
    description: "Structurer un prompt, donner des exemples, demander un raisonnement, vérifier les réponses\u00A0: les techniques courantes et leurs limites.",
    link: "/cours/prompt-engineering",
    type: "cours",
    year: 2026,
    tags: ["Prompt Engineering", "Communication IA", "Pratique", "Interne"],
    isInternal: true
  },
  {
    title: "Chain of Prompts\u00A0: enchaîner les requêtes pas à pas",
    source: "Explorons l'IA",
    description: "Décomposer un problème complexe en requêtes successives, en vérifiant chaque étape, avec des exemples de chaînes pour l'analyse, le code et la rédaction.",
    link: "/cours/chain-of-prompts",
    type: "cours",
    year: 2026,
    tags: ["Chain of Prompts", "Conversation IA", "Technique avancée", "Productivité", "Interne"],
    isInternal: true
  },
  {
    title: "Paramètres des LLM\u00A0: comprendre et optimiser les modèles de langage",
    source: "Explorons l'IA",
    description: "Les principaux paramètres qui caractérisent un LLM\u00A0: architecture, hyperparamètres, optimisations et métriques, pour choisir et régler un modèle selon ses besoins.",
    link: "/cours/parametres-llm",
    type: "cours",
    year: 2026,
    tags: ["LLM", "Paramètres", "Architecture", "Optimisation", "Technique", "Interne"],
    isInternal: true
  },
  {
    title: "IA et créativité\u00A0: intégrer l'IA générative à un processus créatif",
    source: "Explorons l'IA", 
    description: "Écriture et image\u00A0: ce que l'IA générative apporte à un processus créatif, ce qu'elle ne fait pas, et les questions de droits et d'éthique.",
    link: "/cours/ia-creativite",
    type: "cours",
    year: 2026,
    tags: ["Créativité", "Design", "Art numérique", "Innovation", "Interne"],
    isInternal: true
  },
  {
    title: "Deep Learning\u00A0: les bases",
    source: "Explorons l'IA",
    description: "Introduction au deep learning\u00A0: du neurone artificiel aux réseaux convolutifs, avec du code Python commenté (NumPy, Keras).",
    link: "/deep-learning",
    type: "cours",
    year: 2026,
    tags: ["Deep Learning", "Réseaux de neurones", "CNN", "Keras", "Interne"],
    isInternal: true
  },
  {
    title: "Deep learning pratique\u00A0: de la théorie à l'application",
    source: "Explorons l'IA",
    description: "Cours pratique sur le deep learning\u00A0: boucle d'entraînement PyTorch, courbes d'apprentissage, évaluation, sauvegarde et bonnes pratiques.",
    link: "/cours/deep-learning-pratique", 
    type: "cours",
    year: 2026,
    tags: ["Deep Learning", "Pratique", "Projets", "Neural Networks", "Interne"],
    isInternal: true
  },
  {
    title: "IA éthique et responsable\u00A0: guide pratique",
    source: "Explorons l'IA",
    description: "Les enjeux éthiques de l'IA\u00A0: biais, transparence, responsabilité, vie privée et cadre juridique, avec des scénarios d'étude.",
    link: "/cours/ia-ethique",
    type: "cours", 
    year: 2026,
    tags: ["Éthique", "Responsabilité", "Gouvernance", "Société", "Interne"],
    isInternal: true
  },
  {
    title: "IA en entreprise\u00A0: stratégie et mise en œuvre",
    source: "Explorons l'IA",
    description: "Des repères pour conduire un projet d'IA en entreprise, de l'analyse des besoins au déploiement, sans promesse de gains chiffrés.",
    link: "/cours/ia-entreprise",
    type: "cours",
    year: 2026, 
    tags: ["Entreprise", "Stratégie", "Transformation", "ROI", "Interne"],
    isInternal: true
  },
  {
    title: "NLP et LLM\u00A0: comprendre le traitement du langage",
    source: "Explorons l'IA",
    description: "Comment les machines traitent le langage\u00A0: tokenisation, embeddings, attention, transformers et grands modèles de langage, avec leurs applications et leurs limites.",
    link: "/cours/nlp-comprehension",
    type: "cours",
    year: 2026,
    tags: ["NLP", "LLM", "Langage", "Transformers", "Interne"], 
    isInternal: true
  },
  {
    title: "IA et environnement\u00A0: comprendre l'empreinte du numérique et agir",
    source: "Explorons l'IA",
    description: "Comprendre et réduire l'empreinte écologique de l'IA, du cloud, des smartphones et du numérique. Chiffres sourcés, analogies concrètes et solutions pratiques.",
    link: "/cours/ia-environnement",
    type: "cours",
    year: 2026,
    tags: ["Green IT", "Environnement", "Développement durable", "IA", "Datacenter", "Interne"],
    isInternal: true
  },
  {
    title: "Initiation à Python pour l'IA\u00A0: de la syntaxe à un premier projet",
    source: "Explorons l'IA",
    description: "Les bases de Python, NumPy, pandas, Matplotlib et scikit-learn, avec des exemples de code et un mini-projet complet sur le jeu Iris.",
    link: "/cours/python-ia",
    type: "cours",
    year: 2026,
    tags: ["Python", "NumPy", "pandas", "Débutant", "Interne"],
    isInternal: true
  },
  {
    title: "Construire son premier modèle de machine learning, pas à pas",
    source: "Explorons l'IA",
    description: "Un projet complet avec scikit-learn\u00A0: exploration, préparation des données, comparaison de modèles par validation croisée, réglages et déploiement.",
    link: "/cours/premier-modele-ml",
    type: "cours",
    year: 2026,
    tags: ["Machine Learning", "scikit-learn", "Projet", "Python", "Interne"],
    isInternal: true
  },
  {
    title: "Le NLP en Python\u00A0: concepts et outils, du texte aux transformers",
    source: "Explorons l'IA",
    description: "Prétraitement, embeddings, transformers, classification, génération et questions-réponses, avec du code Python. Complète le cours conceptuel sur le NLP.",
    link: "/cours/nlp-concepts",
    type: "cours",
    year: 2026,
    tags: ["NLP", "Transformers", "Python", "Embeddings", "Interne"],
    isInternal: true
  },
  {
    title: "Coder une application avec l'IA\u00A0: assistants, intégration et risques",
    source: "Explorons l'IA",
    description: "Assistants de code, intégration d'un service d'IA dans une application, approche no code, workflows avancés et risques du code généré.",
    link: "/cours/coder-avec-ia",
    type: "cours",
    year: 2026,
    tags: ["Développement", "Assistants de code", "No code", "Sécurité", "Interne"],
    isInternal: true
  },
  {
    title: "Utiliser l'IA au quotidien\u00A0: bons usages et vie privée",
    source: "Explorons l'IA",
    description: "Reconnaître l'IA autour de soi, bien s'en servir et protéger sa vie privée, avec des exemples de demandes bien formulées.",
    link: "/cours/utiliser-ia-quotidien",
    type: "cours",
    year: 2026,
    tags: ["Usage quotidien", "Vie privée", "Débutant", "Interne"],
    isInternal: true
  },
  {
    title: "Utiliser l'IA au travail\u00A0: usages, confidentialité et cadre légal",
    source: "Explorons l'IA",
    description: "Choisir les bons usages, protéger les données de son organisation, connaître le RGPD et le règlement européen sur l'IA, et mesurer les gains.",
    link: "/cours/utiliser-ia-travail",
    type: "cours",
    year: 2026,
    tags: ["Travail", "RGPD", "Gouvernance", "Productivité", "Interne"],
    isInternal: true
  },
  {
    title: "Organiser ses outils d'IA\u00A0: inventaire, sécurité et routine",
    source: "Explorons l'IA",
    description: "Classer, documenter et sécuriser les services d'IA que l'on utilise, avec une arborescence et un modèle d'inventaire à copier.",
    link: "/cours/organiser-services-ia",
    type: "cours",
    year: 2026,
    tags: ["Organisation", "Productivité", "Comptes", "Interne"],
    isInternal: true
  },
  {
    title: "L'IA pour le marketing et la vente\u00A0: usages et points de vigilance",
    source: "Explorons l'IA",
    description: "Personnalisation, analyse prédictive, automatisation des campagnes et chatbots\u00A0: usages, indicateurs à suivre et cadre juridique (RGPD, règlement européen sur l'IA).",
    link: "/cours/ia-marketing-vente",
    type: "cours",
    year: 2026,
    tags: ["Marketing", "Vente", "Chatbots", "RGPD", "Interne"],
    isInternal: true
  },
  {
    title: "L'IA expliquée aux enfants (dès 12 ans)",
    source: "Explorons l'IA",
    description: "Comprendre l'IA simplement\u00A0: comment elle fonctionne, ses limites et six bons réflexes pour l'utiliser en sécurité, avec un encart pour les parents et les enseignants.",
    link: "/ia-expliquee-aux-enfants",
    type: "cours",
    year: 2026,
    tags: ["Enfants", "Débutant", "Sécurité", "Famille", "Interne"],
    isInternal: true
  },

  // Cours externes existants
  {
    title: "Machine Learning A-Z",
    source: "Udemy (Kirill Eremenko, Hadelin de Ponteves)",
    description: "Cours payant en anglais qui couvre les algorithmes classiques de machine learning avec Python et R, mis à jour régulièrement",
    link: "https://www.udemy.com/course/machinelearning/",
    type: "cours",
    year: 2026,
    tags: ["Machine Learning", "Python", "R", "Data Science"]
  },
  {
    title: "Deep Learning Specialization",
    source: "Coursera",
    description: "Spécialisation de DeepLearning.AI sur Coursera, avec Andrew Ng, en 5 cours\u00A0: réseaux de neurones, CNN, modèles de séquence et transformers. Inscription gratuite, certificat payant, doublage français généré par IA",
    link: "https://www.coursera.org/specializations/deep-learning",
    type: "cours",
    year: 2017,
    tags: ["Deep Learning", "Neural Networks", "CNN", "RNN"]
  },
  {
    title: "AI For Everyone",
    source: "Coursera",
    description: "Cours non technique d'Andrew Ng (DeepLearning.AI, environ 7 heures) sur ce que l'IA peut et ne peut pas faire. Accès gratuit en audit, doublage français généré par IA",
    link: "https://www.coursera.org/learn/ai-for-everyone",
    type: "cours",
    year: 2019,
    tags: ["AI", "Non-Technical", "Introduction"]
  },
  {
    title: "DeepLearning.AI TensorFlow Developer Professional Certificate",
    source: "Coursera",
    description: "Certificat de DeepLearning.AI sur Coursera (Laurence Moroney), en 4 cours pratiques sur TensorFlow, de la vision par ordinateur aux séquences. En anglais",
    link: "https://www.coursera.org/professional-certificates/tensorflow-in-practice",
    type: "cours",
    tags: ["TensorFlow", "AI", "Deep Learning", "Python"]
  },
  {
    title: "Mathematics for Machine Learning Specialization",
    source: "Coursera (Imperial College London)",
    description: "Spécialisation d'Imperial College London en 3 cours (algèbre linéaire, calcul multivarié, ACP) avec exercices en Python. Inscription gratuite, en anglais",
    link: "https://www.coursera.org/specializations/mathematics-machine-learning",
    type: "cours",
    year: 2018,
    tags: ["Mathematics", "Machine Learning", "Linear Algebra", "Calculus", "Probability", "Python"]
  },
  {
    title: "IBM AI Engineering Professional Certificate",
    source: "Coursera",
    description: "Certificat professionnel d'IBM sur Coursera (machine learning, deep learning, IA générative) avec projets pratiques. En anglais, niveau intermédiaire",
    link: "https://www.coursera.org/professional-certificates/ai-engineer",
    type: "cours",
    tags: ["AI Engineering", "Professional Certificate"]
  },
  {
    title: "Natural Language Processing Specialization",
    source: "Coursera",
    description: "Spécialisation de DeepLearning.AI sur Coursera en 4 cours (classification, modèles probabilistes, modèles de séquence, attention), en anglais. Inscription gratuite",
    link: "https://www.coursera.org/specializations/natural-language-processing",
    type: "cours",
    tags: ["Natural Language Processing"]
  },
  {
    title: "Machine Learning Specialization",
    source: "Stanford Online et DeepLearning.AI (Coursera)",
    description: "Spécialisation d'Andrew Ng en 3 cours\u00A0: apprentissage supervisé, réseaux de neurones, arbres de décision, apprentissage non supervisé et par renforcement. Inscription gratuite, certificat payant",
    link: "https://www.coursera.org/specializations/machine-learning-introduction",
    year: 2022,
    tags: ["Machine Learning", "Débutant", "Andrew Ng", "Coursera"],
    type: "cours"
  },
  {
    title: "L'intelligence artificielle... avec intelligence\u00A0!",
    source: "Inria (FUN MOOC)",
    description: "MOOC citoyen gratuit d'Inria, en français, d'environ 10 heures à son rythme, pour comprendre ce qu'est l'IA, l'expérimenter et en débattre",
    link: "https://www.fun-mooc.fr/fr/cours/lintelligence-artificielle-avec-intelligence/",
    tags: ["IA", "Débutant", "Français", "Inria", "Gratuit"],
    type: "cours"
  },
  {
    title: "Fidle\u00A0: formation d'introduction au deep learning",
    source: "CNRS, MIAI et Université Grenoble Alpes",
    description: "Formation gratuite en français, diffusée en ligne, avec cours, travaux pratiques et notebooks Jupyter, du niveau découverte au niveau avancé",
    link: "https://fidle.cnrs.fr",
    tags: ["Deep Learning", "Français", "CNRS", "Gratuit", "Notebooks"],
    type: "cours"
  },
  {
    title: "Elements of AI",
    source: "Université d'Helsinki et MinnaLearn",
    description: "Cours en ligne gratuit, en français, sans prérequis de programmation\u00A0: «\u00A0Introduction à l'IA\u00A0» puis «\u00A0Construire l'IA\u00A0», à suivre à son rythme",
    link: "https://www.elementsofai.fr/",
    year: 2018,
    tags: ["IA", "Débutant", "Français", "Gratuit"],
    type: "cours"
  },
  {
    title: "Cours d'initiation au machine learning (Machine Learning Crash Course)",
    source: "Google",
    description: "Cours gratuit de Google, disponible en français, en modules courts avec vidéos, visualisations interactives et exercices\u00A0; un module est consacré à l'équité (types de biais, mesures par groupe)",
    link: "https://developers.google.com/machine-learning/crash-course?hl=fr",
    year: 2018,
    tags: ["Machine Learning", "Débutant", "Google", "Gratuit", "Français"],
    type: "cours"
  },
  {
    title: "Machine learning in Python with scikit-learn",
    source: "Inria (FUN MOOC)",
    description: "MOOC gratuit d'Inria conçu par des développeurs de scikit-learn\u00A0: construire des modèles prédictifs et en comprendre les limites. Environ 36 heures, à son rythme\u00A0; supports en anglais",
    link: "https://www.fun-mooc.fr/fr/cours/machine-learning-python-scikit-learn/",
    tags: ["Machine Learning", "Python", "Inria", "Gratuit"],
    type: "cours"
  },
  {
    title: "Deep Learning",
    source: "Cnam (FUN MOOC)",
    description: "MOOC du Cnam (Nicolas Thome) en français, environ 6 semaines\u00A0: réseaux de neurones, réseaux convolutifs, modèles récurrents\u00A0; supports en anglais",
    link: "https://www.fun-mooc.fr/fr/cours/deep-learning/",
    tags: ["Deep Learning", "Français", "Cnam", "Gratuit"],
    type: "cours"
  },
];

// Couvertures locales des cours classiques, affichées sur les cartes.
const classicCovers: Record<string, string> = {
  '/cours/apprentissage-supervise': 'pics/cours-classiques/apprentissage-supervise.webp',
  '/cours/apprentissage-non-supervise': 'pics/cours-classiques/apprentissage-non-supervise.webp',
  '/cours/bases-mathematiques-ia': 'pics/cours-classiques/bases-mathematiques-ia.webp',
  '/cours/prompt-engineering': 'pics/cours-classiques/prompt-engineering.webp',
  '/cours/chain-of-prompts': 'pics/cours-classiques/chain-of-prompts.webp',
  '/cours/parametres-llm': 'pics/cours-classiques/parametres-llm.webp',
  '/cours/ia-creativite': 'pics/cours-classiques/ia-creativite.webp',
  '/cours/deep-learning-pratique': 'pics/cours-classiques/deep-learning-pratique.webp',
  '/cours/ia-ethique': 'pics/cours-classiques/ia-ethique.webp',
  '/cours/ia-entreprise': 'pics/cours-classiques/ia-entreprise.webp',
  '/cours/nlp-comprehension': 'pics/cours-classiques/nlp-comprehension.webp',
  '/cours/ia-environnement': 'pics/cours-classiques/ia-environnement.webp',
  '/cours/python-ia': 'pics/cours-classiques/python-ia.webp',
  '/cours/premier-modele-ml': 'pics/cours-classiques/premier-modele-ml.webp',
  '/cours/nlp-concepts': 'pics/cours-classiques/nlp-concepts.webp',
  '/cours/coder-avec-ia': 'pics/cours-classiques/coder-avec-ia.webp',
  '/cours/utiliser-ia-quotidien': 'pics/cours-classiques/utiliser-ia-quotidien.webp',
  '/cours/utiliser-ia-travail': 'pics/cours-classiques/utiliser-ia-travail.webp',
  '/cours/organiser-services-ia': 'pics/cours-classiques/organiser-services-ia.webp',
  '/cours/ia-marketing-vente': 'pics/cours-classiques/ia-marketing-vente.webp',
};

// Cours approfondis : tirés du registre, pour ne pas répéter titres et descriptions.
const deepCourses: Resource[] = DEEP_COURSES.map((course) => ({
  title: course.title,
  source: "Explorons l'IA",
  description: course.description,
  link: deepCoursePath(course.slug),
  type: 'cours',
  year: 2026,
  tags: [...course.tags, 'Cours approfondi', 'Interne'],
  isInternal: true,
  cover: `pics/cours/${course.slug}.webp`,
}));

// Export principal - utilisé par les autres composants
export const coursesData = [
  ...courses.map((course) => (classicCovers[course.link] ? { ...course, cover: classicCovers[course.link] } : course)),
  ...deepCourses,
];
