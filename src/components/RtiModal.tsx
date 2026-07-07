import { useState, useEffect } from 'react';
import { X, FileSearch } from 'lucide-react';
import { generateRTI, MissingApiKeyError } from '../lib/ai';
import { updateComplaintStatus } from '../lib/storage';
import DraftTabs from './DraftTabs';
import { strings } from '../strings';
import { languageMeta, localized } from '../lib/languages';
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
  const [rtiTab, setRtiTab] = useState<'en' | 'regional'>(lang === 'en' ? 'en' : 'regional');

  // Close on Escape and lock background scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateRTI(
        complaint.issue.category,
        complaint.issue.department,
        complaint.originalText,
        complaint.area,
        complaint.issue.expectedSLAEnglish,
        lang,
      );
      setRti(result);
      // Mark complaint as escalated
      updateComplaintStatus(complaint.id, 'Ignored');
    } catch (err) {
      console.error('RTI generation failed:', err);
      setError(err instanceof MissingApiKeyError ? t.missingKeyError : t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={t.rtiTitle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{t.rtiTitle}</h2>
          <button className="modal-close" onClick={onClose} aria-label={t.closeLabel}>
            <X size={18} />
          </button>
        </div>

        {!rti && !loading && (
          <div className="rti-intro">
            <FileSearch size={40} aria-hidden="true" />
            <p>{t.rtiIntro.replace('{category}', localized(complaint.issue.category, complaint.issue.categoryRegional, complaint.issue.regionalLang, lang))}</p>
            <button className="btn-saffron" onClick={handleGenerate}>
              {t.generateRTI}
            </button>
          </div>
        )}

        {loading && (
          <div className="skeleton-container" aria-live="polite">
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
          <div className="error-banner" role="alert">
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
                className={`card-tab ${rtiTab === 'regional' ? 'active' : ''}`}
                onClick={() => setRtiTab('regional')}
              >
                {t.regionalDraftTab.replace('{lang}', rti ? languageMeta(rti.regionalLang).nativeName : '')}
              </button>
            </div>
            <DraftTabs
              draft={rtiTab === 'en' ? rti.draftEnglish : rti.draftRegional}
              category={`RTI - ${complaint.issue.category}`}
              lang={lang}
            />
          </div>
        )}
      </div>
    </div>
  );
}
