// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Download, Scale, TriangleAlert } from 'lucide-react';
import ToolHeader from '@/components/tools/ToolHeader';
import CsvSource, { type LoadedTable } from '@/components/tools/CsvSource';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fairnessReport, type FairnessReport } from '@/lib/dataTools/fairness';
import { isMissing, toNumber } from '@/lib/dataTools/profile';
import { formatNumber, formatPercent } from '@/lib/dataTools/stats';
import { sampleApplications } from '@/lib/dataTools/samples';
import { downloadFile, toCsv, todayStamp } from '@/lib/files';

type Mode = 'label' | 'score';

interface Settings {
  group: string;
  truth: string;
  truthPositive: string;
  mode: Mode;
  prediction: string;
  predictionPositive: string;
  score: string;
  threshold: number;
}

const MIN_GROUP_SIZE = 30;

/**
 * Curseur de seuil : zone tactile de 44 px de haut et poignée de 28 px sur téléphone ou écran tactile
 * (le composant partagé, `ui/slider.tsx`, garde sa poignée de 20 px ailleurs).
 */
const SLIDER_TOUCH_CLASSES =
  'mt-3 min-h-11 max-sm:[&_[role=slider]]:h-7 max-sm:[&_[role=slider]]:w-7 pointer-coarse:[&_[role=slider]]:h-7 pointer-coarse:[&_[role=slider]]:w-7';

/** Valeurs distinctes d'une colonne (manquantes exclues), les plus fréquentes d'abord. */
function distinctValues(table: LoadedTable, column: string): string[] {
  const index = table.headers.indexOf(column);
  if (index < 0) return [];
  const counts = new Map<string, number>();
  for (const row of table.rows) {
    const v = (row[index] ?? '').trim();
    if (!isMissing(v)) counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([v]) => v);
}

const POSITIVE_GUESS = ['1', 'oui', 'true', 'vrai', 'yes', 'retenu', 'accepté', 'positif'];
const pickPositive = (values: string[]) =>
  values.find((v) => POSITIVE_GUESS.includes(v.toLowerCase())) ?? values[values.length > 1 ? 1 : 0] ?? '';

/** Réglages de départ : noms de colonnes reconnus, sinon les premières colonnes. */
function guessSettings(table: LoadedTable): Settings {
  const h = table.headers;
  const find = (re: RegExp, fallback: number) => h.find((x) => re.test(x)) ?? h[Math.min(fallback, h.length - 1)];
  const group = find(/groupe|group|genre|sexe|age|âge|region|région/i, 0);
  const truth = find(/reel|réel|vrai|truth|label|cible|target|y_true/i, 1);
  const score = h.find((x) => /score|proba/i.test(x)) ?? '';
  const prediction = find(/pred|prédi/i, 2);
  const settings: Settings = {
    group,
    truth,
    truthPositive: pickPositive(distinctValues(table, truth)),
    mode: score ? 'score' : 'label',
    prediction,
    predictionPositive: pickPositive(distinctValues(table, prediction)),
    score,
    threshold: 0.5,
  };
  return settings;
}

const rateRow = (label: string, help: string, key: 'baseRate' | 'selectionRate' | 'tpr' | 'fpr' | 'ppv' | 'accuracy') => ({ label, help, key });
const RATES = [
  rateRow('Taux de base', 'Part de positifs réels dans le groupe.', 'baseRate'),
  rateRow('Taux de sélection', 'Part de personnes que le modèle classe positives.', 'selectionRate'),
  rateRow('Vrais positifs (rappel)', 'Parmi les positifs réels, part reconnue par le modèle.', 'tpr'),
  rateRow('Faux positifs', 'Parmi les négatifs réels, part classée positive à tort.', 'fpr'),
  rateRow('Précision', 'Parmi les prédictions positives, part qui est réellement positive.', 'ppv'),
  rateRow('Exactitude', 'Part de prédictions correctes.', 'accuracy'),
];

function reportCsv(report: FairnessReport): string {
  return toCsv(
    ['Groupe', 'Effectif', 'VP', 'FP', 'VN', 'FN', ...RATES.map((r) => r.label)],
    [...report.groups, report.overall].map((g) => [g.group, g.n, g.tp, g.fp, g.tn, g.fn, ...RATES.map((r) => (Number.isFinite(g[r.key]) ? g[r.key].toFixed(4) : ''))])
  );
}

const AuditeurBiais: React.FC = () => {
  const [table, setTable] = useState<LoadedTable | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    setSettings(table ? guessSettings(table) : null);
  }, [table]);

  const set = (patch: Partial<Settings>) => setSettings((s) => (s ? { ...s, ...patch } : s));

  const scoreRange = useMemo(() => {
    if (!table || !settings?.score) return null;
    const index = table.headers.indexOf(settings.score);
    const values = table.rows.map((r) => toNumber(r[index] ?? '')).filter((v): v is number => v !== null);
    if (values.length === 0) return null;
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [table, settings?.score]);

  // Seuil hors de l'échelle des scores (par exemple 0,5 pour des scores de 0 à 100) : on part du milieu de l'échelle.
  useEffect(() => {
    if (!scoreRange) return;
    setSettings((s) =>
      s && (s.threshold < scoreRange.min || s.threshold > scoreRange.max)
        ? { ...s, threshold: Number(((scoreRange.min + scoreRange.max) / 2).toPrecision(4)) }
        : s
    );
  }, [scoreRange]);

  const result = useMemo(() => {
    if (!table || !settings) return null;
    const gi = table.headers.indexOf(settings.group);
    const ti = table.headers.indexOf(settings.truth);
    const pi = table.headers.indexOf(settings.mode === 'score' ? settings.score : settings.prediction);
    if (gi < 0 || ti < 0 || pi < 0) return { error: 'Choisissez les trois colonnes.' } as const;
    if (new Set([gi, ti, pi]).size < 3) return { error: 'Les colonnes groupe, vérité et prédiction doivent être différentes.' } as const;
    const groups: string[] = [];
    const truth: boolean[] = [];
    const predicted: boolean[] = [];
    let ignored = 0;
    for (const row of table.rows) {
      const g = (row[gi] ?? '').trim();
      const t = (row[ti] ?? '').trim();
      const p = (row[pi] ?? '').trim();
      if (isMissing(g) || isMissing(t) || isMissing(p)) {
        ignored++;
        continue;
      }
      let pred: boolean;
      if (settings.mode === 'score') {
        const s = toNumber(p);
        if (s === null) {
          ignored++;
          continue;
        }
        pred = s >= settings.threshold;
      } else pred = p === settings.predictionPositive;
      groups.push(g);
      truth.push(t === settings.truthPositive);
      predicted.push(pred);
    }
    if (groups.length === 0) return { error: 'Aucune ligne exploitable avec ces réglages.' } as const;
    const report = fairnessReport({ groups, truth, predicted });
    report.ignoredRows = ignored;
    if (report.groups.length > 20) return { error: `La colonne «\u00A0${settings.group}\u00A0» compte ${report.groups.length} valeurs\u00A0: choisissez une colonne de groupes (20 au plus).` } as const;
    if (report.groups.length < 2) return { error: 'Il faut au moins deux groupes pour comparer.' } as const;
    return { report } as const;
  }, [table, settings]);

  const report = result && 'report' in result ? result.report : null;
  const chartData = report?.groups.map((g) => ({
    group: g.group,
    'Taux de sélection': g.selectionRate,
    'Vrais positifs': g.tpr,
    'Faux positifs': g.fpr,
  }));

  const columnSelect = (id: string, label: string, value: string, onChange: (v: string) => void) => (
    <div className="min-w-0">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Choisir" />
        </SelectTrigger>
        <SelectContent>
          {table!.headers.map((h) => (
            <SelectItem key={h} value={h}>
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const valueSelect = (id: string, label: string, column: string, value: string, onChange: (v: string) => void) => (
    <div className="min-w-0">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Choisir" />
        </SelectTrigger>
        <SelectContent>
          {distinctValues(table!, column)
            .slice(0, 50)
            .map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <ToolHeader
          icon={Scale}
          title="Auditeur de biais"
          subtitle="Comparer, groupe par groupe, les erreurs d'un classifieur"
          facts={[
            'À partir de vos prédictions\u00A0: aucun modèle n’est exécuté',
            'Parité, égalité des chances, faux positifs, précision',
            'Calcul dans votre navigateur, fichier jamais envoyé',
          ]}
        />

        <CsvSource onLoad={setTable} current={table} sampleLabel="Candidatures (fictif)" loadSample={sampleApplications} />

        {table && settings && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Indiquer les colonnes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Une ligne par personne ou par cas : le groupe à comparer, ce qui s'est réellement passé, et ce que le
                modèle a prédit (une étiquette, ou un score avec un seuil).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columnSelect('group', 'Colonne des groupes', settings.group, (v) => set({ group: v }))}
                {columnSelect('truth', 'Vérité (résultat réel)', settings.truth, (v) => set({ truth: v, truthPositive: pickPositive(distinctValues(table, v)) }))}
                {valueSelect('truth-pos', 'Valeur «\u00A0positive\u00A0» de la vérité', settings.truth, settings.truthPositive, (v) => set({ truthPositive: v }))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="min-w-0">
                  <Label htmlFor="mode">La prédiction est</Label>
                  <Select value={settings.mode} onValueChange={(v) => set({ mode: v as Mode })}>
                    <SelectTrigger id="mode">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="label">une étiquette</SelectItem>
                      <SelectItem value="score">un score, avec un seuil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {settings.mode === 'label' ? (
                  <>
                    {columnSelect('pred', 'Colonne de prédiction', settings.prediction, (v) => set({ prediction: v, predictionPositive: pickPositive(distinctValues(table, v)) }))}
                    {valueSelect('pred-pos', 'Valeur «\u00A0positive\u00A0» prédite', settings.prediction, settings.predictionPositive, (v) => set({ predictionPositive: v }))}
                  </>
                ) : (
                  <>
                    {columnSelect('score', 'Colonne du score', settings.score, (v) => set({ score: v }))}
                    <div className="min-w-0">
                      <Label htmlFor="threshold">
                        Seuil : positif si score ≥ {formatNumber(settings.threshold, 3)}
                      </Label>
                      {scoreRange ? (
                        <Slider
                          id="threshold"
                          className={SLIDER_TOUCH_CLASSES}
                          min={scoreRange.min}
                          max={scoreRange.max}
                          step={(scoreRange.max - scoreRange.min) / 200 || 0.01}
                          value={[Math.min(scoreRange.max, Math.max(scoreRange.min, settings.threshold))]}
                          onValueChange={([v]) => set({ threshold: v })}
                          aria-label="Seuil de décision"
                        />
                      ) : (
                        <p className="text-xs text-destructive mt-2">Cette colonne ne contient pas de nombres.</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {result && 'error' in result && (
          <p role="alert" className="text-sm text-destructive">
            {result.error}
          </p>
        )}

        {report && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3. Taux par groupe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {report.ignoredRows > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {report.ignoredRows} ligne(s) ignorée(s) : valeur manquante ou score illisible.
                  </p>
                )}
                {report.groups.some((g) => g.n < MIN_GROUP_SIZE) && (
                  <p className="flex items-start gap-2 text-sm">
                    <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                    Un ou plusieurs groupes comptent moins de {MIN_GROUP_SIZE} lignes : leurs taux varient beaucoup
                    d'un échantillon à l'autre, les écarts sont à lire avec prudence.
                  </p>
                )}
                <div>
                  <div className="space-y-3 sm:hidden">
                    <ul aria-label="Taux par groupe" className="grid grid-cols-1 gap-3">
                      {[...report.groups, report.overall].map((g) => (
                        <li key={g.group} className="rounded-md border p-3 text-sm">
                          <p className="font-medium break-words">
                            {g.group} <span className="font-normal text-muted-foreground">(n = {g.n})</span>
                          </p>
                          <dl className="mt-2 space-y-1">
                            {RATES.map((r) => (
                              <div key={r.key} className="flex items-baseline justify-between gap-3">
                                <dt className="min-w-0 text-muted-foreground">{r.label}</dt>
                                <dd className="whitespace-nowrap font-medium">{formatPercent(g[r.key])}</dd>
                              </div>
                            ))}
                          </dl>
                        </li>
                      ))}
                    </ul>
                    <details className="rounded-md border p-3 text-sm">
                      <summary className="min-h-8 cursor-pointer font-medium">Ce que mesure chaque ligne</summary>
                      <dl className="mt-2 space-y-2">
                        {RATES.map((r) => (
                          <div key={r.key}>
                            <dt className="font-medium">{r.label}</dt>
                            <dd className="text-xs text-muted-foreground">{r.help}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  </div>

                  <div tabIndex={0} role="region" aria-label="Taux par groupe" className="relative hidden max-w-full overflow-x-auto sm:block">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left">
                          <th scope="col" className="py-2 pr-3">Mesure</th>
                          {[...report.groups, report.overall].map((g) => (
                            <th key={g.group} scope="col" className="py-2 pr-3 whitespace-nowrap">
                              {g.group} <span className="font-normal text-muted-foreground">(n = {g.n})</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {RATES.map((r) => (
                          <tr key={r.key} className="border-b">
                            <th scope="row" className="py-2 pr-3 text-left font-normal">
                              <span className="font-medium">{r.label}</span>
                              <span className="block text-xs text-muted-foreground">{r.help}</span>
                            </th>
                            {[...report.groups, report.overall].map((g) => (
                              <td key={g.group} className="py-2 pr-3 whitespace-nowrap">
                                {formatPercent(g[r.key])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {chartData && (
                  <div className="h-72 w-full" aria-hidden="true">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="group" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 1]} tickFormatter={(v: number) => `${Math.round(v * 100)}\u00A0%`} width={48} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(v: number) => formatPercent(v)} />
                        {/* Pastille colorée, texte dans la couleur du texte : les teintes des barres n'atteignent pas 4,5:1. */}
                        <Legend
                          wrapperStyle={{ fontSize: 13 }}
                          formatter={(value: string) => <span className="text-foreground">{value}</span>}
                        />
                        <Bar dataKey="Taux de sélection" fill="hsl(var(--primary))" isAnimationActive={false} />
                        <Bar dataKey="Vrais positifs" fill="hsl(142 60% 40%)" isAnimationActive={false} />
                        <Bar dataKey="Faux positifs" fill="hsl(var(--destructive))" isAnimationActive={false} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                <Button variant="outline" onClick={() => downloadFile(reportCsv(report), `audit-biais-${todayStamp()}.csv`, 'text/csv;charset=utf-8')}>
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Télécharger les taux (CSV)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Écarts entre groupes</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {[
                    {
                      title: 'Parité démographique',
                      value: `écart ${formatPercent(report.gaps.selection.diff)}, rapport ${formatNumber(report.gaps.selection.ratio)}`,
                      text: "Les groupes sont-ils sélectionnés dans les mêmes proportions\u00A0? Le rapport divise le plus petit taux de sélection par le plus grand. Aux États-Unis, un rapport inférieur à 0,8 (règle des «\u00A0quatre cinquièmes\u00A0», lignes directrices fédérales de 1978 sur le recrutement) sert de signal d'alerte. Ce critère ignore la vérité\u00A0: il peut être atteint par un modèle qui se trompe beaucoup.",
                    },
                    {
                      title: 'Égalité des chances',
                      value: `écart de vrais positifs ${formatPercent(report.gaps.tpr)}`,
                      text: 'Parmi les personnes réellement positives, chaque groupe a-t-il la même chance d’être reconnu\u00A0? Un écart signifie que le modèle «\u00A0oublie\u00A0» plus souvent les positifs d’un groupe.',
                    },
                    {
                      title: 'Égalité des cotes',
                      value: `écart maximal ${formatPercent(report.gaps.equalizedOdds)} (faux positifs\u00A0: ${formatPercent(report.gaps.fpr)})`,
                      text: 'Exige à la fois les mêmes vrais positifs et les mêmes faux positifs\u00A0: aucun groupe ne doit subir plus d’erreurs de l’un ou l’autre type.',
                    },
                    {
                      title: 'Parité de précision',
                      value: `écart ${formatPercent(report.gaps.ppv)}`,
                      text: 'Une prédiction positive a-t-elle la même valeur quel que soit le groupe\u00A0? Quand les taux de base diffèrent, ce critère et l’égalité des cotes ne peuvent pas être satisfaits ensemble (sauf modèle parfait).',
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-md border p-3 space-y-1">
                      <dt className="font-medium">{item.title}</dt>
                      <dd className="font-mono text-xs">{item.value}</dd>
                      <dd className="text-muted-foreground">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lire ces résultats avec prudence</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Aucun critère ne suffit seul.</strong> Quand les groupes n'ont pas le même taux de base, il est
                mathématiquement impossible d'égaliser à la fois les taux d'erreur et la précision (Kleinberg,
                Mullainathan et Raghavan, 2016 ; Chouldechova, 2017). Choisir le critère qui compte est une décision,
                pas un calcul.
              </li>
              <li>
                <strong>La « vérité » peut elle-même être biaisée</strong> : si les décisions passées étaient
                inéquitables, un modèle fidèle à ces étiquettes l'est aussi, et l'audit ne le voit pas.
              </li>
              <li>
                <strong>Retirer la colonne sensible ne suffit pas</strong> : d'autres variables (code postal, parcours,
                prénom) peuvent la remplacer.
              </li>
              <li>
                <strong>Déplacer le seuil</strong> modifie tous les taux à la fois : essayez-le sur l'exemple pour voir
                qu'améliorer un écart en dégrade souvent un autre.
              </li>
              <li>
                Les données sur l'origine, la santé ou les opinions sont des données sensibles (article 9 du RGPD), et
                le règlement européen sur l'IA (2024/1689, article 10) demande d'examiner les biais possibles des
                données des systèmes à haut risque. Cet outil aide à poser des questions ; il ne vaut ni audit
                réglementaire ni avis juridique.
              </li>
            </ul>
            <p className="text-muted-foreground">
              Définitions : Hardt, Price et Srebro, « Equality of Opportunity in Supervised Learning » (2016). Pour
              examiner les données elles-mêmes avant l'entraînement, voir{' '}
              <Link to="/analyseur-donnees" className="text-primary hover:underline">
                l'analyseur de jeu de données
              </Link>
              , et la page{' '}
              <Link to="/ethique" className="text-primary hover:underline">
                Éthique
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditeurBiais;
