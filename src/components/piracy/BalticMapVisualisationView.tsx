import React, { useState } from 'react';
import { Compass, MapPin, Eye, Zap, ShieldAlert, Radio, Waves, Anchor, AlertCircle, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface BalticMapHotspot {
  id: string;
  name: string;
  subRegion: string;
  xPct: number; // position on map representation
  yPct: number;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
  subseaCableStatus: 'INTACT_MONITORED' | 'HIGH_SPOOFING_RISK' | 'PATROLLED';
  activeVesselsInSector: number;
  description: string;
}

const BALTIC_MAP_HOTSPOTS: BalticMapHotspot[] = [
  {
    id: 'BAL-MAP-01',
    name: 'Great Belt & Fehmarn Belt Chokepoint',
    subRegion: 'Danish Straits (DK / DE)',
    xPct: 22,
    yPct: 68,
    threatLevel: 'HIGH',
    subseaCableStatus: 'HIGH_SPOOFING_RISK',
    activeVesselsInSector: 84,
    description: 'Primary Baltic entrance channel with dense commercial container and tanker traffic. Active GPS spoofing reported near Bornholm.'
  },
  {
    id: 'BAL-MAP-02',
    name: 'Bornholm Basin Subsea Cable Corridor',
    subRegion: 'Southern Baltic (DK / SE / PL)',
    xPct: 42,
    yPct: 62,
    threatLevel: 'CRITICAL',
    subseaCableStatus: 'HIGH_SPOOFING_RISK',
    activeVesselsInSector: 62,
    description: 'High-density subsea telecom & power cable corridor. Unflagged shadow fleet tankers loitering with AIS transmitter spoofing.'
  },
  {
    id: 'BAL-MAP-03',
    name: 'Gulf of Finland Transit Lane',
    subRegion: 'Eastern Baltic (FI / EE / RU)',
    xPct: 78,
    yPct: 32,
    threatLevel: 'CRITICAL',
    subseaCableStatus: 'INTACT_MONITORED',
    activeVesselsInSector: 110,
    description: 'Estlink 1 & 2 energy cables corridor between Helsinki and Tallinn. High naval patrol presence & drone monitoring.'
  },
  {
    id: 'BAL-MAP-04',
    name: 'Stockholm Archipelago & Åland Sea',
    subRegion: 'Central Baltic (SE / FI)',
    xPct: 56,
    yPct: 38,
    threatLevel: 'ELEVATED',
    subseaCableStatus: 'PATROLLED',
    activeVesselsInSector: 45,
    description: 'Key passenger ferry & cruise vessel corridor between Sweden and Finland. Escort patrols active.'
  },
  {
    id: 'BAL-MAP-05',
    name: 'Gdansk Bay & Kattegat Approach',
    subRegion: 'Southern Entrance (PL / SE)',
    xPct: 48,
    yPct: 78,
    threatLevel: 'MODERATE',
    subseaCableStatus: 'INTACT_MONITORED',
    activeVesselsInSector: 52,
    description: 'Container terminals approach at Port of Gdansk and Gdynia. Normal naval security watch.'
  }
];

export const BalticMapVisualisationView: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<BalticMapHotspot>(BALTIC_MAP_HOTSPOTS[1]);
  const [showSubseaCables, setShowSubseaCables] = useState<boolean>(true);
  const [showJammingZones, setShowJammingZones] = useState<boolean>(true);

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
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Baltic Sea Tactical Nautical Chart & Subsea Cable Visualisation</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Interactive spatial map of the Baltic Sea, Danish Straits, Gulf of Finland, subsea infrastructure, and shadow fleet jamming corridors
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setShowSubseaCables(!showSubseaCables);
              hapticEngine.trigger('click');
            }}
            className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-colors ${
              showSubseaCables
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            {showSubseaCables ? '⚡ CABLES ON' : '⚡ CABLES OFF'}
          </button>

          <button
            onClick={() => {
              setShowJammingZones(!showJammingZones);
              hapticEngine.trigger('click');
            }}
            className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-colors ${
              showJammingZones
                ? 'bg-rose-950 text-rose-300 border-rose-700'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            {showJammingZones ? '📡 JAMMING ON' : '📡 JAMMING OFF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive Map Stage */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-4 relative min-h-[340px] flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Subsea Cable Simulated Lines */}
          {showSubseaCables && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {/* Estlink Helsinki to Tallinn */}
              <line x1="78%" y1="32%" x2="74%" y2="40%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />
              {/* Bornholm Corridor to Gdansk */}
              <line x1="42%" y1="62%" x2="48%" y2="78%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4,4" />
              {/* Fehmarn Belt Cable */}
              <line x1="22%" y1="68%" x2="42%" y2="62%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="2,2" />
            </svg>
          )}

          {/* GPS Jamming Zones */}
          {showJammingZones && (
            <div className="absolute top-[52%] left-[36%] w-28 h-28 bg-rose-500/10 border border-rose-500/30 rounded-full animate-ping pointer-events-none" />
          )}

          {/* Map Title Header */}
          <div className="relative z-10 flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-900 pb-2">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              <span>BALTIC SEA / DANISH STRAITS SECTOR CHART</span>
            </span>
            <span className="text-cyan-400 font-mono">LAT 54°N–60°N / LON 10°E–28°E</span>
          </div>

          {/* Map Nodes */}
          <div className="relative z-20 my-12 h-64 w-full">
            {BALTIC_MAP_HOTSPOTS.map((hotspot) => (
              <motion.button
                key={hotspot.id}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setSelectedHotspot(hotspot);
                  hapticEngine.trigger('click');
                }}
                style={{ left: `${hotspot.xPct}%`, top: `${hotspot.yPct}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border shadow-lg transition-all ${
                  selectedHotspot.id === hotspot.id
                    ? 'bg-rose-500 text-slate-950 border-white ring-4 ring-rose-500/30 z-30'
                    : hotspot.threatLevel === 'CRITICAL'
                    ? 'bg-rose-950 text-rose-300 border-rose-600'
                    : hotspot.threatLevel === 'HIGH'
                    ? 'bg-amber-950 text-amber-300 border-amber-600'
                    : 'bg-slate-900 text-cyan-300 border-slate-700'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </motion.button>
            ))}
          </div>

          {/* Map Footer Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[9px] text-slate-400 pt-2 border-t border-slate-900">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-rose-500" /><span>Critical</span></span>
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-amber-500" /><span>High</span></span>
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-cyan-500" /><span>Elevated</span></span>
            </div>
            <span className="text-slate-500 font-mono">MAP DATUM: WGS84 • AIS REFRESH 5S</span>
          </div>
        </div>

        {/* Selected Hotspot Details Column */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2 flex justify-between items-start">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{selectedHotspot.id}</span>
                <h4 className="text-xs font-bold text-white">{selectedHotspot.name}</h4>
                <span className="text-[9px] text-slate-400 block mt-0.5">{selectedHotspot.subRegion}</span>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                selectedHotspot.threatLevel === 'CRITICAL'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {selectedHotspot.threatLevel}
              </span>
            </div>

            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
              {selectedHotspot.description}
            </p>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Subsea Cable Status:</span>
                <span className="text-cyan-300 font-bold">{selectedHotspot.subseaCableStatus.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active AIS Ships:</span>
                <span className="text-amber-300 font-bold">{selectedHotspot.activeVesselsInSector} Vessels</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              hapticEngine.trigger('success');
            }}
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
          >
            <Eye className="w-3.5 h-3.5 text-slate-950" />
            <span>CENTER RADAR ON HOTSPOT</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
