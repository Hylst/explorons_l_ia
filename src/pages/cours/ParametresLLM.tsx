// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import PedagogicalPreface from '@/components/courses/parametres-llm/PedagogicalPreface';
import ArchitectureSection from '@/components/courses/parametres-llm/ArchitectureSection';
import TrainingParametersSection from '@/components/courses/parametres-llm/TrainingParametersSection';
import InferenceParametersSection from '@/components/courses/parametres-llm/InferenceParametersSection';
import CapabilitiesSection from '@/components/courses/parametres-llm/CapabilitiesSection';
import OptimizationSection from '@/components/courses/parametres-llm/OptimizationSection';
import PracticalApplicationsSection from '@/components/courses/parametres-llm/PracticalApplicationsSection';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import { Layers, SlidersHorizontal, Gauge, Sparkles, Wrench, Briefcase } from 'lucide-react';

const llmSources = [
  { label: 'Vaswani et al. (2017)\u00A0: Attention Is All You Need', href: 'https://arxiv.org/abs/1706.03762' },
  { label: 'Brown et al. (2020)\u00A0: Language Models are Few-Shot Learners', href: 'https://arxiv.org/abs/2005.14165' },
  { label: 'Wei et al. (2022)\u00A0: Emergent Abilities of Large Language Models', href: 'https://arxiv.org/abs/2206.07682' },
  { label: 'Schaeffer et al. (2023)\u00A0: Are Emergent Abilities of Large Language Models a Mirage?', href: 'https://arxiv.org/abs/2304.15004' },
  { label: 'Kaplan et al. (2020)\u00A0: Scaling Laws for Neural Language Models', href: 'https://arxiv.org/abs/2001.08361' },
  { label: 'Loshchilov et Hutter (2019)\u00A0: Decoupled Weight Decay Regularization', href: 'https://arxiv.org/abs/1711.05101' },
  { label: 'Stanford AI Index (2024)\u00A0: rapport annuel', href: 'https://hai.stanford.edu/ai-index' },
  { label: 'Anthropic\u00A0: documentation des modèles Claude', href: 'https://platform.claude.com/docs/en/models/overview' },
  { label: 'Hugging Face\u00A0: stratégies de génération de texte', href: 'https://huggingface.co/docs/transformers/main/en/generation_strategies' },
];

const llmQuizQuestions: QuizQuestion[] = [
  {
    question: "Que fait une température élevée au moment de l'inférence\u00A0?",
    options: [
      'Elle rend la distribution plus plate et les réponses plus variées',
      'Elle garantit des réponses plus factuelles',
      'Elle augmente la taille du modèle',
      'Elle supprime le top-p',
    ],
    correctAnswer: 0,
    explanation: "Une température plus élevée aplatit la distribution des probabilités. Elle augmente la diversité possible, pas l'exactitude des réponses.",
  },
  {
    question: "Que contrôle top-p\u00A0?",
    options: [
      'Le nombre de couches du modèle',
      'Le sous-ensemble de tokens dont la probabilité cumulée atteint p',
      'La taille du contexte',
      'Le nombre de GPU utilisés',
    ],
    correctAnswer: 1,
    explanation: "Top-p, ou échantillonnage du noyau, garde les tokens les plus probables jusqu'à atteindre une masse de probabilité p, puis échantillonne parmi eux.",
  },
  {
    question: "La fenêtre de contexte d'un LLM désigne...",
    options: [
      'Sa mémoire persistante entre les sessions',
      'Le nombre de paramètres entraînés',
      'Le nombre maximal de tokens qu\u2019il peut prendre en compte dans un appel',
      "La durée de son entraînement",
    ],
    correctAnswer: 2,
    explanation: "La fenêtre de contexte est la quantité de tokens que le modèle peut lire dans un appel. Elle ne constitue pas une mémoire persistante entre les sessions.",
  },
  {
    question: "Que faut-il vérifier après avoir quantifié un modèle\u00A0?",
    options: [
      'Uniquement la taille du fichier',
      "Que le modèle n'utilise plus de tokens",
      'Que la température est fixée à 1',
      "La qualité sur ses cas d'usage, car la réduction de précision peut dégrader certaines réponses",
    ],
    correctAnswer: 3,
    explanation: "La quantization réduit la mémoire et parfois la qualité. Il faut mesurer sur ses propres cas, en particulier si la tâche est sensible aux détails.",
  },
];

const plan: CoursePlanItem[] = [
  {
    icon: <Layers className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Architecture',
    description: 'Ce que les couches, l\u2019attention et la taille du modèle changent.',
  },
  {
    icon: <SlidersHorizontal className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Paramètres d\u2019entraînement',
    description: 'Données, objectif, taux d\u2019apprentissage et régularisation.',
  },
  {
    icon: <Gauge className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Paramètres d\u2019inférence',
    description: 'Température, top-p, longueur et fenêtre de contexte.',
  },
  {
    icon: <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Capacités et limites',
    description: 'Ce que les évaluations mesurent, et ce qu\u2019elles ne mesurent pas.',
  },
  {
    icon: <Wrench className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Optimisation',
    description: 'Quantization, mémoire et compromis de déploiement.',
  },
  {
    icon: <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Applications',
    description: 'Choisir et régler un modèle pour un usage réel.',
  },
];

const ParametresLLM = () => {
  return (
    <CourseGuideLayout
      title="Les paramètres des LLM"
      subtitle="Comprendre et régler les modèles de langage"
      about={[
        "Un modèle de langage ne se règle pas avec un seul bouton. Sa taille, son entraînement, sa fenêtre de contexte et ses paramètres d\u2019inférence déterminent ce qu\u2019il peut faire, à quel coût et avec quelles limites.",
        "Ce cours relie l\u2019architecture aux réglages pratiques. Il distingue ce qui est appris pendant l\u2019entraînement de ce qui se décide à chaque appel.",
      ]}
      learn={[
        "Lire les caractéristiques techniques d\u2019un LLM sans confondre taille et qualité.",
        "Distinguer paramètres d\u2019entraînement et paramètres d\u2019inférence.",
        "Expliquer l\u2019effet de la température, de top-p et du contexte.",
        "Reconnaître les limites des benchmarks et des capacités annoncées.",
        "Choisir un compromis de quantization et de coût pour un usage donné.",
      ]}
      plan={plan}
      info={{
        level: 'Intermédiaire à avancé',
        duration: '4 à 5 heures, lecture et pratique comprises',
        prerequisites: 'Notions de modèle de langage, de token et de probabilité.',
        contents: ['6 leçons', '1 quiz de fin de cours', 'Sources citées', 'Bilan et liens liés'],
        audience: "Développeurs, data scientists, décideurs techniques, curieux de l'IA",
        tags: ['LLM', 'Architecture', 'Hyperparamètres', 'Optimisation', 'Performance', 'Techniques', 'Guide pratique'],
      }}
      related={[
        {
          to: '/cours/nlp-comprehension',
          title: 'NLP et compréhension du langage',
          description: 'Les concepts qui précèdent les paramètres\u00A0: tokens, embeddings, attention et Transformers.',
        },
        {
          to: '/cours/prompt-engineering',
          title: 'Prompt engineering',
          description: 'Formuler ses demandes et vérifier les réponses, indépendamment des réglages du modèle.',
        },
        {
          to: '/cours/coder-avec-ia',
          title: "Coder une application avec l'IA",
          description: 'Assistants de code, intégration et risques du code généré.',
        },
      ]}
    >
      <PedagogicalPreface />

      <ArchitectureSection />

      <TrainingParametersSection />

      <InferenceParametersSection />

      <CapabilitiesSection />

      <OptimizationSection />

      <PracticalApplicationsSection />

      <CourseSources sources={llmSources} />

      <CourseQuiz title="Quiz\u00A0: les paramètres des LLM" questions={llmQuizQuestions} />

      <CourseConclusion
        title="Conclusion\u00A0: les paramètres des LLM en résumé"
        description="Vous avez parcouru les paramètres qui caractérisent un LLM et la façon de les utiliser pour choisir et régler un modèle."
        learningPoints={[
          "Comprendre l'architecture fondamentale des LLM et son influence sur les performances",
          "Connaître les hyperparamètres d'entraînement et d'inférence et leurs effets",
          "Identifier les capacités émergentes et anticiper les limitations structurelles",
          "Appliquer les bonnes techniques d'optimisation selon votre contexte d'usage",
          "Choisir un modèle adapté à vos besoins et à vos contraintes techniques",
          "Éviter les pièges courants et estimer les coûts de déploiement"
        ]}
        nextSteps={[
          "Expérimentez avec différents paramètres d'inférence sur vos cas d'usage réels",
          "Explorez les benchmarks pour comparer les modèles dans votre domaine spécifique",
          "Testez les techniques de quantization pour optimiser vos coûts de déploiement",
          "Suivez l'évolution des nouvelles architectures (MoE, nouveaux Transformers)",
          "Échangez avec des communautés techniques sur vos expériences d'optimisation",
          "Suivez les nouveaux modèles dans la documentation officielle des éditeurs, et les articles de recherche du moment sur Hugging Face (rubrique «\u00A0Trending Papers\u00A0») et sur arXiv"
        ]}
      />
    </CourseGuideLayout>
  );
};

export default ParametresLLM;
