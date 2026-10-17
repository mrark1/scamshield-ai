/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Target, HeartHandshake, DollarSign, Layers, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Quote */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-6 md:p-8 text-center space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          Core Operating Principle
        </span>
        <blockquote className="text-xl md:text-2xl font-bold text-white tracking-tight">
          &ldquo;Don&apos;t just label a scam. Investigate the evidence.&rdquo;
        </blockquote>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          ScamShield AI was conceived for the <strong>KRITICAL HACKS &apos;26</strong> hackathon (AI/ML Track) to empower students, interns, and job seekers against sophisticated digital recruitment and financial impersonation schemes.
        </p>
      </div>

      {/* Mission & Problem Statement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Target className="h-4 w-4" />
            <span>The Problem We Solve</span>
          </div>
          <h3 className="text-base font-semibold text-white">The Recruitment Fraud Epidemic</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            College students and remote job seekers face thousands of deceptive offers daily. Existing spam filters often miss newly minted lookalike domains or customized spear-phishing messages. Victims often do not know how to verify corporate registries or cross-reference public warning signs before parting with hard-earned funds.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Our Approach</span>
          </div>
          <h3 className="text-base font-semibold text-white">Evidence-Grounded Intelligence</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rather than making opaque assertions, ScamShield AI extracts factual claims, conducts live web discovery via TinyFish and search engines, isolates unverified claims, and returns an explainable report with clickable citations and actionable safety steps.
          </p>
        </div>
      </div>

      {/* Non-Goals & Ethical Boundaries */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <HeartHandshake className="h-5 w-5 text-rose-400" />
          <span>Ethical Boundaries & Non-Goals</span>
        </h3>
        <p className="text-xs text-slate-400">
          Transparency and user safety govern every architectural decision in ScamShield AI:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="rounded-lg bg-slate-950/70 p-4 border border-slate-800/80 space-y-2 text-xs">
            <h4 className="font-semibold text-slate-200">No Safety Guarantees</h4>
            <p className="text-slate-400 leading-relaxed">
              We never certify a website or company as &ldquo;100% safe&rdquo;. Absence of evidence is not evidence of absence.
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/70 p-4 border border-slate-800/80 space-y-2 text-xs">
            <h4 className="font-semibold text-slate-200">Zero Credential Collection</h4>
            <p className="text-slate-400 leading-relaxed">
              We never request, store, or log passwords, 2FA OTPs, bank credentials, or private identity cards.
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/70 p-4 border border-slate-800/80 space-y-2 text-xs">
            <h4 className="font-semibold text-slate-200">No Defamatory Accusations</h4>
            <p className="text-slate-400 leading-relaxed">
              We highlight specific communication warning signs and conflicting claims without making unverified legal verdicts.
            </p>
          </div>
        </div>
      </div>

      {/* Sustainable Revenue Model */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            <span>Sustainable Revenue Model & Market Strategy</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Designed for viability, balancing free student access with enterprise B2B verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-slate-950/80 p-4 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Tier 1: Freemium</span>
            <h4 className="text-sm font-bold text-white">Student & Community Access</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Free 5 investigations per day for students, job seekers, and everyday consumers. Funded through grants and safety partnerships.
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/80 p-4 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Tier 2: Institutional</span>
            <h4 className="text-sm font-bold text-white">University Campus License</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Annual subscription for university career centers, internship placement cells, and alumni associations with priority queue and campus warning alerts.
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/80 p-4 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">Tier 3: Enterprise B2B</span>
            <h4 className="text-sm font-bold text-white">Job Board Verification API</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              REST API for recruitment portals, freelance boards, and messaging apps to scan inbound job postings before publishing.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture & Stack */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="h-5 w-5 text-cyan-400" />
          <span>Technical Architecture</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded bg-slate-950/80 p-3 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Frontend:</span>
            <span className="font-semibold text-slate-200">React 19 + TypeScript</span>
          </div>
          <div className="rounded bg-slate-950/80 p-3 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Styling:</span>
            <span className="font-semibold text-slate-200">Tailwind CSS 4</span>
          </div>
          <div className="rounded bg-slate-950/80 p-3 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Backend Server:</span>
            <span className="font-semibold text-slate-200">Node.js + Express + TSX</span>
          </div>
          <div className="rounded bg-slate-950/80 p-3 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">AI Model:</span>
            <span className="font-semibold text-slate-200">Gemini 3.8 Flash (@google/genai)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
