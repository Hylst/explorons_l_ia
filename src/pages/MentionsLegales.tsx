// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import Hero from '@/components/Hero';
import LegalSection from '@/components/legal/LegalSection';
import {
  SITE_NAME,
  SITE_URL,
  AUTHOR_NAME,
  AUTHOR_CREDIT,
  CONTACT_EMAIL,
  PLATFORM_LEGAL_URL,
  LICENSE_NAME,
  LICENSE_SPDX,
  LICENSE_FILE,
  THIRD_PARTY_FILE,
  SOURCE_URL,
} from '@/config/site';
import { asset } from '@/lib/paths';

const mail = (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
    {CONTACT_EMAIL}
  </a>
);

const MentionsLegales = () => (
  <>
    <Hero title="Mentions légales" subtitle={`Informations légales concernant le site ${SITE_NAME}`} />

    <section className="section-container">
      <div className="max-w-4xl mx-auto">
        <LegalSection title="Éditeur du site">
          <p>
            <strong>{SITE_NAME}</strong> ({SITE_URL}) est un site pédagogique non commercial édité à titre personnel par{' '}
            {AUTHOR_NAME} (alias Hylst), directeur de la publication.
          </p>
          <p>Contact : {mail}</p>
          <p>
            Les textes, les exemples et le code ont été produits avec l'assistance d'outils d'intelligence artificielle
            générative, puis contrôlés (liens, tarifs, sources). L'éditeur en assume la responsabilité éditoriale.
          </p>
          <p>
            Ce site fait partie de la plateforme hylst.fr, dont les{' '}
            <a href={PLATFORM_LEGAL_URL} className="text-primary hover:underline">
              mentions légales générales
            </a>{' '}
            s'appliquent également.
          </p>
        </LegalSection>

        <LegalSection title="Hébergement">
          <p>
            Site statique hébergé sur un serveur privé virtuel (VPS) loué à Hostinger International Limited,
            61 Lordou Vironos Street, 6023 Larnaca, Chypre (hostinger.fr).
          </p>
        </LegalSection>

        <LegalSection title="Propriété intellectuelle et licence">
          <p>
            Le code source et les contenus rédigés pour ce site (textes, données) sont la propriété de{' '}
            {AUTHOR_NAME} et publiés sous licence <strong>{LICENSE_NAME}</strong> ({LICENSE_SPDX}). Le texte complet
            est disponible dans le{' '}
            <a href={asset(LICENSE_FILE)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              fichier de licence
            </a>{' '}
            et seul ce texte fait foi.
          </p>
          <p>
            En résumé, cette licence permet de copier, modifier et redistribuer le site, y compris à titre commercial,
            à condition de conserver les mentions de l'auteur, de publier les modifications sous la même licence et de
            proposer leur code source aux utilisateurs d'une version modifiée accessible en ligne.
          </p>
          <p>
            Le site a été réalisé par {AUTHOR_CREDIT}. Les illustrations des pages sont générées par
            intelligence artificielle, sur l'ordinateur de l'auteur, avec le modèle ouvert Z-Image Turbo (licence
            Apache 2.0), en octobre 2026. Les couvertures des cours approfondis, ainsi que trois illustrations du cours
            « Python pour l'IA » et de la démonstration de la page « IA multimodale » (novembre 2026), sont générées
            localement avec Qwen Image 2.1. Font exception deux visuels composés à partir de texte, sans IA (l'image de
            partage du site et le schéma des sept niveaux d'IA). Les visages qui figurent sur les illustrations sont
            fictifs. Le site ne
            revendique pas de droit d'auteur sur ces illustrations, dont le statut juridique dépend de l'outil utilisé.
            Sont aussi exclus de cette licence : la police Inter (licence SIL OFL 1.1), les bibliothèques open source et les composants shadcn/ui
            inclus dans le code publié (React, Radix UI, React Flow, Recharts, etc., sous licences MIT, ISC, BSD ou Apache 2.0)
            ainsi que les noms, marques et logos cités, qui appartiennent à leurs propriétaires respectifs. La liste de ces composants
            et le texte de leurs licences figurent dans le{' '}
            <a href={asset(THIRD_PARTY_FILE)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              fichier des composants tiers
            </a>
            .
          </p>
          <p>
            Les cours approfondis (rubrique « Cours approfondis ») sont écrits par l'auteur avec l'aide d'outils
            d'IA générative, puis relus et vérifiés sur les sources citées à la fin de chaque cours. Leurs exemples de
            code ont été exécutés avant publication, sauf mention contraire sous la sortie affichée.
          </p>
          {SOURCE_URL ? (
            <p>
              Code source :{' '}
              <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {SOURCE_URL}
              </a>
              .
            </p>
          ) : (
            <p>Le dépôt du code source n'est pas public à ce jour ; le code source est communiqué sur demande à {mail}.</p>
          )}
        </LegalSection>

        <LegalSection title="Limitation de responsabilité">
          <p>
            Le contenu est rédigé avec soin mais peut contenir des erreurs ou des informations dépassées, le domaine
            de l'IA évoluant très vite. Les tarifs, chiffres et comparatifs de modèles sont indicatifs et datés.
            L'utilisateur reste seul responsable de l'usage qu'il fait de ces informations.
          </p>
          <p>Merci de signaler toute erreur à {mail}.</p>
        </LegalSection>

        <LegalSection title="Liens externes">
          <p>
            Le site renvoie vers des ressources externes. L'éditeur n'est pas responsable de leur contenu ni de leurs
            pratiques en matière de données personnelles.
          </p>
        </LegalSection>
      </div>
    </section>
  </>
);

export default MentionsLegales;
