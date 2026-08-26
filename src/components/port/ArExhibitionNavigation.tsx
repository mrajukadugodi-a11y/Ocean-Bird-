import React, { useState } from 'react';
import {
  Navigation,
  Camera,
  Compass,
  Volume2,
  VolumeX,
  Search,
  MapPin,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowUp,
  ArrowRight,
  ArrowLeft,
  Building2,
  Radio
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ExhibitionWaypoint {
  id: string;
  name: string;
  hallLocation: string;
  distanceMeters: number;
  direction: 'STRAIGHT' | 'LEFT' | 'RIGHT';
  estimatedWalkTimeMins: number;
  code: string;
}

const EXHIBITION_WAYPOINTS: ExhibitionWaypoint[] = [
  {
    id: 'WAY-01',
    name: 'Mazagon Dock LNG Tugboat Booth B-104',
    hallLocation: 'Hall 1 Trade Concourse',
    distanceMeters: 24,
    direction: 'LEFT',
    estimatedWalkTimeMins: 1,
    code: 'BOOTH-B104'
  },
  {
    id: 'WAY-02',
    name: 'Main Auditorium - Keynote Stage',
    hallLocation: 'Auditorium Level 2',
    distanceMeters: 65,
    direction: 'STRAIGHT',
    estimatedWalkTimeMins: 2,
    code: 'AUDITORIUM-L2'
  },
  {
    id: 'WAY-03',
    name: 'Pier 2 Floating Sea-Trial Dock',
    hallLocation: 'Outdoor Promenade Pier 2',
    distanceMeters: 140,
    direction: 'RIGHT',
    estimatedWalkTimeMins: 4,
    code: 'PIER-2-DOCK'
  }
];

interface ArExhibitionNavigationProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const ArExhibitionNavigation: React.FC<ArExhibitionNavigationProps> = ({ triggerToast }) => {
  const [selectedWaypoint, setSelectedWaypoint] = useState<ExhibitionWaypoint>(EXHIBITION_WAYPOINTS[0]);
  const [voiceGuide, setVoiceGuide] = useState(true);
  const [isNavigating, setIsNavigating] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const filteredWaypoints = EXHIBITION_WAYPOINTS.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.hallLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Navigation className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">AR Exhibition Floor Indoor Navigation &amp; Wayfinding</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live augmented camera navigation to booth locations, keynote auditoriums, and sea-trial piers with spatial 3D arrows.
            </p>
          </div>

          <button
            onClick={() => {
              setVoiceGuide(!voiceGuide);
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono border transition-all flex items-center space-x-1.5 ${
              voiceGuide
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            {voiceGuide ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            <span>Voice Cues {voiceGuide ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Live AR Navigation Viewport */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/50 bg-slate-950 min-h-[380px] sm:min-h-[440px] shadow-2xl flex flex-col justify-between p-6">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
            alt="AR Camera Feed"
            className="absolute inset-0 w-full h-full object-cover filter brightness-50"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90 pointer-events-none" />

          {/* Top HUD overlay */}
          <div className="relative z-10 flex justify-between items-center">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-400/50 text-xs font-mono text-cyan-300 font-bold flex items-center space-x-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" />
              <span>AR WAYFINDING GPS ACTIVE</span>
            </span>

            <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
              EST. {selectedWaypoint.estimatedWalkTimeMins} MIN WALK ({selectedWaypoint.distanceMeters}M)
            </span>
          </div>

          {/* Center 3D Spatial Directional Arrow */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-3 my-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-400 backdrop-blur-md flex items-center justify-center animate-bounce shadow-2xl">
              {selectedWaypoint.direction === 'LEFT' ? (
                <ArrowLeft className="w-10 h-10 text-cyan-300" />
              ) : selectedWaypoint.direction === 'RIGHT' ? (
                <ArrowRight className="w-10 h-10 text-cyan-300" />
              ) : (
                <ArrowUp className="w-10 h-10 text-cyan-300" />
              )}
            </div>

            <div className="bg-slate-950/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-cyan-400/60 text-center space-y-0.5">
              <span className="text-xs font-mono font-black text-cyan-300 block">
                {selectedWaypoint.direction === 'LEFT'
                  ? 'TURN LEFT IN 10 METERS'
                  : selectedWaypoint.direction === 'RIGHT'
                  ? 'TURN RIGHT IN 15 METERS'
                  : 'CONTINUE STRAIGHT AHEAD'}
              </span>
              <span className="text-sm font-bold text-white block">{selectedWaypoint.name}</span>
            </div>
          </div>

          {/* Bottom Waypoint Selector Bar */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {filteredWaypoints.map((wp) => (
              <button
                key={wp.id}
                onClick={() => {
                  setSelectedWaypoint(wp);
                  hapticEngine.trigger('click');
                  notify(`Target set to ${wp.name}`, 'info', 'AR DESTINATION UPDATED');
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedWaypoint.id === wp.id
                    ? 'bg-cyan-500 text-slate-950 border-white font-bold shadow-lg'
                    : 'bg-slate-950/80 text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-mono block opacity-80">{wp.hallLocation}</span>
                <span className="text-xs font-bold line-clamp-1">{wp.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
