# ScamShield AI — Revenue Model & Commercial Viability Strategy

> *Disclaimer: All financial projections, pricing tiers, and market size estimates in this document represent proposed early-stage models and strategic hypotheses for evaluation at KRITICAL HACKS ’26. They require empirical market testing and customer development before formal commercialization.*

---

## 1. Target Customer Segments

1. **Individual Job Seekers & Students (B2C)**:
   - University juniors/seniors, boot-camp graduates, and career changers applying to 50+ remote positions monthly.
   - International applicants vulnerable to visa and work-authorization scams.
2. **University Career Advising Centers (B2B / Higher Ed)**:
   - Campus career services departments seeking tools to vet external job board postings and protect student bodies.
3. **Freelance Marketplaces & Job Boards (B2B SaaS / API)**:
   - Job platforms (e.g., Upwork alternatives, niche remote job directories) wanting automated pre-screening for recruiter postings.
4. **Cybersecurity Training & HR Compliance Platforms (B2B)**:
   - Corporate human resources and IT security teams educating employees on phishing and corporate impersonation risks.

---

## 2. Proposed Pricing & Packaging Tiers

### A. Consumer / Freemium Tier (B2C)
| Tier | Proposed Price | Quota & Features | Value Driver |
| :--- | :--- | :--- | :--- |
| **Community Free** | $0 / month | 5 live investigations / month, standard response speed, web report viewing, community verification playbook | Viral acquisition among student bodies |
| **Job Seeker Pro** | $7.99 / month (or $19/semester) | Unlimited live web investigations, priority TinyFish multi-query search, browser extension access, PDF export with shareable audit badge | Active job hunt reassurance |

### B. Campus & Institutional License (B2B Higher Ed)
| Tier | Proposed Annual License | Features & Integrations | Value Driver |
| :--- | :--- | :--- | :--- |
| **University Career Pack** | $2,500 – $6,000 / year (per campus) | Campus-wide single sign-on (SSO), integration with Handshake/Symplicity feeds, co-branded student fraud portal, weekly threat telemetry digest | Institutional student safety & duty of care |

### C. Developer & Platform API (B2B API)
| Tier | Proposed Usage Rate | Access & SLA | Value Driver |
| :--- | :--- | :--- | :--- |
| **API Starter** | $0.05 / investigation | REST API access, 100 req/min rate limit, webhook callbacks, JSON structured reports | Automated inbound job vetting for platforms |
| **Enterprise API** | Volume discounts from $0.02 / query | Dedicated throughput, custom registry connectors, SLA guarantee | Large marketplace spam prevention |

---

## 3. Unit Economics & Operating Cost Considerations

Estimated costs per 1,000 live investigations:

| Cost Element | Service Provider | Estimated Cost / 1k Queries | Notes |
| :--- | :--- | :--- | :--- |
| **Live Web Search** | TinyFish Search API | ~$10.00 – $15.00 | Multi-query entity research and registry discovery |
| **Target Page Fetching** | TinyFish Fetch API | ~$3.00 – $5.00 | SSRF-filtered targeted HTML extraction |
| **AI Evidence Synthesis** | Gemini 3.8 Flash | ~$1.00 – $2.50 | Structured JSON extraction (~1.5k input / 800 output tokens) |
| **Cloud Hosting & Server** | Cloud Run / Serverless | ~$2.00 | Stateless Node.js container instance |
| **Total Estimated COGS** | | **~$16.00 – $24.50 / 1k queries** | **~$0.016 to $0.025 per investigation** |

### Margin Analysis
- At **$7.99/month**, an active user running 30 investigations incurs ~$0.60 in direct API and infrastructure costs, delivering an estimated **gross margin of >85%**.
- At **$2,500/year** for a university tier serving 10,000 queries annually, direct COGS is ~$200, delivering a **gross margin of >90%**.

---

## 4. Key Hypotheses Requiring Validation

1. **Willingness to Pay**: Will students pay out-of-pocket for Pro features, or does the predominant monetization vector lie in university campus licenses?
2. **Query Intensity**: What is the average number of suspicious job offers an active seeker receives per month during peak recruiting cycles?
3. **B2B API Conversion**: Are freelance platforms willing to pay $0.02–$0.05 per job posting to filter advance-fee fraud automatically?

---

## 5. Practical 6-Month Validation Roadmap

```
Month 1-2: User Engagement & Pilot Testing
├── Launch free tier across 3 university student computer science / business clubs.
├── Measure investigation frequency and false-positive / false-negative feedback.
└── Benchmark real TinyFish search costs against query caching efficiency.

Month 3-4: Career Services Discovery
├── Conduct 15 discovery interviews with university career development directors.
├── Pilot a free 60-day campus trial with 2 partner career centers.
└── Develop Handshake / job-board export connector.

Month 5-6: Commercial Rollout
├── Launch Job Seeker Pro tier ($7.99/mo) with browser extension.
├── Package standard annual campus license agreement.
└── Open developer API sandbox for freelance job board integration.
```
