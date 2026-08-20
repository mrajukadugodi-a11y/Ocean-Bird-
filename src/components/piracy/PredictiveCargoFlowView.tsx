import React, { useState } from 'react';
import { Package, Truck, Clock, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, Building2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PortCongestionRoute {
  portName: string;
  originalEta: string;
  reroutedEta: string;
  delayHours: number;
  piracyBypassActive: boolean;
  congestionRisk: 'LOW' | 'MEDIUM' | 'SEVERE';
}

const SAMPLE_PORT_FLOWS: PortCongestionRoute[] = [
  {
    portName: 'Rotterdam Gateway Container Terminal',
    originalEta: '12 Aug 14:00 UTC',
    reroutedEta: '14 Aug 02:00 UTC (+36h Cape Route)',
    delayHours: 36,
    piracyBypassActive: true,
    congestionRisk: 'SEVERE'
  },
  {
    portName: 'Port of Singapore Maritime Hub',
    originalEta: '09 Aug 08:30 UTC',
    reroutedEta: '09 Aug 11:00 UTC (+2.5h High Speed)',
    delayHours: 2.5,
    piracyBypassActive: false,
    congestionRisk: 'MEDIUM'
  },
  {
    portName: 'Jebel Ali Port (Dubai Container Terminal)',
    originalEta: '10 Aug 18:00 UTC',
    reroutedEta: '10 Aug 18:00 UTC (Nominal Direct Transit)',
    delayHours: 0,
    piracyBypassActive: false,
    congestionRisk: 'LOW'
  }
];

export const PredictiveCargoFlowView: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<PortCongestionRoute>(SAMPLE_PORT_FLOWS[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <span>AI Predictive Cargo Supply Chain Flow & Port Congestion Forecaster</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Machine learning forecast of port berth bottlenecks, container arrival ETAs, and piracy rerouting delays
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          SUPPLY CHAIN PREDICTION MODEL v4.2
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SAMPLE_PORT_FLOWS.map((port) => (
          <button
            key={port.portName}
            onClick={() => {
              setSelectedPort(port);
              hapticEngine.trigger('click');
            }}
            className={`p-3 rounded-2xl border text-left transition-all space-y-1 ${
              selectedPort.portName === port.portName
                ? 'bg-slate-950 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[11px] font-bold text-white block truncate">{port.portName}</span>
            <div className="flex justify-between items-center text-[9px]">
              <span className="text-slate-400">Delay: +{port.delayHours} hrs</span>
              <span
                className={`font-bold px-1.5 py-0.5 rounded ${
                  port.congestionRisk === 'SEVERE'
                    ? 'bg-rose-950 text-rose-300'
                    : port.congestionRisk === 'MEDIUM'
                    ? 'bg-amber-950 text-amber-300'
                    : 'bg-emerald-950 text-emerald-300'
                }`}
              >
                {port.congestionRisk} RISK
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
          <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1.5">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>{selectedPort.portName} Logistics Forecast</span>
          </span>
          <span className="text-[10px] text-slate-400">
            Piracy Bypass Active: <strong className={selectedPort.piracyBypassActive ? 'text-amber-400' : 'text-slate-400'}>{selectedPort.piracyBypassActive ? 'YES (CAPE ROUTE)' : 'NO (STANDARD)'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Original Schedule ETA:</span>
            <span className="text-white font-bold block">{selectedPort.originalEta}</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-amber-400 block font-bold uppercase">Adjusted AI Predictive ETA:</span>
            <span className="text-amber-300 font-bold block">{selectedPort.reroutedEta}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
