/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { validateAndSanitizeUrl } from '../utils/security.ts';

export interface TinyFishSearchResult {
  title: string;
  url: string;
  snippet?: string;
  score?: number;
  siteName?: string;
  position?: number;
  publishedDate?: string;
}

export interface TinyFishSearchResponse {
  query: string;
  results: TinyFishSearchResult[];
  provider: 'tinyfish';
  totalResults: number;
  executionTimeMs: number;
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

export class TinyFishConfigurationError extends Error {
  constructor(message = 'TINYFISH_API_KEY environment variable is not configured on the server.') {
    super(message);
    this.name = 'TinyFishConfigurationError';
  }
}

export class TinyFishUpstreamError extends Error {
  status?: number;
  isAuthError: boolean;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'TinyFishUpstreamError';
    this.status = status;
    this.isAuthError = status === 401 || status === 403;
  }
}

/**
 * Server-side TinyFish Live-Web Research Service.
 * Implements the official TinyFish Search and Fetch API specifications:
 * - Search API: GET https://api.search.tinyfish.ai with X-API-Key header
 * - Fetch API: POST https://api.fetch.tinyfish.ai with X-API-Key header
 * Never exposes credentials to the browser or logs full API keys.
 */
export class TinyFishService {
  private apiKey: string | undefined;
  private searchBaseUrl: string;
  private fetchBaseUrl: string;
  private lastTestResult: {
    state: TinyFishConnectivityState;
    timestamp: string | null;
    latencyMs: number | null;
    error: string | null;
  } = {
    state: 'untested',
    timestamp: null,
    latencyMs: null,
    error: null,
  };

  constructor() {
    this.apiKey = process.env.TINYFISH_API_KEY?.trim();

    // Official dedicated endpoints from TinyFish API documentation
    const customBase = process.env.TINYFISH_BASE_URL?.trim().replace(/\/+$/, '');
    this.searchBaseUrl =
      process.env.TINYFISH_SEARCH_URL?.trim().replace(/\/+$/, '') ||
      (customBase ? `${customBase}/search` : 'https://api.search.tinyfish.ai');

    this.fetchBaseUrl =
      process.env.TINYFISH_FETCH_URL?.trim().replace(/\/+$/, '') ||
      (customBase ? `${customBase}/fetch` : 'https://api.fetch.tinyfish.ai');
  }

  /**
   * Refreshes the API key from process.env (useful for testing or dynamic secret injection).
   */
  public reloadConfig(): void {
    this.apiKey = process.env.TINYFISH_API_KEY?.trim();
  }

  /**
   * Checks whether a non-empty API key is present in environment variables.
   */
  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  /**
   * Returns current honest provider status without falsely claiming connectivity.
   */
  public getStatus(): TinyFishConnectivityStatus {
    const configured = this.isConfigured();
    const effectiveState = !configured
      ? 'missing_key'
      : this.lastTestResult.state;

    let message = '';
    switch (effectiveState) {
      case 'missing_key':
        message = 'TINYFISH_API_KEY is not set in server environment. Configure your key in .env or secrets to enable live TinyFish search.';
        break;
      case 'untested':
        message = 'TINYFISH_API_KEY is configured in the environment, but live endpoint connectivity has not yet been verified.';
        break;
      case 'connected':
        message = `TinyFish API verified active (Search endpoint responded successfully in ${this.lastTestResult.latencyMs}ms).`;
        break;
      case 'auth_failed':
        message = `TinyFish authentication failed (401/403). Please verify that your TINYFISH_API_KEY is valid.`;
        break;
      case 'timeout':
        message = 'TinyFish API connection timed out. Check network access or upstream status.';
        break;
      case 'provider_error':
        message = `TinyFish API error: ${this.lastTestResult.error || 'Upstream service error'}`;
        break;
    }

    return {
      keyConfigured: configured,
      connectivityState: effectiveState,
      searchEndpoint: this.searchBaseUrl,
      fetchEndpoint: this.fetchBaseUrl,
      lastTestedAt: this.lastTestResult.timestamp,
      lastLatencyMs: this.lastTestResult.latencyMs,
      lastError: this.lastTestResult.error,
      message,
    };
  }

  /**
   * Performs an actual live verification request against the official TinyFish Search API.
   * Updates internal connectivity state. Does NOT fabricate success if key is missing.
   */
  public async testConnectivity(): Promise<TinyFishConnectivityStatus> {
    this.reloadConfig();

    if (!this.isConfigured()) {
      this.lastTestResult = {
        state: 'missing_key',
        timestamp: new Date().toISOString(),
        latencyMs: null,
        error: 'TINYFISH_API_KEY is not configured',
      };
      return this.getStatus();
    }

    const start = Date.now();
    try {
      // Lightweight test query as per official TinyFish Search API contract
      const testQuery = 'scam alert verification';
      const searchResponse = await this.search(testQuery, {
        limit: 1,
        timeoutMs: 8000,
        purpose: 'Connectivity health check for ScamShield AI',
      });

      this.lastTestResult = {
        state: 'connected',
        timestamp: new Date().toISOString(),
        latencyMs: Date.now() - start,
        error: null,
      };
    } catch (err: any) {
      const latencyMs = Date.now() - start;
      if (err instanceof TinyFishUpstreamError && err.isAuthError) {
        this.lastTestResult = {
          state: 'auth_failed',
          timestamp: new Date().toISOString(),
          latencyMs,
          error: err.message,
        };
      } else if (err.message && err.message.toLowerCase().includes('timed out')) {
        this.lastTestResult = {
          state: 'timeout',
          timestamp: new Date().toISOString(),
          latencyMs,
          error: err.message,
        };
      } else {
        this.lastTestResult = {
          state: 'provider_error',
          timestamp: new Date().toISOString(),
          latencyMs,
          error: err.message || 'Unknown provider error',
        };
      }
    }

    return this.getStatus();
  }

  /**
   * Execute a live search query via the official TinyFish Search API.
   * Contract:
   * - Method: GET
   * - Endpoint: https://api.search.tinyfish.ai?query=...&num_results=...&purpose=...
   * - Header: X-API-Key: <apiKey>
   */
  public async search(
    query: string,
    options: {
      limit?: number;
      timeoutMs?: number;
      purpose?: string;
      domainType?: 'web' | 'news';
    } = {}
  ): Promise<TinyFishSearchResponse> {
    this.reloadConfig();

    if (!this.isConfigured()) {
      throw new TinyFishConfigurationError(
        'TINYFISH_API_KEY environment variable is missing on the server. Configure TINYFISH_API_KEY to enable live TinyFish searches.'
      );
    }

    const startTime = Date.now();
    const limit = Math.min(Math.max(options.limit || 5, 1), 20);
    const timeoutMs = options.timeoutMs || 10000;
    const purpose = (options.purpose || 'Investigate suspicious digital claim for scam indicators').slice(0, 1000);
    const domainType = options.domainType || 'web';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      // Build query string according to official GET spec
      const url = new URL(this.searchBaseUrl);
      url.searchParams.set('query', query.trim());
      url.searchParams.set('num_results', String(limit));
      url.searchParams.set('purpose', purpose);
      url.searchParams.set('domain_type', domainType);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'X-API-Key': this.apiKey as string,
          Accept: 'application/json',
          'User-Agent': 'ScamShield-AI/1.0',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorBody = '';
        try {
          errorBody = await response.text();
        } catch {
          // ignore
        }

        if (response.status === 401 || response.status === 403) {
          throw new TinyFishUpstreamError(
            `TinyFish authentication failed (HTTP ${response.status}). Verify your TINYFISH_API_KEY in server environment.`,
            response.status
          );
        } else if (response.status === 429) {
          throw new TinyFishUpstreamError(
            'TinyFish API rate limit exceeded. Please wait before retrying.',
            429
          );
        } else {
          throw new TinyFishUpstreamError(
            `TinyFish Search API responded with HTTP ${response.status}: ${errorBody.slice(0, 300)}`,
            response.status
          );
        }
      }

      const rawData = await response.json();
      const normalized = this.normalizeSearchResponse(query, rawData, Date.now() - startTime);

      // Update connectivity state on successful response
      this.lastTestResult = {
        state: 'connected',
        timestamp: new Date().toISOString(),
        latencyMs: normalized.executionTimeMs,
        error: null,
      };

      return normalized;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new TinyFishUpstreamError(`TinyFish search timed out after ${timeoutMs}ms.`);
      }
      if (err instanceof TinyFishUpstreamError || err instanceof TinyFishConfigurationError) {
        throw err;
      }
      throw new TinyFishUpstreamError(`Failed to connect to TinyFish Search API: ${err.message}`);
    }
  }

  /**
   * Targeted page inspection via official TinyFish Fetch API.
   * Contract:
   * - Method: POST
   * - Endpoint: https://api.fetch.tinyfish.ai
   * - Header: X-API-Key: <apiKey>, Content-Type: application/json
   * - Body: { urls: [url], format: "markdown", purpose: "..." }
   */
  public async fetchPage(
    targetUrl: string,
    options: { timeoutMs?: number; purpose?: string } = {}
  ): Promise<{
    url: string;
    finalUrl?: string;
    title?: string;
    description?: string;
    text?: string;
    statusCode?: number;
    error?: string;
  }> {
    // 1. SSRF validation check
    const check = validateAndSanitizeUrl(targetUrl);
    if (!check.isValid || !check.sanitizedUrl) {
      return { url: targetUrl, error: check.error || 'Disallowed target URL' };
    }

    this.reloadConfig();
    if (!this.isConfigured()) {
      return {
        url: check.sanitizedUrl,
        error: 'TinyFish API key is not configured. Live page inspection skipped.',
      };
    }

    const timeoutMs = options.timeoutMs || 10000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(this.fetchBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey as string,
          Accept: 'application/json',
          'User-Agent': 'ScamShield-AI/1.0',
        },
        body: JSON.stringify({
          urls: [check.sanitizedUrl],
          format: 'markdown',
          purpose: options.purpose || 'Target page inspection to verify employment or company claims',
          ttl: 0, // live fetch
          per_url_timeout_ms: timeoutMs,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return {
          url: check.sanitizedUrl,
          statusCode: response.status,
          error: `Fetch API returned HTTP ${response.status}`,
        };
      }

      const data = await response.json();

      // Check results array
      if (Array.isArray(data.results) && data.results.length > 0) {
        const first = data.results[0];
        return {
          url: check.sanitizedUrl,
          finalUrl: first.final_url || first.url,
          title: first.title || '',
          description: first.description || '',
          text: (first.text || '').slice(0, 3000), // preserve clean text excerpt
          statusCode: first.status || 200,
        };
      }

      // Check errors array
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        return {
          url: check.sanitizedUrl,
          error: data.errors[0]?.message || 'Page fetch reported error from provider',
        };
      }

      return {
        url: check.sanitizedUrl,
        error: 'No extraction data returned by TinyFish Fetch API',
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      return {
        url: check.sanitizedUrl,
        error: err.name === 'AbortError' ? 'Page fetch timed out' : err.message,
      };
    }
  }

  /**
   * Normalizes raw TinyFish search response into the internal ScamShield contract.
   * Handles official schema fields:
   * - results[i].title
   * - results[i].url
   * - results[i].snippet
   * - results[i].site_name
   * - results[i].position
   * - results[i].publication_date
   */
  public normalizeSearchResponse(
    query: string,
    rawData: any,
    executionTimeMs: number
  ): TinyFishSearchResponse {
    const results: TinyFishSearchResult[] = [];
    const items = Array.isArray(rawData?.results)
      ? rawData.results
      : Array.isArray(rawData?.data)
      ? rawData.data
      : [];

    for (const item of items) {
      if (!item || typeof item !== 'object') continue;
      const url = item.url || item.link;
      const title = item.title || item.heading || 'Web Source';
      const snippet = item.snippet || item.text || item.summary;

      if (url && typeof url === 'string') {
        results.push({
          position: typeof item.position === 'number' ? item.position : results.length + 1,
          title: String(title).slice(0, 250),
          url: String(url),
          snippet: snippet ? String(snippet).slice(0, 800) : undefined,
          siteName: item.site_name || this.extractHostname(url),
          publishedDate: item.publication_date || item.date,
          score: typeof item.score === 'number' ? item.score : undefined,
        });
      }
    }

    return {
      query,
      results,
      provider: 'tinyfish',
      totalResults: typeof rawData?.total_results === 'number' ? rawData.total_results : results.length,
      executionTimeMs,
    };
  }

  private extractHostname(urlStr: string): string {
    try {
      return new URL(urlStr).hostname;
    } catch {
      return 'web';
    }
  }
}

export const tinyfishService = new TinyFishService();
