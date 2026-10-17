import type { Locale } from 'antd/es/locale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import type { Locale as AppLocale } from './localeStorage';

import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';

export interface LocaleBundle {
  antdLocale: Locale;
  dayjsLocale: string;
}

const LOCALE_BUNDLES: Record<AppLocale, LocaleBundle> = {
  zh: { antdLocale: zhCN, dayjsLocale: 'zh-cn' },
  en: { antdLocale: enUS, dayjsLocale: 'en' },
  vi: { antdLocale: viVN, dayjsLocale: 'vi' },
};

export const getLocaleBundle = (locale: AppLocale): LocaleBundle => {
  return LOCALE_BUNDLES[locale] ?? LOCALE_BUNDLES.zh;
};
