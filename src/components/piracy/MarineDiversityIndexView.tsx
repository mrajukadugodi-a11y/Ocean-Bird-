import React, { useState } from 'react';
import { Fish, Waves, ShieldCheck, BarChart3, Globe, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface DiversityIndexItem {
  id: string;
  regionName: string;
  shannonIndexScore: number;
  speciesRichnessCount: number;
  endangeredSpeciesCount: number;
  protectionLevel: 'HIGH_PROTECTION_PSSA' | 'MODERATE_MPA' | 'ELEVATED_MONITORING' | 'CRITICAL_CONSERVATION';
  dominantSpecies: string[];
  keyThreats: string[];
}

const DIVERSITY_INDEX_DATA: DiversityIndexItem[] = [
  {
    id: 'DIV-01',
    regionName: 'Coral Triangle (Sulu-Sulawesi Seascape)',
    shannonIndexScore: 4.82,
    speciesRichnessCount: 3200,
    endangeredSpeciesCount: 142,
    protectionLevel: 'HIGH_PROTECTION_PSSA',
    dominantSpecies: ['Hawksbill Turtle', 'Irrawaddy Dolphin', 'Whale Shark', 'Manta Ray'],
    keyThreats: ['Illegal Fishing (IUU)', 'Ship Noise Pollution', 'Thermal Bleaching']
  },
  {
    id: 'DIV-02',
    regionName: 'Great Barrier Reef & Coral Sea Basin',
    shannonIndexScore: 4.65,
    speciesRichnessCount: 2850,
    endangeredSpeciesCount: 98,
    protectionLevel: 'HIGH_PROTECTION_PSSA',
    dominantSpecies: ['Dugong', 'Green Sea Turtle', 'Humpback Whale', 'Potato Cod'],
    keyThreats: ['Container Vessel Strikes', 'Sediment Runoff', 'Acoustic Sonar Stress']
  },
  {
    id: 'DIV-03',
    regionName: 'Galapagos Marine Reserve Corridor',
    shannonIndexScore: 4.48,
    speciesRichnessCount: 2100,
    endangeredSpeciesCount: 115,
    protectionLevel: 'HIGH_PROTECTION_PSSA',
    dominantSpecies: ['Galapagos Penguin', 'Scalloped Hammerhead', 'Marine Iguana', 'Galapagos Fur Seal'],
    keyThreats: ['Industrial Longline Fishing', 'Microplastic Ingestion', 'Climate El Niño Shifts']
  },
  {
    id: 'DIV-04',
    regionName: 'Baltic Sea Marine Sanctuary Network',
    shannonIndexScore: 3.15,
    speciesRichnessCount: 820,
    endangeredSpeciesCount: 34,
    protectionLevel: 'ELEVATED_MONITORING',
    dominantSpecies: ['Harbour Porpoise', 'Grey Seal', 'Baltic Cod', 'Eelgrass Bed Habitats'],
    keyThreats: ['Eutrophication', 'Commercial Ship Heavy Traffic', 'Chemical Waste Dumping']
  }
];

export const MarineDiversityIndexView: React.FC = () => {
  const [items] = useState<DiversityIndexItem[]>(DIVERSITY_INDEX_DATA);
  const [selectedRegion, setSelectedRegion] = useState<DiversityIndexItem>(DIVERSITY_INDEX_DATA[0]);

  const getProtectionBadge = (level: string) => {
    switch (level) {
      case 'HIGH_PROTECTION_PSSA':
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">HIGH PSSA PROTECTION</span>;
      case 'MODERATE_MPA':
        return <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] px-2 py-0.5 rounded font-bold">MPA SANCTUARY</span>;
      default:
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold font-mono">ELEVATED MONITORING</span>;
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
            <Fish className="w-4 h-4 text-emerald-400" />
            <span>Global Marine Biodiversity Index & Ecosystem Health Portal</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Shannon Biodiversity Index metrics, species richness counts, endangered species tracking, and regional eco-threat analysis
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>SHANNON INDEX H' 0 - 5.0</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Diversity Region List */}
        <div className="lg:col-span-2 space-y-2">
          {items.map((r) => (
            <div
              key={r.id}
              onClick={() => {
                setSelectedRegion(r);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedRegion.id === r.id
                  ? 'bg-slate-950 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-emerald-400 font-bold block">{r.id} REGIONAL BIOME</span>
                  <h4 className="text-xs font-bold text-white">{r.regionName}</h4>
                </div>
                {getProtectionBadge(r.protectionLevel)}
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">SHANNON INDEX (H'):</span>
                  <span className="text-emerald-400 font-bold text-sm">{r.shannonIndexScore} / 5.0</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SPECIES RICHNESS:</span>
                  <span className="text-cyan-300 font-bold">{r.speciesRichnessCount.toLocaleString()} Species</span>
                </div>
                <div>
                  <span className="text-slate-500 block">IUCN ENDANGERED:</span>
                  <span className="text-rose-400 font-bold">{r.endangeredSpeciesCount} Protected</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Region Detailed Biome Dossier */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-emerald-400 font-bold block">{selectedRegion.id} BIODIVERSITY DOSSIER</span>
              <h4 className="text-xs font-bold text-white">{selectedRegion.regionName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">Shannon Diversity Score: H' = {selectedRegion.shannonIndexScore}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <span className="text-slate-500 block font-bold mb-1">KEY KEYSTONE SPECIES:</span>
              <div className="flex flex-wrap gap-1">
                {selectedRegion.dominantSpecies.map((s) => (
                  <span key={s} className="bg-slate-950 text-cyan-300 border border-slate-800 text-[8px] px-2 py-0.5 rounded font-bold">
                    🐟 {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-rose-950/20 border border-rose-900/50 p-3 rounded-xl text-[10px] text-rose-300 space-y-1">
              <span className="font-bold block text-rose-400">PRIMARY ECOSYSTEM THREATS:</span>
              <ul className="space-y-1 text-[9px] font-sans">
                {selectedRegion.keyThreats.map((t) => (
                  <li key={t} className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
