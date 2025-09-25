import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageLightboxProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ImageLightbox({ images, isOpen, onClose, initialIndex = 0 }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // Reset state when opening lightbox
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
      setRotation(0);
      setImagePosition({ x: 0, y: 0 });
      // Блокируем прокрутку страницы
      document.body.classList.add('lightbox-open');
    } else {
      // Разблокируем прокрутку страницы
      document.body.classList.remove('lightbox-open');
    }
    
    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetImageTransform();
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetImageTransform();
  }, [images.length]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const resetImageTransform = () => {
    setZoom(1);
    setRotation(0);
    setImagePosition({ x: 0, y: 0 });
  };

  // Mouse drag functionality for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-[101] text-white hover:bg-white/20 rounded-full p-2"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] text-white hover:bg-white/20 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] text-white hover:bg-white/20 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Control buttons */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[101] flex items-center gap-2 bg-black/50 rounded-full px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm px-2">{Math.round(zoom * 100)}%</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-white/30 mx-2" />
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              handleRotate();
            }}
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full px-3 py-2 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              resetImageTransform();
            }}
          >
            Сброс
          </Button>
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[101] bg-black/50 rounded-full px-4 py-2">
            <span className="text-white text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Image container */}
        <motion.div
          className="flex items-center justify-center w-full h-full p-4"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[90vh] overflow-hidden"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
              transformOrigin: 'center',
              transition: isDragging ? 'none' : 'transform 0.3s ease',
            }}
          >
            <ImageWithFallback
              src={currentImage.src}
              alt={currentImage.alt}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* Image title/description */}
        {currentImage.title && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[101] bg-black/50 rounded-lg px-4 py-2 max-w-[80vw]">
            <p className="text-white text-center text-sm">{currentImage.title}</p>
          </div>
        )}

        {/* Touch gesture hint for mobile */}
        <div className="absolute bottom-4 right-4 z-[101] text-white/60 text-xs hidden sm:block">
          <p>← → навигация | ESC закрыть | +/- зум</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}