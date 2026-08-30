import React, { useState } from 'react';
import { LotteryWinningsBankingPortal } from './LotteryWinningsBankingPortal';

import { AssetAuthenticityBadge } from './AssetAuthenticityBadge';
import {
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Copy,
  Check,
  QrCode,
  DollarSign,
  Lock,
  Unlock,
  Coins,
  History,
  Send,
  Download,
  Flame,
  Sparkles,
  CreditCard,
  Building2,
  HardDrive
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface WalletTransaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'STAKING_REWARD' | 'ESCROW_RELEASE';
  amount: number;
  token: '$OD' | '$OD-GOLD' | '$OD-GOV';
  recipientOrSender: string;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING';
  hash: string;
}

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TX-9012',
    type: 'STAKING_REWARD',
    amount: 145.50,
    token: '$OD',
    recipientOrSender: '365-Day Gold Vault Staking Pool',
    timestamp: '2026-08-27 00:15',
    status: 'COMPLETED',
    hash: '0x8f2a...91c4'
  },
  {
    id: 'TX-8841',
    type: 'DEPOSIT',
    amount: 5000.00,
    token: '$OD-GOLD',
    recipientOrSender: 'Physical 24K Mint NFC Vault Node',
    timestamp: '2026-08-26 18:40',
    status: 'COMPLETED',
    hash: '0x3b1c...7a92'
  },
  {
    id: 'TX-7719',
    type: 'ESCROW_RELEASE',
    amount: 2300.00,
    token: '$OD',
    recipientOrSender: 'Chittagong Berth #3 Customs Clearance',
    timestamp: '2026-08-26 12:10',
    status: 'COMPLETED',
    hash: '0x1d4e...88f0'
  }
];

export const OceanDollarWalletsView: React.FC = () => {
  const [odBalance, setOdBalance] = useState<number>(24850.75);
  const [goldOdBalance, setGoldOdBalance] = useState<number>(12500.00);
  const [escrowLocked, setEscrowLocked] = useState<number>(4200.00);
  const [coldVaultBalance, setColdVaultBalance] = useState<number>(50000.00);

  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<'TRANSFER' | 'DEPOSIT' | 'RECEIVE' | null>(null);

  // Transfer Form State
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [transferRecipient, setTransferRecipient] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<'$OD' | '$OD-GOLD'>('$OD');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const walletAddress = '0xOD7789A92b414CF09a823E1189bc441';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedAddress(true);
    hapticEngine.trigger('click');
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmt = parseFloat(transferAmount);
    if (isNaN(numAmt) || numAmt <= 0) return;

    if (selectedToken === '$OD' && numAmt > odBalance) {
      showToast('Error: Insufficient $OD liquid balance!');
      return;
    }

    setIsProcessing(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      if (selectedToken === '$OD') {
        setOdBalance((prev) => prev - numAmt);
      } else {
        setGoldOdBalance((prev) => prev - numAmt);
      }

      const newTx: WalletTransaction = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'WITHDRAWAL',
        amount: numAmt,
        token: selectedToken,
        recipientOrSender: transferRecipient || 'External Sovereign Wallet',
        timestamp: 'Just now',
        status: 'COMPLETED',
        hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
      };

      setTransactions([newTx, ...transactions]);
      setIsProcessing(false);
      setActiveModal(null);
      setTransferAmount('');
      setTransferRecipient('');
      hapticEngine.trigger('success');
      showToast(`Successfully transferred ${numAmt} ${selectedToken}`);
    }, 1200);
  };

  const totalPortfolioUSD = odBalance + goldOdBalance + escrowLocked + coldVaultBalance;

  return (
    <div id="ocean-dollar-wallets-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
            <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              SOVEREIGN OCEAN DOLLAR ($OD) MULTI-WALLET ENGINE
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <Wallet className="w-8 h-8 text-yellow-400" />
            <span>Ocean Dollar Sovereign Wallets</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Manage your physical 24K gold-backed Ocean Dollars ($OD-GOLD), liquid tokens ($OD), escrow trade balances, and FIPS 140-2 cold storage vaults.
          </p>
        </div>

        {/* Public Wallet Key & Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleCopyAddress}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all"
          >
            <span className="text-slate-500 text-[10px]">ADDR:</span>
            <span>{walletAddress.substring(0, 10)}...{walletAddress.substring(walletAddress.length - 4)}</span>
            {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={() => setActiveModal('TRANSFER')}
            className="bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-black px-4 py-2 rounded-2xl text-xs uppercase shadow-lg hover:brightness-110 transition-all flex items-center space-x-1.5"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Send $OD</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-yellow-950 border border-yellow-500/50 text-yellow-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce relative z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-yellow-400">✕</button>
        </div>
      )}

      {/* Main Total Portfolio Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-2 border-yellow-500/30 shadow-2xl space-y-4 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Total Net Worth Portfolio ($OD)</span>
            <div className="text-4xl sm:text-5xl font-black text-white mt-1 flex items-baseline space-x-3">
              <span>${totalPortfolioUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              <span className="text-yellow-400 text-lg font-bold">100% GOLD BACKED</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1 font-sans">
            <div className="flex justify-between space-x-4">
              <span className="text-slate-400">1 $OD Peg:</span>
              <strong className="text-emerald-400 font-mono">$1.0000 USD</strong>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-slate-400">Gold Reserve backing:</span>
              <strong className="text-yellow-400 font-mono">0.024g 24K Gold / $OD</strong>
            </div>
          </div>
        </div>

        {/* Breakdown Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block flex items-center space-x-1">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              <span>Liquid $OD</span>
            </span>
            <span className="text-lg font-black text-white block">${odBalance.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-400 font-bold">Instant Transfers</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>$OD 24K Gold Coin</span>
            </span>
            <span className="text-lg font-black text-white block">${goldOdBalance.toLocaleString()}</span>
            <span className="text-[10px] text-yellow-400 font-bold">NFC Encrypted</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Escrow Trade</span>
            </span>
            <span className="text-lg font-black text-white block">${escrowLocked.toLocaleString()}</span>
            <span className="text-[10px] text-cyan-300 font-bold">Customs Clearance</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block flex items-center space-x-1">
              <HardDrive className="w-3.5 h-3.5 text-purple-400" />
              <span>Cold Vault Node</span>
            </span>
            <span className="text-lg font-black text-white block">${coldVaultBalance.toLocaleString()}</span>
            <span className="text-[10px] text-purple-300 font-bold">FIPS 140-2 Level 4</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Transactions & Wallet Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left: Quick Actions & Physical Coin Vault Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-yellow-400" />
              <span>Physical 24K Gold Coin Verification</span>
            </h3>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950 via-yellow-950 to-slate-950 border border-yellow-500/50 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-yellow-300">
                <span>SOVEREIGN MINT CARD</span>
                <span className="px-2 py-0.5 rounded bg-yellow-500/20 border border-yellow-500/40 text-[9px] font-black">NFC ACTIVE</span>
              </div>

              <div className="text-lg font-black text-white tracking-widest font-mono">
                OD-7740-9921-8840
              </div>

              <div className="flex justify-between items-end text-[11px] text-slate-300 pt-2 border-t border-yellow-500/20">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Coin Weight</span>
                  <span className="font-bold text-white">1.00 oz 24K Fine Gold</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Serial Hash</span>
                  <span className="font-bold text-yellow-400 font-mono">#MINT-88391</span>
                </div>
              </div>

              <AssetAuthenticityBadge
                assetId="MINT-88391"
                assetName="1.00 oz 24K Physical Gold Coin Specimen"
                variant="badge"
              />
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Scan your physical 24K Gold Ocean Dollar coin via device NFC reader to verify mintage authenticity and sync payload with cold storage reserves.
            </p>
          </div>
        </div>

        {/* Right: Recent Wallet Transaction Ledger */}
        <div className="lg:col-span-7 space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <History className="w-5 h-5 text-cyan-400" />
              <span>Transaction History Ledger</span>
            </h3>

            <span className="text-[10px] text-slate-400 font-bold uppercase">ECDSA Encrypted Log</span>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl ${
                    tx.type === 'DEPOSIT' || tx.type === 'STAKING_REWARD'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                  }`}>
                    {tx.type === 'DEPOSIT' || tx.type === 'STAKING_REWARD' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>

                  <div>
                    <strong className="text-white font-bold block">{tx.recipientOrSender}</strong>
                    <span className="text-[10px] text-slate-400">{tx.timestamp} • Hash: {tx.hash}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-sm font-black block ${
                    tx.type === 'DEPOSIT' || tx.type === 'STAKING_REWARD' ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    {tx.type === 'DEPOSIT' || tx.type === 'STAKING_REWARD' ? '+' : '-'}${tx.amount.toLocaleString()} {tx.token}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold uppercase">{tx.status} ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* LOTTERY WINNINGS BANKING PORTAL SECTION */}
      <LotteryWinningsBankingPortal
        oceanDollarBalance={odBalance}
        onBalanceChange={(newBal) => setOdBalance(newBal)}
        triggerToast={showToast}
      />

      {/* Transfer Modal Overlay */}
      {activeModal === 'TRANSFER' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-yellow-500 p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl font-mono text-xs animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center space-x-2">
                <Send className="w-5 h-5 text-yellow-400" />
                <span>Send Ocean Dollar ($OD)</span>
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Select Currency Token</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedToken('$OD')}
                    className={`p-3 rounded-2xl border font-bold text-center transition-all ${
                      selectedToken === '$OD' ? 'bg-yellow-500 text-slate-950 border-yellow-400 font-black' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    $OD Liquid
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedToken('$OD-GOLD')}
                    className={`p-3 rounded-2xl border font-bold text-center transition-all ${
                      selectedToken === '$OD-GOLD' ? 'bg-yellow-500 text-slate-950 border-yellow-400 font-black' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    $OD Gold Vault
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Recipient Wallet Address / DID</label>
                <input
                  type="text"
                  required
                  placeholder="0xOD..."
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Transfer Amount ({selectedToken})</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-base font-black focus:outline-none focus:border-yellow-500"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{isProcessing ? 'Processing Transaction...' : 'Confirm & Send Payload'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
