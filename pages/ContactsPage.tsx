import { toast } from 'sonner';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, } from '../components/ui/card';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, PhoneCall, Send, Copy, Check } from 'lucide-react';

function InteractiveContactTile({
  icon,
  title,
  value,
  type,
  description,
  className = "",
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  type: 'phone' | 'email' | 'url' | 'telegram';
  description?: string;
  className?: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(t.contacts.actions.copied, {
        description: text,
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(t.contacts.actions.copyFail);
    }
  };

  const handlePrimaryAction = () => {
    switch (type) {
      case 'phone': {
        const cleanPhone = value.replace(/[^+\d]/g, '');
        window.location.href = `tel:${cleanPhone}`;
        break;
      }
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'telegram':
        window.open(`https://t.me/${value.replace('@', '')}`, '_blank', 'noopener,noreferrer');
        break;
      case 'url':
        window.open(value, '_blank', 'noopener,noreferrer');
        break;
    }
  };

  const getActionIcon = () => {
    switch (type) {
      case 'phone':
        return <PhoneCall className="w-4 h-4" />;
      case 'email':
        return <Send className="w-4 h-4" />;
      case 'telegram':
        return <Send className="w-4 h-4" />;
      case 'url':
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getActionText = () => {
    switch (type) {
      case 'phone':
        return t.contacts.actions.call;
      case 'email':
        return t.contacts.actions.write;
      case 'telegram':
        return t.contacts.actions.open;
      case 'url':
        return t.contacts.actions.open;
    }
  };

  const getHoverColor = () => {
    switch (type) {
      case 'phone':
        return 'group-hover:bg-green-50';
      case 'email':
        return 'group-hover:bg-blue-50';
      case 'telegram':
        return 'group-hover:bg-cyan-50';
      case 'url':
        return 'group-hover:bg-purple-50';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'phone':
        return 'text-green-600';
      case 'email':
        return 'text-blue-600';
      case 'telegram':
        return 'text-cyan-600';
      case 'url':
        return 'text-purple-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group ${className}`}
    >
      <Card className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden ${getHoverColor()}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center ${getIconColor()}`}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 360 : 0,
                }}
                transition={{ duration: 0.6 }}
              >
                {icon}
              </motion.div>
              <div>
                <h3 className="font-montserrat font-semibold text-gray-800">
                  {title}
                </h3>
                {description && (
                  <p className="text-sm text-gray-500 font-opensans">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 font-opensans text-lg break-all">
              {value}
            </p>
          </div>

          <div className="flex gap-2">
            <motion.button
              onClick={handlePrimaryAction}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 group/btn ${getIconColor()}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {getActionIcon()}
              <span className="font-opensans font-medium">
                {getActionText()}
              </span>
            </motion.button>

            <motion.button
              onClick={() => copyToClipboard(value)}
              className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={t.contacts.actions.copy}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ContactsPage() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Контактная информация */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="mb-4">
              {t.contacts.title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto font-opensans">
              {t.contacts.subtitle}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Адрес */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-ekogumus-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-ekogumus-green" />
                  </div>
                  <h3 className="mb-4 font-montserrat font-semibold text-ekogumus-green">
                    {t.contacts.contactCards.address.title}
                  </h3>
                  <div className="text-gray-600 font-opensans">
                    <p>{t.contacts.contactCards.address.country}</p>
                    <p>{t.contacts.contactCards.address.region}</p>
                    <p>{t.contacts.contactCards.address.city}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Телефоны */}
            <InteractiveContactTile
              icon={<Phone className="w-6 h-6" />}
              title={t.contacts.contactCards.phone.title}
              value={t.contacts.contactCards.phone.primary}
              type="phone"
              description={t.contacts.contactCards.phone.primaryDesc}
              delay={0.2}
            />
            
            {/* Email */}
            <InteractiveContactTile
              icon={<Mail className="w-6 h-6" />}
              title={t.contacts.contactCards.email.title}
              value={t.contacts.contactCards.email.info}
              type="email"
              description={t.contacts.contactCards.email.infoDesc}
              delay={0.3}
            />
          </div>

          {/* Дополнительные контакты */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <InteractiveContactTile
              icon={<Phone className="w-6 h-6" />}
              title={t.contacts.contactCards.phone.secondaryTitle}
              value={t.contacts.contactCards.phone.secondary}
              type="phone"
              description={t.contacts.contactCards.phone.secondaryDesc}
              delay={0.4}
            />
            
            {/* Телеграм */}
            <InteractiveContactTile
              icon={<MessageCircle className="w-6 h-6" />}
              title={t.contacts.contactCards.email.salesTitle}
              value={t.contacts.contactCards.email.sales}
              type="telegram"
              description={t.contacts.contactCards.email.salesDesc}
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Карта и часы работы */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Карта */}
            <div>
              <h2 className="mb-6 font-montserrat font-semibold text-green-800" >{t.contacts.map.title}</h2>
              <div className="relative">
                <div className="w-full h-[350px] rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=71.771205%2C40.390203&z=17&pt=71.771205%2C40.390203&scroll=false"
                    width="100%"
                    height="350"
                    style={{ border: 'none' }}
                    title="Карта расположения EkoGumus"
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={() => window.open(`https://yandex.ru/maps/?ll=71.771205%2C40.390203&z=17&pt=71.771205%2C40.390203`, '_blank')}
                    className="bg-white/90 text-ekogumus-green px-3 py-2 rounded-lg shadow-lg hover:bg-white transition-colors duration-200 font-opensans text-sm border border-ekogumus-green/20"
                    title={t.contacts.map.openInYandexMaps}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => window.open(`https://yandex.ru/maps/?rtext=~40.390203,71.771205&rtt=auto`, '_blank')}
                    className="bg-ekogumus-green text-white px-4 py-2 rounded-lg shadow-lg hover:bg-ekogumus-green-light transition-colors duration-200 font-opensans text-sm flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    {t.contacts.map.getDirections}
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mt-4 font-opensans">
                {t.contacts.map.description}
              </p>
            </div>
            
            {/* Часы работы и дополнительная информация */}
            <div>
              <h2 className="mb-6 font-montserrat font-semibold text-green-800">{t.contacts.workingHours.title}</h2>
              
              <div className="bg-glass p-6 rounded-lg shadow-md mb-6">
                <h3 className="mb-4 text-green-800">{t.contacts.workingHours.office.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>{t.contacts.workingHours.office.weekdays}</span>
                    <span>{t.contacts.workingHours.office.weekdaysTime}</span>
                  </div>
                  <div className="flex justify-between">
                  </div>
                  <div className="flex justify-between">
                    <span>{t.contacts.workingHours.office.sunday}</span>
                    <span>{t.contacts.workingHours.office.sundayTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-glass p-6 rounded-lg shadow-md">
                <h3 className="mb-4 text-green-800">{t.contacts.workingHours.production.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>{t.contacts.workingHours.production.weekdays}</span>
                    <span>{t.contacts.workingHours.production.weekdaysTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.contacts.workingHours.production.sunday}</span>
                    <span>{t.contacts.workingHours.production.sundayTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}