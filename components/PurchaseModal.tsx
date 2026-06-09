import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "./ui/drawer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { MessageCircle } from "lucide-react";
import { useMediaQuery } from "../hooks/use-media-query"; // <-- Импортируем хук

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
    weight?: string;
    volume?: string;
    marketplace?: string;
  };
}

// Выносим общий контент в отдельный компонент, чтобы не дублировать код
function PurchaseContent({ product, onClose }: { product: PurchaseModalProps['product'], onClose: () => void }) {
  const { t } = useLanguage();

  const purchaseModal = (t.purchaseModal) as {
    title: string;
    subtitle: string;
    chooseMethod: string;
    telegram: {
      title: string;
    };
    productInfo: string;
    close: string;
  };

  const handleTelegramClick = () => {
    const message = `Здравствуйте! Меня интересует товар: ${product.name}, цена: ${product.price}${product.weight ? ` за ${product.weight}кг` : product.volume ? ` за ${product.volume}л` : ''}. Можете предоставить подробную информацию?`;
    const telegramUrl = `https://t.me/BahodirBX?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Информация о товаре */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/50 dark:bg-zinc-900/50 rounded-xl p-4 space-y-3 border"
      >
        <h4 className="font-medium text-green-700 dark:text-green-400">
          {purchaseModal.productInfo}
        </h4>
        <p className="text-gray-800 dark:text-gray-200">{product.name}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-white px-3 py-1">
            {product.price} {t.products.liquidFertilizers.priceUnit}
          </Badge>
          {product.weight && (
            <Badge variant="outline" className="border-green-600 text-green-700 dark:text-green-400 px-3 py-1">
              {product.weight} {t.products.productCards.weightUnit}
            </Badge>
          )}
          {product.volume && (
            <Badge variant="outline" className="border-green-600 text-green-700 dark:text-green-400 px-3 py-1">
              {product.volume} {t.products.liquidFertilizers.volumeUnit}
            </Badge>
          )}
        </div>
      </motion.div>

      {/* Выбор способа покупки */}
      <div className="space-y-4">
        <h4 className="text-center font-medium text-green-900 dark:text-gray-200">
          {purchaseModal.chooseMethod}
        </h4>

        {/* Telegram */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleTelegramClick}
            className="cursor-pointer w-full h-auto p-4 bg-white dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-zinc-700 text-left border border-gray-200 dark:border-zinc-700 hover:border-blue-300 transition-all duration-300 group"
            variant="outline"
          >
            <div className="flex items-center space-x-4 w-full">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-600" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-gray-900 dark:text-gray-100">{purchaseModal.telegram.title}</h5>
              </div>
              <MessageCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
            </div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}


export function PurchaseModal({ isOpen, onClose, product }: PurchaseModalProps) {
  const { t } = useLanguage();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const purchaseModal = (t.purchaseModal) as {
    title: string;
    subtitle: string;
    close: string;
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="bg-glass border-0 shadow-xl backdrop-blur-md">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-montserrat text-green-900 dark:text-green-300">
              {purchaseModal.title}
            </DrawerTitle>
            <DrawerDescription className="text-black dark:text-gray-400">
              {purchaseModal.subtitle}
            </DrawerDescription>
          </DrawerHeader>
          <PurchaseContent product={product} onClose={onClose} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">{purchaseModal.close}</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-w-[95vw] bg-glass border-0 shadow-xl backdrop-blur-md p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0 space-y-3 text-center">
          <DialogTitle className="font-montserrat text-green-900 dark:text-green-300">
            {purchaseModal.title}
          </DialogTitle>
          <DialogDescription className="text-black dark:text-gray-400">
            {purchaseModal.subtitle}
          </DialogDescription>
        </DialogHeader>
        <PurchaseContent product={product} onClose={onClose} />
        {/* На десктопе кнопка закрытия не так обязательна, так как можно кликнуть вне окна */}
      </DialogContent>
    </Dialog>
  );
}