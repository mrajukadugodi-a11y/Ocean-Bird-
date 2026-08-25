import React, { useState, useEffect } from 'react';
import {
  Globe,
  Chrome,
  AlertTriangle,
  CheckCircle2,
  Copy,
  ExternalLink,
  RefreshCw,
  Download,
  ShieldCheck,
  Smartphone,
  Laptop,
  HelpCircle,
  X,
  Info,
  Zap,
  ArrowRight
} from 'lucide-react';

interface ChromeBrowserDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChromeBrowserDiagnosticModal: React.FC<ChromeBrowserDiagnosticModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [browserInfo, setBrowserInfo] = useState({
    isChrome: false,
    isIframe: false,
    isHttps: false,
    userAgent: '',
    currentUrl: '',
    isDevUrl: false
  });
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  // Public Production Shared URL
  const PUBLIC_SHARED_URL = 'https://ais-pre-52ufmuktvzrlwu42vexorh-273406748668.asia-southeast1.run.app';
  const DEV_URL = 'https://ais-dev-52ufmuktvzrlwu42vexorh-273406748668.asia-southeast1.run.app';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent;
    const isChromium = /Chrome/.test(ua) && !/Chromium|Edg|OPR/.test(ua);
    const inIframe = window.self !== window.top;
    const isSecure = window.location.protocol === 'https:';
    const href = window.location.href;
    const isDev = href.includes('ais-dev');

    setBrowserInfo({
      isChrome: isChromium,
      isIframe: inIframe,
      isHttps: isSecure,
      userAgent: ua,
      currentUrl: href,
      isDevUrl: isDev
    });

    // PWA Install prompt listener
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleCopyUrl = (urlToCopy: string) => {
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstallPwa = async () => {
    if (!installPromptEvent) {
      alert('To install on Google Chrome:\n1. Click the 3 dots (⋮) in Chrome top-right corner.\n2. Click "Save and share" -> "Install OCEAN BIRD App".');
      return;
    }
    setIsInstalling(true);
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    setIsInstalling(false);
    if (outcome === 'accepted') {
      setInstallPromptEvent(null);
    }
  };

  const handleClearCacheAndReload = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }
    caches.keys().then((names) => {
      for (let name of names) {
        caches.delete(name);
      }
    });
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-cyan-950 via-slate-900 to-teal-950 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl">
              <Chrome className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  Google Chrome Fix & Access
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h2 className="text-lg font-extrabold text-white">Why App Isn't Opening in Chrome & Instant Solutions</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-slate-200 text-xs">
          
          {/* Quick Solution Card */}
          <div className="p-5 bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/40 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>RECOMMENDED INSTANT SOLUTION</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-1 rounded-lg">
                100% Working Public Link
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              If you tried opening the developer preview link (<code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">ais-dev-...</code>), Google Chrome blocks it because it requires an active developer sandbox token. 
              <strong className="text-white"> Use the Public Shared Production Link below in Google Chrome:</strong>
            </p>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="truncate w-full sm:w-auto text-emerald-300 font-mono text-xs font-bold">
                {PUBLIC_SHARED_URL}
              </div>
              <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleCopyUrl(PUBLIC_SHARED_URL)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition flex items-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>

                <a
                  href={PUBLIC_SHARED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <Chrome className="w-4 h-4" />
                  <span>Launch in Google Chrome</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Root Reasons Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Reason 1 */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>1. Sandbox URL Restriction</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                The <code className="text-amber-300">ais-dev</code> link only works inside the active AI Studio editor. External Google Chrome windows require the public <code className="text-emerald-300">ais-pre</code> link.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>2. Chrome Privacy Shields</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Google Chrome blocks third-party cookie access in embedded iFrames. Opening the direct URL in a standalone tab resolves cross-origin blockages.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs">
                <RefreshCw className="w-4 h-4" />
                <span>3. Stale Service Worker</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Chrome caches Progressive Web App service workers aggressively. Clearing cache forces Chrome to load the freshly compiled app code.
              </p>
            </div>

          </div>

          {/* Diagnostics Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Live Browser Environment Diagnostics</span>
              </span>
              <span className="text-[10px] text-slate-400">Target Protocol: HTTPS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Browser Engine</span>
                <strong className={browserInfo.isChrome ? 'text-emerald-400' : 'text-cyan-400'}>
                  {browserInfo.isChrome ? 'Google Chrome' : 'Chromium / WebKit'}
                </strong>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">URL Type</span>
                <strong className={browserInfo.isDevUrl ? 'text-amber-400' : 'text-emerald-400'}>
                  {browserInfo.isDevUrl ? 'Dev Sandbox' : 'Public Shared'}
                </strong>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Display Mode</span>
                <strong className={browserInfo.isIframe ? 'text-amber-400' : 'text-emerald-400'}>
                  {browserInfo.isIframe ? 'Inside iFrame' : 'Standalone Tab'}
                </strong>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">SSL Security</span>
                <strong className="text-emerald-400">
                  {browserInfo.isHttps ? 'Encrypted HTTPS' : 'Insecure'}
                </strong>
              </div>
            </div>
          </div>

          {/* Chrome PWA Installation & Cache Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleInstallPwa}
              disabled={isInstalling}
              className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-extrabold rounded-xl transition flex items-center justify-center space-x-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Install App on Google Chrome</span>
            </button>

            <button
              onClick={handleClearCacheAndReload}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition flex items-center justify-center space-x-2 border border-slate-700"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>Clear Chrome Cache & Force Reload</span>
            </button>
          </div>

        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tested for Google Chrome Version 120+ (Desktop & Mobile)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition"
          >
            Close Diagnostics
          </button>
        </div>

      </div>
    </div>
  );
};
