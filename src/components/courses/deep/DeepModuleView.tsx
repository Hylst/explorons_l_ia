// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { BookOpen, CheckCircle2, Lightbulb, Link2, ListChecks, Pencil, Terminal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CodeExample from '@/components/courses/CodeExample';
import CourseQuiz from '@/components/courses/CourseQuiz';
import DeepMarkdown from './DeepMarkdown';
import StepDiagram from './StepDiagram';
import ConvolutionLab from './ConvolutionLab';
import ThresholdLab from './ThresholdLab';
import MaskLab from './MaskLab';
import type { DeepCourseModule } from '@/content/cours-approfondis/types';

const CODE_LABELS: Record<string, string> = { python: 'Python', javascript: 'JavaScript', typescript: 'TypeScript', bash: 'Terminal', text: 'Texte' };

interface Props {
  module: DeepCourseModule;
  index: number;
  courseSlug: string;
}

const DeepModuleView: React.FC<Props> = ({ module, index, courseSlug }) => (
  <article aria-labelledby={`titre-${module.id}`}>
    <p className="text-sm font-medium text-primary">Module {index + 1}</p>
    <h2 id={`titre-${module.id}`} className="text-2xl md:text-3xl font-bold mt-1 mb-5">
      {module.title}
    </h2>
    <Card className="mb-6 border-primary/30 bg-primary/5">
      <CardContent className="p-4 sm:p-5">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <ListChecks className="h-5 w-5 text-primary" aria-hidden="true" />À retenir
        </h3>
        <ul className="space-y-2">
          {module.keyTakeaways.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
              <span className="min-w-0">
                <DeepMarkdown compact>{item}</DeepMarkdown>
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <DeepMarkdown>{module.theory}</DeepMarkdown>

    {module.analogy && (
      <aside className="my-6 rounded-r-md border-l-4 border-blue-400 bg-blue-50 p-4 dark:border-blue-500 dark:bg-blue-950/30">
        <p className="mb-2 flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-200">
          <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          Analogie : {module.analogy.title}
        </p>
        <div className="text-blue-900 dark:text-blue-100">
          <DeepMarkdown>{module.analogy.text}</DeepMarkdown>
        </div>
      </aside>
    )}

    {module.example && (
      <aside className="my-6 rounded-r-md border-l-4 border-green-500 bg-green-50 p-4 dark:border-green-500 dark:bg-green-950/30">
        <p className="mb-2 flex items-center gap-2 font-semibold text-green-800 dark:text-green-200">
          <BookOpen className="h-5 w-5 text-green-700 dark:text-green-400" aria-hidden="true" />
          Exemple : {module.example.title}
        </p>
        <div className="text-green-900 dark:text-green-100">
          <DeepMarkdown>{module.example.text}</DeepMarkdown>
        </div>
      </aside>
    )}

    {courseSlug === 'cnn-architectures-vision' && module.id === 'convolution' && <ConvolutionLab />}
    {courseSlug === 'jev' && module.id === 'calibration' && <ThresholdLab />}
    {courseSlug === 'decodage-contraint' && module.id === 'masquage-des-tokens' && <MaskLab />}

    {module.exercises && module.exercises.length > 0 && (
      <section className="my-6" aria-labelledby={`exercices-${module.id}`}>
        <h3 id={`exercices-${module.id}`} className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <Pencil className="h-5 w-5 text-primary" aria-hidden="true" />
          À vous de jouer
        </h3>
        <div className="space-y-3">
          {module.exercises.map((exercise, index) => (
            <details key={exercise.title} className="rounded-md border bg-card p-4">
              <summary className="cursor-pointer font-medium">
                Exercice {index + 1} : {exercise.title}
              </summary>
              <div className="mt-3 text-sm">
                <DeepMarkdown>{exercise.prompt}</DeepMarkdown>
                <details className="mt-3 rounded-md border bg-muted/40 p-3">
                  <summary className="cursor-pointer font-medium text-primary">Voir la solution</summary>
                  <div className="mt-2">
                    <DeepMarkdown>{exercise.solution}</DeepMarkdown>
                  </div>
                </details>
              </div>
            </details>
          ))}
        </div>
      </section>
    )}

    {module.diagram && <StepDiagram diagram={module.diagram} />}

    {module.sources && module.sources.length > 0 && (
      <section className="my-6" aria-labelledby={`sources-${module.id}`}>
        <h3 id={`sources-${module.id}`} className="mb-2 flex items-center gap-2 text-xl font-semibold">
          <Link2 className="h-5 w-5 text-primary" aria-hidden="true" />
          Sources du module
        </h3>
        <ul className="list-disc space-y-1 pl-6 text-sm">
          {module.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    )}

    {module.code && (
      <div className="my-6">
        <CodeExample title="Pour expérimenter" language={CODE_LABELS[module.code.language]} code={module.code.code} explanation={module.code.explanation} />
        {module.code.output && (
          <div className="-mt-2 mb-6">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium">
              <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
              {module.code.outputVerified ? 'Sortie obtenue en exécutant ce code' : 'Sortie indicative (non exécutée ici\u00A0: elle peut varier selon les versions et le hasard)'}
            </p>
            <pre tabIndex={0} role="region" aria-label="Sortie du code" className="overflow-x-auto rounded-md border bg-muted p-3 text-sm">
              <code>{module.code.output}</code>
            </pre>
          </div>
        )}
      </div>
    )}

    {module.quiz.length > 0 && (
      <CourseQuiz
        title={module.quiz.length > 1 ? 'Vérifier sa compréhension' : 'Une question pour vérifier'}
        questions={module.quiz.map((q) => ({ question: q.question, options: q.options, correctAnswer: q.correctIndex, explanation: q.explanation }))}
      />
    )}

    {module.glossary.length > 0 && (
      <section className="my-8" aria-label="Vocabulaire du module">
        <h3 className="mb-3 border-l-4 border-primary/70 pl-3 text-xl font-semibold">Vocabulaire du module</h3>
        <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {module.glossary.map((entry) => (
            <div key={entry.term} className="rounded-md border p-3">
              <dt className="font-medium">{entry.term}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </section>
    )}
  </article>
);

export default DeepModuleView;
