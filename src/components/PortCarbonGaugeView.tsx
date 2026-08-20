import React, { useState } from 'react';
import {
  Gauge,
  Zap,
  Activity,
  Award,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Download,
  Filter,
  BarChart3,
  Flame,
  Globe,
  Leaf,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface PortCarbonRecord {
  portId: string;
  portName: string;
  country: string;
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  co2TonsDaily: number;
  shorePowerKw: number;
  shorePowerPct: number;
  pm25Level: number; // ug/m3
  noxLevel: number;  // ppb
  soxLevel: number;  // ppb
  greenBerthRank: number;
}

const PORT_CARBON_DATA: PortCarbonRecord[] = [
  { portId: 'P-JNPT', portName: 'Jawaharlal Nehru Port Trust (JNPT)', country: 'India', ciiRating: 'A', co2TonsDaily: 1420, shorePowerKw: 4500, shorePowerPct: 82, pm25Level: 18.4, noxLevel: 24.1, soxLevel: 8.2, greenBerthRank: 1 },
  { portId: 'P-CGP', portName: 'Chittagong Container Port', country: 'Bangladesh', ciiRating: 'B', co2TonsDaily: 1890, shorePowerKw: 2100, shorePowerPct: 54, pm25Level: 32.5, noxLevel: 38.0, soxLevel: 14.8, greenBerthRank: 3 },
  { portId: 'P-CMB', portName: 'Colombo Harbour Commercial Dock', country: 'Sri Lanka', ciiRating: 'A', co2TonsDaily: 1120, shorePowerKw: 3800, shorePowerPct: 78, pm25Level: 14.1, noxLevel: 19.5, soxLevel: 6.1, greenBerthRank: 2 },
  { portId: 'P-KHI', portName: 'Karachi Port Trust (KPT)', country: 'Pakistan', ciiRating: 'C', co2TonsDaily: 2450, shorePowerKw: 1200, shorePowerPct: 35, pm25Level: 44.2, noxLevel: 51.2, soxLevel: 22.0, greenBerthRank: 4 }
];

export const PortCarbonGaugeView: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<PortCarbonRecord>(PORT_CARBON_DATA[0]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    hapticEngine.trigger('success');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 font-mono animate-fadeIn pb-12">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-5 h-5 animate-pulse" />
              <span>IMO MEPC.328 Green Berth Carbon Gauge</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Port Carbon Gauge & Cold-Ironing Emissions
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Real-time port berth CO2 emissions, shore power (cold-ironing) grid connection efficiency, PM2.5 / NOx air quality telemetry, and green port ratings.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => showToast('Generated Port Carbon Audit & IMO MEPC Compliance Report!')}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-xl transition-all"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>EXPORT EMISSIONS AUDIT</span>
            </button>
          </div>
        </div>
      </div>

      {/* PORT SELECTOR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center space-x-2 shrink-0">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-300 uppercase">Select Terminal Port:</span>
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {PORT_CARBON_DATA.map((p) => (
            <button
              key={p.portId}
              onClick={() => {
                setSelectedPort(p);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                selectedPort.portId === p.portId
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-lg'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {p.portName.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* CARBON GAUGE METRICS & SHORE POWER METERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CO2 GAUGE CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase">
              <Gauge className="w-4 h-4" />
              <span>Berth CO2 Emissions Rate</span>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
              Class {selectedPort.ciiRating}
            </span>
          </div>

          <div className="text-center py-4 space-y-2">
            <div className="text-4xl font-black text-white">{selectedPort.co2TonsDaily.toLocaleString()} <span className="text-xs font-normal text-slate-400">Tons / Day</span></div>
            <p className="text-[11px] text-slate-400">Total berth auxiliary engine burn across 28 ships</p>
            <div className="flex items-center justify-center space-x-1 text-emerald-400 text-xs font-bold pt-2">
              <TrendingDown className="w-4 h-4" />
              <span>-18.4% reduction via Shore Power</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400">
            IMO Target: Under 1,500 Tons CO2 daily per major container terminal.
          </div>
        </div>

        {/* SHORE POWER (COLD-IRONING) CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase">
              <Zap className="w-4 h-4" />
              <span>Cold-Ironing Grid Connection</span>
            </div>
            <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 font-bold">
              {selectedPort.shorePowerKw} kW Active
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-300">Shore Power Utilization Rate</span>
                <span className="text-amber-300">{selectedPort.shorePowerPct}%</span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${selectedPort.shorePowerPct}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Green Energy Grid:</span>
                <strong className="text-emerald-400">6.6kV 60Hz Hydro/Solar</strong>
              </div>
              <div className="flex justify-between">
                <span>Connected Vessels:</span>
                <strong className="text-cyan-300">18 / 22 Container Ships</strong>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400">
            Cold-ironing eliminates 95% of localized diesel auxiliary particulate emissions.
          </div>
        </div>

        {/* AIR QUALITY PM2.5 / NOX / SOX CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 uppercase">
              <Activity className="w-4 h-4" />
              <span>Air Quality Telemetry</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
              WHO Clean Air
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">PM2.5 Particulate:</span>
              <span className="font-bold text-white">{selectedPort.pm25Level} µg/m³</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">NOx Oxides:</span>
              <span className="font-bold text-amber-300">{selectedPort.noxLevel} ppb</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">SOx Sulfur Index:</span>
              <span className="font-bold text-teal-300">{selectedPort.soxLevel} ppb</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400">
            IMO 2020 0.50% Global Sulfur Cap compliant across all berthing vessels.
          </div>
        </div>
      </div>
    </div>
  );
};
