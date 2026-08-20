import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Ship,
  Zap,
  Activity,
  AlertTriangle,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Gauge,
  Droplets,
  Wind,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Clock,
  Sparkles
} from 'lucide-react';

interface VesselMetrics {
  imo: string;
  name: string;
  type: 'Container' | 'Oil Tanker' | 'Bulk Carrier' | 'LNG Carrier' | 'Air Cargo Fleet';
  flag: string;
  speedKts: number;
  designSpeedKts: number;
  engineLoadPct: number;
  fuelConsumptionMT: number; // Metric Tons per day
  ciiGrade: 'A' | 'B' | 'C' | 'D' | 'E';
  co2EmissionsMT: number;
  status: 'Underway' | 'At Anchor' | 'Bunkering' | 'Maintenance' | 'In Port';
  destination: string;
  eta: string;
  sfcGkwh: number; // Specific Fuel Consumption g/kWh
  hullFoulingIndex: number; // 0 - 100%
  efficiencyIndex: number; // %
}

const INITIAL_FLEET: VesselMetrics[] = [
  {
    imo: 'IMO 9845120',
    name: 'M/V Ocean Eagle Monarch',
    type: 'Container',
    flag: '🇱🇰 Sri Lanka',
    speedKts: 18.4,
    designSpeedKts: 21.0,
    engineLoadPct: 78,
    fuelConsumptionMT: 38.5,
    ciiGrade: 'A',
    co2EmissionsMT: 120.1,
    status: 'Underway',
    destination: 'Colombo Outer Harbour',
    eta: '2026-08-03 14:00 UTC',
    sfcGkwh: 172,
    hullFoulingIndex: 8,
    efficiencyIndex: 94.2
  },
  {
    imo: 'IMO 9732119',
    name: 'S/T Bay Sentinel',
    type: 'Oil Tanker',
    flag: '🇮🇳 India',
    speedKts: 13.2,
    designSpeedKts: 15.5,
    engineLoadPct: 82,
    fuelConsumptionMT: 42.0,
    ciiGrade: 'B',
    co2EmissionsMT: 131.0,
    status: 'Underway',
    destination: 'Mumbai JNPT Anchorage',
    eta: '2026-08-04 09:30 UTC',
    sfcGkwh: 181,
    hullFoulingIndex: 18,
    efficiencyIndex: 88.5
  },
  {
    imo: 'IMO 9654432',
    name: 'M/V Chittagong Express',
    type: 'Bulk Carrier',
    flag: '🇧🇩 Bangladesh',
    speedKts: 11.5,
    designSpeedKts: 14.0,
    engineLoadPct: 68,
    fuelConsumptionMT: 24.8,
    ciiGrade: 'A',
    co2EmissionsMT: 77.4,
    status: 'Underway',
    destination: 'Chittagong Outer Bar',
    eta: '2026-08-03 21:15 UTC',
    sfcGkwh: 168,
    hullFoulingIndex: 12,
    efficiencyIndex: 92.0
  },
  {
    imo: 'IMO 9910041',
    name: 'M/V Maldivian Crest',
    type: 'LNG Carrier',
    flag: '🇲🇻 Maldives',
    speedKts: 19.1,
    designSpeedKts: 20.5,
    engineLoadPct: 89,
    fuelConsumptionMT: 51.2,
    ciiGrade: 'C',
    co2EmissionsMT: 159.7,
    status: 'Underway',
    destination: 'Malé LNG Terminal',
    eta: '2026-08-05 06:00 UTC',
    sfcGkwh: 194,
    hullFoulingIndex: 29,
    efficiencyIndex: 82.4
  },
  {
    imo: 'IMO 9422810',
    name: 'M/V Karachi Pioneer',
    type: 'Container',
    flag: '🇵🇰 Pakistan',
    speedKts: 0.0,
    designSpeedKts: 22.0,
    engineLoadPct: 5,
    fuelConsumptionMT: 4.2,
    ciiGrade: 'B',
    co2EmissionsMT: 13.1,
    status: 'At Anchor',
    destination: 'Karachi Port Berth 4',
    eta: 'In Port',
    sfcGkwh: 210,
    hullFoulingIndex: 35,
    efficiencyIndex: 76.8
  },
  {
    imo: 'IATA-CARGO-777F',
    name: 'Air Cargo Flight OE-789',
    type: 'Air Cargo Fleet',
    flag: '✈️ Air Cargo',
    speedKts: 480.0,
    designSpeedKts: 510.0,
    engineLoadPct: 84,
    fuelConsumptionMT: 68.0,
    ciiGrade: 'A',
    co2EmissionsMT: 212.0,
    status: 'Underway',
    destination: 'Dhaka DAC Cargo Hub',
    eta: '2026-08-02 18:45 UTC',
    sfcGkwh: 155,
    hullFoulingIndex: 0,
    efficiencyIndex: 96.5
  }
];

export const SmartFleetAnalyticsView: React.FC = () => {
  const [fleet, setFleet] = useState<VesselMetrics[]>(INITIAL_FLEET);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedVesselImo, setSelectedVesselImo] = useState<string>(INITIAL_FLEET[0].imo);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationMessage, setOptimizationMessage] = useState<string | null>(null);

  const filteredFleet = fleet.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.imo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || v.type === filterType;
    return matchesSearch && matchesType;
  });

  const selectedVessel = fleet.find((v) => v.imo === selectedVesselImo) || fleet[0];

  // Calculated Fleet KPIs
  const totalVessels = fleet.length;
  const activeUnderway = fleet.filter((v) => v.status === 'Underway').length;
  const totalFuelMT = fleet.reduce((acc, curr) => acc + curr.fuelConsumptionMT, 0);
  const totalCO2MT = fleet.reduce((acc, curr) => acc + curr.co2EmissionsMT, 0);
  const avgEfficiency = (
    fleet.reduce((acc, curr) => acc + curr.efficiencyIndex, 0) / fleet.length
  ).toFixed(1);

  // Trigger AI Fleet Optimization Simulation
  const handleRunAiOptimization = () => {
    setIsOptimizing(true);
    setOptimizationMessage(null);
    setTimeout(() => {
      setFleet((prev) =>
        prev.map((v) => {
          if (v.ciiGrade === 'C' || v.ciiGrade === 'D') {
            return {
              ...v,
              speedKts: Number((v.speedKts * 0.92).toFixed(1)), // Eco-speed adjustment
              fuelConsumptionMT: Number((v.fuelConsumptionMT * 0.85).toFixed(1)),
              co2EmissionsMT: Number((v.co2EmissionsMT * 0.85).toFixed(1)),
              ciiGrade: 'B',
              efficiencyIndex: Math.min(99, Number((v.efficiencyIndex + 8.5).toFixed(1)))
            };
          }
          return v;
        })
      );
      setIsOptimizing(false);
      setOptimizationMessage(
        'AI Eco-Speed Optimization Applied! Reduced speed by 8% on low-grade vessels, resulting in ~15% fuel savings and upgrading CII ratings to Grade B.'
      );
    }, 1200);
  };

  const getCiiBadgeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'B':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'C':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'D':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'E':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-sky-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
              IMO CII / EEXI TELEMETRY ENGINE
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              LIVE SATELLITE FEED
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center space-x-2">
            <BarChart3 className="w-7 h-7 text-sky-400" />
            <span>Smart Fleet Analytics & CII Carbon Intelligence</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Real-time fleet performance monitoring, Specific Fuel Consumption (SFC) tracking, Carbon Intensity Indicator (CII) grading, and AI eco-speed route optimization.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handleRunAiOptimization}
            disabled={isOptimizing}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'OPTIMIZING FLEET...' : 'RUN AI ECO-SPEED OPTIMIZER'}</span>
          </button>
        </div>
      </div>

      {optimizationMessage && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-xl text-xs text-emerald-200 flex items-start space-x-3 font-mono animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-white uppercase block mb-0.5">FLEET OPTIMIZATION SUCCESSFUL</strong>
            {optimizationMessage}
          </div>
        </div>
      )}

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono text-xs">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>TOTAL FLEET</span>
            <Ship className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-white">{totalVessels} <span className="text-xs font-normal text-slate-400">units</span></p>
          <p className="text-[10px] text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{activeUnderway} Underway Active</span>
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>DAILY FUEL BURN</span>
            <Droplets className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{totalFuelMT.toFixed(1)} <span className="text-xs font-normal text-slate-400">MT/day</span></p>
          <p className="text-[10px] text-slate-400">Across Active Units</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>CO2 EMISSIONS</span>
            <Wind className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400">{totalCO2MT.toFixed(1)} <span className="text-xs font-normal text-slate-400">Tons/day</span></p>
          <p className="text-[10px] text-slate-400">IMO EEXI Compliant</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>AVG EFFICIENCY</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{avgEfficiency}%</p>
          <p className="text-[10px] text-emerald-300">Optimal Range &gt;85%</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>CII RATING MATRIX</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-center space-x-1 pt-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">A: 3</span>
            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 text-xs font-bold border border-teal-500/30">B: 2</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">C: 1</span>
          </div>
          <p className="text-[10px] text-slate-400 pt-0.5">0 Non-Compliant (D/E)</p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Fleet Search & List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search vessel or IMO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
              {['ALL', 'Container', 'Oil Tanker', 'Bulk Carrier', 'LNG Carrier', 'Air Cargo Fleet'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-all ${
                    filterType === t
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Vessel Fleet Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase bg-slate-950/50">
                  <th className="p-3">Vessel / Identifier</th>
                  <th className="p-3">Type & Flag</th>
                  <th className="p-3">Speed (kts)</th>
                  <th className="p-3">Fuel (MT/d)</th>
                  <th className="p-3">CII Grade</th>
                  <th className="p-3">Efficiency</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredFleet.map((v) => (
                  <tr
                    key={v.imo}
                    onClick={() => setSelectedVesselImo(v.imo)}
                    className={`cursor-pointer transition-all hover:bg-slate-800/40 ${
                      selectedVesselImo === v.imo ? 'bg-sky-950/30 border-l-2 border-sky-400' : ''
                    }`}
                  >
                    <td className="p-3">
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <span>{v.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{v.imo}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-slate-200 block font-semibold">{v.type}</span>
                      <span className="text-[10px] text-slate-400">{v.flag}</span>
                    </td>
                    <td className="p-3 text-slate-200 font-bold">
                      {v.speedKts} <span className="text-[10px] text-slate-500 font-normal">/ {v.designSpeedKts}</span>
                    </td>
                    <td className="p-3 text-amber-400 font-bold">{v.fuelConsumptionMT} MT</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border uppercase ${getCiiBadgeColor(v.ciiGrade)}`}>
                        Grade {v.ciiGrade}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              v.efficiencyIndex >= 90
                                ? 'bg-emerald-400'
                                : v.efficiencyIndex >= 80
                                ? 'bg-teal-400'
                                : 'bg-amber-400'
                            }`}
                            style={{ width: `${v.efficiencyIndex}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-300">{v.efficiencyIndex}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <button className="px-2.5 py-1 bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-300 rounded font-bold text-[10px] transition-all">
                        TELEMETRY
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Selected Vessel Telemetry Deep-Dive */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                SELECTED VESSEL TELEMETRY
              </span>
              <h3 className="text-lg font-black text-white">{selectedVessel.name}</h3>
              <p className="text-xs font-mono text-slate-400">{selectedVessel.imo}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black border uppercase ${getCiiBadgeColor(selectedVessel.ciiGrade)}`}>
              CII GRADE {selectedVessel.ciiGrade}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">ENGINE LOAD</span>
              <p className="text-base font-black text-cyan-400">{selectedVessel.engineLoadPct}%</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: `${selectedVessel.engineLoadPct}%` }} />
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">SPECIFIC FUEL CONS (SFC)</span>
              <p className="text-base font-black text-amber-400">{selectedVessel.sfcGkwh} <span className="text-[10px] text-slate-400">g/kWh</span></p>
              <span className="text-[9px] text-emerald-400">ISO 8178 Compliant</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">HULL FOULING INDEX</span>
              <p className={`text-base font-black ${selectedVessel.hullFoulingIndex > 20 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {selectedVessel.hullFoulingIndex}%
              </p>
              <span className="text-[9px] text-slate-400">
                {selectedVessel.hullFoulingIndex > 20 ? 'Requires Underwater Scrub' : 'Clean Hydrodynamic Hull'}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">DAILY CO2 OUTPUT</span>
              <p className="text-base font-black text-rose-400">{selectedVessel.co2EmissionsMT} MT</p>
              <span className="text-[9px] text-slate-400">EU ETS Taxing Tier 1</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>VOYAGE DESTINATION</span>
              <span className="text-white font-bold">{selectedVessel.destination}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>ESTIMATED TIME OF ARRIVAL (ETA)</span>
              <span className="text-sky-300 font-bold">{selectedVessel.eta}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>NAV STATUS</span>
              <span className="text-emerald-400 font-bold uppercase">{selectedVessel.status}</span>
            </div>
          </div>

          {/* AI Maintenance Diagnostic Alert */}
          {selectedVessel.hullFoulingIndex > 20 && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 font-mono flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">AERODYNAMIC / HULL FOULING ADVISORY</strong>
                Hull fouling at {selectedVessel.hullFoulingIndex}%. Schedule diver hull cleaning in next port call to save ~4.2 MT fuel/day.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
