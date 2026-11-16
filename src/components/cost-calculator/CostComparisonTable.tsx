// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useId, useMemo, useState, useSyncExternalStore } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { aiProvidersData, formatPrice, isTokenPriced } from './aiProvidersData';
import { computeCost, formatInt, formatUsd, type Scenario } from './costMath';
import { downloadFile, toCsv, todayStamp } from '@/lib/files';

interface Props {
  scenario: Scenario;
  current: { providerId: string; modelId: string } | null;
  onSelect: (providerId: string, modelId: string) => void;
}

const ALL = '__tous__';
const MAX_CHART = 10;

/** Sous 640 px (point de rupture `sm`), le tableau devient une liste de cartes et l'axe du graphique se resserre. */
const NARROW_QUERY = '(max-width: 639px)';
const subscribeNarrow = (onChange: () => void) => {
  const query = window.matchMedia(NARROW_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const useNarrowScreen = () =>
  useSyncExternalStore(subscribeNarrow, () => window.matchMedia(NARROW_QUERY).matches, () => false);

/** Largeur de l'axe des noms et longueur maximale d'une étiquette selon la largeur de l'écran. */
const AXIS_WIDTH = { narrow: 100, wide: 170 };
const NARROW_LABEL_CHARS = 16;
const shortenLabel = (name: string) =>
  name.length > NARROW_LABEL_CHARS ? `${name.slice(0, NARROW_LABEL_CHARS - 1).trimEnd()}…` : name;

/** Le même usage calculé pour tous les modèles facturés au token, du moins cher au plus cher. */
const CostComparisonTable: React.FC<Props> = ({ scenario, current, onSelect }) => {
  const [providerFilter, setProviderFilter] = useState(ALL);
  const [typeFilter, setTypeFilter] = useState(ALL);
  const [pinned, setPinned] = useState<string[]>([]);
  const narrow = useNarrowScreen();
  const idPrefix = useId();

  const rows = useMemo(
    () =>
      aiProvidersData
        .flatMap((p) =>
          p.models.filter(isTokenPriced).map((m) => {
            const tier = m.pricing[0];
            return {
              key: `${p.id}/${m.id}`,
              providerId: p.id,
              providerName: p.name,
              model: m,
              tier,
              otherTiers: m.pricing.length - 1,
              cost: computeCost(scenario, tier),
            };
          })
        )
        .sort((a, b) => a.cost.perMonth - b.cost.perMonth),
    [scenario]
  );

  const visible = rows.filter(
    (r) => (providerFilter === ALL || r.providerId === providerFilter) && (typeFilter === ALL || r.model.type === typeFilter)
  );
  const currentKey = current ? `${current.providerId}/${current.modelId}` : '';
  const chartKeys = pinned.length ? pinned : [currentKey].filter(Boolean);
  const chartData = rows
    .filter((r) => chartKeys.includes(r.key))
    // Nom du fournisseur ajouté : un même modèle ouvert peut être proposé par plusieurs hébergeurs.
    .map((r) => ({ name: `${r.model.name} (${r.providerName})`, mois: Number(r.cost.perMonth.toPrecision(4)) }));

  const togglePin = (key: string) =>
    setPinned((list) => (list.includes(key) ? list.filter((k) => k !== key) : list.length >= MAX_CHART ? list : [...list, key]));

  const exportCsv = () =>
    downloadFile(
      toCsv(
        ['Fournisseur', 'Modèle', 'Type', 'Tarif utilisé', 'Prix entrée ($/M)', 'Prix sortie ($/M)', 'Par requête ($)', 'Par mois ($)'],
        visible.map((r) => [r.providerName, r.model.name, r.model.type, r.tier.name, r.tier.inputPrice, r.tier.outputPrice, r.cost.perRequest, r.cost.perMonth])
      ),
      `comparaison-couts-ia-${todayStamp()}.csv`,
      'text/csv;charset=utf-8'
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Le même usage sur tous les modèles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {formatInt(scenario.inputTokens)} tokens envoyés et {formatInt(scenario.outputTokens)} générés par requête,{' '}
          {formatInt(scenario.users * scenario.requestsPerUser)} requêtes par jour, {scenario.daysPerMonth} jours par mois.
          Le prix ne dit rien de la qualité des réponses : un modèle moins cher peut demander plus de requêtes ou de
          relectures. Chaque modèle est chiffré avec son premier palier de prix, celui indiqué sous son nom : les montants ne tiennent pas compte des autres paliers (tarif limité dans le temps,
          requêtes très longues).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
          <div className="space-y-1">
            <Label htmlFor="cmp-provider">Fournisseur</Label>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger id="cmp-provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Tous</SelectItem>
                {aiProvidersData
                  .filter((p) => p.models.some(isTokenPriced))
                  .map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="cmp-type">Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="cmp-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Tous</SelectItem>
                <SelectItem value="text">Texte</SelectItem>
                <SelectItem value="multimodal">Multimodal</SelectItem>
                <SelectItem value="embedding">Embeddings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {chartData.length > 0 && (
          <figure className="space-y-1">
            <div className="w-full" style={{ height: Math.max(120, chartData.length * 36 + 40) }} aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v: number) => `${v.toLocaleString('fr-FR')}\u00A0$`} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={narrow ? AXIS_WIDTH.narrow : AXIS_WIDTH.wide}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(name: string) => (narrow ? shortenLabel(name) : name)}
                  />
                  <Tooltip formatter={(v: number) => [formatUsd(v), 'Par mois']} />
                  <Bar dataKey="mois" fill="hsl(var(--primary))" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <figcaption className="text-xs text-muted-foreground">
              Coût mensuel {pinned.length ? 'des modèles cochés' : 'du modèle choisi (cochez des lignes pour comparer)'} :{' '}
              {chartData.map((d) => `${d.name} ${formatUsd(d.mois)}`).join('\u00A0; ')}.
            </figcaption>
          </figure>
        )}

        <ul aria-label="Coût du même usage par modèle" className="grid grid-cols-1 gap-3 sm:hidden">
          {visible.map((r, index) => {
            const checkboxId = `${idPrefix}-cmp-${index}`;
            return (
              <li key={r.key} className={`rounded-lg border p-3 text-sm ${r.key === currentKey ? 'bg-primary/5' : ''}`}>
                <p className="font-medium break-words">{r.model.name}</p>
                <p className="text-muted-foreground break-words">{r.providerName}</p>
                {r.otherTiers > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Tarif « {r.tier.name} » ; {r.otherTiers} autre(s) palier(s), non compté(s) dans les montants
                  </p>
                )}
                <dl className="mt-2 space-y-1">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Entrée / sortie ($ par M)</dt>
                    <dd className="text-right">
                      {formatPrice(r.tier.inputPrice)} / {formatPrice(r.tier.outputPrice)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Par requête</dt>
                    <dd className="text-right">{formatUsd(r.cost.perRequest)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Par mois</dt>
                    <dd className="text-right font-semibold">{formatUsd(r.cost.perMonth)}</dd>
                  </div>
                </dl>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <Label htmlFor={checkboxId} className="flex min-h-10 cursor-pointer items-center gap-2 font-normal">
                    <Checkbox
                      id={checkboxId}
                      checked={pinned.includes(r.key)}
                      onCheckedChange={() => togglePin(r.key)}
                      disabled={!pinned.includes(r.key) && pinned.length >= MAX_CHART}
                      aria-label={`Comparer ${r.providerName} ${r.model.name} sur le graphique`}
                    />
                    Comparer
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-h-10"
                    onClick={() => onSelect(r.providerId, r.model.id)}
                    aria-label={`Choisir ${r.providerName} ${r.model.name} pour le calcul`}
                  >
                    Choisir
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>

        <div tabIndex={0} role="region" aria-label="Coût du même usage par modèle" className="relative hidden max-w-full overflow-x-auto sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th scope="col" className="py-2 pr-2">
                  <span className="sr-only">Comparer</span>
                </th>
                <th scope="col" className="py-2 pr-3">Modèle</th>
                <th scope="col" className="py-2 pr-3 whitespace-nowrap">Entrée / sortie ($ par M)</th>
                <th scope="col" className="py-2 pr-3 whitespace-nowrap text-right">Par requête</th>
                <th scope="col" className="py-2 pr-3 whitespace-nowrap text-right">Par mois</th>
                <th scope="col" className="py-2">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.key} className={`border-b ${r.key === currentKey ? 'bg-primary/5' : ''}`}>
                  <td className="py-2 pr-2">
                    <Checkbox
                      checked={pinned.includes(r.key)}
                      onCheckedChange={() => togglePin(r.key)}
                      disabled={!pinned.includes(r.key) && pinned.length >= MAX_CHART}
                      aria-label={`Comparer ${r.providerName} ${r.model.name} sur le graphique`}
                    />
                  </td>
                  <th scope="row" className="py-2 pr-3 text-left font-normal">
                    <span className="font-medium">{r.model.name}</span>{' '}
                    <span className="text-muted-foreground">({r.providerName})</span>
                    {r.otherTiers > 0 && (
                      <span className="block text-xs text-muted-foreground">
                        Tarif « {r.tier.name} » ; {r.otherTiers} autre(s) palier(s), non compté(s) dans les montants
                      </span>
                    )}
                  </th>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {formatPrice(r.tier.inputPrice)} / {formatPrice(r.tier.outputPrice)}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap text-right">{formatUsd(r.cost.perRequest)}</td>
                  <td className="py-2 pr-3 whitespace-nowrap text-right font-medium">{formatUsd(r.cost.perMonth)}</td>
                  <td className="py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelect(r.providerId, r.model.id)}
                      aria-label={`Choisir ${r.providerName} ${r.model.name} pour le calcul`}
                    >
                      Choisir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv}>
          <Download className="h-4 w-4 mr-2" aria-hidden="true" />
          Exporter ce tableau (CSV)
        </Button>
      </CardContent>
    </Card>
  );
};

export default CostComparisonTable;
