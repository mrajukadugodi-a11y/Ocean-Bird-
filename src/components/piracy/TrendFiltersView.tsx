import React, { useState } from 'react';
import { Filter, Calendar, AlertTriangle, Shield, Thermometer, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TrendFilterConfig {
  timeframe: '1Y' | '3Y' | '5Y' | '10Y' | 'ALL';
  region: 'GLOBAL' | 'BALTIC_SEA' | 'RED_SEA' | 'MALACCA' | 'GULF_OF_GUINEA';
  threatSeverity: 'ALL' | 'CRITICAL_ONLY' | 'MODERATE_PLUS' | 'LOW_ONLY';
  dataMetric: 'PIRACY_INDEX' | 'SST_ANOMALY' | 'POLLUTION_INCIDENTS' | 'WIND_GALE_FREQ';
}

export const TrendFiltersView: React.FC = () => {
  const [filter, setFilter] = useState<TrendFilterConfig>({
    timeframe: '5Y',
    region: 'BALTIC_SEA',
    threatSeverity: 'ALL',
    dataMetric: 'PIRACY_INDEX'
  });

  const [filteredSampleCount, setFilteredSampleCount] = useState<number>(142);

  const updateFilter = (key: keyof TrendFilterConfig, value: string) => {
    hapticEngine.trigger('click');
    setFilter((prev) => {
      const next = { ...prev, [key]: value };
      // Simulate dynamic count update
      const base = value === 'GLOBAL' ? 480 : value === 'BALTIC_SEA' ? 142 : 98;
      setFilteredSampleCount(base);
      return next;
    });
  };

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
            <Filter className="w-4 h-4 text-cyan-400" />
            <span>Multi-Parametric Maritime Trend Filters & Query Builder</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Filter multi-year ocean threat indices, climate anomalies, and regional security telemetry by timeframe and severity
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {filteredSampleCount} MATCHING DATA POINTS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        {/* Timeframe Filter */}
        <div>
          <label className="text-[9px] text-slate-400 font-bold block mb-1">TIMEFRAME SPAN:</label>
          <div className="flex flex-wrap gap-1">
            {(['1Y', '3Y', '5Y', '10Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => updateFilter('timeframe', tf)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  filter.timeframe === tf
                    ? 'bg-cyan-500 text-slate-950 shadow font-black'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Region Filter */}
        <div>
          <label className="text-[9px] text-slate-400 font-bold block mb-1">GEOGRAPHIC REGION:</label>
          <select
            value={filter.region}
            onChange={(e) => updateFilter('region', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-cyan-300 font-bold"
          >
            <option value="GLOBAL">Global Maritime Corridors</option>
            <option value="BALTIC_SEA">Baltic Sea & Danish Straits</option>
            <option value="RED_SEA">Red Sea / Bab-el-Mandeb</option>
            <option value="MALACCA">Singapore & Malacca Strait</option>
            <option value="GULF_OF_GUINEA">Gulf of Guinea Corridor</option>
          </select>
        </div>

        {/* Threat Level Filter */}
        <div>
          <label className="text-[9px] text-slate-400 font-bold block mb-1">THREAT SEVERITY:</label>
          <select
            value={filter.threatSeverity}
            onChange={(e) => updateFilter('threatSeverity', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-amber-300 font-bold"
          >
            <option value="ALL">All Severity Levels</option>
            <option value="CRITICAL_ONLY">Critical Threat Only</option>
            <option value="MODERATE_PLUS">Moderate & Above</option>
            <option value="LOW_ONLY">Advisory / Low Only</option>
          </select>
        </div>

        {/* Data Metric Parameter */}
        <div>
          <label className="text-[9px] text-slate-400 font-bold block mb-1">DATA PARAMETER:</label>
          <select
            value={filter.dataMetric}
            onChange={(e) => updateFilter('dataMetric', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-rose-300 font-bold"
          >
            <option value="PIRACY_INDEX">Piracy Threat Score (0–100)</option>
            <option value="SST_ANOMALY">Sea Surface Temp Anomaly (°C)</option>
            <option value="POLLUTION_INCIDENTS">Marine Pollution Spills</option>
            <option value="WIND_GALE_FREQ">Gale Wind Frequency (%)</option>
          </select>
        </div>
      </div>

      {/* Filter Active State Applied Banner */}
      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center justify-between text-[10px]">
        <div className="flex items-center space-x-2 text-slate-300 font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            Active Filter Matrix: <strong>{filter.region.replace(/_/g, ' ')}</strong> | Timeframe:{' '}
            <strong>{filter.timeframe}</strong> | Metric: <strong>{filter.dataMetric.replace(/_/g, ' ')}</strong>
          </span>
        </div>
        <button
          onClick={() => {
            setFilter({ timeframe: '5Y', region: 'BALTIC_SEA', threatSeverity: 'ALL', dataMetric: 'PIRACY_INDEX' });
            setFilteredSampleCount(142);
            hapticEngine.trigger('click');
          }}
          className="text-cyan-400 font-mono text-[9px] hover:underline flex items-center space-x-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>RESET FILTERS</span>
        </button>
      </div>
    </motion.div>
  );
};
