/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Plus, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'investigate' | 'demos' | 'engine' | 'safety' | 'about';
  onSelectTab: (tab: 'investigate' | 'demos' | 'engine' | 'safety' | 'about') => void;
  onNewInvestigation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onNewInvestigation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              onSelectTab('investigate');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-left group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 group-hover:border-cyan-600 transition-colors">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white whitespace-nowrap">
              ScamShield AI
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('investigate')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'investigate'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Investigate
          </button>

          <button
            onClick={() => onSelectTab('demos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'demos'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Demo Benchmark
          </button>

          <button
            onClick={() => onSelectTab('engine')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'engine'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Engine
          </button>

          <button
            onClick={() => onSelectTab('safety')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'safety'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Safety Rules
          </button>

          <button
            onClick={() => onSelectTab('about')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'about'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            About & Ethics
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNewInvestigation}
            className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>New Investigation</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          <button
            onClick={() => {
              onSelectTab('investigate');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'investigate' ? 'bg-cyan-950/60 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Investigate
          </button>
          <button
            onClick={() => {
              onSelectTab('demos');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'demos' ? 'bg-cyan-950/60 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Demo Benchmark Scenarios
          </button>
          <button
            onClick={() => {
              onSelectTab('engine');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'engine' ? 'bg-cyan-950/60 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Live Engine & TinyFish Setup
          </button>
          <button
            onClick={() => {
              onSelectTab('safety');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'safety' ? 'bg-cyan-950/60 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Safety Rules & Checklist
          </button>
          <button
            onClick={() => {
              onSelectTab('about');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'about' ? 'bg-cyan-950/60 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            About & Ethics
          </button>
        </div>
      )}
    </header>
  );
};
