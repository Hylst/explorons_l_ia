import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const CASES = [
  { score: 0.95, label: 1 },
  { score: 0.9, label: 1 },
  { score: 0.86, label: 1 },
  { score: 0.82, label: 0 },
  { score: 0.78, label: 1 },
  { score: 0.74, label: 1 },
  { score: 0.7, label: 0 },
  { score: 0.66, label: 1 },
  { score: 0.62, label: 0 },
  { score: 0.58, label: 1 },
  { score: 0.54, label: 0 },
  { score: 0.5, label: 0 },
  { score: 0.46, label: 1 },
  { score: 0.42, label: 0 },
  { score: 0.38, label: 0 },
  { score: 0.34, label: 1 },
  { score: 0.3, label: 0 },
  { score: 0.24, label: 0 },
  { score: 0.16, label: 0 },
  { score: 0.08, label: 1 },
];

const ThresholdLab: React.FC = () => {
  const [threshold, setThreshold] = useState(0.7);
  const metrics = useMemo(() => {
    const accepted = CASES.filter((c) => c.score >= threshold);
    const errors = accepted.filter((c) => c.label === 0).length;
    const missed = CASES.filter((c) => c.score < threshold && c.label === 1).length;
    return { accepted: accepted.length, errors, missed };
  }, [threshold]);

  return (
    <Card className="my-6 border-primary/30 bg-primary/5" data-print-hide>
      <CardContent className="p-4 sm:p-5">
        <h3 className="mb-1 text-lg font-semibold">Laboratoire : choisir un seuil</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Scénario illustratif avec 20 cas et des scores fixes. Ce n'est pas la mesure d'un modèle réel.
        </p>
        <label htmlFor="seuil-jev" className="mb-2 block text-sm font-medium">
          Seuil d'acceptation : {threshold.toFixed(2)}
        </label>
        <input
          id="seuil-jev"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-3" aria-live="polite">
          <div className="rounded-md border bg-background p-3">
            <p className="text-xs text-muted-foreground">Acceptés</p>
            <p className="text-xl font-semibold">{metrics.accepted}/20</p>
          </div>
          <div className="rounded-md border bg-background p-3">
            <p className="text-xs text-muted-foreground">Erreurs acceptées</p>
            <p className="text-xl font-semibold text-red-700 dark:text-red-400">{metrics.errors}</p>
          </div>
          <div className="rounded-md border bg-background p-3">
            <p className="text-xs text-muted-foreground">Positifs manqués</p>
            <p className="text-xl font-semibold text-amber-700 dark:text-amber-400">{metrics.missed}</p>
          </div>
        </div>
        <div className="space-y-1" aria-hidden="true">
          {CASES.map((c, index) => {
            const accepted = c.score >= threshold;
            return (
              <div key={index} className="flex items-center gap-2 text-xs">
                <span className="w-10 tabular-nums text-muted-foreground">{c.score.toFixed(2)}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className={accepted ? 'h-full bg-primary' : 'h-full bg-muted-foreground/30'} style={{ width: `${c.score * 100}%` }} />
                </div>
                <span className={c.label ? 'w-12 text-emerald-700 dark:text-emerald-400' : 'w-12 text-red-700 dark:text-red-400'}>
                  {c.label ? 'positif' : 'négatif'}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Un seuil bas accepte plus de cas et laisse passer plus d'erreurs. Un seuil haut réduit la couverture et peut manquer des positifs. Le bon compromis dépend du coût des deux erreurs.
        </p>
      </CardContent>
    </Card>
  );
};

export default ThresholdLab;
