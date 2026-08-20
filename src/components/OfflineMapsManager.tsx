import React, { useState } from 'react';
import { Download, WifiOff, HardDrive, Database, MapPin, CheckCircle2, Trash2, RefreshCw, Layers, ShieldCheck, Server, AlertTriangle, ArrowDown } from 'lucide-react';

export interface OfflineMapRegion {
  id: string;
  name: string;
  regionZone: string;
  coordinates: string;
  sizeMb: number;
  tilesCount: number;
  depthContoursAvailable: boolean;
  isDownloaded: boolean;
  downloadProgress: number; // 0 to 100
  lastUpdated: string;
}

export const INITIAL_OFFLINE_MAP_REGIONS: OfflineMapRegion[] = [
  {
    id: 'MAP-MALACCA',
    name: 'Malacca Strait & Singapore Port Approaches',
    regionZone: 'Southeast Asia SLOC',
    coordinates: '1.2° N to 6.0° N, 98.0° E to 104.5° E',
    sizeMb: 240,
    tilesCount: 14200,
    depthContoursAvailable: true,
    isDownloaded: true,
    downloadProgress: 100,
    lastUpdated: '2026-08-01 12:00 UTC'
  },
  {
    id: 'MAP-BAY-OF-BENGAL',
    name: 'Bay of Bengal & Andaman Sea Outer Basin',
    regionZone: 'South Asia Coastal',
    coordinates: '8.0° N to 22.5° N, 80.0° E to 95.0° E',
    sizeMb: 380,
    tilesCount: 22800,
    depthContoursAvailable: true,
    isDownloaded: true,
    downloadProgress: 100,
    lastUpdated: '2026-07-28 18:30 UTC'
  },
  {
    id: 'MAP-ARABIAN-SEA',
    name: 'Arabian Sea, Gulf of Oman & Mumbai High',
    regionZone: 'Middle East / India Trade Corridor',
    coordinates: '12.0° N to 25.0° N, 58.0° E to 73.5° E',
    sizeMb: 420,
    tilesCount: 26500,
    depthContoursAvailable: true,
    isDownloaded: false,
    downloadProgress: 0,
    lastUpdated: 'Not Cached'
  },
  {
    id: 'MAP-SUEZ-RED-SEA',
    name: 'Suez Canal Corridor, Red Sea & Bab-el-Mandeb',
    regionZone: 'Red Sea Commercial Passage',
    coordinates: '12.5° N to 30.0° N, 32.0° E to 43.5° E',
    sizeMb: 190,
    tilesCount: 11400,
    depthContoursAvailable: true,
    isDownloaded: false,
    downloadProgress: 0,
    lastUpdated: 'Not Cached'
  },
  {
    id: 'MAP-NORTH-SEA',
    name: 'North Sea, Rotterdam & English Channel',
    regionZone: 'European Maritime Zone',
    coordinates: '49.5° N to 58.0° N, 4.0° W to 9.0° E',
    sizeMb: 310,
    tilesCount: 18900,
    depthContoursAvailable: true,
    isDownloaded: false,
    downloadProgress: 0,
    lastUpdated: 'Not Cached'
  }
];

export const OfflineMapsManager: React.FC = () => {
  const [regions, setRegions] = useState<OfflineMapRegion[]>(INITIAL_OFFLINE_MAP_REGIONS);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [autoSyncOnSatSignal, setAutoSyncOnSatSignal] = useState<boolean>(true);
  const [highResBathymetry, setHighResBathymetry] = useState<boolean>(true);

  // Storage Quota Stats
  const totalCachedMb = regions
    .filter((r) => r.isDownloaded)
    .reduce((acc, curr) => acc + curr.sizeMb, 0);
  const maxQuotaMb = 5000; // 5GB browser quota allocation

  const handleStartDownload = (id: string) => {
    setDownloadingId(id);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        clearInterval(interval);
        setDownloadingId(null);
        setRegions((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  isDownloaded: true,
                  downloadProgress: 100,
                  lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
                }
              : r
          )
        );
      } else {
        setRegions((prev) =>
          prev.map((r) => (r.id === id ? { ...r, downloadProgress: progress } : r))
        );
      }
    }, 400);
  };

  const handleDeleteCache = (id: string) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              isDownloaded: false,
              downloadProgress: 0,
              lastUpdated: 'Not Cached'
            }
          : r
      )
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Top Title & Quota Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <WifiOff className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>OFFLINE NAUTICAL CHARTS & VECTOR TILE ENGINE</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <HardDrive className="w-6 h-6 text-emerald-400" />
            <span>Offline Maps & Chart Cache Manager</span>
          </h2>
          <p className="text-xs text-slate-400">
            Pre-download S-57 IHO compliant vector nautical chart tiles, 3D bathymetry contours, and satellite overlays for zero-connectivity high-seas navigation.
          </p>
        </div>

        {/* Quota Progress Widget */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2 min-w-[280px]">
          <div className="flex justify-between text-slate-300">
            <span>OFFLINE STORAGE QUOTA:</span>
            <strong className="text-emerald-400">{totalCachedMb} MB / {maxQuotaMb} MB</strong>
          </div>
          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${(totalCachedMb / maxQuotaMb) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
            <span>{((totalCachedMb / maxQuotaMb) * 100).toFixed(1)}% Used</span>
            <span>{(maxQuotaMb - totalCachedMb).toFixed(0)} MB Free Allocation</span>
          </div>
        </div>
      </div>

      {/* Global Cache Options Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={autoSyncOnSatSignal}
            onChange={(e) => setAutoSyncOnSatSignal(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700"
          />
          <div>
            <strong className="text-white block">Auto-Sync Maps on Satellite Reconnect</strong>
            <span className="text-[10px] text-slate-400">Syncs updated hazard notices & tidal tables when Inmarsat signal is active</span>
          </div>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={highResBathymetry}
            onChange={(e) => setHighResBathymetry(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700"
          />
          <div>
            <strong className="text-white block">High-Resolution Depth Bathymetry Contours</strong>
            <span className="text-[10px] text-slate-400">Includes 1-meter shallow reef depth soundings and anchoring seabed tiles</span>
          </div>
        </label>
      </div>

      {/* Regional Map Tiles Download Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Regional Nautical Map Bounding Boxes</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {regions.map((region) => {
            const isDownloading = downloadingId === region.id;

            return (
              <div
                key={region.id}
                className={`p-5 rounded-2xl border transition-all space-y-4 ${
                  region.isDownloaded
                    ? 'bg-slate-950 border-emerald-500/40 shadow-xl'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{region.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                        {region.regionZone}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-base text-white mt-1">{region.name}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">Bounding Box: {region.coordinates}</p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center space-x-1 ${
                    region.isDownloaded
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {region.isDownloaded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>OFFLINE READY</span>
                      </>
                    ) : (
                      <span>NOT CACHED</span>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">CACHE SIZE:</span>
                    <strong className="text-white">{region.sizeMb} MB</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">VECTOR TILES:</span>
                    <strong className="text-cyan-300">{region.tilesCount.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">LAST UPDATED:</span>
                    <strong className="text-amber-300 text-[10px]">{region.lastUpdated}</strong>
                  </div>
                </div>

                {/* Progress bar if downloading */}
                {isDownloading && (
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-300"
                        style={{ width: `${region.downloadProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 block text-right font-bold">
                      Downloading tiles... {region.downloadProgress}%
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 font-mono text-xs">
                  {region.isDownloaded ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] text-emerald-300 flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>S-57 ECDIS Vector Chart Cache Valid</span>
                      </span>
                      <button
                        onClick={() => handleDeleteCache(region.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 hover:text-rose-400 text-slate-400 border border-slate-800 transition-colors flex items-center space-x-1"
                        title="Delete cached offline tile pack"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-[10px]">DELETE</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={isDownloading}
                      onClick={() => handleStartDownload(region.id)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
                    >
                      <Download className="w-4 h-4 text-slate-950" />
                      <span>{isDownloading ? 'DOWNLOADING TILES...' : `DOWNLOAD OFFLINE MAP PACK (${region.sizeMb} MB)`}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
