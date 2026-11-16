// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import CostCalculator from '@/components/cost-calculator/CostCalculator';

const CalculateurCoutsIA = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-container">
        <CostCalculator />
      </section>
    </div>
  );
};

export default CalculateurCoutsIA;
