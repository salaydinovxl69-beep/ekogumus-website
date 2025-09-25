import { ru, type TranslationKeys } from './ru';
import { uz } from './uz';
import { en } from './en';
import type { Language } from '../i18n';

export const translations: Record<Language, TranslationKeys> = {
  ru,
  uz,
  en,
};

export { ru, uz, en };
export type { TranslationKeys };