// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import TermsGlossary from '@/components/glossary/TermsGlossary';
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Mail, BookOpen } from 'lucide-react';
import { asset } from '@/lib/paths';

const Glossaire = () => {
  return (
    <>
      <Hero
        title="Glossaire des termes d'IA"
        subtitle="Une collection de définitions pour comprendre le vocabulaire technique et éthique de l'intelligence artificielle."
      />

      <section className="section-container">
        <div className="max-w-full mx-auto">
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-500 group">
            <img 
              src={asset("pics/veille-carnet.jpg")} 
              alt="Illustration : un livre ouvert, surmonté d'une bulle de dialogue et d'une loupe, sur fond bleu-gris" 
              className="w-full h-64 object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <SectionHeading
            pretitle="Référence"
            title="Comprendre le vocabulaire de l'IA"
            description="Ce glossaire rassemble les termes généraux, techniques, éthiques, avancés et liés à la mémoire en intelligence artificielle."
            center
          />
          
          <div className="mt-10">
            <TermsGlossary />
          </div>
        </div>
      </section>

      <section className="section-container bg-linear-to-br from-muted/50 to-muted/30 rounded-3xl py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary)/0.1)_0%,transparent_50%)]"></div>
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4 transform hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-lg">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="heading-lg mb-3 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Enrichir votre connaissance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explorez les autres sections pour approfondir votre compréhension des technologies d'intelligence artificielle.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              variant="default"
              className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
            >
              <Link to="/ethique">Éthique de l'IA</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:bg-primary/5"
            >
              <Link to="/machine-learning">Machine Learning</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
            >
              <Link to="/cas-usage">Cas d'usage</Link>
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/50 flex justify-center items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-xs border hover:shadow-md transition-all duration-300 hover:scale-105">
              <Mail className="h-4 w-4" />
              <span>Pour contribuer au glossaire ou signaler une erreur : </span>
              <a 
                href="mailto:geoffroy.streit@ik.me" 
                className="ml-1 text-primary hover:underline transition-colors duration-200 hover:text-primary/80"
              >
                geoffroy.streit@ik.me
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Glossaire;
