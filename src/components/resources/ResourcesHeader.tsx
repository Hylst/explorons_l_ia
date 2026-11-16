// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, BookCheck } from 'lucide-react';
import { LINKS_CHECKED_ON } from '@/config/site';

// « 2026-10-09 » -> « 9 octobre 2026 » (« 1er » pour le premier du mois).
const linksCheckedLabel = new Date(`${LINKS_CHECKED_ON}T12:00:00Z`)
  .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  .replace(/^1 /, '1er ');

interface ResourcesHeaderProps {
  onScrollToResources: () => void;
  onOpenQuiz: () => void;
}

export const ResourcesHeader: React.FC<ResourcesHeaderProps> = ({ 
  onScrollToResources, 
  onOpenQuiz 
}) => {
  return (
    <>
      <Alert className="mb-8 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
        <Info className="h-5 w-5 text-amber-700 dark:text-amber-400" />
        <AlertTitle>Liens vérifiés le {linksCheckedLabel}</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Les ressources externes évoluent ou disparaissent sans prévenir : un lien peut ne plus répondre, ou une fiche peut
          contenir une erreur. Le drapeau en bas de chaque fiche externe prépare un e-mail pour le signaler à l'auteur.
        </AlertDescription>
      </Alert>

      <SectionHeading
        pretitle="Bibliothèque"
        title="Ressources pédagogiques"
        description={"Une sélection de ressources, en français pour la plupart (certaines sont payantes ou en anglais)\u00A0: articles, vidéos, cours, livres, publications scientifiques, outils IA, applications de l'auteur et un guide pour passer à l'action."}
        center
      />
      
      <Card className="mb-8 border border-dashed">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">Contenu en français et accessible</h3>
              <p className="text-muted-foreground text-sm mb-2">
                La sélection mêle ressources gratuites et offres payantes ; chaque fiche d'outil indique son tarif
                et la date de contrôle de son lien. La recherche ignore les accents. Les filtres par sujet et par
                année s'appliquent aux cours, vidéos, livres et articles\u00A0; l'année s'applique aussi aux
                publications. L'onglet Outils a ses propres filtres de catégorie et de tarif.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={onScrollToResources}
                className="whitespace-nowrap"
              >
                Voir les ressources
              </Button>
              <Button 
                onClick={onOpenQuiz}
                className="whitespace-nowrap gap-2"
              >
                <BookCheck className="h-4 w-4" />
                Quiz IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ResourcesHeader;
