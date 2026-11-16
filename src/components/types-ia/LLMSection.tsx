// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { MessageSquare, Cpu, Braces, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import IASection from './IASection';
import { motion } from 'framer-motion';
import { useLoopWhenVisible } from '@/hooks/useLoopWhenVisible';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LLMSection = () => {
  // Les flux du schéma tournent en boucle seulement à l'écran (et sans "réduire les animations").
  const { ref: schemaRef, active: schemaActive } = useLoopWhenVisible<HTMLDivElement>();
  const flowTransition = (delay: number) =>
    schemaActive ? { duration: 2, delay, repeat: Infinity } : { duration: 0 };

  const TooltipTerm: React.FC<{ 
    title: string; 
    content: string; 
    example?: string; 
    children: React.ReactNode 
  }> = ({ title, content, example, children }) => (
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
            <h4 className="font-semibold text-sm text-primary">{title}</h4>
            <p className="text-sm text-muted-foreground">{content}</p>
            {example && (
              <div className="mt-2 p-2 bg-secondary/50 rounded text-xs">
                <span className="font-medium">💡 {example}</span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const detailsCard = (
    <>
      <motion.h4 
        className="text-lg font-semibold mb-4 hover:text-primary transition-colors"
        whileHover={{ scale: 1.02 }}
      >
        Fonctionnement technique
      </motion.h4>
      <motion.p 
        className="mb-4 leading-relaxed hover:text-foreground transition-colors"
        whileHover={{ x: 2 }}
      >
        Les LLM utilisent des architectures basées sur les{' '}
        <TooltipTerm 
          title="Architecture Transformers"
          content="Architecture introduite en 2017 qui traite tous les mots d'un texte en parallèle à l'entraînement, au lieu de les lire un par un comme les réseaux récurrents ; à la génération, la réponse est produite mot après mot."
          example="Comme lire une phrase d'un seul regard au lieu de mot à mot"
        >
          transformers
        </TooltipTerm>
        {' '}avec des mécanismes d'{' '}
        <TooltipTerm 
          title="Mécanisme d'attention"
          content="Permet à l'IA de se concentrer sur les mots les plus importants dans un texte."
          example="Comme surligner automatiquement les mots-clés dans un texte"
        >
          attention
        </TooltipTerm>
        {' '}pour traiter le texte. Ils sont entraînés en plusieurs phases, dont deux principales :
      </motion.p>
      
      <motion.ol 
        className="space-y-3 ml-6 list-decimal text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.li
          className="hover:text-foreground transition-colors p-2 rounded hover:bg-secondary/20"
          whileHover={{ x: 4 }}
        >
          <span className="font-medium text-foreground">
            <TooltipTerm 
              title="Pré-entraînement"
              content="Phase où le modèle s'entraîne à prédire le mot suivant sur des corpus de texte immenses (de l'ordre de milliers de milliards de jetons, ou tokens, pour plusieurs modèles récents d'après leurs rapports techniques)."
              example="Comme un enfant qui apprendrait à parler en écoutant toutes les conversations du monde"
            >
              Pré-entraînement
            </TooltipTerm>
            &nbsp;:
          </span> Le modèle apprend à prédire le mot suivant sur d'énormes corpus de texte, et en tire des régularités du langage.
        </motion.li>
        <motion.li
          className="hover:text-foreground transition-colors p-2 rounded hover:bg-secondary/20"
          whileHover={{ x: 4 }}
        >
          <span className="font-medium text-foreground">
            <TooltipTerm 
              title="Post-entraînement"
              content="Phase qui suit le pré-entraînement : affinage sur des consignes et des exemples de réponses (fine-tuning), puis alignement sur les préférences humaines, par exemple par RLHF."
              example="Comme apprendre à un étudiant brillant à répondre clairement aux questions qu'on lui pose"
            >
              Post-entraînement
            </TooltipTerm>
            &nbsp;:
          </span> Le modèle est affiné sur des consignes et des exemples de réponses, puis aligné sur les préférences humaines (par exemple par RLHF).
        </motion.li>
      </motion.ol>
      
      <motion.div 
        className="mt-8 p-5 rounded-xl bg-secondary/30 border hover:border-primary/20 hover:bg-secondary/40 transition-all duration-300"
        whileHover={{ scale: 1.01, y: -2 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.h5 
                className="font-medium mb-3 flex items-center gap-2 cursor-help hover:text-primary transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Cpu className="h-4 w-4 text-primary" /> Architecture des LLM
                <HelpCircle className="w-4 h-4 text-primary/60 hover:text-primary transition-colors" />
              </motion.h5>
            </TooltipTrigger>
            <TooltipContent>
              <p>Schéma simplifié du fonctionnement interne d'un modèle de langage</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <motion.div 
          ref={schemaRef}
          className="mb-4 aspect-4/3 bg-secondary/20 rounded-lg p-3 flex items-center justify-center hover:bg-secondary/30 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <svg viewBox="0 0 500 300" className="w-full h-full">
            {/* Input Text */}
            <motion.rect 
              x="50" y="50" width="400" height="30" rx="5" 
              fill="rgb(var(--primary))" fillOpacity="0.1" 
              stroke="rgb(var(--primary))" strokeWidth="1"
              whileHover={{ fillOpacity: 0.2 }}
            />
            <text x="250" y="70" textAnchor="middle" fill="currentColor" fontSize="14">Texte d'entrée</text>
            
            {/* Embedding */}
            <motion.rect 
              x="50" y="100" width="400" height="30" rx="5" 
              fill="rgb(var(--primary))" fillOpacity="0.2" 
              stroke="rgb(var(--primary))" strokeWidth="1"
              whileHover={{ fillOpacity: 0.3 }}
            />
            <text x="250" y="120" textAnchor="middle" fill="currentColor" fontSize="14">Embedding</text>
            
            {/* Attention blocks */}
            <motion.rect 
              x="50" y="150" width="400" height="80" rx="5" 
              fill="rgb(var(--primary))" fillOpacity="0.3" 
              stroke="rgb(var(--primary))" strokeWidth="1"
              whileHover={{ fillOpacity: 0.4 }}
            />
            <text x="250" y="180" textAnchor="middle" fill="currentColor" fontSize="14">Couches d'attention</text>
            <text x="250" y="200" textAnchor="middle" fill="currentColor" fontSize="12">(Plusieurs blocs empilés)</text>
            
            {/* Output Text */}
            <motion.rect 
              x="50" y="250" width="400" height="30" rx="5" 
              fill="rgb(var(--primary))" fillOpacity="0.2" 
              stroke="rgb(var(--primary))" strokeWidth="1"
              whileHover={{ fillOpacity: 0.3 }}
            />
            <text x="250" y="270" textAnchor="middle" fill="currentColor" fontSize="14">Génération de texte</text>
            
            {/* Connecting lines */}
            <motion.line 
              x1="250" y1="80" x2="250" y2="100" 
              stroke="rgb(var(--primary))" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={flowTransition(0)}
            />
            <motion.line 
              x1="250" y1="130" x2="250" y2="150" 
              stroke="rgb(var(--primary))" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={flowTransition(0.5)}
            />
            <motion.line 
              x1="250" y1="230" x2="250" y2="250" 
              stroke="rgb(var(--primary))" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={flowTransition(1)}
            />
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 rounded-lg bg-secondary/40 hover:bg-secondary/50 transition-colors"
        whileHover={{ scale: 1.01 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.h5 
                className="font-medium mb-2 flex items-center gap-2 cursor-help hover:text-primary transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Braces className="h-4 w-4 text-primary" /> Exemples d'usage
                <HelpCircle className="w-4 h-4 text-primary/60 hover:text-primary transition-colors" />
              </motion.h5>
            </TooltipTrigger>
            <TooltipContent>
              <p>Applications concrètes des modèles de langage dans différents domaines</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { title: "Génération de contenu", desc: "Création d'articles, résumés, traductions, récits" },
            { title: "Assistants conversationnels", desc: "Chatbots, service client, assistants personnels" },
            { title: "Analyse et compréhension", desc: "Extraction d'informations, sentiment, classification" },
            { title: "Codage assisté", desc: "Complétion, débogage, documentation de code" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="p-2 border border-border rounded-lg bg-secondary/20 hover:bg-secondary/30 hover:border-primary/20 transition-all duration-200"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-sm font-medium hover:text-primary transition-colors">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 rounded-lg bg-secondary/40 hover:bg-secondary/50 transition-colors"
        whileHover={{ scale: 1.01 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.h5 
                className="font-medium mb-2 flex items-center gap-2 cursor-help hover:text-primary transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles className="h-4 w-4 text-primary" /> Avancées récentes
                <HelpCircle className="w-4 h-4 text-primary/60 hover:text-primary transition-colors" />
              </motion.h5>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <div className="space-y-2">
                <p className="font-semibold">Évolutions récentes</p>
                <p className="text-sm">Des évolutions qui rendent les LLM plus fiables et utiles.</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <motion.p 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ x: 2 }}
        >
          L'émergence de techniques comme{' '}
          <TooltipTerm 
            title="RLHF : apprentissage par renforcement à partir de retours humains"
            content="Méthode pour enseigner aux IA les préférences humaines en leur donnant des notes sur leurs réponses."
            example="Comme avoir des professeurs qui corrigent et notent les copies d'un étudiant pour l'améliorer"
          >
            RLHF
          </TooltipTerm>
          {' '}a considérablement amélioré l'alignement des LLM avec les attentes humaines, 
          réduisant les sorties problématiques et améliorant l'utilité des réponses.
        </motion.p>
        
        <motion.p 
          className="text-sm text-muted-foreground mt-2 hover:text-foreground transition-colors"
          whileHover={{ x: 2 }}
        >
          Des modèles récents présentent des{' '}
          <TooltipTerm 
            title="Capacités émergentes"
            content="Capacités qui semblent apparaître quand les modèles deviennent très grands ; leur caractère soudain est discuté, car il dépend en partie de la façon dont on les mesure."
            example="Comme un élève dont les progrès paraissent soudains quand on ne note que « réussi » ou « raté »"
          >
            capacités émergentes
          </TooltipTerm>
          {' '}: raisonnement en plusieurs étapes, résolution de problèmes, et des résultats variables sur des tests de théorie de l'esprit, dont l'interprétation est débattue.
        </motion.p>
        
        <motion.div 
          className="mt-4 flex justify-end"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/types-ia/llm">
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg"
            >
              <span>Approfondir le sujet</span>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="h-3 w-3" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );

  return (
    <IASection
      sectionId="llm-section"
      icon={<MessageSquare size={32} className="text-primary" />}
      title="Modèles de langage (LLM)"
      description="Les Large Language Models (LLM) sont des modèles d'IA entraînés sur d'immenses corpus de texte 
      pour comprendre et générer du langage humain de manière cohérente et contextuelle. Ils sont aujourd'hui l'une des approches les plus utilisées
      en traitement automatique du langage naturel."
      benefits={[
        "Capable de générer du texte, traduire, résumer et répondre à des questions complexes",
        "Utilisés dans les chatbots, assistants virtuels, outils de création de contenu et applications d'analyse textuelle",
        "Intégration facilitée via des API permettant l'accès à des modèles comme ceux de la famille GPT, Claude, Gemini ou Mistral, ou à des modèles à poids ouverts (Llama, Qwen, DeepSeek)",
        "Évolution constante vers une meilleure compréhension du contexte et des intentions"
      ]}
      detailsCard={detailsCard}
      delay={0}
    />
  );
};

export default LLMSection;
