import React, { useState } from 'react';
import { Waves, Wind, ShieldAlert, Info, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface SeaStateGrade {
  code: number;
  descriptiveTerm: string;
  waveHeightRangeMeters: string;
  windSpeedKnots: string;
  beaufortScaleEquivalent: string;
  surfaceVisualAppearance: string;
  tacticalNavigationImpact: string;
}

const SEA_STATE_GRADES: SeaStateGrade[] = [
  { code: 0, descriptiveTerm: 'Calm (Glassy)', waveHeightRangeMeters: '0.0 m', windSpeedKnots: '< 1 knot', beaufortScaleEquivalent: 'Force 0', surfaceVisualAppearance: 'Sea surface like a mirror. No wave movement.', tacticalNavigationImpact: 'Optimal skiff radar detection. Unimpeded speed.' },
  { code: 1, descriptiveTerm: 'Calm (Rippled)', waveHeightRangeMeters: '0.0 - 0.1 m', windSpeedKnots: '1 - 3 knots', beaufortScaleEquivalent: 'Force 1', surfaceVisualAppearance: 'Ripples with appearance of scales, without foam crests.', tacticalNavigationImpact: 'Minimal sea clutter on X-band radar.' },
  { code: 2, descriptiveTerm: 'Smooth', waveHeightRangeMeters: '0.1 - 0.5 m', windSpeedKnots: '4 - 6 knots', beaufortScaleEquivalent: 'Force 2', surfaceVisualAppearance: 'Small wavelets, glassy crests, no breaking waves.', tacticalNavigationImpact: 'Ideal for small skiff boarding operations.' },
  { code: 3, descriptiveTerm: 'Slight', waveHeightRangeMeters: '0.5 - 1.25 m', windSpeedKnots: '7 - 10 knots', beaufortScaleEquivalent: 'Force 3', surfaceVisualAppearance: 'Large wavelets, crests begin to break, scattered whitecaps.', tacticalNavigationImpact: 'Moderate roll for small patrol craft.' },
  { code: 4, descriptiveTerm: 'Moderate', waveHeightRangeMeters: '1.25 - 2.5 m', windSpeedKnots: '11 - 16 knots', beaufortScaleEquivalent: 'Force 4', surfaceVisualAppearance: 'Small waves becoming longer; fairly frequent white horses.', tacticalNavigationImpact: 'Skiff boarding becomes hazardous.' },
  { code: 5, descriptiveTerm: 'Rough', waveHeightRangeMeters: '2.5 - 4.0 m', windSpeedKnots: '17 - 21 knots', beaufortScaleEquivalent: 'Force 5', surfaceVisualAppearance: 'Moderate waves taking a more pronounced long form; many white horses.', tacticalNavigationImpact: 'Piracy skiff attacks largely curtailed due to wave swell.' },
  { code: 6, descriptiveTerm: 'Very Rough', waveHeightRangeMeters: '4.0 - 6.0 m', windSpeedKnots: '22 - 27 knots', beaufortScaleEquivalent: 'Force 6', surfaceVisualAppearance: 'Large waves begin to form; white foam crests everywhere.', tacticalNavigationImpact: 'Heavy pitch/roll for merchant vessels. Secure deck cargo.' }
];

export const SeaStateLegendView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<SeaStateGrade>(SEA_STATE_GRADES[3]);

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
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>Douglas & Beaufort Sea State Technical Reference Legend</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Standardized hydrographic sea condition scale, wave heights, and tactical navigation impact index
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          DOUGLAS SCALE 0–9 LEGEND
        </span>
      </div>

      {/* Interactive Scale Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
        <span className="text-[9px] text-slate-400 font-bold block uppercase">SELECT SEA STATE GRADE:</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SEA_STATE_GRADES.map((g) => {
            const isSelected = selectedGrade.code === g.code;
            return (
              <button
                key={g.code}
                onClick={() => {
                  setSelectedGrade(g);
                  hapticEngine.trigger('click');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold block">CODE {g.code}</span>
                <span className="text-[8px] opacity-80 block truncate font-sans">{g.descriptiveTerm}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Sea State Technical Profile Card */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-[8px] text-cyan-400 font-bold block">DOUGLAS CODE {selectedGrade.code}</span>
            <h4 className="text-sm font-bold text-white">{selectedGrade.descriptiveTerm}</h4>
            <span className="text-[9px] text-amber-300 font-mono block mt-0.5">{selectedGrade.beaufortScaleEquivalent}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 block">WAVE HEIGHT:</span>
              <span className="text-cyan-300 font-bold">{selectedGrade.waveHeightRangeMeters}</span>
            </div>
            <div>
              <span className="text-slate-500 block">WIND SPEED:</span>
              <span className="text-amber-300 font-bold">{selectedGrade.windSpeedKnots}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800 font-sans text-[10px] flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-slate-400 font-bold font-mono block">VISUAL SURFACE APPEARANCE:</span>
            <p className="text-slate-200">{selectedGrade.surfaceVisualAppearance}</p>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <span className="text-rose-400 font-bold font-mono block">TACTICAL NAVIGATION IMPACT:</span>
            <p className="text-slate-300">{selectedGrade.tacticalNavigationImpact}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
