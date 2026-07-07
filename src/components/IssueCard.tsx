import { useState } from 'react';
import { Save, Check, Building2 } from 'lucide-react';
import DraftTabs from './DraftTabs';
import EscalationStepper from './EscalationStepper';
import { saveComplaint, generateId } from '../lib/storage';
import { strings } from '../strings';
import { languageMeta, localized } from '../lib/languages';
import type { UILanguage, ClassifiedIssue } from '../types';

type CardTab = 'english' | 'regional' | 'filing' | 'escalation';

interface Props {
  issue: ClassifiedIssue;
  lang: UILanguage;
  area: string;
  name: string;
  originalText: string;
}

export default function IssueCard({ issue, lang, area, name, originalText }: Props) {
  const t = strings[lang];
  const [activeTab, setActiveTab] = useState<CardTab>(lang === 'en' ? 'english' : 'regional');
  const [saved, setSaved] = useState(false);
  const regionalName = languageMeta(issue.regionalLang).nativeName;

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
    { key: 'regional', label: t.regionalDraftTab.replace('{lang}', regionalName) },
    { key: 'filing', label: t.filingTab },
    { key: 'escalation', label: t.escalationTab },
  ];

  return (
    <div className="card issue-card fade-in">
      {/* Header */}
      <div className="issue-header">
        <span className="category-badge">
          {localized(issue.category, issue.categoryRegional, issue.regionalLang, lang)}
        </span>
        <span className={`severity-pill severity-${issue.severity}`}>
          {t.severityLabels[issue.severity]}
        </span>
        <span className="department-name">
          <Building2 size={14} aria-hidden="true" />
          {localized(issue.department, issue.departmentRegional, issue.regionalLang, lang)}
        </span>
      </div>
      <p className="department-reasoning">
        {localized(issue.departmentReasoningEnglish, issue.departmentReasoningRegional, issue.regionalLang, lang)}
      </p>

      {/* Tabs */}
      <div className="card-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
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

      {activeTab === 'regional' && (
        <DraftTabs
          draft={issue.complaintDraftRegional}
          category={issue.category}
          lang={lang}
        />
      )}

      {activeTab === 'filing' && (
        <div className="filing-info">
          <div className="filing-row">
            <span className="filing-label">{t.primaryChannel}</span>
            <span className="filing-value">
              {localized(issue.channel.primaryEnglish, issue.channel.primaryRegional, issue.regionalLang, lang)}
            </span>
          </div>
          <div className="filing-row">
            <span className="filing-label">{t.portalApp}</span>
            <span className="filing-value">{issue.channel.portalName}</span>
          </div>
          <div className="filing-row">
            <span className="filing-label">{t.howToFile}</span>
            <span className="filing-value mono">
              {localized(issue.channel.howToFileEnglish, issue.channel.howToFileRegional, issue.regionalLang, lang)}
            </span>
          </div>
          <div className="filing-row">
            <span className="filing-label">{t.expectedSLA}</span>
            <span className="filing-value">
              {localized(issue.expectedSLAEnglish, issue.expectedSLARegional, issue.regionalLang, lang)}
            </span>
          </div>
          {(issue.severityReasoningEnglish || issue.severityReasoningRegional) && (
            <div className="filing-row">
              <span className="filing-label">{t.severityAssessment}</span>
              <span className="filing-value">
                {localized(issue.severityReasoningEnglish, issue.severityReasoningRegional, issue.regionalLang, lang)}
              </span>
            </div>
          )}
        </div>
      )}

      {activeTab === 'escalation' && (
        <EscalationStepper steps={issue.escalationLadder} lang={lang} issueLang={issue.regionalLang} />
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
