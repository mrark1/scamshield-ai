/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Sparkles,
  History,
  Trash2,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { InvestigationForm } from './components/InvestigationForm.tsx';
import { InvestigationProgress } from './components/InvestigationProgress.tsx';
import { ReportView } from './components/ReportView.tsx';
import { DemoScenariosView } from './components/DemoScenariosView.tsx';
import { LiveProviderStatus } from './components/LiveProviderStatus.tsx';
import { SafetyGuideView } from './components/SafetyGuideView.tsx';
import { AboutView } from './components/AboutView.tsx';
import { analyzeSuspiciousContent } from './services/api.ts';
import { InvestigationReport } from './types/investigation.ts';

const RECENT_REPORTS_KEY = 'scamshield_recent_reports_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'investigate' | 'demos' | 'engine' | 'safety' | 'about'>('investigate');
  const [currentReport, setCurrentReport] = useState<InvestigationReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recentReports, setRecentReports] = useState<InvestigationReport[]>([]);

  // Load recent reports from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_REPORTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentReports(parsed.slice(0, 8));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveReportToHistory = (report: InvestigationReport) => {
    setRecentReports((prev) => {
      const filtered = prev.filter((r) => r.id !== report.id);
      const updated = [report, ...filtered].slice(0, 8);
      try {
        localStorage.setItem(RECENT_REPORTS_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage limits
      }
      return updated;
    });
  };

  const clearHistory = () => {
    setRecentReports([]);
    try {
      localStorage.removeItem(RECENT_REPORTS_KEY);
    } catch {
      // ignore
    }
  };

  const handleStartInvestigation = async (payload: {
    message: string;
    url?: string;
    companyName?: string;
    category?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentReport(null);

    try {
      const report = await analyzeSuspiciousContent(payload);
      setCurrentReport(report);
      saveReportToHistory(report);
    } catch (err: any) {
      console.error('Investigation error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during analysis. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewInvestigation = () => {
    setCurrentReport(null);
    setErrorMessage(null);
    setActiveTab('investigate');
  };

  const handleSelectDemoReport = (report: InvestigationReport) => {
    setCurrentReport(report);
    setActiveTab('investigate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadDemoIntoLiveForm = (payload: {
    message: string;
    url?: string;
    companyName?: string;
    category?: string;
  }) => {
    setCurrentReport(null);
    setActiveTab('investigate');
    // Pre-populate by triggering investigation or passing down
    handleStartInvestigation(payload);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setErrorMessage(null);
        }}
        onNewInvestigation={handleNewInvestigation}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-rose-500/40 bg-rose-950/30 p-4 text-xs text-rose-300 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-200">Investigation Could Not Proceed</p>
                <p className="mt-0.5 text-rose-300/90 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 p-1"
              aria-label="Dismiss alert"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab 1: Investigate */}
        {activeTab === 'investigate' && (
          <div className="space-y-8">
            {isLoading ? (
              <InvestigationProgress onCancel={() => setIsLoading(false)} />
            ) : currentReport ? (
              <ReportView
                report={currentReport}
                onNewInvestigation={handleNewInvestigation}
              />
            ) : (
              <div className="space-y-8">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950/70 px-3 py-1 border border-cyan-800/60 text-xs font-semibold text-cyan-400">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Cybersecurity & Threat Verification Intelligence</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                    Investigate Suspicious Offers & Digital Claims
                  </h1>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    ScamShield AI conducts live public-web discovery and evidence-based AI synthesis to help you spot advance-fee recruitment fraud, crypto task traps, and brand impersonation.
                  </p>
                </div>

                {/* Main Form */}
                <InvestigationForm
                  onSubmit={handleStartInvestigation}
                  isLoading={isLoading}
                />

                {/* Recent Investigations History */}
                {recentReports.length > 0 && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <History className="h-4 w-4 text-cyan-400" />
                        <h3 className="text-sm font-semibold text-white">
                          Recent Session Investigations ({recentReports.length})
                        </h3>
                      </div>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Clear History</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {recentReports.map((rec) => {
                        const isHigh = rec.riskCategory === 'HIGH CONCERN';
                        const isNeeds = rec.riskCategory === 'NEEDS VERIFICATION';

                        return (
                          <div
                            key={rec.id}
                            onClick={() => setCurrentReport(rec)}
                            className="rounded-lg border border-slate-800 bg-slate-950/60 p-3.5 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                          >
                            <div className="min-w-0 space-y-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                                    isHigh
                                      ? 'text-rose-400 border-rose-500/30 bg-rose-950/20'
                                      : isNeeds
                                      ? 'text-amber-400 border-amber-500/30 bg-amber-950/20'
                                      : 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
                                  }`}
                                >
                                  {rec.riskCategory}
                                </span>
                                <span className="text-[11px] text-slate-500 tabular-nums">
                                  {new Date(rec.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-200 font-medium truncate">
                                {rec.inputSummary.companyName || rec.inputSummary.messageSnippet.slice(0, 50)}
                              </p>
                            </div>

                            <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Demo Benchmark Scenarios */}
        {activeTab === 'demos' && (
          <DemoScenariosView
            onSelectScenarioReport={handleSelectDemoReport}
            onLoadIntoLiveForm={handleLoadDemoIntoLiveForm}
          />
        )}

        {/* Tab 3: Live Research Engine & Setup */}
        {activeTab === 'engine' && <LiveProviderStatus />}

        {/* Tab 4: Safety Rules & Playbook */}
        {activeTab === 'safety' && <SafetyGuideView />}

        {/* Tab 5: About & Ethics */}
        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Quiet Footer */}
      <footer className="w-full border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">ScamShield AI</span>
            <span>·</span>
            <span>KRITICAL HACKS &apos;26 (AI/ML Track)</span>
          </div>
          <p className="text-center sm:text-right text-slate-500 max-w-lg">
            Notice: ScamShield AI does not certify website safety or make definitive legal accusations. Always independently confirm with verified regulatory authorities.
          </p>
        </div>
      </footer>
    </div>
  );
}
