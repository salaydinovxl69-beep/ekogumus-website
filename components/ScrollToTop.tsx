import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Прокручиваем к началу страницы при изменении маршрута
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Мгновенная прокрутка без анимации
    });

    // Дополнительная проверка для старых браузеров
    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }

    // Сбрасываем состояние истории скролла
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, [pathname]);

  // Дополнительно сбрасываем позицию при обновлении страницы
  useEffect(() => {
    // Проверяем различные способы определения перезагрузки
    const navigationEntries = window.performance.getEntriesByType('navigation');
    const isPageReload = (
      (window.performance && window.performance.navigation && window.performance.navigation.type === 1) ||
      (navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload') ||
      document.referrer === ''
    );
    
    if (isPageReload) {
      window.scrollTo(0, 0);
    }

    // Устанавливаем ручное управление скроллом
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}