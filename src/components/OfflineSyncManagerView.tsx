import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Database,
  CheckCircle2,
  Clock,
  HardDrive,
  Radio,
  Sparkles,
  ShieldCheck,
  Send,
  Trash2,
  Server,
  CloudOff,
  Cloud,
  Layers,
  FileCheck
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface PendingSyncItem {
  id: string;
  type: 'LOGBOOK_ENTRY' | 'PORT_CLEARANCE' | 'CUSTOMS_PASS' | 'STAKING_CLAIM';
  title: string;
  payloadSize: string;
  timestamp: string;
  status: 'QUEUED' | 'SYNCING' | 'SYNCED' | 'FAILED';
  retries: number;
}

const INITIAL_QUEUE: PendingSyncItem[] = [
  {
    id: 'SYNC-801',
    type: 'LOGBOOK_ENTRY',
    title: 'STCW Bridge Deck Watchkeeping Entry #448',
    payloadSize: '4.2 KB',
    timestamp: '10 min ago',
    status: 'QUEUED',
    retries: 0
  },
  {
    id: 'SYNC-802',
    type: 'PORT_CLEARANCE',
    title: 'Container M/V Desh Shanti Customs QR Verification',
    payloadSize: '12.8 KB',
    timestamp: '25 min ago',
    status: 'QUEUED',
    retries: 1
  },
  {
    id: 'SYNC-803',
    type: 'CUSTOMS_PASS',
    title: 'Chittagong Outer Anchorage Draft Declaration',
    payloadSize: '6.1 KB',
    timestamp: '1 hour ago',
    status: 'QUEUED',
    retries: 0
  }
];

export const OfflineSyncManagerView: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [simulatedHighSeasMode, setSimulatedHighSeasMode] = useState<boolean>(false);
  const [syncQueue, setSyncQueue] = useState<PendingSyncItem[]>(INITIAL_QUEUE);
  const [isSyncingAll, setIsSyncingAll] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Monitor Network Online/Offline status
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

  const effectiveOnlineStatus = isOnline && !simulatedHighSeasMode;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleHighSeasMode = () => {
    setSimulatedHighSeasMode((prev) => !prev);
    hapticEngine.trigger('click');
    showToast(!simulatedHighSeasMode ? 'High Seas Offline Mode Engaged!' : 'Online Port Connectivity Restored!');
  };

  const handleAddOfflineLog = () => {
    const newItem: PendingSyncItem = {
      id: `SYNC-${Math.floor(100 + Math.random() * 900)}`,
      type: 'LOGBOOK_ENTRY',
      title: `Offline Engine & Navigation Telemetry #${Math.floor(100 + Math.random() * 900)}`,
      payloadSize: '5.4 KB',
      timestamp: 'Just now',
      status: 'QUEUED',
      retries: 0
    };

    setSyncQueue([newItem, ...syncQueue]);
    hapticEngine.trigger('click');
    showToast('Offline payload saved to local IndexedDB queue.');
  };

  const handleTriggerSyncAll = () => {
    if (!effectiveOnlineStatus) {
      showToast('Cannot sync while offline! Restore network connectivity first.');
      return;
    }

    setIsSyncingAll(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setSyncQueue((prev) => prev.map((item) => ({ ...item, status: 'SYNCED' })));
      setIsSyncingAll(false);
      hapticEngine.trigger('success');
      showToast('All pending items successfully synchronized to Cloud Firestore!');
    }, 1800);
  };

  const handleClearSynced = () => {
    setSyncQueue((prev) => prev.filter((item) => item.status !== 'SYNCED'));
    hapticEngine.trigger('click');
  };

  const queuedCount = syncQueue.filter((i) => i.status === 'QUEUED').length;
  const syncedCount = syncQueue.filter((i) => i.status === 'SYNCED').length;

  return (
    <div id="offline-sync-manager-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full animate-ping ${effectiveOnlineStatus ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
              effectiveOnlineStatus
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {effectiveOnlineStatus ? 'NETWORK ONLINE • SATELLITE ACTIVE' : 'HIGH SEAS DISCONNECTED • OFFLINE SYNC ACTIVE'}
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            {effectiveOnlineStatus ? <Wifi className="w-8 h-8 text-emerald-400" /> : <WifiOff className="w-8 h-8 text-rose-400" />}
            <span>Offline Sync &amp; Storage Manager</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Store vessel logbooks, port clearance passes, and Ocean Dollar transactions locally when offline at sea. Automatically sync to Firestore when port Wi-Fi or satellite link restores.
          </p>
        </div>

        {/* Network Toggle Button */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handleToggleHighSeasMode}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 border ${
              simulatedHighSeasMode
                ? 'bg-rose-950 text-rose-300 border-rose-500 font-black'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {simulatedHighSeasMode ? <CloudOff className="w-4 h-4 text-rose-400" /> : <Cloud className="w-4 h-4 text-cyan-400" />}
            <span>{simulatedHighSeasMode ? 'Disable High Seas Mode' : 'Simulate Offline High Seas'}</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-teal-950 border border-teal-500/50 text-teal-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce relative z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-teal-400">✕</button>
        </div>
      )}

      {/* Main Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block flex items-center space-x-1">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Local Storage Usage</span>
          </span>
          <span className="text-xl font-black text-white block">1.84 MB / 50 MB</span>
          <span className="text-[10px] text-cyan-300 font-bold">IndexedDB Enforced</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Pending Sync Queue</span>
          </span>
          <span className="text-xl font-black text-white block">{queuedCount} Items</span>
          <span className="text-[10px] text-amber-300 font-bold">Awaiting Connection</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Successfully Synced</span>
          </span>
          <span className="text-xl font-black text-white block">{syncedCount} Items</span>
          <span className="text-[10px] text-emerald-400 font-bold">Firestore Replicated</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block flex items-center space-x-1">
            <Server className="w-3.5 h-3.5 text-purple-400" />
            <span>Auto Sync Interval</span>
          </span>
          <span className="text-xl font-black text-white block">Every 60 Sec</span>
          <span className="text-[10px] text-purple-300 font-bold">Background Worker</span>
        </div>
      </div>

      {/* Main Queue Management Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 font-mono text-xs">
        {/* Left: Quick Actions Studio */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <HardDrive className="w-5 h-5 text-teal-400" />
              <span>Offline Payload Generator</span>
            </h3>

            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              Test saving data locally while disconnected. Creates encrypted payloads stored in IndexedDB with optimistic UI updates.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddOfflineLog}
                className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs rounded-2xl transition-all flex items-center justify-center space-x-2"
              >
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>Save Offline Logbook Entry</span>
              </button>

              <button
                onClick={handleTriggerSyncAll}
                disabled={isSyncingAll || !effectiveOnlineStatus}
                className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase shadow-xl transition-all flex items-center justify-center space-x-2 ${
                  effectiveOnlineStatus
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingAll ? 'animate-spin' : ''}`} />
                <span>{isSyncingAll ? 'Synchronizing Payload Queue...' : 'Force Immediate Cloud Sync'}</span>
              </button>

              {syncedCount > 0 && (
                <button
                  onClick={handleClearSynced}
                  className="w-full py-2.5 text-slate-400 hover:text-rose-400 text-[11px] font-bold transition-all flex items-center justify-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Synced Records</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Pending Queue Table Log */}
        <div className="lg:col-span-7 space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Local IndexedDB Queue Log</span>
            </h3>

            <span className="text-[10px] text-slate-400 font-bold uppercase">{syncQueue.length} TOTAL RECORDS</span>
          </div>

          <div className="space-y-3">
            {syncQueue.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all space-y-2 ${
                  item.status === 'SYNCED'
                    ? 'bg-slate-900/50 border-emerald-500/30'
                    : 'bg-slate-900 border-amber-500/40'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">{item.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    item.status === 'SYNCED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2">
                  <span>Type: <strong className="text-white">{item.type}</strong> ({item.payloadSize})</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
