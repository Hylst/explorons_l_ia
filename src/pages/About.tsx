// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CONTACT_EMAIL, AUTHOR_GITHUB, AUTHOR_LINKEDIN, SOURCE_URL } from '@/config/site';
import { Badge } from '@/components/ui/badge';
import { Mail, Github, Linkedin, Heart, Code, BookOpen, Users, MessageSquare, Lightbulb, Compass, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import NeuralNetworkInteractive from '@/components/ml/visualization/NeuralNetworkInteractive';

const About = () => {
  const author = {
    name: "Geoffroy Streit",
    role: "Auteur et développeur du site",
    bio: "Ancien ingénieur en sciences de l'industrie, concepteur-développeur d'applications, avec vingt ans de commerce et de gestion derrière lui. Depuis 2023, il se forme en autodidacte à la data science, à l'intelligence artificielle, au machine learning et à Python. Explorons l'IA est un projet personnel\u00A0: il y met en forme ce qu'il apprend, avec l'aide d'outils d'IA générative, dans un esprit d'accessibilité et de vulgarisation responsable. Le contenu n'est pas rédigé par un chercheur ni relu par un comité\u00A0: les sources sont citées pour pouvoir être vérifiées, et toute erreur peut être signalée par e-mail.",
    initials: "GS",
    links: {
      email: CONTACT_EMAIL,
      github: AUTHOR_GITHUB,
      linkedin: AUTHOR_LINKEDIN
    }
  };

  return (
    <>
      <Hero
        title="À propos d'Explorons l'IA"
        subtitle="Pourquoi ce site existe, qui l'écrit et dans quel esprit."
      />

      <section className="py-8 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="h-[300px] relative mb-12 rounded-xl overflow-hidden border border-primary/20 shadow-lg">
            <NeuralNetworkInteractive />
          </div>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            pretitle="La mission"
            title="Démystifier l'intelligence artificielle pour tous"
            description="Explorons l'IA est né d'une envie simple : partager avec le public francophone ce que son auteur apprend sur l'IA, le plus clairement possible, en gardant un regard réfléchi et critique sur ces technologies."
            center
          />

          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-linear-to-br from-primary/5 to-blue-50 dark:to-blue-950/20 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Une approche pédagogique et responsable</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">🎯 Vision éducative</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Transformer la complexité de l'IA en connaissances accessibles, en proposant des explications claires, 
                    des visualisations interactives et des exemples concrets qui permettent à chacun de comprendre 
                    les enjeux et opportunités de l'intelligence artificielle.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">🌍 Utilité</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Aider chacun à mieux comprendre l'IA, pour décider en connaissance de cause de ses usages
                    plutôt que de la subir.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">🔬 Exactitude</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Viser la précision technique tout en gardant le contenu accessible. 
                    Chaque concept est expliqué avec ses nuances, ses limites et ses applications pratiques, 
                    loin du sensationnalisme médiatique.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">⚖️ Éthique et transparence</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Aborder les questions éthiques, les biais potentiels et les enjeux sociétaux de l'IA. 
                    Encourager une réflexion critique sur l'impact de ces technologies sur notre société 
                    et notre avenir collectif.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-card shadow-xs">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Éducation</CardTitle>
                <CardDescription>Fournir des ressources pédagogiques sur l'IA en français</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-card shadow-xs">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Accessibilité</CardTitle>
                <CardDescription>Rendre les concepts complexes d'IA compréhensibles pour tous les publics</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-card shadow-xs">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Dialogue</CardTitle>
                <CardDescription>Favoriser une compréhension critique des enjeux éthiques et sociétaux de l'IA</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <SectionHeading
            pretitle="Le créateur"
            title="L'auteur d'Explorons l'IA"
            description="Une seule personne conçoit et édite ce site, avec l'aide d'outils d'IA générative, par passion et pour apprendre en partageant."
            center
          />
          
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card shadow-xs overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{author.name}</h3>
                    <p className="text-sm text-muted-foreground">{author.role}</p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">#ia</Badge>
                      <Badge variant="outline" className="text-xs">#python</Badge>
                      <Badge variant="outline" className="text-xs">#data-science</Badge>
                      <Badge variant="outline" className="text-xs">#autodidacte</Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{author.bio}</p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <a href={`mailto:${author.links.email}`}>
                      <Mail className="h-3.5 w-3.5" />
                      <span className="text-xs">E-mail</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <a href={author.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5" />
                      <span className="text-xs">GitHub</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <a href={author.links.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-3.5 w-3.5" />
                      <span className="text-xs">LinkedIn</span>
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Centres d'intérêt de l'auteur, hors du site */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                  <Compass className="h-6 w-6 text-green-700 dark:text-green-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl text-green-800 dark:text-green-200">Au-delà de ce site</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <p className="text-green-800 dark:text-green-200 leading-relaxed">
                    En dehors de l'IA, je m'intéresse à d'autres domaines techniques, et je reste ouvert aux échanges
                    sur des projets qui ont du sens pour les personnes.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/50 dark:bg-green-950/30 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-green-700 dark:text-green-400" />
                        <span className="font-semibold text-green-800 dark:text-green-200">Nouvelles énergies</span>
                      </div>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Solutions durables et technologies propres
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-green-950/30 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-green-700 dark:text-green-400" />
                        <span className="font-semibold text-green-800 dark:text-green-200">Optique / Électronique</span>
                      </div>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Capteurs, instruments, montages
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-green-950/30 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-4 w-4 text-green-700 dark:text-green-400" />
                        <span className="font-semibold text-green-800 dark:text-green-200">Technologies utiles</span>
                      </div>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Des outils au service des personnes
                      </p>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 max-w-2xl mx-auto text-center">
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Une erreur, une suggestion ?</h3>
              <p className="text-muted-foreground mb-4">
                Explorons l'IA est un projet personnel qui évolue au fil de ce que j'apprends. Une erreur, une source
                à ajouter, une piste d'amélioration : un e-mail suffit.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="default" className="gap-2" asChild>
                  <a href={`mailto:${author.links.email}`}>
                    <Mail className="h-4 w-4" />
                    <span>Contacter l'auteur</span>
                  </a>
                </Button>
                {SOURCE_URL && (
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
                      <Code className="h-4 w-4" />
                      <span>Voir le code source</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
