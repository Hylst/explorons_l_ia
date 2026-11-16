// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ToolHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  /** Ce que l'outil fait vraiment, en trois points courts. */
  facts: string[];
}

/** En-tête commun des outils de données : retour aux outils, titre, et ce que fait l'outil. */
const ToolHeader: React.FC<ToolHeaderProps> = ({ icon: Icon, title, subtitle, facts }) => (
  <Card className="bg-linear-to-r from-primary/5 to-primary/10 border-primary/20">
    <CardContent className="pt-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="outline" size="sm" asChild className="self-start">
          <Link to="/ressources?tab=outils">
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Retour aux outils
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        {facts.map((fact) => (
          <li key={fact} className="flex items-start gap-2">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default ToolHeader;
