import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Users,
  Coins,
  Sliders,
  Sparkles,
  Layers,
  DollarSign,
  Activity,
  Zap,
  BarChart3,
  Calendar,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { hapticEngine } from '../utils/hapticUtils';

export interface RevenueProjectionChartViewProps {
  className?: string;
  initialProtocolVolume?: number;
}

export const RevenueProjectionChartView: React.FC<RevenueProjectionChartViewProps> = ({
  className = '',
  initialProtocolVolume = 1000000
}) => {
  // Subscription tier user counts
  const [deckhandUsers, setDeckhandUsers] = useState<number>(1850); // $29/mo
  const [captainUsers, setCaptainUsers] = useState<number>(520);   // $199/mo
  const [fleetUsers, setFleetUsers] = useState<number>(95);        // $1250/mo

  // Staking TVL pools ($OD)
  const [staking30dTvl, setStaking30dTvl] = useState<number>(2500000);  // 8.0% APY
  const [staking90dTvl, setStaking90dTvl] = useState<number>(6000000);  // 14.5% APY
  const [staking365dTvl, setStaking365dTvl] = useState<number>(15000000); // 24.8% APY

  // Simulation Controls
  const [timeHorizonMonths, setTimeHorizonMonths] = useState<number>(12); // 6, 12, 24
  const [growthScenario, setGrowthScenario] = useState<'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE'>('MODERATE');
  const [chartViewType, setChartViewType] = useState<'STACKED' | 'TIERS_VS_STAKING' | 'CUMULATIVE'>('STACKED');

  // MoM growth rates based on scenario
  const growthRateMom = useMemo(() => {
    switch (growthScenario) {
      case 'CONSERVATIVE':
        return { subGrowth: 0.04, stakingGrowth: 0.03 };
      case 'AGGRESSIVE':
        return { subGrowth: 0.16, stakingGrowth: 0.12 };
      case 'MODERATE':
      default:
        return { subGrowth: 0.08, stakingGrowth: 0.06 };
    }
  }, [growthScenario]);

  // Base monthly revenue calculations
  const deckhandMrr = deckhandUsers * 29;
  const captainMrr = captainUsers * 199;
  const fleetMrr = fleetUsers * 1250;
  const totalBaseSubMrr = deckhandMrr + captainMrr + fleetMrr;

  // Monthly yield generated / protocol fee cut from staking activities (e.g. 10% fee on generated yield)
  const monthlyStakingYieldGen =
    (staking30dTvl * 0.080 / 12) +
    (staking90dTvl * 0.145 / 12) +
    (staking365dTvl * 0.248 / 12);

  // Recharts Projection Data generator
  const projectionData = useMemo(() => {
    const data = [];
    let cumulativeRevenue = 0;

    for (let month = 1; month <= timeHorizonMonths; month++) {
      const monthGrowthFactorSub = Math.pow(1 + growthRateMom.subGrowth, month - 1);
      const monthGrowthFactorStaking = Math.pow(1 + growthRateMom.stakingGrowth, month - 1);

      const mDeckhand = Math.round(deckhandMrr * monthGrowthFactorSub);
      const mCaptain = Math.round(captainMrr * monthGrowthFactorSub);
      const mFleet = Math.round(fleetMrr * monthGrowthFactorSub);
      const mSubTotal = mDeckhand + mCaptain + mFleet;

      const mStaking = Math.round(monthlyStakingYieldGen * monthGrowthFactorStaking);
      const mTotal = mSubTotal + mStaking;

      cumulativeRevenue += mTotal;

      data.push({
        monthLabel: `M${month}`,
        fullMonthLabel: `Month ${month}`,
        deckhandRevenue: mDeckhand,
        captainRevenue: mCaptain,
        fleetRevenue: mFleet,
        subscriptionRevenue: mSubTotal,
        stakingRevenue: mStaking,
        totalRevenue: mTotal,
        cumulativeRevenue: cumulativeRevenue,
        firebaseAlloc: Math.round(mTotal * 0.10),
        devAlloc: Math.round(mTotal * 0.10)
      });
    }

    return data;
  }, [
    deckhandMrr,
    captainMrr,
    fleetMrr,
    monthlyStakingYieldGen,
    growthRateMom,
    timeHorizonMonths
  ]);

  // Summary Metrics
  const projectedTotalHorizon = useMemo(() => {
    return projectionData.reduce((acc, curr) => acc + curr.totalRevenue, 0);
  }, [projectionData]);

  const endMrr = projectionData[projectionData.length - 1]?.totalRevenue || 0;
  const endSubShare = projectionData[projectionData.length - 1]?.subscriptionRevenue || 0;
  const endStakingShare = projectionData[projectionData.length - 1]?.stakingRevenue || 0;

  const handleResetDefaults = () => {
    setDeckhandUsers(1850);
    setCaptainUsers(520);
    setFleetUsers(95);
    setStaking30dTvl(2500000);
    setStaking90dTvl(6000000);
    setStaking365dTvl(15000000);
    setGrowthScenario('MODERATE');
    setTimeHorizonMonths(12);
    hapticEngine.trigger('click');
  };

  return (
    <div
      id="revenue-projection-chart-view"
      className={`p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-purple-500/60 shadow-2xl space-y-6 text-white font-mono text-xs relative overflow-hidden ${className}`}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-800 pb-5 gap-4 relative z-10">
        <div>
          <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center w-fit space-x-1.5 mb-2">
            <Sparkles className="w-3 h-3 text-purple-400 animate-spin-slow" />
            <span>PREDICTIVE FINANCIAL INTELLIGENCE</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
            <TrendingUp className="w-7 h-7 text-purple-400 shrink-0" />
            <span>Subscription Tiers &amp; Staking Revenue Growth Projections</span>
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Simulate future protocol earnings based on recurring user subscription tiers and locked $OD gold staking TVL.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {/* Total Projected Horizon Revenue */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-purple-400" />
            <span>Projected {timeHorizonMonths}-Mo Total</span>
          </span>
          <div className="text-2xl font-black text-white">
            ${projectedTotalHorizon.toLocaleString()} <span className="text-xs font-bold text-purple-400">$OD</span>
          </div>
          <div className="text-[10px] text-slate-400 font-sans">
            Avg Monthly: <strong className="text-purple-300">${Math.round(projectedTotalHorizon / timeHorizonMonths).toLocaleString()}</strong>
          </div>
        </div>

        {/* Exit Monthly Recurring Revenue (MRR) */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center space-x-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Exit Month MRR (M{timeHorizonMonths})</span>
          </span>
          <div className="text-2xl font-black text-emerald-400">
            ${endMrr.toLocaleString()} <span className="text-xs font-bold text-white">$OD</span>
          </div>
          <div className="text-[10px] text-slate-400 font-sans">
            Sub: <strong className="text-emerald-300">${endSubShare.toLocaleString()}</strong> | Staking: <strong className="text-yellow-300">${endStakingShare.toLocaleString()}</strong>
          </div>
        </div>

        {/* Firebase Cloud Sync Alloc (10%) */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Projected Firebase Share (10%)</span>
          </span>
          <div className="text-2xl font-black text-cyan-300">
            ${Math.round(projectedTotalHorizon * 0.10).toLocaleString()} <span className="text-xs font-bold text-slate-400">$OD</span>
          </div>
          <div className="text-[10px] text-slate-400 font-sans">
            Firestore &amp; Auth Uptime Guarantee
          </div>
        </div>

        {/* Developer Pool Alloc (10%) */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Projected Dev Pool (10%)</span>
          </span>
          <div className="text-2xl font-black text-amber-300">
            ${Math.round(projectedTotalHorizon * 0.10).toLocaleString()} <span className="text-xs font-bold text-slate-400">$OD</span>
          </div>
          <div className="text-[10px] text-slate-400 font-sans">
            Smart Contract Multisig Audits
          </div>
        </div>
      </div>

      {/* Interactive Simulation Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 relative z-10">
        {/* Left Column: Subscription Tiers Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-black text-white text-xs uppercase flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>1. Subscription Tiers User Base</span>
            </h4>
            <span className="text-[10px] text-purple-300 font-bold">Base MRR: ${totalBaseSubMrr.toLocaleString()}</span>
          </div>

          {/* Deckhand Tier Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Deckhand / Standard Tier ($29/mo):</span>
              </span>
              <strong className="text-white font-mono">{deckhandUsers.toLocaleString()} users (${(deckhandUsers * 29).toLocaleString()}/mo)</strong>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="50"
              value={deckhandUsers}
              onChange={(e) => {
                setDeckhandUsers(Number(e.target.value));
                hapticEngine.trigger('light');
              }}
              className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Captain Pro Tier Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Captain / Pro Tier ($199/mo):</span>
              </span>
              <strong className="text-white font-mono">{captainUsers.toLocaleString()} users (${(captainUsers * 199).toLocaleString()}/mo)</strong>
            </div>
            <input
              type="range"
              min="20"
              max="3000"
              step="10"
              value={captainUsers}
              onChange={(e) => {
                setCaptainUsers(Number(e.target.value));
                hapticEngine.trigger('light');
              }}
              className="w-full accent-purple-400 bg-slate-900 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Fleet Enterprise Tier Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Fleet / Enterprise Tier ($1,250/mo):</span>
              </span>
              <strong className="text-white font-mono">{fleetUsers.toLocaleString()} users (${(fleetUsers * 1250).toLocaleString()}/mo)</strong>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={fleetUsers}
              onChange={(e) => {
                setFleetUsers(Number(e.target.value));
                hapticEngine.trigger('light');
              }}
              className="w-full accent-emerald-400 bg-slate-900 rounded-lg cursor-pointer h-2"
            />
          </div>
        </div>

        {/* Right Column: Staking Activities & Scenario Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-black text-white text-xs uppercase flex items-center space-x-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>2. Locked Staking TVL &amp; Growth Scenario</span>
            </h4>
            <span className="text-[10px] text-yellow-300 font-bold">Base Yield Rev: ${Math.round(monthlyStakingYieldGen).toLocaleString()}/mo</span>
          </div>

          {/* Staking Pools Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-400 font-bold block uppercase">30-Day Lockup (8% APY)</span>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="250000"
                value={staking30dTvl}
                onChange={(e) => {
                  setStaking30dTvl(Number(e.target.value));
                  hapticEngine.trigger('light');
                }}
                className="w-full accent-yellow-400 bg-slate-950 rounded cursor-pointer h-1.5"
              />
              <span className="text-[10px] text-white font-mono block text-right">${(staking30dTvl / 1000000).toFixed(2)}M $OD</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-400 font-bold block uppercase">90-Day Lockup (14.5% APY)</span>
              <input
                type="range"
                min="1000000"
                max="25000000"
                step="500000"
                value={staking90dTvl}
                onChange={(e) => {
                  setStaking90dTvl(Number(e.target.value));
                  hapticEngine.trigger('light');
                }}
                className="w-full accent-amber-400 bg-slate-950 rounded cursor-pointer h-1.5"
              />
              <span className="text-[10px] text-white font-mono block text-right">${(staking90dTvl / 1000000).toFixed(2)}M $OD</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-400 font-bold block uppercase">365-Day Lockup (24.8% APY)</span>
              <input
                type="range"
                min="2000000"
                max="50000000"
                step="1000000"
                value={staking365dTvl}
                onChange={(e) => {
                  setStaking365dTvl(Number(e.target.value));
                  hapticEngine.trigger('light');
                }}
                className="w-full accent-purple-400 bg-slate-950 rounded cursor-pointer h-1.5"
              />
              <span className="text-[10px] text-white font-mono block text-right">${(staking365dTvl / 1000000).toFixed(2)}M $OD</span>
            </div>
          </div>

          {/* Timeframe & Growth Scenario Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            {/* Horizon Picker */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">Horizon:</span>
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                {[6, 12, 24].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setTimeHorizonMonths(m);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      timeHorizonMonths === m
                        ? 'bg-purple-600 text-white font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Picker */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">MoM Growth Curve:</span>
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                {(['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE'] as Array<'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE'>).map((sc) => (
                  <button
                    key={sc}
                    onClick={() => {
                      setGrowthScenario(sc);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      growthScenario === sc
                        ? 'bg-purple-600 text-white font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sc === 'CONSERVATIVE' ? 'Cons (4% MoM)' : sc === 'MODERATE' ? 'Mod (8% MoM)' : 'Aggr (16% MoM)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart View Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 relative z-10">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span className="font-black text-white text-xs">Projection Chart Visualization Mode:</span>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(
            [
              { id: 'STACKED', label: 'Subscription + Staking' },
              { id: 'TIERS_VS_STAKING', label: 'Tier Breakdown' },
              { id: 'CUMULATIVE', label: 'Cumulative Yield Curve' }
            ] as Array<{ id: 'STACKED' | 'TIERS_VS_STAKING' | 'CUMULATIVE'; label: string }>
          ).map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setChartViewType(v.id);
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                chartViewType === v.id
                  ? 'bg-purple-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Recharts Container */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 h-80 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          {chartViewType === 'STACKED' ? (
            <ComposedChart data={projectionData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorStaking" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="monthLabel" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                formatter={(value: any, name: any) => [`$${Number(value).toLocaleString()} $OD`, name]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="subscriptionRevenue"
                name="Subscription Tiers MRR"
                stroke="#a855f7"
                fillOpacity={1}
                fill="url(#colorSub)"
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="stakingRevenue"
                name="Staking Yield Protocol Fee"
                stroke="#eab308"
                fillOpacity={1}
                fill="url(#colorStaking)"
                stackId="1"
              />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                name="Total Monthly Revenue"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 3, fill: '#38bdf8' }}
              />
            </ComposedChart>
          ) : chartViewType === 'TIERS_VS_STAKING' ? (
            <ComposedChart data={projectionData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="monthLabel" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                formatter={(value: any, name: any) => [`$${Number(value).toLocaleString()} $OD`, name]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="deckhandRevenue" name="Deckhand Standard ($29)" fill="#22d3ee" stackId="tierStack" />
              <Bar dataKey="captainRevenue" name="Captain Pro ($199)" fill="#c084fc" stackId="tierStack" />
              <Bar dataKey="fleetRevenue" name="Fleet Enterprise ($1,250)" fill="#34d399" stackId="tierStack" />
              <Bar dataKey="stakingRevenue" name="Staking Yield Protocol Fees" fill="#facc15" />
            </ComposedChart>
          ) : (
            <ComposedChart data={projectionData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="monthLabel" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                formatter={(value: any, name: any) => [`$${Number(value).toLocaleString()} $OD`, name]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="cumulativeRevenue"
                name="Cumulative Protocol Growth ($OD)"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorCumulative)"
                strokeWidth={2}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
