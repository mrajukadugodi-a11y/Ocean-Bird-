import React, { useState } from 'react';
import {
  Award,
  CreditCard,
  QrCode,
  CheckCircle2,
  Gift,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Download,
  Copy,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Store,
  DollarSign,
  Zap,
  Star,
  Check,
  Building2,
  Layers
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  maxPoints: number;
  multiplier: string;
  badgeColor: string;
  benefits: string[];
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'BRONZE SAILOR',
    minPoints: 0,
    maxPoints: 2500,
    multiplier: '1.0x',
    badgeColor: 'bg-amber-700/30 text-amber-300 border-amber-600/40',
    benefits: ['Standard 1x Points Earning Rate', 'Instant Tax-Free Digital Claims', 'Quarterly Port Newsletter']
  },
  {
    name: 'SILVER MARINER',
    minPoints: 2500,
    maxPoints: 10000,
    multiplier: '1.5x',
    badgeColor: 'bg-slate-400/20 text-slate-200 border-slate-400/40',
    benefits: ['1.5x Points Earning Multiplier', '5% Bonus Discount at Duty-Free', 'Free Coastal Ferry Shuttle Pass']
  },
  {
    name: 'GOLD ADMIRAL',
    minPoints: 10000,
    maxPoints: 25000,
    multiplier: '2.5x',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    benefits: ['2.5x Points Earning Multiplier', '1-Hour Free Executive Boardroom Pod/Mo', 'Priority Duty-Free Fast-Track Line']
  },
  {
    name: 'PLATINUM COMMODORE',
    minPoints: 25000,
    maxPoints: 100000,
    multiplier: '4.0x',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    benefits: ['4.0x Points Earning Multiplier', '24/7 VIP Port Lounge Access', 'Complimentary Sea-Trial Yacht Tickets', 'Personal Port Concierge']
  }
];

export interface LoyaltyVoucher {
  id: string;
  title: string;
  category: 'DUTY_FREE' | 'BOARDROOM_POD' | 'SEAFOOD_DINING' | 'VIP_LOUNGE';
  pointsCost: number;
  valueUSD: number;
  expiryDate: string;
  code: string;
  icon: string;
}

export interface LoyaltyPointTransaction {
  id: string;
  merchantName: string;
  type: 'EARNED' | 'REDEEMED';
  pointsChange: number;
  date: string;
  category: string;
  balanceAfter: number;
}

const REDEEMABLE_VOUCHERS: LoyaltyVoucher[] = [
  {
    id: 'VOUCH-01',
    title: '$25 Duty-Free Luxury Voucher',
    category: 'DUTY_FREE',
    pointsCost: 1000,
    valueUSD: 25,
    expiryDate: 'Valid for 90 Days',
    code: 'DF-REWARD-25USD-88X',
    icon: '🎁'
  },
  {
    id: 'VOUCH-02',
    title: '1-Hour Free Executive Boardroom Pod',
    category: 'BOARDROOM_POD',
    pointsCost: 1500,
    valueUSD: 45,
    expiryDate: 'Valid for 60 Days',
    code: 'POD-REWARD-1HR-VIP',
    icon: '💼'
  },
  {
    id: 'VOUCH-03',
    title: 'Free Sunset Seafood Grill Cocktail Pass',
    category: 'SEAFOOD_DINING',
    pointsCost: 800,
    valueUSD: 20,
    expiryDate: 'Valid for 30 Days',
    code: 'DINE-DRINK-PASS-90',
    icon: '🍹'
  },
  {
    id: 'VOUCH-04',
    title: 'Puducherry Promenade Crafts $15 Voucher',
    category: 'DUTY_FREE',
    pointsCost: 600,
    valueUSD: 15,
    expiryDate: 'Valid for 45 Days',
    code: 'PNY-CRAFT-15USD-QR',
    icon: '🏺'
  }
];

const INITIAL_POINT_TRANSACTIONS: LoyaltyPointTransaction[] = [
  {
    id: 'TX-901',
    merchantName: 'Royal Ocean Duty-Free Emporium',
    type: 'EARNED',
    pointsChange: 450,
    date: 'Aug 25, 2026',
    category: 'Luxury Duty-Free Purchase',
    balanceAfter: 14250
  },
  {
    id: 'TX-902',
    merchantName: 'Puducherry Promenade Duty-Free & Crafts Bazaar',
    type: 'EARNED',
    pointsChange: 320,
    date: 'Aug 24, 2026',
    category: 'Puducherry Heritage Craft Order',
    balanceAfter: 13800
  },
  {
    id: 'TX-903',
    merchantName: 'The Golden Anchor Sunset Seafood Grill',
    type: 'REDEEMED',
    pointsChange: -800,
    date: 'Aug 23, 2026',
    category: 'Cocktail Pass Voucher Redemption',
    balanceAfter: 13480
  },
  {
    id: 'TX-904',
    merchantName: 'Ocean Bird Co-Working Pod 12',
    type: 'EARNED',
    pointsChange: 220,
    date: 'Aug 22, 2026',
    category: 'Workspace Pod Reservation',
    balanceAfter: 14280
  }
];

const MERCHANT_REDEMPTION_OPTIONS = [
  { id: 'MCH-01', name: 'Royal Ocean Duty-Free Emporium', port: 'Mumbai / JNPT Port' },
  { id: 'MCH-02', name: 'Puducherry Promenade Duty-Free & Crafts Bazaar', port: 'Puducherry Port & Harbour' },
  { id: 'MCH-03', name: 'Singapore Marina Bay Cruise Duty-Free', port: 'Marina Bay Cruise Hub' },
  { id: 'MCH-04', name: 'The Golden Anchor Sunset Seafood Grill', port: 'Promenade Pier' }
];

interface PortLoyaltyPointsWalletProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const PortLoyaltyPointsWallet: React.FC<PortLoyaltyPointsWalletProps> = ({ triggerToast }) => {
  const [pointsBalance, setPointsBalance] = useState(14250);
  const [vouchers, setVouchers] = useState<LoyaltyVoucher[]>(REDEEMABLE_VOUCHERS);
  const [transactions, setTransactions] = useState<LoyaltyPointTransaction[]>(INITIAL_POINT_TRANSACTIONS);
  const [activeVoucherModal, setActiveVoucherModal] = useState<LoyaltyVoucher | null>(null);

  // Earn Animation Overlay State
  const [earnAnimationData, setEarnAnimationData] = useState<{ amount: number; message: string } | null>(null);

  // Merchant Redemption Form State
  const [selectedMerchant, setSelectedMerchant] = useState(MERCHANT_REDEMPTION_OPTIONS[1].name);
  const [billAmountUSD, setBillAmountUSD] = useState<number>(50);
  const [ptsToRedeem, setPtsToRedeem] = useState<number>(1000); // 1000 pts = $10 USD
  const [merchantCheckoutPass, setMerchantCheckoutPass] = useState<{ code: string; discountUSD: number; merchant: string } | null>(null);

  // Transaction History Filters
  const [historySearch, setHistorySearch] = useState('');
  const [historyTypeFilter, setHistoryTypeFilter] = useState<'ALL' | 'EARNED' | 'REDEEMED'>('ALL');

  // Tier Modal View
  const [showTierBenefitsModal, setShowTierBenefitsModal] = useState(false);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  // Determine current Tier based on points balance
  const currentTier =
    LOYALTY_TIERS.find((t) => pointsBalance >= t.minPoints && pointsBalance < t.maxPoints) ||
    LOYALTY_TIERS[LOYALTY_TIERS.length - 1];

  const nextTier = LOYALTY_TIERS.find((t) => t.minPoints > pointsBalance);
  const ptsNeededForNextTier = nextTier ? nextTier.minPoints - pointsBalance : 0;
  const tierProgressPercent = nextTier
    ? Math.min(100, Math.round(((pointsBalance - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100))
    : 100;

  // Trigger Earn Animation Helper
  const triggerEarnAnimation = (amount: number, message: string) => {
    setEarnAnimationData({ amount, message });
    setTimeout(() => {
      setEarnAnimationData(null);
    }, 2800);
  };

  const handleClaimDailyBonus = () => {
    const bonusPts = 250;
    const newBalance = pointsBalance + bonusPts;
    setPointsBalance(newBalance);

    const newTx: LoyaltyPointTransaction = {
      id: `TX-${Date.now()}`,
      merchantName: 'Maritime Rewards Daily Check-in',
      type: 'EARNED',
      pointsChange: bonusPts,
      date: 'Just Now',
      category: 'Daily Visitor Bonus',
      balanceAfter: newBalance
    };

    setTransactions([newTx, ...transactions]);
    hapticEngine.trigger('success');
    triggerEarnAnimation(bonusPts, 'DAILY LOGIN BONUS EARNED!');
    notify('Added +250 daily bonus loyalty points to wallet!', 'success', 'BONUS CLAIMED');
  };

  const handleRedeemVoucher = (v: LoyaltyVoucher) => {
    if (pointsBalance < v.pointsCost) {
      notify('Insufficient Maritime Loyalty Points balance!', 'warning', 'REDEEM FAILED');
      return;
    }

    const newBalance = pointsBalance - v.pointsCost;
    setPointsBalance(newBalance);
    setActiveVoucherModal(v);

    const newTx: LoyaltyPointTransaction = {
      id: `TX-${Date.now()}`,
      merchantName: v.title,
      type: 'REDEEMED',
      pointsChange: -v.pointsCost,
      date: 'Just Now',
      category: 'Voucher Pass Redemption',
      balanceAfter: newBalance
    };

    setTransactions([newTx, ...transactions]);
    hapticEngine.trigger('success');
    notify(`Successfully redeemed ${v.title}!`, 'success', 'VOUCHER REDEEMED');
  };

  const handleMerchantCheckoutRedeem = () => {
    if (ptsToRedeem <= 0) {
      notify('Please specify points to redeem!', 'warning', 'INVALID POINTS');
      return;
    }

    if (pointsBalance < ptsToRedeem) {
      notify(`Insufficient balance! You have ${pointsBalance} PTS available.`, 'warning', 'REDEEM FAILED');
      return;
    }

    const discountUSD = ptsToRedeem / 100; // 100 pts = $1 USD
    const newBalance = pointsBalance - ptsToRedeem;
    setPointsBalance(newBalance);

    const code = `MCH-REDEEM-${Math.floor(100000 + Math.random() * 900000)}`;
    setMerchantCheckoutPass({
      code,
      discountUSD,
      merchant: selectedMerchant
    });

    const newTx: LoyaltyPointTransaction = {
      id: `TX-${Date.now()}`,
      merchantName: selectedMerchant,
      type: 'REDEEMED',
      pointsChange: -ptsToRedeem,
      date: 'Just Now',
      category: 'Direct Merchant Checkout Discount',
      balanceAfter: newBalance
    };

    setTransactions([newTx, ...transactions]);
    hapticEngine.trigger('success');
    notify(`Redeemed ${ptsToRedeem} PTS for $${discountUSD} USD discount at ${selectedMerchant}`, 'success', 'MERCHANT DISCOUNT APPLIED');
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.merchantName.toLowerCase().includes(historySearch.toLowerCase()) ||
      tx.category.toLowerCase().includes(historySearch.toLowerCase());
    const matchesType = historyTypeFilter === 'ALL' || tx.type === historyTypeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 relative">
      {/* Earn Particle Animation Overlay */}
      {earnAnimationData && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
          <div className="bg-slate-900/90 backdrop-blur-md border-2 border-amber-400 p-6 rounded-3xl text-center space-y-2 shadow-2xl animate-bounce transform scale-105 transition-all">
            <div className="flex justify-center space-x-1">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
              <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
              <Star className="w-8 h-8 text-amber-400 animate-ping" />
            </div>
            <h3 className="text-xl font-black font-mono text-amber-300">{earnAnimationData.message}</h3>
            <span className="text-3xl font-black font-mono text-emerald-400 block">
              +{earnAnimationData.amount} PTS
            </span>
          </div>
        </div>
      )}

      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Port Maritime Loyalty, Tiers &amp; Duty-Free Wallet</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Earn Maritime Rewards points on duty-free shopping, Puducherry heritage crafts, co-working pods, and port dining.
            </p>
          </div>

          <button
            onClick={() => {
              setShowTierBenefitsModal(true);
              hapticEngine.trigger('click');
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 px-3.5 py-2 rounded-2xl border border-amber-500/40 text-xs font-mono transition-all hover:border-amber-400"
          >
            <span className={`px-2.5 py-0.5 rounded-xl font-black ${currentTier.badgeColor}`}>
              {currentTier.name}
            </span>
            <span className="text-amber-300 font-bold">{currentTier.multiplier} Points Multiplier</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Digital Wallet Pass Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-black tracking-widest block">
                MARITIME REWARDS ADMIRAL PASS
              </span>
              <h3 className="text-lg font-bold text-white">Captain Ananya Silva</h3>
              <span className="text-xs font-mono text-slate-400">PASS ID: CR-ADMIRAL-98214</span>
            </div>
            <QrCode className="w-12 h-12 text-cyan-400" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400 block">AVAILABLE POINTS BALANCE</span>
              <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                {pointsBalance.toLocaleString()} <span className="text-xs text-slate-300">PTS</span>
              </span>
            </div>

            <button
              onClick={handleClaimDailyBonus}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-mono shadow-lg transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Daily +250 Pts</span>
            </button>
          </div>

          {/* Tier Level Progress Bar */}
          <div className="space-y-1.5 pt-3 border-t border-slate-800">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 font-bold">Tier Level Progress ({currentTier.name})</span>
              {nextTier ? (
                <span className="text-cyan-400 font-bold">
                  {ptsNeededForNextTier.toLocaleString()} PTS to {nextTier.name}
                </span>
              ) : (
                <span className="text-amber-400 font-bold">MAXIMUM PLATINUM TIER REACHED</span>
              )}
            </div>

            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div
                style={{ width: `${tierProgressPercent}%` }}
                className="bg-gradient-to-r from-amber-500 via-yellow-400 to-cyan-400 h-full rounded-full transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Merchant Points Redemption Calculator */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2">
            <Store className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Merchant Checkout Points Redemption</h3>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Redeem points directly at duty-free store checkouts. (Conversion rate: 100 Points = $1.00 USD).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">SELECT MERCHANT STORE</label>
              <select
                value={selectedMerchant}
                onChange={(e) => setSelectedMerchant(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
              >
                {MERCHANT_REDEMPTION_OPTIONS.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.port})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">ENTER TOTAL BILL ($ USD)</label>
              <input
                type="number"
                value={billAmountUSD}
                onChange={(e) => setBillAmountUSD(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">POINTS TO REDEEM</label>
              <input
                type="number"
                step="100"
                value={ptsToRedeem}
                onChange={(e) => setPtsToRedeem(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="text-slate-400">Quick Redeem:</span>
              {[25, 50, 75, 100].map((percent) => {
                const calculatedPts = Math.min(pointsBalance, Math.round(((billAmountUSD * (percent / 100)) * 100)));
                return (
                  <button
                    key={percent}
                    onClick={() => {
                      setPtsToRedeem(calculatedPts);
                      hapticEngine.trigger('click');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-[10px]"
                  >
                    {percent}% (${(billAmountUSD * (percent / 100)).toFixed(0)})
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleMerchantCheckoutRedeem}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs font-mono shadow-lg transition-all"
            >
              Apply ${ptsToRedeem / 100} Discount at Checkout
            </button>
          </div>
        </div>

        {/* Redeemable Vouchers Section */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Gift className="w-4 h-4 text-cyan-400" />
            <span>Redeem Points for Port &amp; Duty-Free QR Vouchers</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vouchers.map((v) => (
              <div
                key={v.id}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{v.icon}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                      {v.pointsCost} PTS
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{v.title}</h4>
                  <p className="text-[11px] font-mono text-slate-400">{v.expiryDate}</p>
                </div>

                <button
                  onClick={() => handleRedeemVoucher(v)}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs font-mono shadow-lg transition-all"
                >
                  Redeem QR Pass
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Points Transaction History Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Points Activity &amp; Transaction History</span>
            </h3>

            {/* History Type Filter Tabs */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {(['ALL', 'EARNED', 'REDEEMED'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setHistoryTypeFilter(type);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    historyTypeFilter === type ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="Search transaction history..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2 font-mono text-xs">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <span className="text-white font-bold block">{tx.merchantName}</span>
                  <span className="text-[10px] text-slate-400">
                    {tx.category} • {tx.date}
                  </span>
                </div>

                <div className="text-right">
                  <span
                    className={`font-bold block ${
                      tx.type === 'EARNED' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {tx.type === 'EARNED' ? `+${tx.pointsChange}` : tx.pointsChange} PTS
                  </span>
                  <span className="text-[10px] text-slate-500">Bal: {tx.balanceAfter} PTS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Merchant Checkout Discount QR Pass Modal */}
      {merchantCheckoutPass && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-cyan-500/50 p-6 sm:p-8 max-w-sm w-full space-y-6 shadow-2xl text-center relative">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold block">MERCHANT CHECKOUT DISCOUNT QR</span>
              <h3 className="text-base font-bold text-white">{merchantCheckoutPass.merchant}</h3>
              <p className="text-xs font-mono text-emerald-400 font-bold">
                ${merchantCheckoutPass.discountUSD} USD Instant Discount Applied
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl">
              <QrCode className="w-40 h-40 text-slate-950 mx-auto" />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-400 font-bold">
              CODE: {merchantCheckoutPass.code}
            </div>

            <button
              onClick={() => setMerchantCheckoutPass(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold"
            >
              Done &amp; Close Pass
            </button>
          </div>
        </div>
      )}

      {/* Loyalty Tier Benefits Breakdown Modal */}
      {showTierBenefitsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-amber-500/50 p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Maritime Rewards Loyalty Tier Privileges</h3>
              </div>
              <button
                onClick={() => setShowTierBenefitsModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              {LOYALTY_TIERS.map((tier) => (
                <div key={tier.name} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-xl font-mono text-xs font-bold ${tier.badgeColor}`}>
                      {tier.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()} PTS ({tier.multiplier})
                    </span>
                  </div>

                  <ul className="space-y-1 pt-1">
                    {tier.benefits.map((b, i) => (
                      <li key={i} className="text-xs font-mono text-slate-300 flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowTierBenefitsModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold"
            >
              Close Tier Overview
            </button>
          </div>
        </div>
      )}

      {/* Voucher Modal */}
      {activeVoucherModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-amber-500/50 p-6 sm:p-8 max-w-sm w-full space-y-6 shadow-2xl text-center relative">
            <div className="space-y-2">
              <span className="text-4xl">{activeVoucherModal.icon}</span>
              <h3 className="text-base font-bold text-white">{activeVoucherModal.title}</h3>
              <p className="text-xs font-mono text-slate-400">Present QR at merchant turnstile or checkout</p>
            </div>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl">
              <QrCode className="w-40 h-40 text-slate-950 mx-auto" />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-400 font-bold">
              CODE: {activeVoucherModal.code}
            </div>

            <button
              onClick={() => setActiveVoucherModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold"
            >
              Close Voucher
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
