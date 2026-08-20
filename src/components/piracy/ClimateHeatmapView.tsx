import React, { useState } from 'react';
import { Thermometer, Sun, Wind, Waves, CloudRain, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface HeatmapZone {
  id: string;
  regionName: string;
  seaTempCelsius: number;
  thermalAnomaly: string;
  waveSwellMeters: number;
  heatLevel: 'CRITICAL' | 'ELEVATED' | 'MODERATE' | 'NORMAL';
  squallProbabilityPct: number;
}

const HEATMAP_ZONES: HeatmapZone[] = [
  {
    id: 'HEAT-01',
    regionName: 'Gulf of Aden & Bab-el-Mandeb Strait',
    seaTempCelsius: 31.8,
    thermalAnomaly: '+2.4°C Above Average',
    waveSwellMeters: 2.2,
    heatLevel: 'CRITICAL',
    squallProbabilityPct: 85
  },
  {
    id: 'HEAT-02',
    regionName: 'South China Sea & Paracel Trench',
    seaTempCelsius: 30.2,
    thermalAnomaly: '+1.8°C Above Average',
    waveSwellMeters: 4.8,
    heatLevel: 'ELEVATED',
    squallProbabilityPct: 92
  },
  {
    id: 'HEAT-03',
    regionName: 'Gulf of Guinea Equator Sector',
    seaTempCelsius: 29.5,
    thermalAnomaly: '+0.9°C Normal Belt',
    waveSwellMeters: 1.4,
    heatLevel: 'MODERATE',
    squallProbabilityPct: 60
  },
  {
    id: 'HEAT-04',
    regionName: 'Strait of Malacca Anchorages',
    seaTempCelsius: 29.8,
    thermalAnomaly: '+1.1°C Moderate Anomaly',
    waveSwellMeters: 1.1,
    heatLevel: 'NORMAL',
    squallProbabilityPct: 45
  }
];

export const ClimateHeatmapView: React.FC = () => {
  const [zones] = useState<HeatmapZone[]>(HEATMAP_ZONES);
  const [selectedZone, setSelectedZone] = useState<HeatmapZone>(HEATMAP_ZONES[0]);

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
            <Thermometer className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Global Ocean Climate & Sea Surface Temperature Thermal Heatmap</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time satellite thermal ocean surface heat levels, tropical storm squall probabilities, and wave swell dynamics
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold">
          4 THERMAL SATELLITE ZONES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Heatmap Grid Cards */}
        <div className="space-y-2">
          {zones.map((z) => (
            <motion.div
              key={z.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                setSelectedZone(z);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedZone.id === z.id
                  ? 'bg-slate-950 border-rose-500 ring-1 ring-rose-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[8px] text-rose-400 font-bold block">{z.id}</span>
                  <h4 className="text-xs font-bold text-white">{z.regionName}</h4>
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                  z.heatLevel === 'CRITICAL'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : z.heatLevel === 'ELEVATED'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                }`}>
                  HEAT: {z.heatLevel}
                </span>
              </div>

              {/* Thermal Temperature Indicator */}
              <div className="space-y-1 font-sans">
                <div className="flex justify-between text-[9px] font-mono">
                  <span className="text-slate-400">Sea Temp & Anomaly:</span>
                  <span className="text-rose-400 font-bold">{z.seaTempCelsius}°C ({z.thermalAnomaly})</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-rose-500 h-full"
                    style={{ width: `${((z.seaTempCelsius - 20) / 15) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Thermal Zone Detailed Metrics */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono">
          <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
            <div>
              <span className="text-[8px] text-rose-400 font-bold block uppercase">{selectedZone.id}</span>
              <h4 className="text-xs font-bold text-white">{selectedZone.regionName}</h4>
            </div>
            <span className="text-[8px] text-amber-300 font-bold bg-amber-950 border border-amber-800 px-2 py-0.5 rounded">
              SQUALL PROBABILITY: {selectedZone.squallProbabilityPct}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[10px] font-sans">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[8px] font-mono block">SEA SURFACE TEMP:</span>
              <span className="text-sm font-black text-rose-400">{selectedZone.seaTempCelsius}°C</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[8px] font-mono block">WAVE SWELL HEIGHT:</span>
              <span className="text-sm font-black text-cyan-300">{selectedZone.waveSwellMeters} Meters</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
