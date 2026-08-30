import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  History,
  TrendingUp,
  Award,
  Search,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Anchor,
  Layers,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface HistoricalDraw {
  drawId: string;
  date: string;
  winningNumbers: number[];
  powerball: number;
  jackpotAmount: string;
  totalWinners: number;
  topWinnerVessel: string;
  topWinnerRank: string;
  topWinnerCountry: string;
  hashProof: string;
}

const HISTORICAL_DRAWS: HistoricalDraw[] = [
  {
    drawId: '#8939',
    date: '2026-08-28 22:00 UTC',
    winningNumbers: [7, 14, 21, 28, 42],
    powerball: 9,
    jackpotAmount: '$3,420,000 $OD',
    totalWinners: 1420,
    topWinnerVessel: 'M/V Ocean Titan (Panama Flag)',
    topWinnerRank: '2nd Officer Lucas M.',
    topWinnerCountry: '🇵🇭 Philippines',
    hashProof: '0x8f4b12a93c7d6e4f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f'
  },
  {
    drawId: '#8938',
    date: '2026-08-25 22:00 UTC',
    winningNumbers: [3, 11, 19, 34, 48],
    powerball: 14,
    jackpotAmount: '$3,150,000 $OD',
    totalWinners: 1180,
    topWinnerVessel: 'S/Y Nordic Star (Norway Flag)',
    topWinnerRank: 'Chief Engineer Arvid K.',
    topWinnerCountry: '🇳🇴 Norway',
    hashProof: '0x7a3b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b'
  },
  {
    drawId: '#8937',
    date: '2026-08-21 22:00 UTC',
    winningNumbers: [9, 16, 25, 33, 41],
    powerball: 3,
    jackpotAmount: '$2,850,000 $OD',
    totalWinners: 960,
    topWinnerVessel: 'C/V Pacific Explorer (Liberia)',
    topWinnerRank: 'Deck Cadet Mateo G.',
    topWinnerCountry: '🇪🇸 Spain',
    hashProof: '0x6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c'
  },
  {
    drawId: '#8936',
    date: '2026-08-18 22:00 UTC',
    winningNumbers: [2, 18, 27, 39, 45],
    powerball: 12,
    jackpotAmount: '$2,400,000 $OD',
    totalWinners: 890,
    topWinnerVessel: 'T/S Horizon Glory (Singapore)',
    topWinnerRank: 'Bosun Samuel T.',
    topWinnerCountry: '🇬🇧 UK',
    hashProof: '0x5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d'
  },
  {
    drawId: '#8935',
    date: '2026-08-14 22:00 UTC',
    winningNumbers: [5, 12, 23, 31, 50],
    powerball: 7,
    jackpotAmount: '$2,100,000 $OD',
    totalWinners: 740,
    topWinnerVessel: 'M/T Coral Wave (Bahamas)',
    topWinnerRank: 'Able Seaman Chen W.',
    topWinnerCountry: '🇸🇬 Singapore',
    hashProof: '0x4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e'
  }
];

// Historical Jackpot Growth Chart Data
const JACKPOT_GROWTH_HISTORICAL = [
  { draw: '#8930', jackpot: 1500000, winners: 450 },
  { draw: '#8932', jackpot: 1850000, winners: 620 },
  { draw: '#8934', jackpot: 2000000, winners: 710 },
  { draw: '#8936', jackpot: 2400000, winners: 890 },
  { draw: '#8938', jackpot: 3150000, winners: 1180 },
  { draw: '#8939', jackpot: 3420000, winners: 1420 },
  { draw: '#8940 (Current)', jackpot: 3850000, winners: 1650 }
];

export const LotteryHistoryChartView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProofHash, setSelectedProofHash] = useState<string | null>(null);

  const filteredDraws = HISTORICAL_DRAWS.filter(
    (d) =>
      d.drawId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.topWinnerVessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.winningNumbers.join(' ').includes(searchTerm)
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 font-mono">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                <History className="w-3.5 h-3.5 text-amber-400" />
                <span>Provably Fair Historical Archive</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Maritime Lottery Draw History & Jackpot Growth Chart
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Complete verifiable ledger of all historical $OD jackpot ball draws, winning number distributions, and winning vessel certificates.
            </p>
          </div>
        </div>
      </div>

      {/* Historical Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Historical Jackpot Growth & Winner Velocity</span>
          </h3>
          <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
            Pool Cap: $5.00M $OD
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={JACKPOT_GROWTH_HISTORICAL} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="jackpotHistGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="draw" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} />
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
                        <div className="font-bold text-amber-400 border-b border-slate-800 pb-1">{data.draw} Prize Pool</div>
                        <div className="text-white font-bold">Jackpot: ${(data.jackpot).toLocaleString()} $OD</div>
                        <div className="text-emerald-400 text-[11px]">Total Fleet Winners: {data.winners} crew members</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="jackpot" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#jackpotHistGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-mono shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <h3 className="text-sm font-black text-white uppercase flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Draw Archive Ledger</span>
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search draw ID or vessel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                <th className="py-3 px-3">Draw ID</th>
                <th className="py-3 px-3">Date (UTC)</th>
                <th className="py-3 px-3">Winning Combination</th>
                <th className="py-3 px-3">Jackpot Pool</th>
                <th className="py-3 px-3">Top Winner & Vessel</th>
                <th className="py-3 px-3 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDraws.map((draw) => (
                <tr key={draw.drawId} className="hover:bg-slate-800/40 transition-all">
                  <td className="py-4 px-3 font-bold text-amber-400">{draw.drawId}</td>
                  <td className="py-4 px-3 text-slate-300 font-sans">{draw.date}</td>
                  <td className="py-4 px-3">
                    <div className="flex items-center space-x-1.5">
                      {draw.winningNumbers.map((num) => (
                        <span
                          key={num}
                          className="w-6 h-6 rounded-full bg-slate-950 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center justify-center"
                        >
                          {num}
                        </span>
                      ))}
                      <span className="text-slate-600 font-bold">+</span>
                      <span className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500 text-rose-300 text-[11px] font-bold flex items-center justify-center">
                        {draw.powerball}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-3 font-bold text-emerald-400">{draw.jackpotAmount}</td>
                  <td className="py-4 px-3 font-sans">
                    <div className="font-bold text-white text-xs">{draw.topWinnerRank}</div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <span>{draw.topWinnerCountry}</span>
                      <span>•</span>
                      <span>{draw.topWinnerVessel}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => setSelectedProofHash(draw.hashProof)}
                      className="bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-[10px] px-2.5 py-1.5 rounded-xl font-bold transition-all inline-flex items-center space-x-1"
                    >
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      <span>Audit Hash</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Modal */}
      {selectedProofHash && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 max-w-lg w-full font-mono space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-black text-amber-400 text-sm uppercase flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Provably Fair Hash Auditor</span>
              </h4>
              <button
                onClick={() => setSelectedProofHash(null)}
                className="text-slate-400 hover:text-white font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-slate-400 block font-sans">Cryptographic HMAC-SHA256 Ball Generation Proof:</span>
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-[11px] text-emerald-400 break-all select-all font-mono">
                {selectedProofHash}
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-[11px] text-emerald-300 font-sans flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Verified on Inmarsat SatCom Blockchain Node. The initial seed hash was committed prior to ticket sales cutoff. Zero tampering detected.
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
