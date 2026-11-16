// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useMemo, useState } from 'react';
import ScrollHint from '@/components/common/ScrollHint';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Minimize2, Eye, EyeOff } from 'lucide-react';
import { pca } from './pca';

// Données d'exemple : cinq maisons fictives décrites par six variables
const VARIABLES = ['Surface', 'Prix', 'Chambres', 'Jardin', 'Garage', 'Âge'] as const;
const originalData = [
  { name: 'Maison A', surface: 120, prix: 300000, chambres: 3, jardin: 1, garage: 1, age: 5 },
  { name: 'Maison B', surface: 80, prix: 200000, chambres: 2, jardin: 0, garage: 0, age: 15 },
  { name: 'Maison C', surface: 200, prix: 500000, chambres: 5, jardin: 1, garage: 2, age: 2 },
  { name: 'Maison D', surface: 95, prix: 250000, chambres: 2, jardin: 1, garage: 1, age: 10 },
  { name: 'Maison E', surface: 150, prix: 380000, chambres: 4, jardin: 1, garage: 1, age: 8 },
];

// Avec 5 observations, la matrice de corrélation est de rang 4 au plus : au-delà de 4 composantes, la variance est nulle.
const MAX_COMPONENTS = 4;

const DimensionalityReductionDemo: React.FC = () => {
  const [dimensions, setDimensions] = useState([2]);
  const [showOriginal, setShowOriginal] = useState(true);

  const result = useMemo(
    () => pca(originalData.map((h) => [h.surface, h.prix, h.chambres, h.jardin, h.garage, h.age])),
    [],
  );

  const k = dimensions[0];
  const kept = result.explainedRatio.slice(0, k).reduce((sum, x) => sum + x, 0) * 100;
  const column = (index: number) => result.scores.map((row) => row[index]);
  const oneD = column(0);
  const min = Math.min(...oneD);
  const max = Math.max(...oneD);

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl leading-snug sm:text-2xl">
          <Minimize2 className="h-5 w-5" />
          Réduction de dimensionnalité : une ACP calculée sur cinq maisons
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Les cinq maisons sont fictives, mais l'analyse en composantes principales est réellement calculée dans votre
            navigateur : variables centrées et réduites, matrice de corrélation, puis valeurs propres (méthode de Jacobi).
            Avec seulement cinq observations, les résultats illustrent la méthode et n'ont aucune portée statistique.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor="pca-dimensions" className="text-sm font-medium">Nombre de composantes conservées :</label>
            <div className="w-32">
              <Slider
                id="pca-dimensions"
                aria-label="Nombre de composantes conservées"
                value={dimensions}
                onValueChange={setDimensions}
                max={MAX_COMPONENTS}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            <span className="text-sm text-muted-foreground">{k}D</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
            >
              {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showOriginal ? "Masquer l'original" : "Voir l'original"}
            </Button>
          </div>

          <div className="bg-muted/50 p-3 sm:p-4 rounded-lg">
            <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
              <span>Dimensions : 6D → {k}D</span>
              <Badge variant={kept >= 80 ? 'default' : kept >= 60 ? 'secondary' : 'destructive'}>
                {kept.toFixed(1).replace(".", ",")} % de la variance conservée
              </Badge>
            </div>
            <div tabIndex={0} role="region" aria-label="Variance par composante" className="relative mt-3 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-1">Composante</th>
                    {result.explainedRatio.slice(0, MAX_COMPONENTS).map((_, i) => (
                      <th key={i} className="text-left p-1">PC{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-1">Variance expliquée</td>
                    {result.explainedRatio.slice(0, MAX_COMPONENTS).map((ratio, i) => (
                      <td key={i} className="p-1">{(ratio * 100).toFixed(1).replace(".", ",")} %</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-1">Cumul</td>
                    {result.explainedRatio.slice(0, MAX_COMPONENTS).map((_, i) => (
                      <td key={i} className="p-1">
                        {(result.explainedRatio.slice(0, i + 1).reduce((sum, x) => sum + x, 0) * 100).toFixed(1).replace(".", ",")} %
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <ScrollHint />
          </div>

          {showOriginal && (
            <div className="border-2 border-dashed border-muted-foreground/30 p-3 sm:p-4 rounded-lg bg-card/50">
              <h4 className="font-semibold mb-3">Données originales (6 dimensions)</h4>
              <div tabIndex={0} role="region" aria-label="Données originales" className="relative overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">Maison</th>
                      <th className="text-left p-2">Surface</th>
                      <th className="text-left p-2">Prix (k€)</th>
                      <th className="text-left p-2">Chambres</th>
                      <th className="text-left p-2">Jardin</th>
                      <th className="text-left p-2">Garage</th>
                      <th className="text-left p-2">Âge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {originalData.map((house, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="p-2 font-medium">{house.name}</td>
                        <td className="p-2">{house.surface} m²</td>
                        <td className="p-2">{house.prix / 1000} k€</td>
                        <td className="p-2">{house.chambres}</td>
                        <td className="p-2">{house.jardin ? 'Oui' : 'Non'}</td>
                        <td className="p-2">{house.garage}</td>
                        <td className="p-2">{house.age} ans</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ScrollHint />
            </div>
          )}

          <div className="bg-linear-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Coordonnées après projection ({k} composante{k > 1 ? 's' : ''})</h4>

            {k === 1 ? (
              <div className="space-y-2">
                {originalData.map((house, index) => (
                  <div key={house.name} className="flex items-center gap-4">
                    <span className="font-medium w-20">{house.name}</span>
                    <div className="flex-1 bg-background dark:bg-card rounded-full h-6 relative">
                      <div
                        className="bg-linear-to-r from-blue-400 to-purple-500 h-full rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${10 + (90 * (oneD[index] - min)) / (max - min || 1)}%` }}
                      >
                        <span className="text-white text-xs font-medium">{oneD[index].toFixed(2).replace(".", ",")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div tabIndex={0} role="region" aria-label="Données projetées" className="relative overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2">Maison</th>
                        {Array.from({ length: k }, (_, i) => (
                          <th key={i} className="text-left p-2">PC{i + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {originalData.map((house, index) => (
                        <tr key={house.name} className="border-b border-border">
                          <td className="p-2 font-medium">{house.name}</td>
                          {result.scores[index].slice(0, k).map((value, i) => (
                            <td key={i} className="p-2">{value.toFixed(2).replace(".", ",")}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ScrollHint />
              </>
            )}

            <h4 className="font-semibold mt-5 mb-2 text-sm">Poids des variables dans chaque composante</h4>
            <div tabIndex={0} role="region" aria-label="Poids des variables" className="relative overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-1">Variable</th>
                    {Array.from({ length: k }, (_, i) => (
                      <th key={i} className="text-left p-1">PC{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VARIABLES.map((variable, j) => (
                    <tr key={variable} className="border-b border-border">
                      <td className="p-1">{variable}</td>
                      {result.components.slice(0, k).map((comp, i) => (
                        <td key={i} className="p-1">{comp[j].toFixed(2).replace(".", ",")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ScrollHint />
            <p className="text-xs text-muted-foreground mt-2">
              Chaque composante est une combinaison linéaire des six variables standardisées. Ici, la première oppose
              l'âge à toutes les autres variables : les maisons grandes, chères et récentes ont un score élevé. Le signe
              d'une composante est arbitraire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded border border-blue-200 dark:border-blue-800">
              <h5 className="font-semibold mb-1 text-blue-700 dark:text-blue-300">Avantages</h5>
              <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
                <li>Visualisation simplifiée</li>
                <li>Atténuation du bruit possible</li>
                <li>Calculs plus légers par la suite</li>
              </ul>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded border border-orange-200 dark:border-orange-800">
              <h5 className="font-semibold mb-1 text-orange-700 dark:text-orange-300">Inconvénients</h5>
              <ul className="list-disc list-inside space-y-1 text-orange-700 dark:text-orange-400">
                <li>Perte d'information</li>
                <li>Interprétation moins directe</li>
                <li>Choix du nombre de composantes</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded border border-green-200 dark:border-green-800">
              <h5 className="font-semibold mb-1 text-green-700 dark:text-green-300">Applications</h5>
              <ul className="list-disc list-inside space-y-1 text-green-700 dark:text-green-400">
                <li>Compression d'images</li>
                <li>Analyse génomique</li>
                <li>Pré-traitement avant un modèle</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionalityReductionDemo;
