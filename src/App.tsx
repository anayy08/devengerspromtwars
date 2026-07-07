import { useState, useEffect } from 'react';
import { FileText, ClipboardList, BarChart3 } from 'lucide-react';
import IntakeForm from './components/IntakeForm';
import TrackerList from './components/TrackerList';
import Dashboard from './components/Dashboard';
import { strings } from './strings';
import { seedIfNeeded } from './lib/storage';
import type { AppTab, UILanguage } from './types';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('file');
  const [lang, setLang] = useState<UILanguage>('en');
  const t = strings[lang];

  useEffect(() => {
    seedIfNeeded();
  }, []);

  return (
    <>
      <header className="app-header">
        <div>
          <h1 className="app-title">{t.appName}</h1>
          <p className="app-tagline">{t.tagline}</p>
        </div>
        <div className="header-actions">
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'हिं' : 'EN'}
          </button>
        </div>
      </header>

      <nav className="tab-nav">
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
        {activeTab === 'file' && <IntakeForm lang={lang} />}
        {activeTab === 'tracker' && <TrackerList lang={lang} />}
        {activeTab === 'dashboard' && <Dashboard lang={lang} />}
      </main>
    </>
  );
}

export default App;
