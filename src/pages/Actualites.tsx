// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import IANews from '@/components/news/IANews';
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ExternalLink, Lightbulb, Newspaper } from 'lucide-react';
import { asset } from '@/lib/paths';

/**
 * Page d'actualités sur l'intelligence artificielle
 * @returns {JSX.Element} Le composant de la page Actualités
 */
const Actualites = () => {
  return (
    <>
      <Hero
        title="Veille sur l'IA"
        subtitle="Une sélection de sources, surtout francophones, pour suivre l'actualité de l'intelligence artificielle."
      />

      <section className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={asset("pics/veille-carnet.jpg")} 
              alt="Illustration : un livre ouvert, surmonté d'une bulle de dialogue et d'une loupe, sur fond bleu-gris" 
              className="w-full h-64 object-cover object-center"
            />
          </div>
          
          <SectionHeading
            pretitle="Veille technologique"
            title="Où suivre l'actualité de l'IA"
            description="Sources de la recherche, institutions et médias à consulter directement ou à suivre dans votre lecteur de flux RSS."
            center
          />

          <div className="mt-10">
            <IANews />
          </div>
        </div>
      </section>

      <section className="section-container bg-muted/30 rounded-3xl py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="heading-lg mb-3">Approfondir vos connaissances</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Au-delà de la veille, explorez les autres sections pour comprendre les fondements et les applications pratiques de l'intelligence artificielle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-xs border">
              <Lightbulb className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ressources pédagogiques</h3>
              <p className="text-muted-foreground mb-4">Consultez la sélection de ressources, en français pour la plupart, pour approfondir vos connaissances en IA.</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/ressources">Explorer les ressources</Link>
              </Button>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-xs border">
              <ExternalLink className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Glossaire technique</h3>
              <p className="text-muted-foreground mb-4">Comprendre le vocabulaire spécifique de l'IA est essentiel pour suivre son actualité.</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/glossaire">Consulter le glossaire</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Actualites;
