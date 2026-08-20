import React, { useState } from 'react';
import { Radio, Volume2, Zap, CheckCircle2, Sliders, ShieldAlert, Vibrate } from 'lucide-react';
import { hapticEngine, HapticPattern } from '../../utils/hapticUtils';

export const HapticAlertToggleView: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(hapticEngine.isEnabled());
  const [intensity, setIntensity] = useState<'subtle' | 'standard' | 'intense'>(hapticEngine.getIntensity());
  const [lastTestedPattern, setLastTestedPattern] = useState<string | null>(null);

  const toggleHaptics = () => {
    const nextVal = !isEnabled;
    setIsEnabled(nextVal);
    hapticEngine.setEnabled(nextVal);
    if (nextVal) {
      hapticEngine.trigger('success');
    }
  };

  const changeIntensity = (val: 'subtle' | 'standard' | 'intense') => {
    setIntensity(val);
    hapticEngine.setIntensity(val);
    hapticEngine.trigger('medium');
  };

  const testPattern = (pattern: HapticPattern) => {
    hapticEngine.trigger(pattern);
    setLastTestedPattern(pattern);
    setTimeout(() => setLastTestedPattern(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Tactile Haptic Vibration Feedback & Seafarer Alarm Pulse Controller</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Enable or configure physical device haptic vibrations for critical piracy alerts, bridge warnings, and navigation clicks
          </p>
        </div>

        <button
          onClick={toggleHaptics}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
            isEnabled
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'bg-slate-950 text-slate-500 border border-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>HAPTICS: {isEnabled ? 'ENABLED' : 'DISABLED'}</span>
        </button>
      </div>

      {/* Intensity Selector */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-white font-mono block">Vibration Intensity Scaling Level</span>

        <div className="grid grid-cols-3 gap-2">
          {(['subtle', 'standard', 'intense'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => changeIntensity(lvl)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                intensity === lvl
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-black'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] uppercase block font-bold">{lvl}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Haptic Pattern Tester */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-white font-mono block">Test Haptic Vibration Pulse Patterns</span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['click', 'light', 'medium', 'heavy', 'scan', 'success', 'alert', 'sos'] as HapticPattern[]).map((pattern) => (
            <button
              key={pattern}
              onClick={() => testPattern(pattern)}
              className={`p-2.5 rounded-xl border text-center transition-all font-mono text-[9px] uppercase font-bold ${
                lastTestedPattern === pattern
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                  : pattern === 'sos' || pattern === 'alert'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{pattern} PULSE</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
