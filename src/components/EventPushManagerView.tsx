import React, { useState } from 'react';
import {
  Bell,
  Radio,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Users,
  Tag,
  PlusCircle,
  Wifi,
  Trash2,
  RotateCcw,
  Sliders,
  Flame,
  Check
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface PushEventItem {
  id: string;
  topic: string;
  priority: 'CRITICAL_MAYDAY' | 'WEATHER_CYCLONE' | 'OCEAN_DOLLAR_DROP' | 'PORT_CLEARANCE' | 'SYSTEM_INFO';
  title: string;
  message: string;
  timestamp: string;
  reachCount: number;
  deliveryStatus: 'DELIVERED' | 'BROADCASTING' | 'SCHEDULED';
  isRead: boolean;
}

const INITIAL_PUSH_EVENTS: PushEventItem[] = [
  {
    id: 'PUSH-9901',
    topic: 'WEATHER_RADAR',
    priority: 'WEATHER_CYCLONE',
    title: '⚠️ Category 3 Cyclone Warning: Bay of Bengal Sector 4',
    message: 'Copernicus SAR satellite confirms swell heights exceeding 6.4 meters. All small craft advised to seek refuge at Chittagong Outer Anchorage.',
    timestamp: '10 min ago',
    reachCount: 18420,
    deliveryStatus: 'DELIVERED',
    isRead: false
  },
  {
    id: 'PUSH-8820',
    topic: 'OCEAN_DOLLAR',
    priority: 'OCEAN_DOLLAR_DROP',
    title: '🪙 $1,000 OD Sovereign Gold Coin Mintage Released',
    message: '1,000 physical 24K gold coins with ECDSA encrypted NFC chips are now registered into the sovereign cold vault reserve.',
    timestamp: '1 hour ago',
    reachCount: 24500,
    deliveryStatus: 'DELIVERED',
    isRead: false
  },
  {
    id: 'PUSH-7731',
    topic: 'PORT_CLEARANCE',
    priority: 'PORT_CLEARANCE',
    title: '🚢 Chittagong Berth #3 Gantry Clearance Active',
    message: 'Container M/V Desh Shanti customs declaration verified via QR code. Automated gate pass issued for 48 hours.',
    timestamp: '3 hours ago',
    reachCount: 9200,
    deliveryStatus: 'DELIVERED',
    isRead: true
  }
];

export const EventPushManagerView: React.FC = () => {
  const [events, setEvents] = useState<PushEventItem[]>(INITIAL_PUSH_EVENTS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(true);

  // Active Channel Subscriptions
  const [subscriptions, setSubscriptions] = useState({
    WEATHER_RADAR: true,
    OCEAN_DOLLAR: true,
    PORT_CLEARANCE: true,
    CRITICAL_MAYDAY: true,
    FLIGHT_CRUISE: false
  });

  // New Push Event Creator State
  const [pushTitle, setPushTitle] = useState('');
  const [pushMessage, setPushMessage] = useState('');
  const [pushTopic, setPushTopic] = useState('OCEAN_DOLLAR');
  const [pushPriority, setPushPriority] = useState<PushEventItem['priority']>('OCEAN_DOLLAR_DROP');
  const [activeToastBanner, setActiveToastBanner] = useState<PushEventItem | null>(null);

  // Play audio chime simulator
  const playChimeSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.2); // E6 note
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (err) {
      // Audio context fallbacks
    }
  };

  const handleDispatchPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushTitle || !pushMessage) return;

    const newEvent: PushEventItem = {
      id: `PUSH-${Date.now()}`,
      topic: pushTopic,
      priority: pushPriority,
      title: pushTitle,
      message: pushMessage,
      timestamp: 'Just now',
      reachCount: Math.floor(12000 + Math.random() * 15000),
      deliveryStatus: 'DELIVERED',
      isRead: false
    };

    setEvents([newEvent, ...events]);
    setActiveToastBanner(newEvent);
    if (hapticEnabled) hapticEngine.trigger('success');
    playChimeSound();

    setPushTitle('');
    setPushMessage('');

    setTimeout(() => {
      setActiveToastBanner(null);
    }, 5000);
  };

  const handleToggleSubscription = (key: keyof typeof subscriptions) => {
    setSubscriptions(prev => ({ ...prev, [key]: !prev[key] }));
    hapticEngine.trigger('click');
  };

  const handleMarkAllRead = () => {
    setEvents(events.map(e => ({ ...e, isRead: true })));
    hapticEngine.trigger('click');
  };

  const unreadCount = events.filter(e => !e.isRead).length;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl animate-fade-in relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Live Dispatched Push Banner Overlay */}
      {activeToastBanner && (
        <div className="fixed top-6 right-6 z-50 max-w-md w-full bg-slate-900 border-2 border-cyan-500 p-4 rounded-2xl shadow-2xl space-y-2 animate-bounce font-mono text-xs">
          <div className="flex justify-between items-center text-cyan-400 font-bold">
            <span className="flex items-center space-x-2">
              <Radio className="w-4 h-4 animate-ping" />
              <span>REAL-TIME EVENT PUSH DISPATCHED</span>
            </span>
            <button onClick={() => setActiveToastBanner(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <strong className="text-white text-sm font-bold block">{activeToastBanner.title}</strong>
          <p className="text-slate-300 text-[11px]">{activeToastBanner.message}</p>
          <div className="text-[10px] text-cyan-300 font-bold pt-1">
            Reaching {activeToastBanner.reachCount.toLocaleString()} Subscribers
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              REAL-TIME EVENT PUSH &amp; BROADCAST ENGINE
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <Bell className="w-8 h-8 text-cyan-400" />
            <span>Event Push Manager</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Dispatch urgent maritime weather pushes, Ocean Dollar vault mintage announcements, port clearance events, and emergency Mayday alerts in real-time.
          </p>
        </div>

        {/* Audio & Haptic Controls */}
        <div className="flex items-center space-x-3 bg-slate-900 p-2 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
              soundEnabled ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>Sound Chime</span>
          </button>

          <button
            onClick={() => {
              setHapticEnabled(!hapticEnabled);
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
              hapticEnabled ? 'bg-purple-500 text-white font-black' : 'bg-slate-950 text-slate-400'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>Haptics</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left: Dispatch Push Studio Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Send className="w-5 h-5 text-cyan-400" />
              <span>Broadcast Push Event Dispatcher</span>
            </h3>

            <form onSubmit={handleDispatchPush} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Target Broadcast Channel</label>
                <select
                  value={pushTopic}
                  onChange={(e) => setPushTopic(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-cyan-500"
                >
                  <option value="WEATHER_RADAR">Cyclone &amp; Weather Radar Channel</option>
                  <option value="OCEAN_DOLLAR">Ocean Dollar Mintage &amp; Vault Channel</option>
                  <option value="PORT_CLEARANCE">Port Berth &amp; Gate Pass Channel</option>
                  <option value="CRITICAL_MAYDAY">Critical Emergency Mayday Channel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Priority Urgency Tag</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'CRITICAL_MAYDAY', label: '🚨 MAYDAY ALERT', color: 'bg-rose-950 text-rose-300 border-rose-500' },
                    { id: 'WEATHER_CYCLONE', label: '⚡ CYCLONE WARN', color: 'bg-amber-950 text-amber-300 border-amber-500' },
                    { id: 'OCEAN_DOLLAR_DROP', label: '🪙 VAULT DROP', color: 'bg-yellow-950 text-yellow-300 border-yellow-500' },
                    { id: 'PORT_CLEARANCE', label: '🚢 PORT PASS', color: 'bg-cyan-950 text-cyan-300 border-cyan-500' }
                  ].map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setPushPriority(p.id as any)}
                      className={`p-2.5 rounded-xl border text-left text-[11px] font-bold transition-all ${
                        pushPriority === p.id ? `${p.color} ring-2 ring-cyan-400` : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Push Notification Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Category 3 Cyclone Warning Issued..."
                  value={pushTitle}
                  onChange={(e) => setPushTitle(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Push Message Payload</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter full notification body..."
                  value={pushMessage}
                  onChange={(e) => setPushMessage(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Live Push Broadcast</span>
              </button>
            </form>
          </div>

          {/* Subscription Topics Channels */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
            <h4 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
              <Radio className="w-4 h-4 text-purple-400" />
              <span>Active Channel Subscriptions</span>
            </h4>

            <div className="space-y-2">
              {Object.entries(subscriptions).map(([key, isSubscribed]) => (
                <div key={key} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-white font-bold block">{key.replace('_', ' ')}</strong>
                    <span className="text-[10px] text-slate-400">Real-time WebSocket &amp; WebPush Push</span>
                  </div>
                  <button
                    onClick={() => handleToggleSubscription(key as any)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-[10px] transition-all border ${
                      isSubscribed
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed ✓' : 'Muted'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Dispatched Push Event Timeline Log */}
        <div className="lg:col-span-6 space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-black text-white">Dispatched Push History Log</h3>
              {unreadCount > 0 && (
                <span className="bg-rose-500 text-white font-black px-2 py-0.5 rounded-full text-[10px]">
                  {unreadCount} NEW
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 underline"
              >
                Mark All Read
              </button>
            )}
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className={`p-5 rounded-3xl border transition-all space-y-3 ${
                  evt.isRead
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-slate-900 border-cyan-500/50 shadow-lg'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase border ${
                    evt.priority === 'CRITICAL_MAYDAY'
                      ? 'bg-rose-950 text-rose-300 border-rose-500'
                      : evt.priority === 'WEATHER_CYCLONE'
                      ? 'bg-amber-950 text-amber-300 border-amber-500'
                      : 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  }`}>
                    {evt.priority.replace('_', ' ')}
                  </span>
                  <span className="text-slate-500 text-[10px]">{evt.timestamp}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-sans">{evt.title}</h4>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">{evt.message}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Audience Reach: <strong className="text-white">{evt.reachCount.toLocaleString()}</strong></span>
                  </span>
                  <span className="text-emerald-400 font-bold uppercase">{evt.deliveryStatus} ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
