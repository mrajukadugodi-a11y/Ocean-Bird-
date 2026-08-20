import React, { useState } from 'react';
import { Bookmark, Flag, AlertTriangle, ShieldCheck, Sparkles, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TrendMarker {
  id: string;
  year: string;
  month: string;
  title: string;
  type: 'REGULATORY' | 'SECURITY_SPIKE' | 'CLIMATE_MILESTONE' | 'NAVAL_DEPLOYMENT';
  impactDescription: string;
  isKeyMarker: boolean;
}

const TREND_MARKERS: TrendMarker[] = [
  {
    id: 'MK-2022-01',
    year: '2022',
    month: 'FEB',
    title: 'IMO Maritime Security Directive Update',
    type: 'REGULATORY',
    impactDescription: 'Mandatory AIS transmission rules enforced across all commercial vessels >300 GT.',
    isKeyMarker: true
  },
  {
    id: 'MK-2023-04',
    year: '2023',
    month: 'OCT',
    title: 'Red Sea Drone Attack Escalation Milestone',
    type: 'SECURITY_SPIKE',
    impactDescription: 'Global container shipping lines re-route around Cape of Good Hope, adding 12-day transit delays.',
    isKeyMarker: true
  },
  {
    id: 'MK-2024-07',
    year: '2024',
    month: 'JUL',
    title: 'Baltic Sea Record High SST Marine Heatwave',
    type: 'CLIMATE_MILESTONE',
    impactDescription: 'Sea surface temperatures exceed 21.4°C in Fehmarn Belt, triggering toxic algae blooms.',
    isKeyMarker: false
  },
  {
    id: 'MK-2025-11',
    year: '2025',
    month: 'NOV',
    title: 'NATO Baltic Guard Joint Taskforce Launch',
    type: 'NAVAL_DEPLOYMENT',
    impactDescription: '22 naval frigates deployed for continuous escort of energy tankers across Danish Straits.',
    isKeyMarker: true
  }
];

export const TrendMarkersView: React.FC = () => {
  const [markers] = useState<TrendMarker[]>(TREND_MARKERS);
  const [selectedMarker, setSelectedMarker] = useState<TrendMarker>(TREND_MARKERS[1]);

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
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>Maritime Historical Trend Milestone Event Markers</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Key regulatory shifts, naval taskforce deployments, and security escalation milestone markers on the timeline
          </p>
        </div>

        <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] px-2.5 py-1 rounded font-bold">
          4 KEY MILESTONE MARKERS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Timeline Marker List */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
          <div className="space-y-2">
            {markers.map((mk) => (
              <div
                key={mk.id}
                onClick={() => {
                  setSelectedMarker(mk);
                  hapticEngine.trigger('click');
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between space-x-3 ${
                  selectedMarker.id === mk.id
                    ? 'bg-slate-900 border-amber-400 ring-1 ring-amber-400'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="bg-slate-950 text-amber-400 border border-slate-800 px-2 py-1 rounded font-bold text-[9px] flex-shrink-0">
                    {mk.year} {mk.month}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{mk.title}</h4>
                    <span className="text-[9px] text-slate-400 font-sans block mt-0.5">{mk.impactDescription}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-amber-950 text-amber-300 border border-amber-800 flex-shrink-0">
                  {mk.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Marker Detail Card */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-amber-400 font-bold block">{selectedMarker.id}</span>
              <h4 className="text-xs font-bold text-white">{selectedMarker.title}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">
                {selectedMarker.year} {selectedMarker.month} • {selectedMarker.type}
              </span>
            </div>

            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
              {selectedMarker.impactDescription}
            </p>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px] space-y-1">
              <span className="text-slate-500 block">KEY MILESTONE STATUS:</span>
              <span className="text-emerald-400 font-bold">
                {selectedMarker.isKeyMarker ? 'CONFIRMED GLOBAL MARITIME IMPACT' : 'REGIONAL IMPACT'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
