import { TrademarkClass, ComplianceDeadline, EntityComparison, QueryCategory } from '../types';

export const TRADEMARK_CLASSES: TrademarkClass[] = [
  // GOODS: Classes 1 to 34
  {
    classNumber: 1,
    type: 'Goods',
    title: 'Chemicals & Raw Materials',
    description: 'Chemicals used in industry, science, photography, agriculture, horticulture, and forestry.',
    keywords: ['fertilizers', 'resins', 'plastics', 'adhesives', 'chemical', 'biotech'],
    examples: ['Industrial chemicals', 'Synthetic resins', 'Soil fertilizers', 'Epoxy adhesives']
  },
  {
    classNumber: 2,
    type: 'Goods',
    title: 'Paints, Coatings & Colorants',
    description: 'Paints, varnishes, lacquers; preservatives against rust and deterioration of wood; colorants.',
    keywords: ['paints', 'varnish', 'pigments', 'coatings', 'inks for printing', 'dyes'],
    examples: ['Wall paints', 'Automotive coatings', 'Printing inks', 'Wood primers']
  },
  {
    classNumber: 3,
    type: 'Goods',
    title: 'Cosmetics, Skincare & Cleaning Preparations',
    description: 'Non-medicated cosmetics, perfumes, essential oils, soaps, shampoos, and cleaning preparations.',
    keywords: ['cosmetics', 'perfumes', 'skincare', 'makeup', 'soaps', 'detergents', 'beauty'],
    examples: ['Face serums', 'Sunscreen lotions', 'Organic perfumes', 'Herbal shampoos']
  },
  {
    classNumber: 4,
    type: 'Goods',
    title: 'Industrial Oils, Greases & Fuels',
    description: 'Industrial oils and greases, wax; lubricants; dust absorbing compositions; fuels and illuminants.',
    keywords: ['lubricants', 'fuel', 'petroleum', 'candles', 'biofuel', 'grease'],
    examples: ['Motor oil', 'Scented candles', 'Industrial lubricants', 'Gasoline']
  },
  {
    classNumber: 5,
    type: 'Goods',
    title: 'Pharmaceuticals, Dietetic Foods & Medical Supplies',
    description: 'Pharmaceuticals, medical and veterinary preparations; sanitary preparations; dietary supplements.',
    keywords: ['medicine', 'pharma', 'drugs', 'ayurvedic', 'dietary supplements', 'vitamins', 'disinfectants'],
    examples: ['Prescription medicines', 'Ayurvedic formulations', 'Whey protein & vitamins', 'First aid kits']
  },
  {
    classNumber: 6,
    type: 'Goods',
    title: 'Metals & Metal Building Materials',
    description: 'Common metals and their alloys; metal materials for building; small items of metal hardware.',
    keywords: ['steel', 'aluminum', 'pipes', 'hardware', 'bolts', 'locks', 'wires'],
    examples: ['Steel rods', 'Aluminium frames', 'Door locks and brass fittings', 'Metal wire cables']
  },
  {
    classNumber: 7,
    type: 'Goods',
    title: 'Machinery, Machine Tools & Motors',
    description: 'Machines, machine tools, power-operated tools; motors and engines (except for land vehicles).',
    keywords: ['machines', 'generators', 'robots', 'pumps', 'electric motors', 'industrial equipment'],
    examples: ['CNC cutting machines', 'Water pumps', 'Robotic arms', 'Power drills']
  },
  {
    classNumber: 8,
    type: 'Goods',
    title: 'Hand Tools & Cutlery',
    description: 'Hand tools and implements, hand-operated; cutlery; side arms; razors.',
    keywords: ['hand tools', 'knives', 'scissors', 'cutlery', 'razors', 'spanners'],
    examples: ['Kitchen knives', 'Garden shears', 'Safety razors', 'Hand screwdrivers']
  },
  {
    classNumber: 9,
    type: 'Goods',
    title: 'Computers, Software (Products), Electronics & AI Hardware',
    description: 'Downloadable software, mobile applications, computer hardware, electronics, sensors, AI chips, semiconductors.',
    keywords: ['software', 'apps', 'mobile app', 'computer', 'ai', 'iot', 'electronics', 'smartphones', 'headphones', 'saas product'],
    examples: ['Downloadable mobile apps', 'Operating systems', 'Smart watches', 'Crypto wallets', 'AI server hardware']
  },
  {
    classNumber: 10,
    type: 'Goods',
    title: 'Medical Devices & Apparatus',
    description: 'Surgical, medical, dental and veterinary apparatus and instruments; orthopaedic articles.',
    keywords: ['medical devices', 'hospital equipment', 'implants', 'thermometers', 'diagnostic tools'],
    examples: ['Blood pressure monitors', 'Dental drills', 'Surgical gloves', 'Orthopaedic braces']
  },
  {
    classNumber: 11,
    type: 'Goods',
    title: 'Lighting, Heating, Cooling & Sanitary',
    description: 'Apparatus and installations for lighting, heating, cooling, steam generating, cooking, drying, ventilating.',
    keywords: ['led lights', 'air conditioner', 'water purifier', 'refrigerators', 'heaters', 'solar water heater'],
    examples: ['Smart LED bulbs', 'Inverter air conditioners', 'UV water filters', 'Electric ovens']
  },
  {
    classNumber: 12,
    type: 'Goods',
    title: 'Vehicles, Electric Mobility & Parts',
    description: 'Vehicles; apparatus for locomotion by land, air or water; electric scooters, cars, bicycles.',
    keywords: ['vehicles', 'ev', 'electric cars', 'bicycles', 'motorcycles', 'drones', 'automotive parts'],
    examples: ['Electric two-wheelers', 'Commercial trucks', 'Delivery drones', 'Bicycle helmets & accessories']
  },
  {
    classNumber: 14,
    type: 'Goods',
    title: 'Jewelry, Precious Metals & Watches',
    description: 'Precious metals and alloys; jewellery, precious and semi-precious stones; horological and chronometric instruments.',
    keywords: ['gold', 'diamonds', 'jewelry', 'watches', 'silverware', 'luxury rings'],
    examples: ['Diamond rings', 'Gold necklaces', 'Mechanical wristwatches', 'Silver cufflinks']
  },
  {
    classNumber: 16,
    type: 'Goods',
    title: 'Paper Goods, Books, Stationery & Printed Matter',
    description: 'Paper, cardboard; printed matter; bookbinding material; photographs; stationery; instructional materials.',
    keywords: ['books', 'stationery', 'packaging boxes', 'office supplies', 'printed guides', 'notebooks'],
    examples: ['Business journals', 'Eco-friendly cardboard boxes', 'Fountain pens', 'Educational textbooks']
  },
  {
    classNumber: 25,
    type: 'Goods',
    title: 'Clothing, Footwear & Headwear',
    description: 'Clothing, footwear, headgear for human wear (fashion, activewear, formalwear).',
    keywords: ['clothing', 'fashion', 't-shirts', 'shoes', 'sneakers', 'hoodies', 'apparel', 'hats'],
    examples: ['Cotton t-shirts', 'Designer sneakers', 'Ethnic kurtas & sarees', 'Winter jackets']
  },
  {
    classNumber: 29,
    type: 'Goods',
    title: 'Meat, Dairy, Edible Oils & Preserved Foods',
    description: 'Meat, fish, poultry; preserved, frozen, dried fruits and vegetables; jellies, jams, eggs; milk, cheese, butter.',
    keywords: ['dairy', 'milk', 'cheese', 'edible oil', 'frozen vegetables', 'dry fruits', 'packaged food'],
    examples: ['Organic cow milk & ghee', 'Processed cheese slices', 'Cold-pressed sunflower oil', 'Almonds & cashews']
  },
  {
    classNumber: 30,
    type: 'Goods',
    title: 'Coffee, Tea, Spices, Bakery & Confectionery',
    description: 'Coffee, tea, cocoa; rice, pasta, noodles; flour and preparations made from cereals; bread, pastries; spices.',
    keywords: ['coffee', 'tea', 'spices', 'bakery', 'biscuits', 'chocolates', 'sweets', 'masalas'],
    examples: ['Arabica coffee beans', 'Assam tea bags', 'Indian curry spices', 'Artisan bakery sourdough']
  },
  {
    classNumber: 32,
    type: 'Goods',
    title: 'Beverages, Juices, Mineral Water & Soft Drinks',
    description: 'Beers; non-alcoholic beverages; mineral and aerated waters; fruit beverages and fruit juices; syrups.',
    keywords: ['beverages', 'energy drinks', 'packaged water', 'soda', 'fruit juice', 'beer'],
    examples: ['Cold-pressed juices', 'Sparkling mineral water', 'Energy tonic drinks', 'Craft beer']
  },

  // SERVICES: Classes 35 to 45
  {
    classNumber: 35,
    type: 'Services',
    title: 'Business Management, Consulting, Advertising & E-Commerce Retail',
    description: 'Advertising; business management, organization and administration; office functions; wholesale and retail store services; tax consulting; online marketplace.',
    keywords: ['tax consulting', 'business consulting', 'advertising', 'marketing', 'retail', 'e-commerce', 'hr services', 'recruitment', 'accounting services'],
    examples: ['Tax advisory & compliance services', 'Digital marketing agency', 'Online multi-brand retail store', 'Corporate management consulting']
  },
  {
    classNumber: 36,
    type: 'Services',
    title: 'Financial, Banking, Insurance & Real Estate',
    description: 'Financial, monetary and banking services; insurance services; real estate affairs; cryptocurrency exchange; venture capital.',
    keywords: ['fintech', 'banking', 'insurance', 'loans', 'crypto exchange', 'real estate', 'investment', 'wealth management'],
    examples: ['Mobile payment gateway services', 'Term life insurance brokerage', 'Commercial real estate leasing', 'Venture capital fund']
  },
  {
    classNumber: 37,
    type: 'Services',
    title: 'Construction, Installation & Repair Services',
    description: 'Construction services; installation and repair services; mining, oil and gas drilling.',
    keywords: ['construction', 'civil engineering', 'appliance repair', 'interior fitouts', 'electrician', 'solar installation'],
    examples: ['Residential building construction', 'EV charging station installation', 'IT hardware repair services']
  },
  {
    classNumber: 38,
    type: 'Services',
    title: 'Telecommunications & Data Transmission',
    description: 'Telecommunications services; internet access; broadcasting; messaging platforms.',
    keywords: ['telecom', 'voip', 'broadband', 'satellite communication', 'video streaming transmission', 'telecom api'],
    examples: ['VoIP calling platform', 'Fiber broadband internet provision', 'Live streaming transmission']
  },
  {
    classNumber: 39,
    type: 'Services',
    title: 'Logistics, Transport, Warehousing & Travel',
    description: 'Transport; packaging and storage of goods; travel arrangement; courier and freight delivery.',
    keywords: ['logistics', 'delivery', 'courier', 'warehousing', 'cab booking', 'freight forwarding', 'travel agency'],
    examples: ['Last-mile express parcel delivery', 'Cold chain warehousing', 'Ridesharing transport services']
  },
  {
    classNumber: 41,
    type: 'Services',
    title: 'Education, EdTech, Training & Entertainment',
    description: 'Education; providing of training; entertainment; sporting and cultural activities; e-learning platforms.',
    keywords: ['edtech', 'training', 'coaching', 'online courses', 'events', 'podcasts', 'gaming platforms', 'schools'],
    examples: ['Online coding bootcamp', 'Corporate compliance training', 'Digital media production', 'Music festival organizing']
  },
  {
    classNumber: 42,
    type: 'Services',
    title: 'Software Development, SaaS, Cloud & Technological Services',
    description: 'Scientific and technological services and research and design relating thereto; industrial analysis; design and development of computer hardware and software; SaaS (Software as a Service); cloud hosting.',
    keywords: ['software development', 'saas', 'cloud computing', 'it consulting', 'web development', 'ai model hosting', 'cybersecurity', 'custom coding'],
    examples: ['Custom enterprise software engineering', 'Cloud SaaS compliance platform', 'Cybersecurity audit & pen-testing', 'Mobile app UI/UX design']
  },
  {
    classNumber: 43,
    type: 'Services',
    title: 'Hospitality, Restaurants, Cafes & Catering',
    description: 'Services for providing food and drink; temporary accommodation; cloud kitchens; hotels and hostels.',
    keywords: ['restaurant', 'cafe', 'cloud kitchen', 'catering', 'hotel', 'resort', 'food delivery kitchen'],
    examples: ['Fine dining restaurant chain', 'Boutique eco-resort', 'On-demand corporate catering', 'Quick service cafe']
  },
  {
    classNumber: 44,
    type: 'Services',
    title: 'Healthcare, Medical Clinics, Spas & Agriculture',
    description: 'Medical services; veterinary services; hygienic and beauty care for human beings or animals; agriculture, horticulture and forestry services.',
    keywords: ['telemedicine', 'hospital', 'dental clinic', 'wellness spa', 'diagnostics', 'salon', 'veterinary'],
    examples: ['Digital health tele-consultation', 'Diagnostic pathology labs', 'Luxury salon and day spa', 'Organic farm management']
  },
  {
    classNumber: 45,
    type: 'Services',
    title: 'Legal Services, IP Prosecution & Security Services',
    description: 'Legal services; security services for the physical protection of tangible property and individuals; personal and social services.',
    keywords: ['legal services', 'trademark filing', 'litigation', 'company secretarial', 'security guards', 'notary', 'patent prosecution'],
    examples: ['Trademark & patent attorney services', 'Corporate governance & legal advisory', 'Physical security and guard management']
  }
];

export const COMPLIANCE_DEADLINES: ComplianceDeadline[] = [
  {
    id: 'gst-gstr1',
    title: 'GSTR-1 (Outward Supplies)',
    authority: 'GST',
    formName: 'Form GSTR-1',
    dueDate: '11th of every month (Monthly) / 13th of quarter-end month (QRMP)',
    frequency: 'Monthly',
    description: 'Statement of outward supplies of goods and services for businesses registered under regular GST scheme.',
    penaltyInfo: '₹50/day (₹20/day for NIL return) up to max cap.',
    category: 'tax'
  },
  {
    id: 'gst-gstr3b',
    title: 'GSTR-3B (Summary Return & Tax Payment)',
    authority: 'GST',
    formName: 'Form GSTR-3B',
    dueDate: '20th of every month (Monthly filers)',
    frequency: 'Monthly',
    description: 'Monthly summary return declaring tax liability, claiming Input Tax Credit (ITC), and paying net GST.',
    penaltyInfo: '18% p.a. interest on delayed tax liability + ₹50/day late fee.',
    category: 'tax'
  },
  {
    id: 'tds-deposit',
    title: 'Monthly TDS / TCS Payment',
    authority: 'Income Tax',
    formName: 'Challan ITNS 281',
    dueDate: '7th of following month (30th April for March)',
    frequency: 'Monthly',
    description: 'Deposit of Tax Deducted at Source (TDS) under sections 194C, 194J, 192, 194I, etc.',
    penaltyInfo: 'Interest at 1.5% per month or part of a month for delay in deposit.',
    category: 'tax'
  },
  {
    id: 'mca-dir3-kyc',
    title: 'DIR-3 KYC (Director Identification Number KYC)',
    authority: 'ROC / MCA',
    formName: 'Form DIR-3 KYC / Web KYC',
    dueDate: '30th September annually',
    frequency: 'Annual',
    description: 'Mandatory annual personal verification for every individual holding an active Director Identification Number (DIN).',
    penaltyInfo: 'Flat ₹5,000 penalty per director for delayed filing + DIN deactivation.',
    category: 'roc'
  },
  {
    id: 'mca-inc20a',
    title: 'Commencement of Business (INC-20A)',
    authority: 'ROC / MCA',
    formName: 'Form INC-20A',
    dueDate: 'Within 180 days of incorporation date',
    frequency: 'Event-based',
    description: 'Declaration filed by directors with bank proof showing paid-up share capital deposited by subscribers.',
    penaltyInfo: '₹50,000 company penalty + ₹1,000/day for directors; company striking off risk.',
    category: 'roc'
  },
  {
    id: 'mca-aoc4',
    title: 'AOC-4 (Filing of Financial Statements)',
    authority: 'ROC / MCA',
    formName: 'Form AOC-4 / AOC-4 XBRL',
    dueDate: 'Within 30 days of Annual General Meeting (typically 30th October)',
    frequency: 'Annual',
    description: 'Filing audited Balance Sheet, Profit & Loss Account, Auditor Report, and Directors Report with MCA.',
    penaltyInfo: '₹100 per day of delay without any upper ceiling.',
    category: 'roc'
  },
  {
    id: 'mca-mgt7',
    title: 'MGT-7 / MGT-7A (Annual Return)',
    authority: 'ROC / MCA',
    formName: 'Form MGT-7 / MGT-7A (Small Co)',
    dueDate: 'Within 60 days of AGM (typically 29th November)',
    frequency: 'Annual',
    description: 'Comprehensive annual return containing details of shareholding pattern, directors, meetings, and indebtedness.',
    penaltyInfo: '₹100 per day of continuous default.',
    category: 'roc'
  },
  {
    id: 'mca-adt1',
    title: 'ADT-1 (Auditor Appointment)',
    authority: 'ROC / MCA',
    formName: 'Form ADT-1',
    dueDate: 'Within 15 days of first board meeting / AGM auditor appointment',
    frequency: 'Event-based',
    description: 'Intimation of Statutory Auditor appointment to Registrar of Companies.',
    penaltyInfo: 'Progressive late fees up to 12 times normal filing fee.',
    category: 'roc'
  },
  {
    id: 'labor-pf-esi',
    title: 'EPF & ESIC Monthly Contribution & ECR',
    authority: 'Labour / PF',
    formName: 'Electronic Challan cum Return (ECR)',
    dueDate: '15th of every following month',
    frequency: 'Monthly',
    description: 'Deposit of Employee & Employer Provident Fund and Employee State Insurance contributions.',
    penaltyInfo: 'Damages under Section 14B (up to 25% p.a.) + 12% p.a. interest.',
    category: 'labor'
  },
  {
    id: 'it-advance-tax',
    title: 'Advance Tax Installments',
    authority: 'Income Tax',
    formName: 'Challan 280',
    dueDate: '15th June (15%), 15th Sept (45%), 15th Dec (75%), 15th March (100%)',
    frequency: 'Quarterly',
    description: 'Payment of income tax in advance where estimated tax liability for the financial year exceeds ₹10,000.',
    penaltyInfo: 'Interest under Section 234B and 234C (1% per month).',
    category: 'tax'
  }
];

export const ENTITY_COMPARISONS: EntityComparison[] = [
  {
    id: 'pvt-ltd',
    name: 'Private Limited (Pvt Ltd)',
    fullName: 'Private Limited Company (Companies Act 2013)',
    idealFor: 'Startups seeking venture capital, scaleups, businesses needing high credibility, multiple founders.',
    minMembers: 'Min 2 Directors, Min 2 Shareholders (Max 200)',
    fdiAllowed: true,
    separateLegalEntity: true,
    liability: 'Limited to unpaid capital on subscribed shares',
    avgSetupTime: '7 - 12 working days',
    annualComplianceCost: '₹20,000 - ₹50,000 / year (Audit mandatory)',
    taxRate: '22% base tax (Sec 115BAA) + surcharge + cess (~25.17%)',
    keyPros: [
      'Gold standard for raising VC / Angel funding',
      'Eligible for Startup India 80-IAC tax exemption & ESOPs',
      '100% Automatic route FDI permitted in most sectors',
      'High corporate credibility with banks and enterprise clients'
    ],
    keyCons: [
      'Mandatory annual statutory audit by practicing CA',
      'Higher compliance burden (AOC-4, MGT-7, Board meetings, DIN KYC)',
      'Restrictions on public deposit taking and share transfers'
    ],
    mandatoryFilings: ['SPICe+ Part A/B', 'INC-20A', 'ADT-1', 'AOC-4', 'MGT-7', 'DIR-3 KYC']
  },
  {
    id: 'llp',
    name: 'Limited Liability Partnership (LLP)',
    fullName: 'Limited Liability Partnership (LLP Act 2008)',
    idealFor: 'Consulting firms, digital agencies, professional services, small manufacturing, bootstrapped ventures.',
    minMembers: 'Min 2 Designated Partners (No upper limit)',
    fdiAllowed: true,
    separateLegalEntity: true,
    liability: 'Limited to agreed contribution in LLP Agreement',
    avgSetupTime: '10 - 15 working days',
    annualComplianceCost: '₹8,000 - ₹20,000 / year (Audit only if turnover > ₹40L or capital > ₹25L)',
    taxRate: '30% base tax + surcharge + cess (~31.2%)',
    keyPros: [
      'No mandatory audit if turnover is under ₹40 Lakhs / contribution under ₹25 Lakhs',
      'Lower annual ROC filing burden (Form 8 & Form 11)',
      'No dividend distribution tax / simpler profit extraction for partners',
      'Protection of personal assets for each partner against debts'
    ],
    keyCons: [
      'Cannot issue equity shares or grant employee stock options (ESOPs)',
      'Not preferred by venture capital and institutional investors',
      'Flat 30% corporate income tax rate (higher than 22% for companies)'
    ],
    mandatoryFilings: ['FiLLiP', 'Form 3 (LLP Agreement)', 'Form 11 (Annual Return)', 'Form 8 (Statement of Accounts)']
  },
  {
    id: 'opc',
    name: 'One Person Company (OPC)',
    fullName: 'One Person Company (Section 2(62) Companies Act 2013)',
    idealFor: 'Solo founders wanting corporate identity, limited liability, and sole ownership without partners.',
    minMembers: '1 Shareholder / Director + 1 Nominee Director',
    fdiAllowed: false,
    separateLegalEntity: true,
    liability: 'Limited to unpaid share value',
    avgSetupTime: '7 - 10 working days',
    annualComplianceCost: '₹15,000 - ₹35,000 / year',
    taxRate: '22% base tax (~25.17%)',
    keyPros: [
      'Complete control in hands of a single individual',
      'Corporate status with limited personal liability',
      'Exempt from certain AGM and Board meeting rules'
    ],
    keyCons: [
      'Must designate a nominee director in MOA',
      'Cannot raise venture capital equity from multiple shareholders',
      'Mandatory annual audit like standard Pvt Ltd'
    ],
    mandatoryFilings: ['SPICe+ Part A/B', 'INC-20A', 'ADT-1', 'AOC-4', 'MGT-7A', 'DIR-3 KYC']
  },
  {
    id: 'sole-prop',
    name: 'Sole Proprietorship',
    fullName: 'Sole Proprietorship Firm (Unregistered entity)',
    idealFor: 'Local shops, micro-freelancers, single-owner testing an idea with zero compliance overhead.',
    minMembers: '1 Individual',
    fdiAllowed: false,
    separateLegalEntity: false,
    liability: 'UNLIMITED - Personal assets are fully at risk',
    avgSetupTime: '1 - 3 working days',
    annualComplianceCost: 'Minimal (Individual Income Tax return + GST if registered)',
    taxRate: 'Individual Income Tax slab rates (up to 30% + cess)',
    keyPros: [
      'No ROC filings, no MCA approvals, no minimum capital',
      'Easy to start via Udyam (MSME) & GST registration',
      'Lowest operational and maintenance costs'
    ],
    keyCons: [
      'Unlimited personal liability for business debts and lawsuits',
      'Cannot bring in partners or raise external equity investment',
      'Dies with the proprietor (no perpetual succession)'
    ],
    mandatoryFilings: ['Udyam Registration', 'GST Returns (if turnover > threshold)', 'ITR-3 / ITR-4']
  },
  {
    id: 'us-c-corp',
    name: 'US Delaware C-Corp',
    fullName: 'Delaware General Corporation (US)',
    idealFor: 'Global SaaS, startups pitching US investors / Y Combinator / Techstars, worldwide sales.',
    minMembers: 'Min 1 Director / Officer',
    fdiAllowed: true,
    separateLegalEntity: true,
    liability: 'Limited liability under Delaware General Corporation Law',
    avgSetupTime: '2 - 4 working days (via Stripe Atlas or Firstbase)',
    annualComplianceCost: '$500 - $2,500 / year (Delaware Franchise Tax + Registered Agent + US Tax Return)',
    taxRate: '21% US Federal Corporate Tax + State Tax',
    keyPros: [
      'The international standard for top tier venture capital & US accelerators',
      'Access to US banking (Mercury, Brex) and Stripe international processing',
      'Delaware Court of Chancery provides gold-standard business case law'
    ],
    keyCons: [
      'US tax return (Form 1120) and Delaware Franchise tax mandatory annually',
      'Double taxation considerations for Indian founders (transfer pricing, FEMA, round-tripping rules)',
      'Higher setup and cross-border accounting fees'
    ],
    mandatoryFilings: ['Certificate of Incorporation', 'Delaware Annual Franchise Tax Report', 'IRS Form 1120']
  }
];

export const QUERY_CATEGORIES: QueryCategory[] = [
  {
    id: 'trademark',
    title: 'Trademark & IP',
    icon: 'ShieldCheck',
    description: 'Class selection, TM search, opposition, objection defense & IP protection.',
    queries: [
      'What are the Indian Trademark classes for tax consulting services and enterprise software development?',
      'Which trademark class covers mobile apps, downloadable software, and cloud SaaS platforms?',
      'What should I do if my trademark application is objected under Section 9 or 11 of the Trade Marks Act?',
      'What are the trademark fees for an individual/startup vs a large company in India?'
    ]
  },
  {
    id: 'incorporation',
    title: 'Company Registration',
    icon: 'Building2',
    description: 'Pvt Ltd, LLP, OPC incorporation steps, SPICe+ forms, and director KYC.',
    queries: [
      'What is the step-by-step process to incorporate a Private Limited Company in India via SPICe+?',
      'What are the key differences between a Private Limited Company and an LLP for a tech startup?',
      'What is Form INC-20A (Commencement of Business) and what happens if not filed within 180 days?',
      'Can foreign nationals or NRIs be directors and hold 100% equity in an Indian Pvt Ltd?'
    ]
  },
  {
    id: 'tax-gst',
    title: 'GST & Taxation',
    icon: 'Receipt',
    description: 'GST registration thresholds, input tax credit, composition scheme & TDS.',
    queries: [
      'What are the mandatory GST registration thresholds for service providers and goods suppliers?',
      'Is GST registration mandatory for software exports or selling digital services to US clients?',
      'What are the monthly and quarterly due dates for GSTR-1, GSTR-3B, and TDS returns?',
      'What are the penalties for delayed GST returns and non-payment of tax?'
    ]
  },
  {
    id: 'startup-msme',
    title: 'Startup India & MSME',
    icon: 'Sparkles',
    description: 'DPIIT tax holidays (Sec 80-IAC), Udyam benefits, 45-day payment rule.',
    queries: [
      'How to get DPIIT recognition under Startup India and qualify for the Section 80-IAC tax exemption?',
      'What is the 45-day MSME payment rule under Section 43B(h) of the Income Tax Act?',
      'What are the benefits of Udyam MSME registration for trademark and patent subsidies?',
      'What documents are needed to apply for the Startup India Seed Fund Scheme (SISFS)?'
    ]
  },
  {
    id: 'annual-compliance',
    title: 'Annual ROC Compliance',
    icon: 'Calendar',
    description: 'AOC-4, MGT-7, DIR-3 KYC, Statutory Audit, and board meeting mandates.',
    queries: [
      'What is the annual ROC compliance checklist and calendar for a Private Limited Company?',
      'What is DIR-3 KYC, who is required to file it, and what is the penalty after September 30?',
      'What is the timeline and procedure for appointing a statutory auditor using Form ADT-1?',
      'What are the consequences of striking off a company under Section 248 of the Companies Act?'
    ]
  },
  {
    id: 'licenses-regulatory',
    title: 'Licenses & Regulatory',
    icon: 'FileText',
    description: 'FSSAI, Import Export Code (IEC), DPDP Act, Shop & Establishment.',
    queries: [
      'How to obtain an Import Export Code (IEC) from DGFT and what compliance is required?',
      'What are the compliance requirements under India\'s Digital Personal Data Protection (DPDP) Act 2023?',
      'When is FSSAI Central license required vs State or Basic registration?',
      'What are the EPF and ESIC registration criteria and monthly compliance requirements?'
    ]
  }
];
