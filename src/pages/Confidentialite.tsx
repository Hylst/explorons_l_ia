// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Link } from 'react-router';
import Hero from '@/components/Hero';
import LegalSection from '@/components/legal/LegalSection';
import { SITE_NAME, CONTACT_EMAIL } from '@/config/site';

const Confidentialite = () => (
  <>
    <Hero
      title="Confidentialité"
      subtitle={`${SITE_NAME} fonctionne entièrement dans votre navigateur\u00A0: aucun compte, aucun cookie, aucun traceur. Seul le serveur conserve des journaux techniques, décrits plus bas.`}
    />

    <section className="section-container">
      <div className="max-w-4xl mx-auto">
        <LegalSection title="Dans votre navigateur : aucune collecte">
          <ul className="list-disc pl-6 space-y-2">
            <li>Pas de compte, pas de formulaire envoyé à un serveur.</li>
            <li>
              Pas de cookie, pas de publicité, pas de traceur : aucun outil de mesure d'audience ne s'exécute dans
              votre navigateur.
            </li>
            <li>
              Pas de service tiers chargé par les pages : polices, images et scripts sont servis depuis hylst.fr.
            </li>
            <li>
              Les outils du site (calculateur de coûts, comparateur de modèles, générateur de prompts, simulateur
              d'entraînement, détecteur de contenu, optimiseur de workflow, analyseur de jeu de données, générateur de
              données synthétiques, auditeur de biais) calculent tout localement : le texte ou les fichiers que vous leur soumettez ne
              quittent pas votre appareil.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Stockage local">
          <p>
            Quelques préférences et données des outils (thème, estimations du calculateur, historique du détecteur,
            prompts enregistrés, grille de test du comparateur) sont conservées dans le stockage local de votre
            navigateur, uniquement sur votre appareil. Elles ne sont jamais transmises. Vous pouvez les consulter, les exporter ou les effacer sur la page{' '}
            <Link to="/gestion-donnees-rgpd" className="text-primary hover:underline">
              Vos données locales
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="Journaux du serveur">
          <p>
            Comme tout site web, le serveur d'hébergement enregistre des journaux techniques (adresse IP, date et
            heure, page demandée, navigateur déclaré). Ils servent uniquement à la sécurité, à la maintenance et à des
            statistiques de fréquentation agrégées (nombre de pages vues, par exemple), produites sur le serveur avec
            l'outil GoAccess, sans identification nominative, sans cookie ni script dans votre navigateur, et sans
            transmission à des tiers. Cette utilisation repose sur l'intérêt légitime de l'éditeur. La conservation
            est limitée à douze mois au plus par rotation automatique des journaux (une archive par mois, onze archives
            conservées en plus du mois en cours), puis ils sont supprimés. Ils ne servent à aucun suivi individuel et ne sont ni vendus ni
            partagés.
          </p>
          <p>
            Le serveur est situé au Royaume-Uni (hébergeur Hostinger, centre de Manchester). La Commission européenne
            reconnaît à ce pays un niveau de protection des données adéquat (décision renouvelée en décembre 2025, valable
            jusqu'à fin 2031) : ce transfert hors de l'Union européenne ne demande pas de garantie supplémentaire.
          </p>
          <p>
            Une adresse IP est une donnée personnelle. Vous pouvez demander l'accès à ces journaux, leur effacement, la
            limitation de leur traitement ou vous y opposer en écrivant à{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            . Vous avez aussi le droit d'introduire une réclamation auprès de la CNIL (cnil.fr).
          </p>
        </LegalSection>

        <LegalSection title="Liens externes et e-mail">
          <p>
            Les liens vers des ressources externes (cours, vidéos, articles) ouvrent des sites tiers, soumis à leur
            propre politique de confidentialité. Les boutons « Signaler » et « Proposer une ressource » ouvrent
            simplement votre messagerie : aucun envoi n'a lieu sans votre action.
          </p>
          <p>
            Contact :{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </LegalSection>
      </div>
    </section>
  </>
);

export default Confidentialite;
