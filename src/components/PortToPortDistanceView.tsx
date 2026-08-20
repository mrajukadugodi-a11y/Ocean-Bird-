import React, { useState } from 'react';
import {
  Anchor,
  Navigation,
  Clock,
  Fuel,
  Compass,
  ArrowRight,
  BarChart2,
  Table,
  MapPin,
  Ship,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

export interface PortLocation {
  id: string;
  name: string;
  country: string;
  code: string;
  coordinates: string;
}

export const MAJOR_PORTS: PortLocation[] = [
  { id: 'JNPT', name: 'JNPT (Nhava Sheva / Mumbai)', country: 'India 🇮🇳', code: 'INNSA', coordinates: "18° 57' N, 072° 56' E" },
  { id: 'CMB', name: 'Colombo Transshipment Hub', country: 'Sri Lanka 🇱🇰', code: 'LKCMB', coordinates: "06° 56' N, 079° 50' E" },
  { id: 'CGP', name: 'Chittagong Outer Anchorage', country: 'Bangladesh 🇧🇩', code: 'BDCGP', coordinates: "22° 18' N, 091° 48' E" },
  { id: 'SIN', name: 'Singapore Port (Tuas/Pasir Panjang)', country: 'Singapore 🇸🇬', code: 'SGSIN', coordinates: "01° 16' N, 103° 50' E" },
  { id: 'JEA', name: 'Jebel Ali (Dubai)', country: 'UAE 🇦🇪', code: 'AEJEA', coordinates: "24° 59' N, 055° 03' E" },
  { id: 'FUJ', name: 'Fujairah Bunkering Anchorage', country: 'UAE 🇦🇪', code: 'AEFUJ', coordinates: "25° 08' N, 056° 21' E" },
  { id: 'SHA', name: 'Shanghai Port (Yangshan)', country: 'China 🇨🇳', code: 'CNSHA', coordinates: "30° 37' N, 122° 03' E" },
  { id: 'RTM', name: 'Rotterdam Europort', country: 'Netherlands 🇳🇱', code: 'NLRTM', coordinates: "51° 57' N, 004° 08' E" }
];

// Distance matrix in Nautical Miles (NM)
const PORT_DISTANCES_NM: Record<string, Record<string, number>> = {
  JNPT: { JNPT: 0, CMB: 890, CGP: 1840, SIN: 2450, JEA: 1160, FUJ: 1040, SHA: 4320, RTM: 6280 },
  CMB: { JNPT: 890, CMB: 0, CGP: 1250, SIN: 1580, JEA: 1810, FUJ: 1680, SHA: 3450, RTM: 6690 },
  CGP: { JNPT: 1840, CMB: 1250, CGP: 0, SIN: 1560, JEA: 2780, FUJ: 2650, SHA: 3180, RTM: 7620 },
  SIN: { JNPT: 2450, CMB: 1580, CGP: 1560, SIN: 0, JEA: 3340, FUJ: 3210, SHA: 2250, RTM: 8250 },
  JEA: { JNPT: 1160, CMB: 1810, CGP: 2780, SIN: 3340, JEA: 0, FUJ: 150, SHA: 5210, RTM: 6150 },
  FUJ: { JNPT: 1040, CMB: 1680, CGP: 2650, SIN: 3210, JEA: 150, FUJ: 0, SHA: 5080, RTM: 6020 },
  SHA: { JNPT: 4320, CMB: 3450, CGP: 3180, SIN: 2250, JEA: 5210, FUJ: 5080, SHA: 0, RTM: 10520 },
  RTM: { JNPT: 6280, CMB: 6690, CGP: 7620, SIN: 8250, JEA: 6150, FUJ: 6020, SHA: 10520, RTM: 0 }
};

export const PortToPortDistanceView: React.FC = () => {
  const [originPortId, setOriginPortId] = useState<string>('JNPT');
  const [destPortId, setDestPortId] = useState<string>('SIN');
  const [vesselSpeedKts, setVesselSpeedKts] = useState<number>(14.5);

  const originPort = MAJOR_PORTS.find((p) => p.id === originPortId) || MAJOR_PORTS[0];
  const destPort = MAJOR_PORTS.find((p) => p.id === destPortId) || MAJOR_PORTS[3];

  const distanceNm = PORT_DISTANCES_NM[originPortId]?.[destPortId] || 0;
  const transitHours = distanceNm > 0 ? distanceNm / vesselSpeedKts : 0;
  const transitDays = transitHours / 24;

  // Fuel estimate assuming ~35 Metric Tons VLSFO per day at 14.5 kts
  const fuelDailyMt = 22 + Math.pow(vesselSpeedKts / 14.5, 3) * 13;
  const totalFuelMt = Math.round(fuelDailyMt * transitDays);

  // Chart Data: Distances from selected Origin to all other ports
  const distanceChartData = MAJOR_PORTS.filter((p) => p.id !== originPortId).map((port) => ({
    portName: port.code,
    fullName: port.name,
    distanceNm: PORT_DISTANCES_NM[originPortId]?.[port.id] || 0,
    isSelectedDest: port.id === destPortId
  }));

  // Chart Data: Speed vs ETA curve for chosen pair
  const speedEtaChartData = [10, 12, 14, 16, 18, 20, 22].map((spd) => {
    const hrs = distanceNm > 0 ? distanceNm / spd : 0;
    const days = (hrs / 24).toFixed(1);
    return {
      speedKts: `${spd} Kts`,
      transitDays: parseFloat(days),
      fuelMt: Math.round((22 + Math.pow(spd / 14.5, 3) * 13) * (hrs / 24))
    };
  });

  return (
    <div id="port-to-port-distance-view" className="space-y-6 font-mono">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <BarChart2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>NAUTICAL MILES DISTANCE MATRIX & VLSFO FUEL COMPUTER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Anchor className="w-6 h-6 text-cyan-400" />
              <span>Port-to-Port Nautical Distance & ETA Chart</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Calculate exact nautical mile (NM) passage distances between major regional and global hub ports. Estimate voyage transit duration, fuel consumption, and speed efficiency curves.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">PASSAGE DISTANCE</span>
              <strong className="text-cyan-400 text-sm">{distanceNm.toLocaleString()} NM</strong>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block uppercase">ESTIMATED TRANSIT</span>
              <strong className="text-amber-400 text-sm">{transitDays.toFixed(1)} DAYS</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Port Selection Controls Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Origin Port Selector */}
          <div>
            <label className="text-xs text-slate-400 block mb-2 font-bold uppercase flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>ORIGIN PORT</span>
            </label>
            <select
              value={originPortId}
              onChange={(e) => setOriginPortId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-bold"
            >
              {MAJOR_PORTS.map((port) => (
                <option key={port.id} value={port.id}>
                  {port.name} ({port.code})
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-500 block mt-1">{originPort.coordinates}</span>
          </div>

          {/* Destination Port Selector */}
          <div>
            <label className="text-xs text-slate-400 block mb-2 font-bold uppercase flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>DESTINATION PORT</span>
            </label>
            <select
              value={destPortId}
              onChange={(e) => setDestPortId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-bold"
            >
              {MAJOR_PORTS.map((port) => (
                <option key={port.id} value={port.id} disabled={port.id === originPortId}>
                  {port.name} ({port.code})
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-500 block mt-1">{destPort.coordinates}</span>
          </div>

          {/* Vessel Speed Slider */}
          <div>
            <div className="flex justify-between text-xs mb-2 font-bold">
              <label className="text-slate-400 flex items-center space-x-1.5">
                <Ship className="w-4 h-4 text-amber-400" />
                <span>CRUISE SPEED (SOG)</span>
              </label>
              <span className="text-amber-300 font-extrabold">{vesselSpeedKts} KNOTS</span>
            </div>
            <input
              type="range"
              min={10}
              max={22}
              step={0.5}
              value={vesselSpeedKts}
              onChange={(e) => setVesselSpeedKts(parseFloat(e.target.value))}
              className="w-full accent-amber-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block mt-1">Eco-Speed range: 12.0 - 16.5 Kts</span>
          </div>
        </div>

        {/* Calculation Result Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">NAUTICAL DISTANCE</span>
            <strong className="text-cyan-300 text-lg block">{distanceNm.toLocaleString()} NM</strong>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 block uppercase">VOYAGE DURATION</span>
            <strong className="text-amber-300 text-lg block">{transitDays.toFixed(1)} Days ({Math.round(transitHours)} Hours)</strong>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 block uppercase">ESTIMATED VLSFO BUNKERS</span>
            <strong className="text-rose-300 text-lg block">~{totalFuelMt} MT</strong>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 block uppercase">DAILY FUEL BURN</span>
            <strong className="text-emerald-300 text-lg block">~{Math.round(fuelDailyMt)} MT / Day</strong>
          </div>
        </div>
      </div>

      {/* Visual Recharts Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Distance from Selected Origin to All Ports */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Nautical Miles from {originPort.code}</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">PORT DISTANCE COMPARISON</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distanceChartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="portName" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                  formatter={(val: number) => [`${val.toLocaleString()} NM`, 'Distance']}
                />
                <Bar dataKey="distanceNm" radius={[6, 6, 0, 0]}>
                  {distanceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isSelectedDest ? '#f43f5e' : '#06b6d4'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Speed vs Voyage Duration & Fuel Curve */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Speed vs Passage Days ({originPort.code} ➔ {destPort.code})</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">SPEED OPTIMIZATION</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedEtaChartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="speedKts" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                  formatter={(val: number) => [`${val} Days`, 'Transit Time']}
                />
                <Line type="monotone" dataKey="transitDays" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Port-to-Port Matrix Distance Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
            <Table className="w-4 h-4 text-cyan-400" />
            <span>Nautical Miles (NM) Distance Matrix Grid</span>
          </h3>
          <span className="text-xs text-cyan-400">8 KEY MARITIME HUBS</span>
        </div>

        <table className="w-full text-xs text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
              <th className="p-3">PORT</th>
              {MAJOR_PORTS.map((p) => (
                <th key={p.id} className="p-3 text-center">{p.code}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MAJOR_PORTS.map((rowPort) => (
              <tr key={rowPort.id} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                <td className="p-3 font-bold text-white bg-slate-950/60">{rowPort.code}</td>
                {MAJOR_PORTS.map((colPort) => {
                  const dist = PORT_DISTANCES_NM[rowPort.id]?.[colPort.id] || 0;
                  const isHighlighted = rowPort.id === originPortId && colPort.id === destPortId;

                  return (
                    <td
                      key={colPort.id}
                      className={`p-3 text-center ${
                        dist === 0
                          ? 'text-slate-600 font-bold'
                          : isHighlighted
                          ? 'bg-rose-500/20 text-rose-300 font-extrabold border border-rose-500'
                          : 'text-slate-300'
                      }`}
                    >
                      {dist === 0 ? '-' : dist.toLocaleString()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
