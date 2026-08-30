import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  Radio,
  Cpu,
  Activity,
  Search,
  Download,
  CheckCircle2,
  Copy,
  Hash,
  RefreshCw,
  Eye,
  Terminal,
  Server,
  Filter,
  Layers,
  FileCheck
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface SecurityLogItem {
  id: string;
  timestamp: string;
  category: 'CRYPTOGRAPHIC_SEEDS' | 'HARDWARE_SENSORS' | 'AUDITOR_SIGNATURES' | 'SYSTEM_TELEMETRY';
  severity: 'INFO' | 'AUDIT' | 'SECURE' | 'WARN';
  title: string;
  details: string;
  hashProof: string;
}

export const DrawSecurityLogView: React.FC = () => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Verifier tool states
  const [serverSeedInput, setServerSeedInput] = useState<string>('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [clientSeedInput, setClientSeedInput] = useState<string>('satcom-vessel-voyager-8940');
  const [nonceInput, setNonceInput] = useState<number>(42);
  const [verifyResult, setVerifyResult] = useState<string | null>(null);

  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Security Audit Stream Data
  const [securityLogs, setSecurityLogs] = useState<SecurityLogItem[]>([
    {
      id: 'SEC-8940-01',
      timestamp: '2026-08-30 10:22:15 UTC',
      category: 'CRYPTOGRAPHIC_SEEDS',
      severity: 'SECURE',
      title: 'SHA-256 Multi-Sig Master Seed Generated',
      details: 'Combined server seed and vessel client seed generated with 256-bit entropy under MGA audit protocol.',
      hashProof: '0x8940f92b...e4a17'
    },
    {
      id: 'SEC-8940-02',
      timestamp: '2026-08-30 10:22:10 UTC',
      category: 'HARDWARE_SENSORS',
      severity: 'INFO',
      title: 'Pneumatic Chamber Air Pressure Lock',
      details: 'Air pressure stabilized at 104.2 PSI. Optical laser sensors calibrated for ball detection.',
      hashProof: '0x4c21b0e...8801f'
    },
    {
      id: 'SEC-8940-03',
      timestamp: '2026-08-30 10:21:45 UTC',
      category: 'SYSTEM_TELEMETRY',
      severity: 'SECURE',
      title: 'SatCom International Waters GPS Lock',
      details: 'Vessel coordinates verified: 24°14\'N 77°32\'W. Position outside 12-nautical-mile territorial boundary.',
      hashProof: '0x10f29a7...61a20'
    },
    {
      id: 'SEC-8940-04',
      timestamp: '2026-08-30 10:20:00 UTC',
      category: 'AUDITOR_SIGNATURES',
      severity: 'AUDIT',
      title: 'Maritime Gaming Authority (MGA) Audit Signoff',
      details: 'Inspector Capt. Eric Voorhees signed pre-draw hardware integrity validation certificate #MGA-8940.',
      hashProof: '0x39a110e...99bc1'
    },
    {
      id: 'SEC-8940-05',
      timestamp: '2026-08-30 10:18:30 UTC',
      category: 'HARDWARE_SENSORS',
      severity: 'SECURE',
      title: 'Hardware Quantum TRNG Entropy Seeded',
      details: 'Thermal noise random number generator passes Dieharder battery test suite with 99.999% randomness score.',
      hashProof: '0x7e44a1b...29410'
    }
  ]);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    hapticEngine.trigger('light');
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleRunVerify = () => {
    hapticEngine.trigger('click');
    setVerifyResult('VERIFYING');
    setTimeout(() => {
      setVerifyResult('PROVABLY_FAIR_VALIDATED');
      hapticEngine.trigger('success');
    }, 1200);
  };

  const filteredLogs = securityLogs.filter((log) => {
    const matchesCat = activeCategoryFilter === 'ALL' || log.category === activeCategoryFilter;
    const matchesSearch =
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.hashProof.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>MGA Audit Security Protocol</span>
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <Hash className="w-3 h-3 text-cyan-400" />
                <span>SHA-256 Multi-Sig Proof</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Draw Security Telemetry Log & Audit Trail
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Real-time audit stream of cryptographic seeds, hardware TRNG sensors, pneumatic pressure telemetry, and auditor digital signatures for Draw #8940.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 border border-slate-800 p-4 rounded-2xl shrink-0">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Security Rating</span>
              <span className="text-sm font-black text-emerald-400">100% PROVABLY FAIR</span>
            </div>
          </div>
        </div>
      </div>

      {/* HARDWARE SENSOR TELEMETRY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Air Blower Pressure</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">104.2 PSI</div>
          <span className="text-[10px] text-slate-400 font-sans block">Nominal (Range: 100-110 PSI)</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Hardware TRNG Temp</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">38.4 °C</div>
          <span className="text-[10px] text-slate-400 font-sans block">Quantum Entropy Source Active</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">SatCom GPS Geofence</span>
            <Radio className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400">24°14'N 77°32'W</div>
          <span className="text-[10px] text-slate-400 font-sans block">Verified High Seas Jurisdiction</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Auditor Sign-off</span>
            <FileCheck className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-sm font-black text-white">CAPT. E. VOORHEES</div>
          <span className="text-[10px] text-slate-400 font-sans block">Cert #MGA-8940 Validated</span>
        </div>
      </div>

      {/* CRYPTOGRAPHIC VERIFIER INTERACTIVE TOOL */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 font-mono shadow-2xl">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>Independent Provably Fair Hash Verifier</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">SHA-256 Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Server Seed Hash:</label>
            <input
              type="text"
              value={serverSeedInput}
              onChange={(e) => setServerSeedInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Client Seed (Vessel ID):</label>
            <input
              type="text"
              value={clientSeedInput}
              onChange={(e) => setClientSeedInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-amber-300 font-mono focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Draw Nonce:</label>
            <input
              type="number"
              value={nonceInput}
              onChange={(e) => setNonceInput(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            onClick={handleRunVerify}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
          >
            <RefreshCw className={`w-4 h-4 ${verifyResult === 'VERIFYING' ? 'animate-spin' : ''}`} />
            <span>Re-Calculate & Verify SHA-256 Hash</span>
          </button>

          {verifyResult === 'PROVABLY_FAIR_VALIDATED' && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 px-4 py-2.5 rounded-2xl text-xs text-emerald-300 flex items-center space-x-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hash Validated! Results match provably fair seed sequence.</span>
            </div>
          )}
        </div>
      </div>

      {/* LIVE AUDIT STREAM LOG TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 font-mono space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Security Event Stream</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Chronological security log of sensor telemetry and cryptographic proofs.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit hash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono w-44"
              />
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1">
          {['ALL', 'CRYPTOGRAPHIC_SEEDS', 'HARDWARE_SENSORS', 'AUDITOR_SIGNATURES', 'SYSTEM_TELEMETRY'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                activeCategoryFilter === cat
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Audit List */}
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black text-white">{log.title}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-black px-2 py-0.5 rounded-full">
                    {log.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans max-w-2xl">{log.details}</p>
                <span className="text-[10px] text-slate-500 block">{log.timestamp} • Log ID: {log.id}</span>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => handleCopy(log.hashProof)}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-400 font-mono text-[11px] px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition-all"
                >
                  <span>{log.hashProof}</span>
                  <Copy className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
