// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import IntroductionSection from '@/components/courses/chainofprompts/IntroductionSection';
import ChainConceptsSection from '@/components/courses/chainofprompts/ChainConceptsSection';
import TechnicalArchitectureSection from '@/components/courses/chainofprompts/TechnicalArchitectureSection';
import PracticalApplicationsSection from '@/components/courses/chainofprompts/PracticalApplicationsSection';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import ClassicCourseQuiz from '@/components/courses/ClassicCourseQuiz';
import { ListChecks, Workflow, Layers, Compass } from 'lucide-react';

const chainSources = [
  { label: 'Anthropic\u00A0: guide de prompt engineering (PDF)', href: 'https://www-cdn.anthropic.com/62df988c101af71291b06843b63d39bbd600bed8.pdf' },
  { label: 'OpenAI\u00A0: bonnes pratiques de prompt engineering', href: 'https://help.openai.com/en/articles/6654000-prompt-engineering-guide' },
  { label: 'Wei et al. (2022)\u00A0: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', href: 'https://arxiv.org/abs/2201.11903' },
  { label: 'Zhou et al. (2022)\u00A0: Least-to-Most Prompting Enables Complex Reasoning in Large Language Models', href: 'https://arxiv.org/abs/2205.10625' },
  { label: 'Madaan et al. (2023)\u00A0: Self-Refine, Iterative Refinement with Self-Feedback', href: 'https://arxiv.org/abs/2303.17651' },
];

const plan: CoursePlanItem[] = [
  {
    icon: <ListChecks className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Pourquoi chaîner les prompts',
    description: 'Décomposer une tâche complexe en étapes vérifiables au lieu de tout demander en une fois.',
  },
  {
    icon: <Workflow className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Les concepts du chaînage',
    description: 'Étapes, entrées et sorties intermédiaires, critères de passage et reprises.',
  },
  {
    icon: <Layers className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Architecture d\u2019une chaîne',
    description: 'Enchaîner les appels, conserver le contexte utile et contrôler les résultats intermédiaires.',
  },
  {
    icon: <Compass className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Applications et limites',
    description: 'Cas d\u2019usage professionnels, coûts, erreurs propagées et vérification humaine.',
  },
];

const ChainOfPrompts = () => {
  return (
    <CourseGuideLayout
      title="Le chaînage de prompts"
      subtitle="Décomposer une tâche en prompts successifs et vérifier chaque étape"
      about={[
        "Le chaînage de prompts consiste à découper une tâche en plusieurs demandes successives. Chaque étape produit un résultat que la suivante peut utiliser, ce qui rend le travail plus lisible et plus facile à corriger.",
        "Ce cours montre quand ce découpage aide, comment vérifier les sorties intermédiaires et pourquoi une chaîne mal contrôlée peut propager une erreur au lieu de la réduire.",
      ]}
      learn={[
        "Reconnaître les tâches qui gagnent à être décomposées.",
        "Concevoir une chaîne avec des étapes et des critères de passage explicites.",
        "Vérifier les résultats intermédiaires avant de continuer.",
        "Repérer les erreurs propagées, les coûts et les limites d\u2019une chaîne.",
      ]}
      plan={plan}
      info={{
        level: 'Débutant à intermédiaire',
        duration: '45 à 60 minutes',
        prerequisites: 'Savoir formuler une demande à un modèle de langage et lire une réponse.',
        contents: ['4 leçons', '1 quiz de fin de cours', 'Sources citées', 'Bilan et pistes de pratique'],
        audience: 'Professionnels, étudiants, curieux',
        tags: ['Chain of Prompts', 'Prompt Engineering', 'Communication IA', 'Méthodologie'],
      }}
      related={[
        {
          to: '/cours/prompt-engineering',
          title: 'Prompt engineering',
          description: 'Les bases de la formulation, des exemples et des critères de sortie.',
        },
        {
          to: '/cours/parametres-llm',
          title: 'Paramètres des LLM',
          description: 'Température, top-p et contexte\u00A0: ce qui change le comportement d\u2019un modèle.',
        },
      ]}
    >
      <IntroductionSection />

      <ChainConceptsSection />

      <TechnicalArchitectureSection />

      <PracticalApplicationsSection />

      <ClassicCourseQuiz slug="chain-of-prompts" />

      <CourseSources sources={chainSources} />

      <CourseConclusion
        title="Conclusion\u00A0: dialoguer avec l'IA par étapes"
        description="Vous disposez de bases pour concevoir des chaînes de prompts et vérifier leurs résultats."
        learningPoints={[
          "Comprendre les mécanismes du chain of prompts et ses avantages",
          "Décomposer un problème complexe en étapes simples",
          "Appliquer de bonnes pratiques de communication avec l'IA",
          "Utiliser les modèles avancés d'enchaînement selon le contexte",
          "Mesurer et optimiser l'efficacité de vos chaînes de prompts"
        ]}
        nextSteps={[
          "Pratiquez avec des cas concrets dans votre domaine professionnel",
          "Explorez le cours sur le Prompt Engineering pour approfondir",
          "Testez les modèles convergents et itératifs sur des projets réels",
          "Échangez avec des communautés sur vos expériences",
          "Consultez les ressources avancées sur l'optimisation des prompts"
        ]}
      />
    </CourseGuideLayout>
  );
};

export default ChainOfPrompts;
