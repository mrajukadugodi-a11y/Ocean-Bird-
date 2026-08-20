import React, { useState } from 'react';
import { Navigation, Flame, Shield, Activity, Download, PlusCircle, CheckCircle2, Siren } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface EvasionLogEntry {
  id: string;
  timestamp: string;
  vesselName: string;
  maneuverType: 'Zig-Zag Evasion' | 'Speed Burst (21 Kts)' | 'Water Cannon Pressurization' | 'Citadel Lockout' | 'Warning Flare Discharge' | 'LRAD Sonic Pulse';
  threatDistanceNm: number;
  outcome: 'Threat Repelled' | 'Skiff Disengaged' | 'Escort Reached' | 'In Progress';
  notes: string;
}

const INITIAL_EVASION_LOGS: EvasionLogEntry[] = [
  {
    id: 'EVAS-2026-001',
    timestamp: '2026-07-30 02:48 UTC',
    vesselName: 'M/V Pacific Sentinel',
    maneuverType: 'Zig-Zag Evasion',
    threatDistanceNm: 0.9,
    outcome: 'Threat Repelled',
    notes: 'Executed 15° hard port/starboard helm turns into skiff wake. Created heavy bow wave washing over skiff.'
  },
  {
    id: 'EVAS-2026-002',
    timestamp: '2026-07-28 14:25 UTC',
    vesselName: 'M/T Arabian Apex',
    maneuverType: 'Warning Flare Discharge',
    threatDistanceNm: 0.6,
    outcome: 'Skiff Disengaged',
    notes: 'PCASP guards discharged 2 red rocket flares across skiff bow. Perpetrators reversed outboard engine.'
  },
  {
    id: 'EVAS-2026-003',
    timestamp: '2026-07-20 08:22 UTC',
    vesselName: 'M/V Malacca Star',
    maneuverType: 'LRAD Sonic Pulse',
    threatDistanceNm: 1.2,
    outcome: 'Threat Repelled',
    notes: '160 dB focused acoustic beam directed at oncoming skiff. Occupants covered ears and aborted approach.'
  },
  {
    id: 'EVAS-2026-004',
    timestamp: '2026-07-15 22:10 UTC',
    vesselName: 'M/T Somali Pride',
    maneuverType: 'Citadel Lockout',
    threatDistanceNm: 0.3,
    outcome: 'Escort Reached',
    notes: 'All 22 crew members secured inside armored Citadel within 4 minutes. French Naval frigate arrived at scene.'
  }
];

export const PiracyEvasionLogsView: React.FC = () => {
  const [logs, setLogs] = useState<EvasionLogEntry[]>(INITIAL_EVASION_LOGS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newManeuver, setNewManeuver] = useState<EvasionLogEntry['maneuverType']>('Zig-Zag Evasion');
  const [newDistance, setNewDistance] = useState<number>(1.2);
  const [newNotes, setNewNotes] = useState<string>('');

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    hapticEngine.trigger('success');

    const newLog: EvasionLogEntry = {
      id: `EVAS-2026-00${logs.length + 1}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      vesselName: 'M/V Sentinel Current Vessel',
      maneuverType: newManeuver,
      threatDistanceNm: newDistance,
      outcome: 'Threat Repelled',
      notes: newNotes || 'Executed active anti-piracy countermeasure as per BMP5 guidelines.'
    };

    setLogs([newLog, ...logs]);
    setShowAddModal(false);
    setNewNotes('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span>Vessel Piracy Tactical Evasion Audit Logbook</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Historical log of evasive helm maneuvers, water monitor activations, and non-lethal defense engagements
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
            <span>LOG NEW EVASION ACTION</span>
          </button>
        </div>
      </div>

      {/* Add Log Modal / Inline Form */}
      {showAddModal && (
        <form onSubmit={handleAddLog} className="bg-slate-950 border border-cyan-500/50 p-4 rounded-2xl space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-cyan-300">RECORD NEW ANTI-PIRACY COUNTERMEASURE ACTION</span>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              CANCEL
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Maneuver / Action Type</label>
              <select
                value={newManeuver}
                onChange={(e) => setNewManeuver(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value="Zig-Zag Evasion">Zig-Zag Helm Evasion</option>
                <option value="Speed Burst (21 Kts)">Speed Burst (21+ Kts)</option>
                <option value="Water Cannon Pressurization">Water Cannon Pressurization</option>
                <option value="Citadel Lockout">Citadel Lockout Protocol</option>
                <option value="Warning Flare Discharge">Warning Flare Discharge</option>
                <option value="LRAD Sonic Pulse">LRAD Sonic Pulse Emission</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Threat Distance (NM)</label>
              <input
                type="number"
                step="0.1"
                value={newDistance}
                onChange={(e) => setNewDistance(parseFloat(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Bridge & Duty Officer Remarks</label>
            <input
              type="text"
              placeholder="e.g., Master instructed 15 knots speed burst and directed water hoses over port side."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SAVE EVASION AUDIT LOG</span>
          </button>
        </form>
      )}

      {/* Logs Table */}
      <div className="space-y-2.5">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-cyan-300">{log.id}</span>
                <span className="bg-slate-900 text-slate-300 border border-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {log.maneuverType}
                </span>
                <span className="text-[10px] text-slate-400">• Distance: {log.threatDistanceNm} NM</span>
              </div>
              <p className="text-slate-300 text-[11px] font-sans">{log.notes}</p>
            </div>

            <div className="flex items-center space-x-3 text-right shrink-0">
              <div className="space-y-0.5">
                <span className="text-emerald-400 font-bold block text-[10px]">{log.outcome}</span>
                <span className="text-[9px] text-slate-500 block">{log.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
