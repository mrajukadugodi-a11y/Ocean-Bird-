import React, { useState } from 'react';
import { Cpu, Activity, AlertTriangle, CheckCircle2, Wrench, RefreshCw, Zap, Gauge, HardDrive, Sparkles, Clock, Layers } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export interface ComponentHealthStatus {
  id: string;
  componentName: string;
  vesselName: string;
  rulPercentage: number; // Remaining Useful Life %
  healthGrade: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
  vibrationMmSec: number;
  temperatureCelsius: number;
  oilViscosityCst: number;
  predictedFailureDays: number;
  recommendedAction: string;
}

export const PREDICTIVE_COMPONENTS: ComponentHealthStatus[] = [
  {
    id: 'COMP-001',
    componentName: 'Main Engine Turbocharger Nozzle Ring',
    vesselName: 'MV DESH SHANTI',
    rulPercentage: 88,
    healthGrade: 'OPTIMAL',
    vibrationMmSec: 1.8,
    temperatureCelsius: 410,
    oilViscosityCst: 14.2,
    predictedFailureDays: 142,
    recommendedAction: 'Standard 2,000-hour inspection during next Singapore port call.'
  },
  {
    id: 'COMP-002',
    componentName: 'Auxiliary Generator #2 Fuel Injector Valves',
    vesselName: 'EVER GIVEN II',
    rulPercentage: 42,
    healthGrade: 'WARNING',
    vibrationMmSec: 4.6,
    temperatureCelsius: 520,
    oilViscosityCst: 18.5,
    predictedFailureDays: 14,
    recommendedAction: 'Vibration anomaly detected (+28%). Replace injector nozzle tips in Colombo port bunkering.'
  },
  {
    id: 'COMP-003',
    componentName: 'Propeller Shaft Intermediate Bearing #3',
    vesselName: 'BANGLADESH SAMUDRA',
    rulPercentage: 24,
    healthGrade: 'CRITICAL',
    vibrationMmSec: 7.2,
    temperatureCelsius: 82,
    oilViscosityCst: 22.1,
    predictedFailureDays: 4,
    recommendedAction: 'CRITICAL: High bearing temperature alert (82°C). Order replacement bearing assembly & reduce RPM by 10%.'
  },
  {
    id: 'COMP-004',
    componentName: 'Hydraulic Steering Gear Rams & Servo Valves',
    vesselName: 'CORDELIA EMPRESS',
    rulPercentage: 94,
    healthGrade: 'OPTIMAL',
    vibrationMmSec: 0.9,
    temperatureCelsius: 48,
    oilViscosityCst: 32.0,
    predictedFailureDays: 210,
    recommendedAction: 'Hydraulic pressure nominal at 180 bar. No intervention required.'
  }
];

export const TELEMETRY_TIME_SERIES = [
  { time: '00:00', vibration: 1.8, temp: 410, RUL: 88 },
  { time: '04:00', vibration: 2.1, temp: 415, RUL: 87 },
  { time: '08:00', vibration: 2.3, temp: 420, RUL: 86 },
  { time: '12:00', vibration: 2.0, temp: 412, RUL: 86 },
  { time: '16:00', vibration: 2.4, temp: 425, RUL: 85 },
  { time: '20:00', vibration: 2.2, temp: 418, RUL: 85 }
];

export const PredictiveMaintenanceView: React.FC = () => {
  const [components, setComponents] = useState<ComponentHealthStatus[]>(PREDICTIVE_COMPONENTS);
  const [selectedCompId, setSelectedCompId] = useState<string>('COMP-003');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  const activeComp = components.find((c) => c.id === selectedCompId) || components[0];

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setDispatchSuccess(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setComponents((prev) =>
        prev.map((c) =>
          c.id === selectedCompId
            ? {
                ...c,
                rulPercentage: Math.max(10, c.rulPercentage - 1),
                vibrationMmSec: Number((c.vibrationMmSec + 0.1).toFixed(1))
              }
            : c
        )
      );
    }, 1200);
  };

  const handleDispatchWorkOrder = () => {
    setDispatchSuccess(`Work Order #WO-${Date.now().toString().slice(-6)} dispatched to Fleet Technical Superintendent!`);
  };

  return (
    <div id="predictive-maintenance-view" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>AI-POWERED FLEET EQUIPMENT FAILURE FORECASTING & DIAGNOSTICS</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Wrench className="w-6 h-6 text-cyan-400" />
            <span>Predictive Equipment Maintenance Portal</span>
          </h2>
          <p className="text-xs text-slate-400">
            Machine-learning telemetry analysis predicting Remaining Useful Life (RUL), bearing vibration anomalies, and automated spare parts dispatch.
          </p>
        </div>

        {/* AI Analysis Action */}
        <button
          disabled={isAnalyzing}
          onClick={handleRunAiAnalysis}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black font-mono text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-[1.02]"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>RUNNING VIBRATION NEURAL NET...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>RUN AI TELEMETRY DIAGNOSTICS</span>
            </>
          )}
        </button>
      </div>

      {dispatchSuccess && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-mono font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{dispatchSuccess}</span>
        </div>
      )}

      {/* Component Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {components.map((comp) => {
          const isSelected = comp.id === selectedCompId;
          const isCritical = comp.healthGrade === 'CRITICAL';
          const isWarning = comp.healthGrade === 'WARNING';

          return (
            <div
              key={comp.id}
              onClick={() => setSelectedCompId(comp.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                isSelected
                  ? 'bg-slate-950 border-cyan-400 shadow-xl shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  isCritical
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : isWarning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {comp.healthGrade}
                </span>
                <span className="text-[10px] text-slate-500 font-bold">{comp.vesselName}</span>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-xs line-clamp-1">{comp.componentName}</h4>
                <span className="text-[10px] text-slate-400">Failure in ~{comp.predictedFailureDays} days</span>
              </div>

              {/* RUL Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400">RUL Life Expectancy</span>
                  <strong className={isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}>
                    {comp.rulPercentage}%
                  </strong>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all ${
                      isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${comp.rulPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Component Detailed Diagnostics Panel */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 font-mono text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">SELECTED COMPONENT TELEMETRY DEEP-DIVE</span>
            <h3 className="text-lg font-black text-white mt-0.5">{activeComp.componentName}</h3>
            <p className="text-slate-400 text-xs">Vessel: {activeComp.vesselName} • Sensor ID: {activeComp.id}</p>
          </div>

          <button
            onClick={handleDispatchWorkOrder}
            className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold flex items-center space-x-2 transition-all"
          >
            <Wrench className="w-4 h-4 text-rose-400" />
            <span>DISPATCH EMERGENCY MAINTENANCE WORK ORDER</span>
          </button>
        </div>

        {/* 3 Telemetry Gauge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">VIBRATION VELOCITY</span>
            <strong className="text-xl font-black text-cyan-300 block">{activeComp.vibrationMmSec} mm/sec RMS</strong>
            <span className="text-[10px] text-slate-400">ISO 10816 Limit: 4.5 mm/s</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">OPERATING TEMPERATURE</span>
            <strong className="text-xl font-black text-amber-300 block">{activeComp.temperatureCelsius}°C</strong>
            <span className="text-[10px] text-slate-400">Thermal Threshold: 90°C</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block">LUBRICATING OIL VISCOSITY</span>
            <strong className="text-xl font-black text-emerald-300 block">{activeComp.oilViscosityCst} cSt</strong>
            <span className="text-[10px] text-slate-400">ASTM D445 Standard</span>
          </div>
        </div>

        {/* Recommendation Callout */}
        <div className="p-4 bg-slate-900/90 border border-cyan-500/30 rounded-xl space-y-1.5">
          <span className="text-[10px] text-cyan-400 font-bold uppercase flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI DIAGNOSTIC RECOMMENDATION & PRESCRIPTION:</span>
          </span>
          <p className="text-white text-xs font-bold leading-relaxed">{activeComp.recommendedAction}</p>
        </div>
      </div>
    </div>
  );
};
