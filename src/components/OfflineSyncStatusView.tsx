import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Radio,
  Database,
  RefreshCw,
  CheckCircle2,
  Clock,
  HardDrive,
  CloudCheck,
  ShieldCheck,
  Sparkles,
  Download,
  Upload,
  Layers,
  Activity
} from 'lucide-react';

interface OfflineSyncBundle {
  id: string;
  moduleName: string;
  pendingItems: number;
  dataSizeKb: number;
  lastSyncTime: string;
  syncStatus: 'SYNCED' | 'QUEUED_FOR_SATCOM' | 'SYNCING';
}

const INITIAL_BUNDLES: OfflineSyncBundle[] = [
  { id: 'B-01', moduleName: "Captain's Port Weather Log", pendingItems: 0, dataSizeKb: 142, lastSyncTime: '2026-08-02 11:30 UTC', syncStatus: 'SYNCED' },
  { id: 'B-02', moduleName: 'Geofence Breach Event Audits', pendingItems: 3, dataSizeKb: 88, lastSyncTime: '2026-08-02 10:45 UTC', syncStatus: 'QUEUED_FOR_SATCOM' },
  { id: 'B-03', moduleName: 'Digital Cargo SHA-256 Signatures', pendingItems: 1, dataSizeKb: 210, lastSyncTime: '2026-08-02 09:15 UTC', syncStatus: 'QUEUED_FOR_SATCOM' },
  { id: 'B-04', moduleName: 'SOLAS Crew Safety Briefings', pendingItems: 0, dataSizeKb: 64, lastSyncTime: '2026-08-02 11:20 UTC', syncStatus: 'SYNCED' }
];

export const OfflineSyncStatusView: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [networkType, setNetworkType] = useState<'INMARSAT_SATCOM' | 'HIGH_SPEED_4G' | 'OFFLINE'>('INMARSAT_SATCOM');
  const [bundles, setBundles] = useState<OfflineSyncBundle[]>(INITIAL_BUNDLES);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncProgressPct, setSyncProgressPct] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleForceSyncSatCom = () => {
    setIsSyncingAll(true);
    setSyncProgressPct(10);

    const interval = setInterval(() => {
      setSyncProgressPct((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncingAll(false);
          const timeNow = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
          setBundles((bPrev) =>
            bPrev.map((b) => ({
              ...b,
              pendingItems: 0,
              lastSyncTime: timeNow,
              syncStatus: 'SYNCED'
            }))
          );
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const totalPending = bundles.reduce((acc, curr) => acc + curr.pendingItems, 0);
  const totalCacheKb = bundles.reduce((acc, curr) => acc + curr.dataSizeKb, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-sky-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
              PWA SATELLITE OFFLINE CACHE
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              INDEXED DB READY
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center space-x-2">
            <Database className="w-7 h-7 text-sky-400" />
            <span>Offline Sync Status & Inmarsat SatCom Cache</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Offline-first data persistence engine syncing captain logbooks, geofence audit trails, and digital cargo signatures automatically during low-bandwidth ocean SatCom passes.
          </p>
        </div>

        <button
          onClick={handleForceSyncSatCom}
          disabled={isSyncingAll}
          className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-sky-500/20 flex items-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncingAll ? 'animate-spin' : ''}`} />
          <span>{isSyncingAll ? `SYNCING SATCOM (${syncProgressPct}%)...` : 'FORCE SATCOM SYNC NOW'}</span>
        </button>
      </div>

      {/* Connectivity & Cache Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>NETWORK CONNECTION</span>
            {isOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-rose-400" />}
          </div>
          <p className="text-xl font-black text-white">
            {isOnline ? 'ONLINE (SATCOM CONNECTED)' : 'OFFLINE (LOCAL CACHE ACTIVE)'}
          </p>
          <span className="text-[10px] text-emerald-400">Inmarsat FX 64 kbps Active</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block">PENDING SATCOM SYNC QUEUE</span>
          <p className={`text-xl font-black ${totalPending > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {totalPending} <span className="text-xs font-normal text-slate-400">records</span>
          </p>
          <span className="text-[10px] text-slate-500">
            {totalPending > 0 ? 'Queued for next satellite burst' : 'All local queues synchronized'}
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 block">OFFLINE CACHE STORAGE</span>
          <p className="text-xl font-black text-sky-400">{totalCacheKb} <span className="text-xs font-normal text-slate-400">KB</span></p>
          <span className="text-[10px] text-slate-500">IndexedDB & ServiceWorker</span>
        </div>
      </div>

      {/* Sync Queue List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-sky-400" />
          <span>Local Module Sync Bundles</span>
        </h3>

        <div className="space-y-3 font-mono text-xs">
          {bundles.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-white text-sm">{b.moduleName}</h4>
                  <span className="text-[10px] text-slate-500">({b.id})</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Local Size: <strong>{b.dataSizeKb} KB</strong> • Last Synced: {b.lastSyncTime}
                </p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    b.syncStatus === 'SYNCED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {b.syncStatus === 'SYNCED' ? 'SYNCHRONIZED' : `${b.pendingItems} QUEUED`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
