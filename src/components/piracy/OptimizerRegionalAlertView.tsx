import React, { useState } from 'react';
import { Sliders, Radio, Bell, ShieldCheck, Zap, AlertTriangle, CheckCircle2, Volume2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface RegionalAlertOptimizerConfig {
  proximityRadiusNM: number;
  noiseSuppressionLevel: 'AGGRESSIVE' | 'BALANCED' | 'ALL_NOTIFICATIONS';
  piracyThreatSensitivity: number; // 1-10
  weatherStormSensitivity: number; // 1-10
  cetaceanSpeciesSensitivity: number; // 1-10
  bridgeEcdisAutoPush: boolean;
  hapticSirenVibration: boolean;
  suppressDuplicateWindowMins: number;
}

export const OptimizerRegionalAlertView: React.FC = () => {
  const [config, setConfig] = useState<RegionalAlertOptimizerConfig>({
    proximityRadiusNM: 25,
    noiseSuppressionLevel: 'BALANCED',
    piracyThreatSensitivity: 9,
    weatherStormSensitivity: 8,
    cetaceanSpeciesSensitivity: 7,
    bridgeEcdisAutoPush: true,
    hapticSirenVibration: true,
    suppressDuplicateWindowMins: 15
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveOptimizer = () => {
    setSavedSuccess(true);
    hapticEngine.trigger('click');
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

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
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Regional Alert Optimization & Signal-to-Noise Tuning Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Calibrate geofence alert proximity radii, suppress false-positive warning noise, and auto-route priority alerts to ECDIS
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>NOISE FILTER OPTIMIZED</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Proximity & Noise Suppression */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4">
          <span className="text-[9px] text-amber-400 font-bold block">1. PROXIMITY GEOFENCE RADIUS & NOISE FILTER</span>

          {/* Proximity Radius Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-400 font-bold">ALERT PROXIMITY RADIUS:</span>
              <span className="text-amber-400 font-black text-sm">{config.proximityRadiusNM} NM</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={config.proximityRadiusNM}
              onChange={(e) => {
                setConfig(prev => ({ ...prev, proximityRadiusNM: parseInt(e.target.value) }));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-slate-500">
              <span>5 NM (Tight)</span>
              <span>25 NM (Standard)</span>
              <span>100 NM (Wide Ocean)</span>
            </div>
          </div>

          {/* Noise Suppression Selector */}
          <div className="space-y-1.5">
            <label className="text-[9px] text-slate-500 font-bold block">DUPLICATE NOISE SUPPRESSION:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'AGGRESSIVE', label: 'HIGH NOISE FILTER' },
                { id: 'BALANCED', label: 'BALANCED' },
                { id: 'ALL_NOTIFICATIONS', label: 'SHOW ALL' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setConfig(prev => ({ ...prev, noiseSuppressionLevel: m.id as any }));
                    hapticEngine.trigger('click');
                  }}
                  className={`p-2 rounded-xl border text-[8px] font-bold transition-all ${
                    config.noiseSuppressionLevel === m.id
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Deduplication Time Window */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[9px]">
              <span className="text-slate-400 font-bold">DEDUPLICATION DWELL TIME:</span>
              <span className="text-cyan-300 font-bold">{config.suppressDuplicateWindowMins} Mins</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={config.suppressDuplicateWindowMins}
              onChange={(e) => {
                setConfig(prev => ({ ...prev, suppressDuplicateWindowMins: parseInt(e.target.value) }));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Category Sensitivity & ECDIS Integration */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4">
          <span className="text-[9px] text-amber-400 font-bold block">2. CATEGORY THREAT SENSITIVITY SLIDERS</span>

          {/* Piracy Sensitivity */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px]">
              <span className="text-rose-400 font-bold">PIRACY & SKIFF SENSITIVITY:</span>
              <span className="text-rose-400 font-black">{config.piracyThreatSensitivity} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={config.piracyThreatSensitivity}
              onChange={(e) => {
                setConfig(prev => ({ ...prev, piracyThreatSensitivity: parseInt(e.target.value) }));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Weather Sensitivity */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px]">
              <span className="text-amber-400 font-bold">WEATHER & STORM SENSITIVITY:</span>
              <span className="text-amber-400 font-black">{config.weatherStormSensitivity} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={config.weatherStormSensitivity}
              onChange={(e) => {
                setConfig(prev => ({ ...prev, weatherStormSensitivity: parseInt(e.target.value) }));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Toggles: ECDIS Auto Push & Haptic */}
          <div className="space-y-2 pt-2 border-t border-slate-900">
            <button
              onClick={() => {
                setConfig(prev => ({ ...prev, bridgeEcdisAutoPush: !prev.bridgeEcdisAutoPush }));
                hapticEngine.trigger('click');
              }}
              className={`w-full p-2.5 rounded-xl border text-[9px] font-bold flex items-center justify-between transition-all ${
                config.bridgeEcdisAutoPush
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5" />
                <span>Auto-push Critical Alerts to Bridge ECDIS Display</span>
              </span>
              <span className="font-mono font-bold">{config.bridgeEcdisAutoPush ? 'ENABLED' : 'DISABLED'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSaveOptimizer}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs flex items-center space-x-2 transition-all shadow-lg"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>OPTIMIZER THRESHOLDS SAVED</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-slate-950" />
              <span>APPLY OPTIMIZER SETTINGS</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
