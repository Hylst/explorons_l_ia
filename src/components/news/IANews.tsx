// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Rss } from 'lucide-react';

interface NewsSource {
  name: string;
  url: string;
  rss?: string;
  kind: 'Recherche' | 'Média' | 'Institution';
  description: string;
}

// Sources de veille, en lien direct : aucun flux n'est chargé par la page
// (pas de proxy RSS tiers, pas de favicon distant). Pour suivre les flux,
// copier l'adresse RSS dans votre lecteur (Feedly, Inoreader, Thunderbird...).
const sources: NewsSource[] = [
  {
    name: 'Interstices',
    url: 'https://interstices.info/',
    rss: 'https://interstices.info/feed/',
    kind: 'Recherche',
    description: "Revue de culture scientifique en sciences du numérique (Inria, CNRS, universités), dont l'IA.",
  },
  {
    name: 'Inria',
    url: 'https://www.inria.fr/fr/actualites',
    rss: 'https://www.inria.fr/rss.xml',
    kind: 'Recherche',
    description: "Actualités de l'institut national de recherche en sciences et technologies du numérique.",
  },
  {
    name: 'HAL Science',
    url: 'https://hal.science/',
    kind: 'Recherche',
    description: 'Archive ouverte de publications scientifiques (établissements français ou étrangers), pour remonter aux sources.',
  },
  {
    name: 'CNIL - Intelligence artificielle',
    url: 'https://www.cnil.fr/fr/intelligence-artificielle',
    kind: 'Institution',
    description: "Recommandations et actualités de la CNIL sur l'IA et les données personnelles.",
  },
  {
    name: 'Numerama',
    url: 'https://www.numerama.com/tech/intelligence-artificielle/',
    rss: 'https://www.numerama.com/tech/intelligence-artificielle/feed/',
    kind: 'Média',
    description: "Actualité grand public de l'IA et du numérique.",
  },
  {
    name: 'Usbek & Rica',
    url: 'https://usbeketrica.com/fr',
    rss: 'https://usbeketrica.com/fr/rss',
    kind: 'Média',
    description: "Magazine d'exploration des futurs\u00A0: enjeux sociétaux de la technologie.",
  },
  {
    name: 'Siècle Digital',
    url: 'https://siecledigital.fr/',
    rss: 'https://siecledigital.fr/feed/',
    kind: 'Média',
    description: 'Actualité du numérique et des entreprises technologiques.',
  },
  {
    name: 'Futura Sciences',
    url: 'https://www.futura-sciences.com/tech/',
    rss: 'https://www.futura-sciences.com/rss/actualites.xml',
    kind: 'Média',
    description: 'Vulgarisation scientifique et technologique.',
  },
];

const IANews = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-2">
      <Rss className="w-5 h-5 text-primary" />
      <h2 className="text-2xl font-bold tracking-tight">Sources de veille</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sources.map((source) => (
        <Card key={source.name} className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-lg">{source.name}</CardTitle>
              <Badge variant="secondary">{source.kind}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 gap-3">
            <p className="text-sm text-muted-foreground flex-1">{source.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Visiter <ExternalLink className="h-3 w-3" />
              </a>
              {source.rss && (
                <a
                  href={source.rss}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  Flux RSS <Rss className="h-3 w-3" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default IANews;
