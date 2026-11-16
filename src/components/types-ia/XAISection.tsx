// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { BarChart3 } from 'lucide-react';
import IASection from './IASection';

const XAISection = () => {
  const detailsCard = (
    <>
      <h4 className="text-lg font-semibold mb-4">Techniques d'explicabilité</h4>
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-secondary/40">
          <h5 className="font-medium">LIME (Local Interpretable Model-agnostic Explanations)</h5>
          <p className="text-sm text-muted-foreground">
            Approxime localement le modèle complexe par un modèle plus simple et interprétable.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/40">
          <h5 className="font-medium">SHAP (SHapley Additive exPlanations)</h5>
          <p className="text-sm text-muted-foreground">
            Attribue à chaque caractéristique une valeur d'importance basée sur la théorie des jeux.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/40">
          <h5 className="font-medium">Cartes d'activation et attention</h5>
          <p className="text-sm text-muted-foreground">
            Visualise les régions d'une image ou les mots d'un texte sur lesquels le modèle porte le plus d'importance ; ces cartes donnent un indice, pas une explication prouvée de la décision.
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Ces techniques donnent des indices sur les facteurs qui influencent une décision, ce qui aide à auditer un modèle ;
        ce sont des approximations a posteriori, qui ne remplacent pas une validation du modèle.
      </p>
    </>
  );

  return (
    <IASection
      sectionId="xai-section"
      icon={<BarChart3 size={32} className="text-primary" />}
      title="IA explicable (XAI)"
      description="L'IA explicable (XAI) désigne des systèmes d'intelligence artificielle dont les décisions 
      peuvent être comprises et interprétées par les humains, contrairement aux « boîtes noires »."
      benefits={[
        "Essentielle dans les domaines réglementés comme la finance et la santé",
        "Favorise la confiance des utilisateurs et facilite la détection des biais",
        "Permet de répondre à des exigences légales\u00A0: le RGPD encadre les décisions entièrement automatisées (article 22) et impose d'informer sur la logique sous-jacente (articles 13 à 15)\u00A0; le règlement européen sur l'IA prévoit (article 86) un droit à obtenir une explication du rôle du système d'IA pour certaines décisions fondées sur des systèmes à haut risque"
      ]}
      isReversed={true}
      detailsCard={detailsCard}
      delay={5}
    />
  );
};

export default XAISection;
