import React, { useState } from 'react';
import {
  Leaf,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Share2,
  TrendingDown,
  Award,
  Globe,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Ship,
  Sparkles,
  Droplet,
  Wind,
  Calendar,
  Layers,
  Check
} from 'lucide-react';

export interface ESGMetric {
  category: 'Environmental' | 'Social' | 'Governance';
  metric: string;
  score: string;
  target: string;
  status: 'Compliant' | 'At Risk' | 'Exceeds Target';
  imoClause: string;
}

export const MaritimeESGReportView: React.FC = () => {
  const [selectedFleet, setSelectedFleet] = useState('OceanBird Tanker & Container Fleet');
  const [reportingPeriod, setReportingPeriod] = useState('Q3 2026 / IMO CII Annual Audit');
  const [downloaded, setDownloaded] = useState(false);

  const ESG_METRICS: ESGMetric[] = [
    {
      category: 'Environmental',
      metric: 'Carbon Intensity Indicator (CII) Rating',
      score: 'Grade A (0.84 gCO2/dwt-nm)',
      target: 'Grade B or higher',
      status: 'Exceeds Target',
      imoClause: 'IMO MARPOL Annex VI Regulation 28'
    },
    {
      category: 'Environmental',
      metric: 'EEXI (Energy Efficiency Existing Ship Index)',
      score: '1.92 gCO2/tn-mile (-18.4%)',
      target: '< 2.10 gCO2/tn-mile',
      status: 'Compliant',
      imoClause: 'IMO MEPC 76 Resolution'
    },
    {
      category: 'Environmental',
      metric: 'Ballast Water Treatment System (BWTS)',
      score: '100% UV Filtration Active',
      target: '100% IMO D-2 Standard',
      status: 'Compliant',
      imoClause: 'BWM Convention Regulation D-2'
    },
    {
      category: 'Social',
      metric: 'Seafarer Fair Welfare & Crew Rest Hours',
      score: '99.4% MLC 2006 Compliance',
      target: '> 98% Rest Log Compliance',
      status: 'Compliant',
      imoClause: 'ILO Maritime Labour Convention 2006'
    },
    {
      category: 'Social',
      metric: 'Zero Lost Time Injury Frequency (LTIF)',
      score: '0.02 Incidents per Million Hours',
      target: '< 0.05 Incidents',
      status: 'Exceeds Target',
      imoClause: 'ISM Code Section 1.2.2'
    },
    {
      category: 'Governance',
      metric: 'Anti-Corruption & Anti-Bribery Audit',
      score: '100% MACN Protocol Verified',
      target: '100% Zero Tolerance',
      status: 'Compliant',
      imoClause: 'Maritime Anti-Corruption Network'
    }
  ];

  const handleDownloadReport = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
    alert('Generating & downloading official IMO MARPOL & EU ETS Maritime ESG Compliance Certificate (PDF)...');
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Leaf className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>IMO MARPOL ANNEX VI & EU ETS COMPLIANT</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                GRADE A CII RATING
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Maritime ESG & Sustainability Audit Report</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Comprehensive Environmental, Social, and Governance (ESG) audit dashboard calculating Carbon Intensity Indicators (CII), Scope 1/2/3 emissions, ballast treatment, and seafarer welfare compliance.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 font-mono">
            <button
              onClick={handleDownloadReport}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center space-x-2"
            >
              {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{downloaded ? 'ESG PDF GENERATED' : 'EXPORT ESG AUDIT PDF'}</span>
            </button>
          </div>
        </div>

        {/* ESG HIGHLIGHT STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Fleet Carbon Rating</span>
            <span className="text-emerald-400 font-black text-lg">CII Grade A (0.84)</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">CO2 Savings YTD</span>
            <span className="text-sky-300 font-black text-lg">-14,280 Metric Tons</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">EU ETS Allowance Cost</span>
            <span className="text-amber-300 font-black text-lg">€ 412,000 Saved</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">MLC 2006 Crew Rest</span>
            <span className="text-purple-300 font-black text-lg">99.4% Compliant</span>
          </div>
        </div>
      </div>

      {/* AUDIT METRICS MATRIX TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>IMO & Maritime ESG Performance Scorecard</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Verified metric scores benchmarked against International Maritime Organization (IMO) targets.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedFleet}
              onChange={(e) => setSelectedFleet(e.target.value)}
              className="bg-slate-950 text-white font-bold text-xs p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-400"
            >
              <option value="OceanBird Tanker & Container Fleet">OceanBird Tanker & Container Fleet</option>
              <option value="SkyWings Passenger Cruise Liner Fleet">SkyWings Passenger Cruise Liner Fleet</option>
              <option value="Global Offshore Supply Vessels">Global Offshore Supply Vessels</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {ESG_METRICS.map((metric, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-emerald-500/40 transition-all shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  metric.category === 'Environmental' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  metric.category === 'Social' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                  'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {metric.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{metric.status}</span>
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-sans">{metric.metric}</h3>
                <span className="text-emerald-400 font-bold text-xs block">{metric.score}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Target:</span>
                  <span className="text-slate-200 font-bold">{metric.target}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[10px]">
                  <span>Regulation:</span>
                  <span className="text-amber-300">{metric.imoClause}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
