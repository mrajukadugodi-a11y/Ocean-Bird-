import React, { useState, useEffect } from 'react';
import { Play, Square, CheckCircle2, Siren, Clock, Shield, Award, RotateCcw } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';
import { maritimeAlarmSynth } from '../MarinePiracyAlertView';

export const AutomatedResponseDrillSimulator: React.FC = () => {
  const [drillActive, setDrillActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [stepStates, setStepStates] = useState({
    alarmSounded: false,
    engineBurstTriggered: false,
    waterMonitorsActivated: false,
    citadelMusterComplete: false
  });
  const [drillScore, setDrillScore] = useState<number | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (drillActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [drillActive]);

  const handleStartDrill = () => {
    hapticEngine.trigger('alert');
    maritimeAlarmSynth.playEmergencySiren(2000);
    setDrillActive(true);
    setElapsedSeconds(0);
    setDrillScore(null);
    setStepStates({
      alarmSounded: false,
      engineBurstTriggered: false,
      waterMonitorsActivated: false,
      citadelMusterComplete: false
    });
  };

  const handleCompleteStep = (key: keyof typeof stepStates) => {
    hapticEngine.trigger('click');
    maritimeAlarmSynth.playSonarPing();
    const updated = { ...stepStates, [key]: true };
    setStepStates(updated);

    // If all steps completed, finish drill and calculate score
    if (Object.values(updated).filter(Boolean).length === 4) {
      setDrillActive(false);
      hapticEngine.trigger('success');
      // Score based on speed: < 30s = 100%, < 60s = 85%, else 70%
      const finalScore = elapsedSeconds < 30 ? 100 : elapsedSeconds < 60 ? 88 : 72;
      setDrillScore(finalScore);
    }
  };

  const handleResetDrill = () => {
    hapticEngine.trigger('click');
    setDrillActive(false);
    setElapsedSeconds(0);
    setDrillScore(null);
    setStepStates({
      alarmSounded: false,
      engineBurstTriggered: false,
      waterMonitorsActivated: false,
      citadelMusterComplete: false
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Automated Anti-Piracy Crew Response Drill Simulator</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Practice simulated emergency drills to measure crew reaction times, citadel lockdown speed, and countermeasure readiness
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {!drillActive ? (
            <button
              onClick={handleStartDrill}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg animate-pulse"
            >
              <Play className="w-3.5 h-3.5 fill-current text-white" />
              <span>START ANTI-PIRACY DRILL</span>
            </button>
          ) : (
            <button
              onClick={handleResetDrill}
              className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold rounded-xl text-xs flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>CANCEL DRILL</span>
            </button>
          )}
        </div>
      </div>

      {/* Timer & Score Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
          <span className="text-slate-400 font-bold">Elapsed Drill Time:</span>
          <span className="text-xl font-black text-cyan-400 font-mono">
            {Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:
            {(elapsedSeconds % 60).toString().padStart(2, '0')}
          </span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
          <span className="text-slate-400 font-bold">Drill Status:</span>
          <span
            className={`font-black text-xs ${
              drillActive ? 'text-rose-400 animate-pulse' : drillScore !== null ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            {drillActive ? 'DRILL IN PROGRESS' : drillScore !== null ? 'DRILL COMPLETED' : 'STANDBY'}
          </span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
          <span className="text-slate-400 font-bold">Crew Score:</span>
          <span className="text-xl font-black text-amber-400 font-mono">
            {drillScore !== null ? `${drillScore} / 100` : '--'}
          </span>
        </div>
      </div>

      {/* Interactive Drill Steps */}
      <div className="space-y-2">
        <div
          onClick={() => drillActive && !stepStates.alarmSounded && handleCompleteStep('alarmSounded')}
          className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
            drillActive && !stepStates.alarmSounded
              ? 'bg-rose-950/40 border-rose-500/80 cursor-pointer hover:bg-rose-900/40'
              : stepStates.alarmSounded
              ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300'
              : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Siren className="w-4 h-4 text-rose-400" />
            <span className="font-bold">Step 1: Sound Ship Whistle & Piracy Distress Alarm</span>
          </div>
          {stepStates.alarmSounded ? (
            <span className="text-emerald-400 font-bold">COMPLETED ✓</span>
          ) : (
            <span className="text-[10px] text-slate-400">Click to execute step</span>
          )}
        </div>

        <div
          onClick={() => drillActive && !stepStates.engineBurstTriggered && handleCompleteStep('engineBurstTriggered')}
          className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
            drillActive && !stepStates.engineBurstTriggered
              ? 'bg-rose-950/40 border-rose-500/80 cursor-pointer hover:bg-rose-900/40'
              : stepStates.engineBurstTriggered
              ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300'
              : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="font-bold">Step 2: Increase Main Engine to Max Sea Speed (18+ Kts)</span>
          </div>
          {stepStates.engineBurstTriggered ? (
            <span className="text-emerald-400 font-bold">COMPLETED ✓</span>
          ) : (
            <span className="text-[10px] text-slate-400">Click to execute step</span>
          )}
        </div>

        <div
          onClick={() => drillActive && !stepStates.waterMonitorsActivated && handleCompleteStep('waterMonitorsActivated')}
          className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
            drillActive && !stepStates.waterMonitorsActivated
              ? 'bg-rose-950/40 border-rose-500/80 cursor-pointer hover:bg-rose-900/40'
              : stepStates.waterMonitorsActivated
              ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300'
              : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">Step 3: Auto-Pressurize Starboard Water Monitors</span>
          </div>
          {stepStates.waterMonitorsActivated ? (
            <span className="text-emerald-400 font-bold">COMPLETED ✓</span>
          ) : (
            <span className="text-[10px] text-slate-400">Click to execute step</span>
          )}
        </div>

        <div
          onClick={() => drillActive && !stepStates.citadelMusterComplete && handleCompleteStep('citadelMusterComplete')}
          className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
            drillActive && !stepStates.citadelMusterComplete
              ? 'bg-rose-950/40 border-rose-500/80 cursor-pointer hover:bg-rose-900/40'
              : stepStates.citadelMusterComplete
              ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300'
              : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
          }`}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span className="font-bold">Step 4: Muster All Non-Essential Crew in Fortress Citadel</span>
          </div>
          {stepStates.citadelMusterComplete ? (
            <span className="text-emerald-400 font-bold">COMPLETED ✓</span>
          ) : (
            <span className="text-[10px] text-slate-400">Click to execute step</span>
          )}
        </div>
      </div>
    </div>
  );
};
