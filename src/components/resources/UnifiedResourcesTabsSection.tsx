// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResourceCard from './ResourceCard';
import { ScientificPublicationCard } from './ScientificPublicationCard';
import { IAToolCard } from './IAToolCard';
import { AuthorAppCard } from './AuthorAppCard';
import { Resource, ScientificPublication, IAToolResource, AuthorApp } from './resourcesData';
import AgirResourcesSection from './AgirResourcesSection';
import { agirActions } from './data/agirData';
import { toolSlug } from './toolFilters';

interface UnifiedResourcesTabsSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredResources: Resource[];
  filteredScientificPublications: ScientificPublication[];
  visibleIATools: IAToolResource[];
  toolCategories: string[];
  toolPricings: string[];
  toolCategory: string;
  toolPricing: string;
  onToolCategoryChange: (value: string) => void;
  onToolPricingChange: (value: string) => void;
  onResetToolFilters: () => void;
  filteredAuthorApps: AuthorApp[];
  /** Slug de la fiche ciblée par ?outil=…, pour défiler et la mettre en évidence. */
  highlightedTool?: string;
}

const UnifiedResourcesTabsSection: React.FC<UnifiedResourcesTabsSectionProps> = ({
  activeTab,
  setActiveTab,
  filteredResources,
  filteredScientificPublications,
  visibleIATools,
  toolCategories,
  toolPricings,
  toolCategory,
  toolPricing,
  onToolCategoryChange,
  onToolPricingChange,
  onResetToolFilters,
  filteredAuthorApps,
  highlightedTool = ''
}) => {
  useEffect(() => {
    if (!highlightedTool) return;
    const timer = window.setTimeout(() => {
      document.getElementById(`outil-${highlightedTool}`)?.scrollIntoView({ block: 'center' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [highlightedTool, activeTab]);
  // Calculs pour les compteurs d'onglets
  const coursesCount = filteredResources.filter(r => r.type === 'cours').length;
  const videosCount = filteredResources.filter(r => r.type === 'vidéo').length;
  // L'onglet « Toutes » réunit toutes les listes, y compris les applications de l'auteur.
  const totalCount = filteredResources.length + filteredScientificPublications.length + visibleIATools.length + filteredAuthorApps.length;
  const toolFilterLabel = [toolCategory, toolPricing].filter(Boolean).join(' · ');

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="toutes" className="col-span-2 sm:col-span-1">Toutes ({totalCount})</TabsTrigger>
          <TabsTrigger value="cours">Cours ({coursesCount})</TabsTrigger>
          <TabsTrigger value="publications">Publications ({filteredScientificPublications.length})</TabsTrigger>
          <TabsTrigger value="outils">Outils IA ({visibleIATools.length})</TabsTrigger>
          <TabsTrigger value="videos">Vidéos ({videosCount})</TabsTrigger>
          <TabsTrigger value="ecosysteme">Écosystème ({filteredAuthorApps.length})</TabsTrigger>
          <TabsTrigger value="agir">Agir ({agirActions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="toutes" className="space-y-10">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Envie de passer à l'action{"\u00A0"}?</h3>
                <p className="text-sm text-muted-foreground">
                  Neuf pistes concrètes pour apprendre, transmettre, se protéger ou contribuer.
                </p>
              </div>
              <Button onClick={() => setActiveTab('agir')} className="shrink-0">
                Ouvrir le guide Agir
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
          {totalCount === 0 && (
            <p className="text-muted-foreground">Aucune ressource ne correspond à cette recherche.</p>
          )}
          {filteredResources.length > 0 && (
            <section aria-labelledby="toutes-ressources" className="space-y-4">
              <h3 id="toutes-ressources" className="text-xl font-semibold">
                Cours, vidéos, livres, articles et sites ({filteredResources.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <ResourceCard
                    key={`${resource.link}-${index}`}
                    title={resource.title}
                    source={resource.source}
                    description={resource.description}
                    link={resource.link}
                    type={resource.type}
                    year={resource.year}
                    tags={resource.tags}
                    isInternal={resource.isInternal}
                    cover={resource.cover}
                  />
                ))}
              </div>
            </section>
          )}
          {filteredScientificPublications.length > 0 && (
            <section aria-labelledby="toutes-publications" className="space-y-4">
              <h3 id="toutes-publications" className="text-xl font-semibold">
                Publications scientifiques ({filteredScientificPublications.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScientificPublications.map((publication, index) => (
                  <ScientificPublicationCard
                    key={`${publication.link}-${index}`}
                    publication={publication}
                  />
                ))}
              </div>
            </section>
          )}
          {visibleIATools.length > 0 && (
            <section aria-labelledby="toutes-outils" className="space-y-4">
              <h3 id="toutes-outils" className="text-xl font-semibold">
                Outils IA ({visibleIATools.length})
              </h3>
              {toolFilterLabel && (
                <p className="text-sm text-muted-foreground">
                  Filtre d'outils actif{"\u00A0"}: {toolFilterLabel}.{' '}
                  <button type="button" className="underline underline-offset-4 hover:text-foreground" onClick={onResetToolFilters}>
                    Tout afficher
                  </button>
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleIATools.map((tool, index) => (
                  <IAToolCard
                    key={`${tool.link}-${index}`}
                    tool={tool}
                    highlighted={toolSlug(tool.name) === highlightedTool}
                  />
                ))}
              </div>
            </section>
          )}
          {filteredAuthorApps.length > 0 && (
            <section aria-labelledby="toutes-ecosysteme" className="space-y-4">
              <h3 id="toutes-ecosysteme" className="text-xl font-semibold">
                Applications de l'auteur ({filteredAuthorApps.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuthorApps.map((app, index) => (
                  <AuthorAppCard
                    key={`${app.link}-${index}`}
                    app={app}
                  />
                ))}
              </div>
            </section>
          )}
        </TabsContent>

        <TabsContent value="cours" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources
              .filter(resource => resource.type === 'cours')
              .map((resource, index) => (
                <ResourceCard
                  key={`${resource.link}-${index}`}
                  title={resource.title}
                  source={resource.source}
                  description={resource.description}
                  link={resource.link}
                  type={resource.type}
                  year={resource.year}
                  tags={resource.tags}
                  isInternal={resource.isInternal}
                  cover={resource.cover}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="publications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScientificPublications.map((publication, index) => (
              <ScientificPublicationCard
                key={`${publication.link}-${index}`}
                publication={publication}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="outils" className="space-y-6">
          <p className="text-xs text-muted-foreground">
            Les tarifs sont indicatifs et peuvent changer. « Lien vérifié » date le contrôle du lien ;
            « Tarif vérifié » celui de la grille tarifaire du fournisseur, quand elle a été lue.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">Catégorie</span>
              <select
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                value={toolCategory}
                onChange={(event) => onToolCategoryChange(event.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {toolCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">Tarif</span>
              <select
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                value={toolPricing}
                onChange={(event) => onToolPricingChange(event.target.value)}
              >
                <option value="">Tous les tarifs</option>
                {toolPricings.map((pricing) => <option key={pricing} value={pricing}>{pricing}</option>)}
              </select>
            </label>
            <Button
              variant="outline"
              size="sm"
              disabled={!toolCategory && !toolPricing}
              onClick={onResetToolFilters}
            >
              Réinitialiser
            </Button>
            <p className="text-sm text-muted-foreground sm:ml-auto" aria-live="polite">
              {visibleIATools.length} outil(s)
            </p>
          </div>
          {visibleIATools.length === 0 ? (
            <p className="text-muted-foreground">Aucun outil ne correspond à ces filtres.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleIATools.map((tool, index) => (
                <IAToolCard
                  key={`${tool.link}-${index}`}
                  tool={tool}
                  highlighted={toolSlug(tool.name) === highlightedTool}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources
              .filter(resource => resource.type === 'vidéo')
              .map((resource, index) => (
                <ResourceCard
                  key={`${resource.link}-${index}`}
                  title={resource.title}
                  source={resource.source}
                  description={resource.description}
                  link={resource.link}
                  type={resource.type}
                  year={resource.year}
                  tags={resource.tags}
                  isInternal={resource.isInternal}
                  cover={resource.cover}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ecosysteme" className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-semibold">Applications de l'auteur</h3>
              <p className="text-sm text-muted-foreground">
                Sites et applications gratuits de Geoffroy Streit (Hylst), choisis pour prolonger les cours.
                Les liens sont vérifiés en même temps que le reste de la bibliothèque.
              </p>
            </CardContent>
          </Card>
          {filteredAuthorApps.length === 0 && (
            <p className="text-muted-foreground">Aucune application ne correspond à cette recherche.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthorApps.map((app, index) => (
              <AuthorAppCard
                key={`${app.link}-${index}`}
                app={app}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agir" className="space-y-6">
          <AgirResourcesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedResourcesTabsSection;
