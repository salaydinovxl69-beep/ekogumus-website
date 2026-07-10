/* Единый список разделов сайта для Header и Footer.
   Метки берутся из t.nav по ключу key. */
export const NAV_ROUTES = [
  { path: "/", key: "home" },
  { path: "/products", key: "products" },
  { path: "/about", key: "about" },
  { path: "/cooperation", key: "cooperation" },
  { path: "/news", key: "news" },
  { path: "/contacts", key: "contacts" },
] as const;
