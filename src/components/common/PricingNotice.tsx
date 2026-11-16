// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PRICING_DISCLAIMER } from '@/components/cost-calculator/aiProvidersData';

interface PricingNoticeProps {
  className?: string;
  /** Précision propre à l'outil (par exemple sur la nature des libellés affichés). */
  extra?: React.ReactNode;
}

/**
 * Avertissement unique pour le calculateur de coûts et le comparateur de modèles : les tarifs sont
 * saisis à la main et datés. Garder un seul texte évite que les deux outils se contredisent.
 */
const PricingNotice: React.FC<PricingNoticeProps> = ({ className, extra }) => (
  <Alert className={className}>
    <Info className="h-4 w-4" aria-hidden="true" />
    <AlertTitle>Tarifs indicatifs, à vérifier</AlertTitle>
    <AlertDescription>
      {PRICING_DISCLAIMER}
      {extra && <span className="block mt-2">{extra}</span>}
    </AlertDescription>
  </Alert>
);

export default PricingNotice;
