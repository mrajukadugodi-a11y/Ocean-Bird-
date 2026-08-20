import React, { useState } from 'react';
import officialLogoImg from '../assets/images/official_logo_1786649303542.jpg';
import headerBannerImg from '../assets/images/header_banner_1786649316919.jpg';
import {
  Building2,
  ShieldCheck,
  Award,
  Download,
  Fingerprint,
  CheckCircle2,
  UserCheck,
  FileCheck,
  ExternalLink,
  Sparkles,
  Lock,
  Copy,
  Check,
  RefreshCw,
  Globe,
  Share2,
  Printer,
  X,
  Mail,
  Send,
  History,
  Eye,
  FileCode
} from 'lucide-react';

export interface AppOwnershipRecord {
  appGuid: string;
  appName: string;
  ownerName: string;
  ownerEmail: string;
  registrationHash: string;
  copyrightNumber: string;
  issuedDate: string;
  jurisdiction: string;
  ownershipType: 'Sole Proprietary Title' | 'Joint Venture Charter' | 'Corporate Parent Holdings';
  digitalSignature: string;
}

export const AppOwnershipCertificateView: React.FC = () => {
  const [ownerName, setOwnerName] = useState('M. Raju');
  const [ownerEmail, setOwnerEmail] = useState('mrajukadugodi@gmail.com');
  const [jurisdiction, setJurisdiction] = useState('Global Maritime & International Aviation IP Registry');
  const [copiedHash, setCopiedHash] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [previewTargetRecord, setPreviewTargetRecord] = useState<AppOwnershipRecord | null>(null);

  // Email Export Modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('mrajukadugodi@gmail.com');
  const [emailNote, setEmailNote] = useState('Please find attached your official Application Ownership & Intellectual Property Title Deed Certificate for OceanBird.');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailToast, setEmailToast] = useState(false);

  const [ownershipRecord, setOwnershipRecord] = useState<AppOwnershipRecord>({
    appGuid: '28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f',
    appName: 'OceanBird Airways & Cruise Ship Port Portal',
    ownerName: 'M. Raju',
    ownerEmail: 'mrajukadugodi@gmail.com',
    registrationHash: '0x9F82A41C908103B2E491A88102C48192039A',
    copyrightNumber: 'US-COPYRIGHT-2026-OB-99120',
    issuedDate: '2026-08-09',
    jurisdiction: 'Global Maritime & International Aviation IP Registry',
    ownershipType: 'Sole Proprietary Title',
    digitalSignature: 'SIG_SHA256_RSA4096_VERIFIED_AUTHENTIC_2026_M_RAJU'
  });

  // Ownership History Log
  const [ownershipHistory, setOwnershipHistory] = useState<AppOwnershipRecord[]>([
    {
      appGuid: '28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f',
      appName: 'OceanBird Airways & Cruise Ship Port Portal',
      ownerName: 'M. Raju',
      ownerEmail: 'mrajukadugodi@gmail.com',
      registrationHash: '0x9F82A41C908103B2E491A88102C48192039A',
      copyrightNumber: 'US-COPYRIGHT-2026-OB-99120',
      issuedDate: '2026-08-09',
      jurisdiction: 'Global Maritime & International Aviation IP Registry',
      ownershipType: 'Sole Proprietary Title',
      digitalSignature: 'SIG_SHA256_RSA4096_VERIFIED_AUTHENTIC_2026_M_RAJU'
    },
    {
      appGuid: '28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f',
      appName: 'OceanBird Global Platform Title',
      ownerName: 'M. Raju & Global Aviation Consortium',
      ownerEmail: 'mrajukadugodi@gmail.com',
      registrationHash: '0x7E31F882B10408A12903C28190382B1203',
      copyrightNumber: 'US-COPYRIGHT-2025-OB-77102',
      issuedDate: '2025-06-12',
      jurisdiction: 'International Intellectual Property Registry',
      ownershipType: 'Sole Proprietary Title',
      digitalSignature: 'SIG_SHA256_RSA4096_VERIFIED_2025'
    }
  ]);

  const activeRecordForDisplay = previewTargetRecord || ownershipRecord;

  const handleIssueOwnership = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      const randHex = Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();
      const updatedHash = `0x9F82A41C908103B2E491A${randHex}`;
      const newRecord: AppOwnershipRecord = {
        ...ownershipRecord,
        ownerName,
        ownerEmail,
        jurisdiction,
        registrationHash: updatedHash,
        issuedDate: new Date().toISOString().split('T')[0]
      };
      setOwnershipRecord(newRecord);
      setOwnershipHistory(prev => [newRecord, ...prev]);
      alert(`App Ownership Deed Issued & Updated Successfully!\nOwner: ${ownerName} (${ownerEmail})\nApp GUID: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f`);
    }, 1200);
  };

  const handleCopyHash = (hashToCopy?: string) => {
    navigator.clipboard.writeText(hashToCopy || activeRecordForDisplay.registrationHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  // HTML Certificate Title Deed Download
  const handleDownloadHtmlCertificate = (targetRecord: AppOwnershipRecord = activeRecordForDisplay) => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OceanBird App Ownership Deed - ${targetRecord.appGuid}</title>
  <style>
    body { font-family: 'Georgia', serif; background: #091e15; color: #ecfdf5; padding: 40px; margin: 0; }
    .deed-card { max-width: 820px; margin: 0 auto; background: #064e3b; border: 8px solid #10b981; border-radius: 24px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6); }
    .header { text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
    .logo-img { width: 90px; height: 90px; border-radius: 50%; border: 3px solid #34d399; margin: 0 auto 12px auto; display: block; object-fit: cover; }
    .badge { color: #34d399; font-family: sans-serif; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; font-size: 12px; }
    h1 { font-size: 30px; color: #ffffff; margin: 10px 0 5px 0; }
    .guid { font-family: monospace; color: #a7f3d0; font-size: 13px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #022c22; padding: 25px; border-radius: 16px; border: 1px solid #059669; margin-bottom: 25px; font-family: sans-serif; }
    .label { color: #6ee7b7; font-size: 11px; text-transform: uppercase; font-weight: bold; display: block; }
    .value { color: #ffffff; font-size: 15px; font-weight: bold; margin-top: 4px; display: block; }
    .hash-box { background: #064e3b; padding: 12px; border-radius: 8px; border: 1px solid #059669; font-family: monospace; color: #fde047; word-break: break-all; margin-bottom: 25px; font-size: 12px; }
    .footer { display: flex; justify-content: space-between; border-top: 1px solid #059669; padding-top: 20px; font-size: 11px; color: #a7f3d0; font-family: sans-serif; }
    .seal { color: #34d399; font-weight: bold; }
    @media print { body { background: white; color: black; padding: 0; } .deed-card { border-color: #059669; background: white; color: black; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="deed-card">
    <div class="header">
      <img src="${officialLogoImg}" alt="Official Logo" class="logo-img" />
      <div class="badge">WORLDWIDE INTELLECTUAL PROPERTY DEED CERTIFICATE</div>
      <h1>Master Application Ownership Deed</h1>
      <div class="guid">Application: ${targetRecord.appName} | GUID: ${targetRecord.appGuid}</div>
    </div>
    
    <div class="grid">
      <div>
        <span class="label">Registered App Owner</span>
        <span class="value">${targetRecord.ownerName}</span>
      </div>
      <div>
        <span class="label">Owner Contact Email</span>
        <span class="value">${targetRecord.ownerEmail}</span>
      </div>
      <div>
        <span class="label">Copyright Filing Number</span>
        <span class="value">${targetRecord.copyrightNumber}</span>
      </div>
      <div>
        <span class="label">Ownership Title Type</span>
        <span class="value">${targetRecord.ownershipType}</span>
      </div>
    </div>

    <div style="font-family: sans-serif; margin-bottom: 10px;">
      <span class="label">Cryptographic Registration Hash:</span>
      <div class="hash-box">${targetRecord.registrationHash}</div>
    </div>

    <div class="footer">
      <div>
        <strong>JURISDICTION:</strong> ${targetRecord.jurisdiction}<br>
        Digital Signature: ${targetRecord.digitalSignature}
      </div>
      <div style="text-align:right;">
        <span class="seal">GLOBAL IP REGISTRY SEAL</span><br>
        Deed Code: DEED-IP-2026-OB
      </div>
    </div>
  </div>
</body>
</html>`;

    const element = document.createElement("a");
    const file = new Blob([htmlContent], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = `OceanBird_App_Ownership_Title_Deed_${targetRecord.appGuid}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadDeed = (targetRecord: AppOwnershipRecord = activeRecordForDisplay) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(targetRecord, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `App_Ownership_Deed_${targetRecord.appGuid}.json`;
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
          <span>Ownership Deed Certificate Emailed to {emailRecipient} successfully!</span>
        </div>
      )}

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <img src={headerBannerImg} alt="Header Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-4">
            <img
              src={officialLogoImg}
              alt="Official Logo Mark"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-emerald-400 shadow-xl object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>OFFICIAL DIGITAL APP OWNERSHIP DEED</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  INTELLECTUAL PROPERTY REGISTERED
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Application Master Ownership & IP Title Deed Certificate</h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
                Formal legal declaration of software ownership, copyright title, code repository control, and intellectual property rights for the OceanBird platform.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono">
            <button
              onClick={() => {
                setPreviewTargetRecord(ownershipRecord);
                setShowPdfModal(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>PREVIEW CERTIFICATE</span>
            </button>
            <button
              onClick={() => handleDownloadHtmlCertificate()}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-emerald-500/40 text-emerald-300 hover:bg-slate-800 font-bold text-xs transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>DOWNLOAD DIGITAL DEED</span>
            </button>
            <button
              onClick={() => {
                setEmailRecipient(ownershipRecord.ownerEmail);
                setShowEmailModal(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-slate-800 font-bold text-xs transition-all flex items-center space-x-2"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>E-MAIL EXPORT</span>
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Registered Owner</span>
            <span className="text-emerald-400 font-black text-sm truncate block">{ownershipRecord.ownerName}</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">App GUID / ID</span>
            <span className="text-sky-300 font-black text-xs font-mono block truncate">{ownershipRecord.appGuid}</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Copyright Filing</span>
            <span className="text-amber-300 font-black text-xs block">{ownershipRecord.copyrightNumber}</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Digital Signature</span>
            <span className="text-emerald-400 font-black text-xs flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>RSA-4096 VERIFIED</span>
            </span>
          </div>
        </div>
      </div>

      {/* DEED CERTIFICATE DISPLAY & UPDATE FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* OWNERSHIP FORM */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Update / Re-Issue Ownership Title</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Primary App Owner Name</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Owner Email Address</label>
              <input
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Legal IP Jurisdiction</label>
              <input
                type="text"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <button
              onClick={handleIssueOwnership}
              disabled={isUpdating}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 mt-4"
            >
              <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>{isUpdating ? 'STAMPING OWNERSHIP...' : 'RE-ISSUE OWNERSHIP TITLE'}</span>
            </button>
          </div>
        </div>

        {/* CERTIFICATE DEED DISPLAY */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Certificate of App Ownership & Intellectual Property Title</span>
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setPreviewTargetRecord(ownershipRecord);
                  setShowPdfModal(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>PREVIEW CERTIFICATE</span>
              </button>
              <button
                onClick={() => handleDownloadHtmlCertificate(ownershipRecord)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-[10px] font-bold flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>HTML DEED</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border-2 border-emerald-500/30 space-y-5 relative">
            <div className="text-center space-y-1 pb-4 border-b border-slate-800">
              <span className="text-xs font-black text-emerald-400 tracking-widest block uppercase">WORLDWIDE INTELLECTUAL PROPERTY DEED</span>
              <h3 className="text-lg sm:text-xl font-black text-white font-sans">{ownershipRecord.appName}</h3>
              <span className="text-slate-400 text-[11px] block">App Instance GUID: <span className="text-sky-300 font-mono font-bold">{ownershipRecord.appGuid}</span></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">REGISTERED APP OWNER</span>
                <span className="text-emerald-300 font-bold text-sm block font-sans">{ownershipRecord.ownerName}</span>
                <span className="text-sky-400 font-mono text-[11px] block">{ownershipRecord.ownerEmail}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">OWNERSHIP TILE TYPE</span>
                <span className="text-white font-bold block">{ownershipRecord.ownershipType}</span>
                <span className="text-slate-400 text-[10px] block">Issued: {ownershipRecord.issuedDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400 uppercase font-bold">CRYPTO REGISTRATION HASH</span>
                <button
                  onClick={() => handleCopyHash(ownershipRecord.registrationHash)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1"
                >
                  {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHash ? 'COPIED!' : 'COPY HASH'}</span>
                </button>
              </div>
              <span className="bg-slate-900 text-amber-300 p-2.5 rounded-xl border border-slate-800 font-mono block text-[11px] break-all">
                {ownershipRecord.registrationHash}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-slate-400">
              <span>Jurisdiction: <span className="text-slate-200 font-bold">{ownershipRecord.jurisdiction}</span></span>
              <span className="text-emerald-400 font-mono font-bold">{ownershipRecord.digitalSignature}</span>
            </div>
          </div>
        </div>
      </div>

      {/* OWNERSHIP CERTIFICATE HISTORY LOG TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">App Ownership Deed History & Legal Title Log</h2>
          </div>
          <span className="text-slate-400 text-[10px]">{ownershipHistory.length} Recorded Ownership Titles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">App GUID</th>
                <th className="py-2.5 px-3">Owner Title Holder</th>
                <th className="py-2.5 px-3">Copyright Filing</th>
                <th className="py-2.5 px-3">Crypto Hash</th>
                <th className="py-2.5 px-3">Issued Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px]">
              {ownershipHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 text-sky-300 font-mono text-[10px]">{item.appGuid}</td>
                  <td className="py-3 px-3 text-white font-sans font-bold">{item.ownerName}</td>
                  <td className="py-3 px-3 text-amber-300">{item.copyrightNumber}</td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[10px]">{item.registrationHash.substring(0, 18)}...</td>
                  <td className="py-3 px-3 text-slate-400">{item.issuedDate}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => {
                          setPreviewTargetRecord(item);
                          setShowPdfModal(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[10px] font-bold flex items-center space-x-1"
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
                        <Download className="w-3 h-3 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => {
                          setEmailRecipient(item.ownerEmail);
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

      {/* PRINTABLE OWNERSHIP CERTIFICATE PDF / PREVIEW MODAL */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-8 space-y-6 shadow-2xl relative border-8 border-emerald-600">
            <button
              onClick={() => setShowPdfModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* CERTIFICATE HEADER */}
            <div className="text-center space-y-3 border-b-2 border-emerald-600 pb-6">
              <div className="flex justify-center items-center space-x-3">
                <img
                  src={officialLogoImg}
                  alt="Official Logo Mark"
                  className="w-20 h-20 rounded-full border-4 border-emerald-600 shadow-lg object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-center items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-widest">
                <ShieldCheck className="w-6 h-6" />
                <span>OFFICIAL DEED OF MASTER OWNERSHIP & IP TITLE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
                Master Software Ownership Deed Certificate
              </h1>
              <p className="text-slate-500 text-xs font-mono">
                International Intellectual Property Registry | App GUID: {activeRecordForDisplay.appGuid}
              </p>
            </div>

            {/* CERTIFICATE BODY */}
            <div className="space-y-4 font-mono text-xs text-slate-800">
              <p className="text-sm font-sans italic text-slate-700 text-center">
                Be it known to all global authorities that full sole proprietary title, copyright rights, source repository control, and operational ownership for the application <strong className="text-slate-900 font-bold">{activeRecordForDisplay.appName}</strong> is legally vested in:
              </p>

              <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 text-[10px] block font-bold">SOLE PROPRIETARY OWNER</span>
                    <span className="text-slate-900 font-black text-base block font-sans">{activeRecordForDisplay.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block font-bold">OWNER EMAIL ADDRESS</span>
                    <span className="text-emerald-800 font-bold text-sm block">{activeRecordForDisplay.ownerEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block font-bold">COPYRIGHT REGISTRATION NO.</span>
                    <span className="text-slate-900 font-black text-sm block font-mono">{activeRecordForDisplay.copyrightNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block font-bold">OWNERSHIP TITLE TYPE</span>
                    <span className="text-emerald-900 font-bold block">{activeRecordForDisplay.ownershipType}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200">
                  <span className="text-slate-500 text-[10px] block font-bold">CRYPTOGRAPHIC REGISTRATION DEED HASH</span>
                  <span className="text-slate-900 font-mono text-[11px] block break-all bg-white p-2 rounded-lg border border-emerald-200 mt-1">
                    {activeRecordForDisplay.registrationHash}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-700 font-sans">
                <div>
                  <span className="font-bold block text-slate-900">Legal IP Jurisdiction:</span>
                  <span>{activeRecordForDisplay.jurisdiction}</span>
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Digital RSA Signature:</span>
                  <span className="font-mono text-[10px] text-emerald-800">{activeRecordForDisplay.digitalSignature}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[10px]">
                <div>
                  <span className="text-slate-500 block">REGISTRATION STAMP</span>
                  <span className="font-bold text-slate-900">{activeRecordForDisplay.issuedDate} | Authenticated Master Deed</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-black block text-xs">GLOBAL IP REGISTRY DEED AUTHORITY</span>
                  <span className="text-slate-500">Official Deed Seal: DEED-IP-2026-OB</span>
                </div>
              </div>
            </div>

            {/* PRINT & DOWNLOAD ACTIONS */}
            <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => handleDownloadHtmlCertificate(activeRecordForDisplay)}
                className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>DOWNLOAD HTML DEED</span>
              </button>
              <button
                onClick={handlePrintPdf}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center space-x-2"
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
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Mail className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">E-mail Digital Ownership Certificate & Deed</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Recipient Email Address</label>
                <input
                  type="email"
                  value={emailRecipient}
                  onChange={(e) => setEmailRecipient(e.target.value)}
                  className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Subject Line</label>
                <input
                  type="text"
                  readOnly
                  value={`Official App Ownership Deed Certificate [GUID: ${activeRecordForDisplay.appGuid}]`}
                  className="w-full bg-slate-950/60 text-slate-300 font-bold p-3 rounded-xl border border-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Custom Note / Email Body</label>
                <textarea
                  value={emailNote}
                  onChange={(e) => setEmailNote(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 text-white font-sans p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] space-y-1 text-slate-400">
                <span className="font-bold text-emerald-400 block">ATTACHMENTS INCLUDED IN EXPORT:</span>
                <div>• Digital Ownership Deed Certificate PDF / HTML Document</div>
                <div>• Master Cryptographic Ownership Title JSON File</div>
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
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center space-x-2"
              >
                <Send className={`w-4 h-4 ${isSendingEmail ? 'animate-bounce' : ''}`} />
                <span>{isSendingEmail ? 'SENDING EMAIL EXPORT...' : 'SEND DEED CERTIFICATE NOW'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


