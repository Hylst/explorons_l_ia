// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Brain, MessageSquare, EyeIcon, Bot, BarChart3, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AINodeGraph from './visualization/AINodeGraph';
import AITypeExplanation from './visualization/AITypeExplanation';
import AICapabilitiesChart from './visualization/AICapabilitiesChart';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Visualisation des différents types d'IA et leurs caractéristiques
 */
const AITypesVisualization: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("LLM");
  
  const tooltips = {
    "modèles de langage": {
      title: "Modèles de langage (LLM)",
      content: "Des IA entraînées sur d'énormes quantités de texte pour comprendre et générer du langage humain.",
      example: "💡 Comme un étudiant qui aurait lu toute la bibliothèque mondiale et peut maintenant écrire sur n'importe quel sujet."
    },
    "réseaux convolutifs": {
      title: "Réseaux de neurones convolutifs (CNN)",
      content: "Spécialisés dans l'analyse d'images, ils 'scannent' les images pour identifier des motifs et objets.",
      example: "💡 Comme avoir des yeux super-développés qui peuvent instantanément reconnaître n'importe quoi dans une image."
    },
    "apprentissage par renforcement": {
      title: "Apprentissage par renforcement",
      content: "L'IA apprend en essayant différentes actions et en recevant des récompenses ou punitions.",
      example: "💡 Comme apprendre à jouer aux échecs en jouant des milliers de parties et en s'améliorant à chaque défaite."
    },
    "IA explicable": {
      title: "IA explicable (XAI)",
      content: "Des techniques pour comprendre et expliquer pourquoi une IA a pris une décision particulière.",
      example: "💡 Comme avoir un détective qui peut expliquer le raisonnement derrière chaque déduction de Sherlock Holmes."
    },
    "transformers": {
      title: "Architecture Transformers",
      content: "Architecture de réseau de neurones permettant de traiter tout le texte en parallèle grâce au mécanisme d'attention.",
      example: "💡 Comme lire une phrase entière d'un coup au lieu de mot par mot, en se concentrant sur les parties importantes."
    },
    "attention": {
      title: "Mécanisme d'attention",
      content: "Permet aux modèles de se concentrer sur les parties les plus importantes de l'information d'entrée.",
      example: "💡 Comme surligner automatiquement les mots-clés dans un texte en comprenant leur importance relative."
    },
    "multimodal": {
      title: "IA multimodale",
      content: "Systèmes capables de traiter simultanément différents types de données (texte, image, audio).",
      example: "💡 Comme un humain qui peut comprendre une blague en regardant une image et en lisant le texte qui l'accompagne."
    },
    "embeddings": {
      title: "Embeddings (Plongements)",
      content: "Représentations vectorielles qui capturent la signification et les relations entre les mots ou concepts.",
      example: "💡 Comme une carte où les mots similaires (chat/félin) sont placés près les uns des autres."
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
      rotate: [0, -8, 8, -4, 4, 0], 
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
      x: 12,
      backgroundColor: "rgba(var(--primary), 0.08)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <div className="w-full mt-8">
      <motion.div 
        className="relative w-full h-[450px] mb-12 border rounded-xl bg-linear-to-b from-secondary/20 to-secondary/5 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-700"
        whileHover={{ scale: 1.008 }}
        variants={pulseVariants}
        initial="initial"
      >
        <AINodeGraph onNodeSelect={setSelectedType} />
        <motion.div 
          className="absolute bottom-3 right-3 max-w-[16rem] text-xs text-muted-foreground bg-background/70 px-3 py-2 rounded-lg hover:bg-background/90 transition-all duration-300 border border-primary/20"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          Cliquez sur un nœud pour voir les détails. Les liens relient des thèmes proches : ils ne représentent pas une dépendance technique.
        </motion.div>
      </motion.div>
      
      <AITypeExplanation selectedType={selectedType} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div variants={cardVariants} whileHover="hover" initial="initial">
          <Card className="h-full hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/30 bg-linear-to-br from-background to-secondary/5">
            <CardContent className="p-6">
              <motion.h3 
                className="heading-sm mb-4 hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Types d'IA et spécificités
              </motion.h3>
              <ul className="space-y-4">
                <motion.li 
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-all duration-300 border border-transparent hover:border-primary/20"
                  variants={listItemVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="p-2 rounded-full bg-primary/10 mt-1 hover:bg-primary/20 transition-colors"
                    variants={iconVariants}
                  >
                    <MessageSquare size={16} className="text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-medium">
                      <TooltipTerm term="modèles de langage">
                        Modèles de Langage (LLM)
                      </TooltipTerm>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Basés sur l'architecture{' '}
                      <TooltipTerm term="transformers">Transformers</TooltipTerm>
                      {' '}avec mécanisme d'
                      <TooltipTerm term="attention">attention</TooltipTerm>
                    </p>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-all duration-300 border border-transparent hover:border-primary/20"
                  variants={listItemVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="p-2 rounded-full bg-primary/10 mt-1 hover:bg-primary/20 transition-colors"
                    variants={iconVariants}
                  >
                    <EyeIcon size={16} className="text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-medium">
                      <TooltipTerm term="réseaux convolutifs">
                        Réseaux convolutifs (CNN)
                      </TooltipTerm>
                    </p>
                    <p className="text-sm text-muted-foreground">Spécialisés dans le traitement d'images et la vision par ordinateur</p>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-all duration-300 border border-transparent hover:border-primary/20"
                  variants={listItemVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="p-2 rounded-full bg-primary/10 mt-1 hover:bg-primary/20 transition-colors"
                    variants={iconVariants}
                  >
                    <Bot size={16} className="text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-medium">
                      <TooltipTerm term="apprentissage par renforcement">
                        Apprentissage par renforcement (RL)
                      </TooltipTerm>
                    </p>
                    <p className="text-sm text-muted-foreground">Apprentissage par interaction avec un environnement</p>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-all duration-300 border border-transparent hover:border-primary/20"
                  variants={listItemVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="p-2 rounded-full bg-primary/10 mt-1 hover:bg-primary/20 transition-colors"
                    variants={iconVariants}
                  >
                    <BarChart3 size={16} className="text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-medium">
                      <TooltipTerm term="IA explicable">
                        IA Explicable (XAI)
                      </TooltipTerm>
                    </p>
                    <p className="text-sm text-muted-foreground">Techniques pour comprendre le fonctionnement des modèles complexes</p>
                  </div>
                </motion.li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-2"
          variants={cardVariants} 
          whileHover="hover" 
          initial="initial"
        >
          <Card className="h-full hover:shadow-2xl transition-all duration-500 border-primary/10 hover:border-primary/30 bg-linear-to-br from-background to-secondary/5">
            <CardContent className="p-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.h3 
                      className="heading-sm mb-4 hover:text-primary transition-colors duration-300 cursor-help flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      Trois façons de classer l'IA
                      <HelpCircle className="w-4 h-4 text-primary/60 hover:text-primary transition-colors" />
                    </motion.h3>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Trois axes de classement distincts : le niveau de capacité (AGI), le domaine ou la tâche, et la famille de techniques (apprentissage automatique). Ils ne s'emboîtent pas les uns dans les autres.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="w-full relative">
                <div className="flex flex-col space-y-6">
                  <motion.div 
                    className="p-4 bg-secondary/10 rounded-lg border border-primary/10 hover:border-primary/20 hover:bg-secondary/20 transition-all duration-300"
                    whileHover={{ scale: 1.01, y: -2 }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h4 className="font-medium cursor-help flex items-center gap-2">
                            Intelligence artificielle générale (AGI)
                            <HelpCircle className="w-3 h-3 text-primary/60" />
                          </h4>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <div className="space-y-2">
                            <p className="font-semibold">AGI : une notion encore hypothétique</p>
                            <p className="text-sm">Une IA qui pourrait faire tout ce qu'un humain peut faire intellectuellement.</p>
                            <div className="p-2 bg-secondary/50 rounded text-xs">
                              💡 Comme avoir un génie universel qui excelle dans tous les domaines
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <motion.p 
                      className="text-sm text-muted-foreground mt-1 hover:text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Systèmes{' '}
                      <TooltipTerm term="multimodal">multimodaux</TooltipTerm>
                      {' '}capables de résoudre des problèmes nouveaux dans de multiples domaines, 
                      avec des capacités comparables à celles d'un humain. Cette notion reste hypothétique : aucun système n'est reconnu comme tel de façon consensuelle.
                    </motion.p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      className="p-4 bg-secondary/5 rounded-lg border border-primary/5 hover:border-primary/15 hover:bg-secondary/15 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -3 }}
                    >
                      <h4 className="font-medium">IA spécialisée par domaine</h4>
                      <motion.p 
                        className="text-sm text-muted-foreground mt-1 hover:text-foreground transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        Systèmes adaptés à un domaine, par exemple avec des{' '}
                        <TooltipTerm term="embeddings">embeddings</TooltipTerm>
                        {' '}propres au domaine, pour des usages comme la médecine, la finance ou le droit.
                      </motion.p>
                    </motion.div>
                    <motion.div 
                      className="p-4 bg-secondary/5 rounded-lg border border-primary/5 hover:border-primary/15 hover:bg-secondary/15 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -3 }}
                    >
                      <h4 className="font-medium">IA spécialisée par tâche</h4>
                      <motion.p 
                        className="text-sm text-muted-foreground mt-1 hover:text-foreground transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        Systèmes conçus pour exceller dans des tâches spécifiques comme la vision par ordinateur, 
                        le traitement du langage ou la planification.
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="p-4 bg-secondary/5 rounded-lg border border-primary/5 hover:border-primary/15 hover:bg-secondary/15 transition-all duration-300"
                    whileHover={{ scale: 1.01, y: -2 }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h4 className="font-medium cursor-help flex items-center gap-2">
                            Apprentissage automatique (Machine Learning)
                            <HelpCircle className="w-3 h-3 text-primary/60" />
                          </h4>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <div className="space-y-2">
                            <p className="font-semibold">Machine Learning</p>
                            <p className="text-sm">Des algorithmes qui apprennent des motifs dans les données pour faire des prédictions.</p>
                            <div className="p-2 bg-secondary/50 rounded text-xs">
                              💡 Comme enseigner à un ordinateur à reconnaître des chats en lui montrant des milliers de photos
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <motion.p 
                      className="text-sm text-muted-foreground mt-1 hover:text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Algorithmes qui apprennent à partir de données et s'améliorent avec l'expérience
                      (apprentissage supervisé, non supervisé, par renforcement).
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.h3 
                className="heading-sm mb-4 cursor-help flex items-center gap-2 hover:text-primary transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                Comparaison des capacités par type d'IA
                <HelpCircle className="w-4 h-4 text-primary/60 hover:text-primary transition-colors" />
              </motion.h3>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <div className="space-y-2">
                <p className="font-semibold">Graphique Radar</p>
                <p className="text-sm">Chaque type d'IA a ses forces et faiblesses selon différents critères.</p>
                <div className="p-2 bg-secondary/50 rounded text-xs">
                  💡 Plus la zone colorée est grande, plus l'IA excelle dans ces domaines
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <motion.p 
          className="text-muted-foreground mb-4 hover:text-foreground transition-colors"
          whileHover={{ x: 4 }}
        >
          Ce graphique radar compare les performances relatives des différents types d'IA sur des dimensions clés comme
          le traitement du langage, la vision, le raisonnement et la capacité d'adaptation.
        </motion.p>
        
        <motion.div
          whileHover={{ scale: 1.01, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-2xl border border-primary/10 hover:border-primary/20 bg-linear-to-br from-background to-secondary/5 p-4 hover:shadow-xl transition-all duration-500"
        >
          <AICapabilitiesChart />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AITypesVisualization;
