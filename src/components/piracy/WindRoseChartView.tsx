import React, { useState } from 'react';
import { Compass, Wind, Eye, Waves, BarChart3, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface WindSectorData {
  direction: string;
  angleDeg: number;
  calmPct: number;
  moderatePct: number;
  galePct: number;
  totalFreqPct: number;
}

const BALTIC_WIND_SECTORS: WindSectorData[] = [
  { direction: 'N', angleDeg: 0, calmPct: 4.2, moderatePct: 8.5, galePct: 2.1, totalFreqPct: 14.8 },
  { direction: 'NE', angleDeg: 45, calmPct: 3.1, moderatePct: 6.2, galePct: 1.5, totalFreqPct: 10.8 },
  { direction: 'E', angleDeg: 90, calmPct: 2.5, moderatePct: 5.0, galePct: 0.8, totalFreqPct: 8.3 },
  { direction: 'SE', angleDeg: 135, calmPct: 3.0, moderatePct: 7.1, galePct: 1.2, totalFreqPct: 11.3 },
  { direction: 'S', angleDeg: 180, calmPct: 5.1, moderatePct: 11.2, galePct: 3.4, totalFreqPct: 19.7 },
  { direction: 'SW', angleDeg: 225, calmPct: 6.4, moderatePct: 14.8, galePct: 4.8, totalFreqPct: 26.0 },
  { direction: 'W', angleDeg: 270, calmPct: 4.0, moderatePct: 9.3, galePct: 2.5, totalFreqPct: 15.8 },
  { direction: 'NW', angleDeg: 315, calmPct: 3.2, moderatePct: 7.0, galePct: 1.8, totalFreqPct: 12.0 }
];

export const WindRoseChartView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('BALTIC_SEA');
  const [activeSector, setActiveSector] = useState<WindSectorData>(BALTIC_WIND_SECTORS[5]); // SW default

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
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Maritime Wind Rose Directional Frequency & Gale Velocity Chart</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Polar directional distribution of prevailing winds, light breezes, and gale-force Beaufort vectors across shipping corridors
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              hapticEngine.trigger('click');
            }}
            className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-1.5 text-cyan-300 font-bold"
          >
            <option value="BALTIC_SEA">Baltic Sea / Fehmarn Belt</option>
            <option value="RED_SEA">Red Sea / Bab-el-Mandeb</option>
            <option value="MALACCA">Singapore & Malacca Strait</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Polar SVG Compass Visualizer */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[320px] shadow-inner">
          <div className="absolute top-3 left-3 text-[9px] text-slate-500 font-bold">
            SECTOR BEAUFORT FREQUENCY (%)
          </div>

          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Concentric Grid Circles */}
            <div className="absolute inset-0 rounded-full border border-slate-800/80 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-slate-800/60 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-slate-800/40 pointer-events-none" />
            <div className="absolute inset-24 rounded-full border border-slate-800/20 pointer-events-none" />

            {/* Crosshair Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-slate-800/60" />
              <div className="h-full w-[1px] bg-slate-800/60 absolute" />
            </div>

            {/* Wind Petals / Spokes */}
            {BALTIC_WIND_SECTORS.map((sector) => {
              const rad = ((sector.angleDeg - 90) * Math.PI) / 180;
              const radiusLength = Math.min( sector.totalFreqPct * 3.8, 100 );
              const x = Math.cos(rad) * radiusLength;
              const y = Math.sin(rad) * radiusLength;

              return (
                <motion.div
                  key={sector.direction}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => {
                    setActiveSector(sector);
                    hapticEngine.trigger('click');
                  }}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className={`absolute w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border shadow-lg transition-all ${
                    activeSector.direction === sector.direction
                      ? 'bg-cyan-400 text-slate-950 border-white ring-4 ring-cyan-500/30 z-20 font-black'
                      : 'bg-slate-900 text-cyan-300 border-slate-700 hover:border-cyan-400'
                  }`}
                >
                  <span className="text-[9px]">{sector.direction}</span>
                </motion.div>
              );
            })}

            {/* Center Compass Rose Dial */}
            <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-cyan-400 font-black text-[10px] shadow-2xl z-10">
              N
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4 text-[9px] text-slate-400 font-sans">
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /><span>Calm (&lt;10 kts)</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-cyan-500 rounded-sm" /><span>Moderate (10–25 kts)</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-rose-500 rounded-sm" /><span>Gale (&gt;25 kts)</span></span>
          </div>
        </div>

        {/* Selected Sector Metrics Breakdown */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">SELECTED DIRECTION</span>
                <h4 className="text-sm font-black text-white">{activeSector.direction} ({activeSector.angleDeg}°) VECTOR</h4>
              </div>
              <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
                {activeSector.totalFreqPct}% FREQ
              </span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Light Breeze (&lt;10 kts):</span>
                <span className="text-emerald-400 font-bold">{activeSector.calmPct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${(activeSector.calmPct / 30) * 100}%` }} />
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400">Moderate Wind (10–25 kts):</span>
                <span className="text-cyan-300 font-bold">{activeSector.moderatePct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: `${(activeSector.moderatePct / 30) * 100}%` }} />
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400">Gale Storm (&gt;25 kts):</span>
                <span className="text-rose-400 font-bold">{activeSector.galePct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full" style={{ width: `${(activeSector.galePct / 30) * 100}%` }} />
              </div>
            </div>
          </div>

          <p className="text-[9px] text-slate-500 font-sans leading-relaxed border-t border-slate-900 pt-3">
            Prevailing South-Westerly wind patterns drive high wave swell across the Bornholm Deep and Fehmarn Belt corridor.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
