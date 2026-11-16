// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  BookOpenCheck,
  ExternalLink,
  FlaskConical,
  GitPullRequest,
  GraduationCap,
  Headphones,
  Megaphone,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mailtoAuthor } from '@/config/site';
import ResourceCard from './ResourceCard';
import {
  agirActions,
  agirIntro,
  agirSections,
  type AgirAction,
  type AgirIcon,
  type AgirResource,
} from './data/agirData';

const actionIcons: Record<AgirIcon, LucideIcon> = {
  'graduation-cap': GraduationCap,
  headphones: Headphones,
  'shield-check': ShieldCheck,
  scale: Scale,
  megaphone: Megaphone,
  users: Users,
  'book-open-check': BookOpenCheck,
  'git-pull-request': GitPullRequest,
  'flask-conical': FlaskConical,
};

const reportHref = mailtoAuthor("Explorons l'IA : lien du guide Agir");

const AgirResourceLink: React.FC<{ resource: AgirResource }> = ({ resource }) => (
  <div className="flex flex-wrap items-center gap-2">
    <Button
      asChild
      variant="outline"
      size="sm"
      className="h-auto max-w-full justify-start whitespace-normal text-left"
    >
      {resource.isInternal ? (
        <Link to={resource.link}>
          <span>{resource.title}</span>
          <ArrowRight className="ml-2 h-3 w-3 shrink-0" aria-hidden="true" />
        </Link>
      ) : (
        <a href={resource.link} target="_blank" rel="noopener noreferrer">
          <span>{resource.title}</span>
          <ExternalLink className="ml-2 h-3 w-3 shrink-0" aria-hidden="true" />
        </a>
      )}
    </Button>
    <span className="text-xs text-muted-foreground">{resource.type}</span>
    {resource.note && (
      <Badge variant="outline" className="text-xs">
        {resource.note}
      </Badge>
    )}
  </div>
);

const AgirActionCard: React.FC<{ action: AgirAction }> = ({ action }) => {
  const Icon = actionIcons[action.icon];
  return (
    <article
      id={`agir-action-${action.id}`}
      aria-labelledby={`agir-action-${action.id}-titre`}
      className="h-full"
    >
      <Card className="h-full">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex items-start gap-3">
            <div className="shrink-0 rounded-full bg-primary/10 p-3">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 id={`agir-action-${action.id}-titre`} className="text-lg font-semibold">
              {action.title}
            </h3>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">{action.description}</p>
          <ul className="mb-5 space-y-2 text-sm">
            {action.ideas.map((idea) => (
              <li key={idea} className="flex gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{idea}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-2">
            {action.resources.map((resource) => (
              <AgirResourceLink key={resource.link} resource={resource} />
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

const AgirResourcesSection: React.FC = () => (
  <section className="space-y-12">
    <header className="space-y-4">
      <h2 className="text-2xl font-bold">{agirIntro.title}</h2>
      {agirIntro.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </header>

    <nav aria-label="Sommaire du guide Agir" className="flex flex-wrap gap-2">
      {agirSections.map((section) => (
        <Button key={section.id} asChild variant="outline" size="sm">
          <a href={`#agir-${section.id}`}>{section.title}</a>
        </Button>
      ))}
      <Button asChild variant="outline" size="sm">
        <a href="#agir-actions">Passer à l'action</a>
      </Button>
    </nav>

    {agirSections.map((section) => (
      <section
        key={section.id}
        id={`agir-${section.id}`}
        className="scroll-mt-24"
        aria-labelledby={`agir-${section.id}-titre`}
      >
        <h2 id={`agir-${section.id}-titre`} className="mb-2 text-2xl font-semibold">
          {section.title}
        </h2>
        <p className="mb-6 text-muted-foreground">{section.intro}</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.resources.map((resource) => (
            <ResourceCard
              key={resource.link}
              title={resource.title}
              source={resource.source}
              description={resource.description}
              link={resource.link}
              type={resource.type}
              year={resource.year}
              tags={resource.tags}
              isInternal={resource.isInternal}
              ctaLabel={resource.ctaLabel}
            />
          ))}
        </div>
      </section>
    ))}

    <section id="agir-actions" className="scroll-mt-24" aria-labelledby="agir-actions-titre">
      <h2 id="agir-actions-titre" className="mb-2 text-2xl font-semibold">
        Passer à l'action
      </h2>
      <p className="mb-6 text-muted-foreground">
        Neuf pistes concrètes, à adapter à votre contexte et à vos moyens.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {agirActions.map((action) => (
          <AgirActionCard key={action.id} action={action} />
        ))}
      </div>
    </section>

    <footer className="border-t pt-6 text-sm text-muted-foreground">
      <p>
        Un lien ne répond plus ou une fiche contient une erreur.{' '}
        <a href={reportHref} className="text-primary underline underline-offset-4">
          Signalez-la par e-mail
        </a>
        .
      </p>
    </footer>
  </section>
);

export default AgirResourcesSection;
