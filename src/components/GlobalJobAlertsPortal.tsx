import React, { useState } from 'react';
import {
  Briefcase,
  Plane,
  Ship,
  Bell,
  Send,
  Globe,
  Search,
  Filter,
  DollarSign,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck,
  Award,
  Users,
  FileText,
  Mail,
  Phone,
  Sparkles,
  MapPin,
  AlertTriangle,
  Check,
  Zap,
  Radio,
  Compass,
  ChevronRight,
  SlidersHorizontal,
  Bookmark,
  BellRing,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  User,
  UserCheck,
  Download,
  Eye,
  Layers,
  Settings,
  Play,
  Pause,
  Plus,
  Trash2,
  Printer,
  ExternalLink,
  ShieldAlert,
  GraduationCap,
  BookOpen,
  Anchor,
  FileCheck2,
  X,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { MultiLanguageMenu, LanguageSelector } from '../utils/languageUtils';

export type JobSectorType = 'airways' | 'cruise_marine' | 'all';
export type PortalViewTab = 'listings' | 'jobs_requirements' | 'educational_institutes' | 'analytics' | 'schedule' | 'profile';

export interface GlobalJobAlertsPortalProps {
  initialPortalTab?: PortalViewTab;
  initialSector?: JobSectorType;
  initialScope?: 'All' | 'Domestic' | 'International';
}

export interface WorldJobListing {
  id: string;
  title: string;
  organization: string; // Airline, Aviation Authority, Cruise Line, Shipping Line
  sector: 'airways' | 'cruise_marine';
  category: string; // e.g., Flight Ops, ATC, Cabin Crew, Marine Deck, Engine, Cruise Hospitality
  authorityType: string; // e.g. ICAO / FAA / DGCA / EASA / IMO / STCW
  location: string;
  worldRegion: 'Asia Pacific' | 'Middle East' | 'Europe' | 'North America' | 'Latin America' | 'Africa' | 'Global / High Seas';
  salaryRangeUSD: string;
  employmentType: 'Full-Time' | 'Rotational Contract' | 'Permanent' | 'Charter';
  experienceReq: string;
  stcwOrIcaoCert: string;
  postedAgo: string;
  urgentBadge?: boolean;
  featured?: boolean;
  summary: string;
}

export interface JobAlertRule {
  id: string;
  ruleTitle: string;
  sector: 'airways' | 'cruise_marine' | 'both';
  targetAuthority: string;
  frequency: 'INSTANT' | 'DAILY' | 'WEEKLY' | 'SHIFT_CHANGE';
  deliveryChannel: 'push_email' | 'sms' | 'satcom_vhf' | 'whatsapp';
  quietHours: string;
  destination: string;
  isActive: boolean;
  lastDispatched: string;
  matchedCount: number;
}

export interface EmployeeProfileData {
  fullName: string;
  rankTitle: string;
  primarySector: 'Airways Flight Deck' | 'Marine Command & Engineering' | 'Air Traffic Control' | 'Cruise Hospitality';
  nationality: string;
  dutyStatus: 'Available for Immediate Deployment' | 'On Active Contract' | 'On Rotational Shore Leave';
  locationBase: string;
  totalFlightHours: number;
  totalSeaDutyMonths: number;
  expectedMinSalaryUSD: number;
  email: string;
  phone: string;
  licenses: Array<{
    id: string;
    codeName: string;
    authority: string;
    issueNo: string;
    expiryDate: string;
    isVerified: boolean;
  }>;
  passportCdcNumber: string;
  usVisaStatus: string;
}

export interface TrainingInstituteData {
  id: string;
  name: string;
  sector: 'airways' | 'cruise_marine';
  country: string;
  countryFlag: string;
  cityLocation: string;
  scope: 'Domestic' | 'International';
  authorityApproval: string;
  category: string;
  simulatorSpecs: string;
  placementRatePct: number;
  contactPhone: string;
  contactEmail: string;
  websiteUrl: string;
  courses: Array<{
    courseName: string;
    duration: string;
    feeUSD: number;
    eligibility: string;
    accreditation: string;
  }>;
}

export interface JobRequirementSpec {
  id: string;
  roleTitle: string;
  sector: 'airways' | 'cruise_marine';
  scope: 'Domestic' | 'International';
  organizationExample: string;
  authority: string;
  minAge: number;
  maxAge: number;
  licenseRequired: string;
  medicalStandard: string;
  experienceOrHours: string;
  keyCertifications: string[];
  documentChecklist: string[];
  visaOrPassportReq: string;
  summary: string;
}

export const JOB_REQUIREMENTS_DATA: JobRequirementSpec[] = [
  // AIRWAYS - DOMESTIC
  {
    id: 'REQ-AIR-DOM-01',
    roleTitle: 'Domestic Airline First Officer / Commander (A320 / B737)',
    sector: 'airways',
    scope: 'Domestic',
    organizationExample: 'IndiGo, Air India Domestic, Akasa Air, SpiceJet',
    authority: 'DGCA India / Civil Aviation Authority',
    minAge: 18,
    maxAge: 40,
    licenseRequired: 'DGCA Commercial Pilot License (CPL) or ATPL',
    medicalStandard: 'Class 1 Aviation Medical Certificate (IAM / DGCA Approved)',
    experienceOrHours: 'Min 200 Flying Hours (CPL) / 1,500 Flying Hours for Command (ATPL)',
    keyCertifications: ['Instrument Rating (IR)', 'RTR(A) Radio Telephony License', 'DGCA ELP Level 4+', 'Type Rating (A320 or B737)'],
    documentChecklist: ['Original DGCA CPL/ATPL Booklet', 'Class 1 Medical Fitness Slip', '10+2 Physics & Math Marksheets', 'Logbook certified by Chief Flying Instructor'],
    visaOrPassportReq: 'Indian Passport (valid min 1 year)',
    summary: 'Standard domestic airline pilot requirements for regional & domestic trunk routes. Complete DGCA licensing & type rating verification mandatory.'
  },
  {
    id: 'REQ-AIR-DOM-02',
    roleTitle: 'Domestic Air Traffic Control Officer (ATCO En-Route & Tower)',
    sector: 'airways',
    scope: 'Domestic',
    organizationExample: 'Airports Authority of India (AAI) / DGCA',
    authority: 'DGCA / ICAO Annex 1',
    minAge: 21,
    maxAge: 30,
    licenseRequired: 'AAI / DGCA Aerodrome & Approach Control License',
    medicalStandard: 'Class 3 Aviation Medical Standard',
    experienceOrHours: 'Fresh Graduates or 2+ Years Trainee Officer',
    keyCertifications: ['ICAO Doc 4444 ATC Rating', 'Radar & Procedural Control Endorsement', 'ICAO Language Proficiency Level 5'],
    documentChecklist: ['B.Sc Degree (Physics/Math) or B.E/B.Tech', 'CATC Allahabad/Hyderabad Completion Cert', 'Class 3 Medical Certificate'],
    visaOrPassportReq: 'National ID / Government Security Clearance',
    summary: 'Manages domestic air routes, airport tower movements, and approach radars. Requires intensive simulator training at CATC.'
  },

  // AIRWAYS - INTERNATIONAL
  {
    id: 'REQ-AIR-INT-01',
    roleTitle: 'International Widebody Flight Deck Commander (B777 / A350)',
    sector: 'airways',
    scope: 'International',
    organizationExample: 'Emirates, Qatar Airways, Singapore Airlines, Lufthansa',
    authority: 'ICAO / FAA / EASA / GCAA UAE',
    minAge: 28,
    maxAge: 58,
    licenseRequired: 'ICAO Unrestricted ATPL + Widebody Type Rating',
    medicalStandard: 'ICAO / GCAA / FAA Class 1 Medical Fitness',
    experienceOrHours: 'Min 5,000 Total Flying Hours (min 2,000 hrs PIC on Jet)',
    keyCertifications: ['ICAO English Level 6', 'ETOPS 180/207 Min Certification', 'Category III-B ILS Precision Approach', 'PBN / RNAV / RNP Approval'],
    documentChecklist: ['ICAO ATPL License with Type Endorsement', 'Class 1 Medical Valid Certificate', 'Verified Logbook (Last 5 Years PIC)', 'No-Accident/Incident Police Certificate'],
    visaOrPassportReq: 'Valid International Passport + US C1/D Transit Visa + Schengen Multi-Entry',
    summary: 'Long-haul intercontinental flight deck command across high-density oceanic FIR routes. Tax-free remuneration and relocation package included.'
  },
  {
    id: 'REQ-AIR-INT-02',
    roleTitle: 'International Aircraft Avionics & Systems Engineer (B1/B2)',
    sector: 'airways',
    scope: 'International',
    organizationExample: 'SIAEC Singapore, Lufthansa Technik, Delta TechOps',
    authority: 'EASA Part-66 / FAA A&P / CAAS',
    minAge: 21,
    maxAge: 55,
    licenseRequired: 'EASA Part-66 B1.1 (Mechanical) or B2 (Avionics)',
    medicalStandard: 'Aviation Occupational Health & Color Vision Standard',
    experienceOrHours: '5+ Years Licensed Aircraft Maintenance Experience',
    keyCertifications: ['Airbus A350/A320neo Type Certificate', 'Boeing 787 Dreamliner Aircraft Rating', 'Human Factors & Fuel Tank Safety (FTS)'],
    documentChecklist: ['EASA / CAAS B1/B2 License', 'On-the-Job Training (OJT) Task Record Book', 'Company Authorization Certificates'],
    visaOrPassportReq: 'Valid Passport + Overseas Work Permit Eligibility',
    summary: 'Airworthiness certification and heavy maintenance on foreign registered aircraft. High technical precision required.'
  },

  // MARINE - DOMESTIC
  {
    id: 'REQ-SEA-DOM-01',
    roleTitle: 'Domestic Coastal & Inland Tug / Ferry Master',
    sector: 'cruise_marine',
    scope: 'Domestic',
    organizationExample: 'Inland Waterways Authority, Port Tugs, Coastal Barges',
    authority: 'DG Shipping India / Ports Authority',
    minAge: 20,
    maxAge: 50,
    licenseRequired: 'Inland Master Grade 1/2 or NWKO (Near Coastal Voyage)',
    medicalStandard: 'DG Shipping Approved Doctor Medical Certificate',
    experienceOrHours: '12-24 Months Coastal Sea Time',
    keyCertifications: ['STCW Basic Safety Training (PST, FPFF, EFA, PSSR)', 'Radar Observer & ARPA Course', 'VHF Maritime Radio Operator'],
    documentChecklist: ['Indian CDC / Seaman Book', 'Inland Master Competency Certificate', 'DG Shipping Medical Fitness Form'],
    visaOrPassportReq: 'Indian Passport / Aadhaar ID',
    summary: 'Command coastal vessels, harbour tugboats, and river ferries along national inland waterways and port channels.'
  },

  // MARINE - INTERNATIONAL
  {
    id: 'REQ-SEA-INT-01',
    roleTitle: 'International Merchant Navy Master Mariner (Unlimited)',
    sector: 'cruise_marine',
    scope: 'International',
    organizationExample: 'Maersk Line, MSC, Royal Caribbean, CMA CGM',
    authority: 'IMO / STCW II/2 Master Unlimited CoC',
    minAge: 26,
    maxAge: 60,
    licenseRequired: 'STCW II/2 Certificate of Competency (Master Mariner)',
    medicalStandard: 'STCW ENG1 / DG Shipping International Medical',
    experienceOrHours: 'Min 36 Months Sea Service as Deck Officer on Foreign Going Ships',
    keyCertifications: ['GMDSS General Operator Certificate (GOC)', 'Full Mission ECDIS Simulator', 'Advanced Fire Fighting & MPSC', 'DCE Dangerous Cargo Endorsement (Oil/Gas)'],
    documentChecklist: ['STCW CoC Booklet', 'International Continuous Discharge Certificate (CDC)', 'Yellow Fever Vaccination Booklet', 'ENG1 Medical Certificate'],
    visaOrPassportReq: 'International Passport + US C1/D Seaman Visa + Panama/Marshall Islands Endorsement',
    summary: 'Command foreign-going ultra-large container ships, tankers, or cruise liners across international oceans and maritime corridors.'
  },
  {
    id: 'REQ-SEA-INT-02',
    roleTitle: 'International Cruise Ship Electro-Technical Officer (ETO)',
    sector: 'cruise_marine',
    scope: 'International',
    organizationExample: 'Royal Caribbean Group, MSC Cruises, Norwegian Cruise Line',
    authority: 'IMO / STCW III/6 ETO Endorsement',
    minAge: 21,
    maxAge: 52,
    licenseRequired: 'STCW III/6 ETO Certificate of Competency',
    medicalStandard: 'STCW International Medical Fitness (ENG1)',
    experienceOrHours: '2+ Years ETO Experience on High-Voltage Passenger/Cargo Ships',
    keyCertifications: ['High Voltage (HV) Safety & Maintenance', 'Dynamic Positioning (DP) Maintenance', 'STCW V/2 Crowd Management for Cruise Ships'],
    documentChecklist: ['ETO CoC / CoE', 'Degree in Electrical & Electronics Engineering', 'STCW Basic & Advanced Safety Certs'],
    visaOrPassportReq: 'Valid Passport + US C1/D Visa + Schengen Transit Visa',
    summary: 'Maintains 11kV high-voltage marine electrical propulsion, azipod drives, automation, and guest theater infrastructure on cruise liners.'
  }
];

export const TRAINING_INSTITUTES_DATA: TrainingInstituteData[] = [
  // AVIATION INSTITUTES - DOMESTIC
  {
    id: 'INST-AIR-DOM-01',
    name: 'Indira Gandhi Rashtriya Uran Akademi (IGRUA)',
    sector: 'airways',
    country: 'India',
    countryFlag: '🇮🇳',
    cityLocation: 'Rae Bareli, Uttar Pradesh',
    scope: 'Domestic',
    authorityApproval: 'DGCA India Approved Flight Training Organization',
    category: 'Flight Training (Pilot CPL/ATPL)',
    simulatorSpecs: 'Diamond DA42 Twin-Engine & Trinidad TB20 FNPT-II Simulators',
    placementRatePct: 96,
    contactPhone: '+91 535 2441144',
    contactEmail: 'igrua.adm@nic.in',
    websiteUrl: 'https://igrua.gov.in',
    courses: [
      { courseName: 'Ab-Initio to Commercial Pilot License (CPL) + MEIR', duration: '18 Months', feeUSD: 55000, eligibility: '10+2 with Physics & Math (50%+)', accreditation: 'DGCA CPL' },
      { courseName: 'Multi-Engine Rating & Instrument Rating (MEIR)', duration: '3 Months', feeUSD: 12000, eligibility: 'Valid Single-Engine CPL', accreditation: 'DGCA Rating' }
    ]
  },
  {
    id: 'INST-AIR-DOM-02',
    name: 'National Flying Training Academy (NFTA / CAE Gondia)',
    sector: 'airways',
    country: 'India',
    countryFlag: '🇮🇳',
    cityLocation: 'Gondia, Maharashtra',
    scope: 'Domestic',
    authorityApproval: 'DGCA / CAE Joint Aviation Academy',
    category: 'Flight Training (Pilot CPL/ATPL)',
    simulatorSpecs: 'CAE 7000XR Airbus A320 Full Flight Simulator & DA42 Sim',
    placementRatePct: 98,
    contactPhone: '+91 7182 280000',
    contactEmail: 'enquiries@cae.com',
    websiteUrl: 'https://cae.com/gondia',
    courses: [
      { courseName: 'CAE Integrated Airline Pilot CPL Program', duration: '15 Months', feeUSD: 62000, eligibility: '10+2 Physics/Math + Class 1 Medical', accreditation: 'DGCA CPL' },
      { courseName: 'Airbus A320 Type Rating Course', duration: '2 Months', feeUSD: 18000, eligibility: 'DGCA CPL with MEIR', accreditation: 'A320 Endorsement' }
    ]
  },
  {
    id: 'INST-AIR-DOM-03',
    name: 'Bombay Flying Club & Aviation Academy',
    sector: 'airways',
    country: 'India',
    countryFlag: '🇮🇳',
    cityLocation: 'Juhu Aerodrome, Mumbai',
    scope: 'Domestic',
    authorityApproval: 'DGCA India CAR-147 Approved AME & Flight School',
    category: 'Aircraft Maintenance (AME B1/B2)',
    simulatorSpecs: 'Cessna 172 Glass Cockpit Sim & Jet Engine Test Benches',
    placementRatePct: 91,
    contactPhone: '+91 22 26601234',
    contactEmail: 'info@bombayflyingclub.com',
    websiteUrl: 'https://bombayflyingclub.com',
    courses: [
      { courseName: 'Aircraft Maintenance Engineering (AME B1.1 Heavy Jet)', duration: '24 Months', feeUSD: 25000, eligibility: '10+2 PCM or Engg Diploma', accreditation: 'DGCA CAR-147' },
      { courseName: 'Avionics Maintenance Engineering (AME B2)', duration: '24 Months', feeUSD: 24000, eligibility: '10+2 PCM (50%+)', accreditation: 'DGCA CAR-147' }
    ]
  },
  {
    id: 'INST-AIR-DOM-04',
    name: 'Civil Aviation Training College (CATC Prayagraj - AAI)',
    sector: 'airways',
    country: 'India',
    countryFlag: '🇮🇳',
    cityLocation: 'Prayagraj, Uttar Pradesh',
    scope: 'Domestic',
    authorityApproval: 'DGCA / AAI National Air Traffic Training Institute',
    category: 'ATC & Flight Operations',
    simulatorSpecs: '360-Degree Tower & Radar Procedural High-Density Simulator',
    placementRatePct: 100,
    contactPhone: '+91 532 2580432',
    contactEmail: 'catc_prayagraj@aai.aero',
    websiteUrl: 'https://aai.aero/catc',
    courses: [
      { courseName: 'Junior Executive Air Traffic Control (ATC) Induction', duration: '6 Months', feeUSD: 5000, eligibility: 'AAI Recruited B.Sc Physics/B.E', accreditation: 'DGCA ATC Rating' },
      { courseName: 'CNS Radar & Navigation Engineering Certification', duration: '6 Months', feeUSD: 4500, eligibility: 'Electronics / Telecom Degree', accreditation: 'AAI License' }
    ]
  },

  // AVIATION INSTITUTES - INTERNATIONAL
  {
    id: 'INST-AIR-INT-01',
    name: 'Emirates Aviation University & Flight Academy',
    sector: 'airways',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    cityLocation: 'Dubai Academic City, Dubai',
    scope: 'International',
    authorityApproval: 'GCAA UAE / ICAO Approved International University',
    category: 'Flight Training (Pilot CPL/ATPL)',
    simulatorSpecs: 'Airbus A380 & Boeing 777 Full Flight Simulators (Level D)',
    placementRatePct: 99,
    contactPhone: '+971 4 6050111',
    contactEmail: 'eau.admissions@emirates.com',
    websiteUrl: 'https://eau.ac.ae',
    courses: [
      { courseName: 'B.Sc Aeronautical Engineering & Flight Operations', duration: '3 Years', feeUSD: 75000, eligibility: 'High School Diploma (Physics/Math)', accreditation: 'GCAA / EASA' },
      { courseName: 'Emirates Integrated Cadet Pilot Program', duration: '18 Months', feeUSD: 85000, eligibility: 'GCAA Class 1 Medical + Entrance Exam', accreditation: 'GCAA ATPL' }
    ]
  },
  {
    id: 'INST-AIR-INT-02',
    name: 'CAE Oxford Aviation Academy',
    sector: 'airways',
    country: 'United Kingdom / USA',
    countryFlag: '🇬🇧',
    cityLocation: 'Oxford, UK & Phoenix, Arizona, USA',
    scope: 'International',
    authorityApproval: 'EASA / UK CAA / FAA Approved Flight ATO',
    category: 'Flight Training (Pilot CPL/ATPL)',
    simulatorSpecs: 'CAE 7000XR A320/B737 MAX Series & Piper Archer Fleet',
    placementRatePct: 97,
    contactPhone: '+44 1865 841188',
    contactEmail: 'oxfordacademy@cae.com',
    websiteUrl: 'https://cae.com/oxford',
    courses: [
      { courseName: 'EASA / UK CAA Integrated ATPL Airline Pilot Course', duration: '18 Months', feeUSD: 95000, eligibility: 'High School Diploma + Class 1 Medical', accreditation: 'EASA / UK CAA' },
      { courseName: 'FAA Commercial Pilot & CFI Flight Instructor', duration: '12 Months', feeUSD: 68000, eligibility: 'FAA Class 1 Medical', accreditation: 'FAA CPL/CFI' }
    ]
  },
  {
    id: 'INST-AIR-INT-03',
    name: 'Lufthansa Aviation Training Center',
    sector: 'airways',
    country: 'Germany',
    countryFlag: '🇩🇪',
    cityLocation: 'Frankfurt & Bremen',
    scope: 'International',
    authorityApproval: 'EASA German Federal Aviation Office (LBA)',
    category: 'Flight Training (Pilot CPL/ATPL)',
    simulatorSpecs: '48 Level-D Full Flight Simulators (A350, B787, A320)',
    placementRatePct: 98,
    contactPhone: '+49 69 6960',
    contactEmail: 'lat.info@dlh.de',
    websiteUrl: 'https://lufthansa-aviation-training.com',
    courses: [
      { courseName: 'European Airline Transport Pilot (ATPL Integrated)', duration: '20 Months', feeUSD: 105000, eligibility: 'EASA Class 1 Medical + Assessment', accreditation: 'EASA ATPL' }
    ]
  },

  // MARITIME INSTITUTES - DOMESTIC
  {
    id: 'INST-SEA-DOM-01',
    name: 'Indian Maritime University (IMU Campuses)',
    sector: 'cruise_marine',
    country: 'India',
    countryFlag: '🇮🇳',
    cityLocation: 'Chennai, Mumbai, Kolkata, Visakhapatnam, Kochi',
    scope: 'Domestic',
    authorityApproval: 'DG Shipping India Central Maritime University',
    category: 'Nautical Science (DNS/B.Sc)',
    simulatorSpecs: 'Wärtsilä Transas 240-Degree Full Mission Bridge & Engine Room Sim',
    placementRatePct: 96,
    contactPhone: '+91 44 24530343',
    contactEmail: 'academic@imu.ac.in',
    websiteUrl: 'https://imu.edu.in',
    courses: [
      { courseName: 'B.Tech Marine Engineering (4 Years Residential)', duration: '4 Years', feeUSD: 12000, eligibility: '10+2 PCM (60%+), IMU-CET Rank', accreditation: 'DG Shipping' },
      { courseName: 'B.Sc Nautical Science (3 Years Deck Cadership)', duration: '3 Years', feeUSD: 9500, eligibility: '10+2 PCM (60%+), IMU-CET Rank', accreditation: 'DG Shipping' },
      { courseName: 'Diploma in Nautical Science (DNS) - 1 Year Cadership', duration: '1 Year', feeUSD: 4500, eligibility: '10+2 PCM + Shipping Sponsorship', accreditation: 'DG Shipping' }
    ]
  },
  {
    id: 'INST-SEA-DOM-02',
    name: 'Tolani Maritime Institute (TMI Induri)',
    sector: 'cruise_marine',
    country: 'India',
    countryFlag: '🇮🇳',
    cityLocation: 'Induri, Pune, Maharashtra',
    scope: 'Domestic',
    authorityApproval: 'DG Shipping India / DNV GL Certified Maritime College',
    category: 'Marine Engineering (B.Tech)',
    simulatorSpecs: 'High Voltage 11kV Grid & Full Mission Liquid Cargo Simulator',
    placementRatePct: 98,
    contactPhone: '+91 2114 242000',
    contactEmail: 'info@tmi.tolani.edu',
    websiteUrl: 'https://tmi.tolani.edu',
    courses: [
      { courseName: 'B.Tech Marine Engineering (Degree & Sea Cadership)', duration: '4 Years', feeUSD: 16000, eligibility: '10+2 PCM (60%+), IMU CET + TCT', accreditation: 'DG Shipping' },
      { courseName: 'Electro-Technical Officer (ETO) Course', duration: '4 Months', feeUSD: 3800, eligibility: 'Degree in Electrical/Electronics Engg', accreditation: 'DG Shipping' }
    ]
  },
  {
    id: 'INST-SEA-DOM-03',
    name: 'Samundra Institute of Maritime Studies (SIMS)',
    sector: 'cruise_marine',
    country: 'India',
    countryFlag: '🇮🇳',
    cityLocation: 'Lonavala & Mumbai, Maharashtra',
    scope: 'Domestic',
    authorityApproval: 'DG Shipping Approved Executive Ship Management Academy',
    category: 'GPR & ETO Course',
    simulatorSpecs: 'Free-Fall Lifeboat Launch & Full Engine Room Simulator',
    placementRatePct: 100,
    contactPhone: '+91 2114 399500',
    contactEmail: 'sims.lonavala@samundra.com',
    websiteUrl: 'https://samundra.com',
    courses: [
      { courseName: 'DNS Nautical Science with ESM Company Placement', duration: '1 Year', feeUSD: 8500, eligibility: '10+2 PCM (60%+) + SIMS Entrance', accreditation: 'DG Shipping' },
      { courseName: 'General Purpose Rating (GP Rating)', duration: '6 Months', feeUSD: 2800, eligibility: '10th Class (40% Science/Math)', accreditation: 'DG Shipping' }
    ]
  },

  // MARITIME INSTITUTES - INTERNATIONAL
  {
    id: 'INST-SEA-INT-01',
    name: 'World Maritime University (WMU Malmö)',
    sector: 'cruise_marine',
    country: 'Sweden',
    countryFlag: '🇸🇪',
    cityLocation: 'Malmö, Sweden',
    scope: 'International',
    authorityApproval: 'IMO (International Maritime Organization) Global Postgraduate Institution',
    category: 'Nautical Science (DNS/B.Sc)',
    simulatorSpecs: 'Global Maritime Policy, Port Digitalization & Cyber Safety Research',
    placementRatePct: 99,
    contactPhone: '+46 40 356300',
    contactEmail: 'info@wmu.se',
    websiteUrl: 'https://wmu.se',
    courses: [
      { courseName: 'M.Sc Maritime Affairs (Shipping Management & Safety)', duration: '14 Months', feeUSD: 32000, eligibility: 'Bachelor Degree + Maritime Service', accreditation: 'IMO / WMU' },
      { courseName: 'Executive Post-Grad Diploma in Maritime Law & Insurance', duration: '12 Months', feeUSD: 18000, eligibility: 'University Degree in Law/Nautical', accreditation: 'IMO' }
    ]
  },
  {
    id: 'INST-SEA-INT-02',
    name: 'Singapore Maritime Academy (SMA - Singapore Poly)',
    sector: 'cruise_marine',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    cityLocation: 'Dover Road, Singapore',
    scope: 'International',
    authorityApproval: 'Maritime & Port Authority of Singapore (MPA Singapore)',
    category: 'Nautical Science (DNS/B.Sc)',
    simulatorSpecs: 'Transas Full Mission Shiphandling & VTS Vessel Traffic Simulator',
    placementRatePct: 99,
    contactPhone: '+65 6775 1133',
    contactEmail: 'contactus@sp.edu.sg',
    websiteUrl: 'https://sp.edu.sg/sma',
    courses: [
      { courseName: 'Diploma in Nautical Studies (DNS - Deck Officer)', duration: '3 Years', feeUSD: 22000, eligibility: 'GCE O-Level / 10th-12th Science', accreditation: 'MPA Singapore' },
      { courseName: 'Diploma in Marine Engineering (DMR)', duration: '3 Years', feeUSD: 22000, eligibility: 'GCE O-Level / Math & Science', accreditation: 'MPA Singapore' }
    ]
  },
  {
    id: 'INST-SEA-INT-03',
    name: 'Australian Maritime College (AMC - Univ of Tasmania)',
    sector: 'cruise_marine',
    country: 'Australia',
    countryFlag: '🇦🇺',
    cityLocation: 'Launceston, Tasmania',
    scope: 'International',
    authorityApproval: 'AMSA (Australian Maritime Safety Authority)',
    category: 'Marine Engineering (B.Tech)',
    simulatorSpecs: 'Deepwater Towing Tank, Cavitation Tunnel & Engine Room Sim',
    placementRatePct: 97,
    contactPhone: '+61 3 6324 9700',
    contactEmail: 'amc.info@utas.edu.au',
    websiteUrl: 'https://amc.edu.au',
    courses: [
      { courseName: 'Bachelor of Applied Science (Nautical Science)', duration: '3 Years', feeUSD: 42000, eligibility: 'High School Science/Math + IELTS 6.0', accreditation: 'AMSA' },
      { courseName: 'Bachelor of Marine Engineering (Honours)', duration: '4 Years', feeUSD: 48000, eligibility: 'High School Mathematics/Physics', accreditation: 'AMSA / Engineers Aus' }
    ]
  }
];

const SAMPLE_WORLD_JOBS: WorldJobListing[] = [
  // AIRWAYS & AVIATION AUTHORITY JOBS
  {
    id: 'JOB-AIR-101',
    title: 'Senior B777 / B787 Fleet Captain',
    organization: 'Emirates Airline & UAE General Civil Aviation Authority (GCAA)',
    sector: 'airways',
    category: 'Flight Operations & Captains',
    authorityType: 'ICAO / GCAA Class 1 Medical',
    location: 'Dubai International Airport (DXB), UAE',
    worldRegion: 'Middle East',
    salaryRangeUSD: '$16,500 - $21,000 / month (Tax Free + Housing)',
    employmentType: 'Permanent',
    experienceReq: '7,000 Total Flying Hours (min 2,000 hrs PIC on Widebody)',
    stcwOrIcaoCert: 'ICAO ATPL + B777/787 Type Rating',
    postedAgo: '12 mins ago',
    urgentBadge: true,
    featured: true,
    summary: 'Command long-haul international routes. Premium tax-free remuneration, family health cover, child education allowance, and global staff travel perks.'
  },
  {
    id: 'JOB-AIR-102',
    title: 'Air Traffic Controller (Area Control Officer)',
    organization: 'Directorate General of Civil Aviation (DGCA) / AAI India',
    sector: 'airways',
    category: 'Air Traffic Control (ATC)',
    authorityType: 'DGCA / ICAO Doc 4444',
    location: 'Mumbai Air Traffic Control Centre (VABB), India',
    worldRegion: 'Asia Pacific',
    salaryRangeUSD: '$6,500 - $9,200 / month',
    employmentType: 'Full-Time',
    experienceReq: '4+ Years Radar & Procedural En-Route Operations',
    stcwOrIcaoCert: 'ICAO ATC License with Radar & Area Control Endorsement',
    postedAgo: '45 mins ago',
    featured: true,
    summary: 'Manage high-density oceanic and overland air corridors in the Mumbai FIR. Includes shift allowance, housing quarters, and aviation hazard pay.'
  },
  {
    id: 'JOB-AIR-103',
    title: 'A350 Avionics & Systems Maintenance Engineer (B1/B2)',
    organization: 'Singapore Airlines Engineering Company (SIAEC) / CAAS',
    sector: 'airways',
    category: 'Avionics & Aeronautical Engineering',
    authorityType: 'CAAS / EASA Part-66',
    location: 'Changi International Airport, Singapore',
    worldRegion: 'Asia Pacific',
    salaryRangeUSD: '$7,800 - $11,000 / month',
    employmentType: 'Full-Time',
    experienceReq: '5+ Years Licensed Aircraft Engineer Experience',
    stcwOrIcaoCert: 'EASA Part-66 or CAAS B1/B2 Aircraft Maintenance License',
    postedAgo: '2 hours ago',
    summary: 'Perform heavy maintenance, avionics overhaul, and pre-flight airworthiness certification on Airbus A350-900 fleet at Changi Hangar 1.'
  },
  {
    id: 'JOB-AIR-104',
    title: 'International VIP Cabin Crew Director',
    organization: 'Qatar Airways / Qatar Civil Aviation Authority',
    sector: 'airways',
    category: 'Cabin Operations & In-Flight Services',
    authorityType: 'QCAA / ICAO Cabin Safety Standard',
    location: 'Doha Hamad International Airport (DOH), Qatar',
    worldRegion: 'Middle East',
    salaryRangeUSD: '$4,800 - $6,500 / month (Tax Free)',
    employmentType: 'Rotational Contract',
    experienceReq: '3+ Years First Class Cabin Supervisor',
    stcwOrIcaoCert: 'ICAO Cabin Crew Attestation & Aviation First Aid',
    postedAgo: '3 hours ago',
    urgentBadge: true,
    summary: 'Lead 5-star long-haul cabin service teams on ultra-long-haul flights. Free luxury accommodation in Doha, uniform allowance, and global flight discounts.'
  },
  {
    id: 'JOB-AIR-105',
    title: 'Aviation Safety & Airworthiness Inspector',
    organization: 'Federal Aviation Administration (FAA) / US Dept of Transportation',
    sector: 'airways',
    category: 'Aviation Authority & Oversight',
    authorityType: 'US FAA Safety Regulation',
    location: 'Miami / Atlanta Air Route Traffic HQ, USA',
    worldRegion: 'North America',
    salaryRangeUSD: '$10,500 - $14,000 / month',
    employmentType: 'Full-Time',
    experienceReq: '7+ Years Commercial Airline Safety Audit',
    stcwOrIcaoCert: 'FAA Airframe & Powerplant (A&P) / Commercial Pilot License',
    postedAgo: '5 hours ago',
    summary: 'Conduct air carrier safety audits, ramp inspections, and evaluate airline flight operations compliance across Caribbean & North American routes.'
  },

  // CRUISE SHIP & MARINE LINE JOBS
  {
    id: 'JOB-SEA-201',
    title: 'Master Captain - Ultra Large Cruise Ship',
    organization: 'Royal Caribbean Group / Bahamas Maritime Authority',
    sector: 'cruise_marine',
    category: 'Deck Department & Command',
    authorityType: 'IMO STCW I/10 Master Unlimited',
    location: 'Icon of the Seas (Worldwide Itineraries)',
    worldRegion: 'Global / High Seas',
    salaryRangeUSD: '$18,000 - $24,000 / month (10 Wks On / 10 Wks Off)',
    employmentType: 'Rotational Contract',
    experienceReq: '10+ Years Maritime Service, 3+ Years as Cruise Captain',
    stcwOrIcaoCert: 'STCW Master Mariner Unlimited + GMDSS + ECDIS',
    postedAgo: '18 mins ago',
    urgentBadge: true,
    featured: true,
    summary: 'Command 250,000 GT flagship cruise vessel carrying 7,000 passengers. Full executive suite on board, private dining privileges, and top tier maritime pay.'
  },
  {
    id: 'JOB-SEA-202',
    title: 'Chief Engineer - Dual-Fuel LNG Container Carrier',
    organization: 'A.P. Moller - Maersk Line / Danish Maritime Authority',
    sector: 'cruise_marine',
    category: 'Marine Engineering & Propulsion',
    authorityType: 'IMO STCW Chief Engineer Unlimited',
    location: 'Maersk Mc-Kinney Moller (Asia-Europe SLOC)',
    worldRegion: 'Europe',
    salaryRangeUSD: '$13,500 - $17,200 / month (4 Mos On / 4 Mos Off)',
    employmentType: 'Rotational Contract',
    experienceReq: '5+ Years Chief Engineer on 15,000+ TEU Vessels',
    stcwOrIcaoCert: 'STCW III/2 Chief Engineer Unlimited + IGF LNG Code Cert',
    postedAgo: '1 hour ago',
    featured: true,
    summary: 'Oversee 80MW dual-fuel methanol/LNG main propulsion engine, high-voltage generators, and automated engine room operations on mega-container liner.'
  },
  {
    id: 'JOB-SEA-203',
    title: 'Executive Hospitality & Cruise Operations Director',
    organization: 'Cordelia Cruises India / DG Shipping Certified',
    sector: 'cruise_marine',
    category: 'Cruise Hotel & Guest Hospitality',
    authorityType: 'DG Shipping / STCW Hotel Safety',
    location: 'Empress Cruise Ship (Mumbai - Goa - Lakshadweep)',
    worldRegion: 'Asia Pacific',
    salaryRangeUSD: '$7,200 - $9,800 / month',
    employmentType: 'Rotational Contract',
    experienceReq: '6+ Years 5-Star Resort or Cruise Hotel Management',
    stcwOrIcaoCert: 'STCW V/2 Crowd Management + Food Safety HACCP',
    postedAgo: '2 hours ago',
    summary: 'Lead food & beverage, stateroom operations, entertainment, and guest relation teams of 450 crew members on luxury Indian ocean liner.'
  },
  {
    id: 'JOB-SEA-204',
    title: 'Electro-Technical Officer (ETO) - Cruise Fleet',
    organization: 'MSC Cruises / Panama Maritime Authority',
    sector: 'cruise_marine',
    category: 'Electrical & Automation',
    authorityType: 'IMO STCW III/6 ETO Endorsement',
    location: 'MSC World Europa (Mediterranean & Gulf Routes)',
    worldRegion: 'Middle East',
    salaryRangeUSD: '$8,500 - $11,200 / month',
    employmentType: 'Rotational Contract',
    experienceReq: '3+ Years ETO on Passenger / Cruise Vessels',
    stcwOrIcaoCert: 'STCW III/6 ETO High Voltage (HV) Certification',
    postedAgo: '4 hours ago',
    urgentBadge: true,
    summary: 'Responsible for shipwide electrical grid, dynamic positioning (DP2), azipod propulsion power electronics, and theater AV automation.'
  },
  {
    id: 'JOB-SEA-205',
    title: 'Chief Officer Navigation & Safety Specialist',
    organization: 'CMA CGM Shipping Line / French Maritime Administration',
    sector: 'cruise_marine',
    category: 'Deck Department & Marine Safety',
    authorityType: 'IMO STCW II/2 Chief Mate Unlimited',
    location: 'CMA CGM Jacques Saadé (Transpacific Line)',
    worldRegion: 'Global / High Seas',
    salaryRangeUSD: '$9,800 - $12,500 / month',
    employmentType: 'Rotational Contract',
    experienceReq: '4+ Years 2nd Mate / Chief Mate Container Fleet',
    stcwOrIcaoCert: 'STCW Chief Mate Unlimited + Advanced Fire Fighting',
    postedAgo: '6 hours ago',
    summary: 'Manage bridge navigation watch, cargo loading stability calculations, deck crew safety drills, and SOLAS lifesaving equipment readiness.'
  }
];

export const GlobalJobAlertsPortal: React.FC<GlobalJobAlertsPortalProps> = ({
  initialPortalTab = 'listings',
  initialSector = 'all',
  initialScope = 'All'
}) => {
  const [portalTab, setPortalTab] = useState<PortalViewTab>(initialPortalTab);
  const [activeTab, setActiveTab] = useState<JobSectorType>(initialSector);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('All');
  const [minSalaryUSD, setMinSalaryUSD] = useState<number>(0);

  // Requirements Portal Filters State
  const [reqSectorFilter, setReqSectorFilter] = useState<'all' | 'airways' | 'cruise_marine'>(initialSector || 'all');
  const [reqScopeFilter, setReqScopeFilter] = useState<'All' | 'Domestic' | 'International'>(initialScope || 'All');

  // Educational Institutes Filters State
  const [instSectorFilter, setInstSectorFilter] = useState<'all' | 'airways' | 'cruise_marine'>(initialSector || 'all');
  const [instScopeFilter, setInstScopeFilter] = useState<'All' | 'Domestic' | 'International'>(initialScope || 'All');
  const [instSearchQuery, setInstSearchQuery] = useState('');
  const [enquiryModalInst, setEnquiryModalInst] = useState<TrainingInstituteData | null>(null);
  const [enquiryName, setEnquiryName] = useState('Capt. Alexander Vance');
  const [enquiryEmail, setEnquiryEmail] = useState('alex.vance@oceanbird-maritime.com');
  const [enquiryPhone, setEnquiryPhone] = useState('+91 98765 43210');
  const [enquiryCourse, setEnquiryCourse] = useState('');
  const [enquirySuccessRef, setEnquirySuccessRef] = useState<string | null>(null);

  // Multi-Language Menu Modal trigger
  const [isMultiLangOpen, setIsMultiLangOpen] = useState(false);

  // Selected job for application modal
  const [applyingJob, setApplyingJob] = useState<WorldJobListing | null>(null);
  const [applicantName, setApplicantName] = useState('Captain Alexander Vance');
  const [applicantEmail, setApplicantEmail] = useState('alex.vance@oceanbird-maritime.com');
  const [applicantPhone, setApplicantPhone] = useState('+91 98765 43210');
  const [applicantLicense, setApplicantLicense] = useState('ICAO-ATPL-99482 / STCW-MASTER-8820');
  const [applicantExperience, setApplicantExperience] = useState('12');
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Alert Subscription Modal & Form
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);
  const [alertSector, setAlertSector] = useState<'airways' | 'cruise_marine' | 'both'>('both');
  const [alertTargetAuthority, setAlertTargetAuthority] = useState('ALL_AUTHORITIES');
  const [alertChannel, setAlertChannel] = useState<'push_email' | 'sms' | 'satcom_vhf' | 'whatsapp'>('push_email');
  const [alertDeliveryFrequency, setAlertDeliveryFrequency] = useState<'INSTANT' | 'DAILY' | 'WEEKLY'>('INSTANT');
  const [alertEmailPhone, setAlertEmailPhone] = useState('');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  // Live dispatched alerts simulation ticker
  const [recentDispatches] = useState([
    { id: '1', time: '1 min ago', role: 'B777 Fleet Captain', org: 'Emirates Aviation', count: 48, region: 'Dubai / Middle East' },
    { id: '2', time: '4 mins ago', role: 'Master Captain Unlimited', org: 'Royal Caribbean', count: 29, region: 'High Seas / Bahamas' },
    { id: '3', time: '12 mins ago', role: 'Air Traffic Controller', org: 'DGCA AAI India', count: 112, region: 'Mumbai FIR' },
    { id: '4', time: '25 mins ago', role: 'Chief Engineer LNG', org: 'Maersk Line', count: 64, region: 'Rotterdam / Europe' }
  ]);

  // Saved bookmark jobs
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<string[]>(['JOB-AIR-101', 'JOB-SEA-201']);

  // Jobs Alert Schedule State
  const [scheduledAlerts, setScheduledAlerts] = useState<JobAlertRule[]>([
    {
      id: 'SCHED-01',
      ruleTitle: 'B777 & Widebody Command Positions',
      sector: 'airways',
      targetAuthority: 'Emirates / GCAA / FAA',
      frequency: 'INSTANT',
      deliveryChannel: 'push_email',
      quietHours: '22:00 - 06:00 (Bridge Watch Guard)',
      destination: 'captain.vance@aviation.com',
      isActive: true,
      lastDispatched: '12 mins ago',
      matchedCount: 142
    },
    {
      id: 'SCHED-02',
      ruleTitle: 'Cruise Line Master Mariner & Deck Officers',
      sector: 'cruise_marine',
      targetAuthority: 'Royal Caribbean / STCW Master',
      frequency: 'DAILY',
      deliveryChannel: 'satcom_vhf',
      quietHours: 'Disabled (24/7 Sea Dispatch)',
      destination: 'SatCom ID: 41928014-VHF',
      isActive: true,
      lastDispatched: '4 hours ago',
      matchedCount: 88
    },
    {
      id: 'SCHED-03',
      ruleTitle: 'Mumbai FIR En-Route Air Traffic Control',
      sector: 'airways',
      targetAuthority: 'DGCA India / AAI',
      frequency: 'SHIFT_CHANGE',
      deliveryChannel: 'whatsapp',
      quietHours: '23:00 - 05:00',
      destination: '+91 98765 43210',
      isActive: true,
      lastDispatched: 'Yesterday',
      matchedCount: 65
    }
  ]);

  // Form state for creating new scheduled alert
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleSector, setNewRuleSector] = useState<'airways' | 'cruise_marine' | 'both'>('both');
  const [newRuleFreq, setNewRuleFreq] = useState<'INSTANT' | 'DAILY' | 'WEEKLY' | 'SHIFT_CHANGE'>('INSTANT');
  const [newRuleChannel, setNewRuleChannel] = useState<'push_email' | 'sms' | 'satcom_vhf' | 'whatsapp'>('push_email');
  const [newRuleDestination, setNewRuleDestination] = useState('');
  const [newRuleQuietHours, setNewRuleQuietHours] = useState('22:00 - 06:00');
  const [testAlertToast, setTestAlertToast] = useState<string | null>(null);

  // Employee / Crew Profile State
  const [employeeProfile, setEmployeeProfile] = useState<EmployeeProfileData>({
    fullName: 'Capt. Alexander Vance',
    rankTitle: 'Senior B777 Captain & STCW Master Mariner',
    primarySector: 'Airways Flight Deck',
    nationality: 'Indian / International Maritime',
    dutyStatus: 'Available for Immediate Deployment',
    locationBase: 'Mumbai (VABB) & Dubai (DXB)',
    totalFlightHours: 7850,
    totalSeaDutyMonths: 64,
    expectedMinSalaryUSD: 16000,
    email: 'captain.vance@oceanbird-maritime.com',
    phone: '+91 98765 43210',
    passportCdcNumber: 'IND-CDC-994182 / PASS-Z8102931',
    usVisaStatus: 'US C1/D Transit & B1/B2 Valid thru 2031',
    licenses: [
      { id: 'L-01', codeName: 'ICAO Airline Transport Pilot License (ATPL)', authority: 'DGCA India / FAA', issueNo: 'ATPL-994821', expiryDate: '2028-11-30', isVerified: true },
      { id: 'L-02', codeName: 'IMO STCW Master Mariner Unlimited (II/2)', authority: 'DGCA Shipping India', issueNo: 'STCW-MASTER-8820', expiryDate: '2029-05-15', isVerified: true },
      { id: 'L-03', codeName: 'ICAO Class 1 Medical Fitness Certificate', authority: 'IAF Aviation Medicine', issueNo: 'MED1-2026-782', expiryDate: '2027-02-28', isVerified: true },
      { id: 'L-04', codeName: 'GMDSS General Operator Certificate (GOC)', authority: 'Ministry of Comms', issueNo: 'GOC-440192', expiryDate: '2030-08-20', isVerified: true }
    ]
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileExportToast, setProfileExportToast] = useState(false);

  const toggleBookmark = (id: string) => {
    if (bookmarkedJobIds.includes(id)) {
      setBookmarkedJobIds(bookmarkedJobIds.filter((jId) => jId !== id));
    } else {
      setBookmarkedJobIds([...bookmarkedJobIds, id]);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSuccess(true);
    setTimeout(() => {
      setApplicationSuccess(false);
      setApplyingJob(null);
    }, 2800);
  };

  const handleAlertSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionSuccess(true);
    setTimeout(() => {
      setSubscriptionSuccess(false);
      setSubscriptionOpen(false);
      setAlertEmailPhone('');
    }, 2500);
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleTitle.trim() || !newRuleDestination.trim()) return;

    const newRule: JobAlertRule = {
      id: `SCHED-${Date.now().toString().slice(-4)}`,
      ruleTitle: newRuleTitle,
      sector: newRuleSector,
      targetAuthority: 'Global Certified Authorities',
      frequency: newRuleFreq,
      deliveryChannel: newRuleChannel,
      quietHours: newRuleQuietHours,
      destination: newRuleDestination,
      isActive: true,
      lastDispatched: 'Just created',
      matchedCount: 24
    };

    setScheduledAlerts([newRule, ...scheduledAlerts]);
    setNewRuleTitle('');
    setNewRuleDestination('');
    setTestAlertToast('New Alert Dispatch Schedule Activated Successfully!');
    setTimeout(() => setTestAlertToast(null), 3000);
  };

  const toggleScheduleActive = (id: string) => {
    setScheduledAlerts(
      scheduledAlerts.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const deleteSchedule = (id: string) => {
    setScheduledAlerts(scheduledAlerts.filter((s) => s.id !== id));
  };

  const triggerTestDispatch = (ruleTitle: string) => {
    setTestAlertToast(`⚡ TEST ALERT SENT: "${ruleTitle}" dispatched via encrypted satcom/email channel!`);
    setTimeout(() => setTestAlertToast(null), 4000);
  };

  const handleExportCV = () => {
    setProfileExportToast(true);
    setTimeout(() => {
      window.print();
      setProfileExportToast(false);
    }, 1000);
  };

  const filteredJobs = SAMPLE_WORLD_JOBS.filter((job) => {
    if (activeTab === 'airways' && job.sector !== 'airways') return false;
    if (activeTab === 'cruise_marine' && job.sector !== 'cruise_marine') return false;

    if (selectedRegion !== 'All' && job.worldRegion !== selectedRegion) return false;

    if (selectedAuthority !== 'All') {
      if (!job.authorityType.toLowerCase().includes(selectedAuthority.toLowerCase()) &&
          !job.organization.toLowerCase().includes(selectedAuthority.toLowerCase())) {
        return false;
      }
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.organization.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.stcwOrIcaoCert.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div id="global-job-alerts-portal" className="space-y-8 animate-fadeIn font-sans text-white pb-12">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>WORLDWIDE CAREER & ALERT SERVICE</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>ICAO / FAA / DGCA & IMO STCW VERIFIED</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase flex items-center space-x-1">
                <BellRing className="w-3.5 h-3.5 text-amber-400" />
                <span>REAL-TIME NOTIFICATION DISPATCH</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Plane className="w-8 h-8 text-sky-400" />
                <Ship className="w-8 h-8 text-teal-400" />
              </div>
              <span>Airways & Marine Line Jobs Alert Portal</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-4xl font-sans leading-relaxed">
              Global notification system for civil aviation authorities, airlines, air traffic controllers, cruise ship commanders, marine engineers, and port logistics personnel worldwide. Subscribe to instant job alerts via Push, Email, SMS, and SatCom VHF.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* MULTI LANGUAGE MENU BUTTON */}
            <button
              onClick={() => setIsMultiLangOpen(true)}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/40 font-bold text-xs uppercase transition-all flex items-center space-x-2 shadow-lg"
              title="Open Global Multi-Language Menu"
            >
              <Globe className="w-4 h-4 text-sky-400 animate-spin-slow" />
              <span>MULTI-LANGUAGE MENU</span>
            </button>

            <button
              onClick={() => setSubscriptionOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 border border-amber-300/40"
            >
              <Bell className="w-4 h-4 fill-slate-950" />
              <span>SET UP WORLD JOB ALERTS</span>
            </button>
          </div>
        </div>

        {/* LIVE DISPATCH FEED TICKER */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-2">
            <div className="flex items-center space-x-2 text-sky-400 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
              <span className="uppercase tracking-wider">LIVE GLOBAL ALERT DISPATCH FEED</span>
            </div>
            <span>2,480 Active Subscriptions Today</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {recentDispatches.map((item) => (
              <div key={item.id} className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex items-start space-x-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 overflow-hidden">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-sky-300 font-bold truncate">{item.role}</span>
                    <span className="text-slate-500 text-[9px]">{item.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-sans truncate">{item.org} ({item.region})</p>
                  <span className="text-[9px] text-emerald-400 font-bold block">✓ {item.count} Candidates Alerted</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PORTAL MAIN NAVIGATION TABS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl font-mono text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPortalTab('listings')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'listings'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>WORLD JOB OPENINGS ({SAMPLE_WORLD_JOBS.length})</span>
          </button>

          <button
            onClick={() => setPortalTab('jobs_requirements')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'jobs_requirements'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>JOBS REQUIREMENTS PORTAL (INTL & DOMESTIC)</span>
          </button>

          <button
            onClick={() => setPortalTab('educational_institutes')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'educational_institutes'
                ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>EDUCATIONAL & TRAINING INSTITUTES ({TRAINING_INSTITUTES_DATA.length})</span>
          </button>

          <button
            onClick={() => setPortalTab('analytics')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'analytics'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>JOBS ANALYTICS</span>
          </button>

          <button
            onClick={() => setPortalTab('schedule')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'schedule'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>ALERT SCHEDULE ({scheduledAlerts.length})</span>
          </button>

          <button
            onClick={() => setPortalTab('profile')}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
              portalTab === 'profile'
                ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>EMPLOYEES PROFILE</span>
          </button>
        </div>

        {/* Saved Bookmarks Counter */}
        <div className="flex items-center space-x-2 text-slate-400 text-xs px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
          <Bookmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Bookmarks: <strong className="text-white">{bookmarkedJobIds.length}</strong></span>
        </div>
      </div>

      {/* TOAST TEST ALERT NOTIFICATION */}
      {testAlertToast && (
        <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-between shadow-2xl animate-bounce">
          <div className="flex items-center space-x-2">
            <BellRing className="w-5 h-5 animate-pulse" />
            <span>{testAlertToast}</span>
          </div>
          <button onClick={() => setTestAlertToast(null)} className="font-black px-2 py-0.5 rounded bg-slate-950 text-white">✕</button>
        </div>
      )}

      {/* ================= TAB 1: WORLD JOB LISTINGS ================= */}
      {portalTab === 'listings' && (
        <div className="space-y-6 animate-fadeIn">
          {/* SEARCH & FILTERS BAR */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 space-x-1 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    activeTab === 'all'
                      ? 'bg-sky-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Openings
                </button>
                <button
                  onClick={() => setActiveTab('airways')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'airways'
                      ? 'bg-sky-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>Airways & Aviation</span>
                </button>
                <button
                  onClick={() => setActiveTab('cruise_marine')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'cruise_marine'
                      ? 'bg-teal-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Ship className="w-3.5 h-3.5" />
                  <span>Cruise Ships & Marine</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search Captain, ATC, Engineer, STCW, ICAO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>World Region</span>
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                >
                  <option value="All">🌐 All Global Regions</option>
                  <option value="Asia Pacific">🌏 Asia Pacific (India / SG / JP)</option>
                  <option value="Middle East">🕌 Middle East (Dubai / Doha / Gulf)</option>
                  <option value="Europe">🇪🇺 Europe (UK / Netherlands / France)</option>
                  <option value="North America">🇺🇸 North America (USA / Caribbean)</option>
                  <option value="Global / High Seas">⚓ High Seas & Worldwide Cruise</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  <span>Authority / Certification</span>
                </label>
                <select
                  value={selectedAuthority}
                  onChange={(e) => setSelectedAuthority(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                >
                  <option value="All">📋 All Civil & Maritime Authorities</option>
                  <option value="ICAO">✈️ ICAO / FAA / DGCA Civil Aviation</option>
                  <option value="STCW">🚢 IMO STCW Certified Seafarer</option>
                  <option value="EASA">🔧 EASA / CAAS Part-66 Avionics</option>
                  <option value="Emirates">🇦🇪 Emirates & Gulf Authorities</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold flex items-center justify-between">
                  <span>Minimum Monthly Pay</span>
                  <span className="text-amber-400 font-bold">${minSalaryUSD.toLocaleString()} USD</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={15000}
                  step={1000}
                  value={minSalaryUSD}
                  onChange={(e) => setMinSalaryUSD(Number(e.target.value))}
                  className="w-full accent-sky-400 bg-slate-950 rounded-lg cursor-pointer h-2"
                />
              </div>
            </div>
          </div>

          {/* JOBS CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredJobs.map((job) => {
              const isBookmarked = bookmarkedJobIds.includes(job.id);
              return (
                <div
                  key={job.id}
                  className={`p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
                    job.featured
                      ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-sky-500/40 shadow-xl'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase flex items-center space-x-1 ${
                              job.sector === 'airways'
                                ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                                : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                            }`}
                          >
                            {job.sector === 'airways' ? <Plane className="w-3 h-3" /> : <Ship className="w-3 h-3" />}
                            <span>{job.category}</span>
                          </span>

                          {job.urgentBadge && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase animate-pulse">
                              🔥 URGENT DISPATCH
                            </span>
                          )}

                          <span className="text-[10px] font-mono text-slate-400">ID: {job.id}</span>
                        </div>

                        <h3 className="text-lg font-bold text-white leading-snug">{job.title}</h3>
                        <p className="text-xs text-sky-300 font-medium">{job.organization}</p>
                      </div>

                      <button
                        onClick={() => toggleBookmark(job.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                        title="Bookmark Job Listing"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{job.summary}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                      <div>
                        <span className="text-slate-500 text-[10px] block">REMUNERATION</span>
                        <span className="text-emerald-400 font-bold text-xs">{job.salaryRangeUSD}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">LOCATION</span>
                        <span className="text-slate-200 font-bold truncate block">{job.location}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">CERTIFICATION</span>
                        <span className="text-sky-300 font-bold text-[11px] truncate block">{job.stcwOrIcaoCert}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">DEPLOYMENT</span>
                        <span className="text-amber-300 font-bold text-[11px]">{job.employmentType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
                    <span className="text-slate-500 text-[10px]">Posted {job.postedAgo}</span>
                    <button
                      onClick={() => setApplyingJob(job)}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase transition-all shadow-md flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>1-CLICK APPLY</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: JOBS REQUIREMENTS PORTAL ================= */}
      {portalTab === 'jobs_requirements' && (
        <div className="space-y-6 animate-fadeIn">
          {/* HEADER & FILTERS */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center space-x-2">
                  <FileCheck2 className="w-6 h-6 text-amber-400" />
                  <span>Airways & Marine Jobs Requirements & Eligibility Matrix</span>
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Comprehensive regulatory requirements for domestic and international aviation flight deck, air traffic control, maritime captains, marine engineers, and ETO officers.
                </p>
              </div>

              {/* SECTOR & SCOPE FILTERS */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 space-x-1">
                  <button
                    onClick={() => setReqSectorFilter('all')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      reqSectorFilter === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Sectors
                  </button>
                  <button
                    onClick={() => setReqSectorFilter('airways')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 ${
                      reqSectorFilter === 'airways' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>Airways</span>
                  </button>
                  <button
                    onClick={() => setReqSectorFilter('cruise_marine')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 ${
                      reqSectorFilter === 'cruise_marine' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Ship className="w-3.5 h-3.5" />
                    <span>Marine</span>
                  </button>
                </div>

                <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 space-x-1">
                  {['All', 'Domestic', 'International'].map((sc) => (
                    <button
                      key={sc}
                      onClick={() => setReqScopeFilter(sc as any)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        reqScopeFilter === sc ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* REQUIREMENT SPEC CARDS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {JOB_REQUIREMENTS_DATA.filter((req) => {
                if (reqSectorFilter !== 'all' && req.sector !== reqSectorFilter) return false;
                if (reqScopeFilter !== 'All' && req.scope !== reqScopeFilter) return false;
                return true;
              }).map((req) => (
                <div key={req.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg hover:border-amber-500/40 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          req.sector === 'airways' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        }`}>
                          {req.sector === 'airways' ? '✈ AIRWAYS' : '⚓ MARINE'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          req.scope === 'Domestic' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {req.scope} ROUTE / SCOPE
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{req.roleTitle}</h3>
                      <p className="text-xs text-slate-400 font-mono">Verified Authority: <strong className="text-sky-300">{req.authority}</strong></p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{req.summary}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 text-[10px] block">AGE RANGE</span>
                      <span className="text-white font-bold">{req.minAge} - {req.maxAge} Years</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">LICENSE REQ</span>
                      <span className="text-amber-400 font-bold truncate block">{req.licenseRequired}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">MEDICAL FIT</span>
                      <span className="text-emerald-400 font-bold truncate block">{req.medicalStandard}</span>
                    </div>
                  </div>

                  {/* Certifications & Document Checklist */}
                  <div className="space-y-2 text-xs">
                    <span className="text-[11px] font-mono font-bold text-sky-400 uppercase block">Mandatory Competency Certifications:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {req.keyCertifications.map((cert, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono flex items-center space-x-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>{cert}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block">Required Document Verification Checklist:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-300 font-mono">
                      {req.documentChecklist.map((doc, idx) => (
                        <li key={idx} className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className="truncate">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Visa & Passport: <strong className="text-slate-200">{req.visaOrPassportReq}</strong></span>
                    <span className="text-sky-400 font-bold flex items-center space-x-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Regulatory Verified</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: EDUCATIONAL & TRAINING INSTITUTES ================= */}
      {portalTab === 'educational_institutes' && (
        <div className="space-y-6 animate-fadeIn">
          {/* HEADER & FILTERS */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-teal-400" />
                  <span>Airways & Marine Educational & Training Institutes Directory</span>
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Global directory of certified flight academies, aeronautical universities, maritime colleges, and simulator centers across domestic and international regions.
                </p>
              </div>

              {/* FILTERS */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 space-x-1">
                  <button
                    onClick={() => setInstSectorFilter('all')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      instSectorFilter === 'all' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Sectors
                  </button>
                  <button
                    onClick={() => setInstSectorFilter('airways')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 ${
                      instSectorFilter === 'airways' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>Aviation Institutes</span>
                  </button>
                  <button
                    onClick={() => setInstSectorFilter('cruise_marine')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 ${
                      instSectorFilter === 'cruise_marine' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Ship className="w-3.5 h-3.5" />
                    <span>Maritime Institutes</span>
                  </button>
                </div>

                <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 space-x-1">
                  {['All', 'Domestic', 'International'].map((sc) => (
                    <button
                      key={sc}
                      onClick={() => setInstScopeFilter(sc as any)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        instScopeFilter === sc ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* INSTITUTES CARDS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {TRAINING_INSTITUTES_DATA.filter((inst) => {
                if (instSectorFilter !== 'all' && inst.sector !== instSectorFilter) return false;
                if (instScopeFilter !== 'All' && inst.scope !== instScopeFilter) return false;
                if (instSearchQuery.trim() !== '') {
                  const q = instSearchQuery.toLowerCase();
                  return inst.name.toLowerCase().includes(q) || inst.cityLocation.toLowerCase().includes(q) || inst.country.toLowerCase().includes(q);
                }
                return true;
              }).map((inst) => (
                <div key={inst.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg hover:border-teal-500/40 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{inst.countryFlag}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          inst.sector === 'airways' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        }`}>
                          {inst.sector === 'airways' ? '✈ AVIATION' : '⚓ MARITIME'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          inst.scope === 'Domestic' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {inst.scope} ({inst.country})
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{inst.name}</h3>
                      <p className="text-xs text-slate-400 font-mono flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{inst.cityLocation}, {inst.country}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold block">
                        {inst.placementRatePct}% Placement
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1 text-xs font-mono">
                    <span className="text-slate-500 text-[10px] block uppercase">Government & Regulatory Accreditation:</span>
                    <p className="text-sky-300 font-bold">{inst.authorityApproval}</p>
                    <p className="text-slate-400 text-[11px] mt-1">Simulator Infrastructure: <strong className="text-slate-200">{inst.simulatorSpecs}</strong></p>
                  </div>

                  {/* COURSES OFFERED TABLE */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-teal-400 uppercase block">Certified Course Offerings:</span>
                    <div className="space-y-2">
                      {inst.courses.map((crs, cIdx) => (
                        <div key={cIdx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                          <div className="space-y-0.5">
                            <span className="text-white font-bold block">{crs.courseName}</span>
                            <span className="text-slate-400 text-[10px]">Eligibility: {crs.eligibility} ({crs.duration})</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-emerald-400 font-black text-xs block">${crs.feeUSD.toLocaleString()} USD</span>
                            <span className="text-sky-300 text-[10px]">{crs.accreditation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center space-x-3 text-slate-400 text-[11px]">
                      <span className="flex items-center space-x-1"><Phone className="w-3 h-3 text-teal-400" /><span>{inst.contactPhone}</span></span>
                      <span className="flex items-center space-x-1"><Mail className="w-3 h-3 text-sky-400" /><span>{inst.contactEmail}</span></span>
                    </div>
                    <button
                      onClick={() => setEnquiryModalInst(inst)}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase transition-all shadow-md flex items-center space-x-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>ENQUIRE ADMISSION</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: JOBS ANALYTICS ================= */}
      {portalTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-6 h-6 text-sky-400" />
                  <h2 className="text-xl font-bold text-white">Global Aviation & Maritime Hiring Analytics</h2>
                </div>
                <p className="text-slate-400 text-xs">
                  Real-time market insights, salary benchmarks, and authority certification demand across ICAO & IMO STCW sectors.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                ● Q3 2026 LIVE MARKET DATA
              </span>
            </div>

            {/* KPI STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Active Vacancies</span>
                <p className="text-3xl font-black text-white">2,480</p>
                <div className="flex items-center text-emerald-400 text-xs space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% growth vs last quarter</span>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Airways Sector Share</span>
                <p className="text-3xl font-black text-sky-400">1,340</p>
                <div className="flex items-center text-sky-300 text-xs space-x-1">
                  <Plane className="w-3.5 h-3.5" />
                  <span>54% of global aviation demand</span>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Cruise & Marine Share</span>
                <p className="text-3xl font-black text-teal-400">1,140</p>
                <div className="flex items-center text-teal-300 text-xs space-x-1">
                  <Ship className="w-3.5 h-3.5" />
                  <span>46% of maritime command demand</span>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Avg Senior Monthly Pay</span>
                <p className="text-3xl font-black text-amber-400">$12,450</p>
                <div className="flex items-center text-amber-300 text-xs space-x-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>USD Tax-Free + Rotational Housing</span>
                </div>
              </div>
            </div>

            {/* SECTOR DEMAND & SALARY BENCHMARK GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Breakdown Progress Bars */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <PieChart className="w-4 h-4 text-sky-400" />
                  <span>Vacancy Share by Role & Department</span>
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Widebody Flight Captains (B777/A350)</span>
                      <span className="text-sky-400 font-bold">32% (793 positions)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full rounded-full" style={{ width: '32%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Air Traffic Controllers (ATC Radar En-Route)</span>
                      <span className="text-teal-400 font-bold">22% (545 positions)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-teal-400 h-full rounded-full" style={{ width: '22%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Cruise Ship Master Mariner & Deck Officers</span>
                      <span className="text-amber-400 font-bold">18% (446 positions)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '18%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Marine Chief Engineers & LNG Dual-Fuel</span>
                      <span className="text-emerald-400 font-bold">16% (396 positions)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '16%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Avionics Maintenance & ETO High Voltage</span>
                      <span className="text-rose-400 font-bold">12% (300 positions)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-rose-400 h-full rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Hotspots & Salary Chart */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Regional Hiring Hotspots & Average Remuneration</span>
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">🕌 Middle East (Dubai / Doha)</span>
                      <span className="text-[10px] text-slate-400">Emirates, Qatar Airways, GCAA</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold">$16,500/mo</span>
                      <span className="text-[10px] text-slate-500 block">Tax Free + Family Cover</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">🌏 Asia Pacific (Mumbai / Changi)</span>
                      <span className="text-[10px] text-slate-400">DGCA India, SIAEC, Cordelia</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold">$9,800/mo</span>
                      <span className="text-[10px] text-slate-500 block">Flight & Sea Allowance</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">⚓ High Seas / Bahamas Flagship</span>
                      <span className="text-[10px] text-slate-400">Royal Caribbean, MSC, Maersk</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold">$18,200/mo</span>
                      <span className="text-[10px] text-slate-500 block">10 Wks On / 10 Wks Off</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: JOB ALERT SCHEDULE ================= */}
      {portalTab === 'schedule' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <h2 className="text-xl font-bold text-white">Automated Job Alert Schedule Manager</h2>
                </div>
                <p className="text-slate-400 text-xs">
                  Configure automated recurring notification schedules, bridge watch quiet hours, and test satellite VHF dispatches.
                </p>
              </div>

              <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center space-x-1.5">
                <BellRing className="w-4 h-4 animate-pulse text-amber-400" />
                <span>{scheduledAlerts.filter(s => s.isActive).length} ACTIVE SCHEDULES</span>
              </span>
            </div>

            {/* SCHEDULED ALERTS LIST */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Your Configured Alert Schedules</h3>

              <div className="grid grid-cols-1 gap-4">
                {scheduledAlerts.map((schedule) => (
                  <div
                    key={schedule.id}
                    className={`p-5 rounded-2xl border font-mono text-xs transition-all space-y-3 ${
                      schedule.isActive
                        ? 'bg-slate-950 border-amber-500/30 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800/80 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${schedule.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                          <h4 className="font-bold text-sm text-white">{schedule.ruleTitle}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            {schedule.id}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] font-sans">
                          Sector: <strong className="text-sky-300">{schedule.sector.toUpperCase()}</strong> | Target: {schedule.targetAuthority}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => triggerTestDispatch(schedule.ruleTitle)}
                          className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase transition-all flex items-center space-x-1"
                          title="Trigger immediate test alert dispatch"
                        >
                          <Zap className="w-3 h-3 text-amber-400" />
                          <span>TEST DISPATCH</span>
                        </button>

                        <button
                          onClick={() => toggleScheduleActive(schedule.id)}
                          className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase transition-all flex items-center space-x-1 ${
                            schedule.isActive
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {schedule.isActive ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                          <span>{schedule.isActive ? 'ACTIVE' : 'PAUSED'}</span>
                        </button>

                        <button
                          onClick={() => deleteSchedule(schedule.id)}
                          className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-300 border border-slate-800 transition-all"
                          title="Delete Alert Schedule"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px]">
                      <div>
                        <span className="text-slate-500 text-[9px] block">FREQUENCY</span>
                        <span className="text-amber-300 font-bold">{schedule.frequency}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[9px] block">CHANNEL</span>
                        <span className="text-sky-300 font-bold">{schedule.deliveryChannel.toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[9px] block">QUIET HOURS</span>
                        <span className="text-slate-300 font-bold truncate block">{schedule.quietHours}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[9px] block">DESTINATION</span>
                        <span className="text-emerald-400 font-bold truncate block">{schedule.destination}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADD NEW SCHEDULE FORM */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                <Plus className="w-4 h-4 text-sky-400" />
                <span>Create New Scheduled Job Alert Rule</span>
              </h3>

              <form onSubmit={handleCreateSchedule} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Alert Schedule Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dubai Widebody Captains & STCW Chief Mates"
                    value={newRuleTitle}
                    onChange={(e) => setNewRuleTitle(e.target.value)}
                    className="w-full bg-slate-900 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Sector Focus</label>
                  <select
                    value={newRuleSector}
                    onChange={(e: any) => setNewRuleSector(e.target.value)}
                    className="w-full bg-slate-900 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  >
                    <option value="both">🌐 Both Airways & Marine Line</option>
                    <option value="airways">✈️ Airways & Aviation Only</option>
                    <option value="cruise_marine">🚢 Cruise Ships & Maritime Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Dispatch Frequency</label>
                  <select
                    value={newRuleFreq}
                    onChange={(e: any) => setNewRuleFreq(e.target.value)}
                    className="w-full bg-slate-900 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  >
                    <option value="INSTANT">⚡ Instant Alert (60-sec real-time dispatch)</option>
                    <option value="DAILY">📅 Daily Morning Brief (08:00 UTC)</option>
                    <option value="SHIFT_CHANGE">🔄 Shift Change Alert (18:00 UTC)</option>
                    <option value="WEEKLY">📊 Weekly Career Digest</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Notification Channel</label>
                  <select
                    value={newRuleChannel}
                    onChange={(e: any) => setNewRuleChannel(e.target.value)}
                    className="w-full bg-slate-900 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  >
                    <option value="push_email">📧 Email & Browser Push</option>
                    <option value="sms">📱 SMS Text Alert</option>
                    <option value="whatsapp">💬 WhatsApp Message</option>
                    <option value="satcom_vhf">📡 SatCom Satellite VHF Broadcast</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Destination Email / SatCom ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="pilot.alert@aviation.com or +91 9876543210"
                    value={newRuleDestination}
                    onChange={(e) => setNewRuleDestination(e.target.value)}
                    className="w-full bg-slate-900 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Quiet Hours Guard (Bridge / Flight Deck Watch)</label>
                  <input
                    type="text"
                    value={newRuleQuietHours}
                    onChange={(e) => setNewRuleQuietHours(e.target.value)}
                    placeholder="e.g. 22:00 - 06:00 Local Time"
                    className="w-full bg-slate-900 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4 text-slate-950" />
                    <span>ACTIVATE NEW SCHEDULE RULE</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: EMPLOYEES PROFILE ================= */}
      {portalTab === 'profile' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl border-2 border-white/20 shrink-0">
                  AV
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-black text-white">{employeeProfile.fullName}</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      ✓ VERIFIED COMMANDER
                    </span>
                  </div>
                  <p className="text-sky-300 text-xs font-mono font-bold">{employeeProfile.rankTitle}</p>
                  <span className="text-slate-400 text-xs font-sans">Base: {employeeProfile.locationBase} | {employeeProfile.nationality}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExportCV}
                  className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase transition-all shadow-md flex items-center space-x-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>EXPORT CERTIFIED CV / PDF</span>
                </button>

                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase transition-all border border-slate-700 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4 text-sky-400" />
                  <span>{editingProfile ? 'SAVE PROFILE' : 'EDIT PROFILE'}</span>
                </button>
              </div>
            </div>

            {profileExportToast && (
              <div className="p-3 rounded-xl bg-teal-500 text-slate-950 font-bold font-mono text-xs text-center animate-pulse">
                🖨️ Preparing Certified Flight & Sea Career Credentials Packet... Opening Print / Save as PDF!
              </div>
            )}

            {/* SERVICE LOG & HOURS STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Total Flying Hours</span>
                <p className="text-2xl font-black text-sky-400">{employeeProfile.totalFlightHours.toLocaleString()} Hrs</p>
                <span className="text-[10px] text-slate-400 block">Widebody PIC: 3,400 Hrs</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Sea Duty Service</span>
                <p className="text-2xl font-black text-teal-400">{employeeProfile.totalSeaDutyMonths} Months</p>
                <span className="text-[10px] text-slate-400 block">Flagship & LNG Tankers</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Min Pay Expectation</span>
                <p className="text-2xl font-black text-amber-400">${employeeProfile.expectedMinSalaryUSD.toLocaleString()}/mo</p>
                <span className="text-[10px] text-slate-400 block">Tax-Free Rotational Contract</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Deployment Readiness</span>
                <p className="text-xs font-bold text-emerald-400 mt-1">{employeeProfile.dutyStatus}</p>
                <span className="text-[10px] text-slate-400 block">Passport & CDC Valid</span>
              </div>
            </div>

            {/* EDITABLE FORM OR VERIFIED LICENSES WALLET */}
            {editingProfile ? (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Update Employee Profile Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px] uppercase font-bold">Full Name</label>
                    <input
                      type="text"
                      value={employeeProfile.fullName}
                      onChange={(e) => setEmployeeProfile({ ...employeeProfile, fullName: e.target.value })}
                      className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px] uppercase font-bold">Rank & Title</label>
                    <input
                      type="text"
                      value={employeeProfile.rankTitle}
                      onChange={(e) => setEmployeeProfile({ ...employeeProfile, rankTitle: e.target.value })}
                      className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px] uppercase font-bold">Total Flying Hours</label>
                    <input
                      type="number"
                      value={employeeProfile.totalFlightHours}
                      onChange={(e) => setEmployeeProfile({ ...employeeProfile, totalFlightHours: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[10px] uppercase font-bold">Sea Duty Service Months</label>
                    <input
                      type="number"
                      value={employeeProfile.totalSeaDutyMonths}
                      onChange={(e) => setEmployeeProfile({ ...employeeProfile, totalSeaDutyMonths: Number(e.target.value) })}
                      className="w-full bg-slate-900 text-white font-bold p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setEditingProfile(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs uppercase transition-all"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Civil Aviation & Maritime License Wallet</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {employeeProfile.licenses.map((lic) => (
                    <div key={lic.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">{lic.codeName}</h4>
                          <span className="text-[10px] text-sky-300 block">Authority: {lic.authority}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold uppercase border border-emerald-500/30">
                          VERIFIED
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-900 text-slate-400">
                        <div>
                          <span>ISSUE REG NO:</span>
                          <strong className="text-slate-200 block">{lic.issueNo}</strong>
                        </div>
                        <div>
                          <span>VALID THRU:</span>
                          <strong className="text-amber-300 block">{lic.expiryDate}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">PASSPORT & SEAMAN CDC</span>
                    <span className="text-white font-bold">{employeeProfile.passportCdcNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">TRANSIT VISA STATUS</span>
                    <span className="text-emerald-400 font-bold">{employeeProfile.usVisaStatus}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MULTI-LANGUAGE MENU MODAL ================= */}
      {isMultiLangOpen && (
        <MultiLanguageMenu onClose={() => setIsMultiLangOpen(false)} />
      )}

      {/* ================= APPLICATION MODAL ================= */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn font-mono text-xs text-white">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-sky-500/20 text-sky-300 font-bold uppercase">
                  1-CLICK APPLICATION DISPATCH
                </span>
                <h3 className="text-base font-bold text-white mt-1">{applyingJob.title}</h3>
                <p className="text-slate-400 text-xs font-sans">{applyingJob.organization}</p>
              </div>

              <button
                onClick={() => setApplyingJob(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-950 border border-slate-800"
              >
                ✕
              </button>
            </div>

            {applicationSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Application Transmitted Successfully!</h4>
                <p className="text-xs text-slate-300 font-sans">
                  Your certified license wallet and resume credentials have been dispatched directly to {applyingJob.organization}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Mobile / VHF Contact *</label>
                    <input
                      type="text"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">ICAO ATPL / IMO STCW License Code *</label>
                  <input
                    type="text"
                    required
                    value={applicantLicense}
                    onChange={(e) => setApplicantLicense(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT APPLICATION & CREDENTIALS</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= SUBSCRIPTION MODAL ================= */}
      {subscriptionOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn font-mono text-xs text-white">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-bold uppercase">
                  WORLD JOB ALERT DISPATCH SUBSCRIPTION
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Instant Career Notification Setup</h3>
              </div>

              <button
                onClick={() => setSubscriptionOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-950 border border-slate-800"
              >
                ✕
              </button>
            </div>

            {subscriptionSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Job Alert Channel Activated!</h4>
                <p className="text-xs text-slate-300 font-sans">
                  You will receive instant dispatches as soon as matching Airways or Marine openings are posted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAlertSubscribeSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Target Sector</label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setAlertSector('airways')}
                      className={`py-2 rounded-xl border text-[11px] font-bold transition-all ${
                        alertSector === 'airways'
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      ✈️ Airways
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlertSector('cruise_marine')}
                      className={`py-2 rounded-xl border text-[11px] font-bold transition-all ${
                        alertSector === 'cruise_marine'
                          ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      🚢 Marine
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlertSector('both')}
                      className={`py-2 rounded-xl border text-[11px] font-bold transition-all ${
                        alertSector === 'both'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      🌐 Both
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Notification Channel *</label>
                  <select
                    value={alertChannel}
                    onChange={(e: any) => setAlertChannel(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                  >
                    <option value="push_email">📧 Email & Browser Push Notification</option>
                    <option value="sms">📱 SMS Mobile Text Alert</option>
                    <option value="whatsapp">💬 WhatsApp Instant Career Alert</option>
                    <option value="satcom_vhf">📡 SatCom Satellite Broadcast</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Destination Email or Mobile Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. pilot.alerts@aviation.com or +91 98765 43210"
                    value={alertEmailPhone}
                    onChange={(e) => setAlertEmailPhone(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  <Bell className="w-4 h-4 fill-slate-950" />
                  <span>ACTIVATE WORLD SERVICE JOB ALERT</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADMISSION ENQUIRY MODAL */}
      {enquiryModalInst && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative font-mono text-xs">
            <button
              onClick={() => { setEnquiryModalInst(null); setEnquirySuccessRef(null); }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase flex items-center space-x-1 w-fit">
                <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                <span>DIRECT ADMISSION ENQUIRY PORTAL</span>
              </span>
              <h3 className="text-lg font-black text-white">{enquiryModalInst.name}</h3>
              <p className="text-slate-400 text-xs font-sans">{enquiryModalInst.cityLocation}, {enquiryModalInst.country}</p>
            </div>

            {enquirySuccessRef ? (
              <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-teal-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">ADMISSION ENQUIRY SUBMITTED!</h4>
                <p className="text-slate-300 font-sans text-xs">
                  Your direct enquiry reference ID <strong className="text-amber-400">{enquirySuccessRef}</strong> has been transmitted to the admissions deck at {enquiryModalInst.name}.
                </p>
                <button
                  onClick={() => { setEnquiryModalInst(null); setEnquirySuccessRef(null); }}
                  className="px-6 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold uppercase"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnquirySuccessRef(`ADM-${Date.now().toString().slice(-6)}`);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Select Course *</label>
                  <select
                    required
                    value={enquiryCourse}
                    onChange={(e) => setEnquiryCourse(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
                  >
                    <option value="">-- Select Certified Course --</option>
                    {enquiryModalInst.courses.map((c: any, idx: number) => (
                      <option key={idx} value={c.courseName}>{c.courseName} (${c.feeUSD} USD - {c.duration})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase text-[10px]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Contact Phone *</label>
                    <input
                      type="text"
                      required
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT ADMISSION ENQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
