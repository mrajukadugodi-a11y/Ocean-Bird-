import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Fuel,
  Droplets,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Globe,
  Sliders,
  Check,
  RefreshCw,
  Award,
  Layers
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

interface UtilityHub {
  hubName: string;
  region: string;
  shorePowerCapacityMW: number;
  shorePowerOccupancyPercent: number;
  lngBunkeringPricePerTon: number;
  lngStockMT: number;
  freshWaterSupplyTonsDay: number;
  greenHydrogenStockTons: number;
  riskStatus: 'Optimal' | 'High Demand' | 'Constrained';
}

const UTILITY_HUBS_DATA: UtilityHub[] = [
  {
    hubName: 'Singapore Maritime Hub',
    region: 'Southeast Asia',
    shorePowerCapacityMW: 120,
    shorePowerOccupancyPercent: 78,
    lngBunkeringPricePerTon: 620,
    lngStockMT: 45000,
    freshWaterSupplyTonsDay: 18000,
    greenHydrogenStockTons: 1200,
    riskStatus: 'Optimal'
  },
  {
    hubName: 'Colombo Transshipment Hub',
    region: 'South Asia (Sri Lanka)',
    shorePowerCapacityMW: 45,
    shorePowerOccupancyPercent: 92,
    lngBunkeringPricePerTon: 680,
    lngStockMT: 12500,
    freshWaterSupplyTonsDay: 6500,
    greenHydrogenStockTons: 350,
    riskStatus: 'High Demand'
  },
  {
    hubName: 'JNPT Nhava Sheva (Mumbai)',
    region: 'South Asia (India)',
    shorePowerCapacityMW: 60,
    shorePowerOccupancyPercent: 84,
    lngBunkeringPricePerTon: 645,
    lngStockMT: 22000,
    freshWaterSupplyTonsDay: 9200,
    greenHydrogenStockTons: 600,
    riskStatus: 'Optimal'
  },
  {
    hubName: 'Rotterdam Gateway',
    region: 'North Europe',
    shorePowerCapacityMW: 180,
    shorePowerOccupancyPercent: 65,
    lngBunkeringPricePerTon: 590,
    lngStockMT: 68000,
    freshWaterSupplyTonsDay: 25000,
    greenHydrogenStockTons: 3200,
    riskStatus: 'Optimal'
  },
  {
    hubName: 'Chittagong Port Roads',
    region: 'South Asia (Bangladesh)',
    shorePowerCapacityMW: 25,
    shorePowerOccupancyPercent: 98,
    lngBunkeringPricePerTon: 740,
    lngStockMT: 4200,
    freshWaterSupplyTonsDay: 3200,
    greenHydrogenStockTons: 80,
    riskStatus: 'Constrained'
  }
];

export const GlobalUtilityForecastView: React.FC = () => {
  const [forecastHorizon, setForecastHorizon] = useState<'7D' | '30D' | '90D'>('30D');
  const [selectedHub, setSelectedHub] = useState<UtilityHub | null>(null);
  const [isAllocating, setIsAllocating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const chartData = UTILITY_HUBS_DATA.map((hub) => {
    const multiplier = forecastHorizon === '7D' ? 0.9 : forecastHorizon === '30D' ? 1.0 : 1.25;
    return {
      name: hub.hubName.split(' ')[0],
      ShorePowerMW: Math.round(hub.shorePowerCapacityMW * multiplier),
      LngStockMT: Math.round(hub.lngStockMT * multiplier / 100),
      PricePerTon: Math.round(hub.lngBunkeringPricePerTon * (1 / multiplier))
    };
  });

  const handleAllocateShorePower = () => {
    if (!selectedHub) return;
    setIsAllocating(true);
    setTimeout(() => {
      setIsAllocating(false);
      showToast(`Shore Power & LNG reserve slot reserved at ${selectedHub.hubName}.`);
    }, 1500);
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
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-emerald-500 text-emerald-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MARITIME PORT SHORE POWER, LNG & UTILITIES FORECAST RADAR</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-emerald-400" />
              <span>Global Utility Forecast & Grid Radar</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Predictive supply forecasting for port shore power grid loads, LNG bunkering fuel prices, desalinated fresh water reserves, and green hydrogen stocks.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-slate-400 font-bold">Horizon:</span>
            {(['7D', '30D', '90D'] as const).map((h) => (
              <button
                key={h}
                onClick={() => setForecastHorizon(h)}
                className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                  forecastHorizon === h
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">TOTAL SHORE POWER GRID</span>
          <strong className="text-2xl font-black text-white block">430 MW</strong>
          <span className="text-[10px] text-emerald-400 block">76% Avg Grid Load</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">AVG LNG BUNKERING SPOT</span>
          <strong className="text-2xl font-black text-amber-300 block">$635 / MT</strong>
          <span className="text-[10px] text-emerald-400 block">-2.8% price drop forecast</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">FRESH WATER RESERVES</span>
          <strong className="text-2xl font-black text-cyan-300 block">61,900 Tons/day</strong>
          <span className="text-[10px] text-cyan-400 block">Desalination plants nominal</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">GREEN HYDROGEN STOCKS</span>
          <strong className="text-2xl font-black text-emerald-400 block">5,430 MT</strong>
          <span className="text-[10px] text-emerald-400 block">+18% clean fuel expansion</span>
        </div>
      </div>

      {/* CHART & UTILITY ALLOCATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
        {/* CHART (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Port Shore Power (MW) & LNG Reserves Forecast</span>
              </h4>
              <p className="text-[11px] text-slate-400">Demand projection across major Asian & European port hubs</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#f8fafc' }}
                  labelStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
                <Bar dataKey="ShorePowerMW" fill="#10b981" name="Shore Power (MW)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="LngStockMT" fill="#f59e0b" name="LNG Stock (x100 MT)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* UTILITY SLOT ALLOCATOR (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase border-b border-slate-800 pb-2">
              <Zap className="w-4 h-4" />
              <span>Smart Shore Power & LNG Bunkering Allocator</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Select a port hub to reserve shore power grid connection and lock in green fuel bunkering rates.
            </p>

            <select
              value={selectedHub?.hubName || ''}
              onChange={(e) => {
                const found = UTILITY_HUBS_DATA.find((h) => h.hubName === e.target.value);
                setSelectedHub(found || null);
              }}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="">-- SELECT PORT UTILITY HUB --</option>
              {UTILITY_HUBS_DATA.map((h) => (
                <option key={h.hubName} value={h.hubName}>
                  {h.hubName} ({h.riskStatus})
                </option>
              ))}
            </select>

            {selectedHub ? (
              <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-2 text-xs">
                <div className="text-[10px] text-emerald-400 font-bold uppercase">UTILITY HUB PROFILE:</div>
                <div className="flex justify-between text-slate-300">
                  <span>Shore Power Load:</span>
                  <strong className="text-white">{selectedHub.shorePowerOccupancyPercent}% ({selectedHub.shorePowerCapacityMW} MW)</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>LNG Bunkering Spot:</span>
                  <strong className="text-amber-300">${selectedHub.lngBunkeringPricePerTon} / MT</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Fresh Water Supply:</span>
                  <strong className="text-cyan-300">{selectedHub.freshWaterSupplyTonsDay} Tons/day</strong>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center text-[11px] text-slate-500">
                Choose a port hub above to allocate power & bunkering
              </div>
            )}
          </div>

          <button
            onClick={handleAllocateShorePower}
            disabled={!selectedHub || isAllocating}
            className={`w-full py-2.5 rounded-xl font-bold text-xs font-mono transition-all flex items-center justify-center space-x-2 ${
              selectedHub
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg'
                : 'bg-slate-950 text-slate-600 border border-slate-800 cursor-not-allowed'
            }`}
          >
            <Zap className={`w-4 h-4 ${isAllocating ? 'animate-spin' : ''}`} />
            <span>{isAllocating ? 'ALLOCATING GRID SLOT...' : 'RESERVE SHORE POWER & LNG SLOT'}</span>
          </button>
        </div>
      </div>

      {/* UTILITY HUBS GRID */}
      <div className="space-y-3 font-mono">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Global Maritime Utility Hub Status ({UTILITY_HUBS_DATA.length} Hubs Monitored)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {UTILITY_HUBS_DATA.map((hub) => (
            <div
              key={hub.hubName}
              className={`p-4 rounded-2xl border space-y-2.5 bg-slate-950 transition-all ${
                hub.riskStatus === 'Constrained'
                  ? 'border-rose-500/50 shadow-rose-950/20'
                  : hub.riskStatus === 'High Demand'
                  ? 'border-amber-500/40 shadow-amber-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">{hub.hubName}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    hub.riskStatus === 'Optimal'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : hub.riskStatus === 'High Demand'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                  }`}
                >
                  {hub.riskStatus}
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Shore Power Grid:</span>
                  <span className="text-emerald-400 font-bold">{hub.shorePowerCapacityMW} MW ({hub.shorePowerOccupancyPercent}% used)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">LNG Bunkering Rate:</span>
                  <span className="text-amber-300 font-bold">${hub.lngBunkeringPricePerTon} / MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fresh Water Reserves:</span>
                  <span className="text-cyan-300 font-bold">{hub.freshWaterSupplyTonsDay} Tons/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Green H2 Stock:</span>
                  <span className="text-emerald-300 font-bold">{hub.greenHydrogenStockTons} MT</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
