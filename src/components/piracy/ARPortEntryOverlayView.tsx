import React, { useState } from 'react';
import { Eye, Navigation, Compass, AlertCircle, Anchor, Shield, Layers, CheckCircle2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PortEntryPoint {
  zoneName: string;
  depthMeters: number;
  pilotBoardingStatus: 'PILOT ONBOARD' | 'EN ROUTE' | 'PENDING SECURE CLEARANCE';
  channelWidthMeters: number;
  piracyAlertLevel: 'GREEN' | 'AMBER' | 'RED';
}

const SAMPLE_PORT_ZONES: PortEntryPoint[] = [
  {
    zoneName: 'Singapore Western Fairway Channel Entry',
    depthMeters: 22.4,
    pilotBoardingStatus: 'PILOT ONBOARD',
    channelWidthMeters: 380,
    piracyAlertLevel: 'GREEN'
  },
  {
    zoneName: 'Lagos Harbor Channel (West Africa High Risk Zone)',
    depthMeters: 14.2,
    pilotBoardingStatus: 'PENDING SECURE CLEARANCE',
    channelWidthMeters: 210,
    piracyAlertLevel: 'RED'
  },
  {
    zoneName: 'Suez Canal Port Said North Approach',
    depthMeters: 24.0,
    pilotBoardingStatus: 'EN ROUTE',
    channelWidthMeters: 300,
    piracyAlertLevel: 'AMBER'
  }
];

export const ARPortEntryOverlayView: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<PortEntryPoint>(SAMPLE_PORT_ZONES[0]);
  const [arHudActive, setArHudActive] = useState<boolean>(true);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Spatial AR Port Entry, Narrow Channel & Pilot Boarding Overlay</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Head-up display spatial vectors for harbor approach, bathymetric depth contours, and anti-boarding pilot boat escort
          </p>
        </div>

        <button
          onClick={() => {
            setArHudActive(!arHudActive);
            hapticEngine.trigger('click');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
            arHudActive
              ? 'bg-cyan-500 text-slate-950 font-black shadow'
              : 'bg-slate-950 text-slate-400 border border-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{arHudActive ? 'SPATIAL HUD ACTIVE' : 'HUD STANDBY'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SAMPLE_PORT_ZONES.map((zone) => (
          <button
            key={zone.zoneName}
            onClick={() => {
              setSelectedZone(zone);
              hapticEngine.trigger('click');
            }}
            className={`p-3 rounded-2xl border text-left transition-all space-y-1 ${
              selectedZone.zoneName === zone.zoneName
                ? 'bg-slate-950 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[11px] font-bold text-white block truncate">{zone.zoneName}</span>
            <div className="flex justify-between items-center text-[9px]">
              <span className="text-slate-400">Depth: {zone.depthMeters}m</span>
              <span
                className={`font-bold px-1.5 py-0.5 rounded ${
                  zone.piracyAlertLevel === 'RED'
                    ? 'bg-rose-950 text-rose-300'
                    : zone.piracyAlertLevel === 'AMBER'
                    ? 'bg-amber-950 text-amber-300'
                    : 'bg-emerald-950 text-emerald-300'
                }`}
              >
                {zone.piracyAlertLevel} THREAT
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* AR HUD Overlay Simulation Box */}
      <div className="relative bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 overflow-hidden space-y-4">
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-cyan-950/80 border border-cyan-500/60 px-2 py-0.5 rounded text-[8px] text-cyan-300 font-bold">
          <Compass className="w-3 h-3 animate-spin text-cyan-400" />
          <span>AR GYRO ALIGNED</span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-cyan-300 block">{selectedZone.zoneName} AR Vector</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[10px]">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-slate-400 block font-sans">Under Keel Clearance (UKC):</span>
              <span className="text-emerald-400 font-bold block">{selectedZone.depthMeters} meters</span>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-slate-400 block font-sans">Channel Navigation Width:</span>
              <span className="text-cyan-300 font-bold block">{selectedZone.channelWidthMeters} meters</span>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-slate-400 block font-sans">Pilot Boarding Status:</span>
              <span className="text-amber-400 font-bold block">{selectedZone.pilotBoardingStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
