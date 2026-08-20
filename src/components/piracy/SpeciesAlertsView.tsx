import React, { useState } from 'react';
import { ShieldAlert, Fish, Radio, AlertCircle, MapPin, Volume2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ProtectedSpeciesAlert {
  id: string;
  speciesName: string;
  region: string;
  alertType: 'WHALE_COLLISION_RISK' | 'DOLPHIN_ACOUSTIC_WARNING' | 'TURTLE_NESTING_ZONE' | 'PORPOISE_SONAR_RESTRICTION';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  timestamp: string;
  distanceNauticalMiles: number;
  recommendedAction: string;
  hydrophoneDetectedFrequency: string;
}

const SPECIES_ALERTS_DATA: ProtectedSpeciesAlert[] = [
  {
    id: 'ALT-SPEC-101',
    speciesName: 'Blue Whale Pod (2 Adults + 1 Calf)',
    region: 'Torres Strait (12 NM East of Thursday Island)',
    alertType: 'WHALE_COLLISION_RISK',
    severity: 'CRITICAL',
    timestamp: '8 min ago',
    distanceNauticalMiles: 3.4,
    recommendedAction: 'Reduce vessel speed to 10 knots immediately. Alter course 15° Port to clear migratory channel.',
    hydrophoneDetectedFrequency: '25 Hz Low-Frequency Pulsed Vocalization'
  },
  {
    id: 'ALT-SPEC-102',
    speciesName: 'Hector\'s Dolphin Pod',
    region: 'Banks Peninsula (New Zealand South Island)',
    alertType: 'DOLPHIN_ACOUSTIC_WARNING',
    severity: 'HIGH',
    timestamp: '22 min ago',
    distanceNauticalMiles: 5.1,
    recommendedAction: 'Deactivate active high-frequency echo sounders & sonar arrays. Maintain visual lookout.',
    hydrophoneDetectedFrequency: '130 kHz Ultrasonic Click Train'
  },
  {
    id: 'ALT-SPEC-103',
    speciesName: 'Irrawaddy Dolphin Population Cluster',
    region: 'Malampaya Sound (Palawan, Philippines)',
    alertType: 'DOLPHIN_ACOUSTIC_WARNING',
    severity: 'CRITICAL',
    timestamp: '45 min ago',
    distanceNauticalMiles: 1.8,
    recommendedAction: 'Shallow sound estuary warning. Zero-discharge zone active and maximum 7-knot speed limit.',
    hydrophoneDetectedFrequency: 'Echo clicks & whistles'
  },
  {
    id: 'ALT-SPEC-104',
    speciesName: 'Green Sea Turtle Migratory Fleet',
    region: 'Con Dao Archipelago Approach (Vietnam)',
    alertType: 'TURTLE_NESTING_ZONE',
    severity: 'MODERATE',
    timestamp: '1 hour ago',
    distanceNauticalMiles: 8.2,
    recommendedAction: 'Dim exterior deck searchlights facing seaward to prevent disorienting nesting turtles.',
    hydrophoneDetectedFrequency: 'Propeller cavitating acoustic feedback'
  }
];

export const SpeciesAlertsView: React.FC = () => {
  const [alerts] = useState<ProtectedSpeciesAlert[]>(SPECIES_ALERTS_DATA);
  const [selectedAlert, setSelectedAlert] = useState<ProtectedSpeciesAlert>(SPECIES_ALERTS_DATA[0]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">CRITICAL PROXIMITY</span>;
      case 'HIGH':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">HIGH ALERT</span>;
      default:
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">MODERATE WARNING</span>;
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
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Protected Marine Species Real-time Proximity & Acoustic Alerts</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Hydrophone buoy telemetry, whale collision risk telemetry, and vessel speed reduction directives
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold">
          LIVE HYDROPHONE TELEMETRY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Alert List */}
        <div className="lg:col-span-2 space-y-2 max-h-96 overflow-y-auto pr-1">
          {alerts.map((al) => (
            <div
              key={al.id}
              onClick={() => {
                setSelectedAlert(al);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedAlert.id === al.id
                  ? 'bg-slate-950 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-emerald-400 font-bold block">{al.id} • {al.timestamp}</span>
                  <h4 className="text-xs font-bold text-white">{al.speciesName}</h4>
                </div>
                {getSeverityBadge(al.severity)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">LOCATION:</span>
                  <span className="text-cyan-300 font-bold">{al.region}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PROXIMITY DISTANCE:</span>
                  <span className="text-rose-400 font-bold">{al.distanceNauticalMiles} NM from Hull</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Alert Detailed Directives */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-emerald-400 font-bold block">{selectedAlert.id} TELEMETRY</span>
              <h4 className="text-xs font-bold text-white">{selectedAlert.speciesName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedAlert.region}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div>
                <span className="text-slate-500 block">HYDROPHONE ACOUSTIC SIGNATURE:</span>
                <span className="text-cyan-300 font-bold">{selectedAlert.hydrophoneDetectedFrequency}</span>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <span className="text-slate-500 block">ESTIMATED PROXIMITY:</span>
                <span className="text-rose-400 font-bold">{selectedAlert.distanceNauticalMiles} NM</span>
              </div>
            </div>

            <div className="bg-rose-950/30 border border-rose-800 p-3 rounded-xl text-[10px] text-rose-300 space-y-1">
              <span className="font-bold block text-rose-400">MANDATORY VESSEL ACTION DIRECTIVE:</span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">{selectedAlert.recommendedAction}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
