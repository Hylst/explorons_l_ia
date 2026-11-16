// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import CourseModule from '@/components/courses/CourseModule';
import LessonSection from '@/components/courses/LessonSection';
import ZoomOn from '@/components/courses/ZoomOn';
import CodeExample from '@/components/courses/CodeExample';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import DidYouKnow from '@/components/courses/DidYouKnow';
import TechnicalTooltip from '@/components/courses/TechnicalTooltip';
import AnalogyBox from '@/components/courses/AnalogyBox';
import OptimizationStep from '@/components/courses/OptimizationStep';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Target, 
  MessageSquare, 
  Lightbulb, 
  Zap, 
  Settings,
  CheckCircle2,
  TrendingUp,
  Users,
  Rocket,
  Eye,
  Microscope,
  Layers,
  Network,
  Cpu,
  Database,
  Code,
  BarChart3,
  Award,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  DollarSign,
  Shield,
  Lock,
  Unlock,
  Key,
  Puzzle,
  Workflow
} from 'lucide-react';

const plan: CoursePlanItem[] = [
  { icon: <Brain className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Comment un modèle lit un prompt', description: 'Tokens, contexte, génération et biais : ce qui influence la réponse.' },
  { icon: <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Techniques avancées', description: 'Few-shot, chaîne de pensée, arbre de pensées et vérification.' },
  { icon: <Settings className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Optimisation systématique', description: 'Définir des critères, comparer des variantes et mesurer.' },
  { icon: <Users className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Prompts sectoriels', description: 'Adapter la méthode à un métier et à un public.' },
  { icon: <Rocket className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Outils et plateformes', description: 'Tester, versionner et documenter ses prompts.' },
];

const promptSources = [
  { label: 'Vaswani et al. (2017)\u00A0: Attention Is All You Need', href: 'https://arxiv.org/abs/1706.03762' },
  { label: 'Brown et al. (2020)\u00A0: Language Models are Few-Shot Learners', href: 'https://arxiv.org/abs/2005.14165' },
  { label: 'Wei et al. (2022)\u00A0: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', href: 'https://arxiv.org/abs/2201.11903' },
  { label: 'Yao et al. (2023)\u00A0: Tree of Thoughts', href: 'https://arxiv.org/abs/2305.10601' },
  { label: 'Sharma et al. (2023)\u00A0: Towards Understanding Sycophancy in Language Models', href: 'https://arxiv.org/abs/2310.13548' },
  { label: 'OpenAI\u00A0: guide de prompt engineering', href: 'https://developers.openai.com/api/docs/guides/prompt-engineering' },
  { label: "Anthropic\u00A0: vue d'ensemble du prompt engineering", href: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview' },
  { label: 'Promptfoo\u00A0: annonce du rapprochement avec OpenAI (9 mars 2026)', href: 'https://www.promptfoo.dev/blog/promptfoo-joining-openai/' },
];

const promptQuizQuestions: QuizQuestion[] = [
  {
    question: "Quel élément rend un prompt plus facile à évaluer\u00A0?",
    options: [
      'Une consigne vague qui laisse le modèle libre',
      'Des critères explicites et un format de sortie attendu',
      'Un seul exemple sans contexte',
      'Une demande de réponse la plus longue possible',
    ],
    correctAnswer: 1,
    explanation: "Un prompt évaluable précise la tâche, le format et les critères de réussite. On peut alors comparer des réponses sur les mêmes bases.",
  },
  {
    question: "À quoi servent surtout les exemples few-shot\u00A0?",
    options: [
      'À garantir que la réponse est vraie',
      'À remplacer toute vérification',
      'À montrer le format et le type de raisonnement attendus',
      'À réduire le nombre de tokens à zéro',
    ],
    correctAnswer: 2,
    explanation: "Les exemples montrent une forme, un style ou une manière de traiter la tâche. Ils n'apportent aucune garantie sur l'exactitude des réponses.",
  },
  {
    question: "Que faut-il faire d'une réponse obtenue par chain-of-thought\u00A0?",
    options: [
      'La vérifier sur les sources et les faits, car un raisonnement détaillé peut être plausible mais faux',
      "La considérer comme vraie parce qu'elle détaille son raisonnement",
      'La publier sans relecture',
      'La raccourcir systématiquement',
    ],
    correctAnswer: 0,
    explanation: "Détailler un raisonnement peut aider à le suivre, pas à garantir qu'il est correct. La vérification factuelle reste nécessaire.",
  },
  {
    question: "Comment comparer deux variantes d'un prompt\u00A0?",
    options: [
      "Sur un seul exemple et à l'intuition",
      'En changeant le modèle et les exemples à chaque essai',
      'En choisissant toujours la réponse la plus longue',
      'Sur les mêmes exemples, avec des critères définis à l\u2019avance',
    ],
    correctAnswer: 3,
    explanation: "La comparaison utile garde les mêmes exemples et les mêmes critères. Sinon, la différence observée peut venir du modèle ou du cas, pas du prompt.",
  },
];

const PromptEngineering = () => {
  const didYouKnowItems = [
    {
      title: "GPT-3 et le few-shot",
      content: "Le prompt engineering s'est popularisé avec GPT-3 (2020)\u00A0: l'article «\u00A0Language Models are Few-Shot Learners\u00A0» a montré qu'un modèle pouvait apprendre une tâche à partir de quelques exemples placés dans la consigne, sans entraînement supplémentaire."
    },
    {
      title: "Le raisonnement pas à pas",
      content: "Dans l'article qui a introduit la «\u00A0chaîne de pensée\u00A0» (Wei et al., 2022), demander au modèle de détailler son raisonnement a fait passer un très grand modèle d'environ 18\u00A0% à environ 57\u00A0% de réussite sur des problèmes de mathématiques de niveau primaire (GSM8K). Les modèles plus récents raisonnent souvent d'eux-mêmes\u00A0: le gain dépend du modèle et de la tâche."
    },
    {
      title: "Tester plutôt que deviner",
      content: "Aucune formule ne marche partout. Un prompt se juge sur vos propres exemples\u00A0: c'est pourquoi ce cours insiste sur la comparaison de variantes et sur des critères d'évaluation décidés à l'avance."
    }
  ];

  const optimizationSteps = [
    { step: 1, title: "Version A", description: "Votre prompt initial de référence" },
    { step: 2, title: "Version B", description: "Variante avec modification ciblée spécifique" },
    { step: 3, title: "Test", description: "Même tâche, conditions et contexte identiques" },
    { step: 4, title: "Analyse", description: "Comparez qualité, pertinence, temps et coûts" },
    { step: 5, title: "Itération", description: "Gardez le meilleur, testez une nouvelle variante" }
  ];

  return (
    <CourseGuideLayout
      title="Le prompt engineering"
      subtitle="Concevoir et tester ses prompts"
      about={[
        "Un prompt n’est pas une formule magique : c’est une demande adressée à un modèle qui ne connaît que le contexte fourni. La formulation, les exemples et le format de sortie changent le résultat.",
        "Ce cours part du fonctionnement d’un modèle de langage, puis présente des techniques de structuration, des méthodes de comparaison et des usages sectoriels.",
      ]}
      learn={[
        "Comprendre ce qu’un modèle voit dans un prompt.",
        "Structurer une demande avec des critères et un format de sortie.",
        "Utiliser few-shot, chaîne de pensée et vérification sans en attendre une garantie.",
        "Comparer des variantes sur les mêmes exemples.",
        "Documenter et versionner ses prompts.",
      ]}
      plan={plan}
      info={{
        level: 'Débutant à intermédiaire',
        duration: '5 à 6 heures, lecture et pratique comprises',
        prerequisites: 'Utiliser un assistant IA ; aucune programmation requise.',
        contents: ['5 leçons', '1 quiz de fin de cours', 'Sources citées', 'Exemples et aide-mémoire'],
        audience: 'Toute personne qui utilise des assistants IA au travail ou dans ses projets',
        tags: ['Prompt Engineering', 'LLM', 'Optimisation', 'Productivité', 'IA'],
      }}
      related={[
        { to: '/cours/ia-creativite', title: 'IA et créativité', description: "Utiliser l'IA générative dans un processus créatif, sans remplacer le jugement humain." },
        { to: '/cours/chain-of-prompts', title: 'Le chaînage de prompts', description: "Enchaîner plusieurs prompts et vérifier le résultat à chaque étape." },
        { to: '/generateur-prompts', title: 'Générateur de prompts', description: 'Construire un prompt structuré à partir de vos objectifs.' },
      ]}
    >
        <DidYouKnow items={didYouKnowItems} />

        <CourseModule
          title="Comprendre comment un modèle lit votre prompt"
          description="Quelques notions sur le fonctionnement des modèles de langage, pour mieux formuler vos demandes"
          modules={[
            {
              icon: <Brain className="h-5 w-5" />,
              title: "Fonctionnement d'un modèle de langage",
              items: [
                "Architecture transformer et attention (en résumé)",
                "Tokenisation et limites de la fenêtre de contexte",
                "Génération token par token et part d'aléa (température)",
                "Capacités émergentes\u00A0: ce qui est établi, ce qui reste débattu"
              ]
            },
            {
              icon: <Target className="h-5 w-5" />,
              title: "Biais et limites",
              items: [
                "Hallucinations\u00A0: des réponses plausibles mais fausses",
                "Sensibilité à la formulation et à l'ordre des informations",
                "Biais reproduits depuis les données d'entraînement",
                "Tendance à abonder dans le sens de l'utilisateur"
              ]
            },
            {
              icon: <MessageSquare className="h-5 w-5" />,
              title: "Langage et contexte",
              items: [
                "Le sens d'un mot dépend de ses voisins (embeddings)",
                "Ambiguïté et implicite\u00A0: ce qu'il faut expliciter",
                "Plusieurs langues\u00A0: une qualité inégale selon la langue",
                "Registre, ton et public visé"
              ]
            }
          ]}
        />

        <LessonSection
          title="Architecture des modèles de langage modernes"
          icon={<Brain className="h-6 w-6" />}
          delay={1}
        >
          <div className="space-y-4">
            <p>
              Pour progresser en{' '}
              <TechnicalTooltip 
                term="Prompt Engineering"
                definition="Pratique consistant à concevoir, tester et ajuster des instructions pour obtenir de meilleurs résultats d'un modèle de langage"
              >
                prompt engineering
              </TechnicalTooltip>, il est utile de connaître les grands principes de fonctionnement des modèles de langage.
            </p>
            
            <AnalogyBox
              title="Analogie : L'orchestre neuronal"
              content="Imaginez un orchestre de plusieurs milliards de musiciens (les paramètres) où chacun écoute les autres. Le prompt, c'est la partition qui oriente le morceau : plus elle est claire, plus le résultat est fiable, sans jamais être garanti."
              variant="info"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Mécanisme d'attention
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <li>• <strong>Self-attention :</strong> Connexions entre tous les tokens</li>
                  <li>• <strong>Multi-head :</strong> Analyses parallèles multiples</li>
                  <li>• <strong>Masquage causal :</strong> Prédiction séquentielle</li>
                  <li>• <strong>Fenêtre contextuelle :</strong> Limitation de mémoire</li>
                </ul>
              </Card>

              <Card className="p-4 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Processus de génération
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• <strong>Tokenisation :</strong> Découpage du texte en fragments (tokens) : mots, morceaux de mots ou signes</li>
                  <li>• <strong>Embeddings :</strong> Conversion en vecteurs numériques</li>
                  <li>• <strong>Couches en cascade :</strong> Traitement hiérarchique</li>
                  <li>• <strong>Échantillonnage :</strong> Sélection probabiliste du token suivant</li>
                </ul>
              </Card>
            </div>

            <div className="bg-linear-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200 dark:border-purple-800 p-6 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
                <Microscope className="h-5 w-5" />
                Paramètres qui influencent les réponses (selon le fournisseur)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Temperature (plage variable)</h5>
                  <ul className="text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Basse : réponses stables, prévisibles</li>
                    <li>• Moyenne : équilibre courant</li>
                    <li>• Haute : plus varié, plus risqué</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Top-p (0 à 1)</h5>
                  <ul className="text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Bas : choix très restreint</li>
                    <li>• Autour de 0,9 : valeur courante</li>
                    <li>• 1 : aucun filtrage</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Max tokens</h5>
                  <ul className="text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Peu : réponses courtes (coupées si trop bas)</li>
                    <li>• Moyen : développement complet</li>
                    <li>• Élevé : longues réponses, coût accru</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </LessonSection>

        <ZoomOn title="CRYSTAL : un aide-mémoire pour structurer un prompt">
          <div className="space-y-4">
            <p className="mb-4">CRYSTAL est un aide-mémoire proposé dans ce cours (ce n'est pas un standard) : il liste les éléments qu'un bon prompt précise en général. Gardez ceux qui servent votre tâche, inutile de tous les remplir.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-3">
                <Badge className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-200 dark:border-red-700">
                  <strong>C</strong>ontext
                </Badge>
                <p className="text-sm text-card-foreground">Définition précise du contexte situationnel et métier</p>
                
                <Badge className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-700">
                  <strong>R</strong>ole
                </Badge>
                <p className="text-sm text-card-foreground">Attribution d'une expertise et personnalité spécifique</p>
              </div>
              <div className="space-y-3">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-700">
                  <strong>Y</strong>ield
                </Badge>
                <p className="text-sm text-card-foreground">Spécification du résultat attendu et format de sortie</p>
                
                <Badge className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700">
                  <strong>S</strong>tyle
                </Badge>
                <p className="text-sm text-card-foreground">Définition du ton, style et approche communicationnelle</p>
              </div>
              <div className="space-y-3">
                <Badge className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-700">
                  <strong>T</strong>ask
                </Badge>
                <p className="text-sm text-card-foreground">Instruction principale claire et non-ambiguë</p>
                
                <Badge className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-700">
                  <strong>A</strong>ugmentation
                </Badge>
                <p className="text-sm text-card-foreground">Exemples, contraintes et optimisations avancées</p>
                
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-700">
                  <strong>L</strong>imitations
                </Badge>
                <p className="text-sm text-card-foreground">Garde-fous, restrictions et validations qualité</p>
              </div>
            </div>
          </div>
        </ZoomOn>

        <LessonSection
          title="Techniques avancées de prompt engineering"
          icon={<Lightbulb className="h-6 w-6" />}
          delay={2}
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Chain of Thought (CoT) - Raisonnement explicite
              </h4>
              <p className="mb-3">
                Demander au modèle de raisonner étape par étape aide souvent sur les problèmes à plusieurs étapes (calcul, logique, planification). L'effet dépend du modèle et de la tâche : il a été mesuré sur des modèles anciens, et les modèles dits « de raisonnement » le font déjà en interne. À essayer, pas à supposer.
              </p>
              
              <CodeExample
                title="CoT pour un scénario fictif de rétention client"
                language="Prompt"
                code={`SCÉNARIO FICTIF (chiffres inventés pour l'exemple, à remplacer par vos données)
CONTEXTE : Startup SaaS B2B, 50 employés, levée Series A récente, forte croissance (200% YoY)
PROBLÉMATIQUE : Taux de churn clients à 15% (objectif < 8%), équipe customer success surchargée

Résous ce problème de rétention client étape par étape, avec une méthode de diagnostic structurée :

ÉTAPE 1 - DIAGNOSTIC ROOT CAUSE :
Analyse d'abord les données disponibles :
- Segmente les churns par profil client (taille, secteur, tenure)
- Identifie les moments critiques dans le customer journey
- Corrèle avec les interactions customer success
- Évalue le health score des clients restants

ÉTAPE 2 - HYPOTHÈSES STRUCTURÉES :
Développe 3 hypothèses principales explicatives :
- H1 : Onboarding insuffisant → faible adoption → churn précoce
- H2 : Manque de value demonstration → perception ROI faible
- H3 : Réactivité support → frustration → switch concurrentiel

ÉTAPE 3 - PRIORISATION IMPACT/EFFORT :
Pour chaque hypothèse :
- Quantifie l'impact potentiel sur le churn
- Estime l'effort d'implémentation (temps, ressources, budget)
- Évalue la faisabilité technique et organisationnelle

ÉTAPE 4 - SOLUTIONS TESTABLES :
Conçois des solutions MVP pour chaque hypothèse :
- Expérimentations A/B avec cohortes contrôlées
- KPIs de succès mesurables (adoption, NPS, usage)
- Timeline et ownership clairs

ÉTAPE 5 - ROADMAP EXÉCUTION :
- Plan 90 jours avec quick wins
- Allocation ressources et budget
- Mécanismes de suivi et ajustement

Justifie chaque étape avec des frameworks business reconnus et propose des métriques de validation.
Si les données manquent, indique les hypothèses et les chiffres à collecter ; n'invente aucun chiffre.`}
                explanation="Ce prompt utilise le CoT pour décomposer méthodiquement un problème business complexe, guidant l'IA vers une analyse structurée et actionnable."
              />
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Few-Shot Learning structuré
              </h4>
              <p className="mb-3">
                Technique qui consiste à placer quelques exemples dans le prompt pour montrer le format et le type de réponse attendus (Brown et al., 2020). Le modèle n'est pas réentraîné : les exemples ne valent que pour la requête en cours, et le résultat reste à vérifier.
              </p>
              
              <CodeExample
                title="Few-Shot Learning pour classification complexe"
                language="Prompt"
                code={`Tu es un expert en analyse de sentiment client pour les entreprises SaaS.

Classe ces commentaires clients selon la grille suivante (catégories inspirées du Net Promoter Score) : [Promoteur/Passif/Détracteur] + [Urgence: Immédiate/Modérée/Faible] + [Département: Product/Support/Sales]

EXEMPLES DE RÉFÉRENCE :

Exemple 1:
Input: "L'interface est intuitive mais la fonction export ne marche jamais. Ça fait 3 semaines qu'on attend un fix."
Output: DÉTRACTEUR | URGENCE: Immédiate | DÉPARTEMENT: Product
Analyse: Frustration technique bloquante, impact opérationnel direct, bug fonctionnel critique

Exemple 2:
Input: "Service client réactif, ont résolu mon problème en 2h. Par contre l'app mobile pourrait être améliorée."
Output: PROMOTEUR | URGENCE: Faible | DÉPARTEMENT: Product  
Analyse: Satisfaction support élevée, suggestion constructive non-bloquante

Exemple 3:
Input: "Prix correct pour les fonctionnalités, mais pas sûr de renouveler vu la concurrence."
Output: PASSIF | URGENCE: Modérée | DÉPARTEMENT: Sales
Analyse: Price sensitivity, competitive pressure, risque churn moyen terme

INSTRUCTIONS SPÉCIFIQUES :
- Considère le contexte émotionnel ET factuel
- Identifie les signaux de churn (mots-clés: "renouveler", "concurrence", "déçu")
- Priorise l'urgence selon l'impact business immédiat
- Justifie brièvement ta classification

À classifier :
"Super outil mais la courbe d'apprentissage est raide. Mon équipe galère depuis 2 semaines, on perd en productivité."`}
                explanation="Few-shot learning structuré avec exemples progressifs, framework de classification clair et instructions de contextualisation."
              />
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Tree of Thought (ToT) - Exploration cognitive
              </h4>
              <p className="mb-3">
                Méthode de recherche (Yao et al., 2023) qui explore plusieurs pistes de raisonnement, les évalue, puis retient les plus prometteuses. Appliquée telle quelle, elle demande de nombreux appels au modèle, donc du temps et des coûts. Dans un usage courant, on l'imite avec un prompt qui demande plusieurs options puis leur comparaison.
              </p>
              
              <CodeExample
                title="Tree of Thought pour innovation produit"
                language="Prompt"
                code={`MISSION : Concevoir une nouvelle fonctionnalité pour notre CRM B2B, avec un objectif d'engagement à définir

EXPLORATION ARBORESCENTE (Tree of Thought) :

BRANCHE A - AUTOMATISATION INTELLIGENTE
├── A1: IA prédictive pour next best actions
│   ├── A1.1: Recommandations contextuelles temps réel
│   ├── A1.2: Automatisation workflows conditionnels
│   └── A1.3: Scoring opportunités dynamique
├── A2: Assistant virtuel conversationnel
│   ├── A2.1: Interface vocale pour saisie rapide
│   ├── A2.2: Queries natural language sur data
│   └── A2.3: Coaching vente personnalisé
└── A3: Orchestration cross-platform
    ├── A3.1: Sync bidirectionnelle email/calendrier
    ├── A3.2: Intégration social selling LinkedIn
    └── A3.3: Pipeline unifié omnicanal

BRANCHE B - COLLABORATION SOCIALE
├── B1: Team intelligence collective
│   ├── B1.1: Knowledge base crowdsourcée
│   ├── B1.2: Peer learning et best practices
│   └── B1.3: Gamification performance équipe
├── B2: Customer journey collaboratif
│   ├── B2.1: Handoff intelligent entre équipes
│   ├── B2.2: Customer timeline partagée
│   └── B2.3: Cross-sell orchestré automatique
└── B3: Analytics comportementaux
    ├── B3.1: Heatmaps d'utilisation CRM
    ├── B3.2: Patterns de succès détectés par IA
    └── B3.3: Recommandations coaching manager

BRANCHE C - EXPÉRIENCE IMMERSIVE
├── C1: Interface adaptive contextuelle
│   ├── C1.1: Dashboard auto-configuré par rôle
│   ├── C1.2: Workflows adaptés métier spécifique
│   └── C1.3: UI personnalisée apprentissage machine
├── C2: Réalité augmentée business
│   ├── C2.1: Visualisation 3D pipeline
│   ├── C2.2: AR pour présentations client
│   └── C2.3: Spatial computing team meetings
└── C3: Intelligence émotionnelle
    ├── C3.1: Analyse sentiment communications
    ├── C3.2: Détection stress/burnout équipe
    └── C3.3: Recommandations well-being

ÉVALUATION MULTICRITÈRES :
Pour chaque feuille terminale, évalue :
1. Faisabilité technique (1-10)
2. Impact engagement estimé (1-10)  
3. Différenciation concurrentielle (1-10)
4. Time-to-market (1-10, 10=rapide)
5. ROI potentiel 12 mois (1-10)

Sélectionne les 3 meilleures idées et développe pour chacune :
- User stories détaillées
- Architecture technique high-level  
- Plan de validation prototype
- Stratégie go-to-market

Justifie tes choix. N'invente aucun chiffre : signale clairement les hypothèses à vérifier.`}
                explanation="Tree of Thought structuré explorant systématiquement multiples axes d'innovation avec évaluation multicritères rationnelle."
              />
            </div>
          </div>
        </LessonSection>

        <LessonSection
          title="Optimisation systématique et métriques"
          icon={<Settings className="h-6 w-6" />}
          delay={3}
        >
          <div className="space-y-4">
            <p>
              L'
              <TechnicalTooltip 
                term="Optimisation de prompts"
                definition="Processus itératif d'amélioration d'un prompt, fondé sur la comparaison de variantes sur les mêmes exemples"
              >
                optimisation de prompts
              </TechnicalTooltip>{' '}
              repose sur des essais comparés : on change une seule chose à la fois et on mesure l'effet sur les mêmes exemples.
            </p>
            
            <AnalogyBox
              title="Méthode scientifique appliquée"
              content="Comme un chercheur qui teste des hypothèses avec des protocoles stricts, l'optimisation de prompts suit une méthode expérimentale : hypothèse → expérimentation contrôlée → mesure définie à l'avance → analyse des résultats → itération. Notez chaque version testée pour pouvoir la comparer (un modèle ne répond pas toujours de la même façon à un même prompt)."
              variant="tip"
            />

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Comparer deux versions d'un prompt (comparaison A/B)
              </h4>
              <p className="mb-3">Une méthode simple pour comparer deux versions d'un prompt :</p>
              
              <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                <ol className="space-y-2 text-sm">
                  {optimizationSteps.map((step, index) => (
                    <OptimizationStep
                      key={index}
                      step={step.step}
                      title={step.title}
                      description={step.description}
                    />
                  ))}
                </ol>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Métriques quantitatives
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <li>• <strong>Latence :</strong> Temps de réponse moyen</li>
                  <li>• <strong>Tokens :</strong> Efficacité computationnelle</li>
                  <li>• <strong>Régularité :</strong> Variation d'une génération à l'autre</li>
                  <li>• <strong>Exactitude :</strong> Taux de réponses correctes</li>
                  <li>• <strong>Pertinence :</strong> Adéquation au contexte</li>
                </ul>
              </Card>

              <Card className="p-4 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Métriques qualitatives
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• <strong>Cohérence :</strong> Logique interne du raisonnement</li>
                  <li>• <strong>Créativité :</strong> Originalité des solutions</li>
                  <li>• <strong>Compréhension :</strong> Saisie des nuances contexte</li>
                  <li>• <strong>Exploitabilité :</strong> Utilité pratique des résultats</li>
                  <li>• <strong>Biais :</strong> Détection préjugés systémiques</li>
                </ul>
              </Card>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Aide-mémoire d'évaluation : PARIS
              </h4>
              <p className="mb-3">
                Cinq critères à noter sur vos propres exemples (aide-mémoire proposé dans ce cours, pas un standard) :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { letter: "P", word: "Précision", desc: "Exactitude factuelle", color: "text-red-700 dark:text-red-400" },
                  { letter: "A", word: "Adaptabilité", desc: "Flexibilité selon les contextes", color: "text-orange-700 dark:text-orange-400" },
                  { letter: "R", word: "Reproductibilité", desc: "Régularité des résultats", color: "text-yellow-700 dark:text-yellow-400" },
                  { letter: "I", word: "Innovation", desc: "Créativité solutions", color: "text-green-700 dark:text-green-400" },
                  { letter: "S", word: "Scalabilité", desc: "Performance volume", color: "text-blue-700 dark:text-blue-400" }
                ].map((item, index) => (
                  <Card key={index} className="p-3 text-center bg-card border-border dark:bg-card dark:border-border">
                    <div className={`text-2xl font-bold ${item.color} mb-1`}>{item.letter}</div>
                    <div className="text-sm font-medium text-card-foreground">{item.word}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </LessonSection>

        <ZoomOn title="Les erreurs courantes à éviter">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-medium text-red-600 dark:text-red-400">❌ À éviter</h5>
                <ul className="space-y-2 text-sm text-card-foreground">
                  <li>• Prompts trop longs et confus</li>
                  <li>• Instructions contradictoires</li>
                  <li>• Manque de contexte</li>
                  <li>• Attentes irréalistes</li>
                  <li>• Pas de format spécifié</li>
                  <li>• Négations complexes</li>
                  <li>• Jargon technique non expliqué</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="font-medium text-green-700 dark:text-green-400">✅ Bonnes pratiques</h5>
                <ul className="space-y-2 text-sm text-card-foreground">
                  <li>• Structure claire et logique</li>
                  <li>• Une instruction principale</li>
                  <li>• Contexte suffisant</li>
                  <li>• Objectifs réalisables</li>
                  <li>• Format de sortie défini</li>
                  <li>• Exemples concrets</li>
                  <li>• Langage positif et direct</li>
                </ul>
              </div>
            </div>
          </div>
        </ZoomOn>

        <LessonSection
          title="Prompts sectoriels et spécialisés"
          icon={<Users className="h-6 w-6" />}
          delay={4}
        >
          <div className="space-y-6">
            <p>Découvrez des exemples de prompts structurés pour différents secteurs d'activité :</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">🏥 Secteur médical</h4>
                <CodeExample
                  title="Prompt médical structuré"
                  language="Prompt"
                  code={`Tu es un assistant d'information en santé. 
Un patient présente les symptômes suivants : [symptômes].

Analyse selon cette structure :
1. Pistes à discuter avec un professionnel de santé (3 max)
2. Examens que le professionnel de santé pourrait envisager
3. Questions d'anamnèse importantes
4. Signaux d'alarme à surveiller

Important : tu ne poses pas de diagnostic et tu ne remplaces pas un professionnel de santé. Recommande une consultation, et oriente vers les urgences en cas de signe grave.`}
                  explanation="Structure claire avec garde-fous pour le domaine médical. Une réponse de ce type ne remplace jamais un avis médical et peut comporter des erreurs."
                />
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">💼 Secteur business</h4>
                <CodeExample
                  title="Prompt d'analyse business"
                  language="Prompt"
                  code={`Tu es un consultant en stratégie.
Analyse cette situation business : [contexte entreprise].

Framework d'analyse :
1. Diagnostic SWOT
2. Analyse des 5 forces de Porter
3. Recommandations stratégiques (3 priorités)
4. Plan d'implémentation (90 jours)
5. KPIs de suivi

Format : Executive summary + détail par section.`}
                  explanation="Utilise des cadres d'analyse classiques pour structurer la réponse. Vérifiez toujours les faits et les chiffres avancés : le modèle peut en inventer."
                />
              </div>
            </div>
          </div>
        </LessonSection>

        <ZoomOn title="Données personnelles et secrets">
          <p>
            Un prompt envoyé à un service en ligne quitte votre machine et peut être conservé par le fournisseur.
            Ne collez pas de données personnelles, de secret industriel, de mot de passe ou de clé d'API dans un
            prompt sans avoir vérifié les conditions du service. Le site ne collecte rien ; la page{' '}
            <Link to="/gestion-donnees-rgpd" className="text-primary hover:underline">
              gestion des données
            </Link>{' '}
            détaille ce qui reste dans votre navigateur.
          </p>
        </ZoomOn>

        <LessonSection
          title="Outils et plateformes pour le prompt engineering"
          icon={<Rocket className="h-6 w-6" />}
          delay={5}
        >
          <div className="space-y-4">
            <p>Quelques points de départ pour développer et tester vos prompts (les offres changent vite : vérifiez leur disponibilité) :</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-md transition-all duration-300 bg-card border-border dark:bg-card dark:border-border">
                <h5 className="font-medium text-primary mb-2">Essayer et tester</h5>
                <ul className="text-sm text-card-foreground space-y-1">
                  <li>• Les consoles d'essai (« playgrounds ») des fournisseurs</li>
                  <li>
                    •{' '}
                    <a href="https://github.com/promptfoo/promptfoo" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      promptfoo
                    </a>{' '}
                    (évaluation de prompts, open source ; la société a annoncé le 9 mars 2026 son rachat par OpenAI, sous réserve des conditions de clôture, le projet restant sous licence libre)
                  </li>
                  <li>• Un tableur pour noter vos essais</li>
                </ul>
              </Card>
              
              <Card className="p-4 hover:shadow-md transition-all duration-300 bg-card border-border dark:bg-card dark:border-border">
                <h5 className="font-medium text-primary mb-2">Guides officiels</h5>
                <ul className="text-sm text-card-foreground space-y-1">
                  <li>
                    •{' '}
                    <a href="https://developers.openai.com/api/docs/guides/prompt-engineering" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Guide d'OpenAI
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Guide d'Anthropic
                    </a>
                  </li>
                  <li>• La documentation du modèle que vous utilisez</li>
                </ul>
              </Card>
              
              <Card className="p-4 hover:shadow-md transition-all duration-300 bg-card border-border dark:bg-card dark:border-border">
                <h5 className="font-medium text-primary mb-2">Sur ce site</h5>
                <ul className="text-sm text-card-foreground space-y-1">
                  <li>
                    •{' '}
                    <Link to="/generateur-prompts" className="text-primary hover:underline">
                      Générateur de prompts
                    </Link>
                  </li>
                  <li>
                    •{' '}
                    <Link to="/calculateur-couts-ia" className="text-primary hover:underline">
                      Calculateur de coûts d'API IA
                    </Link>
                  </li>
                  <li>
                    •{' '}
                    <Link to="/comparateur-modeles-ia" className="text-primary hover:underline">
                      Comparateur de modèles d'IA
                    </Link>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </LessonSection>

        <CourseSources sources={promptSources} />

        <CourseQuiz title="Quiz\u00A0: prompt engineering" questions={promptQuizQuestions} />

        <CourseConclusion
          title="Conclusion : des prompts plus clairs et mieux testés"
          description="Vous disposez de repères pour formuler vos demandes, choisir une technique et comparer vos essais. Le reste se construit par la pratique."
          learningPoints={[
            "Comprendre l'architecture et le fonctionnement des LLM modernes",
            "Structurer un prompt avec l'aide-mémoire CRYSTAL",
            "Utiliser les techniques avancées (CoT, Few-Shot, ToT)",
            "Comparer des variantes de prompt sur les mêmes exemples",
            "Évaluer la qualité avec des critères définis à l'avance (aide-mémoire PARIS)",
            "Éviter les biais et pièges courants",
            "Adapter ses prompts à un contexte métier",
            "Documenter ses prompts et les versions testées"
          ]}
          nextSteps={[
            "Construisez votre bibliothèque de prompts testés",
            "Essayez vos prompts sur plusieurs modèles et comparez les résultats",
            "Échangez avec d'autres praticiens (forums, projets open source) et confrontez vos méthodes",
            "Suivez le cours «\u00A0IA et créativité\u00A0» pour les usages créatifs",
            "Notez le temps passé et la qualité obtenue dans vos projets",
            "Partagez vos bonnes pratiques avec votre équipe",
            "Explorez les nouvelles frontières (multimodal, agents)"
          ]}
        />

    </CourseGuideLayout>
  );
};

export default PromptEngineering;
