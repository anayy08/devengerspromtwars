import { useState } from 'react';
import { Save, Check } from 'lucide-react';
import DraftTabs from './DraftTabs';
import EscalationStepper from './EscalationStepper';
import { saveComplaint, generateId } from '../lib/storage';
import { strings } from '../strings';
import type { UILanguage, ClassifiedIssue } from '../types';

type CardTab = 'english' | 'hindi' | 'filing' | 'escalation';

interface Props {
  issue: ClassifiedIssue;
  lang: UILanguage;
  area: string;
  name: string;
  originalText: string;
}

export default function IssueCard({ issue, lang, area, name, originalText }: Props) {
  const t = strings[lang];
  const [activeTab, setActiveTab] = useState<CardTab>('english');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (saved) return;
    saveComplaint({
      id: generateId(),
      issue,
      area,
      name,
      originalText,
      status: 'Drafted',
      dateFiled: new Date().toISOString(),
      statusHistory: [{ status: 'Drafted', date: new Date().toISOString() }],
    });
    setSaved(true);
  };

  const tabs: { key: CardTab; label: string }[] = [
    { key: 'english', label: t.englishTab },
    { key: 'hindi', label: t.hindiTab },
    { key: 'filing', label: t.filingTab },
    { key: 'escalation', label: t.escalationTab },
  ];

  return (
    <div className="card issue-card fade-in">
      {/* Header */}
      <div className="issue-header">
        <span className="category-badge">{issue.category}</span>
        <span className={`severity-pill severity-${issue.severity}`}>
          {issue.severity}
        </span>
        <span className="department-name">{issue.department}</span>
      </div>
      <p className="department-reasoning">{issue.departmentReasoning}</p>

      {/* Tabs */}
      <div className="card-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`card-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'english' && (
        <DraftTabs
          draft={issue.complaintDraftEnglish}
          category={issue.category}
          lang={lang}
        />
      )}

      {activeTab === 'hindi' && (
        <DraftTabs
          draft={issue.complaintDraftHindi}
          category={issue.category}
          lang={lang}
        />
      )}

      {activeTab === 'filing' && (
        <div className="filing-info">
          <div className="filing-row">
            <span className="filing-label">Primary Channel</span>
            <span className="filing-value">{issue.channel.primary}</span>
          </div>
          <div className="filing-row">
            <span className="filing-label">Portal / App</span>
            <span className="filing-value">{issue.channel.portalName}</span>
          </div>
          <div className="filing-row">
            <span className="filing-label">How to File</span>
            <span className="filing-value mono">{issue.channel.howToFile}</span>
          </div>
          <div className="filing-row">
            <span className="filing-label">Expected SLA</span>
            <span className="filing-value">{issue.expectedSLA}</span>
          </div>
          {issue.severityReasoning && (
            <div className="filing-row">
              <span className="filing-label">Severity Assessment</span>
              <span className="filing-value">{issue.severityReasoning}</span>
            </div>
          )}
        </div>
      )}

      {activeTab === 'escalation' && (
        <EscalationStepper steps={issue.escalationLadder} lang={lang} />
      )}

      {/* Footer: Save to Tracker */}
      <div className="card-footer">
        <button
          className={saved ? 'btn-ghost' : 'btn-primary btn-sm'}
          onClick={handleSave}
          disabled={saved}
        >
          {saved ? (
            <><Check size={14} /> {t.saved}</>
          ) : (
            <><Save size={14} /> {t.saveToTracker}</>
          )}
        </button>
      </div>
    </div>
  );
}
