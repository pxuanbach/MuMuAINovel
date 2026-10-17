import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCore from './locales/zh';
import enCore from './locales/en';
import viCore from './locales/vi';
import shared from './features/shared';
import wizard from './features/wizard';
import characters from './features/characters';
import outline from './features/outline';
import chapters from './features/chapters';
import worldSetting from './features/worldSetting';
import careers from './features/careers';
import organizations from './features/organizations';
import relationships from './features/relationships';
import knowledgeBase from './features/knowledgeBase';
import foreshadows from './features/foreshadows';
import promptWorkshop from './features/promptWorkshop';
import writingStyles from './features/writingStyles';
import skills from './features/skills';
import sponsor from './features/sponsor';
import agent from './features/agent';
import { getStoredLocale, normalizeLocale, setStoredLocale, toHtmlLang } from './localeStorage';

const FEATURES = [
  shared,
  wizard,
  characters,
  outline,
  chapters,
  worldSetting,
  careers,
  organizations,
  relationships,
  knowledgeBase,
  foreshadows,
  promptWorkshop,
  writingStyles,
  skills,
  sponsor,
  agent,
];

const build = <T extends Record<string, unknown>>(core: T, features: Array<Record<string, unknown>>): T =>
  features.reduce<Record<string, unknown>>((acc, feature) => ({ ...acc, ...feature }), { ...core }) as T;

export const i18nResources = {
  zh: { translation: build(zhCore, FEATURES.map((feature) => feature.zh)) },
  en: { translation: build(enCore, FEATURES.map((feature) => feature.en)) },
  vi: { translation: build(viCore, FEATURES.map((feature) => feature.vi)) },
};

const applyDocumentLang = (locale: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = toHtmlLang(normalizeLocale(locale));
  }
};

void i18n.use(initReactI18next).init({
  resources: i18nResources,
  lng: getStoredLocale(),
  fallbackLng: 'zh',
  supportedLngs: ['zh', 'en', 'vi'],
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  react: {
    useSuspense: false,
  },
});

i18n.on('languageChanged', (locale) => {
  const normalized = normalizeLocale(locale);
  setStoredLocale(normalized);
  applyDocumentLang(normalized);
});

applyDocumentLang(i18n.language);

export default i18n;
