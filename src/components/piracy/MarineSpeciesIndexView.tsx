import React, { useState } from 'react';
import { Fish, ShieldAlert, Waves, MapPin, AlertCircle, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MarineSpeciesEntry {
  id: string;
  commonName: string;
  scientificName: string;
  conservationStatus: 'CRITICALLY_ENDANGERED' | 'ENDANGERED' | 'VULNERABLE' | 'NEAR_THREATENED';
  primaryHabitat: string;
  region: string;
  vesselCollisionRisk: 'HIGH' | 'MEDIUM' | 'LOW';
  sonarSensitivity: string;
  recommendedSpeedKnots: number;
  protectionNotes: string;
}

const MARINE_SPECIES_DATA: MarineSpeciesEntry[] = [
  {
    id: 'SPEC-01',
    commonName: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    conservationStatus: 'ENDANGERED',
    primaryHabitat: 'Torres Strait & Great Barrier Reef Corridor',
    region: 'Australia & Indo-Pacific',
    vesselCollisionRisk: 'HIGH',
    sonarSensitivity: 'High (10 - 100 Hz low frequency sonar disruption)',
    recommendedSpeedKnots: 10,
    protectionNotes: 'Mandatory 10-knot speed restriction in Great Barrier Reef Marine Park sensitive migratory corridors.'
  },
  {
    id: 'SPEC-02',
    commonName: 'Hector\'s Dolphin',
    scientificName: 'Cephalorhynchus hectori',
    conservationStatus: 'ENDANGERED',
    primaryHabitat: 'South Island Coastal Waters & Banks Peninsula',
    region: 'New Zealand',
    vesselCollisionRisk: 'MEDIUM',
    sonarSensitivity: 'Extreme (High frequency echolocation interference)',
    recommendedSpeedKnots: 8,
    protectionNotes: 'Acoustic pingers required on commercial fishing nets; zero sonar discharge within 5 NM of shore.'
  },
  {
    id: 'SPEC-03',
    commonName: 'Irrawaddy Dolphin',
    scientificName: 'Orcaella brevirostris',
    conservationStatus: 'CRITICALLY_ENDANGERED',
    primaryHabitat: 'Malampaya Sound & Visayas Estuaries',
    region: 'Philippines',
    vesselCollisionRisk: 'HIGH',
    sonarSensitivity: 'Critical (Shallow bay acoustic traps)',
    recommendedSpeedKnots: 7,
    protectionNotes: 'Strict no-discharge and reduced wake zone in Malampaya Sound Protected Seascape.'
  },
  {
    id: 'SPEC-04',
    commonName: 'Green Sea Turtle',
    scientificName: 'Chelonia mydas',
    conservationStatus: 'ENDANGERED',
    primaryHabitat: 'Con Dao Archipelago & Gulf of Tonkin',
    region: 'Vietnam',
    vesselCollisionRisk: 'MEDIUM',
    sonarSensitivity: 'Moderate (Low frequency propeller rumble sensitivity)',
    recommendedSpeedKnots: 10,
    protectionNotes: 'Night navigation lights dimmed near nesting beaches during peak breeding season (May-August).'
  },
  {
    id: 'SPEC-05',
    commonName: 'Harbour Porpoise',
    scientificName: 'Phocoena phocoena',
    conservationStatus: 'VULNERABLE',
    primaryHabitat: 'Bornholm Basin & Fehmarn Belt Corridor',
    region: 'Baltic Sea',
    vesselCollisionRisk: 'LOW',
    sonarSensitivity: 'High (Subsea construction & hydrophone noise sensitivity)',
    recommendedSpeedKnots: 12,
    protectionNotes: 'Subsea acoustic monitoring active; piling and active sonar regulated during calving season.'
  }
];

export const MarineSpeciesIndexView: React.FC = () => {
  const [speciesList] = useState<MarineSpeciesEntry[]>(MARINE_SPECIES_DATA);
  const [selectedSpecies, setSelectedSpecies] = useState<MarineSpeciesEntry>(MARINE_SPECIES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = speciesList.filter(s =>
    s.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.region.toLowerCase().includes(searchQuery.toLowerCase())
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
            <span>Marine Species & Biodiversity Protection Index</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Endangered ocean species index, vessel collision mitigation speeds, and acoustic sonar impact guidelines
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          MARPOL BIODIVERSITY INDEX
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search species name, scientific name, or region (e.g. Australia, Dolphin, Whale)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Species List */}
        <div className="lg:col-span-2 space-y-2 max-h-96 overflow-y-auto pr-1">
          {filteredList.map((sp) => (
            <div
              key={sp.id}
              onClick={() => {
                setSelectedSpecies(sp);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedSpecies.id === sp.id
                  ? 'bg-slate-950 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-emerald-400 font-bold block">{sp.scientificName}</span>
                  <h4 className="text-xs font-bold text-white">{sp.commonName}</h4>
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                  sp.conservationStatus === 'CRITICALLY_ENDANGERED' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  sp.conservationStatus === 'ENDANGERED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {sp.conservationStatus.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">REGION & HABITAT:</span>
                  <span className="text-slate-300 font-bold">{sp.region}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">COLLISION RISK:</span>
                  <span className={`font-bold ${sp.vesselCollisionRisk === 'HIGH' ? 'text-rose-400' : 'text-amber-300'}`}>
                    {sp.vesselCollisionRisk} RISK
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Species Detail Card */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-emerald-400 font-bold block">{selectedSpecies.id}</span>
              <h4 className="text-xs font-bold text-white">{selectedSpecies.commonName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans italic">{selectedSpecies.scientificName}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div>
                <span className="text-slate-500 block">PRIMARY HABITAT ZONE:</span>
                <span className="text-white font-bold">{selectedSpecies.primaryHabitat}</span>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <span className="text-slate-500 block">SONAR SENSITIVITY:</span>
                <span className="text-cyan-300 font-bold">{selectedSpecies.sonarSensitivity}</span>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <span className="text-slate-500 block">MAX RECOMMENDED SPEED:</span>
                <span className="text-emerald-400 font-bold">{selectedSpecies.recommendedSpeedKnots} Knots</span>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800 p-3 rounded-xl text-[10px] text-emerald-300 space-y-1">
              <span className="font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>PROTECTION GUIDELINE:</span>
              </span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">{selectedSpecies.protectionNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
