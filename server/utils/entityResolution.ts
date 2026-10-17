/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EntityMatchStatus,
  InvestigationSource,
  EvidenceBreakdown,
} from '../../src/types/investigation.ts';

export interface EntityContext {
  companyName?: string;
  targetDomain?: string;
  sanitizedUrl?: string;
  location?: string;
}

export interface EntityResolutionResult {
  status: EntityMatchStatus;
  label: string;
  explanation: string;
  isDirectEvidence: boolean;
  nameSimilarity: number;
}

// Known regulatory, governmental, and consumer fraud advisory domains
const REGULATORY_ADVISORY_DOMAINS = [
  'consumer.ftc.gov',
  'ftc.gov',
  'ic3.gov',
  'fbi.gov',
  'cisa.gov',
  'bbb.org/scam-tracker',
  'interpol.int',
  'scamwatch.gov.au',
  'sec.gov',
  'naceweb.org',
  'finra.org',
  'consumerfinance.gov',
  'usa.gov',
];

// Review, forum, and Q&A aggregator domains where name collisions frequently happen
const REVIEW_AND_FORUM_DOMAINS = [
  'ambitionbox.com',
  'quora.com',
  'glassdoor.com',
  'reddit.com',
  'trustpilot.com',
  'mouthshut.com',
  'indeed.com',
  'yelp.com',
  'complaintsboard.com',
  'sitejabber.com',
];

/**
 * Normalizes an entity string for token comparison (lowercase, alphanumeric only).
 */
export function normalizeEntityName(name: string): string {
  if (!name) return '';
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts key distinctive name tokens, filtering out generic corporate suffixes.
 */
export function extractNameTokens(name: string): string[] {
  const genericTokens = new Set([
    'inc',
    'llc',
    'ltd',
    'limited',
    'corp',
    'corporation',
    'co',
    'company',
    'group',
    'solutions',
    'services',
    'technologies',
    'tech',
    'global',
    'international',
    'careers',
    'jobs',
    'hiring',
    'recruitment',
    'foundation',
    'consultancy',
    'consulting',
  ]);

  const rawTokens = normalizeEntityName(name)
    .split(' ')
    .filter((t) => t.length > 1);

  const significant = rawTokens.filter((t) => !genericTokens.has(t));
  return significant.length > 0 ? significant : rawTokens;
}

/**
 * Computes Jaccard token similarity between two names.
 */
export function computeTokenSimilarity(nameA: string, nameB: string): number {
  const tokensA = new Set(extractNameTokens(nameA));
  const tokensB = new Set(extractNameTokens(nameB));

  if (tokensA.size === 0 || tokensB.size === 0) return 0;

  let intersection = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) {
      intersection++;
    } else {
      // Substring root match (e.g., "brightfuture" contains "bright" and "future")
      for (const other of tokensB) {
        if (token.includes(other) || other.includes(token)) {
          intersection += 0.8;
          break;
        }
      }
    }
  }

  const union = new Set([...tokensA, ...tokensB]).size;
  return union > 0 ? Math.min(1, intersection / union) : 0;
}

/**
 * Extracts the base registered domain (e.g. google.com from careers.google.com).
 */
export function getBaseDomain(domainOrUrl: string): string {
  try {
    let hostname = domainOrUrl;
    if (domainOrUrl.includes('://')) {
      hostname = new URL(domainOrUrl).hostname;
    }
    const parts = hostname.toLowerCase().split('.').filter(Boolean);
    if (parts.length <= 2) return parts.join('.');
    // Handle .co.uk, .com.au, .gov.in if needed, default to last 2 parts
    if (parts[parts.length - 2].length <= 3 && parts[parts.length - 1].length <= 3) {
      return parts.slice(-3).join('.');
    }
    return parts.slice(-2).join('.');
  } catch {
    return domainOrUrl.toLowerCase();
  }
}

/**
 * Checks whether a source URL domain matches the investigated target domain.
 */
export function isDomainMatch(sourceUrlOrDomain: string, targetDomainOrUrl?: string): boolean {
  if (!targetDomainOrUrl) return false;
  const baseSource = getBaseDomain(sourceUrlOrDomain);
  const baseTarget = getBaseDomain(targetDomainOrUrl);
  return Boolean(baseSource && baseTarget && baseSource === baseTarget);
}

/**
 * Resolves a search result against the investigated entity.
 * Decides whether the source is:
 * 1. 'general_advisory': Generic regulatory or scam-pattern guidance (FTC, IC3, etc.)
 * 2. 'verified_entity': Directly associated with the investigated entity via matching domain/records
 * 3. 'possible_name_match': Review/forum match where identity cannot be confirmed (e.g. "Bright Future" on AmbitionBox/Quora for "BrightFuture Careers")
 * 4. 'unrelated': No verified connection or unestablished identity
 */
export function resolveEntitySource(
  source: {
    title: string;
    url: string;
    snippet?: string;
    domain?: string;
  },
  entity: EntityContext
): EntityResolutionResult {
  const urlLower = (source.url || '').toLowerCase();
  const domainLower = (source.domain || '').toLowerCase();
  const titleLower = (source.title || '').toLowerCase();
  const snippetLower = (source.snippet || '').toLowerCase();
  const combinedText = `${titleLower} ${snippetLower}`;

  // 1. Check if source is a general regulatory or consumer advisory
  const isRegulatory =
    REGULATORY_ADVISORY_DOMAINS.some((d) => domainLower.includes(d) || urlLower.includes(d)) ||
    titleLower.includes('ftc consumer alert') ||
    titleLower.includes('job scam guidance') ||
    titleLower.includes('scam alert') ||
    titleLower.includes('fake tech internship') ||
    titleLower.includes('how to spot');

  if (isRegulatory) {
    return {
      status: 'general_advisory',
      label: 'General scam-pattern guidance',
      explanation:
        'Official regulatory or consumer protection advisory describing general scam patterns. This is educational guidance, not direct evidence against any specific legal entity.',
      isDirectEvidence: false,
      nameSimilarity: 0,
    };
  }

  // 2. Check if source directly matches the investigated entity's domain
  if (entity.targetDomain && isDomainMatch(source.url, entity.targetDomain)) {
    return {
      status: 'verified_entity',
      label: 'Directly associated entity evidence',
      explanation: `Source URL domain (${getBaseDomain(source.url)}) matches the investigated entity's target domain (${getBaseDomain(entity.targetDomain)}).`,
      isDirectEvidence: true,
      nameSimilarity: 1.0,
    };
  }

  // 3. Name similarity comparison
  const investigatedName = entity.companyName || '';
  const investigatedTokens = extractNameTokens(investigatedName);

  if (investigatedTokens.length > 0) {
    // Check if source belongs to a review/forum aggregator
    const isReviewOrForum = REVIEW_AND_FORUM_DOMAINS.some(
      (d) => domainLower.includes(d) || urlLower.includes(d)
    );

    // Check if tokens match
    const matchingTokens = investigatedTokens.filter((token) => combinedText.includes(token));
    const tokenRatio = matchingTokens.length / investigatedTokens.length;

    // Check exact name match vs partial name match
    const normInvestigated = normalizeEntityName(investigatedName);
    const hasExactNameMention = normInvestigated.length > 3 && combinedText.includes(normInvestigated);

    if (hasExactNameMention && !isReviewOrForum && entity.targetDomain) {
      // Even with exact name mention, if the domain is different and not verified, we must remain cautious
      if (!isDomainMatch(source.url, entity.targetDomain)) {
        return {
          status: 'possible_name_match',
          label: 'Possible name match — identity unverified',
          explanation: `Source mentions "${investigatedName}" but is hosted on an unverified domain (${source.domain || 'external'}). Connection to the investigated entity cannot be conclusively established.`,
          isDirectEvidence: false,
          nameSimilarity: 0.85,
        };
      }
    }

    // Typical review/forum case (e.g. AmbitionBox or Quora for "Bright Future" when querying "BrightFuture Careers")
    if (tokenRatio > 0.4 || hasExactNameMention) {
      return {
        status: 'possible_name_match',
        label: 'Possible name match — identity unverified',
        explanation: `Result from ${source.domain || 'public forum'} discusses a similarly named entity, but legal identity and official domain linkage are not established by the sources retrieved.`,
        isDirectEvidence: false,
        nameSimilarity: tokenRatio,
      };
    }
  }

  // 4. Default to unestablished / unrelated
  return {
    status: 'unrelated',
    label: 'Not established by the sources retrieved',
    explanation: 'No direct domain or confirmed entity record links this source to the investigated submission.',
    isDirectEvidence: false,
    nameSimilarity: 0,
  };
}

/**
 * Builds structured evidence breakdown separating:
 * 1. General scam-pattern guidance
 * 2. Evidence directly associated with the investigated entity
 * 3. Possible but unverified name matches
 * 4. User-provided claims
 * 5. Missing or inconclusive evidence
 */
export function buildEvidenceBreakdown(params: {
  sources: InvestigationSource[];
  userClaims: string[];
  entity: EntityContext;
  hasAdvanceFee?: boolean;
  hasUrgency?: boolean;
}): EvidenceBreakdown {
  const { sources, userClaims, entity, hasAdvanceFee, hasUrgency } = params;

  const generalGuidance: string[] = [];
  const directEntityEvidence: string[] = [];
  const possibleNameMatches: string[] = [];
  const missingOrInconclusive: string[] = [];

  for (const source of sources) {
    const status = source.entityMatchStatus || 'unrelated';
    const sourceRef = `[${source.title}] (${source.domain || source.url})`;

    if (status === 'general_advisory') {
      generalGuidance.push(
        `${sourceRef}: ${source.snippet || 'General scam-pattern advisory on recruitment and advance fees.'}`
      );
    } else if (status === 'verified_entity') {
      directEntityEvidence.push(
        `${sourceRef}: Directly associated with ${entity.targetDomain || entity.companyName}. ${source.snippet || ''}`
      );
    } else if (status === 'possible_name_match') {
      possibleNameMatches.push(
        `${sourceRef}: Possible name match — identity unverified. ${source.snippet || 'Reviews or complaints may refer to a distinct entity with a similar name.'}`
      );
    }
  }

  // If no direct entity records were verified:
  if (directEntityEvidence.length === 0) {
    if (entity.companyName) {
      missingOrInconclusive.push(
        `Corporate registration and legal incorporation for "${entity.companyName}": Not established by the sources retrieved.`
      );
    }
    if (entity.targetDomain) {
      missingOrInconclusive.push(
        `Official operational history for domain "${entity.targetDomain}": Not established by the sources retrieved.`
      );
    } else {
      missingOrInconclusive.push(
        'Official company website or authenticated email domain: Not established by the sources retrieved.'
      );
    }
  }

  // If general guidance is empty, note standard regulatory pattern
  if (generalGuidance.length === 0 && (hasAdvanceFee || hasUrgency)) {
    generalGuidance.push(
      'FTC / IC3 Advisory: Legitimate employers never request advance fees for equipment or recruitment.'
    );
  }

  return {
    generalGuidance,
    directEntityEvidence,
    possibleNameMatches,
    userClaims: [...userClaims],
    missingOrInconclusive,
  };
}

/**
 * Standardized phrasing for missing or inconclusive evidence.
 * Enforces requirement: Never say "does not exist" merely because search returned no result.
 */
export function formatMissingEvidenceStatement(subject: string): string {
  return `${subject}: Not established by the sources retrieved.`;
}
