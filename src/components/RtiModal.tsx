import { useState } from 'react';
import { X } from 'lucide-react';
import { generateRTI } from '../lib/gemini';
import { updateComplaintStatus } from '../lib/storage';
import DraftTabs from './DraftTabs';
import { strings } from '../strings';
import type { UILanguage, SavedComplaint, RTIApplication } from '../types';

interface Props {
  complaint: SavedComplaint;
  lang: UILanguage;
  onClose: () => void;
}

export default function RtiModal({ complaint, lang, onClose }: Props) {
  const t = strings[lang];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rti, setRti] = useState<RTIApplication | null>(null);
  const [rtiTab, setRtiTab] = useState<'en' | 'hi'>('en');

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateRTI(
        complaint.issue.category,
        complaint.issue.department,
        complaint.originalText,
        complaint.area,
        complaint.issue.expectedSLA,
      );
      setRti(result);
      // Mark complaint as escalated
      updateComplaintStatus(complaint.id, 'Ignored');
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t.rtiTitle}</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {!rti && !loading && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ marginBottom: '1.5rem', color: 'var(--ink-secondary)', fontSize: '0.95rem' }}>
              {lang === 'en'
                ? `Generate an RTI application for your "${complaint.issue.category}" complaint to legally demand accountability.`
                : `अपनी "${complaint.issue.category}" शिकायत के लिए RTI आवेदन तैयार करें।`
              }
            </p>
            <button className="btn-saffron" onClick={handleGenerate}>
              {t.generateRTI}
            </button>
          </div>
        )}

        {loading && (
          <div className="skeleton-container">
            <div className="skeleton-card">
              <div className="skeleton-line h-lg w-60" />
              <div className="skeleton-line w-90" />
              <div className="skeleton-line w-80" />
              <div className="skeleton-line w-90" />
              <div className="skeleton-line w-60" />
            </div>
            <p className="analyzing-text">{t.analyzing}</p>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button className="btn-ghost" onClick={handleGenerate}>{t.retryBtn}</button>
          </div>
        )}

        {rti && (
          <div>
            <div className="card-tabs" style={{ marginBottom: '1rem' }}>
              <button
                className={`card-tab ${rtiTab === 'en' ? 'active' : ''}`}
                onClick={() => setRtiTab('en')}
              >
                {t.englishTab}
              </button>
              <button
                className={`card-tab ${rtiTab === 'hi' ? 'active' : ''}`}
                onClick={() => setRtiTab('hi')}
              >
                {t.hindiTab}
              </button>
            </div>
            <DraftTabs
              draft={rtiTab === 'en' ? rti.draftEnglish : rti.draftHindi}
              category={`RTI - ${complaint.issue.category}`}
              lang={lang}
            />
          </div>
        )}
      </div>
    </div>
  );
}
