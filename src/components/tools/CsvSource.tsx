// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useRef, useState } from 'react';
import { FileUp, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CSV_LIMITS } from '@/lib/dataTools/csv';
import { parseCsvAsync } from '@/lib/dataTools/workerClient';
import { readTextFile } from '@/lib/files';

export interface LoadedTable {
  name: string;
  headers: string[];
  rows: string[][];
  /** Remarques sur la lecture (lignes irrégulières, fichier coupé...). */
  notes: string[];
  /** Vrai pour un jeu d'exemple fictif. */
  sample: boolean;
}

interface CsvSourceProps {
  onLoad: (table: LoadedTable) => void;
  sampleLabel: string;
  loadSample: () => { headers: string[]; rows: string[][] };
  current?: LoadedTable | null;
}

const separatorName = (d: string) => (d === ';' ? 'point-virgule' : d === '\t' ? 'tabulation' : 'virgule');

/** Choix d'un fichier CSV (lu dans le navigateur, jamais envoyé) ou d'un jeu d'exemple fictif. */
const CsvSource: React.FC<CsvSourceProps> = ({ onLoad, sampleLabel, loadSample, current }) => {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setError(null);
    if (file.size > CSV_LIMITS.maxBytes) {
      setError(`Fichier trop volumineux (${(file.size / 1048576).toFixed(1).replace('.', ',')} Mo)\u00A0: la limite est de 5 Mo, pour que le calcul reste rapide dans le navigateur.`);
      return;
    }
    setBusy(true);
    try {
      // L'analyse du texte se fait dans un Web Worker : la page reste utilisable sur un gros fichier.
      const parsed = await parseCsvAsync(await readTextFile(file));
      if (parsed.rows.length === 0) throw new Error('Le fichier ne contient qu’une ligne d’en-tête.');
      const notes = [`Séparateur détecté\u00A0: ${separatorName(parsed.delimiter)}.`];
      if (parsed.irregularRows) notes.push(`${parsed.irregularRows} ligne(s) n'avaient pas le même nombre de champs que l'en-tête (complétées ou coupées).`);
      if (parsed.truncated) notes.push(`Seules les ${CSV_LIMITS.maxRows.toLocaleString('fr-FR')} premières lignes ont été lues.`);
      onLoad({ name: file.name, headers: parsed.headers, rows: parsed.rows, notes, sample: false });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lecture impossible.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">1. Choisir les données</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => input.current?.click()} disabled={busy}>
            <FileUp className="h-4 w-4 mr-2" aria-hidden="true" />
            {busy ? 'Lecture...' : 'Choisir un fichier CSV'}
          </Button>
          <Button
            variant="outline"
            disabled={busy}
            onClick={() => {
              setError(null);
              onLoad({ name: sampleLabel, ...loadSample(), notes: [], sample: true });
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
            Charger l'exemple fictif
          </Button>
          <input
            ref={input}
            type="file"
            accept=".csv,.tsv,.txt,text/csv"
            onChange={handleFile}
            className="hidden"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
          Le fichier est lu par votre navigateur : il n'est envoyé nulle part et n'est pas conservé après la fermeture
          de la page. Limite : 5 Mo, {CSV_LIMITS.maxRows.toLocaleString('fr-FR')} lignes, {CSV_LIMITS.maxColumns} colonnes.
          Première ligne attendue : les noms de colonnes.
        </p>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {current && (
          <div className="text-sm rounded-md bg-muted/50 p-3 space-y-1" aria-live="polite">
            <p>
              <strong>{current.name}</strong> : {current.rows.length.toLocaleString('fr-FR')} ligne(s),{' '}
              {current.headers.length} colonne(s)
              {current.sample && ' (données fictives, générées pour la démonstration)'}.
            </p>
            {current.notes.map((note) => (
              <p key={note} className="text-muted-foreground">
                {note}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CsvSource;
