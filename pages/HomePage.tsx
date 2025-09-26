import { useState, useEffect, useCallback } from 'react';
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../components/ui/carousel";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ImageLightbox } from "../components/ImageLightbox";
import { useInView } from "react-intersection-observer";
import { SectionContainer } from "../components/SectionContainer";
import { 
  ArrowRight, 
  Award,
  Leaf,
  Droplets,
  TrendingUp,
  Target, 
  Users, 
  Heart, 
  Shield, 
  Clock,
  Calendar,
  Truck,
  CheckCircle,
  Globe
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <OurProductSection />
      <ProductSection />
      <CertificateSection />
      <StatsSection />
    </div>
  );
}

// Hero Section
function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="images/originals/doroga_trava_pole_1140666_3840x2160.jpg"
          alt={(t.hero.backgroundAlt)}
          className="w-full h-full object-cover "
          loading="eager"
          
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 -translate-y-[5vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white lg:pr-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-ekogumus-green/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-opensans font-medium">{(t.hero.badge)}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-bold leading-tight mb-6"
            >
              {(t.hero.title).split(' ').slice(0, -3).join(' ')}{" "}
              <span className="bg-gradient-to-r from-green-300 to-emerald-600 bg-clip-text text-transparent">
                {(t.hero.title).split(' ').slice(-3).join(' ')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg lg:text-xl xl:text-xl font-opensans mb-9 text-white leading-relaxed"
            >
              {(t.hero.subtitle)}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-green-300" />
                </div>
                <span className="font-opensans text-white">{(t.hero.features.eco)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                </div>
                <span className="font-opensans text-white">{(t.hero.features.yield)}</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light hover:from-ekogumus-green-light hover:to-ekogumus-green text-white font-opensans font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                {(t.hero.cta.primary)}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/contacts')}
                className="border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-ekogumus-green font-opensans font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
              >
                {(t.hero.cta.secondary)}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pl-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-glass-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-montserrat font-bold text-green-400 mb-2">
                    30+
                  </div>
                  <div className="text-sm font-opensans text-gray-800 leading-tight">
                    {(t.hero.cards.years)}
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-glass-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-montserrat font-bold text-ekogumus-brown mb-2">
                    10000т+
                  </div>
                  <div className="text-sm font-opensans text-gray-800 leading-tight">
                    {(t.hero.cards.export)}
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-glass-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-montserrat font-bold text-green-400 mb-2">
                    100%
                  </div>
                  <div className="text-sm font-opensans text-gray-800 leading-tight">
                    {(t.hero.cards.quality)}
                  </div>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-glass-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-montserrat font-bold text-ekogumus-brown mb-2">
                    {(t.hero.cards.certificate)}
                  </div>
                  <div className="text-sm font-opensans text-gray-800 leading-tight">
                    {(t.hero.cards.certificateDesc)}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section  
function AboutSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const valuesData = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: (t.about.values.ecology.title),
      description: (t.about.values.ecology.description),
      color: "text-green-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: (t.about.values.quality.title), 
      description: (t.about.values.quality.description),
      color: "text-ekogumus-yellow"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: (t.about.values.innovation.title),
      description: (t.about.values.innovation.description),
      color: "text-blue-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: (t.about.values.tradition.title),
      description: (t.about.values.tradition.description),
      color: "text-ekogumus-red"
    }
  ];

  return (
    <SectionContainer compact={true}>
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-ekogumus-green mb-6">
            {(t.about.title)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light mx-auto mb-6"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <p className="text-lg lg:text-xl font-opensans leading-relaxed text-gray-700">
                {(t.about.history)}
              </p>
              
              <p className="text-lg font-opensans leading-relaxed text-gray-700">
                {(t.about.development)}
              </p>
            </div>

            <Button
              size="lg"
              className="mt-25 bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light hover:from-ekogumus-green-light hover:to-ekogumus-green text-white font-opensans font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate('/about')}
            >
              {(t.about.cta)}
            </Button>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="inline-block relative rounded-2xl overflow-hidden shadow-2xl ml-20">
              <ImageWithFallback
                src="/images/originals/Generated Image August 29, 2025 - 1_06PM.jpeg"
                alt={t.about.founderAlt}
                className=" lg:h-[500px] object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-ekogumus-green text-center mb-12">
            {(t.about.timeline.title)}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1988 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-ekogumus-brown to-ekogumus-brown-light rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-montserrat font-bold text-lg">{(t.about.timeline.step1.year)}</span>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-ekogumus-brown to-transparent hidden"></div>
              </div>
              <h4 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-3">{(t.about.timeline.step1.title)}</h4>
              <p className="text-gray-600 font-opensans">{(t.about.timeline.step1.description)}</p>
            </div>

            {/* 1997 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-ekogumus-green to-ekogumus-green-light rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-montserrat font-bold text-lg">{(t.about.timeline.step2.year)}</span>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-ekogumus-green to-transparent hidden"></div>
              </div>
              <h4 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-3">{(t.about.timeline.step2.title)}</h4>
              <p className="text-gray-600 font-opensans">{(t.about.timeline.step2.description)}</p>
            </div>

            {/* 2025 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-montserrat font-bold text-lg">{(t.about.timeline.step3.year)}</span>
                </div>
              </div>
              <h4 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-3">{(t.about.timeline.step3.title)}</h4>
              <p className="text-gray-600 font-opensans">{(t.about.timeline.step3.description)}</p>
            </div>
          </div>
        </motion.div>

        {/* Values Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {valuesData.map((value, index) => (
            <Card key={index} className="bg-glass-green border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${value.color} bg-gray-100 rounded-full mb-4 group-hover:bg-white transition-colors duration-300`}>
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
  );
}

// Our Product Section
function OurProductSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleLearnMore = () => {
    navigate('/products');
  };

  const productImages = [
    {
      src: '../images/originals/Products.png',
      alt: 'Органические гранулы удобрения Ekogumus',
      title: 'Мелкогранулированные органические удобрения высокого качества'
    },
    {
      src: '../images/originals/Generated Image September 25, 2025 - 1_35PM (1).png',
      alt: 'Органические гранулы удобрения Ekogumus',
      title: 'Мелкогранулированные органические удобрения высокого качества'
    },
    {
      src: '../images/originals/Generated Image September 25, 2025 - 1_32PM (1).png',
      alt: 'Органические гранулы удобрения Ekogumus',
      title: 'Мелкогранулированные органические удобрения высокого качества'
    },
    {
      src: '../images/originals/Generated Image September 25, 2025 - 1_14PM (1).png',
      alt: 'Органические гранулы удобрения Ekogumus',
      title: 'Мелкогранулированные органические удобрения высокого качества'
    },
    {
      src: 'https://images.unsplash.com/photo-1580974563942-76580268810f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wb3N0JTIwZWFydGh3b3Jtc3xlbnwxfHx8fDE3NTYwMjU1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Калифорнийские дождевые черви в процессе производства',
      title: 'Калифорнийские красные дождевые черви - основа нашего производства'
    },
    {
      src: 'https://images.unsplash.com/photo-1581578017306-7334b15283df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwZmFydGh3b3Jtc3xlbnwxfHx8fDE3NTYwMjU1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Улучшение структуры почвы с помощью удобрений Ekogumus',
      title: 'Восстановление плодородия и улучшение структуры почвы'
    },
    {
      src: 'images/originals/ECO_HAND.png',
      alt: 'Сельскохозяйственные органические продукты для устойчивого земледелия',
      title: 'Экологически чистые решения для современного сельского хозяйства'
    }
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <SectionContainer compact={true}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Текстовая часть слева */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-ekogumus-green mb-6">
                  {(t.ourProduct.title)}
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-ekogumus-green mb-6">
                  {(t.ourProduct.subtitle)}
                </p>
                <div className="prose prose-lg max-w-none">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                    {(t.ourProduct.description.paragraph1)}
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                    {(t.ourProduct.description.paragraph2)}
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {(t.ourProduct.description.paragraph3)}
                  </p>
                </div>
              </div>
              
              {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light hover:from-ekogumus-green-light hover:to-ekogumus-green text-white font-opensans font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                {(t.ourProduct.cta)}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
            </div>

            {/* Слайдер изображений справа */}
            <div className="relative">
              <ProductImageCarousel 
                images={productImages} 
                onImageClick={openLightbox}
              />
            </div>
          </div>
        </div>

      {/* Lightbox */}
      <ImageLightbox
        images={productImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
      </SectionContainer>
  );
}

// Компонент слайдера с изображениями с автопролистыванием
function ProductImageCarousel({ 
  images, 
  onImageClick 
}: { 
  images: Array<{src: string; alt: string; title: string}>;
  onImageClick: (index: number) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Остановка автопролистывания при наведении
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel 
        className="w-full" 
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div 
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 shadow-lg" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 shadow-lg" />
        
        {/* Индикаторы слайдов с активным состоянием */}
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
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
        

      </Carousel>
    </div>
  );
}

// Product Section
function ProductSection() {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: Shield,
      title: t.products.productSection.card1.title,
      description: t.products.productSection.card1.description,
      color: "from-blue-200 to-blue-900",
      hoverColor: "group-hover:bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: t.products.productSection.card2.title,
      description: t.products.productSection.card2.description,
      color: "from-green-200 to-green-900", 
      hoverColor: "group-hover:bg-green-50"
    },
    {
      icon: Clock,
      title: t.products.productSection.card3.title,
      description: t.products.productSection.card3.description,
      color: "from-red-200 to-red-900",
      hoverColor: "group-hover:bg-red-50"
    },
    {
      icon: Leaf,
      title: t.products.productSection.card4.title,
      description: t.products.productSection.card4.description,
      color: "from-emerald-200 to-emerald-900",
      hoverColor: "group-hover:bg-emerald-50"
    },
    {
      icon: Droplets,
      title: t.products.productSection.card5.title,
      description: t.products.productSection.card5.description,
      color: "from-blue-200 to-blue-900",
      hoverColor: "group-hover:bg-blue-50"
    }
  ];

  return (
    <SectionContainer compact={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-ekogumus-green mb-6">
            {t.products.productSection.title}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed mb-6">
            {t.products.productSection.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`group text-center h-full bg-glass-green border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden ${benefit.hoverColor}`}>
                  <CardHeader className="pb-3 pt-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl leading-tight group-hover:text-ekogumus-green transition-colors duration-300">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}

// Certificate Section
function CertificateSection() {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const certificateImages = [
    {
      src: "../images/originals/certificate_8.png",
      alt: (t.certificates.certificateAlt),
      title: 'Сертификат соответствия на серийное производство органоминеральных удобрений'
    }
  ];

  const openLightbox = () => {
    setLightboxOpen(true);
  };
  
  return (
    <SectionContainer compact={true}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <Badge className="bg-green-700 text-white sm:mb-6 text-sm sm:text-base px-3 py-1">
                      {(t.certificates.badge)}
                    </Badge>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-green-700 mb-4 sm:mb-6 leading-tight">
                     {(t.certificates.title)}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                     {(t.certificates.description)}
                    </p>
                  </div>
                  <div className="text-center order-1 lg:order-2">
                    <div className="relative inline-block">
                      <div 
                        className="relative cursor-pointer group"
                        onClick={openLightbox}
                      >
                        {/* Контейнер с фиксированными размерами для формата А4 */}
                        <div className="relative w-56 sm:w-64 lg:w-72 xl:w-80 mx-auto">
                          <div className="bg-white shadow-lg border-2 border-green-200 rounded-lg overflow-hidden aspect-[3/4] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                            <ImageWithFallback
                              src={certificateImages[0].src}
                              alt={certificateImages[0].alt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
          </div>
        </div>
    </SectionContainer>
  );
}

// Stats Section
interface StatItem {
  icon: JSX.Element;
  value: string;
  label: string;
  description: string;
  color: string;
}

function StatsSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const statsData: StatItem[] = [
    {
      icon: <Calendar className="w-8 h-8" />,
      value: "30+",
      label: (t.stats.items.years),
      description: (t.stats.items.yearsDesc),
      color: "text-ekogumus-green"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      value: "10000т+",
      label: (t.stats.items.export),
      description: (t.stats.items.exportDesc),
      color: "text-ekogumus-brown"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      value: "100%",
      label: (t.stats.items.control),
      description: (t.stats.items.controlDesc),
      color: "text-ekogumus-green-light"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "1",
      label: (t.stats.items.certificate),
      description: (t.stats.items.certificateDesc),
      color: "text-yellow-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "35%",
      label: (t.stats.items.yield),
      description: (t.stats.items.yieldDesc),
      color: "text-green-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "10+",
      label: (t.stats.items.countries),
      description: (t.stats.items.countriesDesc),
      color: "text-blue-600"
    }
  ];

  function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    useEffect(() => {
      if (inView) {
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }, [inView, end, duration]);

    return <span ref={ref}>{count}</span>;
  }

  return (
    <SectionContainer compact={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-montserrat font-bold text-ekogumus-green mb-6">
            {(t.stats.title)}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-opensans">
            {(t.stats.subtitle)}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full bg-glass-green border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 lg:p-8 text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 ${stat.color} bg-grau rounded-full mb-6 group-hover:bg-gray-100 transition-colors duration-300`}>
                    {stat.icon}
                  </div>

                  {/* Value */}
                  <div className="mb-4">
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-montserrat font-bold text-gray-800">
                      {stat.value.includes('+') ? (
                        <>
                          <AnimatedCounter end={parseInt(stat.value.replace(/\D/g, ''))} />
                          {stat.value.replace(/\d/g, '')}
                        </>
                      ) : stat.value.includes('%') ? (
                        <>
                          <AnimatedCounter end={parseInt(stat.value.replace('%', ''))} />%
                        </>
                      ) : (
                        stat.value
                      )}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg lg:text-xl font-montserrat font-semibold text-ekogumus-green mb-3">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 font-opensans leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 lg:mt-16"
        >
          <div className="bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-montserrat font-bold mb-4">
              {(t.stats.cta.title)}
            </h3>
            <p className="text-lg lg:text-xl mb-6 opacity-90 font-opensans">
              {(t.stats.cta.subtitle)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/products')}
                className="border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-ekogumus-green font-opensans font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
              >
                {(t.stats.cta.products)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/contacts')}
                className="border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-ekogumus-green font-opensans font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
              >
                {(t.stats.cta.contact)}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}