import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Copy,
  Check,
  Tag,
  Clock,
  Pin,
  Search,
  Clipboard,
  StickyNote
} from 'lucide-react';

export interface QuickNote {
  id: string;
  title: string;
  content: string;
  category: 'NAVIGATION' | 'HANDOVER' | 'PILOT' | 'ENGINE' | 'PORT';
  timestamp: string;
  isPinned: boolean;
}

const INITIAL_NOTES: QuickNote[] = [
  {
    id: 'NOTE-01',
    title: 'Pilot Boarding Station Instructions',
    content: 'Mumbai pilot boarding 2.5 NM SW of Fairway Buoy. Rig pilot ladder on LEE SIDE (Port Side), 1.5m above waterline with safety line and lifebuoy ready.',
    category: 'PILOT',
    timestamp: '2026-07-31 03:15',
    isPinned: true
  },
  {
    id: 'NOTE-02',
    title: 'Watch Handover - Steering Standby Engine',
    content: 'Engine room informed for Standby Engine at 0500 hrs. Steering gear pump #2 running in parallel. VHF Channel 12 for Port Control.',
    category: 'HANDOVER',
    timestamp: '2026-07-30 23:45',
    isPinned: true
  },
  {
    id: 'NOTE-03',
    title: 'Bunker Spec Check Notes',
    content: 'VLSFO 0.50% Sulfur density check: 948 kg/m3 @ 15°C. Viscosity 180 cSt. Ensure continuous sample taken during transfer.',
    category: 'ENGINE',
    timestamp: '2026-07-30 18:20',
    isPinned: false
  }
];

export const CaptainQuickNotesView: React.FC = () => {
  const [notes, setNotes] = useState<QuickNote[]>(INITIAL_NOTES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<QuickNote['category']>('NAVIGATION');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const note: QuickNote = {
      id: `NOTE-${Date.now()}`,
      title: newTitle,
      content: newContent,
      category: newCategory,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isPinned: false
    };

    setNotes([note, ...notes]);
    setNewTitle('');
    setNewContent('');
    setShowAddForm(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleTogglePin = (id: string) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleCopyNote = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div id="captain-quick-notes-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <StickyNote className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>CAPTAIN & DUTY WATCH OFFICERS HANDOVER SCRATCHPAD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Clipboard className="w-6 h-6 text-emerald-400" />
              <span>Bridge Duty Officers Quick Notes</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Rapid scratchpad for bridge watch handovers, pilot ladder setups, VHF channel logs, and bunker calculations.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE NEW QUICK NOTE</span>
          </button>
        </div>
      </div>

      {/* Add Form Modal/Card */}
      {showAddForm && (
        <form
          onSubmit={handleAddNote}
          className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-5 shadow-2xl space-y-4 font-mono animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm">Add Bridge Watch Note</h3>
            <span className="text-xs text-emerald-400">RAPID SCRATCHPAD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="text-slate-400 block mb-1">NOTE TITLE</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Pilot Station Ladder Heights"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">CATEGORY</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as QuickNote['category'])}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="NAVIGATION">NAVIGATION</option>
                <option value="HANDOVER">HANDOVER</option>
                <option value="PILOT">PILOT</option>
                <option value="ENGINE">ENGINE</option>
                <option value="PORT">PORT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs block mb-1">NOTE DETAILS</label>
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Type note details here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
            >
              SAVE NOTE
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono shadow-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto text-xs">
          {['ALL', 'HANDOVER', 'PILOT', 'NAVIGATION', 'ENGINE', 'PORT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`p-5 rounded-2xl border space-y-3 shadow-xl transition-all relative ${
              note.isPinned
                ? 'bg-slate-900 border-amber-500/60 ring-1 ring-amber-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-emerald-400 font-bold">
                {note.category}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleTogglePin(note.id)}
                  className={`p-1 transition-colors ${
                    note.isPinned ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Pin Note"
                >
                  <Pin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCopyNote(note.content, note.id)}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                  title="Copy Note Content"
                >
                  {copiedId === note.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Delete Note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-white text-sm">{note.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              {note.content}
            </p>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{note.timestamp}</span>
              </span>
              <span>{note.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
