import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { ShoppingCart, MessageCircle, ExternalLink, X } from "lucide-react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
    weight?: string;
    volume?: string;
    marketplace: string;
  };
}

export function PurchaseModal({ isOpen, onClose, product }: PurchaseModalProps) {
  const { t } = useLanguage();
  
  // Get purchase modal translations
  const purchaseModal = (t.purchaseModal) as {
    title: string;
    subtitle: string;
    chooseMethod: string;
    uzumMarket: {
      title: string;
      description: string;
      button: string;
    };
    telegram: {
      title: string;
      description: string;
      button: string;
    };
    productInfo: string;
    close: string;
  };

  const handleUzumClick = () => {
    window.open(product.marketplace, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleTelegramClick = () => {
    // Создаем сообщение для Telegram с информацией о товаре
    const message = `Здравствуйте! Меня интересует товар: ${product.name}, цена: ${product.price}${product.weight ? ` за ${product.weight}кг` : product.volume ? ` за ${product.volume}л` : ''}. Можете предоставить подробную информацию о наличии и условиях покупки?`;
    const telegramUrl = `https://t.me/BahodirBX?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-w-[95vw] bg-glass border-0 shadow-xl backdrop-blur-md p-0 overflow-hidden">

        <div className="p-6 space-y-6">
          <DialogHeader className="space-y-3 text-center">
            <DialogTitle className="font-montserrat text-green-900">
              {purchaseModal.title}
            </DialogTitle>
            <DialogDescription className="text-black">
              {purchaseModal.subtitle}
            </DialogDescription>
          </DialogHeader>

          {/* Информация о товаре */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-glass rounded-xl p-4 space-y-3"
          >
            <h4 className="font-medium text-ekogumus-green">
              {purchaseModal.productInfo}
            </h4>
            <p className="text-gray-700">{product.name}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-ekogumus-green text-white px-3 py-1">
                {product.price} сум
              </Badge>
              {product.weight && (
                <Badge variant="outline" className="border-ekogumus-green text-ekogumus-green px-3 py-1">
                  {product.weight} кг
                </Badge>
              )}
              {product.volume && (
                <Badge variant="outline" className="border-ekogumus-green text-ekogumus-green px-3 py-1">
                  {product.volume} л
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Выбор способа покупки */}
          <div className="space-y-4">
            <h4 className="text-center font-medium text-green-900">
              {purchaseModal.chooseMethod}
            </h4>

            {/* Uzum Market */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
            </motion.div>

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
                className="w-116 h-auto p-4 bg-white hover:bg-blue-50 text-left border border-gray-200 hover:border-blue-300 transition-all duration-300 group"
                variant="outline"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                    {/* Telegram Icon */}
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-600" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-gray-900">{purchaseModal.telegram.title}</h5>
                      <ExternalLink className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    </div>
                  </div>
                  <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                </div>
              </Button>
            </motion.div>
          </div>

          {/* Кнопка закрытия внизу */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="pt-2"
          >
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-600 text-black hover:bg-green-800 bg-white "
            >
              {purchaseModal.close}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}