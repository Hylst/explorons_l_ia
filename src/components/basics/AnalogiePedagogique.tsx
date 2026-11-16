// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Play, RotateCcw } from 'lucide-react';

const AnalogiePedagogique = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const etapes = [
    {
      titre: "1. Collecte de données",
      description: "L'IA a besoin de grandes quantités de données pour apprendre",
      analogie: "Un enfant voit de nombreuses photos d'animaux avec leurs noms",
      exemple: "Montrer 10 000 images de chats étiquetées « chat »",
      color: "bg-blue-100 dark:bg-blue-950"
    },
    {
      titre: "2. Identification des patterns",
      description: "L'algorithme analyse les données pour identifier des caractéristiques",
      analogie: "L'enfant remarque les caractéristiques communes\u00A0: oreilles pointues, moustaches, queue...",
      exemple: "L'IA identifie les formes, couleurs et textures typiques des chats",
      color: "bg-green-100 dark:bg-green-950"
    },
    {
      titre: "3. Entraînement",
      description: "Le modèle s'entraîne à reconnaître ces patterns",
      analogie: "L'enfant s'exerce à deviner le nom de nouveaux animaux",
      exemple: "L'IA compare ses prédictions aux étiquettes et ajuste ses paramètres pour réduire ses erreurs",
      color: "bg-purple-100 dark:bg-purple-950"
    },
    {
      titre: "4. Validation et amélioration",
      description: "Le modèle est testé et corrigé",
      analogie: "L'enfant reçoit des corrections et s'améliore",
      exemple: "On mesure les erreurs sur des images que le modèle n'a pas vues pendant l'entraînement, puis on règle le modèle ou on le ré-entraîne",
      color: "bg-orange-100 dark:bg-orange-950"
    },
    {
      titre: "5. Déploiement",
      description: "Le modèle peut maintenant faire des prédictions",
      analogie: "L'enfant peut désormais reconnaître de nouveaux animaux, en se trompant parfois",
      exemple: "L'IA peut classer de nouvelles images\u00A0; ses résultats se mesurent sur des données de test",
      color: "bg-pink-100 dark:bg-pink-950"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % etapes.length);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const playDemo = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === etapes.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2">
          Comment l'IA apprend-elle ?
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={playDemo}
              disabled={isPlaying}
            >
              <Play className="h-4 w-4 mr-1" />
              Démo auto
            </Button>
            <Button variant="outline" size="sm" onClick={resetDemo} aria-label="Recommencer la démonstration">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Progress value={(currentStep + 1) * 20} className="mb-4" aria-label="Progression de l'apprentissage" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Étapes techniques */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Processus technique</h3>
              {etapes.map((etape, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    index === currentStep 
                      ? `${etape.color} border-primary shadow-md` 
                      : 'bg-muted/30 border-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{etape.titre.split('. ')[1]}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{etape.description}</p>
                      {index === currentStep && (
                        <div className="bg-background/80 p-2 rounded text-xs">
                          <strong>Exemple :</strong> {etape.exemple}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Analogie humaine */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Analogie avec l'apprentissage humain</h3>
              <Card className="bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">👶</div>
                    <h4 className="font-semibold">Un enfant apprend les animaux</h4>
                  </div>
                  
                  {currentStep < etapes.length && (
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                          Étape {currentStep + 1}
                        </p>
                        <p className="text-sm mt-1">
                          {etapes[currentStep].analogie}
                        </p>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={nextStep}
                          className="gap-2"
                        >
                          Étape suivante <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {currentStep === etapes.length - 1 && (
                    <div className="text-center text-green-700 dark:text-green-400">
                      <p className="text-sm font-medium">🎉 Apprentissage terminé !</p>
                      <p className="text-xs mt-1">L'enfant (et l'IA) peuvent maintenant reconnaître de nouveaux animaux</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalogiePedagogique;
