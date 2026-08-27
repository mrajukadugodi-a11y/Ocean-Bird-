import React, { useState } from 'react';
import {
  TrendingUp,
  Coins,
  ShieldCheck,
  Lock,
  Unlock,
  Sparkles,
  Award,
  ArrowUpRight,
  Clock,
  Zap,
  DollarSign,
  Layers,
  ChevronRight,
  RefreshCw,
  PlusCircle,
  CheckCircle2
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface StakingPool {
  id: string;
  name: string;
  durationDays: number;
  apyPercent: number;
  minDepositOd: number;
  totalStakedOd: number;
  backingRevenueSource: string;
  badge: string;
  color: string;
}

const STAKING_POOLS: StakingPool[] = [
  {
    id: 'pool-30d',
    name: 'Short-Term Port Clearance Pool',
    durationDays: 30,
    apyPercent: 8.5,
    minDepositOd: 100,
    totalStakedOd: 1420500,
    backingRevenueSource: 'Chittagong Container Crane Fees & Pilotage',
    badge: 'FLEXIBLE LOCK',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'pool-90d',
    name: 'Sovereign Demurrage & Freight Yield Pool',
    durationDays: 90,
    apyPercent: 14.2,
    minDepositOd: 500,
    totalStakedOd: 4890200,
    backingRevenueSource: 'Singapore & Dubai Vessel Demurrage Tariffs',
    badge: 'BALANCED YIELD',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'pool-365d',
    name: '24K Gold Reserve & Infrastructure Master Vault',
    durationDays: 365,
    apyPercent: 24.8,
    minDepositOd: 1000,
    totalStakedOd: 12850000,
    backingRevenueSource: 'Physical 24K Swiss Gold Assay & Port Power Line Rights',
    badge: 'MAX YIELD 24.8%',
    color: 'from-purple-500 to-emerald-500'
  }
];

export const OceanDollarStakingView: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState<StakingPool>(STAKING_POOLS[1]);
  const [depositAmount, setDepositAmount] = useState<number>(1000);
  const [activeTab, setActiveTab] = useState<'POOLS' | 'MY_STAKES' | 'CALCULATOR'>('POOLS');
  const [isStakingModalOpen, setIsStakingModalOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [myStakes, setMyStakes] = useState<
    { id: string; poolName: string; amountStaked: number; apy: number; daysLeft: number; earnedOd: number }[]
  >([
    {
      id: 'stk-8812',
      poolName: 'Sovereign Demurrage & Freight Yield Pool',
      amountStaked: 2500,
      apy: 14.2,
      daysLeft: 64,
      earnedOd: 62.15
    },
    {
      id: 'stk-9014',
      poolName: '24K Gold Reserve Master Vault',
      amountStaked: 5000,
      apy: 24.8,
      daysLeft: 290,
      earnedOd: 413.33
    }
  ]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleConfirmStake = () => {
    if (depositAmount < selectedPool.minDepositOd) {
      showToast(`Minimum deposit for ${selectedPool.name} is $${selectedPool.minDepositOd} $OD.`);
      return;
    }

    setIsProcessing(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      const newStake = {
        id: `stk-${Math.floor(1000 + Math.random() * 9000)}`,
        poolName: selectedPool.name,
        amountStaked: depositAmount,
        apy: selectedPool.apyPercent,
        daysLeft: selectedPool.durationDays,
        earnedOd: 0.0
      };

      setMyStakes([newStake, ...myStakes]);
      setIsProcessing(false);
      setIsStakingModalOpen(false);
      hapticEngine.trigger('success');
      showToast(`Successfully staked $${depositAmount.toLocaleString()} $OD into ${selectedPool.name}!`);
    }, 1200);
  };

  const estimatedYieldOd = (depositAmount * (selectedPool.apyPercent / 100) * (selectedPool.durationDays / 365));

  return (
    <div id="ocean-dollar-staking-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              SOVEREIGN YIELD ENGINE ($OD STAKING)
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-amber-400" />
            <span>Ocean Dollar Staking &amp; Gold Yield Vaults</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Stake $OD into gold-backed sovereign vaults. Earn up to 24.8% APY backed by port container tariffs, demurrage fees, and 24K bullion reserves.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {(['POOLS', 'MY_STAKES', 'CALCULATOR'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setActiveTab(t);
                hapticEngine.trigger('click');
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                activeTab === t
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {toastMsg && (
        <div className="bg-amber-950 border border-amber-500/50 text-amber-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce relative z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-amber-400">✕</button>
        </div>
      )}

      {/* Main Tab Views */}
      {activeTab === 'POOLS' && (
        <div className="space-y-6 relative z-10 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STAKING_POOLS.map((pool) => (
              <div
                key={pool.id}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      {pool.badge}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold">{pool.durationDays} DAYS LOCK</span>
                  </div>

                  <h3 className="text-base font-black text-white">{pool.name}</h3>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase block">Yield APY</span>
                    <span className="text-3xl font-black text-amber-400 block">{pool.apyPercent}%</span>
                  </div>

                  <div className="space-y-1 text-slate-400 text-[11px]">
                    <div className="flex justify-between">
                      <span>Min. Deposit:</span>
                      <strong className="text-white">${pool.minDepositOd} $OD</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Staked:</span>
                      <strong className="text-amber-300">${(pool.totalStakedOd / 1000000).toFixed(2)}M $OD</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[10px] text-slate-300">
                    <span className="text-amber-400 font-bold block mb-0.5">Yield Revenue Backing:</span>
                    {pool.backingRevenueSource}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPool(pool);
                    setIsStakingModalOpen(true);
                    hapticEngine.trigger('click');
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Stake $OD Now</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'MY_STAKES' && (
        <div className="space-y-4 relative z-10 font-mono text-xs">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <span>Active Staked Vault Positions</span>
          </h3>

          <div className="space-y-3">
            {myStakes.map((stake) => (
              <div
                key={stake.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 font-bold">{stake.id}</span>
                    <strong className="text-white text-sm">{stake.poolName}</strong>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
                    <span>Staked Amount: <strong className="text-amber-400">${stake.amountStaked.toLocaleString()} $OD</strong></span>
                    <span>APY: <strong className="text-emerald-400">{stake.apy}%</strong></span>
                    <span>Lock Remaining: <strong className="text-cyan-300">{stake.daysLeft} Days</strong></span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] uppercase block">Earned Yield</span>
                    <span className="text-emerald-400 font-black text-base">+${stake.earnedOd.toFixed(2)} $OD</span>
                  </div>
                  <button
                    onClick={() => {
                      showToast(`Claimed $${stake.earnedOd.toFixed(2)} $OD yield to Liquid Wallet!`);
                      hapticEngine.trigger('success');
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg transition-all"
                  >
                    Claim Yield
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'CALCULATOR' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 relative z-10 font-mono text-xs max-w-2xl mx-auto">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span>Yield &amp; Compound Interest Calculator</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-[10px] uppercase block mb-1">Select Staking Vault Pool</label>
              <select
                value={selectedPool.id}
                onChange={(e) => {
                  const found = STAKING_POOLS.find((p) => p.id === e.target.value);
                  if (found) setSelectedPool(found);
                }}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none"
              >
                {STAKING_POOLS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.durationDays} Days @ {p.apyPercent}% APY)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-[10px] uppercase block mb-1">Deposit Amount ($OD)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none"
              />
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Estimated Yield Profit:</span>
                <strong className="text-emerald-400 text-sm">+${estimatedYieldOd.toFixed(2)} $OD</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Value at Maturity:</span>
                <strong className="text-amber-400 text-base">${(depositAmount + estimatedYieldOd).toFixed(2)} $OD</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stake Modal */}
      {isStakingModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 max-w-md w-full space-y-5 font-mono text-xs shadow-2xl">
            <h3 className="text-lg font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <PlusCircle className="w-5 h-5 text-amber-400" />
              <span>Stake $OD into {selectedPool.name}</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-[10px] uppercase block mb-1">Deposit Amount ($OD)</label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-bold text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-slate-400 text-[11px]">
                <div className="flex justify-between">
                  <span>Lock Period:</span>
                  <strong className="text-white">{selectedPool.durationDays} Days</strong>
                </div>
                <div className="flex justify-between">
                  <span>APY Yield:</span>
                  <strong className="text-emerald-400">{selectedPool.apyPercent}%</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span>Est. Reward:</span>
                  <strong className="text-amber-300">+${estimatedYieldOd.toFixed(2)} $OD</strong>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setIsStakingModalOpen(false)}
                className="w-1/2 py-3 bg-slate-950 border border-slate-800 text-slate-400 font-bold rounded-2xl hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStake}
                disabled={isProcessing}
                className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-lg flex items-center justify-center space-x-2"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>{isProcessing ? 'Staking...' : 'Confirm Stake'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
