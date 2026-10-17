import { Button, Dropdown, Tooltip } from 'antd';
import { GlobalOutlined, CheckOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';
import { SUPPORTED_LOCALES, type Locale } from '../i18n/localeStorage';
import type { MenuProps } from 'antd';

interface LanguageSwitcherProps {
  size?: 'small' | 'middle' | 'large';
  iconOnly?: boolean;
  block?: boolean;
}

export default function LanguageSwitcher({ size = 'middle', iconOnly = false, block = false }: LanguageSwitcherProps) {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  const items: MenuProps['items'] = SUPPORTED_LOCALES.map((value) => ({
    key: value,
    label: t(`language.${value}`),
    icon: value === locale ? <CheckOutlined /> : <span style={{ display: 'inline-block', width: 14 }} />,
    onClick: () => setLocale(value as Locale),
  }));

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
      <Tooltip title={iconOnly ? t('language.label') : undefined}>
        <Button
          type="text"
          size={size}
          icon={<GlobalOutlined />}
          aria-label={t('language.label')}
          style={block ? { width: '100%', justifyContent: 'flex-start', padding: '0 12px' } : undefined}
        >
          {iconOnly ? null : t(`language.${locale}`)}
        </Button>
      </Tooltip>
    </Dropdown>
  );
}
