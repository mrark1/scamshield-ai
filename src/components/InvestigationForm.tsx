/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Link, Building2, AlertCircle, Sparkles, X, FileSearch } from 'lucide-react';
import { PrivacyBanner } from './PrivacyBanner.tsx';

interface InvestigationFormProps {
  onSubmit: (payload: {
    message: string;
    url?: string;
    companyName?: string;
    category?: string;
  }) => void;
  isLoading: boolean;
  onSelectDemoScenario?: (demoId: string) => void;
}

const CATEGORIES = [
  'Job / Internship Offer',
  'Remote Task / Crypto Arbitrage',
  'Brand Ambassador / Free Product',
  'Tech Support / Refund Notice',
  'Marketplace / Rental Listing',
  'General Suspicious Message',
];

const QUICK_SAMPLES = [
  {
    label: 'Internship Laptop Deposit',
    company: 'NexaCore Global Solutions',
    url: 'https://nexacore-careers-verification.online',
    category: 'Job / Internship Offer',
    text: 'Congratulations! You have been selected for the 8-week Remote Software Engineer Internship at NexaCore Global Solutions (Stipend: $1,200/mo). To finalize your placement and dispatch your company-issued MacBook Pro and testing phone, you must deposit a refundable hardware assurance fee of $250 via Zelle / Crypto to our equipment liaison within 24 hours.',
  },
  {
    label: 'Crypto Daily Task App',
    company: 'OmniGlobal Arbitrage Lab',
    url: 'https://task-arbitrage-cloud.vip',
    category: 'Remote Task / Crypto Arbitrage',
    text: 'Hello! We noticed your profile on LinkedIn. Our company is hiring remote assistants to complete 30-40 micro-tasks per day auditing crypto exchange order books. Daily payout is 150-300 USDT directly to your wallet. You will first need to connect your Web3 wallet and recharge 50 USDT to activate task tier 1.',
  },
  {
    label: 'Brand Ambassador Invite',
    company: 'Lumina Athletic',
    url: 'https://lumina-athletic-club.store',
    category: 'Brand Ambassador / Free Product',
    text: 'Hey! Our PR team loves your aesthetic and wants to sponsor you as an ambassador for our athletic apparel line. We will dispatch 3 free activewear sets ($350 value) and pay $50 per reel. You just cover the $28.50 courier & customs clearance fee on our portal.',
  },
];

export const InvestigationForm: React.FC<InvestigationFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const maxChars = 8000;
  const charsLeft = maxChars - message.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedMsg = message.trim();
    const trimmedUrl = url.trim();

    if (!trimmedMsg && !trimmedUrl) {
      setValidationError('Please paste the suspicious message or enter a target URL to investigate.');
      return;
    }

    if (trimmedUrl) {
      // Basic URL check
      try {
        const testUrl = /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
        new URL(testUrl);
      } catch {
        setValidationError('The entered website URL is not formatted correctly. Example: https://example.com');
        return;
      }
    }

    onSubmit({
      message: trimmedMsg,
      url: trimmedUrl || undefined,
      companyName: companyName.trim() || undefined,
      category,
    });
  };

  const handleApplySample = (sample: (typeof QUICK_SAMPLES)[0]) => {
    setMessage(sample.text);
    setCompanyName(sample.company);
    setUrl(sample.url);
    setCategory(sample.category);
    setValidationError(null);
  };

  const handleClear = () => {
    setMessage('');
    setUrl('');
    setCompanyName('');
    setValidationError(null);
  };

  return (
    <div className="space-y-6">
      {/* Privacy Banner */}
      <PrivacyBanner />

      {/* Main Investigation Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <FileSearch className="h-5 w-5 text-cyan-400" />
              <span>Launch Evidence-Based Investigation</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Submit the communication text, recruiter email, or website link to extract claims and query public records.
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Load sample:</span>
            {QUICK_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplySample(sample)}
                className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-colors"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Validation Error Message */}
          {validationError && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 p-3.5 text-xs text-rose-300 flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="suspiciousMessage" className="block text-xs font-medium text-slate-300">
                Suspicious Message / Email Body / Offer Text <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                {message && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                  >
                    <X className="h-3 w-3" /> Clear
                  </button>
                )}
                <span
                  className={`text-xs tabular-nums ${
                    charsLeft < 200 ? 'text-amber-400 font-semibold' : 'text-slate-500'
                  }`}
                >
                  {charsLeft.toLocaleString()} chars left
                </span>
              </div>
            </div>

            <textarea
              id="suspiciousMessage"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
              placeholder="Paste the suspicious WhatsApp message, LinkedIn recruitment DM, internship acceptance letter, investment task pitch, or refund email here..."
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50 font-sans resize-y"
            />
          </div>

          {/* Optional Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Website URL */}
            <div className="space-y-1.5">
              <label htmlFor="targetUrl" className="block text-xs font-medium text-slate-300">
                Target Website / Domain <span className="text-slate-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Link className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  id="targetUrl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example-careers.online"
                  disabled={isLoading}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/80 pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50 font-mono"
                />
              </div>
            </div>

            {/* Company / Recruiter Name */}
            <div className="space-y-1.5">
              <label htmlFor="companyName" className="block text-xs font-medium text-slate-300">
                Company / Sender Name <span className="text-slate-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Building2 className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. NexaCore Global"
                  disabled={isLoading}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/80 pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div className="space-y-1.5">
              <label htmlFor="category" className="block text-xs font-medium text-slate-300">
                Offer Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Live queries search public indices, fraud registries, and domain history records.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Investigating Evidence...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Run ScamShield Investigation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
