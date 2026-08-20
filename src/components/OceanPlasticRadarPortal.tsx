import React, { useState, useEffect } from 'react';
import { 
  Radar, Radio, Waves, Trash2, Bot, Sparkles, AlertTriangle, ShieldCheck, 
  RefreshCw, MapPin, Compass, Search, Filter, Layers, Download, CheckCircle2, 
  Wind, Zap, Activity, Globe, Copy, Check, ExternalLink, Cpu, HardDrive
} from 'lucide-react';
import { 
  ResponsiveContainer, ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';

export interface PlasticDebrisPatch {
  id: string;
  name: string;
  locationName: string;
  lat: number;
  lng: number;
  type: 'MACRO_PLASTIC' | 'MICROPLASTIC_GYRE' | 'GHOST_NET' | 'RIVER_OUTFLOW';
  estimatedTons: number;
  densityParticlesPerM3: number;
  driftSpeedKnots: number;
  driftDirection: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  nearestPort: string;
  assignedCleanupDrone?: string;
}

export const INITIAL_PLASTIC_PATCHES: PlasticDebrisPatch[] = [
  {
    id: 'PLASTIC-PATCH-101',
    name: 'Bay of Bengal Central Gyre Patch',
    locationName: 'Bay of Bengal (14.2° N, 88.5° E)',
    lat: 14.2,
    lng: 88.5,
    type: 'MICROPLASTIC_GYRE',
    estimatedTons: 1420,
    densityParticlesPerM3: 1850,
    driftSpeedKnots: 1.4,
    driftDirection: 'East-Northeast',
    riskLevel: 'CRITICAL',
    nearestPort: 'Visakhapatnam (320 NM)',
    assignedCleanupDrone: 'SKM-03 Ocean Cleaner Gamma'
  },
  {
    id: 'PLASTIC-PATCH-102',
    name: 'Malacca Strait Entrance Debris Field',
    locationName: 'Malacca Strait (5.8° N, 98.2° E)',
    lat: 5.8,
    lng: 98.2,
    type: 'MACRO_PLASTIC',
    estimatedTons: 890,
    densityParticlesPerM3: 1240,
    driftSpeedKnots: 2.1,
    driftDirection: 'South-Southeast',
    riskLevel: 'CRITICAL',
    nearestPort: 'Penang / Sabang (110 NM)',
    assignedCleanupDrone: 'SKM-01 Ocean Cleaner Alpha'
  },
  {
    id: 'PLASTIC-PATCH-103',
    name: 'Indus River Delta Outflow Plume',
    locationName: 'Arabian Sea off Karachi (24.1° N, 67.3° E)',
    lat: 24.1,
    lng: 67.3,
    type: 'RIVER_OUTFLOW',
    estimatedTons: 620,
    densityParticlesPerM3: 980,
    driftSpeedKnots: 1.2,
    driftDirection: 'South-West',
    riskLevel: 'HIGH',
    nearestPort: 'Port Qasim (45 NM)',
    assignedCleanupDrone: 'SKM-04 Ocean Cleaner Delta'
  },
  {
    id: 'PLASTIC-PATCH-104',
    name: 'Lakshadweep Ridge Ghost Net Cluster',
    locationName: 'Lakshadweep Sea (10.5° N, 72.8° E)',
    lat: 10.5,
    lng: 72.8,
    type: 'GHOST_NET',
    estimatedTons: 340,
    densityParticlesPerM3: 450,
    driftSpeedKnots: 0.8,
    driftDirection: 'North-Northwest',
    riskLevel: 'MODERATE',
    nearestPort: 'Kochi (180 NM)',
    assignedCleanupDrone: 'SKM-02 Ocean Cleaner Beta'
  }
];

export const PLASTIC_COMPOSITION_DATA = [
  { name: 'PET Bottles & Food Containers', value: 38, color: '#06b6d4' },
  { name: 'Ghost Fishing Nets & Lines', value: 24, color: '#f43f5e' },
  { name: 'Microplastic Pellets (Nurdles)', value: 22, color: '#a855f7' },
  { name: 'Styrofoam & Packaging Film', value: 16, color: '#eab308' }
];

export const MONTHLY_PLASTIC_COLLECTION_TREND = [
  { month: 'Jan', collectedTons: 42, recyclingYieldUSD: 21000 },
  { month: 'Feb', collectedTons: 58, recyclingYieldUSD: 29000 },
  { month: 'Mar', collectedTons: 74, recyclingYieldUSD: 37000 },
  { month: 'Apr', collectedTons: 95, recyclingYieldUSD: 47500 },
  { month: 'May', collectedTons: 120, recyclingYieldUSD: 60000 },
  { month: 'Jun', collectedTons: 165, recyclingYieldUSD: 82500 }
];

export const OceanPlasticRadarPortal: React.FC = () => {
  const APP_WEB_ID = '28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f';
  const [copiedAppId, setCopiedAppId] = useState(false);

  const [patches, setPatches] = useState<PlasticDebrisPatch[]>(INITIAL_PLASTIC_PATCHES);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [radarAngle, setRadarAngle] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Rotate radar sweep animation effect
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 4) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isScanning]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleCopyAppId = () => {
    navigator.clipboard.writeText(APP_WEB_ID);
    setCopiedAppId(true);
    triggerToast(`📋 App Web ID copied to clipboard: ${APP_WEB_ID}`);
    setTimeout(() => setCopiedAppId(false), 2500);
  };

  const handleDispatchSkimmer = (patchId: string) => {
    setPatches((prev) =>
      prev.map((p) =>
        p.id === patchId
          ? {
              ...p,
              estimatedTons: Math.max(p.estimatedTons - 120, 0),
              assignedCleanupDrone: 'SKM-05 Ocean Sentinel Ultra (Dispatched)'
            }
          : p
      )
    );
    triggerToast('🛸 Autonomous Solar Plastic Skimmer Drone Dispatched to Radar Debris Vector!');
  };

  const filteredPatches = selectedTypeFilter === 'ALL'
    ? patches
    : patches.filter((p) => p.type === selectedTypeFilter);

  const totalDebrisTons = patches.reduce((sum, p) => sum + p.estimatedTons, 0);

  return (
    <div id="ocean-plastic-radar-portal" className="space-y-6 font-mono text-white animate-fadeIn">
      {/* WEB APP ID BADGE & SYSTEM METADATA ROW */}
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/20 border border-cyan-400/40 rounded-xl">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">APPLICATION WEB ID &amp; RUNTIME IDENTIFIER</span>
            <div className="flex items-center space-x-2 mt-0.5">
              <code className="text-xs font-mono font-bold text-emerald-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                {APP_WEB_ID}
              </code>
              <button
                onClick={handleCopyAppId}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all text-xs flex items-center space-x-1"
                title="Copy Web ID"
              >
                {copiedAppId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px] font-bold">{copiedAppId ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">PLATFORM STATUS</span>
            <span className="text-emerald-400 font-bold flex items-center justify-end space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE AI STUDIO PREVIEW</span>
            </span>
          </div>
          <div className="text-right border-l border-slate-800 pl-4">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">SATELLITE SYNC</span>
            <span className="text-cyan-300 font-bold">100% REALTIME</span>
          </div>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 border border-teal-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-teal-500/20 border border-teal-400/50 rounded-2xl">
              <Radar className="w-8 h-8 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">AI SATELLITE OCEAN PLASTIC DETECTION</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  SWIR SPECTRAL RADAR
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Global Ocean Plastic &amp; Microplastic Radar
              </h1>
              <p className="text-slate-300 text-xs font-sans mt-0.5 max-w-3xl">
                Real-time satellite Short-Wave Infrared (SWIR) radar tracking of floating macro-plastic debris, microplastic density gyres, ghost fishing nets, and automated drone skimmer intercept vectors.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900 p-3 rounded-xl border border-slate-800 shrink-0">
            <Trash2 className="w-7 h-7 text-teal-400" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">DETECTED DEBRIS MASS</span>
              <strong className="text-teal-300 text-lg font-black block">{totalDebrisTons.toLocaleString()} Metric Tons</strong>
            </div>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">ACTIVE RADAR GYRES</span>
            <strong className="text-teal-400 text-xl font-black block">{patches.length} Hotspots</strong>
            <span className="text-[9px] text-slate-500 font-sans block">Asian Shipping Corridors</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">MAX DENSITY</span>
            <strong className="text-rose-400 text-xl font-black block">1,850 p/m³</strong>
            <span className="text-[9px] text-slate-500 font-sans block">Bay of Bengal Central</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">CLEANUP RECYCLING YIELD</span>
            <strong className="text-emerald-300 text-xl font-black block">$82.5k / Mo</strong>
            <span className="text-[9px] text-slate-500 font-sans block">$OD Ocean Dollar Rewards</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">SKIMMER DRONE FLEET</span>
            <strong className="text-cyan-300 text-xl font-black block">4 Active Drones</strong>
            <span className="text-[9px] text-slate-500 font-sans block">Solar Hydrofoil Skimmers</span>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-teal-500/20 border border-teal-400 text-teal-200 p-3 rounded-xl text-xs font-bold font-mono text-center animate-fadeIn">
          {toastMessage}
        </div>
      )}

      {/* RADAR VISUALIZER & DETECTED PATCHES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RADAR SWEEP CANVAS SIMULATOR */}
        <div className="lg:col-span-5 bg-slate-950 border border-teal-500/40 rounded-2xl p-6 space-y-4 shadow-2xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
              <h2 className="text-base font-black text-white">Live SWIR Radar Sweep</h2>
            </div>
            <button
              onClick={() => setIsScanning(!isScanning)}
              className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-teal-300 rounded text-[10px] font-bold"
            >
              {isScanning ? 'PAUSE RADAR' : 'RESUME RADAR'}
            </button>
          </div>

          {/* RADAR CIRCULAR DISPLAY */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-teal-500/40 bg-slate-950 flex items-center justify-center overflow-hidden my-2 shadow-[0_0_30px_rgba(20,184,166,0.15)]">
            {/* Concentric Circles */}
            <div className="absolute w-48 h-48 rounded-full border border-teal-500/20"></div>
            <div className="absolute w-32 h-32 rounded-full border border-teal-500/20"></div>
            <div className="absolute w-16 h-16 rounded-full border border-teal-500/20"></div>

            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-teal-500/30"></div>
            <div className="absolute h-full w-[1px] bg-teal-500/30"></div>

            {/* Rotating Sweep Line */}
            <div
              className="absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br from-teal-400/40 to-transparent"
              style={{
                top: 0,
                left: 0,
                transform: `rotate(${radarAngle}deg)`,
                transformOrigin: '100% 100%'
              }}
            ></div>

            {/* Blips for Debris Patches */}
            {patches.map((p, idx) => {
              const offsets = [
                { top: '32%', left: '68%' },
                { top: '70%', left: '78%' },
                { top: '22%', left: '28%' },
                { top: '62%', left: '35%' }
              ];
              const off = offsets[idx % offsets.length];
              return (
                <div
                  key={p.id}
                  className="absolute p-1 group cursor-pointer"
                  style={{ top: off.top, left: off.left }}
                  onClick={() => triggerToast(`Target Locked: ${p.name} (${p.estimatedTons} Tons)`)}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  <div className="hidden group-hover:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-teal-400 px-2 py-1 rounded text-[9px] whitespace-nowrap z-20">
                    {p.name}
                  </div>
                </div>
              );
            })}

            <div className="absolute text-[10px] text-teal-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-teal-500/40">
              RADAR SWEEP Active
            </div>
          </div>

          <p className="text-slate-400 text-xs font-sans text-center">
            Coordinates calibrated to SWIR Sentinel-2 imagery &amp; surface drift vectors.
          </p>
        </div>

        {/* DETECTED DEBRIS HOTSPOTS LIST */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h2 className="text-lg font-black text-white">Target Debris Fields &amp; Gyre Telemetry</h2>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-1 text-xs">
              {[
                { id: 'ALL', label: 'ALL TYPES' },
                { id: 'MICROPLASTIC_GYRE', label: 'GYRES' },
                { id: 'MACRO_PLASTIC', label: 'MACRO' },
                { id: 'GHOST_NET', label: 'NETS' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedTypeFilter(f.id)}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                    selectedTypeFilter === f.id ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredPatches.map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-teal-500/40 transition-all space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        p.riskLevel === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {p.riskLevel}
                    </span>
                    <strong className="text-white text-sm font-bold">{p.name}</strong>
                  </div>

                  <span className="text-teal-300 text-[11px] font-bold">{p.locationName}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-sans">
                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">ESTIMATED MASS</span>
                    <span className="text-teal-300 font-bold font-mono">{p.estimatedTons} Tons</span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">PARTICLE DENSITY</span>
                    <span className="text-amber-300 font-bold font-mono">{p.densityParticlesPerM3} p/m³</span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">DRIFT VECTOR</span>
                    <span className="text-slate-200 font-bold font-mono">{p.driftSpeedKnots} kts ({p.driftDirection})</span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">NEAREST PORT</span>
                    <span className="text-cyan-300 font-bold font-mono truncate">{p.nearestPort}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 font-mono">
                  <span className="text-slate-400 text-[11px]">
                    Assigned Skimmer: <span className="text-emerald-400 font-bold">{p.assignedCleanupDrone || 'Unassigned'}</span>
                  </span>

                  <button
                    onClick={() => handleDispatchSkimmer(p.id)}
                    className="px-3 py-1 bg-teal-500/20 border border-teal-400 text-teal-300 hover:bg-teal-500/30 font-bold text-[10px] rounded-lg transition-all"
                  >
                    DISPATCH CLEANUP DRONE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PLASTIC COMPOSITION & RECYCLING TREND CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART 1: PLASTIC COMPOSITION PIE */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-2">
            Debris Material Composition Breakup
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PLASTIC_COMPOSITION_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {PLASTIC_COMPOSITION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: RECYCLING YIELD TREND */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-2">
            Monthly Collection Tons &amp; Recycling Yield ($OD)
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MONTHLY_PLASTIC_COLLECTION_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} unit=" t" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} unit=" $" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar yAxisId="left" dataKey="collectedTons" name="Collected Plastic (Tons)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="recyclingYieldUSD" name="Recycling Yield ($USD)" stroke="#10b981" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
