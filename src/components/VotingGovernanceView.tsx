import React, { useState } from 'react';
import {
  Vote,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Clock,
  TrendingUp,
  Award,
  PlusCircle,
  Users,
  Search,
  Filter,
  FileText,
  Lock,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
  Send,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  Building,
  DollarSign
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface VotingProposal {
  id: string;
  title: string;
  proposer: string;
  proposerRole: string;
  category: 'PROTOCOL_REVENUE' | 'STAKING_YIELD' | 'TREASURY_GRANT' | 'PORT_DEMURRAGE' | 'SECURITY_AUDIT';
  status: 'ACTIVE' | 'PASSED' | 'QUEUED_TIMELOCK' | 'EXECUTED' | 'REJECTED';
  summary: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  quorumTarget: number;
  totalQuorumCurrent: number;
  createdAt: string;
  endsAt: string;
  targetContract: string;
  requestedTreasuryOd?: number;
  userVoted?: 'FOR' | 'AGAINST' | 'ABSTAIN';
  userVoteRationale?: string;
  comments: Array<{
    id: string;
    author: string;
    role: string;
    voteType: 'FOR' | 'AGAINST' | 'ABSTAIN';
    timestamp: string;
    comment: string;
  }>;
}

export interface Delegate {
  id: string;
  name: string;
  role: string;
  address: string;
  delegatedVotes: number;
  proposalsVotedCount: number;
  participationRatePct: number;
  avatarIcon: string;
}

const INITIAL_PROPOSALS: VotingProposal[] = [
  {
    id: 'OD-VOTE-045',
    title: 'Proposal 045: Increase Staking APY for 365-Day Vaults to 24.8% $OD',
    proposer: 'Captain V. Sharma',
    proposerRole: 'Chief Maritime Treasury Delegate',
    category: 'STAKING_YIELD',
    status: 'ACTIVE',
    summary: 'Adjust annual staking yield incentive for long-term 365-day locked gold vault accounts to boost protocol liquidity.',
    description: 'This proposal requests the DAO Treasury to allocate an additional 2.50M $OD per epoch to reward long-term liquid vault stakers. With gold backing maintaining 1:1 parity, increasing the 365-day lockup APY from 18.5% to 24.8% will incentivize sustained capital retention across all South Asian maritime hubs.',
    votesFor: 24500000,
    votesAgainst: 1200000,
    votesAbstain: 350000,
    quorumTarget: 20000000,
    totalQuorumCurrent: 26050000,
    createdAt: '2026-08-25 10:00 UTC',
    endsAt: '2026-08-29 23:59 UTC',
    targetContract: '0x8f2a...99c4 (StakingVaultManager.sol)',
    requestedTreasuryOd: 2500000,
    userVoted: undefined,
    comments: [
      {
        id: 'c1',
        author: 'Monaco Maritime Guild',
        role: 'Institutional Delegate',
        voteType: 'FOR',
        timestamp: '2026-08-25 14:30 UTC',
        comment: 'Strongly support. High retention yields align with Zurich gold reserve growth.'
      },
      {
        id: 'c2',
        author: 'Colombo Port Operations',
        role: 'Port Authority Delegate',
        voteType: 'FOR',
        timestamp: '2026-08-26 09:15 UTC',
        comment: 'Voted YES. Helps stabilize regional liquidity during peak monsoon trading months.'
      }
    ]
  },
  {
    id: 'OD-VOTE-044',
    title: 'Proposal 044: Allocate 10% Protocol Seigniorage to Developer Guild & Firebase Infra',
    proposer: 'Dev Guild Council',
    proposerRole: 'Core Protocol Developers',
    category: 'PROTOCOL_REVENUE',
    status: 'ACTIVE',
    summary: 'Ratify formal 10% Developer Guild payout share & 10% Firebase database infrastructure maintenance allocation.',
    description: 'Establishes automated daily smart contract revenue distribution to fund core developer rewards (10%) and Firebase Cloud Firestore DB / Auth infrastructure nodes (10%). Includes real-time automated email informing alerts to registered developer email addresses.',
    votesFor: 31200000,
    votesAgainst: 450000,
    votesAbstain: 100000,
    quorumTarget: 15000000,
    totalQuorumCurrent: 31750000,
    createdAt: '2026-08-24 08:00 UTC',
    endsAt: '2026-08-28 18:00 UTC',
    targetContract: '0x71b3...19e0 (DeveloperRoyaltySplitter.sol)',
    requestedTreasuryOd: 1000000,
    userVoted: 'FOR',
    userVoteRationale: 'Vital for platform longevity and cloud infrastructure uptime.',
    comments: [
      {
        id: 'c3',
        author: 'Seafarer Union Representative',
        role: 'Community Delegate',
        voteType: 'FOR',
        timestamp: '2026-08-24 11:20 UTC',
        comment: 'Continuous developer maintenance is essential for vessel satellite navigation reliability.'
      }
    ]
  },
  {
    id: 'OD-VOTE-043',
    title: 'Proposal 043: Emergency Dredging & Deep-Water Berth Expansion Grant for Chittagong Port',
    proposer: 'Chittagong Port Authority',
    proposerRole: 'Regional Port Representative',
    category: 'TREASURY_GRANT',
    status: 'QUEUED_TIMELOCK',
    summary: 'Disburse 4.50M $OD treasury grant for deep-water berth expansion to accommodate Ultra Large Container Vessels (ULCV).',
    description: 'Chittagong Port handles 90% of Bangladesh maritime trade. This grant will fund 2.4km channel dredging to 11.5m draft, enabling direct ULCV berthing without offshore feeder transfers.',
    votesFor: 28900000,
    votesAgainst: 3100000,
    votesAbstain: 900000,
    quorumTarget: 25000000,
    totalQuorumCurrent: 32900000,
    createdAt: '2026-08-20 12:00 UTC',
    endsAt: '2026-08-24 12:00 UTC',
    targetContract: '0x43a2...88f1 (PortGrantDisburser.sol)',
    requestedTreasuryOd: 4500000,
    userVoted: 'FOR',
    comments: [
      {
        id: 'c4',
        author: 'Dhaka Logistics Hub',
        role: 'Trade Delegate',
        voteType: 'FOR',
        timestamp: '2026-08-21 08:45 UTC',
        comment: 'Will reduce turnaround time by 36 hours for container fleets.'
      }
    ]
  },
  {
    id: 'OD-VOTE-042',
    title: 'Proposal 042: Upgrade Smart Contract Security Shield & Quantum Anti-Cheat Auditor',
    proposer: 'Cyber Security Squad',
    proposerRole: 'Super Master Security Agent',
    category: 'SECURITY_AUDIT',
    status: 'EXECUTED',
    summary: 'Deploy real-time quantum threat monitoring and automated honeypot defenses for $OD sovereign vaults.',
    description: 'Upgrades the protocol security shield to monitor high-frequency flash-loan attacks and unauthorized governance vote buying across all decentralized exchanges.',
    votesFor: 35400000,
    votesAgainst: 120000,
    votesAbstain: 50000,
    quorumTarget: 20000000,
    totalQuorumCurrent: 35570000,
    createdAt: '2026-08-15 00:00 UTC',
    endsAt: '2026-08-19 00:00 UTC',
    targetContract: '0x99e1...33d2 (QuantumCyberShield.sol)',
    userVoted: 'FOR',
    comments: []
  }
];

const INITIAL_DELEGATES: Delegate[] = [
  {
    id: 'del-1',
    name: 'Captain V. Sharma',
    role: 'Chief Maritime Delegate',
    address: '0x8F92...41A0',
    delegatedVotes: 14200000,
    proposalsVotedCount: 42,
    participationRatePct: 98.5,
    avatarIcon: '⚓'
  },
  {
    id: 'del-2',
    name: 'Monaco Maritime Guild',
    role: 'Institutional Treasury Representative',
    address: '0x3C19...99F2',
    delegatedVotes: 22800000,
    proposalsVotedCount: 45,
    participationRatePct: 100.0,
    avatarIcon: '🏛️'
  },
  {
    id: 'del-3',
    name: 'Seafarers Welfare Council',
    role: 'Community & Labor Delegate',
    address: '0x11D8...77B4',
    delegatedVotes: 8900000,
    proposalsVotedCount: 39,
    participationRatePct: 94.2,
    avatarIcon: '🌊'
  }
];

export const VotingGovernanceView: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'PROPOSALS' | 'CREATE_PROPOSAL' | 'DELEGATE' | 'TIMELOCK'>('PROPOSALS');

  // Proposal States
  const [proposals, setProposals] = useState<VotingProposal[]>(INITIAL_PROPOSALS);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Proposal Modal / Vote Panel
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>('OD-VOTE-045');
  const [voteChoice, setVoteChoice] = useState<'FOR' | 'AGAINST' | 'ABSTAIN'>('FOR');
  const [voteRationaleInput, setVoteRationaleInput] = useState<string>('');
  const [voteSubmitting, setVoteSubmitting] = useState<boolean>(false);
  const [voteSuccessToast, setVoteSuccessToast] = useState<string | null>(null);

  // New Proposal Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<VotingProposal['category']>('PROTOCOL_REVENUE');
  const [newTargetContract, setNewTargetContract] = useState<string>('0x8f2a...99c4');
  const [newRequestedOd, setNewRequestedOd] = useState<number>(500000);
  const [newSummary, setNewSummary] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [proposalSubmittedMsg, setProposalSubmittedMsg] = useState<string | null>(null);

  // Delegation State
  const [delegates, setDelegates] = useState<Delegate[]>(INITIAL_DELEGATES);
  const [activeDelegatedToId, setActiveDelegatedToId] = useState<string | null>(null);
  const [userVotingPower, setUserVotingPower] = useState<number>(85000); // 85,000 veOD

  // Filtered Proposals
  const filteredProposals = proposals.filter((p) => {
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.proposer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const activeSelectedProposal = proposals.find((p) => p.id === selectedProposalId);

  // Handle Cast Vote
  const handleCastVote = (proposalId: string) => {
    if (!voteChoice) return;

    setVoteSubmitting(true);
    hapticEngine.trigger('light');

    setTimeout(() => {
      setProposals((prev) =>
        prev.map((p) => {
          if (p.id === proposalId) {
            const oldVote = p.userVoted;
            let forDiff = 0;
            let againstDiff = 0;
            let abstainDiff = 0;

            if (oldVote === 'FOR') forDiff -= userVotingPower;
            if (oldVote === 'AGAINST') againstDiff -= userVotingPower;
            if (oldVote === 'ABSTAIN') abstainDiff -= userVotingPower;

            if (voteChoice === 'FOR') forDiff += userVotingPower;
            if (voteChoice === 'AGAINST') againstDiff += userVotingPower;
            if (voteChoice === 'ABSTAIN') abstainDiff += userVotingPower;

            const newFor = p.votesFor + forDiff;
            const newAgainst = p.votesAgainst + againstDiff;
            const newAbstain = p.votesAbstain + abstainDiff;
            const newTotalQuorum = newFor + newAgainst + newAbstain;

            const newComments = [...p.comments];
            if (voteRationaleInput.trim()) {
              newComments.unshift({
                id: `c-${Date.now()}`,
                author: 'Sovereign Delegate (You)',
                role: 'Registered Staker',
                voteType: voteChoice,
                timestamp: 'Just now',
                comment: voteRationaleInput.trim()
              });
            }

            return {
              ...p,
              votesFor: newFor,
              votesAgainst: newAgainst,
              votesAbstain: newAbstain,
              totalQuorumCurrent: newTotalQuorum,
              userVoted: voteChoice,
              userVoteRationale: voteRationaleInput,
              comments: newComments
            };
          }
          return p;
        })
      );

      setVoteSubmitting(false);
      setVoteRationaleInput('');
      setVoteSuccessToast(`🎉 Vote successfully submitted! Cast ${userVotingPower.toLocaleString()} veOD votes [${voteChoice}] on proposal ${proposalId}.`);
      hapticEngine.trigger('success');

      setTimeout(() => setVoteSuccessToast(null), 5000);
    }, 800);
  };

  // Submit New Proposal
  const handleCreateProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary || !newDescription) {
      alert('Please complete all required fields for the governance proposal.');
      return;
    }

    const newProp: VotingProposal = {
      id: `OD-VOTE-0${proposals.length + 46}`,
      title: newTitle,
      proposer: 'Sovereign Delegate (You)',
      proposerRole: 'Community Delegate',
      category: newCategory,
      status: 'ACTIVE',
      summary: newSummary,
      description: newDescription,
      votesFor: userVotingPower,
      votesAgainst: 0,
      votesAbstain: 0,
      quorumTarget: 15000000,
      totalQuorumCurrent: userVotingPower,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      endsAt: 'In 7 Days',
      targetContract: newTargetContract,
      requestedTreasuryOd: newRequestedOd,
      userVoted: 'FOR',
      comments: []
    };

    setProposals([newProp, ...proposals]);
    setSelectedProposalId(newProp.id);
    setActiveTab('PROPOSALS');
    setNewTitle('');
    setNewSummary('');
    setNewDescription('');
    setProposalSubmittedMsg(`✅ Governance Proposal ${newProp.id} published to on-chain DAO queue successfully!`);
    hapticEngine.trigger('success');

    setTimeout(() => setProposalSubmittedMsg(null), 5000);
  };

  const handleDelegatePower = (delegateId: string) => {
    if (activeDelegatedToId === delegateId) {
      setActiveDelegatedToId(null);
      setVoteSuccessToast('Revoked voting delegation. Voting power restored to self.');
    } else {
      setActiveDelegatedToId(delegateId);
      const del = delegates.find((d) => d.id === delegateId);
      setVoteSuccessToast(`Delegated ${userVotingPower.toLocaleString()} veOD voting weight to ${del?.name}.`);
    }
    hapticEngine.trigger('success');
    setTimeout(() => setVoteSuccessToast(null), 4000);
  };

  return (
    <div
      id="voting-governance-view"
      className={`p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-cyan-500/50 shadow-2xl space-y-6 text-white font-mono text-xs relative overflow-hidden ${className}`}
    >
      {/* Background Glow Effects */}
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-800 pb-5 gap-4 relative z-10">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center w-fit space-x-1.5 mb-2">
            <Vote className="w-3.5 h-3.5 text-cyan-400" />
            <span>ON-CHAIN SOVEREIGN DAO GOVERNANCE</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
            <Vote className="w-7 h-7 text-cyan-400 shrink-0" />
            <span>Ocean Dollar Voting Governance Portal</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Cast weighted votes on protocol parameters, propose treasury disbursements, delegate voting weight, and track timelock executions.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {(
            [
              { id: 'PROPOSALS', label: '🗳️ Active Proposals', badge: proposals.filter((p) => p.status === 'ACTIVE').length },
              { id: 'CREATE_PROPOSAL', label: '➕ New Proposal' },
              { id: 'DELEGATE', label: '🤝 Delegate Votes' },
              { id: 'TIMELOCK', label: '🔒 Timelock Queue' }
            ] as Array<{ id: 'PROPOSALS' | 'CREATE_PROPOSAL' | 'DELEGATE' | 'TIMELOCK'; label: string; badge?: number }>
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                hapticEngine.trigger('click');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === t.id
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{t.label}</span>
              {t.badge !== undefined && t.badge > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${activeTab === t.id ? 'bg-slate-950 text-cyan-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Global Toast Alert */}
      {(voteSuccessToast || proposalSubmittedMsg) && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center justify-between animate-fade-in relative z-20">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{voteSuccessToast || proposalSubmittedMsg}</span>
          </div>
          <button
            onClick={() => {
              setVoteSuccessToast(null);
              setProposalSubmittedMsg(null);
            }}
            className="text-emerald-400 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-between">
            <span>Your Voting Power</span>
            <Award className="w-3.5 h-3.5 text-cyan-400" />
          </span>
          <div className="text-xl font-black text-cyan-300">
            {userVotingPower.toLocaleString()} <span className="text-xs text-slate-400">veOD</span>
          </div>
          <p className="text-[9px] text-slate-500">
            {activeDelegatedToId ? `Delegated to ${delegates.find((d) => d.id === activeDelegatedToId)?.name}` : 'Self-Delegated (100% Direct Power)'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-between">
            <span>Active Proposals</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </span>
          <div className="text-xl font-black text-amber-300">
            {proposals.filter((p) => p.status === 'ACTIVE').length} <span className="text-xs text-slate-400">Live</span>
          </div>
          <p className="text-[9px] text-slate-500">Epoch 43 Voting Window Open</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-between">
            <span>Treasury Reserve</span>
            <DollarSign className="w-3.5 h-3.5 text-purple-400" />
          </span>
          <div className="text-xl font-black text-purple-300">
            $142,500,000 <span className="text-xs text-slate-400">$OD</span>
          </div>
          <p className="text-[9px] text-slate-500">Audited Zurich Gold Custody</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-between">
            <span>Quorum Threshold</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </span>
          <div className="text-xl font-black text-emerald-300">
            15,000,000 <span className="text-xs text-slate-400">veOD</span>
          </div>
          <p className="text-[9px] text-slate-500">Minimum 15.0M Votes Required for Pass</p>
        </div>
      </div>

      {/* TAB 1: ACTIVE PROPOSALS & VOTE CASTING */}
      {activeTab === 'PROPOSALS' && (
        <div className="space-y-6 relative z-10">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search proposal title, ID, or proposer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Live Active</option>
                <option value="PASSED">Passed</option>
                <option value="QUEUED_TIMELOCK">Queued Timelock</option>
                <option value="EXECUTED">Executed</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="ALL">All Categories</option>
                <option value="PROTOCOL_REVENUE">Protocol Revenue</option>
                <option value="STAKING_YIELD">Staking Yield</option>
                <option value="TREASURY_GRANT">Treasury Grant</option>
                <option value="SECURITY_AUDIT">Security Audit</option>
              </select>
            </div>
          </div>

          {/* Proposals Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Proposals Cards List */}
            <div className="lg:col-span-6 space-y-4 max-h-[700px] overflow-y-auto pr-1">
              {filteredProposals.length === 0 ? (
                <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
                  No governance proposals found matching selected filters.
                </div>
              ) : (
                filteredProposals.map((p) => {
                  const totalVotes = p.votesFor + p.votesAgainst + p.votesAbstain || 1;
                  const forPct = Math.round((p.votesFor / totalVotes) * 100);
                  const againstPct = Math.round((p.votesAgainst / totalVotes) * 100);
                  const isSelected = selectedProposalId === p.id;

                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProposalId(p.id);
                        hapticEngine.trigger('click');
                      }}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Top Badges */}
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                          {p.id} • {p.category.replace('_', ' ')}
                        </span>

                        <span
                          className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase border ${
                            p.status === 'ACTIVE'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                              : p.status === 'QUEUED_TIMELOCK'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <div>
                        <h4 className="font-black text-white text-sm leading-snug">{p.title}</h4>
                        <p className="text-[11px] text-slate-400 font-sans mt-1 line-clamp-2">{p.summary}</p>
                      </div>

                      {/* Vote Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-emerald-400">FOR: {forPct}% ({(p.votesFor / 1000000).toFixed(1)}M)</span>
                          <span className="text-rose-400">AGAINST: {againstPct}% ({(p.votesAgainst / 1000000).toFixed(1)}M)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden flex">
                          <div style={{ width: `${forPct}%` }} className="bg-emerald-500 h-full" />
                          <div style={{ width: `${againstPct}%` }} className="bg-rose-500 h-full" />
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-800/60 pt-2">
                        <span>By {p.proposer}</span>
                        {p.userVoted ? (
                          <span className="text-emerald-400 font-bold flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>Voted [{p.userVoted}]</span>
                          </span>
                        ) : (
                          <span className="text-amber-400 font-bold">Awaiting Your Vote</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: Selected Proposal Detail & Voting Console */}
            <div className="lg:col-span-6">
              {activeSelectedProposal ? (
                <div className="p-6 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 space-y-5 sticky top-6">
                  {/* Proposal Header */}
                  <div className="space-y-2 border-b border-slate-800 pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-700">
                        {activeSelectedProposal.id}
                      </span>
                      <span className="text-[10px] text-slate-400">Ends: {activeSelectedProposal.endsAt}</span>
                    </div>

                    <h3 className="text-base font-black text-white">{activeSelectedProposal.title}</h3>

                    <div className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      {activeSelectedProposal.description}
                    </div>
                  </div>

                  {/* Contract & Target Parameters */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Smart Contract:</span>
                      <strong className="text-cyan-300">{activeSelectedProposal.targetContract}</strong>
                    </div>
                    {activeSelectedProposal.requestedTreasuryOd && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Requested Treasury Disbursement:</span>
                        <strong className="text-amber-300">${activeSelectedProposal.requestedTreasuryOd.toLocaleString()} $OD</strong>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Quorum Progress:</span>
                      <strong className="text-emerald-400">
                        {(activeSelectedProposal.totalQuorumCurrent / 1000000).toFixed(1)}M / {(activeSelectedProposal.quorumTarget / 1000000).toFixed(1)}M veOD (Quorum Reached)
                      </strong>
                    </div>
                  </div>

                  {/* Vote Action Buttons */}
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="font-black text-white text-xs uppercase flex items-center justify-between">
                      <span>Cast Your Vote</span>
                      <span className="text-cyan-400 font-normal">Weight: {userVotingPower.toLocaleString()} veOD</span>
                    </h4>

                    {/* Radio Choice Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          setVoteChoice('FOR');
                          hapticEngine.trigger('click');
                        }}
                        className={`py-3 px-2 rounded-xl text-xs font-black border transition-all flex flex-col items-center justify-center space-y-1 ${
                          voteChoice === 'FOR'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                            : 'bg-slate-900 border-slate-800 text-emerald-400 hover:border-emerald-500/50'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>FOR (YES)</span>
                      </button>

                      <button
                        onClick={() => {
                          setVoteChoice('AGAINST');
                          hapticEngine.trigger('click');
                        }}
                        className={`py-3 px-2 rounded-xl text-xs font-black border transition-all flex flex-col items-center justify-center space-y-1 ${
                          voteChoice === 'AGAINST'
                            ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-lg shadow-rose-500/20'
                            : 'bg-slate-900 border-slate-800 text-rose-400 hover:border-rose-500/50'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        <span>AGAINST (NO)</span>
                      </button>

                      <button
                        onClick={() => {
                          setVoteChoice('ABSTAIN');
                          hapticEngine.trigger('click');
                        }}
                        className={`py-3 px-2 rounded-xl text-xs font-black border transition-all flex flex-col items-center justify-center space-y-1 ${
                          voteChoice === 'ABSTAIN'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                            : 'bg-slate-900 border-slate-800 text-amber-400 hover:border-amber-500/50'
                        }`}
                      >
                        <MinusCircle className="w-4 h-4" />
                        <span>ABSTAIN</span>
                      </button>
                    </div>

                    {/* Optional Rationale Input */}
                    <textarea
                      rows={2}
                      placeholder="Optional vote rationale or public delegate comment..."
                      value={voteRationaleInput}
                      onChange={(e) => setVoteRationaleInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
                    />

                    {/* Submit Vote Button */}
                    <button
                      onClick={() => handleCastVote(activeSelectedProposal.id)}
                      disabled={voteSubmitting}
                      className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                    >
                      {voteSubmitting ? (
                        <span>Signing On-Chain Vote Transaction...</span>
                      ) : (
                        <>
                          <Vote className="w-4 h-4" />
                          <span>Submit On-Chain Vote [{voteChoice}] ({userVotingPower.toLocaleString()} veOD)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Public Discussion Comments */}
                  <div className="space-y-3">
                    <h4 className="font-black text-white text-xs uppercase flex items-center space-x-2 border-b border-slate-800 pb-2">
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      <span>Delegate Rationale &amp; Comments ({activeSelectedProposal.comments.length})</span>
                    </h4>

                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {activeSelectedProposal.comments.length === 0 ? (
                        <p className="text-[10px] text-slate-500 italic">No comments yet. Be the first to post rationale.</p>
                      ) : (
                        activeSelectedProposal.comments.map((c) => (
                          <div key={c.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-[10px]">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-white">{c.author} <span className="text-slate-500 text-[9px]">({c.role})</span></span>
                              <span className={`font-black px-1.5 py-0.2 rounded text-[8px] ${c.voteType === 'FOR' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                                Voted {c.voteType}
                              </span>
                            </div>
                            <p className="text-slate-300 font-sans">{c.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
                  Select a proposal from the left list to view details and cast vote.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CREATE NEW GOVERNANCE PROPOSAL */}
      {activeTab === 'CREATE_PROPOSAL' && (
        <form onSubmit={handleCreateProposalSubmit} className="space-y-6 relative z-10 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-cyan-400" />
            <span>Submit New Sovereign DAO Governance Proposal</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Proposal Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Proposal 046: Establish Emergency Port Recovery Reserve"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Category *</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as VotingProposal['category'])}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="PROTOCOL_REVENUE">Protocol Revenue Split</option>
                <option value="STAKING_YIELD">Staking Yield Parameter</option>
                <option value="TREASURY_GRANT">Treasury Grant Disbursement</option>
                <option value="SECURITY_AUDIT">Security Audit Upgrade</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Target Smart Contract Execution Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={newTargetContract}
                onChange={(e) => setNewTargetContract(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Requested Treasury Funding ($OD)</label>
              <input
                type="number"
                min="0"
                step="50000"
                value={newRequestedOd}
                onChange={(e) => setNewRequestedOd(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase">Executive Summary (Short overview) *</label>
            <input
              type="text"
              required
              placeholder="Brief 1-2 sentence description of proposal objectives..."
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase">Full Specification &amp; Justification *</label>
            <textarea
              rows={5}
              required
              placeholder="Provide detailed proposal specification, financial breakdown, timeline, and security implications..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Publish Governance Proposal to DAO On-Chain Queue</span>
          </button>
        </form>
      )}

      {/* TAB 3: DELEGATION */}
      {activeTab === 'DELEGATE' && (
        <div className="space-y-6 relative z-10">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white border-b border-slate-800 pb-2 flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>Delegate Voting Power to Verified Maritime Representatives</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              If you prefer not to vote manually on every proposal, delegate your {userVotingPower.toLocaleString()} veOD voting weight to trusted captains, port delegates, or labor unions. You can revoke delegation at any time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {delegates.map((d) => {
                const isDelegatedToThis = activeDelegatedToId === d.id;

                return (
                  <div key={d.id} className={`p-5 rounded-2xl border space-y-3 transition-all ${isDelegatedToThis ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10' : 'bg-slate-950 border-slate-800'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl">{d.avatarIcon}</span>
                      <span className="text-[9px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        {d.participationRatePct}% Voted
                      </span>
                    </div>

                    <div>
                      <h4 className="font-black text-white text-sm">{d.name}</h4>
                      <p className="text-[10px] text-slate-400 font-sans">{d.role}</p>
                    </div>

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[10px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Address:</span>
                        <span className="font-mono text-white">{d.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Delegated Votes:</span>
                        <span className="font-bold text-emerald-400">{(d.delegatedVotes / 1000000).toFixed(1)}M veOD</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelegatePower(d.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-black transition-all ${
                        isDelegatedToThis
                          ? 'bg-rose-500 hover:bg-rose-400 text-slate-950'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      }`}
                    >
                      {isDelegatedToThis ? 'Revoke Delegation' : 'Delegate Votes'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TIMELOCK EXECUTION QUEUE */}
      {activeTab === 'TIMELOCK' && (
        <div className="space-y-6 relative z-10">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white border-b border-slate-800 pb-2 flex items-center space-x-2">
              <Lock className="w-5 h-5 text-purple-400" />
              <span>Smart Contract Governance 48-Hour Timelock Queue</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              All passed proposals enter a mandatory 48-hour timelock queue before smart contract execution on-chain to protect protocol safety.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-purple-300">OD-VOTE-043 (Chittagong Port Grant)</span>
                  <span className="text-amber-400 font-mono animate-pulse">⏳ Timelock Remaining: 14h 22m 10s</span>
                </div>
                <p className="text-xs text-white font-black">Disburse 4.50M $OD Berth Dredging Grant</p>
                <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono border-t border-slate-900 pt-2">
                  <span>Target Contract: 0x43a2...88f1</span>
                  <span>Quorum Passed: 32.9M veOD (87.8% For)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
