import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Balises SEO par page, écrites directement dans le <head>.
 *
 * react-helmet-async n'injectait plus rien (zéro balise [data-rh] en dev comme
 * en build) : chaque page servait le titre, la description et le canonical de
 * l'accueil. On pilote donc le head à la main, sans dépendance.
 */
const BASE_URL = 'https://steero.fr';
const MANAGED = 'data-seo';

/** Crée ou met à jour une balise du head, en réutilisant celle d'index.html si elle existe. */
const upsert = (selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  apply(el);
};

const meta = (attr: 'name' | 'property', key: string, content: string) =>
  upsert(`meta[${attr}="${key}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute(attr, key);
    return el;
  }, (el) => el.setAttribute('content', content));

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = `${BASE_URL}/og-image.png`,
  ogType = 'website',
  noIndex = false,
  jsonLd,
}: SEOProps) => {
  const jsonLdString = jsonLd ? JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : '';

  useEffect(() => {
    const fullTitle = title.includes('Steero') ? title : `${title} | Steero`;
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

    document.title = fullTitle;
    meta('name', 'description', description);
    meta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    if (keywords) meta('name', 'keywords', keywords);

    meta('property', 'og:title', fullTitle);
    meta('property', 'og:description', description);
    meta('property', 'og:type', ogType);
    meta('property', 'og:image', ogImage);
    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:title', fullTitle);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', ogImage);

    if (canonicalUrl) {
      upsert('link[rel="canonical"]', () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      }, (el) => el.setAttribute('href', canonicalUrl));
      meta('property', 'og:url', canonicalUrl);
      meta('name', 'twitter:url', canonicalUrl);
    }

    // Les données structurées de la page remplacent celles de la page précédente.
    document.head.querySelectorAll(`script[${MANAGED}-jsonld]`).forEach((el) => el.remove());
    if (jsonLdString) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(`${MANAGED}-jsonld`, '');
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonical, ogImage, ogType, noIndex, jsonLdString]);

  return null;
};

export default SEO;
