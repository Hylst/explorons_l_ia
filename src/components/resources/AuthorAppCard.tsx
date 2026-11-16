// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, UserRound } from 'lucide-react';
import type { AuthorApp } from './resourcesData';

interface AuthorAppCardProps {
  app: AuthorApp;
}

export const AuthorAppCard: React.FC<AuthorAppCardProps> = ({ app }) => (
  <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
    <CardContent className="flex h-full flex-col p-6">
      <div className="mb-3 flex flex-wrap items-start gap-2">
        <Badge>{app.category}</Badge>
        {app.status === 'en-construction' && <Badge variant="outline">En construction</Badge>}
      </div>
      <h3 className="mb-2 text-lg font-medium">{app.name}</h3>
      <p className="mb-4 grow text-sm text-muted-foreground">{app.description}</p>
      <div className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
        Site de l'auteur
      </div>
      <Button variant="outline" size="sm" className="mt-auto w-full gap-2" asChild>
        <a href={app.link} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Visiter le site
        </a>
      </Button>
    </CardContent>
  </Card>
);

export default AuthorAppCard;
