// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DetectionResult } from '@/services/aiDetectionService';
import { getScoreLevel } from '@/services/detection/scoreScale';
import {
  TrendingUp,
  Clock,
  Database,
  Zap,
  ListChecks,
  Info
} from 'lucide-react';

interface DetailedAnalysisViewProps {
  result: DetectionResult;
}

const formatPercent = (value: number): string => `${Math.round(value * 100)}\u00A0%`;

export const DetailedAnalysisView: React.FC<DetailedAnalysisViewProps> = ({ result }) => {
  const confidencePercentage = Math.round(result.confidence * 100);
  // Même échelle que l'aide, la carte de résultat et l'historique (scoreScale.ts).
  const scoreLevel = getScoreLevel(result.confidence);
  const rawIndicators = result.rawIndicators ?? [];

  return (
    <div className="space-y-6">
      {/* Résumé principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Analyse détaillée
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Indice de contenu généré (de 0 à 100)</span>
            <span className={`font-bold text-lg ${scoreLevel.textClass}`}>
              {confidencePercentage} / 100
            </span>
          </div>
          <Progress value={confidencePercentage} className="h-3" aria-label="Indice de contenu généré" />
          <p className="text-sm text-muted-foreground">{scoreLevel.label} ({scoreLevel.range})</p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Traité en {result.analysis.processingTime} ms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {(result.metadata?.fileSize || 0) > 1024
                  ? `${Math.round((result.metadata?.fileSize || 0) / 1024)}\u00A0Ko`
                  : `${result.metadata?.fileSize || 0}\u00A0octets`
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Synthèse des méthodes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Indicateurs détectés ({result.analysis.indicators.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {result.analysis.indicators.map((indicator, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <Info className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium">{indicator}</p>
            </div>
          ))}

          {result.analysis.indicators.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Info className="h-8 w-8 mx-auto mb-2 text-primary" aria-hidden="true" />
              <p>Aucun indice relevé par les heuristiques</p>
              <p className="text-sm">
                Cela ne prouve pas que le contenu est d'origine humaine : un texte généré puis retouché passe souvent
                inaperçu.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Indicateurs bruts des moteurs : liste distincte, avec leur type, leur poids et leur confiance */}
      {rawIndicators.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              Indicateurs bruts ({rawIndicators.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Chaque ligne est une mesure qui a franchi son seuil. Le poids dit l'importance qu'elle a dans le calcul, la
              confiance dit à quel point le seuil est dépassé. Ce ne sont ni des probabilités ni des preuves.
            </p>
            {rawIndicators.map((raw, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm font-medium">{raw.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Type : {raw.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Poids : {formatPercent(raw.weight)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Confiance : {formatPercent(raw.confidence)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Métadonnées techniques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Informations techniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Méthode d'analyse :</span>
              <p className="text-muted-foreground mt-1">{result.analysis.method}</p>
            </div>
            <div>
              <span className="font-medium">Préréglage utilisé :</span>
              <p className="text-muted-foreground mt-1">
                {result.analysis.preset || 'Analyse standard'}
              </p>
            </div>
            <div>
              <span className="font-medium">Type de fichier :</span>
              <p className="text-muted-foreground mt-1 capitalize">{result.fileType}</p>
            </div>
            <div>
              <span className="font-medium">Horodatage :</span>
              <p className="text-muted-foreground mt-1">
                {new Date(result.analysis.timestamp).toLocaleString('fr-FR')}
              </p>
            </div>
            {result.metadata?.dimensions && (
              <div>
                <span className="font-medium">Dimensions :</span>
                <p className="text-muted-foreground mt-1">
                  {result.metadata.dimensions.width} × {result.metadata.dimensions.height}
                </p>
              </div>
            )}
            {result.metadata?.duration && (
              <div>
                <span className="font-medium">Durée :</span>
                <p className="text-muted-foreground mt-1">
                  {Math.round(result.metadata.duration)} s
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
