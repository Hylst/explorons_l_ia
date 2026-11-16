// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Wrench, Flag, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { mailtoAuthor } from '@/config/site';
import { STALE_AFTER_DAYS, formatIsoDay, isStale } from '@/lib/freshness';
import { IAToolResource } from './resourcesData';
import { toolSlug } from './toolFilters';

interface IAToolCardProps {
  tool: IAToolResource;
  /** Fiche ciblée par ?outil=… : anneau de repérage après le défilement. */
  highlighted?: boolean;
}

export const IAToolCard: React.FC<IAToolCardProps> = ({ tool, highlighted = false }) => {
  const isInternalTool = tool.link.startsWith('/');
  const isPlanned = tool.link === '';
  const slug = toolSlug(tool.name);
  const anchorId = `outil-${slug}`;
  const permalink = typeof window === 'undefined'
    ? ''
    : `${window.location.origin}${window.location.pathname}?tab=outils&outil=${slug}#${anchorId}`;
  const reportHref = mailtoAuthor(`Explorons l'IA - outil à vérifier : ${tool.name}`, `Bonjour,

La fiche de l'outil "${tool.name}" (${tool.link}) pose problème :

${permalink}

`);

  const factLabels = [
    tool.interfaceLanguage === 'fr'
      ? 'Interface en français'
      : tool.interfaceLanguage === 'multi'
        ? 'Français disponible'
        : tool.interfaceLanguage === 'en'
          ? 'Interface en anglais'
          : null,
    tool.accountRequired === true ? 'Compte requis' : tool.accountRequired === false ? 'Sans compte' : null,
    tool.apiAvailable === true ? 'API' : tool.apiAvailable === false ? "Pas d'API publique" : null,
  ].filter((label): label is string => Boolean(label));

  const copyLink = async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(permalink);
      copied = true;
    } catch {
      // Repli pour les navigateurs qui refusent l'API Clipboard (contexte non sécurisé, permission).
      const area = document.createElement('textarea');
      area.value = permalink;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      document.body.appendChild(area);
      area.select();
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
      area.remove();
    }
    if (copied) toast.success('Lien de la fiche copié.');
    else toast.error("Le lien n'a pas pu être copié.");
  };

  return (
    <Card
      id={anchorId}
      className={`overflow-hidden hover:shadow-md transition-shadow h-full scroll-mt-24${highlighted ? ' ring-2 ring-primary ring-offset-2' : ''}`}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <Badge>{tool.category}</Badge>
          {isPlanned && <Badge variant="outline">À venir</Badge>}
        </div>
        <h3 className="text-lg font-medium mb-2">{tool.name}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">{tool.pricing}</Badge>
          {isInternalTool && (
            <Badge variant="outline" className="text-xs">Outil du site · sans compte</Badge>
          )}
          {tool.features.map((feature) => (
            <Badge key={feature} variant="outline" className="text-xs">{feature}</Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-4 grow">{tool.description}</p>
        {tool.lastChecked && !isInternalTool && (
          <p className="text-xs text-muted-foreground mb-1">
            Lien vérifié le {formatIsoDay(tool.lastChecked)}
            {isStale(tool.lastChecked) && (
              <span className="text-amber-700 dark:text-amber-400">
                {' '}· contrôle de plus de {STALE_AFTER_DAYS} jours, à revérifier
              </span>
            )}
          </p>
        )}
        {tool.pricingReviewed && !tool.pricingChecked && !isInternalTool && (
          <p className="text-xs text-muted-foreground mb-1">
            Tarif : {tool.pricingNote}{' '}
            <span className="text-muted-foreground">· revu le {formatIsoDay(tool.pricingReviewed)}</span>
          </p>
        )}
        {tool.factsChecked && factLabels.length > 0 && (
          <p className="text-xs text-muted-foreground mb-1">
            {factLabels.join(' · ')}{' '}
            <span className="text-muted-foreground">· relevé le {formatIsoDay(tool.factsChecked)}</span>
          </p>
        )}
        {tool.pricingChecked && !isInternalTool && (
          <p className="text-xs text-muted-foreground mb-1">
            Tarif vérifié le {formatIsoDay(tool.pricingChecked)}
            {isStale(tool.pricingChecked) && (
              <span className="text-amber-700 dark:text-amber-400">
                {' '}· relevé de plus de {STALE_AFTER_DAYS} jours, à revérifier
              </span>
            )}
            {tool.pricingUrl && (
              <span>
                {' · '}
                <a
                  href={tool.pricingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  Voir les tarifs<span className="sr-only"> de {tool.name} (nouvel onglet)</span>
                </a>
              </span>
            )}
          </p>
        )}
        {isPlanned ? (
          <Button variant="outline" size="sm" className="w-full mt-auto" disabled>
            Pas encore disponible
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="w-full gap-2 mt-auto" asChild>
            {isInternalTool ? (
              // Link (et non <a href>) : respecte le sous-chemin /explorons_l_ia/
              <Link to={tool.link}>
                <Wrench className="h-4 w-4" />
                Utiliser l'outil<span className="sr-only"> {tool.name}</span>
              </Link>
            ) : (
              <a href={tool.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Visiter<span className="sr-only"> {tool.name} (nouvel onglet)</span>
              </a>
            )}
          </Button>
        )}
        {!isPlanned && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Link2 className="h-3 w-3" aria-hidden="true" />
              Copier le lien<span className="sr-only"> de la fiche {tool.name}</span>
            </button>
            <a href={reportHref} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <Flag className="h-3 w-3" aria-hidden="true" />
              Signaler un problème<span className="sr-only"> : fiche {tool.name}</span>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IAToolCard;
