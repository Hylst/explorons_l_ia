// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { BrainCircuit, Shield, Lightbulb, Rocket, AlertTriangle } from 'lucide-react';
import IASection from './IASection';

const AGISection = () => {
  const detailsCard = (
    <>
      <h4 className="text-lg font-semibold mb-4">Approches vers l'AGI</h4>
      
      <div className="mb-6 p-5 rounded-lg bg-secondary/30 border">
        <div className="aspect-3/2 mb-4 bg-secondary/20 rounded-lg p-3 flex items-center justify-center">
          <svg viewBox="0 0 720 400" className="w-full h-full">
            {/* AGI Spectrum */}
            <rect x="60" y="50" width="600" height="300" rx="5" fill="none" stroke="rgb(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
            
            {/* AI Evolution Path */}
            <path d="M120,250 C200,230 250,200 300,150 C350,100 450,80 550,60" 
                  fill="none" stroke="rgb(var(--primary))" strokeWidth="3" strokeDasharray="5,5" />
            
            {/* Current AI */}
            <circle cx="200" cy="210" r="20" fill="rgb(var(--primary))" fillOpacity="0.3" />
            <text x="200" y="240" textAnchor="middle" fill="currentColor" fontSize="12">IA actuelle</text>
            <text x="200" y="255" textAnchor="middle" fill="currentColor" fontSize="10">(capacités larges mais inégales)</text>
            
            {/* Proto-AGI */}
            <circle cx="380" cy="120" r="25" fill="rgb(var(--primary))" fillOpacity="0.4" />
            <text x="380" y="150" textAnchor="middle" fill="currentColor" fontSize="12">Étape hypothétique</text>
            <text x="380" y="165" textAnchor="middle" fill="currentColor" fontSize="10">(capacités générales)</text>
            
            {/* Full AGI */}
            <circle cx="550" cy="60" r="30" fill="rgb(var(--primary))" fillOpacity="0.5" />
            <text x="550" y="30" textAnchor="middle" fill="currentColor" fontSize="14">AGI</text>
            
            {/* Axes Labels */}
            <text x="600" y="320" textAnchor="middle" fill="currentColor" fontSize="12">Généralisation</text>
            <text x="90" y="80" textAnchor="middle" fill="currentColor" fontSize="12">Capacités</text>
            <text x="90" y="95" textAnchor="middle" fill="currentColor" fontSize="12">cognitives</text>
            
            {/* Arrow markers */}
            <defs>
              <marker id="agi-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgb(var(--primary))" />
              </marker>
            </defs>
            
            {/* Axes Arrows */}
            <line x1="60" y1="350" x2="660" y2="350" stroke="rgb(var(--primary))" strokeWidth="1" markerEnd="url(#agi-arrow)" />
            <line x1="60" y1="350" x2="60" y2="50" stroke="rgb(var(--primary))" strokeWidth="1" markerEnd="url(#agi-arrow)" />
            
            {/* Key AI capabilities needed */}
            <text x="450" y="280" textAnchor="start" fill="currentColor" fontSize="11" fontStyle="italic">• Raisonnement abstrait</text>
            <text x="450" y="300" textAnchor="start" fill="currentColor" fontSize="11" fontStyle="italic">• Apprentissage continuel</text>
            <text x="450" y="320" textAnchor="start" fill="currentColor" fontSize="11" fontStyle="italic">• Transfert de connaissances</text>
            <text x="450" y="340" textAnchor="start" fill="currentColor" fontSize="11" fontStyle="italic">• Fiabilité et sécurité</text>
          </svg>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="p-3 rounded-lg bg-secondary/40">
          <h5 className="font-medium flex items-center gap-2">
            <Rocket className="h-4 w-4 text-primary" /> Scaling Laws
          </h5>
          <p className="text-sm text-muted-foreground">
            Hypothèse selon laquelle augmenter la taille des modèles, des données et de la puissance 
            de calcul conduirait progressivement à des capacités de plus en plus générales.
            Kaplan et al. (2020) ont observé que la perte des modèles de langage diminue de façon prévisible, selon une loi de puissance, quand la taille du modèle, 
            les données et le calcul augmentent. Cela n'établit pas que ces capacités mènent à l'AGI.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/40">
          <h5 className="font-medium flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-primary" /> Approches neurosymboliques
          </h5>
          <p className="text-sm text-muted-foreground">
            Combinaison de réseaux neuronaux avec des systèmes symboliques pour allier l'apprentissage 
            statistique à la logique formelle. Cette hybridation vise à intégrer l'apprentissage
            par données avec la représentation explicite des connaissances et le raisonnement.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/40">
          <h5 className="font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" /> Architecture cognitive
          </h5>
          <p className="text-sm text-muted-foreground">
            Création de systèmes inspirés par la structure et le fonctionnement du cerveau humain, 
            intégrant perception, mémoire, attention et raisonnement. Ces architectures tentent
            de modéliser les processus cognitifs humains dans leur globalité.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="p-4 rounded-lg border bg-secondary/20">
          <h5 className="font-medium mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" /> Défis d'alignement
          </h5>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0"></span>
              <span>Spécification des valeurs et objectifs humains</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0"></span>
              <span>Éviter l'optimisation excessive de métriques</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0"></span>
              <span>Robustesse contre la dérive d'objectifs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0"></span>
              <span>Interprétabilité des décisions</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg border bg-secondary/20">
          <h5 className="font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" /> Risques potentiels
          </h5>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0"></span>
              <span>Instabilité sociale et économique</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0"></span>
              <span>Concentration de pouvoir</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0"></span>
              <span>Autonomie et contrôle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0"></span>
              <span>Décisions éthiques complexes</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 p-4 rounded-lg bg-secondary/20 border border-secondary">
        <h5 className="font-medium mb-2">Une prise de position publique, et ses contestations</h5>
        <p className="text-sm text-muted-foreground">
          En mai 2023, le Center for AI Safety a publié une déclaration d'une seule phrase, signée notamment par
          Geoffrey Hinton, Yoshua Bengio, Stuart Russell, Demis Hassabis, Sam Altman et Dario Amodei : elle demande que
          la réduction du risque d'extinction lié à l'IA soit une priorité mondiale, au même titre que les pandémies et
          la guerre nucléaire. Des chercheurs contestent ce cadrage et jugent prioritaire de traiter les dommages déjà
          observés (biais, désinformation, concentration du pouvoir). Les définitions de l'AGI comme son échéance font
          l'objet de désaccords : aucune date n'est établie.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Source :{' '}
          <a
            href="https://safe.ai/work/statement-on-ai-risk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Statement on AI Risk (Center for AI Safety)
          </a>
        </p>
      </div>
    </>
  );

  return (
    <IASection
      sectionId="agi-section"
      icon={<BrainCircuit size={32} className="text-primary" />}
      title="Intelligence artificielle générale (AGI)"
      description="L'AGI fait référence à une intelligence artificielle hypothétique qui pourrait comprendre, 
      apprendre et appliquer des connaissances à travers un large éventail de tâches, à un niveau égal ou supérieur à celui d'un humain."
      benefits={[
        "Capacité d'apprendre et de raisonner à travers différents domaines",
        "Transfert de connaissances entre différentes tâches",
        "N'existe pas à ce jour\u00A0; sa définition, sa faisabilité et son échéance font débat"
      ]}
      detailsCard={detailsCard}
      delay={4}
    />
  );
};

export default AGISection;
