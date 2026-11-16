// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getSEOData } from '@/data/seoData';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let meta = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

/**
 * Met à jour title, description, canonical et balises sociales à chaque
 * changement de route, depuis src/data/seoData.ts. Appelé une seule fois,
 * dans le layout. Le HTML initial de chaque route est déjà généré au build
 * avec les mêmes valeurs (voir scripts/static-routes.ts).
 */
export const useDocumentMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSEOData(pathname);
    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:image', seo.image);
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!seo.canonical) {
      canonical?.remove();
      return;
    }
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonical);
    setMeta('property', 'og:url', seo.canonical);
  }, [pathname]);
};
