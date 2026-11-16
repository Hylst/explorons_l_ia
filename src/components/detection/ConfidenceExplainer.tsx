// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SCORE_LEVELS, type ScoreLevel } from '@/services/detection/scoreScale';
import {
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react';

interface ConfidenceExplainerProps {
  open: boolean;
  onClose: () => void;
}

export const ConfidenceExplainer: React.FC<ConfidenceExplainerProps> = ({
  open,
  onClose
}) => {
  // Le score est un indice produit par des heuristiques, pas une probabilité : les libellés le disent.
  const scoreLevels = [
    {
      level: 'high' as ScoreLevel,
      color: 'text-orange-700 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      borderColor: 'border-orange-200 dark:border-orange-800',
      icon: AlertTriangle,
      description:
        'Plusieurs heuristiques se déclenchent. Cela ne prouve pas l’origine du contenu\u00A0: un texte humain formel ou standardisé peut déclencher les mêmes indices.',
      indicators: ['Structure très régulière', 'Vocabulaire et tournures courants dans les textes générés', 'Peu de variations de style']
    },
    {
      level: 'medium' as ScoreLevel,
      color: 'text-yellow-700 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      icon: Info,
      description: 'Résultat peu concluant\u00A0: certains indices sont présents, d’autres non.',
      indicators: ['Indices isolés', 'Signaux contradictoires', 'Texte trop court pour conclure']
    },
    {
      level: 'low' as ScoreLevel,
      color: 'text-green-700 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: CheckCircle,
      description: 'Peu d’heuristiques se déclenchent. Cela ne garantit pas que le contenu soit humain\u00A0: un texte généré puis retravaillé passe souvent inaperçu.',
      indicators: ['Style varié', 'Peu de motifs répétitifs', 'Un texte retouché échappe facilement à ces règles']
    }
  ];

  const detectionMethods = [
    {
      type: 'Analyse statistique',
      icon: TrendingUp,
      description: 'Longueur des phrases, diversité du vocabulaire, régularité du rythme.'
    },
    {
      type: 'Recherche de motifs',
      icon: Target,
      description: 'Expressions et structures fréquentes dans les textes produits par des modèles de langage.'
    },
    {
      type: 'Métadonnées et signatures',
      icon: Shield,
      description: 'Informations techniques des fichiers (images, audio)\u00A0: elles sont faciles à effacer ou à falsifier.'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6" aria-hidden="true" />
            Comment lire le score
          </DialogTitle>
          <DialogDescription>
            Ce détecteur est une démonstration : il applique des règles simples, sans modèle entraîné à cet effet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Niveaux du score */}
          <Card>
            <CardHeader>
              <CardTitle>Échelle du score (un indice, pas une probabilité)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scoreLevels.map((level) => {
                const Icon = level.icon;
                const info = SCORE_LEVELS.find((entry) => entry.level === level.level);
                if (!info) return null;
                return (
                  <div key={info.range} className={`p-4 rounded-lg border ${level.bgColor} ${level.borderColor}`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${level.color}`} aria-hidden="true" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold">{info.range}</span>
                          <Badge variant="outline" className={level.color}>
                            {info.label}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">{level.description}</p>
                        <ul className="space-y-1">
                          {level.indicators.map((indicator) => (
                            <li key={indicator} className="flex items-center gap-2 text-xs">
                              <span className={`w-1 h-1 rounded-full bg-current ${level.color}`} aria-hidden="true" />
                              {indicator}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Méthodes utilisées */}
          <Card>
            <CardHeader>
              <CardTitle>Ce que le détecteur examine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {detectionMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.type} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 mt-0.5 text-primary" aria-hidden="true" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{method.type}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Limites connues */}
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle>Limites connues de la détection de contenu généré</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                Aucune méthode de détection n'est aujourd'hui assez fiable pour servir de preuve. Les détecteurs de texte
                produisent des faux positifs, en particulier sur les textes courts, formels ou rédigés par des personnes
                dont ce n'est pas la langue maternelle (étude de Liang et al., 2023). OpenAI a retiré en 2023 son propre
                détecteur faute de fiabilité suffisante.
              </p>
              <p>
                Les listes de mots et d’expressions sont écrites surtout pour l’anglais, avec quelques tournures françaises ajoutées. Les expressions de liaison qu’elles relèvent (« en conclusion », « il est important de noter »...) sont aussi très courantes dans des textes humains soignés. Un texte ordinaire ne déclenche en général aucun indicateur, ce qui ne dit rien de son origine.
              </p>
              <p>
                Un texte généré puis relu ou reformulé, ou une image retouchée, échappe facilement à ces règles. À
                l'inverse, un contenu humain peut être signalé à tort.
              </p>
            </CardContent>
          </Card>

          {/* Recommandations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommandations d'usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-1">Contexte académique</h4>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Le préréglage « Contrôle académique » est plus sensible (indice affiché multiplié par 1,2). Un score élevé peut justifier une discussion avec
                  l'auteur, jamais une sanction à lui seul.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-900 dark:text-green-200 mb-1">Vérification journalistique</h4>
                <p className="text-sm text-green-800 dark:text-green-300">
                  Le préréglage « Vérification journalistique » ne modifie pas l’indice affiché. Recoupez toujours avec la source, le contexte et
                  d'autres vérifications (recherche inversée d'image, métadonnées, témoignages).
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                <h4 className="font-medium text-orange-900 dark:text-orange-200 mb-1">Signalement large</h4>
                <p className="text-sm text-orange-800 dark:text-orange-300">
                  Le préréglage « Signalement large » multiplie l’indice affiché par 1,2 : plus de contenus atteignent un niveau élevé, donc plus de faux positifs. Aucun score n'a valeur
                  de preuve.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
