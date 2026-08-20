import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  AlertOctagon,
  HardHat,
  RotateCcw,
  CheckCircle2,
  Gauge,
  Zap,
  Radio,
  Clock,
  Check,
  Play,
  Activity
} from 'lucide-react';

export interface SimScenario {
  id: 'CYCLONE' | 'ENGINE_FAILURE' | 'HEEL_SHIFT' | 'PIRACY';
  title: string;
  description: string;
  initialHeel: number;
  initialGM: number;
  initialStress: number;
  initialSafety: number;
}

const SCENARIOS: SimScenario[] = [
  {
    id: 'CYCLONE',
    title: 'Category 4 Super Cyclone Direct Hit',
    description: '110 kt winds, 8.5m rough swells in Bay of Bengal. Risk of deck washing and engine room flooded air intakes.',
    initialHeel: 16,
    initialGM: 1.4,
    initialStress: 84,
    initialSafety: 58
  },
  {
    id: 'ENGINE_FAILURE',
    title: 'Main Engine Failure in 6m Rough Swells',
    description: 'Loss of propulsion in dead-ship condition near coral reef shallow waters off Lakshadweep Islands.',
    initialHeel: 22,
    initialGM: 1.1,
    initialStress: 88,
    initialSafety: 45
  },
  {
    id: 'HEEL_SHIFT',
    title: 'Container Stack Shift & Severe Heel Angle',
    description: 'Tier 5 container collapse causing 18° permanent starboard list under heavy beam sea rolling.',
    initialHeel: 18,
    initialGM: 0.9,
    initialStress: 92,
    initialSafety: 40
  },
  {
    id: 'PIRACY',
    title: 'High-Speed Piracy Approach in Gulf of Aden',
    description: '2 armed skiffs at 30 kts closing range within 2.5 NM while transiting IRTC corridor.',
    initialHeel: 5,
    initialGM: 2.2,
    initialStress: 45,
    initialSafety: 62
  }
];

export const SafetySimulationView: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<SimScenario>(SCENARIOS[0]);
  const [heelAngle, setHeelAngle] = useState<number>(SCENARIOS[0].initialHeel);
  const [stabilityGM, setStabilityGM] = useState<number>(SCENARIOS[0].initialGM);
  const [hullStress, setHullStress] = useState<number>(SCENARIOS[0].initialStress);
  const [safetyScore, setSafetyScore] = useState<number>(SCENARIOS[0].initialSafety);
  const [actionLogs, setActionLogs] = useState<string[]>([
    'Simulation initialized. Standing by for Captain emergency directives.'
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectScenario = (scen: SimScenario) => {
    setCurrentScenario(scen);
    setHeelAngle(scen.initialHeel);
    setStabilityGM(scen.initialGM);
    setHullStress(scen.initialStress);
    setSafetyScore(scen.initialSafety);
    setActionLogs([`Loaded scenario: ${scen.title}. Awaiting response actions.`]);
  };

  const handleExecuteAction = (
    actionName: string,
    heelDelta: number,
    gmDelta: number,
    stressDelta: number,
    safetyDelta: number
  ) => {
    const newHeel = Math.max(0, heelAngle + heelDelta);
    const newGM = Math.max(0.5, Number((stabilityGM + gmDelta).toFixed(2)));
    const newStress = Math.max(20, Math.min(100, hullStress + stressDelta));
    const newSafety = Math.min(100, safetyScore + safetyDelta);

    setHeelAngle(newHeel);
    setStabilityGM(newGM);
    setHullStress(newStress);
    setSafetyScore(newSafety);

    const logMsg = `[${new Date().toLocaleTimeString()}] Action "${actionName}" executed: Heel ${
      heelDelta < 0 ? heelDelta : '+' + heelDelta
    }°, GM ${gmDelta > 0 ? '+' + gmDelta : gmDelta}m, Safety +${safetyDelta}%.`;

    setActionLogs((prev) => [logMsg, ...prev]);
    showToast(`Executed: ${actionName}`);
  };

  const handleResetSimulation = () => {
    handleSelectScenario(currentScenario);
    showToast('Simulation parameters reset');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-purple-500 text-purple-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-purple-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <HardHat className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>SEVERE CLIMATE & MARITIME EMERGENCY SAFETY SIMULATOR</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
              <span>Vessel Safety & Emergency Simulator</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Simulate vessel stability physics, hull stress yield, ballast counter-flooding, and distress response procedures during extreme weather.
            </p>
          </div>

          <button
            onClick={handleResetSimulation}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl font-mono text-xs font-bold flex items-center space-x-2 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-purple-400" />
            <span>RESET SIMULATOR</span>
          </button>
        </div>
      </div>

      {/* SCENARIO SELECTOR STRIP */}
      <div className="space-y-2 font-mono">
        <label className="text-xs text-slate-400 font-bold uppercase">Select Simulation Scenario:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SCENARIOS.map((scen) => {
            const isSelected = currentScenario.id === scen.id;
            return (
              <div
                key={scen.id}
                onClick={() => handleSelectScenario(scen)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-500 text-purple-100 ring-2 ring-purple-500/50 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="font-bold text-white text-xs mb-1 flex items-center justify-between">
                  <span>{scen.title}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2">{scen.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* PHYSICS TELEMETRY DASHBOARD & CAPTAIN CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
        {/* TELEMETRY GAUGES (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 uppercase border-b border-slate-800 pb-2">
            <Gauge className="w-4 h-4" />
            <span>Vessel Telemetry & Physics Gauges</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* HEEL ANGLE */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Vessel Heel Angle:</span>
                <strong className={heelAngle > 15 ? 'text-rose-400 font-black' : 'text-emerald-400'}>
                  {heelAngle}° Starboard
                </strong>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    heelAngle > 15 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (heelAngle / 30) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 block">Cap limit: 25° before capsize threshold</span>
            </div>

            {/* GM METACENTRIC STABILITY */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Stability Index (GM):</span>
                <strong className={stabilityGM < 1.2 ? 'text-amber-400 font-black' : 'text-cyan-400'}>
                  {stabilityGM} m
                </strong>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (stabilityGM / 3) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 block">Min IMO Safety GM: 0.8m</span>
            </div>

            {/* HULL STRESS */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Hull Stress Yield:</span>
                <strong className={hullStress > 80 ? 'text-rose-400 font-black' : 'text-emerald-400'}>
                  {hullStress}%
                </strong>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    hullStress > 80 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${hullStress}%` }}
                />
              </div>
            </div>

            {/* SAFETY INDEX OVERALL */}
            <div className="p-4 bg-purple-950/60 border border-purple-500/50 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-purple-300 font-bold uppercase block">OVERALL SAFETY SCORE</span>
              <strong className="text-3xl font-black text-white">{safetyScore}%</strong>
              <span className="text-[10px] text-slate-300 block">
                {safetyScore >= 80 ? '✓ SECURE STABILITY' : '⚠️ HIGH RISK LEVEL'}
              </span>
            </div>
          </div>
        </div>

        {/* CAPTAIN EMERGENCY DIRECTIVES (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 uppercase border-b border-slate-800 pb-2">
              <Zap className="w-4 h-4" />
              <span>Captain Response Directives & Action Controls</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Execute real-time corrective stability ballast, engine maneuvers, or Coast Guard emergency broadcasts.
            </p>

            {/* ACTION BUTTONS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => handleExecuteAction('Transfer Left Ballast Tank', -5, 0.3, -8, 12)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 rounded-xl font-bold text-left transition-all flex items-center space-x-2"
              >
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="block">Pump Left Ballast Counter-Flood</span>
                  <span className="text-[10px] text-slate-400 font-normal">Reduces heel angle by -5°</span>
                </div>
              </button>

              <button
                onClick={() => handleExecuteAction('Deploy Sea Anchor & Heave To', -3, 0.5, -12, 15)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-purple-500/40 text-purple-300 rounded-xl font-bold text-left transition-all flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="block">Deploy Sea Anchor & Bow to Waves</span>
                  <span className="text-[10px] text-slate-400 font-normal">Reduces hull stress by -12%</span>
                </div>
              </button>

              <button
                onClick={() => handleExecuteAction('Engage Auxiliary Generator', 0, 0.2, -5, 10)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold text-left transition-all flex items-center space-x-2"
              >
                <Gauge className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="block">Start Emergency Aux Generator</span>
                  <span className="text-[10px] text-slate-400 font-normal">Restores emergency power</span>
                </div>
              </button>

              <button
                onClick={() => handleExecuteAction('Broadcast MMSI Mayday Distress', 0, 0, 0, 8)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-rose-500/40 text-rose-300 rounded-xl font-bold text-left transition-all flex items-center space-x-2"
              >
                <Radio className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="block">Send DSC Mayday Alert</span>
                  <span className="text-[10px] text-slate-400 font-normal">Notifies regional SAR rescue</span>
                </div>
              </button>
            </div>

            {/* ACTION SIMULATION LOG */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">SIMULATION DECISION LOG:</span>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-32 overflow-y-auto space-y-1 text-[11px] text-slate-300">
                {actionLogs.map((log, i) => (
                  <div key={i} className="leading-snug border-b border-slate-900 pb-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
