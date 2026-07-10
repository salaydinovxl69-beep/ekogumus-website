import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Прокрутка страницы в начало при каждой смене URL
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}