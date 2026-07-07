import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { strings, type UIStrings } from '../strings';
import { isUILanguage } from '../lib/languages';
import type { UILanguage } from '../types';

const LANG_KEY = 'nagriksetu-lang';

interface LanguageContextValue {
  lang: UILanguage;
  setLang: (lang: UILanguage) => void;
  /** Translated UI strings for the active language */
  t: UIStrings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<UILanguage>(() => {
    const stored = localStorage.getItem(LANG_KEY);
    return isUILanguage(stored) ? stored : 'en';
  });
  const t = strings[lang];

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.title = `${t.appName} — ${t.tagline}`;
  }, [lang, t]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
