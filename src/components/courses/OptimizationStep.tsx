// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';

interface OptimizationStepProps {
  step: number;
  title: string;
  description: string;
}

const OptimizationStep: React.FC<OptimizationStepProps> = ({ 
  step, 
  title, 
  description 
}) => {
  return (
    <li className="text-card-foreground">
      <strong className="text-primary">{step}. {title}</strong> - {description}
    </li>
  );
};

export default OptimizationStep;
