import React, { useState } from 'react';
import { TrendingUp, Thermometer, Droplets, Wind, Calendar, AlertTriangle, Layers, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface DecadeTrend {
  decade: string;
  avgSstAnomalyC: number;
  salinityPsu: number;
  stormCountPerYear: number;
  iceFreeDaysPerYear: number;
  summary: string;
}

const HISTORICAL_DATA: Record<string, DecadeTrend[]> = {
  BALTIC: [
    { decade: '1990s', avgSstAnomalyC: 0.2, salinityPsu: 7.8, stormCountPerYear: 12, iceFreeDaysPerYear: 265, summary: 'Baseline cold-temperate winter sea ice coverage across Bothnian and Gulf of Finland.' },
    { decade: '2000s', avgSstAnomalyC: 0.6, salinityPsu: 7.5, stormCountPerYear: 15, iceFreeDaysPerYear: 285, summary: 'Accelerating winter ice retreat; increase in autumn gale frequencies.' },
    { decade: '2010s', avgSstAnomalyC: 1.1, salinityPsu: 7.2, stormCountPerYear: 19, iceFreeDaysPerYear: 310, summary: 'Marked reduction in coastal fast ice; expanding hypoxic dead zones in Bornholm Deep.' },
    { decade: '2020s', avgSstAnomalyC: 1.7, salinityPsu: 6.9, stormCountPerYear: 24, iceFreeDaysPerYear: 335, summary: 'Record summer heatwaves (SST >22°C); severe cyanobacteria blooms restricting maritime visibility.' },
    { decade: '2030s (Proj)', avgSstAnomalyC: 2.3, salinityPsu: 6.6, stormCountPerYear: 29, iceFreeDaysPerYear: 352, summary: 'Near ice-free winters across southern basins; heightened gale risk for commercial shipping.' }
  ],
  RED_SEA: [
    { decade: '1990s', avgSstAnomalyC: 0.1, salinityPsu: 40.2, stormCountPerYear: 4, iceFreeDaysPerYear: 365, summary: 'Stable hyper-saline tropical sea temperatures supporting vibrant coral reef barriers.' },
    { decade: '2000s', avgSstAnomalyC: 0.4, salinityPsu: 40.5, stormCountPerYear: 6, iceFreeDaysPerYear: 365, summary: 'Minor thermal anomalies triggering localized coral bleaching in southern Bab-el-Mandeb.' },
    { decade: '2010s', avgSstAnomalyC: 0.9, salinityPsu: 40.9, stormCountPerYear: 8, iceFreeDaysPerYear: 365, summary: 'Intensified summer thermal stress; increased dust storm frequency impacting radar sensors.' },
    { decade: '2020s', avgSstAnomalyC: 1.5, salinityPsu: 41.3, stormCountPerYear: 12, iceFreeDaysPerYear: 365, summary: 'Elevated surface evaporation driving extreme salinity and localized squall turbulence.' },
    { decade: '2030s (Proj)', avgSstAnomalyC: 2.1, salinityPsu: 41.8, stormCountPerYear: 16, iceFreeDaysPerYear: 365, summary: 'Extreme SST thresholds (>34°C); severe weather hazards in narrow strait corridors.' }
  ]
};

export const ClimateHistoricalTrendView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('BALTIC');
  const [selectedDecade, setSelectedDecade] = useState<string>('2020s');

  const regionData = HISTORICAL_DATA[selectedRegion] || HISTORICAL_DATA.BALTIC;
  const currentTrend = regionData.find((d) => d.decade === selectedDecade) || regionData[3];

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
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Multi-Decadal Oceanic Climate Historical Trends (1990–2030)</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Historical Sea Surface Temperature (SST) anomalies, salinity shifts, storm frequency, and navigation impact logs
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedRegion('BALTIC');
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedRegion === 'BALTIC'
                ? 'bg-cyan-500 text-slate-950 font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            BALTIC SEA
          </button>

          <button
            onClick={() => {
              setSelectedRegion('RED_SEA');
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedRegion === 'RED_SEA'
                ? 'bg-cyan-500 text-slate-950 font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            RED SEA & BAB-EL-MANDEB
          </button>
        </div>
      </div>

      {/* Decade Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {regionData.map((d) => (
          <button
            key={d.decade}
            onClick={() => {
              setSelectedDecade(d.decade);
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedDecade === d.decade
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500 shadow'
                : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-slate-300'
            }`}
          >
            {d.decade}
          </button>
        ))}
      </div>

      {/* Main Focus Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-400 font-bold block flex items-center space-x-1">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>SST ANOMALY</span>
          </span>
          <p className="text-base font-black text-rose-400">+{currentTrend.avgSstAnomalyC}°C</p>
          <span className="text-[8px] text-slate-500 font-sans">Above pre-industrial baseline</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-400 font-bold block flex items-center space-x-1">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>SALINITY LEVEL</span>
          </span>
          <p className="text-base font-black text-cyan-300">{currentTrend.salinityPsu} PSU</p>
          <span className="text-[8px] text-slate-500 font-sans">Practical Salinity Units</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-400 font-bold block flex items-center space-x-1">
            <Wind className="w-3.5 h-3.5 text-amber-400" />
            <span>STORM FREQUENCY</span>
          </span>
          <p className="text-base font-black text-amber-300">{currentTrend.stormCountPerYear} Events/Yr</p>
          <span className="text-[8px] text-slate-500 font-sans">Severe marine gale weather</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
          <span className="text-[9px] text-slate-400 font-bold block flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>ICE-FREE DAYS</span>
          </span>
          <p className="text-base font-black text-emerald-300">{currentTrend.iceFreeDaysPerYear} Days/Yr</p>
          <span className="text-[8px] text-slate-500 font-sans">Navigable shipping window</span>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <h4 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-cyan-400" />
          <span>Historical Analysis Narrative — {selectedDecade} ({selectedRegion})</span>
        </h4>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {currentTrend.summary}
        </p>
      </div>
    </motion.div>
  );
};
