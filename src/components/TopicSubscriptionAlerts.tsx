import React, { useState } from 'react';
import { 
  Bell, Check, Tag, Radio, Mail, AlertTriangle, Sparkles, Volume2, ShieldCheck, Trash2
} from 'lucide-react';

export interface SubscriptionAlert {
  id: string;
  topic: string;
  title: string;
  author: string;
  timestamp: string;
  isRead: boolean;
}

export const INITIAL_ALERTS: SubscriptionAlert[] = [
  {
    id: 'ALT-001',
    topic: 'CII',
    title: 'New Grade E penalty verification guidelines published by IMO MEPC',
    author: 'Lt. Cmdr. Sarah Perera',
    timestamp: '25 min ago',
    isRead: false
  },
  {
    id: 'ALT-002',
    topic: 'Sundarbans',
    title: 'Copernicus SAR satellite confirms 14% increase in Sundarbans carbon stock',
    author: 'Dr. Ananya Sen',
    timestamp: '2 hours ago',
    isRead: false
  },
  {
    id: 'ALT-003',
    topic: 'PETase',
    title: 'Pelagic drone skimmers achieve 2.4 MT plastic depolymerization in Maldivian gyre',
    author: 'UNEP Release',
    timestamp: '5 hours ago',
    isRead: true
  }
];

interface TopicSubscriptionAlertsProps {
  allAvailableTags: string[];
  subscribedTopics: string[];
  onToggleTopicSubscription: (topic: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const TopicSubscriptionAlerts: React.FC<TopicSubscriptionAlertsProps> = ({
  allAvailableTags,
  subscribedTopics,
  onToggleTopicSubscription,
  onTriggerToast
}) => {
  const [alerts, setAlerts] = useState<SubscriptionAlert[]>(INITIAL_ALERTS);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState<boolean>(true);
  const [inAppAlertsEnabled, setInAppAlertsEnabled] = useState<boolean>(true);
  const [alertUrgency, setAlertUrgency] = useState<'ALL_POSTS' | 'EXPERT_ONLY'>('ALL_POSTS');

  const unreadCount = alerts.filter(a => !a.isRead).length;

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
    onTriggerToast('🔔 All topic subscription alerts marked as read.');
  };

  const handleClearAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/20 border border-cyan-400/40 rounded-xl relative">
            <Bell className="w-6 h-6 text-cyan-400 animate-bounce" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">TOPIC ALERTS MANAGER</span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                REAL-TIME TELEMETRY
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Topic Subscriptions &amp; Notification Alerts</h2>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold transition-all"
          >
            MARK ALL AS READ
          </button>
        )}
      </div>

      {/* SUBSCRIBED TOPICS SELECTION CLOUD */}
      <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-cyan-400 uppercase flex items-center space-x-1.5">
            <Tag className="w-4 h-4" />
            <span>SUBSCRIBE TO TOPIC CHANNELS ({subscribedTopics.length} ACTIVE)</span>
          </span>
          <span className="text-[10px] text-slate-400">Click to subscribe or unsubscribe</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {allAvailableTags.map((tag) => {
            const isSubbed = subscribedTopics.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => {
                  onToggleTopicSubscription(tag);
                  onTriggerToast(isSubbed ? `Unsubscribed from #${tag}` : `🔔 Subscribed to topic #${tag}! Alerts active.`);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all flex items-center space-x-1.5 ${
                  isSubbed
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>#{tag}</span>
                {isSubbed && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ALERT PREFERENCES CONFIGURATION */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">In-App Push Alerts</span>
            <span className="text-[10px] text-slate-400 font-sans block">Instant toast notification</span>
          </div>
          <input
            type="checkbox"
            checked={inAppAlertsEnabled}
            onChange={(e) => setInAppAlertsEnabled(e.target.checked)}
            className="accent-cyan-500 rounded"
          />
        </label>

        <label className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Email Digest Alerts</span>
            <span className="text-[10px] text-slate-400 font-sans block">Daily/weekly summaries</span>
          </div>
          <input
            type="checkbox"
            checked={emailAlertsEnabled}
            onChange={(e) => setEmailAlertsEnabled(e.target.checked)}
            className="accent-cyan-500 rounded"
          />
        </label>

        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-white block">Alert Filter Level</span>
          <select
            value={alertUrgency}
            onChange={(e) => setAlertUrgency(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[10px] text-cyan-300 font-mono"
          >
            <option value="ALL_POSTS">All Subscribed Topic Posts</option>
            <option value="EXPERT_ONLY">Expert Verified Answers Only</option>
          </select>
        </div>
      </div>

      {/* RECENT SUBSCRIPTION ALERTS FEED */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">RECENT SUBSCRIPTION NOTIFICATIONS</span>
        <div className="space-y-2">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                alt.isRead ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-900 border-cyan-500/50 text-white shadow-lg'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
                  #{alt.topic}
                </span>
                <div>
                  <h4 className="font-bold text-xs">{alt.title}</h4>
                  <p className="text-[10px] text-slate-400 font-sans">By {alt.author} • {alt.timestamp}</p>
                </div>
              </div>

              <button
                onClick={() => handleClearAlert(alt.id)}
                className="p-1 text-slate-500 hover:text-rose-400 text-xs"
                title="Dismiss Alert"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
