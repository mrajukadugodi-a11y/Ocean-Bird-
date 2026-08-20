import React, { useState } from 'react';
import {
  Fingerprint,
  FileText,
  ShieldCheck,
  QrCode,
  Globe,
  Lock,
  CheckCircle2,
  Calendar,
  Building2,
  Award,
  Sparkles,
  Download,
  Key,
  ShieldAlert,
  UserCheck,
  Plane,
  Ship,
  Clock,
  Scan,
  RefreshCw
} from 'lucide-react';

export interface BorderStamp {
  id: string;
  country: string;
  countryFlag: string;
  portOfEntry: string;
  entryDate: string;
  exitDate: string;
  type: 'Airways Flight' | 'Seaport Cruise' | 'Land Transit';
  status: 'Clearance Granted';
}

export const DigitalPassportPortalView: React.FC = () => {
  const [passportNumber, setPassportNumber] = useState('P-IND-98421092');
  const [seamanBookNo, setSeamanBookNo] = useState('CDC-IND-771890');
  const [fullName, setFullName] = useState('CAPT. ALEXANDER VANCE');
  const [nationality, setNationality] = useState('INDIAN / REPUBLIC OF INDIA');
  const [dateOfBirth, setDateOfBirth] = useState('1988-06-14');
  const [issueAuthority, setIssueAuthority] = useState('MINISTRY OF EXTERNAL AFFAIRS / DG SHIPPING');
  const [passportExpiry, setPassportExpiry] = useState('2034-11-20');
  
  const [isBiometricVerified, setIsBiometricVerified] = useState(true);
  const [qrSimulatedToken, setQrSimulatedToken] = useState(`ICAO-BIO-HASH-${Date.now().toString().slice(-8)}`);

  const BORDER_STAMPS: BorderStamp[] = [
    {
      id: 'STAMP-01',
      country: 'Singapore',
      countryFlag: '🇸🇬',
      portOfEntry: 'Singapore Changi Airport (SIN) / Marina Bay Cruise Centre',
      entryDate: '2026-07-12',
      exitDate: '2026-07-20',
      type: 'Seaport Cruise',
      status: 'Clearance Granted'
    },
    {
      id: 'STAMP-02',
      country: 'United Arab Emirates',
      countryFlag: '🇦🇪',
      portOfEntry: 'Dubai International Airport (DXB) / Port Rashid',
      entryDate: '2026-05-04',
      exitDate: '2026-05-18',
      type: 'Airways Flight',
      status: 'Clearance Granted'
    },
    {
      id: 'STAMP-03',
      country: 'United States',
      countryFlag: '🇺🇸',
      portOfEntry: 'Miami International Seaport / JFK Airport',
      entryDate: '2026-02-10',
      exitDate: '2026-03-01',
      type: 'Airways Flight',
      status: 'Clearance Granted'
    },
    {
      id: 'STAMP-04',
      country: 'Germany / Schengen Zone',
      countryFlag: '🇩🇪',
      portOfEntry: 'Frankfurt Airport (FRA) / Port of Hamburg',
      entryDate: '2025-11-15',
      exitDate: '2025-11-28',
      type: 'Seaport Cruise',
      status: 'Clearance Granted'
    }
  ];

  const refreshQRToken = () => {
    setQrSimulatedToken(`ICAO-BIO-HASH-${Date.now().toString().slice(-8)}`);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Fingerprint className="w-64 h-64 text-indigo-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>ICAO DOC 9303 COMPLIANT E-PASSPORT & SEAMAN WALLET</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>BIOMETRICALLY VERIFIED</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Digital Passport & Seaman Book Credential</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Cryptographically signed e-Passport, Continuous Discharge Certificate (CDC), active visa stamps, and border clearance QR code for instant international immigration & seaport entry.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 font-mono">
            <button
              onClick={() => alert('Downloading official ICAO Cryptographic Passport Credentials...')}
              className="px-4 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT CREDENTIAL</span>
            </button>
          </div>
        </div>
      </div>

      {/* DIGITAL PASSPORT CARD & QR CODE VERIFIER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* LEFT 2 COLS: DIGITAL PASSPORT BOOKLET DISPLAY */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-bold text-white uppercase">REPUBLIC OF INDIA / PASSPORT & MARITIME CDC</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
              TYPE: P / CDC
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* AVATAR & BIOMETRIC HASH */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-32 h-40 bg-slate-950 border-2 border-indigo-500/40 rounded-2xl mx-auto sm:mx-0 flex flex-col items-center justify-center p-2 relative overflow-hidden shadow-inner">
                <UserCheck className="w-16 h-16 text-indigo-400 my-auto" />
                <div className="w-full bg-indigo-500/20 py-1 text-[9px] text-indigo-300 font-bold text-center border-t border-indigo-500/30">
                  BIOMETRIC 3D HASH
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 block">FACIAL HASH ID</span>
                <span className="text-[10px] text-emerald-400 font-bold break-all block">sha256:8f4a1029c9a0...</span>
              </div>
            </div>

            {/* PASSPORT PARTICULARS */}
            <div className="sm:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Full Name</span>
                <span className="text-white font-bold text-sm block">{fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Passport Number</span>
                <span className="text-amber-400 font-bold text-sm block">{passportNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Seaman Book (CDC)</span>
                <span className="text-sky-300 font-bold text-sm block">{seamanBookNo}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Nationality</span>
                <span className="text-slate-200 font-bold text-xs block">{nationality}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Date of Birth</span>
                <span className="text-slate-200 font-bold text-xs block">{dateOfBirth}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Expiry Date</span>
                <span className="text-emerald-400 font-bold text-xs block">{passportExpiry}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-500 block uppercase">Issuing Authority</span>
                <span className="text-slate-300 font-bold text-xs block">{issueAuthority}</span>
              </div>
            </div>
          </div>

          {/* ICAO MACHINE READABLE ZONE (MRZ) */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1 font-mono text-slate-400 tracking-widest text-[11px] overflow-x-auto">
            <p>P&lt;INDVANCE&lt;&lt;ALEXANDER&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
            <p>P984210924IND8806148M3411201CDC771890&lt;&lt;&lt;&lt;&lt;&lt;84</p>
          </div>
        </div>

        {/* RIGHT COL: IMMIGRATION SCAN QR TOKEN */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Immigration Border QR Token</span>
              </h3>
              <button
                onClick={refreshQRToken}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Refresh Dynamic Token"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-slate-400 text-[11px]">
              Present this encrypted dynamic QR code at e-Gates in airports or seaport cruise terminals for instant biometric clearance.
            </p>

            <div className="bg-white p-4 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center border-4 border-indigo-500 shadow-2xl">
              <QrCode className="w-36 h-36 text-slate-950" />
            </div>

            <div className="text-center space-y-1">
              <span className="text-slate-500 text-[10px] block">DYNAMIC ICAO VERIFICATION HASH</span>
              <span className="text-indigo-300 font-bold text-xs">{qrSimulatedToken}</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-1">
            <span className="text-emerald-400 font-bold text-xs flex items-center justify-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>US C1/D & Schengen Multi-Entry Active</span>
            </span>
            <span className="text-slate-400 text-[10px] block">Valid for all international flights & seafarer port landings</span>
          </div>
        </div>
      </div>

      {/* IMMIGRATION BORDER STAMPS HISTORY */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 font-mono">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>International Border Entry & Exit Stamps History</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Recorded entry and exit clearances across global airport hubs and international seaport cruise terminals.
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-bold">{BORDER_STAMPS.length} Verified Stamps</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {BORDER_STAMPS.map((stamp) => (
            <div key={stamp.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-indigo-500/40 transition-all shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{stamp.countryFlag}</span>
                  <span className="text-white font-bold">{stamp.country}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                  {stamp.status}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">Port / Airport</span>
                <span className="text-slate-300 text-[11px] block">{stamp.portOfEntry}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-2 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">ENTRY</span>
                  <span className="text-sky-300 font-bold">{stamp.entryDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">EXIT</span>
                  <span className="text-amber-300 font-bold">{stamp.exitDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
