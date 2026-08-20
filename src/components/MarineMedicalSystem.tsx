import React, { useState } from 'react';
import { 
  HeartPulse, ShieldAlert, Cross, Sparkles, BookOpen, Stethoscope, 
  Pill, Radio, Activity, Compass, Anchor, AlertTriangle, CheckCircle2, 
  HelpCircle, Search, RefreshCw, Zap, Clock, ShieldCheck, Download, Award,
  Leaf, Calendar, FileText, Printer, ChevronRight, Filter, UserCheck, Flame,
  MessageSquare, TrendingUp, Cpu, BarChart2, AlertCircle, Info, Send, Bot,
  User, Share2, Layers, Sliders, Check
} from 'lucide-react';

export interface MedicalRemedy {
  id: string;
  name: string;
  era: 'ANCIENT' | 'AGE_OF_SAIL' | 'MODERN_IMO' | 'MARINE_BIOTECH';
  category: 'ANTISEPTIC' | 'SCURVY_NUTRITION' | 'PAIN_ANALGESIC' | 'TMAS_TELEMEDICINE' | 'HYPERBARIC_BENDS' | 'BIO_PHARMA';
  activeCompound: string;
  originHistory: string;
  modernEquivalent: string;
  dosageProtocol: string;
  imoStandardRef: string;
  summary: string;
  isHerbal?: boolean;
}

export interface HerbalRemedy {
  id: string;
  plantName: string;
  botanicalName: string;
  marineOrigin: string;
  ailmentTarget: 'NAUSEA' | 'WOUND_INFECTION' | 'SCURVY' | 'FEVER_PAIN' | 'RESPIRATORY';
  preparationMethod: 'INFUSION' | 'POULTICE' | 'RAW_RATION' | 'EXTRACT_TINCTURE';
  activePhytoCompound: string;
  historicalUse: string;
  safetyCaution: string;
}

export interface MedicalTimelineEvent {
  year: string;
  eraTitle: string;
  headline: string;
  milestoneDescription: string;
  impactOnSeafarers: string;
  keyFigureOrBody: string;
}

export interface SymptomCase {
  id: string;
  symptomName: string;
  category: string;
  severity: 'CRITICAL_EVACUATE' | 'URGENT_TMAS' | 'MODERATE_SHIPBOARD';
  possibleCondition: string;
  firstAidAction: string;
  recommendedMedicine: string;
}

export interface DrugInteraction {
  itemA: string;
  itemB: string;
  severity: 'HIGH_DANGER' | 'MODERATE_WARNING' | 'SAFE_SYNERGY';
  mechanism: string;
  clinicalAdvisory: string;
}

export interface SyncAlert {
  id: string;
  timestamp: string;
  source: string;
  type: 'SHORE_TMAS' | 'WHO_ADVISORY' | 'MEDICINE_EXPIRY' | 'VACCINE_SYNC';
  priority: 'HIGH' | 'MEDIUM' | 'INFO';
  title: string;
  message: string;
  actionText: string;
  acknowledged: boolean;
}

export const MARINE_MEDICINES: MedicalRemedy[] = [
  {
    id: 'MED-001',
    name: 'Lime & Citrus Juice Pharmacopeia (Lind Protocol)',
    era: 'AGE_OF_SAIL',
    category: 'SCURVY_NUTRITION',
    activeCompound: 'L-Ascorbic Acid (Vitamin C)',
    originHistory: 'Discovered by Royal Navy Surgeon James Lind in 1747 aboard HMS Salisbury to eradicate Scurvy among sailors after 8-week trans-oceanic voyages.',
    modernEquivalent: 'Ascorbic Acid IV / Oral Vitamin C Supplements (WHO Essential Medicine)',
    dosageProtocol: '100 mg - 500 mg daily oral ration with grog or fresh water.',
    imoStandardRef: 'IMO International Medical Guide for Ships (IMGS) - Category A Chest',
    summary: 'Prevents collagen breakdown, gum hemorrhages, joint fatigue, and fatal shipboard scurvy during prolonged ocean transit.',
    isHerbal: true
  },
  {
    id: 'MED-002',
    name: 'Willow Bark Salicin & Marine Kelp Extract',
    era: 'ANCIENT',
    category: 'PAIN_ANALGESIC',
    activeCompound: 'Salicylic Acid & Iodine Polyphenols',
    originHistory: 'Used by ancient Mediterranean and Polynesian mariners to reduce fever, sea-sickness, and joint pain from prolonged wet deck shifts.',
    modernEquivalent: 'Acetylsalicylic Acid (Aspirin) & NSAIDs (Ibuprofen/Ketorolac)',
    dosageProtocol: '500 mg chewable tablet every 6 hours post-meals.',
    imoStandardRef: 'IMGS Code Section 4: Analgesics and Anti-inflammatories',
    summary: 'Provides rapid pain relief, fever reduction, and anti-platelet protection against deep vein thrombosis during long watches.',
    isHerbal: true
  },
  {
    id: 'MED-003',
    name: 'TMAS Radio Medical Advisory & Epinephrine Auto-Injector',
    era: 'MODERN_IMO',
    category: 'TMAS_TELEMEDICINE',
    activeCompound: 'Epinephrine 1:1000 & Satellite VHF/Inmarsat Tele-Consult',
    originHistory: 'Established under SOLAS Chapter V and ILO Maritime Labour Convention (MLC 2006) for 24/7 shore-to-ship physician guidance.',
    modernEquivalent: 'Telemedical Maritime Assistance Service (TMAS) Directives',
    dosageProtocol: '0.3 mg IM auto-injection for severe anaphylaxis or marine envenomation.',
    imoStandardRef: 'MFAG (Medical First Aid Guide for Dangerous Goods Accidents)',
    summary: 'Provides real-time shore doctor intervention via satellite link for acute trauma, chemical spill, or severe allergic reaction at sea.'
  },
  {
    id: 'MED-004',
    name: 'Heliox & Recompression Therapy (US Navy Table 6)',
    era: 'MODERN_IMO',
    category: 'HYPERBARIC_BENDS',
    activeCompound: '79% Helium / 21% Oxygen Gas Mixture + Hyperbaric Oxygen',
    originHistory: 'Pioneered for deep-sea salvage and saturation diving to prevent nitrogen narcosis and Decompression Sickness (DCS / "The Bends").',
    modernEquivalent: 'Shipboard Deck Recompression Chamber / Surface Decompression',
    dosageProtocol: 'Hyperbaric 100% O2 administration at 2.8 ATA for 285 minutes.',
    imoStandardRef: 'IMO Diving Code Resolution A.831(19) & US Navy Diving Manual',
    summary: 'Dissolves intravascular nitrogen gas bubbles in divers or underwater maintenance engineers suffering acute joint pain and paralysis.'
  },
  {
    id: 'MED-005',
    name: 'Cone Snail Venom Bio-Analgesic (Prialt / Ziconotide)',
    era: 'MARINE_BIOTECH',
    category: 'BIO_PHARMA',
    activeCompound: 'ω-Conotoxin MVIIA Peptides (Conus magus)',
    originHistory: 'Synthesized from predatory Indo-Pacific Cone Snail venom; 1,000x more potent than morphine without opioid addiction.',
    modernEquivalent: 'Ziconotide Intrathecal Infusion',
    dosageProtocol: '0.5 mcg - 2.4 mcg/day micro-infusion.',
    imoStandardRef: 'UN Ocean Decade Marine Biotechnology Bio-Prospecting Registry',
    summary: 'Selectively blocks N-type calcium channels in spinal nerve pathways for severe chronic neurological pain treatment.'
  },
  {
    id: 'MED-006',
    name: 'Polynesian Coral Sponge Wash & Pitch Tar Debridement',
    era: 'ANCIENT',
    category: 'ANTISEPTIC',
    activeCompound: 'Agelasine Antibacterial Alkaloids & Pine Tar Phenols',
    originHistory: 'Applied by Pacific voyaging canoes (Hōkūleʻa traditions) for coral reef cuts and gangrenous rope-burn wounds.',
    modernEquivalent: 'Povidone-Iodine 10% & Silver Sulfadiazine Burn Cream',
    dosageProtocol: 'Topical application to cleansed wound site 2x daily.',
    imoStandardRef: 'IMGS Wound Care & Debridement Protocol',
    summary: 'Prevents tropical bacterial super-infections (Vibrio vulnificus) from seawater-contaminated lacerations.',
    isHerbal: true
  }
];

export const HERBAL_REMEDIES: HerbalRemedy[] = [
  {
    id: 'HRB-001',
    plantName: 'Marine Brown Kelp & Bladderwrack',
    botanicalName: 'Fucus vesiculosus',
    marineOrigin: 'North Atlantic & Intertidal Coastal Shelf',
    ailmentTarget: 'SCURVY',
    preparationMethod: 'INFUSION',
    activePhytoCompound: 'Iodine, Fucoidans & L-Ascorbate',
    historicalUse: 'Boiled by Scottish and Nordic mariners into a mineral-rich broth to combat thyroid sluggishness and nutritional deficits.',
    safetyCaution: 'Avoid in crew members with hyperthyroidism or iodine hyper-sensitivity.'
  },
  {
    id: 'HRB-002',
    plantName: 'White Willow Bark & Meadowsweet',
    botanicalName: 'Salix alba',
    marineOrigin: 'Coastal River Estuaries & Baltic Wetlands',
    ailmentTarget: 'FEVER_PAIN',
    preparationMethod: 'EXTRACT_TINCTURE',
    activePhytoCompound: 'Salicin Glucosides',
    historicalUse: 'Chewed by Roman galley oarsmen to soothe back inflammation, fever, and arthritic joint stiffness.',
    safetyCaution: 'May cause gastric irritation if taken on an empty stomach; mild blood-thinning effect.'
  },
  {
    id: 'HRB-003',
    plantName: 'Sea Buckthorn Coastal Berry',
    botanicalName: 'Hippophae rhamnoides',
    marineOrigin: 'Baltic & North Sea Coastal Dunes',
    ailmentTarget: 'SCURVY',
    preparationMethod: 'RAW_RATION',
    activePhytoCompound: 'Vitamin C (12x higher than oranges), Flavonoids',
    historicalUse: 'Carried as dried berries by Viking longship crews to prevent gum decay and skin necrosis during freezing winter voyages.',
    safetyCaution: 'High natural acidity; dilute in freshwater for crew with peptic ulcers.'
  },
  {
    id: 'HRB-004',
    plantName: 'Pacific Red Marine Algae & Irish Moss',
    botanicalName: 'Chondrus crispus',
    marineOrigin: 'Intertidal Reefs & Coral Lagoons',
    ailmentTarget: 'RESPIRATORY',
    preparationMethod: 'INFUSION',
    activePhytoCompound: 'Carrageenan Mucilage & Sulfated Polysaccharides',
    historicalUse: 'Simmered into a soothing demulcent drink for sailors suffering dry cough, salt spray lung irritation, and bronchitis.',
    safetyCaution: 'Safe for daily consumption in fresh water preparations.'
  },
  {
    id: 'HRB-005',
    plantName: 'Wild Ginger Root & Galangal',
    botanicalName: 'Zingiber officinale',
    marineOrigin: 'Indo-Pacific Islands & Spice Route',
    ailmentTarget: 'NAUSEA',
    preparationMethod: 'EXTRACT_TINCTURE',
    activePhytoCompound: 'Gingerols & Shogaols',
    historicalUse: 'Brewed as tea by Chinese junk navigators and Indian Ocean traders to suppress seasickness, vertigo, and digestive nausea.',
    safetyCaution: 'Non-drowsy; preferred natural anti-emetic for bridge officers on watch.'
  },
  {
    id: 'HRB-006',
    plantName: 'Polynesian Noni & Coral Sponge Extract',
    botanicalName: 'Morinda citrifolia',
    marineOrigin: 'South Pacific Atolls & Hawaii',
    ailmentTarget: 'WOUND_INFECTION',
    preparationMethod: 'POULTICE',
    activePhytoCompound: 'Xeronine & Antibacterial Alkaloids',
    historicalUse: 'Crushed and applied directly onto coral reef cuts and fish spine punctures to prevent Vibrio tissue necrosis.',
    safetyCaution: 'External topical use only on cleansed wounds.'
  }
];

export const MEDICAL_TIMELINE: MedicalTimelineEvent[] = [
  {
    year: '1593',
    eraTitle: 'Age of Discovery Exploration',
    headline: 'Sir Richard Hawkins Documents Lemon Juice for Scurvy',
    milestoneDescription: 'Naval Commander Sir Richard Hawkins records that over 10,000 Elizabethan mariners perished from scurvy, observing that fresh lemons and oranges provided rapid recovery.',
    impactOnSeafarers: 'Laid the early empirical foundation for maritime nutritional medicine.',
    keyFigureOrBody: 'Sir Richard Hawkins & Royal Navy Explorers'
  },
  {
    year: '1747',
    eraTitle: 'Age of Sail Medical Revolution',
    headline: 'Dr. James Lind Conducts First Clinical Trial aboard HMS Salisbury',
    milestoneDescription: 'Ship surgeon James Lind isolates 12 scurvy-stricken sailors into pairs, testing 6 different treatments. The pair receiving citrus fruit recovers completely within 6 days.',
    impactOnSeafarers: 'Eradicated the primary cause of death during long-haul global voyages.',
    keyFigureOrBody: 'Dr. James Lind (Surgeon, HMS Salisbury)'
  },
  {
    year: '1804',
    eraTitle: 'Naval Medical Regulation',
    headline: 'British Admiralty Mandates Daily Citrus Rations ("Limeys")',
    milestoneDescription: 'Official regulation requiring all British merchant and naval vessels to carry stored lemon and lime juice. Sailors earn the enduring moniker "Limeys".',
    impactOnSeafarers: 'Doubled naval operational endurance and reduced maritime hospital mortality by 80%.',
    keyFigureOrBody: 'British Admiralty & Sick and Hurt Board'
  },
  {
    year: '1912',
    eraTitle: 'Early Wireless Tele-Consultation',
    headline: 'Titanic Disaster Spurs Radio Medical Guidance (GMDSS Ancestor)',
    milestoneDescription: 'The advent of Marconi wireless telegraphy allows ship captains at sea to consult shore-based doctors for emergency surgical and medical advice.',
    impactOnSeafarers: 'Began the modern era of Telemedical Maritime Assistance Services (TMAS).',
    keyFigureOrBody: 'Marconi Wireless Telegraphy & CIRM Rome'
  },
  {
    year: '1943',
    eraTitle: 'Hyperbaric Medicine Development',
    headline: 'US Navy Decompression Table 6 Established for Salvage Divers',
    milestoneDescription: 'Development of standardized hyperbaric oxygen recompression protocols to treat Decompression Sickness (DCS) and arterial gas embolism during deep sea salvage.',
    impactOnSeafarers: 'Saved thousands of saturation divers and deep-water submarine rescue personnel.',
    keyFigureOrBody: 'US Navy Experimental Diving Unit (NEDU)'
  },
  {
    year: '2006',
    eraTitle: 'Modern IMO / ILO Governance',
    headline: 'ILO Maritime Labour Convention (MLC 2006) Enforces Free Healthcare',
    milestoneDescription: 'Global treaty mandating that every seafarer has the right to free medical care on board and ashore, standardizing Category A shipboard medicine chests and TMAS satellite links.',
    impactOnSeafarers: 'Guaranteed universal medical protection for 1.8 million international seafarers.',
    keyFigureOrBody: 'International Maritime Organization (IMO) & ILO'
  },
  {
    year: '2026',
    eraTitle: 'Marine Biotechnology & AI Telemedicine',
    headline: 'Cone Snail Bio-Analgesics & Real-Time Satellite Telemetry',
    milestoneDescription: 'UN Ocean Decade integrates non-addictive cone snail peptide painkillers and satellite AI diagnostic telemetry directly into digital shipboard health portals.',
    impactOnSeafarers: 'Eliminates opioid dependency risks on board while delivering sub-second doctor consults anywhere on Earth.',
    keyFigureOrBody: 'UN Ocean Decade & IMO Medical Steering Committee'
  }
];

export const SYMPTOM_CASES: SymptomCase[] = [
  {
    id: 'SYM-001',
    symptomName: 'Bleeding gums, corkscrew hairs, extreme joint fatigue, poor wound healing',
    category: 'Nutritional / Scurvy',
    severity: 'MODERATE_SHIPBOARD',
    possibleCondition: 'Acute Scurvy (Vitamin C Deficiency)',
    firstAidAction: 'Administer 500 mg L-Ascorbic Acid (Vitamin C) oral supplement twice daily. Provide fresh citrus, sea buckthorn berry ration, or brown kelp tea.',
    recommendedMedicine: 'Lime & Citrus Juice Pharmacopeia / Oral Ascorbic Acid Tablets'
  },
  {
    id: 'SYM-002',
    symptomName: 'Severe joint pain ("bends"), vertigo, skin tingling, numbness after diving',
    category: 'Hyperbaric / Diving Trauma',
    severity: 'CRITICAL_EVACUATE',
    possibleCondition: 'Decompression Sickness (DCS / "The Bends")',
    firstAidAction: 'Immediately lay patient horizontal, administer 100% Normobaric Oxygen via non-rebreather mask, hydrate with IV saline, and contact TMAS for hyperbaric chamber transport.',
    recommendedMedicine: '100% Oxygen + Heliox Hyperbaric Recompression (US Navy Table 6)'
  },
  {
    id: 'SYM-003',
    symptomName: 'Facial swelling, stridor wheezing, low blood pressure (80/50 mmHg) after chemical exposure',
    category: 'Toxicology / Anaphylaxis',
    severity: 'CRITICAL_EVACUATE',
    possibleCondition: 'Acute Chemical Anaphylactic Shock (IMDG Hazard)',
    firstAidAction: 'Inject 0.3 mg Epinephrine IM immediately into outer thigh. Administer high-flow oxygen, elevate legs, and place TMAS radio call for immediate medevac.',
    recommendedMedicine: 'Epinephrine Auto-Injector 1:1000 + Hydrocortisone IV'
  },
  {
    id: 'SYM-004',
    symptomName: 'Severe nausea, cold sweats, vomiting, spatial disorientation on rolling sea watch',
    category: 'Vestibular / Motion Sickness',
    severity: 'MODERATE_SHIPBOARD',
    possibleCondition: 'Acute Motion Sickness (Kinetosis / Seasickness)',
    firstAidAction: 'Position seafarer mid-ship at horizon view, sip Ginger Root extract tea or chewed dried ginger, administer Dimenhydrinate or Scopolamine patch behind ear.',
    recommendedMedicine: 'Ginger Root Extract Tincture / Dimenhydrinate 50mg'
  },
  {
    id: 'SYM-005',
    symptomName: 'Spreading redness, hot skin, throbbing pain around coral cut or seawater laceration',
    category: 'Infectious / Tropical Marine Bacterial',
    severity: 'URGENT_TMAS',
    possibleCondition: 'Vibrio Vulnificus / Marine Bacterial Cellulitis',
    firstAidAction: 'Wash thoroughly with sterile saline and Povidone-Iodine 10%. Initiate Ciprofloxacin or Amoxicillin/Clavulanate, apply silver sulfadiazine paste, and monitor for necrotizing spread.',
    recommendedMedicine: 'Povidone-Iodine Wash & Ciprofloxacin 500mg Oral'
  }
];

export const DRUG_INTERACTIONS: DrugInteraction[] = [
  {
    itemA: 'White Willow Bark & Meadowsweet',
    itemB: 'Willow Bark Salicin & Marine Kelp Extract (Aspirin)',
    severity: 'HIGH_DANGER',
    mechanism: 'Additive Salicylate Toxicity & Platelet Aggregation Inhibition',
    clinicalAdvisory: 'Combining natural willow bark tea with pharmaceutical Aspirin drastically increases risk of acute gastrointestinal bleeding and severe ulceration. Discontinue herbal intake during NSAID therapy.'
  },
  {
    itemA: 'Marine Brown Kelp & Bladderwrack',
    itemB: 'Levothyroxine / Thyroid Medications',
    severity: 'MODERATE_WARNING',
    mechanism: 'Excess Iodine Supply altering T3/T4 Hormone Synthesis',
    clinicalAdvisory: 'High iodine concentration in kelp infusions can trigger thyrotoxicosis or interfere with prescribed thyroid hormone replacement. Monitor serum TSH levels.'
  },
  {
    itemA: 'Epinephrine Auto-Injector',
    itemB: 'Non-Selective Beta-Blockers (Propranolol)',
    severity: 'HIGH_DANGER',
    mechanism: 'Unopposed Alpha-Adrenergic Constriction & Uncontrolled Hypertension',
    clinicalAdvisory: 'In severe anaphylaxis, beta-blocker presence blunts epinephrine bronchodilation while driving dangerous reflex bradycardia and hypertension. Requires glucagon backup.'
  },
  {
    itemA: 'Wild Ginger Root',
    itemB: 'Warfarin / Anticoagulants',
    severity: 'MODERATE_WARNING',
    mechanism: 'Mild Thromboxane Inhibition & Increased INR Bleeding Risk',
    clinicalAdvisory: 'High-dose concentrated ginger extracts may prolong bleeding times in crew taking oral anticoagulants. Limit to under 2 grams daily.'
  },
  {
    itemA: 'Cone Snail Venom Bio-Analgesic (Ziconotide)',
    itemB: 'Central Nervous System Depressants / Opioids',
    severity: 'SAFE_SYNERGY',
    mechanism: 'Independent Non-Opioid N-Type Calcium Channel Blockade',
    clinicalAdvisory: 'Ziconotide acts via non-opioid spinal pathways, providing potent pain suppression without respiratory depression synergy or opioid tolerance cross-resistance.'
  }
];

export const INITIAL_SYNC_ALERTS: SyncAlert[] = [
  {
    id: 'SYNC-001',
    timestamp: '2026-08-20 08:30 UTC',
    source: 'CIRM Rome Tele-Medical Center (TMAS)',
    type: 'SHORE_TMAS',
    priority: 'HIGH',
    title: 'Vibrio Vulnificus Tropical Water Spore Advisory',
    message: 'Elevated sea surface temperatures in Bay of Bengal (+2.4°C above baseline) causing coastal bacterial bloom. Enforce mandatory boots & gloves during deck wash downs.',
    actionText: 'ACKNOWLEDGE & LOG IN BRIDGE DAYBOOK',
    acknowledged: false
  },
  {
    id: 'SYNC-002',
    timestamp: '2026-08-20 06:15 UTC',
    source: 'IMO / WHO Maritime Health Directorate',
    type: 'WHO_ADVISORY',
    priority: 'MEDIUM',
    title: 'Yellow Fever & Dengue Booster Sync Required',
    message: 'Vessel approaching Port of Santos. Ensure all 24 crew members have active WHO International Certificate of Vaccination or Prophylaxis (ICVP) synced.',
    actionText: 'SYNC CREW VACCINATION PASSES',
    acknowledged: false
  },
  {
    id: 'SYNC-003',
    timestamp: '2026-08-19 18:00 UTC',
    source: 'Category A Shipboard Medicine Chest Sensor',
    type: 'MEDICINE_EXPIRY',
    priority: 'HIGH',
    title: 'Epinephrine Auto-Injector Expiry Restock Alert',
    message: '2 units of Epinephrine 1:1000 expire in 14 days. Requisition submitted to Port Health Authority Singapore.',
    actionText: 'CONFIRM PORT RESTOCK ORDER',
    acknowledged: false
  }
];

interface MarineMedicalSystemProps {
  onRewardXPAndOD: (xp: number, od: number, msg: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const MarineMedicalSystem: React.FC<MarineMedicalSystemProps> = ({
  onRewardXPAndOD,
  onTriggerToast
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'HEALTH_DASHBOARD'
    | 'ENCYCLOPEDIA'
    | 'HERBAL_FINDER'
    | 'AI_SYMPTOMS_CHAT'
    | 'INTERACTION_CHECKER'
    | 'SYMPTOMS_CHECKER'
    | 'TRENDS_VISUALIZER'
    | 'TIMELINE'
    | 'TRIAGE_SIMULATOR'
    | 'CHEST_INSPECTOR'
    | 'PDF_EXPORTER'
    | 'QUIZ'
  >('HEALTH_DASHBOARD');

  // GENERAL & SEARCH STATES
  const [selectedEra, setSelectedEra] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // HERBAL FINDER SEARCH & FILTER STATE
  const [herbalSearchQuery, setHerbalSearchQuery] = useState<string>('');
  const [herbalAilmentFilter, setHerbalAilmentFilter] = useState<string>('ALL');

  // AI CHAT STATE
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'USER' | 'AI_TMAS'; text: string; time: string; urgency?: string; details?: any }>>([
    {
      sender: 'AI_TMAS',
      text: 'Greetings Medical Officer. I am the Tele-Medical Satellite AI Assistant synced with CIRM Rome and IMO IMGS guidelines. How can I assist with shipboard triage, symptoms analysis, or medicine dosages today?',
      time: '08:00 UTC'
    }
  ]);
  const [inputChatText, setInputChatText] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // DRUG INTERACTION CHECKER STATE
  const [selectedItemA, setSelectedItemA] = useState<string>(DRUG_INTERACTIONS[0].itemA);
  const [selectedItemB, setSelectedItemB] = useState<string>(DRUG_INTERACTIONS[0].itemB);

  // SYMPTOMS CHECKER STATE
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('SYM-001');

  // SYNC ALERTS STATE
  const [syncAlerts, setSyncAlerts] = useState<SyncAlert[]>(INITIAL_SYNC_ALERTS);

  // PDF EXPORTER STATE
  const [exportDocType, setExportDocType] = useState<'LOGBOOK_SUMMARY' | 'CHEST_MANIFEST' | 'PATIENT_TRIAGE_REPORT'>('LOGBOOK_SUMMARY');
  const [vesselNameInput, setVesselNameInput] = useState<string>('MV Ocean Guardian (IMO 9842100)');
  const [medicalOfficerInput, setMedicalOfficerInput] = useState<string>('Chief Medical Officer Dr. Aris Thorne');

  // TRIAGE SIMULATOR STATE
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [simDiagnosisChosen, setSimDiagnosisChosen] = useState<string | null>(null);

  // QUIZ STATE
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const scenarios = [
    {
      id: 'SCEN-01',
      title: 'Acute Decompression Sickness (DCS) off Bay of Bengal',
      patientInfo: 'A 34-year-old hydrographic research diver resurfaced rapidly from 45 meters depth after an umbilical snag. Complaining of severe joint pain, dizziness, and shortness of breath.',
      options: [
        { label: 'Administer 100% Oxygen, position patient horizontal, and initiate TMAS Hyperbaric Recompression Table 6', correct: true, feedback: 'Correct! 100% Normobaric O2 reduces nitrogen bubble size, and TMAS coordinates hyperbaric transport.' },
        { label: 'Give saltwater grog with citrus juice and send back underwater to 10 meters depth without safety line', correct: false, feedback: 'Dangerous! In-water recompression without trained chamber support risks drowning.' },
        { label: 'Apply willow bark poultice and wait 12 hours before notifying ship captain', correct: false, feedback: 'Incorrect! Delayed intervention causes permanent neurological paralysis.' }
      ]
    },
    {
      id: 'SCEN-02',
      title: 'Chemical Spill Anaphylaxis on Container Vessel (IMDG Cargo)',
      patientInfo: 'Deck Officer exposed to leaking drums of Corrosive Liquid (MARPOL Annex II) in hold 3. Experiencing facial swelling, stridor wheezing, and blood pressure dropping to 80/50 mmHg.',
      options: [
        { label: 'Immediate Epinephrine 0.3mg IM injection, oxygen therapy, and radio TMAS emergency directive', correct: true, feedback: 'Spot on! Epinephrine is the primary line treatment for anaphylaxis under MFAG guidelines.' },
        { label: 'Apply pine tar debridement ointment and offer herbal chamomile tea', correct: false, feedback: 'Incorrect! Chemical anaphylaxis is life-threatening and requires immediate parenteral epinephrine.' },
        { label: 'Perform seawater wash and return officer to deck watch', correct: false, feedback: 'Unsafe! Washing eyes/skin is secondary to airway stabilization in acute collapse.' }
      ]
    }
  ];

  const medicalQuestions = [
    {
      q: 'Which surgeon famously proved in 1747 that citrus juice cured shipboard scurvy among sailors?',
      options: ['Dr. James Lind', 'Capt. James Cook', 'Sir William Harvey', 'Dr. Edward Jenner'],
      correct: 0
    },
    {
      q: 'What is the modern primary shore-to-ship emergency radio consultation service mandated under SOLAS and MLC 2006?',
      options: ['TMAS (Telemedical Maritime Assistance Service)', 'GMDSS Emergency Chirp', 'IMO Satellite Telegraph', 'VHF Channel 16 Music'],
      correct: 0
    },
    {
      q: 'Which potent non-opioid painkiller active compound was isolated from the venom of the marine Cone Snail (Conus magus)?',
      options: ['Ziconotide (Prialt)', 'Ascorbic Acid', 'Morphine Sulfate', 'Agelasine B'],
      correct: 0
    }
  ];

  const handleSelectQuizAnswer = (qIdx: number, aIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: aIdx }));
  };

  const handleFinishQuiz = () => {
    let score = 0;
    medicalQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score += 1;
    });
    setQuizScore(score);
    setQuizCompleted(true);
    if (score === medicalQuestions.length) {
      onRewardXPAndOD(50, 25, '🩺 Perfect score on Maritime Medical Knowledge Assessment! +50 XP and +25 $OD awarded!');
    } else {
      onRewardXPAndOD(20, 10, '🩺 Completed Maritime Medical Quiz! +20 XP awarded.');
    }
  };

  const handleSendAiChatMessage = (promptText?: string) => {
    const textToSend = promptText || inputChatText;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'USER' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC'
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!promptText) setInputChatText('');
    setIsAiThinking(true);

    setTimeout(() => {
      let aiText = '';
      let urgency = 'STABLE';
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('joint') || lower.includes('diver') || lower.includes('bends') || lower.includes('decompression')) {
        urgency = 'CRITICAL';
        aiText = '🚨 DIAGNOSIS ADVISORY: Suspected Type 1 / Type 2 Decompression Sickness (DCS / "The Bends").\n\n• Immediate Action: Administer 100% Normobaric Oxygen via non-rebreather mask at 15 L/min.\n• Positioning: Lay seafarer horizontal in supine position. Hydrate with oral fluids or saline IV if conscious.\n• TMAS Action: Initiating direct hyperbaric chamber evacuation protocol under US Navy Table 6 recompression guidance.';
      } else if (lower.includes('rash') || lower.includes('coral') || lower.includes('cut') || lower.includes('fever')) {
        urgency = 'URGENT';
        aiText = '⚠️ DIAGNOSIS ADVISORY: Marine Coral Laceration with Suspected Vibrio Vulnificus Super-Infection.\n\n• Immediate Action: Cleanse wound extensively with sterile normal saline & 10% Povidone-Iodine.\n• Pharmacopeia: Initiate Ciprofloxacin 500mg PO BD as per IMGS Category A guidelines.\n• Herbal Adjunct: Polynesian Coral Sponge / Noni extract poultice for topical debridement.';
      } else if (lower.includes('nausea') || lower.includes('vertigo') || lower.includes('seasick') || lower.includes('vomit')) {
        urgency = 'STABLE';
        aiText = '⚓ DIAGNOSIS ADVISORY: Acute Motion Sickness (Kinetosis).\n\n• Immediate Action: Direct officer to mid-ship watch deck for stable horizon visual anchor.\n• Herbal Solution: Wild Ginger Root Extract / Tincture (500mg) or chewed dried ginger root.\n• Medicine Chest: Dimenhydrinate 50mg or Scopolamine transdermal patch.';
      } else {
        urgency = 'STABLE';
        aiText = `🩺 TELE-MEDICAL ADVISORY: Analyzed symptoms "${textToSend}".\n\n• Triage Status: Monitored under standard shipboard clinical protocols.\n• IMGS Guidelines: Verify vitals (Heart rate, SpO2, Temperature, Blood pressure) and document in official Logbook.\n• Shore Link: Satellite TMAS link available 24/7 if condition escalates.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'AI_TMAS',
          text: aiText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
          urgency
        }
      ]);
      setIsAiThinking(false);
    }, 800);
  };

  const handleAcknowledgeAlert = (id: string) => {
    setSyncAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
    onTriggerToast('✅ Medical Sync Alert acknowledged & logged in Bridge Daybook!');
  };

  const filteredMedicines = MARINE_MEDICINES.filter(m => {
    if (selectedEra !== 'ALL' && m.era !== selectedEra) return false;
    if (
      searchQuery &&
      !m.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.activeCompound.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const filteredHerbalRemedies = HERBAL_REMEDIES.filter(h => {
    if (herbalAilmentFilter !== 'ALL' && h.ailmentTarget !== herbalAilmentFilter) return false;
    if (
      herbalSearchQuery &&
      !h.plantName.toLowerCase().includes(herbalSearchQuery.toLowerCase()) &&
      !h.botanicalName.toLowerCase().includes(herbalSearchQuery.toLowerCase()) &&
      !h.activePhytoCompound.toLowerCase().includes(herbalSearchQuery.toLowerCase()) &&
      !h.historicalUse.toLowerCase().includes(herbalSearchQuery.toLowerCase()) &&
      !h.marineOrigin.toLowerCase().includes(herbalSearchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const selectedSymptomCase = SYMPTOM_CASES.find(s => s.id === selectedSymptomId) || SYMPTOM_CASES[0];

  const activeInteractionResult = DRUG_INTERACTIONS.find(
    i => (i.itemA === selectedItemA && i.itemB === selectedItemB) || (i.itemA === selectedItemB && i.itemB === selectedItemA)
  );

  const handleDownloadPDFReport = () => {
    const reportTitle = exportDocType.replace(/_/g, ' ');
    const content = `
================================================================
OFFICIAL IMO MARITIME HEALTH & MEDICAL REPORT
Vessel: ${vesselNameInput}
Medical Officer: ${medicalOfficerInput}
Generated Date: ${new Date().toISOString().split('T')[0]}
Document Type: ${reportTitle}
================================================================

1. EXECUTIVE SUMMARY:
This document serves as an official verified export from the UN Ocean Decade
Naval Pharmacopeia & Medical Telemetry System. All entries conform to the
IMO International Medical Guide for Ships (IMGS) and ILO MLC 2006 Standards.

2. LOGIC & AUDIT ENTRIES:
- Category A Medicine Chest: Inspected & Verified Full Stock
- Emergency Tele-Medical Assistance Service (TMAS): Channel Active (Inmarsat/VHF)
- Hyperbaric Oxygen & Epinephrine Supplies: Validated Expiry 2028

3. RECORD DETAILS:
${exportDocType === 'LOGBOOK_SUMMARY' ? `
- Total Active Crew Health Logs: 42 Officers
- Scurvy Prophylaxis Ration: 100% Compliance
- Vibrio Coral Cut Infections Reported: 0
- Emergency TMAS Advisory Calls: 1 (Resolved)
` : exportDocType === 'CHEST_MANIFEST' ? `
- Epinephrine Auto-Injectors 1:1000 (6/6 In Stock)
- Ascorbic Acid 500mg Tablets (500/500 In Stock)
- Ciprofloxacin 500mg Oral (100/100 In Stock)
- Povidone-Iodine 10% Solution (5 Liters)
- Hyperbaric Oxygen Masks & Heliox Regulators (4 Units)
` : `
- Patient ID: SEAFARER-9842
- Chief Complaint: ${selectedSymptomCase.symptomName}
- Severity Rating: ${selectedSymptomCase.severity}
- Triage Assessment: ${selectedSymptomCase.possibleCondition}
- Immediate Action Taken: ${selectedSymptomCase.firstAidAction}
`}

================================================================
VERIFIED STAMP: [UN OCEAN DECADE ACCREDITED NAVAL MEDICAL SEAL]
================================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exportDocType}_${vesselNameInput.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onTriggerToast(`📄 Downloaded printable Medical Report Document (${reportTitle})!`);
  };

  const unacknowledgedAlertsCount = syncAlerts.filter(a => !a.acknowledged).length;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* HEADER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-rose-500/20 border border-rose-400/40 rounded-xl relative">
            <HeartPulse className="w-6 h-6 text-rose-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">NAVICAL &amp; MARITIME PHARMACOPEIA SYSTEM</span>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                IMO IMGS &amp; TMAS SATELLITE SYNC
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Marine Health &amp; Medical Portal</h2>
          </div>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="flex flex-wrap gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('HEALTH_DASHBOARD')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'HEALTH_DASHBOARD' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>DASHBOARD</span>
          </button>
          <button
            onClick={() => setActiveTab('AI_SYMPTOMS_CHAT')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'AI_SYMPTOMS_CHAT' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI SYMPTOMS CHAT</span>
          </button>
          <button
            onClick={() => setActiveTab('HERBAL_FINDER')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'HERBAL_FINDER' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>HERBAL DB</span>
          </button>
          <button
            onClick={() => setActiveTab('INTERACTION_CHECKER')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'INTERACTION_CHECKER' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>INTERACTION CHECKER</span>
          </button>
          <button
            onClick={() => setActiveTab('TRENDS_VISUALIZER')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'TRENDS_VISUALIZER' ? 'bg-indigo-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>HEALTH TRENDS</span>
          </button>
          <button
            onClick={() => setActiveTab('ENCYCLOPEDIA')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'ENCYCLOPEDIA' ? 'bg-rose-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>PHARMACOPEIA</span>
          </button>
          <button
            onClick={() => setActiveTab('SYMPTOMS_CHECKER')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'SYMPTOMS_CHECKER' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>SYMPTOMS CHECKER</span>
          </button>
          <button
            onClick={() => setActiveTab('PDF_EXPORTER')}
            className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'PDF_EXPORTER' ? 'bg-purple-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>EXPORT REPORT</span>
          </button>
        </div>
      </div>

      {/* REAL-TIME MEDICAL SYNC ALERTS BANNER */}
      {unacknowledgedAlertsCount > 0 && (
        <div className="bg-amber-950/60 border border-amber-500/50 rounded-xl p-3.5 space-y-2 animate-fadeIn font-mono text-xs">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-amber-300 font-bold uppercase">
                MEDICAL SYNC ALERTS ({unacknowledgedAlertsCount} PENDING ACTION)
              </span>
            </div>
            <span className="text-[10px] text-amber-400/80 font-bold">INMARSAT C TMAS LINK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {syncAlerts.filter(a => !a.acknowledged).map((alert) => (
              <div key={alert.id} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1.5 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-amber-400 font-bold">{alert.source}</span>
                    <span className="text-slate-500">{alert.timestamp}</span>
                  </div>
                  <strong className="text-white text-xs block font-bold">{alert.title}</strong>
                  <p className="text-slate-300 text-[10px] font-sans leading-relaxed">{alert.message}</p>
                </div>
                <button
                  onClick={() => handleAcknowledgeAlert(alert.id)}
                  className="w-full mt-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[9px] uppercase rounded transition-all"
                >
                  {alert.actionText}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: MARINE HEALTH DASHBOARD */}
      {activeTab === 'HEALTH_DASHBOARD' && (
        <div className="space-y-6 animate-fadeIn font-mono">
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>FITNESS FOR DUTY</span>
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white">98.2%</div>
              <span className="text-[10px] text-emerald-400 font-bold">41/42 Crew Operational</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>MEDICINE CHEST STOCK</span>
                <Pill className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-400">100% SOLAS</div>
              <span className="text-[10px] text-slate-400">Category A Verified</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>ACTIVE TRIAGE INCIDENTS</span>
                <Stethoscope className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">1 CASE</div>
              <span className="text-[10px] text-amber-300 font-bold">Coral Laceration (Stable)</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>SATELLITE TMAS LINK</span>
                <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              </div>
              <div className="text-2xl font-black text-rose-400">CONNECTED</div>
              <span className="text-[10px] text-slate-400">CIRM Rome &amp; IMO Direct</span>
            </div>
          </div>

          {/* DASHBOARD DETAILS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-black text-white">Live Shipboard Crew Vitals &amp; Bio-Risk Telemetry</h3>
                </div>
                <span className="text-xs text-rose-400 font-bold">INMARSAT TELEMETRY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>SEAFARER HYDRATION &amp; SCURVY PROPHYLAXIS</span>
                    <span className="text-emerald-400 font-bold">100% OPTIMAL</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">Citrus &amp; Ascorbic Acid daily ration administered across all watch shifts.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>HEAT STRESS &amp; DECK EXERTION INDEX</span>
                    <span className="text-amber-400 font-bold">MODERATE (31°C)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">Mandatory 15-minute shade &amp; electrolyte breaks enforced for engine room crew.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white uppercase block border-b border-slate-800 pb-2">
                  ACTIVE SHIPBOARD PATIENT LOGS (1 UNRESOLVED)
                </span>
                <div className="flex items-center justify-between text-xs bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Seafarer Officer M. Vance (Watch 2)</span>
                    <span className="text-[10px] text-slate-400 font-sans">Coral Laceration on right foot • Cleaned with Povidone Iodine</span>
                  </div>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-bold">
                    STABLE / MONITORED
                  </span>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS SIDEBAR */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase block border-b border-slate-800 pb-2">
                EMERGENCY QUICK ACTIONS
              </span>

              <button
                onClick={() => {
                  setActiveTab('AI_SYMPTOMS_CHAT');
                  handleSendAiChatMessage('Crew member has severe joint pain after diving');
                }}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>START EMERGENCY AI TRIAGE</span>
              </button>

              <button
                onClick={() => setActiveTab('INTERACTION_CHECKER')}
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>CHECK DRUG-HERB INTERACTIONS</span>
              </button>

              <button
                onClick={() => setActiveTab('PDF_EXPORTER')}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>EXPORT OFFICIAL IMO HEALTH REPORT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI MEDICAL SYMPTOMS CHAT */}
      {activeTab === 'AI_SYMPTOMS_CHAT' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
              <div>
                <h3 className="text-base font-black text-white">AI Medical Symptoms Triage Assistant</h3>
                <span className="text-[10px] text-cyan-400 font-bold block">POWERED BY GEMINI &amp; IMO IMGS CODE DIRECTIVES</span>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded font-bold">
              TMAS ONLINE
            </span>
          </div>

          {/* QUICK PROMPTS */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase">QUICK EMERGENCY PROMPTS:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Diver with severe joint pain and skin mottling',
                'Seafarer with high fever, red rash around coral cut',
                'Deck hand with chemical burn and difficulty breathing',
                'Officer experiencing extreme vertigo on bridge watch'
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendAiChatMessage(p)}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 text-[11px] rounded-lg transition-all"
                >
                  "{p}"
                </button>
              ))}
            </div>
          </div>

          {/* CHAT MESSAGES WINDOW */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-80 overflow-y-auto space-y-4 font-sans text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-2 mb-1 text-[10px] font-mono text-slate-400">
                  <span>{msg.sender === 'USER' ? 'CHIEF MEDICAL OFFICER' : 'SATELLITE TMAS AI'}</span>
                  <span>•</span>
                  <span>{msg.time}</span>
                  {msg.urgency && (
                    <span className={`px-1.5 py-0.2 rounded font-bold ${
                      msg.urgency === 'CRITICAL' ? 'bg-rose-500 text-slate-950' :
                      msg.urgency === 'URGENT' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                    }`}>
                      {msg.urgency}
                    </span>
                  )}
                </div>

                <div className={`p-3.5 rounded-2xl max-w-xl font-mono text-xs whitespace-pre-wrap leading-relaxed ${
                  msg.sender === 'USER'
                    ? 'bg-cyan-600 text-slate-950 font-bold rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isAiThinking && (
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs animate-pulse">
                <Bot className="w-4 h-4" />
                <span>Analyzing symptoms with CIRM Rome TMAS database...</span>
              </div>
            )}
          </div>

          {/* CHAT INPUT BAR */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputChatText}
              onChange={(e) => setInputChatText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAiChatMessage()}
              placeholder="Describe seafarer symptoms, vital signs, or injury details..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              onClick={() => handleSendAiChatMessage()}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>SEND</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: HERBAL & NATURAL REMEDY FINDER */}
      {activeTab === 'HERBAL_FINDER' && (
        <div className="space-y-4 animate-fadeIn font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">Traditional Herbal &amp; Marine Botanical Pharmacopeia DB</h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold">
                {filteredHerbalRemedies.length} REMEDIES FOUND
              </span>
            </div>

            {/* SEARCH BAR & AILMENT FILTER */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={herbalSearchQuery}
                  onChange={(e) => setHerbalSearchQuery(e.target.value)}
                  placeholder="Search botanical name, brown kelp, ginger, noni, active compounds..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>

              <select
                value={herbalAilmentFilter}
                onChange={(e) => setHerbalAilmentFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-400"
              >
                <option value="ALL">All Ailment Targets</option>
                <option value="SCURVY">Scurvy / Nutritional</option>
                <option value="NAUSEA">Seasickness / Vertigo</option>
                <option value="WOUND_INFECTION">Reef Lacerations / Vibrio</option>
                <option value="FEVER_PAIN">Fever / Joint Inflammation</option>
                <option value="RESPIRATORY">Salt Spray Bronchitis</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHerbalRemedies.map((hrb) => (
              <div
                key={hrb.id}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold px-2 py-0.5 rounded">
                      PREPARATION: {hrb.preparationMethod}
                    </span>
                    <span className="text-slate-400 text-[10px] font-mono">{hrb.marineOrigin}</span>
                  </div>

                  <h4 className="font-black text-white text-base">{hrb.plantName}</h4>
                  <span className="text-emerald-400 italic text-xs font-sans block">{hrb.botanicalName}</span>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <span className="text-amber-400 font-bold block text-[10px]">ACTIVE PHYTO-COMPOUND:</span>
                    <span className="text-slate-200 font-mono">{hrb.activePhytoCompound}</span>
                  </div>

                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    <strong>Historical Use:</strong> {hrb.historicalUse}
                  </p>

                  <div className="bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-xl text-[10px] text-rose-300 font-sans">
                    <strong>Safety Caution:</strong> {hrb.safetyCaution}
                  </div>
                </div>

                <button
                  onClick={() => onTriggerToast(`🌿 Saved herbal protocol (${hrb.plantName}) to Ship Medical Log!`)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase rounded-xl transition-all"
                >
                  SELECT HERBAL PROTOCOL
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DRUG & HERB INTERACTION CHECKER */}
      {activeTab === 'INTERACTION_CHECKER' && (
        <div className="space-y-6 animate-fadeIn font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Pharmaceutical &amp; Herbal Remedy Interaction Safety Checker</span>
              </h3>
              <span className="text-xs text-amber-400 font-bold">IMO MEDICAL SAFETY</span>
            </div>
            <p className="text-slate-400 text-xs font-sans">
              Select two pharmaceuticals or natural remedies to evaluate cross-reactivity, toxicological risk, or clinical synergy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ITEM SELECTORS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase block border-b border-slate-800 pb-2">
                SELECT SUBSTANCE PAIRING
              </span>

              <div className="space-y-2">
                <label className="text-xs text-amber-400 block font-bold">PRIMARY REMEDY / DRUG (ITEM A):</label>
                <select
                  value={selectedItemA}
                  onChange={(e) => setSelectedItemA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                >
                  {DRUG_INTERACTIONS.map((di, idx) => (
                    <option key={idx} value={di.itemA}>{di.itemA}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-cyan-400 block font-bold">SECONDARY REMEDY / DRUG (ITEM B):</label>
                <select
                  value={selectedItemB}
                  onChange={(e) => setSelectedItemB(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                >
                  {DRUG_INTERACTIONS.map((di, idx) => (
                    <option key={idx} value={di.itemB}>{di.itemB}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* INTERACTION ANALYSIS RESULT */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase block border-b border-slate-800 pb-2">
                CLINICAL EVALUATION RESULT
              </span>

              {activeInteractionResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-white">{activeInteractionResult.itemA} + {activeInteractionResult.itemB}</span>
                    <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${
                      activeInteractionResult.severity === 'HIGH_DANGER' ? 'bg-rose-500 text-slate-950 animate-pulse' :
                      activeInteractionResult.severity === 'MODERATE_WARNING' ? 'bg-amber-500 text-slate-950' :
                      'bg-emerald-500 text-slate-950'
                    }`}>
                      {activeInteractionResult.severity.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="text-amber-400 font-bold block text-[10px]">PHARMACOLOGICAL MECHANISM:</span>
                    <p className="text-slate-300 font-mono">{activeInteractionResult.mechanism}</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="text-cyan-400 font-bold block text-[10px]">CLINICAL ADVISORY PROTOCOL:</span>
                    <p className="text-slate-300 font-sans leading-relaxed">{activeInteractionResult.clinicalAdvisory}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">NO KNOWN SEVERE CONTRAINDICATION DETECTED</h4>
                  <p className="text-slate-400 text-xs font-sans">Selected pairing shows no documented lethal pharmacological collision under standard IMO IMGS dosage levels.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: HEALTH TRENDS VISUALIZER */}
      {activeTab === 'TRENDS_VISUALIZER' && (
        <div className="space-y-6 animate-fadeIn font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Historical Shipboard Health &amp; Incident Analytics Visualizer</span>
            </h3>
            <p className="text-slate-400 text-xs font-sans">
              Visualizing 6-month crew fitness trends, seasickness correlation with wave height, and Vitamin C nutritional compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CHART 1: CREW FITNESS & INCIDENTS TREND */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white uppercase">6-MONTH CREW FITNESS INDEX (%)</span>
                <span className="text-[10px] text-emerald-400 font-bold">AVG 98.4%</span>
              </div>

              <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800">
                {[
                  { month: 'MAR', val: 96 },
                  { month: 'APR', val: 98 },
                  { month: 'MAY', val: 97 },
                  { month: 'JUN', val: 99 },
                  { month: 'JUL', val: 98 },
                  { month: 'AUG', val: 99 }
                ].map((d, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-bold text-indigo-300">{d.val}%</span>
                    <div className="w-full bg-indigo-600 rounded-t-md transition-all hover:bg-indigo-400" style={{ height: `${(d.val - 80) * 5}%` }}></div>
                    <span className="text-[10px] text-slate-500">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CHART 2: SEASICKNESS VS WAVE HEIGHT */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white uppercase">SEASICKNESS INCIDENCE VS WAVE HEIGHT (m)</span>
                <span className="text-[10px] text-amber-400 font-bold">INDO-PACIFIC ROUTE</span>
              </div>

              <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800">
                {[
                  { sea: '1.2m', cases: 2 },
                  { sea: '2.5m', cases: 5 },
                  { sea: '4.1m', cases: 14 },
                  { sea: '5.8m', cases: 28 },
                  { sea: '3.0m', cases: 8 },
                  { sea: '1.8m', cases: 3 }
                ].map((d, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-bold text-amber-300">{d.cases} cases</span>
                    <div className="w-full bg-amber-500 rounded-t-md transition-all hover:bg-amber-400" style={{ height: `${d.cases * 3}px` }}></div>
                    <span className="text-[10px] text-slate-500">{d.sea}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PHARMACOPEIA ENCYCLOPEDIA */}
      {activeTab === 'ENCYCLOPEDIA' && (
        <div className="space-y-4 animate-fadeIn">
          {/* SEARCH & ERA FILTERS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search marine remedies, Vitamin C, TMAS, Cone Snail..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400 font-mono"
              />
            </div>

            <div className="flex flex-wrap gap-1 text-[10px] font-mono w-full sm:w-auto">
              {['ALL', 'ANCIENT', 'AGE_OF_SAIL', 'MODERN_IMO', 'MARINE_BIOTECH'].map(era => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-2.5 py-1 rounded transition-all ${
                    selectedEra === era ? 'bg-rose-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {era.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* MEDICINES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedicines.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-rose-500/50 p-4 rounded-xl transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                      item.era === 'ANCIENT' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      item.era === 'AGE_OF_SAIL' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' :
                      item.era === 'MODERN_IMO' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      ERA: {item.era.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">ID: {item.id}</span>
                  </div>

                  <h3 className="font-black text-white text-sm pt-1">{item.name}</h3>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 font-mono text-[10px]">
                    <div className="text-rose-400 font-bold">ACTIVE COMPOUND:</div>
                    <div className="text-slate-200">{item.activeCompound}</div>
                  </div>

                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="space-y-1 text-[10px] text-slate-400 font-sans border-t border-slate-800/80 pt-2">
                    <div><strong>History:</strong> {item.originHistory}</div>
                    <div><strong>Dosage Protocol:</strong> <span className="text-emerald-300 font-mono">{item.dosageProtocol}</span></div>
                    <div><strong>IMO Standard:</strong> <span className="text-cyan-300 font-mono">{item.imoStandardRef}</span></div>
                  </div>
                </div>

                <button
                  onClick={() => onTriggerToast(`📖 Saved ${item.name} protocol to Medical Officer Handbook!`)}
                  className="w-full mt-2 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-rose-300 rounded-lg text-[10px] font-mono font-bold uppercase transition-all"
                >
                  + ADD TO MEDICAL LOGBOOK
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: HEALTH SYMPTOMS CHECKER */}
      {activeTab === 'SYMPTOMS_CHECKER' && (
        <div className="space-y-6 animate-fadeIn font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-purple-400" />
                <span>Interactive Seafarer Health Symptoms Diagnostic Tool</span>
              </h3>
              <span className="text-xs text-purple-400 font-bold">TMAS TRIAGE ACTIVE</span>
            </div>
            <p className="text-slate-400 text-xs font-sans">
              Select reported medical symptoms to view differential diagnosis, severity level, and immediate IMO first-aid protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase block border-b border-slate-800 pb-2">
                REPORTED SYMPTOM CLUSTERS ({SYMPTOM_CASES.length})
              </span>

              {SYMPTOM_CASES.map((sc) => {
                const isSelected = sc.id === selectedSymptomId;
                return (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedSymptomId(sc.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-purple-950/80 border-purple-500 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-300">{sc.category}</span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                        sc.severity === 'CRITICAL_EVACUATE' ? 'bg-rose-500 text-slate-950' :
                        sc.severity === 'URGENT_TMAS' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                      }`}>
                        {sc.severity.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="text-xs font-sans text-slate-200 line-clamp-2">
                      {sc.symptomName}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase block">DIAGNOSTIC ASSESSMENT</span>
                  <h3 className="text-lg font-black text-white">{selectedSymptomCase.possibleCondition}</h3>
                </div>

                <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                  selectedSymptomCase.severity === 'CRITICAL_EVACUATE' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' :
                  selectedSymptomCase.severity === 'URGENT_TMAS' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  SEVERITY: {selectedSymptomCase.severity.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold text-xs uppercase block">SYMPTOMS PRESENTED:</span>
                <p className="text-slate-200 text-xs font-sans leading-relaxed">{selectedSymptomCase.symptomName}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/40 space-y-2">
                <span className="text-purple-400 font-bold text-xs uppercase block">RECOMMENDED FIRST-AID PROTOCOL:</span>
                <p className="text-slate-200 text-xs font-sans leading-relaxed">{selectedSymptomCase.firstAidAction}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-2">
                <span className="text-emerald-400 font-bold text-xs uppercase block">RECOMMENDED PHARMACOPEIA ITEM:</span>
                <p className="text-slate-200 text-xs font-mono font-bold">{selectedSymptomCase.recommendedMedicine}</p>
              </div>

              <button
                onClick={() => onTriggerToast(`🚨 Initiated Emergency TMAS Advisory for ${selectedSymptomCase.possibleCondition}`)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>INITIATE SATELLITE TMAS MEDICAL ADVISORY CALL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: MEDICAL PDF EXPORTER */}
      {activeTab === 'PDF_EXPORTER' && (
        <div className="space-y-6 animate-fadeIn font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Printer className="w-5 h-5 text-purple-400" />
                <span>Shipboard Medical PDF &amp; Document Exporter Generator</span>
              </h3>
              <span className="text-xs text-purple-400 font-bold">SOLAS / MLC COMPLIANT</span>
            </div>
            <p className="text-slate-400 text-xs font-sans">
              Configure parameters to export official IMO-formatted shipboard health logbook summaries, medicine chest audit manifests, or patient triage reports.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase block border-b border-slate-800 pb-2">
                EXPORT PARAMETERS
              </span>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 block font-bold">DOCUMENT TYPE:</label>
                <select
                  value={exportDocType}
                  onChange={(e) => setExportDocType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-400"
                >
                  <option value="LOGBOOK_SUMMARY">Official Ship Medical Logbook Summary</option>
                  <option value="CHEST_MANIFEST">Category A Medicine Chest Inventory Audit</option>
                  <option value="PATIENT_TRIAGE_REPORT">Patient Triage &amp; Symptom Report Sheet</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 block font-bold">VESSEL NAME &amp; IMO NUMBER:</label>
                <input
                  type="text"
                  value={vesselNameInput}
                  onChange={(e) => setVesselNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 block font-bold">CHIEF MEDICAL OFFICER NAME:</label>
                <input
                  type="text"
                  value={medicalOfficerInput}
                  onChange={(e) => setMedicalOfficerInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <button
                onClick={handleDownloadPDFReport}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>GENERATE &amp; DOWNLOAD PRINTABLE MEDICAL REPORT</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                <span className="font-bold text-purple-400 flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>LIVE DRAFT PREVIEW</span>
                </span>
                <span className="text-slate-500">FORMAT: PRINTABLE TXT/PDF</span>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-80">
{`OFFICIAL IMO MARITIME HEALTH REPORT
Vessel: ${vesselNameInput}
Medical Officer: ${medicalOfficerInput}
Type: ${exportDocType.replace(/_/g, ' ')}
Date: ${new Date().toISOString().split('T')[0]}

STATUS: SOLAS MLC 2006 COMPLIANT
TMAS Advisory Channel: ACTIVE
Verification Seal: [UN OCEAN DECADE MEDICAL AUDITED]`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
