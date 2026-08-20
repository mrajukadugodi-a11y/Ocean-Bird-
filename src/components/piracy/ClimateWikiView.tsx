import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, HelpCircle, Layers, Globe, Shield, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface WikiArticle {
  id: string;
  title: string;
  category: 'OCEANOGRAPHY' | 'CLIMATE_MODELS' | 'IMO_REGULATIONS' | 'DECARBONIZATION';
  summary: string;
  fullContent: string;
  keyTerms: string[];
  referenceSource: string;
}

const WIKI_DATABASE: WikiArticle[] = [
  {
    id: 'WIKI-01',
    title: 'Sea Surface Temperature (SST) Anomalies & Cyclone Intensification',
    category: 'OCEANOGRAPHY',
    summary: 'How elevated SST above 26.5°C acts as thermodynamic fuel for rapid tropical cyclone intensification in maritime transit corridors.',
    fullContent: 'Sea Surface Temperature (SST) measures the temperature of ocean water close to the surface (typically top 1mm to 20m). When SST exceeds the 26.5°C threshold, thermal energy evaporation rates accelerate exponentially, providing latent heat that fuels Category 4 and 5 super typhoons. Ships in transit must monitor real-time satellite SST anomalies to forecast rapid storm deepening.',
    keyTerms: ['SST Anomaly', 'Latent Heat', 'Rapid Deepening', 'Tropical Cyclone'],
    referenceSource: 'NOAA Ocean Climate Telemetry & IPCC AR6 Working Group I'
  },
  {
    id: 'WIKI-02',
    title: 'IMO Carbon Intensity Indicator (CII) & Rating Grades (A to E)',
    category: 'IMO_REGULATIONS',
    summary: 'The IMO mandatory operational efficiency measure rating ships on grams of CO2 emitted per cargo capacity-nautical mile.',
    fullContent: 'The Carbon Intensity Indicator (CII) measures how efficiently a vessel transports goods or passengers. Ships are given an operational carbon intensity rating from A (major superior) to E (inferior). Vessels rated D for three consecutive years or E for one year must submit an approved SEEMP III corrective action plan for speed optimization and wind-assisted propulsion.',
    keyTerms: ['CII Rating', 'SEEMP III', 'IMO 2030 Goals', 'Operational CO2'],
    referenceSource: 'International Maritime Organization (IMO) MEPC.336(76)'
  },
  {
    id: 'WIKI-03',
    title: 'Ocean Acidification (pH Drop) & Subsea Infrastructure Corrosion',
    category: 'OCEANOGRAPHY',
    summary: 'The absorption of anthropogenic CO2 into seawater forming carbonic acid, lowering ocean pH and accelerating hull galvanic corrosion.',
    fullContent: 'As the ocean absorbs roughly 30% of human CO2 emissions, chemical reactions reduce seawater pH (increasing acidity). Lower pH depletes carbonate ions required by marine shell-forming organisms and increases the galvanic corrosion rate of steel hulls, ballast tanks, and subsea oil pipelines.',
    keyTerms: ['Ocean pH', 'Carbonic Acid', 'Galvanic Corrosion', 'Hull Protection'],
    referenceSource: 'UNESCO Intergovernmental Oceanographic Commission'
  },
  {
    id: 'WIKI-04',
    title: 'Wind-Assisted Ship Propulsion (WASP) & Rotor Sails',
    category: 'DECARBONIZATION',
    summary: 'Leveraging Flettner rotor sails, rigid wing sails, and automated kites to reduce vessel fuel consumption by 8% to 20%.',
    fullContent: 'Wind-Assisted Ship Propulsion (WASP) harnesses offshore wind power using vertical rotating cylinders (Flettner rotors) or rigid composite wing sails. The Magnus effect generates forward thrust perpendicular to wind vectors, significantly reducing engine load and fuel consumption on trans-Pacific and North Atlantic shipping routes.',
    keyTerms: ['Flettner Rotor', 'Magnus Effect', 'Wing Sails', 'Fuel Savings'],
    referenceSource: 'International Windship Association (IWSA) Report 2026'
  }
];

export const ClimateWikiView: React.FC = () => {
  const [wikiArticles] = useState<WikiArticle[]>(WIKI_DATABASE);
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle>(WIKI_DATABASE[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = wikiArticles.filter(a => {
    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.keyTerms.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Interactive Ocean Climate & Maritime Decarbonization Knowledge Base Wiki</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Searchable encyclopedia of marine climate terminology, IMO regulatory frameworks, oceanographic indicators, and wind propulsion technologies
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>IMO & IPCC ENCYCLOPEDIA</span>
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[9px] text-slate-500 font-bold">CATEGORY:</span>
          {['ALL', 'OCEANOGRAPHY', 'IMO_REGULATIONS', 'DECARBONIZATION'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-xl text-[8px] font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-black shadow'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wiki by keyword or term..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Article Title List */}
        <div className="lg:col-span-1 space-y-2">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => {
                setSelectedArticle(art);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedArticle.id === art.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-cyan-400 font-bold">{art.id}</span>
                <span className="bg-slate-900 text-cyan-300 border border-slate-800 text-[8px] px-2 py-0.5 rounded font-bold">
                  {art.category}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white leading-tight">{art.title}</h4>
              <p className="text-[9px] text-slate-400 font-sans line-clamp-2">{art.summary}</p>
            </div>
          ))}
        </div>

        {/* Selected Article Content Dossier */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedArticle.id} WIKI ENTRY</span>
              <h4 className="text-sm font-bold text-white">{selectedArticle.title}</h4>
              <span className="text-[9px] text-slate-500 block font-sans">Source: {selectedArticle.referenceSource}</span>
            </div>
            <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] px-2.5 py-1 rounded font-bold">
              {selectedArticle.category}
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[9px] text-cyan-400 font-bold block">EXECUTIVE EXPLANATION:</span>
            <p className="text-[11px] text-slate-200 font-sans leading-relaxed">{selectedArticle.fullContent}</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-900">
            <span className="text-[9px] text-slate-500 font-bold block">KEY MARITIME TERMINOLOGY:</span>
            <div className="flex flex-wrap gap-2">
              {selectedArticle.keyTerms.map((term, idx) => (
                <span key={idx} className="bg-slate-900 text-cyan-300 border border-slate-800 text-[9px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
                  <Tag className="w-3 h-3 text-cyan-400" />
                  <span>{term}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
