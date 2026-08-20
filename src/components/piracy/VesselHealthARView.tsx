import React, { useState } from 'react';
import { Eye, Shield, Activity, Thermometer, Gauge, AlertCircle, CheckCircle2, Zap, Layers } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ARHUDMetric {
  id: string;
  subsystem: string;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
  value: string;
  sensorLocation: string;
  healthPct: number;
}

const AR_HUD_METRICS: ARHUDMetric[] = [
  {
    id: 'AR-01',
    subsystem: 'Citadel Air Scrubber & Oxygen Pressure',
    status: 'OPTIMAL',
    value: '21.0% O2 • 1013 mbar',
    sensorLocation: 'Armored Citadel Core',
    healthPct: 98
  },
  {
    id: 'AR-02',
    subsystem: 'Starboard Freeboard Razor Wire Barrier',
    status: 'OPTIMAL',
    value: 'Electrified 240V • Intact',
    sensorLocation: 'Deck Perimeter Starboard',
    healthPct: 100
  },
  {
    id: 'AR-03',
    subsystem: 'Main Engine Vibration & Thermal Hull Stress',
    status: 'WARNING',
    value: '84°C • 14.2 mm/s RMS',
    sensorLocation: 'Engine Shaft Room',
    healthPct: 82
  },
  {
    id: 'AR-04',
    subsystem: 'Watertight Door Seal Hydraulic Pressure',
    status: 'OPTIMAL',
    value: '210 BAR Lock Pressure',
    sensorLocation: 'Lower Deck Bulkheads',
    healthPct: 96
  }
];

export const VesselHealthARView: React.FC = () => {
  const [metrics, setMetrics] = useState<ARHUDMetric[]>(AR_HUD_METRICS);
  const [arOverlayMode, setArOverlayMode] = useState<'HULL_STRESS' | 'CITADEL_SEALS' | 'FIRE_MAINS'>('CITADEL_SEALS');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Augmented Reality (AR) Vessel Structural Health & Citadel Telemetry HUD</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time spatial AR overlay monitoring watertight integrity, door seals, citadel oxygen scrubber, and hull stress
          </p>
        </div>

        <div className="flex items-center space-x-1">
          {(['CITADEL_SEALS', 'HULL_STRESS', 'FIRE_MAINS'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setArOverlayMode(mode);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                arOverlayMode === mode
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {mode.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* AR HUD Visualizer Canvas */}
      <div className="relative w-full h-64 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-4 flex flex-col justify-between">
        {/* Spatial Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        {/* Top AR Header Overlay */}
        <div className="relative z-10 flex justify-between items-center text-[10px] font-bold text-cyan-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AR SPATIAL OVERLAY ACTIVE: {arOverlayMode}</span>
          </span>
          <span className="text-slate-400 font-mono">LAT: 04°12'N • LON: 006°52'E</span>
        </div>

        {/* Center Vessel Wireframe Graphic with AR Nodes */}
        <div className="relative z-10 my-auto flex items-center justify-center space-x-8">
          <div className="relative w-72 h-24 border-2 border-cyan-500/50 rounded-full flex items-center justify-around p-2 bg-cyan-500/5">
            {/* Front Bow Node */}
            <div className="relative group">
              <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="absolute -top-6 -left-6 bg-slate-900 border border-slate-800 text-[8px] text-emerald-300 font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                BOW WIRE: OK
              </span>
            </div>

            {/* Middle Citadel Node */}
            <div className="relative group">
              <div className="w-6 h-6 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_15px_#38bdf8] flex items-center justify-center text-slate-950 font-black text-[9px]">
                AR
              </div>
              <span className="absolute -top-7 -left-10 bg-slate-900 border border-cyan-500 text-[8px] text-cyan-300 font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                CITADEL: 1013 mbar O2
              </span>
            </div>

            {/* Aft Engine Room Node */}
            <div className="relative group">
              <div className="w-4 h-4 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
              <span className="absolute -top-6 -left-6 bg-slate-900 border border-slate-800 text-[8px] text-amber-300 font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                ENG: 84°C
              </span>
            </div>
          </div>
        </div>

        {/* Bottom AR Diagnostics Banner */}
        <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-400 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
          <span>STRUCTURAL HULL INTEGRITY: <strong className="text-emerald-400">99.4%</strong></span>
          <span>CITADEL AIR SCRUBBER: <strong className="text-cyan-300">NOMINAL</strong></span>
          <span>DOOR SEALS: <strong className="text-emerald-400 font-bold">210 BAR LOCK</strong></span>
        </div>
      </div>

      {/* AR Subsystems Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-white block">{metric.subsystem}</span>
                <span className="text-[9px] text-slate-500 block font-sans">{metric.sensorLocation}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                  metric.status === 'OPTIMAL'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}
              >
                {metric.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-[10px]">
              <span className="text-cyan-300 font-bold">{metric.value}</span>
              <span className="text-slate-400 font-bold">{metric.healthPct}% Health</span>
            </div>

            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${metric.healthPct > 90 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${metric.healthPct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
