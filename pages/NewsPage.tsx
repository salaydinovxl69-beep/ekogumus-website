import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const getNewsImage = (imageKey: string): string => {
  const imageMap: Record<string, string> = {
    'factory production line': 'images/originals/news_content_5.webp',
    'international shipping fertilizers': 'images/originals/news_card_img_1.webp',
    'certificate quality standards': 'images/originals/news_card_img_2.webp',
    'cotton field fertilizer': 'images/originals/news_4.webp',
  };

  return imageMap[imageKey] || 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
};

export function NewsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockNews = (t.news.mockNews) as NewsItem[];
  const categories = (t.news.categories) as Record<string, string>;

  const filteredNews = selectedCategory === 'all'
    ? mockNews
    : mockNews.filter(item => item.category === selectedCategory);
  filteredNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  const handleNewsClick = (newsItem: NewsItem) => {
    navigate(`/news/${newsItem.id}`);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4">{(t.news.title)}</h1>
          <p className="text-gray-600 max-w-3xl mx-auto font-opensans">
            {(t.news.subtitle)}
          </p>
        </motion.div>

        {/* Фильтры категорий */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {Object.entries(categories).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              onClick={() => setSelectedCategory(key)}
              className={`
                cursor-pointer
                ${selectedCategory === key
                  ? 'bg-ekogumus-green hover:bg-ekogumus-green/90'
                  : 'border-ekogumus-green text-ekogumus-green hover:bg-ekogumus-green/50'
                }
              `}
            >
              <Tag className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </motion.div>

        {/* Сетка новостей */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleNewsClick(item)}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={getNewsImage(item.image)}
                    alt={item.title}
                    className="w-full h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-ekogumus-green">
                      {categories[item.category as keyof typeof categories]}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>

                  <h3 className="font-montserrat font-semibold text-ekogumus-green mb-3 group-hover:text-ekogumus-green-light transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 font-opensans line-clamp-3 mb-4">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center text-ekogumus-green font-medium">
                    {(t.news.readMore)}
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 font-opensans">{(t.news.noNews)}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}