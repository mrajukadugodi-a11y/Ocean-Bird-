import React, { useState } from 'react';
import { Layers, Globe, Eye, Navigation, ShieldAlert, Anchor, Compass, Zap, MapPin } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface OverlayChokepoint {
  id: string;
  name: string;
  coordinates: string;
  vesselCountQueue: number;
  piracyThreatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
  avgDelayHours: number;
}

const CHOKEPOINTS: OverlayChokepoint[] = [
  {
    id: 'CP-01',
    name: 'Bab-el-Mandeb & Red Sea Entrance',
    coordinates: '12°35′N 43°20′E',
    vesselCountQueue: 64,
    piracyThreatLevel: 'CRITICAL',
    avgDelayHours: 72
  },
  {
    id: 'CP-02',
    name: 'Strait of Malacca (Singapore Sector)',
    coordinates: '1°14′N 103°55′E',
    vesselCountQueue: 128,
    piracyThreatLevel: 'ELEVATED',
    avgDelayHours: 18
  },
  {
    id: 'CP-03',
    name: 'Suez Canal North/South Convoy',
    coordinates: '30°30′N 32°20′E',
    vesselCountQueue: 42,
    piracyThreatLevel: 'MODERATE',
    avgDelayHours: 24
  },
  {
    id: 'CP-04',
    name: 'Gulf of Guinea & Niger Delta',
    coordinates: '4°20′N 6°10′E',
    vesselCountQueue: 35,
    piracyThreatLevel: 'HIGH',
    avgDelayHours: 36
  }
];

export const InteractiveTradeMapOverlayView: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<OverlayChokepoint>(CHOKEPOINTS[0]);
  const [showRadarGrid, setShowRadarGrid] = useState<boolean>(true);
  const [showNavalCorridors, setShowNavalCorridors] = useState<boolean>(true);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Interactive Maritime Spatial Trade Map & Chokepoint Traffic Overlay</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time AIS vessel choke point queues, naval security task force corridors, and piracy threat density maps
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setShowRadarGrid(!showRadarGrid);
              hapticEngine.trigger('click');
            }}
            className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-all ${
              showRadarGrid
                ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            RADAR GRID: {showRadarGrid ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => {
              setShowNavalCorridors(!showNavalCorridors);
              hapticEngine.trigger('click');
            }}
            className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-all ${
              showNavalCorridors
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            NAVAL CORRIDORS: {showNavalCorridors ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Graphical Overlay Map Box */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 h-64 flex flex-col justify-between overflow-hidden">
        {/* Radar Background Grid */}
        {showRadarGrid && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />
        )}

        <div className="relative z-10 flex justify-between items-start">
          <div className="bg-slate-900/90 backdrop-blur p-2.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[8px] text-slate-500 block">SELECTED CHOKEPOINT:</span>
            <span className="text-xs font-bold text-white block">{selectedPoint.name}</span>
            <span className="text-[9px] text-cyan-400 font-mono block">{selectedPoint.coordinates}</span>
          </div>

          <div className="bg-slate-900/90 backdrop-blur p-2.5 rounded-xl border border-slate-800 text-right space-y-1">
            <span className="text-[8px] text-slate-500 block">AIS VESSEL QUEUE:</span>
            <span className="text-sm font-black text-emerald-400 block">{selectedPoint.vesselCountQueue} Ships</span>
            <span className="text-[8px] text-amber-400 font-bold block">Avg Delay: {selectedPoint.avgDelayHours} hrs</span>
          </div>
        </div>

        {/* Chokepoint Selection Badges */}
        <div className="relative z-10 flex flex-wrap gap-2 pt-4">
          {CHOKEPOINTS.map((cp) => (
            <button
              key={cp.id}
              onClick={() => {
                setSelectedPoint(cp);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-[9px] font-bold border transition-all flex items-center space-x-1.5 ${
                selectedPoint.id === cp.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow font-black'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>{cp.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
