// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { FlaskConical } from 'lucide-react';

interface SimulationNoticeProps {
  className?: string;
  /** Remplace le texte par défaut quand la nature de la démonstration demande une précision. */
  children?: React.ReactNode;
}

const DEFAULT_TEXT =
  "Les valeurs affichées sont simulées ou choisies pour illustrer un principe\u00A0: elles ne proviennent ni d'un entraînement réel ni de mesures, et ne permettent pas de comparer des algorithmes.";

/**
 * Bandeau sobre à placer dans chaque démonstration dont les chiffres ne sont pas calculés à partir de vraies
 * données : le visiteur doit pouvoir distinguer une illustration d'une mesure.
 */
const SimulationNotice: React.FC<SimulationNoticeProps> = ({ className = '', children }) => (
  <p
    role="note"
    className={`flex items-start gap-2 rounded-md border border-dashed bg-muted/40 p-3 text-xs text-muted-foreground ${className}`}
  >
    <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
    <span>
      <strong className="text-foreground">Illustration pédagogique.</strong> {children ?? DEFAULT_TEXT}
    </span>
  </p>
);

export default SimulationNotice;
