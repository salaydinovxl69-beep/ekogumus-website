import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <p className="text-6xl font-montserrat font-bold text-ekogumus-green mb-4">404</p>
      <h1 className="text-2xl sm:text-3xl font-montserrat font-semibold text-gray-800 mb-4">
        {t.notFound.title}
      </h1>
      <p className="text-gray-600 font-opensans max-w-md mb-8">{t.notFound.description}</p>
      <Button asChild size="lg" className="bg-ekogumus-green hover:bg-ekogumus-green-light text-white">
        <Link to="/">
          <Home className="w-5 h-5 mr-2" />
          {t.notFound.backHome}
        </Link>
      </Button>
    </section>
  );
}
