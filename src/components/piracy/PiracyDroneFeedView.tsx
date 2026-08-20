import React, { useState, useEffect } from 'react';
import { Camera, Eye, Radio, Shield, Crosshair, ZoomIn, ZoomOut, Zap, Navigation, Battery, Signal, RefreshCw, AlertTriangle } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export const PiracyDroneFeedView: React.FC = () => {
  const [visionMode, setVisionMode] = useState<'THERMAL' | 'NIGHT_VISION' | 'RGB'>('THERMAL');
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [droneStatus, setDroneStatus] = useState<'IN_FLIGHT' | 'RETURNING' | 'DOCKED'>('IN_FLIGHT');
  const [batteryPct, setBatteryPct] = useState<number>(84);
  const [altitudeMeters, setAltitudeMeters] = useState<number>(145);
  const [targetLocked, setTargetLocked] = useState<boolean>(true);
  const [lockedTargetDistance, setLockedTargetDistance] = useState<number>(1.4);

  // Simulated live telemetry movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (droneStatus === 'IN_FLIGHT') {
        setAltitudeMeters((prev) => Math.max(120, Math.min(180, prev + (Math.random() * 4 - 2))));
        setLockedTargetDistance((prev) => Math.max(0.4, parseFloat((prev + (Math.random() * 0.04 - 0.02)).toFixed(2))));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [droneStatus]);

  const handleLaunchOrRTH = () => {
    hapticEngine.trigger('alert');
    if (droneStatus === 'IN_FLIGHT') {
      setDroneStatus('RETURNING');
      setTimeout(() => {
        setDroneStatus('DOCKED');
      }, 3000);
    } else {
      setDroneStatus('IN_FLIGHT');
      setBatteryPct(98);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Tactical UAV Drone Aerial Reconnaissance Feed</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Autonomous tethered surveillance drone delivering 360° optical/FLIR thermal tracking of approaching skiffs
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleLaunchOrRTH}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow transition-all ${
              droneStatus === 'IN_FLIGHT'
                ? 'bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900'
                : 'bg-emerald-500 text-slate-950 font-black'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{droneStatus === 'IN_FLIGHT' ? 'ORDER RETURN TO HOME (RTH)' : 'LAUNCH SURVEILLANCE DRONE'}</span>
          </button>
        </div>
      </div>

      {/* Drone Video Viewport with HUD Overlays */}
      <div
        className={`relative w-full h-80 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between p-4 transition-colors duration-500 ${
          visionMode === 'THERMAL'
            ? 'bg-gradient-to-b from-indigo-950 via-slate-950 to-purple-950'
            : visionMode === 'NIGHT_VISION'
            ? 'bg-gradient-to-b from-emerald-950 via-slate-950 to-green-950'
            : 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900'
        }`}
      >
        {/* Animated Radar Grid Background Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        {/* Top Telemetry Overlay */}
        <div className="relative z-10 flex justify-between items-start text-[10px] font-bold text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE UAV FEED</span>
            </span>
            <span>ALT: <strong className="text-white">{altitudeMeters.toFixed(0)}m</strong></span>
            <span>SPEED: <strong className="text-white">42 KTS</strong></span>
            <span>ZOOM: <strong className="text-cyan-400">{zoomLevel}x</strong></span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-slate-300">
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
              <span>{batteryPct}%</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-300">
              <Signal className="w-3.5 h-3.5 text-cyan-400" />
              <span>99% LINK</span>
            </span>
          </div>
        </div>

        {/* Center Target Lock Reticle with Animated Scanner */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          {droneStatus === 'IN_FLIGHT' ? (
            <div className="relative flex items-center justify-center">
              {/* Target Bounding Box Animation */}
              <div
                className={`w-32 h-32 border-2 rounded-2xl flex flex-col items-center justify-between p-1 transition-all duration-300 ${
                  targetLocked ? 'border-rose-500 bg-rose-500/10 animate-pulse' : 'border-cyan-400/60'
                }`}
              >
                <div className="w-full flex justify-between text-[8px] font-black text-rose-400">
                  <span>TARGET LOCK</span>
                  <span>SKIFF #01</span>
                </div>

                {/* Crosshair Center */}
                <Crosshair className="w-8 h-8 text-rose-400 animate-spin" style={{ animationDuration: '8s' }} />

                <div className="w-full text-center text-[9px] font-bold text-rose-300">
                  RANGE: {lockedTargetDistance} NM
                </div>
              </div>

              {/* Thermal Skiff Blob Visualizer */}
              <div className="absolute w-12 h-6 bg-gradient-to-r from-amber-500 via-rose-500 to-yellow-400 blur-sm rounded-full opacity-80" />
            </div>
          ) : (
            <div className="text-center space-y-1">
              <Shield className="w-8 h-8 text-slate-600 mx-auto" />
              <span className="text-slate-500 font-bold block">UAV DOCKED IN SHIP RECHARGING BAY</span>
            </div>
          )}
        </div>

        {/* Bottom Camera Controls Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Vision Spectrum:</span>
            {(['THERMAL', 'NIGHT_VISION', 'RGB'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setVisionMode(mode);
                  hapticEngine.trigger('click');
                }}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition-all ${
                  visionMode === mode
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setZoomLevel((prev) => Math.max(1, prev - 2));
                hapticEngine.trigger('click');
              }}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-bold text-cyan-300">{zoomLevel}x Optical</span>
            <button
              onClick={() => {
                setZoomLevel((prev) => Math.min(20, prev + 2));
                hapticEngine.trigger('click');
              }}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
