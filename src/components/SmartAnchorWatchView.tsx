import React, { useState, useEffect } from 'react';
import {
  Anchor,
  ShieldAlert,
  Compass,
  Radio,
  Wind,
  Waves,
  Sliders,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  MapPin,
  Maximize2
} from 'lucide-react';

export const SmartAnchorWatchView: React.FC = () => {
  // Anchor Watch Parameters
  const [anchorLat, setAnchorLat] = useState<number>(18.912);
  const [anchorLng, setAnchorLng] = useState<number>(72.824);
  const [swingRadiusMeters, setSwingRadiusMeters] = useState<number>(120);
  const [currentDistanceMeters, setCurrentDistanceMeters] = useState<number>(45);
  const [chainShackles, setChainShackles] = useState<number>(5); // 1 Shackle = 27.5 meters
  const [seabedHolding, setSeabedHolding] = useState<'GOOD_MUD' | 'SAND' | 'POOR_ROCK'>('GOOD_MUD');
  const [isWatchActive, setIsWatchActive] = useState<boolean>(true);
  const [isAlarmTriggered, setIsAlarmTriggered] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Environmental Stressors
  const [windKnots, setWindKnots] = useState<number>(24);
  const [currentKnots, setCurrentKnots] = useState<number>(2.8);
  const [tensionPercent, setTensionPercent] = useState<number>(62);

  // Simulate small GPS drift jitter or test alarm trigger
  const triggerTestAlarm = () => {
    setCurrentDistanceMeters(swingRadiusMeters + 25);
    setIsAlarmTriggered(true);
  };

  const resetAnchorWatch = () => {
    setCurrentDistanceMeters(42);
    setIsAlarmTriggered(false);
  };

  useEffect(() => {
    if (currentDistanceMeters > swingRadiusMeters && isWatchActive) {
      setIsAlarmTriggered(true);
    } else {
      setIsAlarmTriggered(false);
    }
  }, [currentDistanceMeters, swingRadiusMeters, isWatchActive]);

  return (
    <div id="smart-anchor-watch-view" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Anchor className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>IMO RESOLUTION A.862 SAFETY OF ANCHORAGE MONITOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
              <span>Smart Anchor Watch & Drag Alarm Radar</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Continuous GPS position monitor for vessel anchor drag. Tracks swing circle radius, scope ratio, wind/current tension, and triggers instant acoustic alarms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsWatchActive(!isWatchActive)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs font-mono uppercase transition-all shadow-lg flex items-center space-x-2 border ${
                isWatchActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{isWatchActive ? 'WATCH ACTIVE' : 'WATCH PAUSED'}</span>
            </button>

            <button
              onClick={triggerTestAlarm}
              className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500 text-rose-300 border border-rose-500/50 rounded-xl font-bold text-xs font-mono transition-all flex items-center space-x-1.5"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>TEST ANCHOR DRAG ALARM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alarm Banner if Dragging Detected */}
      {isAlarmTriggered && (
        <div className="p-4 bg-rose-950 border-2 border-rose-500 rounded-2xl text-rose-200 text-xs sm:text-sm font-mono flex items-center justify-between animate-bounce shadow-2xl">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 animate-spin" />
            <div>
              <p className="font-bold text-rose-100 uppercase">
                ⚠️ CRITICAL ALARM: ANCHOR DRAG DETECTED!
              </p>
              <p className="text-rose-300 text-[11px]">
                Vessel distance from drop point ({currentDistanceMeters}m) exceeds safe swing radius ({swingRadiusMeters}m). Engage engine immediately!
              </p>
            </div>
          </div>
          <button
            onClick={resetAnchorWatch}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs"
          >
            RESET ALARM
          </button>
        </div>
      )}

      {/* Main Grid: Radar Canvas + Parameters Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Radar Circle Display (2 Spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 text-center relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs text-slate-300">
              <span className="font-bold text-white flex items-center space-x-2">
                <Compass className="w-4 h-4 text-amber-400 animate-spin" />
                <span>SWING CIRCLE RADAR DISPLAY</span>
              </span>
              <span className="text-amber-400">DROP COORD: 18° 54.7' N, 072° 49.4' E</span>
            </div>

            {/* Radar Circle Simulation Box */}
            <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden my-4">
              {/* Concentric Swing Circle Boundaries */}
              <div
                className="absolute rounded-full border border-dashed border-amber-500/30 flex items-center justify-center animate-pulse"
                style={{ width: '220px', height: '220px' }}
              >
                <span className="absolute top-2 text-[10px] text-amber-400 font-mono font-bold">
                  SWING RADIUS LIMIT: {swingRadiusMeters} M
                </span>
              </div>

              {/* Inner Safe Zone Circle */}
              <div
                className="absolute rounded-full border border-emerald-500/20 bg-emerald-500/5"
                style={{ width: '120px', height: '120px' }}
              />

              {/* Anchor Drop Center Pin */}
              <div className="absolute w-6 h-6 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center z-10 shadow-lg">
                <Anchor className="w-3.5 h-3.5 text-amber-300" />
              </div>

              {/* Current Ship Position Marker */}
              <div
                className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-xl z-20 ${
                  isAlarmTriggered
                    ? 'bg-rose-500/80 border-rose-300 text-white animate-ping'
                    : 'bg-emerald-500/80 border-emerald-200 text-white'
                }`}
                style={{
                  transform: `translate(${isAlarmTriggered ? '110px' : '35px'}, ${isAlarmTriggered ? '-80px' : '-25px'})`
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Distance Line vector */}
              <div className="absolute text-[10px] text-cyan-300 font-mono bottom-3 left-4 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                CURRENT DISTANCE TO ANCHOR: <strong className="text-white text-xs">{currentDistanceMeters} METERS</strong>
              </div>
            </div>

            {/* Telemetry Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block">CHAIN OUT (SCOPE)</span>
                <strong className="text-white text-sm">{chainShackles} Shackles ({chainShackles * 27.5}m)</strong>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block">SEABED HOLDING</span>
                <strong className="text-emerald-400 text-sm">{seabedHolding.replace('_', ' ')}</strong>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block">WIND SPEED</span>
                <strong className="text-amber-300 text-sm">{windKnots} Knots</strong>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block">TENSION STRESS</span>
                <strong className="text-cyan-400 text-sm">{tensionPercent}% Capacity</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Settings Sidebar (1 Span) */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Anchor Watch Configuration</span>
            </h3>

            {/* Swing Radius Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Swing Radius Limit:</span>
                <strong className="text-amber-400">{swingRadiusMeters} meters</strong>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={swingRadiusMeters}
                onChange={(e) => setSwingRadiusMeters(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Chain Shackles Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Chain Scope (Shackles):</span>
                <strong className="text-cyan-400">{chainShackles} Shackles</strong>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={chainShackles}
                onChange={(e) => setChainShackles(parseInt(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Seabed Holding Ground Selection */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-mono block">Seabed Holding Ground:</span>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {(
                  [
                    { id: 'GOOD_MUD', label: 'Soft Mud' },
                    { id: 'SAND', label: 'Coarse Sand' },
                    { id: 'POOR_ROCK', label: 'Rocky Bottom' }
                  ] as const
                ).map((sh) => (
                  <button
                    key={sh.id}
                    onClick={() => setSeabedHolding(sh.id)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      seabedHolding === sh.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {sh.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
