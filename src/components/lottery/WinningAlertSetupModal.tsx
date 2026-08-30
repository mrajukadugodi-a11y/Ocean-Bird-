import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  Volume2,
  Smartphone,
  Radio,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sliders,
  Sparkles,
  Play
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface WinningAlertSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WinningAlertSetupModal: React.FC<WinningAlertSetupModalProps> = ({ isOpen, onClose }) => {
  const [minWinThreshold, setMinWinThreshold] = useState<number>(100);
  const [soundChime, setSoundChime] = useState<string>('maritime-bell');
  const [enableBrowserPush, setEnableBrowserPush] = useState<boolean>(true);
  const [enableSatcomSms, setEnableSatcomSms] = useState<boolean>(true);
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
  const [testTriggerActive, setTestTriggerActive] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleTestAlert = () => {
    setTestTriggerActive(true);
    hapticEngine.trigger('success');

    // Simple Web Audio API sound synth test
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log('Audio Context not available');
    }

    setTimeout(() => {
      setTestTriggerActive(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 max-w-lg w-full font-mono space-y-5 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Bell className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm uppercase">Winning Alert Fast Setup</h3>
              <p className="text-[10px] text-slate-400 font-sans">
                Instant jackpot payout & live draw win notifications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-xs bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Test Alert Simulation Banner */}
        {testTriggerActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-amber-500/30 to-emerald-500/30 border border-amber-400 rounded-2xl text-amber-200 text-xs font-mono space-y-1 shadow-2xl animate-pulse"
          >
            <div className="flex items-center space-x-2 font-black text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>🎉 TEST ALERT: YOU WON $10,000 $OD IN DRAW #8940!</span>
            </div>
            <p className="text-[11px] text-slate-200 font-sans">
              Sound chimed: [{soundChime}] • SatCom SMS Sent • Haptic Vibration Fired
            </p>
          </motion.div>
        )}

        {/* Form Controls */}
        <div className="space-y-4 text-xs">
          {/* Threshold Slider */}
          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-bold">Minimum Win Threshold Alert:</span>
              <span className="text-amber-400 font-black">${minWinThreshold} $OD</span>
            </div>
            <input
              type="range"
              min="10"
              max="5000"
              step="50"
              value={minWinThreshold}
              onChange={(e) => setMinWinThreshold(Number(e.target.value))}
              className="w-full accent-amber-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 font-sans block">
              You will only receive instant push alerts for payouts equal to or exceeding ${minWinThreshold} $OD.
            </span>
          </div>

          {/* Sound Chime Selection */}
          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-300 font-bold flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Winning Sound Chime Effect:</span>
            </span>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: 'maritime-bell', label: 'Maritime Ship Bell' },
                { id: 'gold-coins', label: 'Gold Coin Shower' },
                { id: 'triumph-horn', label: 'Triumph Foghorn' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSoundChime(s.id);
                    hapticEngine.trigger('click');
                  }}
                  className={`p-2 rounded-xl text-[10px] font-bold border transition-all ${
                    soundChime === s.id
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alert Channel Toggles */}
          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-300 font-bold block mb-2">Notification Channels:</span>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-300 flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Browser & In-App Popups</span>
              </span>
              <input
                type="checkbox"
                checked={enableBrowserPush}
                onChange={(e) => setEnableBrowserPush(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-1 border-t border-slate-900">
              <span className="text-slate-300 flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                <span>SatCom SMS Direct to Crew Phone</span>
              </span>
              <input
                type="checkbox"
                checked={enableSatcomSms}
                onChange={(e) => setEnableSatcomSms(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-1 border-t border-slate-900">
              <span className="text-slate-300 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Tactile Haptic Device Vibration</span>
              </span>
              <input
                type="checkbox"
                checked={vibrationEnabled}
                onChange={(e) => setVibrationEnabled(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleTestAlert}
            className="bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>Test Winning Alert</span>
          </button>

          <button
            onClick={() => {
              hapticEngine.trigger('success');
              onClose();
            }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-2xl text-xs transition-all shadow-lg shadow-amber-500/20"
          >
            Save & Activate
          </button>
        </div>
      </motion.div>
    </div>
  );
};
