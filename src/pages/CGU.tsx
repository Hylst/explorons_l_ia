// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import Hero from '@/components/Hero';
import LegalSection from '@/components/legal/LegalSection';
import { SITE_NAME, CONTACT_EMAIL, LICENSE_NAME } from '@/config/site';

const CGU = () => (
  <>
    <Hero title="Conditions d'utilisation" subtitle={`Règles d'utilisation du site ${SITE_NAME}`} />

    <section className="section-container">
      <div className="max-w-4xl mx-auto">
        <LegalSection title="Objet">
          <p>
            {SITE_NAME} est un site pédagogique gratuit, sans inscription, consacré à la compréhension de
            l'intelligence artificielle. Son utilisation vaut acceptation des présentes conditions.
          </p>
        </LegalSection>

        <LegalSection title="Contenus et outils proposés">
          <ul className="list-disc pl-6 space-y-2">
            <li>Cours, guides, glossaire, frise historique et sélection de ressources externes.</li>
            <li>
              Outils de démonstration fonctionnant dans le navigateur : générateur de prompts, calculateur de coûts,
              simulateur d'entraînement, comparateur de modèles, optimiseur de workflow, détecteur de contenu,
              analyseur de jeu de données, générateur de données synthétiques, auditeur de biais.
            </li>
          </ul>
          <p>
            Ces outils sont pédagogiques. Leurs résultats (estimations de coûts, scores de détection, comparatifs,
            indicateurs d'équité) sont indicatifs, fournis sans garantie, et ne doivent pas fonder à eux seuls une décision. En
            particulier, le détecteur de contenu IA ne permet pas d'établir qu'un texte, une image ou un son a été
            produit par une IA.
          </p>
        </LegalSection>

        <LegalSection title="Propriété intellectuelle">
          <p>
            La consultation, l'apprentissage personnel, le partage de liens et la citation avec mention de la source
            sont libres. Le code et les contenus du site sont publiés sous licence {LICENSE_NAME} : leur réutilisation
            est possible aux conditions de cette licence. Voir les{' '}
            <Link to="/mentions-legales" className="text-primary hover:underline">
              mentions légales
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="Données personnelles">
          <p>
            Le site ne demande aucun compte et ne dépose ni cookie ni traceur ; seul le serveur conserve des journaux
            techniques pendant douze mois au plus. Voir la page{' '}
            <Link to="/confidentialite" className="text-primary hover:underline">
              Confidentialité
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="Évolution des conditions">
          <p>
            Ces conditions peuvent évoluer avec le site. Pour toute question :{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </LegalSection>
      </div>
    </section>
  </>
);

export default CGU;
