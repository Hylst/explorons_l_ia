// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2,
  Lightbulb,
  Users,
  Target
} from 'lucide-react';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';

const IntroductionSection = () => {
  const exampleConversation = `Prompt 1 :
"Peux-tu me proposer 3 idées de recettes végétariennes ?"
→ L'IA liste 3 recettes.

Prompt 2 (enchaînement) :
"Pour la recette #2, peux-tu la décliner en version vegan ?"
→ L'IA adapte la recette choisie.

Prompt 3 :
"Ajoute une suggestion de vin pour accompagner cette recette vegan."
→ L'IA complète avec une proposition.

Résultat attendu : une recette adaptée, à relire et à vérifier (ingrédients, allergènes, accord).`;

  const advantagesData = [
    {
      advantage: "Gestion de la complexité",
      explanation: "Décompose un problème ambitieux en micro-tâches réalisables par l'IA."
    },
    {
      advantage: "Précision accrue", 
      explanation: "Chaque réponse affine le contexte pour l'étape suivante."
    },
    {
      advantage: "Correction d'erreurs",
      explanation: "Permet de rectifier le cap si l'IA dévie (\"Non, je voulais dire...\")."
    },
    {
      advantage: "Personnalisation",
      explanation: "Approfondit progressivement un sujet selon les besoins."
    }
  ];

  return (
    <LessonSection
      title="Introduction au chain of prompts"
      icon={<MessageSquare className="h-6 w-6" />}
      delay={0}
    >
      <div className="space-y-6">
        {/* Définition principale */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
          <p className="text-lg leading-relaxed text-blue-800 dark:text-blue-200">
            Le <strong>"chain of prompts"</strong> (chaîne de requêtes ou enchaînement d'invites) désigne une technique de communication avec une IA où l'utilisateur construit une conversation complexe en enchaînant plusieurs requêtes successives, chaque nouvelle requête s'appuyant sur la réponse précédente de l'IA.
          </p>
          <p className="mt-4 text-blue-700 dark:text-blue-300">
            C'est une méthode utile pour aborder des problèmes complexes, car elle permet de décomposer une tâche globale en étapes simples que l'IA peut traiter séquentiellement.
          </p>
        </div>

        {/* Comment ça fonctionne */}
        <div>
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Comment ça fonctionne ?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                step: "1",
                title: "Requête initiale",
                description: "L'utilisateur pose une première question ou donne une première instruction.",
                color: "bg-blue-600"
              },
              {
                step: "2", 
                title: "Réponse de l'IA",
                description: "L'IA fournit un résultat basé sur cette première requête.",
                color: "bg-green-700"
              },
              {
                step: "3",
                title: "Requête de suivi", 
                description: "L'utilisateur formule une nouvelle requête en repartant de la réponse de l'IA.",
                color: "bg-orange-700"
              },
              {
                step: "4",
                title: "Itération",
                description: "Le processus se répète jusqu'à l'obtention du résultat final.",
                color: "bg-purple-600"
              }
            ].map((item, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className={`${item.color} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0`}>
                    {item.step}
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">{item.title}</h5>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Exemple concret */}
        <div>
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Exemple concret
          </h4>
          <CodeExample
            title="Conversation en chaîne : De l'idée à la réalisation"
            language="Conversation"
            code={exampleConversation}
            explanation="Chaque prompt s'appuie sur la réponse précédente pour construire progressivement une solution complète et personnalisée."
          />
        </div>

        {/* Pourquoi utiliser cette méthode */}
        <div>
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Pourquoi utiliser cette méthode ?
          </h4>
          <div className="space-y-3">
            {advantagesData.map((item, index) => (
              <Card key={index} className="p-4 bg-linear-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10 border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">{item.advantage}</h5>
                    <p className="text-sm text-green-700 dark:text-green-300">{item.explanation}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bonnes pratiques - aperçu */}
        <div className="bg-linear-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-6 rounded-lg">
          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Aperçu des bonnes pratiques
          </h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
            <li>• <strong>Contextualiser :</strong> Rappelez brièvement l'historique si nécessaire</li>
            <li>• <strong>Être spécifique :</strong> Plus votre requête est précise, plus la réponse a de chances d'être utile</li>
            <li>• <strong>Valider à chaque étape :</strong> Vérifiez que l'IA a bien compris avant de continuer</li>
            <li>• <strong>Itérer :</strong> Construisez sur les réponses précédentes</li>
          </ul>
          <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
            📚 Nous explorerons ces pratiques en détail dans les sections suivantes.
          </p>
        </div>
      </div>
    </LessonSection>
  );
};

export default IntroductionSection;
