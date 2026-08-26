import React, { useState } from 'react';
import {
  Bell,
  BellRing,
  Zap,
  Tag,
  Users,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Sliders,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Send
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PushNotificationItem {
  id: string;
  title: string;
  body: string;
  category: 'FLASH_DEAL' | 'EXPO_KEYNOTE' | 'CROWD_ALERT' | 'PORT_SAFETY' | 'PARKING';
  time: string;
  read: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  actionTab?: string;
}

const INITIAL_PUSH_NOTIFS: PushNotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: '⚡ FLASH SALE: 50% Off Duty-Free Perfumes & Electronics',
    body: 'Royal Ocean Duty-Free Level 2 has launched a 30-minute flash clearance sale. Scan Duty-Free QR code at checkout!',
    category: 'FLASH_DEAL',
    time: '2 mins ago',
    read: false,
    priority: 'HIGH',
    actionTab: 'SHOPPING'
  },
  {
    id: 'NOTIF-02',
    title: '🎤 Keynote Alert: Autonomous Hydrofoil Drones Presentation',
    body: 'Dr. Aris Thorne is speaking in Exhibition Hall 1 Main Stage in 10 minutes. Fast-track VIP QR pass recommended.',
    category: 'EXPO_KEYNOTE',
    time: '15 mins ago',
    read: false,
    priority: 'HIGH',
    actionTab: 'EXPOS'
  },
  {
    id: 'NOTIF-03',
    title: '🅿️ Parking Update: Level B2 EV Charging Spots Available',
    body: '14 fast-charging EV bays are currently vacant in Pier Multi-Story Parking Level B2. Free 3-hr validation for resident pass holders.',
    category: 'PARKING',
    time: '45 mins ago',
    read: true,
    priority: 'MEDIUM',
    actionTab: 'RESIDENT_PASS'
  },
  {
    id: 'NOTIF-04',
    title: '👥 Crowd Notice: Pier Promenade Seafood Market Peak',
    body: 'Seafood market crowd is currently at 74%. Recommended visit window: 02:30 PM for zero waiting lines.',
    category: 'CROWD_ALERT',
    time: '1 hour ago',
    read: true,
    priority: 'LOW',
    actionTab: 'CROWD'
  }
];

interface PortPushNotificationSystemProps {
  onNavigateTab?: (tab: string) => void;
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const PortPushNotificationSystem: React.FC<PortPushNotificationSystemProps> = ({
  onNavigateTab,
  triggerToast
}) => {
  const [notifications, setNotifications] = useState<PushNotificationItem[]>(INITIAL_PUSH_NOTIFS);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Category Toggles
  const [channels, setChannels] = useState({
    FLASH_DEAL: true,
    EXPO_KEYNOTE: true,
    CROWD_ALERT: true,
    PORT_SAFETY: true,
    PARKING: true
  });

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleToggleChannel = (key: keyof typeof channels) => {
    setChannels({ ...channels, [key]: !channels[key] });
    hapticEngine.trigger('click');
  };

  const handleSimulateInstantPush = () => {
    const templates = [
      {
        title: '🔥 Exclusive Duty-Free Drop: Limited Luxury Watches',
        body: '30 units of Swiss Chronometer watches just arrived at Pier Level 1. 25% Coastal Resident Discount applicable!',
        category: 'FLASH_DEAL' as const,
        priority: 'HIGH' as const,
        actionTab: 'SHOPPING'
      },
      {
        title: '📢 Exhibition Alert: Live Vessel Demonstration Starting',
        body: 'Electric Tugboat harbour maneuver demonstration commencing at Floating Dock Pier 2 now.',
        category: 'EXPO_KEYNOTE' as const,
        priority: 'HIGH' as const,
        actionTab: 'EXPO_AR'
      },
      {
        title: '🌊 Coastal Weather & Tide Bulletin',
        body: 'Calm harbor sea state, winds 8 knots SW. Ideal conditions for waterfront dining terrace & sea excursions.',
        category: 'PORT_SAFETY' as const,
        priority: 'MEDIUM' as const,
        actionTab: 'DINING'
      }
    ];

    const chosen = templates[Math.floor(Math.random() * templates.length)];
    const newNotif: PushNotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: chosen.title,
      body: chosen.body,
      category: chosen.category,
      time: 'Just Now',
      read: false,
      priority: chosen.priority,
      actionTab: chosen.actionTab
    };

    setNotifications([newNotif, ...notifications]);
    hapticEngine.trigger('success');

    if (soundEnabled) {
      // Audio cue simulation
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
        osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch (err) {
        console.log('Audio chime simulated', err);
      }
    }

    notify(chosen.body, 'info', chosen.title);
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    hapticEngine.trigger('success');
    notify('All notifications marked as read.', 'info', 'NOTIFICATIONS READ');
  };

  const handleClearAll = () => {
    setNotifications([]);
    hapticEngine.trigger('click');
    notify('Cleared all push notification history.', 'info', 'CLEARED');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BellRing className="w-6 h-6 text-rose-400 animate-pulse" />
              <h2 className="text-xl font-bold text-white">Port Commercial Push Notification &amp; Broadcast Hub</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time push alert dispatch for flash duty-free discounts, trade expo keynote reminders, and port crowd telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                soundEnabled
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Chime ON' : 'Mute Chime'}</span>
            </button>

            <button
              onClick={handleSimulateInstantPush}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-xs font-mono transition-all shadow-lg hover:brightness-110 flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Trigger Test Push Alert</span>
            </button>
          </div>
        </div>

        {/* Channel Toggles Bar */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-xs font-mono text-slate-400 font-bold flex items-center space-x-1.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Active Push Channels &amp; Filter Subscriptions</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">LIVE TELEMETRY FEED</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { key: 'FLASH_DEAL', label: 'Flash Duty-Free Deals', icon: Zap, color: 'text-amber-400' },
              { key: 'EXPO_KEYNOTE', label: 'Expo Keynotes & Demos', icon: Calendar, color: 'text-cyan-400' },
              { key: 'CROWD_ALERT', label: 'Crowd & Queue Alerts', icon: Users, color: 'text-purple-400' },
              { key: 'PARKING', label: 'Parking Space Vacancy', icon: ShieldCheck, color: 'text-emerald-400' }
            ].map((ch) => {
              const Icon = ch.icon;
              const isSubscribed = channels[ch.key as keyof typeof channels];
              return (
                <button
                  key={ch.key}
                  onClick={() => handleToggleChannel(ch.key as keyof typeof channels)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                    isSubscribed
                      ? 'bg-slate-900 text-white border border-slate-700 shadow-md'
                      : 'bg-slate-950 text-slate-600 border border-slate-900 line-through'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSubscribed ? ch.color : 'text-slate-600'}`} />
                  <span>{ch.label}</span>
                  <span className={`w-2 h-2 rounded-full ${isSubscribed ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications History List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Bell className="w-4 h-4 text-rose-400" />
              <span>Received Push Notifications Feed</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-slate-950 text-[10px] font-black font-mono">
                  {unreadCount} NEW
                </span>
              )}
            </h3>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
              >
                Mark All Read
              </button>
              <span className="text-slate-700">|</span>
              <button onClick={handleClearAll} className="text-xs font-mono text-slate-500 hover:text-rose-400">
                Clear All
              </button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center text-slate-500 space-y-2 font-mono text-xs">
              <Bell className="w-8 h-8 mx-auto text-slate-700" />
              <p>No push notifications in feed.</p>
              <p>Click &quot;Trigger Test Push Alert&quot; above to simulate real-time port broadcasts.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-5 rounded-2xl border transition-all space-y-2 relative overflow-hidden ${
                    notif.read
                      ? 'bg-slate-950/60 border-slate-800/80 opacity-80'
                      : 'bg-slate-950 border-rose-500/40 shadow-lg'
                  }`}
                >
                  {!notif.read && (
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-rose-500 to-pink-600" />
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full ${
                          notif.category === 'FLASH_DEAL'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : notif.category === 'EXPO_KEYNOTE'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {notif.category.replace('_', ' ')}
                      </span>
                      <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 shrink-0">{notif.time}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-2">{notif.body}</p>

                  <div className="flex items-center justify-between pt-2 pl-2">
                    {notif.actionTab && onNavigateTab && (
                      <button
                        onClick={() => {
                          onNavigateTab(notif.actionTab!);
                          hapticEngine.trigger('click');
                        }}
                        className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                      >
                        <span>Open Related View &rarr;</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setNotifications(notifications.filter((n) => n.id !== notif.id));
                        hapticEngine.trigger('click');
                      }}
                      className="text-slate-600 hover:text-rose-400 text-xs font-mono"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
