import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu, Phone, Youtube, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export function Header() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-lg border-b border-white/30 dark:border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 ">
          <img
              src="/images/originals/logo.png"
              alt="Ekogumus Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl lg:text-3xl font-montserrat font-bold text-ekogumus-green">
                EKOGUMUS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-5">
            <Link 
              to="/" 
              className={`text-base  font-opensans font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/') 
                  ? 'text-ekogumus-green border-b-2 border-ekogumus-green' 
                  : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.home}
            </Link>
            <Link 
              to="/about" 
              className={`text-base  font-opensans font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/about') 
                  ? 'text-ekogumus-green border-b-2 border-ekogumus-green' 
                  : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.about}
            </Link>
            <Link 
              to="/products" 
              className={`text-base  font-opensans font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/products') 
                  ? 'text-ekogumus-green border-b-2 border-ekogumus-green' 
                  : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.products}
            </Link>
            <Link 
              to="/cooperation" 
              className={`text-base  font-opensans font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/cooperation') 
                  ? 'text-ekogumus-green border-b-2 border-ekogumus-green' 
                  : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.cooperation}
            </Link>
            <Link 
              to="/news" 
              className={`text-base font-opensans font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/news') 
                  ? 'text-ekogumus-green border-b-2 border-ekogumus-green' 
                  : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.news}
            </Link>
            <Link 
              to="/contacts" 
              className={`text-base font-opensans font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/contacts') 
                  ? 'text-ekogumus-green border-b-2 border-ekogumus-green' 
                  : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.contacts}
            </Link>
          </nav>

          {/* Medium screen navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-opensans font-medium transition-colors ${
                isActive('/') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.home}
            </Link>
            <Link 
              to="/products" 
              className={`text-sm font-opensans font-medium transition-colors ${
                isActive('/products') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.products}
            </Link>
            <Link 
              to="/contacts" 
              className={`text-sm font-opensans font-medium transition-colors ${
                isActive('/contacts') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
              }`}
            >
              {t.nav.contacts}
            </Link>
          </nav>

          {/* Right side - Language and Contact */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {/* Contact Icons */}
            <div className="flex items-center space-x-3">
              <a 
                href="tel:+998936418545" 
                className="text-ekogumus-green hover:text-ekogumus-green-light transition-all duration-300 hover:scale-110"
                title={t.a11y.phoneCall}
              >
                <Phone className="w-5 h-5 xl:w-6 xl:h-6" />
              </a>
              <a 
                href="mailto:bashfergana@mail.ru" 
                className="text-ekogumus-green hover:text-ekogumus-yellow transition-all duration-300 hover:scale-110"
                title={t.a11y.sendEmail}
              >
                <Mail className="w-5 h-5 xl:w-6 xl:h-6" />
              </a>
              <a 
                href="https://www.youtube.com/@biogumusfargonaekogumus8419" 
                className="text-ekogumus-green hover:text-ekogumus-red transition-all duration-300 hover:scale-110"
                title={t.a11y.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-5 h-5 xl:w-6 xl:h-6" />
              </a>
            </div>


            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button 
                variant={language === 'ru' ? "default" : "ghost"}
                size="sm" 
                className={`text-xs px-3 py-1 font-opensans font-medium ${
                  language === 'ru' 
                    ? 'bg-ekogumus-green text-white' 
                    : 'text-gray-600 hover:text-ekogumus-green'
                }`}
                onClick={() => setLanguage('ru')}
              >
                РУ
              </Button>
              <Button 
                variant={language === 'uz' ? "default" : "ghost"}
                size="sm" 
                className={`text-xs px-3 py-1 font-opensans font-medium ${
                  language === 'uz' 
                    ? 'bg-ekogumus-green text-white' 
                    : 'text-gray-600 hover:text-ekogumus-green'
                }`}
                onClick={() => setLanguage('uz')}
              >
                O'Z
              </Button>
              <Button 
                variant={language === 'en' ? "default" : "ghost"}
                size="sm" 
                className={`text-xs px-3 py-1 font-opensans font-medium ${
                  language === 'en' 
                    ? 'bg-ekogumus-green text-white' 
                    : 'text-gray-600 hover:text-ekogumus-green'
                }`}
                onClick={() => setLanguage('en')}
              >
                EN
              </Button>
            </div>
          </div>

          {/* Medium screen contact */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            <a 
              href="tel:+998936418545" 
              className="text-ekogumus-green hover:text-ekogumus-green-light transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-ekogumus-green">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-80 sm:w-96 bg-white">
              <SheetTitle className="sr-only">{t.a11y.navigation}</SheetTitle>
              <SheetDescription className="sr-only">
                {t.a11y.navigationDescription}
              </SheetDescription>
              <div className="flex flex-col h-full">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 mb-8 mt-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-ekogumus-green to-ekogumus-green-light rounded-full flex items-center justify-center">
                    <span className="text-white font-montserrat font-bold text-xl">E</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-montserrat font-bold text-ekogumus-green">Ekogumus</span>
                    <span className="text-sm text-ekogumus-brown font-opensans -mt-1">
                      {language === 'ru' ? 'Органоминеральные удобрения' : 
                       language === 'uz' ? 'Organik-mineral o\'g\'itlar' : 
                       'Organic-mineral fertilizers'}
                    </span>
                  </div>
                </div>
                
                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-6 flex-1">
                  <Link 
                    to="/" 
                    className={`text-lg font-opensans font-medium transition-colors ${
                      isActive('/') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                    }`}
                  >
                    {t.nav.home}
                  </Link>
                  <Link 
                    to="/about" 
                    className={`text-lg font-opensans font-medium transition-colors ${
                      isActive('/about') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                    }`}
                  >
                    {t.nav.about}
                  </Link>
                  <Link 
                    to="/products" 
                    className={`text-lg font-opensans font-medium transition-colors ${
                      isActive('/products') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                    }`}
                  >
                    {t.nav.products}
                  </Link>
                  <Link 
                    to="/news" 
                    className={`text-lg font-opensans font-medium transition-colors ${
                      isActive('/news') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                    }`}
                  >
                    {t.nav.news}
                  </Link>
                  <Link 
                    to="/contacts" 
                    className={`text-lg font-opensans font-medium transition-colors ${
                      isActive('/contacts') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                    }`}
                  >
                    {t.nav.contacts}
                  </Link>
                </nav>
                
                {/* Mobile Footer */}
                <div className="border-t pt-6 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 font-opensans">{t.footer.contactUs}</span>
                    <div className="flex space-x-4">
                      <a href="tel:+998936418545" className="text-ekogumus-green">
                        <Phone className="w-6 h-6" />
                      </a>
                      <a href="mailto:info@ekogumus.com" className="text-ekogumus-green">
                        <Mail className="w-6 h-6" />
                      </a>
                      <a 
                        href="https://www.youtube.com/@biogumusfargonaekogumus8419" 
                        className="text-ekogumus-green"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Youtube className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Mobile Language Switcher */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={language === 'ru' ? "default" : "outline"}
                      size="sm" 
                      className={`font-opensans font-medium ${
                        language === 'ru' 
                          ? 'bg-ekogumus-green text-white' 
                          : 'border-ekogumus-green text-ekogumus-green'
                      }`}
                      onClick={() => setLanguage('ru')}
                    >
                      РУ
                    </Button>
                    <Button 
                      variant={language === 'uz' ? "default" : "outline"}
                      size="sm" 
                      className={`font-opensans font-medium ${
                        language === 'uz' 
                          ? 'bg-ekogumus-green text-white' 
                          : 'border-ekogumus-green text-ekogumus-green'
                      }`}
                      onClick={() => setLanguage('uz')}
                    >
                      O'Z
                    </Button>
                    <Button 
                      variant={language === 'en' ? "default" : "outline"}
                      size="sm" 
                      className={`font-opensans font-medium ${
                        language === 'en' 
                          ? 'bg-ekogumus-green text-white' 
                          : 'border-ekogumus-green text-ekogumus-green'
                      }`}
                      onClick={() => setLanguage('en')}
                    >
                      EN
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}