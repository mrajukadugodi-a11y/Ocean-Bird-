import React, { useState } from 'react';
import { Leaf, Zap, BarChart3, TrendingDown, ArrowUpRight, ArrowDownRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CarbonMetric {
  id: string;
  vesselName: string;
  vesselType: string;
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  annualCo2Tons: number;
  co2PerNmMetric: string;
  eexiCompliancePct: number;
  fuelType: string;
  reductionTargetPct: number;
}

const CARBON_METRICS_DATA: CarbonMetric[] = [
  {
    id: 'CARB-01',
    vesselName: 'M/V Pacific Sentinel',
    vesselType: 'Ultra Large Container Ship (ULCS)',
    ciiRating: 'A',
    annualCo2Tons: 14250,
    co2PerNmMetric: '3.82 gCO2/dwt-NM',
    eexiCompliancePct: 98.4,
    fuelType: 'Dual-Fuel LNG / VLSFO',
    reductionTargetPct: 24.5
  },
  {
    id: 'CARB-02',
    vesselName: 'M/T Coral Sea Voyager',
    vesselType: 'VLCC Crude Oil Tanker',
    ciiRating: 'B',
    annualCo2Tons: 28400,
    co2PerNmMetric: '4.15 gCO2/dwt-NM',
    eexiCompliancePct: 92.1,
    fuelType: 'VLSFO + Rotor Sail Assisted',
    reductionTargetPct: 18.0
  },
  {
    id: 'CARB-03',
    vesselName: 'M/V Torres Trader',
    vesselType: 'Capesize Bulk Carrier',
    ciiRating: 'C',
    annualCo2Tons: 19800,
    co2PerNmMetric: '5.02 gCO2/dwt-NM',
    eexiCompliancePct: 86.5,
    fuelType: 'Low-Sulfur Marine Gasoil (LSMGO)',
    reductionTargetPct: 12.2
  },
  {
    id: 'CARB-04',
    vesselName: 'M/V Sulu Pioneer',
    vesselType: 'Feeder Container Ship',
    ciiRating: 'D',
    annualCo2Tons: 8900,
    co2PerNmMetric: '6.45 gCO2/dwt-NM',
    eexiCompliancePct: 74.0,
    fuelType: 'Heavy Fuel Oil (HFO) + Scrubber',
    reductionTargetPct: 5.0
  }
];

export const CarbonDashboardView: React.FC = () => {
  const [vessels] = useState<CarbonMetric[]>(CARBON_METRICS_DATA);
  const [selectedVessel, setSelectedVessel] = useState<CarbonMetric>(CARBON_METRICS_DATA[0]);

  const getCiiBadge = (rating: string) => {
    switch (rating) {
      case 'A':
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-0.5 rounded font-black">CII GRADE A (MAJOR SAVINGS)</span>;
      case 'B':
        return <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-0.5 rounded font-black">CII GRADE B (OPTIMAL)</span>;
      case 'C':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-0.5 rounded font-black">CII GRADE C (SATISFACTORY)</span>;
      default:
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-0.5 rounded font-black">CII GRADE {rating} (ACTION REQ)</span>;
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
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>IMO Carbon Intensity (CII) & EEXI Emissions Dashboard</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Fleet greenhouse gas intensity, annual carbon footprint tracking, and EEXI energy efficiency compliance
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          IMO MARPOL ANNEX VI
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Vessel List */}
        <div className="lg:col-span-2 space-y-2">
          {vessels.map((v) => (
            <div
              key={v.id}
              onClick={() => {
                setSelectedVessel(v);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedVessel.id === v.id
                  ? 'bg-slate-950 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-emerald-400 font-bold block">{v.id} • {v.vesselType}</span>
                  <h4 className="text-xs font-bold text-white">{v.vesselName}</h4>
                </div>
                {getCiiBadge(v.ciiRating)}
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">ANNUAL CO2:</span>
                  <span className="text-white font-bold">{v.annualCo2Tons.toLocaleString()} Tons</span>
                </div>
                <div>
                  <span className="text-slate-500 block">EEXI SCORE:</span>
                  <span className="text-emerald-400 font-bold">{v.eexiCompliancePct}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">REDUCTION:</span>
                  <span className="text-cyan-300 font-bold">-{v.reductionTargetPct}% YOY</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Vessel Carbon Specs */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-emerald-400 font-bold block">{selectedVessel.id} DECARBONIZATION FILE</span>
              <h4 className="text-xs font-bold text-white">{selectedVessel.vesselName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedVessel.vesselType}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">CARBON INTENSITY METRIC:</span>
                <span className="text-emerald-400 font-bold">{selectedVessel.co2PerNmMetric}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1">
                <span className="text-slate-500">PRIMARY PROPULSION FUEL:</span>
                <span className="text-cyan-300 font-bold">{selectedVessel.fuelType}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1">
                <span className="text-slate-500">EEXI EFFICIENCY INDEX:</span>
                <span className="text-emerald-400 font-bold">{selectedVessel.eexiCompliancePct}% Compliant</span>
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-800 p-3 rounded-xl text-[10px] text-emerald-300 space-y-1">
              <span className="font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>IMO 2030 DECARBONIZATION TARGET:</span>
              </span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">
                On track for -{selectedVessel.reductionTargetPct}% carbon reduction using AI voyage speed optimization and hull friction anti-fouling coatings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
