import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  TrendingUp,
  Award,
  Users,
  Coins,
  ShieldCheck,
  Zap,
  BarChart2,
  PieChart as PieIcon,
  Flame,
  Snowflake,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Filter,
  RefreshCw,
  Search,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { hapticEngine } from '../../utils/hapticUtils';

// Mock Dataset 1: Monthly Payout Trends
const MONTHLY_PAYOUT_DATA = [
  { month: 'Jan', payoutOD: 620000, winnersCount: 840 },
  { month: 'Feb', payoutOD: 780000, winnersCount: 920 },
  { month: 'Mar', payoutOD: 110000, winnersCount: 1250 },
  { month: 'Apr', payoutOD: 950000, winnersCount: 1100 },
  { month: 'May', payoutOD: 1420000, winnersCount: 1680 },
  { month: 'Jun', payoutOD: 1850000, winnersCount: 2100 },
  { month: 'Jul', payoutOD: 2300000, winnersCount: 2750 },
  { month: 'Aug', payoutOD: 3850000, winnersCount: 3650 } // Mega jackpot month
];

// Mock Dataset 2: Prize Tier Distribution
const PRIZE_TIER_DATA = [
  { name: 'Mega Jackpot (6/6)', value: 45, color: '#f59e0b', count: 12 },
  { name: 'Match 5 + Special', value: 25, color: '#38bdf8', count: 142 },
  { name: 'Match 4 Tier', value: 15, color: '#10b981', count: 1890 },
  { name: 'Scratch Card Mains', value: 10, color: '#a855f7', count: 5400 },
  { name: 'Seafarer Raffles', value: 5, color: '#ec4899', count: 6846 }
];

// Mock Dataset 3: Hot & Cold Numbers (1 - 50)
interface NumberStat {
  num: number;
  draws: number;
  percentage: number;
  status: 'HOT' | 'COLD' | 'NEUTRAL';
}

const GENERATE_NUMBER_STATS = (): NumberStat[] => {
  const hotNums = [7, 14, 21, 28, 33, 42, 49];
  const coldNums = [3, 11, 19, 26, 38, 45];
  
  const stats: NumberStat[] = [];
  for (let i = 1; i <= 50; i++) {
    let draws = Math.floor(Math.random() * 40) + 20;
    let status: 'HOT' | 'COLD' | 'NEUTRAL' = 'NEUTRAL';
    if (hotNums.includes(i)) {
      draws = Math.floor(Math.random() * 30) + 70;
      status = 'HOT';
    } else if (coldNums.includes(i)) {
      draws = Math.floor(Math.random() * 10) + 5;
      status = 'COLD';
    }
    const percentage = Number(((draws / 120) * 100).toFixed(1));
    stats.push({ num: i, draws, percentage, status });
  }
  return stats;
};

// Mock Dataset 4: Recent Big Winners List
interface WinnerRecord {
  id: string;
  seafarerName: string;
  rank: string;
  vessel: string;
  flag: string;
  game: string;
  payoutOD: number;
  fiatApproxUSD: number;
  numbersMatched: string;
  timestamp: string;
  hash: string;
  status: 'CLAIMED_BANK' | 'STAKED_VAULT' | 'WALLET_LIQUID';
}

const RECENT_WINNERS_DATA: WinnerRecord[] = [
  {
    id: 'WIN-8891',
    seafarerName: 'Capt. Aris Thorne',
    rank: 'Master Mariner',
    vessel: 'MV Poseidon Express',
    flag: 'Panama',
    game: 'Mega High Seas Jackpot',
    payoutOD: 1250000,
    fiatApproxUSD: 1250000,
    numbersMatched: '07 • 14 • 21 • 28 • 33 [PB: 09]',
    timestamp: '2 hours ago',
    hash: '0x8f1a...4e92',
    status: 'CLAIMED_BANK'
  },
  {
    id: 'WIN-8892',
    seafarerName: 'Chief Eng. Vikram Rao',
    rank: 'Chief Engineer',
    vessel: 'INS Vikrant Escort',
    flag: 'India',
    game: 'Seafarer Daily Raffle',
    payoutOD: 250000,
    fiatApproxUSD: 250000,
    numbersMatched: 'Raffle Ticket #884920',
    timestamp: '5 hours ago',
    hash: '0x3c2b...91a0',
    status: 'STAKED_VAULT'
  },
  {
    id: 'WIN-8893',
    seafarerName: 'Elena Rostova',
    rank: 'Chief Stewardess',
    vessel: 'Symphony of the Seas',
    flag: 'Bahamas',
    game: 'Oceanic Emerald Scratcher',
    payoutOD: 100000,
    fiatApproxUSD: 100000,
    numbersMatched: '3x Matching Emerald Anchors',
    timestamp: '8 hours ago',
    hash: '0x7d4e...12f8',
    status: 'WALLET_LIQUID'
  },
  {
    id: 'WIN-8894',
    seafarerName: 'Bosun Mateo Silva',
    rank: 'Bosun',
    vessel: 'Maersk Mc-Kinney',
    flag: 'Denmark',
    game: 'Regatta Sports Book',
    payoutOD: 75000,
    fiatApproxUSD: 75000,
    numbersMatched: '5-Leg Parlay Regatta',
    timestamp: '12 hours ago',
    hash: '0x9a8b...34c1',
    status: 'CLAIMED_BANK'
  },
  {
    id: 'WIN-8895',
    seafarerName: '3rd Mate Kim Min-jun',
    rank: '3rd Navigation Officer',
    vessel: 'HMM Algeciras',
    flag: 'Liberia',
    game: 'Mega High Seas Jackpot',
    payoutOD: 50000,
    fiatApproxUSD: 50000,
    numbersMatched: '07 • 14 • 21 • 33 [PB: 02]',
    timestamp: '1 day ago',
    hash: '0x1e2f...78d9',
    status: 'STAKED_VAULT'
  }
];

export const LotteryWinnerAnalyticsView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'30D' | '90D' | '1Y' | 'ALL'>('30D');
  const [numberFilter, setNumberFilter] = useState<'ALL' | 'HOT' | 'COLD'>('ALL');
  const [selectedWinner, setSelectedWinner] = useState<WinnerRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const numberStats = useMemo(() => GENERATE_NUMBER_STATS(), []);

  const filteredNumbers = useMemo(() => {
    if (numberFilter === 'HOT') return numberStats.filter((n) => n.status === 'HOT');
    if (numberFilter === 'COLD') return numberStats.filter((n) => n.status === 'COLD');
    return numberStats;
  }, [numberFilter, numberStats]);

  const filteredWinners = useMemo(() => {
    if (!searchQuery.trim()) return RECENT_WINNERS_DATA;
    const q = searchQuery.toLowerCase();
    return RECENT_WINNERS_DATA.filter(
      (w) =>
        w.seafarerName.toLowerCase().includes(q) ||
        w.vessel.toLowerCase().includes(q) ||
        w.game.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6 font-sans">
      {/* Analytics Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Maritime Lottery Winner Analytics</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>96.8% RTP Verified</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
              On-Chain Winner Telemetry & Number Frequency Dashboard
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl font-sans leading-relaxed">
              Real-time statistical intelligence tracking maritime lottery payout distribution, hot/cold ball frequency, vessel winner leaderboards, and provably fair smart contract claims.
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs self-start md:self-auto">
            {(['30D', '90D', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setTimeframe(tf);
                  hapticEngine.trigger('click');
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80 font-mono">
          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Total $OD Payouts</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-black text-amber-400">$12,850,000</span>
              <span className="text-xs text-amber-300 font-bold">$OD</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+24.8% vs last period</span>
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Total Winners Verified</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-black text-white">14,290</span>
              <span className="text-xs text-slate-400">Seafarers</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans">Across 182 Vessel Fleets</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Highest Single Win</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-black text-cyan-300">$1,250,000</span>
              <span className="text-xs text-cyan-400">$OD</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-sans truncate block">Capt. Aris Thorne (Panama)</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">Average Claim Time</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-black text-emerald-400">4.2 min</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-sans">Instant SatCom Settlement</span>
          </div>
        </div>
      </div>

      {/* Charts Section: Payout Trend & Prize Tier Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Payout Volume Progression (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-amber-400" />
                <span>Monthly Payout Volume & Winner Count Progression</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-sans">
                Cumulative Ocean Dollar ($OD) payouts disbursed to seafarers globally
              </p>
            </div>
            <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-xl self-start sm:self-auto">
              Current Month: $3.85M $OD
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_PAYOUT_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="payoutGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-amber-500/40 p-3 rounded-2xl shadow-xl font-mono text-xs space-y-1">
                          <div className="font-bold text-amber-400 border-b border-slate-800 pb-1">{data.month} Payout Summary</div>
                          <div className="text-white font-bold">{data.payoutOD.toLocaleString()} $OD</div>
                          <div className="text-slate-400 text-[11px]">{data.winnersCount} Lucky Seafarers</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="payoutOD" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#payoutGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Prize Tier Distribution (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
                <PieIcon className="w-4 h-4 text-cyan-400" />
                <span>Prize Tier Distribution</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-sans">
                Breakdown of winning claims across game categories
              </p>
            </div>

            <div className="h-44 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PRIZE_TIER_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                  >
                    {PRIZE_TIER_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs font-mono">
                            <div className="font-bold text-white">{d.name}</div>
                            <div className="text-amber-400 font-bold">{d.value}% ({d.count} Claims)</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="space-y-1.5 text-xs text-slate-300 font-sans border-t border-slate-800 pt-3">
            {PRIZE_TIER_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hot & Cold Lucky Numbers Frequency Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 font-mono shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Hot & Cold Lucky Number Frequency Matrix (1 - 50)</span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Historical draw frequency counts and hit probability percentages across 120 provably fair lottery draws.
            </p>
          </div>

          {/* Number Filter */}
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs self-start md:self-auto">
            <button
              onClick={() => {
                setNumberFilter('ALL');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                numberFilter === 'ALL'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Numbers (50)
            </button>
            <button
              onClick={() => {
                setNumberFilter('HOT');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 ${
                numberFilter === 'HOT'
                  ? 'bg-rose-500 text-slate-950 shadow-md font-black'
                  : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Hot Numbers</span>
            </button>
            <button
              onClick={() => {
                setNumberFilter('COLD');
                hapticEngine.trigger('click');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 ${
                numberFilter === 'COLD'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'text-cyan-400 hover:text-cyan-300'
              }`}
            >
              <Snowflake className="w-3.5 h-3.5" />
              <span>Cold Numbers</span>
            </button>
          </div>
        </div>

        {/* Number Matrix Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
          {filteredNumbers.map((item) => (
            <div
              key={item.num}
              className={`p-2.5 rounded-2xl border text-center transition-all hover:scale-105 cursor-pointer space-y-1 relative group ${
                item.status === 'HOT'
                  ? 'bg-gradient-to-b from-rose-950/60 to-slate-950 border-rose-500/50 shadow-lg shadow-rose-900/20'
                  : item.status === 'COLD'
                  ? 'bg-gradient-to-b from-cyan-950/60 to-slate-950 border-cyan-500/50'
                  : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <span className={`text-base font-black font-mono block ${
                item.status === 'HOT' ? 'text-rose-300' : item.status === 'COLD' ? 'text-cyan-300' : 'text-slate-200'
              }`}>
                {item.num < 10 ? `0${item.num}` : item.num}
              </span>

              <span className="text-[10px] text-slate-400 block font-mono">
                {item.draws} hits
              </span>

              {item.status === 'HOT' && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                  HOT
                </span>
              )}
              {item.status === 'COLD' && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                  COLD
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Big Winners Verifiable Feed Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verifiable Seafarer Winners Live Feed</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-sans">
              Cryptographically verified winning payouts disbursed across maritime fleets
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search officer, vessel, or ticket ID..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none font-sans"
            />
          </div>
        </div>

        {/* Winners Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="pb-3 font-bold">Winner & Rank</th>
                <th className="pb-3 font-bold">Vessel & Flag</th>
                <th className="pb-3 font-bold">Game Tier</th>
                <th className="pb-3 font-bold">Payout ($OD)</th>
                <th className="pb-3 font-bold">Claim Status</th>
                <th className="pb-3 font-bold text-right">Audit Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredWinners.map((w) => (
                <tr key={w.id} className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-3 pr-3">
                    <div className="font-bold text-white">{w.seafarerName}</div>
                    <span className="text-[10px] text-slate-400 font-sans">{w.rank}</span>
                  </td>
                  <td className="py-3 pr-3">
                    <div className="text-cyan-300 font-bold">{w.vessel}</div>
                    <span className="text-[10px] text-slate-400 font-sans">Flag: {w.flag}</span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                      {w.game}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <div className="text-amber-400 font-black text-sm">{w.payoutOD.toLocaleString()} $OD</div>
                    <span className="text-[10px] text-slate-400 font-sans">≈ ${w.fiatApproxUSD.toLocaleString()} USD</span>
                  </td>
                  <td className="py-3 pr-3">
                    {w.status === 'CLAIMED_BANK' && (
                      <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                        Winnings Bank
                      </span>
                    )}
                    {w.status === 'STAKED_VAULT' && (
                      <span className="text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                        12.8% Staking
                      </span>
                    )}
                    {w.status === 'WALLET_LIQUID' && (
                      <span className="text-amber-300 bg-amber-500/10 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                        Liquid Wallet
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedWinner(w);
                        hapticEngine.trigger('click');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline flex items-center justify-end space-x-1 ml-auto"
                    >
                      <span>{w.hash}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Audit Hash Verification View */}
      {selectedWinner && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 font-mono shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-bold text-white text-sm">Provably Fair Winner Certificate</h4>
              </div>
              <button
                onClick={() => setSelectedWinner(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Winner ID:</span>
                <span className="text-amber-400 font-bold">{selectedWinner.id}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Seafarer:</span>
                <span className="text-white font-bold">{selectedWinner.seafarerName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Vessel:</span>
                <span className="text-cyan-300 font-bold">{selectedWinner.vessel}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Winning Numbers:</span>
                <span className="text-amber-300 font-bold">{selectedWinner.numbersMatched}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payout Amount:</span>
                <span className="text-emerald-400 font-black">{selectedWinner.payoutOD.toLocaleString()} $OD</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                <span>On-Chain Hash:</span>
                <span className="text-slate-300 font-mono text-[10px]">{selectedWinner.hash}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedWinner(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              Close Verification Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
