import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Truck,
  Box,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Check,
  Zap,
  RotateCcw
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface PortBottleneck {
  portName: string;
  country: string;
  normalDwellDays: number;
  forecastDwellDays: number;
  delayHours: number;
  demurrageRatePerDay: number;
  queuedVessels: number;
  riskLevel: 'Severe' | 'Moderate' | 'Low';
  alternativePort: string;
  savingsDays: number;
}

const PORT_BOTTLENECK_DATA: PortBottleneck[] = [
  {
    portName: 'Chittagong Port',
    country: 'Bangladesh',
    normalDwellDays: 3.2,
    forecastDwellDays: 8.5,
    delayHours: 127,
    demurrageRatePerDay: 2800,
    queuedVessels: 42,
    riskLevel: 'Severe',
    alternativePort: 'Mongla Port (Bangladesh)',
    savingsDays: 4.5
  },
  {
    portName: 'Colombo Transshipment Hub',
    country: 'Sri Lanka',
    normalDwellDays: 2.1,
    forecastDwellDays: 5.8,
    delayHours: 88,
    demurrageRatePerDay: 3200,
    queuedVessels: 31,
    riskLevel: 'Severe',
    alternativePort: 'Hambantota Port (Sri Lanka)',
    savingsDays: 3.0
  },
  {
    portName: 'JNPT Mumbai (Nhava Sheva)',
    country: 'India',
    normalDwellDays: 2.5,
    forecastDwellDays: 4.2,
    delayHours: 40,
    demurrageRatePerDay: 2400,
    queuedVessels: 18,
    riskLevel: 'Moderate',
    alternativePort: 'Mundra Port (Gujarat)',
    savingsDays: 1.8
  },
  {
    portName: 'Chennai Port',
    country: 'India',
    normalDwellDays: 2.0,
    forecastDwellDays: 4.9,
    delayHours: 69,
    demurrageRatePerDay: 2200,
    queuedVessels: 23,
    riskLevel: 'Moderate',
    alternativePort: 'Kattupalli Port (Tamil Nadu)',
    savingsDays: 2.2
  },
  {
    portName: 'Karachi Port Trust',
    country: 'Pakistan',
    normalDwellDays: 3.0,
    forecastDwellDays: 4.1,
    delayHours: 26,
    demurrageRatePerDay: 2000,
    queuedVessels: 12,
    riskLevel: 'Low',
    alternativePort: 'Port Qasim (Pakistan)',
    savingsDays: 1.0
  }
];

export const SupplyChainForecastView: React.FC = () => {
  const [horizon, setHorizon] = useState<'7D' | '14D' | '30D'>('14D');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('ALL');
  const [selectedReroutePort, setSelectedReroutePort] = useState<PortBottleneck | null>(null);
  const [rerouteApplied, setRerouteApplied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const chartData = PORT_BOTTLENECK_DATA.map((p) => {
    const multiplier = horizon === '7D' ? 0.85 : horizon === '14D' ? 1.0 : 1.3;
    return {
      name: p.portName.split(' ')[0],
      BaselineDwell: Number((p.normalDwellDays).toFixed(1)),
      ForecastDwell: Number((p.forecastDwellDays * multiplier).toFixed(1)),
      DelayHours: Math.round(p.delayHours * multiplier)
    };
  });

  const handleApplyReroute = () => {
    if (!selectedReroutePort) return;
    setRerouteApplied(true);
    showToast(`Reroute plan confirmed: ${selectedReroutePort.portName} → ${selectedReroutePort.alternativePort}`);
    setTimeout(() => setRerouteApplied(false), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-amber-500 text-amber-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-amber-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Truck className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>MARITIME SUPPLY CHAIN & PORT DISRUPTION FORECAST ENGINE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Box className="w-6 h-6 text-amber-400" />
              <span>Supply Chain Disruption Horizon</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Predictive dwell-time forecasting, berth queue demurrage costs, and AI automated transshipment port re-routing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-slate-400 font-bold">Forecast Horizon:</span>
            {(['7D', '14D', '30D'] as const).map((h) => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                  horizon === h
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {h} Horizon
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CHART & PORT BOTTLENECK METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART SECTION (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Port Container Dwell Time Forecast (Days)</span>
              </h4>
              <p className="text-[11px] text-slate-400">Baseline vs. Predicted severe storm disruption dwell days</p>
            </div>

            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-1 focus:outline-none"
            >
              <option value="ALL">ALL COMMODITIES</option>
              <option value="CRUDE">CRUDE OIL & LNG</option>
              <option value="CONTAINER">CONTAINER CARGO</option>
              <option value="BULK">DRY BULK & GRAIN</option>
            </select>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#f8fafc' }}
                  labelStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
                <Bar dataKey="BaselineDwell" fill="#38bdf8" name="Normal Dwell (Days)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ForecastDwell" fill="#f59e0b" name="Forecast Storm Dwell (Days)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RE-ROUTER INTERACTIVE TOOL (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase border-b border-slate-800 pb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Smart Port Re-Router Tool</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Select a bottlenecked port to calculate an automated transshipment bypass option.
            </p>

            <select
              value={selectedReroutePort?.portName || ''}
              onChange={(e) => {
                const found = PORT_BOTTLENECK_DATA.find((p) => p.portName === e.target.value);
                setSelectedReroutePort(found || null);
              }}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="">-- SELECT CONGESTED PORT --</option>
              {PORT_BOTTLENECK_DATA.map((p) => (
                <option key={p.portName} value={p.portName}>
                  {p.portName} ({p.riskLevel} Risk)
                </option>
              ))}
            </select>

            {selectedReroutePort ? (
              <div className="p-3 bg-slate-950 border border-amber-500/40 rounded-xl space-y-2 text-xs">
                <div className="text-[10px] text-amber-400 font-bold uppercase">BYPASS RECOMMENDATION:</div>
                <div className="text-white font-bold flex items-center justify-between">
                  <span>Target Port:</span>
                  <span className="text-cyan-300">{selectedReroutePort.alternativePort}</span>
                </div>
                <div className="text-slate-300 flex items-center justify-between">
                  <span>Est. Time Savings:</span>
                  <span className="text-emerald-400 font-bold">-{selectedReroutePort.savingsDays} Days</span>
                </div>
                <div className="text-slate-300 flex items-center justify-between">
                  <span>Demurrage Saved:</span>
                  <span className="text-amber-300 font-bold">
                    ${(selectedReroutePort.demurrageRatePerDay * selectedReroutePort.savingsDays).toLocaleString()} / TEU
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center text-[11px] text-slate-500">
                Choose a port above to generate bypass route
              </div>
            )}
          </div>

          <button
            onClick={handleApplyReroute}
            disabled={!selectedReroutePort || rerouteApplied}
            className={`w-full py-2.5 rounded-xl font-bold text-xs font-mono transition-all flex items-center justify-center space-x-1.5 ${
              rerouteApplied
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                : selectedReroutePort
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg'
                : 'bg-slate-950 text-slate-600 border border-slate-800 cursor-not-allowed'
            }`}
          >
            {rerouteApplied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>REROUTE CONFIRMED & DISPATCHED</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>EXECUTE TRANSSHIPMENT REROUTE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* PORT RISK GRID */}
      <div className="space-y-3 font-mono">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Regional Hub Port Congestion Risk Matrix ({PORT_BOTTLENECK_DATA.length} Major Ports)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PORT_BOTTLENECK_DATA.map((port) => (
            <div
              key={port.portName}
              className={`p-4 rounded-2xl border space-y-2.5 bg-slate-950 transition-all ${
                port.riskLevel === 'Severe'
                  ? 'border-rose-500/50 shadow-rose-950/20'
                  : 'border-amber-500/40 shadow-amber-950/20'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">{port.portName}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    port.riskLevel === 'Severe'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  }`}
                >
                  {port.riskLevel} Risk
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Country / Region:</span>
                  <span className="text-slate-200 font-bold">{port.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ETA Delay Hours:</span>
                  <span className="text-rose-400 font-bold">+{port.delayHours} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Queued Vessels:</span>
                  <span className="text-amber-300 font-bold">{port.queuedVessels} Vessels</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Demurrage Rate:</span>
                  <span className="text-cyan-300 font-bold">${port.demurrageRatePerDay}/day</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
