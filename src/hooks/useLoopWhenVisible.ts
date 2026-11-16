// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Pour les animations décoratives en boucle (impulsions, flux, minuteries d'illustration).
 *
 * Renvoie une `ref` à poser sur le conteneur de l'illustration et un booléen `active`, vrai
 * seulement si le conteneur est à l'écran (ou juste à côté) et si le visiteur n'a pas demandé
 * de réduire les animations. Hors écran, la boucle s'arrête : elle ne consomme plus ni calcul
 * ni batterie. Sans cela, une page qui contient plusieurs illustrations animées garde le
 * processeur occupé en permanence, même quand elles ne sont pas visibles.
 *
 * Les animations ponctuelles (apparition, survol) n'ont pas besoin de ce hook.
 */
export function useLoopWhenVisible<T extends Element = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: '150px 0px 150px 0px' });
  const reducedMotion = useReducedMotion();
  return { ref, active: inView && !reducedMotion };
}
