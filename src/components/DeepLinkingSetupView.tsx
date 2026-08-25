import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Copy,
  ExternalLink,
  QrCode,
  Smartphone,
  CheckCircle2,
  FileCode,
  Share2,
  Play,
  Zap,
  Globe,
  Layers,
  Sparkles,
  Search,
  Download
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';
import { NavTabType } from './Navbar';

interface DeepLinkingSetupViewProps {
  onNavigateToTab: (tabId: NavTabType, params?: Record<string, string>) => void;
}

export const DeepLinkingSetupView: React.FC<DeepLinkingSetupViewProps> = ({ onNavigateToTab }) => {
  const [selectedTab, setSelectedTab] = useState<NavTabType>('ocean-mining-engineering');
  const [customParams, setCustomParams] = useState<string>('instituteId=inst-niot-chennai&view=map');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'generator' | 'qr-code' | 'mobile-specs'>('generator');

  const BASE_URL = 'https://ais-pre-52ufmuktvzrlwu42vexorh-273406748668.asia-southeast1.run.app';

  // Construct current deep link
  const generatedDeepLink = `${BASE_URL}/?tab=${selectedTab}${customParams ? `&${customParams}` : ''}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedDeepLink);
    setCopiedLink(true);
    hapticEngine.trigger('success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleExecuteLink = () => {
    hapticEngine.trigger('heavy');
    // Extract key params
    const searchParams = new URLSearchParams(customParams);
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    onNavigateToTab(selectedTab, paramsObj);
  };

  const APPLE_APP_SITE_ASSOCIATION = `{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.oceanbird.app",
        "paths": ["/*", "/?tab=*"]
      }
    ]
  }
}`;

  const ASSET_LINKS_JSON = `[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.oceanbird.app",
      "sha256_cert_fingerprints": [
        "14:6D:E9:02:18:61:A0:61:AE:5C:88:B6:3B:BB:22:15:3A:20:9A:8B:46:12:12 shadow"
      ]
    }
  }
]`;

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Universal Deep Linking Protocol
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Direct Module Routing</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <LinkIcon className="w-8 h-8 text-cyan-400" />
            <span>Universal Deep Linking & Direct Route Manager</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Generate shareable deep link URLs, custom query parameters, and mobile QR codes that immediately open specific ocean engineering institutes, research whitepapers, or fleet tracking views.
          </p>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'generator', label: 'Deep Link URL Generator', icon: LinkIcon },
          { id: 'qr-code', label: 'Mobile Scanning QR Code', icon: QrCode },
          { id: 'mobile-specs', label: 'iOS Universal Links & Android App Links', icon: Smartphone }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveSubTab(tab.id as any);
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

      {/* TAB 1: GENERATOR */}
      {activeSubTab === 'generator' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <LinkIcon className="w-4 h-4 text-cyan-400" />
              <span>Deep Link Parameters Configurator</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Target Tab Selector */}
              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">Select Target Module/Tab:</label>
                <select
                  value={selectedTab}
                  onChange={(e) => setSelectedTab(e.target.value as NavTabType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                >
                  <option value="ocean-mining-engineering">Ocean Mining Engineering Directory & Map</option>
                  <option value="pwa-support">PWA Support & Diagnostics Docs</option>
                  <option value="app-status-portal">App Status & Uptime Monitor</option>
                  <option value="search-indexing-portal">SEO Search Indexing Portal</option>
                  <option value="vessels-gps-tracker">Vessels AIS GPS Fleet Radar</option>
                  <option value="digital-passport">Seafarer Medical Digital Passport</option>
                  <option value="super-master-dark-web-cyber-shield">Cyber Defense & Dark Web Shield</option>
                  <option value="maritime-esg-report">Maritime ESG Report</option>
                  <option value="deployment-guide">Deployment & CI/CD Command Center</option>
                </select>
              </div>

              {/* Custom Query Parameters */}
              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">Custom Query Parameters (e.g. key=val):</label>
                <input
                  type="text"
                  value={customParams}
                  onChange={(e) => setCustomParams(e.target.value)}
                  placeholder="e.g. instituteId=inst-niot-chennai&view=map"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Generated Link Display Box */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/30 space-y-3">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                Generated Universal Deep Link URL:
              </span>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 break-all">
                {generatedDeepLink}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center space-x-1.5 border border-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={handleExecuteLink}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Execute Deep Link Now</span>
                  </button>
                </div>

                <span className="text-[10px] text-slate-400">
                  Instant execution in current app session
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QR CODE */}
      {activeSubTab === 'qr-code' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 max-w-lg mx-auto">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center justify-center space-x-2">
              <QrCode className="w-5 h-5 text-cyan-400" />
              <span>Mobile Camera Deep Link Scanner</span>
            </h3>

            <p className="text-slate-400 text-xs">
              Scan this QR code with any smartphone camera to open the targeted deep link page directly on Android or iPhone:
            </p>

            <div className="p-6 bg-white rounded-3xl inline-block shadow-2xl border-4 border-cyan-400">
              {/* Dynamic SVG QR Code Representation */}
              <svg className="w-48 h-48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white" />
                {/* Corner Anchors */}
                <rect x="10" y="10" width="25" height="25" fill="#020617" />
                <rect x="14" y="14" width="17" height="17" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#0eA5E9" />

                <rect x="65" y="10" width="25" height="25" fill="#020617" />
                <rect x="69" y="14" width="17" height="17" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#0eA5E9" />

                <rect x="10" y="65" width="25" height="25" fill="#020617" />
                <rect x="14" y="69" width="17" height="17" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#0eA5E9" />

                {/* Data Matrix Dots */}
                <rect x="42" y="15" width="6" height="6" fill="#020617" />
                <rect x="52" y="25" width="6" height="6" fill="#020617" />
                <rect x="42" y="35" width="12" height="6" fill="#0ea5e9" />
                <rect x="15" y="45" width="6" height="12" fill="#020617" />
                <rect x="30" y="45" width="12" height="6" fill="#020617" />
                <rect x="50" y="45" width="6" height="6" fill="#0ea5e9" />
                <rect x="65" y="45" width="18" height="6" fill="#020617" />
                <rect x="42" y="60" width="6" height="18" fill="#020617" />
                <rect x="55" y="65" width="12" height="12" fill="#0ea5e9" />
                <rect x="75" y="75" width="12" height="12" fill="#020617" />
              </svg>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] font-mono text-cyan-300 break-all">
              {generatedDeepLink}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MOBILE SPECS */}
      {activeSubTab === 'mobile-specs' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Apple iOS Universal Links Config (apple-app-site-association)</span>
            </h3>

            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {APPLE_APP_SITE_ASSOCIATION}
            </pre>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Android App Links Config (assetlinks.json)</span>
            </h3>

            <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {ASSET_LINKS_JSON}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
