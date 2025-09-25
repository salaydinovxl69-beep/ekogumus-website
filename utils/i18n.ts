export type Language = 'ru' | 'uz' | 'en';

export const defaultLanguage: Language = 'ru';

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'uz', name: 'Uzbek', nativeName: 'O\'zbekcha' },
  { code: 'en', name: 'English', nativeName: 'English' },
];

export const getLanguageDisplayName = (code: Language): string => {
  const language = languages.find(lang => lang.code === code);
  return language?.nativeName || code;
};