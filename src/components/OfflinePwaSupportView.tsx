import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  Download,
  HardDrive,
  CheckCircle2,
  Smartphone,
  Layers,
  Map,
  Database,
  ArrowDownToLine,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { OfflineFlightCacheManager } from './OfflineFlightCacheManager';

export interface OfflineChartPack {

  id: string;
  regionName: string;
  sizeMb: number;
  status: 'DOWNLOADED' | 'AVAILABLE';
  lastUpdated: string;
}

const INITIAL_CHART_PACKS: OfflineChartPack[] = [
  {
    id: 'PACK-01',
    regionName: 'India West Coast S-57 ENC Charts (Mumbai - Goa - Cochin)',
    sizeMb: 84,
    status: 'DOWNLOADED',
    lastUpdated: '2026-07-28'
  },
  {
    id: 'PACK-02',
    regionName: 'Bay of Bengal & Chittagong Outer Anchorage ENC',
    sizeMb: 62,
    status: 'DOWNLOADED',
    lastUpdated: '2026-07-29'
  },
  {
    id: 'PACK-03',
    regionName: 'Malacca Strait High Density Traffic Corridor',
    sizeMb: 110,
    status: 'AVAILABLE',
    lastUpdated: '2026-07-30'
  },
  {
    id: 'PACK-04',
    regionName: 'Persian Gulf & Gulf of Oman Deep Water Shipping Lanes',
    sizeMb: 95,
    status: 'AVAILABLE',
    lastUpdated: '2026-07-30'
  }
];

export const OfflinePwaSupportView: React.FC = () => {
  const [chartPacks, setChartPacks] = useState<OfflineChartPack[]>(INITIAL_CHART_PACKS);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [pwaInstalled, setPwaInstalled] = useState<boolean>(false);

  const handleDownloadPack = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setChartPacks(
        chartPacks.map((p) => (p.id === id ? { ...p, status: 'DOWNLOADED' } : p))
      );
      setDownloadingId(null);
    }, 1500);
  };

  const handleInstallPwa = () => {
    setPwaInstalled(true);
  };

  const totalOfflineStorageMb = chartPacks
    .filter((p) => p.status === 'DOWNLOADED')
    .reduce((acc, curr) => acc + curr.sizeMb, 0);

  return (
    <div id="offline-pwa-support-view" className="space-y-6 font-mono">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>OFFLINE SERVICE WORKER & S-57 ENC VECTOR MAP PERSISTENCE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Smartphone className="w-6 h-6 text-teal-400" />
              <span>Progressive Web App (PWA) & Offline Mode</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Full offline capability for high-seas oceanic navigation without internet connection. Download offline S-57 ENC vector charts directly to IndexedDB.
            </p>
          </div>

          <button
            onClick={handleInstallPwa}
            disabled={pwaInstalled}
            className={`px-5 py-3 rounded-xl font-extrabold text-xs shadow-xl flex items-center space-x-2 shrink-0 transition-all ${
              pwaInstalled
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{pwaInstalled ? 'PWA INSTALLED ON DEVICE' : 'INSTALL PWA TO BRIDGE TABLET'}</span>
          </button>
        </div>
      </div>

      {/* PWA Service Worker Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">SERVICE WORKER STATUS</span>
          <strong className="text-emerald-400 text-sm flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>CACHE ACTIVE (v2.4.0)</span>
          </strong>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">OFFLINE S-57 STORAGE</span>
          <strong className="text-teal-400 text-sm flex items-center space-x-1">
            <HardDrive className="w-4 h-4" />
            <span>{totalOfflineStorageMb} MB STORED IN INDEXEDDB</span>
          </strong>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">HIGH-SEAS DISCONNECTED ROUTING</span>
          <strong className="text-amber-400 text-sm flex items-center space-x-1">
            <WifiOff className="w-4 h-4" />
            <span>READY FOR ZERO-CONNECTIVITY</span>
          </strong>
        </div>
      </div>

      {/* Offline Chart Packs List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-sm flex items-center space-x-2">
            <Map className="w-4 h-4 text-teal-400" />
            <span>S-57 ENC Nautical Offline Vector Chart Packs</span>
          </h3>

          <span className="text-xs text-teal-400 font-bold">
            {chartPacks.filter((p) => p.status === 'DOWNLOADED').length} / {chartPacks.length} PACKS INSTALLED
          </span>
        </div>

        <div className="space-y-3">
          {chartPacks.map((pack) => {
            const isDownloaded = pack.status === 'DOWNLOADED';
            const isDownloading = downloadingId === pack.id;

            return (
              <div
                key={pack.id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <strong className="text-white text-xs block">{pack.regionName}</strong>
                  <span className="text-[10px] text-slate-400">
                    SIZE: {pack.sizeMb} MB • LAST UPDATED: {pack.lastUpdated}
                  </span>
                </div>

                <div className="shrink-0">
                  {isDownloaded ? (
                    <span className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>DOWNLOADED & CACHED</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDownloadPack(pack.id)}
                      disabled={isDownloading}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all"
                    >
                      <ArrowDownToLine className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
                      <span>{isDownloading ? 'DOWNLOADING...' : 'DOWNLOAD FOR OFFLINE'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flight Booking & Tracking Service Worker Caching Component */}
      <OfflineFlightCacheManager />
    </div>
  );
};
