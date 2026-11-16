// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import SectionHeading from '../SectionHeading';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import SimulationNotice from '@/components/common/SimulationNotice';

// Allure schématique d'une courbe d'apprentissage (non mesurée).
const learningCurveData = [
  { epoch: 1, training: 45, validation: 40 },
  { epoch: 2, training: 55, validation: 48 },
  { epoch: 3, training: 62, validation: 53 },
  { epoch: 4, training: 68, validation: 57 },
  { epoch: 5, training: 72, validation: 60 },
  { epoch: 6, training: 75, validation: 62 },
  { epoch: 7, training: 78, validation: 64 },
  { epoch: 8, training: 80, validation: 65 },
  { epoch: 9, training: 82, validation: 66 },
  { epoch: 10, training: 83, validation: 67 },
  { epoch: 11, training: 84, validation: 68 },
  { epoch: 12, training: 85, validation: 68 },
  { epoch: 13, training: 86, validation: 69 },
  { epoch: 14, training: 87, validation: 69 },
  { epoch: 15, training: 88, validation: 70 }
];

// Niveaux qualitatifs de 1 à 5 : des tendances générales, pas des mesures.
const algorithmProfiles = [
  { name: 'Régression linéaire', capacity: 1, complexity: 1, interpretability: 5 },
  { name: 'Arbre de décision', capacity: 3, complexity: 2, interpretability: 4 },
  { name: 'Forêt aléatoire', capacity: 4, complexity: 3, interpretability: 2 },
  { name: 'SVM', capacity: 4, complexity: 4, interpretability: 2 },
  { name: 'Réseau de neurones', capacity: 5, complexity: 5, interpretability: 1 }
];

const learningFamilies = [
  {
    title: 'Supervisé',
    description: 'Apprend à partir d\'exemples étiquetés (la bonne réponse est fournie).',
    example: 'Classer des e-mails en spam ou non, estimer un prix.'
  },
  {
    title: 'Non supervisé',
    description: 'Cherche une structure dans des données sans étiquettes.',
    example: 'Regrouper des clients aux comportements proches.'
  },
  {
    title: 'Par renforcement',
    description: 'Apprend par essais et erreurs, guidé par une récompense.',
    example: 'Jeux, contrôle de robots.'
  },
  {
    title: 'Auto-supervisé',
    description: 'Fabrique lui-même ses étiquettes à partir des données.',
    example: 'Prédire le mot suivant\u00A0: base des grands modèles de langage.'
  }
];

// Taux d'erreur top-5 du vainqueur du concours ImageNet (ILSVRC, classification d'images).
// Sources : résultats publiés du concours ; 2012 : entrée utilisant uniquement les données du concours.
const imagenetWinners = [
  { year: '2010', error: 28.2, winner: 'NEC-UIUC' },
  { year: '2011', error: 25.8, winner: 'XRCE' },
  { year: '2012', error: 16.4, winner: 'AlexNet' },
  { year: '2013', error: 11.7, winner: 'Clarifai' },
  { year: '2014', error: 6.7, winner: 'GoogLeNet' },
  { year: '2015', error: 3.57, winner: 'ResNet' }
];

/**
 * Composant affichant des visualisations pour illustrer les concepts de Machine Learning
 * @returns {JSX.Element} Le composant MLVisualizations
 */
const MLVisualizations = () => {
  return (
    <section id="ml-visualizations-charts" className="section-container py-16">
      <SectionHeading
        pretitle="Visualisations"
        title="Illustrer les concepts du machine learning"
        description="Quelques graphiques pour visualiser des principes du machine learning. Sauf mention contraire, les courbes sont schématiques : elles montrent une allure typique, pas des mesures."
        center
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique 1: Courbe d'apprentissage */}
        <div className="glass-card p-6 rounded-xl shadow-xs">
          <h3 className="text-xl font-semibold mb-4">Courbe d'apprentissage (schématique)</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Allure schématique inventée pour illustrer le surapprentissage : ces valeurs ne proviennent d'aucun entraînement réel.
            On observe généralement une amélioration rapide suivie d'un plateau.
          </p>

          <div className="h-[300px] w-full">
            <ChartContainer
              config={{
                training: { theme: { light: '#8B5CF6', dark: '#A78BFA' }, label: 'Données d\'entraînement' },
                validation: { theme: { light: '#F97316', dark: '#FB923C' }, label: 'Données de validation' }
              }}
            >
              <LineChart data={learningCurveData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  dataKey="epoch"
                  label={{ value: 'Époque d\'entraînement', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'Exactitude (%)', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign="top" height={36} formatter={(value: string) => <span className="text-foreground">{value}</span>} />
                <Line
                  type="monotone"
                  dataKey="training"
                  stroke="var(--color-training)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Entraînement"
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="validation"
                  stroke="var(--color-validation)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Validation"
                  isAnimationActive={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
          <div className="mt-4 text-xs text-muted-foreground space-y-2">
            <p>
              <strong>Note :</strong> le surapprentissage (overfitting) se produit lorsque l'exactitude (part de bonnes réponses) sur les données
              d'entraînement continue d'augmenter tandis que celle sur les données de validation stagne ou diminue.
            </p>
            <p>
              Pour voir de vraies courbes, essayez le{' '}
              <Link to="/simulateur-ia" className="underline underline-offset-4">simulateur d'entraînement</Link>.
            </p>
          </div>
        </div>

        {/* Graphique 2: Comparaison des profils d'algorithmes */}
        <div className="glass-card p-6 rounded-xl shadow-xs">
          <h3 className="text-xl font-semibold mb-4">Comparaison qualitative des algorithmes</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tendances générales selon trois critères : capacité à modéliser des relations complexes, complexité et
            interprétabilité (de 1 à 5).
          </p>

          <div className="h-[300px] w-full">
            <ChartContainer
              config={{
                capacity: { theme: { light: '#8B5CF6', dark: '#A78BFA' }, label: 'Capacité de modélisation' },
                complexity: { theme: { light: '#F97316', dark: '#FB923C' }, label: 'Complexité' },
                interpretability: { theme: { light: '#0EA5E9', dark: '#38BDF8' }, label: 'Interprétabilité' }
              }}
            >
              <BarChart
                data={algorithmProfiles}
                layout="vertical"
                barGap={4}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                <XAxis type="number" domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                <YAxis
                  type="category"
                  width={120}
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend formatter={(value: string) => <span className="text-foreground">{value}</span>} />
                <Bar dataKey="capacity" fill="var(--color-capacity)" name="Capacité" isAnimationActive={false} />
                <Bar dataKey="complexity" fill="var(--color-complexity)" name="Complexité" isAnimationActive={false} />
                <Bar dataKey="interpretability" fill="var(--color-interpretability)" name="Interprétabilité" isAnimationActive={false} />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="mt-4 space-y-3">
            <SimulationNotice>
              Ces niveaux sont des tendances générales, pas des résultats mesurés : l'exactitude réellement obtenue
              dépend des données. Les modèles plus flexibles sont en général moins faciles à interpréter.
            </SimulationNotice>
          </div>
        </div>

        {/* Graphique 3: Les grandes familles d'apprentissage */}
        <div className="glass-card p-6 rounded-xl shadow-xs">
          <h3 className="text-xl font-semibold mb-4">Les grandes familles d'apprentissage</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Les approches se distinguent par le type de signal dont le modèle dispose pour apprendre.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {learningFamilies.map((family) => (
              <li key={family.title} className="rounded-lg border bg-background/60 p-4 space-y-2">
                <h4 className="font-semibold">{family.title}</h4>
                <p className="text-sm text-muted-foreground">{family.description}</p>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Exemple :</strong> {family.example}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Graphique 4: Données réelles, le concours ImageNet */}
        <div className="glass-card p-6 rounded-xl shadow-xs">
          <h3 className="text-xl font-semibold mb-4">Reconnaissance d'images : le concours ImageNet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Taux d'erreur « top-5 » du vainqueur du concours ILSVRC (classification d'images), en pourcentage : plus la
            barre est basse, meilleur est le résultat.
          </p>

          <div className="h-[300px] w-full">
            <ChartContainer
              config={{
                error: { theme: { light: '#8B5CF6', dark: '#A78BFA' }, label: 'Erreur top-5 (%)' }
              }}
            >
              <BarChart data={imagenetWinners} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 30]} label={{ value: 'Erreur top-5 (%)', angle: -90, position: 'insideLeft' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="error" fill="var(--color-error)" name="Erreur top-5 (%)" isAnimationActive={false}>
                  <LabelList dataKey="error" position="top" fontSize={11} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
          <div className="mt-4 text-xs text-muted-foreground space-y-2">
            <p>
              <strong>Vainqueurs :</strong> {imagenetWinners.map((item) => `${item.year} ${item.winner}`).join(', ')}.
            </p>
            <p>
              <strong>Observation :</strong> la victoire d'AlexNet, un réseau convolutif profond, marque en 2012 une
              rupture avec les méthodes précédentes. L'erreur passe de 28,2 % en 2010 à 3,57 % en 2015. Pour 2012, on
              indique le résultat obtenu avec les seules données du concours (15,3 % avec des données
              supplémentaires). Source : Russakovsky et al., « ImageNet Large Scale Visual Recognition Challenge », International Journal of Computer Vision, 2015, et articles des équipes lauréates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MLVisualizations;
