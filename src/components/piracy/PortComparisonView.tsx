import React, { useState } from 'react';
import { Anchor, ShieldCheck, Scale, ArrowRightLeft, Star, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ComparablePort {
  id: string;
  name: string;
  unLocode: string;
  country: string;
  ispsLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3';
  maxDraftMeters: number;
  securityRatingStars: number;
  piracyThreat: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  cyberDefenseScorePct: number;
  bunkerFuelAvailable: boolean;
  pilots24_7: boolean;
}

const PORT_COMPARISON_DATA: ComparablePort[] = [
  {
    id: 'PORT-RTM',
    name: 'Port of Rotterdam',
    unLocode: 'NL RTM',
    country: 'Netherlands',
    ispsLevel: 'LEVEL_1',
    maxDraftMeters: 24.0,
    securityRatingStars: 5,
    piracyThreat: 'LOW',
    cyberDefenseScorePct: 98,
    bunkerFuelAvailable: true,
    pilots24_7: true
  },
  {
    id: 'PORT-SIN',
    name: 'Port of Singapore',
    unLocode: 'SG SIN',
    country: 'Singapore',
    ispsLevel: 'LEVEL_1',
    maxDraftMeters: 22.5,
    securityRatingStars: 5,
    piracyThreat: 'MODERATE',
    cyberDefenseScorePct: 96,
    bunkerFuelAvailable: true,
    pilots24_7: true
  },
  {
    id: 'PORT-CPH',
    name: 'Copenhagen & Malmö (CMP)',
    unLocode: 'DK CPH',
    country: 'Denmark / Sweden',
    ispsLevel: 'LEVEL_1',
    maxDraftMeters: 13.5,
    securityRatingStars: 5,
    piracyThreat: 'LOW',
    cyberDefenseScorePct: 94,
    bunkerFuelAvailable: true,
    pilots24_7: true
  },
  {
    id: 'PORT-ADE',
    name: 'Port of Aden',
    unLocode: 'YE ADE',
    country: 'Yemen',
    ispsLevel: 'LEVEL_2',
    maxDraftMeters: 11.8,
    securityRatingStars: 2,
    piracyThreat: 'HIGH',
    cyberDefenseScorePct: 62,
    bunkerFuelAvailable: false,
    pilots24_7: false
  }
];

export const PortComparisonView: React.FC = () => {
  const [portA, setPortA] = useState<ComparablePort>(PORT_COMPARISON_DATA[0]);
  const [portB, setPortB] = useState<ComparablePort>(PORT_COMPARISON_DATA[2]);

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
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Side-by-Side Maritime Port Security & Operational Comparison Matrix</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Compare ISPS security levels, draft depths, cyber defense scores, and threat profiles across commercial ports
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1.5">
          <ArrowRightLeft className="w-3 h-3" />
          <span>PORT BENCHMARK COMPARATOR</span>
        </span>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <label className="text-[9px] text-cyan-400 font-bold block mb-1">PORT A (PRIMARY):</label>
          <select
            value={portA.id}
            onChange={(e) => {
              const selected = PORT_COMPARISON_DATA.find((p) => p.id === e.target.value);
              if (selected) {
                setPortA(selected);
                hapticEngine.trigger('click');
              }
            }}
            className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 font-bold"
          >
            {PORT_COMPARISON_DATA.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.unLocode})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[9px] text-amber-400 font-bold block mb-1">PORT B (BENCHMARK):</label>
          <select
            value={portB.id}
            onChange={(e) => {
              const selected = PORT_COMPARISON_DATA.find((p) => p.id === e.target.value);
              if (selected) {
                setPortB(selected);
                hapticEngine.trigger('click');
              }
            }}
            className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 font-bold"
          >
            {PORT_COMPARISON_DATA.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.unLocode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-[10px] font-mono border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400">
              <th className="p-3 w-1/3">METRIC / PARAMETER</th>
              <th className="p-3 w-1/3 text-cyan-400 font-bold">{portA.name} ({portA.unLocode})</th>
              <th className="p-3 w-1/3 text-amber-400 font-bold">{portB.name} ({portB.unLocode})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 text-slate-300">
            <tr>
              <td className="p-3 text-slate-400">ISPS Security Compliance</td>
              <td className="p-3 font-bold text-emerald-400">{portA.ispsLevel.replace('_', ' ')}</td>
              <td className="p-3 font-bold text-emerald-400">{portB.ispsLevel.replace('_', ' ')}</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-400">Piracy Threat Index</td>
              <td className={`p-3 font-bold ${portA.piracyThreat === 'LOW' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {portA.piracyThreat}
              </td>
              <td className={`p-3 font-bold ${portB.piracyThreat === 'LOW' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {portB.piracyThreat}
              </td>
            </tr>
            <tr>
              <td className="p-3 text-slate-400">Max Permissible Draft</td>
              <td className="p-3 font-bold text-white">{portA.maxDraftMeters} meters</td>
              <td className="p-3 font-bold text-white">{portB.maxDraftMeters} meters</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-400">Cyber Defense Score</td>
              <td className="p-3 font-bold text-cyan-300">{portA.cyberDefenseScorePct}%</td>
              <td className="p-3 font-bold text-cyan-300">{portB.cyberDefenseScorePct}%</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-400">Bunker Fuel Infrastructure</td>
              <td className="p-3 font-bold text-white">{portA.bunkerFuelAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}</td>
              <td className="p-3 font-bold text-white">{portB.bunkerFuelAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-400">24/7 Maritime Pilot Escort</td>
              <td className="p-3 font-bold text-emerald-400">{portA.pilots24_7 ? 'YES' : 'NO'}</td>
              <td className="p-3 font-bold text-emerald-400">{portB.pilots24_7 ? 'YES' : 'NO'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
