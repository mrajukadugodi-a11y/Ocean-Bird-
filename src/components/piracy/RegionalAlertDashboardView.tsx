import React, { useState } from 'react';
import { ShieldAlert, Radio, AlertTriangle, Activity, CheckCircle2, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface RegionalThreatSector {
  id: string;
  regionName: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE' | 'LOW';
  activeIncidentsCount: number;
  lastIncidentTime: string;
  navwarnStatus: string;
  primaryRisk: string;
}

const REGIONAL_SECTORS_DATA: RegionalThreatSector[] = [
  {
    id: 'SEC-AUS-01',
    regionName: 'Australia & Torres Strait Sector',
    threatLevel: 'ELEVATED',
    activeIncidentsCount: 3,
    lastIncidentTime: '18 hours ago',
    navwarnStatus: 'AUSNAVWARN 142/26 ACTIVE',
    primaryRisk: 'Unflagged small craft approach in Coral Sea / Thursday Island passage.'
  },
  {
    id: 'SEC-NZ-02',
    regionName: 'New Zealand & Cook Strait Sector',
    threatLevel: 'MODERATE',
    activeIncidentsCount: 1,
    lastIncidentTime: '1 day ago',
    navwarnStatus: 'NZNAVWARN 088/26 ACTIVE',
    primaryRisk: 'Intermittent GNSS variance near subsea power cables.'
  },
  {
    id: 'SEC-PH-03',
    regionName: 'Philippines Sulu & Celebes Sea Sector',
    threatLevel: 'CRITICAL',
    activeIncidentsCount: 14,
    lastIncidentTime: '2 hours ago',
    navwarnStatus: 'NAVAREA XI 0412/26 CRITICAL',
    primaryRisk: 'Armed skiff boarding attempt on feeder vessels near Sibutu Passage.'
  },
  {
    id: 'SEC-VN-04',
    regionName: 'Vietnam & South China Sea Transit Sector',
    threatLevel: 'HIGH',
    activeIncidentsCount: 9,
    lastIncidentTime: '4 hours ago',
    navwarnStatus: 'VIETNAVWARN 201/26 HIGH',
    primaryRisk: 'Nighttime anchorage theft on product tankers off Vung Tau.'
  },
  {
    id: 'SEC-BALTIC-05',
    regionName: 'Baltic Sea & Fehmarn Belt Sector',
    threatLevel: 'HIGH',
    activeIncidentsCount: 8,
    lastIncidentTime: '1 hour ago',
    navwarnStatus: 'BALTICNAVWARN 051/26 ACTIVE',
    primaryRisk: 'AIS spoofing & shadow fleet subsea infrastructure interference.'
  }
];

export const RegionalAlertDashboardView: React.FC = () => {
  const [sectors] = useState<RegionalThreatSector[]>(REGIONAL_SECTORS_DATA);
  const [selectedSector, setSelectedSector] = useState<RegionalThreatSector>(REGIONAL_SECTORS_DATA[0]);

  const getThreatBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">CRITICAL THREAT</span>;
      case 'HIGH':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">HIGH ALERT</span>;
      default:
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold">{level} RISK</span>;
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
            <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Regional Security Alert & NAVWARN Threat Matrix Dashboard</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Real-time regional threat evaluation, NAVAREA broadcasts, and active incident response counters
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold">
          LIVE NAVAREA BROADCAST
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sector Grid */}
        <div className="lg:col-span-2 space-y-2">
          {sectors.map((sec) => (
            <div
              key={sec.id}
              onClick={() => {
                setSelectedSector(sec);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedSector.id === sec.id
                  ? 'bg-slate-950 border-rose-400 ring-1 ring-rose-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <h4 className="text-xs font-bold text-white">{sec.regionName}</h4>
                {getThreatBadge(sec.threatLevel)}
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">ACTIVE INCIDENTS:</span>
                  <span className="text-rose-400 font-bold">{sec.activeIncidentsCount} REPORTS</span>
                </div>
                <div>
                  <span className="text-slate-500 block">LAST REPORTED:</span>
                  <span className="text-slate-300 font-bold">{sec.lastIncidentTime}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">BROADCAST STATUS:</span>
                  <span className="text-cyan-300 font-bold truncate block">{sec.navwarnStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Sector Overview Detail */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-rose-400 font-bold block">{selectedSector.id} SECTOR</span>
              <h4 className="text-xs font-bold text-white">{selectedSector.regionName}</h4>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">NAVWARN BROADCAST:</span>
                <span className="text-cyan-300 font-bold">{selectedSector.navwarnStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">INCIDENTS (30D):</span>
                <span className="text-rose-400 font-bold">{selectedSector.activeIncidentsCount} Verified</span>
              </div>
            </div>

            <div className="bg-rose-950/30 border border-rose-800 p-3 rounded-xl space-y-1 text-[10px] text-rose-300">
              <span className="font-bold block text-rose-400">PRIMARY THREAT EVALUATION:</span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">{selectedSector.primaryRisk}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
