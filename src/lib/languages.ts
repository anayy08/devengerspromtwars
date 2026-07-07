import type { UILanguage } from '../types';

export interface LanguageMeta {
  code: UILanguage;
  /** Name in the language itself, shown in the picker and draft tabs */
  nativeName: string;
  /** English name, used when instructing the AI model */
  englishName: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali' },
  { code: 'pa', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi' },
];

const BY_CODE = new Map(LANGUAGES.map((l) => [l.code, l]));

export function languageMeta(code: UILanguage): LanguageMeta {
  return BY_CODE.get(code) ?? LANGUAGES[0];
}

export function isUILanguage(value: unknown): value is UILanguage {
  return typeof value === 'string' && BY_CODE.has(value as UILanguage);
}

/**
 * The regional language drafts are generated in for a given UI language.
 * English UI still gets a Hindi regional draft (the most widely useful
 * default for Indian administrative filings); every other UI language gets
 * drafts in that same language.
 */
export function regionalFor(uiLang: UILanguage): Exclude<UILanguage, 'en'> {
  return uiLang === 'en' ? 'hi' : uiLang;
}

/**
 * Pick the display text for a bilingual field: the regional variant when the
 * current UI language matches the language the issue was generated in,
 * otherwise the English variant (a Tamil user shouldn't be shown Hindi
 * metadata from a complaint drafted under a Hindi UI).
 */
export function localized(
  english: string,
  regional: string,
  issueLang: UILanguage,
  uiLang: UILanguage,
): string {
  if (uiLang !== 'en' && regionalFor(uiLang) === issueLang && regional) return regional;
  return english || regional;
}
