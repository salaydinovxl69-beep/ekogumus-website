import { useState } from "react";
import { motion } from "motion/react";
import { Images } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { PurchaseModal } from "../components/PurchaseModal";
import { SectionContainer } from "../components/SectionContainer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Youtube, Leaf, TrendingUp, Clock, Shield, Beaker, Droplets, Scale, ShoppingCart, Package, Zap, ExternalLink } from "lucide-react";

export function ProductPage() {
  return (
    <div>
      <ProductSection />
      <BiohumusInfoSection />
      <ProductionProcessSection />
      <LiqPresentationSection />
      <LiquidFertilizers />
      <ProductCards />
      <YouTubeVideoSection />
    </div>
  );
}

//Секция с информ о продукте
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
            {(t.products.productSection.title)}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed mb-6">
            {(t.products.productSection.subtitle)}
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
                <Card className={`group text-center h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden ${benefit.hoverColor}`}>
                  <CardHeader className="pb-3 pt-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl leading-tight group-hover:text-ekogumus-green transition-colors duration-300">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{benefit.description}</p>
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

//Карточки товаров (Жидкое)
function LiquidFertilizers() {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    price: string;
    volume: string;
    marketplace: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get liquid products from translations with proper typing
  const liquidFertilizerData = (t.products.liquidFertilizers) as {
    title: string;
    subtitle: string;
    buyButton: string;
    moreButton: string;
    fromLabel: string;
    priceUnit: string;
    volumeUnit: string;
    features: {
      fastAction: string;
      highConcentration: string;
      easyApplication: string;
    };
    products: Array<{
      name: string;
      description: string;
      volume: string;
      price: string;
      marketplace: string;
    }>;
  };

  const products = liquidFertilizerData.products || [];

  // Массив изображений для жидких удобрений
  const liquidProductImages = [
    "images/originals/ECO_10_L.png",
    "images/originals/ECO_10_L.png",
    "images/originals/ECO_10_L.png",
  ];

  const handleBuyClick = (product: any) => {
    setSelectedProduct({
      name: product.name,
      price: product.price,
      volume: product.volume,
      marketplace: product.marketplace
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <SectionContainer compact={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          {/* Убедитесь, что текст в Badge остается читаемым на мобильных */}
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 text-sm mb-4">
              <Zap className="w-4 h-4 mr-2" />
              {liquidFertilizerData.main}
            </Badge>
          </div>
          {/* Адаптивный размер заголовка */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-ekogumus-green mb-4 sm:mb-6">
            {liquidFertilizerData.title}
          </h2>
          {/* Адаптивный размер подзаголовка */}
          <p className="text-gray-600 max-w-4xl mx-auto text-base sm:text-lg lg:text-xl mb-6">
            {liquidFertilizerData.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto"></div>
        </motion.div>

        {/* Адаптированная сетка: 1 колонка на мобильных, 2 на планшетах (sm), 3 на MD и выше */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="group h-full bg-glass-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative">
                <CardContent className="p-0">
                  {/* Изображение продукта */}
                  <div className="relative h-48 sm:h-56 overflow-hidden"> {/* Оптимизация высоты для маленьких экранов */}
                    <ImageWithFallback
                      src={liquidProductImages[index % liquidProductImages.length]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Бейдж объема */}
                    <Badge
                      className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 shadow-lg text-xs sm:text-sm"
                      variant="secondary"
                    >
                      <Droplets className="w-3 h-3 mr-1" />
                      {product.volume} {liquidFertilizerData.volumeUnit}
                    </Badge>

                    {/* Индикатор жидкости */}
                    <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 bg-yellow-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Beaker className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>

                  {/* Содержимое карточки */}
                  <div className="p-4 sm:p-5">
                    {/* Название и описание - line-clamp обеспечивает чистый вид на мобильных */}
                    <div className="mb-4">
                      <h3 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-2 line-clamp-1 group-hover:text-yellow-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Цена */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{liquidFertilizerData.fromLabel}</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                          {parseInt(product.price).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">{liquidFertilizerData.priceUnit}</span>
                      </div>
                    </div>

                    {/* Кнопка покупки - w-full и size="sm" идеальны для мобильных */}
                    <div>
                      <Button
                        onClick={() => handleBuyClick(product)}
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white transition-all duration-300 group-hover:shadow-lg"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {liquidFertilizerData.buyButton}
                      </Button>
                    </div>
                  </div>

                  {/* Hover эффект - игнорируется на touch-устройствах, что корректно */}
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-glass-green rounded-2xl p-6 sm:p-8">
            {/* flex-wrap обеспечивает перенос элементов на новую строку на узких экранах */}
            <div className="flex items-center justify-center gap-4 flex-wrap text-sm sm:text-base">
              <div className="flex items-center gap-2 text-yellow-600">
                <Droplets className="w-5 h-5" />
                <span className="font-medium">{liquidFertilizerData.features.fastAction}</span>
              </div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-2 text-yellow-600">
                <Beaker className="w-5 h-5" />
                <span className="font-medium">{liquidFertilizerData.features.highConcentration}</span>
              </div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-2 text-yellow-600">
                <Scale className="w-5 h-5" />
                <span className="font-medium">{liquidFertilizerData.features.easyApplication}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Purchase Modal */}
      {selectedProduct && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
    </SectionContainer>
  );
}

//Карточки товаров(Гранулы)
function ProductCards() {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    price: string;
    weight: string;
    marketplace: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get products from translations with proper typing
  const productCardsData = (t.products.productCards) as {
    title: string;
    subtitle: string;
    buyButton: string;
    moreButton: string;
    fromLabel: string;
    priceUnit: string;
    weightUnit: string;
    features: {
      organicProduct: string;
      certified: string;
      delivery: string;
    };
    products: Array<{
      name: string;
      description: string;
      weight: string;
      price: string;
      marketplace: string;
    }>;
  };

  const products = productCardsData.products || [];

  // Массив изображений для товаров
  const productImages = [
    "images/originals/ECO_1_KG.png",
    "images/originals/ECO_1,5_KG.png",
    "images/originals/ECO_2_KG.png",
    "images/originals/ECO_2,5_KG.png",
    "images/originals/ECO_3_KG.png",
    "images/originals/ECO_7_KG.png",
    "images/originals/ECO_10_KG.png",
    "images/originals/ECO_20_KG.png",
  ];

  const handleBuyClick = (product: any) => {
    setSelectedProduct({
      name: product.name,
      price: product.price,
      weight: product.weight,
      marketplace: product.marketplace
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <SectionContainer compact={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-ekogumus-green mb-4 sm:mb-6">
            {productCardsData.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl mb-6">
            {productCardsData.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light mx-auto"></div>
        </motion.div>

        {/* Адаптированная сетка: gap-4 на мобильных, gap-6 на sm, gap-8 на lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative">
                <CardContent className="p-0">
                  {/* Изображение продукта */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={productImages[index % productImages.length]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Hover эффект изображения - не активен на touch-устройствах */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Бейдж веса */}
                    <Badge
                      className="absolute top-3 left-3 bg-ekogumus-green text-white px-3 py-1 shadow-lg text-xs" // Добавил text-xs для лучшей читаемости на мобильных
                      variant="secondary"
                    >
                      <Scale className="w-3 h-3 mr-1" />
                      {product.weight} {productCardsData.weightUnit}
                    </Badge>
                  </div>

                  {/* Содержимое карточки */}
                  <div className="p-4 sm:p-5">
                    {/* Название и описание */}
                    <div className="mb-4">
                      <h3 className="text-lg font-montserrat font-semibold text-ekogumus-green mb-2 line-clamp-1 group-hover:text-ekogumus-green-light transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Цена */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{productCardsData.fromLabel}</span>
                        <span className="text-xl font-bold text-ekogumus-green">
                          {parseInt(product.price).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">{productCardsData.priceUnit}</span>
                      </div>
                    </div>

                    {/* Кнопка покупки */}
                    <div>
                      <Button
                        onClick={() => handleBuyClick(product)}
                        className="w-full bg-ekogumus-green hover:bg-ekogumus-green-light text-white transition-all duration-300 group-hover:shadow-lg"
                        size="sm" // Размер "sm" идеален для мобильных карточек
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {productCardsData.buyButton}
                      </Button>
                    </div>
                  </div>

                  {/* Hover эффект карточки - не активен на touch-устройствах */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ekogumus-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-glass-green rounded-2xl p-6 sm:p-8">
            {/* Использование flex-wrap отлично адаптирует этот блок */}
            <div className="flex items-center justify-center gap-4 flex-wrap"> 
              <div className="flex items-center gap-2 text-ekogumus-green text-sm sm:text-base">
                <Package className="w-5 h-5" />
                <span className="font-medium">{productCardsData.features.organicProduct}</span>
              </div>
              <div className="w-2 h-2 bg-ekogumus-green rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-2 text-ekogumus-green text-sm sm:text-base">
                <Scale className="w-5 h-5" />
                <span className="font-medium">{productCardsData.features.certified}</span>
              </div>
              <div className="w-2 h-2 bg-ekogumus-green rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-2 text-ekogumus-green text-sm sm:text-base">
                <ExternalLink className="w-5 h-5" />
                <span className="font-medium">{productCardsData.features.delivery}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Purchase Modal */}
      {selectedProduct && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
    </SectionContainer>
  );
}

function LiqPresentationSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleOpenPresentation = () => {
    navigate("/LiqPresentation");
  };

  return (
    <SectionContainer className="py-12">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-ekogumus-green dark:text-ekogumus-green-light">
            {t.products.LiqPresentation.title}
          </h2>
          <p className="font-opensans text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.products.LiqPresentation.subtitle}
          </p>
        </div>

        <Button
          onClick={handleOpenPresentation}
          size="lg"
          className="bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light hover:from-ekogumus-green-light hover:to-ekogumus-green text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <Images className="w-5 h-5 mr-2" />
          {t.products.LiqPresentation.openPresentation}
        </Button>
      </div>
    </SectionContainer>
  );
}

//Section for Biogumus Info + Composition Table
function BiohumusInfoSection() {
  const { t } = useLanguage();

  return (
    <SectionContainer compact={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <Card className="bg-glass-card h-full">
          <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 text-gray-700">
            <h3 className="text-xl font-bold text-green-800">
              {(t.products.biohumusInfo.title)}
            </h3>
            <p className="text-sm">{(t.products.biohumusInfo.description1)}</p>
            <p className="text-sm">{(t.products.biohumusInfo.description2)}</p>

            <div className="space-y-2">
              <p className="font-semibold text-green-800 text-sm">
                {(t.products.biohumusInfo.characteristicsTitle)}
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 pl-4">
                <li>{(t.products.biohumusInfo.characteristics.type)}</li>
                <li>{(t.products.biohumusInfo.characteristics.composition)}</li>
                <li>{(t.products.biohumusInfo.characteristics.usage)}</li>
                <li>{(t.products.biohumusInfo.characteristics.form)}</li>
                <li>{(t.products.biohumusInfo.characteristics.package)}</li>
                <li>{(t.products.biohumusInfo.characteristics.storage)}</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-green-800 text-sm">
                {(t.products.biohumusInfo.advantagesTitle)}
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 pl-4">
                <li>{(t.products.biohumusInfo.advantages.fertility)}</li>
                <li>{(t.products.biohumusInfo.advantages.structure)}</li>
                <li>{(t.products.biohumusInfo.advantages.microorganisms)}</li>
                <li>{(t.products.biohumusInfo.advantages.ecoSafe)}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <CompositionTable />
      </div>
    </SectionContainer>
  );
}


function ProductionProcessSection() {
  const { t } = useLanguage();

  return (
    <SectionContainer compact={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/*
          КОЛОНКА 1: ТЕКСТОВЫЙ КОНТЕНТ (Процесс производства)
        */}
        <Card className="bg-glass-card h-full">
          <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 text-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-green-900">
              {(t.products.productionProcess.title)}
            </h3>

            <p className="text-sm">{(t.products.productionProcess.steps.preparation)}</p>
            <p className="text-sm">{(t.products.productionProcess.steps.suspension)}</p>
            <p className="text-sm">{(t.products.productionProcess.steps.processing)}</p>

            <ul className="list-disc list-inside text-sm space-y-1 pl-4">
              <li>{(t.products.productionProcess.steps.processingList.cavitation)}</li>
              <li>{(t.products.productionProcess.steps.processingList.nano)}</li>
              <li>{(t.products.productionProcess.steps.processingList.homogenization)}</li>
            </ul>

            <p className="text-sm">{(t.products.productionProcess.steps.duration)}</p>
            <p className="text-sm">{(t.products.productionProcess.steps.flexibility)}</p>

            <ul className="list-disc list-inside text-sm space-y-1 pl-4">
              <li>{(t.products.productionProcess.steps.flexibilityList.npk)}</li>
              <li>{(t.products.productionProcess.steps.flexibilityList.micro)}</li>
              <li>{(t.products.productionProcess.steps.flexibilityList.additives)}</li>
            </ul>

            <p className="text-sm">{(t.products.productionProcess.steps.packaging)}</p>
            <p className="text-sm">{(t.products.productionProcess.steps.finalProduct)}</p>

            <p className="text-sm font-semibold text-green-800">
              {(t.products.productionProcess.advantagesTitle)}
            </p>
            <p className="text-sm">{(t.products.productionProcess.advantagesDescription)}</p>
          </CardContent>
        </Card>

        {/*
          КОЛОНКА 2: ТАБЛИЦА + ИЗОБРАЖЕНИЕ
          Обернуты во flex-col для вертикального размещения.
        */}
        <div className="flex flex-col space-y-8">
            {/* 1. Таблица BasicBatchTable */}
            <BasicBatchTable />

            {/* 2. ИЗОБРАЖЕНИЕ A4 (Добавлено под таблицей) */}
            <div className="w-full flex justify-center">
    {/*
      1. Ссылка (<a>) для открытия в полном размере.
      2. w-full (на мобильных) и lg:w-1/2 (на десктопе) для уменьшения на 50%.
    */}
    <a 
        href="/images/originals/IMG_4102.jpg" 
        target="_blank" 
        rel="noopener noreferrer"
        // На мобильных - 100%, на десктопе (lg) - 50% ширины колонки
        className="w-full lg:w-1/2 cursor-pointer block group" 
    >
        <img
            // Убедитесь, что этот путь верен для вашего проекта
            src="/images/originals/IMG_4102.jpg"
            alt="Схема процесса производства или спецификация"
            // w-full обеспечивает 100% от ширины родительской ссылки (которая 50% или 100%)
            // Добавлен эффект масштабирования при наведении (hover:scale)
            className="w-full h-auto object-contain rounded-xl shadow-lg border border-gray-100 transition-transform duration-300 group-hover:scale-[1.02]"
        />
    </a>
</div>
        </div>
      </div>
    </SectionContainer>
  );
}

//Таблица с составом NANOECOVERM
function BasicBatchTable() {
  const { t } = useLanguage();

  const basicComposition = [
    { component: (t.products.nanoecovermComposition.table.items.water), value: (t.products.nanoecovermComposition.table.unit.one) },
    { component: (t.products.nanoecovermComposition.table.items.biohumus), value: (t.products.nanoecovermComposition.table.unit.two) },
    { component: (t.products.nanoecovermComposition.table.items.ammoniumNitrate), value: (t.products.nanoecovermComposition.table.unit.three) },
    { component: (t.products.nanoecovermComposition.table.items.ammophos), value: (t.products.nanoecovermComposition.table.unit.four) },
    { component: (t.products.nanoecovermComposition.table.items.potassiumSulfate), value: (t.products.nanoecovermComposition.table.unit.five) },
    { component: (t.products.nanoecovermComposition.table.items.microelements), value: (t.products.nanoecovermComposition.table.unit.six) },
    { component: (t.products.nanoecovermComposition.table.items.aminoAcids), value: (t.products.nanoecovermComposition.table.unit.seven) },
    { component: (t.products.nanoecovermComposition.table.items.copperSulfate), value: (t.products.nanoecovermComposition.table.unit.eight) },
    { component: (t.products.nanoecovermComposition.table.items.gibberellin), value:(t.products.nanoecovermComposition.table.unit.nine) },
  ];

  return (
    <Card className="flex-1 bg-glass-card">
      <CardHeader className="text-center px-3 sm:px-4 lg:px-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-900 mb-2">
          {(t.products.nanoecovermComposition.title)}
        </CardTitle>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {(t.products.nanoecovermComposition.description)}
        </p>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 lg:px-6">
        <div className="relative">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-green-200">
                <TableHead className="text-left text-xs sm:text-sm lg:text-base text-gray-900 py-2 px-2 sm:px-3">
                  {(t.products.nanoecovermComposition.table.component)}
                </TableHead>
                <TableHead className="text-right text-xs sm:text-sm lg:text-base text-gray-900 py-2 px-2 sm:px-3">
                  {(t.products.nanoecovermComposition.table.amount)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {basicComposition.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-green-50 transition-colors duration-200 border-b border-gray-200"
                >
                  <TableCell className="py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm text-gray-800">
                    {item.component}
                  </TableCell>
                  <TableCell className="py-1.5 sm:py-2 px-2 sm:px-3 text-right text-xs sm:text-sm text-green-700">
                    {item.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

//Таблица с составом BIOGUMUS
function CompositionTable() {
  const { t } = useLanguage();

  const composition = [
    {
      component: (t.products.compositionData.items.organicMatter),
      value: (t.products.compositionData.values.organicMatter),
    },
    {
      component: (t.products.compositionData.items.moisture),
      value: (t.products.compositionData.values.moisture)
    },
    {
      component: (t.products.compositionData.items.ash),
      value: (t.products.compositionData.values.ash)
    },
    {
      component: (t.products.compositionData.items.organicSubstances),
      value: (t.products.compositionData.values.organicSubstances)
    },
    {
      component: (t.products.compositionData.items.humus),
      value: (t.products.compositionData.values.humus)
    },
    {
      component: (t.products.compositionData.items.ph),
      value: (t.products.compositionData.values.ph)
    },
    {
      component: (t.products.compositionData.items.friability),
      value: (t.products.compositionData.values.friability)
    },
    {
      component: (t.products.compositionData.items.nitrogen),
      value: (t.products.compositionData.values.nitrogen)
    },
    {
      component: (t.products.compositionData.items.phosphorus),
      value: (t.products.compositionData.values.phosphorus),
    },
    {
      component: (t.products.compositionData.items.potassium),
      value: (t.products.compositionData.values.potassium),
    },
    {
      component: (t.products.compositionData.items.dryResidue),
      value: (t.products.compositionData.values.dryResidue),
    },
    {
      component: (t.products.compositionData.items.calcium),
      value: (t.products.compositionData.values.calcium)
    },
    {
      component: (t.products.compositionData.items.magnesium),
      value: (t.products.compositionData.values.magnesium)
    },
    {
      component: (t.products.compositionData.items.iron),
      value: (t.products.compositionData.values.iron)
    },
    {
      component: (t.products.compositionData.items.manganese),
      value: (t.products.compositionData.values.manganese)
    },
    {
      component: (t.products.compositionData.items.heavyMetals),
      value: (t.products.compositionData.values.heavyMetals),
    },
    {
      component: (t.products.compositionData.items.pathogenicMicroflora),
      value: (t.products.compositionData.values.pathogenicMicroflora),
    },
    {
      component: (t.products.compositionData.items.helminthEggs),
      value: (t.products.compositionData.values.helminthEggs)
    },
  ];

  return (
    <Card className="flex-1 bg-glass-card">
      <CardHeader className="text-center px-3 sm:px-4 lg:px-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-900 mb-2">
          {(t.products.composition.title)}
        </CardTitle>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {(t.products.composition.description)}
        </p>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 lg:px-6">
        <div className="relative">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-green-400">
                <TableHead className="text-left text-xs sm:text-sm lg:text-base text-gray-900 py-2 px-2 sm:px-3">
                  {(t.products.composition.indicator)}
                </TableHead>
                <TableHead className="text-right text-xs sm:text-sm lg:text-base text-gray-900 py-2 px-2 sm:px-3">
                  {(t.products.composition.value)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {composition.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-green-50 transition-colors duration-200 border-b border-gray-200"
                >
                  <TableCell className="py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm text-gray-800">
                    {item.component}
                  </TableCell>
                  <TableCell className="py-1.5 sm:py-2 px-2 sm:px-3 text-right text-xs sm:text-sm text-green-700">
                    {item.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

//СЕКЦИЯ С ВИДЕО
function YouTubeVideoSection() {
  // const { t } = useLanguage(); // Раскомментируйте, когда добавите переводы

  // Замените на ID ваших видео и ссылку на ваш канал
  const videoId1 = "AE9L71IuN7A"; // ID первого видео
  const videoId2 = "eydxM_NjnLQ"; // Замените на ID вашего второго видео (например, Rick Astley - Never Gonna Give You Up)
  const channelUrl = "https://www.youtube.com/@biogumusfargonaekogumus8419"; // Например: "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw"

  return (
    <SectionContainer compact={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-ekogumus-green mb-4 sm:mb-6">
            {/* Используйте t.products.youtubeSection.title для переводов */}
            Процесс производства нашего удобрения BIOGUMUS И NANOECOVERM
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ekogumus-green to-ekogumus-green-light mx-auto"></div>
        </motion.div>

        {/* Контейнер для двух видео */}
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mb-8">
          {/* Первое видео */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId1}`}
                title="YouTube video player 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Второе видео */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId2}`}
                title="YouTube video player 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Кнопка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a href={channelUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Youtube className="w-5 h-5 mr-2" />
              {/* Используйте t.products.youtubeSection.button для переводов */}
              Наш YouTube канал
            </Button>
          </a>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

export default YouTubeVideoSection;