import React, { useState } from 'react';
import { Info, HelpCircle, Eye, MousePointer, ShieldAlert, Navigation, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MapTooltipTarget {
  id: string;
  name: string;
  xPct: number;
  yPct: number;
  category: string;
  detail: string;
  status: string;
}

const TOOLTIP_TARGETS: MapTooltipTarget[] = [
  { id: 'TT-01', name: 'Bornholm Deep GPS Jamming Zone', xPct: 28, yPct: 35, category: 'GPS_SPOOFING', detail: 'Primary GNSS satellite lock lost across 14 commercial container ships.', status: 'CRITICAL' },
  { id: 'TT-02', name: 'Fehmarn Belt Subsea Power Cable Corridor', xPct: 52, yPct: 62, category: 'INFRASTRUCTURE', detail: '24/7 acoustic sonar hydrophone array tracking unflagged shadow tankers.', status: 'ACTIVE' },
  { id: 'TT-03', name: 'Bab-el-Mandeb Drone Surveillance Point', xPct: 78, yPct: 40, category: 'THREAT_MONITOR', detail: 'Automated thermal camera array scanning skiff velocity & wake angles.', status: 'MONITORING' }
];

export const InteractiveTooltipsView: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<MapTooltipTarget | null>(TOOLTIP_TARGETS[0]);

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
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Interactive Contextual Radar & Map Tooltips Inspector</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Hover or tap map waypoints to inspect real-time tactical tooltips and vessel intelligence details
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          HOVER TOOLTIPS ACTIVE
        </span>
      </div>

      {/* Simulated Interactive Map Stage with Hover Tooltips */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl relative min-h-[300px] flex items-center justify-center overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div className="relative w-full h-64 bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
          {TOOLTIP_TARGETS.map((tgt) => (
            <motion.div
              key={tgt.id}
              whileHover={{ scale: 1.25 }}
              onMouseEnter={() => {
                setActiveTooltip(tgt);
                hapticEngine.trigger('click');
              }}
              style={{ top: `${tgt.yPct}%`, left: `${tgt.xPct}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border shadow-2xl transition-all ${
                activeTooltip?.id === tgt.id
                  ? 'bg-cyan-400 text-slate-950 border-white ring-4 ring-cyan-500/40 z-30 font-black'
                  : 'bg-slate-950 text-cyan-400 border-slate-700 hover:border-cyan-400'
              }`}
            >
              <MousePointer className="w-3.5 h-3.5" />
            </motion.div>
          ))}

          {/* Dynamic Floating Tooltip Card */}
          <AnimatePresence mode="wait">
            {activeTooltip && (
              <motion.div
                key={activeTooltip.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{ top: `${activeTooltip.yPct + 12}%`, left: `${Math.min(activeTooltip.xPct, 65)}%` }}
                className="absolute z-40 bg-slate-950/95 border border-cyan-500/50 p-3.5 rounded-xl shadow-2xl space-y-1.5 w-64 backdrop-blur-md font-mono"
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <span className="text-[8px] text-cyan-400 font-bold">{activeTooltip.category}</span>
                  <span className="text-[8px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.2 rounded font-black">
                    {activeTooltip.status}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-white">{activeTooltip.name}</h5>
                <p className="text-[9px] text-slate-300 font-sans leading-relaxed">{activeTooltip.detail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
