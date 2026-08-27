import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  TrendingUp,
  RefreshCw,
  ArrowRightLeft,
  DollarSign,
  PieChart,
  ShieldCheck,
  Zap,
  Sparkles,
  Download,
  Copy,
  Check,
  Globe,
  Award,
  Lock,
  Percent
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface CryptoCalculatorViewProps {
  className?: string;
}

// Fixed Parity Exchange Rates vs USD ($1 OD = $1.00 USD)
const CRYPTO_RATES: Record<string, { symbol: string; name: string; usdPrice: number; icon: string }> = {
  OD: { symbol: '$OD', name: 'Ocean Dollar (Gold Backed)', usdPrice: 1.00, icon: '🌊' },
  BTC: { symbol: 'BTC', name: 'Bitcoin', usdPrice: 92450.00, icon: '₿' },
  ETH: { symbol: 'ETH', name: 'Ethereum', usdPrice: 3420.00, icon: 'Ξ' },
  SOL: { symbol: 'SOL', name: 'Solana', usdPrice: 185.50, icon: '◎' },
  USDT: { symbol: 'USDT', name: 'Tether USD', usdPrice: 1.00, icon: '₮' },
  BNB: { symbol: 'BNB', name: 'Binance Coin', usdPrice: 580.00, icon: '🔶' },
  GOLD_OZ: { symbol: 'GOLD', name: '24K Gold Bullion (1 oz)', usdPrice: 2680.00, icon: '🪙' }
};

export const CryptoCalculatorView: React.FC<CryptoCalculatorViewProps> = ({ className = '' }) => {
  const [calcTab, setCalcTab] = useState<'SWAP' | 'STAKING_ROI' | 'DEV_REVENUE'>('SWAP');

  // Currency Converter State
  const [fromAsset, setFromAsset] = useState<string>('OD');
  const [toAsset, setToAsset] = useState<string>('BTC');
  const [fromAmount, setFromAmount] = useState<number>(10000);

  // Staking ROI Calculator State
  const [stakeAmount, setStakeAmount] = useState<number>(25000);
  const [stakeAsset, setStakeAsset] = useState<string>('OD');
  const [lockDurationDays, setLockDurationDays] = useState<number>(365);
  const [customApy, setCustomApy] = useState<number>(24.8); // 24.8% default for 365d

  // Dev Revenue Split State
  const [protocolVolumeUsd, setProtocolVolumeUsd] = useState<number>(5000000); // $5M

  // Copy state
  const [copied, setCopied] = useState(false);

  // Conversions
  const fromUsdValue = fromAmount * (CRYPTO_RATES[fromAsset]?.usdPrice || 1);
  const toAssetPrice = CRYPTO_RATES[toAsset]?.usdPrice || 1;
  const convertedAmount = fromUsdValue / toAssetPrice;
  const estimatedNetworkFeeOd = Math.max(0.25, fromUsdValue * 0.0005); // 0.05% fee
  const goldGramBackingEq = fromUsdValue * 0.024; // 0.024g per $OD

  // Staking Calculations
  const stakingYearlyYield = (stakeAmount * (customApy / 100));
  const stakingHorizonYield = stakingYearlyYield * (lockDurationDays / 365);
  const totalStakingOutput = stakeAmount + stakingHorizonYield;

  // Dev Revenue Calculations
  const devShareUsd = protocolVolumeUsd * 0.10;       // 10% Dev Guild Pool
  const firebaseShareUsd = protocolVolumeUsd * 0.10;  // 10% Firebase Infrastructure
  const stakingYieldShareUsd = protocolVolumeUsd * 0.20; // 20% Staking Yields
  const portInfraShareUsd = protocolVolumeUsd * 0.60;  // 60% Port Operations Reserve

  const handleSwapAssets = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    hapticEngine.trigger('click');
  };

  const handleCopySummary = () => {
    const text = `Ocean Dollar Crypto Calculator Result:\nInput: ${fromAmount} ${fromAsset} ($${fromUsdValue.toLocaleString()} USD)\nOutput: ${convertedAmount.toFixed(6)} ${toAsset}\nNetwork Fee: $${estimatedNetworkFeeOd.toFixed(2)} OD\nGold Backing Equivalent: ${goldGramBackingEq.toFixed(2)}g Fine Gold`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    hapticEngine.trigger('success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="crypto-calculator-view"
      className={`p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/50 shadow-2xl space-y-6 text-white font-mono text-xs relative overflow-hidden ${className}`}
    >
      {/* Background Accent Blur */}
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5 gap-4 relative z-10">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center w-fit space-x-1.5 mb-2">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOVEREIGN FINANCIAL TOOLKIT</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
            <Coins className="w-7 h-7 text-cyan-400 shrink-0" />
            <span>Ocean Dollar ($OD) Crypto Calculator</span>
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Real-time cryptocurrency converter, staking ROI simulator, and developer revenue share estimator.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {(
            [
              { id: 'SWAP', label: '💱 Crypto Converter' },
              { id: 'STAKING_ROI', label: '📈 Staking ROI' },
              { id: 'DEV_REVENUE', label: '💻 Dev Revenue Split' }
            ] as Array<{ id: 'SWAP' | 'STAKING_ROI' | 'DEV_REVENUE'; label: string }>
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCalcTab(tab.id);
                hapticEngine.trigger('click');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                calcTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: CRYPTO CURRENCY CONVERTER */}
      {calcTab === 'SWAP' && (
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* From Asset Panel */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-slate-400">
                <span className="font-bold text-[10px] uppercase">You Send / Convert:</span>
                <span className="text-[10px] text-cyan-300 font-mono">
                  1 {fromAsset} = ${CRYPTO_RATES[fromAsset]?.usdPrice.toLocaleString()} USD
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="1"
                  step="100"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-black text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <select
                  value={fromAsset}
                  onChange={(e) => setFromAsset(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                >
                  {Object.keys(CRYPTO_RATES).map((key) => (
                    <option key={key} value={key}>
                      {CRYPTO_RATES[key].icon} {CRYPTO_RATES[key].symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-[10px] text-slate-500 text-right">
                USD Value: <strong className="text-white">${fromUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              </div>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-2 flex justify-center">
              <button
                onClick={handleSwapAssets}
                className="p-3 bg-slate-800 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-slate-700 rounded-2xl transition-all shadow-lg hover:rotate-180 duration-300"
                title="Swap Direction"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            {/* To Asset Panel */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
              <div className="flex justify-between items-center text-slate-400">
                <span className="font-bold text-[10px] uppercase">You Receive (Estimated):</span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  1 {toAsset} = ${CRYPTO_RATES[toAsset]?.usdPrice.toLocaleString()} USD
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-lg font-black text-cyan-300 font-mono overflow-x-auto truncate">
                  {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
                <select
                  value={toAsset}
                  onChange={(e) => setToAsset(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                >
                  {Object.keys(CRYPTO_RATES).map((key) => (
                    <option key={key} value={key}>
                      {CRYPTO_RATES[key].icon} {CRYPTO_RATES[key].symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-[10px] text-slate-500 text-right">
                Equivalent Gold Backing: <strong className="text-amber-300">{goldGramBackingEq.toFixed(2)}g Fine Gold</strong>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quick Preset Amounts:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {[100, 1000, 10000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setFromAmount(amt);
                    hapticEngine.trigger('click');
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[10px] font-bold transition-all"
                >
                  ${amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Conversion Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Gas / Protocol Fee</span>
              <div className="text-lg font-black text-cyan-300">
                ${estimatedNetworkFeeOd.toFixed(2)} <span className="text-xs text-slate-400">$OD</span>
              </div>
              <p className="text-[9px] text-slate-500">Fixed 0.05% UNCLOS Maritime Settlement Fee</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Gold Parity Backing</span>
              <div className="text-lg font-black text-amber-300">
                {goldGramBackingEq.toFixed(2)} grams
              </div>
              <p className="text-[9px] text-slate-500">Swiss Zurich Vault 24K Physical Gold Escrow</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Export Summary</span>
              <button
                onClick={handleCopySummary}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-xl font-black text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Calculation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STAKING ROI CALCULATOR */}
      {calcTab === 'STAKING_ROI' && (
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            {/* Input Parameters */}
            <div className="space-y-4">
              <h4 className="font-black text-white text-xs uppercase border-b border-slate-800 pb-2 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Staking ROI Parameters</span>
              </h4>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Stake Principal Amount ($OD):</label>
                <input
                  type="number"
                  min="100"
                  step="1000"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-base font-black text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Lockup Duration:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { days: 30, apy: 8.0, label: '30 Days (8%)' },
                    { days: 90, apy: 14.5, label: '90 Days (14.5%)' },
                    { days: 180, apy: 18.2, label: '180 Days (18.2%)' },
                    { days: 365, apy: 24.8, label: '365 Days (24.8%)' }
                  ].map((item) => (
                    <button
                      key={item.days}
                      onClick={() => {
                        setLockDurationDays(item.days);
                        setCustomApy(item.apy);
                        hapticEngine.trigger('click');
                      }}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold border transition-all ${
                        lockDurationDays === item.days
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                  <span>Custom APY Rate (%):</span>
                  <span className="text-cyan-300">{customApy}% APY</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="0.5"
                  value={customApy}
                  onChange={(e) => setCustomApy(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer h-2"
                />
              </div>
            </div>

            {/* Profitability Output Cards */}
            <div className="space-y-4">
              <h4 className="font-black text-white text-xs uppercase border-b border-slate-800 pb-2 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Estimated Yield Breakdown</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Horizon Yield ({lockDurationDays} Days)</span>
                  <div className="text-xl font-black text-emerald-400">
                    +${Math.round(stakingHorizonYield).toLocaleString()} <span className="text-xs text-slate-400">$OD</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/40 space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Annual Profit (12 Months)</span>
                  <div className="text-xl font-black text-purple-300">
                    +${Math.round(stakingYearlyYield).toLocaleString()} <span className="text-xs text-slate-400">$OD</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Portfolio Value at Expiry</span>
                <div className="text-2xl font-black text-white">
                  ${Math.round(totalStakingOutput).toLocaleString()} <span className="text-xs text-cyan-300">$OD</span>
                </div>
                <p className="text-[9px] text-slate-400">
                  Principal: ${stakeAmount.toLocaleString()} | Total Yield Earned: +${Math.round(stakingHorizonYield).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DEVELOPER REVENUE SHARE SPLIT */}
      {calcTab === 'DEV_REVENUE' && (
        <div className="space-y-6 relative z-10">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-black text-white text-sm uppercase flex items-center space-x-2">
                  <PieChart className="w-4 h-4 text-cyan-400" />
                  <span>Protocol Ecosystem Volume Revenue Split</span>
                </h4>
                <p className="text-[11px] text-slate-400 font-sans">
                  Calculate real-time allocations for Developer Guild (10%), Firebase Cloud Infra (10%), Staking (20%), and Port Operations (60%).
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Simulated Platform Volume:</span>
                <span className="text-lg font-black text-cyan-300">${protocolVolumeUsd.toLocaleString()} $OD</span>
              </div>
            </div>

            {/* Volume Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300 font-bold">
                <span>Adjust Monthly Protocol Transaction Volume:</span>
                <span>${(protocolVolumeUsd / 1000000).toFixed(1)}M $OD / Month</span>
              </div>
              <input
                type="range"
                min="500000"
                max="50000000"
                step="500000"
                value={protocolVolumeUsd}
                onChange={(e) => setProtocolVolumeUsd(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer h-2.5"
              />
            </div>

            {/* 4 Revenue Share Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Developer Guild Share (10%) */}
              <div className="p-4 rounded-2xl bg-slate-900 border-2 border-amber-500/50 space-y-1">
                <span className="text-[10px] text-amber-400 font-black uppercase flex items-center justify-between">
                  <span>Developer Guild (10%)</span>
                  <Award className="w-3.5 h-3.5" />
                </span>
                <div className="text-xl font-black text-amber-300">
                  ${devShareUsd.toLocaleString()} <span className="text-xs text-slate-400">$OD</span>
                </div>
                <p className="text-[9px] text-slate-400">Automated Seigniorage &amp; Payout Pool</p>
              </div>

              {/* Firebase Infrastructure (10%) */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-1">
                <span className="text-[10px] text-cyan-400 font-black uppercase flex items-center justify-between">
                  <span>Firebase Cloud (10%)</span>
                  <Zap className="w-3.5 h-3.5" />
                </span>
                <div className="text-xl font-black text-cyan-300">
                  ${firebaseShareUsd.toLocaleString()} <span className="text-xs text-slate-400">$OD</span>
                </div>
                <p className="text-[9px] text-slate-400">Firestore DB &amp; Auth Node Sync</p>
              </div>

              {/* Staking Yield Pool (20%) */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-1">
                <span className="text-[10px] text-purple-400 font-black uppercase flex items-center justify-between">
                  <span>Staking Yields (20%)</span>
                  <Coins className="w-3.5 h-3.5" />
                </span>
                <div className="text-xl font-black text-purple-300">
                  ${stakingYieldShareUsd.toLocaleString()} <span className="text-xs text-slate-400">$OD</span>
                </div>
                <p className="text-[9px] text-slate-400">Liquidity Provider Staking Pool</p>
              </div>

              {/* Port Demurrage Reserve (60%) */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 font-black uppercase flex items-center justify-between">
                  <span>Port Operations (60%)</span>
                  <Globe className="w-3.5 h-3.5" />
                </span>
                <div className="text-xl font-black text-white">
                  ${portInfraShareUsd.toLocaleString()} <span className="text-xs text-slate-400">$OD</span>
                </div>
                <p className="text-[9px] text-slate-400">Demurrage &amp; Dredging Reserve</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
