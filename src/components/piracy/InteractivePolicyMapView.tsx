import React, { useState } from 'react';
import { Map, Shield, Compass, Scale, Info, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PolicyZone {
  id: string;
  zoneName: string;
  governingBody: string;
  coordinates: string;
  pssaDesignation: boolean;
  speedLimitKnots: number | null;
  sulfurCapPct: number;
  ballastWaterRule: string;
  ispsSecurityLevel: number;
  recentPolicyUpdates: string;
}

const POLICY_ZONES_DATA: PolicyZone[] = [
  {
    id: 'ZONE-TS',
    zoneName: 'Torres Strait & Great Barrier Reef PSSA',
    governingBody: 'AMSA (Australian Maritime Safety Authority)',
    coordinates: '10.2500° S, 142.1667° E',
    pssaDesignation: true,
    speedLimitKnots: 10,
    sulfurCapPct: 0.1,
    ballastWaterRule: 'D-2 BWM System Mandatory + Zero Discharge',
    ispsSecurityLevel: 1,
    recentPolicyUpdates: 'Mandatory 10-knot speed reduction in cetacean migratory zones enforced June-Sept.'
  },
  {
    id: 'ZONE-MS',
    zoneName: 'Malacca & Singapore Strait TSS',
    governingBody: 'Tripartite Straits Committee (SG, MY, ID)',
    coordinates: '1.2902° N, 103.8519° E',
    pssaDesignation: false,
    speedLimitKnots: 12,
    sulfurCapPct: 0.5,
    ballastWaterRule: 'Mandatory D-1 Exchange >200 NM before entry',
    ispsSecurityLevel: 1,
    recentPolicyUpdates: 'Enhanced AIS mandatory broadcast rules and active anti-piracy surface patrols.'
  },
  {
    id: 'ZONE-RS',
    zoneName: 'Southern Red Sea & Bab-el-Mandeb',
    governingBody: 'IMO / Djibouti Code Authority',
    coordinates: '12.5833° N, 43.3333° E',
    pssaDesignation: false,
    speedLimitKnots: null,
    sulfurCapPct: 0.5,
    ballastWaterRule: 'Standard IMO Ballast Regulations',
    ispsSecurityLevel: 3,
    recentPolicyUpdates: 'ISPS Level 3 active. Armed security escort required; high-intensity searchlights at night.'
  },
  {
    id: 'ZONE-BAL',
    zoneName: 'Baltic Sea ECA (Emission Control Area)',
    governingBody: 'HELCOM / European Maritime Safety Agency',
    coordinates: '56.0000° N, 19.0000° E',
    pssaDesignation: true,
    speedLimitKnots: 14,
    sulfurCapPct: 0.1,
    ballastWaterRule: 'Strict D-2 Treatment & Zero Sewage Discharge',
    ispsSecurityLevel: 1,
    recentPolicyUpdates: '0.1% Ultra-Low Sulfur Fuel mandate enforced across all commercial vessel berths.'
  }
];

export const InteractivePolicyMapView: React.FC = () => {
  const [zones] = useState<PolicyZone[]>(POLICY_ZONES_DATA);
  const [selectedZone, setSelectedZone] = useState<PolicyZone>(POLICY_ZONES_DATA[0]);

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
            <Map className="w-4 h-4 text-cyan-400" />
            <span>Interactive Global Maritime Policy & Protected Sea Zones Map</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Inspect environmental ECA rules, PSSA protected zones, ISPS security levels, and speed restriction corridors
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Layers className="w-3 h-3 text-cyan-400" />
          <span>4 GLOBAL ECO ZONES</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map Grid Selection */}
        <div className="lg:col-span-2 space-y-2">
          {zones.map((z) => (
            <div
              key={z.id}
              onClick={() => {
                setSelectedZone(z);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedZone.id === z.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-cyan-400 font-bold block">{z.id} • {z.coordinates}</span>
                  <h4 className="text-xs font-bold text-white">{z.zoneName}</h4>
                </div>
                {z.pssaDesignation && (
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">
                    PSSA PROTECTED
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">GOVERNING BODY:</span>
                  <span className="text-white font-bold">{z.governingBody}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SULFUR CAP:</span>
                  <span className="text-emerald-400 font-bold">{z.sulfurCapPct}% Max</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ISPS LEVEL:</span>
                  <span className={z.ispsSecurityLevel > 1 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    LEVEL {z.ispsSecurityLevel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Zone Deep Specs */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedZone.id} REGULATORY PROFILE</span>
              <h4 className="text-xs font-bold text-white">{selectedZone.zoneName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedZone.governingBody}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">SPEED RESTRICTION:</span>
                <span className="text-emerald-400 font-bold">
                  {selectedZone.speedLimitKnots ? `${selectedZone.speedLimitKnots} Knots Max` : 'Standard Transit'}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1">
                <span className="text-slate-500">BALLAST WATER MANDATE:</span>
                <span className="text-cyan-300 font-bold">{selectedZone.ballastWaterRule}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-1">
                <span className="text-slate-500">MARPOL ECA SULFUR CAP:</span>
                <span className="text-emerald-400 font-bold">{selectedZone.sulfurCapPct}% m/m</span>
              </div>
            </div>

            <div className="bg-cyan-950/30 border border-cyan-800 p-3 rounded-xl text-[10px] text-cyan-300 space-y-1">
              <span className="font-bold block text-cyan-400">ACTIVE COMPLIANCE UPDATE:</span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">{selectedZone.recentPolicyUpdates}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
