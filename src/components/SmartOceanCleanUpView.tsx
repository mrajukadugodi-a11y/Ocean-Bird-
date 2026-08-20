import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Filter,
  Activity,
  MapPin,
  Compass,
  Zap,
  Waves,
  Trash2,
  Trash,
  Bot,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertTriangle,
  BarChart2,
  Layers,
  Search,
  Globe,
  Radio,
  Navigation
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface AutonomousSkimmer {
  id: string;
  name: string;
  zone: string;
  batteryPct: number;
  capacityKg: number;
  collectedKg: number;
  status: 'COLLECTING' | 'RETURNING' | 'CHARGING' | 'STANDBY';
  solarKw: number;
  microplasticDensity: string;
}

const INITIAL_SKIMMERS: AutonomousSkimmer[] = [
  { id: 'SKM-01', name: 'Ocean Cleaner Alpha', zone: 'Malacca Strait Entrance', batteryPct: 88, capacityKg: 1500, collectedKg: 1120, status: 'COLLECTING', solarKw: 4.2, microplasticDensity: 'High (850 p/m³)' },
  { id: 'SKM-02', name: 'Ocean Cleaner Beta', zone: 'Mumbai High Offshore', batteryPct: 64, capacityKg: 2000, collectedKg: 1890, status: 'RETURNING', solarKw: 3.8, microplasticDensity: 'Critical (1240 p/m³)' },
  { id: 'SKM-03', name: 'Ocean Cleaner Gamma', zone: 'Bay of Bengal Gyre', batteryPct: 100, capacityKg: 2500, collectedKg: 420, status: 'COLLECTING', solarKw: 5.1, microplasticDensity: 'Moderate (410 p/m³)' },
  { id: 'SKM-04', name: 'Ocean Cleaner Delta', zone: 'Chittagong Estuary', batteryPct: 32, capacityKg: 1200, collectedKg: 1200, status: 'CHARGING', solarKw: 0.0, microplasticDensity: 'High (920 p/m³)' }
];

export const SmartOceanCleanUpView: React.FC = () => {
  const [skimmers, setSkimmers] = useState<AutonomousSkimmer[]>(INITIAL_SKIMMERS);
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isDeployingNew, setIsDeployingNew] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    hapticEngine.trigger('success');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDeployDrone = (skimmerId: string) => {
    hapticEngine.trigger('click');
    setSkimmers((prev) =>
      prev.map((s) => (s.id === skimmerId ? { ...s, status: 'COLLECTING' } : s))
    );
    showToast(`Autonomous Drone ${skimmerId} deployed to active skimming route!`);
  };

  const totalCollectedTodayKg = skimmers.reduce((acc, s) => acc + s.collectedKg, 0);

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
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Waves className="w-5 h-5 animate-pulse" />
              <span>AI Autonomous Debris & Microplastic Interception</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Smart Ocean Clean-Up & Marine Plastic Telemetry
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Real-time monitoring of autonomous solar skimmer fleets, satellite trash gyre heatmaps, and microplastic density telemetry across Asian shipping lanes.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => showToast('Dispatched AI Trash Gyre Scan Satellite Drone!')}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-xl transition-all"
            >
              <Bot className="w-4 h-4 text-slate-950" />
              <span>DISPATCH AI SCANNER</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Plastic Collected Today</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-emerald-400">{totalCollectedTodayKg.toLocaleString()} kg</span>
            <span className="text-[10px] text-cyan-400 font-bold">+14% vs Target</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Autonomous Skimmers</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-cyan-300">4 Drones</span>
            <span className="text-[10px] text-emerald-400 font-bold">100% Solar</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Microplastic Density</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-amber-400">855 p/m³</span>
            <span className="text-[10px] text-rose-400 font-bold">High Density Zone</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Ocean Area Cleaned</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-teal-300">1,420 Sq. NM</span>
            <span className="text-[10px] text-emerald-400 font-bold">MARPOL V Compliant</span>
          </div>
        </div>
      </div>

      {/* Autonomous Skimmer Fleet Control */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
            <Bot className="w-4 h-4" />
            <span>Autonomous Solar Skimmer Telemetry</span>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
            4 Solar Units Online
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skimmers.map((s) => (
            <div key={s.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
                    <Trash className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{s.name}</h3>
                    <p className="text-[10px] text-slate-400">{s.zone}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  s.status === 'COLLECTING' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  s.status === 'RETURNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300'
                }`}>
                  {s.status}
                </span>
              </div>

              {/* Progress meters */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                    <span>Debris Storage Capacity ({s.collectedKg} / {s.capacityKg} kg)</span>
                    <span className="text-cyan-300">{Math.round((s.collectedKg / s.capacityKg) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{ width: `${(s.collectedKg / s.capacityKg) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400">Solar Gen: <strong className="text-amber-300">{s.solarKw} kW</strong></span>
                  <span className="text-slate-400">Battery: <strong className="text-emerald-400">{s.batteryPct}%</strong></span>
                  <span className="text-slate-400">Microplastics: <strong className="text-rose-300">{s.microplasticDensity}</strong></span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDeployDrone(s.id)}
                  className="px-3 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 rounded-xl text-[10px] font-bold flex items-center space-x-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Re-Route Drone</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
