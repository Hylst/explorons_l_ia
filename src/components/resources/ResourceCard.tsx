// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Video, Globe, FileText, Newspaper, Wrench, Flag } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mailtoAuthor } from '@/config/site';
import { asset } from '@/lib/paths';

interface ResourceCardProps {
  title: string;
  source?: string;
  description: string;
  link: string;
  type: string;
  year?: number;
  tags?: string[];
  isInternal?: boolean;
  cover?: string;
  ctaLabel?: string;
}

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'cours':
      return <BookOpen className="h-4 w-4 text-primary" />;
    case 'vidéo':
      return <Video className="h-4 w-4 text-primary" />;
    case 'site web':
      return <Globe className="h-4 w-4 text-primary" />;
    case 'article':
      return <Newspaper className="h-4 w-4 text-primary" />;
    case 'outil':
      return <Wrench className="h-4 w-4 text-primary" />;
    default:
      return <FileText className="h-4 w-4 text-primary" />;
  }
};

// Pas de miniature YouTube ni de vérification de lien : aucune requête vers
// un service tiers n'est faite au chargement de la page.
const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  source,
  description,
  link,
  type,
  year,
  tags,
  isInternal = false,
  cover,
  ctaLabel,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInternal) {
      navigate(link);
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const reportHref = mailtoAuthor(
    `Explorons l'IA - ressource à vérifier : ${title}`,
    `Bonjour,\n\nLa ressource "${title}" (${link}) pose problème :\n\n`
  );

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardContent className="p-6 h-full flex flex-col">
        {cover && (
          <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg border-b bg-muted">
            <img src={asset(cover)} alt="" loading="lazy" decoding="async" width={1280} height={720} className="aspect-video w-full object-cover" />
          </div>
        )}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {getTypeIcon(type)}
            <Badge variant="secondary" className="text-xs">
              {type}
            </Badge>
            {isInternal && (
              <Badge variant="default" className="text-xs bg-primary/10 text-primary">
                Interne
              </Badge>
            )}
          </div>
          {year && <span className="text-xs text-muted-foreground">{year}</span>}
        </div>

        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {source && <p className="text-sm text-primary mb-2 font-medium">{source}</p>}

        <p className="text-sm text-muted-foreground mb-4 grow line-clamp-3">{description}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-auto">
          <Button
            onClick={handleClick}
            variant="outline"
            size="sm"
            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            {ctaLabel ?? (isInternal ? 'Suivre le cours' : 'Accéder')}
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>

          {!isInternal && (
            <Button asChild variant="ghost" size="sm" className="px-2">
              <a href={reportHref} title="Signaler un lien mort ou une erreur (e-mail)" aria-label={`Signaler un problème sur ${title}`}>
                <Flag className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
