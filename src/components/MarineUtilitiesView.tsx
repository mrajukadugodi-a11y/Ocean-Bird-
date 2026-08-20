import React, { useState, useEffect } from 'react';
import { CargoStabilityManifest } from './CargoStabilityManifest';
import {
  HelpCircle,
  Clock,
  ArrowRightLeft,
  Ship,
  Search,
  CheckCircle2,
  AlertTriangle,
  Play,
  Square,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Anchor,
  Compass,
  Zap,
  Globe2,
  ShieldCheck,
  Layers,
  Fuel,
  MapPin,
  Activity,
  BookOpen,
  History,
  FileText,
  Copy,
  Info,
  Calendar,
  Award,
  Download,
  Check,
  Sliders,
  Eye,
  ChevronRight,
  LayoutDashboard,
  Scale,
  Languages,
  Moon,
  Sun,
  Plus,
  Trash2,
  Gauge,
  Radio,
  Crosshair,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

// --- 1. MARINE DICTIONARY TYPES & DATA ---
export interface DictionaryTerm {
  id: string;
  term: string;
  phonetic?: string;
  category: 'NAVIGATION' | 'SHIP_STRUCTURE' | 'STABILITY' | 'REGULATORY' | 'ENGINEERING' | 'CARGO';
  definition: string;
  exampleUsage: string;
}

const MARINE_DICTIONARY_TERMS: DictionaryTerm[] = [
  {
    id: 'DICT-01',
    term: 'ECDIS',
    phonetic: '/ˈek.dɪs/',
    category: 'NAVIGATION',
    definition: 'Electronic Chart Display and Information System. A geographic information system used for nautical navigation that complies with International Maritime Organization (IMO) SOLAS regulations as an alternative to paper nautical charts.',
    exampleUsage: 'The Officer of the Watch verified the safety contour settings on the primary ECDIS before entering the Singapore Strait.'
  },
  {
    id: 'DICT-02',
    term: 'Deadweight Tonnage (DWT)',
    phonetic: '/ˈded.weɪt ˈtʌn.ɪdʒ/',
    category: 'STABILITY',
    definition: 'A measure of how much weight a vessel can safely carry, including cargo, fuel, fresh water, ballast water, provisions, passengers, and crew. It excludes the lightship weight of the vessel itself.',
    exampleUsage: 'The VLOC (Very Large Ore Carrier) features a maximum deadweight tonnage of 300,000 DWT.'
  },
  {
    id: 'DICT-03',
    term: 'Metacentric Height (GM)',
    phonetic: '/ˌmet.əˈsen.trɪk haɪt/',
    category: 'STABILITY',
    definition: 'The distance between the center of gravity (G) of a ship and its metacenter (M). A positive GM provides initial static stability, resisting heel angles caused by external wave action or cargo shifting.',
    exampleUsage: 'The Chief Officer calculated a GM of 1.85 meters following ballast water exchange in the Bay of Bengal.'
  },
  {
    id: 'DICT-04',
    term: 'COLREGs',
    phonetic: '/ˈkɒl.reɡz/',
    category: 'REGULATORY',
    definition: 'International Regulations for Preventing Collisions at Sea 1972. The fundamental rules of the road published by the IMO to prevent vessel collisions on the high seas and interconnected waterways.',
    exampleUsage: 'Under COLREG Rule 15, the give-way vessel in a crossing situation must take early and substantial action to keep clear.'
  },
  {
    id: 'DICT-05',
    term: 'Freeboard',
    phonetic: '/ˈfriː.bɔːd/',
    category: 'SHIP_STRUCTURE',
    definition: 'The vertical distance measured amidships along the ship’s side between the summer load waterline and the top of the freeboard deck. It ensures adequate reserve buoyancy.',
    exampleUsage: 'The vessel maintained a minimum summer freeboard of 4.2 meters prior to departing Colombo.'
  },
  {
    id: 'DICT-06',
    term: 'Squat Effect',
    phonetic: '/skwɒt ɪˈfekt/',
    category: 'NAVIGATION',
    definition: 'The hydrodynamic phenomenon where a ship moving through shallow water experiences a reduction in under-keel clearance (UKC) and an increase in draft due to water displacement flow under the hull.',
    exampleUsage: 'Speed was reduced to 8 knots in the Malacca Strait to minimize shallow water squat effect.'
  },
  {
    id: 'DICT-07',
    term: 'Plimsoll Line',
    phonetic: '/ˈplɪm.səl laɪn/',
    category: 'REGULATORY',
    definition: 'A reference mark painted amidships on a ship’s hull indicating the maximum legal depth to which the vessel may be loaded for specific water temperatures and densities (Tropical, Summer, Winter, Fresh).',
    exampleUsage: 'The surveyor inspected the Plimsoll line marks to confirm compliance with Load Line regulations.'
  },
  {
    id: 'DICT-08',
    term: 'Bow Thruster',
    phonetic: '/baʊ ˈθrʌs.tər/',
    category: 'ENGINEERING',
    definition: 'A transverse propulsion device mounted in the bow tunnel of a ship to enhance maneuverability during berthing and unberthing operations without relying solely on tugs.',
    exampleUsage: 'The pilot engaged the 1,800 kW bow thruster to hold the vessel steady against the 2-knot harbor current.'
  },
  {
    id: 'DICT-09',
    term: 'TEU (Twenty-Foot Equivalent Unit)',
    phonetic: '/tiː.iːˈjuː/',
    category: 'CARGO',
    definition: 'An inexact unit of cargo capacity based on the volume of a standard 20-foot-long (6.1 m) intermodal container.',
    exampleUsage: 'The container ship loaded 14,500 TEUs at Nhava Sheva port.'
  },
  {
    id: 'DICT-10',
    term: 'SOLAS',
    phonetic: '/ˈsoʊ.læs/',
    category: 'REGULATORY',
    definition: 'International Convention for the Safety of Life at Sea. The most important international maritime safety treaty governing vessel construction, equipment, and operational safety standards.',
    exampleUsage: 'Weekly SOLAS lifeboat and fire drills were conducted by the Chief Mate off the coast of Sri Lanka.'
  }
];

// --- 2. MARINE FAQ TYPES & DATA ---
export interface FaqItem {
  id: string;
  category: 'NAVIGATION' | 'SAFETY_SOLAS' | 'WEATHER' | 'CREW_MLC' | 'BUNKERING';
  question: string;
  answer: string;
}

const MARINE_FAQS: FaqItem[] = [
  {
    id: 'FAQ-01',
    category: 'NAVIGATION',
    question: 'What is the difference between Heading (HDG) and Course Over Ground (COG)?',
    answer: 'Heading (HDG) is the direction the vessel’s bow is pointing relative to True or Magnetic North. Course Over Ground (COG) is the actual direction of motion over the seabed, taking into account ocean currents, wind leeway, and tidal drift.'
  },
  {
    id: 'FAQ-02',
    category: 'SAFETY_SOLAS',
    question: 'What are the mandatory look-out requirements under COLREG Rule 5?',
    answer: 'Rule 5 mandates that every vessel shall at all times maintain a proper look-out by sight and hearing as well as by all available means appropriate in the prevailing circumstances and conditions so as to make a full appraisal of the situation and of the risk of collision.'
  },
  {
    id: 'FAQ-03',
    category: 'WEATHER',
    question: 'How do I identify a developing tropical cyclone in South Asian waters?',
    answer: 'Key indicators in the Bay of Bengal or Arabian Sea include a rapid barometer drop exceeding 3 hPa in 3 hours, a heavy swell originating from the storm center, sustained wind shifts, and cirrus clouds radiating from a central point.'
  },
  {
    id: 'FAQ-04',
    category: 'CREW_MLC',
    question: 'What are the maximum work hours and minimum rest hours under MLC 2006?',
    answer: 'Under MLC 2006 Regulation 2.3, seafarers must receive a minimum of 10 hours of rest in any 24-hour period (which can be divided into no more than two periods, one of which must be at least 6 hours) and 77 hours in any 7-day period.'
  },
  {
    id: 'FAQ-05',
    category: 'BUNKERING',
    question: 'What is MARPOL Annex VI compliance for VLSFO fuel sulfur limits?',
    answer: 'Since January 1, 2020, the global sulfur limit for marine fuels outside Emission Control Areas (ECAs) is 0.50% m/m (Very Low Sulfur Fuel Oil - VLSFO). Inside Designated ECAs, the limit is strictly 0.10% m/m.'
  },
  {
    id: 'FAQ-06',
    category: 'NAVIGATION',
    question: 'How is Cross-Track Error (XTE) calculated on an ECDIS display?',
    answer: 'XTE measures the perpendicular distance in meters or nautical miles that a vessel strays to port or starboard from its planned leg track between two waypoints.'
  }
];

// --- 3. FLEET VESSELS DETAILED ASSET PROFILES ---
export interface VesselAssetProfile {
  imo: string;
  name: string;
  type: 'CONTAINER' | 'CRUDE_TANKER' | 'BULK_CARRIER' | 'CRUISE_SHIP' | 'LNG_CARRIER';
  flag: string;
  flagEmoji: string;
  callSign: string;
  mmsi: string;
  buildYear: number;
  classSociety: string;
  lengthOverallMeters: number;
  beamMeters: number;
  maxDraughtMeters: number;
  grossTonnage: number;
  deadweightTonnage: number;
  mainEngine: string;
  enginePowerKw: number;
  bowThrusterKw: number;
  fuelCapacityMt: number;
  lastSpecialSurvey: string;
  nextDrydockDate: string;
  speedKnots: number;
  origin: string;
  destination: string;
  etaUtc: string;
  status: 'UNDERWAY' | 'ANCHORED' | 'MOORED' | 'PILOTAGE';
  cargoCapacityDetails: string;
  ownerOperator: string;
}

const FLEET_ASSET_PROFILES: VesselAssetProfile[] = [
  {
    imo: 'IMO 9811000',
    name: 'MV South Asia Express',
    type: 'CONTAINER',
    flag: 'India',
    flagEmoji: '🇮🇳',
    callSign: 'VTEX9',
    mmsi: '419000112',
    buildYear: 2021,
    classSociety: 'Indian Register of Shipping (IRS) / DNV',
    lengthOverallMeters: 334,
    beamMeters: 48.2,
    maxDraughtMeters: 15.5,
    grossTonnage: 118500,
    deadweightTonnage: 122000,
    mainEngine: 'MAN B&W 11G95ME-C9.5 (58,200 kW @ 80 RPM)',
    enginePowerKw: 58200,
    bowThrusterKw: 2500,
    fuelCapacityMt: 6800,
    lastSpecialSurvey: '2024-05-12 (Mumbai Dockyard)',
    nextDrydockDate: '2027-05-10',
    speedKnots: 16.4,
    origin: 'JNPT Nhava Sheva',
    destination: 'Singapore Tuas',
    etaUtc: '2026-08-02 14:00 UTC',
    status: 'UNDERWAY',
    cargoCapacityDetails: '14,200 TEU (Including 1,400 Reefer Plugs)',
    ownerOperator: 'Shipping Corporation of India (SCI)'
  },
  {
    imo: 'IMO 9723412',
    name: 'MT Arabian Voyager',
    type: 'CRUDE_TANKER',
    flag: 'UAE',
    flagEmoji: '🇦🇪',
    callSign: 'A6AV2',
    mmsi: '470221009',
    buildYear: 2019,
    classSociety: 'American Bureau of Shipping (ABS)',
    lengthOverallMeters: 330,
    beamMeters: 60.0,
    maxDraughtMeters: 20.2,
    grossTonnage: 158000,
    deadweightTonnage: 299800,
    mainEngine: 'WinGD 7X82DF Dual-Fuel (31,500 kW @ 74 RPM)',
    enginePowerKw: 31500,
    bowThrusterKw: 2200,
    fuelCapacityMt: 8200,
    lastSpecialSurvey: '2024-01-20 (Fujairah Drydocks)',
    nextDrydockDate: '2026-12-15',
    speedKnots: 13.8,
    origin: 'Jebel Ali (Dubai)',
    destination: 'Fujairah Bunkering',
    etaUtc: '2026-07-31 18:30 UTC',
    status: 'UNDERWAY',
    cargoCapacityDetails: '320,000 m³ Light Crude Oil (15 Segregated Tanks)',
    ownerOperator: 'ADNOC Logistics & Services'
  },
  {
    imo: 'IMO 9645511',
    name: 'MV Bengal Titan',
    type: 'BULK_CARRIER',
    flag: 'Bangladesh',
    flagEmoji: '🇧🇩',
    callSign: 'S2BT7',
    mmsi: '405000388',
    buildYear: 2017,
    classSociety: 'Lloyd\'s Register (LR)',
    lengthOverallMeters: 229,
    beamMeters: 32.2,
    maxDraughtMeters: 14.5,
    grossTonnage: 43800,
    deadweightTonnage: 81500,
    mainEngine: 'MAN B&W 6S60ME-C8.2 (10,680 kW)',
    enginePowerKw: 10680,
    bowThrusterKw: 1200,
    fuelCapacityMt: 2400,
    lastSpecialSurvey: '2023-09-18 (Chittagong)',
    nextDrydockDate: '2026-09-15',
    speedKnots: 0.0,
    origin: 'Visakhapatnam',
    destination: 'Chittagong Outer Anchorage',
    etaUtc: '2026-07-31 09:15 UTC',
    status: 'ANCHORED',
    cargoCapacityDetails: '97,000 m³ Grain / Iron Ore (7 Cargo Holds with MacGregor Covers)',
    ownerOperator: 'Bangladesh Shipping Corporation'
  },
  {
    imo: 'IMO 9901122',
    name: 'MS Pearl of Ceylon',
    type: 'CRUISE_SHIP',
    flag: 'Sri Lanka',
    flagEmoji: '🇱🇰',
    callSign: '4QPC1',
    mmsi: '417002011',
    buildYear: 2022,
    classSociety: 'RINA / DNV',
    lengthOverallMeters: 290,
    beamMeters: 38.0,
    maxDraughtMeters: 8.2,
    grossTonnage: 98500,
    deadweightTonnage: 11200,
    mainEngine: 'Wärtsilä 12V46F Diesel-Electric (4x 14,400 kW)',
    enginePowerKw: 57600,
    bowThrusterKw: 3600,
    fuelCapacityMt: 3200,
    lastSpecialSurvey: '2025-02-10 (Colombo Dockyard)',
    nextDrydockDate: '2028-02-10',
    speedKnots: 18.2,
    origin: 'Colombo Port',
    destination: 'Malé Anchorage',
    etaUtc: '2026-08-01 06:00 UTC',
    status: 'UNDERWAY',
    cargoCapacityDetails: '2,400 Passengers (1,100 Luxury Cabins) + 850 Crew',
    ownerOperator: 'Ceylon Ocean Lines'
  }
];

// --- 4. UNIT CONVERSION HISTORY LOG ITEM ---
export interface ConversionHistoryLog {
  id: string;
  timestamp: string;
  category: string;
  inputValue: number;
  inputUnit: string;
  outputSummary: string;
}

// --- 5. LANGUAGE QUICK REFERENCE TYPES & DATA ---
export interface SmcpPhrase {
  id: string;
  category: 'DISTRESS_EMERGENCY' | 'BERTHING_TUGS' | 'NAVIGATION_WARNINGS' | 'ENGINE_COMMANDS' | 'ANCHOR_OPS';
  englishSmcp: string;
  spanish: string;
  french: string;
  mandarin: string;
  arabic: string;
  tagalog: string;
  hindi: string;
  phoneticSpoken: string;
  contextUsage: string;
}

const SMCP_PHRASES: SmcpPhrase[] = [
  {
    id: 'SMCP-01',
    category: 'DISTRESS_EMERGENCY',
    englishSmcp: 'Mayday Mayday Mayday. I am on fire and require immediate assistance.',
    spanish: 'Mayday Mayday Mayday. Tengo un incendio y requiero asistencia inmediata.',
    french: 'Mayday Mayday Mayday. J’ai un incendie et j’ai besoin d’une assistance immédiate.',
    mandarin: 'Mayday Mayday Mayday. 我船着火，需要立即援助。',
    arabic: 'مي داي مي داي مي داي. يوجد حريق على السفينة وأحتاج إلى مساعدة فورية.',
    tagalog: 'Mayday Mayday Mayday. May sunog sa aming barko at kailangan ng agarang tulong.',
    hindi: 'मेडे मेडे मेडे। जहाज पर आग लगी है और तत्काल सहायता की आवश्यकता है।',
    phoneticSpoken: 'MAY-DAY MAY-DAY MAY-DAY. EYE AM ON FIRE AND REE-KWY-ER IM-MEE-DEE-ATE AH-SIS-TANCE.',
    contextUsage: 'SOLAS VHF Ch 16 distress broadcast during uncontrolled vessel fire.'
  },
  {
    id: 'SMCP-02',
    category: 'BERTHING_TUGS',
    englishSmcp: 'Make fast tug forward. Keep tension on headline.',
    spanish: 'Asegure el remolcador a proa. Mantenga tensión en el cabo de proa.',
    french: 'Tournez le remorqueur à l’avant. Maintenez la tension sur la touline avant.',
    mandarin: '船艏拖轮缆绳系牢。保持首缆张力。',
    arabic: 'ربط القاطرة في المقدمة. حافظ على شد حبل المقدمة.',
    tagalog: 'Igapos ang tugboat sa unahan. Panatilihing tight ang lubid.',
    hindi: 'टग को आगे सुरक्षित बांधें। मुख्य रस्सी पर तनाव बनाए रखें।',
    phoneticSpoken: 'MAKE FAST TUG FOR-WARD. KEEP TEN-SHUN ON HEAD-LINE.',
    contextUsage: 'Port pilot instruction during berthing operation.'
  },
  {
    id: 'SMCP-03',
    category: 'NAVIGATION_WARNINGS',
    englishSmcp: 'I am altering course to starboard to pass clear of you.',
    spanish: 'Estoy cayendo a estribor para pasar claro de usted.',
    french: 'Je viens sur tribord pour vous passer au large.',
    mandarin: '我船正转向右舷，以避开贵船。',
    arabic: 'أنا أغير مساري إلى اليمين للمرور بآمان بعيداً عنكم.',
    tagalog: 'Kumakabig ako sa kanan upang makalampas sa inyo nang ligtas.',
    hindi: 'मैं आपसे सुरक्षित दूरी पर गुजरने के लिए स्टारबोर्ड (दाएं) मुड़ रहा हूं।',
    phoneticSpoken: 'EYE AM ALL-TER-ING COURSE TO STAR-BOARD TO PASS CLEAR OF YOU.',
    contextUsage: 'COLREG Rule 15 crossing situation agreement over VHF Ch 13/16.'
  },
  {
    id: 'SMCP-04',
    category: 'ENGINE_COMMANDS',
    englishSmcp: 'Finished with engines. Stand by main engine on 10 minutes notice.',
    spanish: 'Máquinas terminadas. Mantener máquina principal en atención a 10 minutos.',
    french: 'Terminé pour les machines. Moteur principal en veille à 10 minutes.',
    mandarin: '完车。主推进主机保持10分钟备车状态。',
    arabic: 'انتهى العمل مع المحركات. الاستعداد للمحرك الرئيسي بمهلة 10 دقائق.',
    tagalog: 'Tapos na sa makina. Stand by ang pangunahing makina sa loob ng 10 minuto.',
    hindi: 'इंजन का काम समाप्त। मुख्य इंजन को 10 मिनट के नोटिस पर तैयार रखें।',
    phoneticSpoken: 'FIN-ISHED WITH EN-GINES. STAND BY MAIN EN-GINE ON TEN MIN-UTES NO-TICE.',
    contextUsage: 'Command given by Captain to Chief Engineer after successful docking.'
  },
  {
    id: 'SMCP-05',
    category: 'ANCHOR_OPS',
    englishSmcp: 'Let go starboard anchor. 5 shackles in water on deck.',
    spanish: 'Fondo ancla de estribor. 5 paños en el agua sobre cubierta.',
    french: 'Mouillez l’ancre de tribord. 5 maillons dans l’eau.',
    mandarin: '抛右锚。水面已入5节锚链。',
    arabic: 'ألقِ مرساة اليمين. 5 أطواق في الماء.',
    tagalog: 'Ihulog ang kanang ancla. 5 shackles na sa tubig.',
    hindi: 'स्टारबोर्ड एंकर गिराएं। पानी में 5 शैकल (कड़ी) आ चुके हैं।',
    phoneticSpoken: 'LET GO STAR-BOARD AN-CHOR. FIVE SHACK-LES IN WA-TER.',
    contextUsage: 'Forecastle officer report to bridge during anchoring in roads.'
  }
];

export const MarineUtilitiesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'WATCHKEEPER_DASHBOARD' | 'CARGO_STABILITY' | 'LANGUAGE_QUICK_REF' | 'SHIFT_TIMER' | 'UNIT_CONVERTER' | 'VESSELS_SUMMARY' | 'MARINE_DICTIONARY' | 'MARINE_FAQ'
  >('WATCHKEEPER_DASHBOARD');

  // --- 1. WATCHKEEPER DASHBOARD STATE ---
  const [isNightModeActive, setIsNightModeActive] = useState<boolean>(false);
  const [watchOfficerName, setWatchOfficerName] = useState<string>('2nd Officer A. Sharma');
  const [vesselHeading, setVesselHeading] = useState<number>(142);
  const [vesselSog, setVesselSog] = useState<number>(15.4);
  const [vesselUnderKeelClearance, setVesselUnderKeelClearance] = useState<number>(4.8);
  const [watchLogs, setWatchLogs] = useState<Array<{ id: string; time: string; author: string; note: string }>>([
    { id: 'WL-1', time: '04:00 UTC', author: '2nd Officer A. Sharma', note: 'Took over middle watch. Checked ECDIS safety contour & Gyro error (0.4° W).' },
    { id: 'WL-2', time: '04:15 UTC', author: '2nd Officer A. Sharma', note: 'Exchanged VHF security agreement with M/T Eagle. CPA 1.2 NM confirmed.' }
  ]);
  const [newLogNote, setNewLogNote] = useState<string>('');

  const handleAddWatchLog = () => {
    if (!newLogNote.trim()) return;
    const logItem = {
      id: `WL-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' UTC',
      author: watchOfficerName,
      note: newLogNote
    };
    setWatchLogs([logItem, ...watchLogs]);
    setNewLogNote('');
  };

  // --- 2. CARGO STABILITY TOOL STATE ---
  const [hold1Mass, setHold1Mass] = useState<number>(12500);
  const [hold2Mass, setHold2Mass] = useState<number>(14200);
  const [hold3Mass, setHold3Mass] = useState<number>(11800);
  const [hold4Mass, setHold4Mass] = useState<number>(9500);

  const [portBallastMass, setPortBallastMass] = useState<number>(1800);
  const [starboardBallastMass, setStarboardBallastMass] = useState<number>(1200);

  const [freeSurfaceMoment, setFreeSurfaceMoment] = useState<number>(1450); // m-MT
  const [displacement, setDisplacement] = useState<number>(68000); // MT total

  // Calculated stability metrics
  const totalCargoMass = hold1Mass + hold2Mass + hold3Mass + hold4Mass;
  const totalBallastMass = portBallastMass + starboardBallastMass;
  const netDisplacement = displacement + totalCargoMass + totalBallastMass - 48000;

  // Approximate Center of Gravity (KG) & Metacentric Height (GM)
  const estimatedKM = 8.85; // meters
  const weightedKG = 6.95 + (totalCargoMass * 0.00004) - (totalBallastMass * 0.00008);
  const solidGM = estimatedKM - weightedKG;
  const fscCorrection = freeSurfaceMoment / Math.max(netDisplacement, 10000);
  const fluidGM = solidGM - fscCorrection;

  // List Angle calculation (transverse weight difference)
  const transverseMomentDiff = (starboardBallastMass - portBallastMass) * 8.5; // m-MT
  const listRadians = transverseMomentDiff / (Math.max(netDisplacement, 10000) * Math.max(fluidGM, 0.1));
  const listDegrees = Math.min(Math.max((listRadians * 180) / Math.PI, -25), 25);

  // Trim calculation (longitudinal weight difference hold 1 & 2 vs 3 & 4)
  const longitudinalDiff = (hold1Mass + hold2Mass) - (hold3Mass + hold4Mass);
  const trimMeters = (longitudinalDiff * 0.00025);

  // --- 3. LANGUAGE QUICK REFERENCE STATE ---
  const [smcpCategoryFilter, setSmcpCategoryFilter] = useState<string>('ALL');
  const [selectedLanguageTab, setSelectedLanguageTab] = useState<'SPANISH' | 'FRENCH' | 'MANDARIN' | 'ARABIC' | 'TAGALOG' | 'HINDI'>('SPANISH');
  const [smcpSearchQuery, setSmcpSearchQuery] = useState<string>('');
  const [copiedPhraseId, setCopiedPhraseId] = useState<string | null>(null);

  const filteredSmcp = SMCP_PHRASES.filter((item) => {
    const matchesCat = smcpCategoryFilter === 'ALL' || item.category === smcpCategoryFilter;
    const matchesQuery =
      item.englishSmcp.toLowerCase().includes(smcpSearchQuery.toLowerCase()) ||
      item.contextUsage.toLowerCase().includes(smcpSearchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCopyPhrase = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhraseId(id);
    setTimeout(() => setCopiedPhraseId(null), 2000);
  };

  // --- 4. SHIFT TIMER STATE & SHIFT OVERLAP INFO ---
  const [selectedShiftHours, setSelectedShiftHours] = useState<number>(4);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(4 * 3600);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isAlarmSoundEnabled, setIsAlarmSoundEnabled] = useState<boolean>(true);
  const [handoverChecks, setHandoverChecks] = useState<boolean[]>([true, true, false, false]);
  const [overlapMinsSetting, setOverlapMinsSetting] = useState<number>(15);

  const handoverChecklistText = [
    'Confirm steering mode (Hand / Auto / NFU) and compare Gyro vs Magnetic compass.',
    'Review radar targets, CPA/TCPA collision warnings, and VHF Channel 16 guard status.',
    'Check main engine RPM, generator loads, steering gear pressures, and bilges.',
    'Log position in official SOLAS deck logbook and verify next route waypoint.'
  ];

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const formatTimerTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectShiftPreset = (hrs: number) => {
    setSelectedShiftHours(hrs);
    setTimerSecondsLeft(hrs * 3600);
    setIsTimerRunning(false);
  };

  // --- 5. UNIT CONVERTER STATE & HISTORY LOG ---
  const [convCategory, setConvCategory] = useState<'SPEED' | 'DISTANCE' | 'DEPTH' | 'FUEL_MASS'>('SPEED');
  const [inputValue, setInputValue] = useState<number>(15);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistoryLog[]>([
    {
      id: 'LOG-101',
      timestamp: '04:15 UTC',
      category: 'SPEED',
      inputValue: 16.5,
      inputUnit: 'Knots',
      outputSummary: '30.56 km/h • 18.99 mph • 8.49 m/s'
    },
    {
      id: 'LOG-102',
      timestamp: '03:50 UTC',
      category: 'DISTANCE',
      inputValue: 890,
      inputUnit: 'Nautical Miles',
      outputSummary: '1,648.28 km • 1,024.19 miles'
    }
  ]);
  const [copySuccessMessage, setCopySuccessMessage] = useState<string | null>(null);

  // Speed calculations
  const knots = inputValue;
  const kmh = knots * 1.852;
  const mph = knots * 1.15078;
  const ms = knots * 0.514444;

  // Distance calculations
  const nauticalMiles = inputValue;
  const kilometers = nauticalMiles * 1.852;
  const statuteMiles = nauticalMiles * 1.15078;
  const fathomsDist = nauticalMiles * 1012.68;

  // Depth calculations
  const metersDepth = inputValue;
  const feetDepth = metersDepth * 3.28084;
  const fathomsDepth = metersDepth * 0.546807;

  // Fuel Mass VLSFO calculations
  const metricTonsFuel = inputValue;
  const barrelsFuel = metricTonsFuel * 6.8;
  const litersFuel = metricTonsFuel * 1063;

  const recordConversionToHistory = () => {
    let inputUnitStr = '';
    let summaryStr = '';

    if (convCategory === 'SPEED') {
      inputUnitStr = 'Knots';
      summaryStr = `${kmh.toFixed(2)} km/h • ${mph.toFixed(2)} mph • ${ms.toFixed(2)} m/s`;
    } else if (convCategory === 'DISTANCE') {
      inputUnitStr = 'NM';
      summaryStr = `${kilometers.toFixed(2)} km • ${statuteMiles.toFixed(2)} miles`;
    } else if (convCategory === 'DEPTH') {
      inputUnitStr = 'Meters Depth';
      summaryStr = `${feetDepth.toFixed(1)} ft • ${fathomsDepth.toFixed(1)} Fth`;
    } else {
      inputUnitStr = 'MT VLSFO';
      summaryStr = `~${barrelsFuel.toFixed(0)} bbls • ~${litersFuel.toLocaleString()} L`;
    }

    const newLog: ConversionHistoryLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' UTC',
      category: convCategory,
      inputValue,
      inputUnit: inputUnitStr,
      outputSummary: summaryStr
    };

    setConversionHistory([newLog, ...conversionHistory.slice(0, 9)]);
    setCopySuccessMessage('Conversion recorded to history log!');
    setTimeout(() => setCopySuccessMessage(null), 2500);
  };

  const clearConversionHistory = () => {
    setConversionHistory([]);
  };

  // --- 6. VESSELS SUMMARY & ASSET PROFILES ---
  const [selectedVesselAsset, setSelectedVesselAsset] = useState<VesselAssetProfile | null>(FLEET_ASSET_PROFILES[0]);
  const [vesselSearchQuery, setVesselSearchQuery] = useState<string>('');

  const filteredFleet = FLEET_ASSET_PROFILES.filter((v) =>
    v.name.toLowerCase().includes(vesselSearchQuery.toLowerCase()) ||
    v.imo.toLowerCase().includes(vesselSearchQuery.toLowerCase()) ||
    v.type.toLowerCase().includes(vesselSearchQuery.toLowerCase())
  );

  // --- 7. FAQ STATE ---
  const [faqCategory, setFaqCategory] = useState<string>('ALL');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('FAQ-01');

  const filteredFaqs = MARINE_FAQS.filter((f) => {
    const matchCat = faqCategory === 'ALL' || f.category === faqCategory;
    const matchQuery =
      f.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  // --- 8. DICTIONARY STATE ---
  const [dictCategory, setDictCategory] = useState<string>('ALL');
  const [dictSearchQuery, setDictSearchQuery] = useState<string>('');

  const filteredDictTerms = MARINE_DICTIONARY_TERMS.filter((t) => {
    const matchCat = dictCategory === 'ALL' || t.category === dictCategory;
    const matchQuery =
      t.term.toLowerCase().includes(dictSearchQuery.toLowerCase()) ||
      t.definition.toLowerCase().includes(dictSearchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div
      id="marine-utilities-suite-container"
      className={`space-y-6 font-mono transition-colors duration-500 p-2 sm:p-4 rounded-3xl ${
        isNightModeActive ? 'bg-red-950/90 text-red-100 border border-red-900' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Top Banner */}
      <div className={`border rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden ${
        isNightModeActive ? 'bg-black border-red-900' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className={`absolute -top-10 -right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isNightModeActive ? 'bg-red-600/20' : 'bg-cyan-500/10'
        }`} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className={`flex items-center space-x-2 font-bold text-xs uppercase tracking-wider mb-1 ${
              isNightModeActive ? 'text-red-400' : 'text-cyan-400'
            }`}>
              <Zap className="w-4 h-4 animate-pulse" />
              <span>OFFICER OF THE WATCH (OOW) MARITIME OPERATIONAL SUITE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Compass className={`w-6 h-6 ${isNightModeActive ? 'text-red-400' : 'text-cyan-400'}`} />
              <span>Watchkeeper, Cargo Stability, Marine Terms & Utilities Suite</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Complete bridge management toolset: Watchkeeper Live Telemetry, Cargo & Stability Metacentric Calculator, IMO SMCP Language Reference, Watch Shift Overlap, Unit Conversion History, Vessel Profiles, Marine Terms & SOLAS FAQs.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {/* Night Vision Red Mode Toggle */}
            <button
              onClick={() => setIsNightModeActive(!isNightModeActive)}
              className={`px-4 py-2.5 rounded-xl border font-bold flex items-center space-x-2 transition-all ${
                isNightModeActive
                  ? 'bg-red-900 border-red-600 text-red-200 shadow-lg shadow-red-950'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {isNightModeActive ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-red-400" />}
              <span>{isNightModeActive ? 'DISABLE NIGHT RED MODE' : 'NIGHT RED MODE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className={`border rounded-2xl p-2 flex flex-wrap items-center gap-2 text-xs ${
        isNightModeActive ? 'bg-black border-red-900' : 'bg-slate-900 border-slate-800'
      }`}>
        <button
          onClick={() => setActiveTab('WATCHKEEPER_DASHBOARD')}
          className={`py-2.5 px-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 min-w-[140px] ${
            activeTab === 'WATCHKEEPER_DASHBOARD'
              ? isNightModeActive ? 'bg-red-700 text-white' : 'bg-cyan-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>WATCHKEEPER DASHBOARD</span>
        </button>

        <button
          onClick={() => setActiveTab('CARGO_STABILITY')}
          className={`py-2.5 px-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 min-w-[140px] ${
            activeTab === 'CARGO_STABILITY'
              ? isNightModeActive ? 'bg-red-700 text-white' : 'bg-emerald-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>CARGO STABILITY TOOL</span>
        </button>

        <button
          onClick={() => setActiveTab('LANGUAGE_QUICK_REF')}
          className={`py-2.5 px-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 min-w-[140px] ${
            activeTab === 'LANGUAGE_QUICK_REF'
              ? isNightModeActive ? 'bg-red-700 text-white' : 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>LANGUAGE QUICK REF</span>
        </button>

        <button
          onClick={() => setActiveTab('SHIFT_TIMER')}
          className={`py-2.5 px-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 min-w-[130px] ${
            activeTab === 'SHIFT_TIMER'
              ? isNightModeActive ? 'bg-red-700 text-white' : 'bg-amber-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>SHIFT TIMER & OVERLAP</span>
        </button>

        <button
          onClick={() => setActiveTab('UNIT_CONVERTER')}
          className={`py-2.5 px-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 min-w-[130px] ${
            activeTab === 'UNIT_CONVERTER'
              ? isNightModeActive ? 'bg-red-700 text-white' : 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>CONVERTER & HISTORY</span>
        </button>

        <button
          onClick={() => setActiveTab('VESSELS_SUMMARY')}
          className={`py-2.5 px-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 min-w-[130px] ${
            activeTab === 'VESSELS_SUMMARY'
              ? isNightModeActive ? 'bg-red-700 text-white' : 'bg-teal-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Ship className="w-4 h-4" />
          <span>VESSEL PROFILES</span>
        </button>

        <button
          onClick={() => setActiveTab('MARINE_DICTIONARY')}
          className={`py-2.5 px-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 min-w-[130px] ${
            activeTab === 'MARINE_DICTIONARY'
              ? isNightModeActive ? 'bg-red-700 text-white' : 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>DICTIONARY</span>
        </button>

        <button
          onClick={() => setActiveTab('MARINE_FAQ')}
          className={`py-2.5 px-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 min-w-[120px] ${
            activeTab === 'MARINE_FAQ'
              ? isNightModeActive ? 'bg-red-700 text-white' : 'bg-rose-600 text-white shadow-lg'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>SOLAS FAQ</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* --- MODULE 1: WATCH KEEPER'S DASHBOARD --- */}
      {/* ========================================================================= */}
      {activeTab === 'WATCHKEEPER_DASHBOARD' && (
        <div className="space-y-6">
          {/* Top Gauges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Heading Gauge */}
            <div className={`p-4 rounded-2xl border space-y-2 ${isNightModeActive ? 'bg-red-950/60 border-red-900' : 'bg-slate-900 border-slate-800'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase flex items-center space-x-1">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>TRUE HEADING (HDG)</span>
                </span>
                <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded font-bold text-[10px]">GYRO 1</span>
              </div>
              <div className="text-3xl font-black text-cyan-300 font-mono flex items-baseline justify-between">
                <span>{vesselHeading}° T</span>
                <span className="text-xs text-slate-400 font-normal">MAG: {vesselHeading - 2}° M</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between font-sans pt-1 border-t border-slate-800/80">
                <span>Auto-Pilot Locked</span>
                <span className="text-emerald-400 font-bold">XTE: 0.02 NM P</span>
              </div>
            </div>

            {/* SOG / COG Gauge */}
            <div className={`p-4 rounded-2xl border space-y-2 ${isNightModeActive ? 'bg-red-950/60 border-red-900' : 'bg-slate-900 border-slate-800'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase flex items-center space-x-1">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span>SPEED OVER GROUND</span>
                </span>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold text-[10px]">DGPS</span>
              </div>
              <div className="text-3xl font-black text-emerald-300 font-mono flex items-baseline justify-between">
                <span>{vesselSog} KTS</span>
                <span className="text-xs text-slate-400 font-normal">COG: 144°</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between font-sans pt-1 border-t border-slate-800/80">
                <span>Engine RPM: 78.5</span>
                <span className="text-amber-400 font-bold">Slip: +2.1%</span>
              </div>
            </div>

            {/* Under-Keel Clearance UKC */}
            <div className={`p-4 rounded-2xl border space-y-2 ${isNightModeActive ? 'bg-red-950/60 border-red-900' : 'bg-slate-900 border-slate-800'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase flex items-center space-x-1">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>UNDER-KEEL CLEARANCE</span>
                </span>
                <span className="px-2 py-0.5 bg-amber-950 text-amber-300 rounded font-bold text-[10px]">ECHO SOUNDER</span>
              </div>
              <div className="text-3xl font-black text-amber-300 font-mono flex items-baseline justify-between">
                <span>{vesselUnderKeelClearance} M</span>
                <span className="text-xs text-slate-400 font-normal">DEPTH: 18.2M</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between font-sans pt-1 border-t border-slate-800/80">
                <span>Draft Aft: 13.4m</span>
                <span className="text-emerald-400 font-bold">SAFE UKC &gt; 3M</span>
              </div>
            </div>

            {/* Bridge Duty Officer */}
            <div className={`p-4 rounded-2xl border space-y-2 ${isNightModeActive ? 'bg-red-950/60 border-red-900' : 'bg-slate-900 border-slate-800'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>ACTIVE WATCH OFFICER</span>
                </span>
                <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded font-bold text-[10px]">0000 - 0400</span>
              </div>
              <div className="text-lg font-bold text-white font-mono truncate">
                {watchOfficerName}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between font-sans pt-1 border-t border-slate-800/80">
                <span>Lookout: AB M. Santos</span>
                <span className="text-cyan-400 font-bold">VHF CH 16/68 GUARD</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Spans: Radar AIS Guard & Weather Telemetry */}
            <div className="lg:col-span-2 space-y-6">
              {/* AIS Collision Avoidance CPA Monitor */}
              <div className={`p-5 rounded-2xl border space-y-4 ${isNightModeActive ? 'bg-red-950/60 border-red-900' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                    <Crosshair className="w-4 h-4 text-rose-400" />
                    <span>AIS Collision Guard & Active CPA/TCPA Target Alerts</span>
                  </h3>
                  <span className="px-2 py-0.5 bg-rose-950 border border-rose-800 text-rose-300 font-bold text-[10px] rounded">
                    2 TARGETS IN 12 NM
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  {/* Target 1 */}
                  <div className="p-3.5 bg-slate-950 border border-rose-500/40 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <strong className="text-white text-xs">MT Eagle Voyager (Tanker)</strong>
                      <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 font-mono font-bold text-[10px] rounded">GIVE-WAY VESSEL</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
                      <div>
                        <span className="text-slate-500 block text-[9px]">BEARING / DIST</span>
                        <strong>042° T / 4.8 NM</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">SOG / COG</span>
                        <strong>12.5 Kts / 220°</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">CPA (CLOSEST)</span>
                        <strong className="text-amber-400">1.15 NM</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">TCPA (TIME)</span>
                        <strong className="text-rose-400">18 MINS</strong>
                      </div>
                    </div>
                  </div>

                  {/* Target 2 */}
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <strong className="text-white text-xs">MV Colombo Star (Container)</strong>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] rounded">SAFE CLEARANCE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
                      <div>
                        <span className="text-slate-500 block text-[9px]">BEARING / DIST</span>
                        <strong>215° T / 9.2 NM</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">SOG / COG</span>
                        <strong>18.0 Kts / 090°</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">CPA (CLOSEST)</span>
                        <strong className="text-emerald-400">3.40 NM</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">TCPA (TIME)</span>
                        <strong className="text-slate-300">32 MINS</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Environmental Sea State & Weather Telemetry */}
              <div className={`p-5 rounded-2xl border space-y-3 ${isNightModeActive ? 'bg-red-950/60 border-red-900' : 'bg-slate-900 border-slate-800'}`}>
                <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  <span>Environmental & Weather Station Telemetry</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">TRUE WIND</span>
                    <strong className="text-cyan-300 text-sm">18 KTS (NE)</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">SEA SWELL</span>
                    <strong className="text-emerald-300 text-sm">1.8 M / 7 SEC</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">BAROMETER</span>
                    <strong className="text-amber-300 text-sm">1013.2 HPA</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">VISIBILITY</span>
                    <strong className="text-purple-300 text-sm">10.0 NM (CLEAR)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Span: Watch Log Logger */}
            <div className={`p-5 rounded-2xl border space-y-4 ${isNightModeActive ? 'bg-red-950/60 border-red-900' : 'bg-slate-900 border-slate-800'}`}>
              <div className="border-b border-slate-800 pb-2">
                <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Instant Watchkeeper Log Logger</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-sans">SOLAS Official Bridge Observation Sheet</span>
              </div>

              <div className="space-y-2 font-sans">
                <textarea
                  rows={3}
                  value={newLogNote}
                  onChange={(e) => setNewLogNote(e.target.value)}
                  placeholder="Type observation (e.g., Passed lighthouse, compass comparison, weather change)..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleAddWatchLog}
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>STAMP LOG ENTRY WITH TIMESTAMP</span>
                </button>
              </div>

              {/* Log History */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Recent Bridge Entries:</span>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {watchLogs.map((item) => (
                    <div key={item.id} className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono font-bold">
                        <span>{item.time}</span>
                        <span className="text-slate-400 font-normal">{item.author}</span>
                      </div>
                      <p className="text-slate-300 font-sans text-xs">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- MODULE 2: CARGO STABILITY TOOL --- */}
      {/* ========================================================================= */}
      {activeTab === 'CARGO_STABILITY' && (
        <CargoStabilityManifest isNightModeActive={isNightModeActive} />
      )}

      {/* ========================================================================= */}
      {/* --- MODULE 3: MARITIME LANGUAGE QUICK REFERENCE --- */}
      {/* ========================================================================= */}
      {activeTab === 'LANGUAGE_QUICK_REF' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-white text-base flex items-center space-x-2">
                  <Languages className="w-5 h-5 text-indigo-400" />
                  <span>IMO Standard Marine Communication Phrases (SMCP) & Multi-lingual Reference</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Multi-lingual maritime phrasebook for international bridge teams, pilots, tugmasters, and port controls.
                </p>
              </div>

              {/* Language Selector Tabs */}
              <div className="flex items-center space-x-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
                {(['SPANISH', 'FRENCH', 'MANDARIN', 'ARABIC', 'TAGALOG', 'HINDI'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguageTab(lang)}
                    className={`px-3 py-1.5 rounded-xl border transition-all ${
                      selectedLanguageTab === lang
                        ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Category & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 overflow-x-auto text-xs w-full sm:w-auto">
                {['ALL', 'DISTRESS_EMERGENCY', 'BERTHING_TUGS', 'NAVIGATION_WARNINGS', 'ENGINE_COMMANDS', 'ANCHOR_OPS'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSmcpCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-lg border shrink-0 ${
                      smcpCategoryFilter === cat
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search phrases..."
                  value={smcpSearchQuery}
                  onChange={(e) => setSmcpSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Phrases List Cards */}
            <div className="space-y-4">
              {filteredSmcp.map((item) => {
                const translatedText =
                  selectedLanguageTab === 'SPANISH'
                    ? item.spanish
                    : selectedLanguageTab === 'FRENCH'
                    ? item.french
                    : selectedLanguageTab === 'MANDARIN'
                    ? item.mandarin
                    : selectedLanguageTab === 'ARABIC'
                    ? item.arabic
                    : selectedLanguageTab === 'TAGALOG'
                    ? item.tagalog
                    : item.hindi;

                return (
                  <div key={item.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="px-2.5 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-bold text-[10px]">
                        {item.category.replace('_', ' ')}
                      </span>

                      <button
                        onClick={() => handleCopyPhrase(item.englishSmcp, item.id)}
                        className="px-3 py-1 bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white rounded-lg flex items-center space-x-1"
                      >
                        {copiedPhraseId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPhraseId === item.id ? 'COPIED' : 'COPY PHRASE'}</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">ENGLISH (IMO STANDARD):</span>
                      <p className="text-sm font-bold text-white">{item.englishSmcp}</p>
                    </div>

                    <div className="space-y-1 p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-xl">
                      <span className="text-[10px] text-indigo-400 uppercase font-bold block">{selectedLanguageTab} TRANSLATION:</span>
                      <p className="text-sm font-bold text-indigo-200 font-sans">{translatedText}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-sans pt-1 gap-2">
                      <div><strong>Phonetic Spoken:</strong> <span className="font-mono text-amber-300">{item.phoneticSpoken}</span></div>
                      <div className="text-[11px] text-slate-500 italic">"{item.contextUsage}"</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- MODULE 4: WATCH SHIFT TIMER & OVERLAP --- */}
      {/* ========================================================================= */}
      {activeTab === 'SHIFT_TIMER' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel: Digital Countdown Timer Console */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Navigational & Engine Watchkeeping Shift Timer</span>
                </h3>

                <button
                  onClick={() => setIsAlarmSoundEnabled(!isAlarmSoundEnabled)}
                  className="px-3 py-1 bg-slate-950 border border-slate-800 text-xs rounded-xl flex items-center space-x-1.5 text-slate-300"
                >
                  {isAlarmSoundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
                  <span>{isAlarmSoundEnabled ? 'ALARM AUDIO ON' : 'ALARM MUTED'}</span>
                </button>
              </div>

              {/* Shift Presets */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase block">Standard Watchkeeping Presets:</span>
                <div className="grid grid-cols-3 gap-3">
                  {[4, 6, 8].map((hrs) => (
                    <button
                      key={hrs}
                      onClick={() => handleSelectShiftPreset(hrs)}
                      className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all ${
                        selectedShiftHours === hrs
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {hrs}-HOUR WATCH ({hrs === 4 ? 'Standard 4-on/8-off' : hrs === 6 ? '6-on/6-off System' : '8-Hour Extended'})
                    </button>
                  ))}
                </div>
              </div>

              {/* Huge Digital Clock LCD Display */}
              <div className="p-8 bg-slate-950 border-2 border-cyan-500/60 rounded-3xl text-center space-y-4 shadow-2xl relative overflow-hidden">
                <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                  SHIFT COUNTDOWN REMAINING
                </div>

                <div className="text-5xl sm:text-7xl font-black text-cyan-300 tracking-wider">
                  {formatTimerTime(timerSecondsLeft)}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-1000"
                    style={{ width: `${((selectedShiftHours * 3600 - timerSecondsLeft) / (selectedShiftHours * 3600)) * 100}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl flex items-center space-x-2 transition-all ${
                      isTimerRunning
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {isTimerRunning ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isTimerRunning ? 'PAUSE WATCH TIMER' : 'START WATCH TIMER'}</span>
                  </button>

                  <button
                    onClick={() => handleSelectShiftPreset(selectedShiftHours)}
                    className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-2xl text-sm flex items-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>RESET</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Watch Handover Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="border-b border-slate-800 pb-2">
                <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Watch Handover Verification Checklist</span>
                </h3>
                <span className="text-[10px] text-slate-400">STCW CODE SECTION A-VIII/2</span>
              </div>

              <div className="space-y-3">
                {handoverChecklistText.map((text, idx) => {
                  const isChecked = handoverChecks[idx];

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        const updated = [...handoverChecks];
                        updated[idx] = !updated[idx];
                        setHandoverChecks(updated);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all text-xs font-sans flex items-start space-x-2.5 ${
                        isChecked
                          ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                      />
                      <span className="leading-snug">{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dedicated Shift Overlap Info & Protocol Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>STCW WATCH HANDOVER OVERLAP PROTOCOL</span>
                </div>
                <h3 className="font-bold text-white text-base mt-0.5">Watch Overlap & Night Vision Accommodation Protocol</h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Overlap Period:</span>
                <button
                  onClick={() => setOverlapMinsSetting(15)}
                  className={`px-3 py-1 rounded-lg border text-xs font-bold ${
                    overlapMinsSetting === 15 ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  15 MINS
                </button>
                <button
                  onClick={() => setOverlapMinsSetting(30)}
                  className={`px-3 py-1 rounded-lg border text-xs font-bold ${
                    overlapMinsSetting === 30 ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  30 MINS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold font-mono">
                  <Eye className="w-4 h-4" />
                  <span>1. Night Vision Accommodation</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Relieving watchkeepers must arrive on the bridge at least <strong>{overlapMinsSetting} minutes prior</strong> to shift start to adjust eyes to darkness and inspect radar/ECDIS display dimmer settings.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono">
                  <FileText className="w-4 h-4" />
                  <span>2. Oral & Tactical Briefing</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Relieved officer briefs on: current Gyro error, active CPA/TCPA shipping threats, Master’s standing orders, weather forecasts, and VHF channel communications.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-purple-400 font-bold font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>3. Formal Duty Transition Entry</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Duty transfer is invalid until relieving officer explicitly states <em>"I take over the watch"</em> and signs the official SOLAS deck logbook.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- MODULE 5: UNIT CONVERTER & HISTORY LOG --- */}
      {/* ========================================================================= */}
      {activeTab === 'UNIT_CONVERTER' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-white text-base flex items-center space-x-2">
                  <ArrowRightLeft className="w-5 h-5 text-amber-400" />
                  <span>Maritime Measurement Unit Converter</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Convert speed, distance, draft depth, and VLSFO fuel mass metrics with audit history.
                </p>
              </div>

              {/* Category Selector */}
              <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1 sm:pb-0">
                {(['SPEED', 'DISTANCE', 'DEPTH', 'FUEL_MASS'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setConvCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl border transition-all ${
                      convCategory === cat
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Record Action Bar */}
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-xs text-slate-400 font-bold uppercase block">
                  ENTER VALUE TO CONVERT ({convCategory === 'SPEED' ? 'KNOTS' : convCategory === 'DISTANCE' ? 'NAUTICAL MILES' : convCategory === 'DEPTH' ? 'METERS' : 'METRIC TONS VLSFO'}):
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-lg font-bold text-amber-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={recordConversionToHistory}
                className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl text-xs flex items-center space-x-2 shadow-lg"
              >
                <History className="w-4 h-4" />
                <span>RECORD TO HISTORY LOG</span>
              </button>
            </div>

            {copySuccessMessage && (
              <p className="text-xs text-emerald-400 font-bold animate-pulse">
                ✅ {copySuccessMessage}
              </p>
            )}

            {/* Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {convCategory === 'SPEED' && (
                <>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">KILOMETERS / HOUR (KM/H)</span>
                    <strong className="text-amber-300 text-xl block mt-1">{kmh.toFixed(2)} km/h</strong>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">STATUTE MILES / HOUR (MPH)</span>
                    <strong className="text-cyan-300 text-xl block mt-1">{mph.toFixed(2)} mph</strong>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">METERS / SECOND (M/S)</span>
                    <strong className="text-emerald-300 text-xl block mt-1">{ms.toFixed(2)} m/s</strong>
                  </div>
                </>
              )}

              {convCategory === 'DISTANCE' && (
                <>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">KILOMETERS (KM)</span>
                    <strong className="text-amber-300 text-xl block mt-1">{kilometers.toFixed(2)} km</strong>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">STATUTE MILES</span>
                    <strong className="text-cyan-300 text-xl block mt-1">{statuteMiles.toFixed(2)} mi</strong>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">FATHOMS</span>
                    <strong className="text-emerald-300 text-xl block mt-1">{fathomsDist.toFixed(0)} Fathoms</strong>
                  </div>
                </>
              )}

              {convCategory === 'DEPTH' && (
                <>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">FEET (FT)</span>
                    <strong className="text-amber-300 text-xl block mt-1">{feetDepth.toFixed(2)} ft</strong>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">FATHOMS (1 FTH = 6 FT)</span>
                    <strong className="text-cyan-300 text-xl block mt-1">{fathomsDepth.toFixed(2)} Fth</strong>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">SOUNDING IN METERS</span>
                    <strong className="text-emerald-300 text-xl block mt-1">{metersDepth.toFixed(1)} m</strong>
                  </div>
                </>
              )}

              {convCategory === 'FUEL_MASS' && (
                <>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">BARRELS VLSFO</span>
                    <strong className="text-amber-300 text-xl block mt-1">~{barrelsFuel.toFixed(1)} bbl</strong>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">LITERS FUEL</span>
                    <strong className="text-cyan-300 text-xl block mt-1">~{litersFuel.toLocaleString()} L</strong>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">METRIC TONS (MT)</span>
                    <strong className="text-emerald-300 text-xl block mt-1">{metricTonsFuel} MT</strong>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Conversion Audit History Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
                <History className="w-4 h-4 text-amber-400" />
                <span>Unit Conversion History Audit Log</span>
              </h3>

              {conversionHistory.length > 0 && (
                <button
                  onClick={clearConversionHistory}
                  className="text-xs text-rose-400 hover:underline font-bold"
                >
                  CLEAR HISTORY
                </button>
              )}
            </div>

            {conversionHistory.length === 0 ? (
              <p className="text-xs text-slate-500 font-sans italic py-4 text-center">
                No recent conversions recorded yet. Click "Record to History Log" above.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                      <th className="p-3">LOG ID</th>
                      <th className="p-3">TIME</th>
                      <th className="p-3">CATEGORY</th>
                      <th className="p-3">INPUT</th>
                      <th className="p-3">CONVERTED RESULT SUMMARY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionHistory.map((log) => (
                      <tr key={log.id} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-amber-400">{log.id}</td>
                        <td className="p-3 text-slate-400">{log.timestamp}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-amber-300 font-bold">
                            {log.category}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-white">{log.inputValue} {log.inputUnit}</td>
                        <td className="p-3 text-slate-300 font-sans">{log.outputSummary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- MODULE 6: VESSELS SUMMARY & ASSET PROFILES --- */}
      {/* ========================================================================= */}
      {activeTab === 'VESSELS_SUMMARY' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base flex items-center space-x-2">
                <Ship className="w-5 h-5 text-emerald-400" />
                <span>Regional Merchant Fleet & Detailed Vessel Asset Profiles</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Click any vessel card to inspect technical asset dossiers, classification surveys, and engine machinery specs.
              </p>
            </div>

            {/* Search filter */}
            <div className="relative max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter by IMO, name, or type..."
                value={vesselSearchQuery}
                onChange={(e) => setVesselSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Vessel List */}
            <div className="space-y-3">
              {filteredFleet.map((vsl) => {
                const isSelected = selectedVesselAsset?.imo === vsl.imo;

                return (
                  <div
                    key={vsl.imo}
                    onClick={() => setSelectedVesselAsset(vsl)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-xl space-y-2 ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <div>
                        <strong className="text-white text-sm block">{vsl.name}</strong>
                        <span className="text-[10px] text-slate-400">{vsl.flagEmoji} {vsl.flag} • {vsl.imo}</span>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        vsl.status === 'UNDERWAY'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-amber-500/20 border-amber-500 text-amber-300'
                      }`}>
                        {vsl.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase">TYPE</span>
                        <strong>{vsl.type}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase">SPEED (SOG)</span>
                        <strong className="text-amber-300">{vsl.speedKnots} Kts</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Asset Dossier Inspector */}
            {selectedVesselAsset && (
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase mb-1">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>VESSEL ASSET PROFILE DOSSIER</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{selectedVesselAsset.name}</h3>
                    <p className="text-xs text-slate-400">
                      {selectedVesselAsset.flagEmoji} {selectedVesselAsset.flag} • Call Sign: {selectedVesselAsset.callSign} • MMSI: {selectedVesselAsset.mmsi}
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold rounded-xl">
                    CLASSIFIED {selectedVesselAsset.classSociety}
                  </span>
                </div>

                {/* Vessel Dimensions & Tonnage Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">LOA x BEAM</span>
                    <strong className="text-white text-sm">{selectedVesselAsset.lengthOverallMeters}m x {selectedVesselAsset.beamMeters}m</strong>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">MAX DRAUGHT</span>
                    <strong className="text-cyan-300 text-sm">{selectedVesselAsset.maxDraughtMeters} Meters</strong>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">DEADWEIGHT (DWT)</span>
                    <strong className="text-emerald-300 text-sm">{selectedVesselAsset.deadweightTonnage.toLocaleString()} DWT</strong>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">GROSS TONNAGE (GT)</span>
                    <strong className="text-amber-300 text-sm">{selectedVesselAsset.grossTonnage.toLocaleString()} GT</strong>
                  </div>
                </div>

                {/* Machinery & Survey Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                    <span className="text-[11px] text-emerald-400 font-mono font-bold uppercase block">PROPULSION & POWER MACHINERY:</span>
                    <div className="space-y-1 text-slate-300 text-xs">
                      <div><strong>Main Engine:</strong> {selectedVesselAsset.mainEngine}</div>
                      <div><strong>Engine Output:</strong> {selectedVesselAsset.enginePowerKw.toLocaleString()} kW</div>
                      <div><strong>Bow Thruster:</strong> {selectedVesselAsset.bowThrusterKw} kW Tunnel Thruster</div>
                      <div><strong>Bunker Capacity:</strong> {selectedVesselAsset.fuelCapacityMt.toLocaleString()} MT VLSFO</div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                    <span className="text-[11px] text-amber-400 font-mono font-bold uppercase block">CLASSIFICATION & SURVEY AUDITS:</span>
                    <div className="space-y-1 text-slate-300 text-xs">
                      <div><strong>Year Built:</strong> {selectedVesselAsset.buildYear}</div>
                      <div><strong>Last Special Survey:</strong> {selectedVesselAsset.lastSpecialSurvey}</div>
                      <div><strong>Next Drydock Due:</strong> {selectedVesselAsset.nextDrydockDate}</div>
                      <div><strong>Owner / Operator:</strong> {selectedVesselAsset.ownerOperator}</div>
                    </div>
                  </div>
                </div>

                {/* Voyage & Cargo Capacity */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs font-sans">
                  <span className="text-[11px] text-cyan-400 font-mono font-bold uppercase block">CURRENT VOYAGE & CARGO CAPACITY:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                    <div><strong>Voyage Route:</strong> {selectedVesselAsset.origin} → {selectedVesselAsset.destination}</div>
                    <div><strong>ETA UTC:</strong> {selectedVesselAsset.etaUtc}</div>
                    <div className="sm:col-span-2"><strong>Cargo Specification:</strong> {selectedVesselAsset.cargoCapacityDetails}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- MODULE 7: MARINE DICTIONARY --- */}
      {/* ========================================================================= */}
      {activeTab === 'MARINE_DICTIONARY' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Nautical Terms & Acronyms Marine Dictionary</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Comprehensive dictionary of maritime terminology, stability terms, regulations, and ship construction definitions.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1 sm:pb-0">
              {['ALL', 'NAVIGATION', 'SHIP_STRUCTURE', 'STABILITY', 'REGULATORY', 'ENGINEERING', 'CARGO'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDictCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 ${
                    dictCategory === cat
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search nautical terms or definitions..."
              value={dictSearchQuery}
              onChange={(e) => setDictSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Dictionary Terms Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDictTerms.map((item) => (
              <div key={item.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <strong className="text-white text-base">{item.term}</strong>
                      {item.phonetic && <span className="text-xs text-slate-500 font-sans">{item.phonetic}</span>}
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-indigo-300 font-bold">
                    {item.category.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.definition}
                </p>

                <div className="p-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl text-[11px] text-slate-400 font-sans italic">
                  <strong>Example:</strong> "{item.exampleUsage}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- MODULE 8: MARINE FAQ --- */}
      {/* ========================================================================= */}
      {activeTab === 'MARINE_FAQ' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-rose-400" />
                <span>SOLAS, COLREG & MLC Maritime FAQ Knowledge Base</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Frequently asked questions on navigation, weather, watchkeeping safety, and seafarer rights.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1 sm:pb-0">
              {['ALL', 'NAVIGATION', 'SAFETY_SOLAS', 'WEATHER', 'CREW_MLC', 'BUNKERING'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 ${
                    faqCategory === cat
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search FAQ questions or regulations..."
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between space-x-3 hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[10px] text-rose-300 font-bold rounded">
                        {faq.category.replace('_', ' ')}
                      </span>
                      <strong className="text-white text-xs sm:text-sm">{faq.question}</strong>
                    </div>

                    {isExpanded ? <ChevronUp className="w-4 h-4 text-rose-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-slate-800 text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
