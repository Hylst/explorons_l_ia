// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ScrollHint from '@/components/common/ScrollHint';
import { normalizeDisplayMath } from '@/content/cours-approfondis/markdownText';

/**
 * Texte des cours approfondis : Markdown (tableaux GFM) et formules LaTeX ($…$ en ligne, $$…$$ en bloc),
 * rendues par KaTeX avec les polices servies par le site. Un montant en dollars s'écrit « \$ » dans le JSON
 * (« \\$ »), sinon il serait lu comme le début d'une formule ; npm run test:unit le vérifie.
 */

// KaTeX rend les formules en bloc dans un conteneur défilable. Sur mobile, ce conteneur doit être
// atteignable au clavier, sinon axe signale une zone défilable non focalisable.
const rehypeFocusMath = () => (tree: { children?: Array<{ type?: string; properties?: Record<string, unknown>; children?: unknown[] }> }) => {
  const walk = (node: { type?: string; properties?: Record<string, unknown>; children?: unknown[] }) => {
    if (node.type === 'element') {
      const className = node.properties?.className;
      if (Array.isArray(className) && className.includes('katex-display')) {
        node.properties = { ...node.properties, tabIndex: 0, role: 'region', ariaLabel: 'Formule' };
      }
    }
    if (Array.isArray(node.children)) node.children.forEach((child) => walk(child as typeof node));
  };
  walk(tree);
};

const components: Components = {
  h1: ({ children }) => (
    <h3 className="mb-4 mt-10 border-b border-border pb-2 text-2xl font-bold tracking-tight md:text-3xl">{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className="mb-4 mt-10 border-b border-border pb-2 text-2xl font-bold tracking-tight md:text-3xl">{children}</h3>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 border-l-4 border-primary/70 pl-3 text-xl font-semibold tracking-tight md:text-2xl">{children}</h3>
  ),
  h4: ({ children }) => <h4 className="mb-2 mt-6 text-base font-semibold text-primary md:text-lg">{children}</h4>,
  h5: ({ children }) => <h4 className="mb-2 mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{children}</h4>,
  h6: ({ children }) => <h4 className="mb-2 mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{children}</h4>,
  p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 list-disc space-y-1.5 pl-6 marker:text-primary">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1.5 pl-6 marker:text-primary">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-lg border-l-4 border-primary bg-primary/5 px-4 py-3 [&>p:last-child]:mb-0">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-6 border-border" />,
  a: ({ href = '', children }) =>
    href.startsWith('/') ? (
      <Link to={href} className="text-primary underline underline-offset-2">
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
        {children}
      </a>
    ),
  table: ({ children }) => (
    <div className="my-4">
      <div tabIndex={0} role="region" aria-label="Tableau" className="relative overflow-x-auto rounded-md border">
        <table className="w-full text-sm border-collapse">{children}</table>
      </div>
      <ScrollHint />
    </div>
  ),
  th: ({ children, style }) => (
    <th style={style} className="border-b bg-muted px-3 py-2 text-left font-semibold align-bottom">
      {children}
    </th>
  ),
  td: ({ children, style }) => (
    <td style={style} className="border-b px-3 py-2 align-top">
      {children}
    </td>
  ),
  pre: ({ children }) => (
    <pre tabIndex={0} role="region" aria-label="Exemple de code" className="my-4 overflow-x-auto rounded-md border bg-muted p-4 text-sm">
      {children}
    </pre>
  ),
  code: ({ className, children }) =>
    className ? (
      <code className={`${className} font-mono`}>{children}</code>
    ) : (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
    ),
};

/** Variante compacte (listes « À retenir ») : paragraphes sans marge. */
const compactComponents: Components = { ...components, p: ({ children }) => <p className="leading-relaxed">{children}</p> };

const DeepMarkdown: React.FC<{ children: string; compact?: boolean }> = ({ children, compact = false }) => (
  <div className="deep-markdown min-w-0">
    <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeFocusMath]} components={compact ? compactComponents : components}>
      {normalizeDisplayMath(children)}
    </Markdown>
  </div>
);

export default DeepMarkdown;
