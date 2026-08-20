import React, { useState } from 'react';
import {
  Eye,
  Crosshair,
  Compass,
  Radio,
  ShieldAlert,
  Sun,
  Moon,
  Video,
  Camera,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export interface ArVesselTarget {
  id: string;
  name: string;
  mmsi: string;
  bearingDeg: number;
  distanceNm: number;
  cpaNm: number;
  tcpaMin: number;
  status: 'DANGER' | 'SAFE' | 'WARNING';
  screenXPercent: number; // Position on simulated camera HUD
  screenYPercent: number;
}

const AR_TARGETS: ArVesselTarget[] = [
  {
    id: 'AR-01',
    name: 'MV Ocean Titan (Container)',
    mmsi: '419000123',
    bearingDeg: 42,
    distanceNm: 3.8,
    cpaNm: 0.2,
    tcpaMin: 8.4,
    status: 'DANGER',
    screenXPercent: 62,
    screenYPercent: 44
  },
  {
    id: 'AR-02',
    name: 'MT Arabian Gas (LPG)',
    mmsi: '419000889',
    bearingDeg: 5,
    distanceNm: 5.2,
    cpaNm: 0.1,
    tcpaMin: 12.0,
    status: 'DANGER',
    screenXPercent: 48,
    screenYPercent: 38
  },
  {
    id: 'AR-03',
    name: 'Fairway Channel Buoy #2',
    mmsi: 'BUOY-02',
    bearingDeg: 345,
    distanceNm: 1.2,
    cpaNm: 1.1,
    tcpaMin: 15.0,
    status: 'SAFE',
    screenXPercent: 28,
    screenYPercent: 55
  }
];

export const MarineArView: React.FC = () => {
  const [selectedArTarget, setSelectedArTarget] = useState<ArVesselTarget>(AR_TARGETS[0]);
  const [isThermalNightVision, setIsThermalNightVision] = useState<boolean>(false);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);

  return (
    <div id="marine-ar-view" className="space-y-6 font-mono">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Eye className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>AUGMENTED REALITY (AR) WHEELHOUSE HEADS-UP DISPLAY (HUD)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Crosshair className="w-6 h-6 text-rose-400" />
              <span>Marine Optical AR Horizon HUD</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Real-time bridge camera video feed overlay with AIS target bounding boxes, COLREG collision threat vector lines, and night-vision thermal imaging.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsThermalNightVision(!isThermalNightVision)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-2 ${
                isThermalNightVision
                  ? 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Moon className="w-4 h-4 text-rose-400" />
              <span>{isThermalNightVision ? 'THERMAL FLIR (ON)' : 'DAYLIGHT OPTIC'}</span>
            </button>

            <button
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-1.5"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{showBoundingBoxes ? 'HIDE AR HUD' : 'SHOW AR HUD'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AR HUD Camera Canvas Simulator Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-4">
        <div
          className={`relative w-full h-[420px] rounded-2xl border-2 overflow-hidden flex flex-col justify-between p-4 transition-all ${
            isThermalNightVision
              ? 'bg-gradient-to-b from-rose-950 via-slate-950 to-slate-950 border-rose-500/80'
              : 'bg-gradient-to-b from-sky-950 via-slate-950 to-teal-950/60 border-slate-800'
          }`}
        >
          {/* Simulated Horizon Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 border-t border-dashed border-cyan-500/40 pointer-events-none" />

          {/* Top Compass Tape Overlay */}
          <div className="w-full flex justify-center pointer-events-none">
            <div className="bg-slate-950/80 backdrop-blur-md border border-cyan-500/50 px-6 py-1.5 rounded-full text-cyan-400 text-xs font-bold tracking-widest flex items-center space-x-6">
              <span>350°</span>
              <span>000° (N)</span>
              <span className="text-rose-400 text-sm font-extrabold underline">HDG 012°</span>
              <span>020°</span>
              <span>030°</span>
            </div>
          </div>

          {/* Gyro Center Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full border border-cyan-500/40 flex items-center justify-center">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            </div>
          </div>

          {/* Floating AR Target Bounding Boxes */}
          {showBoundingBoxes &&
            AR_TARGETS.map((target) => {
              const isSelected = selectedArTarget.id === target.id;
              const isDanger = target.status === 'DANGER';

              return (
                <div
                  key={target.id}
                  onClick={() => setSelectedArTarget(target)}
                  className={`absolute p-2.5 rounded-xl border cursor-pointer transition-all shadow-2xl ${
                    isDanger
                      ? 'bg-rose-950/80 border-rose-500 ring-2 ring-rose-500 animate-pulse text-rose-200'
                      : 'bg-slate-950/80 border-cyan-500 text-cyan-200'
                  }`}
                  style={{
                    left: `${target.screenXPercent}%`,
                    top: `${target.screenYPercent}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="flex items-center space-x-1 border-b border-slate-800 pb-1 mb-1 text-[10px] font-bold">
                    <Crosshair className="w-3 h-3 text-rose-400" />
                    <span>{target.name}</span>
                  </div>

                  <div className="text-[9px] space-y-0.5">
                    <div>DIST: <strong>{target.distanceNm} NM</strong> • BRG: {target.bearingDeg}°</div>
                    {isDanger && (
                      <div className="text-rose-400 font-extrabold">
                        ⚠️ CPA: {target.cpaNm} NM (TCPA: {target.tcpaMin} MIN)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Bottom HUD Telemetry Strip */}
          <div className="w-full flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 pointer-events-none">
            <div className="flex items-center space-x-4">
              <span className="text-cyan-400 font-bold">CAM: BRIDGE OPTICAL #01</span>
              <span>PITCH: +0.4°</span>
              <span>ROLL: -1.2°</span>
            </div>

            <div className="text-rose-400 font-bold">
              AR OVERLAY: {AR_TARGETS.length} TRACKED TARGETS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
