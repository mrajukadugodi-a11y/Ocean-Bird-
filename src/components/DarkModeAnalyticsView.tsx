import React, { useState } from 'react';
import { Moon, Eye, Sun, Zap, ShieldCheck, Activity, BarChart3, Sliders, BatteryCharging, Flame, Layers, Sparkles } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const DARK_MODE_TELEMETRY_HOURLY = [
  { hour: '20:00', bridgeLuminanceCd: 120, eyeStrainScore: 18, oledWattage: 18.2, nightVisionRetainedPercent: 82 },
  { hour: '22:00', bridgeLuminanceCd: 85, eyeStrainScore: 12, oledWattage: 12.8, nightVisionRetainedPercent: 89 },
  { hour: '00:00', bridgeLuminanceCd: 40, eyeStrainScore: 6, oledWattage: 7.4, nightVisionRetainedPercent: 96 },
  { hour: '02:00', bridgeLuminanceCd: 25, eyeStrainScore: 4, oledWattage: 5.1, nightVisionRetainedPercent: 98 },
  { hour: '04:00', bridgeLuminanceCd: 25, eyeStrainScore: 3, oledWattage: 5.0, nightVisionRetainedPercent: 99 },
  { hour: '06:00', bridgeLuminanceCd: 60, eyeStrainScore: 8, oledWattage: 9.8, nightVisionRetainedPercent: 92 }
];

export const FLEET_DARK_MODE_ADOPTION = [
  { vesselType: 'Crude Tankers', darkWatchHoursPct: 98, fuelEnergySavedMj: 1420 },
  { vesselType: 'Container Ships', darkWatchHoursPct: 94, fuelEnergySavedMj: 1850 },
  { vesselType: 'Cruise Vessels', darkWatchHoursPct: 88, fuelEnergySavedMj: 980 },
  { vesselType: 'Bulk Carriers', darkWatchHoursPct: 96, fuelEnergySavedMj: 1210 },
  { vesselType: 'Offshore Tugs', darkWatchHoursPct: 92, fuelEnergySavedMj: 650 }
];

export const DarkModeAnalyticsView: React.FC = () => {
  const [spectrumMode, setSpectrumMode] = useState<'red-650' | 'slate-night' | 'emerald-tactical'>('red-650');
  const [backlightPwm, setBacklightPwm] = useState<number>(15);
  const [contrastRatio, setContrastRatio] = useState<number>(95);
  const [redSaturation, setRedSaturation] = useState<number>(85);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Moon className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>NIGHT WATCH TELEMETRY & BRIDGE LIGHTING ANALYTICS</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Eye className="w-6 h-6 text-rose-400" />
            <span>Dark Mode Analytics & Night Vision Bridge Optimization</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time telemetry measuring bridge console luminescence, seafarer scotopic eye adaptation (rhodopsin retention), and OLED power reduction.
          </p>
        </div>

        {/* Night Vision Spectrum Toggles */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs">
          <span className="text-slate-400 font-bold px-2">SPECTRUM:</span>
          {[
            { id: 'red-650', label: '🔴 650nm Red Spectrum (Bridge Standard)' },
            { id: 'slate-night', label: '🌙 Dark Slate OLED' },
            { id: 'emerald-tactical', label: '🟢 Night Vision NVG' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSpectrumMode(mode.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                spectrumMode === mode.id
                  ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase block">RHODOPSIN EYE ADAPTATION</span>
          <strong className="text-2xl font-black text-rose-400 block">99.2%</strong>
          <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>0% Night Blindness Hazard</span>
          </span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase block">OLED DISPLAY POWER SAVED</span>
          <strong className="text-2xl font-black text-emerald-400 block">-38.4 Watts</strong>
          <span className="text-[10px] text-slate-400">~1.2 MT annual fuel saving on bridge power</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase block">GLARE ELIMINATION INDEX</span>
          <strong className="text-2xl font-black text-cyan-400 block">94.8%</strong>
          <span className="text-[10px] text-cyan-300">ISO 8468 Bridge Ergonomics Compliant</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase block">AVERAGE NIGHT LUMINANCE</span>
          <strong className="text-2xl font-black text-amber-300 block">25.0 cd/m²</strong>
          <span className="text-[10px] text-slate-400">Ultra-low PWM Backlight Dimmed</span>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Bridge Luminescence & Rhodopsin Retention Chart */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <Activity className="w-4 h-4 text-rose-400" />
              <span>Bridge Console Luminescence vs Eye Adaptation</span>
            </h3>
            <span className="text-[10px] font-mono text-rose-400 font-bold">NIGHT WATCH 00:00 - 06:00</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DARK_MODE_TELEMETRY_HOURLY} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="roseGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="nightVisionRetainedPercent" name="Scotopic Rhodopsin Retention (%)" stroke="#f43f5e" fill="url(#roseGlow)" />
                <Area type="monotone" dataKey="bridgeLuminanceCd" name="Console Luminescence (cd/m²)" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Vessel Dark Mode Energy Savings */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Fleet Dark Mode Adoption & Power Savings (MJ)</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">FLEETWIDE SAVINGS</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FLEET_DARK_MODE_ADOPTION} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="vesselType" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                />
                <Bar dataKey="fuelEnergySavedMj" name="Saved Energy (Megajoules)" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Display Calibration Controls */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h4 className="font-bold text-white flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-rose-400" />
            <span>Bridge Screen Night-Vision Calibration Controls</span>
          </h4>
          <span className="text-[10px] text-slate-400">IMO RESOLUTION MSC.192(79) COMPLIANT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">PWM Backlight Level:</span>
              <strong className="text-rose-400">{backlightPwm}%</strong>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={backlightPwm}
              onChange={(e) => setBacklightPwm(Number(e.target.value))}
              className="w-full accent-rose-500 bg-slate-900 rounded-lg cursor-pointer h-2"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Night Vision Contrast:</span>
              <strong className="text-cyan-300">{contrastRatio}%</strong>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={contrastRatio}
              onChange={(e) => setContrastRatio(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-900 rounded-lg cursor-pointer h-2"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">650nm Red Saturation:</span>
              <strong className="text-amber-300">{redSaturation}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={redSaturation}
              onChange={(e) => setRedSaturation(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-900 rounded-lg cursor-pointer h-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
