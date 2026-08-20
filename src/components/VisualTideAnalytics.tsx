import React, { useState } from 'react';
import {
  Waves,
  TrendingUp,
  TrendingDown,
  Anchor,
  Compass,
  AlertTriangle,
  Info,
  ShieldAlert,
  Search,
  CheckCircle2,
  Gauge,
  HelpCircle,
  Clock,
  MapPin,
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export interface PortTideData {
  portId: string;
  portName: string;
  country: string;
  countryFlag: string;
  seaBody: string;
  currentHeightM: number;
  tidalState: 'Rising (Flood)' | 'Falling (Ebb)' | 'High Slack' | 'Low Slack';
  nextHighTide: string;
  nextHighHeightM: number;
  nextLowTide: string;
  nextLowHeightM: number;
  springNeapPhase: 'Spring Tide (Max Range)' | 'Neap Tide (Min Range)' | 'Moderate Tide Cycle';
  chartDatumM: number;
  hourlyHeights: { time: string; heightM: number; phase: string }[];
  maxNavDraftM: number;
  advisoryNote: string;
}

const PORT_TIDE_FORECASTS: PortTideData[] = [
  {
    portId: 'mumbai-jnpt',
    portName: 'Mumbai JNPT & Nhava Sheva Channel',
    country: 'India',
    countryFlag: '🇮🇳',
    seaBody: 'Arabian Sea',
    currentHeightM: 3.42,
    tidalState: 'Rising (Flood)',
    nextHighTide: '14:20 UTC (+4.65m)',
    nextHighHeightM: 4.65,
    nextLowTide: '20:45 UTC (+0.85m)',
    nextLowHeightM: 0.85,
    springNeapPhase: 'Spring Tide (Max Range)',
    chartDatumM: 0.0,
    hourlyHeights: [
      { time: '00:00', heightM: 1.12, phase: 'Low Ebb' },
      { time: '02:00', heightM: 1.85, phase: 'Rising' },
      { time: '04:00', heightM: 2.90, phase: 'Rising' },
      { time: '06:00', heightM: 3.95, phase: 'High Flood' },
      { time: '08:00', heightM: 4.52, phase: 'High Slack' },
      { time: '10:00', heightM: 3.60, phase: 'Falling' },
      { time: '12:00', heightM: 2.20, phase: 'Falling' },
      { time: '14:00', heightM: 4.65, phase: 'Peak High' },
      { time: '16:00', heightM: 3.40, phase: 'Falling' },
      { time: '18:00', heightM: 1.90, phase: 'Falling' },
      { time: '20:00', heightM: 0.95, phase: 'Low Slack' },
      { time: '22:00', heightM: 1.60, phase: 'Rising' }
    ],
    maxNavDraftM: 14.5,
    advisoryNote: 'Large container vessels with draft > 13.0m should align entry with peak high flood tide between 13:30 and 15:30 UTC.'
  },
  {
    portId: 'chittagong-karnaphuli',
    portName: 'Chittagong Outer Anchorage & Karnaphuli Estuary',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    seaBody: 'Bay of Bengal',
    currentHeightM: 4.10,
    tidalState: 'High Slack',
    nextHighTide: '11:10 UTC (+4.35m)',
    nextHighHeightM: 4.35,
    nextLowTide: '18:00 UTC (+0.60m)',
    nextLowHeightM: 0.60,
    springNeapPhase: 'Spring Tide (Max Range)',
    chartDatumM: 0.0,
    hourlyHeights: [
      { time: '00:00', heightM: 0.80, phase: 'Low Ebb' },
      { time: '02:00', heightM: 2.10, phase: 'Rising' },
      { time: '04:00', heightM: 3.50, phase: 'Rising' },
      { time: '06:00', heightM: 4.25, phase: 'High Flood' },
      { time: '08:00', heightM: 3.10, phase: 'Falling' },
      { time: '10:00', heightM: 1.50, phase: 'Falling' },
      { time: '12:00', heightM: 4.35, phase: 'Peak High' },
      { time: '14:00', heightM: 3.20, phase: 'Falling' },
      { time: '16:00', heightM: 1.80, phase: 'Falling' },
      { time: '18:00', heightM: 0.60, phase: 'Low Slack' },
      { time: '20:00', heightM: 2.10, phase: 'Rising' },
      { time: '22:00', heightM: 3.40, phase: 'Rising' }
    ],
    maxNavDraftM: 10.2,
    advisoryNote: 'Karnaphuli bar siltation warning. Vessels exceeding 9.5m draft require harbor pilot clearance and tug escort during ebb tide.'
  },
  {
    portId: 'colombo-harbour',
    portName: 'Colombo Port International Container Terminal',
    country: 'Sri Lanka',
    countryFlag: '🇱🇰',
    seaBody: 'Indian Ocean',
    currentHeightM: 0.65,
    tidalState: 'Rising (Flood)',
    nextHighTide: '15:45 UTC (+0.92m)',
    nextHighHeightM: 0.92,
    nextLowTide: '21:30 UTC (+0.22m)',
    nextLowHeightM: 0.22,
    springNeapPhase: 'Neap Tide (Min Range)',
    chartDatumM: 0.0,
    hourlyHeights: [
      { time: '00:00', heightM: 0.30, phase: 'Low' },
      { time: '02:00', heightM: 0.45, phase: 'Rising' },
      { time: '04:00', heightM: 0.70, phase: 'Rising' },
      { time: '06:00', heightM: 0.88, phase: 'High' },
      { time: '08:00', heightM: 0.65, phase: 'Falling' },
      { time: '10:00', heightM: 0.40, phase: 'Falling' },
      { time: '12:00', heightM: 0.75, phase: 'Rising' },
      { time: '14:00', heightM: 0.90, phase: 'High' },
      { time: '16:00', heightM: 0.70, phase: 'Falling' },
      { time: '18:00', heightM: 0.42, phase: 'Falling' },
      { time: '20:00', heightM: 0.25, phase: 'Low' },
      { time: '22:00', heightM: 0.50, phase: 'Rising' }
    ],
    maxNavDraftM: 18.0,
    advisoryNote: 'Deepwater harbor with low micro-tidal fluctuation (0.7m range). 24-hour non-stop channel access for ultra-large container ships.'
  },
  {
    portId: 'male-commercial-port',
    portName: 'Malé Commercial Port & Atoll Lagoon Channel',
    country: 'Maldives',
    countryFlag: '🇲🇻',
    seaBody: 'Indian Ocean',
    currentHeightM: 0.82,
    tidalState: 'Falling (Ebb)',
    nextHighTide: '16:00 UTC (+1.10m)',
    nextHighHeightM: 1.10,
    nextLowTide: '22:15 UTC (+0.35m)',
    nextLowHeightM: 0.35,
    springNeapPhase: 'Moderate Tide Cycle',
    chartDatumM: 0.0,
    hourlyHeights: [
      { time: '00:00', heightM: 0.40, phase: 'Low' },
      { time: '02:00', heightM: 0.65, phase: 'Rising' },
      { time: '04:00', heightM: 0.95, phase: 'Rising' },
      { time: '06:00', heightM: 1.05, phase: 'High' },
      { time: '08:00', heightM: 0.82, phase: 'Falling' },
      { time: '10:00', heightM: 0.55, phase: 'Falling' },
      { time: '12:00', heightM: 0.85, phase: 'Rising' },
      { time: '14:00', heightM: 1.08, phase: 'High' },
      { time: '16:00', heightM: 0.85, phase: 'Falling' },
      { time: '18:00', heightM: 0.50, phase: 'Falling' },
      { time: '20:00', heightM: 0.38, phase: 'Low' },
      { time: '22:00', heightM: 0.60, phase: 'Rising' }
    ],
    maxNavDraftM: 11.5,
    advisoryNote: 'Strong tidal current (up to 3.5 knots) across Gaadhoo Channel during spring ebb tide. Mind reef margins.'
  },
  {
    portId: 'karachi-manora',
    portName: 'Karachi Port Trust & Manora Deep Channel',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    seaBody: 'Arabian Sea',
    currentHeightM: 2.85,
    tidalState: 'Rising (Flood)',
    nextHighTide: '13:50 UTC (+3.40m)',
    nextHighHeightM: 3.40,
    nextLowTide: '20:10 UTC (+0.55m)',
    nextLowHeightM: 0.55,
    springNeapPhase: 'Spring Tide (Max Range)',
    chartDatumM: 0.0,
    hourlyHeights: [
      { time: '00:00', heightM: 0.70, phase: 'Low' },
      { time: '02:00', heightM: 1.40, phase: 'Rising' },
      { time: '04:00', heightM: 2.30, phase: 'Rising' },
      { time: '06:00', heightM: 3.10, phase: 'High' },
      { time: '08:00', heightM: 2.40, phase: 'Falling' },
      { time: '10:00', heightM: 1.20, phase: 'Falling' },
      { time: '12:00', heightM: 2.85, phase: 'Rising' },
      { time: '14:00', heightM: 3.40, phase: 'Peak High' },
      { time: '16:00', heightM: 2.30, phase: 'Falling' },
      { time: '18:00', heightM: 1.20, phase: 'Falling' },
      { time: '20:00', heightM: 0.55, phase: 'Low' },
      { time: '22:00', heightM: 1.30, phase: 'Rising' }
    ],
    maxNavDraftM: 13.0,
    advisoryNote: 'Dredged channel maintained at 13.0m depth. High flood tide recommended for heavy laden bulk carriers and oil tankers.'
  }
];

export const VisualTideAnalytics: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<PortTideData>(PORT_TIDE_FORECASTS[0]);

  // Under-Keel Clearance (UKC) Calculator State
  const [vesselDraftM, setVesselDraftM] = useState<number>(10.5);
  const [chartSeabedDepthM, setChartSeabedDepthM] = useState<number>(12.0);
  const [safetyMarginM, setSafetyMarginM] = useState<number>(1.5);

  // UKC Calculation
  // Total Water Depth = Chart Seabed Depth + Current Tide Height
  const totalWaterDepth = (chartSeabedDepthM + selectedPort.currentHeightM);
  const calculatedUkc = totalWaterDepth - vesselDraftM;

  const isUkcSafe = calculatedUkc >= safetyMarginM;
  const isUkcMarginal = calculatedUkc >= 0.5 && calculatedUkc < safetyMarginM;
  const isUkcDanger = calculatedUkc < 0.5;

  return (
    <div id="visual-tide-analytics" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>HYDROGRAPHIC TIDAL TELEMETRY & UNDER-KEEL CLEARANCE (UKC)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Visual Tide Analytics & Harbor Water Depth Radar</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              24-hour visual tidal curve forecast, spring/neap phase cycles, slack water windows, and real-time Under-Keel Clearance safety calculator.
            </p>
          </div>

          {/* Port Selector Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
            {PORT_TIDE_FORECASTS.map((port) => (
              <button
                key={port.portId}
                onClick={() => setSelectedPort(port)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                  selectedPort.portId === port.portId
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{port.countryFlag}</span>
                <span>{port.portName.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Port Live Water Level At-a-Glance Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-6 text-xs font-mono">
          {/* Card 1: Current Tide Height */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center justify-between">
              <span>CURRENT TIDE HEIGHT</span>
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-cyan-300">
              +{selectedPort.currentHeightM.toFixed(2)} m
            </div>
            <div className="text-[10px] text-cyan-400 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>{selectedPort.tidalState}</span>
            </div>
          </div>

          {/* Card 2: Next High Tide */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center justify-between">
              <span>NEXT HIGH TIDE</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-base font-bold text-emerald-300">
              {selectedPort.nextHighTide}
            </div>
            <div className="text-[10px] text-slate-400">
              Chart Datum: +{selectedPort.nextHighHeightM}m
            </div>
          </div>

          {/* Card 3: Next Low Tide */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center justify-between">
              <span>NEXT LOW TIDE</span>
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-base font-bold text-rose-300">
              {selectedPort.nextLowTide}
            </div>
            <div className="text-[10px] text-slate-400">
              Chart Datum: +{selectedPort.nextLowHeightM}m
            </div>
          </div>

          {/* Card 4: Lunar Spring/Neap Phase */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center justify-between">
              <span>LUNAR TIDE PHASE</span>
              <Moon className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xs font-bold text-amber-300 leading-snug">
              {selectedPort.springNeapPhase}
            </div>
            <div className="text-[10px] text-slate-400">
              Full Moon Pull Active
            </div>
          </div>

          {/* Card 5: Channel Max Draft */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
            <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center justify-between">
              <span>MAX PERMISSIBLE DRAFT</span>
              <Anchor className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-2xl font-bold text-sky-300">
              {selectedPort.maxNavDraftM} m
            </div>
            <div className="text-[10px] text-slate-400">
              Harbor Channel Limit
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 1. Visual 24h Recharts Tide Curve | 2. Real-time Under-Keel Clearance (UKC) Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual 24-Hour Tidal Height Curve Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{selectedPort.countryFlag}</span>
                <h3 className="font-bold text-white text-base sm:text-lg">
                  {selectedPort.portName}
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                24-Hour Tidal Level Forecast (Meters above Chart Datum 0.0)
              </p>
            </div>

            <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold uppercase font-mono self-start sm:self-auto">
              {selectedPort.seaBody}
            </span>
          </div>

          {/* Recharts Area Curve */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedPort.hourlyHeights} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 6]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl shadow-2xl text-xs font-mono space-y-1">
                          <div className="text-cyan-400 font-bold">{data.time} UTC</div>
                          <div className="text-white">Height: <strong className="text-cyan-300">+{data.heightM} meters</strong></div>
                          <div className="text-slate-400 text-[10px]">Phase: {data.phase}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={selectedPort.currentHeightM} stroke="#06b6d4" strokeDasharray="3 3" label={{ value: `LIVE: +${selectedPort.currentHeightM}m`, fill: '#06b6d4', fontSize: 10 }} />
                <Area
                  type="monotone"
                  dataKey="heightM"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#tideGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Advisory Notice */}
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs flex items-start space-x-3 text-slate-300 leading-relaxed">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Harbor Master Navigational Advisory:</span>{' '}
              {selectedPort.advisoryNote}
            </div>
          </div>
        </div>

        {/* Real-time Under-Keel Clearance (UKC) Calculator Panel (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase border-b border-slate-800 pb-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span>Under-Keel Clearance (UKC) Safety Calculator</span>
            </div>

            <p className="text-xs text-slate-400">
              Calculate vessel seabed clearance in real-time based on current harbor water tide elevation.
            </p>

            {/* Inputs */}
            <div className="space-y-3 pt-1 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Vessel Operating Draft (Meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={vesselDraftM}
                  onChange={(e) => setVesselDraftM(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Chart Seabed Depth (Meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={chartSeabedDepthM}
                  onChange={(e) => setChartSeabedDepthM(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Required Minimum UKC Safety Margin (Meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={safetyMarginM}
                  onChange={(e) => setSafetyMarginM(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* UKC Calculation Result Card */}
            <div
              className={`p-4 rounded-2xl border space-y-2 font-mono transition-all ${
                isUkcDanger
                  ? 'bg-rose-950/80 border-rose-500/80 text-rose-200'
                  : isUkcMarginal
                  ? 'bg-amber-950/80 border-amber-500/80 text-amber-200'
                  : 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>ESTIMATED UKC CLEARANCE</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-black border ${
                    isUkcDanger
                      ? 'bg-rose-500/30 text-rose-200 border-rose-400'
                      : isUkcMarginal
                      ? 'bg-amber-500/30 text-amber-200 border-amber-400'
                      : 'bg-emerald-500/30 text-emerald-200 border-emerald-400'
                  }`}
                >
                  {isUkcDanger ? 'GROUNDING DANGER' : isUkcMarginal ? 'MARGINAL CLEARANCE' : 'SAFE UNDERWAY'}
                </span>
              </div>

              <div className="text-2xl font-black">
                {calculatedUkc.toFixed(2)} m
              </div>

              <div className="text-[11px] space-y-0.5 opacity-90">
                <div>• Seabed + Tide Total Depth: <strong>{totalWaterDepth.toFixed(2)}m</strong></div>
                <div>• Vessel Draft: <strong>{vesselDraftM.toFixed(2)}m</strong></div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 text-center border-t border-slate-800 pt-3">
            UKC calculations account for static draft. Squat & wave pitch roll adjustments should be made at sea.
          </div>
        </div>
      </div>
    </div>
  );
};
