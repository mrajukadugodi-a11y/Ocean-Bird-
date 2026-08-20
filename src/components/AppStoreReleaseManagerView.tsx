import React, { useState } from 'react';
import {
  Smartphone,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  Copy,
  CheckCircle2,
  Download,
  Share2,
  Lock,
  ExternalLink,
  Layers,
  Zap,
  Globe,
  Settings,
  X,
  Eye,
  Terminal,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  RefreshCw,
  Box,
  Key,
  ShieldAlert
} from 'lucide-react';

export const AppStoreReleaseManagerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metadata' | 'privacy' | 'version'>('metadata');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // App Metadata State
  const [appTitle, setAppTitle] = useState('OceanBird: Global Airways & Marine Tracker');
  const [shortDesc, setShortDesc] = useState('Live Airways flight tracker, cruise & cargo AIS marine radar, jobs, e-Visas & travel planner.');
  const [fullDesc, setFullDesc] = useState(
`OceanBird is the premier global multi-modal travel, aviation, and maritime intelligence application.

FEATURES:
• Real-time Airways Flight Radar & Live AIS Vessel Location Tracking
• Global Airways & Cruise Marine Job Alerts with Requirements Matrix
• Certified Aviation Flight Academies & Maritime Educational Training Directory
• ICAO Doc 9303 Compliant Digital Passport & Seaman Book (CDC) Credential Wallet
• Multi-Modal AI Trip Planner with Automatic Cost & Itinerary Calculation
• Frequent Flyer & Mariner Loyalty Club with Reward Redemption
• Online e-Visa Application & Consulate Visa Manager
• Emergency SOS Mayday Pulse & Tsunami Warning Radar

Designed for aviators, seafarers, maritime captains, aviation enthusiasts, and international travelers worldwide.`
  );
  const [category, setCategory] = useState('Travel & Local / Navigation');
  const [contentRating, setContentRating] = useState('PEGI 3 / Everyone (3+)');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('https://oceanbird.ai/privacy-policy');
  const [supportEmail, setSupportEmail] = useState('support@oceanbird.ai');

  // Privacy Policy Modal State
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(true);
  const [dataCollectionPreferences, setDataCollectionPreferences] = useState({
    locationGps: true,
    biometrics: false,
    telemetry: true,
    notifications: true
  });

  // Version Tracker State
  const [currentVersion, setCurrentVersion] = useState('3.4.2');
  const [currentBuildCode, setCurrentBuildCode] = useState(30402);
  const [stagedRolloutPct, setStagedRolloutPct] = useState(100);
  const [releaseTrack, setReleaseTrack] = useState<'Internal' | 'Closed Beta' | 'Open Beta' | 'Production'>('Production');

  const RELEASE_HISTORY = [
    {
      version: 'v3.4.2',
      build: 30402,
      date: '2026-08-09',
      track: 'Production',
      notes: [
        'Added Airways & Marine Jobs Requirements & Eligibility Matrix',
        'Added Aviation Flight Academies & Maritime Training Institutes directory',
        'Added AI Multi-Modal Trip Planner with itinerary timeline',
        'Added Frequent Flyer & Mariner Loyalty Rewards Club',
        'Added ICAO Digital Passport & Seaman Book Credential Wallet',
        'Added Google Play Console App Store Metadata & Privacy Policy Model'
      ]
    },
    {
      version: 'v3.3.0',
      build: 30300,
      date: '2026-07-28',
      track: 'Production',
      notes: [
        'Implemented Worldwide Real-Time Global Fleet Map (Airways & Cruise)',
        'Added e-Visa & Physical Visa Application Portals',
        'Integrated Online Multi-Currency Payment Gateway'
      ]
    },
    {
      version: 'v3.0.1',
      build: 30001,
      date: '2026-06-15',
      track: 'Closed Beta',
      notes: [
        'Initial PWA & TWA Android bundle build for Google Play Console testing',
        'Biometric authentication bridge integration'
      ]
    }
  ];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Smartphone className="w-64 h-64 text-sky-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span>GOOGLE PLAY CONSOLE & APP STORE RELEASE CENTER</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AAB BUNDLE v3.4.2 READY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Google Play Launch, Store Metadata & Privacy Hub</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Manage Play Store listing text, privacy policy compliance model, Google Play Console launch instructions, and version release changelogs.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs shrink-0">
            <button
              onClick={() => setActiveTab('metadata')}
              className={`px-3 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'metadata' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Store Metadata</span>
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'privacy' ? 'bg-indigo-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => setActiveTab('version')}
              className={`px-3 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'version' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Version Tracker</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: APP STORE METADATA ================= */}
      {activeTab === 'metadata' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          {/* PLAY CONSOLE LAUNCH INSTRUCTIONS */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Step-by-Step Guide: How to Launch this App on Google Play Console</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold">1</span>
                <h3 className="font-bold text-white text-xs">Create App Listing</h3>
                <p className="text-slate-400 text-[11px] font-sans">
                  Log in to Google Play Console, click <strong>Create App</strong>, set default language to English, and select App category.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center font-bold">2</span>
                <h3 className="font-bold text-white text-xs">Fill Store Listing Metadata</h3>
                <p className="text-slate-400 text-[11px] font-sans">
                  Copy and paste the App Title, Short Description, and Full Description generated below into the Play Console store listing fields.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold">3</span>
                <h3 className="font-bold text-white text-xs">Data Safety & Privacy</h3>
                <p className="text-slate-400 text-[11px] font-sans">
                  Provide the Privacy Policy URL <strong className="text-indigo-300">{privacyPolicyUrl}</strong> and complete the Data Safety declaration questionnaire.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold">4</span>
                <h3 className="font-bold text-white text-xs">Upload AAB & Release</h3>
                <p className="text-slate-400 text-[11px] font-sans">
                  Upload the compiled Android App Bundle (.aab) or Trusted Web Activity (TWA) package to the Production track and submit for review.
                </p>
              </div>
            </div>
          </div>

          {/* STORE LISTING FORM & COPY MATRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
              <h2 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Smartphone className="w-5 h-5 text-sky-400" />
                <span>Play Store Listing Metadata Editor & Copy Matrix</span>
              </h2>

              <div className="space-y-4">
                {/* TITLE */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">App Title (Max 30 Chars)</label>
                    <button
                      onClick={() => handleCopy(appTitle, 'title')}
                      className="text-sky-400 hover:text-sky-300 text-[10px] font-bold flex items-center space-x-1"
                    >
                      {copiedField === 'title' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'title' ? 'COPIED!' : 'COPY'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={appTitle}
                    onChange={(e) => setAppTitle(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* SHORT DESC */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Short Description (Max 80 Chars)</label>
                    <button
                      onClick={() => handleCopy(shortDesc, 'short')}
                      className="text-sky-400 hover:text-sky-300 text-[10px] font-bold flex items-center space-x-1"
                    >
                      {copiedField === 'short' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'short' ? 'COPIED!' : 'COPY'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* FULL DESC */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 font-bold uppercase text-[10px]">Full Description (Max 4000 Chars)</label>
                    <button
                      onClick={() => handleCopy(fullDesc, 'full')}
                      className="text-sky-400 hover:text-sky-300 text-[10px] font-bold flex items-center space-x-1"
                    >
                      {copiedField === 'full' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'full' ? 'COPIED!' : 'COPY'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={fullDesc}
                    onChange={(e) => setFullDesc(e.target.value)}
                    className="w-full bg-slate-950 text-white font-mono p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-400 text-xs leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* ASSET SPECIFICATIONS & RATING */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <Box className="w-4 h-4 text-emerald-400" />
                  <span>Required Graphics Asset Specs</span>
                </h3>

                <div className="space-y-3 text-[11px]">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold block">App Icon</span>
                    <span className="text-emerald-400 font-bold block">512 x 512 px (PNG 32-bit with alpha)</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold block">Feature Graphic Banner</span>
                    <span className="text-sky-300 font-bold block">1024 x 500 px (JPEG or 24-bit PNG)</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold block">Phone Screenshots</span>
                    <span className="text-amber-300 font-bold block">Min 1080 x 1920 px (At least 4 screenshots)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>Classification & Support</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Category</span>
                    <span className="text-white font-bold">{category}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Content Rating</span>
                    <span className="text-emerald-400 font-bold">{contentRating}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Support Contact</span>
                    <span className="text-sky-300 font-bold">{supportEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: PRIVACY POLICY MODEL ================= */}
      {activeTab === 'privacy' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-indigo-400" />
                  <span>GDPR, CCPA & Google Play Families Privacy Policy Model</span>
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Official privacy policy document generator and interactive model required for Play Store listing approval.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="px-4 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold uppercase transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>PREVIEW PRIVACY MODAL</span>
                </button>
              </div>
            </div>

            {/* PRIVACY CLAUSES DISPLAY */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-slate-300 font-sans leading-relaxed text-xs">
              <h3 className="text-sm font-bold text-white font-mono uppercase">1. Data Collection & Usage Notice</h3>
              <p>
                OceanBird respects your privacy. When you utilize live Airways flight tracking, Marine AIS vessel location radar, e-Visa processing, or ICAO e-Passport credential verification, minimal necessary data is transmitted over TLS 1.3 encrypted connections.
              </p>

              <h3 className="text-sm font-bold text-white font-mono uppercase">2. Biometric & Location Privacy</h3>
              <p>
                Biometric 3D facial hashes and location GPS data are stored locally on your device within encrypted sandbox storage and are never sold or shared with third-party advertising networks.
              </p>

              <h3 className="text-sm font-bold text-white font-mono uppercase">3. Third-Party Integrations</h3>
              <p>
                Aviation ADS-B radar, Marine AIS feeds, and payment gateways operate under strict data protection protocols in compliance with GDPR and Google Play User Data policies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: APP VERSION TRACKER ================= */}
      {activeTab === 'version' && (
        <div className="space-y-6 animate-fadeIn font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-emerald-400" />
                  <span>App Versioning & Release Rollout Tracker</span>
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Active release version tracking, build numbers, OTA sync status, and staged rollout controls.
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] block">ACTIVE VERSION</span>
                  <span className="text-emerald-400 font-black text-base">v{currentVersion} ({currentBuildCode})</span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                  {releaseTrack}
                </span>
              </div>
            </div>

            {/* RELEASE NOTES HISTORY TIMELINE */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase">Release History & Build Changelogs</h3>
              <div className="space-y-4">
                {RELEASE_HISTORY.map((rel, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-sm">{rel.version}</span>
                        <span className="text-slate-400 text-xs">(Build {rel.build})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 text-xs">{rel.date}</span>
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                          {rel.track}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-300 font-sans">
                      {rel.notes.map((note, nIdx) => (
                        <li key={nIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE PRIVACY POLICY MODAL */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans text-xs">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative font-mono">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase flex items-center space-x-1 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>GDPR / GOOGLE PLAY PRIVACY AGREEMENT</span>
              </span>
              <h3 className="text-lg font-black text-white">Privacy & Consent Authorization</h3>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-slate-300 text-xs font-sans max-h-48 overflow-y-auto">
              <p>
                By using OceanBird, you agree to local data caching for flight & AIS vessel telemetry, optional location GPS tracking for port weather radar, and encrypted storage of CDC seaman credentials.
              </p>
              <p>
                You may manage your data collection consent preferences below at any time.
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span>Location GPS Services (Port/Airport Radar)</span>
                <input
                  type="checkbox"
                  checked={dataCollectionPreferences.locationGps}
                  onChange={(e) => setDataCollectionPreferences({ ...dataCollectionPreferences, locationGps: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span>Biometric Face Hash (e-Passport)</span>
                <input
                  type="checkbox"
                  checked={dataCollectionPreferences.biometrics}
                  onChange={(e) => setDataCollectionPreferences({ ...dataCollectionPreferences, biometrics: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                />
              </div>
            </div>

            <button
              onClick={() => { setShowPrivacyModal(false); alert('Privacy preferences updated & recorded!'); }}
              className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg"
            >
              ACCEPT & SAVE PREFERENCES
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
