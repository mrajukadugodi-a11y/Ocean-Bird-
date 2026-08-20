import React, { useState } from 'react';
import { Globe, Navigation, ShieldAlert, ShieldCheck, Anchor, Activity, Radio } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface FleetVesselStatus {
  id: string;
  name: string;
  flag: string;
  type: string;
  region: 'GULF_OF_GUINEA' | 'SOMALI_BASIN' | 'MALACCA_STRAIT' | 'SUEZ_CANAL' | 'NORTH_ATLANTIC';
  speedKnots: number;
  bmpCompliancePct: number;
  threatLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  lat: number;
  lng: number;
}

const FLEET_DATA: FleetVesselStatus[] = [
  {
    id: 'VESSEL-01',
    name: 'M/V PACIFIC SENTINEL',
    flag: 'Panama (IMO 9823102)',
    type: 'Container Ship (14,000 TEU)',
    region: 'GULF_OF_GUINEA',
    speedKnots: 18.2,
    bmpCompliancePct: 95,
    threatLevel: 'HIGH',
    lat: 4.21,
    lng: 6.88
  },
  {
    id: 'VESSEL-02',
    name: 'M/T ATLANTIC GUARDIAN',
    flag: 'Liberia (IMO 9710293)',
    type: 'VLCC Crude Oil Tanker',
    region: 'SOMALI_BASIN',
    speedKnots: 14.5,
    bmpCompliancePct: 98,
    threatLevel: 'HIGH',
    lat: 11.82,
    lng: 48.12
  },
  {
    id: 'VESSEL-03',
    name: 'M/V NORDIC EXPRESS',
    flag: 'Marshall Islands (IMO 9901231)',
    type: 'Bulk Carrier (82,000 DWT)',
    region: 'MALACCA_STRAIT',
    speedKnots: 13.0,
    bmpCompliancePct: 88,
    threatLevel: 'MEDIUM',
    lat: 2.15,
    lng: 102.3
  },
  {
    id: 'VESSEL-04',
    name: 'M/V ARCTIC TRADER',
    flag: 'Singapore (IMO 9641029)',
    type: 'LNG Carrier',
    region: 'NORTH_ATLANTIC',
    speedKnots: 19.8,
    bmpCompliancePct: 100,
    threatLevel: 'LOW',
    lat: 48.12,
    lng: -12.4
  }
];

export const GlobalFleetInsightView: React.FC = () => {
  const [vessels, setVessels] = useState<FleetVesselStatus[]>(FLEET_DATA);
  const [selectedVessel, setSelectedVessel] = useState<FleetVesselStatus>(FLEET_DATA[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Global Corporate Fleet Security Posture & HRA Transit Oversight</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Company-wide operational monitoring for 4 active merchant vessels navigating High Risk Areas
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold">
            2 VESSELS IN HIGH RISK HRA
          </span>
        </div>
      </div>

      {/* Fleet Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block font-sans">Total Fleet Vessels:</span>
          <span className="text-lg font-black text-white block">4 ACTIVE</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block font-sans">HRA Transit Active:</span>
          <span className="text-lg font-black text-rose-400 block">2 VESSELS</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block font-sans">Avg Fleet Speed:</span>
          <span className="text-lg font-black text-cyan-400 block">16.4 KTS</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block font-sans">BMP5 Compliance:</span>
          <span className="text-lg font-black text-emerald-400 block">95.2%</span>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {vessels.map((vessel) => (
          <div
            key={vessel.id}
            onClick={() => {
              setSelectedVessel(vessel);
              hapticEngine.trigger('click');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              selectedVessel.id === vessel.id
                ? 'bg-slate-950 border-cyan-400 shadow-lg ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">{vessel.name}</span>
                <span className="text-[10px] text-slate-400 block">{vessel.type} • {vessel.flag}</span>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded text-[9px] font-black border ${
                  vessel.threatLevel === 'HIGH'
                    ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                    : vessel.threatLevel === 'MEDIUM'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}
              >
                {vessel.threatLevel} RISK
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] border-t border-slate-900 pt-2">
              <div>
                <span className="text-slate-500 block">Region:</span>
                <span className="text-cyan-300 font-bold block">{vessel.region.replace(/_/g, ' ')}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Speed:</span>
                <span className="text-white font-bold block">{vessel.speedKnots} Kts</span>
              </div>
              <div>
                <span className="text-slate-500 block">BMP Readiness:</span>
                <span className="text-emerald-400 font-bold block">{vessel.bmpCompliancePct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
