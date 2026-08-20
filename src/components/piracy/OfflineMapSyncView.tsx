import React, { useState } from 'react';
import { WifiOff, Database, Download, CheckCircle2, RefreshCw, HardDrive, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface OfflineMapTilePackage {
  id: string;
  regionName: string;
  tileResolution: string;
  packageSizeMb: number;
  lastSyncedTimestamp: string;
  syncStatus: 'CACHED' | 'SYNCING' | 'PENDING_UPDATE';
}

const OFFLINE_PACKAGES: OfflineMapTilePackage[] = [
  {
    id: 'TILE-REDSEA',
    regionName: 'Red Sea & Bab-el-Mandeb Vector Charts',
    tileResolution: 'High-Res Vector (Zoom Level 1-18)',
    packageSizeMb: 142.5,
    lastSyncedTimestamp: '2026-08-07 09:15 UTC',
    syncStatus: 'CACHED'
  },
  {
    id: 'TILE-BALTIC',
    regionName: 'Baltic Sea & Danish Straits Ice Navigation Grid',
    tileResolution: 'Subsea Cable & Ice Route Vector',
    packageSizeMb: 175.2,
    lastSyncedTimestamp: '2026-08-07 08:30 UTC',
    syncStatus: 'CACHED'
  },
  {
    id: 'TILE-GUINEA',
    regionName: 'Gulf of Guinea Offshore Security Grid',
    tileResolution: 'Bathymetric & AIS Vector',
    packageSizeMb: 98.0,
    lastSyncedTimestamp: '2026-08-06 18:30 UTC',
    syncStatus: 'CACHED'
  },
  {
    id: 'TILE-MALACCA',
    regionName: 'Singapore & Malacca Strait Chokepoints',
    tileResolution: 'Ultra High-Res Nautical Tiles',
    packageSizeMb: 210.4,
    lastSyncedTimestamp: '2026-08-07 02:10 UTC',
    syncStatus: 'PENDING_UPDATE'
  }
];

export const OfflineMapSyncView: React.FC = () => {
  const [packages, setPackages] = useState<OfflineMapTilePackage[]>(OFFLINE_PACKAGES);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSyncPackage = (pkg: OfflineMapTilePackage) => {
    hapticEngine.trigger('success');
    setSyncingId(pkg.id);

    setTimeout(() => {
      setPackages((prev) =>
        prev.map((item) =>
          item.id === pkg.id
            ? {
                ...item,
                syncStatus: 'CACHED',
                lastSyncedTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
              }
            : item
        )
      );
      setSyncingId(null);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <WifiOff className="w-4 h-4 text-cyan-400" />
            <span>Low-Bandwidth Satellite Offline Nautical Map Vector & AIS Cache Manager</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Store vector nautical tiles, piracy threat overlays, and AIS vessel tracks locally for offline satellite bridge operation
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          626.1 MB CACHED LOCALLY
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between items-start border-b border-slate-900 pb-2">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold block">{pkg.id} • {pkg.packageSizeMb} MB</span>
                <h4 className="text-xs font-bold text-white">{pkg.regionName}</h4>
              </div>
              <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                pkg.syncStatus === 'CACHED'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {pkg.syncStatus}
              </span>
            </div>

            <div className="space-y-1 text-[9px] font-sans">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Resolution:</span>
                <span className="text-slate-200 font-bold">{pkg.tileResolution}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Last Synced:</span>
                <span className="text-cyan-300 font-bold">{pkg.lastSyncedTimestamp}</span>
              </div>
            </div>

            <button
              onClick={() => handleSyncPackage(pkg)}
              disabled={syncingId === pkg.id}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold rounded-xl text-xs border border-slate-800 flex items-center justify-center space-x-1.5 transition-colors font-mono"
            >
              {syncingId === pkg.id ? (
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{syncingId === pkg.id ? 'DOWNLOADING TILES...' : 'SYNC OFFLINE TILES'}</span>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
