// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { 
  Calendar, ChevronsUpDown, History, Brain, 
  Bot, Calculator, BrainCircuit, BadgeCheck, 
  Network, Globe, Cpu, Rocket, Scale, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string;
  technicalTerms?: Array<{
    term: string;
    explanation: string;
    example?: string;
    analogy?: string;
  }>;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1950",
    title: "Test de Turing",
    description: "Alan Turing propose un test pour déterminer si une machine peut penser.",
    icon: <Brain className="h-5 w-5" />,
    details: "Le test de Turing propose un critère selon lequel une machine peut être considérée comme 'pensante' si un évaluateur humain ne peut pas distinguer de façon fiable les réponses de la machine de celles d'un humain.",
    technicalTerms: [
      {
        term: "Test de Turing",
        explanation: "Méthode d'évaluation de l'intelligence d'une machine basée sur sa capacité à imiter la conversation humaine",
        example: "Selon une étude de 2025 (Jones et Bergen), GPT-4.5, invité à adopter un personnage humain, a été désigné comme l'humain dans 73 % des échanges, plus souvent que les vrais participants humains",
        analogy: "Comme un test à l'aveugle où vous devinez si vous parlez à un humain ou à une machine"
      },
      {
        term: "Intelligence artificielle",
        explanation: "Capacité d'une machine à imiter les fonctions cognitives humaines comme l'apprentissage et la résolution de problèmes",
        example: "Reconnaissance vocale, traduction automatique, conduite autonome",
        analogy: "Comme donner un cerveau artificiel à une machine pour qu'elle puisse 'réfléchir'"
      }
    ]
  },
  {
    year: "1956",
    title: "Atelier de Dartmouth",
    description: "Naissance officielle du terme « intelligence artificielle ».",
    icon: <Calendar className="h-5 w-5" />,
    details: "Organisée par John McCarthy, Marvin Minsky, Nathaniel Rochester et Claude Shannon, cet atelier d'été a défini l'IA comme discipline scientifique et a établi ses objectifs fondamentaux.",
    technicalTerms: [
      {
        term: "Discipline scientifique",
        explanation: "Domaine d'étude structuré avec des méthodes, théories et objectifs définis",
        example: "L'IA combine informatique, mathématiques, psychologie et neurosciences",
        analogy: "Comme créer une nouvelle matière à l'université avec son programme et ses règles"
      }
    ]
  },
  {
    year: "1974-1980",
    title: "Premier hiver de l'IA",
    description: "Période de réduction des financements et de l'intérêt pour l'IA.",
    icon: <History className="h-5 w-5" />,
    details: "Après des promesses non tenues (rapport ALPAC de 1966 sur la traduction automatique, rapport Lighthill de 1973 au Royaume-Uni), les financements publics de la recherche en IA ont fortement diminué.",
    technicalTerms: [
      {
        term: "Hiver de l'IA",
        explanation: "Périodes de désillusion où les financements et l'intérêt pour l'IA diminuent drastiquement",
        example: "Après l'échec des promesses de traduction automatique parfaite dans les années 60",
        analogy: "Comme un hiver économique où les investissements gèlent par manque de confiance"
      }
    ]
  },
  {
    year: "Années 1980",
    title: "Systèmes experts",
    description: "Des systèmes de règles pour résoudre des problèmes dans un domaine précis.",
    icon: <Calculator className="h-5 w-5" />,
    details: "Nés dans les années 1960-1970 (DENDRAL, MYCIN), les systèmes experts se répandent dans l'industrie dans les années 1980, par exemple XCON, qui configurait des ordinateurs pour la société DEC. Ils utilisent des règles «\u00A0si-alors\u00A0» écrites par des experts.",
    technicalTerms: [
      {
        term: "Systèmes experts",
        explanation: "Programmes informatiques qui imitent le raisonnement d'un expert humain dans un domaine spécialisé",
        example: "MYCIN pour le diagnostic médical, DENDRAL pour l'analyse chimique",
        analogy: "Comme avoir un médecin virtuel qui suit un manuel de diagnostic très précis"
      },
      {
        term: "Règles si-alors",
        explanation: "Logique conditionnelle où une action est déclenchée si certaines conditions sont remplies",
        example: "SI la température est élevée ET la pression est basse ALORS déclencher une alerte de maintenance",
        analogy: "Comme une recette de cuisine avec des instructions précises selon les ingrédients disponibles"
      }
    ]
  },
  {
    year: "1987-1993",
    title: "Deuxième hiver de l'IA",
    description: "Nouvelle période de désintérêt et de réduction des investissements.",
    icon: <History className="h-5 w-5" />,
    details: "L'effondrement du marché des machines LISP spécialisées (1987) et la désillusion envers les systèmes experts, coûteux à maintenir, ont conduit à une nouvelle période de scepticisme envers l'IA."
  },
  {
    year: "1997",
    title: "Deep Blue",
    description: "L'ordinateur d'IBM bat le champion du monde d'échecs Garry Kasparov.",
    icon: <Cpu className="h-5 w-5" />,
    details: "Cette victoire a marqué un tournant dans la perception publique des capacités de l'IA, même si Deep Blue reposait surtout sur une recherche très rapide parmi les coups possibles (en écartant les branches peu prometteuses), guidée par des règles d'évaluation écrites à la main, et non sur de l'apprentissage.",
    technicalTerms: [
      {
        term: "Force brute",
        explanation: "Méthode qui s'appuie sur un très grand nombre de calculs pour explorer les possibilités, plutôt que sur une stratégie fine (Deep Blue écartait toutefois les branches peu prometteuses)",
        example: "Deep Blue calculait 200 millions de positions d'échecs par seconde",
        analogy: "Comme résoudre un labyrinthe en essayant tous les chemins possibles très rapidement"
      },
      {
        term: "Calcul parallèle",
        explanation: "Utilisation de plusieurs processeurs simultanément pour accélérer les calculs",
        example: "Deep Blue combinait 30 processeurs généralistes et 480 puces spécialisées dans les échecs",
        analogy: "Comme avoir des dizaines de personnes qui réfléchissent en même temps au lieu d'une seule"
      }
    ]
  },
  {
    year: "2006",
    title: "Deep Learning",
    description: "Émergence du deep learning moderne avec les réseaux de neurones profonds.",
    icon: <BrainCircuit className="h-5 w-5" />,
    details: "Geoffrey Hinton et ses collègues publient une méthode pour entraîner des réseaux de neurones profonds couche par couche. Le terme «\u00A0deep learning\u00A0» se popularise ensuite, avec l'augmentation des données et de la puissance de calcul.",
    technicalTerms: [
      {
        term: "Deep Learning",
        explanation: "Technique d'apprentissage automatique utilisant des réseaux de neurones artificiels avec plusieurs couches",
        example: "Reconnaissance d'images, traduction automatique, génération de texte",
        analogy: "Comme un cerveau artificiel avec plusieurs niveaux de réflexion, du simple au complexe"
      },
      {
        term: "Réseaux de neurones",
        explanation: "Modèles informatiques inspirés du fonctionnement des neurones biologiques",
        example: "Chaque neurone artificiel reçoit des signaux, les traite et transmet le résultat",
        analogy: "Comme un réseau de messagers qui se passent et transforment l'information"
      },
      {
        term: "Rétropropagation",
        explanation: "Algorithme d'apprentissage qui ajuste les poids du réseau en propageant l'erreur vers l'arrière",
        example: "Si l'IA se trompe sur une image de chat, elle ajuste ses connexions pour mieux reconnaître les chats",
        analogy: "Comme corriger ses erreurs en remontant étape par étape pour comprendre où ça a dérapé"
      }
    ]
  },
  {
    year: "2011",
    title: "Watson d'IBM",
    description: "Watson remporte le jeu télévisé Jeopardy! contre des champions humains.",
    icon: <BadgeCheck className="h-5 w-5" />,
    details: "Watson a montré qu'un système pouvait répondre à des questions posées en langage naturel, y compris avec des jeux de mots et des ambiguïtés, en s'appuyant sur une très grande base de textes.",
    technicalTerms: [
      {
        term: "Traitement du langage naturel",
        explanation: "Capacité des machines à comprendre, interpréter et générer le langage humain",
        example: "Watson analysait des indices de Jeopardy! formulés avec des jeux de mots et des références culturelles",
        analogy: "Comme apprendre à une machine à parler et comprendre comme un humain"
      },
      {
        term: "Analyse sémantique",
        explanation: "Compréhension du sens des mots et phrases dans leur contexte",
        example: "Distinguer 'la souris mange le fromage' de 'la souris de l'ordinateur'",
        analogy: "Comme comprendre le sens caché derrière les mots, pas seulement les mots eux-mêmes"
      }
    ]
  },
  {
    year: "2012",
    title: "AlexNet",
    description: "Percée majeure dans la reconnaissance d'images avec les réseaux de neurones convolutifs.",
    icon: <Network className="h-5 w-5" />,
    details: "AlexNet a nettement réduit le taux d'erreur à la compétition ImageNet (environ 16\u00A0% d'erreurs sur les cinq premières propositions avec les seules données du concours, environ 15\u00A0% avec des données supplémentaires, contre environ 26\u00A0% pour le deuxième), montrant la puissance des réseaux de neurones profonds pour la vision par ordinateur.",
    technicalTerms: [
      {
        term: "Réseaux de neurones convolutifs (CNN)",
        explanation: "Architecture spécialisée dans l'analyse d'images qui détecte des motifs visuels",
        example: "AlexNet reconnaissait formes, textures et objets dans les images",
        analogy: "Comme des filtres photographiques intelligents qui extraient les détails importants"
      },
      {
        term: "Vision par ordinateur",
        explanation: "Capacité des machines à interpréter et comprendre le contenu visuel",
        example: "Reconnaissance faciale, diagnostic médical par imagerie, voitures autonomes",
        analogy: "Comme donner des yeux et un cerveau à une machine pour qu'elle 'voie' comme nous"
      },
      {
        term: "ImageNet",
        explanation: "Grande base de données d'images étiquetées utilisée pour entraîner et tester les IA visuelles",
        example: "Plus de 14 millions d'images et plus de 20 000 catégories (la compétition annuelle n'en utilisait que 1 000)",
        analogy: "Comme une immense bibliothèque d'images avec des légendes pour apprendre aux machines"
      }
    ]
  },
  {
    year: "2016",
    title: "AlphaGo",
    description: "L'IA de DeepMind bat le champion du monde de Go Lee Sedol.",
    icon: <Globe className="h-5 w-5" />,
    details: "Cette victoire était remarquable car le jeu de Go était considéré comme trop complexe pour être maîtrisé par les ordinateurs en raison du nombre astronomique de configurations possibles.",
    technicalTerms: [
      {
        term: "Apprentissage par renforcement",
        explanation: "Méthode d'apprentissage où l'IA apprend en essayant des actions et en recevant des récompenses",
        example: "AlphaGo s'entraînait en jouant des millions de parties contre elle-même",
        analogy: "Comme apprendre à faire du vélo en tombant et se relevant jusqu'à trouver l'équilibre"
      },
      {
        term: "Arbre de recherche Monte-Carlo",
        explanation: "Algorithme qui explore intelligemment les possibilités futures en simulant des scénarios aléatoires",
        example: "AlphaGo simulait un grand nombre de suites de parties pour évaluer chaque coup envisagé",
        analogy: "Comme jouer mentalement plusieurs fins de parties pour choisir le meilleur coup"
      }
    ]
  },
  {
    year: "2017-2018",
    title: "Transformer et BERT",
    description: "L'architecture Transformer change durablement le traitement du langage naturel.",
    icon: <Bot className="h-5 w-5" />,
    details: "L'architecture Transformer, présentée par des chercheurs de Google en 2017, puis le modèle BERT (2018) ont transformé le traitement du langage en modélisant mieux le contexte et les relations entre les mots d'un texte.",
    technicalTerms: [
      {
        term: "Architecture Transformer",
        explanation: "Modèle qui utilise l'attention pour comprendre les relations entre tous les mots d'un texte",
        example: "Base de GPT, BERT et la plupart des IA modernes de langage",
        analogy: "Comme lire un livre en gardant en mémoire tous les personnages et leurs relations"
      },
      {
        term: "Mécanisme d'attention",
        explanation: "Technique qui permet au modèle de se concentrer sur les parties importantes du texte",
        example: "Dans 'Le chat mange la souris', l'attention lie 'chat' avec 'mange' et 'souris'",
        analogy: "Comme surligner les mots importants dans un texte pour mieux comprendre"
      },
      {
        term: "BERT",
        explanation: "Modèle bidirectionnel qui lit le texte dans les deux sens pour mieux comprendre le contexte",
        example: "Distingue «\u00A0bank\u00A0» au sens de banque et «\u00A0bank\u00A0» au sens de rive selon les mots voisins",
        analogy: "Comme lire une phrase en regardant ce qui vient avant ET après chaque mot"
      }
    ]
  },
  {
    year: "2020",
    title: "GPT-3",
    description: "Modèle de langage à grande échelle capable de générer du texte humain.",
    icon: <Bot className="h-5 w-5" />,
    details: "Avec ses 175 milliards de paramètres, GPT-3 a démontré des capacités impressionnantes pour générer du texte cohérent et contextuel sur une variété de sujets.",
    technicalTerms: [
      {
        term: "Modèle de langage génératif",
        explanation: "IA capable de produire du texte nouveau en prédisant le mot suivant le plus probable",
        example: "GPT-3 peut écrire des articles, des poèmes, du code informatique",
        analogy: "Comme un écrivain qui continue votre phrase en devinant ce que vous vouliez dire"
      },
      {
        term: "Paramètres",
        explanation: "Variables internes du modèle qui stockent les connaissances apprises pendant l'entraînement",
        example: "Chaque paramètre est un nombre ajusté pendant l'entraînement\u00A0; GPT-3 en compte 175 milliards",
        analogy: "Comme les innombrables réglages d'une table de mixage, ajustés jusqu'à obtenir le bon son"
      },
      {
        term: "Pré-entraînement",
        explanation: "Phase où le modèle apprend sur d'énormes quantités de texte avant d'être spécialisé",
        example: "GPT-3 a été entraîné sur environ 300 milliards de tokens de textes (pages web, livres, Wikipédia)",
        analogy: "Comme étudier toute une bibliothèque avant de passer un examen spécialisé"
      }
    ]
  },
  {
    year: "2022-2023",
    title: "L'IA générative devient grand public",
    description: "ChatGPT, GPT-4 et les générateurs d'images entrent dans les usages du grand public.",
    icon: <Rocket className="h-5 w-5" />,
    details: "En 2022, DALL-E 2, Midjourney et Stable Diffusion rendent la génération d'images accessible, puis ChatGPT est lancé en novembre. GPT-4 suit en mars 2023, avec de nombreux concurrents. L'IA générative entre dans les usages du quotidien et du travail.",
    technicalTerms: [
      {
        term: "IA générative",
        explanation: "Intelligence artificielle capable de créer du contenu original (texte, images, audio, vidéo)",
        example: "ChatGPT pour le texte, Midjourney ou Stable Diffusion pour les images, GitHub Copilot pour le code",
        analogy: "Comme un artiste polyvalent qui peut peindre, écrire et composer selon vos demandes"
      },
      {
        term: "Prompt engineering",
        explanation: "Art de formuler des instructions précises pour obtenir les meilleurs résultats d'une IA",
        example: "'Écris un poème romantique sur Paris en alexandrins' vs 'écris un poème'",
        analogy: "Comme apprendre à parler à un génie de la lampe pour obtenir exactement ce qu'on veut"
      },
      {
        term: "Fine-tuning",
        explanation: "Processus d'ajustement d'un modèle pré-entraîné pour une tâche spécifique",
        example: "Adapter GPT pour le service client d'une entreprise particulière",
        analogy: "Comme former un médecin généraliste pour devenir spécialiste en cardiologie"
      }
    ]
  },
  {
    year: "2024",
    title: "Cadre juridique et reconnaissance scientifique",
    description: "Le règlement européen sur l'IA entre en vigueur, et deux prix Nobel récompensent des travaux liés à l'IA.",
    icon: <Scale className="h-5 w-5" />,
    details: "Le règlement européen sur l'IA entre en vigueur le 1er août 2024, avec une application progressive sur plusieurs années (interdictions depuis le 2 février 2025, obligations pour les modèles d'IA à usage général depuis le 2 août 2025). Le règlement (UE) 2026/1744, dit « omnibus numérique », entré en vigueur le 27 juillet 2026, a reporté au 2 décembre 2027 l'application des obligations des systèmes à haut risque de l'annexe III. En octobre 2024, le prix Nobel de physique récompense John Hopfield et Geoffrey Hinton pour leurs travaux sur les réseaux de neurones, et le prix Nobel de chimie récompense notamment Demis Hassabis et John Jumper pour AlphaFold, qui prédit la structure des protéines.",
    technicalTerms: [
      {
        term: "Règlement européen sur l'IA",
        explanation: "Loi de l'Union européenne qui classe les systèmes d'IA selon leur niveau de risque et fixe des obligations en conséquence",
        example: "Certaines pratiques sont interdites, des obligations de transparence s'appliquent aux chatbots et aux contenus générés",
        analogy: "Comme un code de la route qui adapte les règles à la dangerosité de chaque véhicule"
      },
      {
        term: "AlphaFold",
        explanation: "Système d'IA de DeepMind qui prédit la forme en trois dimensions d'une protéine à partir de sa séquence",
        example: "Il a permis de proposer des structures pour une très grande part des protéines connues",
        analogy: "Comme deviner la forme d'un origami à partir de la seule suite des plis"
      }
    ]
  },
  {
    year: "2024-2025",
    title: "Modèles de raisonnement et agents",
    description: "Des modèles prennent le temps de raisonner avant de répondre, et des agents enchaînent des actions.",
    icon: <Sparkles className="h-5 w-5" />,
    details: "Des modèles dits «\u00A0de raisonnement\u00A0» (par exemple o1, présenté en septembre 2024, ou DeepSeek-R1, publié en janvier 2025) produisent des étapes intermédiaires avant de répondre. Des agents utilisent des outils (navigateur, code, fichiers) pour accomplir des tâches en plusieurs étapes. Leur fiabilité, leur coût et leur sécurité restent des sujets de recherche et de débat.",
    technicalTerms: [
      {
        term: "Modèle de raisonnement",
        explanation: "Modèle de langage entraîné à produire des étapes intermédiaires avant sa réponse finale, ce qui aide sur certains problèmes de logique, de maths ou de code",
        example: "Résoudre un problème d'algèbre en décomposant le calcul, ou déboguer un programme pas à pas",
        analogy: "Comme un élève qui pose son calcul sur une feuille au lieu de répondre de tête"
      },
      {
        term: "Agent",
        explanation: "Système qui enchaîne plusieurs actions avec des outils pour atteindre un objectif, sous la supervision d'un humain",
        example: "Chercher des informations, écrire du code, lancer des tests puis corriger les erreurs",
        analogy: "Comme un stagiaire à qui l'on confie une mission complète, et dont on relit le travail"
      }
    ]
  }
];

const TechnicalTermTooltip = ({ term, label }: { term: { term: string; explanation: string; example?: string; analogy?: string }; label?: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="text-primary font-medium cursor-help border-b border-primary/30 border-dotted hover:border-primary transition-colors">
          {label ?? term.term}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-sm p-4 space-y-2 bg-card border border-border shadow-lg">
        <div className="font-semibold text-foreground">{term.term}</div>
        <div className="text-sm text-muted-foreground">{term.explanation}</div>
        {term.example && (
          <div className="text-xs bg-primary/5 p-2 rounded border-l-2 border-primary">
            <span className="font-medium text-primary">Exemple :</span> {term.example}
          </div>
        )}
        {term.analogy && (
          <div className="text-xs bg-secondary/50 p-2 rounded border-l-2 border-secondary">
            <span className="font-medium text-secondary-foreground">Analogie :</span> {term.analogy}
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Timeline = () => {
  const [openItems, setOpenItems] = useState<{[key: string]: boolean}>({});

  const toggleItem = (year: string) => {
    setOpenItems(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  /**
   * Remplace dans le texte chaque terme technique par son infobulle, en un seul passage : une expression réunit
   * tous les termes (les plus longs d'abord, pour que « Architecture Transformer » l'emporte sur « Transformer »),
   * et le texte est découpé autour de chaque occurrence trouvée. Les limites de mot tiennent compte des lettres
   * accentuées (\b ne connaît que l'ASCII).
   */
  const renderTextWithTooltips = (text: string, technicalTerms?: Array<{term: string; explanation: string; example?: string; analogy?: string}>) => {
    if (!technicalTerms || technicalTerms.length === 0) {
      return text;
    }
    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sorted = [...technicalTerms].sort((a, b) => b.term.length - a.term.length);
    const byLower = new Map(sorted.map((term) => [term.term.toLowerCase(), term]));
    const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(${sorted.map((term) => escape(term.term)).join('|')})(?![\\p{L}\\p{N}])`, 'giu');

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const index = match.index ?? 0;
      const term = byLower.get(match[0].toLowerCase());
      if (!term) continue;
      if (index > lastIndex) elements.push(text.slice(lastIndex, index));
      elements.push(<TechnicalTermTooltip key={`${term.term}-${index}`} term={term} label={match[0]} />);
      lastIndex = index + match[0].length;
    }
    if (elements.length === 0) return text;
    if (lastIndex < text.length) elements.push(text.slice(lastIndex));
    return elements;
  };

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary before:via-primary/70 before:to-muted md:before:mx-auto md:before:ml-0">
      {timelineEvents.map((event, index) => (
        <motion.div 
          key={event.year} 
          className={`relative flex items-start md:justify-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2 md:px-8">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className={`w-full ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} transform transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 border-2 hover:border-primary/30 bg-linear-to-br from-card to-card/80 backdrop-blur-xs`}>
                <CardHeader className="relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <motion.h3 
                        className="text-lg font-bold text-foreground group-hover:text-primary transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {renderTextWithTooltips(event.title, event.technicalTerms)}
                      </motion.h3>
                      <motion.span 
                        className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {event.year}
                      </motion.span>
                    </div>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {renderTextWithTooltips(event.description, event.technicalTerms)}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                {event.details && (
                  <Collapsible open={openItems[event.year]} onOpenChange={() => toggleItem(event.year)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full flex justify-between hover:bg-primary/5 transition-all duration-200 border-t border-border/50"
                        >
                          <span className="font-medium">Plus de détails</span>
                          <motion.div
                            animate={{ rotate: openItems[event.year] ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronsUpDown className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </CollapsibleTrigger>
                    </motion.div>
                    <CollapsibleContent>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-4 bg-secondary/20 border-t border-border/30">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {renderTextWithTooltips(event.details!, event.technicalTerms)}
                          </p>
                          {event.technicalTerms && event.technicalTerms.length > 0 && (
                            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                              <h5 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                                Concepts clés à retenir
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {event.technicalTerms.map((term, i) => (
                                  <TechnicalTermTooltip key={i} term={term} />
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </motion.div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </Card>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute left-4 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/80 text-white shadow-lg md:relative md:left-0 md:top-0 ring-4 ring-background"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              {event.icon}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
