// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, CircleAlert, ListChecks } from 'lucide-react';
import { toast } from 'sonner';
import SimulationNotice from '@/components/common/SimulationNotice';
import {
  MAX_PROMPT_LENGTH,
  MIN_PROMPT_LENGTH,
  asksForFormat,
  definesRole,
  hasReasonableLength,
  hasStructuredInstructions,
  hasUnfilledPlaceholder
} from './structureChecks';

interface Check {
  id: string;
  label: string;
  ok: boolean;
  advice: string;
  /** Ligne à ajouter au prompt, avec un emplacement à compléter, quand le critère n'est pas rempli. */
  addition?: string;
}

interface PromptOptimizerProps {
  prompt: string;
  onOptimizedPrompt: (optimizedPrompt: string) => void;
}

/** Règles simples et déterministes : elles reconnaissent des mots et une forme, elles ne jugent pas le fond. */
const evaluate = (prompt: string): Check[] => {
  const lower = prompt.toLowerCase();
  const tooShort = prompt.trim().length < MIN_PROMPT_LENGTH;
  const tooLong = prompt.length > MAX_PROMPT_LENGTH;
  return [
    {
      id: 'length',
      label: 'Longueur raisonnable',
      ok: hasReasonableLength(prompt),
      advice: tooShort
        ? "Le prompt est très court\u00A0: ajoutez du contexte (objectif, public visé, contraintes)."
        : "Le prompt est très long\u00A0: vérifiez que chaque partie est utile et envisagez de le raccourcir.",
      addition: tooShort ? 'Contexte : [objectif, public visé, contraintes]' : undefined
    },
    {
      id: 'role',
      label: 'Rôle ou point de vue défini',
      ok: definesRole(prompt),
      advice: 'Précisez un rôle ou un point de vue, par exemple «\u00A0Tu es un relecteur technique attentif aux erreurs\u00A0».',
      addition: 'Rôle : [qui doit répondre ?]'
    },
    {
      id: 'structure',
      label: 'Consignes structurées',
      ok: hasStructuredInstructions(prompt),
      advice: 'Structurez les consignes (liste à puces, étapes numérotées ou sections) pour qu\'aucune ne soit noyée.'
    },
    {
      id: 'format',
      label: 'Format de réponse demandé',
      ok: asksForFormat(prompt),
      advice: 'Indiquez le format attendu\u00A0: liste, tableau, longueur maximale, langue, niveau de détail.',
      addition: 'Format de réponse : [liste, tableau, longueur, langue]'
    },
    {
      id: 'placeholders',
      label: 'Aucun champ laissé à compléter',
      ok: !hasUnfilledPlaceholder(prompt),
      advice:
        'Le prompt contient encore «\u00A0[non spécifié]\u00A0» ou des emplacements entre crochets\u00A0: remplacez-les, sinon le modèle devinera à votre place. Un titre de section seul sur sa ligne («\u00A0[Contexte]\u00A0») n\'est pas compté.'
    },
    {
      id: 'examples',
      label: 'Exemple fourni',
      ok: /exemple|\bex\s?:/.test(lower),
      advice: 'Un ou deux exemples du résultat attendu guident souvent mieux que de longues explications.',
      addition: 'Exemple du résultat attendu : [à renseigner]'
    }
  ];
};

const PromptOptimizer: React.FC<PromptOptimizerProps> = ({ prompt, onOptimizedPrompt }) => {
  const checks = useMemo(() => evaluate(prompt), [prompt]);
  const missing = checks.filter((check) => !check.ok);
  const fulfilled = checks.length - missing.length;

  const suggestedAdditions = missing.map((check) => check.addition).filter((line): line is string => Boolean(line));
  const [draft, setDraft] = useState('');

  // Le complément proposé repart du prompt courant à chaque modification de celui-ci.
  const proposal = useMemo(
    () => (suggestedAdditions.length > 0 ? `${prompt.trimEnd()}\n\n${suggestedAdditions.join('\n')}` : ''),
    [prompt, suggestedAdditions]
  );
  const editable = draft !== '' ? draft : proposal;

  // Un nouveau prompt annule les modifications en cours du complément suggéré.
  useEffect(() => setDraft(''), [prompt]);

  const apply = () => {
    onOptimizedPrompt(editable);
    setDraft('');
    toast.success('Prompt mis à jour\u00A0: pensez à remplacer les éléments entre crochets.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" aria-hidden="true" />
            Vérification de la structure du prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SimulationNotice>
            Cette vérification applique six règles simples (longueur, rôle, structure, format, champs à compléter, exemple) : elle reconnaît
            des mots et une forme, pas la qualité du fond. Aucun modèle n'est consulté. Un prompt qui coche toutes les
            cases n'est pas pour autant efficace : testez-le avec votre modèle.
          </SimulationNotice>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Critères remplis</span>
              <span className="text-sm font-bold">
                {fulfilled} sur {checks.length}
              </span>
            </div>
            <Progress value={(fulfilled / checks.length) * 100} className="w-full" aria-label="Critères remplis" />
          </div>

          <ul className="space-y-3">
            {checks.map((check) => (
              <li key={check.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                {check.ok ? (
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-green-700 dark:text-green-400" aria-label="Critère rempli" />
                ) : (
                  <CircleAlert className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" aria-label="Critère à améliorer" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{check.label}</p>
                  {!check.ok && <p className="text-sm text-muted-foreground">{check.advice}</p>}
                </div>
              </li>
            ))}
          </ul>

          {proposal !== '' && (
            <div className="space-y-2 pt-2 border-t">
              <h4 className="font-medium">Compléments suggérés (à renseigner)</h4>
              <p className="text-sm text-muted-foreground">
                Les lignes ajoutées en bas du prompt contiennent des emplacements entre crochets à remplir avant de
                l'utiliser.
              </p>
              <Textarea
                value={editable}
                onChange={(event) => setDraft(event.target.value)}
                className="min-h-[140px]"
                aria-label="Prompt avec compléments suggérés"
              />
              <Button onClick={apply} className="w-full" variant="default">
                Utiliser cette version
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptOptimizer;
