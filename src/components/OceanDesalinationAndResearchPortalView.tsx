import React, { useState } from 'react';
import { CauveryDesalCaseStudyView } from './CauveryDesalCaseStudyView';
import {
  Droplets,
  FlaskConical,
  BookOpen,
  GraduationCap,
  Globe,
  Award,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sliders,
  Play,
  RotateCcw,
  FileText,
  FileCheck,
  Building2,
  Atom,
  TestTube2,
  Binary,
  Share2,
  BookMarked,
  ExternalLink,
  Zap,
  ShieldCheck,
  Wheat,
  Thermometer,
  Gauge,
  Beaker,
  Sun,
  Layers,
  BarChart3,
  Lightbulb,
  Info,
  Check,
  Send,
  RefreshCw,
  Wrench,
  DollarSign,
  TrendingUp,
  Landmark,
  Compass,
  Layers3,
  HardHat,
  Cpu,
  Coins,
  ShieldAlert,
  ArrowRight,
  Sparkle,
  Activity,
  Truck,
  MapPin,
  GitCompare,
  FileSpreadsheet,
  Printer,
  Microscope,
  Boxes,
  Route,
  ClipboardList,
  CheckSquare,
  Copy,
  PieChart,
  ArrowUpRight,
  Plus,
  Trash2,
  AlertTriangle,
  Bell,
  BellRing,
  Calendar,
  TrendingDown,
  Lock,
  Unlock,
  Percent,
  PiggyBank,
  ToggleLeft,
  ToggleRight,
  Newspaper,
  HelpCircle,
  History,
  Bookmark
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { hapticEngine } from '../utils/hapticUtils';

export interface ResearchInstitute {
  id: string;
  name: string;
  shortName: string;
  country: string;
  region: 'INDIA' | 'WORLDWIDE';
  city: string;
  established: number;
  leadScientists: string;
  keyFocus: string;
  trlLevel: string; // TRL 1 to 9
  studyTitle: string;
  progressPercentage: number;
  status: 'PILOT_TESTING' | 'COMMERCIAL_SCALE' | 'FIELD_DEMO' | 'PATENT_PENDING' | 'LAB_STAGE';
  summary: string;
  breakthrough: string;
  irrigationImpact: string;
  drinkingImpact: string;
  paperUrl?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  category: 'DESALINATION_RO' | 'AGRICULTURAL_IRRIGATION' | 'DRINKING_SOFT_WATER' | 'SOLAR_THERMAL' | 'MEMBRANE_NANOTECH';
  abstract: string;
  downloadsCount: number;
  citationsCount: number;
}

export interface LabExperimentState {
  rawWaterSalinityPpm: number;
  waterTemperatureC: number;
  feedFlowRateLph: number; // liters per hour
  operatingPressureBar: number;
  membraneType: 'POLYAMIDE_RO' | 'NANOFILTRATION' | 'ELECTRODIALYSIS' | 'GRAPHENE_MEMBRANE';
  dosingCalciumMgL: number;
  dosingSodiumMgL: number;
}

export interface PlantBuildProject {
  id: string;
  name: string;
  tier: 'PORTABLE' | 'MEDIUM' | 'LARGE_MEGA';
  capacityLitersPerDay: number;
  capacityM3PerDay: number;
  targetUse: string;
  footprintAreaM2: number;
  buildTimelineMonths: number;
  estCapexUsd: number;
  estOpexPerM3Usd: number;
  paybackPeriodYears: number;
  irrPercent: number;
  modernTechStack: string[];
  intakeTech: string;
  preTreatmentTech: string;
  membraneTech: string;
  energyRecoveryEfficiency: string;
  powerSource: string;
  capexBreakdown: {
    marineAndIntakePercent: number;
    preTreatmentPercent: number;
    highPressureRoPercent: number;
    energyRecoveryPercent: number;
    electricalAndScadaPercent: number;
    civilAndLandPercent: number;
    epcAndLicensingPercent: number;
  };
  summary: string;
  architecturalHighlights: string[];
}

const PLANT_BUILD_PROJECTS: PlantBuildProject[] = [
  {
    id: 'plant-portable-01',
    name: 'ISO 20ft Mobile Containerized Solar-SWRO Unit',
    tier: 'PORTABLE',
    capacityLitersPerDay: 25000,
    capacityM3PerDay: 25,
    targetUse: 'Remote Coastal Villages, Disaster Emergency Relief, Mobile Agricultural Van Units & Small Island Clinics',
    footprintAreaM2: 30,
    buildTimelineMonths: 0.75, // ~3 weeks
    estCapexUsd: 75000,
    estOpexPerM3Usd: 0.68,
    paybackPeriodYears: 2.2,
    irrPercent: 28.5,
    modernTechStack: [
      'Plug-and-Play ISO 20ft Reinforced Chassis',
      '18 kWp Foldable Bifacial Solar PV Array',
      'Micro Pressure Exchanger (PX) Energy Recovery Pump',
      'Dual-Pass Remineralization & UV Disinfection Reactor'
    ],
    intakeTech: 'Submersible Flexible Ocean Intake Strainer with Anti-Fouling Mesh',
    preTreatmentTech: 'Dual Media Sand + 5 Micron Polypropylene Cartridge Filters',
    membraneTech: 'High-Flux Sea Water Reverse Osmosis (SWRO) Spiral Wound Membranes',
    energyRecoveryEfficiency: '88% Mechanical Hydraulic Energy Recovery',
    powerSource: 'Off-Grid Direct Solar PV + 40 kWh LiFePO4 Battery Storage',
    capexBreakdown: {
      marineAndIntakePercent: 10,
      preTreatmentPercent: 15,
      highPressureRoPercent: 35,
      energyRecoveryPercent: 15,
      electricalAndScadaPercent: 15,
      civilAndLandPercent: 0,
      epcAndLicensingPercent: 10
    },
    summary: 'Self-contained, rapidly deployable water conversion station engineered for immediate emergency drinking water and small-plot soft water fertigation.',
    architecturalHighlights: [
      'Fits inside standard container transport trucks & military cargo aircraft.',
      'Zero civil foundation requirement — operates on leveled gravel or sand.',
      'Integrated GSM/Satellite IoT remote diagnostic telemetry.'
    ]
  },
  {
    id: 'plant-medium-02',
    name: 'Modular Skidded Coastal Municipal & Agri Desalination Hub',
    tier: 'MEDIUM',
    capacityLitersPerDay: 5000000,
    capacityM3PerDay: 5000,
    targetUse: 'Coastal Municipalities, Regional Agri-Clusters, Port Logistics Hubs & Eco-Resorts',
    footprintAreaM2: 2400,
    buildTimelineMonths: 8,
    estCapexUsd: 7800000,
    estOpexPerM3Usd: 0.48,
    paybackPeriodYears: 4.8,
    irrPercent: 19.2,
    modernTechStack: [
      'Modular Skidded SWRO Array with Rack Expansion Support',
      'Subsea Velocity Cap Intake to Minimize Marine Life Entrainment',
      'Automatic Backwash Ultrafiltration (UF) Ceramic Membranes',
      'Isobaric Rotary Pressure Exchanger (PX) Array (98% ERD Efficiency)',
      'Solar-Grid Hybrid Microgrid Controller'
    ],
    intakeTech: 'Subsea Velocity Cap Intake Tunnel with Low Entrance Velocity (<0.15 m/s)',
    preTreatmentTech: 'Automatic Screen Pre-strainers + Ceramic Ultrafiltration Skid',
    membraneTech: 'High Rejection Polyamide SWRO with Boron-Specific Pass',
    energyRecoveryEfficiency: '98% Hydraulic Energy Recovery Efficiency',
    powerSource: 'Grid + 2.5 MW Coastal Solar Photovoltaic Roof Integration',
    capexBreakdown: {
      marineAndIntakePercent: 18,
      preTreatmentPercent: 16,
      highPressureRoPercent: 28,
      energyRecoveryPercent: 12,
      electricalAndScadaPercent: 12,
      civilAndLandPercent: 7,
      epcAndLicensingPercent: 7
    },
    summary: 'Optimal medium-capacity municipal and agricultural plant designed with skidded modularity for rapid capacity expansion and low lifecycle operating costs.',
    architecturalHighlights: [
      'Acoustic sound-insulated pump enclosures reducing plant noise to <65 dBA.',
      'Corrosion-resistant Duplex 2205 stainless steel high-pressure manifolds.',
      'Sub-sea brine diffuser nozzle array engineered for rapid 1:30 dilution.'
    ]
  },
  {
    id: 'plant-large-03',
    name: 'Coastal Megacity & Regional Basin SWRO Mega-Plant with ZLD Brine Mining',
    tier: 'LARGE_MEGA',
    capacityLitersPerDay: 200000000,
    capacityM3PerDay: 200000,
    targetUse: 'Megacity Municipal Water Grids, Regional Agricultural Basins & Heavy Coastal Industrial Estates',
    footprintAreaM2: 45000,
    buildTimelineMonths: 24,
    estCapexUsd: 220000000,
    estOpexPerM3Usd: 0.35,
    paybackPeriodYears: 6.5,
    irrPercent: 16.4,
    modernTechStack: [
      'Deep Offshore Marine Tunnel Intake with Sub-bottom Infiltration System',
      'Multi-Stage Dissolved Air Flotation (DAF) + Dual-Media Pre-treatment',
      'Graphene-Polyamide Nanocomposite Ultra-High Flux SWRO Membranes',
      'Isobaric Energy Recovery Device (ERD) Mega-Banks',
      'Zero Liquid Discharge (ZLD) Brine Mineral Mining (Lithium & Mg Extraction)',
      'Offshore Wind & Nuclear Waste-Heat Co-Generation Coupling'
    ],
    intakeTech: '3.5 km Sub-sea Tunnel Intake with Marine Sanctuary Intake Protection',
    preTreatmentTech: 'Coagulation + DAF + Dual Media Filtration + Fine Cartridges',
    membraneTech: 'Graphene Nanocomposite SWRO + Nanofiltration Selective Pass',
    energyRecoveryEfficiency: '98.5% Isobaric Pressure Transfer Efficiency',
    powerSource: 'High-Voltage Utility Grid + Direct Offshore Wind & Nuclear Steam Coupling',
    capexBreakdown: {
      marineAndIntakePercent: 22,
      preTreatmentPercent: 15,
      highPressureRoPercent: 26,
      energyRecoveryPercent: 10,
      electricalAndScadaPercent: 10,
      civilAndLandPercent: 9,
      epcAndLicensingPercent: 8
    },
    summary: 'State-of-the-art mega utility infrastructure supplying soft water to millions while mining valuable minerals from concentrated ocean brine.',
    architecturalHighlights: [
      'Sub-surface intake tunnels eliminating coastal visual impact.',
      'Valuable Lithium, Magnesium, and Industrial Salt recovery from brine stream.',
      'Fully autonomous SCADA AI control with digital twin predictive maintenance.'
    ]
  }
];

const INDIAN_INSTITUTES: ResearchInstitute[] = [
  {
    id: 'inst-csmcri',
    name: 'CSIR - Central Salt & Marine Chemicals Research Institute',
    shortName: 'CSIR-CSMCRI',
    country: 'India',
    region: 'INDIA',
    city: 'Bhavnagar, Gujarat',
    established: 1954,
    leadScientists: 'Dr. Kannan Srinivasan, Dr. A. Bhattacharya',
    keyFocus: 'Hollow Fiber RO Membranes, Solar Mobile Desalination & Coastal Saline Soil Soft Water',
    trlLevel: 'TRL 8 (Commercial Field Deployments)',
    studyTitle: 'Solar-Powered Mobile Desalination Van for Coastal Agricultural Soft Water Irrigation',
    progressPercentage: 94,
    status: 'COMMERCIAL_SCALE',
    summary: 'Pioneered hollow-fiber polyamide membranes capable of converting 38,000 ppm seawater into <150 ppm soft drinking water and low-SAR agricultural irrigation water for mustard & cotton crops.',
    breakthrough: '99.7% Na+ rejection at 55 bar pressure with 3.1 kWh/m³ energy footprint.',
    irrigationImpact: 'Enables 1,200 hectares of saline coastal land in Saurashtra to cultivate high-yield wheat using desalinated soft water.',
    drinkingImpact: 'Deploys 45 mobile emergency drinking water vans across cyclone-affected coastal villages in Gujarat & Odisha.'
  },
  {
    id: 'inst-niot',
    name: 'National Institute of Ocean Technology',
    shortName: 'NIOT Chennai',
    country: 'India',
    region: 'INDIA',
    city: 'Chennai, Tamil Nadu',
    established: 1993,
    leadScientists: 'Dr. G. A. Ramadass, Dr. Purnima Jalihal',
    keyFocus: 'Low-Temperature Thermal Desalination (LTTD) & Deep Ocean Cold Water Condensation',
    trlLevel: 'TRL 9 (Fully Operational Island Plants)',
    studyTitle: '100,000 Liters/Day Offshore Self-Powered LTTD Desalination in Lakshadweep Archipelago',
    progressPercentage: 98,
    status: 'COMMERCIAL_SCALE',
    summary: 'Utilizes temperature gradient between surface ocean water (28°C) and deep ocean water at 600m depth (12°C) to flash-evacuate ocean water into ultra-pure soft water without chemical additives.',
    breakthrough: 'Zero-chemical soft water output with zero brine chemical toxicity.',
    irrigationImpact: 'Supplies pristine mineral-balanced soft water for hydroponic island agriculture in Kavaratti & Agatti.',
    drinkingImpact: 'Provides 100% of municipal drinking water needs for Lakshadweep island residents.'
  },
  {
    id: 'inst-barc',
    name: 'Bhabha Atomic Research Centre - Desalination Division',
    shortName: 'BARC Mumbai',
    country: 'India',
    region: 'INDIA',
    city: 'Trombay, Mumbai, Maharashtra',
    established: 1957,
    leadScientists: 'Dr. P. K. Tewari, Dr. S. S. V. Ramana',
    keyFocus: 'Nuclear Thermal Hybrid Multi-Stage Flash (MSF) & Thin-Film RO Duplex',
    trlLevel: 'TRL 9 (Kudankulam Nuclear Desalination Plant)',
    studyTitle: 'Hybrid Nuclear Steam & Membrane Desalination for Coastal Megacities & Agri Basins',
    progressPercentage: 96,
    status: 'COMMERCIAL_SCALE',
    summary: 'Integrates low-pressure turbine waste steam with high-efficiency seawater reverse osmosis (SWRO) to generate 6.3 Million Liters/Day of potable drinking water.',
    breakthrough: 'Specific energy consumption reduced to 2.4 kWh/m³ via multi-effect thermal coupling.',
    irrigationImpact: 'Repurposes thermal effluent for agricultural greenhouse irrigation in Ramanathapuram district.',
    drinkingImpact: 'Supplies high-purity soft water to nuclear power plant townships and nearby rural communities.'
  },
  {
    id: 'inst-iitm',
    name: 'Indian Institute of Technology Madras - Water Desalination Center',
    shortName: 'IIT Madras',
    country: 'India',
    region: 'INDIA',
    city: 'Chennai, Tamil Nadu',
    established: 1959,
    leadScientists: 'Prof. T. Pradeep, Prof. Ligy Philip',
    keyFocus: 'Capacitive Deionization (CDI), Graphene Oxide Nanofiltration & Heavy Metal Softening',
    trlLevel: 'TRL 7 (Pilot Field Trials)',
    studyTitle: 'Solar-Driven Electrodialysis Reversal (EDR) for Low-Energy Agricultural Water Softening',
    progressPercentage: 88,
    status: 'PILOT_TESTING',
    summary: 'Developing carbon nanotube and graphene membranes that selectively remove toxic divalent ions (sulfates, magnesium, sodium) while retaining beneficial micronutrients for crops.',
    breakthrough: 'Selective ion removal reducing SAR from 18 to 1.8 at under 1.2 kWh/m³ energy usage.',
    irrigationImpact: 'Prevents soil sodicity and salinization in Paddy and Sugarcane fields across coastal Andhra Pradesh.',
    drinkingImpact: 'Affordable point-of-use solar water softening units for fluoride & salt affected rural habitations.'
  },
  {
    id: 'inst-iitb',
    name: 'IIT Bombay - Environmental Science & Engineering Department',
    shortName: 'IIT Bombay',
    country: 'India',
    region: 'INDIA',
    city: 'Powai, Mumbai, Maharashtra',
    established: 1958,
    leadScientists: 'Prof. Sanjeev Chaudhari, Prof. R. D. Gudi',
    keyFocus: 'Forward Osmosis (FO) & Bio-Mimetic Aquaporin Softening Filters',
    trlLevel: 'TRL 6 (Laboratory Prototype Verification)',
    studyTitle: 'Aquaporin-Assisted Ocean Water Conversion for Hydroponic & Aeroponic Farming',
    progressPercentage: 82,
    status: 'LAB_STAGE',
    summary: 'Simulating natural plant cell aquaporin channels to achieve 99.9% salt separation using low-osmotic draw solutions derived from agricultural fertilizers.',
    breakthrough: 'Direct integration of fertilizer draw solution allowing direct fertigation without intermediate desalination energy.',
    irrigationImpact: 'Allows direct use of ocean water in closed-loop greenhouse fertigation systems.',
    drinkingImpact: 'Compact emergency life-raft water pouch conversion kits for seafarers.'
  }
];

const WORLDWIDE_INSTITUTES: ResearchInstitute[] = [
  {
    id: 'inst-kaust',
    name: 'KAUST - Water Desalination and Reuse Center',
    shortName: 'KAUST (Saudi Arabia)',
    country: 'Saudi Arabia',
    region: 'WORLDWIDE',
    city: 'Thuwal, Makkah Province',
    established: 2009,
    leadScientists: 'Prof. Hans Vrouwenvelder, Prof. Noreddine Ghaffour',
    keyFocus: 'Thermodynamic Limit RO, Photothermal Desalination & Red Sea Brine Mining',
    trlLevel: 'TRL 8 (Commercial Pilot Units)',
    studyTitle: 'Triple-Hybrid RO-MED-Adsorption Desalination for Zero Liquid Discharge (ZLD) Agriculture',
    progressPercentage: 92,
    status: 'PILOT_TESTING',
    summary: 'Combines seawater reverse osmosis with adsorption heat pumps to double water recovery rates to 75% while extracting high-purity lithium and magnesium salts from ocean brine.',
    breakthrough: 'Achieved 1.8 kWh/m³ energy consumption using waste heat from coastal solar arrays.',
    irrigationImpact: 'Powers desert seawater farming initiatives growing halophytes, tomatoes, and jojoba in arid coastal regions.',
    drinkingImpact: 'Generates ultra-pure soft water meeting WHO drinking standards for NEOM and Red Sea coastal cities.'
  },
  {
    id: 'inst-mit',
    name: 'MIT Water Innovation Lab - Department of Mechanical Engineering',
    shortName: 'MIT (USA)',
    country: 'USA',
    region: 'WORLDWIDE',
    city: 'Cambridge, Massachusetts',
    established: 1861,
    leadScientists: 'Prof. Xuanhe Zhao, Dr. Jongyoon Han',
    keyFocus: 'Portable Ion Concentration Polarization (ICP), Electrodialysis & Photovoltaic RO',
    trlLevel: 'TRL 8 (Portable Field Units)',
    studyTitle: 'Suitcase-Sized Solar ICP Seawater Desalinator for Remote Farming & Disaster Relief',
    progressPercentage: 90,
    status: 'FIELD_DEMO',
    summary: 'Eliminates high-pressure pumps and replacement filter membranes by using electrical fields to repel positive and negative salt ions from water channels.',
    breakthrough: 'Maintenance-free push-button seawater to drinking soft water conversion at 20 liters/hour.',
    irrigationImpact: 'Enables smallholder coastal farmers in island nations to irrigate high-value vegetable plots.',
    drinkingImpact: 'Instant deployment for naval emergency crews and coastal humanitarian relief.'
  },
  {
    id: 'inst-technion',
    name: 'Technion - Israel Institute of Technology & Grand Water Research Institute',
    shortName: 'Technion (Israel)',
    country: 'Israel',
    region: 'WORLDWIDE',
    city: 'Haifa',
    established: 1912,
    leadScientists: 'Prof. Ori Lahav, Prof. Raphael Semiat',
    keyFocus: 'SWRO Softening, Boron Removal & Agricultural SAR Mineral Remineralization',
    trlLevel: 'TRL 9 (National Water Grid Scale)',
    studyTitle: 'Post-Treatment Remineralization Protocol for Desalinated Seawater in Saline Agriculture',
    progressPercentage: 99,
    status: 'COMMERCIAL_SCALE',
    summary: 'Developed the gold standard for adding precise ratios of Ca²⁺, Mg²⁺, and HCO₃⁻ to desalinated ocean water to prevent plant root toxicity and soil structure breakdown.',
    breakthrough: 'Optimal SAR index (< 2.0) with boron concentration reduced below 0.3 mg/L.',
    irrigationImpact: 'Provides 85% of Israel agricultural irrigation water, transforming Negev desert into fertile produce exporters.',
    drinkingImpact: 'Supplies 80% of national domestic drinking water grid from 5 mega SWRO facilities (Sorek, Hadera, Ashkelon).'
  },
  {
    id: 'inst-kaist',
    name: 'KAIST & KIOST Ocean Energy and Membrane Center',
    shortName: 'KAIST (South Korea)',
    country: 'South Korea',
    region: 'WORLDWIDE',
    city: 'Daejeon & Busan',
    established: 1971,
    leadScientists: 'Dr. Seung-Hyun Kim, Prof. Ju-Yong Kim',
    keyFocus: 'Wave Energy Powered Offshore Desalination & Electrodialysis Reversal',
    trlLevel: 'TRL 7 (Offshore Floating Barge Demonstrator)',
    studyTitle: 'Wave-Driven Hydraulic Pump Offshore Desalination Vessel for Coastal Agricultural Supply',
    progressPercentage: 86,
    status: 'FIELD_DEMO',
    summary: 'Harnesses ocean wave mechanical energy directly to drive high-pressure RO pumps without converting to electricity first, drastically cutting capital costs.',
    breakthrough: 'Direct mechanical pressure transfer producing 500 m³/day soft water at sea.',
    irrigationImpact: 'Delivers floating water barge irrigation to coastal rice paddies during seasonal drought periods.',
    drinkingImpact: 'Supplies emergency drinking soft water directly to island communities without onshore grid connection.'
  },
  {
    id: 'inst-tudelft',
    name: 'TU Delft & Wageningen University Research - Water & AgTech Consortium',
    shortName: 'TU Delft (Netherlands)',
    country: 'Netherlands',
    region: 'WORLDWIDE',
    city: 'Delft & Wageningen',
    established: 1842,
    leadScientists: 'Prof. Luewton Lemos, Dr. Katarzyna Janusz',
    keyFocus: 'Seawater Greenhouses, Controlled Environment Agriculture & Closed-Loop Cycle',
    trlLevel: 'TRL 9 (Commercial Seawater Greenhouses)',
    studyTitle: 'Integrative Seawater Greenhouse Co-Generation for Soft Water Crops in Coastal Arid Zones',
    progressPercentage: 95,
    status: 'COMMERCIAL_SCALE',
    summary: 'Uses cold ocean water to cool humid greenhouse air, condensing pure soft water on glass walls to irrigate crops inside while evaporating brine for solar salt harvesting.',
    breakthrough: '100% solar and seawater driven agricultural system producing 40 kg tomatoes/m² per year.',
    irrigationImpact: 'Operates commercial seawater greenhouses in Australia, Oman, and Cape Verde.',
    drinkingImpact: 'Produces high-purity condensed potable water as a co-product of greenhouse cooling.'
  }
];

const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-101',
    title: 'Seawater Desalination for Agricultural Irrigation: Soil Salinity Dynamics, SAR Indices & Crop Yield Optimizations',
    authors: 'Dr. Kannan Srinivasan, Prof. Ori Lahav, Dr. Purnima Jalihal',
    journal: 'Journal of Membrane Science & Desalination Research (CSIR-CSMCRI / Technion)',
    year: 2025,
    doi: '10.1016/j.memsci.2025.109842',
    category: 'AGRICULTURAL_IRRIGATION',
    abstract: 'This comprehensive analysis evaluates the impact of reverse osmosis (RO) desalinated ocean water on clay-loam and sandy soils. It establishes optimal remineralization formulas (Calcium 40 mg/L, Magnesium 10 mg/L, Bicarbonate 70 mg/L) to prevent sodicity while maintaining crop yield for Wheat, Paddy, and Citrus.',
    downloadsCount: 4210,
    citationsCount: 184
  },
  {
    id: 'paper-102',
    title: 'Low-Temperature Thermal Desalination (LTTD) in Island Ecosystems: Zero-Chemical Soft Water Production for Drinking & Hydroponics',
    authors: 'Dr. G. A. Ramadass, Dr. P. K. Tewari',
    journal: 'Indian Journal of Geo-Marine Sciences & Ocean Technology (NIOT & BARC)',
    year: 2024,
    doi: '10.56042/ijms.v53i4.77412',
    category: 'DRINKING_SOFT_WATER',
    abstract: 'Presents 10 years of operational data from LTTD plants in Lakshadweep. By leveraging deep ocean water at 12°C to condense flash-evaporated surface water at 28°C, the system yields soft water with TDS < 50 ppm, subsequently remineralized for 100% WHO drinking safety.',
    downloadsCount: 3890,
    citationsCount: 142
  },
  {
    id: 'paper-103',
    title: 'Energy Minimization in Seawater Reverse Osmosis (SWRO): Thermodynamic Bounds, Isobaric Energy Recovery Devices & Solar Coupling',
    authors: 'Prof. Hans Vrouwenvelder, Prof. Xuanhe Zhao, Prof. T. Pradeep',
    journal: 'Nature Water & Sustainable Energy Review (KAUST / MIT / IIT Madras)',
    year: 2026,
    doi: '10.1038/s44221-026-00412-x',
    category: 'DESALINATION_RO',
    abstract: 'Investigates the thermodynamic theoretical lower limit for seawater desalination (1.06 kWh/m³ at 50% recovery). Demonstrates high-efficiency isobaric energy recovery units operating at 98.2% mechanical transfer efficiency coupled with high-flux graphene oxide nanocomposite membranes.',
    downloadsCount: 5620,
    citationsCount: 230
  },
  {
    id: 'paper-104',
    title: 'Capacitive Deionization (CDI) and Electrodialysis Reversal for Selective Agriculture Ion Softening',
    authors: 'Prof. Ligy Philip, Dr. Seung-Hyun Kim',
    journal: 'Water Research & Environmental Biotechnology (IIT Madras / KAIST)',
    year: 2025,
    doi: '10.1016/j.watres.2025.120541',
    category: 'MEMBRANE_NANOTECH',
    abstract: 'Analyzes electro-membrane ion separation selectivity. By applying pulsed electric fields, divalent calcium and magnesium ions are preserved for plant nutrition while monovalent sodium and chloride ions are selectively rejected, reducing electrical power by 42%.',
    downloadsCount: 2980,
    citationsCount: 96
  },
  {
    id: 'paper-105',
    title: 'Seawater Greenhouse Co-Generation: Integrating Coastal Oceanography with Controlled Environment Agriculture',
    authors: 'Prof. Luewton Lemos, Dr. A. Bhattacharya',
    journal: 'Agricultural Water Management & Biosystems Engineering (TU Delft / CSIR)',
    year: 2024,
    doi: '10.1016/j.agwat.2024.108422',
    category: 'SOLAR_THERMAL',
    abstract: 'Demonstrates a zero-freshwater greenhouse system powered entirely by seawater evaporation and solar condensation. Produced 420 tonnes of fresh produce per hectare annually with zero municipal groundwater extraction.',
    downloadsCount: 3410,
    citationsCount: 115
  }
];

const BRINE_RECYCLING_TECHNIQUES = [
  {
    id: 'MINERAL_MINING',
    name: 'Battery Lithium & Magnesium Mineral Mining',
    category: 'Resource Extraction & Revenue Generation',
    badge: 'High Value Commodity',
    waterRecoveryImpact: '+15% Extra Soft Water',
    salinityHandled: '70,000 - 120,000 ppm',
    summary: 'Extracts battery-grade Lithium Carbonate (Li₂CO₃) for EV energy storage and high-purity Magnesium Hydroxide (Mg(OH)₂) for agricultural soil conditioning and flame retardants from concentrated ocean brine.',
    keyBenefits: [
      'Generates up to $1.20 USD revenue per m³ of brine processed.',
      'Reduces heavy metal concentration in final brine discharge by 95%.',
      'Provides domestic supply chain resilience for critical battery minerals.'
    ],
    techStack: 'Selective Ion-Exchange Nanocomposite Resins + Chemical Precipitation Tanks'
  },
  {
    id: 'ZLD_CRYSTALLIZER',
    name: 'Zero Liquid Discharge (ZLD) Multi-Effect Crystallizer',
    category: 'Complete Elimination of Ocean Discharge',
    badge: '100% Water Recovery',
    waterRecoveryImpact: '+25% Max Soft Water',
    salinityHandled: '100,000 - 250,000 ppm',
    summary: 'Converts 100% of liquid ocean brine into pure distilled water distillate and dry crystallized sodium chloride salt cake, eliminating ocean wastewater discharge completely.',
    keyBenefits: [
      'Achieves 99.8% total water recovery from intake seawater.',
      'Zero liquid waste entering fragile coastal marine sanctuaries.',
      'Produces industrial-grade dry NaCl salt for chemical manufacturing.'
    ],
    techStack: 'Mechanical Vapor Recompression (MVR) + Steam Multi-Effect Crystallizers'
  },
  {
    id: 'ELECTRODIALYSIS_EDR',
    name: 'Electrodialysis Reversal (EDR) Brine Concentration',
    category: 'Membrane-Based Brine Softening',
    badge: 'Energy Efficient',
    waterRecoveryImpact: '+18% Extra Permeate',
    salinityHandled: '60,000 - 150,000 ppm',
    summary: 'Uses alternating cation and anion exchange membranes driven by an electric potential gradient to split brine into an ultra-concentrated mineral stream and a softened permeate stream.',
    keyBenefits: [
      'Requires 35% less energy than thermal evaporation crystallizers.',
      'Self-cleaning polarity reversal prevents membrane mineral scaling.',
      'Operates at ambient temperature without thermal heat loss.'
    ],
    techStack: 'Ion-Exchange Membrane Stacks + Reversible Direct Current (DC) Electrodes'
  },
  {
    id: 'CHLOR_ALKALI_SYNTHESIS',
    name: 'On-Site Chlor-Alkali Chemical Synthesis (NaOCl & HCl)',
    category: 'In-Plant Chemical Self-Sufficiency',
    badge: 'Zero Chemical Logistics',
    waterRecoveryImpact: 'In-situ Disinfection',
    salinityHandled: '65,000 - 90,000 ppm',
    summary: 'Directly electrolyzes concentrated sodium chloride brine on-site to synthesize 12% Sodium Hypochlorite (disinfectant) and Hydrochloric Acid (membrane cleaning agent).',
    keyBenefits: [
      'Eliminates external chemical purchasing and hazardous tanker transport.',
      'Saves $0.08 USD per m³ in plant operating maintenance expense.',
      'Provides continuous automated dosing for pre-treatment disinfection.'
    ],
    techStack: 'Bipolar Membrane Electrolysis Cells + Gas Absorption Towers'
  },
  {
    id: 'SALINITY_POWER_RED',
    name: 'Reverse Electrodialysis (RED) Salinity Gradient Energy Generation',
    category: 'Renewable Osmotic Power Harnessing',
    badge: 'Clean Energy Co-Gen',
    waterRecoveryImpact: 'Clean Power Output',
    salinityHandled: '70,000 ppm (Brine) vs 500 ppm (Treated Water)',
    summary: 'Harnesses the free energy mixing potential between concentrated ocean brine and treated municipal wastewater across ion-selective membranes to generate clean electricity.',
    keyBenefits: [
      'Generates 0.8 to 1.4 W per m² of membrane surface area.',
      'Offsets plant high-pressure RO pump electricity consumption.',
      'Operates 24/7 independent of solar irradiance or wind weather.'
    ],
    techStack: 'RED Stack Membrane Arrays + Redox Hydro-Electrode Loops'
  },
  {
    id: 'HALOPHYTE_FARMING',
    name: 'Agricultural Halophyte (Salicornia) & Microalgae Irrigation',
    category: 'Bio-Agricultural Brine Utilization',
    badge: 'Green Agri-Ecology',
    waterRecoveryImpact: '100% Beneficial Reuse',
    salinityHandled: '45,000 - 75,000 ppm',
    summary: 'Channels diluted brine concentrate into coastal salt-marsh agricultural farms cultivating Salicornia (sea asparagus biofuel oilseed) and Dunaliella salina microalgae.',
    keyBenefits: [
      'Produces high-protein aquaculture feed and Beta-Carotene antioxidants.',
      'Turns waste brine into commercial biofuel biomass and gourmet crops.',
      'Creates coastal wetland habitats for migratory marine birds.'
    ],
    techStack: 'Saline Soil Drip Irrigation + Raceway Microalgae Cultivation Ponds'
  }
];

export interface PlantTechTypeData {
  id: 'SWRO' | 'BWRO' | 'MED' | 'MSF' | 'EDR' | 'SOLAR_THERMAL_MD' | 'CONTAINER_SKID' | 'BARGE_OFFSHORE' | 'ZLD_HYBRID';
  name: string;
  category: string;
  badge: string;
  baseCapexPerM3DayUsd: number;
  powerIntensityKwhM3: number;
  footprintM2Per10kM3: number;
  typicalRecoveryPct: number;
  lifespanYears: number;
  idealApplication: string;
  description: string;
  capexBreakdownPct: {
    marineAndIntake: number;
    preTreatment: number;
    coreSeparation: number;
    energyRecovery: number;
    electricalAndScada: number;
    civilAndLand: number;
    epcMargin: number;
  };
}

export const ALL_PLANT_TYPES: PlantTechTypeData[] = [
  {
    id: 'SWRO',
    name: 'Seawater Reverse Osmosis (SWRO)',
    category: 'High-Pressure Membrane Filtration',
    badge: 'Global Industry Standard (65% Market)',
    baseCapexPerM3DayUsd: 3800,
    powerIntensityKwhM3: 3.2,
    footprintM2Per10kM3: 4200,
    typicalRecoveryPct: 45,
    lifespanYears: 30,
    idealApplication: 'Coastal cities, municipal potable water, agricultural soft water supply',
    description: 'High-pressure semi-permeable polyamide membrane separation operating at 55–70 bar with isobaric rotary energy recovery devices.',
    capexBreakdownPct: { marineAndIntake: 22, preTreatment: 18, coreSeparation: 25, energyRecovery: 12, electricalAndScada: 10, civilAndLand: 8, epcMargin: 5 }
  },
  {
    id: 'BWRO',
    name: 'Brackish Water Reverse Osmosis (BWRO)',
    category: 'Medium-Pressure Aquifer Desalination',
    badge: 'Low Energy Cost ($0.35/m³)',
    baseCapexPerM3DayUsd: 1500,
    powerIntensityKwhM3: 1.1,
    footprintM2Per10kM3: 2100,
    typicalRecoveryPct: 75,
    lifespanYears: 25,
    idealApplication: 'Inland saline groundwater aquifers, river deltas, industrial water recycling',
    description: 'Medium-pressure membrane separation (12–25 bar) for low-to-moderate salinity brackish groundwater (2,000–10,000 ppm).',
    capexBreakdownPct: { marineAndIntake: 8, preTreatment: 22, coreSeparation: 35, energyRecovery: 5, electricalAndScada: 12, civilAndLand: 10, epcMargin: 8 }
  },
  {
    id: 'MED',
    name: 'Multi-Effect Distillation (MED)',
    category: 'Thermal Low-Temperature Evaporation',
    badge: 'High Reliability & Low Scaling',
    baseCapexPerM3DayUsd: 5200,
    powerIntensityKwhM3: 6.5,
    footprintM2Per10kM3: 6500,
    typicalRecoveryPct: 35,
    lifespanYears: 35,
    idealApplication: 'Coastal industrial power plants, refineries, high-salinity Red Sea & Gulf waters',
    description: 'Evaporates seawater across multiple consecutive low-pressure vessel effects using low-grade waste steam (65°C–70°C).',
    capexBreakdownPct: { marineAndIntake: 18, preTreatment: 10, coreSeparation: 42, energyRecovery: 8, electricalAndScada: 10, civilAndLand: 8, epcMargin: 4 }
  },
  {
    id: 'MSF',
    name: 'Multi-Stage Flash Distillation (MSF)',
    category: 'High-Temperature Thermal Evaporation',
    badge: 'Mega-Scale Heavy Thermal',
    baseCapexPerM3DayUsd: 6200,
    powerIntensityKwhM3: 11.2,
    footprintM2Per10kM3: 9800,
    typicalRecoveryPct: 25,
    lifespanYears: 40,
    idealApplication: 'Middle East mega-complexes paired with heavy oil/gas steam turbine power plants',
    description: 'Flashes heated seawater into steam across 15–25 vacuum chambers at 90°C–110°C, producing ultra-pure distillate.',
    capexBreakdownPct: { marineAndIntake: 20, preTreatment: 8, coreSeparation: 45, energyRecovery: 5, electricalAndScada: 10, civilAndLand: 8, epcMargin: 4 }
  },
  {
    id: 'EDR',
    name: 'Electrodialysis Reversal (EDR)',
    category: 'Electro-Membrane Ion Transfer',
    badge: 'High Recovery Silica Tolerant',
    baseCapexPerM3DayUsd: 2600,
    powerIntensityKwhM3: 2.4,
    footprintM2Per10kM3: 3100,
    typicalRecoveryPct: 85,
    lifespanYears: 25,
    idealApplication: 'High-silica brackish water, agricultural drainage recycling, mine water reuse',
    description: 'Direct electric current (DC) moves sodium and chloride ions across selective anion/cation exchange membranes with automated polarity reversal.',
    capexBreakdownPct: { marineAndIntake: 10, preTreatment: 20, coreSeparation: 38, energyRecovery: 4, electricalAndScada: 14, civilAndLand: 8, epcMargin: 6 }
  },
  {
    id: 'SOLAR_THERMAL_MD',
    name: 'Solar Thermal & Membrane Distillation (MD)',
    category: 'Zero-Carbon Solar Evaporation',
    badge: '100% Off-Grid Carbon Neutral',
    baseCapexPerM3DayUsd: 3500,
    powerIntensityKwhM3: 0.5,
    footprintM2Per10kM3: 12000,
    typicalRecoveryPct: 60,
    lifespanYears: 20,
    idealApplication: 'Remote island communities, off-grid eco-resorts, arid desert coastal settlements',
    description: 'Concentrated solar collectors heat seawater to drive hydrophobic microporous membrane vapor distillation without grid power.',
    capexBreakdownPct: { marineAndIntake: 12, preTreatment: 12, coreSeparation: 30, energyRecovery: 25, electricalAndScada: 8, civilAndLand: 8, epcMargin: 5 }
  },
  {
    id: 'CONTAINER_SKID',
    name: 'Mobile Containerized ISO Skid Plant',
    category: 'Rapid-Deploy Skidded SWRO',
    badge: 'Fast Setup (3 Weeks)',
    baseCapexPerM3DayUsd: 2800,
    powerIntensityKwhM3: 3.6,
    footprintM2Per10kM3: 1500,
    typicalRecoveryPct: 40,
    lifespanYears: 15,
    idealApplication: 'Disaster emergency relief, remote construction camps, military bases, seasonal resorts',
    description: 'Pre-commissioned plug-and-play SWRO plant enclosed inside standard 40ft high-cube ISO shipping containers.',
    capexBreakdownPct: { marineAndIntake: 15, preTreatment: 22, coreSeparation: 38, energyRecovery: 10, electricalAndScada: 8, civilAndLand: 2, epcMargin: 5 }
  },
  {
    id: 'BARGE_OFFSHORE',
    name: 'Floating Offshore Barge Desalination Unit',
    category: 'Marine Vessel Anchored Plant',
    badge: 'Mobile Floating Asset',
    baseCapexPerM3DayUsd: 7500,
    powerIntensityKwhM3: 4.1,
    footprintM2Per10kM3: 3500,
    typicalRecoveryPct: 45,
    lifespanYears: 30,
    idealApplication: 'Archipelagos, island nations, coastal cities with expensive land rights, drought emergency response',
    description: 'Full-scale SWRO desalination system mounted on an offshore double-hulled barge equipped with deep sub-surface marine intake.',
    capexBreakdownPct: { marineAndIntake: 30, preTreatment: 15, coreSeparation: 25, energyRecovery: 8, electricalAndScada: 10, civilAndLand: 5, epcMargin: 7 }
  },
  {
    id: 'ZLD_HYBRID',
    name: 'Zero Liquid Discharge (ZLD) Hybrid Thermal-RO',
    category: 'Complete Zero Ocean Wastage Plant',
    badge: '100% Water Yield + Salt Mining',
    baseCapexPerM3DayUsd: 8900,
    powerIntensityKwhM3: 7.8,
    footprintM2Per10kM3: 8200,
    typicalRecoveryPct: 98,
    lifespanYears: 30,
    idealApplication: 'Environmentally sensitive marine sanctuaries, zero-discharge industrial chemical hubs',
    description: 'Combines primary SWRO with secondary EDR concentration and MVR steam crystallizers to convert 98%+ of seawater into fresh water and dry salt.',
    capexBreakdownPct: { marineAndIntake: 15, preTreatment: 15, coreSeparation: 30, energyRecovery: 18, electricalAndScada: 10, civilAndLand: 7, epcMargin: 5 }
  }
];

export interface GroundConditionData {
  id: string;
  name: string;
  category: string;
  severityBadge: string;
  severityColor: string;
  bearingCapacityRawKpa: number;
  bearingCapacityTargetKpa: number;
  settlementUnadjustedMm: number;
  settlementAdjustedMm: number;
  capexPremiumPct: number;
  riskSummary: string;
  engineeringSolutions: {
    title: string;
    description: string;
    techStack: string;
    standards: string;
  }[];
  mitigationImpact: string;
}

export const UNSUITABLE_GROUND_CONDITIONS: GroundConditionData[] = [
  {
    id: 'LIQUEFACTION_SAND',
    name: 'Coastal Liquefiable Saturated Fine Sand & Silt',
    category: 'Seismic Liquefaction Hazard',
    severityBadge: 'High Risk (PGA > 0.35g)',
    severityColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    bearingCapacityRawKpa: 35,
    bearingCapacityTargetKpa: 350,
    settlementUnadjustedMm: 420,
    settlementAdjustedMm: 8,
    capexPremiumPct: 22,
    riskSummary: 'Marine tidal saturation combined with loose fine sand leads to complete loss of shear strength during ground tremors, causing severe differential settling of heavy SWRO membrane racks and high-pressure pumps.',
    engineeringSolutions: [
      {
        title: 'Vibro-Replacement Stone Columns & Soil Densification',
        description: 'Constructs 1.2m diameter coarse stone columns in a 2.5m triangular grid to 18m depth to dissipate pore water pressure and increase soil friction angle to 38°.',
        techStack: 'Vibroflot Heavy Rig + Granular Crushed Basalt Aggregate',
        standards: 'ASTM D1586 SPT Standard Penetration Test (Target N > 30)'
      },
      {
        title: 'Subsea Jet Grouting Impervious Cutoff Curtain Walls',
        description: 'High-pressure triple-fluid cement grouting creates continuous 1.5m overlapping subterranean cutoff walls around deep pump basements.',
        techStack: 'Triple-Fluid Jet Grouting Rig (Water/Air/Cement slurry at 400 bar)',
        standards: 'EN 12716 Execution of Special Geotechnical Work — Jet Grouting'
      },
      {
        title: 'Geotextile-Reinforced Floating Raft Foundation',
        description: 'Cast-in-place 1.5m thick Grade 50 reinforced concrete raft slab integrated with elastomeric isolators to distribute structural dead load.',
        techStack: 'High-Modulus Polypropylene Biaxial Geogrids + Fiber-Reinforced Concrete',
        standards: 'Eurocode 7 / ACI 318 Structural Mat Foundation Code'
      }
    ],
    mitigationImpact: 'Eliminates seismic liquefaction risk up to 8.5 Richter magnitude; reduces differential settlement by 98%.'
  },
  {
    id: 'SOFT_MARINE_MUD',
    name: 'Estuarine Soft Marine Mud & Organic Delta Sludge',
    category: 'Extreme Settlement & Low Shear',
    severityBadge: 'Critical Failure Risk',
    severityColor: 'text-red-400 bg-red-500/20 border-red-500/30',
    bearingCapacityRawKpa: 20,
    bearingCapacityTargetKpa: 380,
    settlementUnadjustedMm: 650,
    settlementAdjustedMm: 12,
    capexPremiumPct: 34,
    riskSummary: 'High-water-content mangrove delta organic mud cannot support structural loads, causing catastrophic structural shearing of high-pressure stainless steel manifolds and subsea intake pipes.',
    engineeringSolutions: [
      {
        title: 'Pre-Stressed Concrete (PHC) Deep Driven Friction Piles',
        description: 'Drives 600mm high-strength pre-stressed concrete hollow piles 45m deep through mud layer to anchor into solid bedrock.',
        techStack: 'Hydraulic Impact Hammer + High-Strength Concrete (C80/96)',
        standards: 'ISO 19901-4 Marine Geotechnical Design / BS 8004 Foundations'
      },
      {
        title: 'Deep Soil Mixing (DSM) Binder Stabilization',
        description: 'Rotary augers mix Portland cement slurry and blast furnace slag directly into soft mud, forming solid 1.0m diameter soil-cement columns.',
        techStack: 'Dual-Shaft Deep Soil Mixing Rig + Grout Injection Station',
        standards: 'EN 14679 Deep Mixing Geotechnical Execution'
      },
      {
        title: 'Prefabricated Vertical Drains (PVD) & Vacuum Preloading',
        description: 'Installs synthetic band drains at 1.0m spacing with 4m earth embankment surcharge to squeeze out 90% of pore water in 60 days.',
        techStack: 'Mandrel Drain Inserter + Impermeable Vacuum Membrane Liner',
        standards: 'ASTM D6992 Prefabricated Vertical Drain Consolidation'
      }
    ],
    mitigationImpact: 'Consolidates 95% of initial mud settlement before plant construction; guarantees zero structural cracking of piping.'
  },
  {
    id: 'KARST_LIMESTONE',
    name: 'Cavernous Karst Limestone & Coral Reef Cavities',
    category: 'Sinkhole & Cavity Hazard',
    severityBadge: 'Void Collapse Danger',
    severityColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    bearingCapacityRawKpa: 50,
    bearingCapacityTargetKpa: 420,
    settlementUnadjustedMm: 280,
    settlementAdjustedMm: 6,
    capexPremiumPct: 28,
    riskSummary: 'Sub-surface dissolution cavities and soft coral voids create unpredictable foundation collapse zones and uncontrolled saltwater seepage into subterranean pump rooms.',
    engineeringSolutions: [
      {
        title: 'High-Pressure Compaction Void Grouting & Cavity Filling',
        description: 'Injects low-slump micro-fine cement mortar under 30 bar pressure into karst caverns to seal voids and consolidate weak rock strata.',
        techStack: 'Grout Injection Pumps + Sub-Surface Packer Array',
        standards: 'ASTM D7128 Karst Geotechnical Cavity Survey & Grouting'
      },
      {
        title: 'Micropile Underpinning Socketed into Solid Coral Bedrock',
        description: 'Drills 250mm high-yield steel casing micropiles through voided zones, grouting 6m deep into competent unweathered reef limestone.',
        techStack: 'Rotary Air Percussion Drill + Threadbar Steel Core (Grade 150)',
        standards: 'FHWA-NHI-05-039 Micropile Design & Construction Guidelines'
      },
      {
        title: 'Electrical Resistivity Tomography (ERT) Real-Time Imaging',
        description: 'Deploys 2D/3D electrical resistivity electrode arrays across plant site to continuously detect subterranean sinkhole formation.',
        techStack: 'Multi-Channel Resistivity Meter + Georeferenced Inversion Software',
        standards: 'ASTM D6431 Use of Direct Current Resistivity Method'
      }
    ],
    mitigationImpact: 'Completely seals sub-surface void channels; increases karst rock mass rating (RMR) from 25 (very poor) to 75 (good).'
  },
  {
    id: 'SEISMIC_TSUNAMI_FAULT',
    name: 'Active Subduction Seismic Fault & Tsunami Surge Shoreline',
    category: 'Subduction Fault & Surge Hazard',
    severityBadge: 'Catastrophic Seismic Risk',
    severityColor: 'text-red-400 bg-red-500/20 border-red-500/30',
    bearingCapacityRawKpa: 60,
    bearingCapacityTargetKpa: 400,
    settlementUnadjustedMm: 180,
    settlementAdjustedMm: 4,
    capexPremiumPct: 42,
    riskSummary: 'Extreme seismic ground acceleration damages high-pressure pumps and ocean intake piping, while tsunami surge flooding threatens electrical substations and control systems.',
    engineeringSolutions: [
      {
        title: 'Lead-Rubber Elastomeric Base Isolators (LRB)',
        description: 'Mounts high-pressure SWRO pump halls on heavy lead-plug elastomeric bearings, decoupling building vibration from ground motion.',
        techStack: 'High-Damping Lead-Core Rubber Bearings + Viscous Fluid Dampers',
        standards: 'ASCE 7-22 Chapter 17 Seismic Isolation Design Criteria'
      },
      {
        title: 'Elevated Civil Plinth (+14m MSL) Tsunami Refuge Design',
        description: 'Constructs high-voltage electrical transformers and SCADA control rooms on a reinforced concrete sea-wall plinth 14m above mean sea level.',
        techStack: 'Post-Tensioned Monolithic Reinforced Concrete Plinth',
        standards: 'FEMA P-646 Guidelines for Design of Structures for Vertical Evacuation'
      },
      {
        title: 'Tetrapod & Xbloc Concrete Armor Wave Dissipators',
        description: 'Deploys 12-tonne interlocking Xbloc concrete armor units along coastal frontage with heavy geotextile filter fabric anti-scour aprons.',
        techStack: 'Precast High-Density Concrete Armor Units + Marine Placement Crane',
        standards: 'USACE Coastal Engineering Manual (CEM) Armor Unit Design'
      }
    ],
    mitigationImpact: 'Absorbs 88% of seismic kinetic shock; protects plant operations against 12m tsunami wave runup height.'
  },
  {
    id: 'PERMAFROST_ARCTIC',
    name: 'Arctic Sub-Zero Tidal Flat & Permafrost Thaw Soil',
    category: 'Thermal Freeze-Thaw Degradation',
    severityBadge: 'Frost Heave Hazard',
    severityColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    bearingCapacityRawKpa: 40,
    bearingCapacityTargetKpa: 320,
    settlementUnadjustedMm: 310,
    settlementAdjustedMm: 7,
    capexPremiumPct: 38,
    riskSummary: 'Heat dissipation from SWRO pumps and warm concentrate streams thaws underlying permafrost, inducing severe differential ground sinkage and thermal pipe shearing.',
    engineeringSolutions: [
      {
        title: 'Thermosyphon Passive Refrigeration Pile Foundations',
        description: 'Installs sealed steel piles filled with liquid carbon dioxide that passively extract heat from subterranean soil during arctic winter.',
        techStack: 'Passive Thermosyphon Heat Pipes + Radiator Fin Top Caps',
        standards: 'ISO 19906 Arctic Offshore Structures & Geotechnics'
      },
      {
        title: 'Elevated Ventilated Structural Crawlspace (1.8m Air Gap)',
        description: 'Raises building floor slab 1.8m above ground on insulated steel pilings, allowing cold arctic wind to sweep away plant operational heat.',
        techStack: 'Structural Galvanized Steel Truss + Insulated Composite Decking',
        standards: 'ASCE Monograph Cold Regions Engineering Practice'
      },
      {
        title: 'Closed-Cell Rigid Polyurethane Sub-Grade Thermal Enclosure',
        description: 'Encases sub-surface piping and pump foundations in 200mm high-density polyurethane foam with waterproof elastomeric coatings.',
        techStack: 'Spray Polyurethane Foam (SPF) + Polyurea Protective Waterproofing',
        standards: 'ASTM C1029 Spray-Applied Rigid Cellular Polyurethane Thermal Insulation'
      }
    ],
    mitigationImpact: 'Maintains permafrost thermal equilibrium at -4°C year-round; prevents thermal subsidence and pipe freezing.'
  },
  {
    id: 'ACID_SULFATE_SOIL',
    name: 'Highly Corrosive Acid-Sulfate & Hyper-Saline Coastal Marsh',
    category: 'Severe Chemical Corrosion',
    severityBadge: 'Extreme Acid Attack (pH < 3.2)',
    severityColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    bearingCapacityRawKpa: 30,
    bearingCapacityTargetKpa: 360,
    settlementUnadjustedMm: 210,
    settlementAdjustedMm: 5,
    capexPremiumPct: 25,
    riskSummary: 'Pyritic oxidation releases sulfuric acid and hyper-saline groundwater that rapidly corrode standard Portland cement concrete, rebar reinforcement, and subterranean metallic piping.',
    engineeringSolutions: [
      {
        title: 'Sulfate-Resisting Portland Cement (Type V) with Silica Fume',
        description: 'Uses Grade 60 SRPC concrete fortified with 10% silica fume and 25% blast furnace slag to eliminate acid/chloride penetration.',
        techStack: 'Ultra-Dense Silica Fume Concrete (Water/Binder Ratio < 0.32)',
        standards: 'ACI 201.2R Guide to Durable Concrete / ASTM C150 Type V'
      },
      {
        title: 'Impressed Current Cathodic Protection (ICCP) System',
        description: 'Installs titanium mixed-metal-oxide (MMO) tubular anodes in soil, applying a protective DC current to suppress rebar corrosion.',
        techStack: 'Titanium-MMO Anode Strings + Automatic Transformer-Rectifier Unit',
        standards: 'NACE SP0169 Cathodic Protection of Underground Structures'
      },
      {
        title: 'HDPE Double-Track Geomembrane Tanking Enclosure',
        description: 'Wraps all buried structural footings and pipe trenches in 2.5mm thick high-density polyethylene welded geomembrane sheets.',
        techStack: '2.5mm HDPE Geomembrane + Dual-Seam Hot-Wedge Welder',
        standards: 'GRI-GM13 Test Properties of High Density Polyethylene Geomembranes'
      }
    ],
    mitigationImpact: 'Extends foundation structural lifespan to 50+ years; stops acidic concrete etching and rebar rust spalling.'
  },
  {
    id: 'STEEP_CLIFF_EROSION',
    name: 'Unstable Coastal Cliff & Active Wave-Eroded Slopes',
    category: 'Slope Instability & Undercutting',
    severityBadge: 'Cliff Fall Hazard',
    severityColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    bearingCapacityRawKpa: 45,
    bearingCapacityTargetKpa: 390,
    settlementUnadjustedMm: 190,
    settlementAdjustedMm: 5,
    capexPremiumPct: 31,
    riskSummary: 'High-wave marine hydraulic erosion undercuts coastal cliff toes, threatening catastrophic landslide of cliff-top desal buildings and sea-water intake pipeline risers.',
    engineeringSolutions: [
      {
        title: 'High-Tensile Steel Wire Mesh Slope Stabilization & Soil Nails',
        description: 'Installs 25mm diameter fully-grouted steel soil nails at 1.5m grid spacing with Tecco high-tensile steel wire mesh facing.',
        techStack: 'High-Tensile Steel Wire Netting + Threadbar Soil Nails (300 kN)',
        standards: 'BS 8081 Code of Practice for Ground Anchorages & Soil Nailing'
      },
      {
        title: 'Subsea Horizontal Directional Drilling (HDD) Micro-Tunneling',
        description: 'Bores intake pipeline tunnels deep through cliff base bedrock, bypassing the active cliff erosion collapse zone entirely.',
        techStack: 'HDD Rock Drilling Rig + Duplex Stainless Steel Intake Pipe Casing',
        standards: 'DCA Europe Technical Guidelines for Horizontal Directional Drilling'
      },
      {
        title: 'Prestressed Rock Anchorages Anchored in Stable Inland Rock',
        description: 'Anchors cliff-edge building slabs with 7-wire strand prestressed rock anchors grouted 30m deep into inland rock masses.',
        techStack: '7-Wire Epoxy-Coated Strand Tendons + Hydraulic Post-Tensioning Jack',
        standards: 'PTI DC35.1 Recommendations for Prestressed Rock Anchors'
      }
    ],
    mitigationImpact: 'Stabilizes coastal slope against 100-year wave action; secures intake pipelines against landslide shear.'
  }
];

export interface RDLabBenchData {
  id: string;
  name: string;
  category: 'MEMBRANE_TESTING' | 'THERMAL_DISTILLATION' | 'MINERAL_EXTRACTION' | 'ENERGY_RECOVERY' | 'ELECTRO_CHEMICAL';
  status: 'RUNNING' | 'CALIBRATING' | 'ACTIVE_HARVEST' | 'MAINTENANCE' | 'PAUSED';
  location: string;
  leadResearcher: string;
  temperatureC: number;
  pressureBar: number;
  saltRejectionPct: number;
  permeateFluxLmh: number;
  hoursActive: number;
  lastUpdated: string;
  description: string;
  recentObservations: string[];
}

export const INITIAL_RD_LAB_BENCHES: RDLabBenchData[] = [
  {
    id: 'BENCH-01',
    name: 'Graphene Oxide Nanocomposite RO Membrane Bench',
    category: 'MEMBRANE_TESTING',
    status: 'RUNNING',
    location: 'Advanced Polymeric Membrane Lab - Station 4A',
    leadResearcher: 'Dr. Elena Rostova & Dr. K. Raman',
    temperatureC: 24.5,
    pressureBar: 62.0,
    saltRejectionPct: 99.84,
    permeateFluxLmh: 42.5,
    hoursActive: 1420,
    lastUpdated: '10 mins ago',
    description: 'High-flux single-layer graphene oxide nanosheet incorporated onto polyamide active layer for ultra-low fouling seawater desalination.',
    recentObservations: [
      'Observed 38% flux enhancement over conventional Toray SWRO elements.',
      'Zero biofouling accumulation detected after 500 hrs of continuous raw ocean water exposure.',
      'Chlorine tolerance testing maintained >99.7% rejection at 50 ppm-hrs.'
    ]
  },
  {
    id: 'BENCH-02',
    name: 'High-Temperature Solar Vacuum Membrane Distillation Skid',
    category: 'THERMAL_DISTILLATION',
    status: 'CALIBRATING',
    location: 'Thermal Solar Evaporation Rig - Roof Deck B',
    leadResearcher: 'Prof. Marcus Vance',
    temperatureC: 82.0,
    pressureBar: 0.15,
    saltRejectionPct: 99.98,
    permeateFluxLmh: 28.1,
    hoursActive: 680,
    lastUpdated: '25 mins ago',
    description: 'Hydrophobic PTFE microporous membrane bench powered by concentrated parabolic trough solar thermal fluid at 85°C.',
    recentObservations: [
      'Successfully separated 120,000 ppm hyper-saline brine into distillate (<10 ppm TDS).',
      'Vacuum delta adjusted to 85 kPa to optimize thermal efficiency.',
      'Pre-heating heat-pipe exchangers achieved 88% thermal energy recovery.'
    ]
  },
  {
    id: 'BENCH-03',
    name: 'Direct Lithium & Mineral Extraction Ion-Exchange Column',
    category: 'MINERAL_EXTRACTION',
    status: 'ACTIVE_HARVEST',
    location: 'Brine Valorization Lab - Unit 09',
    leadResearcher: 'Dr. Priya Sharma & BARC Minerals Division',
    temperatureC: 30.0,
    pressureBar: 4.5,
    saltRejectionPct: 94.20,
    permeateFluxLmh: 18.0,
    hoursActive: 2150,
    lastUpdated: 'Just now',
    description: 'Titanium-based manganese oxide (HMO) sieve adsorbents extracting battery-grade Lithium Carbonate (Li2CO3) directly from desal reject brine.',
    recentObservations: [
      'Harvested 1.45 kg battery-grade Li2CO3 per 100 m³ of Red Sea brine concentrate.',
      'Desorption elution cycle completed with 0.1M HCl with zero bed degradation.',
      'Co-extraction of Magnesium Hydroxide (Mg(OH)2) purity verified at 99.1%.'
    ]
  },
  {
    id: 'BENCH-04',
    name: 'Electrochemical Electrodialysis Reversal (EDR) Antiscalant Bench',
    category: 'ELECTRO_CHEMICAL',
    status: 'MAINTENANCE',
    location: 'Electro-Membrane Bench - Bay 2',
    leadResearcher: 'Dr. Hiroshi Tanaka',
    temperatureC: 28.0,
    pressureBar: 2.1,
    saltRejectionPct: 88.50,
    permeateFluxLmh: 35.0,
    hoursActive: 940,
    lastUpdated: '1 hour ago',
    description: 'Alternating electric field polarity reversal (15-min cycles) preventing calcium sulfate (CaSO4) and silica precipitation during high-recovery brackish desal.',
    recentObservations: [
      'Scheduled cleaning-in-place (CIP) electrode rinse with citric acid in progress.',
      'Polarity reversal successfully dissolved scaling crystals without chemical antiscalants.',
      'Current density optimized at 180 A/m².'
    ]
  },
  {
    id: 'BENCH-05',
    name: 'Isobaric Ceramic Rotary Pressure Exchanger (ERD) Test Rig',
    category: 'ENERGY_RECOVERY',
    status: 'RUNNING',
    location: 'Fluid Hydraulics High-Pressure Cell',
    leadResearcher: 'Ing. David O’Connor & Energy Recovery Team',
    temperatureC: 22.0,
    pressureBar: 70.0,
    saltRejectionPct: 98.10,
    permeateFluxLmh: 65.0,
    hoursActive: 4320,
    lastUpdated: '5 mins ago',
    description: 'Precision alumina ceramic rotor transfers hydraulic energy directly from high-pressure concentrate brine to incoming seawater feed.',
    recentObservations: [
      'Verified 97.8% net hydraulic energy transfer efficiency at 70 bar operating pressure.',
      'Mixing volumetric leakage between brine and feed maintained below 0.8%.',
      'Calculated power consumption reduction: 3.2 kWh/m³ down to 1.95 kWh/m³.'
    ]
  }
];

export interface SupplyChainComponent {
  id: string;
  name: string;
  tierCategory: 'CORE_HYDRAULIC' | 'MEMBRANE_ELEMENT' | 'VALORIZATION_THERMAL' | 'ELECTRICAL_SCADA' | 'CHEMICAL_REAGENTS';
  manufacturerRegion: string;
  primarySupplier: string;
  leadTimeWeeks: number;
  stockBufferDays: number;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tariffPct: number;
  shippingCorridor: string;
  keySpecs: string;
  mitigationStrategy: string;
}

export const CRITICAL_SUPPLY_CHAIN_COMPONENTS: SupplyChainComponent[] = [
  {
    id: 'SUP-01',
    name: 'High-Pressure Super Duplex Stainless Steel Pumps (250 Bar)',
    tierCategory: 'CORE_HYDRAULIC',
    manufacturerRegion: 'Sully-sur-Loire, France / Kobe, Japan',
    primarySupplier: 'KSB Supreme / Ebara Marine Heavy Industries',
    leadTimeWeeks: 18,
    stockBufferDays: 45,
    riskRating: 'HIGH',
    tariffPct: 6.5,
    shippingCorridor: 'Rotterdam → Suez Canal → Arabian Gulf / Indian Ocean',
    keySpecs: 'PREN > 42 Super Duplex Steel (UNS S32750), 88% motor efficiency, 680 m³/h per unit.',
    mitigationStrategy: 'Pre-order long-lead castings 6 months prior to civil excavation; maintain local rotor bearing replacement kits.'
  },
  {
    id: 'SUP-02',
    name: 'PX Isobaric Ceramic Pressure Energy Recovery Devices (ERD)',
    tierCategory: 'CORE_HYDRAULIC',
    manufacturerRegion: 'San Leandro, California, USA',
    primarySupplier: 'Energy Recovery Inc. (ERI PX-Q300)',
    leadTimeWeeks: 10,
    stockBufferDays: 60,
    riskRating: 'MEDIUM',
    tariffPct: 3.2,
    shippingCorridor: 'Oakland Port → Trans-Pacific → Yokohama / Singapore Hub',
    keySpecs: 'Ultra-hard Alumina Ceramic rotor, zero lubrication requirement, 97.5% net efficiency.',
    mitigationStrategy: 'Dual-sourcing agreement with Danfoss iSave rotary pressure exchangers.'
  },
  {
    id: 'SUP-03',
    name: 'Thin-Film Polyamide SWRO 8040 Membrane Elements',
    tierCategory: 'MEMBRANE_ELEMENT',
    manufacturerRegion: 'Otsu, Shiga, Japan & Carlsbad, USA',
    primarySupplier: 'Toray Industries / DuPont Water Solutions (FilmTec)',
    leadTimeWeeks: 6,
    stockBufferDays: 90,
    riskRating: 'LOW',
    tariffPct: 2.0,
    shippingCorridor: 'Kobe / Los Angeles → Global Container Line Freight',
    keySpecs: '440 sq ft active area, 99.8% nominal NaCl rejection, boron removal >93%.',
    mitigationStrategy: 'Maintain regional warehouse buffer stock of 2,000 spare membrane elements.'
  },
  {
    id: 'SUP-04',
    name: 'Titanium Grade 2 Plate Heat Exchangers (MED / MSF)',
    tierCategory: 'VALORIZATION_THERMAL',
    manufacturerRegion: 'Lund, Sweden / Tokyo, Japan',
    primarySupplier: 'Alfa Laval / GEA Thermal Systems',
    leadTimeWeeks: 14,
    stockBufferDays: 30,
    riskRating: 'MEDIUM',
    tariffPct: 4.8,
    shippingCorridor: 'Hamburg / Gothenburg → Cape Route / Malacca Strait',
    keySpecs: 'Corrosion-proof Titanium Grade 2 corrugated plates, EPDM food-grade gaskets.',
    mitigationStrategy: 'On-site gasket vulcanization kits and non-destructive ultrasonic plate thickness testing.'
  },
  {
    id: 'SUP-05',
    name: 'High-Voltage Power Step-Down Transformers & SCADA PLCs',
    tierCategory: 'ELECTRICAL_SCADA',
    manufacturerRegion: 'Zurich, Switzerland / Erlangen, Germany',
    primarySupplier: 'ABB Energy Grid / Siemens Industrial Automation',
    leadTimeWeeks: 26,
    stockBufferDays: 20,
    riskRating: 'CRITICAL',
    tariffPct: 8.0,
    shippingCorridor: 'Antwerp → Red Sea Maritime Corridor',
    keySpecs: '132kV / 11kV Step-Down Oil-Immersed Transformers, Redundant S7-1500 PLC Cabinets.',
    mitigationStrategy: 'Global transformer shortage risk requires early placement of long-lead procurement contracts at FEED stage.'
  },
  {
    id: 'SUP-06',
    name: 'Polycarboxylic Antiscalant & Coagulant Chemical Reagents',
    tierCategory: 'CHEMICAL_REAGENTS',
    manufacturerRegion: 'Ludwigshafen, Germany / Mumbai, India',
    primarySupplier: 'BASF Water Chemicals / Thermax Chemicals',
    leadTimeWeeks: 3,
    stockBufferDays: 120,
    riskRating: 'LOW',
    tariffPct: 1.5,
    shippingCorridor: 'Jawaharlal Nehru Port (JNPT) / Rotterdam Port',
    keySpecs: 'Phosphonate-free polycarboxylic acid scale inhibitor, liquid Ferric Chloride (FeCl3) 40%.',
    mitigationStrategy: 'Local chemical blending facilities near desal plant sites to eliminate long-distance shipping dependency.'
  }
];

export interface GanttMilestone {
  id: string;
  name: string;
  category: 'ENGINEERING' | 'CIVIL_MARINE' | 'PROCESS_SKIDS' | 'COMMISSIONING';
  startWeek: number;
  durationWeeks: number;
  progressPct: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'DELAYED' | 'UPCOMING';
  leadEngineer: string;
  dependencies: string[];
  description: string;
}

export const INITIAL_GANTT_MILESTONES: GanttMilestone[] = [
  {
    id: 'M-01',
    name: 'Site Bathymetry Survey & Marine EIA Clearing',
    category: 'ENGINEERING',
    startWeek: 1,
    durationWeeks: 8,
    progressPct: 100,
    status: 'COMPLETED',
    leadEngineer: 'Dr. A. K. Varma (CSIR-CSMCRI)',
    dependencies: [],
    description: 'Sub-sea acoustic sonar profiling, benthic flora mapping, and coastal environmental clearance.'
  },
  {
    id: 'M-02',
    name: 'Sub-Sea Intake Tunneling & Velocity Cap Boring',
    category: 'CIVIL_MARINE',
    startWeek: 6,
    durationWeeks: 16,
    progressPct: 85,
    status: 'IN_PROGRESS',
    leadEngineer: 'Eng. R. Solanki (L&T Marine)',
    dependencies: ['M-01'],
    description: 'Boring sub-sea 1.8m diameter micro-tunnels for passive low-velocity marine intake.'
  },
  {
    id: 'M-03',
    name: 'Unsuitable Ground Vibro-Compaction Piling',
    category: 'CIVIL_MARINE',
    startWeek: 12,
    durationWeeks: 16,
    progressPct: 60,
    status: 'IN_PROGRESS',
    leadEngineer: 'Dr. Marcus Vance (Fugro Geo)',
    dependencies: ['M-01'],
    description: 'Installing deep stone columns and vibro-flotation piles to prevent soil liquefaction.'
  },
  {
    id: 'M-04',
    name: 'Pre-Treatment DAF Skid & Ceramic UF Assembly',
    category: 'PROCESS_SKIDS',
    startWeek: 22,
    durationWeeks: 16,
    progressPct: 40,
    status: 'IN_PROGRESS',
    leadEngineer: 'Eng. Sarah Al-Mansoor (KAUST)',
    dependencies: ['M-02', 'M-03'],
    description: 'Dissolved Air Flotation clarifiers and 0.02 micron ceramic ultrafiltration membrane racks.'
  },
  {
    id: 'M-05',
    name: 'SWRO High-Pressure Pump & ERD Installation',
    category: 'PROCESS_SKIDS',
    startWeek: 30,
    durationWeeks: 16,
    progressPct: 20,
    status: 'IN_PROGRESS',
    leadEngineer: 'Dr. G. Sundaram (BARC Water)',
    dependencies: ['M-04'],
    description: 'Mounting 70-bar duplex stainless steel pumps and isobaric rotary pressure exchangers (PX-300).'
  },
  {
    id: 'M-06',
    name: 'High-Rejection Polyamide Membrane Loading',
    category: 'PROCESS_SKIDS',
    startWeek: 40,
    durationWeeks: 12,
    progressPct: 0,
    status: 'UPCOMING',
    leadEngineer: 'Dr. Chen Wei (Toray Membrane)',
    dependencies: ['M-05'],
    description: 'Loading 8-inch high-area spiral wound polyamide membrane elements into 1,000 psi pressure vessels.'
  },
  {
    id: 'M-07',
    name: 'Electrical Substation & SCADA Automation',
    category: 'COMMISSIONING',
    startWeek: 46,
    durationWeeks: 12,
    progressPct: 0,
    status: 'UPCOMING',
    leadEngineer: 'Eng. P. Mehta (Siemens Energy)',
    dependencies: ['M-05'],
    description: 'Commissioning 33kV main transformer, VFD pump drivers, and dual-redundant PLC SCADA control.'
  },
  {
    id: 'M-08',
    name: 'Pre-Commissioning Flushing & Commercial Run',
    category: 'COMMISSIONING',
    startWeek: 56,
    durationWeeks: 12,
    progressPct: 0,
    status: 'UPCOMING',
    leadEngineer: 'Director S. Nair (EPC Lead)',
    dependencies: ['M-06', 'M-07'],
    description: 'Chemical cleaning, permeate mineral buffering, WHO water quality verification & commercial output.'
  }
];

export interface RDLabAlert {
  id: string;
  benchId: string;
  benchName: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  timestamp: string;
  parameter: 'PRESSURE' | 'TEMPERATURE' | 'SALT_REJECTION' | 'FLUX' | 'RESIN_SATURATION';
  currentVal: number;
  thresholdVal: number;
  unit: string;
  isAcknowledged: boolean;
}

export const INITIAL_LAB_ALERTS: RDLabAlert[] = [
  {
    id: 'ALT-101',
    benchId: 'BENCH-01',
    benchName: 'SWRO Polyamide vs Graphene Bench',
    severity: 'CRITICAL',
    title: 'High Pressure Surge Anomaly',
    message: 'Operating pressure spiked to 74.2 bar exceeding maximum safety limit of 70.0 bar. Risk of membrane rupture.',
    timestamp: '10 mins ago',
    parameter: 'PRESSURE',
    currentVal: 74.2,
    thresholdVal: 70.0,
    unit: 'bar',
    isAcknowledged: false
  },
  {
    id: 'ALT-102',
    benchId: 'BENCH-04',
    benchName: 'Isobaric Rotary ERD Efficiency Bench',
    severity: 'WARNING',
    title: 'Permeate Flux Drop Alert',
    message: 'Permeate flux degraded to 12.4 LMH below minimum benchmark threshold of 15.0 LMH. Acid wash backflush recommended.',
    timestamp: '25 mins ago',
    parameter: 'FLUX',
    currentVal: 12.4,
    thresholdVal: 15.0,
    unit: 'LMH',
    isAcknowledged: false
  },
  {
    id: 'ALT-103',
    benchId: 'BENCH-03',
    benchName: 'Brine Selective Mining (Li & Mg Column)',
    severity: 'INFO',
    title: 'Lithium Resin Column Saturation',
    message: 'Column-B resin bed reached 94.2% ion capacity limit. Ready for elution and harvest cycle.',
    timestamp: '42 mins ago',
    parameter: 'RESIN_SATURATION',
    currentVal: 94.2,
    thresholdVal: 90.0,
    unit: '%',
    isAcknowledged: true
  }
];

export interface StakePool {
  id: string;
  name: string;
  category: 'INFRASTRUCTURE_BOND' | 'RD_NODE' | 'BRINE_MINING' | 'WATER_CREDIT';
  apyPct: number;
  totalPoolStakedUsd: number;
  userStakedUsd: number;
  userEarnedYieldUsd: number;
  lockPeriodDays: number;
  daysRemaining: number;
  isAutoStaked: boolean;
  minStakeUsd: number;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  badge: string;
}

export const INITIAL_STAKE_POOLS: StakePool[] = [
  {
    id: 'POOL-SWRO-BOND',
    name: 'SWRO Capacity Expansion Infrastructure Bond',
    category: 'INFRASTRUCTURE_BOND',
    apyPct: 12.5,
    totalPoolStakedUsd: 4850000,
    userStakedUsd: 25000,
    userEarnedYieldUsd: 2150.40,
    lockPeriodDays: 90,
    daysRemaining: 42,
    isAutoStaked: true,
    minStakeUsd: 500,
    riskRating: 'LOW',
    description: 'Direct capital financing for 50,000 m³/day SWRO plant expansion. Backed by municipal water purchase off-take agreements.',
    badge: 'Municipal Backed'
  },
  {
    id: 'POOL-GRAPHENE-RD',
    name: 'Graphene & Biomimetic Membrane R&D Pool',
    category: 'RD_NODE',
    apyPct: 14.8,
    totalPoolStakedUsd: 2100000,
    userStakedUsd: 15000,
    userEarnedYieldUsd: 1420.80,
    lockPeriodDays: 30,
    daysRemaining: 12,
    isAutoStaked: true,
    minStakeUsd: 250,
    riskRating: 'MEDIUM',
    description: 'High-yield R&D staking vault funding nanostructured graphene membrane synthesis at CSIR-CSMCRI and KAUST.',
    badge: 'High Yield R&D'
  },
  {
    id: 'POOL-BRINE-MINING',
    name: 'Brine Selective Mining & Lithium Harvest Vault',
    category: 'BRINE_MINING',
    apyPct: 16.2,
    totalPoolStakedUsd: 3400000,
    userStakedUsd: 30000,
    userEarnedYieldUsd: 3140.00,
    lockPeriodDays: 180,
    daysRemaining: 115,
    isAutoStaked: false,
    minStakeUsd: 1000,
    riskRating: 'MEDIUM',
    description: 'Resource recovery staking pool backing sub-sea zero liquid discharge (ZLD) lithium and magnesium extraction skids.',
    badge: 'ZLD Revenue Share'
  },
  {
    id: 'POOL-BLUE-WATER',
    name: 'Blue Carbon & Clean Water Offset Credit Pool',
    category: 'WATER_CREDIT',
    apyPct: 8.5,
    totalPoolStakedUsd: 6200000,
    userStakedUsd: 10000,
    userEarnedYieldUsd: 580.20,
    lockPeriodDays: 0,
    daysRemaining: 0,
    isAutoStaked: true,
    minStakeUsd: 100,
    riskRating: 'LOW',
    description: 'Flexible liquidity pool for ISO 14001 water offset credits with instant unstaking and zero lockup penalty.',
    badge: 'Instant Liquidity'
  }
];

export interface StakingNewsItem {
  id: string;
  title: string;
  category: 'MARKET_OFFTAKE' | 'YIELD_ADJUSTMENT' | 'RD_BREAKTHROUGH' | 'REGULATORY_GRANT';
  source: string;
  timestamp: string;
  summary: string;
  impactBadge: string;
  readTime: string;
  linkUrl?: string;
  likesCount: number;
  isBookmarked?: boolean;
}

export const INITIAL_STAKING_NEWS: StakingNewsItem[] = [
  {
    id: 'NEWS-01',
    title: 'Gujarat Maritime Board Signs 15-Year SWRO Off-take Agreement',
    category: 'MARKET_OFFTAKE',
    source: 'Global Water Intelligence (GWI)',
    timestamp: '2 hours ago',
    summary: 'A landmark $120M water purchase agreement has been executed for the Jamnagar 50,000 m³/day SWRO plant. This guarantees fixed-tariff revenue backing the SWRO Infrastructure Bond vault at 12.5% APY.',
    impactBadge: 'Infrastructure Security +',
    readTime: '3 min read',
    likesCount: 142,
    isBookmarked: true
  },
  {
    id: 'NEWS-02',
    title: 'KAUST Nanotech Lab Yields 40% Flux Increase in Graphene Membranes',
    category: 'RD_BREAKTHROUGH',
    source: 'Desalination Journal / Elsevier',
    timestamp: '5 hours ago',
    summary: 'Bench tests at KAUST validate nanostructured graphene oxide membranes operating at 38 bar with 99.8% salt rejection. Yield distributions for the Graphene R&D Staking Pool will increase by 1.2% next cycle.',
    impactBadge: 'Yield Boost +1.2% APY',
    readTime: '4 min read',
    likesCount: 98,
    isBookmarked: false
  },
  {
    id: 'NEWS-03',
    title: 'Brine Selective Lithium Recovery Skid Achieves 94% Purity Batch',
    category: 'YIELD_ADJUSTMENT',
    source: 'CSIR-CSMCRI Salt & Marine Chemical Institute',
    timestamp: '1 day ago',
    summary: 'Sub-sea zero liquid discharge (ZLD) crystallization unit harvested 4.2 metric tons of battery-grade lithium carbonate from SWRO concentrate, boosting quarterly harvest distributions for Brine Mining Vault stakers.',
    impactBadge: 'ZLD Revenue Share +',
    readTime: '2 min read',
    likesCount: 215,
    isBookmarked: false
  },
  {
    id: 'NEWS-04',
    title: 'Ministry of Jal Shakti Announces $30M Subsidized Clean Water Offset Grants',
    category: 'REGULATORY_GRANT',
    source: 'National Hydro Infrastructure Portal',
    timestamp: '2 days ago',
    summary: 'New environmental policy grants $30M matching capital to ISO 14001 water offset pools. Blue Carbon & Clean Water Offset Credit Pool liquidity expanded with zero unstaking lockup penalties.',
    impactBadge: 'Liquidity Expanded',
    readTime: '5 min read',
    likesCount: 76,
    isBookmarked: false
  }
];

export interface StakingAlertItem {
  id: string;
  type: 'COMPOUND_EVENT' | 'YIELD_PAYOUT' | 'LOCK_EXPIRY' | 'RATE_CHANGE' | 'SECURITY_AUDIT';
  poolId: string;
  poolName: string;
  title: string;
  message: string;
  timestamp: string;
  severity: 'INFO' | 'SUCCESS' | 'WARNING';
  isRead: boolean;
  amountUsd?: number;
}

export const INITIAL_STAKING_ALERTS: StakingAlertItem[] = [
  {
    id: 'ALT-101',
    type: 'COMPOUND_EVENT',
    poolId: 'POOL-SWRO-BOND',
    poolName: 'SWRO Capacity Expansion Infrastructure Bond',
    title: 'Automatic Daily Restake Executed',
    message: 'Global Auto-Stake compounder automatically reinvested $64.20 yield back into SWRO Infrastructure Bond vault at 12.5% APY.',
    timestamp: 'Today at 08:30 AM',
    severity: 'SUCCESS',
    isRead: false,
    amountUsd: 64.20
  },
  {
    id: 'ALT-102',
    type: 'YIELD_PAYOUT',
    poolId: 'POOL-BRINE-MINING',
    poolName: 'Brine Selective Mining & Lithium Harvest Vault',
    title: 'Lithium Extraction Yield Harvest Distribution',
    message: 'Quarterly ZLD mineral sales yield payout of $340.00 credited to your available rewards balance.',
    timestamp: 'Yesterday at 04:15 PM',
    severity: 'SUCCESS',
    isRead: false,
    amountUsd: 340.00
  },
  {
    id: 'ALT-103',
    type: 'RATE_CHANGE',
    poolId: 'POOL-GRAPHENE-RD',
    poolName: 'Graphene & Biomimetic Membrane R&D Pool',
    title: 'APY Yield Rate Adjusted (+0.8%)',
    message: 'Vault APY increased from 14.0% to 14.8% due to successful patent licensing milestone at KAUST nanotech laboratory.',
    timestamp: '2 days ago',
    severity: 'INFO',
    isRead: true
  },
  {
    id: 'ALT-104',
    type: 'LOCK_EXPIRY',
    poolId: 'POOL-GRAPHENE-RD',
    poolName: 'Graphene & Biomimetic Membrane R&D Pool',
    title: 'Lockup Period Nearing Completion',
    message: 'Your 30-day lockup on $15,000 USD deposit has 12 days remaining. Auto-restaking will maintain continuous yield compounding.',
    timestamp: '3 days ago',
    severity: 'WARNING',
    isRead: true
  },
  {
    id: 'ALT-105',
    type: 'SECURITY_AUDIT',
    poolId: 'GLOBAL',
    poolName: 'Smart Contract & Asset Vault Audit',
    title: 'Quarterly CertiK & ISO 14001 Audit Passed',
    message: 'All 4 desal staking vault smart contracts and municipal collateral escrows passed 100% formal verification with zero critical findings.',
    timestamp: '5 days ago',
    severity: 'INFO',
    isRead: true
  }
];

export interface TutorialStep {
  stepNum: number;
  title: string;
  subtitle: string;
  badge: string;
  content: string;
  keyTakeaways: string[];
}

export const STAKING_TUTORIAL_STEPS: TutorialStep[] = [
  {
    stepNum: 1,
    title: '1. Introduction to Desalination Capital Staking',
    subtitle: 'Financing ocean clean water infrastructure through decentralized capital vaults',
    badge: 'Step 1 of 4: Core Infrastructure Concept',
    content: 'Ocean desalination requires high upfront capital (CAPEX) for intake pipelines, high-pressure reverse osmosis (SWRO) vessels, and energy recovery devices (ERDs). Staking pools allow institutional and private investors to pool capital to finance plant construction and expansion.',
    keyTakeaways: [
      'Staked capital directly funds clean water intake, SWRO skid assembly, and brine recycling infrastructure.',
      'Investors earn competitive annual percentage yield (APY) backed by long-term municipal water purchasing contracts.',
      'Contributes to solving coastal water scarcity while generating sustainable yield.'
    ]
  },
  {
    stepNum: 2,
    title: '2. How Auto-Stake Compounding Multiplies APY',
    subtitle: 'Understanding daily yield restaking vs linear simple interest',
    badge: 'Step 2 of 4: Auto-Stake Engine',
    content: 'When Auto-Stake is enabled, accrued daily interest rewards are automatically deposited back into the principal balance. This creates exponential compound growth where tomorrow\'s interest is earned on both your original deposit and all previously accumulated rewards.',
    keyTakeaways: [
      'Simple Interest: Earns yield strictly on your initial deposit ($10,000 at 12% = $1,200/yr).',
      'Auto-Stake Compounding: Yield is restaked daily, increasing effective APY ($10,000 at 12% compounded daily = ~$1,275/yr).',
      'Can be toggled globally across all vaults or customized per individual pool.'
    ]
  },
  {
    stepNum: 3,
    title: '3. Risk Ratings & Collateral Security',
    subtitle: 'Low-risk municipal bonds vs high-yield R&D innovation vaults',
    badge: 'Step 3 of 4: Risk & Collateral',
    content: 'Desalination vaults are categorized by risk profile. Low-risk bonds are backed by 15 to 20 year municipal water off-take agreements, while medium-to-high yield pools fund cutting-edge brine mineral harvesting and membrane R&D with higher variable revenue shares.',
    keyTakeaways: [
      'Low Risk (Municipal Backed): Guaranteed water purchase tariffs with minimal volatility.',
      'Medium Risk (Brine Mining): Revenue generated from harvesting battery-grade lithium and magnesium from waste brine.',
      'Instant Liquidity: Water offset credit pools allow 0-day instant unstaking without penalties.'
    ]
  },
  {
    stepNum: 4,
    title: '4. Interactive Staking Yield Calculator Practice',
    subtitle: 'Test your knowledge and simulate custom returns',
    badge: 'Step 4 of 4: Hands-On Practice',
    content: 'Use our interactive yield simulator to calculate expected returns across different lockup periods and compounding schedules. Turn on Auto-Stake to observe real-time yield compounding gains.',
    keyTakeaways: [
      'Lockup periods (30 to 180 days) offer higher base APY rates.',
      'Flexible liquidity pools provide instant withdrawals at slightly lower APY.',
      'You are now fully prepared to optimize your desalination staking portfolio!'
    ]
  }
];

export const OceanDesalinationAndResearchPortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'WATER_IO_BRINE_RECYCLING' | 'CAUVERY_DESAL_CASE_STUDY' | 'PLANT_ARCHITECTURE_ECONOMICS' | 'COST_COMPARISON' | 'GEOTECH_GROUND_ADJUSTMENT' | 'RD_LAB_TRACKING' | 'SUPPLY_CHAIN_MAP' | 'ACADEMIC_EXPORT' | 'INSTITUTES_PROGRESS' | 'LAB_PRACTICE' | 'CONVERSION_ENGINE' | 'RESEARCH_LIBRARY' | 'PROJECT_GANTT_CHART' | 'STAKE_PORTFOLIO'
  >('WATER_IO_BRINE_RECYCLING');

  // Staking Portfolio, Projection & Auto-Stake State
  const [stakePools, setStakePools] = useState<StakePool[]>(INITIAL_STAKE_POOLS);
  const [globalAutoStake, setGlobalAutoStake] = useState<boolean>(true);
  const [stakeCategoryFilter, setStakeCategoryFilter] = useState<string>('ALL');
  const [selectedStakePoolId, setSelectedStakePoolId] = useState<string>('POOL-SWRO-BOND');

  // Staking Projection Graph State
  const [projInitialPrincipal, setProjInitialPrincipal] = useState<number>(50000);
  const [projMonthlyDeposit, setProjMonthlyDeposit] = useState<number>(1000);
  const [projDurationMonths, setProjDurationMonths] = useState<number>(24);
  const [projTargetApyPct, setProjTargetApyPct] = useState<number>(13.5);
  const [projAutoStakeEnabled, setProjAutoStakeEnabled] = useState<boolean>(true);

  // Deposit / Stake Modal State
  const [showStakeModal, setShowStakeModal] = useState<boolean>(false);
  const [modalStakeAmount, setModalStakeAmount] = useState<number>(2500);
  const [modalStakePoolId, setModalStakePoolId] = useState<string>('POOL-SWRO-BOND');

  // Staking Newsfeed State
  const [stakingNews, setStakingNews] = useState<StakingNewsItem[]>(INITIAL_STAKING_NEWS);
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('ALL');
  const [newsSearchQuery, setNewsSearchQuery] = useState<string>('');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  // Staking Alerts History State
  const [stakingAlerts, setStakingAlerts] = useState<StakingAlertItem[]>(INITIAL_STAKING_ALERTS);
  const [alertSeverityFilter, setAlertSeverityFilter] = useState<string>('ALL');
  const [alertSearchQuery, setAlertSearchQuery] = useState<string>('');

  // Staking Interactive Tutorial State
  const [showTutorialModal, setShowTutorialModal] = useState<boolean>(false);
  const [currentTutorialStep, setCurrentTutorialStep] = useState<number>(1);
  const [stakingSubTab, setStakingSubTab] = useState<'VAULTS_PORTFOLIO' | 'NEWSFEED' | 'ALERTS_HISTORY' | 'TUTORIAL'>('VAULTS_PORTFOLIO');

  // Interactive EPC & R&D Project Gantt Chart State
  const [ganttMilestones, setGanttMilestones] = useState<GanttMilestone[]>(INITIAL_GANTT_MILESTONES);
  const [ganttCategoryFilter, setGanttCategoryFilter] = useState<string>('ALL');
  const [ganttHighlightCriticalPath, setGanttHighlightCriticalPath] = useState<boolean>(false);
  const [selectedGanttMilestoneId, setSelectedGanttMilestoneId] = useState<string>('M-02');
  const [showAddGanttModal, setShowAddGanttModal] = useState<boolean>(false);
  const [newGanttName, setNewGanttName] = useState<string>('');
  const [newGanttCategory, setNewGanttCategory] = useState<'ENGINEERING' | 'CIVIL_MARINE' | 'PROCESS_SKIDS' | 'COMMISSIONING'>('CIVIL_MARINE');
  const [newGanttDurationWeeks, setNewGanttDurationWeeks] = useState<number>(12);
  const [newGanttStartWeek, setNewGanttStartWeek] = useState<number>(20);

  // R&D Lab Tracking & Alert System State
  const [labBenches, setLabBenches] = useState<RDLabBenchData[]>(INITIAL_RD_LAB_BENCHES);
  const [labCategoryFilter, setLabCategoryFilter] = useState<string>('ALL');
  const [selectedBenchId, setSelectedBenchId] = useState<string>('BENCH-01');
  const [newObsText, setNewObsText] = useState<string>('');
  const [labAlerts, setLabAlerts] = useState<RDLabAlert[]>(INITIAL_LAB_ALERTS);
  const [labAlertFilter, setLabAlertFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'>('ALL');
  const [showAlertConfigModal, setShowAlertConfigModal] = useState<boolean>(false);
  const [labThresholds, setLabThresholds] = useState({
    maxPressureBar: 70.0,
    maxTempC: 80.0,
    minSaltRejectionPct: 98.0,
    minPermeateFluxLmh: 15.0
  });

  // Cost Comparison Tool & Visualizer State
  const [compPlantTechIds, setCompPlantTechIds] = useState<string[]>(['SWRO', 'MED', 'SOLAR_THERMAL_MD']);
  const [compCapacityM3Day, setCompCapacityM3Day] = useState<number>(20000);
  const [costVisualizerMode, setCostVisualizerMode] = useState<'BAR_CHART' | 'STACKED_TCO' | 'ENERGY_EFFICIENCY' | 'RADAR_SPECTRUM'>('BAR_CHART');

  // Supply Chain Map State
  const [supplyCategoryFilter, setSupplyCategoryFilter] = useState<string>('ALL');
  const [supplyRiskFilter, setSupplyRiskFilter] = useState<string>('ALL');
  const [selectedSupplyCompId, setSelectedSupplyCompId] = useState<string>('SUP-01');

  // Academic Export Logs State
  const [exportScope, setExportScope] = useState<'FULL_BRIEF' | 'LAB_OBSERVATIONS' | 'COST_MATRIX' | 'GEOTECH_REPORT' | 'CITATIONS_BIB'>('FULL_BRIEF');
  const [exportFormat, setExportFormat] = useState<'PDF' | 'JSON' | 'CSV' | 'ACADEMIC_TEXT' | 'BIBTEX'>('PDF');
  const [exportCopied, setExportCopied] = useState<boolean>(false);

  // Selected Plant Tier State
  const [selectedPlantTierId, setSelectedPlantTierId] = useState<string>('plant-medium-02');

  // Custom EPC Estimator State
  const [epcPlantTechTypeId, setEpcPlantTechTypeId] = useState<string>('SWRO');
  const [epcCapacityM3, setEpcCapacityM3] = useState<number>(10000); // m3/day
  const [epcIntakeTech, setEpcIntakeTech] = useState<'SUBSEA_TUNNEL' | 'BEACH_WELLS' | 'SURFACE_VELOCITY_CAP'>('SUBSEA_TUNNEL');
  const [epcPowerSource, setEpcPowerSource] = useState<'SOLAR_HYBRID' | 'GRID' | 'WIND_HYBRID' | 'NUCLEAR_HYBRID'>('SOLAR_HYBRID');
  const [epcRemineralization, setEpcRemineralization] = useState<'WHO_DRINKING' | 'AGRICULTURAL_SAR'>('AGRICULTURAL_SAR');

  // Geotechnical Ground Level Adjustment State
  const [geotechConditionId, setGeotechConditionId] = useState<string>('LIQUEFACTION_SAND');
  const [geotechUnsuitableDepthM, setGeotechUnsuitableDepthM] = useState<number>(25);
  const [geotechStructuralLoadTons, setGeotechStructuralLoadTons] = useState<number>(15000);

  // Water Input & Output Flow & Brine Recycling State
  const [ioIntakeM3Day, setIoIntakeM3Day] = useState<number>(50000); // Raw Ocean Water Intake (m3/day)
  const [ioSalinityPpm, setIoSalinityPpm] = useState<number>(35000); // Raw Ocean Water Salinity (ppm)
  const [ioPrimaryRecoveryPct, setIoPrimaryRecoveryPct] = useState<number>(45); // SWRO Recovery %
  const [ioEnableBrineRecycling, setIoEnableBrineRecycling] = useState<boolean>(true);
  const [ioSelectedRecyclingTechId, setIoSelectedRecyclingTechId] = useState<string>('MINERAL_MINING');

  // Architectural Study Session State
  const [studyModuleIndex, setStudyModuleIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});

  // Institute Filter State
  const [instituteRegion, setInstituteRegion] = useState<'ALL' | 'INDIA' | 'WORLDWIDE'>('ALL');
  const [instituteSearch, setInstituteSearch] = useState<string>('');
  const [expandedInstituteId, setExpandedInstituteId] = useState<string | null>('inst-csmcri');

  // Virtual Lab State
  const [labState, setLabState] = useState<LabExperimentState>({
    rawWaterSalinityPpm: 35000,
    waterTemperatureC: 25,
    feedFlowRateLph: 1000,
    operatingPressureBar: 55,
    membraneType: 'POLYAMIDE_RO',
    dosingCalciumMgL: 45,
    dosingSodiumMgL: 20
  });
  const [labLogs, setLabLogs] = useState<string[]>([
    'Lab Session Initialized: Probe calibrated at 25°C.',
    'Raw Seawater TDS: 35,000 ppm (EC ~ 54,600 µS/cm).'
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Library Filter State
  const [libraryCategory, setLibraryCategory] = useState<string>('ALL');
  const [librarySearch, setLibrarySearch] = useState<string>('');
  const [bookmarkedPaperIds, setBookmarkedPaperIds] = useState<string[]>(['paper-101']);

  // Calculations for Water Input & Output Mass Balance
  const ioPrimaryPermeateM3Day = Math.round(ioIntakeM3Day * (ioPrimaryRecoveryPct / 100));
  const ioPrimaryBrineM3Day = ioIntakeM3Day - ioPrimaryPermeateM3Day;

  // Secondary Recycling Impact
  const ioSecondaryRecoveryBoostPct = ioEnableBrineRecycling ? 18 : 0; // +18% recovery from primary brine
  const ioSecondaryPermeateM3Day = ioEnableBrineRecycling ? Math.round(ioPrimaryBrineM3Day * (ioSecondaryRecoveryBoostPct / 100)) : 0;
  
  const ioTotalPermeateWaterM3Day = ioPrimaryPermeateM3Day + ioSecondaryPermeateM3Day;
  const ioOverallPlantRecoveryPct = Number(((ioTotalPermeateWaterM3Day / ioIntakeM3Day) * 100).toFixed(1));

  const ioFinalWastageBrineM3Day = ioIntakeM3Day - ioTotalPermeateWaterM3Day;
  const ioFinalBrineSalinityPpm = Math.round(ioSalinityPpm / (1 - ioOverallPlantRecoveryPct / 100));

  // Stream Allocation
  const ioPotableDrinkingWaterM3Day = Math.round(ioTotalPermeateWaterM3Day * 0.60);
  const ioAgriIrrigationWaterM3Day = Math.round(ioTotalPermeateWaterM3Day * 0.30);
  const ioIndustrialBoilerWaterM3Day = ioTotalPermeateWaterM3Day - ioPotableDrinkingWaterM3Day - ioAgriIrrigationWaterM3Day;

  // Mineral & Chemical Recovery Estimates (per day)
  const ioTotalSaltIntakeTonnesDay = Number(((ioIntakeM3Day * ioSalinityPpm) / 1000000).toFixed(1));
  const ioLithiumRecoveryKgDay = Number((ioTotalSaltIntakeTonnesDay * 0.05).toFixed(2));
  const ioMagnesiumRecoveryTonnesDay = Number((ioTotalSaltIntakeTonnesDay * 0.038).toFixed(2));
  const ioGypsumRecoveryTonnesDay = Number((ioTotalSaltIntakeTonnesDay * 0.012).toFixed(2));
  const ioChlorAlkaliHypochloriteLitersDay = Math.round(ioFinalWastageBrineM3Day * 1.5);

  // Calculated Results for Desalination Engine
  const saltRejectionRate = labState.membraneType === 'GRAPHENE_MEMBRANE' ? 99.8 : labState.membraneType === 'POLYAMIDE_RO' ? 99.5 : 98.2;
  const permeateTdsPpm = Math.round(labState.rawWaterSalinityPpm * (1 - saltRejectionRate / 100));
  const drinkingWaterTdsPpm = permeateTdsPpm + Math.round(labState.dosingCalciumMgL * 0.8);
  const recoveryRatePercent = Math.min(65, Math.max(35, Math.round((labState.operatingPressureBar / 70) * 55)));
  const permeateFlowLph = Math.round((labState.feedFlowRateLph * recoveryRatePercent) / 100);
  const brineFlowLph = labState.feedFlowRateLph - permeateFlowLph;
  const specificEnergyKwhM3 = Number((3.8 * (labState.operatingPressureBar / 55) * (labState.rawWaterSalinityPpm / 35000)).toFixed(2));
  
  // Agricultural Soft Water SAR Calculation (Sodium Adsorption Ratio)
  const calcNa = Math.max(5, Math.round(permeateTdsPpm * 0.3) + labState.dosingSodiumMgL);
  const calcCa = Math.max(2, Math.round(permeateTdsPpm * 0.1) + labState.dosingCalciumMgL);
  const calcMg = Math.max(1, Math.round(permeateTdsPpm * 0.05));
  const sarIndex = Number((calcNa / Math.sqrt((calcCa + calcMg) / 2)).toFixed(2));
  const sarStatus = sarIndex < 3 ? 'EXCELLENT (Low Sodium Hazard)' : sarIndex < 6 ? 'GOOD (Moderate Hazard)' : 'POOR (High Soil Sodicity Risk)';

  // All Types of Plants Cost Estimator & Geotechnical Calculations
  const selectedPlantTech = ALL_PLANT_TYPES.find(p => p.id === epcPlantTechTypeId) || ALL_PLANT_TYPES[0];
  const selectedGeotechCondition = UNSUITABLE_GROUND_CONDITIONS.find(g => g.id === geotechConditionId) || UNSUITABLE_GROUND_CONDITIONS[0];

  const baseCostPerM3Usd = selectedPlantTech.baseCapexPerM3DayUsd;
  const intakeMultiplier = epcIntakeTech === 'SUBSEA_TUNNEL' ? 1.25 : epcIntakeTech === 'BEACH_WELLS' ? 0.9 : 1.05;
  const powerMultiplier = epcPowerSource === 'SOLAR_HYBRID' ? 1.2 : epcPowerSource === 'NUCLEAR_HYBRID' ? 1.4 : epcPowerSource === 'WIND_HYBRID' ? 1.25 : 1.0;
  const totalCapexUsd = Math.round(epcCapacityM3 * baseCostPerM3Usd * intakeMultiplier * powerMultiplier);
  
  const marineIntakeCost = Math.round((totalCapexUsd * selectedPlantTech.capexBreakdownPct.marineAndIntake) / 100);
  const preTreatmentCost = Math.round((totalCapexUsd * selectedPlantTech.capexBreakdownPct.preTreatment) / 100);
  const highPressureRoCost = Math.round((totalCapexUsd * selectedPlantTech.capexBreakdownPct.coreSeparation) / 100);
  const energyRecoveryCost = Math.round((totalCapexUsd * selectedPlantTech.capexBreakdownPct.energyRecovery) / 100);
  const electricalScadaCost = Math.round((totalCapexUsd * selectedPlantTech.capexBreakdownPct.electricalAndScada) / 100);
  const civilAndLandCost = Math.round((totalCapexUsd * selectedPlantTech.capexBreakdownPct.civilAndLand) / 100);
  const epcMarginCost = Math.round((totalCapexUsd * selectedPlantTech.capexBreakdownPct.epcMargin) / 100);

  const energyCostPerM3 = epcPowerSource === 'SOLAR_HYBRID' ? 0.18 : epcPowerSource === 'NUCLEAR_HYBRID' ? 0.14 : epcPowerSource === 'WIND_HYBRID' ? 0.16 : 0.28;
  const opexPerM3Usd = Number((energyCostPerM3 + 0.14 + 0.08 + 0.06).toFixed(2));
  const annualOpexUsd = Math.round(epcCapacityM3 * 365 * opexPerM3Usd);
  const paybackYears = Number((totalCapexUsd / (epcCapacityM3 * 365 * 1.2 - annualOpexUsd)).toFixed(1));
  const levelizedWaterCostPer1000L = Number((opexPerM3Usd + (totalCapexUsd / (epcCapacityM3 * 365 * 20))).toFixed(3));

  // Geotechnical Adjustment Calculations
  const geotechDepthFactor = geotechUnsuitableDepthM / 20;
  const geotechLoadFactor = Math.sqrt(geotechStructuralLoadTons / 10000);
  const geotechCapexPremiumUsd = Math.round(totalCapexUsd * (selectedGeotechCondition.capexPremiumPct / 100) * geotechDepthFactor * geotechLoadFactor);
  const totalAdjustedCivilCapexUsd = totalCapexUsd + geotechCapexPremiumUsd;


  const toggleBookmark = (id: string) => {
    hapticEngine.trigger('light');
    if (bookmarkedPaperIds.includes(id)) {
      setBookmarkedPaperIds(bookmarkedPaperIds.filter((p) => p !== id));
    } else {
      setBookmarkedPaperIds([...bookmarkedPaperIds, id]);
    }
  };

  const handleRunLabSimulation = () => {
    setIsSimulating(true);
    hapticEngine.trigger('light');
    setTimeout(() => {
      setIsSimulating(false);
      hapticEngine.trigger('success');
      const timestamp = new Date().toLocaleTimeString();
      const newEntry = `[${timestamp}] Trial Run: Pressure ${labState.operatingPressureBar} bar | Flow ${labState.feedFlowRateLph} L/h | Permeate TDS: ${drinkingWaterTdsPpm} ppm | SAR: ${sarIndex} (${sarStatus}) | Energy: ${specificEnergyKwhM3} kWh/m³`;
      setLabLogs([newEntry, ...labLogs.slice(0, 15)]);
    }, 800);
  };

  // Filtered Institutes
  const allInstitutes = [...INDIAN_INSTITUTES, ...WORLDWIDE_INSTITUTES];
  const filteredInstitutes = allInstitutes.filter((inst) => {
    const matchesRegion = instituteRegion === 'ALL' || inst.region === instituteRegion;
    const matchesSearch =
      inst.name.toLowerCase().includes(instituteSearch.toLowerCase()) ||
      inst.shortName.toLowerCase().includes(instituteSearch.toLowerCase()) ||
      inst.city.toLowerCase().includes(instituteSearch.toLowerCase()) ||
      inst.keyFocus.toLowerCase().includes(instituteSearch.toLowerCase()) ||
      inst.studyTitle.toLowerCase().includes(instituteSearch.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Filtered Papers
  const filteredPapers = RESEARCH_PAPERS.filter((paper) => {
    const matchesCat = libraryCategory === 'ALL' || paper.category === libraryCategory;
    const matchesSearch =
      paper.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      paper.authors.toLowerCase().includes(librarySearch.toLowerCase()) ||
      paper.journal.toLowerCase().includes(librarySearch.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(librarySearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activePlantProject = PLANT_BUILD_PROJECTS.find((p) => p.id === selectedPlantTierId) || PLANT_BUILD_PROJECTS[1];

  // Architectural Study Modules
  const STUDY_MODULES = [
    {
      title: 'Module 1: Site Selection & Marine EIA (Environmental Impact Assessment)',
      subtitle: 'Coastal Hydrodynamics, Bathymetry & Marine Ecosystem Preservation',
      content: 'Selecting an optimal coastal site requires evaluating ocean currents, seabed topography (bathymetry), water salinity variations, and proximity to marine sanctuaries. Sub-sea intakes must maintain entrance velocities below 0.15 m/s to prevent entrapment of juvenile fish and plankton.',
      keyTakeaway: 'Low-velocity velocity cap intakes reduce marine organism impingement by >90% compared to surface open channels.'
    },
    {
      title: 'Module 2: Intake & Outfall Brine Diffuser Hydraulics',
      subtitle: 'Brine Plume Dynamics, Negative Buoyancy & Marine Dispersion',
      content: 'Ocean brine discharge is denser than seawater and sinks to the seafloor. Engineers deploy multi-nozzle high-velocity diffusers angled at 60 degrees to jet brine into the water column, achieving rapid 1:30 volumetric dilution within 10 meters of the discharge point.',
      keyTakeaway: '60° inclined diffuser nozzles prevent hypersaline stagnant pooling on delicate benthic coral habitats.'
    },
    {
      title: 'Module 3: Pre-Treatment & Bio-Fouling Prevention',
      subtitle: 'Dissolved Air Flotation (DAF), Sand Filters & Ceramic Ultrafiltration',
      content: 'Pre-treatment protects high-pressure reverse osmosis membranes from particulate clogging and bio-fouling. Modern plants utilize Coagulation + DAF followed by Ceramic Ultrafiltration (UF) to yield a Silt Density Index (SDI15) consistently below 2.0.',
      keyTakeaway: 'Ceramic UF membranes handle oil spills and red tide algae blooms without structural thermal degradation.'
    },
    {
      title: 'Module 4: SWRO High-Pressure Hydraulics & Energy Recovery Devices (ERD)',
      subtitle: 'Isobaric Pressure Exchangers (PX) & High-Flux Graphene Membranes',
      content: 'Reverse osmosis overcomes seawater osmotic pressure (~27 bar at 35,000 ppm) using high-pressure positive displacement pumps operating at 55 to 70 bar. Isobaric Pressure Exchangers transfer pressure from concentrated brine stream directly to raw feed water at 98% efficiency.',
      keyTakeaway: 'Isobaric PX devices reduce plant electricity consumption from 8.0 kWh/m³ to under 3.0 kWh/m³.'
    },
    {
      title: 'Module 5: Post-Treatment Remineralization & Agricultural SAR Buffer',
      subtitle: 'Calcite Contactors, Bicarbonate Buffering & Sodium Adsorption Control',
      content: 'Desalinated permeate is naturally soft and acidic (pH 5.5-6.0). Plants pass permeate through Calcite beds (CaCO3) and inject CO2 to yield mineralized soft water with 40 mg/L Ca²⁺ and SAR < 2.5 for agricultural crop soil health.',
      keyTakeaway: 'Proper remineralization prevents soil sodicity and prevents corrosion in municipal distribution pipelines.'
    },
    {
      title: 'Module 6: Commercial EPC Financial Structuring & PPP BOT Models',
      subtitle: 'CAPEX Amortization, Water Purchase Agreements (WPA) & LCOW Optimization',
      content: 'Large desalination projects are financed through Public-Private Partnerships (PPP) using Build-Operate-Transfer (BOT) contracts. Levelized Cost of Water (LCOW) combines capital amortization (CAPEX) with operational energy, chemical, and maintenance expenses (OPEX).',
      keyTakeaway: '20-year WPA contracts lock in long-term water tariff security for municipal utilities and agricultural cooperatives.'
    }
  ];

  const QUIZ_QUESTIONS = [
    {
      question: 'What is the maximum recommended entrance velocity for sub-sea velocity cap intakes to protect marine life?',
      options: ['0.15 m/s', '1.50 m/s', '3.00 m/s', '5.00 m/s'],
      correctAnswer: 0
    },
    {
      question: 'Which device transfers hydraulic energy from concentrate brine to raw feed water at up to 98% efficiency?',
      options: ['Centrifugal Turbocharger', 'Isobaric Rotary Pressure Exchanger (PX)', 'Pelton Impulse Turbine', 'Submersible Hydro Turbine'],
      correctAnswer: 1
    },
    {
      question: 'Why is post-treatment remineralization (adding Ca²⁺ and HCO₃⁻) essential for agricultural irrigation water?',
      options: ['To increase water boiling point', 'To prevent soil sodicity (high SAR) and plant root calcium deficiency', 'To accelerate salt precipitation', 'To color the water green'],
      correctAnswer: 1
    }
  ];

  const handleSelectQuizOption = (qIdx: number, oIdx: number) => {
    hapticEngine.trigger('light');
    setSelectedQuizAnswers({ ...selectedQuizAnswers, [qIdx]: oIdx });
  };

  const handleCalculateQuizScore = () => {
    hapticEngine.trigger('success');
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedQuizAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    setQuizScore(correct);
  };

  const handleExportPDF = () => {
    hapticEngine.trigger('success');
    const printWindow = window.open('', '_blank', 'width=950,height=900');
    if (!printWindow) {
      alert('Please allow popups to generate and view the PDF report window.');
      return;
    }
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ocean Desalination Portal - Academic & EPC Engineering PDF Brief</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #ffffff; color: #0f172a; padding: 20px; margin: 0; }
            .header { border-bottom: 3px solid #0284c7; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
            .title { font-size: 22px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
            .subtitle { font-size: 13px; color: #0284c7; font-weight: 700; margin-top: 4px; }
            .badge-row { margin-top: 10px; display: flex; gap: 8px; }
            .badge { background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 999px; font-size: 10px; font-weight: 800; text-transform: uppercase; border: 1px solid #bae6fd; }
            .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px; }
            .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
            .meta-item strong { display: block; color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
            .meta-item span { font-size: 14px; font-weight: 800; color: #0f172a; }
            h2 { font-size: 14px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 11px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
            th { background: #f1f5f9; color: #334155; font-weight: 800; text-transform: uppercase; font-size: 10px; }
            tr:nth-child(even) { background: #f8fafc; }
            .callout { font-size: 12px; line-height: 1.6; color: #1e293b; background: #f0f9ff; border-left: 4px solid #0284c7; padding: 14px; border-radius: 6px; margin-top: 16px; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 10px; color: #94a3b8; }
            .print-btn { background: #0284c7; color: white; padding: 10px 20px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; margin-bottom: 20px; }
            @media print { .no-print { display: none !important; } body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="no-print" style="text-align: right;">
            <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
          </div>

          <div class="header">
            <div>
              <div class="title">Ocean Desalination Engineering Portal</div>
              <div class="subtitle">Official Academic Research & Commercial EPC Technical Brief</div>
              <div class="badge-row">
                <span class="badge">IEEE / ISO 14001 Compliant</span>
                <span class="badge">WHO Water Standard</span>
                <span class="badge">20-Year TCO Certified</span>
              </div>
            </div>
            <div style="text-align: right; font-size: 11px; color: #64748b;">
              <div>Issue Date: <strong>${dateStr}</strong></div>
              <div>Report Ref: <strong>DESAL-EPC-${Math.floor(100000 + Math.random() * 900000)}</strong></div>
              <div>Target Capacity: <strong>${epcCapacityM3.toLocaleString()} m³/day</strong></div>
            </div>
          </div>

          <div class="meta-box">
            <div class="meta-grid">
              <div class="meta-item">
                <strong>Plant Tech Architecture</strong>
                <span>${selectedPlantTech.name}</span>
              </div>
              <div class="meta-item">
                <strong>Levelized Cost of Water (LCOW)</strong>
                <span>$${levelizedWaterCostPer1000L} / m³</span>
              </div>
              <div class="meta-item">
                <strong>Total CAPEX Expenditure</strong>
                <span>$${totalCapexUsd.toLocaleString()} USD</span>
              </div>
              <div class="meta-item">
                <strong>Annual OPEX Expense</strong>
                <span>$${annualOpexUsd.toLocaleString()} USD/yr</span>
              </div>
              <div class="meta-item">
                <strong>Energy Intensity</strong>
                <span>${selectedPlantTech.powerIntensityKwhM3} kWh/m³</span>
              </div>
              <div class="meta-item">
                <strong>Geotechnical Condition</strong>
                <span>${selectedGeotechCondition.name}</span>
              </div>
            </div>
          </div>

          <h2>1. EPC Capital Cost (CAPEX) & Subsystem Allocation</h2>
          <table>
            <thead>
              <tr>
                <th>Subsystem Component</th>
                <th>CAPEX Share (%)</th>
                <th>Cost Allocation (USD)</th>
                <th>Engineering Function</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Marine Intake & Outfall Tunnels</td><td>${selectedPlantTech.capexBreakdownPct.marineAndIntake}%</td><td>$${marineIntakeCost.toLocaleString()}</td><td>Sub-sea velocity cap intake & brine dispersion</td></tr>
              <tr><td>Pre-Treatment Skid (DAF + UF)</td><td>${selectedPlantTech.capexBreakdownPct.preTreatment}%</td><td>$${preTreatmentCost.toLocaleString()}</td><td>Dissolved Air Flotation & 0.02 µm ceramic UF</td></tr>
              <tr><td>SWRO High-Pressure Racks</td><td>${selectedPlantTech.capexBreakdownPct.coreSeparation}%</td><td>$${highPressureRoCost.toLocaleString()}</td><td>High-rejection polyamide/graphene vessels</td></tr>
              <tr><td>Energy Recovery Devices (ERD)</td><td>${selectedPlantTech.capexBreakdownPct.energyRecovery}%</td><td>$${energyRecoveryCost.toLocaleString()}</td><td>Isobaric rotary pressure exchangers (98% ERD)</td></tr>
              <tr><td>Electrical Substation & SCADA</td><td>${selectedPlantTech.capexBreakdownPct.electricalAndScada}%</td><td>$${electricalScadaCost.toLocaleString()}</td><td>33kV main transformer & dual PLC automation</td></tr>
              <tr><td>Civil Works & Foundation Slab</td><td>${selectedPlantTech.capexBreakdownPct.civilAndLand}%</td><td>$${civilAndLandCost.toLocaleString()}</td><td>Coastal vibro-flotation soil piling & structural slab</td></tr>
            </tbody>
          </table>

          <h2>2. Active R&D Laboratory Telemetry & Bench Status</h2>
          <table>
            <thead>
              <tr>
                <th>Bench ID</th>
                <th>Rig Name</th>
                <th>Status</th>
                <th>Pressure (bar)</th>
                <th>Temp (°C)</th>
                <th>Rejection (%)</th>
                <th>Flux (LMH)</th>
              </tr>
            </thead>
            <tbody>
              ${labBenches.map(b => `
                <tr>
                  <td><strong>${b.id}</strong></td>
                  <td>${b.name}</td>
                  <td>${b.status}</td>
                  <td>${b.pressureBar} bar</td>
                  <td>${b.temperatureC} °C</td>
                  <td>${b.saltRejectionPct}%</td>
                  <td>${b.permeateFluxLmh} LMH</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h2>3. Geotechnical Foundation Analysis</h2>
          <div class="callout">
            <strong>Ground Condition:</strong> ${selectedGeotechCondition.name}<br/>
            <strong>Engineering Impact:</strong> ${(selectedGeotechCondition as any).description || selectedGeotechCondition.name}<br/>
            <strong>Soil Bearing Target:</strong> ${selectedGeotechCondition.bearingCapacityTargetKpa} kPa | <strong>Civil CAPEX Adjustment:</strong> $${geotechCapexPremiumUsd.toLocaleString()} USD
          </div>

          <h2>4. Active EPC Construction Gantt Milestone Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Milestone ID</th>
                <th>Engineering Phase Name</th>
                <th>Category</th>
                <th>Schedule</th>
                <th>Progress (%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${ganttMilestones.map(m => `
                <tr>
                  <td><strong>${m.id}</strong></td>
                  <td>${m.name}</td>
                  <td>${m.category}</td>
                  <td>Weeks ${m.startWeek} - ${m.startWeek + m.durationWeeks}</td>
                  <td>${m.progressPct}%</td>
                  <td>${m.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="margin-top: 40px; display: flex; justify-content: space-between; font-size: 11px;">
            <div>
              <div>__________________________________________</div>
              <div style="margin-top: 4px; font-weight: bold; color: #475569;">Lead EPC Project Director</div>
            </div>
            <div>
              <div>__________________________________________</div>
              <div style="margin-top: 4px; font-weight: bold; color: #475569;">R&D Research Chair (CSIR-CSMCRI)</div>
            </div>
          </div>

          <div class="footer">
            Ocean Desalination & Engineering Research Portal • Automated Academic Export Document
          </div>

          <script>
            window.onload = function() {
              setTimeout(() => { window.print(); }, 500);
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Top Banner & Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border-b border-cyan-500/30 p-6 sm:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black font-mono uppercase tracking-wider flex items-center space-x-1.5">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span>GLOBAL DESALINATION &amp; WATER SOFTENING PORTAL</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black font-mono uppercase tracking-wider flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>PLANT CONSTRUCTION BUILD PROJECTS &amp; EPC ECONOMICS</span>
              </span>
            </div>

            {/* Header Direct PDF Export Trigger */}
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black font-mono text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all scale-100 hover:scale-[1.03]"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>EXPORT PDF REPORT</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center space-x-3">
            <Droplets className="w-9 h-9 text-cyan-400 shrink-0" />
            <span>Desalination Plant Build Projects, EPC Architecture &amp; Commercial Blueprint</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-4xl leading-relaxed font-sans">
            Complete engineering, architectural, and financial planning blueprint for Portable (25 m³/day), Medium (5,000 m³/day), and Large Mega (200,000 m³/day) ocean water desalination plants. Featuring modern technology stacks, construction build expense calculators, commercial economic feasibility assessments, research institute progress trackers, virtual laboratory simulators, and peer-reviewed scientific publications.
          </p>

          {/* Core Navigation Bar */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
            {[
              { id: 'CAUVERY_DESAL_CASE_STUDY', label: 'Cauvery Basin Desal Case Study (South India)', icon: Landmark, color: 'text-amber-400' },
              { id: 'WATER_IO_BRINE_RECYCLING', label: 'Water Input/Output & Brine Recycling', icon: RefreshCw, color: 'text-teal-400' },
              { id: 'PLANT_ARCHITECTURE_ECONOMICS', label: 'All Plant Types Build Cost Estimator', icon: Building2, color: 'text-emerald-400' },
              { id: 'COST_COMPARISON', label: 'Side-by-Side Cost Comparison Tool', icon: GitCompare, color: 'text-cyan-400' },
              { id: 'STAKE_PORTFOLIO', label: 'Stake Portfolio & APY Vaults', icon: Coins, color: 'text-amber-400' },
              { id: 'PROJECT_GANTT_CHART', label: 'Interactive EPC & R&D Gantt Chart', icon: Calendar, color: 'text-indigo-400' },
              { id: 'GEOTECH_GROUND_ADJUSTMENT', label: 'Unsuitable Ground Engineering Portal', icon: HardHat, color: 'text-amber-400' },
              { id: 'RD_LAB_TRACKING', label: 'R&D Lab Tracking & Rig Experiments', icon: Activity, color: 'text-rose-400' },
              { id: 'SUPPLY_CHAIN_MAP', label: 'Desal Global Supply Chain & Logistics', icon: Truck, color: 'text-orange-400' },
              { id: 'ACADEMIC_EXPORT', label: 'Academic Export Logs & Reports', icon: Download, color: 'text-lime-400' },
              { id: 'INSTITUTES_PROGRESS', label: 'Research Study Portal & Institutes', icon: BookOpen, color: 'text-purple-400' },
              { id: 'LAB_PRACTICE', label: 'Educational Study & Virtual Lab', icon: GraduationCap, color: 'text-blue-400' },
              { id: 'CONVERSION_ENGINE', label: 'Water Softening Engine', icon: Droplets, color: 'text-indigo-400' },
              { id: 'RESEARCH_LIBRARY', label: 'Scientific Library Portal', icon: FileText, color: 'text-violet-400' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    hapticEngine.trigger('light');
                  }}
                  className={`px-4 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all flex items-center space-x-2 border ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* ================= TAB: CAUVERY BASIN DESAL CASE STUDY ================= */}
        {activeTab === 'CAUVERY_DESAL_CASE_STUDY' && <CauveryDesalCaseStudyView />}

        {/* ================= TAB: PLANT ARCHITECTURE & EPC ECONOMICS ================= */}
        {activeTab === 'PLANT_ARCHITECTURE_ECONOMICS' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header & Tier Selector */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-black text-white font-mono flex items-center space-x-2">
                    <Building2 className="w-6 h-6 text-emerald-400" />
                    <span>Modern Desalination Plant Construction Build Tiers</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Select a build project tier to inspect architectural specifications, modern technology stacks, and itemized CAPEX/OPEX breakdowns.
                  </p>
                </div>

                <div className="flex rounded-2xl bg-slate-950 border border-slate-800 p-1 font-mono text-xs">
                  {PLANT_BUILD_PROJECTS.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setSelectedPlantTierId(proj.id);
                        hapticEngine.trigger('light');
                      }}
                      className={`px-3.5 py-2 rounded-xl transition-all ${
                        selectedPlantTierId === proj.id
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {proj.tier === 'PORTABLE' ? '📦 Portable (25 m³)' : proj.tier === 'MEDIUM' ? '🏢 Medium (5,000 m³)' : '🏗️ Mega (200,000 m³)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Plant Tier Detail View */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Key Stats Card */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase">
                        {activePlantProject.tier} BUILD PROJECT
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Timeline: {activePlantProject.buildTimelineMonths} Months</span>
                    </div>

                    <h4 className="text-lg font-black text-white font-mono leading-tight">{activePlantProject.name}</h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{activePlantProject.summary}</p>

                    <div className="space-y-2 font-mono text-xs pt-2">
                      <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Target Output Capacity:</span>
                        <strong className="text-cyan-300">{activePlantProject.capacityLitersPerDay.toLocaleString()} L/Day ({activePlantProject.capacityM3PerDay.toLocaleString()} m³)</strong>
                      </div>

                      <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Est. Construction CAPEX:</span>
                        <strong className="text-emerald-400">${activePlantProject.estCapexUsd.toLocaleString()} USD</strong>
                      </div>

                      <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">OPEX per m³ Water:</span>
                        <strong className="text-amber-300">${activePlantProject.estOpexPerM3Usd} USD / m³</strong>
                      </div>

                      <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Commercial Payback:</span>
                        <strong className="text-purple-300">{activePlantProject.paybackPeriodYears} Years (IRR: {activePlantProject.irrPercent}%)</strong>
                      </div>

                      <div className="flex justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400">Land Footprint Area:</span>
                        <strong className="text-slate-200">{activePlantProject.footprintAreaM2.toLocaleString()} m²</strong>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Technology Stack Specifications */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h5 className="font-black text-white font-mono text-sm flex items-center space-x-2 text-cyan-300">
                      <Cpu className="w-4 h-4" />
                      <span>Modern Engineering Technology Stack</span>
                    </h5>

                    <ul className="space-y-2 text-xs font-sans text-slate-300">
                      {activePlantProject.modernTechStack.map((tech, idx) => (
                        <li key={idx} className="flex items-start space-x-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2 pt-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Intake Engineering</span>
                        <strong className="text-slate-200 text-[11px]">{activePlantProject.intakeTech}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Energy Recovery Device (ERD)</span>
                        <strong className="text-amber-300 text-[11px]">{activePlantProject.energyRecoveryEfficiency}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Power Infrastructure Source</span>
                        <strong className="text-cyan-300 text-[11px]">{activePlantProject.powerSource}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: CAPEX Itemized Construction Expense Breakdown */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h5 className="font-black text-white font-mono text-sm flex items-center space-x-2 text-emerald-300">
                      <Coins className="w-4 h-4" />
                      <span>Construction Build CAPEX Breakdown (%)</span>
                    </h5>

                    <div className="space-y-3 font-mono text-xs">
                      {[
                        { label: 'Marine & Intake Infrastructure', pct: activePlantProject.capexBreakdown.marineAndIntakePercent, color: 'bg-blue-500' },
                        { label: 'Pre-Treatment & Filtration Skids', pct: activePlantProject.capexBreakdown.preTreatmentPercent, color: 'bg-purple-500' },
                        { label: 'High Pressure SWRO Skids & Vessels', pct: activePlantProject.capexBreakdown.highPressureRoPercent, color: 'bg-cyan-500' },
                        { label: 'Isobaric Energy Recovery (ERD)', pct: activePlantProject.capexBreakdown.energyRecoveryPercent, color: 'bg-amber-500' },
                        { label: 'Electrical, Substation & SCADA IoT', pct: activePlantProject.capexBreakdown.electricalAndScadaPercent, color: 'bg-emerald-500' },
                        { label: 'Civil Structures & Land Works', pct: activePlantProject.capexBreakdown.civilAndLandPercent, color: 'bg-indigo-500' },
                        { label: 'EPC Engineering, Permits & Margin', pct: activePlantProject.capexBreakdown.epcAndLicensingPercent, color: 'bg-pink-500' }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[11px] text-slate-300">
                            <span>{item.label}:</span>
                            <strong className="text-white">{item.pct}% (${Math.round((activePlantProject.estCapexUsd * item.pct) / 100).toLocaleString()})</strong>
                          </div>
                          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-sans">
                      <strong className="text-emerald-400 block font-mono mb-1">Architectural Highlights:</strong>
                      <ul className="list-disc pl-4 space-y-1">
                        {activePlantProject.architecturalHighlights.map((hl, i) => (
                          <li key={i}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive EPC Build Expenses & Economics Estimator */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                <div>
                  <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                    <Sliders className="w-5 h-5 text-emerald-400" />
                    <span>Interactive EPC Construction Expense &amp; Economics Estimator</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Customize plant daily capacity, intake marine technology, power source, and water output grade to generate an itemized economic assessment.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                    COMMERCIAL BOT &amp; WPA MODEL
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono text-xs">
                {/* Control 0: Plant Technology Type */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
                  <label className="text-emerald-400 text-[11px] font-bold block flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Desalination Plant Tech Type:</span>
                  </label>
                  <select
                    value={epcPlantTechTypeId}
                    onChange={(e) => {
                      setEpcPlantTechTypeId(e.target.value as any);
                      hapticEngine.trigger('light');
                    }}
                    className="w-full bg-slate-900 border border-emerald-500/30 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                  >
                    {ALL_PLANT_TYPES.map((pt) => (
                      <option key={pt.id} value={pt.id}>
                        {pt.name} (${pt.baseCapexPerM3DayUsd}/m³)
                      </option>
                    ))}
                  </select>
                  <span className="text-[9px] text-emerald-400/80 block font-sans">{selectedPlantTech.category}</span>
                </div>

                {/* Control 1: Capacity Slider */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <label className="text-slate-400 text-[11px]">Daily Target Capacity:</label>
                    <span className="font-bold text-emerald-300">{epcCapacityM3.toLocaleString()} m³/day</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="500"
                    value={epcCapacityM3}
                    onChange={(e) => setEpcCapacityM3(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <span className="text-[9px] text-slate-500 block">Equivalent to {(epcCapacityM3 * 1000).toLocaleString()} Liters/Day</span>
                </div>

                {/* Control 2: Intake Marine Tech */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-slate-400 text-[11px] block">Ocean Intake Technology:</label>
                  <select
                    value={epcIntakeTech}
                    onChange={(e) => setEpcIntakeTech(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                  >
                    <option value="SUBSEA_TUNNEL">3.0 km Subsea Intake Tunnel (+25% CAPEX)</option>
                    <option value="SURFACE_VELOCITY_CAP">Surface Velocity Cap Intake (+5% CAPEX)</option>
                    <option value="BEACH_WELLS">Sub-surface Beach Infiltration Wells (-10% CAPEX)</option>
                  </select>
                  <span className="text-[9px] text-slate-500 block">Determines marine environmental &amp; civil cost</span>
                </div>

                {/* Control 3: Power Source */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-slate-400 text-[11px] block">Energy Infrastructure Source:</label>
                  <select
                    value={epcPowerSource}
                    onChange={(e) => setEpcPowerSource(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                  >
                    <option value="SOLAR_HYBRID">Coastal Solar PV + Grid Hybrid ($0.18/m³ Energy OPEX)</option>
                    <option value="WIND_HYBRID">Offshore Wind Microgrid ($0.16/m³ Energy OPEX)</option>
                    <option value="NUCLEAR_HYBRID">Nuclear Waste-Heat Co-Gen ($0.14/m³ Energy OPEX)</option>
                    <option value="GRID">Standard Municipal Power Grid ($0.28/m³ Energy OPEX)</option>
                  </select>
                  <span className="text-[9px] text-slate-500 block">Directly impacts annual OPEX &amp; carbon tariff</span>
                </div>

                {/* Control 4: Remineralization Grade */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-slate-400 text-[11px] block">Water Remineralization Grade:</label>
                  <select
                    value={epcRemineralization}
                    onChange={(e) => setEpcRemineralization(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                  >
                    <option value="AGRICULTURAL_SAR">Agricultural Fertigation Grade (SAR &lt; 2.5, Low Na+)</option>
                    <option value="WHO_DRINKING">WHO Potable Drinking Water Grade (TDS &lt; 200 ppm)</option>
                  </select>
                  <span className="text-[9px] text-slate-500 block">Configures post-treatment chemical dosing</span>
                </div>
              </div>

              {/* Selected Plant Tech Highlight Info Banner */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      {selectedPlantTech.badge}
                    </span>
                    <strong className="text-white text-sm">{selectedPlantTech.name}</strong>
                  </div>
                  <p className="text-slate-400 text-[11px] font-sans">{selectedPlantTech.description}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0 text-[11px]">
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-500 block">Energy Intensity</span>
                    <strong className="text-amber-300">{selectedPlantTech.powerIntensityKwhM3} kWh/m³</strong>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-500 block">Recovery Yield</span>
                    <strong className="text-teal-300">{selectedPlantTech.typicalRecoveryPct}%</strong>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-500 block">Design Lifespan</span>
                    <strong className="text-purple-300">{selectedPlantTech.lifespanYears} Years</strong>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-500 block">Base CAPEX Rate</span>
                    <strong className="text-emerald-300">${selectedPlantTech.baseCapexPerM3DayUsd}/m³</strong>
                  </div>
                </div>
              </div>

              {/* Economic Assessment Dashboard Output */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Estimated Total CAPEX</span>
                  <div className="text-xl font-black text-emerald-400">${totalCapexUsd.toLocaleString()} USD</div>
                  <span className="text-[9px] text-slate-400 font-sans">Complete Turnkey Construction</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Levelized Cost of Water</span>
                  <div className="text-xl font-black text-cyan-300">${levelizedWaterCostPer1000L} / 1,000 L</div>
                  <span className="text-[9px] text-slate-400 font-sans">${opexPerM3Usd} / m³ Direct OPEX</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Annual Operating OPEX</span>
                  <div className="text-xl font-black text-amber-300">${annualOpexUsd.toLocaleString()} USD/yr</div>
                  <span className="text-[9px] text-slate-400 font-sans">Energy, Membranes, Dosing &amp; Labor</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Commercial Payback</span>
                  <div className="text-xl font-black text-purple-300">{paybackYears} Years</div>
                  <span className="text-[9px] text-purple-300/80 font-sans font-bold">20-Yr WPA Contract Model</span>
                </div>
              </div>

              {/* Detailed Itemized Expense Breakdown Table */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-bold text-white flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Itemized Construction Build Expenses &amp; Economics Blueprint</span>
                  </span>
                  <span className="text-[10px] text-emerald-400">Capacity: {epcCapacityM3.toLocaleString()} m³/day</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block">Marine Intake &amp; Diffuser Pipeline</span>
                    <strong className="text-white text-xs">${marineIntakeCost.toLocaleString()} USD</strong>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block">Pre-treatment DAF &amp; Ultrafiltration</span>
                    <strong className="text-white text-xs">${preTreatmentCost.toLocaleString()} USD</strong>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block">High Pressure SWRO Racks &amp; Vessels</span>
                    <strong className="text-white text-xs">${highPressureRoCost.toLocaleString()} USD</strong>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block">Isobaric Pressure Exchanger (PX) Skids</span>
                    <strong className="text-white text-xs">${energyRecoveryCost.toLocaleString()} USD</strong>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block">Electrical Substation &amp; SCADA Telemetry</span>
                    <strong className="text-white text-xs">${electricalScadaCost.toLocaleString()} USD</strong>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 block">Civil Buildings, Foundation &amp; EPC Contingency</span>
                    <strong className="text-white text-xs">${(civilAndLandCost + epcMarginCost).toLocaleString()} USD</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: GEOTECHNICALLY VARIABLE GROUND LEVEL UNSUITABLE CONDITIONS & ENGINEERING APPLICATION PORTAL ================= */}
        {activeTab === 'GEOTECH_GROUND_ADJUSTMENT' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <HardHat className="w-4 h-4 text-amber-400" />
                    <span>Geotechnical Marine Civil Engineering &amp; Sub-Surface Soil Stabilization</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    Geographically Variable Unsuitable Ground Level Adjustment &amp; Technology Portal
                  </h2>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center space-x-1">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>ISO 19901 / EUROCODE 7 GEOTECH STANDARDS</span>
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
                Desalination mega-structures (high-pressure pump halls, subsea intake micro-tunnels, chemical dosing tanks) exert massive concentrated structural dead loads (10,000–50,000 tonnes). Building on unstable, liquefiable, soft marine mud, or karst limestone ground requires scientific sub-surface ground adjustment and advanced civil engineering technologies to prevent catastrophic differential settling and pipeline shear.
              </p>
            </div>

            {/* Ground Level Unsuitable Condition Selector */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                <div>
                  <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                    <Layers3 className="w-5 h-5 text-amber-400" />
                    <span>Select Coastal &amp; In-Land Unsuitable Ground Condition</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Analyze specific geotechnical soil hazards, raw bearing capacity, liquefaction risk, and required scientific mitigation technologies.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Showing <strong className="text-amber-400">{UNSUITABLE_GROUND_CONDITIONS.length}</strong> Scientific Ground Profiling Models
                </span>
              </div>

              {/* Grid of 7 Unsuitable Ground Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                {UNSUITABLE_GROUND_CONDITIONS.map((gc) => {
                  const isSelected = gc.id === geotechConditionId;
                  return (
                    <button
                      key={gc.id}
                      onClick={() => {
                        setGeotechConditionId(gc.id);
                        hapticEngine.trigger('light');
                      }}
                      className={`p-5 rounded-2xl text-left transition-all space-y-3 border ${
                        isSelected
                          ? 'bg-slate-950 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400'
                          : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${gc.severityColor}`}>
                          {gc.severityBadge}
                        </span>
                        <span className="text-[10px] text-slate-500">{gc.category}</span>
                      </div>

                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{gc.name}</h4>
                        <p className="text-[11px] text-slate-400 font-sans line-clamp-2 mt-1">{gc.riskSummary}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[10px]">
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block">Raw Soil Capacity</span>
                          <strong className="text-red-400 text-xs">{gc.bearingCapacityRawKpa} kPa</strong>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block">Civil CAPEX Premium</span>
                          <strong className="text-amber-300 text-xs">+{gc.capexPremiumPct}% Civil</strong>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Geotechnical Ground Adjustment Simulator */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                    <Sliders className="w-5 h-5 text-amber-400" />
                    <span>Scientific Ground Level Adjustment Calculator &amp; Civil Impact</span>
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                    ACTIVE: {selectedGeotechCondition.name}
                  </span>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                {/* Slider 1: Soil Depth */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-300 font-bold">Unsuitable Soil Layer Depth:</label>
                    <span className="text-amber-300 font-bold text-base">{geotechUnsuitableDepthM} Meters</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={geotechUnsuitableDepthM}
                    onChange={(e) => setGeotechUnsuitableDepthM(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Shallow Silt (5m)</span>
                    <span>Standard Marine Bed (25m)</span>
                    <span>Deep Delta Mud (60m)</span>
                  </div>
                </div>

                {/* Slider 2: Plant Structural Load */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-300 font-bold">Desal Plant Total Dead Load:</label>
                    <span className="text-cyan-300 font-bold text-base">{geotechStructuralLoadTons.toLocaleString()} Tonnes</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={geotechStructuralLoadTons}
                    onChange={(e) => setGeotechStructuralLoadTons(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Skid Skid (500t)</span>
                    <span>Medium Plant (15,000t)</span>
                    <span>Mega Desal City (50,000t)</span>
                  </div>
                </div>
              </div>

              {/* Geotechnical Outputs Dashboard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Raw vs Engineered Capacity</span>
                  <div className="text-lg font-black text-amber-300">
                    {selectedGeotechCondition.bearingCapacityRawKpa} → {selectedGeotechCondition.bearingCapacityTargetKpa} kPa
                  </div>
                  <span className="text-[9px] text-emerald-400 font-sans">10x Soil Strengthening Achieved</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Expected Soil Settlement</span>
                  <div className="text-lg font-black text-red-400 line-through">
                    {Math.round(selectedGeotechCondition.settlementUnadjustedMm * geotechDepthFactor)} mm
                  </div>
                  <span className="text-[10px] font-bold text-emerald-300 font-sans">
                    Reduced to &lt; {selectedGeotechCondition.settlementAdjustedMm} mm Post-Adjustment
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Geotech Ground CAPEX Premium</span>
                  <div className="text-lg font-black text-purple-300">
                    +${geotechCapexPremiumUsd.toLocaleString()} USD
                  </div>
                  <span className="text-[9px] text-slate-400 font-sans">
                    {((geotechCapexPremiumUsd / totalCapexUsd) * 100).toFixed(1)}% Ground Premium Factor
                  </span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Adjusted Total Civil CAPEX</span>
                  <div className="text-lg font-black text-emerald-400">
                    ${totalAdjustedCivilCapexUsd.toLocaleString()} USD
                  </div>
                  <span className="text-[9px] text-emerald-300/80 font-sans font-bold">100% Foundation Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Deep-Dive Technology Application & Engineering Standards Matrix */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                  <Wrench className="w-5 h-5 text-amber-400" />
                  <span>Scientific Engineering &amp; Technology Application Matrix: {selectedGeotechCondition.name}</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Detailed technical solutions, machinery specifications, and international building codes for overcoming this specific ground hazard.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
                {selectedGeotechCondition.engineeringSolutions.map((sol, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                          0{index + 1}
                        </span>
                        <h4 className="font-bold text-white text-sm">{sol.title}</h4>
                      </div>

                      <p className="text-slate-300 text-xs font-sans leading-relaxed">{sol.description}</p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-slate-800 text-[11px]">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-0.5">
                        <span className="text-[10px] text-amber-400 block font-bold">Machinery &amp; Tech Stack:</span>
                        <span className="text-slate-300 font-sans">{sol.techStack}</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-0.5">
                        <span className="text-[10px] text-emerald-400 block font-bold">ISO / ASTM Standard:</span>
                        <span className="text-slate-300 font-sans">{sol.standards}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mitigation Summary Banner */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center space-x-3 text-emerald-300 text-xs font-mono">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-white font-bold">Scientific Mitigation Outcome:</strong>
                  <span className="font-sans text-emerald-200">{selectedGeotechCondition.mitigationImpact}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: COST COMPARISON TOOL ================= */}
        {activeTab === 'COST_COMPARISON' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <GitCompare className="w-4 h-4 text-cyan-400" />
                    <span>Multi-Technology Side-by-Side Financial &amp; Performance Comparator</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    Desalination Cost Comparison &amp; TCO Optimization Engine
                  </h2>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                    <span>20-YEAR LIFE CYCLE TCO MODEL</span>
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
                Compare initial capital expenditure (CAPEX), annual operational cost (OPEX), energy intensity (kWh/m³), land footprint (m²), recovery yield (%), and Levelized Cost of Water (LCOW) across all 9 primary desalination architectures for any custom municipal or industrial plant capacity.
              </p>
            </div>

            {/* Plant Capacity & Selection Panel */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                {/* Capacity Slider */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-300 font-bold">Comparison Target Plant Capacity:</label>
                    <span className="text-cyan-300 font-bold text-base">{compCapacityM3Day.toLocaleString()} m³/day</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={compCapacityM3Day}
                    onChange={(e) => setCompCapacityM3Day(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Small (1,000 m³/d)</span>
                    <span>Medium (25,000 m³/d)</span>
                    <span>Mega (100,000 m³/d)</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <label className="text-slate-300 font-bold block">Capacity Presets:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: '5,000 m³/d', val: 5000 },
                      { label: '20,000 m³/d', val: 20000 },
                      { label: '50,000 m³/d', val: 50000 }
                    ].map((p) => (
                      <button
                        key={p.val}
                        onClick={() => setCompCapacityM3Day(p.val)}
                        className={`p-2 rounded-xl text-[11px] font-bold border transition-all ${
                          compCapacityM3Day === p.val
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technology Checkboxes */}
              <div className="space-y-3">
                <label className="text-xs text-slate-300 font-mono font-bold block">
                  Select Desalination Plant Technologies to Compare (Max 4):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 font-mono text-xs">
                  {ALL_PLANT_TYPES.map((tech) => {
                    const isChecked = compPlantTechIds.includes(tech.id);
                    return (
                      <button
                        key={tech.id}
                        onClick={() => {
                          hapticEngine.trigger('light');
                          if (isChecked) {
                            if (compPlantTechIds.length > 1) {
                              setCompPlantTechIds(compPlantTechIds.filter((id) => id !== tech.id));
                            }
                          } else {
                            if (compPlantTechIds.length < 4) {
                              setCompPlantTechIds([...compPlantTechIds, tech.id]);
                            }
                          }
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="truncate">{tech.name.split('(')[0]}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                          isChecked ? 'bg-cyan-400 text-slate-950 border-cyan-300' : 'border-slate-700'
                        }`}>
                          {isChecked && '✓'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Side-by-Side Comparison Grid */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2 border-b border-slate-800 pb-4">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <span>Side-by-Side Financial &amp; Technical Comparison Matrix</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
                {compPlantTechIds.map((techId) => {
                  const tech = ALL_PLANT_TYPES.find((t) => t.id === techId);
                  if (!tech) return null;

                  const totalCapexUsd = compCapacityM3Day * tech.baseCapexPerM3DayUsd;
                  const opexPerM3Usd = Number(((tech.powerIntensityKwhM3 * 0.08) + 0.18).toFixed(2));
                  const annualOpexUsd = Math.round(compCapacityM3Day * 365 * opexPerM3Usd);
                  const tco20YearUsd = totalCapexUsd + (annualOpexUsd * 20);
                  const lcowPer1000L = Number((opexPerM3Usd + (totalCapexUsd / (compCapacityM3Day * 365 * 20))).toFixed(3));
                  const footprintM2 = Math.round((compCapacityM3Day / 10000) * tech.footprintM2Per10kM3);

                  return (
                    <div key={tech.id} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                            {tech.badge}
                          </span>
                          <span className="text-[10px] text-slate-500">{tech.category}</span>
                        </div>

                        <h4 className="font-bold text-white text-base">{tech.name}</h4>
                        <p className="text-slate-400 text-xs font-sans line-clamp-2">{tech.description}</p>

                        {/* Metric Highlights */}
                        <div className="space-y-2 pt-2">
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                            <span className="text-slate-400">Initial CAPEX:</span>
                            <strong className="text-emerald-400 text-sm">${totalCapexUsd.toLocaleString()} USD</strong>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                            <span className="text-slate-400">Annual OPEX:</span>
                            <strong className="text-amber-300 text-sm">${annualOpexUsd.toLocaleString()} /yr</strong>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                            <span className="text-slate-400">Levelized Cost (LCOW):</span>
                            <strong className="text-cyan-300 text-sm">${lcowPer1000L} / m³</strong>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                            <span className="text-slate-400">20-Year Total TCO:</span>
                            <strong className="text-purple-300 text-sm">${tco20YearUsd.toLocaleString()} USD</strong>
                          </div>
                        </div>
                      </div>

                      {/* Technical Specs Footer */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-3 border-t border-slate-800">
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block">Energy Intensity</span>
                          <strong className="text-amber-400 text-xs">{tech.powerIntensityKwhM3} kWh/m³</strong>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block">Recovery Yield</span>
                          <strong className="text-teal-300 text-xs">{tech.typicalRecoveryPct}% Permeate</strong>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block">Plant Footprint</span>
                          <strong className="text-slate-300 text-xs">{footprintM2.toLocaleString()} m²</strong>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block">Design Lifespan</span>
                          <strong className="text-emerald-300 text-xs">{tech.lifespanYears} Years</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Cost Comparison Visualizer Engine */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div>
                  <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-cyan-400" />
                    <span>Interactive Cost Comparison Visualizer &amp; Analytics</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Visual comparative analytics across selected desalination architectures at {compCapacityM3Day.toLocaleString()} m³/day capacity.
                  </p>
                </div>

                {/* Visualizer Mode Switcher */}
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {[
                    { id: 'BAR_CHART', label: 'CAPEX vs TCO', icon: BarChart3 },
                    { id: 'STACKED_TCO', label: 'LCOW per m³', icon: DollarSign },
                    { id: 'ENERGY_EFFICIENCY', label: 'Energy & Recovery', icon: Activity },
                    { id: 'RADAR_SPECTRUM', label: 'Radar Comparison', icon: GitCompare }
                  ].map((mode) => {
                    const ModeIcon = mode.icon;
                    const isActive = costVisualizerMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setCostVisualizerMode(mode.id as any);
                          hapticEngine.trigger('light');
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all border ${
                          isActive
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <ModeIcon className="w-3.5 h-3.5" />
                        <span>{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chart Rendering Stage */}
              <div className="h-80 w-full bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  {costVisualizerMode === 'BAR_CHART' ? (
                    <BarChart
                      data={compPlantTechIds.map(id => {
                        const t = ALL_PLANT_TYPES.find(p => p.id === id);
                        if (!t) return null;
                        const capexMUsd = Number(((compCapacityM3Day * t.baseCapexPerM3DayUsd) / 1000000).toFixed(2));
                        const opexPerM3 = (t.powerIntensityKwhM3 * 0.08) + 0.18;
                        const tco20YrMUsd = Number(((compCapacityM3Day * t.baseCapexPerM3DayUsd + (compCapacityM3Day * 365 * opexPerM3 * 20)) / 1000000).toFixed(2));
                        return {
                          name: (t as any).shortName || t.name.split('(')[0],
                          'Initial CAPEX ($M)': capexMUsd,
                          '20-Yr TCO ($M)': tco20YrMUsd
                        };
                      }).filter(Boolean) as any[]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="M" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                      <Legend />
                      <Bar dataKey="Initial CAPEX ($M)" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="20-Yr TCO ($M)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : costVisualizerMode === 'STACKED_TCO' ? (
                    <BarChart
                      data={compPlantTechIds.map(id => {
                        const t = ALL_PLANT_TYPES.find(p => p.id === id);
                        if (!t) return null;
                        const totalCapex = compCapacityM3Day * t.baseCapexPerM3DayUsd;
                        const opexPerM3 = (t.powerIntensityKwhM3 * 0.08) + 0.18;
                        const capexPerM3 = totalCapex / (compCapacityM3Day * 365 * 20);
                        return {
                          name: (t as any).shortName || t.name.split('(')[0],
                          'CAPEX Amortization ($/m³)': Number(capexPerM3.toFixed(3)),
                          'Direct OPEX ($/m³)': Number(opexPerM3.toFixed(3))
                        };
                      }).filter(Boolean) as any[]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="$" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                      <Legend />
                      <Bar dataKey="CAPEX Amortization ($/m³)" stackId="a" fill="#8b5cf6" />
                      <Bar dataKey="Direct OPEX ($/m³)" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : costVisualizerMode === 'ENERGY_EFFICIENCY' ? (
                    <BarChart
                      data={compPlantTechIds.map(id => {
                        const t = ALL_PLANT_TYPES.find(p => p.id === id);
                        if (!t) return null;
                        return {
                          name: (t as any).shortName || t.name.split('(')[0],
                          'Energy (kWh/m³)': t.powerIntensityKwhM3,
                          'Recovery Yield (%)': t.typicalRecoveryPct
                        };
                      }).filter(Boolean) as any[]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                      <Legend />
                      <Bar dataKey="Energy (kWh/m³)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Recovery Yield (%)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : (
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={[
                        { metric: 'CAPEX Economy', ...Object.fromEntries(compPlantTechIds.map(id => { const t = ALL_PLANT_TYPES.find(p => p.id === id); return [id, Math.round(100 - (t?.baseCapexPerM3DayUsd || 1000) / 30)]; })) },
                        { metric: 'Energy Efficiency', ...Object.fromEntries(compPlantTechIds.map(id => { const t = ALL_PLANT_TYPES.find(p => p.id === id); return [id, Math.round(100 - (t?.powerIntensityKwhM3 || 5) * 12)]; })) },
                        { metric: 'Recovery Yield', ...Object.fromEntries(compPlantTechIds.map(id => { const t = ALL_PLANT_TYPES.find(p => p.id === id); return [id, (t?.typicalRecoveryPct || 40) * 1.3]; })) },
                        { metric: 'Compact Footprint', ...Object.fromEntries(compPlantTechIds.map(id => { const t = ALL_PLANT_TYPES.find(p => p.id === id); return [id, Math.round(100 - (t?.footprintM2Per10kM3 || 5000) / 100)]; })) },
                        { metric: 'Design Lifespan', ...Object.fromEntries(compPlantTechIds.map(id => { const t = ALL_PLANT_TYPES.find(p => p.id === id); return [id, (t?.lifespanYears || 20) * 3.3]; })) }
                      ]}
                    >
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="metric" stroke="#cbd5e1" tick={{ fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                      {compPlantTechIds.map((id, index) => {
                        const colors = ['#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
                        const t = ALL_PLANT_TYPES.find(p => p.id === id);
                        return (
                          <Radar
                            key={id}
                            name={(t as any)?.shortName || id}
                            dataKey={id}
                            stroke={colors[index % colors.length]}
                            fill={colors[index % colors.length]}
                            fillOpacity={0.2}
                          />
                        );
                      })}
                      <Legend />
                    </RadarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: DESAL STAKING & APY PORTFOLIO ================= */}
        {activeTab === 'STAKE_PORTFOLIO' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header & Global Auto-Stake Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span>Desal Infrastructure Capital &amp; R&amp;D Staking Portfolio</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    Stake Portfolio View &amp; Compound APY Vaults
                  </h2>
                </div>

                {/* Top Action Toolbar */}
                <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
                  {/* Tutorial Button */}
                  <button
                    onClick={() => {
                      setShowTutorialModal(true);
                      hapticEngine.trigger('light');
                    }}
                    className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold rounded-xl flex items-center space-x-1.5 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Staking Tutorial</span>
                  </button>

                  {/* Master Auto-Stake Switch */}
                  <button
                    onClick={() => {
                      const nextState = !globalAutoStake;
                      setGlobalAutoStake(nextState);
                      setStakePools(stakePools.map(p => ({ ...p, isAutoStaked: nextState })));
                      hapticEngine.trigger('medium');
                    }}
                    className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2.5 transition-all border shadow-lg ${
                      globalAutoStake
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-amber-400 shadow-amber-500/20 scale-[1.02]'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${globalAutoStake ? 'animate-spin text-slate-950' : 'text-slate-500'}`} />
                    <div className="text-left leading-tight">
                      <span className="block text-[9px] uppercase tracking-wider font-extrabold opacity-80">Global Auto-Stake</span>
                      <span className="text-xs font-black">{globalAutoStake ? 'ENABLED (Compounding ON)' : 'DISABLED (Linear Yield)'}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowStakeModal(true);
                      hapticEngine.trigger('light');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5 transition-all scale-100 hover:scale-105"
                  >
                    <Plus className="w-4 h-4 text-slate-950" />
                    <span>Deposit &amp; Stake Capital</span>
                  </button>
                </div>
              </div>

              {/* Sub-Navigation Tabs Bar */}
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto font-mono text-xs">
                <button
                  onClick={() => { setStakingSubTab('VAULTS_PORTFOLIO'); hapticEngine.trigger('light'); }}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 border transition-all ${
                    stakingSubTab === 'VAULTS_PORTFOLIO'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>Vaults &amp; Yield Simulator</span>
                </button>

                <button
                  onClick={() => { setStakingSubTab('NEWSFEED'); hapticEngine.trigger('light'); }}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 border transition-all ${
                    stakingSubTab === 'NEWSFEED'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Newspaper className="w-4 h-4 text-cyan-400" />
                  <span>Staking Newsfeed</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                    {stakingNews.length}
                  </span>
                </button>

                <button
                  onClick={() => { setStakingSubTab('ALERTS_HISTORY'); hapticEngine.trigger('light'); }}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 border transition-all ${
                    stakingSubTab === 'ALERTS_HISTORY'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <History className="w-4 h-4 text-emerald-400" />
                  <span>Alerts &amp; Audit History</span>
                  {stakingAlerts.filter(a => !a.isRead).length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-bold animate-pulse">
                      {stakingAlerts.filter(a => !a.isRead).length} NEW
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { setStakingSubTab('TUTORIAL'); hapticEngine.trigger('light'); }}
                  className={`px-4 py-2 rounded-xl font-bold flex items-center space-x-2 border transition-all ${
                    stakingSubTab === 'TUTORIAL'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Staking Tutorial Guide</span>
                </button>
              </div>

              {/* Portfolio Key Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Total Capital Staked</span>
                    <PiggyBank className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    ${stakePools.reduce((sum, p) => sum + p.userStakedUsd, 0).toLocaleString()} <span className="text-xs text-slate-400 font-normal">USD</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 block font-sans">Across {stakePools.filter(p => p.userStakedUsd > 0).length} Active Vault Pools</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Cumulative Yield Earned</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-300">
                    +${stakePools.reduce((sum, p) => sum + p.userEarnedYieldUsd, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-slate-400 font-normal">USD</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-sans">Real-time accrued yield rewards</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Weighted Portfolio APY</span>
                    <Percent className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-cyan-300">
                    {(() => {
                      const totalStaked = stakePools.reduce((sum, p) => sum + p.userStakedUsd, 0);
                      if (totalStaked === 0) return '0.0%';
                      const weighted = stakePools.reduce((sum, p) => sum + (p.userStakedUsd * p.apyPct), 0) / totalStaked;
                      return `${weighted.toFixed(1)}% APY`;
                    })()}
                  </div>
                  <span className="text-[10px] text-amber-400 block font-sans">Auto-compounding active multiplier</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Auto-Stake Network Status</span>
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-lg font-black text-white flex items-center space-x-2 mt-1">
                    <span className={`w-3 h-3 rounded-full ${globalAutoStake ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                    <span>{globalAutoStake ? 'ACTIVE (100%)' : 'PAUSED'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-sans">Automatic 24/7 reward restaking</span>
                </div>
              </div>
            </div>

            {/* Deposit / Stake Modal */}
            {showStakeModal && (
              <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/50 space-y-5 font-mono text-xs animate-fade-in shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-black text-white">Deposit Capital into Desalination Staking Vault</h3>
                  </div>
                  <button onClick={() => setShowStakeModal(false)} className="text-slate-500 hover:text-white font-bold text-sm">✕</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-[11px] font-bold">Select Staking Vault Pool:</label>
                    <select
                      value={modalStakePoolId}
                      onChange={(e) => setModalStakePoolId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold"
                    >
                      {stakePools.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.apyPct}% APY - {p.badge})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-[11px] font-bold">Stake Deposit Amount ($ USD):</label>
                    <input
                      type="number"
                      step="250"
                      min="100"
                      value={modalStakeAmount}
                      onChange={(e) => setModalStakeAmount(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white font-bold"
                    />
                  </div>
                </div>

                {(() => {
                  const targetPool = stakePools.find(p => p.id === modalStakePoolId);
                  if (!targetPool) return null;
                  const estEstYearlyYield = (modalStakeAmount * targetPool.apyPct) / 100;
                  return (
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-slate-300">
                        <span>Vault Name: <strong className="text-white">{targetPool.name}</strong></span>
                        <span className="text-amber-400 font-bold">{targetPool.apyPct}% APY</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>Lockup Requirement: <strong className="text-white">{targetPool.lockPeriodDays === 0 ? 'No Lock (Instant Unstake)' : `${targetPool.lockPeriodDays} Days`}</strong></span>
                        <span>Est. 1-Yr Rewards: <strong className="text-emerald-300">+${estEstYearlyYield.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</strong></span>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setShowStakeModal(false)}
                    className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (modalStakeAmount <= 0) return;
                      hapticEngine.trigger('success');
                      setStakePools(stakePools.map(p => {
                        if (p.id === modalStakePoolId) {
                          return {
                            ...p,
                            userStakedUsd: p.userStakedUsd + modalStakeAmount,
                            totalPoolStakedUsd: p.totalPoolStakedUsd + modalStakeAmount
                          };
                        }
                        return p;
                      }));
                      setShowStakeModal(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl"
                  >
                    Confirm Stake Deposit
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Tutorial Modal Popup */}
            {showTutorialModal && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-in font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-6 h-6 text-amber-400" />
                      <h3 className="text-xl font-black text-white font-mono">Desalination Capital Staking Interactive Guide</h3>
                    </div>
                    <button
                      onClick={() => setShowTutorialModal(false)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                    >
                      Close ✕
                    </button>
                  </div>

                  {/* Step Progress Dots */}
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-4">
                    {STAKING_TUTORIAL_STEPS.map((s) => (
                      <button
                        key={s.stepNum}
                        onClick={() => {
                          setCurrentTutorialStep(s.stepNum);
                          hapticEngine.trigger('light');
                        }}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all ${
                          currentTutorialStep === s.stepNum
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                            : 'bg-slate-950 text-slate-500 border-slate-800'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                          {s.stepNum}
                        </span>
                        <span className="hidden sm:inline">Step {s.stepNum}</span>
                      </button>
                    ))}
                  </div>

                  {/* Tutorial Step Body */}
                  {(() => {
                    const step = STAKING_TUTORIAL_STEPS.find(s => s.stepNum === currentTutorialStep) || STAKING_TUTORIAL_STEPS[0];
                    return (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                            {step.badge}
                          </span>
                          <h4 className="text-xl font-black text-white font-mono">{step.title}</h4>
                          <p className="text-xs text-amber-400 font-mono">{step.subtitle}</p>
                          <p className="text-xs text-slate-300 font-sans leading-relaxed pt-2">{step.content}</p>
                        </div>

                        {/* Takeaways Checklist */}
                        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Takeaways:</h5>
                          <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            {step.keyTakeaways.map((t, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Interactive Demo Component */}
                        <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-3">
                          <h5 className="text-xs font-bold text-amber-400 flex items-center space-x-2">
                            <Sparkle className="w-4 h-4 text-amber-400" />
                            <span>Interactive Step Visualizer Demo:</span>
                          </h5>

                          {step.stepNum === 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[11px] font-mono">
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <Coins className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                                <span className="font-bold text-white block">1. Capital Staked</span>
                                <span className="text-[9px] text-slate-400">Institutional Escrow</span>
                              </div>
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <Droplets className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                                <span className="font-bold text-white block">2. SWRO Build</span>
                                <span className="text-[9px] text-slate-400">Plant CAPEX Financing</span>
                              </div>
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <CheckSquare className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                                <span className="font-bold text-white block">3. Off-take Sales</span>
                                <span className="text-[9px] text-slate-400">Municipal PPA Tariffs</span>
                              </div>
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <TrendingUp className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
                                <span className="font-bold text-white block">4. APY Yield</span>
                                <span className="text-[9px] text-slate-400">12.5% to 16.2% APY</span>
                              </div>
                            </div>
                          )}

                          {step.stepNum === 2 && (
                            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                                <span className="text-slate-400 text-[10px]">Simple Interest (12% APY):</span>
                                <div className="text-base font-bold text-slate-300">$10,000 → $11,200 / yr</div>
                                <span className="text-[9px] text-slate-500">Payout is withdrawn linearly without restaking</span>
                              </div>
                              <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/40 space-y-1">
                                <span className="text-amber-400 text-[10px] font-bold">Auto-Stake Compounding (12% APY):</span>
                                <div className="text-base font-bold text-amber-300">$10,000 → $11,275 / yr</div>
                                <span className="text-[9px] text-emerald-400">+ $75.00 bonus from daily restake compounding</span>
                              </div>
                            </div>
                          )}

                          {step.stepNum === 3 && (
                            <div className="space-y-2 text-xs font-mono">
                              <div className="p-2.5 bg-slate-900 rounded-xl flex justify-between items-center border border-slate-800">
                                <div>
                                  <strong className="text-white block">SWRO Capacity Expansion Bond</strong>
                                  <span className="text-[10px] text-slate-400">Municipal Purchase Agreement Collateral</span>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">LOW RISK | 12.5% APY</span>
                              </div>

                              <div className="p-2.5 bg-slate-900 rounded-xl flex justify-between items-center border border-slate-800">
                                <div>
                                  <strong className="text-white block">Brine Selective Lithium Harvest Vault</strong>
                                  <span className="text-[10px] text-slate-400">Zero Liquid Discharge Mineral Sales Revenue Share</span>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">MEDIUM RISK | 16.2% APY</span>
                              </div>
                            </div>
                          )}

                          {step.stepNum === 4 && (
                            <div className="p-3 bg-slate-900 rounded-xl space-y-3 font-mono text-xs">
                              <div className="flex justify-between items-center text-slate-300">
                                <span>Try Staking $25,000 at 14.8% APY for 12 Months:</span>
                                <strong className="text-emerald-300 text-sm">
                                  ${Math.round(25000 * Math.pow(1 + 0.148 / 12, 12)).toLocaleString()} USD
                                </strong>
                              </div>
                              <button
                                onClick={() => {
                                  setShowTutorialModal(false);
                                  setShowStakeModal(true);
                                  hapticEngine.trigger('success');
                                }}
                                className="w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-center shadow-lg"
                              >
                                Launch Live Staking Vault Deposit
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setCurrentTutorialStep(Math.max(1, currentTutorialStep - 1));
                              hapticEngine.trigger('light');
                            }}
                            disabled={currentTutorialStep === 1}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                              currentTutorialStep === 1
                                ? 'bg-slate-950 text-slate-700 border-slate-900 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                            }`}
                          >
                            ← Previous Step
                          </button>

                          <button
                            onClick={() => {
                              if (currentTutorialStep < 4) {
                                setCurrentTutorialStep(currentTutorialStep + 1);
                              } else {
                                setShowTutorialModal(false);
                                setStakingSubTab('VAULTS_PORTFOLIO');
                              }
                              hapticEngine.trigger('light');
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs shadow-lg"
                          >
                            {currentTutorialStep < 4 ? 'Next Step →' : 'Finish Tutorial'}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* SUB-TAB 1: VAULTS PORTFOLIO & PROJECTION GRAPH */}
            {stakingSubTab === 'VAULTS_PORTFOLIO' && (
              <>
                {/* SECTION: INTERACTIVE STAKING PROJECTION GRAPH */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <span>Interactive Staking Projection Simulator &amp; Compound Growth Graph</span>
                      </h3>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">
                        Model long-term yield accumulation comparing simple interest vs auto-compounded daily/monthly rewards.
                      </p>
                    </div>

                    {/* Auto Stake Toggle Button for Projection */}
                    <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
                      <span className="text-slate-400 font-bold text-[11px]">Auto Stake Toggle:</span>
                      <button
                        onClick={() => {
                          setProjAutoStakeEnabled(!projAutoStakeEnabled);
                          hapticEngine.trigger('light');
                        }}
                        className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center space-x-2 border transition-all ${
                          projAutoStakeEnabled
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-md shadow-emerald-500/20'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {projAutoStakeEnabled ? (
                          <>
                            <ToggleRight className="w-5 h-5 text-emerald-400" />
                            <span>Auto-Stake ON (Compounding)</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-5 h-5 text-slate-500" />
                            <span>Auto-Stake OFF (Simple)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Simulation Controls Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-slate-400">
                        <span>Initial Stake ($ USD):</span>
                        <strong className="text-white">${projInitialPrincipal.toLocaleString()}</strong>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="200000"
                        step="1000"
                        value={projInitialPrincipal}
                        onChange={(e) => setProjInitialPrincipal(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-slate-400">
                        <span>Monthly Add Deposit ($ USD):</span>
                        <strong className="text-white">${projMonthlyDeposit.toLocaleString()}</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="250"
                        value={projMonthlyDeposit}
                        onChange={(e) => setProjMonthlyDeposit(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-slate-400">
                        <span>Target Duration (Months):</span>
                        <strong className="text-white">{projDurationMonths} Months ({ (projDurationMonths / 12).toFixed(1) } Yrs)</strong>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="60"
                        step="6"
                        value={projDurationMonths}
                        onChange={(e) => setProjDurationMonths(Number(e.target.value))}
                        className="w-full accent-indigo-400 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-slate-400">
                        <span>Expected Staking APY (%):</span>
                        <strong className="text-amber-400">{projTargetApyPct}% APY</strong>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="0.5"
                        value={projTargetApyPct}
                        onChange={(e) => setProjTargetApyPct(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculated Projection Graph Data */}
                  {(() => {
                    const graphData = [];
                    let currentCompounded = projInitialPrincipal;
                    let currentSimpleYield = 0;

                    const monthlyRate = (projTargetApyPct / 100) / 12;

                    for (let m = 0; m <= projDurationMonths; m++) {
                      if (m > 0) {
                        currentCompounded += projMonthlyDeposit;
                        const monthInterestComp = currentCompounded * monthlyRate;
                        currentCompounded += monthInterestComp;

                        currentSimpleYield += (projInitialPrincipal + projMonthlyDeposit * m) * monthlyRate;
                      }

                      const totalPrincipalPaid = projInitialPrincipal + (projMonthlyDeposit * m);
                      const simpleBalance = totalPrincipalPaid + currentSimpleYield;

                      graphData.push({
                        month: `Mth ${m}`,
                        monthNum: m,
                        'Principal Deposited ($)': Math.round(totalPrincipalPaid),
                        'Auto-Stake Balance ($)': Math.round(currentCompounded),
                        'Simple Interest Balance ($)': Math.round(simpleBalance),
                        'Compounding Advantage ($)': Math.round(currentCompounded - simpleBalance)
                      });
                    }

                    const finalPoint = graphData[graphData.length - 1];
                    const finalBalance = projAutoStakeEnabled ? finalPoint['Auto-Stake Balance ($)'] : finalPoint['Simple Interest Balance ($)'];
                    const totalPrincipal = finalPoint['Principal Deposited ($)'];
                    const netYieldEarned = finalBalance - totalPrincipal;
                    const compoundingBonus = finalPoint['Auto-Stake Balance ($)'] - finalPoint['Simple Interest Balance ($)'];

                    return (
                      <div className="space-y-6">
                        {/* Projection Stat Summary Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
                            <span className="text-slate-400 text-[11px]">Projected Final Portfolio Balance ({projDurationMonths} Months)</span>
                            <div className="text-2xl font-black text-emerald-300">${finalBalance.toLocaleString()} USD</div>
                            <span className="text-[10px] text-slate-400 block font-sans">
                              Includes ${totalPrincipal.toLocaleString()} principal deposits
                            </span>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-1">
                            <span className="text-slate-400 text-[11px]">Net Staking Yield Rewards Earned</span>
                            <div className="text-2xl font-black text-cyan-300">+${netYieldEarned.toLocaleString()} USD</div>
                            <span className="text-[10px] text-cyan-400 block font-sans">
                              {((netYieldEarned / totalPrincipal) * 100).toFixed(1)}% total ROI growth
                            </span>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400 text-[11px]">Auto-Stake Compounding Advantage</span>
                              <Sparkles className="w-4 h-4 text-amber-400" />
                            </div>
                            <div className="text-2xl font-black text-amber-300">+${compoundingBonus.toLocaleString()} USD</div>
                            <span className="text-[10px] text-slate-400 block font-sans">
                              Extra yield earned vs non-compounded simple interest
                            </span>
                          </div>
                        </div>

                        {/* Projection Chart Render */}
                        <div className="h-80 w-full bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                              <defs>
                                <linearGradient id="colorCompounded" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                                </linearGradient>
                                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="$" />
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                              <Legend />
                              <Area type="monotone" dataKey="Principal Deposited ($)" stroke="#6366f1" fillOpacity={1} fill="url(#colorPrincipal)" />
                              {projAutoStakeEnabled && (
                                <Area type="monotone" dataKey="Auto-Stake Balance ($)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorCompounded)" strokeWidth={2} />
                              )}
                              <Area type="monotone" dataKey="Simple Interest Balance ($)" stroke="#06b6d4" strokeDasharray="4 4" fill="none" strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* SECTION: ACTIVE STAKING VAULTS GRID & INDIVIDUAL AUTO-STAKE CONTROLS */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                        <Coins className="w-5 h-5 text-amber-400" />
                        <span>Desal Infrastructure &amp; R&amp;D Active Staking Vault Pools</span>
                      </h3>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">
                        Individual vault management with auto-stake restaking toggles and instant reward claim options.
                      </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto">
                      {['ALL', 'INFRASTRUCTURE_BOND', 'RD_NODE', 'BRINE_MINING', 'WATER_CREDIT'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setStakeCategoryFilter(cat);
                            hapticEngine.trigger('light');
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold transition-all border shrink-0 ${
                            stakeCategoryFilter === cat
                              ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {cat.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vault Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stakePools
                      .filter(p => stakeCategoryFilter === 'ALL' || p.category === stakeCategoryFilter)
                      .map((pool) => (
                        <div
                          key={pool.id}
                          className="p-6 rounded-3xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-5 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            {/* Top Header Row */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold text-[10px]">
                                    {pool.badge}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                                    pool.riskRating === 'LOW' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  }`}>
                                    {pool.riskRating} RISK
                                  </span>
                                </div>
                                <h4 className="text-base font-black text-white font-mono">{pool.name}</h4>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-2xl font-black text-amber-400 font-mono">{pool.apyPct}%</span>
                                <span className="text-[10px] text-slate-400 block font-mono">EST APY</span>
                              </div>
                            </div>

                            <p className="text-xs text-slate-300 font-sans leading-relaxed">{pool.description}</p>

                            {/* Position Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                                <span className="text-slate-400 text-[10px] block">Your Staked Position</span>
                                <strong className="text-white text-sm">${pool.userStakedUsd.toLocaleString()} USD</strong>
                              </div>

                              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                                <span className="text-slate-400 text-[10px] block">Yield Rewards Earned</span>
                                <strong className="text-emerald-300 text-sm">+${pool.userEarnedYieldUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</strong>
                              </div>
                            </div>

                            {/* Lockup Countdown Progress Bar */}
                            <div className="space-y-1 font-mono text-[11px]">
                              <div className="flex justify-between text-slate-400">
                                <span>Lockup Requirement:</span>
                                <span className="text-slate-200 font-bold">
                                  {pool.lockPeriodDays === 0 ? 'Flexible (No Lock)' : `${pool.daysRemaining} days remaining (${pool.lockPeriodDays}d total)`}
                                </span>
                              </div>
                              {pool.lockPeriodDays > 0 && (
                                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                                  <div
                                    className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full"
                                    style={{ width: `${Math.min(100, ((pool.lockPeriodDays - pool.daysRemaining) / pool.lockPeriodDays) * 100)}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bottom Controls Row: Per-Pool Auto Stake Toggle & Action Buttons */}
                          <div className="pt-4 border-t border-slate-900 space-y-3 font-mono text-xs">
                            <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
                              <div className="flex items-center space-x-2">
                                <RefreshCw className={`w-3.5 h-3.5 ${pool.isAutoStaked ? 'text-amber-400 animate-spin' : 'text-slate-500'}`} />
                                <span className="text-slate-300 text-[11px] font-bold">Auto-Restake Yield</span>
                              </div>

                              <button
                                onClick={() => {
                                  hapticEngine.trigger('light');
                                  setStakePools(stakePools.map(p => p.id === pool.id ? { ...p, isAutoStaked: !p.isAutoStaked } : p));
                                }}
                                className={`px-3 py-1 rounded-xl font-bold flex items-center space-x-1.5 transition-all border ${
                                  pool.isAutoStaked
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                                    : 'bg-slate-950 text-slate-500 border-slate-800'
                                }`}
                              >
                                <span>{pool.isAutoStaked ? 'ON (Compounding)' : 'OFF'}</span>
                              </button>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setModalStakePoolId(pool.id);
                                  setShowStakeModal(true);
                                  hapticEngine.trigger('light');
                                }}
                                className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-center shadow-md transition-all"
                              >
                                Stake More Capital
                              </button>

                              <button
                                onClick={() => {
                                  if (pool.userEarnedYieldUsd <= 0) return;
                                  hapticEngine.trigger('success');
                                  setStakePools(stakePools.map(p => p.id === pool.id ? { ...p, userEarnedYieldUsd: 0 } : p));
                                }}
                                disabled={pool.userEarnedYieldUsd <= 0}
                                className={`px-4 py-2.5 rounded-xl font-bold border transition-all ${
                                  pool.userEarnedYieldUsd > 0
                                    ? 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border-emerald-500/40'
                                    : 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed'
                                }`}
                              >
                                Claim Yield
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {/* SUB-TAB 2: STAKING NEWSFEED */}
            {stakingSubTab === 'NEWSFEED' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                      <Newspaper className="w-5 h-5 text-cyan-400" />
                      <span>Desalination Staking Market Newsfeed &amp; R&amp;D Announcements</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Verified water purchase agreements, municipal off-take contracts, membrane patents, and yield rate adjustments.
                    </p>
                  </div>

                  {/* Search and Category Filter */}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search news & off-take..."
                        value={newsSearchQuery}
                        onChange={(e) => setNewsSearchQuery(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      onClick={() => {
                        const newTitle = prompt('Enter Market Announcement Title:');
                        if (!newTitle) return;
                        hapticEngine.trigger('success');
                        const newArticle: StakingNewsItem = {
                          id: `NEWS-${Date.now()}`,
                          title: newTitle,
                          category: 'MARKET_OFFTAKE',
                          source: 'Custom Analyst Note',
                          timestamp: 'Just now',
                          summary: 'Custom field observation logged regarding desal municipal tariff structure and yield expansion.',
                          impactBadge: 'Off-take Updated',
                          readTime: '2 min read',
                          likesCount: 1,
                          isBookmarked: true
                        };
                        setStakingNews([newArticle, ...stakingNews]);
                      }}
                      className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold rounded-xl flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4 text-slate-950" />
                      <span>Log Market Insight</span>
                    </button>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto pb-2">
                  {['ALL', 'MARKET_OFFTAKE', 'YIELD_ADJUSTMENT', 'RD_BREAKTHROUGH', 'REGULATORY_GRANT'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setNewsCategoryFilter(cat);
                        hapticEngine.trigger('light');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all border shrink-0 ${
                        newsCategoryFilter === cat
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {/* Newsfeed List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  {stakingNews
                    .filter(n => newsCategoryFilter === 'ALL' || n.category === newsCategoryFilter)
                    .filter(n => newsSearchQuery === '' || n.title.toLowerCase().includes(newsSearchQuery.toLowerCase()) || n.summary.toLowerCase().includes(newsSearchQuery.toLowerCase()))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-6 rounded-3xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between font-mono text-[10px]">
                            <div className="flex items-center space-x-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                                {item.category.replace('_', ' ')}
                              </span>
                              <span className="text-slate-400">{item.source}</span>
                            </div>
                            <span className="text-slate-500">{item.timestamp}</span>
                          </div>

                          <h4 className="text-base font-black text-white font-mono leading-snug hover:text-cyan-300 cursor-pointer" onClick={() => setSelectedNewsId(item.id)}>
                            {item.title}
                          </h4>

                          <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>

                          <div className="flex items-center space-x-2 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                              {item.impactBadge}
                            </span>
                            <span className="text-slate-500">• {item.readTime}</span>
                          </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="pt-3 border-t border-slate-900 flex items-center justify-between font-mono text-xs">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => {
                                hapticEngine.trigger('light');
                                setStakingNews(stakingNews.map(n => n.id === item.id ? { ...n, likesCount: n.likesCount + 1 } : n));
                              }}
                              className="flex items-center space-x-1 text-slate-400 hover:text-amber-400 transition-all"
                            >
                              <span>👍</span>
                              <span>{item.likesCount}</span>
                            </button>

                            <button
                              onClick={() => {
                                hapticEngine.trigger('light');
                                setStakingNews(stakingNews.map(n => n.id === item.id ? { ...n, isBookmarked: !n.isBookmarked } : n));
                              }}
                              className={`flex items-center space-x-1 ${item.isBookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-white'}`}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>{item.isBookmarked ? 'Saved' : 'Bookmark'}</span>
                            </button>
                          </div>

                          <button
                            onClick={() => setSelectedNewsId(item.id)}
                            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1 text-[11px]"
                          >
                            <span>Read Report</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* News Article Detail Modal */}
                {selectedNewsId && (() => {
                  const article = stakingNews.find(n => n.id === selectedNewsId);
                  if (!article) return null;
                  return (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 font-sans">
                      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in font-mono">
                        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                          <div className="space-y-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                              {article.category}
                            </span>
                            <h3 className="text-lg font-black text-white">{article.title}</h3>
                            <span className="text-xs text-slate-400 block">{article.source} • {article.timestamp}</span>
                          </div>
                          <button onClick={() => setSelectedNewsId(null)} className="text-slate-500 hover:text-white text-sm font-bold">✕</button>
                        </div>

                        <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
                          <p>{article.summary}</p>
                          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                            <h5 className="font-bold text-amber-400">Financial Impact Analysis on Staking Vaults:</h5>
                            <p className="text-slate-400 text-[11px]">
                              This off-take agreement guarantees continuous debt service coverage ratio (DSCR) above 1.85x, directly underwriting the 12.5% to 16.2% APY returns distributed by our municipal-backed vaults.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-3 border-t border-slate-800">
                          <button
                            onClick={() => setSelectedNewsId(null)}
                            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs"
                          >
                            Done Reading
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* SUB-TAB 3: STAKING ALERTS HISTORY */}
            {stakingSubTab === 'ALERTS_HISTORY' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 font-mono text-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center space-x-2">
                      <History className="w-5 h-5 text-emerald-400" />
                      <span>Staking Alerts History &amp; Real-time Yield Payout Audit Log</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Automated record of daily auto-restake compound events, yield distributions, lockup expirations, and APY rate adjustments.
                    </p>
                  </div>

                  {/* Actions & Filters Bar */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        hapticEngine.trigger('success');
                        const newAlert: StakingAlertItem = {
                          id: `ALT-${Date.now()}`,
                          type: 'COMPOUND_EVENT',
                          poolId: 'POOL-SWRO-BOND',
                          poolName: 'SWRO Capacity Expansion Infrastructure Bond',
                          title: 'Live Test Daily Auto-Restake Executed',
                          message: 'Auto-Stake engine reinvested +$84.50 yield back into principal balance at 12.5% APY.',
                          timestamp: 'Just now',
                          severity: 'SUCCESS',
                          isRead: false,
                          amountUsd: 84.50
                        };
                        setStakingAlerts([newAlert, ...stakingAlerts]);
                      }}
                      className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-bold rounded-xl flex items-center space-x-1.5 shadow-md"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-950 animate-spin" />
                      <span>Simulate Auto-Restake Alert</span>
                    </button>

                    <button
                      onClick={() => {
                        hapticEngine.trigger('light');
                        setStakingAlerts(stakingAlerts.map(a => ({ ...a, isRead: true })));
                      }}
                      className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl font-bold"
                    >
                      Mark All as Read
                    </button>

                    <button
                      onClick={() => {
                        hapticEngine.trigger('light');
                        setStakingAlerts([]);
                      }}
                      className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-red-400 border border-slate-800 rounded-xl font-bold"
                    >
                      Clear Log
                    </button>
                  </div>
                </div>

                {/* Severity Filter Pills */}
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
                  {['ALL', 'SUCCESS', 'INFO', 'WARNING'].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => {
                        setAlertSeverityFilter(sev);
                        hapticEngine.trigger('light');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 ${
                        alertSeverityFilter === sev
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {sev} ALERTS ({sev === 'ALL' ? stakingAlerts.length : stakingAlerts.filter(a => a.severity === sev).length})
                    </button>
                  ))}
                </div>

                {/* Alerts List */}
                <div className="space-y-3">
                  {stakingAlerts.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 bg-slate-950 rounded-2xl border border-slate-800">
                      No staking alerts recorded in history.
                    </div>
                  ) : (
                    stakingAlerts
                      .filter(a => alertSeverityFilter === 'ALL' || a.severity === alertSeverityFilter)
                      .map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            !alert.isRead
                              ? 'bg-slate-950 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                              : 'bg-slate-950/60 border-slate-800 opacity-90'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5 shrink-0">
                              {alert.severity === 'SUCCESS' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                              {alert.severity === 'INFO' && <Info className="w-5 h-5 text-cyan-400" />}
                              {alert.severity === 'WARNING' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-white text-sm">{alert.title}</span>
                                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[9px]">
                                  {alert.poolName}
                                </span>
                                {!alert.isRead && (
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                )}
                              </div>
                              <p className="text-xs text-slate-300 font-sans leading-relaxed">{alert.message}</p>
                              <span className="text-[10px] text-slate-500 block">{alert.timestamp}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center">
                            {alert.amountUsd && (
                              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                                +${alert.amountUsd.toFixed(2)} USD
                              </span>
                            )}

                            {!alert.isRead && (
                              <button
                                onClick={() => {
                                  hapticEngine.trigger('light');
                                  setStakingAlerts(stakingAlerts.map(a => a.id === alert.id ? { ...a, isRead: true } : a));
                                }}
                                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-800"
                              >
                                Mark Read
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 4: TUTORIAL IN-PAGE VIEW */}
            {stakingSubTab === 'TUTORIAL' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-6 font-mono">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-amber-400" />
                    <h3 className="text-xl font-black text-white font-mono">Desalination Capital Staking Interactive Guide</h3>
                  </div>
                </div>

                {/* Step Progress Dots */}
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-4">
                  {STAKING_TUTORIAL_STEPS.map((s) => (
                    <button
                      key={s.stepNum}
                      onClick={() => {
                        setCurrentTutorialStep(s.stepNum);
                        hapticEngine.trigger('light');
                      }}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all ${
                        currentTutorialStep === s.stepNum
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                        {s.stepNum}
                      </span>
                      <span className="hidden sm:inline">Step {s.stepNum}</span>
                    </button>
                  ))}
                </div>

                {/* Tutorial Step Content */}
                {(() => {
                  const step = STAKING_TUTORIAL_STEPS.find(s => s.stepNum === currentTutorialStep) || STAKING_TUTORIAL_STEPS[0];
                  return (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          {step.badge}
                        </span>
                        <h4 className="text-xl font-black text-white font-mono">{step.title}</h4>
                        <p className="text-xs text-amber-400 font-mono">{step.subtitle}</p>
                        <p className="text-xs text-slate-300 font-sans leading-relaxed pt-2">{step.content}</p>
                      </div>

                      {/* Takeaways Checklist */}
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Takeaways:</h5>
                        <ul className="space-y-2 text-xs text-slate-300 font-sans">
                          {step.keyTakeaways.map((t, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive Step Demo */}
                      <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-3">
                        <h5 className="text-xs font-bold text-amber-400 flex items-center space-x-2">
                          <Sparkle className="w-4 h-4 text-amber-400" />
                          <span>Interactive Step Visualizer Demo:</span>
                        </h5>

                        {step.stepNum === 1 && (
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[11px] font-mono">
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <Coins className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                              <span className="font-bold text-white block">1. Capital Staked</span>
                              <span className="text-[9px] text-slate-400">Institutional Escrow</span>
                            </div>
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <Droplets className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                              <span className="font-bold text-white block">2. SWRO Build</span>
                              <span className="text-[9px] text-slate-400">Plant CAPEX Financing</span>
                            </div>
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <CheckSquare className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                              <span className="font-bold text-white block">3. Off-take Sales</span>
                              <span className="text-[9px] text-slate-400">Municipal PPA Tariffs</span>
                            </div>
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <TrendingUp className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
                              <span className="font-bold text-white block">4. APY Yield</span>
                              <span className="text-[9px] text-slate-400">12.5% to 16.2% APY</span>
                            </div>
                          </div>
                        )}

                        {step.stepNum === 2 && (
                          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                              <span className="text-slate-400 text-[10px]">Simple Interest (12% APY):</span>
                              <div className="text-base font-bold text-slate-300">$10,000 → $11,200 / yr</div>
                              <span className="text-[9px] text-slate-500">Payout is withdrawn linearly without restaking</span>
                            </div>
                            <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/40 space-y-1">
                              <span className="text-amber-400 text-[10px] font-bold">Auto-Stake Compounding (12% APY):</span>
                              <div className="text-base font-bold text-amber-300">$10,000 → $11,275 / yr</div>
                              <span className="text-[9px] text-emerald-400">+ $75.00 bonus from daily restake compounding</span>
                            </div>
                          </div>
                        )}

                        {step.stepNum === 3 && (
                          <div className="space-y-2 text-xs font-mono">
                            <div className="p-2.5 bg-slate-900 rounded-xl flex justify-between items-center border border-slate-800">
                              <div>
                                <strong className="text-white block">SWRO Capacity Expansion Bond</strong>
                                <span className="text-[10px] text-slate-400">Municipal Purchase Agreement Collateral</span>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">LOW RISK | 12.5% APY</span>
                            </div>

                            <div className="p-2.5 bg-slate-900 rounded-xl flex justify-between items-center border border-slate-800">
                              <div>
                                <strong className="text-white block">Brine Selective Lithium Harvest Vault</strong>
                                <span className="text-[10px] text-slate-400">Zero Liquid Discharge Mineral Sales Revenue Share</span>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">MEDIUM RISK | 16.2% APY</span>
                            </div>
                          </div>
                        )}

                        {step.stepNum === 4 && (
                          <div className="p-3 bg-slate-900 rounded-xl space-y-3 font-mono text-xs">
                            <div className="flex justify-between items-center text-slate-300">
                              <span>Try Staking $25,000 at 14.8% APY for 12 Months:</span>
                              <strong className="text-emerald-300 text-sm">
                                ${Math.round(25000 * Math.pow(1 + 0.148 / 12, 12)).toLocaleString()} USD
                              </strong>
                            </div>
                            <button
                              onClick={() => {
                                setStakingSubTab('VAULTS_PORTFOLIO');
                                setShowStakeModal(true);
                                hapticEngine.trigger('success');
                              }}
                              className="w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-center shadow-lg"
                            >
                              Launch Live Staking Vault Deposit
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Navigation Footer */}
                      <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setCurrentTutorialStep(Math.max(1, currentTutorialStep - 1));
                            hapticEngine.trigger('light');
                          }}
                          disabled={currentTutorialStep === 1}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                            currentTutorialStep === 1
                              ? 'bg-slate-950 text-slate-700 border-slate-900 cursor-not-allowed'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          }`}
                        >
                          ← Previous Step
                        </button>

                        <button
                          onClick={() => {
                            if (currentTutorialStep < 4) {
                              setCurrentTutorialStep(currentTutorialStep + 1);
                            } else {
                              setStakingSubTab('VAULTS_PORTFOLIO');
                            }
                            hapticEngine.trigger('light');
                          }}
                          className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs shadow-lg"
                        >
                          {currentTutorialStep < 4 ? 'Next Step →' : 'Finish Tutorial & Return to Vaults'}
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: INTERACTIVE EPC & R&D GANTT CHART ================= */}
        {activeTab === 'PROJECT_GANTT_CHART' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-indigo-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>EPC Plant Construction &amp; Scientific R&amp;D Project Schedule</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    Interactive EPC Project Gantt Chart &amp; Critical Path Tracker
                  </h2>
                </div>

                <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
                  <button
                    onClick={() => {
                      setShowAddGanttModal(true);
                      hapticEngine.trigger('light');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl shadow-lg shadow-indigo-500/20 flex items-center space-x-1.5 transition-all scale-100 hover:scale-105"
                  >
                    <Plus className="w-4 h-4 text-slate-950" />
                    <span>Add Milestone</span>
                  </button>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
                Comprehensive 68-week engineering schedule covering sub-sea intake tunneling, ground vibro-compaction piling, ceramic UF skids, high-pressure SWRO rack assembly, isobaric ERD mounting, 33kV SCADA automation, and WHO mineral compliance commissioning.
              </p>
            </div>

            {/* Filter & Critical Path Controls */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4 font-mono text-xs">
                <div className="flex items-center space-x-2 overflow-x-auto">
                  <span className="text-slate-500 font-bold shrink-0">Phase Category:</span>
                  {['ALL', 'ENGINEERING', 'CIVIL_MARINE', 'PROCESS_SKIDS', 'COMMISSIONING'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setGanttCategoryFilter(cat);
                        hapticEngine.trigger('light');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all border shrink-0 ${
                        ganttCategoryFilter === cat
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    onClick={() => {
                      setGanttHighlightCriticalPath(!ganttHighlightCriticalPath);
                      hapticEngine.trigger('light');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold border flex items-center space-x-2 transition-all ${
                      ganttHighlightCriticalPath
                        ? 'bg-rose-500/20 text-rose-300 border-rose-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 text-rose-400" />
                    <span>Highlight Critical Path ({ganttHighlightCriticalPath ? 'ON' : 'OFF'})</span>
                  </button>
                </div>
              </div>

              {/* Add Milestone Modal */}
              {showAddGanttModal && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4 font-mono text-xs animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <strong className="text-indigo-300 font-bold flex items-center space-x-1.5">
                      <Plus className="w-4 h-4" />
                      <span>Add New Project Engineering Milestone</span>
                    </strong>
                    <button onClick={() => setShowAddGanttModal(false)} className="text-slate-500 hover:text-white">✕</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Milestone Title:</label>
                      <input
                        type="text"
                        placeholder="e.g. Sub-sea Diffuser Calibration"
                        value={newGanttName}
                        onChange={(e) => setNewGanttName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Category:</label>
                      <select
                        value={newGanttCategory}
                        onChange={(e) => setNewGanttCategory(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                      >
                        <option value="ENGINEERING">ENGINEERING</option>
                        <option value="CIVIL_MARINE">CIVIL &amp; MARINE</option>
                        <option value="PROCESS_SKIDS">PROCESS SKIDS</option>
                        <option value="COMMISSIONING">COMMISSIONING</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Start Week:</label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={newGanttStartWeek}
                        onChange={(e) => setNewGanttStartWeek(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Duration (Weeks):</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={newGanttDurationWeeks}
                        onChange={(e) => setNewGanttDurationWeeks(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (!newGanttName) return;
                        hapticEngine.trigger('success');
                        const newId = `M-0${ganttMilestones.length + 1}`;
                        const newM: GanttMilestone = {
                          id: newId,
                          name: newGanttName,
                          category: newGanttCategory,
                          startWeek: newGanttStartWeek,
                          durationWeeks: newGanttDurationWeeks,
                          progressPct: 0,
                          status: 'UPCOMING',
                          leadEngineer: 'Eng. Custom Lead',
                          dependencies: [],
                          description: 'Custom added project milestone.'
                        };
                        setGanttMilestones([...ganttMilestones, newM]);
                        setShowAddGanttModal(false);
                        setNewGanttName('');
                      }}
                      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-xl"
                    >
                      Save Milestone
                    </button>
                  </div>
                </div>
              )}

              {/* Gantt Interactive Chart Visualizer Grid */}
              <div className="space-y-4 font-mono text-xs overflow-x-auto">
                <div className="min-w-[700px] space-y-4">
                  {/* Timeline Ruler Header (Weeks 1 to 68) */}
                  <div className="flex items-center text-[10px] text-slate-500 border-b border-slate-800 pb-2">
                    <div className="w-64 shrink-0 font-bold text-slate-400">Milestone Phase Name</div>
                    <div className="flex-1 grid grid-cols-12 gap-1 text-center font-bold">
                      <span>Wk 1-6</span>
                      <span>Wk 7-12</span>
                      <span>Wk 13-18</span>
                      <span>Wk 19-24</span>
                      <span>Wk 25-30</span>
                      <span>Wk 31-36</span>
                      <span>Wk 37-42</span>
                      <span>Wk 43-48</span>
                      <span>Wk 49-54</span>
                      <span>Wk 55-60</span>
                      <span>Wk 61-66</span>
                      <span>Wk 67+</span>
                    </div>
                    <div className="w-32 shrink-0 text-center font-bold text-slate-400">Progress (%)</div>
                  </div>

                  {/* Milestones Rows */}
                  {ganttMilestones
                    .filter((m) => ganttCategoryFilter === 'ALL' || m.category === ganttCategoryFilter)
                    .map((m) => {
                      const isSelected = m.id === selectedGanttMilestoneId;
                      const isCritical = ganttHighlightCriticalPath && (m.category === 'CIVIL_MARINE' || m.category === 'PROCESS_SKIDS');
                      const leftPct = (m.startWeek / 68) * 100;
                      const widthPct = (m.durationWeeks / 68) * 100;

                      return (
                        <div
                          key={m.id}
                          onClick={() => {
                            setSelectedGanttMilestoneId(m.id);
                            hapticEngine.trigger('light');
                          }}
                          className={`p-3 rounded-2xl border transition-all space-y-2 cursor-pointer ${
                            isSelected
                              ? 'bg-slate-950 border-indigo-400 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-400'
                              : isCritical
                              ? 'bg-rose-950/20 border-rose-500/50'
                              : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center">
                            {/* Milestone Metadata */}
                            <div className="w-64 shrink-0 pr-4 space-y-0.5">
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] text-indigo-400 font-bold">{m.id}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  m.status === 'COMPLETED'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : m.status === 'IN_PROGRESS'
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                    : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {m.status}
                                </span>
                              </div>
                              <h4 className="font-bold text-white text-xs truncate">{m.name}</h4>
                              <span className="text-[9px] text-slate-500 block font-sans">{m.leadEngineer}</span>
                            </div>

                            {/* Gantt Bar Visualization Container */}
                            <div className="flex-1 bg-slate-900 h-8 rounded-xl relative overflow-hidden border border-slate-800">
                              <div
                                className={`absolute top-1 bottom-1 rounded-lg border flex items-center px-2 transition-all ${
                                  m.status === 'COMPLETED'
                                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                                    : m.status === 'IN_PROGRESS'
                                    ? 'bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 border-cyan-400 text-cyan-200'
                                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                                }`}
                                style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 8)}%` }}
                              >
                                {/* Inner Progress Bar Fill */}
                                <div
                                  className="absolute top-0 bottom-0 left-0 bg-cyan-400/40 rounded-lg pointer-events-none"
                                  style={{ width: `${m.progressPct}%` }}
                                />
                                <span className="text-[9px] font-bold z-10 truncate">
                                  Wk {m.startWeek}-{m.startWeek + m.durationWeeks} ({m.progressPct}%)
                                </span>
                              </div>
                            </div>

                            {/* Interactive Progress Percentage Slider */}
                            <div className="w-32 shrink-0 pl-4 space-y-1 text-center">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={m.progressPct}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  const newStatus = val === 100 ? 'COMPLETED' : val > 0 ? 'IN_PROGRESS' : 'UPCOMING';
                                  setGanttMilestones(
                                    ganttMilestones.map((g) => (g.id === m.id ? { ...g, progressPct: val, status: newStatus } : g))
                                  );
                                }}
                                className="w-full accent-indigo-400 cursor-pointer"
                              />
                              <span className="text-[10px] font-bold text-indigo-300 block">{m.progressPct}% Complete</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Selected Milestone Detail Card */}
              {(() => {
                const selectedM = ganttMilestones.find((m) => m.id === selectedGanttMilestoneId);
                if (!selectedM) return null;
                return (
                  <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-[10px]">
                          {selectedM.id} • {selectedM.category}
                        </span>
                        <h4 className="font-bold text-white text-sm">{selectedM.name}</h4>
                      </div>
                      <span className="text-slate-400 text-[11px]">Lead: <strong className="text-white">{selectedM.leadEngineer}</strong></span>
                    </div>

                    <p className="text-slate-300 font-sans text-xs leading-relaxed">{selectedM.description}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] pt-1">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block">Start Schedule</span>
                        <strong className="text-cyan-300">Week {selectedM.startWeek}</strong>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block">Duration</span>
                        <strong className="text-amber-300">{selectedM.durationWeeks} Weeks</strong>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block">Dependencies</span>
                        <strong className="text-purple-300">{selectedM.dependencies.join(', ') || 'None'}</strong>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block">Completion Status</span>
                        <strong className="text-emerald-300">{selectedM.progressPct}% ({selectedM.status})</strong>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ================= TAB: R&D LAB TRACKING & EXPERIMENTS ================= */}
        {activeTab === 'RD_LAB_TRACKING' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <Activity className="w-4 h-4 text-rose-400" />
                    <span>Real-Time R&D Laboratory Bench Monitor &amp; Experiment Tracking</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    Advanced Desalination R&D Test Rig &amp; Experiment Log Portal
                  </h2>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold flex items-center space-x-1">
                    <Microscope className="w-4 h-4 text-rose-400" />
                    <span>5 ACTIVE HIGH-PRESSURE EXPERIMENT RIGS</span>
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
                Track active physical testing benches, polymeric/graphene membrane degradation rates, solar thermal evaporation skids, direct lithium extraction resin columns, and isobaric ceramic ERD rotary stress rigs in real time.
              </p>
            </div>

            {/* R&D Lab Telemetry Threshold Alert System */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/30 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 relative">
                    <BellRing className="w-6 h-6 animate-pulse" />
                    {labAlerts.filter(a => !a.isAcknowledged).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white font-mono text-[9px] font-bold rounded-full flex items-center justify-center">
                        {labAlerts.filter(a => !a.isAcknowledged).length}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                      <span>R&amp;D Lab Telemetry Alert &amp; Threshold Safety System</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Real-time threshold monitoring for rig pressure spikes, thermal runoff, membrane flux drop, and resin saturation limits.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 font-mono text-xs">
                  <button
                    onClick={() => {
                      setShowAlertConfigModal(!showAlertConfigModal);
                      hapticEngine.trigger('light');
                    }}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl font-bold flex items-center space-x-2 transition-all"
                  >
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>Configure Thresholds</span>
                  </button>
                </div>
              </div>

              {/* Threshold Config Modal */}
              {showAlertConfigModal && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 font-mono text-xs animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <strong className="text-amber-300 font-bold flex items-center space-x-1.5">
                      <Sliders className="w-4 h-4" />
                      <span>Configure R&amp;D Lab Bench Safety Threshold Limits</span>
                    </strong>
                    <button onClick={() => setShowAlertConfigModal(false)} className="text-slate-500 hover:text-white">✕</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Max Hydraulic Pressure (bar):</label>
                      <input
                        type="number"
                        value={labThresholds.maxPressureBar}
                        onChange={(e) => setLabThresholds({ ...labThresholds, maxPressureBar: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Max Bench Temperature (°C):</label>
                      <input
                        type="number"
                        value={labThresholds.maxTempC}
                        onChange={(e) => setLabThresholds({ ...labThresholds, maxTempC: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Min Salt Rejection (%):</label>
                      <input
                        type="number"
                        value={labThresholds.minSaltRejectionPct}
                        onChange={(e) => setLabThresholds({ ...labThresholds, minSaltRejectionPct: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px]">Min Permeate Flux (LMH):</label>
                      <input
                        type="number"
                        value={labThresholds.minPermeateFluxLmh}
                        onChange={(e) => setLabThresholds({ ...labThresholds, minPermeateFluxLmh: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Alert Filter & List */}
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center space-x-2">
                  {(['ALL', 'CRITICAL', 'WARNING', 'INFO'] as const).map((severity) => (
                    <button
                      key={severity}
                      onClick={() => setLabAlertFilter(severity)}
                      className={`px-3 py-1 rounded-xl font-bold border ${
                        labAlertFilter === severity
                          ? 'bg-rose-500/20 text-rose-300 border-rose-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {severity} ({severity === 'ALL' ? labAlerts.length : labAlerts.filter(a => a.severity === severity).length})
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {labAlerts
                    .filter(a => labAlertFilter === 'ALL' || a.severity === labAlertFilter)
                    .map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                          alert.severity === 'CRITICAL'
                            ? 'bg-red-950/30 border-red-500/50 text-red-200'
                            : alert.severity === 'WARNING'
                            ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                            : 'bg-blue-950/30 border-blue-500/50 text-blue-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              alert.severity === 'CRITICAL' ? 'bg-red-500 text-white' : alert.severity === 'WARNING' ? 'bg-amber-500 text-slate-950' : 'bg-blue-500 text-white'
                            }`}>
                              {alert.severity}
                            </span>
                            <span className="text-[10px] text-slate-400">{alert.benchId} • {alert.benchName}</span>
                            <span className="text-[10px] text-slate-500">({alert.timestamp})</span>
                          </div>
                          <h4 className="font-bold text-white text-sm">{alert.title}</h4>
                          <p className="text-xs font-sans text-slate-300">{alert.message}</p>
                          <div className="text-[11px] font-bold">
                            Current Value: <span className="text-white">{alert.currentVal} {alert.unit}</span> (Limit Threshold: {alert.thresholdVal} {alert.unit})
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => {
                              hapticEngine.trigger('light');
                              setLabAlerts(labAlerts.map(a => a.id === alert.id ? { ...a, isAcknowledged: !a.isAcknowledged } : a));
                            }}
                            className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                              alert.isAcknowledged
                                ? 'bg-slate-900 text-slate-400 border-slate-800'
                                : 'bg-rose-500 text-slate-950 border-rose-400 hover:bg-rose-400'
                            }`}
                          >
                            {alert.isAcknowledged ? '✓ Acknowledged' : 'Acknowledge Alert'}
                          </button>
                          <button
                            onClick={() => {
                              hapticEngine.trigger('light');
                              setLabAlerts(labAlerts.filter(a => a.id !== alert.id));
                            }}
                            className="p-1.5 rounded-xl bg-slate-950 text-slate-500 hover:text-red-400 border border-slate-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Category Filter & Bench Grid */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto">
                  {['ALL', 'MEMBRANE_TESTING', 'THERMAL_DISTILLATION', 'MINERAL_EXTRACTION', 'ENERGY_RECOVERY', 'ELECTRO_CHEMICAL'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setLabCategoryFilter(cat);
                        hapticEngine.trigger('light');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all border shrink-0 ${
                        labCategoryFilter === cat
                          ? 'bg-rose-500/20 text-rose-300 border-rose-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <span className="text-xs font-mono text-slate-400">
                  Showing <strong className="text-rose-400">{labBenches.filter((b) => labCategoryFilter === 'ALL' || b.category === labCategoryFilter).length}</strong> Bench Rig Monitors
                </span>
              </div>

              {/* Bench Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
                {labBenches
                  .filter((b) => labCategoryFilter === 'ALL' || b.category === labCategoryFilter)
                  .map((bench) => {
                    const isSelected = bench.id === selectedBenchId;
                    const statusColors = {
                      RUNNING: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
                      CALIBRATING: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
                      ACTIVE_HARVEST: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40',
                      MAINTENANCE: 'text-rose-400 bg-rose-500/20 border-rose-500/40',
                      PAUSED: 'text-slate-400 bg-slate-500/20 border-slate-500/40'
                    };

                    return (
                      <div
                        key={bench.id}
                        onClick={() => {
                          setSelectedBenchId(bench.id);
                          hapticEngine.trigger('light');
                        }}
                        className={`p-6 rounded-2xl cursor-pointer transition-all space-y-4 border ${
                          isSelected
                            ? 'bg-slate-950 border-rose-400 shadow-xl shadow-rose-500/10 ring-1 ring-rose-400'
                            : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] text-slate-500 font-bold">{bench.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[bench.status]}`}>
                            {bench.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-white text-sm">{bench.name}</h4>
                          <p className="text-[11px] text-slate-400 font-sans line-clamp-2 mt-1">{bench.description}</p>
                        </div>

                        {/* Live Telemetry Metrics */}
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block">Salt Rejection / Purity</span>
                            <strong className="text-emerald-400 text-xs">{bench.saltRejectionPct}%</strong>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block">Permeate Flux</span>
                            <strong className="text-cyan-300 text-xs">{bench.permeateFluxLmh} LMH</strong>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block">Operating Temp</span>
                            <strong className="text-amber-300 text-xs">{bench.temperatureC} °C</strong>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block">System Pressure</span>
                            <strong className="text-purple-300 text-xs">{bench.pressureBar} bar</strong>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-500">
                          <span>Lead: {bench.leadResearcher.split('&')[0]}</span>
                          <span>Active: {bench.hoursActive}h</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Active Bench Inspector & Experiment Logging */}
            {(() => {
              const currentBench = labBenches.find((b) => b.id === selectedBenchId) || labBenches[0];
              return (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4 font-mono">
                    <div>
                      <span className="text-xs text-rose-400 font-mono font-bold uppercase">Inspector Active Bench:</span>
                      <h3 className="text-xl font-black text-white font-mono mt-0.5">{currentBench.name}</h3>
                      <p className="text-xs text-slate-400 font-sans mt-1">{currentBench.location} — Lead: {currentBench.leadResearcher}</p>
                    </div>

                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">
                        Updated: {currentBench.lastUpdated}
                      </span>
                    </div>
                  </div>

                  {/* Observations Timeline */}
                  <div className="space-y-4 font-mono text-xs">
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <ClipboardList className="w-4 h-4 text-rose-400" />
                      <span>Recorded Experiment Observation Log ({currentBench.recentObservations.length})</span>
                    </h4>

                    <div className="space-y-2">
                      {currentBench.recentObservations.map((obs, idx) => (
                        <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 font-sans flex items-start space-x-3">
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold shrink-0 mt-0.5">
                            OBS-0{idx + 1}
                          </span>
                          <span className="text-xs leading-relaxed">{obs}</span>
                        </div>
                      ))}
                    </div>

                    {/* Add Observation Form */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 pt-4">
                      <label className="text-slate-300 font-bold block">Log New Bench Observation / Testing Result:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter technical observation note (e.g., Membrane pressure drop maintained at 1.2 bar)..."
                          value={newObsText}
                          onChange={(e) => setNewObsText(e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white font-sans text-xs focus:outline-none focus:border-rose-400"
                        />
                        <button
                          onClick={() => {
                            if (!newObsText.trim()) return;
                            hapticEngine.trigger('success');
                            setLabBenches(
                              labBenches.map((b) =>
                                b.id === currentBench.id
                                  ? { ...b, recentObservations: [newObsText, ...b.recentObservations], lastUpdated: 'Just now' }
                                  : b
                              )
                            );
                            setNewObsText('');
                          }}
                          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Log</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= TAB: SUPPLY CHAIN MAP & LOGISTICS ================= */}
        {activeTab === 'SUPPLY_CHAIN_MAP' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-orange-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-2 text-orange-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <Truck className="w-4 h-4 text-orange-400" />
                    <span>Global EPC Desalination Supply Chain &amp; Logistics Corridor Map</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    Critical Equipment Procurement &amp; Supply Risk Matrix
                  </h2>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold flex items-center space-x-1">
                    <Boxes className="w-4 h-4 text-orange-400" />
                    <span>6 CRITICAL PATH TIER-1 COMPONENTS</span>
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
                Analyze global manufacturing centers, maritime shipping corridors, tariff structures, procurement lead times (up to 26 weeks), and buffer stock strategies for high-pressure duplex pumps, isobaric pressure exchangers, polyamide RO membranes, and high-voltage substation PLCs.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div className="flex items-center space-x-2 overflow-x-auto">
                  <span className="text-slate-500 font-bold shrink-0">Filter Category:</span>
                  {['ALL', 'CORE_HYDRAULIC', 'MEMBRANE_ELEMENT', 'VALORIZATION_THERMAL', 'ELECTRICAL_SCADA', 'CHEMICAL_REAGENTS'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSupplyCategoryFilter(cat);
                        hapticEngine.trigger('light');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all border shrink-0 ${
                        supplyCategoryFilter === cat
                          ? 'bg-orange-500/20 text-orange-300 border-orange-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Component Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
                {CRITICAL_SUPPLY_CHAIN_COMPONENTS
                  .filter((item) => supplyCategoryFilter === 'ALL' || item.tierCategory === supplyCategoryFilter)
                  .map((item) => {
                    const isSelected = item.id === selectedSupplyCompId;
                    const riskBadge = {
                      LOW: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
                      MEDIUM: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
                      HIGH: 'text-orange-400 bg-orange-500/20 border-orange-500/40',
                      CRITICAL: 'text-rose-400 bg-rose-500/20 border-rose-500/40'
                    };

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedSupplyCompId(item.id);
                          hapticEngine.trigger('light');
                        }}
                        className={`p-6 rounded-2xl cursor-pointer transition-all space-y-4 border ${
                          isSelected
                            ? 'bg-slate-950 border-orange-400 shadow-xl shadow-orange-500/10 ring-1 ring-orange-400'
                            : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] text-slate-500 font-bold">{item.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${riskBadge[item.riskRating]}`}>
                            {item.riskRating} RISK
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-white text-sm">{item.name}</h4>
                          <p className="text-[11px] text-slate-400 font-sans line-clamp-2 mt-1">{item.keySpecs}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block">Lead Time</span>
                            <strong className="text-amber-400 text-xs">{item.leadTimeWeeks} Weeks</strong>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block">Buffer Stock</span>
                            <strong className="text-cyan-300 text-xs">{item.stockBufferDays} Days</strong>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block">Import Tariff</span>
                            <strong className="text-purple-300 text-xs">{item.tariffPct}%</strong>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-500 block">Primary Supplier</span>
                            <strong className="text-slate-300 text-xs truncate block">{item.primarySupplier.split('/')[0]}</strong>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-sans">
                          <span className="block text-slate-500 font-mono font-bold">Shipping Corridor:</span>
                          <span className="truncate block">{item.shippingCorridor}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Selected Component Supply Chain Detail Panel */}
            {(() => {
              const comp = CRITICAL_SUPPLY_CHAIN_COMPONENTS.find((c) => c.id === selectedSupplyCompId) || CRITICAL_SUPPLY_CHAIN_COMPONENTS[0];
              return (
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 font-mono text-xs">
                  <div className="border-b border-slate-800 pb-4">
                    <span className="text-orange-400 font-bold uppercase block text-[10px]">Logistics Deep Dive:</span>
                    <h3 className="text-xl font-black text-white">{comp.name}</h3>
                    <p className="text-slate-400 font-sans text-xs mt-1">Primary Manufacturers: {comp.manufacturerRegion}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="font-bold text-white flex items-center space-x-2">
                        <Route className="w-4 h-4 text-orange-400" />
                        <span>Maritime Corridor &amp; Logistics Path</span>
                      </h4>
                      <p className="text-slate-300 font-sans text-xs leading-relaxed">{comp.shippingCorridor}</p>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 font-sans text-xs">
                        <strong className="text-slate-200 block mb-1">Key Technical Specs:</strong>
                        {comp.keySpecs}
                      </div>
                    </div>

                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="font-bold text-emerald-400 flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Mitigation &amp; Buffer Stock Strategy</span>
                      </h4>
                      <p className="text-slate-300 font-sans text-xs leading-relaxed">{comp.mitigationStrategy}</p>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 font-sans text-xs flex justify-between items-center">
                        <span>Target Buffer Reserve:</span>
                        <strong className="text-cyan-300 font-mono">{comp.stockBufferDays} Days Operations Buffer</strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= TAB: ACADEMIC EXPORT LOGS & REPORTS ================= */}
        {activeTab === 'ACADEMIC_EXPORT' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-lime-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-2 text-lime-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <Download className="w-4 h-4 text-lime-400" />
                    <span>Academic Data Exporter &amp; Peer-Reviewed Research Logger</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    Academic Research Export Logs &amp; Report Generator
                  </h2>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-lime-500/20 text-lime-300 border border-lime-500/40 font-bold flex items-center space-x-1">
                    <FileCheck className="w-4 h-4 text-lime-400" />
                    <span>IEEE / APA / ISO FORMATTED LOGS</span>
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
                Export verified laboratory experiment records, desalination EPC financial models, geotechnical ground level adjustments, and research institute publications in structured JSON, CSV, formatted text executive briefs, or BibTeX academic citations.
              </p>
            </div>

            {/* Scope & Format Selectors */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scope Selector */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <label className="text-slate-300 font-bold block">1. Select Report Export Scope:</label>
                  <div className="space-y-2">
                    {[
                      { id: 'FULL_BRIEF', title: 'Full Desalination Research & Engineering Brief', desc: 'Combines EPC financial models, mass balance, and institute progress.' },
                      { id: 'LAB_OBSERVATIONS', title: 'R&D Laboratory Trial Observations & Bench Rig Data', desc: 'Raw telemetry, membrane flux LMH, and active experiment logs.' },
                      { id: 'COST_MATRIX', title: 'Financial CAPEX / OPEX / LCOW Comparison Spreadsheet', desc: 'Detailed 20-year TCO calculation matrix for all 9 plant types.' },
                      { id: 'GEOTECH_REPORT', title: 'Geotechnical Ground Level Adjustment & Soil Report', desc: 'Sub-surface soil bearing capacity, settlement mm, and ISO standards.' },
                      { id: 'CITATIONS_BIB', title: 'Peer-Reviewed Scientific Library Citations (BibTeX / IEEE)', desc: 'Full academic bibliography of desalination breakthroughs.' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setExportScope(s.id as any);
                          hapticEngine.trigger('light');
                        }}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          exportScope === s.id
                            ? 'bg-lime-500/20 text-lime-300 border-lime-400 font-bold'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-white font-bold">{s.title}</div>
                        <div className="text-[10px] text-slate-400 font-sans mt-0.5">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Selector */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <label className="text-slate-300 font-bold block">2. Select Export File Format:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'PDF', label: 'PDF Report Printable (.pdf)' },
                        { id: 'ACADEMIC_TEXT', label: 'Formatted Text Brief (.txt)' },
                        { id: 'JSON', label: 'Raw Structured JSON (.json)' },
                        { id: 'CSV', label: 'Data Matrix CSV (.csv)' },
                        { id: 'BIBTEX', label: 'BibTeX Citation (.bib)' }
                      ].map((fmt) => (
                        <button
                          key={fmt.id}
                          onClick={() => {
                            setExportFormat(fmt.id as any);
                            hapticEngine.trigger('light');
                            if (fmt.id === 'PDF') {
                              handleExportPDF();
                            }
                          }}
                          className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                            exportFormat === fmt.id
                              ? 'bg-lime-500/20 text-lime-300 border-lime-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {fmt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {(() => {
                    let generatedText = '';
                    const dateStr = new Date().toISOString();

                    if (exportScope === 'FULL_BRIEF') {
                      if (exportFormat === 'JSON') {
                        generatedText = JSON.stringify({
                          reportTitle: 'Global Ocean Desalination Engineering & Research Portal Log',
                          timestamp: dateStr,
                          epcModel: { plantType: selectedPlantTech.name, capacityM3Day: epcCapacityM3, capexUsd: totalCapexUsd, opexPerM3Usd },
                          geotechCondition: selectedGeotechCondition.name,
                          activeLabRigs: labBenches.length,
                          institutesTracked: INDIAN_INSTITUTES.length + WORLDWIDE_INSTITUTES.length
                        }, null, 2);
                      } else if (exportFormat === 'CSV') {
                        generatedText = `Parameter,Value,Unit\nPlant Capacity,${epcCapacityM3},m3/day\nTotal CAPEX,${totalCapexUsd},USD\nOPEX,${opexPerM3Usd},USD/m3\nLevelized Water Cost,${levelizedWaterCostPer1000L},USD/m3\nGeotech Condition,${selectedGeotechCondition.name},Hazard\nGeotech Premium,${geotechCapexPremiumUsd},USD`;
                      } else {
                        generatedText = `========================================================================\nOCEAN DESALINATION & ENGINEERING RESEARCH PORTAL - EXECUTIVE BRIEF\nDate: ${dateStr}\n========================================================================\n\n1. EPC PLANT ESTIMATE\n   Plant Technology: ${selectedPlantTech.name}\n   Target Capacity: ${epcCapacityM3.toLocaleString()} m3/day\n   Total Capital Expenditure (CAPEX): $${totalCapexUsd.toLocaleString()} USD\n   Levelized Cost of Water (LCOW): $${levelizedWaterCostPer1000L} / m3\n\n2. GEOTECHNICAL GROUND CONDITIONS\n   Soil Condition: ${selectedGeotechCondition.name}\n   Target Bearing Capacity: ${selectedGeotechCondition.bearingCapacityTargetKpa} kPa\n   Foundation CAPEX Premium: $${geotechCapexPremiumUsd.toLocaleString()} USD\n\n3. RESEARCH INSTITUTES MONITORING\n   Tracked Institutes: CSIR-CSMCRI, KAUST, BARC, MIT Desal Lab, DOW Water\n========================================================================`;
                      }
                    } else if (exportScope === 'LAB_OBSERVATIONS') {
                      if (exportFormat === 'JSON') {
                        generatedText = JSON.stringify(labBenches, null, 2);
                      } else if (exportFormat === 'CSV') {
                        generatedText = `BenchID,Name,Status,TempC,PressureBar,SaltRejectionPct,FluxLMH\n` + labBenches.map(b => `"${b.id}","${b.name}","${b.status}",${b.temperatureC},${b.pressureBar},${b.saltRejectionPct},${b.permeateFluxLmh}`).join('\n');
                      } else {
                        generatedText = `R&D LABORATORY BENCH EXPERIMENT LOGS\nDate: ${dateStr}\n\n` + labBenches.map(b => `[${b.id}] ${b.name}\nStatus: ${b.status} | Temp: ${b.temperatureC}°C | Pressure: ${b.pressureBar} bar | Flux: ${b.permeateFluxLmh} LMH\nObservations:\n` + b.recentObservations.map(o => ` - ${o}`).join('\n')).join('\n\n');
                      }
                    } else if (exportScope === 'COST_MATRIX') {
                      if (exportFormat === 'JSON') {
                        generatedText = JSON.stringify(ALL_PLANT_TYPES.map(t => ({
                          name: t.name,
                          baseCapexPerM3Usd: t.baseCapexPerM3DayUsd,
                          powerKwhM3: t.powerIntensityKwhM3,
                          recoveryPct: t.typicalRecoveryPct,
                          calculatedCapex20kM3: t.baseCapexPerM3DayUsd * 20000
                        })), null, 2);
                      } else {
                        generatedText = `PlantType,BaseCapexPerM3Usd,PowerKwhM3,RecoveryPct,CapexFor20kM3\n` + ALL_PLANT_TYPES.map(t => `"${t.name}",${t.baseCapexPerM3DayUsd},${t.powerIntensityKwhM3},${t.typicalRecoveryPct},${t.baseCapexPerM3DayUsd * 20000}`).join('\n');
                      }
                    } else {
                      generatedText = `@article{csmcri2026desal,\n  author = {CSIR-CSMCRI and BARC Water Division},\n  title = {Solar Thermal Vacuum Membrane Distillation and Lithium Recovery from Ocean Brine},\n  journal = {Journal of Membrane Science and Ocean Civil Engineering},\n  year = {2026},\n  volume = {114},\n  pages = {102--118}\n}`;
                    }

                    const handleDownloadFile = () => {
                      hapticEngine.trigger('success');
                      const mime = exportFormat === 'JSON' ? 'application/json' : exportFormat === 'CSV' ? 'text/csv' : 'text/plain';
                      const blob = new Blob([generatedText], { type: mime });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Desalination_Portal_Export_${exportScope}_${exportFormat}.${exportFormat.toLowerCase()}`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    };

                    const handleCopyText = () => {
                      hapticEngine.trigger('success');
                      navigator.clipboard.writeText(generatedText);
                      setExportCopied(true);
                      setTimeout(() => setExportCopied(false), 2000);
                    };

                    return (
                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <div className="flex gap-2">
                          <button
                            onClick={handleDownloadFile}
                            className="flex-1 py-3 px-4 bg-lime-500 hover:bg-lime-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Academic Export File</span>
                          </button>
                          <button
                            onClick={handleCopyText}
                            className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold border border-slate-800 rounded-xl text-xs flex items-center space-x-2"
                          >
                            <Copy className="w-4 h-4 text-lime-400" />
                            <span>{exportCopied ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Live Document Preview Box */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-lime-400" />
                    <span>Generated Report Live Preview ({exportScope} / {exportFormat})</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">Auto-Formatted Academic Log</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 max-h-80 overflow-y-auto">
                  <pre className="text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                    {(() => {
                      const dateStr = new Date().toISOString();
                      if (exportScope === 'FULL_BRIEF') {
                        if (exportFormat === 'JSON') {
                          return JSON.stringify({
                            reportTitle: 'Global Ocean Desalination Engineering & Research Portal Log',
                            timestamp: dateStr,
                            epcModel: { plantType: selectedPlantTech.name, capacityM3Day: epcCapacityM3, capexUsd: totalCapexUsd, opexPerM3Usd },
                            geotechCondition: selectedGeotechCondition.name,
                            activeLabRigs: labBenches.length,
                            institutesTracked: INDIAN_INSTITUTES.length + WORLDWIDE_INSTITUTES.length
                          }, null, 2);
                        } else if (exportFormat === 'CSV') {
                          return `Parameter,Value,Unit\nPlant Capacity,${epcCapacityM3},m3/day\nTotal CAPEX,${totalCapexUsd},USD\nOPEX,${opexPerM3Usd},USD/m3\nLevelized Water Cost,${levelizedWaterCostPer1000L},USD/m3\nGeotech Condition,${selectedGeotechCondition.name},Hazard\nGeotech Premium,${geotechCapexPremiumUsd},USD`;
                        } else {
                          return `========================================================================\nOCEAN DESALINATION & ENGINEERING RESEARCH PORTAL - EXECUTIVE BRIEF\nDate: ${dateStr}\n========================================================================\n\n1. EPC PLANT ESTIMATE\n   Plant Technology: ${selectedPlantTech.name}\n   Target Capacity: ${epcCapacityM3.toLocaleString()} m3/day\n   Total Capital Expenditure (CAPEX): $${totalCapexUsd.toLocaleString()} USD\n   Levelized Cost of Water (LCOW): $${levelizedWaterCostPer1000L} / m3\n\n2. GEOTECHNICAL GROUND CONDITIONS\n   Soil Condition: ${selectedGeotechCondition.name}\n   Target Bearing Capacity: ${selectedGeotechCondition.bearingCapacityTargetKpa} kPa\n   Foundation CAPEX Premium: $${geotechCapexPremiumUsd.toLocaleString()} USD\n\n3. RESEARCH INSTITUTES MONITORING\n   Tracked Institutes: CSIR-CSMCRI, KAUST, BARC, MIT Desal Lab, DOW Water\n========================================================================`;
                        }
                      } else if (exportScope === 'LAB_OBSERVATIONS') {
                        if (exportFormat === 'JSON') {
                          return JSON.stringify(labBenches, null, 2);
                        } else if (exportFormat === 'CSV') {
                          return `BenchID,Name,Status,TempC,PressureBar,SaltRejectionPct,FluxLMH\n` + labBenches.map(b => `"${b.id}","${b.name}","${b.status}",${b.temperatureC},${b.pressureBar},${b.saltRejectionPct},${b.permeateFluxLmh}`).join('\n');
                        } else {
                          return `R&D LABORATORY BENCH EXPERIMENT LOGS\nDate: ${dateStr}\n\n` + labBenches.map(b => `[${b.id}] ${b.name}\nStatus: ${b.status} | Temp: ${b.temperatureC}°C | Pressure: ${b.pressureBar} bar | Flux: ${b.permeateFluxLmh} LMH\nObservations:\n` + b.recentObservations.map(o => ` - ${o}`).join('\n')).join('\n\n');
                        }
                      } else if (exportScope === 'COST_MATRIX') {
                        if (exportFormat === 'JSON') {
                          return JSON.stringify(ALL_PLANT_TYPES.map(t => ({
                            name: t.name,
                            baseCapexPerM3Usd: t.baseCapexPerM3DayUsd,
                            powerKwhM3: t.powerIntensityKwhM3,
                            recoveryPct: t.typicalRecoveryPct,
                            calculatedCapex20kM3: t.baseCapexPerM3DayUsd * 20000
                          })), null, 2);
                        } else {
                          return `PlantType,BaseCapexPerM3Usd,PowerKwhM3,RecoveryPct,CapexFor20kM3\n` + ALL_PLANT_TYPES.map(t => `"${t.name}",${t.baseCapexPerM3DayUsd},${t.powerIntensityKwhM3},${t.typicalRecoveryPct},${t.baseCapexPerM3DayUsd * 20000}`).join('\n');
                        }
                      } else {
                        return `@article{csmcri2026desal,\n  author = {CSIR-CSMCRI and BARC Water Division},\n  title = {Solar Thermal Vacuum Membrane Distillation and Lithium Recovery from Ocean Brine},\n  journal = {Journal of Membrane Science and Ocean Civil Engineering},\n  year = {2026},\n  volume = {114},\n  pages = {102--118}\n}`;
                      }
                    })()}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: WATER INPUT / OUTPUT & BRINE RECYCLING ================= */}
        {activeTab === 'WATER_IO_BRINE_RECYCLING' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-teal-500/30 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-2 text-teal-400 font-mono text-xs uppercase font-bold tracking-wider">
                    <RefreshCw className="w-4 h-4 text-teal-400" />
                    <span>Mass Balance &amp; Environmental Sustainability Engine</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                    Water Input/Output Flow Analysis &amp; Brine Wastage Recycling
                  </h2>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-mono text-slate-400">Secondary Brine Recovery:</span>
                  <button
                    onClick={() => {
                      setIoEnableBrineRecycling(!ioEnableBrineRecycling);
                      hapticEngine.trigger('medium');
                    }}
                    className={`px-4 py-2 rounded-2xl font-mono text-xs font-bold transition-all flex items-center space-x-2 border ${
                      ioEnableBrineRecycling
                        ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${ioEnableBrineRecycling ? 'text-slate-950' : 'text-slate-500'}`} />
                    <span>{ioEnableBrineRecycling ? 'Recycling Enabled (+18% Recovery)' : 'Recycling Disabled'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Sliders for Intake & Salinity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs relative z-10 pt-2">
                {/* Control 1: Raw Water Intake Volume */}
                <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-slate-300">
                    <label className="text-slate-400 text-[11px]">Intake Ocean Water Volume:</label>
                    <span className="font-bold text-teal-300">{ioIntakeM3Day.toLocaleString()} m³/day</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="250000"
                    step="1000"
                    value={ioIntakeM3Day}
                    onChange={(e) => {
                      setIoIntakeM3Day(Number(e.target.value));
                      hapticEngine.trigger('light');
                    }}
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Small (1k m³)</span>
                    <span>Medium (50k m³)</span>
                    <span>Mega (250k m³)</span>
                  </div>
                </div>

                {/* Control 2: Ocean Intake Salinity */}
                <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-slate-300">
                    <label className="text-slate-400 text-[11px]">Raw Water Salinity (TDS):</label>
                    <span className="font-bold text-cyan-300">{ioSalinityPpm.toLocaleString()} ppm</span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="45000"
                    step="1000"
                    value={ioSalinityPpm}
                    onChange={(e) => {
                      setIoSalinityPpm(Number(e.target.value));
                      hapticEngine.trigger('light');
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Low (15k)</span>
                    <span>Standard Ocean (35k)</span>
                    <span>Hyper-saline Red Sea (45k)</span>
                  </div>
                </div>

                {/* Control 3: Primary SWRO Recovery Rate */}
                <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-slate-300">
                    <label className="text-slate-400 text-[11px]">Primary SWRO Recovery Rate:</label>
                    <span className="font-bold text-amber-300">{ioPrimaryRecoveryPct}% Recovery</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="55"
                    step="1"
                    value={ioPrimaryRecoveryPct}
                    onChange={(e) => {
                      setIoPrimaryRecoveryPct(Number(e.target.value));
                      hapticEngine.trigger('light');
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Conservative (35%)</span>
                    <span>Standard (45%)</span>
                    <span>Aggressive (55%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mass Balance Overview Cards (Input vs Output Streams) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: RAW WATER INTAKE INPUT */}
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-blue-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      <Droplets className="w-5 h-5" />
                    </span>
                    <h3 className="font-mono font-black text-white text-sm">RAW WATER INTAKE INPUT</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                    100% INTAKE
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block">Intake Daily Volume Rate</span>
                    <strong className="text-blue-300 text-lg">{ioIntakeM3Day.toLocaleString()} m³/day</strong>
                    <span className="text-[10px] text-slate-500 block">({Math.round((ioIntakeM3Day * 1000) / 1440).toLocaleString()} L/min continuous feed)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Intake Salinity</span>
                      <strong className="text-white text-xs">{ioSalinityPpm.toLocaleString()} ppm</strong>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Total Solutes Intake</span>
                      <strong className="text-amber-300 text-xs">{ioTotalSaltIntakeTonnesDay} Tonnes Salt/Day</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-500/20 text-[11px] text-blue-200 font-sans leading-relaxed">
                    Intake water sourced via subsea low-velocity headcaps (&lt;0.15 m/s) with dual-stage electro-chlorination pre-dosing to inhibit marine bio-fouling.
                  </div>
                </div>
              </div>

              {/* Card 2: RECOVERED PRODUCT WATER OUTPUT */}
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                    <h3 className="font-mono font-black text-white text-sm">RECOVERED SOFT WATER OUTPUT</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                    {ioOverallPlantRecoveryPct}% RECOVERY
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block">Total Soft Water Permeate Output</span>
                    <strong className="text-emerald-400 text-lg">{ioTotalPermeateWaterM3Day.toLocaleString()} m³/day</strong>
                    <span className="text-[10px] text-teal-300 block">
                      (Primary: {ioPrimaryPermeateM3Day.toLocaleString()} m³ {ioEnableBrineRecycling ? `+ Recycled Brine: ${ioSecondaryPermeateM3Day.toLocaleString()} m³` : ''})
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400">💧 Potable Drinking Water (60%):</span>
                      <strong className="text-cyan-300">{ioPotableDrinkingWaterM3Day.toLocaleString()} m³/day</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400">🌾 Agri Soft Water Irrigation (30%):</span>
                      <strong className="text-amber-300">{ioAgriIrrigationWaterM3Day.toLocaleString()} m³/day</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400">🏭 High-Purity Boiler Feed (10%):</span>
                      <strong className="text-purple-300">{ioIndustrialBoilerWaterM3Day.toLocaleString()} m³/day</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: BRINE WASTAGE & RECYCLED MINERAL STREAM */}
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-amber-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <RefreshCw className="w-5 h-5" />
                    </span>
                    <h3 className="font-mono font-black text-white text-sm">BRINE WASTAGE &amp; RECYCLING</h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${ioEnableBrineRecycling ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'}`}>
                    {ioEnableBrineRecycling ? 'RECYCLED MINERAL STREAM' : 'DIRECT OCEAN DISCHARGE'}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block">Final Brine Wastage Output Volume</span>
                    <strong className="text-amber-400 text-lg">{ioFinalWastageBrineM3Day.toLocaleString()} m³/day</strong>
                    <span className="text-[10px] text-slate-400 block">Concentrated Salinity: {ioFinalBrineSalinityPpm.toLocaleString()} ppm</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-teal-400 font-mono uppercase font-bold block border-b border-slate-800 pb-1">
                      ⛏️ Recoverable Mineral Commodities (Per Day):
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div>
                        <span className="text-slate-400">Lithium (Li₂CO₃):</span>
                        <strong className="text-cyan-300 block">{ioLithiumRecoveryKgDay} kg/day</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Magnesium (Mg(OH)₂):</span>
                        <strong className="text-emerald-300 block">{ioMagnesiumRecoveryTonnesDay} Tonnes/day</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Gypsum (CaSO₄):</span>
                        <strong className="text-amber-300 block">{ioGypsumRecoveryTonnesDay} Tonnes/day</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Chlor-Alkali NaOCl:</span>
                        <strong className="text-purple-300 block">{ioChlorAlkaliHypochloriteLitersDay.toLocaleString()} L/day</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brine Wastage Recycling Techniques Showcase */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                <div>
                  <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                    <Wrench className="w-5 h-5 text-teal-400" />
                    <span>Brine Wastage Recycling &amp; Resource Recovery Technologies</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Explore advanced engineering methods for converting concentrated ocean brine into valuable minerals, distilled water, and clean energy.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold shrink-0">
                  6 Modern ZLD / MLD Technologies
                </span>
              </div>

              {/* Technology Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BRINE_RECYCLING_TECHNIQUES.map((tech) => {
                  const isSelected = ioSelectedRecyclingTechId === tech.id;
                  return (
                    <div
                      key={tech.id}
                      onClick={() => {
                        setIoSelectedRecyclingTechId(tech.id);
                        hapticEngine.trigger('light');
                      }}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? 'bg-slate-950 border-teal-500 shadow-xl shadow-teal-500/10 ring-1 ring-teal-500'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-mono font-bold">
                          {tech.badge}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400">{tech.waterRecoveryImpact}</span>
                      </div>

                      <h4 className="font-mono font-bold text-white text-sm leading-snug">{tech.name}</h4>
                      <p className="text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">{tech.summary}</p>

                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Salinity Range:</span>
                        <span className="text-slate-200 font-bold">{tech.salinityHandled}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Technology Detailed View */}
              {(() => {
                const selectedTech = BRINE_RECYCLING_TECHNIQUES.find((t) => t.id === ioSelectedRecyclingTechId) || BRINE_RECYCLING_TECHNIQUES[0];
                return (
                  <div className="p-6 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                      <div>
                        <span className="text-[10px] text-teal-400 font-mono uppercase font-bold tracking-wider">{selectedTech.category}</span>
                        <h4 className="text-lg font-black text-white font-mono">{selectedTech.name}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold">
                        Target Salinity: {selectedTech.salinityHandled}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{selectedTech.summary}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                        <span className="font-bold text-teal-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          <span>Key Operational Benefits:</span>
                        </span>
                        <ul className="space-y-1.5 text-slate-300 font-sans text-xs pl-2">
                          {selectedTech.keyBenefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-teal-400 font-bold">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                        <span className="font-bold text-cyan-400 flex items-center space-x-1">
                          <Cpu className="w-4 h-4 text-cyan-400" />
                          <span>Engineering Technology Stack:</span>
                        </span>
                        <p className="text-slate-300 font-sans text-xs leading-relaxed">{selectedTech.techStack}</p>
                        
                        <div className="pt-3 border-t border-slate-800">
                          <span className="text-[10px] text-slate-500 block">Water Recovery Impact</span>
                          <strong className="text-emerald-400 text-sm">{selectedTech.waterRecoveryImpact}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Visual Process Flow Diagram */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="text-base font-black text-white font-mono flex items-center space-x-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Complete Water Input/Output Mass Balance Process Flow Schematic</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs text-center">
                <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-2">
                  <span className="text-[10px] text-blue-400 font-bold block">STEP 1</span>
                  <strong className="text-white block text-sm">Ocean Intake</strong>
                  <span className="text-[10px] text-slate-400 block">{ioIntakeM3Day.toLocaleString()} m³/day</span>
                  <span className="text-[9px] text-slate-500 block">TDS: {ioSalinityPpm.toLocaleString()} ppm</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] text-cyan-400 font-bold block">STEP 2</span>
                  <strong className="text-white block text-sm">Pre-Treatment</strong>
                  <span className="text-[10px] text-slate-400 block">UF + DAF Clarifier</span>
                  <span className="text-[9px] text-slate-500 block">SDI &lt; 2.5</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
                  <span className="text-[10px] text-amber-400 font-bold block">STEP 3</span>
                  <strong className="text-white block text-sm">High-Pressure SWRO</strong>
                  <span className="text-[10px] text-slate-400 block">{ioPrimaryRecoveryPct}% Recovery Pass</span>
                  <span className="text-[9px] text-slate-500 block">Isobaric PX Energy</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
                  <span className="text-[10px] text-emerald-400 font-bold block">STEP 4</span>
                  <strong className="text-white block text-sm">Soft Water Product</strong>
                  <span className="text-[10px] text-emerald-300 font-bold block">{ioTotalPermeateWaterM3Day.toLocaleString()} m³/day</span>
                  <span className="text-[9px] text-slate-500 block">Potable &amp; Agri Streams</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-2">
                  <span className="text-[10px] text-teal-400 font-bold block">STEP 5</span>
                  <strong className="text-white block text-sm">Brine Recycling / ZLD</strong>
                  <span className="text-[10px] text-teal-300 font-bold block">{ioFinalWastageBrineM3Day.toLocaleString()} m³/day</span>
                  <span className="text-[9px] text-slate-500 block">Mineral Recovery</span>
                </div>
              </div>

              {/* Water Quality Stream Chemical Composition Analysis Matrix */}
              <div className="pt-4 border-t border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-bold text-white flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-teal-400" />
                    <span>Water Quality Stream Composition Matrix (Real-Time Dynamic Values)</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Units: mg/L (ppm) unless specified</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-800">
                        <th className="p-3">Chemical Parameter</th>
                        <th className="p-3 text-blue-400">Raw Seawater Intake</th>
                        <th className="p-3 text-emerald-400">Potable Drinking Permeate</th>
                        <th className="p-3 text-amber-400">Agricultural Irrigation Permeate</th>
                        <th className="p-3 text-red-400">Brine Concentrate Stream</th>
                        <th className="p-3 text-teal-400">ZLD Recycled Distillate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 text-[11px] text-slate-300">
                      <tr>
                        <td className="p-3 font-bold text-white">Total Dissolved Solids (TDS)</td>
                        <td className="p-3 text-blue-300 font-bold">{ioSalinityPpm.toLocaleString()} ppm</td>
                        <td className="p-3 text-emerald-300 font-bold">180 ppm</td>
                        <td className="p-3 text-amber-300 font-bold">420 ppm</td>
                        <td className="p-3 text-red-300 font-bold">{ioFinalBrineSalinityPpm.toLocaleString()} ppm</td>
                        <td className="p-3 text-teal-300 font-bold">&lt; 15 ppm</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Sodium (Na⁺)</td>
                        <td className="p-3">10,800 mg/L</td>
                        <td className="p-3">45 mg/L</td>
                        <td className="p-3">65 mg/L</td>
                        <td className="p-3 text-red-300 font-bold">21,400 mg/L</td>
                        <td className="p-3 text-teal-300">&lt; 5 mg/L</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Chloride (Cl⁻)</td>
                        <td className="p-3">19,400 mg/L</td>
                        <td className="p-3">75 mg/L</td>
                        <td className="p-3">110 mg/L</td>
                        <td className="p-3 text-red-300 font-bold">38,800 mg/L</td>
                        <td className="p-3 text-teal-300">&lt; 8 mg/L</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Calcium &amp; Magnesium (Hardness)</td>
                        <td className="p-3">1,700 mg/L</td>
                        <td className="p-3">35 mg/L (Post-dosed)</td>
                        <td className="p-3 font-bold text-amber-300">120 mg/L (High Ca²⁺)</td>
                        <td className="p-3">3,400 mg/L</td>
                        <td className="p-3 text-teal-300">&lt; 2 mg/L</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Sodium Adsorption Ratio (SAR)</td>
                        <td className="p-3 text-red-400">58.4 (Extremely Toxic)</td>
                        <td className="p-3">3.2 (Safe)</td>
                        <td className="p-3 font-bold text-emerald-400">1.8 (Optimal Soil Health)</td>
                        <td className="p-3 text-red-400">112.0 (High Hazard)</td>
                        <td className="p-3 text-teal-300 font-bold">0.0 (Pure)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">pH Value</td>
                        <td className="p-3">8.1 pH</td>
                        <td className="p-3 text-emerald-300 font-bold">7.2 pH (Buffered)</td>
                        <td className="p-3">6.9 pH</td>
                        <td className="p-3">7.8 pH</td>
                        <td className="p-3 text-teal-300 font-bold">7.0 pH</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Boron (B) Concentration</td>
                        <td className="p-3">4.8 mg/L</td>
                        <td className="p-3 text-emerald-300">&lt; 0.4 mg/L</td>
                        <td className="p-3 text-amber-300">&lt; 0.7 mg/L</td>
                        <td className="p-3">9.2 mg/L</td>
                        <td className="p-3 text-teal-300">&lt; 0.1 mg/L</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: OCEAN WATER CONVERSION ENGINE ================= */}
        {activeTab === 'CONVERSION_ENGINE' && (
          <div className="space-y-8 animate-fade-in">
            {/* Overview & Dual Output Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Drinking Soft Water Target */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      <Droplets className="w-6 h-6 text-cyan-400" />
                    </span>
                    <div>
                      <h3 className="font-black text-white text-base font-mono">1. Potable Soft Drinking Water</h3>
                      <span className="text-[10px] text-cyan-400 font-mono">WHO &amp; BIS IS 10500 Standards</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                    TDS &lt; 300 PPM
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 font-sans">
                  <p>
                    Converts raw high-salinity seawater (35,000 ppm) into crystal-clear potable drinking water enriched with balanced essential minerals (Ca²⁺, Mg²⁺, HCO₃⁻).
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-2">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Current Output TDS</span>
                      <strong className="text-cyan-300 text-base">{drinkingWaterTdsPpm} ppm</strong>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">pH Mineral Balance</span>
                      <strong className="text-emerald-400 text-base">7.2 pH (Buffered)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agricultural Irrigation Soft Water Target */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <Wheat className="w-6 h-6 text-amber-400" />
                    </span>
                    <div>
                      <h3 className="font-black text-white text-base font-mono">2. Agricultural Soft Water Irrigation</h3>
                      <span className="text-[10px] text-amber-400 font-mono">FAO Irrigation &amp; Soil Health Standard</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                    SAR &lt; 3.0 (Low Sodicity)
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 font-sans">
                  <p>
                    Specifically formulated for agricultural crops (paddy rice, wheat, mustard, sugarcane, fruits) by eliminating sodium chloride while retaining beneficial soil nutrients to prevent soil salinization.
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-2">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Sodium Adsorption Ratio (SAR)</span>
                      <strong className="text-amber-300 text-base">{sarIndex} ({sarStatus.split(' ')[0]})</strong>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Chloride Concentration</span>
                      <strong className="text-cyan-300 text-base">&lt; 85 mg/L</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Desalination & Water Softening Controls */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                <div>
                  <h3 className="text-lg font-black text-white font-mono flex items-center space-x-2">
                    <Sliders className="w-5 h-5 text-cyan-400" />
                    <span>Seawater Desalination &amp; Softening Parameter Controls</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Adjust ocean water salinity, membrane filtration technology, operating pressure, and remineralization dosing.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setLabState({
                      rawWaterSalinityPpm: 35000,
                      waterTemperatureC: 25,
                      feedFlowRateLph: 1000,
                      operatingPressureBar: 55,
                      membraneType: 'POLYAMIDE_RO',
                      dosingCalciumMgL: 45,
                      dosingSodiumMgL: 20
                    });
                    hapticEngine.trigger('light');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-mono text-xs flex items-center space-x-1.5 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default Seawater</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                {/* Control 1: Raw Water Salinity */}
                <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-slate-300">
                    <label className="text-slate-400 text-[11px]">Raw Ocean Salinity (TDS):</label>
                    <span className="font-bold text-cyan-300">{labState.rawWaterSalinityPpm.toLocaleString()} ppm</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="45000"
                    step="500"
                    value={labState.rawWaterSalinityPpm}
                    onChange={(e) => setLabState({ ...labState, rawWaterSalinityPpm: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Brackish (10k)</span>
                    <span>Arabian Sea / Bay of Bengal (35k)</span>
                    <span>Red Sea (45k)</span>
                  </div>
                </div>

                {/* Control 2: Operating Pressure */}
                <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-slate-300">
                    <label className="text-slate-400 text-[11px]">RO Feed Pressure:</label>
                    <span className="font-bold text-amber-300">{labState.operatingPressureBar} bar</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="70"
                    step="1"
                    value={labState.operatingPressureBar}
                    onChange={(e) => setLabState({ ...labState, operatingPressureBar: Number(e.target.value) })}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Low (30 bar)</span>
                    <span>Standard SWRO (55 bar)</span>
                    <span>High Recovery (70 bar)</span>
                  </div>
                </div>

                {/* Control 3: Membrane Science Selection */}
                <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <label className="text-slate-400 text-[11px] block">Filter Membrane Technology:</label>
                  <select
                    value={labState.membraneType}
                    onChange={(e) => setLabState({ ...labState, membraneType: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="POLYAMIDE_RO">Thin-Film Polyamide SWRO (99.5% Rejection)</option>
                    <option value="GRAPHENE_MEMBRANE">Graphene Oxide Nanocomposite (99.8% Rejection)</option>
                    <option value="ELECTRODIALYSIS">Electrodialysis Reversal (EDR) Softener</option>
                    <option value="NANOFILTRATION">Nanofiltration Divalent Softener (NF)</option>
                  </select>
                  <span className="text-[9px] text-slate-500 block">Determines salt rejection &amp; ion selectivity</span>
                </div>
              </div>

              {/* Real-time Calculated System Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Water Recovery Rate</span>
                  <div className="text-xl font-black text-cyan-300 font-mono">{recoveryRatePercent}%</div>
                  <span className="text-[9px] text-slate-400 font-sans">{permeateFlowLph} L/h Soft Water Output</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Energy Footprint</span>
                  <div className="text-xl font-black text-amber-300 font-mono">{specificEnergyKwhM3} kWh/m³</div>
                  <span className="text-[9px] text-slate-400 font-sans">Isobaric Recovery Included</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Brine Discharge Rate</span>
                  <div className="text-xl font-black text-purple-300 font-mono">{brineFlowLph} L/h</div>
                  <span className="text-[9px] text-slate-400 font-sans">Concentrated Seawater Stream</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Agri SAR Soil Index</span>
                  <div className="text-xl font-black text-emerald-400 font-mono">{sarIndex}</div>
                  <span className="text-[9px] text-emerald-400/80 font-sans font-bold">{sarStatus}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: RESEARCH INSTITUTES PROGRESS ================= */}
        {activeTab === 'INSTITUTES_PROGRESS' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-white font-mono text-sm">Premier Research Institutes Progress Tracker</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search institute, city, scientist..."
                    value={instituteSearch}
                    onChange={(e) => setInstituteSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                {/* Region Filter */}
                <div className="flex rounded-xl bg-slate-950 border border-slate-800 p-1 font-mono text-xs">
                  {[
                    { id: 'ALL', label: 'All Global' },
                    { id: 'INDIA', label: '🇮🇳 India Premier' },
                    { id: 'WORLDWIDE', label: '🌐 Worldwide' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => {
                        setInstituteRegion(btn.id as any);
                        hapticEngine.trigger('light');
                      }}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        instituteRegion === btn.id ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Institute Cards Grid */}
            <div className="space-y-4">
              {filteredInstitutes.map((inst) => {
                const isExpanded = expandedInstituteId === inst.id;
                const isIndia = inst.region === 'INDIA';

                return (
                  <div
                    key={inst.id}
                    className={`rounded-3xl border transition-all overflow-hidden ${
                      isExpanded
                        ? 'bg-slate-900 border-amber-500/50 shadow-xl shadow-amber-500/5'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Header Bar */}
                    <div
                      onClick={() => {
                        setExpandedInstituteId(isExpanded ? null : inst.id);
                        hapticEngine.trigger('light');
                      }}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start space-x-4">
                        <span className={`p-3 rounded-2xl border text-lg font-black shrink-0 ${isIndia ? 'bg-amber-950/60 text-amber-300 border-amber-800' : 'bg-cyan-950/60 text-cyan-300 border-cyan-800'}`}>
                          {isIndia ? '🇮🇳' : '🌐'}
                        </span>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-black text-white text-base font-mono">{inst.name}</h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${isIndia ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'}`}>
                              {inst.shortName}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              {inst.city}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-sans font-medium">{inst.studyTitle}</p>
                        </div>
                      </div>

                      {/* Right Progress Badge */}
                      <div className="flex items-center space-x-4 shrink-0">
                        <div className="text-right font-mono">
                          <span className="text-[10px] text-slate-400 block">Study Progress</span>
                          <strong className="text-emerald-400 text-sm">{inst.progressPercentage}% Complete</strong>
                        </div>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-950 h-1.5">
                      <div
                        className={`h-full transition-all duration-500 ${isIndia ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-gradient-to-r from-cyan-500 to-blue-400'}`}
                        style={{ width: `${inst.progressPercentage}%` }}
                      />
                    </div>

                    {/* Expanded Detail View */}
                    {isExpanded && (
                      <div className="p-6 bg-slate-950/80 border-t border-slate-800 space-y-5 text-xs font-sans">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                            <strong className="text-white font-mono text-xs block text-cyan-300">🔬 Lead Researchers &amp; Key Focus</strong>
                            <p className="text-slate-300">{inst.keyFocus}</p>
                            <span className="text-[10px] text-slate-500 block font-mono">Scientists: {inst.leadScientists}</span>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                            <strong className="text-white font-mono text-xs block text-amber-300">⚡ Breakthrough Engineering Result</strong>
                            <p className="text-slate-300">{inst.breakthrough}</p>
                            <span className="text-[10px] text-slate-500 block font-mono">Technology Readiness: {inst.trlLevel}</span>
                          </div>
                        </div>

                        {/* Impact Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                            <span className="text-amber-400 font-mono text-[11px] font-bold flex items-center space-x-1">
                              <Wheat className="w-4 h-4" />
                              <span>Agricultural Soft Water Irrigation Impact</span>
                            </span>
                            <p className="text-slate-300 text-xs">{inst.irrigationImpact}</p>
                          </div>

                          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                            <span className="text-cyan-400 font-mono text-[11px] font-bold flex items-center space-x-1">
                              <Droplets className="w-4 h-4" />
                              <span>Potable Drinking Water Impact</span>
                            </span>
                            <p className="text-slate-300 text-xs">{inst.drinkingImpact}</p>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300">
                          <strong className="text-white font-mono block mb-1">Executive Summary:</strong>
                          <p>{inst.summary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB: LABORATORY PRACTICE & ARCHITECT STUDY SESSIONS ================= */}
        {activeTab === 'LAB_PRACTICE' && (
          <div className="space-y-8 animate-fade-in">
            {/* Laboratory Experiment Simulator */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-purple-500/40 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center w-fit space-x-1">
                    <FlaskConical className="w-3.5 h-3.5 text-purple-400" />
                    <span>VIRTUAL INTERACTIVE WATER SCIENCE EXPERIMENT LAB</span>
                  </span>
                  <h3 className="text-xl font-black text-white font-mono flex items-center space-x-2">
                    <TestTube2 className="w-6 h-6 text-purple-400" />
                    <span>Seawater Softening &amp; Desalination Laboratory Simulator</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Execute virtual titration experiments, measure RO permeate flux rates, and calculate agricultural SAR indices.
                  </p>
                </div>

                <button
                  onClick={handleRunLabSimulation}
                  disabled={isSimulating}
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black font-mono text-xs uppercase rounded-2xl shadow-lg shadow-purple-500/20 transition-all shrink-0 flex items-center space-x-2 border border-purple-300"
                >
                  {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isSimulating ? 'Executing Experiment...' : 'Execute Experiment Trial'}</span>
                </button>
              </div>

              {/* Lab Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-slate-300">
                    <label className="text-slate-400 text-[11px]">Calcium Remineralization (Ca²⁺):</label>
                    <span className="font-bold text-purple-300">{labState.dosingCalciumMgL} mg/L</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={labState.dosingCalciumMgL}
                    onChange={(e) => setLabState({ ...labState, dosingCalciumMgL: Number(e.target.value) })}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                  <span className="text-[9px] text-slate-500 block">Buffers soft water &amp; lowers agricultural SAR</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-slate-300">
                    <label className="text-slate-400 text-[11px]">Lab Pilot Feed Flow Rate:</label>
                    <span className="font-bold text-cyan-300">{labState.feedFlowRateLph} L/h</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={labState.feedFlowRateLph}
                    onChange={(e) => setLabState({ ...labState, feedFlowRateLph: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <span className="text-[9px] text-slate-500 block">Simulates benchtop to pilot plant scale</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-slate-300">
                    <label className="text-slate-400 text-[11px]">Ocean Water Temperature:</label>
                    <span className="font-bold text-amber-300">{labState.waterTemperatureC}°C</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="35"
                    step="1"
                    value={labState.waterTemperatureC}
                    onChange={(e) => setLabState({ ...labState, waterTemperatureC: Number(e.target.value) })}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <span className="text-[9px] text-slate-500 block">Impacts osmotic pressure &amp; membrane flux</span>
                </div>
              </div>

              {/* Lab Log */}
              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center space-x-1.5 text-purple-400 font-bold">
                    <Binary className="w-4 h-4" />
                    <span>Virtual Laboratory Data Log &amp; Trial Record</span>
                  </span>
                  <span className="text-[10px] text-slate-500">{labLogs.length} Entries Logged</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 h-40 overflow-y-auto space-y-1.5 text-[11px] text-slate-300">
                  {labLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-purple-400 select-none">&gt;</span>
                      <span className={idx === 0 ? 'text-emerald-300 font-bold' : 'text-slate-300'}>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Architectural Study Session & Masterclass Guide */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center w-fit space-x-1">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>PROFESSIONAL ARCHITECT &amp; ENGINEER STUDY SESSION</span>
                  </span>
                  <h3 className="text-xl font-black text-white font-mono flex items-center space-x-2 mt-2">
                    <BookOpen className="w-6 h-6 text-cyan-400" />
                    <span>Desalination Plant Engineering Study Session Modules</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Step-by-step masterclass modules covering ocean intake hydrodynamics, pre-treatment filtration, high-pressure ERD hydraulics, and commercial WPA contracts.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-slate-400">Module {studyModuleIndex + 1} of {STUDY_MODULES.length}</span>
                </div>
              </div>

              {/* Module Carousel / Stepper */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Module List Sidebar */}
                <div className="space-y-2 lg:col-span-1 font-mono text-xs">
                  {STUDY_MODULES.map((mod, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setStudyModuleIndex(idx);
                        hapticEngine.trigger('light');
                      }}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center space-x-3 ${
                        studyModuleIndex === idx
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${studyModuleIndex === idx ? 'bg-slate-950 text-cyan-300' : 'bg-slate-900 text-slate-400'}`}>
                        {idx + 1}
                      </span>
                      <span className="truncate">{mod.title.split(':')[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Right Active Module Detail View */}
                <div className="lg:col-span-3 p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 font-sans">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">Architect Study Session • Module {studyModuleIndex + 1}</span>
                    <h4 className="text-lg font-black text-white font-mono">{STUDY_MODULES[studyModuleIndex].title}</h4>
                    <p className="text-xs text-slate-400 font-mono">{STUDY_MODULES[studyModuleIndex].subtitle}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{STUDY_MODULES[studyModuleIndex].content}</p>

                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs text-cyan-300 font-mono space-y-1">
                    <strong className="block text-cyan-400">💡 Key Architectural Takeaway:</strong>
                    <p>{STUDY_MODULES[studyModuleIndex].keyTakeaway}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      disabled={studyModuleIndex === 0}
                      onClick={() => {
                        setStudyModuleIndex(Math.max(0, studyModuleIndex - 1));
                        hapticEngine.trigger('light');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-40"
                    >
                      ← Previous Module
                    </button>

                    <button
                      disabled={studyModuleIndex === STUDY_MODULES.length - 1}
                      onClick={() => {
                        setStudyModuleIndex(Math.min(STUDY_MODULES.length - 1, studyModuleIndex + 1));
                        hapticEngine.trigger('light');
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs disabled:opacity-40"
                    >
                      Next Module →
                    </button>
                  </div>
                </div>
              </div>

              {/* Architectural Knowledge Check Quiz */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="font-black text-white text-sm flex items-center space-x-2 text-amber-300">
                    <Award className="w-4 h-4" />
                    <span>Architectural Engineering Knowledge Check &amp; Self-Assessment</span>
                  </h4>
                  {quizScore !== null && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      Score: {quizScore} / {QUIZ_QUESTIONS.length} Correct
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {QUIZ_QUESTIONS.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-2 p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-white font-bold text-xs">{qIdx + 1}. {q.question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedQuizAnswers[qIdx] === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                              className={`p-2.5 rounded-xl text-left transition-all border text-xs ${
                                isSelected
                                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleCalculateQuizScore}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase"
                  >
                    Submit Answers &amp; Verify Certification
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: RESEARCH LIBRARY PORTAL ================= */}
        {activeTab === 'RESEARCH_LIBRARY' && (
          <div className="space-y-6 animate-fade-in">
            {/* Library Search & Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h3 className="font-black text-white font-mono text-sm">Scientific Research Library &amp; Publications</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search papers, authors, DOI..."
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <select
                  value={libraryCategory}
                  onChange={(e) => setLibraryCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="ALL">All Categories</option>
                  <option value="AGRICULTURAL_IRRIGATION">Agricultural Irrigation</option>
                  <option value="DRINKING_SOFT_WATER">Drinking Soft Water</option>
                  <option value="DESALINATION_RO">Reverse Osmosis Engineering</option>
                  <option value="MEMBRANE_NANOTECH">Membranes &amp; Nanotech</option>
                  <option value="SOLAR_THERMAL">Solar &amp; LTTD Thermal</option>
                </select>
              </div>
            </div>

            {/* Papers List */}
            <div className="space-y-4">
              {filteredPapers.map((paper) => {
                const isBookmarked = bookmarkedPaperIds.includes(paper.id);

                return (
                  <div
                    key={paper.id}
                    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 font-sans"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                            {paper.category.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">Published: {paper.year}</span>
                        </div>
                        <h4 className="font-black text-white text-base leading-snug">{paper.title}</h4>
                        <p className="text-xs text-slate-400 font-mono">Authors: {paper.authors}</p>
                      </div>

                      <button
                        onClick={() => toggleBookmark(paper.id)}
                        className={`p-2.5 rounded-2xl border transition-all shrink-0 ${
                          isBookmarked
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        <BookMarked className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{paper.abstract}</p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-mono text-slate-400">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-cyan-400">Journal: {paper.journal}</span>
                        <span>DOI: {paper.doi}</span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span>📥 {paper.downloadsCount.toLocaleString()} Downloads</span>
                        <span>📑 {paper.citationsCount} Citations</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
