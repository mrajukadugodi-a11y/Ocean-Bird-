import React, { useState } from 'react';
import { Layers, Thermometer, Wind, Waves, Sun, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface LegendItem {
  id: string;
  layerName: string;
  category: 'SST_ANOMALY' | 'WAVE_SEVERITY' | 'CORAL_BLEACHING' | 'CYCLONE_WINDS' | 'ECA_CARBON';
  unit: string;
  gradientColors: string[];
  scaleSteps: { label: string; color: string; description: string }[];
  operationalGuidance: string;
}

const CLIMATE_LEGEND_DATA: LegendItem[] = [
  {
    id: 'LEG-01',
    layerName: 'Sea Surface Temperature (SST) Anomaly Layer',
    category: 'SST_ANOMALY',
    unit: 'Degrees Celsius (°C deviation from 30-yr mean)',
    gradientColors: ['#3b82f6', '#10b981', '#eab308', '#f97316', '#ef4444'],
    scaleSteps: [
      { label: '-2.0°C to 0°C', color: '#3b82f6', description: 'Cooler than average; normal current speeds' },
      { label: '+0.5°C to +1.5°C', color: '#10b981', description: 'Mild thermal elevation; monitor engine cooling intake' },
      { label: '+1.5°C to +3.0°C', color: '#eab308', description: 'Moderate marine heatwave; increased hull fouling' },
      { label: '+3.0°C+', color: '#ef4444', description: 'Severe marine heatwave; high risk of localized tropical squalls' }
    ],
    operationalGuidance: 'Ensure main engine jacket water cooling strainers are free of thermal micro-algae blooms.'
  },
  {
    id: 'LEG-02',
    layerName: 'Significant Wave Height & Sea State Severity',
    category: 'WAVE_SEVERITY',
    unit: 'Meters (Significant Wave Height - Hs)',
    gradientColors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'],
    scaleSteps: [
      { label: '0.0m - 1.5m', color: '#06b6d4', description: 'Smooth to Slight Sea State (Beaufort 0-3)' },
      { label: '1.5m - 3.5m', color: '#3b82f6', description: 'Moderate Sea State; minor cargo lash tension check' },
      { label: '3.5m - 6.0m', color: '#8b5cf6', description: 'Rough to Very Rough; speed reduction recommended' },
      { label: '6.0m+', color: '#f43f5e', description: 'Phenomenal Seas; mandatory weather routing detour' }
    ],
    operationalGuidance: 'Check deck container lashing twistlocks and heavy lift securement when entering 3.5m+ zones.'
  },
  {
    id: 'LEG-03',
    layerName: 'Coral Bleaching Thermal Stress (DHW Index)',
    category: 'CORAL_BLEACHING',
    unit: 'Degree Heating Weeks (DHW in °C-weeks)',
    gradientColors: ['#10b981', '#f59e0b', '#f97316', '#dc2626'],
    scaleSteps: [
      { label: '0 - 4 DHW', color: '#10b981', description: 'No thermal stress on coral reefs' },
      { label: '4 - 8 DHW', color: '#f59e0b', description: 'Bleaching Watch; zero speed deviation required' },
      { label: '8 - 12 DHW', color: '#f97316', description: 'Bleaching Warning Level 1; zero bilge discharge enforced' },
      { label: '12+ DHW', color: '#dc2626', description: 'Bleaching Alert Level 2; speed restricted to 8 knots in PSSA' }
    ],
    operationalGuidance: 'Strict zero-discharge ballast and bilge pumps enforced near PSSA reef corridors.'
  }
];

export const ClimateMapLegendView: React.FC = () => {
  const [legends] = useState<LegendItem[]>(CLIMATE_LEGEND_DATA);
  const [selectedLegend, setSelectedLegend] = useState<LegendItem>(CLIMATE_LEGEND_DATA[0]);

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
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Oceanic Climate & Meteorological Map Legend Guide</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Visual color gradient keys, thermal stress scales, wave height thresholds, and layer navigation legends
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          GIS MAP LAYER SCALE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Layer Legend Selector List */}
        <div className="lg:col-span-2 space-y-3">
          {legends.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedLegend(item);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedLegend.id === item.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-[8px] text-cyan-400 font-bold uppercase">{item.category.replace(/_/g, ' ')}</span>
                <span className="text-[9px] text-slate-500 font-mono">{item.unit}</span>
              </div>

              <h4 className="text-xs font-bold text-white">{item.layerName}</h4>

              {/* Color Gradient Bar */}
              <div className="space-y-1">
                <div
                  className="h-3 rounded-full w-full"
                  style={{
                    background: `linear-gradient(to right, ${item.gradientColors.join(', ')})`
                  }}
                />
                <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                  <span>{item.scaleSteps[0].label}</span>
                  <span>{item.scaleSteps[item.scaleSteps.length - 1].label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Legend Scale Breakdown */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedLegend.id} SCALE LEGEND</span>
              <h4 className="text-xs font-bold text-white">{selectedLegend.layerName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans mt-0.5">{selectedLegend.unit}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <span className="text-slate-500 block font-bold mb-1">GRADIENT THRESHOLD STEPS:</span>
              {selectedLegend.scaleSteps.map((step) => (
                <div key={step.label} className="flex items-center space-x-2 border-t border-slate-800/80 pt-1.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                  />
                  <div className="flex-1 text-[9px]">
                    <span className="text-white font-bold block">{step.label}</span>
                    <span className="text-slate-400 font-sans block">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-cyan-950/30 border border-cyan-800 p-3 rounded-xl text-[10px] text-cyan-300 space-y-1">
              <span className="font-bold block text-cyan-400">NAVIGATION ADVISORY NOTE:</span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">
                {selectedLegend.operationalGuidance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
