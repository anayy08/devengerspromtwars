import { useState, useCallback } from 'react';
import { ClipboardList, AlertTriangle, Trash2 } from 'lucide-react';
import { getComplaints, updateComplaintStatus, deleteComplaint } from '../lib/storage';
import { strings } from '../strings';
import RtiModal from './RtiModal';
import type { UILanguage, SavedComplaint, ComplaintStatus } from '../types';

const STATUS_ORDER: ComplaintStatus[] = ['Drafted', 'Filed', 'Acknowledged', 'Resolved', 'Ignored'];

interface Props { lang: UILanguage; }

export default function TrackerList({ lang }: Props) {
  const t = strings[lang];
  const [complaints, setComplaints] = useState<SavedComplaint[]>(getComplaints);
  const [rtiTarget, setRtiTarget] = useState<SavedComplaint | null>(null);

  const refresh = useCallback(() => setComplaints(getComplaints()), []);

  const cycleStatus = (id: string, current: ComplaintStatus) => {
    const idx = STATUS_ORDER.indexOf(current);
    const next = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
    updateComplaintStatus(id, next);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteComplaint(id);
    refresh();
  };

  const daysElapsed = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const parseSLADays = (sla: string): number => {
    const match = sla.match(/(\d+)/g);
    if (!match) return 15;
    return parseInt(match[match.length - 1], 10);
  };

  if (complaints.length === 0) {
    return (
      <div className="empty-state fade-in">
        <ClipboardList size={48} />
        <p>{t.noComplaints}</p>
      </div>
    );
  }

  return (
    <div className="tracker-list fade-in">
      {complaints.map((c) => {
        const days = daysElapsed(c.dateFiled);
        const slaDays = parseSLADays(c.issue.expectedSLA);
        const pastSLA = c.status === 'Filed' && days > slaDays;

        return (
          <div key={c.id} className="card tracker-item">
            <div className="tracker-header">
              <div>
                <div className="tracker-title">
                  {c.issue.category} — {c.area || 'Unknown area'}
                </div>
                <div className="tracker-meta">
                  {days} {t.daysAgo} &middot; {c.issue.department}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  className={`status-chip status-${c.status}`}
                  onClick={() => cycleStatus(c.id, c.status)}
                  title="Click to change status"
                >
                  {c.status}
                </button>
                <button
                  className="btn-ghost btn-sm"
                  onClick={() => handleDelete(c.id)}
                  style={{ padding: '0.3rem', color: 'var(--ink-muted)' }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Mini timeline */}
            <div className="timeline">
              {c.statusHistory.map((sh, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    className={`timeline-dot ${
                      sh.status === 'Resolved' ? 'resolved' :
                      i === c.statusHistory.length - 1 ? 'current' : ''
                    }`}
                    title={`${sh.status} — ${new Date(sh.date).toLocaleDateString()}`}
                  />
                  {i < c.statusHistory.length - 1 && (
                    <div className="timeline-line filled" />
                  )}
                </div>
              ))}
            </div>

            {/* SLA Banner */}
            {pastSLA && (
              <div className="sla-banner">
                <span>
                  <AlertTriangle size={16} style={{ verticalAlign: 'middle', marginRight: '0.35rem' }} />
                  {t.pastSLA}
                </span>
                <button className="btn-saffron btn-sm" onClick={() => setRtiTarget(c)}>
                  {t.escalateBtn}
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* RTI Modal */}
      {rtiTarget && (
        <RtiModal
          complaint={rtiTarget}
          lang={lang}
          onClose={() => { setRtiTarget(null); refresh(); }}
        />
      )}
    </div>
  );
}
