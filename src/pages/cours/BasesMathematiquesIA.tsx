// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '../../components/courses/CourseGuideLayout';
import CourseConclusion from '../../components/courses/CourseConclusion';
import CourseSources from '../../components/courses/CourseSources';
import CourseQuiz, { QuizQuestion } from '../../components/courses/CourseQuiz';
import LessonSection from '../../components/courses/LessonSection';
import { Calculator, TrendingUp, BarChart3, Brain, Target } from 'lucide-react';

// Composants spécialisés pour ce cours
import MathIntroductionSection from '../../components/courses/math-ia/MathIntroductionSection';
import LinearAlgebraSection from '../../components/courses/math-ia/LinearAlgebraSection';
import CalculusSection from '../../components/courses/math-ia/CalculusSection';
import ProbabilityStatsSection from '../../components/courses/math-ia/ProbabilityStatsSection';
import OptimizationSection from '../../components/courses/math-ia/OptimizationSection';
import PracticalApplicationsSection from '../../components/courses/math-ia/PracticalApplicationsSection';

const mathSources = [
  { label: 'Deisenroth, Faisal et Ong\u00A0: Mathematics for Machine Learning (2020)', href: 'https://mml-book.github.io/' },
  { label: 'Stanford CS229\u00A0: cours et notes de cours', href: 'https://cs229.stanford.edu/main_notes.pdf' },
  { label: 'NumPy\u00A0: documentation', href: 'https://numpy.org/doc/stable/' },
  { label: 'SciPy\u00A0: optimisation et recherche de racines', href: 'https://docs.scipy.org/doc/scipy/reference/optimize.html' },
  { label: 'Graham (2002)\u00A0: A Plan for Spam', href: 'http://www.paulgraham.com/spam.html' },
];

const mathQuizQuestions: QuizQuestion[] = [
  {
    question: "Une matrice A de taille 2 × 3 est multipliée par une matrice B de taille 3 × 4. Quelle est la taille du produit AB\u00A0?",
    options: ['2 × 3', '3 × 4', '2 × 4', '4 × 3'],
    correctAnswer: 2,
    explanation: "Les dimensions intérieures doivent coïncider\u00A0: les 3 colonnes de A avec les 3 lignes de B. Le résultat garde les 2 lignes de A et les 4 colonnes de B.",
  },
  {
    question: "En descente de gradient, dans quelle direction déplace-t-on les paramètres\u00A0?",
    options: [
      'Dans le sens du gradient, pour augmenter la perte',
      'Dans le sens opposé au gradient, pour réduire la perte',
      'Toujours vers zéro',
      'Dans une direction aléatoire à chaque pas',
    ],
    correctAnswer: 1,
    explanation: "Le gradient indique la direction de plus forte hausse. On avance dans le sens opposé, avec un pas réglé par le taux d'apprentissage.",
  },
  {
    question: "Deux événements indépendants ont des probabilités 0,5 et 0,2. Quelle est la probabilité que les deux se produisent\u00A0?",
    options: ['0,7', '0,3', '0,1', '1,0'],
    correctAnswer: 2,
    explanation: "Pour des événements indépendants, on multiplie les probabilités\u00A0: 0,5 × 0,2 = 0,1.",
  },
  {
    question: "Que peut provoquer un taux d'apprentissage trop grand\u00A0?",
    options: [
      "Garantir la convergence",
      "Supprimer le besoin de données",
      "Rendre le modèle déterministe",
      "Faire osciller ou diverger l'entraînement",
    ],
    correctAnswer: 3,
    explanation: "Un pas trop grand peut dépasser le minimum et faire osciller la perte, voire la faire diverger. Le bon réglage dépend du problème.",
  },
];

const plan: CoursePlanItem[] = [
  {
    icon: <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Algèbre linéaire',
    description: 'Vecteurs, matrices et transformations\u00A0: le langage des données.',
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Calcul différentiel',
    description: 'Dérivées et gradient\u00A0: comment un modèle apprend.',
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Probabilités et statistiques',
    description: 'Décrire l\u2019incertitude et estimer à partir d\u2019échantillons.',
  },
  {
    icon: <Target className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Optimisation',
    description: 'Chercher un minimum ou un maximum sous contraintes.',
  },
  {
    icon: <Brain className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Applications en IA',
    description: 'Relier ces outils à des modèles et à des cas concrets.',
  },
];

const BasesMathematiquesIA = () => {
  return (
    <CourseGuideLayout
      title="Les bases mathématiques de l'IA"
      subtitle="Comprendre les fondements mathématiques qui permettent à l'intelligence artificielle de fonctionner"
      about={[
        "Les modèles d\u2019IA manipulent des vecteurs, des matrices, des probabilités et des gradients. Ces notions ne sont pas décoratives\u00A0: elles déterminent ce qu\u2019un modèle peut représenter et comment il s\u2019ajuste.",
        "Ce cours reprend les bases utiles sans supposer un parcours universitaire complet. Chaque notion est reliée à un usage concret en apprentissage automatique.",
      ]}
      learn={[
        "Lire une multiplication de matrices et vérifier ses dimensions.",
        "Expliquer le rôle d\u2019un gradient dans l\u2019apprentissage.",
        "Distinguer probabilité, statistique et inférence.",
        "Reconnaître un problème d\u2019optimisation et ses limites.",
        "Relier ces outils aux algorithmes d\u2019IA.",
      ]}
      plan={plan}
      info={{
        level: 'Débutant à intermédiaire',
        duration: '4\u00A0h environ, lecture et pratique comprises',
        prerequisites: 'Algèbre de base et goût pour les formules simples.',
        contents: ['5 leçons', '1 quiz de fin de cours', 'Sources citées', 'Bilan et pistes de pratique'],
        audience: 'Étudiants, développeurs, data scientists, curieux des mathématiques',
        tags: ['Mathématiques', 'Algèbre Linéaire', 'Probabilités', 'Statistiques', 'Optimisation'],
      }}
      related={[
        {
          to: '/cours/apprentissage-supervise',
          title: 'Apprentissage supervisé',
          description: 'Mettre ces outils en pratique sur des problèmes avec étiquettes.',
        },
        {
          to: '/cours/apprentissage-non-supervise',
          title: 'Apprentissage non supervisé',
          description: 'Distances, matrices et probabilités au service de l\u2019exploration.',
        },
      ]}
    >
      <MathIntroductionSection />

      <LessonSection
        title="Algèbre linéaire\u00A0: le langage des données"
        icon={<Calculator className="h-6 w-6" />}
      >
        <LinearAlgebraSection />
      </LessonSection>

      <LessonSection
        title="Calcul différentiel\u00A0: comment l'IA apprend"
        icon={<TrendingUp className="h-6 w-6" />}
      >
        <CalculusSection />
      </LessonSection>

      <LessonSection
        title="Probabilités et statistiques\u00A0: gérer l'incertitude"
        icon={<BarChart3 className="h-6 w-6" />}
      >
        <ProbabilityStatsSection />
      </LessonSection>

      <LessonSection
        title="Optimisation\u00A0: trouver une bonne solution"
        icon={<Target className="h-6 w-6" />}
      >
        <OptimizationSection />
      </LessonSection>

      <LessonSection
        title="Applications concrètes en IA"
        icon={<Brain className="h-6 w-6" />}
      >
        <PracticalApplicationsSection />
      </LessonSection>

      <CourseSources sources={mathSources} />

      <CourseQuiz title="Quiz\u00A0: les bases mathématiques de l'IA" questions={mathQuizQuestions} />

      <CourseConclusion
        title="Ce qu'il faut retenir des bases mathématiques de l'IA"
        summary="Les mathématiques sont le socle sur lequel repose toute l'intelligence artificielle. Comprendre ces concepts fondamentaux aide à saisir comment fonctionnent les systèmes d'IA et à les développer ou les optimiser."
        learningPoints={[
          "L'algèbre linéaire permet de manipuler et transformer les données efficacement",
          "Le calcul différentiel est au cœur de l'apprentissage automatique",
          "Les probabilités et statistiques gèrent l'incertitude et l'inférence",
          "L'optimisation cherche un optimum, souvent local, dans un espace complexe",
          "Ces concepts se combinent dans les algorithmes d'IA",
          "La visualisation aide à comprendre les concepts abstraits",
          "La pratique progressive permet d'assimiler ces notions complexes"
        ]}
        nextSteps={[
          "Pratiquer avec des exercices d'algèbre linéaire appliquée",
          "Expérimenter avec des algorithmes d'optimisation",
          "Implémenter des modèles statistiques simples",
          "Étudier des cas d'usage spécifiques à votre domaine",
          "Approfondir les mathématiques du deep learning",
          "Explorer les bibliothèques mathématiques (NumPy, SciPy)",
          "Participer à des projets pratiques combinant théorie et application"
        ]}
      />
    </CourseGuideLayout>
  );
};

export default BasesMathematiquesIA;
