// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';
import Hero from '@/components/Hero';
import { AddResourceForm } from '@/components/resources/AddResourceForm';
import { QuizDialog } from '@/components/resources/QuizDialog';

// Composants refactorisés
import ResourcesHeader from '@/components/resources/ResourcesHeader';
import ResourceFilters from '@/components/resources/ResourceFilters';
import UnifiedResourcesTabsSection from '@/components/resources/UnifiedResourcesTabsSection';
import ContinueLearningSection from '@/components/resources/ContinueLearningSection';

// Données
import {
  realResources,
  scientificPublications,
  iaTools,
  authorApps
} from '@/components/resources/resourcesData';
import { filterTools, readToolFilter, toolFilterOptions } from '@/components/resources/toolFilters';
import { matchesQuery } from '@/lib/search';


/** Onglets de UnifiedResourcesTabsSection (valeur du paramètre ?tab=). */
const TAB_VALUES = ['toutes', 'cours', 'publications', 'outils', 'videos', 'ecosysteme', 'agir'];

/**
 * Page présentant des ressources externes pour approfondir les connaissances en IA
 * @returns {JSX.Element} Le composant de la page Ressources
 */
const Ressources = () => {
  const [showAddResourceForm, setShowAddResourceForm] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);

  useScrollToAnchor();

  // L'onglet actif est lu dans l'URL (?tab=...) : un lien interne vers un autre onglet, même depuis cette page, le change.
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam && TAB_VALUES.includes(tabParam) ? tabParam : 'toutes';

  /** Écrit les paramètres sans empiler l'historique ni perdre l'ancre (#resources). */
  const updateParams = useCallback((update: (params: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams);
    update(next);
    const search = next.toString();
    navigate({ search: search ? `?${search}` : '', hash }, { replace: true });
  }, [navigate, searchParams, hash]);

  const setActiveTab = useCallback((tab: string) => {
    updateParams((next) => {
      if (tab === 'toutes') next.delete('tab');
      else next.set('tab', tab);
    });
  }, [updateParams]);

  // Filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Référence pour le défilement
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Catégorie et tarif du catalogue d'outils : lus dans l'URL pour qu'un lien partagé garde les filtres.
  const toolOptions = useMemo(() => toolFilterOptions(iaTools), []);
  const highlightedTool = searchParams.get('outil') || '';
  const toolCategory = readToolFilter(searchParams.get('cat'), toolOptions.categories);
  const toolPricing = readToolFilter(searchParams.get('tarif'), toolOptions.pricings);
  const setToolFilter = useCallback((key: 'cat' | 'tarif', value: string) => {
    updateParams((next) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
  }, [updateParams]);
  const resetToolFilters = useCallback(() => {
    updateParams((next) => {
      next.delete('cat');
      next.delete('tarif');
    });
  }, [updateParams]);

  // Options pour les filtres
  // Les étiquettes ne sont pas toutes écrites avec la même casse (« Deep Learning », « deep learning ») : on les
  // regroupe sans tenir compte de la casse, et l'on affiche la variante qui garde le plus de majuscules (sigles,
  // noms propres).
  const topicKey = (tag: string) => tag.trim().toLowerCase();
  const upperCount = (tag: string) => (tag.match(/\p{Lu}/gu) || []).length;
  const topicLabels = new Map<string, string>();
  realResources.flatMap(resource => resource.tags || []).forEach(tag => {
    const key = topicKey(tag);
    const current = topicLabels.get(key);
    if (current === undefined || upperCount(tag) > upperCount(current)) topicLabels.set(key, tag);
  });
  const allTopics = Array.from(topicLabels.values()).sort((a, b) => a.localeCompare(b, 'fr'));

  const allYears = Array.from(new Set(
    realResources.filter(r => r.year).map(r => r.year!)
  )).sort((a, b) => b - a);

  // Ressources filtrées (recherche sans accent, sujet et année).
  const filteredResources = realResources.filter(resource => {
    const matchesSearch = matchesQuery(
      [resource.title, resource.description, resource.source, ...(resource.tags || [])].filter(Boolean).join(' '),
      searchTerm
    );

    const matchesTopic = selectedTopic === 'all' || (resource.tags && resource.tags.some(tag => topicKey(tag) === topicKey(selectedTopic)));
    const matchesYear = selectedYear === 'all' || resource.year === parseInt(selectedYear);

    return matchesSearch && matchesTopic && matchesYear;
  });

  // Publications scientifiques filtrées
  const filteredScientificPublications = scientificPublications.filter(pub => {
    const matchesSearch = matchesQuery(
      [pub.title, pub.description, pub.journal, ...pub.authors].join(' '),
      searchTerm
    );

    const matchesYear = selectedYear === 'all' || pub.year === parseInt(selectedYear);

    return matchesSearch && matchesYear;
  });

  // Outils IA filtrés (recherche, catégorie et tarif).
  const visibleIATools = filterTools(iaTools, {
    category: toolCategory,
    pricing: toolPricing,
    query: searchTerm
  });

  // Applications de l'auteur filtrées (nom, description, catégorie et thèmes).
  const filteredAuthorApps = authorApps.filter(app =>
    matchesQuery(`${app.name} ${app.description} ${app.category} ${app.tags.join(' ')}`, searchTerm)
  );

  // Les filtres sujet et année ne s'appliquent pas à tous les onglets : on ne les affiche que là où ils agissent.
  const showTopic = ['toutes', 'cours', 'videos'].includes(activeTab);
  const showYear = ['toutes', 'cours', 'videos', 'publications'].includes(activeTab);

  // Fonction pour défiler vers les ressources
  const scrollToResources = () => {
    resourcesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero
        title="Ressources d'apprentissage"
        subtitle="Une sélection de ressources, en français pour la plupart, à consulter en ligne pour approfondir vos connaissances sur l'intelligence artificielle. Un guide pour passer à l'action et les applications de l'auteur complètent la sélection. Certaines ressources sont en anglais ou payantes."
      />

      <section className="section-container">
        <ResourcesHeader
          onScrollToResources={scrollToResources}
          onOpenQuiz={() => setShowQuizDialog(true)}
        />

        <div id="resources" ref={resourcesRef} className="mt-10 scroll-mt-20">
          {activeTab !== 'agir' && (
            <ResourceFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              allTopics={allTopics}
              allYears={allYears}
              showTopic={showTopic}
              showYear={showYear}
            />
          )}

          <UnifiedResourcesTabsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredResources={filteredResources}
            filteredScientificPublications={filteredScientificPublications}
            visibleIATools={visibleIATools}
            toolCategories={toolOptions.categories}
            toolPricings={toolOptions.pricings}
            toolCategory={toolCategory}
            toolPricing={toolPricing}
            onToolCategoryChange={(value) => setToolFilter('cat', value)}
            onToolPricingChange={(value) => setToolFilter('tarif', value)}
            onResetToolFilters={resetToolFilters}
            filteredAuthorApps={filteredAuthorApps}
            highlightedTool={highlightedTool}
          />
        </div>
      </section>

      <ContinueLearningSection
        onOpenQuiz={() => setShowQuizDialog(true)}
        onOpenAddResourceForm={() => setShowAddResourceForm(true)}
      />

      <AddResourceForm
        isOpen={showAddResourceForm}
        onClose={() => setShowAddResourceForm(false)}
      />

      <QuizDialog
        isOpen={showQuizDialog}
        onClose={() => setShowQuizDialog(false)}
      />
    </>
  );
};

export default Ressources;
