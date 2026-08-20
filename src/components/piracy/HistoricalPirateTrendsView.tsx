import React, { useState } from 'react';
import { BarChart3, TrendingUp, ShieldAlert, PieChart, Layers } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

const YEARLY_PIRACY_TRENDS = [
  { year: '2023', totalAttacks: 115, repelledPct: 82, hijackedCount: 4 },
  { year: '2024', totalAttacks: 132, repelledPct: 88, hijackedCount: 3 },
  { year: '2025', totalAttacks: 98, repelledPct: 91, hijackedCount: 1 },
  { year: '2026 (YTD)', totalAttacks: 64, repelledPct: 95, hijackedCount: 0 }
];

const REGIONAL_ATTACK_TYPES = [
  { region: 'Bab-el-Mandeb & Red Sea', primary: 'USV / Drones & Skiff Chases', sharePct: 42 },
  { region: 'Strait of Malacca', primary: 'Boarding at Anchor & Petty Theft', sharePct: 28 },
  { region: 'Gulf of Guinea', primary: 'Kidnap for Ransom (Offshore)', sharePct: 18 },
  { region: 'Somali Basin / Indian Ocean', primary: 'Mothership Dhow Approaches', sharePct: 12 }
];

export const HistoricalPirateTrendsView: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2026 (YTD)');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-5 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Global Maritime Piracy Historical Trends & Success Rate Analytics</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Year-over-year attack volumes, BMP5 hardening repellent rates, and incident typology breakdown
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {YEARLY_PIRACY_TRENDS.map((t) => (
            <button
              key={t.year}
              onClick={() => {
                setSelectedYear(t.year);
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                selectedYear === t.year
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {t.year}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Yearly Volume Bar Chart */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Yearly Global Piracy Incidents vs Repel Rate</span>

          <div className="space-y-3 pt-2">
            {YEARLY_PIRACY_TRENDS.map((trend) => (
              <div key={trend.year} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-white font-bold">{trend.year}</span>
                  <span className="text-slate-400">
                    <strong className="text-cyan-400">{trend.totalAttacks} Attacks</strong> • {trend.repelledPct}% Repelled
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${trend.repelledPct}%` }} />
                  <div className="bg-rose-500 h-full" style={{ width: `${100 - trend.repelledPct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-500 pt-2 border-t border-slate-900">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Repelled / Failed Attack</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              <span>Successful Boarding</span>
            </span>
          </div>
        </div>

        {/* Regional Typology Breakdown */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Threat Modality Breakdown by Region</span>

          <div className="space-y-2.5">
            {REGIONAL_ATTACK_TYPES.map((item) => (
              <div key={item.region} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-white font-bold">{item.region}</span>
                  <span className="text-amber-400 font-bold">{item.sharePct}% Share</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans">{item.primary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
