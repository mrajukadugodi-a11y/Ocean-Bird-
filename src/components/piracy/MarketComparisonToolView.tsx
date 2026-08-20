import React, { useState } from 'react';
import { Layers, DollarSign, Fuel, ShieldAlert, Award, ArrowUpRight, ArrowDownRight, Check, Zap } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface VesselCategoryComparison {
  category: string;
  avgPurchaseCost: string;
  charterRateDay: string;
  dailyFuelBurnMt: string;
  insuranceRiskTier: 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_PIRACY_RISK';
  estimatedAnnualRoiPct: number;
  primaryTradeCommodity: string;
}

const COMPARISON_DATA: VesselCategoryComparison[] = [
  {
    category: 'Container Ships & Liners',
    avgPurchaseCost: '$45M - $120M',
    charterRateDay: '$22,500 - $65,000',
    dailyFuelBurnMt: '45 - 90 MT VLSFO',
    insuranceRiskTier: 'MEDIUM_RISK',
    estimatedAnnualRoiPct: 14.2,
    primaryTradeCommodity: 'Manufactured Goods & Passengers'
  },
  {
    category: 'Timber & Woodchip Carriers',
    avgPurchaseCost: '$18M - $38M',
    charterRateDay: '$14,000 - $28,000',
    dailyFuelBurnMt: '22 - 38 MT VLSFO',
    insuranceRiskTier: 'LOW_RISK',
    estimatedAnnualRoiPct: 11.5,
    primaryTradeCommodity: 'Logs, Timber & Softwood Chips'
  },
  {
    category: 'Luxury Superyachts',
    avgPurchaseCost: '$25M - $250M',
    charterRateDay: '$35,000 - $120,000',
    dailyFuelBurnMt: '12 - 25 MT MGO',
    insuranceRiskTier: 'LOW_RISK',
    estimatedAnnualRoiPct: 8.8,
    primaryTradeCommodity: 'High Net Worth Tourism & Private Charter'
  },
  {
    category: 'Fisheries & Trawlers',
    avgPurchaseCost: '$12M - $28M',
    charterRateDay: '$8,500 - $18,000',
    dailyFuelBurnMt: '8 - 18 MT MGO',
    insuranceRiskTier: 'MEDIUM_RISK',
    estimatedAnnualRoiPct: 16.4,
    primaryTradeCommodity: 'Pelagic Fish & Cold Storage Seafood'
  },
  {
    category: 'Crude & Product Tankers',
    avgPurchaseCost: '$55M - $140M',
    charterRateDay: '$32,000 - $85,000',
    dailyFuelBurnMt: '50 - 110 MT VLSFO',
    insuranceRiskTier: 'HIGH_PIRACY_RISK',
    estimatedAnnualRoiPct: 18.2,
    primaryTradeCommodity: 'Crude Oil & Refined Fuels'
  }
];

export const MarketComparisonToolView: React.FC = () => {
  const [comparisonCategory, setComparisonCategory] = useState<string>('ALL');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Maritime Vessel Segment Market Comparison & Financial Yield Matrix</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Comparative analysis of purchase pricing, daily charter rates, fuel consumption economics, and insurance risk ratings across commercial ship classes
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          ANALYTICS BENCHMARK 2026
        </span>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl overflow-x-auto">
        <table className="w-full text-left font-mono text-[10px]">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500">
              <th className="pb-2.5">VESSEL SEGMENT CLASS</th>
              <th className="pb-2.5">AVG PURCHASE PRICE</th>
              <th className="pb-2.5">DAILY CHARTER / LEASE</th>
              <th className="pb-2.5">DAILY FUEL BURN</th>
              <th className="pb-2.5">INSURANCE TIER</th>
              <th className="pb-2.5 text-right">EST. ANNUAL ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {COMPARISON_DATA.map((item) => (
              <tr key={item.category} className="hover:bg-slate-900/50 transition-colors">
                <td className="py-3 font-bold text-white flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{item.category}</span>
                </td>
                <td className="py-3 text-cyan-300 font-bold">{item.avgPurchaseCost}</td>
                <td className="py-3 text-emerald-400 font-bold">{item.charterRateDay}</td>
                <td className="py-3 text-slate-300">{item.dailyFuelBurnMt}</td>
                <td className="py-3">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                    item.insuranceRiskTier === 'HIGH_PIRACY_RISK'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : item.insuranceRiskTier === 'MEDIUM_RISK'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {item.insuranceRiskTier.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="py-3 text-right font-black text-emerald-400 text-xs">
                  +{item.estimatedAnnualRoiPct}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
