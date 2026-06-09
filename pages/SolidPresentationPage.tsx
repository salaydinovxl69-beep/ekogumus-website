import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Grid, ZoomIn } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface PresentationSlide {
  id: number;
  titleKey: string;
  imageUrl: string;
  descriptionKey: string;
}

interface SolidPresentationProps {
  isOpen?: boolean;
  onClose?: () => void;
  asModal?: boolean;
}

export function SolidPresentationPage({ isOpen = true, onClose, asModal = false }: SolidPresentationProps) {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGridView, setIsGridView] = useState(false);

  // Мемоизированные данные слайдов
  const slides: PresentationSlide[] = useMemo(
    () => [
      { id: 1, titleKey: '', imageUrl: '../images/originals/0001.webp', descriptionKey: '' },
      { id: 2, titleKey: '', imageUrl: '../images/originals/0003.webp', descriptionKey: '' },
      { id: 3, titleKey: '', imageUrl: '../images/originals/0004.webp', descriptionKey: '' },
      { id: 4, titleKey: '', imageUrl: '../images/originals/0005.webp', descriptionKey: '' },
      { id: 5, titleKey: '', imageUrl: '../images/originals/0006.webp', descriptionKey: '' },
      { id: 6, titleKey: '', imageUrl: '../images/originals/0007.webp', descriptionKey: '' },
      { id: 7, titleKey: '', imageUrl: '../images/originals/0008.webp', descriptionKey: '' },
      { id: 8, titleKey: '', imageUrl: '../images/originals/0011.webp', descriptionKey: '' },
      { id: 9, titleKey: '', imageUrl: '../images/originals/0012.webp', descriptionKey: '' },
    ],
    []
  );

  // Навигация
  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsGridView(false);
  }, []);

  const toggleGridView = useCallback(() => {
    setIsGridView((prev) => !prev);
  }, []);


  const p = t.products.SolidPresentation;

  const presentationContent = (
    <div className="h-full bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 relative">
      {/* Fixed Close Button */}
      {onClose && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 z-20"
        >
        </motion.div>
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 pr-16 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Badge variant="outline" className="bg-ekogumus-green text-white border-ekogumus-green flex-shrink-0">
              <span className="hidden sm:inline">{t.products.SolidPresentation.lang} </span>
              {language?.toUpperCase() || 'RU'}
            </Badge>
            <h1 className="font-montserrat font-bold text-lg sm:text-xl text-ekogumus-green dark:text-ekogumus-green-light truncate">
              {p.title}
            </h1>
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleGridView}
              className="cursor-pointer text-ekogumus-green border-ekogumus-green hover:bg-ekogumus-green hover:text-white"
            >
              <Grid className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">{isGridView ? p.slideView : p.gridView}</span>
            </Button>

            {!isGridView && (
              <>
                <Button variant="outline" size="sm" onClick={handlePrevSlide}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-opensans px-2">
                  {currentSlide + 1}/{slides.length}
                </span>
                <Button variant="outline" size="sm" onClick={handleNextSlide}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {!isGridView && (
          <div className="px-4 pb-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="pt-24 h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {isGridView ? (
            // === GRID VIEW ===
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 h-full overflow-y-auto"
            >
              {slides.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="cursor-pointer group"
                  onClick={() => goToSlide(index)}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <ImageWithFallback
                      src={slide.imageUrl}
                      alt={slide.titleKey}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-white font-opensans font-medium text-sm">{slide.titleKey}</p>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-ekogumus-green text-white" variant="secondary">
                      {index + 1}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // === SLIDE VIEW ===
            <motion.div
              key={`slide-${currentSlide}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="h-full flex flex-col p-6"
              onClick={asModal ? onClose : undefined}
            >
              <div className="flex-1 flex items-center justify-center">
                <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <ImageWithFallback
                      src={slides[currentSlide]?.imageUrl || ''}
                      alt={slides[currentSlide]?.titleKey || ''}
                      className="w-full h-auto max-h-[70vh] object-contain bg-white"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-ekogumus-green text-white font-opensans">
                        {p.slideView} {currentSlide + 1} / {slides.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-6 text-center space-y-2">
                    <h2 className="font-montserrat font-bold text-2xl text-ekogumus-green dark:text-ekogumus-green-light">
                      {slides[currentSlide]?.titleKey}
                    </h2>
                    <p className="font-opensans text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                      {slides[currentSlide]?.descriptionKey}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (asModal) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
            >
              {presentationContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return <div className="h-screen w-full">{presentationContent}</div>;
}
