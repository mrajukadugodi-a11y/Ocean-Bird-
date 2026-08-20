import React, { useState } from 'react';
import { Bell, Radio, Volume2, VolumeX, ShieldAlert, CheckCircle2, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';
import { maritimeAlarmSynth } from '../MarinePiracyAlertView';

export interface RegionalAlertChannel {
  id: string;
  regionName: string;
  subSector: string;
  enabled: boolean;
  alertPriority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  activeThreatCount: number;
  lastBroadcastTime: string;
}

const REGIONAL_CHANNELS: RegionalAlertChannel[] = [
  {
    id: 'ALERT-AUS-01',
    regionName: 'Australia Reef & Torres Strait Watch',
    subSector: 'Torres Strait Passage & Coral Sea Patrol',
    enabled: true,
    alertPriority: 'MEDIUM',
    activeThreatCount: 2,
    lastBroadcastTime: '5 min ago'
  },
  {
    id: 'ALERT-NZ-02',
    regionName: 'New Zealand Cook Strait Channel',
    subSector: 'Hauraki Gulf & Wellington Shipping Corridor',
    enabled: true,
    alertPriority: 'MEDIUM',
    activeThreatCount: 1,
    lastBroadcastTime: '18 min ago'
  },
  {
    id: 'ALERT-PHIL-03',
    regionName: 'Philippines Sulu & Celebes Sea Patrol',
    subSector: 'Sibutu Passage & Basilan Strait Sector',
    enabled: true,
    alertPriority: 'CRITICAL',
    activeThreatCount: 9,
    lastBroadcastTime: '3 min ago'
  },
  {
    id: 'ALERT-VIET-04',
    regionName: 'Vietnam Vung Tau & South China Sea Corridor',
    subSector: 'Vung Tau Anchorage & Tonkin Outer Approach',
    enabled: true,
    alertPriority: 'HIGH',
    activeThreatCount: 5,
    lastBroadcastTime: '7 min ago'
  },
  {
    id: 'ALERT-BALTIC-05',
    regionName: 'Baltic Sea & Danish Straits Zone',
    subSector: 'Fehmarn Belt & Bornholm Cable Corridor',
    enabled: true,
    alertPriority: 'CRITICAL',
    activeThreatCount: 6,
    lastBroadcastTime: '2 min ago'
  },
  {
    id: 'ALERT-GUINEA-06',
    regionName: 'Gulf of Guinea Delta Sector',
    subSector: 'Offshore Bonny Fairway',
    enabled: true,
    alertPriority: 'CRITICAL',
    activeThreatCount: 8,
    lastBroadcastTime: '12 min ago'
  },
  {
    id: 'ALERT-REDSEA-07',
    regionName: 'Bab-el-Mandeb & Southern Red Sea',
    subSector: 'Hodeidah Approach Corridor',
    enabled: true,
    alertPriority: 'HIGH',
    activeThreatCount: 14,
    lastBroadcastTime: '1 min ago'
  },
  {
    id: 'ALERT-MALACCA-08',
    regionName: 'Singapore & Malacca Strait',
    subSector: 'Eastbound TSS Lane',
    enabled: false,
    alertPriority: 'MEDIUM',
    activeThreatCount: 3,
    lastBroadcastTime: '45 min ago'
  }
];

export const RegionalAlertToggleView: React.FC = () => {
  const [channels, setChannels] = useState<RegionalAlertChannel[]>(REGIONAL_CHANNELS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleChannel = (id: string) => {
    hapticEngine.trigger('click');
    if (soundEnabled) {
      maritimeAlarmSynth.playSonarPing();
    }

    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
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
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Regional Security Alert Channel Broadcast Toggles</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Configure live satellite security push broadcasts, audible sonar alerts, and regional threat channel feeds
          </p>
        </div>

        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            hapticEngine.trigger('click');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center space-x-1.5 ${
            soundEnabled
              ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
              : 'bg-slate-950 text-slate-500 border-slate-800'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          <span>{soundEnabled ? 'AUDIBLE ALERTS ON' : 'MUTED'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {channels.map((ch) => (
          <div
            key={ch.id}
            className={`p-4 rounded-2xl border transition-all space-y-3 ${
              ch.enabled
                ? 'bg-slate-950 border-cyan-500/50 shadow-lg'
                : 'bg-slate-950/50 border-slate-800 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{ch.id}</span>
                <h4 className="text-xs font-bold text-white">{ch.regionName}</h4>
                <span className="text-[9px] text-slate-400 block font-sans">{ch.subSector}</span>
              </div>

              <button
                onClick={() => toggleChannel(ch.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  ch.enabled ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-slate-950 transition-transform ${
                    ch.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono font-sans">
              <span className={`px-2 py-0.5 rounded font-bold ${
                ch.alertPriority === 'CRITICAL'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                PRIORITY: {ch.alertPriority}
              </span>

              <span className="text-slate-400 font-mono">
                {ch.activeThreatCount} Active Alerts • Broadcast: {ch.lastBroadcastTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
