import { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { strings } from '../strings';
import type { UILanguage } from '../types';

interface Props {
  draft: string;
  category: string;
  lang: UILanguage;
}

export default function DraftTabs({ draft, category, lang }: Props) {
  const t = strings[lang];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = draft;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    `Complaint: ${category}`
  )}&body=${encodeURIComponent(draft)}`;

  return (
    <div>
      <div className="draft-display">{draft}</div>
      <div className="draft-actions">
        <button className="btn-ghost btn-sm" onClick={handleCopy}>
          {copied ? (
            <span className="copy-success"><Check size={14} /> {t.copied}</span>
          ) : (
            <><Copy size={14} /> {t.copyBtn}</>
          )}
        </button>
        <a href={mailtoHref} className="btn-ghost btn-sm" style={{ textDecoration: 'none' }}>
          <Mail size={14} /> {t.emailBtn}
        </a>
      </div>
    </div>
  );
}
