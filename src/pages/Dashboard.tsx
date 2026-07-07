import { useState, useEffect } from 'react';
import { Clock, Laptop, CheckCircle, Flame } from 'lucide-react';

export default function Dashboard() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isStarted: false });

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

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1 className="gradient-text">Hackathon Dashboard</h1>
        <p className="text-muted">Welcome to your workspace. Start building the future.</p>
      </header>
      
      <div className="grid-cols-2">
        {/* Countdown Card */}
        <section className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Clock color="rgb(var(--secondary-rgb))" size={20} />
            <h3 style={{ fontSize: '1.15rem' }}>Countdown</h3>
          </div>
          
          {timeLeft.isStarted ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div className="gradient-text animate-glow" style={{ fontSize: '2rem', fontWeight: 800 }}>
                <Flame size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                LIVE NOW!
              </div>
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
            </div>
          )}
        </section>

        {/* Environment Status */}
        <section className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Laptop color="rgb(var(--primary-rgb))" size={20} />
            <h3 style={{ fontSize: '1.15rem' }}>Environment</h3>
          </div>
          <div className="status-grid">
            <div className="status-item">
              <div className="icon-wrapper">
                <CheckCircle color="rgb(var(--success-rgb))" size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Node.js</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ready</div>
              </div>
            </div>
            <div className="status-item">
              <div className="icon-wrapper">
                <CheckCircle color="rgb(var(--success-rgb))" size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>TypeScript</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ready</div>
              </div>
            </div>
            <div className="status-item">
              <div className="icon-wrapper">
                <CheckCircle color="rgb(var(--success-rgb))" size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Git</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
