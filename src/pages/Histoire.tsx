// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  ExternalLink,
  FileText,
  Globe,
  Lightbulb,
  Users,
} from 'lucide-react';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import Timeline from '@/components/timeline/Timeline';
import RelatedLinks from '@/components/courses/RelatedLinks';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { asset } from '@/lib/paths';
import {
  books,
  eras,
  figures,
  popularCulture,
  publications,
  readingLinks,
  siteLinks,
} from '@/components/history/historyData';

const ExternalList = ({ links }: { links: { label: string; href: string }[] }) => (
  <ul className="space-y-2">
    {links.map((link) => (
      <li key={link.href} className="flex items-start">
        <ExternalLink className="h-3 w-3 mr-2 mt-1.5 text-primary shrink-0" aria-hidden="true" />
        <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
          {link.label}
        </a>
      </li>
    ))}
  </ul>
);

/**
 * Histoire de l'intelligence artificielle : frise interactive, grandes périodes, personnalités,
 * publications fondatrices et lectures. Les données sont dans components/history/historyData.ts.
 */
const Histoire = () => (
  <>
    <Hero
      title="Histoire de l'intelligence artificielle"
      subtitle="Les moments clés, les pionniers et les revirements qui ont façonné l'IA, des années 1940 à 2024."
    />

    <section className="section-container">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={asset('pics/frise-histoire-ia.jpg')}
            alt="Illustration : une frise sur fond sombre, d'un ancien ordinateur à bandes magnétiques à deux smartphones, en passant par un échiquier, un écran cathodique, un réseau de points reliés et un ordinateur portable"
            className="w-full h-64 object-cover object-center"
          />
        </div>

        <SectionHeading
          pretitle="Chronologie interactive"
          title="Les grandes étapes de l'IA"
          description="Cliquez sur une étape pour en lire le détail et découvrir les termes techniques associés."
          center
        />

        <div className="mb-12">
          <Timeline />
        </div>

        <section className="mb-12">
          <SectionHeading
            title="Les grandes périodes"
            description="Les mêmes événements replacés dans leur contexte : succès, désillusions et renouveaux."
          />

          <Tabs defaultValue="inception" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto w-full mb-6 bg-secondary/30 p-1 rounded-xl gap-1">
              {eras.map((era) => (
                <TabsTrigger
                  key={era.id}
                  value={era.id}
                  className="text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
                >
                  <span className="flex items-center gap-1">
                    <era.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {era.short}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {eras.map((era) => (
              <TabsContent key={era.id} value={era.id}>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Card className={`border-2 bg-linear-to-br ${era.color}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="p-2 bg-primary/10 rounded-full mr-3">
                          <CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" />
                        </span>
                        {era.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">{era.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {era.events.map((item) => (
                          <li key={`${item.year}-${item.event}`} className="flex items-start gap-4">
                            <span className="shrink-0 min-w-16 px-3 py-1 bg-primary text-primary-foreground rounded-full text-center text-sm font-bold">
                              {item.year}
                            </span>
                            <p className="bg-card/80 p-3 rounded-lg border border-border/50 text-sm leading-relaxed grow">
                              {item.event}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Lightbulb className="mr-3 h-6 w-6 text-primary" aria-hidden="true" />
              Défis et controverses
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                <h3 className="font-bold mb-2 text-lg">Des questions éthiques centrales</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Biais, vie privée, désinformation, impact sur l'emploi et consommation d'énergie sont devenus des
                  enjeux majeurs du développement de l'IA. Ils sont détaillés dans la page{' '}
                  <Link to="/ethique" className="text-primary hover:underline">
                    Éthique
                  </Link>
                  .
                </p>
              </div>

              <Alert className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
                <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                <AlertTitle className="text-amber-900 dark:text-amber-200 font-bold">Les hivers de l'IA</AlertTitle>
                <AlertDescription className="text-amber-900 dark:text-amber-200">
                  L'histoire de l'IA a connu deux « hivers » : des périodes de désillusion et de baisse des financements
                  après des attentes trop élevées, de 1974 à 1980 environ, puis de 1987 à 1993 environ.
                </AlertDescription>
              </Alert>

              <div className="p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                <h3 className="font-bold mb-2 text-lg">Des promesses souvent exagérées</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Chaque vague d'enthousiasme s'est accompagnée de prédictions trop optimistes, puis de déceptions. Cela
                  invite à garder un regard critique sur les annonces d'aujourd'hui, sans nier les progrès réels.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="mr-3 h-6 w-6 text-primary" aria-hidden="true" />
              Impacts culturels
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                L'IA a profondément marqué l'imaginaire collectif, de HAL 9000 dans « 2001, l'Odyssée de l'espace » aux
                récits contemporains sur les assistants et les machines autonomes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                  <h3 className="font-bold mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" />
                    Littérature
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Isaac Asimov et ses « Trois lois de la robotique » ont façonné notre façon de penser l'éthique des
                    machines.
                  </p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                  <h3 className="font-bold mb-2 flex items-center">
                    <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                    Cinéma
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    De « Metropolis » (1927) à « Her » (2013), le cinéma explore notre relation aux machines
                    intelligentes.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
                    L'IA dans la culture populaire
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-2 text-sm">
                  {popularCulture.map((item) => (
                    <div key={item.work} className="flex justify-between items-center gap-3 border-b pb-2">
                      <span className="font-medium">{item.work}</span>
                      <span className="text-muted-foreground text-xs text-right">{item.character}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <SectionHeading title="Personnalités marquantes" description="Des pionniers et des chercheurs qui ont façonné l'IA." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {figures.map((person) => (
              <div
                key={person.name}
                className="p-6 border-2 border-border rounded-xl text-center bg-linear-to-br from-card to-secondary/5 transition-shadow hover:shadow-lg"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20"
                  aria-hidden="true"
                >
                  <span className="text-lg font-bold text-primary">
                    {person.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{person.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 font-medium">{person.years}</p>
                <p className="text-sm mb-2 font-medium">{person.contribution}</p>
                <p className="text-xs text-muted-foreground italic">{person.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Publications fondatrices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((publication) => (
              <Card key={publication.title} className="overflow-hidden">
                <CardHeader className="bg-secondary/5">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base">{publication.title}</CardTitle>
                    <span className="text-primary font-bold">{publication.year}</span>
                  </div>
                  <CardDescription>{publication.author}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm">{publication.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted/30 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Pour approfondir</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
                  Textes fondateurs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ExternalList links={readingLinks} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" />
                  Livres de référence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-2">
                  {books.map((book) => (
                    <li key={book}>{book}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                  Sites
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ExternalList links={siteLinks} />
              </CardContent>
            </Card>
          </div>
        </section>

        <RelatedLinks
          links={[
            { to: '/les-bases', title: "Les bases de l'IA", description: 'Les concepts fondamentaux, expliqués simplement.' },
            { to: '/machine-learning', title: 'Machine learning', description: "Comment les machines apprennent à partir de données." },
            { to: '/ethique', title: "Éthique de l'IA", description: 'Biais, vie privée, responsabilité.' },
            { to: '/cours/nlp-comprehension', title: 'Comprendre le NLP et les LLM', description: "Des transformers aux modèles de langage actuels." },
          ]}
        />
      </div>
    </section>
  </>
);

export default Histoire;
