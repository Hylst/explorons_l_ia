// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Format des « cours approfondis » : un fichier JSON par cours dans ce dossier, validé par schema.ts
// (npm run test:unit). Les textes sont en Markdown (tableaux GFM, formules LaTeX entre $ ou $$).
// Imports relatifs uniquement : ce fichier est lu par Node au build.

export type DeepCourseLevel = 'Débutant' | 'Intermédiaire' | 'Avancé';

export interface DeepCourseSource {
  label: string;
  href: string;
}

/** Une étape d'un schéma : les éléments SVG dont l'identifiant est listé sont mis en avant, les autres estompés. */
export interface DiagramStep {
  title: string;
  explanation: string;
  highlight: string[];
}

export interface DeepCourseDiagram {
  title: string;
  description: string;
  /** SVG statique écrit pour le cours (contrôlé par le test : ni script, ni gestionnaire d'événement, ni lien externe). */
  svg: string;
  steps: DiagramStep[];
}

export interface DeepCourseCode {
  language: 'python' | 'javascript' | 'typescript' | 'bash' | 'text';
  code: string;
  explanation?: string;
  /** Sortie affichée sous le code. */
  output?: string;
  /** Vrai seulement si la sortie a été obtenue en exécutant ce code ; sinon elle est présentée comme indicative. */
  outputVerified?: boolean;
}

export interface DeepCourseQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DeepCourseExercise {
  title: string;
  /** Énoncé, en Markdown. */
  prompt: string;
  /** Solution repliée par défaut, en Markdown. */
  solution: string;
}

export interface DeepCourseTerm {
  term: string;
  definition: string;
}

export interface DeepCourseModule {
  id: string;
  title: string;
  keyTakeaways: string[];
  /** Corps de la leçon, en Markdown. */
  theory: string;
  analogy?: { title: string; text: string };
  example?: { title: string; text: string };
  diagram?: DeepCourseDiagram;
  exercises?: DeepCourseExercise[];
  /** Sources propres au module, affichées sous la leçon. */
  sources?: DeepCourseSource[];
  code?: DeepCourseCode;
  quiz: DeepCourseQuiz[];
  glossary: DeepCourseTerm[];
}

export interface DeepCourseCover {
  /** Chemin public relatif, sans slash initial : pics/cours/<slug>.webp */
  src: string;
  /** Texte alternatif descriptif, au moins 20 caractères. */
  alt: string;
  /** Légende optionnelle, affichée sous l'image. */
  caption?: string;
}

export interface DeepCourse {
  slug: string;
  title: string;
  subtitle: string;
  level: DeepCourseLevel;
  tags: string[];
  /** Paragraphe de présentation (Markdown court). */
  summary: string;
  /** Mise en contexte : pourquoi ce sujet, d'où il vient, ce qu'on saura faire à la fin (Markdown). */
  introduction: string;
  prerequisites: string[];
  /** Date de la dernière vérification du contenu (AAAA-MM-JJ). */
  checkedOn: string;
  /** Couverture illustrative optionnelle. */
  cover?: DeepCourseCover;
  modules: DeepCourseModule[];
  sources: DeepCourseSource[];
  /** Pages du site à lire avant ou après (chemin interne, ex. « /types-ia »). */
  related: { to: string; title: string; description: string }[];
}
