// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Settings, 
  Thermometer,
  Filter,
  Repeat,
  FileText,
  Play,
  Lightbulb,
  Code,
  Palette,
  Target
} from 'lucide-react';
import LessonSection from '@/components/courses/LessonSection';
import TechnicalTooltip from '@/components/courses/TechnicalTooltip';
import AnalogyBox from '@/components/courses/AnalogyBox';

const InferenceParametersSection = () => {
  const [temperature, setTemperature] = useState([0.7]);
  const [topP, setTopP] = useState([0.9]);
  const [topK, setTopK] = useState([50]);

  const getTemperatureDescription = (temp: number) => {
    if (temp <= 0.3) return "🤖 Très prévisible - Adapté au code et aux tâches factuelles (la variabilité baisse, les erreurs ne disparaissent pas)";
    if (temp <= 0.6) return "📊 Équilibré - Bon pour la plupart des tâches";
    if (temp <= 0.8) return "🎨 Créatif - Idéal pour l'écriture et les idées";
    return "🌟 Très varié - Réponses plus diverses et moins prévisibles";
  };

  const inferenceParams = [
    {
      param: "Temperature",
      description: "Le 'thermostat de créativité' - contrôle l'imprévisibilité des réponses",
      range: "0.0 (robotique) → 1.0+ (chaotique)",
      usage: "0.2 pour code/maths • 0.7 pour écriture • 0.9 pour brainstorming",
      analogy: "Comme la température de cuisson\u00A0: trop froid = plat fade, trop chaud = brûlé\u00A0!",
      icon: <Thermometer className="h-5 w-5 text-red-500" />,
      interactive: true
    },
    {
      param: "Top-p (Nucleus Sampling)",
      description: "Ne garde que les mots les plus probables dont la probabilité cumulée atteint le seuil p",
      range: "0.1 (très restrictif) → 1.0 (tout autorisé)",
      usage: "0.7-0.9 pour la plupart des cas • 0.5 pour plus de cohérence",
      analogy: "Comme un filtre à café\u00A0: ne laisse passer que les 'meilleurs grains' de mots",
      icon: <Filter className="h-5 w-5 text-blue-500" />,
      interactive: true
    },
    {
      param: "Top-k",
      description: "Limite le choix aux K mots les plus probables",
      range: "1 (très strict) → 100+ (plus ouvert)",
      usage: "40-100 pour la plupart des cas • 20 pour plus de cohérence",
      analogy: "Comme un menu de restaurant\u00A0: proposer 5 plats vs 50 plats. Moins de choix = décision plus rapide\u00A0!",
      icon: <FileText className="h-5 w-5 text-green-500" />,
      interactive: true
    },
    {
      param: "Repetition Penalty",
      description: "Pénalise les mots déjà utilisés pour éviter les répétitions",
      range: "1.0 (pas de pénalité) → 1.5 (forte pénalité)",
      usage: "1.0-1.1 généralement • 1.2+ si problème de boucles",
      analogy: "Comme éviter de raconter la même blague deux fois dans une soirée\u00A0!",
      icon: <Repeat className="h-5 w-5 text-purple-500" />,
      interactive: false
    },
    {
      param: "Max New Tokens",
      description: "Nombre maximum de tokens (fragments de mots) que le modèle peut générer",
      range: "10 (réponse courte) → jusqu'à 128 000 sur certains modèles",
      usage: "100-500 pour chat • 1000+ pour articles • 50 pour titres",
      analogy: "Comme donner un temps limite à un orateur\u00A0: il faut qu'il soit concis\u00A0!",
      icon: <FileText className="h-5 w-5 text-orange-500" />,
      interactive: false
    }
  ];

  const useCases = [
    {
      title: "💻 Développement & Code",
      temp: "0.1-0.3",
      topP: "0.3-0.5", 
      topK: "10-20",
      why: "Précision maximale nécessaire, pas de place pour la créativité dans la syntaxe",
      example: "Générer du code Python, corriger des bugs, documentation technique",
      icon: <Code className="h-5 w-5 text-blue-600" />
    },
    {
      title: "📝 Rédaction & Contenu",
      temp: "0.6-0.8",
      topP: "0.8-0.9",
      topK: "40-60", 
      why: "Équilibre entre cohérence et originalité pour un contenu engageant",
      example: "Articles de blog, newsletters, descriptions produits",
      icon: <FileText className="h-5 w-5 text-green-700 dark:text-green-400" />
    },
    {
      title: "🎨 Créativité & Brainstorming",
      temp: "0.8-1.2",
      topP: "0.9-0.95",
      topK: "80-100",
      why: "Maximum de diversité et d'originalité pour sortir des sentiers battus",
      example: "Idées marketing, histoires créatives, concepts innovants",
      icon: <Palette className="h-5 w-5 text-purple-600" />
    }
  ];

  return (
    <LessonSection
      title="III. Hyperparamètres d'Inférence (Vos Leviers de Contrôle !)"
      icon={<Settings className="h-6 w-6" />}
      delay={2}
    >
      <div className="space-y-6">
        {/* Introduction avec analogie */}
        <AnalogyBox 
          title="🎛️ Les paramètres d'inférence, c'est comme..."
          content="Les boutons de réglage de votre chaîne hi-fi ! Contrairement à l'architecture (la qualité des enceintes) ou l'entraînement (la qualité de l'enregistrement), les paramètres d'inférence sont VOS réglages : graves, aigus, volume... Vous pouvez les changer à chaque utilisation pour adapter le son à votre humeur !"
          variant="tip"
        />

        <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <Settings className="h-6 w-6 text-green-700 dark:text-green-400 mt-1 shrink-0" />
            <div>
              <p className="text-lg leading-relaxed text-green-800 dark:text-green-200">
                Contrairement aux paramètres précédents, ceux-ci se règlent à chaque requête, <strong>quand l'API du modèle le permet</strong> : certains fournisseurs limitent ou imposent ces réglages sur leurs modèles récents, et les interfaces grand public ne les exposent pas. 
                Vous pouvez les ajuster à chaque requête pour obtenir exactement le style de réponse souhaité.
              </p>
              <p className="text-green-700 dark:text-green-300 mt-2 text-sm">
                💡 <strong>Astuce :</strong> Comprendre ces paramètres aide à adapter le comportement d'un modèle à votre besoin, sans changer ses capacités de fond.
              </p>
            </div>
          </div>
        </div>

        {/* Section interactive */}
        <Card className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Play className="h-5 w-5" />
              🎮 Explorez les plages de réglage (les curseurs ne génèrent aucun texte)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Temperature Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Température : {temperature[0]}</label>
                <Badge className="bg-red-100 text-red-800 border-red-300 dark:text-red-200 dark:bg-red-900/40 dark:border-red-700">
                  {getTemperatureDescription(temperature[0])}
                </Badge>
              </div>
              <Slider
                aria-label="Température"
                value={temperature}
                onValueChange={setTemperature}
                max={1.5}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Top-p Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Top-p: {topP[0]}</label>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300 dark:text-blue-200 dark:bg-blue-900/40 dark:border-blue-700">
                  Garde les mots les plus probables jusqu'à {Math.round(topP[0] * 100)} % de probabilité cumulée
                </Badge>
              </div>
              <Slider
                aria-label="Top-p"
                value={topP}
                onValueChange={setTopP}
                max={1}
                min={0.1}
                step={0.05}
                className="w-full"
              />
            </div>

            {/* Top-k Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Top-k: {topK[0]}</label>
                <Badge className="bg-green-100 text-green-800 border-green-300 dark:text-green-200 dark:bg-green-900/40 dark:border-green-700">
                  Choix parmi les {topK[0]} mots les plus probables
                </Badge>
              </div>
              <Slider
                aria-label="Top-k"
                value={topK}
                onValueChange={setTopK}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg">
              <h5 className="font-medium mb-2">🎯 Configuration actuelle recommandée pour :</h5>
              <p className="text-sm">
                {temperature[0] <= 0.3 && "💻 Développement, code, calculs précis"}
                {temperature[0] > 0.3 && temperature[0] <= 0.7 && "📊 Usage général, Q&A, assistance"}
                {temperature[0] > 0.7 && "🎨 Créativité, brainstorming, écriture originale"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Détail des paramètres */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Les paramètres d'inférence, un par un
          </h4>
          
          {inferenceParams.map((param, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  {param.icon}
                  <TechnicalTooltip 
                    term={param.param}
                    definition={param.description}
                  >
                    {param.param}
                  </TechnicalTooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{param.description}</p>
                  
                  {/* Analogie */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">💡 Analogie :</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{param.analogy}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Badge variant="outline" className="text-xs mb-2">
                        Plage de valeurs
                      </Badge>
                      <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        {param.range}
                      </p>
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs mb-2">
                        Usage recommandé
                      </Badge>
                      <p className="text-sm">{param.usage}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guide pratique par cas d'usage */}
        <div>
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            🎯 Plages de départ indicatives selon l'usage
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    {useCase.icon}
                    {useCase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-red-50 dark:bg-red-950/30 rounded">
                      <p className="font-medium text-red-700 dark:text-red-300">Temp</p>
                      <p className="font-mono">{useCase.temp}</p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
                      <p className="font-medium text-blue-700 dark:text-blue-300">Top-p</p>
                      <p className="font-mono">{useCase.topP}</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-950/30 rounded">
                      <p className="font-medium text-green-700 dark:text-green-300">Top-k</p>
                      <p className="font-mono">{useCase.topK}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">🤔 Pourquoi ces valeurs ?</p>
                    <p className="text-sm text-muted-foreground">{useCase.why}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">💼 Exemples concrets :</p>
                    <p className="text-sm text-muted-foreground">{useCase.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Conseils pratiques */}
        <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 p-6 rounded-lg">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            💡 Conseils de pro pour optimiser vos résultats
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">✅ Bonnes pratiques :</h5>
              <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                <li>• Commencez avec des valeurs moyennes puis ajustez</li>
                <li>• Testez sur VOS données avant de déployer</li>
                <li>• Documentez les configs qui marchent bien</li>
                <li>• Adaptez selon le contexte (formel vs créatif)</li>
                <li>• Surveillez la cohérence sur de longs textes</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">🚫 Pièges à éviter :</h5>
              <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                <li>• Temperature trop haute = incohérence</li>
                <li>• Top-k trop bas = répétitions</li>
                <li>• Oublier max_tokens = réponses coupées</li>
                <li>• Même config pour tous les cas d'usage</li>
                <li>• Ne pas tester les cas limites</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LessonSection>
  );
};

export default InferenceParametersSection;
