// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Code,
  PenSquare,
  Search,
  DollarSign,
  Users,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import LessonSection from '@/components/courses/LessonSection';

interface UseCase {
  title: string;
  description: string;
  parameters: {
    model: string;
    temperature: string;
    otherParams: string;
    rationale: string;
  };
  icon: React.ReactNode;
  category: string;
}

// Les noms de modèles commerciaux changent en quelques mois : on décrit des types de modèles.
// Les valeurs de réglage sont des points de départ courants, à valider par des tests sur vos propres données.
const useCases: UseCase[] = [
  {
    title: "Génération de code",
    description: "Développement assisté, refactoring, documentation automatisée",
    parameters: {
      model: "Modèle spécialisé en code ou généraliste de grande taille, à comparer sur vos propres cas",
      temperature: "0.1-0.3",
      otherParams: "Top-p: 0.95, Repetition Penalty: 1.0",
      rationale: "Précision maximale requise, tokens prédictibles, contexte technique long"
    },
    icon: <Code className="h-5 w-5 text-blue-500" />,
    category: "Développement"
  },
  {
    title: "Création de contenu",
    description: "Articles, marketing, scénarios, descriptions produits",
    parameters: {
      model: "Modèle généraliste de grande taille, propriétaire ou open-weights récent",
      temperature: "0.7-0.9",
      otherParams: "Top-p: 0.9, Repetition Penalty: 1.1",
      rationale: "Équilibre créativité/cohérence, variation stylistique, éviter les répétitions"
    },
    icon: <PenSquare className="h-5 w-5 text-purple-500" />,
    category: "Création"
  },
  {
    title: "Recherche augmentée",
    description: "Analyse documentaire, recherche scientifique, synthèse d'études",
    parameters: {
      model: "Modèle à grande fenêtre de contexte, idéalement associé à une recherche documentaire (RAG)",
      temperature: "0.2-0.4",
      otherParams: "Max tokens: élevé, Top-p: 0.8",
      rationale: "Exactitude factuelle, cohérence sur long contexte, attribution des sources"
    },
    icon: <Search className="h-5 w-5 text-green-500" />,
    category: "Recherche"
  },
  {
    title: "Optimisation coûts/performances",
    description: "Applications grand public, API services, intégration produits",
    parameters: {
      model: "Petit modèle open-weights (7 à 13 milliards de paramètres), quantisé en 4 bits",
      temperature: "Variable selon la fonction",
      otherParams: "Traitement par lots (batching), mise en cache des réponses",
      rationale: "Équilibre coût/latence/qualité, optimisation des ressources, haute disponibilité"
    },
    icon: <DollarSign className="h-5 w-5 text-amber-500" />,
    category: "Optimisation"
  }
];

const selectionMatrix = [
  {
    context: "Budget limité",
    recommendation: "Petits modèles open-weights, éventuellement quantisés (7 à 13 milliards de paramètres)",
    rationale: "Peut réduire le coût par requête à volume élevé, mais il faut héberger, superviser et maintenir le modèle\u00A0: comparez avec le prix d'une API avant de décider.",
    example: "Un modèle de 8 milliards de paramètres quantifié en 4 bits sur un GPU grand public"
  },
  {
    context: "Exigence de qualité maximale",
    recommendation: "Très grands modèles de dernière génération",
    rationale: "Ils obtiennent en général les meilleurs résultats sur les tâches complexes, pour un coût et une latence plus élevés. Comparez-les sur vos propres tâches, pas sur des classements généraux.",
    example: "Les modèles de pointe proposés par les grands éditeurs"
  },
  {
    context: "Contrainte de latence",
    recommendation: "Modèles plus petits, quantisés ou distillés, sur un moteur d'inférence optimisé",
    rationale: "La quantification, la distillation et les moteurs d'inférence optimisés réduisent la latence et le coût. Le gain dépend fortement du matériel et du modèle.",
    example: "vLLM ou TensorRT-LLM avec un modèle de 7 à 8 milliards de paramètres"
  },
  {
    context: "Domaine hautement spécialisé",
    recommendation: "Prompt soigné et recherche documentaire (RAG) d'abord, fine-tuning (par exemple LoRA) ensuite",
    rationale: "Le fine-tuning peut améliorer les résultats sur un domaine précis si l'on dispose de données de qualité. Il coûte plus cher\u00A0: on l'envisage quand les autres leviers ne suffisent pas.",
    example: "FinGPT (2023) pour la finance, BioMedLM (2022) pour le domaine biomédical"
  }
];

const startingPoints = [
  { lever: "Prompt et choix du modèle", note: "Premiers leviers\u00A0: aucun entraînement nécessaire." },
  { lever: "Temperature et Top-p", note: "Réglage rapide, effet direct sur la variabilité des réponses." },
  { lever: "Taille du contexte", note: "Utile pour les documents longs, mais augmente la latence et le coût." },
  { lever: "Quantification", note: "Réduit la mémoire nécessaire, avec une perte de qualité possible." },
  { lever: "Fine-tuning", note: "Le plus coûteux\u00A0: à envisager en dernier, avec de bonnes données." }
];

const deploymentChecklist = [
  "Analyser les besoins précis (créativité vs exactitude)",
  "Mesurer les contraintes techniques (latence, coût, RAM)",
  "Tester plusieurs modèles sur des échantillons représentatifs",
  "Expérimenter avec la température et les autres paramètres",
  "Évaluer les stratégies d'optimisation (quantification, batching)",
  "Surveiller les performances en production (boucle de retour)"
];

const PracticalApplicationsSection = () => {
  return (
    <LessonSection
      title="VI. Applications pratiques et sélection optimale"
      icon={<Users className="h-6 w-6" />}
      delay={5}
    >
      <div className="space-y-6">
        <div className="bg-linear-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border border-indigo-200 dark:border-indigo-800 p-6 rounded-lg">
          <p className="text-lg leading-relaxed text-indigo-800 dark:text-indigo-200">
            La sélection et le paramétrage d'un LLM doivent être guidés par votre cas d'usage spécifique,
            vos contraintes techniques et économiques. Cette section vous guide dans les choix pratiques
            à faire pour optimiser votre utilisation des LLM.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <h4 className="text-xl font-medium mt-2 mb-4 flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            <Users className="h-5 w-5" />
            Cas d'usage et réglages de départ
          </h4>

          {useCases.map((useCase) => (
            <Card key={useCase.title} className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="flex items-center gap-3 text-lg min-w-0">
                    {useCase.icon}
                    {useCase.title}
                  </CardTitle>
                  <Badge variant="outline" className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    {useCase.category}
                  </Badge>
                </div>
                <CardDescription>{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h5 className="font-medium text-sm mb-3">Configuration de départ (indicative)</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="shrink-0 mt-0.5">Modèle</Badge>
                      <span>{useCase.parameters.model}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="shrink-0 mt-0.5">Temperature</Badge>
                      <span>{useCase.parameters.temperature}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="shrink-0 mt-0.5">Autres</Badge>
                      <span>{useCase.parameters.otherParams}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-muted-foreground"><strong>Pourquoi :</strong> {useCase.parameters.rationale}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h4 className="text-xl font-medium mb-4 flex items-center gap-2 text-green-700 dark:text-green-300">
            <Lightbulb className="h-5 w-5" />
            Matrice de sélection selon le contexte
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectionMatrix.map((item) => (
              <Card key={item.context} className="hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    <Badge variant="outline" className="mb-1 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300">
                      {item.context}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Badge className="bg-green-700 hover:bg-green-700 text-xs mb-1">Recommandation</Badge>
                      <p className="font-medium">{item.recommendation}</p>
                    </div>

                    <div className="text-muted-foreground text-sm">
                      <strong>À attendre :</strong> {item.rationale}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded text-sm">
                      <strong>Exemple :</strong> {item.example}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <BarChart3 className="h-5 w-5" />
                Par où commencer ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-blue-700 dark:text-blue-300">
                {startingPoints.map((point) => (
                  <li key={point.lever}>
                    <strong>{point.lever} :</strong> {point.note}
                  </li>
                ))}
              </ol>
              <p className="text-xs mt-3 text-blue-700 dark:text-blue-300">
                Ordre indicatif, du levier le plus simple au plus coûteux.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-fuchsia-950/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Lightbulb className="h-5 w-5" />
                Checklist de déploiement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                {deploymentChecklist.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="h-5 w-5 shrink-0 rounded border border-purple-500 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-linear-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-lg">
          <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-2">
            Note finale importante
          </h4>
          <p className="text-emerald-700 dark:text-emerald-300">
            L'optimisation des paramètres LLM est un processus itératif qui nécessite des tests empiriques.
            Créez une boucle de retour avec vos utilisateurs pour ajuster progressivement votre configuration.
            Les meilleurs résultats viennent souvent de l'observation directe plutôt que des spécifications théoriques.
          </p>
        </div>
      </div>
    </LessonSection>
  );
};

export default PracticalApplicationsSection;
