// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollHint from '@/components/common/ScrollHint';
import type { DeepCourseDiagram } from '@/content/cours-approfondis/types';

const STEP_MS = 4500;

/**
 * Schéma SVG commenté étape par étape : à chaque étape, les éléments listés sont mis en avant et les autres
 * éléments nommés sont estompés. Le dessin est illustratif (rien n'est calculé), ce que dit l'en-tête.
 * La lecture automatique ne démarre que sur demande, s'arrête à la dernière étape et n'existe pas quand le
 * visiteur a demandé de réduire les animations.
 */
const StepDiagram: React.FC<{ diagram: DeepCourseDiagram }> = ({ diagram }) => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const svgRef = useRef<HTMLDivElement>(null);
  const last = diagram.steps.length - 1;
  const named = useMemo(() => [...new Set(diagram.steps.flatMap((s) => s.highlight))], [diagram]);

  // Le SVG est réinjecté quand le schéma change (changement de module), pas à chaque étape.
  const svgHtml = useMemo(() => ({ __html: diagram.svg }), [diagram.svg]);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [diagram]);

  useEffect(() => {
    const root = svgRef.current;
    if (!root) return;
    const current = new Set(diagram.steps[step]?.highlight ?? []);
    for (const id of named) {
      const el = root.querySelector(`[id="${CSS.escape(id)}"]`);
      if (!el) continue;
      el.classList.toggle('deep-hl', current.has(id));
      el.classList.toggle('deep-dim', !current.has(id));
    }
  }, [step, named, diagram]);

  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setStep((s) => Math.min(s + 1, last)), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, step, last]);

  const current = diagram.steps[step];

  return (
    <figure className="my-6 rounded-lg border bg-card">
      <figcaption className="border-b px-4 py-3">
        <p className="font-semibold">{diagram.title}</p>
        <p className="text-sm text-muted-foreground">{diagram.description}</p>
        <p className="mt-1 text-xs text-muted-foreground">Schéma illustratif : les formes et les courbes sont dessinées, pas calculées.</p>
      </figcaption>
      <div className="relative overflow-x-auto p-2" tabIndex={0} role="region" aria-label={`Schéma\u00A0: ${diagram.title}`}>
        <div ref={svgRef} className="deep-diagram min-w-[560px]" aria-hidden="true" dangerouslySetInnerHTML={svgHtml} />
      </div>
      <ScrollHint className="px-4 pb-2" />
      <div className="border-t px-4 py-3">
        <div aria-live="polite">
          <p className="font-medium">
            Étape {step + 1} sur {diagram.steps.length} : {current.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed">{current.explanation}</p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Précédente
          </Button>
          <Button variant="outline" size="sm" onClick={() => setStep((s) => Math.min(last, s + 1))} disabled={step === last}>
            Suivante
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          {!reducedMotion && last > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (!playing && step === last) setStep(0);
                setPlaying((p) => !p);
              }}
            >
              {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              {playing ? 'Pause' : 'Lecture automatique'}
            </Button>
          )}
        </div>
      </div>
    </figure>
  );
};

export default StepDiagram;
