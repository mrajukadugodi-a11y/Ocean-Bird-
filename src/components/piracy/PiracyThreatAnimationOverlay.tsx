import React, { useState } from 'react';
import { Target, Activity, Flame, Shield, Radio, Sparkles, Navigation } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export const PiracyThreatAnimationOverlay: React.FC = () => {
  const [animationType, setAnimationType] = useState<'RADAR_SWEEP' | 'WATER_JET' | 'SKIFF_APPROACH'>('RADAR_SWEEP');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive Tactical Piracy Threat & Countermeasure Dynamic Animations</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time graphical visualizers for radar sweeps, water monitor trajectories, and skiff closing vectors
          </p>
        </div>

        <div className="flex items-center space-x-1">
          {(['RADAR_SWEEP', 'WATER_JET', 'SKIFF_APPROACH'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setAnimationType(type);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                animationType === type
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Animation Canvas Container */}
      <div className="relative w-full h-64 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center p-4">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

        {animationType === 'RADAR_SWEEP' && (
          <div className="relative w-52 h-52 rounded-full border border-cyan-500/40 flex items-center justify-center">
            {/* Concentric Circles */}
            <div className="absolute w-40 h-40 rounded-full border border-cyan-500/20" />
            <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20" />
            <div className="absolute w-14 h-14 rounded-full border border-cyan-500/20" />

            {/* Radar Crosshairs */}
            <div className="absolute w-full h-px bg-cyan-500/30" />
            <div className="absolute h-full w-px bg-cyan-500/30" />

            {/* Rotating Radar Line */}
            <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '4s' }}>
              <div className="w-1/2 h-1/2 bg-gradient-to-tr from-cyan-500/60 to-transparent origin-bottom-right rounded-tl-full" />
            </div>

            {/* Pulsing Threat Blips */}
            <div className="absolute top-10 right-12 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
            <div className="absolute top-10 right-12 w-3 h-3 bg-rose-500 rounded-full border border-white" />

            <div className="absolute bottom-12 left-10 w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />

            {/* Vessel Center Marker */}
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_#38bdf8]" />
          </div>
        )}

        {animationType === 'WATER_JET' && (
          <div className="relative w-full h-full flex flex-col items-center justify-between p-4">
            <span className="text-[10px] text-cyan-300 font-bold uppercase">Starboard High-Pressure Water Cannon Spray Trajectory</span>

            {/* Ship Hull Silhouette */}
            <div className="relative w-64 h-24 bg-slate-900 border-2 border-slate-700 rounded-3xl flex items-center justify-between px-6">
              <span className="text-[10px] font-bold text-slate-400">VESSEL HULL</span>

              {/* Water Cannon Spray Arc Animations */}
              <div className="absolute -top-12 right-12 flex space-x-1">
                <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 via-blue-500 to-transparent rounded-full animate-bounce" style={{ animationDuration: '0.8s' }} />
                <div className="w-2 h-20 bg-gradient-to-t from-cyan-300 via-blue-400 to-transparent rounded-full animate-bounce" style={{ animationDuration: '0.6s' }} />
                <div className="w-2 h-14 bg-gradient-to-t from-cyan-400 via-sky-500 to-transparent rounded-full animate-bounce" style={{ animationDuration: '1.1s' }} />
              </div>
            </div>

            <span className="text-[9px] text-slate-500 font-sans">Active pressure: 14 BAR • Coverage arc: 180° Port to Starboard</span>
          </div>
        )}

        {animationType === 'SKIFF_APPROACH' && (
          <div className="relative w-full h-full flex items-center justify-between px-8">
            {/* Merchant Ship Icon */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-300 shadow-[0_0_15px_#38bdf8]">
                SHIP
              </div>
              <span className="text-[9px] text-cyan-400">18.0 Kts</span>
            </div>

            {/* Closing Vector Line with Distance */}
            <div className="flex-1 mx-4 relative flex items-center justify-center">
              <div className="w-full h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 animate-pulse" />
              <span className="absolute bg-slate-900 border border-slate-800 text-rose-400 font-bold px-2 py-0.5 rounded text-[9px] font-mono">
                CLOSING @ 32 KTS (0.8 NM)
              </span>
            </div>

            {/* Approaching Skiff */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-rose-950 border-2 border-rose-500 flex items-center justify-center font-black text-rose-300 animate-pulse">
                SKIFF
              </div>
              <span className="text-[9px] text-rose-400">32.5 Kts</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
