// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import { Brain, Network, Bot, Database, HelpCircle } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Composant présentant les différents types de Machine Learning
 * @returns {JSX.Element} Le composant TypesOfML
 */
const TypesOfML = () => {
  const tooltips = {
    "few-shot learning": {
      title: "Few-shot learning",
      content: "Capacité d'un modèle à apprendre une nouvelle tâche avec seulement quelques exemples.",
      example: "💡 Comme apprendre à reconnaître une nouvelle race de chien en ne voyant que 3-5 photos."
    },
    "zero-shot learning": {
      title: "Zero-shot learning",
      content: "Capacité d'un modèle à effectuer une tâche sans avoir vu d'exemples spécifiques pendant l'entraînement.",
      example: "💡 Comme demander à un modèle de langage de classer des avis en positifs ou négatifs avec une simple consigne, sans lui montrer le moindre exemple."
    },
    "transfer learning": {
      title: "Transfer learning",
      content: "Technique où un modèle pré-entraîné sur une tâche est adapté pour une nouvelle tâche similaire.",
      example: "💡 Comme utiliser un modèle de reconnaissance d'images générales pour identifier des maladies sur des radiographies."
    },
    "fine-tuning": {
      title: "Fine-tuning",
      content: "Processus d'ajustement d'un modèle pré-entraîné sur des données spécifiques à une nouvelle tâche.",
      example: "💡 Comme prendre un grand modèle de langage généraliste et l'entraîner spécifiquement sur des textes juridiques pour créer un assistant légal."
    },
    "embeddings": {
      title: "Embeddings (Plongements)",
      content: "Représentations vectorielles de mots, phrases ou concepts qui capturent leurs relations sémantiques.",
      example: "💡 Le mot 'chat' et 'félin' auront des vecteurs très proches dans l'espace des embeddings."
    },
    "gpt": {
      title: "GPT (Generative Pre-trained Transformer)",
      content: "Famille de modèles de langage basés sur l'architecture Transformer, entraînés pour prédire le mot suivant.",
      example: "💡 Comme un écrivain expert qui peut continuer n'importe quel texte de manière cohérente."
    },
    "bert": {
      title: "BERT (Bidirectional Encoder Representations from Transformers)",
      content: "Modèle qui lit le texte dans les deux sens pour mieux comprendre le contexte.",
      example: "💡 Contrairement à lire mot par mot, BERT lit toute la phrase d'un coup pour mieux comprendre chaque mot."
    }
  };

  const TooltipTerm: React.FC<{ term: string; children: React.ReactNode }> = ({ term, children }) => {
    const tooltip = tooltips[term as keyof typeof tooltips];
    if (!tooltip) return <>{children}</>;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="relative cursor-help border-b border-dotted border-primary/50 hover:border-primary transition-colors">
              {children}
              <HelpCircle className="inline w-3 h-3 ml-1 text-primary/60 hover:text-primary transition-colors" />
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm p-4 bg-card border shadow-lg">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-primary">{tooltip.title}</h4>
              <p className="text-sm text-muted-foreground">{tooltip.content}</p>
              <div className="mt-2 p-2 bg-secondary/50 rounded text-xs">
                <span className="font-medium">{tooltip.example}</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Animation variants for enhanced interactivity
  const cardVariants = {
    initial: { scale: 1, y: 0, rotateY: 0 },
    hover: { 
      scale: 1.03, 
      y: -8,
      rotateY: 2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0], 
      scale: [1, 1.1, 1.2, 1.1, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const listItemVariants = {
    initial: { x: 0, backgroundColor: "transparent" },
    hover: { 
      x: 8,
      backgroundColor: "rgba(var(--primary), 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section className="py-20 bg-background/50">
      <div className="container px-4 mx-auto max-w-6xl">
        <SectionHeading
          pretitle="Classification"
          title="Types de machine learning"
          description="Le machine learning se divise en plusieurs approches distinctes, chacune adaptée à des cas d'usage et des types de données spécifiques."
          center
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Apprentissage supervisé */}
          <motion.div variants={cardVariants} whileHover="hover" initial="initial">
            <Card className="border-primary/10 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-primary/20 h-full">
              <CardHeader className="pb-3">
                <motion.div 
                  className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
                  variants={iconVariants}
                >
                  <Database size={24} className="text-primary" />
                </motion.div>
                <CardTitle className="text-xl hover:text-primary transition-colors">Apprentissage supervisé</CardTitle>
                <CardDescription>
                  Apprendre à partir d'exemples étiquetés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.p 
                  className="mb-4 hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  L'apprentissage supervisé utilise des données d'entraînement étiquetées pour apprendre à prédire 
                  des résultats ou classifier des données nouvelles. Utilise le{' '}
                  <TooltipTerm term="transfer learning">transfer learning</TooltipTerm>
                  {' '}et le{' '}
                  <TooltipTerm term="fine-tuning">fine-tuning</TooltipTerm>
                  {' '}pour optimiser les performances.
                </motion.p>
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Classification</span> : Attribution d'une catégorie à une donnée
                    </p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Régression</span> : Prédiction d'une valeur continue
                    </p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Modèles populaires</span> : 
                      ResNet, arbres de décision, forêts aléatoires, SVM
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Apprentissage non supervisé */}
          <motion.div variants={cardVariants} whileHover="hover" initial="initial">
            <Card className="border-primary/10 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-primary/20 h-full">
              <CardHeader className="pb-3">
                <motion.div 
                  className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
                  variants={iconVariants}
                >
                  <Network size={24} className="text-primary" />
                </motion.div>
                <CardTitle className="text-xl hover:text-primary transition-colors">Apprentissage non supervisé</CardTitle>
                <CardDescription>
                  Découvrir des structures cachées dans les données
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.p 
                  className="mb-4 hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  L'apprentissage non supervisé identifie des motifs et des relations dans des données 
                  non étiquetées, sans indication préalable sur les résultats attendus. Génère des{' '}
                  <TooltipTerm term="embeddings">embeddings</TooltipTerm>
                  {' '}pour représenter les données. L'apprentissage auto-supervisé, par lequel les modèles de langage
                  sont pré-entraînés (prédire la suite d'un texte), s'en rapproche : les étiquettes sont tirées
                  des données elles-mêmes, sans annotation humaine.
                </motion.p>
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Clustering</span> : Regroupement d'instances similaires
                    </p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Réduction de dimensions</span> : Compression de l'information
                    </p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Algorithmes</span> : K-means, DBSCAN, PCA, autoencodeurs
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Apprentissage semi-supervisé */}
          <motion.div variants={cardVariants} whileHover="hover" initial="initial">
            <Card className="border-primary/10 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-primary/20 h-full">
              <CardHeader className="pb-3">
                <motion.div 
                  className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
                  variants={iconVariants}
                >
                  <Brain size={24} className="text-primary" />
                </motion.div>
                <CardTitle className="text-xl hover:text-primary transition-colors">Apprentissage semi-supervisé</CardTitle>
                <CardDescription>
                  Combiner données étiquetées et non étiquetées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.p 
                  className="mb-4 hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  L'apprentissage semi-supervisé utilise à la fois des données étiquetées et non étiquetées pour 
                  améliorer les performances d'apprentissage, notamment quand l'étiquetage est coûteux. Les méthodes courantes
                  sont l'auto-apprentissage (pseudo-étiquettes) et le co-apprentissage. À ne pas confondre avec le{' '}
                  <TooltipTerm term="few-shot learning">few-shot learning</TooltipTerm>
                  {' '}et le{' '}
                  <TooltipTerm term="zero-shot learning">zero-shot learning</TooltipTerm>, qui concernent le nombre
                  d'exemples d'une nouvelle tâche.
                </motion.p>
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Auto-apprentissage</span> : Utiliser le modèle pour étiqueter de nouvelles données
                    </p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Co-apprentissage</span> : Utiliser plusieurs modèles qui s'enrichissent mutuellement
                    </p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Applications</span> : Reconnaissance d'image, analyse de texte
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Apprentissage par renforcement */}
          <motion.div variants={cardVariants} whileHover="hover" initial="initial">
            <Card className="border-primary/10 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-primary/20 h-full">
              <CardHeader className="pb-3">
                <motion.div 
                  className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
                  variants={iconVariants}
                >
                  <Bot size={24} className="text-primary" />
                </motion.div>
                <CardTitle className="text-xl hover:text-primary transition-colors">Apprentissage par renforcement</CardTitle>
                <CardDescription>
                  Apprendre par essai et récompense
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.p 
                  className="mb-4 hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  L'apprentissage par renforcement entraîne des agents à prendre des décisions optimales 
                  en recevant des récompenses ou pénalités suite à leurs actions. Utilisé pour l'optimisation des{' '}
                  <TooltipTerm term="gpt">modèles GPT</TooltipTerm>
                  {' '}via le RLHF (apprentissage par renforcement à partir de retours humains).
                </motion.p>
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Principes</span> : Agent, environnement, action, récompense
                    </p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Algorithmes</span> : Q-learning, Deep Q-Network (DQN), PPO
                    </p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                    variants={listItemVariants}
                    whileHover="hover"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Applications</span> : Jeux, robotique, véhicules autonomes
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Section conceptuelle avancée */}
        <motion.div 
          className="mt-16 p-8 rounded-2xl bg-linear-to-br from-secondary/20 to-secondary/5 border border-primary/10 hover:border-primary/20 transition-all duration-500"
          whileHover={{ scale: 1.01, y: -4 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-center hover:text-primary transition-colors cursor-help flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                >
                  Concepts avancés et architectures modernes
                  <HelpCircle className="w-5 h-5 text-primary/60" />
                </motion.h3>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Technologies de pointe de l'IA moderne</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/40 border hover:border-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <h4 className="font-semibold mb-2 text-primary">Modèles Transformers</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <TooltipTerm term="gpt">GPT</TooltipTerm>, <TooltipTerm term="bert">BERT</TooltipTerm>, T5, RoBERTa ont transformé le NLP grâce à leur architecture d'attention.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Mécanisme d'attention multi-têtes</div>
                <div>• Parallélisation massive</div>
                <div>• Compréhension contextuelle (bidirectionnelle pour BERT, unidirectionnelle pour GPT)</div>
              </div>
            </motion.div>

            <motion.div 
              className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/40 border hover:border-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <h4 className="font-semibold mb-2 text-primary">RAG et recherche vectorielle</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Retrieval-Augmented Generation combine recherche vectorielle et génération pour fonder les réponses sur des documents, sans éliminer le risque d'erreur.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• <TooltipTerm term="embeddings">Embeddings</TooltipTerm> sémantiques</div>
                <div>• Bases de données vectorielles</div>
                <div>• Reclassement et fusion des résultats</div>
              </div>
            </motion.div>

            <motion.div 
              className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/40 border hover:border-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <h4 className="font-semibold mb-2 text-primary">Apprentissage adaptatif</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <TooltipTerm term="few-shot learning">Few-shot</TooltipTerm>, <TooltipTerm term="zero-shot learning">zero-shot</TooltipTerm> et <TooltipTerm term="transfer learning">transfer learning</TooltipTerm> permettent une adaptation rapide.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Adaptation avec peu d'exemples</div>
                <div>• Généralisation entre domaines</div>
                <div>• <TooltipTerm term="fine-tuning">Fine-tuning</TooltipTerm> efficace</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TypesOfML;
