import React, { useState } from 'react';
import { 
  BookOpen, Search, Filter, Sparkles, Download, Bookmark, FileText, 
  Globe, Waves, TreePine, Shield, Compass, ChevronRight, Share2, 
  Check, ExternalLink, Cpu, HelpCircle, ArrowUpRight, Award, Library,
  FileSpreadsheet, FileCode, CheckCircle2, XCircle, RotateCcw, Trophy,
  Zap, Sliders, Layers, Tag, Lightbulb, MessageSquare, ThumbsUp, UserCheck,
  Printer, FileCheck2, BarChart2, Crown, Users, Send, Newspaper, Gift,
  TrendingUp, Activity, Leaf, Coins, Plus, Heart, ThumbsDown, MessageCircle,
  Eye, RefreshCw, CheckSquare, ShieldCheck, Flame, Scale, Bell, Lock, HeartPulse
} from 'lucide-react';

import { ForumModerationAndRules } from './ForumModerationAndRules';
import { GamifiedEngagementMetrics } from './GamifiedEngagementMetrics';
import { ExpertQASection } from './ExpertQASection';
import { TopicSubscriptionAlerts } from './TopicSubscriptionAlerts';
import { ForumDigestGenerator } from './ForumDigestGenerator';
import { ForumTrendsRadar } from './ForumTrendsRadar';
import { ForumSearchIndexer } from './ForumSearchIndexer';
import { PrivateThreadDMs } from './PrivateThreadDMs';
import { MarineMedicalSystem } from './MarineMedicalSystem';

export interface LibraryResource {
  id: string;
  title: string;
  category: 'MARPOL_REGULATIONS' | 'BLUE_CARBON' | 'CORAL_ECOSYSTEMS' | 'OCEAN_ACOUSTICS' | 'PLASTIC_BIOLOGY' | 'RENEWABLE_ENERGY' | 'SHIP_HYDRODYNAMICS';
  author: string;
  publicationDate: string;
  doiOrRef: string;
  readTimeMinutes: number;
  downloadCount: number;
  rating: number;
  badge: string;
  summary: string;
  keyTakeaways: string[];
  tags: string[];
  pdfFileName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  title: string;
  vesselOrInstitution: string;
  country: string;
  xpScore: number;
  oceanDollarReward: number;
  avatarColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  authorName: string;
  authorRole: string;
  date: string;
  readTime: string;
  likes: number;
  summary: string;
  content: string;
  tags: string[];
  comments: { id: string; user: string; text: string; time: string }[];
}

export interface ClimateNewsItem {
  id: string;
  source: string;
  sourceBadge: string;
  title: string;
  snippet: string;
  timeAgo: string;
  category: 'IMO' | 'UNEP' | 'COPERNICUS' | 'NOAA' | 'OCEAN_DECADE';
  url: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
}

export interface QuizRewardItem {
  id: string;
  title: string;
  description: string;
  costOD: number;
  costXP: number;
  category: 'TREE_PLANTING' | 'PLASTIC_CLEANUP' | 'CERTIFICATE' | 'CARBON_TOKEN';
  icon: string;
  claimed: boolean;
  impactMetric: string;
}

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  category: 'MARPOL_COMPLIANCE' | 'BLUE_CARBON' | 'ZERO_FUELS' | 'PLASTIC_TECH' | 'GENERAL';
  upvotes: number;
  repliesCount: number;
  timestamp: string;
  isPinned?: boolean;
  tags: string[];
  body: string;
  replies: { id: string; author: string; role: string; text: string; time: string; upvotes: number }[];
}

export const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: 'LIB-RES-001',
    title: 'IMO MARPOL Annex VI: Net-Zero Carbon Intensity Framework 2026',
    category: 'MARPOL_REGULATIONS',
    author: 'International Maritime Organization (IMO) Marine Environment Protection Committee',
    publicationDate: 'June 2026',
    doiOrRef: 'IMO-MEPC.348(78)-2026',
    readTimeMinutes: 18,
    downloadCount: 4820,
    rating: 4.9,
    badge: 'IMO MANDATE',
    summary: 'Comprehensive legal and operational guidance on achieving Carbon Intensity Indicator (CII) Grade A/B ratings, Energy Efficiency Existing Ship Index (EEXI) compliance, and alternative fuel adoption standards.',
    keyTakeaways: [
      'Mandatory annual operational CII reduction targets through 2030',
      'Biofuel and Green Hydrogen dual-fuel verification protocol',
      'Port State Control enforcement mechanism for Grade E vessels'
    ],
    tags: ['CII', 'EEXI', 'IMO2026', 'Decarbonization', 'DualFuel'],
    pdfFileName: 'MARPOL_Annex_VI_NetZero_Guide_2026.pdf'
  },
  {
    id: 'LIB-RES-002',
    title: 'Blue Carbon Dynamics: Mangrove & Seagrass Sequestration in South Asia',
    category: 'BLUE_CARBON',
    author: 'UN Ocean Decade & Indian Ocean Rim Association Biodiversity Panel',
    publicationDate: 'April 2026',
    doiOrRef: 'UN-OD-2026-BC-882',
    readTimeMinutes: 24,
    downloadCount: 3210,
    rating: 4.8,
    badge: 'BLUE CARBON',
    summary: 'Scientific analysis of sediment carbon accumulation in the Sundarbans mangrove estuary, Palk Strait seagrass beds, and Maldivian coral reef lagoon systems with high-resolution satellite carbon credit verification methodologies.',
    keyTakeaways: [
      'Sundarbans mangroves sequester up to 10.2 metric tons CO2/hectare/year',
      'Satellite SAR interferometry for blue carbon stock mapping',
      'Ocean Dollar ($OD) carbon credit tokenization protocol'
    ],
    tags: ['Sundarbans', 'Seagrass', 'CarbonOffset', 'SatelliteSAR', 'PalkStrait'],
    pdfFileName: 'South_Asia_Blue_Carbon_Sequestration_2026.pdf'
  },
  {
    id: 'LIB-RES-003',
    title: 'Acoustic Decibel Thresholds for Marine Mammal Protection in Shipping Corridors',
    category: 'OCEAN_ACOUSTICS',
    author: 'Global Ocean Hydroacoustics & Cetacean Conservation Trust',
    publicationDate: 'January 2026',
    doiOrRef: 'GOH-2026-ACOUST-04',
    readTimeMinutes: 15,
    downloadCount: 2190,
    rating: 4.7,
    badge: 'HYDROACOUSTICS',
    summary: 'Hydrophone array data and noise mitigation techniques for propeller cavitation reduction, low-frequency sonar restrictions, and speed management in designated marine sanctuaries.',
    keyTakeaways: [
      'Maximum allowable 120 dB underwater noise limit near cetacean breeding grounds',
      'Propeller blade surface polishing reduces cavitation noise by 8.4 dB',
      'Automated AIS speed reduction triggers upon hydrophone whale detection'
    ],
    tags: ['WhaleProtection', 'Decibels', 'Cavitation', 'Sanctuary', 'AISSpeed'],
    pdfFileName: 'IMO_Underwater_Noise_Mitigation_Guidelines.pdf'
  },
  {
    id: 'LIB-RES-004',
    title: 'Enzymatic Degradation of Microplastics in Ocean Water: Ideonella sakaiensis Mutants',
    category: 'PLASTIC_BIOLOGY',
    author: 'International Marine Biotechnology Institute',
    publicationDate: 'May 2026',
    doiOrRef: 'IMBI-2026-BIO-319',
    readTimeMinutes: 20,
    downloadCount: 5120,
    rating: 4.9,
    badge: 'BIOTECH BREAKTHROUGH',
    summary: 'Research paper detailing engineered bacterial PETase enzymes deployed on autonomous ocean surface drones to break down PET plastic polymers into non-toxic terephthalic acid in pelagic waters.',
    keyTakeaways: [
      'PETase-PET2026 mutant enzyme breaks down microplastics 14x faster at 22°C SST',
      'Non-toxic byproducts absorbed by benign phytoplankton strains',
      'Scalable bio-remediation protocol for ocean plastic gyres'
    ],
    tags: ['Enzymes', 'PETase', 'Microplastics', 'GyreCleanUp', 'Biotechnology'],
    pdfFileName: 'Enzymatic_Ocean_Microplastic_Remediation_Report.pdf'
  },
  {
    id: 'LIB-RES-005',
    title: 'Thermal Resilience & Assisted Evolution in Chagos & Lakshadweep Coral Reefs',
    category: 'CORAL_ECOSYSTEMS',
    author: 'Coral Reef Rehabilitation Alliance & Pacific Ocean Observatory',
    publicationDate: 'March 2026',
    doiOrRef: 'CRRA-2026-REEF-09',
    readTimeMinutes: 22,
    downloadCount: 2840,
    rating: 4.8,
    badge: 'REEF RESTORATION',
    summary: 'Field trial findings on heat-tolerant zooxanthellae symbionts and 3D-printed ceramic reef structures deployed in Palk Strait and Lakshadweep to mitigate coral bleaching.',
    keyTakeaways: [
      'Heat-tolerant Symbiodiniaceae clade survival up to +2.8°C SST anomaly',
      '3D-printed porous ceramic substrate accelerates larval settlement by 310%',
      'Robotic coral fragment planting yields 88% 2-year survival rate'
    ],
    tags: ['CoralReefs', '3DCeramics', 'Bleaching', 'Lakshadweep', 'RoboticPlanting'],
    pdfFileName: 'Assisted_Evolution_Coral_Restoration_Handbook.pdf'
  },
  {
    id: 'LIB-RES-006',
    title: 'Offshore Floating Wind & Wave Energy Integration for Marine Port Grid Resilience',
    category: 'RENEWABLE_ENERGY',
    author: 'Global Maritime Renewable Energy Forum',
    publicationDate: 'July 2026',
    doiOrRef: 'GMREF-2026-WIND-112',
    readTimeMinutes: 19,
    downloadCount: 3950,
    rating: 4.8,
    badge: 'CLEAN ENERGY',
    summary: 'Engineering blueprint for offshore floating wind turbines coupled with oscillating water column wave energy converters supplying zero-carbon shore power to docked container vessels.',
    keyTakeaways: [
      'Offshore floating wind turbines generate 15 MW capacity per platform',
      'Cold ironing shore power eliminates berth emissions by 100%',
      'Integrated battery storage mitigates microgrid power fluctuations'
    ],
    tags: ['FloatingWind', 'WaveEnergy', 'ColdIroning', 'PortPower', 'ZeroEmission'],
    pdfFileName: 'Offshore_Floating_Wind_Port_Grid_Guide_2026.pdf'
  },
  {
    id: 'LIB-RES-007',
    title: 'Hydrodynamic Hull Trim Optimization & Air Lubrication Systems in Eco-Vessels',
    category: 'SHIP_HYDRODYNAMICS',
    author: 'Naval Architecture & Marine Engineering Research Institute',
    publicationDate: 'August 2026',
    doiOrRef: 'NAMERI-2026-HYDRO-401',
    readTimeMinutes: 16,
    downloadCount: 4110,
    rating: 4.9,
    badge: 'HYDRODYNAMICS',
    summary: 'Full-scale trial analysis of micro-bubble air lubrication carpet underneath vessel hulls combined with dynamic trim sensors yielding 7.2% fuel reduction across trans-ocean voyages.',
    keyTakeaways: [
      'Micro-bubble air carpet reduces hull skin friction drag by 8.5%',
      'Dynamic AI trim adjustment saves 2.1 MT fuel oil per day',
      'Subsea ultrasonic hull cleaning maintains optimal hydrodynamic profile'
    ],
    tags: ['AirLubrication', 'TrimAI', 'DragReduction', 'FuelEconomy', 'HullCleaning'],
    pdfFileName: 'Hydrodynamic_Hull_Optimization_Report_2026.pdf'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'BLOG-101',
    title: 'Rising SST Anomalies in the Indian Ocean: Implications for Commercial Shipping & Coral Refugia',
    authorName: 'Dr. Aris Thorne',
    authorRole: 'Chief Oceanographer, UN Marine Climate Initiative',
    date: 'August 18, 2026',
    readTime: '6 min read',
    likes: 142,
    tags: ['Bleaching', 'SST', 'Decarbonization', 'CoralReefs'],
    summary: 'Satellite radiometer telemetry shows sea surface temperature (SST) anomalies exceeding +1.8°C across the Bay of Bengal. Here is how merchant vessels can adjust routes to avoid vulnerable reef sanctuaries while maintaining optimal CII scores.',
    content: 'Ocean warming trends in mid-2026 highlight critical thermal pressure on coral sanctuaries from Chagos to the Palk Strait. Commercial container ships operating in these corridors are advised to utilize AI-optimized slow steaming modes, reducing bow wave friction and underwater acoustic stress near marine protected areas.',
    comments: [
      { id: 'c1', user: 'Capt. Rajesh Kumar (M.T. Ocean Sentinel)', text: 'Very insightful analysis. We reduced cruising speed by 1.5 knots in Chagos Passage last week and noticed significant fuel savings as well.', time: '2 days ago' },
      { id: 'c2', user: 'Dr. Elena Rostova', text: 'Integrating hydrophone alerts into standard ECDIS chart overlays is key for protection.', time: '1 day ago' }
    ]
  },
  {
    id: 'BLOG-102',
    title: 'Green Ammonia Bunkering Infrastructure: Colombo & Singapore Port Readiness Analysis 2026',
    authorName: 'Chief Eng. Marcus Vance',
    authorRole: 'Head of Alternative Fuels, Global Maritime Energy Hub',
    date: 'August 12, 2026',
    readTime: '8 min read',
    likes: 198,
    tags: ['GreenAmmonia', 'DualFuel', 'IMO2026', 'ZeroEmission'],
    summary: 'Green ammonia (NH3) is rapidly proving to be the primary zero-carbon fuel for long-haul bulk carriers. This field report evaluates safety barriers, cryogenic bunkering arms, and crew training standards in South Asian ports.',
    content: 'With MARPOL Annex VI tightening carbon thresholds, green ammonia produced via offshore floating wind electrolysis is emerging as a cornerstone. Safety mitigation protocols including leak sensors, double-walled piping, and automated emergency shutoff valves are now standard across modern bunkering barges.',
    comments: [
      { id: 'c3', user: 'First Officer Tariq Ahmed', text: 'Our vessel is scheduled for NH3 dual-fuel retrofit next month in Visakhapatnam. The training modules in this portal have been extremely helpful!', time: '3 days ago' }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Capt. Rajesh Kumar', title: 'Master Mariner', vesselOrInstitution: 'M.T. Ocean Sentinel', country: '🇮🇳 India', xpScore: 980, oceanDollarReward: 490, avatarColor: 'bg-emerald-500' },
  { rank: 2, name: 'Dr. Ananya Sen', title: 'Marine Ecologist', vesselOrInstitution: 'National Institute of Oceanography', country: '🇮🇳 India', xpScore: 920, oceanDollarReward: 460, avatarColor: 'bg-cyan-500' },
  { rank: 3, name: 'Chief Eng. Farhan Ali', title: 'Chief Engineer', vesselOrInstitution: 'M.V. Indus Star', country: '🇵🇰 Pakistan', xpScore: 880, oceanDollarReward: 440, avatarColor: 'bg-indigo-500' },
  { rank: 4, name: 'First Officer Tariq Ahmed', title: 'Chief Officer', vesselOrInstitution: 'M.T. Bengal Trader', country: '🇧🇩 Bangladesh', xpScore: 840, oceanDollarReward: 420, avatarColor: 'bg-teal-500' },
  { rank: 5, name: 'Lt. Cmdr. Sarah Perera', title: 'Hydrographic Officer', vesselOrInstitution: 'Sri Lanka Navy Hydrographic Service', country: '🇱🇰 Sri Lanka', xpScore: 800, oceanDollarReward: 400, avatarColor: 'bg-rose-500' }
];

export const INITIAL_NEWS_ITEMS: ClimateNewsItem[] = [
  {
    id: 'NEWS-001',
    source: 'IMO Global Dispatch',
    sourceBadge: 'IMO OFFICIAL',
    title: 'MEPC 82 Ratifies mandatory Net-Zero Framework for Trans-Pacific Bulk Carriers',
    snippet: 'The International Maritime Organization MEPC committee officially approved mandatory Grade A operational CII targets with strict financial levies for vessels maintaining Grade E ratings after 2026.',
    timeAgo: '2 hours ago',
    category: 'IMO',
    url: 'https://www.imo.org',
    impactLevel: 'CRITICAL'
  },
  {
    id: 'NEWS-002',
    source: 'Copernicus Marine Service',
    sourceBadge: 'SATELLITE DATA',
    title: 'Bay of Bengal Blue Carbon Satellite SAR Mapping Reveals 14% Rise in Mangrove Biomass',
    snippet: 'High-resolution Synthetic Aperture Radar (SAR) imagery confirms expanded sediment carbon accumulation in the Sundarbans coastal boundary following community restoration drives.',
    timeAgo: '5 hours ago',
    category: 'COPERNICUS',
    url: 'https://marine.copernicus.eu',
    impactLevel: 'HIGH'
  },
  {
    id: 'NEWS-003',
    source: 'UN Environment Programme (UNEP)',
    sourceBadge: 'UNEP RELEASE',
    title: 'Autonomous Pelagic Skimmer Fleet Removes 2.4 Metric Tons of PET Microplastics in Maldivian Waters',
    snippet: 'Deployment of solar-powered surface drones equipped with mutant PETase enzymes demonstrates rapid plastic depolymerization in open ocean gyres without biological toxicity.',
    timeAgo: '12 hours ago',
    category: 'UNEP',
    url: 'https://www.unep.org',
    impactLevel: 'HIGH'
  },
  {
    id: 'NEWS-004',
    source: 'NOAA Climate & Ocean Center',
    sourceBadge: 'NOAA BULLETIN',
    title: 'Acoustic Monitoring Hydrophone Grid Records 12 dB Reduction in Underwater Shipping Noise',
    snippet: 'Vessel speed slowdown corridors near Sri Lankan blue whale foraging grounds result in measurable acoustic stress drops and zero reported cetacean ship strikes in Q2 2026.',
    timeAgo: '1 day ago',
    category: 'NOAA',
    url: 'https://www.noaa.gov',
    impactLevel: 'MODERATE'
  }
];

export const INITIAL_REWARD_ITEMS: QuizRewardItem[] = [
  {
    id: 'REW-001',
    title: 'Plant 50 Sundarbans Mangrove Saplings',
    description: 'Directly funds local coastal restoration in the Sundarbans. Sequesters ~500 kg CO2 annually once fully matured.',
    costOD: 150,
    costXP: 300,
    category: 'TREE_PLANTING',
    icon: 'TreePine',
    claimed: false,
    impactMetric: '+500 kg/yr CO2 Sequestration'
  },
  {
    id: 'REW-002',
    title: 'Fund 100 kg Ocean Gyre Plastic Removal',
    description: 'Sponsors autonomous PETase drone skimmer operational hours in Indian Ocean plastic hotspots.',
    costOD: 200,
    costXP: 400,
    category: 'PLASTIC_CLEANUP',
    icon: 'Waves',
    claimed: false,
    impactMetric: '100 kg PET Plastic Removed'
  },
  {
    id: 'REW-003',
    title: 'UN Ocean Decade Verified Specialist Badge',
    description: 'Unlocks digital verified badge on your vessel profile and official maritime resume certification ID.',
    costOD: 100,
    costXP: 250,
    category: 'CERTIFICATE',
    icon: 'Award',
    claimed: false,
    impactMetric: 'Official Digital Credential'
  },
  {
    id: 'REW-004',
    title: '1.0 Metric Ton Ocean Dollar ($OD) Carbon Credit Token',
    description: 'Mint 1 $OD token backed by satellite-verified blue carbon seagrass beds in Palk Strait.',
    costOD: 300,
    costXP: 600,
    category: 'CARBON_TOKEN',
    icon: 'Coins',
    claimed: false,
    impactMetric: '1.0 MT Verifiable Offset'
  }
];

export const INITIAL_FORUM_THREADS: ForumThread[] = [
  {
    id: 'TH-001',
    title: 'How is your fleet preparing for the 2026 MARPOL CII Grade E mandatory penalty audits?',
    author: 'Capt. Vikram Sethi',
    authorRole: 'Fleet Superintendent, Blue Horizon Lines',
    category: 'MARPOL_COMPLIANCE',
    upvotes: 34,
    repliesCount: 3,
    timestamp: '4 hours ago',
    isPinned: true,
    tags: ['CII', 'IMO2026', 'Decarbonization'],
    body: 'With Port State Control intensifying inspections on Grade E vessels, we have installed micro-bubble air lubrication and automated SFOC torque sensors. What retrofits have yielded the highest CII grade improvement for container vessels?',
    replies: [
      { id: 'r1', author: 'Chief Eng. Marcus Vance', role: 'Chief Engineer', text: 'Hydrodynamic propeller boss cap fins (PBCF) plus hull air carpets gave us an immediate 0.35 CII rating improvement within 60 days.', time: '3 hours ago', upvotes: 12 },
      { id: 'r2', author: 'Lt. Cmdr. Sarah Perera', role: 'Marine Auditor', text: 'Ensure your SEEMP Part III plan is updated and digitally linked to real-time telemetry before arrival at Singapore or Colombo ports.', time: '2 hours ago', upvotes: 8 }
    ]
  },
  {
    id: 'TH-002',
    title: 'Verifying Sundarbans Blue Carbon Credits using SAR Satellite Data',
    author: 'Dr. Ananya Sen',
    authorRole: 'Lead Scientist, NIO',
    category: 'BLUE_CARBON',
    upvotes: 28,
    repliesCount: 2,
    timestamp: '1 day ago',
    tags: ['Sundarbans', 'CarbonOffset', 'SatelliteSAR'],
    body: 'We are combining Copernicus Sentinel-1 SAR imagery with soil carbon density core samples. Has anyone used $OD token smart contracts for corporate offset settlement?',
    replies: [
      { id: 'r3', author: 'Dr. Aris Thorne', role: 'Oceanographer', text: 'Yes, the Ocean Dollar protocol ensures zero double-counting through cryptographic satellite verification.', time: '18 hours ago', upvotes: 15 }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'According to IMO MARPOL Annex VI regulations, what operational rating is assigned to vessels that fail to meet mandatory Carbon Intensity Indicator (CII) thresholds for 3 consecutive years?',
    options: ['Grade A', 'Grade C', 'Grade E (Requires mandatory SEEMP Corrective Action Plan)', 'Grade X'],
    correctAnswerIndex: 2,
    explanation: 'Grade E is the lowest CII rating. Vessels receiving a Grade E or three consecutive Grade D ratings must develop and execute a mandatory SEEMP Corrective Action Plan verified by Port State Control.',
    category: 'MARPOL Regulations'
  },
  {
    id: 2,
    question: 'Which South Asian blue carbon coastal ecosystem exhibits carbon sequestration rates of up to 10.2 metric tons of CO2 per hectare per year?',
    options: ['Sundarbans Mangrove Estuary', 'Maldives Atoll Lagoons', 'Thar Desert Salt Flats', 'Western Ghats Bamboo Forests'],
    correctAnswerIndex: 0,
    explanation: 'The Sundarbans mangrove forest (straddling India and Bangladesh) is one of the world\'s densest blue carbon sinks, trapping sediment carbon at exceptional rates.',
    category: 'Blue Carbon'
  },
  {
    id: 3,
    question: 'What is the maximum recommended underwater noise threshold near marine mammal breeding grounds to prevent cetacean acoustic disorientation?',
    options: ['80 dB', '120 dB', '190 dB', '250 dB'],
    correctAnswerIndex: 1,
    explanation: 'International hydroacoustic conservation guidelines specify a maximum allowable continuous underwater ambient noise limit of 120 dB near cetacean breeding sanctuaries.',
    category: 'Ocean Acoustics'
  },
  {
    id: 4,
    question: 'Which mutant bacterial enzyme is deployed on autonomous ocean surface drones to break down PET microplastics into non-toxic terephthalic acid?',
    options: ['Amylase-V', 'PETase-PET2026 (derived from Ideonella sakaiensis)', 'Taq Polymerase', 'Lipase-B'],
    correctAnswerIndex: 1,
    explanation: 'Engineered PETase enzymes derived from Ideonella sakaiensis break down PET plastic polymers up to 14 times faster in pelagic seawater at ambient SST.',
    category: 'Marine Biotech'
  },
  {
    id: 5,
    question: 'How much skin friction drag reduction is achieved by deploying micro-bubble air lubrication carpets underneath eco-vessel hulls?',
    options: ['1.2%', '8.5%', '25.0%', '50.0%'],
    correctAnswerIndex: 1,
    explanation: 'Full-scale vessel trials demonstrate that micro-bubble air carpets reduce hull skin friction drag by approximately 8.5%, saving up to 7.2% fuel on trans-ocean voyages.',
    category: 'Ship Hydrodynamics'
  }
];

export const ALL_AVAILABLE_TAGS = [
  'Decarbonization', 'CII', 'EEXI', 'IMO2026', 'DualFuel', 
  'Sundarbans', 'Seagrass', 'CarbonOffset', 'SatelliteSAR', 
  'WhaleProtection', 'Decibels', 'Cavitation', 'PETase', 'Microplastics', 
  'CoralReefs', 'Bleaching', 'FloatingWind', 'WaveEnergy', 'AirLubrication', 'TrimAI'
];

export const OceanEnvironmentLibraryPortal: React.FC = () => {
  const [resources] = useState<LibraryResource[]>(LIBRARY_RESOURCES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [selectedResourceModal, setSelectedResourceModal] = useState<LibraryResource | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Active Main Sub-Tab
  const [activePortalTab, setActivePortalTab] = useState<
    'LIBRARY' | 'BLOG' | 'LEADERBOARD' | 'REPORT_GENERATOR' | 'NEWS_FEED' | 'QUIZ_REWARDS' | 'IMPACT_TRACKER' | 'COMMUNITY_FORUM' | 'EXPERT_QA' | 'FORUM_DIGEST' | 'TOPIC_ALERTS' | 'GAMIFICATION' | 'TRENDS_RADAR' | 'SEARCH_INDEX' | 'PRIVATE_DMS' | 'MARINE_MEDICINE'
  >('LIBRARY');

  // Expert Verification Credentials Modal State
  const [selectedExpertModal, setSelectedExpertModal] = useState<{
    name: string;
    role: string;
    accreditationId: string;
    institution: string;
  } | null>(null);

  // Moderation & Topic Subscriptions State
  const [isModeratorMode, setIsModeratorMode] = useState<boolean>(false);
  const [subscribedTopics, setSubscribedTopics] = useState<string[]>(['Decarbonization', 'CII', 'MARPOL_COMPLIANCE']);

  // AI Assistant Query State
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiAnswering, setIsAiAnswering] = useState<boolean>(false);

  // Climate Research Blog State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [newCommentInput, setNewCommentInput] = useState<{ [postId: string]: string }>({});

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);

  // Climate News Feed State
  const [newsItems] = useState<ClimateNewsItem[]>(INITIAL_NEWS_ITEMS);
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('ALL');

  // Quiz Rewards State
  const [rewardItems, setRewardItems] = useState<QuizRewardItem[]>(INITIAL_REWARD_ITEMS);
  const [userODBalance, setUserODBalance] = useState<number>(350);
  const [userXPBalance, setUserXPBalance] = useState<number>(750);

  // Forum State
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(INITIAL_FORUM_THREADS);
  const [forumSearch, setForumSearch] = useState<string>('');
  const [showNewThreadModal, setShowNewThreadModal] = useState<boolean>(false);
  const [newThreadTitle, setNewThreadTitle] = useState<string>('');
  const [newThreadBody, setNewThreadBody] = useState<string>('');
  const [newThreadCategory, setNewThreadCategory] = useState<ForumThread['category']>('MARPOL_COMPLIANCE');
  const [newThreadReplyInput, setNewThreadReplyInput] = useState<{ [threadId: string]: string }>({});

  // Interactive Quiz State
  const [activeQuizQuestionIndex, setActiveQuizQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showQuizExplanation, setShowQuizExplanation] = useState<boolean>(false);

  // Report Generator Form State
  const [reportTitle, setReportTitle] = useState<string>('Vessel Environmental & Decarbonization Executive Audit Report 2026');
  const [reportVesselName, setReportVesselName] = useState<string>('M.T. Ocean Bird Sentinel');
  const [includeMarpolSection, setIncludeMarpolSection] = useState<boolean>(true);
  const [includeCiiMetrics, setIncludeCiiMetrics] = useState<boolean>(true);
  const [includeBlueCarbon, setIncludeBlueCarbon] = useState<boolean>(true);
  const [includeQuizCertificate, setIncludeQuizCertificate] = useState<boolean>(true);
  const [reportFormat, setReportFormat] = useState<'PDF' | 'CSV' | 'HTML'>('PDF');

  const triggerToast = (msg: string) => {
    setDownloadToast(msg);
    setTimeout(() => setDownloadToast(null), 3800);
  };

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((bId) => bId !== id));
      triggerToast('Removed from saved bookmarks');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      triggerToast('📌 Saved to your personal Ocean Environment Library bookmarks!');
    }
  };

  const handleDownloadPdf = (res: LibraryResource, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const element = document.createElement("a");
    const file = new Blob([
      `DOCUMENT: ${res.title}\nAUTHOR: ${res.author}\nDOI: ${res.doiOrRef}\nPUBLISHED: ${res.publicationDate}\nTAGS: ${res.tags.join(', ')}\n\nSUMMARY:\n${res.summary}\n\nKEY TAKEAWAYS:\n${res.keyTakeaways.map(k => `- ${k}`).join('\n')}\n\nDownloaded from Ocean Bird Maritime Portal (App Web ID: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f)`
    ], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = res.pdfFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    triggerToast(`📥 Downloading document: ${res.pdfFileName}`);
  };

  // EXPORT LIBRARY DATA FUNCTION (JSON / CSV / BIBTEX)
  const handleExportLibraryData = (format: 'JSON' | 'CSV' | 'BIBTEX') => {
    const targetData = filteredResources;
    let content = '';
    let mimeType = 'text/plain';
    let fileName = `ocean_environment_library_export_${Date.now()}`;

    if (format === 'JSON') {
      content = JSON.stringify(targetData, null, 2);
      mimeType = 'application/json';
      fileName += '.json';
    } else if (format === 'CSV') {
      const headers = ['ID', 'Title', 'Category', 'Author', 'Publication Date', 'DOI', 'Read Time (min)', 'Rating', 'Downloads', 'Tags'];
      const rows = targetData.map(r => [
        `"${r.id}"`,
        `"${r.title.replace(/"/g, '""')}"`,
        `"${r.category}"`,
        `"${r.author.replace(/"/g, '""')}"`,
        `"${r.publicationDate}"`,
        `"${r.doiOrRef}"`,
        r.readTimeMinutes,
        r.rating,
        r.downloadCount,
        `"${r.tags.join(';')}"`
      ]);
      content = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
      mimeType = 'text/csv';
      fileName += '.csv';
    } else {
      content = targetData.map(r => 
        `@article{${r.id.toLowerCase()},\n  title={${r.title}},\n  author={${r.author}},\n  journal={UN Ocean Decade Archive},\n  year={2026},\n  doi={${r.doiOrRef}}\n}`
      ).join('\n\n');
      mimeType = 'text/plain';
      fileName += '.bib';
    }

    const element = document.createElement('a');
    const file = new Blob([content], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    triggerToast(`📊 Library Bibliography Exported successfully as ${format} (${targetData.length} records)!`);
  };

  // EXPORT CUSTOM EXECUTIVE AUDIT REPORT GENERATOR
  const handleGenerateCustomReport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportText = `
================================================================================
MARITIME OCEAN ENVIRONMENT & DECARBONIZATION EXECUTIVE REPORT
================================================================================
REPORT TITLE: ${reportTitle}
TARGET VESSEL / ORGANIZATION: ${reportVesselName}
GENERATED ON: ${timestamp}
WEB APP IDENTIFIER: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f
UN OCEAN DECADE CERTIFICATION ID: UN-OD-2026-REPORT-9942

--------------------------------------------------------------------------------
1. EXECUTIVE SUMMARY & COMPLIANCE STATUS
--------------------------------------------------------------------------------
${includeMarpolSection ? '- MARPOL Annex VI Decarbonization: Verified Grade A operational compliance.\n- EEXI Energy Index: Compliant with 2026 dual-fuel retrofitting guidelines.' : '- MARPOL section excluded by user configuration.'}

--------------------------------------------------------------------------------
2. CII OPERATIONAL CARBON INTENSITY METRICS
--------------------------------------------------------------------------------
${includeCiiMetrics ? '- Annual Operational Fuel Oil Consumption (FOC): 18.2 MT/day (7.4% reduction)\n- Dynamic Trim & Hydrodynamic Air Lubrication carpet active.\n- Calculated Annual CO2 Emission Offset: 1,420 MT CO2.' : '- CII section excluded.'}

--------------------------------------------------------------------------------
3. BLUE CARBON & ECOSYSTEM CONSERVATION
--------------------------------------------------------------------------------
${includeBlueCarbon ? '- Sundarbans & Palk Strait Blue Carbon Offset Allocation: 350 Ocean Dollars ($OD)\n- Acoustic Decibel Speed Mitigation: Active hydrophone whale sanctuary slowdown enabled.' : '- Blue carbon section excluded.'}

--------------------------------------------------------------------------------
4. ACADEMIC & QUIZ MASTERY ASSESSMENT
--------------------------------------------------------------------------------
${includeQuizCertificate ? `- User Assessment Score: ${quizScore} / 100 XP\n- Mastery Designation: Ocean Environmental Protection Specialist` : '- Quiz assessment excluded.'}

================================================================================
AUTHORIZED BY UN OCEAN DECADE DIGITAL ARCHIVE & OCEAN BIRD PORTAL
================================================================================
    `.trim();

    const element = document.createElement('a');
    const ext = reportFormat === 'CSV' ? '.csv' : reportFormat === 'HTML' ? '.html' : '.pdf';
    const file = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${reportVesselName.replace(/\s+/g, '_')}_Environmental_Executive_Report_2026${ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    triggerToast(`📑 Executive Report Generated & Downloaded successfully (${reportFormat})!`);
  };

  // AI ASSISTANT QUERY
  const handleAskAiLibrary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsAiAnswering(true);
    setAiAnswer(null);

    setTimeout(() => {
      setIsAiAnswering(false);
      setAiAnswer(
        `Based on the Ocean Environment Library repository (MARPOL Annex VI & UN Ocean Decade Data):\n\n` +
        `Regarding "${aiQuestion}": Primary compliance for vessels requires real-time SFOC telemetry and CII Grade A/B operational speed adjustments. Blue carbon coastal ecosystems (mangroves & seagrasses) provide high-integrity offsets under ISO 14064-3 standard, while enzymatic bio-remediation protocols achieve microplastic breakdown without disrupting marine food webs.`
      );
    }, 1600);
  };

  // CLAIM QUIZ REWARD
  const handleClaimReward = (reward: QuizRewardItem) => {
    if (reward.claimed) {
      triggerToast('⚠️ Reward already claimed!');
      return;
    }
    if (userODBalance < reward.costOD || userXPBalance < reward.costXP) {
      triggerToast(`❌ Insufficient balance! Requires ${reward.costOD} $OD and ${reward.costXP} XP.`);
      return;
    }

    setUserODBalance((prev) => prev - reward.costOD);
    setUserXPBalance((prev) => prev - reward.costXP);
    setRewardItems((prev) =>
      prev.map((r) => (r.id === reward.id ? { ...r, claimed: true } : r))
    );

    triggerToast(`🎉 Successfully claimed reward: "${reward.title}"! Impact updated.`);
  };

  // BLOG LIKES & COMMENTS
  const handleLikePost = (postId: string) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
    triggerToast('❤️ Liked climate research article!');
  };

  const handleAddBlogComment = (postId: string) => {
    const text = newCommentInput[postId]?.trim();
    if (!text) return;

    setBlogPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `c-${Date.now()}`, user: 'You (Naval Specialist)', text, time: 'Just now' }
              ]
            }
          : p
      )
    );
    setNewCommentInput({ ...newCommentInput, [postId]: '' });
    triggerToast('💬 Comment posted to Climate Research Blog!');
  };

  // FORUM HANDLERS
  const handleUpvoteThread = (threadId: string) => {
    setForumThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
    triggerToast('👍 Upvoted community thread!');
  };

  const handleAddForumReply = (threadId: string) => {
    const text = newThreadReplyInput[threadId]?.trim();
    if (!text) return;

    setForumThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              repliesCount: t.repliesCount + 1,
              replies: [
                ...t.replies,
                {
                  id: `fr-${Date.now()}`,
                  author: 'You (Naval Officer)',
                  role: 'Maritime Specialist',
                  text,
                  time: 'Just now',
                  upvotes: 1
                }
              ]
            }
          : t
      )
    );
    setNewThreadReplyInput({ ...newThreadReplyInput, [threadId]: '' });
    triggerToast('💬 Reply posted to forum thread!');
  };

  const handleCreateNewThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadBody.trim()) return;

    const newThread: ForumThread = {
      id: `TH-${Date.now()}`,
      title: newThreadTitle.trim(),
      author: 'You (Naval Officer)',
      authorRole: 'Environmental Specialist',
      category: newThreadCategory,
      upvotes: 1,
      repliesCount: 0,
      timestamp: 'Just now',
      tags: [newThreadCategory.replace('_', '')],
      body: newThreadBody.trim(),
      replies: []
    };

    setForumThreads([newThread, ...forumThreads]);
    setNewThreadTitle('');
    setNewThreadBody('');
    setShowNewThreadModal(false);
    triggerToast('🚀 New community forum thread created successfully!');
  };

  // QUIZ LOGIC
  const currentQuizQuestion = QUIZ_QUESTIONS[activeQuizQuestionIndex];

  const handleSelectQuizOption = (optionIndex: number) => {
    if (showQuizExplanation) return;
    setSelectedOptionIndex(optionIndex);
  };

  const handleConfirmQuizAnswer = () => {
    if (selectedOptionIndex === null) return;
    setShowQuizExplanation(true);
    const updatedAnswers = [...userAnswers, selectedOptionIndex];
    setUserAnswers(updatedAnswers);

    if (selectedOptionIndex === currentQuizQuestion.correctAnswerIndex) {
      const newScore = quizScore + 20;
      setQuizScore(newScore);

      // Reward user with XP and Ocean Dollars
      const earnedXP = 100;
      const earnedOD = 50;
      setUserXPBalance((prev) => prev + earnedXP);
      setUserODBalance((prev) => prev + earnedOD);

      // Update user on leaderboard dynamically
      setLeaderboard((prev) => {
        const userExistIndex = prev.findIndex((u) => u.name === 'You (Current User)');
        if (userExistIndex >= 0) {
          const updated = [...prev];
          updated[userExistIndex].xpScore += earnedXP;
          updated[userExistIndex].oceanDollarReward += earnedOD;
          return updated.sort((a, b) => b.xpScore - a.xpScore).map((u, i) => ({ ...u, rank: i + 1 }));
        } else {
          const newUser: LeaderboardUser = {
            rank: prev.length + 1,
            name: 'You (Current User)',
            title: 'Environmental Specialist',
            vesselOrInstitution: 'Ocean Bird App User',
            country: '🌐 Global',
            xpScore: userXPBalance + earnedXP,
            oceanDollarReward: userODBalance + earnedOD,
            avatarColor: 'bg-emerald-500'
          };
          return [...prev, newUser].sort((a, b) => b.xpScore - a.xpScore).map((u, i) => ({ ...u, rank: i + 1 }));
        }
      });
    }
  };

  const handleNextQuizQuestion = () => {
    if (activeQuizQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setActiveQuizQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setShowQuizExplanation(false);
    } else {
      setIsQuizCompleted(true);
      triggerToast('🏆 Ocean Environment Mastery Quiz Completed! +100 XP & 50 $OD Rewarded!');
    }
  };

  const handleResetQuiz = () => {
    setActiveQuizQuestionIndex(0);
    setSelectedOptionIndex(null);
    setUserAnswers([]);
    setIsQuizCompleted(false);
    setQuizScore(0);
    setShowQuizExplanation(false);
  };

  // SEARCH AND TAG FILTERING FOR RESOURCES
  const filteredResources = resources.filter((r) => {
    const matchesCategory = selectedCategory === 'ALL' || r.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => r.tags.includes(tag));
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      r.title.toLowerCase().includes(query) ||
      r.summary.toLowerCase().includes(query) ||
      r.author.toLowerCase().includes(query) ||
      r.doiOrRef.toLowerCase().includes(query) ||
      r.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesTags && matchesSearch;
  });

  const categoriesList = [
    { id: 'ALL', label: 'ALL RESOURCES', badge: `${resources.length}` },
    { id: 'MARPOL_REGULATIONS', label: 'IMO MARPOL REGULATIONS', badge: 'IMO' },
    { id: 'BLUE_CARBON', label: 'BLUE CARBON & SEQUESTRATION', badge: 'CARBON' },
    { id: 'OCEAN_ACOUSTICS', label: 'OCEAN HYDROACOUSTICS', badge: 'NOISE' },
    { id: 'PLASTIC_BIOLOGY', label: 'PLASTIC BIOTECH', badge: 'PLASTIC' },
    { id: 'CORAL_ECOSYSTEMS', label: 'CORAL RESTORATION', badge: 'REEF' },
    { id: 'RENEWABLE_ENERGY', label: 'OFFSHORE RENEWABLES', badge: 'WIND/WAVE' },
    { id: 'SHIP_HYDRODYNAMICS', label: 'SHIP HYDRODYNAMICS', badge: 'TRIM/AIR' }
  ];

  return (
    <div id="ocean-environment-library-portal" className="space-y-6 font-mono text-white animate-fadeIn">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/20 border border-emerald-400/50 rounded-2xl">
              <Library className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">INTERNATIONAL MARITIME DIGITAL ARCHIVE</span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  UN OCEAN DECADE CERTIFIED
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Ocean Environment Knowledge &amp; Action Portal
              </h1>
              <p className="text-slate-300 text-xs font-sans mt-0.5 max-w-3xl">
                Open-access MARPOL papers, real-time climate news feeds, climate quiz rewards store, personal impact tracker, and community forum portal.
              </p>
            </div>
          </div>

          {/* BALANCE BAR & EXPORT DATA */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-3">
              <div>
                <span className="text-[9px] text-slate-400 block font-bold uppercase">OCEAN DOLLARS</span>
                <strong className="text-amber-300 text-sm font-black flex items-center space-x-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>{userODBalance} $OD</span>
                </strong>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="text-[9px] text-slate-400 block font-bold uppercase">QUIZ XP</span>
                <strong className="text-emerald-300 text-sm font-black flex items-center space-x-1">
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{userXPBalance} XP</span>
                </strong>
              </div>
            </div>

            {/* EXPORT DROPDOWN BUTTONS */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold px-1 uppercase hidden sm:inline">BIBLIOGRAPHY:</span>
              <button
                onClick={() => handleExportLibraryData('JSON')}
                className="px-2 py-1 bg-slate-950 hover:bg-emerald-500/20 text-emerald-300 border border-slate-700 rounded text-[10px] font-bold transition-all flex items-center space-x-1"
                title="Export JSON"
              >
                <FileCode className="w-3 h-3" />
                <span>JSON</span>
              </button>
              <button
                onClick={() => handleExportLibraryData('CSV')}
                className="px-2 py-1 bg-slate-950 hover:bg-emerald-500/20 text-emerald-300 border border-slate-700 rounded text-[10px] font-bold transition-all flex items-center space-x-1"
                title="Export CSV"
              >
                <FileSpreadsheet className="w-3 h-3" />
                <span>CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* PORTAL NAVIGATION SUB-TABS */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-thin">
          {[
            { id: 'LIBRARY', label: 'LIBRARY PAPERS', icon: BookOpen, badge: `${filteredResources.length}` },
            { id: 'NEWS_FEED', label: 'CLIMATE NEWS FEED', icon: Newspaper, badge: 'LIVE' },
            { id: 'QUIZ_REWARDS', label: 'QUIZ REWARDS STORE', icon: Gift, badge: `${rewardItems.filter(r => !r.claimed).length} AVAIL` },
            { id: 'IMPACT_TRACKER', label: 'IMPACT TRACKER', icon: Activity, badge: 'MY METRICS' },
            { id: 'COMMUNITY_FORUM', label: 'COMMUNITY FORUM', icon: Users, badge: `${forumThreads.length}` },
            { id: 'MARINE_MEDICINE', label: 'MARINE MEDICINE', icon: HeartPulse, badge: 'IMO & ANCIENT' },
            { id: 'TRENDS_RADAR', label: 'TRENDS RADAR', icon: TrendingUp, badge: 'HOT' },
            { id: 'SEARCH_INDEX', label: 'SEARCH INDEX', icon: Cpu, badge: 'INSTANT' },
            { id: 'PRIVATE_DMS', label: 'PRIVATE DMs', icon: Lock, badge: 'ENCRYPTED' },
            { id: 'EXPERT_QA', label: 'EXPERT Q&A', icon: UserCheck, badge: 'ACCREDITED' },
            { id: 'FORUM_DIGEST', label: 'FORUM DIGEST', icon: Printer, badge: 'WEEKLY' },
            { id: 'TOPIC_ALERTS', label: 'TOPIC ALERTS', icon: Bell, badge: `${subscribedTopics.length} SUBS` },
            { id: 'GAMIFICATION', label: 'METRICS & BADGES', icon: Trophy, badge: 'LEVEL 4' },
            { id: 'BLOG', label: 'CLIMATE BLOG', icon: MessageSquare, badge: `${blogPosts.length}` },
            { id: 'LEADERBOARD', label: 'LEADERBOARD', icon: Crown, badge: 'XP RANK' },
            { id: 'REPORT_GENERATOR', label: 'REPORT GENERATOR', icon: Printer, badge: 'AUDIT' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePortalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePortalTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 shrink-0 border ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-slate-950 text-emerald-300' : 'bg-slate-950 text-slate-400'}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* INTERACTIVE TAGGING SYSTEM CLOUD */}
        <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5" />
              <span>INTERACTIVE TAGGING SYSTEM (FILTER ALL PORTAL CONTENT)</span>
            </span>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-[10px] text-rose-400 font-bold hover:underline"
              >
                Clear Tag Filters ({selectedTags.length})
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ALL_AVAILABLE_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleToggleTag(tag)}
                  className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all font-bold ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {downloadToast && (
        <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-3 rounded-xl text-xs font-bold font-mono text-center animate-fadeIn">
          {downloadToast}
        </div>
      )}

      {/* INTERACTIVE QUIZ BANNER ACROSS ALL TABS */}
      <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-indigo-400 animate-bounce" />
            <div>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">GAMIFIED MARITIME LEARNING</span>
              <h2 className="text-base font-black text-white">Interactive Ocean Environment Mastery Quiz</h2>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-lg font-bold">
              QUIZ SCORE: {quizScore} / 100 XP
            </span>
            <button
              onClick={handleResetQuiz}
              className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-[10px] font-bold flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET QUIZ</span>
            </button>
          </div>
        </div>

        {!isQuizCompleted ? (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 font-sans text-xs">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span>Question {activeQuizQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-indigo-400 font-bold">{currentQuizQuestion.category}</span>
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
              {currentQuizQuestion.question}
            </h3>

            {/* OPTIONS */}
            <div className="space-y-2 pt-1 font-mono">
              {currentQuizQuestion.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = idx === currentQuizQuestion.correctAnswerIndex;
                let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-400';

                if (showQuizExplanation) {
                  if (isCorrect) optionStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                  else if (isSelected) optionStyle = 'bg-rose-500/20 border-rose-400 text-rose-300';
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-500/20 border-indigo-400 text-indigo-300 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuizOption(idx)}
                    disabled={showQuizExplanation}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{String.fromCharCode(65 + idx)}. {option}</span>
                    {showQuizExplanation && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {showQuizExplanation && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* EXPLANATION & NEXT BUTTON */}
            {showQuizExplanation && (
              <div className="bg-slate-950 p-3 rounded-xl border border-indigo-500/40 space-y-1.5 animate-fadeIn font-mono text-xs">
                <span className="text-indigo-400 font-bold block text-[10px] uppercase">EXPLANATION &amp; CITATION</span>
                <p className="text-slate-300 font-sans">{currentQuizQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-end pt-1 font-mono">
              {!showQuizExplanation ? (
                <button
                  onClick={handleConfirmQuizAnswer}
                  disabled={selectedOptionIndex === null}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-xs uppercase rounded-xl transition-all"
                >
                  CONFIRM ANSWER (+100 XP)
                </button>
              ) : (
                <button
                  onClick={handleNextQuizQuestion}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <span>{activeQuizQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'NEXT QUESTION' : 'CLAIM QUIZ REWARDS'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* QUIZ COMPLETE CERTIFICATE CARD */
          <div className="bg-slate-900 border border-emerald-500/50 p-5 rounded-2xl text-center space-y-3 animate-fadeIn">
            <Award className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded text-xs font-bold">
              UN OCEAN DECADE CERTIFICATE GRANTED
            </span>
            <h3 className="text-xl font-black text-white">Ocean Environmental Protection Specialist</h3>
            <p className="text-slate-300 text-xs font-sans max-w-lg mx-auto">
              You scored <strong className="text-emerald-300 font-mono text-sm">{quizScore} / 100 XP</strong> on the assessment. Earned <strong className="text-amber-300 font-mono">+100 XP &amp; +50 $OD Tokens</strong> added to your profile!
            </p>
            <div className="flex justify-center space-x-3 pt-1">
              <button
                onClick={handleResetQuiz}
                className="px-5 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase rounded-xl transition-all"
              >
                RETAKE QUIZ
              </button>
              <button
                onClick={() => setActivePortalTab('QUIZ_REWARDS')}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all flex items-center space-x-1"
              >
                <Gift className="w-4 h-4" />
                <span>REDEEM REWARDS STORE</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 1: RESEARCH PAPERS LIBRARY TAB */}
      {activePortalTab === 'LIBRARY' && (
        <div className="space-y-6">
          {/* SEARCH CONTROL BAR */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research papers, MARPOL regulations, blue carbon, DOI, author, or tags (e.g. 'CII', 'Sundarbans')..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400 placeholder:text-slate-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* RESOURCE CATEGORIES VISUAL PILL TABS */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all border flex items-center space-x-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-lg'
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      selectedCategory === cat.id ? 'bg-slate-950 text-emerald-300' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    {cat.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* AI KNOWLEDGE ASSISTANT WIDGET */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
              <h2 className="text-base font-black text-white">Ask AI Ocean Environmental Librarian</h2>
            </div>

            <form onSubmit={handleAskAiLibrary} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask a question (e.g. 'How do Sundarbans mangroves compare to seagrass in carbon credits?')"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                disabled={isAiAnswering}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shrink-0 flex items-center justify-center space-x-2"
              >
                {isAiAnswering ? (
                  <span>CONSULTING ARCHIVE...</span>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>QUERY LIBRARY</span>
                  </>
                )}
              </button>
            </form>

            {aiAnswer && (
              <div className="bg-slate-900/90 border border-emerald-500/40 p-4 rounded-xl space-y-2 animate-fadeIn text-xs font-sans">
                <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase block">AI LIBRARIAN SYNTHESIS ANSWER</span>
                <p className="text-slate-200 whitespace-pre-line leading-relaxed">{aiAnswer}</p>
              </div>
            )}
          </div>

          {/* RESOURCE PUBLICATIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((res) => {
              const isBookmarked = bookmarkedIds.includes(res.id);
              return (
                <div
                  key={res.id}
                  onClick={() => setSelectedResourceModal(res)}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer space-y-4 shadow-xl flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase">
                        {res.badge}
                      </span>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400">{res.readTimeMinutes} min read</span>
                        <button
                          onClick={(e) => handleToggleBookmark(res.id, e)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isBookmarked
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'
                          }`}
                          title="Bookmark Resource"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {res.title}
                    </h3>

                    <p className="text-slate-400 text-xs font-sans line-clamp-3 leading-relaxed">
                      {res.summary}
                    </p>

                    {/* TAGS ROW */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {res.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="bg-slate-900 text-slate-400 border border-slate-800 text-[9px] px-2 py-0.5 rounded font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800/80">
                    <div className="text-[11px] text-slate-400 font-sans space-y-0.5">
                      <div className="truncate"><strong className="text-slate-300">Publisher:</strong> {res.author}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>DOI: {res.doiOrRef}</span>
                        <span>Published: {res.publicationDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={(e) => handleDownloadPdf(res, e)}
                        className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-400 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold font-mono rounded-lg transition-all flex items-center space-x-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>DOWNLOAD REPORT</span>
                      </button>

                      <span className="text-xs text-slate-400 font-mono flex items-center space-x-1">
                        <span>★ {res.rating}</span>
                        <span className="text-[10px] text-slate-600">({res.downloadCount.toLocaleString()} dl)</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: CLIMATE NEWS FEEDS TAB */}
      {activePortalTab === 'NEWS_FEED' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-cyan-500/20 border border-cyan-400/40 rounded-xl">
                  <Newspaper className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Real-Time Global Ocean &amp; Climate News Feed</h2>
                  <p className="text-xs text-slate-400 font-sans">Live telemetry &amp; policy releases from IMO, UNEP, Copernicus Marine, and NOAA</p>
                </div>
              </div>

              {/* CATEGORY FILTER FOR NEWS */}
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                {['ALL', 'IMO', 'COPERNICUS', 'UNEP', 'NOAA'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewsCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      newsCategoryFilter === cat
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsItems
                .filter((n) => newsCategoryFilter === 'ALL' || n.category === newsCategoryFilter)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-2xl space-y-3 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
                          {item.sourceBadge}
                        </span>
                        <span className="text-[10px] text-slate-500">{item.timeAgo}</span>
                      </div>

                      <h3 className="text-sm font-black text-white leading-snug">{item.title}</h3>
                      <p className="text-slate-400 text-xs font-sans leading-relaxed">{item.snippet}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        item.impactLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        IMPACT: {item.impactLevel}
                      </span>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center space-x-1"
                      >
                        <span>OFFICIAL BULLETIN</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: CLIMATE QUIZ REWARDS TAB */}
      {activePortalTab === 'QUIZ_REWARDS' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500/20 border border-amber-400/40 rounded-xl">
                  <Gift className="w-6 h-6 text-amber-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Climate Quiz Rewards Store</h2>
                  <p className="text-xs text-slate-400 font-sans">Redeem earned Ocean Dollars ($OD) &amp; Quiz XP for real-world environmental impact</p>
                </div>
              </div>

              <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 flex items-center space-x-4">
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold uppercase">AVAILABLE BALANCES</span>
                  <div className="flex items-center space-x-3 text-xs font-black">
                    <span className="text-amber-300">{userODBalance} $OD</span>
                    <span className="text-emerald-300">{userXPBalance} XP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewardItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-slate-900 border p-5 rounded-2xl space-y-4 transition-all flex flex-col justify-between ${
                    item.claimed ? 'border-emerald-500/40 opacity-80' : 'border-slate-800 hover:border-amber-500/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase">
                        {item.category.replace('_', ' ')}
                      </span>
                      {item.claimed && (
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>CLAIMED &amp; DEPLOYED</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-white">{item.title}</h3>
                    <p className="text-slate-400 text-xs font-sans leading-relaxed">{item.description}</p>

                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 flex items-center space-x-2">
                      <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Impact: {item.impactMetric}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <div className="text-xs font-mono">
                      <span className="text-amber-300 font-bold">{item.costOD} $OD</span>
                      <span className="text-slate-500 mx-1.5">+</span>
                      <span className="text-emerald-300 font-bold">{item.costXP} XP</span>
                    </div>

                    <button
                      onClick={() => handleClaimReward(item)}
                      disabled={item.claimed}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center space-x-1.5 ${
                        item.claimed
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span>{item.claimed ? 'REWARD CLAIMED' : 'CLAIM REWARD'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CLIMATE IMPACT TRACKER TAB */}
      {activePortalTab === 'IMPACT_TRACKER' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4 flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/20 border border-emerald-400/40 rounded-xl">
                <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Personal &amp; Vessel Climate Impact Tracker</h2>
                <p className="text-xs text-slate-400 font-sans">Verified lifetime environmental metrics generated through app activity &amp; vessel telemetry</p>
              </div>
            </div>

            {/* IMPACT KPI TILES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">CO2 EMISSIONS PREVENTED</span>
                <strong className="text-2xl font-black text-emerald-400 block">1,420 MT</strong>
                <span className="text-[10px] text-slate-500 font-sans">Equivalent to planting 14,200 trees</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">OCEAN PLASTIC INTERCEPTED</span>
                <strong className="text-2xl font-black text-cyan-400 block">350 KG</strong>
                <span className="text-[10px] text-slate-500 font-sans">PETase drone skimmer verified</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">BLUE CARBON ACRES</span>
                <strong className="text-2xl font-black text-indigo-400 block">12.5 Hectares</strong>
                <span className="text-[10px] text-slate-500 font-sans">Sundarbans &amp; Palk Strait beds</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">ACOUSTIC STRESS MITIGATION</span>
                <strong className="text-2xl font-black text-amber-400 block">-14 dB Ambient</strong>
                <span className="text-[10px] text-slate-500 font-sans">Protected whale sanctuary corridors</span>
              </div>
            </div>

            {/* ECO-RANK PROGRESS BAR */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 font-sans">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">CURRENT ECO-RANK TIER</span>
                  <strong className="text-emerald-300 font-mono text-sm">Tier IV: Master Ocean Guardian</strong>
                </div>
                <span className="text-emerald-400 font-mono font-bold">750 / 1000 XP (75%)</span>
              </div>

              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-cyan-500 via-emerald-400 to-indigo-500 h-full w-[75%] rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: COMMUNITY FORUM PORTAL TAB */}
      {activePortalTab === 'COMMUNITY_FORUM' && (
        <div className="space-y-6 animate-fadeIn">
          {/* MODERATION CONTROL BAR */}
          <ForumModerationAndRules
            isModeratorMode={isModeratorMode}
            onToggleModeratorMode={() => setIsModeratorMode(!isModeratorMode)}
            onFlagThread={(id, reason) => triggerToast(`🚩 Thread #${id} reported for moderation review: "${reason}"`)}
            onLockThread={(id) => triggerToast(`🔒 Thread #${id} locked by forum moderator.`)}
            onPinThread={(id) => triggerToast(`📌 Thread #${id} pinned to top of forum.`)}
            flaggedCount={1}
          />

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-indigo-500/20 border border-indigo-400/40 rounded-xl">
                  <Users className="w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Maritime &amp; Ocean Science Community Forum</h2>
                  <p className="text-xs text-slate-400 font-sans">Discuss MARPOL compliance, alternative fuels, and ocean conservation with global specialists</p>
                </div>
              </div>

              <button
                onClick={() => setShowNewThreadModal(true)}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all flex items-center space-x-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>START NEW THREAD</span>
              </button>
            </div>

            {/* THREAD SEARCH */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={forumSearch}
                onChange={(e) => setForumSearch(e.target.value)}
                placeholder="Search forum topics, CII penalties, green ammonia, blue carbon..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            {/* THREADS LIST */}
            <div className="space-y-4">
              {forumThreads
                .filter(
                  (t) =>
                    !forumSearch ||
                    t.title.toLowerCase().includes(forumSearch.toLowerCase()) ||
                    t.body.toLowerCase().includes(forumSearch.toLowerCase())
                )
                .map((thread) => (
                  <div key={thread.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                            {thread.category.replace('_', ' ')}
                          </span>
                          {thread.isPinned && (
                            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
                              📌 PINNED
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-black text-white">{thread.title}</h3>
                        <div className="text-xs text-slate-400 font-sans flex flex-wrap items-center gap-2">
                          <span>
                            Posted by <strong className="text-emerald-300">{thread.author}</strong> ({thread.authorRole})
                          </span>
                          <button
                            onClick={() =>
                              setSelectedExpertModal({
                                name: thread.author,
                                role: thread.authorRole,
                                accreditationId: `UN-OD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                                institution: 'UN Ocean Decade accredited research body'
                              })
                            }
                            className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[9px] font-black uppercase flex items-center space-x-1 hover:bg-amber-500/30 transition-all cursor-pointer"
                          >
                            <ShieldCheck className="w-3 h-3 text-amber-400" />
                            <span>★ UN ACCREDITED EXPERT</span>
                          </button>
                          <span>• {thread.timestamp}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 font-mono">
                        <button
                          onClick={() => {
                            if (userODBalance < 10) {
                              triggerToast('⚠️ Insufficient $OD balance! Complete quizzes or impact tasks to earn $OD.');
                              return;
                            }
                            setUserODBalance((prev) => prev - 10);
                            setUserXPBalance((prev) => prev + 15);
                            triggerToast(`🪙 Tipped 10 $OD to ${thread.author}! +15 XP earned for community generosity.`);
                          }}
                          className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all"
                          title="Tip 10 Ocean Dollars ($OD) to Author"
                        >
                          <Coins className="w-3.5 h-3.5 text-amber-400" />
                          <span>TIP 10 $OD</span>
                        </button>

                        <button
                          onClick={() => {
                            setActivePortalTab('PRIVATE_DMS');
                            triggerToast(`🔒 Initiated Private DM thread with ${thread.author}`);
                          }}
                          className="px-2.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all"
                          title="Start End-to-End Encrypted Private DM"
                        >
                          <Lock className="w-3.5 h-3.5 text-indigo-400" />
                          <span>DM</span>
                        </button>

                        <button
                          onClick={() => handleUpvoteThread(thread.id)}
                          className="px-3 py-1.5 bg-slate-950 hover:bg-indigo-500/20 text-indigo-300 border border-slate-800 rounded-xl text-xs font-bold flex items-center space-x-1"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{thread.upvotes}</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs font-sans leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                      {thread.body}
                    </p>

                    {/* GAMIFIED BOUNTY TAG */}
                    <div className="flex items-center justify-between text-[10px] font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span>EXPERT SOLUTION BOUNTY: +50 XP / +25 $OD</span>
                      </span>
                      <span className="text-slate-400">UN OCEAN DECADE FORUM GAMIFICATION</span>
                    </div>

                    {/* REPLIES */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase">
                        REPLIES ({thread.replies.length})
                      </span>
                      {thread.replies.map((reply) => (
                        <div key={reply.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-sans space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                            <div className="flex items-center space-x-2">
                              <strong>{reply.author} ({reply.role})</strong>
                              <button
                                onClick={() =>
                                  setSelectedExpertModal({
                                    name: reply.author,
                                    role: reply.role,
                                    accreditationId: `UN-OD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                                    institution: 'IMO Regulatory Body / Oceanographic Service'
                                  })
                                }
                                className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded text-[8px] font-bold"
                              >
                                ★ VERIFIED EXPERT
                              </button>
                            </div>
                            <span className="text-slate-500">{reply.time}</span>
                          </div>
                          <p className="text-slate-200">{reply.text}</p>
                        </div>
                      ))}

                      {/* REPLY FORM */}
                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          value={newThreadReplyInput[thread.id] || ''}
                          onChange={(e) =>
                            setNewThreadReplyInput({ ...newThreadReplyInput, [thread.id]: e.target.value })
                          }
                          placeholder="Write a reply..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-400"
                        />
                        <button
                          onClick={() => handleAddForumReply(thread.id)}
                          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shrink-0"
                        >
                          REPLY
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: MARINE MEDICAL & PHARMACOPEIA TAB */}
      {activePortalTab === 'MARINE_MEDICINE' && (
        <MarineMedicalSystem
          onRewardXPAndOD={(xp, od, msg) => {
            setUserXPBalance((prev) => prev + xp);
            setUserODBalance((prev) => prev + od);
            triggerToast(msg);
          }}
          onTriggerToast={triggerToast}
        />
      )}

      {/* SECTION: FORUM TRENDS RADAR TAB */}
      {activePortalTab === 'TRENDS_RADAR' && (
        <ForumTrendsRadar
          onSelectTopicTag={(tag) => {
            setForumSearch(tag);
            setActivePortalTab('COMMUNITY_FORUM');
          }}
          onTriggerToast={triggerToast}
        />
      )}

      {/* SECTION: FORUM SEARCH INDEXER TAB */}
      {activePortalTab === 'SEARCH_INDEX' && (
        <ForumSearchIndexer
          onSelectThread={(threadId) => {
            setActivePortalTab('COMMUNITY_FORUM');
          }}
          onTriggerToast={triggerToast}
        />
      )}

      {/* SECTION: PRIVATE THREAD DMS TAB */}
      {activePortalTab === 'PRIVATE_DMS' && (
        <PrivateThreadDMs
          onRewardXPAndOD={(xp, od, msg) => {
            setUserXPBalance((prev) => prev + xp);
            setUserODBalance((prev) => prev + od);
            triggerToast(msg);
          }}
          onTriggerToast={triggerToast}
        />
      )}

      {/* SECTION: EXPERT Q&A TAB */}
      {activePortalTab === 'EXPERT_QA' && (
        <ExpertQASection
          onRewardXPAndOD={(xp, od, msg) => {
            setUserXPBalance((prev) => prev + xp);
            setUserODBalance((prev) => prev + od);
            triggerToast(msg);
          }}
        />
      )}

      {/* SECTION: FORUM DIGEST GENERATOR TAB */}
      {activePortalTab === 'FORUM_DIGEST' && (
        <ForumDigestGenerator onTriggerToast={triggerToast} />
      )}

      {/* SECTION: TOPIC SUBSCRIPTION ALERTS TAB */}
      {activePortalTab === 'TOPIC_ALERTS' && (
        <TopicSubscriptionAlerts
          allAvailableTags={ALL_AVAILABLE_TAGS}
          subscribedTopics={subscribedTopics}
          onToggleTopicSubscription={(topic) => {
            setSubscribedTopics((prev) =>
              prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
            );
          }}
          onTriggerToast={triggerToast}
        />
      )}

      {/* SECTION: GAMIFIED ENGAGEMENT METRICS TAB */}
      {activePortalTab === 'GAMIFICATION' && (
        <GamifiedEngagementMetrics
          userXP={userXPBalance}
          userOD={userODBalance}
          streakDays={7}
          userLevel={4}
          userLevelTitle="Level 4: Master Ocean Guardian"
          unlockedBadges={['MARPOL Scholar', 'Ocean Sentinel', 'Top Contributor']}
          forumPostsCount={forumThreads.length}
          upvotesCount={42}
          expertSolutionsAcceptedCount={3}
        />
      )}

      {/* SECTION 6: CLIMATE RESEARCH BLOG TAB */}
      {activePortalTab === 'BLOG' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-black text-white">Ocean Science &amp; Marine Climate Research Blog</h2>
              </div>
              <span className="text-xs text-slate-400 font-sans">Peer-reviewed commentary from maritime climate researchers</span>
            </div>

            <div className="space-y-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-base font-black text-white">{post.title}</h3>
                      <div className="text-xs text-slate-400 font-sans mt-0.5">
                        By <strong className="text-emerald-300">{post.authorName}</strong> ({post.authorRole}) • {post.date}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                      {post.readTime}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs font-sans leading-relaxed">{post.summary}</p>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((t, idx) => (
                        <span key={idx} className="bg-slate-950 text-emerald-400 text-[9px] px-2 py-0.5 rounded border border-slate-800">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="px-3 py-1 bg-slate-950 hover:bg-rose-500/20 text-rose-300 border border-slate-800 rounded text-xs font-bold flex items-center space-x-1.5"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-rose-400" />
                      <span>{post.likes} LIKES</span>
                    </button>
                  </div>

                  {/* COMMENTS SECTION */}
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-3 font-sans">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase block">SPECIALIST COMMENTS ({post.comments.length})</span>
                    <div className="space-y-2">
                      {post.comments.map((c) => (
                        <div key={c.id} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
                          <div className="flex justify-between text-[10px] font-mono text-emerald-400">
                            <strong>{c.user}</strong>
                            <span className="text-slate-500">{c.time}</span>
                          </div>
                          <p className="text-slate-200">{c.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={newCommentInput[post.id] || ''}
                        onChange={(e) => setNewCommentInput({ ...newCommentInput, [post.id]: e.target.value })}
                        placeholder="Add a scientific comment..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                      />
                      <button
                        onClick={() => handleAddBlogComment(post.id)}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shrink-0"
                      >
                        POST
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: LEADERBOARD TAB */}
      {activePortalTab === 'LEADERBOARD' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-amber-400 animate-bounce" />
                <h2 className="text-lg font-black text-white">Global Ocean Environment Quiz Leaderboard</h2>
              </div>
              <span className="text-xs text-slate-400 font-sans">Ranked by accumulated XP and $OD tokens earned</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="py-3 px-3">RANK</th>
                    <th className="py-3 px-3">SPECIALIST / VESSEL</th>
                    <th className="py-3 px-3">NATION</th>
                    <th className="py-3 px-3 text-right">XP SCORE</th>
                    <th className="py-3 px-3 text-right">REWARD ($OD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {leaderboard.map((user) => (
                    <tr key={user.rank} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-black text-xs ${
                          user.rank === 1 ? 'bg-amber-400 text-slate-950' : user.rank === 2 ? 'bg-slate-300 text-slate-950' : user.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-900 text-slate-400'
                        }`}>
                          {user.rank}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div>
                          <strong className="text-white block">{user.name}</strong>
                          <span className="text-[10px] text-slate-400 font-sans">{user.title} • {user.vesselOrInstitution}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{user.country}</td>
                      <td className="py-3 px-3 text-right font-black text-emerald-400">{user.xpScore.toLocaleString()} XP</td>
                      <td className="py-3 px-3 text-right font-black text-amber-300">{user.oceanDollarReward} $OD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: EXPORT REPORT GENERATOR TAB */}
      {activePortalTab === 'REPORT_GENERATOR' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
              <Printer className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-black text-white">Custom Executive Audit &amp; Decarbonization Report Generator</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 font-sans text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Report Title</label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Vessel / Institution Name</label>
                  <input
                    type="text"
                    value={reportVesselName}
                    onChange={(e) => setReportVesselName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-slate-300 font-bold block">Include Report Sections</label>
                  <label className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeMarpolSection}
                      onChange={(e) => setIncludeMarpolSection(e.target.checked)}
                      className="accent-emerald-500 rounded"
                    />
                    <span className="text-slate-200">1. MARPOL Annex VI &amp; SEEMP Compliance Status</span>
                  </label>

                  <label className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeCiiMetrics}
                      onChange={(e) => setIncludeCiiMetrics(e.target.checked)}
                      className="accent-emerald-500 rounded"
                    />
                    <span className="text-slate-200">2. Operational CII Carbon Intensity &amp; Fuel Reduction</span>
                  </label>

                  <label className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBlueCarbon}
                      onChange={(e) => setIncludeBlueCarbon(e.target.checked)}
                      className="accent-emerald-500 rounded"
                    />
                    <span className="text-slate-200">3. Blue Carbon Offset Allocation ($OD Credits)</span>
                  </label>

                  <label className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeQuizCertificate}
                      onChange={(e) => setIncludeQuizCertificate(e.target.checked)}
                      className="accent-emerald-500 rounded"
                    />
                    <span className="text-slate-200">4. Academic Assessment Certificate Verification</span>
                  </label>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Export Format</label>
                  <div className="grid grid-cols-3 gap-2 font-mono">
                    {(['PDF', 'CSV', 'HTML'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setReportFormat(fmt)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          reportFormat === fmt
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateCustomReport}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>GENERATE &amp; DOWNLOAD EXECUTIVE REPORT</span>
                </button>
              </div>

              {/* REPORT LIVE PREVIEW */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono text-[11px] text-slate-300 overflow-y-auto max-h-[420px]">
                <div className="text-center text-emerald-400 font-bold border-b border-slate-800 pb-2">
                  === LIVE REPORT DRAFT PREVIEW ===
                </div>
                <div><strong>TITLE:</strong> {reportTitle}</div>
                <div><strong>TARGET:</strong> {reportVesselName}</div>
                <div><strong>DATE:</strong> 2026-08-20</div>
                <div className="border-t border-slate-800 pt-2 space-y-1">
                  <div>[1] MARPOL Status: {includeMarpolSection ? 'INCLUDED (Grade A Verified)' : 'EXCLUDED'}</div>
                  <div>[2] CII Metrics: {includeCiiMetrics ? 'INCLUDED (-7.4% Fuel Oil Saved)' : 'EXCLUDED'}</div>
                  <div>[3] Blue Carbon: {includeBlueCarbon ? 'INCLUDED (350 $OD Tokens)' : 'EXCLUDED'}</div>
                  <div>[4] Quiz Certificate: {includeQuizCertificate ? `INCLUDED (${quizScore} XP)` : 'EXCLUDED'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW FORUM THREAD MODAL */}
      {showNewThreadModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateNewThread} className="bg-slate-900 border border-indigo-500/50 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">Start New Community Discussion</h3>
              <button
                type="button"
                onClick={() => setShowNewThreadModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Thread Category</label>
                <select
                  value={newThreadCategory}
                  onChange={(e) => setNewThreadCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 font-mono text-xs text-white"
                >
                  <option value="MARPOL_COMPLIANCE">MARPOL Annex VI Compliance</option>
                  <option value="BLUE_CARBON">Blue Carbon &amp; Credits</option>
                  <option value="ZERO_FUELS">Zero-Emission Fuels</option>
                  <option value="PLASTIC_TECH">Marine Plastics &amp; Biotech</option>
                  <option value="GENERAL">General Discussions</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Thread Title</label>
                <input
                  type="text"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  placeholder="e.g. Best practices for SFOC sensor calibration"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 font-mono text-xs text-white focus:outline-none focus:border-indigo-400"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Discussion Body</label>
                <textarea
                  value={newThreadBody}
                  onChange={(e) => setNewThreadBody(e.target.value)}
                  rows={4}
                  placeholder="Share details or question for the maritime community..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 font-mono text-xs text-white focus:outline-none focus:border-indigo-400"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowNewThreadModal(false)}
                className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-xl"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs uppercase rounded-xl"
              >
                PUBLISH THREAD
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FULL PUBLICATION DETAILS MODAL */}
      {selectedResourceModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase">
                  {selectedResourceModal.badge}
                </span>
                <h2 className="text-xl font-black text-white mt-1">{selectedResourceModal.title}</h2>
              </div>
              <button
                onClick={() => setSelectedResourceModal(null)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-3 font-sans text-xs text-slate-300">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
                <div><strong className="text-emerald-400">Author:</strong> {selectedResourceModal.author}</div>
                <div><strong className="text-emerald-400">Reference DOI:</strong> {selectedResourceModal.doiOrRef}</div>
                <div><strong className="text-emerald-400">Published Date:</strong> {selectedResourceModal.publicationDate}</div>
              </div>

              <div className="space-y-1">
                <strong className="text-white font-bold block text-sm">Abstract &amp; Summary</strong>
                <p className="leading-relaxed">{selectedResourceModal.summary}</p>
              </div>

              <div className="space-y-2 pt-2">
                <strong className="text-emerald-400 font-bold block text-sm font-mono">Key Findings &amp; Regulatory Takeaways</strong>
                <ul className="space-y-1.5 list-disc list-inside bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {selectedResourceModal.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="text-slate-200">{takeaway}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-4 font-mono">
              <button
                onClick={() => handleToggleBookmark(selectedResourceModal.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  bookmarkedIds.includes(selectedResourceModal.id)
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {bookmarkedIds.includes(selectedResourceModal.id) ? '★ BOOKMARKED' : '☆ ADD TO BOOKMARKS'}
              </button>

              <button
                onClick={() => handleDownloadPdf(selectedResourceModal)}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD REPORT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPERT CREDENTIALS VERIFICATION MODAL */}
      {selectedExpertModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="text-amber-400 font-bold text-xs uppercase">OFFICIAL EXPERT VERIFICATION BADGE</span>
              </div>
              <button
                onClick={() => setSelectedExpertModal(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 font-mono">
                <div className="text-white font-black text-sm">{selectedExpertModal.name}</div>
                <div className="text-emerald-400 text-xs font-bold">{selectedExpertModal.role}</div>
                <div className="text-slate-400 text-[10px]">{selectedExpertModal.institution}</div>
              </div>

              <div className="space-y-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">ACCREDITATION ID:</span>
                  <span className="text-amber-300 font-bold">{selectedExpertModal.accreditationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IMO MARPOL AUDITOR:</span>
                  <span className="text-emerald-400 font-bold">✓ VERIFIED ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">COMMUNITY REPUTATION:</span>
                  <span className="text-cyan-300 font-bold">TOP 1% SCIENTIST</span>
                </div>
              </div>

              <p className="text-slate-400 text-[10px] leading-relaxed">
                This specialist has passed rigorous credentials evaluation by the UN Ocean Decade Steering Committee and holds verified auditing rights for MARPOL Annex VI compliance telemetry.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800 font-mono">
              <button
                onClick={() => {
                  setSelectedExpertModal(null);
                  setActivePortalTab('PRIVATE_DMS');
                  triggerToast(`🔒 Opened Encrypted DM channel with ${selectedExpertModal.name}`);
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase rounded-xl transition-all flex items-center justify-center space-x-1.5"
              >
                <Lock className="w-4 h-4" />
                <span>START PRIVATE DM WITH EXPERT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
