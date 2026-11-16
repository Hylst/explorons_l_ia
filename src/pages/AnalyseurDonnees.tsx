// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AlertTriangle, Download, Info, Loader2, Table2 } from 'lucide-react';
import ToolHeader from '@/components/tools/ToolHeader';
import CsvSource, { type LoadedTable } from '@/components/tools/CsvSource';
import TablePreview from '@/components/tools/TablePreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isMissing, toNumber, MAX_CORRELATION_COLUMNS, type DatasetProfile } from '@/lib/dataTools/profile';
import { profileDatasetAsync } from '@/lib/dataTools/workerClient';
import { formatNumber, formatPercent, histogram } from '@/lib/dataTools/stats';
import { sampleBikeRentals } from '@/lib/dataTools/samples';
import { downloadFile, todayStamp } from '@/lib/files';

const NO_TARGET = '__aucune__';

/** Rapport lisible (Markdown) des points relevés, pour garder une trace ou le joindre à un projet. */
function reportMarkdown(name: string, profile: DatasetProfile): string {
  const lines = [
    `# Analyse du jeu de données « ${name} »`,
    '',
    `Produite le ${new Date().toLocaleDateString('fr-FR')} par l'analyseur d'Explorons l'IA (calcul local, repères indicatifs).`,
    '',
    `- Lignes : ${profile.rows}`,
    `- Colonnes : ${profile.columns.length}`,
    `- Cellules manquantes : ${profile.missingCells}`,
    `- Lignes en double : ${profile.duplicateRows}`,
    profile.target ? `- Cible : ${profile.target.name} (${profile.target.classes.map((c) => `${c.value} : ${c.count}`).join(', ')})` : '- Cible : non choisie',
    '',
    '## Points relevés',
    '',
    ...(profile.issues.length
      ? profile.issues.map((i) => `- [${i.level}] ${i.column ? `${i.column} : ` : ''}${i.title}. ${i.detail}`)
      : ['- Aucun point relevé par les contrôles automatiques.']),
    '',
    '## Colonnes',
    '',
    '| Colonne | Type | Manquantes | Distinctes | Min | Médiane | Max |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...profile.columns.map((c) =>
      `| ${c.name} | ${c.kind} | ${c.missing} | ${c.unique} | ${c.numeric ? formatNumber(c.numeric.min) : ''} | ${c.numeric ? formatNumber(c.numeric.median) : ''} | ${c.numeric ? formatNumber(c.numeric.max) : ''} |`),
    '',
    '## Ce que ces contrôles ne vérifient pas',
    '',
    "Représentativité de l'échantillon, qualité des étiquettes, conditions de collecte et base légale, biais historiques présents dans les données.",
  ];
  return lines.join('\n');
}

/** Résultat d'une analyse, avec la table et la cible pour lesquelles il a été calculé. */
interface Analysis {
  table: LoadedTable;
  target: string;
  profile: DatasetProfile | null;
  error: string | null;
}

const AnalyseurDonnees: React.FC = () => {
  const location = useLocation();
  const [table, setTable] = useState<LoadedTable | null>(null);
  const [targetChoice, setTargetChoice] = useState<{ table: LoadedTable | null; value: string }>({ table: null, value: NO_TARGET });
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  // Le choix de cible est lié à sa table : une nouvelle table repart sans cible, dès le premier rendu
  // (sinon l'analyse serait lancée une première fois avec la cible de la table précédente).
  const target = targetChoice.table === table ? targetChoice.value : NO_TARGET;
  const setTarget = (value: string) => setTargetChoice({ table, value });

  // Données transmises par le générateur de données synthétiques (en mémoire, via la navigation).
  useEffect(() => {
    const incoming = (location.state as { table?: LoadedTable } | null)?.table;
    if (incoming) setTable(incoming);
  }, [location.state]);

  useEffect(() => {
    setSelectedColumn(table?.headers[0] ?? '');
  }, [table]);

  // Le profil est calculé dans un Web Worker : la page reste utilisable sur un gros fichier. Une réponse
  // arrivée après un changement de table ou de cible est ignorée.
  useEffect(() => {
    if (!table) return;
    let cancelled = false;
    profileDatasetAsync(table.headers, table.rows, target === NO_TARGET ? undefined : target)
      .then((profile) => {
        if (!cancelled) setAnalysis({ table, target, profile, error: null });
      })
      .catch((e: unknown) => {
        if (!cancelled) setAnalysis({ table, target, profile: null, error: e instanceof Error ? e.message : 'Analyse impossible.' });
      });
    return () => {
      cancelled = true;
    };
  }, [table, target]);

  // Un profil n'est montré que pour la table affichée (jamais celui d'une table précédente). Après un simple
  // changement de cible, le profil de la même table reste visible, estompé, le temps du nouveau calcul.
  const ofThisTable = analysis && analysis.table === table ? analysis : null;
  const analyzing = !!table && !(ofThisTable && ofThisTable.target === target);
  const analysisError = analyzing ? null : ofThisTable?.error ?? null;
  const profile = ofThisTable?.profile ?? null;

  const column = profile?.columns.find((c) => c.name === selectedColumn);
  const columnIndex = table?.headers.indexOf(selectedColumn) ?? -1;
  const chartData = useMemo(() => {
    if (!table || !column || columnIndex < 0) return [];
    if (column.numeric) {
      const values = table.rows
        .map((row) => (isMissing(row[columnIndex] ?? '') ? null : toNumber(row[columnIndex])))
        .filter((v): v is number => v !== null);
      return histogram(values, 12).map((b) => ({ label: `${formatNumber(b.from, 1)} à ${formatNumber(b.to, 1)}`, count: b.count }));
    }
    return column.top.map((t) => ({ label: t.value.length > 18 ? `${t.value.slice(0, 17)}…` : t.value, count: t.count }));
  }, [table, column, columnIndex]);

  const strongest = profile ? [...profile.correlations].sort((a, b) => Math.abs(b.r) - Math.abs(a.r)).slice(0, 8) : [];
  const attention = profile?.issues.filter((i) => i.level === 'attention') ?? [];
  const info = profile?.issues.filter((i) => i.level === 'info') ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <ToolHeader
          icon={Table2}
          title="Analyseur de jeu de données"
          subtitle="Repérer, avant un apprentissage automatique, ce qui risque de fausser le résultat"
          facts={[
            'Calcul dans votre navigateur, fichier jamais envoyé',
            'Types, valeurs manquantes, doublons, valeurs atypiques, corrélations',
            'Indices de fuite de données et de classes déséquilibrées',
          ]}
        />

        <CsvSource onLoad={setTable} current={table} sampleLabel="Locations de vélos (fictif)" loadSample={sampleBikeRentals} />

        {table && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Préciser la colonne à prédire (facultatif)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="max-w-sm">
                <Label htmlFor="target-column">Colonne cible</Label>
                <Select value={target} onValueChange={setTarget}>
                  <SelectTrigger id="target-column">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NO_TARGET}>Aucune (exploration seule)</SelectItem>
                    {table.headers.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">
                Avec une cible, l'outil regarde aussi l'équilibre des classes et cherche des colonnes qui la
                devinent trop bien (fuite de données possible).
              </p>
              <TablePreview headers={table.headers} rows={table.rows} caption="Aperçu des dix premières lignes" />
            </CardContent>
          </Card>
        )}

        <div role="status" aria-live="polite" className={analyzing ? 'flex items-center gap-2 text-sm text-muted-foreground' : 'sr-only'}>
          {analyzing && (
            <>
              <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />
              Analyse en cours...
            </>
          )}
        </div>
        {analysisError && (
          <p role="alert" className="text-sm text-destructive">
            L'analyse a échoué : {analysisError}
          </p>
        )}

        {table && profile && (
          <div aria-busy={analyzing} className={analyzing ? 'space-y-6 opacity-60' : 'space-y-6'}>
            <section aria-labelledby="summary-title" className="space-y-3">
              <h2 id="summary-title" className="text-xl font-semibold">
                3. Résultats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Lignes', value: profile.rows.toLocaleString('fr-FR') },
                  { label: 'Colonnes', value: String(profile.columns.length) },
                  {
                    label: 'Cellules manquantes',
                    value: `${profile.missingCells.toLocaleString('fr-FR')} (${formatPercent(profile.missingCells / Math.max(1, profile.rows * profile.columns.length))})`,
                  },
                  { label: 'Lignes en double', value: profile.duplicateRows.toLocaleString('fr-FR') },
                ].map((s) => (
                  <Card key={s.label}>
                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-lg font-semibold">{s.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Points relevés ({profile.issues.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.issues.length === 0 && (
                  <p className="text-sm">
                    Les contrôles automatiques ne relèvent rien. Cela ne garantit pas que les données conviennent :
                    voir les limites en bas de page.
                  </p>
                )}
                {[{ items: attention, label: 'À regarder en priorité', Icon: AlertTriangle, tone: 'text-amber-600 dark:text-amber-400' },
                  { items: info, label: 'À connaître', Icon: Info, tone: 'text-primary' }]
                  .filter((g) => g.items.length > 0)
                  .map(({ items, label, Icon, tone }) => (
                    <div key={label} className="space-y-2">
                      <h3 className="font-medium">{label}</h3>
                      <ul className="space-y-2">
                        {items.map((issue, i) => (
                          <li key={`${issue.column}-${issue.title}-${i}`} className="flex items-start gap-3 rounded-md border p-3">
                            <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${tone}`} aria-hidden="true" />
                            <div className="text-sm min-w-0">
                              <p className="font-medium break-words">
                                {issue.column && <span className="font-mono text-xs mr-2">{issue.column}</span>}
                                {issue.title}
                              </p>
                              <p className="text-muted-foreground">{issue.detail}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                <Button variant="outline" disabled={analyzing} onClick={() => downloadFile(reportMarkdown(table.name, profile), `analyse-donnees-${todayStamp()}.md`, 'text/markdown;charset=utf-8')}>
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Télécharger le rapport (Markdown)
                </Button>
              </CardContent>
            </Card>

            {profile.target && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Répartition de la cible « {profile.target.name} »</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {profile.target.classes.map((c) => {
                      const total = profile.target!.classes.reduce((s, x) => s + x.count, 0);
                      return (
                        <li key={c.value} className="text-sm">
                          <div className="flex justify-between gap-2">
                            <span className="break-words">{c.value}</span>
                            <span>
                              {c.count.toLocaleString('fr-FR')} ({formatPercent(c.count / total)})
                            </span>
                          </div>
                          <div className="h-2 rounded bg-muted mt-1" aria-hidden="true">
                            <div className="h-2 rounded bg-primary" style={{ width: `${(c.count / total) * 100}%` }} />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Colonnes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <ul aria-label="Profil des colonnes" className="grid grid-cols-1 gap-3 sm:hidden">
                    {profile.columns.map((c) => (
                      <li key={c.name} className="rounded-md border p-3 text-sm">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <button
                            type="button"
                            className="inline-flex min-h-10 min-w-0 items-center text-left font-mono text-xs text-primary break-words hover:underline"
                            onClick={() => setSelectedColumn(c.name)}
                          >
                            {c.name}
                          </button>
                          <Badge variant="secondary">{c.kind}</Badge>
                        </div>
                        <dl className="mt-1 space-y-1">
                          <div className="flex justify-between gap-3">
                            <dt className="text-muted-foreground">Manquantes</dt>
                            <dd className="text-right">{c.missing ? `${c.missing} (${formatPercent(c.missing / profile.rows, 0)})` : '0'}</dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-muted-foreground">Distinctes</dt>
                            <dd className="text-right">{c.unique.toLocaleString('fr-FR')}</dd>
                          </div>
                          {c.numeric ? (
                            <div className="flex justify-between gap-3">
                              <dt className="text-muted-foreground">Min / médiane / max</dt>
                              <dd className="text-right break-words">
                                {`${formatNumber(c.numeric.min)} / ${formatNumber(c.numeric.median)} / ${formatNumber(c.numeric.max)}`}
                              </dd>
                            </div>
                          ) : (
                            c.top.length > 0 && (
                              <div className="flex justify-between gap-3">
                                <dt className="text-muted-foreground">Valeurs fréquentes</dt>
                                <dd className="min-w-0 text-right break-words">
                                  {c.top.slice(0, 3).map((t) => `${t.value} (${t.count})`).join(', ')}
                                </dd>
                              </div>
                            )
                          )}
                        </dl>
                      </li>
                    ))}
                  </ul>

                  <div tabIndex={0} role="region" aria-label="Profil des colonnes" className="relative hidden max-w-full overflow-x-auto sm:block">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left">
                          <th scope="col" className="py-2 pr-3">Colonne</th>
                          <th scope="col" className="py-2 pr-3">Type deviné</th>
                          <th scope="col" className="py-2 pr-3">Manquantes</th>
                          <th scope="col" className="py-2 pr-3">Distinctes</th>
                          <th scope="col" className="py-2 pr-3">Min / médiane / max</th>
                          <th scope="col" className="py-2">Valeurs fréquentes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.columns.map((c) => (
                          <tr key={c.name} className="border-b align-top">
                            <th scope="row" className="py-2 pr-3 font-mono text-xs font-normal">
                              <button type="button" className="text-primary hover:underline text-left" onClick={() => setSelectedColumn(c.name)}>
                                {c.name}
                              </button>
                            </th>
                            <td className="py-2 pr-3">
                              <Badge variant="secondary">{c.kind}</Badge>
                            </td>
                            <td className="py-2 pr-3 whitespace-nowrap">{c.missing ? `${c.missing} (${formatPercent(c.missing / profile.rows, 0)})` : '0'}</td>
                            <td className="py-2 pr-3">{c.unique.toLocaleString('fr-FR')}</td>
                            <td className="py-2 pr-3 whitespace-nowrap">
                              {c.numeric ? `${formatNumber(c.numeric.min)} / ${formatNumber(c.numeric.median)} / ${formatNumber(c.numeric.max)}` : ''}
                            </td>
                            <td className="py-2 text-xs text-muted-foreground">
                              {c.numeric ? '' : c.top.slice(0, 3).map((t) => `${t.value} (${t.count})`).join(', ')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="max-w-sm">
                    <Label htmlFor="chart-column">Distribution de la colonne</Label>
                    <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                      <SelectTrigger id="chart-column">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {table.headers.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {column && chartData.length > 0 ? (
                    <figure>
                      <div className="h-64 w-full" aria-hidden="true">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="label" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={40} />
                            <Tooltip formatter={(v: number) => [v.toLocaleString('fr-FR'), 'Lignes']} />
                            <Bar dataKey="count" fill="hsl(var(--primary))" isAnimationActive={false} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <figcaption className="text-xs text-muted-foreground">
                        {column.numeric
                          ? `Histogramme de «\u00A0${column.name}\u00A0» en 12 classes de même largeur (valeurs manquantes exclues).`
                          : `Les ${chartData.length} valeurs les plus fréquentes de «\u00A0${column.name}\u00A0».`}{' '}
                        {chartData.map((d) => `${d.label}\u00A0: ${d.count}`).join(' ; ')}
                      </figcaption>
                    </figure>
                  ) : (
                    <p className="text-sm text-muted-foreground">Pas de valeur à représenter pour cette colonne.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {strongest.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Corrélations les plus fortes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-1 text-sm">
                    {strongest.map((c) => (
                      <li key={`${c.a}-${c.b}`} className="flex justify-between gap-3 border-b py-1">
                        <span className="min-w-0 font-mono text-xs break-words">
                          {c.a} / {c.b}
                        </span>
                        <span className="whitespace-nowrap">r = {formatNumber(c.r)} (n = {c.n})</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    Coefficient de Pearson entre colonnes numériques ({MAX_CORRELATION_COLUMNS} premières au plus),
                    calculé sur les lignes où les deux valeurs sont présentes. Il ne mesure que les relations
                    linéaires, et une corrélation ne dit rien de la cause.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ce que l'outil ne vérifie pas</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Si l'échantillon représente bien la population visée : un jeu propre peut décrire un public trop
                étroit.
              </li>
              <li>Si les étiquettes sont justes : des annotations erronées ou subjectives ne se voient pas dans les chiffres.</li>
              <li>
                Si les données reproduisent une discrimination passée : pour l'examiner sur des prédictions, voir{' '}
                <Link to="/auditeur-biais" className="text-primary hover:underline">
                  l'auditeur de biais
                </Link>
                .
              </li>
              <li>Si la collecte et l'usage des données sont permis (consentement, base légale, données sensibles).</li>
            </ul>
            <p className="text-muted-foreground">
              Les seuils utilisés (30 % de valeurs manquantes, règle de Tukey, corrélation de 0,95, classe minoritaire
              sous 20 %) sont des repères courants, pas des règles. Pour s'exercer sans données personnelles, le{' '}
              <Link to="/generateur-donnees" className="text-primary hover:underline">
                générateur de données synthétiques
              </Link>{' '}
              produit des tableaux fictifs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyseurDonnees;
