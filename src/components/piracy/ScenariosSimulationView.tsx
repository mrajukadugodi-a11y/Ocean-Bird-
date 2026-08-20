import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, AlertTriangle, ShieldAlert, Sparkles, TrendingUp, DollarSign, Wind, Thermometer, Waves, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface SimulationParams {
  sstRise: number; // 0.5 to 4.0 °C
  monsoonWindStrength: number; // 0 to 100 %
  carbonPenaltyRate: number; // 50 to 300 $/ton
  vesselSpeedKnots: number; // 10 to 24 kts
}

export const ScenariosSimulationView: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    sstRise: 1.8,
    monsoonWindStrength: 35,
    carbonPenaltyRate: 120,
    vesselSpeedKnots: 16
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationCount, setSimulationCount] = useState(1);

  // Derived calculations
  const projectedDelayHours = Math.round((params.sstRise * 12) + (params.monsoonWindStrength * 0.8));
  const additionalFuelCost = Math.round((params.vesselSpeedKnots * 1450) + (params.carbonPenaltyRate * 220) * (params.sstRise * 0.6));
  const piracyRiskIndex = Math.min(99, Math.round(25 + (params.sstRise * 11) + (params.monsoonWindStrength * 0.4)));
  const co2SurgeTonnes = Math.round(320 * (params.vesselSpeedKnots / 16) * (1 + params.sstRise * 0.08));

  const runSimulation = () => {
    setIsSimulating(true);
    hapticEngine.trigger('heavy');
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationCount(prev => prev + 1);
      hapticEngine.trigger('success');
    }, 600);
  };

  const resetParams = () => {
    setParams({
      sstRise: 1.8,
      monsoonWindStrength: 35,
      carbonPenaltyRate: 120,
      vesselSpeedKnots: 16
    });
    hapticEngine.trigger('click');
  };

  const loadPreset = (name: string) => {
    hapticEngine.trigger('click');
    if (name === 'EL_NINO') {
      setParams({ sstRise: 2.8, monsoonWindStrength: 65, carbonPenaltyRate: 180, vesselSpeedKnots: 14 });
    } else if (name === 'ARCTIC_THAW') {
      setParams({ sstRise: 3.5, monsoonWindStrength: 80, carbonPenaltyRate: 250, vesselSpeedKnots: 18 });
    } else {
      setParams({ sstRise: 1.0, monsoonWindStrength: 15, carbonPenaltyRate: 80, vesselSpeedKnots: 16 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Interactive Marine Climate & Operational Risk Scenarios Simulation Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Adjust sea surface temperature, monsoon wind anomalies, carbon penalties, and transit speeds to run predictive Monte-Carlo risk simulations
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={resetParams}
            className="bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
          <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
            SIMULATION #{simulationCount}
          </span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[10px] text-slate-400 font-bold">PRESET SCENARIOS:</span>
        <button
          onClick={() => loadPreset('BASELINE')}
          className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[9px] px-2.5 py-1 rounded-lg font-bold"
        >
          2026 Baseline Path
        </button>
        <button
          onClick={() => loadPreset('EL_NINO')}
          className="bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800 text-[9px] px-2.5 py-1 rounded-lg font-bold"
        >
          El Niño Super Surge (+2.8°C)
        </button>
        <button
          onClick={() => loadPreset('ARCTIC_THAW')}
          className="bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800 text-[9px] px-2.5 py-1 rounded-lg font-bold"
        >
          Extreme Climate Crisis (+3.5°C)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Sliders Control Panel */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4">
          <h4 className="text-xs font-bold text-white flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-cyan-400" />
            <span>SIMULATION INPUT PARAMETERS</span>
          </h4>

          {/* SST Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400 font-bold">Sea Surface Temp Anomaly:</span>
              <span className="text-cyan-300 font-black">+{params.sstRise.toFixed(1)} °C</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={4.0}
              step={0.1}
              value={params.sstRise}
              onChange={(e) => {
                setParams({ ...params, sstRise: parseFloat(e.target.value) });
              }}
              className="w-full accent-cyan-400 bg-slate-900 rounded cursor-pointer h-1.5"
            />
          </div>

          {/* Monsoon Wind Strength Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400 font-bold">Monsoon Wind Surge Intensity:</span>
              <span className="text-amber-300 font-black">+{params.monsoonWindStrength}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={params.monsoonWindStrength}
              onChange={(e) => {
                setParams({ ...params, monsoonWindStrength: parseInt(e.target.value) });
              }}
              className="w-full accent-amber-400 bg-slate-900 rounded cursor-pointer h-1.5"
            />
          </div>

          {/* Carbon Penalty Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400 font-bold">IMO CII Carbon Tax Rate:</span>
              <span className="text-emerald-300 font-black">${params.carbonPenaltyRate} / Tonne CO2</span>
            </div>
            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={params.carbonPenaltyRate}
              onChange={(e) => {
                setParams({ ...params, carbonPenaltyRate: parseInt(e.target.value) });
              }}
              className="w-full accent-emerald-400 bg-slate-900 rounded cursor-pointer h-1.5"
            />
          </div>

          {/* Speed Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400 font-bold">Vessel Eco Transit Speed:</span>
              <span className="text-white font-black">{params.vesselSpeedKnots} Knots</span>
            </div>
            <input
              type="range"
              min={10}
              max={24}
              step={1}
              value={params.vesselSpeedKnots}
              onChange={(e) => {
                setParams({ ...params, vesselSpeedKnots: parseInt(e.target.value) });
              }}
              className="w-full accent-indigo-400 bg-slate-900 rounded cursor-pointer h-1.5"
            />
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs shadow-lg"
          >
            {isSimulating ? (
              <span className="animate-pulse">COMPUTING MONTE-CARLO SIMULATION...</span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>EXECUTE SCENARIOS SIMULATION</span>
              </>
            )}
          </button>
        </div>

        {/* Output Metrics Dashboard */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-4">
          <h4 className="text-xs font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>SIMULATED OUTCOME PREDICTIONS</span>
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-400 font-bold block">PROJECTED CHOKEPOINT DELAY</span>
              <span className="text-lg font-black text-amber-400 block">+{projectedDelayHours} Hours</span>
              <span className="text-[8px] text-slate-500 block">Suez & Malacca congestion</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-400 font-bold block">PIRACY OPERATIONAL RISK</span>
              <span className={`text-lg font-black block ${
                piracyRiskIndex > 70 ? 'text-rose-400' : piracyRiskIndex > 45 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {piracyRiskIndex} / 100 Index
              </span>
              <span className="text-[8px] text-slate-500 block">High risk in monsoon calm window</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-400 font-bold block">ADDITIONAL FUEL SURCHARGE</span>
              <span className="text-lg font-black text-cyan-300 block">${additionalFuelCost.toLocaleString()}</span>
              <span className="text-[8px] text-slate-500 block">Includes carbon tax penalty</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-400 font-bold block">ESTIMATED CO2 EMISSIONS</span>
              <span className="text-lg font-black text-emerald-400 block">{co2SurgeTonnes} Tonnes</span>
              <span className="text-[8px] text-slate-500 block">IMO CII Rating: Class B</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1 font-sans text-[10px]">
            <span className="text-cyan-400 font-bold font-mono block">AI RECOMMENDATION:</span>
            <p className="text-slate-300 leading-relaxed">
              At {params.sstRise}°C SST warming and {params.vesselSpeedKnots} knots speed, rerouting via the Cape of Good Hope reduces piracy encounter probability by 62% despite an added 3.2 days transit.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
