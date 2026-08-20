import React, { useState } from 'react';
import {
  Layers,
  Ship,
  Waves,
  Wind,
  Anchor,
  Compass,
  Maximize2,
  ZoomIn,
  ZoomOut,
  MapPin,
  ShieldAlert,
  Radio,
  Sparkles,
  Info,
  Check,
  AlertTriangle,
  Activity,
  Navigation,
  Thermometer,
  Flame,
  X,
  Copy,
  CheckCircle2,
  ArrowUpRight,
  BarChart2,
  Sliders,
  Eye
} from 'lucide-react';

export interface MapTarget {
  id: string;
  name: string;
  type: 'vessel' | 'reef' | 'harbor' | 'waypoint';
  xPct: number;
  yPct: number;
  details: string;
  severity?: 'normal' | 'warning' | 'critical';
}

export interface HeatmapRegion {
  id: string;
  name: string;
  coordinates: string; // e.g. "05°52'N, 80°35'E"
  xPct: number; // Center X percentage (0-100)
  yPct: number; // Center Y percentage (0-100)
  widthPct: number;
  heightPct: number;
  densityLevel: 'Extreme' | 'High' | 'Moderate' | 'Low';
  vesselCountPer100SqNM: number;
  vesselTypeBreakdown: {
    container: number; // %
    tanker: number; // %
    fishing: number; // %
    bulkCarrier: number; // %
  };
  weatherSeverity: 'Critical' | 'Warning' | 'Advisory' | 'Clear';
  weatherDetails: string;
  windSpeedKts: number;
  waveHeightMeters: number;
  riskAssessment: string;
  corridorType: 'Major Shipping Lane' | 'Coastal Feeder Pass' | 'Choke Point TSS' | 'Fishing Ground' | 'Deepwater Transit';
}

const SAMPLE_MAP_TARGETS: MapTarget[] = [
  // Vessels
  { id: 'v1', name: 'MV Ocean Express (Container)', type: 'vessel', xPct: 28, yPct: 42, details: 'MMSI: 419001234 • Speed: 14.2 kts • Heading: 110° • Destination: Colombo', severity: 'normal' },
  { id: 'v2', name: 'MT Indus Pioneer (Suezmax)', type: 'vessel', xPct: 62, yPct: 35, details: 'MMSI: 419005678 • Speed: 12.0 kts • Heading: 220° • Destination: JNPT Mumbai', severity: 'normal' },
  { id: 'v3', name: 'FV Sea Falcon (Fishery)', type: 'vessel', xPct: 45, yPct: 58, details: 'MMSI: 419009999 • Speed: 8.5 kts • In Potential Fishing Zone (PFZ)', severity: 'normal' },

  // Grounding Reefs
  { id: 'r1', name: 'Palk Strait Adams Bridge Shoal', type: 'reef', xPct: 52, yPct: 68, details: 'Chart Depth: +2.1m • High Grounding Danger • Max Draft: 3.5m', severity: 'critical' },
  { id: 'r2', name: 'Meghna Estuary Sandbar', type: 'reef', xPct: 78, yPct: 22, details: 'Chart Depth: +3.8m • Mud Flat Accumulation • Feeder Vessel Warning', severity: 'warning' },

  // Harbors
  { id: 'h1', name: 'Mumbai JNPT Port Terminal', type: 'harbor', xPct: 22, yPct: 38, details: 'Water Depth: +14.5m • Pilot Station Alpha • Anchorage Active', severity: 'normal' },
  { id: 'h2', name: 'Colombo International Container Terminal', type: 'harbor', xPct: 58, yPct: 78, details: 'Water Depth: +18.0m • Deepwater Hub • 24h Berth Lock', severity: 'normal' },
  { id: 'h3', name: 'Chittagong Outer Anchorage', type: 'harbor', xPct: 82, yPct: 25, details: 'Water Depth: +10.2m • Karnaphuli Bar Tidal Access', severity: 'warning' },

  // Waypoints
  { id: 'w1', name: 'Dondra Head TSS Waypoint', type: 'waypoint', xPct: 60, yPct: 82, details: 'Traffic Separation Scheme • Monsoonal Swell 3.2m', severity: 'warning' }
];

const SAMPLE_HEATMAP_REGIONS: HeatmapRegion[] = [
  {
    id: 'hm-dondra',
    name: 'Dondra Head TSS & South Sri Lanka Corridor',
    coordinates: "05°52'N, 80°35'E",
    xPct: 58,
    yPct: 80,
    widthPct: 20,
    heightPct: 16,
    densityLevel: 'Extreme',
    vesselCountPer100SqNM: 185,
    vesselTypeBreakdown: { container: 48, tanker: 32, fishing: 8, bulkCarrier: 12 },
    weatherSeverity: 'Critical',
    weatherDetails: 'Sudden Monsoon Squall Line & High Sea Surge',
    windSpeedKts: 42,
    waveHeightMeters: 4.2,
    corridorType: 'Choke Point TSS',
    riskAssessment: 'HIGH RISK CONFLICT: Extremely dense commercial East-West trade traffic passing through an active monsoonal squall cell with 4.2m swells.'
  },
  {
    id: 'hm-mumbai',
    name: 'Arabian Sea Energy Highway (Mumbai Approach)',
    coordinates: "18°50'N, 68°30'E",
    xPct: 22,
    yPct: 36,
    widthPct: 22,
    heightPct: 18,
    densityLevel: 'High',
    vesselCountPer100SqNM: 138,
    vesselTypeBreakdown: { container: 30, tanker: 45, fishing: 10, bulkCarrier: 15 },
    weatherSeverity: 'Warning',
    weatherDetails: 'Heavy Ocean Swell & Gale Force Squall Lines',
    windSpeedKts: 34,
    waveHeightMeters: 3.5,
    corridorType: 'Major Shipping Lane',
    riskAssessment: 'MODERATE-HIGH RISK: Tanker-heavy corridor navigating rough monsoonal sea states. Mandatory speed reduction advised.'
  },
  {
    id: 'hm-sundarbans',
    name: 'North Bay of Bengal & Sundarbans Approach',
    coordinates: "21°15'N, 89°20'E",
    xPct: 80,
    yPct: 20,
    widthPct: 18,
    heightPct: 16,
    densityLevel: 'High',
    vesselCountPer100SqNM: 112,
    vesselTypeBreakdown: { container: 20, tanker: 15, fishing: 45, bulkCarrier: 20 },
    weatherSeverity: 'Critical',
    weatherDetails: 'Super Severe Tropical Cyclone Vortex (Cat 3)',
    windSpeedKts: 55,
    waveHeightMeters: 4.8,
    corridorType: 'Coastal Feeder Pass',
    riskAssessment: 'CRITICAL STORM HAZARD: Active Cat 3 Cyclone landfall path intersecting heavy feeder and fishing traffic.'
  },
  {
    id: 'hm-malacca',
    name: 'Malacca Strait Western Entrance Corridor',
    coordinates: "06°10'N, 94°50'E",
    xPct: 90,
    yPct: 76,
    widthPct: 16,
    heightPct: 18,
    densityLevel: 'Extreme',
    vesselCountPer100SqNM: 210,
    vesselTypeBreakdown: { container: 55, tanker: 25, fishing: 5, bulkCarrier: 15 },
    weatherSeverity: 'Warning',
    weatherDetails: 'Tropical Rain Squalls & Low Visibility (1.8 NM)',
    windSpeedKts: 28,
    waveHeightMeters: 2.2,
    corridorType: 'Choke Point TSS',
    riskAssessment: 'CONGESTION ALERT: Highest traffic density channel in the region. Squall rain reducing radar visibility.'
  },
  {
    id: 'hm-laccadive',
    name: 'Laccadive Sea & Nine Degree Channel',
    coordinates: "09°15'N, 73°10'E",
    xPct: 38,
    yPct: 65,
    widthPct: 18,
    heightPct: 16,
    densityLevel: 'Moderate',
    vesselCountPer100SqNM: 68,
    vesselTypeBreakdown: { container: 25, tanker: 20, fishing: 35, bulkCarrier: 20 },
    weatherSeverity: 'Advisory',
    weatherDetails: 'Inter-Island Monsoonal Swells & Coral Rollers',
    windSpeedKts: 20,
    waveHeightMeters: 2.4,
    corridorType: 'Deepwater Transit',
    riskAssessment: 'MODERATE ADVISORY: Passenger ferries and fishing craft operating in moderate roller swells.'
  },
  {
    id: 'hm-palk',
    name: 'Gulf of Mannar & Palk Strait Passage',
    coordinates: "08°40'N, 78°12'E",
    xPct: 50,
    yPct: 70,
    widthPct: 16,
    heightPct: 14,
    densityLevel: 'High',
    vesselCountPer100SqNM: 142,
    vesselTypeBreakdown: { container: 15, tanker: 10, fishing: 65, bulkCarrier: 10 },
    weatherSeverity: 'Advisory',
    weatherDetails: 'Shallow Waters & Tidal Rip Currents (3.2 kts)',
    windSpeedKts: 18,
    waveHeightMeters: 1.8,
    corridorType: 'Fishing Ground',
    riskAssessment: 'NAVIGATION CAUTION: High density of unlit artisanal fishing boats crossing shallow navigation tracks.'
  },
  {
    id: 'hm-maldives',
    name: 'Malé Lagoon & Ari Atoll Safari Channel',
    coordinates: "04°12'N, 72°50'E",
    xPct: 35,
    yPct: 88,
    widthPct: 16,
    heightPct: 12,
    densityLevel: 'Moderate',
    vesselCountPer100SqNM: 54,
    vesselTypeBreakdown: { container: 10, tanker: 10, fishing: 20, bulkCarrier: 60 }, // 60% tourism/passenger
    weatherSeverity: 'Clear',
    weatherDetails: 'Calm Lagoon Sea State & Fair Weather',
    windSpeedKts: 12,
    waveHeightMeters: 1.1,
    corridorType: 'Coastal Feeder Pass',
    riskAssessment: 'FAVORABLE CONDITIONS: Safe passage for cruise liners, liveaboards, and inter-atoll speedboats.'
  },
  {
    id: 'hm-chittagong',
    name: 'Chittagong Outer Anchorage & Karnaphuli',
    coordinates: "22°10'N, 91°45'E",
    xPct: 86,
    yPct: 16,
    widthPct: 14,
    heightPct: 14,
    densityLevel: 'High',
    vesselCountPer100SqNM: 135,
    vesselTypeBreakdown: { container: 35, tanker: 15, fishing: 20, bulkCarrier: 30 },
    weatherSeverity: 'Critical',
    weatherDetails: 'Bar Tidal Surge & High Tidal Bar Risk',
    windSpeedKts: 48,
    waveHeightMeters: 3.9,
    corridorType: 'Coastal Feeder Pass',
    riskAssessment: 'HIGH CONGESTION HAZARD: Heavy queue of bulk carriers anchored awaiting high tide draft clearance.'
  }
];

export const InteractiveMapOverlay: React.FC = () => {
  // Toggleable Layers
  const [showVessels, setShowVessels] = useState(true);
  const [showBathymetry, setShowBathymetry] = useState(true);
  const [showWeatherRadar, setShowWeatherRadar] = useState(true);
  const [showDensityHeatmap, setShowDensityHeatmap] = useState(true);
  const [showFleetWeather, setShowFleetWeather] = useState(true);
  const [showHarbors, setShowHarbors] = useState(true);
  const [showRoutePaths, setShowRoutePaths] = useState(true);

  // Selected map pin detail
  const [selectedPin, setSelectedPin] = useState<MapTarget | null>(SAMPLE_MAP_TARGETS[0]);

  // Selected Heatmap Region Popover State
  const [selectedHeatmapRegion, setSelectedHeatmapRegion] = useState<HeatmapRegion | null>(SAMPLE_HEATMAP_REGIONS[0]);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [filterDensityFilter, setFilterDensityFilter] = useState<'All' | 'Extreme' | 'High' | 'Moderate' | 'Low'>('All');

  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Filtered Heatmap Regions
  const filteredHeatmapRegions = SAMPLE_HEATMAP_REGIONS.filter(
    (r) => filterDensityFilter === 'All' || r.densityLevel === filterDensityFilter
  );

  const handleCopyCoords = (coords: string) => {
    navigator.clipboard.writeText(coords);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  return (
    <div id="interactive-map-overlay" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>GEOSPATIAL MULTI-LAYER OCEANIC MAP & VESSEL HEATMAP OVERLAY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              <span>Interactive Map Overlay & Traffic Density Heatmap</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Toggle real-time geospatial layers, inspect vessel density heatmaps, analyze high-traffic shipping corridors relative to severe weather zones, and click any region for interactive popover diagnostics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
            <Radio className="w-4 h-4 text-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-bold">6 MAP LAYERS ACTIVE</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300 font-bold flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>HEATMAP ACTIVE</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Container: Map Control Bar + Canvas Screen */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        {/* Layer Toggles Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-bold mr-1 flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAYERS:</span>
            </span>

            {/* Vessel Density Heatmap Button */}
            <button
              onClick={() => setShowDensityHeatmap(!showDensityHeatmap)}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition-all font-bold ${
                showDensityHeatmap
                  ? 'bg-gradient-to-r from-rose-500/30 to-amber-500/30 text-amber-300 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Traffic Heatmap</span>
              {showDensityHeatmap && <Check className="w-3 h-3 text-amber-400 ml-1" />}
            </button>

            {/* Vessel Layer Button */}
            <button
              onClick={() => setShowVessels(!showVessels)}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition-all ${
                showVessels
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>AIS Ships</span>
              {showVessels && <Check className="w-3 h-3 text-cyan-400 ml-1" />}
            </button>

            {/* Weather Radar Layer Button */}
            <button
              onClick={() => setShowWeatherRadar(!showWeatherRadar)}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition-all ${
                showWeatherRadar
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Weather Radar</span>
              {showWeatherRadar && <Check className="w-3 h-3 text-rose-400 ml-1" />}
            </button>

            {/* Bathymetry Layer Button */}
            <button
              onClick={() => setShowBathymetry(!showBathymetry)}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition-all ${
                showBathymetry
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Bathymetry & Reefs</span>
              {showBathymetry && <Check className="w-3 h-3 text-amber-400 ml-1" />}
            </button>

            {/* Fleet Weather Overlay Button */}
            <button
              onClick={() => setShowFleetWeather(!showFleetWeather)}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition-all ${
                showFleetWeather
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fleet Weather</span>
              {showFleetWeather && <Check className="w-3 h-3 text-emerald-400 ml-1" />}
            </button>

            {/* Harbors Layer Button */}
            <button
              onClick={() => setShowHarbors(!showHarbors)}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition-all ${
                showHarbors
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Anchor className="w-3.5 h-3.5" />
              <span>Port Anchorages</span>
              {showHarbors && <Check className="w-3 h-3 text-cyan-400 ml-1" />}
            </button>

            {/* Route Paths Button */}
            <button
              onClick={() => setShowRoutePaths(!showRoutePaths)}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition-all ${
                showRoutePaths
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Optimized Routes</span>
              {showRoutePaths && <Check className="w-3 h-3 text-purple-400 ml-1" />}
            </button>
          </div>

          {/* Density Filter Dropdown & Zoom controls */}
          <div className="flex items-center space-x-3 text-slate-400">
            <div className="flex items-center space-x-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
              <Sliders className="w-3 h-3 text-amber-400" />
              <select
                value={filterDensityFilter}
                onChange={(e) => setFilterDensityFilter(e.target.value as any)}
                className="bg-transparent text-[10px] text-amber-300 font-bold focus:outline-none"
              >
                <option value="All">All Density Levels</option>
                <option value="Extreme">Extreme Density</option>
                <option value="High">High Density</option>
                <option value="Moderate">Moderate Density</option>
              </select>
            </div>

            <div className="flex items-center space-x-1 text-slate-400">
              <button
                onClick={() => setZoomLevel(Math.max(80, zoomLevel - 10))}
                className="p-1 hover:text-white rounded hover:bg-slate-800"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[10px] w-10 text-center font-bold text-slate-200">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(140, zoomLevel + 10))}
                className="p-1 hover:text-white rounded hover:bg-slate-800"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Simulated Map Display Stage */}
        <div className="relative w-full h-[520px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex flex-col justify-between p-4">
          {/* Background Ocean Grid SVG & Radar Ring Overlay */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="oceanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0ea5e9" strokeWidth="0.5" strokeOpacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#oceanGrid)" />
            </svg>
          </div>

          {/* Layer: Weather & Monsoonal Storm Heatmap Overlay */}
          {showWeatherRadar && (
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-rose-900/40 via-amber-800/20 to-cyan-900/40 animate-pulse" />
          )}

          {/* Layer: Simulated Vessel Density Heatmap Zones */}
          {showDensityHeatmap && (
            <div className="absolute inset-0 z-10 pointer-events-auto">
              {filteredHeatmapRegions.map((region) => {
                const isSelected = selectedHeatmapRegion?.id === region.id;

                // Density color mapping
                const densityGradients =
                  region.densityLevel === 'Extreme'
                    ? 'from-rose-600/45 via-rose-500/25 to-amber-500/10 border-rose-500/70'
                    : region.densityLevel === 'High'
                    ? 'from-amber-500/40 via-amber-400/20 to-yellow-500/10 border-amber-400/60'
                    : 'from-cyan-500/30 via-teal-500/15 to-emerald-500/10 border-cyan-400/50';

                const badgeBg =
                  region.densityLevel === 'Extreme'
                    ? 'bg-rose-950/90 text-rose-300 border-rose-500/60'
                    : region.densityLevel === 'High'
                    ? 'bg-amber-950/90 text-amber-300 border-amber-500/60'
                    : 'bg-cyan-950/90 text-cyan-300 border-cyan-500/60';

                return (
                  <div
                    key={region.id}
                    onClick={() => {
                      setSelectedHeatmapRegion(region);
                      setSelectedPin(null);
                    }}
                    style={{
                      left: `${region.xPct}%`,
                      top: `${region.yPct}%`,
                      width: `${region.widthPct}%`,
                      height: `${region.heightPct}%`,
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 bg-gradient-to-br ${densityGradients} backdrop-blur-[2px] transition-all cursor-pointer group hover:scale-105 hover:z-30 ${
                      isSelected ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-950 z-30 scale-105' : 'z-10'
                    }`}
                  >
                    {/* Heatmap Region Centered Badge Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-1 text-center pointer-events-none">
                      <div className={`px-2 py-0.5 rounded-full border text-[10px] font-extrabold flex items-center space-x-1 shadow-lg ${badgeBg}`}>
                        <Flame className="w-3 h-3 text-rose-400 animate-pulse shrink-0" />
                        <span className="truncate max-w-[120px]">{region.vesselCountPer100SqNM} v/100NM²</span>
                      </div>

                      <div className="text-[9px] font-bold text-white drop-shadow-md mt-1 truncate max-w-[130px]">
                        {region.name}
                      </div>

                      {/* Severe Weather Threat Warning Tag if applicable */}
                      {region.weatherSeverity === 'Critical' && (
                        <div className="mt-1 bg-rose-600 text-white font-mono font-black text-[8px] px-1.5 py-0.2 rounded-full uppercase flex items-center space-x-1 animate-bounce">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          <span>STORM CONFLICT</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Layer: Optimized Route Path Overlay Lines */}
          {showRoutePaths && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {/* Path 1: Mumbai -> Colombo */}
              <path
                d="M 220 190 Q 320 300 580 390"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              {/* Path 2: Colombo -> Chittagong */}
              <path
                d="M 580 390 Q 700 230 820 120"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            </svg>
          )}

          {/* Map Target Pins (Vessels, Reefs, Harbors, Waypoints) */}
          <div className="relative w-full h-full z-20 pointer-events-auto">
            {SAMPLE_MAP_TARGETS.map((pin) => {
              if (pin.type === 'vessel' && !showVessels) return null;
              if (pin.type === 'reef' && !showBathymetry) return null;
              if (pin.type === 'harbor' && !showHarbors) return null;
              if (pin.type === 'waypoint' && !showRoutePaths) return null;

              const isSelected = selectedPin?.id === pin.id;

              return (
                <button
                  key={pin.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPin(pin);
                    setSelectedHeatmapRegion(null);
                  }}
                  style={{ left: `${pin.xPct}%`, top: `${pin.yPct}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all group ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-110 z-20'
                  }`}
                  title={pin.name}
                >
                  <div
                    className={`p-2 rounded-full border shadow-xl flex items-center justify-center ${
                      pin.type === 'vessel'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                        : pin.type === 'reef'
                        ? 'bg-rose-500/30 text-rose-200 border-rose-400 animate-bounce'
                        : pin.type === 'harbor'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                        : 'bg-purple-500/20 text-purple-300 border-purple-400'
                    }`}
                  >
                    {pin.type === 'vessel' && <Ship className="w-4 h-4" />}
                    {pin.type === 'reef' && <ShieldAlert className="w-4 h-4" />}
                    {pin.type === 'harbor' && <Anchor className="w-4 h-4" />}
                    {pin.type === 'waypoint' && <Compass className="w-4 h-4" />}
                  </div>

                  <span className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-slate-950/90 text-[10px] text-slate-200 px-2 py-0.5 rounded border border-slate-800 font-mono shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {pin.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Heatmap Region Quick Selector Bar (Bottom of Map) */}
          <div className="relative z-30 flex items-center justify-between bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono backdrop-blur-md gap-3 flex-wrap">
            <div className="flex items-center space-x-2 text-slate-300">
              <Flame className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-white">SELECT REGION HEATMAP:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 flex-1 overflow-x-auto">
              {SAMPLE_HEATMAP_REGIONS.map((r) => {
                const isSel = selectedHeatmapRegion?.id === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedHeatmapRegion(r);
                      setSelectedPin(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
                      isSel
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{r.name.split('&')[0].split('(')[0]}</span>
                    {r.weatherSeverity === 'Critical' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
              05°N – 25°N, 65°E – 95°E
            </div>
          </div>
        </div>

        {/* POPOVER DIAGNOSTIC SUMMARY CARD: SELECTED HEATMAP REGION */}
        {selectedHeatmapRegion && (
          <div className="p-5 bg-slate-950 border-2 border-amber-500/40 rounded-2xl space-y-4 text-xs font-mono shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setSelectedHeatmapRegion(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              title="Close Popover"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Popover Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 pr-8">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>HEATMAP REGION POPOVER DIAGNOSTIC</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-normal">{selectedHeatmapRegion.corridorType}</span>
                </div>
                <h3 className="text-lg font-black text-white mt-0.5">{selectedHeatmapRegion.name}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyCoords(selectedHeatmapRegion.coordinates)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-teal-300 border border-slate-800 rounded-lg text-[10px] font-bold flex items-center space-x-1"
                >
                  {copiedCoords ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{selectedHeatmapRegion.coordinates}</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid: Traffic Density vs Severe Weather */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Traffic Volume Metric */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center space-x-1">
                  <Ship className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Traffic Volume & Density</span>
                </div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {selectedHeatmapRegion.vesselCountPer100SqNM} <span className="text-xs text-slate-400 font-normal">vessels / 100 NM²</span>
                </div>
                <div className="text-[10px] font-bold text-amber-300 uppercase">
                  Status: {selectedHeatmapRegion.densityLevel} Corridor Density
                </div>
              </div>

              {/* Weather Severity Metric */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center space-x-1">
                  <Wind className="w-3.5 h-3.5 text-rose-400" />
                  <span>Weather Severity</span>
                </div>
                <div className={`text-xl font-black font-mono ${
                  selectedHeatmapRegion.weatherSeverity === 'Critical' ? 'text-rose-400' :
                  selectedHeatmapRegion.weatherSeverity === 'Warning' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedHeatmapRegion.weatherSeverity.toUpperCase()}
                </div>
                <div className="text-[10px] text-slate-300 truncate">
                  {selectedHeatmapRegion.weatherDetails}
                </div>
              </div>

              {/* Wind Speed & Swell Metric */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center space-x-1">
                  <Waves className="w-3.5 h-3.5 text-teal-400" />
                  <span>Sea State & Wind</span>
                </div>
                <div className="text-xl font-black text-teal-300 font-mono">
                  {selectedHeatmapRegion.windSpeedKts} kts <span className="text-xs text-slate-400 font-normal">/ {selectedHeatmapRegion.waveHeightMeters}m Swell</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Monsoonal Drag Vector: 195° SSW
                </div>
              </div>

              {/* Corridor Classification */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center space-x-1">
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                  <span>Zone Classification</span>
                </div>
                <div className="text-sm font-black text-purple-300 font-mono">
                  {selectedHeatmapRegion.corridorType}
                </div>
                <div className="text-[10px] text-slate-400">
                  AIS Radar Coverage: 100% Active
                </div>
              </div>
            </div>

            {/* High Traffic vs Weather Conflict Risk Assessment Box */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              selectedHeatmapRegion.weatherSeverity === 'Critical'
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                : selectedHeatmapRegion.weatherSeverity === 'Warning'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            }`}>
              <div className="flex items-start space-x-3">
                <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                  selectedHeatmapRegion.weatherSeverity === 'Critical' ? 'text-rose-400 animate-bounce' : 'text-amber-400'
                }`} />
                <div className="space-y-1">
                  <div className="font-extrabold text-xs uppercase tracking-wide">
                    Navigational Risk Assessment & Traffic Conflict
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedHeatmapRegion.riskAssessment}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => alert(`Rerouting simulation waypoint initialized around ${selectedHeatmapRegion.name}`)}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all flex items-center space-x-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Route Avoidance</span>
                </button>
              </div>
            </div>

            {/* Vessel Type Distribution Percentage Bar */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                <span className="flex items-center space-x-1.5">
                  <BarChart2 className="w-4 h-4 text-cyan-400" />
                  <span>Simulated Vessel Type Distribution in Corridor</span>
                </span>
                <span className="text-[10px] text-slate-400">Total Sample: {selectedHeatmapRegion.vesselCountPer100SqNM * 2} Vessels</span>
              </div>

              {/* Multi-segment distribution bar */}
              <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                <div
                  style={{ width: `${selectedHeatmapRegion.vesselTypeBreakdown.container}%` }}
                  className="bg-cyan-500 h-full"
                  title={`Containers: ${selectedHeatmapRegion.vesselTypeBreakdown.container}%`}
                />
                <div
                  style={{ width: `${selectedHeatmapRegion.vesselTypeBreakdown.tanker}%` }}
                  className="bg-rose-500 h-full"
                  title={`Oil Tankers: ${selectedHeatmapRegion.vesselTypeBreakdown.tanker}%`}
                />
                <div
                  style={{ width: `${selectedHeatmapRegion.vesselTypeBreakdown.bulkCarrier}%` }}
                  className="bg-amber-500 h-full"
                  title={`Bulk Carriers: ${selectedHeatmapRegion.vesselTypeBreakdown.bulkCarrier}%`}
                />
                <div
                  style={{ width: `${selectedHeatmapRegion.vesselTypeBreakdown.fishing}%` }}
                  className="bg-emerald-500 h-full"
                  title={`Fishing Craft: ${selectedHeatmapRegion.vesselTypeBreakdown.fishing}%`}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] pt-1">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="text-slate-300">Containers ({selectedHeatmapRegion.vesselTypeBreakdown.container}%)</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-slate-300">Oil Tankers ({selectedHeatmapRegion.vesselTypeBreakdown.tanker}%)</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-300">Bulk Carriers ({selectedHeatmapRegion.vesselTypeBreakdown.bulkCarrier}%)</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-300">Fishing / Other ({selectedHeatmapRegion.vesselTypeBreakdown.fishing}%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Target Detail Inspector Card (If Map Pin Selected) */}
        {selectedPin && !selectedHeatmapRegion && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="uppercase">INSPECTED MAP TARGET: {selectedPin.name}</span>
              </div>
              <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                Type: {selectedPin.type.toUpperCase()}
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed pt-1">
              {selectedPin.details}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
