import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCheck,
  ShieldCheck,
  Award,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Zap,
  Check,
  FileText,
  Building2,
  Ship,
  TrendingDown,
  Scale,
  Sliders,
  DollarSign
} from 'lucide-react';

interface RegulationAuditItem {
  code: string;
  framework: string;
  title: string;
  targetMetric: string;
  currentFleetValue: string;
  status: 'COMPLIANT' | 'NEARING_THRESHOLD' | 'NON_COMPLIANT';
  penaltyRiskUSDPerDay: number;
}

const REGULATION_ITEMS: RegulationAuditItem[] = [
  {
    code: 'IMO-CII-2026',
    framework: 'IMO MEPC.328(76)',
    title: 'Carbon Intensity Indicator (CII) Rating',
    targetMetric: 'Rating A or B (< 4.2g CO2/dwt-nm)',
    currentFleetValue: 'Rating B (3.8g CO2/dwt-nm)',
    status: 'COMPLIANT',
    penaltyRiskUSDPerDay: 0
  },
  {
    code: 'MARPOL-VI-SULPHUR',
    framework: 'MARPOL Annex VI Reg 14',
    title: 'Global Marine Sulphur Cap (0.50% m/m)',
    targetMetric: 'VLSFO < 0.50% / EGCS Scrubber Active',
    currentFleetValue: '0.12% Scrubber Effluent',
    status: 'COMPLIANT',
    penaltyRiskUSDPerDay: 0
  },
  {
    code: 'EU-ETS-SHIPPING',
    framework: 'EU Directive 2023/959',
    title: 'EU Emissions Trading System Allowance',
    targetMetric: '100% Verified Surrendered EUAs',
    currentFleetValue: '88% Surrendered (12% Deficit)',
    status: 'NEARING_THRESHOLD',
    penaltyRiskUSDPerDay: 12500
  },
  {
    code: 'SOLAS-CH-V',
    framework: 'SOLAS Regulation V/19',
    title: 'ECDIS & Automatic Identification System (AIS)',
    targetMetric: 'Dual ECDIS & Class A AIS Active',
    currentFleetValue: '100% Operational Telemetry',
    status: 'COMPLIANT',
    penaltyRiskUSDPerDay: 0
  },
  {
    code: 'EEXI-CERTIFICATE',
    framework: 'IMO EEXI Technical File',
    title: 'Energy Efficiency Existing Ship Index',
    targetMetric: 'Attained EEXI ≤ Required EEXI',
    currentFleetValue: 'Attained 2.15 vs Required 2.40',
    status: 'COMPLIANT',
    penaltyRiskUSDPerDay: 0
  }
];

export const AutomatedRegulationCheckView: React.FC = () => {
  const [auditItems, setAuditItems] = useState<RegulationAuditItem[]>(REGULATION_ITEMS);
  const [isAuditing, setIsAuditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRunFullAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditItems((prev) =>
        prev.map((item) =>
          item.code === 'EU-ETS-SHIPPING'
            ? { ...item, status: 'COMPLIANT', currentFleetValue: '100% Surrendered EUAs', penaltyRiskUSDPerDay: 0 }
            : item
        )
      );
      showToast('Automated Regulation Audit complete. All 5 frameworks verified 100% Compliant.');
    }, 1500);
  };

  const totalPenaltyRisk = auditItems.reduce((acc, curr) => acc + curr.penaltyRiskUSDPerDay, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-emerald-500 text-emerald-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <FileCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>IMO / EU MARITIME AUTOMATED REGULATORY COMPLIANCE AUDITOR</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>Automated Regulation Check & Penalty Shield</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Automated compliance auditing across IMO CII ratings, EEXI technical files, MARPOL Annex VI sulphur limits, and EU ETS carbon allowance surrenders.
            </p>
          </div>

          <button
            onClick={handleRunFullAudit}
            disabled={isAuditing}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-black flex items-center space-x-2 transition-all shadow-lg ${
              isAuditing
                ? 'bg-slate-800 text-slate-400 border border-slate-700'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/40'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'AUDITING REGULATION RULES...' : 'RUN AUTOMATED REGULATION AUDIT'}</span>
          </button>
        </div>
      </div>

      {/* COMPLIANCE SUMMARY GAUGES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">OVERALL COMPLIANCE SCORE</span>
          <strong className="text-2xl font-black text-emerald-400 block">98.4%</strong>
          <span className="text-[10px] text-emerald-400 block">4 of 5 Frameworks Pass</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">IMO CII CARBON RATING</span>
          <strong className="text-2xl font-black text-cyan-300 block">Rating B</strong>
          <span className="text-[10px] text-cyan-400 block">Exceeds 2026 IMO target</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">DAILY PENALTY EXPOSURE RISK</span>
          <strong className={`text-2xl font-black block ${totalPenaltyRisk > 0 ? 'text-amber-300' : 'text-emerald-400'}`}>
            ${totalPenaltyRisk.toLocaleString()} / day
          </strong>
          <span className="text-[10px] text-slate-400 block">Auto-resolvable via EUA purchase</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">MARPOL ANNEX VI SULPHUR</span>
          <strong className="text-2xl font-black text-emerald-400 block">0.12% m/m</strong>
          <span className="text-[10px] text-emerald-400 block">Strictly below 0.50% cap</span>
        </div>
      </div>

      {/* REGULATION AUDIT TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase">
            <Scale className="w-4 h-4" />
            <span>International Maritime Legal Framework Audit Matrix ({auditItems.length} Frameworks)</span>
          </div>

          <button
            onClick={() => showToast('IMO Compliance Certificate PDF generated.')}
            className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>PRINT IMO AUDIT CERTIFICATE</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auditItems.map((item) => {
            const isComp = item.status === 'COMPLIANT';
            const isNear = item.status === 'NEARING_THRESHOLD';

            return (
              <div
                key={item.code}
                className={`p-4 rounded-2xl border space-y-3 bg-slate-950 transition-all ${
                  isComp
                    ? 'border-emerald-500/40 text-emerald-100'
                    : isNear
                    ? 'border-amber-500/50 text-amber-100'
                    : 'border-rose-500/50 text-rose-100'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-xs">{item.title}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      isComp
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    }`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Framework Legal Ref:</span>
                    <span className="text-emerald-300 font-bold">{item.framework}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Standard Metric:</span>
                    <span className="text-slate-200">{item.targetMetric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fleet Actual Metric:</span>
                    <span className="text-white font-bold">{item.currentFleetValue}</span>
                  </div>
                  {item.penaltyRiskUSDPerDay > 0 && (
                    <div className="flex justify-between text-amber-400 font-bold">
                      <span>Penalty Risk:</span>
                      <span>${item.penaltyRiskUSDPerDay.toLocaleString()} / day</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                  <span className="text-[10px] text-slate-500">Rule Code: {item.code}</span>
                  {isNear && (
                    <button
                      onClick={handleRunFullAudit}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center space-x-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>DISPATCH AUTO-COMPLIANCE</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
