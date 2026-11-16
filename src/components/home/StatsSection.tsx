// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Sparkles, Zap } from 'lucide-react';
import { courses } from '@/components/resources/data/coursesData';
import { aiTerms } from '@/components/glossary/glossaryData';
import { iaTools } from '@/components/resources/data/toolsData';
import { books } from '@/components/resources/data/booksData';
import { articles } from '@/components/resources/data/articlesData';
import { videos } from '@/components/resources/data/videosData';
import { websites } from '@/components/resources/data/websitesData';
import { scientificPublications } from '@/components/resources/data/scientificPublicationsData';

const StatsSection = () => {
  // Chiffres réels du contenu, tous calculés à partir des données (cours, termes du glossaire, ressources, outils).
  // Pas de métriques d'audience affichées : le site n'exécute aucun traceur dans le navigateur.
  const internalCourses = courses.filter((course) => course.isInternal).length;
  // Ressources externes : toute fiche qui renvoie vers un site tiers (une fiche sans lien ne compte pas).
  const externalResources = [
    ...iaTools.filter((tool) => !tool.link.startsWith('/')),
    ...books,
    ...articles,
    ...videos,
    ...websites,
    ...scientificPublications,
    ...courses.filter((course) => !course.isInternal),
  ].filter((resource) => Boolean(resource.link)).length;
  // Outils intégrés au site : les fiches de toolsData.ts qui pointent vers une page interne.
  const internalTools = iaTools.filter((tool) => tool.link.startsWith('/')).length;
  const stats = [
    {
      number: String(internalCourses),
      label: "Cours thématiques",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Des bases mathématiques à l'usage de l'IA au travail"
    },
    {
      number: String(aiTerms.length),
      label: "Termes au glossaire",
      icon: <Brain className="w-6 h-6" />,
      description: "Vocabulaire technique et éthique"
    },
    {
      number: String(externalResources),
      label: "Ressources externes",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Cours, vidéos, livres, articles, publications et outils tiers sélectionnés"
    },
    {
      number: String(internalTools),
      label: "Outils interactifs",
      icon: <Zap className="w-6 h-6" />,
      description: "Qui fonctionnent dans votre navigateur",
      href: '/ressources?tab=outils'
    }
  ];

  return (
    <section className="py-20 bg-linear-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
      
      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Explorons l'IA en chiffres
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Le contenu du site, gratuit et sans inscription
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className={`relative text-center group hover:scale-105 transition-transform duration-300 bg-card/30 backdrop-blur-xs rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg ${
                stat.href ? 'cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring' : ''
              }`}
            >
              <div className="flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base font-medium mb-2">
                {stat.href ? (
                  // Lien étendu : le pseudo-élément couvre toute la carte, qui devient cliquable à la souris et au clavier.
                  <Link
                    to={stat.href}
                    className="hover:underline focus-visible:outline-hidden after:absolute after:inset-0 after:rounded-xl after:content-['']"
                  >
                    {stat.label}
                  </Link>
                ) : (
                  stat.label
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
