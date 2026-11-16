// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Calculator, Link2, ListOrdered, History } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { aiProvidersData, formatPrice, getTokenPricedModels, getTokenPricedProviders } from './aiProvidersData';
import { clampField, computeCost, DEFAULT_SCENARIO, formatInt, formatUsd, type Scenario } from './costMath';
import CostCalculatorHeader from './CostCalculatorHeader';
import CostComparisonTable from './CostComparisonTable';
import CostSaver from './CostSaver';

/** Volumes d'exemple : des ordres de grandeur supposés, à remplacer par vos propres mesures. */
const EXAMPLES: { name: string; input: number; output: number }[] = [
  { name: 'Question courte, réponse courte', input: 150, output: 200 },
  { name: 'Rédaction d’un article', input: 300, output: 1200 },
  { name: 'Aide au code', input: 1500, output: 500 },
  { name: 'Résumé d’un document de 10 pages', input: 6000, output: 400 },
  { name: 'Question sur une base documentaire (RAG)', input: 4000, output: 500 },
  { name: 'Étape d’un agent avec historique', input: 20000, output: 800 },
];

const DEFAULT_MODEL = { provider: 'openai', model: 'gpt-6-luna' };

/** Lecture prudente d'un paramètre numérique de l'URL. */
const readNumber = (params: URLSearchParams, key: string, field: keyof Scenario) => {
  const raw = params.get(key);
  return raw === null ? DEFAULT_SCENARIO[field] : clampField(field, Number(raw));
};

const FIELDS: { key: keyof Scenario; param: string; label: string; help: string }[] = [
  { key: 'inputTokens', param: 'in', label: 'Tokens envoyés par requête', help: 'Consigne, contexte, historique, documents joints.' },
  { key: 'outputTokens', param: 'out', label: 'Tokens générés par requête', help: 'Longueur de la réponse (et du raisonnement, s’il est facturé).' },
  { key: 'users', param: 'u', label: 'Utilisateurs', help: 'Personnes ou processus qui envoient des requêtes.' },
  { key: 'requestsPerUser', param: 'r', label: 'Requêtes par utilisateur et par jour', help: '' },
  { key: 'daysPerMonth', param: 'd', label: 'Jours d’usage par mois', help: '30 pour un usage continu, environ 21 pour les jours ouvrés.' },
];

/** Remises facultatives : les taux viennent du fournisseur, le site n'en suppose aucun. */
const DISCOUNT_FIELDS: { key: keyof Scenario; param: string; label: string; help: string }[] = [
  { key: 'cachedInputShare', param: 'cs', label: 'Part des tokens d’entrée servis par le cache (%)', help: '0 si vous ne savez pas : le calcul reste au prix plein.' },
  { key: 'cacheDiscount', param: 'cd', label: 'Remise sur ces tokens mis en cache (%)', help: 'Taux de la page tarifaire du fournisseur.' },
  { key: 'batchRequestShare', param: 'bs', label: 'Part des requêtes en traitement par lots (%)', help: 'Utilisez 0 si l’offre ne propose pas de lots.' },
  { key: 'batchDiscount', param: 'bd', label: 'Remise sur ces requêtes en lots (%)', help: 'Taux de la page tarifaire du fournisseur.' },
];

const CostCalculator = () => {
  const [params, setParams] = useSearchParams();

  const [scenario, setScenario] = useState<Scenario>(() =>
    Object.fromEntries([...FIELDS, ...DISCOUNT_FIELDS].map((f) => [f.key, readNumber(params, f.param, f.key)])) as unknown as Scenario
  );
  const [providerId, setProviderId] = useState(() => {
    const [p] = (params.get('m') ?? '').split('/');
    // Un fournisseur sans modèle facturé au token (images, vidéo) ne peut pas être calculé : retour au défaut.
    return getTokenPricedProviders().some((x) => x.id === p) ? p : DEFAULT_MODEL.provider;
  });
  const provider = aiProvidersData.find((p) => p.id === providerId);
  const models = getTokenPricedModels(provider);
  const [modelId, setModelId] = useState(() => {
    const [p, m] = (params.get('m') ?? '').split('/');
    const candidates = getTokenPricedModels(aiProvidersData.find((x) => x.id === p));
    return candidates.some((x) => x.id === m) ? m : DEFAULT_MODEL.model;
  });
  const model = models.find((m) => m.id === modelId) ?? models[0];
  const [tierIndex, setTierIndex] = useState(() => Math.max(0, Number(params.get('t')) || 0));
  const tier = model?.pricing[Math.min(tierIndex, (model?.pricing.length ?? 1) - 1)];

  // L'URL reflète le réglage : elle peut être copiée pour retrouver ou partager le même calcul.
  useEffect(() => {
    const next = new URLSearchParams();
    FIELDS.forEach((f) => next.set(f.param, String(scenario[f.key])));
    DISCOUNT_FIELDS.forEach((f) => {
      if (scenario[f.key] > 0) next.set(f.param, String(scenario[f.key]));
    });
    if (model) next.set('m', `${providerId}/${model.id}`);
    if (tierIndex > 0) next.set('t', String(tierIndex));
    setParams(next, { replace: true });
  }, [scenario, providerId, model, tierIndex, setParams]);

  const cost = useMemo(() => (tier ? computeCost(scenario, tier) : null), [scenario, tier]);

  const setField = (key: keyof Scenario, value: string) =>
    setScenario((s) => ({ ...s, [key]: clampField(key, Number(value.replace(',', '.'))) }));

  const changeProvider = (id: string) => {
    setProviderId(id);
    setModelId(getTokenPricedModels(aiProvidersData.find((p) => p.id === id))[0]?.id ?? '');
    setTierIndex(0);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Lien du calcul copié');
    } catch {
      toast.error('La copie a été refusée\u00A0: copiez l’adresse de la page à la main.');
    }
  };

  const currentCalculation =
    cost && provider && model
      ? {
          provider: provider.name,
          model: model.name + (model.pricing.length > 1 && tier ? ` (${tier.name})` : ''),
          inputTokens: scenario.inputTokens,
          outputTokens: scenario.outputTokens,
          totalCost: cost.perRequest,
          usageType: `${formatInt(cost.requestsPerDay)} requêtes par jour, ${scenario.daysPerMonth} jours par mois\u00A0: ${formatUsd(cost.perMonth)} par mois${cost.discountPerMonth > 0 ? `, remises saisies incluses (${formatUsd(cost.discountPerMonth)})` : ''}`,
        }
      : null;

  return (
    <div className="space-y-6">
      <CostCalculatorHeader />

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="calculator" className="whitespace-normal">
            <Calculator className="h-4 w-4 mr-2 shrink-0" aria-hidden="true" />
            Calcul
          </TabsTrigger>
          <TabsTrigger value="comparison" className="whitespace-normal">
            <ListOrdered className="h-4 w-4 mr-2 shrink-0" aria-hidden="true" />
            Tous les modèles
          </TabsTrigger>
          <TabsTrigger value="history" className="whitespace-normal">
            <History className="h-4 w-4 mr-2 shrink-0" aria-hidden="true" />
            Enregistrés
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Votre usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.map((f) => (
                    <div key={f.key} className="space-y-1 min-w-0">
                      <Label htmlFor={`cost-${f.param}`}>{f.label}</Label>
                      <Input
                        id={`cost-${f.param}`}
                        type="number"
                        inputMode="numeric"
                        min={0}
                        value={scenario[f.key]}
                        onChange={(e) => setField(f.key, e.target.value)}
                      />
                      {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Exemples de volumes par requête (ordres de grandeur supposés)</p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLES.map((ex) => (
                      <Button
                        key={ex.name}
                        variant="outline"
                        size="sm"
                        className="h-auto py-1.5 whitespace-normal text-left"
                        onClick={() => setScenario((s) => ({ ...s, inputTokens: ex.input, outputTokens: ex.output }))}
                      >
                        {ex.name} ({formatInt(ex.input)} / {formatInt(ex.output)})
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Repère : en anglais, OpenAI indique qu'un token correspond à environ 4 caractères ; un texte en
                    français en consomme un peu plus. Le plus fiable est de mesurer sur quelques requêtes réelles :
                    les API renvoient le nombre de tokens utilisés.
                  </p>
                </div>
                <details className="rounded-lg border p-3">
                  <summary className="cursor-pointer text-sm font-medium">Remises fournisseur (facultatif)</summary>
                  <div className="mt-3 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Le site ne suppose aucun taux : recopiez ceux de la page tarifaire de votre fournisseur et
                      laissez 0 pour un calcul au prix plein. Le cache s’applique aux tokens d’entrée, les lots à une
                      part des requêtes.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {DISCOUNT_FIELDS.map((f) => (
                        <div key={f.key} className="space-y-1 min-w-0">
                          <Label htmlFor={`cost-${f.param}`}>{f.label}</Label>
                          <Input
                            id={`cost-${f.param}`}
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={100}
                            value={scenario[f.key]}
                            onChange={(e) => setField(f.key, e.target.value)}
                          />
                          {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Le modèle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="cost-provider">Fournisseur</Label>
                  <Select value={providerId} onValueChange={changeProvider}>
                    <SelectTrigger id="cost-provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getTokenPricedProviders().map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cost-model">Modèle</Label>
                  <Select
                    value={model?.id}
                    onValueChange={(id) => {
                      setModelId(id);
                      setTierIndex(0);
                    }}
                  >
                    <SelectTrigger id="cost-model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {model && model.pricing.length > 1 && (
                  <div className="space-y-1">
                    <Label htmlFor="cost-tier">Palier tarifaire</Label>
                    <Select value={String(tierIndex)} onValueChange={(v) => setTierIndex(Number(v))}>
                      <SelectTrigger id="cost-tier">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {model.pricing.map((t, i) => (
                          <SelectItem key={t.name} value={String(i)}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Ce modèle a plusieurs tarifs (selon la longueur de la requête ou la date) : choisissez celui qui
                      correspond à votre cas.
                    </p>
                  </div>
                )}
                {model && tier && (
                  <dl className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3 text-sm">
                    <div>
                      <dt className="text-xs text-muted-foreground">Prix en entrée</dt>
                      <dd className="font-semibold">{formatPrice(tier.inputPrice)} $ par million de tokens</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Prix en sortie</dt>
                      <dd className="font-semibold">{formatPrice(tier.outputPrice)} $ par million de tokens</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs text-muted-foreground">Contexte maximal</dt>
                      <dd>
                        {model.contextLength ? `${formatInt(model.contextLength)} tokens` : 'non documenté'}
                        {model.contextLength > 0 && scenario.inputTokens + scenario.outputTokens > model.contextLength && (
                          <span className="block text-destructive">
                            Votre requête ({formatInt(scenario.inputTokens + scenario.outputTokens)} tokens) dépasse ce
                            contexte : elle serait refusée ou tronquée.
                          </span>
                        )}
                      </dd>
                    </div>
                  </dl>
                )}
                {provider && (
                  <a href={provider.pricingUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    Vérifier le prix sur la page de {provider.name}
                  </a>
                )}
              </CardContent>
            </Card>
          </div>

          {cost && tier && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3. Estimation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Par requête', value: cost.perRequest },
                    { label: 'Par jour', value: cost.perDay },
                    { label: `Par mois (${scenario.daysPerMonth} j)`, value: cost.perMonth },
                    { label: 'Par an (12 mois)', value: cost.perYear },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border p-3">
                      <dt className="text-xs text-muted-foreground">{item.label}</dt>
                      <dd className="text-lg font-semibold text-primary">{formatUsd(item.value)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
                  <p className="font-medium">Le calcul, pas à pas</p>
                  <p>
                    Entrée : {formatInt(scenario.inputTokens)} tokens × {formatPrice(tier.inputPrice)} $ / 1 000 000 ={' '}
                    {formatUsd(cost.inputCost)}
                  </p>
                  <p>
                    Sortie : {formatInt(scenario.outputTokens)} tokens × {formatPrice(tier.outputPrice)} $ / 1 000 000 ={' '}
                    {formatUsd(cost.outputCost)}
                  </p>
                  <p>
                    Par jour : {formatUsd(cost.perRequest)} × {formatInt(scenario.users)} utilisateur(s) ×{' '}
                    {formatInt(scenario.requestsPerUser)} requête(s) = {formatUsd(cost.perDay)}
                  </p>
                  <p>
                    Par mois : {formatUsd(cost.perDay)} × {scenario.daysPerMonth} jours = {formatUsd(cost.perMonth)}
                  </p>
                  {(scenario.cachedInputShare > 0 && scenario.cacheDiscount > 0) && (
                    <p className="text-muted-foreground">
                      Cache : {formatInt(scenario.cachedInputShare)} % des tokens d’entrée avec{' '}
                      {formatInt(scenario.cacheDiscount)} % de remise.
                    </p>
                  )}
                  {(scenario.batchRequestShare > 0 && scenario.batchDiscount > 0) && (
                    <p className="text-muted-foreground">
                      Lots : {formatInt(scenario.batchRequestShare)} % des requêtes avec{' '}
                      {formatInt(scenario.batchDiscount)} % de remise.
                    </p>
                  )}
                  {cost.discountPerMonth > 0 && (
                    <p className="text-muted-foreground">
                      Remises saisies : {formatUsd(cost.perRequestFull - cost.perRequest)} par requête, soit{' '}
                      {formatUsd(cost.discountPerMonth)} par mois.
                    </p>
                  )}
                  {cost.perRequest > 0 && (
                    <p className="text-muted-foreground">
                      La sortie représente {Math.round((cost.outputCost / cost.perRequest) * 100)} % du coût d'une
                      requête : les réponses longues coûtent souvent plus que les questions.
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Non compris : appels d’outils, recherche web, stockage, taxes, variations de change et paliers de
                  volume. Les remises ne s’appliquent que si vous avez saisi les taux du fournisseur. Les modèles de
                  raisonnement facturent aussi leurs tokens de réflexion comme des tokens de sortie, ce qui peut
                  multiplier la longueur facturée.
                </p>
                <Button variant="outline" size="sm" onClick={copyLink}>
                  <Link2 className="h-4 w-4 mr-2" aria-hidden="true" />
                  Copier le lien de ce calcul
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="comparison">
          <CostComparisonTable
            scenario={scenario}
            current={model ? { providerId, modelId: model.id } : null}
            onSelect={(p, m) => {
              setProviderId(p);
              setModelId(m);
              setTierIndex(0);
              toast.success('Modèle choisi\u00A0: voir l’onglet Calcul');
            }}
          />
        </TabsContent>

        <TabsContent value="history">
          <CostSaver currentCalculation={currentCalculation} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostCalculator;
