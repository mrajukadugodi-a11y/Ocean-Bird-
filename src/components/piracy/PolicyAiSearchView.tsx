import React, { useState } from 'react';
import { Search, Scale, FileText, CheckCircle2, ShieldAlert, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PolicySearchItem {
  id: string;
  sourceAuthority: 'IMO' | 'AMSA' | 'EMSA' | 'USCG' | 'UNCLOS';
  title: string;
  codeReference: string;
  summary: string;
  enforcementPenalty: string;
  effectiveDate: string;
}

const POLICY_SEARCH_DATA: PolicySearchItem[] = [
  {
    id: 'POL-SRCH-01',
    sourceAuthority: 'IMO',
    title: 'MARPOL Annex VI - Fuel Oil Quality & 0.50% Global Sulfur Cap',
    codeReference: 'MARPOL 73/78 Annex VI Regulation 14',
    summary: 'Limits the sulfur content of fuel oil used on board ships to 0.50% m/m globally and 0.10% m/m in designated Emission Control Areas (ECAs).',
    enforcementPenalty: 'Vessel detention by Port State Control, heavy fines, and mandatory fuel sampling.',
    effectiveDate: 'Enforced Jan 1, 2020 (Updated 2026)'
  },
  {
    id: 'POL-SRCH-02',
    sourceAuthority: 'AMSA',
    title: 'Great Barrier Reef & Torres Strait Vessel Speed Reduction Directive',
    codeReference: 'AMSA Marine Order 54 (Corridor Safety)',
    summary: 'Commercial ships over 300 GT must maintain speeds below 10 knots in designated whale calving grounds to prevent cetacean strikes.',
    enforcementPenalty: 'Up to $220,000 AUD civil penalties and revocation of coastal pilotage permit.',
    effectiveDate: 'Enforced Seasonally (June - September)'
  },
  {
    id: 'POL-SRCH-03',
    sourceAuthority: 'UNCLOS',
    title: 'Article 111 - Right of Hot Pursuit Across High Seas',
    codeReference: 'UNCLOS 1982 Article 111',
    summary: 'Allows coastal state authorities to pursue foreign ships into international waters if there is good reason to believe the ship violated coastal state laws.',
    enforcementPenalty: 'Interception, maritime arrest, and extradition under flag-state agreements.',
    effectiveDate: 'Enforced Nov 16, 1994'
  },
  {
    id: 'POL-SRCH-04',
    sourceAuthority: 'EMSA',
    title: 'EU Maritime Safety Directive on Ballast Water Discharges',
    codeReference: 'EU Directive 2024/902 BWM Standard',
    summary: 'Strict zero-discharge rules in Baltic and North Sea ports without prior D-2 ultraviolet ballast water sterilization.',
    enforcementPenalty: 'Immediate ban from EU territorial waters and mandatory port cleanup indemnities.',
    effectiveDate: 'Enforced May 1, 2024'
  }
];

export const PolicyAiSearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('ALL');
  const [results] = useState<PolicySearchItem[]>(POLICY_SEARCH_DATA);

  const filteredResults = results.filter(p => {
    const matchesAuth = selectedAuthority === 'ALL' || p.sourceAuthority === selectedAuthority;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.codeReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAuth && matchesQuery;
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
            <Search className="w-4 h-4 text-cyan-400" />
            <span>AI Semantic Policy & Regulatory Legal Clause Search Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Search full-text regulatory archives across IMO SOLAS, MARPOL, AMSA Marine Orders, and UNCLOS treaties
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>REAL-TIME CLAUSE INDEX</span>
        </span>
      </div>

      {/* Search Input & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords: 'sulfur cap', 'ballast water', 'speed limit', 'hot pursuit'..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['ALL', 'IMO', 'AMSA', 'EMSA', 'UNCLOS'].map((auth) => (
            <button
              key={auth}
              onClick={() => {
                setSelectedAuthority(auth);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all ${
                selectedAuthority === auth
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {auth}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results List */}
      <div className="space-y-3">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <div className="flex items-center space-x-2">
                <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[8px] px-2 py-0.5 rounded font-bold">
                  {item.sourceAuthority}
                </span>
                <span className="text-[10px] font-bold text-emerald-400">{item.codeReference}</span>
              </div>
              <span className="text-[8px] text-slate-500">{item.effectiveDate}</span>
            </div>

            <h4 className="text-xs font-bold text-white">{item.title}</h4>
            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{item.summary}</p>

            <div className="bg-rose-950/20 border border-rose-900/50 p-2.5 rounded-xl text-[9px] text-rose-300 flex items-start space-x-2">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-rose-400">NON-COMPLIANCE PENALTY:</span>
                <span className="font-sans">{item.enforcementPenalty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
