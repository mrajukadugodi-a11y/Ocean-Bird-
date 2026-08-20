import {
  VaccinationCentre,
  MedicalHealthRecord,
  VaccineBookingRecord,
  InternationalInsurancePlan,
  HealthLedgerBlock,
  HealthTrendMetric,
  InsuranceCoverageZone,
  MedicalSyncInfo,
  SeismicVolcanoAlert,
  EmergencyNotification,
  MarineRescueDrone,
  GeoHazardSimulation,
  TsunamiEvacuationZone,
  EmergencyBroadcastLog
} from '../types';

export const VACCINATION_CENTRES: VaccinationCentre[] = [
  // DOMESTIC CENTRES (e.g. India domestic / regional hubs)
  {
    id: 'VAC-DOM-01',
    name: 'National Port & Airport Quarantine Medical Centre',
    category: 'Domestic',
    type: 'WHO Accredited Travel Clinic',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Mumbai',
    address: 'Terminal 2 International Medical Wing, CSMI Airport / Port Trust Hospital Rd',
    coordinates: { lat: 19.0896, lng: 72.8656 },
    phone: '+91 22 2682 8900',
    email: 'vaccination.mumbai@porthealth.gov.in',
    operatingHours: '08:00 AM - 08:00 PM (Mon-Sat)',
    rating: 4.8,
    reviewsCount: 1240,
    accreditation: 'WHO Yellow Fever Authorized & MoHFW India Certified',
    availableVaccines: [
      { name: 'Yellow Fever (Stamaril)', code: 'YF-100', priceUSD: 45, inStock: true, requiredForTravelTo: ['Kenya', 'Brazil', 'Nigeria', 'Ghana', 'Peru'] },
      { name: 'Typhoid Conjugate (Typbar-TCV)', code: 'TYP-20', priceUSD: 25, inStock: true },
      { name: 'Cholera Oral (Dukoral)', code: 'CHO-15', priceUSD: 35, inStock: true, requiredForTravelTo: ['Sudan', 'Haiti'] },
      { name: 'Hepatitis A & B Combo (Twinrix)', code: 'HEP-AB', priceUSD: 50, inStock: true },
      { name: 'Meningococcal ACWY (Menactra)', code: 'MEN-4', priceUSD: 60, inStock: true, requiredForTravelTo: ['Saudi Arabia (Hajj/Umrah)', 'Sub-Saharan Belt'] },
      { name: 'COVID-19 Booster (Updated JN.1)', code: 'COV-B3', priceUSD: 20, inStock: true }
    ],
    services: ['ICVP Yellow Card Issuance', 'International Travel Health Clearance', 'Seafarers Fit-for-Duty Medicals', 'Express Drive-Thru PCR'],
    emergencyContact: '+91 22 2682 9999',
    walkInAllowed: true
  },
  {
    id: 'VAC-DOM-02',
    name: 'Delhi International Airport Travel Health Clinic',
    category: 'Domestic',
    type: 'International Airport Medical Center',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'New Delhi',
    address: 'Indira Gandhi International Airport, Terminal 3 Departure Level, New Delhi',
    coordinates: { lat: 28.5562, lng: 77.1000 },
    phone: '+91 11 4963 8000',
    email: 'travelhealth@delhiairport.com',
    operatingHours: '24/7 Open Daily',
    rating: 4.9,
    reviewsCount: 2150,
    accreditation: 'AOCI Accredited & WHO Yellow Fever Approved',
    availableVaccines: [
      { name: 'Yellow Fever (Stamaril)', code: 'YF-100', priceUSD: 48, inStock: true, requiredForTravelTo: ['Kenya', 'Tanzania', 'Colombia', 'Brazil'] },
      { name: 'Japanese Encephalitis (Ixiaro)', code: 'JE-01', priceUSD: 55, inStock: true, requiredForTravelTo: ['Southeast Asia'] },
      { name: 'Rabies Pre-Exposure (Rabivax)', code: 'RAB-02', priceUSD: 30, inStock: true },
      { name: 'Polio IPV Booster', code: 'POL-01', priceUSD: 18, inStock: true, requiredForTravelTo: ['Afghanistan', 'Pakistan', 'Somalia'] },
      { name: 'Meningococcal ACWY', code: 'MEN-4', priceUSD: 62, inStock: true }
    ],
    services: ['Instant ICVP Stamping', 'Fit-to-Fly Certification', 'Tele-Consultation', 'Emergency Maritime Medicals'],
    emergencyContact: '+91 11 4963 9111',
    walkInAllowed: true
  },
  {
    id: 'VAC-DOM-03',
    name: 'Kolkata Port Trust Hospital & Vaccine Terminal',
    category: 'Domestic',
    type: 'Seaport Health Terminal',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Kolkata',
    address: '1 Circular Garden Reach Rd, Kidderpore Seaport Complex, Kolkata',
    coordinates: { lat: 22.5354, lng: 88.3182 },
    phone: '+91 33 2439 1200',
    email: 'health.kolkataport@nic.in',
    operatingHours: '09:00 AM - 06:00 PM (Mon-Fri)',
    rating: 4.6,
    reviewsCount: 890,
    accreditation: 'Directorate General of Shipping Approved',
    availableVaccines: [
      { name: 'Yellow Fever (Stamaril)', code: 'YF-100', priceUSD: 42, inStock: true },
      { name: 'Typhoid Conjugate', code: 'TYP-20', priceUSD: 22, inStock: true },
      { name: 'Tetanus & Diphtheria (Td)', code: 'TD-10', priceUSD: 12, inStock: true },
      { name: 'Hepatitis B Adult', code: 'HEP-B', priceUSD: 25, inStock: true }
    ],
    services: ['Seafarer Medical Certificate (MS Rule)', 'WHO Yellow Card', 'Blood Group & DNA Profiling'],
    emergencyContact: '+91 33 2439 1234',
    walkInAllowed: false
  },
  {
    id: 'VAC-DOM-04',
    name: 'Chennai Port Marine Medical & Vaccination Institute',
    category: 'Domestic',
    type: 'WHO Accredited Travel Clinic',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Chennai',
    address: 'Rajaji Salai, Opposite Chennai Port Gate No 3, George Town, Chennai',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    phone: '+91 44 2536 2200',
    email: 'vaccines@chennaiport.gov.in',
    operatingHours: '08:30 AM - 07:00 PM (Mon-Sat)',
    rating: 4.7,
    reviewsCount: 1120,
    accreditation: 'WHO & Indian Coast Guard Certified',
    availableVaccines: [
      { name: 'Yellow Fever (Stamaril)', code: 'YF-100', priceUSD: 45, inStock: true },
      { name: 'Meningococcal ACWY', code: 'MEN-4', priceUSD: 58, inStock: true },
      { name: 'Influenza Quadrivalent', code: 'FLU-04', priceUSD: 28, inStock: true },
      { name: 'Cholera Oral', code: 'CHO-15', priceUSD: 32, inStock: true }
    ],
    services: ['ICVP Yellow Card', 'Tropical Travel Advisory', 'Rabies Post-Exposure Care'],
    emergencyContact: '+91 44 2536 9999',
    walkInAllowed: true
  },

  // INTERNATIONAL CENTRES
  {
    id: 'VAC-INT-01',
    name: 'Singapore Changi International Travel Health Hub',
    category: 'International',
    type: 'International Airport Medical Center',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    city: 'Singapore',
    address: 'Terminal 3 Transit Area Level 2, Changi Airport, Singapore 819663',
    coordinates: { lat: 1.3644, lng: 103.9915 },
    phone: '+65 6543 2123',
    email: 'changi.health@rafflesmedical.com',
    operatingHours: '24/7 Open Daily',
    rating: 4.95,
    reviewsCount: 4320,
    accreditation: 'WHO Global Travel Health Hub & MOH Singapore Accredited',
    availableVaccines: [
      { name: 'Yellow Fever (Stamaril)', code: 'YF-100', priceUSD: 85, inStock: true, requiredForTravelTo: ['Africa', 'South America'] },
      { name: 'Dengue Vaccine (Qdenga)', code: 'DEN-01', priceUSD: 110, inStock: true },
      { name: 'Japanese Encephalitis', code: 'JE-01', priceUSD: 95, inStock: true },
      { name: 'Rabies Vaccine (Verorab)', code: 'RAB-01', priceUSD: 75, inStock: true },
      { name: 'Meningococcal ACWY (Nimenrix)', code: 'MEN-4', priceUSD: 90, inStock: true }
    ],
    services: ['Digital ICVP Smart Pass Sync', 'Fast-Track Airport Vaccination', 'PCR & Rapid Antigen Test', 'Travel Pharmacy Kits'],
    emergencyContact: '+65 6543 9999',
    walkInAllowed: true
  },
  {
    id: 'VAC-INT-02',
    name: 'Dubai Healthcare City International Travel Clinic',
    category: 'International',
    type: 'WHO Accredited Travel Clinic',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    city: 'Dubai',
    address: 'Building 64, Al Razi Complex, Dubai Healthcare City, Dubai',
    coordinates: { lat: 25.2345, lng: 55.3210 },
    phone: '+971 4 362 4700',
    email: 'travelhealth@dhcc.ae',
    operatingHours: '07:30 AM - 10:00 PM Daily',
    rating: 4.9,
    reviewsCount: 3890,
    accreditation: 'DHA Dubai & WHO Yellow Fever Center of Excellence',
    availableVaccines: [
      { name: 'Yellow Fever (Stamaril)', code: 'YF-100', priceUSD: 90, inStock: true },
      { name: 'Meningococcal ACWY (MenQuadfi)', code: 'MEN-4', priceUSD: 85, inStock: true, requiredForTravelTo: ['Hajj Pilgrimage', 'Umrah'] },
      { name: 'Typhoid Vi Polysaccharide', code: 'TYP-10', priceUSD: 45, inStock: true },
      { name: 'Hepatitis A & B Combo', code: 'HEP-AB', priceUSD: 80, inStock: true },
      { name: 'Pneumococcal 20-valent (Prevnar 20)', code: 'PNEU-20', priceUSD: 120, inStock: true }
    ],
    services: ['Hajj & Umrah Health Permit Clearance', 'VIP Lounge Service', 'Express Digital QR Certification'],
    emergencyContact: '+971 4 362 9911',
    walkInAllowed: true
  },
  {
    id: 'VAC-INT-03',
    name: 'London Travel Clinic & Quarantine Station (Heathrow)',
    category: 'International',
    type: 'Government Quarantine Station',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    city: 'London',
    address: 'Compass Centre, Heathrow Airport Terminal 5, Hounslow TW6 2GW, UK',
    coordinates: { lat: 51.4700, lng: -0.4543 },
    phone: '+44 20 8759 1000',
    email: 'heathrow.travelclinic@nhs.uk',
    operatingHours: '07:00 AM - 09:00 PM Daily',
    rating: 4.85,
    reviewsCount: 2980,
    accreditation: 'UK Health Security Agency (UKHSA) & NHS Designated',
    availableVaccines: [
      { name: 'Yellow Fever (Stamaril)', code: 'YF-100', priceUSD: 105, inStock: true },
      { name: 'Tick-Borne Encephalitis (TicoVac)', code: 'TBE-01', priceUSD: 95, inStock: true, requiredForTravelTo: ['Eastern Europe', 'Scandinavia'] },
      { name: 'Cholera Oral (Dukoral)', code: 'CHO-15', priceUSD: 65, inStock: true },
      { name: 'Rabies Pre-Exposure', code: 'RAB-01', priceUSD: 85, inStock: true }
    ],
    services: ['NHS Digital Pass Verification', 'Yellow Card ICVP Registration', 'Maritime & Aviation Crew Health Clearance'],
    emergencyContact: '+44 20 8759 9999',
    walkInAllowed: true
  },
  {
    id: 'VAC-INT-04',
    name: 'JFK International Airport Medical & Vaccine Hub',
    category: 'International',
    type: 'International Airport Medical Center',
    country: 'United States',
    countryFlag: '🇺🇸',
    city: 'New York',
    address: 'Terminal 4 Departure Level, JFK International Airport, Jamaica, NY 11430',
    coordinates: { lat: 40.6413, lng: -73.7781 },
    phone: '+1 718 656 5344',
    email: 'jfk.medcenter@portauthority.org',
    operatingHours: '24/7 Open Daily',
    rating: 4.75,
    reviewsCount: 3100,
    accreditation: 'US CDC Quarantine Station & WHO Designated Facility',
    availableVaccines: [
      { name: 'Yellow Fever (YF-Vax)', code: 'YF-100', priceUSD: 160, inStock: true },
      { name: 'Meningococcal B & ACWY', code: 'MEN-B', priceUSD: 180, inStock: true },
      { name: 'Tdap (Boostrix)', code: 'TDAP-01', priceUSD: 75, inStock: true },
      { name: 'COVID-19 Updated Vaccine', code: 'COV-US', priceUSD: 50, inStock: true }
    ],
    services: ['CDC Yellow Card Issuance', 'US Customs & Public Health Clearance', 'Urgent Pre-Departure Immunization'],
    emergencyContact: '+1 718 656 9111',
    walkInAllowed: true
  },
  {
    id: 'VAC-INT-05',
    name: 'Tokyo Narita International Travel Medical Center',
    category: 'International',
    type: 'International Airport Medical Center',
    country: 'Japan',
    countryFlag: '🇯🇵',
    city: 'Tokyo / Narita',
    address: 'Narita Airport Terminal 1 Central Bldg 2F, Narita, Chiba 282-0004',
    coordinates: { lat: 35.7720, lng: 140.3929 },
    phone: '+81 476 34 5119',
    email: 'narita-clinic@juntendo.ac.jp',
    operatingHours: '09:00 AM - 06:00 PM Daily',
    rating: 4.92,
    reviewsCount: 1850,
    accreditation: 'Ministry of Health, Labour and Welfare Japan Certified',
    availableVaccines: [
      { name: 'Japanese Encephalitis', code: 'JE-01', priceUSD: 80, inStock: true },
      { name: 'Yellow Fever', code: 'YF-100', priceUSD: 110, inStock: true },
      { name: 'Rabies Vaccine', code: 'RAB-01', priceUSD: 90, inStock: true },
      { name: 'Measles-Rubella (MR)', code: 'MR-01', priceUSD: 60, inStock: true }
    ],
    services: ['Multilingual Medical Certificates', 'WHO Yellow Card', 'Japanese Quarantine Clearance'],
    emergencyContact: '+81 476 34 9999',
    walkInAllowed: false
  }
];

export const TOP_INTERNATIONAL_INSURANCE_PLANS: InternationalInsurancePlan[] = [
  {
    id: 'INS-PLAN-01',
    providerName: 'Allianz Global Care',
    planName: 'Maritime Seafarer & Overseas Expat Premier',
    maxCoverageUSD: 1000000,
    monthlyPremiumUSD: 145,
    deductibleUSD: 100,
    keyBenefits: [
      '$1M Emergency Air Evacuation & Search/Rescue',
      '100% Inpatient Hospitalization & Direct Billing in 180 Countries',
      'Zero Copay on WHO Travel Vaccines & Tropical Illness Care',
      '24/7 Multilingual Telemedicine Doctor Call Service'
    ],
    recommendedForPorts: ['Rotterdam', 'Singapore', 'Dubai', 'Houston', 'Shanghai'],
    rating: 4.9,
    emergencyRepatriationIncluded: true,
    telemedicine24_7: true,
    badgeTag: 'BEST OVERALL MARITIME'
  },
  {
    id: 'INS-PLAN-02',
    providerName: 'Bupa Global Travel',
    planName: 'International Executive Health Shield',
    maxCoverageUSD: 750000,
    monthlyPremiumUSD: 120,
    deductibleUSD: 250,
    keyBenefits: [
      'Comprehensive Chronic Disease & Asthma Coverage Abroad',
      'Worldwide Prescription Drug Direct Pay at 50,000+ Pharmacies',
      'Port Health & Airport Quarantine Fast-Track Claims',
      'Dental & Optical Emergency Benefit'
    ],
    recommendedForPorts: ['London Heathrow', 'Hamburg', 'Yokohama', 'Busan'],
    rating: 4.8,
    emergencyRepatriationIncluded: true,
    telemedicine24_7: true,
    badgeTag: 'TOP FOR PRE-EXISTING'
  },
  {
    id: 'INS-PLAN-03',
    providerName: 'Cigna Global Marine',
    planName: 'Global Crew & Pilot Protection Ultra',
    maxCoverageUSD: 2000000,
    monthlyPremiumUSD: 180,
    deductibleUSD: 0,
    keyBenefits: [
      '$2M Unlimited Medical & Critical Care Coverage',
      'Zero Deductible on All Emergency Clinic Visits',
      'Accidental Death & Permanent Disability Lump Sum Benefit',
      'Search & Rescue Helicopter Extraction Included'
    ],
    recommendedForPorts: ['Suez Canal Zone', 'Panama Canal', 'Cape Town', 'Santos'],
    rating: 4.95,
    emergencyRepatriationIncluded: true,
    telemedicine24_7: true,
    badgeTag: 'HIGH COVERAGE CHAMPION'
  },
  {
    id: 'INS-PLAN-04',
    providerName: 'AXA International',
    planName: 'Smart Seafarer & Aviation Pass Protection',
    maxCoverageUSD: 500000,
    monthlyPremiumUSD: 85,
    deductibleUSD: 150,
    keyBenefits: [
      'Budget Friendly Essential Travel & Marine Insurance',
      'Immediate Electronic Guarantee of Payment (GOP)',
      'Lost Baggage & Passport Theft Expense Cover',
      'COVID-19 & Dengue Hospitalization Guarantee'
    ],
    recommendedForPorts: ['Mumbai', 'Colombo', 'Chittagong', 'Manila'],
    rating: 4.7,
    emergencyRepatriationIncluded: true,
    telemedicine24_7: false,
    badgeTag: 'BEST VALUE CHOICE'
  }
];

export const INITIAL_USER_HEALTH_RECORD: MedicalHealthRecord = {
  id: 'MED-REC-88902',
  patientName: 'CAPT. ALEXANDER VANCE',
  patientId: 'PAT-IND-90211',
  passportNo: 'P-IND-98421092',
  nationalId: 'ID-IND-991204882',
  dateOfBirth: '1984-11-14 (Age 41)',
  gender: 'Male',
  bloodType: 'O Positive (O+)',
  allergies: ['Penicillin (Anaphylactic Risk)', 'Sulfa Drugs'],
  chronicConditions: ['Mild Asthma (Inhaler Managed)', 'Controlled Asymptomatic BP'],
  vaccinations: [
    {
      vaccineName: 'Yellow Fever (Stamaril)',
      dose: '1.0 mL Single Dose',
      administeredDate: '2022-04-10',
      expiryDate: 'Lifetime Immunity (WHO Standard)',
      clinicName: 'National Port & Airport Quarantine Medical Centre, Mumbai',
      batchNo: 'YF-BATCH-88201',
      icvpVerified: true
    },
    {
      vaccineName: 'Meningococcal ACWY (Menactra)',
      dose: '0.5 mL',
      administeredDate: '2025-01-15',
      expiryDate: '2030-01-15',
      clinicName: 'Dubai Healthcare City International Travel Clinic',
      batchNo: 'MEN-B-99120',
      icvpVerified: true
    },
    {
      vaccineName: 'Typhoid Conjugate (Typbar-TCV)',
      dose: '0.5 mL',
      administeredDate: '2024-08-20',
      expiryDate: '2027-08-20',
      clinicName: 'Singapore Changi International Travel Health Hub',
      batchNo: 'TYP-9021A',
      icvpVerified: true
    },
    {
      vaccineName: 'COVID-19 mRNA JN.1 Booster',
      dose: '0.3 mL',
      administeredDate: '2025-11-05',
      expiryDate: '2026-11-05',
      clinicName: 'London Travel Clinic Heathrow',
      batchNo: 'COV-JN1-4410',
      icvpVerified: true
    }
  ],
  labReports: [
    {
      id: 'LAB-2026-001',
      testName: 'Comprehensive Blood Count (CBC) & Lipid Panel',
      category: 'Blood Work',
      dateSampled: '2026-07-15',
      resultSummary: 'Hemoglobin: 15.2 g/dL | WBC: 6.8 x10^3/uL | Platelets: 245K | Chol: 185 mg/dL',
      normalRange: 'All Parameters Within Normal Limits',
      status: 'NORMAL',
      performingLab: 'Raffles Medical Central Pathology Lab Singapore',
      verifiedByDoctor: 'Dr. Marcus Tan, MD (Hematology)'
    },
    {
      id: 'LAB-2026-002',
      testName: '12-Lead EKG & Cardiac Stress Battery',
      category: 'EKG & Cardiac',
      dateSampled: '2026-06-20',
      resultSummary: 'Normal Sinus Rhythm @ 68 bpm. No ST-T segment ischemic alterations.',
      normalRange: 'Rhythm: 60-100 bpm Normal Sinus',
      status: 'NORMAL',
      performingLab: 'Changi Aviation & Port Medical Diagnostics',
      verifiedByDoctor: 'Dr. Elena Rostova, FACC'
    },
    {
      id: 'LAB-2026-003',
      testName: 'Spirometry & Pulmonary Function Test (PFT)',
      category: 'Respiratory & Lung',
      dateSampled: '2026-05-10',
      resultSummary: 'FEV1/FVC Ratio: 82%. Excellent response with Salbutamol inhaler.',
      normalRange: 'FEV1/FVC > 75%',
      status: 'ATTENTION',
      performingLab: 'Apollo Port Health Clinic Mumbai',
      verifiedByDoctor: 'Dr. Rajesh Sharma, MD (Pulmonology)'
    },
    {
      id: 'LAB-2026-004',
      testName: 'Multi-Panel Marine Toxicology & Drug Screen',
      category: 'Toxicology & Drug Screen',
      dateSampled: '2026-08-01',
      resultSummary: 'Negative for 12 Controlled Substances & Alcohol (0.00% BAC)',
      normalRange: 'Negative / Non-Detected',
      status: 'NORMAL',
      performingLab: 'UKHSA Port Health Toxicology Lab London',
      verifiedByDoctor: 'Dr. James H. Watson, Chief Officer'
    }
  ],
  medications: [
    {
      id: 'MED-01',
      medicineName: 'Salbutamol Inhaler (Ventolin HFA)',
      dosage: '100mcg per puff (2 puffs as needed)',
      frequency: 'PRN for Bronchospasm',
      prescribingDoctor: 'Dr. Rajesh Sharma',
      startDate: '2024-01-01',
      endDate: '2027-01-01',
      refillReminders: true,
      purpose: 'Asthma Management / Airway Spasm Relief'
    },
    {
      medicineName: 'Multivitamin & Electrolyte Hydration Packets',
      id: 'MED-02',
      dosage: '1 Packet Daily in 500ml Water',
      frequency: 'Once Daily Morning',
      prescribingDoctor: 'Dr. Marcus Tan',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      refillReminders: true,
      purpose: 'Heat Stress & Maritime Dehydration Prevention'
    }
  ],
  fitForDutyCertificates: [
    {
      certificateId: 'STCW-FIT-2026-908',
      issuedBy: 'Directorate General of Shipping / WHO Maritime Health Agency',
      issueDate: '2026-01-10',
      validityYears: 2,
      fitStatus: 'FIT_UNRESTRICTED'
    }
  ],
  emergencyContacts: [
    {
      id: 'EMG-01',
      name: 'Dr. Sarah Vance',
      relation: 'Spouse / Next of Kin',
      phone: '+91 98200 11223',
      email: 'sarah.vance@healthnet.org',
      isPrimarySOS: true,
      location: 'Mumbai, India'
    },
    {
      id: 'EMG-02',
      name: 'Capt. Robert Sterling',
      relation: 'Fleet Medical Officer',
      phone: '+44 20 7946 0912',
      email: 'medical.desk@oceanmaritime.org',
      isPrimarySOS: true,
      location: 'London Headquarters, UK'
    },
    {
      id: 'EMG-03',
      name: 'Port Health Medical Response Officer',
      relation: 'Port Health Liaison',
      phone: '+65 6543 9999',
      email: 'emergency.port@singaporemaritime.gov.sg',
      isPrimarySOS: false,
      location: 'Singapore Transit Sector'
    },
    {
      id: 'EMG-04',
      name: 'High Commission / Embassy Consular Emergency Desk',
      relation: 'Embassy / Consulate Officer',
      phone: '+1 800 555 0199',
      email: 'consular.emergency@embassy.gov',
      isPrimarySOS: false,
      location: 'Global 24/7 Dispatch'
    }
  ],
  insurancePolicy: {
    providerName: 'Allianz Global Care Maritime & Travel Policy',
    policyNumber: 'AGM-9910-882109-X',
    coverageType: 'Global Comprehensive Travel, Emergency Evacuation & Hospitalization',
    maxCoverageUSD: 500000,
    validUntil: '2027-12-31',
    emergencyAssistanceHelpline: '+1 800 555 0199 / +44 20 8603 9922',
    isActive: true
  },
  insuranceAlerts: [
    {
      id: 'ALT-INS-01',
      severity: 'WARNING',
      title: 'Rotterdam & Hamburg Port Repatriation Limit Mandatory Update',
      message: 'European Maritime Safety Agency (EMSA) requires minimum $750,000 repatriation limit for deep-sea captains entering EU waters after Sept 2026. Your current policy is $500,000.',
      actionRequired: 'Upgrade to $1,000,000 Allianz Premier or Cigna Global plan prior to Rotterdam arrival.'
    },
    {
      id: 'ALT-INS-02',
      severity: 'RECOMMENDATION',
      title: 'Suez Canal & Red Sea Transit Evacuation Rider Recommended',
      message: 'High risk transit zone detected on current voyage path. Additional helicopter air-lift extraction coverage is recommended.',
      actionRequired: 'Enable Cigna Global Marine $2M rider for $35/mo.'
    }
  ],
  travelHealthClearance: 'CLEARED_GLOBAL',
  qrHealthPassHash: 'WHO-ICVP-VERIFIED-HASH-998127391823'
};

export const INITIAL_BOOKINGS: VaccineBookingRecord[] = [
  {
    bookingId: 'VBK-2026-901',
    patientName: 'CAPT. ALEXANDER VANCE',
    passportOrId: 'P-IND-98421092',
    phone: '+91 98200 11223',
    email: 'alexander.vance@oceanmaritime.org',
    centreId: 'VAC-DOM-01',
    centreName: 'National Port & Airport Quarantine Medical Centre',
    centreAddress: 'Terminal 2 International Medical Wing, CSMI Airport, Mumbai',
    city: 'Mumbai',
    country: 'India',
    vaccineName: 'Yellow Fever (Stamaril)',
    appointmentDate: '2026-08-20',
    appointmentSlot: '10:30 AM - 11:00 AM',
    consultationType: 'In-Clinic',
    totalPriceUSD: 45,
    insuranceApplied: true,
    paymentStatus: 'PAID_CONFIRMED',
    bookingStatus: 'CONFIRMED',
    qrBookingCode: 'QR-SLOT-901-MUMBAI-YF',
    createdAt: '2026-08-10T14:30:00Z'
  },
  {
    bookingId: 'VBK-2026-902',
    patientName: 'CAPT. ALEXANDER VANCE',
    passportOrId: 'P-IND-98421092',
    phone: '+91 98200 11223',
    email: 'alexander.vance@oceanmaritime.org',
    centreId: 'VAC-INT-01',
    centreName: 'Singapore Changi International Travel Health Hub',
    centreAddress: 'Terminal 3 Transit Area Level 2, Changi Airport, Singapore',
    city: 'Singapore',
    country: 'Singapore',
    vaccineName: 'Dengue Vaccine (Qdenga)',
    appointmentDate: '2026-09-05',
    appointmentSlot: '02:00 PM - 02:30 PM',
    consultationType: 'Port / Airport On-Site',
    totalPriceUSD: 110,
    insuranceApplied: true,
    paymentStatus: 'PAID_CONFIRMED',
    bookingStatus: 'CONFIRMED',
    qrBookingCode: 'QR-SLOT-902-SINGAPORE-DEN',
    createdAt: '2026-08-11T09:15:00Z'
  }
];

export const INITIAL_HEALTH_LEDGER: HealthLedgerBlock[] = [
  {
    blockIndex: 1,
    timestamp: '2026-08-12T10:14:00Z',
    eventType: 'ICVP_VACCINE_STAMP',
    actionTitle: 'Yellow Fever Stamaril Re-Certification Stamp',
    issuerAuthority: 'National Port & Airport Quarantine Medical Centre (WHO-IN-001)',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    blockHash: '8f92a1b0c9e8d7f6e5d4c3b2a10987654321fedcba0987654321abcdef012345',
    isCryptographicallyVerified: true,
    metadata: 'Dose: 1.0mL | Batch: YF-88201 | WHO Yellow Card ICVP Verification Success'
  },
  {
    blockIndex: 2,
    timestamp: '2026-08-10T14:30:00Z',
    eventType: 'LAB_EHR_RECORD',
    actionTitle: 'Comprehensive Blood Count (CBC) & Lipid Diagnostic Entry',
    issuerAuthority: 'Raffles Medical Central Pathology Lab Singapore',
    previousHash: '8f92a1b0c9e8d7f6e5d4c3b2a10987654321fedcba0987654321abcdef012345',
    blockHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    isCryptographicallyVerified: true,
    metadata: 'Hemoglobin: 15.2 g/dL | WBC: 6.8k | Status: NORMAL | Signed by Dr. Marcus Tan'
  },
  {
    blockIndex: 3,
    timestamp: '2026-08-01T08:00:00Z',
    eventType: 'FIT_FOR_DUTY_CERT',
    actionTitle: 'STCW Medical Fitness Unrestricted Duty Certificate',
    issuerAuthority: 'Directorate General of Shipping / WHO Maritime Health Agency',
    previousHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    blockHash: '3f4e5d6c7b8a90123456789abcdef0123456789abcdef0123456789abcdef012',
    isCryptographicallyVerified: true,
    metadata: 'Cert ID: STCW-FIT-2026-908 | Valid 2 Years | Unrestricted Sea & Flight Clearance'
  },
  {
    blockIndex: 4,
    timestamp: '2026-07-28T16:45:00Z',
    eventType: 'INSURANCE_POLICY_VERIFICATION',
    actionTitle: 'Allianz Maritime Global Policy $500,000 GOP Audit',
    issuerAuthority: 'Allianz Global Assistance Worldwide Underwriters',
    previousHash: '3f4e5d6c7b8a90123456789abcdef0123456789abcdef0123456789abcdef012',
    blockHash: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    isCryptographicallyVerified: true,
    metadata: 'Policy No: POL-ALLZ-991823 | Direct-Pay Hospital Network Active'
  },
  {
    blockIndex: 5,
    timestamp: '2026-08-13T09:20:00Z',
    eventType: 'SATELLITE_SOS_AUDIT',
    actionTitle: 'Routine Satellite Beacon Self-Test & Emergency Key Sync',
    issuerAuthority: 'Inmarsat & Iridium Marine Emergency Network',
    previousHash: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    blockHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    isCryptographicallyVerified: true,
    metadata: 'Beacon ID: INM-SOS-9811 | Lat: 18.9220 N, Lng: 72.8347 E | Ping Latency: 18ms'
  }
];

export const INITIAL_HEALTH_TRENDS: HealthTrendMetric[] = [
  { date: 'Jul 01', systolicBP: 118, diastolicBP: 78, heartRateBPM: 64, oxygenSatSpO2: 99, hydrationPercent: 92, spirometryFEV1Percent: 88, stressIndexLevel: 'LOW' },
  { date: 'Jul 08', systolicBP: 120, diastolicBP: 80, heartRateBPM: 68, oxygenSatSpO2: 98, hydrationPercent: 90, spirometryFEV1Percent: 86, stressIndexLevel: 'OPTIMAL' },
  { date: 'Jul 15', systolicBP: 122, diastolicBP: 81, heartRateBPM: 70, oxygenSatSpO2: 99, hydrationPercent: 94, spirometryFEV1Percent: 89, stressIndexLevel: 'OPTIMAL' },
  { date: 'Jul 22', systolicBP: 124, diastolicBP: 82, heartRateBPM: 72, oxygenSatSpO2: 98, hydrationPercent: 88, spirometryFEV1Percent: 85, stressIndexLevel: 'MODERATE' },
  { date: 'Jul 29', systolicBP: 121, diastolicBP: 79, heartRateBPM: 66, oxygenSatSpO2: 99, hydrationPercent: 95, spirometryFEV1Percent: 90, stressIndexLevel: 'LOW' },
  { date: 'Aug 05', systolicBP: 119, diastolicBP: 78, heartRateBPM: 65, oxygenSatSpO2: 99, hydrationPercent: 96, spirometryFEV1Percent: 91, stressIndexLevel: 'LOW' },
  { date: 'Aug 12', systolicBP: 120, diastolicBP: 80, heartRateBPM: 67, oxygenSatSpO2: 99, hydrationPercent: 93, spirometryFEV1Percent: 88, stressIndexLevel: 'OPTIMAL' }
];

export const INSURANCE_COVERAGE_ZONES: InsuranceCoverageZone[] = [
  {
    id: 'ZONE-01',
    zoneName: 'Indo-Pacific & South Asian Corridor',
    regionCategory: 'Indo-Pacific Transit',
    guaranteedHospitalsCount: 420,
    cashlessDirectPayActive: true,
    searchAndRescueHelicopterRadiusKM: 350,
    primaryPartnerNetwork: 'Allianz Asia-Pacific & Raffles Medical Network',
    coverageStatus: 'FULL_COVERAGE_100%',
    coordinates: { lat: 15.0, lng: 85.0 }
  },
  {
    id: 'ZONE-02',
    zoneName: 'European Union, Baltic & North Sea Sector',
    regionCategory: 'European Union & Baltic',
    guaranteedHospitalsCount: 890,
    cashlessDirectPayActive: true,
    searchAndRescueHelicopterRadiusKM: 500,
    primaryPartnerNetwork: 'Bupa European Health Shield & NHS Maritime',
    coverageStatus: 'ACTION_REQUIRED_750K_MANDATE',
    coordinates: { lat: 54.0, lng: 10.0 }
  },
  {
    id: 'ZONE-03',
    zoneName: 'Suez Canal & Red Sea Transit Corridor',
    regionCategory: 'Suez & Middle East Maritime',
    guaranteedHospitalsCount: 180,
    cashlessDirectPayActive: true,
    searchAndRescueHelicopterRadiusKM: 600,
    primaryPartnerNetwork: 'Cigna Global Marine & Dubai Healthcare City Network',
    coverageStatus: 'FULL_COVERAGE_100%',
    coordinates: { lat: 26.0, lng: 35.0 }
  },
  {
    id: 'ZONE-04',
    zoneName: 'Americas Coastal & Caribbean Waters',
    regionCategory: 'Americas Coastal Zone',
    guaranteedHospitalsCount: 650,
    cashlessDirectPayActive: true,
    searchAndRescueHelicopterRadiusKM: 400,
    primaryPartnerNetwork: 'US Coast Guard Aux & AXA Americas Network',
    coverageStatus: 'STANDARD_80%',
    coordinates: { lat: 25.0, lng: -80.0 }
  }
];

export const INITIAL_MEDICAL_SYNC_INFO: MedicalSyncInfo = {
  syncStatus: 'SYNCED_CLOUD',
  lastSyncedAt: '2026-08-13 11:42:10 UTC',
  offlineQueueCount: 0,
  encryptedDeviceHash: 'DEV-NODE-SHA256-881923091122',
  satelliteSignalStrengthPercent: 98,
  storageAllocatedMB: 4.2
};

export const INITIAL_SEISMIC_VOLCANO_ALERTS: SeismicVolcanoAlert[] = [
  {
    id: 'ALRT-EQ-901',
    eventType: 'UNDERSEA_EARTHQUAKE',
    severityLevel: 'RED_EVACUATE',
    title: 'M7.8 Deep Submarine Megathrust Seismic Event',
    locationRegion: 'Sunda Trench & Andaman-Nicobar Maritime Basin',
    epicenterCoordinates: { lat: 6.82, lng: 92.45 },
    depthKM: 14.2,
    magnitudeRichter: 7.8,
    waveHeightMeters: 4.8,
    distanceToNearestPortKM: 185,
    nearestPortName: 'Port Blair & Colombo Transit Shipping Hub',
    estimatedTsunamiETA: '28 Minutes (12:15 UTC)',
    recommendedNavAction: 'IMMEDIATE DEEP-WATER EVACUATION: Vessels maneuver to >200m depth water immediately. Port medical units execute priority coastal evacuation.',
    timestamp: '2026-08-13T11:47:00Z',
    isActiveWarning: true
  },
  {
    id: 'ALRT-VOLC-402',
    eventType: 'SUBMARINE_VOLCANO_ERUPTION',
    severityLevel: 'ORANGE_HIGH_ALERT',
    title: 'Krakatoa Deep Submarine Volcanic Explosive Eruption',
    locationRegion: 'Sunda Strait Deep Water Sector',
    epicenterCoordinates: { lat: -6.10, lng: 105.42 },
    depthKM: 8.5,
    volcanicVEIIndex: 4,
    waveHeightMeters: 2.3,
    distanceToNearestPortKM: 95,
    nearestPortName: 'Merak & Tanjung Priok International Container Port',
    estimatedTsunamiETA: '42 Minutes (12:29 UTC)',
    recommendedNavAction: 'Pumice raft navigation hazard alert. Activate maritime breathing masks for sulfur dioxide ($SO_2$) gas plumes.',
    timestamp: '2026-08-13T10:15:00Z',
    isActiveWarning: true
  },
  {
    id: 'ALRT-TSUNAMI-108',
    eventType: 'TSUNAMI_WAVE_GENERATED',
    severityLevel: 'RED_EVACUATE',
    title: 'Pacific Basin Tsunami Advisory - Mariana Trench Subduction Zone',
    locationRegion: 'Mariana Trench Trench Floor',
    epicenterCoordinates: { lat: 11.35, lng: 142.20 },
    depthKM: 22.0,
    magnitudeRichter: 7.5,
    waveHeightMeters: 3.6,
    distanceToNearestPortKM: 310,
    nearestPortName: 'Guam Harbor & Saipan Seaport',
    estimatedTsunamiETA: '1 Hour 10 Mins (12:55 UTC)',
    recommendedNavAction: 'Harbor Master evacuation mandate. Halt all pier docking & secure container shore cranes.',
    timestamp: '2026-08-13T09:30:00Z',
    isActiveWarning: true
  },
  {
    id: 'ALRT-TREMOR-004',
    eventType: 'TECTONIC_PLATE_TREMOR',
    severityLevel: 'YELLOW_ADVISORY',
    title: 'M5.4 Aegean Sea Fault Line Shallow Tremor',
    locationRegion: 'Aegean Sea Maritime Basin',
    epicenterCoordinates: { lat: 36.40, lng: 25.40 },
    depthKM: 6.0,
    magnitudeRichter: 5.4,
    waveHeightMeters: 0.6,
    distanceToNearestPortKM: 45,
    nearestPortName: 'Piraeus Port Athens',
    estimatedTsunamiETA: 'No Tsunami Risk Detected',
    recommendedNavAction: 'Monitor port buoy telemetry and tide gauge pressure sensors.',
    timestamp: '2026-08-13T08:00:00Z',
    isActiveWarning: false
  }
];

export const INITIAL_EMERGENCY_NOTIFICATIONS: EmergencyNotification[] = [
  {
    id: 'NOTIF-DISASTER-01',
    timestamp: '2026-08-13T11:48:10Z',
    senderRole: 'NOAA_PACIFIC_TSUNAMI_CENTER',
    urgency: 'IMMEDIATE_LIFE_SAFETY',
    headline: '🚨 RED ALERT: Tsunami Wave Warning Generated (Sunda Trench M7.8 Earthquake)',
    messageBody: 'NOAA Pacific & Indian Ocean Warning Desk confirms a 4.8m Tsunami wave displacement following a M7.8 undersea earthquake. All vessels within 250km of Sunda Trench must steer to deep water immediately. Port health clinics must evacuate patients to >30m elevation.',
    affectedRegions: ['Andaman Sea', 'Bay of Bengal', 'Malacca Strait Entrance'],
    broadcastChannels: ['SATELLITE_PUSH', 'CELLULAR_CB', 'VHF_RADIO', 'APP_HUD_BANNER'],
    isAcknowledgedByOfficer: false
  },
  {
    id: 'NOTIF-VOLCANO-02',
    timestamp: '2026-08-13T10:20:00Z',
    senderRole: 'PORT_HEALTH_AUTHORITY',
    urgency: 'CRITICAL_DISASTER_WARNING',
    headline: '🌋 Submarine Volcanic Gas & Ash Advisory: Sunda Strait Corridor',
    messageBody: 'Heavy pyroclastic and ash emissions detected from underwater vent. Vessels carrying respiratory patients or crew with asthma must activate N95 / SCBA air scrubbing units.',
    affectedRegions: ['Sunda Strait', 'Java Sea Southwest'],
    broadcastChannels: ['SATELLITE_PUSH', 'APP_HUD_BANNER'],
    isAcknowledgedByOfficer: true
  },
  {
    id: 'NOTIF-FLEET-03',
    timestamp: '2026-08-13T09:00:00Z',
    senderRole: 'FLEET_MEDICAL_OFFICER',
    urgency: 'HEALTH_SYSTEM_ALERT',
    headline: '⚓ Fleet Emergency Preparedness & Satellite SOS Check Completed',
    messageBody: 'All 14 vessel medical bays in Fleet Alpha verified operational with 100% WHO vaccine storage and oxygen reserves.',
    affectedRegions: ['Global Maritime Network'],
    broadcastChannels: ['APP_HUD_BANNER'],
    isAcknowledgedByOfficer: true
  }
];

export const INITIAL_RESCUE_DRONES: MarineRescueDrone[] = [
  {
    id: 'DRONE-ALPHA-01',
    droneName: 'AeroSea MedEvac Alpha',
    droneModel: 'AeroSea MedEvac-X4',
    batteryPercent: 94,
    status: 'READY_STANDBY',
    payloadType: 'Automatic Defibrillator (AED) + Blood',
    maxSpeedKmh: 110,
    flightRangeKm: 45,
    currentLocation: { lat: 1.29, lng: 103.85, altitudeMeters: 0 },
    targetCoordinates: { lat: 1.32, lng: 103.92 },
    estimatedFlightETA: '6 Minutes',
    cameraFeedActive: true
  },
  {
    id: 'DRONE-BRAVO-02',
    droneName: 'HydroBuoy Sentinel-2',
    droneModel: 'HydroBuoy Rescue-V2',
    batteryPercent: 88,
    status: 'IN_FLIGHT_DISPATCHED',
    payloadType: 'Self-Inflating Liferaft + GPS Beacon',
    maxSpeedKmh: 95,
    flightRangeKm: 35,
    currentLocation: { lat: 6.85, lng: 92.50, altitudeMeters: 120 },
    targetCoordinates: { lat: 6.90, lng: 92.65 },
    estimatedFlightETA: '3 Minutes 40 Secs',
    cameraFeedActive: true
  },
  {
    id: 'DRONE-CHARLIE-03',
    droneName: 'OceanLifesaver Heavy-1',
    droneModel: 'OceanLifesaver Heavy-Duty',
    batteryPercent: 100,
    status: 'READY_STANDBY',
    payloadType: 'Anti-Venom & EpiPen First Aid',
    maxSpeedKmh: 130,
    flightRangeKm: 60,
    currentLocation: { lat: -6.12, lng: 105.45, altitudeMeters: 0 },
    targetCoordinates: { lat: -6.15, lng: 105.50 },
    estimatedFlightETA: '8 Minutes',
    cameraFeedActive: false
  }
];

export const INITIAL_GEO_SIMULATIONS: GeoHazardSimulation[] = [
  {
    id: 'SIM-TSUNAMI-2026',
    scenarioName: 'M8.2 Sunda Subduction Megathrust Wave Propagation',
    hazardType: 'TSUNAMI_MEGAWAVE',
    intensityScale: 9,
    impactedRadiusKm: 450,
    simulationStatus: 'COMPLETED',
    predictedInundationDepthMeters: 6.4,
    affectedPopulationEst: 125000,
    recommendedEvacuationRoute: 'Direct Inland Route B to Ridge Point Shelter (>45m Elevation)',
    waveSpeedKmh: 720
  },
  {
    id: 'SIM-LANDSLIDE-01',
    scenarioName: 'Subsea Ridge Slope Failure & Local Tsunami Impulse',
    hazardType: 'SUBSEA_LANDSLIDE',
    intensityScale: 7,
    impactedRadiusKm: 120,
    simulationStatus: 'IDLE',
    predictedInundationDepthMeters: 3.2,
    affectedPopulationEst: 34000,
    recommendedEvacuationRoute: 'North Coastal Bypass Highway to Highland Medical Base',
    waveSpeedKmh: 480
  },
  {
    id: 'SIM-VOLCANO-03',
    scenarioName: 'Submarine Krakatoa Explosive Vent Ash Plume & Wave Impulse',
    hazardType: 'VOLCANIC_ASH_PLUME',
    intensityScale: 8,
    impactedRadiusKm: 280,
    simulationStatus: 'COMPLETED',
    predictedInundationDepthMeters: 2.8,
    affectedPopulationEst: 89000,
    recommendedEvacuationRoute: 'South Corridor Evacuation Line to Medical Vault Base',
    waveSpeedKmh: 550
  }
];

export const INITIAL_TSUNAMI_ZONES: TsunamiEvacuationZone[] = [
  {
    id: 'ZONE-ALPHA-50M',
    zoneName: 'Highland Ridge Emergency Shelter & Helipad',
    elevationMeters: 52,
    isSafeZone: true,
    capacityMax: 5000,
    currentOccupancy: 340,
    distanceFromShoreM: 1800,
    assemblyPointAddress: 'Sector 4 Ridge Road, High Elevation Medical Citadel',
    evacuationRouteDescription: 'Follow Green Tsunami Signs uphill along North Bypass Expressway directly to Gate 2.',
    coordinates: { lat: 1.35, lng: 103.88 },
    hasHelipad: true,
    medicalFirstAidStation: true
  },
  {
    id: 'ZONE-BRAVO-35M',
    zoneName: 'Port Hill Community Evacuation Park',
    elevationMeters: 38,
    isSafeZone: true,
    capacityMax: 3500,
    currentOccupancy: 810,
    distanceFromShoreM: 1200,
    assemblyPointAddress: 'Summit Park Way, Beacon Point Hill',
    evacuationRouteDescription: 'Ascend Beacon Point Stairway or Emergency Bus Shuttle Route 1.',
    coordinates: { lat: 1.31, lng: 103.84 },
    hasHelipad: false,
    medicalFirstAidStation: true
  },
  {
    id: 'ZONE-CHARLIE-08M',
    zoneName: 'DANGER ZONE: Coastal Docking Promenade',
    elevationMeters: 8,
    isSafeZone: false,
    capacityMax: 0,
    currentOccupancy: 45,
    distanceFromShoreM: 120,
    assemblyPointAddress: 'EVACUATE IMMEDIATELY: Port Gate 1 Coastal Promenade',
    evacuationRouteDescription: 'CRITICAL WARNING: High inundation risk (<10m elevation). Abandon vehicles & move to Zone Alpha or Bravo immediately.',
    coordinates: { lat: 1.28, lng: 103.86 },
    hasHelipad: false,
    medicalFirstAidStation: false
  }
];

export const INITIAL_BROADCAST_LOGS: EmergencyBroadcastLog[] = [
  {
    logId: 'LOG-BC-9001',
    timestamp: '2026-08-13T11:48:15Z',
    broadcastChannel: 'INMARSAT_SATELLITE',
    transmitterStation: 'NOAA Pacific Tsunami Desk - Sat Transponder 4B',
    targetAudience: 'All Maritime Vessels & Port Terminals in Bay of Bengal',
    messageSummary: '🚨 RED ALERT: Tsunami Wave Warning Issued (M7.8 Sunda Trench Earthquake)',
    deliveryStatus: 'DELIVERED_100%',
    ackCount: 142,
    checksumHash: '0x9F8B2C4E1A'
  },
  {
    logId: 'LOG-BC-9002',
    timestamp: '2026-08-13T11:48:22Z',
    broadcastChannel: 'VHF_RADIO_CH16',
    transmitterStation: 'Port Quarantine Coast Guard Station',
    targetAudience: 'Vessels within 50 Nautical Miles of Malacca Strait',
    messageSummary: 'Mayday / Pan-Pan Emergency Evacuation Broadcast to Deep Waters',
    deliveryStatus: 'DELIVERED_100%',
    ackCount: 88,
    checksumHash: '0x3D7A1E9C0B'
  },
  {
    logId: 'LOG-BC-9003',
    timestamp: '2026-08-13T10:20:05Z',
    broadcastChannel: 'CELLULAR_CB',
    transmitterStation: 'National Disaster Management Telemetry Gateway',
    targetAudience: 'Coastal Population Cell Towers (Radius 30km)',
    messageSummary: '🌋 Volcanic Ash & Gas Plume Warning - Sunda Strait Sector',
    deliveryStatus: 'DELIVERED_100%',
    ackCount: 12400,
    checksumHash: '0x8E1F4C2A5D'
  }
];


