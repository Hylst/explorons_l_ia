// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, ExternalLink, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router';
import PricingNotice from '@/components/common/PricingNotice';

const CostCalculatorHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToResources = () => {
    navigate('/ressources?tab=outils');
  };

  return (
    <Card className="bg-linear-to-r from-primary/5 to-primary/10 border-primary/20 mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToResources}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux outils
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Calculateur de coûts d'API IA</h1>
                <p className="text-muted-foreground">
                  Estimer ce que coûterait un usage, requête par requête, puis par mois
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-2">
              <User className="h-3 w-3" />
              Créé par Geoffroy Streit
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToResources}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Plus d'outils IA
            </Button>
          </div>
        </div>
        
        <PricingNotice
          className="mt-6 bg-background/70"
          extra="Le calcul repose sur le nombre de tokens : seuls les modèles facturés au token sont proposés (pas les modèles d'images, d'audio ou de vidéo, dont l'unité de prix est différente). Tout se calcule dans votre navigateur ; seules les estimations que vous enregistrez dans l'onglet « Enregistrés » sont gardées, sur cet appareil."
        />
      </CardContent>
    </Card>
  );
};

export default CostCalculatorHeader;
