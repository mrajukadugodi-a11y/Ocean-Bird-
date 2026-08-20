import React, { useState } from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Zap, Gauge, Award, Fuel, CheckCircle2 } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface FleetVesselEfficiency {
  id: string;
  vesselName: string;
  vesselType: string;
  ciiRating: 'A' | 'B' | 'C' | 'D' | 'E';
  eexiCompliancePct: number;
  avgSpeedKnots: number;
  dailyFuelConsumptionTons: number;
  co2EmissionsTonsPerDay: number;
}

const FLEET_EFFICIENCY_DATA: FleetVesselEfficiency[] = [
  {
    id: 'VESSEL-01',
    vesselName: 'M/V Poseidon Trader',
    vesselType: 'Capesize Bulk Carrier (180k DWT)',
    ciiRating: 'A',
    eexiCompliancePct: 98.4,
    avgSpeedKnots: 12.8,
    dailyFuelConsumptionTons: 28.5,
    co2EmissionsTonsPerDay: 88.9
  },
  {
    id: 'VESSEL-02',
    vesselName: 'M/T Atlantic Sentinel',
    vesselType: 'VLCC Crude Oil Tanker (300k DWT)',
    ciiRating: 'B',
    eexiCompliancePct: 94.2,
    avgSpeedKnots: 13.4,
    dailyFuelConsumptionTons: 42.0,
    co2EmissionsTonsPerDay: 131.0
  },
  {
    id: 'VESSEL-03',
    vesselName: 'M/V Pacific Express',
    vesselType: 'Ultra Large Container Ship (14k TEU)',
    ciiRating: 'C',
    eexiCompliancePct: 88.0,
    avgSpeedKnots: 16.5,
    dailyFuelConsumptionTons: 64.2,
    co2EmissionsTonsPerDay: 200.3
  }
];

export const FleetEfficiencyReportView: React.FC = () => {
  const [fleet] = useState<FleetVesselEfficiency[]>(FLEET_EFFICIENCY_DATA);
  const [selectedVessel, setSelectedVessel] = useState<FleetVesselEfficiency>(FLEET_EFFICIENCY_DATA[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span>Fleet Energy Efficiency, CII Ratings & Fuel Consumption Auditing</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            IMO Carbon Intensity Indicator (CII) grades A-E, EEXI energy efficiency benchmarks, and eco-speed optimizations
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          FLEET AVG CII GRADE: A- (94.2% EEXI)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {fleet.map((v) => (
          <div
            key={v.id}
            onClick={() => {
              setSelectedVessel(v);
              hapticEngine.trigger('click');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              selectedVessel.id === v.id
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{v.vesselType}</span>
                <h4 className="text-xs font-bold text-white">{v.vesselName}</h4>
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                v.ciiRating === 'A'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : v.ciiRating === 'B'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                CII: GRADE {v.ciiRating}
              </span>
            </div>

            <div className="space-y-1 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">EEXI Compliance:</span>
                <span className="text-emerald-400 font-bold">{v.eexiCompliancePct}%</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Eco Transit Speed:</span>
                <span className="text-white font-bold">{v.avgSpeedKnots} Knots</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Fuel Consumption:</span>
                <span className="text-amber-400 font-bold">{v.dailyFuelConsumptionTons} MT / Day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
