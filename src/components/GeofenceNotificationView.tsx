import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Bell,
  Siren,
  MapPin,
  Compass,
  Radio,
  Plus,
  Trash2,
  Volume2,
  VolumeX,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Layers,
  Settings,
  Flame,
  RadioTower,
  Play,
  RotateCcw
} from 'lucide-react';

interface GeofenceZone {
  id: string;
  name: string;
  category: 'ECA Low-Sulphur' | 'High Risk Piracy' | 'Marine Sanctuary' | 'Port Anchorage' | 'Airspace Restricted';
  centerLat: number;
  centerLon: number;
  radiusNM: number;
  severity: 'CRITICAL' | 'WARNING' | 'ADVISORY';
  active: boolean;
  color: string;
  maxSpeedKts?: number;
}

interface GeofenceEventLog {
  id: string;
  timestamp: string;
  vesselName: string;
  vesselImo: string;
  zoneName: string;
  eventType: 'ENTERED_ZONE' | 'EXITED_ZONE' | 'SPEED_BREACH' | 'SULPHUR_LIMIT_VIOLATION';
  severity: 'CRITICAL' | 'WARNING' | 'ADVISORY';
  coordinates: string;
  speedKts: number;
}

const INITIAL_GEOFENCES: GeofenceZone[] = [
  {
    id: 'GF-01',
    name: 'North Bay of Bengal ECA (0.10% Sulphur Cap)',
    category: 'ECA Low-Sulphur',
    centerLat: 21.25,
    centerLon: 89.4,
    radiusNM: 45,
    severity: 'WARNING',
    active: true,
    color: '#38bdf8',
    maxSpeedKts: 18
  },
  {
    id: 'GF-02',
    name: 'Somali / Bab-el-Mandeb Piracy HRA Zone',
    category: 'High Risk Piracy',
    centerLat: 12.5,
    centerLon: 43.8,
    radiusNM: 120,
    severity: 'CRITICAL',
    active: true,
    color: '#f43f5e'
  },
  {
    id: 'GF-03',
    name: 'Lakshadweep Coral Reef Marine Sanctuary',
    category: 'Marine Sanctuary',
    centerLat: 10.56,
    centerLon: 72.64,
    radiusNM: 30,
    severity: 'ADVISORY',
    active: true,
    color: '#10b981',
    maxSpeedKts: 10
  },
  {
    id: 'GF-04',
    name: 'Colombo Harbour Outer Anchorage Geofence',
    category: 'Port Anchorage',
    centerLat: 6.95,
    centerLon: 79.84,
    radiusNM: 12,
    severity: 'WARNING',
    active: true,
    color: '#f59e0b',
    maxSpeedKts: 6
  }
];

const INITIAL_LOGS: GeofenceEventLog[] = [
  {
    id: 'EVT-1001',
    timestamp: '2026-08-02 11:20:15 UTC',
    vesselName: 'M/V Ocean Eagle Monarch',
    vesselImo: 'IMO 9845120',
    zoneName: 'Colombo Harbour Outer Anchorage Geofence',
    eventType: 'ENTERED_ZONE',
    severity: 'WARNING',
    coordinates: '6.9500° N, 79.8400° E',
    speedKts: 5.8
  },
  {
    id: 'EVT-1002',
    timestamp: '2026-08-02 10:45:00 UTC',
    vesselName: 'S/T Bay Sentinel',
    vesselImo: 'IMO 9732119',
    zoneName: 'North Bay of Bengal ECA (0.10% Sulphur Cap)',
    eventType: 'SULPHUR_LIMIT_VIOLATION',
    severity: 'CRITICAL',
    coordinates: '21.1200° N, 89.3100° E',
    speedKts: 13.2
  }
];

export const GeofenceNotificationView: React.FC = () => {
  const [geofences, setGeofences] = useState<GeofenceZone[]>(INITIAL_GEOFENCES);
  const [logs, setLogs] = useState<GeofenceEventLog[]>(INITIAL_LOGS);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [simulatedVesselSpeed, setSimulatedVesselSpeed] = useState(14.5);
  const [simulatedLat, setSimulatedLat] = useState(6.96);
  const [simulatedLon, setSimulatedLon] = useState(79.85);
  const [isSimulatingBreach, setIsSimulatingBreach] = useState(false);
  const [activeAlertSiren, setActiveAlertSiren] = useState<GeofenceEventLog | null>(null);

  // New Geofence Form State
  const [newZoneName, setNewZoneName] = useState('');
  const [newCategory, setNewCategory] = useState<GeofenceZone['category']>('ECA Low-Sulphur');
  const [newLat, setNewLat] = useState('15.0');
  const [newLon, setNewLon] = useState('80.0');
  const [newRadius, setNewRadius] = useState('25');
  const [newSeverity, setNewSeverity] = useState<GeofenceZone['severity']>('WARNING');

  // Trigger Geofence Breach Simulation
  const handleTriggerBreach = () => {
    setIsSimulatingBreach(true);
    setTimeout(() => {
      const timeNow = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      const newEvt: GeofenceEventLog = {
        id: `EVT-${Date.now()}`,
        timestamp: timeNow,
        vesselName: 'M/V Ocean Eagle Monarch',
        vesselImo: 'IMO 9845120',
        zoneName: 'Colombo Harbour Outer Anchorage Geofence',
        eventType: simulatedVesselSpeed > 10 ? 'SPEED_BREACH' : 'ENTERED_ZONE',
        severity: 'CRITICAL',
        coordinates: `${simulatedLat.toFixed(4)}° N, ${simulatedLon.toFixed(4)}° E`,
        speedKts: simulatedVesselSpeed
      };

      setLogs((prev) => [newEvt, ...prev]);
      setActiveAlertSiren(newEvt);
      setIsSimulatingBreach(false);
    }, 1000);
  };

  const handleCreateGeofence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;

    const createdZone: GeofenceZone = {
      id: `GF-${Date.now().toString().slice(-3)}`,
      name: newZoneName,
      category: newCategory,
      centerLat: parseFloat(newLat) || 12.0,
      centerLon: parseFloat(newLon) || 80.0,
      radiusNM: parseFloat(newRadius) || 20,
      severity: newSeverity,
      active: true,
      color: newSeverity === 'CRITICAL' ? '#f43f5e' : newSeverity === 'WARNING' ? '#f59e0b' : '#38bdf8'
    };

    setGeofences((prev) => [...prev, createdZone]);
    setNewZoneName('');
  };

  const toggleGeofenceActive = (id: string) => {
    setGeofences((prev) =>
      prev.map((g) => (g.id === id ? { ...g, active: !g.active } : g))
    );
  };

  const deleteGeofence = (id: string) => {
    setGeofences((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-rose-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
              SECTOR MONITORING & GEOFENCING
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              AUTOMATED SIREN ENGINE
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center space-x-2">
            <ShieldAlert className="w-7 h-7 text-rose-400" />
            <span>Geofence Boundary & Live Breach Notification</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Set polygon and circular maritime boundaries for ECA low-sulphur regulations, high-risk piracy zones, restricted anchorages, and receive instant telemetry breach notifications.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 font-mono text-xs ${
              isAudioMuted
                ? 'bg-slate-900 text-slate-400 border-slate-800'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-rose-400 animate-pulse" />}
            <span>{isAudioMuted ? 'AUDIO MUTED' : 'SIREN AUDIO READY'}</span>
          </button>
        </div>
      </div>

      {/* Active Siren Banner Modal if breach detected */}
      {activeAlertSiren && (
        <div className="bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 border-2 border-rose-500 p-5 rounded-2xl text-white shadow-2xl animate-bounce space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Siren className="w-7 h-7 text-rose-400 animate-spin" />
              <div>
                <span className="text-[10px] bg-rose-500 text-slate-950 font-black px-2 py-0.5 rounded uppercase">
                  CRITICAL GEOFENCE BREACH DETECTED
                </span>
                <h3 className="text-lg font-black text-white">{activeAlertSiren.zoneName}</h3>
              </div>
            </div>
            <button
              onClick={() => setActiveAlertSiren(null)}
              className="px-3 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-bold"
            >
              DISMISS SIREN
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-rose-500/30">
            <div>
              <span className="text-[10px] text-slate-400 block">VESSEL</span>
              <strong>{activeAlertSiren.vesselName}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">EVENT TYPE</span>
              <strong className="text-amber-300">{activeAlertSiren.eventType}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">COORDINATES</span>
              <strong>{activeAlertSiren.coordinates}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">SPEED</span>
              <strong className="text-rose-300">{activeAlertSiren.speedKts} kts</strong>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Configured Geofences & Simulator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Geofence Breach Simulator Console */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Radio className="w-5 h-5 text-sky-400 animate-pulse" />
                <h3 className="text-base font-bold text-white">Live Geofence Telemetry Breach Simulator</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                SIMULATOR ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <label className="text-[10px] text-slate-400 block">VESSEL SPEED (KTS)</label>
                <input
                  type="number"
                  value={simulatedVesselSpeed}
                  onChange={(e) => setSimulatedVesselSpeed(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white font-bold"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <label className="text-[10px] text-slate-400 block">SIMULATED LATITUDE</label>
                <input
                  type="number"
                  step="0.01"
                  value={simulatedLat}
                  onChange={(e) => setSimulatedLat(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white font-bold"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <label className="text-[10px] text-slate-400 block">SIMULATED LONGITUDE</label>
                <input
                  type="number"
                  step="0.01"
                  value={simulatedLon}
                  onChange={(e) => setSimulatedLon(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white font-bold"
                />
              </div>
            </div>

            <button
              onClick={handleTriggerBreach}
              disabled={isSimulatingBreach}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isSimulatingBreach ? 'SIMULATING BREACH INCIDENT...' : 'TRIGGER SIMULATED GEOFENCE BREACH ALERT'}</span>
            </button>
          </div>

          {/* Configured Zones List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-sky-400" />
              <span>Active Configured Geofence Boundaries ({geofences.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {geofences.map((g) => (
                <div
                  key={g.id}
                  className={`p-4 rounded-xl border transition-all space-y-3 ${
                    g.active
                      ? 'bg-slate-950/80 border-slate-800 hover:border-sky-500/40'
                      : 'bg-slate-950/30 border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className="text-[9px] font-black uppercase px-2 py-0.5 rounded border block mb-1"
                        style={{ color: g.color, borderColor: `${g.color}40`, backgroundColor: `${g.color}15` }}
                      >
                        {g.category}
                      </span>
                      <h4 className="font-bold text-white text-sm">{g.name}</h4>
                    </div>

                    <button
                      onClick={() => toggleGeofenceActive(g.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        g.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {g.active ? 'ACTIVE' : 'MUTED'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                    <div>
                      <span className="block text-[9px] text-slate-500">CENTER COORDS</span>
                      <span>{g.centerLat}° N, {g.centerLon}° E</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-500">RADIUS</span>
                      <span className="text-sky-300 font-bold">{g.radiusNM} NM</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">ID: {g.id}</span>
                    <button
                      onClick={() => deleteGeofence(g.id)}
                      className="text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Create Zone & Event Log */}
        <div className="space-y-6">
          {/* Create Custom Geofence */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              <span>Create New Geofence Zone</span>
            </h3>

            <form onSubmit={handleCreateGeofence} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">ZONE NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Malacca Strait ECA Speed Boundary"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">CATEGORY</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  >
                    <option value="ECA Low-Sulphur">ECA Low-Sulphur</option>
                    <option value="High Risk Piracy">High Risk Piracy</option>
                    <option value="Marine Sanctuary">Marine Sanctuary</option>
                    <option value="Port Anchorage">Port Anchorage</option>
                    <option value="Airspace Restricted">Airspace Restricted</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">RADIUS (NM)</label>
                  <input
                    type="number"
                    value={newRadius}
                    onChange={(e) => setNewRadius(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">CENTER LAT</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newLat}
                    onChange={(e) => setNewLat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">CENTER LON</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newLon}
                    onChange={(e) => setNewLon(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl transition-all"
              >
                ADD GEOFENCE ZONE
              </button>
            </form>
          </div>

          {/* Breach Event Log */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Breach Event Audit Log ({logs.length})</span>
            </h3>

            <div className="space-y-3 font-mono text-xs max-h-80 overflow-y-auto pr-1">
              {logs.map((evt) => (
                <div key={evt.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">{evt.timestamp}</span>
                    <span className="text-amber-400 font-bold">{evt.eventType}</span>
                  </div>
                  <h5 className="font-bold text-white text-xs">{evt.zoneName}</h5>
                  <p className="text-[11px] text-slate-300">
                    {evt.vesselName} ({evt.vesselImo}) at {evt.coordinates} • {evt.speedKts} kts
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
