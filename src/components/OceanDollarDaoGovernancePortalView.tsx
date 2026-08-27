import React, { useState } from 'react';
import {
  Vote,
  Users,
  Building2,
  TrendingUp,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Coins,
  FileText,
  DollarSign,
  ChevronRight,
  Filter,
  Search,
  Award,
  Lock,
  RefreshCw,
  ExternalLink,
  Bell,
  AlertTriangle,
  PieChart,
  BarChart3,
  Database,
  Code,
  Flame,
  Activity,
  ArrowUpRight,
  Zap,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Download,
  HelpCircle,
  LineChart,
  Sliders,
  Layers,
  Radio,
  Info,
  Check,
  Share2,
  Calculator,
  Mail
} from 'lucide-react';
import { CryptoCalculatorView } from './CryptoCalculatorView';
import { DeveloperRevenueWhitepaperView } from './DeveloperRevenueWhitepaperView';
import { VotingGovernanceView } from './VotingGovernanceView';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart as RechartsPie,
  Pie,
  Cell
} from 'recharts';
import { hapticEngine } from '../utils/hapticUtils';
import { RevenueProjectionChartView } from './RevenueProjectionChartView';

export interface DaoProposal {
  id: string;
  title: string;
  category: 'STAKING_REWARDS' | 'TOKENOMICS' | 'TREASURY_ALLOCATION' | 'PORT_INFRASTRUCTURE' | 'REVENUE_SPLIT';
  proposer: string;
  description: string;
  treasuryAmountOd?: number;
  proposedApyChange?: string;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  quorumNeeded: number;
  status: 'ACTIVE' | 'PASSED' | 'EXECUTED' | 'REJECTED';
  endTime: string;
  userVoted?: 'FOR' | 'AGAINST' | 'ABSTAIN';
  createdAt: string;
}

export interface GovernanceAlert {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS';
  title: string;
  message: string;
  proposalId?: string;
  read: boolean;
}

export interface RevenueFaqItem {
  id: string;
  category: 'START_DATE' | 'VERIFICATION' | 'FIREBASE' | 'DEVELOPERS' | 'GOVERNANCE' | 'SECURITY';
  question: string;
  answer: string;
  detailPoints?: string[];
}

export interface RevenueAlertItem {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS';
  category: 'PAYOUTS' | 'FIREBASE_INFRA' | 'DEV_POOL' | 'AUDITS';
  title: string;
  message: string;
  amountOd?: number;
  txHash?: string;
  read: boolean;
}

const INITIAL_PROPOSALS: DaoProposal[] = [
  {
    id: 'OD-PROP-043',
    title: 'Increase Firebase Cloud Sync Infrastructure Share to 10% and Developer Pool to 10%',
    category: 'REVENUE_SPLIT',
    proposer: 'Core Dev & Firebase Infrastructure Guild',
    description: 'Adjust the global Ocean Dollar ($OD) revenue distribution contract to guarantee 10% towards continuous Firebase Firestore/Auth real-time sync nodes, 10% developer maintenance rewards, 20% $OD staking yields, and 60% port demurrage reserve.',
    proposedApyChange: 'Revenue Rebalance',
    votesFor: 21500000,
    votesAgainst: 950000,
    votesAbstain: 200000,
    quorumNeeded: 15000000,
    status: 'ACTIVE',
    endTime: '3 Days 08 Hours',
    createdAt: '2026-08-26 14:00'
  },
  {
    id: 'OD-PROP-042',
    title: 'Increase 365-Day Staking Pool APY from 20.0% to 24.8%',
    category: 'STAKING_REWARDS',
    proposer: 'Capt. Aris Thorne (Vault Custodian)',
    description: 'Reallocate 5,000,000 $OD from Chittagong port container tariff reserves to boost long-term 365-day gold vault lockup yields and reward sovereign liquidity providers.',
    proposedApyChange: '+4.8% APY Boost',
    votesFor: 18450000,
    votesAgainst: 1200000,
    votesAbstain: 350000,
    quorumNeeded: 15000000,
    status: 'ACTIVE',
    endTime: '2 Days 14 Hours',
    createdAt: '2026-08-25 09:30'
  },
  {
    id: 'OD-PROP-041',
    title: 'Deploy $2.5M $OD Treasury Grant for Colombo Cold-Chain Reefer Terminal',
    category: 'TREASURY_ALLOCATION',
    proposer: 'Maritime Infrastructure Sub-DAO',
    description: 'Grant $2,500,000 $OD to install solar reefer monitoring sensors at Colombo Port yard 4, backed by automated $OD demurrage fee collection.',
    treasuryAmountOd: 2500000,
    votesFor: 22100000,
    votesAgainst: 890000,
    votesAbstain: 120000,
    quorumNeeded: 15000000,
    status: 'PASSED',
    endTime: 'Ended 3 Days Ago',
    createdAt: '2026-08-20 11:15'
  },
  {
    id: 'OD-PROP-040',
    title: 'Reduce Transfer Escrow Clearance Hold Time from 24h to 2h',
    category: 'TOKENOMICS',
    proposer: 'Singapore Port Clearing Guild',
    description: 'Optimize on-chain risk parameters using fast-path ECDSA multisig, allowing automated release of port customs escrow within 120 minutes.',
    proposedApyChange: 'Instant Clearance',
    votesFor: 31200000,
    votesAgainst: 450000,
    votesAbstain: 0,
    quorumNeeded: 20000000,
    status: 'EXECUTED',
    endTime: 'Executed Aug 20, 2026',
    createdAt: '2026-08-15 16:45'
  },
  {
    id: 'OD-PROP-039',
    title: 'Allocate 10% Treasury Reserves into Spot Physical Swiss Gold Bars',
    category: 'TREASURY_ALLOCATION',
    proposer: 'Swiss Alpine Vault Committee',
    description: 'Purchase 250 KG of 999.9 fine Swiss gold bullion bars to strengthen physical 24K collateral backing per $OD token.',
    treasuryAmountOd: 15000000,
    votesFor: 19800000,
    votesAgainst: 3100000,
    votesAbstain: 900000,
    quorumNeeded: 15000000,
    status: 'EXECUTED',
    endTime: 'Executed Aug 12, 2026',
    createdAt: '2026-08-10 08:00'
  }
];

const INITIAL_GOVERNANCE_ALERTS: GovernanceAlert[] = [
  {
    id: 'ALT-101',
    timestamp: '10 mins ago',
    severity: 'WARNING',
    title: 'Voting Deadline Approaching for OD-PROP-042',
    message: 'OD-PROP-042 (Staking APY Boost to 24.8%) ends in 48 hours. Cast your vote before execution window closes.',
    proposalId: 'OD-PROP-042',
    read: false
  },
  {
    id: 'ALT-102',
    timestamp: '1 hour ago',
    severity: 'SUCCESS',
    title: 'Quorum Reached for Proposal OD-PROP-043',
    message: 'Proposal OD-PROP-043 (Developer & Firebase Revenue Allocation) reached 22.65M votes, crossing the 15.0M quorum threshold.',
    proposalId: 'OD-PROP-043',
    read: false
  },
  {
    id: 'ALT-103',
    timestamp: '5 hours ago',
    severity: 'INFO',
    title: 'Firebase State Sync Verified',
    message: 'Firestore security rules & live database schemas synchronized. 10% protocol revenue stream connected to backend persistence nodes.',
    read: true
  },
  {
    id: 'ALT-104',
    timestamp: '1 day ago',
    severity: 'CRITICAL',
    title: 'Security Time-Lock Audit Passed',
    message: 'Multi-sig 3-of-5 key ceremony completed for Colombo Cold-Chain Reefer Terminal treasury release.',
    proposalId: 'OD-PROP-041',
    read: true
  }
];

const INITIAL_REVENUE_FAQS: RevenueFaqItem[] = [
  {
    id: 'FAQ-REV-01',
    category: 'START_DATE',
    question: 'When does the 10% Firebase and 10% Developer revenue sharing start?',
    answer: 'Revenue sharing is ACTIVE NOW (Epoch 1 Live). It was officially activated on-chain following the passing of DAO Proposal OD-PROP-043 (passed with 21.5M votes FOR).',
    detailPoints: [
      'Settlement Frequency: Automated daily batch clearing at 00:00 UTC.',
      'Epoch 1 Start Timestamp: 2026-08-26 00:00 UTC.',
      'Target Channels: 10% Firebase Firestore/Auth Sync Nodes, 10% Dev Maintenance, 20% Staking Yields, 60% Port Operations.'
    ]
  },
  {
    id: 'FAQ-REV-02',
    category: 'VERIFICATION',
    question: 'How do I know and verify that revenue payouts are actively occurring?',
    answer: 'You can verify live revenue distribution across 3 independent, transparent ledgers:',
    detailPoints: [
      '1. Firebase Firestore Ledger: Query the /revenue_splits collection in real time on project ai-studio-southasiaclimate-28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f.',
      '2. Smart Contract Event Logs: Verify contract 0xOD...DAO99 for RevenueDistributed() receipts.',
      '3. In-Portal Revenue Status & Alerts: Monitor the Revenue Status panel and live Revenue Alerts feed in this portal.'
    ]
  },
  {
    id: 'FAQ-REV-03',
    category: 'FIREBASE',
    question: 'How is the 10% Firebase Cloud allocation used and audited?',
    answer: 'The 10% Firebase share directly covers Google Cloud Platform (GCP) infrastructure costs to ensure 99.99% uptime for maritime app users.',
    detailPoints: [
      'Firestore document reads/writes for port container tracking & real-time radar.',
      'Firebase Authentication session persistence & biometric key security.',
      'Firestore security rules automated deployment & multi-region database backups.'
    ]
  },
  {
    id: 'FAQ-REV-04',
    category: 'DEVELOPERS',
    question: 'How are Developer pool payouts (10%) distributed and claimed?',
    answer: 'Developer rewards are allocated to core maritime protocol engineers, smart contract security auditors, and UI maintainers.',
    detailPoints: [
      'Held in a secure 3-of-5 multisig vault controlled by elected DAO developers.',
      'Disbursed bi-weekly based on merged GitHub pull requests & security vulnerability reports.',
      'Transparently logged on-chain with verifiable transaction hashes.'
    ]
  },
  {
    id: 'FAQ-REV-05',
    category: 'GOVERNANCE',
    question: 'Can the 60/20/10/10 revenue distribution ratios be changed in the future?',
    answer: 'Yes. Any DAO token holder with at least 25,000 $OD voting power can submit a governance proposal to rebalance allocation ratios.',
    detailPoints: [
      'Requires 15,000,000 $OD quorum threshold to pass.',
      'Subject to a mandatory 48-hour security time-lock before execution on-chain.',
      'Current ratios: 60% Port Demurrage, 20% Staking Yield, 10% Dev Pool, 10% Firebase Infrastructure.'
    ]
  },
  {
    id: 'FAQ-REV-06',
    category: 'SECURITY',
    question: 'What happens if Firebase traffic or storage costs exceed the 10% allocation?',
    answer: 'The DAO community treasury maintains an automated $50,000,000 $OD reserve buffer to absorb unexpected cloud infrastructure spikes without service interruption.',
    detailPoints: [
      'Automated failover reserve triggers if cloud costs exceed monthly projections.',
      'Zero downtime guaranteed for maritime pilots, cargo handlers, and port authorities.',
      'Excess unused Firebase allocation rolls over into the next epoch budget.'
    ]
  }
];

const INITIAL_REVENUE_ALERTS: RevenueAlertItem[] = [
  {
    id: 'ALT-REV-201',
    timestamp: '15 mins ago',
    severity: 'SUCCESS',
    category: 'PAYOUTS',
    title: 'Epoch 1 Daily Settlement Batch Cleared',
    message: 'Distributed 33,333 $OD across 4 protocol channels ($3,333 $OD to Firebase Sync Node, $3,333 $OD to Dev Pool).',
    amountOd: 33333,
    txHash: '0x8f...39a1',
    read: false
  },
  {
    id: 'ALT-REV-202',
    timestamp: '2 hours ago',
    severity: 'INFO',
    category: 'FIREBASE_INFRA',
    title: 'Firebase Firestore Health Check Passed',
    message: 'Database ai-studio-southasiaclimate-... latency verified at 14ms with 100% security rules compliance.',
    read: false
  },
  {
    id: 'ALT-REV-203',
    timestamp: '1 day ago',
    severity: 'SUCCESS',
    category: 'DEV_POOL',
    title: 'Developer Multisig Disbursement Verified',
    message: '10,000 $OD maintenance reward released to dev multisig vault following security audit sign-off.',
    amountOd: 10000,
    txHash: '0x3c...99b4',
    read: true
  },
  {
    id: 'ALT-REV-204',
    timestamp: '2 days ago',
    severity: 'WARNING',
    category: 'AUDITS',
    title: 'Quarterly Smart Contract Revenue Audit Scheduled',
    message: 'Auditors from CertiK & OpenZeppelin will audit 0xOD...DAO99 split parameters on Sep 1, 2026.',
    read: true
  }
];

const EPOCH_HISTORY_DATA = [
  { epoch: 'Epoch -5', volume: 800000, port: 480000, staking: 160000, dev: 80000, firebase: 80000 },
  { epoch: 'Epoch -4', volume: 850000, port: 510000, staking: 170000, dev: 85000, firebase: 85000 },
  { epoch: 'Epoch -3', volume: 900000, port: 540000, staking: 180000, dev: 90000, firebase: 90000 },
  { epoch: 'Epoch -2', volume: 950000, port: 570000, staking: 190000, dev: 95000, firebase: 95000 },
  { epoch: 'Epoch -1', volume: 980000, port: 588000, staking: 196000, dev: 98000, firebase: 98000 },
  { epoch: 'Epoch 1 (Live)', volume: 1000000, port: 600000, staking: 200000, dev: 100000, firebase: 100000 }
];

export const OceanDollarDaoGovernancePortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PROPOSALS' | 'VOTING_GOVERNANCE' | 'ANALYTICS' | 'ALERTS' | 'REVENUE_SHARING'>('PROPOSALS');
  const [proposals, setProposals] = useState<DaoProposal[]>(INITIAL_PROPOSALS);
  const [alerts, setAlerts] = useState<GovernanceAlert[]>(INITIAL_GOVERNANCE_ALERTS);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userVotingPower, setUserVotingPower] = useState<number>(25000);
  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState<boolean>(false);
  const [delegateAddress, setDelegateAddress] = useState<string>('Self (0x7F...92A1)');
  const [isCreateProposalOpen, setIsCreateProposalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Revenue Sub-Tab & State
  const [revenueSubTab, setRevenueSubTab] = useState<'STATUS' | 'VISUALIZER' | 'ALERTS' | 'FAQ' | 'CALCULATOR' | 'WHITE_PAPER'>('STATUS');
  const [monthlyProtocolRevenue, setMonthlyProtocolRevenue] = useState<number>(1000000);
  const [visualizerViewMode, setVisualizerViewMode] = useState<'MONTHLY' | 'EPOCH' | 'DISTRIBUTION'>('MONTHLY');
  const [revenueAlerts, setRevenueAlerts] = useState<RevenueAlertItem[]>(INITIAL_REVENUE_ALERTS);
  const [revenueAlertFilter, setRevenueAlertFilter] = useState<string>('ALL');
  const [revenueFaqs, setRevenueFaqs] = useState<RevenueFaqItem[]>(INITIAL_REVENUE_FAQS);
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<string>('ALL');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('FAQ-REV-01');

  // New proposal form state
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<DaoProposal['category']>('STAKING_REWARDS');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newAmount, setNewAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleVote = (proposalId: string, voteType: 'FOR' | 'AGAINST' | 'ABSTAIN') => {
    setProposals((prev) =>
      prev.map((prop) => {
        if (prop.id !== proposalId) return prop;
        if (prop.userVoted) {
          showToast('You have already cast your vote on this proposal.');
          return prop;
        }

        const updated = { ...prop, userVoted: voteType };
        if (voteType === 'FOR') updated.votesFor += userVotingPower;
        if (voteType === 'AGAINST') updated.votesAgainst += userVotingPower;
        if (voteType === 'ABSTAIN') updated.votesAbstain += userVotingPower;
        return updated;
      })
    );

    // Create a new alert notification
    const newAlert: GovernanceAlert = {
      id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: 'Just now',
      severity: 'SUCCESS',
      title: `Vote Cast on ${proposalId}`,
      message: `Cast ${userVotingPower.toLocaleString()} votes [${voteType}] on proposal ${proposalId}.`,
      proposalId,
      read: false
    };
    setAlerts([newAlert, ...alerts]);

    hapticEngine.trigger('success');
    showToast(`Successfully cast ${userVotingPower.toLocaleString()} votes [${voteType}] on proposal ${proposalId}!`);
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      showToast('Please provide both a proposal title and detailed description.');
      return;
    }

    setIsSubmitting(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      const created: DaoProposal = {
        id: `OD-PROP-${Math.floor(100 + Math.random() * 900)}`,
        title: newTitle,
        category: newCategory,
        proposer: 'Master Mariner (You)',
        description: newDescription,
        treasuryAmountOd: newAmount ? Number(newAmount) : undefined,
        votesFor: userVotingPower,
        votesAgainst: 0,
        votesAbstain: 0,
        quorumNeeded: 15000000,
        status: 'ACTIVE',
        endTime: '7 Days Remaining',
        userVoted: 'FOR',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      setProposals([created, ...proposals]);

      // Add alert
      const createdAlert: GovernanceAlert = {
        id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: 'Just now',
        severity: 'INFO',
        title: `New Proposal Published: ${created.id}`,
        message: `Proposal "${created.title}" was submitted to the DAO on-chain parliament.`,
        proposalId: created.id,
        read: false
      };
      setAlerts([createdAlert, ...alerts]);

      setIsSubmitting(false);
      setIsCreateProposalOpen(false);
      setNewTitle('');
      setNewDescription('');
      setNewAmount('');
      hapticEngine.trigger('success');
      showToast(`Proposal ${created.id} successfully created and submitted to on-chain DAO governance!`);
    }, 1200);
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
    hapticEngine.trigger('click');
  };

  const markAllAlertsAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
    hapticEngine.trigger('success');
    showToast('All governance alerts marked as read.');
  };

  const filteredProposals = proposals.filter((p) => {
    const matchesCategory = activeCategoryFilter === 'ALL' || p.category === activeCategoryFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  // Analytics calculation
  const totalVotesCastAll = proposals.reduce((acc, p) => acc + p.votesFor + p.votesAgainst + p.votesAbstain, 0);
  const activeProposalsCount = proposals.filter((p) => p.status === 'ACTIVE').length;
  const passedProposalsCount = proposals.filter((p) => p.status === 'PASSED' || p.status === 'EXECUTED').length;
  const avgQuorumPct = Math.round(
    proposals.reduce((acc, p) => acc + ((p.votesFor + p.votesAgainst + p.votesAbstain) / p.quorumNeeded) * 100, 0) /
      proposals.length
  );

  // Revenue Sharing calculation values
  const portShare = monthlyProtocolRevenue * 0.60;
  const stakingShare = monthlyProtocolRevenue * 0.20;
  const devShare = monthlyProtocolRevenue * 0.10;
  const firebaseShare = monthlyProtocolRevenue * 0.10;

  // Revenue alert helpers
  const unreadRevenueAlertsCount = revenueAlerts.filter((a) => !a.read).length;

  const handleMarkAllRevenueAlertsRead = () => {
    setRevenueAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
    hapticEngine.trigger('click');
    setToastMessage('All revenue alerts marked as read.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTriggerSimulatedRevenueAlert = () => {
    const newAlert: RevenueAlertItem = {
      id: `ALT-REV-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      severity: 'SUCCESS',
      category: 'PAYOUTS',
      title: 'Simulated Epoch Settlement Executed',
      message: `Daily distribution of $${(monthlyProtocolRevenue / 30).toLocaleString(undefined, { maximumFractionDigits: 0 })} $OD completed ($${((monthlyProtocolRevenue * 0.10) / 30).toLocaleString(undefined, { maximumFractionDigits: 0 })} $OD to Firebase Sync Node).`,
      amountOd: Math.round(monthlyProtocolRevenue / 30),
      txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      read: false
    };
    setRevenueAlerts((prev) => [newAlert, ...prev]);
    hapticEngine.trigger('success');
    setToastMessage('Live simulated revenue alert triggered!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredRevenueAlerts = revenueAlerts.filter((a) => {
    if (revenueAlertFilter === 'ALL') return true;
    return a.category === revenueAlertFilter;
  });

  const filteredFaqs = revenueFaqs.filter((faq) => {
    const matchesCategory = faqCategoryFilter === 'ALL' || faq.category === faqCategoryFilter;
    const matchesSearch =
      faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      (faq.detailPoints && faq.detailPoints.some((dp) => dp.toLowerCase().includes(faqSearchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const projectionData = [
    { month: 'Jan', port: Math.round(monthlyProtocolRevenue * 0.60 * 0.85), staking: Math.round(monthlyProtocolRevenue * 0.20 * 0.85), dev: Math.round(monthlyProtocolRevenue * 0.10 * 0.85), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 0.85) },
    { month: 'Feb', port: Math.round(monthlyProtocolRevenue * 0.60 * 0.88), staking: Math.round(monthlyProtocolRevenue * 0.20 * 0.88), dev: Math.round(monthlyProtocolRevenue * 0.10 * 0.88), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 0.88) },
    { month: 'Mar', port: Math.round(monthlyProtocolRevenue * 0.60 * 0.92), staking: Math.round(monthlyProtocolRevenue * 0.20 * 0.92), dev: Math.round(monthlyProtocolRevenue * 0.10 * 0.92), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 0.92) },
    { month: 'Apr', port: Math.round(monthlyProtocolRevenue * 0.60 * 0.95), staking: Math.round(monthlyProtocolRevenue * 0.20 * 0.95), dev: Math.round(monthlyProtocolRevenue * 0.10 * 0.95), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 0.95) },
    { month: 'May', port: Math.round(monthlyProtocolRevenue * 0.60 * 0.98), staking: Math.round(monthlyProtocolRevenue * 0.20 * 0.98), dev: Math.round(monthlyProtocolRevenue * 0.10 * 0.98), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 0.98) },
    { month: 'Jun', port: Math.round(monthlyProtocolRevenue * 0.60 * 1.00), staking: Math.round(monthlyProtocolRevenue * 0.20 * 1.00), dev: Math.round(monthlyProtocolRevenue * 0.10 * 1.00), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 1.00) },
    { month: 'Jul', port: Math.round(monthlyProtocolRevenue * 0.60 * 1.03), staking: Math.round(monthlyProtocolRevenue * 0.20 * 1.03), dev: Math.round(monthlyProtocolRevenue * 0.10 * 1.03), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 1.03) },
    { month: 'Aug', port: Math.round(monthlyProtocolRevenue * 0.60 * 1.06), staking: Math.round(monthlyProtocolRevenue * 0.20 * 1.06), dev: Math.round(monthlyProtocolRevenue * 0.10 * 1.06), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 1.06) },
    { month: 'Sep', port: Math.round(monthlyProtocolRevenue * 0.60 * 1.10), staking: Math.round(monthlyProtocolRevenue * 0.20 * 1.10), dev: Math.round(monthlyProtocolRevenue * 0.10 * 1.10), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 1.10) },
    { month: 'Oct', port: Math.round(monthlyProtocolRevenue * 0.60 * 1.14), staking: Math.round(monthlyProtocolRevenue * 0.20 * 1.14), dev: Math.round(monthlyProtocolRevenue * 0.10 * 1.14), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 1.14) },
    { month: 'Nov', port: Math.round(monthlyProtocolRevenue * 0.60 * 1.18), staking: Math.round(monthlyProtocolRevenue * 0.20 * 1.18), dev: Math.round(monthlyProtocolRevenue * 0.10 * 1.18), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 1.18) },
    { month: 'Dec', port: Math.round(monthlyProtocolRevenue * 0.60 * 1.25), staking: Math.round(monthlyProtocolRevenue * 0.20 * 1.25), dev: Math.round(monthlyProtocolRevenue * 0.10 * 1.25), firebase: Math.round(monthlyProtocolRevenue * 0.10 * 1.25) }
  ];

  const pieDistributionData = [
    { name: 'Port Operations (60%)', value: 60, color: '#f59e0b' },
    { name: 'Staking Yield (20%)', value: 20, color: '#eab308' },
    { name: 'Developer Pool (10%)', value: 10, color: '#10b981' },
    { name: 'Firebase Persistence (10%)', value: 10, color: '#06b6d4' }
  ];

  return (
    <div id="ocean-dollar-dao-governance-portal-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
            <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              SOVEREIGN GOVERNANCE &amp; DECENTRALIZED PARLIAMENT
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <Vote className="w-8 h-8 text-yellow-400" />
            <span>Ocean Dollar ($OD) DAO Governance Portal</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Propose, debate, analyze, and vote on staking yield rewards, 24K gold reserve allocations, developer payouts, and Firebase cloud infrastructure.
          </p>
        </div>

        {/* Tab Switcher & Header Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1 gap-1">
            {([
              { id: 'PROPOSALS', label: 'Proposals', icon: Vote, badge: null },
              { id: 'VOTING_GOVERNANCE', label: 'Voting Console', icon: CheckCircle2, badge: null },
              { id: 'ANALYTICS', label: 'Analytics', icon: BarChart3, badge: null },
              { id: 'ALERTS', label: 'Alerts', icon: Bell, badge: unreadAlertsCount > 0 ? unreadAlertsCount : null },
              { id: 'REVENUE_SHARING', label: 'Revenue Sharing', icon: DollarSign, badge: null }
            ] as Array<{ id: 'PROPOSALS' | 'VOTING_GOVERNANCE' | 'ANALYTICS' | 'ALERTS' | 'REVENUE_SHARING'; label: string; icon: any; badge: number | null }>).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  hapticEngine.trigger('click');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === t.id
                    ? 'bg-yellow-500 text-slate-950 font-black shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <t.icon className="w-4 h-4" />
                <span>{t.label}</span>
                {t.badge && (
                  <span className="bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full text-[9px] animate-pulse">
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsDelegateModalOpen(true);
                hapticEngine.trigger('click');
              }}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-yellow-300 border border-yellow-500/40 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>Delegate</span>
            </button>

            <button
              onClick={() => {
                setIsCreateProposalOpen(true);
                hapticEngine.trigger('click');
              }}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-black rounded-2xl text-xs uppercase shadow-xl transition-all flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Proposal</span>
            </button>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-yellow-950 border border-yellow-500/50 text-yellow-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-bounce relative z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-yellow-400">✕</button>
        </div>
      )}

      {/* Metric Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span>Your Voting Power</span>
          </span>
          <span className="text-2xl font-black text-yellow-400 block">{userVotingPower.toLocaleString()} $OD</span>
          <span className="text-[10px] text-emerald-400 font-bold">Delegated: {delegateAddress}</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Community Treasury</span>
          </span>
          <span className="text-2xl font-black text-emerald-400 block">$50,000,000 $OD</span>
          <span className="text-[10px] text-slate-400 font-bold">100% 24K Gold Backed</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Total Staked DAO Power</span>
          </span>
          <span className="text-2xl font-black text-cyan-300 block">18,500,000 $OD</span>
          <span className="text-[10px] text-cyan-400 font-bold">Quorum Threshold: 15M</span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center space-x-1">
            <Database className="w-4 h-4 text-purple-400" />
            <span>Firebase &amp; Dev Revenue Share</span>
          </span>
          <span className="text-2xl font-black text-purple-300 block">10% Firebase / 10% Dev</span>
          <span className="text-[10px] text-purple-400 font-bold">60% Port / 20% Staking</span>
        </div>
      </div>

      {/* TAB 1: PROPOSALS */}
      {activeTab === 'PROPOSALS' && (
        <div className="space-y-6 relative z-10 font-mono text-xs">
          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs">
            <div className="flex flex-wrap gap-2">
              {['ALL', 'STAKING_REWARDS', 'TOKENOMICS', 'TREASURY_ALLOCATION', 'PORT_INFRASTRUCTURE', 'REVENUE_SPLIT'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategoryFilter(cat);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase transition-all border ${
                    activeCategoryFilter === cat
                      ? 'bg-yellow-500 text-slate-950 border-yellow-400 font-black'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-yellow-500 font-sans"
              />
            </div>
          </div>

          {/* Proposals List */}
          <div className="space-y-6">
            {filteredProposals.map((prop) => {
              const totalVotes = prop.votesFor + prop.votesAgainst + prop.votesAbstain;
              const pctFor = totalVotes > 0 ? Math.round((prop.votesFor / totalVotes) * 100) : 0;
              const pctAgainst = totalVotes > 0 ? Math.round((prop.votesAgainst / totalVotes) * 100) : 0;

              return (
                <div
                  key={prop.id}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all space-y-5 shadow-2xl ${
                    prop.status === 'ACTIVE'
                      ? 'bg-slate-900 border-yellow-500/60 ring-1 ring-yellow-500/30'
                      : 'bg-slate-900/70 border-slate-800'
                  }`}
                >
                  {/* Top Meta Line */}
                  <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-yellow-400 font-bold text-sm">{prop.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        prop.status === 'ACTIVE'
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 animate-pulse'
                          : prop.status === 'PASSED' || prop.status === 'EXECUTED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}>
                        {prop.status}
                      </span>
                      <span className="bg-slate-950 text-slate-400 border border-slate-800 px-2.5 py-0.5 rounded-full text-[9px] font-bold">
                        {prop.category.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{prop.endTime}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white">{prop.title}</h3>
                    <p className="text-slate-300 text-xs font-sans leading-relaxed">{prop.description}</p>
                    <div className="text-[10px] text-slate-400 pt-1">Proposer: <strong className="text-slate-200">{prop.proposer}</strong> | Created: {prop.createdAt}</div>
                  </div>

                  {/* Proposed Params (if any) */}
                  {(prop.proposedApyChange || prop.treasuryAmountOd) && (
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap gap-4 text-xs">
                      {prop.proposedApyChange && (
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase block">Yield APY Impact</span>
                          <span className="text-emerald-400 font-bold">{prop.proposedApyChange}</span>
                        </div>
                      )}
                      {prop.treasuryAmountOd && (
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase block">Treasury Grant Amount</span>
                          <span className="text-yellow-400 font-bold">${prop.treasuryAmountOd.toLocaleString()} $OD</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vote Tally & Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-emerald-400">FOR: {(prop.votesFor / 1000000).toFixed(2)}M ({pctFor}%)</span>
                      <span className="text-rose-400">AGAINST: {(prop.votesAgainst / 1000000).toFixed(2)}M ({pctAgainst}%)</span>
                    </div>

                    {/* Multi-color Progress Bar */}
                    <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 flex">
                      <div style={{ width: `${pctFor}%` }} className="bg-emerald-500 h-full transition-all" />
                      <div style={{ width: `${pctAgainst}%` }} className="bg-rose-500 h-full transition-all" />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                      <span>Quorum: {((totalVotes / prop.quorumNeeded) * 100).toFixed(0)}% reached ({totalVotes.toLocaleString()} / {prop.quorumNeeded.toLocaleString()})</span>
                      {prop.userVoted && (
                        <span className="text-yellow-400 font-bold">You Voted: [{prop.userVoted}] ✓</span>
                      )}
                    </div>
                  </div>

                  {/* Voting Action Buttons (Active status only) */}
                  {prop.status === 'ACTIVE' && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => handleVote(prop.id, 'FOR')}
                        disabled={!!prop.userVoted}
                        className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase transition-all flex items-center justify-center space-x-1.5 ${
                          prop.userVoted === 'FOR'
                            ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                            : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Vote FOR</span>
                      </button>

                      <button
                        onClick={() => handleVote(prop.id, 'AGAINST')}
                        disabled={!!prop.userVoted}
                        className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase transition-all flex items-center justify-center space-x-1.5 ${
                          prop.userVoted === 'AGAINST'
                            ? 'bg-rose-500 text-white shadow-lg font-black'
                            : 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Vote AGAINST</span>
                      </button>

                      <button
                        onClick={() => handleVote(prop.id, 'ABSTAIN')}
                        disabled={!!prop.userVoted}
                        className={`px-4 py-3 rounded-2xl font-bold text-xs uppercase transition-all bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800 ${
                          prop.userVoted === 'ABSTAIN' ? 'text-white border-white' : ''
                        }`}
                      >
                        Abstain
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 1.5: VOTING GOVERNANCE CONSOLE */}
      {activeTab === 'VOTING_GOVERNANCE' && (
        <VotingGovernanceView />
      )}

      {/* TAB 2: GOVERNANCE ANALYTICS */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-6 relative z-10 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voting Participation Breakdown */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-yellow-400" />
                <span>DAO Voting Participation &amp; Quorum Metrics</span>
              </h3>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Average Proposal Quorum Rate:</span>
                    <strong className="text-yellow-400">{avgQuorumPct}%</strong>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div style={{ width: `${Math.min(avgQuorumPct, 100)}%` }} className="bg-yellow-500 h-full" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Total On-Chain Votes Cast:</span>
                    <strong className="text-cyan-300">{(totalVotesCastAll / 1000000).toFixed(2)}M $OD</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Active vs Executed Proposals:</span>
                    <strong className="text-emerald-400">{activeProposalsCount} Active / {passedProposalsCount} Executed</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <span>Proposal Categories &amp; Treasury Allocations</span>
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300 font-bold">Staking Rewards &amp; Yield</span>
                  <span className="text-yellow-400 font-bold">40% of Proposals</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300 font-bold">Treasury Grants &amp; Gold Reserves</span>
                  <span className="text-emerald-400 font-bold">30% of Proposals</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300 font-bold">Tokenomics &amp; Clearance Time</span>
                  <span className="text-cyan-400 font-bold">15% of Proposals</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-300 font-bold">Developer &amp; Firebase Revenue Split</span>
                  <span className="text-purple-400 font-bold">15% of Proposals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GOVERNANCE ALERTS */}
      {activeTab === 'ALERTS' && (
        <div className="space-y-6 relative z-10 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Bell className="w-5 h-5 text-yellow-400" />
              <span>Real-time Governance &amp; Proposal Activity Alerts</span>
            </h3>
            <button
              onClick={markAllAlertsAsRead}
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-bold"
            >
              Mark All Read
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => markAlertAsRead(alert.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl ${
                  !alert.read
                    ? 'bg-slate-900 border-yellow-500/60 ring-1 ring-yellow-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : alert.severity === 'WARNING'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : alert.severity === 'SUCCESS'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}>
                      {alert.severity}
                    </span>
                    <h4 className="text-sm font-black text-white">{alert.title}</h4>
                  </div>
                  <p className="text-slate-300 text-xs font-sans">{alert.message}</p>
                </div>

                <div className="flex items-center space-x-3 shrink-0 text-slate-400 text-[10px]">
                  <span>{alert.timestamp}</span>
                  {!alert.read && <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REVENUE SHARING (REVENUE STATUS, VISUALIZER, ALERTS, FAQ) */}
      {activeTab === 'REVENUE_SHARING' && (
        <div className="space-y-6 relative z-10 font-mono text-xs">
          {/* Revenue Sub-Navigation Bar */}
          <div className="p-2 rounded-2xl bg-slate-900 border border-purple-500/40 flex flex-wrap gap-2 justify-between items-center shadow-lg">
            <div className="flex gap-1 overflow-x-auto">
              {([
                { id: 'STATUS', label: 'Revenue Status UI', icon: Activity },
                { id: 'VISUALIZER', label: 'Visualizer Earnings', icon: LineChart },
                { id: 'ALERTS', label: 'Revenue Alerts', icon: Bell, badge: unreadRevenueAlertsCount > 0 ? unreadRevenueAlertsCount : null },
                { id: 'CALCULATOR', label: 'Crypto Calculator', icon: Calculator },
                { id: 'WHITE_PAPER', label: 'Dev Whitepaper & Email', icon: Mail },
                { id: 'FAQ', label: 'Revenue FAQ & Guide', icon: HelpCircle }
              ] as Array<{ id: 'STATUS' | 'VISUALIZER' | 'ALERTS' | 'CALCULATOR' | 'WHITE_PAPER' | 'FAQ'; label: string; icon: any; badge?: number | null }>).map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setRevenueSubTab(st.id);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                    revenueSubTab === st.id
                      ? 'bg-purple-600 text-white font-black shadow-lg shadow-purple-900/40 ring-1 ring-purple-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <st.icon className="w-4 h-4" />
                  <span>{st.label}</span>
                  {st.badge ? (
                    <span className="bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full text-[9px] animate-pulse">
                      {st.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-purple-300 font-bold px-3 py-1 bg-purple-950/60 rounded-xl border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>CONTRACT: 0xOD...DAO99</span>
            </div>
          </div>

          {/* SUB-VIEW 1: REVENUE STATUS UI */}
          {revenueSubTab === 'STATUS' && (
            <div className="space-y-6">
              {/* Real-time Status Banner */}
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-purple-500/60 shadow-2xl space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                  <div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                      PROTOCOL STATUS: 100% OPERATIONAL
                    </span>
                    <h3 className="text-xl font-black text-white mt-1.5 flex items-center space-x-2">
                      <Activity className="w-6 h-6 text-purple-400" />
                      <span>Ocean Dollar Live Revenue Status Dashboard</span>
                    </h3>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-yellow-400 animate-spin-slow" />
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Next Daily Batch Clearance</span>
                      <span className="text-sm font-black text-yellow-400">14h 22m 15s (00:00 UTC)</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-xs font-sans leading-relaxed">
                  Every transaction fee, port demurrage tariff, and container clearance levy is split on-chain automatically. Below is the real-time operational status of all 4 settlement channels.
                </p>

                {/* Node Infrastructure Health Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* 1. Port Operations */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-amber-400 uppercase">60% Port Operations</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">ONLINE</span>
                    </div>
                    <div className="text-2xl font-black text-white">${portShare.toLocaleString()} $OD</div>
                    <div className="text-[10px] text-slate-400 font-sans space-y-1">
                      <p>Active Ports: Chittagong, Singapore, Dubai</p>
                      <p className="text-amber-300 font-mono">Lifetime Disbursed: $2,910,000 $OD</p>
                    </div>
                  </div>

                  {/* 2. Staking Yield */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-yellow-400 uppercase">20% Staking Yield</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">ACTIVE</span>
                    </div>
                    <div className="text-2xl font-black text-white">${stakingShare.toLocaleString()} $OD</div>
                    <div className="text-[10px] text-slate-400 font-sans space-y-1">
                      <p>Collateral: 24K Gold Zurich Vaults</p>
                      <p className="text-yellow-300 font-mono">Lifetime Disbursed: $970,000 $OD</p>
                    </div>
                  </div>

                  {/* 3. Developer Share */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-emerald-400 uppercase">10% Developer Pool</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">VERIFIED</span>
                    </div>
                    <div className="text-2xl font-black text-white">${devShare.toLocaleString()} $OD</div>
                    <div className="text-[10px] text-slate-400 font-sans space-y-1">
                      <p>Vault: 3-of-5 Dev Multisig Key</p>
                      <p className="text-emerald-300 font-mono">Lifetime Disbursed: $485,000 $OD</p>
                    </div>
                  </div>

                  {/* 4. Firebase Cloud Persistence */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-cyan-400 uppercase">10% Firebase Cloud</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">SYNCED</span>
                    </div>
                    <div className="text-2xl font-black text-white">${firebaseShare.toLocaleString()} $OD</div>
                    <div className="text-[10px] text-slate-400 font-sans space-y-1">
                      <p>Latency: 14ms (100% Health)</p>
                      <p className="text-cyan-300 font-mono">Lifetime Disbursed: $485,000 $OD</p>
                    </div>
                  </div>
                </div>

                {/* Settlement Cycle & Verification Quick Guide */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-white flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>On-Chain Settlement Verification</span>
                    </h4>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                      All distributions are executed by DAO smart contract <code className="bg-slate-900 px-1.5 py-0.5 rounded text-purple-300">0xOD...DAO99</code>. Firebase Firestore events are synchronized to database ID <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-[10px]">ai-studio-southasiaclimate-...</code>.
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <button
                      onClick={() => {
                        hapticEngine.trigger('click');
                        setToastMessage('Refreshing live database ledger state...');
                        setTimeout(() => setToastMessage(null), 2500);
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-black text-xs transition-all flex items-center space-x-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh Ledger</span>
                    </button>
                    <button
                      onClick={handleTriggerSimulatedRevenueAlert}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-yellow-300 border border-yellow-500/40 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Trigger Payout Event</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Expected Revenue Growth Chart View based on Subscription Tiers & Staking Activities */}
              <RevenueProjectionChartView />
            </div>
          )}

          {/* SUB-VIEW 2: VISUALIZER EARNINGS */}
          {revenueSubTab === 'VISUALIZER' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-purple-500/60 shadow-2xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                  <div>
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase">
                      INTERACTIVE EARNINGS &amp; PROJECTION VISUALIZER
                    </span>
                    <h3 className="text-xl font-black text-white mt-1 flex items-center space-x-2">
                      <LineChart className="w-6 h-6 text-purple-400" />
                      <span>Ocean Dollar Revenue Stream Visualizer</span>
                    </h3>
                  </div>

                  {/* Mode Switcher */}
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {(['MONTHLY', 'EPOCH', 'DISTRIBUTION'] as Array<'MONTHLY' | 'EPOCH' | 'DISTRIBUTION'>).map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setVisualizerViewMode(m);
                          hapticEngine.trigger('click');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          visualizerViewMode === m
                            ? 'bg-purple-600 text-white font-black'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {m === 'MONTHLY' ? '12-Mo Projection' : m === 'EPOCH' ? 'Epoch History' : 'Ratio Pie'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Revenue Range Slider */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold flex items-center space-x-2">
                      <Sliders className="w-4 h-4 text-purple-400" />
                      <span>Adjust Projected Monthly Protocol Volume ($OD):</span>
                    </span>
                    <strong className="text-xl font-black text-yellow-400">${monthlyProtocolRevenue.toLocaleString()} $OD</strong>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={monthlyProtocolRevenue}
                    onChange={(e) => setMonthlyProtocolRevenue(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-slate-900 rounded-lg cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>$100,000 $OD</span>
                    <span>$5,000,000 $OD</span>
                    <span>$10,000,000 $OD</span>
                  </div>
                </div>

                {/* Recharts Graphical Visualizer Canvas */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 h-80">
                  {visualizerViewMode === 'MONTHLY' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPort" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorStaking" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorDev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorFirebase" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                          formatter={(value: any) => [`$${Number(value).toLocaleString()} $OD`, '']}
                        />
                        <Area type="monotone" dataKey="port" name="Port (60%)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPort)" />
                        <Area type="monotone" dataKey="staking" name="Staking (20%)" stroke="#eab308" fillOpacity={1} fill="url(#colorStaking)" />
                        <Area type="monotone" dataKey="dev" name="Developer (10%)" stroke="#10b981" fillOpacity={1} fill="url(#colorDev)" />
                        <Area type="monotone" dataKey="firebase" name="Firebase (10%)" stroke="#06b6d4" fillOpacity={1} fill="url(#colorFirebase)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}

                  {visualizerViewMode === 'EPOCH' && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={EPOCH_HISTORY_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="epoch" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                          formatter={(value: any) => [`$${Number(value).toLocaleString()} $OD`, '']}
                        />
                        <Bar dataKey="port" name="Port (60%)" fill="#f59e0b" stackId="a" />
                        <Bar dataKey="staking" name="Staking (20%)" fill="#eab308" stackId="a" />
                        <Bar dataKey="dev" name="Dev Pool (10%)" fill="#10b981" stackId="a" />
                        <Bar dataKey="firebase" name="Firebase Sync (10%)" fill="#06b6d4" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}

                  {visualizerViewMode === 'DISTRIBUTION' && (
                    <div className="flex flex-col sm:flex-row items-center justify-around h-full">
                      <ResponsiveContainer width="50%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={pieDistributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {pieDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                            formatter={(value: any) => [`${value}% Share`, '']}
                          />
                        </RechartsPie>
                      </ResponsiveContainer>
                      <div className="space-y-2 text-xs font-sans">
                        {pieDistributionData.map((d) => (
                          <div key={d.name} className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                            <span className="font-bold text-white">{d.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4 Channel Projected Yield Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30">
                    <span className="text-[10px] text-amber-400 font-black uppercase block">60% Port Demurrage</span>
                    <span className="text-xl font-black text-white">${(monthlyProtocolRevenue * 0.60).toLocaleString()}</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Annualized: ${(monthlyProtocolRevenue * 0.60 * 12).toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-yellow-500/30">
                    <span className="text-[10px] text-yellow-400 font-black uppercase block">20% Staking Yield</span>
                    <span className="text-xl font-black text-white">${(monthlyProtocolRevenue * 0.20).toLocaleString()}</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Annualized: ${(monthlyProtocolRevenue * 0.20 * 12).toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 font-black uppercase block">10% Developer Share</span>
                    <span className="text-xl font-black text-white">${(monthlyProtocolRevenue * 0.10).toLocaleString()}</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Annualized: ${(monthlyProtocolRevenue * 0.10 * 12).toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/30">
                    <span className="text-[10px] text-cyan-400 font-black uppercase block">10% Firebase Sync</span>
                    <span className="text-xl font-black text-white">${(monthlyProtocolRevenue * 0.10).toLocaleString()}</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Annualized: ${(monthlyProtocolRevenue * 0.10 * 12).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: REVENUE ALERTS */}
          {revenueSubTab === 'ALERTS' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-purple-500/60 shadow-2xl space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                  <div>
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase">
                      REAL-TIME REVENUE &amp; DISBURSEMENT NOTIFICATIONS
                    </span>
                    <h3 className="text-xl font-black text-white mt-1 flex items-center space-x-2">
                      <Bell className="w-6 h-6 text-purple-400" />
                      <span>Ocean Dollar Revenue Activity Alerts</span>
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleTriggerSimulatedRevenueAlert}
                      className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black transition-all flex items-center space-x-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Trigger Test Alert</span>
                    </button>
                    <button
                      onClick={handleMarkAllRevenueAlertsRead}
                      className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-bold transition-all"
                    >
                      Mark All Read
                    </button>
                  </div>
                </div>

                {/* Filter Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {['ALL', 'PAYOUTS', 'FIREBASE_INFRA', 'DEV_POOL', 'AUDITS'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setRevenueAlertFilter(cat);
                        hapticEngine.trigger('click');
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        revenueAlertFilter === cat
                          ? 'bg-purple-600 text-white font-black'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {/* Revenue Alert List */}
                <div className="space-y-3">
                  {filteredRevenueAlerts.map((revAlert) => (
                    <div
                      key={revAlert.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        !revAlert.read
                          ? 'bg-purple-950/40 border-purple-500/60 ring-1 ring-purple-500/30'
                          : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                            revAlert.severity === 'SUCCESS'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : revAlert.severity === 'WARNING'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : revAlert.severity === 'CRITICAL'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          }`}>
                            {revAlert.severity}
                          </span>
                          <h4 className="text-sm font-black text-white">{revAlert.title}</h4>
                        </div>
                        <p className="text-slate-300 text-xs font-sans">{revAlert.message}</p>
                        {revAlert.txHash && (
                          <div className="text-[10px] text-purple-300 font-mono">
                            On-Chain Tx Receipt: <code className="bg-slate-900 px-1 py-0.5 rounded">{revAlert.txHash}</code>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 shrink-0 text-slate-400 text-[10px]">
                        <span>{revAlert.timestamp}</span>
                        {!revAlert.read && <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 4: REVENUE FAQ & VERIFICATION GUIDE */}
          {revenueSubTab === 'FAQ' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-purple-500/60 shadow-2xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                  <div>
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase">
                      KNOWLEDGE BASE &amp; VERIFICATION INSTRUCTIONS
                    </span>
                    <h3 className="text-xl font-black text-white mt-1 flex items-center space-x-2">
                      <HelpCircle className="w-6 h-6 text-purple-400" />
                      <span>Ocean Dollar Revenue Sharing FAQ</span>
                    </h3>
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search FAQ keywords..."
                      value={faqSearchQuery}
                      onChange={(e) => setFaqSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {['ALL', 'START_DATE', 'VERIFICATION', 'FIREBASE', 'DEVELOPERS', 'GOVERNANCE', 'SECURITY'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFaqCategoryFilter(cat);
                        hapticEngine.trigger('click');
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        faqCategoryFilter === cat
                          ? 'bg-purple-600 text-white font-black'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {/* Accordion FAQ Items */}
                <div className="space-y-3">
                  {filteredFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => {
                            setExpandedFaqId(isExpanded ? null : faq.id);
                            hapticEngine.trigger('click');
                          }}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-all"
                        >
                          <span className="font-black text-sm text-white flex items-center space-x-3">
                            <span className="text-purple-400 font-mono text-xs">[{faq.id}]</span>
                            <span>{faq.question}</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3 text-xs font-sans text-slate-300">
                            <p className="leading-relaxed text-white font-medium">{faq.answer}</p>
                            {faq.detailPoints && (
                              <ul className="space-y-1.5 pl-2 pt-1 border-l-2 border-purple-500/40">
                                {faq.detailPoints.map((dp, idx) => (
                                  <li key={idx} className="text-slate-300 text-[11px]">
                                    {dp}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 5: CRYPTO CALCULATOR */}
          {revenueSubTab === 'CALCULATOR' && (
            <CryptoCalculatorView />
          )}

          {/* SUB-VIEW 6: DEVELOPER REVENUE WHITEPAPER & EMAIL INFORMING */}
          {revenueSubTab === 'WHITE_PAPER' && (
            <DeveloperRevenueWhitepaperView />
          )}
        </div>
      )}

      {/* New Proposal Modal */}
      {isCreateProposalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleCreateProposal}
            className="bg-slate-900 border-2 border-yellow-500/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 font-mono text-xs shadow-2xl relative"
          >
            <h3 className="text-xl font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <PlusCircle className="w-6 h-6 text-yellow-400" />
              <span>Create Ocean Dollar Governance Proposal</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-[10px] uppercase block mb-1">Proposal Title</label>
                <input
                  type="text"
                  placeholder="e.g. Increase 90-Day Yield Pool to 16.5% APY"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-bold text-xs focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 text-[10px] uppercase block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-bold text-xs focus:outline-none"
                >
                  <option value="STAKING_REWARDS">Staking Rewards &amp; Yield</option>
                  <option value="TOKENOMICS">Tokenomics &amp; Escrow Rules</option>
                  <option value="TREASURY_ALLOCATION">Treasury Grant Allocation</option>
                  <option value="PORT_INFRASTRUCTURE">Port Infrastructure Funding</option>
                  <option value="REVENUE_SPLIT">Developer &amp; Firebase Revenue Split</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[10px] uppercase block mb-1">Grant / Treasury Amount ($OD) (Optional)</label>
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-bold text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[10px] uppercase block mb-1">Detailed Rationale &amp; Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the motivation, technical mechanics, and expected maritime benefits..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs font-sans focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreateProposalOpen(false)}
                className="w-1/2 py-3 bg-slate-950 border border-slate-800 text-slate-400 font-bold rounded-2xl hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-2xl shadow-lg flex items-center justify-center space-x-2"
              >
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Vote className="w-4 h-4" />}
                <span>{isSubmitting ? 'Submitting...' : 'Submit Proposal'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delegation Modal */}
      {isDelegateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border-2 border-yellow-500/60 rounded-3xl p-6 max-w-md w-full space-y-4 font-mono text-xs shadow-2xl">
            <h3 className="text-lg font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <span>Delegate Your 25,000 $OD Voting Power</span>
            </h3>

            <p className="text-slate-300 text-xs font-sans">
              You can delegate your voting weight to a trusted Master Mariner officer, Vault Custodian, or retain self-voting power.
            </p>

            <div className="space-y-2">
              <label className="text-slate-400 text-[10px] uppercase block">Select Delegate Address</label>
              <select
                value={delegateAddress}
                onChange={(e) => setDelegateAddress(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-bold text-xs focus:outline-none"
              >
                <option value="Self (0x7F...92A1)">Self (0x7F...92A1) - Direct Voting</option>
                <option value="Capt. Aris Thorne (0x3B...119A)">Capt. Aris Thorne (Master Mariner)</option>
                <option value="Singapore Port Clearing Guild (0x9A...44C1)">Singapore Port Clearing Guild</option>
                <option value="Chittagong Vault Custodian (0x2C...8812)">Chittagong Vault Custodian</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setIsDelegateModalOpen(false)}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-2xl shadow-lg"
              >
                Confirm Delegation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
