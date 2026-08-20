import React, { useState } from 'react';
import {
  Ship,
  Clock,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Building2,
  Anchor,
  Compass,
  ArrowRight,
  Filter,
  CheckCircle2,
  Search
} from 'lucide-react';

interface PortForecastItem {
  id: string;
  portName: string;
  country: string;
  flag: string;
  congestionLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  congestionPercent: number;
  avgWaitHours: number;
  vesselsAtAnchorage: number;
  expectedArrivals24h: number;
  berthOccupancy: number; // percentage
  weatherDowntimeRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  primaryCargo: string;
  recommendation: string;
}

const PORT_FORECASTS_DATA: PortForecastItem[] = [
  {
    id: 'colombo',
    portName: 'Port of Colombo',
    country: 'Sri Lanka',
    flag: '🇱🇰',
    congestionLevel: 'HIGH',
    congestionPercent: 78,
    avgWaitHours: 28,
    vesselsAtAnchorage: 34,
    expectedArrivals24h: 18,
    berthOccupancy: 88,
    weatherDowntimeRisk: 'MEDIUM',
    primaryCargo: 'Transshipment Containers / Feeder',
    recommendation: 'Prioritize East Container Terminal (ECT) window booking or slow steam by 1.5 knots to avoid anchorage congestion.'
  },
  {
    id: 'mumbai-jnpt',
    portName: 'JNPT (Jawaharlal Nehru Port)',
    country: 'India',
    flag: '🇮🇳',
    congestionLevel: 'MODERATE',
    congestionPercent: 58,
    avgWaitHours: 14,
    vesselsAtAnchorage: 19,
    expectedArrivals24h: 22,
    berthOccupancy: 72,
    weatherDowntimeRisk: 'LOW',
    primaryCargo: 'Container & Heavy Industrial Machinery',
    recommendation: 'Berth throughput running at optimal speed. Direct berthing available for scheduled liner calls.'
  },
  {
    id: 'chittagong',
    portName: 'Chittagong Seaport',
    country: 'Bangladesh',
    flag: '🇧🇩',
    congestionLevel: 'CRITICAL',
    congestionPercent: 92,
    avgWaitHours: 64,
    vesselsAtAnchorage: 48,
    expectedArrivals24h: 12,
    berthOccupancy: 96,
    weatherDowntimeRisk: 'HIGH',
    primaryCargo: 'Bulk Grain, Garments & Raw Materials',
    recommendation: 'Monsoon outer anchorage delay critical. Lighterage ships operating at 60% capacity.'
  },
  {
    id: 'singapore',
    portName: 'Port of Singapore (PSA)',
    country: 'Singapore',
    flag: '🇸🇬',
    congestionLevel: 'HIGH',
    congestionPercent: 82,
    avgWaitHours: 22,
    vesselsAtAnchorage: 62,
    expectedArrivals24h: 75,
    berthOccupancy: 90,
    weatherDowntimeRisk: 'LOW',
    primaryCargo: 'Global Transshipment Hub',
    recommendation: 'Off-dock container staging in place. Request priority pilotage booking 12h in advance.'
  },
  {
    id: 'fujairah',
    portName: 'Fujairah Offshore Anchorage',
    country: 'UAE',
    flag: '🇦🇪',
    congestionLevel: 'LOW',
    congestionPercent: 32,
    avgWaitHours: 4,
    vesselsAtAnchorage: 26,
    expectedArrivals24h: 30,
    berthOccupancy: 45,
    weatherDowntimeRisk: 'LOW',
    primaryCargo: 'Marine Bunkering & Crude Oil',
    recommendation: 'Bunker barge availability high. Rapid 4-hour turnaround for fuel replenishment.'
  },
  {
    id: 'karachi',
    portName: 'Karachi Port Trust (KPT)',
    country: 'Pakistan',
    flag: '🇵🇰',
    congestionLevel: 'MODERATE',
    congestionPercent: 62,
    avgWaitHours: 18,
    vesselsAtAnchorage: 16,
    expectedArrivals24h: 10,
    berthOccupancy: 74,
    weatherDowntimeRisk: 'LOW',
    primaryCargo: 'Containers & Dry Bulk',
    recommendation: 'SAPT terminal berth availability good; Channel draft restricted to 13m at low tide.'
  },
  {
    id: 'male',
    portName: 'Malé Commercial Harbor',
    country: 'Maldives',
    flag: '🇲🇻',
    congestionLevel: 'HIGH',
    congestionPercent: 85,
    avgWaitHours: 36,
    vesselsAtAnchorage: 14,
    expectedArrivals24h: 5,
    berthOccupancy: 94,
    weatherDowntimeRisk: 'HIGH',
    primaryCargo: 'Food, Resort Supplies & Fuel',
    recommendation: 'Single berth feeder limitation. Unloading delayed due to swell surge.'
  }
];

export const PortTrafficForecastView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const filteredPorts = PORT_FORECASTS_DATA.filter((port) => {
    const matchesSearch =
      port.portName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      port.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'ALL' || port.congestionLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div id="port-traffic-forecast-view" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>SOUTH ASIA & REGIONAL MARITIME LOGISTICS RADAR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-cyan-400" />
              <span>Port Traffic & Congestion Forecast</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Predictive AI models for anchorage waiting times, berth occupancy, vessel queues, and monsoon downtime risks across major South Asian ports.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-center">
              <span className="text-[10px] text-slate-400 block uppercase">AVG REGIONAL WAIT</span>
              <strong className="text-amber-400 text-sm">26.5 Hours</strong>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-center">
              <span className="text-[10px] text-slate-400 block uppercase">TOTAL QUEUE</span>
              <strong className="text-cyan-400 text-sm">219 Ships</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search port or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto text-xs font-mono">
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                filterLevel === lvl
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Port Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPorts.map((port) => {
          const isCritical = port.congestionLevel === 'CRITICAL';
          const isHigh = port.congestionLevel === 'HIGH';

          return (
            <div
              key={port.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl hover:border-slate-700 transition-all relative overflow-hidden"
            >
              {/* Top Row: Port Name & Congestion Badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{port.flag}</span>
                  <div>
                    <h3 className="font-bold text-white text-base">{port.portName}</h3>
                    <p className="text-slate-400 text-xs font-mono">{port.country} • {port.primaryCargo}</p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase border ${
                    isCritical
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                      : isHigh
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  }`}
                >
                  {port.congestionLevel} ({port.congestionPercent}%)
                </span>
              </div>

              {/* Congestion Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Berth Occupancy: {port.berthOccupancy}%</span>
                  <span>Expected Wait: {port.avgWaitHours} Hours</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${port.congestionPercent}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">ANCHORAGE QUEUE</span>
                  <strong className="text-cyan-400 text-sm">{port.vesselsAtAnchorage} Ships</strong>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">INCOMING (24H)</span>
                  <strong className="text-white text-sm">+{port.expectedArrivals24h} Ships</strong>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">WEATHER RISK</span>
                  <strong
                    className={
                      port.weatherDowntimeRisk === 'HIGH'
                        ? 'text-rose-400'
                        : port.weatherDowntimeRisk === 'MEDIUM'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }
                  >
                    {port.weatherDowntimeRisk}
                  </strong>
                </div>
              </div>

              {/* AI Recommendation Box */}
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start space-x-2">
                <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-cyan-300 font-mono">AI Advisory:</strong> {port.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
