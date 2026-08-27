import React, { useState } from 'react';
import {
  TrendingUp,
  Percent,
  DollarSign,
  Calculator,
  Lock,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowUpRight,
  Flame,
  Award,
  RefreshCw,
  Coins
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { hapticEngine } from '../utils/hapticUtils';

export interface StakingPool {
  id: string;
  name: string;
  lockPeriodDays: number;
  apyPercent: number;
  totalStakedOd: number;
  minDeposit: number;
  badge: string;
  color: string;
  description: string;
}

const STAKING_POOLS: StakingPool[] = [
  {
    id: 'pool-30d',
    name: '30-Day Liquidity Ocean Pool',
    lockPeriodDays: 30,
    apyPercent: 8.5,
    totalStakedOd: 1250000,
    minDeposit: 100,
    badge: 'FLEXIBLE LIQUIDITY',
    color: 'border-cyan-500 text-cyan-300 bg-cyan-950',
    description: 'Ideal for short-term port operational funds with monthly compounding payout.'
  },
  {
    id: 'pool-90d',
    name: '90-Day Sovereign Gold Reserve Pool',
    lockPeriodDays: 90,
    apyPercent: 14.2,
    totalStakedOd: 3840000,
    minDeposit: 500,
    badge: 'PHYSICAL GOLD BACKED',
    color: 'border-amber-500 text-amber-300 bg-amber-950',
    description: 'Backed by physical 24K gold bullion vaults with quarterly yield distribution.'
  },
  {
    id: 'pool-365d',
    name: '365-Day Master Mariner Vault Lockup',
    lockPeriodDays: 365,
    apyPercent: 24.8,
    totalStakedOd: 8900000,
    minDeposit: 1000,
    badge: 'MAXIMUM YIELD VAULT',
    color: 'border-yellow-500 text-yellow-300 bg-yellow-950',
    description: 'High-yield sovereign cold vault lockup for institutional shipowners & fleets.'
  }
];

export const StakingRoiChartsView: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState<StakingPool>(STAKING_POOLS[1]);
  const [stakeAmount, setStakeAmount] = useState<number>(5000);
  const [compoundingFreq, setCompoundingFreq] = useState<'MONTHLY' | 'DAILY'>('MONTHLY');
  const [userStakedPositions, setUserStakedPositions] = useState([
    {
      id: 'POS-901',
      poolName: '90-Day Sovereign Gold Reserve Pool',
      amountStaked: 5000,
      apy: 14.2,
      earnedRewards: 177.50,
      daysRemaining: 42,
      status: 'ACTIVE'
    }
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Generate ROI Growth Curve Data
  const generateChartData = () => {
    const data = [];
    const monthlyRate = selectedPool.apyPercent / 12 / 100;
    const monthsTotal = Math.max(Math.ceil(selectedPool.lockPeriodDays / 30), 12);

    let currentBalance = stakeAmount;
    for (let m = 0; m <= monthsTotal; m++) {
      const interestEarned = currentBalance - stakeAmount;
      data.push({
        month: `Month ${m}`,
        totalValue: Math.round(currentBalance),
        interest: Math.round(interestEarned),
        initialPrincipal: stakeAmount
      });
      currentBalance += currentBalance * monthlyRate;
    }
    return data;
  };

  const chartData = generateChartData();
  const projectedProfit = chartData[chartData.length - 1].interest;
  const projectedTotal = chartData[chartData.length - 1].totalValue;

  const handleStakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stakeAmount < selectedPool.minDeposit) {
      showToast(`Minimum stake for ${selectedPool.name} is ${selectedPool.minDeposit} $OD`);
      return;
    }

    const newPos = {
      id: `POS-${Math.floor(100 + Math.random() * 900)}`,
      poolName: selectedPool.name,
      amountStaked: stakeAmount,
      apy: selectedPool.apyPercent,
      earnedRewards: 0,
      daysRemaining: selectedPool.lockPeriodDays,
      status: 'ACTIVE'
    };

    setUserStakedPositions([newPos, ...userStakedPositions]);
    hapticEngine.trigger('success');
    showToast(`Successfully staked ${stakeAmount} $OD in ${selectedPool.name}!`);
  };

  return (
    <div id="staking-roi-charts-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              OCEAN DOLLAR ($OD) STAKING &amp; ROI YIELD VISUALIZER
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-amber-400" />
            <span>Staking ROI Charts &amp; Pool Calculator</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Calculate projected returns across sovereign physical gold-backed pools, track compound interest curves, and stake liquid Ocean Dollars ($OD).
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-amber-950 border border-amber-500/50 text-amber-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce relative z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-amber-400">✕</button>
        </div>
      )}

      {/* Pool Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {STAKING_POOLS.map((pool) => {
          const isSelected = selectedPool.id === pool.id;
          return (
            <div
              key={pool.id}
              onClick={() => {
                setSelectedPool(pool);
                hapticEngine.trigger('click');
              }}
              className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 ${
                isSelected
                  ? `${pool.color} ring-2 ring-amber-400 shadow-2xl`
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border border-current">
                  {pool.badge}
                </span>
                <span className="text-2xl font-black text-white">{pool.apyPercent}% APY</span>
              </div>

              <div>
                <h3 className="text-base font-black text-white">{pool.name}</h3>
                <p className="text-slate-300 text-xs font-sans mt-1 leading-relaxed">{pool.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] flex justify-between text-slate-400">
                <span>Lockup: <strong className="text-white">{pool.lockPeriodDays} Days</strong></span>
                <span>Min Deposit: <strong className="text-amber-400">{pool.minDeposit} $OD</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Interactive Recharts ROI Curve Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left: Recharts Growth Visualization */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <span>Projected Yield Trajectory Curve ({selectedPool.apyPercent}% APY)</span>
                </h3>
                <span className="text-[10px] text-slate-400">Compounded monthly over pool timeframe</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Projected Total Return</span>
                <span className="text-xl font-black text-emerald-400">${projectedTotal.toLocaleString()} $OD</span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} tickFormatter={(val) => `$${val}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#f59e0b', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString()} $OD`, '']}
                  />
                  <Area type="monotone" dataKey="totalValue" name="Total Portfolio Balance" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                  <Area type="monotone" dataKey="interest" name="Net Yield Rewards" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorInterest)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Principal Deposit</span>
                <span className="text-sm font-black text-white">${stakeAmount.toLocaleString()} $OD</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Estimated Net Profit</span>
                <span className="text-sm font-black text-emerald-400">+${projectedProfit.toLocaleString()} $OD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stake Input Form & Active Positions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
            <h3 className="text-base font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Coins className="w-5 h-5 text-amber-400" />
              <span>Stake $OD into {selectedPool.name}</span>
            </h3>

            <form onSubmit={handleStakeSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                  <span>Deposit Stake Amount ($OD)</span>
                  <span>Min: {selectedPool.minDeposit} $OD</span>
                </div>
                <input
                  type="number"
                  required
                  min={selectedPool.minDeposit}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-lg font-black focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Slider for quick adjustment */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm Lockup &amp; Start Staking</span>
              </button>
            </form>
          </div>

          {/* Active Staked Positions Log */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
            <h4 className="text-sm font-bold text-white uppercase flex items-center space-x-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Active Staked Vault Positions</span>
            </h4>

            {userStakedPositions.map((pos) => (
              <div key={pos.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">{pos.poolName}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-black px-2 py-0.5 rounded border border-emerald-500/30">
                    {pos.apy}% APY
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Staked: <strong className="text-white">${pos.amountStaked.toLocaleString()} $OD</strong></span>
                  <span>Rewards: <strong className="text-emerald-400">+${pos.earnedRewards.toFixed(2)} $OD</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
