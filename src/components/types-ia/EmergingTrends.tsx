// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Network } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const EmergingTrends = () => {
  return (
    <section className="section-container mt-12">
      <SectionHeading
        pretitle="Innovations"
        title="Tendances émergentes en IA"
        description="Trois notions utiles pour comprendre l'IA actuelle : modèles de fondation, multimodalité et apprentissage fédéré."
        center
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <motion.div 
          className="glass-card p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
            <Sparkles size={24} className="text-primary" />
          </div>
          <h3 className="heading-sm mb-2">Modèles de fondation</h3>
          <p className="text-muted-foreground">
            Les modèles de fondation sont entraînés sur d'immenses quantités de données non spécifiques, 
            puis adaptés à des tâches particulières. Ils représentent une évolution majeure vers des 
            systèmes plus polyvalents.
          </p>
        </motion.div>
        
        <motion.div 
          className="glass-card p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
            <Layers size={24} className="text-primary" />
          </div>
          <h3 className="heading-sm mb-2">IA multimodale</h3>
          <p className="text-muted-foreground">
            Ces systèmes intègrent et traitent simultanément plusieurs types de données : texte, 
            images, audio et vidéo. Ils permettent de relier des informations de nature différente 
            dans une même réponse.
          </p>
        </motion.div>
        
        <motion.div 
          className="glass-card p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
            <Network size={24} className="text-primary" />
          </div>
          <h3 className="heading-sm mb-2">Apprentissage fédéré</h3>
          <p className="text-muted-foreground">
            L'apprentissage fédéré permet d'entraîner des modèles sur des appareils décentralisés 
            sans partager les données brutes, ce qui limite l'exposition des données sans garantir à lui seul leur confidentialité (les mises à jour du modèle peuvent révéler des informations), tout en bénéficiant 
            de données diversifiées.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergingTrends;
