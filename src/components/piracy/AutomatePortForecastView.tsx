import React, { useState } from 'react';
import { Anchor, Clock, TrendingUp, Cpu, RefreshCw, CheckCircle2, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface AutomatedPortForecast {
  id: string;
  portName: string;
  country: string;
  projectedBerthWaitHours: number;
  craneMoveProductivityPerHour: number;
  congestionIndexPct: number;
  aiConfidencePct: number;
  recommendedArrivalWindow: string;
}

const PORT_FORECASTS: AutomatedPortForecast[] = [
  {
    id: 'FCST-SIN',
    portName: 'Port of Singapore Terminal 4',
    country: 'Singapore (SG)',
    projectedBerthWaitHours: 14.2,
    craneMoveProductivityPerHour: 36,
    congestionIndexPct: 78,
    aiConfidencePct: 96,
    recommendedArrivalWindow: '2026-08-08 04:00 UTC (Off-Peak Slot)'
  },
  {
    id: 'FCST-RTM',
    portName: 'Rotterdam Maasvlakte II',
    country: 'Netherlands (NL)',
    projectedBerthWaitHours: 18.5,
    craneMoveProductivityPerHour: 31,
    congestionIndexPct: 82,
    aiConfidencePct: 94,
    recommendedArrivalWindow: '2026-08-09 12:00 UTC'
  },
  {
    id: 'FCST-LAX',
    portName: 'Port of Los Angeles Pier 400',
    country: 'United States (US)',
    projectedBerthWaitHours: 28.0,
    craneMoveProductivityPerHour: 28,
    congestionIndexPct: 89,
    aiConfidencePct: 91,
    recommendedArrivalWindow: '2026-08-11 08:00 UTC'
  }
];

export const AutomatePortForecastView: React.FC = () => {
  const [forecasts] = useState<AutomatedPortForecast[]>(PORT_FORECASTS);
  const [selectedPort, setSelectedPort] = useState<AutomatedPortForecast>(PORT_FORECASTS[0]);

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
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI Automated Container Port Terminal Congestion & Berth Wait Forecast</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Automated predictive modeling for port anchorage queue delays, crane move rates, and optimal berth arrival windows
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          AUTOMATED FORECAST ENGINE ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {forecasts.map((fc) => (
          <motion.div
            key={fc.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              setSelectedPort(fc);
              hapticEngine.trigger('click');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              selectedPort.id === fc.id
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{fc.country}</span>
                <h4 className="text-xs font-bold text-white">{fc.portName}</h4>
              </div>
              <span className="text-[8px] font-bold text-emerald-300 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                AI CONF: {fc.aiConfidencePct}%
              </span>
            </div>

            <div className="space-y-1 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Berth Wait Delay:</span>
                <span className="text-amber-400 font-bold">{fc.projectedBerthWaitHours} Hours</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Crane Productivity:</span>
                <span className="text-white font-bold">{fc.craneMoveProductivityPerHour} Moves / Hr</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Congestion Index:</span>
                <span className="text-cyan-300 font-bold">{fc.congestionIndexPct}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
