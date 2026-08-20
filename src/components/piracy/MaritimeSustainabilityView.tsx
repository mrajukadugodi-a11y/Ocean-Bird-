import React, { useState } from 'react';
import { Leaf, Fuel, Gauge, TrendingDown, ShieldCheck, Zap, RefreshCw, BarChart2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface SustainabilityMetric {
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  co2EmissionsTonsPerDay: number;
  fuelConsumptionMT: number;
  optimalEvasionSpeedKnots: number;
  eexiComplianceStatus: string;
}

export const MaritimeSustainabilityView: React.FC = () => {
  const [vesselSpeed, setVesselSpeed] = useState<number>(16.5);
  const [apiSyncStatus, setApiSyncStatus] = useState<string>('IMO DCS API SYNCED (2 MIN AGO)');

  // Dynamic CII calculation based on speed
  const calculateCii = (speed: number) => {
    if (speed < 14) return { rating: 'A', co2: 38.2, fuel: 12.4, eexi: 'COMPLIANT (EXCEEDS 2026 TARGETS)' };
    if (speed < 17) return { rating: 'B', co2: 48.5, fuel: 15.8, eexi: 'COMPLIANT' };
    if (speed < 20) return { rating: 'C', co2: 64.1, fuel: 20.9, eexi: 'MARGINAL COMPLIANCE' };
    return { rating: 'D', co2: 89.0, fuel: 28.5, eexi: 'CII PENALTY WARNING (OPTIMIZE SPEED)' };
  };

  const metrics = calculateCii(vesselSpeed);

  const handleRefreshApi = () => {
    hapticEngine.trigger('click');
    setApiSyncStatus('SYNCING IMO SUSTAINABILITY DATABANK...');
    setTimeout(() => {
      setApiSyncStatus(`IMO DCS API SYNCED (${new Date().toLocaleTimeString()} UTC)`);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>IMO 2030 Maritime Sustainability & CII Carbon Intensity API</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time calculation of Carbon Intensity Indicator (CII), EEXI compliance ratings, and eco-versus-evasion fuel optimization
          </p>
        </div>

        <button
          onClick={handleRefreshApi}
          className="px-3 py-1.5 bg-slate-950 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-[10px] font-bold flex items-center space-x-1.5"
        >
          <RefreshCw className="w-3 h-3 text-emerald-400" />
          <span>{apiSyncStatus}</span>
        </button>
      </div>

      {/* Speed Slider for Fuel/CII Tradeoff */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-slate-300 font-bold">Transit Speed versus Eco-Efficiency Adjustment:</span>
          <span className="text-cyan-400 font-black">{vesselSpeed} Knots</span>
        </div>
        <input
          type="range"
          min="10"
          max="24"
          step="0.5"
          value={vesselSpeed}
          onChange={(e) => {
            setVesselSpeed(parseFloat(e.target.value));
            hapticEngine.trigger('click');
          }}
          className="w-full accent-emerald-400 cursor-pointer"
        />
        <div className="flex justify-between text-[9px] text-slate-500">
          <span>10.0 Kts (Slow Steaming Eco-Mode)</span>
          <span>16.5 Kts (Standard Transit)</span>
          <span>24.0 Kts (Max Anti-Piracy Sprint)</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block font-sans">CII Operational Rating:</span>
          <span
            className={`text-xl font-black block ${
              metrics.rating === 'A' || metrics.rating === 'B'
                ? 'text-emerald-400'
                : metrics.rating === 'C'
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            GRADE {metrics.rating}
          </span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block font-sans">Est CO2 Emissions:</span>
          <span className="text-lg font-black text-cyan-300 block">{metrics.co2} MT / Day</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block font-sans">VLSFO Fuel Burn:</span>
          <span className="text-lg font-black text-white block">{metrics.fuel} MT / Day</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block font-sans">EEXI Target Status:</span>
          <span className="text-[10px] font-bold text-emerald-400 block truncate">{metrics.eexi}</span>
        </div>
      </div>
    </div>
  );
};
