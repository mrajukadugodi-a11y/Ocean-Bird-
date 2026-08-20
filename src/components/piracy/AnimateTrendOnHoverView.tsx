import React, { useState } from 'react';
import { TrendingUp, Eye, Sparkles, Activity, ShieldAlert, BarChart3, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TrendPoint {
  year: string;
  piracyThreatIndex: number; // 0–100
  seaSurfaceTempAnomaly: number; // °C
  incidentsCount: number;
  highlightNote: string;
}

const TREND_POINTS: TrendPoint[] = [
  { year: '2020', piracyThreatIndex: 42, seaSurfaceTempAnomaly: 0.8, incidentsCount: 18, highlightNote: 'Baseline COVID-era commercial vessel transit density drops.' },
  { year: '2021', piracyThreatIndex: 58, seaSurfaceTempAnomaly: 1.1, incidentsCount: 24, highlightNote: 'Surge in Gulf of Guinea armed robbery incidents near Bonny Fairway.' },
  { year: '2022', piracyThreatIndex: 64, seaSurfaceTempAnomaly: 1.3, incidentsCount: 29, highlightNote: 'Evolving drone surveillance threats along Red Sea transit lanes.' },
  { year: '2023', piracyThreatIndex: 79, seaSurfaceTempAnomaly: 1.5, incidentsCount: 41, highlightNote: 'Bab-el-Mandeb anti-ship missile and drone attack spike.' },
  { year: '2024', piracyThreatIndex: 88, seaSurfaceTempAnomaly: 1.7, incidentsCount: 56, highlightNote: 'GPS spoofing & AIS transmitter disruption near Bornholm & Danish Straits.' },
  { year: '2025', piracyThreatIndex: 92, seaSurfaceTempAnomaly: 1.9, incidentsCount: 68, highlightNote: 'Shadow fleet unflagged tanker loitering in Baltic Sea.' },
  { year: '2026', piracyThreatIndex: 85, seaSurfaceTempAnomaly: 2.1, incidentsCount: 52, highlightNote: 'Combined NATO & Baltic naval escort patrols stabilizing transit corridors.' }
];

export const AnimateTrendOnHoverView: React.FC = () => {
  const [activePoint, setActivePoint] = useState<TrendPoint>(TREND_POINTS[6]);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

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
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Interactive Animated Multi-Year Security & Climate Trend Line Visualizer</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Hover over timeline nodes to inspect dynamic threat indices, SST anomalies, and historical maritime event logs
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          HOVER INTERACTION ENABLED
        </span>
      </div>

      {/* SVG Interactive Animated Chart Stage */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl relative min-h-[280px] flex flex-col justify-between shadow-inner overflow-hidden">
        <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold border-b border-slate-900 pb-2">
          <span>MARITIME THREAT INDEX (0–100 SCORE)</span>
          <span>SST ANOMALY (°C)</span>
        </div>

        {/* SVG Curve Path */}
        <div className="relative my-8 h-40 w-full flex items-end justify-between px-4">
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="gradientThreat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Simulated Animated Area Path */}
            <path
              d="M 20 120 Q 80 90, 140 80 T 260 50 T 380 30 T 500 20 T 620 40"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              className="transition-all duration-300"
            />
          </svg>

          {/* Interactive Hover Nodes */}
          {TREND_POINTS.map((pt) => {
            const isHovered = hoveredYear === pt.year || activePoint.year === pt.year;
            return (
              <motion.div
                key={pt.year}
                whileHover={{ scale: 1.3 }}
                onMouseEnter={() => {
                  setHoveredYear(pt.year);
                  setActivePoint(pt);
                  hapticEngine.trigger('click');
                }}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-xl transition-all ${
                    isHovered
                      ? 'bg-cyan-400 text-slate-950 border-white ring-4 ring-cyan-500/30 scale-125'
                      : 'bg-slate-900 text-cyan-300 border-slate-700'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>
                <span className={`text-[9px] font-bold mt-2 ${isHovered ? 'text-cyan-300' : 'text-slate-500'}`}>
                  {pt.year}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hovered Point Detailed Card */}
      <motion.div
        key={activePoint.year}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 font-mono"
      >
        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
          <div className="flex items-center space-x-2">
            <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-black text-xs">
              YEAR {activePoint.year}
            </span>
            <h4 className="text-xs font-bold text-white">Annual Security & Climate Log</h4>
          </div>

          <span className="text-[10px] text-amber-300 font-bold">
            {activePoint.incidentsCount} Incidents Logged
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 block">MARITIME RISK SCORE:</span>
            <p className="text-sm font-black text-cyan-300">{activePoint.piracyThreatIndex} / 100</p>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 block">SST ANOMALY:</span>
            <p className="text-sm font-black text-rose-400">+{activePoint.seaSurfaceTempAnomaly}°C</p>
          </div>
        </div>

        <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
          <strong className="text-cyan-400 font-mono">HIGHLIGHT: </strong>
          {activePoint.highlightNote}
        </p>
      </motion.div>
    </motion.div>
  );
};
