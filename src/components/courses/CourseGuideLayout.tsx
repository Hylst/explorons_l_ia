// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import RelatedLinks, { RelatedLink } from '@/components/courses/RelatedLinks';
import { Badge } from '@/components/ui/badge';
import BackToResourcesButton from '@/components/courses/BackToResourcesButton';
import { AUTHOR_NAME, AUTHOR_TITLE } from '@/config/site';

export interface CoursePlanItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface CourseGuideLayoutProps {
  title: string;
  subtitle: string;
  /** Paragraphes de présentation ("À propos de ce cours"). */
  about: string[];
  /** Ce que le cours permet d'apprendre. */
  learn: string[];
  /** Un bloc par leçon, dans l'ordre des leçons de la page (numérotés automatiquement). */
  plan: CoursePlanItem[];
  info: {
    level: string;
    /** Estimation honnête de lecture et de pratique, sans promesse de suivi ni d'encadrement. */
    duration: string;
    prerequisites: string;
    /** Ce que la page contient réellement (leçons, exemples de code, quiz...). */
    contents: string[];
    /** Public visé, repris de l'ancien en-tête. */
    audience?: string;
    /** Étiquettes de l'ancien en-tête. */
    tags?: string[];
  };
  related?: RelatedLink[];
  /** Leçons puis quiz. */
  children: React.ReactNode;
}

/**
 * Gabarit des cours "guide" : présentation, plan, leçons, quiz, et fiche d'information latérale.
 * La fiche décrit uniquement ce que la page contient : pas de vidéos, de notebooks ni de suivi.
 */
const CourseGuideLayout: React.FC<CourseGuideLayoutProps> = ({
  title,
  subtitle,
  about,
  learn,
  plan,
  info,
  related,
  children,
}) => (
  <>
    <Hero title={title} subtitle={subtitle} />

    <section className="section-container mb-10">
      <BackToResourcesButton />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 min-w-0">
          <div className="mb-8">
            <SectionHeading title="À propos de ce cours" />
            {about.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? 'text-lg mb-4' : 'mb-4'}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mb-8">
            <SectionHeading title="Ce que vous apprendrez" />
            <ul className="space-y-2">
              {learn.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <SectionHeading title="Plan du cours" />
            <div className="space-y-4">
              {plan.map((item, index) => (
                <Card key={item.title}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      {item.icon}
                      Leçon {index + 1} : {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {children}

          {related && related.length > 0 && <RelatedLinks links={related} />}
        </div>

        <div className="md:w-1/3">
          <Card className="md:sticky md:top-24">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Informations sur le cours</h3>
              {info.tags && info.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {info.tags.map((tag, index) => (
                    <Badge key={tag} variant={index === 0 ? 'default' : index === 1 ? 'secondary' : 'outline'}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-sm text-muted-foreground mb-1">Auteur</dt>
                  <dd>
                    {AUTHOR_NAME}
                    <span className="block text-sm text-muted-foreground">{AUTHOR_TITLE}</span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-sm text-muted-foreground mb-1">Niveau</dt>
                  <dd>{info.level}</dd>
                </div>
                <div>
                  <dt className="font-medium text-sm text-muted-foreground mb-1">Durée estimée</dt>
                  <dd>{info.duration}</dd>
                </div>
                <div>
                  <dt className="font-medium text-sm text-muted-foreground mb-1">Prérequis</dt>
                  <dd>{info.prerequisites}</dd>
                </div>
                {info.audience && (
                  <div>
                    <dt className="font-medium text-sm text-muted-foreground mb-1">Public</dt>
                    <dd>{info.audience}</dd>
                  </div>
                )}
                <div className="pt-2">
                  <dt className="font-medium text-sm text-muted-foreground mb-2">Dans cette page</dt>
                  <dd>
                    <ul className="space-y-2">
                      {info.contents.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </>
);

export default CourseGuideLayout;
