import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16"> {/* Немного уменьшил вертикальный padding на мобилках */}
        {/* Сетка: 1 колонка на мобилке, 2 на md, 4 на lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            {/* Logo and Text Container for Footer */}
            <Link to="/" className="flex items-start space-x-3 mb-4 sm:mb-6">

              {/* Контейнер для двух логотипов */}
              <div className="flex items-center space-x-2">

                {/* Первый логотип (logo_2.png) */}
                <img
                  src="/images/originals/logo_2.webp"
                  alt="Second Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain" // Адаптированный размер
                />

                {/* Второй логотип (logo.png) */}
                <img
                  src="/images/originals/logo.webp"
                  alt="Ekogumus Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain" // Адаптированный размер
                />
              </div>

              {/* Название сайта (текстовый блок) */}
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-montserrat font-bold text-white">
                  {/* Добавьте здесь название, если оно должно быть */}
                </span>
                {/* Дополнительная строка текста (слоган/подпись) */}
                <span className="text-xs sm:text-sm text-gray-400 font-opensans -mt-1">
                  {/* Здесь может быть ваш слоган или подпись */}
                </span>
              </div>
            </Link>

            <p className="text-gray-300 font-opensans leading-relaxed text-sm sm:text-base mb-6"> {/* Адаптировал размер текста */}
              {t.footer.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-base sm:text-lg font-montserrat font-semibold text-white mb-4 sm:mb-6"> {/* Адаптировал размер заголовка и отступ */}
              {t.footer.quickLinks}
            </h3>
            <nav className="space-y-2 sm:space-y-3"> {/* Уменьшил вертикальный отступ */}
              {[
                { name: t.nav.home, path: "/" },
                { name: t.nav.about, path: "/about" },
                { name: t.nav.products, path: "/products" },
                { name: t.nav.cooperation, path: "/cooperation" },
                { name: t.nav.news, path: "/news" },
                { name: t.nav.contacts, path: "/contacts" }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm sm:text-base text-gray-300 hover:text-ekogumus-green-light font-opensans transition-colors duration-300 hover:translate-x-1 transform"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-base sm:text-lg font-montserrat font-semibold text-white mb-4 sm:mb-6">
              {t.footer.contact}
            </h3>
            <div className="space-y-3 sm:space-y-4"> {/* Уменьшил вертикальный отступ */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-ekogumus-green-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-opensans text-xs sm:text-sm leading-relaxed">
                    {t.footer.address.country}<br />
                    {t.footer.address.city}<br />
                    {t.footer.address.street}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-ekogumus-green-light flex-shrink-0" />
                <a
                  href="tel:+998936418545"
                  className="text-xs sm:text-sm text-gray-300 hover:text-white font-opensans transition-colors duration-300"
                >
                  +998 (93) 641-85-45
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-ekogumus-green-light flex-shrink-0" />
                <a
                  href="mailto:bashfergana@mail.ru"
                  className="text-xs sm:text-sm text-gray-300 hover:text-white font-opensans transition-colors duration-300"
                >
                  bashfergana@mail.ru
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social & Working Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-base sm:text-lg font-montserrat font-semibold text-white mb-4 sm:mb-6">
              {t.footer.follow}
            </h3>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://www.youtube.com/@biogumusfargonaekogumus8419"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                title={t.a11y.youtube}
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/bahadir-solijonov-734686338"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                title={t.a11y.LinkedIn}
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            </div>

            {/* Working Hours */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"> {/* Изменил цвет бордера для контраста */}
              <h4 className="text-xs sm:text-sm font-montserrat font-semibold text-white mb-2">
                {t.footer.workingHours.title}
              </h4>
              <div className="space-y-1 text-xs sm:text-sm text-white font-opensans">
                <p className="text-white">{t.footer.workingHours.weekdays}</p>
                <p className="text-white">{t.footer.workingHours.sunday}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4"
          >
            <div className="flex flex-col md:flex-row items-center gap-2 text-xs sm:text-sm text-gray-400 font-opensans order-2 md:order-1 text-center">
              <p>© {currentYear} EKOGUMUS {t.footer.copyright}</p>
            </div>

            <div className="text-xs sm:text-sm text-gray-400 font-opensans order-1 md:order-2">
              <span className="bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light bg-clip-text text-transparent font-semibold">
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}