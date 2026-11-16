// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Resource } from '../resourcesData';

// Fiches relues sur leur page le 01/10/2026 (Fairlearn et la fiche de la CNIL sur l'anonymisation : 09/10/2026). Les sites vivants n'ont pas d'année.
export const websites: Resource[] = [
  {
    title: "Fairlearn",
    source: "Projet open source Fairlearn",
    description: "Bibliothèque Python et documentation pour évaluer l'équité d'un modèle d'apprentissage automatique groupe par groupe et atténuer les écarts\u00A0; le guide d'utilisation explique aussi les limites de chaque mesure (en anglais)",
    link: "https://fairlearn.org/",
    type: "site web",
    tags: ["équité", "biais", "Python", "open source"]
  },
  {
    title: "L'anonymisation de données personnelles",
    source: "CNIL",
    description: "Fiche de la CNIL\u00A0: différence entre anonymisation et pseudonymisation, principales techniques, et les trois critères européens pour juger qu'un jeu de données est vraiment anonyme (individualisation, corrélation, inférence)",
    link: "https://www.cnil.fr/fr/technologies/lanonymisation-de-donnees-personnelles",
    type: "site web",
    tags: ["RGPD", "données", "anonymisation", "français"]
  },
  {
    title: "Législation sur l'IA (règlement européen sur l'IA)",
    source: "Commission européenne",
    description: "Page officielle de la Commission européenne sur le règlement sur l'IA\u00A0: approche par les risques, rôle des acteurs et calendrier d'application, y compris les reports adoptés en 2026 pour les systèmes à haut risque",
    link: "https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai",
    type: "site web",
    tags: ["réglementation", "Europe", "AI Act", "français"]
  },
  {
    title: "Intelligence artificielle",
    source: "CNIL",
    description: "Page thématique de la CNIL qui réunit ses publications sur l'IA et les données personnelles (notes, outils, lignes directrices européennes, séminaires en ligne)",
    link: "https://www.cnil.fr/fr/intelligence-artificielle",
    type: "site web",
    tags: ["RGPD", "données", "IA", "français"]
  },
  {
    title: "Hub France IA",
    source: "Hub France IA",
    description: "Association reconnue d'intérêt général qui fédère des acteurs français de l'IA (entreprises, start-up, institutions, écoles)\u00A0: groupes de travail, publications et cas d'usage",
    link: "https://www.hub-franceia.fr/",
    type: "site web",
    tags: ["français", "collaboration", "écosystème"]
  },
  {
    title: "Inria\u00A0: intelligence artificielle",
    source: "Inria",
    description: "Page thématique d'Inria, institut public de recherche en sciences et technologies du numérique, sur ses travaux en intelligence artificielle",
    link: "https://www.inria.fr/fr/intelligence-artificielle",
    type: "site web",
    tags: ["recherche", "français", "institut"]
  },
  {
    title: "Interstices\u00A0: intelligence artificielle",
    source: "Interstices (Inria, CNRS, universités)",
    description: "Articles, podcasts et vidéos de vulgarisation sur l'IA, écrits par des chercheurs et des chercheuses",
    link: "https://interstices.info/domaine/intelligence-artificielle/",
    type: "site web",
    tags: ["vulgarisation", "français", "scientifique"]
  },
  {
    title: "Obvia\u00A0: impacts sociétaux de l'IA et du numérique",
    source: "Obvia (Québec)",
    description: "Observatoire international québécois qui réunit des chercheurs sur les effets de l'IA et du numérique\u00A0: santé, travail, droit, éthique, éducation",
    link: "https://www.obvia.ca/",
    type: "site web",
    tags: ["société", "éthique", "recherche"]
  },
  {
    title: "Donner un sens à l'intelligence artificielle\u00A0: pour une stratégie nationale et européenne",
    source: "Mission Villani (rapport au Premier ministre)",
    description: "Rapport de la mission parlementaire confiée à Cédric Villani (septembre 2017 à mars 2018), texte intégral",
    link: "https://www.vie-publique.fr/files/rapport/pdf/184000159.pdf",
    type: "site web",
    year: 2018,
    tags: ["rapport", "villani", "stratégie"]
  },
  {
    title: "Comment l'intelligence artificielle va changer nos vies",
    source: "CNRS Le journal",
    description: "Dossier du journal du CNRS (février 2018, mis à jour depuis)\u00A0: ce que recouvre l'IA, ses applications et ses enjeux, vus par des chercheurs",
    link: "https://lejournal.cnrs.fr/dossiers/comment-lintelligence-artificielle-va-changer-nos-vies",
    type: "site web",
    year: 2018,
    tags: ["cnrs", "définitions", "enjeux"]
  },
  {
    title: "Guide utilisateur de scikit-learn",
    source: "scikit-learn",
    description: "Documentation de scikit-learn, bibliothèque Python libre de machine learning\u00A0: chaque méthode est expliquée avec des exemples de code (en anglais)",
    link: "https://scikit-learn.org/stable/user_guide.html",
    type: "site web",
    tags: ["python", "machine learning", "documentation"]
  },
  {
    title: "Stratégie nationale pour l'intelligence artificielle",
    source: "Ministère de l'Économie (economie.gouv.fr)",
    description: "Présentation par le gouvernement de la stratégie nationale pour l'IA, lancée en 2018 puis prolongée par de nouvelles phases",
    link: "https://www.economie.gouv.fr/actualites/la-strategie-nationale-pour-lintelligence-artificielle",
    type: "site web",
    year: 2018,
    tags: ["gouvernement", "stratégie", "national"]
  }
];
