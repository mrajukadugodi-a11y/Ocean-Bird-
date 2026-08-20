import React, { useState } from 'react';
import { ArrowUpDown, ShieldAlert, Filter, Clock, MapPin, AlertTriangle, CheckCircle2, Radio, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface AlertItem {
  id: string;
  title: string;
  category: 'PIRACY' | 'WEATHER' | 'SPECIES' | 'MARPOL';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'ADVISORY';
  distanceNM: number;
  timestamp: string;
  timestampMinutesAgo: number;
  region: string;
  coordinates: string;
  summary: string;
}

const ALERT_FEED_DATA: AlertItem[] = [
  {
    id: 'ALT-SORT-01',
    title: 'High-Speed Skiff Approach Detected',
    category: 'PIRACY',
    severity: 'CRITICAL',
    distanceNM: 14.2,
    timestamp: '5 min ago',
    timestampMinutesAgo: 5,
    region: 'Gulf of Aden (30 NM South of Mukalla)',
    coordinates: '13.8000° N, 48.9000° E',
    summary: 'Two unflagged fast skiffs armed with ladder rigs closing distance at 28 knots. Citadel protocol standby.'
  },
  {
    id: 'ALT-SORT-02',
    title: 'Category 4 Super Typhoon "Mawar" Approach',
    category: 'WEATHER',
    severity: 'CRITICAL',
    distanceNM: 120.0,
    timestamp: '15 min ago',
    timestampMinutesAgo: 15,
    region: 'Philippine Sea Basin',
    coordinates: '15.4000° N, 124.5000° E',
    summary: 'Max sustained winds 135 knots. Waves 9.5m. Recommended immediate course diversion west.'
  },
  {
    id: 'ALT-SORT-03',
    title: 'Humpback Whale Mother & Calf Pod In Transit',
    category: 'SPECIES',
    severity: 'MODERATE',
    distanceNM: 4.8,
    timestamp: '2 min ago',
    timestampMinutesAgo: 2,
    region: 'Torres Strait Marine Park',
    coordinates: '10.2500° S, 142.1667° E',
    summary: 'Cetacean sonar detection on bow starboard. Mandatory speed reduction to 10 knots in effect.'
  },
  {
    id: 'ALT-SORT-04',
    title: 'EU BWM D-2 Ballast Disinfection Audit Zone',
    category: 'MARPOL',
    severity: 'ADVISORY',
    distanceNM: 45.0,
    timestamp: '40 min ago',
    timestampMinutesAgo: 40,
    region: 'Baltic Sea ECA Coastal Belt',
    coordinates: '56.0000° N, 19.0000° E',
    summary: 'Port State Control active UV ballast log inspection mandatory prior to berth docking.'
  }
];

export const SmartAlertSortingView: React.FC = () => {
  const [alerts] = useState<AlertItem[]>(ALERT_FEED_DATA);
  const [sortBy, setSortBy] = useState<'SEVERITY' | 'DISTANCE' | 'TIME'>('SEVERITY');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const getSeverityScore = (sev: string) => {
    switch (sev) {
      case 'CRITICAL': return 4;
      case 'HIGH': return 3;
      case 'MODERATE': return 2;
      default: return 1;
    }
  };

  const filteredAlerts = alerts.filter(a =>
    selectedCategory === 'ALL' ? true : a.category === selectedCategory
  );

  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (sortBy === 'SEVERITY') {
      return getSeverityScore(b.severity) - getSeverityScore(a.severity);
    } else if (sortBy === 'DISTANCE') {
      return a.distanceNM - b.distanceNM;
    } else {
      return a.timestampMinutesAgo - b.timestampMinutesAgo;
    }
  });

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
            <ArrowUpDown className="w-4 h-4 text-emerald-400" />
            <span>Smart Real-Time Multi-Hazard Alert Sorting & Triage Engine</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Intelligent sorting by threat severity, proximity distance, real-time timestamp, and maritime danger category
          </p>
        </div>

        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>TRIAGE ACTIVE</span>
        </span>
      </div>

      {/* Controls Bar: Sort Buttons & Filter Category */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-[9px] text-slate-500 font-bold">SORT BY:</span>
          {[
            { id: 'SEVERITY', label: 'SEVERITY' },
            { id: 'DISTANCE', label: 'CLOSEST DISTANCE' },
            { id: 'TIME', label: 'NEWEST' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSortBy(s.id as any);
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-xl text-[9px] font-bold transition-all ${
                sortBy === s.id
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Filter Category */}
        <div className="flex items-center space-x-2">
          <span className="text-[9px] text-slate-500 font-bold">CATEGORY:</span>
          {['ALL', 'PIRACY', 'WEATHER', 'SPECIES', 'MARPOL'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                hapticEngine.trigger('click');
              }}
              className={`px-2 py-0.5 rounded-lg text-[8px] font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sorted Alert Items List */}
      <div className="space-y-3">
        {sortedAlerts.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-emerald-500/50 transition-all"
          >
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <div className="flex items-center space-x-2">
                <span className={`text-[8px] px-2 py-0.5 rounded font-bold ${
                  item.severity === 'CRITICAL'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : item.severity === 'HIGH'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                }`}>
                  {item.severity}
                </span>
                <span className="text-[9px] font-bold text-slate-400">{item.id}</span>
              </div>

              <div className="flex items-center space-x-3 text-[9px] text-slate-400">
                <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                  <MapPin className="w-3 h-3" />
                  <span>{item.distanceNM} NM AWAY</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.timestamp}</span>
                </span>
              </div>
            </div>

            <h4 className="text-xs font-bold text-white">{item.title}</h4>
            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{item.summary}</p>

            <div className="flex justify-between items-center pt-1 text-[9px] text-slate-500 border-t border-slate-900">
              <span>{item.region} ({item.coordinates})</span>
              <button
                onClick={() => hapticEngine.trigger('click')}
                className="bg-slate-900 text-cyan-300 border border-slate-800 px-2 py-0.5 rounded font-bold hover:bg-slate-800"
              >
                BROADCAST TO FLEET
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
