import React, { useState } from 'react';
import {
  Navigation,
  Compass,
  Clock,
  Fuel,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Anchor,
  ArrowRight,
  Sparkles,
  Zap,
  RotateCcw,
  Sliders,
  Layers,
  CheckCircle2
} from 'lucide-react';

export interface RouteOptimizationResult {
  strategy: 'Fastest ETA' | 'Eco Fuel Saver' | 'Weather Storm Evasion';
  totalDistanceNm: number;
  averageSpeedKts: number;
  estimatedVoyageDays: number;
  estimatedVoyageHours: number;
  fuelConsumptionMT: number;
  totalFuelCostUsd: number;
  co2EmissionsMT: number;
  weatherRiskRating: 'Low' | 'Moderate' | 'Severe Risk Avoided';
  waypoints: { name: string; latLon: string; status: string; weather: string }[];
  keyAdvice: string;
}

const PRESET_OCEAN_CORRIDORS = [
  {
    id: 'mumbai-colombo-singapore',
    name: 'Mumbai (JNPT) ➔ Colombo ➔ Singapore Strait',
    distanceNm: 2450,
    origin: 'Mumbai JNPT, India',
    destination: 'Singapore Port, Singapore',
    waypointsList: [
      { name: 'Mumbai JNPT Anchorage', latLon: '18.95°N, 72.90°E', status: 'Origin Port', weather: 'Moderate Arabian Sea Swell 1.8m' },
      { name: 'Goa Coastal Traffic Separation Scheme', latLon: '15.40°N, 73.60°E', status: 'Waypoint 01', weather: 'Monsoonal Squall Line' },
      { name: 'Dondra Head Pass (Sri Lanka)', latLon: '05.85°N, 80.50°E', status: 'Mid Waypoint', weather: 'Heavy Swell 3.2m - Storm Evasion Path' },
      { name: 'Malacca Strait Entrance', latLon: '05.30°N, 98.20°E', status: 'Waypoint 03', weather: 'Calm Tropical Sea' },
      { name: 'Singapore Western Arrive Berth', latLon: '01.25°N, 103.80°E', status: 'Destination', weather: 'Smooth Waters' }
    ]
  },
  {
    id: 'chittagong-chennai-colombo',
    name: 'Chittagong ➔ Chennai ➔ Colombo Port Pass',
    distanceNm: 1320,
    origin: 'Chittagong, Bangladesh',
    destination: 'Colombo, Sri Lanka',
    waypointsList: [
      { name: 'Chittagong Outer Anchorage', latLon: '22.20°N, 91.75°E', status: 'Origin Port', weather: 'Heavy Bay of Bengal Squalls' },
      { name: 'Vizag Outer Channel', latLon: '17.68°N, 83.32°E', status: 'Waypoint 01', weather: '25kt Monsoonal Wind' },
      { name: 'Chennai Port TSS', latLon: '13.10°N, 80.35°E', status: 'Waypoint 02', weather: 'Swell Height 2.1m' },
      { name: 'Trincomalee Approaches', latLon: '08.60°N, 81.25°E', status: 'Waypoint 03', weather: 'Moderate Sea State' },
      { name: 'Colombo Container Terminal', latLon: '06.95°N, 79.84°E', status: 'Destination', weather: 'Smooth Lagoon' }
    ]
  },
  {
    id: 'karachi-gwadar-fujairah',
    name: 'Karachi ➔ Gwadar ➔ Fujairah Bunkering Hub',
    distanceNm: 680,
    origin: 'Karachi, Pakistan',
    destination: 'Fujairah, UAE',
    waypointsList: [
      { name: 'Karachi Port Anchorage', latLon: '24.80°N, 66.98°E', status: 'Origin Port', weather: 'Light Haze, Wind 12kts' },
      { name: 'Gwadar Deepwater Pass', latLon: '25.10°N, 62.30°E', status: 'Waypoint 01', weather: 'Coastal Sea State 1.2m' },
      { name: 'Strait of Hormuz Entrance', latLon: '25.50°N, 57.20°E', status: 'Waypoint 02', weather: 'Calm Gulf Waters' },
      { name: 'Fujairah Offshore Anchorage', latLon: '25.12°N, 56.36°E', status: 'Destination', weather: 'Clear Sea' }
    ]
  }
];

export const VesselPathOptimizer: React.FC = () => {
  const [selectedCorridorId, setSelectedCorridorId] = useState('mumbai-colombo-singapore');
  const [strategy, setStrategy] = useState<'Fastest ETA' | 'Eco Fuel Saver' | 'Weather Storm Evasion'>('Eco Fuel Saver');

  // Vessel Specs
  const [vesselType, setVesselType] = useState<'Container Ship (8,000 TEU)' | 'Oil Tanker (Suezmax)' | 'Bulk Carrier (Panamax)' | 'Fishery Expedition Vessel'>('Container Ship (8,000 TEU)');
  const [fuelPriceUsdMt, setFuelPriceUsdMt] = useState<number>(612); // USD per MT VLSFO
  const [baseSpeedKts, setBaseSpeedKts] = useState<number>(15.0);

  const selectedCorridor = PRESET_OCEAN_CORRIDORS.find((c) => c.id === selectedCorridorId) || PRESET_OCEAN_CORRIDORS[0];

  // Strategy adjustments
  let effectiveSpeedKts = baseSpeedKts;
  let distanceMultiplier = 1.0;
  let weatherRisk: 'Low' | 'Moderate' | 'Severe Risk Avoided' = 'Low';
  let adviceText = '';

  if (strategy === 'Fastest ETA') {
    effectiveSpeedKts = baseSpeedKts * 1.2; // Maximum power
    distanceMultiplier = 1.0;
    weatherRisk = 'Moderate';
    adviceText = 'Maximum engine shaft RPM enabled. Shortest distance selected, pushing through light swell lines for minimal transit time.';
  } else if (strategy === 'Eco Fuel Saver') {
    effectiveSpeedKts = baseSpeedKts * 0.85; // Slow steaming
    distanceMultiplier = 1.0;
    weatherRisk = 'Low';
    adviceText = 'Slow Steaming active (-15% speed). Saves substantial fuel and reduces hull friction resistance according to cubic power law.';
  } else if (strategy === 'Weather Storm Evasion') {
    effectiveSpeedKts = baseSpeedKts * 0.95;
    distanceMultiplier = 1.08; // 8% detour around cyclone/squall cells
    weatherRisk = 'Severe Risk Avoided';
    adviceText = 'Route detoured 8% south of active monsoonal storm cells in the Bay of Bengal / Arabian Sea to maintain vessel stability and hull safety.';
  }

  const calculatedDistanceNm = selectedCorridor.distanceNm * distanceMultiplier;
  const totalHours = calculatedDistanceNm / (effectiveSpeedKts || 1);
  const totalDays = totalHours / 24;

  // Base daily fuel consumption depending on vessel type
  let baseDailyConsumptionMT = 35;
  if (vesselType === 'Oil Tanker (Suezmax)') baseDailyConsumptionMT = 48;
  if (vesselType === 'Bulk Carrier (Panamax)') baseDailyConsumptionMT = 26;
  if (vesselType === 'Fishery Expedition Vessel') baseDailyConsumptionMT = 8;

  // Cubic speed relation
  const speedRatio = effectiveSpeedKts / 15.0;
  const actualDailyConsumptionMT = baseDailyConsumptionMT * Math.pow(speedRatio, 3);
  const totalFuelMT = actualDailyConsumptionMT * totalDays;
  const totalFuelCostUsd = totalFuelMT * fuelPriceUsdMt;
  const co2EmissionsMT = totalFuelMT * 3.114; // IMO standard multiplier

  return (
    <div id="vessels-path-optimizer" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Navigation className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>OCEANIC WAYPOINT ROUTE OPTIMIZATION & VOYAGE SIMULATOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              <span>Vessels Path Optimizer</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Optimize commercial vessel ocean transit paths between South Asian maritime corridors. Balance ETA, fuel consumption, carbon emissions, and severe weather evasion.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-bold">AI ROUTING ALGORITHM ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 1. Input Controls & Corridor Selection | 2. Optimization Summary & Waypoint Path */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Corridor & Strategy Controls (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase border-b border-slate-800 pb-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Route Parameters & Strategy</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Select Ocean Corridor</label>
              <select
                value={selectedCorridorId}
                onChange={(e) => setSelectedCorridorId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-cyan-500"
              >
                {PRESET_OCEAN_CORRIDORS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Vessel Engine & Hull Class</label>
              <select
                value={vesselType}
                onChange={(e: any) => setVesselType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Container Ship (8,000 TEU)">Container Ship (8,000 TEU)</option>
                <option value="Oil Tanker (Suezmax)">Oil Tanker (Suezmax)</option>
                <option value="Bulk Carrier (Panamax)">Bulk Carrier (Panamax)</option>
                <option value="Fishery Expedition Vessel">Fishery Expedition Vessel</option>
              </select>
            </div>

            {/* Optimization Strategy Tabs */}
            <div>
              <label className="text-slate-300 font-semibold mb-1.5 block">Optimization Strategy</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'Eco Fuel Saver', title: 'Eco Fuel Saver', desc: '-15% Speed • Lowest Fuel & Carbon', icon: TrendingDown, color: 'border-emerald-500 text-emerald-300 bg-emerald-950/30' },
                  { id: 'Fastest ETA', title: 'Fastest ETA', desc: 'Full Power • Minimum Transit Time', icon: Zap, color: 'border-amber-500 text-amber-300 bg-amber-950/30' },
                  { id: 'Weather Storm Evasion', title: 'Storm Evasion Path', desc: '+8% Distance • Bypass Monsoonal Swells', icon: ShieldCheck, color: 'border-cyan-500 text-cyan-300 bg-cyan-950/30' }
                ].map((st) => {
                  const isSelected = strategy === st.id;
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setStrategy(st.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-start space-x-3 ${
                        isSelected
                          ? st.color
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs">{st.title}</div>
                        <div className="text-[10px] opacity-80">{st.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Speeds & Bunker Price Inputs */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">Base Speed (Knots)</label>
                <input
                  type="number"
                  step="0.5"
                  value={baseSpeedKts}
                  onChange={(e) => setBaseSpeedKts(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 mb-1 block">VLSFO Fuel ($/MT)</label>
                <input
                  type="number"
                  value={fuelPriceUsdMt}
                  onChange={(e) => setFuelPriceUsdMt(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-emerald-300 font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Path Results & Waypoint Breakdown (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Key Optimization Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono uppercase font-bold">OPTIMIZED PATH PRESET</span>
                <h3 className="text-base sm:text-lg font-bold text-white">{selectedCorridor.name}</h3>
              </div>

              <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono self-start sm:self-auto">
                Strategy: {strategy}
              </span>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">TOTAL DISTANCE</span>
                <div className="text-lg font-bold text-white">{calculatedDistanceNm.toFixed(0)} NM</div>
                <div className="text-[10px] text-slate-400">@ {effectiveSpeedKts.toFixed(1)} Knots</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">ESTIMATED TRANSIT</span>
                <div className="text-lg font-bold text-cyan-300">{totalDays.toFixed(1)} Days</div>
                <div className="text-[10px] text-slate-400">{totalHours.toFixed(0)} Hours</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">ESTIMATED FUEL COST</span>
                <div className="text-lg font-bold text-emerald-300">${totalFuelCostUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <div className="text-[10px] text-slate-400">{totalFuelMT.toFixed(1)} MT Fuel</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">WEATHER RISK INDEX</span>
                <div className="text-base font-bold text-amber-300">{weatherRisk}</div>
                <div className="text-[10px] text-slate-400">GHG {co2EmissionsMT.toFixed(0)} MT CO2</div>
              </div>
            </div>

            {/* AI Master Advisory Notice */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs flex items-start space-x-3 text-slate-300">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Route Optimization Advisory:</span>{' '}
                {adviceText}
              </div>
            </div>
          </div>

          {/* Waypoints List Flow */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Optimized Ocean Waypoints Execution Plan</span>
            </h4>

            <div className="space-y-2.5">
              {selectedCorridor.waypointsList.map((wp, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{wp.name}</div>
                      <div className="text-[10px] text-slate-400">Lat/Lon: {wp.latLon}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
                      {wp.status}
                    </span>
                    <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                      {wp.weather}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
