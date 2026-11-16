// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import LessonSection from '@/components/courses/LessonSection';
import AnalogyBox from '@/components/courses/AnalogyBox';
import QuickFactBox from '@/components/courses/QuickFactBox';
import { Users, TrendingUp, Layers } from 'lucide-react';

const TypesSection: React.FC = () => {
  return (
    <LessonSection
      title="Les Deux Familles de l'Apprentissage Supervisé"
      icon={<Layers className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <div>
          <p className="text-lg leading-relaxed">
            L'apprentissage supervisé se divise en deux grandes familles selon le type de prédiction 
            que nous voulons faire. Chacune répond à des questions différentes et utilise des 
            techniques spécifiques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Classification */}
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Classification</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                🎯 <strong>Objectif :</strong> Prédire une catégorie, une classe, une étiquette
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Exemples concrets :</h4>
                <div className="grid gap-2 text-sm">
                  <div className="bg-white dark:bg-blue-900/50 p-3 rounded border">
                    <strong>Email :</strong> Spam ou Non-spam ?
                  </div>
                  <div className="bg-white dark:bg-blue-900/50 p-3 rounded border">
                    <strong>Médical :</strong> Tumeur bénigne ou maligne ?
                  </div>
                  <div className="bg-white dark:bg-blue-900/50 p-3 rounded border">
                    <strong>Image :</strong> Chat, Chien, ou Oiseau ?
                  </div>
                  <div className="bg-white dark:bg-blue-900/50 p-3 rounded border">
                    <strong>Sentiment :</strong> Positif, Négatif, ou Neutre ?
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Types de classification :</h4>
                <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• <strong>Binaire :</strong> 2 classes (oui/non, spam/normal)</li>
                  <li>• <strong>Multi-classe :</strong> 3+ classes exclusives (chat/chien/oiseau)</li>
                  <li>• <strong>Multi-étiquettes :</strong> Plusieurs classes possibles simultanément</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Régression */}
          <div className="bg-green-50 dark:bg-green-950/30 p-4 sm:p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-green-700 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">Régression</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-green-700 dark:text-green-300 font-medium">
                📈 <strong>Objectif :</strong> Prédire une valeur numérique continue
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-green-800 dark:text-green-200">Exemples concrets :</h4>
                <div className="grid gap-2 text-sm">
                  <div className="bg-white dark:bg-green-900/50 p-3 rounded border">
                    <strong>Immobilier :</strong> Prix d'une maison (250 000 €)
                  </div>
                  <div className="bg-white dark:bg-green-900/50 p-3 rounded border">
                    <strong>Météo :</strong> Température demain (23,5 °C)
                  </div>
                  <div className="bg-white dark:bg-green-900/50 p-3 rounded border">
                    <strong>Finance :</strong> Cours d'une action (142,67 €)
                  </div>
                  <div className="bg-white dark:bg-green-900/50 p-3 rounded border">
                    <strong>Marketing :</strong> Nombre de ventes (1 247 unités)
                  </div>
                </div>
              </div>

              <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Types de régression :</h4>
                <ul className="text-sm space-y-1 text-green-800 dark:text-green-300">
                  <li>• <strong>Simple :</strong> une seule variable explicative</li>
                  <li>• <strong>Multiple :</strong> plusieurs variables explicatives</li>
                  <li>• <strong>Linéaire ou non linéaire :</strong> forme de la relation (droite, courbe, polynôme)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <AnalogyBox
          title="Analogie : Deviner vs Mesurer"
          content="La classification, c'est comme deviner dans quelle boîte ranger un objet (rouge, bleu, ou vert). La régression, c'est comme mesurer précisément le poids de l'objet (2,34 kg). Dans les deux cas, on fait une prédiction, mais d'un type différent."
          variant="tip"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickFactBox
            title="Métrique de Classification"
            description="L'exactitude mesure la part de bonnes prédictions. Sur des classes déséquilibrées, complétez-la par la précision, le rappel et le F1. Exemple : un filtre anti-spam peut afficher une exactitude élevée tout en laissant passer du spam."
            icon="🎯"
          />
          <QuickFactBox
            title="Métrique de Régression"
            description="La MAE ou la RMSE mesure l'écart moyen entre prédiction et réalité. Exemple : une MAE exprimée en euros, à comparer à l'échelle des prix."
            icon="📏"
          />
          <QuickFactBox
            title="Astuce Pratique"
            description="Posez-vous la question : 'Qu'est-ce que je veux prédire ?' Si c'est une catégorie → Classification. Si c'est un nombre → Régression."
            icon="💡"
          />
        </div>
      </div>
    </LessonSection>
  );
};

export default TypesSection;
