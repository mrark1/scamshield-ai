# PROJECT.md — ScamShield AI Architecture & Technical Specification

## Project Overview

**ScamShield AI** is an evidence-based cyber investigation platform designed to protect students, recent graduates, remote workers, and online freelancers from deceptive employment offers, fake internship postings, advance-fee scams, and brand-impersonation websites.

Instead of treating risk assessment as an inscrutable black-box score, ScamShield AI operates as an automated digital detective:
1. Conducts live multi-angle public web research using the **TinyFish Search and Fetch APIs**.
2. Synthesizes findings using **Gemini 3.8 Flash** with strict separation between user assertions and publicly verified facts.
3. Explicitly labels unverified claims and gaps in public records.
4. Categorizes investigations into one of four calibrated risk levels accompanied by actionable verification playbooks.

---

## User Stories

### 1. The Anxious University Student (Primary Persona)
- *Story*: "As a college senior seeking a summer internship, I received an unexpected Slack/Telegram invitation offering a $40/hr remote position from a recruiter claiming to represent a global consultancy, asking for an equipment deposit."
- *Value*: The student pastes the message and URL into ScamShield AI. Within seconds, the tool discovers that the recruiter's domain was registered 3 days ago, the genuine consultancy does not use Telegram for hiring, and advance-fee equipment deposits violate standard hiring norms. The report labels this **HIGH CONCERN** and prevents the student from losing money.

### 2. The Freelancer / Contractor
- *Story*: "As an independent graphic designer, I received an inquiry from an unknown e-commerce brand offering an upfront $3,000 contract if I pay a $150 vendor processing fee."
- *Value*: ScamShield AI conducts a live web investigation and detects negative fraud reports associated with the payment address and notes no digital footprint for the claimed company, assigning **HIGH CONCERN**.

### 3. The Cautious Applicant Double-Checking a Real Fellowship
- *Story*: "As a graduate student applying to an academic research consortium, I want to confirm that a communication from an unfamiliar domain is legitimate."
- *Value*: ScamShield AI discovers active citations in university catalogs and verified `.edu` affiliations without advance-fee demands, categorizing the inquiry as **FEWER WARNING SIGNS FOUND**.

---

## System Architecture

```
[Browser Client: React 19 + Tailwind v4 + Lucide Icons]
                         |
                 (REST API Calls)
                         |
                         v
[Express Backend: server.ts + server/services/...]
   ├── Security Filter: SSRF & Credential Redaction (server/utils/security.ts)
   ├── Diagnostic Layer: /api/tinyfish/status & /api/health
   ├── Research Engine: TinyFish Search & Fetch (server/services/tinyfish.ts)
   │        ├── Live API Calls (https://api.search.tinyfish.ai)
   │        └── Fallback to Gemini Google Search Grounding if unconfigured
   └── Synthesis Engine: Gemini 3.8 Flash (server/services/analysis.ts)
            ├── Structured Schema Output
            ├── Evidence Grounding & Claim Extraction
            └── Defanging of Prompt Injections
```

---

## Implemented vs. Planned Features

### Status: Implemented & Verified in Codebase
- [x] **Full-Stack Application**: Node.js/Express server and React SPA running synchronously on port 3000.
- [x] **Real TinyFish Search & Fetch Integration**: Production-ready client targeting `https://api.search.tinyfish.ai` and `https://api.fetch.tinyfish.ai` with active diagnostic health checks (`POST /api/tinyfish/test`).
- [x] **Gemini 3.8 Flash Synthesis**: Server-side structured evidence analysis via `@google/genai` with prompt-injection defanging.
- [x] **Four-Tier Calibrated Risk Categories**:
  - `HIGH CONCERN` (Direct scam indicators, advance-fee demands, impersonation).
  - `NEEDS VERIFICATION` (Domain anomalies, conflicting sources).
  - `FEWER WARNING SIGNS FOUND` (Verified footprint, standard corporate workflows).
  - `INSUFFICIENT EVIDENCE` (No conclusive public records found).
- [x] **Transparent Claim Demarcation & Evidence Breakdown (5-Part Separation)**: Strict separation between:
  - User Input Claims (untrusted user paste).
  - Directly Associated Entity Evidence (verified domain or corporate registry matches).
  - Possible Name Matches (identity unverified; discussions/reviews of similarly named organizations on platforms like AmbitionBox or Quora).
  - General Scam-Pattern Guidance (regulatory advisories from FTC, IC3, FBI; not direct evidence against the entity).
  - Missing or Inconclusive Evidence (formatted as "Not established by the sources retrieved" without claiming records "do not exist").
- [x] **Offer-Risk Decoupling**: Ensures HIGH CONCERN evaluates the inherent risk of the offer itself (such as advance recruitment fees and artificial urgency) rather than making a legally established finding of fraud against the named organization.
- [x] **Benchmark Demo Suite**: 4 realistic pre-calculated scenarios with persistent `DEMO` banners, never presented as live research.
- [x] **Security & Privacy Layer**: Input length enforcement, SSRF protections, credit-card/credential warnings, zero client-side key leakage.
- [x] **Automated Test Suite**: 26 unit and integration tests passing in CI/CLI.
- [x] **Utility Actions**: Copy executive summary to clipboard, export complete audit report in JSON.

### Status: Planned / Future Roadmap (Post-Hackathon)
- [ ] **Chrome / Firefox Extension**: One-click context menu inspection on LinkedIn, Indeed, and Gmail.
- [ ] **Direct WHOIS / RDAP Protocol Client**: Real-time domain registration age, DNS registrant organization, and SSL certificate timeline checks.
- [ ] **Multi-Lingual Threat Detection**: Native detection for Latin American, European, and Asian localized job fraud variants.
- [ ] **Campus Career Portal Webhook API**: Secure B2B integration with Handshake and university career platforms.

---

## API Endpoints

| Method | Endpoint | Description | Auth / Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health, Gemini config state, TinyFish config state | Public |
| `GET` | `/api/tinyfish/status` | Current TinyFish provider status (`connected`, `untested`, `missing_key`) | Public |
| `POST` | `/api/tinyfish/test` | Active connectivity ping to TinyFish API with latency report | Public |
| `GET` | `/api/demo-scenarios` | List of 4 benchmark demonstration scenarios | Public |
| `GET` | `/api/demo-scenarios/:id` | Full details for a single benchmark scenario | Public |
| `POST` | `/api/analyze` | Initiates live web research and AI evidence synthesis | Public |

---

## Evidence Classification & Risk Methodology

1. **Advance-Fee Rule**: Any employment or internship offer requiring an applicant to send money via wire, Zelle, Venmo, or cryptocurrency for equipment, software licenses, or background checks is classified as **HIGH CONCERN** regardless of company brand reputation.
2. **Channel Anomaly Rule**: Corporate hiring communicated exclusively over consumer messaging platforms (Telegram, WhatsApp) without matching corporate email domains triggers **NEEDS VERIFICATION** or **HIGH CONCERN**.
3. **Domain Discrepancy Rule**: Lookalike domains (e.g., `google-careers-desk.cc`) differing from official roots trigger high-risk warnings.
4. **Honest Insufficiency Rule**: If public search engines return fewer than 2 relevant documents, the system assigns **INSUFFICIENT EVIDENCE** rather than inventing a risk assessment.
5. **Entity Resolution & Source Labeling Rule**: Reviews or complaints for similarly named companies (e.g., "Bright Future" for "BrightFuture Careers") must be labeled "Possible name match — identity unverified" unless domain or corporate registration is verified. Regulatory advisories (FTC, IC3) must never be described as direct evidence against a particular company.

---

## Test Coverage Summary

- Total Automated Tests: **26**
- Execution Command: `npm test` (`tsx server/tests/runTests.ts`)
- Status: **26 PASSED, 0 FAILED**
- Key Tested Modules:
  - `server/utils/entityResolution.ts`: Same-name resolution, source labeling, evidence breakdown, missing evidence phrasing.
  - `server/utils/security.ts`: SSRF IP filtering, protocol validation, sensitive data detection, fee/urgency extraction.
  - `server/services/tinyfish.ts`: Response normalization, status checks, error classification.
  - `server/services/analysis.ts`: Prompt injection defanging, JSON schema fallback handling, risk decoupling, entity attribution.

---

## Ethical Boundaries & Privacy Principles

1. **No Safe Guarantees**: ScamShield AI never asserts a website or entity is "guaranteed safe." Bad actors can register new domains or compromise legitimate accounts.
2. **No Credential Intake**: The application rejects and warns against submitting passwords, OTPs, or banking details.
3. **Source Transparency**: Every report links back to genuine search engine source URLs for human verification.
