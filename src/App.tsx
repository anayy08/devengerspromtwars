import { useState, useEffect } from 'react';
import { ArrowRight, BarChart3, CheckCircle2, ClipboardList, FileText, Languages, ShieldCheck, Sparkles } from 'lucide-react';
import IntakeForm from './components/IntakeForm';
import TrackerList from './components/TrackerList';
import Dashboard from './components/Dashboard';
import HeroBanner from './components/HeroBanner';
import SideFloral from './components/SideFloral';
import { strings } from './strings';
import { seedIfNeeded } from './lib/storage';
import { LANGUAGES, isUILanguage } from './lib/languages';
import type { AppTab, UILanguage } from './types';
import './App.css';

const LANG_KEY = 'nagriksetu-lang';

type Page = 'home' | 'tools' | 'complaint';
const SHORT_CODES: Record<UILanguage, string> = { en: 'EN', hi: 'हि', ta: 'த', bn: 'বাং', pa: 'ਪੰ' };

function App() {
  const [page, setPage] = useState<Page>('home');
  const [activeTab, setActiveTab] = useState<AppTab>('file');
  const [lang, setLang] = useState<UILanguage>(() => {
    const stored = localStorage.getItem(LANG_KEY);
    return isUILanguage(stored) ? stored : 'en';
  });
  const t = strings[lang];
  const landing = t.landing;
  const selectedLanguage = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

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
          <button className="nav-pill" onClick={() => setPage('home')}>{landing.navHome}</button>
          <button className="nav-pill" onClick={() => setPage('tools')}>{landing.navTools}</button>
          <div className="lang-select-wrapper">
            <span className="lang-select-display" aria-hidden="true">
              <Languages size={15} />
              <span>{selectedLanguage.nativeName}</span>
              <b>{SHORT_CODES[lang]}</b>
            </span>
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value as UILanguage)}
              aria-label={t.langToggleLabel}
              title={t.langToggleLabel}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {page === 'complaint' && (
        <nav className="tab-nav" aria-label="Main">
          <button className={`tab-btn ${activeTab === 'file' ? 'active' : ''}`} onClick={() => setActiveTab('file')}>
            <FileText size={18} />
            {t.fileTab}
          </button>
          <button className={`tab-btn ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>
            <ClipboardList size={18} />
            {t.trackerTab}
          </button>
          <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <BarChart3 size={18} />
            {t.dashboardTab}
          </button>
        </nav>
      )}

      {page === 'home' && (
        <main className="landing-page">
          <section className="landing-hero">
            <div className="landing-copy">
              <span className="landing-badge"><Sparkles size={16} /> {landing.heroBadge}</span>
              <h2>{landing.heroTitle}</h2>
              <p>{landing.heroSubtitle}</p>
              <div className="landing-actions">
                <button className="btn-primary" onClick={() => setPage('complaint')}>
                  {landing.ctaPrimary} <ArrowRight size={17} />
                </button>
                <button className="btn-ghost" onClick={() => setPage('tools')}>{landing.ctaSecondary}</button>
              </div>
            </div>
            <div className="civic-visual" aria-hidden="true">
              <div className="phone-frame">
                <div className="mini-top" />
                <div className="mini-line wide" />
                <div className="mini-line" />
                <div className="mini-card saffron" />
                <div className="mini-card green" />
                <div className="mini-button" />
              </div>
              <div className="gov-building">
                <ShieldCheck size={44} />
                <span>{t.appName}</span>
              </div>
            </div>
          </section>

          <section className="landing-stats">
            {landing.stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </section>

          <section className="landing-section">
            <h2>{landing.howTitle}</h2>
            <p>{landing.howSubtitle}</p>
            <div className="step-grid">
              {landing.howSteps.map((step, i) => (
                <article className="feature-card" key={step.title}>
                  <span>{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="landing-section mission-band">
            <h2>{landing.missionTitle}</h2>
            <div className="mission-grid">
              {landing.missionPoints.map((point) => (
                <div key={point.title}>
                  <CheckCircle2 size={18} />
                  <h3>{point.title}</h3>
                  <p>{point.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {page === 'tools' && (
        <main className="landing-page tools-page">
          <section className="landing-section">
            <h2>{landing.toolsTitle}</h2>
            <p>{landing.toolsSubtitle}</p>
            <div className="tools-grid">
              {landing.tools.map((tool, i) => (
                <article className="tool-card" key={tool.name}>
                  <FileText size={22} />
                  <h3>{i === 0 ? 'Complaint Filer' : tool.name}</h3>
                  <p>{tool.desc}</p>
                  {i === 0 ? (
                    <button className="btn-primary btn-sm" onClick={() => setPage('complaint')}>{landing.openTool}</button>
                  ) : (
                    <span className="coming-soon">{landing.comingSoon}</span>
                  )}
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {page === 'complaint' && (
        <main className={`main-content ${activeTab === 'dashboard' ? 'wide' : ''}`}>
          <button className="btn-ghost btn-sm back-tools" onClick={() => setPage('tools')}>{landing.backToTools}</button>
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
      )}

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
