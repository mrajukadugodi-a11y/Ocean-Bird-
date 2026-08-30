import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  ThermometerSun,
  Wind,
  Waves,
  Gauge,
  Eye,
  AlertTriangle,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Radio,
  Sparkles,
  Zap,
  RotateCcw,
  Volume2,
  Filter,
  Download,
  Calendar,
  Clock,
  BarChart3,
  TrendingUp,
  Search,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Shield,
  Layers,
  Activity,
  ArrowUpRight,
  Info,
  MapPin,
  Play,
  Pause,
  CheckSquare,
  Square,
  ChevronRight,
  Navigation,
  Globe,
  Upload,
  AlertCircle,
  Truck,
  Box,
  HardHat,
  Ship,
  Compass,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import { REGIONAL_CLIMATE_ALERTS } from '../data/southAsiaData';
import { ClimateAlert } from '../types';
import { SmartMaritimeAlertView } from './SmartMaritimeAlertView';
import { SupplyChainForecastView } from './SupplyChainForecastView';
import { SafetySimulationView } from './SafetySimulationView';
import { GlobalFleetInsightView } from './GlobalFleetInsightView';

export type SeverityType = 'ALL' | 'Critical' | 'Warning' | 'Advisory' | 'Notice';
export type CategoryType = 'ALL' | 'Cyclone' | 'Tsunami' | 'Gale' | 'Pressure' | 'Visibility' | 'Monsoon' | 'Flood' | 'Storm Surge';
export type TimeWindowType = 'ALL' | '1H' | '6H' | '24H' | '7D';
export type TierType = 'ALL' | 'Tier 1' | 'Tier 2' | 'Tier 3';

export interface ExtendedClimateAlert extends ClimateAlert {
  hourUTC?: number;
  leadTimeHours?: number;
  authority?: string;
  isSimulated?: boolean;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  acknowledged?: boolean;
  lat: number;
  lng: number;
}

// Initial enriched alert list with Multi-Tier classifications and Map Coordinates
const INITIAL_EXTENDED_ALERTS: ExtendedClimateAlert[] = [
  {
    ...REGIONAL_CLIMATE_ALERTS[0], // Severe Cyclonic Storm 'Asani'
    hourUTC: 6,
    leadTimeHours: 3.0,
    authority: 'INCOIS & BMD Warning Centre',
    tier: 'Tier 3',
    lat: 15.8,
    lng: 88.5,
    acknowledged: false
  },
  {
    ...REGIONAL_CLIMATE_ALERTS[1], // Southwest Monsoon Deep Depression
    hourUTC: 9,
    leadTimeHours: 4.5,
    authority: 'PMD Tropical Cyclone Warning Centre',
    tier: 'Tier 2',
    lat: 19.5,
    lng: 86.2,
    acknowledged: false
  },
  {
    ...REGIONAL_CLIMATE_ALERTS[2], // Coastal High Swell & Rip Current
    hourUTC: 12,
    leadTimeHours: 6.0,
    authority: 'INCOIS & Sri Lanka Hydrographic Office',
    tier: 'Tier 1',
    lat: 6.2,
    lng: 80.5,
    acknowledged: false
  },
  {
    id: 'ALT-IND-004',
    region: 'South East Arabian Sea & Lakshadweep Archipelago',
    severity: 'Advisory',
    category: 'Gale',
    title: 'Squall Wind Squall Line Advisory (35-45 knots)',
    description: 'Active squall line migrating west-northwest toward Minicoi Island. Sea state rough with swells reaching 3.2m.',
    timestamp: '2026-08-05 01:15 UTC',
    affectedPorts: ['Kochi Port', 'Beypore', 'Mangalore'],
    hourUTC: 1,
    leadTimeHours: 5.0,
    authority: 'India Meteorological Department (IMD) Chennai',
    tier: 'Tier 2',
    lat: 10.2,
    lng: 73.5,
    acknowledged: false
  },
  {
    id: 'ALT-SL-005',
    region: 'Palk Strait & Northern Jaffna Peninsula',
    severity: 'Notice',
    category: 'Visibility',
    title: 'Dense Fog & Low Visibility Coastal Caution',
    description: 'Early morning thermal inversion causing visibility drops under 1.2 nautical miles across Palk Strait navigation channel.',
    timestamp: '2026-08-05 03:40 UTC',
    affectedPorts: ['Kankesanthurai', 'Point Pedro', 'Rameswaram'],
    hourUTC: 3,
    leadTimeHours: 2.0,
    authority: 'Sri Lanka Hydrographic Office & Navy Command',
    tier: 'Tier 1',
    lat: 9.8,
    lng: 79.8,
    acknowledged: false
  },
  {
    id: 'ALT-BD-006',
    region: 'Meghna Estuary & Sundarbans Coastal Belt',
    severity: 'Warning',
    category: 'Storm Surge',
    title: 'Astronomical High Tide & Coastal Inundation Watch',
    description: 'Monsoonal spring tide alignment combined with southwesterly onshore flow expected to inundate low-lying river delta banks by 1.8m.',
    timestamp: '2026-08-04 22:10 UTC',
    affectedPorts: ['Mongla Port', 'Payra Harbour', 'Barisal'],
    hourUTC: 22,
    leadTimeHours: 8.5,
    authority: 'Bangladesh Disaster Management Bureau (BMD)',
    tier: 'Tier 3',
    lat: 21.8,
    lng: 89.5,
    acknowledged: false
  },
  {
    id: 'ALT-PK-007',
    region: 'Indus Delta & Gwadar Deep Water Approach',
    severity: 'Advisory',
    category: 'Pressure',
    title: 'Sharp Barometric Pressure Drop Warning (994 hPa)',
    description: 'Rapid pressure fall recorded by offshore DART buoy 44012. Squall bursts anticipated over outer anchoring anchorage.',
    timestamp: '2026-08-04 18:30 UTC',
    affectedPorts: ['Karachi Port', 'Gwadar Port', 'Pasni'],
    hourUTC: 18,
    leadTimeHours: 6.0,
    authority: 'Pakistan National Disaster Management Authority',
    tier: 'Tier 2',
    lat: 24.2,
    lng: 66.8,
    acknowledged: false
  },
  {
    id: 'ALT-MV-008',
    region: 'Central Maldives Atolls & Male Anchorage',
    severity: 'Notice',
    category: 'Monsoon',
    title: 'South-West Monsoon Squall Heavy Rain Bulletin',
    description: 'Inter-Tropical Convergence Zone (ITCZ) band bringing localized heavy downpours exceeding 45mm/hr and gusts up to 38 kts.',
    timestamp: '2026-08-04 14:00 UTC',
    affectedPorts: ['Male Commercial Terminal', 'Hulhumale Port'],
    hourUTC: 14,
    leadTimeHours: 4.2,
    authority: 'Maldives Meteorological Service (MMS)',
    tier: 'Tier 1',
    lat: 4.2,
    lng: 73.5,
    acknowledged: false
  }
];

export const WeatherAlertMonitor: React.FC = () => {
  // Custom Alert Threshold Configuration State
  const [windThresholdKts, setWindThresholdKts] = useState<number>(35);
  const [waveHeightThresholdM, setWaveHeightThresholdM] = useState<number>(3.2);
  const [pressureThresholdHpa, setPressureThresholdHpa] = useState<number>(995);
  const [visibilityThresholdNm, setVisibilityThresholdNm] = useState<number>(2.5);

  // Simulated Current Ocean Conditions
  const [simulatedWindKts, setSimulatedWindKts] = useState<number>(38);
  const [simulatedWaveM, setSimulatedWaveM] = useState<number>(3.5);
  const [simulatedPressureHpa, setSimulatedPressureHpa] = useState<number>(992);
  const [simulatedVisibilityNm, setSimulatedVisibilityNm] = useState<number>(2.0);

  // FEATURE 1: MULTI-DIMENSIONAL ALERT FILTERS STATE (INCL TIER)
  const [severityFilter, setSeverityFilter] = useState<SeverityType>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('ALL');
  const [timeWindowFilter, setTimeWindowFilter] = useState<TimeWindowType>('ALL');
  const [tierFilter, setTierFilter] = useState<TierType>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // FEATURE 2: PREDICTIVE CLIMATE MAP & TIME ANALYSIS TAB STATE
  const [activeMainTab, setActiveMainTab] = useState<'ALERTS' | 'SMART_MARITIME' | 'PREDICTIVE_MAP' | 'SUPPLY_CHAIN' | 'SAFETY_SIMULATION' | 'FLEET_INSIGHT' | 'TIME_ANALYSIS'>('ALERTS');
  const [forecastHorizon, setForecastHorizon] = useState<'+6H' | '+12H' | '+24H' | '+48H'>('+12H');
  const [isPlayingTrajectory, setIsPlayingTrajectory] = useState<boolean>(false);
  const [mapOverlayLayer, setMapOverlayLayer] = useState<'STORMS' | 'WAVES' | 'WINDS' | 'PRESSURE'>('STORMS');
  const [selectedMapHotspot, setSelectedMapHotspot] = useState<ExtendedClimateAlert | null>(null);

  // FEATURE 3: ANIMATE ALERT TRANSITION & TIME ANALYSIS VIEW STATE
  const [analysisViewMode, setAnalysisViewMode] = useState<'HOURLY' | 'SEVERITY' | 'METRICS'>('HOURLY');

  // FEATURE 4: BATCH ALERT SELECTION & EXPORT STATE
  const [selectedAlertIds, setSelectedAlertIds] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Alerts Master List State
  const [alertsList, setAlertsList] = useState<ExtendedClimateAlert[]>(INITIAL_EXTENDED_ALERTS);

  // Check threshold breaches
  const isWindBreached = simulatedWindKts >= windThresholdKts;
  const isWaveBreached = simulatedWaveM >= waveHeightThresholdM;
  const isPressureBreached = simulatedPressureHpa <= pressureThresholdHpa;
  const isVisibilityBreached = simulatedVisibilityNm <= visibilityThresholdNm;
  const totalBreaches = [isWindBreached, isWaveBreached, isPressureBreached, isVisibilityBreached].filter(Boolean).length;

  // ANIMATED MAP FORECAST TICKER EFFECT
  useEffect(() => {
    let timer: any;
    if (isPlayingTrajectory) {
      timer = setInterval(() => {
        setForecastHorizon((prev) => {
          if (prev === '+6H') return '+12H';
          if (prev === '+12H') return '+24H';
          if (prev === '+24H') return '+48H';
          return '+6H';
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlayingTrajectory]);

  // FILTERED ALERTS COMPUTATION
  const filteredAlerts = useMemo(() => {
    return alertsList.filter((alert) => {
      // 1. Severity filter
      if (severityFilter !== 'ALL' && alert.severity !== severityFilter) {
        return false;
      }
      // 2. Category filter
      if (categoryFilter !== 'ALL' && alert.category !== categoryFilter) {
        return false;
      }
      // 3. Tier filter (FEATURE 1: MULTI-TIER)
      if (tierFilter !== 'ALL' && alert.tier !== tierFilter) {
        return false;
      }
      // 4. Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = alert.title.toLowerCase().includes(query);
        const matchesRegion = alert.region.toLowerCase().includes(query);
        const matchesDesc = alert.description.toLowerCase().includes(query);
        const matchesPorts = alert.affectedPorts?.some((p) => p.toLowerCase().includes(query));
        const matchesAuthority = alert.authority?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesRegion && !matchesDesc && !matchesPorts && !matchesAuthority) {
          return false;
        }
      }
      // 5. Time Window filter
      if (timeWindowFilter === '1H') {
        return alert.hourUTC !== undefined && alert.hourUTC >= 0 && alert.hourUTC <= 4;
      }
      if (timeWindowFilter === '6H') {
        return alert.hourUTC !== undefined && alert.hourUTC >= 0 && alert.hourUTC <= 8;
      }
      if (timeWindowFilter === '24H') {
        return alert.timestamp.includes('2026-08-05') || alert.timestamp.includes('2026-08-04');
      }
      return true;
    });
  }, [alertsList, severityFilter, categoryFilter, tierFilter, timeWindowFilter, searchQuery]);

  // SEVERITY COUNTS BREAKDOWN
  const severityCounts = useMemo(() => {
    const counts = { Critical: 0, Warning: 0, Advisory: 0, Notice: 0 };
    alertsList.forEach((a) => {
      if (counts[a.severity as keyof typeof counts] !== undefined) {
        counts[a.severity as keyof typeof counts]++;
      }
    });
    return counts;
  }, [alertsList]);

  // TIER COUNTS BREAKDOWN
  const tierCounts = useMemo(() => {
    const counts = { 'Tier 1': 0, 'Tier 2': 0, 'Tier 3': 0 };
    alertsList.forEach((a) => {
      if (counts[a.tier] !== undefined) {
        counts[a.tier]++;
      }
    });
    return counts;
  }, [alertsList]);

  // HOURLY TIME ANALYSIS DATA GENERATOR
  const hourlyTimeAnalysisData = useMemo(() => {
    const hours = Array.from({ length: 12 }, (_, i) => i * 2);
    return hours.map((hour) => {
      const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
      const hourAlerts = alertsList.filter((a) => a.hourUTC !== undefined && Math.abs(a.hourUTC - hour) <= 1);
      const criticalCount = hourAlerts.filter((a) => a.severity === 'Critical').length;
      const warningCount = hourAlerts.filter((a) => a.severity === 'Warning').length;
      const advisoryCount = hourAlerts.filter((a) => a.severity === 'Advisory').length;
      const noticeCount = hourAlerts.filter((a) => a.severity === 'Notice').length;

      return {
        hourLabel: formattedHour,
        hourValue: hour,
        total: hourAlerts.length,
        Critical: criticalCount,
        Warning: warningCount,
        Advisory: advisoryCount,
        Notice: noticeCount,
        intensityIndex: criticalCount * 3 + warningCount * 2 + advisoryCount * 1 + noticeCount * 0.5
      };
    });
  }, [alertsList]);

  // BATCH SELECTION HELPERS (FEATURE 4)
  const isAllSelected = useMemo(() => {
    if (filteredAlerts.length === 0) return false;
    return filteredAlerts.every((a) => selectedAlertIds.includes(a.id));
  }, [filteredAlerts, selectedAlertIds]);

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedAlertIds([]);
    } else {
      setSelectedAlertIds(filteredAlerts.map((a) => a.id));
    }
  };

  const handleToggleSelectAlert = (id: string) => {
    setSelectedAlertIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // EXPORT CSV HANDLER (SINGLE OR BATCH)
  const handleExportCSV = (targetAlerts = filteredAlerts) => {
    const exportItems = selectedAlertIds.length > 0
      ? alertsList.filter((a) => selectedAlertIds.includes(a.id))
      : targetAlerts;

    if (exportItems.length === 0) return;

    const headers = ['Alert ID', 'Operational Tier', 'Severity', 'Category', 'Region', 'Title', 'Timestamp', 'Affected Ports', 'Issuing Authority', 'Description'];
    const rows = exportItems.map((a) => [
      `"${a.id}"`,
      `"${a.tier}"`,
      `"${a.severity}"`,
      `"${a.category}"`,
      `"${a.region.replace(/"/g, '""')}"`,
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.timestamp}"`,
      `"${(a.affectedPorts || []).join('; ')}"`,
      `"${(a.authority || 'IMD Maritime').replace(/"/g, '""')}"`,
      `"${a.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `weather_alerts_batch_export_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Exported ${exportItems.length} alerts to CSV`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  // EXPORT JSON HANDLER (SINGLE OR BATCH)
  const handleExportJSON = (targetAlerts = filteredAlerts) => {
    const exportItems = selectedAlertIds.length > 0
      ? alertsList.filter((a) => selectedAlertIds.includes(a.id))
      : targetAlerts;

    if (exportItems.length === 0) return;

    const jsonContent = JSON.stringify(exportItems, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `weather_alerts_batch_export_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Exported ${exportItems.length} alerts to JSON`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  // COPY SUMMARY TO CLIPBOARD
  const handleCopySummary = () => {
    const exportItems = selectedAlertIds.length > 0
      ? alertsList.filter((a) => selectedAlertIds.includes(a.id))
      : filteredAlerts;

    const summaryText = exportItems
      .map(
        (a) =>
          `[${a.tier} | ${a.severity.toUpperCase()}] ${a.title}\nRegion: ${a.region}\nCategory: ${a.category} | Time: ${a.timestamp}\nAffected Ports: ${(a.affectedPorts || []).join(', ')}\nDetails: ${a.description}\n`
      )
      .join('\n---\n\n');

    navigator.clipboard.writeText(summaryText);
    setCopyStatus(true);
    setExportNotice(`Copied ${exportItems.length} alerts summary to clipboard`);
    setTimeout(() => {
      setCopyStatus(false);
      setExportNotice(null);
    }, 3000);
  };

  // BATCH ESCALATE TIER ACTION
  const handleBatchEscalateTier = () => {
    if (selectedAlertIds.length === 0) return;
    setAlertsList((prev) =>
      prev.map((a) => (selectedAlertIds.includes(a.id) ? { ...a, tier: 'Tier 3' } : a))
    );
    setExportNotice(`Escalated ${selectedAlertIds.length} alerts to Tier 3 Emergency Dispatch`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  // BATCH ACKNOWLEDGE ACTION
  const handleBatchAcknowledge = () => {
    if (selectedAlertIds.length === 0) return;
    setAlertsList((prev) =>
      prev.map((a) => (selectedAlertIds.includes(a.id) ? { ...a, acknowledged: true } : a))
    );
    setExportNotice(`Marked ${selectedAlertIds.length} alerts as acknowledged`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  // INDIVIDUAL ALERT TIER CHANGE HANDLER
  const handleToggleIndividualTier = (id: string, currentTier: 'Tier 1' | 'Tier 2' | 'Tier 3') => {
    const nextTier = currentTier === 'Tier 1' ? 'Tier 2' : currentTier === 'Tier 2' ? 'Tier 3' : 'Tier 1';
    setAlertsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, tier: nextTier } : a))
    );
    setExportNotice(`Updated alert ${id} to ${nextTier}`);
    setTimeout(() => setExportNotice(null), 2500);
  };

  // SEVERITY STYLING HELPER FUNCTION (FEATURE 4: SEVERITY COLOUR CODING)
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return {
          cardBg: 'bg-slate-950 border-rose-500/60 text-rose-100 shadow-rose-950/40',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
          iconColor: 'text-rose-400',
          barFill: '#f43f5e',
          accentBorder: 'border-l-4 border-l-rose-500'
        };
      case 'Warning':
        return {
          cardBg: 'bg-slate-950 border-amber-500/50 text-amber-100 shadow-amber-950/40',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          iconColor: 'text-amber-400',
          barFill: '#f59e0b',
          accentBorder: 'border-l-4 border-l-amber-500'
        };
      case 'Advisory':
        return {
          cardBg: 'bg-slate-950 border-cyan-500/40 text-cyan-100 shadow-cyan-950/30',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
          iconColor: 'text-cyan-400',
          barFill: '#06b6d4',
          accentBorder: 'border-l-4 border-l-cyan-500'
        };
      case 'Notice':
      default:
        return {
          cardBg: 'bg-slate-950 border-emerald-500/40 text-emerald-100 shadow-emerald-950/30',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          iconColor: 'text-emerald-400',
          barFill: '#10b981',
          accentBorder: 'border-l-4 border-l-emerald-500'
        };
    }
  };

  // TIER STYLING HELPER FUNCTION (FEATURE 1: MULTI-TIER ALERT)
  const getTierStyle = (tier: 'Tier 1' | 'Tier 2' | 'Tier 3') => {
    switch (tier) {
      case 'Tier 3':
        return {
          badge: 'bg-purple-950/90 text-purple-300 border-purple-500/80 shadow-purple-900/40',
          label: 'TIER 3 • EMERGENCY DISPATCH',
          ring: 'ring-2 ring-purple-500/60'
        };
      case 'Tier 2':
        return {
          badge: 'bg-amber-950/90 text-amber-300 border-amber-500/80 shadow-amber-900/40',
          label: 'TIER 2 • CORRIDOR ADVISORY',
          ring: 'ring-1 ring-amber-500/40'
        };
      case 'Tier 1':
      default:
        return {
          badge: 'bg-sky-950/90 text-sky-300 border-sky-500/80 shadow-sky-900/40',
          label: 'TIER 1 • PORT CAUTION',
          ring: ''
        };
    }
  };

  return (
    <div id="weather-alert-monitor" className="space-y-6 font-sans">
      {/* EXPORT / ACTION NOTIFICATION TOAST */}
      <AnimatePresence>
        {exportNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-emerald-500/80 text-emerald-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">{exportNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP COMMAND HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4 text-rose-400 animate-bounce" />
              <span>MULTI-TIER SEVERE CLIMATE RADAR, PREDICTIVE MAP & BATCH EXPORT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <ThermometerSun className="w-6 h-6 text-rose-400" />
              <span>Weather Alert Monitor & Predictive Climate Suite</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Multi-tier escalation dispatching, interactive predictive ocean trajectory maps, animated alert filter transitions, and multi-select batch alert export capability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* VIEW MODE TABS */}
            <div className="flex flex-wrap items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono gap-1">
              <button
                onClick={() => setActiveMainTab('ALERTS')}
                className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center space-x-1.5 ${
                  activeMainTab === 'ALERTS'
                    ? 'bg-rose-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Alert Bulletins ({filteredAlerts.length})</span>
              </button>

              <button
                onClick={() => setActiveMainTab('SMART_MARITIME')}
                className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center space-x-1.5 ${
                  activeMainTab === 'SMART_MARITIME'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Smart Maritime Alert</span>
              </button>

              <button
                onClick={() => setActiveMainTab('PREDICTIVE_MAP')}
                className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center space-x-1.5 ${
                  activeMainTab === 'PREDICTIVE_MAP'
                    ? 'bg-sky-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Predictive Map</span>
              </button>

              <button
                onClick={() => setActiveMainTab('SUPPLY_CHAIN')}
                className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center space-x-1.5 ${
                  activeMainTab === 'SUPPLY_CHAIN'
                    ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-amber-300" />
                <span>Supply Chain Forecast</span>
              </button>

              <button
                onClick={() => setActiveMainTab('SAFETY_SIMULATION')}
                className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center space-x-1.5 ${
                  activeMainTab === 'SAFETY_SIMULATION'
                    ? 'bg-purple-500 text-white shadow-lg font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <HardHat className="w-3.5 h-3.5 text-purple-300" />
                <span>Safety Simulation</span>
              </button>

              <button
                onClick={() => setActiveMainTab('FLEET_INSIGHT')}
                className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center space-x-1.5 ${
                  activeMainTab === 'FLEET_INSIGHT'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Ship className="w-3.5 h-3.5 text-emerald-300" />
                <span>Global Fleet Insight</span>
              </button>

              <button
                onClick={() => setActiveMainTab('TIME_ANALYSIS')}
                className={`px-3 py-1.5 rounded-lg transition-all font-bold flex items-center space-x-1.5 ${
                  activeMainTab === 'TIME_ANALYSIS'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Time Analysis</span>
              </button>
            </div>

            {/* QUICK EXPORT TOOLBAR BUTTONS */}
            <div className="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => handleExportCSV()}
                title="Export Current View as CSV"
                className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => handleExportJSON()}
                title="Export Current View as JSON"
                className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 1: MULTI-TIER ALERTS SUMMARY BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div
          onClick={() => setTierFilter(tierFilter === 'Tier 1' ? 'ALL' : 'Tier 1')}
          className={`p-3.5 bg-slate-900 border rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
            tierFilter === 'Tier 1' ? 'border-sky-500 bg-sky-950/40 ring-2 ring-sky-500/50' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-sky-400" />
            <div>
              <span className="text-[10px] text-sky-300 font-bold block uppercase">TIER 1 • PORT CAUTION</span>
              <span className="text-slate-400 text-[10px]">Local harbor speed & berth limits</span>
            </div>
          </div>
          <span className="text-xl font-black text-white px-2 py-0.5 bg-slate-950 rounded-lg border border-slate-800">
            {tierCounts['Tier 1']}
          </span>
        </div>

        <div
          onClick={() => setTierFilter(tierFilter === 'Tier 2' ? 'ALL' : 'Tier 2')}
          className={`p-3.5 bg-slate-900 border rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
            tierFilter === 'Tier 2' ? 'border-amber-500 bg-amber-950/40 ring-2 ring-amber-500/50' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-amber-300 font-bold block uppercase">TIER 2 • CORRIDOR ADVISORY</span>
              <span className="text-slate-400 text-[10px]">Shipping lane rerouting advisory</span>
            </div>
          </div>
          <span className="text-xl font-black text-white px-2 py-0.5 bg-slate-950 rounded-lg border border-slate-800">
            {tierCounts['Tier 2']}
          </span>
        </div>

        <div
          onClick={() => setTierFilter(tierFilter === 'Tier 3' ? 'ALL' : 'Tier 3')}
          className={`p-3.5 bg-slate-900 border rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
            tierFilter === 'Tier 3' ? 'border-purple-500 bg-purple-950/40 ring-2 ring-purple-500/50' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-purple-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-purple-300 font-bold block uppercase">TIER 3 • EMERGENCY DISPATCH</span>
              <span className="text-slate-400 text-[10px]">Coast Guard & port evacuation order</span>
            </div>
          </div>
          <span className="text-xl font-black text-white px-2 py-0.5 bg-slate-950 rounded-lg border border-slate-800">
            {tierCounts['Tier 3']}
          </span>
        </div>
      </div>

      {/* SMART MARITIME ALERT VIEW */}
      {activeMainTab === 'SMART_MARITIME' && <SmartMaritimeAlertView />}

      {/* SUPPLY CHAIN FORECAST VIEW */}
      {activeMainTab === 'SUPPLY_CHAIN' && <SupplyChainForecastView />}

      {/* SAFETY SIMULATION VIEW */}
      {activeMainTab === 'SAFETY_SIMULATION' && <SafetySimulationView />}

      {/* GLOBAL FLEET INSIGHT VIEW */}
      {activeMainTab === 'FLEET_INSIGHT' && <GlobalFleetInsightView />}

      {/* FEATURE 2: PREDICTIVE CLIMATE MAP TAB VIEW */}
      {activeMainTab === 'PREDICTIVE_MAP' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800 pb-3 font-mono">
            <div>
              <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase">
                <Globe className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Predictive Climate Ocean Map & Trajectory Simulation</span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Simulated satellite ocean forecasting model across North Indian Ocean maritime channels.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* FORECAST HORIZON SELECTOR */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 px-2 uppercase font-bold">Horizon:</span>
                {(['+6H', '+12H', '+24H', '+48H'] as const).map((h) => (
                  <button
                    key={h}
                    onClick={() => setForecastHorizon(h)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      forecastHorizon === h
                        ? 'bg-sky-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* TRAJECTORY PLAY/PAUSE */}
              <button
                onClick={() => setIsPlayingTrajectory(!isPlayingTrajectory)}
                className={`px-3 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
                  isPlayingTrajectory
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isPlayingTrajectory ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingTrajectory ? 'PAUSE TRAJECTORY' : 'PLAY SIMULATION'}</span>
              </button>

              {/* MAP OVERLAY LAYER TOGGLES */}
              <select
                value={mapOverlayLayer}
                onChange={(e) => setMapOverlayLayer(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500"
              >
                <option value="STORMS">STORM TRACKS & SURGE</option>
                <option value="WAVES">WAVE SWELL HEIGHTS (M)</option>
                <option value="WINDS">WIND VELOCITY VECTORS</option>
                <option value="PRESSURE">BAROMETRIC DEPRESSION</option>
              </select>
            </div>
          </div>

          {/* INTERACTIVE PREDICTIVE SVG OCEAN MAP CANVAS */}
          <div className="relative w-full h-96 sm:h-[450px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* GRID LINES & LAT/LNG COORDINATES OVERLAY */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

            {/* SVG SOUTH ASIA & INDIAN OCEAN MAP */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full object-cover select-none"
            >
              <defs>
                <linearGradient id="stormGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#881337" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="waveGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#083344" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* OCEAN BACKGROUND DEEP WATER */}
              <rect x="0" y="0" width="800" height="500" fill="#030712" />

              {/* SIMULATED LAND MASSES (INDIA, SRI LANKA, BANGLADESH, PAKISTAN, MALDIVES) */}
              <g fill="#0f172a" stroke="#334155" strokeWidth="1.5">
                {/* Peninsular India */}
                <path d="M 280 60 L 320 180 L 360 260 L 380 340 L 410 320 L 440 260 L 490 180 L 520 120 L 530 60 Z" />
                {/* Sri Lanka */}
                <path d="M 425 360 C 440 360, 445 385, 430 395 C 415 400, 410 375, 425 360 Z" />
                {/* Bangladesh / Sundarbans Delta */}
                <path d="M 520 120 L 580 120 L 570 170 L 530 160 Z" />
                {/* Pakistan Coast */}
                <path d="M 120 60 L 280 60 L 260 110 L 160 110 Z" />
                {/* Maldives Atolls */}
                <circle cx="340" cy="420" r="4" />
                <circle cx="342" cy="435" r="3" />
                <circle cx="341" cy="450" r="3" />
              </g>

              {/* MARITIME CHANNEL LABELS */}
              <g fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="bold">
                <text x="210" y="240">ARABIAN SEA</text>
                <text x="520" y="240">BAY OF BENGAL</text>
                <text x="440" y="340">PALK STRAIT</text>
                <text x="280" y="440">LACCADIVE SEA</text>
                <text x="160" y="140">GULF OF OMAN</text>
              </g>

              {/* PREDICTIVE STORM TRAJECTORY PATHS (ANIMATED FOR HORIZON) */}
              {mapOverlayLayer === 'STORMS' && (
                <g>
                  {/* Cyclone Asani Projected Track in Bay of Bengal */}
                  <path
                    d="M 600 320 Q 560 220 530 150"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />
                  {/* Projected Horizon Point */}
                  <circle
                    cx={
                      forecastHorizon === '+6H' ? 580 : forecastHorizon === '+12H' ? 560 : forecastHorizon === '+24H' ? 545 : 530
                    }
                    cy={
                      forecastHorizon === '+6H' ? 280 : forecastHorizon === '+12H' ? 220 : forecastHorizon === '+24H' ? 180 : 150
                    }
                    r="18"
                    fill="url(#stormGlow)"
                    className="animate-ping"
                  />
                  <circle
                    cx={
                      forecastHorizon === '+6H' ? 580 : forecastHorizon === '+12H' ? 560 : forecastHorizon === '+24H' ? 545 : 530
                    }
                    cy={
                      forecastHorizon === '+6H' ? 280 : forecastHorizon === '+12H' ? 220 : forecastHorizon === '+24H' ? 180 : 150
                    }
                    r="8"
                    fill="#f43f5e"
                  />
                </g>
              )}

              {/* WAVE SWELL OVERLAYS */}
              {mapOverlayLayer === 'WAVES' && (
                <g stroke="#06b6d4" strokeWidth="1.5" fill="none" opacity="0.6">
                  <path d="M 200 200 C 240 180, 280 220, 320 200" />
                  <path d="M 210 220 C 250 200, 290 240, 330 220" />
                  <path d="M 500 220 C 540 200, 580 240, 620 220" />
                  <path d="M 510 240 C 550 220, 590 260, 630 240" />
                </g>
              )}

              {/* HOTSPOT ALERT MARKERS ON MAP */}
              {alertsList.map((alert) => {
                // Convert lat/lng to approximate SVG x/y coordinates
                // lng range 60 to 95 -> x range 100 to 700
                // lat range 0 to 30 -> y range 460 to 80
                const x = ((alert.lng - 60) / 35) * 600 + 100;
                const y = 460 - (alert.lat / 30) * 380;

                const style = getSeverityStyle(alert.severity);
                const isSelected = selectedMapHotspot?.id === alert.id;

                return (
                  <g
                    key={alert.id}
                    onClick={() => setSelectedMapHotspot(alert)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 16 : 12}
                      fill={style.barFill}
                      fillOpacity={isSelected ? 0.4 : 0.25}
                      className="animate-ping"
                    />
                    {/* Center dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 7 : 5}
                      fill={style.barFill}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    {/* Hotspot Code Tag */}
                    <text
                      x={x + 10}
                      y={y + 4}
                      fill="#f8fafc"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      className="opacity-80 group-hover:opacity-100"
                    >
                      {alert.id.split('-')[1]} • {alert.category}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* FLOATING MAP LEGEND & HOTSPOT POPUP OVERLAY */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 text-[10px] font-mono space-y-1 text-slate-300">
              <div className="font-bold text-white flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-sky-400" />
                <span>PREDICTIVE OVERLAY MAP ({forecastHorizon})</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  <span>Critical (Tier 3)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  <span>Warning (Tier 2)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
                  <span>Advisory (Tier 1)</span>
                </span>
              </div>
            </div>

            {/* SELECTED HOTSPOT CARD POPUP */}
            <AnimatePresence>
              {selectedMapHotspot && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-4 right-4 max-w-sm bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-4 shadow-2xl text-xs font-mono space-y-2 z-20"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] text-rose-400 font-bold uppercase">
                      {selectedMapHotspot.tier} • {selectedMapHotspot.severity}
                    </span>
                    <button
                      onClick={() => setSelectedMapHotspot(null)}
                      className="text-slate-400 hover:text-white font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="font-bold text-white text-sm">{selectedMapHotspot.title}</h4>
                  <p className="text-[11px] text-slate-300 font-sans leading-snug">
                    {selectedMapHotspot.description}
                  </p>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Region: <strong className="text-slate-200">{selectedMapHotspot.region}</strong>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleToggleIndividualTier(selectedMapHotspot.id, selectedMapHotspot.tier)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-lg text-[10px] font-bold"
                    >
                      Escalate Tier
                    </button>
                    <button
                      onClick={() => {
                        setActiveMainTab('ALERTS');
                        setSearchQuery(selectedMapHotspot.id);
                      }}
                      className="px-2.5 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg text-[10px] font-bold"
                    >
                      Focus in Feed →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* FEATURE 3: TIME ANALYSIS DASHBOARD SECTION */}
      {activeMainTab === 'TIME_ANALYSIS' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 font-mono">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-sky-400" />
              <h3 className="font-bold text-white text-sm sm:text-base uppercase tracking-wide">
                Alert Time Analysis & Hourly Intensity Timeline
              </h3>
            </div>

            <div className="flex items-center space-x-1 text-xs">
              <button
                onClick={() => setAnalysisViewMode('HOURLY')}
                className={`px-3 py-1 rounded-xl border transition-all ${
                  analysisViewMode === 'HOURLY'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Hourly Timeline
              </button>
              <button
                onClick={() => setAnalysisViewMode('SEVERITY')}
                className={`px-3 py-1 rounded-xl border transition-all ${
                  analysisViewMode === 'SEVERITY'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Severity Spread
              </button>
              <button
                onClick={() => setAnalysisViewMode('METRICS')}
                className={`px-3 py-1 rounded-xl border transition-all ${
                  analysisViewMode === 'METRICS'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                Response Metrics
              </button>
            </div>
          </div>

          {analysisViewMode === 'HOURLY' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
              <div className="lg:col-span-3 h-60 bg-slate-950 border border-slate-800 rounded-xl p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyTimeAnalysisData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="hourLabel" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#f8fafc' }}
                      labelStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="Critical" stackId="a" fill="#f43f5e" name="Critical Alerts" />
                    <Bar dataKey="Warning" stackId="a" fill="#f59e0b" name="Warning Alerts" />
                    <Bar dataKey="Advisory" stackId="a" fill="#06b6d4" name="Advisory Alerts" />
                    <Bar dataKey="Notice" stackId="a" fill="#10b981" name="Notice Bulletins" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">PEAK ALERT WINDOW</span>
                  <strong className="text-rose-400 font-black text-sm block">06:00 – 10:00 UTC</strong>
                  <span className="text-[10px] text-slate-400 block">Highest squall activity</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">AVG WARNING LEAD TIME</span>
                  <strong className="text-cyan-300 font-black text-sm block">4.5 Hours</strong>
                  <span className="text-[10px] text-slate-400 block">Pre-landfall notice</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">DISPATCH LATENCY SLA</span>
                  <strong className="text-emerald-400 font-black text-sm block">&lt; 12 Minutes</strong>
                  <span className="text-[10px] text-slate-400 block">Bridge notification SLA</span>
                </div>
              </div>
            </div>
          )}

          {analysisViewMode === 'SEVERITY' && (
            <div className="space-y-4 font-mono">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 bg-slate-950 border border-rose-500/40 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-rose-400">
                    <span className="font-bold">CRITICAL</span>
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <strong className="text-2xl font-black text-white">{severityCounts.Critical}</strong>
                  <span className="text-[10px] text-rose-300 block">Immediate Vessel Diversion</span>
                </div>

                <div className="p-3.5 bg-slate-950 border border-amber-500/40 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-amber-400">
                    <span className="font-bold">WARNING</span>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <strong className="text-2xl font-black text-white">{severityCounts.Warning}</strong>
                  <span className="text-[10px] text-amber-300 block">Speed Reduction & Caution</span>
                </div>

                <div className="p-3.5 bg-slate-950 border border-cyan-500/40 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-cyan-400">
                    <span className="font-bold">ADVISORY</span>
                    <Info className="w-4 h-4" />
                  </div>
                  <strong className="text-2xl font-black text-white">{severityCounts.Advisory}</strong>
                  <span className="text-[10px] text-cyan-300 block">Monitor Radar Telemetry</span>
                </div>

                <div className="p-3.5 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="font-bold">NOTICE</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <strong className="text-2xl font-black text-white">{severityCounts.Notice}</strong>
                  <span className="text-[10px] text-emerald-300 block">Routine Climate Notice</span>
                </div>
              </div>
            </div>
          )}

          {analysisViewMode === 'METRICS' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-sky-400 font-bold">
                  <Activity className="w-4 h-4" />
                  <span>INCIDENT RESOLUTION SLA</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Average incident lifecycle from initial satellite detection to coastal clear bulletin issuance: <strong>3.8 Hours</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-purple-400 font-bold">
                  <Layers className="w-4 h-4" />
                  <span>TELEMETRY SYNC FREQUENCY</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Direct satellite feed refresh rate across INCOIS, BMD, PMD & SL Navy Hydrographic offices: <strong>Every 15 Minutes</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <Shield className="w-4 h-4" />
                  <span>ACCURACY VERIFICATION RATE</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  DART ocean buoy validation score against radar satellite altimetry: <strong>99.4% Precision</strong>.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* FEATURE 1: MULTI-DIMENSIONAL ALERT FILTERS CONTROL BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-sky-400 uppercase">
            <Filter className="w-4 h-4" />
            <span>Multi-Dimensional Alert Filters & Search Bar</span>
          </div>

          {/* SEARCH INPUT BAR */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by region, title, port, authority..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-sky-500 placeholder:text-slate-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* FILTER CHIPS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {/* SEVERITY FILTER */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold block">Severity Filter:</label>
            <div className="flex items-center space-x-1 overflow-x-auto pb-1">
              {(['ALL', 'Critical', 'Warning', 'Advisory', 'Notice'] as SeverityType[]).map((sev) => {
                const style = getSeverityStyle(sev);
                const isActive = severityFilter === sev;
                return (
                  <button
                    key={sev}
                    onClick={() => setSeverityFilter(sev)}
                    className={`px-2.5 py-1 text-[10px] rounded-lg font-bold border transition-all ${
                      isActive
                        ? sev === 'ALL'
                          ? 'bg-sky-500 text-slate-950 border-sky-400'
                          : `${style.badgeBg} font-black ring-1 ring-current`
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {sev}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TIER FILTER (FEATURE 1: MULTI TIER ALERT) */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold block">Operational Tier Filter:</label>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as TierType)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">ALL OPERATIONAL TIERS</option>
              <option value="Tier 1">TIER 1 - PORT CAUTION</option>
              <option value="Tier 2">TIER 2 - SHIPPING CORRIDOR</option>
              <option value="Tier 3">TIER 3 - EMERGENCY DISPATCH</option>
            </select>
          </div>

          {/* CATEGORY FILTER DROPDOWN */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold block">Category Filter:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryType)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">ALL CATEGORIES</option>
              <option value="Cyclone">CYCLONE & TYPHOON</option>
              <option value="Tsunami">TSUNAMI WAVE</option>
              <option value="Gale">GALE WIND SQUALL</option>
              <option value="Pressure">PRESSURE DROP</option>
              <option value="Visibility">VISIBILITY & FOG</option>
              <option value="Monsoon">MONSOON RAIN</option>
              <option value="Storm Surge">STORM SURGE</option>
            </select>
          </div>

          {/* TIME WINDOW FILTER DROPDOWN & RESET */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-slate-400 uppercase font-bold block">Time Window Filter:</label>
              {(severityFilter !== 'ALL' || categoryFilter !== 'ALL' || tierFilter !== 'ALL' || timeWindowFilter !== 'ALL' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSeverityFilter('ALL');
                    setCategoryFilter('ALL');
                    setTierFilter('ALL');
                    setTimeWindowFilter('ALL');
                    setSearchQuery('');
                  }}
                  className="text-[10px] text-rose-400 hover:underline flex items-center space-x-0.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>
            <select
              value={timeWindowFilter}
              onChange={(e) => setTimeWindowFilter(e.target.value as TimeWindowType)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500"
            >
              <option value="ALL">ALL HISTORICAL & ACTIVE</option>
              <option value="1H">PAST 1 HOUR</option>
              <option value="6H">PAST 6 HOURS</option>
              <option value="24H">PAST 24 HOURS</option>
            </select>
          </div>
        </div>
      </div>

      {/* FEATURE 4: BATCH EXPORT DOCKED ACTION TOOLBAR */}
      <AnimatePresence>
        {selectedAlertIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="sticky bottom-4 z-40 bg-slate-900/95 backdrop-blur-md border border-sky-500/80 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
          >
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-sky-500 text-slate-950 font-black rounded-xl text-xs">
                {selectedAlertIds.length} SELECTED
              </span>
              <span className="text-slate-300 font-bold hidden sm:inline">
                Batch Actions Toolbar
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleExportCSV()}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 rounded-xl font-bold flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Batch CSV</span>
              </button>

              <button
                onClick={() => handleExportJSON()}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-purple-300 border border-purple-500/40 rounded-xl font-bold flex items-center space-x-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Batch JSON</span>
              </button>

              <button
                onClick={handleBatchEscalateTier}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-rose-300 border border-rose-500/40 rounded-xl font-bold flex items-center space-x-1"
              >
                <Zap className="w-3.5 h-3.5 text-rose-400" />
                <span>Escalate to Tier 3</span>
              </button>

              <button
                onClick={handleBatchAcknowledge}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold flex items-center space-x-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Acknowledge</span>
              </button>

              <button
                onClick={() => setSelectedAlertIds([])}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN GRID: 1. CUSTOM THRESHOLD CONFIGURATOR & BREACH RADAR | 2. FILTERED ALERTS FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CONFIGURATOR & BREACH RADAR PANEL (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase border-b border-slate-800 pb-2 font-mono">
              <Sliders className="w-4 h-4 text-rose-400" />
              <span>Custom Alert Threshold Setup</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Trigger instant visual toasts and bridge warnings when ocean telemetry exceeds custom threshold limits.
            </p>

            {/* THRESHOLD SLIDERS / INPUTS */}
            <div className="space-y-3.5 text-xs font-mono">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Gale Wind Speed Trigger:</span>
                  <strong className="text-cyan-300">&gt; {windThresholdKts} kts</strong>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={windThresholdKts}
                  onChange={(e) => setWindThresholdKts(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Max Wave Swell Height:</span>
                  <strong className="text-amber-300">&gt; {waveHeightThresholdM} m</strong>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="7.0"
                  step="0.1"
                  value={waveHeightThresholdM}
                  onChange={(e) => setWaveHeightThresholdM(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Barometric Pressure Drop:</span>
                  <strong className="text-rose-300">&lt; {pressureThresholdHpa} hPa</strong>
                </div>
                <input
                  type="range"
                  min="970"
                  max="1010"
                  value={pressureThresholdHpa}
                  onChange={(e) => setPressureThresholdHpa(Number(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-950"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Min Visibility Limit:</span>
                  <strong className="text-purple-300">&lt; {visibilityThresholdNm} NM</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={visibilityThresholdNm}
                  onChange={(e) => setVisibilityThresholdNm(Number(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-950"
                />
              </div>
            </div>

            {/* LIVE TELEMETRY CONDITION SIMULATOR CARD */}
            <div
              className={`p-4 rounded-2xl border space-y-2 font-mono transition-all ${
                totalBreaches > 0
                  ? 'bg-rose-950/80 border-rose-500/80 text-rose-200 shadow-xl shadow-rose-950/50'
                  : 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>TELEMETRY BREACH RADAR</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black border border-current">
                  {totalBreaches > 0 ? `${totalBreaches} BREACHES DETECTED` : 'NORMAL CONDITIONS'}
                </span>
              </div>

              <div className="text-[11px] space-y-1.5 pt-1">
                <div className={`flex justify-between ${isWindBreached ? 'font-bold text-rose-300' : 'text-slate-300'}`}>
                  <span>Wind Speed: {simulatedWindKts} kts</span>
                  <span>{isWindBreached ? '⚠️ EXCEEDS LIMIT' : '✓ NORMAL'}</span>
                </div>
                <div className={`flex justify-between ${isWaveBreached ? 'font-bold text-amber-300' : 'text-slate-300'}`}>
                  <span>Wave Swell: {simulatedWaveM} m</span>
                  <span>{isWaveBreached ? '⚠️ EXCEEDS LIMIT' : '✓ NORMAL'}</span>
                </div>
                <div className={`flex justify-between ${isPressureBreached ? 'font-bold text-rose-300' : 'text-slate-300'}`}>
                  <span>Pressure: {simulatedPressureHpa} hPa</span>
                  <span>{isPressureBreached ? '⚠️ CRITICAL DROP' : '✓ NORMAL'}</span>
                </div>
                <div className={`flex justify-between ${isVisibilityBreached ? 'font-bold text-purple-300' : 'text-slate-300'}`}>
                  <span>Visibility: {simulatedVisibilityNm} NM</span>
                  <span>{isVisibilityBreached ? '⚠️ LOW VISIBILITY' : '✓ NORMAL'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-3 text-center font-mono">
            Integrated with INCOIS, BMD, PMD & SL Navy Hydrographic Weather Feeds
          </div>
        </div>

        {/* LIVE REGIONAL SEVERE CLIMATE ALERTS FEED (2 COLS) */}
        <div className="lg:col-span-2 space-y-4">
          {/* 24-HOUR CLIMATE ALERT FREQUENCY SPARKLINE TREND CHART */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                    <span>24-Hour Climate Alert Frequency Sparkline</span>
                    <span className="text-[9px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-bold">
                      24h Frequency Telemetry
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-sans">
                    Hourly alert volume trends across Bay of Bengal, Arabian Sea, & Palk Strait
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-[10px] text-slate-300">
                <span>Peak: <strong className="text-rose-400 font-bold">12:00 UTC (16 Alerts)</strong></span>
                <span>Trend: <strong className="text-emerald-400 font-bold">+18.4% ↗</strong></span>
              </div>
            </div>

            <div className="h-16 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyTimeAnalysisData} margin={{ top: 2, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="weatherSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hourLabel" tick={{ fill: '#64748b', fontSize: 8 }} axisLine={{ stroke: '#334155' }} tickLine={false} />
                  <YAxis hide domain={[0, 'dataMax + 2']} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-950 border border-sky-500/40 p-2 rounded-xl text-[10px] font-mono space-y-1 shadow-xl">
                            <div className="text-sky-400 font-bold border-b border-slate-800 pb-0.5">{d.hourLabel} Window</div>
                            <div className="text-white font-bold">{d.total} Active Alerts</div>
                            <div className="text-slate-400 text-[9px]">{d.Critical} Critical • {d.Warning} Warning • {d.Advisory} Advisory</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#weatherSparklineGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
            <div className="flex items-center space-x-3">
              {/* SELECT ALL CHECKBOX (FEATURE 4: BATCH SELECTION) */}
              <button
                onClick={handleToggleSelectAll}
                className="text-slate-400 hover:text-white flex items-center space-x-1.5 text-xs font-bold"
              >
                {isAllSelected ? (
                  <CheckSquare className="w-4 h-4 text-sky-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>Select All ({filteredAlerts.length})</span>
              </button>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Active Severe Weather Bulletins</span>
              </div>
            </div>

            <span className="text-xs text-slate-400 font-bold">
              Showing {filteredAlerts.length} of {alertsList.length} Bulletins
            </span>
          </div>

          {/* ALERT BULLETINS CARDS LIST WITH ANIMATED TRANSITIONS (FEATURE 3: ANIMATE ALERT TRANSITION) */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert, index) => {
                  const severityStyle = getSeverityStyle(alert.severity);
                  const tierStyle = getTierStyle(alert.tier);
                  const isSelected = selectedAlertIds.includes(alert.id);

                  return (
                    <motion.div
                      key={alert.id}
                      layout
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: index * 0.03 }}
                      className={`p-4 rounded-2xl border space-y-2.5 transition-all shadow-lg ${severityStyle.cardBg} ${severityStyle.accentBorder} ${
                        isSelected ? 'ring-2 ring-sky-500 bg-slate-900/90' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* CHECKBOX FOR BATCH ACTION */}
                          <button
                            onClick={() => handleToggleSelectAlert(alert.id)}
                            className="text-slate-400 hover:text-white transition-all"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-sky-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </button>

                          {/* OPERATIONAL TIER BADGE (FEATURE 1: MULTI TIER) */}
                          <span
                            onClick={() => handleToggleIndividualTier(alert.id, alert.tier)}
                            title="Click to cycle operational escalation tier"
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border font-mono cursor-pointer hover:scale-105 transition-all ${tierStyle.badge}`}
                          >
                            {tierStyle.label}
                          </span>

                          {/* SEVERITY BADGE (COLOUR CODED) */}
                          <span
                            className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border font-mono ${severityStyle.badgeBg}`}
                          >
                            {alert.severity} • {alert.category}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-white flex items-center justify-between">
                        <span>{alert.title}</span>
                        <span className="text-[10px] font-mono text-slate-500">{alert.id}</span>
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {alert.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono pt-1 border-t border-slate-900/80">
                        {alert.affectedPorts && alert.affectedPorts.length > 0 && (
                          <div>
                            Affected Ports: <strong className="text-slate-200">{alert.affectedPorts.join(', ')}</strong>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          {alert.authority && (
                            <span className="text-slate-400 italic">
                              Issuer: <span className="text-slate-300 font-bold">{alert.authority}</span>
                            </span>
                          )}
                          {alert.acknowledged && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold text-[9px]">
                              ✓ ACKNOWLEDGED
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3"
                >
                  <Filter className="w-8 h-8 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-white font-mono">NO ALERTS MATCH CURRENT FILTERS</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try adjusting tier, severity, category, or search parameters to view active weather bulletins.
                  </p>
                  <button
                    onClick={() => {
                      setSeverityFilter('ALL');
                      setCategoryFilter('ALL');
                      setTierFilter('ALL');
                      setTimeWindowFilter('ALL');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl font-mono"
                  >
                    RESET ALL FILTERS
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
