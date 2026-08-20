import React, { useState, useEffect } from 'react';
import { Activity, Radio, Volume2, VolumeX, Sliders, Zap, Smartphone, Check } from 'lucide-react';
import { hapticEngine, HapticPattern } from '../utils/hapticUtils';

interface HapticPulseControllerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const HapticPulseController: React.FC<HapticPulseControllerProps> = ({ isOpen, onClose }) => {
  const [enabled, setEnabled] = useState(hapticEngine.isEnabled());
  const [intensity, setIntensity] = useState<'subtle' | 'standard' | 'intense'>(hapticEngine.getIntensity());
  const [activeRipple, setActiveRipple] = useState<HapticPattern | null>(null);
  const [lastTriggeredTime, setLastTriggeredTime] = useState<string>('');

  useEffect(() => {
    const unsubscribe = hapticEngine.subscribeVisual((pattern) => {
      setActiveRipple(pattern);
      setLastTriggeredTime(new Date().toLocaleTimeString());
      const timeout = setTimeout(() => {
        setActiveRipple(null);
      }, 700);
      return () => clearTimeout(timeout);
    });
    return unsubscribe;
  }, []);

  const handleToggleEnabled = (val: boolean) => {
    setEnabled(val);
    hapticEngine.setEnabled(val);
    if (val) {
      hapticEngine.trigger('success');
    }
  };

  const handleIntensityChange = (val: 'subtle' | 'standard' | 'intense') => {
    setIntensity(val);
    hapticEngine.setIntensity(val);
    hapticEngine.trigger(val === 'subtle' ? 'light' : val === 'standard' ? 'medium' : 'heavy');
  };

  const handleTestPulse = (pattern: HapticPattern) => {
    hapticEngine.trigger(pattern);
  };

  return (
    <>
      {/* On-Screen Haptic Pulse Radial Wave Visual Feedback Overlay */}
      {activeRipple && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          <div
            className={`w-40 h-40 rounded-full border-4 animate-ping ${
              activeRipple === 'sos' || activeRipple === 'alert'
                ? 'border-rose-500 bg-rose-500/20'
                : activeRipple === 'success' || activeRipple === 'scan'
                ? 'border-emerald-400 bg-emerald-500/20'
                : 'border-cyan-400 bg-cyan-500/15'
            }`}
          />
          <div className="absolute bottom-10 right-10 bg-slate-900/90 border border-slate-800 text-cyan-300 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold flex items-center space-x-2 shadow-2xl backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            <span>HAPTIC PULSE: {activeRipple.toUpperCase()}</span>
          </div>
        </div>
      )}

      {/* Settings Modal (if opened) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl text-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Haptic Pulse Feedback</h3>
                  <p className="text-xs text-slate-400">Tactile Hardware Vibration Engine</p>
                </div>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  CLOSE
                </button>
              )}
            </div>

            {/* Enable Toggle */}
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center space-x-3">
                {enabled ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
                <div>
                  <span className="text-xs font-bold text-white block">Tactile Device Vibration</span>
                  <span className="text-[10px] text-slate-400">
                    {hapticEngine.isSupported() ? 'Supported on mobile/touch hardware' : 'Virtual ripple simulation mode active'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleToggleEnabled(!enabled)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  enabled ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Intensity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase">Haptic Pulse Intensity:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['subtle', 'standard', 'intense'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => handleIntensityChange(lvl)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize flex items-center justify-center space-x-1.5 transition-all ${
                      intensity === lvl
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{lvl}</span>
                    {intensity === lvl && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Test Patterns */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase">Test Tactile Patterns:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleTestPulse('click')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 font-bold flex items-center justify-center space-x-2"
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Click Tap (20ms)</span>
                </button>

                <button
                  onClick={() => handleTestPulse('scan')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-emerald-300 font-bold flex items-center justify-center space-x-2"
                >
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  <span>QR Scan (40ms)</span>
                </button>

                <button
                  onClick={() => handleTestPulse('success')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-amber-300 font-bold flex items-center justify-center space-x-2"
                >
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Success Wave</span>
                </button>

                <button
                  onClick={() => handleTestPulse('sos')}
                  className="p-2.5 bg-slate-950 hover:bg-rose-950/60 border border-rose-900/50 rounded-xl text-rose-300 font-bold flex items-center justify-center space-x-2"
                >
                  <Activity className="w-3.5 h-3.5 text-rose-400 animate-ping" />
                  <span>SOS Emergency</span>
                </button>
              </div>
            </div>

            {lastTriggeredTime && (
              <div className="text-[10px] text-slate-500 text-center border-t border-slate-800/80 pt-3">
                Last pulse fired at {lastTriggeredTime}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
