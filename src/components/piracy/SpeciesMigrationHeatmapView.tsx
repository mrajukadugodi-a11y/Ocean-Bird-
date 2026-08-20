import React, { useState } from 'react';
import { Waves, Flame, MapPin, Compass, AlertCircle, ShieldAlert, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MigrationZone {
  id: string;
  zoneName: string;
  speciesName: string;
  coordinates: { xPct: number; yPct: number };
  densityLevel: 'EXTREME' | 'HIGH' | 'MODERATE';
  peakSeasonMonths: string;
  recommendedSpeed: number;
  sonarRestriction: boolean;
  region: string;
}

const MIGRATION_ZONES_DATA: MigrationZone[] = [
  {
    id: 'ZONE-01',
    zoneName: 'Torres Strait Humpback Migratory Corridor',
    speciesName: 'Humpback Whale (Megaptera novaeangliae)',
    coordinates: { xPct: 78, yPct: 42 },
    densityLevel: 'EXTREME',
    peakSeasonMonths: 'June - September',
    recommendedSpeed: 10,
    sonarRestriction: true,
    region: 'Australia'
  },
  {
    id: 'ZONE-02',
    zoneName: 'Cook Strait Blue Whale Trench',
    speciesName: 'Pygmy Blue Whale (Balaenoptera musculus brevicauda)',
    coordinates: { xPct: 88, yPct: 78 },
    densityLevel: 'HIGH',
    peakSeasonMonths: 'December - March',
    recommendedSpeed: 10,
    sonarRestriction: true,
    region: 'New Zealand'
  },
  {
    id: 'ZONE-03',
    zoneName: 'Malampaya Sound Irrawaddy Sanctuary',
    speciesName: 'Irrawaddy Dolphin (Orcaella brevirostris)',
    coordinates: { xPct: 62, yPct: 52 },
    densityLevel: 'EXTREME',
    peakSeasonMonths: 'Year-Round Active Nesting',
    recommendedSpeed: 8,
    sonarRestriction: true,
    region: 'Philippines'
  },
  {
    id: 'ZONE-04',
    zoneName: 'Con Dao Turtle Breeding Ridge',
    speciesName: 'Green & Hawksbill Turtles',
    coordinates: { xPct: 55, yPct: 48 },
    densityLevel: 'HIGH',
    peakSeasonMonths: 'May - August',
    recommendedSpeed: 10,
    sonarRestriction: false,
    region: 'Vietnam'
  },
  {
    id: 'ZONE-05',
    zoneName: 'Fehmarn Belt Porpoise Basin',
    speciesName: 'Harbour Porpoise (Phocoena phocoena)',
    coordinates: { xPct: 25, yPct: 28 },
    densityLevel: 'MODERATE',
    peakSeasonMonths: 'May - October',
    recommendedSpeed: 12,
    sonarRestriction: true,
    region: 'Baltic Sea'
  }
];

export const SpeciesMigrationHeatmapView: React.FC = () => {
  const [zones] = useState<MigrationZone[]>(MIGRATION_ZONES_DATA);
  const [selectedZone, setSelectedZone] = useState<MigrationZone>(MIGRATION_ZONES_DATA[0]);

  const getDensityBadge = (density: string) => {
    switch (density) {
      case 'EXTREME':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">EXTREME DENSITY</span>;
      case 'HIGH':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">HIGH DENSITY</span>;
      default:
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">MODERATE DENSITY</span>;
    }
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
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Marine Mammal & Protected Species Migration Heatmap</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Acoustic sonar restrictions, seasonal migration corridors, and marine mammal collision risk density maps
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold">
          LIVE SATELLITE BIOLOGY MATRIX
        </span>
      </div>

      {/* Simulated Interactive Map Display */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl h-64 overflow-hidden p-4 flex flex-col justify-between">
        {/* Grid Overlay Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start">
          <span className="text-[9px] text-cyan-400 font-bold bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
            INDO-PACIFIC & SOUTH PACIFIC MIGRATION LAYERS
          </span>
          <span className="text-[9px] text-slate-400 font-mono">MAP LAT 15°S - 45°S / LON 110°E - 178°E</span>
        </div>

        {/* Heatmap Nodes */}
        {zones.map((zn) => {
          const isSelected = selectedZone.id === zn.id;
          return (
            <div
              key={zn.id}
              onClick={() => {
                setSelectedZone(zn);
                hapticEngine.trigger('click');
              }}
              style={{ left: `${zn.coordinates.xPct}%`, top: `${zn.coordinates.yPct}%` }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'bg-rose-500/80 border-rose-300 ring-4 ring-rose-500/40 animate-ping'
                    : zn.densityLevel === 'EXTREME'
                    ? 'bg-rose-600/60 border-rose-400'
                    : 'bg-amber-600/60 border-amber-400'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-2 py-0.5 rounded whitespace-nowrap border border-slate-700 pointer-events-none">
                {zn.zoneName}
              </span>
            </div>
          );
        })}

        <div className="relative z-10 flex justify-between items-end text-[9px] text-slate-400">
          <span>CLICK NODE ON MAP TO INSPECT BIODIVERSITY RESTRICTIONS</span>
          <span className="text-emerald-400 font-bold">5 MIGRATORY CORRIDORS INDEXED</span>
        </div>
      </div>

      {/* Selected Zone Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {zones.map((z) => (
            <div
              key={z.id}
              onClick={() => {
                setSelectedZone(z);
                hapticEngine.trigger('click');
              }}
              className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                selectedZone.id === z.id
                  ? 'bg-slate-950 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-amber-400 font-bold">{z.region} • {z.speciesName}</span>
                {getDensityBadge(z.densityLevel)}
              </div>
              <h4 className="text-xs font-bold text-white mt-1">{z.zoneName}</h4>
            </div>
          ))}
        </div>

        {/* Selected Zone Deep Detail Card */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-[8px] text-amber-400 font-bold block">{selectedZone.id} MIGRATION ZONE</span>
            <h4 className="text-xs font-bold text-white">{selectedZone.zoneName}</h4>
            <span className="text-[9px] text-slate-400 block font-sans italic">{selectedZone.speciesName}</span>
          </div>

          <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
            <div className="flex justify-between">
              <span className="text-slate-500">PEAK MIGRATION SEASON:</span>
              <span className="text-amber-300 font-bold">{selectedZone.peakSeasonMonths}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-1">
              <span className="text-slate-500">RECOMMENDED TRANSIT SPEED:</span>
              <span className="text-emerald-400 font-bold">{selectedZone.recommendedSpeed} Knots</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-1">
              <span className="text-slate-500">SONAR DISCHARGE RESTRICTION:</span>
              <span className={`font-bold ${selectedZone.sonarRestriction ? 'text-rose-400' : 'text-slate-400'}`}>
                {selectedZone.sonarRestriction ? 'STRICT NO-SONAR ZONE' : 'STANDARD MONITORING'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
