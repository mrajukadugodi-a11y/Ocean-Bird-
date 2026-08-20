import React, { useState } from 'react';
import { Globe, MapPin, Filter, CheckCircle2, Navigation, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface GeoRegionFilter {
  id: string;
  regionName: string;
  flag: string;
  latBounds: string;
  lonBounds: string;
  activeVesselCount: number;
  threatCount: number;
  isSelected: boolean;
}

const INITIAL_GEO_FILTERS: GeoRegionFilter[] = [
  {
    id: 'GEO-AUS',
    regionName: 'Australia & Coral Sea Corridor',
    flag: '🇦🇺',
    latBounds: '09°S - 44°S',
    lonBounds: '112°E - 154°E',
    activeVesselCount: 142,
    threatCount: 3,
    isSelected: true
  },
  {
    id: 'GEO-NZ',
    regionName: 'New Zealand & South Pacific Zone',
    flag: '🇳🇿',
    latBounds: '34°S - 48°S',
    lonBounds: '166°E - 178°E',
    activeVesselCount: 68,
    threatCount: 1,
    isSelected: true
  },
  {
    id: 'GEO-PH',
    regionName: 'Philippines Sulu & Sibutu Passage',
    flag: '🇵🇭',
    latBounds: '04°N - 21°N',
    lonBounds: '116°E - 127°E',
    activeVesselCount: 210,
    threatCount: 14,
    isSelected: true
  },
  {
    id: 'GEO-VN',
    regionName: 'Vietnam & Gulf of Tonkin',
    flag: '🇻🇳',
    latBounds: '08°N - 23°N',
    lonBounds: '102°E - 110°E',
    activeVesselCount: 185,
    threatCount: 9,
    isSelected: true
  },
  {
    id: 'GEO-BALTIC',
    regionName: 'Baltic Sea & Danish Straits',
    flag: '🇩🇰',
    latBounds: '53°N - 66°N',
    lonBounds: '09°E - 30°E',
    activeVesselCount: 320,
    threatCount: 8,
    isSelected: false
  }
];

export const GeoFilterToggleView: React.FC = () => {
  const [filters, setFilters] = useState<GeoRegionFilter[]>(INITIAL_GEO_FILTERS);

  const toggleRegion = (id: string) => {
    hapticEngine.trigger('click');
    setFilters(prev =>
      prev.map(f => (f.id === id ? { ...f, isSelected: !f.isSelected } : f))
    );
  };

  const selectAll = () => {
    hapticEngine.trigger('click');
    setFilters(prev => prev.map(f => ({ ...f, isSelected: true })));
  };

  const clearAll = () => {
    hapticEngine.trigger('click');
    setFilters(prev => prev.map(f => ({ ...f, isSelected: false })));
  };

  const activeFiltersCount = filters.filter(f => f.isSelected).length;

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
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Interactive Spatial & Geographic Boundary Filter Toggle</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Toggle regional coordinate boundaries to filter AIS targets, alert tables, and weather charts across map views
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={selectAll}
            className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[9px] text-cyan-300 font-bold hover:border-cyan-400"
          >
            ENABLE ALL
          </button>
          <button
            onClick={clearAll}
            className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-[9px] text-slate-400 font-bold hover:border-slate-600"
          >
            CLEAR
          </button>
          <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
            {activeFiltersCount} ACTIVE FILTERS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filters.map((f) => (
          <div
            key={f.id}
            onClick={() => toggleRegion(f.id)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              f.isSelected
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{f.flag}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{f.regionName}</h4>
                  <span className="text-[8px] text-slate-500 font-mono block">
                    LAT: {f.latBounds} • LON: {f.lonBounds}
                  </span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  f.isSelected
                    ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                    : 'bg-slate-900 border-slate-700 text-transparent'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block">AIS VESSELS IN BOUND:</span>
                <span className="text-cyan-300 font-bold">{f.activeVesselCount}</span>
              </div>
              <div>
                <span className="text-slate-500 block">ACTIVE THREATS:</span>
                <span className="text-rose-400 font-bold">{f.threatCount} Alerts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
