/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, AlertTriangle, ExternalLink, Ban, CheckCircle, Search, HelpCircle } from 'lucide-react';

export const SafetyGuideView: React.FC = () => {
  const registries = [
    {
      name: 'FTC Scam Reporting Portal',
      region: 'United States',
      url: 'https://reportfraud.ftc.gov/',
      description: 'Official US Federal Trade Commission portal for reporting job, imposter, and identity fraud.',
    },
    {
      name: 'FBI Internet Crime Complaint Center (IC3)',
      region: 'Global / US',
      url: 'https://www.ic3.gov/',
      description: 'Central hub for reporting cyber fraud, crypto task scams, and advance-fee recruitment schemes.',
    },
    {
      name: 'SEC EDGAR Corporate Search',
      region: 'Financial Filings',
      url: 'https://www.sec.gov/edgar/searchedgar/companysearch',
      description: 'Verify if a US company is a legally registered corporate entity with active public filings.',
    },
    {
      name: 'Ministry of Corporate Affairs (MCA)',
      region: 'India',
      url: 'https://www.mca.gov.in/content/mca/global/en/home.html',
      description: 'Search official Master Data of registered Indian companies (CIN/LLPIN records).',
    },
    {
      name: 'UK Companies House Register',
      region: 'United Kingdom',
      url: 'https://find-and-update.company-information.service.gov.uk/',
      description: 'Free public directory of UK company registration details, directors, and filing history.',
    },
    {
      name: 'Better Business Bureau (BBB) Scam Tracker',
      region: 'North America',
      url: 'https://www.bbb.org/scamtracker',
      description: 'Consumer database tracking community reports of employment, delivery, and phishing scams.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span>The ScamShield Digital Verification Playbook</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Practical rules to verify unfamiliar employers, investment platforms, and recruitment messages before sending money or personal records.
        </p>
      </div>

      {/* The 4 Fundamental Verification Laws */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <Ban className="h-4 w-4" />
            <span>Rule 1: Never Pay to Work</span>
          </div>
          <h3 className="text-base font-semibold text-white">Zero Upfront Equipment Fees</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Real companies supply required hardware, software, and training at zero cost to the employee or intern. Any request for a &ldquo;refundable deposit&rdquo;, &ldquo;courier fee&rdquo;, or &ldquo;task unlock charge&rdquo; is an advance-fee scam.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Search className="h-4 w-4" />
            <span>Rule 2: Inspect the Exact Domain</span>
          </div>
          <h3 className="text-base font-semibold text-white">Beware of Lookalike TLDs</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Scammers register domains that mimic legitimate brands (e.g., <code className="text-cyan-300">google-careers-portal.online</code> or <code className="text-cyan-300">apple-hr-global.xyz</code>). Always type the official corporate domain manually into your browser to verify listings.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>Rule 3: Communication Channel Check</span>
          </div>
          <h3 className="text-base font-semibold text-white">Official Corporate Inboxes Only</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Legitimate enterprise recruiters communicate via verified domain emails (e.g. <code className="text-cyan-300">recruiter@company.com</code>). Be extremely wary of recruiters hiring solely via Telegram, WhatsApp, or generic Gmail/Outlook accounts.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Rule 4: Irreversible Payment Channels</span>
          </div>
          <h3 className="text-base font-semibold text-white">No Crypto, Zelle, or Gift Cards</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Legitimate business entities use standard direct payroll deposits or formal corporate checks. They never demand payments via cryptocurrency, Zelle, CashApp, or retail gift cards.
          </p>
        </div>
      </div>

      {/* Official Government & Regulatory Registries */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-cyan-400" />
            <span>Official Corporate & Fraud Registries</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Independent, public records where you can verify company registration numbers and report deceptive outreach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {registries.map((reg, idx) => (
            <a
              key={idx}
              href={reg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 hover:border-cyan-600/50 hover:bg-slate-950 transition-all flex flex-col justify-between space-y-2 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-1">
                  <span>{reg.region}</span>
                  <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {reg.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{reg.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* What to do if you already sent funds */}
      <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-6 space-y-3">
        <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-400" />
          <span>Emergency Steps: If You Already Sent Money or Documents</span>
        </h3>
        <ol className="list-decimal list-inside space-y-1.5 text-xs text-rose-200/90 leading-relaxed">
          <li><strong>Contact Your Bank / Card Issuer Immediately:</strong> Request an urgent fraud recall or freeze on the affected account.</li>
          <li><strong>Freeze Your Credit Reports:</strong> If you shared an SSN, Aadhaar, or national ID, place a credit freeze with Experian, Equifax, or TransUnion.</li>
          <li><strong>File an IC3 / FTC Report:</strong> Submit the scammer&apos;s wallet addresses, phone numbers, and email headers to law enforcement.</li>
          <li><strong>Beware of Recovery Scams:</strong> Anyone who contacts you claiming they can &ldquo;hack back&rdquo; or recover stolen funds for a fee is a secondary scammer.</li>
        </ol>
      </div>
    </div>
  );
};
