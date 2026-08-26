import React, { useState } from 'react';
import {
  BellRing,
  Megaphone,
  Sparkles,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Radio,
  Sliders,
  Send,
  Trash2,
  BellOff
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ExhibitionAlertNotification {
  id: string;
  category: 'B2B_MATCHMAKING' | 'KEYNOTE_SCHEDULE' | 'BOOTH_DEMO' | 'VIP_NETWORKING' | 'EXHIBITION_UPDATE';
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  actionUrlTab?: string;
  urgent?: boolean;
}

const INITIAL_EXHIBITION_NOTIFS: ExhibitionAlertNotification[] = [
  {
    id: 'EXALT-01',
    category: 'B2B_MATCHMAKING',
    title: 'B2B Match: Baltic Freight Logistics Procurement',
    body: 'Baltic Freight (Lounge B) accepted your meeting request regarding 40ft Hybrid Container Fleet.',
    time: '5 mins ago',
    isRead: false,
    urgent: true
  },
  {
    id: 'EXALT-02',
    category: 'KEYNOTE_SCHEDULE',
    title: 'Starting in 15 Mins: Green Shipbuilding Keynote',
    body: 'Main Auditorium Hall 1 - "Hydrogen & LNG Dual-Fuel Vessel Transition in South Asian Waters".',
    time: '15 mins ago',
    isRead: false
  },
  {
    id: 'EXALT-03',
    category: 'BOOTH_DEMO',
    title: 'Live Hydrofoil Sea Trial at Pier 2 Dock',
    body: 'OceanNav Robotics is launching their autonomous hydrofoil drone demonstration. VIP Seats open.',
    time: '1 hour ago',
    isRead: true
  },
  {
    id: 'EXALT-04',
    category: 'VIP_NETWORKING',
    title: 'Captain & Merchant Commodore Evening Gala Invitation',
    body: 'Exclusive VIP networking cocktail event tonight 07:00 PM at Sunset Promenade Deck.',
    time: '2 hours ago',
    isRead: true
  }
];

interface ExhibitionNotificationHubProps {
  onNavigateTab?: (tab: string) => void;
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const ExhibitionNotificationHub: React.FC<ExhibitionNotificationHubProps> = ({
  onNavigateTab,
  triggerToast
}) => {
  const [notifs, setNotifs] = useState<ExhibitionAlertNotification[]>(INITIAL_EXHIBITION_NOTIFS);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [b2bMatchesEnabled, setB2bMatchesEnabled] = useState(true);
  const [keynotesEnabled, setKeynotesEnabled] = useState(true);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleMarkAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, isRead: true })));
    hapticEngine.trigger('click');
    notify('All exhibition notifications marked as read.', 'info', 'NOTIFICATIONS READ');
  };

  const handleSimulateNewAlert = () => {
    hapticEngine.trigger('alert');
    const newAlert: ExhibitionAlertNotification = {
      id: `EXALT-${Date.now()}`,
      category: 'B2B_MATCHMAKING',
      title: 'New B2B Inquiry: Mazagon Dock LNG Division',
      body: 'Booth B-104 requested your technical specs for 3D Sonar Hydrographic Survey Systems.',
      time: 'Just Now',
      isRead: false,
      urgent: true
    };
    setNotifs([newAlert, ...notifs]);
    notify(newAlert.title, 'success', 'LIVE EXHIBITION PUSH ALERT');
  };

  const filteredNotifs =
    filterCategory === 'ALL'
      ? notifs
      : notifs.filter((n) => n.category === filterCategory);

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BellRing className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Exhibition &amp; B2B Live Notification Hub</h2>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-xs font-bold animate-pulse">
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time B2B match alerts, keynote countdowns, booth live sea trial demos, and executive gala invites.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSimulateNewAlert}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-xs shadow-lg flex items-center space-x-1.5 transition-all"
            >
              <Radio className="w-3.5 h-3.5 text-slate-950 animate-ping" />
              <span>Simulate B2B Alert</span>
            </button>

            <button
              onClick={handleMarkAllRead}
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 flex items-center space-x-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mark All Read</span>
            </button>
          </div>
        </div>

        {/* Subscription Channels Settings Bar */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={b2bMatchesEnabled}
              onChange={(e) => setB2bMatchesEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-800"
            />
            <span className="text-slate-200 font-bold">B2B Matchmaking Push</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={keynotesEnabled}
              onChange={(e) => setKeynotesEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-800"
            />
            <span className="text-slate-200 font-bold">Keynote Stage Reminders</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={soundAlerts}
              onChange={(e) => setSoundAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-800"
            />
            <span className="text-slate-200 font-bold">Expo Audio Chime Alerts</span>
          </label>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ALL', label: 'All Alerts' },
            { id: 'B2B_MATCHMAKING', label: 'B2B Matchmaking' },
            { id: 'KEYNOTE_SCHEDULE', label: 'Keynote Reminders' },
            { id: 'BOOTH_DEMO', label: 'Booth Demos' },
            { id: 'VIP_NETWORKING', label: 'VIP Networking' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                filterCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notifications Feed */}
        <div className="space-y-3">
          {filteredNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition-all space-y-2 ${
                !n.isRead
                  ? 'bg-cyan-950/20 border-cyan-500/40 shadow-lg'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full ${
                      n.category === 'B2B_MATCHMAKING'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : n.category === 'KEYNOTE_SCHEDULE'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : n.category === 'BOOTH_DEMO'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {n.category.replace('_', ' ')}
                  </span>
                  {n.urgent && (
                    <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-500/30">
                      URGENT ACTION
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-white">{n.title}</h4>
                </div>

                <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{n.time}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
