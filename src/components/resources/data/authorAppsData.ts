// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { AuthorApp } from '../resourcesData';

// Applications et sites de l'auteur utiles pour prolonger les cours.
// Liens et présentations relevés sur leur page le 26/10/2026. « Data Science Memo »
// n'est pas listé : son ancienne adresse répond 410 Gone et l'application n'est plus au catalogue.
export const authorApps: AuthorApp[] = [
  {
    name: "Boussole IA",
    description: "Guide gratuit pour comprendre, choisir, mettre en œuvre et encadrer l'IA dans une TPE, une association ou une collectivité\u00A0: modules, cas d'usage, boîte à outils et laboratoire, sans jargon.",
    link: "https://ia.hylst.fr/boussole-ia/",
    category: "Usages et gouvernance",
    tags: ["IA", "gouvernance", "TPE", "associations"]
  },
  {
    name: "CogniAI",
    description: "Exploration des biais cognitifs et des illusions de compétence face à l'IA\u00A0: mieux comprendre ses limites et garder un regard critique sur ses réponses.",
    link: "https://ia.hylst.fr/cogniai/",
    category: "Esprit critique",
    tags: ["biais", "esprit critique", "IA"]
  },
  {
    name: "Esprit Clair",
    description: "Treize modules pour examiner une information, comprendre les biais et pratiquer la pensée critique, avec des activités corrigées, des quiz et des fiches.",
    link: "https://hylst.fr/esprit-clair/",
    category: "Esprit critique",
    tags: ["pensée critique", "information", "biais"]
  },
  {
    name: "DataLittéracie",
    description: "Parcours pour comprendre le cycle de vie des données en les manipulant\u00A0: collecte, nettoyage, graphiques, prédiction, stockage, souveraineté et risques liés à l'IA.",
    link: "https://ia.hylst.fr/datalitteracie/",
    category: "Données",
    tags: ["données", "littéracie", "RGPD", "visualisation"]
  },
  {
    name: "DataLab Studio+",
    description: "Créer, importer, requêter et exporter des bases SQL et NoSQL directement dans le navigateur\u00A0: aucun serveur, aucune inscription.",
    link: "https://hylst.fr/datalab/",
    category: "Données",
    tags: ["SQL", "NoSQL", "bases de données", "hors ligne"]
  },
  {
    name: "Explorons la Data Science",
    description: "Cours de data science en français\u00A0: mathématiques, statistiques, Python, machine learning, quiz et éditeur de code exécuté dans le navigateur.",
    link: "https://hylst.fr/data_science_explorer/",
    category: "Data science",
    status: "en-construction",
    tags: ["data science", "Python", "statistiques", "machine learning"]
  },
  {
    name: "Guide Maths",
    description: "Cours, exercices, quiz, simulateurs et fiches du primaire au supérieur pour consolider les bases mathématiques utiles à l'IA.",
    link: "https://edu.hylst.fr/guide_maths/",
    category: "Mathématiques",
    tags: ["mathématiques", "exercices", "révisions"]
  },
  {
    name: "Confidentialité IA, RGPD et souveraineté",
    description: "Guide pratique sur la conformité IA, le RGPD et l'AI Act\u00A0: éthique, propriété intellectuelle, confidentialité et alternatives souveraines.",
    link: "https://hylst.fr/confidentialite_ia_rgpd_souverainete/",
    category: "Droit et conformité",
    tags: ["RGPD", "AI Act", "souveraineté", "confidentialité"]
  },
  {
    name: "Le Green IT en clair",
    description: "Comprendre l'empreinte environnementale du numérique et adopter des pratiques plus sobres\u00A0: éco-conception, énergie, matériel et gestes concrets.",
    link: "https://hylst.fr/greenit/",
    category: "Environnement",
    tags: ["Green IT", "sobriété", "environnement", "éco-conception"]
  },
  {
    name: "À Votre Service",
    description: "88 outils gratuits et hors ligne pour la productivité, les calculs, les conversions et l'organisation, sans compte ni serveur.",
    link: "https://hylst.fr/a-votre-service/",
    category: "Outils du quotidien",
    tags: ["productivité", "outils", "hors ligne"]
  },
  {
    name: "Mes Acolytes",
    description: "42 assistants IA pour échanger, apprendre et créer\u00A0: les clés API et l'historique restent dans le navigateur.",
    link: "https://hylst.fr/mes-acolytes/",
    category: "Assistants IA",
    tags: ["assistants", "chat", "API", "apprentissage"]
  }
];
