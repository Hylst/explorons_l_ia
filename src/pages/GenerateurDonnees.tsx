// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowDown, ArrowUp, Dices, Download, Plus, SearchCheck, Trash2, Wand2 } from 'lucide-react';
import ToolHeader from '@/components/tools/ToolHeader';
import TablePreview from '@/components/tools/TablePreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateTable, validateSpecs, MAX_SYNTH_ROWS, type ColumnSpec } from '@/lib/dataTools/synth';
import { SYNTH_PRESETS } from '@/lib/dataTools/samples';
import { downloadFile, toCsv, todayStamp } from '@/lib/files';

type Kind = ColumnSpec['kind'];

const KINDS: { value: Kind; label: string; help: string }[] = [
  { value: 'identifiant', label: 'Identifiant', help: 'Numéro de ligne avec un préfixe (A001, A002...).' },
  { value: 'entier', label: 'Entier', help: 'Nombre entier tiré au hasard entre deux bornes, chaque valeur ayant la même chance.' },
  { value: 'décimal', label: 'Décimal', help: 'Loi uniforme entre deux bornes, ou loi normale (moyenne, écart-type).' },
  { value: 'linéaire', label: 'Dépend d’une colonne', help: 'y = pente × x + ordonnée à l’origine + bruit gaussien\u00A0: crée une relation connue à retrouver.' },
  { value: 'catégorie', label: 'Catégorie', help: 'Valeurs séparées par des virgules, avec un poids facultatif («\u00A0oui:3, non:1\u00A0»).' },
  { value: 'booléen', label: 'Oui / non', help: '«\u00A0oui\u00A0» avec la probabilité choisie.' },
  { value: 'date', label: 'Date', help: 'Jour tiré au hasard entre deux dates.' },
];

function defaultSpec(kind: Kind, name: string, existing: ColumnSpec[]): ColumnSpec {
  switch (kind) {
    case 'identifiant':
      return { kind, name, prefix: 'ID' };
    case 'entier':
      return { kind, name, min: 0, max: 100, missingRate: 0 };
    case 'décimal':
      return { kind, name, distribution: 'normale', a: 50, b: 10, decimals: 2, missingRate: 0 };
    case 'linéaire': {
      const source = existing.find((s) => ['entier', 'décimal', 'linéaire'].includes(s.kind))?.name ?? '';
      return { kind, name, source, slope: 2, intercept: 0, noise: 1, decimals: 2, missingRate: 0 };
    }
    case 'catégorie':
      return { kind, name, values: 'A:2, B:1', missingRate: 0 };
    case 'booléen':
      return { kind, name, probability: 0.5, missingRate: 0 };
    case 'date':
      return { kind, name, start: '2026-01-01', end: '2026-12-31', missingRate: 0 };
  }
}

const num = (value: string, fallback = 0) => {
  const n = Number(value.replace(',', '.'));
  return Number.isFinite(n) ? n : fallback;
};

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

const NumberField: React.FC<NumberFieldProps> = ({ id, label, value, onChange, step = 1, min, max }) => (
  <div className="min-w-0">
    <Label htmlFor={id} className="text-xs">
      {label}
    </Label>
    <Input id={id} type="number" inputMode="decimal" value={value} step={step} min={min} max={max} onChange={(e) => onChange(num(e.target.value))} />
  </div>
);

const GenerateurDonnees: React.FC = () => {
  const navigate = useNavigate();
  const [specs, setSpecs] = useState<ColumnSpec[]>(SYNTH_PRESETS[0].specs);
  const [rowCount, setRowCount] = useState(200);
  const [seed, setSeed] = useState(1);

  const problems = useMemo(() => validateSpecs(specs), [specs]);
  const table = useMemo(() => (problems.length ? null : generateTable(specs, rowCount, seed)), [specs, rowCount, seed, problems]);

  const update = (index: number, patch: Partial<ColumnSpec>) =>
    setSpecs((current) => current.map((s, i) => (i === index ? ({ ...s, ...patch } as ColumnSpec) : s)));
  const changeKind = (index: number, kind: Kind) =>
    setSpecs((current) => current.map((s, i) => (i === index ? defaultSpec(kind, s.name, current.slice(0, i)) : s)));
  const move = (index: number, delta: number) =>
    setSpecs((current) => {
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(index + delta, 0, item);
      return next;
    });
  const addColumn = () =>
    setSpecs((current) => {
      let n = current.length + 1;
      while (current.some((s) => s.name === `colonne_${n}`)) n++;
      return [...current, defaultSpec('entier', `colonne_${n}`, current)];
    });

  const exportCsv = () => {
    if (!table) return;
    downloadFile(toCsv(table.headers, table.rows), `donnees-fictives-${todayStamp()}-graine${seed}.csv`, 'text/csv;charset=utf-8');
  };

  const analyse = () => {
    if (!table) return;
    navigate('/analyseur-donnees', {
      state: { table: { name: `Données fictives (graine ${seed})`, headers: table.headers, rows: table.rows, notes: [], sample: true } },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <ToolHeader
          icon={Dices}
          title="Générateur de données synthétiques"
          subtitle="Fabriquer un tableau fictif pour s'exercer, tester un outil ou illustrer un cours"
          facts={[
            'Valeurs tirées de lois simples que vous choisissez',
            'Graine\u00A0: même réglage, même tableau, à chaque fois',
            'Calcul et export dans votre navigateur',
          ]}
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Partir d'un modèle</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SYNTH_PRESETS.map((preset) => (
              <Button key={preset.id} variant="outline" onClick={() => setSpecs(preset.specs)}>
                <Wand2 className="h-4 w-4 mr-2" aria-hidden="true" />
                {preset.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. Décrire les colonnes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              {specs.map((spec, index) => {
                const id = `col-${index}`;
                const help = KINDS.find((k) => k.value === spec.kind)?.help;
                return (
                  <li key={index} className="rounded-lg border p-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                      <div className="min-w-0">
                        <Label htmlFor={`${id}-name`} className="text-xs">
                          Nom de la colonne {index + 1}
                        </Label>
                        <Input id={`${id}-name`} value={spec.name} maxLength={60} onChange={(e) => update(index, { name: e.target.value })} />
                      </div>
                      <div className="min-w-0">
                        <Label htmlFor={`${id}-kind`} className="text-xs">
                          Type
                        </Label>
                        <Select value={spec.kind} onValueChange={(v) => changeKind(index, v as Kind)}>
                          <SelectTrigger id={`${id}-kind`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {KINDS.map((k) => (
                              <SelectItem key={k.value} value={k.value}>
                                {k.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="icon" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Monter la colonne «\u00A0${spec.name}\u00A0»`}>
                          <ArrowUp className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button variant="outline" size="icon" disabled={index === specs.length - 1} onClick={() => move(index, 1)} aria-label={`Descendre la colonne «\u00A0${spec.name}\u00A0»`}>
                          <ArrowDown className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          disabled={specs.length === 1}
                          onClick={() => setSpecs((current) => current.filter((_, i) => i !== index))}
                          aria-label={`Retirer la colonne «\u00A0${spec.name}\u00A0»`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {spec.kind === 'identifiant' && (
                        <div className="min-w-0">
                          <Label htmlFor={`${id}-prefix`} className="text-xs">
                            Préfixe
                          </Label>
                          <Input id={`${id}-prefix`} value={spec.prefix} maxLength={12} onChange={(e) => update(index, { prefix: e.target.value })} />
                        </div>
                      )}
                      {spec.kind === 'entier' && (
                        <>
                          <NumberField id={`${id}-min`} label="Minimum" value={spec.min} onChange={(n) => update(index, { min: Math.round(n) })} />
                          <NumberField id={`${id}-max`} label="Maximum" value={spec.max} onChange={(n) => update(index, { max: Math.round(n) })} />
                        </>
                      )}
                      {spec.kind === 'décimal' && (
                        <>
                          <div className="min-w-0">
                            <Label htmlFor={`${id}-dist`} className="text-xs">
                              Loi
                            </Label>
                            <Select value={spec.distribution} onValueChange={(v) => update(index, { distribution: v as 'uniforme' | 'normale' })}>
                              <SelectTrigger id={`${id}-dist`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="normale">Normale</SelectItem>
                                <SelectItem value="uniforme">Uniforme</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <NumberField id={`${id}-a`} label={spec.distribution === 'normale' ? 'Moyenne' : 'Minimum'} value={spec.a} step={0.1} onChange={(n) => update(index, { a: n })} />
                          <NumberField id={`${id}-b`} label={spec.distribution === 'normale' ? 'Écart-type' : 'Maximum'} value={spec.b} step={0.1} onChange={(n) => update(index, { b: n })} />
                          <NumberField id={`${id}-dec`} label="Décimales" value={spec.decimals} min={0} max={6} onChange={(n) => update(index, { decimals: Math.max(0, Math.min(6, Math.round(n))) })} />
                        </>
                      )}
                      {spec.kind === 'linéaire' && (
                        <>
                          <div className="min-w-0">
                            <Label htmlFor={`${id}-src`} className="text-xs">
                              Colonne x
                            </Label>
                            <Select value={spec.source || undefined} onValueChange={(v) => update(index, { source: v })}>
                              <SelectTrigger id={`${id}-src`}>
                                <SelectValue placeholder="Choisir" />
                              </SelectTrigger>
                              <SelectContent>
                                {specs
                                  .slice(0, index)
                                  .filter((s) => ['entier', 'décimal', 'linéaire'].includes(s.kind) && s.name.trim())
                                  .map((s) => (
                                    <SelectItem key={s.name} value={s.name}>
                                      {s.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <NumberField id={`${id}-slope`} label="Pente" value={spec.slope} step={0.1} onChange={(n) => update(index, { slope: n })} />
                          <NumberField id={`${id}-int`} label="Ordonnée à l'origine" value={spec.intercept} step={0.1} onChange={(n) => update(index, { intercept: n })} />
                          <NumberField id={`${id}-noise`} label="Bruit (écart-type)" value={spec.noise} step={0.1} min={0} onChange={(n) => update(index, { noise: Math.max(0, n) })} />
                        </>
                      )}
                      {spec.kind === 'catégorie' && (
                        <div className="col-span-2 min-w-0">
                          <Label htmlFor={`${id}-values`} className="text-xs">
                            Valeurs (poids facultatif)
                          </Label>
                          <Input id={`${id}-values`} value={spec.values} onChange={(e) => update(index, { values: e.target.value })} />
                        </div>
                      )}
                      {spec.kind === 'booléen' && (
                        <NumberField id={`${id}-p`} label="Probabilité de « oui »" value={spec.probability} step={0.05} min={0} max={1} onChange={(n) => update(index, { probability: Math.max(0, Math.min(1, n)) })} />
                      )}
                      {spec.kind === 'date' && (
                        <>
                          <div className="min-w-0">
                            <Label htmlFor={`${id}-start`} className="text-xs">
                              Du
                            </Label>
                            <Input id={`${id}-start`} type="date" value={spec.start} onChange={(e) => update(index, { start: e.target.value })} />
                          </div>
                          <div className="min-w-0">
                            <Label htmlFor={`${id}-end`} className="text-xs">
                              Au
                            </Label>
                            <Input id={`${id}-end`} type="date" value={spec.end} onChange={(e) => update(index, { end: e.target.value })} />
                          </div>
                        </>
                      )}
                      {'missingRate' in spec && (
                        <NumberField
                          id={`${id}-miss`}
                          label="Manquantes (%)"
                          value={Math.round(spec.missingRate * 100)}
                          min={0}
                          max={90}
                          onChange={(n) => update(index, { missingRate: Math.max(0, Math.min(90, n)) / 100 })}
                        />
                      )}
                    </div>
                    {help && <p className="text-xs text-muted-foreground">{help}</p>}
                  </li>
                );
              })}
            </ol>
            <Button variant="outline" onClick={addColumn} disabled={specs.length >= 30}>
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Ajouter une colonne
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3. Générer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(2,minmax(0,12rem))_auto] gap-3 items-end">
              <NumberField id="rows" label={`Nombre de lignes (1 à ${MAX_SYNTH_ROWS.toLocaleString('fr-FR')})`} value={rowCount} min={1} max={MAX_SYNTH_ROWS} onChange={(n) => setRowCount(Math.max(1, Math.min(MAX_SYNTH_ROWS, Math.round(n))))} />
              <NumberField id="seed" label="Graine" value={seed} min={0} onChange={(n) => setSeed(Math.max(0, Math.round(n)))} />
              <Button variant="outline" onClick={() => setSeed((s) => s + 1)}>
                <Dices className="h-4 w-4 mr-2" aria-hidden="true" />
                Autre tirage
              </Button>
            </div>

            {problems.length > 0 ? (
              <div role="alert">
                <ul className="text-sm text-destructive list-disc pl-6">
                  {problems.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ) : (
              table && (
                <>
                  <TablePreview headers={table.headers} rows={table.rows} limit={15} caption="Aperçu des quinze premières lignes générées" />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={exportCsv}>
                      <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                      Télécharger le CSV ({table.rows.length.toLocaleString('fr-FR')} lignes)
                    </Button>
                    <Button variant="outline" onClick={analyse}>
                      <SearchCheck className="h-4 w-4 mr-2" aria-hidden="true" />
                      Analyser ce tableau
                    </Button>
                  </div>
                </>
              )
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">À savoir</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              Ces données sont <strong>entièrement inventées</strong> : chaque colonne suit la loi que vous avez
              décrite, indépendamment des autres sauf pour les colonnes « dépend d'une colonne ». Elles ne ressemblent
              à aucune personne réelle, mais elles ne reproduisent pas non plus la complexité de données réelles
              (saisons, interactions, erreurs de saisie variées).
            </p>
            <p>
              Ce n'est pas un outil d'anonymisation. Les générateurs qui apprennent à partir d'un vrai fichier pour en
              produire une copie « synthétique » posent d'autres questions : une copie trop fidèle peut laisser
              retrouver des personnes. Pour juger qu'un jeu est anonyme, la CNIL reprend les trois critères de l'avis
              05/2014 du G29 (groupe des autorités européennes de protection des données) : impossible d'isoler une
              personne, de relier entre eux des jeux de données qui la concernent, ou de déduire une information sur elle.
            </p>
            <p className="text-muted-foreground">
              Idée d'exercice : créez une colonne qui dépend d'une autre avec une pente connue, ajoutez du bruit et des
              valeurs manquantes, puis vérifiez dans{' '}
              <Link to="/analyseur-donnees" className="text-primary hover:underline">
                l'analyseur
              </Link>{' '}
              si la corrélation affichée correspond à ce que vous attendiez.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateurDonnees;
