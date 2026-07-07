import { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Sun, 
  Moon,
  Laptop,
  CheckSquare,
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isStarted: false });
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Environment setup completed (Node.js & Python verified)', checked: true },
    { id: 2, text: 'Vite React + TypeScript boilerplate initialized', checked: true },
    { id: 3, text: 'Global styling & design token system setup (Outfit/Inter)', checked: true },
    { id: 4, text: 'Lucide Icons package installed', checked: true },
    { id: 5, text: 'Confirm hackathon rules & check-in guidelines', checked: false },
    { id: 6, text: 'Setup Antigravity slash commands and keyboard shortcuts', checked: false },
    { id: 7, text: 'Test local dev server compilation', checked: false }
  ]);

  // Hackathon Start Time: 10:30 AM IST (July 7, 2026)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date('2026-07-07T10:30:00+05:30').getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, isStarted: true };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds, isStarted: false };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Theme Toggle Effect
  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
    }
  }, [isDark]);

  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="container hackathon-dashboard">
      {/* Header Panel */}
      <header className="card-glass flex-center animate-fade-in" style={{ justifyContent: 'space-between', padding: '1.5rem 2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles color="rgb(var(--primary-rgb))" size={28} className="animate-glow" />
          <h1 className="gradient-text" style={{ fontSize: '1.75rem', margin: 0 }}>Devengers Prep Deck</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="badge badge-info">First Hackathon</span>
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid-cols-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        
        {/* Left Column: Countdown & Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Countdown Card */}
          <section className="card animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Clock color="rgb(var(--secondary-rgb))" size={20} />
              <h3 style={{ fontSize: '1.15rem' }}>Hackathon Countdown</h3>
            </div>
            
            {timeLeft.isStarted ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div className="gradient-text animate-glow" style={{ fontSize: '2rem', fontWeight: 800 }}>
                  <Flame size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  HACKATHON IS LIVE!
                </div>
                <p style={{ marginTop: '0.5rem' }}>Duration: 10:30 AM - 2:30 PM IST</p>
              </div>
            ) : (
              <div>
                <div className="countdown-container">
                  <div className="countdown-box">
                    <div className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="countdown-label">Hours</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="countdown-label">Minutes</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="countdown-label">Seconds</div>
                  </div>
                </div>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                  Hackathon starts at 10:30 AM IST (10:30 - 14:30)
                </p>
              </div>
            )}
          </section>

          {/* System Environment Status */}
          <section className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Laptop color="rgb(var(--primary-rgb))" size={20} />
              <h3 style={{ fontSize: '1.15rem' }}>Local Environment Status</h3>
            </div>
            <div className="status-grid">
              <div className="status-item">
                <div className="icon-wrapper">
                  <CheckCircle color="rgb(var(--success-rgb))" size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Node.js Runtimes</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>v24.18.0 (Ready)</div>
                </div>
              </div>
              <div className="status-item">
                <div className="icon-wrapper">
                  <CheckCircle color="rgb(var(--success-rgb))" size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Python Interpreter</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>v3.14.6 (Ready)</div>
                </div>
              </div>
              <div className="status-item">
                <div className="icon-wrapper">
                  <CheckCircle color="rgb(var(--success-rgb))" size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Version Control</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Git Client Active</div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Prep Checklist */}
          <section className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <CheckSquare color="rgb(var(--accent-rgb))" size={20} />
              <h3 style={{ fontSize: '1.15rem' }}>Warm-up Checklist</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {checklist.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleCheck(item.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    cursor: 'pointer',
                    opacity: item.checked ? 0.7 : 1,
                    textDecoration: item.checked ? 'line-through' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={item.checked} 
                    onChange={() => {}} // Controlled via parent onClick
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '0.95rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Antigravity Guide */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* How to work with Antigravity */}
          <section className="card-glass">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Award color="rgb(var(--warning-rgb))" size={22} className="animate-glow" />
              <h3 style={{ fontSize: '1.3rem' }}>Antigravity Hackathon Cheatsheet</h3>
            </div>
            
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Antigravity is your full AI pair programmer. Instead of writing all the code manually, 
              <strong> delegate tasks to the agent</strong>. It can execute terminal commands, view/edit files, and browse the web for APIs.
            </p>

            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>1. The Execution Workflow</h4>
            <ul style={{ paddingLeft: '1.2rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Planning Mode:</strong> When you request a large change, Antigravity drafts an <code>implementation_plan.md</code>. Once approved, it completes the task checklist step-by-step.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Inline Edits:</strong> Press <code>Ctrl + I</code> (or <code>Cmd + I</code>) directly inside the file editor to refactor or add functions in-place.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Autocomplete:</strong> Press <code>Tab</code> to accept smart autocomplete, supercomplete diffs, or jumping shortcuts.
              </li>
            </ul>

            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>2. Handy Slash Commands (in Chat Canvas)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div className="command-row">
                <span>/grill-me</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Design interview to align on code specs</span>
              </div>
              <div className="command-row">
                <span>/browser</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Automate testing or retrieve docs</span>
              </div>
              <div className="command-row">
                <span>/goal</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Set thorough, multi-step goals</span>
              </div>
            </div>

            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>3. Project Commands</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div className="command-row">
                <span>npm run dev</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Start local development server</span>
              </div>
              <div className="command-row">
                <span>npm run build</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Verify React compilation & build output</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a 
                href="https://antigravity.google/docs" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '0.9rem', flex: 1 }}
              >
                <BookOpen size={16} /> Live Docs <ExternalLink size={12} />
              </a>
              <button 
                onClick={() => {
                  alert('Nice! Let\'s wait for the problem statement. When it is out, paste it in our chat thread and we will design a perfect implementation plan!');
                }}
                className="btn btn-accent"
                style={{ fontSize: '0.9rem', flex: 1 }}
              >
                <Play size={16} /> Ready to Hack!
              </button>
            </div>

          </section>

        </div>

      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem 0', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Powered by Google Antigravity &bull; Devengers Hackathon Prep 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
