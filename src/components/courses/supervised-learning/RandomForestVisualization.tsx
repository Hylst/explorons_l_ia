// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { TreePine, RotateCcw, Vote, Target } from 'lucide-react';
import SimulationNotice from '@/components/common/SimulationNotice';
import {
  FEATURES,
  FEATURE_LABELS,
  forestAccuracy,
  forestTreeAccuracy,
  forestVote,
  generateApplicants,
  predictTree,
  singleTreeAccuracy,
  splitApplicants,
  trainForest,
  type Applicant
} from './miniForest';

const DATASET_SIZE = 400;
const SINGLE_TREE_DEPTH = 12;
const DEFAULT_PROFILE: Applicant = { age: 35, salaire: 2800, experience: 8, dette: 12000 };

const formatNumber = (value: number) => value.toLocaleString('fr-FR');
const formatPercent = (value: number) => `${value.toFixed(0)}\u00A0%`;
const formatFeature = (key: keyof Applicant, value: number) =>
  key === 'salaire' || key === 'dette' ? `${formatNumber(value)}\u00A0€` : `${formatNumber(value)} ans`;

const decisionLabel = (decision: 0 | 1) => (decision === 1 ? 'Approuvé' : 'Rejeté');

const RandomForestVisualization: React.FC = () => {
  const [numberOfTrees, setNumberOfTrees] = useState<number>(10);
  const [maxDepth, setMaxDepth] = useState<number>(5);
  const [seed, setSeed] = useState<number>(1);
  const [profile, setProfile] = useState<Applicant>(DEFAULT_PROFILE);

  const { train, test } = useMemo(() => splitApplicants(generateApplicants(DATASET_SIZE, seed), seed), [seed]);
  const forest = useMemo(
    () => trainForest(train, { trees: numberOfTrees, maxDepth, seed }),
    [train, numberOfTrees, maxDepth, seed]
  );

  const vote = useMemo(() => forestVote(forest, profile), [forest, profile]);
  const results = useMemo(() => {
    const treeScores = forest.map((item) => forestTreeAccuracy(item.tree, test));
    return {
      forest: forestAccuracy(forest, test),
      averageTree: treeScores.reduce((sum, value) => sum + value, 0) / Math.max(1, treeScores.length),
      singleDeepTree: singleTreeAccuracy(train, test, SINGLE_TREE_DEPTH)
    };
  }, [forest, train, test]);

  const approvalShare = forest.length === 0 ? 0 : (vote.approvals / forest.length) * 100;

  return (
    <Card className="border-primary/20">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl leading-snug sm:text-2xl">
          <TreePine className="h-6 w-6 text-emerald-600" aria-hidden="true" />
          Forêt aléatoire : le vote de plusieurs arbres
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Des arbres de décision sont réellement entraînés dans votre navigateur sur des dossiers de crédit fictifs.
          Réglez un profil et regardez-les voter.
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
        <SimulationNotice>
          Les dossiers sont synthétiques : ils sont générés avec une règle cachée (salaire, expérience, dettes) à
          laquelle s'ajoute du bruit, puis les arbres sont réellement entraînés dessus. Les résultats illustrent la
          méthode, pas la performance d'un vrai système de crédit. L'âge n'intervient pas dans la règle : utiliser
          l'âge pour décider d'un crédit poserait d'ailleurs un problème de discrimination.
        </SimulationNotice>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Forêt</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" id="rf-trees">Nombre d'arbres</label>
                <Badge variant="secondary">{numberOfTrees}</Badge>
              </div>
              <Slider aria-labelledby="rf-trees" value={[numberOfTrees]} onValueChange={(value) => setNumberOfTrees(value[0])} max={25} min={1} step={1} className="w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" id="rf-depth">Profondeur maximale des arbres</label>
                <Badge variant="secondary">{maxDepth}</Badge>
              </div>
              <Slider aria-labelledby="rf-depth" value={[maxDepth]} onValueChange={(value) => setMaxDepth(value[0])} max={8} min={1} step={1} className="w-full" />
            </div>
            <Button type="button" size="sm" variant="outline" className="h-auto whitespace-normal text-left" onClick={() => setSeed((current) => current + 1)}>
              <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
              Nouveau tirage de dossiers
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Profil à évaluer</h4>
            {FEATURES.map((feature) => (
              <div key={feature.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" id={`rf-${feature.key}`}>{feature.label}</label>
                  <Badge variant="secondary">{formatFeature(feature.key, profile[feature.key])}</Badge>
                </div>
                <Slider
                  aria-labelledby={`rf-${feature.key}`}
                  value={[profile[feature.key]]}
                  onValueChange={(value) => setProfile((current) => ({ ...current, [feature.key]: value[0] }))}
                  min={feature.min}
                  max={feature.max}
                  step={feature.step}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-center">Le vote de chaque arbre</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {forest.map((item) => {
              const treeVote = predictTree(item.tree, profile);
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border-2 ${
                    treeVote === 1
                      ? 'bg-green-100 border-green-300 dark:bg-green-950/30 dark:border-green-800'
                      : 'bg-red-100 border-red-300 dark:bg-red-950/30 dark:border-red-800'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <TreePine className={`h-6 w-6 mx-auto ${treeVote === 1 ? 'text-green-700 dark:text-green-400' : 'text-red-600'}`} aria-hidden="true" />
                    <div className="text-xs font-semibold">Arbre n° {item.id}</div>
                    <Badge variant={treeVote === 1 ? 'default' : 'destructive'} className="text-xs">
                      {decisionLabel(treeVote)}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {item.root
                        ? `Première question\u00A0: ${FEATURE_LABELS[item.root.feature]} ≤ ${formatNumber(Math.round(item.root.threshold))}\u00A0?`
                        : 'Arbre réduit à une feuille'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.outOfBagAccuracy === null
                        ? 'Exactitude hors échantillon\u00A0: n.d.'
                        : `Exactitude hors échantillon\u00A0: ${formatPercent(item.outOfBagAccuracy)}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 space-y-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <Vote className="h-5 w-5" aria-hidden="true" />
            Vote à la majorité
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Arbres qui approuvent</span>
                <Badge variant="default" className="shrink-0 whitespace-nowrap">{vote.approvals} sur {forest.length}</Badge>
              </div>
              <Progress value={approvalShare} className="h-2" aria-label="Part des arbres qui approuvent" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-700 dark:text-red-300">Arbres qui rejettent</span>
                <Badge variant="destructive" className="shrink-0 whitespace-nowrap">{vote.rejections} sur {forest.length}</Badge>
              </div>
              <Progress value={100 - approvalShare} className="h-2" aria-label="Part des arbres qui rejettent" />
            </div>
          </div>
          <p className="text-sm text-blue-900 dark:text-blue-200">
            Décision de la forêt : <strong>{decisionLabel(vote.decision)}</strong>
            {forest.length > 1 && <> ({formatPercent(vote.agreement)} des arbres sont d'accord)</>}. La part des arbres
            d'accord n'est pas une probabilité : c'est un indice de consensus.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 space-y-3">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 flex items-center gap-2">
            <Target className="h-5 w-5" aria-hidden="true" />
            Exactitude mesurée sur {test.length} dossiers de test mis de côté
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-white dark:bg-gray-900/50 p-3 rounded-lg border">
              <div className="text-2xl font-bold">{formatPercent(results.singleDeepTree)}</div>
              <div className="text-xs text-muted-foreground">Un seul arbre profond (toutes les variables, profondeur {SINGLE_TREE_DEPTH})</div>
            </div>
            <div className="bg-white dark:bg-gray-900/50 p-3 rounded-lg border">
              <div className="text-2xl font-bold">{formatPercent(results.averageTree)}</div>
              <div className="text-xs text-muted-foreground">Un arbre de la forêt (moyenne des {forest.length} arbres)</div>
            </div>
            <div className="bg-white dark:bg-gray-900/50 p-3 rounded-lg border">
              <div className="text-2xl font-bold">{formatPercent(results.forest)}</div>
              <div className="text-xs text-muted-foreground">La forêt de {forest.length} arbre{forest.length > 1 ? 's' : ''}</div>
            </div>
          </div>
          <p className="text-xs text-purple-900 dark:text-purple-200">
            Ces chiffres changent à chaque tirage (il n'y a que {test.length} dossiers de test) : relancez plusieurs fois
            et regardez si la forêt fait mieux que l'arbre seul. En général, plus il y a d'arbres, plus le résultat est
            stable, sans garantie sur un jeu de données donné.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Pourquoi ça fonctionne</h4>
            <ul className="text-sm space-y-2 text-amber-900 dark:text-amber-200">
              <li>• <strong>Diversité :</strong> chaque arbre voit un échantillon différent des données</li>
              <li>• <strong>Compensation :</strong> les erreurs individuelles se compensent en partie</li>
              <li>• <strong>Stabilité :</strong> moins sensible au surapprentissage qu'un arbre profond seul</li>
              <li>• <strong>Limite :</strong> plus difficile à expliquer qu'un arbre unique</li>
            </ul>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-3">Ce que fait cette démonstration</h4>
            <ul className="text-sm space-y-2 text-cyan-900 dark:text-cyan-200">
              <li>• <strong>Bagging :</strong> chaque arbre est entraîné sur un échantillon tiré avec remise</li>
              <li>• <strong>Variables aléatoires :</strong> à chaque coupure, seules 2 variables sur 4 sont examinées</li>
              <li>• <strong>Vote :</strong> la décision finale suit la majorité des arbres</li>
              <li>• <strong>Hors échantillon :</strong> l'exactitude de chaque arbre est mesurée sur les dossiers qu'il n'a pas vus</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RandomForestVisualization;
