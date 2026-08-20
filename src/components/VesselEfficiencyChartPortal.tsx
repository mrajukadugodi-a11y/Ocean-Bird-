import React, { useState } from 'react';
import { 
  Gauge, Zap, Shield, Flame, Activity, TrendingDown, TrendingUp, Ship, 
  BarChart3, RefreshCw, Sparkles, Filter, Download, ArrowUpRight, ArrowDownRight,
  Sliders, Layers, CheckCircle2, AlertTriangle, Wind, Waves, Thermometer
} from 'lucide-react';
import { 
  ResponsiveContainer, ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

export interface VesselEfficiencyData {
  id: string;
  name: string;
  type: string;
  flag: string;
  speedKnots: number;
  focMtDay: number; // Fuel Oil Consumption MT/Day
  sfocGkwh: number; // Specific Fuel Oil Consumption g/kWh
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  ciiGramCo2DwtNm: number;
  hullFoulingPct: number;
  propellerSlipPct: number;
  trimMeters: number;
  optimalTrimMeters: number;
  engineLoadPct: number;
  co2SavedTonsMonth: number;
  annualFuelCostSavedUSD: number;
  speedPowerCurve: {
    speedKnots: number;
    baselineFoc: number;
    optimizedFoc: number;
    enginePowerKw: number;
  }[];
}

export const VESSELS_EFFICIENCY_METRICS: VesselEfficiencyData[] = [
  {
    id: 'VESSEL-001',
    name: 'MV Ocean Sovereign 2026',
    type: 'Eco-Ultra Container Vessel (18,000 TEU)',
    flag: '🇮🇳',
    speedKnots: 18.5,
    focMtDay: 62.4,
    sfocGkwh: 168.5,
    ciiRating: 'A',
    ciiGramCo2DwtNm: 3.42,
    hullFoulingPct: 2.1,
    propellerSlipPct: 4.2,
    trimMeters: +0.45,
    optimalTrimMeters: +0.60,
    engineLoadPct: 74,
    co2SavedTonsMonth: 420,
    annualFuelCostSavedUSD: 380000,
    speedPowerCurve: [
      { speedKnots: 12, baselineFoc: 28, optimizedFoc: 22, enginePowerKw: 8500 },
      { speedKnots: 14, baselineFoc: 38, optimizedFoc: 31, enginePowerKw: 12400 },
      { speedKnots: 16, baselineFoc: 52, optimizedFoc: 43, enginePowerKw: 18200 },
      { speedKnots: 18, baselineFoc: 71, optimizedFoc: 58, enginePowerKw: 26500 },
      { speedKnots: 20, baselineFoc: 98, optimizedFoc: 79, enginePowerKw: 38000 },
      { speedKnots: 22, baselineFoc: 135, optimizedFoc: 108, enginePowerKw: 54000 }
    ]
  },
  {
    id: 'VESSEL-002',
    name: 'MT Sovereign Bharat Tanker',
    type: 'VLCC Crude Oil Tanker (300,000 DWT)',
    flag: '🇮🇳',
    speedKnots: 14.2,
    focMtDay: 48.0,
    sfocGkwh: 172.0,
    ciiRating: 'B',
    ciiGramCo2DwtNm: 4.15,
    hullFoulingPct: 4.8,
    propellerSlipPct: 6.1,
    trimMeters: +0.10,
    optimalTrimMeters: +0.35,
    engineLoadPct: 68,
    co2SavedTonsMonth: 310,
    annualFuelCostSavedUSD: 290000,
    speedPowerCurve: [
      { speedKnots: 10, baselineFoc: 22, optimizedFoc: 18, enginePowerKw: 6200 },
      { speedKnots: 12, baselineFoc: 32, optimizedFoc: 26, enginePowerKw: 9800 },
      { speedKnots: 14, baselineFoc: 49, optimizedFoc: 41, enginePowerKw: 15400 },
      { speedKnots: 15, baselineFoc: 62, optimizedFoc: 51, enginePowerKw: 19800 },
      { speedKnots: 16, baselineFoc: 80, optimizedFoc: 66, enginePowerKw: 26000 }
    ]
  },
  {
    id: 'VESSEL-003',
    name: 'MS Royal Eco Cruise Sovereign',
    type: 'Green Hydrogen Dual-Fuel Cruise Vessel',
    flag: '🇲🇱',
    speedKnots: 19.0,
    focMtDay: 38.5,
    sfocGkwh: 155.0,
    ciiRating: 'A',
    ciiGramCo2DwtNm: 2.85,
    hullFoulingPct: 1.2,
    propellerSlipPct: 3.0,
    trimMeters: +0.80,
    optimalTrimMeters: +0.85,
    engineLoadPct: 82,
    co2SavedTonsMonth: 580,
    annualFuelCostSavedUSD: 520000,
    speedPowerCurve: [
      { speedKnots: 12, baselineFoc: 18, optimizedFoc: 14, enginePowerKw: 5800 },
      { speedKnots: 15, baselineFoc: 29, optimizedFoc: 22, enginePowerKw: 9900 },
      { speedKnots: 18, baselineFoc: 45, optimizedFoc: 35, enginePowerKw: 16200 },
      { speedKnots: 20, baselineFoc: 62, optimizedFoc: 48, enginePowerKw: 23500 },
      { speedKnots: 22, baselineFoc: 88, optimizedFoc: 68, enginePowerKw: 34000 }
    ]
  },
  {
    id: 'VESSEL-004',
    name: 'MV South Asia Express Bulk',
    type: 'Capesize Bulk Carrier (180,000 DWT)',
    flag: '🇱🇰',
    speedKnots: 12.8,
    focMtDay: 31.2,
    sfocGkwh: 178.4,
    ciiRating: 'C',
    ciiGramCo2DwtNm: 5.60,
    hullFoulingPct: 7.5,
    propellerSlipPct: 8.4,
    trimMeters: -0.20,
    optimalTrimMeters: +0.20,
    engineLoadPct: 62,
    co2SavedTonsMonth: 180,
    annualFuelCostSavedUSD: 165000,
    speedPowerCurve: [
      { speedKnots: 9, baselineFoc: 15, optimizedFoc: 12, enginePowerKw: 4200 },
      { speedKnots: 11, baselineFoc: 23, optimizedFoc: 19, enginePowerKw: 6800 },
      { speedKnots: 13, baselineFoc: 36, optimizedFoc: 29, enginePowerKw: 11200 },
      { speedKnots: 14, baselineFoc: 48, optimizedFoc: 39, enginePowerKw: 15100 }
    ]
  }
];

export const VesselEfficiencyChartPortal: React.FC = () => {
  const [selectedVesselId, setSelectedVesselId] = useState<string>('VESSEL-001');
  const [isTrimOptimized, setIsTrimOptimized] = useState<boolean>(true);
  const [isHullCleaned, setIsHullCleaned] = useState<boolean>(false);
  const [isWeatherRoutingActive, setIsWeatherRoutingActive] = useState<boolean>(true);
  const [optimizationToastMsg, setOptimizationToastMsg] = useState<string | null>(null);

  const activeVessel = VESSELS_EFFICIENCY_METRICS.find((v) => v.id === selectedVesselId) || VESSELS_EFFICIENCY_METRICS[0];

  const triggerToast = (msg: string) => {
    setOptimizationToastMsg(msg);
    setTimeout(() => setOptimizationToastMsg(null), 3500);
  };

  const ciiTrajectoryData = [
    { year: 2024, maxAllowedCii: 5.8, actualVesselCii: activeVessel.ciiGramCo2DwtNm + 0.8 },
    { year: 2025, maxAllowedCii: 5.2, actualVesselCii: activeVessel.ciiGramCo2DwtNm + 0.4 },
    { year: 2026, maxAllowedCii: 4.6, actualVesselCii: activeVessel.ciiGramCo2DwtNm },
    { year: 2027, maxAllowedCii: 4.1, actualVesselCii: Math.max(activeVessel.ciiGramCo2DwtNm - 0.3, 2.1) },
    { year: 2028, maxAllowedCii: 3.6, actualVesselCii: Math.max(activeVessel.ciiGramCo2DwtNm - 0.6, 1.8) },
    { year: 2030, maxAllowedCii: 2.9, actualVesselCii: Math.max(activeVessel.ciiGramCo2DwtNm - 0.9, 1.5) }
  ];

  return (
    <div id="vessels-efficiency-chart-portal" className="space-y-6 font-mono text-white animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl">
              <Gauge className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">MARITIME HYDRODYNAMICS &amp; FOC ANALYTICS</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  IMO CII RATING CERTIFIED
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Vessels Hydrodynamic Efficiency &amp; Power Curve Chart
              </h1>
              <p className="text-slate-300 text-xs font-sans mt-0.5 max-w-3xl">
                Real-time specific fuel oil consumption (SFOC), speed-power curves, trim optimization delta, hull fouling resistance, and operational carbon intensity (CII) ratings.
              </p>
            </div>
          </div>

          {/* SELECT VESSEL */}
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 shrink-0">
            <label className="text-[10px] text-slate-400 block font-bold uppercase mb-1">SELECT VESSEL IN FLEET</label>
            <select
              value={selectedVesselId}
              onChange={(e) => setSelectedVesselId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-cyan-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold w-full"
            >
              {VESSELS_EFFICIENCY_METRICS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.flag} {v.name} ({v.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* METRICS CARDS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center space-y-0.5">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">CII RATING</span>
            <strong className={`text-2xl font-black block ${
              activeVessel.ciiRating === 'A' ? 'text-emerald-400' :
              activeVessel.ciiRating === 'B' ? 'text-teal-300' :
              activeVessel.ciiRating === 'C' ? 'text-amber-300' : 'text-rose-400'
            }`}>
              GRADE {activeVessel.ciiRating}
            </strong>
            <span className="text-[9px] text-slate-500 font-sans block">{activeVessel.ciiGramCo2DwtNm} gCO2/DWT-NM</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center space-y-0.5">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">FOC BURN RATE</span>
            <strong className="text-amber-300 text-xl font-black block">{activeVessel.focMtDay} MT/Day</strong>
            <span className="text-[9px] text-slate-500 font-sans block">Speed: {activeVessel.speedKnots} kts</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center space-y-0.5">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">SPECIFIC CONSUMPTION</span>
            <strong className="text-cyan-300 text-xl font-black block">{activeVessel.sfocGkwh} g/kWh</strong>
            <span className="text-[9px] text-slate-500 font-sans block">Engine Load: {activeVessel.engineLoadPct}%</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center space-y-0.5">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">HULL FOULING RESISTANCE</span>
            <strong className="text-rose-400 text-xl font-black block">{activeVessel.hullFoulingPct}% Drag</strong>
            <span className="text-[9px] text-slate-500 font-sans block">Propeller Slip: {activeVessel.propellerSlipPct}%</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center space-y-0.5">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">TRIM DELTA</span>
            <strong className="text-emerald-400 text-xl font-black block">
              {activeVessel.trimMeters > 0 ? `+${activeVessel.trimMeters}` : activeVessel.trimMeters}m
            </strong>
            <span className="text-[9px] text-slate-500 font-sans block">Optimum: +{activeVessel.optimalTrimMeters}m</span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center space-y-0.5">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">ANNUAL SAVINGS</span>
            <strong className="text-emerald-300 text-xl font-black block">${(activeVessel.annualFuelCostSavedUSD / 1000).toFixed(0)}k USD</strong>
            <span className="text-[9px] text-slate-500 font-sans block">CO2 Saved: {activeVessel.co2SavedTonsMonth} t/mo</span>
          </div>
        </div>
      </div>

      {optimizationToastMsg && (
        <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-3 rounded-xl text-xs font-bold font-mono text-center animate-fadeIn">
          {optimizationToastMsg}
        </div>
      )}

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART 1: SPEED VS FUEL CONSUMPTION POWER CURVE */}
        <div className="lg:col-span-7 bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">HYDRODYNAMIC PERFORMANCE</span>
              <h2 className="text-lg font-black text-white">Speed vs. Fuel Oil Consumption (FOC) Curve</h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setIsTrimOptimized(!isTrimOptimized);
                  triggerToast(isTrimOptimized ? 'Trim Optimization Disengaged' : '⚡ AI Hydrodynamic Trim Optimization Activated (-12% Drag)!');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border ${
                  isTrimOptimized ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                {isTrimOptimized ? '✨ Trim AI Active' : 'Enable Trim AI'}
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={activeVessel.speedPowerCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="speedKnots" stroke="#94a3b8" fontSize={11} unit=" kts" />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} unit=" MT" />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} unit=" kW" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar yAxisId="right" dataKey="enginePowerKw" name="Engine Power (kW)" fill="#334155" opacity={0.6} radius={[4, 4, 0, 0]} />
                <Line yAxisId="left" type="monotone" dataKey="baselineFoc" name="Unoptimized FOC (MT/Day)" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" />
                <Line yAxisId="left" type="monotone" dataKey="optimizedFoc" name="AI Optimized FOC (MT/Day)" stroke="#10b981" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <p className="text-slate-400 text-xs font-sans text-center">
            Compares unoptimized cubic speed-power curve vs. AI trim &amp; weather-assisted FOC fuel savings across cruising speeds.
          </p>
        </div>

        {/* CHART 2: CII OPERATIONAL CARBON INTENSITY TRAJECTORY */}
        <div className="lg:col-span-5 bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">IMO COMPLIANCE HORIZON</span>
              <h2 className="text-lg font-black text-white">CII Trajectory (2024 – 2030)</h2>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
              NET-ZERO TARGET
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ciiTrajectoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 8]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="maxAllowedCii" name="IMO Cap (gCO2/DWT-NM)" fill="#f43f5e" fillOpacity={0.15} stroke="#f43f5e" />
                <Line type="monotone" dataKey="actualVesselCii" name="Vessel Performance" stroke="#10b981" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <p className="text-slate-400 text-xs font-sans text-center">
            Demonstrates vessel compliance against tightening IMO Carbon Intensity Indicator (CII) operational thresholds.
          </p>
        </div>
      </div>

      {/* AI OPTIMIZATION ACTIONS PANEL */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
          <h3 className="text-base font-black text-white">AI Hydrodynamic Optimization Dispatch Controls</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <strong className="text-white font-bold">Ballast Trim Optimization</strong>
              <span className="text-emerald-400 font-bold">+0.15m Delta</span>
            </div>
            <p className="text-slate-400 font-sans text-[11px]">Adjust fore/aft ballast water tanks to achieve hydrodynamic sweet spot trim.</p>
            <button
              onClick={() => triggerToast('🌊 Ballast Pumps Dispatched: Optimal Trim +0.60m Achieved! Reduced fuel consumption by 1.8 MT/Day.')}
              className="w-full py-2 bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold rounded-lg hover:bg-emerald-500/30 transition-all"
            >
              DISPATCH BALLAST TRIM
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <strong className="text-white font-bold">Ultrasonic Hull De-Fouling</strong>
              <span className="text-amber-300 font-bold">{activeVessel.hullFoulingPct}% Biofilm</span>
            </div>
            <p className="text-slate-400 font-sans text-[11px]">Activate subsea acoustic transducers to dissolve hull bio-fouling layer.</p>
            <button
              onClick={() => triggerToast('⚡ Subsea Ultrasonic Transducers Fired! Biofilm drag reduced to 0.8%. Saved 2.4 MT/Day FOC.')}
              className="w-full py-2 bg-amber-500/20 border border-amber-400 text-amber-300 font-bold rounded-lg hover:bg-amber-500/30 transition-all"
            >
              ACTIVATE ULTRASONIC DE-FOULING
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <strong className="text-white font-bold">Waste Heat Recovery (WHR)</strong>
              <span className="text-cyan-300 font-bold">850 kW Gen</span>
            </div>
            <p className="text-slate-400 font-sans text-[11px]">Direct engine exhaust heat to organic Rankine cycle steam turbine generator.</p>
            <button
              onClick={() => triggerToast('🔥 Waste Heat Steam Turbine Online! Generating 850 kW auxiliary electric power from exhaust heat.')}
              className="w-full py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold rounded-lg hover:bg-cyan-500/30 transition-all"
            >
              ENGAGE WHR GENERATOR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
