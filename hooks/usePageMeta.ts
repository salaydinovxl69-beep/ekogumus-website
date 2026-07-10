import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export function usePageMeta() {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const metaKey = location.pathname.slice(1) || 'home'; // 'home' for '/'
    const pageMeta = t.pageMeta[metaKey];

    if (pageMeta) {
      document.title = pageMeta.title;
      const descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) {
        descriptionTag.setAttribute('content', pageMeta.description);
      } else {
        const newDescriptionTag = document.createElement('meta');
        newDescriptionTag.name = 'description';
        newDescriptionTag.content = pageMeta.description;
        document.head.appendChild(newDescriptionTag);
      }
    }
  }, [location.pathname, t.pageMeta]);
}