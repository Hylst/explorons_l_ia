// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import Quiz from '@/components/ethics/Quiz';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Lightbulb, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const QuizSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  return (
    <section className="section-container bg-muted/40 rounded-3xl py-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          pretitle="Testez vos connaissances"
          title="Quiz interactif sur l'éthique de l'IA"
          description="Mettez à l'épreuve votre compréhension des principes éthiques et des enjeux liés à l'intelligence artificielle."
          center
        />
        
        <Tabs
          defaultValue="quiz"
          className="mt-8"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Quiz</span>
              </TabsTrigger>
              <TabsTrigger value="ressources" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                <span>Ressources</span>
              </TabsTrigger>
              <TabsTrigger value="historique" className="flex items-center gap-2">
                <History className="h-4 w-4" aria-hidden="true" />
                <span>Historique</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="quiz" className="mt-4">
            <div className="bg-card rounded-lg shadow-xs">
              <Quiz />
            </div>
          </TabsContent>
          
          <TabsContent value="ressources" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Ressources pour approfondir</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <p>
                      <span className="font-medium">Déclaration de Montréal pour l'IA responsable</span> - 
                      Un cadre éthique qui propose des principes directeurs pour le développement de l'IA.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <p>
                      <span className="font-medium">AI Ethics Guidelines Global Inventory (AlgorithmWatch)</span> -
                      Inventaire de 167 lignes directrices éthiques pour l'IA établi en 2020 par AlgorithmWatch ; utile comme point de départ historique.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <p>
                      <span className="font-medium">L'AI Act européen</span> - 
                      Selon la Commission européenne, le premier cadre juridique complet sur l'IA au niveau mondial.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <p>
                      <span className="font-medium">OBVIA (Observatoire international sur les impacts sociétaux de l'IA et du numérique, Québec)</span> -
                      Réseau de recherche qui étudie les impacts sociétaux de l'IA et du numérique (obvia.ca).
                    </p>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button variant="outline" onClick={() => setActiveTab('quiz')}>
                    Retourner au quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="historique" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Historique de l'éthique en IA</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary/30 pl-4 py-1">
                    <p className="text-sm text-muted-foreground">1942</p>
                    <p className="font-medium">Les Trois Lois de la Robotique</p>
                    <p className="text-sm">Isaac Asimov propose dans ses nouvelles les premières règles éthiques pour les robots.</p>
                  </div>
                  <div className="border-l-2 border-primary/30 pl-4 py-1">
                    <p className="text-sm text-muted-foreground">1956</p>
                    <p className="font-medium">Conférence de Dartmouth</p>
                    <p className="text-sm">Atelier d'été au Dartmouth College où le terme « intelligence artificielle » est proposé ; il est souvent présenté comme l'acte de naissance du domaine. Sa proposition de recherche ne traitait pas d'éthique.</p>
                  </div>
                  <div className="border-l-2 border-primary/30 pl-4 py-1">
                    <p className="text-sm text-muted-foreground">2016</p>
                    <p className="font-medium">Création du Partnership on AI</p>
                    <p className="text-sm">Organisation à but non lucratif, créée en 2016 à l'initiative de grandes entreprises technologiques et réunissant aujourd'hui aussi des universités, des associations et des médias ; elle publie des recommandations sur une IA responsable.</p>
                  </div>
                  <div className="border-l-2 border-primary/30 pl-4 py-1">
                    <p className="text-sm text-muted-foreground">2018</p>
                    <p className="font-medium">Déclaration de Montréal</p>
                    <p className="text-sm">Publication de principes pour une IA responsable et éthique.</p>
                  </div>
                  <div className="border-l-2 border-primary/30 pl-4 py-1">
                    <p className="text-sm text-muted-foreground">2021</p>
                    <p className="font-medium">UNESCO - Recommandation sur l'éthique de l'IA</p>
                    <p className="text-sm">Selon l'UNESCO, premier instrument mondial de normalisation sur l'éthique de l'IA ; recommandation non contraignante adoptée par ses 193 États membres en novembre 2021.</p>
                  </div>
                  <div className="border-l-2 border-primary/30 pl-4 py-1">
                    <p className="text-sm text-muted-foreground">2024</p>
                    <p className="font-medium">Adoption et entrée en vigueur du règlement européen sur l'IA (1er août 2024)</p>
                    <p className="text-sm">Cadre juridique européen qui classe les systèmes d'IA selon leur niveau de risque, applicable par étapes jusqu'en 2028.</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" onClick={() => setActiveTab('quiz')}>
                    Retourner au quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default QuizSection;
