import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Truck,
  Box,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Anchor,
  Ship,
  Compass,
  Zap,
  RefreshCw,
  FileText,
  Search,
  Filter,
  Layers,
  Thermometer,
  ShieldCheck,
  MapPin,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface ContainerShipment {
  id: string;
  containerId: string;
  cargoType: 'Reefer (Cold Chain)' | 'Hazmat Chemical' | 'Dry Bulk Freight' | 'High-Value Electronics';
  vessel: string;
  origin: string;
  destination: string;
  dwellDays: number;
  reeferTempC?: number;
  status: 'In Transit' | 'Port Customs Hold' | 'Bypassing Delay' | 'Clear for Discharge';
  riskScore: number;
}

const FREIGHT_INDEX_DATA = [
  { month: 'Jan', Transpacific: 2100, AsiaEurope: 1850, IndianOcean: 1400 },
  { month: 'Feb', Transpacific: 2300, AsiaEurope: 1950, IndianOcean: 1450 },
  { month: 'Mar', Transpacific: 2550, AsiaEurope: 2200, IndianOcean: 1600 },
  { month: 'Apr', Transpacific: 2900, AsiaEurope: 2600, IndianOcean: 1850 },
  { month: 'May', Transpacific: 3400, AsiaEurope: 3100, IndianOcean: 2150 },
  { month: 'Jun', Transpacific: 3850, AsiaEurope: 3450, IndianOcean: 2400 },
  { month: 'Jul', Transpacific: 4200, AsiaEurope: 3800, IndianOcean: 2700 }
];

const INITIAL_SHIPMENTS: ContainerShipment[] = [
  {
    id: 'SHP-8801',
    containerId: 'MSKU-918234-0',
    cargoType: 'Reefer (Cold Chain)',
    vessel: 'MV Ocean Sovereign',
    origin: 'Chittagong, BD',
    destination: 'Rotterdam, NL',
    dwellDays: 4.2,
    reeferTempC: -18.5,
    status: 'In Transit',
    riskScore: 28
  },
  {
    id: 'SHP-8802',
    containerId: 'CMAU-772109-4',
    cargoType: 'Hazmat Chemical',
    vessel: 'MT Indus Trader',
    origin: 'Colombo, LK',
    destination: 'Hamburg, DE',
    dwellDays: 7.8,
    status: 'Port Customs Hold',
    riskScore: 84
  },
  {
    id: 'SHP-8803',
    containerId: 'HLXU-409123-8',
    cargoType: 'High-Value Electronics',
    vessel: 'MV Bay Express',
    origin: 'Nhava Sheva, IN',
    destination: 'Singapore, SG',
    dwellDays: 2.1,
    status: 'Clear for Discharge',
    riskScore: 12
  },
  {
    id: 'SHP-8804',
    containerId: 'COSU-330192-1',
    cargoType: 'Dry Bulk Freight',
    vessel: 'MT Malacca Pioneer',
    origin: 'Karachi, PK',
    destination: 'Jebel Ali, UAE',
    dwellDays: 5.5,
    status: 'Bypassing Delay',
    riskScore: 62
  }
];

export const SmartSupplyChainDashboardView: React.FC = () => {
  const [shipments, setShipments] = useState<ContainerShipment[]>(INITIAL_SHIPMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRerouteShipment = (id: string) => {
    setShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Bypassing Delay', riskScore: 20 } : s))
    );
    showToast(`Shipment ${id} automatically re-routed to express transshipment hub.`);
  };

  const handleRunAiOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      showToast('AI Supply Chain Optimization complete: Freight routes re-indexed.');
    }, 1500);
  };

  const filteredShipments = shipments.filter((s) => {
    if (filterType !== 'ALL' && s.cargoType !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.containerId.toLowerCase().includes(q) ||
        s.vessel.toLowerCase().includes(q) ||
        s.origin.toLowerCase().includes(q) ||
        s.destination.toLowerCase().includes(q)
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
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-amber-500 text-amber-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-amber-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Truck className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>MARITIME FREIGHT TELEMETRY & LOGISTICS AI</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Box className="w-6 h-6 text-amber-400" />
              <span>Smart Maritime Supply Chain Dashboard</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time TEU container tracking, cold-chain reefer sensor monitoring, Shanghai Freight Index (SCFI) forecasting, and automated transshipment bypass dispatch.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunAiOptimization}
              disabled={isOptimizing}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-black flex items-center space-x-2 transition-all shadow-lg ${
                isOptimizing
                  ? 'bg-slate-800 text-slate-400 border border-slate-700'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/40'
              }`}
            >
              <Zap className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
              <span>{isOptimizing ? 'OPTIMIZING FREIGHT...' : 'RUN AI DISPATCH OPTIMIZER'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI METRICS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">ACTIVE TEU FREIGHT IN TRANSIT</span>
          <strong className="text-2xl font-black text-white block">142,850 TEU</strong>
          <span className="text-[10px] text-emerald-400 block">+6.4% MoM volume growth</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">AVG PORT DWELL TIME</span>
          <strong className="text-2xl font-black text-amber-300 block">3.8 Days</strong>
          <span className="text-[10px] text-amber-400 block">-1.2 days via AI re-routing</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">REEFER COLD-CHAIN HEALTH</span>
          <strong className="text-2xl font-black text-cyan-300 block">99.4%</strong>
          <span className="text-[10px] text-cyan-400 block">-18.5°C nominal target set</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">SCFI FREIGHT RATE INDEX</span>
          <strong className="text-2xl font-black text-emerald-400 block">$3,850 / TEU</strong>
          <span className="text-[10px] text-emerald-400 block">+4.2% weekly spot increase</span>
        </div>
      </div>

      {/* FREIGHT INDEX CHART & LOGISTICS CORRIDOR METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
        {/* CHART SECTION (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Global Freight Rate Index Trends (USD per 40ft TEU)</span>
              </h4>
              <p className="text-[11px] text-slate-400">Historical & projected spot rates across major global ocean lanes</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FREIGHT_INDEX_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#f8fafc' }}
                  labelStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="Transpacific" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} name="Transpacific Lane" />
                <Area type="monotone" dataKey="AsiaEurope" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} name="Asia-Europe Lane" />
                <Area type="monotone" dataKey="IndianOcean" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Indian Ocean Lane" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTLE-NECK ANALYSIS SUMMARY (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase border-b border-slate-800 pb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Active Port Delay Heatmap Summary</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 border border-rose-500/40 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-white font-bold">
                  <span>Chittagong Outer Roads</span>
                  <span className="text-rose-400 font-mono">Severe (8.5D Dwell)</span>
                </div>
                <p className="text-[10px] text-slate-400">42 vessels queued due to storm surge tide. Demurrage $2,800/day.</p>
              </div>

              <div className="p-3 bg-slate-950 border border-amber-500/40 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-white font-bold">
                  <span>Colombo Transshipment Hub</span>
                  <span className="text-amber-400 font-mono">Moderate (5.8D Dwell)</span>
                </div>
                <p className="text-[10px] text-slate-400">Feeder connection backlogs under monsoonal swell delays.</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-white font-bold">
                  <span>Nhava Sheva (JNPT)</span>
                  <span className="text-emerald-400 font-mono">Low (2.5D Dwell)</span>
                </div>
                <p className="text-[10px] text-slate-400">Automated gate processing operating at 96% throughput speed.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('Manifest PDF generated & downloaded')}
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-bold text-xs font-mono transition-all flex items-center justify-center space-x-2"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>EXPORT SUPPLY CHAIN AUDIT REPORT</span>
          </button>
        </div>
      </div>

      {/* CONTAINER SHIPMENT INVENTORY LIST */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase">
            <Layers className="w-4 h-4" />
            <span>High-Priority Container Inventory Telemetry ({filteredShipments.length} Items)</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search container ID, vessel, route..."
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-amber-500 placeholder:text-slate-600 w-48"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="ALL">ALL CARGO TYPES</option>
              <option value="Reefer (Cold Chain)">REEFER COLD CHAIN</option>
              <option value="Hazmat Chemical">HAZMAT CHEMICAL</option>
              <option value="Dry Bulk Freight">DRY BULK FREIGHT</option>
              <option value="High-Value Electronics">ELECTRONICS</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredShipments.map((ship) => {
            const isHighRisk = ship.riskScore > 70;

            return (
              <div
                key={ship.id}
                className={`p-4 rounded-2xl border space-y-3 bg-slate-950 transition-all ${
                  isHighRisk
                    ? 'border-rose-500/60 text-rose-100 shadow-rose-950/20 border-l-4 border-l-rose-500'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{ship.containerId}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700 text-amber-300">
                      {ship.cargoType}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      ship.status === 'Port Customs Hold'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                        : ship.status === 'Bypassing Delay'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    }`}
                  >
                    {ship.status}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Vessel:</span>
                    <span className="text-white font-bold">{ship.vessel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Route Corridor:</span>
                    <span className="text-cyan-300 font-bold">{ship.origin} → {ship.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Port Dwell Accumulation:</span>
                    <span className="text-amber-300 font-bold">{ship.dwellDays} Days</span>
                  </div>
                  {ship.reeferTempC !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reefer Sensor Temp:</span>
                      <span className="text-emerald-400 font-bold">{ship.reeferTempC}°C (Target -18°C)</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                  <span className="text-[10px] text-slate-500">ID: {ship.id}</span>
                  {ship.status === 'Port Customs Hold' && (
                    <button
                      onClick={() => handleRerouteShipment(ship.id)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center space-x-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>DISPATCH AI BYPASS REROUTE</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
