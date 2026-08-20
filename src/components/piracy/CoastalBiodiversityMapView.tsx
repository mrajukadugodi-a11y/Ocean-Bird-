import React, { useState } from 'react';
import { Compass, ShieldCheck, Waves, Fish, Eye, Search, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface BiodiversityZone {
  id: string;
  zoneName: string;
  seaRegion: string;
  protectedSpecies: string;
  speedLimitKnots: number;
  underwaterNoiseCapDb: number;
  protectionStatus: 'STRICT_NO_TAKE' | 'SEASONAL_RESTRICTION' | 'SPEED_CAP_ZONE';
  description: string;
}

const BIODIVERSITY_ZONES: BiodiversityZone[] = [
  {
    id: 'BIO-BAL-01',
    zoneName: 'Bothnian Bay Ringed Seal Sanctuary',
    seaRegion: 'Northern Baltic Sea (FI / SE)',
    protectedSpecies: 'Pusa hispida botnica (Baltic Ringed Seal) & Gray Seals',
    speedLimitKnots: 10.0,
    underwaterNoiseCapDb: 145,
    protectionStatus: 'SEASONAL_RESTRICTION',
    description: 'Critical winter pupping ice pack and migration zone. Commercial vessels required to reduce engine RPM to limit acoustic trauma.'
  },
  {
    id: 'BIO-BAL-02',
    zoneName: 'Bornholm Basin Cod Spawning Deep',
    seaRegion: 'Central Baltic (DK / SE / PL)',
    protectedSpecies: 'Gadus morhua (Eastern Baltic Cod)',
    speedLimitKnots: 12.0,
    underwaterNoiseCapDb: 150,
    protectionStatus: 'SPEED_CAP_ZONE',
    description: 'High salinity deepwater basin spawning ground. Bottom trawling strictly banned; commercial transit speed capped at 12 knots.'
  },
  {
    id: 'BIO-RED-03',
    zoneName: 'Dahlak Archipelago Coral Barrier Reserve',
    seaRegion: 'Southern Red Sea (ER)',
    protectedSpecies: 'Dugong dugon (Sea Cow), Hawksbill Turtles & Acropora Reefs',
    speedLimitKnots: 8.0,
    underwaterNoiseCapDb: 135,
    protectionStatus: 'STRICT_NO_TAKE',
    description: 'Pristine coral barrier reef ecosystem. Anchorages strictly prohibited outside designated sandy mooring basins.'
  },
  {
    id: 'BIO-MAL-04',
    zoneName: 'Pulau Kukup Mangrove Sanctuary Corridor',
    seaRegion: 'Malacca Strait (MY)',
    protectedSpecies: 'Irrawaddy Dolphins & Shorebird Wetlands',
    speedLimitKnots: 10.0,
    underwaterNoiseCapDb: 140,
    protectionStatus: 'SPEED_CAP_ZONE',
    description: 'Vulnerable coastal mangrove wetland. Wash-wave mitigation speed caps enforced by Malaysian Maritime Enforcement Agency.'
  }
];

export const CoastalBiodiversityMapView: React.FC = () => {
  const [zones] = useState<BiodiversityZone[]>(BIODIVERSITY_ZONES);
  const [selectedZone, setSelectedZone] = useState<BiodiversityZone>(BIODIVERSITY_ZONES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredZones = zones.filter((z) =>
    z.zoneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    z.seaRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
    z.protectedSpecies.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Fish className="w-4 h-4 text-emerald-400" />
            <span>Coastal Biodiversity & Marine Protected Area (MPA) Eco-Corridors</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Protected marine sanctuaries, vessel eco-speed limits, underwater noise caps, and endangered species migration overlays
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          4 MPA ECO-ZONES ACTIVE
        </span>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center">
        <Search className="w-4 h-4 text-slate-500 mr-2" />
        <input
          type="text"
          placeholder="Filter zone by name, region, or protected species..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-sans"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Zones Selector Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredZones.map((z) => (
            <div
              key={z.id}
              onClick={() => {
                setSelectedZone(z);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedZone.id === z.id
                  ? 'bg-slate-950 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-emerald-400 font-bold block">{z.id}</span>
                  <h4 className="text-xs font-bold text-white">{z.zoneName}</h4>
                  <span className="text-[9px] text-slate-400 block font-sans">{z.seaRegion}</span>
                </div>
                <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {z.protectionStatus.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-[9px] text-slate-300 font-sans line-clamp-2">
                <strong className="text-slate-400 font-mono">SPECIES: </strong>{z.protectedSpecies}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono bg-slate-900 p-2 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">SPEED LIMIT:</span>
                  <span className="text-amber-300 font-bold">{z.speedLimitKnots} kts max</span>
                </div>
                <div>
                  <span className="text-slate-500 block">NOISE CAP:</span>
                  <span className="text-cyan-300 font-bold">&lt; {z.underwaterNoiseCapDb} dB</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zone Detail Focus */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-emerald-400 font-bold block">{selectedZone.id}</span>
              <h4 className="text-xs font-bold text-white">{selectedZone.zoneName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedZone.seaRegion}</span>
            </div>

            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
              {selectedZone.description}
            </p>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">PROTECTED SPECIES:</span>
                <span className="text-emerald-300 font-bold">{selectedZone.protectedSpecies}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">MANDATORY SPEED CAP:</span>
                <span className="text-amber-300 font-bold">{selectedZone.speedLimitKnots} Knots</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ACOUSTIC NOISE CAP:</span>
                <span className="text-cyan-300 font-bold">{selectedZone.underwaterNoiseCapDb} dB @ 1m</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              hapticEngine.trigger('success');
            }}
            className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
            <span>ENFORCE ECO-NAVIGATION PROTOCOL</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
