// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import CourseModule from '@/components/courses/CourseModule';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import ClassicCourseQuiz from '@/components/courses/ClassicCourseQuiz';
import ZoomOn from '@/components/courses/ZoomOn';
import DidYouKnow from '@/components/courses/DidYouKnow';
import ExpandableSection from '@/components/courses/ExpandableSection';
import InteractiveExample from '@/components/courses/InteractiveExample';
import InfoTooltip from '@/components/courses/InfoTooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AUTHOR_TITLE } from '@/config/site';
import { 
  Building2, 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign, 
  Shield,
  Lightbulb,
  BarChart3,
  Cog,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Database,
  Network,
  Zap,
  Globe,
  Settings,
  Factory,
  ShoppingCart,
  FileText,
  Calculator,
  type LucideIcon
} from 'lucide-react';

interface SectorOverview {
  icon: LucideIcon;
  title: string;
  uses: string[];
  watch: string[];
}

/** Usages courants par secteur. Aucun gain chiffré : ils varient trop selon le contexte et la mesure. */
const sectors: SectorOverview[] = [
  {
    icon: Building2,
    title: 'Services financiers',
    uses: [
      'Détection de fraude à partir des transactions',
      'Aide au scoring de crédit, sous contrôle humain',
      'Assistants pour les conseillers et les clients',
      'Analyse de documents pour la conformité',
    ],
    watch: [
      'Les décisions automatisées qui touchent des personnes sont encadrées (RGPD, règlement européen sur l\'IA)',
      'Biais et explicabilité des modèles de scoring',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Commerce et e-commerce',
    uses: [
      'Recommandations de produits',
      'Prévision de la demande et gestion des stocks',
      'Personnalisation des messages et des offres',
      'Assistance client et conseil en ligne',
    ],
    watch: [
      'Données personnelles et consentement',
      'Effets de la personnalisation sur les prix et les choix du client',
    ],
  },
  {
    icon: Factory,
    title: 'Industrie',
    uses: [
      'Maintenance prédictive à partir de capteurs',
      'Contrôle qualité par vision par ordinateur',
      "Optimisation de la consommation d'énergie",
      'Planification de la production et de la logistique',
    ],
    watch: [
      "Qualité et historique des données de capteurs",
      'Sécurité des systèmes et rôle des opérateurs',
    ],
  },
];

const plan: CoursePlanItem[] = [
  { icon: <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Stratégie IA', description: 'Relier les cas d’usage aux objectifs et aux contraintes de l’organisation.' },
  { icon: <Cog className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Mise en œuvre', description: 'Données, architecture, intégration et conduite du changement.' },
  { icon: <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Cas d’usage sectoriels', description: 'Usages courants et points de vigilance dans trois secteurs.' },
  { icon: <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Valeur et pilotage', description: 'Mesurer les gains, les coûts et les risques avant de généraliser.' },
];

const businessSources = [
  { label: 'RAND Corporation (2024)\u00A0: The Root Causes of Failure for AI Projects', href: 'https://www.rand.org/pubs/research_reports/RRA2680-1.html' },
  { label: 'NIST\u00A0: AI Risk Management Framework 1.0 (2023)', href: 'https://www.nist.gov/itl/ai-risk-management-framework' },
  { label: "ISO/IEC 42001:2023\u00A0: systèmes de management de l'IA", href: 'https://www.iso.org/standard/42001' },
  { label: 'CNIL\u00A0: IA et conformité au RGPD', href: 'https://www.cnil.fr/fr/intelligence-artificielle/ia-comment-etre-en-conformite-avec-le-rgpd' },
  { label: "Commission européenne\u00A0: règlement sur l'IA", href: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
];

const IAEntreprise = () => {
  const headerProps = {
    title: "IA en entreprise\u00A0: stratégie et mise en œuvre",
    subtitle: "Structurer un projet d'IA\u00A0: stratégie, cas d'usage, ROI, conduite du changement et gouvernance",
    author: "Geoffroy Streit",
    authorDescription: AUTHOR_TITLE,
    duration: "4 à 5 heures",
    level: "Intermédiaire à avancé",
    audience: "Dirigeants, managers, consultants et chefs de projet",
    tags: ["IA Entreprise", "Stratégie", "ROI", "Gouvernance"]
  };

  const strategicApproachSteps = [
    {
      title: "Audit de maturité digitale",
      description: "Évaluer l'état actuel de votre infrastructure et de vos processus",
      result: "Score de maturité et identification des écarts technologiques"
    },
    {
      title: "Identification des cas d'usage",
      description: "Cartographier les opportunités d'amélioration par l'IA",
      result: "Liste priorisée de 5-10 cas d'usage avec impact potentiel"
    },
    {
      title: "Calcul du ROI prévisionnel",
      description: "Estimer les bénéfices et coûts de chaque initiative",
      result: "Dossier d'investissement détaillé avec calendrier de retour sur investissement"
    },
    {
      title: "Roadmap de déploiement",
      description: "Planifier l'implémentation par phases",
      result: "Calendrier sur 18 à 24 mois avec jalons et indicateurs de succès"
    }
  ];

  const module1Data = [
    {
      icon: <Target className="h-5 w-5 text-primary" />,
      title: "Diagnostic stratégique approfondi",
      items: [
        "Évaluation de la maturité digitale (niveau 1-5)",
        "Identification des cas d'usage prioritaires",
        "Analyse de l'écosystème concurrentiel",
        "Cartographie des ressources disponibles",
        "Définition des objectifs stratégiques SMART",
        "Évaluation des risques et des opportunités"
      ]
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
      title: "Dossier d'investissement et calcul du ROI",
      items: [
        "Méthodologie de calcul ROI spécifique IA",
        "Indicateurs de performance clés",
        "Analyse coûts-bénéfices détaillée",
        "Modèles de financement et budgétisation",
        "Présentation aux décideurs et comité de direction",
        "Outils de simulation financière"
      ]
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Conduite du changement et adoption",
      items: [
        "Stratégie de gestion de la résistance",
        "Programme de formation multi-niveaux",
        "Communication interne et ambassadeurs",
        "Accompagnement utilisateurs et support",
        "Développement d'une culture de la donnée",
        "Mesure de l'adoption et ajustements"
      ]
    }
  ];

  const didYouKnowItems = [
    {
      title: "Pourquoi tant de projets échouent",
      content: "Par certaines estimations relayées dans un rapport de la RAND Corporation (2024), plus de 80\u00A0% des projets d'IA n'atteignent pas leurs objectifs, soit environ le double des projets informatiques classiques. Les causes citées sont surtout humaines et organisationnelles\u00A0: problème mal défini, données inadaptées, attention portée à la technologie plutôt qu'au besoin."
    },
    {
      title: "Commencer petit",
      content: "Un pilote limité (un produit minimal, un périmètre restreint) permet de mesurer la valeur et les risques avant d'investir davantage. C'est l'approche souvent recommandée, plutôt qu'un déploiement massif d'emblée."
    },
    {
      title: "Les données avant le modèle",
      content: "Une grande part du travail d'un projet d'IA consiste à rassembler, nettoyer et documenter les données, bien plus qu'à choisir un modèle. Cartographier ses données (où elles sont, qui en est responsable, leur qualité) est une première étape utile."
    },
    {
      title: "Des chiffres à manier avec prudence",
      content: "Les gains «\u00A0moyens\u00A0» publiés par des éditeurs ou des cabinets varient fortement selon le secteur, la méthode de mesure et l'intérêt de celui qui les publie. Ils ne remplacent pas un calcul fondé sur votre propre situation de départ."
    }
  ];

  return (
    <CourseGuideLayout
      title={headerProps.title}
      subtitle={headerProps.subtitle}
      about={[
        "L’IA en entreprise n’est pas un projet de modèle isolé : c’est un changement de processus, de données et de responsabilités. La valeur dépend autant de l’usage choisi que de la technologie.",
        "Ce cours propose une méthode pour relier un cas d’usage à un objectif, estimer les coûts et les risques, puis piloter le déploiement.",
      ]}
      learn={[
        "Distinguer un cas d’usage utile d’une démonstration séduisante.",
        "Construire une stratégie alignée sur les objectifs de l’organisation.",
        "Identifier les données, l’architecture et les compétences nécessaires.",
        "Mesurer la valeur et les risques avant de généraliser.",
      ]}
      plan={plan}
      info={{
        level: headerProps.level,
        duration: headerProps.duration,
        prerequisites: 'Connaître son organisation et ses processus ; aucun code requis.',
        contents: ['4 modules', '1 quiz de fin de cours', 'Sources citées', 'Bilan et liens liés'],
        audience: headerProps.audience,
        tags: headerProps.tags,
      }}
      related={[
        { to: '/cours/ia-marketing-vente', title: "L'IA pour le marketing et la vente", description: 'Personnalisation, prédiction, automatisation et chatbots : usages et points de vigilance.' },
        { to: '/cours/utiliser-ia-travail', title: "Utiliser l'IA au travail", description: 'Cadre d’usage, confidentialité, RGPD et règlement européen sur l’IA.' },
        { to: '/calculateur-couts-ia', title: "Calculateur de coûts d'API IA", description: 'Estimer le coût des API avant de se lancer.' },
        { to: '/cours/ia-ethique', title: 'IA éthique et responsable', description: 'Biais, transparence et responsabilité.' },
      ]}
    >
        {/* Introduction enrichie */}
        <CourseModule
          title="Introduction : L'IA comme levier de transformation stratégique"
          description="Comprendre les enjeux business et les opportunités concrètes de l'IA en entreprise"
        >
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <AlertDescription>
              <strong>Objectif pédagogique :</strong> À la fin de ce module, vous saurez évaluer le potentiel de l'IA 
              pour votre organisation et identifier les gains rapides pour commencer votre transformation.
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Pourquoi l'IA maintenant ?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    L'intelligence artificielle est désormais une technologie courante. Elle peut devenir un enjeu
                    stratégique pour rester compétitif, mais l'intérêt dépend du secteur et de l'usage visé : c'est à
                    évaluer au cas par cas, ce n'est pas une règle générale.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Maturité des outils, à vérifier sur votre cas</li>
                    <li>• Coût réel des API et de l'intégration, à chiffrer</li>
                    <li>• Compétences disponibles ou à former</li>
                    <li>• Pression concurrentielle dans votre secteur</li>
                  </ul>
                </div>
                <Card className="bg-muted/40">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3">Ce que disent (et ne disent pas) les études</h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>
                        • Par certaines estimations, plus de 80 % des projets d'IA échouent, soit environ le double
                        des projets informatiques classiques (rapport RAND, 2024).
                      </li>
                      <li>
                        • Les causes les plus citées sont humaines et organisationnelles : besoin mal défini, données
                        inadaptées, attention portée à la technologie plutôt qu'au problème.
                      </li>
                      <li>
                        • Les chiffres de gains « moyens » varient tellement d'une source à l'autre qu'ils ne
                        remplacent pas un calcul sur votre situation.
                      </li>
                    </ul>
                    <a
                      href="https://www.rand.org/pubs/research_reports/RRA2680-1.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-primary hover:underline"
                    >
                      Lire le rapport de la RAND (2024)
                    </a>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
              
          <ZoomOn title="L'IA comme levier de transformation">
            <div className="space-y-4">
              <p className="mb-3">
                L'IA peut aider une entreprise à tirer parti de ses données, à condition qu'elles soient disponibles,
                documentées et utilisables. Elle ne remplace pas la stratégie : elle peut outiller l'analyse et la
                décision.
              </p>
              
              <ExpandableSection 
                title="Quatre leviers de valeur souvent cités"
                icon={<TrendingUp className="h-4 w-4" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <h5 className="font-medium mb-2">1. Efficacité opérationnelle</h5>
                      <p className="text-sm text-muted-foreground">Automatisation des tâches répétitives, optimisation des processus</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <h5 className="font-medium mb-2">2. Innovation produit/service</h5>
                      <p className="text-sm text-muted-foreground">Nouvelles fonctionnalités, personnalisation, expérience client</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <h5 className="font-medium mb-2">3. Aide à la décision</h5>
                      <p className="text-sm text-muted-foreground">Analyses prédictives, analyses fondées sur les données, optimisation</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <h5 className="font-medium mb-2">4. Nouveaux modèles économiques</h5>
                      <p className="text-sm text-muted-foreground">Services fondés sur les données, services IA, plateformes</p>
                    </CardContent>
                  </Card>
                </div>
              </ExpandableSection>

              <p className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm">
                <strong>Point clé :</strong> L'IA est souvent plus utile lorsqu'elle outille l'humain et lui permet de
                se concentrer sur des tâches à plus haute valeur ajoutée, plutôt que lorsqu'elle le remplace.
              </p>
            </div>
          </ZoomOn>

          <InteractiveExample
            title="Exemple fictif : transformation d'une PME industrielle"
            description="Suivons le parcours imaginaire d'une PME fictive de 150 salariés spécialisée dans l'usinage de précision"
            steps={strategicApproachSteps}
            finalMessage="La démarche est la même quelle que soit la taille de l'entreprise : diagnostiquer, choisir peu de cas d'usage, chiffrer prudemment les gains attendus, puis déployer par étapes en mesurant. Les résultats réels dépendent du contexte : aucun chiffre n'est à généraliser."
          />
        </CourseModule>

        {/* Module 1 enrichi */}
        <CourseModule
          title="Module 1 : Élaborer sa stratégie IA"
          description="Méthodologie complète pour construire une stratégie IA alignée sur vos objectifs business"
          modules={module1Data}
        />

        <div className="max-w-4xl mx-auto mb-12">
          <ExpandableSection 
            title="Évaluer la maturité de son organisation" 
            icon={<Target className="h-4 w-4" />}
          >
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Avant de définir votre stratégie, évaluez votre niveau de maturité actuel. Voici trois dimensions parmi les plus courantes, à adapter à votre contexte :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Données & Infrastructure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span>Niveau 1 :</span>
                      <span>Données en silos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niveau 3 :</span>
                      <span>Data warehouse centralisé</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niveau 5 :</span>
                      <span>Data mesh & temps réel</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Talents & Compétences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span>Niveau 1 :</span>
                      <span>Pas de compétences IA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niveau 3 :</span>
                      <span>Équipe IA dédiée</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niveau 5 :</span>
                      <span>IA intégrée partout</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Gouvernance & Processus
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span>Niveau 1 :</span>
                      <span>Aucune gouvernance</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niveau 3 :</span>
                      <span>Comité IA établi</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niveau 5 :</span>
                      <span>IA intégrée dès la conception</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <InfoTooltip content="La durée d'un audit complet varie selon la taille de l'organisation : de quelques jours à plusieurs semaines" />
                <AlertDescription className="ml-6">
                  <strong>Conseil pratique :</strong> Commencez par un auto-diagnostic rapide, puis faites appel 
                  à un consultant externe pour une évaluation objective avant de lancer des projets importants.
                </AlertDescription>
              </Alert>
            </div>
          </ExpandableSection>

          <ExpandableSection 
            title="Estimer le ROI d'un projet d'IA (formule simplifiée)" 
            icon={<Calculator className="h-4 w-4" />}
          >
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Utilisez cette formule simplifiée pour estimer le ROI d'un projet. Les deux exemples ci-dessous sont fictifs : leurs chiffres servent uniquement à illustrer le calcul.
              </p>
              
              <Card className="bg-blue-50 dark:bg-blue-950/30">
                <CardContent className="pt-4">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-mono">
                      ROI = ((Gains - Coûts) / Coûts) × 100
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Gains</strong> = Économies + Revenus supplémentaires + Gains de productivité</p>
                      <p><strong>Coûts</strong> = Développement + Licence + Formation + Maintenance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Exemple fictif : chatbot de service client</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Économies : 200 k€/an (agents)</li>
                    <li>• Revenus : +50 k€/an (satisfaction)</li>
                    <li>• Coûts : 150 k€ (développement + 1ère année)</li>
                    <li>• <strong>ROI année 1 : 67 %</strong></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Exemple fictif : maintenance prédictive</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Économies : 500 k€/an (pannes évitées)</li>
                    <li>• Productivité : +300 k€/an</li>
                    <li>• Coûts : 400 k€ (solution + formation)</li>
                    <li>• <strong>ROI année 1 : 100 %</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </ExpandableSection>
        </div>

        <DidYouKnow items={didYouKnowItems} />

        {/* Module 2 enrichi */}
        <CourseModule
          title="Module 2 : Mise en œuvre opérationnelle et architecture"
          description="De la stratégie à l'exécution : construire et déployer vos solutions IA"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Indicateurs à suivre
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">Décidez-les avant le lancement, avec la situation de départ :</p>
                <ul className="space-y-1">
                  <li>• Adoption : part des utilisateurs qui s'en servent réellement</li>
                  <li>• Qualité mesurée sur un échantillon relu par des humains</li>
                  <li>• Délai et coût réels comparés au budget</li>
                  <li>• Gain mesuré par rapport à la situation de départ</li>
                  <li>• Incidents : erreurs, réclamations, fuites de données</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Points d'attention critiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Qualité et gouvernance des données</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span>Résistance au changement des utilisateurs</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Sous-estimation des coûts de maintenance</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-5 w-5 text-primary" />
                  Infrastructure et gouvernance avancée
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary">Architecture technique</Badge>
                  <ul className="text-sm space-y-2">
                    <li>• Architecture cloud hybride et edge computing</li>
                    <li>• MLOps et pipelines de déploiement automatisés</li>
                    <li>• Gouvernance des données et data lineage</li>
                    <li>• Sécurité et conformité (RGPD, sectorielles)</li>
                    <li>• Monitoring et observabilité des modèles</li>
                    <li>• Intégration API et microservices</li>
                  </ul>
                  
                  <ExpandableSection title="Détails techniques architecture">
                    <div className="space-y-3 text-xs">
                      <div>
                        <h6 className="font-medium">Exemples d'outils courants :</h6>
                        <ul className="mt-1 space-y-1">
                          <li>• Cloud : AWS/Azure/GCP avec Kubernetes</li>
                          <li>• Plateforme ML : MLflow, Kubeflow ou Databricks</li>
                          <li>• Supervision : Prometheus + Grafana + Evidently</li>
                          <li>• Données : Apache Airflow + dbt + Snowflake</li>
                        </ul>
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Stratégie de déploiement et montée en charge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary">Méthodologie agile</Badge>
                  <ul className="text-sm space-y-2">
                    <li>• Produit minimal, puis montée en charge progressive</li>
                    <li>• Centre d'excellence IA (CoE) et communauté</li>
                    <li>• Partenariats stratégiques et écosystème</li>
                    <li>• Mesure continue et optimisation</li>
                    <li>• Plan de contingence et retour arrière</li>
                    <li>• Formation continue et montée en compétences</li>
                  </ul>

                  <ExpandableSection title="Roadmap de montée en charge (exemple indicatif, à adapter)">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b">
                        <span>Phase 1 (0-6 mois)</span>
                        <span>1-2 pilotes + équipe noyau</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Phase 2 (6-12 mois)</span>
                        <span>3-5 projets + CoE établi</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Phase 3 (12-18 mois)</span>
                        <span>10+ projets + adoption large</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Phase 4 (18+ mois)</span>
                        <span>IA intégrée + innovation continue</span>
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
              </CardContent>
            </Card>
          </div>
        </CourseModule>

        {/* Module 3 enrichi avec plus de détails sectoriels */}
        <CourseModule
          title="Module 3 : Cas d'usage par secteur"
          description="Des usages courants de l'IA dans trois secteurs, et les points de vigilance associés"
        >
          <Alert className="mb-6">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription>
              <strong>À lire avec prudence :</strong> cette section présente des usages courants par secteur, sans
              chiffre de performance. Les gains que l'on lit ici ou là (éditeurs, cabinets, communiqués) varient
              énormément selon le contexte et la méthode de mesure : demandez toujours la situation de départ, la durée
              et la façon dont le gain a été calculé.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sectors.map((sector) => (
              <Card key={sector.title}>
                <CardContent className="pt-6">
                  <sector.icon className="h-10 w-10 text-primary mb-4" aria-hidden="true" />
                  <h4 className="font-medium mb-3">{sector.title}</h4>
                  <h5 className="text-sm font-medium mb-2">Usages courants</h5>
                  <ul className="text-sm space-y-1 mb-4">
                    {sector.uses.map((use) => (
                      <li key={use}>• {use}</li>
                    ))}
                  </ul>
                  <h5 className="text-sm font-medium mb-2">Points de vigilance</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {sector.watch.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <ExpandableSection 
            title="Comment choisir votre premier cas d'usage ?" 
            icon={<Target className="h-4 w-4" />}
            defaultExpanded
          >
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Le succès de votre transformation IA dépend en grande partie du choix de votre premier projet. 
                Voici des critères de sélection couramment utilisés :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Critères de sélection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Impact business</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">Élevé</span>
                        <InfoTooltip content="Un gain qui justifie l'effort, chiffré avec la direction financière à partir de votre situation de départ" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Faisabilité technique</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">Moyenne à élevée</span>
                        <InfoTooltip content="Technologies matures, données disponibles, équipe compétente" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Résistance au changement</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">Faible</span>
                        <InfoTooltip content="Utilisateurs motivés, sponsor fort, processus non critique" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Temps de déploiement</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">Quelques mois</span>
                        <InfoTooltip content="Pour démontrer la valeur rapidement et maintenir l'engagement" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Premiers cas d'usage souvent cités</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Assistant conversationnel pour la FAQ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Classification automatique de documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Détection d'anomalies simples</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Recommandations produits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Prédiction de la demande</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ExpandableSection>
        </CourseModule>

        <ClassicCourseQuiz slug="ia-entreprise" />

        <CourseSources sources={businessSources} />

        {/* Conclusion enrichie */}
        <CourseConclusion
          title="Conclusion : Vers une entreprise augmentée par l'IA"
          description="Récapitulatif de votre parcours et feuille de route pour l'action"
          learningPoints={[
            "Élaborer une stratégie IA alignée sur les objectifs business, en évaluant la maturité de son organisation",
            "Estimer et présenter le ROI de vos projets IA avec prudence",
            "Gérer la transformation organisationnelle et la conduite du changement",
            "Connaître les bases d'une architecture et d'une gouvernance des données solides",
            "Déployer et faire évoluer vos solutions IA avec une approche agile",
            "Choisir les bons cas d'usage et mesurer les résultats"
          ]}
          nextSteps={[
            "Réaliser un audit de maturité IA complet de votre organisation",
            "Identifier et prioriser quelques cas d'usage, avec un calcul de ROI prudent",
            "Constituer votre équipe projet IA et définir la gouvernance",
            "Lancer un pilote avec mesure d'impact et retours utilisateurs",
            "Développer votre centre d'excellence IA et plan de montée en charge",
            "Établir un programme de formation et de montée en compétences"
          ]}
        />

        <Alert className="mb-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <AlertDescription>
            <strong>Pour aller plus loin :</strong> estimez vos coûts d'API avec le calculateur du site, puis
            consultez le cours « Utiliser l'IA au travail » pour le cadre juridique (RGPD, règlement européen sur
            l'IA) et les règles de confidentialité.
          </AlertDescription>
        </Alert>

    </CourseGuideLayout>
  );
};

export default IAEntreprise;
