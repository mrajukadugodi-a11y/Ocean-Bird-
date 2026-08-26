import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Bell,
  CheckCircle2,
  Users,
  MapPin,
  Sparkles,
  Radio,
  Share2,
  Bookmark,
  Volume2
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ExpoSessionEvent {
  id: string;
  title: string;
  category: 'KEYNOTE' | 'B2B_PANEL' | 'SEA_TRIAL_DEMO' | 'EVENING_GALA';
  speakerName: string;
  speakerRole: string;
  hallLocation: string;
  startTime: string;
  countdownMinutes: number;
  isReminderSet: boolean;
  abstract: string;
}

const EXPO_SCHEDULE_EVENTS: ExpoSessionEvent[] = [
  {
    id: 'EVT-01',
    title: 'Hydrogen & Dual-Fuel Cargo Fleet Transition in South Asia',
    category: 'KEYNOTE',
    speakerName: 'Dr. Vikramaditya Rao',
    speakerRole: 'Director General of Shipping & Maritime Innovation',
    hallLocation: 'Main Auditorium Hall 1',
    startTime: 'Today, 02:00 PM',
    countdownMinutes: 18,
    isReminderSet: true,
    abstract: 'Keynote analysis on zero-emission bunkering infrastructure, battery-hybrid retrofits, and IMO 2028 carbon tax compliance.'
  },
  {
    id: 'EVT-02',
    title: 'Autonomous Sonar Bathymetry & Dredging Drone Fleet Demo',
    category: 'SEA_TRIAL_DEMO',
    speakerName: 'Capt. Sarah Lin',
    speakerRole: 'Head of Port Robotics, SonarTech Global',
    hallLocation: 'Floating Dock Pier 2',
    startTime: 'Today, 03:30 PM',
    countdownMinutes: 108,
    isReminderSet: false,
    abstract: 'Live sea trial demonstration of autonomous 3D multi-beam bathymetry drones scanning harbor depth in real-time.'
  },
  {
    id: 'EVT-03',
    title: 'B2B Maritime Trade & Duty-Free Concession Procurement Panel',
    category: 'B2B_PANEL',
    speakerName: 'Commodore Rajesh Varma',
    speakerRole: 'Chairman, Indian Ports Association',
    hallLocation: 'Executive Boardroom B-2',
    startTime: 'Today, 05:00 PM',
    countdownMinutes: 198,
    isReminderSet: false,
    abstract: 'Closed-door procurement session connecting global luxury duty-free suppliers with port authority concession holders.'
  }
];

interface ExhibitionEventAlertsProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const ExhibitionEventAlerts: React.FC<ExhibitionEventAlertsProps> = ({ triggerToast }) => {
  const [events, setEvents] = useState<ExpoSessionEvent[]>(EXPO_SCHEDULE_EVENTS);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleToggleReminder = (id: string) => {
    setEvents(
      events.map((e) => {
        if (e.id === id) {
          const newState = !e.isReminderSet;
          hapticEngine.trigger('click');
          notify(
            newState ? `Calendar reminder set for ${e.title}` : `Removed reminder for ${e.title}`,
            newState ? 'success' : 'info',
            'EXHIBITION ALARM UPDATED'
          );
          return { ...e, isReminderSet: newState };
        }
        return e;
      })
    );
  };

  const nextUpcomingEvent = events[0];

  const filteredEvents =
    filterCategory === 'ALL'
      ? events
      : events.filter((e) => e.category === filterCategory);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Exhibition Live Event Alerts &amp; Keynote Schedule</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time countdown timers, speaker briefs, and automated phone calendar reminders for trade expo sessions.
            </p>
          </div>

          <button
            onClick={() => {
              hapticEngine.trigger('alert');
              notify(
                'Simulated Live Push Alert: Keynote starting in 15 Mins in Auditorium Hall 1!',
                'warning',
                'EXPO ALERT DISPATCHED'
              );
            }}
            className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black font-mono text-xs shadow-lg flex items-center space-x-1.5"
          >
            <Radio className="w-3.5 h-3.5 animate-ping" />
            <span>Simulate Keynote Alert</span>
          </button>
        </div>

        {/* Live Countdown Banner for Next Event */}
        {nextUpcomingEvent && (
          <div className="bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 p-6 rounded-3xl border-2 border-amber-500/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-black tracking-widest block">
                NEXT LIVE KEYNOTE SESSION
              </span>
              <h3 className="text-base font-bold text-white">{nextUpcomingEvent.title}</h3>
              <p className="text-xs font-mono text-slate-400">
                {nextUpcomingEvent.speakerName} • {nextUpcomingEvent.hallLocation}
              </p>
            </div>

            <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shrink-0">
              <div className="text-center">
                <span className="text-2xl font-black font-mono text-amber-400 animate-pulse">
                  {nextUpcomingEvent.countdownMinutes}
                </span>
                <span className="text-[10px] font-mono text-slate-400 block">MINS LEFT</span>
              </div>

              <button
                onClick={() => handleToggleReminder(nextUpcomingEvent.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  nextUpcomingEvent.isReminderSet
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-amber-500 text-slate-950 font-black'
                }`}
              >
                {nextUpcomingEvent.isReminderSet ? '✓ Reminder Active' : 'Set Alarm'}
              </button>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ALL', label: 'All Expo Events' },
            { id: 'KEYNOTE', label: 'Keynotes' },
            { id: 'SEA_TRIAL_DEMO', label: 'Sea Trials' },
            { id: 'B2B_PANEL', label: 'B2B Panels' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                filterCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Event Schedule Cards */}
        <div className="space-y-3">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                    {evt.category.replace('_', ' ')}
                  </span>
                  <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{evt.startTime}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{evt.abstract}</p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pt-1">
                <span className="text-slate-400">{evt.speakerName} ({evt.speakerRole})</span>

                <button
                  onClick={() => handleToggleReminder(evt.id)}
                  className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center space-x-1"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>{evt.isReminderSet ? 'Reminder Set' : 'Set Reminder'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
