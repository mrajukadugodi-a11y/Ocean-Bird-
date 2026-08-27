import React, { useState } from 'react';
import {
  Vote,
  TrendingUp,
  Coins,
  Landmark,
  ShieldCheck,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Filter,
  BarChart3,
  FileText,
  AlertCircle,
  ArrowUpRight,
  RefreshCw,
  Users,
  Search,
  Scale,
  Award,
  Layers
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface DaoProposal {
  id: string;
  title: string;
  category: 'STAKING_REWARDS' | 'TOKENOMICS' | 'TREASURY_ALLOCATION' | 'PROTOCOL_UPGRADE';
  proposer: string;
  proposerRole: string;
  status: 'ACTIVE_VOTING' | 'PASSED' | 'EXECUTED' | 'DEFEATED' | 'IN_REVIEW';
  summary: string;
  executionDetails: string;
  requestedTreasuryOd?: number;
  votesForOd: number;
  votesAgainstOd: number;
  votesAbstainOd: number;
  quorumThresholdPercent: number;
  totalEligibleVotesOd: number;
  daysRemaining: number;
  createdAt: string;
  userVoted?: 'FOR' | 'AGAINST' | 'ABSTAIN';
}

const INITIAL_PROPOSALS: DaoProposal[] = [
  {
    id: 'ODP-048',
    title: 'Increase 365-Day Gold Reserve Vault APY to 26.5% & Expand Bullion Assay',
    category: 'STAKING_REWARDS',
    proposer: 'Sovereign Treasury Council',
    proposerRole: 'Tier-1 Protocol Delegate',
    status: 'ACTIVE_VOTING',
    summary: 'Adjust the 365-day locked staking pool yield from 24.8% to 26.5% APY, backed by newly acquired 24K Swiss gold bullion reserves stored in Zurich & Chittagong vaults.',
    executionDetails: 'Smart contract parameter update to Pool-365d interest yield multiplier; allocate +$1.2M $OD from port demurrage revenues into reserve vault escrow.',
    votesForOd: 4850000,
    votesAgainstOd: 420000,
    votesAbstainOd: 150000,
    quorumThresholdPercent: 60,
    totalEligibleVotesOd: 7500000,
    daysRemaining: 4,
    createdAt: '2026-08-22'
  },
  {
    id: 'ODP-047',
    title: 'Treasury Grant: $2.5M $OD Allocation for Bay of Bengal Autonomous Tugboat Fleet',
    category: 'TREASURY_ALLOCATION',
    proposer: 'Chittagong & Mongla Maritime Authority',
    proposerRole: 'Regional Port Representative',
    status: 'ACTIVE_VOTING',
    summary: 'Grant 2,500,000 $OD from community treasury funds to co-finance zero-emission autonomous port tugboats, lowering vessel docking delays by 35%.',
    executionDetails: 'Disburse funds in 4 tranches linked to hull assembly, electric engine certification, harbor trial, and full clearance integration.',
    requestedTreasuryOd: 2500000,
    votesForOd: 3900000,
    votesAgainstOd: 2100000,
    votesAbstainOd: 300000,
    quorumThresholdPercent: 65,
    totalEligibleVotesOd: 7500000,
    daysRemaining: 2,
    createdAt: '2026-08-20'
  },
  {
    id: 'ODP-046',
    title: 'Tokenomics Upgrade: Implement 0.25% Automatic $OD Burn on High-Seas Demurrage Settlements',
    category: 'TOKENOMICS',
    proposer: 'Global Freight Forwarders Alliance',
    proposerRole: 'Institutional Member',
    status: 'PASSED',
    summary: 'Introduce a deflationary micro-burn of 0.25% on container demurrage and pilotage settlement fees paid in $OD to increase long-term token scarcity.',
    executionDetails: 'Burn mechanism embedded into the port settlement gateway; burned tokens strictly deducted from gross protocol transaction fees.',
    votesForOd: 5800000,
    votesAgainstOd: 890000,
    votesAbstainOd: 210000,
    quorumThresholdPercent: 60,
    totalEligibleVotesOd: 7500000,
    daysRemaining: 0,
    createdAt: '2026-08-10'
  },
  {
    id: 'ODP-045',
    title: 'Protocol Upgrade: Integration of Multi-Model AI Demurrage Forecasting Engine',
    category: 'PROTOCOL_UPGRADE',
    proposer: 'Super Master AI Guild',
    proposerRole: 'Core Tech Advisory',
    status: 'EXECUTED',
    summary: 'Deploy real-time machine learning models to dynamically calculate demurrage rates based on port congestion, tide schedules, and cyclone warnings.',
    executionDetails: 'Activated on mainnet protocol v4.2; integrated with Port Traffic Forecast API.',
    votesForOd: 6200000,
    votesAgainstOd: 310000,
    votesAbstainOd: 100000,
    quorumThresholdPercent: 50,
    totalEligibleVotesOd: 7500000,
    daysRemaining: 0,
    createdAt: '2026-08-01'
  }
];

export const OceanDollarDaoGovernancePortal: React.FC = () => {
  const [proposals, setProposals] = useState<DaoProposal[]>(INITIAL_PROPOSALS);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userVotingPowerOd] = useState<number>(842500); // User's staked voting weight

  // Modal States
  const [selectedProposal, setSelectedProposal] = useState<DaoProposal | null>(null);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState<boolean>(false);
  const [isNewProposalModalOpen, setIsNewProposalModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'PROPOSALS' | 'TREASURY_GRANTS' | 'GOVERNANCE_RULES'>('PROPOSALS');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Proposal Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'STAKING_REWARDS' | 'TOKENOMICS' | 'TREASURY_ALLOCATION' | 'PROTOCOL_UPGRADE'>('STAKING_REWARDS');
  const [newSummary, setNewSummary] = useState<string>('');
  const [newExecutionDetails, setNewExecutionDetails] = useState<string>('');
  const [newRequestedOd, setNewRequestedOd] = useState<number>(0);
  const [newDurationDays, setNewDurationDays] = useState<number>(7);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCastVote = (proposalId: string, voteType: 'FOR' | 'AGAINST' | 'ABSTAIN') => {
    setIsSubmitting(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setProposals((prev) =>
        prev.map((prop) => {
          if (prop.id !== proposalId) return prop;

          let addFor = 0;
          let addAgainst = 0;
          let addAbstain = 0;

          if (voteType === 'FOR') addFor = userVotingPowerOd;
          if (voteType === 'AGAINST') addAgainst = userVotingPowerOd;
          if (voteType === 'ABSTAIN') addAbstain = userVotingPowerOd;

          return {
            ...prop,
            votesForOd: prop.votesForOd + addFor,
            votesAgainstOd: prop.votesAgainstOd + addAgainst,
            votesAbstainOd: prop.votesAbstainOd + addAbstain,
            userVoted: voteType
          };
        })
      );

      setIsSubmitting(false);
      setIsVoteModalOpen(false);
      hapticEngine.trigger('success');
      showToast(`Successfully cast ${userVotingPowerOd.toLocaleString()} $OD votes ${voteType} proposal ${proposalId}!`);
    }, 1000);
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) {
      showToast('Please fill in proposal title and summary.');
      return;
    }

    setIsSubmitting(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      const created: DaoProposal = {
        id: `ODP-0${Math.floor(49 + Math.random() * 50)}`,
        title: newTitle,
        category: newCategory,
        proposer: 'Your Staked Wallet (Delegated Member)',
        proposerRole: 'Governance Delegate',
        status: 'ACTIVE_VOTING',
        summary: newSummary,
        executionDetails: newExecutionDetails || 'Execution param queued for governance validation.',
        requestedTreasuryOd: newRequestedOd > 0 ? newRequestedOd : undefined,
        votesForOd: userVotingPowerOd,
        votesAgainstOd: 0,
        votesAbstainOd: 0,
        quorumThresholdPercent: 60,
        totalEligibleVotesOd: 7500000,
        daysRemaining: newDurationDays,
        createdAt: new Date().toISOString().split('T')[0],
        userVoted: 'FOR'
      };

      setProposals([created, ...proposals]);
      setNewTitle('');
      setNewSummary('');
      setNewExecutionDetails('');
      setNewRequestedOd(0);
      setIsSubmitting(false);
      setIsNewProposalModalOpen(false);
      hapticEngine.trigger('success');
      showToast(`Proposal ${created.id} successfully published to DAO voting queue!`);
    }, 1200);
  };

  const filteredProposals = proposals.filter((p) => {
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCat && matchesSearch;
  });

  return (
    <div id="ocean-dollar-dao-governance-portal" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              DECENTRALIZED AUTONOMOUS ORGANISATION (DAO V4.0)
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <Vote className="w-8 h-8 text-cyan-400" />
            <span>Ocean Dollar DAO Governance Portal</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Propose, deliberate, and vote on staking APY structures, gold backing tokenomics adjustments, and community treasury allocations.
          </p>
        </div>

        {/* Tab Selector & Create Button */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-2xl">
            {(['PROPOSALS', 'TREASURY_GRANTS', 'GOVERNANCE_RULES'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActiveTab(t);
                  hapticEngine.trigger('click');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsNewProposalModalOpen(true);
              hapticEngine.trigger('click');
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg transition-all flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Proposal</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="bg-cyan-950 border border-cyan-500/50 text-cyan-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce relative z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-cyan-400">✕</button>
        </div>
      )}

      {/* Stats KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 font-mono text-xs">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold">DAO Treasury Reserves</span>
            <Landmark className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">$14,250,000 $OD</div>
          <p className="text-[10px] text-slate-400 font-sans">Backed by 24K Gold Bullion &amp; Port Tariff Revenues</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold">Your Voting Power</span>
            <Coins className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">{userVotingPowerOd.toLocaleString()} $OD</div>
          <p className="text-[10px] text-slate-400 font-sans">Derived from Staked Vault Positions (1:1 Weight)</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold">Active Proposals</span>
            <Vote className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {proposals.filter((p) => p.status === 'ACTIVE_VOTING').length} Active
          </div>
          <p className="text-[10px] text-slate-400 font-sans">Open for Voting &amp; Community Deliberation</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold">Quorum Requirement</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300">60.0% Minimum</div>
          <p className="text-[10px] text-slate-400 font-sans">Avg Participation Rate: <strong className="text-emerald-400">78.4%</strong></p>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'PROPOSALS' && (
        <div className="space-y-6 relative z-10 font-mono text-xs">
          {/* Controls & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900 border border-slate-800">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search proposals by title, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Category Dropdown */}
              <div className="flex items-center space-x-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] text-slate-400 font-bold uppercase">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Categories</option>
                  <option value="STAKING_REWARDS">Staking Rewards</option>
                  <option value="TOKENOMICS">Tokenomics</option>
                  <option value="TREASURY_ALLOCATION">Treasury Allocation</option>
                  <option value="PROTOCOL_UPGRADE">Protocol Upgrade</option>
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE_VOTING">Active Voting</option>
                  <option value="PASSED">Passed</option>
                  <option value="EXECUTED">Executed</option>
                  <option value="DEFEATED">Defeated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Proposals List Cards */}
          <div className="space-y-4">
            {filteredProposals.map((proposal) => {
              const totalVotes = proposal.votesForOd + proposal.votesAgainstOd + proposal.votesAbstainOd;
              const forPercent = totalVotes > 0 ? (proposal.votesForOd / totalVotes) * 100 : 0;
              const againstPercent = totalVotes > 0 ? (proposal.votesAgainstOd / totalVotes) * 100 : 0;
              const abstainPercent = totalVotes > 0 ? (proposal.votesAbstainOd / totalVotes) * 100 : 0;
              const quorumTurnoutPercent = (totalVotes / proposal.totalEligibleVotesOd) * 100;
              const isQuorumReached = quorumTurnoutPercent >= proposal.quorumThresholdPercent;

              return (
                <div
                  key={proposal.id}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 hover:border-cyan-500/40 transition-all shadow-xl"
                >
                  {/* Proposal Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-amber-400 font-black text-sm">{proposal.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        proposal.category === 'STAKING_REWARDS'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : proposal.category === 'TOKENOMICS'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : proposal.category === 'TREASURY_ALLOCATION'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }`}>
                        {proposal.category.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                        proposal.status === 'ACTIVE_VOTING'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 animate-pulse'
                          : proposal.status === 'PASSED' || proposal.status === 'EXECUTED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                      }`}>
                        {proposal.status.replace('_', ' ')}
                      </span>

                      {proposal.status === 'ACTIVE_VOTING' && (
                        <span className="text-[11px] text-slate-400 font-bold flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{proposal.daysRemaining} Days Left</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white">{proposal.title}</h3>
                    <p className="text-slate-300 text-xs font-sans leading-relaxed">{proposal.summary}</p>
                    
                    {proposal.requestedTreasuryOd && (
                      <div className="inline-flex items-center space-x-2 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-xl text-emerald-300 text-[11px] font-bold">
                        <Coins className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Requested Treasury Allocation: ${(proposal.requestedTreasuryOd / 1000000).toFixed(2)}M $OD</span>
                      </div>
                    )}
                  </div>

                  {/* Proposer Info & Execution Notes */}
                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Submitted By: <strong className="text-white">{proposal.proposer}</strong> ({proposal.proposerRole})</span>
                      <span>Date: <strong className="text-slate-300">{proposal.createdAt}</strong></span>
                    </div>
                    <div>
                      <span className="text-cyan-400 font-bold">Execution Plan: </span>
                      <span className="text-slate-300 font-sans">{proposal.executionDetails}</span>
                    </div>
                  </div>

                  {/* Voting Distribution Visual Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 font-bold">Voting Breakdown (Total: {(totalVotes / 1000000).toFixed(2)}M $OD Weight)</span>
                      <span className="text-slate-400">
                        Quorum Turnout: <strong className={isQuorumReached ? 'text-emerald-400' : 'text-amber-400'}>{quorumTurnoutPercent.toFixed(1)}%</strong> / {proposal.quorumThresholdPercent}% Req.
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                      <div style={{ width: `${forPercent}%` }} className="bg-emerald-500 h-full transition-all" title={`For: ${forPercent.toFixed(1)}%`} />
                      <div style={{ width: `${againstPercent}%` }} className="bg-rose-500 h-full transition-all" title={`Against: ${againstPercent.toFixed(1)}%`} />
                      <div style={{ width: `${abstainPercent}%` }} className="bg-amber-500 h-full transition-all" title={`Abstain: ${abstainPercent.toFixed(1)}%`} />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                      <span className="text-emerald-400">FOR: {forPercent.toFixed(1)}% ({(proposal.votesForOd / 1000000).toFixed(2)}M $OD)</span>
                      <span className="text-rose-400">AGAINST: {againstPercent.toFixed(1)}% ({(proposal.votesAgainstOd / 1000000).toFixed(2)}M $OD)</span>
                      <span className="text-amber-400">ABSTAIN: {abstainPercent.toFixed(1)}% ({(proposal.votesAbstainOd / 1000000).toFixed(2)}M $OD)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                    {proposal.userVoted ? (
                      <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>You voted <strong>{proposal.userVoted}</strong> with {userVotingPowerOd.toLocaleString()} $OD weight</span>
                      </div>
                    ) : proposal.status === 'ACTIVE_VOTING' ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCastVote(proposal.id, 'FOR')}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Vote FOR</span>
                        </button>
                        <button
                          onClick={() => handleCastVote(proposal.id, 'AGAINST')}
                          className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs uppercase rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Vote AGAINST</span>
                        </button>
                        <button
                          onClick={() => handleCastVote(proposal.id, 'ABSTAIN')}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase rounded-xl transition-all"
                        >
                          Abstain
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-500 text-xs font-bold italic">Voting period has ended</span>
                    )}

                    <button
                      onClick={() => {
                        setSelectedProposal(proposal);
                        setIsVoteModalOpen(true);
                        hapticEngine.trigger('click');
                      }}
                      className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
                    >
                      <span>Proposal Audit Logs &amp; Specs</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'TREASURY_GRANTS' && (
        <div className="space-y-6 relative z-10 font-mono text-xs">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
              <Landmark className="w-5 h-5 text-amber-400" />
              <span>Community Treasury Grants &amp; Infrastructure Allocations</span>
            </h3>

            <p className="text-slate-300 text-xs font-sans">
              The Ocean Dollar DAO community treasury is funded by a 15% protocol share of port container demurrage fees, harbor pilot tariffs, and gold vault minting revenues.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Port Modernization Grants</span>
                <span className="text-xl font-black text-emerald-400 block">$4,200,000 $OD</span>
                <span className="text-[10px] text-slate-400">Allocated across 8 Bay of Bengal &amp; Malacca ports</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Green Maritime R&amp;D</span>
                <span className="text-xl font-black text-cyan-400 block">$3,100,000 $OD</span>
                <span className="text-[10px] text-slate-400">Hydrogen refueling &amp; microplastic cleanup tugs</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Seafarer Welfare &amp; Telecom</span>
                <span className="text-xl font-black text-amber-400 block">$1,850,000 $OD</span>
                <span className="text-[10px] text-slate-400">Free satellite SOS telecom &amp; medical coverage</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'GOVERNANCE_RULES' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 relative z-10 font-mono text-xs max-w-3xl mx-auto shadow-xl">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Scale className="w-5 h-5 text-purple-400" />
            <span>DAO Governance Architecture &amp; Voting Constitution</span>
          </h3>

          <div className="space-y-4 text-slate-300 font-sans leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h4 className="text-amber-400 font-bold font-mono text-xs uppercase">1. Voting Power Calculation</h4>
              <p className="text-xs">
                Voting power is strictly proportional to your staked $OD token balance across the 30-day, 90-day, and 365-day gold reserve vaults (1 Staked $OD = 1 Vote Weight). Liquid un-staked tokens carry 0 voting weight to prevent flash-loan governance manipulation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h4 className="text-cyan-400 font-bold font-mono text-xs uppercase">2. Quorum &amp; Pass Thresholds</h4>
              <p className="text-xs">
                Standard proposal execution requires a minimum 60% quorum turnout of total staked $OD tokens and a &gt;50% simple majority vote FOR. Treasury allocation grants exceeding $1,000,000 $OD require a 65% supermajority.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h4 className="text-emerald-400 font-bold font-mono text-xs uppercase">3. Timelock Execution &amp; Emergency Pause</h4>
              <p className="text-xs">
                Passed proposals enter a mandatory 48-hour cryptographic timelock prior to smart contract execution. During the timelock window, the Super Master Cyber Defense Squad can initiate an emergency security pause if anomalous transactions are detected.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Details Modal */}
      {isVoteModalOpen && selectedProposal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border-2 border-cyan-500/60 rounded-3xl p-6 max-w-xl w-full space-y-5 font-mono text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 font-black">{selectedProposal.id}</span>
                <h3 className="text-sm font-black text-white">{selectedProposal.title}</h3>
              </div>
              <button onClick={() => setIsVoteModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-slate-300 font-sans text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Abstract &amp; Rationale</span>
                <p className="mt-1 bg-slate-950 p-3 rounded-2xl border border-slate-800">{selectedProposal.summary}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Technical Execution Specification</span>
                <p className="mt-1 bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-[11px] text-cyan-300">
                  {selectedProposal.executionDetails}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Proposer</span>
                  <strong className="text-white block">{selectedProposal.proposer}</strong>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Current Quorum Turnout</span>
                  <strong className="text-emerald-400 block font-bold">
                    {((selectedProposal.votesForOd + selectedProposal.votesAgainstOd + selectedProposal.votesAbstainOd) / selectedProposal.totalEligibleVotesOd * 100).toFixed(1)}%
                  </strong>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsVoteModalOpen(false)}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase shadow-lg"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Proposal Modal */}
      {isNewProposalModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleCreateProposal}
            className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 max-w-lg w-full space-y-4 font-mono text-xs shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <span>Submit New Ocean Dollar DAO Proposal</span>
              </h3>
              <button type="button" onClick={() => setIsNewProposalModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-[10px] uppercase block mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Expand Gold Reserve Assay in Singapore Vault"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-[10px] uppercase block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs focus:outline-none"
                  >
                    <option value="STAKING_REWARDS">Staking Rewards</option>
                    <option value="TOKENOMICS">Tokenomics</option>
                    <option value="TREASURY_ALLOCATION">Treasury Allocation</option>
                    <option value="PROTOCOL_UPGRADE">Protocol Upgrade</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] uppercase block mb-1">Voting Period</label>
                  <select
                    value={newDurationDays}
                    onChange={(e) => setNewDurationDays(Number(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs focus:outline-none"
                  >
                    <option value={7}>7 Days</option>
                    <option value={14}>14 Days</option>
                    <option value={30}>30 Days</option>
                  </select>
                </div>
              </div>

              {newCategory === 'TREASURY_ALLOCATION' && (
                <div>
                  <label className="text-slate-400 text-[10px] uppercase block mb-1">Requested Treasury Amount ($OD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 500000"
                    value={newRequestedOd}
                    onChange={(e) => setNewRequestedOd(Number(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-slate-400 text-[10px] uppercase block mb-1">Proposal Abstract &amp; Summary</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide detailed justification and objectives..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[10px] uppercase block mb-1">Smart Contract / Technical Execution Specs</label>
                <input
                  type="text"
                  placeholder="e.g. Update VaultContract.setApyRate(26.5)"
                  value={newExecutionDetails}
                  onChange={(e) => setNewExecutionDetails(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-[10px] space-y-1">
                <span className="font-bold uppercase block">Staking Requirement Check:</span>
                <p className="font-sans text-slate-200">
                  Submitting a proposal requires a minimum of 1,000 $OD staked. Your active voting power: <strong>{userVotingPowerOd.toLocaleString()} $OD</strong> (VERIFIED).
                </p>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsNewProposalModalOpen(false)}
                className="w-1/2 py-3 bg-slate-950 border border-slate-800 text-slate-400 font-bold rounded-2xl hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-lg flex items-center justify-center space-x-2 uppercase"
              >
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Vote className="w-4 h-4" />}
                <span>{isSubmitting ? 'Publishing...' : 'Submit Proposal'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
