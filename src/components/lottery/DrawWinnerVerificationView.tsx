import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Hash,
  Ticket,
  Award,
  Globe,
  Radio,
  FileCheck,
  Copy,
  ExternalLink,
  Download
} from 'lucide-react';
import { generateAndDownloadPdf } from '../../utils/pdfExporter';
import { hapticEngine } from '../../utils/hapticUtils';

interface VerifiedTicketResult {
  ticketId: string;
  drawId: string;
  numbers: number[];
  powerball: number;
  matchedNumbersCount: number;
  matchedPowerball: boolean;
  prizeTier: string;
  payoutAmount: string;
  vesselName: string;
  holderRank: string;
  verificationStatus: 'VERIFIED' | 'NOT_FOUND' | 'EXPIRED';
  timestamp: string;
  satcomBlockHash: string;
}

export const DrawWinnerVerificationView: React.FC = () => {
  const [inputQuery, setInputQuery] = useState<string>('TKT-8939-MARITIME-7714');
  const [selectedDraw, setSelectedDraw] = useState<string>('#8939');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedResult, setVerifiedResult] = useState<VerifiedTicketResult | null>({
    ticketId: 'TKT-8939-MARITIME-7714',
    drawId: '#8939',
    numbers: [7, 14, 21, 28, 42],
    powerball: 9,
    matchedNumbersCount: 5,
    matchedPowerball: true,
    prizeTier: 'GRAND MEGA JACKPOT (Tier 1)',
    payoutAmount: '$3,850,000 $OD',
    vesselName: 'M/V Ocean Titan (Panama Flag)',
    holderRank: '2nd Officer Lucas M.',
    verificationStatus: 'VERIFIED',
    timestamp: '2026-08-28 22:04:12 UTC',
    satcomBlockHash: '0x8f4b12a93c7d6e4f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f'
  });

  const handleRunVerification = () => {
    if (!inputQuery.trim()) return;
    setIsVerifying(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setIsVerifying(false);
      hapticEngine.trigger('success');

      // Random mock match for demo queries
      if (inputQuery.includes('8939') || inputQuery.includes('7714') || inputQuery.length > 5) {
        setVerifiedResult({
          ticketId: inputQuery.toUpperCase(),
          drawId: selectedDraw,
          numbers: [7, 14, 21, 28, 42],
          powerball: 9,
          matchedNumbersCount: 5,
          matchedPowerball: true,
          prizeTier: 'GRAND MEGA JACKPOT (Tier 1)',
          payoutAmount: '$3,850,000 $OD',
          vesselName: 'M/V Ocean Titan (Panama Flag)',
          holderRank: '2nd Officer Lucas M.',
          verificationStatus: 'VERIFIED',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
          satcomBlockHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
        });
      } else {
        setVerifiedResult({
          ticketId: inputQuery,
          drawId: selectedDraw,
          numbers: [3, 11, 20, 31, 45],
          powerball: 14,
          matchedNumbersCount: 2,
          matchedPowerball: false,
          prizeTier: 'Match 2/5 (Non-Winning)',
          payoutAmount: '$0 $OD',
          vesselName: 'Unknown Vessel',
          holderRank: 'Unspecified Seafarer',
          verificationStatus: 'EXPIRED',
          timestamp: new Date().toISOString(),
          satcomBlockHash: '0x0000000000000000000000000000000000000000'
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 font-mono">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>On-Chain Cryptographic Verification</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <Radio className="w-3 h-3 text-emerald-400" />
                <span>Inmarsat SatCom Block Height Verified</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Draw Winner & Ticket Verification Engine
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Audit ticket authenticity, ball match count, payout status, and cryptographic signature hash directly against high-seas provably fair smart contract ledgers.
            </p>
          </div>
        </div>
      </div>

      {/* Input Verification Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
        <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Search className="w-4 h-4 text-cyan-400" />
          <span>Enter Ticket Slip ID or SatCom Hash</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-3">
            <input
              type="text"
              placeholder="e.g. TKT-8939-MARITIME-7714 or 0x8f4b12..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <button
            onClick={handleRunVerification}
            disabled={isVerifying}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {isVerifying ? (
              <span>Auditing Block...</span>
            ) : (
              <>
                <FileCheck className="w-4 h-4" />
                <span>Verify Ticket</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Sample Button Quick Fill */}
        <div className="flex items-center space-x-2 pt-2 text-[11px] text-slate-400 font-sans">
          <span>Try Demo Ticket:</span>
          <button
            onClick={() => {
              setInputQuery('TKT-8939-MARITIME-7714');
              setSelectedDraw('#8939');
            }}
            className="text-cyan-400 hover:underline font-mono font-bold"
          >
            TKT-8939-MARITIME-7714 (Jackpot Winner)
          </button>
        </div>
      </div>

      {/* Verification Result Card */}
      {verifiedResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-3xl p-6 sm:p-8 font-mono space-y-6 shadow-2xl ${
            verifiedResult.verificationStatus === 'VERIFIED'
              ? 'bg-slate-900 border-emerald-500/40'
              : 'bg-slate-900 border-rose-500/40'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                {verifiedResult.verificationStatus === 'VERIFIED' ? (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AUTHENTIC WINNING TICKET VERIFIED</span>
                  </span>
                ) : (
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>NON-WINNING OR UNMATCHED TICKET</span>
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-white">{verifiedResult.ticketId}</h3>
              <p className="text-xs text-slate-400 font-sans">
                Draw Ref: <span className="text-amber-400 font-bold">{verifiedResult.drawId}</span> • Registered: {verifiedResult.timestamp}
              </p>
            </div>

            {verifiedResult.verificationStatus === 'VERIFIED' && (
              <button
                onClick={() => {
                  generateAndDownloadPdf({
                    documentType: 'E-TICKET',
                    bookingId: verifiedResult.ticketId,
                    title: 'Maritime Lottery Official Winner Certificate',
                    operatorName: 'Ocean Gaming High Seas Authority',
                    passengerOrCargoName: verifiedResult.holderRank,
                    passportOrCustomsCode: 'VERIFIED-UNCLOS-09',
                    origin: verifiedResult.vesselName,
                    destination: 'Ocean Dollar Wallet Settlement',
                    departureDate: new Date().toISOString().split('T')[0],
                    allocatedSpace: verifiedResult.prizeTier,
                    paymentMethod: 'Inmarsat SatCom Blockchain Audit',
                    basePriceUSD: 10,
                    totalPriceUSD: 3850000,
                    currencyCode: '$OD',
                    formattedTotalPrice: verifiedResult.payoutAmount,
                    issueTimestamp: new Date().toISOString(),
                    qrPayload: verifiedResult.satcomBlockHash
                  });
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center space-x-2 shadow-lg shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Export Winner Audit Certificate (PDF)</span>
              </button>
            )}
          </div>

          {/* Ticket Details & Ball Matches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-400 block uppercase">Matched Ball Combination:</span>

              <div className="flex items-center space-x-2">
                {verifiedResult.numbers.map((n) => (
                  <div
                    key={n}
                    className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg border border-amber-300"
                  >
                    {n < 10 ? `0${n}` : n}
                  </div>
                ))}
                <span className="text-slate-600 font-bold">+</span>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white font-black text-sm flex items-center justify-center shadow-lg border border-rose-400">
                  {verifiedResult.powerball < 10 ? `0${verifiedResult.powerball}` : verifiedResult.powerball}
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1 font-sans">
                <div className="flex justify-between py-1 border-t border-slate-900">
                  <span className="text-slate-400">Main Ball Matches:</span>
                  <span className="font-bold text-emerald-400">{verifiedResult.matchedNumbersCount} / 5 Matches</span>
                </div>
                <div className="flex justify-between py-1 border-t border-slate-900">
                  <span className="text-slate-400">Coral Powerball Match:</span>
                  <span className="font-bold text-emerald-400">{verifiedResult.matchedPowerball ? 'Yes (MATCHED)' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-sans">
              <span className="text-xs font-bold text-slate-400 block uppercase font-mono">Winner & Vessel Attestation:</span>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Qualified Prize Tier:</span>
                  <span className="font-bold text-amber-400 font-mono">{verifiedResult.prizeTier}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Total Approved Payout:</span>
                  <span className="font-black text-emerald-400 font-mono text-base">{verifiedResult.payoutAmount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">Vessel & Flag State:</span>
                  <span className="font-bold text-white">{verifiedResult.vesselName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Seafarer Holder:</span>
                  <span className="font-bold text-white">{verifiedResult.holderRank}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Hash Block */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <span className="text-slate-400 block">SATCOM BLOCKCHAIN AUDIT HASH:</span>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] text-emerald-400 break-all select-all font-mono">
              {verifiedResult.satcomBlockHash}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
