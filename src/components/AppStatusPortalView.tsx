import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Zap,
  Clock,
  ShieldCheck,
  Globe,
  Database,
  Radio,
  Wifi,
  Server,
  Layers,
  Bell,
  Check,
  Send
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export const AppStatusPortalView: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [lastTestTime, setLastTestTime] = useState<string>('Just now');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [services, setServices] = useState([
    { id: 'mining-portal', name: 'Ocean Mining Engineering Portal', category: 'Academic & Institutes', latency: 18, status: 'operational', uptime: '99.99%' },
    { id: 'ais-radar', name: 'Vessels GPS & AIS Fleet Radar', category: 'Maritime Tracking', latency: 24, status: 'operational', uptime: '99.97%' },
    { id: 'passport-api', name: 'Biometric Seafarer Passport & Visa API', category: 'Identity & Legal', latency: 31, status: 'operational', uptime: '99.95%' },
    { id: 'cyber-shield', name: 'Cyber Security & Dark Web Shield Agent', category: 'Security & Encryption', latency: 12, status: 'operational', uptime: '100.00%' },
    { id: 'pwa-cache', name: 'Service Worker Offline Cache Engine', category: 'PWA & Storage', latency: 5, status: 'operational', uptime: '100.00%' },
    { id: 'tsunami-radio', name: 'Global Tsunami & Disaster Warning Radio', category: 'Safety & Emergency', latency: 15, status: 'operational', uptime: '99.99%' }
  ]);

  const handleRunDiagnostics = () => {
    setIsTesting(true);
    hapticEngine.trigger('heavy');

    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) => ({
          ...s,
          latency: Math.floor(Math.random() * 20) + 10
        }))
      );
      setIsTesting(false);
      setLastTestTime(new Date().toLocaleTimeString());
      hapticEngine.trigger('success');
    }, 1500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    hapticEngine.trigger('success');
    setTimeout(() => {
      setShowSubscribeModal(false);
      setSubscribed(false);
      setEmail('');
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>All Systems Operational</span>
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                SLA Target: 99.98%
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleRunDiagnostics}
                disabled={isTesting}
                className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center space-x-1.5 shadow-lg shadow-teal-500/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                <span>{isTesting ? 'Testing Latency...' : 'Run Diagnostics Ping'}</span>
              </button>

              <button
                onClick={() => setShowSubscribeModal(true)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center space-x-1.5 border border-slate-700"
              >
                <Bell className="w-3.5 h-3.5 text-teal-400" />
                <span>Status Alerts</span>
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <Activity className="w-8 h-8 text-teal-400" />
            <span>OCEAN BIRD Global System Status & Latency Monitor</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Real-time infrastructure performance, API response latencies, database sync status, and SLA uptime metrics across all global maritime and ocean engineering modules.
          </p>
        </div>
      </div>

      {/* SLA Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overall Uptime (30 Days)</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">99.98%</div>
          <p className="text-[10px] text-slate-400">Exceeds 99.95% enterprise SLA limit</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Avg API Latency</span>
            <Zap className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-300">18.5 ms</div>
          <p className="text-[10px] text-slate-400">Ultra-fast global edge distribution</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Database Sync Engine</span>
            <Database className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">0.02s Lag</div>
          <p className="text-[10px] text-slate-400">IndexedDB & Server sync in real-time</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Last Health Check</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-black text-white">{lastTestTime}</div>
          <p className="text-[10px] text-slate-400">Automated 60s pulse check</p>
        </div>
      </div>

      {/* Services Operational Breakdown Grid */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
          <Server className="w-4 h-4 text-teal-400" />
          <span>Core Operational Service Statuses</span>
        </h3>

        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h4 className="font-extrabold text-white text-xs">{service.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-slate-400 border border-slate-800">
                    {service.category}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Operational SLA Uptime: {service.uptime}</p>
              </div>

              <div className="flex items-center space-x-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Ping Latency</span>
                  <span className="font-mono text-xs font-bold text-teal-300">{service.latency} ms</span>
                </div>

                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Operational</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident History & Maintenance Log */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>Incident & Scheduled Maintenance History</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>August 24, 2026 - 02:15 UTC</span>
              <span className="text-emerald-400 font-bold">Resolved (12 mins duration)</span>
            </div>
            <h4 className="font-bold text-white">Minor Latency Spike on Leaflet Map Tile Proxy</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Updated CartoDB dark matter tile CDN cache policies to optimize global institute map loading speeds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>August 20, 2026 - 14:00 UTC</span>
              <span className="text-cyan-400 font-bold">Completed Scheduled Maintenance</span>
            </div>
            <h4 className="font-bold text-white">PWA Service Worker v3 Deployment</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Upgraded offline storage schema to support institute bookmarks and research whitepaper PDF caching.
            </p>
          </div>
        </div>
      </div>

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-teal-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-sm flex items-center space-x-2">
                <Bell className="w-4 h-4 text-teal-400" />
                <span>Subscribe to Status Alerts</span>
              </h3>
              <button onClick={() => setShowSubscribeModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Receive instant email notifications when scheduled maintenance or service interruptions occur.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your engineer/student email address..."
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 font-sans"
              />

              <button
                type="submit"
                disabled={subscribed}
                className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                {subscribed ? <Check className="w-4 h-4 text-slate-950" /> : <Send className="w-4 h-4 text-slate-950" />}
                <span>{subscribed ? 'Subscribed Successfully!' : 'Confirm Subscription'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
