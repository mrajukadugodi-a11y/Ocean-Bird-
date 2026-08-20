import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  Wifi,
  Terminal,
  Cpu,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Download,
  Server,
  Activity,
  Zap,
  Radio,
  FileCheck
} from 'lucide-react';

export interface SecurityAsset {
  id: string;
  name: string;
  category: 'ECDIS Navigation' | 'Satellite Communications' | 'Engine Automation (OT)' | 'Radar/AIS Gateway';
  firewallStatus: 'Active & Encrypted' | 'Patch Required' | 'Warning';
  lastScan: string;
  vulnerabilityCount: number;
  ipAddress: string;
}

export const VesselsCyberSecCheckView: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState('MV OceanBird Explorer (IMO 9842109)');
  const [isScanning, setIsScanning] = useState(false);
  const [auditScore, setAuditScore] = useState(98);

  const ASSETS: SecurityAsset[] = [
    {
      id: 'CYB-01',
      name: 'Bridge ECDIS Primary Navigation System',
      category: 'ECDIS Navigation',
      firewallStatus: 'Active & Encrypted',
      lastScan: '2026-08-09 03:15 UTC',
      vulnerabilityCount: 0,
      ipAddress: '192.168.10.14'
    },
    {
      id: 'CYB-02',
      name: 'KVH TracPhone V7-HTS Satellite Antenna',
      category: 'Satellite Communications',
      firewallStatus: 'Active & Encrypted',
      lastScan: '2026-08-09 03:00 UTC',
      vulnerabilityCount: 0,
      ipAddress: '10.200.4.1'
    },
    {
      id: 'CYB-03',
      name: 'Engine Control Room (ECR) Siemens PLC Gateway',
      category: 'Engine Automation (OT)',
      firewallStatus: 'Patch Required',
      lastScan: '2026-08-08 22:40 UTC',
      vulnerabilityCount: 1,
      ipAddress: '172.16.50.100'
    },
    {
      id: 'CYB-04',
      name: 'Class A AIS Transponder & Radar Interface',
      category: 'Radar/AIS Gateway',
      firewallStatus: 'Active & Encrypted',
      lastScan: '2026-08-09 02:50 UTC',
      vulnerabilityCount: 0,
      ipAddress: '192.168.10.25'
    }
  ];

  const handleRunAuditScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setAuditScore(99);
      alert('Vessel Cyber-Security Scan Complete! IMO Resolution MSC.428(98) compliance verified.');
    }, 2500);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans p-4 sm:p-6 bg-slate-950 min-h-screen">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldAlert className="w-64 h-64 text-rose-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>IMO RESOLUTION MSC.428(98) CYBER RISK MANAGER</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                CYBER SCORE: {auditScore}%
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Vessels Cyber-Security & IT/OT Network Vulnerability Check</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Real-time cybersecurity audit scanner monitoring ECDIS GPS anti-spoofing, satellite SATCOM firewall rules, Engine OT PLC networks, and IMO cybersecurity compliance.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 font-mono">
            <button
              onClick={handleRunAuditScan}
              disabled={isScanning}
              className="px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'SCANNING IT/OT...' : 'RUN CYBER AUDIT SCAN'}</span>
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Vessel Selected</span>
            <span className="text-white font-bold text-xs truncate block">{selectedVessel}</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">GPS Anti-Spoofing</span>
            <span className="text-emerald-400 font-black text-lg">Active (GNSS Dual)</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">SATCOM Encryption</span>
            <span className="text-sky-300 font-black text-lg">AES-256 Enabled</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">OT Siemens PLC</span>
            <span className="text-amber-300 font-black text-lg">1 Minor Patch</span>
          </div>
        </div>
      </div>

      {/* ASSET SECURITY GRID */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Server className="w-5 h-5 text-rose-400" />
            <span>Onboard IT / OT Network System Firewalls</span>
          </h2>
          <span className="text-slate-400 text-xs">IMO MSC.428(98) Standard</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ASSETS.map((asset) => (
            <div key={asset.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-rose-500/40 transition-all shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold">
                    {asset.category}
                  </span>
                  <h3 className="text-sm font-bold text-white font-sans">{asset.name}</h3>
                  <span className="text-slate-500 text-[10px] block">IP: {asset.ipAddress}</span>
                </div>

                <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                  asset.firewallStatus === 'Active & Encrypted' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {asset.firewallStatus}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                <span>Last Cyber Scan: <strong className="text-slate-200">{asset.lastScan}</strong></span>
                <span className="text-rose-400 font-bold">{asset.vulnerabilityCount} Threats Found</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
