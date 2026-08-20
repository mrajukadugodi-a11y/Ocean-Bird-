import React, { useState, useEffect } from 'react';
import oceanDollarNoteImg from '../assets/images/ocean_dollar_banknote_1787143582965.jpg';
import { OceanDollarVisualAndSpecPortal } from './OceanDollarVisualAndSpecPortal';
import { SovereignMintingAndQuantumLotteryPortal } from './SovereignMintingAndQuantumLotteryPortal';
import { QuantumLotteryRiskFundAndEarningPortal } from './QuantumLotteryRiskFundAndEarningPortal';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, 
  CartesianGrid, Legend, PieChart, Pie, LineChart, Line, ComposedChart 
} from 'recharts';
import { 
  Download, ShieldCheck, Sparkles, RefreshCw, Cpu, Check, Copy, ExternalLink, 
  Globe, ShieldAlert, Award, FileText, CheckCircle2, Zap, Radio, Bell, ArrowRight,
  Smartphone, Monitor, HardDrive, CreditCard, Lock, Terminal, Bot, BookOpen,
  Info, HelpCircle, Layers, Sliders, ChevronDown, ChevronRight, Hash, TrendingUp,
  Users, DollarSign, Activity, FileCheck, CheckSquare, Wrench
} from 'lucide-react';

export type SubscriptionTierId = 'FREE_SEAFARER' | 'CAPTAIN_COMMERCIAL' | 'FLEET_COMMAND' | 'SOVEREIGN_AGENCY';
export type AiRetrainInterval = 'EVERY_1_HOUR' | 'EVERY_6_HOURS' | 'EVERY_24_HOURS' | 'ON_DEMAND';

export interface SubscriptionTier {
  id: SubscriptionTierId;
  name: string;
  priceMonthly: number;
  priceAnnualDiscounted: number;
  targetUser: string;
  badgeTag: string;
  features: string[];
  recommended?: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'FREE_SEAFARER',
    name: 'Standard Seafarer',
    priceMonthly: 0,
    priceAnnualDiscounted: 0,
    targetUser: 'Individual Seafarers & Fishermen',
    badgeTag: 'FREE FOREVER',
    features: [
      'Basic Hydro-Met & Tide Predictions',
      'Community Tsunami & Earthquake Alerts',
      'VHF CH 16 Emergency Distress Guide',
      'PWA Offline Map Caching (100 MB)',
      'Basic Marine Weather API Access'
    ]
  },
  {
    id: 'CAPTAIN_COMMERCIAL',
    name: 'Commercial Captain Pro',
    priceMonthly: 49,
    priceAnnualDiscounted: 39,
    targetUser: 'Ship Captains & Watch Officers',
    badgeTag: 'MOST POPULAR',
    recommended: true,
    features: [
      'Real-Time A* Deepwater Evacuation Path Finder',
      'Automated DSC Channel 70 Siren Relay',
      'Inmarsat-C & NAVTEX Push Alerts',
      'Nankai & Cascadia Seismic Shake Vectors',
      'Off-Grid PWA Satellite Map Synchronization',
      'Priority Vessel Path Optimization'
    ]
  },
  {
    id: 'FLEET_COMMAND',
    name: 'Fleet Command Enterprise',
    priceMonthly: 299,
    priceAnnualDiscounted: 249,
    targetUser: 'Shipping Lines & Operations Managers',
    badgeTag: 'ENTERPRISE FLEET',
    features: [
      'Multi-Vessel Live AIS Fleet Tracking Dashboard',
      'South Asian Coastal Impact Analytics & GDP Loss Models',
      'Trade Disruption Alert & Demurrage Minimizer',
      'Infrastructure ROI Investment Maps',
      'Custom ECDIS Route XML Export',
      '24/7 Dedicated Satellite Telemetry SLA (99.998%)'
    ]
  },
  {
    id: 'SOVEREIGN_AGENCY',
    name: 'Sovereign Hydro-Met Agency',
    priceMonthly: 1499,
    priceAnnualDiscounted: 1199,
    targetUser: 'National Port Authorities & Ministries',
    badgeTag: 'SOVEREIGN NATION',
    features: [
      'Sovereign AI Auto-Updating Engine (Self-Upgrading)',
      'Direct Coastal Radar & Satellite Altimeter Ingestion',
      'Custom EEZ Territorial Water Warning Broadcasts',
      'Unlimited API Webhooks & Regulatory Audit Trail',
      'Dedicated Sovereign Cloud Partition',
      'Custom Port Authority Whitelabel Branding'
    ]
  }
];

export const SUBSCRIPTION_GROWTH_DATA = [
  { month: 'Mar 2026', MRR: 98200, FreeSeafarers: 82000, Captains: 1820, Fleets: 320, SovereignAgencies: 14 },
  { month: 'Apr 2026', MRR: 112400, FreeSeafarers: 94500, Captains: 2150, Fleets: 380, SovereignAgencies: 18 },
  { month: 'May 2026', MRR: 125800, FreeSeafarers: 108000, Captains: 2480, Fleets: 420, SovereignAgencies: 22 },
  { month: 'Jun 2026', MRR: 136200, FreeSeafarers: 121000, Captains: 2820, Fleets: 460, SovereignAgencies: 26 },
  { month: 'Jul 2026', MRR: 142800, FreeSeafarers: 132500, Captains: 3100, Fleets: 490, SovereignAgencies: 29 },
  { month: 'Aug 2026', MRR: 148250, FreeSeafarers: 142850, Captains: 3420, Fleets: 520, SovereignAgencies: 32 }
];

export const BUILD_ARTIFACTS = [
  {
    platform: 'Android APK (ARM64)',
    version: 'v4.8.2-PROD',
    size: '48.2 MB',
    checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    downloadUrl: '#download-apk',
    icon: Smartphone,
    color: '#10b981'
  },
  {
    platform: 'PWA ServiceWorker Bundle',
    version: 'v4.8.2-PWA',
    size: '12.4 MB (Compressed)',
    checksumSha256: '8f4e2b1a9c3d7e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
    downloadUrl: '#install-pwa',
    icon: Globe,
    color: '#38bdf8'
  },
  {
    platform: 'Desktop Electron Companion',
    version: 'v4.8.2-WIN/MAC/LINUX',
    size: '112.8 MB',
    checksumSha256: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8',
    downloadUrl: '#download-electron',
    icon: Monitor,
    color: '#a855f7'
  },
  {
    platform: 'iOS Apple Wallet Pass',
    version: 'v4.8.2-PASS',
    size: '2.1 MB',
    checksumSha256: 'f9e8d7c6b5a432109876543210fedcba9876543210123456789abcdef012',
    downloadUrl: '#add-apple-wallet',
    icon: HardDrive,
    color: '#f59e0b'
  }
];

export const AppDownloadAndSubscribePortal: React.FC = () => {
  const [activeTier, setActiveTier] = useState<SubscriptionTierId>('CAPTAIN_COMMERCIAL');
  const [isAnnualBilling, setIsAnnualBilling] = useState<boolean>(true);
  const [subscribedSuccessMsg, setSubscribedSuccessMsg] = useState<string | null>(null);
  const [generatedLicenseKey, setGeneratedLicenseKey] = useState<string | null>(null);

  // AI Auto-Updater Agent State
  const [aiAgentStatus, setAiAgentStatus] = useState<'IDLE' | 'CHECKING' | 'RETRAINING' | 'UPDATED'>('IDLE');
  const [aiInterval, setAiInterval] = useState<AiRetrainInterval>('EVERY_6_HOURS');
  const [aiAgentLogs, setAiAgentLogs] = useState<string[]>([
    '[05:39:20 UTC] Sovereign AI Studio Agent v4.8 active & listening.',
    '[05:39:22 UTC] Verified AI Studio release bundle checksum (sha256: e3b0c442...).',
    '[05:39:24 UTC] Neural network loss: 0.0014 | Satellite altimetry sync: 100% OK.'
  ]);

  // Info Guide Accordion Open States
  const [expandedGuideSection, setExpandedGuideSection] = useState<string | null>('ARCH');
  const [copiedShaHash, setCopiedShaHash] = useState<string | null>(null);

  const triggerAiAutoUpdate = () => {
    setAiAgentStatus('CHECKING');
    setAiAgentLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Triggering autonomous AI Studio self-update cycle...`,
      ...prev
    ]);

    setTimeout(() => {
      setAiAgentStatus('RETRAINING');
      setAiAgentLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Scanning Vite bundler chunks & inspection parameters...`,
        `[${new Date().toLocaleTimeString()}] Retraining South Asian coastal inundation neural network (Epoch 100/100)...`,
        ...prev
      ]);
    }, 1500);

    setTimeout(() => {
      setAiAgentStatus('UPDATED');
      setAiAgentLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Auto-Update Complete! Applet bumped to v4.9.0-PROD with zero downtime.`,
        ...prev
      ]);
    }, 3500);
  };

  const handleSubscribeTier = (tier: SubscriptionTier) => {
    const licKey = `LIC-SOV-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setGeneratedLicenseKey(licKey);
    setSubscribedSuccessMsg(`🎉 Successfully Subscribed to "${tier.name}"! License Key Activated.`);
  };

  const handleCopySha = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedShaHash(hash);
    setTimeout(() => setCopiedShaHash(null), 3000);
  };

  return (
    <div id="app-download-and-subscribe-portal" className="space-y-8 font-mono animate-fadeIn">
      {/* 1. APP SUMMARY & INFO GUIDE HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl text-white space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                APP INFO GUIDE &amp; SOVEREIGN PORTAL
              </span>
              <span className="text-[10px] text-slate-400">VERSION: v4.8.2-PROD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ocean Gaming Maritime &amp; Sovereign Climate Portal
            </h1>
            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              Unified, high-availability maritime navigation, tsunami &amp; earthquake early warning system, and South Asian coastal impact analytics platform. Integrates GOES-16, Himawari-9, INSAT-3DR, and Sentinel-6 satellite telemetry to protect over 1.48 million seafarers and safeguard $14.25 billion USD in oceanic trade.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#subscription-analytics"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center space-x-2 shrink-0"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>VIEW SUBSCRIPTION ANALYTICS</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* APP INFO GUIDE ACCORDION */}
        {/* ========================================================================= */}
        <div className="space-y-2 pt-2">
          <strong className="text-emerald-400 font-bold flex items-center space-x-2 text-xs">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>APP INFO &amp; OPERATIONAL USER GUIDE</span>
          </strong>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* ACCORDION 1: ARCHITECTURE */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-3.5 space-y-1.5">
              <button
                onClick={() => setExpandedGuideSection(expandedGuideSection === 'ARCH' ? null : 'ARCH')}
                className="w-full flex justify-between items-center text-left text-white font-bold"
              >
                <span className="flex items-center space-x-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>1. System Architecture &amp; Satellite Pipelines</span>
                </span>
                {expandedGuideSection === 'ARCH' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {expandedGuideSection === 'ARCH' && (
                <p className="text-slate-300 text-[11px] font-sans pt-1 border-t border-slate-800 leading-relaxed">
                  Utilizes real-time satellite altimetry feeds from GOES-16, Himawari-9, and Sentinel-6. Ocean wave heights and earthquake magnitude shake vectors are processed locally with zero cloud latency.
                </p>
              )}
            </div>

            {/* ACCORDION 2: KEYBOARD HOTKEYS */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-3.5 space-y-1.5">
              <button
                onClick={() => setExpandedGuideSection(expandedGuideSection === 'HOTKEYS' ? null : 'HOTKEYS')}
                className="w-full flex justify-between items-center text-left text-white font-bold"
              >
                <span className="flex items-center space-x-2">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>2. Keyboard Hotkeys &amp; Navigation Controls</span>
                </span>
                {expandedGuideSection === 'HOTKEYS' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {expandedGuideSection === 'HOTKEYS' && (
                <div className="text-slate-300 text-[11px] font-sans pt-1 border-t border-slate-800 space-y-1">
                  <div><strong className="text-amber-400 font-mono">Ctrl + D</strong>: Tsunami &amp; Earthquake Command Center</div>
                  <div><strong className="text-amber-400 font-mono">Ctrl + S</strong>: South Asian Coastal Impact Analytics</div>
                  <div><strong className="text-amber-400 font-mono">Ctrl + F</strong>: Global AIS Fleet Location Tracker</div>
                </div>
              )}
            </div>

            {/* ACCORDION 3: FREQUENCY BANDS */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-3.5 space-y-1.5">
              <button
                onClick={() => setExpandedGuideSection(expandedGuideSection === 'FREQ' ? null : 'FREQ')}
                className="w-full flex justify-between items-center text-left text-white font-bold"
              >
                <span className="flex items-center space-x-2">
                  <Radio className="w-3.5 h-3.5 text-purple-400" />
                  <span>3. Satellite Radio &amp; Emergency Frequency Bands</span>
                </span>
                {expandedGuideSection === 'FREQ' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {expandedGuideSection === 'FREQ' && (
                <p className="text-slate-300 text-[11px] font-sans pt-1 border-t border-slate-800 leading-relaxed">
                  DSC Channel 70 (156.525 MHz), VHF Voice Channel 16 (156.800 MHz), NAVTEX International (518 kHz), and Inmarsat-C SafetyNET satellite transponders.
                </p>
              )}
            </div>

            {/* ACCORDION 4: TROUBLESHOOTING */}
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-3.5 space-y-1.5">
              <button
                onClick={() => setExpandedGuideSection(expandedGuideSection === 'TROUBLE' ? null : 'TROUBLE')}
                className="w-full flex justify-between items-center text-left text-white font-bold"
              >
                <span className="flex items-center space-x-2">
                  <Wrench className="w-3.5 h-3.5 text-rose-400" />
                  <span>4. Off-Grid Troubleshooting &amp; Cache Reset</span>
                </span>
                {expandedGuideSection === 'TROUBLE' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {expandedGuideSection === 'TROUBLE' && (
                <p className="text-slate-300 text-[11px] font-sans pt-1 border-t border-slate-800 leading-relaxed">
                  If off-grid PWA tile sync halts, clear browser storage or toggle "Offline Cache Reset" in header. NMEA serial baud rate set to 38400.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SELF-UPDATING AI ENGINE PANEL */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 text-white space-y-4 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-500/20 border border-purple-500/40 rounded-xl">
              <Bot className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">SELF-UPDATING AI AGENT</span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                  v4.8.2 ACTIVE &amp; LISTENING
                </span>
              </div>
              <h2 className="text-lg font-black text-white">Sovereign AI Studio Auto-Updater Engine</h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-xs font-bold uppercase">AUTO-RETRAIN:</span>
            <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              {[
                { id: 'EVERY_1_HOUR', label: '1h' },
                { id: 'EVERY_6_HOURS', label: '6h' },
                { id: 'EVERY_24_HOURS', label: '24h' },
                { id: 'ON_DEMAND', label: 'Manual' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAiInterval(item.id as AiRetrainInterval)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    aiInterval === item.id
                      ? 'bg-purple-500 text-white font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={triggerAiAutoUpdate}
              disabled={aiAgentStatus === 'CHECKING' || aiAgentStatus === 'RETRAINING'}
              className="py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center space-x-2 shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${aiAgentStatus !== 'IDLE' ? 'animate-spin' : ''}`} />
              <span>TRIGGER AUTONOMOUS SELF-UPDATE</span>
            </button>
          </div>
        </div>

        {/* AI TERMINAL OUTPUT */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
          <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-1 font-bold">
            <span className="flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>AI AGENT LIVE TERMINAL OUTPUT</span>
            </span>
            <span className="text-emerald-400 text-[10px]">RETRAIN INTERVAL: {aiInterval}</span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300 max-h-36 overflow-y-auto">
            {aiAgentLogs.map((log, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <span className="text-purple-400 shrink-0">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2.5 OCEAN DOLLAR PHYSICAL CURRENCY SPECIMEN SHOWCASE */}
      {/* ========================================================================= */}
      <div id="ocean-dollar-physical-specimen" className="bg-slate-950 border border-amber-500/50 rounded-2xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                SOVEREIGN CURRENCY SPECIMEN
              </span>
              <span className="text-[10px] text-slate-400 font-mono">DENOMINATION: $100 OD</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Physical Ocean Dollar Banknote ($OD)</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Official high-security physical paper banknote backed 1:1 by sovereign bullion, maritime carbon offsets, and port authority tariff reserves.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 font-bold">PHYSICAL SPECIMEN VERIFIED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* HIGH-RES GENERATED IMAGE CONTAINER */}
          <div className="lg:col-span-7 bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden group">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={oceanDollarNoteImg}
                alt="Ocean Dollar Physical Banknote Specimen"
                className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur border border-amber-500/40 px-3 py-1 rounded-lg text-[10px] font-mono text-amber-300 font-bold shadow-lg">
                OFFICIAL SPECIMEN #OD-2026-100-ALPHA
              </div>
            </div>
          </div>

          {/* BANKNOTE SECURITY & SPECIFICATION METRICS */}
          <div className="lg:col-span-5 space-y-4 text-xs font-sans">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-amber-400 font-mono font-bold block text-sm">SECURITY FEATURES &amp; MICRO-PRINTING</strong>
              <ul className="space-y-1.5 text-slate-300 text-[11px] font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Holographic Trident &amp; Compass Foil Seal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>UV Bioluminescent Wave Patterns &amp; Blue Whale Engraving</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Embedded Magnetic Polymer Security Thread</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Tactile Raised Intaglio Printing for Visually Impaired</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[9px] uppercase font-bold block">SUBSTRATE</span>
                <strong className="text-white text-xs block">Polymer Cotton Blend</strong>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[9px] uppercase font-bold block">RESERVE BACKING</span>
                <strong className="text-emerald-400 text-xs block">Gold &amp; Port Tariffs</strong>
              </div>
            </div>

            <button
              onClick={() => alert('Specimen Certificate Downloaded! High-resolution vector PDF generated.')}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD HIGH-RES BANKNOTE CERTIFICATE</span>
            </button>
          </div>
        </div>
      </div>

      {/* OCEAN DOLLAR VISUAL DESIGNER, IOD GALLERY & SPEC SHEET PORTAL */}
      <OceanDollarVisualAndSpecPortal />

      {/* MINTING STATUS, ASSETS GALLERY UI & QUANTUM AI LOTTERY FUND HOLD PORTAL */}
      <SovereignMintingAndQuantumLotteryPortal />

      {/* QUANTUM LOTTERY RISK MONITOR, FUND MANAGEMENT UI, AI SECURITY AUDIT & USER EARNING SYSTEM */}
      <QuantumLotteryRiskFundAndEarningPortal />

      {/* ========================================================================= */}
      {/* 3. SUBSCRIPTION ANALYTICS DASHBOARD */}
      {/* ========================================================================= */}
      <div id="subscription-analytics" className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">REVENUE &amp; SUBSCRIBER TELEMETRY</span>
            <h2 className="text-2xl font-black text-white mt-1">Subscription Analytics Dashboard</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Real-time telemetry tracking Monthly Recurring Revenue (MRR), active registered vessel subscriptions, average revenue per user (ARPU), and churn rate.
            </p>
          </div>

          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-bold font-mono">
            LIVE PORTAL REVENUE TELEMETRY
          </span>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">MONTHLY RECURRING REVENUE</span>
            <strong className="text-emerald-400 text-2xl font-black block">$148,250 USD</strong>
            <span className="text-[10px] text-emerald-400 font-sans block">▲ +14.2% MoM Growth</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">REGISTERED FLEET SUBSCRIBERS</span>
            <strong className="text-cyan-400 text-2xl font-black block">142,850 Ships</strong>
            <span className="text-[10px] text-slate-400 font-sans block">Commercial &amp; Sovereign Fleets</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-amber-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">AVERAGE REVENUE PER USER (ARPU)</span>
            <strong className="text-amber-400 text-2xl font-black block">$108.50 USD</strong>
            <span className="text-[10px] text-slate-400 font-sans block">Per Commercial Vessel / Mo</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-purple-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">SUBSCRIBER CHURN RATE</span>
            <strong className="text-purple-400 text-2xl font-black block">0.18%</strong>
            <span className="text-[10px] text-emerald-400 font-sans block">High Retention Record</span>
          </div>
        </div>

        {/* RECHARTS REVENUE & SUBSCRIBER GROWTH CHART */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
            <strong className="text-emerald-400 font-bold flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>MONTHLY REVENUE &amp; SUBSCRIBER GROWTH TRAJECTORY (MAR–AUG 2026)</span>
            </strong>
            <span className="text-slate-400 text-[10px]">MRR USD vs Active Users</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={SUBSCRIPTION_GROWTH_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981', borderRadius: '0.75rem', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="MRR" name="Monthly Recurring Revenue ($)" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="FreeSeafarers" name="Free Seafarers" stroke="#38bdf8" strokeWidth={2} />
                <Line type="monotone" dataKey="Captains" name="Pro Captains" stroke="#f59e0b" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BUILD & DOWNLOADING PORTAL */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
        <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">RELEASE MANAGEMENT &amp; CHECKSUMS</span>
            <h2 className="text-2xl font-black text-white mt-1">Build &amp; Downloading Portal</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Download verified, cryptographic release packages with SHA-256 signatures for bridge ECDIS terminals, tablets, and desktop workstations.
            </p>
          </div>

          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-xl text-xs font-bold font-mono shrink-0">
            BUILD CHECKSUM: VERIFIED OK
          </span>
        </div>

        {/* BUILD ARTIFACTS LIST */}
        <div className="space-y-3">
          {BUILD_ARTIFACTS.map((artifact, idx) => {
            const IconComp = artifact.icon;
            return (
              <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="flex items-start space-x-3 max-w-xl">
                  <div className="p-2.5 rounded-xl border shrink-0" style={{ backgroundColor: `${artifact.color}20`, borderColor: `${artifact.color}40` }}>
                    <IconComp className="w-5 h-5" style={{ color: artifact.color }} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <strong className="text-white text-sm font-bold">{artifact.platform}</strong>
                      <span className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-slate-400 font-mono">{artifact.version}</span>
                      <span className="text-[10px] text-slate-500">({artifact.size})</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate max-w-md">
                      SHA-256: <span className="text-slate-300">{artifact.checksumSha256}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleCopySha(artifact.checksumSha256)}
                    className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold rounded-xl text-xs transition-all flex items-center space-x-1"
                  >
                    <Hash className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{copiedShaHash === artifact.checksumSha256 ? '✓ COPIED' : 'COPY HASH'}</span>
                  </button>

                  <button
                    onClick={() => alert(`Downloading ${artifact.platform} Package (${artifact.version})...`)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs uppercase shadow-lg transition-all flex items-center space-x-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MULTI-TIER SUBSCRIPTION PLANS */}
      {/* ========================================================================= */}
      <div id="subscription-plans" className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">TIERED LICENSING &amp; SOVEREIGN ACCESS</span>
            <h2 className="text-2xl font-black text-white mt-1">App Subscription Portal</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Select a subscription plan tailored for individual seafarers, commercial ship captains, shipping fleets, or national sovereign ministries.
            </p>
          </div>

          {/* MONTHLY / ANNUAL TOGGLE */}
          <div className="flex items-center space-x-3 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
            <span className={`font-bold ${!isAnnualBilling ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnualBilling(!isAnnualBilling)}
              className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                isAnnualBilling ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                isAnnualBilling ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
            <span className={`font-bold ${isAnnualBilling ? 'text-emerald-400' : 'text-slate-400'}`}>
              Annual <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded ml-1">SAVE 20%</span>
            </span>
          </div>
        </div>

        {/* SUBSCRIPTION CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const isSelected = activeTier === tier.id;
            const price = isAnnualBilling ? tier.priceAnnualDiscounted : tier.priceMonthly;

            return (
              <div
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 cursor-pointer relative ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-400 ring-2 ring-emerald-400/30 shadow-2xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-[9px] uppercase px-3 py-0.5 rounded-full shadow-lg">
                    {tier.badgeTag}
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <strong className="text-white text-base font-black block">{tier.name}</strong>
                    <span className="text-[10px] text-slate-400 font-sans block">{tier.targetUser}</span>
                  </div>

                  <div className="py-2 border-y border-slate-800">
                    <span className="text-2xl font-black text-emerald-400">${price}</span>
                    <span className="text-slate-400 text-[11px]"> / month</span>
                  </div>

                  <ul className="space-y-2 text-[11px] text-slate-300 font-sans">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribeTier(tier);
                  }}
                  className={`w-full py-2.5 rounded-xl font-black uppercase text-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg'
                      : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  SUBSCRIBE NOW
                </button>
              </div>
            );
          })}
        </div>

        {/* SUBSCRIPTION SUCCESS BANNER */}
        {subscribedSuccessMsg && (
          <div className="p-4 bg-emerald-500/20 border-2 border-emerald-400 rounded-2xl space-y-2 text-xs font-mono animate-fadeIn">
            <div className="flex justify-between items-center">
              <strong className="text-emerald-300 font-bold text-sm">{subscribedSuccessMsg}</strong>
              <button onClick={() => setSubscribedSuccessMsg(null)} className="text-emerald-400 hover:text-white">✕</button>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>ACTIVATED LICENSE KEY: <strong className="text-amber-400 font-mono text-sm">{generatedLicenseKey}</strong></span>
              <button
                onClick={() => navigator.clipboard.writeText(generatedLicenseKey || '')}
                className="px-3 py-1 bg-slate-900 text-emerald-400 hover:text-white border border-slate-800 rounded-lg"
              >
                COPY KEY
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 6. OFFICIAL REGULATORY DISCLAIMER */}
      <div className="bg-slate-950 border border-rose-500/40 rounded-2xl p-6 text-white space-y-3 shadow-2xl">
        <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase border-b border-slate-800 pb-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>OFFICIAL REGULATORY DISCLAIMER &amp; HYDRO-METEOROLOGICAL COMPLIANCE NOTICE</span>
        </div>

        <div className="text-[11px] text-slate-300 font-sans space-y-2 leading-relaxed">
          <p>
            <strong>IMO SOLAS Convention Compliance Notice:</strong> This software application ("Ocean Gaming Maritime &amp; Sovereign Climate Command Portal") is designed to provide auxiliary hydro-meteorological decision support, satellite sea-state monitoring, and post-seismic disaster evacuation guidance. It does NOT replace official primary nautical charts, IMO SOLAS Chapter V mandatory equipment, or direct Vessel Traffic Service (VTS) pilotage instructions.
          </p>
          <p>
            <strong>Navigational Safety &amp; Satellite Telemetry Reliance:</strong> Tsunami early warning wave heights, earthquake epicentral shake vectors, and South Asian coastal inundation projections are generated using simulated predictive AI models derived from satellite altimetry (GOES-16, Himawari-9, INSAT-3DR, Sentinel-6). Ship captains, master mariners, and port authorities remain solely responsible for vessel navigation and crew safety. Always verify navigation decisions with official government Hydrographic Offices (e.g. UKHO, NOAA, SHOA, JMA, IMD).
          </p>
        </div>
      </div>
    </div>
  );
};
