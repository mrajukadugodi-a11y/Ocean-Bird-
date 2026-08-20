import React, { useState } from 'react';
import { CloudRain, Thermometer, Wind, Waves, AlertTriangle, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateScenario {
  id: string;
  name: string;
  tempIncrease: string;
  seaLevelRiseCm: number;
  typhoonFrequencyIncPct: number;
  piracySeasonShiftDays: number;
  chokepointDisruptionRisk: 'CRITICAL' | 'HIGH' | 'MODERATE';
}

const SCENARIOS: ClimateScenario[] = [
  {
    id: 'SCEN-1.5',
    name: 'IPCC Paris +1.5°C Baseline Warming',
    tempIncrease: '+1.5°C',
    seaLevelRiseCm: 28,
    typhoonFrequencyIncPct: 15,
    piracySeasonShiftDays: +14,
    chokepointDisruptionRisk: 'MODERATE'
  },
  {
    id: 'SCEN-2.0',
    name: 'IPCC Moderate +2.0°C Warming Path',
    tempIncrease: '+2.0°C',
    seaLevelRiseCm: 48,
    typhoonFrequencyIncPct: 32,
    piracySeasonShiftDays: +28,
    chokepointDisruptionRisk: 'HIGH'
  },
  {
    id: 'SCEN-3.0',
    name: 'Severe Climate Disruption +3.0°C Extreme',
    tempIncrease: '+3.0°C',
    seaLevelRiseCm: 85,
    typhoonFrequencyIncPct: 65,
    piracySeasonShiftDays: +60,
    chokepointDisruptionRisk: 'CRITICAL'
  }
];

export const ClimateScenariosView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ClimateScenario>(SCENARIOS[0]);

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
            <CloudRain className="w-4 h-4 text-cyan-400" />
            <span>Interactive Global Ocean Climate Change & Warming Risk Scenarios</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Model long-term ocean warming, sea level rise, typhoon frequency increases, and shifts in monsoon piracy windows
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          3 CLIMATE MODEL PATHS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SCENARIOS.map((scen) => (
          <motion.div
            key={scen.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              setSelectedScenario(scen);
              hapticEngine.trigger('click');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              selectedScenario.id === scen.id
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{scen.tempIncrease} WARMING</span>
                <h4 className="text-xs font-bold text-white">{scen.name}</h4>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                scen.chokepointDisruptionRisk === 'CRITICAL'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : scen.chokepointDisruptionRisk === 'HIGH'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                RISK: {scen.chokepointDisruptionRisk}
              </span>
            </div>

            <div className="space-y-1.5 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Sea Level Rise:</span>
                <span className="text-cyan-300 font-bold">+{scen.seaLevelRiseCm} cm</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Typhoon Frequency:</span>
                <span className="text-rose-400 font-bold">+{scen.typhoonFrequencyIncPct}% Surge</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Monsoon Piracy Shift:</span>
                <span className="text-amber-300 font-bold">+{scen.piracySeasonShiftDays} Days Window</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
