import React, { useState } from 'react';
import { Compass, Play, Pause, RotateCcw, Navigation, Fuel, ShieldAlert, Clock, Zap } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface VoyageScenario {
  id: string;
  routeName: string;
  originPort: string;
  destinationPort: string;
  distanceNm: number;
  standardDays: number;
  piracyBypassDays: number;
  bunkerConsumptionTons: number;
  bypassBunkerTons: number;
  riskReductionPct: number;
}

const SAMPLE_SCENARIOS: VoyageScenario[] = [
  {
    id: 'SIM-01',
    routeName: 'Shanghai -> Rotterdam via Suez & Bab-el-Mandeb',
    originPort: 'Shanghai Port (CN)',
    destinationPort: 'Port of Rotterdam (NL)',
    distanceNm: 10500,
    standardDays: 28,
    piracyBypassDays: 38,
    bunkerConsumptionTons: 1120,
    bypassBunkerTons: 1540,
    riskReductionPct: 88
  },
  {
    id: 'SIM-02',
    routeName: 'Singapore -> Hamburg via Cape of Good Hope Bypass',
    originPort: 'Singapore Anchorage (SG)',
    destinationPort: 'Hamburg Port (DE)',
    distanceNm: 11800,
    standardDays: 31,
    piracyBypassDays: 41,
    bunkerConsumptionTons: 1240,
    bypassBunkerTons: 1680,
    riskReductionPct: 95
  }
];

export const VoyageSimulationView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<VoyageScenario>(SAMPLE_SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simProgressPct, setSimProgressPct] = useState<number>(35);
  const [avoidHighRiskArea, setAvoidHighRiskArea] = useState<boolean>(true);

  const toggleSimulation = () => {
    hapticEngine.trigger('click');
    setIsSimulating(!isSimulating);
  };

  const resetSimulation = () => {
    hapticEngine.trigger('click');
    setSimProgressPct(0);
    setIsSimulating(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Interactive Maritime Voyage Route & Piracy Risk Bypass Simulator</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Simulate vessel transit routes, compare Cape of Good Hope rerouting vs. Red Sea high-risk area passage fuel and time costs
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSimulation}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1 transition-all ${
              isSimulating
                ? 'bg-amber-500 text-slate-950'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'PAUSE SIM' : 'RUN VOYAGE SIM'}</span>
          </button>
          <button
            onClick={resetSimulation}
            className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voyage Simulation Map & Telemetry Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
          <div>
            <span className="text-[8px] text-cyan-400 font-bold block">{selectedScenario.id} • ROUTE SCENARIO</span>
            <h4 className="text-xs font-bold text-white">{selectedScenario.routeName}</h4>
          </div>

          <button
            onClick={() => {
              setAvoidHighRiskArea(!avoidHighRiskArea);
              hapticEngine.trigger('click');
            }}
            className={`px-2.5 py-1 rounded text-[9px] font-bold border transition-all ${
              avoidHighRiskArea
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                : 'bg-rose-950 text-rose-300 border-rose-800'
            }`}
          >
            BYPASS HIGH RISK AREA: {avoidHighRiskArea ? 'ACTIVE (CAPE)' : 'DISABLED (SUEZ)'}
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-1 font-sans">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-slate-400">Simulated Transit Progress:</span>
            <span className="text-cyan-300 font-bold">{simProgressPct}% Completed</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${simProgressPct}%` }}
            />
          </div>
        </div>

        {/* Comparison Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] font-sans">
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono">
            <span className="text-slate-500 text-[8px] block">ESTIMATED TRANSIT TIME:</span>
            <span className="text-white font-bold text-xs">
              {avoidHighRiskArea ? `${selectedScenario.piracyBypassDays} Days` : `${selectedScenario.standardDays} Days`}
            </span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono">
            <span className="text-slate-500 text-[8px] block">BUNKER FUEL REQUIRED:</span>
            <span className="text-amber-400 font-bold text-xs">
              {avoidHighRiskArea ? `${selectedScenario.bypassBunkerTons} MT` : `${selectedScenario.bunkerConsumptionTons} MT`}
            </span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono">
            <span className="text-slate-500 text-[8px] block">PIRACY RISK REDUCTION:</span>
            <span className="text-emerald-400 font-bold text-xs">
              {avoidHighRiskArea ? `-${selectedScenario.riskReductionPct}% Threat Exposure` : 'Standard HRA Exposure'}
            </span>
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono">
            <span className="text-slate-500 text-[8px] block">WAR RISK INSURANCE SURCHARGE:</span>
            <span className="text-cyan-300 font-bold text-xs">
              {avoidHighRiskArea ? '$0 (Outside HRA Zone)' : '+$185,000 USD / Voyage'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
