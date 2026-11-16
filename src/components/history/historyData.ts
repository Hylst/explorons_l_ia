// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Brain, Sparkles, Clock, TrendingUp, Zap, type LucideIcon } from 'lucide-react';

export interface HistoryEra {
  id: string;
  title: string;
  /** Libellé court pour l'onglet (sans les dates). */
  short: string;
  description: string;
  color: string;
  icon: LucideIcon;
  events: { year: string; event: string }[];
}

/**
 * Grandes périodes de l'histoire de l'IA. Les dates suivent les repères usuels des historiens
 * de l'informatique ; les "hivers" (1974-1980 et 1987-1993) sont des périodes, pas des dates précises.
 */
export const eras: HistoryEra[] = [
  {
    id: 'inception',
    title: 'Les débuts (1940-1956)',
    short: 'Les débuts',
    description:
      "Les bases théoriques\u00A0: neurone formel, machine de Turing et question «\u00A0une machine peut-elle penser\u00A0?\u00A0». La discipline reçoit son nom en 1956.",
    color: 'from-blue-500/20 to-purple-500/20',
    icon: Brain,
    events: [
      { year: '1943', event: 'Warren McCulloch et Walter Pitts proposent un modèle mathématique du neurone artificiel.' },
      { year: '1950', event: "Alan Turing publie «\u00A0Computing Machinery and Intelligence\u00A0» et propose son test d'imitation." },
      {
        year: '1956',
        event:
          "Atelier de Dartmouth, organisé par John McCarthy, Marvin Minsky, Nathaniel Rochester et Claude Shannon\u00A0: le terme «\u00A0intelligence artificielle\u00A0» s'impose.",
      },
      { year: '1958', event: 'John McCarthy crée le langage LISP, longtemps langage de référence de la recherche en IA.' },
      { year: '1958', event: 'Frank Rosenblatt présente le perceptron, un des premiers réseaux de neurones capables d’apprendre.' },
    ],
  },
  {
    id: 'golden-age',
    title: 'Les premiers succès (1956-1974)',
    short: 'Premiers succès',
    description:
      "Période d'optimisme\u00A0: les premiers programmes résolvent des problèmes de logique, jouent aux dames et dialoguent, et les financements affluent.",
    color: 'from-yellow-500/20 to-orange-500/20',
    icon: Sparkles,
    events: [
      { year: '1965', event: "DENDRAL, à Stanford, est considéré comme le premier système expert\u00A0: il identifie des structures moléculaires." },
      { year: '1966', event: "ELIZA, de Joseph Weizenbaum, imite un psychothérapeute avec de simples règles de reformulation." },
      { year: '1968', event: "Le film «\u00A02001, l'Odyssée de l'espace\u00A0» popularise l'image d'une IA fictive, HAL 9000." },
      { year: 'Vers 1970', event: 'SHRDLU, de Terry Winograd, manipule des blocs virtuels à partir de commandes en langage naturel.' },
    ],
  },
  {
    id: 'winter',
    title: "Les hivers de l'IA (1974-1993)",
    short: 'Les hivers',
    description:
      "Deux périodes de désillusion et de baisse des financements suivent des promesses non tenues. Elles entourent l'essor, puis l'effondrement des systèmes experts.",
    color: 'from-gray-500/20 to-slate-500/20',
    icon: Clock,
    events: [
      { year: '1973', event: "Le rapport Lighthill, au Royaume-Uni, critique sévèrement les résultats de la recherche en IA\u00A0: premier hiver (1974-1980)." },
      { year: 'Années 1980', event: "Les systèmes experts se répandent dans l'industrie, portés par de gros investissements." },
      { year: '1986', event: 'David Rumelhart, Geoffrey Hinton et Ronald Williams popularisent la rétropropagation du gradient pour entraîner des réseaux multicouches.' },
      { year: '1987', event: "Le marché des machines LISP spécialisées s'effondre\u00A0: début du second hiver (1987-1993)." },
    ],
  },
  {
    id: 'revival',
    title: 'La renaissance statistique (1993-2010)',
    short: 'Renaissance',
    description:
      "L'IA se recentre sur des problèmes précis et sur l'apprentissage à partir de données, avec des méthodes statistiques et davantage de puissance de calcul.",
    color: 'from-green-500/20 to-emerald-500/20',
    icon: TrendingUp,
    events: [
      { year: '1997', event: "Deep Blue, d'IBM, bat le champion du monde d'échecs Garry Kasparov." },
      { year: '1998', event: 'Yann LeCun et ses collègues présentent LeNet-5, un réseau convolutif qui reconnaît des chiffres manuscrits.' },
      { year: '2005', event: "Le véhicule Stanley, de l'université Stanford, remporte le DARPA Grand Challenge de conduite autonome." },
      { year: '2006', event: 'Geoffrey Hinton et ses collègues publient une méthode pour entraîner des réseaux de neurones profonds.' },
      { year: '2009', event: "Fei-Fei Li et ses collègues présentent ImageNet, une grande base d'images étiquetées." },
    ],
  },
  {
    id: 'modern',
    title: "L'ère du deep learning et de l'IA générative (2010 à aujourd'hui)",
    short: 'Ère moderne',
    description:
      "Grâce aux masses de données, aux processeurs graphiques et aux nouvelles architectures, les réseaux de neurones profonds dominent la vision, la parole puis le langage.",
    color: 'from-purple-500/20 to-pink-500/20',
    icon: Zap,
    events: [
      { year: '2011', event: "Watson, d'IBM, remporte le jeu télévisé Jeopardy! face à des champions humains." },
      { year: '2012', event: "AlexNet remporte la compétition ImageNet avec un taux d'erreur nettement inférieur à celui des méthodes classiques." },
      { year: '2016', event: 'AlphaGo, de DeepMind, bat le champion du monde de Go Lee Sedol.' },
      { year: '2017', event: "Des chercheurs de Google présentent l'architecture Transformer dans l'article «\u00A0Attention Is All You Need\u00A0»." },
      { year: '2020', event: "OpenAI présente GPT-3, un modèle de langage de 175 milliards de paramètres." },
      { year: '2022', event: 'DALL-E 2, Midjourney et Stable Diffusion popularisent la génération d’images, puis ChatGPT est lancé en novembre.' },
      { year: '2024', event: "Le règlement européen sur l'IA entre en vigueur (1er août), avec une application progressive." },
    ],
  },
];

export interface HistoryFigure {
  name: string;
  years: string;
  contribution: string;
  description: string;
}

export const figures: HistoryFigure[] = [
  {
    name: 'Ada Lovelace',
    years: '1815-1852',
    contribution: 'Premier algorithme publié pour une machine',
    description: "Elle décrit en 1843 un calcul destiné à la machine analytique de Babbage",
  },
  {
    name: 'Alan Turing',
    years: '1912-1954',
    contribution: 'Fondements théoriques, test de Turing',
    description: "Mathématicien britannique, figure fondatrice de l'informatique",
  },
  {
    name: 'Claude Shannon',
    years: '1916-2001',
    contribution: "Théorie de l'information, atelier de Dartmouth",
    description: "Mathématicien et ingénieur américain, co-organisateur de l'atelier de 1956",
  },
  {
    name: 'John McCarthy',
    years: '1927-2011',
    contribution: "Terme «\u00A0intelligence artificielle\u00A0», LISP",
    description: "Informaticien américain, à l'origine du nom de la discipline",
  },
  {
    name: 'Marvin Minsky',
    years: '1927-2016',
    contribution: "Cofondateur du laboratoire d'IA du MIT",
    description: "Pionnier de l'IA et des sciences cognitives",
  },
  {
    name: 'Geoffrey Hinton',
    years: 'né en 1947',
    contribution: "Réseaux de neurones profonds, rétropropagation",
    description: "Prix Turing 2018 avec Yann LeCun et Yoshua Bengio, prix Nobel de physique 2024 avec John Hopfield",
  },
  {
    name: 'Yann LeCun',
    years: 'né en 1960',
    contribution: 'Réseaux de neurones convolutifs',
    description: 'Auteur de LeNet, pionnier de la vision par ordinateur par apprentissage',
  },
  {
    name: 'Yoshua Bengio',
    years: 'né en 1964',
    contribution: 'Apprentissage profond, langage',
    description: "Chercheur à Montréal, engagé aussi sur la sécurité et la gouvernance de l'IA",
  },
  {
    name: 'Fei-Fei Li',
    years: 'née en 1976',
    contribution: 'Vision par ordinateur, ImageNet',
    description: "Chercheuse à Stanford, à l'origine de la base d'images ImageNet",
  },
  {
    name: 'Andrew Ng',
    years: 'né en 1976',
    contribution: "Apprentissage automatique, enseignement de l'IA",
    description: "A contribué à diffuser l'enseignement de l'IA auprès du grand public",
  },
  {
    name: 'Demis Hassabis',
    years: 'né en 1976',
    contribution: 'AlphaGo, AlphaFold',
    description: 'Cofondateur de DeepMind, prix Nobel de chimie 2024 avec John Jumper et David Baker',
  },
  {
    name: 'Joy Buolamwini',
    years: 'née en 1989',
    contribution: 'Biais des systèmes de reconnaissance faciale',
    description: "Auteure avec Timnit Gebru de l'étude Gender Shades (2018), fondatrice de l'Algorithmic Justice League",
  },
];

export interface HistoryPublication {
  title: string;
  author: string;
  year: string;
  description: string;
}

export const publications: HistoryPublication[] = [
  {
    title: 'A Logical Calculus of the Ideas Immanent in Nervous Activity',
    author: 'Warren McCulloch et Walter Pitts',
    year: '1943',
    description: "Premier modèle mathématique d'un neurone artificiel, à la base des réseaux de neurones.",
  },
  {
    title: 'Computing Machinery and Intelligence',
    author: 'Alan Turing',
    year: '1950',
    description: "Article fondateur qui pose la question «\u00A0les machines peuvent-elles penser\u00A0?\u00A0» et propose le test d'imitation.",
  },
  {
    title: 'A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence',
    author: 'John McCarthy, Marvin Minsky, Nathaniel Rochester et Claude Shannon',
    year: '1955',
    description: "Le document qui propose l'atelier de 1956 et emploie le terme «\u00A0intelligence artificielle\u00A0».",
  },
  {
    title: 'Perceptrons',
    author: 'Marvin Minsky et Seymour Papert',
    year: '1969',
    description: "Analyse les limites des perceptrons simples. Il est souvent cité parmi les causes du recul de la recherche sur les réseaux de neurones.",
  },
  {
    title: 'Learning representations by back-propagating errors',
    author: 'David Rumelhart, Geoffrey Hinton et Ronald Williams',
    year: '1986',
    description: "Popularise la rétropropagation du gradient pour entraîner des réseaux de neurones à plusieurs couches.",
  },
  {
    title: 'Attention Is All You Need',
    author: 'Ashish Vaswani et al.',
    year: '2017',
    description: "Présente l'architecture Transformer, base des modèles de langage actuels.",
  },
];

export interface HistoryLink {
  label: string;
  href: string;
}

/** Liens externes vérifiés (réponse 200 et titre conforme) à la date de rédaction. */
export const readingLinks: HistoryLink[] = [
  {
    label: 'A Proposal for the Dartmouth Summer Research Project (1955), PDF',
    href: 'http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf',
  },
  { label: 'Attention Is All You Need (2017), arXiv', href: 'https://arxiv.org/abs/1706.03762' },
  { label: 'BERT (2018), arXiv', href: 'https://arxiv.org/abs/1810.04805' },
];

export const siteLinks: HistoryLink[] = [
  { label: "La petite histoire de l'IA (histoire-ia.fr)", href: 'https://histoire-ia.fr/' },
  { label: "Histoire de l'intelligence artificielle (Wikipédia)", href: 'https://fr.wikipedia.org/wiki/Histoire_de_l%27intelligence_artificielle' },
];

/** Ouvrages de référence (existence vérifiée, pas de lien). */
export const books: string[] = [
  'Artificial Intelligence: A Modern Approach (Stuart Russell et Peter Norvig)',
  'The Quest for Artificial Intelligence (Nils J. Nilsson, 2010)',
  'Machines Who Think (Pamela McCorduck)',
  'Le Mythe de la Singularité (Jean-Gabriel Ganascia, 2017)',
];

export const popularCulture: { work: string; character: string }[] = [
  { work: "2001, l'Odyssée de l'espace (1968)", character: 'HAL 9000' },
  { work: 'Blade Runner (1982)', character: 'Les réplicants' },
  { work: 'Terminator (1984)', character: 'Skynet' },
  { work: 'Matrix (1999)', character: 'Les machines' },
  { work: 'Her (2013)', character: 'Samantha' },
];
