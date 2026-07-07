import type { EscalationStep, UILanguage } from '../types';

interface Props {
  steps: EscalationStep[];
  lang: UILanguage;
}

export default function EscalationStepper({ steps }: Props) {
  return (
    <div className="escalation-stepper">
      {steps.map((step, i) => (
        <div key={step.step} className="step-item">
          <div className="step-marker">
            <div className="step-number">{step.step}</div>
            {i < steps.length - 1 && <div className="step-line" />}
          </div>
          <div className="step-content">
            <div className="step-action">{step.action}</div>
            <div className="step-when">{step.whenToUse}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
