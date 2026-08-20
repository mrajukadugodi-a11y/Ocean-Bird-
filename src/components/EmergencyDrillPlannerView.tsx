import React, { useState } from 'react';
import {
  Siren,
  Flame,
  LifeBuoy,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck,
  Plus,
  Trash2,
  AlertTriangle,
  ClipboardList
} from 'lucide-react';

export interface EmergencyDrill {
  id: string;
  drillType: 'FIRE_DRILL' | 'ABANDON_SHIP' | 'MAN_OVERBOARD' | 'ENCLOSED_SPACE' | 'PIRACY_SECURITY';
  scheduledDate: string;
  location: string;
  personnelRequired: string;
  solasRegulation: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'OVERDUE';
  notes: string;
}

const INITIAL_DRILLS: EmergencyDrill[] = [
  {
    id: 'DRILL-01',
    scheduledDate: '2026-08-02 10:00',
    drillType: 'FIRE_DRILL',
    location: 'Engine Room Workshop & Purifier Room',
    personnelRequired: 'All Crew & Emergency Response Squad A',
    solasRegulation: 'SOLAS III / Reg. 19.3.2 (Monthly Fire Drill)',
    status: 'SCHEDULED',
    notes: 'Simulate oil purifier room electrical fire. Test quick-closing fuel valves and CO2 flooding alarm dampers.'
  },
  {
    id: 'DRILL-02',
    scheduledDate: '2026-08-05 14:30',
    drillType: 'ABANDON_SHIP',
    location: 'Port & Starboard Lifeboat Deck',
    personnelRequired: 'All Hands Onboard',
    solasRegulation: 'SOLAS III / Reg. 19.3.3 (Monthly Lifeboat Muster)',
    status: 'SCHEDULED',
    notes: 'Muster at station with immersion suits and lifejackets. Swing out lifeboat #1 on davits.'
  },
  {
    id: 'DRILL-03',
    scheduledDate: '2026-07-28 09:00',
    drillType: 'MAN_OVERBOARD',
    location: 'Aft Poop Deck & Rescue Boat',
    personnelRequired: 'Bridge Watch & Rescue Boat Crew',
    solasRegulation: 'SOLAS III / Reg. 19.4',
    status: 'COMPLETED',
    notes: 'Oscar dummy dropped. Williamson turn executed. Rescue boat lowered and retrieved in 7.5 minutes.'
  },
  {
    id: 'DRILL-04',
    scheduledDate: '2026-08-10 11:00',
    drillType: 'ENCLOSED_SPACE',
    location: 'Ballast Tank #2 Starboard',
    personnelRequired: 'Deck Crew & Rescue Team',
    solasRegulation: 'SOLAS III / Reg. 19.3.6 (Bi-Monthly Enclosed Space Entry)',
    status: 'SCHEDULED',
    notes: 'Test gas detector multi-sensor, ventilation fan setup, and tripod hoist recovery.'
  }
];

export const EmergencyDrillPlannerView: React.FC = () => {
  const [drills, setDrills] = useState<EmergencyDrill[]>(INITIAL_DRILLS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Drill Form State
  const [drillType, setDrillType] = useState<EmergencyDrill['drillType']>('FIRE_DRILL');
  const [scheduledDate, setScheduledDate] = useState('2026-08-15 10:00');
  const [location, setLocation] = useState('Main Deck & Cargo Hold #1');
  const [personnel, setPersonnel] = useState('All Crew & Duty Officers');
  const [notes, setNotes] = useState('Conduct full muster and emergency equipment check.');

  const handleAddDrill = (e: React.FormEvent) => {
    e.preventDefault();
    const newDrill: EmergencyDrill = {
      id: `DRILL-0${drills.length + 1}`,
      drillType,
      scheduledDate,
      location,
      personnelRequired: personnel,
      solasRegulation: 'SOLAS III / Reg. 19 SOLAS Safety Compliance',
      status: 'SCHEDULED',
      notes
    };
    setDrills([...drills, newDrill]);
    setShowAddModal(false);
  };

  const handleToggleCompleted = (id: string) => {
    setDrills(
      drills.map((d) =>
        d.id === id ? { ...d, status: d.status === 'COMPLETED' ? 'SCHEDULED' : 'COMPLETED' } : d
      )
    );
  };

  const handleDeleteDrill = (id: string) => {
    setDrills(drills.filter((d) => d.id !== id));
  };

  return (
    <div id="emergency-drill-planner-view" className="space-y-6 font-mono">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>IMO SOLAS CHAPTER III REGULATION 19 SAFETY DRILL SCHEDULER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              <span>Emergency Drill & Safety Compliance Planner</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Plan, execute, and document mandatory SOLAS emergency safety drills: Fire Fighting, Abandon Ship, Man Overboard (MOB), and Enclosed Space Entry.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-xl flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>SCHEDULE SOLAS SAFETY DRILL</span>
          </button>
        </div>
      </div>

      {/* Add Drill Form Modal */}
      {showAddModal && (
        <form
          onSubmit={handleAddDrill}
          className="bg-slate-900 border border-rose-500/50 rounded-2xl p-5 shadow-2xl space-y-4 text-xs animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <strong className="text-white text-sm">Schedule Emergency Drill</strong>
            <span className="text-rose-400">SOLAS CHAPTER III</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">DRILL TYPE</label>
              <select
                value={drillType}
                onChange={(e) => setDrillType(e.target.value as EmergencyDrill['drillType'])}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
              >
                <option value="FIRE_DRILL">FIRE DRILL</option>
                <option value="ABANDON_SHIP">ABANDON SHIP</option>
                <option value="MAN_OVERBOARD">MAN OVERBOARD (MOB)</option>
                <option value="ENCLOSED_SPACE">ENCLOSED SPACE ENTRY</option>
                <option value="PIRACY_SECURITY">PIRACY / CITADEL SECURITY</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">SCHEDULED DATE & TIME</label>
              <input
                type="text"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">LOCATION / STATION</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">DRILL PROCEDURES / SCENARIO NOTES</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
            >
              SAVE SOLAS DRILL
            </button>
          </div>
        </form>
      )}

      {/* Drills List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drills.map((drill) => {
          const isCompleted = drill.status === 'COMPLETED';

          return (
            <div
              key={drill.id}
              className={`p-5 rounded-2xl border space-y-3 shadow-xl transition-all ${
                isCompleted
                  ? 'bg-slate-900/60 border-emerald-500/40 opacity-80'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-rose-400 font-bold uppercase">
                  {drill.drillType.replace('_', ' ')}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleCompleted(drill.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-400'
                    }`}
                  >
                    {isCompleted ? '✅ DRILL COMPLETED' : 'MARK AS DONE'}
                  </button>

                  <button
                    onClick={() => handleDeleteDrill(drill.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">SCHEDULED TIME</span>
                  <strong className="text-white">{drill.scheduledDate}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">LOCATION</span>
                  <strong className="text-amber-300">{drill.location}</strong>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl space-y-1">
                <span className="text-[10px] text-rose-400 font-bold block">{drill.solasRegulation}</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{drill.notes}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
