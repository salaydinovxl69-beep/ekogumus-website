import { motion } from "motion/react";
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardContent } from "../components/ui/card";
import { Users, Heart, Leaf, Target } from "lucide-react";
import { ImageLightbox } from '../components/ImageLightbox';
import { SectionContainer } from "../components/SectionContainer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../components/ui/carousel';

export function AboutPage() {
  const { t } = useLanguage();

  // From AboutSection
  const valuesData = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t.about.values.ecology.title,
      description: t.about.values.ecology.description,
      color: "text-green-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t.about.values.quality.title, 
      description: t.about.values.quality.description,
      color: "text-ekogumus-yellow"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t.about.values.innovation.title,
      description: t.about.values.innovation.description,
      color: "text-blue-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t.about.values.tradition.title,
      description: t.about.values.tradition.description,
      color: "text-ekogumus-red"
    }
  ];
  // --- Certificates section state ---
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const certificates = [
    {
      url: "../images/originals/certificate_1.png",
      alt: (t.aboutPage.certificates.certificate1Alt)
    },
    {
      url: "../images/originals/certificate_2.png",
      alt: (t.aboutPage.certificates.certificate2Alt)
    },
    {
      url: "../images/originals/certificate_3.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_4.png",
      alt: (t.aboutPage.certificates.certificate2Alt)
    },
    {
      url: "../images/originals/certificate_5.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_7.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_8.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_9.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_10.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_11.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_12.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_13.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    },
    {
      url: "../images/originals/certificate_14.png",
      alt: (t.aboutPage.certificates.certificate3Alt)
    }
  ];
  // Конвертируем для lightbox
  const lightboxImages = certificates.map(cert => ({
    src: cert.url,
    alt: cert.alt
  }));
  // Автопролистывание каждые 3 секунды
  useEffect(() => {
    if (!api || !isAutoPlaying) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, isAutoPlaying]);
  // Отслеживание текущего слайда
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  // Остановка автопролистывания при наведении
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  return (
    <div>
      {/* Главная о компании */}
        <SectionContainer compact={true}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 lg:mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-ekogumus-green mb-6">
                {t.about.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light mx-auto mb-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <p className="text-lg lg:text-xl font-opensans leading-relaxed text-gray-700">
                    {t.about.history}
                  </p>
                  
                  <p className="text-lg font-opensans leading-relaxed text-gray-700">
                    {t.about.development}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="inline-block relative rounded-2xl overflow-hidden shadow-2xl ml-20">
                  <ImageWithFallback
                    src="../images/originals/Generated Image August 29, 2025 - 1_06PM.jpeg"
                    alt={t.about.founderAlt}
                    className=" lg:h-[500px] object-contain"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-ekogumus-green text-center mb-12">
                {t.about.timeline.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-ekogumus-brown to-ekogumus-brown-light rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-montserrat font-bold text-lg">{t.about.timeline.step1.year}</span>
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-ekogumus-brown to-transparent hidden"></div>
                  </div>
                  <h4 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-3">{t.about.timeline.step1.title}</h4>
                  <p className="text-gray-600 font-opensans">{t.about.timeline.step1.description}</p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-ekogumus-green to-ekogumus-green-light rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-montserrat font-bold text-lg">{t.about.timeline.step2.year}</span>
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-ekogumus-green to-transparent hidden"></div>
                  </div>
                  <h4 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-3">{t.about.timeline.step2.title}</h4>
                  <p className="text-gray-600 font-opensans">{t.about.timeline.step2.description}</p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-montserrat font-bold text-lg">{t.about.timeline.step3.year}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-3">{t.about.timeline.step3.title}</h4>
                  <p className="text-gray-600 font-opensans">{t.about.timeline.step3.description}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {valuesData.map((value, index) => (
                <Card key={index} className="bg-glass-green border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${value.color} bg-gray-50 rounded-full mb-4 group-hover:bg-white transition-colors duration-300`}>
                      {value.icon}
                    </div>
                    <h4 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-3">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 font-opensans text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
          </SectionContainer>

      {/* История о компании */}
      <SectionContainer>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
            {(t.aboutPage.history.title)}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-6">
                {(t.aboutPage.history.content1)}
              </p>
              <p className="text-gray-600 mb-6">
                {(t.aboutPage.history.content2)}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-green-700 mb-4">
                {(t.aboutPage.history.achievementsTitle)}
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {(t.aboutPage.history.achievements.customers)}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {(t.aboutPage.history.achievements.export)}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {(t.aboutPage.history.achievements.laboratory)}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {(t.aboutPage.history.achievements.certification)}
                </li>
              </ul>
            </div>
          </div>
        </div>
        </SectionContainer>

        {/* Сертификаты */}
        <section className="py-16 bg-transparent-content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Заголовок секции */}
            <div className="text-center mb-12">
              <h2 className="mb-4">
                {(t.aboutPage.certificates.title)}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {(t.aboutPage.certificates.subtitle)}
              </p>
            </div>

            {/* Карусель-витрина сертификатов */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Carousel 
                className="w-full" 
                setApi={setApi}
                opts={{
                  align: "center",
                  loop: true,
                  slidesToScroll: 1,
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {certificates.map((certificate, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <div className="group p-1">
                        {/* A4 формат сертификата */}
                        <div className="relative">
                          <div 
                            className="bg-white shadow-lg border-2 border-gray-200 rounded-lg overflow-hidden aspect-[3/4] transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl cursor-pointer"
                            
                          >
                            <ImageWithFallback
                              src={certificate.url}
                              alt={certificate.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Тень от сертификата для эффекта A4 документа */}
                          <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-300 rounded-lg -z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>
                          
                          {/* Маленький значок сертификации */}
                          <div className="absolute top-3 right-3 bg-ekogumus-green text-white rounded-full p-2 shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:green border-1 shadow-lg" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:green border-1 shadow-lg" />
              </Carousel>
              
              {/* Индикаторы слайдов */}
              <div className="flex justify-center mt-6 space-x-2">
                {certificates.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current 
                        ? 'bg-ekogumus-green opacity-100 scale-125' 
                        : 'bg-ekogumus-green opacity-60'
                    }`}
                  />
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    
      {/* Команда */}
      <SectionContainer>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
            {(t.aboutPage.team.title)}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {(t.aboutPage.team.management.title)}
              </h3>
              <p className="text-gray-600">
                {(t.aboutPage.team.management.description)}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {(t.aboutPage.team.researchers.title)}
              </h3>
              <p className="text-gray-600">
                {(t.aboutPage.team.researchers.description)}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {t.aboutPage.team.production.title}
              </h3>
              <p className="text-gray-600">
                {t.aboutPage.team.production.description}
              </p>
            </div>
          </div>
        </div>
        </SectionContainer>
    </div>
  );
}