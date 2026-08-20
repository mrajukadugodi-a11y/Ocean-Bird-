import React, { useState } from 'react';
import { Activity, ShieldCheck, Heart, AlertTriangle, CheckCircle2, Ship, Thermometer, Droplet, Battery, Flame, RefreshCw, FileText, Download } from 'lucide-react';

export interface HealthLogEntry {
  id: string;
  timestamp: string;
  vesselName: string;
  subsystem: 'Main Engine' | 'Hull Integrity' | 'Ballast & Bilge' | 'Electrical Bus' | 'Fire Suppression';
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  metricValue: string;
  inspectorName: string;
  notes: string;
}

export const INITIAL_HEALTH_LOGS: HealthLogEntry[] = [
  {
    id: 'HLOG-001',
    timestamp: '2026-08-04 00:50 UTC',
    vesselName: 'MV DESH SHANTI',
    subsystem: 'Main Engine',
    status: 'HEALTHY',
    metricValue: 'Exhaust Temp: 385°C • RPM: 104',
    inspectorName: 'Chief Eng. K. Sharma',
    notes: 'Main engine cylinder pressures balanced across all 8 units. Fuel viscosity 13.8 cSt.'
  },
  {
    id: 'HLOG-002',
    timestamp: '2026-08-03 21:15 UTC',
    vesselName: 'EVER GIVEN II',
    subsystem: 'Ballast & Bilge',
    status: 'WARNING',
    metricValue: 'Hold #4 Bilge Well Level: 0.8m',
    inspectorName: '2nd Officer A. Tan',
    notes: 'Bilge high level alarm triggered in hold #4. Bilge pump #2 auto-started and evacuated water.'
  },
  {
    id: 'HLOG-003',
    timestamp: '2026-08-03 18:30 UTC',
    vesselName: 'BANGLADESH SAMUDRA',
    subsystem: 'Hull Integrity',
    status: 'HEALTHY',
    metricValue: 'Midship Strain Gauge: 42 MPa',
    inspectorName: 'Chief Mate R. Rahman',
    notes: 'Hull stress during Capesize bulk loading within 65% maximum allowable bending moment.'
  },
  {
    id: 'HLOG-004',
    timestamp: '2026-08-03 14:00 UTC',
    vesselName: 'CORDELIA EMPRESS',
    subsystem: 'Electrical Bus',
    status: 'HEALTHY',
    metricValue: '440V Main Switchboard: 60.0 Hz',
    inspectorName: 'Electro-Technical Officer V. Nair',
    notes: 'Emergency generator auto-start test passed successfully in 8.2 seconds.'
  }
];

export const VesselsHealthLogsView: React.FC = () => {
  const [logs, setLogs] = useState<HealthLogEntry[]>(INITIAL_HEALTH_LOGS);
  const [selectedVessel, setSelectedVessel] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Form state for creating new health log entry
  const [newVessel, setNewVessel] = useState<string>('MV DESH SHANTI');
  const [newSubsystem, setNewSubsystem] = useState<HealthLogEntry['subsystem']>('Main Engine');
  const [newStatus, setNewStatus] = useState<HealthLogEntry['status']>('HEALTHY');
  const [newMetric, setNewMetric] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const filteredLogs = logs.filter((log) => {
    const matchesVessel = selectedVessel === 'ALL' || log.vesselName === selectedVessel;
    const matchesStatus = selectedStatus === 'ALL' || log.status === selectedStatus;
    return matchesVessel && matchesStatus;
  });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMetric || !newNotes) return;

    const entry: HealthLogEntry = {
      id: `HLOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      vesselName: newVessel,
      subsystem: newSubsystem,
      status: newStatus,
      metricValue: newMetric,
      inspectorName: 'Duty Officer Log',
      notes: newNotes
    };

    setLogs([entry, ...logs]);
    setNewMetric('');
    setNewNotes('');
    setShowAddModal(false);
  };

  return (
    <div id="vessels-health-logs-view" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>OFFICIAL SHIP LOGBOOK & SUBSYSTEM DIAGNOSTIC AUDIT LOG</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Activity className="w-6 h-6 text-rose-400" />
            <span>Vessels Health & Subsystem Logbook</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time hull strain, main engine temperatures, bilge water alarms, ballast water tanks, and electrical bus diagnostics logbook.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-slate-950 font-black font-mono text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-[1.02]"
        >
          <FileText className="w-4 h-4 text-slate-950" />
          <span>+ ADD NEW LOGBOOK ENTRY</span>
        </button>
      </div>

      {/* Add Log Modal / Form Inline */}
      {showAddModal && (
        <form onSubmit={handleAddLog} className="bg-slate-950 p-5 rounded-2xl border border-rose-500/40 space-y-4 font-mono text-xs">
          <h3 className="font-bold text-white uppercase text-xs">Record Subsystem Health Entry:</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Vessel:</label>
              <select
                value={newVessel}
                onChange={(e) => setNewVessel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs"
              >
                <option value="MV DESH SHANTI">MV DESH SHANTI</option>
                <option value="EVER GIVEN II">EVER GIVEN II</option>
                <option value="BANGLADESH SAMUDRA">BANGLADESH SAMUDRA</option>
                <option value="CORDELIA EMPRESS">CORDELIA EMPRESS</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Subsystem:</label>
              <select
                value={newSubsystem}
                onChange={(e) => setNewSubsystem(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs"
              >
                <option value="Main Engine">Main Engine</option>
                <option value="Hull Integrity">Hull Integrity</option>
                <option value="Ballast & Bilge">Ballast & Bilge</option>
                <option value="Electrical Bus">Electrical Bus</option>
                <option value="Fire Suppression">Fire Suppression</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Status Grade:</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs"
              >
                <option value="HEALTHY">HEALTHY</option>
                <option value="WARNING">WARNING</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Telemetry Metrics:</label>
              <input
                type="text"
                value={newMetric}
                onChange={(e) => setNewMetric(e.target.value)}
                placeholder="e.g. Temp: 410°C, Pressure: 12 bar"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Inspector Notes:</label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="e.g. Replaced oil filter, nominal vibration."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-500 text-slate-950 font-black"
            >
              COMMIT ENTRY TO LOGBOOK
            </button>
          </div>
        </form>
      )}

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        <span className="text-slate-400 text-[10px] uppercase font-bold self-center mr-2">Filter Logs:</span>
        {['ALL', 'HEALTHY', 'WARNING', 'CRITICAL'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedStatus === st
                ? 'bg-rose-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Health Logbook Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const isCritical = log.status === 'CRITICAL';
            const isWarning = log.status === 'WARNING';

            return (
              <div
                key={log.id}
                className={`p-4 rounded-2xl border space-y-2 transition-all ${
                  isCritical
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : isWarning
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <Ship className="w-4 h-4 text-cyan-400" />
                    <strong className="text-white font-bold text-xs">{log.vesselName}</strong>
                    <span className="text-slate-500">•</span>
                    <span className="text-sky-400 font-bold text-[11px]">{log.subsystem}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-[10px]">
                    <span className="text-slate-400">{log.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-amber-300 font-bold block">{log.metricValue}</span>
                  <p className="text-slate-300 text-xs mt-1">{log.notes}</p>
                </div>

                <div className="text-[10px] text-slate-500 flex justify-between pt-1">
                  <span>Inspector: {log.inspectorName}</span>
                  <span>ID: {log.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
