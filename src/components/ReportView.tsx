/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Download,
  RotateCcw,
  ShieldAlert,
  Search,
  HelpCircle,
  AlertOctagon,
  Info,
  Calendar,
  Globe,
  FileSearch,
} from 'lucide-react';
import { InvestigationReport, RiskCategory } from '../types/investigation.ts';

interface ReportViewProps {
  report: InvestigationReport;
  onNewInvestigation: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  onNewInvestigation,
}) => {
  const [copied, setCopied] = useState(false);

  // Styling maps based on Risk Category
  const getCategoryConfig = (category: RiskCategory) => {
    switch (category) {
      case 'HIGH CONCERN':
        return {
          bg: 'bg-rose-950/25',
          border: 'border-rose-500/40',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-900/60 text-rose-200 border-rose-700/60',
          icon: AlertOctagon,
          title: 'High Concern Detected',
          description:
            'Critical threat indicators (such as advance recruitment fees, peer-to-peer payment rails, or artificial urgency) were identified in the offer itself. This rating assesses the submitted offer’s risk, not a legally established finding that the named company is fraudulent.',
        };
      case 'NEEDS VERIFICATION':
        return {
          bg: 'bg-amber-950/25',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-900/60 text-amber-200 border-amber-700/60',
          icon: AlertTriangle,
          title: 'Needs Direct Verification',
          description:
            'Critical claims remain unconfirmed, commercial inconsistencies were detected, or sender identity could not be verified.',
        };
      case 'FEWER WARNING SIGNS FOUND':
        return {
          bg: 'bg-emerald-950/25',
          border: 'border-emerald-500/40',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/60',
          icon: CheckCircle2,
          title: 'Fewer Warning Signs Found',
          description:
            'The initial automated inquiry did not identify significant scam signatures in available public records. Notice: This does NOT certify that the offer is safe or legitimate.',
        };
      case 'INSUFFICIENT EVIDENCE':
      default:
        return {
          bg: 'bg-slate-900/50',
          border: 'border-slate-700',
          text: 'text-slate-300',
          badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
          icon: HelpCircle,
          title: 'Insufficient Public Evidence',
          description:
            'Public web indices and complaint databases returned limited or contradictory information regarding this entity.',
        };
    }
  };

  const config = getCategoryConfig(report.riskCategory);
  const IconComponent = config.icon;

  const handleCopySummary = () => {
    const text = `ScamShield AI Investigation Report
Risk Category: ${report.riskCategory}
Report ID: ${report.id}
Timestamp: ${new Date(report.timestamp).toLocaleString()}

Summary:
${report.summary}

Confidence & Evidence Note:
${report.confidenceNote}

Warning Signs (${report.warningSigns.length}):
${report.warningSigns.map((w) => `- [${w.severity.toUpperCase()}] ${w.title}: ${w.explanation}`).join('\n')}

Actionable Next Steps:
${report.recommendations.map((r) => `${r.step}. ${r.action} (${r.priority}): ${r.rationale}`).join('\n')}

Notice: This report is an automated research synthesis, not a guarantee or law-enforcement determination.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scamshield-report-${report.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Visual DEMO Banner (if applicable) */}
      {report.isDemo && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-4 text-xs text-amber-200">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wide text-amber-300">
            <span className="rounded bg-amber-500/20 px-2 py-0.5 border border-amber-500/40 font-mono">
              [DEMO BENCHMARK SCENARIO]
            </span>
            <span>Pre-Computed Benchmark Case</span>
          </div>
          <p className="mt-1 text-amber-200/90 leading-relaxed">
            This report represents a pre-calculated test scenario used to demonstrate ScamShield AI&apos;s evidence synthesis. It is visually distinct from live queries and does not represent an unverified real-time web scan.
          </p>
        </div>
      )}

      {/* Primary Risk Category Card */}
      <div className={`rounded-xl border ${config.border} ${config.bg} p-6 md:p-8 backdrop-blur-sm`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-slate-950/70 border ${config.border} ${config.text} shrink-0`}>
              <IconComponent className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Preliminary Assessment:
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${config.badgeBg}`}>
                  {report.riskCategory}
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white">{config.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">{config.description}</p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 self-end md:self-start">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
              title="Copy Summary to Clipboard"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
              title="Download Full JSON Report"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={onNewInvestigation}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-500 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>New Investigation</span>
            </button>
          </div>
        </div>

        {/* Executive Summary & Confidence Note */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Executive Findings Summary
              </h3>
              <p className="mt-2 text-base text-slate-100 leading-relaxed">{report.summary}</p>
            </div>

            <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" /> Confidence & Evidence Context
              </span>
              <p className="leading-relaxed text-slate-300/90">{report.confidenceNote}</p>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="rounded-lg bg-slate-950/70 p-4 border border-slate-800/80 space-y-3 text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-slate-400">
              Investigation Metadata
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span className="text-slate-400">Report Reference:</span>
                <span className="font-mono tabular-nums text-slate-200">{report.id}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span className="text-slate-400">Timestamp:</span>
                <span className="font-mono tabular-nums text-slate-200">
                  {new Date(report.timestamp).toLocaleString()}
                </span>
              </div>
              {report.inputSummary.companyName && (
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Reported Entity:</span>
                  <span className="font-medium text-slate-200 truncate max-w-[160px]">
                    {report.inputSummary.companyName}
                  </span>
                </div>
              )}
              {report.inputSummary.url && (
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                  <span className="text-slate-400">Target URL:</span>
                  <span className="font-mono text-cyan-400 truncate max-w-[160px]">
                    {report.inputSummary.url}
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-0.5 border-t border-slate-800/60 pt-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Research Pipeline:</span>
                  <span className={`font-semibold ${report.providerInfo.tinyfishUsed ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    {report.providerInfo.tinyfishUsed
                      ? 'TinyFish Search API'
                      : report.providerInfo.isDemo
                      ? 'Demo Benchmark'
                      : 'Gemini 3.8 Flash'}
                  </span>
                </div>
                {report.providerInfo.statusNote && (
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {report.providerInfo.statusNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Separation & Integrity Framework */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm space-y-5">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-cyan-400" />
                <span>Evidence-Integrity & Attribution Breakdown</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Strict separation between directly associated entity evidence, unverified name matches, general regulatory guidance, user claims, and unestablished data.
              </p>
            </div>
            <span className="rounded bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-cyan-300 border border-slate-700">
              Entity Resolution Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 1. Directly Associated Entity Evidence */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>1. Evidence Directly Associated with Entity</span>
            </h4>
            {report.evidenceBreakdown?.directEntityEvidence && report.evidenceBreakdown.directEntityEvidence.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-slate-300">
                {report.evidenceBreakdown.directEntityEvidence.map((ev, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                    <span className="leading-relaxed">{ev}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No direct domain or confirmed legal registry records were retrieved for this specific entity.
              </p>
            )}
          </div>

          {/* 2. Possible but Unverified Name Matches */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>2. Possible Name Matches (Identity Unverified)</span>
            </h4>
            {report.evidenceBreakdown?.possibleNameMatches && report.evidenceBreakdown.possibleNameMatches.length > 0 ? (
              <div className="space-y-2">
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {report.evidenceBreakdown.possibleNameMatches.map((ev, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono mt-0.5">•</span>
                      <span className="leading-relaxed">{ev}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-amber-300/80 bg-amber-950/40 p-2 rounded border border-amber-700/40">
                  Notice: These reviews, complaints, or discussions discuss similar names. They must not be assumed to concern the exact same legal entity without domain or corporate confirmation.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No ambiguous name collisions or forum discussions identified.
              </p>
            )}
          </div>

          {/* 3. General Scam-Pattern Guidance */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/15 p-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-cyan-400" />
              <span>3. General Scam-Pattern Guidance (Regulatory)</span>
            </h4>
            {report.evidenceBreakdown?.generalGuidance && report.evidenceBreakdown.generalGuidance.length > 0 ? (
              <div className="space-y-2">
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {report.evidenceBreakdown.generalGuidance.map((ev, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono mt-0.5">•</span>
                      <span className="leading-relaxed">{ev}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-cyan-300/80 bg-cyan-950/40 p-2 rounded border border-cyan-700/40">
                  Official consumer protection advisories describe general fraud tactics. They are educational references, not direct evidence against any specific investigated company.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No general regulatory advisories attached.</p>
            )}
          </div>

          {/* 4. Missing or Inconclusive Evidence */}
          <div className="rounded-xl border border-slate-700 bg-slate-950/40 p-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              <span>4. Missing or Inconclusive Evidence</span>
            </h4>
            {report.evidenceBreakdown?.missingOrInconclusive && report.evidenceBreakdown.missingOrInconclusive.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-slate-300">
                {report.evidenceBreakdown.missingOrInconclusive.map((ev, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-slate-400 font-mono mt-0.5">?</span>
                    <span className="leading-relaxed font-mono text-[11px] text-slate-300">{ev}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">All key primary identity points were evaluated.</p>
            )}
          </div>
        </div>

        {/* 5. User-Provided Claims */}
        {report.userClaims && report.userClaims.length > 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileSearch className="h-4 w-4 text-cyan-400" />
              <span>5. User-Provided Claims (Submitted for Investigation)</span>
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
              {report.userClaims.map((claim, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 font-mono mt-0.5">•</span>
                  <span className="leading-relaxed">{claim}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Warning Signs Section */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-400" />
              <span>Identified Warning Signs ({report.warningSigns.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Specific threat signals extracted from the communication and cross-referenced with known fraud registries.
            </p>
          </div>
        </div>

        {report.warningSigns.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-6 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
            <p className="text-sm font-medium text-white">No Critical Warning Signs Flagged</p>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              The communication did not trigger known high-risk keywords (e.g. advance equipment fees, untraceable crypto deposits, or extreme urgency threats).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {report.warningSigns.map((warning, idx) => {
              const severityColor =
                warning.severity === 'critical'
                  ? 'border-rose-500/40 bg-rose-950/20 text-rose-300'
                  : warning.severity === 'high'
                  ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                  : 'border-slate-700 bg-slate-950/40 text-slate-300';

              return (
                <div key={idx} className={`rounded-lg border p-4 space-y-2 ${severityColor}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {warning.severity} Severity
                    </span>
                    {warning.detectedPattern && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {warning.detectedPattern}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white">{warning.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{warning.explanation}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Live Supporting Sources & Evidence */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-cyan-400" />
              <span>Supporting Public Evidence & Sources ({report.sources.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verifiable external links from live web research, labeled with strict entity attribution.
            </p>
          </div>
        </div>

        {report.sources.length === 0 ? (
          <p className="text-xs text-slate-400 py-3">No external source URLs returned for this inquiry.</p>
        ) : (
          <div className="space-y-3 pt-2">
            {report.sources.map((source, idx) => {
              // Badge styling for entity resolution status
              const status = source.entityMatchStatus || 'unrelated';
              const badgeClass =
                status === 'verified_entity'
                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60'
                  : status === 'possible_name_match'
                  ? 'bg-amber-950/70 text-amber-300 border-amber-700/60'
                  : status === 'general_advisory'
                  ? 'bg-cyan-950/70 text-cyan-300 border-cyan-700/60'
                  : 'bg-slate-800 text-slate-300 border-slate-700';

              const badgeLabel =
                source.matchLabel ||
                (status === 'verified_entity'
                  ? 'Directly associated entity evidence'
                  : status === 'possible_name_match'
                  ? 'Possible name match — identity unverified'
                  : status === 'general_advisory'
                  ? 'General scam-pattern guidance'
                  : 'Not established by the sources retrieved');

              return (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 transition-colors hover:border-slate-700 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group"
                    >
                      <span>{source.title}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-cyan-500 group-hover:text-cyan-300" />
                    </a>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono text-slate-300 flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {source.domain || 'public-web'}
                      </span>
                    </div>
                  </div>

                  {/* Entity Resolution Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${badgeClass}`}>
                      {badgeLabel}
                    </span>
                    {source.matchExplanation && (
                      <span className="text-[11px] text-slate-400">
                        {source.matchExplanation}
                      </span>
                    )}
                  </div>

                  {source.snippet && (
                    <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/50 p-2.5 rounded border border-slate-800/60">
                      &ldquo;{source.snippet}&rdquo;
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Unverified Claims & Missing Information */}
      {report.unverifiedClaims.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm space-y-4">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-amber-400" />
              <span>Unverified Claims & Missing Information ({report.unverifiedClaims.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Statements in the offer that could not be independently corroborated by public records.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {report.unverifiedClaims.map((claim, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-amber-500/20 bg-slate-950/70 p-4 space-y-2 text-xs"
              >
                <div className="text-slate-200 font-semibold text-sm">
                  Claim: &ldquo;{claim.claim}&rdquo;
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300 pt-1">
                  <div>
                    <span className="font-semibold text-amber-300">Why Unverified: </span>
                    <span>{claim.reasonNotVerified}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-rose-300">Risk Implication: </span>
                    <span>{claim.riskImplication}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practical Actionable Recommendations */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span>Recommended Safety Next Steps</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Practical measures to protect your funds, digital identity, and accounts.
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {report.recommendations.map((rec) => {
            const priorityBadge =
              rec.priority === 'immediate'
                ? 'text-rose-400 font-bold'
                : rec.priority === 'recommended'
                ? 'text-amber-400 font-medium'
                : 'text-slate-400';

            return (
              <div
                key={rec.step}
                className="flex items-start gap-3.5 rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-xs"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80 font-mono font-bold text-xs">
                  {rec.step}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{rec.action}</h4>
                    <span className={`text-[10px] uppercase tracking-wider ${priorityBadge}`}>
                      · {rec.priority}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{rec.rationale}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Limitations & Ethical Disclaimer */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-950/90 p-5 text-xs text-slate-400 space-y-2">
        <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
          Investigation Limitations & Ethical Disclosure
        </h4>
        <ul className="list-disc list-inside space-y-1 text-slate-400/90 leading-relaxed">
          {report.limitations.map((limit, idx) => (
            <li key={idx}>{limit}</li>
          ))}
          <li>
            ScamShield AI operates strictly as an informational research assistant. Its findings are preliminary and depend on public evidence freshness.
          </li>
        </ul>
      </div>
    </div>
  );
};
