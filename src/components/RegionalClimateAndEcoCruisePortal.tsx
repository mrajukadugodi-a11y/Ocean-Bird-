import React, { useState } from 'react';
import { 
  Globe, Radio, Ship, BarChart3, BookOpen, AlertTriangle, ShieldAlert,
  Wind, Thermometer, CloudRain, Waves, CheckCircle2, Sparkles, Sliders,
  Compass, ArrowRight, Download, Share2, Layers, Cpu, Bell, Volume2,
  VolumeX, Leaf, Anchor, MapPin, Zap, RefreshCw, Calendar, Eye, Activity,
  Trophy, Award, Flame, Search, Archive, FileText, Check, Star, ShieldCheck, Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ComposedChart, Line, Area, CartesianGrid, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

export interface RegionalClimateMetric {
  id: string;
  regionName: string;
  code: string;
  flag: string;
  sstAnomaly: number; // °C
  bleachingDegreeWeeks: number;
  microplasticDensity: number; // particles/m3
  carbonSequestrationTonsSqKm: number;
  vulnerabilityScore: number; // 0-100
  primaryRisk: string;
  coordinates: string;
  // Regional Climate Insight Fields
  aiForecast72h: string;
  speciesDisplacementRisk: 'HIGH' | 'MODERATE' | 'LOW';
  optimalSpeedBufferKnots: number;
  blueCarbonYieldOdPerKm2: number;
  strategicInsightText: string;
}

export interface AutomatedEchoAlert {
  id: string;
  timestamp: string;
  sourceSensor: string;
  frequencyHz: number;
  region: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  title: string;
  description: string;
  mitigationAction: string;
  coordinates: string;
  status: 'ACTIVE' | 'DISPATCHED' | 'RESOLVED' | 'ARCHIVED';
  acousticDbLevel?: number;
  xpRewardPoints?: number;
}

export interface ArchivedEmergencyAlert {
  id: string;
  archivedDate: string;
  incidentType: string;
  region: string;
  acousticDb: number;
  frequencyHz: number;
  resolutionTimeMins: number;
  status: 'RESOLVED' | 'FALSE_ALARM' | 'AUDITED';
  auditHash: string;
  summary: string;
}

export interface RegionalClimateGuide {
  id: string;
  region: string;
  title: string;
  seasonality: string;
  keyHazards: string[];
  sanctuaryBoundaries: string;
  ecoDirectives: string[];
  complianceCode: string;
}

export interface OceanGuardianBadge {
  id: string;
  badgeName: string;
  category: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
  odRewardBonus: number;
}

export const REGIONAL_CLIMATE_DATA: RegionalClimateMetric[] = [
  {
    id: 'REG-ATL',
    regionName: 'North Atlantic & Caribbean Basin',
    code: 'ATL-CARIB',
    flag: '🏝️',
    sstAnomaly: 1.62,
    bleachingDegreeWeeks: 12.4,
    microplasticDensity: 1420,
    carbonSequestrationTonsSqKm: 340,
    vulnerabilityScore: 84,
    primaryRisk: 'Coral Reef Thermal Stress & Cat 4 Hurricanes',
    coordinates: '22.5° N, 75.0° W',
    aiForecast72h: 'SST expected to rise +0.18°C over next 72 hours due to high pressure ridge.',
    speciesDisplacementRisk: 'HIGH',
    optimalSpeedBufferKnots: 9.5,
    blueCarbonYieldOdPerKm2: 5100,
    strategicInsightText: 'Reroute cruise corridors 12 NM north of Mesoamerican reef to avoid thermal plume turbulence and reduce bow-wave stress on bleaching coral colonies.'
  },
  {
    id: 'REG-PAC',
    regionName: 'West Pacific & South China Sea',
    code: 'PAC-WEST',
    flag: '🌏',
    sstAnomaly: 1.85,
    bleachingDegreeWeeks: 14.8,
    microplasticDensity: 2150,
    carbonSequestrationTonsSqKm: 410,
    vulnerabilityScore: 91,
    primaryRisk: 'Super Typhoons & Coastal Erosion',
    coordinates: '16.0° N, 118.2° E',
    aiForecast72h: 'Tropical depression forming; 85% probability of Category 3 typhoon formation in 96h.',
    speciesDisplacementRisk: 'HIGH',
    optimalSpeedBufferKnots: 8.0,
    blueCarbonYieldOdPerKm2: 6150,
    strategicInsightText: 'Enforce rigid hull speed buffers near coastal mangrove nurseries. Utilize zero-emission auxiliary power during port approach.'
  },
  {
    id: 'REG-IND',
    regionName: 'Indian Ocean & Bay of Bengal',
    code: 'IND-BENGAL',
    flag: '🌊',
    sstAnomaly: 1.45,
    bleachingDegreeWeeks: 9.8,
    microplasticDensity: 1180,
    carbonSequestrationTonsSqKm: 580,
    vulnerabilityScore: 88,
    primaryRisk: 'Monsoonal Surge & Mangrove Degradation',
    coordinates: '12.0° N, 88.5° E',
    aiForecast72h: 'Southwest monsoon surge accelerating surface currents to 4.2 knots.',
    speciesDisplacementRisk: 'MODERATE',
    optimalSpeedBufferKnots: 10.0,
    blueCarbonYieldOdPerKm2: 8700,
    strategicInsightText: 'Capitalize on deep water mangrove blue carbon sinks by maintaining zero greywater discharge policies within 20 NM.'
  },
  {
    id: 'REG-MED',
    regionName: 'Mediterranean & Red Sea Passages',
    code: 'MED-RED',
    flag: '🏛️',
    sstAnomaly: 1.78,
    bleachingDegreeWeeks: 11.2,
    microplasticDensity: 1890,
    carbonSequestrationTonsSqKm: 290,
    vulnerabilityScore: 78,
    primaryRisk: 'Marine Heatwaves & Invasive Species Shift',
    coordinates: '35.2° N, 18.4° E',
    aiForecast72h: 'Subsurface marine heatwave active; temperature anomaly reaching +2.1°C at 15m depth.',
    speciesDisplacementRisk: 'MODERATE',
    optimalSpeedBufferKnots: 11.0,
    blueCarbonYieldOdPerKm2: 4350,
    strategicInsightText: 'Deploy acoustic bio-sensors to detect invasive Lessepsian species migration through Suez transit channels.'
  },
  {
    id: 'REG-NOR',
    regionName: 'Nordic Fjords & Arctic Corridor',
    code: 'NOR-ARCTIC',
    flag: '🏔️',
    sstAnomaly: 2.10,
    bleachingDegreeWeeks: 2.1,
    microplasticDensity: 420,
    carbonSequestrationTonsSqKm: 620,
    vulnerabilityScore: 72,
    primaryRisk: 'Glacial Ice Melt & Cold Water Acidification',
    coordinates: '68.4° N, 14.2° E',
    aiForecast72h: 'Accelerated glacial runoff lowering salinity levels by 1.8 PSU in inner fjord basins.',
    speciesDisplacementRisk: 'LOW',
    optimalSpeedBufferKnots: 7.5,
    blueCarbonYieldOdPerKm2: 9300,
    strategicInsightText: 'Strict compliance with IMO 2026 Zero-Emission Fjords Directive required. 100% battery electric propulsion required in UNESCO waters.'
  }
];

export const INITIAL_ECHO_ALERTS: AutomatedEchoAlert[] = [
  {
    id: 'ECHO-2026-081',
    timestamp: ' Just Now (Realtime)',
    sourceSensor: 'Hydrophone Echo Array #4-North',
    frequencyHz: 420,
    region: 'Caribbean Sea Reef Pass',
    severity: 'CRITICAL',
    title: 'Acoustic Echo Shift: Rapid Thermal Column Spike',
    description: 'Subsea acoustic telemetry indicates 2.4°C sudden thermal gradient rise across shallow coral reef barrier.',
    mitigationAction: 'Slow cruise transit speeds to 8 knots. Halt ballast water discharge within 15 NM zone.',
    coordinates: '18.2° N, 64.8° W',
    status: 'ACTIVE',
    acousticDbLevel: 138,
    xpRewardPoints: 150
  },
  {
    id: 'ECHO-2026-080',
    timestamp: '14 Mins Ago',
    sourceSensor: 'Seismic Echo Doppler Radar',
    frequencyHz: 1850,
    region: 'Malacca Strait Entrance',
    severity: 'HIGH',
    title: 'Acoustic Whales Migration Pod Echo Detected',
    description: 'Bio-acoustic sensors detected 12 Blue Whales moving across commercial traffic lane.',
    mitigationAction: 'Dispatched automated AIS safety alert to all vessels in sector. Route detour active.',
    coordinates: '5.8° N, 95.3° E',
    status: 'DISPATCHED',
    acousticDbLevel: 112,
    xpRewardPoints: 100
  },
  {
    id: 'ECHO-2026-079',
    timestamp: '1 Hour Ago',
    sourceSensor: 'Eco-Sensing Mooring Buoy #12',
    frequencyHz: 890,
    region: 'Norwegian Geirangerfjord',
    severity: 'MODERATE',
    title: 'Fjord Dissolved Oxygen Drop Alert',
    description: 'Sensors registered low oxygen saturation in deep fjord basin due to cruise vessel stack emissions.',
    mitigationAction: 'Enforced zero-emission battery electric propulsion protocol for inbound ships.',
    coordinates: '62.1° N, 7.2° E',
    status: 'RESOLVED',
    acousticDbLevel: 94,
    xpRewardPoints: 75
  }
];

export const EMERGENCY_ALERT_ARCHIVE: ArchivedEmergencyAlert[] = [
  {
    id: 'ARCHIVE-2026-001',
    archivedDate: 'Aug 12, 2026',
    incidentType: 'Subsea Gas Seep & Acoustic Shockwave',
    region: 'South China Sea Shelf',
    acousticDb: 152,
    frequencyHz: 210,
    resolutionTimeMins: 18,
    status: 'RESOLVED',
    auditHash: '0x9a8f...43c1',
    summary: 'Acoustic shockwave triggered by subsea methane hydrate release. Traffic redirected 8 NM south.'
  },
  {
    id: 'ARCHIVE-2026-002',
    archivedDate: 'Jul 28, 2026',
    incidentType: 'Marine Mammal Super-Pod Crossing',
    region: 'Gibraltar Strait Narrow',
    acousticDb: 124,
    frequencyHz: 1450,
    resolutionTimeMins: 35,
    status: 'RESOLVED',
    auditHash: '0x3c11...88f2',
    summary: 'Orchid and Pilot Whale pod crossing. 42 cargo and cruise vessels reduced speed to 6 knots.'
  },
  {
    id: 'ARCHIVE-2026-003',
    archivedDate: 'Jul 14, 2026',
    incidentType: 'Unusual Seismic Doppler Anomaly',
    region: 'Mesoamerican Barrier Reef',
    acousticDb: 108,
    frequencyHz: 310,
    resolutionTimeMins: 5,
    status: 'FALSE_ALARM',
    auditHash: '0x7e44...12a9',
    summary: 'Doppler frequency spike caused by naval sonar calibration testing outside sanctuary border.'
  },
  {
    id: 'ARCHIVE-2026-004',
    archivedDate: 'Jun 30, 2026',
    incidentType: 'Severe Oxygen Anoxia Shock',
    region: 'Baltic Sea Basin',
    acousticDb: 88,
    frequencyHz: 720,
    resolutionTimeMins: 42,
    status: 'AUDITED',
    auditHash: '0x1d90...55b7',
    summary: 'Algal bloom oxygen collapse. Automated aeration barges dispatched by regional maritime authority.'
  }
];

export const OCEAN_GUARDIAN_BADGES: OceanGuardianBadge[] = [
  {
    id: 'BADGE-01',
    badgeName: 'Coral Shield Master',
    category: 'REEF PROTECTION',
    icon: '🛡️',
    description: 'Resolved 5+ subsea thermal surge echo alerts near coral sanctuary borders.',
    unlocked: true,
    unlockedDate: 'Aug 10, 2026',
    odRewardBonus: 250
  },
  {
    id: 'BADGE-02',
    badgeName: 'Whale Whisperer',
    category: 'ACOUSTIC SAFETY',
    icon: '🐋',
    description: 'Dispatched 10+ marine mammal pod detour routes to commercial & cruise fleets.',
    unlocked: true,
    unlockedDate: 'Aug 14, 2026',
    odRewardBonus: 500
  },
  {
    id: 'BADGE-03',
    badgeName: 'Fjord Sentinel',
    category: 'ZERO EMISSIONS',
    icon: '🏔️',
    description: 'Achieved 100% Zero-Emission battery propulsion inside UNESCO Nordic waters.',
    unlocked: true,
    unlockedDate: 'Aug 18, 2026',
    odRewardBonus: 750
  },
  {
    id: 'BADGE-04',
    badgeName: 'Sovereign Carbon Pioneer',
    category: 'NET-ZERO CRUISE',
    icon: '🌱',
    description: 'Offset over 5,000 Tons of CO2 emissions via Verra Ocean Blue Carbon Credits.',
    unlocked: false,
    odRewardBonus: 1200
  }
];

export const REGIONAL_CLIMATE_GUIDES: RegionalClimateGuide[] = [
  {
    id: 'GUIDE-NOR',
    region: 'Norwegian Fjords & Nordic Waters',
    title: 'Zero-Emission Fjords Cruise Directive (IMO 2026)',
    seasonality: 'May – September (Peak Cruise Season)',
    keyHazards: ['Cold water hypothermia', 'Narrow fjord navigation', 'Sudden katabatic wind gusts'],
    sanctuaryBoundaries: 'Geirangerfjord & Nærøyfjord UNESCO Protected Zones',
    ecoDirectives: [
      'Mandatory zero-emission propulsion inside UNESCO fjord waters',
      'Zero greywater or blackwater discharge within 12 NM',
      'Mandatory 100% renewable shore power connection at berth'
    ],
    complianceCode: 'NOR-IMO-ANNEX-VI'
  },
  {
    id: 'GUIDE-CAR',
    region: 'Caribbean & Mesoamerican Reef',
    title: 'Coral Reef Protection & Low-Impact Cruise Guide',
    seasonality: 'November – April (Calm Water Horizon)',
    keyHazards: ['Hurricane season (Jun-Oct)', 'Shallow coral head shoals', 'Severe thermal bleaching'],
    sanctuaryBoundaries: 'Mesoamerican Barrier Reef System Reserve',
    ecoDirectives: [
      'Minimum 10-knot speed buffer inside coral sanctuary borders',
      'Anchor usage strictly prohibited; mandatory mooring buoy usage',
      'Eco-certified non-toxic hull anti-fouling paint mandatory'
    ],
    complianceCode: 'CAR-REEF-PROT-2026'
  },
  {
    id: 'GUIDE-IND',
    region: 'Indian Ocean & Maldivian Atolls',
    title: 'Monsoon Resilience & Marine Wildlife Buffer Guide',
    seasonality: 'December – April (Dry SW Monsoon Window)',
    keyHazards: ['Heavy monsoon squalls', 'Strong equatorial currents', 'Subsea ridge turbulence'],
    sanctuaryBoundaries: 'UNESCO Baa Atoll Biosphere Reserve',
    ecoDirectives: [
      'Active acoustic whale-shark avoidance radar mandatory',
      'Zero single-use plastics permitted on passenger cruise ships',
      '100% solar/battery auxiliary power operation at anchor'
    ],
    complianceCode: 'IND-BAA-ATOLL-GUIDE'
  }
];

export const RegionalClimateAndEcoCruisePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'SMART_CRUISE' | 'ECHO_ALERTS' | 'GAMIFICATION' | 'ARCHIVE' | 'IMPACT_VIZ' | 'GUIDES'>('ANALYTICS');

  // 1. Regional Analytics State
  const [selectedRegionId, setSelectedRegionId] = useState<string>('REG-ATL');

  // 2. Echo Alerts State
  const [echoAlerts, setEchoAlerts] = useState<AutomatedEchoAlert[]>(INITIAL_ECHO_ALERTS);
  const [isAudioEchoEnabled, setIsAudioEchoEnabled] = useState<boolean>(true);
  const [alertFilterSeverity, setAlertFilterSeverity] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE'>('ALL');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [copiedEchoAlertId, setCopiedEchoAlertId] = useState<string | null>(null);

  const handleShareEchoAlert = (alert: AutomatedEchoAlert) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const deepLinkUrl = `${baseUrl}?tab=regional&alertId=${encodeURIComponent(alert.id)}`;
    
    if (navigator.share) {
      navigator.share({
        title: `[ACOUSTIC ECHO ALERT] ${alert.title}`,
        text: `${alert.title}: ${alert.description} (${alert.region} - ${alert.coordinates})`,
        url: deepLinkUrl
      }).catch(() => {
        navigator.clipboard.writeText(deepLinkUrl);
        setCopiedEchoAlertId(alert.id);
        setTimeout(() => setCopiedEchoAlertId(null), 3000);
      });
    } else {
      navigator.clipboard.writeText(deepLinkUrl);
      setCopiedEchoAlertId(alert.id);
      setTimeout(() => setCopiedEchoAlertId(null), 3000);
    }
  };

  // Gamification State
  const [userXpPoints, setUserXpPoints] = useState<number>(4250);
  const [userRankTitle, setUserRankTitle] = useState<string>('Level 7 Sovereign Wave Guardian');
  const [badgesList, setBadgesList] = useState<OceanGuardianBadge[]>(OCEAN_GUARDIAN_BADGES);
  const [claimRewardMsg, setClaimRewardMsg] = useState<string | null>(null);

  // 3. Smart Cruise Planner State
  const [departurePort, setDeparturePort] = useState<string>('Miami, USA');
  const [waypointPort, setWaypointPort] = useState<string>('San Juan, Puerto Rico');
  const [destinationPort, setDestinationPort] = useState<string>('St. Thomas, USVI');
  const [propulsionMode, setPropulsionMode] = useState<'LNG_HYBRID' | 'GREEN_HYDROGEN' | 'WIND_SAIL_ASSIST' | 'BIOFUEL'>('GREEN_HYDROGEN');
  const [passengersCount, setPassengersCount] = useState<number>(2400);
  const [isShorePowerSelected, setIsShorePowerSelected] = useState<boolean>(true);
  const [isWeatherAvoidanceOn, setIsWeatherAvoidanceOn] = useState<boolean>(true);
  const [plannerResult, setPlannerResult] = useState<{ co2SavedTons: number; emissionPctReduction: number; requiredOffsetOd: number; ecoScore: number } | null>(null);

  // 4. Emergency Archive State
  const [archiveSearchTerm, setArchiveSearchTerm] = useState<string>('');
  const [archiveStatusFilter, setArchiveStatusFilter] = useState<'ALL' | 'RESOLVED' | 'FALSE_ALARM' | 'AUDITED'>('ALL');

  // 5. Climate Impact Viz State
  const [impactYear, setImpactYear] = useState<number>(2030);

  // 6. Regional Guides Search
  const [guideSearchTerm, setGuideSearchTerm] = useState<string>('');

  // Selected Region Obj
  const activeRegionObj = REGIONAL_CLIMATE_DATA.find((r) => r.id === selectedRegionId) || REGIONAL_CLIMATE_DATA[0];

  // Smart Cruise Planner Calculation
  const handleCalculateSmartCruise = () => {
    let baseCo2Tons = passengersCount * 0.48;
    let reductionPct = 35; // Default LNG
    if (propulsionMode === 'GREEN_HYDROGEN') reductionPct = 88;
    if (propulsionMode === 'WIND_SAIL_ASSIST') reductionPct = 62;
    if (propulsionMode === 'BIOFUEL') reductionPct = 50;
    if (isShorePowerSelected) reductionPct += 8;
    if (isWeatherAvoidanceOn) reductionPct += 4;

    const savedTons = (baseCo2Tons * reductionPct) / 100;
    const offsetOd = Math.round((baseCo2Tons - savedTons) * 14);
    const calculatedEcoScore = Math.min(Math.round(reductionPct * 1.05), 99);

    setPlannerResult({
      co2SavedTons: Math.round(savedTons),
      emissionPctReduction: Math.min(reductionPct, 96),
      requiredOffsetOd: offsetOd,
      ecoScore: calculatedEcoScore
    });

    // Reward XP for planning green route
    setUserXpPoints((prev) => prev + 100);
  };

  const handleResolveAlert = (alertId: string) => {
    setEchoAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'RESOLVED' } : a))
    );
    setUserXpPoints((prev) => prev + 150);
    setActionSuccessMsg(`✅ Echo Alert ${alertId} Resolved! Dispatched captain directive. +150 XP Earned!`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleClaimBadgeReward = (badgeId: string, bonusOd: number) => {
    setBadgesList((prev) =>
      prev.map((b) => (b.id === badgeId ? { ...b, unlocked: true, unlockedDate: 'Just Now' } : b))
    );
    setClaimRewardMsg(`🎉 Bonus Reward Claimed! +${bonusOd} $OD tokens credited to your Sovereign Wallet!`);
    setTimeout(() => setClaimRewardMsg(null), 4000);
  };

  // Radar Data for Regional Vulnerability
  const radarData = REGIONAL_CLIMATE_DATA.map((r) => ({
    region: r.code,
    SST_Stress: Math.round(r.sstAnomaly * 40),
    Bleaching: Math.round(r.bleachingDegreeWeeks * 6),
    Plastics: Math.round((r.microplasticDensity / 2500) * 100),
    Vulnerability: r.vulnerabilityScore
  }));

  // Impact Viz Timeline Data
  const impactTimelineData = [
    { year: 2026, seaLevelRiseM: 0.12, coralLossPct: 24, co2Ppm: 424, imoNetZeroTarget: 20 },
    { year: 2030, seaLevelRiseM: 0.28, coralLossPct: 38, co2Ppm: 438, imoNetZeroTarget: 40 },
    { year: 2040, seaLevelRiseM: 0.65, coralLossPct: 62, co2Ppm: 462, imoNetZeroTarget: 70 },
    { year: 2050, seaLevelRiseM: 1.15, coralLossPct: 82, co2Ppm: 485, imoNetZeroTarget: 100 }
  ];

  const filteredEchoAlerts = alertFilterSeverity === 'ALL'
    ? echoAlerts
    : echoAlerts.filter((a) => a.severity === alertFilterSeverity);

  const filteredArchives = EMERGENCY_ALERT_ARCHIVE.filter((item) => {
    const matchesSearch = item.incidentType.toLowerCase().includes(archiveSearchTerm.toLowerCase()) ||
                          item.region.toLowerCase().includes(archiveSearchTerm.toLowerCase());
    const matchesStatus = archiveStatusFilter === 'ALL' || item.status === archiveStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredGuides = REGIONAL_CLIMATE_GUIDES.filter((g) =>
    g.title.toLowerCase().includes(guideSearchTerm.toLowerCase()) ||
    g.region.toLowerCase().includes(guideSearchTerm.toLowerCase())
  );

  return (
    <div id="regional-climate-eco-cruise-portal" className="space-y-8 font-mono text-white animate-fadeIn">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-cyan-950 border border-emerald-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl">
              <Leaf className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">MARITIME ECO-SUSTAINABILITY</span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  IMO 2026 NET-ZERO STANDARD
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Regional Climate Insights &amp; Smart Cruise Portal
              </h1>
              <p className="text-slate-300 text-xs font-sans mt-0.5 max-w-3xl">
                Integrated platform providing real-time regional climate insights, AI smart cruise route optimization, gamified echo alert dispatching, subsea emergency archives, and IMO climate guides.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 shrink-0">
            <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">{userRankTitle}</span>
              <strong className="text-amber-300 text-sm font-black block">{userXpPoints} XP GUARDIAN POINTS</strong>
            </div>
          </div>
        </div>

        {/* FEATURE NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {[
            { id: 'ANALYTICS', label: '🧠 Regional Climate Insights', desc: 'AI predictive insights & SST' },
            { id: 'SMART_CRUISE', label: '🚀 Smart Cruise Planner', desc: 'AI multi-waypoint eco-router' },
            { id: 'ECHO_ALERTS', label: '🔔 Automated Echo Alerts', desc: 'Realtime acoustic alerts' },
            { id: 'GAMIFICATION', label: '🏆 Climate Gamification', desc: 'Guardian badges & XP' },
            { id: 'ARCHIVE', label: '📂 Emergency Alert Archive', desc: 'Subsea historical logs' },
            { id: 'IMPACT_VIZ', label: '🌊 Climate Impact Model', desc: '2026-2050 Projections' },
            { id: 'GUIDES', label: '📜 Regional Guides', desc: 'Captain eco directives' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-3.5 rounded-xl font-black text-xs transition-all flex flex-col items-start ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-emerald-500/40 hover:text-white'
              }`}
            >
              <span className="uppercase tracking-wider">{tab.label}</span>
              <span className={`text-[9px] font-normal font-sans ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400'}`}>
                {tab.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. REGIONAL CLIMATE INSIGHTS & ANALYTICS */}
      {activeTab === 'ANALYTICS' && (
        <div id="regional-climate-insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* REGION SELECTION & METRICS CARD */}
            <div className="lg:col-span-7 bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <strong className="text-white font-black text-lg block">Oceanic Basin Climate Insights</strong>
                </div>
                <span className="text-slate-400 text-xs font-mono">SELECT BASIN:</span>
              </div>

              {/* REGION BUTTON GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {REGIONAL_CLIMATE_DATA.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegionId(r.id)}
                    className={`p-3 rounded-xl border text-left transition-all font-mono text-xs ${
                      selectedRegionId === r.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-white ring-1 ring-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{r.flag}</span>
                      <span className="text-[10px] font-bold text-slate-500">{r.code}</span>
                    </div>
                    <strong className="block text-xs font-bold mt-1 text-emerald-300 truncate">{r.regionName}</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">SST: +{r.sstAnomaly}°C</span>
                  </button>
                ))}
              </div>

              {/* DETAILED BASIN INSPECTOR & AI REGIONAL CLIMATE INSIGHT */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">ACTIVE BASIN INSPECTOR &amp; INSIGHT</span>
                    <h3 className="text-xl font-black text-white flex items-center space-x-2">
                      <span>{activeRegionObj.flag} {activeRegionObj.regionName}</span>
                    </h3>
                    <span className="text-slate-400 text-xs font-mono">{activeRegionObj.coordinates}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] uppercase block font-bold">VULNERABILITY INDEX</span>
                    <strong className="text-amber-400 text-2xl font-black">{activeRegionObj.vulnerabilityScore} / 100</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-[9px] uppercase font-bold block">SST ANOMALY</span>
                    <strong className="text-rose-400 text-base font-black">+{activeRegionObj.sstAnomaly}°C</strong>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-[9px] uppercase font-bold block">BLEACHING STRESS</span>
                    <strong className="text-amber-300 text-base font-black">{activeRegionObj.bleachingDegreeWeeks} DHW</strong>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-[9px] uppercase font-bold block">MICROPLASTICS</span>
                    <strong className="text-cyan-300 text-base font-black">{activeRegionObj.microplasticDensity} /m³</strong>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-[9px] uppercase font-bold block">CARBON SINK</span>
                    <strong className="text-emerald-400 text-base font-black">{activeRegionObj.carbonSequestrationTonsSqKm} t/km²</strong>
                  </div>
                </div>

                {/* AI STRATEGIC CLIMATE INSIGHT CARD */}
                <div className="bg-gradient-to-r from-emerald-950/80 to-slate-950 p-4 rounded-xl border border-emerald-500/50 space-y-2 text-xs font-sans">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono font-bold text-[11px] uppercase">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span>AI REGIONAL CLIMATE INSIGHT &amp; VESSEL STRATEGY</span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {activeRegionObj.strategicInsightText}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[10px] font-mono border-t border-slate-800">
                    <div><span className="text-slate-400">72h Forecast:</span> <strong className="text-amber-300">{activeRegionObj.aiForecast72h}</strong></div>
                    <div><span className="text-slate-400">Optimal Speed:</span> <strong className="text-cyan-300">{activeRegionObj.optimalSpeedBufferKnots} Knots</strong></div>
                    <div><span className="text-slate-400">Blue Carbon:</span> <strong className="text-emerald-400">${activeRegionObj.blueCarbonYieldOdPerKm2} OD/km²</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* BASIN COMPARISON RADAR CHART */}
            <div className="lg:col-span-5 bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
              <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <strong className="text-white font-black text-lg block">Cross-Basin Vulnerability Radar</strong>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="region" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" />
                    <Radar name="Vulnerability Score" dataKey="Vulnerability" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                    <Radar name="Thermal Stress" dataKey="SST_Stress" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-slate-400 text-xs font-sans text-center">
                Multi-metric comparison highlighting sea surface temperature spikes and vulnerability indices across key maritime corridors.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. SMART CRUISE PLANNER */}
      {activeTab === 'SMART_CRUISE' && (
        <div id="smart-cruise-planner" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* PLANNER INPUTS */}
          <div className="lg:col-span-6 bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
              <Ship className="w-6 h-6 text-emerald-400" />
              <div>
                <strong className="text-white font-black text-lg block">AI Smart Cruise Route Planner</strong>
                <span className="text-[10px] text-slate-400 font-mono">MULTI-WAYPOINT ECO-OPTIMIZATION &amp; SANCTUARY AVOIDANCE</span>
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-slate-400 text-[10px] uppercase font-bold block">MULTI-WAYPOINT VOYAGE ROUTE</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={departurePort}
                    onChange={(e) => setDeparturePort(e.target.value)}
                    placeholder="Origin"
                    className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-white font-mono text-xs"
                  />
                  <input
                    type="text"
                    value={waypointPort}
                    onChange={(e) => setWaypointPort(e.target.value)}
                    placeholder="Waypoint"
                    className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-white font-mono text-xs"
                  />
                  <input
                    type="text"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    placeholder="Destination"
                    className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-white font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold block">PROPULSION &amp; FUEL TECHNOLOGY</label>
                <select
                  value={propulsionMode}
                  onChange={(e) => setPropulsionMode(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs"
                >
                  <option value="GREEN_HYDROGEN">⚡ Green Hydrogen Fuel Cell (-88% CO2)</option>
                  <option value="LNG_HYBRID">🚢 LNG Dual-Fuel Hybrid (-35% CO2)</option>
                  <option value="WIND_SAIL_ASSIST">⛵ Rigid Wind Sail Assist (-62% CO2)</option>
                  <option value="BIOFUEL">🌿 Ultra-Low Carbon Biofuel (-50% CO2)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] uppercase font-bold block">PASSENGER CAPACITY</label>
                  <input
                    type="number"
                    value={passengersCount}
                    onChange={(e) => setPassengersCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] uppercase font-bold block">WEATHER AVOIDANCE</label>
                  <button
                    onClick={() => setIsWeatherAvoidanceOn(!isWeatherAvoidanceOn)}
                    className={`w-full py-2 px-3 rounded-xl font-bold text-xs uppercase border transition-all ${
                      isWeatherAvoidanceOn
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}
                  >
                    {isWeatherAvoidanceOn ? '🌧️ AI Avoidance On' : 'Off'}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCalculateSmartCruise}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase rounded-xl shadow-xl transition-all hover:scale-[1.01]"
              >
                GENERATE SMART GREEN CRUISE ITINERARY
              </button>
            </div>
          </div>

          {/* PLANNER OUTPUTS */}
          <div className="lg:col-span-6 bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <strong className="text-white font-black text-lg block">Smart Cruise Certificate Result</strong>
            </div>

            {plannerResult ? (
              <div className="space-y-4 font-mono text-xs animate-fadeIn">
                <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-500/40 space-y-3 text-center">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">IMO 2026 NET-ZERO COMPLIANCE SCORE</span>
                  <strong className="text-emerald-400 text-4xl font-black block">{plannerResult.ecoScore} / 100 ECO SCORE</strong>
                  <span className="text-cyan-300 text-xs font-sans block">Saved {plannerResult.co2SavedTons} Tons CO2 (-{plannerResult.emissionPctReduction}%)</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Waypoints:</span>
                    <strong className="text-white font-mono">{departurePort} ➔ {waypointPort} ➔ {destinationPort}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Propulsion Mode:</span>
                    <strong className="text-emerald-400 font-mono">{propulsionMode.replace('_', ' ')}</strong>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-800 pt-2">
                    <span className="text-slate-400">Required Carbon Offset ($OD):</span>
                    <strong className="text-amber-300 font-mono">${plannerResult.requiredOffsetOd.toLocaleString()} OD</strong>
                  </div>
                </div>

                <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complies with IMO 2026 Fjords &amp; Coral Reef Protection Directives! +100 XP Earned!</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-2 text-slate-400">
                <Ship className="w-10 h-10 mx-auto text-slate-600 animate-bounce" />
                <p className="text-xs font-sans">Configure voyage waypoints and click "Generate Smart Green Cruise Itinerary" to calculate carbon savings and ECO score.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. AUTOMATED ECHO ALERTS */}
      {activeTab === 'ECHO_ALERTS' && (
        <div id="automated-echo-alerts" className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Radio className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>HYDROPHONE &amp; ACOUSTIC SENSOR NETWORK</span>
              </div>
              <h2 className="text-xl font-black text-white">Automated Echo &amp; Eco Climate Alerts</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time ocean hydrophone telemetry detecting subsea thermal surges, marine mammal pod crossings, and dissolved oxygen drops.
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setIsAudioEchoEnabled(!isAudioEchoEnabled)}
                className={`py-1.5 px-3 rounded-lg font-black text-xs flex items-center space-x-2 transition-all ${
                  isAudioEchoEnabled ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isAudioEchoEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>AUDIO ECHO ALERTS {isAudioEchoEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <div className="flex items-center space-x-1 text-xs font-mono">
                <span className="text-slate-400">Filter:</span>
                {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setAlertFilterSeverity(s as any)}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      alertFilterSeverity === s ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {actionSuccessMsg && (
            <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-3 rounded-xl text-xs font-bold font-mono text-center animate-fadeIn">
              {actionSuccessMsg}
            </div>
          )}

          {/* ECHO ALERT FEED */}
          <div className="space-y-3 font-mono text-xs">
            {filteredEchoAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                          : alert.severity === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <strong className="text-white font-bold text-sm">{alert.title}</strong>
                  </div>

                  <div className="flex items-center space-x-3 text-[10px] text-slate-400">
                    <span>📡 {alert.sourceSensor} ({alert.frequencyHz} Hz / {alert.acousticDbLevel || 110} dB)</span>
                    <span className="text-emerald-400 font-bold">{alert.timestamp}</span>
                  </div>
                </div>

                <p className="text-slate-300 font-sans text-xs">{alert.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                  <span className="text-cyan-300 flex items-center space-x-1.5">
                    <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Mitigation Directive:</strong> {alert.mitigationAction}</span>
                  </span>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleShareEchoAlert(alert)}
                      className="py-1 px-2.5 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 font-bold text-[10px] uppercase rounded-lg transition-all flex items-center space-x-1"
                      title="Share Echo alert deep-link"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{copiedEchoAlertId === alert.id ? 'Copied Link!' : 'Share'}</span>
                    </button>

                    {alert.status !== 'RESOLVED' ? (
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="py-1 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[10px] uppercase rounded-lg transition-all flex items-center space-x-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>DISPATCH DIRECTIVE (+{alert.xpRewardPoints || 100} XP)</span>
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-bold text-[10px] uppercase flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>RESOLVED (+{alert.xpRewardPoints || 100} XP EARNED)</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. CLIMATE ALERT GAMIFICATION */}
      {activeTab === 'GAMIFICATION' && (
        <div id="climate-alert-gamification" className="space-y-6">
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-amber-400" />
                <div>
                  <h2 className="text-xl font-black text-white">Ocean Guardian Gamification &amp; Badges</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Earn XP points and $OD token bonuses by resolving subsea echo alerts and deploying zero-emission cruise routes.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-right">
                <span className="text-slate-400 text-[10px] block font-bold uppercase">CURRENT RANK</span>
                <strong className="text-amber-300 text-base font-black">{userRankTitle}</strong>
              </div>
            </div>

            {claimRewardMsg && (
              <div className="bg-amber-500/20 border border-amber-400 text-amber-200 p-3 rounded-xl text-xs font-bold font-mono text-center animate-fadeIn">
                {claimRewardMsg}
              </div>
            )}

            {/* BADGES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              {badgesList.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                    badge.unlocked
                      ? 'bg-slate-900 border-amber-500/50 shadow-xl'
                      : 'bg-slate-950 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                        {badge.category}
                      </span>
                    </div>
                    <strong className="text-white font-bold block text-sm">{badge.badgeName}</strong>
                    <p className="text-slate-400 text-[11px] font-sans leading-relaxed">{badge.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                    <span className="text-amber-300 font-bold">+{badge.odRewardBonus} $OD BONUS</span>
                    {badge.unlocked ? (
                      <button
                        onClick={() => handleClaimBadgeReward(badge.id, badge.odRewardBonus)}
                        className="py-1 px-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase rounded transition-all"
                      >
                        CLAIM BONUS
                      </button>
                    ) : (
                      <span className="text-slate-600 font-bold">LOCKED</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. EMERGENCY ALERT ARCHIVE */}
      {activeTab === 'ARCHIVE' && (
        <div id="emergency-alert-archive" className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Archive className="w-4 h-4 text-cyan-400" />
                <span>HISTORICAL SUBSEA LOGGED INCIDENTS</span>
              </div>
              <h2 className="text-xl font-black text-white">Emergency Alert Archive &amp; Audit Trail</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Searchable ledger of past acoustic subsea emergency incidents, acoustic frequency spectrums, and resolution audit hashes.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search archive..."
                value={archiveSearchTerm}
                onChange={(e) => setArchiveSearchTerm(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-xs"
              />

              <select
                value={archiveStatusFilter}
                onChange={(e) => setArchiveStatusFilter(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-xs"
              >
                <option value="ALL">All Statuses</option>
                <option value="RESOLVED">Resolved</option>
                <option value="FALSE_ALARM">False Alarm</option>
                <option value="AUDITED">Audited</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {filteredArchives.map((item) => (
              <div key={item.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                      {item.status}
                    </span>
                    <strong className="text-white font-bold text-sm">{item.incidentType}</strong>
                  </div>
                  <span className="text-slate-400 text-[10px]">{item.archivedDate}</span>
                </div>

                <p className="text-slate-300 text-xs font-sans">{item.summary}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-2 rounded-xl text-[10px] text-slate-400 border border-slate-800">
                  <span>📍 {item.region} ({item.frequencyHz} Hz / {item.acousticDb} dB)</span>
                  <span>⏱️ Resolved in {item.resolutionTimeMins} Mins</span>
                  <span className="text-emerald-400 font-mono">Hash: {item.auditHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. CLIMATE IMPACT VISUALIZATION */}
      {activeTab === 'IMPACT_VIZ' && (
        <div id="climate-impact-visualization" className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Waves className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>2026 - 2050 OCEAN CLIMATE TRAJECTORY</span>
              </div>
              <h2 className="text-xl font-black text-white">Climate Impact Visualization Model</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate sea level rise impacts, coral cover loss, and IMO Net-Zero emissions targets.
              </p>
            </div>

            {/* TIMELINE SLIDER */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center space-x-3 font-mono text-xs">
              <span className="text-slate-400 font-bold">YEAR:</span>
              {[2026, 2030, 2040, 2050].map((y) => (
                <button
                  key={y}
                  onClick={() => setImpactYear(y)}
                  className={`px-3 py-1.5 rounded-lg font-black transition-all ${
                    impactYear === y ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* IMPACT CHART */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={impactTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                <Bar dataKey="seaLevelRiseM" name="Sea Level Rise (Meters)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="coralLossPct" name="Coral Cover Loss (%)" stroke="#f43f5e" strokeWidth={2.5} />
                <Line type="monotone" dataKey="imoNetZeroTarget" name="IMO Net-Zero Target (%)" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 7. REGIONAL CLIMATE GUIDES */}
      {activeTab === 'GUIDES' && (
        <div id="regional-climate-guides" className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>CAPTAINS &amp; MARITIME OFFICERS DIRECTIVES</span>
              </div>
              <h2 className="text-xl font-black text-white">Regional Climate &amp; Eco Guides</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Official regulatory directives, sanctuary boundaries, and zero-emission compliance guidelines for maritime captains.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search guides by region..."
              value={guideSearchTerm}
              onChange={(e) => setGuideSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white font-mono text-xs max-w-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {filteredGuides.map((guide) => (
              <div key={guide.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                    {guide.complianceCode}
                  </span>
                  <h3 className="font-bold text-base text-white">{guide.title}</h3>
                  <span className="text-[10px] text-slate-400 block font-sans"><strong>Seasonality:</strong> {guide.seasonality}</span>
                </div>

                <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-sans">
                  <strong className="text-emerald-400 font-mono block text-[10px] uppercase">ECO DIRECTIVES:</strong>
                  <ul className="space-y-1 list-disc list-inside text-slate-300 text-[10px]">
                    {guide.ecoDirectives.map((dir, idx) => (
                      <li key={idx}>{dir}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex justify-between items-center">
                  <span>{guide.sanctuaryBoundaries}</span>
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
