import { useEffect, useState } from 'react';
import { Settings as SettingsIcon, Sun, Moon } from 'lucide-react';

export default function Settings() {
  const [isDark, setIsDark] = useState(() => {
    return !document.body.classList.contains('light-theme');
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1 className="gradient-text">Settings</h1>
        <p className="text-muted">Manage your application preferences.</p>
      </header>

      <section className="card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <SettingsIcon color="rgb(var(--primary-rgb))" size={24} />
          <h3 style={{ fontSize: '1.25rem' }}>Appearance</h3>
        </div>

        <div className="settings-row">
          <div>
            <div style={{ fontWeight: 600 }}>Theme Mode</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Toggle between dark and light themes</div>
          </div>
          
          <button 
            onClick={() => setIsDark(!isDark)}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem' }}
          >
            {isDark ? (
              <><Sun size={18} /> Light Mode</>
            ) : (
              <><Moon size={18} /> Dark Mode</>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
