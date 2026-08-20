import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Flag, CheckCircle2, Siren, ShieldAlert, Award } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';
import { maritimeAlarmSynth } from '../MarinePiracyAlertView';

interface LapSplit {
  stepName: string;
  splitTimeSeconds: number;
  grade: 'OPTIMAL' | 'ACCEPTABLE' | 'NEEDS_IMPROVEMENT';
}

export const PiracyDrillTimer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [splits, setSplits] = useState<LapSplit[]>([]);

  const DRILL_STEPS = [
    { name: '1. Sound General Piracy Emergency Alarm', targetMaxSec: 10 },
    { name: '2. Execute Emergency Speed Burst (20+ Kts)', targetMaxSec: 25 },
    { name: '3. Pressurize Deck Hose & Water Cannon Array', targetMaxSec: 45 },
    { name: '4. Complete Full Citadel Muster & Armored Lockout', targetMaxSec: 120 }
  ];

  useEffect(() => {
    let timer: any = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => {
    hapticEngine.trigger('alert');
    maritimeAlarmSynth.playEmergencySiren(1500);
    setIsRunning(true);
  };

  const handlePause = () => {
    hapticEngine.trigger('click');
    setIsRunning(false);
  };

  const handleReset = () => {
    hapticEngine.trigger('click');
    setIsRunning(false);
    setSeconds(0);
    setCurrentStepIndex(0);
    setSplits([]);
  };

  const handleRecordLap = () => {
    if (currentStepIndex >= DRILL_STEPS.length) return;

    hapticEngine.trigger('success');
    maritimeAlarmSynth.playSonarPing();

    const currentStep = DRILL_STEPS[currentStepIndex];
    const grade: LapSplit['grade'] =
      seconds <= currentStep.targetMaxSec
        ? 'OPTIMAL'
        : seconds <= currentStep.targetMaxSec * 1.5
        ? 'ACCEPTABLE'
        : 'NEEDS_IMPROVEMENT';

    const newSplit: LapSplit = {
      stepName: currentStep.name,
      splitTimeSeconds: parseFloat(seconds.toFixed(1)),
      grade
    };

    setSplits([...splits, newSplit]);

    if (currentStepIndex + 1 >= DRILL_STEPS.length) {
      setIsRunning(false);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Timer className="w-4 h-4 text-cyan-400" />
            <span>High-Speed Crew Anti-Piracy Response Drill Stopwatch</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Time crew actions during piracy boarding drills to measure response readiness against IMO SOLAS standards
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1 shadow"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START TIMER</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1 shadow"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-0.5">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Current Drill Elapsed Time</span>
          <span className="text-4xl font-black text-cyan-400 font-mono tracking-tight">
            {seconds.toFixed(1)} <span className="text-sm font-normal text-slate-400">SEC</span>
          </span>
        </div>

        {currentStepIndex < DRILL_STEPS.length && (
          <div className="flex flex-col items-center sm:items-end space-y-2">
            <span className="text-[10px] text-amber-400 font-bold uppercase">
              Current Target: {DRILL_STEPS[currentStepIndex].name}
            </span>
            <button
              onClick={handleRecordLap}
              disabled={!isRunning}
              className={`px-4 py-2 rounded-xl font-black text-xs flex items-center space-x-1.5 shadow-lg ${
                isRunning
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer animate-pulse'
                  : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>RECORD STEP LAP TIME</span>
            </button>
          </div>
        )}
      </div>

      {/* Recorded Splits Table */}
      {splits.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Completed Drill Step Laps:</span>
          <div className="space-y-1.5">
            {splits.map((s, idx) => (
              <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-white font-bold text-[11px]">{s.stepName}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-300 font-black font-mono">{s.splitTimeSeconds}s</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                      s.grade === 'OPTIMAL'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : s.grade === 'ACCEPTABLE'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {s.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
