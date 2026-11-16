// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, CircleAlert, Copy, Download, FlaskConical, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { downloadFile, toCsv, todayStamp } from '@/lib/files';
import {
  asksForFormat,
  definesRole,
  hasReasonableLength,
  hasStructuredInstructions,
  hasUnfilledPlaceholder
} from './structureChecks';

const LABELS = ['A', 'B', 'C'];

/** Cinq règles de forme, partagées avec la vérification d'un prompt unique. */
const structureChecks = (prompt: string) => [
  { label: 'Longueur utile', ok: hasReasonableLength(prompt) },
  { label: 'Rôle ou point de vue', ok: definesRole(prompt) },
  { label: 'Consignes structurées', ok: hasStructuredInstructions(prompt) },
  { label: 'Format de réponse', ok: asksForFormat(prompt) },
  { label: 'Aucun champ à compléter', ok: !hasUnfilledPlaceholder(prompt) }
];

interface PromptComparisonLabProps {
  /** Trois variantes contrôlées par la page : elles survivent au changement d'onglet. */
  variants: string[];
  onVariantsChange: (variants: string[]) => void;
  /** Prompt en cours de construction, repris à la demande dans la première variante libre. */
  sourcePrompt?: string;
}

/**
 * Compare la structure de trois variantes de prompt. Les indices portent sur la forme,
 * pas sur la qualité d'une réponse : aucun modèle n'est appelé.
 */
const PromptComparisonLab: React.FC<PromptComparisonLabProps> = ({ variants, onVariantsChange, sourcePrompt = '' }) => {
  const results = useMemo(() => variants.map((prompt) => {
    const checks = structureChecks(prompt);
    return { checks, score: checks.filter((check) => check.ok).length };
  }), [variants]);

  const update = (index: number, value: string) =>
    onVariantsChange(variants.map((prompt, position) => (position === index ? value : prompt)));

  const reuseSource = () => {
    const emptyIndex = variants.findIndex((prompt) => prompt.trim() === '');
    const index = emptyIndex === -1 ? 0 : emptyIndex;
    update(index, sourcePrompt);
    toast.success(`Prompt en cours repris dans la variante ${LABELS[index]}.`);
  };

  const copy = async () => {
    const text = variants.map((prompt, index) => `Variante ${LABELS[index]}\n${prompt}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Variantes copiées.');
    } catch {
      toast.error('Copie impossible dans ce navigateur.');
    }
  };

  const download = () => {
    const rows = variants.map((prompt, index) => {
      const result = results[index];
      const checks = result.checks.map((check) => `${check.label}: ${check.ok ? 'oui' : 'non'}`).join(' · ');
      return [`Variante ${LABELS[index]}`, prompt, `${result.score}/5`, checks];
    });
    downloadFile(
      toCsv(['Variante', 'Prompt', 'Indice structurel', 'Critères'], rows),
      `comparaison-prompts-${todayStamp()}.csv`,
      'text/csv;charset=utf-8'
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5" aria-hidden="true" />
          Comparer des variantes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm text-muted-foreground">
          Collez jusqu'à trois variantes. L'indice porte uniquement sur la structure (longueur, rôle, format,
          organisation, champs à compléter)&nbsp;: il ne mesure ni la vérité, ni la qualité d'une réponse. Aucun
          modèle n'est appelé. Testez ensuite les variantes avec le modèle de votre choix.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {variants.map((prompt, index) => (
            <div key={LABELS[index]} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor={`variant-${index}`} className="font-medium">Variante {LABELS[index]}</label>
                <Badge variant={results[index].score >= 4 ? 'secondary' : 'outline'}>
                  {results[index].score}/5
                </Badge>
              </div>
              <Textarea
                id={`variant-${index}`}
                value={prompt}
                onChange={(event) => update(index, event.target.value)}
                placeholder={`Variante ${LABELS[index]}\u00A0: collez un prompt…`}
                className="min-h-[180px] text-sm"
              />
              <ul className="space-y-1">
                {results[index].checks.map((check) => (
                  <li key={check.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    {check.ok
                      ? <CheckCircle2 className="h-3.5 w-3.5 text-green-700 dark:text-green-400" aria-hidden="true" />
                      : <CircleAlert className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />}
                    <span className="sr-only">{check.ok ? 'Présent' : 'Absent'}&nbsp;:</span>
                    {check.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={reuseSource} disabled={!sourcePrompt.trim()}>
            <Wand2 className="h-4 w-4" /> Reprendre le prompt en cours
          </Button>
          <Button variant="outline" size="sm" onClick={copy}>
            <Copy className="h-4 w-4" /> Copier les variantes
          </Button>
          <Button variant="outline" size="sm" onClick={download}>
            <Download className="h-4 w-4" /> Exporter en CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptComparisonLab;
