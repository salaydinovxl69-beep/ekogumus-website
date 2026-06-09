import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const SITE_URL = 'https://ekogumus.com';

function setMetaTag(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function usePageMeta() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const routeKey = pathname === '/' ? 'home' : pathname.replace(/^\//, '').split('/')[0];
    const meta = t.pageMeta[routeKey as keyof typeof t.pageMeta] ?? t.pageMeta.home;

    document.title = meta.title;
    setMetaTag('meta[name="description"]', 'content', meta.description);
    setMetaTag('meta[property="og:title"]', 'content', meta.title);
    setMetaTag('meta[property="og:description"]', 'content', meta.description);
    setMetaTag('meta[property="og:url"]', 'content', `${SITE_URL}${pathname === '/' ? '/' : pathname}`);
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'content', meta.description);
    setMetaTag('link[rel="canonical"]', 'href', `${SITE_URL}${pathname === '/' ? '/' : pathname}`);
  }, [pathname, t]);
}
