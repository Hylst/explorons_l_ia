// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/SectionHeading';

export interface RelatedLink {
  /** Route interne ("/cours/python-ia"). */
  to: string;
  title: string;
  description: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
  title?: string;
}

/**
 * Fin de page : quelques pages du site à lire ensuite.
 * Utilise Link (et non <a href>) pour rester sous le sous-chemin de déploiement.
 */
const RelatedLinks: React.FC<RelatedLinksProps> = ({ links, title = 'Pour continuer' }) => (
  <section className="mt-12 mb-4">
    <SectionHeading title={title} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="group block rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Card className="h-full transition-colors group-hover:border-primary/50">
            <CardContent className="p-4">
              <h3 className="font-semibold flex items-center gap-2">
                {link.title}
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </section>
);

export default RelatedLinks;
