import { useState, useCallback } from 'react';
import { ClipboardList, AlertTriangle, Trash2, MapPin } from 'lucide-react';
import { getComplaints, updateComplaintStatus, deleteComplaint } from '../lib/storage';
import { strings } from '../strings';
import RtiModal from './RtiModal';
import { localized } from '../lib/languages';
import type { UILanguage, SavedComplaint, ComplaintStatus } from '../types';

const STATUS_ORDER: ComplaintStatus[] = ['Drafted', 'Filed', 'Acknowledged', 'Resolved', 'Ignored'];
// Statuses where the clock is running on the department
const AWAITING_ACTION: ComplaintStatus[] = ['Filed', 'Acknowledged'];

interface Props {
  lang: UILanguage;
  onFileNew: () => void;
}

export default function TrackerList({ lang, onFileNew }: Props) {
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
    if (!window.confirm(t.confirmDelete)) return;
    deleteComplaint(id);
    refresh();
  };

  const daysElapsed = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const parseSLADays = (sla: string): number => {
    const match = sla.match(/(\d+)/g);
    if (!match) return 15;
    const value = parseInt(match[match.length - 1], 10);
    // "24/48 hours" style SLAs would otherwise read as 24+ days
    if (/hour|घंट/i.test(sla)) return Math.max(1, Math.ceil(value / 24));
    return value;
  };

  if (complaints.length === 0) {
    return (
      <div className="empty-state fade-in">
        <ClipboardList size={48} />
        <p>{t.noComplaints}</p>
        <button className="btn-primary" onClick={onFileNew}>
          {t.fileFirstBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="tracker-list fade-in">
      {complaints.map((c) => {
        const days = daysElapsed(c.dateFiled);
        const slaDays = parseSLADays(c.issue.expectedSLAEnglish);
        const pastSLA = AWAITING_ACTION.includes(c.status) && days > slaDays;

        return (
          <div key={c.id} className="card tracker-item">
            <div className="tracker-header">
              <div>
                <div className="tracker-title">
                  {localized(c.issue.category, c.issue.categoryRegional, c.issue.regionalLang, lang)}
                  <span className="tracker-area">
                    <MapPin size={13} aria-hidden="true" /> {c.area || t.unknownArea}
                  </span>
                </div>
                <div className="tracker-meta">
                  {days} {days === 1 ? t.dayAgo : t.daysAgo} &middot; {localized(c.issue.department, c.issue.departmentRegional, c.issue.regionalLang, lang)}
                </div>
              </div>
              <div className="tracker-actions">
                <button
                  className={`status-chip status-${c.status}`}
                  onClick={() => cycleStatus(c.id, c.status)}
                  title={t.clickToChangeStatus}
                >
                  {t.statusLabels[c.status]}
                </button>
                <button
                  className="btn-ghost btn-sm btn-delete"
                  onClick={() => handleDelete(c.id)}
                  title={t.deleteComplaint}
                  aria-label={t.deleteComplaint}
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
                    title={`${t.statusLabels[sh.status]} — ${new Date(sh.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN')}`}
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
