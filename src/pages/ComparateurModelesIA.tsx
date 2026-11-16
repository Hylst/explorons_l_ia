// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import TestGrid from '@/components/model-comparator/TestGrid';
import Hero from '@/components/Hero';
import PricingNotice from '@/components/common/PricingNotice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  aiProvidersData,
  formatPrice,
  isTokenPriced,
  priceUnitLabel,
  type AIModel,
} from '@/components/cost-calculator/aiProvidersData';
import {
  ArrowLeft,
  BarChart3,
  Calculator,
  ClipboardCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  ListChecks,
  Lock,
  Ruler,
  Search,
  Target,
} from 'lucide-react';

/** Catégorie affichée, déduite du type de modèle enregistré dans les données (pas du nom). */
const CATEGORY_BY_TYPE: Record<AIModel['type'], string> = {
  text: 'Texte (LLM)',
  multimodal: 'Multimodal',
  image: 'Image',
  audio: 'Audio',
  video: 'Vidéo',
  embedding: 'Embeddings',
};

/** Appréciations enregistrées dans les données : subjectives, pas des mesures. */
const QUALITY_LABEL: Record<NonNullable<AIModel['quality']>, string> = {
  basic: 'Entrée de gamme',
  standard: 'Standard',
  premium: 'Supérieure',
  flagship: 'Haut de gamme',
};

const SPEED_LABEL: Record<NonNullable<AIModel['speed']>, string> = {
  'très-rapide': 'Très rapide',
  rapide: 'Rapide',
  modéré: 'Modérée',
  lent: 'Lente',
};

const NBSP = ' ';

/** Première colonne du tableau comparatif : reste visible quand on fait défiler les modèles (fond opaque obligatoire). */
const STICKY_CELL = 'sticky left-0 z-10 bg-card shadow-[1px_0_0_0_hsl(var(--border))]';

const describePrice = (model: AIModel): string => {
  const tier = model.pricing[0];
  if (!tier) return 'Variable\u00A0: voir le fournisseur';
  if (isTokenPriced(model)) {
    return tier.outputPrice > 0
      ? `${formatPrice(tier.inputPrice)}${NBSP}$ en entrée, ${formatPrice(tier.outputPrice)}${NBSP}$ en sortie, ${priceUnitLabel(model)}`
      : `${formatPrice(tier.inputPrice)}${NBSP}$ ${priceUnitLabel(model)}`;
  }
  return tier.outputPrice > 0
    ? `${tier.name}${NBSP}: ${formatPrice(tier.inputPrice)}${NBSP}$ / ${formatPrice(tier.outputPrice)}${NBSP}$`
    : `${tier.name}${NBSP}: ${formatPrice(tier.inputPrice)}${NBSP}$`;
};

interface ComparedModel {
  id: string;
  providerId: string;
  modelId: string;
  tokenPriced: boolean;
  name: string;
  provider: string;
  category: string;
  type: AIModel['type'];
  price: string;
  context: string;
  quality: string;
  speed: string;
  capabilities: string[];
  multimodal: boolean;
  recommended: boolean;
  region: string;
  website: string;
  pricingUrl: string;
}

const models: ComparedModel[] = aiProvidersData.flatMap((provider) =>
  provider.models.map((model) => ({
    id: `${provider.id}-${model.id}`,
    providerId: provider.id,
    modelId: model.id,
    tokenPriced: isTokenPriced(model),
    name: model.name,
    provider: provider.name,
    category: CATEGORY_BY_TYPE[model.type],
    type: model.type,
    price: describePrice(model),
    // « Non applicable » seulement pour les modèles qui ne sont pas facturés au jeton (image, audio, vidéo) ;
    // un modèle au jeton sans fenêtre renseignée est « Non documenté », comme dans le calculateur.
    context: isTokenPriced(model)
      ? model.contextLength
        ? `${model.contextLength.toLocaleString('fr-FR')}${NBSP}tokens`
        : 'Non documenté'
      : 'Non applicable',
    quality: model.quality ? QUALITY_LABEL[model.quality] : 'Non renseignée',
    speed: model.speed ? SPEED_LABEL[model.speed] : 'Non renseignée',
    capabilities: model.features ?? [],
    multimodal: model.type === 'multimodal',
    recommended: model.recommended ?? false,
    region: provider.region ?? 'Non précisée',
    website: provider.website,
    pricingUrl: provider.pricingUrl,
  }))
);

const categories = [...new Set(models.map((model) => model.category))].sort((a, b) => a.localeCompare(b, 'fr'));

const selectionCriteria = [
  {
    icon: Target,
    title: 'La tâche avant le modèle',
    text: "Rédiger, résumer, coder, extraire des données, classer, analyser des images\u00A0: les modèles ne se valent pas sur toutes les tâches. Définissez d'abord ce que vous attendez, puis testez.",
  },
  {
    icon: Ruler,
    title: 'La longueur des documents',
    text: "La fenêtre de contexte limite ce que le modèle peut lire d'un coup. Pour de longs documents, vérifiez-la, et vérifiez aussi que la qualité ne se dégrade pas sur un texte très long.",
  },
  {
    icon: DollarSign,
    title: 'Le coût réel',
    text: "Le prix des tokens de sortie est souvent plusieurs fois supérieur à celui des tokens d'entrée. Estimez votre volume (nombre de demandes, taille moyenne) avec le calculateur de coûts, puis gardez une marge.",
  },
  {
    icon: Clock,
    title: 'La rapidité de réponse',
    text: "Un assistant en direct demande des réponses rapides\u00A0; un traitement de nuit, non. Les petits modèles répondent en général plus vite et coûtent moins cher, au prix d'une qualité moindre sur les tâches difficiles.",
  },
  {
    icon: Lock,
    title: 'Les données et leur hébergement',
    text: "Où sont traitées les données, sont-elles conservées ou servent-elles à entraîner le modèle\u00A0? Pour des données personnelles, vérifiez le contrat, le lieu d'hébergement et la conformité au RGPD avant tout envoi.",
  },
  {
    icon: Globe,
    title: "L'indépendance vis-à-vis du fournisseur",
    text: "Un service peut changer de prix, de conditions ou disparaître. Évitez de lier tout votre produit à un seul fournisseur\u00A0: gardez vos demandes (prompts) et vos données portables.",
  },
];

const selectionMethod = [
  'Rassemblez 20 à 50 exemples réels de votre usage, avec la réponse attendue.',
  'Testez deux ou trois modèles de gammes différentes sur ces exemples.',
  'Comparez la qualité (relue par un humain, avec l’onglet «\u00A0Ma grille de test\u00A0»), le coût et le temps de réponse.',
  "Refaites le test de temps en temps\u00A0: les modèles et les tarifs changent vite.",
];

const ComparateurModelesIA = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('browser');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const search = searchTerm.trim().toLowerCase();
  const filteredModels = models.filter((model) => {
    const matchesCategory = filterCategory === 'all' || model.category === filterCategory;
    const matchesSearch =
      search === '' ||
      model.name.toLowerCase().includes(search) ||
      model.provider.toLowerCase().includes(search) ||
      model.capabilities.some((capability) => capability.toLowerCase().includes(search));
    return matchesCategory && matchesSearch;
  });

  const toggleModelSelection = (modelId: string) => {
    setSelectedModels((previous) =>
      previous.includes(modelId) ? previous.filter((id) => id !== modelId) : [...previous, modelId]
    );
  };

  /**
   * Ajoute à la sélection les modèles (par identifiant) d'une grille de test enregistrée. Seuls ceux qui existent
   * encore dans la liste sont retenus ; les identifiants introuvables sont renvoyés pour que la grille le signale.
   */
  const selectModels = (ids: string[]): string[] => {
    const known = new Set(models.map((model) => model.id));
    const found = ids.filter((id) => known.has(id));
    if (found.length > 0) setSelectedModels((previous) => [...new Set([...previous, ...found])]);
    return ids.filter((id) => !known.has(id));
  };

  const selectedModelData = models.filter((model) => selectedModels.includes(model.id));
  const selectionLabel = `${selectedModels.length} modèle${selectedModels.length > 1 ? 's' : ''} sélectionné${selectedModels.length > 1 ? 's' : ''}`;

  const tabsRef = useRef<HTMLDivElement>(null);
  const compareTabRef = useRef<HTMLButtonElement>(null);

  /** Ouvre la comparaison et remonte aux onglets, sans mouvement si le visiteur a demandé de les limiter. */
  const showComparison = () => {
    setTab('compare');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    tabsRef.current?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
    // Le bouton disparaît avec l'onglet : le focus passe à l'onglet de comparaison plutôt que de se perdre.
    compareTabRef.current?.focus({ preventScroll: true });
  };

  const rows: { label: string; render: (model: ComparedModel) => React.ReactNode }[] = [
    { label: 'Fournisseur', render: (model) => model.provider },
    { label: 'Catégorie', render: (model) => <Badge variant="outline" className="text-xs">{model.category}</Badge> },
    { label: 'Prix indicatif', render: (model) => <span className="text-sm">{model.price}</span> },
    { label: 'Contexte', render: (model) => model.context },
    { label: 'Gamme (appréciation)', render: (model) => model.quality },
    { label: 'Vitesse (appréciation)', render: (model) => model.speed },
    { label: 'Région du fournisseur', render: (model) => model.region },
    {
      label: 'Multimodal',
      render: (model) =>
        model.multimodal ? <Badge variant="secondary" className="text-xs">Oui</Badge> : <span className="text-muted-foreground text-sm">Non</span>,
    },
    {
      label: 'Suggestion de l’auteur',
      render: (model) =>
        model.recommended ? (
          <span className="inline-flex items-center gap-1 text-sm text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Oui
          </span>
        ) : (
          <span className="text-muted-foreground text-sm">Non</span>
        ),
    },
    {
      label: 'Capacités',
      render: (model) => (
        <div className="flex flex-wrap gap-1">
          {model.capabilities.map((capability) => (
            <Badge key={capability} variant="outline" className="max-w-full rounded-md text-left text-xs whitespace-normal break-words">
              {capability}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      label: 'Page officielle des tarifs',
      render: (model) => (
        <a
          href={model.pricingUrl}
          aria-label={`Vérifier le prix de ${model.name} sur la page des tarifs de ${model.provider} (nouvel onglet)`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Vérifier le prix
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      ),
    },
    {
      label: 'Coût pour votre usage',
      render: (model) =>
        model.tokenPriced ? (
          <Link
            to={`/calculateur-couts-ia?m=${model.providerId}/${model.modelId}`}
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Calculator className="h-3 w-3" aria-hidden="true" />
            Estimer avec le calculateur
          </Link>
        ) : (
          <span className="text-muted-foreground text-sm">Facturé à une autre unité</span>
        ),
    },
    {
      label: 'Site du fournisseur',
      render: (model) => (
        <a
          href={model.website}
          aria-label={`Ouvrir le site de ${model.provider} (nouvel onglet)`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Ouvrir
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      ),
    },
  ];

  return (
    <>
      <Hero
        title="Comparateur de modèles d'IA"
        subtitle="Parcourez des modèles de fournisseurs différents, mettez-les côte à côte et apprenez à choisir selon vos besoins"
      />

      <section className="section-container">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/ressources?tab=outils')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour aux outils
          </Button>
        </div>

        <PricingNotice
          className="mb-6"
          extra="Outil de démonstration. Les libellés « gamme », « vitesse » et « suggestion de l'auteur » sont des appréciations personnelles saisies avec les données, pas des mesures ni des classements : il n'existe aucun score de performance chiffré ici, car aucun test n'a été réalisé. Pour choisir, testez les modèles sur vos propres exemples."
        />

        <Tabs ref={tabsRef} value={tab} onValueChange={setTab} className="w-full scroll-mt-20">
          <TabsList className="grid w-full h-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            <TabsTrigger value="browser" className="flex items-center gap-2">
              <Search className="h-4 w-4" aria-hidden="true" />
              Parcourir les modèles
            </TabsTrigger>
            <TabsTrigger ref={compareTabRef} value="compare" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
              Comparaison détaillée{selectedModels.length > 0 ? ` (${selectedModels.length})` : ''}
            </TabsTrigger>
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Ma grille de test
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" aria-hidden="true" />
              Comment choisir
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browser" className="mt-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher un modèle, un fournisseur ou une capacité..."
                  aria-label="Rechercher un modèle"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-56" aria-label="Filtrer par catégorie">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground mb-4" aria-live="polite">
              {filteredModels.length} modèle{filteredModels.length > 1 ? 's' : ''} affiché{filteredModels.length > 1 ? 's' : ''}.
              Cliquez sur une carte pour l'ajouter à la comparaison.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => {
                const selected = selectedModels.includes(model.id);
                return (
                  <Card
                    key={model.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    className={`cursor-pointer transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
                      selected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                    }`}
                    onClick={() => toggleModelSelection(model.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        toggleModelSelection(model.id);
                      }
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        {selected && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-label="Sélectionné" />}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{model.provider}</Badge>
                        <Badge variant="secondary">{model.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-3 text-sm">
                        <div>
                          <dt className="text-muted-foreground">Prix indicatif</dt>
                          <dd className="font-medium">{model.price}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-muted-foreground">Contexte</dt>
                          <dd>{model.context}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-muted-foreground">Gamme</dt>
                          <dd>{model.quality}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-muted-foreground">Vitesse</dt>
                          <dd>{model.speed}</dd>
                        </div>
                      </dl>
                      {model.recommended && (
                        <p className="mt-3 flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          Suggestion de l'auteur
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {model.capabilities.slice(0, 3).map((capability) => (
                          <Badge key={capability} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredModels.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Aucun modèle ne correspond à cette recherche.</p>
            )}

            {/* Annonce polie du nombre de modèles choisis (zone présente en permanence pour être lue à chaque changement). */}
            <p role="status" aria-live="polite" className="sr-only">
              {selectedModels.length > 0 ? selectionLabel : ''}
            </p>
            {selectedModels.length > 0 && (
              <div className="sticky bottom-4 z-20 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border-2 border-primary bg-card p-3 shadow-lg md:mx-auto md:max-w-xl">
                <p className="text-sm font-medium" aria-hidden="true">
                  {selectionLabel}
                </p>
                <Button onClick={showComparison} aria-label={`Comparer (${selectionLabel})`}>
                  <BarChart3 className="h-4 w-4" aria-hidden="true" />
                  Comparer
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="compare" className="mt-6">
            {selectedModelData.length === 0 ? (
              <Card>
                <CardContent className="p-8 sm:p-12 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-semibold mb-2">Aucun modèle sélectionné</h3>
                  <p className="text-muted-foreground mb-4">
                    Sélectionnez des modèles dans l'onglet « Parcourir les modèles » pour les mettre côte à côte.
                  </p>
                  <Button variant="outline" onClick={() => setTab('browser')}>
                    Parcourir les modèles
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">
                    Comparaison de {selectedModelData.length} modèle{selectedModelData.length > 1 ? 's' : ''}
                  </h3>
                  <Button variant="outline" onClick={() => setSelectedModels([])}>
                    Effacer la sélection
                  </Button>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    {/* Sous 640 px : une carte par critère, tous les modèles l'un sous l'autre (pas de défilement latéral). */}
                    <ul aria-label="Comparaison par critère" className="grid grid-cols-1 gap-4 sm:hidden">
                      {rows.map((row) => (
                        <li key={row.label} className="min-w-0 rounded-lg border p-3">
                          <h4 className="mb-2 text-sm font-semibold">{row.label}</h4>
                          <dl className="space-y-3">
                            {selectedModelData.map((model) => (
                              <div key={model.id} className="min-w-0">
                                <dt className="text-sm font-bold break-words">{model.name}</dt>
                                <dd className="mt-1 break-words">{row.render(model)}</dd>
                              </div>
                            ))}
                          </dl>
                        </li>
                      ))}
                    </ul>
                    <div tabIndex={0} role="region" aria-label="Tableau comparatif" className="relative hidden overflow-x-auto sm:block">
                      <table className="w-full text-left">
                        <caption className="sr-only">Comparaison détaillée des modèles sélectionnés</caption>
                        <thead>
                          <tr className="border-b">
                            <th scope="col" className={`${STICKY_CELL} p-2`}>Critère</th>
                            {selectedModelData.map((model) => (
                              <th key={model.id} scope="col" className="p-2 min-w-40">
                                {model.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row) => (
                            <tr key={row.label} className="border-b align-top last:border-0">
                              <th scope="row" className={`${STICKY_CELL} p-2 font-medium whitespace-nowrap`}>
                                {row.label}
                              </th>
                              {selectedModelData.map((model) => (
                                <td key={model.id} className="p-2">
                                  {row.render(model)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="grid" className="mt-6">
            <TestGrid
              models={selectedModelData.map((m) => ({ id: m.id, name: `${m.name} (${m.provider})` }))}
              onSelectModels={selectModels}
            />
          </TabsContent>

          <TabsContent value="guide" className="mt-6">
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Aucun modèle n'est le meilleur en toutes circonstances, et les classements vieillissent vite. Voici les
              critères qui comptent, et une méthode simple pour décider avec vos propres données.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectionCriteria.map((criterion) => (
                <Card key={criterion.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <criterion.icon className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                      {criterion.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{criterion.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ListChecks className="h-5 w-5 text-primary" aria-hidden="true" />
                  Une méthode en quatre étapes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  {selectionMethod.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default ComparateurModelesIA;
