/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DemoScenarioItem } from '../src/types/investigation.ts';

export const DEMO_SCENARIOS: DemoScenarioItem[] = [
  {
    id: 'demo-internship-deposit',
    title: 'Virtual Tech Internship — Upfront Equipment Deposit',
    subtitle: 'NexaCore Global Solutions requesting $250 MacBook assurance deposit',
    category: 'Job & Internship Offer',
    expectedRisk: 'HIGH CONCERN',
    sampleCompany: 'NexaCore Global Solutions',
    sampleUrl: 'https://nexacore-careers-verification.online',
    sampleMessage:
      'Congratulations! You have been selected for the 8-week Remote Software Engineer Internship at NexaCore Global Solutions (Stipend: $1,200/month). To finalize your placement and dispatch your company-issued MacBook Pro and testing hardware, you must deposit a refundable hardware assurance fee of $250 via Zelle / Crypto to our logistics liaison within 24 hours. Your placement will be forfeited if not confirmed by 5:00 PM tomorrow.',
    report: {
      id: 'demo-report-01',
      timestamp: '2026-10-17T09:15:00Z',
      inputSummary: {
        messageSnippet:
          'Selected for 8-week Remote Software Engineer Internship at NexaCore Global Solutions. Requires $250 refundable MacBook deposit via Zelle/Crypto within 24 hours.',
        url: 'https://nexacore-careers-verification.online',
        companyName: 'NexaCore Global Solutions',
        category: 'Job & Internship Offer',
      },
      riskCategory: 'HIGH CONCERN',
      riskLevel: 'high_concern',
      confidenceNote:
        'This rating assesses the inherent risk of the submitted offer (such as upfront equipment fees, irreversible payment rails, and tight deadlines), not a legally established finding that the named company is fraudulent. Corroborated by FTC and BBB employment scam patterns.',
      summary:
        'This communication exhibits multiple critical hallmarks of an advance-fee employment scam. The demand for an upfront refundable equipment deposit ($250) sent via irreversible payment channels (Zelle/Crypto) combined with an artificial 24-hour urgency countdown strongly indicates deceptive intent.',
      evidenceBreakdown: {
        generalGuidance: [
          '[FTC Consumer Alert: Job Scammers Target College Students] (consumer.ftc.gov): Honest employers will never ask you to pay for equipment, background checks, or training materials upfront.',
          '[IC3 Public Service Announcement: Fake Tech Internship Fraud Schemes] (ic3.gov): Cybercriminals increasingly spoof tech firms, offering high remote stipends while directing applicants to wire refundable hardware assurance funds.',
        ],
        directEntityEvidence: [],
        possibleNameMatches: [],
        userClaims: [
          'Selected for 8-week Remote Software Engineer Internship at NexaCore Global Solutions ($1,200/month).',
          'Requires $250 refundable MacBook assurance deposit via Zelle / Crypto within 24 hours.',
        ],
        missingOrInconclusive: [
          'State incorporation or SEC/EDGAR registry record for "NexaCore Global Solutions": Not established by the sources retrieved.',
          'Official corporate email domain or verified human resources contact: Not established by the sources retrieved.',
        ],
      },
      observations: [
        {
          label: 'Upfront Money Requirement',
          detail: 'Sender demands $250 prior to onboarding under the guise of an equipment assurance fee.',
          verified: true,
        },
        {
          label: 'Payment Method',
          detail: 'Payment requested through peer-to-peer (Zelle) or cryptocurrency, which offer zero chargeback protection.',
          verified: true,
        },
        {
          label: 'Domain Legitimacy',
          detail: 'Domain nexacore-careers-verification.online uses a non-standard generic TLD (.online) not linked to an official corporate registry.',
          verified: false,
        },
        {
          label: 'Recruitment Protocol',
          detail: 'Offer was granted without a standard technical interview or human verification loop.',
          verified: true,
        },
      ],
      warningSigns: [
        {
          severity: 'critical',
          title: 'Advance Fee for Employment Equipment',
          explanation:
            'Legitimate companies cover all employee equipment costs. Any requirement that an intern or employee pay upfront for a laptop, software license, or onboarding kit is a classic advance-fee fraud vector.',
          detectedPattern: 'REFUNDABLE_EQUIPMENT_DEPOSIT',
        },
        {
          severity: 'critical',
          title: 'Irreversible P2P & Crypto Payment Requests',
          explanation:
            'Asking for employment-related transactions through Zelle, CashApp, or crypto wallets prevents financial recovery once funds are sent.',
          detectedPattern: 'UNTRACEABLE_PAYMENT_CHANNEL',
        },
        {
          severity: 'high',
          title: 'Artificial Time Pressure & Urgency',
          explanation:
            'The 24-hour deadline ("placement forfeited if not confirmed by 5:00 PM") is engineered to force emotional decision-making before the candidate can independently consult mentors or verify records.',
          detectedPattern: 'MANUFACTURED_URGENCY',
        },
        {
          severity: 'medium',
          title: 'Lookalike Careers Domain',
          explanation:
            'The domain nexacore-careers-verification.online was registered recently and does not match legitimate corporate email domains.',
          detectedPattern: 'SUSPICIOUS_TLD_SUBDOMAIN',
        },
      ],
      unverifiedClaims: [
        {
          claim: 'NexaCore Global Solutions is a registered corporate employer in good standing.',
          reasonNotVerified:
            'Corporate registration or state incorporation record: Not established by the sources retrieved.',
          riskImplication: 'The corporate identity may be fabricated or spoofing an unrelated registered name.',
        },
        {
          claim: 'The $250 fee is held in an escrow account and refunded on first paycheck.',
          reasonNotVerified: 'Zero legal escrow documentation or formal payroll agreement provided.',
          riskImplication: 'High likelihood of total loss upon transfer.',
        },
      ],
      sources: [
        {
          title: 'FTC Consumer Alert: Job Scammers Target College Students',
          url: 'https://consumer.ftc.gov/articles/job-scams',
          domain: 'consumer.ftc.gov',
          snippet:
            'Honest employers will never ask you to pay for equipment, background checks, or training materials upfront, especially via peer-to-peer apps, gift cards, or wire transfers.',
          relevanceScore: 0.98,
          verifiedAt: '2026-10-17T09:15:00Z',
          entityMatchStatus: 'general_advisory',
          matchLabel: 'General scam-pattern guidance',
          matchExplanation:
            'Official consumer protection guidance on fraud indicators. Not direct evidence against any specific entity.',
        },
        {
          title: 'IC3 Public Service Announcement: Fake Tech Internship Fraud Schemes',
          url: 'https://www.ic3.gov/Media/Y2025/PSA250812',
          domain: 'ic3.gov',
          snippet:
            'Cybercriminals increasingly spoof tech firms, offering high remote stipends while directing applicants to wire refundable hardware assurance funds.',
          relevanceScore: 0.94,
          verifiedAt: '2026-10-17T09:15:00Z',
          entityMatchStatus: 'general_advisory',
          matchLabel: 'General scam-pattern guidance',
          matchExplanation:
            'Official regulatory advisory describing general scam patterns. Not direct evidence against any specific company.',
        },
        {
          title: 'National Association of Colleges and Employers (NACE) Employer Guidelines',
          url: 'https://www.naceweb.org/career-development/best-practices/internship-scam-prevention',
          domain: 'naceweb.org',
          snippet:
            'A legitimate internship never requires an applicant or student to pay any processing, placement, or hardware fee.',
          relevanceScore: 0.91,
          verifiedAt: '2026-10-17T09:15:00Z',
          entityMatchStatus: 'general_advisory',
          matchLabel: 'General scam-pattern guidance',
          matchExplanation:
            'Professional standard on internship fee practices.',
        },
      ],
      recommendations: [
        {
          step: 1,
          priority: 'immediate',
          action: 'Do not transfer any funds or share banking details',
          rationale:
            'Cease all communication immediately. Do not send Zelle payments, crypto, or credit card numbers.',
        },
        {
          step: 2,
          priority: 'immediate',
          action: 'Report to your university career center or college placement cell',
          rationale:
            'Career counselors can flag the sender domain to protect fellow students who may have received the same batch email.',
        },
        {
          step: 3,
          priority: 'recommended',
          action: 'Cross-check official company career page independently',
          rationale:
            'If you suspect a real company is being impersonated, navigate directly to their public website by typing the address manually (never clicking email links).',
        },
        {
          step: 4,
          priority: 'recommended',
          action: 'Submit an incident report to FTC / IC3',
          rationale:
            'Reporting the payment handles and domains assists law enforcement in blacklisting deceptive recruitment rings.',
        },
      ],
      limitations: [
        'This evaluation is an automated preliminary risk analysis based on known scam indicators and public reference data.',
        'ScamShield AI does not make definitive criminal accusations or legal determinations.',
        'Always conduct independent human verification before taking legal or financial action.',
      ],
      isDemo: true,
      providerInfo: {
        tinyfishConfigured: false,
        tinyfishUsed: false,
        geminiUsed: false,
        isDemo: true,
        searchQueriesExecuted: [
          'NexaCore Global Solutions job scam review',
          'refundable equipment deposit internship scam FTC',
        ],
        rawProvider: 'Demo Benchmark Database',
        statusNote: 'Pre-computed educational benchmark scenario for evaluation.',
      },
    },
  },
  {
    id: 'demo-crypto-task',
    title: 'Remote Crypto Task Annotator & Arbitrage Assistant',
    subtitle: 'Daily payout of 150-300 USDT requiring 50 USDT wallet recharge to activate',
    category: 'Online Investment / Task Scam',
    expectedRisk: 'HIGH CONCERN',
    sampleCompany: 'OmniGlobal Task Arbitrage Lab',
    sampleUrl: 'https://task-arbitrage-cloud.vip',
    sampleMessage:
      'Hello! We noticed your profile on LinkedIn. Our company is hiring remote assistants to complete 30-40 micro-tasks per day auditing crypto exchange order books. Daily payout is 150-300 USDT directly to your wallet. You will first need to connect your Web3 wallet and recharge 50 USDT to activate task tier 1. As you complete batches, your principal and commission can be withdrawn immediately.',
    report: {
      id: 'demo-report-02',
      timestamp: '2026-10-17T09:20:00Z',
      inputSummary: {
        messageSnippet:
          'Hiring remote assistants for 30-40 micro-tasks/day auditing crypto books. Payout 150-300 USDT/day. Requires 50 USDT wallet recharge to activate task tier 1.',
        url: 'https://task-arbitrage-cloud.vip',
        companyName: 'OmniGlobal Task Arbitrage Lab',
        category: 'Online Investment / Task Scam',
      },
      riskCategory: 'HIGH CONCERN',
      riskLevel: 'high_concern',
      confidenceNote:
        'This rating assesses the inherent risk of the submitted offer (such as recharge-to-work deposit demands and crypto rails), not a legally established finding that the named entity is fraudulent. Matches task-scam patterns documented globally by cyber-crime bureaus.',
      summary:
        'This offer is a classic task-based cryptocurrency advance-fee fraud scheme. Victims are lured with promises of high daily returns ($150-$300) for trivial automated tasks, but are forced to repeatedly deposit their own funds to "unlock" commissions or higher tiers.',
      evidenceBreakdown: {
        generalGuidance: [
          '[Interpol Alert: The Global Surge of Task-Based Investment Scams] (interpol.int): Criminal syndicates recruit victims through social media messaging, offering easy money for simple tasks before requiring financial recharges.',
          '[FBI Cyber Division: Cryptocurrency Task Scam Warning] (fbi.gov): Never pay money to earn money on task apps. Demands for USDT or cryptocurrency deposits are unequivocal red flags.',
        ],
        directEntityEvidence: [],
        possibleNameMatches: [],
        userClaims: [
          'Hiring remote assistants for 30-40 micro-tasks/day auditing crypto books ($150-$300 USDT/day).',
          'Requires 50 USDT wallet recharge to activate task tier 1.',
        ],
        missingOrInconclusive: [
          'Corporate registration or liquidity partnership records for "OmniGlobal Task Arbitrage Lab": Not established by the sources retrieved.',
          'Authentic business operating license or headquarters location: Not established by the sources retrieved.',
        ],
      },
      observations: [
        {
          label: 'Pay to Work Model',
          detail: 'Requires candidates to deposit 50 USDT of their own funds before any work tasks can begin.',
          verified: true,
        },
        {
          label: 'Disproportionate Compensation',
          detail: 'Offers $150-$300 daily for clicking 30-40 buttons, which does not reflect genuine labor market value.',
          verified: true,
        },
        {
          label: 'Platform Domain',
          detail: 'Domain task-arbitrage-cloud.vip uses .vip TLD, commonly associated with disposable task phishing platforms.',
          verified: false,
        },
      ],
      warningSigns: [
        {
          severity: 'critical',
          title: 'Task Scam ("Recharge to Work") Mechanism',
          explanation:
            'Any program requiring you to deposit money into a platform account to complete "tasks", "optimize apps", or "audit orders" is fraudulent. Victims find their deposited money frozen behind escalating demands.',
          detectedPattern: 'TASK_OPTIMIZATION_FRAUD',
        },
        {
          severity: 'critical',
          title: 'Unsolicited WhatsApp / Telegram / LinkedIn Contact',
          explanation:
            'Recruiters sending cold messages offering high part-time pay for low-skill clicks are operating organized scam boiler rooms.',
          detectedPattern: 'UNSOLICITED_MESSAGING_OUTREACH',
        },
        {
          severity: 'high',
          title: 'Cryptocurrency Wallet Drain Risk',
          explanation:
            'Connecting a Web3 wallet to unfamiliar third-party websites exposes your wallet to malicious smart contract permit approvals that can drain all tokens.',
          detectedPattern: 'WEB3_SMART_CONTRACT_RISK',
        },
      ],
      unverifiedClaims: [
        {
          claim: 'OmniGlobal Task Arbitrage Lab is an accredited liquidity partner.',
          reasonNotVerified:
            'Corporate registration, team profiles, or audit reports: Not established by the sources retrieved.',
          riskImplication: 'Identity and legitimacy cannot be verified from available public records.',
        },
        {
          claim: 'Commissions and principal can be withdrawn at any time.',
          reasonNotVerified: 'Users globally report withdrawal errors requiring further "unlock deposits".',
          riskImplication: 'Complete loss of deposited USDT.',
        },
      ],
      sources: [
        {
          title: 'Interpol Alert: The Global Surge of Task-Based Investment Scams',
          url: 'https://www.interpol.int/en/Crimes/Financial-crime/Task-scams-warning',
          domain: 'interpol.int',
          snippet:
            'Criminal syndicates recruit victims through social media messaging, offering easy money for completing simple online tasks before requiring financial recharges.',
          relevanceScore: 0.99,
          verifiedAt: '2026-10-17T09:20:00Z',
          entityMatchStatus: 'general_advisory',
          matchLabel: 'General scam-pattern guidance',
          matchExplanation: 'Official international crime agency advisory on task scam tactics. Educational advisory.',
        },
        {
          title: 'FBI Cyber Division: Cryptocurrency Task Scam Warning',
          url: 'https://www.fbi.gov/investigate/cyber/task-scams',
          domain: 'fbi.gov',
          snippet:
            'Never pay money to earn money on task apps. Demands for USDT or cryptocurrency deposits are unequivocal red flags.',
          relevanceScore: 0.96,
          verifiedAt: '2026-10-17T09:20:00Z',
          entityMatchStatus: 'general_advisory',
          matchLabel: 'General scam-pattern guidance',
          matchExplanation: 'Official law enforcement advisory on cryptocurrency task scams. Educational advisory.',
        },
      ],
      recommendations: [
        {
          step: 1,
          priority: 'immediate',
          action: 'Do not connect your crypto wallet or deposit any cryptocurrency',
          rationale: 'Connecting your wallet or signing permissions can drain all existing tokens in your account.',
        },
        {
          step: 2,
          priority: 'immediate',
          action: 'Block and report the contact on the messaging platform',
          rationale: 'Prevent the scammers from re-engaging or sharing your contact details with secondary groups.',
        },
        {
          step: 3,
          priority: 'recommended',
          action: 'Revoke any token approvals if you already connected a Web3 wallet',
          rationale: 'Use tools like Revoke.cash to terminate any malicious contract allowances.',
        },
      ],
      limitations: [
        'Automated indicator match based on global task-scam threat signatures.',
        'Independent confirmation through blockchain intelligence tools is recommended for wallet forensics.',
      ],
      isDemo: true,
      providerInfo: {
        tinyfishConfigured: false,
        tinyfishUsed: false,
        geminiUsed: false,
        isDemo: true,
        searchQueriesExecuted: ['task scam recharge USDT order book review', 'OmniGlobal task arbitrage complaints'],
        rawProvider: 'Demo Benchmark Database',
      },
    },
  },
  {
    id: 'demo-ambassador-fee',
    title: 'Brand Ambassador & Paid Social Reviewer Invitation',
    subtitle: 'Lumina Athletic offering $350 in apparel + $50/reel but asking $28.50 customs fee',
    category: 'Brand Ambassador / Social Media',
    expectedRisk: 'NEEDS VERIFICATION',
    sampleCompany: 'Lumina Athletic Club',
    sampleUrl: 'https://lumina-athletic-club.store',
    sampleMessage:
      'Hey! Our PR team loves your aesthetic and wants to sponsor you as an official ambassador for our new athletic line. We will dispatch 3 complimentary activewear sets (value $350) and pay you $50 per reel posted. You just need to cover the international courier and customs clearance fee of $28.50 on our portal.',
    report: {
      id: 'demo-report-03',
      timestamp: '2026-10-17T09:25:00Z',
      inputSummary: {
        messageSnippet:
          'Lumina Athletic PR offering 3 free apparel sets + $50/reel. Applicant must pay $28.50 international shipping fee on their store.',
        url: 'https://lumina-athletic-club.store',
        companyName: 'Lumina Athletic Club',
        category: 'Brand Ambassador / Social Media',
      },
      riskCategory: 'NEEDS VERIFICATION',
      riskLevel: 'needs_verification',
      confidenceNote:
        'Common dropshipping ambassador model: the "free" items are low-quality items where the $28.50 shipping fee exceeds the actual retail manufacturing cost.',
      summary:
        'This message fits the common "ambassador shipping fee" business practice. While not necessarily an outright identity theft ring, the recipient is typically paying an inflated shipping charge for low-grade dropshipped garments, and the promised paid sponsorship rarely materializes.',
      evidenceBreakdown: {
        generalGuidance: [
          '[Better Business Bureau: Instagram Brand Ambassador DM Warning] (bbb.org): Be cautious of messages offering free products where you must pay shipping. You may pay more than items are worth.',
        ],
        directEntityEvidence: [],
        possibleNameMatches: [],
        userClaims: [
          'Dispatch 3 complimentary activewear sets (value $350) and pay $50 per reel.',
          'Recipient must pay $28.50 international courier and customs fee.',
        ],
        missingOrInconclusive: [
          'Independent corporate entity registration or established retail footprint: Not established by the sources retrieved.',
          'Documented payment records to creators: Not established by the sources retrieved.',
        ],
      },
      observations: [
        {
          label: 'Ambassador Recruitment Standard',
          detail: 'Sender sent identical copy-pasted DM without referencing specific portfolio content.',
          verified: true,
        },
        {
          label: 'Cost Structure',
          detail: 'The $28.50 shipping fee is often the entire profit margin for the operator.',
          verified: true,
        },
        {
          label: 'Domain Age',
          detail: 'Store domain was registered 3 weeks ago on Shopify/WooCommerce backend.',
          verified: false,
        },
      ],
      warningSigns: [
        {
          severity: 'high',
          title: 'Ambassador Shipping Fee Trap',
          explanation:
            'Legitimate brand ambassador partnerships provide goods and cover all shipping and import charges. If you have to pay for shipping to receive promotional goods, you are the customer, not an ambassador.',
          detectedPattern: 'AMBASSADOR_SHIPPING_UPCHARGE',
        },
        {
          severity: 'medium',
          title: 'Unrealistic Pay for Zero Metrics',
          explanation:
            'Promising $50 per reel regardless of view count, engagement rate, or audience demographics is a common promotional lure.',
          detectedPattern: 'UNSUBSTANTIATED_SPONSORSHIP_RATES',
        },
      ],
      unverifiedClaims: [
        {
          claim: 'The activewear retail value is $350.',
          reasonNotVerified:
            'Independent brand presence or established retail reviews: Not established by the sources retrieved.',
          riskImplication: 'Items are likely generic $3-$5 dropshipped goods from wholesale marketplaces.',
        },
        {
          claim: 'Future paid sponsorship contracts will be awarded.',
          reasonNotVerified:
            'Independent evidence of creator sponsorship payouts: Not established by the sources retrieved.',
          riskImplication: 'Recipients do not receive paid campaigns after paying the delivery fee.',
        },
      ],
      sources: [
        {
          title: 'Better Business Bureau: Instagram Brand Ambassador DM Warning',
          url: 'https://www.bbb.org/article/news-releases/24810-bbb-scam-alert-brand-ambassador-pitches',
          domain: 'bbb.org',
          snippet:
            'Be cautious of messages offering free products where you must pay handling or shipping. You may end up paying more than the items are worth with no actual paid gig.',
          relevanceScore: 0.95,
          verifiedAt: '2026-10-17T09:25:00Z',
          entityMatchStatus: 'general_advisory',
          matchLabel: 'General scam-pattern guidance',
          matchExplanation: 'Official consumer protection advisory regarding ambassador schemes. Not direct evidence against any specific entity.',
        },
      ],
      recommendations: [
        {
          step: 1,
          priority: 'immediate',
          action: 'Ask them to deduct the $28.50 from your first $50 reel payout',
          rationale:
            'A genuine marketing department can easily offset shipping against contractor fees. Deceptive brands will refuse immediately.',
        },
        {
          step: 2,
          priority: 'recommended',
          action: 'Reverse-image search their product catalog photos',
          rationale: 'Check if the apparel is simply re-listed from AliExpress or Temu at marked-up shipping prices.',
        },
      ],
      limitations: [
        'Some nascent direct-to-consumer apparel brands operate micro-influencer seed campaigns with customer shipping.',
        'This assessment flags elevated commercial risk rather than criminal fraud.',
      ],
      isDemo: true,
      providerInfo: {
        tinyfishConfigured: false,
        tinyfishUsed: false,
        geminiUsed: false,
        isDemo: true,
        searchQueriesExecuted: ['Lumina Athletic ambassador scam', 'Instagram ambassador shipping fee complaint'],
      },
    },
  },
  {
    id: 'demo-nsf-reu',
    title: 'National Science Foundation Undergraduate REU Fellowship',
    subtitle: 'NSF-funded Summer 2026 Computational Biology research fellowship at State University',
    category: 'Academic / Fellowship',
    expectedRisk: 'FEWER WARNING SIGNS FOUND',
    sampleCompany: 'National Science Foundation / State University REU',
    sampleUrl: 'https://reu.stateuniv.edu/compbio',
    sampleMessage:
      'Application Invitation: The National Science Foundation Research Experiences for Undergraduates (REU) site in Computational Biology at State University is accepting applications for Summer 2026. Selected undergraduate fellows receive a $6,000 stipend, on-campus housing, and a travel allowance. There are no application fees. Submit your transcripts, personal statement, and two faculty letters of recommendation via the university NSF portal (.edu).',
    report: {
      id: 'demo-report-04',
      timestamp: '2026-10-17T09:30:00Z',
      inputSummary: {
        messageSnippet:
          'NSF REU in Computational Biology at State University. $6,000 stipend, housing, travel allowance. Zero application fee. Apply via .edu portal.',
        url: 'https://reu.stateuniv.edu/compbio',
        companyName: 'National Science Foundation / State University REU',
        category: 'Academic / Fellowship',
      },
      riskCategory: 'FEWER WARNING SIGNS FOUND',
      riskLevel: 'fewer_warning_signs_found',
      confidenceNote:
        'Exhibits standard features of legitimate federally funded academic research programs. IMPORTANT: This finding does NOT guarantee legitimacy; verify the department contact directly.',
      summary:
        'The communication adheres to established standards for federally sponsored undergraduate research programs: it uses an institutional (.edu) domain, charges zero application fees, offers a standardized stipend, and requires rigorous academic recommendations rather than demanding money.',
      evidenceBreakdown: {
        generalGuidance: [
          '[National Science Foundation: Search for an REU Site] (nsf.gov): NSF REU sites provide undergraduate research opportunities with zero participation fees.',
        ],
        directEntityEvidence: [
          'Target URL (reu.stateuniv.edu/compbio) verified on accredited higher-education (.edu) institutional domain.',
        ],
        possibleNameMatches: [],
        userClaims: [
          'Selected fellows receive $6,000 stipend, housing, and travel allowance.',
          'Zero application fees. Apply via stateuniv.edu portal.',
        ],
        missingOrInconclusive: [
          'Specific NSF active grant award number: Not established by the sources retrieved in the brief text snippet.',
        ],
      },
      observations: [
        {
          label: 'Application Fee Policy',
          detail: 'Strictly zero application or placement fees required, consistent with federal grant regulations.',
          verified: true,
        },
        {
          label: 'Domain Authentication',
          detail: 'Hosted on official higher education (.edu) top-level domain managed under EDUCAUSE.',
          verified: true,
        },
        {
          label: 'Vetting Standard',
          detail: 'Requires formal academic transcripts and faculty letters of recommendation.',
          verified: true,
        },
      ],
      warningSigns: [],
      unverifiedClaims: [
        {
          claim: 'The grant award number is active for the current fiscal cycle.',
          reasonNotVerified:
            'Specific NSF Award ID: Not established by the sources retrieved in the short message snippet.',
          riskImplication: 'Applicants should confirm the award ID in the NSF public awards search database.',
        },
      ],
      sources: [
        {
          title: 'National Science Foundation: Search for an REU Site',
          url: 'https://www.nsf.gov/crssprgm/reu/reu_search.jsp',
          domain: 'nsf.gov',
          snippet:
            'NSF REU sites provide undergraduate students with hands-on research opportunities with generous stipends and zero participation or application fees.',
          relevanceScore: 0.99,
          verifiedAt: '2026-10-17T09:30:00Z',
          entityMatchStatus: 'general_advisory',
          matchLabel: 'General scam-pattern guidance',
          matchExplanation: 'Official government agency program standard for legitimate undergraduate research.',
        },
      ],
      recommendations: [
        {
          step: 1,
          priority: 'recommended',
          action: 'Verify the faculty directory listing at the host university',
          rationale: 'Confirm the Program Director listed on the REU site is an active tenured faculty member.',
        },
        {
          step: 2,
          priority: 'recommended',
          action: 'Apply strictly through the official .edu web portal',
          rationale: 'Never submit academic records or personal statements to unofficial email addresses (like @gmail.com).',
        },
      ],
      limitations: [
        'Notice: "Fewer warning signs found" does NOT constitute an endorsement or certification of safety.',
        'Sophisticated threat actors may spoof academic letterheads. Always verify faculty contacts through verified university directories.',
      ],
      isDemo: true,
      providerInfo: {
        tinyfishConfigured: false,
        tinyfishUsed: false,
        geminiUsed: false,
        isDemo: true,
        searchQueriesExecuted: ['State University NSF REU Computational Biology 2026'],
      },
    },
  },
];
