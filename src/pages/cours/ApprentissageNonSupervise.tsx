// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '../../components/courses/CourseGuideLayout';
import CourseConclusion from '../../components/courses/CourseConclusion';
import CourseSources from '../../components/courses/CourseSources';
import ClassicCourseQuiz from '../../components/courses/ClassicCourseQuiz';
import LessonSection from '../../components/courses/LessonSection';
import { Scale, Network, Boxes, Layers, Link2, ShieldAlert } from 'lucide-react';

// Composants refactorisés
import IntroductionSection from '../../components/courses/unsupervised-learning/IntroductionSection';
import SupervisedVsUnsupervisedComparison from '../../components/courses/unsupervised-learning/SupervisedVsUnsupervisedComparison';
import UnsupervisedTypesComparison from '../../components/courses/unsupervised-learning/UnsupervisedTypesComparison';
import ClusteringSection from '../../components/courses/unsupervised-learning/ClusteringSection';
import DimensionalityReductionSection from '../../components/courses/unsupervised-learning/DimensionalityReductionSection';
import AssociationRulesSection from '../../components/courses/unsupervised-learning/AssociationRulesSection';
import ChallengesSection from '../../components/courses/unsupervised-learning/ChallengesSection';

const unsupervisedSources = [
  { label: 'scikit-learn\u00A0: clustering', href: 'https://scikit-learn.org/stable/modules/clustering.html' },
  { label: 'scikit-learn\u00A0: analyse en composantes principales', href: 'https://scikit-learn.org/stable/modules/decomposition.html#pca' },
  { label: 'scikit-learn\u00A0: manifold learning (t-SNE, UMAP et voisinages)', href: 'https://scikit-learn.org/stable/modules/manifold.html' },
  { label: 'Gomez-Uribe et Hunt (2015)\u00A0: The Netflix Recommender System', href: 'https://doi.org/10.1145/2843948' },
  { label: 'Hastie, Tibshirani et Friedman\u00A0: The Elements of Statistical Learning (2e éd., 2009)', href: 'https://hastie.su.domains/ElemStatLearn/' },
];

const plan: CoursePlanItem[] = [
  {
    icon: <Scale className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Supervisé ou non supervisé',
    description: 'Comparer les deux cadres d\u2019apprentissage et ce qui change quand les étiquettes manquent.',
  },
  {
    icon: <Network className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Les trois grandes familles',
    description: 'Clustering, réduction de dimension et règles d\u2019association.',
  },
  {
    icon: <Boxes className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Le clustering',
    description: 'Regrouper des observations selon une mesure de similarité, puis interpréter les groupes.',
  },
  {
    icon: <Layers className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'La réduction de dimension',
    description: 'Résumer des variables nombreuses en conservant une partie de l\u2019information.',
  },
  {
    icon: <Link2 className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Les règles d\u2019association',
    description: 'Repérer des cooccurrences fréquentes et mesurer leur intérêt.',
  },
  {
    icon: <ShieldAlert className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Défis et limites',
    description: 'Valider des résultats sans étiquette et éviter les interprétations abusives.',
  },
];

const ApprentissageNonSupervise = () => {
  return (
    <CourseGuideLayout
      title="Apprentissage non supervisé"
      subtitle="Repérer des groupes, des tendances et des associations dans des données sans étiquettes"
      about={[
        "L\u2019apprentissage non supervisé cherche une structure dans des données qui n\u2019ont pas de réponse connue. Il ne prédit pas une étiquette\u00A0: il regroupe, résume ou signale des proximités, puis laisse l\u2019interprétation au domaine.",
        "Ce cours part de la différence avec l\u2019apprentissage supervisé, puis présente le clustering, la réduction de dimension et les règles d\u2019association. Les résultats sont toujours à valider avec des connaissances métier.",
      ]}
      learn={[
        "Distinguer apprentissage supervisé et non supervisé.",
        "Expliquer le principe du clustering et ses limites.",
        "Choisir une méthode de réduction de dimension selon l\u2019objectif.",
        "Interpréter des règles d\u2019association sans confondre fréquence et causalité.",
        "Repérer les résultats fragiles et les valider avec le domaine.",
      ]}
      plan={plan}
      info={{
        level: 'Débutant à intermédiaire',
        duration: '3\u00A0h\u00A030 environ, lecture et pratique comprises',
        prerequisites: 'Notions de statistiques descriptives et d\u2019algèbre linéaire de base.',
        contents: ['6 leçons', '1 quiz de fin de cours', 'Sources citées', 'Bilan et pistes de pratique'],
        audience: 'Étudiants, professionnels, data scientists',
        tags: ['Machine Learning', 'Data Science', 'Clustering', 'Analyse de Données'],
      }}
      related={[
        {
          to: '/cours/apprentissage-supervise',
          title: 'Apprentissage supervisé',
          description: 'Le cadre avec étiquettes\u00A0: classification, régression et évaluation.',
        },
        {
          to: '/cours/bases-mathematiques-ia',
          title: 'Bases mathématiques de l\u2019IA',
          description: 'Les notions de distance, de matrice et de probabilité utiles pour ces méthodes.',
        },
      ]}
    >
      <IntroductionSection />

      <LessonSection
        title="Supervisé ou non supervisé\u00A0: comprendre la différence"
        icon={<Scale className="h-6 w-6" />}
      >
        <SupervisedVsUnsupervisedComparison />
      </LessonSection>

      <LessonSection
        title="Les trois grandes familles d'apprentissage non supervisé"
        icon={<Network className="h-6 w-6" />}
      >
        <UnsupervisedTypesComparison />
      </LessonSection>

      <ClusteringSection />

      <DimensionalityReductionSection />

      <AssociationRulesSection />

      <ChallengesSection />

      <ClassicCourseQuiz slug="apprentissage-non-supervise" />

      <CourseSources sources={unsupervisedSources} />

      <CourseConclusion
        title="Bilan\u00A0: l'apprentissage non supervisé"
        summary="L'apprentissage non supervisé sert à explorer des données sans étiquettes\u00A0: regrouper des observations, résumer leurs variables, repérer des associations. Ses résultats restent à interpréter et à valider avec un expert du domaine."
        learningPoints={[
          "Le clustering regroupe des observations selon une mesure de similarité, à interpréter",
          "La réduction de dimensionnalité simplifie les données en conservant une grande part de l'information, mais pas toute",
          "Les règles d'association repèrent des liens fréquents entre éléments",
          "L'interprétation des résultats nécessite une expertise métier et du bon sens",
          "La validation des résultats est cruciale mais plus complexe qu'en supervisé",
          "La visualisation interactive aide à comprendre les algorithmes",
          "Chaque technique a ses avantages et cas d'usage spécifiques"
        ]}
        nextSteps={[
          "Pratiquer avec des jeux de données réels (Iris, Wine, Mall Customers)",
          "Apprendre les algorithmes avancés (DBSCAN, t-SNE, UMAP)",
          "Étudier les applications spécialisées par domaine métier",
          "Développer des compétences en visualisation de données",
          "Explorer les techniques hybrides (apprentissage semi-supervisé)",
          "Intégrer ces techniques dans des projets data science complets",
          "Approfondir les métriques d'évaluation pour l'apprentissage non supervisé"
        ]}
      />
    </CourseGuideLayout>
  );
};

export default ApprentissageNonSupervise;
