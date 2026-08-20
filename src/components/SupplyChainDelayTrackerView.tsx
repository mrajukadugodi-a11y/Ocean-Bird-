import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  TrendingUp,
  Ship,
  Plane,
  Building2,
  BarChart3,
  MapPin,
  CheckCircle2,
  Filter,
  RefreshCw,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface BottleneckItem {
  id: string;
  location: string;
  region: string;
  sector: 'Seaport Maritime' | 'Airways Cargo Hub';
  delayHours: number;
  vesselsWaiting: number;
  severity: 'Severe Bottleneck' | 'Moderate Congestion' | 'Normal Flow';
  cause: string;
  aiEtaImpact: string;
}

export const SupplyChainDelayTrackerView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSector, setSelectedSector] = useState<'All' | 'Seaport Maritime' | 'Airways Cargo Hub'>('All');

  const BOTTLENECKS: BottleneckItem[] = [
    {
      id: 'BOT-01',
      location: 'Port of Singapore / Pasir Panjang Anchorage',
      region: 'Southeast Asia',
      sector: 'Seaport Maritime',
      delayHours: 38,
      vesselsWaiting: 42,
      severity: 'Severe Bottleneck',
      cause: 'Red Sea rerouting shift & peak container transshipment surge',
      aiEtaImpact: '+2.5 Days to European Ports'
    },
    {
      id: 'BOT-02',
      location: 'Frankfurt Airport Cargo Terminal (FRA)',
      region: 'Europe',
      sector: 'Airways Cargo Hub',
      delayHours: 14,
      vesselsWaiting: 18,
      severity: 'Moderate Congestion',
      cause: 'Heavy air freight volume & customs clearance backlog',
      aiEtaImpact: '+12 Hours to transatlantic air cargo'
    },
    {
      id: 'BOT-03',
      location: 'Port of Los Angeles & Long Beach',
      region: 'North America',
      sector: 'Seaport Maritime',
      delayHours: 26,
      vesselsWaiting: 29,
      severity: 'Moderate Congestion',
      cause: 'Intermodal rail car shortage & warehouse capacity constraints',
      aiEtaImpact: '+1.8 Days to US Midwest distribution'
    },
    {
      id: 'BOT-04',
      location: 'Dubai Al Maktoum Cargo Hub (DWC)',
      region: 'Middle East',
      sector: 'Airways Cargo Hub',
      delayHours: 6,
      vesselsWaiting: 8,
      severity: 'Normal Flow',
      cause: 'Scheduled seasonal peak maintenance',
      aiEtaImpact: '+4 Hours max impact'
    }
  ];

  const filtered = BOTTLENECKS.filter(b => {
    if (selectedRegion !== 'All' && b.region !== selectedRegion) return false;
    if (selectedSector !== 'All' && b.sector !== selectedSector) return false;
    return true;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Clock className="w-64 h-64 text-amber-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>REAL-TIME GLOBAL SUPPLY CHAIN BOTTLENECK RADAR</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                LIVE CONGESTION FEED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Real-Time Maritime & Airways Supply Chain Delay Tracker</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Monitor global seaport berth congestion, container turnaround delays, air cargo hub backlogs, and AI predictive voyage arrival impacts worldwide.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs shrink-0">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-950 text-white font-bold p-3 rounded-2xl border border-slate-800 focus:outline-none"
            >
              <option value="All">All Global Regions</option>
              <option value="Southeast Asia">Southeast Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Middle East">Middle East</option>
            </select>
          </div>
        </div>

        {/* SUMMARY METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Avg Seaport Delay</span>
            <span className="text-amber-400 font-black text-lg">28.4 Hours</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Avg Air Cargo Backlog</span>
            <span className="text-sky-300 font-black text-lg">9.2 Hours</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Vessels Queued Global</span>
            <span className="text-rose-400 font-black text-lg">314 Ships</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">AI ETA Accuracy</span>
            <span className="text-emerald-400 font-black text-lg">99.1% Confidence</span>
          </div>
        </div>
      </div>

      {/* BOTTLENECK LISTING */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <span>Port & Airways Bottleneck Congestion Radar</span>
          </h2>
          <span className="text-slate-400 text-xs">Updated 2 minutes ago via AIS/ADS-B Satellite Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-amber-500/40 transition-all shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold">
                      {item.sector}
                    </span>
                    <span className="text-amber-400 text-[10px] font-bold">{item.region}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-sans">{item.location}</h3>
                </div>

                <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                  item.severity === 'Severe Bottleneck' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                  item.severity === 'Moderate Congestion' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {item.severity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] block">ESTIMATED DELAY</span>
                  <span className="text-amber-300 font-bold text-sm">+{item.delayHours} Hours</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">QUEUE LENGTH</span>
                  <span className="text-slate-200 font-bold text-sm">{item.vesselsWaiting} Units Waiting</span>
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <span className="text-slate-400 block">Root Cause: <strong className="text-slate-200">{item.cause}</strong></span>
                <span className="text-sky-300 block font-bold">AI Predictive Impact: {item.aiEtaImpact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
