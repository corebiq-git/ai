import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

const SYSTEM_INSTRUCTION = `You are CorebIQ AI, the official and specialized Compliance & Corporate Advisory AI Assistant for entrepreneurs, startups, enterprises, and legal/tax professionals.
You specialize in Indian and global business registrations, regulatory filings, intellectual property, taxation, and statutory corporate compliance.

Your core domains of expertise:
1. Business Registration & Legal Entity Structuring:
   - Private Limited Company (Pvt Ltd): SPICe+ Part A (name reservation) & Part B (incorporation, DIN, PAN, TAN, EPFO, ESIC, Professional Tax, Bank Account opening, GSTIN), MOA & AOA, AGILE-PRO-S.
   - Limited Liability Partnership (LLP): RUN-LLP, FiLLiP, Form 3 (LLP agreement filing within 30 days).
   - One Person Company (OPC), Sole Proprietorship (Udyam + GST), Partnership Firm (Partnership deed + Registrar of Firms).
   - Global structures: US Delaware/Wyoming C-Corp (via Stripe Atlas, Firstbase), UK Ltd (Companies House), Singapore Pte Ltd.
2. Trademark & Intellectual Property (Nice Classification):
   - Exhaustive knowledge of all 45 Trademark Classes:
     * Class 9: Downloadable software, mobile apps, electronics, digital tokens, AI hardware.
     * Class 35: Business management, consulting, advertising, office functions, e-commerce retail, tax consulting.
     * Class 42: Software development, SaaS (Software as a Service), cloud hosting, IT engineering, tech architecture.
     * Class 36: Financial, banking, payments, fintech, insurance, crypto exchange.
     * Class 41: Education, training, entertainment, conferences.
     * Class 25: Clothing, footwear, headwear.
     * Class 5: Pharmaceuticals, ayurvedic medicines, supplements.
     * Class 30: Spices, coffee, tea, bakery items.
   - Trademark Registration Workflow: Public search on IP India / USPTO, filing Form TM-A (₹4,500 individual/startup/MSME vs ₹9,000 others in India), Examination report, Section 9 (absolute grounds of refusal) & Section 11 (relative grounds / conflicting marks) response, hearing before Registrar, publication in Trademark Journal, opposition period (4 months), issuance of Registration Certificate (valid for 10 years).
3. Taxation & Regulatory Registrations:
   - GST (Goods & Services Tax): Thresholds (₹40L for goods, ₹20L for services, ₹10L/₹20L for special category states). Mandatory registration for inter-state supply, casual taxable persons, and e-commerce operators. Form GST REG-01, GSTR-1, GSTR-3B, GSTR-9 annual return.
   - MSME / Udyam Registration: Benefits (50% fee concession on trademark filing, 80% on patent filing, priority sector lending, 45-day payment rule under Section 43B(h) of Income Tax Act).
   - Startup India DPIIT Recognition: Eligibility (under 10 years from incorporation, turnover < ₹100 Cr, innovative model), Section 80-IAC tax holiday (100% tax rebate for 3 consecutive years out of 10), Angel Tax exemption (Section 56(2)(viib)), patent facilitation.
   - Import Export Code (IEC) from DGFT.
   - Professional Tax, Shop & Establishment Act, FSSAI (Food Safety and Standards Authority of India: Basic registration vs State vs Central license).
4. Statutory & Annual MCA / ROC Compliances:
   - Form INC-20A: Declaration of commencement of business within 180 days of incorporation with bank deposit proof (crucial; failure leads to strike-off).
   - Form ADT-1: Intimation of appointment of statutory auditor within 15 days of first board meeting / 30 days of incorporation.
   - Form DIR-3 KYC: Mandatory annual KYC for every individual DIN holder by 30th September (delay carries ₹5,000 penalty per DIN).
   - Form AOC-4: Annual filing of audited financial statements, P&L, balance sheet, and board report within 30 days of AGM.
   - Form MGT-7 / MGT-7A: Annual return of shareholders and shareholding pattern within 60 days of AGM.
   - Statutory registers, minimum 4 board meetings per year (with no more than 120 days gap).
5. Data Privacy & Modern Governance:
   - India Digital Personal Data Protection (DPDP) Act 2023: Consent notice requirements, Data Principal rights, Data Fiduciary obligations, penalties up to ₹250 Crores for breaches.
   - GDPR readiness for cross-border data flows, SOC 2, ISO 27001 compliance frameworks.
   - POSH Act compliance (mandatory Internal Complaints Committee - ICC for organizations with 10+ employees).

Formatting & Tone Directives:
- Be clear, authoritative, highly structured, and directly practical.
- Use bold highlights for exact Trademark Class numbers (e.g. **Class 35**, **Class 42**), statutory form names (e.g. **SPICe+**, **INC-20A**, **DIR-3 KYC**), sections of law (e.g. **Section 9**, **Section 43B(h)**), and strict deadline dates.
- Use bullet points, checklists, and step-by-step numbered guides where appropriate.
- Conclude with 2 to 4 recommended follow-up queries that the user can explore next.
- Include a brief standard footnote: "CorebIQ AI provides automated regulatory intelligence. Please verify final legal filings with a practicing Company Secretary (CS), Chartered Accountant (CA), or IP Attorney."`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    aiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Chat endpoint
app.post('/api/compliance/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message string is required.' });
    }

    const ai = getGenAI();

    // If Gemini API is configured, call Gemini 3.8 Flash
    if (ai) {
      try {
        // Format history if provided
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.role && item.text) {
              contents.push({
                role: item.role === 'user' ? 'user' : 'model',
                parts: [{ text: item.text }],
              });
            }
          }
        }

        // Add current user message
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const promptWithInstruction = `${SYSTEM_INSTRUCTION}

User Query: "${message}"

Please provide a comprehensive, organized response with clear headings, actionable steps, applicable laws/forms, and 3 suggested follow-up questions at the very end formatted as:
---FOLLOW_UPS---
- Question 1
- Question 2
- Question 3`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptWithInstruction,
        });

        const fullText = response.text || '';
        
        // Extract follow-ups if present
        let cleanContent = fullText;
        let followUps: string[] = [];

        if (fullText.includes('---FOLLOW_UPS---')) {
          const parts = fullText.split('---FOLLOW_UPS---');
          cleanContent = parts[0].trim();
          const rawFollowUps = parts[1] || '';
          followUps = rawFollowUps
            .split('\n')
            .map((line: string) => line.replace(/^[-*•\d.]+\s*/, '').trim())
            .filter((line: string) => line.length > 5)
            .slice(0, 4);
        }

        if (followUps.length === 0) {
          followUps = generateDynamicFollowUps(message);
        }

        return res.json({
          content: cleanContent,
          suggestedFollowUps: followUps,
        });
      } catch (geminiError) {
        console.error('Gemini API call failed, using high-accuracy fallback compliance engine:', geminiError);
        // Fallback to internal compliance knowledge base
        const fallback = getFallbackComplianceResponse(message);
        return res.json(fallback);
      }
    } else {
      // Gemini API key not provided, use built-in compliance knowledge engine
      const fallback = getFallbackComplianceResponse(message);
      return res.json(fallback);
    }
  } catch (error) {
    console.error('Server error in /api/compliance/chat:', error);
    res.status(500).json({
      error: 'An internal server error occurred while processing compliance query.',
    });
  }
});

function generateDynamicFollowUps(query: string): string[] {
  const q = query.toLowerCase();
  if (q.includes('trademark') || q.includes('tm') || q.includes('class')) {
    return [
      'What documents are needed for filing Form TM-A in India?',
      'How to resolve a Section 9 or Section 11 trademark objection?',
      'What are the government filing fees with Udyam / MSME rebate?',
      'How does international trademark registration work under the Madrid Protocol?',
    ];
  }
  if (q.includes('pvt ltd') || q.includes('incorporat') || q.includes('register') || q.includes('company')) {
    return [
      'What is the statutory deadline and procedure for filing Form INC-20A?',
      'What are the minimum capital and director residency requirements?',
      'What is the difference between SPICe+ Part A and Part B?',
      'Which is better for a SaaS startup: Pvt Ltd or LLP?',
    ];
  }
  if (q.includes('gst') || q.includes('tax')) {
    return [
      'Is GST registration mandatory for selling software to overseas clients?',
      'What is the penalty for filing GSTR-3B after the 20th of the month?',
      'How to claim Input Tax Credit (ITC) under GSTR-2B matching rules?',
      'What is the 45-day payment rule under Section 43B(h) for MSMEs?',
    ];
  }
  return [
    'What are the Indian Trademark classes for my business domain?',
    'What are the mandatory annual ROC filings for a Private Limited company?',
    'What is Form INC-20A and what is the penalty for non-filing?',
    'How do I claim DPIIT recognition under Startup India?',
  ];
}

function getFallbackComplianceResponse(query: string): { content: string; suggestedFollowUps: string[] } {
  const q = query.toLowerCase();

  if (q.includes('trademark') && (q.includes('tax') || q.includes('software') || q.includes('consulting') || q.includes('enterprise'))) {
    return {
      content: `Under the Indian Trademark Classification (Nice Classification, 12th Edition), you will need **two distinct classes** for tax consulting services and enterprise software development:

### 1. **Class 35: Business & Tax Consulting Services**
* **Scope:** Covers business management, organization, administration, office functions, and professional tax consulting services.
* **Relevant Specification of Services:**
  * *Tax preparation and tax consulting services*
  * *Business advisory, accounting, and book-keeping services*
  * *Commercial administration and enterprise management consulting*
* **Why it is essential:** Protects your brand name when offering tax advisory, compliance services, and corporate management.

---

### 2. **Class 42: Enterprise Software Development & IT Services**
* **Scope:** Covers technological and scientific services, software engineering, architecture, and cloud SaaS.
* **Relevant Specification of Services:**
  * *Design and development of enterprise software and web applications*
  * *Software as a Service (SaaS) and Cloud computing solutions*
  * *IT consultancy, cybersecurity, and technological architecture design*
* **Why it is essential:** Protects your company name as the technological developer and provider of enterprise platforms.

---

### 💡 Additional Consideration: **Class 9** (If selling standalone software products)
* If you distribute downloadable desktop software, mobile applications, or on-premise software licenses as a product (rather than pure cloud/SaaS), you should also consider **Class 9** (*Downloadable computer software and recorded applications*).

---

### 📋 Statutory Filing Details (Form TM-A):
* **Government Fees:**
  * **Individual / Startup (DPIIT) / MSME (Udyam):** ₹4,500 per class (₹9,000 for 2 classes).
  * **Others (Non-MSME Companies):** ₹9,000 per class (₹18,000 for 2 classes).
* **Validity:** 10 years from the date of application, renewable indefinitely every 10 years.
* **Next Steps:** Conduct an identical and phonetic public search on the IP India Trademark Registry portal before filing.`,
      suggestedFollowUps: [
        'How to file Form TM-A with a 50% government fee concession using Udyam?',
        'What is the difference between Class 9 (software product) and Class 42 (software service)?',
        'How to respond to a Section 9 or Section 11 trademark examination report?',
        'What is the total timeline from filing to receiving the Trademark Registration Certificate?'
      ]
    };
  }

  if (q.includes('inc-20a') || q.includes('commencement of business')) {
    return {
      content: `### 📌 Form INC-20A: Declaration for Commencement of Business

Under **Section 10A of the Companies Act, 2013**, every company incorporated in India having a share capital is legally required to file **Form INC-20A** with the Registrar of Companies (ROC) before commencing any business operations or exercising borrowing powers.

---

### ⏳ Statutory Deadline:
* Must be filed **within 180 days** from the exact date of incorporation printed on your Certificate of Incorporation (COI).

---

### 📝 Mandatory Requirements & Attachments:
1. **Bank Account Opening:** The company's corporate current account must be active.
2. **Share Capital Deposit:** Each subscriber/founder must deposit their committed subscription money into the company's bank account via electronic transfer or cheque.
3. **Bank Statement Proof:** Bank statement reflecting the credit of subscription money with subscriber names.
4. **Registered Office Proof:** Geo-tagged photograph of the registered office from outside (showing the company name board) and inside.
5. **Professional Certification:** Mandatory digital signature certification by an independent practicing Company Secretary (CS) or Chartered Accountant (CA).

---

### ⚠️ Penalties for Non-Filing:
* **Company Penalty:** Fixed penalty of **₹50,000**.
* **Director Penalty:** **₹1,000 per day** of continuing default (up to a maximum of ₹1,00,000 per director).
* **Striking Off Risk:** The ROC can initiate suo-motu action under Section 248 to **strike off the company** from the register on the presumption that it is not carrying on business!`,
      suggestedFollowUps: [
        'What are the step-by-step instructions to generate and verify Form INC-20A on MCA V3?',
        'What is Form ADT-1 and why must it be filed within 30 days of incorporation?',
        'What are the full first-year annual compliance requirements for a Pvt Ltd company?'
      ]
    };
  }

  if (q.includes('gst') || q.includes('export') || q.includes('threshold')) {
    return {
      content: `### 🏛️ GST Registration Requirements & Rules

Under the **Central Goods and Services Tax (CGST) Act, 2017**:

### 1. Mandatory Threshold Limits:
* **Service Providers:** Turnover exceeding **₹20 Lakhs** per annum (₹10 Lakhs in Special Category States like Manipur, Mizoram, Nagaland, Tripura).
* **Goods Suppliers:** Turnover exceeding **₹40 Lakhs** for intra-state supply of goods (subject to state-specific adoptions, standard threshold is ₹20 Lakhs for services).

---

### 2. Mandatory Registration (Irrespective of Turnover):
* **Inter-State Suppliers:** Making sales or providing services across state borders.
* **E-Commerce Sellers:** Supplying goods/services through Amazon, Flipkart, etc.
* **Software Exporters:** Selling digital services to clients outside India. *(Note: While export of services is zero-rated under Section 16 of IGST Act, GST registration and Letter of Undertaking - LUT are mandatory to export without paying 18% IGST).*
* **Reverse Charge Mechanism (RCM):** Persons required to pay tax under RCM.

---

### 3. Key Compliance Calendar:
* **GSTR-1:** By 11th of every month (outward supplies).
* **GSTR-3B:** By 20th of every month (tax liability summary & ITC offset).
* **GSTR-9:** Annual return due by 31st December following the financial year end.`,
      suggestedFollowUps: [
        'How to file a Letter of Undertaking (LUT) on the GST portal for export of services?',
        'What are the penalties for delayed filing of GSTR-3B and interest calculations?',
        'Can an IT consulting startup claim Input Tax Credit on laptop purchases and office rent?'
      ]
    };
  }

  // General compliance answer
  return {
    content: `### 🏢 CorebIQ AI Compliance Advisory

Here is expert regulatory guidance regarding **${query}**:

### 1. Statutory Framework & Jurisdiction:
Business entities in India operate under the **Companies Act, 2013**, **Trade Marks Act, 1999**, **Central Goods & Services Tax (CGST) Act, 2017**, and the **Income Tax Act, 1961**. Depending on your industry, specific licenses such as FSSAI, Shop & Establishment, or DPDP Act compliance will apply.

---

### 2. Key Actionable Steps:
* **Entity Verification:** Ensure your legal entity (Pvt Ltd, LLP, or Proprietorship) is backed by valid constitutional documents (MOA/AOA, LLP Agreement, or Udyam).
* **IP Protection:** Secure your brand name, logo, and software products under the appropriate **Trademark Classes** (e.g. Class 9 for software products, Class 35 for consulting/retail, Class 42 for SaaS/IT engineering).
* **Tax Compliance:** Verify whether your aggregate turnover or nature of operations triggers mandatory **GST registration** (mandatory for inter-state and software export under LUT).
* **MCA Mandatory Filings:** Ensure post-incorporation filings (**INC-20A** within 180 days, **ADT-1** within 30 days, **DIR-3 KYC** by Sept 30) are strictly up to date to prevent heavy daily penalties.

---

*CorebIQ AI provides automated regulatory intelligence. Please verify final legal filings with a practicing Company Secretary (CS), Chartered Accountant (CA), or IP Attorney.*`,
    suggestedFollowUps: [
      'What are the Indian Trademark classes for tax consulting services and enterprise software development?',
      'What is Form INC-20A (Commencement of Business) and what is the penalty?',
      'What are the differences between a Private Limited company and an LLP?',
      'What are the due dates for GSTR-1, GSTR-3B, and annual ROC filings?'
    ]
  };
}

// Vite middleware configuration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CorebIQ AI Compliance Assistant running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
