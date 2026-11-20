// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Link } from 'react-router';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import InteractiveFeatureCard from '@/components/home/InteractiveFeatureCard';
import StatsSection from '@/components/home/StatsSection';
import InnovationShowcase from '@/components/home/InnovationShowcase';
import LearningPathway from '@/components/home/LearningPathway';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  BrainCircuit, 
  GraduationCap, 
  Code, 
  FileSearch2, 
  Lightbulb,
  Brain,
  BarChart3,
  Palette,
  Target,
  Zap,
  BookOpen,
  ChevronRight,
  Star,
  Rocket
} from 'lucide-react';

const Home = () => {
  const mainFeatures = [
    {
      title: "Les bases de l'IA",
      description: "Découvrez les concepts fondamentaux expliqués simplement avec des analogies et exemples pratiques.",
      icon: <Brain className="w-12 h-12 text-primary" />,
      link: "/les-bases",
      gradient: "from-blue-500 to-purple-600",
      features: [
        "Concepts expliqués simplement",
        "Analogies pédagogiques",
        "Exemples interactifs",
        "Schémas visuels"
      ]
    },
    {
      title: "Types d'IA",
      description: "Explorez les différentes technologies d'IA\u00A0: LLM, CNN, NLP, RAG et leurs applications.",
      icon: <Lightbulb className="w-12 h-12 text-primary" />,
      link: "/types-ia",
      gradient: "from-amber-500 to-orange-600",
      features: [
        "Classification des grandes familles",
        "Technologies actuelles",
        "Comparaisons détaillées",
        "Tendances émergentes"
      ]
    },
    {
      title: "Machine Learning",
      description: "Découvrez les algorithmes d'apprentissage automatique avec des visualisations interactives.",
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      link: "/machine-learning",
      gradient: "from-green-500 to-teal-600",
      features: [
        "Algorithmes expliqués",
        "Visualisations interactives",
        "Exemples pratiques",
        "Applications concrètes"
      ]
    },
    {
      title: "IA Créative",
      description: "Découvrez comment l'IA transforme la création artistique, musicale et littéraire.",
      icon: <Palette className="w-12 h-12 text-primary" />,
      link: "/ia-multimodale",
      gradient: "from-pink-500 to-rose-600",
      features: [
        "Génération d'images",
        "Création musicale",
        "Écriture assistée",
        "Outils créatifs"
      ]
    },
    {
      title: "Cas d'usage",
      description: "Explorez les applications concrètes de l'IA dans différents secteurs d'activité.",
      icon: <Target className="w-12 h-12 text-primary" />,
      link: "/cas-usage",
      gradient: "from-indigo-500 to-blue-600",
      features: [
        "Secteurs d'application",
        "Exemples réels",
        "Impacts et limites",
        "Études de cas"
      ]
    },
    {
      title: "Cours interactifs",
      description: "Des cours avec simulations et exercices pratiques.",
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      link: "/cours/apprentissage-supervise",
      gradient: "from-violet-500 to-purple-600",
      features: [
        "Apprentissage supervisé",
        "Prompt engineering",
        "Deep Learning pratique",
        "Projets guidés"
      ]
    }
  ];

  const quickStartOptions = [
    {
      title: "Nouveau en IA\u00A0?",
      description: "Commencez par comprendre les bases",
      icon: <Sparkles className="h-6 w-6" />,
      link: "/les-bases",
      variant: "default" as const
    },
    {
      title: "Développeur\u00A0?",
      description: "Explorez les applications pratiques",
      icon: <Code className="h-6 w-6" />,
      link: "/cas-usage",
      variant: "outline" as const
    },
    {
      title: "Étudiant\u00A0?",
      description: "Des cours progressifs, étape par étape",
      icon: <BookOpen className="h-6 w-6" />,
      link: "/cours/apprentissage-supervise",
      variant: "secondary" as const
    }
  ];

  return (
    <>
      <Hero
        title="Explorez l'intelligence artificielle"
        subtitle="Comprenez l'IA et apprenez à l'utiliser avec des explications claires, des cours progressifs et des outils interactifs, gratuits et sans inscription."
      />

      {/* Quick Start Section */}
      <section className="section-container bg-linear-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Star className="w-4 h-4" />
            Par où commencer ?
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Quel est votre profil ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Trois points d'entrée possibles, selon ce que vous savez déjà et ce que vous cherchez
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStartOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                <Button asChild variant={option.variant} size="sm" className="w-full">
                  <Link to={option.link} className="flex items-center justify-center gap-2" aria-label={`Y aller\u00A0: ${option.title}`}>
                    Y aller
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Features Section */}
      <section className="section-container">
        <SectionHeading 
          pretitle="Les contenus"
          title="Les grands domaines de l'IA"
          description="Découvrez les grands domaines de l'intelligence artificielle à travers des sections thématiques interactives et une sélection de ressources pédagogiques."
          center
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {mainFeatures.map((feature, index) => (
            <InteractiveFeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
              gradient={feature.gradient}
              features={feature.features}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Innovation Showcase */}
      <InnovationShowcase />

      {/* Learning Pathway */}
      <LearningPathway />

      {/* Ce que contient le site */}
      <section className="section-container bg-linear-to-br from-muted/30 to-background">
        <SectionHeading 
          title="L'esprit du site"
          description="Des contenus en accès libre, sans inscription, sans cookie ni traceur"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="hover:shadow-md transition-shadow group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Sparkles className="h-10 w-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Approche pédagogique</h3>
              <p className="text-sm text-muted-foreground">
                Contenus structurés avec analogies, visualisations et exemples concrets pour faciliter l'apprentissage.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BrainCircuit className="h-10 w-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Contenu relu</h3>
              <p className="text-sm text-muted-foreground">
                Contenus relus et corrigés au fil du temps. Signalez toute erreur ou information périmée.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <GraduationCap className="h-10 w-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Parcours progressif</h3>
              <p className="text-sm text-muted-foreground">
                Parcours en plusieurs étapes, des bases aux cours pratiques, avec des jalons clairs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Plateforme Hylst IT learning */}
      <section className="section-container">
        <SectionHeading
          pretitle="Écosystème"
          title="La plateforme Hylst IT learning"
          description="Prolongez votre apprentissage avec les autres sites et applications de la plateforme hylst.fr, consacrés à la data science, aux mathématiques, aux bases de données et à la gouvernance."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="hover:shadow-md transition-shadow group flex flex-col justify-between">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Explorons la Data Science</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Cours de data science en français&nbsp;: mathématiques, statistiques, Python, machine learning, quiz et éditeur de code exécuté dans le navigateur.
              </p>
              <a
                href="https://hylst.fr/data_science_explorer/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Visiter le site <ChevronRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow group flex flex-col justify-between">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Guide Maths pour l'IA</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Cours, exercices, quiz, simulateurs et fiches du primaire au supérieur pour consolider les bases mathématiques utiles à l'IA.
              </p>
              <a
                href="https://edu.hylst.fr/guide_maths/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Visiter le site <ChevronRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow group flex flex-col justify-between">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">DataLab Studio+</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Créer, importer, requêter et exporter des bases SQL et NoSQL directement dans le navigateur&nbsp;: aucun serveur, aucune inscription.
              </p>
              <a
                href="https://hylst.fr/datalab/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Visiter le site <ChevronRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow group flex flex-col justify-between">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">DataLittéracie</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Parcours pour comprendre le cycle de vie des données en les manipulant&nbsp;: collecte, nettoyage, graphiques, prédiction, stockage et RGPD.
              </p>
              <a
                href="https://ia.hylst.fr/datalitteracie/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Visiter le site <ChevronRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow group flex flex-col justify-between">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">Boussole IA</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Guide gratuit pour comprendre, choisir, mettre en œuvre et encadrer l'IA dans une TPE, une association ou une collectivité.
              </p>
              <a
                href="https://ia.hylst.fr/boussole-ia/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Visiter le site <ChevronRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow group flex flex-col justify-between bg-primary/5 border-primary/20">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Toutes les applications</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Découvrez l'ensemble des 11 applications de la plateforme hylst.fr, couvrant aussi la pensée critique, le Green IT et la confidentialité.
                </p>
              </div>
              <Link
                to="/ressources?tab=ecosysteme"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Voir l'écosystème complet <ChevronRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-container bg-linear-to-br from-primary/10 via-purple-500/5 to-pink-500/10 border-y relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            <Rocket className="w-4 h-4" aria-hidden="true" />
            Accès libre, sans inscription
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Comprendre l'IA pour mieux l'utiliser
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Savoir ce que ces outils font, et ce qu'ils ne font pas, aide à choisir quand s'en servir et quand
            s'en passer. Commencez par les bases ou choisissez directement le sujet qui vous intéresse.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link to="/les-bases" className="flex items-center gap-2">
                <span className="relative z-10">Commencer par les bases</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-linear-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Link to="/ressources" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Explorer les ressources
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
