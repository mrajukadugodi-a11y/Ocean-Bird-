import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Fuel, Users, AlertOctagon, TrendingDown, ArrowRight } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export const PiracyImpactCalculatorView: React.FC = () => {
  const [transitDays, setTransitDays] = useState<number>(4);
  const [useArmedGuardsPcasp, setUseArmedGuardsPcasp] = useState<boolean>(true);
  const [speedBurstHours, setSpeedBurstHours] = useState<number>(6);
  const [vesselValueMillions, setVesselValueMillions] = useState<number>(45);

  // Financial calculations
  const pcaspCost = useArmedGuardsPcasp ? 18500 : 0;
  const extraFuelCost = speedBurstHours * 1850; // $1,850 per hour of high-speed heavy fuel oil consumption
  const hraInsuranceSurcharge = Math.round(vesselValueMillions * 1000000 * 0.0012); // Kidnap & Ransom / HRA war risk surcharge
  const totalCountermeasureCost = pcaspCost + extraFuelCost + hraInsuranceSurcharge;

  // Potential Loss without countermeasures
  const estimatedRansomRisk = 4500000;
  const cargoDelaysCost = transitDays * 35000;
  const totalPotentialLoss = estimatedRansomRisk + cargoDelaysCost;

  const netSavings = totalPotentialLoss - totalCountermeasureCost;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>High Risk Area (HRA) Piracy Impact & Financial Defense ROI Calculator</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Calculate operational costs (PCASP armed guards, fuel bursts, war risk insurance) vs potential hijack loss mitigation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Interactive Controls */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">HRA Transit Parameters</span>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 font-bold">Vessel Insured Value:</span>
              <span className="text-cyan-400 font-bold">${vesselValueMillions} Million USD</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={vesselValueMillions}
              onChange={(e) => {
                setVesselValueMillions(parseInt(e.target.value));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-300 font-bold">High Speed Burst Duration:</span>
              <span className="text-amber-400 font-bold">{speedBurstHours} Hours @ 21 Kts</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="1"
              value={speedBurstHours}
              onChange={(e) => {
                setSpeedBurstHours(parseInt(e.target.value));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-900">
            <span className="text-slate-300 font-bold">Armed Guards Onboard (PCASP):</span>
            <button
              onClick={() => {
                setUseArmedGuardsPcasp(!useArmedGuardsPcasp);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1 rounded-xl text-[10px] font-bold border ${
                useArmedGuardsPcasp ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              {useArmedGuardsPcasp ? '4-MAN TEAM ($18.5k)' : 'NO GUARDS'}
            </button>
          </div>
        </div>

        {/* Cost vs Savings Breakdown */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Financial ROI Analysis</span>

          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between p-2 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400">War Risk Premium Surcharge:</span>
              <span className="text-white font-bold">${hraInsuranceSurcharge.toLocaleString()} USD</span>
            </div>

            <div className="flex justify-between p-2 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400">Extra Speed Burst Fuel Cost:</span>
              <span className="text-amber-400 font-bold">${extraFuelCost.toLocaleString()} USD</span>
            </div>

            <div className="flex justify-between p-2 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400">PCASP Armed Guard Team Fee:</span>
              <span className="text-emerald-400 font-bold">${pcaspCost.toLocaleString()} USD</span>
            </div>

            <div className="flex justify-between p-2 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-slate-300 font-bold">Total Defense Investment:</span>
              <span className="text-cyan-300 font-black">${totalCountermeasureCost.toLocaleString()} USD</span>
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-500/50 p-3 rounded-2xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-emerald-400 font-bold uppercase">Estimated Net Loss Mitigated</span>
              <span className="text-xl font-black text-emerald-300 block">${netSavings.toLocaleString()} USD</span>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
