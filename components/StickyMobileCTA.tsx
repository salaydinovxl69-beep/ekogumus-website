import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function StickyMobileCTA() {
  const { t } = useLanguage();

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden flex gap-2 p-3 bg-white/90 backdrop-blur-lg border-t border-ekogumus-green/20 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      role="navigation"
      aria-label={t.stickyCta.label}
    >
      <a
        href="tel:+998936418545"
        className="flex-1 flex items-center justify-center gap-2 min-h-12 py-3 bg-ekogumus-green text-white rounded-xl font-opensans font-semibold text-sm hover:bg-ekogumus-green-light transition-colors"
        aria-label={t.a11y.phoneCall}
      >
        <Phone className="w-5 h-5" />
        {t.stickyCta.call}
      </a>
      <a
        href="https://t.me/BahodirBX"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 min-h-12 py-3 bg-[#229ED9] text-white rounded-xl font-opensans font-semibold text-sm hover:opacity-90 transition-opacity"
        aria-label={t.a11y.telegram}
      >
        <MessageCircle className="w-5 h-5" />
        {t.stickyCta.telegram}
      </a>
    </div>
  );
}
