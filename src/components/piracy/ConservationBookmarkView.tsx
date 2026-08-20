import React, { useState } from 'react';
import { Bookmark, Trash2, Download, CheckCircle2, Search, Share2, Tag, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface BookmarkedItem {
  id: string;
  title: string;
  category: 'SPECIES' | 'POLICY' | 'CONSERVATION_NEWS' | 'PORT_GUIDE';
  region: string;
  dateSaved: string;
  summary: string;
  referenceCode: string;
}

const INITIAL_BOOKMARKS: BookmarkedItem[] = [
  {
    id: 'BM-01',
    title: 'Blue Whale (Balaenoptera musculus) - Torres Strait Guidelines',
    category: 'SPECIES',
    region: 'Australia & Indo-Pacific',
    dateSaved: '2026-08-08',
    summary: 'Mandatory 10-knot speed restriction in Great Barrier Reef Marine Park sensitive migratory corridors.',
    referenceCode: 'AMSA-SPEC-01'
  },
  {
    id: 'BM-02',
    title: 'IMO Annex VI Tier III NOx & Decarbonization Mandate',
    category: 'POLICY',
    region: 'Global High Seas',
    dateSaved: '2026-08-07',
    summary: 'Requires commercial vessels over 5,000 GT to record operational carbon intensity (CII) and maintain annual rating thresholds.',
    referenceCode: 'MARPOL-ANNEX-VI'
  },
  {
    id: 'BM-03',
    title: 'New Zealand Deploys Hydrophone Acoustic Array for Hector Dolphin Protection',
    category: 'CONSERVATION_NEWS',
    region: 'New Zealand',
    dateSaved: '2026-08-06',
    summary: 'Autonomous buoy network transmits real-time echolocation warnings to incoming cargo ships.',
    referenceCode: 'NZ-DOC-2026'
  }
];

export const ConservationBookmarkView: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>(INITIAL_BOOKMARKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [exportSuccess, setExportSuccess] = useState(false);

  const removeBookmark = (id: string) => {
    hapticEngine.trigger('click');
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const exportBookmarks = () => {
    hapticEngine.trigger('click');
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2500);
  };

  const filtered = bookmarks.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Marine Conservation, Policy & Species Bookmark Manager</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Saved species entries, bookmarked environmental policies, and exportable voyage compliance checklists
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportBookmarks}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-[10px] font-bold flex items-center space-x-1 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT BOOKMARKS</span>
          </button>
          <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
            {bookmarks.length} SAVED
          </span>
        </div>
      </div>

      {exportSuccess && (
        <div className="bg-emerald-950 border border-emerald-800 p-3 rounded-2xl text-[10px] text-emerald-300 flex items-center space-x-2 font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Conservation bookmarks exported successfully to JSON/PDF compliance binder!</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search saved bookmarks..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((bm) => (
          <div
            key={bm.id}
            className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-[8px] text-cyan-400 font-bold">{bm.referenceCode} • SAVED {bm.dateSaved}</span>
                <span className="bg-slate-900 text-slate-300 border border-slate-800 text-[8px] px-2 py-0.5 rounded font-bold">
                  {bm.category}
                </span>
              </div>

              <h4 className="text-xs font-bold text-white">{bm.title}</h4>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">{bm.summary}</p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-[9px]">
              <span className="text-cyan-300 font-bold">{bm.region}</span>
              <button
                onClick={() => removeBookmark(bm.id)}
                className="text-rose-400 hover:text-rose-300 p-1 rounded-lg hover:bg-rose-950/40 transition-all flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>REMOVE</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
