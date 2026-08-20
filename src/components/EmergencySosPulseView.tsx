import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Siren,
  AlertTriangle,
  Radio,
  ShieldAlert,
  Flame,
  Waves,
  HeartPulse,
  Compass,
  CheckCircle2,
  RefreshCw,
  PhoneCall,
  Check,
  Zap,
  Volume2,
  VolumeX,
  PhoneForwarded,
  MapPin,
  Activity,
  Satellite
} from 'lucide-react';

export const EmergencySosPulseView: React.FC = () => {
  const [isSosActive, setIsSosActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [distressNature, setDistressNature] = useState<'FIRE_ONBOARD' | 'FLOODING_INGRESS' | 'ABANDON_SHIP' | 'MEDICAL_MEDEVAC' | 'ENGINE_FAILURE'>('FIRE_ONBOARD');
  const [vesselCoords] = useState('14°12.8\' N, 89°45.2\' E (Bay of Bengal)');
  const [crewCount] = useState(24);
  const [broadcastLog, setBroadcastLog] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // HTML5 Web Audio API Alarm Generator
  const playDistressSiren = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn('Audio play restricted by browser policy', e);
    }
  };

  const handleTriggerSosPulse = () => {
    setIsSosActive(true);
    if (soundEnabled) playDistressSiren();

    const newLogs = [
      `[00:00:01] MAYDAY DISTRESS BEACON ACTIVE: Transmitting on EPIRB 406MHz & Inmarsat-C...`,
      `[00:00:03] DSC VHF CH 16 Digital Selective Calling distress broadcast initiated...`,
      `[00:00:06] Distress Payload Sent: Coords ${vesselCoords}, Nature: ${distressNature.replace('_', ' ')}, Crew: ${crewCount}`,
      `[00:00:10] ACK RECEIVED: Indian Coast Guard MRCC Chennai acknowledged Mayday distress.`
    ];
    setBroadcastLog(newLogs);
    showToast('EMERGENCY SOS MAYDAY BEACON ACTIVATED! MRCC ACKNOWLEDGED.');
  };

  const handleCancelSos = () => {
    setIsSosActive(false);
    setBroadcastLog([]);
    showToast('Distress beacon cancelled & stand-down broadcast sent to MRCC.');
  };

  // Audio tone pulse effect interval when active
  useEffect(() => {
    let interval: any;
    if (isSosActive && soundEnabled) {
      interval = setInterval(() => {
        playDistressSiren();
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isSosActive, soundEnabled]);

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-rose-500 text-rose-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-rose-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>GMDSS EMERGENCY DISTRESS BEACON & MAYDAY MULTI-PULSE SYSTEM</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Radio className="w-6 h-6 text-rose-400" />
              <span>Emergency SOS Pulse & Mayday Telemetry</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              High-priority emergency distress signal transmitter delivering automated GPS coordinates, crew count, and nature of distress to Coast Guard MRCC centers.
            </p>
          </div>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              showToast(`Audio Distress Alarm Tone ${!soundEnabled ? 'ENABLED' : 'MUTED'}`);
            }}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all flex items-center space-x-2 ${
              soundEnabled
                ? 'bg-rose-500/20 text-rose-300 border-rose-500 shadow-lg'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span>SIREN AUDIBLE TONE: {soundEnabled ? 'ACTIVE' : 'MUTED'}</span>
          </button>
        </div>
      </div>

      {/* PULSING SOS TRIGGER BUTTON & CONFIG PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        {/* SOS TRIGGER BUTTON WITH RADIAL SOS SIGNAL PULSE EFFECTS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest relative z-10">
            {isSosActive ? 'DISTRESS MAYDAY BROADCAST ACTIVE' : 'PRESS TO TRANSMIT MAYDAY DISTRESS'}
          </span>

          {/* PULSING RED BUTTON WITH CONCENTRIC EXPANDING PULSES */}
          <div className="relative flex items-center justify-center py-6">
            {/* CONCENTRIC SIGNAL EXPANDING PULSE RINGS */}
            {isSosActive && (
              <>
                <motion.div
                  animate={{ scale: [1, 2.2], opacity: [0.9, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
                  className="absolute w-44 h-44 rounded-full border-2 border-rose-500 bg-rose-500/20 pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1, 2.8], opacity: [0.7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.4, ease: 'easeOut' }}
                  className="absolute w-44 h-44 rounded-full border-2 border-rose-400 bg-rose-500/10 pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1, 3.4], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, delay: 0.8, ease: 'easeOut' }}
                  className="absolute w-44 h-44 rounded-full border border-rose-300 pointer-events-none"
                />
              </>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isSosActive ? handleCancelSos : handleTriggerSosPulse}
              className={`relative z-10 w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all shadow-2xl cursor-pointer ${
                isSosActive
                  ? 'bg-rose-600 border-4 border-rose-400 text-white shadow-rose-600/80'
                  : 'bg-gradient-to-br from-rose-600 to-rose-950 border-4 border-rose-500/50 text-white hover:from-rose-500 hover:to-rose-800 shadow-rose-950/50'
              }`}
            >
              <Siren className="w-16 h-16 mb-2 relative z-10 animate-bounce" />
              <span className="text-xl font-black tracking-widest relative z-10">
                {isSosActive ? 'CANCEL SOS' : 'TRIGGER SOS'}
              </span>
              <span className="text-[10px] text-rose-200 uppercase relative z-10 font-bold mt-1">
                {isSosActive ? 'ACTIVE MAYDAY' : 'EPIRB 406MHz'}
              </span>
            </motion.button>
          </div>

          {/* AUDIO WAVE VISUALIZER EFFECT */}
          {isSosActive && (
            <div className="flex items-center space-x-1.5 h-8">
              {[40, 80, 100, 60, 90, 30, 70, 95, 50, 85, 45, 90].map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${height * 0.2}%`, `${height}%`, `${height * 0.2}%`] }}
                  transition={{ repeat: Infinity, duration: 0.6 + (i % 3) * 0.2, ease: 'easeInOut' }}
                  className="w-1.5 bg-rose-500 rounded-full"
                />
              ))}
            </div>
          )}

          <p className="text-[11px] text-slate-400 max-w-sm relative z-10">
            Transmits high-priority DSC digital selective calling distress alert to Coast Guard Rescue Coordination Centers (MRCC).
          </p>
        </div>

        {/* DISTRESS CONFIG & TELEMETRY PAYLOAD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase border-b border-slate-800 pb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>GMDSS Emergency Payload Settings</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold block">Nature of Emergency Distress:</label>
              <select
                value={distressNature}
                onChange={(e) => setDistressNature(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-rose-500"
              >
                <option value="FIRE_ONBOARD">Fire / Explosion Onboard</option>
                <option value="FLOODING_INGRESS">Hull Flooding & Water Ingress</option>
                <option value="ABANDON_SHIP">Abandon Ship Order Issued</option>
                <option value="MEDICAL_MEDEVAC">Critical Medical Emergency / Medevac</option>
                <option value="ENGINE_FAILURE">Loss of Steering & Engine Failure in Storm</option>
              </select>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Current GPS Coords:</span>
                <span className="text-rose-400 font-bold">{vesselCoords}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Personnel Onboard:</span>
                <span className="text-white font-bold">{crewCount} Souls</span>
              </div>
            </div>

            {/* LOG OUTPUT */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1 h-36 overflow-y-auto">
              <span className="text-[10px] text-slate-500 font-bold block mb-1">BROADCAST LOG FEED:</span>
              {broadcastLog.length > 0 ? (
                broadcastLog.map((log, i) => (
                  <p key={i} className="text-[11px] text-emerald-400 font-mono leading-tight">
                    {log}
                  </p>
                ))
              ) : (
                <p className="text-[11px] text-slate-600 italic">No active distress broadcast transmitted.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
