import { useTranslation } from 'react-i18next';
import { normalizeLocale, type Locale } from './localeStorage';

export interface UseLocaleResult {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocale = (): UseLocaleResult => {
  const { i18n } = useTranslation();

  const locale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
  const setLocale = (nextLocale: Locale) => {
    void i18n.changeLanguage(nextLocale);
  };

  return { locale, setLocale };
};
