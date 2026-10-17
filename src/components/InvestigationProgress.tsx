/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Search, FileText, Shield } from 'lucide-react';

interface InvestigationProgressProps {
  onCancel?: () => void;
}

export const InvestigationProgress: React.FC<InvestigationProgressProps> = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Validating Input & Parsing Claims',
      description: 'Sanitizing URLs, checking SSRF restrictions, and extracting entity references.',
      icon: FileText,
    },
    {
      title: 'Querying Public Engines & Live Web Evidence',
      description: 'Executing search requests to gather verifiable public records and complaint databases.',
      icon: Search,
    },
    {
      title: 'Cross-Referencing Threat Patterns',
      description: 'Evaluating advance-fee red flags, domain age, and impersonation indicators.',
      icon: Shield,
    },
    {
      title: 'Synthesizing Risk Category & Safety Advice',
      description: 'Finalizing calibrated assessment with supporting citations and recommended actions.',
      icon: CheckCircle2,
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1200);
    const timer2 = setTimeout(() => setCurrentStep(2), 2600);
    const timer3 = setTimeout(() => setCurrentStep(3), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-semibold text-white">Investigation in Progress</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Gathering live evidence and comparing against known deceptive communication signatures...
          </p>
        </div>
        <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3.5 p-3 rounded-lg transition-colors ${
                isCurrent
                  ? 'bg-slate-800/60 border border-cyan-500/30'
                  : isDone
                  ? 'bg-slate-900/30 opacity-80'
                  : 'opacity-40'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isDone
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    : isCurrent
                    ? 'bg-cyan-600 text-white animate-pulse'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>

              <div className="space-y-0.5 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    isCurrent ? 'text-cyan-300' : isDone ? 'text-slate-200' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-slate-400">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <p className="text-xs text-slate-500">
          ScamShield AI prioritizes evidence verification over quick guessing. Analysis usually takes 4-8 seconds.
        </p>
      </div>
    </div>
  );
};
