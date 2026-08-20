import React, { useState } from 'react';
import {
  Siren,
  Eye,
  Crosshair,
  Compass,
  AlertOctagon,
  Flame,
  Radio,
  LifeBuoy,
  Volume2,
  VolumeX,
  Layers,
  Zap,
  CheckCircle2,
  Camera,
  Maximize2,
  ShieldAlert,
  Sun,
  Moon
} from 'lucide-react';

interface ArHazardTarget {
  id: string;
  label: string;
  type: 'MAN_OVERBOARD' | 'COLLISION_COURSE' | 'EPIRB_BEACON' | 'SHALLOW_SHOAL';
  bearingDeg: number;
  distanceNm: number;
  timeToImpactMin?: number;
  coordinates: string;
  color: string;
  screenX: number; // percentage on HUD
  screenY: number; // percentage on HUD
}

const HUD_HAZARDS: ArHazardTarget[] = [
  {
    id: 'HZ-01',
    label: 'SOLAS MOB DISTRESS BEACON',
    type: 'MAN_OVERBOARD',
    bearingDeg: 42,
    distanceNm: 0.8,
    coordinates: '6.9420° N, 79.8310° E',
    color: '#f43f5e',
    screenX: 32,
    screenY: 42
  },
  {
    id: 'HZ-02',
    label: 'UNIDENTIFIED SPEEDBOAT (28 KTS) - COLLISION VECTOR',
    type: 'COLLISION_COURSE',
    bearingDeg: 285,
    distanceNm: 2.1,
    timeToImpactMin: 4.2,
    coordinates: '6.9800° N, 79.7900° E',
    color: '#f59e0b',
    screenX: 68,
    screenY: 35
  },
  {
    id: 'HZ-03',
    label: 'UNCHARTED CORAL SHOAL (-3.2M DEPTH)',
    type: 'SHALLOW_SHOAL',
    bearingDeg: 190,
    distanceNm: 1.4,
    coordinates: '6.9100° N, 79.8200° E',
    color: '#38bdf8',
    screenX: 50,
    screenY: 65
  }
];

export const EmergencyArOverlayView: React.FC = () => {
  const [hudVisionMode, setHudVisionMode] = useState<'THERMAL' | 'NIGHT_VISION' | 'OPTICAL_AR'>('THERMAL');
  const [selectedHazardId, setSelectedHazardId] = useState<string>(HUD_HAZARDS[0].id);
  const [isSirenActive, setIsSirenActive] = useState(true);
  const [headingDeg, setHeadingDeg] = useState(45);
  const [shipSpeedKts, setShipSpeedKts] = useState(18.2);

  const selectedHazard = HUD_HAZARDS.find((h) => h.id === selectedHazardId) || HUD_HAZARDS[0];

  const getHudBgClass = () => {
    switch (hudVisionMode) {
      case 'THERMAL':
        return 'bg-gradient-to-b from-purple-950 via-slate-950 to-indigo-950 border-purple-500/50';
      case 'NIGHT_VISION':
        return 'bg-gradient-to-b from-emerald-950 via-slate-950 to-teal-950 border-emerald-500/50';
      case 'OPTICAL_AR':
        return 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-sky-500/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-rose-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
              FLIR THERMAL / NIGHT VISION HUD
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              SOLAS CHAPTER V EMERGENCY
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center space-x-2">
            <Crosshair className="w-7 h-7 text-rose-400" />
            <span>Emergency AR Overlay & Optical Hazard Reticle</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Augmented Reality heads-up display camera feed with FLIR thermal vision, collision vector tracking, EPIRB distress beacon overlays, and SOLAS distress response controls.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsSirenActive(!isSirenActive)}
            className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center space-x-2 ${
              isSirenActive
                ? 'bg-rose-500 text-slate-950 border-rose-400 animate-pulse'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            {isSirenActive ? <Siren className="w-4 h-4 animate-spin" /> : <VolumeX className="w-4 h-4" />}
            <span>{isSirenActive ? 'EMERGENCY SIREN ACTIVE' : 'SIREN MUTED'}</span>
          </button>
        </div>
      </div>

      {/* Vision Mode Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <span className="text-slate-400 font-bold flex items-center space-x-2">
          <Eye className="w-4 h-4 text-sky-400" />
          <span>HUD CAMERA OPTICAL SPECTRUM:</span>
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setHudVisionMode('THERMAL')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              hudVisionMode === 'THERMAL'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            FLIR THERMAL INFRARED
          </button>

          <button
            onClick={() => setHudVisionMode('NIGHT_VISION')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              hudVisionMode === 'NIGHT_VISION'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            NIGHT VISION (GREEN FLOUR)
          </button>

          <button
            onClick={() => setHudVisionMode('OPTICAL_AR')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              hudVisionMode === 'OPTICAL_AR'
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 font-bold'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            DAYLIGHT OPTICAL AR
          </button>
        </div>
      </div>

      {/* Main Grid: HUD Viewport & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left 2 Columns: Simulated Camera Viewport */}
        <div className={`lg:col-span-2 relative h-96 border-2 rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-2xl transition-all ${getHudBgClass()}`}>
          {/* HUD Crosshair Center Marker */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-32 h-32 border border-dashed border-sky-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            </div>
            <div className="absolute w-full h-[1px] bg-sky-500/30" />
            <div className="absolute h-full w-[1px] bg-sky-500/30" />
          </div>

          {/* Top Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <Compass className="w-5 h-5 text-sky-400 animate-spin" />
              <div>
                <span className="text-[10px] text-slate-400 block">HEADING / SPEED</span>
                <strong className="text-white text-sm">{headingDeg}° TRUE • {shipSpeedKts} KTS</strong>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-black uppercase text-[10px]">
              {hudVisionMode} HUD ACTIVE
            </span>
          </div>

          {/* Simulated AR Target Overlays */}
          {HUD_HAZARDS.map((hz) => {
            const isSelected = selectedHazardId === hz.id;
            return (
              <div
                key={hz.id}
                onClick={() => setSelectedHazardId(hz.id)}
                className={`absolute cursor-pointer transition-all -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-xl border-2 backdrop-blur-md shadow-2xl flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-slate-950/90 ring-4 ring-rose-500/50 z-30 scale-110'
                    : 'bg-slate-950/70 border-slate-800 z-20 hover:scale-105'
                }`}
                style={{
                  top: `${hz.screenY}%`,
                  left: `${hz.screenX}%`,
                  borderColor: hz.color
                }}
              >
                <span
                  className="w-3 h-3 rounded-full animate-ping shrink-0"
                  style={{ backgroundColor: hz.color }}
                />
                <div>
                  <span className="font-black text-white text-[11px] block">{hz.label}</span>
                  <span className="text-[9px] text-slate-300">
                    Bearing: {hz.bearingDeg}° • Dist: {hz.distanceNm} NM
                  </span>
                </div>
              </div>
            );
          })}

          {/* Bottom Telemetry Footer */}
          <div className="relative z-10 flex justify-between text-[10px] text-slate-400 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span>POSITION: 06°56.40' N, 079°49.80' E</span>
            <span>VHF CH 16 / 70 DSC WATCH</span>
            <span>IR SENSOR TEMP: 24.2°C</span>
          </div>
        </div>

        {/* Right Column: Selected Target & Emergency Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] text-rose-400 font-bold block uppercase">
              TARGET LOCK TELEMETRY
            </span>
            <h3 className="text-lg font-black text-white">{selectedHazard.label}</h3>
            <p className="text-xs text-slate-400">{selectedHazard.coordinates}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">BEARING</span>
              <p className="text-base font-black text-sky-400">{selectedHazard.bearingDeg}° TRUE</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">DISTANCE</span>
              <p className="text-base font-black text-amber-400">{selectedHazard.distanceNm} NM</p>
            </div>
          </div>

          {/* SOLAS Response Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => alert(`MAYDAY DISTRESS TRANSMITTED FOR ${selectedHazard.label} ON VHF CH 16!`)}
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2"
            >
              <Siren className="w-4 h-4" />
              <span>TRANSMIT MAYDAY / VHF CH 16</span>
            </button>

            <button
              onClick={() => alert('MARK MOB COORDINATES SAVED TO ECDIS NAVIGATOR.')}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center space-x-2"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>MARK MOB WAYPOINT ON ECDIS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
