import React, { useState } from 'react';
import { Bell, ShieldAlert, CloudLightning, Thermometer, Waves, Wind, AlertTriangle, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ClimateWidget {
  id: string;
  widgetName: string;
  category: 'EXTREME_SST' | 'CYCLONE_TRACK' | 'WAVE_SURGE' | 'CORAL_BLEACHING';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  region: string;
  valueString: string;
  recommendedBridgeAction: string;
  isActive: boolean;
}

const WIDGETS_DATABASE: ClimateWidget[] = [
  {
    id: 'WGT-01',
    widgetName: 'Super Typhoon Track Corridor Alarm',
    category: 'CYCLONE_TRACK',
    severity: 'CRITICAL',
    region: 'Luzon Strait & Taiwan Gateway',
    valueString: 'Cat 5 • Max Wind 145 kts • Central 915 hPa',
    recommendedBridgeAction: 'Reroute vessel via Surigao Strait; delay arrival by 36 hrs.',
    isActive: true
  },
  {
    id: 'WGT-02',
    widgetName: 'Extreme Sea Temp Anomaly Monitor',
    category: 'EXTREME_SST',
    severity: 'HIGH',
    region: 'Bab-el-Mandeb Strait & Red Sea',
    valueString: 'SST 32.1°C • Anomaly +2.8°C',
    recommendedBridgeAction: 'Monitor main engine cooling strainers; speed limit 18 kts.',
    isActive: true
  },
  {
    id: 'WGT-03',
    widgetName: 'High Ocean Swell Wave Surge Alert',
    category: 'WAVE_SURGE',
    severity: 'HIGH',
    region: 'North Atlantic Grand Banks Corridor',
    valueString: 'Hs 7.2m • Wave Period 15.4s',
    recommendedBridgeAction: 'Secure deck container lashings; ballast hull tanks +1.2m.',
    isActive: true
  },
  {
    id: 'WGT-04',
    widgetName: 'Coral Bleaching Zero-Discharge Geofence',
    category: 'CORAL_BLEACHING',
    severity: 'MODERATE',
    region: 'Great Barrier Reef Outer Passage',
    valueString: 'Bleaching DHW 10.4 °C-weeks',
    recommendedBridgeAction: 'Enforce zero greywater discharge within 24 NM sanctuary bounds.',
    isActive: true
  }
];

export const ClimateAlertWidgetsView: React.FC = () => {
  const [widgets, setWidgets] = useState<ClimateWidget[]>(WIDGETS_DATABASE);
  const [selectedWidget, setSelectedWidget] = useState<ClimateWidget>(WIDGETS_DATABASE[0]);

  const toggleWidget = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w));
    hapticEngine.trigger('click');
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2 py-0.5 rounded font-bold">CRITICAL ALARM</span>;
      case 'HIGH':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2 py-0.5 rounded font-bold">HIGH WARNING</span>;
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
            <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Bridge Modular Climate & Extreme Weather Alert Widgets</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Customizable active telemetry alert cards for super typhoon tracking, extreme sea surface temperatures, and zero-discharge geofencing
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>BRIDGE ALERTS ACTIVE</span>
        </span>
      </div>

      {/* Grid of Alert Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {widgets.map((w) => (
            <div
              key={w.id}
              onClick={() => {
                setSelectedWidget(w);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedWidget.id === w.id
                  ? 'bg-slate-950 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => toggleWidget(w.id, e)}
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      w.isActive ? 'bg-amber-500 border-amber-400' : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    {w.isActive && <span className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
                  </button>
                  <span className="text-[8px] text-amber-400 font-bold">{w.id}</span>
                </div>
                {getSeverityBadge(w.severity)}
              </div>

              <h4 className="text-xs font-bold text-white leading-tight">{w.widgetName}</h4>
              <p className="text-[9px] text-slate-400 font-sans">{w.region} • {w.valueString}</p>
            </div>
          ))}
        </div>

        {/* Selected Widget Detailed Action Protocol */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[8px] text-amber-400 font-bold block">{selectedWidget.id} WIDGET TELEMETRY</span>
              <h4 className="text-sm font-bold text-white">{selectedWidget.widgetName}</h4>
              <span className="text-[10px] text-slate-400 block font-sans">Location: {selectedWidget.region}</span>
            </div>
            {getSeverityBadge(selectedWidget.severity)}
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[9px] text-cyan-400 font-bold block">TELEMETRY VALUES:</span>
            <span className="text-xs font-black text-white block">{selectedWidget.valueString}</span>
          </div>

          <div className="bg-amber-950/30 border border-amber-900/60 p-4 rounded-xl space-y-2">
            <span className="text-[9px] text-amber-400 font-bold block flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>RECOMMENDED BRIDGE ACTION PROTOCOL:</span>
            </span>
            <p className="text-[11px] text-amber-200 font-sans font-bold leading-relaxed">{selectedWidget.recommendedBridgeAction}</p>
          </div>

          <div className="flex justify-between items-center text-[9px] text-slate-400 pt-2 border-t border-slate-900">
            <span>STATUS: <strong className={selectedWidget.isActive ? 'text-emerald-400' : 'text-slate-500'}>
              {selectedWidget.isActive ? 'ALARM ARMED' : 'MUTED'}
            </strong></span>
            <span className="text-cyan-400 font-bold">ECDIS INTERFACE: COMPATIBLE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
