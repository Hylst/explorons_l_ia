// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import CourseModule from '@/components/courses/CourseModule';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import DoDontCard from '@/components/courses/DoDontCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AUTHOR_TITLE } from '@/config/site';
import {
  Smartphone,
  Mail,
  Search,
  Camera,
  MessageSquare,
  Shield,
  Tv,
} from 'lucide-react';

const headerProps = {
  title: 'Comment utiliser intelligemment les intelligences artificielles au quotidien',
  subtitle: "Un guide pratique pour tirer parti de l'IA dans sa vie personnelle, en connaissant ses limites",
  author: 'Geoffroy Streit',
  authorDescription: AUTHOR_TITLE,
  duration: '2 à 3 heures',
  level: 'Débutant',
  audience: 'Particuliers',
  tags: ['Usage quotidien', 'Productivité', 'Vie privée'],
};

const plan: CoursePlanItem[] = [
  {
    icon: <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Reconnaître l’IA au quotidien',
    description: 'Repérer les fonctions automatiques déjà présentes dans le téléphone, les services et les achats.',
  },
  {
    icon: <Search className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Optimiser ses outils',
    description: 'Mieux utiliser la recherche, les itinéraires, les filtres et les assistants existants.',
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Découvrir de nouveaux outils',
    description: 'Tester des assistants génératifs avec des demandes précises et des données non sensibles.',
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Bonnes pratiques et vie privée',
    description: 'Comprendre les limites, les biais et les réglages de confidentialité.',
  },
];

const module1Data = [
  {
    icon: <Smartphone className="h-5 w-5 text-primary" />,
    title: 'Smartphone',
    items: [
      'Assistant vocal intégré au téléphone',
      'Reconnaissance faciale pour le déverrouillage',
      'Correction automatique et prédiction de texte',
      'Tri automatique des photos par personnes, lieux et objets',
    ],
  },
  {
    icon: <Search className="h-5 w-5 text-primary" />,
    title: 'Navigation et recherche',
    items: [
      "Calcul d'itinéraires et estimation du trafic",
      'Classement des résultats des moteurs de recherche',
      'Recommandations de lieux',
      'Réponses générées en tête de certains moteurs de recherche',
    ],
  },
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    title: 'Communication',
    items: [
      'Filtrage anti-spam',
      'Traduction automatique',
      'Suggestions de réponses rapides',
      'Transcription de messages vocaux et sous-titres automatiques',
    ],
  },
  {
    icon: <Tv className="h-5 w-5 text-primary" />,
    title: 'Divertissement et achats',
    items: [
      'Recommandations de films, de musiques et de vidéos',
      "Suggestions d'achats personnalisées",
      'Publicités ciblées selon vos habitudes',
      'Sélection du contenu affiché sur les réseaux sociaux',
    ],
  },
];

const dailySources = [
  { label: "CNIL\u00A0: intelligence artificielle", href: 'https://www.cnil.fr/fr/technologies/intelligence-artificielle-ia' },
  { label: "CNIL\u00A0: recommandations sur l'IA et le RGPD", href: 'https://www.cnil.fr/fr/developpement-des-systemes-dia-les-recommandations-de-la-cnil-pour-respecter-le-rgpd' },
  { label: "Commission européenne\u00A0: cadre réglementaire de l'IA", href: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
  { label: 'Mistral AI\u00A0: Vibe (anciennement Le Chat)', href: 'https://mistral.ai/products/vibe/' },
  { label: 'Règlement (UE) 2016/679 (RGPD)', href: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' },
];

const dailyQuizQuestions: QuizQuestion[] = [
  {
    question: "Que faire avant de coller un document dans un assistant en ligne\u00A0?",
    options: [
      'Retirer ou masquer les données personnelles et les secrets inutiles',
      'Tout coller pour obtenir une meilleure réponse',
      'Désactiver la vérification des sources',
      'Publier le document ailleurs',
    ],
    correctAnswer: 0,
    explanation: "On réduit les données au strict nécessaire et on retire les informations sensibles. Un service en ligne ne doit pas recevoir plus que ce dont il a besoin.",
  },
  {
    question: "Une réponse d'IA est formulée avec assurance. Que faut-il en conclure\u00A0?",
    options: [
      'Elle est forcément exacte',
      'Elle peut être fausse ou inventée, il faut vérifier les points importants',
      'Elle est toujours sourcée',
      'Elle ne dépend pas du prompt',
    ],
    correctAnswer: 1,
    explanation: "Le ton assuré ne prouve rien. Pour une décision importante, on vérifie les faits, les chiffres et les sources auprès d'une source fiable.",
  },
  {
    question: "Pourquoi les recommandations et les filtres d'IA ne sont-ils pas neutres\u00A0?",
    options: [
      'Parce qu\u2019ils suppriment tout classement',
      'Parce qu\u2019ils n\u2019utilisent jamais de données',
      'Parce qu\u2019ils choisissent quoi montrer selon des critères et des données',
      'Parce qu\u2019ils sont toujours auditables',
    ],
    correctAnswer: 2,
    explanation: "Un classement dépend des objectifs, des signaux et des données utilisés. Il peut favoriser certains contenus et en rendre d'autres moins visibles.",
  },
  {
    question: "Quel prompt est le plus utile pour une tâche précise\u00A0?",
    options: [
      'Fais quelque chose de bien',
      'Aide-moi',
      'Réponds sans contexte',
      'Résume ce texte en 5 points, pour un débutant, et signale les passages incertains',
    ],
    correctAnswer: 3,
    explanation: "Un bon prompt précise la tâche, le public, le format et le traitement de l'incertitude. Il donne aussi le contexte nécessaire.",
  },
];

const goodPrompts = [
  {
    theme: 'Préparer un voyage',
    prompt:
      "Je pars 4 jours à Lisbonne en famille (2 adultes, 2 enfants de 8 et 12 ans), budget modéré, sans voiture. Propose un programme jour par jour avec les temps de trajet, et indique ce que je dois vérifier moi-même (horaires, réservations).",
    why: 'Contexte, contraintes, format demandé et rappel de vérifier.',
  },
  {
    theme: 'Apprendre',
    prompt:
      "Explique-moi la différence entre la TVA et l'impôt sur le revenu comme à un lycéen, puis pose-moi trois questions pour vérifier que j'ai compris.",
    why: 'Niveau visé, et échange pour tester sa compréhension.',
  },
  {
    theme: 'Cuisiner',
    prompt: "J'ai des courgettes, du riz et des œufs. Propose deux recettes pour 4 personnes, prêtes en 30 minutes, sans four.",
    why: 'Ingrédients, quantité, durée et contrainte précis.',
  },
];

const UtiliserIAQuotidien = () => (
  <CourseGuideLayout
    title={headerProps.title}
    subtitle={headerProps.subtitle}
    about={[
      "L’IA est déjà présente dans le téléphone, les itinéraires, les filtres anti-spam, les recommandations et les moteurs de recherche. Elle est souvent invisible, et ses limites le sont aussi.",
      "Ce cours aide à reconnaître ces usages, à mieux s’en servir et à protéger sa vie privée sans renoncer aux services utiles.",
    ]}
    learn={[
      "Identifier les fonctions d’IA dans les outils du quotidien.",
      "Mieux paramétrer et utiliser les services existants.",
      "Formuler des demandes précises à un assistant génératif.",
      "Reconnaître les erreurs, les biais et les risques pour la vie privée.",
      "Adopter des réflexes simples de vérification et de confidentialité.",
    ]}
    plan={plan}
    info={{
      level: headerProps.level,
      duration: headerProps.duration,
      prerequisites: 'Aucun prérequis technique ; utiliser un smartphone et un navigateur.',
      contents: ['4 modules', '1 quiz de fin de cours', 'Sources citées', 'Bilan et conseils pratiques'],
      audience: headerProps.audience,
      tags: headerProps.tags,
    }}
    related={[
      {
        to: '/ia-expliquee-aux-enfants',
        title: "L'IA expliquée aux enfants",
        description: 'Pour en parler avec les plus jeunes, à partir de 12 ans.',
      },
      {
        to: '/cours/organiser-services-ia',
        title: "Organiser ses outils d'IA",
        description: 'Classer, documenter et sécuriser les services que vous utilisez.',
      },
      {
        to: '/cours/utiliser-ia-travail',
        title: "Utiliser l'IA au travail",
        description: 'Cadre d’usage, confidentialité et gouvernance.',
      },
      {
        to: '/cours/prompt-engineering',
        title: 'Prompt engineering',
        description: 'Aller plus loin dans la formulation des demandes.',
      },
    ]}
  >
      <CourseModule
        title="Introduction"
        description="L'intelligence artificielle fait déjà partie du quotidien. Ce cours aide à l'utiliser de façon utile et responsable."
      >
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              Chaque jour, vous utilisez probablement plusieurs outils d'IA sans le savoir : votre smartphone, vos
              applications de navigation, vos plateformes de streaming, vos moteurs de recherche...
            </p>
            <p className="mb-4">
              Ce cours vous aide à mieux tirer parti de ces outils, à en découvrir de nouveaux, et à rester conscient de
              leurs limites et des enjeux pour votre vie privée.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h4 className="font-medium mb-2">Objectif principal</h4>
              <p className="text-sm">
                Devenir un utilisateur averti et efficace, capable de profiter des avantages de l'IA en évitant ses
                pièges.
              </p>
            </div>
          </CardContent>
        </Card>
      </CourseModule>

      <CourseModule
        title="Module 1 : Reconnaître l'IA dans votre quotidien"
        description="Identifiez les outils d'IA que vous utilisez déjà sans le savoir"
        modules={module1Data}
      />

      <CourseModule
        title="Module 2 : Optimiser vos outils actuels"
        description="Tirez le meilleur parti des IA que vous utilisez déjà"
      >
        <div className="space-y-6">
          <DoDontCard
            title="Assistants vocaux : au-delà des questions basiques"
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            doTitle="Utilisations efficaces"
            dontTitle="Limites à connaître"
            dos={[
              'Créer des listes de courses partagées',
              "Programmer des rappels selon l'heure ou le lieu",
              'Commander des appareils connectés',
              'Dicter de longues notes en mains libres',
              "Obtenir un point sur l'actualité",
            ]}
            donts={[
              "Écoute continue du mot d'activation\u00A0: en principe rien n'est enregistré avant, mais de fausses activations existent",
              'Compréhension limitée du contexte',
              'Dépendance à la connexion internet',
              'Erreurs de reconnaissance vocale, surtout dans le bruit',
              "Historique des requêtes (audio et texte) pouvant être conservé par le service, avec des réglages pour l'effacer",
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Photos et médias : une organisation intelligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Techniques utiles :</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Rechercher par personne pour retrouver rapidement des photos</li>
                    <li>• Rechercher par objet (« chien », « montagne », « voiture »)</li>
                    <li>• Classer par lieu grâce à la géolocalisation</li>
                    <li>• Laisser créer des albums automatiques pour les événements</li>
                    <li>• Partager en tenant compte des personnes présentes sur la photo</li>
                  </ul>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-medium flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-200">
                    <Shield className="h-4 w-4" />
                    Conseil vie privée
                  </h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Vérifiez régulièrement les réglages de partage automatique et désactivez la reconnaissance faciale
                    si vous préférez plus de confidentialité. Les photos d'autres personnes, et surtout d'enfants, se
                    partagent avec prudence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CourseModule>

      <CourseModule
        title="Module 3 : Découvrir de nouveaux outils d'IA"
        description="Des assistants qui peuvent vous faire gagner du temps, à condition de bien les utiliser"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Assistants conversationnels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  ChatGPT, Claude, Gemini, Mistral Vibe (anciennement Le Chat), Microsoft Copilot... Les offres changent souvent : comparez-les et
                  lisez leurs conditions d'usage.
                </p>
                <h4 className="font-medium">Usages pratiques :</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Rédiger et améliorer des e-mails</li>
                  <li>• Préparer un voyage</li>
                  <li>• S'entraîner et comprendre une notion</li>
                  <li>• Chercher des idées</li>
                  <li>• Résumer un document long</li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Astuce :</strong> soyez précis et donnez du contexte pour obtenir des réponses plus
                    pertinentes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Outils de création assistée</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-medium">Applications créatives :</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Génération d'images (Midjourney, Stable Diffusion, générateurs intégrés aux assistants)</li>
                  <li>• Aide à l'écriture et à la traduction (DeepL, Grammarly...)</li>
                  <li>• Création de présentations</li>
                  <li>• Retouche photo automatique</li>
                  <li>• Composition musicale assistée</li>
                </ul>
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 mt-4">
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    <strong>Important :</strong> vérifiez les droits d'usage des contenus produits et mentionnez
                    l'usage d'une IA quand c'est requis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Trois demandes bien formulées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goodPrompts.map((example) => (
                <div key={example.theme} className="rounded-lg border p-4">
                  <h5 className="font-medium mb-2">{example.theme}</h5>
                  <p className="text-sm bg-muted rounded p-3 mb-2">{example.prompt}</p>
                  <p className="text-xs text-muted-foreground">{example.why}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Le{' '}
              <Link to="/generateur-prompts" className="text-primary hover:underline">
                générateur de prompts
              </Link>{' '}
              du site aide à structurer ce type de demande, entièrement dans votre navigateur.
            </p>
          </CardContent>
        </Card>
      </CourseModule>

      <CourseModule
        title="Module 4 : Bonnes pratiques et éthique"
        description="Utilisez l'IA de manière responsable et efficace"
      >
        <div className="space-y-6">
          <DoDontCard
            title="Règles d'or de l'utilisation responsable"
            icon={<Shield className="h-5 w-5 text-primary" />}
            dos={[
              'Vérifier les informations importantes',
              "Garder son esprit critique",
              'Respecter la confidentialité des données',
              "Mentionner l'usage d'une IA quand c'est nécessaire",
              'Rester maître de ses décisions',
            ]}
            donts={[
              'Faire confiance aveuglément',
              'Partager des données sensibles',
              "Déléguer une décision importante (santé, argent, droit) sans l'avis d'un professionnel",
              'Ignorer les biais possibles',
              'Devenir dépendant des outils',
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle>Protection de la vie privée</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium">Actions concrètes :</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li>• Vérifier les réglages de confidentialité</li>
                    <li>• Limiter les données personnelles partagées</li>
                    <li>• Séparer comptes personnels et comptes professionnels, et ne pas saisir de données sensibles dans un outil grand public</li>
                    <li>• Lire les conditions d'utilisation des outils</li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li>• Supprimer régulièrement les historiques</li>
                    <li>• Désactiver les fonctions dont vous n'avez pas besoin</li>
                    <li>• Préférer les alternatives respectueuses de la vie privée</li>
                    <li>• Sauvegarder localement vos données importantes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CourseModule>

      <CourseQuiz title="Quiz\u00A0: utiliser l'IA au quotidien" questions={dailyQuizQuestions} />

      <CourseConclusion
        title="Conclusion : devenir un utilisateur averti"
        description="Récapitulatif et pistes pour continuer"
        learningPoints={[
          'Identifier et optimiser les IA de votre quotidien',
          "Utiliser de nouveaux outils d'IA générative avec des demandes précises",
          'Adopter une approche responsable',
          'Protéger votre vie privée tout en profitant des avantages de l’IA',
        ]}
        nextSteps={[
          'Explorer les cours plus techniques sur le fonctionnement de l’IA',
          'Tester régulièrement de nouveaux outils, sur des données non sensibles',
          'Vous tenir informé des évolutions techniques et réglementaires',
          'Partager ces conseils avec votre entourage, notamment les plus jeunes',
        ]}
      />

      <CourseSources sources={dailySources} />
  </CourseGuideLayout>
);

export default UtiliserIAQuotidien;
