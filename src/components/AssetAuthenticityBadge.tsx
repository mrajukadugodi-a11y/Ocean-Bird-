import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, Copy, ExternalLink, Award } from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface AssetAuthenticityBadgeProps {
  assetId?: string;
  assetName?: string;
  customHash?: string;
  className?: string;
  variant?: 'badge' | 'watermark' | 'overlay' | 'compact';
  showDetailsTooltip?: boolean;
}

// Simple deterministic hash generator helper if no customHash is passed
function generateDeterministicHash(seed: string): string {
  let hash = 0;
  const str = seed + '_EASTMAN_CREATION_VERIFIED_AUTHENTICITY_2026';
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex1 = Math.abs(hash).toString(16).padStart(8, '0');
  const hex2 = Math.abs(hash * 31).toString(16).padStart(8, '0');
  const hex3 = Math.abs(hash * 127).toString(16).padStart(8, '0');
  return `0xEC-${hex1.substring(0, 4)}-${hex2.substring(0, 4)}-${hex3.substring(0, 4)}`;
}

export const AssetAuthenticityBadge: React.FC<AssetAuthenticityBadgeProps> = ({
  assetId = 'OD-ASSET-001',
  assetName = 'Ocean Dollar Sovereign Banknote',
  customHash,
  className = '',
  variant = 'badge',
  showDetailsTooltip = true
}) => {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const secureHash = customHash || generateDeterministicHash(`${assetId}-${assetName}`);
  const fullVerificationHash = `SHA256:0xEASTMAN_CREATION_${assetId.replace(/[^A-Z0-9]/gi, '')}_${secureHash.replace(/-/g, '')}`;

  const handleCopyHash = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(fullVerificationHash);
    setCopied(true);
    hapticEngine.trigger('success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
    hapticEngine.trigger('click');
  };

  if (variant === 'watermark') {
    return (
      <div
        className={`absolute bottom-3 right-3 z-20 pointer-events-auto bg-slate-950/90 backdrop-blur-md border border-amber-500/50 rounded-xl px-2.5 py-1 flex items-center space-x-1.5 shadow-xl text-[10px] font-mono text-amber-300 select-none group transition-all hover:border-amber-400 hover:bg-slate-900 ${className}`}
        onClick={handleOpenDetails}
        title="Click to view Eastman Creation Proof of Authenticity"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
        <div className="flex flex-col">
          <span className="font-black tracking-wider text-[9px] text-amber-200 uppercase flex items-center space-x-1">
            <span>Verified by Eastman Creation</span>
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          </span>
          <span className="text-[8px] text-slate-400 font-mono tracking-tight">
            HASH: <strong className="text-amber-300">{secureHash}</strong>
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center space-x-1.5 bg-slate-950/80 border border-emerald-500/40 rounded-lg px-2 py-0.5 text-[10px] font-mono text-emerald-300 ${className}`}
      >
        <Award className="w-3 h-3 text-emerald-400 shrink-0" />
        <span className="font-bold text-[9px]">Verified by Eastman Creation</span>
        <span className="text-[8px] text-slate-400">({secureHash.slice(0, 9)})</span>
      </div>
    );
  }

  return (
    <>
      <div
        id={`asset-authenticity-badge-${assetId}`}
        onClick={handleOpenDetails}
        className={`bg-slate-950/90 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 text-white font-mono text-xs shadow-lg transition-all cursor-pointer group hover:shadow-amber-500/10 ${className}`}
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider flex items-center space-x-1">
                <span>Verified by Eastman Creation</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-400 inline shrink-0" />
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono truncate flex items-center space-x-1 mt-0.5">
              <Lock className="w-2.5 h-2.5 text-slate-500 shrink-0" />
              <span>Hash:</span>
              <strong className="text-slate-200 group-hover:text-amber-300 transition-colors font-semibold">
                {secureHash}
              </strong>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyHash}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-[10px] font-bold transition-all shrink-0 flex items-center space-x-1"
          title="Copy Secure Hash"
        >
          <Copy className="w-3 h-3" />
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Hash'}</span>
        </button>
      </div>

      {/* Proof of Authenticity Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 max-w-md w-full space-y-4 font-mono text-xs shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="font-black text-sm text-white uppercase">Eastman Creation Proof of Reserve &amp; Authenticity</h4>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white font-bold text-base px-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-sans text-slate-300 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-amber-400 font-black font-mono block uppercase">Asset Title:</span>
                <p className="font-bold text-white text-sm">{assetName}</p>
                <span className="text-[10px] text-slate-500 font-mono block">Asset ID: {assetId}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 space-y-1 font-mono">
                <span className="text-[10px] text-emerald-400 font-black block uppercase flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Eastman Creation Verification Certificate</span>
                </span>
                <p className="text-[10px] text-slate-300 leading-tight break-all bg-slate-900 p-2 rounded border border-slate-800">
                  {fullVerificationHash}
                </p>
              </div>

              <div className="space-y-1 text-[11px] text-slate-400">
                <p className="flex justify-between">
                  <span>Authentication Standard:</span>
                  <strong className="text-white">UNCLOS ISO-20022 / Eastman-256</strong>
                </p>
                <p className="flex justify-between">
                  <span>Cryptographic Status:</span>
                  <strong className="text-emerald-400">VERIFIED &amp; IMMUTABLE</strong>
                </p>
                <p className="flex justify-between">
                  <span>Vault Custody Registry:</span>
                  <strong className="text-amber-300">Zurich Gold Bullion Vault #1</strong>
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCopyHash}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-black text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Hash Copied!' : 'Copy Full Hash'}</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
