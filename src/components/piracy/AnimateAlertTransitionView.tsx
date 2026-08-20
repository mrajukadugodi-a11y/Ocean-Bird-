import React, { useState } from 'react';
import { AlertOctagon, ShieldAlert, Bell, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface AnimatedAlert {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'ADVISORY';
  title: string;
  region: string;
  timestamp: string;
  description: string;
}

const ANIMATED_ALERTS: AnimatedAlert[] = [
  {
    id: 'ALT-801',
    severity: 'CRITICAL',
    title: 'Hostile Skiff Fast Approach Detected',
    region: 'Bab-el-Mandeb Strait (Red Sea Corridor)',
    timestamp: 'JUST NOW',
    description: 'Radar locks 2 high-speed skiffs closing at 34 knots. Sound Citadel retreat alarm immediately.'
  },
  {
    id: 'ALT-802',
    severity: 'WARNING',
    title: 'Severe GNSS Spoofing & Radar Interference',
    region: 'Bornholm Deep (Central Baltic Sea)',
    timestamp: '2 MINS AGO',
    description: 'Primary ECDIS GPS fix offset by 4.2 NM. Engage gyrocompass dead reckoning protocol.'
  },
  {
    id: 'ALT-803',
    severity: 'ADVISORY',
    title: 'Heavy Gale Sea Swell Warning',
    region: 'Fehmarn Belt Approach',
    timestamp: '15 MINS AGO',
    description: 'Significant wave height forecasted >3.8m. Secure all weather deck cargo locks.'
  }
];

export const AnimateAlertTransitionView: React.FC = () => {
  const [alerts, setAlerts] = useState<AnimatedAlert[]>(ANIMATED_ALERTS);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeAlert = alerts[activeIndex];

  const handleNextAlert = () => {
    hapticEngine.trigger('click');
    setActiveIndex((prev) => (prev + 1) % alerts.length);
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
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Real-time Animated Alert State Transition Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Smooth Motion transitions between critical security threats, radar warnings, and weather advisories
          </p>
        </div>

        <button
          onClick={handleNextAlert}
          className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>CYCLE ALERT STATE</span>
        </button>
      </div>

      {/* Animated Alert Banner Stage */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl relative min-h-[200px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAlert.id}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`w-full p-5 rounded-2xl border space-y-3 ${
              activeAlert.severity === 'CRITICAL'
                ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                : activeAlert.severity === 'WARNING'
                ? 'bg-amber-950/40 border-amber-800 text-amber-200'
                : 'bg-cyan-950/40 border-cyan-800 text-cyan-200'
            }`}
          >
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-current">
                {activeAlert.severity} • {activeAlert.id}
              </span>
              <span className="text-[9px] font-mono text-slate-400">{activeAlert.timestamp}</span>
            </div>

            <h4 className="text-sm font-black text-white">{activeAlert.title}</h4>
            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{activeAlert.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
