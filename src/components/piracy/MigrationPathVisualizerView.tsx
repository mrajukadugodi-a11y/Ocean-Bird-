import React, { useState } from 'react';
import { Compass, Waves, MapPin, AlertTriangle, ShieldCheck, ArrowRight, Play, Pause } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MigrationRoute {
  id: string;
  speciesName: string;
  originName: string;
  destinationName: string;
  seasonMonths: string;
  distanceNM: number;
  threatLevel: 'HIGH_VESSEL_TRAFFIC' | 'MODERATE_ACCOUSTIC_NOISE' | 'PROTECTED_SANCTUARY';
  recommendedSpeedKnots: number;
  waypointCoordinates: string[];
}

const MIGRATION_ROUTES_DATA: MigrationRoute[] = [
  {
    id: 'MIG-RTE-101',
    speciesName: 'Humpback Whale (Megaptera novaeangliae)',
    originName: 'Antarctic Feeding Grounds',
    destinationName: 'Great Barrier Reef Breeding Lagoons',
    seasonMonths: 'May - October',
    distanceNM: 4800,
    threatLevel: 'HIGH_VESSEL_TRAFFIC',
    recommendedSpeedKnots: 10,
    waypointCoordinates: ['65.0000° S, 140.0000° E', '38.0000° S, 148.0000° E', '20.0000° S, 150.0000° E']
  },
  {
    id: 'MIG-RTE-102',
    speciesName: 'Loggerhead Sea Turtle (Caretta caretta)',
    originName: 'Japanese Hatching Beaches',
    destinationName: 'Baja California Foraging Bays',
    seasonMonths: 'Year-Round Trans-Pacific',
    distanceNM: 7200,
    threatLevel: 'HIGH_VESSEL_TRAFFIC',
    recommendedSpeedKnots: 12,
    waypointCoordinates: ['35.0000° N, 140.0000° E', '30.0000° N, 175.0000° W', '25.0000° N, 115.0000° W']
  },
  {
    id: 'MIG-RTE-103',
    speciesName: 'Blue Whale (Balaenoptera musculus)',
    originName: 'Gulf of California (Cortez)',
    destinationName: 'Pacific Northwest Foraging Fjords',
    seasonMonths: 'June - September',
    distanceNM: 2400,
    threatLevel: 'HIGH_VESSEL_TRAFFIC',
    recommendedSpeedKnots: 10,
    waypointCoordinates: ['26.0000° N, 111.0000° W', '34.0000° N, 120.0000° W', '48.0000° N, 125.0000° W']
  },
  {
    id: 'MIG-RTE-104',
    speciesName: 'Scalloped Hammerhead Shark (Sphyrna lewini)',
    originName: 'Cocos Island Sanctuary',
    destinationName: 'Galapagos Marine Reserve Corridor',
    seasonMonths: 'December - April',
    distanceNM: 420,
    threatLevel: 'PROTECTED_SANCTUARY',
    recommendedSpeedKnots: 12,
    waypointCoordinates: ['5.5000° N, 87.0000° W', '0.5000° N, 90.5000° W']
  }
];

export const MigrationPathVisualizerView: React.FC = () => {
  const [routes] = useState<MigrationRoute[]>(MIGRATION_ROUTES_DATA);
  const [selectedRoute, setSelectedRoute] = useState<MigrationRoute>(MIGRATION_ROUTES_DATA[0]);
  const [isSimulating, setIsSimulating] = useState(false);

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
            <span>Marine Wildlife Migration Route & Vessel Avoidance Path Visualizer</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Trans-oceanic cetacean & turtle migration corridors, speed reduction zones, and real-time voyage routing overlays
          </p>
        </div>

        <button
          onClick={() => {
            setIsSimulating(!isSimulating);
            hapticEngine.trigger('click');
          }}
          className={`px-3 py-1 rounded-xl font-bold text-[10px] flex items-center space-x-1.5 transition-all ${
            isSimulating
              ? 'bg-amber-500 text-slate-950 shadow font-black'
              : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-black'
          }`}
        >
          {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>{isSimulating ? 'PAUSE ROUTE SIMULATION' : 'SIMULATE MIGRATION FLOW'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Migration Routes List */}
        <div className="lg:col-span-2 space-y-2">
          {routes.map((rt) => (
            <div
              key={rt.id}
              onClick={() => {
                setSelectedRoute(rt);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedRoute.id === rt.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-cyan-400 font-bold block">{rt.id} • {rt.seasonMonths}</span>
                  <h4 className="text-xs font-bold text-white">{rt.speciesName}</h4>
                </div>
                <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] px-2 py-0.5 rounded font-bold">
                  {rt.distanceNM} NM CORRIDOR
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-300 font-bold">{rt.originName}</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="text-emerald-400 font-bold">{rt.destinationName}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Route Visualizer & Avoidance Guidance */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedRoute.id} MIGRATION DOSSIER</span>
              <h4 className="text-xs font-bold text-white">{selectedRoute.speciesName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">Active Season: {selectedRoute.seasonMonths}</span>
            </div>

            {/* Waypoints List */}
            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <span className="text-slate-500 block font-bold mb-1">KEY MIGRATION WAYPOINTS:</span>
              <div className="space-y-1">
                {selectedRoute.waypointCoordinates.map((wp, idx) => (
                  <div key={wp} className="flex justify-between items-center text-[9px] border-b border-slate-800/60 pb-1">
                    <span className="text-slate-400">WAYPOINT #{idx + 1}:</span>
                    <span className="text-cyan-300 font-mono font-bold">{wp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-800 p-3 rounded-xl text-[10px] text-emerald-300 space-y-1">
              <span className="font-bold block text-emerald-400">VESSEL COMPLIANCE DIRECTIVE:</span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">
                Maintain maximum vessel speed of <span className="text-emerald-400 font-bold">{selectedRoute.recommendedSpeedKnots} KNOTS</span> when transiting this active migration zone to reduce cetacean strike risk by 90%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
