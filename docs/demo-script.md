# ScamShield AI — Hackathon Demo Script (2–3 Minutes)

> **Event**: KRITICAL HACKS ’26  
> **Presenter Target Time**: 2 minutes 30 seconds  
> **Presenter Persona**: Confident, evidence-driven, demonstrating real-time web research.

---

## Equipment & Tab Setup Before Recording

1. **Tab 1**: ScamShield AI Dashboard open at `http://localhost:3000` (or your live app URL) in the **Investigate** tab.
2. **Tab 2**: **Live Engine** tab open (`/` with active tab `engine`) to show active TinyFish API connectivity.
3. **Prepared Clipboard Snippet**:
   ```text
   Congratulations! Following your resume submission, you have been selected for a Remote Data Research Internship with NexaCore Global Solutions paying $38.50/hr. 

   To confirm your placement and secure delivery of your Apple MacBook Pro workstation, please wire an equipment assurance deposit of $250 via Zelle or Crypto to our logistics onboarding officer within 24 hours. Full refund provided on your first pay stub.
   ```
4. **Company Name**: `NexaCore Global Solutions`
5. **URL**: `https://nexacore-global-careers.biz`

---

## Step-by-Step Script

### [0:00 - 0:30] Introduction: The Student Job Scam Epidemic
- **Screen**: Start on the ScamShield AI homepage, showing the clean dashboard and prominent privacy notice.
- **Presenter**:
  > *"Every hiring season, millions of students and early-career job seekers face sophisticated employment scams. Threat actors impersonate legitimate companies, issue fake offer letters, and demand upfront 'equipment deposits' or sensitive identity records.*
  > 
  > *Traditional AI chatbots often hallucinate legitimacy because they can't access live web registries. That is why we built **ScamShield AI** — an evidence-based cyber investigation engine that unites live web research powered by **TinyFish** with evidence synthesis by **Gemini 3.8 Flash**."*

### [0:30 - 0:50] The Investigation Input & Safety Safeguards
- **Screen**: Navigate to the Investigation Form. Paste the prepared snippet into the message area. Enter `NexaCore Global Solutions` in the Company field and `https://nexacore-global-careers.biz` in the URL field.
- **Presenter**:
  > *"Notice right away: ScamShield AI enforces strict privacy discipline. We actively advise users never to submit passwords or OTPs, and our backend filters sensitive credit cards and blocks SSRF attacks before any network calls occur.*
  > 
  > *Let's click 'Investigate with Live Web Research'."*

### [0:50 - 1:30] Live Research in Action & TinyFish Integration
- **Screen**: Show the animated 4-stage pipeline:
  1. *Validating Input & Extracting Claims*
  2. *Live Web Research via TinyFish (querying company legitimacy, fraud reports, domain history)*
  3. *Gemini 3.8 Flash Evidence Synthesis*
  4. *Assembling Risk Assessment & Playbook*
- **Presenter**:
  > *"Here's what is happening behind the scenes: ScamShield AI invokes the **TinyFish Search and Fetch APIs** to scour the public web in real time. It queries official business registries, community scam reports, and domain lookups.*
  > 
  > *Unlike standard AI wrappers, ScamShield AI doesn't guess. It grounds the investigation in verifiable public web data."*

### [1:30 - 2:00] The Report Breakdown: Facts vs. Assumptions
- **Screen**: The investigation report renders with the prominent **HIGH CONCERN** banner.
- **Presenter**:
  > *"The report immediately categorizes this offer as **HIGH CONCERN**. But notice how the evidence is presented:*
  > 
  > *First, we strictly separate **User Input Claims** from **Observed Evidence**. The recruiter claimed NexaCore is a global consultancy, but TinyFish found no matching corporate registration for this domain.*
  > 
  > *Second, we highlight concrete **Warning Signs**: the upfront payment request for equipment, the extreme hourly rate for entry-level work, and the lookalike domain.*
  > 
  > *Third, we list **Unverified Claims**: assertions made in the message that lack any corroborating public evidence.*
  > 
  > *And most importantly: every observed finding includes genuine source citations so the user can verify for themselves."*

### [2:00 - 2:20] Benchmark Demo Mode & Fallback Plan
- **Screen**: Click the **Demo Scenarios** tab in the top navigation.
- **Presenter**:
  > *"We believe in transparency. In our Demo Scenarios tab, judges can inspect benchmark scenarios — including legitimate academic fellowships that score 'Fewer Warning Signs Found' and sparse startups that score 'Insufficient Evidence'.*
  > 
  > *Every sample scenario is visibly tagged with a prominent amber 'DEMO BENCHMARK' badge so test cases are never confused with live investigations."*

### [2:20 - 2:40] Export & Conclusion
- **Screen**: Click **Copy Summary** and **Export JSON** on the report view. Show the **Live Engine** tab with green connected TinyFish status.
- **Presenter**:
  > *"Users can export complete reports in JSON or copy a summary to share with campus advisors. ScamShield AI is fully tested with 21 automated tests, runs zero client-side keys, and is ready to make the internet safer for job seekers.*
  > 
  > *Thank you, and remember: Don't just detect the warning. Investigate the evidence."*

---

## Contingency / Fallback Plan (If Live Network Is Down)

If internet connectivity or upstream API fails during recording:
1. Switch immediately to the **Demo Scenarios** tab (`/` with active tab `demos`).
2. Select **Scenario 1: Virtual Tech Internship — Upfront Equipment Deposit**.
3. State to the audience:
   > *"If an internet connection is unavailable during testing, our deterministic Benchmark Suite allows judges to test the full pipeline and report interface using verified real-world incident profiles, clearly marked as DEMO."*
4. Continue the demonstration seamlessly without fabricating live research.
