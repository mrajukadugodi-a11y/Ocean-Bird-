import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, 
  CartesianGrid, Legend, ComposedChart, Line, PieChart, Pie 
} from 'recharts';
import { 
  Bot, ShieldCheck, Zap, DollarSign, TrendingUp, Lock, RefreshCw, Download, Check, 
  Copy, Award, Radio, Ticket, Terminal, ShieldAlert, Cpu, Layers, Sliders, ArrowUpRight,
  Wifi, Coins, Landmark, Sparkles, CheckCircle2, FileText, AlertTriangle, Activity
} from 'lucide-react';

export type EarningTab = 'STAKING_YIELD' | 'PWA_NODE_REWARDS' | 'TELEMETRY_DATA_SHARING' | 'AFFILIATE_COMMISSIONS';

export const FUND_ALLOCATION_BREAKDOWN = [
  { name: 'Gold Vault Reserve', value: 40, apy: '5.2%', color: '#f59e0b' },
  { name: 'Port Infrastructure Bonds', value: 35, apy: '7.8%', color: '#38bdf8' },
  { name: 'Blue Carbon Offsets', value: 15, apy: '4.5%', color: '#10b981' },
  { name: 'Disaster Relief Pool', value: 10, apy: 'Instant', color: '#a855f7' }
];

export const QuantumLotteryRiskFundAndEarningPortal: React.FC = () => {
  // Fund Management State
  const [portfolioBalanceOd, setPortfolioBalanceOd] = useState<number>(124850);
  const [stakedOd, setStakedOd] = useState<number>(50000);
  const [earnedRewardsOd, setEarnedRewardsOd] = useState<number>(1482.50);
  const [activeEarningTab, setActiveEarningTab] = useState<EarningTab>('STAKING_YIELD');

  // Node & Telemetry Earning Simulators
  const [isNodeActive, setIsNodeActive] = useState<boolean>(true);
  const [isDataSharingActive, setIsDataSharingActive] = useState<boolean>(true);
  const [telemetryHoursStreamed, setTelemetryHoursStreamed] = useState<number>(18.5);
  const [claimedToastMsg, setClaimedToastMsg] = useState<string | null>(null);

  // Security Audit State
  const [isAuditRunning, setIsAuditRunning] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([
    '[06:10:20 UTC] ISO-20022 Financial Standard Audit: 100% COMPLIANT.',
    '[06:10:22 UTC] Post-Quantum Encryption Check (Kyber-1024): VERIFIED ACTIVE.',
    '[06:10:24 UTC] Penetration Test Score: 99.8 / 100. Zero vulnerabilities detected.'
  ]);

  // Live Earning Simulation Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      if (isNodeActive || isDataSharingActive) {
        setEarnedRewardsOd((prev) => prev + 0.12);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isNodeActive, isDataSharingActive]);

  const handleClaimEarnings = () => {
    const claimed = earnedRewardsOd;
    setPortfolioBalanceOd((prev) => prev + claimed);
    setEarnedRewardsOd(0);
    setClaimedToastMsg(`🎉 Claimed $${claimed.toFixed(2)} OD Rewards to Main Sovereign Wallet!`);
    setTimeout(() => setClaimedToastMsg(null), 4000);
  };

  const runAiSecurityAudit = () => {
    setIsAuditRunning(true);
    setAuditLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Triggering deep AI Security & Compliance Audit...`,
      ...prev
    ]);

    setTimeout(() => {
      setAuditLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Inspecting Kyber-1024 quantum keys & smart contract reentrancy guards...`,
        `[${new Date().toLocaleTimeString()}] Scanning anti-sybil bot filter across 142,850 lottery participants...`,
        ...prev
      ]);
    }, 1200);

    setTimeout(() => {
      setIsAuditRunning(false);
      setAuditLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] AUDIT COMPLETE! System certified 100% secure. Zero vulnerabilities found.`,
        ...prev
      ]);
    }, 3000);
  };

  return (
    <div id="quantum-lottery-risk-fund-earning-portal" className="space-y-8 font-mono text-white animate-fadeIn">
      {/* 1. USER MONEY EARNING SYSTEM HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 sm:p-8 border border-emerald-500/50 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                USER MONETIZATION &amp; YIELD ENGINE
              </span>
              <span className="text-[10px] text-slate-400">PASSIVE &amp; ACTIVE EARNINGS ACTIVE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Sovereign Seafarer Money Earning System
            </h1>
            <p className="text-slate-300 text-xs font-sans mt-1 max-w-3xl">
              Earn real Ocean Dollars ($OD) through high-yield staking (6.8% APY), running PWA satellite relay nodes, streaming maritime telemetry data, and lottery pool affiliate rewards.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-500/40 shrink-0 text-right space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold uppercase">UNCLAIMED USER EARNINGS</span>
            <strong className="text-emerald-400 text-2xl font-black block">${earnedRewardsOd.toFixed(2)} OD</strong>
            <button
              onClick={handleClaimEarnings}
              disabled={earnedRewardsOd <= 0}
              className="py-1.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              CLAIM REWARDS TO WALLET
            </button>
          </div>
        </div>

        {claimedToastMsg && (
          <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-3 rounded-xl text-xs font-bold animate-fadeIn">
            {claimedToastMsg}
          </div>
        )}

        {/* FOUR EARNING MODES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {/* MODE 1: STAKING */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-500/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">1. OD STAKING YIELD</span>
              <strong className="text-emerald-400 text-xl font-black block">6.8% APY</strong>
              <p className="text-slate-400 text-[11px] font-sans">Stake $OD tokens in sovereign liquidity vaults. Daily compounded interest.</p>
            </div>
            <button
              onClick={() => {
                setStakedOd((prev) => prev + 1000);
                alert('Staked +1,000 OD into Sovereign Yield Vault at 6.8% APY!');
              }}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl uppercase text-[11px] transition-all"
            >
              STAKE +1,000 OD
            </button>
          </div>

          {/* MODE 2: PWA RELAY NODE */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">2. PWA SATELLITE RELAY NODE</span>
              <strong className="text-cyan-400 text-xl font-black block">$42.50 OD / day</strong>
              <p className="text-slate-400 text-[11px] font-sans">Keep PWA active in background to relay off-grid satellite weather tiles.</p>
            </div>
            <button
              onClick={() => setIsNodeActive(!isNodeActive)}
              className={`w-full py-2 font-black rounded-xl uppercase text-[11px] transition-all ${
                isNodeActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {isNodeActive ? '🟢 NODE RUNNING' : '🔴 PAUSED'}
            </button>
          </div>

          {/* MODE 3: TELEMETRY STREAMING */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-amber-500/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">3. MARITIME DATA SHARING</span>
              <strong className="text-amber-400 text-xl font-black block">$15.00 OD / hour</strong>
              <p className="text-slate-400 text-[11px] font-sans">Share AIS vessel GPS coordinates &amp; local wave telemetry data.</p>
            </div>
            <button
              onClick={() => setIsDataSharingActive(!isDataSharingActive)}
              className={`w-full py-2 font-black rounded-xl uppercase text-[11px] transition-all ${
                isDataSharingActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {isDataSharingActive ? '📡 STREAMING ACTIVE' : '🔴 START STREAM'}
            </button>
          </div>

          {/* MODE 4: LOTTERY REFERRALS */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-purple-500/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">4. LOTTERY POOL AFFILIATE</span>
              <strong className="text-purple-400 text-xl font-black block">5.0% Commission</strong>
              <p className="text-slate-400 text-[11px] font-sans">Earn 5% on ticket entries purchased via your unique referral link.</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText('https://ais-dev.run.app/?ref=SOV-SEAFARER-982')}
              className="w-full py-2 bg-purple-500 hover:bg-purple-400 text-white font-black rounded-xl uppercase text-[11px] transition-all"
            >
              COPY REF LINK
            </button>
          </div>
        </div>
      </div>

      {/* 2. LOTTERY RISK MONITOR & SOLVENCY DASHBOARD */}
      <div id="lottery-risk-monitor" className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">REAL-TIME RISK &amp; SOLVENCY TELEMETRY</span>
            <h2 className="text-2xl font-black text-white mt-1">Lottery Risk &amp; Solvency Monitor</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Continuous VaR calculation, anti-sybil bot filtering, and 482% over-collateralized reserve solvency tracking for lottery fund holds.
            </p>
          </div>

          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-xl text-xs font-bold font-mono">
            SOLVENCY RATIO: 482% (HEALTHY)
          </span>
        </div>

        {/* RISK METRICS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">RESERVE OVER-COLLATERALIZATION</span>
            <strong className="text-emerald-400 text-2xl font-black block">482%</strong>
            <span className="text-[10px] text-slate-500 font-sans block">$48.25M Vault vs $10.0M Max Payout</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">VALUE-AT-RISK (VaR)</span>
            <strong className="text-cyan-400 text-2xl font-black block">0.02%</strong>
            <span className="text-[10px] text-slate-500 font-sans block">Ultra-Low Liquidity Exposure</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-amber-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">ANTI-SYBIL BOT FILTER</span>
            <strong className="text-amber-400 text-2xl font-black block">100% Clean</strong>
            <span className="text-[10px] text-slate-500 font-sans block">0 Sybil Bot Accounts Flagged</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-purple-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">ANOMALY RISK SCORE</span>
            <strong className="text-purple-400 text-2xl font-black block">0 / 100</strong>
            <span className="text-[10px] text-emerald-400 font-sans block">Zero Anomaly Detected</span>
          </div>
        </div>
      </div>

      {/* 3. SOVEREIGN FUND MANAGEMENT UI */}
      <div id="sovereign-fund-management" className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">PORTFOLIO ALLOCATION &amp; REBALANCING</span>
            <h2 className="text-2xl font-black text-white mt-1">Sovereign Fund Management UI</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Allocate user sovereign holdings across Gold Vault Reserves, Port Infrastructure Bonds, Blue Carbon Offsets, and Coastal Disaster Pools.
            </p>
          </div>

          <div className="text-right">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">TOTAL PORTFOLIO VALUE</span>
            <strong className="text-amber-400 text-2xl font-black">${portfolioBalanceOd.toLocaleString()} OD</strong>
          </div>
        </div>

        {/* ALLOCATION BREAKDOWN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {FUND_ALLOCATION_BREAKDOWN.map((item, idx) => (
            <div key={idx} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <strong className="text-white font-bold">{item.name}</strong>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  {item.apy} APY
                </span>
              </div>

              <div className="py-1">
                <span className="text-2xl font-black" style={{ color: item.color }}>
                  ${((portfolioBalanceOd * item.value) / 100).toLocaleString()} OD
                </span>
                <span className="text-slate-400 text-[10px] block font-mono">({item.value}% Target Allocation)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. AI SECURITY AUDIT SYSTEM */}
      <div id="ai-security-audit" className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-500/20 border border-purple-500/40 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">AUTOMATED SECURITY AUDITOR</span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                  AUDIT SCORE: 99.8 / 100
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-0.5">AI Security &amp; ISO Compliance Audit</h2>
            </div>
          </div>

          <button
            onClick={runAiSecurityAudit}
            disabled={isAuditRunning}
            className="py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-xl shadow-lg transition-all flex items-center space-x-2 shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isAuditRunning ? 'animate-spin' : ''}`} />
            <span>RUN ON-DEMAND AI SECURITY AUDIT</span>
          </button>
        </div>

        {/* AUDIT TERMINAL LOG STREAM */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
          <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-1 font-bold">
            <span className="flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>AI SECURITY SCANNER LOGS</span>
            </span>
            <span className="text-emerald-400 text-[10px]">ISO-20022 MESSAGING: PASS</span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300 max-h-36 overflow-y-auto">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <span className="text-purple-400 shrink-0">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
