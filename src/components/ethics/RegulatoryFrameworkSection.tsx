// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import { ChevronsRight, GraduationCap, Users } from 'lucide-react';
import { asset } from '@/lib/paths';

const RegulatoryFrameworkSection: React.FC = () => {
  return (
    <section className="section-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading
            pretitle="Réglementations"
            title="Cadres juridiques et éthiques"
            description="Face aux enjeux éthiques de l'IA, différentes réglementations et initiatives ont émergé pour encadrer le développement et l'utilisation de ces technologies."
          />
          
          <ul className="mt-6 space-y-4">
            <li className="flex gap-2">
              <ChevronsRight className="text-primary mt-1 shrink-0" />
              <div>
                <span className="font-medium">AI Act européen</span> - Selon la Commission européenne, le premier cadre juridique complet sur l'IA au niveau mondial, basé sur une approche par niveau de risque
              </div>
            </li>
            <li className="flex gap-2">
              <ChevronsRight className="text-primary mt-1 shrink-0" />
              <div>
                <span className="font-medium">RGPD</span> - Réglementation européenne sur la protection des données personnelles avec des implications pour les systèmes d'IA
              </div>
            </li>
            <li className="flex gap-2">
              <ChevronsRight className="text-primary mt-1 shrink-0" />
              <div>
                <span className="font-medium">Blueprint for an AI Bill of Rights (États-Unis, 2022)</span> - Document non contraignant publié par la Maison-Blanche, qui propose cinq principes (systèmes sûrs, protection contre les discriminations, vie privée, information et explication, alternative humaine) ; il n'a pas de valeur légale et sa page est aujourd'hui archivée
              </div>
            </li>
            <li className="flex gap-2">
              <ChevronsRight className="text-primary mt-1 shrink-0" />
              <div>
                <span className="font-medium">Initiatives d'autorégulation</span> - Chartes éthiques et principes adoptés par des entreprises et organisations du secteur
              </div>
            </li>
          </ul>
        </div>
        
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div style={{ backgroundImage: `url(${asset("pics/salle-de-classe.jpg")})` }} className="absolute inset-0 bg-cover bg-center opacity-20"></div>
          <div className="relative z-10">
            <h3 className="heading-md mb-4">Éducation et sensibilisation</h3>
            <p className="text-muted-foreground mb-6">
              L'éducation aux enjeux éthiques de l'IA est essentielle pour former des citoyens, professionnels et décideurs conscients des implications de ces technologies.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="text-primary h-10 w-10" />
              <div>
                <h4 className="font-medium">Formation académique</h4>
                <p className="text-sm text-muted-foreground">Intégration de l'éthique de l'IA dans les cursus technologiques</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="text-primary h-10 w-10" />
              <div>
                <h4 className="font-medium">Sensibilisation du public</h4>
                <p className="text-sm text-muted-foreground">Programmes d'information sur les impacts sociétaux de l'IA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegulatoryFrameworkSection;
