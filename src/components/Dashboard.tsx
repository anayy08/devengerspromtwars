import { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import { getComplaints } from '../lib/storage';
import { strings } from '../strings';
import { localized } from '../lib/languages';
import type { UILanguage, SavedComplaint } from '../types';

interface Props { lang: UILanguage; }

export default function Dashboard({ lang }: Props) {
  const t = strings[lang];
  const [complaints, setComplaints] = useState<SavedComplaint[]>([]);

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const pending = total - resolved;

  // Days-to-resolution for resolved complaints
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved');
  const avgDays = resolvedComplaints.length > 0
    ? Math.round(
        resolvedComplaints.reduce((sum, c) => {
          const resolvedEntry = c.statusHistory.find(s => s.status === 'Resolved');
          if (!resolvedEntry) return sum;
          const diff = new Date(resolvedEntry.date).getTime() - new Date(c.dateFiled).getTime();
          return sum + diff / (1000 * 60 * 60 * 24);
        }, 0) / resolvedComplaints.length
      )
    : 0;

  // Category breakdown
  const categoryCounts: Record<string, number> = {};
  complaints.forEach(c => {
    const cat = localized(c.issue.category, c.issue.categoryRegional, c.issue.regionalLang, lang);
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...categories.map(([, v]) => v), 1);

  // Donut
  const resolvedPct = total > 0 ? (resolved / total) * 100 : 0;
  const pendingPct = total > 0 ? (pending / total) * 100 : 0;
  const circumference = 2 * Math.PI * 40;
  const resolvedArc = (resolvedPct / 100) * circumference;
  const pendingArc = (pendingPct / 100) * circumference;

  if (total === 0) {
    return (
      <div className="empty-state fade-in">
        <BarChart3 size={48} />
        <p>{t.dashEmpty}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Stat Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-value">{total}</div>
          <div className="stat-label">{t.totalComplaints}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--green)' }}>{resolved}</div>
          <div className="stat-label">{t.resolved}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--saffron)' }}>{pending}</div>
          <div className="stat-label">{t.pending}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgDays}</div>
          <div className="stat-label">{t.avgDays}</div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="donut-container">
        <svg width="120" height="120" viewBox="0 0 100 100" role="img" aria-label={`${t.resolved}: ${resolved}, ${t.pending}: ${pending}`}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="12" />
          {resolved > 0 && (
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke="var(--green)" strokeWidth="12"
              strokeDasharray={`${resolvedArc} ${circumference}`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          )}
          {pending > 0 && (
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke="var(--saffron)" strokeWidth="12"
              strokeDasharray={`${pendingArc} ${circumference}`}
              strokeDashoffset={`${-resolvedArc}`}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          )}
        </svg>
        <div className="donut-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: 'var(--green)' }} />
            {t.resolved}: {resolved}
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: 'var(--saffron)' }} />
            {t.pending}: {pending}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      {categories.length > 0 && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{t.byCategory}</h3>
          <div className="bar-chart">
            {categories.map(([cat, count]) => (
              <div key={cat} className="bar-row">
                <span className="bar-label">{cat}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
