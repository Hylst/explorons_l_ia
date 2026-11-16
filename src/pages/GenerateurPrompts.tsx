// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import Hero from '@/components/Hero';
import PromptGenerator from '@/components/prompt-generator/PromptGenerator';
import PromptGeneratorBackButton from '@/components/prompt-generator/PromptGeneratorBackButton';

const GenerateurPrompts = () => {
  return (
    <>      
      <section className="section-container">
        <PromptGeneratorBackButton />
        <PromptGenerator />
      </section>
    </>
  );
};

export default GenerateurPrompts;
