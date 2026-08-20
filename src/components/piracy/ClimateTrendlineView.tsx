import React, { useState } from 'react';
import { TrendingUp, Calendar, Sparkles, Activity, Layers, ArrowUpRight, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateTrendlineDataPoint {
  year: number;
  sstCelsius: number;
  seaLevelRiseMm: number;
  cat45Typhoons: number;
  arcticIceMkm2: number;
}

const HISTORICAL_TRENDLINE_SERIES: ClimateTrendlineDataPoint[] = [
  { year: 1990, sstCelsius: 19.8, seaLevelRiseMm: 0, cat45Typhoons: 12, arcticIceMkm2: 7.5 },
  { year: 2000, sstCelsius: 20.2, seaLevelRiseMm: 31, cat45Typhoons: 16, arcticIceMkm2: 6.3 },
  { year: 2010, sstCelsius: 20.7, seaLevelRiseMm: 68, cat45Typhoons: 22, arcticIceMkm2: 4.9 },
  { year: 2020, sstCelsius: 21.1, seaLevelRiseMm: 104, cat45Typhoons: 31, arcticIceMkm2: 4.2 },
  { year: 2026, sstCelsius: 21.4, seaLevelRiseMm: 128, cat45Typhoons: 36, arcticIceMkm2: 3.8 },
  { year: 2035, sstCelsius: 21.9, seaLevelRiseMm: 168, cat45Typhoons: 44, arcticIceMkm2: 3.1 }
];

export const ClimateTrendlineView: React.FC = () => {
  const [metricKey, setMetricKey] = useState<'sstCelsius' | 'seaLevelRiseMm' | 'cat45Typhoons' | 'arcticIceMkm2'>('sstCelsius');
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(4); // 2026

  const selectedPoint = HISTORICAL_TRENDLINE_SERIES[selectedYearIndex];

  const getMetricTitle = () => {
    switch (metricKey) {
      case 'sstCelsius': return 'Global Average Sea Surface Temperature (°C)';
      case 'seaLevelRiseMm': return 'Cumulative Sea Level Rise (mm)';
      case 'cat45Typhoons': return 'Category 4/5 Super Typhoon Annual Frequency';
      case 'arcticIceMkm2': return 'Arctic Minimum Ice Extent (Million km²)';
    }
  };

  const getMetricUnit = (val: number) => {
    switch (metricKey) {
      case 'sstCelsius': return `${val}°C`;
      case 'seaLevelRiseMm': return `${val} mm`;
      case 'cat45Typhoons': return `${val} Typhoons`;
      case 'arcticIceMkm2': return `${val} M km²`;
    }
  };

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
            <span>Multi-Decadal Climate Trendline & Predictive Anomaly Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Continuous trajectory modeling for ocean surface temperature, sea level elevation, and polar ice minimums (1990-2035)
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>TRENDLINE MODEL 2035</span>
        </span>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'sstCelsius', label: 'SEA TEMP (°C)' },
          { id: 'seaLevelRiseMm', label: 'SEA LEVEL RISE (MM)' },
          { id: 'cat45Typhoons', label: 'SUPER TYPHOONS' },
          { id: 'arcticIceMkm2', label: 'ARCTIC ICE EXTENT' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMetricKey(m.id as any);
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl text-[9px] font-bold transition-all ${
              metricKey === m.id
                ? 'bg-cyan-500 text-slate-950 font-black shadow'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Trendline Visualization Chart Bar Display */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-400 font-bold uppercase">{getMetricTitle()}</span>
          <span className="text-cyan-400 font-bold">SELECTED YEAR: {selectedPoint.year} ({getMetricUnit(selectedPoint[metricKey])})</span>
        </div>

        <div className="grid grid-cols-6 gap-2 items-end h-40 pt-6 px-2 border-b border-slate-800 pb-2">
          {HISTORICAL_TRENDLINE_SERIES.map((pt, idx) => {
            const isSelected = idx === selectedYearIndex;
            const val = pt[metricKey];
            // Normalize value for height
            let heightPct = 50;
            if (metricKey === 'sstCelsius') heightPct = ((val - 19) / 3.5) * 100;
            if (metricKey === 'seaLevelRiseMm') heightPct = (val / 170) * 100;
            if (metricKey === 'cat45Typhoons') heightPct = (val / 50) * 100;
            if (metricKey === 'arcticIceMkm2') heightPct = (val / 8) * 100;

            return (
              <div
                key={pt.year}
                onClick={() => {
                  setSelectedYearIndex(idx);
                  hapticEngine.trigger('click');
                }}
                className="flex flex-col items-center space-y-2 cursor-pointer group"
              >
                <span className={`text-[8px] font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`}>
                  {getMetricUnit(val)}
                </span>
                <div className="w-full bg-slate-900 rounded-t-xl h-28 relative overflow-hidden flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(12, Math.min(100, heightPct))}%` }}
                    transition={{ duration: 0.4 }}
                    className={`w-full rounded-t-xl transition-all ${
                      isSelected
                        ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50'
                        : 'bg-slate-800 group-hover:bg-slate-700'
                    }`}
                  />
                </div>
                <span className={`text-[9px] font-bold ${isSelected ? 'text-cyan-400 underline' : 'text-slate-400'}`}>
                  {pt.year}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Point Insight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[10px]">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 font-bold block">SST TELEMETRY:</span>
            <span className="text-white font-black text-sm">{selectedPoint.sstCelsius}°C</span>
            <span className="text-[8px] text-slate-400 block font-sans">+{(selectedPoint.sstCelsius - 19.8).toFixed(1)}°C vs 1990 Baseline</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 font-bold block">SEA LEVEL ELEVATION:</span>
            <span className="text-cyan-300 font-black text-sm">{selectedPoint.seaLevelRiseMm} mm</span>
            <span className="text-[8px] text-cyan-400 block font-sans">Global mean rise</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 font-bold block">SUPER TYPHOON FREQ:</span>
            <span className="text-amber-400 font-black text-sm">{selectedPoint.cat45Typhoons} / Year</span>
            <span className="text-[8px] text-amber-300 block font-sans">Cat 4 and Cat 5 storms</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
