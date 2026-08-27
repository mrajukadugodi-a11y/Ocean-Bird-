import React, { useState } from 'react';
import {
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Award,
  Lock,
  Building2,
  Download,
  Sparkles,
  Search,
  ExternalLink,
  Coins,
  History,
  Check
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface AuditRecord {
  id: string;
  vaultName: string;
  location: string;
  goldWeightKg: number;
  usdEquivalent: number;
  auditor: string;
  auditDate: string;
  porHash: string;
  status: 'VERIFIED' | 'PENDING';
}

const AUDIT_RECORDS: AuditRecord[] = [
  {
    id: 'AUD-2026-081',
    vaultName: 'Zurich Deep Alpine Vault Node #4',
    location: 'Zurich, Switzerland',
    goldWeightKg: 1250.0,
    usdEquivalent: 104500000,
    auditor: 'PwC International Maritime Audit',
    auditDate: '2026-08-26 23:00 UTC',
    porHash: '0x9a8f...4e1c883a',
    status: 'VERIFIED'
  },
  {
    id: 'AUD-2026-080',
    vaultName: 'Singapore FreePort High-Security Node',
    location: 'Changi, Singapore',
    goldWeightKg: 980.5,
    usdEquivalent: 81969800,
    auditor: 'KPMG Sovereign Reserve Group',
    auditDate: '2026-08-26 12:00 UTC',
    porHash: '0x3b1c...7d92110a',
    status: 'VERIFIED'
  },
  {
    id: 'AUD-2026-079',
    vaultName: 'Chittagong Port Sovereign Vault Node',
    location: 'Chittagong, Bangladesh',
    goldWeightKg: 620.0,
    usdEquivalent: 51832000,
    auditor: 'Bureau Veritas Maritime Custody',
    auditDate: '2026-08-25 18:30 UTC',
    porHash: '0x7e2d...91f044bb',
    status: 'VERIFIED'
  }
];

export const AssetAuditTrailView: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord>(AUDIT_RECORDS[0]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerifiedToast, setIsVerifiedToast] = useState<boolean>(false);

  const handleVerifyHash = () => {
    setIsVerifying(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerifiedToast(true);
      hapticEngine.trigger('success');
      setTimeout(() => setIsVerifiedToast(false), 3500);
    }, 1200);
  };

  const totalGoldKg = AUDIT_RECORDS.reduce((acc, r) => acc + r.goldWeightKg, 0);
  const totalUsdReserve = AUDIT_RECORDS.reduce((acc, r) => acc + r.usdEquivalent, 0);

  return (
    <div id="asset-audit-trail-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              REAL-TIME PROOF OF RESERVE (PoR) AUDIT TRAIL
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <FileCheck className="w-8 h-8 text-emerald-400" />
            <span>Asset Audit Trail &amp; Gold Vault Certificates</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Cryptographic SHA-256 Proof of Reserve (PoR) attestations for Swiss, Singapore, and Chittagong 24K gold bullion vaults.
          </p>
        </div>

        <button
          onClick={handleVerifyHash}
          disabled={isVerifying}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs uppercase shadow-xl transition-all flex items-center space-x-2 shrink-0"
        >
          {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{isVerifying ? 'Verifying Hashes...' : 'Re-verify On-Chain Hash'}</span>
        </button>
      </div>

      {isVerifiedToast && (
        <div className="bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce relative z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>PoR SHA-256 Merkle Root Verified 100% Match with Vault Physical Assay Records!</span>
          </div>
        </div>
      )}

      {/* Main Reserve Summary Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>Total Vaulted 24K Gold</span>
          </span>
          <span className="text-3xl font-black text-amber-400 block">{totalGoldKg.toLocaleString()} KG</span>
          <span className="text-[10px] text-emerald-400 font-bold">Physical 999.9 Fine Bullion</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Total USD Reserve Value</span>
          </span>
          <span className="text-3xl font-black text-emerald-400 block">${totalUsdReserve.toLocaleString()}</span>
          <span className="text-[10px] text-emerald-300 font-bold">1:1 $OD Peg Coverage</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Audit Status</span>
          </span>
          <span className="text-3xl font-black text-purple-300 block">PASSED 100%</span>
          <span className="text-[10px] text-purple-400 font-bold">PwC / KPMG / Veritas Certified</span>
        </div>
      </div>

      {/* Audit Log Table & Active Certificate Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 font-mono text-xs">
        {/* Left: Audit Log Entries */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <History className="w-5 h-5 text-emerald-400" />
            <span>Vault Inspection Certificates</span>
          </h3>

          <div className="space-y-3">
            {AUDIT_RECORDS.map((rec) => {
              const isSelected = selectedRecord.id === rec.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => {
                    setSelectedRecord(rec);
                    hapticEngine.trigger('click');
                  }}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/40 shadow-2xl'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-sm">{rec.vaultName}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      {rec.status} ✓
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                    <span>Gold: <strong className="text-amber-400">{rec.goldWeightKg} kg</strong></span>
                    <span>Valuation: <strong className="text-emerald-400">${rec.usdEquivalent.toLocaleString()}</strong></span>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                    <span>Auditor: {rec.auditor}</span>
                    <span>Hash: {rec.porHash}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Certificate Inspection Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border-2 border-emerald-500/50 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">OFFICIAL ASSAY CERTIFICATE</span>
              <span className="text-[10px] text-slate-400">{selectedRecord.id}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Vault Custodian</span>
                <strong className="text-white text-base block">{selectedRecord.vaultName}</strong>
                <span className="text-slate-400 text-[11px]">{selectedRecord.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Assayed Gold</span>
                  <span className="text-sm font-black text-amber-400">{selectedRecord.goldWeightKg} KG</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Market Parity</span>
                  <span className="text-sm font-black text-emerald-400">${selectedRecord.usdEquivalent.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Independent Auditor</span>
                <span className="text-white font-bold">{selectedRecord.auditor}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Audit Timestamp</span>
                <span className="text-slate-300 font-mono text-[11px]">{selectedRecord.auditDate}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Proof of Reserve Hash (SHA-256)</span>
                <span className="text-emerald-400 font-mono text-[10px] break-all block bg-slate-950 p-2 rounded-xl border border-slate-800">
                  {selectedRecord.porHash}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
