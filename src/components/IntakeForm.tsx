import { useState } from 'react';
import { Send } from 'lucide-react';
import { classifyComplaint } from '../lib/gemini';
import { strings } from '../strings';
import IssueCard from './IssueCard';
import type { UILanguage, ClassifiedIssue } from '../types';

const EXAMPLES = [
  'Streetlight broken outside my house for 3 weeks, and garbage is piling up at the corner',
  'Water supply comes only 1 hour a day in our colony since last month',
  'Open manhole near the school gate, very dangerous for kids',
];

interface Props { lang: UILanguage; }

export default function IntakeForm({ lang }: Props) {
  const t = strings[lang];
  const [text, setText] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ClassifiedIssue[] | null>(null);

  const canSubmit = text.length >= 20 && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await classifyComplaint(text, city, name);
      setResults(response.issues);
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      {/* Intake Card */}
      <div className="card intake-card">
        <textarea
          className="complaint-input"
          placeholder={t.describeLabel}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
        />

        <div className="char-count">
          <span className={text.length < 20 ? 'insufficient' : ''}>
            {text.length}
          </span>
          &nbsp;{t.charCount}
          {text.length > 0 && text.length < 20 && (
            <span className="min-chars">&mdash; {t.minChars}</span>
          )}
        </div>

        <div className="form-row">
          <input
            className="form-input"
            placeholder={t.cityLabel}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="form-input"
            placeholder={t.nameLabel}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="example-chips">
          <span className="chips-label">{t.tryExamples}</span>
          {EXAMPLES.map((ex, i) => (
            <button key={i} className="chip" onClick={() => setText(ex)}>
              {ex.length > 55 ? ex.slice(0, 55) + '\u2026' : ex}
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
        <div className="skeleton-container">
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
        <div className="error-banner">
          <p>{error}</p>
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
          area={city}
          name={name}
          originalText={text}
        />
      ))}
    </div>
  );
}
