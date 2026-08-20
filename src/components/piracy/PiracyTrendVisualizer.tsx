import React, { useState } from 'react';
import { BarChart2, TrendingUp, Clock, ShieldAlert, Map, PieChart } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

const HOURLY_ATTACK_DISTRIBUTION = [
  { hourRange: '00:00 - 04:00', percentage: 48, note: 'Peak Skiff Boarding Window (Night)' },
  { hourRange: '04:00 - 08:00', percentage: 22, note: 'Dawn Approach' },
  { hourRange: '08:00 - 16:00', percentage: 12, note: 'Daylight Transit' },
  { hourRange: '16:00 - 20:00', percentage: 8, note: 'Dusk Patrol' },
  { hourRange: '20:00 - 24:00', percentage: 10, note: 'Early Night' }
];

const CORRIDOR_TRENDS = [
  { corridor: 'Bab-el-Mandeb & Southern Red Sea', riskScore: 92, direction: 'RISING', primaryWeapon: 'USV / RPG Skiffs' },
  { corridor: 'Strait of Malacca (Phillip Channel)', riskScore: 68, direction: 'STABLE', primaryWeapon: 'Knives & Boarding Hooks' },
  { corridor: 'Gulf of Guinea (Offshore Bight of Bonny)', riskScore: 78, direction: 'DECLINING', primaryWeapon: 'Speedboats / Firearms' },
  { corridor: 'Somali Basin / Indian Ocean Outer Boundary', riskScore: 84, direction: 'RISING', primaryWeapon: 'Hijacked Dhow Motherships' }
];

export const PiracyTrendVisualizer: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'HOURLY' | 'CORRIDOR'>('HOURLY');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Global Maritime Piracy Trend & Attack Window Visualizer</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Statistical attack distribution by time-of-day and high-risk corridor threat level shifts
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedMetric('HOURLY');
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
              selectedMetric === 'HOURLY'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            ATTACK HOURS
          </button>
          <button
            onClick={() => {
              setSelectedMetric('CORRIDOR');
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
              selectedMetric === 'CORRIDOR'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            CORRIDOR SHIFTS
          </button>
        </div>
      </div>

      {selectedMetric === 'HOURLY' ? (
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">
            Time-of-Day Attack Frequency Distribution (% of Boardings)
          </span>

          <div className="space-y-3 pt-1">
            {HOURLY_ATTACK_DISTRIBUTION.map((item) => (
              <div key={item.hourRange} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-white font-bold">{item.hourRange}</span>
                  <span className="text-cyan-400 font-bold">{item.percentage}% of Incidents</span>
                </div>
                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.percentage > 30 ? 'bg-rose-500' : item.percentage > 15 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 font-sans block">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CORRIDOR_TRENDS.map((c) => (
            <div key={c.corridor} className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-white font-bold text-xs">{c.corridor}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                    c.direction === 'RISING'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : c.direction === 'DECLINING'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}
                >
                  {c.direction}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Risk Severity Score:</span>
                <span className="text-cyan-400 font-black">{c.riskScore} / 100</span>
              </div>

              <div className="text-[10px] text-slate-400 font-sans border-t border-slate-900 pt-1.5">
                Primary Threat Modality: <strong className="text-slate-200">{c.primaryWeapon}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
