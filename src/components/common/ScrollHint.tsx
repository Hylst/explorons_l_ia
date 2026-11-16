// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { cn } from '@/lib/utils';

interface ScrollHintProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Indice visible sous 640 px, à placer juste sous un bloc `overflow-x-auto` (tableau, schéma) qui dépasse de l'écran
 * du téléphone. Le bloc défilant garde son propre `tabIndex` et son `aria-label` : l'indice est donc masqué aux
 * lecteurs d'écran pour ne pas doubler l'information.
 */
const ScrollHint: React.FC<ScrollHintProps> = ({ className, children = 'Faites défiler horizontalement pour voir la suite.' }) => (
  <p aria-hidden="true" className={cn('mt-2 text-xs text-muted-foreground sm:hidden', className)}>
    <span>{'\u2194\u00A0'}</span>
    {children}
  </p>
);

export default ScrollHint;
