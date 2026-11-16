// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Download, Eraser, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { dataSource, DataError, MODEL_TEST_GRID_ID, MODEL_TEST_GRID_LIMITS, type ModelTestGrid } from '@/lib/data';
import { downloadFile, toCsv, todayStamp } from '@/lib/files';

interface TestGridProps {
  models: { id: string; name: string }[];
  /**
   * Sélectionne dans le comparateur les modèles dont les identifiants sont donnés (ceux qu'une grille enregistrée a
   * notés). La page ne retient que ceux qui existent encore dans sa liste et renvoie les identifiants introuvables.
   */
  onSelectModels: (ids: string[]) => string[];
}

const SCORES = [1, 2, 3, 4, 5];

/** Délai avant l'écriture dans le navigateur, pour ne pas écrire à chaque frappe. */
const SAVE_DELAY_MS = 500;
const STORAGE_TOAST_ID = 'grille-test-stockage';

/** Contenu de la grille en mémoire. Les notes sont rangées par `rang:identifiant du modèle`. */
interface GridState {
  examples: string[];
  scores: Record<string, number>;
}

const emptyGrid = (): GridState => ({ examples: ['', '', ''], scores: {} });

const scoreKey = (row: number, model: string) => `${row}:${model}`;
/** Sépare `rang:identifiant` au premier deux-points (un identifiant de modèle peut en contenir). */
const splitKey = (k: string): [number, string] => [Number(k.slice(0, k.indexOf(':'))), k.slice(k.indexOf(':') + 1)];

/** Une grille sans texte ni note n'a rien à garder : le stockage est alors vidé plutôt que rempli. */
const isEmptyGrid = (grid: GridState) =>
  grid.examples.every((ex) => ex.trim() === '') && Object.keys(grid.scores).length === 0;

const fromStored = (stored: ModelTestGrid): GridState => ({
  examples: stored.examples,
  scores: Object.fromEntries(stored.scores.map((s) => [scoreKey(s.example, s.model), s.score])),
});

const toStored = (grid: GridState, names: Record<string, string>): ModelTestGrid => {
  const scores = Object.entries(grid.scores).map(([k, score]) => {
    const [example, model] = splitKey(k);
    return { example, model, score };
  });
  const rated = [...new Set(scores.map((s) => s.model))];
  return {
    id: MODEL_TEST_GRID_ID,
    examples: grid.examples,
    models: rated.map((id) => ({ id, name: names[id] ?? id })),
    scores,
    updatedAt: new Date().toISOString(),
  };
};

/** Écrit (ou efface) la grille. Un stockage plein ou désactivé ne bloque pas la grille : un message suffit. */
const persist = async (grid: GridState, names: Record<string, string>) => {
  try {
    if (isEmptyGrid(grid)) await dataSource.testGrids.clear();
    else await dataSource.testGrids.add(toStored(grid, names));
  } catch (error) {
    toast.error("La grille n'a pas pu être enregistrée, mais elle reste utilisable.", {
      id: STORAGE_TOAST_ID,
      description: error instanceof DataError ? error.message : undefined,
    });
  }
};

/**
 * Grille de test personnelle : le visiteur écrit ses exemples, soumet chacun aux modèles de son côté, puis note
 * les réponses. Les moyennes ne valent que pour ces exemples et cette notation ; rien n'est appelé ni mesuré ici.
 * La grille est enregistrée dans le navigateur (collection `testGrids` de la couche de données). Les notes sont
 * rattachées à l'identifiant du modèle : un modèle retiré de la sélection garde ses notes, mais les moyennes et
 * l'export ne portent que sur les modèles sélectionnés.
 */
const TestGrid: React.FC<TestGridProps> = ({ models, onSelectModels }) => {
  const [grid, setGrid] = useState<GridState>(emptyGrid);
  const [loaded, setLoaded] = useState(false);
  /** Modèles notés dans la grille enregistrée (relus du stockage), pour proposer de les reprendre sans sélection. */
  const [savedModels, setSavedModels] = useState<{ id: string; name: string }[]>([]);
  const { examples, scores } = grid;

  /** Vrai dès que le visiteur a modifié la grille : avant, rien n'est écrit (relire ne doit pas réécrire). */
  const edited = useRef(false);
  /** Noms affichés des modèles, y compris ceux qui ne sont plus sélectionnés (relus du stockage). */
  const names = useRef<Record<string, string>>({});
  /** Écriture en attente (délai non écoulé) : lancée si le visiteur quitte l'onglet ou la page avant. */
  const pendingSave = useRef<(() => void) | null>(null);

  useEffect(() => {
    for (const m of models) names.current[m.id] = m.name;
  }, [models]);

  // Chargement au montage.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [stored] = await dataSource.testGrids.list();
        if (stored && !cancelled && !edited.current) {
          for (const m of stored.models) if (!(m.id in names.current)) names.current[m.id] = m.name;
          setGrid(fromStored(stored));
          setSavedModels(stored.models);
        }
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Enregistrement automatique, 500 ms après la dernière modification.
  useEffect(() => {
    if (!loaded || !edited.current) return;
    const save = () => {
      pendingSave.current = null;
      void persist(grid, names.current);
    };
    pendingSave.current = save;
    const timer = window.setTimeout(save, SAVE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [loaded, grid]);

  // Changement d'onglet ou fermeture de la page pendant le délai : on écrit tout de suite.
  useEffect(() => {
    const flush = () => pendingSave.current?.();
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);

  const edit = (change: (current: GridState) => GridState) => {
    edited.current = true;
    setGrid(change);
  };

  const setExample = (row: number, text: string) =>
    edit((g) => ({ ...g, examples: g.examples.map((x, i) => (i === row ? text : x)) }));

  const addExample = () => edit((g) => ({ ...g, examples: [...g.examples, ''] }));

  const setScore = (row: number, model: string, value: number) =>
    edit((g) => {
      const next = { ...g.scores };
      if (next[scoreKey(row, model)] === value) delete next[scoreKey(row, model)];
      else next[scoreKey(row, model)] = value;
      return { ...g, scores: next };
    });

  const removeExample = (row: number) =>
    edit((g) => {
      const next: Record<string, number> = {};
      for (const [k, v] of Object.entries(g.scores)) {
        const [r, m] = splitKey(k);
        if (r < row) next[k] = v;
        else if (r > row) next[scoreKey(r - 1, m)] = v;
      }
      return { examples: g.examples.filter((_, i) => i !== row), scores: next };
    });

  const clearGrid = () => {
    edit(emptyGrid);
    toast.success('Grille vidée');
  };

  const selectedIds = new Set(models.map((m) => m.id));
  const summary = models.map((m) => {
    const values = examples.map((_, i) => scores[scoreKey(i, m.id)]).filter((v): v is number => v !== undefined);
    return { ...m, count: values.length, mean: values.length ? values.reduce((a, b) => a + b, 0) / values.length : NaN };
  });
  /** Notes de modèles qui ne sont pas (ou plus) sélectionnés : gardées, mais hors des moyennes. */
  const hiddenScores = Object.keys(scores).filter((k) => {
    const [row, model] = splitKey(k);
    return row < examples.length && !selectedIds.has(model);
  }).length;

  const exportCsv = () =>
    downloadFile(
      toCsv(
        ['Exemple', ...models.map((m) => m.name)],
        [
          ...examples.map((ex, i) => [ex || `Exemple ${i + 1}`, ...models.map((m) => scores[scoreKey(i, m.id)] ?? '')]),
          ['Moyenne', ...summary.map((s) => (Number.isFinite(s.mean) ? s.mean.toFixed(2) : ''))],
        ]
      ),
      `grille-test-modeles-${todayStamp()}.csv`,
      'text/csv;charset=utf-8'
    );

  /** Les cinq boutons de note d'un modèle pour un exemple (même logique dans le tableau et dans les blocs mobiles). */
  const scoreButtons = (row: number, model: { id: string; name: string }, buttonClass: string, groupClass: string) => (
    <div role="radiogroup" aria-label={`Note de ${model.name} pour l'exemple ${row + 1}`} className={groupClass}>
      {SCORES.map((s) => {
        const checked = scores[scoreKey(row, model.id)] === s;
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={`${s} sur 5`}
            onClick={() => setScore(row, model.id, s)}
            className={`${buttonClass} rounded border ${checked ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );

  const meanLabel = (s: (typeof summary)[number]) =>
    Number.isFinite(s.mean) ? `${s.mean.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} (${s.count})` : '-';

  /** Reprend les modèles notés de la grille enregistrée ; signale ceux que la liste du comparateur ne contient plus. */
  const resumeSavedModels = () => {
    const missing = new Set(onSelectModels(savedModels.map((m) => m.id)));
    if (missing.size === 0) return;
    const lost = savedModels.filter((m) => missing.has(m.id)).map((m) => m.name);
    toast.warning(
      `${lost.length > 1 ? 'Ces modèles ne figurent' : 'Ce modèle ne figure'} plus dans le comparateur\u00A0: ${lost.join(', ')}.`
    );
  };

  if (models.length === 0) {
    const hasSavedGrid = loaded && !isEmptyGrid(grid);
    const exampleCount = `${examples.length} exemple${examples.length > 1 ? 's' : ''}`;
    const modelCount = `${savedModels.length} modèle${savedModels.length > 1 ? 's' : ''} noté${savedModels.length > 1 ? 's' : ''}`;
    return (
      <Card>
        <CardContent className="space-y-4 p-8 text-center text-muted-foreground">
          <p>Sélectionnez d'abord des modèles dans l'onglet « Parcourir les modèles ».</p>
          {hasSavedGrid && (
            <div className="space-y-3">
              <p>
                {savedModels.length > 0
                  ? `Une grille enregistrée existe (${exampleCount}, ${modelCount}\u00A0: ${savedModels.map((m) => m.name).join(', ')}).`
                  : `Une grille enregistrée existe (${exampleCount}, aucun modèle noté).`}
              </p>
              {savedModels.length > 0 && (
                <Button variant="outline" onClick={resumeSavedModels}>
                  Reprendre ces modèles
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ma grille de test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ol className="list-decimal pl-5 text-sm space-y-1 text-muted-foreground">
          <li>Écrivez quelques demandes tirées de votre usage réel (une par ligne).</li>
          <li>Soumettez-les vous-même à chaque modèle, sur son site ou par son API : cet outil n'appelle aucun modèle.</li>
          <li>Notez chaque réponse de 1 (inutilisable) à 5 (parfaite), idéalement sans savoir quel modèle l'a produite.</li>
        </ol>
        <div className="space-y-4 sm:hidden">
          <ul aria-label="Grille de notation" className="grid grid-cols-1 gap-4">
            {examples.map((ex, row) => (
              <li key={row} className="space-y-3 rounded-lg border p-3">
                <Input
                  value={ex}
                  maxLength={MODEL_TEST_GRID_LIMITS.exampleLength}
                  placeholder={`Exemple ${row + 1}\u00A0: votre demande`}
                  aria-label={`Texte de l'exemple ${row + 1}`}
                  onChange={(e) => setExample(row, e.target.value)}
                />
                {models.map((m) => (
                  <div key={m.id} className="space-y-1">
                    <p className="text-sm font-medium break-words">{m.name}</p>
                    {scoreButtons(row, m, 'h-10 w-10 text-sm', 'flex gap-2')}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="min-h-10"
                  disabled={examples.length === 1}
                  onClick={() => removeExample(row)}
                  aria-label={`Retirer l'exemple ${row + 1}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Retirer
                </Button>
              </li>
            ))}
          </ul>
          <div>
            <p className="text-sm font-medium">Moyenne (nombre de notes)</p>
            <ul className="mt-1 divide-y rounded-lg border text-sm">
              {summary.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 px-3 py-2">
                  <span className="min-w-0 break-words">{s.name}</span>
                  <span className="font-semibold whitespace-nowrap">{meanLabel(s)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div tabIndex={0} role="region" aria-label="Grille de notation" className="relative hidden max-w-full overflow-x-auto sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th scope="col" className="py-2 pr-3 min-w-56">Exemple</th>
                {models.map((m) => (
                  <th key={m.id} scope="col" className="py-2 pr-3 whitespace-nowrap">
                    {m.name}
                  </th>
                ))}
                <th scope="col" className="py-2">
                  <span className="sr-only">Retirer</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {examples.map((ex, row) => (
                <tr key={row} className="border-b align-middle">
                  <td className="py-2 pr-3">
                    <Input
                      value={ex}
                      maxLength={MODEL_TEST_GRID_LIMITS.exampleLength}
                      placeholder={`Exemple ${row + 1}\u00A0: votre demande`}
                      aria-label={`Texte de l'exemple ${row + 1}`}
                      onChange={(e) => setExample(row, e.target.value)}
                    />
                  </td>
                  {models.map((m) => (
                    <td key={m.id} className="py-2 pr-3">
                      {scoreButtons(row, m, 'h-7 w-7 text-xs', 'flex gap-1')}
                    </td>
                  ))}
                  <td className="py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={examples.length === 1}
                      onClick={() => removeExample(row)}
                      aria-label={`Retirer l'exemple ${row + 1}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" className="py-2 pr-3 text-left">
                  Moyenne (nombre de notes)
                </th>
                {summary.map((s) => (
                  <td key={s.id} className="py-2 pr-3 font-semibold whitespace-nowrap">
                    {meanLabel(s)}
                  </td>
                ))}
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={addExample} disabled={examples.length >= MODEL_TEST_GRID_LIMITS.examples}>
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Ajouter un exemple
          </Button>
          <Button variant="outline" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Exporter la grille (CSV)
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                disabled={isEmptyGrid(grid)}
                aria-label="Vider la grille : effacer tous les exemples et toutes les notes"
              >
                <Eraser className="h-4 w-4 mr-2" aria-hidden="true" />
                Vider la grille
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Vider la grille ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tous les exemples et toutes les notes seront effacés de ce navigateur, y compris les notes des modèles
                  qui ne sont pas sélectionnés en ce moment. Cette action est définitive : exportez d'abord la grille
                  si vous voulez la garder.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={clearGrid}>Vider la grille</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {hiddenScores > 0 && (
          <p className="text-xs text-muted-foreground">
            {hiddenScores} note(s) de modèles non sélectionnés en ce moment sont gardées : elles ne comptent pas dans les
            moyennes et reviennent si vous resélectionnez ces modèles.
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          La grille est enregistrée dans ce navigateur, sur cet appareil. Pour la sauvegarder, vous pouvez l'exporter en
          CSV ou passer par la page{' '}
          <Link to="/gestion-donnees-rgpd" className="text-primary underline underline-offset-2">
            « Vos données locales »
          </Link>
          . Avec peu d'exemples, un écart d'un demi-point entre deux modèles ne veut pas dire grand-chose ; regardez
          surtout les réponses inutilisables.
        </p>
      </CardContent>
    </Card>
  );
};

export default TestGrid;
