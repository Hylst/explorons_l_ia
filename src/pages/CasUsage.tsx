// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import BusinessCasesGrid from '@/components/cas-usage/BusinessCasesGrid';
import ApplicationsGrid from '@/components/cas-usage/ApplicationsGrid';
import DetailedExamples from '@/components/cas-usage/DetailedExamples';
import ResourceLinks from '@/components/cas-usage/ResourceLinks';
import EmergingTechnologies from '@/components/cas-usage/EmergingTechnologies';
import { Users, Leaf, BarChart } from 'lucide-react';
import { asset } from '@/lib/paths';

/**
 * Page présentant les cas d'usage concrets de l'IA
 * @returns {JSX.Element} Le composant de la page des cas d'usage
 */
const CasUsage = () => {
  const [activeTab, setActiveTab] = useState('professionnels');
  useScrollToAnchor();

  return (
    <>
      <Hero
        title="Cas d'usage de l'IA"
        subtitle="Découvrez comment l'intelligence artificielle transforme des secteurs d'activité et notre quotidien à travers des applications concrètes et des exemples détaillés."
      />

      <section className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={asset("pics/cas-usage.jpg")} 
              alt="Illustration : un cercle central orange relié à huit pastilles contenant chacune une icône (stéthoscope, engrenage, chapeau universitaire, camion, casque audio, bâtiment à colonnes, balance, épi de blé)" 
              className="w-full h-64 object-cover object-center"
            />
          </div>
          
          <SectionHeading
            pretitle="Secteurs"
            title="L'IA dans de nombreux domaines d'activité"
            description="L'intelligence artificielle est utilisée dans de nombreux secteurs économiques et sociaux. Les gains varient beaucoup selon les cas et doivent être vérifiés au cas par cas."
            center
          />

          <Tabs 
            defaultValue="professionnels" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-16"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="professionnels">Secteurs professionnels</TabsTrigger>
              <TabsTrigger value="applications">Applications pratiques</TabsTrigger>
            </TabsList>
            
            <TabsContent value="professionnels" className="mt-0">
              <BusinessCasesGrid activeTab={activeTab} />
            </TabsContent>
            
            <TabsContent value="applications" className="mt-0">
              <ApplicationsGrid activeTab={activeTab} />
            </TabsContent>
          </Tabs>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <EmergingTechnologies />
          </motion.div>
          
          <SectionHeading
            pretitle="Approfondissement"
            title="Explorer en détail"
            description="Découvrez des exemples concrets d'applications d'IA dans différents secteurs, avec une analyse détaillée de leur fonctionnement, de leur impact et des technologies sous-jacentes."
            center
          />
          
          <DetailedExamples />
          
          <SectionHeading
            pretitle="Ressources"
            title="Pour aller plus loin"
            description="Explorez les autres sections pour approfondir votre compréhension des technologies d'IA et leur application dans divers contextes professionnels et personnels."
            center
          />
          
          <ResourceLinks />
        </div>
      </section>
    </>
  );
};

export default CasUsage;
