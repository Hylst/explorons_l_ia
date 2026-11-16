// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/SectionHeading';
import { multimodalExamples, AppExample } from './ApplicationsData';

/** Fiches de ApplicationsData.ts reprises dans la section audio (dans cet ordre). */
const AUDIO_IDS = ['synthese-vocale', 'creation-musicale'];

const audioApplications: AppExample[] = AUDIO_IDS
  .map(id => multimodalExamples.find(app => app.id === id))
  .filter((app): app is AppExample => app !== undefined);

/**
 * Section audio de la page IA multimodale : synthèse vocale et création musicale.
 * Le contenu vient de ApplicationsData.ts, il n'est pas dupliqué ici.
 */
const AudioSection: React.FC = () => {
  return (
    <div className="section-container">
      <SectionHeading
        pretitle="Audio et voix"
        title="IA audio et synthèse vocale"
        description="Découvrez comment l'IA transforme la création et la manipulation audio, de la synthèse vocale à la génération musicale."
        center
      />

      <p className="max-w-3xl mx-auto mb-10 text-center text-muted-foreground">
        Deux usages sont présentés ici : la synthèse vocale, qui transforme un texte en parole, et la création
        musicale, qui produit des morceaux à partir d'une description ou d'un exemple sonore. Les outils cités sont
        des exemples et évoluent régulièrement : vérifiez leurs conditions d'utilisation et leurs licences
        avant de publier un contenu généré.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {audioApplications.map(app => {
          const IconComponent = app.iconComponent;
          return (
            <Card key={app.id} className="h-full border-primary/10">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <IconComponent size={24} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="heading-sm">{app.title}</h3>
                </div>

                <p className="text-muted-foreground mb-3">{app.description}</p>
                {app.detailedDescription?.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground text-sm mb-3">{paragraph}</p>
                ))}

                <div className="mt-2 mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Outils cités :</p>
                  <div className="flex flex-wrap gap-1.5">
                    {app.tools.map(tool => (
                      <span key={tool} className="inline-block px-2 py-1 bg-secondary/40 text-xs rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {app.resources && app.resources.length > 0 && (
                  <div className="mt-auto">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">Pour aller plus loin :</p>
                    <ul className="space-y-1.5">
                      {app.resources.map(resource => (
                        <li key={resource.url}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm flex items-center gap-1"
                          >
                            <span>{resource.title}</span>
                            <ExternalLink size={14} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AudioSection;
