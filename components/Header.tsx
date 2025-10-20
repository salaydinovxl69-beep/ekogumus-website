import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet";
import { Menu, Phone, Youtube, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// ИСПРАВЛЕНИЕ 1: Импортируем тип Language из того же места, что и LanguageContext
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../utils/i18n"; // <--- Вот правильный импорт типа Language
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };
  const MobileLogo = () => (
    <Link to="/" className="flex items-center space-x-2 mb-8 mt-4" onClick={() => setIsMenuOpen(false)}>
      <div className="flex items-center space-x-1">
        <img
          src="/images/originals/logo_2.png"
          alt="Second Logo"
          className="w-8 h-8 object-contain" 
        />
        <img
          src="/images/originals/logo.png"
          alt="Ekogumus Logo"
          className="w-8 h-8 object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-montserrat font-bold text-ekogumus-green">
          EKOGUMUS
        </span>
      </div>
    </Link>
  );

  return (
    <header className="bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-lg border-b border-white/30 dark:border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Text Container - Десктоп/Общий */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 ">
            {/* Контейнер для двух логотипов */}
            <div className="flex items-center space-x-1">
              <img
                src="/images/originals/logo_2.png"
                alt="Second Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
              />
              <img
                src="/images/originals/logo.png"
                alt="Ekogumus Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
              />
            </div>

            {/* Название сайта */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl lg:text-2xl font-montserrat font-bold text-ekogumus-green">
                EKOGUMUS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (lg:flex) */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-5">
             {/* ... Десктопные ссылки без изменений ... */}
            <Link
              to="/"
              className={`text-base  font-opensans font-medium transition-all duration-300 hover:scale-105 ${isActive('/')
                ? 'text-ekogumus-green border-b-2 border-ekogumus-green'
                : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/about"
              className={`text-base  font-opensans font-medium transition-all duration-300 hover:scale-105 ${isActive('/about')
                ? 'text-ekogumus-green border-b-2 border-ekogumus-green'
                : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.about}
            </Link>
            <Link
              to="/products"
              className={`text-base  font-opensans font-medium transition-all duration-300 hover:scale-105 ${isActive('/products')
                ? 'text-ekogumus-green border-b-2 border-ekogumus-green'
                : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.products}
            </Link>
            <Link
              to="/cooperation"
              className={`text-base  font-opensans font-medium transition-all duration-300 hover:scale-105 ${isActive('/cooperation')
                ? 'text-ekogumus-green border-b-2 border-ekogumus-green'
                : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.cooperation}
            </Link>
            <Link
              to="/news"
              className={`text-base font-opensans font-medium transition-all duration-300 hover:scale-105 ${isActive('/news')
                ? 'text-ekogumus-green border-b-2 border-ekogumus-green'
                : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.news}
            </Link>
            <Link
              to="/contacts"
              className={`text-base font-opensans font-medium transition-all duration-300 hover:scale-105 ${isActive('/contacts')
                ? 'text-ekogumus-green border-b-2 border-ekogumus-green'
                : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.contacts}
            </Link>
          </nav>
          
          {/* Medium screen navigation (md:flex lg:hidden) - Сокращенные ссылки */}
          <nav className="hidden md:flex lg:hidden items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-opensans font-medium transition-colors ${isActive('/') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/products"
              className={`text-sm font-opensans font-medium transition-colors ${isActive('/products') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.products}
            </Link>
            <Link
              to="/contacts"
              className={`text-sm font-opensans font-medium transition-colors ${isActive('/contacts') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                }`}
            >
              {t.nav.contacts}
            </Link>
          </nav>

          {/* Right side - Language and Contact (Desktop) */}
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

            {/* Language Switcher (Desktop) */}
            {/* На десктопе используем setLanguage напрямую, так как оно типизировано */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={language === 'ru' ? "default" : "ghost"}
                size="sm"
                className={`text-xs px-3 py-1 font-opensans font-medium ${language === 'ru'
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
                className={`text-xs px-3 py-1 font-opensans font-medium ${language === 'uz'
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
                className={`text-xs px-3 py-1 font-opensans font-medium ${language === 'en'
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

          {/* Mobile menu (Sheet) */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-ekogumus-green">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            {/* SheetContent обычно имеет padding-x по умолчанию, но мы используем его для общего контейнера */}
            <SheetContent className="w-80 sm:w-96 bg-white">
              <SheetTitle className="sr-only">{t.a11y.navigation}</SheetTitle>
              <SheetDescription className="sr-only">
                {t.a11y.navigationDescription}
              </SheetDescription>
              <div className="flex flex-col h-full">
                {/* Mobile Logo с закрытием меню по клику */}
                <MobileLogo />

                {/* Mobile Navigation с автоматическим закрытием (SheetClose) */}
                {/* ИСПРАВЛЕНИЕ: Добавлен px-4 для сдвига навигационных ссылок вправо */}
                <nav className="flex flex-col space-y-6 flex-1 px-4"> 
                  
                  {/* Главная */}
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className={`text-lg font-opensans font-medium transition-colors ${isActive('/') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                        }`}
                    >
                      {t.nav.home}
                    </Link>
                  </SheetClose>
                  
                  {/* О нас */}
                  <SheetClose asChild>
                    <Link
                      to="/about"
                      className={`text-lg font-opensans font-medium transition-colors ${isActive('/about') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                        }`}
                    >
                      {t.nav.about}
                    </Link>
                  </SheetClose>
                  
                  {/* Продукты */}
                  <SheetClose asChild>
                    <Link
                      to="/products"
                      className={`text-lg font-opensans font-medium transition-colors ${isActive('/products') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                        }`}
                    >
                      {t.nav.products}
                    </Link>
                  </SheetClose>
                  
                  {/* Сотрудничество (Добавлено) */}
                  <SheetClose asChild>
                    <Link
                      to="/cooperation"
                      className={`text-lg font-opensans font-medium transition-colors ${isActive('/cooperation') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                        }`}
                    >
                      {t.nav.cooperation}
                    </Link>
                  </SheetClose>
                  
                  {/* Новости */}
                  <SheetClose asChild>
                    <Link
                      to="/news"
                      className={`text-lg font-opensans font-medium transition-colors ${isActive('/news') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                        }`}
                    >
                      {t.nav.news}
                    </Link>
                  </SheetClose>
                  
                  {/* Контакты */}
                  <SheetClose asChild>
                    <Link
                      to="/contacts"
                      className={`text-lg font-opensans font-medium transition-colors ${isActive('/contacts') ? 'text-ekogumus-green' : 'text-gray-700 hover:text-ekogumus-green'
                        }`}
                    >
                      {t.nav.contacts}
                    </Link>
                  </SheetClose>
                </nav>

                {/* Mobile Footer */}
                <div className="border-t pt-6 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 font-opensans">{t.footer.contactUs}</span>
                    <div className="flex space-x-4">
                      {/* Контактные иконки в мобильном меню */}
                      <a href="tel:+998936418545" className="text-ekogumus-green">
                        <Phone className="w-6 h-6" />
                      </a>
                      <a href="mailto:bashfergana@mail.ru" className="text-ekogumus-green">
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

                  {/* Mobile Language Switcher БЕЗ SheetClose */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* УДАЛЕН SheetClose asChild, чтобы меню не закрывалось */}
                    <Button
                      variant={language === 'ru' ? "default" : "outline"}
                      size="sm"
                      className={`font-opensans font-medium ${language === 'ru'
                        ? 'bg-ekogumus-green text-white'
                        : 'border-ekogumus-green text-ekogumus-green'
                        }`}
                      onClick={() => handleLanguageChange('ru' as Language)} 
                    >
                      РУ
                    </Button>
                    {/* УДАЛЕН SheetClose asChild, чтобы меню не закрывалось */}
                    <Button
                      variant={language === 'uz' ? "default" : "outline"}
                      size="sm"
                      className={`font-opensans font-medium ${language === 'uz'
                        ? 'bg-ekogumus-green text-white'
                        : 'border-ekogumus-green text-ekogumus-green'
                        }`}
                      onClick={() => handleLanguageChange('uz' as Language)} 
                    >
                      O'Z
                    </Button>
                    {/* УДАЛЕН SheetClose asChild, чтобы меню не закрывалось */}
                    <Button
                      variant={language === 'en' ? "default" : "outline"}
                      size="sm"
                      className={`font-opensans font-medium ${language === 'en'
                        ? 'bg-ekogumus-green text-white'
                        : 'border-ekogumus-green text-ekogumus-green'
                        }`}
                      onClick={() => handleLanguageChange('en' as Language)} 
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