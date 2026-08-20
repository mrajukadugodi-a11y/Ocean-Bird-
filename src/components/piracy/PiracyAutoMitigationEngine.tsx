import React, { useState } from 'react';
import { Zap, ShieldCheck, Siren, Flame, Lock, Radio, Cpu, CheckCircle2, AlertOctagon, Sliders } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';
import { maritimeAlarmSynth } from '../MarinePiracyAlertView';

export interface MitigationSystemState {
  waterMonitorsAuto: boolean;
  engineSpeedBurstAuto: boolean;
  citadelLockoutAuto: boolean;
  lradAcousticPulseAuto: boolean;
}

export const PiracyAutoMitigationEngine: React.FC = () => {
  const [autonomousModeEnabled, setAutonomousModeEnabled] = useState(true);
  const [triggerThresholdScore, setTriggerThresholdScore] = useState<number>(70);
  const [activeMitigations, setActiveMitigations] = useState<MitigationSystemState>({
    waterMonitorsAuto: true,
    engineSpeedBurstAuto: true,
    citadelLockoutAuto: false,
    lradAcousticPulseAuto: true
  });
  const [lastMitigationEvent, setLastMitigationEvent] = useState<string | null>(
    'Auto-Mitigation Standby: Water Cannon pump primed @ 70 Risk Threshold'
  );

  const toggleMitigation = (key: keyof MitigationSystemState) => {
    hapticEngine.trigger('click');
    setActiveMitigations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestAutoTrigger = () => {
    hapticEngine.trigger('alert');
    maritimeAlarmSynth.playEmergencySiren(2000);
    setLastMitigationEvent(
      `[${new Date().toLocaleTimeString()}] AUTONOMOUS MITIGATION EXECUTED: Calculated Risk Score 82 > ${triggerThresholdScore}. Water monitors pressurized to 12 BAR, Engine spooling to 22 Knots!`
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Autonomous Piracy Risk Auto-Mitigation Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            AI-driven threat mitigation matrix that automatically deploys defensive countermeasures when risk threshold is breached
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setAutonomousModeEnabled(!autonomousModeEnabled);
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              autonomousModeEnabled
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            {autonomousModeEnabled ? 'AUTONOMOUS MODE: ONLINE' : 'MANUAL OVERRIDE ONLY'}
          </button>
        </div>
      </div>

      {/* Threshold Configurator Slider */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-slate-300 font-bold">Auto-Mitigation Activation Risk Score Threshold:</span>
          <span className="text-cyan-400 font-black">{triggerThresholdScore} / 100 Risk Points</span>
        </div>
        <input
          type="range"
          min="40"
          max="90"
          step="5"
          value={triggerThresholdScore}
          onChange={(e) => {
            setTriggerThresholdScore(parseInt(e.target.value));
            hapticEngine.trigger('click');
          }}
          className="w-full accent-cyan-400 cursor-pointer"
        />
        <span className="text-[9px] text-slate-500 font-sans block">
          Countermeasures will instantly trigger without delay when threat detection algorithms evaluate boarding risk at or above {triggerThresholdScore}.
        </span>
      </div>

      {/* Individual Countermeasure Toggle Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Water Cannon Pump */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Starboard Water Cannons</span>
            <span className="text-[9px] text-slate-400 font-sans block">Auto-pressurize high-pressure sea water pump</span>
          </div>
          <button
            onClick={() => toggleMitigation('waterMonitorsAuto')}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${
              activeMitigations.waterMonitorsAuto
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {activeMitigations.waterMonitorsAuto ? 'ENABLED' : 'OFF'}
          </button>
        </div>

        {/* Engine Speed Burst */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Main Engine Speed Burst</span>
            <span className="text-[9px] text-slate-400 font-sans block">Spool fuel injectors to maximum 22+ Knots</span>
          </div>
          <button
            onClick={() => toggleMitigation('engineSpeedBurstAuto')}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${
              activeMitigations.engineSpeedBurstAuto
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {activeMitigations.engineSpeedBurstAuto ? 'ENABLED' : 'OFF'}
          </button>
        </div>

        {/* Citadel Lockout */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Citadel Armored Lockout</span>
            <span className="text-[9px] text-slate-400 font-sans block">Auto-seal heavy steel citadel doors & engine room</span>
          </div>
          <button
            onClick={() => toggleMitigation('citadelLockoutAuto')}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${
              activeMitigations.citadelLockoutAuto
                ? 'bg-rose-500 text-slate-950 border-rose-400 font-black'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {activeMitigations.citadelLockoutAuto ? 'ENABLED' : 'OFF'}
          </button>
        </div>

        {/* LRAD Acoustic Pulse */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">LRAD Acoustic Pulse Emitter</span>
            <span className="text-[9px] text-slate-400 font-sans block">160 dB focused acoustic deterrence burst</span>
          </div>
          <button
            onClick={() => toggleMitigation('lradAcousticPulseAuto')}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${
              activeMitigations.lradAcousticPulseAuto
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {activeMitigations.lradAcousticPulseAuto ? 'ENABLED' : 'OFF'}
          </button>
        </div>
      </div>

      <button
        onClick={handleTestAutoTrigger}
        className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xl animate-pulse"
      >
        <Zap className="w-4 h-4 fill-current text-white" />
        <span>SIMULATE CRITICAL THREAT BREACH (TEST AUTO-MITIGATION)</span>
      </button>

      {lastMitigationEvent && (
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-[10px] text-cyan-300 font-mono">
          {lastMitigationEvent}
        </div>
      )}
    </div>
  );
};
