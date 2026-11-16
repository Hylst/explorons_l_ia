// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Target, Clock, Zap, Database, BarChart3 } from 'lucide-react';
import SimulationNotice from '@/components/common/SimulationNotice';
import ScrollHint from '@/components/common/ScrollHint';

/** Niveaux qualitatifs de 1 à 5 : des tendances générales, pas des mesures. */
interface AlgorithmProfile {
  name: string;
  /** Capacité à modéliser des relations complexes (et non « précision » : celle-ci dépend des données). */
  capacity: number;
  speed: number;
  interpretability: number;
  dataRequirement: number;
  complexity: number;
  color: string;
  description: string;
  bestFor: string[];
  limitations: string[];
}

type NumericKey = 'capacity' | 'speed' | 'interpretability' | 'dataRequirement' | 'complexity';

const algorithms: AlgorithmProfile[] = [
  {
    name: 'Régression Linéaire',
    capacity: 1,
    speed: 5,
    interpretability: 5,
    dataRequirement: 1,
    complexity: 1,
    color: '#3B82F6',
    description: 'Simple et rapide, adaptée aux relations linéaires',
    bestFor: ['Relations linéaires', 'Référence de départ rapide', 'Interprétabilité'],
    limitations: ['Seulement linéaire', 'Sensible aux valeurs aberrantes']
  },
  {
    name: 'Arbre de Décision',
    capacity: 3,
    speed: 4,
    interpretability: 4,
    dataRequirement: 2,
    complexity: 2,
    color: '#10B981',
    description: 'Très interprétable, gère bien les interactions entre variables',
    bestFor: ['Règles métier', 'Variables catégorielles', 'Explication des décisions'],
    limitations: ['Instable (petites variations des données)', 'Surapprentissage facile']
  },
  {
    name: 'Random Forest',
    capacity: 4,
    speed: 3,
    interpretability: 2,
    dataRequirement: 3,
    complexity: 3,
    color: '#F59E0B',
    description: 'Robuste, peu de réglages délicats',
    bestFor: ['Données tabulaires', 'Robustesse', 'Bon résultat sans beaucoup de réglages'],
    limitations: ['Moins interprétable', 'Mémoire importante']
  },
  {
    name: 'SVM',
    capacity: 4,
    speed: 2,
    interpretability: 2,
    dataRequirement: 3,
    complexity: 4,
    color: '#8B5CF6',
    description: 'Efficace en haute dimension avec un noyau bien choisi',
    bestFor: ['Haute dimension', 'Jeux de données de taille moyenne', 'Classification'],
    limitations: ['Lent sur de gros volumes', 'Difficile à interpréter', 'Paramètres sensibles']
  },
  {
    name: 'Réseau de Neurones',
    capacity: 5,
    speed: 1,
    interpretability: 1,
    dataRequirement: 5,
    complexity: 5,
    color: '#EF4444',
    description: 'Très flexible, mais exigeant en données et en calcul',
    bestFor: ['Images, texte, audio', 'Très gros volumes de données', 'Relations très complexes'],
    limitations: ['Boîte noire', 'Beaucoup de données', 'Entraînement coûteux']
  }
];

// Allure schématique : avec davantage de données, l'écart entre entraînement et validation se resserre.
const learningCurveData = [
  { dataSize: 100, validation: 60, training: 96 },
  { dataSize: 500, validation: 72, training: 93 },
  { dataSize: 1000, validation: 80, training: 91 },
  { dataSize: 2000, validation: 85, training: 90 },
  { dataSize: 5000, validation: 87, training: 89 },
  { dataSize: 10000, validation: 88, training: 89 },
  { dataSize: 20000, validation: 89, training: 89 }
];

const METRIC_LABELS: Record<NumericKey, string> = {
  capacity: 'Capacité de modélisation',
  speed: 'Vitesse',
  interpretability: 'Interprétabilité',
  dataRequirement: 'Besoin en données',
  complexity: 'Complexité'
};

const METRIC_ICONS: Record<NumericKey, React.ReactNode> = {
  capacity: <Target className="h-4 w-4" aria-hidden="true" />,
  speed: <Zap className="h-4 w-4" aria-hidden="true" />,
  interpretability: <TrendingUp className="h-4 w-4" aria-hidden="true" />,
  dataRequirement: <Database className="h-4 w-4" aria-hidden="true" />,
  complexity: <Clock className="h-4 w-4" aria-hidden="true" />
};

const levelWord = (level: number) => (level >= 4 ? 'Élevé' : level >= 3 ? 'Moyen' : 'Faible');

const PerformanceVisualizer: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'capacity' | 'speed' | 'interpretability'>('capacity');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<number>(0);
  const [showComparison, setShowComparison] = useState<boolean>(true);

  const currentAlgorithm = algorithms[selectedAlgorithm];

  const chartData = algorithms.map(algo => ({
    name: algo.name.split(' ')[0], // Nom court pour le graphique
    [selectedMetric]: algo[selectedMetric],
    fullName: algo.name,
    color: algo.color
  }));

  return (
    <Card className="border-primary/20">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl leading-snug sm:text-2xl">
          <BarChart3 className="h-6 w-6 text-primary" aria-hidden="true" />
          Comparaison qualitative des algorithmes
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Des tendances générales pour situer les forces et les faiblesses de chaque famille d'algorithmes
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
        <SimulationNotice>
          Les niveaux (de 1 à 5) résument des tendances générales : ce ne sont pas des résultats mesurés. Sur un
          problème réel, le classement dépend des données : sur des données tabulaires, une forêt aléatoire ou un
          boosting de gradient égale ou dépasse souvent un réseau de neurones, et une régression linéaire gagne quand la
          relation est linéaire. Il faut comparer les modèles sur ses propres données.
        </SimulationNotice>

        {/* Sélecteurs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium self-center">Critère :</span>
            {(['capacity', 'speed', 'interpretability'] as const).map((metric) => (
              <Button
                key={metric}
                variant={selectedMetric === metric ? "default" : "outline"}
                size="sm"
                aria-pressed={selectedMetric === metric}
                onClick={() => setSelectedMetric(metric)}
                className="flex items-center gap-2"
              >
                {METRIC_ICONS[metric]}
                {METRIC_LABELS[metric]}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowComparison(!showComparison)}
              size="sm"
              variant="outline"
            >
              {showComparison ? 'Vue détaillée' : 'Vue comparative'}
            </Button>
          </div>
        </div>

        {showComparison ? (
          /* Vue comparative */
          <div className="space-y-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip
                    formatter={(value: number, _name: string, props) => [
                      `${value} sur 5`,
                      `${METRIC_LABELS[selectedMetric]} (${props.payload.fullName})`
                    ]}
                  />
                  <Bar
                    dataKey={selectedMetric}
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tableau comparatif */}
            <div>
              <div tabIndex={0} role="region" aria-label="Tableau comparatif des algorithmes" className="relative overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Algorithme</th>
                      <th className="text-center p-2">Capacité</th>
                      <th className="text-center p-2">Vitesse</th>
                      <th className="text-center p-2">Interprétabilité</th>
                      <th className="text-center p-2">Données</th>
                      <th className="text-center p-2">Complexité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {algorithms.map((algo, index) => (
                      <tr
                        key={algo.name}
                        className={`border-b hover:bg-muted/50 cursor-pointer ${
                          selectedAlgorithm === index ? 'bg-primary/10' : ''
                        }`}
                        onClick={() => setSelectedAlgorithm(index)}
                      >
                        <td className="p-2 font-medium">{algo.name}</td>
                        {(['capacity', 'speed', 'interpretability'] as const).map((metric) => (
                          <td key={metric} className="text-center p-2">
                            <div className="flex items-center justify-center gap-2">
                              <Progress value={algo[metric] * 20} className="w-16 h-2" aria-label={`${METRIC_LABELS[metric]}\u00A0: ${algo[metric]} sur 5`} />
                              <span className="text-xs">{algo[metric]}/5</span>
                            </div>
                          </td>
                        ))}
                        <td className="text-center p-2">
                          <Badge variant={algo.dataRequirement >= 4 ? "destructive" : algo.dataRequirement >= 3 ? "secondary" : "default"}>
                            {algo.dataRequirement >= 4 ? 'Beaucoup' : algo.dataRequirement >= 3 ? 'Modéré' : 'Peu'}
                          </Badge>
                        </td>
                        <td className="text-center p-2">
                          <Badge variant={algo.complexity >= 4 ? "destructive" : algo.complexity >= 3 ? "secondary" : "default"}>
                            {algo.complexity >= 4 ? 'Élevée' : algo.complexity >= 3 ? 'Moyenne' : 'Faible'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ScrollHint>Faites défiler horizontalement pour voir toutes les colonnes du tableau.</ScrollHint>
            </div>
          </div>
        ) : (
          /* Vue détaillée d'un algorithme */
          <div className="space-y-6">
            {/* Sélecteur d'algorithme */}
            <div className="flex flex-wrap gap-2">
              {algorithms.map((algo, index) => (
                <Button
                  key={algo.name}
                  variant={selectedAlgorithm === index ? "default" : "outline"}
                  size="sm"
                  aria-pressed={selectedAlgorithm === index}
                  onClick={() => setSelectedAlgorithm(index)}
                  style={selectedAlgorithm === index ? { borderColor: algo.color, borderWidth: 3 } : {}}
                >
                  {algo.name}
                </Button>
              ))}
            </div>

            {/* Détails de l'algorithme sélectionné */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                    {currentAlgorithm.name}
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300">
                    {currentAlgorithm.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Caractéristiques :</h4>
                    {(Object.keys(METRIC_LABELS) as NumericKey[]).map((key) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium flex items-center gap-2">
                            {METRIC_ICONS[key]}
                            {METRIC_LABELS[key]}
                          </span>
                          <span className="text-sm">{levelWord(currentAlgorithm[key])} ({currentAlgorithm[key]}/5)</span>
                        </div>
                        <Progress
                          value={currentAlgorithm[key] * 20}
                          className="h-2"
                          aria-label={`${METRIC_LABELS[key]}\u00A0: ${currentAlgorithm[key]} sur 5`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Idéal pour :</h4>
                      <ul className="text-sm space-y-1">
                        {currentAlgorithm.bestFor.map((item) => (
                          <li key={item} className="text-green-700 dark:text-green-400">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Limites :</h4>
                      <ul className="text-sm space-y-1">
                        {currentAlgorithm.limitations.map((item) => (
                          <li key={item} className="text-red-700 dark:text-red-400">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courbe d'apprentissage */}
        <div className="space-y-4">
          <h4 className="font-semibold">Effet de la quantité de données (courbe schématique)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningCurveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dataSize" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value}\u00A0% (valeur illustrative)`,
                    name === 'validation' ? 'Exactitude en validation' : 'Exactitude en entraînement'
                  ]}
                  labelFormatter={(label) => `${label} exemples`}
                />
                <Area
                  type="monotone"
                  dataKey="training"
                  stackId="1"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.3}
                  name="training"
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="validation"
                  stackId="2"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  name="validation"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground">
            Allure typique, non mesurée : avec davantage de données, l'exactitude en validation progresse et l'écart avec
            l'exactitude en entraînement (signe de surapprentissage) se resserre. Les valeurs exactes dépendent du
            modèle et des données.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceVisualizer;
