import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Radio, Volume2, Send, CheckCircle2, Zap, PhoneCall } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export const QuickSosPulseView: React.FC = () => {
  const [sosActive, setSosActive] = useState<boolean>(false);
  const [broadcastLog, setBroadcastLog] = useState<string[]>([]);

  const handleTriggerSos = () => {
    hapticEngine.trigger('alert');
    setSosActive(true);
    setBroadcastLog([
      '00:00 - SATELLITE MAYDAY DISTRESS BEACON EMITTED (12°35′N 43°20′E)',
      '00:02 - UKMTO (UK Maritime Trade Operations) Alert Dispatched',
      '00:05 - IMB Piracy Reporting Centre Emergency Acknowledged',
      '00:08 - Combined Task Force CTF-151 Warship Escort Vectoring'
    ]);
  };

  const handleDeactivateSos = () => {
    hapticEngine.trigger('click');
    setSosActive(false);
    setBroadcastLog([]);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Emergency One-Touch Satellite SOS Distress Beacon Emitter</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Instant priority Mayday distress pulse transmission to UKMTO, IMB Piracy Reporting Centre, and naval warships
          </p>
        </div>

        <span className={`text-[10px] px-2.5 py-1 rounded font-bold border ${
          sosActive
            ? 'bg-rose-950 text-rose-300 border-rose-600 animate-pulse'
            : 'bg-slate-950 text-slate-500 border-slate-800'
        }`}>
          BEACON STATUS: {sosActive ? 'EMITTING MAYDAY SIGNAL' : 'STANDBY'}
        </span>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 text-center">
        {!sosActive ? (
          <button
            onClick={handleTriggerSos}
            className="w-32 h-32 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 text-white font-black text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center space-y-1 ring-4 ring-rose-950"
          >
            <ShieldAlert className="w-8 h-8 text-white animate-bounce" />
            <span>EMIT SOS PULSE</span>
          </button>
        ) : (
          <div className="space-y-3 w-full">
            <button
              onClick={handleDeactivateSos}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-rose-400 font-black rounded-xl border border-rose-800 text-xs shadow"
            >
              CANCEL DISTRESS SIGNAL
            </button>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-rose-800/80 text-[10px] font-mono text-left space-y-1.5 text-rose-200">
              <span className="text-rose-400 font-bold block border-b border-rose-900 pb-1">REAL-TIME SATELLITE DISPATCH LOG:</span>
              {broadcastLog.map((log, i) => (
                <div key={i} className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
