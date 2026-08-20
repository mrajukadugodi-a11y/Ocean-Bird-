import React, { useState, useMemo } from 'react';
import { 
  Search, Cpu, Filter, CheckCircle2, Sliders, Hash, UserCheck, 
  Sparkles, Layers, ShieldCheck, ArrowUpDown, Clock, HelpCircle
} from 'lucide-react';

export interface IndexedForumThread {
  id: string;
  title: string;
  author: string;
  authorRank: string;
  isExpert: boolean;
  category: string;
  tags: string[];
  excerpt: string;
  timestamp: string;
  upvotes: number;
  repliesCount: number;
  isSolved: boolean;
  relevanceScore?: number;
}

export const INITIAL_INDEXED_THREADS: IndexedForumThread[] = [
  {
    id: 'TH-001',
    title: 'How is your fleet preparing for the 2026 MARPOL CII Grade E mandatory penalty audits?',
    author: 'Capt. Vikram Sethi',
    authorRank: 'Master Mariner [Lvl 4]',
    isExpert: false,
    category: 'MARPOL Compliance',
    tags: ['CII', 'MARPOL', 'Audits'],
    excerpt: 'We conducted trials with hydrodynamic Propeller Boss Cap Fins (PBCF) and hull air lubrication carpets. The CII rating improved from D to C.',
    timestamp: '2 hours ago',
    upvotes: 34,
    repliesCount: 12,
    isSolved: true
  },
  {
    id: 'TH-002',
    title: 'Verifying Sundarbans Mangrove Blue Carbon Credits using Sentinel-2 SAR satellite telemetry',
    author: 'Dr. Ananya Sen',
    authorRank: 'UN Accredited Scientist',
    isExpert: true,
    category: 'Blue Carbon',
    tags: ['Sundarbans', 'BlueCarbon', 'SAR'],
    excerpt: 'Our hydrographic sensor network in the Sundarbans estuary measured 14% higher biomass carbon fixation. Immutable Ocean Dollar minting verified.',
    timestamp: '5 hours ago',
    upvotes: 28,
    repliesCount: 8,
    isSolved: true
  },
  {
    id: 'TH-003',
    title: 'Deployment protocols for PETase enzymatic skimmer drones in high-salinity pelagic gyres',
    author: 'Lt. Cmdr. Sarah Perera',
    authorRank: 'IMO Auditor & Oceanographer',
    isExpert: true,
    category: 'Marine Biotech',
    tags: ['PETase', 'Plastics', 'Drones'],
    excerpt: 'Standard PETase enzymes degrade rapidly at 35 PSU salinity. We engineered a halotolerant enzyme mutant that maintains 88% activity in oceanic seawater.',
    timestamp: '1 day ago',
    upvotes: 42,
    repliesCount: 15,
    isSolved: false
  },
  {
    id: 'TH-004',
    title: 'Green Ammonia Bunkering Safety: Mass Flow Meter SFOC calibration guidelines',
    author: 'Chief Eng. Marcus Vance',
    authorRank: 'Alternative Fuels Specialist',
    isExpert: true,
    category: 'Alternative Fuels',
    tags: ['Ammonia', 'Bunkering', 'Calibration'],
    excerpt: 'ISO 17025 certification is required for MFM calibration rigs before Port State Control audits in Singapore and Colombo.',
    timestamp: '2 days ago',
    upvotes: 56,
    repliesCount: 19,
    isSolved: true
  }
];

interface ForumSearchIndexerProps {
  onSelectThread?: (threadId: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const ForumSearchIndexer: React.FC<ForumSearchIndexerProps> = ({ onSelectThread, onTriggerToast }) => {
  const [threads] = useState<IndexedForumThread[]>(INITIAL_INDEXED_THREADS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SOLVED_ONLY' | 'EXPERT_AUTHORED'>('ALL');
  const [sortBy, setSortBy] = useState<'RELEVANCE' | 'UPVOTES' | 'NEWEST'>('RELEVANCE');

  // SIMULATED INSTANT INDEX SEARCH ENGINE WITH RELEVANCE SCORING
  const indexedResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const scored = threads.map((item) => {
      let score = 0;
      if (!q) {
        score = item.upvotes;
      } else {
        if (item.title.toLowerCase().includes(q)) score += 50;
        if (item.excerpt.toLowerCase().includes(q)) score += 30;
        if (item.category.toLowerCase().includes(q)) score += 20;
        if (item.tags.some(t => t.toLowerCase().includes(q))) score += 25;
        if (item.author.toLowerCase().includes(q)) score += 15;
      }

      return { ...item, relevanceScore: score };
    });

    let filtered = scored.filter(item => {
      if (q && item.relevanceScore === 0) return false;
      if (selectedTag !== 'ALL' && !item.tags.includes(selectedTag)) return false;
      if (statusFilter === 'SOLVED_ONLY' && !item.isSolved) return false;
      if (statusFilter === 'EXPERT_AUTHORED' && !item.isExpert) return false;
      return true;
    });

    if (sortBy === 'RELEVANCE') {
      filtered.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    } else if (sortBy === 'UPVOTES') {
      filtered.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === 'NEWEST') {
      filtered.sort((a, b) => a.id.localeCompare(b.id));
    }

    return filtered;
  }, [threads, searchQuery, selectedTag, statusFilter, sortBy]);

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-amber-400/30 text-amber-300 font-bold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/20 border border-cyan-400/40 rounded-xl">
            <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">FULL-TEXT INSTANT INDEXING ENGINE</span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                LATENCY 0.012s
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Forum Search &amp; Knowledge Indexer</h2>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-400">
          INDEX STATS: <strong className="text-cyan-300 font-bold">1,420 THREADS INDEXED</strong>
        </div>
      </div>

      {/* SEARCH INPUT & FILTERS TOOLBAR */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indexed forum posts by keyword, CII, MARPOL, PETase, expert name, tag..."
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-cyan-400 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
            >
              CLEAR ✕
            </button>
          )}
        </div>

        {/* CONTROLS ROW */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 font-bold flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>STATUS:</span>
            </span>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'ALL' ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setStatusFilter('SOLVED_ONLY')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'SOLVED_ONLY' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              ✓ SOLVED ONLY
            </button>
            <button
              onClick={() => setStatusFilter('EXPERT_AUTHORED')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'EXPERT_AUTHORED' ? 'bg-indigo-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              ★ EXPERT AUTHORED
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-slate-400 font-bold flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>SORT:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-cyan-300 font-mono text-xs focus:outline-none"
            >
              <option value="RELEVANCE">Relevance Score</option>
              <option value="UPVOTES">Most Upvoted</option>
              <option value="NEWEST">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* INDEXED RESULTS FEED */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>FOUND {indexedResults.length} INDEXED MATCHES</span>
          {searchQuery && (
            <span>RELEVANCE MATCH FOR &quot;<strong className="text-cyan-300">{searchQuery}</strong>&quot;</span>
          )}
        </div>

        {indexedResults.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="font-bold text-white text-sm">No indexed forum discussions match your query</h4>
            <p className="text-slate-400 text-xs font-sans">
              Try searching for &quot;MARPOL&quot;, &quot;CII&quot;, &quot;PETase&quot;, or &quot;Ammonia&quot;
            </p>
          </div>
        ) : (
          indexedResults.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-2xl transition-all space-y-3 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-slate-950 text-cyan-400 border border-slate-800 px-2 py-0.5 rounded text-[9px] font-bold">
                      {item.category}
                    </span>
                    {item.isSolved && (
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>VERIFIED SOLVED</span>
                      </span>
                    )}
                    {item.isExpert && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[9px] font-bold flex items-center space-x-1">
                        <UserCheck className="w-3 h-3 text-amber-400" />
                        <span>ACCREDITED EXPERT</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                    {highlightMatch(item.title, searchQuery)}
                  </h3>

                  <div className="text-xs text-slate-400 font-sans flex items-center space-x-2">
                    <span>By <strong className="text-slate-200">{item.author}</strong> ({item.authorRank})</span>
                    <span>• {item.timestamp}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="bg-slate-950 text-emerald-400 font-bold border border-slate-800 px-3 py-1 rounded-xl text-xs block">
                    ▲ {item.upvotes}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono mt-1 block">
                    SCORE: {item.relevanceScore}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs font-sans leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {highlightMatch(item.excerpt, searchQuery)}
              </p>

              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(t => (
                    <span key={t} className="text-[9px] text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                {onSelectThread && (
                  <button
                    onClick={() => {
                      onSelectThread(item.id);
                      onTriggerToast(`📖 Opened thread #${item.id}`);
                    }}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-mono"
                  >
                    <span>VIEW FULL DISCUSSION →</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
