# ScamShield AI — Evidence-Based Scam Investigation Engine

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20%7C%207.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/Gemini%203.8%20Flash-Google%20GenAI-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![TinyFish](https://img.shields.io/badge/TinyFish-Live%20Web%20Research-00E5FF)](https://agent.tinyfish.ai/)
[![Tests](https://img.shields.io/badge/Tests-21%20Passed-22C55E)](#testing--verification)

> **KRITICAL HACKS ’26 Submission** | Track: AI / Cybersecurity / Web Innovation  
> **Core Principle**: *"Don't just detect the warning. Investigate the evidence."*

---

## Important Responsible-Use Disclaimer

**ScamShield AI provides automated, evidence-grounded risk assessments. It does not certify that any website, organization, or message is 100% safe, nor does it make definitive legal declarations of fraud.** 

All conclusions represent automated heuristics and live web cross-checks designed to assist users in making informed decisions. **Never enter passwords, banking credentials, or one-time passcodes (OTPs) into ScamShield AI.**

---

## Problem Statement & Real-World Impact

Online scams targeting students, job seekers, and digital freelancers have grown increasingly sophisticated:
- **Advance-Fee Job & Internship Scams**: Threat actors impersonate legitimate enterprises or invent shell companies, directing candidates through fabricated interview processes before demanding upfront fees for "equipment assurance deposits," "visa paperwork," or "mandatory screening kits."
- **Lookalike Domains & Brand Spoofing**: Typosquatting domains (e.g., `amazon-careers-verification.net`) trick candidates into providing private identity records or paying non-refundable fees.
- **Surface-Level AI Hallucination**: Traditional chatbots often guess or hallucinate legitimacy when prompted about obscure entities because they lack live access to public web registries and domain histories.

### Proposed Solution

**ScamShield AI** bridges this gap by coupling **real-time live web research (TinyFish)** with **evidence-grounded AI synthesis (Gemini 3.8 Flash)**. Instead of returning an arbitrary risk score, ScamShield AI:
1. Gathers empirical evidence directly from live search engines and public web registries.
2. Distinctly separates what the *user claimed* from what was *empirically observed online*.
3. Explicitly flags *unverified claims* where public records are sparse or absent.
4. Categorizes findings into four transparent, disciplined risk tiers with actionable verification playbooks.

---

## Core Features & Four Risk Categories

### The Four Risk Categories

| Risk Category | Color Code | Trigger Criteria & Meaning | Action Recommendation |
| :--- | :--- | :--- | :--- |
| **HIGH CONCERN** | Red / Crimson | Definitive scam indicators detected: upfront payment requests for equipment/training, cryptocurrency/wire demands, domain typosquatting, or impersonation warnings. | Immediately cease contact. Do not send funds, banking details, or identity documents. |
| **NEEDS VERIFICATION** | Amber / Orange | Inconsistencies detected: mismatched official email domains, recent registration anomalies, or unconfirmed corporate claims. | Verify independently through official switchboards, corporate registries, or school career centers. |
| **FEWER WARNING SIGNS FOUND** | Emerald / Green | Established web presence, verified domains (e.g., `.edu` or accredited entities), and typical corporate hiring procedures without advance-fee demands. | Proceed cautiously through standard verification; monitor for sudden payment or routing changes. |
| **INSUFFICIENT EVIDENCE** | Slate / Gray | Entity or URL has virtually no verifiable digital footprint or public presence; insufficient records to confirm or refute. | Treat with extreme caution. Request verifiable credentials before proceeding. |

### Key Capabilities

- **Strict Entity Resolution & Attribution**: Compares exact name, official domain, location, and corporate registry before attributing reviews, complaints, or fraud reports. Results from review platforms (e.g. AmbitionBox, Quora) for similarly named companies are strictly labeled **"Possible name match — identity unverified"**.
- **Evidence-Integrity Framework (5-Part Separation)**:
  1. *Directly Associated Entity Evidence*: Sources confirmed via matching target domain or corporate filing.
  2. *Possible Name Matches (Identity Unverified)*: Reviews or discussions of similarly named organizations where legal linkage is unconfirmed.
  3. *General Scam-Pattern Guidance*: Official regulatory advisories (FTC, IC3, FBI) describing scam patterns; explicitly separated from direct company evidence.
  4. *Missing or Inconclusive Evidence*: Accurately stated as **"Not established by the sources retrieved"** (never claiming records "do not exist").
  5. *User-Provided Claims*: Transparently tracked claims submitted by the user.
- **Offer-Risk Decoupling**: For offers demanding upfront fees or using manufactured urgency, HIGH CONCERN evaluates the inherent risk of the offer itself, not a legally established finding that the named company is fraudulent.
- **Live Multi-Query Web Search**: Uses TinyFish Search API to discover company registries, BBB/scam report boards, LinkedIn presence, and domain history.
- **Deep Page Content Fetching**: Uses TinyFish Fetch API with strict SSRF filtering to inspect target domain contents.
- **Safe Demo Benchmark Suite**: 4 pre-calculated, realistic benchmark scenarios (Internship Deposit, Ambiguous Startup, Academic Fellowship, Brand Ambassador) clearly labeled with prominent `DEMO` banners so evaluations never masquerade as live web research.
- **Privacy & SSRF Guards**: Built-in sanitization blocks private RFC1918 subnets, cloud metadata IPs (`169.254.169.254`), localhost, and sensitive credit card/banking numbers.
- **Audit Tools**: Export full reports in JSON format or copy executive summaries directly to clipboard.

---

## Architecture & Request Flow

```
                      +-----------------------------+
                      |   Client Web Application    |
                      | (React 19 + Tailwind CSS)   |
                      +--------------+--------------+
                                     |
                          POST /api/analyze
                                     |
                                     v
                      +-----------------------------+
                      |       Express Server        |
                      |  (server.ts / server/...)   |
                      +--------------+--------------+
                                     |
               +---------------------+---------------------+
               |                                           |
               v                                           v
    [SSRF & Input Defense]                    [Sensitive Pattern Filter]
    - Block 127.0.0.1, 10.0.0.0/8             - Redact credit cards/SSNs
    - Block 169.254.169.254                   - Enforce character limits
               |                                           |
               +---------------------+---------------------+
                                     |
                                     v
                  +--------------------------------------+
                  |      TinyFish Research Engine        |
                  |     (server/services/tinyfish.ts)    |
                  +------------------+-------------------+
                                     |
                 +-------------------+-------------------+
                 | (If Configured)                       | (If Unavailable)
                 v                                       v
      +----------------------+               +-----------------------+
      | TinyFish Search API  |               | Gemini Search Tool    |
      | TinyFish Fetch API   |               | Grounding Fallback    |
      +----------+-----------+               +-----------+-----------+
                 |                                       |
                 +-------------------+-------------------+
                                     |
                                     v
                  +--------------------------------------+
                  |        Gemini 3.8 Flash Engine       |
                  |     (server/services/analysis.ts)    |
                  | - Prompt injection defanging         |
                  | - Evidence vs. Claim categorization  |
                  | - Uncertainty & risk categorization  |
                  +------------------+-------------------+
                                     |
                                     v
                  +--------------------------------------+
                  |     Structured Investigation Report   |
                  +--------------------------------------+
```

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React (accessible icons), Motion
- **Backend**: Node.js, Express 4.21, TypeScript (`tsx` runner), Dotenv
- **AI & Synthesis Engine**: `@google/genai` (Gemini 3.8 Flash with structured schema extraction)
- **Live Search & Fetch Provider**: TinyFish API (`https://api.search.tinyfish.ai` & `https://api.fetch.tinyfish.ai`)
- **Build Tooling & Testing**: Vite 8, Custom TypeScript test runner (`server/tests/runTests.ts`)

---

## Prerequisites & Local Setup

### Prerequisites
- **Node.js**: v20+ or v22+
- **npm** or **bun**

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/scamshield-ai.git
cd scamshield-ai

# Install dependencies using package.json
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your API credentials:

```ini
# Required: Gemini API key for evidence synthesis
# Obtain from Google AI Studio: https://aistudio.google.com/
GEMINI_API_KEY="your_actual_gemini_api_key"

# Recommended: TinyFish API key for live public web research
# Obtain from the TinyFish portal: https://agent.tinyfish.ai/api-keys
TINYFISH_API_KEY="your_actual_tinyfish_api_key"

# Optional port setting (defaults to 3000)
PORT=3000
```

> **Note**: If `TINYFISH_API_KEY` is not provided, ScamShield AI honestly identifies this status in the UI (`/api/tinyfish/status`) and falls back to server-side Gemini Search grounding so the application remains fully functional.

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## Build & Production Deployment

To create an optimized production build:

```bash
# Build frontend assets to /dist
npm run build

# Start the full-stack server
npm run start
```

---

## Testing & Verification

ScamShield AI includes an automated test suite verifying security boundaries, normalization logic, and categorization stability:

```bash
# Run all 26 automated tests
npm test

# Run TypeScript syntax and type checks
npm run lint
```

### Automated Test Coverage (26 Tests)
1. **SSRF & URL Filtering**: Rejection of localhost, 127.0.0.1, RFC1918 private subnets, cloud metadata IPs (`169.254.169.254`), and non-HTTP protocols.
2. **Credential Sanitization**: Identification of raw card numbers and credential leaks.
3. **TinyFish Normalization**: Accurate parsing of Search results and source attribution preservation.
4. **Error Handling**: Graceful classification of HTTP 401/403 auth errors and network timeouts.
5. **Scenario Categorization**: Evidence-grounded assignment of all four risk levels.
6. **Prompt-Injection Defense**: Defanging adversarial injection tokens in untrusted input.
7. **Model Resilience**: Safe fallback parsing for malformed model JSON outputs.
8. **Entity Resolution (Same-Name Organizations)**: Strict labeling of reviews/complaints as "Possible name match — identity unverified" when legal identity is unconfirmed.
9. **Unrelated Company Reviews**: Verification that reviews from platforms (AmbitionBox, Quora) for similarly named entities are not attributed as direct evidence.
10. **Generic Advisory Isolation**: Ensures regulatory guidance (FTC, IC3) is classified as general guidance, never direct evidence against an entity.
11. **Evidence Honesty**: Guarantees missing company details are formatted as "Not established by the sources retrieved" rather than claiming records "do not exist".
12. **Offer-Risk Decoupling**: Validates that HIGH CONCERN is maintained for suspicious offers with advance-fee demands while decoupling offer risk from a legal fraud finding against the named entity.

---

## API Documentation

### `GET /api/health`
Returns system status, active providers, and configuration state.
```json
{
  "status": "ok",
  "geminiConfigured": true,
  "tinyfishConfigured": true,
  "tinyfishStatus": {
    "keyConfigured": true,
    "connectivityState": "connected",
    "searchEndpoint": "https://api.search.tinyfish.ai",
    "fetchEndpoint": "https://api.fetch.tinyfish.ai",
    "lastLatencyMs": 4136
  }
}
```

### `POST /api/tinyfish/test`
Actively runs a diagnostic ping against `https://api.search.tinyfish.ai` using the configured `TINYFISH_API_KEY` and measures latency.

### `GET /api/demo-scenarios`
Returns the curated list of 4 benchmark scenarios for demonstration.

### `POST /api/analyze`
Submits text, optional URLs, and company names for investigation.
```json
{
  "message": "We would like to offer you a remote job paying $45/hr. Please wire $100 for your starter kit.",
  "companyName": "NexaCore Global",
  "url": "http://nexacore-careers.biz",
  "category": "Job & Internship Offer"
}
```

---

## Security & Responsible-Use Safeguards

1. **Zero Key Exposure**: Neither `GEMINI_API_KEY` nor `TINYFISH_API_KEY` are ever bundled in client JS or exposed to browser logs.
2. **Non-Executable Untrusted Markers**: Untrusted web snippets are sanitized and enclosed in delimiter blocks before being analyzed by Gemini.
3. **SSRF Safeguards**: All URL targets for fetch operations are filtered against internal IP ranges and link-local ranges before issuing HTTP requests.
4. **Privacy-First UX**: Persistent warnings discourage users from submitting confidential PII or passwords.

---

## Limitations & Roadmap

### Current Limitations
- **Private Intranets / Messengers**: ScamShield AI cannot search private WhatsApp, Telegram, or Discord chat rooms without user-provided paste snippets.
- **Paywalled Registry Access**: Some state corporation databases require paid credentials and captcha bypass which are not currently integrated.
- **Evolving Scams**: Brand new zero-day spoof domains registered within minutes may have sparse public data, correctly resulting in `INSUFFICIENT EVIDENCE`.

### Roadmap
- [ ] Browser extension for instant on-page highlight-and-investigate on LinkedIn and Indeed.
- [ ] Direct WHOIS / RDAP domain registration age and SSL certificate issuer telemetry.
- [ ] Multi-lingual translation pipeline for cross-border international employment fraud.
- [ ] Enterprise/Campus Webhook API for university career advising centers.

---

## License

This project is licensed under the Apache 2.0 License.
