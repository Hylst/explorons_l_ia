// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Code, 
  BarChart3, 
  FileText, 
  Lightbulb,
  Target,
  Zap,
  Rocket
} from 'lucide-react';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';
import StatsGrid from '@/components/courses/StatsGrid';

const PracticalApplicationsSection = () => {
  const practicalStats = [
    { value: "Court", description: "commencez par 3 à 5 étapes, ajoutez-en si nécessaire" },
    { value: "Validé", description: "relisez le résultat de chaque étape avant de passer à la suivante" },
    { value: "Explicite", description: "reprenez dans chaque prompt les informations utiles des étapes précédentes" },
    { value: "Comparé", description: "mesurez le gain face à un prompt unique, sur vos propres cas" }
  ];

  return (
    <LessonSection
      title="Applications pratiques et cas d'usage métier"
      icon={<Users className="h-6 w-6" />}
      delay={4}
    >
      <div className="space-y-6">
        <div className="bg-linear-to-r from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Domaines d'application privilégiés
          </h4>
          <p className="text-green-700 dark:text-green-300">
            Le chain of prompts convient aux tâches qui se décomposent en étapes : 
            développement, analyse, création de contenu, résolution de problèmes complexes.
          </p>
        </div>

        <StatsGrid stats={practicalStats} columns={4} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analyse stratégique
            </h4>
            <CodeExample
              title="Enchaînement d'analyse stratégique"
              language="Prompts"
              code={`# Étape 1: Analyse préliminaire
"Analyse SWOT de [entreprise] dans le secteur [X].
Mets l'accent sur les 3 forces et faiblesses principales en indiquant l'origine de chaque donnée et en signalant celles que tu ne peux pas sourcer."

# Étape 2: Approfondissement ciblé
"Pour la faiblesse #2 identifiée (exemple : parts de marché),
propose un plan d'amélioration en 5 étapes avec calendrier et budget."

# Étape 3: Évaluation financière
"Estime l'impact sur le retour sur investissement de l'étape #3 du plan précédent.
Hypothèses : budget [montant], équipe [nombre] personnes, horizon [mois] mois."

# Étape 4: Dossier d'investissement
"Rédige le dossier d'investissement pour le comité de direction à partir de l'analyse précédente.
Format : problème, solution, retour sur investissement, risques. Maximum 2 pages."

# Étape 5: Plan d'action
"Transforme le dossier d'investissement en feuille de route opérationnelle
avec jalons trimestriels et indicateurs de suivi."`}
              explanation="Exemple de progression de l'analyse vers un plan d'action. Les chiffres produits par un modèle sont à vérifier avant tout usage."
            />
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <Code className="h-5 w-5" />
              Développement assisté par IA
            </h4>
            <CodeExample
              title="Enchaînement de développement"
              language="Prompts"
              code={`# Étape 1: Architecture et planification
"Conçois l'architecture d'une API REST pour [fonctionnalité]. 
Stack : Node.js + Express + PostgreSQL. Organisation : Clean Architecture."

# Étape 2: Implémentation des modèles
"Implémente les modèles de données basés sur l'architecture précédente. 
Inclus les validations Joi et relations Sequelize."

# Étape 3: Contrôleurs et routes
"Crée les contrôleurs et routes pour l'API. 
Gestion d'erreurs avec middleware personnalisé et journalisation Winston."

# Étape 4: Tests unitaires et d'intégration
"Génère une suite de tests Jest pour les cas principaux.
Inclus des doubles de test pour la base de données et les services externes."

# Étape 5: Documentation et déploiement
"Rédige la documentation Swagger et le script de déploiement Docker.
Inclus les variables d'environnement et les contrôles de santé."`}
              explanation="Exemple d'enchaînement du design au déploiement. Le code produit par un modèle doit être relu, testé et audité (sécurité, dépendances, secrets) avant toute mise en production."
            />
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-orange-700 dark:text-orange-400 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Création de contenu stratégique
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
              <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Phase recherche</h5>
              <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                <li>• Analyse de la cible</li>
                <li>• Recherche concurrentielle</li>
                <li>• Identification des points de douleur</li>
                <li>• Définition des objectifs</li>
              </ul>
            </Card>
            
            <Card className="p-4 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Phase création</h5>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Structure du contenu</li>
                <li>• Rédaction par sections</li>
                <li>• Optimisation SEO</li>
                <li>• Intégration des appels à l'action</li>
              </ul>
            </Card>
            
            <Card className="p-4 bg-linear-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border-green-200 dark:border-green-800">
              <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Phase optimisation</h5>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Comparaison de variantes de titres</li>
                <li>• Adaptation aux formats</li>
                <li>• Personnalisation par canal</li>
                <li>• Mesure de performance</li>
              </ul>
            </Card>
          </div>
        </div>

        <div className="bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-800 p-6 rounded-lg">
          <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-4 flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Modèle en 5 phases (exemple à adapter)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
            {[
              { 
                step: "1", 
                title: "CONTEXTE", 
                desc: "Objectif, contraintes, critères de succès",
                color: "bg-blue-600"
              },
              { 
                step: "2", 
                title: "EXPLORATION", 
                desc: "Collecte d'infos, analyse préliminaire",
                color: "bg-green-700"
              },
              { 
                step: "3", 
                title: "ANALYSE", 
                desc: "Traitement, structuration, enseignements",
                color: "bg-yellow-700"
              },
              { 
                step: "4", 
                title: "SYNTHÈSE", 
                desc: "Recommandations, plan d'action",
                color: "bg-orange-700"
              },
              { 
                step: "5", 
                title: "VALIDATION", 
                desc: "Tests, métriques, optimisation",
                color: "bg-purple-600"
              }
            ].map((item, index) => (
              <Card key={index} className="p-4 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xs">
                <div className={`text-lg font-bold ${item.color} text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2`}>
                  {item.step}
                </div>
                <div className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-1">{item.title}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</div>
              </Card>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-xs text-indigo-700 dark:text-indigo-300">
              <strong>Astuce :</strong> chaque phase peut contenir 2 ou 3 prompts selon la complexité.
              Validez systématiquement avant de passer à la phase suivante.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-red-600 dark:text-red-400 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Modèles avancés d'enchaînement
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-all duration-300">
              <Badge variant="outline" className="mb-2">Modèle convergent</Badge>
              <h5 className="font-medium mb-2">Exploration parallèle → Synthèse</h5>
              <p className="text-sm text-muted-foreground">
                Explorez trois ou quatre approches différentes en parallèle, puis convergez vers la meilleure solution hybride.
              </p>
            </Card>
            
            <Card className="p-4 hover:shadow-md transition-all duration-300">
              <Badge variant="outline" className="mb-2">Modèle itératif</Badge>
              <h5 className="font-medium mb-2">Boucle d'amélioration continue</h5>
              <p className="text-sm text-muted-foreground">
                Cycle répétitif : générer → évaluer → affiner jusqu'à atteindre le niveau de qualité souhaité.
              </p>
            </Card>
            
            <Card className="p-4 hover:shadow-md transition-all duration-300">
              <Badge variant="outline" className="mb-2">Modèle hiérarchique</Badge>
              <h5 className="font-medium mb-2">Construction par couches</h5>
              <p className="text-sm text-muted-foreground">
                Approche ascendante ou descendante : fondations → structure → détails → finitions.
              </p>
            </Card>
          </div>
        </div>

        <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-lg">
          <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Évaluer une chaîne de prompts
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Cohérence</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300">chaque étape reprend bien le résultat précédent</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Exactitude</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300">les faits et les calculs sont vérifiés</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Coût et délai</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300">nombre d'appels, tokens consommés, temps total</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Comparaison</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300">résultat confronté à un prompt unique sur les mêmes cas</div>
            </div>
          </div>
        </div>
      </div>
    </LessonSection>
  );
};

export default PracticalApplicationsSection;
