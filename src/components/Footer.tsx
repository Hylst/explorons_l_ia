// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router';
import { SITE_NAME, AUTHOR_CREDIT, CONTACT_EMAIL, PLATFORM_URL, LICENSE_SPDX, LICENSE_FILE, SOURCE_URL } from '@/config/site';
import { asset } from '@/lib/paths';

const linkClass = 'text-muted-foreground hover:text-primary transition-colors';

/**
 * Pied de page : navigation secondaire, contact et liens légaux.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/20 py-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{SITE_NAME}</h3>
            <p className="text-muted-foreground mb-3">
              Une ressource éducative pour découvrir et comprendre l'intelligence artificielle, pas à pas.
              Site de la plateforme <a href={PLATFORM_URL} className="text-primary hover:underline">hylst.fr</a>.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <span className="font-semibold text-foreground/80 block">Plateforme Hylst IT learning&nbsp;:</span>
              <ul className="space-y-1">
                <li><a href="https://hylst.fr/data_science_explorer/" className="hover:text-primary hover:underline">Explorons la Data Science</a></li>
                <li><a href="https://hylst.fr/guide_maths/" className="hover:text-primary hover:underline">Guide Maths pour l'IA</a></li>
                <li><a href="https://hylst.fr/datalab/" className="hover:text-primary hover:underline">DataLab Studio+</a></li>
                <li><a href="https://hylst.fr/datalitteracie/" className="hover:text-primary hover:underline">DataLittéracie</a></li>
                <li><a href="https://hylst.fr/boussole-ia/" className="hover:text-primary hover:underline">Boussole IA</a></li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={linkClass}>Accueil</Link></li>
              <li><Link to="/types-ia" className={linkClass}>Types d'IA</Link></li>
              <li><Link to="/niveaux-ia" className={linkClass}>Niveaux d'IA</Link></li>
              <li><Link to="/machine-learning" className={linkClass}>Machine learning</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><Link to="/ethique" className={linkClass}>Éthique de l'IA</Link></li>
              <li><Link to="/cas-usage" className={linkClass}>Cas d'usage</Link></li>
              <li><Link to="/ressources?tab=cours" className={linkClass}>Tous les cours</Link></li>
              <li><Link to="/ressources?tab=outils" className={linkClass}>Outils interactifs</Link></li>
              <li><Link to="/glossaire" className={linkClass}>Glossaire</Link></li>
              <li><Link to="/ressources" className={linkClass}>Ressources externes</Link></li>
              <li><Link to="/ressources?tab=ecosysteme" className={linkClass}>Écosystème Hylst</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-muted-foreground mb-2">
              Une erreur, une suggestion ? Écrivez à l'auteur.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
            © {currentYear} {SITE_NAME}. Réalisé par {AUTHOR_CREDIT}. Licence{' '}
            <a href={asset(LICENSE_FILE)} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
              {LICENSE_SPDX}
            </a>
            .
            {SOURCE_URL && (
              <>
                {' '}
                <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  Code source
                </a>
                .
              </>
            )}{' '}
            Illustrations générées par IA, sauf deux visuels composés à partir de texte.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm sm:gap-x-2">
            <Link to="/mentions-legales" className={linkClass}>Mentions légales</Link>
            <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">•</span>
            <Link to="/confidentialite" className={linkClass}>Confidentialité</Link>
            <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">•</span>
            <Link to="/cgu" className={linkClass}>CGU</Link>
            <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">•</span>
            <Link to="/gestion-donnees-rgpd" className={linkClass}>Vos données locales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
