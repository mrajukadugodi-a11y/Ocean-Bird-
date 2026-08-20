import React, { useState } from 'react';
import { ShieldAlert, Activity, CheckCircle2, AlertTriangle, Sliders, ChevronRight, Gauge } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface PirateRiskScoreProps {
  freeboardMeters?: number;
  vesselSpeedKnots?: number;
  bmpReadinessPct?: number;
  regionRiskLevel?: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
}

export const PirateRiskScoreCard: React.FC<PirateRiskScoreProps> = ({
  freeboardMeters: initialFreeboard = 4.5,
  vesselSpeedKnots: initialSpeed = 14.0,
  bmpReadinessPct: initialBmp = 85,
  regionRiskLevel = 'HIGH'
}) => {
  const [freeboard, setFreeboard] = useState<number>(initialFreeboard);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [bmpReadiness, setBmpReadiness] = useState<number>(initialBmp);
  const [isNightTime, setIsNightTime] = useState<boolean>(true);

  // Calculate Dynamic Risk Score (0 = Low Risk, 100 = Critical Risk)
  const calculateRiskScore = () => {
    let score = 50; // base

    // Region factor
    if (regionRiskLevel === 'CRITICAL') score += 25;
    else if (regionRiskLevel === 'HIGH') score += 15;
    else if (regionRiskLevel === 'ELEVATED') score += 5;

    // Freeboard factor (< 6m freeboard is easier to board)
    if (freeboard < 3) score += 20;
    else if (freeboard < 6) score += 10;
    else if (freeboard > 9) score -= 15;

    // Speed factor (> 18 knots makes skiff boarding nearly impossible)
    if (speed < 12) score += 20;
    else if (speed < 16) score += 5;
    else if (speed >= 18) score -= 25;

    // Night time factor
    if (isNightTime) score += 10;

    // BMP Readiness mitigation
    score -= Math.round((bmpReadiness / 100) * 20);

    return Math.max(5, Math.min(98, score));
  };

  const riskScore = calculateRiskScore();

  const getRiskBadge = (score: number) => {
    if (score >= 75) return { label: 'CRITICAL THREAT', color: 'bg-rose-950 text-rose-300 border-rose-800' };
    if (score >= 50) return { label: 'HIGH RISK', color: 'bg-amber-950 text-amber-300 border-amber-800' };
    if (score >= 30) return { label: 'ELEVATED RISK', color: 'bg-indigo-950 text-indigo-300 border-indigo-800' };
    return { label: 'LOW THREAT', color: 'bg-emerald-950 text-emerald-300 border-emerald-800' };
  };

  const badge = getRiskBadge(riskScore);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Gauge className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Vessel Piracy Boarding Risk Index Calculator
          </h3>
        </div>
        <span className={`px-2.5 py-1 rounded text-[10px] font-black border font-mono ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Score Radial Visualizer */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center space-y-1">
          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Dynamic Risk Score</span>
          <div className="relative flex items-center justify-center my-2">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="38" stroke="#1e293b" strokeWidth="8" fill="transparent" />
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke={riskScore > 70 ? '#f43f5e' : riskScore > 40 ? '#f59e0b' : '#10b981'}
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 38}
                strokeDashoffset={2 * Math.PI * 38 * (1 - riskScore / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute text-2xl font-black text-white font-mono">{riskScore}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Out of 100 Risk Points</span>
        </div>

        {/* Interactive Parameter Sliders */}
        <div className="md:col-span-2 space-y-3 bg-slate-950 border border-slate-800 p-4 rounded-2xl">
          {/* Freeboard Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-300 font-bold">Low Freeboard Height:</span>
              <span className="text-cyan-400 font-bold">{freeboard.toFixed(1)} Meters</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="12.0"
              step="0.5"
              value={freeboard}
              onChange={(e) => {
                setFreeboard(parseFloat(e.target.value));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[9px] text-slate-500 font-mono">
              Lower freeboard (&lt; 4m) increases vulnerability to ladder boardings.
            </span>
          </div>

          {/* Speed Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-300 font-bold">Current Speed Through Water:</span>
              <span className="text-emerald-400 font-bold">{speed.toFixed(1)} Knots</span>
            </div>
            <input
              type="range"
              min="8.0"
              max="24.0"
              step="0.5"
              value={speed}
              onChange={(e) => {
                setSpeed(parseFloat(e.target.value));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <span className="text-[9px] text-slate-500 font-mono">
              Speeds above 18 Knots make skiff boarding nearly impossible according to BMP5 statistics.
            </span>
          </div>

          {/* Night vs Day Toggle */}
          <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-slate-900">
            <span className="text-slate-300 font-bold">Transit Window:</span>
            <button
              onClick={() => {
                setIsNightTime(!isNightTime);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${
                isNightTime ? 'bg-indigo-950 text-indigo-300 border-indigo-800' : 'bg-amber-950 text-amber-300 border-amber-800'
              }`}
            >
              {isNightTime ? '🌙 NIGHT TIME (+10 RISK)' : '☀️ DAYLIGHT TRANSIT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
