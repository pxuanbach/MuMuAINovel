"""小说内容语言控制。

为每个项目提供"内容语言"指令，追加到生成时的 system prompt，
使 AI 用指定语言输出正文，同时保留中国网络文学的写作风格，
并对专有名词（人名/地名/门派/功法/境界/称号）按汉越音（vi）或拼音（en）转写。

zh 为默认语言，不追加任何指令，保持原有行为不变。
"""
from __future__ import annotations

from typing import Optional

SUPPORTED_LANGUAGES = ("zh", "en", "vi")
DEFAULT_LANGUAGE = "zh"

# 目标语言在指令中的名称
_LANGUAGE_LABELS = {
    "en": "English（英文）",
    "vi": "Vietnamese / Tiếng Việt（越南语）",
}

# 专有名词转写规则说明
_TRANSLITERATION_RULES = {
    "vi": (
        "人名、地名、门派、组织、功法、法宝、境界、职位称号等专有名词，"
        "一律保留中文原名并采用汉越音（Hán-Việt）转写，"
        "例如 李天 → Lý Thiên，金丹 → Kim Đan，剑气 → Kiếm Khí；"
        "不要改成西式译名（如不要把 李天 写成 Leo）。"
    ),
    "en": (
        "人名、地名、门派、组织、功法、法宝、境界、职位称号等专有名词，"
        "一律保留中文原名并采用汉语拼音（pinyin）转写，"
        "例如 李天 → Li Tian，金丹 → Jindan，剑气 → Jianqi；"
        "不要改成西式译名（如不要把 李天 写成 Leo）。"
    ),
}

# 术语表（术语 → 目标语言译法），用于保证一致性
_GLOSSARIES = {
    "vi": {
        "genres": {
            "玄幻": "Huyền huyễn",
            "都市": "Đô thị",
            "历史": "Lịch sử",
            "科幻": "Khoa huyễn",
            "武侠": "Võ hiệp",
            "仙侠": "Tiên hiệp",
            "奇幻": "Kỳ huyễn",
            "悬疑": "Huyền nghi",
            "言情": "Ngôn tình",
            "修仙": "Tu tiên",
        },
        "realms": {
            "炼气": "Luyện Khí",
            "筑基": "Trúc Cơ",
            "金丹": "Kim Đan",
            "元婴": "Nguyên Anh",
            "化神": "Hóa Thần",
            "炼虚": "Luyện Hư",
            "合体": "Hợp Thể",
            "大乘": "Đại Thừa",
            "渡劫": "Độ Kiếp",
        },
        "narrative": {
            "第一人称": "Ngôi thứ nhất",
            "第三人称": "Ngôi thứ ba",
            "全知视角": "Toàn tri",
        },
    },
    "en": {
        "genres": {
            "玄幻": "Eastern Fantasy",
            "都市": "Urban",
            "历史": "Historical",
            "科幻": "Sci-Fi",
            "武侠": "Wuxia / Martial Arts",
            "仙侠": "Xianxia / Immortal Heroes",
            "奇幻": "Fantasy",
            "悬疑": "Mystery",
            "言情": "Romance",
            "修仙": "Cultivation",
        },
        "realms": {
            "炼气": "Qi Refining",
            "筑基": "Foundation Building",
            "金丹": "Golden Core",
            "元婴": "Nascent Soul",
            "化神": "Spirit Transformation",
            "炼虚": "Void Refining",
            "合体": "Body Integration",
            "大乘": "Great Vehicle",
            "渡劫": "Tribulation",
        },
        "narrative": {
            "第一人称": "First person",
            "第三人称": "Third person",
            "全知视角": "Omniscient",
        },
    },
}


def normalize_language(language: Optional[str]) -> str:
    """把任意输入规范成受支持的语言代码，非法值回退为默认语言。"""
    if language in SUPPORTED_LANGUAGES:
        return language
    return DEFAULT_LANGUAGE


def get_project_language(project) -> str:
    """从项目对象读取内容语言，缺失时回退默认。"""
    if project is None:
        return DEFAULT_LANGUAGE
    return normalize_language(getattr(project, "language", None))


def _format_glossary(language: str) -> str:
    glossary = _GLOSSARIES.get(language)
    if not glossary:
        return ""

    lines = []
    for section, mapping in glossary.items():
        items = ", ".join(f"{zh} → {target}" for zh, target in mapping.items())
        lines.append(f"- {section}: {items}")
    return "\n".join(lines)


def build_language_directive(language: Optional[str]) -> str:
    """构建内容语言指令；zh 或非法值返回空字符串（不追加）。"""
    lang = normalize_language(language)
    if lang == DEFAULT_LANGUAGE:
        return ""

    label = _LANGUAGE_LABELS.get(lang, lang)
    transliteration = _TRANSLITERATION_RULES.get(lang, "")
    glossary = _format_glossary(lang)

    parts = [
        "【🌐 内容语言要求 - 最高优先级】",
        f"1. 请使用 {label} 撰写所有面向读者的正文内容（世界观、角色、组织、职业、大纲、章节正文、剧情分析等）。",
        "2. 保持中国网络文学的写作风格与套路：节奏明快、爽点充足、章节末尾留有钩子、"
        "沿用修炼/升级体系用语与古风措辞，不要采用西方本土的叙事习惯。",
    ]
    if transliteration:
        parts.append(f"3. {transliteration}")
    parts.append(
        "4. 只翻译/生成面向读者的正文内容；JSON 的键名、字段名、枚举值、状态值、"
        "代码标识符等必须保持系统要求的形式，不要翻译或改动，以免破坏结构化解析。"
    )
    if glossary:
        parts.append("术语统一（务必遵循）：\n" + glossary)

    return "\n".join(parts)


def apply_language_directive(system_prompt: Optional[str], language: Optional[str]) -> Optional[str]:
    """把内容语言指令追加到 system prompt 末尾。zh 时原样返回。"""
    directive = build_language_directive(language)
    if not directive:
        return system_prompt
    if system_prompt:
        return f"{system_prompt}\n\n{directive}"
    return directive
