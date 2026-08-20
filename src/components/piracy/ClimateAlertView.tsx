import React, { useState } from 'react';
import { CloudLightning, ShieldAlert, Thermometer, Waves, Wind, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateAlert {
  id: string;
  title: string;
  category: 'HEATWAVE' | 'CYCLONE' | 'WAVE_SURGE' | 'WAVE_SEVERITY' | 'CORAL_BLEACHING';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  region: string;
  coordinates: string;
  timestamp: string;
  impactMetrics: string;
  vesselActionPlan: string;
}

const CLIMATE_ALERTS_DATA: ClimateAlert[] = [
  {
    id: 'ALT-CLM-501',
    title: 'Category 4 Super Typhoon "Mawar" Approach Corridor',
    category: 'CYCLONE',
    severity: 'CRITICAL',
    region: 'Philippine Sea (180 NM East of Luzon)',
    coordinates: '15.4000° N, 124.5000° E',
    timestamp: '12 min ago',
    impactMetrics: 'Max Sustained Winds: 135 Knots • Central Pressure: 920 hPa • Wave Height: 9.5m',
    vesselActionPlan: 'All northbound vessels in Luzon Strait must execute immediate weather avoidance diversion to South China Sea.'
  },
  {
    id: 'ALT-CLM-502',
    title: 'Extreme Marine Heatwave Warning (SST +3.8°C Anomaly)',
    category: 'HEATWAVE',
    severity: 'HIGH',
    region: 'Torres Strait & Northern Great Barrier Reef',
    coordinates: '10.5000° S, 142.3000° E',
    timestamp: '35 min ago',
    impactMetrics: 'SST 31.4°C (+3.8°C above average) • DHW Level: 11.2 °C-weeks',
    vesselActionPlan: 'Reduce vessel speed to 10 knots in reef passage; monitor main engine sea suction strainers for thermal bio-fouling.'
  },
  {
    id: 'ALT-CLM-503',
    title: 'Sudden Sea State Wave Surge (Hs 5.8m)',
    category: 'WAVE_SEVERITY',
    severity: 'HIGH',
    region: 'South Australian Basin / Bass Strait Entry',
    coordinates: '39.1000° S, 144.2000° E',
    timestamp: '1 hour ago',
    impactMetrics: 'Hs: 5.8m • Peak Period: 14.2 sec • Wind Speed: SW 42 Knots',
    vesselActionPlan: 'Tighten container deck lashing turnbuckles; delay pilot boardings at Melbourne approach by 6 hours.'
  },
  {
    id: 'ALT-CLM-504',
    title: 'Level 2 Coral Reef Bleaching Alert',
    category: 'CORAL_BLEACHING',
    severity: 'MODERATE',
    region: 'Sulu Archipelago Protected Reef Sanctuary',
    coordinates: '5.8000° N, 121.2000° E',
    timestamp: '2 hours ago',
    impactMetrics: 'Thermal Stress Index: Level 2 • Bleaching Coverage: 68%',
    vesselActionPlan: 'Zero discharge zone strictly enforced for graywater, sewage, and ballast water exchanges within 12 NM.'
  }
];

export const ClimateAlertView: React.FC = () => {
  const [alerts] = useState<ClimateAlert[]>(CLIMATE_ALERTS_DATA);
  const [selectedAlert, setSelectedAlert] = useState<ClimateAlert>(CLIMATE_ALERTS_DATA[0]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">CRITICAL WARNING</span>;
      case 'HIGH':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">HIGH ALERT</span>;
      default:
        return <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] px-2 py-0.5 rounded font-bold">MODERATE ADVISORY</span>;
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
            <CloudLightning className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Severe Oceanic Climate Risk & Extreme Weather Real-time Alerts</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Tropical cyclone path projections, marine heatwave warnings, wave surge alerts, and vessel rerouting advisories
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold">
          LIVE METEOROLOGICAL TELEMETRY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Alert Stream List */}
        <div className="lg:col-span-2 space-y-2">
          {alerts.map((al) => (
            <div
              key={al.id}
              onClick={() => {
                setSelectedAlert(al);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedAlert.id === al.id
                  ? 'bg-slate-950 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-amber-400 font-bold block">{al.id} • {al.timestamp}</span>
                  <h4 className="text-xs font-bold text-white">{al.title}</h4>
                </div>
                {getSeverityBadge(al.severity)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">AFFECTED REGION:</span>
                  <span className="text-cyan-300 font-bold">{al.region}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">COORDINATES:</span>
                  <span className="text-white font-bold">{al.coordinates}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Alert Details */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-amber-400 font-bold block">{selectedAlert.id} TELEMETRY DOSSIER</span>
              <h4 className="text-xs font-bold text-white">{selectedAlert.title}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedAlert.region}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div>
                <span className="text-slate-500 block">IMPACT METRICS TELEMETRY:</span>
                <span className="text-amber-400 font-bold block">{selectedAlert.impactMetrics}</span>
              </div>
            </div>

            <div className="bg-rose-950/30 border border-rose-800 p-3 rounded-xl text-[10px] text-rose-300 space-y-1">
              <span className="font-bold block text-rose-400 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>MANDATORY VESSEL ACTION PLAN:</span>
              </span>
              <p className="font-sans text-[10px] text-slate-300 leading-relaxed">
                {selectedAlert.vesselActionPlan}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
