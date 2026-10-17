/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RiskCategory =
  | 'HIGH CONCERN'
  | 'NEEDS VERIFICATION'
  | 'FEWER WARNING SIGNS FOUND'
  | 'INSUFFICIENT EVIDENCE';

export type RiskLevel =
  | 'high_concern'
  | 'needs_verification'
  | 'fewer_warning_signs_found'
  | 'insufficient_evidence';

export type EntityMatchStatus =
  | 'verified_entity'
  | 'possible_name_match'
  | 'general_advisory'
  | 'unrelated';

export interface InvestigationSource {
  title: string;
  url: string;
  snippet?: string;
  domain?: string;
  relevanceScore?: number;
  verifiedAt?: string;
  entityMatchStatus?: EntityMatchStatus;
  matchLabel?: string;
  matchExplanation?: string;
}

export interface EvidenceBreakdown {
  generalGuidance: string[];
  directEntityEvidence: string[];
  possibleNameMatches: string[];
  userClaims: string[];
  missingOrInconclusive: string[];
}

export interface WarningSign {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  explanation: string;
  detectedPattern?: string;
}

export interface Observation {
  label: string;
  detail: string;
  verified: boolean;
}

export interface UnverifiedClaim {
  claim: string;
  reasonNotVerified: string;
  riskImplication: string;
}

export interface Recommendation {
  step: number;
  action: string;
  priority: 'immediate' | 'recommended' | 'informational';
  rationale: string;
}

export interface ProviderInfo {
  tinyfishConfigured: boolean;
  tinyfishUsed: boolean;
  geminiUsed: boolean;
  searchQueriesExecuted: string[];
  rawProvider?: string;
  statusNote?: string;
  isDemo?: boolean;
}

export interface InvestigationReport {
  id: string;
  timestamp: string;
  inputSummary: {
    messageSnippet: string;
    url?: string;
    companyName?: string;
    category?: string;
  };
  riskCategory: RiskCategory;
  riskLevel: RiskLevel;
  confidenceNote: string;
  summary: string;
  userClaims?: string[];
  observedEvidence?: string[];
  evidenceBreakdown?: EvidenceBreakdown;
  observations: Observation[];
  warningSigns: WarningSign[];
  unverifiedClaims: UnverifiedClaim[];
  sources: InvestigationSource[];
  recommendations: Recommendation[];
  limitations: string[];
  isDemo: boolean;
  providerInfo: ProviderInfo;
}

export interface AnalyzeRequest {
  message: string;
  url?: string;
  companyName?: string;
  category?: string;
  isDemo?: boolean;
  demoId?: string;
}

export interface HealthResponse {
  status: 'ok' | 'degraded';
  tinyfishConfigured: boolean;
  geminiConfigured: boolean;
  environment: string;
  timestamp: string;
}

export interface DemoScenarioItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  expectedRisk: RiskCategory;
  sampleMessage: string;
  sampleUrl?: string;
  sampleCompany?: string;
  report: InvestigationReport;
}

export type TinyFishConnectivityState =
  | 'missing_key'
  | 'untested'
  | 'connected'
  | 'auth_failed'
  | 'provider_error'
  | 'timeout';

export interface TinyFishConnectivityStatus {
  keyConfigured: boolean;
  connectivityState: TinyFishConnectivityState;
  searchEndpoint: string;
  fetchEndpoint: string;
  lastTestedAt: string | null;
  lastLatencyMs: number | null;
  lastError: string | null;
  message: string;
}

export interface TinyFishStatusResponse {
  status: TinyFishConnectivityStatus;
  instruction: string;
}
