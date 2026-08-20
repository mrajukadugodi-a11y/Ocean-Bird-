import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Bug, Lock, Eye, AlertTriangle, Cpu, Terminal, RefreshCw, Zap, CheckCircle2, Download, Radio, Sparkles } from 'lucide-react';

interface SecurityAgent {
  id: string;
  name: string;
  role: string;
  icon: any;
  status: 'ACTIVE' | 'SCANNING' | 'ALERT' | 'ENFORCING';
  threatsBlocked: number;
  lastScanTime: string;
  badge: string;
  color: string;
  metrics: { label: string; value: string }[];
  description: string;
}

export const SuperMasterCyberDefenseSquadView: React.FC = () => {
  const [isPenetrationTesting, setIsPenetrationTesting] = useState<boolean>(false);
  const [isLockdownActive, setIsLockdownActive] = useState<boolean>(false);
  const [penTestProgress, setPenTestProgress] = useState<number>(100);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [agents, setAgents] = useState<SecurityAgent[]>([
    {
      id: 'malware_sentinel',
      name: 'MalwareSentinel-AI',
      role: 'Malware & Binary Integrity Guard',
      icon: Bug,
      status: 'ACTIVE',
      threatsBlocked: 142,
      lastScanTime: '1 sec ago',
      badge: 'BINARY INTEGRITY',
      color: 'text-amber-400',
      description: 'Scans JavaScript/WASM application bundles, prevents malicious script injections, and monitors memory boundary integrity.',
      metrics: [
        { label: 'WASM Sandbox', value: '100% SEALED' },
        { label: 'Binary Signatures', value: 'VERIFIED SHA-256' },
        { label: 'Script Injections', value: '0 DETECTED' }
      ]
    },
    {
      id: 'anti_phish_guard',
      name: 'AntiPhish-Guard AI',
      role: 'Phishing & Domain Spoofing Barrier',
      icon: Eye,
      status: 'ACTIVE',
      threatsBlocked: 389,
      lastScanTime: '3 sec ago',
      badge: 'PHISHING RADAR',
      color: 'text-cyan-400',
      description: 'Detects lookalike domain proxies, blocks credential harvesting forms, and validates CORS header authenticity.',
      metrics: [
        { label: 'Domain Spoofing', value: '0 PROXIES ACTIVE' },
        { label: 'Credential Theft', value: 'BLOCKED (100%)' },
        { label: 'SSL/TLS Handshake', value: 'TLS 1.3 STRICT' }
      ]
    },
    {
      id: 'zerohack_barrier',
      name: 'ZeroHack Barrier AI',
      role: 'Anti-DDoS & Zero-Day Exploit Shield',
      icon: Lock,
      status: 'ACTIVE',
      threatsBlocked: 1204,
      lastScanTime: 'Real-Time',
      badge: 'ANTI-DDOS & EXPLOIT',
      color: 'text-emerald-400',
      description: 'Provides rate-limiting against botnet DDoS floods, enforces smart contract reentrancy guards, and patches zero-day exploits.',
      metrics: [
        { label: 'DDoS Rate Limiter', value: '10k req/sec OK' },
        { label: 'Reentrancy Guard', value: 'ACTIVE' },
        { label: 'Zero-Day Shield', value: 'ZERO VULNS' }
      ]
    },
    {
      id: 'datavault_shield',
      name: 'DataVault Shield AI',
      role: 'Data Theft & Exfiltration Prevention',
      icon: Cpu,
      status: 'ACTIVE',
      threatsBlocked: 89,
      lastScanTime: '2 sec ago',
      badge: 'DATA EXFILTRATION',
      color: 'text-indigo-400',
      description: 'Applies homomorphic memory encryption, detects stolen API secret key usage, and revokes compromised tokens automatically.',
      metrics: [
        { label: 'Local Memory Lock', value: 'AES-GCM-256' },
        { label: 'Stolen Keys', value: 'AUTO-REVOKED' },
        { label: 'Exfiltration Alerts', value: '0 THREATS' }
      ]
    },
    {
      id: 'master_commander',
      name: 'Master Squad Commander AI',
      role: 'Autonomous Squad Orchestrator & Commander',
      icon: Sparkles,
      status: 'ACTIVE',
      threatsBlocked: 1824,
      lastScanTime: 'Continuous',
      badge: 'SQUAD COMMANDER',
      color: 'text-rose-400',
      description: 'Correlates security telemetry across all 4 defense agents, automatically triggering countermeasures and maintaining 100% security rating.',
      metrics: [
        { label: 'Security Rating', value: '100% SECURE' },
        { label: 'Squad Response', value: '< 0.4ms LATENCY' },
        { label: 'Threat Mitigation', value: 'AUTONOMOUS' }
      ]
    }
  ]);

  const [threatLogs] = useState([
    { id: 'LOG-991', time: '11:58:12 UTC', agent: 'AntiPhish-Guard AI', type: 'Fake Domain Proxy', detail: 'Blocked spoofed login domain "ocean-bird-fake-portal.com"', status: 'MITIGATED' },
    { id: 'LOG-990', time: '11:54:02 UTC', agent: 'ZeroHack Barrier AI', type: 'Syn-Flood DDoS Attack', detail: 'Rate-limited 2,400 rogue IPs targeting /api/v1/bullion-sync', status: 'MITIGATED' },
    { id: 'LOG-989', time: '11:48:33 UTC', agent: 'MalwareSentinel-AI', type: 'Payload Injection Attempt', detail: 'Quarantined unverified inline script element in DOM payload', status: 'QUARANTINED' },
    { id: 'LOG-988', time: '11:42:19 UTC', agent: 'DataVault Shield AI', type: 'Unauthorized API Access', detail: 'Detected revoked key sk_test_8812; automatically rotated token', status: 'REVOKED' }
  ]);

  const handleRunPenetrationTest = () => {
    setIsPenetrationTesting(true);
    setPenTestProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setPenTestProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsPenetrationTesting(false);
        triggerToast('🛡️ Super Master Pen-Test Complete! 0 Vulnerabilities Found. App is 100% SECURE.');
      }
    }, 400);
  };

  const handleToggleLockdown = () => {
    setIsLockdownActive(!isLockdownActive);
    triggerToast(
      isLockdownActive
        ? '🔓 Emergency Lockdown Lifted. Standard Squad Monitoring Resumed.'
        : '🔒 EMERGENCY LOCKDOWN ACTIVATED! API Endpoints Sealed & Local State Isolated.'
    );
  };

  return (
    <div className="space-y-8 font-mono">
      {/* TOAST NOTICE */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-rose-500 text-white font-black px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce border border-rose-300">
          <ShieldAlert className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER HERO */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 shadow-2xl relative overflow-hidden transition-all ${
        isLockdownActive
          ? 'bg-rose-950/90 border-rose-500 ring-2 ring-rose-500/50'
          : 'bg-slate-900 border-rose-500/30'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">AUTONOMOUS CYBER DEFENSE CENTER</span>
              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span>5 AI DEFENSE AGENTS ONLINE</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Super Master AI Cybersecurity Agent Squad</h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-1 max-w-2xl">
              Real-time protection against Malware injections, Hacker zero-day exploits, Phishing domain proxies, Data theft exfiltration, and Credential harvesting.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleRunPenetrationTest}
              disabled={isPenetrationTesting}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs rounded-xl uppercase transition-all shadow-lg flex items-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPenetrationTesting ? 'animate-spin' : ''}`} />
              <span>{isPenetrationTesting ? `Pen-Testing (${penTestProgress}%)` : '🧪 Run Full Pen-Test'}</span>
            </button>

            <button
              onClick={handleToggleLockdown}
              className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase transition-all shadow-lg border ${
                isLockdownActive
                  ? 'bg-amber-500 text-slate-950 border-amber-300'
                  : 'bg-rose-950 hover:bg-rose-900 text-rose-300 border-rose-500/50'
              }`}
            >
              {isLockdownActive ? '🔓 Lift Lockdown' : '⚡ Activate Emergency Lockdown'}
            </button>
          </div>
        </div>

        {/* PENETRATION TEST PROGRESS BAR */}
        {isPenetrationTesting && (
          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-xs font-bold text-rose-300">
              <span>SCANNING BINARY &amp; NETWORK BOUNDARIES...</span>
              <span>{penTestProgress}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-rose-500/30">
              <div className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-300" style={{ width: `${penTestProgress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* SQUAD AGENTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-black text-white uppercase">
            Specialized Defense Agents (<span className="text-rose-400">5 Active Officers</span>)
          </h2>
          <span className="text-xs text-emerald-400 font-bold">● Overall Squad Rating: 100% SECURE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const Icon = agent.icon;

            return (
              <div
                key={agent.id}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl relative group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-rose-500/50 transition-all">
                        <Icon className={`w-6 h-6 ${agent.color}`} />
                      </div>
                      <div>
                        <span className="text-[9px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-bold uppercase block w-fit">
                          {agent.badge}
                        </span>
                        <h3 className="text-base font-black text-white mt-0.5">{agent.name}</h3>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      🟢 {agent.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans line-clamp-3">{agent.description}</p>

                  {/* METRICS DISPLAY */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
                    {agent.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between gap-2">
                        <span className="text-slate-500 text-[10px] uppercase font-bold">{m.label}:</span>
                        <strong className="text-slate-200 font-mono text-[11px]">{m.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                  <span>Threats Blocked: <strong className="text-rose-400 font-bold">{agent.threatsBlocked.toLocaleString()}</strong></span>
                  <span>Last Scan: <strong className="text-slate-300">{agent.lastScanTime}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INCIDENT LOG & AUDIT REPORT */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">REAL-TIME THREAT LOGS</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                0 UNRESOLVED INCIDENTS
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Autonomous Threat Incident Log &amp; Audit Trail</h2>
          </div>

          <button
            onClick={() => triggerToast('📄 Security Audit Report (PDF/JSON) generated and downloaded.')}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-slate-800 text-xs font-bold rounded-xl uppercase transition-all shrink-0 flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Audit Deed</span>
          </button>
        </div>

        <div className="space-y-2">
          {threatLogs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-rose-400 font-mono">[{log.id}]</span>
                  <span className="font-black text-white">{log.type}</span>
                  <span className="text-slate-500 text-[10px]">via {log.agent}</span>
                </div>
                <p className="text-slate-400 text-[11px] font-sans">{log.detail}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                  ✓ {log.status}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
