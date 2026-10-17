export type Locale = 'zh' | 'en' | 'vi';

const LOCALE_STORAGE_KEY = 'mumu_language';

export const SUPPORTED_LOCALES: Locale[] = ['zh', 'en', 'vi'];

export const DEFAULT_LOCALE: Locale = 'zh';

const isLocale = (value: string | null): value is Locale => {
  return value === 'zh' || value === 'en' || value === 'vi';
};

export const normalizeLocale = (value: string | null | undefined): Locale => {
  if (!value) {
    return DEFAULT_LOCALE;
  }

  const lower = value.toLowerCase();

  if (lower.startsWith('zh')) {
    return 'zh';
  }

  if (lower.startsWith('en')) {
    return 'en';
  }

  if (lower.startsWith('vi')) {
    return 'vi';
  }

  return DEFAULT_LOCALE;
};

export const getStoredLocale = (): Locale => {
  try {
    const value = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(value)) {
      return value;
    }
  } catch (error) {
    console.warn('读取语言设置失败:', error);
  }

  return DEFAULT_LOCALE;
};

export const setStoredLocale = (locale: Locale): void => {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch (error) {
    console.warn('保存语言设置失败:', error);
  }
};

export const toHtmlLang = (locale: Locale): string => {
  if (locale === 'zh') {
    return 'zh-CN';
  }
  return locale;
};

export const getLocaleStorageKey = (): string => LOCALE_STORAGE_KEY;
