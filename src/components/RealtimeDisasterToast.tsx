import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Activity, Waves, ArrowRight, X, ShieldAlert, Radio } from 'lucide-react';

export interface DisasterAlertData {
  id: string;
  type: 'TSUNAMI' | 'EARTHQUAKE' | 'MULTI_HAZARD';
  severity: 'CRITICAL_RED' | 'WARNING_AMBER';
  title: string;
  location: string;
  magnitude: string;
  surgeHeight: string;
  pgaAcceleration: string;
  timestamp: string;
  zoneId: string;
}

interface RealtimeDisasterToastProps {
  onOpenCommandCenter: () => void;
}

const SAMPLE_ALERTS: DisasterAlertData[] = [
  {
    id: 'ALERT-EV-8901',
    type: 'MULTI_HAZARD',
    severity: 'CRITICAL_RED',
    title: 'M8.9 Megathrust Earthquake & 4.8m Tsunami Surge',
    location: 'Honshu Coast / Nankai Trough (37.8° N, 142.1° E)',
    magnitude: 'M 8.9',
    surgeHeight: '4.8 Meters Peak',
    pgaAcceleration: '48.5 %g (MMI IX)',
    timestamp: 'JUST NOW • 12:58:10 UTC',
    zoneId: 'NW_PACIFIC_NANKAI'
  },
  {
    id: 'ALERT-EV-9102',
    type: 'TSUNAMI',
    severity: 'CRITICAL_RED',
    title: 'Major Sunda Trench Tsunami Wave Vector Advancing',
    location: 'Sunda Arc / Sumatra Coast (2.1° S, 98.4° E)',
    magnitude: 'M 9.1',
    surgeHeight: '6.2 Meters Peak',
    pgaAcceleration: '34.2 %g (MMI VIII)',
    timestamp: '2 MINS AGO',
    zoneId: 'INDIAN_OCEAN_SUNDA'
  },
  {
    id: 'ALERT-EV-8403',
    type: 'EARTHQUAKE',
    severity: 'WARNING_AMBER',
    title: 'Cascadia Fault Interface Subduction Shaking',
    location: 'Pacific NW Maritime Corridor (44.2° N, 125.6° W)',
    magnitude: 'M 8.4',
    surgeHeight: '2.5 Meters Peak',
    pgaAcceleration: '18.4 %g (MMI VII)',
    timestamp: '5 MINS AGO',
    zoneId: 'PACIFIC_NW_CASCADIA'
  }
];

export const RealtimeDisasterToast: React.FC<RealtimeDisasterToastProps> = ({ onOpenCommandCenter }) => {
  const [currentAlertIndex, setCurrentAlertIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const activeAlert = SAMPLE_ALERTS[currentAlertIndex];

  // Rotate through simulated alerts every 35 seconds if visible
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % SAMPLE_ALERTS.length);
      setIsVisible(true);
      setIsMinimized(false);
    }, 35000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => {
          setIsVisible(true);
          setIsMinimized(false);
        }}
        className="fixed bottom-20 right-6 z-50 px-3 py-2 bg-red-600/90 hover:bg-red-500 text-white text-xs font-black rounded-full shadow-2xl flex items-center space-x-2 border border-red-400 font-mono animate-bounce"
      >
        <ShieldAlert className="w-4 h-4 text-white animate-spin" />
        <span>RE-OPEN GLOBAL DISASTER ALERT</span>
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed top-20 right-6 z-50 bg-slate-950 border-2 border-red-500 text-white px-4 py-2.5 rounded-2xl shadow-2xl font-mono flex items-center space-x-3 backdrop-blur-md">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
        <div className="text-xs">
          <strong className="text-red-400 font-black block">{activeAlert.magnitude} ALERT</strong>
          <span className="text-[10px] text-slate-400">{activeAlert.title}</span>
        </div>
        <button
          onClick={onOpenCommandCenter}
          className="px-2.5 py-1 bg-red-500 hover:bg-red-400 text-slate-950 font-black text-[10px] rounded-lg uppercase"
        >
          MAP
        </button>
        <button
          onClick={() => setIsMinimized(false)}
          className="text-slate-400 hover:text-white text-xs"
        >
          Expand
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-auto bg-slate-950/95 border-2 border-red-500/80 text-white rounded-3xl p-4 shadow-2xl shadow-red-950/60 font-mono backdrop-blur-xl animate-in slide-in-from-top-4 duration-300">
      {/* HEADER BAR */}
      <div className="flex items-center justify-between border-b border-red-500/30 pb-2.5 mb-3">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 h-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <span className="text-xs font-black text-red-400 tracking-wider uppercase flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            GLOBAL DISASTER ALERT SYSTEM
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-slate-400 hover:text-white px-2 py-0.5 text-[10px] font-bold rounded bg-slate-900 border border-slate-800"
          >
            Minimize
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-900"
            title="Dismiss Alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ALERT CONTENT */}
      <div className="space-y-2.5">
        <div>
          <h4 className="text-sm font-black text-white leading-snug flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{activeAlert.title}</span>
          </h4>
          <p className="text-[11px] text-slate-300 font-sans mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-red-400 shrink-0" />
            <span>{activeAlert.location}</span>
          </p>
        </div>

        {/* HAZARD TELEMETRY BADGES */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 space-y-0.5">
            <span className="text-[9px] text-slate-400 font-bold block uppercase flex items-center gap-1">
              <Waves className="w-3 h-3 text-cyan-400" />
              TSUNAMI SURGE
            </span>
            <strong className="text-cyan-400 font-black text-xs block">{activeAlert.surgeHeight}</strong>
          </div>

          <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 space-y-0.5">
            <span className="text-[9px] text-slate-400 font-bold block uppercase flex items-center gap-1">
              <Activity className="w-3 h-3 text-amber-400" />
              SEISMIC SHAKING
            </span>
            <strong className="text-amber-400 font-black text-xs block">{activeAlert.pgaAcceleration}</strong>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={onOpenCommandCenter}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 border border-amber-300/40"
        >
          <span>🗺️ VIEW COMMAND CENTER MAP</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* FOOTER METADATA */}
      <div className="mt-2.5 pt-2 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-500">
        <span>AUTO PUSH ID: {activeAlert.id}</span>
        <span className="text-slate-400 font-bold">{activeAlert.timestamp}</span>
      </div>
    </div>
  );
};

export default RealtimeDisasterToast;

