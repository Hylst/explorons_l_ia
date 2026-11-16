// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Sparkles, Target, Zap, Brain, Users, Info } from 'lucide-react';
import { templateCounts } from './allTemplates';

const PromptGeneratorHeader = () => {
  return (
    <div className="space-y-6">
      {/* Header principal */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-linear-to-r from-purple-500 to-blue-500">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Générateur de prompts
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Composez des prompts structurés pour les LLM, la génération d'images, l'audio, la vidéo et les systèmes RAG,
          à partir de modèles à adapter
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 rounded-lg border bg-card">
          <div className="text-3xl font-bold text-primary">{templateCounts.templates}</div>
          <div className="text-sm text-muted-foreground">Modèles de prompts</div>
        </div>
        <div className="text-center p-4 rounded-lg border bg-card">
          <div className="text-3xl font-bold text-primary">{templateCounts.categories}</div>
          <div className="text-sm text-muted-foreground">Catégories</div>
        </div>
        <div className="text-center p-4 rounded-lg border bg-card">
          <div className="text-3xl font-bold text-primary">Local</div>
          <div className="text-sm text-muted-foreground">Rien n'est envoyé hors du navigateur</div>
        </div>
        <div className="text-center p-4 rounded-lg border bg-card">
          <div className="text-3xl font-bold text-primary">Gratuit</div>
          <div className="text-sm text-muted-foreground">Sans compte ni inscription</div>
        </div>
      </div>

      {/* Fonctionnalités clés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Modèles par cas d'usage</h3>
            <p className="text-sm text-muted-foreground">
              {templateCounts.templates} modèles répartis par type d'IA et par cas d'usage, à adapter à votre besoin
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Formulaires guidés</h3>
            <p className="text-sm text-muted-foreground">
              Renseignez quelques champs : le prompt se compose au fur et à mesure
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Plusieurs types d'IA</h3>
            <p className="text-sm text-muted-foreground">
              Modèles pour les LLM, les images, l'audio, la vidéo, la vision et les systèmes RAG
            </p>
          </div>
        </div>
      </div>

      {/* Ce que l'outil apporte, et ses limites */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-primary" aria-hidden="true" />
              Ce que l'outil apporte
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" aria-hidden="true"></div>
                Un point de départ structuré : rôle, contexte, format et contraintes sont déjà posés
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" aria-hidden="true"></div>
                Des modèles par type d'IA, à adapter plutôt qu'à copier tels quels
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" aria-hidden="true"></div>
                Tout se fait dans votre navigateur : aucun texte saisi n'est envoyé
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Info className="h-5 w-5 text-primary" aria-hidden="true" />
              Ses limites
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" aria-hidden="true"></div>
                Un bon prompt améliore souvent les réponses, sans garantie : testez et ajustez
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" aria-hidden="true"></div>
                Un prompt efficace avec un modèle peut l'être moins avec un autre
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" aria-hidden="true"></div>
                Les réponses varient d'une exécution à l'autre : relisez toujours le résultat
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" aria-hidden="true"></div>
                Images, audio et vidéo : les paramètres techniques demandés dans un prompt (résolution, DPI, format vectoriel, prompt négatif, texte lisible dans l'image) sont des souhaits, pas des garanties. Le résultat dépend de l'outil utilisé
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" aria-hidden="true"></div>
                Santé, droit, finances : la réponse d'un modèle ne remplace pas un professionnel, et il vaut mieux ne pas saisir de données personnelles sensibles chez un fournisseur d'IA
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGeneratorHeader;
