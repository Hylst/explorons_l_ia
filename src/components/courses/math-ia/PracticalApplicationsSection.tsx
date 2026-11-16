// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Camera, MessageSquare, Car, Stethoscope, TrendingUp } from 'lucide-react';
import ConceptIllustration from './ConceptIllustration';
import DidYouKnow from '../DidYouKnow';

const PracticalApplicationsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-l-4 border-l-emerald-500 bg-linear-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Brain className="h-5 w-5 text-emerald-500" />
            Applications Concrètes : Les Maths au Service de l'IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-4 text-foreground">
            Maintenant que vous avez vu les concepts mathématiques fondamentaux, voyons comment 
            ils se combinent dans des applications d'IA que l'on rencontre au quotidien.
          </p>
          
          <div className="bg-emerald-100/50 dark:bg-emerald-900/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">🎯 L'Union fait la Force</h4>
            <p className="text-emerald-700 dark:text-emerald-300">
              Chaque application d'IA combine plusieurs domaines mathématiques. Par exemple, un système 
              de reconnaissance vocale utilise l'algèbre linéaire pour traiter le signal, les probabilités 
              pour gérer l'incertitude, et l'optimisation pour améliorer ses performances !
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Applications par domaine */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptIllustration
          icon={Camera}
          title="Vision par Ordinateur"
          description="Comment l'IA 'voit' et comprend les images"
          examples={[
            { label: "Matrice d'image", value: "RGB [255,128,0]", description: "Pixels → Vecteurs" },
            { label: "Convolution", value: "f * g", description: "Détection de motifs" },
            { label: "Softmax", value: "P(chat) = 0.85", description: "Classification probabiliste" }
          ]}
          bgColor="bg-linear-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20"
        />

        <ConceptIllustration
          icon={MessageSquare}
          title="Traitement du Langage"
          description="L'IA qui comprend et génère du texte"
          examples={[
            { label: "Word2Vec", value: "chat → [0.2, 0.8, ...]", description: "Mots → Vecteurs" },
            { label: "Attention", value: "A = softmax(QK^T/√d)", description: "Relations contextuelles" },
            { label: "Backprop", value: "∂L/∂θ", description: "Apprentissage par gradient" }
          ]}
          bgColor="bg-linear-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20"
        />

        <ConceptIllustration
          icon={Car}
          title="Véhicules Autonomes"
          description="L'IA qui prend des décisions de conduite"
          examples={[
            { label: "Capteurs", value: "LIDAR → nuage 3D", description: "Données spatiales" },
            { label: "Filtre de Kalman", value: "x = Ax + Bu", description: "Estimation d'état" },
            { label: "Q-Learning", value: "Q(s,a)", description: "Politique de décision apprise par essais et récompenses (piste étudiée en recherche)" }
          ]}
          bgColor="bg-linear-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20"
        />

        <ConceptIllustration
          icon={Stethoscope}
          title="IA Médicale"
          description="Diagnostic et analyse médicale assistés"
          examples={[
            { label: "Imagerie", value: "CNN + transfert", description: "Détection anomalies" },
            { label: "Bayésien", value: "P(maladie|symptômes)", description: "Diagnostic probabiliste" },
            { label: "Régression", value: "y = βx + ε", description: "Prédiction pronostic" }
          ]}
          bgColor="bg-linear-to-br from-red-50/50 to-rose-50/50 dark:from-red-950/20 dark:to-rose-950/20"
        />

        <ConceptIllustration
          icon={TrendingUp}
          title="Finance Algorithmique"
          description="Trading et analyse financière automatisés"
          examples={[
            { label: "Série temporelle", value: "LSTM/GRU", description: "Modélisation de séries temporelles (la prévision des prix reste très incertaine)" },
            { label: "Portefeuille", value: "min σ², max μ", description: "Optimisation risque/rendement" },
            { label: "Monte Carlo", value: "E[X] ≈ Σxi/n", description: "Simulation scénarios" }
          ]}
          bgColor="bg-linear-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20"
        />

        <ConceptIllustration
          icon={Brain}
          title="IA Générative"
          description="Création de contenu par l'IA"
          examples={[
            { label: "VAE", value: "KL(q||p)", description: "Espace latent" },
            { label: "GAN", value: "min max V(D,G)", description: "Jeu antagoniste" },
            { label: "Diffusion", value: "∇log p(x)", description: "Génération par bruit" }
          ]}
          bgColor="bg-linear-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20"
        />
      </div>

      {/* Cas d'étude détaillé */}
      <Card className="bg-linear-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
            🔬 Cas d'Étude : les modèles de langage de type GPT et les Mathématiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-foreground">
            Analysons comment un modèle de langage de type GPT utilise les domaines mathématiques du cours :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50">
                <h5 className="font-semibold text-foreground mb-2">🔢 Algèbre Linéaire</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Embeddings :</strong> Chaque token (mot ou morceau de mot) → un vecteur de plusieurs milliers de dimensions (12 288 pour GPT-3, valeur publiée)</li>
                  <li>• <strong>Attention :</strong> Matrices Q, K, V pour relations contextuelles</li>
                  <li>• <strong>Transformations :</strong> Couches linéaires W × x + b</li>
                </ul>
              </div>
              
              <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50">
                <h5 className="font-semibold text-foreground mb-2">📊 Probabilités</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Prédiction :</strong> P(mot suivant | contexte)</li>
                  <li>• <strong>Sampling :</strong> Température et top-k pour la créativité</li>
                  <li>• <strong>Softmax :</strong> Conversion scores → probabilités</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50">
                <h5 className="font-semibold text-foreground mb-2">📈 Calcul Différentiel</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Rétropropagation :</strong> ∂L/∂θ pour des milliards de paramètres (175 milliards pour GPT-3)</li>
                  <li>• <strong>Adam :</strong> Optimiseur adaptatif avec momentum</li>
                  <li>• <strong>Gradient clipping :</strong> Stabilisation de l'apprentissage</li>
                </ul>
              </div>
              
              <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50">
                <h5 className="font-semibold text-foreground mb-2">📋 Statistiques</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Layer Norm :</strong> Normalisation pour stabilité</li>
                  <li>• <strong>Dropout :</strong> Régularisation stochastique</li>
                  <li>• <strong>Perplexité :</strong> Métrique de qualité du modèle</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
              💡 Résultat : ces outils mathématiques permettent à un modèle de langage de produire
              un texte très fluide ; la fluidité ne garantit ni la compréhension ni l'exactitude des informations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Impact sociétal */}
      <Card className="bg-linear-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-lg text-green-800 dark:text-green-200">
            🌍 Impact Sociétal des Mathématiques en IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <h5 className="font-semibold text-foreground mb-2">🏥 Santé</h5>
              <p className="text-sm text-muted-foreground mb-2">
                Diagnostic précoce du cancer, découverte de médicaments, personnalisation des traitements
              </p>
              <Badge variant="outline" className="text-xs">Aide au diagnostic</Badge>
            </div>
            
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <h5 className="font-semibold text-foreground mb-2">🌱 Environnement</h5>
              <p className="text-sm text-muted-foreground mb-2">
                Optimisation énergétique, prédiction climatique, gestion des ressources
              </p>
              <Badge variant="outline" className="text-xs">Peut réduire certaines consommations</Badge>
            </div>
            
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <h5 className="font-semibold text-foreground mb-2">🎓 Éducation</h5>
              <p className="text-sm text-muted-foreground mb-2">
                Personnalisation de l'apprentissage, assistants pédagogiques, accessibilité
              </p>
              <Badge variant="outline" className="text-xs">Peut faciliter l'accès à l'apprentissage</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Le saviez-vous */}
      <DidYouKnow
        items={[
          {
            title: "AlphaFold et les protéines",
            content: "AlphaFold2 est un réseau de neurones qui prédit la structure 3D d'une protéine à partir de sa séquence d'acides aminés (donc beaucoup d'algèbre linéaire). Demis Hassabis et John Jumper ont reçu pour ce travail la moitié du prix Nobel de chimie 2024, l'autre moitié revenant à David Baker pour la conception de protéines"
          },
          {
            title: "La génération d'images et les espaces latents",
            content: "Les générateurs d'images à base de diffusion partent d'un bruit aléatoire et le transforment pas à pas en image, en travaillant souvent dans un espace latent de dimension réduite\u00A0: c'est de l'algèbre linéaire appliquée à grande échelle"
          },
          {
            title: "Les modèles de langage et le calcul",
            content: "Générer chaque mot demande de multiplier des vecteurs par des matrices de plusieurs milliards de paramètres\u00A0: c'est pourquoi on utilise des processeurs graphiques et des puces spécialisées"
          }
        ]}
      />

      {/* Perspectives d'avenir */}
      <Card className="bg-linear-to-r from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20 border-violet-200 dark:border-violet-800">
        <CardHeader>
          <CardTitle className="text-lg text-violet-800 dark:text-violet-200">
            🚀 L'Avenir : Nouvelles Frontières Mathématiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-foreground">
              Les mathématiques continuent d'évoluer pour répondre aux défis de l'IA de demain :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-semibold text-foreground">🔬 Recherches Actuelles</h5>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• <strong>Informatique quantique :</strong> Pistes de recherche pour accélérer certains calculs ; l'avantage pour l'IA reste à démontrer</li>
                  <li>• <strong>Apprentissage fédéré :</strong> Entraîner un modèle sans centraliser les données brutes, ce qui réduit leur exposition</li>
                  <li>• <strong>IA neuromorphique :</strong> Circuits inspirés du cerveau humain</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-foreground">🎯 Défis Mathématiques</h5>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• <strong>Interprétabilité :</strong> Comprendre les "boîtes noires"</li>
                  <li>• <strong>Efficacité énergétique :</strong> IA verte et durable</li>
                  <li>• <strong>AGI :</strong> Intelligence artificielle générale</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticalApplicationsSection;
