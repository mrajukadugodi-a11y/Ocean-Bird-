import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Globe, DollarSign, ArrowUpRight, ArrowDownRight, Layers, Award } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TradeFlowMetric {
  id: string;
  corridor: string;
  exportRegion: string;
  importRegion: string;
  volumeTeuMt: string;
  growthYearOverYear: number;
  topCommodities: string[];
  tradeBalanceStatus: 'SURPLUS' | 'DEFICIT' | 'BALANCED';
}

const TRADE_FLOWS: TradeFlowMetric[] = [
  {
    id: 'FLOW-01',
    corridor: 'Asia -> North America (Eastbound)',
    exportRegion: 'East Asia (China, Vietnam, KR)',
    importRegion: 'North America (US West / East Coast)',
    volumeTeuMt: '22.8M TEU',
    growthYearOverYear: 5.4,
    topCommodities: ['Electronics', 'Consumer Goods', 'Apparel'],
    tradeBalanceStatus: 'SURPLUS'
  },
  {
    id: 'FLOW-02',
    corridor: 'Asia -> Europe Maritime Lane',
    exportRegion: 'Southeast & East Asia',
    importRegion: 'North Europe & Mediterranean',
    volumeTeuMt: '18.4M TEU',
    growthYearOverYear: 3.8,
    topCommodities: ['Industrial Equipment', 'Solar Panels', 'Auto Parts'],
    tradeBalanceStatus: 'SURPLUS'
  },
  {
    id: 'FLOW-03',
    corridor: 'Middle East -> East Asia Crude & Gas Corridor',
    exportRegion: 'GCC Persian Gulf',
    importRegion: 'China, Japan, South Korea',
    volumeTeuMt: '420M Metric Tons Energy',
    growthYearOverYear: 2.1,
    topCommodities: ['Crude Oil', 'LNG', 'Petrochemicals'],
    tradeBalanceStatus: 'SURPLUS'
  },
  {
    id: 'FLOW-04',
    corridor: 'South America -> Asia Agricultural Belt',
    exportRegion: 'Brazil & Argentina',
    importRegion: 'China & ASEAN Hubs',
    volumeTeuMt: '115M Metric Tons Grain',
    growthYearOverYear: 7.2,
    topCommodities: ['Soybeans', 'Corn', 'Iron Ore'],
    tradeBalanceStatus: 'DEFICIT'
  }
];

export const TradeAnalyticsPortalView: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<TradeFlowMetric>(TRADE_FLOWS[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('YTD');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Global Maritime Trade Analytics & Commodity Corridor Intelligence</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Year-over-year volume throughput, regional import/export trade balances, and commodity shipment analytics
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {['1Q', 'YTD', '1Y', '5Y'].map((tf) => (
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

      {/* Analytics Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-500 font-sans block">GLOBAL SEABORNE TRADE VOLUME</span>
          <span className="text-base font-black text-white">$14.2 Trillion USD</span>
          <span className="text-[9px] text-emerald-400 font-bold block">+4.2% YoY Growth</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-500 font-sans block">TOTAL CONTAINER THROUGHPUT</span>
          <span className="text-base font-black text-cyan-300">865M TEU / Year</span>
          <span className="text-[9px] text-cyan-400 font-bold block">120,000+ Active Cargo Ships</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-500 font-sans block">TOP COMMODITY SEGMENT</span>
          <span className="text-base font-black text-emerald-400">Manufactured Goods (38%)</span>
          <span className="text-[9px] text-slate-400 font-bold block">Followed by Energy (29%) & Grain (18%)</span>
        </div>
      </div>

      {/* Trade Corridor Flow Analytics Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-white block">Key Maritime Trade Lane Flow Analytics</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TRADE_FLOWS.map((flow) => (
            <div
              key={flow.id}
              onClick={() => {
                setSelectedFlow(flow);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedFlow.id === flow.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] text-cyan-400 font-bold block">{flow.id}</span>
                  <h4 className="text-xs font-bold text-white">{flow.corridor}</h4>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 ${
                  flow.growthYearOverYear > 0
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+{flow.growthYearOverYear}% YoY</span>
                </span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1 text-[9px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Export Region:</span>
                  <span className="text-slate-200 font-bold">{flow.exportRegion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Import Destination:</span>
                  <span className="text-cyan-300 font-bold">{flow.importRegion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Volume Capacity:</span>
                  <span className="text-emerald-400 font-bold">{flow.volumeTeuMt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Top Commodity Types:</span>
                  <span className="text-amber-300 font-mono">{flow.topCommodities.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
