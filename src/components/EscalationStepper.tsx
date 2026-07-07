import { localized } from '../lib/languages';
import type { EscalationStep, UILanguage } from '../types';

interface Props {
  steps: EscalationStep[];
  lang: UILanguage;
  /** Language the steps' regional fields were generated in */
  issueLang: UILanguage;
}

export default function EscalationStepper({ steps, lang, issueLang }: Props) {
  return (
    <div className="escalation-stepper">
      {steps.map((step, i) => (
        <div key={step.step} className="step-item">
          <div className="step-marker">
            <div className="step-number">{step.step}</div>
            {i < steps.length - 1 && <div className="step-line" />}
          </div>
          <div className="step-content">
            <div className="step-action">
              {localized(step.actionEnglish, step.actionRegional, issueLang, lang)}
            </div>
            <div className="step-when">
              {localized(step.whenToUseEnglish, step.whenToUseRegional, issueLang, lang)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
