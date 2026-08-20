import React, { useState } from 'react';
import { TrendingUp, Thermometer, CloudRain, BarChart3, ShieldCheck, Sparkles, Filter, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TrendMetric {
  year: number;
  avgSstCelsius: number;
  typhoonCountGlobal: number;
  arcticIceThicknessMeters: number;
  fleetCo2EmissionsMegatons: number;
  carbonIntensityScore: number;
}

const HISTORICAL_METRICS: TrendMetric[] = [
  { year: 2020, avgSstCelsius: 20.4, typhoonCountGlobal: 24, arcticIceThicknessMeters: 2.15, fleetCo2EmissionsMegatons: 940, carbonIntensityScore: 82.5 },
  { year: 2021, avgSstCelsius: 20.6, typhoonCountGlobal: 27, arcticIceThicknessMeters: 2.08, fleetCo2EmissionsMegatons: 925, carbonIntensityScore: 79.1 },
  { year: 2022, avgSstCelsius: 20.8, typhoonCountGlobal: 29, arcticIceThicknessMeters: 1.98, fleetCo2EmissionsMegatons: 910, carbonIntensityScore: 76.4 },
  { year: 2023, avgSstCelsius: 21.1, typhoonCountGlobal: 32, arcticIceThicknessMeters: 1.89, fleetCo2EmissionsMegatons: 885, carbonIntensityScore: 72.8 },
  { year: 2024, avgSstCelsius: 21.3, typhoonCountGlobal: 35, arcticIceThicknessMeters: 1.81, fleetCo2EmissionsMegatons: 860, carbonIntensityScore: 68.2 },
  { year: 2025, avgSstCelsius: 21.5, typhoonCountGlobal: 38, arcticIceThicknessMeters: 1.74, fleetCo2EmissionsMegatons: 830, carbonIntensityScore: 64.1 },
  { year: 2026, avgSstCelsius: 21.7, typhoonCountGlobal: 41, arcticIceThicknessMeters: 1.68, fleetCo2EmissionsMegatons: 795, carbonIntensityScore: 59.8 }
];

export const ClimateTrendInsightView: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'SST' | 'TYPHOONS' | 'ICE' | 'CO2'>('SST');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Global Ocean Climate Trend Analytics & Predictive Insights</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Multi-year trend analysis for sea surface temperature, tropical cyclone frequency, Arctic ice pack, and IMO carbon reduction
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Globe className="w-3 h-3 text-cyan-400" />
          <span>2020 - 2026 TELEMETRY</span>
        </span>
      </div>

      {/* Metric Selector Chips */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'SST', label: 'SEA TEMP (°C)' },
          { id: 'TYPHOONS', label: 'TYPHOON FREQUENCY' },
          { id: 'ICE', label: 'ARCTIC ICE PACK (m)' },
          { id: 'CO2', label: 'FLEET CO2 EMISSIONS' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedMetric(m.id as any);
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
              selectedMetric === m.id
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[8px] text-slate-500 font-bold block">2026 AVG SEA TEMP</span>
          <span className="text-lg font-black text-rose-400">21.7°C</span>
          <span className="text-[8px] text-rose-300 block font-bold">+1.3°C Rise since 2020</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[8px] text-slate-500 font-bold block">ANNUAL CYCLONE COUNT</span>
          <span className="text-lg font-black text-amber-400">41 Storms</span>
          <span className="text-[8px] text-amber-300 block font-bold">+70.8% Increase</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[8px] text-slate-500 font-bold block">ARCTIC ICE THICKNESS</span>
          <span className="text-lg font-black text-cyan-300">1.68m</span>
          <span className="text-[8px] text-cyan-400 block font-bold">-21.8% Loss</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[8px] text-slate-500 font-bold block">FLEET CO2 REDUCTION</span>
          <span className="text-lg font-black text-emerald-400">795 Mt</span>
          <span className="text-[8px] text-emerald-300 block font-bold">-15.4% Emission Cuts</span>
        </div>
      </div>

      {/* Visual Chart Bars */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
          <h4 className="text-xs font-bold text-white flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>HISTORICAL & FORECASTED TREND CURVE ({selectedMetric})</span>
          </h4>
          <span className="text-[9px] text-slate-500 font-mono">ANNUAL COMPARATIVE DATA</span>
        </div>

        <div className="space-y-3">
          {HISTORICAL_METRICS.map((row) => {
            let valStr = '';
            let pct = 0;
            let barColor = 'bg-cyan-500';

            if (selectedMetric === 'SST') {
              valStr = `${row.avgSstCelsius}°C`;
              pct = ((row.avgSstCelsius - 18) / 6) * 100;
              barColor = 'bg-rose-500';
            } else if (selectedMetric === 'TYPHOONS') {
              valStr = `${row.typhoonCountGlobal} Storms`;
              pct = (row.typhoonCountGlobal / 50) * 100;
              barColor = 'bg-amber-500';
            } else if (selectedMetric === 'ICE') {
              valStr = `${row.arcticIceThicknessMeters}m`;
              pct = (row.arcticIceThicknessMeters / 2.5) * 100;
              barColor = 'bg-cyan-400';
            } else {
              valStr = `${row.fleetCo2EmissionsMegatons} Mt`;
              pct = (row.fleetCo2EmissionsMegatons / 1000) * 100;
              barColor = 'bg-emerald-500';
            }

            return (
              <div key={row.year} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-white font-bold">{row.year}</span>
                  <span className="text-cyan-300 font-bold">{valStr}</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${barColor}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
