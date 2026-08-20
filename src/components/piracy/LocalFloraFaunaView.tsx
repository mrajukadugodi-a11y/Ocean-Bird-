import React, { useState } from 'react';
import { Flower2, Fish, ShieldAlert, MapPin, Eye, Search, Sparkles, Heart, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MarineSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  type: 'FLORA' | 'FAUNA';
  conservationStatus: 'CRITICALLY_ENDANGERED' | 'ENDANGERED' | 'VULNERABLE' | 'PROTECTED';
  habitatRegion: string;
  depthRangeMeters: string;
  keyThreats: string[];
  ecologicalRole: string;
  vesselSpeedRestrictionKts: number;
}

const LOCAL_SPECIES_DATABASE: MarineSpecies[] = [
  {
    id: 'FF-01',
    commonName: 'Posidonia Oceanica (Neptune Grass)',
    scientificName: 'Posidonia oceanica',
    type: 'FLORA',
    conservationStatus: 'PROTECTED',
    habitatRegion: 'Mediterranean Coastal Shelf & Shallow Bays',
    depthRangeMeters: '1m - 40m',
    keyThreats: ['Anchor Dragging Damage', 'Trawler Bottom Scouring', 'Thermal Heatwaves'],
    ecologicalRole: 'Primary carbon sink absorbing 15x more CO2 than Amazon rainforest per hectare; nursery for juvenile fish.',
    vesselSpeedRestrictionKts: 0 // Anchor ban
  },
  {
    id: 'FF-02',
    commonName: 'North Atlantic Right Whale',
    scientificName: 'Ebalaena glacialis',
    type: 'FAUNA',
    conservationStatus: 'CRITICALLY_ENDANGERED',
    habitatRegion: 'North American Atlantic Coast (Bay of Fundy to Florida)',
    depthRangeMeters: 'Surface to 180m',
    keyThreats: ['Ship Strike Collisions', 'Commercial Fishing Gear Entanglement', 'Acoustic Noise Pollution'],
    ecologicalRole: 'Apex migratory mammal nutrient cycling; under 350 individuals remaining globally.',
    vesselSpeedRestrictionKts: 10
  },
  {
    id: 'FF-03',
    commonName: 'Mangrove Avicennia Marina (Gray Mangrove)',
    scientificName: 'Avicennia marina',
    type: 'FLORA',
    conservationStatus: 'VULNERABLE',
    habitatRegion: 'Indo-Pacific Tropical Estuaries & Malacca Strait',
    depthRangeMeters: 'Intertidal Zero Zone',
    keyThreats: ['Coastal Port Development', 'Heavy Bunker Fuel Spills', 'Erosion from Vessel Wake'],
    ecologicalRole: 'Coastal storm surge barrier, sediment trap preventing siltation in shipping lanes.',
    vesselSpeedRestrictionKts: 8
  },
  {
    id: 'FF-04',
    commonName: 'Hawksbill Sea Turtle',
    scientificName: 'Eretmochelys imbricata',
    type: 'FAUNA',
    conservationStatus: 'CRITICALLY_ENDANGERED',
    habitatRegion: 'Coral Triangle (Sulu Sea, Coral Reef Basins)',
    depthRangeMeters: 'Surface to 60m',
    keyThreats: ['Bycatch Entanglement', 'Plastic Waste Ingestion', 'Reef Coral Bleaching'],
    ecologicalRole: 'Reef sponge population regulation maintaining coral reef biodiversity balance.',
    vesselSpeedRestrictionKts: 10
  }
];

export const LocalFloraFaunaView: React.FC = () => {
  const [speciesList] = useState<MarineSpecies[]>(LOCAL_SPECIES_DATABASE);
  const [selectedSpecies, setSelectedSpecies] = useState<MarineSpecies>(LOCAL_SPECIES_DATABASE[0]);
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'FLORA' | 'FAUNA'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpecies = speciesList.filter(s => {
    const matchesType = typeFilter === 'ALL' || s.type === typeFilter;
    const matchesSearch = s.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.habitatRegion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CRITICALLY_ENDANGERED':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">CRITICALLY ENDANGERED</span>;
      case 'ENDANGERED':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">ENDANGERED</span>;
      case 'VULNERABLE':
        return <span className="bg-orange-950 text-orange-300 border border-orange-800 text-[9px] px-2 py-0.5 rounded font-bold">VULNERABLE</span>;
      default:
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">PROTECTED SPECIES</span>;
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
            <Flower2 className="w-4 h-4 text-emerald-400" />
            <span>Local Coastal & Deepwater Flora & Fauna Ecosystem Dossier</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Protected marine flora (seagrasses, mangroves) and endangered fauna (cetaceans, sea turtles) with vessel speed and anchoring restrictions
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Fish className="w-3.5 h-3.5 text-emerald-400" />
          <span>MARPOL ANNEX V PROTECTED</span>
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-[9px] text-slate-500 font-bold">SPECIES TYPE:</span>
          {['ALL', 'FLORA', 'FAUNA'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTypeFilter(t as any);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1 rounded-xl text-[9px] font-bold transition-all ${
                typeFilter === t
                  ? 'bg-emerald-500 text-slate-950 font-black shadow'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flora/fauna by name or region..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Species List */}
        <div className="lg:col-span-1 space-y-2">
          {filteredSpecies.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedSpecies(item);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedSpecies.id === item.id
                  ? 'bg-slate-950 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-emerald-400 font-bold">{item.id} • {item.type}</span>
                {getStatusBadge(item.conservationStatus)}
              </div>
              <h4 className="text-xs font-bold text-white">{item.commonName}</h4>
              <p className="text-[9px] text-slate-500 italic">{item.scientificName}</p>
            </div>
          ))}
        </div>

        {/* Selected Species Dossier */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[8px] text-emerald-400 font-bold block">{selectedSpecies.id} ECOLOGICAL DOSSIER</span>
              <h4 className="text-sm font-bold text-white">{selectedSpecies.commonName}</h4>
              <p className="text-[10px] text-slate-400 italic font-sans">{selectedSpecies.scientificName}</p>
            </div>
            {getStatusBadge(selectedSpecies.conservationStatus)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px]">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>HABITAT REGION:</span>
              </span>
              <span className="text-white font-bold block font-sans">{selectedSpecies.habitatRegion}</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block flex items-center space-x-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                <span>VESSEL SPEED RESTRICTION:</span>
              </span>
              <span className="text-amber-300 font-black text-sm block">
                {selectedSpecies.vesselSpeedRestrictionKts > 0
                  ? `MAX ${selectedSpecies.vesselSpeedRestrictionKts} KNOTS`
                  : 'NO ANCHORING ZONE'}
              </span>
            </div>
          </div>

          {/* Ecological Role & Key Threats */}
          <div className="space-y-3">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-emerald-400 font-bold block">ECOLOGICAL ROLE & ECOSYSTEM SERVICE:</span>
              <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{selectedSpecies.ecologicalRole}</p>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[9px] text-rose-400 font-bold block">PRIMARY ANTHROPOGENIC THREATS:</span>
              <div className="flex flex-wrap gap-2">
                {selectedSpecies.keyThreats.map((threat, idx) => (
                  <span key={idx} className="bg-rose-950/40 text-rose-300 border border-rose-900/80 text-[9px] px-2.5 py-1 rounded font-bold">
                    • {threat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
