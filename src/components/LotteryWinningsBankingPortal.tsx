import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Trophy,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  Download,
  FileText,
  DollarSign,
  Globe,
  Lock,
  Edit3,
  Check,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronRight,
  Shield,
  Coins,
  Eye,
  EyeOff,
  Key
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface LotteryBankTransaction {
  id: string;
  type: 'WITHDRAWAL' | 'DEPOSIT';
  amountOD: number;
  amountFiat: number;
  currency: string;
  bankName: string;
  accountEnding: string;
  status: 'COMPLETED' | 'PROCESSING' | 'SETTLED';
  timestamp: string;
  txHash: string;
  memo: string;
}

const INITIAL_LOTTERY_BANK_TXS: LotteryBankTransaction[] = [
  {
    id: 'LBTX-8821',
    type: 'WITHDRAWAL',
    amountOD: 5000,
    amountFiat: 5000,
    currency: 'USD',
    bankName: 'HDFC International Maritime Branch',
    accountEnding: '9842',
    status: 'COMPLETED',
    timestamp: '2026-08-28 14:32 UTC',
    txHash: '0x8f2a9c12e841',
    memo: 'Mega Jackpot Prize Payout Payout'
  },
  {
    id: 'LBTX-8794',
    type: 'WITHDRAWAL',
    amountOD: 2500,
    amountFiat: 216250,
    currency: 'INR',
    bankName: 'State Bank of India - Maritime FX Node',
    accountEnding: '4109',
    status: 'SETTLED',
    timestamp: '2026-08-25 09:15 UTC',
    txHash: '0x3c91a084f722',
    memo: 'Seafarer Daily Raffle Winnings'
  },
  {
    id: 'LBTX-8630',
    type: 'DEPOSIT',
    amountOD: 1000,
    amountFiat: 1000,
    currency: 'USD',
    bankName: 'JPMorgan Chase Bank N.A.',
    accountEnding: '1182',
    status: 'COMPLETED',
    timestamp: '2026-08-20 18:40 UTC',
    txHash: '0x1d4e77b901a5',
    memo: 'Bank Deposit to $OD Lottery Wallet'
  }
];

export interface LinkedBankAccount {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  swiftOrIfsc: string;
  currency: string;
  payoutRail: 'SWIFT Wire Transfer' | 'ACH Direct Credit' | 'IMPS / UPI Settlement' | 'SEPA Instant Credit';
  country: string;
  isVerified: boolean;
}

interface LotteryWinningsBankingPortalProps {
  oceanDollarBalance?: number;
  onBalanceChange?: (newBalance: number) => void;
  lotteryWinningsBalance?: number;
  onLotteryWinningsChange?: (newWinnings: number) => void;
  triggerToast?: (msg: string) => void;
  className?: string;
}

export const LotteryWinningsBankingPortal: React.FC<LotteryWinningsBankingPortalProps> = ({
  oceanDollarBalance = 1250.0,
  onBalanceChange,
  lotteryWinningsBalance = 12450.0,
  onLotteryWinningsChange,
  triggerToast,
  className = ''
}) => {
  // Main Toggle: Withdrawal (Lottery -> Bank) vs Deposit (Bank -> Wallet)
  const [bankingMode, setBankingMode] = useState<'WITHDRAWAL' | 'DEPOSIT'>('WITHDRAWAL');

  // Internal Balances
  const [currentOdBalance, setCurrentOdBalance] = useState<number>(oceanDollarBalance);
  const [currentWinningsBalance, setCurrentWinningsBalance] = useState<number>(lotteryWinningsBalance);

  // Linked Bank Account Details
  const [linkedBank, setLinkedBank] = useState<LinkedBankAccount>({
    bankName: 'HDFC International Maritime Branch',
    accountHolder: 'Capt. Public Citizen',
    accountNumber: '**** **** **** 9842',
    swiftOrIfsc: 'HDFC0001928',
    currency: 'USD',
    payoutRail: 'SWIFT Wire Transfer',
    country: 'India / International Waters',
    isVerified: true
  });

  // Bank Account Edit Modal
  const [showEditBankModal, setShowEditBankModal] = useState<boolean>(false);
  const [editBankForm, setEditBankForm] = useState<LinkedBankAccount>(linkedBank);

  // Transfer Form State
  const [transferAmount, setTransferAmount] = useState<string>('500');
  const [transferMemo, setTransferMemo] = useState<string>('Lottery Prize Direct Bank Settlement');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Transaction History
  const [transactions, setTransactions] = useState<LotteryBankTransaction[]>(INITIAL_LOTTERY_BANK_TXS);
  const [historyFilter, setHistoryFilter] = useState<'ALL' | 'WITHDRAWAL' | 'DEPOSIT'>('ALL');

  // Receipt Modal State
  const [activeReceipt, setActiveReceipt] = useState<LotteryBankTransaction | null>(null);

  // Transfer Confirmation Modal & Security PIN State
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [securityPin, setSecurityPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [showPinDigits, setShowPinDigits] = useState<boolean>(false);

  const notify = (msg: string) => {
    if (triggerToast) triggerToast(msg);
  };

  const handleToggleMode = (mode: 'WITHDRAWAL' | 'DEPOSIT') => {
    hapticEngine.trigger('click');
    setBankingMode(mode);
    setTransferMemo(
      mode === 'WITHDRAWAL'
        ? 'Lottery Prize Direct Bank Settlement'
        : 'Bank Deposit to Ocean Dollar Lottery Wallet'
    );
  };

  // Quick Preset Handlers
  const handlePresetPercentage = (pct: number) => {
    hapticEngine.trigger('click');
    const sourcePool = bankingMode === 'WITHDRAWAL' ? currentWinningsBalance : 5000;
    const calc = (sourcePool * (pct / 100)).toFixed(2);
    setTransferAmount(calc);
  };

  // Initiate Transfer Action -> Opens Security Confirmation Dialog
  const handleInitiateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);

    if (isNaN(amount) || amount <= 0) {
      notify('Please enter a valid transfer amount.');
      return;
    }

    if (bankingMode === 'WITHDRAWAL') {
      if (amount > currentWinningsBalance + currentOdBalance) {
        notify('Error: Transfer amount exceeds available lottery winnings & wallet balance!');
        return;
      }
    }

    hapticEngine.trigger('click');
    setSecurityPin('');
    setPinError(null);
    setShowConfirmModal(true);
  };

  // Authorize Transfer Action after Security PIN Verification
  const handleAuthorizeTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);

    if (securityPin.trim().length !== 4) {
      setPinError('Security PIN must be exactly 4 digits.');
      hapticEngine.trigger('alert');
      return;
    }

    // Default demo PIN check (supports 1234 or any 4 digit numeric PIN with 1234 hint)
    if (!/^\d{4}$/.test(securityPin)) {
      setPinError('Security PIN must contain only numbers.');
      hapticEngine.trigger('alert');
      return;
    }

    setPinError(null);
    setShowConfirmModal(false);
    setIsProcessing(true);
    hapticEngine.trigger('medium');

    setTimeout(() => {
      let newWinnings = currentWinningsBalance;
      let newWallet = currentOdBalance;

      if (bankingMode === 'WITHDRAWAL') {
        if (amount <= currentWinningsBalance) {
          newWinnings -= amount;
        } else {
          const remainder = amount - currentWinningsBalance;
          newWinnings = 0;
          newWallet -= remainder;
        }
      } else {
        // DEPOSIT
        newWallet += amount;
      }

      setCurrentWinningsBalance(newWinnings);
      setCurrentOdBalance(newWallet);
      if (onBalanceChange) onBalanceChange(newWallet);
      if (onLotteryWinningsChange) onLotteryWinningsChange(newWinnings);

      const exchangeRate = linkedBank.currency === 'INR' ? 86.5 : linkedBank.currency === 'EUR' ? 0.92 : 1.0;
      const fiatVal = amount * exchangeRate;

      const newTx: LotteryBankTransaction = {
        id: `LBTX-${Math.floor(1000 + Math.random() * 9000)}`,
        type: bankingMode,
        amountOD: amount,
        amountFiat: fiatVal,
        currency: linkedBank.currency,
        bankName: linkedBank.bankName,
        accountEnding: linkedBank.accountNumber.slice(-4),
        status: 'COMPLETED',
        timestamp: new Date().toISOString().substring(0, 16).replace('T', ' ') + ' UTC',
        txHash: `0x${Math.random().toString(16).substring(2, 14)}`,
        memo: transferMemo || (bankingMode === 'WITHDRAWAL' ? 'Lottery Payout to Bank' : 'Bank Deposit to $OD')
      };

      setTransactions([newTx, ...transactions]);
      setIsProcessing(false);
      setActiveReceipt(newTx);
      setSecurityPin('');
      hapticEngine.trigger('success');

      if (bankingMode === 'WITHDRAWAL') {
        notify(
          `Successfully initiated withdrawal of ${amount.toLocaleString()} $OD ($${fiatVal.toLocaleString()} ${linkedBank.currency}) to ${linkedBank.bankName}!`
        );
      } else {
        notify(
          `Successfully deposited $${fiatVal.toLocaleString()} ${linkedBank.currency} (${amount.toLocaleString()} $OD) into your lottery wallet!`
        );
      }
    }, 1200);
  };

  // Save Linked Bank Form
  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setLinkedBank(editBankForm);
    setShowEditBankModal(false);
    hapticEngine.trigger('success');
    notify(`Linked bank account updated to ${editBankForm.bankName}!`);
  };

  const filteredTxs = transactions.filter((tx) => {
    if (historyFilter === 'WITHDRAWAL') return tx.type === 'WITHDRAWAL';
    if (historyFilter === 'DEPOSIT') return tx.type === 'DEPOSIT';
    return true;
  });

  return (
    <div className={`bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-white relative overflow-hidden ${className}`}>
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Portal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>LOTTERY WINNINGS BANKING PORTAL</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>TAX-EXEMPT MARITIME WIRE</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-center space-x-2 font-sans">
            <Building2 className="w-7 h-7 text-cyan-400" />
            <span>Bank Direct Settlement &amp; Wallet Transfer</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Move accrued lottery prizes, daily raffle payouts, and gaming winnings directly between your Ocean Dollar ($OD) wallets and linked global bank accounts.
          </p>
        </div>

        {/* Linked Bank Card Quick Info */}
        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between space-x-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">PRIMARY LINKED BANK</span>
              <strong className="text-xs text-white block font-sans font-bold">{linkedBank.bankName}</strong>
              <span className="text-[10px] text-slate-400 block font-mono">
                {linkedBank.accountNumber} • {linkedBank.swiftOrIfsc}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setEditBankForm(linkedBank);
              setShowEditBankModal(true);
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-bold transition-all flex items-center space-x-1"
            title="Edit Linked Bank Details"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit Link</span>
          </button>
        </div>
      </div>

      {/* Main Balances Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-15 text-amber-400">
            <Trophy className="w-12 h-12" />
          </div>
          <span className="text-amber-400/90 text-xs font-bold block uppercase tracking-wider">
            AVAILABLE LOTTERY WINNINGS POOL
          </span>
          <span className="text-2xl sm:text-3xl font-black text-amber-400 block font-mono">
            {currentWinningsBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} $OD
          </span>
          <span className="text-[11px] text-slate-400 block font-sans">
            ≈ ${(currentWinningsBalance * 1.0).toLocaleString()} USD • Ready for Instant Bank Withdrawal
          </span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">
            LIQUID OCEAN DOLLAR WALLET ($OD)
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 block font-mono">
            {currentOdBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} $OD
          </span>
          <span className="text-[11px] text-slate-400 block font-sans">
            Primary Gaming &amp; Lottery Ticket Purchasing Wallet
          </span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">
            TAX IMMUNITY GUARANTEE
          </span>
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-base mt-1 font-sans">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>100% Tax-Free High Seas Payout</span>
          </div>
          <span className="text-[11px] text-slate-400 block font-sans">
            Under UNCTAD &amp; IMO Maritime Sovereign Currency Charter
          </span>
        </div>
      </div>

      {/* SECTION: WITHDRAWAL / DEPOSIT TOGGLE CONTROLLER & FORM */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative z-10">
        {/* SEGMENTED TOGGLE SWITCH */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-black text-white font-sans flex items-center justify-center sm:justify-start space-x-2">
              <span>Select Banking Transaction Type</span>
            </h3>
            <p className="text-slate-400 text-xs font-sans">
              Toggle between withdrawing lottery prize funds to your bank or depositing funds into your $OD lottery wallet.
            </p>
          </div>

          {/* THE SPECIFIC WITHDRAWAL/DEPOSIT TOGGLE BUTTON */}
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleToggleMode('WITHDRAWAL')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black font-mono transition-all flex items-center justify-center space-x-2 border ${
                bankingMode === 'WITHDRAWAL'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>WITHDRAWAL (Winnings → Bank)</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggleMode('DEPOSIT')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black font-mono transition-all flex items-center justify-center space-x-2 border ${
                bankingMode === 'DEPOSIT'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>DEPOSIT (Bank → $OD Wallet)</span>
            </button>
          </div>
        </div>

        {/* DYNAMIC FORM ACCORDING TO TOGGLE MODE */}
        <form onSubmit={handleInitiateTransfer} className="space-y-6">
          {/* DIRECTIONAL INDICATOR CARD */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans ${
            bankingMode === 'WITHDRAWAL'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${bankingMode === 'WITHDRAWAL' ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                {bankingMode === 'WITHDRAWAL' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownLeft className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {bankingMode === 'WITHDRAWAL' ? 'OUTBOUND BANK PAYOUT DIRECTION' : 'INBOUND WALLET TOP-UP DIRECTION'}
                </span>
                <strong className="text-base text-white block font-bold">
                  {bankingMode === 'WITHDRAWAL'
                    ? `Ocean Dollar Winnings Pool → ${linkedBank.bankName}`
                    : `${linkedBank.bankName} → Ocean Dollar Wallet ($OD)`}
                </strong>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Target Account: {linkedBank.accountHolder} ({linkedBank.accountNumber}) via {linkedBank.payoutRail}
                </span>
              </div>
            </div>

            <div className="text-right font-mono shrink-0">
              <span className="text-[10px] text-slate-400 block">SETTLEMENT SPEED</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                INSTANT (30-60 SECS)
              </span>
            </div>
          </div>

          {/* INPUT FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Amount & Quick Presets (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 text-xs font-bold font-sans">
                    TRANSFER AMOUNT ({bankingMode === 'WITHDRAWAL' ? '$OD Winnings' : linkedBank.currency})
                  </label>
                  <span className="text-slate-400 text-xs font-mono">
                    Max Available: {bankingMode === 'WITHDRAWAL' ? `${(currentWinningsBalance + currentOdBalance).toLocaleString()} $OD` : '$50,000.00 USD'}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="Enter amount..."
                    className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 text-xl font-bold font-mono text-amber-400 focus:outline-none focus:border-cyan-400 pl-12"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg font-mono">
                    $OD
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePresetPercentage(100)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-xl transition-all font-mono"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* QUICK PRESET PERCENTAGE BUTTONS */}
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400 font-sans font-bold">Quick Presets:</span>
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handlePresetPercentage(pct)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-mono font-bold transition-all"
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              {/* MEMO / PURPOSE FIELD */}
              <div className="space-y-1.5 pt-2">
                <label className="text-slate-300 text-xs font-bold font-sans">BANK STATEMENT MEMO / PURPOSE</label>
                <input
                  type="text"
                  value={transferMemo}
                  onChange={(e) => setTransferMemo(e.target.value)}
                  placeholder="Memo for bank records..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>
            </div>

            {/* Right Column: Fee & FX Summary Breakdown (5 cols) */}
            <div className="md:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 font-sans text-xs">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
                SETTLEMENT BREAKDOWN &amp; FX
              </h4>

              <div className="space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Gross Transfer Base:</span>
                  <span className="font-mono font-bold text-white">{parseFloat(transferAmount || '0').toLocaleString()} $OD</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Bank Currency Conversion:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    1 $OD = {linkedBank.currency === 'INR' ? '₹86.50 INR' : linkedBank.currency === 'EUR' ? '€0.92 EUR' : '$1.00 USD'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Sovereign Maritime Wire Fee:</span>
                  <span className="font-mono font-bold text-emerald-400">0.00 $OD (100% Free)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Tax Withholding (High Seas):</span>
                  <span className="font-mono font-bold text-emerald-400">0.00% (Exempt)</span>
                </div>

                <div className="border-t border-slate-800 pt-2 flex items-center justify-between font-bold text-sm">
                  <span className="text-white">Est. Net Bank Credit:</span>
                  <span className="font-mono text-amber-400 text-base">
                    {linkedBank.currency === 'INR'
                      ? `₹${(parseFloat(transferAmount || '0') * 86.5).toLocaleString()}`
                      : linkedBank.currency === 'EUR'
                      ? `€${(parseFloat(transferAmount || '0') * 0.92).toLocaleString()}`
                      : `$${(parseFloat(transferAmount || '0') * 1.0).toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* SECURITY NOTE */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2 text-[10px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Encrypted via ISO 20022 Financial Messaging &amp; High Seas SatCom Mesh.</span>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-2xl font-mono font-black text-sm sm:text-base transition-all shadow-2xl flex items-center justify-center space-x-3 ${
                bankingMode === 'WITHDRAWAL'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
                  : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-cyan-500/20'
              } disabled:opacity-50`}
            >
              <RefreshCw className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>
                {isProcessing
                  ? 'COMMUNICATING WITH BANKING NETWORK...'
                  : bankingMode === 'WITHDRAWAL'
                  ? `EXECUTE BANK WITHDRAWAL TO ${linkedBank.bankName.toUpperCase()}`
                  : `EXECUTE DIRECT BANK DEPOSIT INTO $OD LOTTERY WALLET`}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* RECENT LOTTERY BANKING TRANSACTIONS LEDGER */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-black text-white uppercase font-sans">
              Lottery Banking &amp; Settlement History
            </h3>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['ALL', 'WITHDRAWAL', 'DEPOSIT'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setHistoryFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  historyFilter === filter
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* TRANSACTION LIST TABLE */}
        <div className="space-y-2 font-mono text-xs">
          {filteredTxs.length === 0 ? (
            <div className="text-center py-8 text-slate-500 font-sans">
              No lottery banking transactions recorded under this filter.
            </div>
          ) : (
            filteredTxs.map((tx) => (
              <div
                key={tx.id}
                className="p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                      tx.type === 'WITHDRAWAL'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}
                  >
                    {tx.type === 'WITHDRAWAL' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <strong className="text-white font-sans text-sm font-bold">{tx.memo}</strong>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          tx.type === 'WITHDRAWAL'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400 block font-sans mt-0.5">
                      Target Bank: {tx.bankName} (Ending {tx.accountEnding}) • {tx.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 border-slate-900 pt-2 sm:pt-0">
                  <div className="text-right">
                    <strong
                      className={`text-sm block font-bold ${
                        tx.type === 'WITHDRAWAL' ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {tx.type === 'WITHDRAWAL' ? '-' : '+'}{tx.amountOD.toLocaleString()} $OD
                    </strong>
                    <span className="text-[10px] text-slate-400 block">
                      ≈ ${tx.amountFiat.toLocaleString()} {tx.currency}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveReceipt(tx)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL 1: EDIT LINKED BANK ACCOUNT */}
      {showEditBankModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 font-mono shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-black text-white font-sans">Update Linked Bank Details</h3>
              </div>
              <button
                onClick={() => setShowEditBankModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBankDetails} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">BANK NAME</label>
                <input
                  type="text"
                  required
                  value={editBankForm.bankName}
                  onChange={(e) => setEditBankForm({ ...editBankForm, bankName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">ACCOUNT HOLDER</label>
                  <input
                    type="text"
                    required
                    value={editBankForm.accountHolder}
                    onChange={(e) => setEditBankForm({ ...editBankForm, accountHolder: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">ACCOUNT NUMBER</label>
                  <input
                    type="text"
                    required
                    value={editBankForm.accountNumber}
                    onChange={(e) => setEditBankForm({ ...editBankForm, accountNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">SWIFT / BIC / IFSC</label>
                  <input
                    type="text"
                    required
                    value={editBankForm.swiftOrIfsc}
                    onChange={(e) => setEditBankForm({ ...editBankForm, swiftOrIfsc: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">PAYOUT CURRENCY</label>
                  <select
                    value={editBankForm.currency}
                    onChange={(e) => setEditBankForm({ ...editBankForm, currency: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-amber-400 font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">SETTLEMENT NETWORK</label>
                <select
                  value={editBankForm.payoutRail}
                  onChange={(e) => setEditBankForm({ ...editBankForm, payoutRail: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                >
                  <option value="SWIFT Wire Transfer">SWIFT International Wire Transfer</option>
                  <option value="ACH Direct Credit">ACH Direct Bank Credit (US)</option>
                  <option value="IMPS / UPI Settlement">IMPS / UPI Instant Bank Clearing (India)</option>
                  <option value="SEPA Instant Credit">SEPA Instant SEPA Bank Transfer (EU)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-xl font-mono mt-2"
              >
                Save Linked Bank Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: TRANSACTION RECEIPT */}
      {activeReceipt && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 font-mono shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-black text-white font-sans">Bank Settlement Receipt</h3>
              </div>
              <button
                onClick={() => setActiveReceipt(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-center">
                <span className="text-slate-400 text-[10px] block uppercase">TRANSACTION VALUE</span>
                <strong className="text-2xl font-black text-emerald-400 block">
                  {activeReceipt.type === 'WITHDRAWAL' ? '-' : '+'}{activeReceipt.amountOD.toLocaleString()} $OD
                </strong>
                <span className="text-xs text-slate-300 block font-sans">
                  ≈ ${activeReceipt.amountFiat.toLocaleString()} {activeReceipt.currency}
                </span>
              </div>

              <div className="space-y-2 text-slate-300 font-sans">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Transaction Ref:</span>
                  <span className="font-mono text-cyan-300 font-bold">{activeReceipt.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Transaction Type:</span>
                  <span className="font-mono text-white font-bold">{activeReceipt.type}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Target Bank:</span>
                  <span className="font-bold text-white">{activeReceipt.bankName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Account Ending:</span>
                  <span className="font-mono text-slate-200">**** {activeReceipt.accountEnding}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">SatCom Hash:</span>
                  <span className="font-mono text-xs text-amber-400">{activeReceipt.txHash}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-mono text-emerald-400 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{activeReceipt.status}</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  alert(`Downloaded Official Banking Receipt PDF for Transaction #${activeReceipt.id}!`);
                }}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Receipt (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TRANSFER CONFIRMATION & SECURITY PIN DIALOG */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 font-mono shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl ${bankingMode === 'WITHDRAWAL' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-sans flex items-center space-x-2">
                    <span>Confirm Transfer Intent</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Verify transfer summary and enter your 4-digit security PIN to authorize.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  hapticEngine.trigger('click');
                  setShowConfirmModal(false);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Transaction Summary Card */}
            <div className="space-y-4 font-sans">
              <div className={`p-4 rounded-2xl border ${
                bankingMode === 'WITHDRAWAL'
                  ? 'bg-gradient-to-br from-amber-500/10 via-slate-950 to-amber-500/5 border-amber-500/30 text-amber-300'
                  : 'bg-gradient-to-br from-cyan-500/10 via-slate-950 to-cyan-500/5 border-cyan-500/30 text-cyan-300'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                    {bankingMode === 'WITHDRAWAL' ? 'OUTBOUND WITHDRAWAL SUMMARY' : 'INBOUND DEPOSIT SUMMARY'}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    100% Tax Exempt
                  </span>
                </div>

                <div className="flex items-baseline space-x-2 my-1">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {parseFloat(transferAmount || '0').toLocaleString()} $OD
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    ≈ ${((parseFloat(transferAmount || '0')) * (linkedBank.currency === 'INR' ? 86.5 : linkedBank.currency === 'EUR' ? 0.92 : 1.0)).toLocaleString()} {linkedBank.currency}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 pt-3 border-t border-slate-800/80 mt-3 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Source Account:</span>
                    <span className="font-bold text-white">
                      {bankingMode === 'WITHDRAWAL' ? 'Lottery Winnings Pool' : linkedBank.bankName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Destination Account:</span>
                    <span className="font-bold text-white">
                      {bankingMode === 'WITHDRAWAL'
                        ? `${linkedBank.bankName} (**** ${linkedBank.accountNumber.slice(-4)})`
                        : 'Liquid Ocean Dollar Wallet ($OD)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Settlement Rail:</span>
                    <span className="text-cyan-300 font-bold">{linkedBank.payoutRail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Bank Statement Memo:</span>
                    <span className="text-amber-300 font-sans italic">{transferMemo || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">SatCom Transfer Fee:</span>
                    <span className="text-emerald-400 font-bold">0.00 $OD (Free)</span>
                  </div>
                </div>
              </div>

              {/* Security PIN Authorization Section */}
              <form onSubmit={handleAuthorizeTransfer} className="space-y-4 pt-1 font-sans">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                      <Key className="w-3.5 h-3.5 text-amber-400" />
                      <span>Security PIN Input</span>
                    </label>

                    {/* Demo PIN quick hint helper */}
                    <button
                      type="button"
                      onClick={() => {
                        setSecurityPin('1234');
                        setPinError(null);
                        hapticEngine.trigger('click');
                      }}
                      className="text-[10px] bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-500/40 font-mono font-bold transition-all flex items-center space-x-1"
                      title="Click to auto-fill default demo PIN"
                    >
                      <span>Auto-fill Demo PIN (1234)</span>
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPinDigits ? 'text' : 'password'}
                      maxLength={4}
                      value={securityPin}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setSecurityPin(val);
                        if (pinError) setPinError(null);
                      }}
                      placeholder="••••"
                      autoFocus
                      className="w-full bg-slate-950 border-2 border-slate-800 focus:border-cyan-400 rounded-2xl py-3 px-4 text-center text-2xl font-mono font-black tracking-[0.5em] text-cyan-300 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPinDigits(!showPinDigits)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      title={showPinDigits ? 'Hide PIN' : 'Show PIN'}
                    >
                      {showPinDigits ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* 4 Digit Visual Pips */}
                  <div className="flex justify-center space-x-3 pt-1">
                    {[0, 1, 2, 3].map((idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full border transition-all ${
                          securityPin.length > idx
                            ? 'bg-cyan-400 border-cyan-300 shadow-md shadow-cyan-500/50 scale-110'
                            : 'bg-slate-900 border-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {pinError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center space-x-2 text-rose-300 text-xs font-mono animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{pinError}</span>
                    </div>
                  )}
                </div>

                {/* Dialog Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      hapticEngine.trigger('click');
                      setShowConfirmModal(false);
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700 font-mono"
                  >
                    Cancel / Edit
                  </button>

                  <button
                    type="submit"
                    disabled={securityPin.length !== 4}
                    className={`py-3 px-4 rounded-xl text-xs font-black font-mono transition-all flex items-center justify-center space-x-2 shadow-lg ${
                      bankingMode === 'WITHDRAWAL'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-500/20'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-cyan-500/20'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize Transfer</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
