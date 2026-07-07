import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { LANGUAGES } from '../lib/languages';
import { useLanguage } from '../context/LanguageContext';

/** Themed dropdown for picking the interface language. */
export default function LanguageMenu() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div className="lang-menu" ref={rootRef}>
      <button
        type="button"
        className="lang-menu-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.langToggleLabel}
        title={t.langToggleLabel}
      >
        <Languages size={15} aria-hidden="true" />
        <span className="lang-menu-current">{current.nativeName}</span>
        <ChevronDown size={14} aria-hidden="true" className={`lang-menu-chevron ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <ul className="lang-menu-list" role="listbox" aria-label={t.langToggleLabel}>
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                className={`lang-menu-item ${l.code === lang ? 'active' : ''}`}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
              >
                <span>{l.nativeName}</span>
                <span className="lang-menu-item-en">{l.englishName}</span>
                {l.code === lang && <Check size={14} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
