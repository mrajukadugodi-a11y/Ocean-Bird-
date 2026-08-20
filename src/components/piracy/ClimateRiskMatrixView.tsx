import React, { useState } from 'react';
import { CloudRain, Wind, Waves, Thermometer, ShieldAlert, AlertTriangle, CheckCircle2, Globe } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateRiskZone {
  id: string;
  zoneName: string;
  seaStateBeaufort: string;
  waveHeightMeters: string;
  cycloneMonsoonRisk: 'EXTREME' | 'HIGH' | 'MODERATE' | 'LOW';
  carbonEmissionFactor: string;
  piracyThreatOverlap: string;
}

const SAMPLE_ZONES: ClimateRiskZone[] = [
  {
    id: 'CLIM-01',
    zoneName: 'Arabian Sea South-West Monsoon Corridor',
    seaStateBeaufort: 'Force 7 - High Seas',
    waveHeightMeters: '4.5m - 6.0m Waves',
    cycloneMonsoonRisk: 'HIGH',
    carbonEmissionFactor: '+18% Fuel Resistance',
    piracyThreatOverlap: 'Reduced Skiff Activity (High Sea State Barrier)'
  },
  {
    id: 'CLIM-02',
    zoneName: 'South China Sea Typhoon Belt (Luzon Strait)',
    seaStateBeaufort: 'Force 9 - Heavy Gale',
    waveHeightMeters: '7.0m - 9.5m Swells',
    cycloneMonsoonRisk: 'EXTREME',
    carbonEmissionFactor: '+32% Heavy Weather Resistance',
    piracyThreatOverlap: 'Zero Small Craft Operating'
  },
  {
    id: 'CLIM-03',
    zoneName: 'Gulf of Guinea Tropical Squall Zone',
    seaStateBeaufort: 'Force 4 - Moderate Breeze',
    waveHeightMeters: '1.5m Calm Waters',
    cycloneMonsoonRisk: 'MODERATE',
    carbonEmissionFactor: 'Normal Engine Baseline',
    piracyThreatOverlap: 'CRITICAL HIGH RISK (Calm Sea Favors Skiffs)'
  }
];

export const ClimateRiskMatrixView: React.FC = () => {
  const [zones, setZones] = useState<ClimateRiskZone[]>(SAMPLE_ZONES);
  const [selectedZone, setSelectedZone] = useState<ClimateRiskZone>(SAMPLE_ZONES[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <CloudRain className="w-4 h-4 text-cyan-400" />
            <span>Global Ocean Climate Risk Matrix & Sea State Security Correlation</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Cross-reference Beaufort sea force states, wave swell heights, cyclone weather risks, and piracy skiff feasibility
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          CLIMATE MATRIX ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {zones.map((z) => (
          <div
            key={z.id}
            onClick={() => {
              setSelectedZone(z);
              hapticEngine.trigger('click');
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              selectedZone.id === z.id
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{z.id}</span>
                <h4 className="text-xs font-bold text-white">{z.zoneName}</h4>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                z.cycloneMonsoonRisk === 'EXTREME'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : z.cycloneMonsoonRisk === 'HIGH'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                RISK: {z.cycloneMonsoonRisk}
              </span>
            </div>

            <div className="space-y-1 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Sea State:</span>
                <span className="text-slate-200 font-bold">{z.seaStateBeaufort}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Wave Height:</span>
                <span className="text-cyan-300 font-bold">{z.waveHeightMeters}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 mt-2 text-[8px] font-mono">
                <span className="text-amber-400 block font-bold">Piracy Overlap Impact:</span>
                <span className="text-slate-300 block">{z.piracyThreatOverlap}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
