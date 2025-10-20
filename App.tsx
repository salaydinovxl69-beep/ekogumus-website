import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { StaticBackground } from "./components/StaticBackground";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProductPage } from "./pages/ProductPage";
import { LiqPresentation } from "./pages/LiqPresentationPage";
import { CooperationPage } from "./pages/CooperationPage";
import { ContactsPage } from "./pages/ContactsPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetail } from "./pages/NewsDetailPage";
import { Toaster } from "./components/ui/sonner";
import { useEffect, useState } from "react";

export default function App() {
  const [theme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return (saved === 'dark') ? 'dark' : 'light';
    } catch { return 'light'; }
  });

  useEffect(() => {
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen relative">
            <StaticBackground />
            <Header />
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/cooperation" element={<CooperationPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/liqpresentation" element={<LiqPresentation />} />
                
                {/* Redirect preview_page.html to home */}
                <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
                {/* Catch-all route for any unmatched paths */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            {/* Toast notifications */}
            <Toaster 
              position="bottom-right"
              toastOptions={{
                className: 'font-opensans',
              }}
              theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
              richColors
            />
          </div>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
}