import React, { useState } from 'react';
import { TrendingUp, DollarSign, Activity, BarChart2, Globe, ArrowUpRight, ArrowDownRight, Fuel } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface FreightIndex {
  id: string;
  indexName: string;
  currentValue: number;
  changePct: number;
  unit: string;
  trendStatus: 'UP' | 'DOWN';
}

export interface BunkerPrice {
  port: string;
  vlsfoUsdTon: number;
  mgoUsdTon: number;
  lngUsdTon: number;
  changeDayUsd: number;
}

const FREIGHT_INDICES: FreightIndex[] = [
  { id: 'BDI', indexName: 'Baltic Dry Index (BDI)', currentValue: 1845, changePct: 3.2, unit: 'Pts', trendStatus: 'UP' },
  { id: 'SCFI', indexName: 'Shanghai Freight Index (SCFI)', currentValue: 2150, changePct: -1.4, unit: 'USD/TEU', trendStatus: 'DOWN' },
  { id: 'CLARKSEA', indexName: 'ClarkSea Shipping Index', currentValue: 24800, changePct: 2.8, unit: 'USD/Day', trendStatus: 'UP' },
  { id: 'BDTI', indexName: 'Baltic Dirty Tanker Index', currentValue: 1120, changePct: 4.1, unit: 'Pts', trendStatus: 'UP' }
];

const BUNKER_PRICES: BunkerPrice[] = [
  { port: 'Singapore (SGSIN)', vlsfoUsdTon: 620, mgoUsdTon: 840, lngUsdTon: 710, changeDayUsd: 8.5 },
  { port: 'Rotterdam (NLRTM)', vlsfoUsdTon: 585, mgoUsdTon: 810, lngUsdTon: 680, changeDayUsd: -4.2 },
  { port: 'Fujairah (AEFUJ)', vlsfoUsdTon: 615, mgoUsdTon: 835, lngUsdTon: 725, changeDayUsd: 5.0 },
  { port: 'Houston (USHOU)', vlsfoUsdTon: 595, mgoUsdTon: 825, lngUsdTon: 690, changeDayUsd: 2.1 }
];

export const MarketPriceTrendsView: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('6M');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Global Maritime Charter Freight Rates & Bunkering Price Trends</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time Baltic Dry Index (BDI), SCFI container rates, VLSFO/MGO fuel prices, and asset resale valuation trends
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {['1M', '6M', '1Y', '3Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => {
                setSelectedTimeframe(tf);
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                selectedTimeframe === tf
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Global Shipping Freight Indices Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {FREIGHT_INDICES.map((idx) => (
          <div key={idx.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
            <span className="text-[10px] text-slate-400 font-sans block">{idx.indexName}</span>
            <div className="flex justify-between items-baseline">
              <span className="text-base font-black text-white">{idx.currentValue.toLocaleString()}</span>
              <span className={`text-[10px] font-bold flex items-center space-x-0.5 px-1.5 py-0.5 rounded ${
                idx.trendStatus === 'UP'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                {idx.trendStatus === 'UP' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{idx.changePct > 0 ? `+${idx.changePct}` : idx.changePct}%</span>
              </span>
            </div>
            <span className="text-[8px] text-slate-500 block font-mono">{idx.unit}</span>
          </div>
        ))}
      </div>

      {/* Fuel Bunkering Price Benchmark Grid */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-white flex items-center space-x-2 border-b border-slate-900 pb-2">
          <Fuel className="w-4 h-4 text-cyan-400" />
          <span>Global Bunker Fuel Rates per Metric Ton ($ USD)</span>
        </span>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-2">BUNKERING PORT HUB</th>
                <th className="pb-2">VLSFO ($/MT)</th>
                <th className="pb-2">MGO ($/MT)</th>
                <th className="pb-2">LNG FUEL ($/MT)</th>
                <th className="pb-2 text-right">24H CHANGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {BUNKER_PRICES.map((b) => (
                <tr key={b.port} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-2.5 font-bold text-white">{b.port}</td>
                  <td className="py-2.5 text-cyan-300 font-bold">${b.vlsfoUsdTon}</td>
                  <td className="py-2.5 text-slate-200">${b.mgoUsdTon}</td>
                  <td className="py-2.5 text-emerald-300">${b.lngUsdTon}</td>
                  <td className={`py-2.5 text-right font-bold ${b.changeDayUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {b.changeDayUsd >= 0 ? `+$${b.changeDayUsd}` : `-$${Math.abs(b.changeDayUsd)}`}
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
