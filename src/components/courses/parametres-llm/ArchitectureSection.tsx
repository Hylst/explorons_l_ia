// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Layers, 
  Brain,
  FileText,
  TrendingUp,
  TrendingDown,
  Info,
  Building,
  Car,
  Cpu
} from 'lucide-react';
import LessonSection from '@/components/courses/LessonSection';
import TechnicalTooltip from '@/components/courses/TechnicalTooltip';
import StatsGrid from '@/components/courses/StatsGrid';
import AnalogyBox from '@/components/courses/AnalogyBox';

const ArchitectureSection = () => {
  const architectureStats = [
    { 
      value: "175B", 
      description: "paramètres dans GPT-3",
      bgGradient: "bg-linear-to-br from-blue-500/10 to-blue-600/20"
    },
    { 
      value: "4096", 
      description: "dimension des embeddings typique",
      bgGradient: "bg-linear-to-br from-green-500/10 to-green-600/20"
    },
    { 
      value: "96", 
      description: "couches dans GPT-3 (les modèles plus récents en comptent souvent davantage\u00A0: 126 pour Llama 3.1 405B, valeur publiée)",
      bgGradient: "bg-linear-to-br from-purple-500/10 to-purple-600/20"
    },
    { 
      value: "1M", 
      description: "tokens de contexte pour certains modèles actuels (de 200K à 1M selon les modèles, documentation Anthropic, 2026)",
      bgGradient: "bg-linear-to-br from-orange-500/10 to-orange-600/20"
    }
  ];

  const architectureData = [
    {
      param: "Nombre de paramètres",
      description: "C'est la 'taille du cerveau' du modèle, exprimée en milliards",
      impact: "↑ Capacités (en général), ↓ Vitesse, ↑ Coût d'utilisation",
      examples: "GPT-3: 175 milliards (publié) • LLaMA-2-7B: 7 milliards (publié) • Llama 3.1: 8, 70 et 405 milliards (publié) • Les tailles sont publiées pour les modèles à poids ouverts, mais pas pour la plupart des modèles fermés récents (GPT-4 et suivants, par exemple)",
      icon: <Brain className="h-5 w-5 text-blue-500" />,
      analogy: "Comme la puissance d'un processeur\u00A0: plus il y a de 'neurones artificiels', plus le modèle peut traiter des concepts complexes"
    },
    {
      param: "Architecture Transformer",
      description: "Le 'type de moteur' qui détermine comment le modèle fonctionne",
      impact: "Influence fortement les capacités et le type d'usage, avec la taille du modèle et les données d'entraînement",
      examples: "GPT (décodeur seul, génération) • BERT (encodeur seul, compréhension) • T5 (encodeur-décodeur\u00A0: traduction, résumé, classification) • Llama (décodeur seul, ouvert)",
      icon: <Settings className="h-5 w-5 text-purple-500" />,
      analogy: "Comme choisir entre moteur essence, diesel ou électrique\u00A0: chaque architecture excelle dans certaines tâches"
    },
    {
      param: "Nombre de couches",
      description: "La 'profondeur' du réseau neuronal, comme des étages de réflexion",
      impact: "↑ Capacité de raisonnement complexe, ↑ Temps de calcul",
      examples: "GPT-3: 96 couches • LLaMA-7B: 32 couches • BERT-large: 24 couches",
      icon: <Layers className="h-5 w-5 text-green-500" />,
      analogy: "Comme les étages d'un immeuble\u00A0: chaque couche ajoute un niveau d'analyse plus sophistiqué"
    },
    {
      param: "Dimension des embeddings",
      description: "La 'résolution' avec laquelle chaque mot est représenté numériquement",
      impact: "↑ Finesse de compréhension, ↑ Mémoire nécessaire",
      examples: "GPT-3: 12288 • LLaMA-7B: 4096 • BERT-base: 768 (valeurs publiées)",
      icon: <FileText className="h-5 w-5 text-orange-500" />,
      analogy: "Comme la résolution d'une photo\u00A0: 4K capture plus de détails que 720p, mais prend plus d'espace"
    }
  ];

  return (
    <LessonSection
      title="I. Paramètres fondamentaux d'architecture"
      icon={<Settings className="h-6 w-6" />}
      delay={0}
    >
      <div className="space-y-6">
        {/* Introduction avec analogie */}
        <AnalogyBox 
          title="🏗️ L'architecture d'un LLM, c'est comme..."
          content="Imaginez construire une maison : l'architecture détermine le nombre de pièces (paramètres), le type de fondations (Transformer), la hauteur (couches) et la qualité des matériaux (embeddings). Une fois construite, vous ne pouvez plus changer la structure - seulement décorer l'intérieur !"
          variant="info"
        />

        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <Building className="h-6 w-6 text-blue-600 mt-1 shrink-0" />
            <div>
              <p className="text-lg leading-relaxed text-blue-800 dark:text-blue-200">
                L'architecture d'un LLM, c'est sa <strong>"carte d'identité technique"</strong>. 
                Ces paramètres sont définis une fois pour toutes lors de la conception et déterminent 
                ses capacités fondamentales. C'est comme l'ADN du modèle : impossible à modifier après création !
              </p>
            </div>
          </div>
        </div>

        <StatsGrid stats={architectureStats} columns={4} />

        <div className="space-y-4">
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            Décryptage des composants architecturaux
          </h4>
          
          {architectureData.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  {item.icon}
                  <TechnicalTooltip 
                    term={item.param}
                    definition={item.description}
                  >
                    {item.param}
                  </TechnicalTooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{item.description}</p>
                  
                  {/* Analogie */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <Car className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">💡 Analogie :</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{item.analogy}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Impact sur les performances
                    </Badge>
                    <span className="text-sm min-w-0 wrap-break-word">{item.impact}</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      📊 Exemples concrets de modèles populaires :
                    </p>
                    <p className="text-sm">{item.examples}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <TrendingUp className="h-5 w-5" />
                ✅ Pourquoi choisir un gros modèle ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                <li>• <strong>🧠 Capacités émergentes :</strong> Raisonnement complexe, créativité avancée</li>
                <li>• <strong>🎯 Généralisation :</strong> Excellent sur des tâches jamais vues</li>
                <li>• <strong>🔍 Compréhension nuancée :</strong> Saisit les subtilités et l'implicite</li>
                <li>• <strong>📚 Few-shot learning :</strong> Apprend vite avec peu d'exemples</li>
                <li>• <strong>🌍 Multilingue :</strong> Parle couramment de nombreuses langues</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                <TrendingDown className="h-5 w-5" />
                ⚠️ Les contraintes des gros modèles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-400">
                <li>• <strong>💰 Coût computationnel :</strong> GPU/TPU très puissants requis</li>
                <li>• <strong>⏱️ Latence élevée :</strong> La réponse démarre et se termine plus tard qu'avec un petit modèle (la durée dépend du matériel et de la longueur de la réponse)</li>
                <li>• <strong>🧠 Mémoire énorme :</strong> Plusieurs centaines de GB de RAM</li>
                <li>• <strong>⚡ Énergie :</strong> Consommation électrique très importante</li>
                <li>• <strong>📱 Déploiement :</strong> Impossible sur appareils mobiles</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Guide pratique de sélection */}
        <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                🎯 Guide pratique : Comment choisir la bonne taille ?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                  <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">🚀 Petits modèles (1B-13B)</h5>
                  <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                    <li>• Applications temps réel</li>
                    <li>• Chatbots simples</li>
                    <li>• Appareils mobiles</li>
                    <li>• Budget limité</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                  <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">⚖️ Modèles moyens (30B-70B)</h5>
                  <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                    <li>• Équilibre performance/coût</li>
                    <li>• Nombreux cas d'usage</li>
                    <li>• Applications d'entreprise</li>
                    <li>• Assistant intelligent</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                  <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">🧠 Gros modèles (175B+)</h5>
                  <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                    <li>• Tâches très complexes</li>
                    <li>• Recherche scientifique</li>
                    <li>• Créativité avancée</li>
                    <li>• Budget important</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LessonSection>
  );
};

export default ArchitectureSection;
