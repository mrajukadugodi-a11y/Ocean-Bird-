import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Radio,
  RefreshCw,
  Database,
  CheckCircle2,
  Clock,
  HardDrive,
  Cloud,
  ShieldCheck,
  AlertTriangle,
  Download,
  Upload,
  Layers,
  Activity,
  Send,
  Zap,
  Lock
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface SyncPacketAlert {
  id: string;
  category: string;
  description: string;
  dataKb: number;
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
  queuedTimestamp: string;
  status: 'PENDING' | 'SYNCED' | 'FAILED';
}

const INITIAL_SYNC_PACKETS: SyncPacketAlert[] = [
  { id: 'PKT-901', category: 'Mayday / Emergency Telemetry', description: 'GMDSS Satellite distress packet broadcast log', dataKb: 12, priority: 'CRITICAL', queuedTimestamp: '2 mins ago', status: 'PENDING' },
  { id: 'PKT-902', category: 'Geofence Breach Event Audit', description: 'Malacca Strait High-Traffic Lane border ping', dataKb: 48, priority: 'HIGH', queuedTimestamp: '14 mins ago', status: 'PENDING' },
  { id: 'PKT-903', category: 'Digital Cargo SHA-256 Manifest', description: 'Container MAEU-882190-2 Hazmat Signatures', dataKb: 180, priority: 'HIGH', queuedTimestamp: '35 mins ago', status: 'SYNCED' },
  { id: 'PKT-904', category: 'Captain Port Logbook Entry', description: 'Draft measurement and fuel bunker report', dataKb: 64, priority: 'NORMAL', queuedTimestamp: '1 hour ago', status: 'SYNCED' }
];

export const OfflineSyncAlertView: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [satcomLink, setSatcomLink] = useState<'INMARSAT_C' | 'IRIDIUM_NEXT' | 'STARLINK_MARITIME' | 'OFFLINE'>('INMARSAT_C');
  const [packets, setPackets] = useState<SyncPacketAlert[]>(INITIAL_SYNC_PACKETS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      hapticEngine.trigger('success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      hapticEngine.trigger('alert');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    hapticEngine.trigger('click');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleForceFlushQueue = () => {
    setIsSyncing(true);
    hapticEngine.trigger('scan');

    setTimeout(() => {
      setPackets((prev) => prev.map((p) => ({ ...p, status: 'SYNCED' })));
      setIsSyncing(false);
      showToast('All pending SATCOM offline packets flushed successfully to Cloud!');
    }, 2000);
  };

  const pendingCount = packets.filter((p) => p.status === 'PENDING').length;
  const pendingKb = packets.filter((p) => p.status === 'PENDING').reduce((acc, p) => acc + p.dataKb, 0);

  return (
    <div className="space-y-6 font-mono animate-fadeIn pb-12">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              {isOnline ? <Radio className="w-5 h-5 animate-pulse text-emerald-400" /> : <WifiOff className="w-5 h-5 text-rose-400 animate-bounce" />}
              <span>Inmarsat & Iridium SatCom Packet Queue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Offline Sync Alert & Telemetry Packet Hub
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Zero-data-loss satellite buffer for high-seas operations. Stores encrypted telemetry locally in IndexedDB and flushes automatically on SATCOM handshake.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleForceFlushQueue}
              disabled={isSyncing || pendingCount === 0}
              className={`px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-xl transition-all ${
                isSyncing || pendingCount === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`w-4 h-4 text-slate-950 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'FLUSHING PACKETS...' : 'FORCE SATCOM SYNC'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ONLINE / OFFLINE STATUS ALERT BANNER */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between font-mono ${
        isOnline
          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
          : 'bg-rose-950/80 border-rose-500/80 text-rose-200 animate-pulse'
      }`}>
        <div className="flex items-center space-x-3">
          {isOnline ? (
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
              <Wifi className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400 flex items-center justify-center text-rose-400">
              <WifiOff className="w-5 h-5 animate-bounce" />
            </div>
          )}
          <div>
            <h3 className="font-extrabold text-sm uppercase">
              {isOnline ? 'SATCOM Connection Established' : 'High-Seas Offline Mode Active'}
            </h3>
            <p className="text-xs opacity-80">
              {isOnline
                ? 'Linked to Inmarsat-C Satellite Gateway (Bandwidth: 128 Kbps • Latency: 420ms)'
                : 'No network signal detected. All logs buffering safely in local browser storage.'}
            </p>
          </div>
        </div>

        <div className="hidden sm:block text-right text-xs font-bold">
          <div>SATCOM Link: {satcomLink}</div>
          <div className="text-[10px] opacity-75">{pendingCount} Packets Waiting ({pendingKb} KB)</div>
        </div>
      </div>

      {/* QUEUED PACKETS LIST */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
            <Database className="w-4 h-4" />
            <span>Queued Telemetry Packets</span>
          </div>
          <span className="text-[10px] text-amber-300 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">
            {pendingCount} Pending Queue
          </span>
        </div>

        <div className="space-y-3">
          {packets.map((pkt) => (
            <div key={pkt.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  pkt.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                }`}>
                  <Send className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-white">{pkt.category}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      pkt.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {pkt.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{pkt.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0 text-xs">
                <span className="text-slate-500 hidden sm:inline">{pkt.dataKb} KB</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  pkt.status === 'SYNCED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {pkt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
