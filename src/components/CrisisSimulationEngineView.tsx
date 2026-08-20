import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Siren,
  ShieldAlert,
  Flame,
  Radio,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Activity,
  Award,
  Zap,
  HardHat,
  Crosshair,
  TrendingDown,
  Clock,
  Check
} from 'lucide-react';

export interface CrisisScenario {
  id: 'CYCLONE_CAT5' | 'OIL_SPILL' | 'CYBER_ATTACK' | 'STRAIT_BLOCKADE';
  title: string;
  category: 'Extreme Weather' | 'Environmental Disaster' | 'Cyber Security' | 'Geopolitical Crisis';
  description: string;
  initialEconomicLossM: number;
  initialEcosystemRiskPercent: number;
  initialCasualtyRiskPercent: number;
  initialRecoveryDays: number;
}

const DRILL_SCENARIOS: CrisisScenario[] = [
  {
    id: 'CYCLONE_CAT5',
    title: 'Category 5 Super Cyclone Direct Port Landfall',
    category: 'Extreme Weather',
    description: '140 kt sustained winds, 6.2m storm surge impacting Chittagong and Kolkata port terminals simultaneously.',
    initialEconomicLossM: 180,
    initialEcosystemRiskPercent: 65,
    initialCasualtyRiskPercent: 42,
    initialRecoveryDays: 24
  },
  {
    id: 'OIL_SPILL',
    title: 'VLCC Crude Tanker Hull Breach Oil Spill',
    category: 'Environmental Disaster',
    description: '45,000 barrels of heavy crude spilled near Marine Biosphere Reserve off Malacca Strait.',
    initialEconomicLossM: 250,
    initialEcosystemRiskPercent: 94,
    initialCasualtyRiskPercent: 18,
    initialRecoveryDays: 60
  },
  {
    id: 'CYBER_ATTACK',
    title: 'Port Operating System Ransomware Lockout',
    category: 'Cyber Security',
    description: 'Automated container crane & customs database encrypted across 3 major transshipment terminals.',
    initialEconomicLossM: 95,
    initialEcosystemRiskPercent: 12,
    initialCasualtyRiskPercent: 5,
    initialRecoveryDays: 14
  },
  {
    id: 'STRAIT_BLOCKADE',
    title: 'Naval Chokepoint & Strait Security Blockade',
    category: 'Geopolitical Crisis',
    description: 'Complete maritime transit shutdown of Bab-el-Mandeb & Hormuz corridors requiring instant rerouting around Cape of Good Hope.',
    initialEconomicLossM: 420,
    initialEcosystemRiskPercent: 35,
    initialCasualtyRiskPercent: 30,
    initialRecoveryDays: 45
  }
];

export const CrisisSimulationEngineView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<CrisisScenario>(DRILL_SCENARIOS[0]);
  const [economicLossM, setEconomicLossM] = useState<number>(DRILL_SCENARIOS[0].initialEconomicLossM);
  const [ecosystemRisk, setEcosystemRisk] = useState<number>(DRILL_SCENARIOS[0].initialEcosystemRiskPercent);
  const [casualtyRisk, setCasualtyRisk] = useState<number>(DRILL_SCENARIOS[0].initialCasualtyRiskPercent);
  const [recoveryDays, setRecoveryDays] = useState<number>(DRILL_SCENARIOS[0].initialRecoveryDays);
  const [drillScore, setDrillScore] = useState<number>(65);
  const [actionLogs, setActionLogs] = useState<string[]>([
    'Crisis Drill Engine initialized. Standing by for Strategic Tactical Directives.'
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoadScenario = (scen: CrisisScenario) => {
    setSelectedScenario(scen);
    setEconomicLossM(scen.initialEconomicLossM);
    setEcosystemRisk(scen.initialEcosystemRiskPercent);
    setCasualtyRisk(scen.initialCasualtyRiskPercent);
    setRecoveryDays(scen.initialRecoveryDays);
    setDrillScore(65);
    setActionLogs([`Loaded Crisis Drill: ${scen.title}. Awaiting response options.`]);
  };

  const handleExecuteTacticalAction = (
    actionName: string,
    lossDeltaM: number,
    ecoDelta: number,
    casualtyDelta: number,
    recoveryDelta: number,
    scoreBonus: number
  ) => {
    const newLoss = Math.max(10, economicLossM + lossDeltaM);
    const newEco = Math.max(5, ecosystemRisk + ecoDelta);
    const newCasualty = Math.max(0, casualtyRisk + casualtyDelta);
    const newRecovery = Math.max(2, recoveryDays + recoveryDelta);
    const newScore = Math.min(100, drillScore + scoreBonus);

    setEconomicLossM(newLoss);
    setEcosystemRisk(newEco);
    setCasualtyRisk(newCasualty);
    setRecoveryDays(newRecovery);
    setDrillScore(newScore);

    const timeStr = new Date().toLocaleTimeString();
    const logMsg = `[${timeStr}] TACTICAL ACTION "${actionName}": Loss ${
      lossDeltaM < 0 ? lossDeltaM : '+' + lossDeltaM
    }M, Ecosystem ${ecoDelta}%, Recovery ${recoveryDelta}d. Crisis Score +${scoreBonus}.`;

    setActionLogs((prev) => [logMsg, ...prev]);
    showToast(`Executed Drill Action: ${actionName}`);
  };

  const handleResetDrill = () => {
    handleLoadScenario(selectedScenario);
    showToast('Crisis drill reset to initial parameters.');
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
            className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 border border-rose-500 text-rose-300 font-mono text-xs rounded-2xl shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 text-rose-400" />
            <span className="font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
              <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>MARITIME CRISIS & EMERGENCY DRILL SIMULATION ENGINE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              <span>Maritime Crisis Simulation Engine</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Simulate oil spill booms deployment, cyclone evacuation protocols, terminal cyber ransomware isolation, and naval chokepoint rerouting.
            </p>
          </div>

          <button
            onClick={handleResetDrill}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-mono text-xs font-bold flex items-center space-x-2 transition-all shadow-lg"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>RESET DRILL SCENARIO</span>
          </button>
        </div>
      </div>

      {/* SCENARIO SELECTOR CARDS */}
      <div className="space-y-2 font-mono">
        <label className="text-xs text-slate-400 font-bold uppercase">Select Crisis Drill Scenario:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DRILL_SCENARIOS.map((scen) => {
            const isSelected = selectedScenario.id === scen.id;
            return (
              <div
                key={scen.id}
                onClick={() => handleLoadScenario(scen)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-rose-950/60 border-rose-500 text-rose-100 ring-2 ring-rose-500/50 shadow-xl'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-rose-400 font-bold uppercase mb-1">
                  <span>{scen.category}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-400" />}
                </div>
                <h4 className="font-bold text-white text-xs mb-1 leading-snug">{scen.title}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2">{scen.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* METRICS IMPACT GAUGES & DRILL SCORE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
        {/* IMPACT METRICS (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase border-b border-slate-800 pb-2">
            <Activity className="w-4 h-4" />
            <span>Crisis Impact Telemetry</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Estimated Financial Loss:</span>
                <strong className="text-rose-400 font-black">${economicLossM} Million</strong>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${Math.min(100, (economicLossM / 500) * 100)}%` }} />
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Marine Ecosystem Risk:</span>
                <strong className={ecosystemRisk > 50 ? 'text-amber-400 font-black' : 'text-emerald-400'}>
                  {ecosystemRisk}%
                </strong>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${ecosystemRisk}%` }} />
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Casualty Prevention Index:</span>
                <strong className={casualtyRisk < 15 ? 'text-emerald-400 font-black' : 'text-rose-400'}>
                  {100 - casualtyRisk}% Safe
                </strong>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${100 - casualtyRisk}%` }} />
              </div>
            </div>

            <div className="p-4 bg-rose-950/60 border border-rose-500/50 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-rose-300 font-bold uppercase block">CRISIS DRILL EFFICIENCY SCORE</span>
              <strong className="text-3xl font-black text-white">{drillScore}% / 100%</strong>
              <span className="text-[10px] text-slate-300 block">Grade A - SOLAS / IMO Compliant Command</span>
            </div>
          </div>
        </div>

        {/* TACTICAL DRILL DECISION DIRECTIVES (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase border-b border-slate-800 pb-2">
              <Crosshair className="w-4 h-4" />
              <span>Crisis Response Actions & Disaster Control</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Execute strategic interventions to minimize environmental contamination, protect mariners, and accelerate terminal recovery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => handleExecuteTacticalAction('Deploy Containment Booms & Skimmers', -35, -28, -8, -10, 12)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-amber-500/40 text-amber-300 rounded-xl font-bold text-left transition-all flex items-center space-x-2"
              >
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="block">Deploy Marine Skimmer Booms</span>
                  <span className="text-[10px] text-slate-400 font-normal">Reduces oil contamination by -28%</span>
                </div>
              </button>

              <button
                onClick={() => handleExecuteTacticalAction('Order Full Fleet Anchor Evacuation', -20, -10, -18, -6, 15)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-rose-500/40 text-rose-300 rounded-xl font-bold text-left transition-all flex items-center space-x-2"
              >
                <Siren className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="block">Evacuate Vessels to Deep Anchor</span>
                  <span className="text-[10px] text-slate-400 font-normal">Prevents groundings & hull collisions</span>
                </div>
              </button>

              <button
                onClick={() => handleExecuteTacticalAction('Isolate Port Cyber Gateway & Air-gap', -15, 0, -5, -8, 10)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 rounded-xl font-bold text-left transition-all flex items-center space-x-2"
              >
                <HardHat className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="block">Activate Air-Gapped Satellite Backup</span>
                  <span className="text-[10px] text-slate-400 font-normal">Bypasses corrupted terminal server</span>
                </div>
              </button>

              <button
                onClick={() => handleExecuteTacticalAction('Dispatch Coast Guard & Navy Escorts', -45, -15, -12, -12, 18)}
                className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold text-left transition-all flex items-center space-x-2"
              >
                <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="block">Request Naval Convoy Escort</span>
                  <span className="text-[10px] text-slate-400 font-normal">Secures chokepoints & saves $45M</span>
                </div>
              </button>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">TACTICAL ACTION EVENT LOG:</span>
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
