import { toast } from 'sonner';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Send, Users, Truck, Handshake, Globe, Award, TrendingUp, HeadphonesIcon, DollarSign, Clock, Target, CheckCircle, Phone, Mail, MessageCircle, AlertCircle } from 'lucide-react';
import { SectionContainer } from '../components/SectionContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';

// Простая типизация ошибок
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// Вынесённый компонент поля — использует нативные элементы для стабильности
const FormField = React.memo(({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  as = 'input',
  rows,
  value,
  onChange,
  onBlur,
  error,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}) => {
  const isError = Boolean(error);

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="flex items-center gap-1 font-medium">
        {label}
        {required && <span className="text-ekogumus-red">*</span>}
      </label>

      {as === 'input' ? (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className={`
            w-full px-4 py-3 rounded-lg bg-white border-2 transition-all duration-200
            ${isError ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-ekogumus-green'}
            focus:outline-none
          `}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-lg bg-white border-2 transition-all duration-200 resize-none
            ${isError ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-ekogumus-green'}
            focus:outline-none
          `}
        />
      )}

      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 text-red-600 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
});
FormField.displayName = 'FormField';


export function CooperationPage() {
  // перевод (ваш useLanguage)
  const { t } = (useLanguage as any) ? useLanguage() : { t: ({} as any) };
  const cooperation = (t && (t.cooperation)) || (window as any).__COOPERATION_TRANSLATIONS__ || {
    // fallback minimal structure, если переводов нет — замените на реальные тексты
    hero: { badge: 'Партнёры', subtitle: 'Подзаголовок', stats: { years: 'Лет', partners: 'Партнёров', countries: 'Стран' } },
    title: 'Сотрудничество',
    conditions: { title: 'Виды сотрудничества', subtitle: '', wholesale: { title: 'Опт', items: ['Условие 1'] }, dealer: { title: 'Дилерам', items: ['Условие 2'] }, export: { title: 'Экспорт', items: ['Условие 3'] } },
    advantages: { title: 'Преимущества', subtitle: '', quality: { title: 'Качество', description: '' }, supply: { title: 'Поставка', description: '' }, support: { title: 'Поддержка', description: '' }, prices: { title: 'Цены', description: '' }, delivery: { title: 'Доставка', description: '' }, approach: { title: 'Подход', description: '' } },
    process: { title: 'Процесс', subtitle: '', step1: { title: 'Шаг 1', description: '' }, step2: { title: 'Шаг 2', description: '' }, step3: { title: 'Шаг 3', description: '' }, step4: { title: 'Шаг 4', description: '' } },
    form: {
      title: 'Связаться',
      subtitle: '',
      fields: {
        name: { label: 'Имя', placeholder: 'Ваше имя', required: true, minLength: 'Минимум 2 символа', invalid: 'Неверное имя', requiredText: 'Обязательное поле' },
        company: { label: 'Компания', placeholder: 'Название компании' },
        email: { label: 'Email', placeholder: 'example@mail.com', required: true, invalid: 'Неверный email', requiredText: 'Обязательное поле' },
        phone: { label: 'Телефон', placeholder: '+998...', required: true, invalid: 'Неверный телефон', requiredText: 'Обязательное поле' },
        message: { label: 'Сообщение', placeholder: 'Расскажите о запросе', required: true, minLength: 'Минимум 10 символов', invalid: 'Неверное сообщение' }
      },
      submit: { idle: 'Отправить', submitting: 'Отправка...', success: 'Отправлено', successDescription: '', error: 'Ошибка отправки' },
      required: 'Поля, отмеченные * обязательны'
    },
    contact: {
      title: 'Контакты',
      subtitle: '',
      methods: { phone: { title: 'Телефон', value: '+998...' }, email: { title: 'Email', value: 'mail@domain' }, telegram: { title: 'Telegram', value: '@username' } },
      workingHours: { title: 'Время работы', weekdays: 'Пн-Пт', saturday: 'Сб', sunday: 'Вс' }
    }
  };

  const heroRef = useRef<HTMLDivElement | null>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    cooperationType: 'wholesale',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Валидация поля
  const validateField = useCallback((name: string, value: string): string | undefined => {
    const fields = (cooperation.form && cooperation.form.fields) || {};
    const fieldTranslations = (fields as any)[name] || {};
    if (name === 'name') {
      if (!value.trim()) return fieldTranslations.requiredText || 'Обязательное поле';
      if (value.trim().length < 2) return fieldTranslations.minLength || 'Минимум 2 символа';
    }
    if (name === 'email') {
      if (!value.trim()) return fieldTranslations.requiredText || 'Обязательное поле';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return fieldTranslations.invalid || 'Неверный email';
    }
    if (name === 'phone') {
      if (!value.trim()) return fieldTranslations.requiredText || 'Обязательное поле';
      // простой проверочный регекс (можно заменить на локальный)
      const digits = value.replace(/\D/g, '');
      if (digits.length < 9) return fieldTranslations.invalid || 'Неверный телефон';
    }
    if (name === 'message') {
      if (!value.trim()) return fieldTranslations.requiredText || 'Обязательное поле';
      if (value.trim().length < 10) return fieldTranslations.minLength || 'Минимум 10 символов';
    }
    return undefined;
  }, [cooperation]);

  const validateForm = useCallback(() => {
    const errors: FormErrors = {};
    ['name', 'email', 'phone', 'message'].forEach(field => {
      const err = validateField(field, (formData as any)[field]);
      if (err) (errors as any)[field] = err;
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validateField]);

  // единый onChange для всех полей (мемоизирован)
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // если уже были "touched", делать валидацию в реальном времени
    if ((touchedFields as any)[name]) {
      const err = validateField(name, value);
      setFormErrors(prev => ({ ...prev, [name]: err }));
    }
  }, [touchedFields, validateField]);

  const handleFieldBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const err = validateField(name, (formData as any)[name]);
    setFormErrors(prev => ({ ...prev, [name]: err }));
  }, [validateField, formData]);

  // submit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedFields({ name: true, email: true, phone: true, message: true });
    if (!validateForm()) {
      toast.error(cooperation.form.submit.error, { description: 'Пожалуйста, исправьте ошибки' });
      return;
    }

    setIsSubmitting(true);
    try {
      // имитация отправки
      await new Promise(res => setTimeout(res, 1200));
      toast.success(cooperation.form.submit.success, { description: cooperation.form.submit.successDescription || '' });
      setFormData({ name: '', company: '', email: '', phone: '', cooperationType: 'wholesale', message: '' });
      setFormErrors({});
      setTouchedFields({});
    } catch (err) {
      toast.error(cooperation.form.submit.error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, cooperation.form]);

  // подготовка данных для отображения (мемо)
  const cooperationTypes = useMemo(() => ([
    { id: 'wholesale', title: cooperation.conditions.wholesale.title, icon: Truck, color: 'bg-blue-500', items: cooperation.conditions.wholesale.items },
    { id: 'dealer', title: cooperation.conditions.dealer.title, icon: Handshake, color: 'bg-green-500', items: cooperation.conditions.dealer.items },
    { id: 'export', title: cooperation.conditions.export.title, icon: Globe, color: 'bg-purple-500', items: cooperation.conditions.export.items },
  ]), [cooperation.conditions]);

  const advantages = useMemo(() => ([
    { title: cooperation.advantages.quality.title, description: cooperation.advantages.quality.description, icon: Award, color: 'text-yellow-600' },
    { title: cooperation.advantages.supply.title, description: cooperation.advantages.supply.description, icon: TrendingUp, color: 'text-blue-600' },
    { title: cooperation.advantages.support.title, description: cooperation.advantages.support.description, icon: HeadphonesIcon, color: 'text-green-600' },
    { title: cooperation.advantages.prices.title, description: cooperation.advantages.prices.description, icon: DollarSign, color: 'text-emerald-600' },
    { title: cooperation.advantages.delivery.title, description: cooperation.advantages.delivery.description, icon: Clock, color: 'text-orange-600' },
    { title: cooperation.advantages.approach.title, description: cooperation.advantages.approach.description, icon: Target, color: 'text-purple-600' },
  ]), [cooperation.advantages]);

  const processSteps = useMemo(() => ([
    { number: 1, title: cooperation.process.step1.title, description: cooperation.process.step1.description, icon: Send },
    { number: 2, title: cooperation.process.step2.title, description: cooperation.process.step2.description, icon: HeadphonesIcon },
    { number: 3, title: cooperation.process.step3.title, description: cooperation.process.step3.description, icon: Handshake },
    { number: 4, title: cooperation.process.step4.title, description: cooperation.process.step4.description, icon: Truck },
  ]), [cooperation.process]);

  return (
    <div className="py-8 space-y-12">
      {/* Hero Section */}
      <SectionContainer>
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isHeroInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-ekogumus-green/10 px-4 py-2 rounded-full"
          >
            <Users className="w-5 h-5 text-ekogumus-green" />
            <span className="text-ekogumus-green font-medium">{cooperation.hero.badge}</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat text-ekogumus-green mb-6">
            {cooperation.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {cooperation.hero.subtitle}
          </p>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="bg-glass-green p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-ekogumus-green mb-2">30+</div>
              <div className="text-gray-600">{cooperation.hero.stats.years}</div>
            </div>
            <div className="bg-glass-green p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-ekogumus-green mb-2">1000+</div>
              <div className="text-gray-600">{cooperation.hero.stats.partners}</div>
            </div>
            <div className="bg-glass-green p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-ekogumus-green mb-2">10+</div>
              <div className="text-gray-600">{cooperation.hero.stats.countries}</div>
            </div>
          </motion.div>
        </motion.div>
      </SectionContainer>

      {/* Types of Cooperation */}
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-montserrat text-ekogumus-green mb-4">
              {cooperation.conditions.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {cooperation.conditions.subtitle}
            </p>
          </div>

          <Tabs defaultValue="wholesale" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {cooperationTypes.map((type) => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="data-[state=active]:bg-ekogumus-green data-[state=active]:text-white"
                >
                  <type.icon className="w-4 h-4 mr-2" />
                  {type.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {cooperationTypes.map((type, index) => (
              <TabsContent key={type.id} value={type.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-glass-card p-8 rounded-2xl"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-montserrat text-ekogumus-green">
                        {type.title}
                      </h3>
                      <p className="text-gray-600">Условия и преимущества</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {type.items.map((item: string, itemIndex: number) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-ekogumus-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </SectionContainer>

      {/* Advantages */}
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-montserrat text-ekogumus-green mb-4">
              {cooperation.advantages.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {cooperation.advantages.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-glass-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <advantage.icon className={`w-6 h-6 ${advantage.color}`} />
                  </div>
                  <h3 className="font-montserrat text-ekogumus-green">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionContainer>

      {/* Process Steps */}
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-montserrat text-ekogumus-green mb-4">
              {cooperation.process.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {cooperation.process.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-glass-card p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <div className="w-16 h-16 bg-ekogumus-green text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 bg-ekogumus-yellow text-ekogumus-brown"
                    >
                      {step.number}
                    </Badge>
                  </div>
                  <h3 className="font-montserrat text-ekogumus-green mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-ekogumus-green to-transparent opacity-30 z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionContainer>

      {/* FORM */}
      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-glass-card p-8 rounded-2xl">
            <div className="mb-6">
              <h3 className="text-2xl font-montserrat text-ekogumus-green mb-2">{cooperation.form.title}</h3>
              <p className="text-gray-600">{cooperation.form.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  name="name"
                  label={cooperation.form.fields.name.label}
                  placeholder={cooperation.form.fields.name.placeholder}
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  error={formErrors.name}
                />
                <FormField
                  name="company"
                  label={cooperation.form.fields.company.label}
                  placeholder={cooperation.form.fields.company.placeholder}
                  value={formData.company}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  name="email"
                  label={cooperation.form.fields.email.label}
                  placeholder={cooperation.form.fields.email.placeholder}
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  error={formErrors.email}
                />
                <FormField
                  name="phone"
                  label={cooperation.form.fields.phone.label}
                  placeholder={cooperation.form.fields.phone.placeholder}
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  error={formErrors.phone}
                />
              </div>

              <FormField
                name="message"
                label={cooperation.form.fields.message.label}
                placeholder={cooperation.form.fields.message.placeholder}
                as="textarea"
                rows={4}
                required
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                error={formErrors.message}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full bg-ekogumus-green hover:bg-ekogumus-green/90 py-6" size="lg">
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{cooperation.form.submit.submitting}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>{cooperation.form.submit.idle}</span>
                  </div>
                )}
              </Button>

              <p className="text-sm text-gray-500 text-center">* {cooperation.form.required}</p>
            </form>
          </div>

          {/* Контакты (сокращённо) */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-montserrat text-ekogumus-green mb-4">{cooperation.contact.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{cooperation.contact.subtitle}</p>
            </div>

            <a href="tel:+998936418545" className="bg-glass-green p-4 rounded-xl flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Phone className="w-6 h-6 text-blue-600" /></div>
              <div><div className="font-medium text-ekogumus-green">{cooperation.contact.methods.phone.title}</div><div className="text-gray-600">{cooperation.contact.methods.phone.value}</div></div>
            </a>

            <a href="mailto:bashfergana@mail.ru" className="bg-glass-green p-4 rounded-xl flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><Mail className="w-6 h-6 text-green-600" /></div>
              <div><div className="font-medium text-ekogumus-green">{cooperation.contact.methods.email.title}</div><div className="text-gray-600">{cooperation.contact.methods.email.value}</div></div>
            </a>

            <a href="https://t.me/BahodirBX" target="_blank" rel="noopener noreferrer" className="bg-glass-green p-4 rounded-xl flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><MessageCircle className="w-6 h-6 text-blue-600" /></div>
              <div><div className="font-medium text-ekogumus-green">{cooperation.contact.methods.telegram.title}</div><div className="text-gray-600">{cooperation.contact.methods.telegram.value}</div></div>
            </a>

            <div className="bg-glass-green p-6 rounded-xl">
              <h4 className="font-montserrat text-ekogumus-green mb-2">{cooperation.contact.workingHours.title}</h4>
              <div className="space-y-1 text-gray-600"><div>{cooperation.contact.workingHours.weekdays}</div><div>{cooperation.contact.workingHours.saturday}</div><div>{cooperation.contact.workingHours.sunday}</div></div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
