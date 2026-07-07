import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { classifyComplaint, MissingApiKeyError } from '../lib/ai';
import { strings } from '../strings';
import IssueCard from './IssueCard';
import type { UILanguage, ClassifiedIssue } from '../types';

const MIN_CHARS = 20;

interface Props { lang: UILanguage; }

export default function IntakeForm({ lang }: Props) {
  const t = strings[lang];
  const [text, setText] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ClassifiedIssue[] | null>(null);

  const trimmedLength = text.trim().length;
  const canSubmit = trimmedLength >= MIN_CHARS && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await classifyComplaint(text.trim(), city.trim(), name.trim(), lang);
      setResults(response.issues);
    } catch (err) {
      console.error('Complaint classification failed:', err);
      setError(err instanceof MissingApiKeyError ? t.missingKeyError : t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      {/* Intake Card */}
      <div className="card intake-card">
        <label className="sr-only" htmlFor="complaint-text">{t.describeLabel}</label>
        <textarea
          id="complaint-text"
          className="complaint-input"
          placeholder={t.describeLabel}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
        />

        <div className="char-count">
          <span className={trimmedLength < MIN_CHARS ? 'insufficient' : ''}>
            {trimmedLength}
          </span>
          &nbsp;{t.charCount}
          {trimmedLength > 0 && trimmedLength < MIN_CHARS && (
            <span className="min-chars">&mdash; {t.minChars}</span>
          )}
        </div>

        <div className="form-row">
          <input
            className="form-input"
            placeholder={t.cityLabel}
            aria-label={t.cityLabel}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="form-input"
            placeholder={t.nameLabel}
            aria-label={t.nameLabel}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="example-chips">
          <span className="chips-label">{t.tryExamples}</span>
          {t.examples.map((ex) => (
            <button key={ex} className="chip" onClick={() => setText(ex)} title={ex}>
              {ex.length > 55 ? ex.slice(0, 55) + '…' : ex}
            </button>
          ))}
        </div>

        <button
          className="btn-primary submit-btn"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          <Send size={16} />
          {loading ? t.analyzing : t.submitBtn}
        </button>
      </div>

      {/* Skeleton Loader */}
      {loading && (
        <div className="skeleton-container" aria-live="polite">
          <div className="skeleton-card">
            <div className="skeleton-line h-lg w-40" />
            <div className="skeleton-line w-90" />
            <div className="skeleton-line w-80" />
            <div className="skeleton-line w-60" />
            <div className="skeleton-line w-90" />
            <div className="skeleton-line w-40" />
          </div>
          <p className="analyzing-text">{t.analyzing}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="error-banner" role="alert">
          <p><AlertCircle size={16} aria-hidden="true" /> {error}</p>
          <button className="btn-ghost" onClick={handleSubmit}>
            {t.retryBtn}
          </button>
        </div>
      )}

      {/* Results */}
      {results && results.map((issue, i) => (
        <IssueCard
          key={i}
          issue={issue}
          lang={lang}
          area={city.trim()}
          name={name.trim()}
          originalText={text.trim()}
        />
      ))}
    </div>
  );
}
