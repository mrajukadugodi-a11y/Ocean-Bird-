import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Radio, Flame, Zap, MapPin, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface AlertHeatSector {
  id: string;
  sectorName: string;
  coordinates: string;
  threatDensityScore: number;
  alertCategory: 'ARMED_HIJACK' | 'SKIFF_APPROACH' | 'BOARDING_ATTEMPT' | 'SUSPICIOUS_DRONE' | 'GPS_SPOOFING' | 'SUBSEA_CABLE_INTERFERENCE';
  activeThreatCount: number;
  heatStatus: 'CRITICAL_RED' | 'HIGH_ORANGE' | 'MODERATE_YELLOW';
}

const HEAT_SECTORS: AlertHeatSector[] = [
  {
    id: 'HEAT-SEC-01',
    sectorName: 'Bab-el-Mandeb Strait North Chokepoint',
    coordinates: '12°40′N 043°15′E',
    threatDensityScore: 94,
    alertCategory: 'ARMED_HIJACK',
    activeThreatCount: 12,
    heatStatus: 'CRITICAL_RED'
  },
  {
    id: 'HEAT-SEC-02',
    sectorName: 'Gulf of Guinea Niger Delta Offshore Sector',
    coordinates: '03°45′N 005°50′E',
    threatDensityScore: 88,
    alertCategory: 'BOARDING_ATTEMPT',
    activeThreatCount: 8,
    heatStatus: 'CRITICAL_RED'
  },
  {
    id: 'HEAT-SEC-03',
    sectorName: 'Baltic Sea Fehmarn Belt Subsea Cable Corridor',
    coordinates: '54°30′N 011°15′E',
    threatDensityScore: 79,
    alertCategory: 'SUBSEA_CABLE_INTERFERENCE',
    activeThreatCount: 6,
    heatStatus: 'HIGH_ORANGE'
  },
  {
    id: 'HEAT-SEC-04',
    sectorName: 'Singapore Strait Eastbound Lane',
    coordinates: '01°16′N 104°02′E',
    threatDensityScore: 72,
    alertCategory: 'SKIFF_APPROACH',
    activeThreatCount: 5,
    heatStatus: 'HIGH_ORANGE'
  },
  {
    id: 'HEAT-SEC-05',
    sectorName: 'Sulu-Celebes Sea Transit Corridor',
    coordinates: '05°10′N 120°15′E',
    threatDensityScore: 58,
    alertCategory: 'SUSPICIOUS_DRONE',
    activeThreatCount: 3,
    heatStatus: 'MODERATE_YELLOW'
  }
];

export const AlertHeatmapView: React.FC = () => {
  const [sectors] = useState<AlertHeatSector[]>(HEAT_SECTORS);
  const [selectedSector, setSelectedSector] = useState<AlertHeatSector>(HEAT_SECTORS[0]);

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
            <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Real-time Security Alert Threat Density & Attack Incident Heatmap</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Monitor spatial attack density clusters, skiff boarding attempts, and live piracy alert concentration scores
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold">
          5 DENSITY CLUSTERS MONITORED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Threat Density Sector Cards */}
        <div className="space-y-2">
          {sectors.map((sec) => (
            <motion.div
              key={sec.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                setSelectedSector(sec);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedSector.id === sec.id
                  ? 'bg-slate-950 border-rose-500 ring-1 ring-rose-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[8px] text-rose-400 font-bold block">{sec.coordinates}</span>
                  <h4 className="text-xs font-bold text-white">{sec.sectorName}</h4>
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                  sec.heatStatus === 'CRITICAL_RED'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                    : sec.heatStatus === 'HIGH_ORANGE'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                }`}>
                  DENSITY: {sec.threatDensityScore}/100
                </span>
              </div>

              <div className="space-y-1 font-sans">
                <div className="flex justify-between text-[9px] font-mono">
                  <span className="text-slate-400">Category & Active Threat Count:</span>
                  <span className="text-rose-400 font-bold">{sec.alertCategory} ({sec.activeThreatCount} Live Targets)</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-rose-600 h-full"
                    style={{ width: `${sec.threatDensityScore}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Sector Details */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono">
          <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
            <div>
              <span className="text-[8px] text-rose-400 font-bold block uppercase">{selectedSector.id}</span>
              <h4 className="text-xs font-bold text-white">{selectedSector.sectorName}</h4>
            </div>
            <span className="text-[8px] text-rose-300 font-bold bg-rose-950 border border-rose-800 px-2 py-0.5 rounded">
              {selectedSector.coordinates}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[10px] font-sans">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[8px] font-mono block">THREAT DENSITY SCORE:</span>
              <span className="text-sm font-black text-rose-400">{selectedSector.threatDensityScore} / 100</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[8px] font-mono block">LIVE TARGETS IN ZONE:</span>
              <span className="text-sm font-black text-amber-300">{selectedSector.activeThreatCount} Skiffs</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
