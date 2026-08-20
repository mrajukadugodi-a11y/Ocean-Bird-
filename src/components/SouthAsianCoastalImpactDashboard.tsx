import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, CartesianGrid, Legend, ComposedChart, Line, LineChart
} from 'recharts';
import { 
  ShieldAlert, Waves, Globe, AlertTriangle, Radio, Activity, Clock, Navigation, 
  Compass, Zap, MapPin, Anchor, Flame, Search, HardDriveDownload, ArrowUpRight, 
  BarChart3, LineChart as LineChartIcon, Download, Check, Copy, ExternalLink, 
  FileText, TrendingUp, Building2, Users, DollarSign, CloudRain, AlertOctagon
} from 'lucide-react';

export type ClimateScenario = 'MONSOON_CYCLONE_CAT4' | 'SEA_LEVEL_RISE_2040' | 'MEGATHRUST_TSUNAMI_M89' | 'RIVER_BASIN_CLOUDBURST';
export type SouthAsianZone = 'GANGES_DELTA' | 'MUMBAI_KONKAN' | 'CHENNAI_COROMANDEL' | 'KARACHI_INDUS' | 'COLOMBO_GALLE';

export interface RegionalImpactData {
  id: SouthAsianZone;
  name: string;
  country: string;
  flag: string;
  economicRiskBillionUsd: number;
  populationExposedMillions: number;
  surgeInundationDepthM: number;
  submergedAreaKm2: number;
  majorPorts: string[];
  sectorLosses: {
    portLogisticsBillion: number;
    realEstateBillion: number;
    agricultureBillion: number;
    industrialInfrastructureBillion: number;
  };
  criticalInfrastructureAtRisk: string[];
  advisoryProtocol: string;
  coordinates: string;
}

export const SOUTH_ASIAN_IMPACT_ZONES: Record<SouthAsianZone, RegionalImpactData> = {
  GANGES_DELTA: {
    id: 'GANGES_DELTA',
    name: 'Ganges Delta & Chittagong Outer Bar',
    country: 'Bangladesh & West Bengal (India)',
    flag: '🇧🇩🇮🇳',
    economicRiskBillionUsd: 42.5,
    populationExposedMillions: 38.5,
    surgeInundationDepthM: 5.8,
    submergedAreaKm2: 12400,
    majorPorts: ['Port of Chittagong', 'Kolkata Haldia Dock', 'Mongla Terminal', 'Payra Sea Port'],
    sectorLosses: {
      portLogisticsBillion: 14.2,
      realEstateBillion: 12.8,
      agricultureBillion: 8.4,
      industrialInfrastructureBillion: 7.1
    },
    criticalInfrastructureAtRisk: ['Sundarbans Mangrove Buffer', 'Karnaphuli River Tunnel', 'Haldia Petrochemical Complex', 'Cox\'s Bazar Coastal Highway'],
    advisoryProtocol: 'Hoist Emergency Signal 10. mandatory evacuation of all lighterage barges in Meghna estuary. Mooring lockout at Chittagong outer anchorage.',
    coordinates: '21.8° N, 90.2° E'
  },
  MUMBAI_KONKAN: {
    id: 'MUMBAI_KONKAN',
    name: 'Mumbai Metropolitan & Konkan Coast',
    country: 'Maharashtra & Goa (India)',
    flag: '🇮🇳',
    economicRiskBillionUsd: 68.2,
    populationExposedMillions: 21.2,
    surgeInundationDepthM: 3.4,
    submergedAreaKm2: 3200,
    majorPorts: ['JNPT Jawaharlal Nehru Port', 'Mumbai Port Trust', 'Mormugao Port'],
    sectorLosses: {
      portLogisticsBillion: 26.5,
      realEstateBillion: 24.1,
      agricultureBillion: 3.8,
      industrialInfrastructureBillion: 13.8
    },
    criticalInfrastructureAtRisk: ['JNPT Container Depots', 'Mumbai Offshore High Oil Rigs', 'Coastal Road Tunnel', 'Chhatrapati Shivaji Terminal Railway Link'],
    advisoryProtocol: 'Enforce Port Condition BRAVO. Lock down container handling gantry cranes. Maintain 18 kts minimum engine readiness for offshore supply vessels.',
    coordinates: '18.9° N, 72.8° E'
  },
  CHENNAI_COROMANDEL: {
    id: 'CHENNAI_COROMANDEL',
    name: 'Coromandel Coast & Chennai Hub',
    country: 'Tamil Nadu & Andhra Pradesh (India)',
    flag: '🇮🇳',
    economicRiskBillionUsd: 31.8,
    populationExposedMillions: 14.8,
    surgeInundationDepthM: 4.2,
    submergedAreaKm2: 4800,
    majorPorts: ['Chennai Container Terminal', 'Kamarajar Ennore Port', 'VOC Tuticorin Port', 'Visakhapatnam Harbour'],
    sectorLosses: {
      portLogisticsBillion: 11.4,
      realEstateBillion: 9.8,
      agricultureBillion: 4.2,
      industrialInfrastructureBillion: 6.4
    },
    criticalInfrastructureAtRisk: ['Ennore Thermal Power Complex', 'Kalpakkam Coastal Atomic Energy Station', 'Chennai Automobile Export Yard'],
    advisoryProtocol: 'Activate Bay of Bengal Storm Surge Alert. Divert inbound container carriers to deep anchorage east of Sri Lanka.',
    coordinates: '13.1° N, 80.3° E'
  },
  KARACHI_INDUS: {
    id: 'KARACHI_INDUS',
    name: 'Indus Delta & Karachi Maritime Hub',
    country: 'Sindh (Pakistan)',
    flag: '🇵🇰',
    economicRiskBillionUsd: 28.4,
    populationExposedMillions: 18.2,
    surgeInundationDepthM: 3.2,
    submergedAreaKm2: 6100,
    majorPorts: ['Karachi Port Trust (KPT)', 'Port Muhammad Bin Qasim', 'Gwadar Deepwater Port'],
    sectorLosses: {
      portLogisticsBillion: 10.2,
      realEstateBillion: 8.9,
      agricultureBillion: 4.8,
      industrialInfrastructureBillion: 4.5
    },
    criticalInfrastructureAtRisk: ['Korangi Creek Industrial Belt', 'Qasim Oil Terminal Jetty', 'Indus Delta Mangrove Protection Buffer'],
    advisoryProtocol: 'Issue Cyclone Distress Warning for Arabian Sea North. Restrict oil tanker berthing at Port Qasim until wave height subsides below 2.5m.',
    coordinates: '24.8° N, 67.0° E'
  },
  COLOMBO_GALLE: {
    id: 'COLOMBO_GALLE',
    name: 'Colombo South Harbour & Galle Coast',
    country: 'Western & Southern Province (Sri Lanka)',
    flag: '🇱🇰',
    economicRiskBillionUsd: 16.5,
    populationExposedMillions: 4.5,
    surgeInundationDepthM: 2.8,
    submergedAreaKm2: 1800,
    majorPorts: ['Colombo South Container Terminal', 'Hambantota International Port', 'Trincomalee Deep Harbour'],
    sectorLosses: {
      portLogisticsBillion: 7.8,
      realEstateBillion: 4.2,
      agricultureBillion: 1.9,
      industrialInfrastructureBillion: 2.6
    },
    criticalInfrastructureAtRisk: ['Colombo Port City Reclamation Area', 'Southern Coastal Railway Corridor', 'Hambantota Bunkering Tank Farm'],
    advisoryProtocol: 'Maintain Indian Ocean Swell Watch. Enforce double-line mooring for transshipment vessels along East Container Terminal breakwater.',
    coordinates: '6.9° N, 79.8° E'
  }
};

export const PROJECTED_DISPLACEMENT_TRAJECTORY = [
  { year: '2026', GangesDelta: 38.5, MumbaiKonkan: 21.2, ChennaiCoromandel: 14.8, KarachiIndus: 18.2, ColomboGalle: 4.5 },
  { year: '2030', GangesDelta: 42.1, MumbaiKonkan: 23.8, ChennaiCoromandel: 16.2, KarachiIndus: 20.1, ColomboGalle: 5.1 },
  { year: '2040', GangesDelta: 51.4, MumbaiKonkan: 28.5, ChennaiCoromandel: 19.8, KarachiIndus: 24.6, ColomboGalle: 6.4 },
  { year: '2050', GangesDelta: 64.2, MumbaiKonkan: 35.1, ChennaiCoromandel: 24.5, KarachiIndus: 31.0, ColomboGalle: 8.2 }
];

export const SouthAsianCoastalImpactDashboard: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ClimateScenario>('MONSOON_CYCLONE_CAT4');
  const [selectedZoneKey, setSelectedZoneKey] = useState<SouthAsianZone>('GANGES_DELTA');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [copiedBroadcastText, setCopiedBroadcastText] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  const activeZone = SOUTH_ASIAN_IMPACT_ZONES[selectedZoneKey];

  // Scenario Multiplier Calculations
  const scenarioMultiplier = 
    activeScenario === 'MONSOON_CYCLONE_CAT4' ? 1.0 :
    activeScenario === 'SEA_LEVEL_RISE_2040' ? 1.35 :
    activeScenario === 'MEGATHRUST_TSUNAMI_M89' ? 1.85 : 1.2;

  const adjustedEconomicRisk = (activeZone.economicRiskBillionUsd * scenarioMultiplier).toFixed(1);
  const adjustedPopulation = (activeZone.populationExposedMillions * scenarioMultiplier).toFixed(1);
  const adjustedSurgeDepth = (activeZone.surgeInundationDepthM * (activeScenario === 'MEGATHRUST_TSUNAMI_M89' ? 1.6 : 1.0)).toFixed(1);

  const sectorChartData = [
    { name: 'Port Logistics', lossBillion: (activeZone.sectorLosses.portLogisticsBillion * scenarioMultiplier).toFixed(1) },
    { name: 'Real Estate', lossBillion: (activeZone.sectorLosses.realEstateBillion * scenarioMultiplier).toFixed(1) },
    { name: 'Agriculture', lossBillion: (activeZone.sectorLosses.agricultureBillion * scenarioMultiplier).toFixed(1) },
    { name: 'Industrial Infra', lossBillion: (activeZone.sectorLosses.industrialInfrastructureBillion * scenarioMultiplier).toFixed(1) }
  ];

  const handleCopyWarning = () => {
    const warningText = `[SOUTH ASIAN COASTAL EMERGENCY BULLETIN] Scenario: ${activeScenario} | Zone: ${activeZone.name} (${activeZone.country}). Projected Economic Risk: $${adjustedEconomicRisk}B USD. Population Exposed: ${adjustedPopulation} Million. Max Inundation Surge Depth: ${adjustedSurgeDepth}m. Advisory: ${activeZone.advisoryProtocol}`;
    navigator.clipboard.writeText(warningText);
    setCopiedBroadcastText(true);
    setTimeout(() => setCopiedBroadcastText(false), 3000);
  };

  const handleExportReport = () => {
    const reportData = {
      title: `South Asian Coastal Climate Impact Report - ${activeZone.name}`,
      timestamp: new Date().toISOString(),
      scenario: activeScenario,
      zone: activeZone,
      adjustedMetrics: {
        economicRiskBillionUsd: adjustedEconomicRisk,
        populationExposedMillions: adjustedPopulation,
        surgeInundationDepthM: adjustedSurgeDepth
      }
    };
    const jsonStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `south_asian_coastal_impact_${activeZone.id}_${Date.now()}.json`;
    a.click();
    setExportSuccessMsg(`✅ Impact Assessment Bulletin for "${activeZone.name}" Exported Successfully!`);
    setTimeout(() => setExportSuccessMsg(null), 4000);
  };

  return (
    <div id="south-asian-coastal-impact-dashboard" className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 text-white space-y-6 font-mono shadow-2xl animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4 text-amber-400 animate-spin" />
            <span>SOVEREIGN CLIMATE MODELING &amp; REGIONAL RISK ANALYTICS</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <span>South Asian Coastal Zones Impact Visualization Dashboard</span>
          </h1>
          <p className="text-slate-400 text-xs font-sans mt-1 max-w-3xl">
            High-resolution economic loss projections, population displacement modeling, and port shipping vulnerabilities integrated with real-time South Asian hydro-meteorological weather alerts.
          </p>
        </div>

        {/* SCENARIO SELECTOR */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 text-xs font-bold uppercase">CLIMATE SCENARIO:</span>
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
            {[
              { id: 'MONSOON_CYCLONE_CAT4', label: '🌀 Cat 4 Monsoon Surge' },
              { id: 'SEA_LEVEL_RISE_2040', label: '🌊 2040 Sea Level Rise' },
              { id: 'MEGATHRUST_TSUNAMI_M89', label: '⚡ Megathrust Tsunami' },
              { id: 'RIVER_BASIN_CLOUDBURST', label: '🌧️ River Cloudburst' }
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenario(sc.id as ClimateScenario)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeScenario === sc.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* REGIONAL ZONE SELECTOR BUTTONS */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-slate-400 font-bold mr-1">COASTAL SUB-BASIN:</span>
        {(Object.keys(SOUTH_ASIAN_IMPACT_ZONES) as SouthAsianZone[]).map((key) => {
          const zone = SOUTH_ASIAN_IMPACT_ZONES[key];
          const isSelected = selectedZoneKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedZoneKey(key)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 border ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>{zone.flag}</span>
              <span>{zone.name}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN IMPACT METRICS & ZONE SUMMARY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 p-4 rounded-2xl border border-amber-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block">TOTAL ECONOMIC RISK AT STAKE</span>
          <strong className="text-amber-400 text-2xl font-black block">${adjustedEconomicRisk} Billion USD</strong>
          <span className="text-[10px] text-slate-500 font-sans">Port Logistics, Infrastructure &amp; Real Estate</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-rose-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block">EXPOSED POPULATION</span>
          <strong className="text-rose-400 text-2xl font-black block">{adjustedPopulation} Million</strong>
          <span className="text-[10px] text-slate-500 font-sans">High Vulnerability Coastal Residents</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block">SURGE INUNDATION DEPTH</span>
          <strong className="text-cyan-400 text-2xl font-black block">+{adjustedSurgeDepth} Meters</strong>
          <span className="text-[10px] text-slate-500 font-sans">Above Astronomical High Tide Line</span>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl border border-purple-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block">LAND AREA SUBMERGED</span>
          <strong className="text-purple-400 text-2xl font-black block">{activeZone.submergedAreaKm2} km²</strong>
          <span className="text-[10px] text-slate-500 font-sans">Estuarine &amp; Coastal Plain Coverage</span>
        </div>
      </div>

      {/* CHARTS ROW: SECTOR LOSS BREAKDOWN & DISPLACEMENT TRAJECTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTOR ECONOMIC LOSS BAR CHART */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
            <strong className="text-amber-400 font-bold flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>ECONOMIC LOSS BY SECTOR ($ BILLION USD)</span>
            </strong>
            <span className="text-slate-400 text-[10px]">{activeZone.name}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#f59e0b', borderRadius: '0.75rem', color: '#fff' }}
                />
                <Bar dataKey="lossBillion" fill="#f59e0b" radius={[6, 6, 0, 0]}>
                  {sectorChartData.map((_, idx) => (
                    <Cell key={idx} fill={idx === 0 ? '#f59e0b' : idx === 1 ? '#ef4444' : idx === 2 ? '#10b981' : '#38bdf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* POPULATION DISPLACEMENT TRAJECTORY LINE CHART */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
            <strong className="text-rose-400 font-bold flex items-center space-x-2">
              <Users className="w-4 h-4 text-rose-400" />
              <span>SOUTH ASIAN POPULATION EXPOSURE TRAJECTORY (2026–2050)</span>
            </strong>
            <span className="text-slate-400 text-[10px]">Millions of Citizens</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROJECTED_DISPLACEMENT_TRAJECTORY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#f43f5e', borderRadius: '0.75rem', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="GangesDelta" name="Ganges Delta 🇧🇩🇮🇳" stroke="#f59e0b" strokeWidth={2.5} />
                <Line type="monotone" dataKey="MumbaiKonkan" name="Mumbai Konkan 🇮🇳" stroke="#38bdf8" strokeWidth={2} />
                <Line type="monotone" dataKey="ChennaiCoromandel" name="Coromandel 🇮🇳" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="KarachiIndus" name="Indus Delta 🇵🇰" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CRITICAL INFRASTRUCTURE & WEATHER ALERT INTEGRATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAJOR PORTS & CRITICAL INFRASTRUCTURE AT RISK */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 lg:col-span-1 text-xs">
          <strong className="text-amber-400 font-bold flex items-center space-x-2">
            <Anchor className="w-4 h-4 text-amber-400" />
            <span>CRITICAL PORTS &amp; ASSETS AT RISK</span>
          </strong>

          <div className="space-y-2">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">COMMERCIAL SHIPPING HUBS:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeZone.majorPorts.map((port, idx) => (
                <span key={idx} className="bg-slate-950 text-slate-200 border border-slate-800 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                  ⚓ {port}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">CRITICAL COASTAL INFRASTRUCTURE:</span>
            <ul className="space-y-1 text-[11px] text-slate-300 font-sans list-disc pl-4">
              {activeZone.criticalInfrastructureAtRisk.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* WEATHER ALERT BROADCAST INTEGRATION BOX */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-amber-500/40 space-y-4 lg:col-span-2 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <strong className="text-amber-400 font-bold flex items-center space-x-2">
              <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>SOUTH ASIAN HYDRO-METEOROLOGICAL EMERGENCY ADVISORY</span>
            </strong>
            <span className="text-rose-400 font-mono font-bold">COORDINATES: {activeZone.coordinates}</span>
          </div>

          <p className="text-slate-300 font-sans text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
            "{activeZone.advisoryProtocol}"
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => setBroadcastSent(true)}
                disabled={broadcastSent}
                className="py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all uppercase flex items-center space-x-1.5 disabled:opacity-50"
              >
                <span>📡 {broadcastSent ? 'BROADCAST SENT TO REGIONAL PORT AUTHORITIES' : 'TRIGGER REGIONAL EMERGENCY BROADCAST'}</span>
              </button>

              <button
                onClick={handleCopyWarning}
                className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
              >
                <span>{copiedBroadcastText ? '✓ COPIED' : '📋 COPY BULLETIN'}</span>
              </button>
            </div>

            <button
              onClick={handleExportReport}
              className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-xs rounded-xl transition-all flex items-center space-x-1 shrink-0"
            >
              <span>📥 EXPORT IMPACT REPORT (JSON)</span>
            </button>
          </div>

          {exportSuccessMsg && (
            <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-2.5 rounded-xl text-xs font-bold animate-fadeIn">
              {exportSuccessMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
