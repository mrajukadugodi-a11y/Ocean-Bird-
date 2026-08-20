import React, { useState, useEffect } from 'react';
import {
  Waves,
  Wind,
  Thermometer,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ArrowUpRight,
  Info,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Layers,
  Zap,
  Radio,
  Gauge,
  HelpCircle,
  X,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

export interface RegionalSeaStateMetric {
  id: string;
  zoneName: string;
  subRegion: string;
  countryFlags: string[];
  waveHeightM: number;
  swellPeriodSec: number;
  seaStateCategory: 'Calm & Smooth' | 'Moderate Swells' | 'Rough Seas' | 'High Rollers' | 'Heavy Surge / Cyclonic';
  douglasState: number; // 0 to 9
  windSpeedKnots: number;
  windGustKnots: number;
  windDirection: string;
  windDegrees: number;
  beaufortScale: number; // 0 to 12
  seaSurfaceTempC: number;
  pressureHpa: number;
  visibilityNm: number;
  alertLevel: 'Normal' | 'Swell Watch' | 'Gale Warning' | 'Cyclone Watch';
  summaryMessage: string;
  lastUpdated: string;
}

const INITIAL_REGIONAL_METRICS: RegionalSeaStateMetric[] = [
  {
    id: 'bay-of-bengal-north',
    zoneName: 'North Bay of Bengal & Chittagong Shelf',
    subRegion: 'Bay of Bengal',
    countryFlags: ['🇧🇩', '🇮🇳'],
    waveHeightM: 3.6,
    swellPeriodSec: 11,
    seaStateCategory: 'High Rollers',
    douglasState: 5,
    windSpeedKnots: 32,
    windGustKnots: 46,
    windDirection: 'SW',
    windDegrees: 225,
    beaufortScale: 7,
    seaSurfaceTempC: 30.5,
    pressureHpa: 994,
    visibilityNm: 4.2,
    alertLevel: 'Cyclone Watch',
    summaryMessage: 'Deep monsoon depression causing heavy swells and gale force squalls near Karnaphuli mouth.',
    lastUpdated: 'Live sensor feed (1m ago)'
  },
  {
    id: 'arabian-sea-west-india',
    zoneName: 'Arabian Sea (Mumbai & Konkan Coast)',
    subRegion: 'Arabian Sea',
    countryFlags: ['🇮🇳'],
    waveHeightM: 2.1,
    swellPeriodSec: 9,
    seaStateCategory: 'Moderate Swells',
    douglasState: 4,
    windSpeedKnots: 18,
    windGustKnots: 26,
    windDirection: 'WSW',
    windDegrees: 245,
    beaufortScale: 5,
    seaSurfaceTempC: 28.8,
    pressureHpa: 1008,
    visibilityNm: 8.5,
    alertLevel: 'Swell Watch',
    summaryMessage: 'Moderate monsoonal sea roll with onshore winds. Safe for deep draft vessels, fishing advisory active.',
    lastUpdated: 'Live buoy #34 (2m ago)'
  },
  {
    id: 'laccadive-maldives-atolls',
    zoneName: 'Laccadive Sea & Malé Atoll Passages',
    subRegion: 'Indian Ocean',
    countryFlags: ['🇲🇻', '🇮🇳'],
    waveHeightM: 1.4,
    swellPeriodSec: 12,
    seaStateCategory: 'Calm & Smooth',
    douglasState: 3,
    windSpeedKnots: 12,
    windGustKnots: 18,
    windDirection: 'SSW',
    windDegrees: 200,
    beaufortScale: 3,
    seaSurfaceTempC: 29.2,
    pressureHpa: 1012,
    visibilityNm: 11.0,
    alertLevel: 'Normal',
    summaryMessage: 'Gentle long-period swells crossing One and Half Degree Channel. Optimal inter-island sailing conditions.',
    lastUpdated: 'Live buoy #12 (Just now)'
  },
  {
    id: 'sri-lanka-dondra-head',
    zoneName: 'Southern Sri Lanka & Dondra Deep Corridor',
    subRegion: 'Indian Ocean',
    countryFlags: ['🇱🇰'],
    waveHeightM: 2.8,
    swellPeriodSec: 10,
    seaStateCategory: 'Rough Seas',
    douglasState: 5,
    windSpeedKnots: 24,
    windGustKnots: 34,
    windDirection: 'SW',
    windDegrees: 220,
    beaufortScale: 6,
    seaSurfaceTempC: 28.5,
    pressureHpa: 1006,
    visibilityNm: 7.0,
    alertLevel: 'Gale Warning',
    summaryMessage: 'Strong SW monsoon wind drift along southern TSS shipping route. High surface chop reported.',
    lastUpdated: 'Galle buoy (3m ago)'
  },
  {
    id: 'andaman-sea-trench',
    zoneName: 'Andaman Sea & Ten Degree Channel',
    subRegion: 'Andaman Sea',
    countryFlags: ['🇮🇳', '🇲🇲'],
    waveHeightM: 2.4,
    swellPeriodSec: 8,
    seaStateCategory: 'Moderate Swells',
    douglasState: 4,
    windSpeedKnots: 21,
    windGustKnots: 30,
    windDirection: 'S',
    windDegrees: 180,
    beaufortScale: 5,
    seaSurfaceTempC: 30.1,
    pressureHpa: 1004,
    visibilityNm: 6.8,
    alertLevel: 'Swell Watch',
    summaryMessage: 'Convective thunderstorm clouds over Port Blair with localized sea squalls.',
    lastUpdated: 'INCOIS buoy (4m ago)'
  },
  {
    id: 'malacca-strait-north',
    zoneName: 'Malacca Strait North Entrance (Phuket/Penang)',
    subRegion: 'Malacca Strait',
    countryFlags: ['🇲🇾', '🇸🇬', '🇹🇭'],
    waveHeightM: 1.1,
    swellPeriodSec: 7,
    seaStateCategory: 'Calm & Smooth',
    douglasState: 2,
    windSpeedKnots: 9,
    windGustKnots: 14,
    windDirection: 'SE',
    windDegrees: 135,
    beaufortScale: 3,
    seaSurfaceTempC: 29.8,
    pressureHpa: 1010,
    visibilityNm: 12.0,
    alertLevel: 'Normal',
    summaryMessage: 'Protected waterway with smooth sea state. Smooth transit for container feeders and tankers.',
    lastUpdated: 'MPA buoy (1m ago)'
  },
  {
    id: 'gulf-of-oman-karachi',
    zoneName: 'Gulf of Oman & Karachi Coastal Shelf',
    subRegion: 'Arabian Sea',
    countryFlags: ['🇵🇰', '🇴🇲'],
    waveHeightM: 1.8,
    swellPeriodSec: 9,
    seaStateCategory: 'Moderate Swells',
    douglasState: 3,
    windSpeedKnots: 16,
    windGustKnots: 22,
    windDirection: 'WNW',
    windDegrees: 290,
    beaufortScale: 4,
    seaSurfaceTempC: 27.6,
    pressureHpa: 1009,
    visibilityNm: 9.2,
    alertLevel: 'Normal',
    summaryMessage: 'Northwest breeze causing slight sea chop off Gwadar and Karachi outer anchorages.',
    lastUpdated: 'KPT signal station (5m ago)'
  },
  {
    id: 'palk-strait-mannar',
    zoneName: 'Palk Strait & Gulf of Mannar',
    subRegion: 'Bay of Bengal',
    countryFlags: ['🇮🇳', '🇱🇰'],
    waveHeightM: 1.6,
    swellPeriodSec: 6,
    seaStateCategory: 'Moderate Swells',
    douglasState: 3,
    windSpeedKnots: 17,
    windGustKnots: 25,
    windDirection: 'SW',
    windDegrees: 225,
    beaufortScale: 4,
    seaSurfaceTempC: 29.6,
    pressureHpa: 1007,
    visibilityNm: 8.0,
    alertLevel: 'Normal',
    summaryMessage: 'Shallow water chop with active fishing vessel operations around Adams Bridge.',
    lastUpdated: 'Tuticorin buoy (2m ago)'
  }
];

export const SeaStateWindDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<RegionalSeaStateMetric[]>(INITIAL_REGIONAL_METRICS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subRegionFilter, setSubRegionFilter] = useState<string>('All');
  const [selectedZone, setSelectedZone] = useState<RegionalSeaStateMetric | null>(metrics[0]);

  // Unit settings
  const [windUnit, setWindUnit] = useState<'knots' | 'kmh'>('knots');
  const [waveUnit, setWaveUnit] = useState<'m' | 'ft'>('m');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  // Live simulation state
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [showReferenceModal, setShowReferenceModal] = useState<boolean>(false);

  // Live simulation effect to simulate real-time sensor fluctuation
  useEffect(() => {
    let interval: any;
    if (isLiveSimulating) {
      interval = setInterval(() => {
        setMetrics((prevMetrics) =>
          prevMetrics.map((item) => {
            const windDelta = (Math.random() - 0.5) * 1.8;
            const waveDelta = (Math.random() - 0.5) * 0.15;
            const newWind = Math.max(4, Math.min(65, Math.round((item.windSpeedKnots + windDelta) * 10) / 10));
            const newWave = Math.max(0.4, Math.min(8.5, Math.round((item.waveHeightM + waveDelta) * 10) / 10));

            return {
              ...item,
              windSpeedKnots: newWind,
              waveHeightM: newWave,
              lastUpdated: 'Live (Updated just now)'
            };
          })
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Calculate high-level regional aggregates
  const avgSst = (
    metrics.reduce((acc, curr) => acc + curr.seaSurfaceTempC, 0) / metrics.length
  ).toFixed(1);

  const maxWave = Math.max(...metrics.map((m) => m.waveHeightM)).toFixed(1);
  const avgWind = Math.round(
    metrics.reduce((acc, curr) => acc + curr.windSpeedKnots, 0) / metrics.length
  );
  const maxGust = Math.max(...metrics.map((m) => m.windGustKnots));
  const activeAlertCount = metrics.filter((m) => m.alertLevel !== 'Normal').length;

  // Filter logic
  const filteredMetrics = metrics.filter((item) => {
    const matchesSearch =
      item.zoneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summaryMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubRegion =
      subRegionFilter === 'All' ? true : item.subRegion === subRegionFilter;
    return matchesSearch && matchesSubRegion;
  });

  // Helpers for unit conversion
  const formatWind = (knots: number) => {
    if (windUnit === 'kmh') return `${Math.round(knots * 1.852)} km/h`;
    return `${knots} kts`;
  };

  const formatWave = (meters: number) => {
    if (waveUnit === 'ft') return `${(meters * 3.28084).toFixed(1)} ft`;
    return `${meters.toFixed(1)} m`;
  };

  const formatTemp = (celsius: number) => {
    if (tempUnit === 'F') return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    return `${celsius.toFixed(1)}°C`;
  };

  return (
    <div id="sea-state-wind-dashboard" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>INDIAN OCEAN REGIONAL BUOY NETWORK & OCEANOGRAPHIC TELEMETRY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Waves className="w-6 h-6 text-cyan-400" />
              <span>Live Sea-State & Wind Speed Dashboard</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time wave swells, Beaufort wind speed force, sea surface temperatures, and maritime safety metrics for coastal corridors and deep-sea transit lanes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Live Simulation Pulse Toggle */}
            <button
              onClick={() => setIsLiveSimulating(!isLiveSimulating)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                isLiveSimulating
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isLiveSimulating ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
              <span>{isLiveSimulating ? 'LIVE FEED ACTIVE' : 'PAUSED FEED'}</span>
            </button>

            {/* Reference Manual Modal Toggle */}
            <button
              onClick={() => setShowReferenceModal(true)}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Beaufort & Douglas Scale Guide</span>
            </button>
          </div>
        </div>

        {/* At-a-Glance Summary Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
          {/* Card 1: Avg SST */}
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>AVG SEA TEMP</span>
              <Thermometer className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono">
              {formatTemp(Number(avgSst))}
            </div>
            <div className="text-[10px] text-rose-400 font-medium flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+0.8°C above seasonal avg</span>
            </div>
          </div>

          {/* Card 2: Max Wave Height */}
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>PEAK SWELL HEIGHT</span>
              <Waves className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono">
              {formatWave(Number(maxWave))}
            </div>
            <div className="text-[10px] text-cyan-400 font-medium">
              North Bay of Bengal outer buoy
            </div>
          </div>

          {/* Card 3: Avg Wind Speed */}
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>MEAN WIND SPEED</span>
              <Wind className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-teal-300 font-mono">
              {formatWind(avgWind)}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Peak Gusts: {formatWind(maxGust)}
            </div>
          </div>

          {/* Card 4: Regional Sea State Index */}
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>DOUGLAS SEA STATE</span>
              <Gauge className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono">
              State 5 <span className="text-xs font-normal text-slate-400">(Rough)</span>
            </div>
            <div className="text-[10px] text-amber-400 font-medium">
              Beaufort Force 4–7 Active
            </div>
          </div>

          {/* Card 5: Active Advisories */}
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-semibold">
              <span>ACTIVE ADVISORIES</span>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-rose-400 font-mono">
              {activeAlertCount} Zones
            </div>
            <div className="text-[10px] text-rose-300 font-medium">
              High Swell & Gale Warnings
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar: Search, Sub-Region Filter, Unit Switches */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search sea zone, shelf or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Sub-Region Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {['All', 'Bay of Bengal', 'Arabian Sea', 'Indian Ocean', 'Andaman Sea', 'Malacca Strait'].map((sub) => (
            <button
              key={sub}
              onClick={() => setSubRegionFilter(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                subRegionFilter === sub
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Unit Selectors */}
        <div className="flex items-center space-x-3 text-xs bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
          {/* Wind Unit */}
          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Wind:</span>
            <button
              onClick={() => setWindUnit('knots')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                windUnit === 'knots' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Kts
            </button>
            <button
              onClick={() => setWindUnit('kmh')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                windUnit === 'kmh' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Km/h
            </button>
          </div>

          <span className="text-slate-800">|</span>

          {/* Wave Unit */}
          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Wave:</span>
            <button
              onClick={() => setWaveUnit('m')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                waveUnit === 'm' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Meters
            </button>
            <button
              onClick={() => setWaveUnit('ft')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                waveUnit === 'ft' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Feet
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Sea State & Wind Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMetrics.map((item) => {
          const isSelected = selectedZone?.id === item.id;
          const isWarning = item.alertLevel !== 'Normal';

          return (
            <div
              key={item.id}
              onClick={() => setSelectedZone(item)}
              className={`bg-slate-900 border rounded-2xl p-4 transition-all cursor-pointer space-y-3.5 shadow-lg relative overflow-hidden group ${
                isSelected
                  ? 'border-cyan-400 ring-1 ring-cyan-400/50 shadow-cyan-500/10'
                  : isWarning
                  ? 'border-rose-500/40 hover:border-rose-400 bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Row: Zone Name & Country Flags */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-1.5 mb-1">
                    {item.countryFlags.map((flag, idx) => (
                      <span key={idx} className="text-base">{flag}</span>
                    ))}
                    <span className="text-[10px] font-bold font-mono text-cyan-400 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {item.subRegion}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm leading-tight group-hover:text-cyan-300 transition-colors">
                    {item.zoneName}
                  </h3>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border shrink-0 ${
                    item.alertLevel === 'Cyclone Watch'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : item.alertLevel === 'Gale Warning'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : item.alertLevel === 'Swell Watch'
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {item.alertLevel}
                </span>
              </div>

              {/* Primary Dual Telemetry Gauge Cards: Wave & Wind */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* Wave Card */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span className="flex items-center space-x-1">
                      <Waves className="w-3 h-3 text-cyan-400" />
                      <span>SWELL WAVE</span>
                    </span>
                    <span className="text-cyan-400 font-bold">D{item.douglasState}</span>
                  </div>
                  <div className="text-base font-bold text-cyan-300">
                    {formatWave(item.waveHeightM)}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    Period: {item.swellPeriodSec}s
                  </div>
                </div>

                {/* Wind Card */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span className="flex items-center space-x-1">
                      <Wind className="w-3 h-3 text-teal-400" />
                      <span>WIND SPEED</span>
                    </span>
                    <span className="text-teal-400 font-bold">B{item.beaufortScale}</span>
                  </div>
                  <div className="text-base font-bold text-teal-300">
                    {formatWind(item.windSpeedKnots)}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate flex items-center space-x-1">
                    <Compass
                      className="w-3 h-3 text-amber-400 inline shrink-0"
                      style={{ transform: `rotate(${item.windDegrees}deg)` }}
                    />
                    <span>{item.windDirection} ({item.windDegrees}°)</span>
                  </div>
                </div>
              </div>

              {/* Secondary Metrics Bar: Gusts, Temp, Pressure */}
              <div className="grid grid-cols-3 gap-1 text-[11px] font-mono bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-slate-300">
                <div className="text-center border-r border-slate-800">
                  <div className="text-[9px] text-slate-500">GUSTS</div>
                  <div className="font-bold text-amber-300">{formatWind(item.windGustKnots)}</div>
                </div>
                <div className="text-center border-r border-slate-800">
                  <div className="text-[9px] text-slate-500">SEA TEMP</div>
                  <div className="font-bold text-rose-300">{formatTemp(item.seaSurfaceTempC)}</div>
                </div>
                <div className="text-center">
                  <div className="text-[9px] text-slate-500">BARO</div>
                  <div className="font-bold text-slate-200">{item.pressureHpa} hPa</div>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {item.summaryMessage}
              </p>

              {/* Footer status */}
              <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-slate-800/80 text-slate-500">
                <span className="truncate">{item.lastUpdated}</span>
                <span className="text-cyan-400 font-bold flex items-center space-x-1">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Zone Telemetry Drawer / Spotlight (When a zone is selected) */}
      {selectedZone && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-bold text-white">{selectedZone.zoneName}</span>
                  <span className="text-xs font-mono text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {selectedZone.subRegion}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Coordinates: Coastal & Deep-Sea Buoy Telemetry ({selectedZone.lastUpdated})
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-bold mr-1">Alert Category:</span>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase border ${
                  selectedZone.alertLevel === 'Cyclone Watch'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : selectedZone.alertLevel === 'Gale Warning'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {selectedZone.alertLevel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            {/* Wave & Sea State Deep Dive */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center space-x-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                <span>Wave Swell & Douglas Scale</span>
              </div>
              <div className="text-2xl font-bold text-cyan-300">{formatWave(selectedZone.waveHeightM)}</div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>• Douglas State: <strong>State {selectedZone.douglasState} ({selectedZone.seaStateCategory})</strong></div>
                <div>• Swell Period: <strong>{selectedZone.swellPeriodSec} Seconds</strong></div>
                <div>• Wave Classification: <strong>{selectedZone.waveHeightM > 3.0 ? 'High Rollers / Cyclonic Swell' : 'Moderate Swell'}</strong></div>
              </div>
            </div>

            {/* Wind Vector & Beaufort Scale Deep Dive */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center space-x-1.5">
                <Wind className="w-3.5 h-3.5 text-teal-400" />
                <span>Wind Speed & Beaufort Force</span>
              </div>
              <div className="text-2xl font-bold text-teal-300">{formatWind(selectedZone.windSpeedKnots)}</div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>• Beaufort Force: <strong>Force {selectedZone.beaufortScale}</strong></div>
                <div>• Max Gusts: <strong>{formatWind(selectedZone.windGustKnots)}</strong></div>
                <div>• Wind Direction: <strong>{selectedZone.windDirection} ({selectedZone.windDegrees}°)</strong></div>
              </div>
            </div>

            {/* Thermal & Atmospheric Deep Dive */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center space-x-1.5">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                <span>Ocean Thermal & Atmospheric</span>
              </div>
              <div className="text-2xl font-bold text-rose-300">{formatTemp(selectedZone.seaSurfaceTempC)}</div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>• Barometric Pressure: <strong>{selectedZone.pressureHpa} hPa</strong></div>
                <div>• Visibility Distance: <strong>{selectedZone.visibilityNm} NM</strong></div>
                <div>• Cyclone Potential: <strong>{selectedZone.seaSurfaceTempC >= 29.5 ? 'HIGH (SST > 29.5°C)' : 'MODERATE'}</strong></div>
              </div>
            </div>

            {/* Advisory Action Notice */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>MARITIME SAFETY ADVISORY</span>
              </div>
              <p className="text-[11px] text-amber-200 leading-relaxed font-semibold">
                {selectedZone.summaryMessage}
              </p>
              <div className="text-[10px] text-slate-400 pt-1">
                Vessels in this zone are advised to check VHF Ch 16 and broadcast automated position updates.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Beaufort & Douglas Scale Reference Guide Modal */}
      {showReferenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span>Beaufort Wind Force & Douglas Sea State Reference Standard</span>
              </div>
              <button
                onClick={() => setShowReferenceModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs max-h-[60vh] overflow-y-auto pr-1">
              {/* Beaufort Guide */}
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center space-x-1.5">
                  <Wind className="w-4 h-4 text-teal-400" />
                  <span>Beaufort Wind Scale (Force 0 – 12)</span>
                </h4>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                    <span className="text-cyan-300 font-bold">Force 0–3 (Calm to Gentle)</span>
                    <span className="text-slate-300">0 – 10 Knots (0.1 – 0.6m waves)</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                    <span className="text-emerald-300 font-bold">Force 4–5 (Moderate to Fresh)</span>
                    <span className="text-slate-300">11 – 21 Knots (1.0 – 2.5m waves)</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                    <span className="text-amber-300 font-bold">Force 6–7 (Strong Breeze / Near Gale)</span>
                    <span className="text-slate-300">22 – 33 Knots (3.0 – 4.0m waves)</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                    <span className="text-rose-400 font-bold">Force 8–9 (Gale / Strong Gale)</span>
                    <span className="text-slate-300">34 – 47 Knots (5.5 – 7.0m waves)</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                    <span className="text-purple-400 font-bold">Force 10–12 (Storm / Violent / Hurricane)</span>
                    <span className="text-slate-300">48+ Knots (9.0m+ waves)</span>
                  </div>
                </div>
              </div>

              {/* Douglas Guide */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-white text-sm flex items-center space-x-1.5">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <span>Douglas Sea State Scale (Degrees 0 – 9)</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-cyan-300 font-bold">State 0–2:</span> Glassy to Smooth (0 – 0.5m)
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-emerald-300 font-bold">State 3–4:</span> Slight to Moderate (0.5 – 2.5m)
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-amber-300 font-bold">State 5–6:</span> Rough to Very Rough (2.5 – 6.0m)
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-rose-400 font-bold">State 7–9:</span> High to Phenomenal (6.0m+)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowReferenceModal(false)}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all"
              >
                CLOSE REFERENCE GUIDE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
