import React, { useState } from 'react';
import { TrendingUp, LineChart, Calendar, ArrowUpRight, ArrowDownRight, Globe, Layers, Zap } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ForecastModel {
  id: string;
  segment: string;
  horizonYear: string;
  forecastedTeuVolume: string;
  growthRatePct: number;
  confidenceScore: number;
  primaryDrivers: string[];
  keyRiskFactors: string[];
}

const FORECAST_MODELS: ForecastModel[] = [
  {
    id: 'FCST-2026',
    segment: 'Container Shipping & Liner Fleet',
    horizonYear: '2026 Q4 Projection',
    forecastedTeuVolume: '895M TEU (+4.6%)',
    growthRatePct: 4.6,
    confidenceScore: 92,
    primaryDrivers: ['E-Commerce expansion', 'Nearshoring in Southeast Asia', 'Red Sea rerouting impact'],
    keyRiskFactors: ['Port congestion in Western Europe', 'Bunker fuel carbon tariffs']
  },
  {
    id: 'FCST-2027',
    segment: 'LNG & Clean Energy Carriers',
    horizonYear: '2027 Full Year',
    forecastedTeuVolume: '610M m³ LNG (+8.2%)',
    growthRatePct: 8.2,
    confidenceScore: 88,
    primaryDrivers: ['European natural gas transition', 'Qatar North Field Expansion', 'US Gulf LNG exports'],
    keyRiskFactors: ['Panama Canal draft restrictions', 'Shipyard newbuild delivery delays']
  },
  {
    id: 'FCST-2028',
    segment: 'Dry Bulk & Grain Seaborne Trade',
    horizonYear: '2028 Horizon',
    forecastedTeuVolume: '5.8B Metric Tons (+3.1%)',
    growthRatePct: 3.1,
    confidenceScore: 85,
    primaryDrivers: ['South American grain crop yields', 'India infrastructure coal demand'],
    keyRiskFactors: ['Extreme weather crop yields', 'Black Sea grain corridor instability']
  }
];

export const TradeForecastView: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState<string>('2026-2028');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <LineChart className="w-4 h-4 text-cyan-400" />
            <span>AI-Driven Seaborne Trade Volume & Freight Demand Forecast Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Predictive global cargo throughput models, macro supply-demand balance forecasts, and growth confidence indexes
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          AI FORECAST ENGINE v4.2
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FORECAST_MODELS.map((model) => (
          <div key={model.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[9px] text-cyan-400 font-bold block">{model.id} • {model.horizonYear}</span>
                <h4 className="text-xs font-bold text-white">{model.segment}</h4>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[8px] font-bold px-2 py-0.5 rounded">
                +{model.growthRatePct}% YoY
              </span>
            </div>

            <div className="space-y-2 text-[10px] font-sans">
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex justify-between font-mono">
                <span className="text-slate-400">Projected Volume:</span>
                <span className="text-emerald-400 font-bold">{model.forecastedTeuVolume}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[9px] font-mono block mb-1">Key Growth Drivers:</span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[9px]">
                  {model.primaryDrivers.map((driver, i) => (
                    <li key={i}>{driver}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-900 flex justify-between text-[9px] font-mono">
                <span className="text-slate-500">AI Confidence Rating:</span>
                <span className="text-cyan-300 font-bold">{model.confidenceScore}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
