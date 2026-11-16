// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import CourseModule from '@/components/courses/CourseModule';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import ClassicCourseQuiz from '@/components/courses/ClassicCourseQuiz';
import DoDontCard from '@/components/courses/DoDontCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AUTHOR_TITLE } from '@/config/site';
import {
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  Shield,
  Lightbulb,
  Target,
  Zap,
  Clock,
  Settings,
  Scale,
  AlertTriangle,
} from 'lucide-react';

const headerProps = {
  title: "Comment utiliser l'intelligence artificielle au travail de façon utile et responsable",
  subtitle: "Une méthode pour intégrer l'IA à son activité professionnelle sans mettre en danger les données ni la qualité du travail",
  author: 'Geoffroy Streit',
  authorDescription: AUTHOR_TITLE,
  duration: '3 à 4 heures',
  level: 'Intermédiaire',
  audience: 'Professionnels',
  tags: ['Usage professionnel', 'Productivité', 'Gouvernance'],
};

const plan: CoursePlanItem[] = [
  {
    icon: <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Diagnostic et stratégie',
    description: 'Repérer les tâches où l’IA aide réellement et poser un cadre d’adoption.',
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Applications concrètes',
    description: 'Premiers jets, reformulations, résumés et analyses, avec vérification.',
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Gestion et gouvernance',
    description: 'Rôles, données sensibles, validation humaine et règles internes.',
  },
  {
    icon: <Scale className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Cadre légal',
    description: 'RGPD et règlement européen sur l’IA : ce qu’il faut vérifier avant de généraliser.',
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Optimisation continue',
    description: 'Mesurer, ajuster et faire évoluer les usages dans le temps.',
  },
];

const workSources = [
  { label: "Règlement (UE) 2024/1689 sur l'IA (AI Act)", href: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj' },
  { label: "Règlement (UE) 2026/1744 (omnibus IA)", href: 'https://eur-lex.europa.eu/eli/reg/2026/1744' },
  { label: 'Règlement (UE) 2016/679 (RGPD)', href: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' },
  { label: "CNIL\u00A0: IA et conformité au RGPD", href: 'https://www.cnil.fr/fr/intelligence-artificielle/ia-comment-etre-en-conformite-avec-le-rgpd' },
  { label: "Commission européenne\u00A0: règlement sur l'IA", href: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
];

const module1Data = [
  {
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    title: 'Environnement professionnel',
    items: [
      'Repérer les tâches répétitives de votre poste',
      'Évaluer le gain réel avant de généraliser',
      'Cartographier les processus concernés',
      'Identifier les données manipulées et leur sensibilité',
      "Définir un objectif mesurable d'amélioration",
    ],
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: 'Collaboration et équipe',
    items: [
      'Former les collaborateurs aux usages et aux limites',
      "Partager les bonnes pratiques et les demandes efficaces",
      'Accompagner le changement, y compris les réticences',
      'Expliquer clairement ce qui est permis et interdit',
      'Recueillir les retours des utilisateurs',
    ],
  },
  {
    icon: <Target className="h-5 w-5 text-primary" />,
    title: "Stratégie d'adoption",
    items: [
      'Avancer par petites étapes, avec un cas pilote',
      'Tester et valider les outils avant de les déployer',
      'Mesurer le temps gagné et la qualité obtenue',
      'Ajuster ou arrêter ce qui ne fonctionne pas',
      'Planifier la revue régulière des usages',
    ],
  },
];

const module2Data = [
  {
    icon: <MessageSquare className="h-5 w-5 text-primary" />,
    title: 'Communication assistée',
    items: [
      "Rédaction et reformulation d'e-mails",
      'Plan et supports de présentation',
      'Relecture et amélioration du style',
      'Traduction, à relire par un locuteur si l’enjeu est important',
      'Synthèse de réunions à partir de notes anonymisées',
    ],
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: 'Gestion documentaire',
    items: [
      "Résumé de documents dont vous avez le droit d'utiliser le contenu",
      "Extraction d'informations à vérifier dans la source",
      'Aide à la classification et au tri',
      'Recherche dans des documents internes (avec un outil validé)',
      'Premières versions de rapports, à relire',
    ],
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-primary" />,
    title: 'Analyse et décision',
    items: [
      'Explication de formules et de graphiques',
      'Repérage de tendances à confirmer par les données',
      "Aide à la préparation d'une décision (elle reste humaine)",
      'Scénarios et hypothèses à discuter',
      'Idées pour simplifier un processus',
    ],
  },
];

const promptExamples = [
  {
    task: 'Répondre à un e-mail',
    prompt:
      "Rédige une réponse professionnelle et courtoise au message ci-dessous, en 5 lignes maximum, avec une proposition de rendez-vous.\n[Collez uniquement le texte, sans nom ni donnée client.]",
  },
  {
    task: 'Résumer une réunion',
    prompt:
      "Voici mes notes de réunion, anonymisées. Résume-les en 5 points, puis liste les actions avec un responsable et une échéance à confirmer.",
  },
  {
    task: 'Comprendre une formule de tableur',
    prompt: 'Explique pas à pas cette formule de tableur, puis propose une version plus simple si elle existe : [formule]',
  },
  {
    task: 'Relire un texte',
    prompt:
      'Relis ce paragraphe : signale les fautes, les ambiguïtés et les phrases trop longues, sans changer le sens. Ne réécris rien avant que je le demande.',
  },
  {
    task: 'Préparer une présentation',
    prompt:
      'Propose un plan de présentation de 10 minutes sur [sujet] pour un public non spécialiste, avec un message clé par diapositive.',
  },
];

const UtiliserIATravail = () => (
  <CourseGuideLayout
    title={headerProps.title}
    subtitle={headerProps.subtitle}
    about={[
      "L’IA générative est désormais présente au travail. Bien utilisée, elle accélère des tâches répétitives ; mal encadrée, elle expose à des fuites de données, à des erreurs convaincantes et à des risques juridiques.",
      "Ce cours propose une méthode pour choisir les usages, protéger les données, vérifier les résultats et mesurer les gains avant de généraliser.",
    ]}
    learn={[
      "Repérer les tâches où l’IA fait réellement gagner du temps.",
      "Protéger les données et respecter les règles de son organisation.",
      "Formuler des demandes précises et vérifier les résultats.",
      "Connaître les principaux textes applicables (RGPD, règlement européen sur l’IA).",
      "Mesurer, ajuster et faire évoluer ses usages.",
    ]}
    plan={plan}
    info={{
      level: headerProps.level,
      duration: headerProps.duration,
      prerequisites: 'Travailler en organisation ; aucune compétence de programmation requise.',
      contents: ['5 modules', '1 quiz de fin de cours', 'Sources citées', 'Bilan et pistes de mise en œuvre'],
      audience: headerProps.audience,
      tags: headerProps.tags,
    }}
    related={[
      {
        to: '/cours/ia-entreprise',
        title: "IA pour l'entreprise",
        description: 'Stratégie, retour sur investissement et mise en œuvre à l’échelle de l’organisation.',
      },
      {
        to: '/cours/prompt-engineering',
        title: 'Prompt engineering',
        description: 'Formuler ses demandes pour obtenir de meilleures réponses.',
      },
      {
        to: '/cours/ia-ethique',
        title: 'IA éthique et responsable',
        description: 'Biais, transparence, protection des données.',
      },
      {
        to: '/calculateur-couts-ia',
        title: "Calculateur de coûts d'API IA",
        description: "Estimer le coût d'un usage avant de s'abonner.",
      },
    ]}
  >
      <CourseModule
        title="Introduction"
        description="Les outils d'IA générative sont désormais courants au travail. Ce cours aide à en tirer parti sans en subir les risques."
      >
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              Bien utilisée, l'IA fait gagner du temps sur des tâches répétitives : premiers jets, reformulations,
              résumés, explications. Mal encadrée, elle expose à des fuites de données, à des erreurs présentées avec
              assurance et à des risques juridiques.
            </p>
            <p className="mb-4">
              Ce cours s'adresse aux professionnels qui veulent une méthode : choisir les bons usages, protéger les
              informations de leur organisation, garder la responsabilité de leur travail et mesurer ce que l'IA
              apporte vraiment.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4" />
                Objectif principal
              </h4>
              <p className="text-sm">
                Intégrer l'IA à votre activité de façon progressive, mesurée et conforme aux règles de votre
                organisation.
              </p>
            </div>
          </CardContent>
        </Card>
      </CourseModule>

      <CourseModule
        title="Module 1 : Diagnostic et stratégie d'adoption"
        description="Poser les bases d'une intégration réussie de l'IA dans votre travail"
        modules={module1Data}
      />

      <CourseModule
        title="Module 2 : Applications concrètes"
        description="Des usages courants et des exemples de demandes à adapter à votre métier"
        modules={module2Data}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Exemples de demandes utiles (à adapter)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Une bonne demande précise la tâche, le contexte, le format attendu et ce que l'IA ne doit pas faire.
              Remplacez ce qui est entre crochets, et n'ajoutez jamais de données personnelles ou confidentielles dans un
              outil qui n'est pas validé par votre organisation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promptExamples.map((example) => (
                <div key={example.task} className="rounded-lg border p-4">
                  <h5 className="font-medium mb-2">{example.task}</h5>
                  <p className="text-sm bg-muted rounded p-3 whitespace-pre-wrap wrap-break-word">{example.prompt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CourseModule>

      <CourseModule
        title="Module 3 : Gestion et gouvernance de l'IA"
        description="Un cadre simple pour une utilisation responsable"
      >
        <div className="space-y-6">
          <DoDontCard
            title="Sécurité et confidentialité"
            icon={<Shield className="h-5 w-5 text-primary" />}
            doTitle="Bonnes pratiques"
            dontTitle="Risques à éviter"
            dos={[
              "Utiliser des outils validés par votre organisation",
              'Anonymiser ou résumer avant de soumettre un texte',
              "Relire et vérifier tout ce que produit l'IA",
              'Former les équipes aux risques et aux règles',
              'Contrôler régulièrement les accès et les abonnements',
            ]}
            donts={[
              'Coller des données confidentielles ou personnelles dans un outil grand public',
              'Confier une décision importante à un résultat non vérifié',
              "Signer ou envoyer un contenu généré sans l'avoir relu",
              'Contourner les règles internes pour aller plus vite',
              "Devenir dépendant d'un outil sans solution de repli",
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Gouvernance et contrôle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li>• Politique d'usage claire et connue de tous</li>
                  <li>• Personne référente pour les questions et les incidents</li>
                  <li>• Liste des outils autorisés et de leurs usages permis</li>
                  <li>• Processus de validation pour les nouveaux outils</li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li>• Suivi du temps gagné et des erreurs constatées</li>
                  <li>• Procédure en cas de fuite ou d'erreur importante</li>
                  <li>• Formation continue des équipes</li>
                  <li>• Veille technique et réglementaire</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </CourseModule>

      <CourseModule
        title="Module 4 : Cadre légal et règles internes"
        description="Les principaux textes à connaître avant de généraliser un usage. Ce cours ne remplace pas un avis juridique."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-primary" />
                Données et confidentialité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Saisir des données personnelles (clients, salariés, patients) dans un outil grand public revient à les transmettre à un tiers : sans base légale ni contrat adapté, c'est un risque de non-conformité au RGPD. Réservez-les aux outils validés par votre organisation.</li>
                <li>• Une offre professionnelle peut prévoir un contrat de sous-traitance, l'hébergement des données et l'exclusion de l'entraînement sur vos contenus : à vérifier.</li>
                <li>• Vos obligations de confidentialité (contrat, secret professionnel) restent valables.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-primary" />
                Propriété intellectuelle et responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Un contenu généré peut ressembler à des œuvres existantes : vérifiez les droits avant de le publier.</li>
                <li>• Vous restez responsable de ce que vous signez ou envoyez, même si l'IA l'a rédigé.</li>
                <li>• Indiquez l'usage d'une IA quand votre employeur, un client ou la réglementation l'exige.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-primary" />
                Règlement européen sur l'IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• L'article 4 du règlement s'applique depuis le 2 février 2025 : les fournisseurs et les déployeurs de systèmes d'IA, dont les employeurs qui en utilisent, doivent prendre des mesures pour développer la maîtrise de l'IA de leur personnel. Dans sa rédaction issue de l'omnibus numérique (règlement (UE) 2026/1744, en vigueur le 27 juillet 2026), le texte parle de mesures « pour soutenir » cette maîtrise et n'impose pas de niveau précis. Les déployeurs de systèmes à haut risque doivent en plus s'assurer que les personnes chargées de la supervision humaine sont formées.</li>
                <li>• Certaines pratiques sont interdites, comme la détection des émotions des salariés (sauf raisons médicales ou de sécurité).</li>
                <li>• Des obligations de transparence s'appliquent : informer une personne qu'elle échange avec une IA, marquer les contenus générés (obligation qui pèse surtout sur les fournisseurs) et signaler les hypertrucages. Le règlement est applicable depuis le 2 août 2026, avec des exceptions et des délais pour certains cas, et son calendrier a été modifié en 2026 (omnibus numérique sur l'IA) : vérifiez les dates en vigueur sur le site de la Commission européenne.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
          <h4 className="font-medium flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4" />
            L'« IA fantôme » (shadow AI)
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Quand l'organisation ne fournit aucun outil validé, certains salariés en utilisent un de leur côté, avec
            des données de travail. Mieux vaut demander un outil validé et une règle claire que d'improviser : des
            informations saisies dans un outil non validé échappent au contrôle de l'organisation, ce qui est un risque
            de fuite de données.
          </p>
        </div>
      </CourseModule>

      <CourseModule
        title="Module 5 : Optimisation continue et évolution"
        description="Mesurer, ajuster et faire évoluer vos usages dans le temps"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Mesurer et améliorer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Comparer le temps passé avec et sans l'outil sur quelques tâches types</li>
                <li>• Relever les erreurs et les retouches nécessaires</li>
                <li>• Garder les demandes qui fonctionnent dans une bibliothèque partagée</li>
                <li>• Simplifier les processus avant de les automatiser</li>
                <li>• Arrêter un usage qui ne tient pas ses promesses</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Évolution et mise à jour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Suivre les évolutions des outils et de leurs conditions d'usage</li>
                <li>• Tester de nouveaux outils sur des données non sensibles</li>
                <li>• Réviser la politique d'usage au moins une fois par an</li>
                <li>• Adapter la formation aux nouveaux outils et aux nouvelles règles</li>
                <li>• Recueillir les retours des équipes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CourseModule>

      <ClassicCourseQuiz slug="utiliser-ia-travail" />

      <CourseConclusion
        title="Conclusion : utiliser l'IA au travail avec discernement"
        description="Des usages choisis, mesurés et encadrés"
        learningPoints={[
          'Repérer les tâches où l’IA fait réellement gagner du temps',
          'Protéger les données et respecter les règles de son organisation',
          'Formuler des demandes précises et vérifier les résultats',
          'Connaître les principaux textes applicables (RGPD, règlement européen sur l’IA)',
          'Mesurer, ajuster et faire évoluer ses usages',
        ]}
        nextSteps={[
          'Demander à votre organisation quels outils sont autorisés',
          'Tester un cas pilote sur une tâche non sensible',
          'Constituer une bibliothèque de demandes efficaces',
          'Approfondir avec les cours sur le prompt engineering et l’IA en entreprise',
        ]}
      />

      <CourseSources sources={workSources} />
  </CourseGuideLayout>
);

export default UtiliserIATravail;
