import React, { useState, useEffect } from 'react';
import { 
  Coins, Lock, TrendingUp, PieChart, BellRing, DollarSign, Award, ShieldCheck, 
  Sparkles, Layers, Landmark, ChevronRight, CheckCircle2, ArrowUpRight, Calculator,
  Vote, FileText, Cpu, AlertCircle, RefreshCw, BarChart2, Globe, Users, Gift,
  Sliders, ShieldAlert, Clock, ChevronUp, ChevronDown, Unlock, AlertTriangle, Compass, MapPin, Crown,
  Zap, History, Radio, Bell, Scale, Download, Shield, FileCheck, Check, Share2, FileSpreadsheet, KeyRound, LineChart
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, 
  CartesianGrid, PieChart as RechartsPie, Pie, Cell 
} from 'recharts';
import { CryptoCalculatorView } from './CryptoCalculatorView';
import { DeveloperRevenueWhitepaperView } from './DeveloperRevenueWhitepaperView';

export interface DaoProposal {
  id: string;
  title: string;
  category: string;
  requestedFundingOd: string;
  yesVotesPercent: number;
  noVotesPercent: number;
  status: 'ACTIVE_VOTING' | 'PASSED' | 'EXECUTED';
  deadline: string;
}

export interface GovernanceNotification {
  id: string;
  timestamp: string;
  type: 'GOVERNANCE_ALERT' | 'QUORUM_REACHED' | 'PROPOSAL_EXECUTED';
  title: string;
  message: string;
  badgeColor: string;
}

export interface StakingMilestoneTier {
  id: string;
  tierName: string;
  minStakeOd: number;
  apyText: string;
  votingMultiplier: number;
  badgeColor: string;
  icon: any;
  perks: string;
}

export interface DaoVotingHistoryRecord {
  id: string;
  proposalId: string;
  proposalTitle: string;
  userVote: 'YES' | 'NO';
  voteWeightOd: number;
  statusOutcome: 'PASSED' | 'EXECUTED';
  timestamp: string;
  blockReceiptHash: string;
}

export interface DaoPayoutHistoryRecord {
  id: string;
  date: string;
  sourcePool: string;
  payoutOd: number;
  payoutAsset: string;
  taxWithheldOd: number;
  status: 'SETTLED';
  txHash: string;
}

export interface TaxNotificationAlert {
  id: string;
  timestamp: string;
  type: 'EXEMPTION_RENEWED' | 'CERTIFICATE_ISSUED' | 'AUDIT_COMPLETED';
  title: string;
  message: string;
  badgeColor: string;
}

export interface YieldAlertRecord {
  id: string;
  timestamp: string;
  alertType: 'YIELD_CREDITED' | 'APY_BOOST' | 'VESTING_RELEASE' | 'VAULT_MILESTONE';
  title: string;
  message: string;
  iconColor: string;
}

export interface DaoAuditRecord {
  id: string;
  auditor: string;
  category: 'SMART_CONTRACT' | 'RESERVE_COLLATERAL' | 'QUANTUM_SECURITY';
  scoreText: string;
  status: 'VERIFIED_PASSED';
  lastAuditDate: string;
  reportUrl: string;
}

export const DAO_PROPOSALS: DaoProposal[] = [
  {
    id: 'PROP-2026-04',
    title: 'Colombo Port Terminal 3 Deepwater Dredging Expansion',
    category: 'PORT INFRASTRUCTURE',
    requestedFundingOd: '$15,000,000 OD',
    yesVotesPercent: 88.4,
    noVotesPercent: 11.6,
    status: 'ACTIVE_VOTING',
    deadline: '12 Hours Remaining'
  },
  {
    id: 'PROP-2026-03',
    title: 'Add 1,000 oz Gold Bullion to Deep Ocean Reserve Vault 2-B',
    category: 'RESERVE BACKING',
    requestedFundingOd: '$2,480,000 OD',
    yesVotesPercent: 96.2,
    noVotesPercent: 3.8,
    status: 'PASSED',
    deadline: 'Executed'
  },
  {
    id: 'PROP-2026-02',
    title: 'Sundarbans Blue Carbon Mangrove Reforestation Grant',
    category: 'CARBON CREDITS',
    requestedFundingOd: '$1,200,000 OD',
    yesVotesPercent: 92.1,
    noVotesPercent: 7.9,
    status: 'EXECUTED',
    deadline: 'Completed'
  }
];

export const DAO_PROFIT_STRATEGIES = [
  {
    assetName: 'Port Toll Tariff Re-investment',
    allocationShare: '35%',
    avgApy: '12.8%',
    description: 'Direct yield share from container vessel dockage, harbor pilotage, and crane tariffs.',
    color: '#06b6d4'
  },
  {
    assetName: 'Gold Bullion Arbitrage & Vault Lending',
    allocationShare: '30%',
    avgApy: '9.4%',
    description: 'Low-risk 24K pure physical gold vault lending to international bullion banks.',
    color: '#eab308'
  },
  {
    assetName: 'Verra Blue Carbon Credit Trading',
    allocationShare: '20%',
    avgApy: '18.5%',
    description: 'High-margin ocean mangrove carbon offset certificate sales to Fortune 500 fleets.',
    color: '#10b981'
  },
  {
    assetName: 'Container Freight Yield Financing',
    allocationShare: '15%',
    avgApy: '16.2%',
    description: 'Short-term AAA-rated maritime bill-of-lading cargo invoice factoring.',
    color: '#a855f7'
  }
];

export const DAO_AUDIT_RECORDS: DaoAuditRecord[] = [
  {
    id: 'AUDIT-CERTIK',
    auditor: 'CertiK Formal Verification',
    category: 'SMART_CONTRACT',
    scoreText: '99.8 / 100 Security Score',
    status: 'VERIFIED_PASSED',
    lastAuditDate: 'Aug 15, 2026',
    reportUrl: 'https://certik.com/projects/iod-sovereign'
  },
  {
    id: 'AUDIT-KPMG',
    auditor: 'KPMG High Seas Audit',
    category: 'RESERVE_COLLATERAL',
    scoreText: '102.1% Solvency Ratio',
    status: 'VERIFIED_PASSED',
    lastAuditDate: 'Aug 01, 2026',
    reportUrl: 'https://kpmg.com/audits/iod-reserve-proof'
  },
  {
    id: 'AUDIT-KYBER',
    auditor: 'Kyber Quantum Lattice Security',
    category: 'QUANTUM_SECURITY',
    scoreText: 'Kyber-1024 Quantum Shield Active',
    status: 'VERIFIED_PASSED',
    lastAuditDate: 'Jul 20, 2026',
    reportUrl: 'https://quantum.security/kyber1024-iod'
  }
];

export const DAO_PAYOUT_HISTORY: DaoPayoutHistoryRecord[] = [
  {
    id: 'PAYOUT-2026-08-19',
    date: 'Aug 19, 2026',
    sourcePool: 'Port Toll Tariff Yield Pool',
    payoutOd: 148.50,
    payoutAsset: '$OD Stablecoin',
    taxWithheldOd: 0.00,
    status: 'SETTLED',
    txHash: '0x9a4f...21c8'
  },
  {
    id: 'PAYOUT-2026-08-18',
    date: 'Aug 18, 2026',
    sourcePool: 'Gold Bullion Arbitrage Pool',
    payoutOd: 148.50,
    payoutAsset: '$OD Stablecoin',
    taxWithheldOd: 0.00,
    status: 'SETTLED',
    txHash: '0x7e22...88b1'
  },
  {
    id: 'PAYOUT-2026-08-17',
    date: 'Aug 17, 2026',
    sourcePool: 'Verra Blue Carbon Yield Pool',
    payoutOd: 148.50,
    payoutAsset: '$OD Stablecoin',
    taxWithheldOd: 0.00,
    status: 'SETTLED',
    txHash: '0x4b10...53a9'
  }
];

export const INITIAL_TAX_NOTIFICATIONS: TaxNotificationAlert[] = [
  {
    id: 'TAX-NOTIF-01',
    timestamp: '1 hour ago',
    type: 'EXEMPTION_RENEWED',
    title: 'UNCLOS 0% Tax Exemption Renewed',
    message: 'International High Seas Sovereignty Certificate verified for FY 2026/2027.',
    badgeColor: '#10b981'
  },
  {
    id: 'TAX-NOTIF-02',
    timestamp: '1 day ago',
    type: 'CERTIFICATE_ISSUED',
    title: '2026 Tax Withholding Certificate Issued',
    message: 'Official $0.00 Tax Withheld Statement available for download in PDF format.',
    badgeColor: '#06b6d4'
  },
  {
    id: 'TAX-NOTIF-03',
    timestamp: '3 days ago',
    type: 'AUDIT_COMPLETED',
    title: 'KPMG Maritime Compliance Audit Complete',
    message: '100% Zero-Knowledge audit confirms total tax compliance across 140 maritime flag states.',
    badgeColor: '#eab308'
  }
];

export const TAX_TRANSPARENCY_FAQS = [
  {
    question: 'Why is $OD staking yield subject to 0% withholding tax?',
    answer: 'Under UNCLOS Article 87 (Freedom of the High Seas), financial yields generated in extraterritorial maritime waters are legally exempt from national terrestrial jurisdiction withholding taxes.',
    category: 'LEGAL BASIS'
  },
  {
    question: 'How do I download my official tax compliance certificate?',
    answer: 'Click the "Download 2026 Tax Exemption Statement" button above to instantly generate a digitally signed PDF certificate verifying your 0% withholding status.',
    category: 'CERTIFICATES'
  },
  {
    question: 'Does the DAO report my staking earnings to land-locked tax authorities?',
    answer: 'The DAO utilizes Zero-Knowledge Proofs (zk-SNARKs) to maintain user privacy while allowing stakers to self-certify compliance according to their home jurisdiction laws.',
    category: 'PRIVACY'
  },
  {
    question: 'What happens when converting $OD yield into fiat currency?',
    answer: 'While staking rewards carry 0% withholding at source on High Seas, conversion into local fiat bank accounts may be subject to local capital gains rules depending on your personal tax residence.',
    category: 'FIAT CONVERSION'
  }
];

export const IOD_DAO_ROADMAP = [
  {
    quarter: 'Q1 2026',
    title: 'Sovereign Treasury & $482.5M OD TVL Launch',
    desc: 'Deployment of Kyber-1024 quantum vault contracts and initial gold bullion reserve backing.',
    status: 'COMPLETED',
    color: '#10b981'
  },
  {
    quarter: 'Q2 2026',
    title: 'Port Authority Tariff Settlement Bridge',
    desc: 'Direct $OD integration with Colombo, JNPT Mumbai, and Jebel Ali Dubai container port terminals.',
    status: 'IN_PROGRESS',
    color: '#06b6d4'
  },
  {
    quarter: 'Q3 2026',
    title: 'Physical Gold Bullion Tokenization (gOD)',
    desc: 'Launch 1:1 redeemable 24K physical gold certificates vaulted in Zurich & Singapore.',
    status: 'UPCOMING',
    color: '#eab308'
  },
  {
    quarter: 'Q4 2026',
    title: 'Verra Ocean Mangrove Carbon Offset Registry',
    desc: 'Tokenized blue carbon credit trading platform for international commercial shipping fleets.',
    status: 'UPCOMING',
    color: '#a855f7'
  }
];

export const STAKING_TIER_MILESTONES: StakingMilestoneTier[] = [
  {
    id: 'TIER-BRONZE',
    tierName: 'Bronze Seafarer',
    minStakeOd: 1000,
    apyText: '7.8% Flexible APY',
    votingMultiplier: 1.0,
    badgeColor: '#cd7f32',
    icon: Compass,
    perks: 'Standard Liquid Withdrawal & Daily Payouts'
  },
  {
    id: 'TIER-SILVER',
    tierName: 'Silver Navigator',
    minStakeOd: 10000,
    apyText: '14.2% Locked APY',
    votingMultiplier: 1.2,
    badgeColor: '#94a3b8',
    icon: ShieldCheck,
    perks: 'Priority Payout Routing & DAO Proposal Submission Rights'
  },
  {
    id: 'TIER-GOLD',
    tierName: 'Gold Admiral',
    minStakeOd: 50000,
    apyText: '18.5% Vault APY',
    votingMultiplier: 1.5,
    badgeColor: '#eab308',
    icon: Award,
    perks: 'Zero Fee Emergency Unlock & Gold Bullion Token Staking'
  },
  {
    id: 'TIER-SOVEREIGN',
    tierName: 'Sovereign Fleet Commander',
    minStakeOd: 250000,
    apyText: '22.5% Maximum APY',
    votingMultiplier: 2.0,
    badgeColor: '#a855f7',
    icon: Crown,
    perks: 'Direct Seat on Port Authority DAO Council & 0% Fee Wire Transfers'
  }
];

export const DAO_VOTING_HISTORY: DaoVotingHistoryRecord[] = [
  {
    id: 'VOTE-REC-01',
    proposalId: 'PROP-2026-03',
    proposalTitle: 'Add 1,000 oz Gold Bullion to Deep Ocean Reserve Vault 2-B',
    userVote: 'YES',
    voteWeightOd: 50000,
    statusOutcome: 'PASSED',
    timestamp: 'Aug 18, 2026 - 14:22 UTC',
    blockReceiptHash: '0x8f2a...39e1'
  },
  {
    id: 'VOTE-REC-02',
    proposalId: 'PROP-2026-02',
    proposalTitle: 'Sundarbans Blue Carbon Mangrove Reforestation Grant',
    userVote: 'YES',
    voteWeightOd: 50000,
    statusOutcome: 'EXECUTED',
    timestamp: 'Aug 10, 2026 - 09:15 UTC',
    blockReceiptHash: '0x3c71...92b4'
  },
  {
    id: 'VOTE-REC-03',
    proposalId: 'PROP-2026-01',
    proposalTitle: 'Lower Container Dockage Tariff Settlement Fees to 0.40%',
    userVote: 'NO',
    voteWeightOd: 25000,
    statusOutcome: 'EXECUTED',
    timestamp: 'Jul 28, 2026 - 18:40 UTC',
    blockReceiptHash: '0x1d44...81a0'
  }
];

export const INITIAL_YIELD_ALERTS: YieldAlertRecord[] = [
  {
    id: 'ALERT-01',
    timestamp: '5 mins ago',
    alertType: 'YIELD_CREDITED',
    title: 'Compound Yield Credited',
    message: '+$148.50 OD automatically re-invested into Vault 3-B via Auto-Compounder.',
    iconColor: '#10b981'
  },
  {
    id: 'ALERT-02',
    timestamp: '2 hours ago',
    alertType: 'APY_BOOST',
    title: 'Auto-Compounder Boost Active',
    message: 'Effective Staking APY boosted from 14.2% to 16.6% via Daily Compounding.',
    iconColor: '#06b6d4'
  },
  {
    id: 'ALERT-03',
    timestamp: '1 day ago',
    alertType: 'VESTING_RELEASE',
    title: 'Linear Vesting Tranche Released',
    message: '+$2,500.00 OD unlocked and available for liquid withdrawal or re-staking.',
    iconColor: '#eab308'
  }
];

export const STAKING_PERFORMANCE_HISTORY = [
  { month: 'Mar 2026', cumulativeYieldOd: 1200000, activeStakers: 12400 },
  { month: 'Apr 2026', cumulativeYieldOd: 3400000, activeStakers: 18200 },
  { month: 'May 2026', cumulativeYieldOd: 6800000, activeStakers: 24500 },
  { month: 'Jun 2026', cumulativeYieldOd: 11200000, activeStakers: 31000 },
  { month: 'Jul 2026', cumulativeYieldOd: 16500000, activeStakers: 38400 },
  { month: 'Aug 2026', cumulativeYieldOd: 22800000, activeStakers: 48200 }
];

export const DEVELOPER_BENEFITS_FAQS = [
  {
    question: 'How does the platform developer earn sustainable revenue?',
    answer: 'The developer earns automated protocol fees: 1.50% Seigniorage on new $OD minting, 2.00% royalty on lottery ticket sales, 0.25% on staking pool liquidity, and 0.50% on port tariff transactions.',
    category: 'MONETIZATION'
  },
  {
    question: 'How and when are developer earnings distributed?',
    answer: 'All protocol developer fees are settled automatically in real-time on-chain via smart contracts directly to the developer sovereign vault address.',
    category: 'PAYOUTS'
  },
  {
    question: 'Are developer profits subject to land-locked taxes?',
    answer: 'Developer protocol royalties are generated in UNCLOS Article 87 High Seas Maritime Sovereign Territory and carry a 0.00% Sovereign Withholding Tax Rate.',
    category: 'TAXES'
  },
  {
    question: 'How is long-term application maintenance funded?',
    answer: 'Platform earnings fund ongoing cloud hosting, Kyber-1024 quantum security audits, server maintenance, and continuous software feature upgrades.',
    category: 'SUSTAINABILITY'
  }
];

export const INITIAL_GOVERNANCE_NOTIFICATIONS: GovernanceNotification[] = [
  {
    id: 'GOV-NOTIF-01',
    timestamp: '10 mins ago',
    type: 'GOVERNANCE_ALERT',
    title: 'DAO Voting Alert: PROP-2026-04',
    message: 'Voting closes in 12 Hours on Colombo Terminal Expansion proposal.',
    badgeColor: '#3b82f6'
  },
  {
    id: 'GOV-NOTIF-02',
    timestamp: '1 hour ago',
    type: 'QUORUM_REACHED',
    title: 'Quorum Reached on PROP-2026-04',
    message: 'Over 85% of total staked $OD voting power has participated in this vote.',
    badgeColor: '#10b981'
  },
  {
    id: 'GOV-NOTIF-03',
    timestamp: '1 day ago',
    type: 'PROPOSAL_EXECUTED',
    title: 'PROP-2026-03 Smart Contract Executed',
    message: '$2.48M OD transferred to Zurich Vault for 1,000 oz physical gold acquisition.',
    badgeColor: '#eab308'
  }
];

export const IodStakingDaoAndDevRevenuePortal: React.FC = () => {
  // Staking ROI Simulator State
  const [stakeAmountOd, setStakeAmountOd] = useState<number>(50000);
  const [stakeLockDays, setStakeLockDays] = useState<number>(365);
  const [selectedApyTier, setSelectedApyTier] = useState<number>(0.142); // 14.2% APY

  // Staking Auto-Lock Switch
  const [isAutoLockEnabled, setIsAutoLockEnabled] = useState<boolean>(true);

  // Tax Calculator Jurisdiction State
  const [taxJurisdiction, setTaxJurisdiction] = useState<'UNCLOS_HIGH_SEAS' | 'FLAG_CONVENIENCE' | 'LAND_LOCKED'>('UNCLOS_HIGH_SEAS');

  // Rewards Diversification Payout Preference
  const [rewardPayoutAsset, setRewardPayoutAsset] = useState<'OD' | 'GOLD_TOKEN' | 'CARBON_CREDIT'>('OD');

  // Auto-Compounder State
  const [isAutoCompoundEnabled, setIsAutoCompoundEnabled] = useState<boolean>(true);
  const [compoundFrequency, setCompoundFrequency] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');

  // Vesting State
  const [vestedClaimableOd, setVestedClaimableOd] = useState<number>(32500);
  const [lockedVestingOd, setLockedVestingOd] = useState<number>(17500);
  const [vestingClaimMsg, setVestingClaimMsg] = useState<string | null>(null);

  // Yield Alerts Preferences
  const [pushAlertsEnabled, setPushAlertsEnabled] = useState<boolean>(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState<boolean>(true);
  const [telegramAlertsEnabled, setTelegramAlertsEnabled] = useState<boolean>(true);

  // Developer Profit Model Simulator State
  const [monthlyPlatformVolumeUsd, setMonthlyPlatformVolumeUsd] = useState<number>(25000000);

  // Staking Action State
  const [userStakedTotal, setUserStakedTotal] = useState<number>(50000);
  const [stakeSuccessMsg, setStakeSuccessMsg] = useState<string | null>(null);

  // Tax Export State
  const [taxExportSuccessMsg, setTaxExportSuccessMsg] = useState<string | null>(null);

  // Emergency Unlock State
  const [showEmergencyUnlockModal, setShowEmergencyUnlockModal] = useState<boolean>(false);
  const [emergencyUnlockMsg, setEmergencyUnlockMsg] = useState<string | null>(null);

  // FAQ Accordion State
  const [openDevFaqIndex, setOpenDevFaqIndex] = useState<number | null>(0);
  const [openTaxFaqIndex, setOpenTaxFaqIndex] = useState<number | null>(0);

  // Live Timer Countdown Simulation for Stake Expiry
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(1238535); // ~14 Days

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Timer
  const daysLeft = Math.floor(timerSecondsLeft / 86400);
  const hoursLeft = Math.floor((timerSecondsLeft % 86400) / 3600);
  const minutesLeft = Math.floor((timerSecondsLeft % 3600) / 60);
  const secondsLeft = timerSecondsLeft % 60;

  // DAO Voting State
  const [votedProposals, setVotedProposals] = useState<Record<string, 'YES' | 'NO'>>({});

  // Auto-Compounder Boost Calculation
  const compounderBoost = isAutoCompoundEnabled
    ? compoundFrequency === 'DAILY'
      ? 0.024
      : compoundFrequency === 'WEEKLY'
      ? 0.018
      : 0.012
    : 0;

  const effectiveApy = selectedApyTier + compounderBoost;

  // Governance Voting Power Calculation
  const currentTierObj = STAKING_TIER_MILESTONES.find((t) => userStakedTotal >= t.minStakeOd) || STAKING_TIER_MILESTONES[0];
  const tierMultiplier = currentTierObj.votingMultiplier;
  const lockBoostMultiplier = stakeLockDays >= 365 ? 0.25 : stakeLockDays >= 90 ? 0.10 : 0.0;
  const totalVotingMultiplier = tierMultiplier + lockBoostMultiplier;
  const totalVotingPower = userStakedTotal * totalVotingMultiplier;

  // 12-Month Projected Yield Data Generator
  const yieldProjectionData = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i + 1;
    const simpleYield = (userStakedTotal * selectedApyTier * (monthIndex / 12));
    const compoundedYield = (userStakedTotal * (Math.pow(1 + effectiveApy / 12, monthIndex) - 1));
    return {
      month: `M${monthIndex}`,
      simpleYield: Math.round(simpleYield),
      compoundedYield: Math.round(compoundedYield)
    };
  });

  // Calculations for ROI Simulator
  const years = stakeLockDays / 365;
  const estimatedAnnualProfitOd = stakeAmountOd * effectiveApy;
  const estimatedTotalProfitOd = estimatedAnnualProfitOd * years;
  const estimatedTotalPortfolioOd = stakeAmountOd + estimatedTotalProfitOd;
  const estimatedMonthlyCashFlowOd = estimatedAnnualProfitOd / 12;

  // Tax Rate & Calculation
  const taxRatePercent = taxJurisdiction === 'UNCLOS_HIGH_SEAS' ? 0.0 : taxJurisdiction === 'FLAG_CONVENIENCE' ? 2.5 : 20.0;
  const calculatedTaxLiabilityOd = (estimatedAnnualProfitOd * taxRatePercent) / 100;
  const netAfterTaxYieldOd = estimatedAnnualProfitOd - calculatedTaxLiabilityOd;
  const landTaxSavingsOd = (estimatedAnnualProfitOd * 20.0) / 100 - calculatedTaxLiabilityOd;

  // Developer Revenue Calculations
  const devSeigniorageFee = monthlyPlatformVolumeUsd * 0.015;
  const devLotteryShare = monthlyPlatformVolumeUsd * 0.020;
  const devStakingFee = monthlyPlatformVolumeUsd * 0.0025;
  const devPortFee = monthlyPlatformVolumeUsd * 0.005;
  const devTotalMonthlyRevenue = devSeigniorageFee + devLotteryShare + devStakingFee + devPortFee;

  const handleClaimVestedYield = () => {
    if (vestedClaimableOd <= 0) return;
    const claimedAmount = vestedClaimableOd;
    setVestedClaimableOd(0);
    setVestingClaimMsg(`✅ Successfully Claimed $${claimedAmount.toLocaleString()} OD Vested Yield to your Liquid Wallet!`);
    setTimeout(() => setVestingClaimMsg(null), 5000);
  };

  const handleExportTaxDocument = (format: 'PDF' | 'CSV' | 'JSON') => {
    setTaxExportSuccessMsg(`📥 Downloaded Official Tax Document: IOD_TAX_REPORT_2026.${format.toLowerCase()} successfully!`);
    setTimeout(() => setTaxExportSuccessMsg(null), 5000);
  };

  const handleStakeSubmit = () => {
    setUserStakedTotal((prev) => prev + stakeAmountOd);
    setStakeSuccessMsg(`🎉 Successfully Staked $${stakeAmountOd.toLocaleString()} OD for ${stakeLockDays} Days at ${(effectiveApy * 100).toFixed(1)}% Effective APY! Rewards configured in ${rewardPayoutAsset}. Auto-Lock is ${isAutoLockEnabled ? 'ENABLED' : 'DISABLED'}.`);
    setTimeout(() => setStakeSuccessMsg(null), 5000);
  };

  const handleExecuteEmergencyUnlock = () => {
    const penaltyAmount = userStakedTotal * 0.05;
    const netReturn = userStakedTotal - penaltyAmount;
    setUserStakedTotal(0);
    setShowEmergencyUnlockModal(false);
    setEmergencyUnlockMsg(`⚠️ Emergency Unlock Executed! $${netReturn.toLocaleString()} OD principal returned to wallet (5% Liquidity Penalty: -$${penaltyAmount.toLocaleString()} OD).`);
    setTimeout(() => setEmergencyUnlockMsg(null), 6000);
  };

  const handleVoteProposal = (propId: string, vote: 'YES' | 'NO') => {
    setVotedProposals((prev) => ({ ...prev, [propId]: vote }));
  };

  return (
    <div id="iod-staking-dao-dev-revenue-portal" className="space-y-8 font-mono text-white animate-fadeIn relative">
      {/* HEADER BANNER WITH STAKE EXPIRY COUNTDOWN TIMER & AUTO-LOCK SWITCH */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl">
              <Coins className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">INTERNATIONAL OCEAN DOLLAR (IOD)</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  DAO AUDIT &amp; GOVERNANCE PORTAL
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                IOD Staking DAO &amp; Audit Ecosystem
              </h1>
              <p className="text-slate-300 text-xs font-sans mt-0.5 max-w-3xl">
                Stake Ocean Dollars ($OD) with automated vault rollover, verify real-time CertiK smart contract audits, calculate governance voting power, and project 12-month compound yield returns.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-right shrink-0">
            <span className="text-slate-400 text-[10px] block font-bold uppercase">TOTAL DAO TVL STAKED</span>
            <strong className="text-emerald-400 text-2xl font-black block">$482,500,000 OD</strong>
            <span className="text-amber-300 text-[10px] block font-sans">{(effectiveApy * 100).toFixed(1)}% Effective APY</span>
          </div>
        </div>

        {/* STAKE EXPIRY COUNTDOWN TIMER, AUTO-LOCK TOGGLE & EMERGENCY UNLOCK BAR */}
        <div id="stake-expiry-timer" className="bg-slate-900 p-4 rounded-2xl border border-amber-500/40 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-amber-400 animate-spin" />
            <div>
              <span className="text-slate-400 text-[10px] font-bold uppercase block">ACTIVE STAKING VAULT EXPIRY TIMER:</span>
              <strong className="text-amber-300 text-lg font-black font-mono">
                {daysLeft}d {hoursLeft}h {minutesLeft}m {secondsLeft}s REMAINING UNTIL UNLOCK
              </strong>
            </div>
          </div>

          {/* STAKING AUTO LOCK OPTION TOGGLE */}
          <div id="staking-auto-lock" className="flex items-center space-x-3 bg-slate-950 p-2.5 px-4 rounded-xl border border-slate-800">
            <div className="text-right">
              <span className="text-white text-xs font-bold block">STAKING AUTO-LOCK:</span>
              <span className="text-slate-400 text-[9px] block">Auto-rollover upon vault expiry</span>
            </div>
            <button
              onClick={() => setIsAutoLockEnabled(!isAutoLockEnabled)}
              className={`py-1.5 px-3 rounded-xl font-black text-[10px] uppercase transition-all ${
                isAutoLockEnabled
                  ? 'bg-emerald-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-500 border border-slate-700'
              }`}
            >
              {isAutoLockEnabled ? 'AUTO-LOCK ON' : 'OFF'}
            </button>
          </div>

          <button
            onClick={() => setShowEmergencyUnlockModal(true)}
            className="py-2.5 px-4 bg-red-600/30 border border-red-500 hover:bg-red-600 text-red-200 font-black text-xs uppercase rounded-xl transition-all flex items-center space-x-2 shrink-0"
          >
            <Unlock className="w-4 h-4" />
            <span>EMERGENCY UNLOCK (5% PENALTY)</span>
          </button>
        </div>

        {emergencyUnlockMsg && (
          <div className="bg-red-500/20 border border-red-400 text-red-200 p-4 rounded-2xl text-xs font-bold font-mono animate-fadeIn">
            {emergencyUnlockMsg}
          </div>
        )}
      </div>

      {/* 1. GOVERNANCE VOTING POWER & 12-MONTH YIELD PROJECTION GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GOVERNANCE VOTING POWER CARD */}
        <div id="governance-voting-power" className="lg:col-span-5 bg-slate-950 border border-purple-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Crown className="w-6 h-6 text-purple-400" />
            <div>
              <strong className="text-white font-black text-lg block">Governance Voting Power Card</strong>
              <span className="text-[10px] text-slate-400 font-mono">CALCULATED DAO VOTE WEIGHT CALCULATOR</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="bg-slate-900 p-4 rounded-2xl border border-purple-500/50 text-center space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">TOTAL EFFECTIVE GOVERNANCE VOTES</span>
              <strong className="text-purple-300 text-3xl font-black block">{Math.round(totalVotingPower).toLocaleString()} VOTES</strong>
              <span className="text-amber-300 text-[10px] font-sans font-bold block">{totalVotingMultiplier.toFixed(2)}x Multiplier Applied</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-[11px] font-sans">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Base Staked $OD:</span>
                <strong className="text-white font-mono">${userStakedTotal.toLocaleString()} OD</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Tier Multiplier ({currentTierObj.tierName}):</span>
                <strong className="text-emerald-400 font-mono">{tierMultiplier.toFixed(1)}x</strong>
              </div>
              <div className="flex justify-between items-center border-t border-slate-800 pt-2">
                <span className="text-slate-400">Lock Duration Bonus ({stakeLockDays}d):</span>
                <strong className="text-amber-300 font-mono">+{lockBoostMultiplier.toFixed(2)}x Boost</strong>
              </div>
            </div>
          </div>
        </div>

        {/* YIELD PROJECTION GRAPH */}
        <div id="yield-projection-graph" className="lg:col-span-7 bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
            <LineChart className="w-5 h-5 text-emerald-400" />
            <div>
              <strong className="text-white font-black text-lg block">12-Month Yield Projection Graph</strong>
              <span className="text-[10px] text-slate-400 font-mono">STANDARD VS AUTO-COMPOUNDED YIELD COMPARISON</span>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldProjectionData}>
                <defs>
                  <linearGradient id="compoundedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="simpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Area type="monotone" name="Auto-Compounded Yield" dataKey="compoundedYield" stroke="#10b981" fillOpacity={1} fill="url(#compoundedGrad)" />
                <Area type="monotone" name="Standard Staking Yield" dataKey="simpleYield" stroke="#06b6d4" fillOpacity={1} fill="url(#simpleGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. DAO AUDIT PORTAL & TAX DOCUMENTS EXPORT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* DAO AUDIT PORTAL */}
        <div id="dao-audit-portal" className="lg:col-span-7 bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <div>
              <strong className="text-white font-black text-lg block">DAO Security &amp; Solvency Audit Portal</strong>
              <span className="text-[10px] text-slate-400 font-mono">CERTIK, KPMG &amp; KYBER QUANTUM VERIFICATION</span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {DAO_AUDIT_RECORDS.map((audit) => (
              <div key={audit.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                      {audit.category}
                    </span>
                    <strong className="text-white font-bold block text-sm mt-1">{audit.auditor}</strong>
                  </div>

                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold shrink-0">
                    {audit.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px] border-t border-slate-800 pt-2 font-sans">
                  <strong className="text-emerald-400">{audit.scoreText}</strong>
                  <span className="text-slate-500">Verified: {audit.lastAuditDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TAX DOCUMENTS EXPORT */}
        <div id="tax-documents-export" className="lg:col-span-5 bg-slate-950 border border-amber-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            <div>
              <strong className="text-white font-black text-lg block">Tax Documents Export Centre</strong>
              <span className="text-[10px] text-slate-400 font-mono">MULTI-FORMAT COMPLIANCE REPORT EXPORT</span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              Export digitally signed compliance statements and full historical transaction logs for local accounting software:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleExportTaxDocument('PDF')}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-between"
              >
                <span>📄 PDF TAX EXEMPTION CERTIFICATE</span>
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleExportTaxDocument('CSV')}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-between"
              >
                <span>📊 CSV HISTORICAL TRANSACTION LEDGER</span>
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleExportTaxDocument('JSON')}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-between"
              >
                <span>💾 JSON ON-CHAIN PROOF FILE</span>
                <Download className="w-4 h-4" />
              </button>
            </div>

            {taxExportSuccessMsg && (
              <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-3 rounded-xl text-xs font-bold text-center animate-fadeIn">
                {taxExportSuccessMsg}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. SOVEREIGN STAKE TAX SUMMARY & YIELD TAX CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOVEREIGN STAKE TAX SUMMARY */}
        <div id="stake-tax-summary" className="lg:col-span-6 bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <div>
                <strong className="text-white font-black text-lg block">Stake Tax Summary Dashboard</strong>
                <span className="text-[10px] text-slate-400 font-mono">UNCLOS 0.00% HIGH SEAS EXEMPTION STATUS</span>
              </div>
            </div>

            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-xl text-[10px] font-bold">
              0.00% WITHHELD
            </span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-emerald-500/30">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">CUMULATIVE TAX SAVINGS</span>
                <strong className="text-emerald-400 text-xl font-black block">+$1,420.00 USD</strong>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">MARITIME JURISDICTION</span>
                <strong className="text-amber-300 text-sm font-black block mt-1">UNCLOS HIGH SEAS</strong>
              </div>
            </div>

            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              All staking yields generated by the Ocean Dollar protocol operate under UNCLOS Article 87 Extraterritorial High Seas Maritime Sovereignty, guaranteeing 0.00% withholding tax at source.
            </p>
          </div>
        </div>

        {/* YIELD TAX CALCULATOR */}
        <div id="yield-tax-calculator" className="lg:col-span-6 bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <div>
              <strong className="text-white font-black text-lg block">Yield Tax Liability Calculator</strong>
              <span className="text-[10px] text-slate-400 font-mono">ESTIMATE AFTER-TAX $OD YIELD ACROSS JURISDICTIONS</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold text-[10px] uppercase block">SELECT TAX JURISDICTION MODE:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'UNCLOS_HIGH_SEAS', label: '🌊 High Seas (0%)' },
                  { id: 'FLAG_CONVENIENCE', label: '⚓ Maritime (2.5%)' },
                  { id: 'LAND_LOCKED', label: '🏛️ Terrestrial (20%)' }
                ].map((jur) => (
                  <button
                    key={jur.id}
                    onClick={() => setTaxJurisdiction(jur.id as any)}
                    className={`py-2 px-1 rounded-lg font-bold text-center text-[10px] transition-all ${
                      taxJurisdiction === jur.id
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {jur.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-cyan-500/40 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[9px] block uppercase font-bold">ESTIMATED ANNUAL YIELD</span>
                  <strong className="text-emerald-400 text-base font-black block">${estimatedAnnualProfitOd.toLocaleString(undefined, { maximumFractionDigits: 2 })} OD</strong>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[9px] block uppercase font-bold">TAX LIABILITY ({taxRatePercent}%)</span>
                  <strong className="text-red-400 text-base font-black block">-${calculatedTaxLiabilityOd.toLocaleString(undefined, { maximumFractionDigits: 2 })} OD</strong>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-emerald-500/40 flex justify-between items-center text-xs">
                <span className="text-slate-400 text-[10px] font-bold uppercase">NET AFTER-TAX RETURN:</span>
                <strong className="text-emerald-400 text-lg font-black">${netAfterTaxYieldOd.toLocaleString(undefined, { maximumFractionDigits: 2 })} OD</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CRYPTO CALCULATOR */}
      <CryptoCalculatorView />

      {/* DEVELOPER REVENUE WHITEPAPER & EMAIL INFORMING */}
      <DeveloperRevenueWhitepaperView />

      {/* 4. EMERGENCY UNLOCK CONFIRMATION MODAL */}
      {showEmergencyUnlockModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-red-500/60 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl font-mono text-white animate-fadeIn">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-7 h-7 text-red-500 animate-bounce" />
              <div>
                <strong className="text-red-400 font-black text-base block">EMERGENCY STAKE UNLOCK</strong>
                <span className="text-slate-400 text-[10px]">EARLY WITHDRAWAL LIQUIDITY PENALTY</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              Executing an emergency unlock will immediately release your principal balance of <strong>${userStakedTotal.toLocaleString()} OD</strong> before the 365-day vault lock expires. A <strong>5.0% early liquidity penalty (-${(userStakedTotal * 0.05).toLocaleString()} OD)</strong> will be deducted and burned.
            </p>

            <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/40 text-center space-y-0.5">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">NET WITHDRAWAL RECEIVABLE:</span>
              <strong className="text-red-300 text-xl font-black block">${(userStakedTotal * 0.95).toLocaleString()} OD</strong>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowEmergencyUnlockModal(false)}
                className="flex-1 py-2.5 bg-slate-900 border border-slate-700 hover:text-white text-slate-400 font-bold text-xs uppercase rounded-xl transition-all"
              >
                CANCEL
              </button>
              <button
                onClick={handleExecuteEmergencyUnlock}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase rounded-xl transition-all shadow-xl"
              >
                CONFIRM EMERGENCY UNLOCK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
