// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';
import Hero from '@/components/Hero';
import ApplicationsSection from '@/components/multimodal/ApplicationsSection';
import AudioSection from '@/components/multimodal/AudioSection';
import PromptingSection from '@/components/multimodal/PromptingSection';
import ExploreMoreSection from '@/components/common/ExploreMoreSection';

/**
 * Page dédiée aux IA multimodales et à la création assistée par IA
 * @returns {JSX.Element} Le composant de la page IA Multimodale
 */
const IAMultimodale = () => {
  const [activeTab, setActiveTab] = useState("applications");
  useScrollToAnchor();

  const exploreLinks = [
    {
      to: "/ethique",
      label: "Éthique de l'IA",
      variant: "default" as const
    },
    {
      to: "/types-ia",
      label: "Types d'IA",
      variant: "outline" as const
    },
    {
      to: "/machine-learning",
      label: "Machine Learning",
      variant: "secondary" as const
    }
  ];

  return (
    <main>
      <Hero
        title="IA et création multimodale"
        subtitle="Découvrez comment les technologies d'intelligence artificielle transforment certaines pratiques de création artistique et technique."
        primaryAction={{
          label: "Explorer les exemples",
          href: "#applications-creatives"
        }}
        secondaryAction={{
          label: "Astuces de prompting",
          href: "#prompting-efficace"
        }}
      />

      <ApplicationsSection activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <section id="audio-section">
        <AudioSection />
      </section>
      
      <section id="prompting-efficace">
        <PromptingSection />
      </section>
      
      <ExploreMoreSection links={exploreLinks} />
    </main>
  );
};

export default IAMultimodale;
