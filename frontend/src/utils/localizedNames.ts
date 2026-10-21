import type { TFunction } from 'i18next';

const STYLE_PRESET_NAME_KEYS: Record<string, string> = {
  natural: 'writingStyles.presetNames.natural',
  classical: 'writingStyles.presetNames.classical',
  modern: 'writingStyles.presetNames.modern',
  literary: 'writingStyles.presetNames.literary',
  suspense: 'writingStyles.presetNames.suspense',
  humorous: 'writingStyles.presetNames.humorous',
};

const SKILL_NAME_KEYS: Record<string, string> = {
  SKILL_STORY_LONG_WRITE: 'skills.names.storyLongWrite',
  SKILL_STORY_SHORT_WRITE: 'skills.names.storyShortWrite',
  SKILL_STORY_LONG_ANALYZE: 'skills.names.storyLongAnalyze',
  SKILL_STORY_SHORT_ANALYZE: 'skills.names.storyShortAnalyze',
  SKILL_STORY_LONG_SCAN: 'skills.names.storyLongScan',
  SKILL_STORY_SHORT_SCAN: 'skills.names.storyShortScan',
  SKILL_STORY_DESLOP: 'skills.names.storyDeslop',
};

const SKILL_CATEGORY_KEYS: Record<string, string> = {
  'Skill·长篇': 'skills.categories.long',
  'Skill·短篇': 'skills.categories.short',
  'Skill·润色': 'skills.categories.polish',
  'Skill·工具': 'skills.categories.tools',
  Skill: 'skills.categories.default',
};

interface StyleLike {
  name: string;
  preset_id?: string | null;
}

interface SkillLike {
  template_key: string;
  template_name: string;
  category: string;
}

export function getStyleDisplayName(style: StyleLike, t: TFunction): string {
  const key = style.preset_id ? STYLE_PRESET_NAME_KEYS[style.preset_id] : undefined;
  return key ? t(key) : style.name;
}

export function getSkillDisplayName(skill: SkillLike, t: TFunction): string {
  const key = SKILL_NAME_KEYS[skill.template_key];
  return key ? t(key) : skill.template_name;
}

export function getSkillCategoryName(category: string, t: TFunction): string {
  const key = SKILL_CATEGORY_KEYS[category];
  return key ? t(key) : category;
}
