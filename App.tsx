import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PurchaseProvider } from "./contexts/PurchaseContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StickyMobileCTA } from "./components/StickyMobileCTA";
import { PageSkeleton } from "./components/PageSkeleton";
import { Toaster } from "./components/ui/sonner";
import { lazy, Suspense } from "react";
// Главная — статически: убирает лишний RTT из цепочки до LCP на самом частом входе.
import { HomePage } from "./pages/HomePage";

// Lazy-loaded pages — уменьшают initial bundle, страницы грузятся по требованию
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ProductPage = lazy(() => import("./pages/ProductPage").then(m => ({ default: m.ProductPage })));
const CooperationPage = lazy(() => import("./pages/CooperationPage").then(m => ({ default: m.CooperationPage })));
const ContactsPage = lazy(() => import("./pages/ContactsPage").then(m => ({ default: m.ContactsPage })));
const NewsPage = lazy(() => import("./pages/NewsPage").then(m => ({ default: m.NewsPage })));

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <PurchaseProvider>
            <div className="min-h-screen relative">
              <Header />
              <main className="relative z-10">
                <Suspense fallback={<PageSkeleton />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/cooperation" element={<CooperationPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />

                    <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <StickyMobileCTA />
              <Toaster
                position="bottom-right"
                toastOptions={{ className: 'font-opensans' }}
                theme="light"
                richColors
              />
            </div>
          </PurchaseProvider>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
