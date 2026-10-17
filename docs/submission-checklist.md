# KRITICAL HACKS ’26 — Final Submission Checklist & Judging Rubric Alignment

> **Project**: ScamShield AI — Evidence-Based Scam Investigation Engine  
> **Total Points Available**: 100 Points  
> *Note: In accordance with hackathon instructions, external tasks requiring manual user action (e.g. video recording, public social post publishing, Unstop submission form) remain unchecked until completed by the submitter.*

---

## 1. Judging Rubric Alignment (100 Points Total)

| Rubric Criterion | Max Points | Required Evidence to Demonstrate | Implementation State & Evidence Location |
| :--- | :--- | :--- | :--- |
| **Working GitHub Project** | 20 pts | Public repository with complete, runnable code, clear setup steps, valid `package.json`, passing build, zero syntax/runtime errors. | **Ready in Codebase**: Clean repository, Express + React 19 + Vite full-stack architecture, comprehensive `README.md`, verified `npm test`, `npm run lint`, and `npm run build`. |
| **TinyFish Integration** | 20 pts | Genuine functional integration with TinyFish Search / Fetch APIs; real requests, active status reporting, real evidence in reports. | **Verified Live in Codebase**: `server/services/tinyfish.ts` targets `https://api.search.tinyfish.ai` & `https://api.fetch.tinyfish.ai`; diagnostic route `POST /api/tinyfish/test` records live connectivity with latency; genuine sources displayed in reports. |
| **Technical Execution** | 10 pts | Clean modular code, TypeScript typing, error handling, security hygiene, SSRF guards, automated test suite. | **Verified in Codebase**: 21 automated tests passing (`npm test`), 0 TypeScript lint errors (`npm run lint`), SSRF IP blocklists, prompt-injection defense, zero browser key leaks. |
| **Innovation** | 20 pts | Unique approach separating user claims from observed facts, 4 calibrated risk tiers, transparent uncertainty handling vs. black-box scoring. | **Verified in Codebase**: Grounded evidence synthesis with Gemini 3.8 Flash, explicit "Unverified Claims" section, honest `INSUFFICIENT EVIDENCE` handling. |
| **Impact** | 10 pts | Solves genuine real-world problem (job/internship scams targeting students), provides actionable verification playbooks and privacy safeguards. | **Verified in Codebase**: Targeted for early-career applicants; concrete verification guides and official registry lookup links. |
| **Revenue Model** | 10 pts | Credible commercial strategy, unit economics, B2C freemium, B2B campus pack, developer API, validation roadmap. | **Complete in Docs**: `docs/revenue-model.md` details unit economics, COGS ($0.016–$0.025/query), margin analysis (>85%), and pilot roadmap. |
| **Social Media Post** | 10 pts | Public LinkedIn post explaining problem, solution, TinyFish integration, with repository & demo links. | **Drafted & Ready**: `docs/social-post.md` contains professional text ready for publication. |

---

## 2. Technical Codebase Readiness Checklist

- [x] Full-stack architecture running synchronously on port 3000 (`tsx server.ts`).
- [x] TypeScript compiler check passing cleanly (`npm run lint` -> `tsc --noEmit`).
- [x] Automated test suite executing and passing 21/21 tests (`npm test`).
- [x] Production build succeeding without bundle warnings (`npm run build`).
- [x] Live TinyFish Search and Fetch integration verified with real endpoint latency metrics (`POST /api/tinyfish/test`).
- [x] Gemini 3.8 Flash synthesis operational with structured schema output (`@google/genai`).
- [x] Four calibrated risk categories implemented (`HIGH CONCERN`, `NEEDS VERIFICATION`, `FEWER WARNING SIGNS FOUND`, `INSUFFICIENT EVIDENCE`).
- [x] Demo Benchmark Suite clearly labeled with visible amber `DEMO` banners and disclaimers.
- [x] Zero API keys exposed in client bundles (`dist/`), source files (`src/`), or browser API responses.
- [x] SSRF filters blocking localhost, private subnets (10.0.0.0/8, 192.168.0.0/16), and cloud metadata IP (169.254.169.254).
- [x] Sensitive input warning detecting credit card patterns before research execution.
- [x] Professional `README.md` with complete architecture diagrams and setup instructions.
- [x] Detailed `PROJECT.md` specifying system components, user stories, and feature implementation status.
- [x] `.env.example` committed with clean placeholder variables only.
- [x] `.gitignore` verified to protect `.env*` and sensitive files.

---

## 3. Submitter Final Submission Action Items (External Tasks)

Please complete the following manual steps before the submission deadline:

- [ ] **1. Create Public GitHub Repository**:
  - Initialize git: `git init` (if not already done).
  - Add remote: `git remote add origin https://github.com/your-username/scamshield-ai.git`.
  - Confirm `.env` is NOT tracked (`git status`).
  - Commit and push to main: `git add . && git commit -m "feat: complete ScamShield AI submission for KRITICAL HACKS '26" && git push -u origin main`.
  - Ensure repository visibility is set to **Public**.

- [ ] **2. Record 2–3 Minute Demo Video**:
  - Follow the script in `docs/demo-script.md`.
  - Demonstrate a live investigation showing TinyFish live research.
  - Show the report screen highlighting the separation of user claims from observed evidence.
  - Upload the video to YouTube (Public or Unlisted) or Loom.

- [ ] **3. Publish Social Media Post**:
  - Copy text from `docs/social-post.md`.
  - Fill in the live application URL, GitHub repository link, and video link.
  - Publish on LinkedIn.
  - Copy the public post URL for the Unstop submission form.

- [ ] **4. Submit on Unstop**:
  - Navigate to the KRITICAL HACKS ’26 submission portal on Unstop.
  - Paste your GitHub repository URL.
  - Paste your live deployment / demo URL.
  - Paste your demo video link.
  - Paste your public social media post link.
  - Submit before the deadline.
