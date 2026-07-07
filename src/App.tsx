import { useState, useEffect } from 'react';
import { FileText, ClipboardList, BarChart3, Languages } from 'lucide-react';
import IntakeForm from './components/IntakeForm';
import TrackerList from './components/TrackerList';
import Dashboard from './components/Dashboard';
import HeroBanner from './components/HeroBanner';
import SideFloral from './components/SideFloral';
import { strings } from './strings';
import { seedIfNeeded } from './lib/storage';
import type { AppTab, UILanguage } from './types';
import './App.css';

const LANG_KEY = 'nagriksetu-lang';

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('file');
  const [lang, setLang] = useState<UILanguage>(() =>
    localStorage.getItem(LANG_KEY) === 'hi' ? 'hi' : 'en'
  );
  const t = strings[lang];

  useEffect(() => {
    seedIfNeeded();
  }, []);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.title = `${t.appName} — ${t.tagline}`;
  }, [lang, t]);

  return (
    <div className="app-shell">
      <SideFloral />
      <header className="app-header">
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 64 64" width="38" height="38" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="var(--navy)" />
            <circle cx="32" cy="18" r="6" fill="var(--saffron)" />
            <path d="M10 46 Q32 24 54 46" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
            <line x1="8" y1="46" x2="56" y2="46" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="38" x2="20" y2="46" stroke="#fff" strokeWidth="3" />
            <line x1="32" y1="35" x2="32" y2="46" stroke="#fff" strokeWidth="3" />
            <line x1="44" y1="38" x2="44" y2="46" stroke="#fff" strokeWidth="3" />
            <line x1="12" y1="54" x2="52" y2="54" stroke="var(--green)" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div>
            <h1 className="app-title">{t.appName}</h1>
            <p className="app-tagline">{t.tagline}</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            aria-label={t.langToggleLabel}
            title={t.langToggleLabel}
          >
            <Languages size={15} />
            {lang === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </header>

      <nav className="tab-nav" aria-label="Main">
        <button
          className={`tab-btn ${activeTab === 'file' ? 'active' : ''}`}
          onClick={() => setActiveTab('file')}
        >
          <FileText size={18} />
          {t.fileTab}
        </button>
        <button
          className={`tab-btn ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          <ClipboardList size={18} />
          {t.trackerTab}
        </button>
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={18} />
          {t.dashboardTab}
        </button>
      </nav>

      <main className={`main-content ${activeTab === 'dashboard' ? 'wide' : ''}`}>
        {activeTab === 'file' && (
          <>
            <HeroBanner lang={lang} />
            <IntakeForm lang={lang} />
          </>
        )}
        {activeTab === 'tracker' && (
          <TrackerList lang={lang} onFileNew={() => setActiveTab('file')} />
        )}
        {activeTab === 'dashboard' && <Dashboard lang={lang} />}
      </main>

      <footer className="app-footer">
        <span aria-hidden="true" className="footer-flag">
          <span className="flag-stripe saffron" />
          <span className="flag-stripe white" />
          <span className="flag-stripe green" />
        </span>
        {t.footerNote}
      </footer>
    </div>
  );
}

export default App;
