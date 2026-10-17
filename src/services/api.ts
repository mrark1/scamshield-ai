/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AnalyzeRequest,
  HealthResponse,
  InvestigationReport,
  DemoScenarioItem,
  TinyFishStatusResponse,
} from '../types/investigation.ts';

/**
 * Client API service for interacting with ScamShield AI server backend.
 * All API keys remain securely on the server.
 */
export async function getHealthStatus(): Promise<HealthResponse> {
  const res = await fetch('/api/health');
  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`);
  }
  return res.json();
}

export async function getDemoScenarios(): Promise<{ scenarios: Array<Omit<DemoScenarioItem, 'report'>> }> {
  const res = await fetch('/api/demo-scenarios');
  if (!res.ok) {
    throw new Error('Failed to load demo scenarios');
  }
  return res.json();
}

export async function getDemoScenarioById(id: string): Promise<DemoScenarioItem> {
  const res = await fetch(`/api/demo-scenarios/${id}`);
  if (!res.ok) {
    throw new Error(`Demo scenario ${id} not found`);
  }
  return res.json();
}

export async function getTinyFishStatus(test = false): Promise<TinyFishStatusResponse> {
  const url = test ? '/api/tinyfish/status?test=true' : '/api/tinyfish/status';
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch TinyFish provider status');
  }
  return res.json();
}

export async function testTinyFishConnectivity(): Promise<TinyFishStatusResponse> {
  const res = await fetch('/api/tinyfish/test', {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('TinyFish connectivity test request failed');
  }
  const data = await res.json();
  return {
    status: data.status,
    instruction:
      'To enable live TinyFish web research, obtain an API key from https://agent.tinyfish.ai/api-keys and set TINYFISH_API_KEY in the server environment.',
  };
}

export async function analyzeSuspiciousContent(
  payload: AnalyzeRequest
): Promise<InvestigationReport> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Investigation failed with HTTP ${res.status}`);
  }

  return data.report;
}
