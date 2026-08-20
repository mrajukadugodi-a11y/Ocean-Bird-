import React, { useState } from 'react';
import { Map, AlertTriangle, ShieldCheck, Eye, Layers, Compass, Globe, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ImpactZone {
  id: string;
  zoneName: string;
  region: string;
  primaryRiskType: 'PORT_INUNDATION' | 'CORAL_BLEACHING' | 'CHOKEPOINT_BOTTLENECK' | 'ARCTIC_ICE_MELT';
  vulnerabilityScore: number; // 1-100
  projectedYear2030Impact: string;
  mitigationStrategy: string;
  affectedVesselCount: number;
}

const IMPACT_ZONES_DATA: ImpactZone[] = [
  {
    id: 'IZ-01',
    zoneName: 'Strait of Malacca Coastal Lowlands',
    region: 'Southeast Asia Transit Corridor',
    primaryRiskType: 'PORT_INUNDATION',
    vulnerabilityScore: 88,
    projectedYear2030Impact: '35cm sea level rise risking berth inundation at Port Klang and Tanjung Pelepas during high spring tides.',
    mitigationStrategy: 'Elevate container quay cranes +2.5m; install sea wall surge gates.',
    affectedVesselCount: 1420
  },
  {
    id: 'IZ-02',
    zoneName: 'Coral Triangle Reef Barrier',
    region: 'Sulu-Sulawesi Basin & Coral Sea',
    primaryRiskType: 'CORAL_BLEACHING',
    vulnerabilityScore: 94,
    projectedYear2030Impact: 'Thermal marine heatwaves causing 70% coral bleaching, destroying natural wave attenuation barriers.',
    mitigationStrategy: 'Enforce mandatory speed reductions (10 kts) to minimize wake erosion.',
    affectedVesselCount: 480
  },
  {
    id: 'IZ-03',
    zoneName: 'Suez Canal Southern Gate (Gulf of Suez)',
    region: 'Red Sea Chokepoint',
    primaryRiskType: 'CHOKEPOINT_BOTTLENECK',
    vulnerabilityScore: 82,
    projectedYear2030Impact: 'Increased dust storm frequency and 45kt crosswinds causing transit delays and grounding hazards.',
    mitigationStrategy: 'Deploy tugboat escorts for ULCS (Ultra Large Container Ships) >18,000 TEU.',
    affectedVesselCount: 2100
  }
];

export const ImpactPredictionMapView: React.FC = () => {
  const [impactZones] = useState<ImpactZone[]>(IMPACT_ZONES_DATA);
  const [selectedZone, setSelectedZone] = useState<ImpactZone>(IMPACT_ZONES_DATA[0]);

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
            <Map className="w-4 h-4 text-rose-400" />
            <span>Geospatial Climate Impact Prediction & Bottleneck Risk Map</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Predictive mapping of port inundation hazards, coral bleaching loss, and chokepoint transit disruptions for 2030 horizon
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Globe className="w-3.5 h-3.5 text-rose-400" />
          <span>GIS IMPACT MODEL 2030</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Zone Selector */}
        <div className="lg:col-span-1 space-y-2">
          {impactZones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => {
                setSelectedZone(zone);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedZone.id === zone.id
                  ? 'bg-slate-950 border-rose-400 ring-1 ring-rose-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-rose-400 font-bold">{zone.id}</span>
                <span className="bg-rose-950 text-rose-300 border border-rose-900 text-[8px] px-2 py-0.5 rounded font-bold">
                  RISK SCORE: {zone.vulnerabilityScore}/100
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{zone.zoneName}</h4>
              <p className="text-[9px] text-slate-400 font-sans">{zone.region}</p>
            </div>
          ))}
        </div>

        {/* Selected Impact Zone Detail Dossier */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[8px] text-rose-400 font-bold block">{selectedZone.id} GEOSPATIAL IMPACT FORECAST</span>
              <h4 className="text-sm font-bold text-white">{selectedZone.zoneName}</h4>
              <span className="text-[10px] text-slate-400 block font-sans">{selectedZone.region}</span>
            </div>
            <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold">
              VULNERABILITY: {selectedZone.vulnerabilityScore}/100
            </span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[9px] text-amber-400 font-bold block flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>PROJECTED 2030 CLIMATE IMPACT:</span>
            </span>
            <p className="text-[11px] text-slate-200 font-sans leading-relaxed">{selectedZone.projectedYear2030Impact}</p>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-900/60 p-4 rounded-xl space-y-2">
            <span className="text-[9px] text-emerald-400 font-bold block flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>RECOMMENDED INFRASTRUCTURE MITIGATION:</span>
            </span>
            <p className="text-[11px] text-emerald-200 font-sans font-bold leading-relaxed">{selectedZone.mitigationStrategy}</p>
          </div>

          <div className="flex justify-between items-center text-[9px] text-slate-400 pt-2 border-t border-slate-900">
            <span>COMMERCIAL FLEET IMPACT: <strong className="text-white">{selectedZone.affectedVesselCount} Transiting Vessels / Month</strong></span>
            <span className="text-rose-400 font-bold">GEOSPATIAL GEOFENCE: ACTIVE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
