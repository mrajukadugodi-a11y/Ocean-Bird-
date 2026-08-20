import React, { useState } from 'react';
import { History, Thermometer, Waves, CloudLightning, ArrowUpRight, ArrowDownRight, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateEpochData {
  epochLabel: string;
  avgSstCelsius: number;
  sstAnomalyDelta: number;
  seaLevelRiseMmYr: number;
  cat45TyphoonCount: number;
  oceanPhLevel: number;
  arcticIceMinExtentMkm2: number;
  extremeWeatherEventsCount: number;
}

const HISTORICAL_EPOCHS: ClimateEpochData[] = [
  {
    epochLabel: '1980 - 1999 Baseline',
    avgSstCelsius: 19.8,
    sstAnomalyDelta: 0.0,
    seaLevelRiseMmYr: 1.7,
    cat45TyphoonCount: 14,
    oceanPhLevel: 8.12,
    arcticIceMinExtentMkm2: 7.2,
    extremeWeatherEventsCount: 42
  },
  {
    epochLabel: '2000 - 2014 Warm Era',
    avgSstCelsius: 20.4,
    sstAnomalyDelta: +0.6,
    seaLevelRiseMmYr: 3.2,
    cat45TyphoonCount: 22,
    oceanPhLevel: 8.08,
    arcticIceMinExtentMkm2: 5.4,
    extremeWeatherEventsCount: 78
  },
  {
    epochLabel: '2015 - 2026 Present Climate',
    avgSstCelsius: 21.3,
    sstAnomalyDelta: +1.5,
    seaLevelRiseMmYr: 4.8,
    cat45TyphoonCount: 35,
    oceanPhLevel: 8.04,
    arcticIceMinExtentMkm2: 4.1,
    extremeWeatherEventsCount: 134
  }
];

export const HistoricalClimateComparisonView: React.FC = () => {
  const [epochs] = useState<ClimateEpochData[]>(HISTORICAL_EPOCHS);
  const [selectedEpochA, setSelectedEpochA] = useState<ClimateEpochData>(HISTORICAL_EPOCHS[0]);
  const [selectedEpochB, setSelectedEpochB] = useState<ClimateEpochData>(HISTORICAL_EPOCHS[2]);

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
            <History className="w-4 h-4 text-cyan-400" />
            <span>Multi-Epoch Historical Climate Comparison & Oceanographic Anomaly Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Comparative analysis of sea surface temperature shifts, ocean acidification (pH), sea level rise, and severe typhoon frequency across climate epochs
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>EPOCH DELTA COMPARATOR</span>
        </span>
      </div>

      {/* Epoch Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="space-y-2">
          <label className="text-[9px] text-slate-500 font-bold block">BASE HISTORICAL EPOCH (A):</label>
          <div className="flex flex-wrap gap-2">
            {epochs.map((e) => (
              <button
                key={e.epochLabel}
                onClick={() => {
                  setSelectedEpochA(e);
                  hapticEngine.trigger('click');
                }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                  selectedEpochA.epochLabel === e.epochLabel
                    ? 'bg-cyan-500 text-slate-950 font-black shadow'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {e.epochLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] text-slate-500 font-bold block">COMPARISON EPOCH (B):</label>
          <div className="flex flex-wrap gap-2">
            {epochs.map((e) => (
              <button
                key={e.epochLabel}
                onClick={() => {
                  setSelectedEpochB(e);
                  hapticEngine.trigger('click');
                }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                  selectedEpochB.epochLabel === e.epochLabel
                    ? 'bg-rose-500 text-slate-950 font-black shadow'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {e.epochLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delta Metric Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: SST */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-slate-500 font-bold">AVG SEA SURFACE TEMP</span>
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400">{selectedEpochA.avgSstCelsius}°C</span>
            <span className="text-xs text-rose-400 font-bold">→ {selectedEpochB.avgSstCelsius}°C</span>
          </div>
          <div className="bg-rose-950/40 border border-rose-900/60 p-2 rounded-xl text-[9px] text-rose-300 font-bold flex justify-between items-center">
            <span>EPOCH SHIFT DELTA:</span>
            <span>+{(selectedEpochB.avgSstCelsius - selectedEpochA.avgSstCelsius).toFixed(1)}°C</span>
          </div>
        </div>

        {/* Metric 2: Sea Level Rise */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-slate-500 font-bold">SEA LEVEL RISE RATE</span>
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400">{selectedEpochA.seaLevelRiseMmYr} mm/yr</span>
            <span className="text-xs text-cyan-300 font-bold">→ {selectedEpochB.seaLevelRiseMmYr} mm/yr</span>
          </div>
          <div className="bg-cyan-950/40 border border-cyan-900/60 p-2 rounded-xl text-[9px] text-cyan-300 font-bold flex justify-between items-center">
            <span>ACCELERATION FACTOR:</span>
            <span>{(selectedEpochB.seaLevelRiseMmYr / selectedEpochA.seaLevelRiseMmYr).toFixed(1)}x Faster</span>
          </div>
        </div>

        {/* Metric 3: Cat 4-5 Typhoons */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-slate-500 font-bold">CAT 4/5 SUPER TYPHOONS</span>
            <CloudLightning className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400">{selectedEpochA.cat45TyphoonCount} / Year</span>
            <span className="text-xs text-amber-300 font-bold">→ {selectedEpochB.cat45TyphoonCount} / Year</span>
          </div>
          <div className="bg-amber-950/40 border border-amber-900/60 p-2 rounded-xl text-[9px] text-amber-300 font-bold flex justify-between items-center">
            <span>FREQUENCY INCREASE:</span>
            <span>+{(selectedEpochB.cat45TyphoonCount - selectedEpochA.cat45TyphoonCount)} Storms</span>
          </div>
        </div>

        {/* Metric 4: Ocean pH Level */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-slate-500 font-bold">OCEAN ACIDIFICATION (pH)</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400">{selectedEpochA.oceanPhLevel} pH</span>
            <span className="text-xs text-emerald-400 font-bold">→ {selectedEpochB.oceanPhLevel} pH</span>
          </div>
          <div className="bg-emerald-950/40 border border-emerald-900/60 p-2 rounded-xl text-[9px] text-emerald-300 font-bold flex justify-between items-center">
            <span>ACIDITY INCREASE:</span>
            <span>-{(selectedEpochA.oceanPhLevel - selectedEpochB.oceanPhLevel).toFixed(2)} pH Drop</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
