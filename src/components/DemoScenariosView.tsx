/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, ArrowRight, ShieldAlert, AlertTriangle, CheckCircle2, FlaskConical } from 'lucide-react';
import { DEMO_SCENARIOS } from '../../server/demoScenarios.ts';
import { InvestigationReport, RiskCategory } from '../types/investigation.ts';

interface DemoScenariosViewProps {
  onSelectScenarioReport: (report: InvestigationReport) => void;
  onLoadIntoLiveForm: (payload: { message: string; url?: string; companyName?: string; category?: string }) => void;
}

export const DemoScenariosView: React.FC<DemoScenariosViewProps> = ({
  onSelectScenarioReport,
  onLoadIntoLiveForm,
}) => {
  const getBadge = (category: RiskCategory) => {
    switch (category) {
      case 'HIGH CONCERN':
        return 'text-rose-400 bg-rose-950/40 border-rose-500/40';
      case 'NEEDS VERIFICATION':
        return 'text-amber-400 bg-amber-950/40 border-amber-500/40';
      case 'FEWER WARNING SIGNS FOUND':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Explicit DEMO Warning Banner */}
      <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-5 text-amber-200 space-y-2">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-amber-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300">
            [DEMO MODE] Pre-Computed Benchmark Evaluation Suite
          </h2>
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed">
          The scenarios below are standardized benchmark cases provided for hackathon evaluators and offline demonstration. Clicking &ldquo;Inspect Benchmark Report&rdquo; opens an illustrative, pre-validated investigation record clearly labeled as DEMO. To run a live query, click &ldquo;Test in Live Engine&rdquo; to send the text through the live search and synthesis pipeline.
        </p>
      </div>

      {/* Grid of Benchmark Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DEMO_SCENARIOS.map((item) => {
          const badgeClass = getBadge(item.expectedRisk);

          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-slate-400">{item.category}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass}`}>
                    {item.expectedRisk}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.subtitle}</p>

                <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed italic">
                  &ldquo;{item.sampleMessage}&rdquo;
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onSelectScenarioReport(item.report)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-cyan-600/90 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-500 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Benchmark Report</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onLoadIntoLiveForm({
                      message: item.sampleMessage,
                      url: item.sampleUrl,
                      companyName: item.sampleCompany,
                      category: item.category,
                    })
                  }
                  className="w-full sm:w-auto flex items-center justify-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                >
                  <span>Test in Live Engine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
