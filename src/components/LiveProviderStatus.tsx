/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Server,
  ShieldCheck,
  Key,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Globe,
  Activity,
  AlertOctagon,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { getHealthStatus, getTinyFishStatus, testTinyFishConnectivity } from '../services/api.ts';
import { HealthResponse, TinyFishStatusResponse } from '../types/investigation.ts';

export const LiveProviderStatus: React.FC = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [tinyFishInfo, setTinyFishInfo] = useState<TinyFishStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [testingConnectivity, setTestingConnectivity] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const [h, tf] = await Promise.all([getHealthStatus(), getTinyFishStatus(false)]);
      setHealth(h);
      setTinyFishInfo(tf);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch provider status');
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnectivity = async () => {
    setTestingConnectivity(true);
    setError(null);
    try {
      const res = await testTinyFishConnectivity();
      setTinyFishInfo(res);
    } catch (err: any) {
      setError(err.message || 'Connectivity test encountered an error');
    } finally {
      setTestingConnectivity(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const getConnectivityBadge = (state?: string) => {
    switch (state) {
      case 'connected':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/40 px-2.5 py-1 rounded">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Connected & Verified
          </span>
        );
      case 'auth_failed':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/50 border border-rose-500/40 px-2.5 py-1 rounded">
            <AlertOctagon className="h-3.5 w-3.5" />
            Authentication Failed (401/403)
          </span>
        );
      case 'timeout':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/40 px-2.5 py-1 rounded">
            <Clock className="h-3.5 w-3.5" />
            Connection Timed Out
          </span>
        );
      case 'provider_error':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/50 border border-rose-500/40 px-2.5 py-1 rounded">
            <AlertTriangle className="h-3.5 w-3.5" />
            Provider Error
          </span>
        );
      case 'untested':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-500/40 px-2.5 py-1 rounded">
            <Activity className="h-3.5 w-3.5" />
            Key Configured (Untested)
          </span>
        );
      case 'missing_key':
      default:
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/40 px-2.5 py-1 rounded">
            <AlertTriangle className="h-3.5 w-3.5" />
            API Key Missing
          </span>
        );
    }
  };

  const status = tinyFishInfo?.status;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Server className="h-5 w-5 text-cyan-400" />
            <span>Research Engine & Provider Integration</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time status of server-side research providers, verified API contracts, and security safeguards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchStatus}
            disabled={loading || testingConnectivity}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Grid of Providers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TinyFish Provider Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-950/60 border border-cyan-800 text-cyan-400">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">TinyFish Live-Web Research</h3>
                  <p className="text-xs text-slate-400">Official Search & Fetch API Client</p>
                </div>
              </div>

              {getConnectivityBadge(status?.connectivityState)}
            </div>

            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                TinyFish conducts deep public-web discovery to uncover recent scam advisories, employer legitimacy signals, and domain history records.
              </p>

              {/* Status Message */}
              {status?.message && (
                <div className="rounded-lg bg-slate-950/90 p-3 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-slate-200">Current Status:</span>
                  <p className="text-slate-400 leading-relaxed">{status.message}</p>
                </div>
              )}

              {/* API Contract Details */}
              <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800/80 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Search API (GET):</span>
                  <span className="text-slate-200">{status?.searchEndpoint || 'https://api.search.tinyfish.ai'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Fetch API (POST):</span>
                  <span className="text-slate-200">{status?.fetchEndpoint || 'https://api.fetch.tinyfish.ai'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Auth Header:</span>
                  <span className="text-cyan-400">X-API-Key: &lt;secret&gt;</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>TINYFISH_API_KEY:</span>
                  <span className={status?.keyConfigured ? 'text-emerald-400' : 'text-amber-400'}>
                    {status?.keyConfigured ? 'Configured in server env' : 'Not Set'}
                  </span>
                </div>
                {status?.lastLatencyMs !== null && status?.lastLatencyMs !== undefined && (
                  <div className="flex justify-between text-slate-400">
                    <span>Round-trip Latency:</span>
                    <span className="text-slate-200 tabular-nums">{status.lastLatencyMs}ms</span>
                  </div>
                )}
                {status?.lastTestedAt && (
                  <div className="flex justify-between text-slate-400">
                    <span>Last Connectivity Check:</span>
                    <span className="text-slate-200 tabular-nums">
                      {new Date(status.lastTestedAt).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Test Connectivity Action & Setup Guide */}
          <div className="space-y-3">
            <button
              onClick={handleTestConnectivity}
              disabled={testingConnectivity}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-600/90 px-3.5 py-2 text-xs font-semibold text-white hover:bg-cyan-500 transition-colors disabled:opacity-50"
            >
              <Activity className={`h-4 w-4 ${testingConnectivity ? 'animate-spin' : ''}`} />
              <span>{testingConnectivity ? 'Testing Real Endpoint...' : 'Verify TinyFish Live Connectivity'}</span>
            </button>

            <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white flex items-center gap-1.5">
                  <Key className="h-4 w-4 text-cyan-400" />
                  <span>How to Obtain & Configure TinyFish Key</span>
                </h4>
                <a
                  href="https://agent.tinyfish.ai/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-[11px] flex items-center gap-1"
                >
                  <span>Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                <li>Create an account at <a href="https://agent.tinyfish.ai/api-keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">agent.tinyfish.ai/api-keys</a>.</li>
                <li>Add <code className="text-cyan-300 font-mono">TINYFISH_API_KEY=your_key_here</code> to your environment or server <code className="text-cyan-300 font-mono">.env</code>.</li>
                <li>Restart server, then click &ldquo;Verify TinyFish Live Connectivity&rdquo; above.</li>
              </ol>
              <p className="text-[11px] text-slate-500 pt-1 italic">
                *Honest Architecture: ScamShield AI never fakes TinyFish search responses. When the key is missing or invalid, live research transparently uses server-side Gemini Search grounding with accurate provider labeling.
              </p>
            </div>
          </div>
        </div>

        {/* Server-Side Gemini Analysis Engine */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-950/60 border border-cyan-800 text-cyan-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Gemini Analysis Engine</h3>
                  <p className="text-xs text-slate-400">@google/genai TypeScript SDK</p>
                </div>
              </div>

              {health?.geminiConfigured ? (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-2.5 py-1 rounded">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Active
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-500/40 px-2.5 py-1 rounded">
                  Key Missing
                </span>
              )}
            </div>

            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                Server-side analysis performs evidence synthesis, identifying warning signs, separating facts from inference, and enforcing the four calibrated risk categories.
              </p>

              <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800/80 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Model:</span>
                  <span className="text-slate-200">gemini-3.8-flash</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Execution Boundary:</span>
                  <span className="text-emerald-400">Strictly Server-Side (Zero Client Leak)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Header Telemetry:</span>
                  <span className="text-slate-200">User-Agent: aistudio-build</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Fallback Role:</span>
                  <span className="text-cyan-400">Automated Search Grounding & Synthesis</span>
                </div>
              </div>
            </div>
          </div>

          {/* SSRF & Security Isolation Layer */}
          <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-semibold text-white flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-cyan-400" />
              <span>SSRF & Security Isolation Layer</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Target URLs submitted for investigation are strictly validated before outbound requests. Access to loopback addresses, link-local IPs, private subnets (10.0.0.0/8, 192.168.0.0/16), and cloud metadata endpoints (169.254.169.254) is blocked at the gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
