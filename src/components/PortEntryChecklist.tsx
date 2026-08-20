import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Anchor,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Download,
  CheckCircle2,
  Ship,
  Sparkles,
  ClipboardList,
  UserCheck,
  Stethoscope,
  Radio,
  Share2
} from 'lucide-react';

export interface ChecklistItem {
  id: string;
  category: 'Customs & Immigration' | 'Ballast Water & Environment' | 'Harbor Pilot & Tugs' | 'IMDG Dangerous Cargo' | 'Maritime Health & Quarantine';
  title: string;
  description: string;
  mandatory: boolean;
  isCompleted: boolean;
  documentCode: string;
}

const SOUTH_ASIA_PORTS = [
  { id: 'jnpt-mumbai', name: 'Mumbai JNPT & Nhava Sheva', country: 'India 🇮🇳', pilotChannel: 'VHF Ch 12 / 16' },
  { id: 'chittagong', name: 'Chittagong Outer Anchorage', country: 'Bangladesh 🇧🇩', pilotChannel: 'VHF Ch 12' },
  { id: 'colombo', name: 'Colombo International Container Terminal', country: 'Sri Lanka 🇱🇰', pilotChannel: 'VHF Ch 10 / 16' },
  { id: 'male', name: 'Malé Commercial Port', country: 'Maldives 🇲🇻', pilotChannel: 'VHF Ch 16' },
  { id: 'karachi', name: 'Karachi Port Trust', country: 'Pakistan 🇵🇰', pilotChannel: 'VHF Ch 12 / 14' }
];

const INITIAL_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'Customs & Immigration',
    title: 'Seafarer Crew List & Passport Pass Validation',
    description: 'IMO General Declaration (FAL Form 1) with valid passport numbers, discharge books, and shore leave visas.',
    mandatory: true,
    isCompleted: true,
    documentCode: 'FAL-FORM-1'
  },
  {
    id: 'chk-2',
    category: 'Customs & Immigration',
    title: 'Cargo Manifest & Stowage Bay Plan Submission',
    description: 'Electronic manifest transmitted to Customs Portal 48 hours prior to arrival at harbor pilot station.',
    mandatory: true,
    isCompleted: true,
    documentCode: 'CUST-MAN-99'
  },
  {
    id: 'chk-3',
    category: 'Ballast Water & Environment',
    title: 'IMO D-2 Ballast Water Log & Exchange Record',
    description: 'Confirmation of mid-ocean ballast water exchange (>200 NM offshore, depth >200m) or approved UV/chemical ballast treatment system.',
    mandatory: true,
    isCompleted: false,
    documentCode: 'IMO-BWM-D2'
  },
  {
    id: 'chk-4',
    category: 'Ballast Water & Environment',
    title: 'VLSFO Low-Sulfur Fuel Bunker Delivery Note (BDN)',
    description: 'Sulfur content verification (< 0.50% m/m VLSFO)BDN log for port ECA emissions compliance.',
    mandatory: true,
    isCompleted: true,
    documentCode: 'MARPOL-VI-BDN'
  },
  {
    id: 'chk-5',
    category: 'Harbor Pilot & Tugs',
    title: 'Harbor Pilot Station Boarding ETA Transmission',
    description: 'Formal ETA broadcast to Port Control via VHF or SATCOM 24h, 12h, and 2h prior to arrival at pilot boarding station.',
    mandatory: true,
    isCompleted: false,
    documentCode: 'PILOT-ETA-01'
  },
  {
    id: 'chk-6',
    category: 'Harbor Pilot & Tugs',
    title: 'Pilot Ladder Inspection & Safety Test',
    description: 'ISO 799-1 pilot ladder inspected, free from oil grease, manropes rigged, and lighting tested for night boarding.',
    mandatory: true,
    isCompleted: true,
    documentCode: 'SOLAS-V-LADDER'
  },
  {
    id: 'chk-7',
    category: 'IMDG Dangerous Cargo',
    title: 'IMDG Dangerous Goods Declaration & Manifest',
    description: 'Class 1-9 hazardous cargo segregation verified with container emergency response procedures on bridge.',
    mandatory: false,
    isCompleted: true,
    documentCode: 'IMDG-FAL-7'
  },
  {
    id: 'chk-8',
    category: 'Maritime Health & Quarantine',
    title: 'Maritime Declaration of Health (MDH) & Yellow Fever Log',
    description: 'Master signature declaring crew health status, temperature checks, and free of infectious disease symptoms.',
    mandatory: true,
    isCompleted: false,
    documentCode: 'WHO-IHR-MDH'
  }
];

export const PortEntryChecklist: React.FC = () => {
  const [selectedPortId, setSelectedPortId] = useState('jnpt-mumbai');
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST_ITEMS);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const selectedPort = SOUTH_ASIA_PORTS.find((p) => p.id === selectedPortId) || SOUTH_ASIA_PORTS[0];

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const completedCount = items.filter((i) => i.isCompleted).length;
  const totalCount = items.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const filteredItems = filterCategory === 'All'
    ? items
    : items.filter((i) => i.category === filterCategory);

  return (
    <div id="port-entry-checklist" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ClipboardList className="w-4 h-4 text-emerald-400" />
              <span>MARITIME PORT COMPLIANCE & CUSTOMS CLEARANCE VERIFIER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Anchor className="w-6 h-6 text-emerald-400" />
              <span>Port Entry Compliance Checklist</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Ensure 100% regulatory compliance before vessel pilot boarding: customs, ballast water log, pilot ladder safety, IMDG dangerous goods, and health quarantine.
            </p>
          </div>

          {/* Port Dropdown Selector */}
          <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold whitespace-nowrap">Target Port:</span>
            <select
              value={selectedPortId}
              onChange={(e) => setSelectedPortId(e.target.value)}
              className="bg-slate-900 text-emerald-300 font-bold border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              {SOUTH_ASIA_PORTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.country})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="mt-5 p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>PORT ENTRY READINESS FOR {selectedPort.name.toUpperCase()}</span>
            </span>
            <span className="text-emerald-300 font-bold text-sm">{progressPct}% READY ({completedCount}/{totalCount} Completed)</span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                progressPct === 100
                  ? 'bg-emerald-500'
                  : progressPct >= 60
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
            <span>Pilot Station Channel: <strong className="text-cyan-300">{selectedPort.pilotChannel}</strong></span>
            <span>{progressPct === 100 ? '✓ ALL MANDATORY CLEARANCES VERIFIED' : '⚠ PENDING MANDATORY DOCUMENTS'}</span>
          </div>
        </div>
      </div>

      {/* Main Checklist View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        {/* Category Filters Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <div className="flex items-center space-x-1 overflow-x-auto text-xs font-bold">
            {['All', 'Customs & Immigration', 'Ballast Water & Environment', 'Harbor Pilot & Tugs', 'IMDG Dangerous Cargo', 'Maritime Health & Quarantine'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  filterCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Checklist Cards List */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                item.isCompleted
                  ? 'bg-slate-950/80 border-emerald-500/50 text-slate-200'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <button className="mt-0.5 text-emerald-400 shrink-0">
                    {item.isCompleted ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-600" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Doc ID: {item.documentCode}
                      </span>
                      {item.mandatory && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                          MANDATORY
                        </span>
                      )}
                    </div>

                    <h4 className={`font-bold text-sm ${item.isCompleted ? 'text-emerald-300 line-through opacity-80' : 'text-white'}`}>
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold border shrink-0 ${
                    item.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {item.isCompleted ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
