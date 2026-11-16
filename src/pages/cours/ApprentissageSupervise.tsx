// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import ConceptsSection from '@/components/courses/supervised-learning/ConceptsSection';
import TypesSection from '@/components/courses/supervised-learning/TypesSection';
import AlgorithmsSection from '@/components/courses/supervised-learning/AlgorithmsSection';
import ApplicationsSection from '@/components/courses/supervised-learning/ApplicationsSection';
import ChallengesSection from '@/components/courses/supervised-learning/ChallengesSection';
import AlgorithmInteractiveSchema from '@/components/courses/supervised-learning/AlgorithmInteractiveSchema';
import ConceptIllustration from '@/components/courses/supervised-learning/ConceptIllustration';
import DetailedProcessExample from '@/components/courses/supervised-learning/DetailedProcessExample';
import PerformanceVisualizer from '@/components/courses/supervised-learning/PerformanceVisualizer';
import DataTrainingSimulator from '@/components/courses/supervised-learning/DataTrainingSimulator';
import InteractiveChart from '@/components/courses/supervised-learning/InteractiveChart';
import LessonSection from '@/components/courses/LessonSection';
import DidYouKnow from '@/components/courses/DidYouKnow';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import { Brain, Lightbulb, BookOpen, Zap, Target, TreePine } from 'lucide-react';
import DecisionTreeInteractive from '@/components/courses/supervised-learning/DecisionTreeInteractive';
import RandomForestVisualization from '@/components/courses/supervised-learning/RandomForestVisualization';
import NeuralNetworkVisualization from '@/components/courses/supervised-learning/NeuralNetworkVisualization';

const plan: CoursePlanItem[] = [
  { icon: <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Concepts visuels interactifs', description: 'Voir ce qu’apprend un modèle supervisé et comment se lit une frontière de décision.' },
  { icon: <Zap className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Algorithmes en action', description: 'Suivre le principe d’un algorithme étape par étape.' },
  { icon: <TreePine className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Arbre de décision', description: 'Construire un arbre et comprendre ses seuils.' },
  { icon: <TreePine className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Forêt aléatoire', description: 'Combiner plusieurs arbres et mesurer l’effet du collectif.' },
  { icon: <Brain className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Réseaux de neurones', description: 'Relier un petit réseau à l’apprentissage supervisé.' },
  { icon: <Target className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Comparateur de performances', description: 'Lire plusieurs métriques sans les confondre.' },
  { icon: <Brain className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Laboratoire d’entraînement', description: 'Modifier les données et les paramètres, puis observer.' },
  { icon: <Brain className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Classification et régression', description: 'Distinguer deux familles de sorties.' },
  { icon: <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Projet type', description: 'Parcourir les étapes d’un projet, de l’idée au déploiement.' },
];

const supervisedSources = [
  { label: 'scikit-learn\u00A0: évaluation des modèles et choix des métriques', href: 'https://scikit-learn.org/stable/modules/model_evaluation.html' },
  { label: 'scikit-learn\u00A0: arbres de décision', href: 'https://scikit-learn.org/stable/modules/tree.html' },
  { label: 'scikit-learn\u00A0: forêts aléatoires et méthodes d\'ensemble', href: 'https://scikit-learn.org/stable/modules/ensemble.html' },
  { label: 'Hastie, Tibshirani et Friedman\u00A0: The Elements of Statistical Learning (2e éd., 2009)', href: 'https://hastie.su.domains/ElemStatLearn/' },
  { label: 'McKinney et al. (2020)\u00A0: International evaluation of an AI system for breast cancer screening (PubMed)', href: 'https://pubmed.ncbi.nlm.nih.gov/31894144/' },
  { label: 'Buolamwini et Gebru (2018)\u00A0: Gender Shades', href: 'https://proceedings.mlr.press/v81/buolamwini18a.html' },
  { label: 'Obermeyer et al. (2019)\u00A0: Dissecting racial bias in an algorithm used to manage the health of populations (PubMed)', href: 'https://pubmed.ncbi.nlm.nih.gov/31649194/' },
];

const supervisedQuizQuestions: QuizQuestion[] = [
  {
    question: "Qu'est-ce qui distingue l'apprentissage supervisé\u00A0?",
    options: [
      "Il utilise des données étiquetées pour apprendre une correspondance entre entrées et sorties",
      "Il n'utilise jamais de données",
      "Il fonctionne seulement sans variable cible",
      'Il garantit zéro erreur',
    ],
    correctAnswer: 0,
    explanation: "L'apprentissage supervisé s'appuie sur des exemples étiquetés. Le modèle cherche une correspondance qui s'étend à de nouveaux cas.",
  },
  {
    question: "Pourquoi séparer les données en ensembles d'entraînement et de test\u00A0?",
    options: [
      "Pour entraîner plus vite",
      'Pour estimer la performance sur des données non vues',
      'Pour supprimer le besoin de validation',
      "Pour éviter d'avoir des étiquettes",
    ],
    correctAnswer: 1,
    explanation: "Le jeu de test sert à mesurer la généralisation. Évaluer sur les données d'entraînement donne une image trop favorable.",
  },
  {
    question: "Un modèle a une excellente exactitude sur l'entraînement mais une mauvaise exactitude sur le test. Que suggère ce résultat\u00A0?",
    options: [
      'Un sous-apprentissage certain',
      'Une absence de biais',
      'Un surapprentissage possible',
      'Un jeu de test trop facile',
    ],
    correctAnswer: 2,
    explanation: "C'est le signe classique d'un surapprentissage\u00A0: le modèle mémorise les exemples d'entraînement et généralise mal. Plus de données, une régularisation ou un modèle plus simple peuvent aider.",
  },
  {
    question: "Pourquoi l'exactitude seule peut-elle tromper sur un jeu déséquilibré\u00A0?",
    options: [
      "Parce qu'elle ne compte que les vrais positifs",
      "Parce qu'elle ne compte que les faux positifs",
      'Parce qu\u2019elle est toujours égale au F1',
      'Parce qu\u2019un modèle qui prédit toujours la classe majoritaire peut obtenir une exactitude élevée',
    ],
    correctAnswer: 3,
    explanation: "Sur un jeu très déséquilibré, prédire toujours la classe majoritaire peut sembler performant. Il faut regarder la précision, le rappel, le F1 et la matrice de confusion par classe.",
  },
];

const ApprentissageSupervise = () => {
  const didYouKnowFacts = [
    {
      title: "L'apprentissage supervisé est partout",
      content: "De la reconnaissance vocale aux recommandations de contenus, l'apprentissage supervisé, seul ou combiné à d'autres approches, alimente une grande partie des services d'IA du quotidien. Les grands modèles de langage reposent, eux, d'abord sur un pré-entraînement auto-supervisé."
    },
    {
      title: "Les GPU accélèrent l'apprentissage",
      content: "Grâce aux GPU, l'entraînement sur de grands volumes de données étiquetées est souvent bien plus rapide que sur processeur seul, selon le modèle et le matériel."
    },
    {
      title: "La préparation des données prend beaucoup de temps",
      content: "Nettoyer, étiqueter et préparer les données représente souvent une part de travail supérieure à celle de l'entraînement du modèle lui-même. Les algorithmes ne sont que la partie visible du projet."
    },
    {
      title: "Sur certaines tâches précises, des résultats proches de ceux de spécialistes",
      content: "En imagerie médicale, une évaluation rétrospective sur des mammographies a rapporté des performances comparables à celles de radiologues pour la détection du cancer du sein (McKinney et al., 2020). La validation clinique et la supervision de professionnels de santé restent indispensables."
    }
  ];

  return (
    <CourseGuideLayout
      title="L'apprentissage supervisé, pas à pas"
      subtitle="Un guide interactif pour comprendre et pratiquer l'apprentissage supervisé, de la théorie aux bonnes pratiques"
      about={[
        "L’apprentissage supervisé apprend une correspondance entre des entrées et des sorties à partir d’exemples étiquetés. Il sert à classer ou à prédire une valeur, puis à mesurer les erreurs sur des cas nouveaux.",
        "Ce cours alterne explications, démonstrations interactives et projet type. Il montre aussi les limites : données déséquilibrées, fuites, surapprentissage et évaluation trompeuse.",
      ]}
      learn={[
        "Distinguer classification et régression.",
        "Lire les étapes d’un algorithme et les paramètres d’un arbre.",
        "Comparer plusieurs modèles avec des métriques adaptées.",
        "Repérer les fuites de données et le surapprentissage.",
        "Construire un petit projet d’apprentissage supervisé.",
      ]}
      plan={plan}
      info={{
        level: 'Débutant à intermédiaire',
        duration: '3 à 4 heures, lecture et pratique comprises',
        prerequisites: 'Algèbre de base et notions de Python utiles, sans être indispensables aux démonstrations.',
        contents: ['9 leçons', '1 quiz de fin de cours', 'Démonstrations interactives', 'Sources citées'],
        audience: 'Étudiants, professionnels, curieux de tech',
        tags: ['Machine Learning', 'Classification', 'Régression', 'Algorithmes', 'IA Pratique', 'Data Science'],
      }}
      related={[
        { to: '/cours/premier-modele-ml', title: 'Construire son premier modèle', description: 'Un projet complet avec scikit-learn, de la préparation des données au déploiement.' },
        { to: '/cours/python-ia', title: "Initiation à Python pour l'IA", description: 'Les bases du langage et des bibliothèques de données.' },
        { to: '/cours/apprentissage-non-supervise', title: 'Apprentissage non supervisé', description: 'Clustering et réduction de dimension, sans étiquettes.' },
        { to: '/simulateur-ia', title: "Simulateur d'entraînement IA", description: "Entraîner un modèle dans le navigateur et voir l'effet des paramètres." },
        { to: '/analyseur-donnees', title: 'Analyseur de jeu de données', description: 'Repérer valeurs manquantes, doublons, déséquilibres et fuites de données dans un CSV.' },
        { to: '/auditeur-biais', title: 'Auditeur de biais', description: "Comparer groupe par groupe les erreurs d'un classifieur." },
      ]}
    >
        {/* Introduction avec illustrations conceptuelles */}
        <ConceptsSection />

        {/* Illustrations interactives des concepts */}
        <LessonSection
          title="Concepts visuels interactifs"
          icon={<Lightbulb className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Les concepts abstraits deviennent concrets grâce à ces illustrations interactives. 
              Explorez visuellement les fondamentaux de l'apprentissage supervisé !
            </p>
            <ConceptIllustration />
          </div>
        </LessonSection>

        {/* Types avec exemples enrichis */}
        <TypesSection />

        {/* Schémas interactifs des algorithmes stars */}
        <LessonSection
          title="Algorithmes en action : le principe étape par étape"
          icon={<Zap className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Un schéma interactif décrit, étape par étape, le principe de trois algorithmes clés de l'apprentissage supervisé.
            </p>
            <AlgorithmInteractiveSchema />
          </div>
        </LessonSection>

        {/* NOUVEAUX COMPOSANTS INTERACTIFS DÉTAILLÉS */}
        
        {/* Arbre de Décision Interactif */}
        <LessonSection
          title="Arbre de décision : démonstration interactive"
          icon={<TreePine className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Plongez dans le fonctionnement d'un arbre de décision avec cet exemple concret 
              d'approbation de crédit. Observez comment l'algorithme construit ses règles de décision 
              en analysant les données étape par étape.
            </p>
            <DecisionTreeInteractive />
            
            <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4">
                Points clés à retenir sur les arbres de décision
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium text-green-700 dark:text-green-300">Avantages majeurs :</div>
                  <ul className="space-y-1 text-green-700 dark:text-green-400">
                    <li>• Facile à interpréter, tant que l'arbre reste petit</li>
                    <li>• Gère facilement des variables de natures différentes</li>
                    <li>• Détecte automatiquement les interactions</li>
                    <li>• Pas besoin de normaliser les données</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-green-700 dark:text-green-300">Applications idéales :</div>
                  <ul className="space-y-1 text-green-700 dark:text-green-400">
                    <li>• Systèmes d'aide à la décision médicale</li>
                    <li>• Scoring de crédit et risque financier</li>
                    <li>• Systèmes de recommandation simples</li>
                    <li>• Analyse de règles métier</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </LessonSection>

        {/* Random Forest Interactif */}
        <LessonSection
          title="Forêt aléatoire : la force du collectif"
          icon={<TreePine className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Une forêt aléatoire combine le vote de nombreux arbres de décision, chacun entraîné sur un échantillon différent
              des données. Faites varier le nombre d'arbres et leur profondeur, puis comparez l'exactitude de la forêt à celle
              d'un arbre seul sur des dossiers de test.
            </p>
            <RandomForestVisualization />
            
            <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
                Les ingrédients d'une forêt aléatoire
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium text-emerald-700 dark:text-emerald-300">Technique du bagging :</div>
                  <div className="text-emerald-600 dark:text-emerald-400">
                    Chaque arbre s'entraîne sur un échantillon différent des données, 
                    créant de la diversité et réduisant le surapprentissage.
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-emerald-700 dark:text-emerald-300">Sélection de variables :</div>
                  <div className="text-emerald-600 dark:text-emerald-400">
                    À chaque division, seul un sous-ensemble aléatoire des variables est considéré, 
                    forçant les arbres à explorer différentes stratégies.
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-emerald-700 dark:text-emerald-300">Vote :</div>
                  <div className="text-emerald-600 dark:text-emerald-400">
                    La décision finale suit la majorité des arbres (certaines variantes pondèrent les votes).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LessonSection>

        {/* Réseau de Neurones Interactif */}
        <LessonSection
          title="Réseaux de neurones : comment ils apprennent"
          icon={<Brain className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Cette animation schématique montre les trois phases que répète l'entraînement d'un réseau de neurones. Pour
              observer de vrais résultats (perte, exactitude, frontière de décision), utilisez le simulateur d'entraînement.
            </p>
            <NeuralNetworkVisualization />
            
            <div className="bg-linear-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-4">
                Réseaux de neurones : atouts et usages
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="font-medium text-purple-700 dark:text-purple-300">Atouts :</div>
                  <ul className="space-y-1 text-sm text-purple-600 dark:text-purple-400">
                    <li>• <strong>Approximation universelle :</strong> en théorie, un réseau assez grand peut approcher toute fonction continue (sans garantie de l'apprendre à partir de données réelles)</li>
                    <li>• <strong>Motifs complexes :</strong> détecte des relations non linéaires subtiles</li>
                    <li>• <strong>Représentations automatiques :</strong> construit ses propres représentations utiles</li>
                    <li>• <strong>Passage à l'échelle :</strong> les performances progressent en général avec davantage de données et de calcul</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="font-medium text-purple-700 dark:text-purple-300">Applications courantes :</div>
                  <ul className="space-y-1 text-sm text-purple-600 dark:text-purple-400">
                    <li>• <strong>Vision par ordinateur :</strong> Reconnaissance d'images médicales</li>
                    <li>• <strong>Traitement du langage :</strong> Traduction automatique, ChatGPT</li>
                    <li>• <strong>Jeux stratégiques :</strong> AlphaGo, échecs, poker</li>
                    <li>• <strong>Sciences :</strong> Découverte de médicaments, prévision météo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </LessonSection>

        {/* Visualisation comparative des performances */}
        <LessonSection
          title="Comparateur de performances"
          icon={<Target className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Situez les forces et les faiblesses de chaque famille d'algorithmes, sans oublier que le meilleur choix dépend
              toujours des données du projet.
            </p>
            <PerformanceVisualizer />
          </div>
        </LessonSection>

        {/* Simulateur d'entraînement de données */}
        <LessonSection
          title="Laboratoire d'entraînement"
          icon={<Brain className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Expérimentez avec la taille du jeu de données, le bruit et le taux d'apprentissage, et observez en temps réel
              un modèle linéaire s'entraîner sur des données générées pour l'occasion.
            </p>
            <DataTrainingSimulator />
          </div>
        </LessonSection>

        {/* Visualisation interactive classique */}
        <LessonSection
          title="Classification et régression en images"
          icon={<Brain className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Cette illustration montre ce que produit l'apprentissage dans deux cas : une frontière qui sépare deux classes
              (classification) et une droite qui suit le nuage de points (régression).
            </p>
            
            <InteractiveChart />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Dans la classification :</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  L'algorithme trace une frontière de décision (ligne jaune) qui sépare au mieux 
                  les deux classes. Chaque nouveau point sera classé selon sa position par rapport à cette ligne.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">📈 Dans la régression :</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  L'algorithme trace la ligne qui passe le plus près possible de tous les points. 
                  Cette ligne permet de prédire la valeur Y pour n'importe quelle valeur X.
                </p>
              </div>
            </div>
          </div>
        </LessonSection>

        {/* Processus détaillé étape par étape */}
        <LessonSection
          title="Projet type : de l'idée au déploiement"
          icon={<BookOpen className="h-6 w-6" />}
        >
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Suivons les étapes d'un projet de machine learning, de l'idée au déploiement. Chaque étape présente des
              défis courants et des pratiques usuelles.
            </p>
            <DetailedProcessExample />
          </div>
        </LessonSection>

        {/* Algorithmes détaillés */}
        <AlgorithmsSection />

        {/* Applications avec cas d'études réels */}
        <ApplicationsSection />

        {/* Défis et bonnes pratiques */}
        <ChallengesSection />

        {/* Faits fascinants enrichis */}
        <DidYouKnow items={didYouKnowFacts} />

        <CourseSources sources={supervisedSources} />

        <CourseQuiz title="Quiz\u00A0: l'apprentissage supervisé" questions={supervisedQuizQuestions} />

        {/* Conclusion enrichie */}
        <CourseConclusion
          title="Bilan : l'apprentissage supervisé"
          summary="Vous avez parcouru les concepts fondamentaux, les principaux algorithmes, des applications réelles et les bonnes pratiques de l'apprentissage supervisé. Les démonstrations interactives vous ont donné une vision concrète du processus d'apprentissage."
          nextSteps={[
            "Apprenez Python et les bibliothèques essentielles (scikit-learn, pandas, matplotlib)",
            "Pratiquez sur des jeux de données publics (Kaggle, UCI Machine Learning Repository, Hugging Face Datasets)",
            "Explorez le deep learning avec TensorFlow ou PyTorch",
            "Découvrez le MLOps et le déploiement d'un modèle",
            "Approfondissez avec des cours en ligne reconnus (par exemple Andrew Ng, fast.ai)",
            "Échangez avec des communautés (forums, Discord, Reddit r/MachineLearning)",
            "Constituez un petit portfolio de projets sur GitHub",
            "Expérimentez avec les démonstrations de ce cours pour consolider vos connaissances"
          ]}
          learningPoints={[
            "Les concepts fondamentaux avec visualisations interactives",
            "La différence pratique entre classification et régression", 
            "Le fonctionnement interne des algorithmes principaux",
            "Le processus complet de développement d'un projet ML",
            "Des applications dans plusieurs secteurs, avec leurs limites",
            "Les défis réels et comment les surmonter en pratique",
            "Une expérience pratique grâce aux démonstrations interactives"
          ]}
        />

    </CourseGuideLayout>
  );
};

export default ApprentissageSupervise;
