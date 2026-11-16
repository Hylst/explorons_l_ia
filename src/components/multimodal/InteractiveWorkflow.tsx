// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Image, 
  Music, 
  Video,
  ArrowRight,
  Brain,
  RefreshCw,
  Sparkles,
  Lightbulb,
  MessageSquare,
  Check,
  Play,
  Pause
} from 'lucide-react';
import { asset } from '@/lib/paths';
import SimulationNotice from '@/components/common/SimulationNotice';

/**
 * Composant illustrant le workflow de création multimodale avec interaction
 */
const InteractiveWorkflow = () => {
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayTimeout, setAutoplayTimeout] = useState<NodeJS.Timeout | null>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Prompt textuel",
      description: "L'utilisateur fournit une description textuelle détaillée",
      icon: <FileText className="h-8 w-8 text-primary" aria-hidden="true" />,
      color: "bg-primary/10",
      details: "Le prompt peut inclure des instructions précises sur le style, le contenu, le ton et d'autres caractéristiques souhaitées pour les sorties générées.",
      illustration: asset("pics/workflow/prompt.webp")
    },
    {
      title: "Traitement IA",
      description: "Les modèles transforment le texte en représentations vectorielles",
      icon: <Brain className="h-8 w-8 text-purple-500" aria-hidden="true" />,
      color: "bg-purple-500/10",
      details: "Les réseaux de neurones profonds encodent le texte en vecteurs de haute dimension, capturant le sens sémantique et les relations conceptuelles.",
      illustration: asset("pics/workflow/traitement.webp")
    },
    {
      title: "Génération d'image",
      description: "Création visuelle basée sur l'interprétation du prompt",
      icon: <Image className="h-8 w-8 text-blue-500" aria-hidden="true" />,
      color: "bg-blue-500/10",
      details: "Des modèles d'image comme GPT Image (OpenAI), Midjourney ou Stable Diffusion créent des images cohérentes avec la description\u00A0; les modèles de diffusion partent d'un bruit aléatoire et le transforment pas à pas en image, guidés par la représentation vectorielle du texte.",
      illustration: asset("pics/workflow/image.jpg")
    },
    {
      title: "Génération audio",
      description: "Production de sons ou musique correspondant au contexte",
      icon: <Music className="h-8 w-8 text-green-500" aria-hidden="true" />,
      color: "bg-green-500/10",
      details: "Des modèles de génération audio et musicale, comme la famille Lyria de Google, produisent des sons, des voix ou des morceaux à partir d'une description textuelle\u00A0; chaque modèle a son propre encodeur de texte.",
      illustration: asset("pics/workflow/audio.jpg")
    },
    {
      title: "Génération vidéo",
      description: "Animation ou séquence vidéo intégrant les éléments précédents",
      icon: <Video className="h-8 w-8 text-amber-500" aria-hidden="true" />,
      color: "bg-amber-500/10",
      details: "Des modèles de génération vidéo, comme ceux de Runway, de Google (Veo) ou de Kling, animent des images fixes ou créent des séquences à partir d'une description textuelle.",
      illustration: asset("pics/workflow/video.jpg")
    }
  ];

  const nextStep = () => {
    setAnimate(false);
    setTimeout(() => {
      setStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      setAnimate(true);
    }, 300);
  };

  const resetDemo = () => {
    setAnimate(false);
    setTimeout(() => {
      setStep(0);
      setAnimate(true);
    }, 300);
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      // Stop autoplay
      if (autoplayTimeout) {
        clearTimeout(autoplayTimeout);
        setAutoplayTimeout(null);
      }
      setIsPlaying(false);
    } else {
      // Start autoplay
      setIsPlaying(true);
      const timeout = setTimeout(() => {
        nextStep();
        // Create a recursive function for autoplay
        const playNextStep = () => {
          const newTimeout = setTimeout(() => {
            setStep((prev) => {
              const newStep = prev === steps.length - 1 ? 0 : prev + 1;
              // If we've completed the cycle, stop autoplay
              if (newStep === 0) {
                setIsPlaying(false);
                return 0;
              }
              const nextTimeout = setTimeout(playNextStep, 3000);
              setAutoplayTimeout(nextTimeout);
              return newStep;
            });
          }, 3000);
          setAutoplayTimeout(newTimeout);
        };
        playNextStep();
      }, 500);
      setAutoplayTimeout(timeout);
    }
  };

  // Gestion des touches de clavier pour l'accessibilité
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!workflowRef.current) return;
      
      // Vérifier si le focus est à l'intérieur du composant
      if (workflowRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextStep();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          setAnimate(false);
          setTimeout(() => {
            setStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
            setAnimate(true);
          }, 300);
        } else if (e.key === 'Home') {
          e.preventDefault();
          resetDemo();
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleAutoplay();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Arrêter l'autoplay quand le composant est démonté
  useEffect(() => {
    return () => {
      if (autoplayTimeout) {
        clearTimeout(autoplayTimeout);
      }
    };
  }, [autoplayTimeout]);

  // Example prompt for demonstration
  const samplePrompt = "Créer une scène de café parisien au coucher du soleil avec des personnes en terrasse, une musique d'accordéon douce en arrière-plan et une légère animation de passants.";

  // Exemples fixes affichés dans le panneau de droite : aucun modèle n'est exécuté, ce sont des
  // valeurs fictives ou des illustrations préparées à l'avance, signalées comme telles au visiteur.
  const outputExamples = [
    null, // Pas de sortie pour l'étape du prompt
    <div className="p-3 bg-purple-500/10 rounded-lg text-xs overflow-hidden text-muted-foreground space-y-2">
      <p className="font-mono">[0.23, -0.45, 0.78, 0.12, ...]</p>
      <p>Exemple de valeurs fictives : un vecteur réel compte plusieurs centaines à plusieurs milliers de dimensions.</p>
    </div>,
    <div className="w-full space-y-2">
      <div className="aspect-video rounded-lg bg-blue-500/10 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={asset("pics/workflow/image-sortie.jpg")}
            alt="Illustration fixe préparée à l'avance, sans rapport avec le prompt : aucune image n'est générée dans cette démonstration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Illustration : photo libre d'usage, sans rapport avec le prompt, pas une sortie de modèle.</p>
    </div>,
    <div className="rounded-lg bg-green-500/10 p-4 flex items-center gap-2 text-xs text-muted-foreground">
      <Music className="h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
      <p>Exemple de sortie audio : non reproduit dans cette démonstration (aucun son n'est produit).</p>
    </div>,
    <div className="w-full space-y-2">
      <div className="aspect-video rounded-lg bg-amber-500/10 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={asset("pics/workflow/video.jpg")}
            alt="Illustration fixe préparée à l'avance, sans rapport avec le prompt : aucune vidéo n'est générée ici"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Illustration : photo libre d'usage, sans rapport avec le prompt, pas une sortie de modèle.</p>
    </div>
  ];

  return (
    <div 
      className="glass-card p-6 rounded-xl"
      ref={workflowRef}
      tabIndex={0} 
      aria-label="Présentation interactive du workflow de création multimodale. Utilisez les flèches du clavier pour naviguer."
    >
      <h3 className="heading-sm mb-6 flex items-center justify-between">
        <span>Workflow de création multimodale</span>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleAutoplay}
            className="flex items-center gap-1 text-xs h-8"
            aria-label={isPlaying ? "Arrêter la lecture automatique" : "Démarrer la lecture automatique"}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3" aria-hidden="true" />
                <span>Arrêter</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" aria-hidden="true" />
                <span>Démonstration</span>
              </>
            )}
          </Button>
        </div>
      </h3>
      
      <div className="p-4 border border-primary/20 rounded-lg mb-6 bg-primary/5">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="h-4 w-4 text-primary" aria-hidden="true" />
          <h4 className="font-medium text-sm">Exemple de prompt multimodal</h4>
        </div>
        <p className="text-sm italic text-muted-foreground">{samplePrompt}</p>
      </div>
      
      <div className="relative">
        <div 
          className="flex justify-between mb-4"
          role="progressbar" 
          aria-valuemin={0} 
          aria-valuemax={steps.length - 1} 
          aria-valuenow={step}
          aria-label={`Étape ${step + 1} sur ${steps.length}: ${steps[step].title}`}
        >
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`w-[12%] h-1 rounded-full transition-colors duration-300 ${index <= step ? 'bg-primary' : 'bg-muted'}`}
              aria-hidden="true"
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div 
            className={`p-5 rounded-lg ${steps[step].color} mb-4`}
            animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-xs">
                {steps[step].icon}
              </div>
              <div>
                <h4 className="font-medium text-lg">{steps[step].title}</h4>
                <p className="text-muted-foreground">{steps[step].description}</p>
              </div>
            </div>
            
            {/* Illustration ajoutée */}
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={steps[step].illustration} 
                alt={`Illustration de l'étape\u00A0: ${steps[step].title}`} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="p-3 bg-secondary/20 rounded-lg">
              <p className="text-sm">{steps[step].details}</p>
            </div>
            
            {step > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" aria-hidden="true" />
                <p className="text-xs text-muted-foreground">Ce processus utilise une architecture d'IA multimodale avec réseaux de neurones profonds.</p>
              </div>
            )}
          </motion.div>
          
          <motion.div
            className="glass-card p-4 rounded-2xl"
            animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Exemple illustratif de l'étape</span>
            </h4>

            {step === 0 ? (
              <div className="flex items-center justify-center h-40 border border-dashed border-primary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Les entrées textuelles sont converties en représentations que l'IA peut traiter</p>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-40">
                {outputExamples[step]}
              </div>
            )}

            <SimulationNotice className="mt-3">
              Les exemples affichés sont fixes (valeurs fictives ou illustrations préparées à l'avance) : aucun modèle n'est exécuté dans cette page.
            </SimulationNotice>
          </motion.div>
        </div>
        
        <div 
          className="space-y-2 mt-6"
          role="tablist"
          aria-label="Étapes du workflow multimodal"
        >
          {steps.map((s, idx) => (
            <div 
              key={idx} 
              role="tab"
              aria-selected={step === idx}
              aria-controls={`step-content-${idx}`}
              tabIndex={0}
              className={`flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer ${
                step === idx ? 'bg-secondary/30' : 'hover:bg-secondary/20'
              }`}
              onClick={() => {
                setAnimate(false);
                setTimeout(() => {
                  setStep(idx);
                  setAnimate(true);
                }, 300);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setAnimate(false);
                  setTimeout(() => {
                    setStep(idx);
                    setAnimate(true);
                  }, 300);
                }
              }}
            >
              <div className={`p-1.5 rounded-full ${step === idx ? s.color : 'bg-secondary/20'}`}>
                {React.cloneElement(s.icon, { className: "h-4 w-4" })}
              </div>
              <span className={`text-sm ${step === idx ? 'font-medium' : 'text-muted-foreground'}`}>
                {s.title}
              </span>
              {step === idx && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetDemo}
            className="flex items-center gap-2"
            aria-label="Réinitialiser la démonstration"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>Réinitialiser</span>
          </Button>
          <Button 
            onClick={nextStep}
            size="sm"
            className="flex items-center gap-2"
            aria-label="Passer à l'étape suivante"
          >
            <span>Étape suivante</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorkflow;
