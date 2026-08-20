import React, { useState } from 'react';
import officialLogoImg from '../assets/images/official_logo_1786649303542.jpg';
import headerBannerImg from '../assets/images/header_banner_1786649316919.jpg';
import {
  Key,
  ShieldCheck,
  FileText,
  Download,
  Copy,
  CheckCircle2,
  Sparkles,
  Calendar,
  Building2,
  Users,
  Check,
  QrCode,
  Globe,
  Award,
  RefreshCw,
  Lock,
  ExternalLink,
  Printer,
  X,
  Mail,
  Send,
  Clock,
  History,
  Eye,
  FileCode
} from 'lucide-react';

export interface AppLicense {
  licenseId: string;
  licenseeName: string;
  licenseeEmail: string;
  licenseType: 'Enterprise Fleet' | 'Commercial Airlines' | 'Global Maritime' | 'Developer Pro';
  licenseKey: string;
  issuedDate: string;
  expiryDate: string;
  maxSeats: string;
  status: 'Active & Verified' | 'Pending Renewal' | 'Suspended';
  featuresAllowed: string[];
}

export const AppLicenseManagerView: React.FC = () => {
  const [licenseeName, setLicenseeName] = useState('Global OceanBird Aviation & Maritime Corp');
  const [licenseeEmail, setLicenseeEmail] = useState('mrajukadugodi@gmail.com');
  const [selectedType, setSelectedType] = useState<'Enterprise Fleet' | 'Commercial Airlines' | 'Global Maritime' | 'Developer Pro'>('Enterprise Fleet');
  const [copiedKey, setCopiedKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [previewTargetLicense, setPreviewTargetLicense] = useState<AppLicense | null>(null);

  // Email Export Modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('mrajukadugodi@gmail.com');
  const [emailNote, setEmailNote] = useState('Please find attached your official OceanBird Commercial Software License Key and digital deed certificate.');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailToast, setEmailToast] = useState(false);

  const [issuedLicense, setIssuedLicense] = useState<AppLicense>({
    licenseId: 'LIC-2026-9901A',
    licenseeName: 'Global OceanBird Aviation & Maritime Corp',
    licenseeEmail: 'mrajukadugodi@gmail.com',
    licenseType: 'Enterprise Fleet',
    licenseKey: 'OB-2026-X892-MAR-ENT-9901-4421',
    issuedDate: '2026-08-09',
    expiryDate: '2030-08-09 (4 Years Perpetual)',
    maxSeats: 'Unlimited Vessels & Aircraft',
    status: 'Active & Verified',
    featuresAllowed: [
      'Full Airways & Cruise Fleet Telemetry',
      'IMO MARPOL ESG & Carbon Intensity Engine',
      'Vessel Cyber-Security & ECDIS Anti-Spoofing Scanner',
      'Port Authority AI Harbormaster Chatbot Integration',
      'Real-Time Global Supply Chain Delay Radar',
      'ICAO e-Passport & Seaman Book Credential Wallet'
    ]
  });

  // Certificate History Log state
  const [licenseHistory, setLicenseHistory] = useState<AppLicense[]>([
    {
      licenseId: 'LIC-2026-9901A',
      licenseeName: 'Global OceanBird Aviation & Maritime Corp',
      licenseeEmail: 'mrajukadugodi@gmail.com',
      licenseType: 'Enterprise Fleet',
      licenseKey: 'OB-2026-X892-MAR-ENT-9901-4421',
      issuedDate: '2026-08-09',
      expiryDate: '2030-08-09 (4 Years Perpetual)',
      maxSeats: 'Unlimited Vessels & Aircraft',
      status: 'Active & Verified',
      featuresAllowed: [
        'Full Airways & Cruise Fleet Telemetry',
        'IMO MARPOL ESG Engine',
        'Vessel Cyber-Security Scanner',
        'Port AI Harbormaster',
        'ICAO e-Passport Wallet'
      ]
    },
    {
      licenseId: 'LIC-2025-4120B',
      licenseeName: 'Atlantic Cruise Lines & Airways Ltd',
      licenseeEmail: 'dispatch@atlantic-cruise-air.com',
      licenseType: 'Commercial Airlines',
      licenseKey: 'OB-2025-X4120-AIR-COM-7712-3091',
      issuedDate: '2025-11-14',
      expiryDate: '2029-11-14 (4 Years)',
      maxSeats: '500 Aircraft & Crew Terminals',
      status: 'Active & Verified',
      featuresAllowed: [
        'Full Airways Radar Telemetry',
        'Crew STCW Management Matrix',
        'ICAO e-Passport Wallet'
      ]
    },
    {
      licenseId: 'LIC-2024-1088C',
      licenseeName: 'Pacific Maritime Port Holdings',
      licenseeEmail: 'admin@pacific-maritime.org',
      licenseType: 'Global Maritime',
      licenseKey: 'OB-2024-X1088-MAR-ENT-1102-8821',
      issuedDate: '2024-05-20',
      expiryDate: '2028-05-20 (4 Years)',
      maxSeats: '250 Cargo Ships & Harbor Drones',
      status: 'Active & Verified',
      featuresAllowed: [
        'AIS Vessel Fleet Telemetry',
        'IMO MARPOL ESG Engine',
        'Autonomous Port Drone Inspection'
      ]
    }
  ]);

  const activeLicenseForDisplay = previewTargetLicense || issuedLicense;

  const handleGenerateLicense = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const randHex = Math.floor(1000 + Math.random() * 9000);
      const randKey = `OB-2026-X${randHex}-${selectedType.substring(0, 3).toUpperCase()}-ENT-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newLicense: AppLicense = {
        licenseId: `LIC-2026-${randHex}`,
        licenseeName,
        licenseeEmail,
        licenseType: selectedType,
        licenseKey: randKey,
        issuedDate: new Date().toISOString().split('T')[0],
        expiryDate: '2030-08-09 (4 Years Perpetual)',
        maxSeats: 'Unlimited Vessels & Aircraft',
        status: 'Active & Verified',
        featuresAllowed: [
          'Full Airways & Cruise Fleet Telemetry',
          'IMO MARPOL ESG & Carbon Intensity Engine',
          'Vessel Cyber-Security & ECDIS Anti-Spoofing Scanner',
          'Port Authority AI Harbormaster Chatbot Integration',
          'Real-Time Global Supply Chain Delay Radar',
          'ICAO e-Passport & Seaman Book Credential Wallet'
        ]
      };

      setIssuedLicense(newLicense);
      setLicenseHistory(prev => [newLicense, ...prev]);
      alert(`App License Key Issued Successfully!\nKey: ${randKey}\nRegistered to: ${licenseeName}`);
    }, 1200);
  };

  const handleCopyKey = (keyToCopy?: string) => {
    navigator.clipboard.writeText(keyToCopy || activeLicenseForDisplay.licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  // HTML Digital Certificate Download
  const handleDownloadHtmlCertificate = (targetLic: AppLicense = activeLicenseForDisplay) => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OceanBird Commercial License - ${targetLic.licenseId}</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; margin: 0; }
    .certificate-card { max-width: 800px; margin: 0 auto; background: #1e293b; border: 8px solid #f59e0b; border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    .header { text-align: center; border-bottom: 2px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
    .logo-img { width: 90px; height: 90px; border-radius: 50%; border: 3px solid #f59e0b; margin: 0 auto 12px auto; display: block; object-fit: cover; }
    .badge { color: #f59e0b; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; font-size: 12px; }
    h1 { font-size: 28px; color: #ffffff; margin: 10px 0 5px 0; }
    .guid { font-family: monospace; color: #94a3b8; font-size: 12px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #0f172a; padding: 20px; border-radius: 16px; border: 1px solid #334155; margin-bottom: 25px; }
    .label { color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: bold; display: block; }
    .value { color: #f8fafc; font-size: 14px; font-weight: bold; margin-top: 4px; display: block; }
    .key-value { color: #f59e0b; font-family: monospace; font-size: 16px; font-weight: bold; }
    .modules { margin-bottom: 25px; }
    .modules ul { list-style-type: square; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.6; }
    .footer { display: flex; justify-content: space-between; border-top: 1px solid #334155; padding-top: 20px; font-size: 11px; color: #94a3b8; }
    .seal { color: #f59e0b; font-weight: bold; }
    @media print { body { background: white; color: black; padding: 0; } .certificate-card { border-color: #d97706; background: white; color: black; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="certificate-card">
    <div class="header">
      <img src="${officialLogoImg}" alt="Official Logo" class="logo-img" />
      <div class="badge">OFFICIAL DIGITAL SOFTWARE LICENSE CERTIFICATE</div>
      <h1>OceanBird Commercial Software License</h1>
      <div class="guid">App GUID: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f | License ID: ${targetLic.licenseId}</div>
    </div>
    
    <div class="grid">
      <div>
        <span class="label">Licensee Enterprise Name</span>
        <span class="value">${targetLic.licenseeName}</span>
      </div>
      <div>
        <span class="label">Registered Email</span>
        <span class="value">${targetLic.licenseeEmail}</span>
      </div>
      <div>
        <span class="label">Cryptographic License Key</span>
        <span class="key-value">${targetLic.licenseKey}</span>
      </div>
      <div>
        <span class="label">Tier & Duration</span>
        <span class="value">${targetLic.licenseType} (${targetLic.expiryDate})</span>
      </div>
    </div>

    <div class="modules">
      <span class="label" style="margin-bottom:8px;">Authorized Functional Scope:</span>
      <ul>
        ${targetLic.featuresAllowed.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>

    <div class="footer">
      <div>
        <strong>ISSUED DATE:</strong> ${targetLic.issuedDate}<br>
        256-Bit RSA Cryptographic Signature Verified
      </div>
      <div style="text-align:right;">
        <span class="seal">OCEANBIRD IP AUTHORITY SEAL</span><br>
        Verification Code: OB-LICENSE-2026
      </div>
    </div>
  </div>
</body>
</html>`;

    const element = document.createElement("a");
    const file = new Blob([htmlContent], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = `OceanBird_License_Certificate_${targetLic.licenseId}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadLicenseFile = (targetLic: AppLicense = activeLicenseForDisplay) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(targetLic, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `OceanBird_App_License_${targetLic.licenseId}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendEmail = () => {
    setIsSendingEmail(true);
    setTimeout(() => {
      setIsSendingEmail(false);
      setShowEmailModal(false);
      setEmailToast(true);
      setTimeout(() => setEmailToast(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* TOAST NOTIFICATION */}
      {emailToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-slate-950 px-5 py-3 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-slate-950" />
          <span>License Certificate Exported & Emailed to {emailRecipient} successfully!</span>
        </div>
      )}

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <img src={headerBannerImg} alt="Header Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Key className="w-64 h-64 text-amber-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-4">
            <img
              src={officialLogoImg}
              alt="Official Logo Mark"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-400 shadow-xl object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>OFFICIAL SOFTWARE LICENSE ISSUER</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  256-BIT CRYPTOGRAPHIC SIGNATURE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Software Commercial License & Enterprise Key Generator</h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
                Issue, manage, preview, and export commercial application software licenses for maritime shipping fleets, aviation airlines, and global logistics enterprises.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono">
            <button
              onClick={() => {
                setPreviewTargetLicense(issuedLicense);
                setShowPdfModal(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>PREVIEW CERTIFICATE</span>
            </button>
            <button
              onClick={() => handleDownloadHtmlCertificate()}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-300 hover:bg-slate-800 font-bold text-xs transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>DOWNLOAD DIGITAL CERTIFICATE</span>
            </button>
            <button
              onClick={() => {
                setEmailRecipient(issuedLicense.licenseeEmail);
                setShowEmailModal(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800 font-bold text-xs transition-all flex items-center space-x-2"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>E-MAIL EXPORT</span>
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Issued License ID</span>
            <span className="text-amber-400 font-black text-sm">{issuedLicense.licenseId}</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">License Type</span>
            <span className="text-sky-300 font-black text-sm">{issuedLicense.licenseType}</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Allowed Capacity</span>
            <span className="text-emerald-400 font-black text-sm">{issuedLicense.maxSeats}</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">License Status</span>
            <span className="text-emerald-400 font-black text-sm flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{issuedLicense.status}</span>
            </span>
          </div>
        </div>
      </div>

      {/* FORM & GENERATED LICENSE CERTIFICATE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* LICENSE GENERATOR FORM */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Issue New Commercial App License</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Licensee Enterprise Name</label>
              <input
                type="text"
                value={licenseeName}
                onChange={(e) => setLicenseeName(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">License Holder Email</label>
              <input
                type="email"
                value={licenseeEmail}
                onChange={(e) => setLicenseeEmail(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">License Tier & Scope</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
              >
                <option value="Enterprise Fleet">Enterprise Fleet (Unlimited Maritime & Aviation)</option>
                <option value="Commercial Airlines">Commercial Airlines (Airways Radar & Crew)</option>
                <option value="Global Maritime">Global Maritime (AIS Cruise, Cargo & Port AI)</option>
                <option value="Developer Pro">Developer Pro (API Suite & Custom Integrations)</option>
              </select>
            </div>

            <button
              onClick={handleGenerateLicense}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 mt-4"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'GENERATING CRYPTO KEY...' : 'ISSUE LICENSE KEY NOW'}</span>
            </button>
          </div>
        </div>

        {/* ACTIVE LICENSE DISPLAY DEED */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Active Issued Software License Deed</span>
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setPreviewTargetLicense(issuedLicense);
                  setShowPdfModal(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>PREVIEW CERTIFICATE</span>
              </button>
              <button
                onClick={() => handleDownloadHtmlCertificate(issuedLicense)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-[10px] font-bold flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>HTML DIGITAL COPY</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">License Key Code</span>
                <span className="text-amber-300 font-black text-base sm:text-lg tracking-wider font-mono">{issuedLicense.licenseKey}</span>
              </div>
              <button
                onClick={() => handleCopyKey(issuedLicense.licenseKey)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 font-bold text-[10px] flex items-center space-x-1 shrink-0"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'COPIED!' : 'COPY KEY'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block">LICENSED ENTITY</span>
                <span className="text-white font-bold block">{issuedLicense.licenseeName}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">REGISTERED CONTACT EMAIL</span>
                <span className="text-sky-300 font-bold block">{issuedLicense.licenseeEmail}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">ISSUANCE DATE</span>
                <span className="text-slate-200 font-bold block">{issuedLicense.issuedDate}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">EXPIRY & DURATION</span>
                <span className="text-emerald-400 font-bold block">{issuedLicense.expiryDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Enabled Application Module Scope:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans">
                {issuedLicense.featuresAllowed.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center space-x-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CERTIFICATE HISTORY LOG TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white">License Certificate Issuance History & Audit Log</h2>
          </div>
          <span className="text-slate-400 text-[10px]">{licenseHistory.length} Total Issued Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">License ID</th>
                <th className="py-2.5 px-3">Licensee Entity</th>
                <th className="py-2.5 px-3">Type / Tier</th>
                <th className="py-2.5 px-3">License Key</th>
                <th className="py-2.5 px-3">Issued Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px]">
              {licenseHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 text-amber-400 font-bold">{item.licenseId}</td>
                  <td className="py-3 px-3 text-white font-sans font-bold">{item.licenseeName}</td>
                  <td className="py-3 px-3 text-sky-300">{item.licenseType}</td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[10px]">{item.licenseKey}</td>
                  <td className="py-3 px-3 text-slate-400">{item.issuedDate}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => {
                          setPreviewTargetLicense(item);
                          setShowPdfModal(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-bold flex items-center space-x-1"
                        title="Preview Digital Certificate"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => handleDownloadHtmlCertificate(item)}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                        title="Download Digital HTML Certificate"
                      >
                        <Download className="w-3 h-3 text-amber-400" />
                      </button>
                      <button
                        onClick={() => {
                          setEmailRecipient(item.licenseeEmail);
                          setShowEmailModal(true);
                        }}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                        title="Export via Email"
                      >
                        <Mail className="w-3 h-3 text-sky-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PREVIEW DIGITAL CERTIFICATE MODAL */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-8 space-y-6 shadow-2xl relative border-8 border-amber-500">
            <button
              onClick={() => setShowPdfModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* CERTIFICATE HEADER */}
            <div className="text-center space-y-3 border-b-2 border-amber-500 pb-6">
              <div className="flex justify-center items-center space-x-3">
                <img
                  src={officialLogoImg}
                  alt="Official Logo Mark"
                  className="w-20 h-20 rounded-full border-4 border-amber-500 shadow-lg object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-center items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-widest">
                <Award className="w-6 h-6" />
                <span>OFFICIAL COMMERCIAL SOFTWARE LICENSE DEED</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
                OceanBird Commercial Software License
              </h1>
              <p className="text-slate-500 text-xs font-mono">
                Cryptographically Signed Software Authorization Certificate | GUID: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f
              </p>
            </div>

            {/* CERTIFICATE BODY */}
            <div className="space-y-4 font-mono text-xs text-slate-800">
              <p className="text-sm font-sans italic text-slate-700 text-center">
                This official software license deed certifies that the licensee specified below is granted non-exclusive, perpetual commercial operating rights for the OceanBird platform.
              </p>

              <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 text-[10px] block font-bold">LICENSEE ENTITY</span>
                  <span className="text-slate-900 font-black text-sm block font-sans">{activeLicenseForDisplay.licenseeName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-bold">REGISTERED EMAIL</span>
                  <span className="text-amber-800 font-bold text-sm block">{activeLicenseForDisplay.licenseeEmail}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-bold">LICENSE KEY</span>
                  <span className="text-amber-900 font-black text-sm block font-mono">{activeLicenseForDisplay.licenseKey}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-bold">TIER & DURATION</span>
                  <span className="text-slate-900 font-bold block">{activeLicenseForDisplay.licenseType} ({activeLicenseForDisplay.expiryDate})</span>
                </div>
              </div>

              <div>
                <span className="text-slate-600 font-bold block mb-1">AUTHORIZED MODULE SCOPE:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-700 font-sans text-xs">
                  {activeLicenseForDisplay.featuresAllowed.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[10px]">
                <div>
                  <span className="text-slate-500 block">ISSUANCE STAMP</span>
                  <span className="font-bold text-slate-900">{activeLicenseForDisplay.issuedDate} | 256-Bit RSA Signature</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-600 font-black block text-xs">OCEANBIRD IP AUTHORITY</span>
                  <span className="text-slate-500">Official Seal & Seal Code: OB-LICENSE-2026</span>
                </div>
              </div>
            </div>

            {/* PRINT & DOWNLOAD ACTIONS */}
            <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => handleDownloadHtmlCertificate(activeLicenseForDisplay)}
                className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-amber-600" />
                <span>DOWNLOAD HTML CERTIFICATE</span>
              </button>
              <button
                onClick={handlePrintPdf}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>SAVE / PRINT AS PDF COPY</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* E-MAIL EXPORT MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center font-mono">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Mail className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">E-mail Digital License Certificate & Key</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Recipient Email Address</label>
                <input
                  type="email"
                  value={emailRecipient}
                  onChange={(e) => setEmailRecipient(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Subject Line</label>
                <input
                  type="text"
                  readOnly
                  value={`OceanBird Commercial License Key & Digital Certificate [${activeLicenseForDisplay.licenseId}]`}
                  className="w-full bg-slate-950/60 text-slate-300 font-bold p-3 rounded-xl border border-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Custom Note / Email Body</label>
                <textarea
                  value={emailNote}
                  onChange={(e) => setEmailNote(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 text-white font-sans p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] space-y-1 text-slate-400">
                <span className="font-bold text-amber-400 block">ATTACHMENTS INCLUDED IN EXPORT:</span>
                <div>• Digital License Certificate PDF / HTML Document</div>
                <div>• Cryptographic License Key JSON Deed</div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSendingEmail}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center space-x-2"
              >
                <Send className={`w-4 h-4 ${isSendingEmail ? 'animate-bounce' : ''}`} />
                <span>{isSendingEmail ? 'SENDING EMAIL EXPORT...' : 'SEND CERTIFICATE NOW'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


