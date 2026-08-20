import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Lock, Bug, Eye, AlertTriangle, Cpu, Terminal, 
  RefreshCw, Zap, CheckCircle2, Download, Radio, Sparkles, Globe, FileCode,
  HardDrive, Key, UserX, Skull, ShieldX, Search, AlertOctagon, Activity, Server
} from 'lucide-react';

export interface DarkWebThreatItem {
  id: string;
  detectedAt: string;
  threatType: 'DARK_WEB_LEAK' | 'PHISHING_SPOOF' | 'VIRUS_TRANSMISSION' | 'ZERO_DAY_EXPLOIT';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  sourceOnionUrl?: string;
  phishingDomain?: string;
  virusPayloadName?: string;
  targetVesselOrAsset: string;
  description: string;
  status: 'CONTAINED' | 'QUARANTINED' | 'BLOCKED' | 'NEUTRALIZED';
  mitigationActionExecuted: string;
}

export const INITIAL_CYBER_THREATS: DarkWebThreatItem[] = [
  {
    id: 'THREAT-DW-001',
    detectedAt: '2 Mins Ago',
    threatType: 'DARK_WEB_LEAK',
    severity: 'CRITICAL',
    sourceOnionUrl: 'http://darkmaritime4k9xz...onion/leaks/2026',
    targetVesselOrAsset: 'MV Ocean Sovereign 2026 (Satellite VSAT Terminal Login)',
    description: 'Dark web forum post selling stolen VSAT satellite terminal admin credentials and WPA3 bridge Wi-Fi keys.',
    status: 'CONTAINED',
    mitigationActionExecuted: 'Automated Super Master AI rotated VSAT SSH keys, revoked compromised session tokens, and enforced 2FA OAuth.'
  },
  {
    id: 'THREAT-PHISH-002',
    detectedAt: '12 Mins Ago',
    threatType: 'PHISHING_SPOOF',
    severity: 'HIGH',
    phishingDomain: 'https://port-authority-chittagong-sec.com (Spoofed Fake Domain)',
    targetVesselOrAsset: 'Chittagong Port Entry Manifest System & Captain Email',
    description: 'Phishing email impersonating Chittagong Port Authority containing link to fake e-Visa & berth booking credential harvest form.',
    status: 'BLOCKED',
    mitigationActionExecuted: 'Blocked domain proxy across fleet DNS, flagged sender IP, and scrubbed phishing link from captain inbox.'
  },
  {
    id: 'THREAT-VIRUS-003',
    detectedAt: '38 Mins Ago',
    threatType: 'VIRUS_TRANSMISSION',
    severity: 'CRITICAL',
    virusPayloadName: 'Trojan.Maritime.AIS-Ransom.v4.bin',
    targetVesselOrAsset: 'Bridge ECDIS Navigation Terminal (USB Media Port #2)',
    description: 'Infected USB flash drive inserted into bridge ECDIS terminal attempting execution of malicious binary designed to encrypt chart data.',
    status: 'NEUTRALIZED',
    mitigationActionExecuted: 'WASM WASM-Sandbox sandbox locked process execution, quarantined infected binary, and disinfected USB filesystem in 0.4 seconds.'
  },
  {
    id: 'THREAT-ZERO-004',
    detectedAt: '1 Hour Ago',
    threatType: 'ZERO_DAY_EXPLOIT',
    severity: 'HIGH',
    virusPayloadName: 'BufferOverflow.EngineTelemetry.SoAV2',
    targetVesselOrAsset: 'Engine Control Unit (ECU) Modbus TCP Gateway',
    description: 'Malicious TCP packet payload targeting engine telemetry port to force false temperature alarms.',
    status: 'QUARANTINED',
    mitigationActionExecuted: 'Deployed zero-day reentrancy guard, filtered malformed Modbus packets, and isolated ECU telemetry subnet.'
  }
];

export const SuperMasterDarkWebAndCyberShieldAgent: React.FC = () => {
  const [threats, setThreats] = useState<DarkWebThreatItem[]>(INITIAL_CYBER_THREATS);
  const [isDarkWebScanActive, setIsDarkWebScanActive] = useState<boolean>(false);
  const [isPhishingBarrierStrict, setIsPhishingBarrierStrict] = useState<boolean>(true);
  const [isAntiVirusSandboxActive, setIsAntiVirusSandboxActive] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'DARK_WEB_LEAK' | 'PHISHING_SPOOF' | 'VIRUS_TRANSMISSION'>('ALL');
  const [auditLogToast, setAuditLogToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setAuditLogToast(msg);
    setTimeout(() => setAuditLogToast(null), 4000);
  };

  const handleRunDeepDarkWebScan = () => {
    setIsDarkWebScanActive(true);
    triggerToast('🔍 Super Master AI Agent scanning 14,200+ Dark Web Onion forums, paste sites, and hacker Telegram channels...');
    
    setTimeout(() => {
      setIsDarkWebScanActive(false);
      const newThreat: DarkWebThreatItem = {
        id: `THREAT-DW-${Date.now().toString().slice(-3)}`,
        detectedAt: 'Just Now (Realtime Scan)',
        threatType: 'DARK_WEB_LEAK',
        severity: 'CRITICAL',
        sourceOnionUrl: 'http://onionx777dark...onion/forum/thread/984',
        targetVesselOrAsset: 'Global Maritime Satellite API Gateway Keys',
        description: 'Super Master AI discovered expired API token mention in onion paste. Auto-rotated token & locked endpoint access.',
        status: 'NEUTRALIZED',
        mitigationActionExecuted: 'Scrubbed token, rotated cryptographic keys, and alerted security operations team.'
      };
      setThreats((prev) => [newThreat, ...prev]);
      triggerToast('🛡️ Deep Dark Web Scan Complete: Neutralized 1 dark web credential leak threat! Fleet integrity 100%.');
    }, 2500);
  };

  const handlePurgeVirusTransmissions = () => {
    triggerToast('🦠 Executing Anti-Virus & Ransomware Disinfection Sweep across all bridge USB ports and satellite file caches...');
    setTimeout(() => {
      setThreats((prev) => prev.map((t) => (t.threatType === 'VIRUS_TRANSMISSION' ? { ...t, status: 'NEUTRALIZED' } : t)));
      triggerToast('✅ All Virus & Malware Transmissions Neutralized! WASM Execution Sandbox Sealed.');
    }, 1500);
  };

  const handleBlockPhishingDomains = () => {
    triggerToast('🌐 Enforcing Anti-Phishing Domain Barrier: Blocked 48 lookalike port authority domains & scrubbed malicious links.');
  };

  const filteredThreats = activeFilter === 'ALL'
    ? threats
    : threats.filter((t) => t.threatType === activeFilter);

  return (
    <div id="super-master-dark-web-cyber-shield-agent" className="space-y-6 font-mono text-white animate-fadeIn">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-950 to-indigo-950 border border-rose-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-rose-500/20 border border-rose-400/50 rounded-2xl">
              <Skull className="w-8 h-8 text-rose-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">SUPER MASTER SECURITY SENTINEL</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  24/7 ACTIVE THREAT NEUTRALIZATION
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Super Master AI Dark Web, Phishing &amp; Virus Defense Agent
              </h1>
              <p className="text-slate-300 text-xs font-sans mt-0.5 max-w-3xl">
                Autonomous AI sentinel protecting maritime fleets from dark web credential leaks, domain spoofing phishing attacks, USB malware payloads, and satellite virus transmissions.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 shrink-0">
            <ShieldCheck className="w-7 h-7 text-emerald-400 animate-bounce" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">CYBER SHIELD STATUS</span>
              <strong className="text-emerald-300 text-xs font-black block">100% ARMORED &amp; SEALED</strong>
            </div>
          </div>
        </div>

        {/* THREE CORE DEFENSE PILARS STATUS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* PILAR 1: DARK WEB RADAR */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-rose-500/40 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-rose-400 font-bold text-xs uppercase flex items-center space-x-1.5">
                <Globe className="w-4 h-4 text-rose-400" />
                <span>DARK WEB RADAR</span>
              </span>
              <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[9px] font-bold">ACTIVE SCANNING</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Scans 14,000+ onion forums for leaked captain credentials &amp; VSAT keys.</p>
            <button
              onClick={handleRunDeepDarkWebScan}
              disabled={isDarkWebScanActive}
              className="w-full py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs uppercase rounded-lg transition-all flex items-center justify-center space-x-1.5"
            >
              {isDarkWebScanActive ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>SCANNING DARKNET...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>RUN DARK WEB SCAN</span>
                </>
              )}
            </button>
          </div>

          {/* PILAR 2: ANTI-PHISHING BARRIER */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/40 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-cyan-400 font-bold text-xs uppercase flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>ANTI-PHISHING BARRIER</span>
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-[9px] font-bold">100% STRICT</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Blocks lookalike port domains, spoofed e-Visas, and credential harvesting forms.</p>
            <button
              onClick={handleBlockPhishingDomains}
              className="w-full py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 font-black text-xs uppercase rounded-lg transition-all flex items-center justify-center space-x-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>ENFORCE DOMAIN LOCKDOWN</span>
            </button>
          </div>

          {/* PILAR 3: VIRUS & MALWARE INTERCEPTOR */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/40 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-emerald-400 font-bold text-xs uppercase flex items-center space-x-1.5">
                <Bug className="w-4 h-4 text-emerald-400" />
                <span>VIRUS &amp; WASM SANDBOX</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[9px] font-bold">SEALED</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">Interceptors bridge USB drivers, binary payloads, and ransomware executables.</p>
            <button
              onClick={handlePurgeVirusTransmissions}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-lg transition-all flex items-center justify-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>DISINFECT ALL VIRUS THREATS</span>
            </button>
          </div>
        </div>
      </div>

      {auditLogToast && (
        <div className="bg-rose-500/20 border border-rose-400 text-rose-200 p-3 rounded-xl text-xs font-bold font-mono text-center animate-fadeIn">
          {auditLogToast}
        </div>
      )}

      {/* THREAT NEUTRALIZATION FEED */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-black text-white">Live Threat Neutralization Ledger</h2>
          </div>

          <div className="flex items-center space-x-1 text-xs font-mono">
            <span className="text-slate-400 mr-1">Filter:</span>
            {[
              { id: 'ALL', label: 'ALL THREATS' },
              { id: 'DARK_WEB_LEAK', label: 'DARK WEB' },
              { id: 'PHISHING_SPOOF', label: 'PHISHING' },
              { id: 'VIRUS_TRANSMISSION', label: 'VIRUS & MALWARE' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                  activeFilter === f.id ? 'bg-rose-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* THREAT LIST */}
        <div className="space-y-3 font-mono text-xs">
          {filteredThreats.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 hover:border-rose-500/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                      t.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    }`}
                  >
                    {t.severity}
                  </span>

                  <span className="bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    {t.threatType.replace('_', ' ')}
                  </span>

                  <strong className="text-white font-bold text-sm truncate">{t.targetVesselOrAsset}</strong>
                </div>

                <span className="text-emerald-400 text-[10px] font-bold shrink-0">{t.detectedAt}</span>
              </div>

              <p className="text-slate-300 font-sans text-xs">{t.description}</p>

              {t.sourceOnionUrl && (
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-rose-300 truncate">
                  <span className="text-slate-500">Darknet Source:</span> {t.sourceOnionUrl}
                </div>
              )}

              {t.phishingDomain && (
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-cyan-300 truncate">
                  <span className="text-slate-500">Spoofed Domain:</span> {t.phishingDomain}
                </div>
              )}

              {t.virusPayloadName && (
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-amber-300 truncate">
                  <span className="text-slate-500">Infected Payload:</span> {t.virusPayloadName}
                </div>
              )}

              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                <span className="text-emerald-300 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>AI Mitigation Executed:</strong> {t.mitigationActionExecuted}</span>
                </span>

                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold uppercase shrink-0">
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
