import React, { useState } from 'react';
import { ShieldAlert, CheckSquare, Square, AlertOctagon, Flame, Radio, LifeBuoy, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  criticalRole: 'MASTER' | 'CHIEF_ENGINEER' | 'OFFICER_OF_WATCH' | 'SECURITY_OFFICER';
}

export interface EmergencyChecklistCategory {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
}

const INITIAL_CHECKLISTS: EmergencyChecklistCategory[] = [
  {
    id: 'CHK-CITADEL',
    title: 'Citadel Lockdown & Crew Retreat Protocol',
    description: 'Immediate procedures when unauthorized hostile boarding is confirmed',
    items: [
      { id: 'c1', task: 'Sound Ship Emergency Alarm (Continuous Siren) & Broadcast Citadel Order', completed: true, criticalRole: 'MASTER' },
      { id: 'c2', task: 'Send VHF Channel 16 Mayday Broadcast & Trigger SSAS Distress Beacon', completed: true, criticalRole: 'OFFICER_OF_WATCH' },
      { id: 'c3', task: 'Shut down Main Engine from Bridge and transfer steering control to Citadel', completed: false, criticalRole: 'CHIEF_ENGINEER' },
      { id: 'c4', task: 'Verify all crew headcount inside Citadel & bolt heavy steel blast hatches', completed: false, criticalRole: 'SECURITY_OFFICER' },
      { id: 'c5', task: 'Activate satellite emergency phone link to UKMTO & MSCHOA response centers', completed: false, criticalRole: 'MASTER' }
    ]
  },
  {
    id: 'CHK-SUBSEA',
    title: 'GPS Jamming / Spoofing & Subsea Cable Interference',
    description: 'Navigation backup actions when GNSS satellite fixes become unreliable',
    items: [
      { id: 's1', task: 'Switch Primary ECDIS to Visual Radar Range & Bearing Fixes', completed: true, criticalRole: 'OFFICER_OF_WATCH' },
      { id: 's2', task: 'Engage Gyrocompass & Magnetic Compass manual dead-reckoning logging', completed: false, criticalRole: 'OFFICER_OF_WATCH' },
      { id: 's3', task: 'Log time and coordinates of GNSS anomaly; transmit report to NATO MARCOM', completed: false, criticalRole: 'MASTER' },
      { id: 's4', task: 'Inspect bathymetric depth sounder readings against paper nautical chart contours', completed: false, criticalRole: 'OFFICER_OF_WATCH' }
    ]
  },
  {
    id: 'CHK-SOPEP',
    title: 'SOPEP Oil Spill & Hazardous Pollution Containment',
    description: 'Initial response following hull breach or fuel tank leak incident',
    items: [
      { id: 'o1', task: 'Stop all fuel transfer operations & trip emergency fuel shut-off valves', completed: false, criticalRole: 'CHIEF_ENGINEER' },
      { id: 'o2', task: 'Deploy absorbent booms & spill cleanup kits at deck scuppers', completed: false, criticalRole: 'SECURITY_OFFICER' },
      { id: 'o3', task: 'Notify Coastal State Maritime Authority & Vessel Insurers (P&I Club)', completed: false, criticalRole: 'MASTER' }
    ]
  }
];

export const EmergencyChecklistsView: React.FC = () => {
  const [categories, setCategories] = useState<EmergencyChecklistCategory[]>(INITIAL_CHECKLISTS);
  const [selectedCatId, setSelectedCatId] = useState<string>('CHK-CITADEL');

  const selectedCategory = categories.find((c) => c.id === selectedCatId) || categories[0];

  const toggleItem = (catId: string, itemId: string) => {
    hapticEngine.trigger('click');
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.map((it) =>
            it.id === itemId ? { ...it, completed: !it.completed } : it
          )
        };
      })
    );
  };

  const completedCount = selectedCategory.items.filter((i) => i.completed).length;
  const progressPct = Math.round((completedCount / selectedCategory.items.length) * 100);

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
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Master & Shipboard Officer Emergency Preparedness Checklists</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Standard Operating Procedures (SOPs) for Citadel retreat, anti-jamming navigation, and oil spill containment
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold">
          MARITIME SAFETY SOPs
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCatId(c.id);
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCatId === c.id
                ? 'bg-amber-500 text-slate-950 font-black shadow'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-white">{selectedCategory.title}</span>
          <span className="text-amber-300 font-mono font-bold">
            {completedCount} / {selectedCategory.items.length} COMPLETED ({progressPct}%)
          </span>
        </div>

        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2">
        {selectedCategory.items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(selectedCategory.id, item.id)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
              item.completed
                ? 'bg-slate-950/40 border-emerald-900/50 text-slate-400 line-through'
                : 'bg-slate-950 border-slate-800 text-white hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {item.completed ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
              )}
              <span className="text-xs font-sans font-medium">{item.task}</span>
            </div>

            <span className="text-[8px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800 flex-shrink-0">
              ROLE: {item.criticalRole}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
