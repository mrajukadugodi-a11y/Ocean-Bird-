import React, { useState } from 'react';
import { Navigation, Compass, Leaf, ShieldAlert, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface EcoRouteOption {
  id: string;
  routeName: string;
  originPort: string;
  destinationPort: string;
  distanceNauticalMiles: number;
  estFuelTons: number;
  co2ReductionPct: number;
  threatRiskLevel: 'OPTIMAL' | 'ELEVATED' | 'CRITICAL';
  biodiversitySafetyScore: number; // 0-100
  keyFeatures: string[];
}

const ECO_ROUTES_DATA: EcoRouteOption[] = [
  {
    id: 'ECO-ROUTE-01',
    routeName: 'Great Barrier Reef Outer Corridor (Eco Bypass)',
    originPort: 'Sydney (AU SYD)',
    destinationPort: 'Manila (PH MNL)',
    distanceNauticalMiles: 3420,
    estFuelTons: 118,
    co2ReductionPct: 14.5,
    threatRiskLevel: 'OPTIMAL',
    biodiversitySafetyScore: 94,
    keyFeatures: ['Bypasses whale sanctuary', 'Favorable East Australian Current', '0% Protected Reef Proximity']
  },
  {
    id: 'ECO-ROUTE-02',
    routeName: 'Cook Strait Eco-Power Saver (New Zealand)',
    originPort: 'Auckland (NZ AKL)',
    destinationPort: 'Sydney (AU SYD)',
    distanceNauticalMiles: 1280,
    estFuelTons: 42,
    co2ReductionPct: 18.2,
    threatRiskLevel: 'OPTIMAL',
    biodiversitySafetyScore: 92,
    keyFeatures: ['Tidal stream synchronization', '10-knot dolphin safe speed', 'Zero HFO discharge']
  },
  {
    id: 'ECO-ROUTE-03',
    routeName: 'Sulu Sea Anti-Piracy Eco-Transit Corridor',
    originPort: 'Manila (PH MNL)',
    destinationPort: 'Vung Tau (VN VUT)',
    distanceNauticalMiles: 920,
    estFuelTons: 31,
    co2ReductionPct: 12.0,
    threatRiskLevel: 'ELEVATED',
    biodiversitySafetyScore: 88,
    keyFeatures: ['Protected convoy escort lane', 'Avoids Malampaya marine sound', 'Optimal weather routing']
  }
];

export const EcoFriendlyRoutePlannerView: React.FC = () => {
  const [routes] = useState<EcoRouteOption[]>(ECO_ROUTES_DATA);
  const [selectedRoute, setSelectedRoute] = useState<EcoRouteOption>(ECO_ROUTES_DATA[0]);

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
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Eco-Friendly Voyage Route & Carbon Emission Optimizer</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Green shipping corridors, CO2 reduction calculators, biodiversity safety scores, and security threat bypasses
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          CII & EEXI COMPLIANT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Route Selector List */}
        <div className="lg:col-span-2 space-y-3">
          {routes.map((rt) => (
            <div
              key={rt.id}
              onClick={() => {
                setSelectedRoute(rt);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedRoute.id === rt.id
                  ? 'bg-slate-950 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-[8px] text-emerald-400 font-bold">{rt.id}</span>
                <span className="text-emerald-300 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-[9px]">
                  -{rt.co2ReductionPct}% CO2 EMISSIONS
                </span>
              </div>

              <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                <span>{rt.originPort}</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span>{rt.destinationPort}</span>
              </h4>

              <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">DISTANCE:</span>
                  <span className="text-white font-bold">{rt.distanceNauticalMiles} NM</span>
                </div>
                <div>
                  <span className="text-slate-500 block">EST FUEL:</span>
                  <span className="text-amber-300 font-bold">{rt.estFuelTons} MT</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ECO SCORE:</span>
                  <span className="text-emerald-400 font-bold">{rt.biodiversitySafetyScore} / 100</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Route Detailed Breakdown */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-emerald-400 font-bold block">SELECTED GREEN VOYAGE PATH</span>
              <h4 className="text-xs font-bold text-white">{selectedRoute.routeName}</h4>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">CARBON REDUCTION:</span>
                <span className="text-emerald-400 font-bold">-{selectedRoute.co2ReductionPct}% CO2</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1">
                <span className="text-slate-500">ESTIMATED FUEL BURN:</span>
                <span className="text-amber-300 font-bold">{selectedRoute.estFuelTons} Tons VLSFO</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1">
                <span className="text-slate-500">SECURITY THREAT INDEX:</span>
                <span className="text-cyan-300 font-bold">{selectedRoute.threatRiskLevel}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] text-slate-500 block font-bold">KEY ECO-ROUTING FEATURES:</span>
              <div className="space-y-1">
                {selectedRoute.keyFeatures.map((ft) => (
                  <div key={ft} className="flex items-center space-x-2 text-[10px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
