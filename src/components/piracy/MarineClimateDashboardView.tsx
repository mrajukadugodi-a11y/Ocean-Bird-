import React, { useState } from 'react';
import { LayoutDashboard, Thermometer, Wind, Waves, Globe, Sparkles, Activity, ShieldAlert, Zap, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateMetricCard {
  id: string;
  title: string;
  value: string;
  unit: string;
  trend: string;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
  description: string;
}

const DASHBOARD_METRICS: ClimateMetricCard[] = [
  {
    id: 'MET-01',
    title: 'Global Ocean Heat Content',
    value: '345.2',
    unit: 'Zettajoules (ZJ)',
    trend: '+12.4 ZJ vs 2020 Baseline',
    status: 'CRITICAL',
    description: 'Deep ocean heat absorption reached record high across tropical shipping corridors.'
  },
  {
    id: 'MET-02',
    title: 'Mean Sea Surface Temp',
    value: '21.4',
    unit: '°C Global Average',
    trend: '+1.2°C Thermal Anomaly',
    status: 'WARNING',
    description: 'Elevated SST accelerating tropical cyclone formation in West Pacific.'
  },
  {
    id: 'MET-03',
    title: 'Fleet Carbon Intensity Index',
    value: '4.12',
    unit: 'g CO2 / DWT-NM',
    trend: '-8.5% YoY Decarbonization',
    status: 'OPTIMAL',
    description: 'Fleet wide IMO CII Grade B average achieved via rotor sail retrofits.'
  },
  {
    id: 'MET-04',
    title: 'Arctic Passage Ice Thickness',
    value: '1.24',
    unit: 'Meters Avg Density',
    trend: '-18% Ice Density',
    status: 'WARNING',
    description: 'Northern Sea Route open window expanded by 24 calendar days in 2026.'
  }
];

export const MarineClimateDashboardView: React.FC = () => {
  const [metrics] = useState<ClimateMetricCard[]>(DASHBOARD_METRICS);
  const [selectedMetric, setSelectedMetric] = useState<ClimateMetricCard>(DASHBOARD_METRICS[0]);

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
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Integrated Marine Ocean Climate Executive Dashboard</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Central command overview of global ocean thermal indicators, fleet carbon intensity ratings, and marine hazard telemetry
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>REAL-TIME DASHBOARD</span>
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div
            key={m.id}
            onClick={() => {
              setSelectedMetric(m);
              hapticEngine.trigger('click');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
              selectedMetric.id === m.id
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-cyan-400 font-bold">{m.id}</span>
              <span className={`text-[8px] px-2 py-0.5 rounded font-bold ${
                m.status === 'CRITICAL'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : m.status === 'WARNING'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {m.status}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-sans block">{m.title}</span>
              <div className="flex items-baseline space-x-1 mt-0.5">
                <span className="text-xl font-black text-white">{m.value}</span>
                <span className="text-[9px] text-slate-400">{m.unit}</span>
              </div>
            </div>

            <div className="text-[9px] font-bold text-cyan-300 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
              {m.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Dossier Box */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[8px] text-cyan-400 font-bold block">{selectedMetric.id} METRIC EXECUTIVE BRIEF</span>
            <h4 className="text-sm font-bold text-white">{selectedMetric.title}</h4>
            <span className="text-[10px] text-slate-400 font-sans">{selectedMetric.description}</span>
          </div>

          <span className="text-xs font-black text-cyan-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
            {selectedMetric.value} {selectedMetric.unit}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[10px]">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 font-bold block">IMO COMPLIANCE STATUS:</span>
            <span className="text-emerald-400 font-bold block">FULL IMO 2030 MEPC ALIGNMENT</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 font-bold block">HISTORICAL TREND:</span>
            <span className="text-cyan-300 font-bold block">{selectedMetric.trend}</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 font-bold block">SATELLITE TELEMETRY SENSORS:</span>
            <span className="text-white font-bold block">NOAA & Sentinel-3 Altimetry</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
