import React, { useState } from 'react';
import {
  Radio,
  Send,
  Video,
  BatteryCharging,
  Compass,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Ship,
  MapPin,
  Box,
  Wifi,
  Eye
} from 'lucide-react';

export interface DroneUnit {
  id: string;
  callsign: string;
  type: 'Hull Survey Ultra-Scanner' | 'Anchorage Light Cargo Deliverer' | 'Perimeter Security Radar' | 'Oil Spill Multi-Spectral';
  batteryPct: number;
  altitudeMeters: number;
  speedKts: number;
  status: 'In Flight (Mission Active)' | 'Standby (Dock Station)' | 'Returning to Base';
  targetVessel: string;
  hdVideoActive: boolean;
}

export const PortDroneSupportView: React.FC = () => {
  const [selectedDroneId, setSelectedDroneId] = useState('DRONE-ALPHA-01');
  const [isDispatching, setIsDispatching] = useState(false);
  const [streamActive, setStreamActive] = useState(true);

  const DRONES: DroneUnit[] = [
    {
      id: 'DRONE-ALPHA-01',
      callsign: 'SkyScan-X1 Hull Surveyor',
      type: 'Hull Survey Ultra-Scanner',
      batteryPct: 88,
      altitudeMeters: 45,
      speedKts: 18,
      status: 'In Flight (Mission Active)',
      targetVessel: 'MV OceanBird Explorer (IMO 9842109)',
      hdVideoActive: true
    },
    {
      id: 'DRONE-BETA-02',
      callsign: 'AeroCargo-02 Express Deliverer',
      type: 'Anchorage Light Cargo Deliverer',
      batteryPct: 94,
      altitudeMeters: 120,
      speedKts: 32,
      status: 'In Flight (Mission Active)',
      targetVessel: 'SS Northern Star Tanker',
      hdVideoActive: true
    },
    {
      id: 'DRONE-GAMMA-03',
      callsign: 'Sentinel-03 Harbor Watch',
      type: 'Perimeter Security Radar',
      batteryPct: 100,
      altitudeMeters: 0,
      speedKts: 0,
      status: 'Standby (Dock Station)',
      targetVessel: 'Pasir Panjang Terminal Berth 4',
      hdVideoActive: false
    }
  ];

  const currentDrone = DRONES.find(d => d.id === selectedDroneId) || DRONES[0];

  const handleLaunchDrone = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      alert(`Drone Mission Launched! ${currentDrone.callsign} dispatched to ${currentDrone.targetVessel}. Live 4K Telemetry stream connected.`);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Radio className="w-64 h-64 text-sky-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-sky-400" />
                <span>AUTONOMOUS HARBOR DRONE DISPATCH HUB</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                5G TELEMETRY ACTIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Autonomous Port Drone Inspection & Cargo Delivery Operations</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Real-time harbor drone control for ship hull ultrasonic thickness inspections, anchorage medicine & document delivery, oil spill detection, and live 4K thermal video feeds.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 font-mono">
            <button
              onClick={handleLaunchDrone}
              disabled={isDispatching}
              className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50"
            >
              <Send className={`w-4 h-4 ${isDispatching ? 'animate-bounce' : ''}`} />
              <span>{isDispatching ? 'DISPATCHING DRONE...' : 'DISPATCH NEW MISSION'}</span>
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Active Drone Missions</span>
            <span className="text-sky-300 font-black text-lg">2 Drones Airborne</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Hull Thickness Scans</span>
            <span className="text-emerald-400 font-black text-lg">99.4% Precision</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Anchorage Deliveries</span>
            <span className="text-amber-300 font-black text-lg">12 Kg Payload Max</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">5G Live Video Latency</span>
            <span className="text-purple-300 font-black text-lg">24 ms Low-Latency</span>
          </div>
        </div>
      </div>

      {/* DRONE FEED & FLEET SELECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* LIVE STREAM FEED SIMULATOR */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-sky-400" />
              <span className="font-bold text-white text-sm">Live 4K Ultra-HD Drone Video Telemetry Feed</span>
            </div>
            <button
              onClick={() => setStreamActive(!streamActive)}
              className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-sky-400 text-[10px] font-bold"
            >
              {streamActive ? 'PAUSE STREAM' : 'RESUME STREAM'}
            </button>
          </div>

          <div className="relative aspect-video bg-slate-950 rounded-2xl border border-sky-500/30 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            {/* HUD OVERLAY */}
            <div className="flex justify-between items-center text-[10px] z-10 bg-slate-950/70 p-2 rounded-xl backdrop-blur-sm border border-slate-800">
              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>LIVE TELEMETRY: {currentDrone.callsign}</span>
              </span>
              <span className="text-sky-300">BATTERY: {currentDrone.batteryPct}%</span>
              <span className="text-amber-300">ALT: {currentDrone.altitudeMeters}m</span>
              <span className="text-purple-300">SPD: {currentDrone.speedKts} Kts</span>
            </div>

            <div className="my-auto text-center space-y-2 z-10 py-12">
              <Radio className="w-12 h-12 text-sky-400/80 mx-auto animate-pulse" />
              <p className="text-slate-300 text-xs font-bold font-sans">
                Targeting Vessel: <span className="text-emerald-400">{currentDrone.targetVessel}</span>
              </p>
              <p className="text-slate-500 text-[11px]">
                Hull Ultrasonic Ultrasonic Thickness Sensor Stream & Laser Distance Radar Active
              </p>
            </div>

            <div className="flex justify-between items-center text-[10px] z-10 bg-slate-950/70 p-2 rounded-xl backdrop-blur-sm border border-slate-800">
              <span className="text-slate-400">LAT: 01° 14.8' N | LON: 103° 48.2' E</span>
              <span className="text-emerald-400 font-bold">5G ENCRYPTED LINK</span>
            </div>
          </div>
        </div>

        {/* DRONE FLEET CONTROL */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Harbor Drone Fleet Directory</h2>
          <div className="space-y-3">
            {DRONES.map(d => (
              <div
                key={d.id}
                onClick={() => setSelectedDroneId(d.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedDroneId === d.id ? 'bg-slate-950 border-sky-500 shadow-md' : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-xs">{d.callsign}</h3>
                    <span className="text-slate-400 text-[10px] block">{d.type}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    d.status.includes('In Flight') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
