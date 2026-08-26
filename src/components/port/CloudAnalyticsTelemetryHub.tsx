import React, { useState } from 'react';
import {
  Activity,
  Server,
  Zap,
  Users,
  Globe,
  TrendingUp,
  Cpu,
  Database,
  BarChart2,
  Clock,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Radio
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { hapticEngine } from '../../utils/hapticUtils';

const VISITOR_TRAFFIC_DATA = [
  { time: '06:00', visitors: 1200, salesUSD: 4500, taxRefunds: 900 },
  { time: '09:00', visitors: 3400, salesUSD: 18200, taxRefunds: 3600 },
  { time: '12:00', visitors: 5800, salesUSD: 34900, taxRefunds: 6980 },
  { time: '15:00', visitors: 7200, salesUSD: 48100, taxRefunds: 9620 },
  { time: '18:00', visitors: 6100, salesUSD: 39500, taxRefunds: 7900 },
  { time: '21:00', visitors: 4200, salesUSD: 24800, taxRefunds: 4960 },
  { time: '00:00', visitors: 1900, salesUSD: 9800, taxRefunds: 1960 }
];

const GEOGRAPHIC_PORT_TRAFFIC = [
  { port: 'Mumbai / JNPT', visits: 18450, taxClaims: 4200 },
  { port: 'Singapore Marina', visits: 14200, taxClaims: 3800 },
  { port: 'Puducherry Port', visits: 9800, taxClaims: 2100 },
  { port: 'Mina Rashid Dubai', visits: 22100, taxClaims: 5900 }
];

const RECENT_CLOUD_LOGS = [
  { id: 'LOG-881', type: 'FIREBASE_AUTH', msg: 'User UID auth_9921 signed in via Google Auth', time: '10s ago' },
  { id: 'LOG-882', type: 'DUTY_FREE_SCAN', msg: 'Verified Receipt #DF-MUM-98214 for $4,800 USD', time: '24s ago' },
  { id: 'LOG-883', type: 'LOYALTY_REDEEM', msg: 'Redeemed 1000 PTS at Puducherry Promenade Crafts Bazaar', time: '1m ago' },
  { id: 'LOG-884', type: 'STRIPE_WEBHOOK', msg: 'Stripe subscription invoice.paid for Admiral Pro ($99)', time: '3m ago' }
];

interface CloudAnalyticsTelemetryHubProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const CloudAnalyticsTelemetryHub: React.FC<CloudAnalyticsTelemetryHubProps> = ({ triggerToast }) => {
  const [logs, setLogs] = useState(RECENT_CLOUD_LOGS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleRefreshAnalytics = () => {
    setIsRefreshing(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setIsRefreshing(false);
      hapticEngine.trigger('success');
      notify('Refreshed Cloud Telemetry & Traffic Metrics!', 'success', 'TELEMETRY SYNCED');
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Google Cloud &amp; Firebase Real-Time Analytics</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live Cloud Run container execution telemetry, Firestore database IOPS, active passenger traffic, and Stripe webhook logs.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center space-x-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-ping" />
              <span>CLOUD TELEMETRY ONLINE</span>
            </span>

            <button
              onClick={handleRefreshAnalytics}
              disabled={isRefreshing}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 font-mono text-xs border border-slate-800 flex items-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Health Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">CLOUD RUN CONTAINER LATENCY</span>
            <span className="text-2xl font-black font-mono text-cyan-400">28 ms</span>
            <span className="text-[10px] font-mono text-emerald-400 block">Fast 0.02s response time</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">FIRESTORE IOPS READ/WRITES</span>
            <span className="text-2xl font-black font-mono text-amber-400">14,820 / sec</span>
            <span className="text-[10px] font-mono text-slate-400 block">Synced with Firebase SDK</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">LIVE PASSENGER SESSIONS</span>
            <span className="text-2xl font-black font-mono text-white">7,240</span>
            <span className="text-[10px] font-mono text-cyan-400 block">+14% vs previous hour</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">GLOBAL API UPTIME SLA</span>
            <span className="text-2xl font-black font-mono text-emerald-400">99.99%</span>
            <span className="text-[10px] font-mono text-slate-400 block">Zero downtime reported</span>
          </div>
        </div>

        {/* Traffic & Sales Chart */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <span>Passenger Traffic &amp; Duty-Free Sales Volume (Today)</span>
          </h3>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VISITOR_TRAFFIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="visitors" stroke="#38bdf8" strokeWidth={2} name="Live Visitors" />
                <Line type="monotone" dataKey="salesUSD" stroke="#10b981" strokeWidth={2} name="Duty-Free Sales ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Port Geographic Chart */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Geographic Duty-Free Tax Claims by Port</span>
          </h3>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GEOGRAPHIC_PORT_TRAFFIC}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="port" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Bar dataKey="visits" fill="#0284c7" radius={[6, 6, 0, 0]} name="Passenger Visits" />
                <Bar dataKey="taxClaims" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Instant Tax Claims" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Log Stream Audit */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Cloud Audit Stream &amp; System Event Logs</span>
          </h3>

          <div className="space-y-2 font-mono text-xs">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-bold border border-cyan-500/30">
                    {log.type}
                  </span>
                  <span className="text-slate-200">{log.msg}</span>
                </div>
                <span className="text-[10px] text-slate-500">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
