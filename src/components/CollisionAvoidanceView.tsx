import React, { useState } from 'react';
import {
  ShieldAlert,
  Compass,
  AlertTriangle,
  Radio,
  Sliders,
  RotateCcw,
  Navigation,
  Crosshair,
  CheckCircle2,
  HelpCircle,
  Activity
} from 'lucide-react';

export interface TargetVessel {
  id: string;
  name: string;
  mmsi: string;
  bearingDeg: number;
  distanceNm: number;
  targetSpeedKts: number;
  targetCourseDeg: number;
  cpaNm: number;
  tcpaMin: number;
  colregSituation: 'HEAD_ON' | 'CROSSING_GIVE_WAY' | 'CROSSING_STAND_ON' | 'OVERTAKING';
  recommendedAction: string;
}

const SAMPLE_TARGETS: TargetVessel[] = [
  {
    id: 'TARGET-01',
    name: 'MV Ocean Titan',
    mmsi: '419000123',
    bearingDeg: 42,
    distanceNm: 3.8,
    targetSpeedKts: 18.5,
    targetCourseDeg: 220,
    cpaNm: 0.2, // Critical CPA under 0.5 NM
    tcpaMin: 8.4,
    colregSituation: 'CROSSING_GIVE_WAY',
    recommendedAction: 'Rule 15 Crossing: We are Give-Way vessel. Alter course to STARBOARD by at least 25° to pass behind target stern.'
  },
  {
    id: 'TARGET-02',
    name: 'MT Arabian Gas',
    mmsi: '419000889',
    bearingDeg: 5,
    distanceNm: 5.2,
    targetSpeedKts: 14.0,
    targetCourseDeg: 185,
    cpaNm: 0.1, // Critical Head-On
    tcpaMin: 12.0,
    colregSituation: 'HEAD_ON',
    recommendedAction: 'Rule 14 Head-On: Both vessels shall alter course to STARBOARD so that each shall pass on the port side of the other.'
  },
  {
    id: 'TARGET-03',
    name: 'FV Star Fish 9',
    mmsi: '419000452',
    bearingDeg: 110,
    distanceNm: 2.1,
    targetSpeedKts: 6.0,
    targetCourseDeg: 90,
    cpaNm: 1.4, // Safe CPA
    tcpaMin: 18.2,
    colregSituation: 'OVERTAKING',
    recommendedAction: 'Rule 13 Overtaking: Keep clear of overtaken vessel. Pass safely on port or starboard berth.'
  }
];

export const CollisionAvoidanceView: React.FC = () => {
  const [ownCourse, setOwnCourse] = useState<number>(135);
  const [ownSpeed, setOwnSpeed] = useState<number>(15.0);
  const [selectedTargetId, setSelectedTargetId] = useState<string>('TARGET-01');
  const [safetyCpaLimitNm, setSafetyCpaLimitNm] = useState<number>(1.0);
  const [safetyTcpaLimitMin, setSafetyTcpaLimitMin] = useState<number>(15.0);

  const selectedTarget = SAMPLE_TARGETS.find((t) => t.id === selectedTargetId) || SAMPLE_TARGETS[0];
  const isDanger = selectedTarget.cpaNm < safetyCpaLimitNm && selectedTarget.tcpaMin < safetyTcpaLimitMin;

  return (
    <div id="collision-avoidance-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>IMO COLREG 1972 RADAR COLLISION AVOIDANCE COMPUTER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Crosshair className="w-6 h-6 text-rose-400" />
              <span>COLREGs Anti-Collision CPA / TCPA Radar</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Automatic Radar Plotting Aid (ARPA) vector calculator. Computes Closest Point of Approach (CPA), time to CPA (TCPA), and COLREG rule advisory.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block">SAFETY CPA</span>
              <strong className="text-rose-400 text-sm">{safetyCpaLimitNm} NM</strong>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block">SAFETY TCPA</span>
              <strong className="text-amber-400 text-sm">{safetyTcpaLimitMin} MIN</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Targets List + Radar Vector Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Target Vessels Selection Cards */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Tracked ARPA Radar Targets ({SAMPLE_TARGETS.length})</span>
          </h3>

          <div className="space-y-3">
            {SAMPLE_TARGETS.map((target) => {
              const targetIsDanger = target.cpaNm < safetyCpaLimitNm;
              const isSelected = target.id === selectedTargetId;

              return (
                <div
                  key={target.id}
                  onClick={() => setSelectedTargetId(target.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-xl font-mono ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
                    <div>
                      <strong className="text-white text-sm block">{target.name}</strong>
                      <span className="text-[10px] text-slate-400">MMSI: {target.mmsi}</span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        targetIsDanger
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                          : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      }`}
                    >
                      CPA {target.cpaNm} NM
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-300">
                    <div>
                      <span className="text-[9px] text-slate-500 block">BEARING</span>
                      <strong>{target.bearingDeg}°</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">DISTANCE</span>
                      <strong>{target.distanceNm} NM</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">TCPA</span>
                      <strong className={targetIsDanger ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                        {target.tcpaMin} MIN
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Target Radar Vector & COLREG Advisory */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
            {/* Header Status */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
              <span className="font-bold text-white flex items-center space-x-2">
                <Compass className="w-4 h-4 text-rose-400" />
                <span>SELECTED TARGET: {selectedTarget.name}</span>
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  isDanger
                    ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
                    : 'bg-emerald-950 border-emerald-500 text-emerald-200'
                }`}
              >
                {isDanger ? '⚠️ RISK OF COLLISION DETECTED' : '✅ SAFE CPA PASSING'}
              </span>
            </div>

            {/* Radar Canvas Box */}
            <div className="relative w-full h-72 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden my-2">
              {/* Radar Rings */}
              <div className="absolute w-60 h-60 rounded-full border border-slate-800/80" />
              <div className="absolute w-40 h-40 rounded-full border border-slate-800/80" />
              <div className="absolute w-20 h-20 rounded-full border border-slate-800/80" />

              {/* Own Ship (Center) */}
              <div className="absolute w-6 h-6 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center z-10 shadow-lg">
                <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full" />
              </div>
              <span className="absolute text-[10px] text-cyan-400 font-mono bottom-2 left-4">
                OWN SHIP (HDG {ownCourse}° | {ownSpeed} KTS)
              </span>

              {/* Target Ship Position */}
              <div
                className={`absolute w-7 h-7 rounded-full border-2 flex items-center justify-center z-20 shadow-xl ${
                  isDanger
                    ? 'bg-rose-500/80 border-rose-200 text-white animate-bounce'
                    : 'bg-emerald-500/80 border-emerald-200 text-white'
                }`}
                style={{ transform: 'translate(60px, -50px)' }}
              >
                <Crosshair className="w-4 h-4" />
              </div>

              {/* Relative Motion Line */}
              <div className="absolute top-1/3 left-1/2 w-32 h-0.5 bg-rose-500/60 border-t border-dashed border-rose-400" />
            </div>

            {/* COLREG Rule Advisory Banner */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs font-mono uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>MANDATORY IMO COLREG ADVISORY</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                {selectedTarget.recommendedAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
