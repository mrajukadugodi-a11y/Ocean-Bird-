import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, FileText, Plus, CheckCircle2, Camera, Thermometer, Zap, Trash2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CargoDamageLog {
  id: string;
  containerId: string;
  damageType: 'SEAWATER_INGRESS' | 'PHYSICAL_IMPACT' | 'REEFER_TEMP_SPIKE' | 'PIRACY_SECURITY_BREACH';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  gForcePeak: string;
  locationDetails: string;
  timestamp: string;
  status: 'CLAIM_FILED' | 'INSPECTION_PENDING' | 'RESOLVED';
}

const INITIAL_LOGS: CargoDamageLog[] = [
  {
    id: 'LOG-8801',
    containerId: 'MSCU-948201-4 (Reefer 40ft)',
    damageType: 'REEFER_TEMP_SPIKE',
    severity: 'HIGH',
    gForcePeak: '1.2 G',
    locationDetails: 'Hold 3, Slot 12B - Red Sea Transit',
    timestamp: '2026-08-06 14:22 UTC',
    status: 'INSPECTION_PENDING'
  },
  {
    id: 'LOG-8802',
    containerId: 'TGHU-301948-2 (Dry Van 20ft)',
    damageType: 'PIRACY_SECURITY_BREACH',
    severity: 'HIGH',
    gForcePeak: '3.8 G (Skiff Impact)',
    locationDetails: 'Starboard Main Deck - Gulf of Aden',
    timestamp: '2026-08-05 08:15 UTC',
    status: 'CLAIM_FILED'
  }
];

export const CargoDamageLoggerView: React.FC = () => {
  const [logs, setLogs] = useState<CargoDamageLog[]>(INITIAL_LOGS);
  const [containerInput, setContainerInput] = useState<string>('');
  const [damageType, setDamageType] = useState<'SEAWATER_INGRESS' | 'PHYSICAL_IMPACT' | 'REEFER_TEMP_SPIKE' | 'PIRACY_SECURITY_BREACH'>('PIRACY_SECURITY_BREACH');

  const handleAddLog = () => {
    if (!containerInput.trim()) return;
    hapticEngine.trigger('success');
    const newLog: CargoDamageLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      containerId: containerInput,
      damageType: damageType,
      severity: 'HIGH',
      gForcePeak: '2.4 G',
      locationDetails: 'Deck Slot A-14 (Piracy Encounter Zone)',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      status: 'INSPECTION_PENDING'
    };
    setLogs((prev) => [newLog, ...prev]);
    setContainerInput('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Maritime Cargo Damage, G-Force Shock & Piracy Incident Logger</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Log container damage reports, sensor shock peak telemetry, seawater ingress, and insurance claim auditing
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold">
          {logs.length} DAMAGE INCIDENTS LOGGED
        </span>
      </div>

      {/* New Log Input Form */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 font-sans">
        <span className="text-xs font-bold text-white font-mono block border-b border-slate-900 pb-2">Record New Container Damage Incident</span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 font-mono block mb-1">CONTAINER / UNIT ID:</label>
            <input
              type="text"
              value={containerInput}
              onChange={(e) => setContainerInput(e.target.value)}
              placeholder="e.g. MAEU-884019-1"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 font-mono block mb-1">DAMAGE CLASSIFICATION:</label>
            <select
              value={damageType}
              onChange={(e) => setDamageType(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono"
            >
              <option value="PIRACY_SECURITY_BREACH">Piracy Security Breach / Boarding</option>
              <option value="PHYSICAL_IMPACT">Heavy Sea Physical Impact / Collision</option>
              <option value="REEFER_TEMP_SPIKE">Reefer Temperature Thermal Deviation</option>
              <option value="SEAWATER_INGRESS">Hold Water Ingress / Flooding</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleAddLog}
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-1 shadow transition-all font-mono"
            >
              <Plus className="w-4 h-4" />
              <span>LOG DAMAGE REPORT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table / Cards */}
      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[9px] text-cyan-400 font-bold block">{log.id} • {log.timestamp}</span>
                <h4 className="text-xs font-bold text-white">{log.containerId}</h4>
              </div>
              <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[8px] font-bold px-2 py-0.5 rounded">
                {log.damageType.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-sans">
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 font-mono">
                <span className="text-slate-500 block">Peak Shock Sensor:</span>
                <span className="text-amber-400 font-bold">{log.gForcePeak}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 font-mono">
                <span className="text-slate-500 block">Location Spec:</span>
                <span className="text-slate-200 font-bold">{log.locationDetails}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 font-mono">
                <span className="text-slate-500 block">Insurance Claim Status:</span>
                <span className="text-cyan-300 font-bold">{log.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
