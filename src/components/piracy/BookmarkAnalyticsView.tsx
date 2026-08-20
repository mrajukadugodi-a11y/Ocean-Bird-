import React from 'react';
import { BarChart3, Bookmark, PieChart, TrendingUp, ShieldCheck, Download, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export const BookmarkAnalyticsView: React.FC = () => {
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
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Conservation & Regulatory Bookmark Analytics Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Analytical breakdown of saved environmental policies, species protection guidelines, and voyage compliance readiness
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          COMPLIANCE SCORE: 96.4%
        </span>
      </div>

      {/* High Level Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[8px] text-slate-500 font-bold block">TOTAL BOOKMARKS</span>
          <span className="text-lg font-black text-white">28 Items</span>
          <span className="text-[8px] text-emerald-400 block font-bold">+4 Saved This Week</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[8px] text-slate-500 font-bold block">SPECIES ALERTS SAVED</span>
          <span className="text-lg font-black text-amber-400">12 Entries</span>
          <span className="text-[8px] text-slate-400 block">Whale & Dolphin Protections</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[8px] text-slate-500 font-bold block">MARPOL POLICIES</span>
          <span className="text-lg font-black text-cyan-300">10 Directives</span>
          <span className="text-[8px] text-slate-400 block">Annex VI & BWM Codes</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[8px] text-slate-500 font-bold block">AUDIT READINESS</span>
          <span className="text-lg font-black text-emerald-400">96.4%</span>
          <span className="text-[8px] text-emerald-300 block font-bold">IMO PSC Audit Ready</span>
        </div>
      </div>

      {/* Visual Analytics Graphs & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Distribution Progress Bars */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="border-b border-slate-900 pb-2">
            <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <PieChart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bookmarks Distribution by Category</span>
            </h4>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-[10px] pb-1">
                <span className="text-slate-300">Protected Species Directives</span>
                <span className="text-amber-400 font-bold">42% (12 items)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] pb-1">
                <span className="text-slate-300">IMO & MARPOL Policy Codes</span>
                <span className="text-cyan-300 font-bold">36% (10 items)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '36%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] pb-1">
                <span className="text-slate-300">Regional Port Eco Guides</span>
                <span className="text-emerald-400 font-bold">22% (6 items)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '22%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Region Coverage */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="border-b border-slate-900 pb-2">
            <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Geographic Coverage Readiness</span>
            </h4>
          </div>

          <div className="space-y-2 text-[10px]">
            <div className="flex justify-between items-center p-2 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-300">Torres Strait & Indo-Pacific:</span>
              <span className="text-emerald-400 font-bold">100% Compliant</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-300">Baltic Sea ECA Zone:</span>
              <span className="text-emerald-400 font-bold">98% Compliant</span>
            </div>
              <div className="flex justify-between items-center p-2 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-300">Red Sea & Gulf of Aden:</span>
              <span className="text-cyan-300 font-bold">92% Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
