// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkipLink from '@/components/SkipLink';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { SITE_BASE } from '@/config/site';
import { DEEP_COURSES } from '@/content/cours-approfondis/registry';

// Les pages sont chargées à la demande (un fichier JS par page).
// Toute route ajoutée ici doit avoir son entrée dans src/data/seoData.ts,
// sinon le build échoue (voir scripts/static-routes.ts).

// Pages
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const LesBases = lazy(() => import('@/pages/LesBases'));
const TypesIA = lazy(() => import('@/pages/TypesIA'));
const MachineLearning = lazy(() => import('@/pages/MachineLearning'));
const DeepLearning = lazy(() => import('@/pages/DeepLearning'));
const CasUsage = lazy(() => import('@/pages/CasUsage'));
const Ethique = lazy(() => import('@/pages/Ethique'));
const Ressources = lazy(() => import('@/pages/Ressources'));
const Actualites = lazy(() => import('@/pages/Actualites'));
const Histoire = lazy(() => import('@/pages/Histoire'));
const Glossaire = lazy(() => import('@/pages/Glossaire'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const NiveauxIA = lazy(() => import('@/pages/NiveauxIA'));
const IAMultimodale = lazy(() => import('@/pages/IAMultimodale'));
const LLMDetails = lazy(() => import('@/pages/LLMDetails'));
const EthiqueGouvernance = lazy(() => import('@/pages/EthiqueGouvernance'));
const IAExpliqueeAuxEnfants = lazy(() => import('@/pages/IAExpliqueeAuxEnfants'));

// Cours
const ApprentissageSupervise = lazy(() => import('@/pages/cours/ApprentissageSupervise'));
const ApprentissageNonSupervise = lazy(() => import('@/pages/cours/ApprentissageNonSupervise'));
const BasesMathematiquesIA = lazy(() => import('@/pages/cours/BasesMathematiquesIA'));
const PromptEngineering = lazy(() => import('@/pages/cours/PromptEngineering'));
const ChainOfPrompts = lazy(() => import('@/pages/cours/ChainOfPrompts'));
const ParametresLLM = lazy(() => import('@/pages/cours/ParametresLLM'));
const IACreativite = lazy(() => import('@/pages/cours/IACreativite'));
const DeepLearningPratique = lazy(() => import('@/pages/cours/DeepLearningPratique'));
const IAEthique = lazy(() => import('@/pages/cours/IAEthique'));
const IAEntreprise = lazy(() => import('@/pages/cours/IAEntreprise'));
const NLPComprehension = lazy(() => import('@/pages/cours/NLPComprehension'));
const IAEnvironnement = lazy(() => import('@/pages/cours/IAEnvironnement'));
const PythonIA = lazy(() => import('@/pages/cours/PythonIA'));
const CoursApprofondis = lazy(() => import('@/pages/CoursApprofondis'));
const CoursApprofondi = lazy(() => import('@/pages/cours/CoursApprofondi'));
const PremierModeleML = lazy(() => import('@/pages/cours/PremierModeleML'));
const NLPConcepts = lazy(() => import('@/pages/cours/NLPConcepts'));
const CoderAvecIA = lazy(() => import('@/pages/cours/CoderAvecIA'));
const UtiliserIAQuotidien = lazy(() => import('@/pages/cours/UtiliserIAQuotidien'));
const UtiliserIATravail = lazy(() => import('@/pages/cours/UtiliserIATravail'));
const OrganiserServicesIA = lazy(() => import('@/pages/cours/OrganiserServicesIA'));
const IAMarketingVente = lazy(() => import('@/pages/cours/IAMarketingVente'));

// Outils (100 % dans le navigateur, aucun appel réseau)
const CalculateurCoutsIA = lazy(() => import('@/pages/CalculateurCoutsIA'));
const GenerateurPrompts = lazy(() => import('@/pages/GenerateurPrompts'));
const SimulateurIA = lazy(() => import('@/pages/SimulateurIA'));
const DetecteurContenuIA = lazy(() => import('@/pages/DetecteurContenuIA'));
const OptimiseurWorkflowIA = lazy(() => import('@/pages/OptimiseurWorkflowIA'));
const ComparateurModelesIA = lazy(() => import('@/pages/ComparateurModelesIA'));
const AnalyseurDonnees = lazy(() => import('@/pages/AnalyseurDonnees'));
const GenerateurDonnees = lazy(() => import('@/pages/GenerateurDonnees'));
const AuditeurBiais = lazy(() => import('@/pages/AuditeurBiais'));

// Pages légales
const Confidentialite = lazy(() => import('@/pages/Confidentialite'));
const CGU = lazy(() => import('@/pages/CGU'));
const GestionDonneesRGPD = lazy(() => import('@/pages/GestionDonneesRGPD'));
const MentionsLegales = lazy(() => import('@/pages/MentionsLegales'));

/** Remonte en haut de page à chaque navigation, sauf lien vers une ancre. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const PageFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground" role="status">
    Chargement...
  </div>
);

const MainLayout = () => {
  useDocumentMeta();
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip transition-colors duration-300">
      <SkipLink />
      <ScrollToTop />
      <Header />
      <main
        id="main-content"
        className="grow focus:outline-hidden"
        tabIndex={-1}
        role="main"
      >
        <div className="page-transition">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Le sous-chemin de déploiement vient de src/config/site.ts (même source que la base de Vite).
const basename = SITE_BASE.replace(/\/$/, '') || '/';

function App() {
  return (
    // reducedMotion="user" : framer-motion respecte le réglage système "réduire les animations".
    <MotionConfig reducedMotion="user">
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="les-bases" element={<LesBases />} />
            <Route path="types-ia" element={<TypesIA />} />
            <Route path="niveaux-ia" element={<NiveauxIA />} />
            <Route path="machine-learning" element={<MachineLearning />} />
            <Route path="ia-multimodale" element={<IAMultimodale />} />
            <Route path="ia-expliquee-aux-enfants" element={<IAExpliqueeAuxEnfants />} />
            <Route path="deep-learning" element={<DeepLearning />} />
            <Route path="cas-usage" element={<CasUsage />} />
            <Route path="ethique" element={<Ethique />} />
            <Route path="ressources" element={<Ressources />} />
            <Route path="actualites" element={<Actualites />} />
            <Route path="histoire" element={<Histoire />} />
            <Route path="glossaire" element={<Glossaire />} />

            {/* Cours */}
            <Route path="cours/apprentissage-supervise" element={<ApprentissageSupervise />} />
            <Route path="cours/apprentissage-non-supervise" element={<ApprentissageNonSupervise />} />
            <Route path="cours/bases-mathematiques-ia" element={<BasesMathematiquesIA />} />
            <Route path="cours/prompt-engineering" element={<PromptEngineering />} />
            <Route path="cours/chain-of-prompts" element={<ChainOfPrompts />} />
            <Route path="cours/parametres-llm" element={<ParametresLLM />} />
            <Route path="cours/ia-creativite" element={<IACreativite />} />
            <Route path="cours/deep-learning-pratique" element={<DeepLearningPratique />} />
            <Route path="cours/ia-ethique" element={<IAEthique />} />
            <Route path="cours/ia-entreprise" element={<IAEntreprise />} />
            <Route path="cours/nlp-comprehension" element={<NLPComprehension />} />
            <Route path="cours/ia-environnement" element={<IAEnvironnement />} />
            <Route path="cours/python-ia" element={<PythonIA />} />
            <Route path="cours/premier-modele-ml" element={<PremierModeleML />} />
            <Route path="cours/nlp-concepts" element={<NLPConcepts />} />
            <Route path="cours/coder-avec-ia" element={<CoderAvecIA />} />
            <Route path="cours/utiliser-ia-quotidien" element={<UtiliserIAQuotidien />} />
            <Route path="cours/utiliser-ia-travail" element={<UtiliserIATravail />} />
            <Route path="cours/organiser-services-ia" element={<OrganiserServicesIA />} />
            <Route path="cours/ia-marketing-vente" element={<IAMarketingVente />} />

            {/* Cours approfondis : une route par cours du registre (le plugin de routes statiques lit le même registre) */}
            <Route path="cours-approfondis" element={<CoursApprofondis />} />
            {DEEP_COURSES.map((course) => (
              <Route key={course.slug} path={`cours/${course.slug}`} element={<CoursApprofondi slug={course.slug} />} />
            ))}

            {/* Pages spécialisées */}
            <Route path="types-ia/llm" element={<LLMDetails />} />
            <Route path="ethique-gouvernance" element={<EthiqueGouvernance />} />

            {/* Outils */}
            <Route path="calculateur-couts-ia" element={<CalculateurCoutsIA />} />
            <Route path="generateur-prompts" element={<GenerateurPrompts />} />
            <Route path="simulateur-ia" element={<SimulateurIA />} />
            <Route path="detecteur-contenu-ia" element={<DetecteurContenuIA />} />
            <Route path="optimiseur-workflow-ia" element={<OptimiseurWorkflowIA />} />
            <Route path="comparateur-modeles-ia" element={<ComparateurModelesIA />} />
            <Route path="analyseur-donnees" element={<AnalyseurDonnees />} />
            <Route path="generateur-donnees" element={<GenerateurDonnees />} />
            <Route path="auditeur-biais" element={<AuditeurBiais />} />

            {/* Pages légales */}
            <Route path="confidentialite" element={<Confidentialite />} />
            <Route path="cgu" element={<CGU />} />
            <Route path="gestion-donnees-rgpd" element={<GestionDonneesRGPD />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      {/* Deux systèmes de notification coexistent (sonner et radix) : les deux sont montés. */}
      <SonnerToaster />
      <Toaster />
    </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
