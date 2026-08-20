import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Sparkles, Filter, Activity, ArrowUpRight, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface HazardAlertSummary {
  summaryId: string;
  timestampUtc: string;
  title: string;
  hazardCategory: 'PIRACY_SKIFF' | 'SUPER_TYPHOON' | 'WHALE_COLLISION_ZONE' | 'PORT_CLOSURE';
  affectedRegion: string;
  threatSeverity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  aiExecutiveDigest: string;
  recommendedAction: string;
  vesselsInProximityCount: number;
}

const ALERT_SUMMARIES_DATA: HazardAlertSummary[] = [
  {
    summaryId: 'SUM-2026-089',
    timestampUtc: '2026-08-09 00:30 UTC',
    title: 'Bab el-Mandeb Strait Armed Skiff Swarm & Missile Threat Synthesis',
    hazardCategory: 'PIRACY_SKIFF',
    affectedRegion: 'Southern Red Sea & Gulf of Aden Corridor',
    threatSeverity: 'CRITICAL',
    aiExecutiveDigest: 'Multiple suspicious high-speed skiffs (45 kts) operating within 12 NM of maritime traffic lanes. AIS spoofing detected.',
    recommendedAction: 'Engage Hardened Citadel protocols, increase speed to 20+ knots, deploy non-lethal acoustic cannons, report to UKMTO.',
    vesselsInProximityCount: 14
  },
  {
    summaryId: 'SUM-2026-090',
    timestampUtc: '2026-08-09 00:15 UTC',
    title: 'Category 5 Super Typhoon KRATHON Rapid Deepening Alert',
    hazardCategory: 'SUPER_TYPHOON',
    affectedRegion: 'Luzon Strait & South China Sea Gateway',
    threatSeverity: 'CRITICAL',
    aiExecutiveDigest: 'Central pressure dropped to 915 hPA with max sustained winds exceeding 140 knots and 12m wave swells.',
    recommendedAction: 'Execute northern detour route via Surigao Strait; delay Taiwan Strait transit by 36 hours.',
    vesselsInProximityCount: 28
  },
  {
    summaryId: 'SUM-2026-091',
    timestampUtc: '2026-08-08 23:45 UTC',
    title: 'North Atlantic Right Whale Pod Migration Geofence Activated',
    hazardCategory: 'WHALE_COLLISION_ZONE',
    affectedRegion: 'Bay of Fundy & Cape Cod Shipping Approach',
    threatSeverity: 'MODERATE',
    aiExecutiveDigest: 'Thermal infrared hydrophone array detected 6 North Atlantic Right Whales migrating across shipping channels.',
    recommendedAction: 'Reduce vessel speed to mandatory 10.0 knots maximum; post dedicated lookout on forecastle.',
    vesselsInProximityCount: 9
  }
];

export const AlertSummariesView: React.FC = () => {
  const [summaries] = useState<HazardAlertSummary[]>(ALERT_SUMMARIES_DATA);
  const [selectedSummary, setSelectedSummary] = useState<HazardAlertSummary>(ALERT_SUMMARIES_DATA[0]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">CRITICAL SEVERITY</span>;
      case 'HIGH':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">HIGH SEVERITY</span>;
      default:
        return <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] px-2 py-0.5 rounded font-bold">MODERATE HAZARD</span>;
    }
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
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Executive Real-Time Hazard Alert Summaries & AI Intelligence Digest</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Synthesized executive summaries combining piracy threat feeds, super typhoon tracking, and marine mammal collision geofences
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Cpu className="w-3.5 h-3.5 text-rose-400" />
          <span>AI DIGEST SYNTHESIS ACTIVE</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Alert Summaries List */}
        <div className="lg:col-span-1 space-y-2">
          {summaries.map((s) => (
            <div
              key={s.summaryId}
              onClick={() => {
                setSelectedSummary(s);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedSummary.summaryId === s.summaryId
                  ? 'bg-slate-950 border-rose-400 ring-1 ring-rose-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-rose-400 font-bold">{s.summaryId}</span>
                {getSeverityBadge(s.threatSeverity)}
              </div>
              <h4 className="text-xs font-bold text-white leading-tight">{s.title}</h4>
              <div className="flex justify-between text-[8px] text-slate-500 pt-1 border-t border-slate-900">
                <span>{s.affectedRegion}</span>
                <span>{s.vesselsInProximityCount} Ships Nearby</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Summary Detailed Dossier */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[8px] text-rose-400 font-bold block">{selectedSummary.summaryId} • {selectedSummary.timestampUtc}</span>
              <h4 className="text-sm font-bold text-white">{selectedSummary.title}</h4>
              <span className="text-[10px] text-slate-400 block font-sans">Geographic Bounds: {selectedSummary.affectedRegion}</span>
            </div>
            {getSeverityBadge(selectedSummary.threatSeverity)}
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[9px] text-cyan-400 font-bold block flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI INTELLIGENCE SYNTHESIS DIGEST:</span>
            </span>
            <p className="text-[11px] text-slate-200 font-sans leading-relaxed">{selectedSummary.aiExecutiveDigest}</p>
          </div>

          <div className="bg-amber-950/30 border border-amber-900/60 p-4 rounded-xl space-y-2">
            <span className="text-[9px] text-amber-400 font-bold block flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>MANDATORY BRIDGE ACTION PROTOCOL:</span>
            </span>
            <p className="text-[11px] text-amber-200 font-sans font-bold leading-relaxed">{selectedSummary.recommendedAction}</p>
          </div>

          <div className="flex justify-between items-center text-[9px] text-slate-400 pt-2 border-t border-slate-900">
            <span>VESSELS IN HIGH RISK PROXIMITY ZONE: <strong className="text-white">{selectedSummary.vesselsInProximityCount} Commercial Vessels</strong></span>
            <span className="text-emerald-400 font-bold">STATUS: ECDIS PUSH COMPLETED</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
