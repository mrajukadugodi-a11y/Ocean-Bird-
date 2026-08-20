import React, { useState } from 'react';
import { History, Calendar, Shield, Sparkles, Filter, CheckCircle2, ChevronRight, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TimelineEvent {
  year: number;
  title: string;
  category: 'CONVENTION' | 'PROTECTED_AREA' | 'DECARBONIZATION' | 'SPECIES_LAW';
  region: string;
  impactSummary: string;
  keyDirectives: string[];
}

const CONSERVATION_TIMELINE_DATA: TimelineEvent[] = [
  {
    year: 1973,
    title: 'IMO MARPOL Convention Enacted',
    category: 'CONVENTION',
    region: 'Global High Seas',
    impactSummary: 'International Convention for the Prevention of Pollution from Ships (MARPOL 73/78) established foundational anti-pollution standards.',
    keyDirectives: ['Prohibited oil discharge in coastal waters', 'Mandated double-hull design for oil tankers', 'Established garbage & sewage handling protocols']
  },
  {
    year: 1982,
    title: 'UNCLOS Law of the Sea Adopted',
    category: 'CONVENTION',
    region: 'Global Maritime Boundaries',
    impactSummary: 'United Nations Convention on the Law of the Sea codified Exclusive Economic Zones (EEZ) up to 200 NM and marine protection duties.',
    keyDirectives: ['Defined 12 NM Territorial Seas & 200 NM EEZs', 'Imposed duty to protect marine environment (Art 192)', 'Regulated innocent passage in vulnerable straits']
  },
  {
    year: 2004,
    title: 'Ballast Water Management Convention',
    category: 'SPECIES_LAW',
    region: 'International Shipping Lines',
    impactSummary: 'Implemented rules to stop the spread of invasive aquatic organisms carried in ships\' ballast water.',
    keyDirectives: ['Mandatory ballast water treatment systems (D-2)', 'Regulated deep-sea exchange distances (>200 NM)', 'Standardized ballast logbook inspections']
  },
  {
    year: 2012,
    title: 'Great Barrier Reef PSSA Speed Restrictions',
    category: 'PROTECTED_AREA',
    region: 'Australia Marine Park',
    impactSummary: 'Designated Particularly Sensitive Sea Area (PSSA) with strict mandatory vessel routing and cetacean speed limits.',
    keyDirectives: ['Maximum 10-knot speed limits in whale channels', 'Compulsory coastal pilotage for vessels >70m', 'Zero bilge discharge zones']
  },
  {
    year: 2023,
    title: 'UN High Seas Treaty (BBNJ Agreement)',
    category: 'CONVENTION',
    region: 'High Seas Beyond EEZ',
    impactSummary: 'Historic treaty enabling the creation of Marine Protected Areas (MPAs) in international waters covering 30% of global oceans.',
    keyDirectives: ['Targeted 30x30 global ocean protection', 'Environmental Impact Assessments for deep-sea mining', 'Fair sharing of marine genetic resources']
  },
  {
    year: 2026,
    title: 'IMO Operational Carbon Intensity Indicator (CII)',
    category: 'DECARBONIZATION',
    region: 'Global Fleet 5000+ GT',
    impactSummary: 'Mandatory annual carbon rating (A-E) requiring continuous operational efficiency improvements year-over-year.',
    keyDirectives: ['Enforced A-E rating scale for commercial vessels', 'Mandatory Corrective Action Plans for D/E ratings', 'AI route optimization integration requirements']
  }
];

export const ConservationTimelineView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [events] = useState<TimelineEvent[]>(CONSERVATION_TIMELINE_DATA);

  const filteredEvents = events.filter(e =>
    selectedCategory === 'ALL' ? true : e.category === selectedCategory
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
            <History className="w-4 h-4 text-emerald-400" />
            <span>Global Marine Conservation & Policy Historical Timeline</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Interactive timeline tracking historic treaties, UNCLOS marine laws, MARPOL conventions, and decarbonization mandates
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Globe className="w-3 h-3 text-emerald-400" />
          <span>1973 - 2026 CHRONOLOGY</span>
        </span>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-3">
        {['ALL', 'CONVENTION', 'PROTECTED_AREA', 'DECARBONIZATION', 'SPECIES_LAW'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 font-black shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-emerald-500/30 ml-4 space-y-6 pl-6 py-2">
        {filteredEvents.map((item, idx) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="relative bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-emerald-500/50 transition-all"
          >
            {/* Year Node Marker */}
            <div className="absolute -left-[31px] top-4 w-5 h-5 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-900 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black text-emerald-400">{item.year}</span>
                <span className="text-xs font-bold text-white">{item.title}</span>
              </div>
              <span className="bg-slate-900 text-cyan-300 border border-slate-800 text-[8px] px-2 py-0.5 rounded font-bold self-start sm:self-auto">
                {item.category} • {item.region}
              </span>
            </div>

            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{item.impactSummary}</p>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-[9px] text-slate-500 font-bold block">KEY REGULATORY DIRECTIVES:</span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-1 text-[9px] text-slate-300">
                {item.keyDirectives.map((d) => (
                  <li key={d} className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span className="font-sans">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
