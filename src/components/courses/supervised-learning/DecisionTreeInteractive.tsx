// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TreePine, Play, Pause, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';
import SimulationNotice from '@/components/common/SimulationNotice';
import ScrollHint from '@/components/common/ScrollHint';
import { FEATURES, generateApplicants, type FeatureKey, type Sample } from './miniForest';

interface TreeNode {
  id: string;
  question: string;
  samples: number;
  approved: number;
  gini: number;
  prediction?: string;
  left?: TreeNode;
  right?: TreeNode;
}

// Dossiers fictifs produits par ordinateur (graine fixe) : l'arbre ci-dessous est réellement calculé à partir d'eux.
const DATASET_SIZE = 20;
const DATASET_SEED = 3;
const MAX_DEPTH = 2;
const MIN_LEAF = 2;
const sampleData: Sample[] = generateApplicants(DATASET_SIZE, DATASET_SEED);

const formatNumber = (value: number) => value.toLocaleString('fr-FR');
const formatFeature = (feature: FeatureKey, value: number) => {
  const info = FEATURES.find((item) => item.key === feature)!;
  const shown = info.step >= 100 ? value : Math.floor(value);
  return `${formatNumber(shown)} ${info.unit}`;
};

const giniOf = (approved: number, total: number) => (total === 0 ? 0 : 2 * (approved / total) * (1 - approved / total));

/** Arbre CART (critère de Gini) : à chaque nœud, toutes les variables et tous les seuils sont essayés. */
const buildTree = (rows: Sample[], depth: number, id: string): TreeNode => {
  const approved = rows.reduce((sum, row) => sum + row.approved, 0);
  const node: TreeNode = { id, question: '', samples: rows.length, approved, gini: giniOf(approved, rows.length) };
  const makeLeaf = () => {
    node.prediction = approved * 2 > rows.length ? 'Approuvé' : 'Refusé';
    node.question = `Feuille\u00A0: ${node.prediction.toLowerCase()}`;
    return node;
  };
  if (depth >= MAX_DEPTH || approved === 0 || approved === rows.length || rows.length < 2 * MIN_LEAF) return makeLeaf();

  let best: { feature: FeatureKey; threshold: number; score: number } | null = null;
  for (const { key: feature } of FEATURES) {
    const sorted = [...rows].sort((a, b) => a[feature] - b[feature]);
    let leftApproved = 0;
    for (let i = 0; i < sorted.length - 1; i += 1) {
      leftApproved += sorted[i].approved;
      if (sorted[i][feature] === sorted[i + 1][feature]) continue;
      const leftSize = i + 1;
      const rightSize = sorted.length - leftSize;
      if (leftSize < MIN_LEAF || rightSize < MIN_LEAF) continue;
      const score =
        (leftSize * giniOf(leftApproved, leftSize) + rightSize * giniOf(approved - leftApproved, rightSize)) / sorted.length;
      if (!best || score < best.score) {
        best = { feature, threshold: (sorted[i][feature] + sorted[i + 1][feature]) / 2, score };
      }
    }
  }
  if (!best) return makeLeaf();

  const { feature, threshold } = best;
  const label = FEATURES.find((item) => item.key === feature)!.label;
  node.question = `${label} ≤ ${formatFeature(feature, threshold)}\u00A0?`;
  const childIds = depth === 0 ? ['left1', 'right1'] : id === 'left1' ? ['left2', 'right2'] : ['left3', 'right3'];
  node.left = buildTree(rows.filter((row) => row[feature] <= threshold), depth + 1, childIds[0]);
  node.right = buildTree(rows.filter((row) => row[feature] > threshold), depth + 1, childIds[1]);
  return node;
};

const treeStructure: TreeNode = buildTree(sampleData, 0, 'root');
const totalApproved = treeStructure.approved;

const describeBranch = (node: TreeNode | undefined, side: 'OUI' | 'NON') => {
  if (!node) return '';
  const detail = node.left
    ? `nouvelle question\u00A0: ${node.question}`
    : `feuille\u00A0: ${node.samples} dossiers, décision «\u00A0${node.prediction}\u00A0»`;
  return `Branche ${side} (${node.samples} dossiers dont ${node.approved} approuvés)\u00A0: ${detail}`;
};

const steps = [
  {
    title: 'Données initiales',
    description: `${sampleData.length} dossiers de crédit fictifs (dont ${totalApproved} approuvés), décrits par l'âge, le salaire, l'expérience et les dettes`,
    focusNode: 'root'
  },
  {
    title: 'Première division',
    description: `L'algorithme essaie chaque variable et chaque seuil possible et retient celui qui réduit le plus l'indice de Gini\u00A0: ${treeStructure.question}`,
    focusNode: 'root'
  },
  {
    title: 'Branche OUI',
    description: describeBranch(treeStructure.left, 'OUI'),
    focusNode: 'left1'
  },
  {
    title: 'Branche NON',
    description: describeBranch(treeStructure.right, 'NON'),
    focusNode: 'right1'
  },
  {
    title: 'Feuilles finales',
    description: "Chaque dossier suit les réponses jusqu'à une feuille, dont la décision est la classe majoritaire\u00A0; en cas d'égalité, le refus",
    focusNode: 'all'
  }
];

const DecisionTreeInteractive: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        // Auto-expand relevant nodes
        const nextStep = steps[prev + 1];
        if (nextStep.focusNode !== 'all') {
          setExpandedNodes(prevNodes => new Set([...prevNodes, nextStep.focusNode]));
        } else {
          setExpandedNodes(new Set(['root', 'left1', 'right1']));
        }
        return prev + 1;
      });
    }, 3000);
  };

  const renderNode = (node: TreeNode, isHighlighted: boolean = false) => {
    const isExpanded = expandedNodes.has(node.id);
    const isLeaf = !node.left && !node.right;

    return (
      <div key={node.id} className="flex flex-col items-center">
        <div
          className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
            isHighlighted
              ? 'border-primary bg-primary/10 shadow-lg scale-105'
              : isLeaf
                ? 'border-green-300 bg-green-50 dark:bg-green-950/30'
                : 'border-blue-300 bg-blue-50 dark:bg-blue-950/30'
          } hover:shadow-md`}
          onClick={() => !isLeaf && toggleNode(node.id)}
        >
          <div className="flex items-center gap-2 mb-2">
            {!isLeaf && (
              <div className="text-blue-600 dark:text-blue-400">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            )}
            <div className="font-semibold text-sm">{node.question}</div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span>Dossiers :</span>
              <Badge variant="outline">{node.samples}</Badge>
            </div>
            <div className="flex justify-between gap-4">
              <span>Dont approuvés :</span>
              <Badge variant="outline">{node.approved}</Badge>
            </div>
            <div className="flex justify-between gap-4">
              <span>Gini :</span>
              <Badge variant={node.gini === 0 ? "default" : "secondary"}>{node.gini.toFixed(2)}</Badge>
            </div>
            {node.prediction && (
              <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded border">
                <div className="font-semibold text-center text-xs">
                  → {node.prediction}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Branches */}
        {isExpanded && (node.left || node.right) && (
          <div className="flex flex-col items-center mt-4">
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex gap-8">
              {node.left && (
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">OUI</div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  {renderNode(node.left, steps[currentStep]?.focusNode === node.left.id)}
                </div>
              )}
              {node.right && (
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">NON</div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  {renderNode(node.right, steps[currentStep]?.focusNode === node.right.id)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl leading-snug sm:text-2xl">
          <TreePine className="h-6 w-6 text-green-700 dark:text-green-400" />
          Arbre de Décision Interactif - Approbation de Crédit
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Un arbre de décision construit sous vos yeux, calculé à partir de {sampleData.length} dossiers fictifs
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
        <SimulationNotice>
          Les dossiers sont générés par ordinateur (graine fixe) selon une règle cachée à laquelle s'ajoute du bruit :
          ils ne viennent d'aucune banque. L'arbre est réellement calculé ici, avec l'indice de Gini ; le déroulé par
          étapes en est seulement une présentation.
        </SimulationNotice>

        {/* Contrôles */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Button
            onClick={handlePlay}
            size="sm"
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : "Dérouler la construction"}
          </Button>
          <Button
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(false);
              setExpandedNodes(new Set(['root']));
            }}
            size="sm"
            variant="outline"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Étape {currentStep + 1} / {steps.length}
          </div>
        </div>

        {/* Progression */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Déroulé de la construction</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentStep + 1) / steps.length) * 100)} %
            </span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" aria-label="Progression à travers les étapes" />
        </div>

        {/* Étape actuelle */}
        <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="shrink-0 whitespace-nowrap">Étape {currentStep + 1}</Badge>
            <h3 className="font-semibold text-green-800 dark:text-green-200">
              {steps[currentStep].title}
            </h3>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            {steps[currentStep].description}
          </p>
        </div>

        {/* Données d'exemple */}
        <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
          <h4 className="font-semibold mb-3">Données d'entraînement (extrait) :</h4>
          <div tabIndex={0} role="region" aria-label="Données d'entraînement" className="relative overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-1">Âge</th>
                  <th className="text-left p-1">Salaire mensuel net</th>
                  <th className="text-left p-1">Expérience</th>
                  <th className="text-left p-1">Dettes</th>
                  <th className="text-left p-1">Décision</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.slice(0, 4).map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-1">{row.age} ans</td>
                    <td className="p-1">{formatNumber(row.salaire)} €</td>
                    <td className="p-1">{row.experience} ans</td>
                    <td className="p-1">{formatNumber(row.dette)} €</td>
                    <td className="p-1">
                      <Badge variant={row.approved ? "default" : "destructive"} className="text-xs">
                        {row.approved ? 'Approuvé' : 'Refusé'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-muted-foreground mt-2">
              ... et {sampleData.length - 4} autres dossiers
            </div>
          </div>
          <ScrollHint>Faites défiler horizontalement pour voir toutes les colonnes.</ScrollHint>
        </div>

        {/* Visualisation de l'arbre */}
        <div>
          <div tabIndex={0} role="region" aria-label="Structure de l'arbre de décision" className="relative bg-linear-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900/50 p-3 sm:p-6 rounded-lg border overflow-x-auto">
            <h4 className="font-semibold mb-4 text-center">Structure de l'Arbre de Décision</h4>
            <div className="flex justify-center min-w-max">
              {renderNode(treeStructure, steps[currentStep]?.focusNode === 'root')}
            </div>
          </div>
          <ScrollHint>Faites défiler horizontalement pour voir l'arbre en entier.</ScrollHint>
        </div>

        {/* Métriques et explications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
              🎯 Comment l'arbre choisit les questions
            </h4>
            <ul className="text-sm space-y-2 text-blue-700 dark:text-blue-300">
              <li>• <strong>Calcul du Gini :</strong> mesure le mélange d'un groupe (0 : groupe pur, 0,5 : moitié-moitié)</li>
              <li>• <strong>Réduction d'impureté :</strong> retient la question qui fait le plus baisser le Gini moyen des deux groupes</li>
              <li>• <strong>Critère d'arrêt :</strong> s'arrête par exemple quand un groupe est pur (Gini = 0) ou quand une profondeur maximale est atteinte (ici {MAX_DEPTH})</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
              ✨ Points forts des arbres de décision
            </h4>
            <ul className="text-sm space-y-2 text-green-700 dark:text-green-300">
              <li>• <strong>Lisible :</strong> chaque décision se lit comme une suite de questions</li>
              <li>• <strong>Peu de préparation :</strong> pas besoin de normaliser les variables numériques</li>
              <li>• <strong>Interactions :</strong> peut capter des interactions entre variables, au risque du surapprentissage si l'arbre est trop profond</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionTreeInteractive;
