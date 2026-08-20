import React, { useState } from 'react';
import { Anchor, Clock, TrendingUp, BarChart3, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PortPerformanceMetrics {
  id: string;
  portName: string;
  country: string;
  avgBerthMovesPerHour: number;
  avgAnchorageDelayHours: number;
  customsClearanceHours: number;
  piracyThreatGrade: 'LOW' | 'ELEVATED' | 'HIGH';
  throughputRatingPct: number;
}

const PORTS_DATA: PortPerformanceMetrics[] = [
  {
    id: 'PORT-SG',
    portName: 'Port of Singapore',
    country: 'Singapore (SG)',
    avgBerthMovesPerHour: 34,
    avgAnchorageDelayHours: 12,
    customsClearanceHours: 4,
    piracyThreatGrade: 'ELEVATED',
    throughputRatingPct: 96
  },
  {
    id: 'PORT-RTM',
    portName: 'Port of Rotterdam',
    country: 'Netherlands (NL)',
    avgBerthMovesPerHour: 29,
    avgAnchorageDelayHours: 18,
    customsClearanceHours: 6,
    piracyThreatGrade: 'LOW',
    throughputRatingPct: 92
  },
  {
    id: 'PORT-SHA',
    portName: 'Shanghai Yangshan Deepwater',
    country: 'China (CN)',
    avgBerthMovesPerHour: 38,
    avgAnchorageDelayHours: 22,
    customsClearanceHours: 8,
    piracyThreatGrade: 'LOW',
    throughputRatingPct: 98
  },
  {
    id: 'PORT-RDB',
    portName: 'Port of Djibouti (Red Sea Approach)',
    country: 'Djibouti (DJ)',
    avgBerthMovesPerHour: 18,
    avgAnchorageDelayHours: 64,
    customsClearanceHours: 24,
    piracyThreatGrade: 'HIGH',
    throughputRatingPct: 68
  }
];

export const PortPerformanceChartView: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<PortPerformanceMetrics>(PORTS_DATA[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Anchor className="w-4 h-4 text-cyan-400" />
            <span>Global Container Port Terminal Efficiency & Anchorage Delay Performance Matrix</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Compare crane berth productivity (moves/hr), anchorage congestion delays, and security risk ratings across key hub ports
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          4 GLOBAL TERMINALS MONITORED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ports Selection list */}
        <div className="space-y-2">
          {PORTS_DATA.map((port) => (
            <div
              key={port.id}
              onClick={() => {
                setSelectedPort(port);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedPort.id === port.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[8px] text-cyan-400 font-bold block">{port.country}</span>
                  <h4 className="text-xs font-bold text-white">{port.portName}</h4>
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                  port.piracyThreatGrade === 'LOW'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : port.piracyThreatGrade === 'ELEVATED'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  RISK: {port.piracyThreatGrade}
                </span>
              </div>

              {/* Progress bar for moves/hr */}
              <div className="space-y-1 font-sans">
                <div className="flex justify-between text-[9px] font-mono">
                  <span className="text-slate-500">Berth Productivity:</span>
                  <span className="text-emerald-400 font-bold">{port.avgBerthMovesPerHour} Moves / Hour</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-cyan-400 h-full"
                    style={{ width: `${(port.avgBerthMovesPerHour / 40) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Port Detailed Analytics Card */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="border-b border-slate-900 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block uppercase">{selectedPort.country}</span>
              <h4 className="text-sm font-black text-white">{selectedPort.portName}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[8px] block">CRANE MOVES / HR:</span>
                <span className="text-sm font-black text-emerald-400">{selectedPort.avgBerthMovesPerHour}</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[8px] block">ANCHORAGE QUEUE DELAY:</span>
                <span className="text-sm font-black text-amber-400">{selectedPort.avgAnchorageDelayHours} Hours</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[8px] block">CUSTOMS CLEARANCE TIME:</span>
                <span className="text-sm font-black text-cyan-300">{selectedPort.customsClearanceHours} Hours</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[8px] block">THROUGHPUT EFFICIENCY:</span>
                <span className="text-sm font-black text-emerald-300">{selectedPort.throughputRatingPct}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
