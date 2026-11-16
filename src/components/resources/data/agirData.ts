// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Guide « Agir » de /ressources?tab=agir. Les 26 liens sont contrôlés par npm run check:links ;
// les notes sont affichées dans les cartes d'action, pas dans ResourceCard.

import type { Resource } from '../resourcesData.ts';
import { TOOLS } from '../../../config/tools.ts';

export type AgirIcon =
  | 'graduation-cap'
  | 'headphones'
  | 'shield-check'
  | 'scale'
  | 'megaphone'
  | 'users'
  | 'book-open-check'
  | 'git-pull-request'
  | 'flask-conical';

export interface AgirResource extends Resource {
  note?: string;
  ctaLabel?: string;
}

export interface AgirSection {
  id: string;
  title: string;
  intro: string;
  resources: AgirResource[];
}

export interface AgirAction {
  id: string;
  title: string;
  icon: AgirIcon;
  description: string;
  ideas: string[];
  resources: AgirResource[];
}

export const agirIntro = {
  title: 'Agir, à votre échelle',
  paragraphs: [
    "Ce guide rassemble des ressources pour comprendre les usages de l'IA, poser de meilleures questions et passer à l'action. Les liens sont contrôlés avant chaque dépôt\u00A0; un lien peut devenir indisponible. Les ressources datées ou les points de vue sont signalés.",
    "Les neuf pistes ci-dessous ne promettent aucun résultat\u00A0: choisissez celle qui correspond à votre contexte et à vos moyens.",
  ],
};

const resources: Record<string, AgirResource> = {
  l01: {
    title: 'Café IA',
    source: 'Café IA',
    description: "Des rencontres locales pour découvrir l'IA, poser des questions et échanger entre habitants, sans prérequis technique.",
    link: 'https://cafeia.org/',
    type: 'site web',
  },
  l02: {
    title: "20 cartes pour aborder l'impact énergétique de l'IA",
    source: 'Café IA',
    description: "Un support d'atelier pour aborder l'impact énergétique de l'IA à partir de cartes et de questions simples.",
    link: 'https://cafeia.org/20-cartes-pour-aborder-limpact-energetique-de-lia/',
    type: 'article',
  },
  l03: {
    title: 'Les Bases\u00A0: Intelligence artificielle',
    source: 'ANCT',
    description: "Une collection de ressources de l'ANCT pour comprendre l'IA et ses usages dans le secteur public.",
    link: 'https://lesbases.anct.gouv.fr/collections/intelligence-artificielle-26',
    type: 'site web',
  },
  l04: {
    title: 'Institut du Numérique Responsable',
    source: 'INR',
    description: "L'Institut du Numérique Responsable publie des repères et des ressources pour réduire l'impact environnemental du numérique.",
    link: 'https://institutnr.org/inr-numerique-responsable',
    type: 'site web',
  },
  l05: {
    title: 'Quiz\u00A0: comment repérer une image générée par IA',
    source: 'France Inter',
    description: "Un quiz de 2023 pour apprendre à repérer les indices visuels d'une image générée par IA.",
    link: 'https://www.radiofrance.fr/franceinter/quiz-comment-reperer-une-image-generee-par-intelligence-artificielle-7249226',
    type: 'article',
    year: 2023,
  },
  l06: {
    title: 'ChatGPT, comment ça marche\u00A0?',
    source: 'Inria',
    description: "Une vidéo d'Inria qui explique le fonctionnement de ChatGPT et les limites d'un modèle de langage.",
    link: 'https://www.youtube.com/watch?v=K8gOvC8gvB4',
    type: 'vidéo',
  },
  l07: {
    title: 'Prompt Helper',
    source: 'Stable Diffusion France',
    description: "Un outil d'aide à la rédaction de prompts pour Stable Diffusion, à utiliser comme point de départ pour décrire une image.",
    link: 'https://www.stable-diffusion-france.fr/prompt-helper.php',
    type: 'outil',
  },
  l08: {
    title: 'Générateur de prompts',
    source: "Explorons l'IA",
    description: "Le générateur de prompts du site propose des modèles structurés et une checklist pour vérifier la clarté d'une demande. Aucun modèle n'est appelé.",
    link: TOOLS.promptGenerator.path,
    type: 'outil',
    isInternal: true,
    ctaLabel: "Ouvrir l'outil",
  },
  l09: {
    title: 'Impact CO2\u00A0: le numérique',
    source: 'ADEME',
    description: "Un outil de l'ADEME pour estimer l'impact carbone d'usages numériques et comparer des ordres de grandeur.",
    link: 'https://impactco2.fr/outils/numerique',
    type: 'outil',
  },
  l10: {
    title: 'DIAL-IA',
    source: 'IRES',
    description: "Un projet de recherche et de dialogue social sur les effets de l'IA dans le travail, avec des ressources pour les salariés et les employeurs.",
    link: 'https://dial-ia.fr/',
    type: 'site web',
    note: 'Dialogue social',
  },
  l11: {
    title: 'Une IA par jour',
    source: 'Une IA par jour',
    description: "Une veille pédagogique pour suivre l'actualité de l'IA et découvrir des usages concrets.",
    link: 'https://www.uneiaparjour.fr/',
    type: 'site web',
  },
  l12: {
    title: 'FramamIA',
    source: 'Framasoft',
    description: "Un guide de Framasoft sur les impacts sociaux et environnementaux de l'IA, avec des questions pour choisir ses usages.",
    link: 'https://framamia.org/',
    type: 'site web',
    note: 'Point de vue',
  },
  l13: {
    title: 'MOOC IA Responsable',
    source: 'Académie NR',
    description: "Un MOOC gratuit de l'Académie NR sur une IA responsable, avec une attestation de suivi.",
    link: 'https://www.academie-nr.org/mooc-ia/fr/index.html',
    type: 'cours',
    note: 'Gratuit',
  },
  l14: {
    title: 'Cours et parcours',
    source: "Explorons l'IA",
    description: "Les cours et parcours du site, classés par niveau, pour approfondir un thème ou réviser les bases.",
    link: '/cours',
    type: 'cours',
    isInternal: true,
  },
  l15: {
    title: 'Carte nationale des Cafés IA',
    source: 'Café IA',
    description: "La carte des Cafés IA en France pour trouver une rencontre près de chez soi. L'accès est gratuit pour les participants.",
    link: 'https://cafeia.org/carte-interactive/',
    type: 'site web',
    note: 'Gratuit',
  },
  l16: {
    title: 'Animer un Café IA',
    source: 'Café IA',
    description: "Un guide pratique pour organiser un Café IA, poser un cadre et animer les échanges.",
    link: 'https://cafeia.org/animer-un-cafe-ia/',
    type: 'site web',
  },
  l17: {
    title: 'La recette inratable',
    source: 'Café IA',
    description: "La recette de Café IA pour préparer un atelier simple, avec un déroulé et des conseils d'animation.",
    link: 'https://cafeia.org/recette-inratable',
    type: 'article',
  },
  l18: {
    title: 'Point de Contact',
    source: 'Point de Contact',
    description: "Le service de signalement des contenus illicites en ligne, avec des procédures selon le type de contenu.",
    link: 'https://www.pointdecontact.net/',
    type: 'site web',
  },
  l19: {
    title: '17Cyber',
    source: 'Cybermalveillance.gouv.fr',
    description: "Le service public de signalement et d'assistance en cas de cybermalveillance.",
    link: 'https://www.17cyber.gouv.fr/',
    type: 'site web',
  },
  l20: {
    title: '3018',
    source: 'e-Enfance / 3018',
    description: "Le service national d'écoute et de signalement pour les victimes de harcèlement ou de violences numériques.",
    link: 'https://e-enfance.org/besoin-daide/',
    type: 'site web',
  },
  l21: {
    title: "RGPD et AI Act\u00A0: le cadre européen de l'IA",
    source: 'ANCT Les Bases',
    description: "Un article pédagogique de l'ANCT pour comprendre comment le RGPD et l'AI Act encadrent un projet d'IA.",
    link: 'https://lesbases.anct.gouv.fr/ressources/rgpd-et-ai-act-comprendre-les-regles-qui-encadrent-l-ia-en-europe',
    type: 'article',
  },
  l22: {
    title: 'Intelligence artificielle',
    source: 'CNIL',
    description: "Les ressources de la CNIL sur l'intelligence artificielle, les données personnelles et les droits des personnes.",
    link: 'https://www.cnil.fr/fr/intelligence-artificielle',
    type: 'site web',
  },
  l23: {
    title: "Législation sur l'IA",
    source: 'Commission européenne',
    description: "La page officielle de la Commission européenne sur la législation de l'UE en matière d'IA.",
    link: 'https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai',
    type: 'site web',
  },
  l24: {
    title: "Convention citoyenne sur l'IA à Montpellier",
    source: 'Métropole de Montpellier',
    description: "Une convention citoyenne sur l'IA à Montpellier, de novembre 2023 à avril 2024, conservée comme exemple de concertation locale.",
    link: 'https://participer.montpellier.fr/ia',
    type: 'article',
    year: 2024,
    note: 'Exemple daté',
  },
  l25: {
    title: "Consultation parisienne sur l'IA",
    source: 'Ville de Paris',
    description: "Une consultation parisienne sur l'IA, terminée le 31 octobre 2024, conservée comme exemple de débat local.",
    link: 'https://www.paris.fr/pages/l-ia-s-invite-au-debat-partagez-votre-opinion-sur-l-intelligence-artificielle-dans-la-ville-28391',
    type: 'article',
    year: 2024,
    note: 'Exemple daté',
  },
  l26: {
    title: 'EGO',
    source: 'Inria',
    description: "Une vidéo d'Inria pour ouvrir la discussion sur les usages et les limites de l'IA.",
    link: 'https://www.youtube.com/watch?v=ZP7T6WAK3Ow',
    type: 'vidéo',
  },
};

export const agirSections: AgirSection[] = [
  {
    id: 'comprendre',
    title: 'Comprendre',
    intro: "Comprendre ce que recouvre l'IA et ce que ces outils changent dans nos usages.",
    resources: [resources.l01, resources.l02, resources.l03],
  },
  {
    id: 'interroger',
    title: "S'interroger",
    intro: "Se poser des questions concrètes sur ce que produit une IA, sur ses limites et sur notre propre rapport à ces outils.",
    resources: [resources.l05, resources.l06],
  },
  {
    id: 'prompts',
    title: 'Prompts',
    intro: "Écrire une demande claire, donner du contexte et vérifier le résultat.",
    resources: [resources.l07, resources.l08],
  },
  {
    id: 'environnement',
    title: 'Environnement',
    intro: "Relier les usages de l'IA à leurs impacts matériels et énergétiques, sans réduire le sujet à un seul chiffre.",
    resources: [resources.l09, resources.l04],
  },
  {
    id: 'informer',
    title: "S'informer",
    intro: "Suivre des sources qui expliquent, vérifient et documentent, plutôt que de dépendre d'une seule annonce.",
    resources: [resources.l10, resources.l11, resources.l12],
  },
];

export const agirActions: AgirAction[] = [
  {
    id: 'apprendre',
    title: 'Apprendre',
    icon: 'graduation-cap',
    description: 'Suivre une formation en ligne pour mettre à jour ses repères.',
    ideas: [
      'Suivre le MOOC IA Responsable.',
      'Choisir un cours du site adapté à son niveau.',
    ],
    resources: [resources.l13, resources.l14],
  },
  {
    id: 'ecouter',
    title: 'Écouter',
    icon: 'headphones',
    description: "Participer à un échange local pour entendre d'autres usages et d'autres questions.",
    ideas: [
      'Trouver un Café IA près de chez soi.',
      'Proposer un échange dans sa structure.',
    ],
    resources: [resources.l15, resources.l16],
  },
  {
    id: 'proteger',
    title: 'Me protéger',
    icon: 'shield-check',
    description: 'Savoir où signaler un contenu ou une situation problématique, selon le cas.',
    ideas: [
      'Signaler un contenu illicite.',
      'Signaler une cybermalveillance.',
      'Contacter le 3018 en cas de harcèlement ou de violences numériques.',
    ],
    resources: [resources.l18, resources.l19, resources.l20],
  },
  {
    id: 'encadrer',
    title: 'Encadrer',
    icon: 'scale',
    description: "Situer les règles applicables aux données personnelles et aux systèmes d'IA. Ces ressources informent, elles ne remplacent pas un avis juridique.",
    ideas: [
      'Comprendre les obligations RGPD et AI Act.',
      'Consulter les ressources de la CNIL.',
      "Lire la page officielle de la Commission européenne.",
    ],
    resources: [resources.l21, resources.l22, resources.l23],
  },
  {
    id: 'informer',
    title: 'Informer',
    icon: 'megaphone',
    description: "Partager des sources vérifiables et expliquer les limites d'un outil.",
    ideas: [
      'Préparer une courte intervention.',
      'Suivre une veille régulière.',
      "Distinguer ce qui est démontré, annoncé ou incertain.",
    ],
    resources: [resources.l01, resources.l10, resources.l11],
  },
  {
    id: 'transmettre',
    title: 'Transmettre',
    icon: 'users',
    description: 'Organiser un temps de discussion simple, sans supposer que les participants connaissent déjà le sujet.',
    ideas: [
      'Utiliser la recette inratable.',
      "S'appuyer sur les 20 cartes.",
      'Adapter le format au public et au temps disponible.',
    ],
    resources: [resources.l17, resources.l02, resources.l16],
  },
  {
    id: 'former',
    title: 'Former',
    icon: 'book-open-check',
    description: 'Construire un parcours de formation adapté à un public ou à une organisation.',
    ideas: [
      'Commencer par le MOOC IA Responsable.',
      'Choisir des ressources dans Les Bases.',
      'Compléter avec les cours du site.',
    ],
    resources: [resources.l13, resources.l03, resources.l14],
  },
  {
    id: 'contribuer',
    title: 'Contribuer',
    icon: 'git-pull-request',
    description: 'Prendre part à un commun, à une recherche ou à une concertation.',
    ideas: [
      'Contribuer à FramamIA.',
      'Découvrir le dialogue social avec DIAL-IA.',
      'Consulter une concertation locale.',
    ],
    resources: [resources.l12, resources.l10, resources.l24, resources.l25],
  },
  {
    id: 'experimenter',
    title: 'Expérimenter',
    icon: 'flask-conical',
    description: "Tester un outil dans un cadre limité, en observant ce qu'il produit et ce qu'il ne produit pas.",
    ideas: [
      'Écrire un prompt avec le générateur du site.',
      'Comparer deux formulations.',
      'Noter les limites observées.',
    ],
    resources: [resources.l08, resources.l07, resources.l26],
  },
];
