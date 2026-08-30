import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DollarSign,
  Wallet,
  ShieldCheck,
  CreditCard,
  Building2,
  Ship,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Download,
  FileText,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Lock,
  ExternalLink,
  ChevronRight,
  Coins,
  Receipt
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

interface PayoutClaimHistory {
  claimId: string;
  drawRef: string;
  date: string;
  grossAmountUSD: number;
  netAmountUSD: number;
  payoutMethod: 'High Seas Escrow ($OD)' | 'Crypto Wallet (USDT)' | 'Maritime SWIFT Wire' | 'Ship Master Safe Cash';
  status: 'DISBURSED' | 'PROCESSING' | 'AUDIT_HOLD';
  txHash: string;
}

export const LotteryPayoutView: React.FC = () => {
  const [unclaimedBalance, setUnclaimedBalance] = useState<number>(149750); // $149,750 $OD
  const [claimAmount, setClaimAmount] = useState<number>(149750);
  const [selectedMethod, setSelectedMethod] = useState<'ESCROW_OD' | 'CRYPTO_USDT' | 'SWIFT_WIRE' | 'MASTER_CASH'>('ESCROW_OD');
  const [seamanId, setSeamanId] = useState<string>('CDC-992014-MAR');
  const [walletAddress, setWalletAddress] = useState<string>('0x71F8c92aB12e9834F26B01928491A2359eB38410');
  
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [claimStage, setClaimStage] = useState<'IDLE' | 'VERIFYING' | 'ESCROW_LOCK' | 'COMPLETE'>('IDLE');
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  // Past payout records
  const [pastClaims, setPastClaims] = useState<PayoutClaimHistory[]>([
    {
      claimId: 'PAY-8939-01',
      drawRef: 'Draw #8939 (Tier 2 Match)',
      date: '2026-08-28',
      grossAmountUSD: 150000,
      netAmountUSD: 149750,
      payoutMethod: 'High Seas Escrow ($OD)',
      status: 'DISBURSED',
      txHash: '0x8f92a1...4b12c'
    },
    {
      claimId: 'PAY-8935-04',
      drawRef: 'Draw #8935 (Tier 3 Match)',
      date: '2026-08-15',
      grossAmountUSD: 15000,
      netAmountUSD: 15000,
      payoutMethod: 'Crypto Wallet (USDT)',
      status: 'DISBURSED',
      txHash: '0x3c71d9...901ef'
    },
    {
      claimId: 'PAY-8928-09',
      drawRef: 'Draw #8928 (Tier 4 Match)',
      date: '2026-08-02',
      grossAmountUSD: 500,
      netAmountUSD: 500,
      payoutMethod: 'Ship Master Safe Cash',
      status: 'DISBURSED',
      txHash: 'VOUCHER-MVR-042'
    }
  ]);

  const payoutMethodOptions = [
    {
      id: 'ESCROW_OD',
      name: 'High Seas Escrow ($OD)',
      icon: Wallet,
      speed: 'Instant (0 sec)',
      fee: '$0.00 (Tax Free)',
      desc: 'Direct credit to Ocean Dollar Maritime Wallet under UNCLOS flag state zero tax.'
    },
    {
      id: 'CRYPTO_USDT',
      name: 'Crypto Settlement (USDT/BTC)',
      icon: Coins,
      speed: '~2 Mins',
      fee: '$2.00 Network Gas',
      desc: 'Automated Web3 smart contract transfer to Polygon or Ethereum mainnet address.'
    },
    {
      id: 'SWIFT_WIRE',
      name: 'Maritime SWIFT Wire',
      icon: Building2,
      speed: '12 - 24 Hours',
      fee: '$15.00 SWIFT Fee',
      desc: 'Direct bank transfer to international seafarer bank accounts worldwide.'
    },
    {
      id: 'MASTER_CASH',
      name: 'Ship Master Cash Vault',
      icon: Ship,
      speed: 'At Next Port Arrival',
      fee: '$0.00 Cash Voucher',
      desc: 'Physical currency disbursement from vessel Captain safe upon port docking.'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(text);
    hapticEngine.trigger('light');
    setTimeout(() => setCopiedTx(null), 2000);
  };

  const handleInitiateClaim = () => {
    if (claimAmount <= 0 || isClaiming) return;
    setIsClaiming(true);
    setClaimStage('VERIFYING');
    hapticEngine.trigger('click');

    setTimeout(() => {
      setClaimStage('ESCROW_LOCK');
      hapticEngine.trigger('medium');
    }, 1500);

    setTimeout(() => {
      setClaimStage('COMPLETE');
      hapticEngine.trigger('success');
      setIsClaiming(false);

      const newClaim: PayoutClaimHistory = {
        claimId: `PAY-${Math.floor(Math.random() * 9000) + 1000}`,
        drawRef: 'Draw #8940 Instant Claim',
        date: new Date().toISOString().split('T')[0],
        grossAmountUSD: claimAmount,
        netAmountUSD: claimAmount,
        payoutMethod: payoutMethodOptions.find((m) => m.id === selectedMethod)?.name as any,
        status: 'DISBURSED',
        txHash: `0x${Math.random().toString(16).substr(2, 10)}...${Math.random().toString(16).substr(2, 5)}`
      };

      setPastClaims((prev) => [newClaim, ...prev]);
      setUnclaimedBalance((prev) => Math.max(0, prev - claimAmount));
    }, 3200);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>UNCLOS Flag State Zero-Tax Settlement</span>
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>Maritime Smart Escrow</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              High Seas Lottery Payout Gateway
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Claim jackpot winnings, tier prizes, and crew syndicate shares directly into your Ocean Dollar wallet, crypto address, SWIFT bank account, or vessel captain safe.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shrink-0 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block font-bold">Unclaimed Prize Pool</span>
            <div className="text-2xl font-black text-emerald-400">${unclaimedBalance.toLocaleString()} $OD</div>
            <span className="text-[10px] text-cyan-400 font-bold block">Draw #8939 Tier 2 Prize Available</span>
          </div>
        </div>
      </div>

      {/* PAYOUT METHOD SELECTOR & CLAIM ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Method Selector List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Select Payout Channel</span>
            </h3>
          </div>

          <div className="space-y-3">
            {payoutMethodOptions.map((method) => {
              const IconComp = method.icon;
              const isSelected = selectedMethod === method.id;

              return (
                <button
                  key={method.id}
                  onClick={() => {
                    setSelectedMethod(method.id as any);
                    hapticEngine.trigger('click');
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-400 shadow-xl'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 font-sans flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">{method.name}</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {method.speed}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">{method.desc}</p>
                    <div className="text-[10px] font-mono font-bold text-slate-300 pt-1">
                      Fee: <span className="text-cyan-400">{method.fee}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Claim Inputs & Execution Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 font-mono shadow-xl relative overflow-hidden">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>Initiate Disbursement Claim</span>
            </h3>
            <span className="text-xs text-slate-400 font-bold">
              Channel: <span className="text-emerald-400">{payoutMethodOptions.find((m) => m.id === selectedMethod)?.name}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Amount Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">Payout Amount ($OD):</label>
              <div className="relative">
                <input
                  type="number"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white font-black focus:outline-none focus:border-emerald-400"
                />
                <button
                  onClick={() => setClaimAmount(unclaimedBalance)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-1 rounded-lg font-bold"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Seaman CDC Book ID */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">Seaman CDC / Passport ID:</label>
              <input
                type="text"
                value={seamanId}
                onChange={(e) => setSeamanId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Conditional Address / Account Input */}
          {selectedMethod === 'CRYPTO_USDT' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">Web3 USDT Wallet Address (Polygon / ETH):</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>
          )}

          {/* Summary Breakdown Card */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-sans text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Gross Claim Amount:</span>
              <span className="font-mono font-bold text-white">${claimAmount.toLocaleString()} $OD</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>UNCLOS Maritime Tax Exemption:</span>
              <span className="font-mono font-bold text-emerald-400">0% ($0.00)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Escrow Processing Fee:</span>
              <span className="font-mono font-bold text-emerald-400">$0.00 (Waived)</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-mono text-sm font-black text-white">
              <span>Net Receivable Amount:</span>
              <span className="text-emerald-400">${claimAmount.toLocaleString()} $OD</span>
            </div>
          </div>

          {/* Execution Button & Animated Stages */}
          <div className="space-y-3">
            <button
              onClick={handleInitiateClaim}
              disabled={isClaiming || claimAmount <= 0}
              className="w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-black py-4 rounded-2xl text-sm transition-all flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
            >
              {isClaiming ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                  <span>
                    {claimStage === 'VERIFYING'
                      ? 'Verifying CDC Identity...'
                      : claimStage === 'ESCROW_LOCK'
                      ? 'Releasing Escrow Funds...'
                      : 'Finalizing Transfer...'}
                  </span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
                  <span>Execute High Seas Payout Transfer</span>
                </>
              )}
            </button>

            {/* Success notification */}
            <AnimatePresence>
              {claimStage === 'COMPLETE' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/20 border border-emerald-500/50 p-4 rounded-2xl flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center space-x-3 text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white block">Payout Claim Successfully Disbursed!</span>
                      <span className="text-[10px] text-slate-300 font-sans">
                        Funds have been transferred to your designated account.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('TX-SETTLE-8940-EX')}
                    className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg text-[10px]"
                  >
                    {copiedTx ? 'Copied!' : 'Copy Receipt'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* PAST PAYOUT CLAIMS HISTORY */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 font-mono space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center space-x-2">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Payout Settlement History Ledger</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Cryptographically signed payout statements and audit hashes under UNCLOS jurisdiction.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-bold uppercase">
                <th className="py-3 px-3">Claim ID</th>
                <th className="py-3 px-3">Draw Reference</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Payout Method</th>
                <th className="py-3 px-3 text-right">Net Amount</th>
                <th className="py-3 px-3 text-right">Status</th>
                <th className="py-3 px-3 text-right">Receipt Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {pastClaims.map((claim) => (
                <tr key={claim.claimId} className="hover:bg-slate-950/50 transition-all font-mono">
                  <td className="py-3.5 px-3 font-black text-white">{claim.claimId}</td>
                  <td className="py-3.5 px-3 text-slate-300 text-[11px] font-sans">{claim.drawRef}</td>
                  <td className="py-3.5 px-3 text-slate-400 text-[11px] font-sans">{claim.date}</td>
                  <td className="py-3.5 px-3">
                    <span className="bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {claim.payoutMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-black text-emerald-400">${claim.netAmountUSD.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {claim.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleCopy(claim.txHash)}
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] flex items-center space-x-1 justify-end ml-auto"
                    >
                      <span>{claim.txHash}</span>
                      <Copy className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
