import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Ship,
  Compass,
  Anchor,
  Activity,
  Shield,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Check,
  TrendingUp,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

export interface FleetVessel {
  imo: string;
  name: string;
  type: 'Container' | 'Tanker' | 'Bulk Carrier' | 'LNG Carrier';
  flag: string;
  status: 'Underway' | 'Storm Risk' | 'Anchored' | 'Maintenance';
  region: string;
  sogKts: number;
  headingDeg: number;
  engineTempC: number;
  fuelBurnMtDay: number;
  riskLevel: 'Critical' | 'Warning' | 'Low';
  captainName: string;
}

const FLEET_VESSELS_DATA: FleetVessel[] = [
  {
    imo: 'IMO 9823412',
    name: 'MV Ocean Sovereign',
    type: 'Container',
    flag: 'Liberia',
    status: 'Storm Risk',
    region: 'Bay of Bengal Sector 4',
    sogKts: 14.2,
    headingDeg: 215,
    engineTempC: 84,
    fuelBurnMtDay: 32.5,
    riskLevel: 'Critical',
    captainName: 'Capt. R. Sharma'
  },
  {
    imo: 'IMO 9741289',
    name: 'MT Indus Trader',
    type: 'Tanker',
    flag: 'Panama',
    status: 'Storm Risk',
    region: 'Off Gopalpur Coast',
    sogKts: 11.5,
    headingDeg: 180,
    engineTempC: 92,
    fuelBurnMtDay: 28.0,
    riskLevel: 'Warning',
    captainName: 'Capt. A. Khan'
  },
  {
    imo: 'IMO 9610234',
    name: 'MV Bay Express',
    type: 'Bulk Carrier',
    flag: 'Marshall Islands',
    status: 'Underway',
    region: 'Central Arabian Sea',
    sogKts: 12.8,
    headingDeg: 270,
    engineTempC: 78,
    fuelBurnMtDay: 22.4,
    riskLevel: 'Warning',
    captainName: 'Capt. S. Fernando'
  },
  {
    imo: 'IMO 9901235',
    name: 'MT Malacca Pioneer',
    type: 'LNG Carrier',
    flag: 'Singapore',
    status: 'Underway',
    region: 'Strait of Malacca',
    sogKts: 18.0,
    headingDeg: 125,
    engineTempC: 76,
    fuelBurnMtDay: 41.2,
    riskLevel: 'Low',
    captainName: 'Capt. M. Tan'
  },
  {
    imo: 'IMO 9523109',
    name: 'MV Bengal Titan',
    type: 'Container',
    flag: 'India',
    status: 'Anchored',
    region: 'Chittagong Outer Roads',
    sogKts: 0.1,
    headingDeg: 45,
    engineTempC: 62,
    fuelBurnMtDay: 4.5,
    riskLevel: 'Warning',
    captainName: 'Capt. V. Mukherjee'
  },
  {
    imo: 'IMO 9410982',
    name: 'MT Arabian Sun',
    type: 'Tanker',
    flag: 'Bahamas',
    status: 'Maintenance',
    region: 'Drydock Karachi',
    sogKts: 0.0,
    headingDeg: 0,
    engineTempC: 25,
    fuelBurnMtDay: 1.2,
    riskLevel: 'Low',
    captainName: 'Capt. H. Al-Mansoor'
  }
];

export const GlobalFleetInsightView: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVessel, setSelectedVessel] = useState<FleetVessel | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredVessels = FLEET_VESSELS_DATA.filter((v) => {
    if (statusFilter !== 'ALL' && v.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && v.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.imo.toLowerCase().includes(q) ||
        v.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
              <Compass className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>GLOBAL FLEET TELEMETRY & VESSEL HEALTH ANALYTICS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Ship className="w-6 h-6 text-emerald-400" />
              <span>Global Fleet Telemetry Insights</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time AIS speed over ground, engine health monitoring, fuel consumption rates, and storm advisory exposure.
            </p>
          </div>
        </div>
      </div>

      {/* KPI METRICS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">TOTAL ACTIVE FLEET</span>
          <strong className="text-2xl font-black text-white block">42 Vessels</strong>
          <span className="text-[10px] text-emerald-400 block">100% AIS Satellite Tracking</span>
        </div>

        <div className="p-4 bg-slate-900 border border-rose-500/40 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-rose-300 uppercase font-bold block">STORM RISK EXPOSURE</span>
          <strong className="text-2xl font-black text-rose-400 block">6 Vessels</strong>
          <span className="text-[10px] text-rose-300 block">Under Tier 2/3 Advisory</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">AVG ENGINE HEALTH SCORE</span>
          <strong className="text-2xl font-black text-cyan-300 block">94.8%</strong>
          <span className="text-[10px] text-slate-400 block">Thermal telemetry nominal</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">FLEET FUEL EFFICIENCY</span>
          <strong className="text-2xl font-black text-amber-300 block">21.6 MT/day</strong>
          <span className="text-[10px] text-emerald-400 block">-4.2% eco-speed savings</span>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase">
            <Filter className="w-4 h-4" />
            <span>Fleet Search & Filter Matrix</span>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vessel name, IMO, region..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-xl px-3 py-1 focus:outline-none"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="Underway">UNDERWAY</option>
              <option value="Storm Risk">STORM RISK EXPOSURE</option>
              <option value="Anchored">ANCHORED</option>
              <option value="Maintenance">MAINTENANCE</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Vessel Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-xl px-3 py-1 focus:outline-none"
            >
              <option value="ALL">ALL TYPES</option>
              <option value="Container">CONTAINER SHIP</option>
              <option value="Tanker">CRUDE / CHEMICAL TANKER</option>
              <option value="Bulk Carrier">DRY BULK CARRIER</option>
              <option value="LNG Carrier">LNG CARRIER</option>
            </select>
          </div>
        </div>
      </div>

      {/* FLEET VESSEL CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
        {filteredVessels.map((vessel) => {
          const isCritical = vessel.riskLevel === 'Critical';
          const isWarning = vessel.riskLevel === 'Warning';

          return (
            <div
              key={vessel.imo}
              onClick={() => setSelectedVessel(vessel)}
              className={`p-4 rounded-2xl border space-y-3 bg-slate-950 cursor-pointer transition-all hover:scale-[1.01] ${
                isCritical
                  ? 'border-rose-500/60 shadow-rose-950/30 border-l-4 border-l-rose-500'
                  : isWarning
                  ? 'border-amber-500/50 shadow-amber-950/30 border-l-4 border-l-amber-500'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-[10px] text-slate-400 font-bold">{vessel.imo}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    vessel.status === 'Storm Risk'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      : vessel.status === 'Underway'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {vessel.status}
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-white flex items-center space-x-2">
                  <Ship className="w-4 h-4 text-emerald-400" />
                  <span>{vessel.name}</span>
                </h4>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {vessel.type} • Flag: <strong className="text-slate-200">{vessel.flag}</strong>
                </div>
              </div>

              <div className="text-xs space-y-1 text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Region:</span>
                  <span className="text-slate-200 font-bold">{vessel.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Speed Over Ground:</span>
                  <span className="text-cyan-300 font-bold">{vessel.sogKts} kts ({vessel.headingDeg}°)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Engine Temp:</span>
                  <span className={vessel.engineTempC > 85 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                    {vessel.engineTempC}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fuel Consumption:</span>
                  <span className="text-amber-300 font-bold">{vessel.fuelBurnMtDay} MT/day</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Captain: <strong className="text-slate-200">{vessel.captainName}</strong></span>
                <span className="text-emerald-400 font-bold hover:underline">Inspect Telemetry →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* VESSEL INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedVessel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl font-mono text-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <Ship className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-black text-white">{selectedVessel.name}</span>
                </div>
                <button
                  onClick={() => setSelectedVessel(null)}
                  className="text-slate-400 hover:text-white font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">IMO Identification:</span>
                  <strong className="text-white">{selectedVessel.imo}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vessel Class:</span>
                  <strong className="text-slate-200">{selectedVessel.type}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Flag State:</span>
                  <strong className="text-slate-200">{selectedVessel.flag}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Region:</span>
                  <strong className="text-cyan-300">{selectedVessel.region}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Speed / Heading:</span>
                  <strong className="text-cyan-300">{selectedVessel.sogKts} kts / {selectedVessel.headingDeg}°</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Main Engine Exhaust Temp:</span>
                  <strong className={selectedVessel.engineTempC > 85 ? 'text-amber-400' : 'text-emerald-400'}>
                    {selectedVessel.engineTempC}°C
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fuel Consumption Rate:</span>
                  <strong className="text-amber-300">{selectedVessel.fuelBurnMtDay} MT / Day</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Master in Command:</span>
                  <strong className="text-slate-200">{selectedVessel.captainName}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    showToast(`Bridge alert pinged to ${selectedVessel.name}`);
                    setSelectedVessel(null);
                  }}
                  className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs w-full"
                >
                  DISPATCH DIRECT SATELLITE BRIDGE MESSAGE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
