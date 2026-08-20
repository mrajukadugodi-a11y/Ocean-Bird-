import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Waves, Globe, AlertTriangle, Radio, Activity, Clock, Navigation, 
  Compass, Zap, Bell, CheckCircle2, RefreshCw, Volume2, VolumeX, ShieldCheck, 
  MapPin, Anchor, Cpu, Bot, ChevronDown, ChevronUp, Layers, Flame, Search, 
  Filter, HardDriveDownload, Signal, ArrowUpRight, BarChart3, LineChart as LineChartIcon, 
  Sliders, CheckSquare, Square, Play, ShieldX, Map, Download, Eye, ZapOff, Check,
  AlertOctagon, HelpCircle, Award, RotateCcw, FileText, PlusCircle, Trash2, Send, TrendingUp,
  BellRing, Calendar, AlarmClock, PieChart, Target, Users, Sparkles, Trophy, Mic, MicOff,
  Video, Share2, FileVideo, Copy, ExternalLink, Medal, Pause, PlayCircle, Siren, Archive
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, LineChart, Line, ReferenceLine, CartesianGrid 
} from 'recharts';

export type TsunamiAlertLevel = 'WARNING' | 'ADVISORY' | 'WATCH' | 'INFORMATION';
export type AlertIntensityMode = 'ALL' | 'CRITICAL_M7' | 'HIGH_TSUNAMI' | 'MODERATE';

export interface EarthquakeEvent {
  id: string;
  magnitude: number;
  mmiGrade: string;
  pgaPercentG: number;
  location: string;
  oceanZone: string;
  coordinates: string;
  depthKm: number;
  timestamp: string;
  tsunamiPotential: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
  tsunamiWaveHeightM: number;
  faultType: string;
  affectedPorts: string[];
  aiEvacuationAdvice: string;
}

export interface TsunamiWarningZone {
  id: string;
  zoneName: string;
  alertLevel: TsunamiAlertLevel;
  associatedEarthquakeId: string;
  epicenterLocation: string;
  estimatedWaveArrivalTime: string;
  etaCountdownMinutes: number;
  maxWaveHeightMeters: number;
  impactedCountries: string[];
  recommendedOffshoreDepthMeters: number;
  bridgeActionProtocol: string;
  status: 'ACTIVE_WARNING' | 'EVALUATING' | 'PASSED';
  evacuationCourseHeading: string;
  distanceToSafeWaterNM: number;
  requiredSpeedKts: number;
}

export interface HistoricalImpactData {
  eventYear: string;
  eventName: string;
  magnitude: number;
  maxWaveHeightMeters: number;
  casualtiesCount: number;
  oceanBasin: string;
  economicDamageBillionUSD: number;
}

export interface EvacuationCheckstep {
  id: string;
  text: string;
  completed: boolean;
  category: 'NAVIGATION' | 'ENGINE' | 'COMMUNICATION' | 'SAFETY';
}

export interface RegionalHeatMapZone {
  id: string;
  regionName: string;
  oceanBasin: string;
  riskScore: number; // 0 - 100
  severity: 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'NORMAL';
  activeBuoys: number;
  vesselsAtRisk: number;
  maxWaveHeightM: number;
  coordinates: string;
}

export interface CrisisMapLayersState {
  faultLines: boolean;
  tsunamiVectors: boolean;
  dartBuoys: boolean;
  coastalSirens: boolean;
  safeCorridors: boolean;
  seismicHeatmap: boolean;
}

export interface DrillHotspot {
  id: string;
  name: string;
  oceanZone: string;
  coordinates: string;
  riskScore: number;
  vulnerabilityLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  recommendedFrequency: 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY';
  lastDrillDate: string;
  readinessIndex: number;
  vesselsInZoneCount: number;
  historicalTsunamiCount: number;
  primaryFaultName: string;
}

export interface ArchivedItemBundle {
  id: string;
  archiveDate: string;
  category: 'COMPLETED_DRILL' | 'VOICE_TRANSCRIPT' | 'ALERT_LOG';
  title: string;
  itemCount: number;
  compressedSizeBytes: number;
  originalDataJson: string;
}

export interface DisasterDrillQuestion {
  id: string;
  scenarioTitle: string;
  question: string;
  options: { label: string; isCorrect: boolean; explanation: string; penaltyScore: number }[];
}

export interface OfflineAlertLogEntry {
  id: string;
  timestamp: string;
  category: 'CRITICAL' | 'WARNING' | 'TELEMETRY' | 'EVACUATION' | 'DRILL' | 'SYSTEM';
  source: string;
  message: string;
  acknowledged: boolean;
}

export interface ScheduledDrill {
  id: string;
  title: string;
  scenarioType: 'MEGATHRUST_TSUNAMI' | 'PORT_EVACUATION' | 'ECDIS_DEEP_WATER' | 'RADIO_MAYDAY_RELAY' | 'ENGINE_SPEED_MANEUVER';
  oceanZone: string;
  targetCrew: string;
  scheduledTime: string;
  frequency: 'ONE_TIME' | 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY';
  difficulty: 'STANDARD' | 'ADVANCED' | 'CATASTROPHIC_SURPRISE';
  reminderMinutesBefore: number;
  reminderActive: boolean;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  notes: string;
  lastExecutedScore?: number;
}

export interface DrillPerformanceRecord {
  id: string;
  drillTitle: string;
  executedAt: string;
  crewTeam: string;
  score: number;
  timeTakenSeconds: number;
  targetTimeSeconds: number;
  navigationScore: number;
  engineScore: number;
  communicationScore: number;
  safetyScore: number;
  commonErrors: string[];
  status: 'PASSED' | 'FAILED' | 'EXCELLENT';
}

export interface AutomatedReminderAlert {
  id: string;
  drillId: string;
  drillTitle: string;
  scheduledTime: string;
  timeRemainingText: string;
  triggerTime: string;
  dismissed: boolean;
  snoozedUntil?: string;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface DrillLeaderboardEntry {
  id: string;
  rank: number;
  crewTeam: string;
  vesselName: string;
  officerInCommand: string;
  drillsCompleted: number;
  averageScore: number;
  averageTimeSeconds: number;
  perfectScoreCount: number;
  badge: 'FLEET_ELITE' | 'GOLD_STAR' | 'QUALIFIED' | 'ROOKIE';
  oceanBasin: string;
  lastDrillDate: string;
}

export interface DrillVoiceLogEntry {
  id: string;
  timestamp: string;
  speaker: string;
  channel: string;
  transcript: string;
  durationSeconds: number;
  sentiment: 'URGENT_COMMAND' | 'CLEAR_CONFIRMATION' | 'SYSTEM_ALERT';
  drillTitle?: string;
  audioSimulated: boolean;
}

export const SEED_DRILL_LEADERBOARD: DrillLeaderboardEntry[] = [
  {
    id: 'LEAD-01',
    rank: 1,
    crewTeam: 'Bridge Alpha Officers',
    vesselName: 'M/V Pacific Endeavour',
    officerInCommand: 'Capt. Jonathan Miller',
    drillsCompleted: 14,
    averageScore: 96.5,
    averageTimeSeconds: 132,
    perfectScoreCount: 11,
    badge: 'FLEET_ELITE',
    oceanBasin: 'NW Pacific Basin',
    lastDrillDate: '2026-08-01'
  },
  {
    id: 'LEAD-02',
    rank: 2,
    crewTeam: 'Engine Room Duty Team',
    vesselName: 'M/V Ocean Voyager',
    officerInCommand: 'Chief Eng. David Thorne',
    drillsCompleted: 12,
    averageScore: 94.2,
    averageTimeSeconds: 148,
    perfectScoreCount: 8,
    badge: 'GOLD_STAR',
    oceanBasin: 'Indian Ocean',
    lastDrillDate: '2026-07-28'
  },
  {
    id: 'LEAD-03',
    rank: 3,
    crewTeam: 'Bridge Beta Duty Crew',
    vesselName: 'M/V Atlantic Guardian',
    officerInCommand: 'Capt. Sarah Jenkins',
    drillsCompleted: 10,
    averageScore: 89.8,
    averageTimeSeconds: 165,
    perfectScoreCount: 6,
    badge: 'QUALIFIED',
    oceanBasin: 'North Atlantic Shelf',
    lastDrillDate: '2026-07-25'
  },
  {
    id: 'LEAD-04',
    rank: 4,
    crewTeam: 'Deck Watchstanders Delta',
    vesselName: 'M/V Southern Cross',
    officerInCommand: 'First Officer Liam Silva',
    drillsCompleted: 8,
    averageScore: 86.4,
    averageTimeSeconds: 185,
    perfectScoreCount: 4,
    badge: 'QUALIFIED',
    oceanBasin: 'South Pacific Basin',
    lastDrillDate: '2026-07-20'
  },
  {
    id: 'LEAD-05',
    rank: 5,
    crewTeam: 'Yokohama Harbor Pilots',
    vesselName: 'Port Pilot Craft 02',
    officerInCommand: 'Pilot Capt. Kenji Sato',
    drillsCompleted: 6,
    averageScore: 82.1,
    averageTimeSeconds: 202,
    perfectScoreCount: 2,
    badge: 'QUALIFIED',
    oceanBasin: 'NW Pacific Basin',
    lastDrillDate: '2026-07-15'
  }
];

export const SEED_DRILL_VOICE_LOGS: DrillVoiceLogEntry[] = [
  {
    id: 'VOICE-01',
    timestamp: '2026-08-01 10:15:02 UTC',
    speaker: 'Capt. Jonathan Miller (Bridge)',
    channel: 'VHF CH 16 / BRIDGE CVR',
    transcript: 'SECURITE, SECURITE, SECURITE. All stations, this is M/V Pacific Endeavour MMSI 238102930. Megathrust earthquake magnitude 8.9 detected off Nankai Trough. Casting off moorings now, course 110 degrees True to deep water depth 250m.',
    durationSeconds: 18,
    sentiment: 'URGENT_COMMAND',
    drillTitle: 'Nankai Trough Megathrust Evacuation',
    audioSimulated: true
  },
  {
    id: 'VOICE-02',
    timestamp: '2026-08-01 10:15:22 UTC',
    speaker: 'Chief Officer Tanaka (Radio desk)',
    channel: 'DSC DISTRESS RELAY',
    transcript: 'DSC Distress Relay broadcast confirmed sent on 2187.5 kHz and VHF Channel 70. Tokyo Coast Guard acknowledged receipt.',
    durationSeconds: 12,
    sentiment: 'CLEAR_CONFIRMATION',
    drillTitle: 'Nankai Trough Megathrust Evacuation',
    audioSimulated: true
  },
  {
    id: 'VOICE-03',
    timestamp: '2026-08-01 10:15:38 UTC',
    speaker: 'Helmsman Silva (Wheel)',
    channel: 'BRIDGE INTERCOM',
    transcript: 'Rudder hard starboard 110 degrees. Main engine tachometer reaching 120 RPM, speed over ground 18.5 knots accelerating.',
    durationSeconds: 10,
    sentiment: 'CLEAR_CONFIRMATION',
    drillTitle: 'Nankai Trough Megathrust Evacuation',
    audioSimulated: true
  },
  {
    id: 'VOICE-04',
    timestamp: '2026-07-28 14:02:10 UTC',
    speaker: 'Chief Eng. David Thorne (Control Room)',
    channel: 'ENGINE CONTROL',
    transcript: 'Main engine full throttle engaged in 142 seconds. Auxiliary generators synchronized, zero power interruption on sea chest pumps.',
    durationSeconds: 14,
    sentiment: 'SYSTEM_ALERT',
    drillTitle: 'Sunda Arc Rapid Cast-Off Drill',
    audioSimulated: true
  }
];

export const SEED_SCHEDULED_DRILLS: ScheduledDrill[] = [
  {
    id: 'DRILL-SCH-01',
    title: 'Nankai Trough Megathrust Evacuation Simulation',
    scenarioType: 'MEGATHRUST_TSUNAMI',
    oceanZone: 'NW Pacific Basin (Honshu Sector)',
    targetCrew: 'Bridge Alpha Officers',
    scheduledTime: '2026-08-05 08:00 UTC',
    frequency: 'WEEKLY',
    difficulty: 'CATASTROPHIC_SURPRISE',
    reminderMinutesBefore: 15,
    reminderActive: true,
    status: 'SCHEDULED',
    notes: 'Simulate instant shore radar failure. Cast off berth lines & steer course 110° True.',
    lastExecutedScore: 92
  },
  {
    id: 'DRILL-SCH-02',
    title: 'Sunda Arc Rapid Cast-Off & Speed Maneuver Drill',
    scenarioType: 'ENGINE_SPEED_MANEUVER',
    oceanZone: 'Indian Ocean (Sumatra Coast)',
    targetCrew: 'Deck & Engine Duty Crew',
    scheduledTime: '2026-08-06 14:30 UTC',
    frequency: 'BI_WEEKLY',
    difficulty: 'ADVANCED',
    reminderMinutesBefore: 30,
    reminderActive: true,
    status: 'SCHEDULED',
    notes: 'Execute main engine full throttle within 180 seconds of tsunami siren broadcast.',
    lastExecutedScore: 88
  },
  {
    id: 'DRILL-SCH-03',
    title: 'Cascadia Subduction ECDIS Depth Contour Setup Drill',
    scenarioType: 'ECDIS_DEEP_WATER',
    oceanZone: 'North Pacific (Oregon Shelf)',
    targetCrew: 'Navigational Officers',
    scheduledTime: '2026-08-08 10:00 UTC',
    frequency: 'MONTHLY',
    difficulty: 'STANDARD',
    reminderMinutesBefore: 60,
    reminderActive: true,
    status: 'SCHEDULED',
    notes: 'Verify ECDIS safety depth contour set to >250m water depth for all waypoints.',
    lastExecutedScore: 95
  }
];

export const SEED_DRILL_PERFORMANCE_HISTORY: DrillPerformanceRecord[] = [
  {
    id: 'PERF-2026-01',
    drillTitle: 'Pacific Ring Megathrust Fast Evacuation',
    executedAt: '2026-08-01 10:15 UTC',
    crewTeam: 'Bridge Alpha Crew',
    score: 95,
    timeTakenSeconds: 165,
    targetTimeSeconds: 210,
    navigationScore: 98,
    engineScore: 92,
    communicationScore: 94,
    safetyScore: 96,
    commonErrors: ['Minor delay on VHF Mayday confirmation (+10s)'],
    status: 'EXCELLENT'
  },
  {
    id: 'PERF-2026-02',
    drillTitle: 'Sumatran Trench Rapid Cast-Off',
    executedAt: '2026-07-28 14:00 UTC',
    crewTeam: 'Bridge Beta Crew',
    score: 88,
    timeTakenSeconds: 195,
    targetTimeSeconds: 210,
    navigationScore: 90,
    engineScore: 84,
    communicationScore: 88,
    safetyScore: 90,
    commonErrors: ['Mooring line tension alert acknowledged late (+15s)'],
    status: 'PASSED'
  },
  {
    id: 'PERF-2026-03',
    drillTitle: 'Cascadia Deep Water Vector Plot',
    executedAt: '2026-07-22 09:30 UTC',
    crewTeam: 'Deck Watchstanders',
    score: 74,
    timeTakenSeconds: 245,
    targetTimeSeconds: 210,
    navigationScore: 72,
    engineScore: 78,
    communicationScore: 70,
    safetyScore: 76,
    commonErrors: ['ECDIS safety contour depth left at 50m instead of 250m', 'Delayed Mayday DSC radio relay'],
    status: 'PASSED'
  },
  {
    id: 'PERF-2026-04',
    drillTitle: 'Hellenic Arc Port Evacuation Siren Drill',
    executedAt: '2026-07-15 11:00 UTC',
    crewTeam: 'Engine Room Team',
    score: 91,
    timeTakenSeconds: 172,
    targetTimeSeconds: 210,
    navigationScore: 92,
    engineScore: 94,
    communicationScore: 88,
    safetyScore: 90,
    commonErrors: ['Secondary generator sync delay (+8s)'],
    status: 'EXCELLENT'
  },
  {
    id: 'PERF-2026-05',
    drillTitle: 'Atacama Trench High Wave Evacuation',
    executedAt: '2026-07-08 16:20 UTC',
    crewTeam: 'Bridge Alpha Crew',
    score: 97,
    timeTakenSeconds: 152,
    targetTimeSeconds: 210,
    navigationScore: 98,
    engineScore: 96,
    communicationScore: 96,
    safetyScore: 98,
    commonErrors: [],
    status: 'EXCELLENT'
  }
];

export const SEED_DRILL_HOTSPOTS: DrillHotspot[] = [
  {
    id: 'HOTSPOT-01',
    name: 'Nankai Trough & Honshu Megathrust Zone',
    oceanZone: 'NW Pacific Ocean (Japan Arc)',
    coordinates: '37.8° N, 142.1° E',
    riskScore: 96,
    vulnerabilityLevel: 'CRITICAL',
    recommendedFrequency: 'BI_WEEKLY',
    lastDrillDate: '2026-08-01 (3 days ago)',
    readinessIndex: 94,
    vesselsInZoneCount: 18,
    historicalTsunamiCount: 14,
    primaryFaultName: 'Nankai Plate Boundary Megathrust'
  },
  {
    id: 'HOTSPOT-02',
    name: 'Sunda Trench & Sumatra Subduction Arc',
    oceanZone: 'Indian Ocean / Andaman Sea',
    coordinates: '2.1° S, 98.4° E',
    riskScore: 88,
    vulnerabilityLevel: 'HIGH',
    recommendedFrequency: 'WEEKLY',
    lastDrillDate: '2026-07-28 (7 days ago)',
    readinessIndex: 89,
    vesselsInZoneCount: 14,
    historicalTsunamiCount: 11,
    primaryFaultName: 'Sumatran Megathrust'
  },
  {
    id: 'HOTSPOT-03',
    name: 'Cascadia Subduction Zone (US West Coast)',
    oceanZone: 'North Pacific Ocean (Oregon/WA)',
    coordinates: '44.2° N, 125.6° W',
    riskScore: 82,
    vulnerabilityLevel: 'HIGH',
    recommendedFrequency: 'MONTHLY',
    lastDrillDate: '2026-07-22 (13 days ago)',
    readinessIndex: 78,
    vesselsInZoneCount: 8,
    historicalTsunamiCount: 5,
    primaryFaultName: 'Juan de Fuca - N. American Interface'
  },
  {
    id: 'HOTSPOT-04',
    name: 'Kermadec-Tonga Trench Subduction Basin',
    oceanZone: 'South Pacific Ocean',
    coordinates: '21.3° S, 175.2° W',
    riskScore: 91,
    vulnerabilityLevel: 'CRITICAL',
    recommendedFrequency: 'BI_WEEKLY',
    lastDrillDate: '2026-07-15 (20 days ago)',
    readinessIndex: 91,
    vesselsInZoneCount: 6,
    historicalTsunamiCount: 8,
    primaryFaultName: 'Pacific-Indo-Australian Subduction Zone'
  },
  {
    id: 'HOTSPOT-05',
    name: 'Atacama Trench & Peru-Chile Coastline',
    oceanZone: 'South East Pacific Ocean',
    coordinates: '19.4° S, 70.8° W',
    riskScore: 76,
    vulnerabilityLevel: 'HIGH',
    recommendedFrequency: 'MONTHLY',
    lastDrillDate: '2026-07-08 (27 days ago)',
    readinessIndex: 85,
    vesselsInZoneCount: 9,
    historicalTsunamiCount: 9,
    primaryFaultName: 'Nazca - South American Plate Contact'
  },
  {
    id: 'HOTSPOT-06',
    name: 'Hellenic Arc & Eastern Mediterranean',
    oceanZone: 'Mediterranean Basin',
    coordinates: '34.8° N, 24.9° E',
    riskScore: 64,
    vulnerabilityLevel: 'MODERATE',
    recommendedFrequency: 'BI_WEEKLY',
    lastDrillDate: '2026-07-15 (20 days ago)',
    readinessIndex: 92,
    vesselsInZoneCount: 11,
    historicalTsunamiCount: 4,
    primaryFaultName: 'Hellenic Subduction Arc'
  }
];

export const WORLDWIDE_EARTHQUAKES: EarthquakeEvent[] = [
  {
    id: 'EQ-2026-PAC01',
    magnitude: 7.6,
    mmiGrade: 'IX (Violent)',
    pgaPercentG: 48.5,
    location: 'Off East Coast of Honshu, Japan (Nankai Trough)',
    oceanZone: 'Pacific Ocean (Ring of Fire)',
    coordinates: '37.8° N, 142.1° E',
    depthKm: 12,
    timestamp: '2026-08-04 12:14 UTC',
    tsunamiPotential: 'HIGH',
    tsunamiWaveHeightM: 4.8,
    faultType: 'Subduction Megathrust Fault',
    affectedPorts: ['Port of Yokohama', 'Port of Tokyo', 'Sendai Harbour', 'Nagoya'],
    aiEvacuationAdvice: 'CRITICAL: Tsunami wave generated. Vessels in shallow waters (<200m depth) proceed immediately to deep water anchorage (>250m). Clear all berth lines.'
  },
  {
    id: 'EQ-2026-IND02',
    magnitude: 7.2,
    mmiGrade: 'VIII (Severe)',
    pgaPercentG: 34.2,
    location: 'West of Sumatra, Indonesia (Sunda Trench Arc)',
    oceanZone: 'Indian Ocean (Sunda Arc)',
    coordinates: '2.1° S, 98.4° E',
    depthKm: 15,
    timestamp: '2026-08-04 11:42 UTC',
    tsunamiPotential: 'HIGH',
    tsunamiWaveHeightM: 3.5,
    faultType: 'Sumatran Megathrust',
    affectedPorts: ['Padang Harbour', 'Port of Belawan', 'Banda Aceh', 'Phuket Deep Sea Port'],
    aiEvacuationAdvice: 'TSUNAMI ADVISORY: 3.5m wave propagation detected heading NW toward Andaman Sea and Bay of Bengal. Maintain maximum engine output.'
  },
  {
    id: 'EQ-2026-AME03',
    magnitude: 6.8,
    mmiGrade: 'VII (Very Strong)',
    pgaPercentG: 22.8,
    location: 'Off North Coast of Chile (Atacama Trench)',
    oceanZone: 'South Pacific Ocean',
    coordinates: '19.4° S, 70.8° W',
    depthKm: 28,
    timestamp: '2026-08-04 09:10 UTC',
    tsunamiPotential: 'MEDIUM',
    tsunamiWaveHeightM: 1.8,
    faultType: 'Nazca-South American Plate Boundary',
    affectedPorts: ['Port of Iquique', 'Antofagasta', 'Arica Terminal'],
    aiEvacuationAdvice: 'TSUNAMI WATCH: Minor sea level fluctuations (1.8m) expected along northern Chilean coastline. Harbor operations halted.'
  },
  {
    id: 'EQ-2026-CAS04',
    magnitude: 6.5,
    mmiGrade: 'VI (Strong)',
    pgaPercentG: 14.6,
    location: 'Cascadia Subduction Zone, Off Coast of Oregon, USA',
    oceanZone: 'North Pacific Ocean',
    coordinates: '44.2° N, 125.6° W',
    depthKm: 18,
    timestamp: '2026-08-04 06:30 UTC',
    tsunamiPotential: 'MEDIUM',
    tsunamiWaveHeightM: 1.2,
    faultType: 'Cascadia Megathrust Interface',
    affectedPorts: ['Port of Seattle', 'Portland Outer Anchorage', 'Coos Bay'],
    aiEvacuationAdvice: 'TSUNAMI ADVISORY: Micro-tsunami surge vectors detected on DART buoys #46404 and #46407.'
  },
  {
    id: 'EQ-2026-MED05',
    magnitude: 6.1,
    mmiGrade: 'V (Moderate)',
    pgaPercentG: 8.4,
    location: 'Hellenic Arc, South of Crete, Greece',
    oceanZone: 'Mediterranean Sea',
    coordinates: '34.8° N, 24.9° E',
    depthKm: 32,
    timestamp: '2026-08-04 03:15 UTC',
    tsunamiPotential: 'LOW',
    tsunamiWaveHeightM: 0.6,
    faultType: 'African-Eurasian Plate Collision',
    affectedPorts: ['Heraklion Port', 'Piraeus Container Terminal', 'Alexandria Outer Port'],
    aiEvacuationAdvice: 'INFORMATION STATEMENT: Moderate sea level disturbance. No major destructive tsunami threat to commercial maritime routes.'
  }
];

export const WORLDWIDE_TSUNAMI_ZONES: TsunamiWarningZone[] = [
  {
    id: 'TSU-ZONE-PAC01',
    zoneName: 'Nankai Trough & Honshu Coastal Sector',
    alertLevel: 'WARNING',
    associatedEarthquakeId: 'EQ-2026-PAC01',
    epicenterLocation: 'Off East Coast of Honshu (M7.6)',
    estimatedWaveArrivalTime: '12:45 UTC (in 31 mins)',
    etaCountdownMinutes: 31,
    maxWaveHeightMeters: 4.8,
    impactedCountries: ['Japan 🇯🇵', 'Taiwan 🇹🇼', 'Philippines 🇵🇭', 'Russia (Kuril) 🇷🇺'],
    recommendedOffshoreDepthMeters: 250,
    bridgeActionProtocol: 'OFFSHORE EVACUATION ORDER: All vessels in Tokyo Bay and Sagami Bay must slip anchor and steer to deep water course 110° True.',
    status: 'ACTIVE_WARNING',
    evacuationCourseHeading: '110° True',
    distanceToSafeWaterNM: 18.4,
    requiredSpeedKts: 18.5
  },
  {
    id: 'TSU-ZONE-IND02',
    zoneName: 'Andaman Sea & Bay of Bengal Basin',
    alertLevel: 'ADVISORY',
    associatedEarthquakeId: 'EQ-2026-IND02',
    epicenterLocation: 'West of Sumatra, Indonesia (M7.2)',
    estimatedWaveArrivalTime: '13:10 UTC (in 56 mins)',
    etaCountdownMinutes: 56,
    maxWaveHeightMeters: 3.5,
    impactedCountries: ['Indonesia 🇮🇩', 'Thailand 🇹🇭', 'India (Andaman) 🇮🇳', 'Sri Lanka 🇱🇰', 'Malaysia 🇲🇾'],
    recommendedOffshoreDepthMeters: 200,
    bridgeActionProtocol: 'PORT STANDBY: Vessels anchored at Sabang & Port Blair prepare for 2.5 knot tidal surges and mooring line tension spikes.',
    status: 'ACTIVE_WARNING',
    evacuationCourseHeading: '285° True',
    distanceToSafeWaterNM: 22.1,
    requiredSpeedKts: 16.0
  },
  {
    id: 'TSU-ZONE-AME03',
    zoneName: 'Atacama Trench & Peru-Chile Coastline',
    alertLevel: 'WATCH',
    associatedEarthquakeId: 'EQ-2026-AME03',
    epicenterLocation: 'Off North Coast of Chile (M6.8)',
    estimatedWaveArrivalTime: '11:20 UTC (Passed - Wave Height 1.6m)',
    etaCountdownMinutes: 0,
    maxWaveHeightMeters: 1.8,
    impactedCountries: ['Chile 🇨🇱', 'Peru 🇵🇪'],
    recommendedOffshoreDepthMeters: 150,
    bridgeActionProtocol: 'WATCH STATUS: Monitor DART buoy #32401 telemetry. Maintain continuous listening watch on VHF Channel 16.',
    status: 'EVALUATING',
    evacuationCourseHeading: '250° True',
    distanceToSafeWaterNM: 12.0,
    requiredSpeedKts: 12.0
  }
];

export const HISTORICAL_IMPACT_DATASET: HistoricalImpactData[] = [
  { eventYear: '1960', eventName: 'Valdivia, Chile', magnitude: 9.5, maxWaveHeightMeters: 25.0, casualtiesCount: 6000, oceanBasin: 'Pacific', economicDamageBillionUSD: 3.5 },
  { eventYear: '1964', eventName: 'Alaska Megathrust', magnitude: 9.2, maxWaveHeightMeters: 30.0, casualtiesCount: 131, oceanBasin: 'North Pacific', economicDamageBillionUSD: 2.1 },
  { eventYear: '2004', eventName: 'Indian Ocean Tsunami', magnitude: 9.1, maxWaveHeightMeters: 50.8, casualtiesCount: 227898, oceanBasin: 'Indian Ocean', economicDamageBillionUSD: 15.0 },
  { eventYear: '2011', eventName: 'Tohoku, Japan', magnitude: 9.1, maxWaveHeightMeters: 40.5, casualtiesCount: 19747, oceanBasin: 'North West Pacific', economicDamageBillionUSD: 235.0 },
  { eventYear: '1958', eventName: 'Lituya Bay Mega', magnitude: 7.8, maxWaveHeightMeters: 524.0, casualtiesCount: 5, oceanBasin: 'Alaska Gulf', economicDamageBillionUSD: 0.2 },
  { eventYear: '2026', eventName: 'Honshu Nankai (Now)', magnitude: 7.6, maxWaveHeightMeters: 4.8, casualtiesCount: 0, oceanBasin: 'Japan East Sea', economicDamageBillionUSD: 0.1 }
];

export const REGIONAL_HEAT_MAP_ZONES: RegionalHeatMapZone[] = [
  { id: 'zone-01', regionName: 'NW Pacific (Honshu / Japan Trench)', oceanBasin: 'Pacific Ocean', riskScore: 94, severity: 'CRITICAL', activeBuoys: 12, vesselsAtRisk: 18, maxWaveHeightM: 4.8, coordinates: '37.8° N, 142.1° E' },
  { id: 'zone-02', regionName: 'Sunda Trench (Sumatra / Java)', oceanBasin: 'Indian Ocean', riskScore: 82, severity: 'WARNING', activeBuoys: 8, vesselsAtRisk: 14, maxWaveHeightM: 3.5, coordinates: '2.1° S, 98.4° E' },
  { id: 'zone-03', regionName: 'Cascadia Subduction Zone (US West)', oceanBasin: 'North Pacific', riskScore: 58, severity: 'ADVISORY', activeBuoys: 6, vesselsAtRisk: 5, maxWaveHeightM: 1.2, coordinates: '44.2° N, 125.6° W' },
  { id: 'zone-04', regionName: 'Atacama Trench (Chile / Peru)', oceanBasin: 'South Pacific', riskScore: 52, severity: 'ADVISORY', activeBuoys: 5, vesselsAtRisk: 3, maxWaveHeightM: 1.8, coordinates: '19.4° S, 70.8° W' },
  { id: 'zone-05', regionName: 'Hellenic Arc (Crete / Greece)', oceanBasin: 'Mediterranean', riskScore: 24, severity: 'NORMAL', activeBuoys: 3, vesselsAtRisk: 2, maxWaveHeightM: 0.6, coordinates: '34.8° N, 24.9° E' },
  { id: 'zone-06', regionName: 'Aleutian Arc (Alaska Gulf)', oceanBasin: 'North Pacific', riskScore: 46, severity: 'ADVISORY', activeBuoys: 4, vesselsAtRisk: 1, maxWaveHeightM: 1.0, coordinates: '52.1° N, 172.4° W' },
  { id: 'zone-07', regionName: 'Kermadec-Tonga Trench', oceanBasin: 'South Pacific', riskScore: 78, severity: 'WARNING', activeBuoys: 7, vesselsAtRisk: 4, maxWaveHeightM: 2.9, coordinates: '21.3° S, 175.2° W' },
  { id: 'zone-08', regionName: 'Puerto Rico Trench', oceanBasin: 'Atlantic / Caribbean', riskScore: 18, severity: 'NORMAL', activeBuoys: 2, vesselsAtRisk: 0, maxWaveHeightM: 0.3, coordinates: '19.8° N, 66.4° W' }
];

export const DISASTER_DRILL_QUESTIONS: DisasterDrillQuestion[] = [
  {
    id: 'q1',
    scenarioTitle: 'Nankai Megathrust Tsunami Emergency Drill',
    question: 'DART Buoy #21418 reports a 4.8m wave surge heading toward your anchored position in Sagami Bay. Your current depth is 42 meters. What is your immediate priority action?',
    options: [
      { label: 'Maintain position and drop a second anchor for stability.', isCorrect: false, explanation: 'DANGEROUS: In shallow water (<200m), tsunami wave amplification causes catastrophic groundings and mooring destruction.', penaltyScore: 30 },
      { label: 'Slip/cast off anchor lines immediately and steer to deep water (>250m depth) course 110° True.', isCorrect: true, explanation: 'CORRECT: In deep water (>200-250m), tsunami waves pass harmlessly beneath the hull with minimal height.', penaltyScore: 0 },
      { label: 'Request pilot boat clearance and wait at berth.', isCorrect: false, explanation: 'FAILED: Waiting for harbor pilot approval loses critical evacuation countdown time.', penaltyScore: 25 }
    ]
  },
  {
    id: 'q2',
    scenarioTitle: 'Navigation ECDIS Configuration Under Tsunami Risk',
    question: 'When executing a deep-water evacuation maneuver away from a continental shelf edge, how should the ECDIS safety contour be reconfigured?',
    options: [
      { label: 'Set Safety Contour to 10m to maximize coastal margin.', isCorrect: false, explanation: 'INCORRECT: A 10m contour keeps the vessel in high-surge, high-turbulence shallow shelf waters.', penaltyScore: 20 },
      { label: 'Set Safety Contour Alarm to 250m deep water line and engage automatic track pilot.', isCorrect: true, explanation: 'CORRECT: Setting 250m ensures ECDIS alarms if the vessel strays back into shallow continental shelf hazard zones.', penaltyScore: 0 },
      { label: 'Disable ECDIS depth alarms to avoid bridge noise.', isCorrect: false, explanation: 'CRITICAL FAILURE: Disabling depth alarms endangers the vessel during emergency night maneuvers.', penaltyScore: 35 }
    ]
  },
  {
    id: 'q3',
    scenarioTitle: 'Emergency Satellite & VHF Communication Protocol',
    question: 'After executing deep water speed maneuvers, what emergency broadcast message should be transmitted over maritime radio?',
    options: [
      { label: 'Transmit SECURITE message on VHF Channel 16 & satellite DSC alerting nearby ships of emergency evacuation trajectory.', isCorrect: true, explanation: 'CORRECT: Securite alerts nearby traffic of your vessel high-speed emergency course across narrow harbor channels.', penaltyScore: 0 },
      { label: 'Keep complete radio silence to preserve satellite bandwidth.', isCorrect: false, explanation: 'INCORRECT: Silence risks collision with incoming vessels or port tugs navigating blindly.', penaltyScore: 20 },
      { label: 'Send an informal email to port management only.', isCorrect: false, explanation: 'INCORRECT: Email is non-urgent and does not alert nearby traffic in real time.', penaltyScore: 25 }
    ]
  }
];

export const SEED_OFFLINE_ALERT_LOGS: OfflineAlertLogEntry[] = [
  {
    id: 'log-01',
    timestamp: '2026-08-04 12:14:02 UTC',
    category: 'CRITICAL',
    source: 'USGS SEISMIC TELEMETRY',
    message: 'M7.6 Megathrust Earthquake detected off East Coast of Honshu (37.8° N, 142.1° E). Focal Depth: 12km. MMI Grade IX (Violent).',
    acknowledged: true
  },
  {
    id: 'log-02',
    timestamp: '2026-08-04 12:15:30 UTC',
    category: 'WARNING',
    source: 'NOAA PTWC SATELLITE',
    message: 'Tsunami Warning issued for Pacific Basin. Estimated peak wave height 4.8m near Nankai Trough & Honshu coastline.',
    acknowledged: true
  },
  {
    id: 'log-03',
    timestamp: '2026-08-04 12:16:10 UTC',
    category: 'TELEMETRY',
    source: 'DART BUOY #21418',
    message: 'Water column pressure displacement trigger. Peak surge amplitude +4.82m. Transmission via Iridium SBD payload.',
    acknowledged: true
  },
  {
    id: 'log-04',
    timestamp: '2026-08-04 12:18:00 UTC',
    category: 'EVACUATION',
    source: 'BRIDGE NAVIGATION SYSTEM',
    message: 'M/V Cargo Leviathan initiated emergency deep water evacuation maneuver on course 110° True at 18.5 kts. Target contour depth: >250m.',
    acknowledged: true
  },
  {
    id: 'log-05',
    timestamp: '2026-08-04 11:42:00 UTC',
    category: 'WARNING',
    source: 'USGS SEISMIC TELEMETRY',
    message: 'M7.2 Sumatran Megathrust Earthquake west of Sumatra, Indonesia (2.1° S, 98.4° E). Depth 15km. Tsunami Advisory active for Andaman Sea.',
    acknowledged: true
  }
];

export const MMI_INTENSITY_SCALE_INFO = [
  { grade: 'I - III', perceived: 'Weak / Light', pgaG: '< 1.4% g', pgvCmS: '< 1.0 cm/s', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300', damage: 'Felt by few people; no structural or vessel damage.' },
  { grade: 'IV - V', perceived: 'Moderate', pgaG: '1.4% - 4.0% g', pgvCmS: '1.0 - 4.6 cm/s', color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300', damage: 'Dishes rattle. Moored vessels experience mild quay rolling.' },
  { grade: 'VI - VII', perceived: 'Strong / Very Strong', pgaG: '4.0% - 18% g', pgvCmS: '4.6 - 18 cm/s', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300', damage: 'Furniture moves. Port crane moorings undergo high strain.' },
  { grade: 'VIII - IX', perceived: 'Severe / Violent', pgaG: '18% - 65% g', pgvCmS: '18 - 60 cm/s', color: 'border-orange-500/40 bg-orange-500/10 text-orange-300', damage: 'Ruinous damage to harbor docks. Quayside liquefaction.' },
  { grade: 'X - XII', perceived: 'Extreme / Cataclysmic', pgaG: '> 65% g', pgvCmS: '> 60 cm/s', color: 'border-red-500/60 bg-red-500/20 text-red-300 animate-pulse', damage: 'Total destruction of port infrastructure. Major tsunami wave propagation.' }
];

export const GLOBAL_CLIMATE_HISTORY_DATA = [
  { year: '1980', sstAnomaly: 0.12, co2Ppm: 338, seaLevelMm: 0, cyclonesCount: 12, milestone: '1980 Baseline Telemetry' },
  { year: '1985', sstAnomaly: 0.18, co2Ppm: 346, seaLevelMm: 11, cyclonesCount: 14, milestone: 'Early NOAA DART Array' },
  { year: '1990', sstAnomaly: 0.29, co2Ppm: 354, seaLevelMm: 24, cyclonesCount: 15, milestone: 'IPCC First Assessment Report' },
  { year: '1995', sstAnomaly: 0.35, co2Ppm: 361, seaLevelMm: 36, cyclonesCount: 17, milestone: 'Kyoto Protocol Signed' },
  { year: '1998', sstAnomaly: 0.52, co2Ppm: 367, seaLevelMm: 42, cyclonesCount: 22, milestone: '1997-98 Super El Niño Spike' },
  { year: '2000', sstAnomaly: 0.38, co2Ppm: 369, seaLevelMm: 48, cyclonesCount: 18, milestone: 'Satellite Altimetry Era (TOPEX/Poseidon)' },
  { year: '2005', sstAnomaly: 0.58, co2Ppm: 379, seaLevelMm: 60, cyclonesCount: 24, milestone: 'Record Hurricane Katrina / Wilma' },
  { year: '2010', sstAnomaly: 0.62, co2Ppm: 389, seaLevelMm: 72, cyclonesCount: 20, milestone: 'Jason-2 Satellite Calibration' },
  { year: '2015', sstAnomaly: 0.81, co2Ppm: 401, seaLevelMm: 86, cyclonesCount: 25, milestone: 'Paris Agreement Sign-off' },
  { year: '2020', sstAnomaly: 0.89, co2Ppm: 414, seaLevelMm: 98, cyclonesCount: 26, milestone: 'Sentinel-6 Michael Freilich Launch' },
  { year: '2023', sstAnomaly: 1.15, co2Ppm: 421, seaLevelMm: 110, cyclonesCount: 28, milestone: 'Global SST All-Time Record High' },
  { year: '2026', sstAnomaly: 1.28, co2Ppm: 428, seaLevelMm: 122, cyclonesCount: 31, milestone: 'Present Sovereign AI Telemetry' },
  { year: '2030', sstAnomaly: 1.48, co2Ppm: 438, seaLevelMm: 142, cyclonesCount: 34, milestone: '2030 Sovereign Risk Threshold' },
  { year: '2040', sstAnomaly: 1.82, co2Ppm: 462, seaLevelMm: 188, cyclonesCount: 39, milestone: '2040 Mid-Century Climate Target' },
  { year: '2050', sstAnomaly: 2.15, co2Ppm: 490, seaLevelMm: 245, cyclonesCount: 45, milestone: '2050 Net Zero Horizon' }
];

export const EVAC_CORRIDOR_DATA = {
  NANKAI_TOKYO: {
    name: 'Nankai Trough / Tokyo Bay Emergency Deepwater Exit',
    origin: 'Port of Yokohama Outer Anchorage (35.4° N, 139.6° E)',
    destination: 'Japan Trench Deep Basin (> 2,500m Depth contour)',
    distanceNM: 42.5,
    safeHeading: '110° True (Orthogonal to Shelf)',
    recommendedMinSpeed: 18.0,
    surgeThreatHeight: '4.8 Meters',
    waypoints: [
      { step: 1, name: 'Yokohama Fairway Buoy #1', lat: '35.38° N', lon: '139.68° E', depthM: 28, estMargin: 'CRITICAL' },
      { step: 2, name: 'Tokyo Wan Channel Separation Point', lat: '35.22° N', lon: '139.75° E', depthM: 65, estMargin: 'MODERATE' },
      { step: 3, name: 'Sagami Bay Continental Slope', lat: '35.02° N', lon: '139.88° E', depthM: 450, estMargin: 'SAFE' },
      { step: 4, name: 'Nankai Abyss Deep Contour Line', lat: '34.78° N', lon: '140.12° E', depthM: 2600, estMargin: 'OPTIMAL_DEEP' }
    ]
  },
  SUNDA_JAKARTA: {
    name: 'Sunda Strait / Jakarta Bay Emergency Channel',
    origin: 'Tanjung Priok Container Terminal (6.1° S, 106.8° E)',
    destination: 'Sunda Deep Trench Basin (> 1,800m Depth contour)',
    distanceNM: 38.2,
    safeHeading: '245° True (South-West Escape)',
    recommendedMinSpeed: 16.5,
    surgeThreatHeight: '6.2 Meters',
    waypoints: [
      { step: 1, name: 'Tanjung Priok Breakwater Gate', lat: '6.08° S', lon: '106.88° E', depthM: 14, estMargin: 'CRITICAL' },
      { step: 2, name: 'Thousand Islands Deep Passage', lat: '5.92° S', lon: '106.62° E', depthM: 42, estMargin: 'WARNING' },
      { step: 3, name: 'Krakatoa Outer Volcanic Ring Pass', lat: '5.85° S', lon: '105.78° E', depthM: 320, estMargin: 'SAFE' },
      { step: 4, name: 'Indian Ocean Megathrust Deep Trench', lat: '5.70° S', lon: '105.20° E', depthM: 1950, estMargin: 'OPTIMAL_DEEP' }
    ]
  },
  CASCADIA_SEATTLE: {
    name: 'Cascadia Subduction Corridor / Puget Sound Exit',
    origin: 'Port of Seattle Elliott Bay Berth (47.6° N, 122.3° W)',
    destination: 'Pacific Juan de Fuca Deep Trench (> 3,000m Depth)',
    distanceNM: 68.0,
    safeHeading: '290° True (West Northwest)',
    recommendedMinSpeed: 20.0,
    surgeThreatHeight: '3.5 Meters',
    waypoints: [
      { step: 1, name: 'Seattle Elliott Bay Buoy', lat: '47.62° N', lon: '122.38° W', depthM: 180, estMargin: 'WARNING' },
      { step: 2, name: 'Admiralty Inlet Narrows', lat: '48.15° N', lon: '122.68° W', depthM: 95, estMargin: 'CRITICAL' },
      { step: 3, name: 'Strait of Juan de Fuca Channel', lat: '48.25° N', lon: '123.80° W', depthM: 240, estMargin: 'SAFE' },
      { step: 4, name: 'Cascadia Subduction Trench Edge', lat: '48.40° N', lon: '125.50° W', depthM: 3100, estMargin: 'OPTIMAL_DEEP' }
    ]
  },
  BENGAL_CHITTAGONG: {
    name: 'Bay of Bengal / Chittagong Outer Evacuation Pass',
    origin: 'Karnaphuli River Estuary (22.2° N, 91.8° E)',
    destination: 'Swatch of No Ground Deep Submarine Canyon (> 2,200m)',
    distanceNM: 48.0,
    safeHeading: '195° True (Southward Deep Run)',
    recommendedMinSpeed: 17.5,
    surgeThreatHeight: '6.4 Meters',
    waypoints: [
      { step: 1, name: 'Chittagong Outer Bar Buoy', lat: '22.18° N', lon: '91.75° E', depthM: 12, estMargin: 'CRITICAL' },
      { step: 2, name: 'Kutubdia Channel Outer Reach', lat: '21.80° N', lon: '91.60° E', depthM: 35, estMargin: 'WARNING' },
      { step: 3, name: 'Ganges Cone Shelf Margin', lat: '21.10° N', lon: '91.20° E', depthM: 380, estMargin: 'SAFE' },
      { step: 4, name: 'Swatch of No Ground Canyon Head', lat: '20.40° N', lon: '90.50° E', depthM: 2250, estMargin: 'OPTIMAL_DEEP' }
    ]
  }
};


export const GlobalTsunamiEarthquakeWarningView: React.FC = () => {
  const [earthquakes, setEarthquakes] = useState<EarthquakeEvent[]>(WORLDWIDE_EARTHQUAKES);
  const [tsunamiZones, setTsunamiZones] = useState<TsunamiWarningZone[]>(WORLDWIDE_TSUNAMI_ZONES);
  const [selectedOceanFilter, setSelectedOceanFilter] = useState<string>('ALL');
  const [autoPollingActive, setAutoPollingActive] = useState<boolean>(true);
  const [audioAlarmMuted, setAudioAlarmMuted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventDetails, setSelectedEventDetails] = useState<EarthquakeEvent | null>(WORLDWIDE_EARTHQUAKES[0]);

  // Alert Intensity Toggle State
  const [alertIntensityMode, setAlertIntensityMode] = useState<AlertIntensityMode>('ALL');
  const [minMagnitudeFilter, setMinMagnitudeFilter] = useState<number>(5.0);
  const [minWaveHeightFilter, setMinWaveHeightFilter] = useState<number>(0.0);

  // Smart Evacuation Map State
  const [mapLayer, setMapLayer] = useState<'BATHYMETRY' | 'WAVE_VECTORS' | 'SAFE_ANCHORAGE'>('BATHYMETRY');
  const [activeEvacuationZone, setActiveEvacuationZone] = useState<TsunamiWarningZone>(WORLDWIDE_TSUNAMI_ZONES[0]);
  const [evacuationUnderway, setEvacuationUnderway] = useState<boolean>(false);
  const [evacuationSteps, setEvacuationSteps] = useState<EvacuationCheckstep[]>([
    { id: 'step-1', text: 'Slip anchor / cast off port berth lines immediately.', completed: true, category: 'SAFETY' },
    { id: 'step-2', text: 'Engage main engines to maximum emergency sea speed (18.5 kts).', completed: true, category: 'ENGINE' },
    { id: 'step-3', text: 'Steer course 110° True orthogonal to continental shelf edge.', completed: false, category: 'NAVIGATION' },
    { id: 'step-4', text: 'Set ECDIS safety contour depth alarm to 250m deep water line.', completed: false, category: 'NAVIGATION' },
    { id: 'step-5', text: 'Broadcast Securite emergency alert on VHF Channel 16 to nearby traffic.', completed: false, category: 'COMMUNICATION' }
  ]);

  // Historical Impact Chart State
  const [chartMetric, setChartMetric] = useState<'waveHeight' | 'magnitude' | 'casualties'>('waveHeight');

  // Offline Crisis Cache Manager State
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [offlineCacheTimestamp, setOfflineCacheTimestamp] = useState<string>('2026-08-04 12:15 UTC');
  const [pgaPeakG, setPgaPeakG] = useState<number>(48.5);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<boolean>(false);

  // MMI Intensity Scale Selection
  const [selectedMmiIndex, setSelectedMmiIndex] = useState<number>(3);

  // UNIFIED DISASTER COMMAND CENTER STATE
  const [commandCenterLayers, setCommandCenterLayers] = useState({
    tsunami: true,
    earthquake: true,
    weather: true,
    inundation: true,
    portRisk: true
  });
  const [selectedCommandZone, setSelectedCommandZone] = useState<'NW_PACIFIC_NANKAI' | 'INDIAN_OCEAN_SUNDA' | 'PACIFIC_NW_CASCADIA' | 'SOUTH_PACIFIC_ATACAMA' | 'MEDITERRANEAN_HELLENIC'>('NW_PACIFIC_NANKAI');

  // MARITIME WEATHER API WORLDWIDE STATE
  const [selectedWeatherWaypoint, setSelectedWeatherWaypoint] = useState<'MALACCA' | 'SUEZ' | 'PANAMA' | 'ROTTERDAM' | 'YOKOHAMA' | 'ENGLISH_CHANNEL'>('MALACCA');

  // SEA LEVEL RISE MONITOR WORLDWIDE STATE
  const [seaLevelYearProjection, setSeaLevelYearProjection] = useState<number>(2040);

  // DISASTER RECOVERY GUIDE STATE
  const [activeRecoveryStep, setActiveRecoveryStep] = useState<'PORT_REOPENING' | 'HULL_INSPECTION' | 'SATCOM_RECOVERY' | 'HAZMAT_CONTAINMENT'>('PORT_REOPENING');

  // COASTAL HEATMAP STATE
  const [coastalHeatmapMetric, setCoastalHeatmapMetric] = useState<'EROSION_RATE' | 'STORM_SURGE_HEIGHT' | 'WAVE_ENERGY' | 'POPULATION_EXPOSURE'>('STORM_SURGE_HEIGHT');

  // GLOBAL CLIMATE HISTORY TRENDS STATE
  const [climateHistoryMetric, setClimateHistoryMetric] = useState<'SST_ANOMALY' | 'CO2_CONCENTRATION' | 'SEA_LEVEL_RISE' | 'MAJOR_CYCLONES'>('SST_ANOMALY');
  const [climateHistoryHorizon, setClimateHistoryHorizon] = useState<'1980_2026' | '2000_2026' | 'PROJECTION_2050'>('1980_2026');
  const [selectedMilestoneYear, setSelectedMilestoneYear] = useState<number | null>(2023);

  // GLOBAL EVACUATION PATH FINDER STATE
  const [evacPathCorridor, setEvacPathCorridor] = useState<'NANKAI_TOKYO' | 'SUNDA_JAKARTA' | 'CASCADIA_SEATTLE' | 'BENGAL_CHITTAGONG'>('NANKAI_TOKYO');
  const [evacVesselSpeedKts, setEvacVesselSpeedKts] = useState<number>(20);
  const [evacSeaState, setEvacSeaState] = useState<'NORMAL' | 'SEVERE_SURGE' | 'MEGATHRUST_TSUNAMI'>('MEGATHRUST_TSUNAMI');
  const [isExecutingEvacRoute, setIsExecutingEvacRoute] = useState<boolean>(false);
  const [evacProgressPercent, setEvacProgressPercent] = useState<number>(0);
  const [evacSecuriteBroadcastSent, setEvacSecuriteBroadcastSent] = useState<boolean>(false);

  // GLOBAL ANIMATED CLIMATE HEATMAP STATE
  const [heatmapLayer, setHeatmapLayer] = useState<'SST_THERMAL' | 'WIND_VECTORS' | 'FLOOD_RISK' | 'CORAL_STRESS'>('SST_THERMAL');
  const [isHeatmapPlaying, setIsHeatmapPlaying] = useState<boolean>(true);
  const [heatmapAnimFrame, setHeatmapAnimFrame] = useState<number>(3); // 1-12 frame months
  const [heatmapAnimSpeed, setHeatmapAnimSpeed] = useState<number>(1.0); // 0.5x, 1x, 2x
  const [selectedHotspotPin, setSelectedHotspotPin] = useState<string | null>('HOTSPOT-PACIFIC-EQUATOR');

  // GLOBAL QUICK SAVE CLIMATE STATE
  const [savedClimateSnapshots, setSavedClimateSnapshots] = useState<Array<{
    id: string;
    title: string;
    notes: string;
    timestamp: string;
    severity: 'CRITICAL' | 'WARNING' | 'BASELINE';
    config: {
      waypoint: string;
      projectionYear: number;
      heatmapMetric: string;
      corridor: string;
    };
  }>>(() => {
    try {
      const saved = localStorage.getItem('global_quick_save_climate_snapshots_v1');
      return saved ? JSON.parse(saved) : [
        {
          id: 'SNAP-SOV-01',
          title: 'Nankai M8.9 Megathrust & 4.8m Wave Profile',
          notes: 'Emergency baseline for Honshu Coast deep water evacuation corridors.',
          timestamp: '2026-08-18 14:20 UTC',
          severity: 'CRITICAL',
          config: { waypoint: 'YOKOHAMA', projectionYear: 2040, heatmapMetric: 'STORM_SURGE_HEIGHT', corridor: 'NANKAI_TOKYO' }
        },
        {
          id: 'SNAP-SOV-02',
          title: '2040 Sea Level Rise & Vulnerable Port Matrix',
          notes: 'Thermal ocean expansion projection with Tuvalu & Venice MOSE analysis.',
          timestamp: '2026-08-18 11:05 UTC',
          severity: 'WARNING',
          config: { waypoint: 'ROTTERDAM', projectionYear: 2040, heatmapMetric: 'EROSION_RATE', corridor: 'SUNDA_JAKARTA' }
        }
      ];
    } catch {
      return [];
    }
  });
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [saveSnapshotTitle, setSaveSnapshotTitle] = useState<string>('');
  const [saveSnapshotNotes, setSaveSnapshotNotes] = useState<string>('');
  const [saveSnapshotSeverity, setSaveSnapshotSeverity] = useState<'CRITICAL' | 'WARNING' | 'BASELINE'>('CRITICAL');
  const [quickSaveToastMsg, setQuickSaveToastMsg] = useState<string | null>(null);

  // WORLDWIDE TSUNAMI LIVE FEED STATE
  const [tsunamiLiveFeedBasin, setTsunamiLiveFeedBasin] = useState<'PACIFIC' | 'INDIAN' | 'ATLANTIC' | 'MEDITERRANEAN'>('PACIFIC');

  // WORLDWIDE EARTHQUAKE IMPACT MAP STATE
  const [earthquakeImpactMapMode, setEarthquakeImpactMapMode] = useState<'MMI_SHAKING' | 'PGA_ACCELERATION' | 'POPULATION_RISK' | 'PORT_INFRASTRUCTURE'>('MMI_SHAKING');

  // AUTOMATED DISASTER ALERT WORLDWIDE STATE
  const [autoDisasterAlertRules, setAutoDisasterAlertRules] = useState([
    { id: 'ALERT-RULE-1', name: 'Worldwide M7.5+ Megathrust Auto Broadcast', channel: 'SATCOM_INMARSAT', target: 'ALL_EEZ_VESSELS', autoTriggeredCount: 14, status: 'ACTIVE' },
    { id: 'ALERT-RULE-2', name: 'NOAA DART Wave Height > 3.0m Siren Trigger', channel: 'DSC_CHANNEL_70', target: 'COASTAL_PORT_AUTHORITIES', autoTriggeredCount: 8, status: 'ACTIVE' },
    { id: 'ALERT-RULE-3', name: 'PGA Acceleration > 30%g Port Lockout', channel: 'PORT_RADIO_VHF', target: 'TERMINAL_OPERATORS', autoTriggeredCount: 22, status: 'ACTIVE' },
    { id: 'ALERT-RULE-4', name: 'Evacuation Corridor Safety Contour Deviation', channel: 'WEBHOOK_REST_API', target: 'FLEET_COMMAND_DESK', autoTriggeredCount: 5, status: 'ACTIVE' }
  ]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<'NANKAI_M89' | 'SUMATRA_M91' | 'CASCADIA_M84' | 'CHILE_M78'>('NANKAI_M89');
  const [isStreamingScenario, setIsStreamingScenario] = useState<boolean>(true);
  const [streamProgress, setStreamProgress] = useState<number>(35);
  const [scenarioBroadcastSent, setScenarioBroadcastSent] = useState<boolean>(false);

  // 1. PREDICTIVE SURGE MODEL STATE
  const [simMagnitude, setSimMagnitude] = useState<number>(7.6);
  const [simDepthKm, setSimDepthKm] = useState<number>(15);
  const [simDistanceNM, setSimDistanceNM] = useState<number>(35);
  const [simShelfType, setSimShelfType] = useState<'STEEP' | 'GRADUAL' | 'CORAL_SHELF'>('GRADUAL');
  const [simSubductionZone, setSimSubductionZone] = useState<string>('Nankai Trough Megathrust');
  const [simOceanBasin, setSimOceanBasin] = useState<string>('NW Pacific Ocean');

  // 2. INTERACTIVE DISASTER DRILL STATE
  const [activeDrillIndex, setActiveDrillIndex] = useState<number>(0);
  const [drillScore, setDrillScore] = useState<number>(100);
  const [selectedDrillOption, setSelectedDrillOption] = useState<number | null>(null);
  const [drillAnswerSubmitted, setDrillAnswerSubmitted] = useState<boolean>(false);
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);
  const [drillTimeLeft, setDrillTimeLeft] = useState<number>(45);
  const [drillAnswers, setDrillAnswers] = useState<Record<number, number>>({});

  // 3. REGIONAL HEAT MAP STATE
  const [heatMapZones] = useState<RegionalHeatMapZone[]>(REGIONAL_HEAT_MAP_ZONES);
  const [selectedHeatMapRegion, setSelectedHeatMapRegion] = useState<string | null>(null);

  // 4. OFFLINE ALERT LOGS STATE
  const [alertLogs, setAlertLogs] = useState<OfflineAlertLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('tsunami_offline_alert_logs_v2');
      return saved ? JSON.parse(saved) : SEED_OFFLINE_ALERT_LOGS;
    } catch {
      return SEED_OFFLINE_ALERT_LOGS;
    }
  });
  const [logSearchQuery, setLogSearchQuery] = useState<string>('');
  const [logCategoryFilter, setLogCategoryFilter] = useState<string>('ALL');
  const [newLogMessage, setNewLogMessage] = useState<string>('');
  const [newLogCategory, setNewLogCategory] = useState<OfflineAlertLogEntry['category']>('WARNING');

  // 5. DRILL SCHEDULING STATE
  const [scheduledDrills, setScheduledDrills] = useState<ScheduledDrill[]>(() => {
    try {
      const saved = localStorage.getItem('tsunami_scheduled_drills_v1');
      return saved ? JSON.parse(saved) : SEED_SCHEDULED_DRILLS;
    } catch {
      return SEED_SCHEDULED_DRILLS;
    }
  });

  const [scheduleFilterStatus, setScheduleFilterStatus] = useState<string>('ALL');
  const [scheduleSearchQuery, setScheduleSearchQuery] = useState<string>('');
  
  // New Schedule Form State
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [newDrillTitle, setNewDrillTitle] = useState<string>('');
  const [newDrillScenario, setNewDrillScenario] = useState<ScheduledDrill['scenarioType']>('MEGATHRUST_TSUNAMI');
  const [newDrillOcean, setNewDrillOcean] = useState<string>('NW Pacific Basin (Honshu Sector)');
  const [newDrillTargetCrew, setNewDrillTargetCrew] = useState<string>('Bridge Alpha Crew');
  const [newDrillTime, setNewDrillTime] = useState<string>('2026-08-05 14:00 UTC');
  const [newDrillFrequency, setNewDrillFrequency] = useState<ScheduledDrill['frequency']>('WEEKLY');
  const [newDrillDifficulty, setNewDrillDifficulty] = useState<ScheduledDrill['difficulty']>('STANDARD');
  const [newDrillReminderLead, setNewDrillReminderLead] = useState<number>(15);
  const [newDrillNotes, setNewDrillNotes] = useState<string>('');

  // 6. AUTOMATED DRILL REMINDER STATE
  const [autoRemindersEnabled, setAutoRemindersEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tsunami_auto_reminders_enabled_v1');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [globalReminderLeadMins, setGlobalReminderLeadMins] = useState<number>(15);
  const [activeReminderAlert, setActiveReminderAlert] = useState<AutomatedReminderAlert | null>({
    id: 'REM-ALERT-01',
    drillId: 'DRILL-SCH-01',
    drillTitle: 'Nankai Trough Megathrust Evacuation Simulation',
    scheduledTime: '2026-08-05 08:00 UTC',
    timeRemainingText: 'Starts in 12 Minutes (14:00 UTC)',
    triggerTime: '2026-08-05 07:45 UTC',
    dismissed: false,
    urgency: 'HIGH'
  });

  // 7. DRILL PERFORMANCE ANALYSIS STATE
  const [drillPerformanceHistory, setDrillPerformanceHistory] = useState<DrillPerformanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('tsunami_drill_performance_history_v1');
      return saved ? JSON.parse(saved) : SEED_DRILL_PERFORMANCE_HISTORY;
    } catch {
      return SEED_DRILL_PERFORMANCE_HISTORY;
    }
  });

  const [performanceCrewFilter, setPerformanceCrewFilter] = useState<string>('ALL');
  const [performanceMetricFilter, setPerformanceMetricFilter] = useState<'score' | 'time'>('score');
  const [reportExportSuccess, setReportExportSuccess] = useState<boolean>(false);

  // 8. DRILL CALENDAR SYNC STATE
  const [calendarSyncNotification, setCalendarSyncNotification] = useState<string | null>(null);

  // 9. DRILL VIDEO EXPORT STATE
  const [isExportingVideo, setIsExportingVideo] = useState<boolean>(false);
  const [videoExportProgress, setVideoExportProgress] = useState<number>(0);
  const [videoQuality, setVideoQuality] = useState<'1080P_60FPS' | '720P_30FPS'>('1080P_60FPS');
  const [videoPlaybackPlaying, setVideoPlaybackPlaying] = useState<boolean>(true);
  const [videoFrameTimeline, setVideoFrameTimeline] = useState<number>(45);
  const [videoExportSuccess, setVideoExportSuccess] = useState<string | null>(null);

  // 10. DRILL LEADERBOARD STATE
  const [drillLeaderboard, setDrillLeaderboard] = useState<DrillLeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem('tsunami_drill_leaderboard_v1');
      return saved ? JSON.parse(saved) : SEED_DRILL_LEADERBOARD;
    } catch {
      return SEED_DRILL_LEADERBOARD;
    }
  });
  const [leaderboardSearchQuery, setLeaderboardSearchQuery] = useState<string>('');
  const [leaderboardOceanFilter, setLeaderboardOceanFilter] = useState<string>('ALL');

  // 11. DRILL VOICE LOGS STATE
  const [voiceLogs, setVoiceLogs] = useState<DrillVoiceLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('tsunami_drill_voice_logs_v1');
      return saved ? JSON.parse(saved) : SEED_DRILL_VOICE_LOGS;
    } catch {
      return SEED_DRILL_VOICE_LOGS;
    }
  });
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [activeVoicePlayingId, setActiveVoicePlayingId] = useState<string | null>('VOICE-01');
  const [newVoiceSpeaker, setNewVoiceSpeaker] = useState<string>('Capt. Jonathan Miller (Bridge)');
  const [newVoiceChannel, setNewVoiceChannel] = useState<string>('VHF CH 16 / BRIDGE CVR');
  const [newVoiceTranscript, setNewVoiceTranscript] = useState<string>('');
  const [voiceLogSearch, setVoiceLogSearch] = useState<string>('');

  // 12. CRISIS MAP LAYERS STATE
  const [mapLayers, setMapLayers] = useState<CrisisMapLayersState>({
    faultLines: true,
    tsunamiVectors: true,
    dartBuoys: true,
    coastalSirens: true,
    safeCorridors: true,
    seismicHeatmap: true
  });

  // 13. DRILL HOTSPOTS STATE
  const [drillHotspots, setDrillHotspots] = useState<DrillHotspot[]>(SEED_DRILL_HOTSPOTS);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>('HOTSPOT-01');

  // 14. AUTO ARCHIVES STATE
  const [isAutoArchiveEnabled, setIsAutoArchiveEnabled] = useState<boolean>(true);
  const [autoArchiveDays, setAutoArchiveDays] = useState<number>(14);
  const [archivedBundles, setArchivedBundles] = useState<ArchivedItemBundle[]>([
    {
      id: 'ARCH-2026-07-31',
      archiveDate: '2026-07-31 23:59 UTC',
      category: 'COMPLETED_DRILL',
      title: 'July 2026 Fleet-wide Nankai Drill Archives',
      itemCount: 14,
      compressedSizeBytes: 184200,
      originalDataJson: JSON.stringify({ count: 14, type: 'Completed Drills', month: 'July 2026' })
    },
    {
      id: 'ARCH-2026-07-15',
      archiveDate: '2026-07-15 12:00 UTC',
      category: 'VOICE_TRANSCRIPT',
      title: 'Bridge CVR Audio Logs Bundle #04',
      itemCount: 28,
      compressedSizeBytes: 342100,
      originalDataJson: JSON.stringify({ count: 28, type: 'Bridge CVR Voice' })
    }
  ]);
  const [archiveSuccessMsg, setArchiveSuccessMsg] = useState<string | null>(null);

  // 15. DRILL ANALYTICS FILTER STATE
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'30_DAYS' | '90_DAYS' | 'ALL_TIME' | '7D' | '30D' | '90D' | '1Y' | 'ALL'>('30_DAYS');

  // LocalStorage Auto-Cache Persistence
  useEffect(() => {
    try {
      const cacheObj = {
        earthquakes,
        tsunamiZones,
        alertLogs,
        scheduledDrills,
        drillPerformanceHistory,
        lastUpdated: new Date().toISOString(),
        version: 'USGS-NOAA-TSUNAMI-2026.2'
      };
      localStorage.setItem('tsunami_earthquake_crisis_cache_v2', JSON.stringify(cacheObj));
      localStorage.setItem('tsunami_offline_alert_logs_v2', JSON.stringify(alertLogs));
      localStorage.setItem('tsunami_scheduled_drills_v1', JSON.stringify(scheduledDrills));
      localStorage.setItem('tsunami_drill_performance_history_v1', JSON.stringify(drillPerformanceHistory));
      localStorage.setItem('tsunami_auto_reminders_enabled_v1', JSON.stringify(autoRemindersEnabled));
      localStorage.setItem('tsunami_drill_leaderboard_v1', JSON.stringify(drillLeaderboard));
      localStorage.setItem('tsunami_drill_voice_logs_v1', JSON.stringify(voiceLogs));
      setOfflineCacheTimestamp(new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC');
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }
  }, [earthquakes, tsunamiZones, alertLogs, scheduledDrills, drillPerformanceHistory, autoRemindersEnabled, drillLeaderboard, voiceLogs]);

  // Voice Recording Seconds Counter Effect
  useEffect(() => {
    let interval: any;
    if (isRecordingVoice) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingVoice]);

  // Animated Climate Heatmap Loop Timer Effect
  useEffect(() => {
    if (!isHeatmapPlaying) return;
    const intervalMs = Math.round(1200 / heatmapAnimSpeed);
    const timer = setInterval(() => {
      setHeatmapAnimFrame((prev) => (prev % 12) + 1);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isHeatmapPlaying, heatmapAnimSpeed]);

  // Evacuation Route Execution Progress Effect
  useEffect(() => {
    if (!isExecutingEvacRoute) return;
    const interval = setInterval(() => {
      setEvacProgressPercent((prev) => {
        if (prev >= 100) {
          setIsExecutingEvacRoute(false);
          return 100;
        }
        return prev + 10;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [isExecutingEvacRoute]);

  // Quick Save Climate Snapshots Persistence Effect
  useEffect(() => {
    try {
      localStorage.setItem('global_quick_save_climate_snapshots_v1', JSON.stringify(savedClimateSnapshots));
    } catch (err) {
      console.warn('Quick save persistence failed:', err);
    }
  }, [savedClimateSnapshots]);


  // Geographic Live Stream Wave Pulse Effect
  useEffect(() => {
    if (!isStreamingScenario) return;
    const interval = setInterval(() => {
      setStreamProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 300);
    return () => clearInterval(interval);
  }, [isStreamingScenario]);
  useEffect(() => {
    if (!autoPollingActive || isOfflineMode) return;
    const interval = setInterval(() => {
      setTsunamiZones((prev) =>
        prev.map((zone) => ({
          ...zone,
          etaCountdownMinutes: Math.max(0, zone.etaCountdownMinutes - 1)
        }))
      );
    }, 15000);
    return () => clearInterval(interval);
  }, [autoPollingActive, isOfflineMode]);

  // Disaster Drill Countdown Timer
  useEffect(() => {
    if (drillCompleted || drillTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setDrillTimeLeft((prev) => {
        if (prev <= 1) {
          setDrillCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [drillCompleted, drillTimeLeft]);

  // Predictive Surge Calculations
  const shelfMultiplier = simShelfType === 'GRADUAL' ? 2.4 : simShelfType === 'STEEP' ? 1.6 : 1.2;
  const rawWaveHeight = Math.max(0.2, (simMagnitude - 5.2) * 1.65 * Math.pow(25 / Math.max(5, simDepthKm), 0.35) * Math.pow(40 / Math.max(5, simDistanceNM), 0.3) * (shelfMultiplier / 2.0));
  const predictedCoastalSurgeM = parseFloat(rawWaveHeight.toFixed(2));
  const predictedEtaMinutes = Math.max(3, Math.round((simDistanceNM / 280) * 60));
  const predictedInundationDistanceM = Math.round(predictedCoastalSurgeM * 140);

  // Time Series for Wave Propagation Chart
  const wavePropagationSeries = Array.from({ length: 13 }, (_, i) => {
    const tMin = i * 10; // 0 to 120 minutes
    let amplitude = 0.1;
    if (tMin >= predictedEtaMinutes - 10 && tMin <= predictedEtaMinutes + 30) {
      const delta = (tMin - predictedEtaMinutes);
      amplitude = Math.max(0.1, predictedCoastalSurgeM * Math.exp(-Math.pow(delta / 12, 2)));
    }
    return {
      timeMin: `${tMin}m`,
      waveHeightM: parseFloat(amplitude.toFixed(2)),
      safetyContourM: 2.0
    };
  });

  const toggleCheckstep = (id: string) => {
    setEvacuationSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleStartEvacuation = () => {
    setEvacuationUnderway(true);
    setEvacuationSteps((prev) => prev.map((s) => ({ ...s, completed: true })));

    // Append to offline logs
    const newEntry: OfflineAlertLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      category: 'EVACUATION',
      source: 'MANUAL CAPTAIN OVERRIDE',
      message: 'BRIDGE DIRECTIVE: Emergency deep water evacuation maneuver executed on course 110° True.',
      acknowledged: true
    };
    setAlertLogs((prev) => [newEntry, ...prev]);
  };

  const handleSelectDrillOption = (optIdx: number) => {
    if (drillAnswerSubmitted) return;
    setSelectedDrillOption(optIdx);
    setDrillAnswerSubmitted(true);

    const q = DISASTER_DRILL_QUESTIONS[activeDrillIndex];
    const opt = q.options[optIdx];
    if (!opt.isCorrect) {
      setDrillScore((prev) => Math.max(0, prev - opt.penaltyScore));
    }
  };

  const recordDrillPerformance = (finalScore: number) => {
    const timeSpent = Math.max(12, 45 - drillTimeLeft);
    const newRecord: DrillPerformanceRecord = {
      id: `PERF-${Date.now()}`,
      drillTitle: 'Tsunami Emergency Bridge Officer Simulation',
      executedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      crewTeam: 'Bridge Duty Officer',
      score: finalScore,
      timeTakenSeconds: timeSpent,
      targetTimeSeconds: 45,
      navigationScore: Math.min(100, finalScore + 2),
      engineScore: Math.min(100, Math.max(60, finalScore - 5)),
      communicationScore: Math.min(100, Math.max(65, finalScore - 2)),
      safetyScore: Math.min(100, finalScore),
      commonErrors: finalScore < 90 ? ['Delayed Mayday Radio Relay', 'ECDIS Safety contour verify step late'] : [],
      status: finalScore >= 90 ? 'EXCELLENT' : finalScore >= 70 ? 'PASSED' : 'FAILED'
    };

    setDrillPerformanceHistory((prev) => [newRecord, ...prev]);

    setScheduledDrills((prev) =>
      prev.map((dr) =>
        dr.status === 'SCHEDULED' || dr.status === 'IN_PROGRESS'
          ? { ...dr, status: 'COMPLETED', lastExecutedScore: finalScore }
          : dr
      )
    );

    const logEntry: OfflineAlertLogEntry = {
      id: `log-drill-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      category: 'DRILL',
      source: 'BRIDGE DRILL SIMULATOR',
      message: `DISASTER DRILL COMPLETED: Score ${finalScore} PTS (${finalScore >= 90 ? 'GRADE S' : finalScore >= 70 ? 'GRADE A' : 'GRADE F'}). Time: ${timeSpent}s.`,
      acknowledged: true
    };
    setAlertLogs((prev) => [logEntry, ...prev]);
  };

  const handleNextDrillQuestion = () => {
    if (activeDrillIndex + 1 < DISASTER_DRILL_QUESTIONS.length) {
      setActiveDrillIndex((prev) => prev + 1);
      setSelectedDrillOption(null);
      setDrillAnswerSubmitted(false);
    } else {
      setDrillCompleted(true);
      recordDrillPerformance(drillScore);
    }
  };

  const resetDrill = () => {
    setActiveDrillIndex(0);
    setDrillScore(100);
    setSelectedDrillOption(null);
    setDrillAnswerSubmitted(false);
    setDrillCompleted(false);
    setDrillTimeLeft(45);
  };

  const handleLaunchScheduledDrill = (drill: ScheduledDrill) => {
    resetDrill();
    setDrillTimeLeft(60);

    setScheduledDrills((prev) =>
      prev.map((d) => (d.id === drill.id ? { ...d, status: 'IN_PROGRESS' } : d))
    );

    if (activeReminderAlert && activeReminderAlert.drillId === drill.id) {
      setActiveReminderAlert(null);
    }

    const el = document.getElementById('interactive-drill-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    const log: OfflineAlertLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      category: 'DRILL',
      source: 'DRILL SCHEDULER',
      message: `SCHEDULED DRILL LAUNCHED: '${drill.title}' for ${drill.targetCrew} in ${drill.oceanZone}.`,
      acknowledged: true
    };
    setAlertLogs((prev) => [log, ...prev]);
  };

  const handleCreateScheduledDrill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrillTitle.trim()) return;

    const newDrill: ScheduledDrill = {
      id: `DRILL-SCH-${Date.now()}`,
      title: newDrillTitle.trim(),
      scenarioType: newDrillScenario,
      oceanZone: newDrillOcean,
      targetCrew: newDrillTargetCrew,
      scheduledTime: newDrillTime,
      frequency: newDrillFrequency,
      difficulty: newDrillDifficulty,
      reminderMinutesBefore: newDrillReminderLead,
      reminderActive: true,
      status: 'SCHEDULED',
      notes: newDrillNotes.trim() || 'Standard bridge emergency readiness drill protocol.'
    };

    setScheduledDrills((prev) => [newDrill, ...prev]);
    setShowScheduleModal(false);
    setNewDrillTitle('');
    setNewDrillNotes('');

    const log: OfflineAlertLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      category: 'DRILL',
      source: 'DRILL SCHEDULER',
      message: `NEW DRILL SCHEDULED: '${newDrill.title}' (${newDrill.frequency}) set for ${newDrill.scheduledTime}.`,
      acknowledged: true
    };
    setAlertLogs((prev) => [log, ...prev]);
  };

  const handleToggleDrillReminder = (drillId: string) => {
    setScheduledDrills((prev) =>
      prev.map((d) => (d.id === drillId ? { ...d, reminderActive: !d.reminderActive } : d))
    );
  };

  const handleDeleteScheduledDrill = (drillId: string) => {
    setScheduledDrills((prev) => prev.filter((d) => d.id !== drillId));
  };

  // 1. Calendar ICS Export Function
  const exportDrillToICS = (drill: ScheduledDrill) => {
    const title = drill.title;
    const description = `TSUNAMI EMERGENCY DRILL\\nTarget Crew: ${drill.targetCrew}\\nZone: ${drill.oceanZone}\\nDifficulty: ${drill.difficulty}\\nNotes: ${drill.notes}`;
    const location = drill.oceanZone;
    
    const startTime = '20260805T080000Z';
    const endTime = '20260805T090000Z';

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Global Tsunami Crisis Center//Drill Scheduler//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:drill-${drill.id}@tsunamicenter.org`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:🚢 TSUNAMI DRILL: ${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:TSUNAMI DRILL SIREN REMINDER',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TSUNAMI_DRILL_${drill.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setCalendarSyncNotification(`ICS Calendar file downloaded for '${drill.title}'. Importable to Outlook / Apple / Google Calendar!`);
    setTimeout(() => setCalendarSyncNotification(null), 4000);
  };

  const exportAllDrillsToICS = () => {
    const events = scheduledDrills.map((drill) => [
      'BEGIN:VEVENT',
      `UID:drill-${drill.id}@tsunamicenter.org`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:20260805T080000Z`,
      `DTEND:20260805T090000Z`,
      `SUMMARY:🚢 TSUNAMI DRILL: ${drill.title}`,
      `DESCRIPTION:${drill.targetCrew} - ${drill.oceanZone} (${drill.difficulty})`,
      `LOCATION:${drill.oceanZone}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    ].join('\r\n')).join('\r\n');

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Global Tsunami Crisis Center//Drill Calendar Sync//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      events,
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FLEET_ALL_SCHEDULED_TSUNAMI_DRILLS_${new Date().toISOString().substring(0, 10)}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setCalendarSyncNotification(`Full Fleet Calendar (.ics) downloaded containing ${scheduledDrills.length} scheduled drills.`);
    setTimeout(() => setCalendarSyncNotification(null), 4000);
  };

  const generateGoogleCalendarLink = (drill: ScheduledDrill) => {
    const title = encodeURIComponent(`🚢 TSUNAMI DRILL: ${drill.title}`);
    const details = encodeURIComponent(`TSUNAMI EMERGENCY DRILL\nTarget Crew: ${drill.targetCrew}\nOcean Zone: ${drill.oceanZone}\nDifficulty: ${drill.difficulty}\nNotes: ${drill.notes}`);
    const location = encodeURIComponent(drill.oceanZone);
    const dates = '20260805T080000Z/20260805T090000Z';
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(googleCalUrl, '_blank');
  };

  // 2. Video Simulation Export
  const handleExportDrillVideo = () => {
    setIsExportingVideo(true);
    setVideoExportProgress(10);

    const timer = setInterval(() => {
      setVideoExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExportingVideo(false);
          
          const videoMetaContent = `# MARITIME BLACK-BOX DRILL RECORDING & TELEMETRY STREAM
EVENT: TSUNAMI EMERGENCY BRIDGE EVACUATION DRILL
DATE: ${new Date().toISOString()}
QUALITY: ${videoQuality}
HEADING: 110° TRUE | SPEED: 18.5 KTS
ECDIS SAFETY CONTOUR: 250M DEEP WATER
STATUS: VERIFIED BLACK-BOX LOG ENCRYPTED
`;
          const blob = new Blob([videoMetaContent], { type: 'video/webm' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `TSUNAMI_DRILL_SIMULATION_RECORDING_${new Date().toISOString().substring(0, 10)}.webm`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);

          setVideoExportSuccess(`Drill simulation black-box video exported successfully (${videoQuality})!`);
          setTimeout(() => setVideoExportSuccess(null), 5000);
          return 0;
        }
        return prev + 18;
      });
    }, 400);
  };

  // 3. Drill Voice Log Handlers
  const handleToggleVoiceRecording = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setRecordingSeconds(0);
    } else {
      setIsRecordingVoice(false);
      const newEntry: DrillVoiceLogEntry = {
        id: `VOICE-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        speaker: newVoiceSpeaker || 'Bridge Watch Officer',
        channel: newVoiceChannel || 'VHF CH 16 / BRIDGE CVR',
        transcript: newVoiceTranscript || `Bridge audio transmission recorded during live drill (${recordingSeconds || 12}s duration). All station VHF radio relay confirmed.`,
        durationSeconds: Math.max(5, recordingSeconds),
        sentiment: 'URGENT_COMMAND',
        drillTitle: 'Live Bridge Emergency Drill Voice Record',
        audioSimulated: true
      };
      setVoiceLogs((prev) => [newEntry, ...prev]);
      setNewVoiceTranscript('');
      setActiveVoicePlayingId(newEntry.id);
    }
  };

  const handleAddVoiceLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoiceTranscript.trim()) return;

    const newEntry: DrillVoiceLogEntry = {
      id: `VOICE-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      speaker: newVoiceSpeaker.trim() || 'Bridge Watch Officer',
      channel: newVoiceChannel,
      transcript: newVoiceTranscript.trim(),
      durationSeconds: 15,
      sentiment: 'CLEAR_CONFIRMATION',
      drillTitle: 'Bridge Officer Radio Log',
      audioSimulated: true
    };

    setVoiceLogs((prev) => [newEntry, ...prev]);
    setNewVoiceTranscript('');
    setActiveVoicePlayingId(newEntry.id);
  };

  const exportVoiceLogsTXT = () => {
    const textContent = voiceLogs.map((log) => `
==================================================
ID: ${log.id} | TIMESTAMP: ${log.timestamp}
SPEAKER: ${log.speaker}
CHANNEL: ${log.channel}
DRILL: ${log.drillTitle || 'General Bridge Log'}
SENTIMENT: ${log.sentiment} | DURATION: ${log.durationSeconds}s
--------------------------------------------------
TRANSCRIPT:
"${log.transcript}"
==================================================
`).join('\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BRIDGE_DRILL_VOICE_LOGS_TRANSCRIPT_${new Date().toISOString().substring(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // 4. Leaderboard Challenge Handler
  const handleChallengeCrew = (entry: DrillLeaderboardEntry) => {
    const log: OfflineAlertLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      category: 'DRILL',
      source: 'FLEET LEADERBOARD',
      message: `HEAD-TO-HEAD CREW CHALLENGE ISSUED to '${entry.crewTeam}' (${entry.vesselName}). Target response time: ${entry.averageTimeSeconds}s.`,
      acknowledged: true
    };
    setAlertLogs((prev) => [log, ...prev]);
    const el = document.getElementById('interactive-drill-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTestTriggerReminder = () => {
    const activeDrill = scheduledDrills[0] || SEED_SCHEDULED_DRILLS[0];
    setActiveReminderAlert({
      id: `REM-${Date.now()}`,
      drillId: activeDrill.id,
      drillTitle: activeDrill.title,
      scheduledTime: activeDrill.scheduledTime,
      timeRemainingText: 'DUE NOW - AUTOMATED SIREN ACTIVE',
      triggerTime: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      dismissed: false,
      urgency: 'HIGH'
    });
  };

  const exportPerformanceReportCSV = () => {
    const headers = ['ID', 'Drill Title', 'Executed At', 'Crew Team', 'Score (PTS)', 'Time Taken (s)', 'Target Time (s)', 'Navigation Score', 'Engine Score', 'Communication Score', 'Safety Score', 'Status', 'Common Errors'];
    const rows = drillPerformanceHistory.map((rec) => [
      rec.id,
      `"${rec.drillTitle}"`,
      rec.executedAt,
      `"${rec.crewTeam}"`,
      rec.score,
      rec.timeTakenSeconds,
      rec.targetTimeSeconds,
      rec.navigationScore,
      rec.engineScore,
      rec.communicationScore,
      rec.safetyScore,
      rec.status,
      `"${rec.commonErrors.join('; ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TSUNAMI_DRILL_PERFORMANCE_AUDIT_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setReportExportSuccess(true);
    setTimeout(() => setReportExportSuccess(false), 4000);
  };

  // Hotspot Drill Trigger Handler
  const handleTriggerHotspotDrill = (hotspot: DrillHotspot) => {
    setSimSubductionZone(hotspot.name);
    setSimOceanBasin(hotspot.oceanZone);
    setSimMagnitude(Math.min(9.5, Math.max(7.0, (hotspot.riskScore / 10))));
    setDrillTimeLeft(180);
    setDrillScore(0);
    setDrillAnswers({});
    setDrillCompleted(false);

    const log: OfflineAlertLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      category: 'DRILL',
      source: 'HOTSPOT CHALLENGE',
      message: `HOTSPOT EMERGENCY DRILL LAUNCHED for '${hotspot.name}' (${hotspot.oceanZone}). Risk Score: ${hotspot.riskScore}/100.`,
      acknowledged: true
    };
    setAlertLogs((prev) => [log, ...prev]);

    const el = document.getElementById('interactive-drill-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Crisis Map Layer Toggle Handler
  const handleToggleMapLayer = (layerKey: keyof CrisisMapLayersState) => {
    setMapLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Manual Auto-Archive Bundle Generator
  const handleManualCreateArchiveBundle = (category: 'COMPLETED_DRILL' | 'VOICE_TRANSCRIPT' | 'ALERT_LOG') => {
    const timestampStr = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
    let title = '';
    let itemsToBundle: any[] = [];

    if (category === 'COMPLETED_DRILL') {
      title = `Auto-Archived Completed Drills (${drillPerformanceHistory.length} records)`;
      itemsToBundle = drillPerformanceHistory;
    } else if (category === 'VOICE_TRANSCRIPT') {
      title = `Auto-Archived Bridge Voice CVR Logs (${voiceLogs.length} transcripts)`;
      itemsToBundle = voiceLogs;
    } else {
      title = `Auto-Archived SOLAS Emergency Alerts (${alertLogs.length} entries)`;
      itemsToBundle = alertLogs;
    }

    const jsonStr = JSON.stringify(itemsToBundle, null, 2);
    const bundle: ArchivedItemBundle = {
      id: `ARCH-${Date.now()}`,
      archiveDate: timestampStr,
      category,
      title,
      itemCount: itemsToBundle.length,
      compressedSizeBytes: Math.round(jsonStr.length * 0.42),
      originalDataJson: jsonStr
    };

    setArchivedBundles((prev) => [bundle, ...prev]);
    setArchiveSuccessMsg(`ARCHIVE BUNDLE GENERATED: ${title}`);
    setTimeout(() => setArchiveSuccessMsg(null), 4000);

    // Download archive JSON file
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OCEAN_BIRD_AUTO_ARCHIVE_${category}_${new Date().toISOString().substring(0, 10)}.bundle.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddManualAlertLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogMessage.trim()) return;

    const entry: OfflineAlertLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      category: newLogCategory,
      source: 'BRIDGE OFFICER ENTRY',
      message: newLogMessage.trim(),
      acknowledged: true
    };

    setAlertLogs((prev) => [entry, ...prev]);
    setNewLogMessage('');
  };

  const clearAlertLogs = () => {
    setAlertLogs([]);
  };

  const exportCrisisDatasetJSON = () => {
    try {
      const exportData = {
        exportTimestamp: new Date().toISOString(),
        service: 'USGS & NOAA Global Tsunami & Earthquake Early Warning Center',
        earthquakes,
        tsunamiZones,
        heatMapZones,
        alertLogs,
        historicalDataset: HISTORICAL_IMPACT_DATASET,
        pgaPeakG
      };
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData, null, 2))}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `CRISIS_OFFLINE_CACHE_${new Date().toISOString().substring(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setDownloadSuccessToast(true);
      setTimeout(() => setDownloadSuccessToast(false), 4000);
    } catch (err) {
      console.error('Failed to export crisis dataset:', err);
    }
  };

  const exportAlertLogsCSV = () => {
    try {
      const headers = ['ID', 'Timestamp', 'Category', 'Source', 'Message', 'Acknowledged'];
      const rows = alertLogs.map((l) => [
        l.id,
        `"${l.timestamp}"`,
        `"${l.category}"`,
        `"${l.source}"`,
        `"${l.message.replace(/"/g, '""')}"`,
        l.acknowledged ? 'TRUE' : 'FALSE'
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `OFFLINE_ALERT_LOGS_${new Date().toISOString().substring(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('CSV Export failed:', err);
    }
  };

  // Filtered Earthquakes based on Intensity Mode, Sliders & HeatMap selection
  const filteredEarthquakes = earthquakes.filter((eq) => {
    const matchesHeatmap = !selectedHeatMapRegion || eq.oceanZone.toLowerCase().includes(selectedHeatMapRegion.toLowerCase()) || eq.location.toLowerCase().includes(selectedHeatMapRegion.toLowerCase());
    const matchesOcean = selectedOceanFilter === 'ALL' || eq.oceanZone.toLowerCase().includes(selectedOceanFilter.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      eq.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.affectedPorts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesIntensity = true;
    if (alertIntensityMode === 'CRITICAL_M7') {
      matchesIntensity = eq.magnitude >= 7.0;
    } else if (alertIntensityMode === 'HIGH_TSUNAMI') {
      matchesIntensity = eq.tsunamiPotential === 'HIGH';
    } else if (alertIntensityMode === 'MODERATE') {
      matchesIntensity = eq.magnitude >= 5.0 && eq.magnitude < 7.0;
    }

    const matchesMagSlider = eq.magnitude >= minMagnitudeFilter;
    const matchesWaveSlider = eq.tsunamiWaveHeightM >= minWaveHeightFilter;

    return matchesHeatmap && matchesOcean && matchesSearch && matchesIntensity && matchesMagSlider && matchesWaveSlider;
  });

  // Filtered Offline Logs
  const filteredAlertLogs = alertLogs.filter((log) => {
    const matchesCategory = logCategoryFilter === 'ALL' || log.category === logCategoryFilter;
    const matchesSearch = logSearchQuery === '' ||
      log.message.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(logSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const criticalTsunamiCount = tsunamiZones.filter((z) => z.alertLevel === 'WARNING').length;

  return (
    <div className="space-y-6 font-sans text-slate-100">
      {/* 1. TOP HEADER & MAIN STATUS INDICATORS */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-red-400 animate-ping" />
              <span>USGS & NOAA WORLDWIDE 24/7 SEISMIC & TSUNAMI SERVICE</span>
            </div>
            <h2 className="text-xl font-black text-white flex items-center space-x-2">
              <Waves className="w-6 h-6 text-red-400" />
              <span>Global Tsunami & Earthquake Early Warning Center</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Real-time worldwide epicenter telemetry, smart bathymetric evacuation map vectors, global disaster crisis dashboard, alert intensity toggles, predictive surge hydrodynamics, interactive disaster drills, regional heat maps, and offline crisis alert logs.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Offline Cache Mode Button */}
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 transition-all ${
                isOfflineMode
                  ? 'bg-amber-500 text-slate-950 border border-amber-400 font-extrabold shadow-lg'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <HardDriveDownload className="w-3.5 h-3.5" />
              <span>OFFLINE CACHE: {isOfflineMode ? 'ACTIVE' : 'READY'}</span>
            </button>

            {/* Live Feed Toggle */}
            <button
              onClick={() => setAutoPollingActive(!autoPollingActive)}
              disabled={isOfflineMode}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 transition-all ${
                autoPollingActive && !isOfflineMode
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoPollingActive && !isOfflineMode ? 'animate-spin' : ''}`} />
              <span>USGS FEED: {isOfflineMode ? 'OFFLINE' : autoPollingActive ? 'ACTIVE' : 'PAUSED'}</span>
            </button>

            {/* Siren Audio Toggle */}
            <button
              onClick={() => setAudioAlarmMuted(!audioAlarmMuted)}
              className={`p-2 rounded-xl border transition-all ${
                audioAlarmMuted
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
              }`}
              title={audioAlarmMuted ? 'Unmute Warning Siren' : 'Mute Warning Siren'}
            >
              {audioAlarmMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-400" />}
            </button>
          </div>
        </div>

        {/* TOP STATUS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-red-500/30 font-mono text-xs">
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-red-500/30 flex items-center space-x-2.5">
            <Radio className="w-5 h-5 text-red-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">ACTIVE TSUNAMI WARNINGS</span>
              <strong className="text-sm font-extrabold text-red-400">{criticalTsunamiCount} OCEAN BASINS</strong>
            </div>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-amber-500/30 flex items-center space-x-2.5">
            <Activity className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">LATEST MAJOR SEISMIC</span>
              <strong className="text-sm font-extrabold text-amber-300">M7.6 Honshu Megathrust</strong>
            </div>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-cyan-500/30 flex items-center space-x-2.5">
            <Waves className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">MAX TSUNAMI WAVE HEIGHT</span>
              <strong className="text-sm font-extrabold text-cyan-300">4.8 METERS (Nankai)</strong>
            </div>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-emerald-500/30 flex items-center space-x-2.5">
            <Bot className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">SMART EVAC MAP VECTOR</span>
              <strong className="text-sm font-extrabold text-emerald-300">DEEP WATER 110° TRUE</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* UNIFIED DISASTER COMMAND CENTER */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-red-500/60 rounded-3xl p-6 space-y-6 font-mono shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">REAL-TIME MULTI-HAZARD INTELLIGENCE</span>
              <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                <span>UNIFIED MAP OVERLAY</span>
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Unified Disaster Command Center</h2>
            <p className="text-slate-400 text-xs font-sans mt-1 max-w-3xl">
              Simultaneously visualize and layer active tsunami wave surges, seismic earthquake shaking (MMI), super typhoon gale weather vectors, coastal inundation boundaries, and port infrastructure risk across all monitored maritime zones.
            </p>
          </div>

          {/* MONITORED ZONE SELECTOR */}
          <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0 overflow-x-auto">
            {[
              { id: 'NW_PACIFIC_NANKAI', label: '🇯🇵 Nankai Trough' },
              { id: 'INDIAN_OCEAN_SUNDA', label: '🇮🇩 Sunda Arc' },
              { id: 'PACIFIC_NW_CASCADIA', label: '🇺🇸 Cascadia' },
              { id: 'SOUTH_PACIFIC_ATACAMA', label: '🇨🇱 Atacama' },
              { id: 'MEDITERRANEAN_HELLENIC', label: '🇬🇷 Hellenic Arc' }
            ].map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedCommandZone(zone.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                  selectedCommandZone === zone.id
                    ? 'bg-red-500 text-white shadow-lg font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>
        </div>

        {/* DISASTER LAYER TOGGLES BAR */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-300 font-bold uppercase tracking-wider text-[11px] block">ACTIVE DISASTER OVERLAY LAYERS:</span>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'tsunami', label: '🌊 Tsunami Wave Surges', color: 'border-cyan-500 text-cyan-300 bg-cyan-500/10' },
              { key: 'earthquake', label: '🌋 Seismic MMI Shaking', color: 'border-red-500 text-red-300 bg-red-500/10' },
              { key: 'weather', label: '🌀 Typhoon & Weather Gales', color: 'border-sky-500 text-sky-300 bg-sky-500/10' },
              { key: 'inundation', label: '🏞️ Coastal Inundation', color: 'border-emerald-500 text-emerald-300 bg-emerald-500/10' },
              { key: 'portRisk', label: '⚓ Port Terminal Risk', color: 'border-amber-500 text-amber-300 bg-amber-500/10' }
            ].map((layer) => {
              const active = commandCenterLayers[layer.key as keyof typeof commandCenterLayers];
              return (
                <button
                  key={layer.key}
                  onClick={() =>
                    setCommandCenterLayers((prev) => ({
                      ...prev,
                      [layer.key]: !prev[layer.key as keyof typeof commandCenterLayers]
                    }))
                  }
                  className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition-all flex items-center space-x-1.5 ${
                    active
                      ? `${layer.color} shadow-md`
                      : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <span>{active ? '✓' : '○'}</span>
                  <span>{layer.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* UNIFIED COMMAND CENTER MAP CANVAS SIMULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* MAP DISPLAY CANVAS */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            {/* GRID & RADAR BACKDROP */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />

            {/* DYNAMIC DISASTER OVERLAY GRAPHICS */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* TSUNAMI SURGE LAYER */}
              {commandCenterLayers.tsunami && (
                <div className="absolute w-80 h-80 rounded-full border-2 border-dashed border-cyan-400/70 animate-ping" style={{ animationDuration: '4s' }} />
              )}

              {/* EARTHQUAKE MMI LAYER */}
              {commandCenterLayers.earthquake && (
                <div className="absolute w-64 h-64 rounded-full bg-red-500/20 border-2 border-red-500 animate-pulse" />
              )}

              {/* WEATHER TYPHOON LAYER */}
              {commandCenterLayers.weather && (
                <div className="absolute w-96 h-96 rounded-full border border-sky-400/40 border-t-2 border-t-sky-400 animate-spin" style={{ animationDuration: '10s' }} />
              )}

              {/* COASTAL INUNDATION LAYER */}
              {commandCenterLayers.inundation && (
                <div className="absolute w-52 h-52 rounded-xl border-2 border-emerald-400/60 bg-emerald-500/10 rotate-12" />
              )}

              {/* PORT RISK ICON */}
              {commandCenterLayers.portRisk && (
                <div className="absolute top-1/3 left-1/3 bg-amber-500 text-slate-950 px-2 py-1 rounded text-[10px] font-black uppercase shadow-lg">
                  ⚓ Port of Yokohama: LOCKOUT
                </div>
              )}
            </div>

            {/* TOP MAP HUD */}
            <div className="relative z-10 flex justify-between items-start text-xs font-mono">
              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">ACTIVE MONITORED ZONE</span>
                <strong className="text-red-400 text-sm font-black block">
                  {selectedCommandZone === 'NW_PACIFIC_NANKAI' && 'Nankai Trough Subduction Arc (Japan)'}
                  {selectedCommandZone === 'INDIAN_OCEAN_SUNDA' && 'Sunda Subduction Megathrust (Sumatra)'}
                  {selectedCommandZone === 'PACIFIC_NW_CASCADIA' && 'Cascadia Fault Zone (Pacific NW)'}
                  {selectedCommandZone === 'SOUTH_PACIFIC_ATACAMA' && 'Atacama Trench (Chile Coast)'}
                  {selectedCommandZone === 'MEDITERRANEAN_HELLENIC' && 'Hellenic Subduction Arc (Aegean Sea)'}
                </strong>
              </div>

              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-right space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">ACTIVE OVERLAY COUNT</span>
                <strong className="text-amber-400 text-sm font-black block">
                  {Object.values(commandCenterLayers).filter(Boolean).length} / 5 LAYERS ACTIVE
                </strong>
              </div>
            </div>

            {/* MAP BOTTOM LEGEND */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-2 pt-4 border-t border-slate-800 text-[10px]">
              <span className="text-slate-400">
                Lat/Long: <strong className="text-white">37.8° N, 142.1° E</strong> | Depth: <strong className="text-cyan-400">12km</strong> | PGA: <strong className="text-red-400">48.5%g</strong>
              </span>
              <span className="text-emerald-400 font-bold">🟢 SatCom Stream Synchronized</span>
            </div>
          </div>

          {/* COMBINED THREAT MATRIX SIDEBAR */}
          <div className="lg:col-span-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-slate-200 uppercase block border-b border-slate-800 pb-2">
              INTEGRATED THREAT MATRIX
            </span>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">🌊 Tsunami Peak Surge:</span>
                <strong className="text-cyan-400 font-mono text-sm">4.8m Vector</strong>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">🌋 Seismic Shaking:</span>
                <strong className="text-red-400 font-mono text-sm">MMI IX (Violent)</strong>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">🌀 Super Typhoon Winds:</span>
                <strong className="text-sky-400 font-mono text-sm">115 Kts (Gale)</strong>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">⚓ Port Lockout Status:</span>
                <strong className="text-amber-400 font-mono text-sm">14 Harbors Halted</strong>
              </div>

              <button
                onClick={() => {
                  alert('📡 UNIFIED DISASTER BROADCAST: Emergency Multi-Hazard SatCom alert dispatched to all 42 vessels in zone!');
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase text-xs rounded-xl shadow-lg transition-all border border-red-400"
              >
                📡 Dispatch Unified Multi-Hazard Broadcast
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GLOBAL DISASTER CRISIS DASHBOARD */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Globe className="w-5 h-5 text-red-400 animate-pulse" />
            <span>GLOBAL DISASTER CRISIS DASHBOARD (WORLDWIDE MONITOR)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 font-bold uppercase">
            LEVEL 5 GLOBAL SEISMIC CRISIS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3 bg-gradient-to-br from-red-950/60 to-slate-900 border border-red-500/40 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">GLOBAL THREAT INDEX</span>
            <div className="flex items-baseline space-x-1.5">
              <strong className="text-2xl font-black text-red-400">88</strong>
              <span className="text-slate-400 text-xs font-bold">/ 100</span>
            </div>
            <span className="text-[9px] text-red-300 font-bold block uppercase">HIGH SEISMIC DISASTER</span>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">ACTIVE MEGATHRUST EVENTS</span>
            <strong className="text-xl font-black text-amber-400">2 MAJOR (M7.2+)</strong>
            <span className="text-[9px] text-slate-400 block">Nankai & Sumatran Trench</span>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">VESSELS IN RISK CORRIDORS</span>
            <strong className="text-xl font-black text-cyan-300">42 SHIPS</strong>
            <span className="text-[9px] text-slate-400 block">Tokyo Bay & Malacca Strait</span>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">AFFECTED PORTS / HARBORS</span>
            <strong className="text-xl font-black text-orange-400">14 TERMINALS</strong>
            <span className="text-[9px] text-slate-400 block">Operations Halted</span>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">DART BUOYS ONLINE</span>
            <strong className="text-xl font-black text-emerald-400">38 BUOYS</strong>
            <span className="text-[9px] text-slate-400 block">100% Sat Link Transmit</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GEOGRAPHICALLY LIVE STREAM OF SCENARIO EARTHQUAKE & TSUNAMI RADAR */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-red-500/50 rounded-2xl p-6 space-y-6 font-mono shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">GEOGRAPHIC SEISMIC TELEMETRY STREAM</span>
              <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                <span>LIVE SCENARIO STREAM ACTIVE</span>
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Geographically Live Stream of Scenario Earthquake</h2>
            <p className="text-slate-400 text-xs font-sans mt-1 max-w-2xl">
              Real-time spatial propagation simulation of Primary (P) waves, Secondary (S) waves, and Hydrodynamic Tsunami surge vectors across global maritime fault lines.
            </p>
          </div>

          {/* SCENARIO SELECTOR BUTTONS */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {[
              { id: 'NANKAI_M89', label: '🌋 M8.9 Nankai Trough (Japan)' },
              { id: 'SUMATRA_M91', label: '🌊 M9.1 Sunda Trench (Sumatra)' },
              { id: 'CASCADIA_M84', label: '🌋 M8.4 Cascadia Fault (Pacific NW)' },
              { id: 'CHILE_M78', label: '🌋 M7.8 Atacama Trench (Chile)' }
            ].map((scen) => (
              <button
                key={scen.id}
                onClick={() => {
                  setSelectedScenarioId(scen.id as any);
                  setStreamProgress(0);
                  setScenarioBroadcastSent(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedScenarioId === scen.id
                    ? 'bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/20 font-black'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {scen.label}
              </button>
            ))}
          </div>
        </div>

        {/* GEOGRAPHIC LIVE RADAR STREAM CANVAS SIMULATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* RADAR CANVAS MAP SIMULATOR */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
            {/* GRID LINES BACKDROP */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

            {/* RADAR SWEEP LINE */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-transparent pointer-events-none origin-bottom-left animate-spin"
              style={{ animationDuration: '6s' }}
            />

            {/* EPICENTER WAVE PROPAGATION RINGS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
              {/* P-WAVE RING (RED) */}
              <div
                className="rounded-full border-2 border-red-500/60 bg-red-500/10 transition-all duration-300"
                style={{ width: `${streamProgress * 5}px`, height: `${streamProgress * 5}px` }}
              />
              {/* S-WAVE RING (AMBER) */}
              <div
                className="absolute rounded-full border-2 border-amber-400/60 bg-amber-500/10 transition-all duration-300"
                style={{ width: `${streamProgress * 3}px`, height: `${streamProgress * 3}px` }}
              />
              {/* TSUNAMI SURGE VECTOR (CYAN) */}
              <div
                className="absolute rounded-full border-2 border-dashed border-cyan-400/80 transition-all duration-300"
                style={{ width: `${streamProgress * 2}px`, height: `${streamProgress * 2}px` }}
              />
              {/* EPICENTER CORE DOT */}
              <div className="absolute w-6 h-6 rounded-full bg-red-500 border-2 border-white animate-ping" />
              <div className="absolute w-3 h-3 rounded-full bg-white" />
            </div>

            {/* HUD HEADER */}
            <div className="relative z-10 flex justify-between items-start text-xs font-mono">
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">GEOGRAPHIC EPICENTER LOCATION</span>
                <strong className="text-amber-400 block font-black">
                  {selectedScenarioId === 'NANKAI_M89' && '37.8° N, 142.1° E (Nankai Trough)'}
                  {selectedScenarioId === 'SUMATRA_M91' && '2.1° S, 98.4° E (Sunda Trench Arc)'}
                  {selectedScenarioId === 'CASCADIA_M84' && '44.2° N, 125.6° W (Cascadia Interface)'}
                  {selectedScenarioId === 'CHILE_M78' && '19.4° S, 70.8° W (Atacama Trench)'}
                </strong>
              </div>

              <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-red-500/40 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">SCENARIO MAGNITUDE</span>
                <strong className="text-lg text-red-400 font-black">
                  {selectedScenarioId === 'NANKAI_M89' && 'M 8.9'}
                  {selectedScenarioId === 'SUMATRA_M91' && 'M 9.1'}
                  {selectedScenarioId === 'CASCADIA_M84' && 'M 8.4'}
                  {selectedScenarioId === 'CHILE_M78' && 'M 7.8'}
                </strong>
              </div>
            </div>

            {/* HUD FOOTER LEGEND */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-2 pt-4 border-t border-slate-800/80 text-[10px]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-red-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  Primary (P) Wave (6.8 km/s)
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Secondary (S) Wave (3.8 km/s)
                </span>
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full border border-dashed border-cyan-400" />
                  Tsunami Wave Vector (800 km/h)
                </span>
              </div>

              <span className="text-slate-400 font-mono">Stream Progress: <strong className="text-white">{streamProgress}%</strong></span>
            </div>
          </div>

          {/* TELEMETRY & SATCOM DISPATCH SIDEBAR */}
          <div className="lg:col-span-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-slate-300 uppercase block border-b border-slate-800 pb-2">
              SEISMIC TELEMETRY &amp; ETA METRICS
            </span>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">Peak Ground Accel (PGA):</span>
                <strong className="text-red-400 font-mono text-sm">48.5 %g (MMI IX)</strong>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">Simulated Tsunami Surge:</span>
                <strong className="text-cyan-400 font-mono text-sm">6.8 Meters Peak</strong>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-bold">Port ETA Countdown:</span>
                <strong className="text-amber-400 font-mono text-sm">14 Mins to Harbor</strong>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">MARITIME BRIDGE INSTRUCTION</span>
                <p className="text-[11px] text-slate-300 font-sans">
                  "All vessels in berth: cast off moorings immediately. Steer course 110° True to deep water safety contour &gt;250m."
                </p>
              </div>

              <button
                onClick={() => {
                  setScenarioBroadcastSent(true);
                  alert('📡 SATCOM DISTRESS ALERT DISPATCHED: Securite Tsunami Emergency Alert transmitted via Inmarsat & Starlink to all 42 ships in EEZ!');
                }}
                className={`w-full py-3 rounded-xl font-black uppercase text-xs transition-all shadow-lg border ${
                  scenarioBroadcastSent
                    ? 'bg-emerald-500 text-slate-950 border-emerald-300 font-black'
                    : 'bg-red-600 hover:bg-red-500 text-white border-red-400'
                }`}
              >
                {scenarioBroadcastSent ? '✓ SatCom Alert Transmitted' : '📡 Dispatch SatCom Emergency Broadcast'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE A: TSUNAMI LIVE FEED WORLD WIDE */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">NOAA DART &amp; SATCOM TELEMETRY FEED</span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                24/7 WORLDWIDE STREAM
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Tsunami Live Feed World Wide</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Live pressure sensors and wave height anomaly telemetry from NOAA DART Buoy arrays across all major global ocean basins.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
            {(['PACIFIC', 'INDIAN', 'ATLANTIC', 'MEDITERRANEAN'] as const).map((basin) => (
              <button
                key={basin}
                onClick={() => setTsunamiLiveFeedBasin(basin)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  tsunamiLiveFeedBasin === basin
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {basin} BASIN
              </button>
            ))}
          </div>
        </div>

        {/* DART BUOY ARRAY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'DART-21418', name: 'NOAA DART #21418 (Tokyo Bay)', depthM: 5240, waveM: 4.8, status: 'EVENT_MODE_ALERT', location: 'NW Pacific Shelf' },
            { id: 'DART-53042', name: 'NOAA DART #53042 (Sumatra Trench)', depthM: 4120, waveM: 3.5, status: 'EVENT_MODE_ALERT', location: 'Indian Ocean Sunda Arc' },
            { id: 'DART-46404', name: 'NOAA DART #46404 (Cascadia Outer)', depthM: 2890, waveM: 1.2, status: 'NORMAL_MONITORING', location: 'North Pacific Cascadia' }
          ].map((buoy) => (
            <div
              key={buoy.id}
              className={`bg-slate-900 p-4 rounded-2xl border space-y-3 ${
                buoy.status === 'EVENT_MODE_ALERT' ? 'border-red-500/60 bg-red-500/5' : 'border-slate-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-xs font-bold text-white block">{buoy.name}</strong>
                  <span className="text-[10px] text-slate-400 font-sans block">{buoy.location}</span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                  buoy.status === 'EVENT_MODE_ALERT' ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {buoy.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Water Depth</span>
                  <strong className="text-slate-200 font-mono">{buoy.depthM} m</strong>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Surge Anomaly</span>
                  <strong className={buoy.waveM > 2.0 ? 'text-red-400 font-bold' : 'text-emerald-400'}>{buoy.waveM} m</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE B: EARTHQUAKE IMPACT MAPS WORLD WIDE */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">GLOBAL SEISMIC SHAKING &amp; STRUCTURAL RISK</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                MMI GRADE I-XII HEATMAPS
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Earthquake Impact Maps World Wide</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Visualize worldwide ground acceleration (PGA %g), fault line rupture geometries, and coastal port terminal damage scores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
            {[
              { id: 'MMI_SHAKING', label: 'MMI Shaking' },
              { id: 'PGA_ACCELERATION', label: 'PGA %g Accel' },
              { id: 'PORT_INFRASTRUCTURE', label: 'Port Damage Risk' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setEarthquakeImpactMapMode(mode.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  earthquakeImpactMapMode === mode.id
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* IMPACT MAP DATA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">HONSHU NANKAI TROUGH SECTOR</span>
            <div className="flex justify-between items-baseline">
              <strong className="text-lg text-red-400 font-black">MMI IX (Violent)</strong>
              <span className="text-amber-400 font-bold">PGA: 48.5%g</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">Heavy shaking across Yokohama, Tokyo Bay, and Nagoya container berths.</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">SUNDA TRENCH SUMATRA SECTOR</span>
            <div className="flex justify-between items-baseline">
              <strong className="text-lg text-orange-400 font-black">MMI VIII (Severe)</strong>
              <span className="text-amber-400 font-bold">PGA: 34.2%g</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">Severe coastal liquefaction risk at Padang Harbour &amp; Belawan Port.</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">CASCADIA SUBDUCTION ZONE</span>
            <div className="flex justify-between items-baseline">
              <strong className="text-lg text-amber-300 font-black">MMI VI (Strong)</strong>
              <span className="text-amber-400 font-bold">PGA: 14.6%g</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">Moderate structural vibration monitored at Port of Seattle &amp; Coos Bay.</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">ATACAMA CHILE TRENCH</span>
            <div className="flex justify-between items-baseline">
              <strong className="text-lg text-yellow-400 font-black">MMI VII (Very Strong)</strong>
              <span className="text-amber-400 font-bold">PGA: 22.8%g</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">Port of Iquique &amp; Antofagasta terminal operations temporarily suspended.</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE C: AUTOMATED DISASTER ALERT WORLD WIDE */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">MULTI-CHANNEL DISPATCH ENGINE</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                100% AUTOMATED GLOBAL BROADCAST
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Automated Disaster Alert World Wide</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Autonomous multi-channel warning distribution via Satellite, Digital Selective Calling (DSC Channel 70), Port VHF, and REST Webhooks.
            </p>
          </div>

          <button
            onClick={() => {
              alert('🚨 AUTOMATED WORLDWIDE TEST BROADCAST SENT: All 4 active rules executed across Inmarsat, DSC Ch 70, Port VHF and REST Webhooks!');
            }}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase shadow-lg transition-all shrink-0"
          >
            ⚡ Test Auto Broadcast Rules
          </button>
        </div>

        {/* RULE LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {autoDisasterAlertRules.map((rule) => (
            <div key={rule.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-start">
                <strong className="text-white font-bold block">{rule.name}</strong>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
                  {rule.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <span className="text-slate-400">Channel: <strong className="text-cyan-400">{rule.channel}</strong></span>
                <span className="text-slate-400">Auto Dispatches: <strong className="text-amber-400">{rule.autoTriggeredCount} Times</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. NEW FEATURE: REGIONAL ALERT HEAT MAP */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
            <span>REGIONAL ALERT HEAT MAP (GLOBAL MARITIME SECTOR RISK DENSITY)</span>
          </div>
          {selectedHeatMapRegion && (
            <button
              onClick={() => setSelectedHeatMapRegion(null)}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center space-x-1"
            >
              <span>CLEAR FILTER: {selectedHeatMapRegion}</span>
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {heatMapZones.map((zone) => {
            const isCritical = zone.severity === 'CRITICAL';
            const isWarning = zone.severity === 'WARNING';
            const isAdvisory = zone.severity === 'ADVISORY';
            const isSelected = selectedHeatMapRegion === zone.regionName;

            return (
              <div
                key={zone.id}
                onClick={() => setSelectedHeatMapRegion(isSelected ? null : zone.regionName)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'ring-2 ring-amber-400 bg-slate-900 scale-[1.02]'
                    : isCritical
                    ? 'bg-red-950/40 border-red-500/50 hover:border-red-400'
                    : isWarning
                    ? 'bg-amber-950/40 border-amber-500/50 hover:border-amber-400'
                    : isAdvisory
                    ? 'bg-yellow-950/30 border-yellow-500/40 hover:border-yellow-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase ${
                    isCritical
                      ? 'bg-red-500 text-slate-950 border-red-400 animate-pulse'
                      : isWarning
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : isAdvisory
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {zone.severity}
                  </span>
                  <span className="text-xs font-extrabold text-slate-300">RISK: {zone.riskScore}/100</span>
                </div>

                <h4 className="font-extrabold text-white text-xs leading-tight mb-1">{zone.regionName}</h4>
                <span className="text-[10px] text-slate-400 block mb-2">{zone.oceanBasin} • {zone.coordinates}</span>

                {/* Risk Density Bar */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800 mb-2">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : isAdvisory ? 'bg-yellow-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${zone.riskScore}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span>BUOYS: <strong className="text-white">{zone.activeBuoys}</strong></span>
                  <span>VESSELS: <strong className="text-cyan-300">{zone.vesselsAtRisk}</strong></span>
                  <span>SURGE: <strong className="text-amber-300">{zone.maxWaveHeightM}m</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CRISIS MAP LAYERS CONTROLLER */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Layers className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>CRISIS MAP LAYERS & GIS TELEMETRY OVERLAYS</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg font-bold">
              {Object.values(mapLayers).filter(Boolean).length} / {Object.keys(mapLayers).length} LAYERS ACTIVE
            </span>
            <button
              onClick={() =>
                setMapLayers({
                  faultLines: true,
                  tsunamiVectors: true,
                  dartBuoys: true,
                  coastalSirens: true,
                  safeCorridors: true,
                  seismicHeatmap: true
                })
              }
              className="px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded-lg font-bold hover:bg-slate-800"
            >
              ENABLE ALL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Layer 1: Fault Lines */}
          <div
            onClick={() => handleToggleMapLayer('faultLines')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
              mapLayers.faultLines
                ? 'bg-slate-900 border-red-500/50 shadow-lg shadow-red-500/5'
                : 'bg-slate-900/40 border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Activity className={`w-4 h-4 ${mapLayers.faultLines ? 'text-red-400' : 'text-slate-500'}`} />
                <strong className="text-xs font-bold text-white">Active Fault Lines & Megathrust Arcs</strong>
              </div>
              <p className="text-[10px] text-slate-400">Ring of Fire, Cascadia, Sunda & Nankai Trough lines</p>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${mapLayers.faultLines ? 'bg-red-500' : 'bg-slate-800'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${mapLayers.faultLines ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Layer 2: Tsunami Wave Vectors */}
          <div
            onClick={() => handleToggleMapLayer('tsunamiVectors')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
              mapLayers.tsunamiVectors
                ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/5'
                : 'bg-slate-900/40 border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Waves className={`w-4 h-4 ${mapLayers.tsunamiVectors ? 'text-cyan-400' : 'text-slate-500'}`} />
                <strong className="text-xs font-bold text-white">Tsunami Wave Propagation Vectors</strong>
              </div>
              <p className="text-[10px] text-slate-400">Refraction ray paths & deep-ocean wave speeds</p>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${mapLayers.tsunamiVectors ? 'bg-cyan-500' : 'bg-slate-800'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${mapLayers.tsunamiVectors ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Layer 3: DART Buoys */}
          <div
            onClick={() => handleToggleMapLayer('dartBuoys')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
              mapLayers.dartBuoys
                ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                : 'bg-slate-900/40 border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Radio className={`w-4 h-4 ${mapLayers.dartBuoys ? 'text-emerald-400' : 'text-slate-500'}`} />
                <strong className="text-xs font-bold text-white">DART Deep-Ocean Buoys Network</strong>
              </div>
              <p className="text-[10px] text-slate-400">Real-time bottom pressure recorder telemetry</p>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${mapLayers.dartBuoys ? 'bg-emerald-500' : 'bg-slate-800'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${mapLayers.dartBuoys ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Layer 4: Coastal Sirens */}
          <div
            onClick={() => handleToggleMapLayer('coastalSirens')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
              mapLayers.coastalSirens
                ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/5'
                : 'bg-slate-900/40 border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Siren className={`w-4 h-4 ${mapLayers.coastalSirens ? 'text-amber-400' : 'text-slate-500'}`} />
                <strong className="text-xs font-bold text-white">Coastal Warning Sirens & GMDSS Radios</strong>
              </div>
              <p className="text-[10px] text-slate-400">Harbor speaker towers & DSC VHF Coast Stations</p>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${mapLayers.coastalSirens ? 'bg-amber-500' : 'bg-slate-800'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${mapLayers.coastalSirens ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Layer 5: Safe Corridors */}
          <div
            onClick={() => handleToggleMapLayer('safeCorridors')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
              mapLayers.safeCorridors
                ? 'bg-slate-900 border-teal-500/50 shadow-lg shadow-teal-500/5'
                : 'bg-slate-900/40 border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Navigation className={`w-4 h-4 ${mapLayers.safeCorridors ? 'text-teal-400' : 'text-slate-500'}`} />
                <strong className="text-xs font-bold text-white">Safe Deep-Water Escape Corridors</strong>
              </div>
              <p className="text-[10px] text-slate-400">Routes to water depths &gt;200m outside shallow bays</p>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${mapLayers.safeCorridors ? 'bg-teal-500' : 'bg-slate-800'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${mapLayers.safeCorridors ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Layer 6: Seismic Heatmap */}
          <div
            onClick={() => handleToggleMapLayer('seismicHeatmap')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
              mapLayers.seismicHeatmap
                ? 'bg-slate-900 border-rose-500/50 shadow-lg shadow-rose-500/5'
                : 'bg-slate-900/40 border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Flame className={`w-4 h-4 ${mapLayers.seismicHeatmap ? 'text-rose-400' : 'text-slate-500'}`} />
                <strong className="text-xs font-bold text-white">Seismic Energy Heatmap Overlay</strong>
              </div>
              <p className="text-[10px] text-slate-400">30-day cumulative earthquake energy dissipation</p>
            </div>
            <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${mapLayers.seismicHeatmap ? 'bg-rose-500' : 'bg-slate-800'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${mapLayers.seismicHeatmap ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. NEW FEATURE: PREDICTIVE SURGE MODEL */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>PREDICTIVE TSUNAMI SURGE HYDRODYNAMIC MODEL</span>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
            GREEN&apos;S LAW AMPLIFICATION SIMULATOR
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Controls Column */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <h4 className="font-extrabold text-xs text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>SIMULATION PARAMETERS</span>
            </h4>

            {/* Magnitude Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold">Earthquake Magnitude:</span>
                <span className="text-amber-400 font-black">M{simMagnitude.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={6.0}
                max={9.2}
                step={0.1}
                value={simMagnitude}
                onChange={(e) => setSimMagnitude(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Depth Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold">Focal Depth (km):</span>
                <span className="text-cyan-300 font-bold">{simDepthKm} km</span>
              </div>
              <input
                type="range"
                min={5}
                max={70}
                value={simDepthKm}
                onChange={(e) => setSimDepthKm(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Distance Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold">Distance to Coast (NM):</span>
                <span className="text-emerald-300 font-bold">{simDistanceNM} NM</span>
              </div>
              <input
                type="range"
                min={10}
                max={150}
                value={simDistanceNM}
                onChange={(e) => setSimDistanceNM(parseInt(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Bathymetry Selector */}
            <div className="space-y-1.5">
              <span className="text-slate-300 font-bold text-xs block">Bathymetric Slope Profile:</span>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                <button
                  onClick={() => setSimShelfType('GRADUAL')}
                  className={`py-1.5 px-2 rounded-lg border font-bold ${
                    simShelfType === 'GRADUAL'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Gradual
                </button>
                <button
                  onClick={() => setSimShelfType('STEEP')}
                  className={`py-1.5 px-2 rounded-lg border font-bold ${
                    simShelfType === 'STEEP'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Steep Slope
                </button>
                <button
                  onClick={() => setSimShelfType('CORAL_SHELF')}
                  className={`py-1.5 px-2 rounded-lg border font-bold ${
                    simShelfType === 'CORAL_SHELF'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Coral Reef
                </button>
              </div>
            </div>

            {/* Forecast Output Metrics */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Predicted Coastal Surge:</span>
                <strong className="text-red-400 font-black text-sm">{predictedCoastalSurgeM} Meters</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Estimated Arrival ETA:</span>
                <strong className="text-amber-300 font-extrabold">{predictedEtaMinutes} Minutes</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Inundation Limit:</span>
                <strong className="text-cyan-300 font-bold">{predictedInundationDistanceM}m Inland</strong>
              </div>
            </div>
          </div>

          {/* Time Series Recharts Graph */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-extrabold text-xs text-white">FORECAST WAVE AMPLITUDE TIME-SERIES (T=0 TO 120 MINS)</h4>
              <span className="text-[10px] text-cyan-300 font-bold">PEAK AT T+{predictedEtaMinutes}M</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wavePropagationSeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSurge" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timeMin" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} unit="m" />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                  <ReferenceLine y={2.0} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Harbor Critical Threshold (2.0m)', fill: '#f59e0b', fontSize: 10 }} />
                  <Area type="monotone" dataKey="waveHeightM" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorSurge)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between mt-2">
              <span>GREEN&apos;S LAW FORMULA: <code className="text-cyan-300 font-mono">H2 = H1 * (d1 / d2)^(1/4)</code></span>
              <span className="text-amber-400 font-bold">AUTOMATIC BRIDGE WARNING ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* AUTOMATED DRILL REMINDER ALERT BANNER */}
      {autoRemindersEnabled && activeReminderAlert && !activeReminderAlert.dismissed && (
        <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-red-950/90 border-2 border-amber-500/60 rounded-2xl p-4 font-mono shadow-2xl relative overflow-hidden animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl font-black shrink-0 animate-bounce">
                <BellRing className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950 uppercase">
                    AUTOMATED DRILL REMINDER
                  </span>
                  <span className="text-amber-400 font-extrabold text-xs">
                    {activeReminderAlert.timeRemainingText}
                  </span>
                </div>
                <h3 className="text-sm font-black text-white mt-1">
                  {activeReminderAlert.drillTitle}
                </h3>
                <span className="text-xs text-slate-300 block">
                  Scheduled: <strong className="text-amber-300">{activeReminderAlert.scheduledTime}</strong> • Target: <strong className="text-cyan-300">Bridge & Engine Crew</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  const matchingDrill = scheduledDrills.find(d => d.id === activeReminderAlert.drillId) || SEED_SCHEDULED_DRILLS[0];
                  handleLaunchScheduledDrill(matchingDrill);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1.5 shadow-lg transition-transform hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START DRILL NOW</span>
              </button>

              <button
                onClick={() => {
                  setActiveReminderAlert(prev => prev ? { ...prev, timeRemainingText: 'SNOOZED (+10 MINS)' } : null);
                }}
                className="px-3 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs rounded-xl border border-slate-700 flex items-center space-x-1"
              >
                <AlarmClock className="w-3.5 h-3.5 text-amber-400" />
                <span>SNOOZE 10M</span>
              </button>

              <button
                onClick={() => setActiveReminderAlert(prev => prev ? { ...prev, dismissed: true } : null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE DISASTER DRILL ENGINE */}
      <div id="interactive-drill-engine" className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Award className="w-5 h-5 text-amber-400" />
            <span>INTERACTIVE BRIDGE OFFICER TSUNAMI EMERGENCY DRILL ENGINE</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-400">SCORE: <strong className="text-amber-400 text-sm font-black">{drillScore} PTS</strong></span>
            <span className="text-slate-400">TIMER: <strong className={`text-sm font-black ${drillTimeLeft < 15 ? 'text-red-400 animate-pulse' : 'text-cyan-300'}`}>{drillTimeLeft}S</strong></span>
          </div>
        </div>

        {!drillCompleted ? (
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                QUESTION {activeDrillIndex + 1} OF {DISASTER_DRILL_QUESTIONS.length}
              </span>
              <span className="text-slate-400 font-bold">
                SCENARIO: {DISASTER_DRILL_QUESTIONS[activeDrillIndex].scenarioTitle}
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-white leading-relaxed">
              {DISASTER_DRILL_QUESTIONS[activeDrillIndex].question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-2">
              {DISASTER_DRILL_QUESTIONS[activeDrillIndex].options.map((opt, idx) => {
                const isSelected = selectedDrillOption === idx;
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

                if (drillAnswerSubmitted) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-red-500/20 border-red-500 text-red-300 font-bold';
                  }
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectDrillOption(idx)}
                    className={`p-3 rounded-xl border cursor-pointer text-xs transition-all space-y-1 ${btnStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{opt.label}</span>
                      {drillAnswerSubmitted && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </div>

                    {drillAnswerSubmitted && (isSelected || opt.isCorrect) && (
                      <p className="text-[10px] opacity-90 pt-1 border-t border-slate-800 mt-1">{opt.explanation}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {drillAnswerSubmitted && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextDrillQuestion}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center space-x-2"
                >
                  <span>{activeDrillIndex + 1 === DISASTER_DRILL_QUESTIONS.length ? 'FINISH DRILL' : 'NEXT DRILL SCENARIO'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Drill Completed Certificate Screen */
          <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl text-center space-y-4">
            <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-white">TSUNAMI DISASTER DRILL EVALUATION COMPLETE</h3>
            
            <div className="inline-block p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs block font-bold">CAPTAIN PERFORMANCE RATING</span>
              <strong className={`text-3xl font-black ${drillScore >= 90 ? 'text-emerald-400' : drillScore >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                {drillScore >= 90 ? 'GRADE S: EXPERT COMMANDER' : drillScore >= 70 ? 'GRADE A: CERTIFIED BRIDGE OFFICER' : 'GRADE F: CRITICAL DRILL FAILURE'}
              </strong>
              <p className="text-xs text-slate-300">Final Score: {drillScore} / 100 Points</p>
            </div>

            <div>
              <button
                onClick={resetDrill}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs inline-flex items-center space-x-2 hover:bg-amber-400"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RE-RUN DISASTER DRILL SIMULATION</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AUTOMATED DISASTER DRILL SCHEDULER & CREW CALENDAR */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>AUTOMATED DISASTER DRILL SCHEDULER & CREW CALENDAR</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1 text-xs">
              <span className="text-slate-400 text-[10px] font-bold">AUTO REMINDERS:</span>
              <button
                onClick={() => setAutoRemindersEnabled(!autoRemindersEnabled)}
                className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                  autoRemindersEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-red-500/20 text-red-300 border-red-500/40'
                }`}
              >
                {autoRemindersEnabled ? 'ACTIVE (ON)' : 'MUTED (OFF)'}
              </button>
            </div>

            <button
              onClick={handleTestTriggerReminder}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-slate-700 flex items-center space-x-1"
            >
              <BellRing className="w-3.5 h-3.5 text-amber-400" />
              <span>TEST REMINDER</span>
            </button>

            <button
              onClick={() => setShowScheduleModal(!showScheduleModal)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>SCHEDULE NEW DRILL</span>
            </button>
          </div>
        </div>

        {/* Schedule Drill Creation Form Modal / Collapsible */}
        {showScheduleModal && (
          <form onSubmit={handleCreateScheduledDrill} className="p-4 bg-slate-900 border border-amber-500/40 rounded-xl space-y-3 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-black text-amber-300 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>CREATE & SCHEDULE NEW BRIDGE EMERGENCY DRILL</span>
              </h4>
              <button type="button" onClick={() => setShowScheduleModal(false)} className="text-slate-400 text-xs">Close ✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block font-bold mb-1">DRILL TITLE / NAME:</label>
                <input
                  type="text"
                  required
                  value={newDrillTitle}
                  onChange={(e) => setNewDrillTitle(e.target.value)}
                  placeholder="e.g. Nankai Trough Evacuation Drill"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">SCENARIO TYPE:</label>
                <select
                  value={newDrillScenario}
                  onChange={(e) => setNewDrillScenario(e.target.value as ScheduledDrill['scenarioType'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-amber-300 font-bold focus:outline-none"
                >
                  <option value="MEGATHRUST_TSUNAMI">Megathrust Tsunami Evacuation</option>
                  <option value="PORT_EVACUATION">Port & Harbor Rapid Evacuation</option>
                  <option value="ECDIS_DEEP_WATER">ECDIS Safety Contour Setup</option>
                  <option value="RADIO_MAYDAY_RELAY">VHF Channel 16 Mayday Relay</option>
                  <option value="ENGINE_SPEED_MANEUVER">Main Engine Full Throttle</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">OCEAN BASIN / ZONE:</label>
                <select
                  value={newDrillOcean}
                  onChange={(e) => setNewDrillOcean(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-cyan-300 font-bold focus:outline-none"
                >
                  <option value="NW Pacific Basin (Honshu Sector)">NW Pacific Basin (Honshu Sector)</option>
                  <option value="Indian Ocean (Sumatra Arc)">Indian Ocean (Sumatra Arc)</option>
                  <option value="North Pacific (Cascadia Shelf)">North Pacific (Cascadia Shelf)</option>
                  <option value="South Pacific (Chile Atacama)">South Pacific (Chile Atacama)</option>
                  <option value="Mediterranean Sea (Hellenic Arc)">Mediterranean Sea (Hellenic Arc)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">TARGET CREW / TEAM:</label>
                <input
                  type="text"
                  required
                  value={newDrillTargetCrew}
                  onChange={(e) => setNewDrillTargetCrew(e.target.value)}
                  placeholder="e.g. Bridge Duty Officers"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">SCHEDULED DATE & TIME (UTC):</label>
                <input
                  type="text"
                  required
                  value={newDrillTime}
                  onChange={(e) => setNewDrillTime(e.target.value)}
                  placeholder="2026-08-05 14:00 UTC"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">RECURRENCE FREQUENCY:</label>
                <select
                  value={newDrillFrequency}
                  onChange={(e) => setNewDrillFrequency(e.target.value as ScheduledDrill['frequency'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-emerald-300 font-bold focus:outline-none"
                >
                  <option value="ONE_TIME">One-Time Only</option>
                  <option value="WEEKLY">Weekly Recurring</option>
                  <option value="BI_WEEKLY">Bi-Weekly Recurring</option>
                  <option value="MONTHLY">Monthly Recurring</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">DIFFICULTY LEVEL:</label>
                <select
                  value={newDrillDifficulty}
                  onChange={(e) => setNewDrillDifficulty(e.target.value as ScheduledDrill['difficulty'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-bold focus:outline-none"
                >
                  <option value="STANDARD">Standard Protocol</option>
                  <option value="ADVANCED">Advanced High Sea</option>
                  <option value="CATASTROPHIC_SURPRISE">Catastrophic Surprise Scenario</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block font-bold mb-1">REMINDER LEAD TIME:</label>
                <select
                  value={newDrillReminderLead}
                  onChange={(e) => setNewDrillReminderLead(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-amber-300 font-bold focus:outline-none"
                >
                  <option value={15}>15 Minutes Before</option>
                  <option value={30}>30 Minutes Before</option>
                  <option value={60}>1 Hour Before</option>
                </select>
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <label className="text-slate-400 block font-bold mb-1">TACTICAL NOTES:</label>
                <input
                  type="text"
                  value={newDrillNotes}
                  onChange={(e) => setNewDrillNotes(e.target.value)}
                  placeholder="e.g. Verify radar standby mode"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4 text-slate-950" />
                <span>CONFIRM & SCHEDULE DRILL</span>
              </button>
            </div>
          </form>
        )}

        {/* Calendar Sync Notification Toast */}
        {calendarSyncNotification && (
          <div className="p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-xl text-cyan-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{calendarSyncNotification}</span>
          </div>
        )}

        {/* Filter, Search & Full Calendar Sync Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'].map((st) => (
              <button
                key={st}
                onClick={() => setScheduleFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg border font-extrabold text-[10px] shrink-0 ${
                  scheduleFilterStatus === st
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={exportAllDrillsToICS}
              className="px-2.5 py-1.5 bg-slate-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-lg hover:bg-slate-800 flex items-center space-x-1"
              title="Export all scheduled drills into a single .ics calendar file"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPORT ALL (.ICS)</span>
            </button>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={scheduleSearchQuery}
                onChange={(e) => setScheduleSearchQuery(e.target.value)}
                placeholder="Search drills..."
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400 w-40"
              />
            </div>
          </div>
        </div>

        {/* Scheduled Drills Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduledDrills
            .filter((d) => {
              if (scheduleFilterStatus !== 'ALL' && d.status !== scheduleFilterStatus) return false;
              if (
                scheduleSearchQuery &&
                !d.title.toLowerCase().includes(scheduleSearchQuery.toLowerCase()) &&
                !d.oceanZone.toLowerCase().includes(scheduleSearchQuery.toLowerCase())
              )
                return false;
              return true;
            })
            .map((drill) => {
              const isScheduled = drill.status === 'SCHEDULED';
              const isInProg = drill.status === 'IN_PROGRESS';
              const isComp = drill.status === 'COMPLETED';

              return (
                <div
                  key={drill.id}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase ${
                        isScheduled
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : isInProg
                          ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                          : isComp
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-red-500/20 text-red-300 border-red-500/40'
                      }`}>
                        {drill.status}
                      </span>

                      <button
                        onClick={() => handleToggleDrillReminder(drill.id)}
                        title="Toggle automated reminder for this drill"
                        className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 ${
                          drill.reminderActive
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-950 text-slate-500 border-slate-800'
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-bold">{drill.reminderActive ? 'ALERT ON' : 'MUTED'}</span>
                      </button>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-white text-xs leading-snug">{drill.title}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{drill.oceanZone}</span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-[11px]">
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Scheduled:</span>
                        <strong className="text-amber-300 font-bold">{drill.scheduledTime}</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Target Crew:</span>
                        <strong className="text-cyan-300 font-bold">{drill.targetCrew}</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Frequency:</span>
                        <span className="text-slate-200 font-bold">{drill.frequency}</span>
                      </div>
                      {drill.lastExecutedScore && (
                        <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800/80">
                          <span className="text-slate-400">Last Score:</span>
                          <strong className="text-emerald-400 font-black">{drill.lastExecutedScore} PTS</strong>
                        </div>
                      )}
                    </div>

                    {/* Drill Calendar Sync Actions */}
                    <div className="flex items-center space-x-1.5 pt-1">
                      <button
                        onClick={() => exportDrillToICS(drill)}
                        className="px-2 py-1 bg-slate-950 text-cyan-300 border border-cyan-500/30 rounded-lg text-[10px] font-bold hover:bg-slate-800 flex items-center space-x-1"
                        title="Download .ics file for calendar sync"
                      >
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>ICS SYNC</span>
                      </button>
                      <button
                        onClick={() => generateGoogleCalendarLink(drill)}
                        className="px-2 py-1 bg-slate-950 text-amber-300 border border-amber-500/30 rounded-lg text-[10px] font-bold hover:bg-slate-800 flex items-center space-x-1"
                        title="Open in Google Calendar"
                      >
                        <ExternalLink className="w-3 h-3 text-amber-400" />
                        <span>GOOGLE CAL</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 italic bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                      &quot;{drill.notes}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleLaunchScheduledDrill(drill)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg flex items-center space-x-1"
                    >
                      <Play className="w-3.5 h-3.5 text-slate-950 fill-current" />
                      <span>LAUNCH DRILL</span>
                    </button>

                    <button
                      onClick={() => handleDeleteScheduledDrill(drill.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg"
                      title="Delete scheduled drill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* GLOBAL GEOLOGICAL DRILL HOTSPOTS */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Flame className="w-5 h-5 text-red-500 animate-pulse" />
            <span>GLOBAL SEISMIC DRILL HOTSPOTS & SUBDUCTION ZONES</span>
          </div>
          <span className="px-2.5 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-lg text-xs font-bold uppercase">
            6 HIGH-VULNERABILITY ZONES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drillHotspots.map((hotspot) => {
            const isCritical = hotspot.vulnerabilityLevel === 'CRITICAL';
            const isHigh = hotspot.vulnerabilityLevel === 'HIGH';

            return (
              <div
                key={hotspot.id}
                className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase ${
                        isCritical
                          ? 'bg-red-500 text-slate-950 border-red-400 animate-pulse'
                          : isHigh
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                      }`}
                    >
                      {hotspot.vulnerabilityLevel} VULNERABILITY
                    </span>
                    <span className="text-xs font-extrabold text-red-400">RISK: {hotspot.riskScore}/100</span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-white text-sm leading-tight">{hotspot.name}</h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{hotspot.oceanZone} • {hotspot.coordinates}</span>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-[11px]">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Fault Line:</span>
                      <strong className="text-cyan-300 font-bold truncate max-w-[170px]">{hotspot.primaryFaultName}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Readiness Index:</span>
                      <strong className="text-emerald-400 font-black">{hotspot.readinessIndex}%</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Active Vessels:</span>
                      <span className="text-amber-300 font-bold">{hotspot.vesselsInZoneCount} Ships</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Rec. Frequency:</span>
                      <span className="text-slate-200 font-bold">{hotspot.recommendedFrequency}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Last: {hotspot.lastDrillDate}</span>
                  <button
                    onClick={() => handleTriggerHotspotDrill(hotspot)}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-400 text-slate-950 font-black text-xs rounded-lg flex items-center space-x-1 shadow-lg shadow-red-500/20"
                  >
                    <Play className="w-3.5 h-3.5 text-slate-950 fill-current" />
                    <span>LAUNCH HOTSPOT DRILL</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BRIDGE COCKPIT VOICE RECORDER (CVR) & RADIO VOICE LOGS */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Mic className="w-5 h-5 text-amber-400 animate-pulse" />
            <span>BRIDGE COCKPIT VOICE RECORDER (CVR) & RADIO VOICE LOGS</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleVoiceRecording}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${
                isRecordingVoice
                  ? 'bg-red-500 text-white animate-pulse shadow-lg'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
              }`}
            >
              {isRecordingVoice ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isRecordingVoice ? `STOP RECORDING (${recordingSeconds}s)` : 'RECORD VOICE LOG'}</span>
            </button>

            <button
              onClick={exportVoiceLogsTXT}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center space-x-1 hover:bg-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPORT TRANSCRIPTS (.TXT)</span>
            </button>
          </div>
        </div>

        {/* Active Recording Waveform Indicator */}
        {isRecordingVoice && (
          <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-red-400 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span>BRIDGE MICROPHONE CVR ACTIVE RECORDING...</span>
              </span>
              <span className="text-white font-mono">{recordingSeconds} SECONDS</span>
            </div>

            <div className="flex items-center justify-center space-x-1 h-8 pt-1">
              {[40, 75, 20, 90, 60, 100, 30, 85, 50, 95, 70, 40, 80, 100, 60, 30, 90].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-red-500 rounded-full animate-pulse"
                  style={{ height: `${Math.max(15, (h * (recordingSeconds % 5 + 1)) % 100)}%`, animationDelay: `${i * 0.08}s` }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Input Voice Log Form */}
        <form onSubmit={handleAddVoiceLog} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <label className="text-slate-400 font-bold block mb-1">SPEAKER / OFFICER:</label>
              <input
                type="text"
                value={newVoiceSpeaker}
                onChange={(e) => setNewVoiceSpeaker(e.target.value)}
                placeholder="Capt. Jonathan Miller"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-white text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">RADIO CHANNEL:</label>
              <select
                value={newVoiceChannel}
                onChange={(e) => setNewVoiceChannel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-amber-300 font-bold text-xs focus:outline-none"
              >
                <option value="VHF CH 16 / BRIDGE CVR">VHF CH 16 / BRIDGE CVR</option>
                <option value="DSC DISTRESS RELAY">DSC DISTRESS RELAY (2187.5 kHz)</option>
                <option value="BRIDGE INTERCOM">BRIDGE INTERCOM SYSTEM</option>
                <option value="ENGINE CONTROL">ENGINE ROOM INTERCOM</option>
              </select>
            </div>

            <div className="sm:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>LOG VOICE TRANSCRIPT</span>
              </button>
            </div>
          </div>

          <div>
            <input
              type="text"
              required
              value={newVoiceTranscript}
              onChange={(e) => setNewVoiceTranscript(e.target.value)}
              placeholder="Type officer voice command transcript or announcement..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </form>

        {/* Voice Logs List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold">RECORDED AUDIO & TRANSCRIPT LOGS ({voiceLogs.length})</span>
            <input
              type="text"
              value={voiceLogSearch}
              onChange={(e) => setVoiceLogSearch(e.target.value)}
              placeholder="Search transcripts..."
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-white text-xs focus:outline-none w-44"
            />
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {voiceLogs
              .filter((v) => !voiceLogSearch || v.transcript.toLowerCase().includes(voiceLogSearch.toLowerCase()) || v.speaker.toLowerCase().includes(voiceLogSearch.toLowerCase()))
              .map((log) => {
                const isPlaying = activeVoicePlayingId === log.id;
                return (
                  <div key={log.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setActiveVoicePlayingId(isPlaying ? null : log.id)}
                          className={`p-1.5 rounded-lg border flex items-center space-x-1 ${
                            isPlaying ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-950 text-amber-300 border-slate-800'
                          }`}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                          <span className="text-[10px] font-black">{isPlaying ? 'PLAYING' : 'PLAY AUDIO'}</span>
                        </button>
                        <strong className="text-white font-bold">{log.speaker}</strong>
                      </div>

                      <div className="flex items-center space-x-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-bold">{log.channel}</span>
                        <span className="text-slate-400">{log.timestamp}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 italic bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                      &quot;{log.transcript}&quot;
                    </p>

                    {isPlaying && (
                      <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between text-[10px] text-amber-300">
                        <span className="flex items-center space-x-1">
                          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          <span>Bridge Audio Playing back CVR Stream (22kHz PCM)</span>
                        </span>
                        <span className="font-mono">00:0{log.durationSeconds} / 00:{log.durationSeconds}s</span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* INTERACTIVE DRILL SIMULATION VIDEO & BLACK-BOX EXPORT */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Video className="w-5 h-5 text-cyan-400" />
            <span>INTERACTIVE DRILL SIMULATION VIDEO & BLACK-BOX EXPORT</span>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={videoQuality}
              onChange={(e) => setVideoQuality(e.target.value as '1080P_60FPS' | '720P_30FPS')}
              className="bg-slate-900 border border-slate-800 text-cyan-300 font-bold text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="1080P_60FPS">1080p HD (60 FPS)</option>
              <option value="720P_30FPS">720p SD (30 FPS)</option>
            </select>

            <button
              onClick={handleExportDrillVideo}
              disabled={isExportingVideo}
              className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-lg disabled:opacity-50"
            >
              <FileVideo className="w-4 h-4 text-slate-950" />
              <span>{isExportingVideo ? `EXPORTING (${videoExportProgress}%)...` : 'EXPORT DRILL VIDEO (.WEBM)'}</span>
            </button>
          </div>
        </div>

        {videoExportSuccess && (
          <div className="p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-xl text-cyan-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{videoExportSuccess}</span>
          </div>
        )}

        {isExportingVideo && (
          <div className="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-cyan-300">
              <span>Compiling HUD Telemetry & Radar Keyframes into HD Video Stream...</span>
              <span>{videoExportProgress}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
              <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${videoExportProgress}%` }}></div>
            </div>
          </div>
        )}

        {/* Simulation Canvas Video Player Screen */}
        <div className="relative bg-slate-900 border-2 border-slate-800 rounded-2xl h-64 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between text-xs font-bold">
            <span className="px-2.5 py-1 bg-red-500/20 border border-red-500/40 text-red-300 rounded-lg flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>BLACK-BOX SIMULATION PLAYBACK</span>
            </span>

            <span className="text-slate-300 font-mono">
              QUALITY: <strong className="text-cyan-300">{videoQuality}</strong> | REC-TIME: 02:45
            </span>
          </div>

          <div className="relative z-10 flex items-center justify-center my-auto">
            <div className="relative w-48 h-32 border border-cyan-500/30 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
              <div className="w-32 h-20 border border-amber-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="p-2 bg-amber-500 text-slate-950 rounded-full font-black shadow-lg">
                <Navigation className="w-6 h-6 transform rotate-45" />
              </div>
            </div>

            <div className="absolute top-2 right-4 bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl text-[10px] space-y-1 backdrop-blur-sm">
              <div className="text-slate-400">HEADING: <strong className="text-amber-300 font-bold">110° TRUE</strong></div>
              <div className="text-slate-400">SPEED: <strong className="text-cyan-300 font-bold">18.5 KTS</strong></div>
              <div className="text-slate-400">DEPTH: <strong className="text-emerald-400 font-bold">285 M (SAFE)</strong></div>
            </div>
          </div>

          <div className="relative z-10 bg-slate-950/90 border border-slate-800 rounded-xl p-2 flex items-center space-x-3 text-xs">
            <button
              onClick={() => setVideoPlaybackPlaying(!videoPlaybackPlaying)}
              className="p-1.5 bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 font-black shrink-0"
            >
              {videoPlaybackPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <span className="text-[10px] text-slate-400 font-mono shrink-0">01:15 / 02:45</span>

            <input
              type="range"
              min={0}
              max={100}
              value={videoFrameTimeline}
              onChange={(e) => setVideoFrameTimeline(parseInt(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />

            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-cyan-300 font-bold shrink-0">
              60 FPS
            </span>
          </div>
        </div>
      </div>

      {/* FLEET CREW & VESSEL DRILL LEADERBOARD & STANDINGS */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>FLEET CREW & VESSEL DRILL LEADERBOARD & STANDINGS</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={leaderboardSearchQuery}
                onChange={(e) => setLeaderboardSearchQuery(e.target.value)}
                placeholder="Search crew or vessel..."
                className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-white text-xs focus:outline-none w-44"
              />
            </div>

            <select
              value={leaderboardOceanFilter}
              onChange={(e) => setLeaderboardOceanFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-amber-300 font-bold text-xs rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="ALL">All Ocean Basins</option>
              <option value="NW Pacific Basin">NW Pacific Basin</option>
              <option value="Indian Ocean">Indian Ocean</option>
              <option value="North Atlantic Shelf">North Atlantic Shelf</option>
              <option value="South Pacific Basin">South Pacific Basin</option>
            </select>
          </div>
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="space-y-3">
          {drillLeaderboard
            .filter((e) => {
              if (leaderboardOceanFilter !== 'ALL' && e.oceanBasin !== leaderboardOceanFilter) return false;
              if (leaderboardSearchQuery && !e.crewTeam.toLowerCase().includes(leaderboardSearchQuery.toLowerCase()) && !e.vesselName.toLowerCase().includes(leaderboardSearchQuery.toLowerCase())) return false;
              return true;
            })
            .map((entry) => {
              const isFirst = entry.rank === 1;
              const isSecond = entry.rank === 2;
              const isThird = entry.rank === 3;

              return (
                <div
                  key={entry.id}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                    isFirst
                      ? 'bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border-amber-500/60 shadow-lg'
                      : isSecond
                      ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-slate-700'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                      isFirst
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : isSecond
                        ? 'bg-slate-300 text-slate-950 border-white'
                        : isThird
                        ? 'bg-amber-700 text-white border-amber-600'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}>
                      #{entry.rank}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-extrabold text-white text-xs">{entry.crewTeam}</h4>
                        <span className="text-[10px] text-cyan-300 font-bold">({entry.vesselName})</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                          entry.badge === 'FLEET_ELITE'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : entry.badge === 'GOLD_STAR'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}>
                          {entry.badge.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        In Command: <strong className="text-slate-200">{entry.officerInCommand}</strong> • Zone: <strong className="text-slate-300">{entry.oceanBasin}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 text-xs">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 block">AVG SCORE</span>
                      <strong className="text-amber-400 font-black text-sm">{entry.averageScore} PTS</strong>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 block">AVG RESPONSE</span>
                      <strong className="text-cyan-300 font-extrabold">{Math.floor(entry.averageTimeSeconds / 60)}m {entry.averageTimeSeconds % 60}s</strong>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 block">PERFECT DRILLS</span>
                      <strong className="text-emerald-400 font-black">{entry.perfectScoreCount} / {entry.drillsCompleted}</strong>
                    </div>

                    <button
                      onClick={() => handleChallengeCrew(entry)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1"
                    >
                      <Trophy className="w-3.5 h-3.5 text-slate-950" />
                      <span>CHALLENGE</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* BRIDGE DRILL PERFORMANCE ANALYTICS & READINESS MATRIX */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>BRIDGE DRILL PERFORMANCE ANALYTICS & READINESS MATRIX</span>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={analyticsTimeframe}
              onChange={(e) => setAnalyticsTimeframe(e.target.value as '7D' | '30D' | '90D' | '1Y' | 'ALL')}
              className="bg-slate-900 border border-slate-800 text-amber-300 font-bold text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="7D font-bold">Past 7 Days</option>
              <option value="30D">Past 30 Days</option>
              <option value="90D">Past 90 Days</option>
              <option value="1Y">Past 1 Year</option>
              <option value="ALL">All Time History</option>
            </select>

            <button
              onClick={exportPerformanceReportCSV}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center space-x-1.5 hover:bg-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>EXPORT PERFORMANCE AUDIT (CSV)</span>
            </button>
          </div>
        </div>

        {reportExportSuccess && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Performance audit report generated and downloaded for bridge log compliance!</span>
          </div>
        )}

        {/* Readiness Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-slate-400 text-[10px] font-bold block">FLEET COMMAND READINESS INDEX</span>
            <div className="flex items-baseline space-x-2">
              <strong className="text-3xl font-black text-emerald-400">92%</strong>
              <span className="text-emerald-300 text-xs font-bold">GRADE S: EXPERT</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div className="bg-emerald-400 h-full w-[92%]"></div>
            </div>
            <span className="text-[10px] text-slate-400 block">Tested across 12 emergency drills</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-slate-400 text-[10px] font-bold block">AVG EVACUATION RESPONSE TIME</span>
            <div className="flex items-baseline space-x-2">
              <strong className="text-2xl font-black text-cyan-300">2m 45s</strong>
              <span className="text-slate-400 text-[10px]">Target: &lt;3m 30s</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold block">45s faster than SOLAS standard</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-slate-400 text-[10px] font-bold block">DRILL EXECUTION PASS RATE</span>
            <div className="flex items-baseline space-x-2">
              <strong className="text-2xl font-black text-amber-400">91.6%</strong>
              <span className="text-slate-400 text-[10px]">11 / 12 Passed</span>
            </div>
            <span className="text-[10px] text-slate-400 block">1 Retest required for Bridge Beta</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-slate-400 text-[10px] font-bold block">TOP PERFORMING CREW</span>
            <strong className="text-sm font-black text-white block">Bridge Alpha Crew</strong>
            <span className="text-[10px] text-cyan-300 font-bold block">Avg Score: 96.5 PTS • Response: 2m 12s</span>
          </div>
        </div>

        {/* Competency Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Navigation & ECDIS</span>
              <span className="text-emerald-400">95%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[95%]"></div>
            </div>
            <span className="text-[9px] text-slate-400 block">Deep water vector plotting</span>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Engine Throttle Speed</span>
              <span className="text-cyan-300">88%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
              <div className="bg-cyan-400 h-full w-[88%]"></div>
            </div>
            <span className="text-[9px] text-slate-400 block">Full speed ahead response</span>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">VHF / DSC Mayday Relay</span>
              <span className="text-amber-300">90%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
              <div className="bg-amber-400 h-full w-[90%]"></div>
            </div>
            <span className="text-[9px] text-slate-400 block">Channel 16 broadcast speed</span>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Mooring & Deck Safety</span>
              <span className="text-emerald-300">96%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[96%]"></div>
            </div>
            <span className="text-[9px] text-slate-400 block">Berth cast-off protocol</span>
          </div>
        </div>

        {/* Recharts Performance Trend Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <h4 className="font-extrabold text-xs text-white flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>HISTORICAL DRILL SCORE & RESPONSE TIME TREND CHART</span>
            </h4>

            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={() => setPerformanceMetricFilter('score')}
                className={`px-2.5 py-1 rounded-lg border font-bold ${
                  performanceMetricFilter === 'score'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                SCORE (PTS)
              </button>
              <button
                onClick={() => setPerformanceMetricFilter('time')}
                className={`px-2.5 py-1 rounded-lg border font-bold ${
                  performanceMetricFilter === 'time'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                TIME TAKEN (SEC)
              </button>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={drillPerformanceHistory} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <XAxis dataKey="executedAt" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '11px'
                  }}
                />
                <Bar
                  dataKey={performanceMetricFilter === 'score' ? 'score' : 'timeTakenSeconds'}
                  radius={[6, 6, 0, 0]}
                >
                  {drillPerformanceHistory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        performanceMetricFilter === 'score'
                          ? entry.score >= 90
                            ? '#10b981'
                            : entry.score >= 70
                            ? '#f59e0b'
                            : '#ef4444'
                          : '#06b6d4'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Error Remediation Matrix */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <h4 className="font-extrabold text-xs text-white flex items-center space-x-2">
            <Bot className="w-4 h-4 text-amber-400" />
            <span>AI CAPTAIN COMMON DRILL ERROR ANALYSIS & REMEDIATION ADVICE</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <strong className="text-amber-300 font-bold block">1. ECDIS Safety Contour Depth Delay (+35s)</strong>
                <p className="text-slate-300 text-[11px]">Officers frequently forget to manually set contour depth to &gt;250m when leaving port.</p>
              </div>
              <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] rounded-lg font-bold shrink-0">
                AI REMEDIATION: Pre-configure ECDIS macro profile for &quot;TSUNAMI EVAC&quot;
              </span>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <strong className="text-amber-300 font-bold block">2. VHF Channel 16 Mayday Relay Format Error</strong>
                <p className="text-slate-300 text-[11px]">Incorrect speech structure during SECURITE broadcast caused secondary transmission retry.</p>
              </div>
              <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] rounded-lg font-bold shrink-0">
                AI REMEDIATION: Mount quick DSC Mayday template badge beside VHF radio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. FEATURE 1 RE-ENHANCED: SMART TSUNAMI EVACUATION MAP & DEEP-WATER VECTOR */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Map className="w-5 h-5 text-emerald-400" />
            <span>SMART TSUNAMI EVACUATION MAP & DEEP-WATER VECTOR</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setMapLayer('BATHYMETRY')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                mapLayer === 'BATHYMETRY'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              DEPTH CONTOUR (&gt;250M)
            </button>
            <button
              onClick={() => setMapLayer('WAVE_VECTORS')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                mapLayer === 'WAVE_VECTORS'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              TSUNAMI SURGE VECTORS
            </button>
            <button
              onClick={() => setMapLayer('SAFE_ANCHORAGE')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                mapLayer === 'SAFE_ANCHORAGE'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              SAFE ANCHORAGE
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* SVG Canvas */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

            <div className="relative z-10 flex items-center justify-between text-[11px] bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="text-white font-bold">
                  ACTIVE ZONE: {activeEvacuationZone.zoneName}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 text-[10px]">
                <span>HEADING: <strong className="text-emerald-400 font-extrabold">{activeEvacuationZone.evacuationCourseHeading}</strong></span>
                <span>DIST: <strong className="text-cyan-300 font-bold">{activeEvacuationZone.distanceToSafeWaterNM} NM</strong></span>
                <span>SPEED: <strong className="text-amber-300 font-bold">{activeEvacuationZone.requiredSpeedKts} KTS</strong></span>
              </div>
            </div>

            <div className="relative z-10 my-4 h-48 w-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 600 200" fill="none">
                <path d="M 0 0 L 160 0 L 130 200 L 0 200 Z" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                <text x="20" y="30" fill="#f87171" fontSize="10" fontWeight="bold">SHALLOW COASTAL HAZARD (&lt;50m)</text>

                <path d="M 160 0 L 340 0 L 300 200 L 130 200 Z" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="180" y="30" fill="#fbbf24" fontSize="10" fontWeight="bold">SHELF SLOPE (50m - 250m)</text>

                <path d="M 340 0 L 600 0 L 600 200 L 300 200 Z" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
                <text x="360" y="30" fill="#34d399" fontSize="10" fontWeight="bold">SAFE DEEP WATER (&gt;250m)</text>

                <path d="M 10 100 Q 40 80, 70 100 T 130 100" stroke="#06b6d4" strokeWidth="3" fill="none" className="animate-pulse" />
                <path d="M 10 120 Q 40 100, 70 120 T 130 120" stroke="#06b6d4" strokeWidth="2.5" fill="none" className="animate-pulse" />

                <circle cx="80" cy="110" r="10" fill="#ef4444" opacity="0.4" className="animate-ping" />
                <circle cx="80" cy="110" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                <text x="45" y="140" fill="#38bdf8" fontSize="10" fontWeight="bold">🚢 M/V CARGO LEVIATHAN</text>

                <line x1="80" y1="110" x2="480" y2="110" stroke="#10b981" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="485,110 472,104 472,116" fill="#10b981" />

                <circle cx="230" cy="110" r="4" fill="#fbbf24" />
                <text x="210" y="95" fill="#fbbf24" fontSize="9" fontWeight="bold">WP1: SHELF EXIT</text>

                <circle cx="480" cy="110" r="8" fill="#10b981" />
                <text x="440" y="95" fill="#34d399" fontSize="10" fontWeight="extrabold">WP2: SAFE DEEP WATER (&gt;250m)</text>
              </svg>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between text-[10px] bg-slate-950/90 border border-slate-800 rounded-xl p-2 text-slate-300">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span>Coastal Hazard (&lt;50m)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span>Continental Shelf</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>Safe Deep Water Zone (&gt;250m)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                <span>Evacuation Vector (110° True)</span>
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <h4 className="font-extrabold text-xs text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>EVACUATION PROTOCOL</span>
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold">
                  {evacuationSteps.filter((s) => s.completed).length}/{evacuationSteps.length} DONE
                </span>
              </div>

              <div className="space-y-2">
                {evacuationSteps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => toggleCheckstep(step.id)}
                    className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer text-xs transition-all ${
                      step.completed
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {step.completed ? (
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span className="text-[11px] font-medium">{step.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartEvacuation}
              className={`w-full py-2.5 mt-3 rounded-xl font-black text-xs flex items-center justify-center space-x-2 transition-all ${
                evacuationUnderway
                  ? 'bg-emerald-500 text-slate-950 border border-emerald-400'
                  : 'bg-gradient-to-r from-red-500 to-amber-500 text-slate-950 hover:opacity-90'
              }`}
            >
              <Play className="w-4 h-4 text-slate-950" />
              <span>{evacuationUnderway ? 'MANEUVER ACTIVE: ALL STEPS ENGAGED' : 'EXECUTE EMERGENCY DEEP WATER EVACUATION'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7. FEATURE 2 RE-ENHANCED: ALERT INTENSITY TOGGLE & MAGNITUDE / WAVE FILTERS */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span>ALERT INTENSITY TOGGLE & THRESHOLD CONTROLS</span>
          </div>

          <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg">
            SHOWING {filteredEarthquakes.length} OF {earthquakes.length} SEISMIC INCIDENTS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => {
              setAlertIntensityMode('ALL');
              setMinMagnitudeFilter(5.0);
              setMinWaveHeightFilter(0.0);
            }}
            className={`p-3 rounded-xl border font-bold text-xs text-left transition-all ${
              alertIntensityMode === 'ALL'
                ? 'bg-slate-800 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <strong className="block text-white text-xs">ALL INCIDENTS</strong>
            <span className="text-[10px] opacity-75">Show all M5.0+ events</span>
          </button>

          <button
            onClick={() => {
              setAlertIntensityMode('CRITICAL_M7');
              setMinMagnitudeFilter(7.0);
            }}
            className={`p-3 rounded-xl border font-bold text-xs text-left transition-all ${
              alertIntensityMode === 'CRITICAL_M7'
                ? 'bg-red-500/20 border-red-500/60 text-red-300 ring-1 ring-red-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <strong className="block text-red-400 text-xs">CRITICAL MEGATHRUST</strong>
            <span className="text-[10px] opacity-75">Filter M7.0+ Cataclysmic</span>
          </button>

          <button
            onClick={() => {
              setAlertIntensityMode('HIGH_TSUNAMI');
              setMinWaveHeightFilter(3.0);
            }}
            className={`p-3 rounded-xl border font-bold text-xs text-left transition-all ${
              alertIntensityMode === 'HIGH_TSUNAMI'
                ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 ring-1 ring-cyan-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <strong className="block text-cyan-300 text-xs">HIGH TSUNAMI RISK</strong>
            <span className="text-[10px] opacity-75">Wave Height &gt;3.0 Meters</span>
          </button>

          <button
            onClick={() => {
              setAlertIntensityMode('MODERATE');
              setMinMagnitudeFilter(5.0);
            }}
            className={`p-3 rounded-xl border font-bold text-xs text-left transition-all ${
              alertIntensityMode === 'MODERATE'
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 ring-1 ring-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <strong className="block text-emerald-300 text-xs">MODERATE / LIGHT</strong>
            <span className="text-[10px] opacity-75">Filter M5.0 - M6.8 Events</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-slate-300 font-bold">
              <span>MINIMUM MAGNITUDE THRESHOLD:</span>
              <span className="text-amber-400 font-extrabold text-sm">M{minMagnitudeFilter.toFixed(1)}+</span>
            </div>
            <input
              type="range"
              min={5.0}
              max={8.0}
              step={0.1}
              value={minMagnitudeFilter}
              onChange={(e) => setMinMagnitudeFilter(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-slate-300 font-bold">
              <span>MINIMUM TSUNAMI WAVE HEIGHT:</span>
              <span className="text-cyan-300 font-extrabold text-sm">{minWaveHeightFilter.toFixed(1)} Meters</span>
            </div>
            <input
              type="range"
              min={0.0}
              max={5.0}
              step={0.2}
              value={minWaveHeightFilter}
              onChange={(e) => setMinWaveHeightFilter(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 8. NEW FEATURE: OFFLINE ALERT LOGS MANAGER */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>OFFLINE EMERGENCY ALERT LOGS & BROADCAST HISTORY</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={exportAlertLogsCSV}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold flex items-center space-x-1 hover:bg-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT CSV</span>
            </button>

            <button
              onClick={clearAlertLogs}
              className="px-2.5 py-1.5 rounded-xl bg-red-500/10 text-red-300 border border-red-500/30 font-bold flex items-center space-x-1 hover:bg-red-500/20"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR LOGS</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            {['ALL', 'CRITICAL', 'WARNING', 'TELEMETRY', 'EVACUATION', 'DRILL'].map((cat) => (
              <button
                key={cat}
                onClick={() => setLogCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg border font-bold text-[10px] shrink-0 ${
                  logCategoryFilter === cat
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={logSearchQuery}
              onChange={(e) => setLogSearchQuery(e.target.value)}
              placeholder="Search alert logs..."
              className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400 w-48"
            />
          </div>
        </div>

        {/* Add Custom Log Entry Form */}
        <form onSubmit={handleAddManualAlertLog} className="flex flex-col sm:flex-row gap-2">
          <select
            value={newLogCategory}
            onChange={(e) => setNewLogCategory(e.target.value as OfflineAlertLogEntry['category'])}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
          >
            <option value="WARNING">WARNING</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="TELEMETRY">TELEMETRY</option>
            <option value="EVACUATION">EVACUATION</option>
            <option value="DRILL">DRILL</option>
          </select>

          <input
            type="text"
            value={newLogMessage}
            onChange={(e) => setNewLogMessage(e.target.value)}
            placeholder="Type manual bridge alert log entry..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center space-x-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ADD LOG</span>
          </button>
        </form>

        {/* Alert Logs Table */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {filteredAlertLogs.length === 0 ? (
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center text-xs text-slate-500">
              No alert log records found matching your query.
            </div>
          ) : (
            filteredAlertLogs.map((log) => {
              const isCrit = log.category === 'CRITICAL';
              const isWarn = log.category === 'WARNING';
              const isEvac = log.category === 'EVACUATION';

              return (
                <div
                  key={log.id}
                  className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-start space-x-2.5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold border shrink-0 mt-0.5 ${
                      isCrit
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : isWarn
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : isEvac
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {log.category}
                    </span>

                    <div>
                      <p className="text-white font-medium text-xs leading-snug">{log.message}</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">SRC: {log.source}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 shrink-0 font-mono self-end sm:self-center">
                    {log.timestamp}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 9. OFFLINE CRISIS CACHE MANAGER & EXPORT */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <HardDriveDownload className="w-5 h-5 text-amber-400" />
            <span>OFFLINE CRISIS CACHE & DATASET EXPORT ENGINE</span>
          </div>

          <span className="px-2.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            BRIDGE SATELLITE DISASTER READY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-slate-400 text-[10px] font-bold block">LOCAL CACHE STORAGE STATUS</span>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <strong className="text-white text-sm font-bold">3.2 MB LOCAL CACHE PERSISTED</strong>
            </div>
            <span className="text-[10px] text-slate-400 block">Last Local Sync: {offlineCacheTimestamp}</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-slate-400 text-[10px] font-bold block">OFFLINE BRIDGE PROTOCOL</span>
            <div className="flex items-center space-x-2">
              <Signal className="w-5 h-5 text-amber-400 shrink-0" />
              <strong className="text-amber-300 text-sm font-bold">SATELLITE FALLBACK ACTIVE</strong>
            </div>
            <span className="text-[10px] text-slate-400 block">Inmarsat-C & Iridium SBD Sync</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between space-y-3">
            <div>
              <span className="text-slate-400 text-[10px] font-bold block">EXPORT CRISIS DATABASE</span>
              <p className="text-[10px] text-slate-300 mt-1">Download complete offline JSON database for captain bridge tablets.</p>
            </div>

            <button
              onClick={exportCrisisDatasetJSON}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>EXPORT CRISIS DATASET (JSON)</span>
            </button>
          </div>
        </div>

        {downloadSuccessToast && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Crisis dataset exported successfully! Available on offline Captain Bridge tablet.</span>
          </div>
        )}
      </div>

      {/* AUTO ARCHIVES & DATA BUNDLING ENGINE */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Archive className="w-5 h-5 text-cyan-400" />
            <span>AUTOMATED LOG ARCHIVAL & COMPRESSED BUNDLE ENGINE</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-bold">AUTO-ARCHIVE:</span>
              <button
                onClick={() => setIsAutoArchiveEnabled(!isAutoArchiveEnabled)}
                className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                  isAutoArchiveEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-red-500/20 text-red-300 border-red-500/40'
                }`}
              >
                {isAutoArchiveEnabled ? 'ENABLED (ACTIVE)' : 'PAUSED'}
              </button>
            </div>

            <div className="flex items-center space-x-1">
              <span className="text-slate-400 font-bold">INTERVAL:</span>
              <select
                value={autoArchiveDays}
                onChange={(e) => setAutoArchiveDays(parseInt(e.target.value))}
                className="bg-slate-900 border border-slate-800 text-cyan-300 font-bold text-xs rounded-lg px-2 py-0.5 focus:outline-none"
              >
                <option value={7}>7 Days</option>
                <option value={14}>14 Days</option>
                <option value={30}>30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {archiveSuccessMsg && (
          <div className="p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-xl text-cyan-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{archiveSuccessMsg}</span>
          </div>
        )}

        {/* Manual Archive Creation Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleManualCreateArchiveBundle('COMPLETED_DRILL')}
            className="p-3 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left space-y-1 transition-all group"
          >
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-white group-hover:text-amber-300">Archive Completed Drills</strong>
              <Download className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-[10px] text-slate-400">Bundle {drillPerformanceHistory.length} drill performance records into JSON</p>
          </button>

          <button
            onClick={() => handleManualCreateArchiveBundle('VOICE_TRANSCRIPT')}
            className="p-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-left space-y-1 transition-all group"
          >
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-white group-hover:text-cyan-300">Archive CVR Voice Logs</strong>
              <Download className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-[10px] text-slate-400">Bundle {voiceLogs.length} bridge cockpit voice transcripts</p>
          </button>

          <button
            onClick={() => handleManualCreateArchiveBundle('ALERT_LOG')}
            className="p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-left space-y-1 transition-all group"
          >
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-white group-hover:text-emerald-300">Archive SOLAS Alert Logs</strong>
              <Download className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[10px] text-slate-400">Bundle {alertLogs.length} emergency broadcast log entries</p>
          </button>
        </div>

        {/* Archived Bundles List */}
        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-bold block">SAVED ARCHIVE BUNDLES ({archivedBundles.length})</span>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {archivedBundles.map((bundle) => (
              <div key={bundle.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 text-[9px] font-bold">
                      {bundle.category}
                    </span>
                    <strong className="text-white font-bold">{bundle.title}</strong>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Archived: {bundle.archiveDate} • Size: ~{(bundle.compressedSizeBytes / 1024).toFixed(1)} KB ({bundle.itemCount} Items)
                  </span>
                </div>

                <a
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(bundle.originalDataJson)}`}
                  download={`${bundle.id}_archive_bundle.json`}
                  className="px-2.5 py-1.5 bg-slate-950 text-cyan-300 border border-cyan-500/30 rounded-lg text-[10px] font-bold hover:bg-slate-800 flex items-center space-x-1 shrink-0"
                >
                  <Download className="w-3 h-3 text-cyan-400" />
                  <span>DOWNLOAD BUNDLE</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. HISTORICAL IMPACT ANALYTICS */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <span>HISTORICAL MEGATHRUST EARTHQUAKE & TSUNAMI IMPACT CHARTS</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setChartMetric('waveHeight')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                chartMetric === 'waveHeight'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              WAVE HEIGHT (M)
            </button>
            <button
              onClick={() => setChartMetric('magnitude')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                chartMetric === 'magnitude'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              MAGNITUDE (M)
            </button>
            <button
              onClick={() => setChartMetric('casualties')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                chartMetric === 'casualties'
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              ECONOMIC DAMAGE ($B)
            </button>
          </div>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HISTORICAL_IMPACT_DATASET} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <XAxis dataKey="eventName" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc', fontSize: '11px' }}
              />
              <Bar
                dataKey={
                  chartMetric === 'waveHeight'
                    ? 'maxWaveHeightMeters'
                    : chartMetric === 'magnitude'
                    ? 'magnitude'
                    : 'economicDamageBillionUSD'
                }
                radius={[6, 6, 0, 0]}
              >
                {HISTORICAL_IMPACT_DATASET.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      chartMetric === 'waveHeight'
                        ? '#22d3ee'
                        : chartMetric === 'magnitude'
                        ? '#fbbf24'
                        : '#f87171'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 11. MMI SHAKING INTENSITY MATRIX & PEAK GROUND ACCELERATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
              <Activity className="w-5 h-5 text-amber-400" />
              <span>MODIFIED MERCALLI INTENSITY (MMI) SHAKING MATRIX</span>
            </div>
            <span className="text-[10px] text-amber-400 font-bold">SEISMIC GAUGE</span>
          </div>

          <div className="space-y-2">
            {MMI_INTENSITY_SCALE_INFO.map((mmi, idx) => {
              const isSelected = selectedMmiIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedMmiIndex(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-amber-400 scale-[1.01]' : ''
                  } ${mmi.color}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-xs font-black">GRADE {mmi.grade}: {mmi.perceived}</strong>
                      <span className="text-[10px] block opacity-80 mt-0.5">{mmi.damage}</span>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <span className="text-[10px] block font-bold">PGA: {mmi.pgaG}</span>
                      <span className="text-[9px] block opacity-75">PGV: {mmi.pgvCmS}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>SEISMIC ALERT PEAK GROUND ACCELERATION (PGA)</span>
            </div>
            <span className="text-[10px] text-cyan-300 font-bold">TELEMETRY</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 text-[10px] block">PEAK ACCELERATION</span>
              <strong className="text-lg font-black text-amber-400">{pgaPeakG}% g</strong>
              <span className="text-[9px] text-slate-500 block">Severe Ground Shaking</span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 text-[10px] block">DART WAVE HEIGHT</span>
              <strong className="text-lg font-black text-cyan-300">4.8 Meters</strong>
              <span className="text-[9px] text-slate-500 block">Buoy #21418 Peak Surge</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
            <span className="text-slate-400 block font-bold">ADJUST PGA TELEMETRY TEST:</span>
            <input
              type="range"
              min={5}
              max={80}
              value={pgaPeakG}
              onChange={(e) => setPgaPeakG(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Light (5% g)</span>
              <span>Severe (35% g)</span>
              <span>Cataclysmic (80% g)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 12. ACTIVE TSUNAMI ZONES LIST */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Waves className="w-5 h-5 text-cyan-400" />
            <span>ACTIVE TSUNAMI WARNING ZONES (NOAA & PTWC FEED)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 font-bold">
            DART NETWORK CONNECTED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {tsunamiZones.map((zone) => {
            const isWarning = zone.alertLevel === 'WARNING';
            const isAdvisory = zone.alertLevel === 'ADVISORY';

            return (
              <div
                key={zone.id}
                className={`p-4 rounded-xl border space-y-3 relative overflow-hidden transition-all ${
                  isWarning
                    ? 'bg-red-950/40 border-red-500/50 hover:border-red-400'
                    : isAdvisory
                    ? 'bg-amber-950/40 border-amber-500/50 hover:border-amber-400'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isWarning
                        ? 'bg-red-500 text-slate-950 border-red-400 animate-pulse'
                        : isAdvisory
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    }`}>
                      TSUNAMI {zone.alertLevel}
                    </span>
                    <h3 className="font-extrabold text-white text-xs mt-2">{zone.zoneName}</h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold">WAVE ETA</span>
                    <span className="text-xs font-black text-red-400 flex items-center justify-end space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{zone.etaCountdownMinutes > 0 ? `${zone.etaCountdownMinutes} MINS` : 'LANDFALL NOW'}</span>
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-950/90 rounded-lg border border-slate-800/80 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Epicenter Origin:</span>
                    <strong className="text-white">{zone.epicenterLocation}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Max Wave Height:</span>
                    <strong className="text-cyan-300 font-extrabold">{zone.maxWaveHeightMeters} Meters</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Offshore Safe Depth:</span>
                    <strong className="text-emerald-400 font-bold">&gt;{zone.recommendedOffshoreDepthMeters}m Deep Water</strong>
                  </div>
                </div>

                <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-lg space-y-1 text-[10px]">
                  <span className="text-red-300 font-bold flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                    <span>BRIDGE DIRECTIVE:</span>
                  </span>
                  <p className="text-slate-200 leading-tight">{zone.bridgeActionProtocol}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 13. FILTERED EARTHQUAKE INCIDENTS LIST */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Activity className="w-5 h-5 text-amber-400" />
            <span>GLOBAL EARTHQUAKE INCIDENTS FEED (USGS SEISMIC TELEMETRY)</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ports or seismic zones..."
              className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400 w-52"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredEarthquakes.map((eq) => {
            const isSelected = selectedEventDetails?.id === eq.id;
            const isMajor = eq.magnitude >= 7.0;

            return (
              <div
                key={eq.id}
                onClick={() => setSelectedEventDetails(eq)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/40'
                    : isMajor
                    ? 'bg-slate-900/90 border-red-500/40 hover:border-red-400'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-2 rounded-xl text-center font-black text-sm shrink-0 ${
                      isMajor ? 'bg-red-500 text-slate-950 animate-pulse' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      <span className="block text-[9px] font-bold uppercase text-slate-900">MAGNITUDE</span>
                      <span>M{eq.magnitude.toFixed(1)}</span>
                    </div>

                    <div>
                      <h4 className="text-white text-xs font-extrabold flex items-center space-x-2">
                        <span>{eq.location}</span>
                        {isMajor && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] bg-red-500/20 text-red-300 border border-red-500/40 uppercase font-black">
                            MEGATHRUST ALERT
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {eq.oceanZone} • Depth: {eq.depthKm} km • GPS: {eq.coordinates}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">TSUNAMI POTENTIAL</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                        eq.tsunamiPotential === 'HIGH'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : eq.tsunamiPotential === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {eq.tsunamiPotential} RISK ({eq.tsunamiWaveHeightM}m WAVE)
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono shrink-0">{eq.timestamp}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-[11px] animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-amber-400 font-bold block mb-1">AFFECTED COMMERCIAL PORTS:</span>
                        <div className="flex flex-wrap gap-1">
                          {eq.affectedPorts.map((p, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-semibold">
                              ⚓ {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-cyan-400 font-bold block mb-1">SEISMIC FAULT MECHANISM:</span>
                        <p className="text-slate-300 font-mono text-[10px]">{eq.faultType}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-1">
                      <span className="text-amber-300 font-bold flex items-center space-x-1 text-[11px]">
                        <Bot className="w-3.5 h-3.5 text-amber-400" />
                        <span>AI CAPTAIN EVACUATION ADVISORY:</span>
                      </span>
                      <p className="text-slate-200 text-xs leading-relaxed">{eq.aiEvacuationAdvice}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 13. MARITIME WEATHER API WORLD WIDE */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-sky-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">NOAA GFS &amp; COPERNICUS WAVEWATCH III</span>
              <span className="bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                LIVE API JSON ENDPOINT STREAM
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Maritime Weather API World Wide</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Real-time wave spectrum, sea surface temperature (SST), barometric pressure, and surface gale wind vectors across global maritime bottlenecks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
            {[
              { id: 'MALACCA', label: '🇲🇾 Malacca' },
              { id: 'SUEZ', label: '🇪🇬 Suez Canal' },
              { id: 'PANAMA', label: '🇵🇦 Panama' },
              { id: 'ROTTERDAM', label: '🇳🇱 Rotterdam' },
              { id: 'YOKOHAMA', label: '🇯🇵 Yokohama' },
              { id: 'ENGLISH_CHANNEL', label: '🇬🇧 Dover' }
            ].map((wp) => (
              <button
                key={wp.id}
                onClick={() => setSelectedWeatherWaypoint(wp.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedWeatherWaypoint === wp.id
                    ? 'bg-sky-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {wp.label}
              </button>
            ))}
          </div>
        </div>

        {/* WEATHER API DATA MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* TELEMETRY GAUGES */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Signif. Wave Height (Hs)</span>
              <strong className="text-xl text-sky-300 font-black block">
                {selectedWeatherWaypoint === 'MALACCA' && '1.8 Meters'}
                {selectedWeatherWaypoint === 'SUEZ' && '0.9 Meters'}
                {selectedWeatherWaypoint === 'PANAMA' && '2.2 Meters'}
                {selectedWeatherWaypoint === 'ROTTERDAM' && '3.6 Meters'}
                {selectedWeatherWaypoint === 'YOKOHAMA' && '4.2 Meters'}
                {selectedWeatherWaypoint === 'ENGLISH_CHANNEL' && '2.8 Meters'}
              </strong>
              <span className="text-[9px] text-slate-400 block">Peak Period: 11.2s</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Surface Wind Vector</span>
              <strong className="text-xl text-emerald-400 font-black block">
                {selectedWeatherWaypoint === 'MALACCA' && '18 Kts SE'}
                {selectedWeatherWaypoint === 'SUEZ' && '24 Kts NW'}
                {selectedWeatherWaypoint === 'PANAMA' && '15 Kts NE'}
                {selectedWeatherWaypoint === 'ROTTERDAM' && '38 Kts WSW'}
                {selectedWeatherWaypoint === 'YOKOHAMA' && '44 Kts ENE'}
                {selectedWeatherWaypoint === 'ENGLISH_CHANNEL' && '31 Kts SW'}
              </strong>
              <span className="text-[9px] text-slate-400 block">Gusts: +14 Kts</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Barometric Pressure</span>
              <strong className="text-xl text-amber-400 font-black block">
                {selectedWeatherWaypoint === 'MALACCA' && '1008 hPa'}
                {selectedWeatherWaypoint === 'SUEZ' && '1014 hPa'}
                {selectedWeatherWaypoint === 'PANAMA' && '1010 hPa'}
                {selectedWeatherWaypoint === 'ROTTERDAM' && '994 hPa'}
                {selectedWeatherWaypoint === 'YOKOHAMA' && '982 hPa'}
                {selectedWeatherWaypoint === 'ENGLISH_CHANNEL' && '998 hPa'}
              </strong>
              <span className="text-[9px] text-slate-400 block">Trend: Falling Rapidly</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Sea Surface Temp (SST)</span>
              <strong className="text-xl text-cyan-300 font-black block">
                {selectedWeatherWaypoint === 'MALACCA' && '29.4 °C'}
                {selectedWeatherWaypoint === 'SUEZ' && '26.1 °C'}
                {selectedWeatherWaypoint === 'PANAMA' && '28.8 °C'}
                {selectedWeatherWaypoint === 'ROTTERDAM' && '15.2 °C'}
                {selectedWeatherWaypoint === 'YOKOHAMA' && '22.6 °C'}
                {selectedWeatherWaypoint === 'ENGLISH_CHANNEL' && '16.8 °C'}
              </strong>
              <span className="text-[9px] text-slate-400 block">Anomaly: +1.2 °C</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Current Velocity</span>
              <strong className="text-xl text-purple-400 font-black block">2.4 Knots</strong>
              <span className="text-[9px] text-slate-400 block">Direction: 045° True</span>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Visibility &amp; Fog</span>
              <strong className="text-xl text-slate-200 font-black block">8.5 NM</strong>
              <span className="text-[9px] text-emerald-400 block">Clear Navigation</span>
            </div>
          </div>

          {/* JSON API ENDPOINT VIEWER */}
          <div className="lg:col-span-5 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px]">API ENDPOINT PAYLOAD INSPECTOR</span>
              <span className="text-emerald-400 text-[10px] font-bold">200 OK • REST JSON</span>
            </div>
            <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] text-sky-300 font-mono overflow-x-auto leading-tight max-h-[160px]">
{`{
  "endpoint": "https://api.maritime-weather.org/v3/live",
  "waypoint": "${selectedWeatherWaypoint}",
  "coordinates": {"lat": 1.3521, "lng": 103.8198},
  "wave_spectrum": {
    "significant_wave_height_m": ${selectedWeatherWaypoint === 'YOKOHAMA' ? 4.2 : 1.8},
    "peak_period_s": 11.2,
    "swell_direction_deg": 142
  },
  "atmospheric": {
    "pressure_hpa": ${selectedWeatherWaypoint === 'YOKOHAMA' ? 982 : 1008},
    "surface_wind_kts": ${selectedWeatherWaypoint === 'YOKOHAMA' ? 44 : 18}
  },
  "status": "VALIDATED_SATELLITE_FEED"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 14. SEA LEVEL RISE MONITOR WORLD WIDE */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-teal-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">JASON-3 &amp; SENTINEL-6 SATELLITE ALTIMETRY</span>
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                3.4 MM/YR BASELINE RISE
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Sea Level Rise Monitor World Wide</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Global thermal ocean expansion and ice sheet melt projection models evaluating port seawall defenses and low-lying coastal exposure.
            </p>
          </div>

          {/* PROJECTION YEAR SLIDER */}
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-1 shrink-0 w-full sm:w-64">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold">PROJECTION YEAR:</span>
              <strong className="text-teal-300 text-sm font-black">{seaLevelYearProjection} AD</strong>
            </div>
            <input
              type="range"
              min={2026}
              max={2060}
              value={seaLevelYearProjection}
              onChange={(e) => setSeaLevelYearProjection(parseInt(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500">
              <span>2026</span>
              <span>2040</span>
              <span>2060</span>
            </div>
          </div>
        </div>

        {/* SEA LEVEL PROJECTION STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">PROJECTED SEA LEVEL RISE</span>
            <strong className="text-2xl text-teal-300 font-black block">
              +{((seaLevelYearProjection - 2026) * 0.72 + 2.1).toFixed(1)} cm
            </strong>
            <p className="text-[11px] text-slate-400 font-sans">Accumulated mean global sea level anomaly above 2000 datum baseline.</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">THERMAL OCEAN EXPANSION</span>
            <strong className="text-2xl text-cyan-400 font-black block">
              {((seaLevelYearProjection - 2026) * 0.45 + 1.2).toFixed(1)} cm
            </strong>
            <p className="text-[11px] text-slate-400 font-sans">Steric sea level rise due to upper ocean heat content absorption.</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">ICE SHEET MELT CONTRIBUTION</span>
            <strong className="text-2xl text-sky-400 font-black block">
              {((seaLevelYearProjection - 2026) * 0.27 + 0.9).toFixed(1)} cm
            </strong>
            <p className="text-[11px] text-slate-400 font-sans">Greenland &amp; West Antarctic ice mass loss discharge into ocean basins.</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">HIGH-RISK PORTS AT RISK</span>
            <strong className="text-2xl text-amber-400 font-black block">42 Ports</strong>
            <p className="text-[11px] text-slate-400 font-sans">Terminals requiring seawall elevation &amp; storm barrier reinforcement.</p>
          </div>
        </div>

        {/* VULNERABLE LOW-LYING PORTS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { name: 'Tuvalu & Funafuti Atoll', elevationM: 1.2, barrierStatus: 'CRITICAL_RISK', floodRisk: '92% Inundation' },
            { name: 'Maldives Male Deepwater Hub', elevationM: 1.5, barrierStatus: 'HIGH_RISK', floodRisk: '84% Inundation' },
            { name: 'Venice Port & MOSE Barrier', elevationM: 2.1, barrierStatus: 'MONITORED', floodRisk: 'MOSE Active Gate' },
            { name: 'Chittagong Container Berth', elevationM: 2.8, barrierStatus: 'HIGH_RISK', floodRisk: '76% Surge Risk' },
            { name: 'Rotterdam Maasvlakte Haven', elevationM: 4.5, barrierStatus: 'PROTECTED', floodRisk: 'Storm Surge Surge Barrier' },
            { name: 'Port of New Orleans Terminal', elevationM: 1.8, barrierStatus: 'MODERATE_RISK', floodRisk: '68% Levee Stress' }
          ].map((port, idx) => (
            <div key={idx} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-start">
                <strong className="text-white font-bold block text-xs">{port.name}</strong>
                <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                  port.barrierStatus === 'CRITICAL_RISK' ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {port.barrierStatus}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Elev: <strong className="text-slate-200">{port.elevationM}m ASL</strong></span>
                <span className="text-teal-400 font-bold">{port.floodRisk}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 15. DISASTER RECOVERY GUIDE */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">POST-DISASTER OPERATIONAL PLAYBOOK</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                IMO &amp; MARITIME PROTOCOLS
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Disaster Recovery Guide</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Step-by-step emergency recovery protocols for vessel captains, harbor masters, and port terminal operators post-earthquake or tsunami.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
            {[
              { id: 'PORT_REOPENING', label: '⚓ Port Re-opening' },
              { id: 'HULL_INSPECTION', label: '🛠️ Hull Inspection' },
              { id: 'SATCOM_RECOVERY', label: '📡 SatCom Recovery' },
              { id: 'HAZMAT_CONTAINMENT', label: '🛢️ Hazmat Spill' }
            ].map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveRecoveryStep(step.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeRecoveryStep === step.id
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* STEP GUIDE DETAIL CARD */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          {activeRecoveryStep === 'PORT_REOPENING' && (
            <div className="space-y-3">
              <strong className="text-emerald-400 font-bold text-sm block">1. PORT RE-OPENING &amp; NAVIGATION CHANNEL CLEARANCE PROTOCOL</strong>
              <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc pl-5">
                <li>Deploy multibeam bathymetric sonar survey vessels to scan navigation channels for submerged shipping containers or debris.</li>
                <li>Verify navigational buoy positions via GPS differential survey; re-anchor adrift channel markers.</li>
                <li>Conduct dockside quay wall structural integrity check before allowing vessel berth mooring.</li>
              </ul>
            </div>
          )}

          {activeRecoveryStep === 'HULL_INSPECTION' && (
            <div className="space-y-3">
              <strong className="text-cyan-400 font-bold text-sm block">2. VESSEL HULL &amp; PROPULSION POST-SHAKING CHECKLIST</strong>
              <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc pl-5">
                <li>Inspect double-bottom ballast tanks and bilge wells for hull micro-cracks or water ingress following ground vibration.</li>
                <li>Check sea chest suction strainers for debris or sediment clogging caused by seabed wave agitation.</li>
                <li>Perform acoustic propeller shaft and rudder stock alignment check prior to main engine startup.</li>
              </ul>
            </div>
          )}

          {activeRecoveryStep === 'SATCOM_RECOVERY' && (
            <div className="space-y-3">
              <strong className="text-amber-400 font-bold text-sm block">3. EMERGENCY SATCOM &amp; TELECOM RE-ESTABLISHMENT</strong>
              <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc pl-5">
                <li>Switch primary satcom array to secondary Inmarsat / Starlink backup antennas if main radome sustained alignment shift.</li>
                <li>Reset AIS transponder safety text broadcast MMSI register and transmit 'ALL WELL' status to Coast Guard.</li>
                <li>Establish VHF Channel 16 &amp; DSC Channel 70 watch for distress calls from local fishing or pleasure craft.</li>
              </ul>
            </div>
          )}

          {activeRecoveryStep === 'HAZMAT_CONTAINMENT' && (
            <div className="space-y-3">
              <strong className="text-red-400 font-bold text-sm block">4. HAZARDOUS CARGO &amp; OIL SPILL CONTAINMENT ACTION</strong>
              <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc pl-5">
                <li>Deploy inflatable floating oil containment booms around vessel berths if bunker fuel line ruptures occur.</li>
                <li>Activate shipboard SOPEP (Shipboard Oil Pollution Emergency Plan) team and notify local port authority response team.</li>
                <li>Isolate hazardous container stacks on quay apron and verify seal integrity for dangerous goods (IMDG Code).</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 16. COASTAL HEATMAP */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">GLOBAL COASTAL VULNERABILITY INDEX</span>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                HIGH-RESOLUTION HEATMAP OVERLAY
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Coastal Heatmap</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Interactive global heat mapping of coastal erosion rates, storm surge inundation zones, wave energy density, and exposed population counts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
            {[
              { id: 'STORM_SURGE_HEIGHT', label: '🌊 Surge Height' },
              { id: 'EROSION_RATE', label: '🏞️ Erosion Rate' },
              { id: 'WAVE_ENERGY', label: '⚡ Wave Energy' },
              { id: 'POPULATION_EXPOSURE', label: '👥 Population Risk' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setCoastalHeatmapMetric(m.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  coastalHeatmapMetric === m.id
                    ? 'bg-purple-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* COASTAL REGION HEATMAP BARS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            { region: 'East China Sea & Shanghai Delta', value: '5.8m Surge Peak', level: 92, status: 'CRITICAL_HEATMAP' },
            { region: 'Bay of Bengal & Ganges Delta', value: '6.4m Surge Peak', level: 98, status: 'CRITICAL_HEATMAP' },
            { region: 'Gulf of Mexico & Mississippi Delta', value: '4.2m Surge Peak', level: 78, status: 'HIGH_HEATMAP' },
            { region: 'North Sea & Rhine-Meuse Delta', value: '3.6m Surge Peak', level: 64, status: 'MODERATE_HEATMAP' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <strong className="text-white font-bold">{item.region}</strong>
                <span className="text-purple-400 font-mono font-bold">{item.value}</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.level > 85 ? 'bg-gradient-to-r from-red-500 to-purple-500' : 'bg-gradient-to-r from-amber-500 to-purple-400'
                  }`}
                  style={{ width: `${item.level}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Vulnerability Score: <strong className="text-white">{item.level} / 100</strong></span>
                <span className="text-purple-300 font-bold">Heat Density: HIGH</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 17. GLOBAL CLIMATE HISTORY TRENDS */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">MULTI-DECADAL SOVEREIGN DATASET</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                1980 – 2050 AD TIMELINE
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Global Climate History Trends</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Historical multi-decadal analysis comparing ocean surface heat anomalies, CO₂ PPM, global steric sea level rise, and major tropical cyclone frequency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* METRIC TOGGLES */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
              {[
                { id: 'SST_ANOMALY', label: '🌡️ SST Anomaly (°C)' },
                { id: 'CO2_CONCENTRATION', label: '🌫️ CO₂ (PPM)' },
                { id: 'SEA_LEVEL_RISE', label: '🌊 Sea Level (mm)' },
                { id: 'MAJOR_CYCLONES', label: '🌀 Cat 4/5 Cyclones' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setClimateHistoryMetric(m.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    climateHistoryMetric === m.id
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* HORIZON TOGGLES */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
              {[
                { id: '1980_2026', label: '1980–2026' },
                { id: '2000_2026', label: '2000–2026' },
                { id: 'PROJECTION_2050', label: '2026–2050' }
              ].map((h) => (
                <button
                  key={h.id}
                  onClick={() => setClimateHistoryHorizon(h.id as any)}
                  className={`px-2.5 py-1 rounded font-bold transition-all text-[11px] ${
                    climateHistoryHorizon === h.id
                      ? 'bg-slate-700 text-amber-400 border border-amber-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HISTORICAL TREND CHART */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-4">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={GLOBAL_CLIMATE_HISTORY_DATA.filter((d) => {
                  const yr = parseInt(d.year);
                  if (climateHistoryHorizon === '2000_2026') return yr >= 2000 && yr <= 2026;
                  if (climateHistoryHorizon === 'PROJECTION_2050') return yr >= 2026;
                  return yr <= 2026;
                })}
              >
                <defs>
                  <linearGradient id="climateTrendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-amber-500 p-3 rounded-xl text-xs space-y-1 font-mono shadow-2xl">
                          <strong className="text-amber-400 block font-black">{data.year} TELEMETRY RECORD</strong>
                          <div className="text-white">
                            <span>SST Anomaly: </span>
                            <strong className="text-red-400">+{data.sstAnomaly}°C</strong>
                          </div>
                          <div className="text-white">
                            <span>CO₂ Level: </span>
                            <strong className="text-cyan-400">{data.co2Ppm} PPM</strong>
                          </div>
                          <div className="text-white">
                            <span>Sea Level Rise: </span>
                            <strong className="text-purple-400">+{data.seaLevelMm} mm</strong>
                          </div>
                          <div className="text-white">
                            <span>Cat 4/5 Cyclones: </span>
                            <strong className="text-amber-300">{data.cyclonesCount} / Year</strong>
                          </div>
                          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 italic">
                            📌 {data.milestone}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={1.0} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '1.0°C Threshold', fill: '#ef4444', fontSize: 10 }} />
                <Area
                  type="monotone"
                  dataKey={
                    climateHistoryMetric === 'SST_ANOMALY'
                      ? 'sstAnomaly'
                      : climateHistoryMetric === 'CO2_CONCENTRATION'
                      ? 'co2Ppm'
                      : climateHistoryMetric === 'SEA_LEVEL_RISE'
                      ? 'seaLevelMm'
                      : 'cyclonesCount'
                  }
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#climateTrendGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* CLIMATE INFLECTION MILESTONE BADGES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {[
              { year: '1998', title: '1997-98 Super El Niño', value: '+0.52°C SST', icon: '🔥' },
              { year: '2015', title: 'Paris Climate Accord', value: '401 PPM CO₂', icon: '📜' },
              { year: '2023', title: 'Record Marine Heatwave', value: '+1.15°C SST', icon: '⚡' },
              { year: '2026', title: 'Sovereign AI Telemetry', value: '+122 mm Sea Level', icon: '📡' }
            ].map((m, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold">{m.icon} {m.year}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">INFLECTION</span>
                </div>
                <strong className="text-white font-bold block text-[11px]">{m.title}</strong>
                <span className="text-amber-300 font-mono text-[10px]">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 18. GLOBAL EVACUATION PATH FINDER */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">REAL-TIME A* MARITIME PATHFINDER</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                DEEP WATER ESCAPE ENGINE
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Global Evacuation Path Finder</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Calculates real-time orthogonal deepwater navigation corridors out of dangerous tsunami surge and storm inundation zones.
            </p>
          </div>

          {/* CORRIDOR SELECTOR BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'NANKAI_TOKYO', label: '🇯🇵 Tokyo / Nankai' },
              { id: 'SUNDA_JAKARTA', label: '🇮🇩 Jakarta / Sunda' },
              { id: 'CASCADIA_SEATTLE', label: '🇺🇸 Seattle / Cascadia' },
              { id: 'BENGAL_CHITTAGONG', label: '🇧🇩 Chittagong / Bengal' }
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setEvacPathCorridor(c.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  evacPathCorridor === c.id
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE CORRIDOR PARAMETERS & CONTROLS */}
        {(() => {
          const corridor = EVAC_CORRIDOR_DATA[evacPathCorridor];
          const etaHours = (corridor.distanceNM / evacVesselSpeedKts).toFixed(1);
          const fuelMtons = (corridor.distanceNM * 0.42).toFixed(1);

          return (
            <div className="space-y-6">
              {/* METRIC CARDS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">DISTANCE TO DEEP TRENCH</span>
                  <strong className="text-emerald-400 text-lg font-black block">{corridor.distanceNM} NM</strong>
                  <span className="text-[10px] text-slate-500">Target Depth &gt; 1,500m</span>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">TIME TO DEEP WATER (ETA)</span>
                  <strong className="text-cyan-400 text-lg font-black block">{etaHours} Hours</strong>
                  <span className="text-[10px] text-slate-500">At {evacVesselSpeedKts} kts speed</span>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">RECOMMENDED HEADING</span>
                  <strong className="text-amber-400 text-lg font-black block">{corridor.safeHeading}</strong>
                  <span className="text-[10px] text-slate-500">Orthogonal Escape Vector</span>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">ESTIMATED FUEL CONSUMPTION</span>
                  <strong className="text-purple-400 text-lg font-black block">{fuelMtons} M/Tons</strong>
                  <span className="text-[10px] text-slate-500">MGO / VLSFO Emergency Burn</span>
                </div>
              </div>

              {/* SPEED & SEA STATE SLIDERS */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-bold">Vessel Sea Speed: <strong className="text-emerald-400">{evacVesselSpeedKts} kts</strong></span>
                    <span className="text-[10px] text-slate-500">Recommended Min: {corridor.recommendedMinSpeed} kts</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={28}
                    step={0.5}
                    value={evacVesselSpeedKts}
                    onChange={(e) => setEvacVesselSpeedKts(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-slate-300 font-bold block">Sea State Condition:</span>
                  <div className="flex items-center space-x-2">
                    {[
                      { id: 'NORMAL', label: 'Normal Sea' },
                      { id: 'SEVERE_SURGE', label: 'Storm Surge (4.5m)' },
                      { id: 'MEGATHRUST_TSUNAMI', label: 'Megathrust Tsunami' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setEvacSeaState(s.id as any)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                          evacSeaState === s.id
                            ? 'bg-red-600 text-white font-black'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* WAYPOINT STEP TABLE */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="p-3 bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-300 flex justify-between items-center">
                  <span>EVACUATION WAYPOINT CORRIDOR MANIFEST</span>
                  <span className="text-emerald-400 text-[10px]">{corridor.name}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-3">STEP</th>
                        <th className="p-3">WAYPOINT NAME</th>
                        <th className="p-3">LATITUDE</th>
                        <th className="p-3">LONGITUDE</th>
                        <th className="p-3">DEPTH (M)</th>
                        <th className="p-3">SAFETY MARGIN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {corridor.waypoints.map((wp) => (
                        <tr key={wp.step} className="hover:bg-slate-800/50">
                          <td className="p-3 font-black text-emerald-400">#0{wp.step}</td>
                          <td className="p-3 font-bold text-white">{wp.name}</td>
                          <td className="p-3">{wp.lat}</td>
                          <td className="p-3">{wp.lon}</td>
                          <td className="p-3 font-mono text-cyan-400 font-bold">{wp.depthM} m</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              wp.estMargin === 'CRITICAL'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                                : wp.estMargin === 'WARNING' || wp.estMargin === 'MODERATE'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            }`}>
                              {wp.estMargin}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* EXECUTION ACTION & BROADCAST BOX */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setIsExecutingEvacRoute(true);
                      setEvacProgressPercent(0);
                    }}
                    disabled={isExecutingEvacRoute}
                    className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 border border-emerald-300/40 disabled:opacity-50"
                  >
                    <span>⚡ EXECUTE A* EMERGENCY EVACUATION DEPARTURE</span>
                  </button>

                  <button
                    onClick={() => setEvacSecuriteBroadcastSent(true)}
                    className="py-3 px-4 bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>📡 BROADCAST VHF CH 16 SECURITE</span>
                  </button>
                </div>

                {isExecutingEvacRoute && (
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-400 font-bold">EVACUATION MANEUVER EXECUTION IN PROGRESS...</span>
                      <strong className="text-white">{evacProgressPercent}%</strong>
                    </div>
                    <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300"
                        style={{ width: `${evacProgressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {evacSecuriteBroadcastSent && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/50 text-xs font-mono space-y-1">
                    <span className="text-emerald-400 font-bold block">📡 SECURITE EMERGENCY RADIO BROADCAST (VHF CH 16 / DSC CH 70)</span>
                    <p className="text-slate-300 text-[11px] font-sans">
                      "SECURITE SECURITE SECURITE. ALL SHIPS ALL SHIPS. THIS IS M/V LEVIATHAN EXECUTING EMERGENCY DEEP WATER EVACUATION OUT OF {corridor.origin}. STEERING COURSE {corridor.safeHeading} AT {evacVesselSpeedKts} KTS TO REACH {corridor.destination}. ALL VESSEL TRAFFIC STAND CLEAR."
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ========================================================================= */}
      {/* 19. GLOBAL ANIMATED CLIMATE HEATMAP */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">REAL-TIME VECTOR THERMAL SIMULATION</span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                ANIMATED FRAME ENGINE
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Global Animated Climate Heatmap</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Dynamic animated vector heatmap showing global ocean surface heat anomalies, wind gust fields, and inundation risk density over 12 frame loops.
            </p>
          </div>

          {/* LAYER & ANIMATION TOOLBAR */}
          <div className="flex flex-wrap items-center gap-2">
            {/* LAYER BUTTONS */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
              {[
                { id: 'SST_THERMAL', label: '🌡️ SST Thermal' },
                { id: 'WIND_VECTORS', label: '💨 Wind Vectors' },
                { id: 'FLOOD_RISK', label: '🌊 Flood Density' },
                { id: 'CORAL_STRESS', label: '🪸 Coral Stress' }
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setHeatmapLayer(l.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    heatmapLayer === l.id
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* PLAY / PAUSE & SPEED */}
            <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setIsHeatmapPlaying(!isHeatmapPlaying)}
                className={`px-3 py-1.5 rounded-lg font-black transition-all flex items-center space-x-1 ${
                  isHeatmapPlaying ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                }`}
              >
                <span>{isHeatmapPlaying ? '⏸ PAUSE' : '▶ PLAY'}</span>
              </button>

              {[0.5, 1.0, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setHeatmapAnimSpeed(s)}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    heatmapAnimSpeed === s ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ANIMATED CANVAS / SVG HEATMAP CONTAINER */}
        <div className="relative bg-slate-900 rounded-2xl border border-slate-800 p-6 overflow-hidden min-h-[280px] flex flex-col justify-between">
          {/* BACKGROUND VECTOR WORLD MAP GRAPHIC */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* DYNAMIC HEAT DENSITY BLOBS (PULSING ANIMATED CORNER VECTORS) */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {[
              { id: 'HOTSPOT-PACIFIC-EQUATOR', region: 'Pacific Ocean / Equator', temp: `+${(2.8 + (heatmapAnimFrame * 0.12)).toFixed(1)}°C Anomaly`, status: 'CRITICAL_THERMAL' },
              { id: 'HOTSPOT-INDIAN-SUNDA', region: 'Indian Ocean / Sunda Arc', temp: `+${(2.4 + (heatmapAnimFrame * 0.08)).toFixed(1)}°C Anomaly`, status: 'HIGH_THERMAL' },
              { id: 'HOTSPOT-GULF-MEXICO', region: 'Gulf of Mexico / Caribbean', temp: `+${(3.1 + (heatmapAnimFrame * 0.15)).toFixed(1)}°C Anomaly`, status: 'RECORD_HEAT' },
              { id: 'HOTSPOT-NORTH-SEA', region: 'North Sea & English Channel', temp: `+${(1.8 + (heatmapAnimFrame * 0.05)).toFixed(1)}°C Anomaly`, status: 'MODERATE_THERMAL' },
              { id: 'HOTSPOT-ARABIAN-SEA', region: 'Arabian Sea / Konkan Coast', temp: `+${(2.6 + (heatmapAnimFrame * 0.10)).toFixed(1)}°C Anomaly`, status: 'HIGH_THERMAL' },
              { id: 'HOTSPOT-MEDITERRANEAN', region: 'Mediterranean / Hellenic Arc', temp: `+${(2.2 + (heatmapAnimFrame * 0.07)).toFixed(1)}°C Anomaly`, status: 'ELEVATED' }
            ].map((spot) => (
              <div
                key={spot.id}
                onClick={() => setSelectedHotspotPin(spot.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 backdrop-blur-md ${
                  selectedHotspotPin === spot.id
                    ? 'bg-slate-950/90 border-cyan-400 ring-2 ring-cyan-400/30 shadow-xl'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-[11px]">{spot.region}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <strong className="text-cyan-400 text-sm font-black block">{spot.temp}</strong>
                <span className="text-[9px] text-slate-400 font-mono block uppercase">FRAME LOOP #{heatmapAnimFrame} / 12</span>
              </div>
            ))}
          </div>

          {/* TIMELINE SLIDER TOOLBAR */}
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-bold">ANIMATED FRAME:</span>
              <span className="text-cyan-400 font-black text-sm">MONTH #{heatmapAnimFrame}</span>
            </div>

            <div className="flex-1 max-w-md mx-auto w-full">
              <input
                type="range"
                min={1}
                max={12}
                step={1}
                value={heatmapAnimFrame}
                onChange={(e) => setHeatmapAnimFrame(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <span className="text-slate-500 text-[10px]">12-Month Historical &amp; Projected Thermal Loop</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 20. GLOBAL QUICK SAVE CLIMATE */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-sky-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">INSTANT SNAPSHOT PRESET MANAGER</span>
              <span className="bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                LOCAL STORAGE PERSISTENCE
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Global Quick Save Climate</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Save current climate parameters, alerts, and evacuation corridors into custom single-click restore snapshots.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSaveSnapshotTitle(`Climate Snapshot ${new Date().toLocaleTimeString()}`);
                setSaveSnapshotNotes('Saved active climate parameters & evacuation corridor state.');
                setIsSaveModalOpen(true);
              }}
              className="py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center space-x-2"
            >
              <span>💾 QUICK SAVE SNAPSHOT</span>
            </button>

            <button
              onClick={() => {
                const jsonStr = JSON.stringify(savedClimateSnapshots, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `climate_snapshots_${Date.now()}.json`;
                a.click();
              }}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-800 font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
            >
              <span>📥 EXPORT JSON</span>
            </button>
          </div>
        </div>

        {/* TOAST FEEDBACK BANNER */}
        {quickSaveToastMsg && (
          <div className="bg-sky-500/20 border border-sky-400 text-sky-200 p-3 rounded-xl text-xs font-bold flex items-center justify-between animate-in fade-in">
            <span>{quickSaveToastMsg}</span>
            <button onClick={() => setQuickSaveToastMsg(null)} className="text-sky-400 hover:text-white">✕</button>
          </div>
        )}

        {/* SAVED PRESETS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {savedClimateSnapshots.map((snap) => (
            <div key={snap.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-white font-bold block text-sm">{snap.title}</strong>
                  <span className="text-[10px] text-slate-400 block">{snap.timestamp}</span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  snap.severity === 'CRITICAL'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {snap.severity}
                </span>
              </div>

              <p className="text-slate-300 text-xs font-sans">{snap.notes}</p>

              <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                <span>Waypoint: <strong className="text-white">{snap.config.waypoint}</strong></span>
                <span>Projection: <strong className="text-cyan-400">{snap.config.projectionYear} AD</strong></span>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => {
                    setSelectedWeatherWaypoint(snap.config.waypoint as any);
                    setSeaLevelYearProjection(snap.config.projectionYear);
                    setCoastalHeatmapMetric(snap.config.heatmapMetric as any);
                    setEvacPathCorridor(snap.config.corridor as any);
                    setQuickSaveToastMsg(`✅ Restored Snapshot: "${snap.title}"`);
                  }}
                  className="w-full py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-bold text-xs rounded-xl transition-all uppercase"
                >
                  ⚡ RESTORE SNAPSHOT
                </button>

                <button
                  onClick={() => {
                    setSavedClimateSnapshots((prev) => prev.filter((s) => s.id !== snap.id));
                    setQuickSaveToastMsg(`🗑 Deleted Snapshot: "${snap.title}"`);
                  }}
                  className="p-2 bg-slate-950 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 rounded-xl transition-all"
                  title="Delete Snapshot"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SAVE SNAPSHOT MODAL */}
        {isSaveModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-sky-500 text-white p-6 rounded-3xl max-w-md w-full space-y-4 font-mono shadow-2xl">
              <h3 className="text-lg font-black text-sky-400">💾 SAVE CLIMATE SNAPSHOT</h3>
              <p className="text-slate-300 text-xs font-sans">
                Save active parameters, selected weather waypoint, sea level year, and evacuation corridor into custom preset.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-bold">SNAPSHOT TITLE</label>
                  <input
                    type="text"
                    value={saveSnapshotTitle}
                    onChange={(e) => setSaveSnapshotTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-bold">NOTES &amp; ADVISORY</label>
                  <textarea
                    rows={2}
                    value={saveSnapshotNotes}
                    onChange={(e) => setSaveSnapshotNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-sans"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-bold">SEVERITY LEVEL</label>
                  <select
                    value={saveSnapshotSeverity}
                    onChange={(e) => setSaveSnapshotSeverity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="WARNING">WARNING</option>
                    <option value="BASELINE">BASELINE</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => {
                    const newSnap = {
                      id: `SNAP-${Date.now()}`,
                      title: saveSnapshotTitle || 'Untitled Climate Snapshot',
                      notes: saveSnapshotNotes || 'Custom user saved snapshot.',
                      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
                      severity: saveSnapshotSeverity,
                      config: {
                        waypoint: selectedWeatherWaypoint,
                        projectionYear: seaLevelYearProjection,
                        heatmapMetric: coastalHeatmapMetric,
                        corridor: evacPathCorridor
                      }
                    };
                    setSavedClimateSnapshots((prev) => [newSnap, ...prev]);
                    setIsSaveModalOpen(false);
                    setQuickSaveToastMsg(`✅ Snapshot "${newSnap.title}" Saved!`);
                  }}
                  className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all"
                >
                  SAVE PRESET
                </button>

                <button
                  onClick={() => setIsSaveModalOpen(false)}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 font-bold text-xs uppercase rounded-xl border border-slate-800"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

