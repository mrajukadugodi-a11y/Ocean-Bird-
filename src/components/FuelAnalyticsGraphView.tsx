import React, { useState } from 'react';
import {
  Fuel,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Activity,
  Award,
  Zap,
  Leaf,
  Sliders,
  BarChart3,
  Globe2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

const SPEED_EFFICIENCY_DATA = [
  { speedKts: 10, fuelMtPerDay: 12.5, ecoRating: 'A+', co2TonsPerDay: 39.0 },
  { speedKts: 12, fuelMtPerDay: 18.0, ecoRating: 'A', co2TonsPerDay: 56.1 },
  { speedKts: 14, fuelMtPerDay: 26.5, ecoRating: 'B', co2TonsPerDay: 82.6 },
  { speedKts: 16, fuelMtPerDay: 38.0, ecoRating: 'C', co2TonsPerDay: 118.5 },
  { speedKts: 18, fuelMtPerDay: 54.0, ecoRating: 'D', co2TonsPerDay: 168.4 },
  { speedKts: 20, fuelMtPerDay: 75.0, ecoRating: 'E', co2TonsPerDay: 233.9 }
];

const BUNKERING_HUB_PRICES = [
  { hub: 'Singapore', vlsfo: 620, mgo: 780, hsfo: 450 },
  { hub: 'Fujairah', vlsfo: 605, mgo: 795, hsfo: 440 },
  { hub: 'Colombo', vlsfo: 645, mgo: 820, hsfo: 480 },
  { hub: 'Mumbai', vlsfo: 638, mgo: 810, hsfo: 470 },
  { hub: 'Chittagong', vlsfo: 660, mgo: 840, hsfo: 495 }
];

const HISTORICAL_PRICE_TREND = [
  { month: 'Mar', vlsfoAvg: 580, mgoAvg: 740 },
  { month: 'Apr', vlsfoAvg: 595, mgoAvg: 760 },
  { month: 'May', vlsfoAvg: 610, mgoAvg: 770 },
  { month: 'Jun', vlsfoAvg: 600, mgoAvg: 765 },
  { month: 'Jul', vlsfoAvg: 625, mgoAvg: 790 }
];

export const FuelAnalyticsGraphView: React.FC = () => {
  const [selectedSpeed, setSelectedSpeed] = useState<number>(14); // Kts
  const [bunkerHub, setBunkerHub] = useState<string>('Singapore');

  // Calculate annual metrics based on selected speed
  const currentFuelPerDay = 26.5; // at 14 Kts
  const targetData = SPEED_EFFICIENCY_DATA.find((d) => d.speedKts === selectedSpeed) || SPEED_EFFICIENCY_DATA[2];
  const dailyFuelSavingsMt = currentFuelPerDay - targetData.fuelMtPerDay;
  const annualDollarSavings = Math.round(dailyFuelSavingsMt * 300 * 620); // 300 sea days @ $620/MT
  const annualCo2SavedTons = Math.round(dailyFuelSavingsMt * 300 * 3.114);

  return (
    <div id="fuel-analytics-graph-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>MARITIME BUNKERING & DECARBONIZATION ANALYTICS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Fuel className="w-6 h-6 text-emerald-400" />
              <span>Fuel Analytics & Eco-Speed Optimization</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Visual analytics for VLSFO/MGO price trends across South Asian hubs, speed vs fuel consumption curves, and CII/EEXI carbon emission ratings.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">IMO CII RATING ENGINE: <strong className="text-emerald-400">ACTIVE</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive Eco-Speed Slider & Savings Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Interactive Eco-Speed Fuel Calculator</span>
            </h3>
            <p className="text-xs text-slate-400">
              Adjust vessel operating speed to calculate daily fuel burn, cost savings, and carbon reduction.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-slate-400">SELECTED SPEED:</span>
            <strong className="text-cyan-400 text-base">{selectedSpeed} Kts</strong>
          </div>
        </div>

        {/* Slider input */}
        <div className="space-y-2">
          <input
            type="range"
            min="10"
            max="20"
            step="2"
            value={selectedSpeed}
            onChange={(e) => setSelectedSpeed(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer bg-slate-950 h-2 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>10 Kts (Super Eco)</span>
            <span>14 Kts (Standard Eco)</span>
            <span>20 Kts (Full Speed)</span>
          </div>
        </div>

        {/* Calculated Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block uppercase">DAILY FUEL BURN</span>
            <strong className="text-emerald-400 text-base">{targetData.fuelMtPerDay} MT / day</strong>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block uppercase">IMO CII ECO-RATING</span>
            <strong className="text-amber-300 text-base">RATING {targetData.ecoRating}</strong>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block uppercase">EST. ANNUAL SAVINGS</span>
            <strong className={annualDollarSavings >= 0 ? 'text-emerald-400 text-base' : 'text-rose-400 text-base'}>
              ${annualDollarSavings.toLocaleString()} / yr
            </strong>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block uppercase">ANNUAL CO2 REDUCTION</span>
            <strong className="text-cyan-400 text-base">{annualCo2SavedTons.toLocaleString()} MT CO2</strong>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Section (2 Graphs Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Fuel Burn vs Speed Curve */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Vessel Fuel Consumption vs Speed Curve</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPEED_EFFICIENCY_DATA}>
                <defs>
                  <linearGradient id="fuelColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="speedKts" stroke="#94a3b8" unit=" Kts" />
                <YAxis stroke="#94a3b8" unit=" MT" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                />
                <Area type="monotone" dataKey="fuelMtPerDay" name="Fuel Burn (MT/day)" stroke="#10b981" fillOpacity={1} fill="url(#fuelColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Bunkering Price Hub Comparison */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>Regional Bunkering Prices ($/MT)</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BUNKERING_HUB_PRICES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="hub" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" unit=" $" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="vlsfo" name="VLSFO ($/MT)" fill="#06b6d4" />
                <Bar dataKey="mgo" name="MGO ($/MT)" fill="#3b82f6" />
                <Bar dataKey="hsfo" name="HSFO ($/MT)" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
