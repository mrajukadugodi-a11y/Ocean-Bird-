import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Flame,
  Thermometer,
  Waves,
  ShieldAlert,
  Sliders,
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  BarChart3,
  CheckCircle2,
  Anchor
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export interface ClimateScenario {
  id: string;
  code: string;
  name: string;
  tagline: string;
  defaultTempRiseC: number;
  defaultSeaLevelM: number;
  defaultStormMultiplier: number;
  defaultPhDrop: number;
  description: string;
  keyRisks: string[];
  recommendedStrategy: string;
}

export const CLIMATE_SCENARIOS_DATA: ClimateScenario[] = [
  {
    id: 'ssp1-19',
    code: 'SSP1-1.9',
    name: 'Paris Agreement 1.5°C Target',
    tagline: 'Aggressive Global Decarbonization',
    defaultTempRiseC: 1.5,
    defaultSeaLevelM: 0.32,
    defaultStormMultiplier: 1.15,
    defaultPhDrop: 8.02,
    description: 'Rapid transition to 100% green fuels (hydrogen, ammonia, wind-assist). SST rises capped at +1.5°C by 2050. Port infrastructure requires minor sea wall retrofits.',
    keyRisks: ['Localized seasonal heatwaves', 'Minor coral bleaching in shallow reefs', 'Temporary monsoon surge spikes'],
    recommendedStrategy: 'Enforce zero-emission berth mandates, hybrid-electric coastal transit, and eco-routing buffers.'
  },
  {
    id: 'ssp2-45',
    code: 'SSP2-4.5',
    name: 'Intermediate Trajectory (Current Policies)',
    tagline: 'Moderate Emissions & Gradual Adaptation',
    defaultTempRiseC: 2.4,
    defaultSeaLevelM: 0.68,
    defaultStormMultiplier: 1.45,
    defaultPhDrop: 7.91,
    description: 'Current energy policy trajectory. SST rises by +2.4°C by 2050. Cyclonic storm surges increase by 45%, causing frequent port lockouts in Bay of Bengal and Caribbean.',
    keyRisks: ['Cat 4/5 hurricane frequency +35%', 'Widespread coral reef degradation', 'Port draught reductions due to low-river flows'],
    recommendedStrategy: 'Mandatory vessel speed reductions, storm surge early warning automation, and carbon credit offsets.'
  },
  {
    id: 'ssp3-70',
    code: 'SSP3-7.0',
    name: 'High Regional Rivalry',
    tagline: 'Uncoordinated Mitigation & High Emissions',
    defaultTempRiseC: 3.6,
    defaultSeaLevelM: 0.98,
    defaultStormMultiplier: 1.85,
    defaultPhDrop: 7.78,
    description: 'Fragmented global climate policies. SST rises by +3.6°C. Extreme rogue wave activity off Cape Agulhas and Drake Passage. Coastal port inundation risks skyrocket.',
    keyRisks: ['Severe coastal flooding at 40%+ global ports', 'Disruption of major trade corridors', 'Major marine ecosystem collapse'],
    recommendedStrategy: 'Construct deep-water offshore floating berths, deploy autonomous AI wave dampers, and divert routes 50+ NM offshore.'
  },
  {
    id: 'ssp5-85',
    code: 'SSP5-8.5',
    name: 'Extreme Fossil-Fueled Growth',
    tagline: 'Worst-Case Unchecked Global Warming',
    defaultTempRiseC: 4.4,
    defaultSeaLevelM: 1.35,
    defaultStormMultiplier: 2.30,
    defaultPhDrop: 7.65,
    description: 'Fossil-fuel intensive economy. SST spikes +4.4°C. Severe ocean acidification triggers plankton die-offs. Multi-meter storm surges inundate low-lying ports continuously.',
    keyRisks: ['Permanent submerged berth loss at low-elevation ports', 'Collapse of coastal fish populations', 'Catastrophic maritime supply chain delays'],
    recommendedStrategy: 'Complete redesign of maritime logistics hubs, elevated container yards, and continuous emergency satellite routing.'
  }
];

export const ClimateScenariosModule: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ClimateScenario>(CLIMATE_SCENARIOS_DATA[1]);
  const [targetYear, setTargetYear] = useState<number>(2035);
  const [tempRiseC, setTempRiseC] = useState<number>(CLIMATE_SCENARIOS_DATA[1].defaultTempRiseC);
  const [seaLevelM, setSeaLevelM] = useState<number>(CLIMATE_SCENARIOS_DATA[1].defaultSeaLevelM);
  const [stormMultiplier, setStormMultiplier] = useState<number>(CLIMATE_SCENARIOS_DATA[1].defaultStormMultiplier);
  const [phLevel, setPhLevel] = useState<number>(CLIMATE_SCENARIOS_DATA[1].defaultPhDrop);

  const handleSelectScenario = (sc: ClimateScenario) => {
    setSelectedScenario(sc);
    setTempRiseC(sc.defaultTempRiseC);
    setSeaLevelM(sc.defaultSeaLevelM);
    setStormMultiplier(sc.defaultStormMultiplier);
    setPhLevel(sc.defaultPhDrop);
  };

  const handleReset = () => {
    setTempRiseC(selectedScenario.defaultTempRiseC);
    setSeaLevelM(selectedScenario.defaultSeaLevelM);
    setStormMultiplier(selectedScenario.defaultStormMultiplier);
    setPhLevel(selectedScenario.defaultPhDrop);
  };

  // Dynamic calculations based on user adjusted sliders
  const yearDiff = Math.max(0, targetYear - 2026);
  const yearMultiplier = 1 + (yearDiff / 30) * 0.4;

  const portFloodRiskPct = Math.min(98, Math.round((seaLevelM * 42 + tempRiseC * 8) * yearMultiplier));
  const fuelPenaltyPct = Math.min(65, Math.round((stormMultiplier * 14 + tempRiseC * 4) * (yearMultiplier * 0.9)));
  const bleachingIndex = Math.min(100, Math.round((tempRiseC * 18 + (8.1 - phLevel) * 60)));
  const economicLossBillion = (portFloodRiskPct * 0.42 + fuelPenaltyPct * 0.28).toFixed(1);

  // Generate dynamic chart data based on target inputs
  const scenarioChartData = [
    { year: 2026, sstAnomalyC: 1.2, seaLevelCm: 12, floodRiskPct: 18, stormACE: 100 },
    { year: 2030, sstAnomalyC: Number((1.2 + (tempRiseC - 1.2) * 0.25).toFixed(2)), seaLevelCm: Math.round(seaLevelM * 100 * 0.3), floodRiskPct: Math.round(portFloodRiskPct * 0.4), stormACE: Math.round(100 * stormMultiplier * 0.8) },
    { year: 2035, sstAnomalyC: Number((1.2 + (tempRiseC - 1.2) * 0.50).toFixed(2)), seaLevelCm: Math.round(seaLevelM * 100 * 0.55), floodRiskPct: Math.round(portFloodRiskPct * 0.65), stormACE: Math.round(100 * stormMultiplier * 0.95) },
    { year: 2040, sstAnomalyC: Number((1.2 + (tempRiseC - 1.2) * 0.75).toFixed(2)), seaLevelCm: Math.round(seaLevelM * 100 * 0.80), floodRiskPct: Math.round(portFloodRiskPct * 0.85), stormACE: Math.round(100 * stormMultiplier * 1.1) },
    { year: 2050, sstAnomalyC: Number((tempRiseC).toFixed(2)), seaLevelCm: Math.round(seaLevelM * 100), floodRiskPct: portFloodRiskPct, stormACE: Math.round(100 * stormMultiplier * 1.3) },
    { year: 2060, sstAnomalyC: Number((tempRiseC * 1.18).toFixed(2)), seaLevelCm: Math.round(seaLevelM * 100 * 1.25), floodRiskPct: Math.min(99, Math.round(portFloodRiskPct * 1.15)), stormACE: Math.round(100 * stormMultiplier * 1.5) }
  ];

  return (
    <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 text-white space-y-6 font-mono shadow-2xl">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>IPCC CLIMATE PROJECTION ENGINE & MARITIME IMPACT SIMULATION</span>
          </div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <span>Climate Scenarios & Long-Term Trajectories</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1 max-w-3xl">
            Simulate shared socioeconomic pathways (SSP1 to SSP5), adjust global warming parameters, and model maritime supply chain vulnerabilities through 2060.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center space-x-1.5 shrink-0 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* SCENARIO SELECTOR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CLIMATE_SCENARIOS_DATA.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-400 text-white ring-2 ring-amber-400/60 shadow-xl'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-950 border border-slate-700 text-amber-400">
                    {sc.code}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">+{sc.defaultTempRiseC}°C</span>
                </div>
                <h3 className="text-sm font-extrabold text-white mt-2">{sc.name}</h3>
                <p className="text-[11px] text-amber-300/80 font-sans mt-0.5 line-clamp-1">{sc.tagline}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono">
                <div>Sea Rise: <strong className="text-cyan-300">+{sc.defaultSeaLevelM}m</strong></div>
                <div>Storms: <strong className="text-rose-400">{sc.defaultStormMultiplier}x</strong></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE PARAMETER SLIDERS & IMPACT CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: SLIDERS */}
        <div className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-amber-400 font-extrabold text-xs flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>CUSTOM SCENARIO CONTROL SLIDERS</span>
            </span>
            <span className="text-slate-400 text-[11px] font-bold">HORIZON: {targetYear}</span>
          </div>

          <div className="space-y-4 text-xs font-sans">
            {/* Horizon Year */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-300">Target Forecast Year:</span>
                <strong className="text-amber-400">{targetYear} AD</strong>
              </div>
              <input
                type="range"
                min="2026"
                max="2060"
                step="1"
                value={targetYear}
                onChange={(e) => setTargetYear(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer bg-slate-950 h-2 rounded-lg"
              />
            </div>

            {/* Temp Rise */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-300">Global SST Temp Rise (°C):</span>
                <strong className="text-rose-400">+{tempRiseC.toFixed(1)}°C</strong>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={tempRiseC}
                onChange={(e) => setTempRiseC(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer bg-slate-950 h-2 rounded-lg"
              />
            </div>

            {/* Sea Level Rise */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-300">Steric Sea Level Rise (meters):</span>
                <strong className="text-cyan-400">+{seaLevelM.toFixed(2)} m</strong>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.05"
                value={seaLevelM}
                onChange={(e) => setSeaLevelM(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer bg-slate-950 h-2 rounded-lg"
              />
            </div>

            {/* Storm Multiplier */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-300">Cyclone Surge Multiplier:</span>
                <strong className="text-amber-300">{stormMultiplier.toFixed(2)}x Baseline</strong>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.05"
                value={stormMultiplier}
                onChange={(e) => setStormMultiplier(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer bg-slate-950 h-2 rounded-lg"
              />
            </div>

            {/* pH Drop */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-300">Ocean pH Level (Acidification):</span>
                <strong className="text-emerald-400">pH {phLevel.toFixed(2)}</strong>
              </div>
              <input
                type="range"
                min="7.50"
                max="8.10"
                step="0.01"
                value={phLevel}
                onChange={(e) => setPhLevel(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer bg-slate-950 h-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: CALCULATED MARITIME IMPACT CARDS */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 p-4 rounded-2xl border border-rose-500/40 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">PORT FLOOD INUNDATION RISK</span>
              <strong className="text-rose-400 text-2xl font-black block">{portFloodRiskPct}% berths</strong>
              <span className="text-[10px] text-slate-400 block font-sans">High-tide submergence risk</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-amber-500/40 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">VESSEL FUEL & DETOUR PENALTY</span>
              <strong className="text-amber-300 text-2xl font-black block">+{fuelPenaltyPct}% overhead</strong>
              <span className="text-[10px] text-slate-400 block font-sans">Storm avoidance nautical miles</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/40 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">CORAL BLEACHING STRESS</span>
              <strong className="text-cyan-300 text-2xl font-black block">{bleachingIndex} / 100 Index</strong>
              <span className="text-[10px] text-slate-400 block font-sans">Thermal degree heating weeks</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-purple-500/40 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">ESTIMATED ANNUAL LOSS</span>
              <strong className="text-purple-300 text-2xl font-black block">${economicLossBillion} Billion</strong>
              <span className="text-[10px] text-slate-400 block font-sans">USD shipping delay impact</span>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs font-sans">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-[11px] uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>SCENARIO DIRECTIVE & STRATEGY</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">{selectedScenario.description}</p>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 mt-2">
              <strong className="text-amber-400 block text-[10px] uppercase">RECOMMENDED COMPLIANCE ACTION:</strong>
              {selectedScenario.recommendedStrategy}
            </div>
          </div>
        </div>
      </div>

      {/* PROJECTION TRAJECTORY CHART */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <strong className="text-white font-extrabold text-sm">2026–2060 Climate Scenario Trajectory Chart</strong>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Active: <strong className="text-amber-400">{selectedScenario.code}</strong> Target Year ({targetYear})
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={scenarioChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="floodRiskPct" name="Port Flood Risk (%)" fill="#f43f5e" fillOpacity={0.2} stroke="#f43f5e" />
              <Bar dataKey="stormACE" name="Cyclonic ACE Index" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="sstAnomalyC" name="SST Anomaly (°C)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
