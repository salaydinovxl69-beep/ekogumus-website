import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { SectionContainer } from "../components/SectionContainer";
import { ArrowLeft, Calendar, Facebook, Twitter, MessageCircle } from "lucide-react";


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
    'factory production line': '../images/originals/news_content_5.webp',
    'international shipping fertilizers': '../images/originals/news_card_img_1.webp',
    'certificate quality standards': '../images/originals/news_card_img_2.webp',
    'cotton field fertilizer': '../images/originals/news_4.webp',
  };

  return imageMap[imageKey] || 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
};

export function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const mockNews = (t.news.mockNews) as NewsItem[];
  const categories = (t.news.categories) as Record<string, string>;

  const news = mockNews.find(item => item.id.toString() === id);

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SectionContainer>
          <div className="text-center">
            <h2 className="text-2xl mb-4">Новость не найдена</h2>
            <Button onClick={() => navigate('/news')}>
              {(t.news.backToNews)}
            </Button>
          </div>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      <SectionContainer>
        {/* Кнопка назад */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/news')}
            className="cursor-pointer hover:bg-ekogumus-green/50 border-ekogumus-green text-ekogumus-green"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {(t.news.backToNews)}
          </Button>
        </motion.div>

        <article className="space-y-8">
          {/* Заголовок статьи */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-ekogumus-green text-white">
                {categories[news.category as keyof typeof categories]}
              </Badge>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{news.date}</span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl mb-6 font-montserrat text-ekogumus-green leading-tight">
              {news.title}
            </h1>
          </motion.header>

          {/* Изображение статьи */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={getNewsImage(news.image)}
              alt={news.title}
              className="w-full h-64 lg:h-96 object-contain rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Содержание статьи */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-glass-card p-8 rounded-2xl"
          >
            <div className="prose prose-lg max-w-none font-opensans">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                {news.excerpt}
              </p>
            </div>
          </motion.div>

        </article>
      </SectionContainer>

      {/* Рекомендуемые новости */}
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-montserrat text-ekogumus-green mb-6 text-center">
            {t.news.more}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {mockNews
              .filter(item => item.id !== news.id)
              .slice(0, 3)
              .map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="bg-glass-card p-4 rounded-xl cursor-pointer"
                  onClick={() => navigate(`/news/${item.id}`)}
                >
                  <img
                    src={getNewsImage(item.image)}
                    alt={item.title}
                    className="w-full object-contain bg-gray-100"
                  />
                  <Badge variant="secondary" className="bg-ekogumus-green/10 text-ekogumus-green mb-2">
                    {categories[item.category as keyof typeof categories]}
                  </Badge>
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600">{item.date}</p>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </SectionContainer>
    </div>
  );
}