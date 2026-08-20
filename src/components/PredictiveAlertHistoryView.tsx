import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  History,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Search,
  Filter,
  FileText,
  TrendingUp,
  ShieldCheck,
  Check,
  ArrowUpRight,
  Layers,
  MapPin,
  Siren
} from 'lucide-react';

export interface AlertHistoryRecord {
  id: string;
  title: string;
  category: 'Cyclone / Gale' | 'Tsunami / Surge' | 'Monsoon Surge' | 'Naval Security' | 'Port Congestion';
  region: 'Bay of Bengal' | 'Arabian Sea' | 'Malacca Strait' | 'Indian Ocean';
  predictedAt: string;
  leadTimeHours: number;
  predictedMetric: string;
  actualObservedMetric: string;
  accuracyRatePercent: number;
  status: 'VERIFIED_ACCURATE' | 'RESOLVED_SAFE' | 'PARTIAL_VARIANCE';
  impactMitigatedUSD: string;
}

const HISTORY_RECORDS: AlertHistoryRecord[] = [
  {
    id: 'HIS-2026-081',
    title: 'Super Cyclone "Remal-II" Category 4 Rapid Intensification',
    category: 'Cyclone / Gale',
    region: 'Bay of Bengal',
    predictedAt: '2026-08-01 14:00 UTC',
    leadTimeHours: 72,
    predictedMetric: '125 kt max wind, 5.8m surge',
    actualObservedMetric: '122 kt max wind, 5.6m surge',
    accuracyRatePercent: 98.2,
    status: 'VERIFIED_ACCURATE',
    impactMitigatedUSD: '$42.5M'
  },
  {
    id: 'HIS-2026-074',
    title: 'Malacca Strait Monsoonal High Swell Warning',
    category: 'Tsunami / Surge',
    region: 'Malacca Strait',
    predictedAt: '2026-07-22 08:30 UTC',
    leadTimeHours: 48,
    predictedMetric: '4.8m wave height @ 14s period',
    actualObservedMetric: '4.9m wave height @ 15s period',
    accuracyRatePercent: 97.4,
    status: 'VERIFIED_ACCURATE',
    impactMitigatedUSD: '$18.2M'
  },
  {
    id: 'HIS-2026-068',
    title: 'Arabian Sea High Pressure Anomaly & Gale Surge',
    category: 'Monsoon Surge',
    region: 'Arabian Sea',
    predictedAt: '2026-07-10 11:15 UTC',
    leadTimeHours: 36,
    predictedMetric: '992 hPa central pressure',
    actualObservedMetric: '995 hPa central pressure',
    accuracyRatePercent: 94.8,
    status: 'PARTIAL_VARIANCE',
    impactMitigatedUSD: '$9.4M'
  },
  {
    id: 'HIS-2026-052',
    title: 'Chittagong Outer Roads Terminal Congestion Bottleneck',
    category: 'Port Congestion',
    region: 'Bay of Bengal',
    predictedAt: '2026-06-28 19:45 UTC',
    leadTimeHours: 96,
    predictedMetric: '8.2 days avg container dwell',
    actualObservedMetric: '8.1 days avg container dwell',
    accuracyRatePercent: 98.9,
    status: 'VERIFIED_ACCURATE',
    impactMitigatedUSD: '$28.0M'
  },
  {
    id: 'HIS-2026-041',
    title: 'Southern Indian Ocean Deep Sea Swell & Gale Force Winds',
    category: 'Cyclone / Gale',
    region: 'Indian Ocean',
    predictedAt: '2026-06-14 05:00 UTC',
    leadTimeHours: 60,
    predictedMetric: '6.5m wave height',
    actualObservedMetric: '6.2m wave height',
    accuracyRatePercent: 95.3,
    status: 'RESOLVED_SAFE',
    impactMitigatedUSD: '$15.0M'
  }
];

export const PredictiveAlertHistoryView: React.FC = () => {
  const [records, setRecords] = useState<AlertHistoryRecord[]>(HISTORY_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredRecords = records.filter((r) => {
    if (selectedRegion !== 'ALL' && r.region !== selectedRegion) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-blue-500 text-blue-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-blue-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <History className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>PREDICTIVE CLIMATE & MARITIME ALERT HISTORICAL ARCHIVE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <Clock className="w-6 h-6 text-blue-400" />
              <span>Predictive Alert History & Post-Event Verification</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Historical audit log comparing AI forecast predictions against actual observed meteorological telemetry and verified financial damage mitigation.
            </p>
          </div>

          <button
            onClick={() => showToast('Predictive Alert History PDF / CSV exported successfully.')}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold rounded-xl flex items-center space-x-2 transition-all shadow-lg"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>EXPORT HISTORICAL AUDIT</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">TOTAL ARCHIVED ALERTS</span>
          <strong className="text-2xl font-black text-white block">1,280 Alerts</strong>
          <span className="text-[10px] text-emerald-400 block">100% Post-Landfall Verified</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">HISTORICAL ACCURACY RATE</span>
          <strong className="text-2xl font-black text-emerald-400 block">96.9%</strong>
          <span className="text-[10px] text-emerald-400 block">Within ±2.5% deviation threshold</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">AVG ADVANCE WARNING TIME</span>
          <strong className="text-2xl font-black text-cyan-300 block">62.4 Hours</strong>
          <span className="text-[10px] text-cyan-400 block">Early fleet evacuation time</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">TOTAL MITIGATED DAMAGES</span>
          <strong className="text-2xl font-black text-amber-300 block">$113.1M</strong>
          <span className="text-[10px] text-amber-400 block">Cumulative hull & port savings</span>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alert title, category, or ID..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">ALL MARITIME REGIONS</option>
            <option value="Bay of Bengal">BAY OF BENGAL</option>
            <option value="Arabian Sea">ARABIAN SEA</option>
            <option value="Malacca Strait">MALACCA STRAIT</option>
            <option value="Indian Ocean">INDIAN OCEAN</option>
          </select>
        </div>
      </div>

      {/* TIMELINE RECORDS LIST */}
      <div className="space-y-4 font-mono">
        {filteredRecords.map((rec) => (
          <div
            key={rec.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl hover:border-slate-700 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center space-x-2 text-[10px] text-blue-400 font-bold uppercase mb-1">
                  <span>{rec.id}</span>
                  <span>•</span>
                  <span>{rec.category}</span>
                  <span>•</span>
                  <span className="text-slate-400">{rec.region}</span>
                </div>
                <h4 className="text-base font-bold text-white leading-snug">{rec.title}</h4>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-black">
                  {rec.accuracyRatePercent}% ACCURATE
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
                <span className="text-[10px] text-slate-500 block">Predicted At:</span>
                <span className="text-slate-200 font-bold">{rec.predictedAt}</span>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
                <span className="text-[10px] text-slate-500 block">Lead Warning Time:</span>
                <span className="text-cyan-300 font-bold">{rec.leadTimeHours} Hours Advance</span>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
                <span className="text-[10px] text-slate-500 block">Predicted vs Observed:</span>
                <span className="text-slate-300 text-[10px] block">P: {rec.predictedMetric}</span>
                <span className="text-emerald-400 text-[10px] block font-bold">O: {rec.actualObservedMetric}</span>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
                <span className="text-[10px] text-slate-500 block">Mitigated Loss Savings:</span>
                <span className="text-amber-300 font-black">{rec.impactMitigatedUSD}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
