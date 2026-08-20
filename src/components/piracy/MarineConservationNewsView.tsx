import React, { useState } from 'react';
import { Newspaper, Globe, Calendar, ExternalLink, Tag, ShieldCheck, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ConservationNewsItem {
  id: string;
  title: string;
  category: 'BIODIVERSITY' | 'REGULATION' | 'OCEAN_CLEANUP' | 'SPECIES_PROTECTION';
  region: string;
  source: string;
  date: string;
  readTime: string;
  summary: string;
  impactScore: 'HIGH' | 'MEDIUM' | 'CRITICAL';
}

const NEWS_DATA: ConservationNewsItem[] = [
  {
    id: 'NEWS-01',
    title: 'Australia Mandates 10-Knot Speed Cap in Torres Strait Cetacean Sanctuary',
    category: 'SPECIES_PROTECTION',
    region: 'Australia (Torres Strait & Coral Sea)',
    source: 'Australian Maritime Safety Authority (AMSA)',
    date: '2026-08-07',
    readTime: '3 min read',
    summary: 'New IMO-approved speed limits enforced for vessels over 300 GT entering Great Barrier Reef migratory whale zones to reduce ship strike mortalities by 85%.',
    impactScore: 'CRITICAL'
  },
  {
    id: 'NEWS-02',
    title: 'New Zealand Deploys Hydrophone Acoustic Array for Hector Dolphin Protection',
    category: 'BIODIVERSITY',
    region: 'New Zealand (Banks Peninsula)',
    source: 'NZ Dept of Conservation',
    date: '2026-08-06',
    readTime: '4 min read',
    summary: 'Autonomous buoy network transmits real-time echolocation warnings to incoming cargo ships, requesting sonar silence within 5 NM of coastal breeding waters.',
    impactScore: 'HIGH'
  },
  {
    id: 'NEWS-03',
    title: 'Philippines Expands Malampaya Sound Protected Seascape Boundary',
    category: 'REGULATION',
    region: 'Philippines (Palawan & Visayas)',
    source: 'DENR Coastal Management Bureau',
    date: '2026-08-04',
    readTime: '3 min read',
    summary: 'Expanded marine sanctuary bans heavy fuel oil (HFO) transits and establishes mandatory zero-discharge ballast water exchange zones.',
    impactScore: 'HIGH'
  },
  {
    id: 'NEWS-04',
    title: 'Vietnam Launches Con Dao Marine Turtle Safe Shipping Corridor',
    category: 'OCEAN_CLEANUP',
    region: 'Vietnam (Vung Tau & Con Dao)',
    source: 'Vietnam Administration of Seas & Islands',
    date: '2026-08-02',
    readTime: '5 min read',
    summary: 'Port authority issues night navigation light dimming directives and plastic waste interceptor barges at major outer anchorages.',
    impactScore: 'MEDIUM'
  }
];

export const MarineConservationNewsView: React.FC = () => {
  const [articles] = useState<ConservationNewsItem[]>(NEWS_DATA);
  const [selectedArticle, setSelectedArticle] = useState<ConservationNewsItem>(NEWS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Newspaper className="w-4 h-4 text-emerald-400" />
            <span>Marine Conservation & Environmental Intelligence News Hub</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Verified maritime environmental news, regulatory directives, and ocean protection updates
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          LIVE CONSERVATION FEED
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conservation news, region, or topic (e.g. Australia, Turtle, Speed Limit)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* News List */}
        <div className="lg:col-span-2 space-y-2 max-h-96 overflow-y-auto pr-1">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              onClick={() => {
                setSelectedArticle(news);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedArticle.id === news.id
                  ? 'bg-slate-950 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-[8px] text-emerald-400 font-bold uppercase">{news.category.replace(/_/g, ' ')}</span>
                <span className="text-[9px] text-slate-500 font-mono">{news.date}</span>
              </div>

              <h4 className="text-xs font-bold text-white">{news.title}</h4>

              <p className="text-[10px] text-slate-400 font-sans line-clamp-2">{news.summary}</p>

              <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1">
                <span>{news.source}</span>
                <span className="text-cyan-300 font-bold">{news.region}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Article Detail */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-emerald-400 font-bold block">{selectedArticle.id} • {selectedArticle.readTime}</span>
              <h4 className="text-xs font-bold text-white mt-1">{selectedArticle.title}</h4>
              <span className="text-[9px] text-slate-400 block font-sans mt-0.5">{selectedArticle.source}</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">TARGET REGION:</span>
                <span className="text-cyan-300 font-bold">{selectedArticle.region}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1">
                <span className="text-slate-500">POLICY IMPACT:</span>
                <span className="text-rose-400 font-bold">{selectedArticle.impactScore} IMPACT</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{selectedArticle.summary}</p>

            <div className="bg-emerald-950/30 border border-emerald-800 p-3 rounded-xl text-[10px] text-emerald-300 space-y-1">
              <span className="font-bold block text-emerald-400">OPERATIONAL TAKEAWAY FOR MASTER/NAVIGATOR:</span>
              <p className="font-sans text-[10px] text-slate-300">
                Ensure ECDIS voyage routes incorporate these updated spatial boundaries and check speed compliance before entering territorial waters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
