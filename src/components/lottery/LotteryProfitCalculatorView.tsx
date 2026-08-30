import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  Ticket,
  ShieldCheck,
  Award,
  Sparkles,
  RefreshCw,
  PieChart as PieChartIcon,
  HelpCircle,
  Coins,
  FileText,
  Download,
  Filter,
  Search,
  CheckCircle2,
  ArrowUpRight,
  UserCheck,
  History,
  Layers,
  CoinsIcon
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { hapticEngine } from '../../utils/hapticUtils';

interface ProfitLogEntry {
  id: string;
  drawRef: string;
  date: string;
  ticketVolume: number;
  ticketCostUSD: number;
  grossPayoutUSD: number;
  taxDutyUSD: number;
  netProfitUSD: number;
  roiPercentage: number;
  syndicateSharePercent: number;
  category: 'Crew Syndicate' | 'Personal Slip' | 'Duty-Free High Seas';
}

export const LotteryProfitCalculatorView: React.FC = () => {
  const [ticketCount, setTicketCount] = useState<number>(10);
  const [ticketPriceUSD, setTicketPriceUSD] = useState<number>(10); // $10 per ticket
  const [jackpotPoolUSD, setJackpotPoolUSD] = useState<number>(3850000); // $3.85M
  const [syndicateSharePercent, setSyndicateSharePercent] = useState<number>(100); // 100% personal or crew split
  const [targetPrizeTier, setTargetPrizeTier] = useState<'JACKPOT' | 'TIER_2' | 'TIER_3' | 'TIER_4'>('JACKPOT');
  const [taxRatePercent, setTaxRatePercent] = useState<number>(0); // UNCLOS High Seas Duty Free = 0%

  // Filter state for profit log
  const [logFilterCategory, setLogFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample profit logs
  const [profitLogs, setProfitLogs] = useState<ProfitLogEntry[]>([
    {
      id: 'LOG-8939',
      drawRef: 'Draw #8939',
      date: '2026-08-28',
      ticketVolume: 25,
      ticketCostUSD: 250,
      grossPayoutUSD: 150000,
      taxDutyUSD: 0,
      netProfitUSD: 149750,
      roiPercentage: 59900,
      syndicateSharePercent: 100,
      category: 'Duty-Free High Seas'
    },
    {
      id: 'LOG-8938',
      drawRef: 'Draw #8938',
      date: '2026-08-25',
      ticketVolume: 50,
      ticketCostUSD: 500,
      grossPayoutUSD: 15000,
      taxDutyUSD: 0,
      netProfitUSD: 14500,
      roiPercentage: 2900,
      syndicateSharePercent: 50,
      category: 'Crew Syndicate'
    },
    {
      id: 'LOG-8937',
      drawRef: 'Draw #8937',
      date: '2026-08-21',
      ticketVolume: 10,
      ticketCostUSD: 100,
      grossPayoutUSD: 500,
      taxDutyUSD: 0,
      netProfitUSD: 400,
      roiPercentage: 400,
      syndicateSharePercent: 100,
      category: 'Personal Slip'
    },
    {
      id: 'LOG-8936',
      drawRef: 'Draw #8936',
      date: '2026-08-18',
      ticketVolume: 30,
      ticketCostUSD: 300,
      grossPayoutUSD: 15000,
      taxDutyUSD: 1500,
      netProfitUSD: 13200,
      roiPercentage: 4400,
      syndicateSharePercent: 100,
      category: 'Personal Slip'
    }
  ]);

  // Prize payout mapping
  const prizePayouts = {
    JACKPOT: jackpotPoolUSD,
    TIER_2: 150000,
    TIER_3: 15000,
    TIER_4: 500
  };

  const selectedPayout = prizePayouts[targetPrizeTier];
  const totalCost = ticketCount * ticketPriceUSD;
  const grossWin = (selectedPayout * (syndicateSharePercent / 100));
  const taxDeduction = (grossWin * (taxRatePercent / 100));
  const netProfit = grossWin - taxDeduction - totalCost;
  const roiPercentage = totalCost > 0 ? ((netProfit / totalCost) * 100) : 0;

  // Breakdown Chart Data
  const chartData = [
    { name: 'Net Profit ($OD)', value: Math.max(0, netProfit), color: '#10b981' },
    { name: 'Total Ticket Cost ($OD)', value: totalCost, color: '#3b82f6' },
    { name: 'Maritime Duty/Tax ($OD)', value: taxDeduction, color: '#f59e0b' }
  ];

  // Log calculation result into ledger
  const handleLogCurrentCalculation = () => {
    hapticEngine.trigger('success');
    const newEntry: ProfitLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      drawRef: `Simulated Draw #${Math.floor(Math.random() * 50) + 8940}`,
      date: new Date().toISOString().split('T')[0],
      ticketVolume: ticketCount,
      ticketCostUSD: totalCost,
      grossPayoutUSD: grossWin,
      taxDutyUSD: taxDeduction,
      netProfitUSD: netProfit,
      roiPercentage: roiPercentage,
      syndicateSharePercent: syndicateSharePercent,
      category: syndicateSharePercent < 100 ? 'Crew Syndicate' : taxRatePercent === 0 ? 'Duty-Free High Seas' : 'Personal Slip'
    };

    setProfitLogs((prev) => [newEntry, ...prev]);
  };

  // Filtered log entries
  const filteredLogs = profitLogs.filter((log) => {
    const matchesCat = logFilterCategory === 'ALL' || log.category === logFilterCategory;
    const matchesQuery = log.drawRef.toLowerCase().includes(searchQuery.toLowerCase()) || log.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 font-mono">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>Maritime Duty-Free Return Calculator</span>
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>UNCLOS Flag State Tax Exemption</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Lottery Profit Calculator & Earnings Summary
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Model estimated gross payouts, syndicate pool share allocations, ticket purchase volume costs, and track cumulative earnings in an audit-ready profit log.
            </p>
          </div>
        </div>
      </div>

      {/* LOTTERY EARNING SUMMARY DASHBOARD */}
      <div className="space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Lottery Earnings Summary & Cumulative Dividends</span>
          </h3>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            High Seas High Yield Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Lifetime Net Earnings</span>
            <div className="text-2xl font-black text-emerald-400">$177,850 $OD</div>
            <span className="text-[10px] text-slate-400 font-sans block">+5,820% Lifetime Net Yield</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Syndicate Dividends Paid</span>
            <div className="text-2xl font-black text-cyan-400">$45,200 $OD</div>
            <span className="text-[10px] text-slate-400 font-sans block">Distributed to 12 Vessel Crew</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Slips Managed</span>
            <div className="text-2xl font-black text-white">115 Slips</div>
            <span className="text-[10px] text-slate-400 font-sans block">$10 $OD Ticket Base Rate</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Best Single Draw Payout</span>
            <div className="text-2xl font-black text-amber-400">$149,750 $OD</div>
            <span className="text-[10px] text-slate-400 font-sans block">Draw #8939 Tier 2 Match</span>
          </div>
        </div>
      </div>

      {/* CALCULATOR CONTROLS & PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 font-mono shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Calculator Inputs</span>
            </h3>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              Real-Time Model
            </span>
          </div>

          {/* Ticket Count Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">Ticket Purchase Volume:</span>
              <span className="text-emerald-400 font-black">{ticketCount} Slips</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={ticketCount}
              onChange={(e) => {
                setTicketCount(Number(e.target.value));
                hapticEngine.trigger('light');
              }}
              className="w-full accent-emerald-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Target Prize Tier */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300 block">Target Winning Tier:</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'JACKPOT', label: 'Grand Jackpot', amount: '$3.85M' },
                { id: 'TIER_2', label: 'Match 5/5', amount: '$150,000' },
                { id: 'TIER_3', label: 'Match 4+1', amount: '$15,000' },
                { id: 'TIER_4', label: 'Match 3+1', amount: '$500' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => {
                    setTargetPrizeTier(tier.id as any);
                    hapticEngine.trigger('click');
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    targetPrizeTier === tier.id
                      ? 'bg-emerald-500/20 text-white border-emerald-400 shadow-lg'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">{tier.label}</div>
                  <div className="text-xs font-black text-amber-400">{tier.amount}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Syndicate Share Percent */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">Crew Syndicate Share:</span>
              <span className="text-cyan-400 font-black">{syndicateSharePercent}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={syndicateSharePercent}
              onChange={(e) => {
                setSyndicateSharePercent(Number(e.target.value));
                hapticEngine.trigger('light');
              }}
              className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* High Seas Tax Rate */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">Maritime Tax / Flag State Duty:</span>
              <span className="text-amber-400 font-black">{taxRatePercent}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTaxRatePercent(0)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border ${
                  taxRatePercent === 0
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                0% (UNCLOS Duty Free)
              </button>
              <button
                onClick={() => setTaxRatePercent(10)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border ${
                  taxRatePercent === 10
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                10% (Standard Flag State)
              </button>
            </div>
          </div>

          <button
            onClick={handleLogCurrentCalculation}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 mt-2"
          >
            <FileText className="w-4 h-4" />
            <span>Save Calculation to Profit Log</span>
          </button>
        </div>

        {/* Output Calculation Cards & Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          {/* ROI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Investment Cost</span>
              <div className="text-2xl font-black text-white">${totalCost.toLocaleString()} $OD</div>
              <span className="text-[10px] text-slate-400 font-sans block">{ticketCount} Slips × $10</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Gross Allocated Prize</span>
              <div className="text-2xl font-black text-cyan-400">${grossWin.toLocaleString()} $OD</div>
              <span className="text-[10px] text-slate-400 font-sans block">{syndicateSharePercent}% Syndicate Share</span>
            </div>

            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 space-y-1 shadow-2xl bg-gradient-to-b from-emerald-950/20 to-slate-900">
              <span className="text-[10px] text-emerald-400 block uppercase font-bold">Estimated Net Profit</span>
              <div className="text-2xl font-black text-emerald-400">${netProfit.toLocaleString()} $OD</div>
              <span className="text-[10px] text-emerald-300 font-sans font-bold block">
                Net ROI: +{roiPercentage.toLocaleString(undefined, { maximumFractionDigits: 1 })}%
              </span>
            </div>
          </div>

          {/* Graphical Allocation Pie Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
                <PieChartIcon className="w-4 h-4 text-emerald-400" />
                <span>Payout Breakdown & Profit Allocation Matrix</span>
              </h3>
            </div>

            <div className="h-60 w-full flex flex-col sm:flex-row items-center justify-between">
              <div className="h-full w-full sm:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl shadow-xl font-mono text-xs">
                              <span className="font-bold text-white">{data.name}: </span>
                              <span className="font-black text-emerald-400">${data.value.toLocaleString()} $OD</span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full sm:w-1/2 space-y-3 font-sans text-xs">
                {chartData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300 font-bold">{item.name}</span>
                    </div>
                    <span className="font-mono font-black text-white">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOTTERY PROFIT LOG LEDGER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 font-mono space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-black text-white uppercase flex items-center space-x-2">
              <History className="w-4 h-4 text-emerald-400" />
              <span>Lottery Profit Log & Calculation Ledger</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Archive of verified ticket allocations, net profit logs, and syndicate dividends.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search draw ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono w-40"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1">
          {['ALL', 'Duty-Free High Seas', 'Crew Syndicate', 'Personal Slip'].map((cat) => (
            <button
              key={cat}
              onClick={() => setLogFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                logFilterCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-bold uppercase">
                <th className="py-3 px-3">Draw Ref</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Slips</th>
                <th className="py-3 px-3 text-right">Cost</th>
                <th className="py-3 px-3 text-right">Gross Win</th>
                <th className="py-3 px-3 text-right">Net Profit</th>
                <th className="py-3 px-3 text-right">ROI %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-950/50 transition-all font-mono">
                  <td className="py-3.5 px-3 font-black text-white">{log.drawRef}</td>
                  <td className="py-3.5 px-3 text-slate-400 text-[11px] font-sans">{log.date}</td>
                  <td className="py-3.5 px-3">
                    <span className="bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-300">{log.ticketVolume}</td>
                  <td className="py-3.5 px-3 text-right text-slate-300">${log.ticketCostUSD.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-right font-bold text-cyan-400">${log.grossPayoutUSD.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-right font-black text-emerald-400">${log.netProfitUSD.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                      +{log.roiPercentage.toLocaleString()}%
                    </span>
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
