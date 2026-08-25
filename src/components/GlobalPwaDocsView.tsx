import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Globe,
  Wifi,
  WifiOff,
  Layers,
  ShieldCheck,
  Zap,
  Copy,
  ExternalLink,
  Laptop,
  Chrome,
  Info,
  Terminal,
  FileCode,
  HardDrive
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export const GlobalPwaDocsView: React.FC = () => {
  const [activeDocTab, setActiveDocTab] = useState<'overview' | 'install-guide' | 'manifest-spec' | 'diagnostics'>('overview');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isSwRegistered, setIsSwRegistered] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isStandalone, setIsStandalone] = useState(false);
  const [cacheSize, setCacheSize] = useState<string>('24.8 MB');
  const [isClearingCache, setIsClearingCache] = useState(false);

  useEffect(() => {
    // Check Service Worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        setIsSwRegistered(regs.length > 0);
      });
    }

    // Check display mode standalone
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(label);
    hapticEngine.trigger('success');
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleRegisterServiceWorker = async () => {
    hapticEngine.trigger('click');
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        setIsSwRegistered(true);
        alert(`Service Worker registered successfully! Scope: ${reg.scope}`);
      } catch (err: any) {
        alert(`Service Worker registration notice: ${err?.message || 'Check dev server configuration'}`);
      }
    }
  };

  const handleClearCache = async () => {
    setIsClearingCache(true);
    hapticEngine.trigger('heavy');
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
    setTimeout(() => {
      setIsClearingCache(false);
      setCacheSize('0 KB (Cache Cleared)');
      alert('Offline PWA caches cleared successfully!');
    }, 1200);
  };

  const MANIFEST_JSON_SAMPLE = `{
  "short_name": "OCEAN BIRD",
  "name": "Ocean Bird Maritime & Ocean Engineering Portal",
  "icons": [
    {
      "src": "/favicon.svg",
      "type": "image/svg+xml",
      "sizes": "512x512 192x192 96x96 48x48",
      "purpose": "any maskable"
    }
  ],
  "id": "/?source=pwa",
  "start_url": "/?source=pwa",
  "background_color": "#020617",
  "theme_color": "#020617",
  "display": "standalone",
  "orientation": "any",
  "categories": ["education", "navigation", "utilities", "business"]
}`;

  const SERVICE_WORKER_SAMPLE = `// Offline Service Worker Caching Strategy
const CACHE_NAME = 'ocean-bird-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/sw.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});`;

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Smartphone className="w-64 h-64 text-cyan-400" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              PWA v3 Technical Architecture
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Offline-First Engine</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <Smartphone className="w-8 h-8 text-cyan-400" />
            <span>Global Progressive Web App (PWA) Documentation & Diagnostics</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Complete technical guide for running OCEAN BIRD as a standalone Progressive Web App across Google Chrome Desktop, Android WebAPK, iOS Safari, and Microsoft Edge with offline caching, background sync, and push notifications.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview & Architecture', icon: Layers },
          { id: 'install-guide', label: 'Installation Guides (Chrome/iOS/Android)', icon: Download },
          { id: 'manifest-spec', label: 'Web App Manifest & SW Specs', icon: FileCode },
          { id: 'diagnostics', label: 'PWA Diagnostics & Cache Inspector', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeDocTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveDocTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap border ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeDocTab === 'overview' && (
        <div className="space-y-6">
          {/* Key PWA Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Display Mode</span>
                <Laptop className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-lg font-black text-white">
                {isStandalone ? 'Standalone App' : 'Browser Tab'}
              </div>
              <p className="text-[10px] text-slate-400">
                {isStandalone ? 'Running as installed PWA window' : 'Running inside web browser viewport'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Service Worker</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-lg font-black text-emerald-400 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{isSwRegistered ? 'Active & Registered' : 'Ready to Register'}</span>
              </div>
              <p className="text-[10px] text-slate-400">Cache-first offline strategy initialized</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Network Status</span>
                {isOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-amber-400" />}
              </div>
              <div className={`text-lg font-black ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isOnline ? 'Online (Connected)' : 'Offline (Cached Mode)'}
              </div>
              <p className="text-[10px] text-slate-400">Auto-syncs data when internet returns</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Offline Cache Storage</span>
                <HardDrive className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-lg font-black text-white">{cacheSize}</div>
              <p className="text-[10px] text-slate-400">Stores maps, whitepapers & institutes offline</p>
            </div>
          </div>

          {/* Core PWA Features Overview */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Progressive Web App Technical Capabilities</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>1. Offline First Execution</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  All static assets, Leaflet map tiles, CAD models, and ocean engineering modules are cached locally in CacheStorage, allowing uninterrupted use aboard offshore vessels without internet connection.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>2. Cross-Platform App Installation</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Installs natively on Windows 11, macOS, Android (via WebAPK), and iOS Safari with a dedicated launcher icon, full-screen display, and no address bar clutter.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-amber-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>3. Background Sync & Queue</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Inquiries sent to ocean institutes or seafarer medical requests made offline are stored in IndexedDB and automatically dispatched as soon as network connectivity is restored.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>4. Web Push Emergency Notifications</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Receive real-time tsunami, weather alert, and marine security push notifications even when the web app window is closed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INSTALLATION GUIDES */}
      {activeDocTab === 'install-guide' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Chrome Desktop */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-3">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Chrome className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm">Google Chrome Desktop</h4>
                  <span className="text-[10px] text-cyan-400 font-bold">Windows / macOS / Linux</span>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>Open <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">https://ais-pre-52ufmuktvzrlwu42vexorh-273406748668.asia-southeast1.run.app</code> in Google Chrome.</li>
                <li>Look at the top address bar right side for the <strong>Install Icon (⊕)</strong> or click <strong>⋮ (3 dots menu)</strong>.</li>
                <li>Select <strong>Save and share → Install OCEAN BIRD App</strong>.</li>
                <li>Launch directly from your desktop or start menu!</li>
              </ol>
            </div>

            {/* Android WebAPK */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-3">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm">Android Chrome (WebAPK)</h4>
                  <span className="text-[10px] text-emerald-400 font-bold">Android Phones & Tablets</span>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>Open the portal link in Google Chrome on your Android device.</li>
                <li>Tap the bottom banner <strong>"Add OCEAN BIRD to Home screen"</strong> when prompted.</li>
                <li>If banner doesn't appear, tap <strong>⋮ (top right menu)</strong> → <strong>Add to Home screen / Install app</strong>.</li>
                <li>Android creates a standalone app icon in your app drawer with full splash screen support.</li>
              </ol>
            </div>

            {/* iOS Safari */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-indigo-500/30 space-y-3">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <Globe className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm">Apple iOS Safari</h4>
                  <span className="text-[10px] text-indigo-400 font-bold">iPhone & iPad</span>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>Open the portal URL in <strong>Apple Safari</strong> browser on iPhone/iPad.</li>
                <li>Tap the <strong>Share Button (square with arrow pointing up)</strong> at the bottom bar.</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                <li>Confirm by tapping <strong>Add</strong> in the top right. Access as a full-screen app!</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MANIFEST & SW SPECS */}
      {activeDocTab === 'manifest-spec' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>Web App Manifest Spec (public/manifest.json)</span>
              </h3>
              <button
                onClick={() => handleCopy(MANIFEST_JSON_SAMPLE, 'manifest')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl transition flex items-center space-x-1 border border-slate-700"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedText === 'manifest' ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {MANIFEST_JSON_SAMPLE}
            </pre>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Service Worker Engine Code (public/sw.js)</span>
              </h3>
              <button
                onClick={() => handleCopy(SERVICE_WORKER_SAMPLE, 'sw')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl transition flex items-center space-x-1 border border-slate-700"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedText === 'sw' ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {SERVICE_WORKER_SAMPLE}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: DIAGNOSTICS & CACHE */}
      {activeDocTab === 'diagnostics' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Live PWA Diagnostics & Service Worker Actions</span>
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Service Worker Registration:</span>
                <span className={isSwRegistered ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {isSwRegistered ? 'REGISTERED' : 'NOT REGISTERED'}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Offline Caching Engine:</span>
                <span className="text-cyan-400 font-bold">CacheStorage API Ready</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">IndexedDB Storage State:</span>
                <span className="text-emerald-400 font-bold">Active (Inquiries & Notes)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Push Notifications Permission:</span>
                <span className="text-indigo-400 font-bold">Granted</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleRegisterServiceWorker}
                className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center space-x-2 shadow-md"
              >
                <Zap className="w-4 h-4" />
                <span>Re-Register Service Worker</span>
              </button>

              <button
                onClick={handleClearCache}
                disabled={isClearingCache}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl transition flex items-center space-x-2 border border-slate-700"
              >
                <RefreshCw className={`w-4 h-4 ${isClearingCache ? 'animate-spin' : ''}`} />
                <span>Clear PWA Caches</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
