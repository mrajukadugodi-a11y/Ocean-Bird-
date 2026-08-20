import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import {
  BarChart3,
  Globe,
  Ship,
  Fuel,
  ShieldCheck,
  AlertTriangle,
  Download,
  Filter,
  Activity,
  Layers,
  Award,
  Box,
  TrendingUp,
  Cpu,
  Search,
  CheckCircle2,
  Anchor
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

// Mock Fleet Distribution Data
const FLEET_REGIONAL_DATA = [
  { region: 'Bay of Bengal', vessels: 42, active: 38, atAnchor: 4, fuelAvg: 28.5 },
  { region: 'Arabian Sea', vessels: 35, active: 30, atAnchor: 5, fuelAvg: 31.2 },
  { region: 'Malacca Strait', vessels: 58, active: 52, atAnchor: 6, fuelAvg: 34.0 },
  { region: 'Indian Ocean Deep', vessels: 29, active: 27, atAnchor: 2, fuelAvg: 29.8 },
  { region: 'Red Sea & Suez', vessels: 21, active: 18, atAnchor: 3, fuelAvg: 32.1 },
  { region: 'South China Sea', vessels: 48, active: 44, atAnchor: 4, fuelAvg: 33.5 }
];

const VESSEL_TYPE_PIE = [
  { name: 'ULCS Containers', value: 78, color: '#38bdf8' },
  { name: 'Oil & Product Tankers', value: 62, color: '#f59e0b' },
  { name: 'LNG / LPG Carriers', value: 34, color: '#10b981' },
  { name: 'Dry Bulk Carriers', value: 45, color: '#a855f7' },
  { name: 'Feeder & Tugboats', value: 14, color: '#f43f5e' }
];

const SPEED_VS_FUEL_CURVE = [
  { speed: 10, knots: '10 kts', fuelTons: 12.2, carbonIndex: 82, optimalSpeed: 12 },
  { speed: 12, knots: '12 kts (Eco)', fuelTons: 16.8, carbonIndex: 88, optimalSpeed: 12 },
  { speed: 14, knots: '14 kts', fuelTons: 24.5, carbonIndex: 76, optimalSpeed: 12 },
  { speed: 16, knots: '16 kts', fuelTons: 36.1, carbonIndex: 64, optimalSpeed: 12 },
  { speed: 18, knots: '18 kts (Max)', fuelTons: 52.4, carbonIndex: 51, optimalSpeed: 12 },
  { speed: 20, knots: '20 kts (Sprint)', fuelTons: 74.0, carbonIndex: 38, optimalSpeed: 12 }
];

const IMO_CII_RATINGS = [
  { rating: 'Class A (Superior)', count: 85, color: '#10b981' },
  { rating: 'Class B (Good)', count: 92, color: '#06b6d4' },
  { rating: 'Class C (Moderate)', count: 42, color: '#f59e0b' },
  { rating: 'Class D (Warning)', count: 11, color: '#f97316' },
  { rating: 'Class E (Critical)', count: 3, color: '#f43f5e' }
];

interface FleetVessel {
  id: string;
  name: string;
  type: string;
  region: string;
  speed: number;
  fuelRate: number;
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  engineHealth: number;
  status: 'Underway' | 'At Anchor' | 'Moored';
}

const FLEET_VESSEL_LIST: FleetVessel[] = [
  { id: 'V-101', name: 'MV DESH SHANTI', type: 'Oil Tanker', region: 'Arabian Sea', speed: 14.2, fuelRate: 26.4, ciiRating: 'A', engineHealth: 98, status: 'Underway' },
  { id: 'V-102', name: 'EVER GIVEN II', type: 'ULCS Container', region: 'Bay of Bengal', speed: 18.5, fuelRate: 51.2, ciiRating: 'B', engineHealth: 94, status: 'Underway' },
  { id: 'V-103', name: 'OCEAN BIRD FLAGSHIP', type: 'LNG Carrier', region: 'Malacca Strait', speed: 16.0, fuelRate: 35.8, ciiRating: 'A', engineHealth: 99, status: 'Underway' },
  { id: 'V-104', name: 'JINDAL EXPRESS', type: 'Dry Bulk Carrier', region: 'Indian Ocean Deep', speed: 12.1, fuelRate: 17.2, ciiRating: 'A', engineHealth: 91, status: 'Underway' },
  { id: 'V-105', name: 'MAERSK DHAKA', type: 'ULCS Container', region: 'Bay of Bengal', speed: 0.0, fuelRate: 3.2, ciiRating: 'C', engineHealth: 88, status: 'At Anchor' },
  { id: 'V-106', name: 'SINGAPORE TUG 4', type: 'Feeder & Tugboats', region: 'Malacca Strait', speed: 8.5, fuelRate: 8.1, ciiRating: 'B', engineHealth: 96, status: 'Underway' }
];

export const GlobalFleetChartView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    hapticEngine.trigger('click');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredVessels = FLEET_VESSEL_LIST.filter((v) => {
    const matchesRegion = selectedRegion === 'ALL' || v.region === selectedRegion;
    const matchesSearch = v.name.toLowerCase().includes(searchFilter.toLowerCase()) || v.type.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleExportCsv = () => {
    const headers = 'Vessel ID,Name,Type,Region,Speed (kts),Fuel Rate (T/day),CII Rating,Engine Health (%)\n';
    const rows = filteredVessels.map(v => `"${v.id}","${v.name}","${v.type}","${v.region}","${v.speed}","${v.fuelRate}","${v.ciiRating}","${v.engineHealth}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Global_Fleet_Analytics_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
    showToast(`Exported ${filteredVessels.length} vessel records to CSV!`);
  };

  return (
    <div className="space-y-6 font-mono animate-fadeIn pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-5 h-5 animate-pulse" />
              <span>IMO SOLAS & MEPC Compliant Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Global Fleet Chart & Telemetry Dashboard
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Real-time interactive distribution charts, vessel class breakdowns, fuel efficiency power-law curves, and IMO Carbon Intensity Indicator (CII) ratings.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCsv}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-xl transition-all"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>EXPORT FLEET CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Monitored Fleet</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-cyan-300">233 Vessels</span>
            <span className="text-[10px] text-emerald-400 font-bold">+12 AIS Live</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Sea Underway</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-emerald-400">209 Ships</span>
            <span className="text-[10px] text-slate-400 font-bold">89.7% Operational</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Fleet Speed</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-amber-300">14.8 Knots</span>
            <span className="text-[10px] text-cyan-400 font-bold">Eco Speed 12kt</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">IMO CII Class A/B Share</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-teal-300">75.9%</span>
            <span className="text-[10px] text-emerald-400 font-bold">Compliant</span>
          </div>
        </div>
      </div>

      {/* CHART ROW 1: REGIONAL DISTRIBUTION & VESSEL TYPES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART: REGIONAL VESSEL DISTRIBUTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
              <Globe className="w-4 h-4" />
              <span>Fleet Active Vessels by Ocean Region</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
              Live AIS
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FLEET_REGIONAL_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="region" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar dataKey="active" name="Active Underway" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="atAnchor" name="At Anchor/Berth" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART: VESSEL CLASS BREAKDOWN */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase">
              <Ship className="w-4 h-4" />
              <span>Vessel Type & Category Distribution</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
              233 Total
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={VESSEL_TYPE_PIE}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {VESSEL_TYPE_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHART ROW 2: SPEED VS FUEL CUBIC POWER LAW & IMO CII RATING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LINE CHART: SPEED VS FUEL CONSUMPTION (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase">
              <Fuel className="w-4 h-4" />
              <span>Vessel Speed vs Daily Fuel Burn (Cubic Law)</span>
            </div>
            <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60">
              Eco Optimum: 12 Knots
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPEED_VS_FUEL_CURVE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="knots" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="fuelTons" name="Fuel Burn (Metric Tons / Day)" stroke="#10b981" fill="#10b98122" strokeWidth={3} />
                <Area type="monotone" dataKey="carbonIndex" name="IMO CII Efficiency Index" stroke="#38bdf8" fill="#38bdf811" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IMO CII RATINGS BAR LIST (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 uppercase border-b border-slate-800 pb-3">
              <Award className="w-4 h-4" />
              <span>IMO CII Carbon Rating</span>
            </div>

            <div className="space-y-3 mt-4">
              {IMO_CII_RATINGS.map((r, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-300">{r.rating}</span>
                    <span style={{ color: r.color }}>{r.count} Ships</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(r.count / 233) * 100}%`, backgroundColor: r.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400">
            Ratings recalculated monthly under IMO Marine Environment Protection Committee (MEPC.328(76)).
          </div>
        </div>
      </div>

      {/* FILTERABLE VESSEL TELEMETRY LIST TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
            <Activity className="w-4 h-4" />
            <span>Monitored Vessel Telemetry List</span>
          </div>

          {/* Region Filter & Search */}
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search vessel or type..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="ALL">All Regions</option>
              <option value="Bay of Bengal">Bay of Bengal</option>
              <option value="Arabian Sea">Arabian Sea</option>
              <option value="Malacca Strait">Malacca Strait</option>
              <option value="Indian Ocean Deep">Indian Ocean Deep</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800 font-bold">
              <tr>
                <th className="p-3">ID / Vessel</th>
                <th className="p-3">Type</th>
                <th className="p-3">Region</th>
                <th className="p-3">Speed</th>
                <th className="p-3">Fuel Rate</th>
                <th className="p-3">CII Rating</th>
                <th className="p-3">Engine Health</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredVessels.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-white">
                    <div>{v.name}</div>
                    <div className="text-[10px] text-slate-500">{v.id}</div>
                  </td>
                  <td className="p-3 text-slate-300">{v.type}</td>
                  <td className="p-3 text-cyan-300">{v.region}</td>
                  <td className="p-3 text-amber-300 font-bold">{v.speed} kts</td>
                  <td className="p-3 text-emerald-300">{v.fuelRate} T/day</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      v.ciiRating === 'A' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-cyan-500/20 text-cyan-300'
                    }`}>
                      Class {v.ciiRating}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-teal-300">{v.engineHealth}%</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      v.status === 'Underway' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
