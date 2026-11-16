// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Validation des cours approfondis (npm run test:unit). Imports relatifs ou de paquets seulement : chargé par Node.

import { z } from 'zod';

const text = z.string().trim().min(1);
const markdown = z.string().trim().min(20);

/** Un SVG écrit pour le site : rien d'exécutable, aucune ressource distante. */
const safeSvg = z
  .string()
  .trim()
  .refine((s) => s.startsWith('<svg') && s.endsWith('</svg>'), 'le SVG doit commencer par <svg et finir par </svg>')
  .refine((s) => !/<script|<foreignObject|\son[a-z]+\s*=|javascript:/i.test(s), 'script, foreignObject ou gestionnaire d’événement interdits')
  .refine((s) => !/(?:href|src)\s*=\s*["']\s*(?:https?:)?\/\//i.test(s), 'lien ou ressource externe interdits dans le SVG');

const diagramSchema = z
  .object({
    title: text,
    description: text,
    svg: safeSvg,
    steps: z.array(z.object({ title: text, explanation: text, highlight: z.array(text) })).min(1),
  })
  .superRefine((d, ctx) => {
    const ids = new Set([...d.svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    d.steps.forEach((step, i) =>
      step.highlight.forEach((id) => {
        if (!ids.has(id)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: `étape ${i + 1} : identifiant « ${id} » absent du SVG` });
      })
    );
  });

const quizSchema = z
  .object({ question: text, options: z.array(text).min(2).max(6), correctIndex: z.number().int().min(0), explanation: text })
  .refine((q) => q.correctIndex < q.options.length, 'correctIndex hors des options');

const coverSchema = z
  .object({
    src: z.string().regex(/^pics\/cours\/[a-z0-9-]+\.webp$/, 'chemin de couverture invalide'),
    alt: text.min(20, 'texte alternatif trop court'),
    caption: text.optional(),
  })
  .strict();

const exerciseSchema = z
  .object({
    title: text,
    prompt: markdown,
    solution: markdown,
  })
  .strict();

const sourceSchema = z
  .object({
    label: text,
    href: z.string().url().startsWith('https://'),
  })
  .strict();

const moduleSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: text,
  keyTakeaways: z.array(text).min(1),
  theory: markdown,
  analogy: z.object({ title: text, text: markdown }).optional(),
  example: z.object({ title: text, text: markdown }).optional(),
  diagram: diagramSchema.optional(),
  exercises: z.array(exerciseSchema).min(1).max(3).optional(),
  sources: z.array(sourceSchema).min(1).max(8).optional(),
  code: z
    .object({
      language: z.enum(['python', 'javascript', 'typescript', 'bash', 'text']),
      code: text,
      explanation: text.optional(),
      output: text.optional(),
      outputVerified: z.boolean().optional(),
    })
    .optional(),
  quiz: z.array(quizSchema).min(2),
  glossary: z.array(z.object({ term: text, definition: text })),
}).strict();

export const deepCourseSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: text,
    subtitle: text,
    level: z.enum(['Débutant', 'Intermédiaire', 'Avancé']),
    tags: z.array(text).min(1),
    summary: markdown,
    introduction: markdown,
    prerequisites: z.array(text),
    checkedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    cover: coverSchema.optional(),
    modules: z.array(moduleSchema).min(1),
    sources: z.array(sourceSchema),
    related: z.array(z.object({ to: z.string().startsWith('/'), title: text, description: text })),
  })
  .strict()
  .superRefine((c, ctx) => {
    const ids = c.modules.map((m) => m.id);
    if (new Set(ids).size !== ids.length) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'identifiants de modules en double' });
    if (c.cover && c.cover.src !== `pics/cours/${c.slug}.webp`) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'la couverture doit porter le slug du cours', path: ['cover', 'src'] });
    }
  });

/** Règles éditoriales vérifiables mécaniquement sur tout le texte d'un cours (renvoie la liste des problèmes). */
export function editorialIssues(course: unknown): string[] {
  const all = JSON.stringify(course);
  const issues: string[] = [];
  if (/[—–]/.test(all)) issues.push('tiret cadratin ou demi-cadratin');
  // « garanti » reste permis : le décodage contraint garantit réellement une syntaxe ; c'est la relecture qui juge.
  const banned = /(?<![\p{L}])(révolutionnaire|ultime|maîtrisez|incontournable|masterclass)(?![\p{L}])/iu;
  const hit = all.match(banned) ?? all.match(/\bVRAIMENT\b/);
  if (hit) issues.push(`vocabulaire promotionnel : « ${hit[0]} »`);
  return issues;
}
