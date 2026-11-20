// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import Hero from '../components/Hero';
import EthicalPrinciplesSection from '@/components/ethics/EthicalPrinciplesSection';
import EthicalChallengesSection from '@/components/ethics/EthicalChallengesSection';
import RegulatoryFrameworkSection from '@/components/ethics/RegulatoryFrameworkSection';
import EthicalExamplesSection from '@/components/ethics/EthicalExamplesSection';
import QuizSection from '@/components/ethics/QuizSection';
import ExploreMoreSection from '@/components/common/ExploreMoreSection';
import { TOOLS } from '@/config/tools';

/**
 * Page sur l'éthique de l'IA
 * @returns {JSX.Element} Le composant de la page Éthique
 */
const Ethique = () => {
  const exploreLinks = [
    {
      to: "/niveaux-ia",
      label: "Niveaux d'IA",
      variant: "default" as const
    },
    {
      to: "/ethique-gouvernance",
      label: "Gouvernance de l'IA",
      variant: "outline" as const
    },
    {
      to: "/cours/ia-ethique",
      label: "Cours sur l'IA éthique",
      variant: "default" as const
    },
    {
      to: TOOLS.biasAuditor.path,
      label: TOOLS.biasAuditor.name,
      variant: "outline" as const
    },
    {
      to: "/glossaire",
      label: "Glossaire des termes",
      variant: "secondary" as const
    }
  ];

  return (
    <div className="animate-fade-in">
      <Hero
        title="Éthique de l'IA"
        subtitle="Explorer les enjeux éthiques et sociétaux soulevés par le développement et l'utilisation de l'intelligence artificielle."
      />

      <div className="transform transition-all duration-500 hover:scale-[1.001]">
        <EthicalPrinciplesSection />
      </div>
      
      <div className="transform transition-all duration-500 hover:scale-[1.001]">
        <EthicalChallengesSection />
      </div>
      
      <div className="transform transition-all duration-500 hover:scale-[1.001]">
        <RegulatoryFrameworkSection />
      </div>
      
      <div className="transform transition-all duration-500 hover:scale-[1.001]">
        <EthicalExamplesSection />
      </div>
      
      <div className="transform transition-all duration-500 hover:scale-[1.001]">
        <QuizSection />
      </div>
      
      <div className="transform transition-all duration-500 hover:scale-[1.001]">
        <ExploreMoreSection links={exploreLinks} />
      </div>

      <section className="section-container pt-0">
        <div className="max-w-4xl mx-auto p-6 rounded-xl border border-primary/20 bg-primary/5">
          <h3 className="font-semibold text-lg mb-2">
            Sur la plateforme Hylst IT learning&nbsp;: éthique, gouvernance et numérique responsable
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Pour approfondir la conformité, la souveraineté et l'impact écologique des systèmes numériques et d'IA&nbsp;:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://hylst.fr/confidentialite_ia_rgpd_souverainete/"
              className="p-3 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors block"
            >
              <div className="font-medium text-sm text-primary mb-1">Confidentialité, RGPD &amp; IA</div>
              <div className="text-xs text-muted-foreground">Guide pratique sur la protection des données et la souveraineté.</div>
            </a>
            <a
              href="https://hylst.fr/greenit/"
              className="p-3 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors block"
            >
              <div className="font-medium text-sm text-primary mb-1">Le Green IT en clair</div>
              <div className="text-xs text-muted-foreground">Comprendre et réduire l'empreinte environnementale du numérique.</div>
            </a>
            <a
              href="https://ia.hylst.fr/boussole-ia/"
              className="p-3 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors block"
            >
              <div className="font-medium text-sm text-primary mb-1">Boussole IA</div>
              <div className="text-xs text-muted-foreground">Cadrage, choix et gouvernance de l'IA pour organisations et TPE.</div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ethique;
