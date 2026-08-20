import React, { useState, useEffect } from 'react';
import {
  Activity,
  Heart,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Ship,
  Thermometer,
  Droplet,
  Flame,
  RefreshCw,
  Gauge,
  Zap,
  Volume2,
  ChevronRight,
  Download
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface CylinderHealth {
  cylinderNo: number;
  exhaustTempC: number;
  peakPressureBar: number;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
}

const INITIAL_CYLINDERS: CylinderHealth[] = [
  { cylinderNo: 1, exhaustTempC: 382, peakPressureBar: 142, status: 'OPTIMAL' },
  { cylinderNo: 2, exhaustTempC: 385, peakPressureBar: 144, status: 'OPTIMAL' },
  { cylinderNo: 3, exhaustTempC: 388, peakPressureBar: 141, status: 'OPTIMAL' },
  { cylinderNo: 4, exhaustTempC: 402, peakPressureBar: 138, status: 'WARNING' },
  { cylinderNo: 5, exhaustTempC: 381, peakPressureBar: 143, status: 'OPTIMAL' },
  { cylinderNo: 6, exhaustTempC: 384, peakPressureBar: 145, status: 'OPTIMAL' },
  { cylinderNo: 7, exhaustTempC: 386, peakPressureBar: 142, status: 'OPTIMAL' },
  { cylinderNo: 8, exhaustTempC: 380, peakPressureBar: 144, status: 'OPTIMAL' }
];

export const VesselsHealthPulseView: React.FC = () => {
  const [pulseRpm, setPulseRpm] = useState<number>(104);
  const [cylinders, setCylinders] = useState<CylinderHealth[]>(INITIAL_CYLINDERS);
  const [overallHealthScore, setOverallHealthScore] = useState<number>(96);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor live engine fluctuations
      setPulseRpm((prev) => 102 + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    hapticEngine.trigger('click');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 font-mono animate-fadeIn pb-12">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-5 h-5 animate-pulse text-rose-500" />
              <span>Real-Time Main Engine & Shaft Stethoscope Pulse</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Vessels Health Pulse & Acoustic Stethoscope
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              ECG-style pulse analysis for MAN B&W and Wärtsilä 2-stroke propulsion engines, cylinder pressure balancing, and lube oil degradation telemetry.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => showToast('Engine Health Diagnostic Pulse Log Exported!')}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-xl transition-all"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>EXPORT ENGINE LOG</span>
            </button>
          </div>
        </div>
      </div>

      {/* LIVE ENGINE PULSE ECG CANVA DISPLAY */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase">
            <Activity className="w-4 h-4 animate-bounce" />
            <span>Main Engine Pulse Rate: {pulseRpm} RPM</span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-800 font-bold">
            Health Score: {overallHealthScore}%
          </span>
        </div>

        {/* Animated ECG Waveform Visualizer */}
        <div className="h-32 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          <div className="w-full flex items-center justify-around px-4">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-gradient-to-t from-cyan-500 to-rose-500 rounded-full animate-pulse"
                style={{
                  height: `${20 + Math.sin(i + Date.now() / 200) * 40}%`,
                  animationDelay: `${i * 80}ms`
                }}
              />
            ))}
          </div>

          <div className="absolute bottom-3 right-4 bg-slate-900/90 border border-slate-800 text-cyan-300 text-[10px] font-mono px-3 py-1 rounded-lg">
            MAN B&W 8S90ME-C9.2 • 8 Cylinders
          </div>
        </div>
      </div>

      {/* 8-CYLINDER TELEMETRY MATRIX */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase">
            <Flame className="w-4 h-4" />
            <span>Cylinder Exhaust & Combustion Peak Pressure</span>
          </div>
          <span className="text-[10px] text-slate-400">Normal Range: 370°C - 395°C</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {cylinders.map((c) => (
            <div
              key={c.cylinderNo}
              className={`p-3 rounded-2xl border flex flex-col justify-between space-y-2 text-center transition-all ${
                c.status === 'WARNING'
                  ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
                  : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-400 uppercase">Cyl #{c.cylinderNo}</div>
              <div className="text-base font-black text-white">{c.exhaustTempC}°C</div>
              <div className="text-[10px] text-cyan-300 font-bold">{c.peakPressureBar} Bar</div>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                c.status === 'WARNING' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
