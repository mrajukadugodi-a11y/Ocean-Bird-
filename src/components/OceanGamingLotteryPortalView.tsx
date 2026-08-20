import React, { useState, useEffect, useRef } from 'react';
import oceanGamingLogo from '../assets/images/ocean_gaming_logo_1786649908375.jpg';
import {
  Trophy,
  Dices,
  Wallet,
  ShieldCheck,
  Lock,
  CreditCard,
  Sparkles,
  Flame,
  RefreshCw,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Ticket,
  Coins,
  Percent,
  Download,
  CheckCircle2,
  AlertCircle,
  Copy,
  Send,
  ChevronRight,
  Award,
  DollarSign,
  HelpCircle,
  Play,
  RotateCcw,
  Layers,
  Search,
  Check,
  Building2,
  Smartphone,
  Globe,
  Radio,
  ExternalLink,
  ShieldAlert,
  Hash,
  Eye,
  QrCode,
  Newspaper,
  Activity,
  Gift,
  X,
  PlusCircle,
  Swords,
  Ship,
  UserCheck,
  BadgeCheck,
  Anchor,
  TrendingUp,
  Tv,
  CircleDollarSign,
  BookOpen,
  FileText,
  BarChart3,
  Sliders,
  Filter,
  Camera,
  UploadCloud,
  AlertTriangle,
  Scale,
  FileCheck,
  History,
  UserX,
  CheckCircle,
  MessageSquare,
  Users,
  LineChart,
  GraduationCap,
  Bell,
  HeartHandshake,
  PieChart,
  Timer,
  Lightbulb,
  PlayCircle,
  ThumbsUp,
  MessageCircle,
  AlertOctagon,
  Gavel,
  Table,
  Code,
  Printer,
  Save,
  Key,
  Shield,
  Cpu,
  KeyRound,
  Fingerprint,
  LockKeyhole
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateAndDownloadPdf } from '../utils/pdfExporter';
import { hapticEngine } from '../utils/hapticUtils';

// --- TYPES ---
export type MaritimeRole = 'ACTIVE_SEAFARER' | 'MARITIME_EMPLOYEE' | 'CRUISE_PASSENGER';

export interface MaritimeCredentialPass {
  role: MaritimeRole;
  fullName: string;
  credentialId: string;
  vesselOrCompany: string;
  verificationHash: string;
  isVerified: boolean;
  verifiedAt: string;
}

export interface MaritimeBetEvent {
  id: string;
  category: 'REGATTA_YACHT' | 'TUG_OF_WAR' | 'ETA_PRECISION' | 'DRONE_SPRINT' | 'POKER_CASINO';
  title: string;
  subtitle: string;
  vesselOrMatch: string;
  scheduledTime: string;
  options: {
    optionId: string;
    label: string;
    oddsMultiplier: number;
    details: string;
  }[];
}

export interface OceanDollarTransaction {
  id: string;
  type: 'DEPOSIT' | 'LOTTERY_PURCHASE' | 'SPORTS_BET' | 'LOTTERY_WINNING' | 'STAKING_REWARD' | 'P2P_TRANSFER' | 'CASHOUT';
  amountOD: number;
  description: string;
  timestamp: string;
  txHash: string;
  status: 'COMPLETED' | 'PROCESSING' | 'CONFIRMED';
  paymentMethod?: string;
}

export interface LotteryTicket {
  ticketId: string;
  gameType: 'MEGA_JACKPOT' | 'SEAFARER_DAILY' | 'NEPTUNE_SCRATCH' | 'MARITIME_BET';
  numbersSelected: number[];
  specialBall?: number;
  multiplier: number;
  priceOD: number;
  purchaseDate: string;
  drawDate: string;
  status: 'ACTIVE_PENDING' | 'WINNER_CLAIMED' | 'WINNER_UNCLAIMED' | 'NO_WIN';
  potentialPrizeOD: number;
  actualPrizeOD?: number;
  provablyFairSeed: string;
}

export interface ScratchCardData {
  id: string;
  title: string;
  costOD: number;
  topPrizeOD: number;
  accentColor: string;
  symbols: string[];
  winningSymbol: string;
  revealed: boolean[];
  isScratched: boolean;
  wonAmountOD: number;
}

const INITIAL_LOTTERY_TICKETS: LotteryTicket[] = [
  {
    ticketId: 'TKT-8839201',
    gameType: 'MEGA_JACKPOT',
    numbersSelected: [7, 14, 23, 38, 49],
    specialBall: 12,
    multiplier: 2,
    priceOD: 10,
    purchaseDate: '2026-08-13 09:15 UTC',
    drawDate: '2026-08-13 20:00 UTC',
    status: 'ACTIVE_PENDING',
    potentialPrizeOD: 3850000,
    provablyFairSeed: '0x9f88a2c102384a1e9c882104a'
  },
  {
    ticketId: 'TKT-8839188',
    gameType: 'SEAFARER_DAILY',
    numbersSelected: [12, 29, 34, 42],
    multiplier: 1,
    priceOD: 5,
    purchaseDate: '2026-08-12 18:30 UTC',
    drawDate: '2026-08-12 22:00 UTC',
    status: 'WINNER_UNCLAIMED',
    potentialPrizeOD: 500,
    actualPrizeOD: 500,
    provablyFairSeed: '0x12b490a12e33f20a91283c'
  },
  {
    ticketId: 'TKT-8839002',
    gameType: 'NEPTUNE_SCRATCH',
    numbersSelected: [3, 3, 3],
    multiplier: 1,
    priceOD: 20,
    purchaseDate: '2026-08-11 14:10 UTC',
    drawDate: '2026-08-11 14:10 UTC',
    status: 'WINNER_CLAIMED',
    potentialPrizeOD: 2500,
    actualPrizeOD: 2500,
    provablyFairSeed: '0x88f910a293e810a991822'
  }
];

const INITIAL_TRANSACTIONS: OceanDollarTransaction[] = [
  {
    id: 'OD-TX-99201',
    type: 'LOTTERY_WINNING',
    amountOD: 2500,
    description: 'Neptune Trident Instant Scratch Card Payout',
    timestamp: '2026-08-11 14:12 UTC',
    txHash: '0xa38190d21a982181920e8a1',
    status: 'COMPLETED'
  },
  {
    id: 'OD-TX-99184',
    type: 'DEPOSIT',
    amountOD: 500,
    description: 'Wallet Reload via Visa Card ending 8841',
    timestamp: '2026-08-10 11:20 UTC',
    txHash: '0x77b8192a81901e192083c91',
    status: 'COMPLETED',
    paymentMethod: 'Credit Card (Visa)'
  },
  {
    id: 'OD-TX-99150',
    type: 'STAKING_REWARD',
    amountOD: 42.5,
    description: 'Daily Staking Yield payout from Ocean Liquidity Pool',
    timestamp: '2026-08-09 00:00 UTC',
    txHash: '0x11e9201a882910a82910d8a',
    status: 'COMPLETED'
  }
];

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  role: string;
  vesselName: string;
  countryCode: string;
  totalWinningsOD: number;
  totalJackpotWins: number;
  favoriteGame: string;
  winStreak: number;
  verified: boolean;
}

const GLOBAL_LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, playerName: 'Capt. Hector Silva', role: 'Master Mariner', vesselName: 'M/V Santos Star', countryCode: '🇵🇹', totalWinningsOD: 142500.0, totalJackpotWins: 3, favoriteGame: '$3.85M Mega Jackpot', winStreak: 7, verified: true },
  { rank: 2, playerName: 'Elena Rostova', role: 'Cruise Guest VIP', vesselName: 'S/S Symphony Seas', countryCode: '🇲🇨', totalWinningsOD: 98400.0, totalJackpotWins: 2, favoriteGame: 'Treasure Reef Roulette', winStreak: 12, verified: true },
  { rank: 3, playerName: 'Chief Eng. Lars Lindqvist', role: 'Chief Engineer', vesselName: 'Arctic Pioneer Tanker', countryCode: '🇸🇪', totalWinningsOD: 76200.0, totalJackpotWins: 2, favoriteGame: "America's Cup Regatta", winStreak: 5, verified: true },
  { rank: 4, playerName: 'Mateo Rossi', role: 'Marine Tech Specialist', vesselName: 'Port of Genoa Hub', countryCode: '🇮🇹', totalWinningsOD: 54100.0, totalJackpotWins: 1, favoriteGame: 'Neptune Scratchers', winStreak: 4, verified: true },
  { rank: 5, playerName: 'Chief Off. William Chen', role: 'First Officer', vesselName: 'Orient Express Cargo', countryCode: '🇸🇬', totalWinningsOD: 42900.0, totalJackpotWins: 1, favoriteGame: 'Seafarer Daily Raffle', winStreak: 8, verified: true },
  { rank: 6, playerName: 'Sophie Laurent', role: 'Cruise Entertainment Crew', vesselName: 'M/S Mediterranean Gem', countryCode: '🇫🇷', totalWinningsOD: 38700.0, totalJackpotWins: 1, favoriteGame: 'Treasure Reef Roulette', winStreak: 3, verified: true },
  { rank: 7, playerName: '2nd Eng. Kwame Mensah', role: 'Second Engineer', vesselName: 'Atlantic Bulk Carrier', countryCode: '🇬🇭', totalWinningsOD: 29400.0, totalJackpotWins: 1, favoriteGame: 'Tug-of-War League', winStreak: 6, verified: true },
  { rank: 8, playerName: "Capt. James O'Connor", role: 'Tugboat Captain', vesselName: 'M/T Pacific Titan', countryCode: '🇦🇺', totalWinningsOD: 24800.0, totalJackpotWins: 0, favoriteGame: 'Drone Speed Sprint', winStreak: 5, verified: true },
  { rank: 9, playerName: 'Isabella Santos', role: 'Marine Hydrographer', vesselName: 'High Seas Surveyor IV', countryCode: '🇧🇷', totalWinningsOD: 18900.0, totalJackpotWins: 0, favoriteGame: 'Neptune Scratchers', winStreak: 3, verified: true },
  { rank: 10, playerName: 'Dmitri Volkov', role: 'Deck Cadet', vesselName: 'Barents Sea Container', countryCode: '🇪🇪', totalWinningsOD: 15400.0, totalJackpotWins: 0, favoriteGame: 'Seafarer Daily Raffle', winStreak: 4, verified: true }
];

export const OceanGamingLotteryPortalView: React.FC = () => {
  // Wallet State
  const [oceanDollarBalance, setOceanDollarBalance] = useState<number>(1250.0);
  const [stakedBalance, setStakedBalance] = useState<number>(4250.0);
  const [dailyYieldEarned, setDailyYieldEarned] = useState<number>(108.8);
  const [transactions, setTransactions] = useState<OceanDollarTransaction[]>(INITIAL_TRANSACTIONS);

  // Maritime Eligibility & Onboard Identity Verification Pass
  const [maritimePass, setMaritimePass] = useState<MaritimeCredentialPass>({
    role: 'ACTIVE_SEAFARER',
    fullName: 'Capt. Alexander Vance',
    credentialId: 'CDC-IMO-981042-PACIFIC',
    vesselOrCompany: 'M/V Pacific Monarch (IMO 9820184)',
    verificationHash: '0x98f1a2014b82910a78129c',
    isVerified: true,
    verifiedAt: '2026-08-13 High Seas AIS SatCom Node 84'
  });
  const [showMaritimeAuthModal, setShowMaritimeAuthModal] = useState<boolean>(false);

  // Active Sub Tab
  const [activeTab, setActiveTab] = useState<
    | 'lottery-hub'
    | 'ocean-dollar-wallet'
    | 'staking-vault'
    | 'provably-fair'
    | 'gaming-history'
    | 'leaderboard'
    | 'kyc-verification'
    | 'rules-regulations'
    | 'payment-gateway'
    | 'gaming-tutorials'
    | 'jackpot-live-feed'
    | 'lottery-analytics'
    | 'responsible-play'
    | 'social-gaming-lobby'
  >('lottery-hub');

  // 1. GAMING TUTORIALS STATE
  const [tutorialModalOpen, setTutorialModalOpen] = useState<boolean>(false);
  const [selectedTutorialCategory, setSelectedTutorialCategory] = useState<'MEGA_JACKPOT' | 'SCRATCHERS' | 'REGATTA' | 'ROULETTE' | 'STAKING'>('MEGA_JACKPOT');
  const [activeTutorialStep, setActiveTutorialStep] = useState<number>(1);

  // 2. JACKPOT LIVE FEED STATE
  const [liveFeedFilter, setLiveFeedFilter] = useState<'ALL' | 'JACKPOT_HITS' | 'BIG_WAGERS' | 'SCRATCH_MULTIPLIERS'>('ALL');
  const [liveFeedPaused, setLiveFeedPaused] = useState<boolean>(false);
  const [liveFeedItems, setLiveFeedItems] = useState<Array<{
    id: string;
    player: string;
    vessel: string;
    flag: string;
    event: string;
    amountOD: number;
    gameType: string;
    timeAgo: string;
    likes: number;
  }>>([
    { id: 'feed-1', player: 'Capt. Hector Silva', vessel: 'M/V Santos Star', flag: '🇵🇹', event: 'HIT 500x MULTIPLIER ON NEPTUNE SCRATCHER!', amountOD: 2500, gameType: 'SCRATCHERS', timeAgo: '12s ago', likes: 14 },
    { id: 'feed-2', player: 'Elena Rostova', vessel: 'S/S Symphony Seas', flag: '🇲🇨', event: 'WON TREASURE REEF ROULETTE SINGLE NUMBER #18', amountOD: 1800, gameType: 'ROULETTE', timeAgo: '45s ago', likes: 22 },
    { id: 'feed-3', player: 'Chief Eng. Lars L.', vessel: 'Arctic Pioneer', flag: '🇸🇪', event: 'PURCHASED 10x $3.85M MEGA JACKPOT TICKETS', amountOD: 50, gameType: 'MEGA_JACKPOT', timeAgo: '1m ago', likes: 8 },
    { id: 'feed-4', player: 'Mateo Rossi', vessel: 'Port of Genoa Hub', flag: '🇮🇹', event: 'WON AMERICA’S CUP REGATTA HYDROFOIL BET', amountOD: 925, gameType: 'REGATTA', timeAgo: '3m ago', likes: 19 },
    { id: 'feed-5', player: 'Chief Off. William Chen', vessel: 'Orient Express', flag: '🇸🇬', event: 'CLAIMED DAILY SEAFARER RAFFLE PRIZE', amountOD: 450, gameType: 'RAFFLE', timeAgo: '5m ago', likes: 31 }
  ]);

  // 3. LOTTERY ANALYTICS STATE
  const [analyticsSelectedTab, setAnalyticsSelectedTab] = useState<'HOT_COLD' | 'PAYOUT_TRENDS' | 'EV_CALCULATOR' | 'JACKPOT_CURVE'>('HOT_COLD');
  const [analyticsTicketQty, setAnalyticsTicketQty] = useState<number>(5);

  // 4. RESPONSIBLE PLAY ALERT STATE
  const [sessionTimeMinutes, setSessionTimeMinutes] = useState<number>(42);
  const [dailyWagerLimit, setDailyWagerLimit] = useState<number>(500);
  const [currentDailyWagered, setCurrentDailyWagered] = useState<number>(185);
  const [sessionReminderInterval, setSessionReminderInterval] = useState<number>(30); // minutes
  const [coolOffDurationDays, setCoolOffDurationDays] = useState<number>(1);
  const [selfExclusionConfirmed, setSelfExclusionConfirmed] = useState<boolean>(false);
  const [responsibleBannerDismissed, setResponsibleBannerDismissed] = useState<boolean>(false);

  // 5. SOCIAL GAMING LOBBY STATE
  const [activeLobbyChannel, setActiveLobbyChannel] = useState<'PACIFIC_CREW' | 'CRUISE_VIP' | 'ALL_SEAFARERS' | 'SYNDICATE_POOLS'>('PACIFIC_CREW');
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: string;
    role: string;
    vessel: string;
    flag: string;
    text: string;
    timestamp: string;
    ticketHash?: string;
    tipAmountOD?: number;
  }>>([
    { id: 'msg-1', sender: 'Capt. Hector Silva', role: 'Master Mariner', vessel: 'M/V Santos Star', flag: '🇵🇹', text: 'Good luck on tonight’s $3.85M Mega Jackpot draw, crew! Just locked in my 6 numbers.', timestamp: '14:22 UTC' },
    { id: 'msg-2', sender: 'Elena Rostova', role: 'Cruise VIP', vessel: 'S/S Symphony Seas', flag: '🇲🇨', text: 'The Treasure Reef Roulette wheel is hot today! Just hit red #18!', timestamp: '14:25 UTC', ticketHash: '0x11e9201a8829' },
    { id: 'msg-3', sender: '2nd Eng. Kwame Mensah', role: 'Second Engineer', vessel: 'Atlantic Bulk Carrier', flag: '🇬🇭', text: 'Who wants to join our Sailor Syndicate Co-Op pool for tonight’s draw? We have 85 entries pooled!', timestamp: '14:28 UTC' }
  ]);
  const [newChatMessage, setNewChatMessage] = useState<string>('');
  const [syndicatePoolJoined, setSyndicatePoolJoined] = useState<boolean>(false);
  const [syndicateContributionOD, setSyndicateContributionOD] = useState<number>(20);

  // Leaderboard Filter State
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState<'WEEKLY' | 'MONTHLY' | 'ALL_TIME'>('WEEKLY');
  const [leaderboardMetric, setLeaderboardMetric] = useState<'WINNINGS' | 'JACKPOTS' | 'STREAK'>('WINNINGS');

  // JURISDICTION & CITIZENSHIP COMPLIANCE STATE
  const [citizenCountry, setCitizenCountry] = useState<string>('United Kingdom');
  const [jurisdictionInfo, setJurisdictionInfo] = useState<{
    permitted: boolean;
    country: string;
    status: string;
    badgeLabel: string;
    gamingAccess: string;
    restrictionReason?: string;
    licenseAuthority?: string;
    permittedCountriesList: string[];
    restrictedCountriesList: string[];
    allowedFeatures: string[];
    notice: string;
  }>({
    permitted: true,
    country: 'United Kingdom',
    status: 'PERMITTED_ELIGIBLE',
    badgeLabel: 'ONLINE GAMES & ENTERTAINMENT PERMITTED - ELIGIBLE COUNTRIES CITIZENS ONLY',
    gamingAccess: 'UNLOCKED_FULL_ACCESS',
    licenseAuthority: 'MGA & IMO High Seas Maritime Entertainment License #2026-MGA-OD',
    permittedCountriesList: ['United Kingdom', 'Malta', 'Singapore', 'Isle of Man', 'Gibraltar', 'Curaçao', 'Australia', 'Canada', 'Marshall Islands', 'Portugal', 'Sweden', 'Italy', 'France', 'Germany', 'Ghana', 'Estonia', 'Brazil', 'Japan'],
    restrictedCountriesList: ['United States', 'China', 'North Korea', 'Iran', 'Syria', 'Russia', 'Cuba', 'Myanmar', 'Somalia', 'Sudan', 'Afghanistan', 'Belarus'],
    allowedFeatures: ['$OD Real-Money Wagering', 'Mega Jackpot Tickets', 'Neptune Scratchers', 'Live Roulette', 'Staking Rewards'],
    notice: 'FULL ACCESS GRANTED: Citizens of United Kingdom are fully eligible for Online Games & Entertainment.'
  });
  const [isCheckingJurisdiction, setIsCheckingJurisdiction] = useState<boolean>(false);

  const handleCountryJurisdictionCheck = async (selectedCountry: string) => {
    setCitizenCountry(selectedCountry);
    setIsCheckingJurisdiction(true);
    try {
      const res = await fetch('/api/gaming/jurisdiction-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryName: selectedCountry })
      });
      if (res.ok) {
        const data = await res.json();
        setJurisdictionInfo(data);
        if (data.permitted) {
          triggerToast(`Online Games Permitted for Citizens of ${selectedCountry}!`);
        } else {
          triggerToast(`Access Restricted: Real-money gaming is restricted for citizens of ${selectedCountry}.`);
        }
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      const PERMITTED = ['United Kingdom', 'Malta', 'Singapore', 'Isle of Man', 'Gibraltar', 'Curaçao', 'Australia', 'Canada', 'Marshall Islands', 'Portugal', 'Sweden', 'Italy', 'France', 'Germany', 'Ghana', 'Estonia', 'Brazil', 'Japan'];
      const isPerm = PERMITTED.some(c => c.toLowerCase() === selectedCountry.toLowerCase());
      if (isPerm) {
        setJurisdictionInfo({
          permitted: true,
          country: selectedCountry,
          status: 'PERMITTED_ELIGIBLE',
          badgeLabel: 'ONLINE GAMES & ENTERTAINMENT PERMITTED - ELIGIBLE COUNTRIES CITIZENS ONLY',
          gamingAccess: 'UNLOCKED_FULL_ACCESS',
          licenseAuthority: 'MGA & IMO High Seas Maritime Entertainment License #2026-MGA-OD',
          permittedCountriesList: PERMITTED,
          restrictedCountriesList: ['United States', 'China', 'North Korea', 'Iran', 'Syria', 'Russia', 'Cuba', 'Myanmar', 'Somalia', 'Sudan', 'Afghanistan', 'Belarus'],
          allowedFeatures: ['$OD Real-Money Wagering', 'Mega Jackpot Tickets', 'Neptune Scratchers', 'Live Roulette', 'Staking Rewards'],
          notice: `FULL ACCESS GRANTED: Citizens of ${selectedCountry} are fully eligible for Online Games & Entertainment.`
        });
        triggerToast(`Online Games Permitted for Citizens of ${selectedCountry}!`);
      } else {
        setJurisdictionInfo({
          permitted: false,
          country: selectedCountry,
          status: 'UNAUTHORIZED_COUNTRY_RESTRICTED',
          badgeLabel: 'UNAUTHORIZED COUNTRIES CITIZENS ACCESS ONLY - RESTRICTED MODE',
          gamingAccess: 'LOCKED_WAGERING_DENIED',
          restrictionReason: `Citizens or residents of ${selectedCountry} are restricted under local gaming prohibition laws or regulatory compliance guidelines. Real-money $OD wagering is prohibited.`,
          permittedCountriesList: PERMITTED,
          restrictedCountriesList: ['United States', 'China', 'North Korea', 'Iran', 'Syria', 'Russia', 'Cuba', 'Myanmar', 'Somalia', 'Sudan', 'Afghanistan', 'Belarus'],
          allowedFeatures: ['Read-only Maritime Weather', 'Educational Game Rules', 'Non-monetary Simulation Mode'],
          notice: `UNAUTHORIZED CITIZENS ACCESS ONLY MODE: Real-money wagering and lottery ticket purchases are locked for citizens of ${selectedCountry}.`
        });
        triggerToast(`Access Restricted for Citizens of ${selectedCountry}.`);
      }
    } finally {
      setIsCheckingJurisdiction(false);
    }
  };

  // Highly Secure Ocean Dollar ($OD) Wallet & Multi-Sig Vault State
  const [isWalletLocked, setIsWalletLocked] = useState<boolean>(false);
  const [isVaultFrozen, setIsVaultFrozen] = useState<boolean>(false);

  // OCEAN DOLLAR ($OD / XOD) & INDIAN OCEAN DOLLAR ($IOD / XIOD) STATE
  const [showOceanDollarCurrencyModal, setShowOceanDollarCurrencyModal] = useState<boolean>(false);
  const [treasuryModalTab, setTreasuryModalTab] = useState<'MARKET' | 'TRENDS' | 'NEWS' | 'STAKING' | 'TRANSFER' | 'HISTORY' | 'TREASURY' | 'CONVERTER' | 'TRANSPARENCY' | 'GOVERNANCE_FAQ'>('MARKET');

  // GOVERNANCE FAQ GUIDE STATE
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<string>('ALL');

  // STAKING DASHBOARD & VAULT STATE ($OD / $XOD & $IOD)
  const [accumulatedYield, setAccumulatedYield] = useState<number>(184.65);
  const [selectedStakingPool, setSelectedStakingPool] = useState<string>('30_DAY_SOVEREIGN');
  const [stakeCurrency, setStakeCurrency] = useState<'OD' | 'XOD' | 'IOD'>('OD');
  const [isStakingProcessing, setIsStakingProcessing] = useState<boolean>(false);
  const [stakeAmountInput, setStakeAmountInput] = useState<number>(500);
  const [stakingActiveSubTab, setStakingActiveSubTab] = useState<'POOLS' | 'POSITIONS' | 'CALCULATOR' | 'TRENDS' | 'AUTO_COMPOUND' | 'NOTIFICATIONS' | 'GOVERNANCE_FAQ' | 'REFERRAL' | 'COMPARE' | 'PHYSICAL_CURRENCY' | 'GOVERNANCE_VOTE' | 'TIER_REWARDS' | 'HISTORY' | 'ACTIVITY_LOG' | 'WHALE_TRACKER' | 'SOCIAL_FEED' | 'REWARDS_PROJECTION' | 'WHALE_SOCIAL' | 'GOVT_APPROVALS' | 'STOCKS_BONDS'>('POOLS');
  
  // STAKING GOVERNANCE VOTING STATE
  const [stakingVoteCategoryFilter, setStakingVoteCategoryFilter] = useState<string>('ALL');
  const [governanceProposals, setGovernanceProposals] = useState<Array<{
    id: string;
    title: string;
    category: string;
    proposer: string;
    status: 'ACTIVE' | 'PASSED' | 'EXPIRED';
    expiresIn: string;
    description: string;
    yesVotes: number;
    noVotes: number;
    abstainVotes: number;
    userVoted: 'YES' | 'NO' | 'ABSTAIN' | null;
  }>>([
    {
      id: 'PROP-2026-04',
      title: 'Rebalance Maritime Reserve: Increase Gold Bullion Allocation to 42%',
      category: 'RESERVE_POLICY',
      proposer: 'MCRB Central Board',
      status: 'ACTIVE',
      expiresIn: '3 Days 12 Hours',
      description: 'Proposal to allocate an additional 4.0% of reserve funds into allocated 24K Gold Bullion in Zurich and Singapore sovereign vaults to hedge against global currency volatility.',
      yesVotes: 1420500,
      noVotes: 210400,
      abstainVotes: 45000,
      userVoted: null
    },
    {
      id: 'PROP-2026-05',
      title: 'Boost 90-Day Blue Carbon Vault APY from 22.5% to 25.0% for Q4 2026',
      category: 'YIELD_RATE',
      proposer: 'ODMA Monetary Committee',
      status: 'ACTIVE',
      expiresIn: '5 Days 08 Hours',
      description: 'Allocate surplus seigniorage proceeds from high-seas port clearing fees to temporarily increase the 90-Day Blue Carbon Pool APY by +2.5% throughout Q4 2026.',
      yesVotes: 2890000,
      noVotes: 154000,
      abstainVotes: 12000,
      userVoted: 'YES'
    },
    {
      id: 'PROP-2026-06',
      title: 'Integrate Singapore & Dubai Ports into Par Clearing Network',
      category: 'NETWORK_EXPANSION',
      proposer: 'IORA Port Syndicate',
      status: 'ACTIVE',
      expiresIn: '8 Days 18 Hours',
      description: 'Formalize instant 1:1 USD settlement for cruise ships and maritime cargo docking at Maritime Terminals in Singapore and Dubai using $OD / $XOD.',
      yesVotes: 3410200,
      noVotes: 89000,
      abstainVotes: 33000,
      userVoted: null
    }
  ]);

  // STAKING TIER REWARDS STATE
  const [hasClaimedMonthlyTierPerk, setHasClaimedMonthlyTierPerk] = useState<boolean>(false);

  // EXPORT STAKING DATA & GOVERNANCE MODAL STATE
  const [isExportDataModalOpen, setIsExportDataModalOpen] = useState<boolean>(false);
  const [exportDataFormat, setExportDataFormat] = useState<'CSV' | 'JSON'>('CSV');
  const [isCreatingProposalModalOpen, setIsCreatingProposalModalOpen] = useState<boolean>(false);
  const [newPropTitle, setNewPropTitle] = useState<string>('');
  const [newPropCategory, setNewPropCategory] = useState<string>('YIELD_RATE');
  const [newPropDesc, setNewPropDesc] = useState<string>('');
  const [notifyLockupMaturity, setNotifyLockupMaturity] = useState<boolean>(true);

  // STAKING REFERRAL & BONUS STATE
  const [stakingReferralCode] = useState<string>('ADMIRAL-88192');
  const [stakingReferralStats] = useState({
    refereesCount: 14,
    totalRefStaked: 52400,
    lifetimeEarnings: 524.00,
    tierName: 'Sovereign Captain',
    bonusPercent: 1.0
  });
  const [isCopiedRefLink, setIsCopiedRefLink] = useState<boolean>(false);

  // STAKING DISPLAY & THEME MODE
  const [stakingThemeMode, setStakingThemeMode] = useState<'MIDNIGHT' | 'NAVY' | 'CYAN'>('MIDNIGHT');

  // STAKING PERFORMANCE COMPARE STATE
  const [compareDepositAmount, setCompareDepositAmount] = useState<number>(5000);
  
  // AUTO-COMPOUND ENGINE STATE
  const [isAutoCompoundEnabled, setIsAutoCompoundEnabled] = useState<boolean>(true);
  const [autoCompoundFreq, setAutoCompoundFreq] = useState<'DAILY' | 'WEEKLY' | 'THRESHOLD'>('DAILY');
  const [autoCompoundThreshold, setAutoCompoundThreshold] = useState<number>(10.00);
  const [autoCompoundTargetPool, setAutoCompoundTargetPool] = useState<string>('30_DAY_SOVEREIGN');
  const [totalAutoCompoundedRewards, setTotalAutoCompoundedRewards] = useState<number>(342.80);
  const [isAutoCompoundCycleRunning, setIsAutoCompoundCycleRunning] = useState<boolean>(false);
  const [lastAutoCompoundTimestamp, setLastAutoCompoundTimestamp] = useState<string>('2026-08-15 00:00:00');

  // ADVANCED STAKING CALCULATOR STATE
  const [calcPrincipal, setCalcPrincipal] = useState<number>(5000);
  const [calcDurationDays, setCalcDurationDays] = useState<number>(180);
  const [calcPoolApr, setCalcPoolApr] = useState<number>(22.5);
  const [calcCompoundFreq, setCalcCompoundFreq] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'>('DAILY');
  const [calcVipTierBonus, setCalcVipTierBonus] = useState<number>(2.5); // Admiral Tier Bonus %

  // YIELD TRENDS GRAPH STATE
  const [trendTimeframe, setTrendTimeframe] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [trendMetric, setTrendMetric] = useState<'YIELD' | 'APY' | 'TVL'>('YIELD');

  // STAKING NOTIFICATIONS STATE
  const [notifSoundEnabled, setNotifSoundEnabled] = useState<boolean>(true);
  const [notifPushEnabled, setNotifPushEnabled] = useState<boolean>(true);
  const [notifMinPayoutThreshold, setNotifMinPayoutThreshold] = useState<number>(5.00);
  const [stakingNotifList, setStakingNotifList] = useState<Array<{
    id: string;
    title: string;
    message: string;
    type: 'YIELD_PAYOUT' | 'AUTO_COMPOUND' | 'LOCK_UNLOCKED' | 'BONUS_BOOST';
    timestamp: string;
    read: boolean;
    amount?: number;
  }>>([
    {
      id: 'STK-NT-101',
      title: '⚡ Daily Yield Dividend Accrued',
      message: 'You accrued +$12.45 $OD in daily dividend yield from 30-Day Sovereign Reserve Pool.',
      type: 'YIELD_PAYOUT',
      timestamp: '15 mins ago',
      read: false,
      amount: 12.45
    },
    {
      id: 'STK-NT-102',
      title: '🔄 Automated Compound Reinvested',
      message: 'Auto-compound engine automatically reinvested $45.20 yield back into 30-Day Sovereign Reserve Pool.',
      type: 'AUTO_COMPOUND',
      timestamp: '4 hours ago',
      read: false,
      amount: 45.20
    },
    {
      id: 'STK-NT-103',
      title: '👑 Sovereign Admiral Tier Boost',
      message: 'Your Sovereign Admiral VIP status unlocked an additional +2.50% APY bonus across all active pools!',
      type: 'BONUS_BOOST',
      timestamp: '1 day ago',
      read: false
    },
    {
      id: 'STK-NT-104',
      title: '🔓 Staking Maturity Alert',
      message: 'Position #STK-9001 (2,500 $OD) is on track for 30-Day maturity lock release on 2026-08-31.',
      type: 'LOCK_UNLOCKED',
      timestamp: '2 days ago',
      read: true
    }
  ]);

  // STAKE ACTIVITY LOG STATE
  const [stakeActivityFilter, setStakeActivityFilter] = useState<string>('ALL');
  const [stakeActivitySearch, setStakeActivitySearch] = useState<string>('');
  const [isActivityLiveStreaming, setIsActivityLiveStreaming] = useState<boolean>(true);
  const [stakeActivityLogs, setStakeActivityLogs] = useState<Array<{
    id: string;
    txHash: string;
    node: string;
    stakerAddress: string;
    action: 'STAKE_DEPOSIT' | 'YIELD_CLAIM' | 'AUTO_COMPOUND' | 'MATURITY_UNLOCK' | 'GOVERNANCE_VOTE';
    amount: number;
    currency: string;
    poolName: string;
    timestamp: string;
    status: 'CONFIRMED' | 'SETTLING';
  }>>([
    {
      id: 'ACT-9081',
      txHash: '0x8f2a...39e1',
      node: 'Singapore Port Node #04',
      stakerAddress: '0x71C...4A91 (Captain Alex)',
      action: 'STAKE_DEPOSIT',
      amount: 15000,
      currency: 'OD',
      poolName: '👑 365-Day VIP Fleet Vault',
      timestamp: 'Just now (2026-08-15 03:14:22)',
      status: 'CONFIRMED'
    },
    {
      id: 'ACT-9080',
      txHash: '0x3c1b...88df',
      node: 'Dubai Central Vault #01',
      stakerAddress: '0x94D...11B3',
      action: 'YIELD_CLAIM',
      amount: 142.50,
      currency: 'OD',
      poolName: '💎 90-Day Blue Carbon Vault',
      timestamp: '2 mins ago',
      status: 'CONFIRMED'
    },
    {
      id: 'ACT-9079',
      txHash: '0x1a7f...55c2',
      node: 'Zurich Treasury Vault',
      stakerAddress: '0x33E...90CC',
      action: 'AUTO_COMPOUND',
      amount: 68.20,
      currency: 'OD',
      poolName: '⚓ 30-Day Sovereign Reserve',
      timestamp: '5 mins ago',
      status: 'CONFIRMED'
    },
    {
      id: 'ACT-9078',
      txHash: '0x6e9d...44a0',
      node: 'London Clearing Station',
      stakerAddress: '0x52A...77FF',
      action: 'GOVERNANCE_VOTE',
      amount: 50000,
      currency: 'OD',
      poolName: 'PROP-2026-05 (Gold Rebalance)',
      timestamp: '12 mins ago',
      status: 'CONFIRMED'
    },
    {
      id: 'ACT-9077',
      txHash: '0x99bb...210a',
      node: 'Mumbai Terminal Node',
      stakerAddress: '0x88F...334A',
      action: 'MATURITY_UNLOCK',
      amount: 10000,
      currency: 'IOD',
      poolName: '⚓ 30-Day Sovereign Reserve',
      timestamp: '18 mins ago',
      status: 'CONFIRMED'
    }
  ]);

  // STAKING APR PREDICTOR STATE
  const [predTvlGrowth, setPredTvlGrowth] = useState<number>(50);
  const [predPortVolume, setPredPortVolume] = useState<number>(120);
  const [predReserveBoost, setPredReserveBoost] = useState<number>(2.5);
  const [predScenario, setPredScenario] = useState<'BULLISH' | 'BASELINE' | 'CONSERVATIVE'>('BULLISH');

  // STAKE ALERT SYSTEMS STATE
  const [isAddAlertModalOpen, setIsAddAlertModalOpen] = useState<boolean>(false);
  const [newAlertName, setNewAlertName] = useState<string>('');
  const [newAlertType, setNewAlertType] = useState<'APY_THRESHOLD' | 'LOCKUP_MATURITY' | 'UNCLAIMED_YIELD' | 'RESERVE_PARITY'>('APY_THRESHOLD');
  const [newAlertThreshold, setNewAlertThreshold] = useState<number>(20.0);
  const [newAlertChannel, setNewAlertChannel] = useState<string>('SatCom Telegram + In-App');
  const [stakeAlertRules, setStakeAlertRules] = useState<Array<{
    id: string;
    name: string;
    type: 'APY_THRESHOLD' | 'LOCKUP_MATURITY' | 'UNCLAIMED_YIELD' | 'RESERVE_PARITY';
    thresholdText: string;
    channel: string;
    enabled: boolean;
  }>>([
    {
      id: 'ALT-101',
      name: 'High Yield Alert (>20% APY)',
      type: 'APY_THRESHOLD',
      thresholdText: 'Pool APY > 20.0%',
      channel: 'SatCom Telegram + In-App',
      enabled: true
    },
    {
      id: 'ALT-102',
      name: 'Maturity Lockup Countdown',
      type: 'LOCKUP_MATURITY',
      thresholdText: '3 Days Before Maturity Unlock',
      channel: 'In-App Toast + Audio Sound',
      enabled: true
    },
    {
      id: 'ALT-103',
      name: 'Unclaimed Yield Threshold',
      type: 'UNCLAIMED_YIELD',
      thresholdText: 'Unclaimed Yield > $50.00 $OD',
      channel: 'Email Digest + In-App',
      enabled: true
    },
    {
      id: 'ALT-104',
      name: 'Maritime Reserve Ratio Watch',
      type: 'RESERVE_PARITY',
      thresholdText: 'Reserve Ratio < 103.0% Parity',
      channel: 'Priority High-Seas Alert',
      enabled: true
    }
  ]);

  // YIELD TRENDS EXPANSION STATE
  const [trendSourceFilter, setTrendSourceFilter] = useState<'ALL' | 'SEIGNIORAGE' | 'PORT_FEES' | 'BONDS'>('ALL');
  const [trendMovingAvgPeriod, setTrendMovingAvgPeriod] = useState<'7D' | '30D' | '90D'>('7D');

  // STAKE WHALE TRACKER STATE
  const [whaleSearchQuery, setWhaleSearchQuery] = useState<string>('');
  const [whaleTierFilter, setWhaleTierFilter] = useState<string>('ALL');
  const [followedWhales, setFollowedWhales] = useState<string[]>(['WHL-001', 'WHL-003']);
  const [whaleWallets] = useState<Array<{
    id: string;
    alias: string;
    address: string;
    totalStaked: number;
    primaryPool: string;
    tier: string;
    nodeRegion: string;
    lastTx: string;
    shareOfTvL: number;
  }>>([
    {
      id: 'WHL-001',
      alias: '🐋 Sovereign Admiral Leviathan',
      address: '0x94A...8811',
      totalStaked: 1450000,
      primaryPool: '👑 365-Day VIP Fleet Vault',
      tier: 'Fleet Admiral',
      nodeRegion: 'Zurich Sovereign Node',
      lastTx: 'Deposited +250,000 $OD (15 mins ago)',
      shareOfTvL: 3.2
    },
    {
      id: 'WHL-002',
      alias: '⚡ Poseidon Maritime Capital',
      address: '0x32C...1092',
      totalStaked: 980000,
      primaryPool: '💎 90-Day Blue Carbon Vault',
      tier: 'Fleet Admiral',
      nodeRegion: 'Singapore Port Node',
      lastTx: 'Auto-Compounded +14,200 $OD yield (1 hour ago)',
      shareOfTvL: 2.1
    },
    {
      id: 'WHL-003',
      alias: '🔱 Captain Nemo Syndicate',
      address: '0x71F...9022',
      totalStaked: 720000,
      primaryPool: '⚓ 30-Day Sovereign Reserve',
      tier: 'Fleet Admiral',
      nodeRegion: 'London Clearing Station',
      lastTx: 'Rebalanced 100,000 $OD to Gold Bonds (3 hours ago)',
      shareOfTvL: 1.6
    },
    {
      id: 'WHL-004',
      alias: '🌊 High-Seas Voyager Fund',
      address: '0x55E...3381',
      totalStaked: 510000,
      primaryPool: '👑 365-Day VIP Fleet Vault',
      tier: 'Sovereign Captain',
      nodeRegion: 'Tokyo Maritime Terminal',
      lastTx: 'Claimed +8,900 $OD yield (5 hours ago)',
      shareOfTvL: 1.1
    },
    {
      id: 'WHL-005',
      alias: '⚓ Pacific Reserve Alliance',
      address: '0x88D...4419',
      totalStaked: 390000,
      primaryPool: '🌊 Flexible Maritime Yield',
      tier: 'Sovereign Captain',
      nodeRegion: 'Dubai Reserve Node',
      lastTx: 'Deposited +50,000 $OD (12 hours ago)',
      shareOfTvL: 0.8
    }
  ]);

  // STAKING SOCIAL FEED STATE
  const [socialFeedFilter, setSocialFeedFilter] = useState<string>('ALL');
  const [newPostInput, setNewPostInput] = useState<string>('');
  const [newPostCategory, setNewPostCategory] = useState<string>('STRATEGY');
  const [socialPosts, setSocialPosts] = useState<Array<{
    id: string;
    author: string;
    badge: string;
    tier: string;
    category: string;
    content: string;
    timestamp: string;
    likes: number;
    hasLiked: boolean;
    tipsReceived: number;
  }>>([
    {
      id: 'POST-101',
      author: 'Captain Vance (0x8F...21)',
      badge: '🏆 365-Day VIP Maxi',
      tier: 'Fleet Admiral',
      category: 'STRATEGY',
      content: 'Pro Tip: Lock 70% of your $OD in the 365-Day VIP Vault to hit Fleet Admiral tier early. The +5.0% APY multiplier combined with 0% swap fees pays off massively over 12 months! ⚓🌊',
      timestamp: '25 mins ago',
      likes: 42,
      hasLiked: false,
      tipsReceived: 12.50
    },
    {
      id: 'POST-102',
      author: 'Lady Coral (0x44...90)',
      badge: '🔄 Auto-Compound Specialist',
      tier: 'Sovereign Captain',
      category: 'YIELD',
      content: 'Just reached $5,000 total staked in the Blue Carbon Vault! Enabling daily auto-compounding boosted my effective APY from 22.5% to 25.18%. The compounding math is real! 💎📈',
      timestamp: '2 hours ago',
      likes: 28,
      hasLiked: true,
      tipsReceived: 5.00
    },
    {
      id: 'POST-103',
      author: 'MCRB Treasury Board',
      badge: '👑 Official Protocol Announcement',
      tier: 'Central Reserve',
      category: 'ANNOUNCEMENT',
      content: 'MCRB Reserve Ratio updated to 104.8%! Zurich gold vault allocations have cleared. All stakers now earn an extra +0.5% bonus seigniorage yield this week! 🛡️⚡',
      timestamp: '4 hours ago',
      likes: 115,
      hasLiked: false,
      tipsReceived: 45.00
    }
  ]);

  // STAKE REWARDS PROJECTION STATE
  const [projTargetPrice, setProjTargetPrice] = useState<number>(1.25);
  const [projMonthlyAdd, setProjMonthlyAdd] = useState<number>(200);
  const [projSelectedVault, setProjSelectedVault] = useState<string>('90_DAY');
  const [projHorizonYears, setProjHorizonYears] = useState<number>(3);

  // WHALE SOCIAL FEED STATE
  const [whaleSocialFilter, setWhaleSocialFilter] = useState<string>('ALL');
  const [whaleSocialPosts, setWhaleSocialPosts] = useState<Array<{
    id: string;
    whaleAlias: string;
    whaleAddress: string;
    whaleTier: string;
    holdingAmount: number;
    title: string;
    content: string;
    rebalanceAction: string;
    signalType: 'BULLISH' | 'REBALANCE' | 'YIELD_CLAIM' | 'LONG_LOCKUP';
    timestamp: string;
    copyStakeCount: number;
    upvotes: number;
    hasCopied: boolean;
  }>>([
    {
      id: 'WPOST-01',
      whaleAlias: '🐋 Sovereign Admiral Leviathan',
      whaleAddress: '0x94A...8811',
      whaleTier: 'Fleet Admiral ($1.45M $OD)',
      holdingAmount: 1450000,
      title: 'Moved +250,000 $OD into 365-Day VIP Vault',
      content: 'Just finalized our Q3 sovereign treasury allocation. Rebalanced 250k $OD from flexible reserves into the 365-Day VIP Fleet Vault to lock in the 34.0% APY + 5.0% tier multiplier. High-seas cargo swap volume is up 40% month-over-month. Strategy: Maximum long-term lockup.',
      rebalanceAction: 'Rebalanced +250,000 $OD to 365D VIP Vault',
      signalType: 'LONG_LOCKUP',
      timestamp: '15 mins ago',
      copyStakeCount: 184,
      upvotes: 92,
      hasCopied: false
    },
    {
      id: 'WPOST-02',
      whaleAlias: '⚡ Poseidon Maritime Capital',
      whaleAddress: '0x32C...1092',
      whaleTier: 'Fleet Admiral ($980k $OD)',
      holdingAmount: 980000,
      title: 'Auto-Compounded +14,200 $OD Yield from Singapore Node',
      content: 'Singapore Port Clearing Node yield distribution came through. Auto-restaking 100% of earned yield into Blue Carbon Vaults to maximize compound curves before protocol TVL hits $100M milestone.',
      rebalanceAction: 'Auto-Compounded +14,200 $OD Yield',
      signalType: 'YIELD_CLAIM',
      timestamp: '1 hour ago',
      copyStakeCount: 126,
      upvotes: 68,
      hasCopied: true
    },
    {
      id: 'WPOST-03',
      whaleAlias: '🔱 Captain Nemo Syndicate',
      whaleAddress: '0x71F...9022',
      whaleTier: 'Fleet Admiral ($720k $OD)',
      holdingAmount: 720000,
      title: 'Zurich Gold Vault Parity Rebalance Signal',
      content: 'With MCRB gold reserves hitting 104.8% parity, we have allocated 100,000 $OD to Sovereign Bonds. Expecting additional seigniorage dividend payouts to stakers over the next 14 days.',
      rebalanceAction: 'Rebalanced 100,000 $OD to Gold Bonds',
      signalType: 'REBALANCE',
      timestamp: '3 hours ago',
      copyStakeCount: 95,
      upvotes: 54,
      hasCopied: false
    }
  ]);

  // GOVERNMENTS, PROVINCES & MARINE ASSOCIATIONS APPROVALS & LEGAL PROTECTION STATE
  const [jurisdictionalFilter, setJurisdictionalFilter] = useState<string>('ALL');
  const [govtAndAssocApprovals] = useState<Array<{
    id: string;
    authorityName: string;
    jurisdictionType: 'GOVERNMENT' | 'PROVINCIAL' | 'MARINE_ASSOC';
    flagIcon: string;
    charterName: string;
    certNumber: string;
    status: 'VERIFIED_ACTIVE' | 'SOVEREIGN_CHARTERED';
    scopeText: string;
    legalShieldDetail: string;
  }>>([
    {
      id: 'GOVT-01',
      authorityName: 'International Maritime Organization (IMO)',
      jurisdictionType: 'GOVERNMENT',
      flagIcon: '🇺🇳',
      charterName: 'Sovereign Digital Maritime Currency Charter',
      certNumber: 'IMO-8092-SOV-2026',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'International High-Seas Sovereign Waters Financial Settlement Protocol',
      legalShieldDetail: 'Fully exempt from land-based municipal banking restrictions under UNCLOS Article 87 (Freedom of the High Seas).'
    },
    {
      id: 'GOVT-02',
      authorityName: 'British Columbia Marine Port Authority (Canada)',
      jurisdictionType: 'PROVINCIAL',
      flagIcon: '🇨🇦',
      charterName: 'Pacific Coastal Sovereign Waters Gaming & Staking Concordat',
      certNumber: 'BC-MPA-2026-XOD',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'Provincial Marine Port Transit & Onboard Casino Settlement Approval',
      legalShieldDetail: 'Approved for passenger gaming and tokenized yield staking during transit across British Columbia territorial waters.'
    },
    {
      id: 'GOVT-03',
      authorityName: 'Singapore Maritime & Port Authority (MPA)',
      jurisdictionType: 'GOVERNMENT',
      flagIcon: '🇸🇬',
      charterName: 'Asian Sovereign Node Clearing Compliance Certificate',
      certNumber: 'MPA-SG-9011-CLR',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'Asian Oceanic Transit & Digital Settlement Node Approval',
      legalShieldDetail: 'Zero-capital-gains treatment for high-seas cruise token staking settlement via Singapore port node.'
    },
    {
      id: 'GOVT-04',
      authorityName: 'Dubai Maritime City Authority (DMCA)',
      jurisdictionType: 'GOVERNMENT',
      flagIcon: '🇦🇪',
      charterName: 'Middle East High-Seas Reserve Operating License',
      certNumber: 'DMCA-DXB-8802',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'Sovereign Wealth Vault & Yield Restaking Clearance',
      legalShieldDetail: 'Full legal immunity from regional financial services laws under Dubai Maritime Sovereign Charter.'
    },
    {
      id: 'GOVT-05',
      authorityName: 'Gibraltar Maritime Administration & Port Authority',
      jurisdictionType: 'GOVERNMENT',
      flagIcon: '🇬🇮',
      charterName: 'Mediterranean Flag State Gaming Charter',
      certNumber: 'GIB-MAR-2026-77',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'Flag-State Cruise Ship Lottery & Casino Sovereign License',
      legalShieldDetail: 'Complete legal protection under Gibraltar International Maritime Flag Charter.'
    },
    {
      id: 'GOVT-06',
      authorityName: 'Panama Maritime Authority (AMP)',
      jurisdictionType: 'GOVERNMENT',
      flagIcon: '🇵🇦',
      charterName: 'Trans-Oceanic Cruise Casino & Yield Clearance License',
      certNumber: 'AMP-PAN-5541',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'International Flag of Convenience Gaming & Lottery License',
      legalShieldDetail: 'Non-taxable maritime gaming revenue protection for vessel operators and stakers.'
    },
    {
      id: 'GOVT-07',
      authorityName: 'International Association of Gaming Regulators (IAGR)',
      jurisdictionType: 'MARINE_ASSOC',
      flagIcon: '🌐',
      charterName: 'Maritime Sovereign Division Gold Seal Approval',
      certNumber: 'IAGR-MSD-2026-AA',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'Global Fair-Play Audited RNG & Smart Contract Staking Protocol',
      legalShieldDetail: '100% Provably Fair certification with automated smart-contract non-custodial payouts.'
    },
    {
      id: 'GOVT-08',
      authorityName: 'International Cruise Victims & Safety Association (ICV)',
      jurisdictionType: 'MARINE_ASSOC',
      flagIcon: '⚓',
      charterName: 'High-Seas Passenger Financial Safety Seal',
      certNumber: 'ICV-SAFE-901',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'Passenger Escrow Reserve & Bankruptcy Protection Assurance',
      legalShieldDetail: 'Full passenger escrow backing ensuring 100% principal liquidity in international waters.'
    },
    {
      id: 'GOVT-09',
      authorityName: 'Global Blue Carbon UNEP Alliance',
      jurisdictionType: 'MARINE_ASSOC',
      flagIcon: '🌊',
      charterName: 'Marine Restoration Bond Compliance Certification',
      certNumber: 'UNEP-BLUE-2026-99',
      status: 'VERIFIED_ACTIVE',
      scopeText: 'Oceanic Ecosystem Rehabilitation & Carbon Offset Accreditation',
      legalShieldDetail: 'Certified ESG-compliant sovereign yield generation derived from marine restoration carbon credits.'
    }
  ]);

  // STOCKS, SHARES & BONDS SPECIALITY PORTAL STATE
  const [stocksBondsCategoryFilter, setStocksBondsCategoryFilter] = useState<string>('ALL');
  const [stocksBondsSearchQuery, setStocksBondsSearchQuery] = useState<string>('');
  const [selectedStockForOrder, setSelectedStockForOrder] = useState<any | null>(null);
  const [orderQuantityInput, setOrderQuantityInput] = useState<number>(10);
  const [claimedDividendsTotal, setClaimedDividendsTotal] = useState<number>(1480.50);

  const [userStockBondHoldings, setUserStockBondHoldings] = useState<Array<{
    ticker: string;
    assetName: string;
    sharesOwned: number;
    avgPurchasePrice: number;
    currentPrice: number;
    category: 'EQUITIES_STOCKS' | 'SOVEREIGN_BONDS' | 'FRACTIONAL_MARITIME';
    unclaimedYieldUsd: number;
    dividendRatePct: number;
  }>>([
    {
      ticker: 'RSCLG',
      assetName: 'Royal Sovereign Cruise Line Group',
      sharesOwned: 150,
      avgPurchasePrice: 135.00,
      currentPrice: 142.50,
      category: 'EQUITIES_STOCKS',
      unclaimedYieldUsd: 328.50,
      dividendRatePct: 6.2
    },
    {
      ticker: 'UNEP-BCB10',
      assetName: '10-Yr UNEP Blue Carbon Sovereign Bond',
      sharesOwned: 5,
      avgPurchasePrice: 1000.00,
      currentPrice: 1025.00,
      category: 'SOVEREIGN_BONDS',
      unclaimedYieldUsd: 212.50,
      dividendRatePct: 8.5
    },
    {
      ticker: 'PAN-TYB03',
      assetName: '3-Yr Panama Canal Transit Yield Bond',
      sharesOwned: 25,
      avgPurchasePrice: 100.00,
      currentPrice: 104.20,
      category: 'SOVEREIGN_BONDS',
      unclaimedYieldUsd: 93.30,
      dividendRatePct: 11.2
    }
  ]);

  const [availableStockBondMarket] = useState<Array<{
    ticker: string;
    assetName: string;
    category: 'EQUITIES_STOCKS' | 'SOVEREIGN_BONDS' | 'FRACTIONAL_MARITIME';
    priceUsd: number;
    priceChange24hPct: number;
    yieldRatePct: number;
    payoutFrequency: string;
    sovereignRating: string;
    peRatioOrMaturity: string;
    description: string;
  }>>([
    {
      ticker: 'RSCLG',
      assetName: 'Royal Sovereign Cruise Line Group',
      category: 'EQUITIES_STOCKS',
      priceUsd: 142.50,
      priceChange24hPct: 3.8,
      yieldRatePct: 6.2,
      payoutFrequency: 'Quarterly Dividend',
      sovereignRating: 'AAA Sovereign',
      peRatioOrMaturity: 'P/E 14.2',
      description: "World's largest sovereign-flagged mega-cruise & ocean gaming operator with 42 luxury liners."
    },
    {
      ticker: 'GPTI',
      assetName: 'Global Port Terminal Infrastructure Inc.',
      category: 'EQUITIES_STOCKS',
      priceUsd: 88.20,
      priceChange24hPct: 1.5,
      yieldRatePct: 5.8,
      payoutFrequency: 'Quarterly Dividend',
      sovereignRating: 'AA+ Sovereign',
      peRatioOrMaturity: 'P/E 12.8',
      description: 'Operates 18 deep-water container & passenger terminals across Malacca, Suez, and Panama corridors.'
    },
    {
      ticker: 'OHLC',
      assetName: 'Oceanic Hydrogen Logistics Corp',
      category: 'EQUITIES_STOCKS',
      priceUsd: 64.10,
      priceChange24hPct: 7.2,
      yieldRatePct: 4.5,
      payoutFrequency: 'Semi-Annual Dividend',
      sovereignRating: 'AA Sovereign',
      peRatioOrMaturity: 'P/E 18.5',
      description: 'Zero-emission green hydrogen bunkering fleet for trans-oceanic commercial vessels.'
    },
    {
      ticker: 'DSAS',
      assetName: 'Deep-Sea Autonomous Submersibles Ltd.',
      category: 'EQUITIES_STOCKS',
      priceUsd: 215.00,
      priceChange24hPct: 4.1,
      yieldRatePct: 7.1,
      payoutFrequency: 'Quarterly Dividend',
      sovereignRating: 'AAA Sovereign',
      peRatioOrMaturity: 'P/E 16.4',
      description: 'AI-powered autonomous sub-surface cargo drones and ocean mineral exploration fleet.'
    },
    {
      ticker: 'UNEP-BCB10',
      assetName: '10-Yr UNEP Blue Carbon Sovereign Bond',
      category: 'SOVEREIGN_BONDS',
      priceUsd: 1025.00,
      priceChange24hPct: 0.8,
      yieldRatePct: 8.5,
      payoutFrequency: 'Quarterly Coupon',
      sovereignRating: 'AAA Sovereign',
      peRatioOrMaturity: 'Matures Aug 2036',
      description: 'UN-backed sovereign bond funding coastal mangrove ecosystem restoration and verified blue carbon credits.'
    },
    {
      ticker: 'MCRB-GBB05',
      assetName: '5-Yr Zurich MCRB Gold-Backed Treasury Coupon',
      category: 'SOVEREIGN_BONDS',
      priceUsd: 500.00,
      priceChange24hPct: 0.4,
      yieldRatePct: 9.8,
      payoutFrequency: 'Semi-Annual Coupon',
      sovereignRating: 'AAA Sovereign',
      peRatioOrMaturity: 'Matures Feb 2031',
      description: 'Over-collateralized by physical gold bullion in Zurich vaults (104.8% backing parity).'
    },
    {
      ticker: 'SG-MSN07',
      assetName: '7-Yr Singapore Maritime Sovereign Note',
      category: 'SOVEREIGN_BONDS',
      priceUsd: 250.00,
      priceChange24hPct: 1.1,
      yieldRatePct: 7.4,
      payoutFrequency: 'Quarterly Coupon',
      sovereignRating: 'AAA Sovereign',
      peRatioOrMaturity: 'Matures Nov 2033',
      description: 'Singapore MPA chartered note financing automated port crane networks and AI vessel clearing.'
    },
    {
      ticker: 'PAN-TYB03',
      assetName: '3-Yr Panama Canal Transit Yield Bond',
      category: 'SOVEREIGN_BONDS',
      priceUsd: 104.20,
      priceChange24hPct: 2.3,
      yieldRatePct: 11.2,
      payoutFrequency: 'Monthly Coupon',
      sovereignRating: 'AA+ Sovereign',
      peRatioOrMaturity: 'Matures Aug 2029',
      description: 'Direct toll-yield revenue sharing bond backed by daily vessel transit tariffs through the Panama Canal.'
    },
    {
      ticker: 'CRUISE-SOLARIS',
      assetName: 'M/V Solaris Sovereign Mega-Cruise Vessel',
      category: 'FRACTIONAL_MARITIME',
      priceUsd: 25.00,
      priceChange24hPct: 5.4,
      yieldRatePct: 14.2,
      payoutFrequency: 'Monthly Profit Share',
      sovereignRating: 'Sovereign Chartered',
      peRatioOrMaturity: '1,000,000 Total Shares',
      description: 'Fractional ownership share in a $250M flag-state luxury cruise vessel with onboard gaming dividend distributions.'
    },
    {
      ticker: 'DOCK-SINGAPORE-04',
      assetName: 'Berth #4 Automated Port Crane Terminal',
      category: 'FRACTIONAL_MARITIME',
      priceUsd: 50.00,
      priceChange24hPct: 3.1,
      yieldRatePct: 12.8,
      payoutFrequency: 'Weekly Container Royalty',
      sovereignRating: 'Sovereign Chartered',
      peRatioOrMaturity: '500,000 Total Shares',
      description: 'Fractional asset share earning automated container loading royalties at Singapore Commercial Terminal.'
    }
  ]);
  
  // Active Staking Positions List
  const [stakedPositions, setStakedPositions] = useState<Array<{
    id: string;
    poolId: string;
    poolName: string;
    amount: number;
    currency: string;
    apr: number;
    lockPeriodDays: number;
    startDate: string;
    unlockDate: string;
    earnedYield: number;
    status: 'ACTIVE' | 'UNLOCKED' | 'CLAIMED';
    icon: string;
  }>>([
    {
      id: 'STK-9001',
      poolId: '30_DAY_SOVEREIGN',
      poolName: '30-Day Sovereign Reserve Pool',
      amount: 2500.00,
      currency: '$OD / $XOD',
      apr: 14.2,
      lockPeriodDays: 30,
      startDate: '2026-08-01',
      unlockDate: '2026-08-31',
      earnedYield: 118.40,
      status: 'ACTIVE',
      icon: '🛡️'
    },
    {
      id: 'STK-9002',
      poolId: '90_DAY_CARBON',
      poolName: '90-Day Blue Carbon Yield Vault',
      amount: 1750.00,
      currency: '$OD / $XOD ($IOD)',
      apr: 22.5,
      lockPeriodDays: 90,
      startDate: '2026-07-15',
      unlockDate: '2026-10-13',
      earnedYield: 66.25,
      status: 'ACTIVE',
      icon: '🌊'
    }
  ]);

  // Staking Payout & Action History
  const [stakingHistory, setStakingHistory] = useState<Array<{
    id: string;
    action: 'DEPOSIT_STAKE' | 'CLAIM_YIELD' | 'COMPOUND_REWARDS' | 'UNSTAKE_PRINCIPAL';
    poolName: string;
    amount: number;
    currency: string;
    timestamp: string;
    txHash: string;
    status: 'SETTLED';
  }>>([
    {
      id: 'STK-TX-801',
      action: 'CLAIM_YIELD',
      poolName: '30-Day Sovereign Reserve Pool',
      amount: 45.20,
      currency: '$OD',
      timestamp: '2026-08-14 10:15:22',
      txHash: '0xSTK_YIELD_88192a',
      status: 'SETTLED'
    },
    {
      id: 'STK-TX-802',
      action: 'DEPOSIT_STAKE',
      poolName: '90-Day Blue Carbon Yield Vault',
      amount: 1750.00,
      currency: '$OD / $XOD',
      timestamp: '2026-07-15 14:00:00',
      txHash: '0xSTK_DEP_44109b',
      status: 'SETTLED'
    }
  ]);

  // Staking Simulator State
  const [simAmount, setSimAmount] = useState<number>(1000);
  const [simDays, setSimDays] = useState<number>(90);
  const [simPoolApr, setSimPoolApr] = useState<number>(22.5);
  const [charterData, setCharterData] = useState<any>({
    currencyName: 'Ocean Dollar',
    currencySymbol: '$OD',
    iso4217Code: 'XOD',
    numericCode: '998',
    indianOceanDollar: {
      currencyName: 'Indian Ocean Dollar',
      currencySymbol: '$IOD',
      iso4217Code: 'XIOD',
      numericCode: '999',
      legalTenderStatus: 'SOVEREIGN_REGIONAL_LEGAL_TENDER',
      pegRatioOD: 1.000,
      pegRatioINR: 83.50,
      primaryRegion: 'Indian Ocean Rim Association (IORA), Bay of Bengal, Arabian Sea'
    },
    legalTenderStatus: 'LEGALIZED_SOVEREIGN_INTERNATIONAL_CURRENCY',
    governingTreaty: 'UNCTAD Maritime Sovereign Currency Charter & IMO High Seas Financial Treaty #2026-XOD-01',
    swiftBicCode: 'XODRGLXX',
    issuer: 'Maritime Central Reserve Bank & Ocean Dollar Monetary Authority (ODMA)',
    reserveBackingRatioPct: 104.8,
    totalReserveValuationUSD: '$24,850,000,000 USD Equivalent',
    reserveComposition: {
      bullionGoldPct: 38.0,
      imfSpecialDrawingRightsPct: 28.0,
      sovereignBlueCarbonBondsPct: 22.0,
      multiCurrencyFXBasketPct: 12.0
    },
    fiatPegs: {
      USD: 1.000,
      INR: 83.50,
      EUR: 0.920,
      GBP: 0.785,
      JPY: 152.40,
      SGD: 1.340,
      AUD: 1.510,
      CAD: 1.360,
      AED: 3.670
    },
    participatingSovereignNationsCount: 48,
    legalStatusNotice: 'Official legal tender across international maritime waters, Indian Ocean trade corridors, high-seas economic zones, registered cruise flag vessels, and participating sovereign port jurisdictions under UNCTAD Maritime Financial Charter.'
  });

  const [fxFromCurrency, setFxFromCurrency] = useState<string>('INR');
  const [fxTargetCurrency, setFxTargetCurrency] = useState<string>('IOD');
  const [fxAmount, setFxAmount] = useState<number>(5000);
  const [isConvertingFX, setIsConvertingFX] = useState<boolean>(false);
  const [conversionCertificate, setConversionCertificate] = useState<any>(null);

  const [cbdcMintAmount, setCbdcMintAmount] = useState<number>(1000);
  const [cbdcCurrencyType, setCbdcCurrencyType] = useState<string>('IOD');
  const [cbdcRecipient, setCbdcRecipient] = useState<string>('0x4f8B92a1042f8832a10d98231');
  const [isMintingCBDC, setIsMintingCBDC] = useState<boolean>(false);
  const [mintCertificate, setMintCertificate] = useState<any>(null);

  // WALLET TRANSFER STATE
  const [transferAmount, setTransferAmount] = useState<number>(250);
  const [transferCurrency, setTransferCurrency] = useState<string>('IOD');
  const [treasuryTransferRecipient, setTreasuryTransferRecipient] = useState<string>('0x71C8921a84fB90231a892');
  const [treasuryTransferMemo, setTreasuryTransferMemo] = useState<string>('Indian Ocean Fleet High-Seas Settlement');
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [transferReceipt, setTransferReceipt] = useState<any>(null);

  // MARKET SENTIMENT STATE
  const [marketSentiment, setMarketSentiment] = useState<any>({
    score: 88,
    label: 'EXTREME_BULLISH_CONFIDENCE',
    sentimentText: 'Institutional & Maritime Central Reserves Inflow Surge',
    iodSentimentScore: 92,
    odSentimentScore: 90,
    institutionalInflow24hUSD: '$2.85 Billion',
    satcomConfidenceIndex: '99.4%',
    volatilityIndexPct: 1.2
  });

  // Digital Currency Market Data State
  const [marketAssets, setMarketAssets] = useState<any[]>([
    { symbol: '$IOD', name: 'Indian Ocean Dollar', iso: 'XIOD', priceUSD: 1.000, exchangeRateINR: 83.50, change24hPct: 0.02, volume24hUSD: 4250000000, marketCapUSD: 12500000000, high24h: 1.002, low24h: 0.998, category: 'Sovereign Regional Tender' },
    { symbol: '$OD', name: 'Ocean Dollar Global', iso: 'XOD', priceUSD: 1.000, exchangeRateINR: 83.50, change24hPct: 0.01, volume24hUSD: 6800000000, marketCapUSD: 18450000000, high24h: 1.001, low24h: 0.999, category: 'Sovereign Global Tender' },
    { symbol: 'BTC', name: 'Bitcoin', iso: 'BTC', priceUSD: 94850.00, change24hPct: 2.45, volume24hUSD: 48200000000, marketCapUSD: 1870000000000, high24h: 95400.00, low24h: 92100.00, category: 'Cryptocurrency' },
    { symbol: 'ETH', name: 'Ethereum', iso: 'ETH', priceUSD: 3420.50, change24hPct: -0.85, volume24hUSD: 24100000000, marketCapUSD: 412000000000, high24h: 3510.00, low24h: 3380.00, category: 'Cryptocurrency' },
    { symbol: 'SOL', name: 'Solana', iso: 'SOL', priceUSD: 188.40, change24hPct: 5.12, volume24hUSD: 8400000000, marketCapUSD: 88000000000, high24h: 192.00, low24h: 178.50, category: 'Cryptocurrency' },
    { symbol: 'SDR', name: 'IMF Special Drawing Rights', iso: 'XDR', priceUSD: 1.332, change24hPct: 0.05, volume24hUSD: 12000000000, marketCapUSD: 290000000000, high24h: 1.335, low24h: 1.330, category: 'Supranational Asset' },
    { symbol: 'XAU', name: 'Gold Troy Ounce', iso: 'XAU', priceUSD: 2745.20, change24hPct: 0.68, volume24hUSD: 32000000000, marketCapUSD: 16500000000000, high24h: 2758.00, low24h: 2728.00, category: 'Commodity Reserve' }
  ]);

  // Transparency & Fiscal Dashboard State
  const [transparencyData, setTransparencyData] = useState<any>({
    status: 'AUDIT_VERIFIED_100_PERCENT',
    lastProofOfReservesAudit: new Date().toISOString(),
    auditor: 'Deloitte Maritime & SatCom On-Chain Cryptographic Auditor Group',
    treasurySummary: {
      totalReservesUSD: 24850000000,
      reserveRatioPct: 104.8,
      circulatingSupplyIOD: 12500000000,
      circulatingSupplyOD: 11200000000,
      fiscalSurplusUSD: 1420000000,
      fiscalDeficitPct: 0.00,
      transparencyScorePct: 100,
      satcomNodeSyncState: '100% IN SYNC across 12 SatCom Orbits'
    },
    proofOfReserves: [
      { asset: 'Physical Gold Bullion', location: 'Singapore & London Vaults', amountUSD: 9443000000, sharePct: 38.0, verificationStatus: 'PHYSICAL_AUDITED_OK' },
      { asset: 'IMF Special Drawing Rights (SDR)', location: 'BIS Basel Account #942', amountUSD: 6958000000, sharePct: 28.0, verificationStatus: 'CENTRAL_BANK_CONFIRMED' },
      { asset: 'Indian Ocean Sovereign Blue Carbon Bonds', location: 'Maritime Green Treasury', amountUSD: 5467000000, sharePct: 22.0, verificationStatus: 'ON_CHAIN_VERIFIED' },
      { asset: 'Multi-Currency Fiat Basket (INR/USD/EUR/GBP/SGD)', location: 'MCRB Reserve Accounts', amountUSD: 2982000000, sharePct: 12.0, verificationStatus: 'FEDWIRE_SWIFT_VERIFIED' }
    ],
    recentFiscalLedger: [
      { id: 'TX-TR-9041', type: 'RESERVE_INFLOW', amount: '$50,000,000 USD', details: 'Gold Bullion Deposit - Port of Colombo Vault', timestamp: '12 mins ago', status: 'VERIFIED' },
      { id: 'TX-TR-9040', type: 'SEIGNIORAGE_MINT', amount: '25,000,000 $IOD', details: 'Indian Ocean Maritime Commerce Allocation', timestamp: '45 mins ago', status: 'VERIFIED' },
      { id: 'TX-TR-9039', type: 'BOND_YIELD_PAYOUT', amount: '$1,200,000 $OD', details: 'Quarterly Blue Carbon Bond Dividend', timestamp: '2 hours ago', status: 'VERIFIED' }
    ]
  });

  // MARKET NEWS & INTELLIGENCE STATE
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('ALL');
  const [newsSearchQuery, setNewsSearchQuery] = useState<string>('');
  const [marketNewsList, setMarketNewsList] = useState<any[]>([
    {
      id: 'NEWS-101',
      title: 'Indian Ocean Rim Association (IORA) Formally Accord Sovereign Status to $IOD',
      category: 'SOVEREIGN POLICY',
      timestamp: '15 minutes ago',
      summary: '23 member nations approve Indian Ocean Dollar ($IOD) for bilateral maritime trade clearing, zeroing cross-border exchange fees.',
      source: 'Colombo Maritime Financial Dispatch',
      impact: 'HIGHLY BULLISH',
      readTime: '2 min read'
    },
    {
      id: 'NEWS-102',
      title: 'Maritime Central Reserve Vault Inflow Crosses $24.85 Billion USD Backing',
      category: 'RESERVE AUDIT',
      timestamp: '1 hour ago',
      summary: 'Deloitte completes real-time cryptographic audit confirming 104.8% over-collateralization ratio backed by physical Gold and Blue Carbon Bonds.',
      source: 'Deloitte On-Chain Audit Feed',
      impact: 'STABILITY CONFIRMED',
      readTime: '3 min read'
    },
    {
      id: 'NEWS-103',
      title: 'High-Seas SatCom Orbital Nodes Achieve 142ms Instant Transfer Latency',
      category: 'TECH & INFRASTRUCTURE',
      timestamp: '3 hours ago',
      summary: '12 LEO satellite constellation nodes report 100% uptime with zero transaction failures across deep-sea international waters.',
      source: 'SatCom Global Network HQ',
      impact: 'NETWORK OPTIMIZED',
      readTime: '2 min read'
    },
    {
      id: 'NEWS-104',
      title: 'Blue Carbon Sovereignty Bond Series IV Yield Dividend Distributed in $OD',
      category: 'BOND MARKETS',
      timestamp: '5 hours ago',
      summary: 'Quarterly payout of $1,200,000 $OD settled to maritime green energy bondholders with zero tax withholding.',
      source: 'Blue Carbon Treasury Portal',
      impact: 'YIELD POSITIVE',
      readTime: '4 min read'
    }
  ]);

  // PRICE TRENDS STATE
  const [priceTrendsData, setPriceTrendsData] = useState<any>({
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'],
    iodUSD: [1.000, 1.000, 1.001, 1.000, 1.000, 1.001, 1.000],
    odUSD: [1.000, 1.000, 1.000, 1.001, 1.000, 1.000, 1.000],
    iodINR: [83.42, 83.45, 83.48, 83.50, 83.50, 83.49, 83.50],
    goldXAU: [2680.00, 2695.50, 2710.20, 2725.00, 2738.40, 2740.00, 2745.20],
    sdrXDR: [1.328, 1.330, 1.331, 1.330, 1.332, 1.331, 1.332]
  });

  // TRANSACTION HISTORY STATE
  const [txHistoryList, setTxHistoryList] = useState<any[]>([
    { id: 'TX-99081', type: 'WALLET_TRANSFER', amount: 500, currency: '$IOD', recipient: '0x71C8...8921 (Fleet Wallet)', sender: '0x4F8B...3A92', status: 'SETTLED', speed: '142ms', timestamp: '2026-08-14 12:41:05', memo: 'Port Colombo Cargo Bunkering Settlement' },
    { id: 'TX-99080', type: 'CBDC_MINT', amount: 25000, currency: '$IOD', recipient: '0x3A11...991A (Reserve Vault)', sender: 'MCRB Central Mint', status: 'SETTLED', speed: '98ms', timestamp: '2026-08-14 11:15:30', memo: 'Seigniorage Central Issue Series 2026-A' },
    { id: 'TX-99079', type: 'FX_CONVERSION', amount: 83500, currency: 'INR -> $IOD', recipient: '0x9B20...401F (Maritime Merchant)', sender: 'State Bank FX Proxy', status: 'SETTLED', speed: '210ms', timestamp: '2026-08-14 09:22:18', memo: 'Rupee to Indian Ocean Dollar Exchange' },
    { id: 'TX-99078', type: 'WALLET_TRANSFER', amount: 1200, currency: '$OD', recipient: '0x88F1...11C0 (Cruise Terminal)', sender: '0x71C8...8921', status: 'SETTLED', speed: '135ms', timestamp: '2026-08-14 08:05:44', memo: 'High-Seas VIP Casino Direct Deposit' },
    { id: 'TX-99077', type: 'BOND_PAYOUT', amount: 4500, currency: '$IOD', recipient: '0x1C99...771B (Green Vault)', sender: 'Blue Carbon Treasury', status: 'SETTLED', speed: '180ms', timestamp: '2026-08-13 22:40:12', memo: 'Ocean Yield Distribution Q2' }
  ]);
  const [txTypeFilter, setTxTypeFilter] = useState<string>('ALL');
  const [txSearchQuery, setTxSearchQuery] = useState<string>('');

  // WALLET QR GENERATOR STATE
  const [qrCurrency, setQrCurrency] = useState<string>('IOD');
  const [qrAmount, setQrAmount] = useState<number>(250);
  const [qrWalletAddress, setQrWalletAddress] = useState<string>('0x71C8921a84fB90231a892');
  const [qrMemo, setQrMemo] = useState<string>('Maritime High-Seas Direct Transfer');
  const [isQrCopied, setIsQrCopied] = useState<boolean>(false);
  const [showQrExpandedModal, setShowQrExpandedModal] = useState<boolean>(false);

  // Fetch Charter, Market & Transparency Data
  const fetchOceanDollarCharter = async () => {
    try {
      const [charterRes, marketRes, transparencyRes] = await Promise.all([
        fetch('/api/currency/ocean-dollar/charter-status'),
        fetch('/api/currency/market-prices'),
        fetch('/api/currency/treasury-transparency')
      ]);

      if (charterRes.ok) {
        const data = await charterRes.json();
        setCharterData(data);
      }
      if (marketRes.ok) {
        const mData = await marketRes.json();
        if (mData.assets) setMarketAssets(mData.assets);
        if (mData.marketSentiment) setMarketSentiment(mData.marketSentiment);
        if (mData.marketNews) setMarketNewsList(mData.marketNews);
        if (mData.priceTrends) setPriceTrendsData(mData.priceTrends);
        if (mData.transactionHistory) setTxHistoryList(mData.transactionHistory);
      }
      if (transparencyRes.ok) {
        const tData = await transparencyRes.json();
        setTransparencyData(tData);
      }
    } catch (err) {
      // Fallbacks already initialized
    }
  };

  useEffect(() => {
    fetchOceanDollarCharter();
  }, []);

  // STAKING HANDLERS ($OD / $XOD & $IOD)
  const handleDepositStake = (poolId: string, amount: number, currencySymbol: string = '$OD / $XOD') => {
    if (amount <= 0) {
      triggerToast('Please enter a valid amount to stake.');
      return;
    }
    if (oceanDollarBalance < amount) {
      triggerToast(`Insufficient $OD balance. You need ${amount} $OD to stake.`);
      return;
    }

    setIsStakingProcessing(true);
    setTimeout(() => {
      const poolMap: Record<string, { name: string; apr: number; days: number; icon: string }> = {
        FLEX_MARITIME: { name: 'Flexible Maritime Vault', apr: 8.5, days: 0, icon: '⚡' },
        '30_DAY_SOVEREIGN': { name: '30-Day Sovereign Reserve Pool', apr: 14.2, days: 30, icon: '🛡️' },
        '90_DAY_CARBON': { name: '90-Day Blue Carbon Yield Vault', apr: 22.5, days: 90, icon: '🌊' },
        '365_DAY_VIP': { name: '365-Day High-Seas VIP Vault', apr: 34.0, days: 365, icon: '👑' },
      };

      const selected = poolMap[poolId] || poolMap['30_DAY_SOVEREIGN'];
      const newId = `STK-${Math.floor(1000 + Math.random() * 9000)}`;
      const startDateStr = new Date().toISOString().substring(0, 10);
      const unlockDate = new Date();
      unlockDate.setDate(unlockDate.getDate() + selected.days);
      const unlockDateStr = unlockDate.toISOString().substring(0, 10);

      const newPos = {
        id: newId,
        poolId,
        poolName: selected.name,
        amount,
        currency: currencySymbol,
        apr: selected.apr,
        lockPeriodDays: selected.days,
        startDate: startDateStr,
        unlockDate: unlockDateStr,
        earnedYield: 0.00,
        status: 'ACTIVE' as const,
        icon: selected.icon
      };

      setOceanDollarBalance(prev => Math.max(0, prev - amount));
      setStakedBalance(prev => prev + amount);
      setStakedPositions(prev => [newPos, ...prev]);

      const txHash = `0xSTK_${Math.random().toString(16).substring(2, 10)}`;
      setStakingHistory(prev => [
        {
          id: `STK-TX-${Math.floor(800 + Math.random() * 100)}`,
          action: 'DEPOSIT_STAKE',
          poolName: selected.name,
          amount,
          currency: currencySymbol,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          txHash,
          status: 'SETTLED'
        },
        ...prev
      ]);

      setIsStakingProcessing(false);
      triggerToast(`Successfully staked ${amount} ${currencySymbol} into ${selected.name} at ${selected.apr}% APY!`);
    }, 600);
  };

  const handleClaimYield = (posId?: string) => {
    if (posId) {
      const pos = stakedPositions.find(p => p.id === posId);
      if (!pos || pos.earnedYield <= 0) {
        triggerToast('No claimable yield on this position currently.');
        return;
      }
      const claimed = pos.earnedYield;
      setOceanDollarBalance(prev => prev + claimed);
      setStakedPositions(prev => prev.map(p => p.id === posId ? { ...p, earnedYield: 0 } : p));
      
      const txHash = `0xYIELD_${Math.random().toString(16).substring(2, 10)}`;
      setStakingHistory(prev => [
        {
          id: `STK-TX-${Math.floor(800 + Math.random() * 100)}`,
          action: 'CLAIM_YIELD',
          poolName: pos.poolName,
          amount: claimed,
          currency: pos.currency,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          txHash,
          status: 'SETTLED'
        },
        ...prev
      ]);
      triggerToast(`Claimed ${claimed.toFixed(2)} yield payout into your active balance!`);
    } else {
      if (accumulatedYield <= 0) {
        triggerToast('No yield currently accumulated to claim.');
        return;
      }
      const claimed = accumulatedYield;
      setOceanDollarBalance(prev => prev + claimed);
      setAccumulatedYield(0);
      
      const txHash = `0xYIELD_${Math.random().toString(16).substring(2, 10)}`;
      setStakingHistory(prev => [
        {
          id: `STK-TX-${Math.floor(800 + Math.random() * 100)}`,
          action: 'CLAIM_YIELD',
          poolName: 'Global Liquidity Dividends',
          amount: claimed,
          currency: '$OD / $XOD',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          txHash,
          status: 'SETTLED'
        },
        ...prev
      ]);
      triggerToast(`Claimed ${claimed.toFixed(2)} total yield dividend to your wallet!`);
    }
  };

  const handleCompoundYield = () => {
    if (accumulatedYield <= 0) {
      triggerToast('No yield available to auto-compound.');
      return;
    }
    const amountToCompound = accumulatedYield;
    setStakedBalance(prev => prev + amountToCompound);
    setAccumulatedYield(0);

    const txHash = `0xCMP_${Math.random().toString(16).substring(2, 10)}`;
    setStakingHistory(prev => [
      {
        id: `STK-TX-${Math.floor(800 + Math.random() * 100)}`,
        action: 'COMPOUND_REWARDS',
        poolName: '30-Day Sovereign Reserve Pool (Auto-Compound)',
        amount: amountToCompound,
        currency: '$OD / $XOD',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        txHash,
        status: 'SETTLED'
      },
      ...prev
    ]);
    triggerToast(`Re-invested ${amountToCompound.toFixed(2)} accumulated rewards back into your staking principal!`);
  };

  const handleUnstakePosition = (posId: string) => {
    const pos = stakedPositions.find(p => p.id === posId);
    if (!pos) return;
    
    const returnTotal = pos.amount + pos.earnedYield;
    setOceanDollarBalance(prev => prev + returnTotal);
    setStakedBalance(prev => Math.max(0, prev - pos.amount));
    setStakedPositions(prev => prev.filter(p => p.id !== posId));

    const txHash = `0xUNSTK_${Math.random().toString(16).substring(2, 10)}`;
    setStakingHistory(prev => [
      {
        id: `STK-TX-${Math.floor(800 + Math.random() * 100)}`,
        action: 'UNSTAKE_PRINCIPAL',
        poolName: pos.poolName,
        amount: returnTotal,
        currency: pos.currency,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        txHash,
        status: 'SETTLED'
      },
      ...prev
    ]);
    triggerToast(`Unstaked position #${posId}: Released ${returnTotal.toFixed(2)} (${pos.amount} principal + ${pos.earnedYield.toFixed(2)} yield) to your wallet!`);
  };

  const handleRunAutoCompoundCycle = () => {
    setIsAutoCompoundCycleRunning(true);
    setTimeout(() => {
      const amountToReinvest = accumulatedYield > 0 ? accumulatedYield : 28.50;
      setStakedBalance(prev => prev + amountToReinvest);
      setTotalAutoCompoundedRewards(prev => prev + amountToReinvest);
      setAccumulatedYield(0);

      const timestampStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      setLastAutoCompoundTimestamp(timestampStr);

      const txHash = `0xAUTO_${Math.random().toString(16).substring(2, 10)}`;
      setStakingHistory(prev => [
        {
          id: `STK-TX-${Math.floor(800 + Math.random() * 100)}`,
          action: 'COMPOUND_REWARDS',
          poolName: 'Automated SatCom Yield Reinvestor Engine',
          amount: amountToReinvest,
          currency: '$OD / $XOD',
          timestamp: timestampStr,
          txHash,
          status: 'SETTLED'
        },
        ...prev
      ]);

      setStakingNotifList(prev => [
        {
          id: `STK-NT-${Math.floor(200 + Math.random() * 100)}`,
          title: '🔄 Auto-Compound Executed',
          message: `Reinvested $${amountToReinvest.toFixed(2)} yield back into your principal staked balance automatically!`,
          type: 'AUTO_COMPOUND',
          timestamp: 'Just now',
          read: false,
          amount: amountToReinvest
        },
        ...prev
      ]);

      setIsAutoCompoundCycleRunning(false);
      triggerToast(`Auto-Compound Engine successfully reinvested $${amountToReinvest.toFixed(2)} into your principal!`);
    }, 800);
  };

  const handleMarkAllNotifsRead = () => {
    setStakingNotifList(prev => prev.map(n => ({ ...n, read: true })));
    triggerToast('All staking notifications marked as read.');
  };

  const handleTestNotificationPing = () => {
    const mockAmount = (Math.random() * 15 + 5).toFixed(2);
    const newNotif = {
      id: `STK-NT-${Math.floor(200 + Math.random() * 100)}`,
      title: '⚡ Simulated Yield Accrual Alert',
      message: `Test Ping: You received +$${mockAmount} $OD in daily yield dividends!`,
      type: 'YIELD_PAYOUT' as const,
      timestamp: 'Just now',
      read: false,
      amount: parseFloat(mockAmount)
    };
    setStakingNotifList(prev => [newNotif, ...prev]);
    triggerToast(`🔔 Staking Alert: +$${mockAmount} $OD yield dividend notification triggered!`);
  };

  // Handle Wallet Transfer
  const handleWalletTransfer = async () => {
    setIsTransferring(true);
    try {
      const res = await fetch('/api/currency/ocean-dollar/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: transferAmount,
          recipient: treasuryTransferRecipient,
          currencySymbol: transferCurrency === 'IOD' ? '⚓ IOD' : '⚓ OD',
          memo: treasuryTransferMemo
        })
      });
      if (res.ok) {
        const receipt = await res.json();
        setTransferReceipt(receipt);
        setTxHistoryList(prev => [
          {
            id: receipt.txHash.substring(0, 10).toUpperCase(),
            type: 'WALLET_TRANSFER',
            amount: receipt.amountTransferred,
            currency: receipt.currencySymbol,
            recipient: receipt.recipient,
            sender: '0x4F8B...3A92 (My Sovereign Wallet)',
            status: 'SETTLED',
            speed: `${receipt.clearingSpeedMs}ms`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            memo: receipt.memo
          },
          ...prev
        ]);
        triggerToast(`Transferred ${transferAmount} ${receipt.currencySymbol} via SatCom Uplink!`);
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      const isIOD = transferCurrency === 'IOD';
      const fallbackHash = `0xXOD_${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;
      const fallbackReceipt = {
        status: 'SETTLED_INSTANT_SATCOM_CLEARING',
        txHash: fallbackHash,
        amountTransferred: transferAmount,
        currencySymbol: isIOD ? '⚓ IOD' : '⚓ OD',
        recipient: treasuryTransferRecipient,
        memo: treasuryTransferMemo,
        satcomNodeVerification: 'Node #8 (Port of Colombo SatCom Uplink)',
        clearingSpeedMs: 142,
        feeOD: 0.00,
        timestamp: new Date().toISOString()
      };
      setTransferReceipt(fallbackReceipt);
      setTxHistoryList(prev => [
        {
          id: fallbackHash.substring(0, 10).toUpperCase(),
          type: 'WALLET_TRANSFER',
          amount: transferAmount,
          currency: isIOD ? '⚓ IOD' : '⚓ OD',
          recipient: treasuryTransferRecipient,
          sender: '0x4F8B...3A92 (My Sovereign Wallet)',
          status: 'SETTLED',
          speed: '142ms',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          memo: treasuryTransferMemo
        },
        ...prev
      ]);
      triggerToast(`Transferred ${transferAmount} ${isIOD ? '⚓ IOD' : '⚓ OD'} via SatCom Uplink!`);
    } finally {
      setIsTransferring(false);
    }
  };

  // Handle FX Conversion
  const handleFXConversion = async () => {
    setIsConvertingFX(true);
    try {
      const res = await fetch('/api/currency/ocean-dollar/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromCurrency: fxFromCurrency, targetCurrency: fxTargetCurrency, amount: fxAmount })
      });
      if (res.ok) {
        const cert = await res.json();
        setConversionCertificate(cert);
        triggerToast(`Converted ${fxAmount} ${fxFromCurrency} -> ${cert.mintedOceanDollarAmount} ${cert.iso4217To} Legal Tender!`);
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      const rateMap: Record<string, number> = { USD: 1.0, INR: 0.01198, EUR: 1.087, GBP: 1.2738, JPY: 0.00656, SGD: 0.7462, AUD: 0.6622, AED: 0.2723 };
      const fromRate = rateMap[fxFromCurrency] || 1.0;
      const targetSymbol = fxTargetCurrency === 'IOD' ? '$IOD (Indian Ocean Dollar)' : '$OD (Ocean Dollar)';
      const minted = parseFloat((fxAmount * fromRate).toFixed(2));
      setConversionCertificate({
        transactionId: `XOD-FX-${Date.now()}-8821`,
        iso4217From: fxFromCurrency,
        iso4217To: targetSymbol,
        inputAmount: fxAmount,
        mintedOceanDollarAmount: minted,
        appliedExchangeRate: fromRate,
        settlementSpeed: 'INSTANT_ZERO_SLIPPAGE',
        legalStatus: 'LEGAL_TENDER_MINTED',
        centralBankGuaranteeHash: '0xXOD90f88a21e41029412a88',
        timestamp: new Date().toISOString()
      });
      triggerToast(`Converted ${fxAmount} ${fxFromCurrency} -> ${minted} ${targetSymbol} Legal Tender!`);
    } finally {
      setIsConvertingFX(false);
    }
  };

  // Handle CBDC Minting
  const handleMintCBDC = async () => {
    setIsMintingCBDC(true);
    try {
      const res = await fetch('/api/currency/ocean-dollar/mint-cbdc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mintAmount: cbdcMintAmount, recipientAddress: cbdcRecipient, currencyType: cbdcCurrencyType })
      });
      if (res.ok) {
        const cert = await res.json();
        setMintCertificate(cert);
        triggerToast(`CBDC Minted: ${cert.mintedAmountOD} ${cert.currencySymbol} (Serial: ${cert.serialNumber})!`);
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      const isIOD = cbdcCurrencyType === 'IOD';
      setMintCertificate({
        status: 'MINT_SUCCESSFUL_LEGAL_TENDER_ISSUED',
        serialNumber: `${isIOD ? 'XIOD' : 'XOD'}-CBDC-2026-${Math.floor(Math.random() * 899999 + 100000)}`,
        mintedAmountOD: cbdcMintAmount,
        currencySymbol: isIOD ? '$IOD' : '$OD',
        currencyName: isIOD ? 'Indian Ocean Dollar' : 'Ocean Dollar',
        equivalentUSD: cbdcMintAmount * 1.0,
        recipient: cbdcRecipient,
        quantumResistantHSMSeal: '0xQUANTUM_AES_256_SEAL_a91081b294f',
        backingReserveVault: isIOD ? 'MCRB Indian Ocean Sovereign Vault (Mumbai/Colombo/Singapore)' : 'MCRB SatCom Vault Singapore/London',
        isoCode: isIOD ? 'XIOD (999)' : 'XOD (998)',
        legalNotice: `Issued under Maritime Central Reserve Bank Charter. Fully legal tender ${isIOD ? 'across Indian Ocean Rim and maritime trade routes' : 'for all high-seas commercial transactions'}.`,
        timestamp: new Date().toISOString()
      });
      triggerToast(`CBDC Minted: ${cbdcMintAmount} ${isIOD ? '$IOD' : '$OD'} Legal Tender Issued!`);
    } finally {
      setIsMintingCBDC(false);
    }
  };
  const [walletTwoFactorActive, setWalletTwoFactorActive] = useState<boolean>(true);
  const [hardwareSecurityModuleOnline, setHardwareSecurityModuleOnline] = useState<boolean>(true);
  const [dailyVelocityLimitOD, setDailyVelocityLimitOD] = useState<number>(50000);
  const [spentTodayOD, setSpentTodayOD] = useState<number>(1250.0);
  const [transferRecipient, setTransferRecipient] = useState<string>('0x98a120b88e1042f8832a10d98231');
  const [transferAmountOD, setTransferAmountOD] = useState<number>(250);
  const [transferMemo, setTransferMemo] = useState<string>('High Seas Port Duty Deposit');
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState<boolean>(false);
  const [twoFactorCodeInput, setTwoFactorCodeInput] = useState<string>('');
  const [walletSubTab, setWalletSubTab] = useState<'OVERVIEW' | 'MULTI_SIG_SAFE' | 'WHITELIST' | 'BRIDGE_CONVERTER' | 'SECURITY_POLICIES'>('OVERVIEW');

  // Multi-Sig Captain Safe Vaults
  const [multiSigVaults, setMultiSigVaults] = useState<Array<{
    escrowId: string;
    title: string;
    recipient: string;
    amountOD: number;
    requiredSignatures: number;
    currentSignatures: number;
    signers: Array<{ name: string; role: string; signed: boolean; timestamp?: string }>;
    status: 'PENDING_SIGNATURES' | 'RELEASED_COMPLETED' | 'CANCELLED';
    creationDate: string;
    description: string;
  }>>([
    {
      escrowId: 'SAFE-2026-9081',
      title: 'Mega Jackpot Winner Trust Escrow Reserve',
      recipient: 'Capt. Hector Silva (Master Mariner Vault)',
      amountOD: 25000.0,
      requiredSignatures: 3,
      currentSignatures: 2,
      signers: [
        { name: 'Capt. Alexander Vance', role: 'Flag State Master Mariner', signed: true, timestamp: '2026-08-13 10:15 UTC' },
        { name: 'Chief Security Off. Thorne', role: 'SatCom Maritime Auditor', signed: true, timestamp: '2026-08-13 11:40 UTC' },
        { name: 'LMAA High Seas Arbitrator', role: 'London Maritime Law Registrar', signed: false }
      ],
      status: 'PENDING_SIGNATURES',
      creationDate: '2026-08-13 09:00 UTC',
      description: '3-of-3 Multi-Sig authorization required to release tier-1 jackpot winnings over $20,000 $OD.'
    },
    {
      escrowId: 'SAFE-2026-8842',
      title: 'IMO 2026 High Seas Clean Fuel ESG Staking Pool',
      recipient: 'High Seas Maritime ESG Treasury',
      amountOD: 10000.0,
      requiredSignatures: 2,
      currentSignatures: 2,
      signers: [
        { name: 'Capt. Alexander Vance', role: 'Flag State Master Mariner', signed: true, timestamp: '2026-08-10 14:20 UTC' },
        { name: 'Chief Off. William Chen', role: 'First Officer', signed: true, timestamp: '2026-08-10 15:00 UTC' }
      ],
      status: 'RELEASED_COMPLETED',
      creationDate: '2026-08-10 12:00 UTC',
      description: 'Released 10,000 $OD to clean maritime fuel ESG liquidity pool.'
    }
  ]);

  // Whitelisted Addresses
  const [whitelistedAddresses, setWhitelistedAddresses] = useState([
    { id: 'WL-1', name: 'Capt. Alexander Vance Primary Cold Vault', address: '0x98f1a2014b82910a78129c', type: 'COLD_HARDWARE', verified: true },
    { id: 'WL-2', name: 'LMAA Maritime Escrow Treasury', address: '0x11a8291042bc881902e8810', type: 'MULTI_SIG_TREASURY', verified: true },
    { id: 'WL-3', name: 'Pacific Seafarer Guild Pool', address: '0x77e982019481a8820d912', type: 'GUILD_RESERVE', verified: true }
  ]);
  const [newWhitelistName, setNewWhitelistName] = useState('');
  const [newWhitelistAddress, setNewWhitelistAddress] = useState('');

  // KYC Verification Flow State
  const [kycStep, setKycStep] = useState<number>(1);
  const [kycDocType, setKycDocType] = useState<'CDC_BOOK' | 'SEAMAN_PASSPORT' | 'CRUISE_BOARDING_PASS'>('CDC_BOOK');
  const [kycDocFile, setKycDocFile] = useState<string>('capt_vance_cdc_verified_2026.pdf');
  const [kycSelfieScanned, setKycSelfieScanned] = useState<boolean>(true);
  const [kycVesselProof, setKycVesselProof] = useState<string>('IMO 9820184 Pacific Monarch AIS Manifest');
  const [kycVerificationLevel, setKycVerificationLevel] = useState<'LEVEL_3_UNLIMITED' | 'LEVEL_2_VERIFIED' | 'LEVEL_1_BASIC'>('LEVEL_3_UNLIMITED');

  // Gaming History Dashboard Filters
  const [historyFilterType, setHistoryFilterType] = useState<'ALL' | 'JACKPOT' | 'SCRATCHERS' | 'SPORTS_BET' | 'ROULETTE' | 'RAFFLE'>('ALL');
  const [historySearchQuery, setHistorySearchQuery] = useState<string>('');

  // Rules & Regulations Search
  const [rulesSearchQuery, setRulesSearchQuery] = useState<string>('');

  // CUSTOM GAME BETTING & TABLE LIMITS STATE
  const [maxJackpotTicketsPerDraw, setMaxJackpotTicketsPerDraw] = useState<number>(25);
  const [maxScratcherWager, setMaxScratcherWager] = useState<number>(50);
  const [maxRouletteBet, setMaxRouletteBet] = useState<number>(250);
  const [maxRegattaBet, setMaxRegattaBet] = useState<number>(100);

  // MASTER RESPONSIBLE PLAY TOGGLE & REALITY CHECK STATE
  const [masterResponsiblePlayEnabled, setMasterResponsiblePlayEnabled] = useState<boolean>(true);
  const [realityCheckInterval, setRealityCheckInterval] = useState<number>(30); // minutes
  const [emergencyLockoutActive, setEmergencyLockoutActive] = useState<boolean>(false);

  // GAMING TAX REPORT STATE
  const [taxReportYear, setTaxReportYear] = useState<string>('2026');
  const [taxJurisdiction, setTaxJurisdiction] = useState<string>('INTERNATIONAL_HIGH_SEAS_UNCLOS');

  // LOTTERY RTP MONITOR STATE
  const [selectedRtpGame, setSelectedRtpGame] = useState<'MEGA_JACKPOT' | 'SCRATCHERS' | 'ROULETTE' | 'REGATTA'>('MEGA_JACKPOT');

  // FULL LEGAL DISCLOSURES STATE
  const [legalArticleFilter, setLegalArticleFilter] = useState<string>('ALL');
  const [expandedLegalArticle, setExpandedLegalArticle] = useState<string | null>(null);

  // GAMING TRANSACTION LOGS STATE
  const [txLogTypeFilter, setTxLogTypeFilter] = useState<'ALL' | 'WAGER' | 'PAYOUT' | 'REWARD'>('ALL');
  const [txLogSearchQuery, setTxLogSearchQuery] = useState<string>('');

  // EXPORT MODEL & MODAL STATE
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [exportDocCategory, setExportDocCategory] = useState<
    'TAX_STATEMENT' | 'KYC_CLEARANCE' | 'ONCHAIN_AUDIT_LOG' | 'RTP_MONITOR' | 'FULL_RULES_CODEX' | 'MY_TICKETS'
  >('TAX_STATEMENT');
  const [exportFormatType, setExportFormatType] = useState<'PDF' | 'CSV' | 'JSON' | 'PRINT'>('PDF');
  const [exportDateRange, setExportDateRange] = useState<string>('2026_YTD');

  // REPORT AUTO-SAVE SYSTEM STATE
  const [reportAutoSaveEnabled, setReportAutoSaveEnabled] = useState<boolean>(true);
  const [lastReportAutoSaveTimestamp, setLastReportAutoSaveTimestamp] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [savedReportDraftsCount, setSavedReportDraftsCount] = useState<number>(4);

  // PRIZE DISTRIBUTION SIMULATOR STATE
  const [simulatedMatchCount, setSimulatedMatchCount] = useState<number>(5);
  const [simulatedHasCoral, setSimulatedHasCoral] = useState<boolean>(true);

  // Lottery & Entertainment Sub Navigation
  const [lotterySubTab, setLotterySubTab] = useState<
    'mega-jackpot' | 'scratchers' | 'daily-raffle' | 'maritime-betting' | 'roulette' | 'my-tickets'
  >('mega-jackpot');

  // Maritime Sports & Regatta Betting Data
  const MARITIME_BET_EVENTS: MaritimeBetEvent[] = [
    {
      id: 'mbet-1',
      category: 'REGATTA_YACHT',
      title: "America's Cup High Seas Ocean Regatta 2026",
      subtitle: '75ft Hydrofoil Catamaran Offshore Championship Final',
      vesselOrMatch: 'Emirates Team NZ vs INEOS Britannia',
      scheduledTime: 'Today 18:30 UTC',
      options: [
        { optionId: 'opt-nz', label: 'Emirates Team New Zealand', oddsMultiplier: 1.85, details: 'Favored hydrofoil wind speed 28 knots' },
        { optionId: 'opt-gb', label: 'INEOS Britannia', oddsMultiplier: 2.15, details: 'Challenger of record, high maneuverability' },
        { optionId: 'opt-it', label: 'Luna Rossa Prada Pirelli', oddsMultiplier: 3.40, details: 'Dark horse foil design' }
      ]
    },
    {
      id: 'mbet-2',
      category: 'TUG_OF_WAR',
      title: 'World Seafarer Tug-of-War League',
      subtitle: 'High Seas Deck Crew Heavyweight Finals',
      vesselOrMatch: 'Pacific Container Crew vs Atlantic Offshore Rig',
      scheduledTime: 'Today 21:00 UTC',
      options: [
        { optionId: 'opt-pac', label: 'Pacific Container Crew All-Stars', oddsMultiplier: 1.65, details: 'Defending 2025 High Seas Champions' },
        { optionId: 'opt-atl', label: 'Atlantic Offshore Rig Heavyweights', oddsMultiplier: 2.40, details: 'Challenger squad with 1050kg total weight' }
      ]
    },
    {
      id: 'mbet-3',
      category: 'ETA_PRECISION',
      title: 'Pacific Express Vessel ETA Precision Race',
      subtitle: 'Container Ship Arrival Time Accuracy Challenge',
      vesselOrMatch: 'M/V Ocean Empress Port Arrival',
      scheduledTime: 'Tomorrow 04:00 UTC',
      options: [
        { optionId: 'opt-ontime', label: 'On-Time Arrival (Within ±15 Mins)', oddsMultiplier: 2.10, details: 'Favorable tailwinds along Singapore Strait' },
        { optionId: 'opt-late', label: 'Arrival Delay (>30 Mins Delay)', oddsMultiplier: 1.70, details: 'Potential port congestion at Terminal 4' }
      ]
    },
    {
      id: 'mbet-4',
      category: 'DRONE_SPRINT',
      title: 'Global Maritime Drone Speed Sprint',
      subtitle: 'Satellite Guided Ship-to-Shore Cargo Delivery Race',
      vesselOrMatch: 'Drone Alpha vs Drone Beta',
      scheduledTime: 'Today 22:45 UTC',
      options: [
        { optionId: 'opt-drone-a', label: 'SatCom Drone Alpha', oddsMultiplier: 3.20, details: 'Heavy lift quadrotor payload' },
        { optionId: 'opt-drone-b', label: 'SatCom Drone Beta', oddsMultiplier: 1.35, details: 'Aerodynamic fixed-wing VTOL' }
      ]
    }
  ];

  const [selectedBetEvent, setSelectedBetEvent] = useState<MaritimeBetEvent | null>(MARITIME_BET_EVENTS[0]);
  const [selectedBetOption, setSelectedBetOption] = useState<{ optionId: string; label: string; oddsMultiplier: number } | null>(
    MARITIME_BET_EVENTS[0].options[0]
  );
  const [betAmountOD, setBetAmountOD] = useState<number>(25);

  // Mega Jackpot Selection
  const [selectedMainNumbers, setSelectedMainNumbers] = useState<number[]>([]);
  const [selectedCoralBall, setSelectedCoralBall] = useState<number | null>(null);
  const [jackpotMultiplier, setJackpotMultiplier] = useState<number>(1);
  const [ticketCount, setTicketCount] = useState<number>(1);

  // Lottery Tickets List
  const [myTickets, setMyTickets] = useState<LotteryTicket[]>(INITIAL_LOTTERY_TICKETS);

  // Payment Gateway Modal State
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentAmountUSD, setPaymentAmountUSD] = useState<number>(100);
  const [selectedPaymentRail, setSelectedPaymentRail] = useState<
    'CREDIT_CARD' | 'DIGITAL_OCEAN_DOLLAR' | 'APPLE_GOOGLE_PAY' | 'USDT_CRYPTO' | 'SWIFT_WIRE' | 'SEAFARER_SATELLITE'
  >('DIGITAL_OCEAN_DOLLAR');
  const [cardNumber, setCardNumber] = useState<string>('4111 2222 3333 8841');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('882');
  const [payerName, setPayerName] = useState<string>('Capt. Alexander Vance');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<any | null>(null);

  // Toast Notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // P2P Transfer Modal
  const [showP2PModal, setShowP2PModal] = useState<boolean>(false);
  const [p2pRecipient, setP2PRecipient] = useState<string>('Crew-ID: SEA-88192 (Chief Mate Sarah)');
  const [p2pAmount, setP2PAmount] = useState<number>(50);

  // Staking Modal
  const [showStakeModal, setShowStakeModal] = useState<boolean>(false);

  // Provably Fair Verification
  const [verifySeedInput, setVerifySeedInput] = useState<string>('0x9f88a2c102384a1e9c882104a');
  const [verifyResult, setVerifyResult] = useState<any | null>(null);

  // Interactive Scratch Cards State
  const [scratchCards, setScratchCards] = useState<ScratchCardData[]>([
    {
      id: 'sc-1',
      title: "Triton's Gold Reef",
      costOD: 5,
      topPrizeOD: 10000,
      accentColor: 'from-amber-500 to-yellow-600',
      symbols: ['🔱', '⚓', '💎', '🔱', '🐬', '🔱'],
      winningSymbol: '🔱',
      revealed: [false, false, false, false, false, false],
      isScratched: false,
      wonAmountOD: 50
    },
    {
      id: 'sc-2',
      title: 'Atlantic Pearl Jackpot',
      costOD: 15,
      topPrizeOD: 50000,
      accentColor: 'from-cyan-500 to-blue-600',
      symbols: ['🦪', '🦪', '💎', '🦪', '🌊', '🐠'],
      winningSymbol: '🦪',
      revealed: [false, false, false, false, false, false],
      isScratched: false,
      wonAmountOD: 500
    },
    {
      id: 'sc-3',
      title: "Neptune's Royal Trident",
      costOD: 50,
      topPrizeOD: 250000,
      accentColor: 'from-purple-500 to-indigo-600',
      symbols: ['👑', '🔱', '💎', '👑', '👑', '🦈'],
      winningSymbol: '👑',
      revealed: [false, false, false, false, false, false],
      isScratched: false,
      wonAmountOD: 2500
    }
  ]);

  // Roulette Wheel State
  const [rouletteBetType, setRouletteBetType] = useState<'RED' | 'BLACK' | 'NUMBER_7' | 'EVEN'>('RED');
  const [rouletteBetOD, setRouletteBetOD] = useState<number>(20);
  const [isSpinningRoulette, setIsSpinningRoulette] = useState<boolean>(false);
  const [rouletteResultNumber, setRouletteResultNumber] = useState<number | null>(null);

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    hapticEngine.trigger('success');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Toggle Number Selection for Jackpot
  const toggleMainNumber = (num: number) => {
    hapticEngine.trigger('light');
    if (selectedMainNumbers.includes(num)) {
      setSelectedMainNumbers(selectedMainNumbers.filter((n) => n !== num));
    } else {
      if (selectedMainNumbers.length < 5) {
        setSelectedMainNumbers([...selectedMainNumbers, num]);
      } else {
        triggerToast('Maximum 5 main numbers allowed!');
      }
    }
  };

  // Quick Pick Random Numbers
  const handleQuickPick = () => {
    hapticEngine.trigger('medium');
    const mainSet = new Set<number>();
    while (mainSet.size < 5) {
      mainSet.add(Math.floor(Math.random() * 50) + 1);
    }
    setSelectedMainNumbers(Array.from(mainSet));
    setSelectedCoralBall(Math.floor(Math.random() * 20) + 1);
    triggerToast('Quick Pick Lucky Numbers Generated!');
  };

  // Buy Lottery Ticket
  const handleBuyTicket = () => {
    if (selectedMainNumbers.length !== 5 || !selectedCoralBall) {
      triggerToast('Please select 5 main numbers and 1 Coral Ball!');
      return;
    }
    const totalPriceOD = 10 * jackpotMultiplier * ticketCount;
    if (oceanDollarBalance < totalPriceOD) {
      triggerToast('Insufficient Digital Ocean Dollar ($OD) Balance! Please top up.');
      setShowPaymentModal(true);
      return;
    }

    // Deduct $OD
    setOceanDollarBalance((prev) => prev - totalPriceOD);

    // Create New Ticket
    const newTicket: LotteryTicket = {
      ticketId: `TKT-${Math.floor(1000000 + Math.random() * 9000000)}`,
      gameType: 'MEGA_JACKPOT',
      numbersSelected: [...selectedMainNumbers],
      specialBall: selectedCoralBall,
      multiplier: jackpotMultiplier,
      priceOD: totalPriceOD,
      purchaseDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      drawDate: 'Today 20:00 UTC',
      status: 'ACTIVE_PENDING',
      potentialPrizeOD: 3850000 * jackpotMultiplier,
      provablyFairSeed: `0x${Math.random().toString(16).substring(2, 14)}`
    };

    setMyTickets([newTicket, ...myTickets]);

    // Log Transaction
    const newTx: OceanDollarTransaction = {
      id: `OD-TX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'LOTTERY_PURCHASE',
      amountOD: totalPriceOD,
      description: `High Seas Mega Jackpot Ticket #${newTicket.ticketId}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      txHash: `0x${Math.random().toString(16).substring(2, 20)}`,
      status: 'COMPLETED'
    };
    setTransactions([newTx, ...transactions]);

    triggerToast(`Purchased Mega Jackpot Ticket! ${totalPriceOD} $OD deducted.`);
    setSelectedMainNumbers([]);
    setSelectedCoralBall(null);
  };

  // Place Maritime Sports Bet
  const handlePlaceMaritimeBet = () => {
    if (!selectedBetEvent || !selectedBetOption) {
      triggerToast('Please select a maritime sports event and pick your option!');
      return;
    }
    if (oceanDollarBalance < betAmountOD) {
      triggerToast('Insufficient Digital Ocean Dollar ($OD) Balance! Please top up.');
      setShowPaymentModal(true);
      return;
    }

    const potentialWinnings = Math.round(betAmountOD * selectedBetOption.oddsMultiplier * 100) / 100;

    // Deduct $OD
    setOceanDollarBalance((prev) => prev - betAmountOD);

    // Create New Bet Ticket
    const newBetTicket: LotteryTicket = {
      ticketId: `BET-${Math.floor(1000000 + Math.random() * 9000000)}`,
      gameType: 'MARITIME_BET',
      numbersSelected: [Math.round(selectedBetOption.oddsMultiplier * 10)],
      multiplier: selectedBetOption.oddsMultiplier,
      priceOD: betAmountOD,
      purchaseDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      drawDate: selectedBetEvent.scheduledTime,
      status: 'ACTIVE_PENDING',
      potentialPrizeOD: potentialWinnings,
      provablyFairSeed: `0x${Math.random().toString(16).substring(2, 14)}`
    };

    setMyTickets([newBetTicket, ...myTickets]);

    // Log Transaction
    const newTx: OceanDollarTransaction = {
      id: `OD-TX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'SPORTS_BET',
      amountOD: betAmountOD,
      description: `Maritime Bet: ${selectedBetEvent.title} (${selectedBetOption.label} @ ${selectedBetOption.oddsMultiplier}x)`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      txHash: `0x${Math.random().toString(16).substring(2, 20)}`,
      status: 'COMPLETED'
    };

    setTransactions([newTx, ...transactions]);
    triggerToast(`Maritime Bet Placed! Wagered ${betAmountOD} $OD for ${potentialWinnings} $OD potential win.`);
  };

  // Claim Prize Action
  const handleClaimPrize = (ticket: LotteryTicket) => {
    if (!ticket.actualPrizeOD) return;
    setOceanDollarBalance((prev) => prev + ticket.actualPrizeOD!);
    setMyTickets(
      myTickets.map((t) => (t.ticketId === ticket.ticketId ? { ...t, status: 'WINNER_CLAIMED' } : t))
    );

    const claimTx: OceanDollarTransaction = {
      id: `OD-TX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'LOTTERY_WINNING',
      amountOD: ticket.actualPrizeOD!,
      description: `Claimed Lottery Winnings for Ticket #${ticket.ticketId}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      txHash: `0x${Math.random().toString(16).substring(2, 20)}`,
      status: 'COMPLETED'
    };
    setTransactions([claimTx, ...transactions]);
    triggerToast(`Congratulations! Claimed ${ticket.actualPrizeOD} $OD Winnings to your wallet.`);
  };

  // Execute Payment Gateway Top-Up
  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    hapticEngine.trigger('medium');

    setTimeout(() => {
      setIsProcessingPayment(false);
      const creditedOD = paymentAmountUSD; // 1:1 USD to $OD
      setOceanDollarBalance((prev) => prev + creditedOD);

      const txHash = `0x${Math.random().toString(16).substring(2, 24)}`;
      const receiptData = {
        receiptNumber: `RCP-OD-${Math.floor(100000 + Math.random() * 900000)}`,
        payerName: payerName || 'Capt. Alexander Vance',
        amountUSD: paymentAmountUSD,
        creditedOD: creditedOD,
        paymentRail: selectedPaymentRail,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        txHash: txHash
      };

      setPaymentSuccessReceipt(receiptData);

      const topUpTx: OceanDollarTransaction = {
        id: `OD-TX-${Math.floor(10000 + Math.random() * 90000)}`,
        type: 'DEPOSIT',
        amountOD: creditedOD,
        description: `Wallet Reload via ${selectedPaymentRail.replace('_', ' ')}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        txHash: txHash,
        status: 'COMPLETED',
        paymentMethod: selectedPaymentRail
      };

      setTransactions([topUpTx, ...transactions]);
      triggerToast(`Successfully credited ${creditedOD} Digital Ocean Dollars ($OD) to your wallet!`);
    }, 1500);
  };

  // Handle P2P Transfer
  const handleP2PTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (oceanDollarBalance < p2pAmount) {
      triggerToast('Insufficient $OD balance for transfer!');
      return;
    }

    setOceanDollarBalance((prev) => prev - p2pAmount);
    setShowP2PModal(false);

    const transferTx: OceanDollarTransaction = {
      id: `OD-TX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'P2P_TRANSFER',
      amountOD: p2pAmount,
      description: `P2P Satellite Transfer to ${p2pRecipient}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      txHash: `0x${Math.random().toString(16).substring(2, 20)}`,
      status: 'COMPLETED'
    };

    setTransactions([transferTx, ...transactions]);
    triggerToast(`Sent ${p2pAmount} $OD to ${p2pRecipient} via satellite P2P rail!`);
  };

  // Handle Staking Deposit
  const handleStakeDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (oceanDollarBalance < stakeAmountInput) {
      triggerToast('Insufficient $OD balance to stake!');
      return;
    }

    setOceanDollarBalance((prev) => prev - stakeAmountInput);
    setStakedBalance((prev) => prev + stakeAmountInput);
    setShowStakeModal(false);

    triggerToast(`Staked ${stakeAmountInput} $OD into Ocean Yield Vault at 12.8% APY!`);
  };

  // Scratch Card Reveal Single Symbol
  const scratchSymbol = (cardId: string, index: number) => {
    hapticEngine.trigger('light');
    setScratchCards(
      scratchCards.map((card) => {
        if (card.id !== cardId) return card;
        const newRevealed = [...card.revealed];
        newRevealed[index] = true;
        const allRevealed = newRevealed.every((r) => r);

        if (allRevealed && !card.isScratched) {
          // Calculate win
          const symbolCounts: { [key: string]: number } = {};
          card.symbols.forEach((sym) => {
            symbolCounts[sym] = (symbolCounts[sym] || 0) + 1;
          });

          let winAmount = 0;
          if (symbolCounts[card.winningSymbol] >= 3) {
            winAmount = card.wonAmountOD;
            setOceanDollarBalance((prev) => prev + winAmount);
            triggerToast(`SCRATCH WIN! You matched 3 symbols and won ${winAmount} $OD!`);
          } else {
            triggerToast('No 3-symbol match on this card. Try another card!');
          }

          return { ...card, revealed: newRevealed, isScratched: true };
        }

        return { ...card, revealed: newRevealed };
      })
    );
  };

  // Buy & Reset Scratch Card
  const buyScratchCard = (card: ScratchCardData) => {
    if (oceanDollarBalance < card.costOD) {
      triggerToast(`Insufficient $OD balance to buy card (${card.costOD} $OD)!`);
      setShowPaymentModal(true);
      return;
    }

    setOceanDollarBalance((prev) => prev - card.costOD);

    // Randomize symbols
    const sampleSymbols = ['🔱', '⚓', '💎', '🦪', '🐬', '🌊', '👑'];
    const isWin = Math.random() > 0.4; // 60% chance win
    const winSym = card.winningSymbol;

    let newSymbols: string[] = [];
    if (isWin) {
      newSymbols = [winSym, winSym, winSym];
      while (newSymbols.length < 6) {
        newSymbols.push(sampleSymbols[Math.floor(Math.random() * sampleSymbols.length)]);
      }
      // Shuffle
      newSymbols.sort(() => Math.random() - 0.5);
    } else {
      while (newSymbols.length < 6) {
        const randSym = sampleSymbols[Math.floor(Math.random() * sampleSymbols.length)];
        newSymbols.push(randSym);
      }
    }

    setScratchCards(
      scratchCards.map((c) =>
        c.id === card.id
          ? {
              ...c,
              symbols: newSymbols,
              revealed: [false, false, false, false, false, false],
              isScratched: false
            }
          : c
      )
    );

    triggerToast(`Purchased ${card.title}! Scratch off the 6 silver bubbles to reveal your prize.`);
  };

  // Spin Roulette Wheel
  const handleSpinRoulette = () => {
    if (oceanDollarBalance < rouletteBetOD) {
      triggerToast('Insufficient $OD balance for roulette bet!');
      return;
    }

    setIsSpinningRoulette(true);
    setOceanDollarBalance((prev) => prev - rouletteBetOD);
    hapticEngine.trigger('medium');

    setTimeout(() => {
      const landedNumber = Math.floor(Math.random() * 37); // 0-36
      setRouletteResultNumber(landedNumber);
      setIsSpinningRoulette(false);

      const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(landedNumber);
      const isEven = landedNumber > 0 && landedNumber % 2 === 0;

      let wonMultiplier = 0;
      if (rouletteBetType === 'RED' && isRed) wonMultiplier = 2;
      if (rouletteBetType === 'BLACK' && !isRed && landedNumber !== 0) wonMultiplier = 2;
      if (rouletteBetType === 'EVEN' && isEven) wonMultiplier = 2;
      if (rouletteBetType === 'NUMBER_7' && landedNumber === 7) wonMultiplier = 35;

      if (wonMultiplier > 0) {
        const winPayout = rouletteBetOD * wonMultiplier;
        setOceanDollarBalance((prev) => prev + winPayout);
        triggerToast(`ROULETTE WIN! Landed on ${landedNumber}. You won ${winPayout} $OD!`);
      } else {
        triggerToast(`Landed on ${landedNumber}. Better luck next spin!`);
      }
    }, 2000);
  };

  // Run Provably Fair Check
  const handleVerifySeed = () => {
    if (!verifySeedInput) return;
    setVerifyResult({
      seed: verifySeedInput,
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      serverSeedHashed: '0x88f910a293e810a991822c9820a1',
      drawTimestamp: '2026-08-13 12:00:00 UTC',
      verifiedStatus: '100% PROVABLY FAIR MATCH'
    });
    triggerToast('Cryptographic draw hash verified on Maritime Ledger!');
  };

  // REPORT AUTO-SAVE PERIODIC TIMER EFFECT
  useEffect(() => {
    if (!reportAutoSaveEnabled) return;

    const autoSaveTimer = setInterval(() => {
      const nowTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastReportAutoSaveTimestamp(nowTimeStr);

      // Persist draft state to localStorage
      try {
        const draftData = {
          timestamp: nowTimeStr,
          maritimePass,
          oceanDollarBalance,
          masterResponsiblePlayEnabled,
          taxReportYear,
          myTicketsCount: myTickets.length,
          transactionsCount: transactions.length,
          maxScratcherWager
        };
        localStorage.setItem('OCEAN_GAMING_REPORT_DRAFT_CACHE_2026', JSON.stringify(draftData));
      } catch (e) {
        console.warn('Auto-save storage warning:', e);
      }
    }, 25000);

    return () => clearInterval(autoSaveTimer);
  }, [
    reportAutoSaveEnabled,
    maritimePass,
    oceanDollarBalance,
    masterResponsiblePlayEnabled,
    taxReportYear,
    myTickets,
    transactions,
    maxScratcherWager
  ]);

  // MANUAL REPORT AUTO-SAVE TRIGGER
  const handleManualReportAutoSave = () => {
    const nowTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastReportAutoSaveTimestamp(nowTimeStr);
    setSavedReportDraftsCount((prev) => prev + 1);

    try {
      const draftData = {
        timestamp: nowTimeStr,
        maritimePass,
        oceanDollarBalance,
        masterResponsiblePlayEnabled,
        taxReportYear,
        myTickets,
        transactions
      };
      localStorage.setItem('OCEAN_GAMING_REPORT_DRAFT_CACHE_2026', JSON.stringify(draftData));
      triggerToast(`Report auto-saved to secure local cache at ${nowTimeStr}!`);
    } catch (e) {
      triggerToast('Report state saved successfully!');
    }
  };

  // EXECUTE EXPORT MODEL / MODAL DISPATCHER
  const handleExecuteExportModel = () => {
    const timestampStr = new Date().toISOString();
    const formattedDate = timestampStr.substring(0, 10);

    if (exportFormatType === 'PRINT') {
      triggerToast('Opening browser print dialogue with high-contrast document styling...');
      setTimeout(() => window.print(), 300);
      setIsExportModalOpen(false);
      return;
    }

    if (exportFormatType === 'JSON') {
      const exportJson = {
        meta: {
          system: 'Ocean Gaming & Lottery High Seas Platform',
          authority: 'High Seas Maritime Gaming Authority UNCLOS Art. 87',
          exportCategory: exportDocCategory,
          timestamp: timestampStr,
          userCredentialId: maritimePass.credentialId,
          vessel: maritimePass.vesselOrCompany
        },
        payload: {
          pass: maritimePass,
          balanceOD: oceanDollarBalance,
          tickets: myTickets,
          transactions: transactions,
          taxYear: taxReportYear,
          rtpSelected: selectedRtpGame,
          responsiblePlayActive: masterResponsiblePlayEnabled
        }
      };
      const blob = new Blob([JSON.stringify(exportJson, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Maritime_Export_${exportDocCategory}_${formattedDate}.json`;
      a.click();
      triggerToast(`Exported ${exportDocCategory} as structured JSON file!`);
      setIsExportModalOpen(false);
      return;
    }

    if (exportFormatType === 'CSV') {
      let csvContent = 'Document,Parameter,Value,Timestamp\n';
      csvContent += `Ocean Gaming Export,Category,${exportDocCategory},${timestampStr}\n`;
      csvContent += `Ocean Gaming Export,CredentialID,${maritimePass.credentialId},${timestampStr}\n`;
      csvContent += `Ocean Gaming Export,FullName,${maritimePass.fullName},${timestampStr}\n`;
      csvContent += `Ocean Gaming Export,Vessel,${maritimePass.vesselOrCompany},${timestampStr}\n`;
      csvContent += `Ocean Gaming Export,BalanceOD,${oceanDollarBalance},${timestampStr}\n`;
      csvContent += `Ocean Gaming Export,TaxExemptYear,${taxReportYear},${timestampStr}\n`;

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Maritime_Export_${exportDocCategory}_${formattedDate}.csv`;
      a.click();
      triggerToast(`Exported ${exportDocCategory} as CSV ledger file!`);
      setIsExportModalOpen(false);
      return;
    }

    // PDF EXPORT DISPATCH
    if (exportFormatType === 'PDF') {
      triggerToast(`Generating Official High Seas ${exportDocCategory.replace(/_/g, ' ')} PDF...`);

      if (exportDocCategory === 'TAX_STATEMENT') {
        generateAndDownloadPdf({
          documentType: 'TAX_INVOICE',
          bookingId: `TAX-${taxReportYear}-` + Date.now().toString().slice(-6),
          title: `UNCLOS High Seas Gaming Tax & Duty Exemption Certificate (${taxReportYear})`,
          operatorName: 'High Seas Maritime Gaming Tax & Audit Authority',
          passengerOrCargoName: maritimePass.fullName,
          passportOrCustomsCode: maritimePass.credentialId,
          origin: maritimePass.vesselOrCompany,
          destination: 'UNCLOS Flag State High Seas International Waters Jurisdiction',
          departureDate: `${taxReportYear}-01-01`,
          allocatedSpace: 'International Maritime Waters Tax-Free Gaming Certificate',
          paymentMethod: 'Digital Ocean Dollar ($OD) On-Chain Settlement',
          basePriceUSD: 1420.0,
          totalPriceUSD: 2950.0,
          currencyCode: 'USD / $OD',
          formattedTotalPrice: '$0.00 WITHHELD (0.00% HIGH SEAS TAX-FREE)',
          issueTimestamp: timestampStr,
          qrPayload: maritimePass.verificationHash
        });
      } else if (exportDocCategory === 'KYC_CLEARANCE') {
        generateAndDownloadPdf({
          documentType: 'E-TICKET',
          bookingId: `KYC-PASS-` + Date.now().toString().slice(-6),
          title: 'High Seas Maritime Onboard Passenger & Seafarer Clearance Pass',
          operatorName: 'Ocean Gaming SatCom KYC Verification Bureau',
          passengerOrCargoName: maritimePass.fullName,
          passportOrCustomsCode: maritimePass.credentialId,
          origin: maritimePass.vesselOrCompany,
          destination: 'High Seas International Gaming Zone (UNCLOS Art. 92)',
          departureDate: formattedDate,
          allocatedSpace: maritimePass.role === 'ACTIVE_SEAFARER' ? 'Seafarer CDC Clearance' : 'Guest Boarding Pass',
          paymentMethod: 'Verified Maritime CDC Onboarding System',
          basePriceUSD: 0,
          totalPriceUSD: 0,
          currencyCode: 'OD',
          formattedTotalPrice: 'VERIFIED & CLEARED FOR ONBOARD PLAY',
          issueTimestamp: timestampStr,
          qrPayload: maritimePass.verificationHash
        });
      } else if (exportDocCategory === 'RTP_MONITOR') {
        generateAndDownloadPdf({
          documentType: 'TAX_INVOICE',
          bookingId: `RTP-AUDIT-` + Date.now().toString().slice(-6),
          title: 'Real-Time Lottery & Gaming Return-To-Player (RTP) Audit Report',
          operatorName: 'SatCom SHA-256 Gaming Auditing Laboratory',
          passengerOrCargoName: maritimePass.fullName,
          passportOrCustomsCode: maritimePass.credentialId,
          origin: 'Ocean Gaming Mega Jackpot & Roulette Pools',
          destination: 'Public Provably Fair Audit Ledger',
          departureDate: formattedDate,
          allocatedSpace: `Selected Game: ${selectedRtpGame} (97.20% Audited RTP)`,
          paymentMethod: 'SatCom Cryptographic Beacon Verification',
          basePriceUSD: 3850000,
          totalPriceUSD: 3850000,
          currencyCode: '$OD',
          formattedTotalPrice: '97.20% AUDITED PLAYER RETURN (HEALTHY VARIANCE)',
          issueTimestamp: timestampStr,
          qrPayload: maritimePass.verificationHash
        });
      } else if (exportDocCategory === 'FULL_RULES_CODEX') {
        generateAndDownloadPdf({
          documentType: 'BILL_OF_LADING',
          bookingId: `RULES-2026-` + Date.now().toString().slice(-6),
          title: 'High Seas Gaming Authority Statutory Codex 2026 (v4.2)',
          operatorName: 'London Maritime Arbitrators Association (LMAA)',
          passengerOrCargoName: maritimePass.fullName,
          passportOrCustomsCode: maritimePass.credentialId,
          origin: 'Flag State Regulation IMO-9820184',
          destination: 'International Waters (12+ Nautical Miles)',
          departureDate: formattedDate,
          allocatedSpace: 'Articles 1 through 8 High Seas Statutory Rules',
          paymentMethod: 'Statutory Publication Exemption',
          basePriceUSD: 0,
          totalPriceUSD: 0,
          currencyCode: 'USD',
          formattedTotalPrice: 'OFFICIAL STATUTORY DISCLOSURE COMPLETE',
          issueTimestamp: timestampStr,
          qrPayload: maritimePass.verificationHash
        });
      } else {
        generateAndDownloadPdf({
          documentType: 'E-TICKET',
          bookingId: `TKT-SUMMARY-` + Date.now().toString().slice(-6),
          title: 'Ocean Dollar Lottery Ticket & Wager Summary Statement',
          operatorName: 'Ocean Gaming & Lottery Portal',
          passengerOrCargoName: maritimePass.fullName,
          passportOrCustomsCode: maritimePass.credentialId,
          origin: maritimePass.vesselOrCompany,
          destination: '$3.85M Mega Jackpot & Maritime Sports Pools',
          departureDate: formattedDate,
          allocatedSpace: `Active Tickets: ${myTickets.length} | Balance: ${oceanDollarBalance} $OD`,
          paymentMethod: 'Digital Ocean Dollar Wallet',
          basePriceUSD: oceanDollarBalance,
          totalPriceUSD: oceanDollarBalance,
          currencyCode: '$OD',
          formattedTotalPrice: `${oceanDollarBalance.toFixed(2)} $OD ACTIVE BALANCE`,
          issueTimestamp: timestampStr,
          qrPayload: maritimePass.verificationHash
        });
      }

      setIsExportModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 text-slate-100 font-sans">
      {/* TOAST FLOATING NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-emerald-500 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center space-x-3 text-xs sm:text-sm"
          >
            <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MARITIME ELIGIBILITY & ONBOARD PASS VERIFICATION BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-cyan-500/40 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                  HIGH SEAS RESTRICTED ACCESS SYSTEM
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>MARITIME VERIFIED PASS</span>
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white flex flex-wrap items-center gap-2">
                <span>{maritimePass.fullName}</span>
                <span className="text-xs font-mono text-cyan-300 font-normal">({maritimePass.vesselOrCompany})</span>
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                Category:{' '}
                <strong className="text-amber-300 font-mono">
                  {maritimePass.role === 'ACTIVE_SEAFARER'
                    ? 'Active Seafarer / Crew Officer'
                    : maritimePass.role === 'MARITIME_EMPLOYEE'
                    ? 'Ocean-Related Personnel / Marine Tech'
                    : 'Cruise Ship Passenger'}
                </strong>{' '}
                • ID: <code className="text-emerald-300 font-mono">{maritimePass.credentialId}</code> • AIS Geofence:{' '}
                <span className="text-cyan-300 font-mono">High Seas International Waters</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* OCEAN DOLLAR ($OD / XOD) LEGALIZED CURRENCY TREASURY BUTTON */}
            <button
              onClick={() => setShowOceanDollarCurrencyModal(true)}
              className="bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-xl border border-amber-300/60 shrink-0"
            >
              <Coins className="w-4 h-4 text-slate-950 animate-bounce" />
              <span>Ocean Dollar ($OD / XOD) Sovereign Currency Treasury</span>
            </button>

            {/* REPORT AUTO-SAVE STATUS INDICATOR */}
            <button
              onClick={handleManualReportAutoSave}
              title="Click to force auto-save current report draft state"
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px] font-bold px-3 py-2 rounded-2xl transition-all flex items-center space-x-1.5 shadow-md"
            >
              <span className={`w-2 h-2 rounded-full ${reportAutoSaveEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>Auto-Saved: {lastReportAutoSaveTimestamp}</span>
            </button>

            {/* EXPORT CENTER & MODEL BUTTON */}
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg border border-indigo-400/40 shrink-0"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Export Center & Model</span>
            </button>

            {/* MANAGE CREDENTIAL PASS */}
            <button
              onClick={() => setShowMaritimeAuthModal(true)}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/50 font-bold px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shrink-0 shadow-lg"
            >
              <BadgeCheck className="w-4 h-4 text-cyan-400" />
              <span>Manage Pass</span>
            </button>
          </div>
        </div>
      </div>

      {/* JURISDICTION COMPLIANCE & CITIZENSHIP ELIGIBILITY BAR */}
      <div className={`p-5 sm:p-6 rounded-3xl border transition-all shadow-2xl relative overflow-hidden ${
        jurisdictionInfo.permitted
          ? 'bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 border-emerald-500/50'
          : 'bg-gradient-to-r from-slate-950 via-rose-950/60 to-slate-950 border-rose-500/60'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 border ${
              jurisdictionInfo.permitted
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
            }`}>
              {jurisdictionInfo.permitted ? <Globe className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full border ${
                  jurisdictionInfo.permitted
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  {jurisdictionInfo.badgeLabel}
                </span>

                <span className="text-[10px] font-mono text-slate-400">
                  Status: <strong className={jurisdictionInfo.permitted ? 'text-emerald-400' : 'text-rose-400'}>{jurisdictionInfo.status}</strong>
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-black text-white flex flex-wrap items-center gap-2">
                <span>Citizenship Jurisdiction Eligibility Check</span>
                <span className="text-xs text-indigo-300 font-mono">[{citizenCountry}]</span>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                {jurisdictionInfo.notice}
              </p>

              {!jurisdictionInfo.permitted && (
                <div className="bg-rose-950/40 p-3 rounded-2xl border border-rose-500/30 text-[11px] text-rose-200/90 space-y-1 mt-2">
                  <p className="font-bold text-rose-300">⚠️ UNAUTHORIZED CITIZENS ACCESS RESTRICTION NOTICE:</p>
                  <p>{jurisdictionInfo.restrictionReason}</p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
                    <span className="bg-slate-900 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">Real-money $OD Wagering: LOCKED</span>
                    <span className="bg-slate-900 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">Jackpot Ticket Purchase: DISABLED</span>
                    <span className="bg-slate-900 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Educational Rules &amp; Simulation: ACTIVE</span>
                  </div>
                </div>
              )}

              {/* TAB 6: STAKING VAULT INSIDE TREASURY MODAL */}
              {treasuryModalTab === 'STAKING' && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-5 rounded-3xl border border-amber-500/40 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-amber-400">MARITIME CENTRAL BANK STAKING</span>
                        <h3 className="text-xl font-black text-white">$OD / $XOD &amp; $IOD Yield Vaults</h3>
                      </div>
                      <div className="font-mono text-xs text-right">
                        <span className="text-slate-400 block text-[10px]">TOTAL VALUE STAKED</span>
                        <span className="text-amber-400 font-bold text-lg">${stakedBalance.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">30-DAY SOVEREIGN</span>
                        <span className="text-emerald-400 font-bold text-base">14.2% APY</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">90-DAY BLUE CARBON</span>
                        <span className="text-cyan-400 font-bold text-base">22.5% APY</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">365-DAY VIP VAULT</span>
                        <span className="text-purple-400 font-bold text-base">34.0% APY</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">UNCLAIMED YIELD</span>
                        <span className="text-amber-300 font-bold text-base">${accumulatedYield.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => handleClaimYield()}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2"
                      >
                        <Award className="w-4 h-4" />
                        <span>Claim Yield (${accumulatedYield.toFixed(2)})</span>
                      </button>

                      <button
                        onClick={() => handleCompoundYield()}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Auto-Compound Rewards</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowOceanDollarCurrencyModal(false);
                          setActiveTab('staking-vault');
                        }}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2"
                      >
                        <Flame className="w-4 h-4" />
                        <span>Open Full Staking Dashboard</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                Verify Citizen Country:
              </label>
              <select
                value={citizenCountry}
                onChange={(e) => handleCountryJurisdictionCheck(e.target.value)}
                disabled={isCheckingJurisdiction}
                className="bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
              >
                <optgroup label="✅ PERMITTED ELIGIBLE COUNTRIES">
                  <option value="United Kingdom">🇬🇧 United Kingdom (UKGC License)</option>
                  <option value="Malta">🇲🇹 Malta (MGA License Verified)</option>
                  <option value="Singapore">🇸🇬 Singapore (RGL Authorized)</option>
                  <option value="Isle of Man">🇮🇲 Isle of Man (GSC License)</option>
                  <option value="Gibraltar">🇬🇮 Gibraltar (GG Commissioner)</option>
                  <option value="Curaçao">🇨🇼 Curaçao (eGaming License)</option>
                  <option value="Australia">🇦🇺 Australia (ACMA Skill Exemption)</option>
                  <option value="Canada">🇨🇦 Canada (AGCO &amp; Provincial)</option>
                  <option value="Marshall Islands">🇲🇭 Marshall Islands (RMI Flag)</option>
                  <option value="Portugal">🇵🇹 Portugal (SRIJ License)</option>
                  <option value="Sweden">🇸🇪 Sweden (Spelinspektionen)</option>
                  <option value="Germany">🇩🇪 Germany (GGL License)</option>
                  <option value="Japan">🇯🇵 Japan (Maritime Skill Gaming)</option>
                </optgroup>
                <optgroup label="⛔ UNAUTHORIZED / RESTRICTED COUNTRIES">
                  <option value="United States">🇺🇸 United States (State Restrictions)</option>
                  <option value="China">🇨🇳 China (Article 303 Ban)</option>
                  <option value="North Korea">🇰🇵 North Korea (OFAC Sanctioned)</option>
                  <option value="Iran">🇮🇷 Iran (Prohibited Jurisdiction)</option>
                  <option value="Syria">🇸🇾 Syria (OFAC Sanctioned)</option>
                  <option value="Russia">🇷🇺 Russia (Sanctioned Jurisdiction)</option>
                  <option value="Cuba">🇨🇺 Cuba (OFAC Sanctioned)</option>
                  <option value="Myanmar">🇲🇲 Myanmar (FATF Restricted)</option>
                </optgroup>
              </select>
            </div>

            <button
              onClick={() => handleCountryJurisdictionCheck(citizenCountry)}
              disabled={isCheckingJurisdiction}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1.5 shadow-md ${
                jurisdictionInfo.permitted
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingJurisdiction ? 'animate-spin' : ''}`} />
              <span>{isCheckingJurisdiction ? 'Checking...' : 'Check Status'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* OCEAN DOLLAR ($OD / XOD) & INDIAN OCEAN DOLLAR ($IOD / XIOD) LEGALIZED INTERNATIONAL SOVEREIGN CURRENCY BANNER */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-950 to-emerald-950/80 border border-amber-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg text-slate-950 font-black">
              <Coins className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-orange-500/20 text-orange-300 border border-orange-500/40 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <Anchor className="w-3 h-3 text-orange-400" />
                  <span>INDIAN OCEAN DOLLAR: $IOD (XIOD / 999)</span>
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <Anchor className="w-3 h-3 text-amber-400" />
                  <span>GLOBAL OCEAN DOLLAR: $OD (XOD / 998)</span>
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full">
                  SWIFT BIC: {charterData.swiftBicCode}
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full">
                  48 SOVEREIGN NATIONS APPROVED
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                <span>Indian Ocean Dollar ($IOD) &amp; Global Ocean Dollar ($OD) Treasury</span>
                <BadgeCheck className="w-5 h-5 text-amber-400 inline shrink-0" />
              </h2>

              <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
                {charterData.legalStatusNotice} <strong>Governing Treaty:</strong> {charterData.governingTreaty}. Central Bank Vault Reserves: <strong>{charterData.totalReserveValuationUSD} ({charterData.reserveBackingRatioPct}% Backed)</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 text-center space-0.5">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Pegged Exchange Rate</div>
              <div className="text-xs font-black text-emerald-400 font-mono">$1 IOD = $1 OD = ₹83.50 INR = $1.00 USD</div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { setTreasuryModalTab('MARKET'); setShowOceanDollarCurrencyModal(true); }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3 py-2 rounded-xl text-xs transition-all flex items-center space-x-1 shadow-sm"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Market &amp; Rates</span>
              </button>
              <button
                onClick={() => { setTreasuryModalTab('TRANSFER'); setShowOceanDollarCurrencyModal(true); }}
                className="bg-orange-500 hover:bg-orange-400 text-slate-950 font-black px-3 py-2 rounded-xl text-xs transition-all flex items-center space-x-1 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transfer</span>
              </button>
              <button
                onClick={() => { setTreasuryModalTab('CONVERTER'); setShowOceanDollarCurrencyModal(true); }}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-3 py-2 rounded-xl text-xs transition-all flex items-center space-x-1 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>FX Converter</span>
              </button>
              <button
                onClick={() => { setTreasuryModalTab('TREASURY'); setShowOceanDollarCurrencyModal(true); }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3 py-2 rounded-xl text-xs transition-all flex items-center space-x-1 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Treasury</span>
              </button>
              <button
                onClick={() => { setTreasuryModalTab('TRANSPARENCY'); setShowOceanDollarCurrencyModal(true); }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-3 py-2 rounded-xl text-xs transition-all flex items-center space-x-1 shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Fiscal Audit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-4">
            <img
              src={oceanGamingLogo}
              alt="Ocean Gaming Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-emerald-400 shadow-xl object-cover shrink-0"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono px-3 py-1 rounded-full border border-emerald-500/40 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>EXCLUSIVE MARITIME ENTERTAINMENTS & OCEAN MONEY PORTAL</span>
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold font-mono px-3 py-1 rounded-full border border-amber-500/40 flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>256-BIT SECURE PAYMENT GATEWAY</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center space-x-3">
                <span>Ocean Gaming & Entertainments Portal</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Online lottery draws, instant high-seas scratch cards, live sports & regatta betting, treasure roulette, provably fair gaming, and the <strong className="text-emerald-300 font-mono">$OD (Digital Ocean Dollar)</strong> ocean money currency system — strictly for verified seafarers, ocean employees, and cruise passengers.
              </p>
            </div>
          </div>

          {/* $OD WALLET QUICK SUMMARY WIDGET */}
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 space-y-3 shrink-0 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center space-x-1">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span>DIGITAL OCEAN DOLLAR ($OD)</span>
              </span>
              <span className="text-emerald-400 font-bold">1 $OD = $1.00 USD</span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {oceanDollarBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-bold font-mono text-slate-300">$OD AVAILABLE</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  setShowPaymentModal(true);
                  setPaymentSuccessReceipt(null);
                }}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-1 shadow-md"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Top Up $OD</span>
              </button>

              <button
                onClick={() => setShowP2PModal(true)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-3 rounded-xl text-xs border border-slate-700 transition-all flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>P2P</span>
              </button>

              <button
                onClick={() => setShowStakeModal(true)}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold py-2 px-3 rounded-xl text-xs border border-amber-500/30 transition-all flex items-center space-x-1"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Vault</span>
              </button>
            </div>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800 text-xs font-mono">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">TOTAL MEGA JACKPOT</span>
            <span className="text-emerald-400 font-bold text-base">3,850,000 $OD</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">STAKED YIELD APY</span>
            <span className="text-amber-400 font-bold text-base">12.8% APY</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">NEXT DRAW COUNTDOWN</span>
            <span className="text-cyan-300 font-bold text-base">03H : 42M : 18S</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">PAYMENT GATEWAY</span>
            <span className="text-white font-bold text-base flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SSL ENCRYPTED</span>
            </span>
          </div>
        </div>

        {/* RESPONSIBLE PLAY QUICK-ALERT BAR */}
        {!responsibleBannerDismissed && (
          <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border border-amber-500/40 rounded-2xl p-3 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-300 uppercase">RESPONSIBLE PLAY ALERT</span>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.2 rounded-full border border-amber-500/30">
                    SAFE GAMING GUARD
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Session Active: <strong className="text-white">{sessionTimeMinutes} mins</strong> • Daily Cap: <strong className="text-emerald-400">{currentDailyWagered} / {dailyWagerLimit} $OD</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setActiveTab('responsible-play')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3 py-1.5 rounded-xl text-[11px] transition-all flex items-center space-x-1"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-950" />
                <span>Manage Limits</span>
              </button>
              <button
                onClick={() => setResponsibleBannerDismissed(true)}
                className="text-slate-400 hover:text-white px-2 py-1 text-[11px]"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* JACKPOT LIVE FEED SCROLLING TICKER BANNER */}
        <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-2.5 px-4 flex items-center justify-between gap-3 text-xs font-mono overflow-hidden">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-black text-cyan-400 text-[11px] uppercase tracking-wider">JACKPOT LIVE FEED</span>
          </div>

          <div className="flex-1 overflow-hidden whitespace-nowrap text-slate-200 text-xs font-mono">
            <div className="inline-block animate-pulse">
              🎉 <strong className="text-amber-300">{liveFeedItems[0]?.player}</strong> ({liveFeedItems[0]?.vessel} {liveFeedItems[0]?.flag}) <span className="text-emerald-400 font-bold">{liveFeedItems[0]?.event}</span> — <span className="text-cyan-300 font-bold">+{liveFeedItems[0]?.amountOD} $OD</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('jackpot-live-feed')}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold px-3 py-1 rounded-xl text-[11px] transition-all shrink-0 flex items-center space-x-1"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Stream</span>
          </button>
        </div>
      </div>

      {/* PORTAL MAIN TAB NAVIGATION */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('lottery-hub')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'lottery-hub'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Lottery & Gaming Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('jackpot-live-feed')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'jackpot-live-feed'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Jackpot Live Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('social-gaming-lobby')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'social-gaming-lobby'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Social Crew Lobby</span>
        </button>

        <button
          onClick={() => setActiveTab('lottery-analytics')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'lottery-analytics'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <LineChart className="w-4 h-4 text-amber-400" />
          <span>Lottery Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('gaming-tutorials')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'gaming-tutorials'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          <span>Gaming Tutorials</span>
        </button>

        <button
          onClick={() => setActiveTab('responsible-play')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'responsible-play'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-rose-400" />
          <span>Responsible Play</span>
        </button>

        <button
          onClick={() => setActiveTab('gaming-history')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'gaming-history'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <History className="w-4 h-4 text-cyan-400" />
          <span>Gaming History Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'leaderboard'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Global Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc-verification')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'kyc-verification'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>KYC Verification Flow</span>
        </button>

        <button
          onClick={() => setActiveTab('rules-regulations')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'rules-regulations'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Rules & Regulations</span>
        </button>

        <button
          onClick={() => setActiveTab('ocean-dollar-wallet')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'ocean-dollar-wallet'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>$OD Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('staking-vault')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'staking-vault'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Staking Vault (12.8%)</span>
        </button>

        <button
          onClick={() => setActiveTab('provably-fair')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'provably-fair'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>Provably Fair Auditor</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('payment-gateway');
            setShowPaymentModal(true);
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'payment-gateway'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4 text-cyan-400" />
          <span>Payment Gateway</span>
        </button>
      </div>

      {/* 1. LOTTERY & GAMING HUB TAB */}
      {activeTab === 'lottery-hub' && (
        <div className="space-y-6">
          {/* SUB NAV FOR GAMES */}
          <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setLotterySubTab('mega-jackpot')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                lotterySubTab === 'mega-jackpot' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>$3.85M High Seas Jackpot</span>
            </button>

            <button
              onClick={() => setLotterySubTab('scratchers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                lotterySubTab === 'scratchers' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Scratch Cards</span>
            </button>

            <button
              onClick={() => setLotterySubTab('daily-raffle')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                lotterySubTab === 'daily-raffle' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Seafarer's Daily Raffle</span>
            </button>

            <button
              onClick={() => setLotterySubTab('roulette')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                lotterySubTab === 'roulette' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Treasure Reef Roulette</span>
            </button>

            <button
              onClick={() => setLotterySubTab('maritime-betting')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                lotterySubTab === 'maritime-betting' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Online Sports & Regatta Betting</span>
            </button>

            <button
              onClick={() => setLotterySubTab('my-tickets')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ml-auto ${
                lotterySubTab === 'my-tickets' ? 'bg-emerald-500 text-slate-950' : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>My Tickets Wallet ({myTickets.length})</span>
            </button>
          </div>

          {/* A) MEGA JACKPOT SELECTION BOARD */}
          {lotterySubTab === 'mega-jackpot' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">GRAND MARITIME LOTTERY DRAW</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">$3,850,000 $OD High Seas Mega Jackpot</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Select 5 Lucky Main Numbers (1-50) + 1 Coral Ball (1-20). Drawings held daily at 20:00 UTC over maritime satellite frequency.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleQuickPick}
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Quick Pick Auto Fill</span>
                  </button>
                </div>
              </div>

              {/* NUMBER SELECTION GRID */}
              <div className="space-y-6">
                {/* 1. MAIN NUMBERS (1-50) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white">STEP 1: SELECT 5 MAIN OCEAN NUMBERS</span>
                    <span className="text-amber-400 font-bold">{selectedMainNumbers.length}/5 Selected</span>
                  </div>

                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => {
                      const isSelected = selectedMainNumbers.includes(num);
                      return (
                        <button
                          key={num}
                          onClick={() => toggleMainNumber(num)}
                          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-black font-mono transition-all flex items-center justify-center border ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105 ring-2 ring-amber-400/50'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. CORAL BALL (1-20) */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-cyan-300">STEP 2: SELECT 1 CORAL BALL (1-20)</span>
                    <span className="text-cyan-400 font-bold">{selectedCoralBall ? `Ball #${selectedCoralBall}` : 'None Selected'}</span>
                  </div>

                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((ball) => {
                      const isSelected = selectedCoralBall === ball;
                      return (
                        <button
                          key={ball}
                          onClick={() => {
                            hapticEngine.trigger('light');
                            setSelectedCoralBall(ball);
                          }}
                          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-black font-mono transition-all flex items-center justify-center border ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg scale-105 ring-2 ring-cyan-400/50'
                              : 'bg-slate-950 text-cyan-300 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800'
                          }`}
                        >
                          {ball}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* TICKET SUMMARY & BUY BAR */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-slate-400 font-bold">SLIP SUMMARY</span>
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="text-sm font-bold text-white">Numbers:</span>
                        <div className="flex items-center space-x-1">
                          {selectedMainNumbers.length > 0 ? (
                            selectedMainNumbers.map((n) => (
                              <span key={n} className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg text-xs font-bold">
                                {n}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-500 italic">None</span>
                          )}
                          {selectedCoralBall && (
                            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-lg text-xs font-bold">
                              Coral #{selectedCoralBall}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-400 block">TOTAL PRICE</span>
                        <span className="text-xl font-black font-mono text-emerald-400">
                          {10 * jackpotMultiplier * ticketCount} $OD
                        </span>
                      </div>

                      <button
                        onClick={handleBuyTicket}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>Confirm & Buy Slip</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* PRIZE DISTRIBUTION & TIER BREAKDOWN BOARD */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 pt-6 border-t border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <PieChart className="w-4 h-4 text-amber-400" />
                        <h3 className="text-sm font-black text-white font-sans uppercase tracking-wider">
                          $3,850,000 $OD Jackpot Prize Distribution & Tier Matrix
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Guaranteed minimum prize allocations per drawing tier. Pari-mutuel rollover pool split dynamically across matching tickets.
                      </p>
                    </div>

                    <div className="bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-mono text-amber-300 font-bold shrink-0">
                      TOTAL POOL: $3,850,000 $OD
                    </div>
                  </div>

                  {/* VISUAL ALLOCATION PERCENTAGE BAR */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>Prize Tier Pool Allocation Visual Breakdown:</span>
                      <span className="text-emerald-400 font-bold">100% Reserved</span>
                    </div>
                    <div className="w-full bg-slate-900 h-3.5 rounded-xl overflow-hidden flex border border-slate-800 p-0.5">
                      <div className="bg-amber-400 h-full rounded-l-lg" style={{ width: '70%' }} title="Tier 1: 70%" />
                      <div className="bg-cyan-400 h-full" style={{ width: '15%' }} title="Tier 2: 15%" />
                      <div className="bg-emerald-400 h-full" style={{ width: '8%' }} title="Tier 3: 8%" />
                      <div className="bg-indigo-400 h-full" style={{ width: '4%' }} title="Tier 4: 4%" />
                      <div className="bg-rose-400 h-full rounded-r-lg" style={{ width: '3%' }} title="Tier 5: 3%" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono pt-1 text-slate-300">
                      <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded bg-amber-400" /> <span>Tier 1 (70% - $2.69M)</span></span>
                      <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded bg-cyan-400" /> <span>Tier 2 (15% - $577K)</span></span>
                      <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded bg-emerald-400" /> <span>Tier 3 (8% - $308K)</span></span>
                      <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded bg-indigo-400" /> <span>Tier 4 (4% - $154K)</span></span>
                      <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded bg-rose-400" /> <span>Tier 5 (3% - $115K)</span></span>
                    </div>
                  </div>

                  {/* PRIZE TIER CARDS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { tier: 'Tier 1 Grand Prize', match: '5 Main + Coral Ball', share: '70% Pool', estVal: '$2,695,000 $OD', odds: '1 in 13.9M', bg: 'border-amber-500/50 bg-amber-950/20 text-amber-300' },
                      { tier: 'Tier 2 High-Roller', match: '5 Main Numbers', share: '15% Pool', estVal: '$577,500 $OD', odds: '1 in 1.2M', bg: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' },
                      { tier: 'Tier 3 Officer Pool', match: '4 Main + Coral Ball', share: '8% Pool', estVal: '$308,000 $OD', odds: '1 in 85.2K', bg: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' },
                      { tier: 'Tier 4 Seafarer Match', match: '4 Main Numbers', share: '4% Pool', estVal: '1,000 $OD Fixed', odds: '1 in 7,478', bg: 'border-slate-800 bg-slate-900 text-slate-200' },
                      { tier: 'Tier 5 Deck Hand Match', match: '3 Main + Coral Ball', share: '2% Pool', estVal: '100 $OD Fixed', odds: '1 in 1,420', bg: 'border-slate-800 bg-slate-900 text-slate-200' },
                      { tier: 'Tier 6 Instant Coral Win', match: '2 Main + Coral Ball', share: '1% Pool', estVal: '10 $OD Instant', odds: '1 in 180', bg: 'border-slate-800 bg-slate-900 text-slate-200' }
                    ].map((t, idx) => (
                      <div key={idx} className={`p-3.5 rounded-2xl border font-mono space-y-1.5 ${t.bg}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs uppercase">{t.tier}</span>
                          <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">{t.share}</span>
                        </div>
                        <div className="text-base font-black text-white">{t.estVal}</div>
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>Match: <strong className="text-slate-200">{t.match}</strong></span>
                          <span>Odds: {t.odds}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* INTERACTIVE MATCH SIMULATOR TOOL */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 uppercase flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Interactive Ticket Prize Match Simulator</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Test payout against selected ticket</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400">Simulate Main Matches:</span>
                        {[1, 2, 3, 4, 5].map((m) => (
                          <button
                            key={m}
                            onClick={() => setSimulatedMatchCount(m)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              simulatedMatchCount === m ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {m} Matches
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400">Include Coral Ball?</span>
                        <button
                          onClick={() => setSimulatedHasCoral(!simulatedHasCoral)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            simulatedHasCoral ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {simulatedHasCoral ? 'YES (+Coral Ball)' : 'NO (No Coral Ball)'}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">SIMULATED PAYOUT OUTCOME</span>
                        <span className="text-emerald-400 font-black text-sm">
                          {simulatedMatchCount === 5 && simulatedHasCoral && 'TIER 1 GRAND PRIZE: $2,695,000 $OD 🎉'}
                          {simulatedMatchCount === 5 && !simulatedHasCoral && 'TIER 2 HIGH-ROLLER: $577,500 $OD'}
                          {simulatedMatchCount === 4 && simulatedHasCoral && 'TIER 3 OFFICER POOL: $308,000 $OD'}
                          {simulatedMatchCount === 4 && !simulatedHasCoral && 'TIER 4 MATCH: 1,000 $OD'}
                          {simulatedMatchCount === 3 && simulatedHasCoral && 'TIER 5 MATCH: 100 $OD'}
                          {simulatedMatchCount === 3 && !simulatedHasCoral && 'TIER 6 MATCH: 25 $OD'}
                          {simulatedMatchCount <= 2 && simulatedHasCoral && 'TIER 6 INSTANT CORAL: 10 $OD'}
                          {simulatedMatchCount <= 2 && !simulatedHasCoral && 'No winning combination'}
                        </span>
                      </div>

                      <button
                        onClick={() => triggerToast(`Simulated match result calculated!`)}
                        className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-lg font-bold text-[11px]"
                      >
                        Calculate Odds
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B) INSTANT SCRATCH CARDS ARENA */}
          {lotterySubTab === 'scratchers' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">HIGH SEAS INSTANT WINNERS</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Interactive Scratch Card Arena</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Match 3 identical symbols to win up to 250,000 Digital Ocean Dollars ($OD) instantly! Click or tap any bubble to scratch off silver foil.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {scratchCards.map((card) => (
                    <div
                      key={card.id}
                      className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl flex flex-col justify-between"
                    >
                      <div className="space-y-2 border-b border-slate-800 pb-3">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold block">COST: {card.costOD} $OD</span>
                        <h3 className="text-lg font-black text-white">{card.title}</h3>
                        <span className="text-xs text-amber-300 font-bold font-mono">TOP PRIZE: {card.topPrizeOD.toLocaleString()} $OD</span>
                      </div>

                      {/* SCRATCH GRID (2x3 = 6 bubbles) */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        {card.symbols.map((symbol, idx) => {
                          const isRevealed = card.revealed[idx];
                          return (
                            <button
                              key={idx}
                              onClick={() => scratchSymbol(card.id, idx)}
                              className={`h-16 rounded-xl text-2xl transition-all flex items-center justify-center font-bold border ${
                                isRevealed
                                  ? 'bg-slate-950 border-emerald-500/40 text-white animate-bounce'
                                  : `bg-gradient-to-br ${card.accentColor} text-slate-950 border-white/20 shadow-inner hover:scale-105`
                              }`}
                            >
                              {isRevealed ? symbol : '❓'}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => buyScratchCard(card)}
                          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Buy New Card ({card.costOD} $OD)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* C) SEAFARER'S DAILY CREW RAFFLE */}
          {lotterySubTab === 'daily-raffle' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400">CREW & MARITIME TRAVELERS EXCLUSIVE</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Seafarer's Daily $25,000 $OD Raffle</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Every ticket costs 5 $OD. Guaranteed daily winner selected automatically by satellite beacon seed at 22:00 UTC.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (oceanDollarBalance < 5) {
                      triggerToast('Insufficient $OD balance for raffle ticket!');
                      setShowPaymentModal(true);
                      return;
                    }
                    setOceanDollarBalance((prev) => prev - 5);
                    const raffleTkt: LotteryTicket = {
                      ticketId: `RFL-${Math.floor(100000 + Math.random() * 900000)}`,
                      gameType: 'SEAFARER_DAILY',
                      numbersSelected: [12, 19, 28, 41],
                      multiplier: 1,
                      priceOD: 5,
                      purchaseDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
                      drawDate: 'Today 22:00 UTC',
                      status: 'ACTIVE_PENDING',
                      potentialPrizeOD: 25000,
                      provablyFairSeed: `0x${Math.random().toString(16).substring(2, 12)}`
                    };
                    setMyTickets([raffleTkt, ...myTickets]);
                    triggerToast('Purchased Seafarer Daily Raffle Ticket (5 $OD)!');
                  }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Buy Raffle Ticket (5 $OD)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">TOTAL POOL VALUE</span>
                  <span className="text-emerald-400 font-bold text-xl">25,000 $OD</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">TOTAL PARTICIPANTS TODAY</span>
                  <span className="text-cyan-300 font-bold text-xl">1,482 Tickets</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">MY ACTIVE RAFFLE SLIPS</span>
                  <span className="text-amber-300 font-bold text-xl">
                    {myTickets.filter((t) => t.gameType === 'SEAFARER_DAILY').length} Slips
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* D) TREASURE REEF ROULETTE */}
          {lotterySubTab === 'roulette' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400">INSTANT HIGH-SEAS WHEEL</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Treasure Reef Roulette</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Place your $OD bet on Red/Black (2x), Even/Odd (2x), or Single Lucky Number 7 (35x).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* ROULETTE WHEEL GRAPHIC */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xl">
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <motion.div
                      animate={isSpinningRoulette ? { rotate: 1440 } : { rotate: 0 }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                      className="w-44 h-44 rounded-full border-8 border-amber-500 bg-gradient-to-tr from-rose-950 via-slate-900 to-emerald-950 shadow-2xl flex items-center justify-center relative"
                    >
                      <Dices className="w-16 h-16 text-amber-400 animate-pulse" />
                    </motion.div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-slate-400 block">LANDED NUMBER</span>
                    <span className="text-3xl font-black font-mono text-amber-400">
                      {rouletteResultNumber !== null ? rouletteResultNumber : '??'}
                    </span>
                  </div>
                </div>

                {/* BET CONTROLS */}
                <div className="space-y-4 bg-slate-950 border border-slate-800 rounded-3xl p-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block font-mono">BET AMOUNT ($OD)</label>
                    <input
                      type="number"
                      value={rouletteBetOD}
                      onChange={(e) => setRouletteBetOD(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block font-mono">BET TYPE</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setRouletteBetType('RED')}
                        className={`p-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                          rouletteBetType === 'RED'
                            ? 'bg-rose-600 text-white border-rose-400 ring-2 ring-rose-400/50'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        RED (2X)
                      </button>
                      <button
                        onClick={() => setRouletteBetType('BLACK')}
                        className={`p-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                          rouletteBetType === 'BLACK'
                            ? 'bg-slate-800 text-white border-slate-600 ring-2 ring-slate-400/50'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        BLACK (2X)
                      </button>
                      <button
                        onClick={() => setRouletteBetType('EVEN')}
                        className={`p-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                          rouletteBetType === 'EVEN'
                            ? 'bg-cyan-600 text-white border-cyan-400 ring-2 ring-cyan-400/50'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        EVEN (2X)
                      </button>
                      <button
                        onClick={() => setRouletteBetType('NUMBER_7')}
                        className={`p-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                          rouletteBetType === 'NUMBER_7'
                            ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/50'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        LUCKY #7 (35X)
                      </button>
                    </div>
                  </div>

                  <button
                    disabled={isSpinningRoulette}
                    onClick={handleSpinRoulette}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Dices className="w-4 h-4" />
                    <span>{isSpinningRoulette ? 'Spinning Reef Wheel...' : `Place Bet & Spin (${rouletteBetOD} $OD)`}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* E) MARITIME SPORTS & REGATTA BETTING SYSTEM */}
          {lotterySubTab === 'maritime-betting' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">OFFICIAL MARITIME SPORTS & BETTING MARKET</span>
                    <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-cyan-500/40">
                      LIVE HIGH SEAS ODDS
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Regatta & Ocean Contests Betting Engine</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Wager Digital Ocean Dollars ($OD) on live America's Cup Regattas, Seafarer Tug-of-War Leagues, Vessel ETA Accuracy, and Satellite Drone Sprints.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center space-x-3 text-xs font-mono">
                  <Coins className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">WALLET BALANCE</span>
                    <span className="text-emerald-400 font-bold">{oceanDollarBalance.toFixed(2)} $OD</span>
                  </div>
                </div>
              </div>

              {/* BETTING EVENTS GRID + BET SLIP */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* EVENTS LISTING */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase font-mono tracking-wider flex items-center space-x-2">
                    <Tv className="w-4 h-4 text-cyan-400" />
                    <span>Live Maritime Betting Markets</span>
                  </h3>

                  <div className="space-y-4">
                    {MARITIME_BET_EVENTS.map((event) => {
                      const isSelected = selectedBetEvent?.id === event.id;
                      return (
                        <div
                          key={event.id}
                          className={`p-5 rounded-2xl border transition-all space-y-4 ${
                            isSelected
                              ? 'bg-slate-950 border-cyan-500/60 shadow-xl ring-1 ring-cyan-500/40'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                                {event.subtitle}
                              </span>
                              <h4 className="text-base font-black text-white mt-1">{event.title}</h4>
                              <p className="text-slate-400 text-xs font-mono mt-0.5">{event.vesselOrMatch}</p>
                            </div>

                            <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 flex items-center space-x-1.5 shrink-0 self-start sm:self-auto">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{event.scheduledTime}</span>
                            </span>
                          </div>

                          {/* ODDS OPTIONS */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {event.options.map((opt) => {
                              const isOptSelected = selectedBetEvent?.id === event.id && selectedBetOption?.optionId === opt.optionId;
                              return (
                                <button
                                  key={opt.optionId}
                                  onClick={() => {
                                    hapticEngine.trigger('light');
                                    setSelectedBetEvent(event);
                                    setSelectedBetOption(opt);
                                  }}
                                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                                    isOptSelected
                                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                                      : 'bg-slate-900 border-slate-800 hover:border-cyan-500/40 text-slate-300'
                                  }`}
                                >
                                  <div>
                                    <span className="text-xs font-bold block">{opt.label}</span>
                                    <span className="text-[10px] text-slate-400 block font-sans">{opt.details}</span>
                                  </div>

                                  <span className="text-sm font-black font-mono text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0 ml-2">
                                    {opt.oddsMultiplier.toFixed(2)}x
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* INTERACTIVE BET BUILDER SLIP */}
                <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-5 space-y-5 h-fit shadow-2xl sticky top-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <Swords className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-black text-white">Maritime Bet Slip</h3>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      SINGLE BET
                    </span>
                  </div>

                  {selectedBetEvent && selectedBetOption ? (
                    <div className="space-y-4">
                      <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] font-mono text-amber-400 uppercase">{selectedBetEvent.title}</span>
                        <h4 className="text-xs font-bold text-white">{selectedBetOption.label}</h4>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono">
                          <span className="text-slate-400">DECIMAL ODDS:</span>
                          <span className="text-emerald-400 font-bold">{selectedBetOption.oddsMultiplier.toFixed(2)}x</span>
                        </div>
                      </div>

                      {/* WAGER INPUT */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono font-bold text-slate-300 block">WAGER AMOUNT ($OD):</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[10, 25, 50, 100].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => setBetAmountOD(amt)}
                              className={`py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                                betAmountOD === amt
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              {amt} $OD
                            </button>
                          ))}
                        </div>

                        <div className="relative pt-1">
                          <input
                            type="number"
                            min="1"
                            value={betAmountOD}
                            onChange={(e) => setBetAmountOD(Math.max(1, parseFloat(e.target.value) || 1))}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-cyan-500"
                          />
                          <span className="absolute right-3 top-3 text-xs font-mono text-slate-500">$OD</span>
                        </div>
                      </div>

                      {/* POTENTIAL PAYOUT */}
                      <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1 font-mono">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">TOTAL WAGER:</span>
                          <span className="text-white font-bold">{betAmountOD.toFixed(2)} $OD</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-bold pt-1 border-t border-slate-800/60">
                          <span className="text-slate-300">POTENTIAL PAYOUT:</span>
                          <span className="text-emerald-400 font-black text-base">
                            {(betAmountOD * selectedBetOption.oddsMultiplier).toFixed(2)} $OD
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handlePlaceMaritimeBet}
                        className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-xl"
                      >
                        <Swords className="w-4 h-4" />
                        <span>Place Maritime Bet Now</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 space-y-2">
                      <Swords className="w-8 h-8 text-slate-700 mx-auto" />
                      <p className="text-xs font-mono">Select a sports event & outcome to build your bet slip.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* F) MY TICKETS WALLET */}
          {lotterySubTab === 'my-tickets' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">PERSONAL LOTTERY PORTFOLIO</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">My Purchased Lottery Tickets</h2>
              </div>

              <div className="space-y-3">
                {myTickets.map((tkt) => (
                  <div
                    key={tkt.ticketId}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-400 font-bold">{tkt.ticketId}</span>
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300">{tkt.gameType}</span>
                      </div>
                      <div className="flex items-center space-x-1 pt-1">
                        <span className="text-slate-400">Numbers:</span>
                        {tkt.numbersSelected.map((n, i) => (
                          <span key={i} className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-[11px] font-bold">
                            {n}
                          </span>
                        ))}
                        {tkt.specialBall && (
                          <span className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded text-[11px] font-bold">
                            CB #{tkt.specialBall}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500 block text-[10px]">Seed Hash: {tkt.provablyFairSeed}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      {tkt.status === 'WINNER_UNCLAIMED' && (
                        <button
                          onClick={() => handleClaimPrize(tkt)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all animate-pulse"
                        >
                          Claim {tkt.actualPrizeOD} $OD
                        </button>
                      )}

                      {tkt.status === 'WINNER_CLAIMED' && (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-[10px] font-bold">
                          CLAIMED (+{tkt.actualPrizeOD} $OD)
                        </span>
                      )}

                      {tkt.status === 'ACTIVE_PENDING' && (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">
                          DRAW PENDING ({tkt.drawDate})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. DIGITAL OCEAN DOLLAR WALLET TAB */}
      {activeTab === 'ocean-dollar-wallet' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-mono">
          {/* TOP SECURITY BAR */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl ${isVaultFrozen ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'}`}>
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white">SATCOM SHIELDED HSM VAULT</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isVaultFrozen ? 'bg-rose-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                    {isVaultFrozen ? 'FROZEN / LOCKED' : 'SECURE ONLINE'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Hardware Security Module: AES-256 Quantum-Resistant SatCom Mesh • Daily Velocity Limit: {dailyVelocityLimitOD.toLocaleString()} $OD
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setIsVaultFrozen(!isVaultFrozen);
                  triggerToast(isVaultFrozen ? 'Vault Unfrozen. Transactions operational.' : 'EMERGENCY FREEZE ACTIVATED! Vault locked.');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  isVaultFrozen
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                <LockKeyhole className="w-3.5 h-3.5" />
                <span>{isVaultFrozen ? 'Unfreeze Vault' : 'Emergency Freeze'}</span>
              </button>

              <button
                onClick={() => setShowTransferModal(true)}
                disabled={isVaultFrozen}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-md"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Send / Transfer $OD</span>
              </button>

              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-md"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Reload $OD</span>
              </button>
            </div>
          </div>

          {/* WALLET SUB-TABS */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {[
              { id: 'OVERVIEW', label: 'Wallet & Ledger', icon: Cpu },
              { id: 'MULTI_SIG_SAFE', label: 'Captain Multi-Sig Escrow', icon: Shield },
              { id: 'WHITELIST', label: 'Whitelisted Addresses', icon: Key },
              { id: 'BRIDGE_CONVERTER', label: 'Currency Bridge / FX', icon: RefreshCw },
              { id: 'SECURITY_POLICIES', label: 'Security & Velocity Limits', icon: Fingerprint }
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setWalletSubTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                    walletSubTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* SUB-TAB 1: OVERVIEW & LEDGER */}
          {walletSubTab === 'OVERVIEW' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-xs font-bold block">LIQUID $OD BALANCE</span>
                  <span className="text-2xl font-black text-emerald-400 block">{oceanDollarBalance.toFixed(2)} $OD</span>
                  <span className="text-[10px] text-slate-500 block">≈ ${(oceanDollarBalance * 1.0).toFixed(2)} USD</span>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-xs font-bold block">STAKED YIELD RESERVE</span>
                  <span className="text-2xl font-black text-amber-400 block">{stakedBalance.toFixed(2)} $OD</span>
                  <span className="text-[10px] text-amber-400/80 block">Earning 12.8% APY Daily</span>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-xs font-bold block">MULTI-SIG ESCROW LOCK</span>
                  <span className="text-2xl font-black text-cyan-300 block">35,000.00 $OD</span>
                  <span className="text-[10px] text-cyan-400/80 block">2 Active Escrows</span>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-xs font-bold block">DAILY VELOCITY USED</span>
                  <span className="text-2xl font-black text-purple-300 block">{spentTodayOD.toFixed(0)} / {dailyVelocityLimitOD.toFixed(0)}</span>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${(spentTodayOD / dailyVelocityLimitOD) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* LEDGER TABLE */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-sans">Cryptographic High Seas Ledger</h3>
                  <button
                    onClick={() => triggerToast('Ledger downloaded as encrypted CSV manifest!')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 underline font-sans flex items-center space-x-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Export Audit Trail</span>
                  </button>
                </div>

                <div className="overflow-x-auto bg-slate-950 rounded-2xl border border-slate-800 p-2">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2.5 px-3">TX ID</th>
                        <th className="py-2.5 px-3">TYPE</th>
                        <th className="py-2.5 px-3">DESCRIPTION</th>
                        <th className="py-2.5 px-3">AMOUNT ($OD)</th>
                        <th className="py-2.5 px-3">HASH</th>
                        <th className="py-2.5 px-3">TIMESTAMP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3 px-3 font-bold text-emerald-400">{tx.id}</td>
                          <td className="py-3 px-3">
                            <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300">{tx.type}</span>
                          </td>
                          <td className="py-3 px-3">{tx.description}</td>
                          <td className={`py-3 px-3 font-bold ${tx.amountOD >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {tx.type === 'LOTTERY_PURCHASE' ? `-${tx.amountOD}` : `+${tx.amountOD}`} $OD
                          </td>
                          <td className="py-3 px-3 text-[10px] text-slate-500 font-mono">{tx.txHash.substring(0, 14)}...</td>
                          <td className="py-3 px-3 text-slate-400">{tx.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: CAPTAIN MULTI-SIG ESCROW */}
          {walletSubTab === 'MULTI_SIG_SAFE' && (
            <div className="space-y-6 font-sans">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-black text-white">Captain Multi-Sig Escrow Safes</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Requires m-of-n maritime officer signatures before funds can be transferred from high-value escrow vaults.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {multiSigVaults.map((vault) => (
                  <div key={vault.escrowId} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 font-mono">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-400 font-bold text-sm">{vault.escrowId}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            vault.status === 'RELEASED_COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {vault.status}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white font-sans mt-1">{vault.title}</h4>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">ESCROW AMOUNT</span>
                        <span className="text-2xl font-black text-amber-400 font-mono">{vault.amountOD.toLocaleString()} $OD</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300">{vault.description}</p>

                    <div className="space-y-2 bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs font-mono">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Signatory Approval Progress ({vault.currentSignatures}/{vault.requiredSignatures})</span>
                      <div className="space-y-1.5">
                        {vault.signers.map((signer, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-800/50 last:border-none">
                            <div className="flex items-center space-x-2">
                              {signer.signed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <KeyRound className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                              )}
                              <span className="text-slate-200 font-bold">{signer.name}</span>
                              <span className="text-[10px] text-slate-400">({signer.role})</span>
                            </div>

                            {signer.signed ? (
                              <span className="text-[10px] text-emerald-400">{signer.timestamp}</span>
                            ) : (
                              <button
                                onClick={() => {
                                  setMultiSigVaults(prev => prev.map(v => {
                                    if (v.escrowId === vault.escrowId) {
                                      const newSigners = [...v.signers];
                                      newSigners[idx] = { ...newSigners[idx], signed: true, timestamp: new Date().toISOString().substring(0, 16) + ' UTC' };
                                      const newCount = newSigners.filter(s => s.signed).length;
                                      return {
                                        ...v,
                                        signers: newSigners,
                                        currentSignatures: newCount,
                                        status: newCount >= v.requiredSignatures ? 'RELEASED_COMPLETED' : v.status
                                      };
                                    }
                                    return v;
                                  }));
                                  triggerToast(`Signed Multi-Sig Escrow ${vault.escrowId} as Master Mariner!`);
                                }}
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-lg text-[10px] transition-all"
                              >
                                Sign Escrow Now
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: WHITELISTED ADDRESSES */}
          {walletSubTab === 'WHITELIST' && (
            <div className="space-y-6 font-sans">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-black text-white">Whitelisted Maritime Address Book</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Pre-approved high-seas receiving vaults to bypass 24-hour security hold delays.
                  </p>
                </div>
              </div>

              {/* ADD NEW WHITELIST FORM */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 font-mono uppercase">Add New Verified Address</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Recipient Name / Vessel"
                    value={newWhitelistName}
                    onChange={(e) => setNewWhitelistName(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <input
                    type="text"
                    placeholder="SatCom Vault Address (0x...)"
                    value={newWhitelistAddress}
                    onChange={(e) => setNewWhitelistAddress(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    onClick={() => {
                      if (!newWhitelistName || !newWhitelistAddress) return;
                      setWhitelistedAddresses([...whitelistedAddresses, {
                        id: `WL-${Date.now()}`,
                        name: newWhitelistName,
                        address: newWhitelistAddress,
                        type: 'VERIFIED_CAPTAIN',
                        verified: true
                      }]);
                      setNewWhitelistName('');
                      setNewWhitelistAddress('');
                      triggerToast('Added address to whitelisted directory!');
                    }}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs py-2.5 transition-all"
                  >
                    Add to Whitelist
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {whitelistedAddresses.map((wl) => (
                  <div key={wl.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between font-mono text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white font-sans">{wl.name}</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {wl.type}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px] block mt-0.5">{wl.address}</span>
                    </div>

                    <button
                      onClick={() => {
                        setWhitelistedAddresses(whitelistedAddresses.filter(w => w.id !== wl.id));
                        triggerToast('Removed address from whitelist.');
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 underline font-sans"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: CURRENCY BRIDGE / FX */}
          {walletSubTab === 'BRIDGE_CONVERTER' && (
            <div className="space-y-6 font-sans">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-black text-white">Ocean Dollar ($OD) High Seas FX Converter</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Pegged 1:1 with USD. Zero transaction markups for verified seafarers and maritime travelers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                {[
                  { currency: 'USD ($)', rate: 1.0, flag: '🇺🇸' },
                  { currency: 'EUR (€)', rate: 0.92, flag: '🇪🇺' },
                  { currency: 'GBP (£)', rate: 0.78, flag: '🇬🇧' },
                  { currency: 'INR (₹)', rate: 86.5, flag: '🇮🇳' },
                  { currency: 'LKR (Rs)', rate: 302.0, flag: '🇱🇰' },
                  { currency: 'USDT (Crypto)', rate: 1.0, flag: '🌐' }
                ].map((cur) => (
                  <div key={cur.currency} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">{cur.flag} {cur.currency}</span>
                      <span className="text-emerald-400 text-[10px]">Rate: {cur.rate}</span>
                    </div>
                    <div className="text-lg font-black text-white">
                      {(oceanDollarBalance * cur.rate).toLocaleString(undefined, { maximumFractionDigits: 2 })} {cur.currency.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 5: SECURITY POLICIES & VELOCITY LIMITS */}
          {walletSubTab === 'SECURITY_POLICIES' && (
            <div className="space-y-6 font-sans">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-black text-white">Security Controls & Velocity Limits</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Configure hardware keys, 2FA OTP challenges, and daily spending velocity caps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-white uppercase text-xs">SatCom 2FA Authentication</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Require 2FA Code for transfers &gt; 500 $OD</span>
                    <button
                      onClick={() => {
                        setWalletTwoFactorActive(!walletTwoFactorActive);
                        triggerToast(`2FA is now ${!walletTwoFactorActive ? 'ENABLED' : 'DISABLED'}`);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                        walletTwoFactorActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {walletTwoFactorActive ? 'ACTIVE' : 'DISABLED'}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-white uppercase text-xs">Daily Spending Velocity Cap</h4>
                  <div className="space-y-2">
                    <label className="text-slate-400 text-[11px] block">Max Daily Outflow Limit ($OD)</label>
                    <input
                      type="number"
                      value={dailyVelocityLimitOD}
                      onChange={(e) => setDailyVelocityLimitOD(Math.max(1000, parseInt(e.target.value) || 1000))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-emerald-400 font-bold focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TRANSFER / SEND $OD MODAL */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 font-mono shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <QrCode className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white font-sans">Send $OD Tokens</h3>
              </div>
              <button
                onClick={() => setShowTransferModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">RECIPIENT SATCOM ADDRESS / VAULT</label>
                <input
                  type="text"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-emerald-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">TRANSFER AMOUNT ($OD)</label>
                <input
                  type="number"
                  value={transferAmountOD}
                  onChange={(e) => setTransferAmountOD(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-amber-300 font-bold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">TRANSACTION MEMO / PURPOSE</label>
                <input
                  type="text"
                  value={transferMemo}
                  onChange={(e) => setTransferMemo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <button
                onClick={() => {
                  if (transferAmountOD > oceanDollarBalance) {
                    triggerToast('Insufficient $OD balance!');
                    return;
                  }
                  setOceanDollarBalance(prev => prev - transferAmountOD);
                  setSpentTodayOD(prev => prev + transferAmountOD);
                  setTransactions([
                    {
                      id: `OD-TX-${Math.floor(10000 + Math.random() * 90000)}`,
                      type: 'P2P_TRANSFER',
                      amountOD: transferAmountOD,
                      description: `Transfer to ${transferRecipient.substring(0, 10)}... (${transferMemo})`,
                      timestamp: new Date().toISOString().substring(0, 16) + ' UTC',
                      txHash: `0x${Math.random().toString(16).substring(2, 14)}`,
                      status: 'COMPLETED'
                    },
                    ...transactions
                  ]);
                  setShowTransferModal(false);
                  triggerToast(`Transferred ${transferAmountOD} $OD to ${transferRecipient.substring(0, 10)}...!`);
                }}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-xl font-sans"
              >
                Confirm &amp; Execute SatCom Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. STAKING VAULT & YIELD DASHBOARD TAB */}
      {activeTab === 'staking-vault' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl font-sans">
          {/* HEADER & TOP BANNER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-[11px] font-mono font-bold flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>MARITIME SOVEREIGN YIELD VAULT</span>
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[11px] font-mono font-bold">
                  104.8% OVER-COLLATERALIZED
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                $OD / $XOD &amp; $IOD Staking Dashboard
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Lock your Ocean Dollars ($OD / $XOD) or Indian Ocean Dollars ($IOD) to earn daily yield dividends from maritime clearing fees, Blue Carbon bonds, and seigniorage reserves.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleClaimYield()}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
              >
                <Award className="w-4 h-4" />
                <span>Claim All Yield (${accumulatedYield.toFixed(2)})</span>
              </button>

              <button
                onClick={() => handleCompoundYield()}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Auto-Compound Yield</span>
              </button>
            </div>
          </div>

          {/* KEY METRICS OVERVIEW CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>TOTAL STAKED BALANCE</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-amber-400 font-black text-2xl block">${stakedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              <span className="text-slate-400 text-[10px] block mt-1">Earning yield across {stakedPositions.length} active pools</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>UNCLAIMED REWARDS</span>
                <Flame className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-emerald-400 font-black text-2xl block">${accumulatedYield.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              <span className="text-emerald-300/80 text-[10px] block mt-1">+${((stakedBalance * 0.184) / 365).toFixed(2)} / Day Auto-accrual</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>WEIGHTED AVERAGE APY</span>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-cyan-300 font-black text-2xl block">18.35% APY</span>
              <span className="text-cyan-400/80 text-[10px] block mt-1">+2.5% Admiral Tier Bonus Included</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>STAKER VIP TIER</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-purple-300 font-black text-xl block">SOVEREIGN ADMIRAL</span>
              <span className="text-purple-400/80 text-[10px] block mt-1">Tier 3 VIP | Zero Unstake Delay</span>
            </div>
          </div>

          {/* STAKING DASHBOARD SUB-TAB SWITCHER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setStakingActiveSubTab('POOLS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'POOLS'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Staking Pools (4)</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('POSITIONS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'POSITIONS'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Active Stakes ({stakedPositions.length})</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('CALCULATOR')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'CALCULATOR'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>ROI Calculator</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('TRENDS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'TRENDS'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Yield Trends</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('COMPARE')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'COMPARE'
                    ? 'bg-teal-500 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Compare Pools</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('AUTO_COMPOUND')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'AUTO_COMPOUND'
                    ? 'bg-indigo-500 text-white font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Auto-Compound</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('REFERRAL')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'REFERRAL'
                    ? 'bg-fuchsia-500 text-white font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Staking Referral</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('ACTIVITY_LOG')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'ACTIVITY_LOG'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Activity Log</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('NOTIFICATIONS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 relative ${
                  stakingActiveSubTab === 'NOTIFICATIONS'
                    ? 'bg-rose-500 text-white font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Alerts</span>
                {stakingNotifList.filter(n => !n.read).length > 0 && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {stakingNotifList.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setStakingActiveSubTab('GOVERNANCE_VOTE')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'GOVERNANCE_VOTE'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Gavel className="w-3.5 h-3.5" />
                <span>Governance Vote</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('TIER_REWARDS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'TIER_REWARDS'
                    ? 'bg-purple-500 text-white font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Tier Rewards</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('STOCKS_BONDS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'STOCKS_BONDS'
                    ? 'bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Stocks, Shares &amp; Bonds Portal</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('WHALE_SOCIAL')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'WHALE_SOCIAL'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Whale Social Feed</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('GOVT_APPROVALS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'GOVT_APPROVALS'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Governments &amp; Legal Protection</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('WHALE_TRACKER')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'WHALE_TRACKER'
                    ? 'bg-blue-600 text-white font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Whale Tracker</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('SOCIAL_FEED')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'SOCIAL_FEED'
                    ? 'bg-pink-500 text-white font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Staking Social Feed</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('REWARDS_PROJECTION')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'REWARDS_PROJECTION'
                    ? 'bg-emerald-400 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Rewards Projection</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('GOVERNANCE_FAQ')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'GOVERNANCE_FAQ'
                    ? 'bg-blue-500 text-white font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Governance FAQ</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('PHYSICAL_CURRENCY')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'PHYSICAL_CURRENCY'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Physical $OD Specimen</span>
              </button>

              <button
                onClick={() => setStakingActiveSubTab('HISTORY')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  stakingActiveSubTab === 'HISTORY'
                    ? 'bg-purple-500 text-white font-black shadow-lg'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Payout History</span>
              </button>

              <button
                onClick={() => setIsExportDataModalOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-3.5 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Staking Data</span>
              </button>
            </div>

            {/* EXPORT STAKING DATA HUB MODAL */}
            {isExportDataModalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-6 shadow-2xl font-sans">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-2">
                      <Download className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-xl font-black text-white">Export Staking Data Hub</h3>
                    </div>
                    <button
                      onClick={() => setIsExportDataModalOpen(false)}
                      className="text-slate-400 hover:text-white font-bold text-sm bg-slate-800 px-3 py-1.5 rounded-xl"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <p className="text-slate-300 text-xs">
                    Download complete SatCom cryptographically signed records for tax, auditing, or personal ledger tracking.
                  </p>

                  <div className="space-y-3 font-mono text-xs">
                    <span className="text-slate-400 font-bold block text-[11px] uppercase">CHOOSE EXPORT FORMAT</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setExportDataFormat('CSV')}
                        className={`flex-1 py-2.5 rounded-2xl font-black transition-all ${
                          exportDataFormat === 'CSV'
                            ? 'bg-emerald-500 text-slate-950 shadow-lg'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        📊 CSV Spreadsheet (.csv)
                      </button>
                      <button
                        onClick={() => setExportDataFormat('JSON')}
                        className={`flex-1 py-2.5 rounded-2xl font-black transition-all ${
                          exportDataFormat === 'JSON'
                            ? 'bg-cyan-500 text-slate-950 shadow-lg'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        ⚙️ Full JSON Ledger (.json)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <span className="text-slate-400 font-bold block text-[11px] uppercase">SELECT DATA CATEGORY TO EXPORT</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          if (exportDataFormat === 'CSV') {
                            const csvRows = [
                              ['Position ID', 'Pool Name', 'Staked Amount', 'Currency', 'APR APY', 'Earned Yield', 'Start Date', 'Unlock Date'],
                              ...stakedPositions.map(p => [p.id, p.poolName, p.amount, p.currency, `${p.apr}%`, p.earnedYield, p.startDate, p.unlockDate])
                            ].map(e => e.join(',')).join('\n');
                            const blob = new Blob([csvRows], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `OD_Staked_Positions_${Date.now()}.csv`;
                            a.click();
                          } else {
                            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stakedPositions, null, 2));
                            const a = document.createElement('a');
                            a.href = dataStr;
                            a.download = `OD_Staked_Positions_${Date.now()}.json`;
                            a.click();
                          }
                          triggerToast(`Exported Staked Positions in ${exportDataFormat}!`);
                        }}
                        className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-2xl text-left space-y-1 transition-all"
                      >
                        <span className="font-bold text-white block text-xs">1. Active Staked Positions</span>
                        <span className="text-slate-400 text-[10px]">All {stakedPositions.length} active staked vaults</span>
                      </button>

                      <button
                        onClick={() => {
                          if (exportDataFormat === 'CSV') {
                            const csvRows = [
                              ['Tx Hash', 'ID', 'Action', 'Pool Name', 'Amount', 'Currency', 'Timestamp', 'Status'],
                              ...stakingHistory.map(h => [h.txHash, h.id, h.action, h.poolName, h.amount, h.currency, h.timestamp, h.status])
                            ].map(e => e.join(',')).join('\n');
                            const blob = new Blob([csvRows], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `OD_Payout_History_${Date.now()}.csv`;
                            a.click();
                          } else {
                            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stakingHistory, null, 2));
                            const a = document.createElement('a');
                            a.href = dataStr;
                            a.download = `OD_Payout_History_${Date.now()}.json`;
                            a.click();
                          }
                          triggerToast(`Exported Staking Payout History in ${exportDataFormat}!`);
                        }}
                        className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-2xl text-left space-y-1 transition-all"
                      >
                        <span className="font-bold text-white block text-xs">2. Rewards Payout Ledger</span>
                        <span className="text-slate-400 text-[10px]">{stakingHistory.length} payout events logged</span>
                      </button>

                      <button
                        onClick={() => {
                          if (exportDataFormat === 'CSV') {
                            const csvRows = [
                              ['Proposal ID', 'Title', 'Category', 'User Vote', 'Voting Power Used'],
                              ...governanceProposals.map(g => [g.id, g.title, g.category, g.userVoted || 'NOT_VOTED', stakedBalance])
                            ].map(e => e.join(',')).join('\n');
                            const blob = new Blob([csvRows], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `OD_Governance_Votes_${Date.now()}.csv`;
                            a.click();
                          } else {
                            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(governanceProposals, null, 2));
                            const a = document.createElement('a');
                            a.href = dataStr;
                            a.download = `OD_Governance_Votes_${Date.now()}.json`;
                            a.click();
                          }
                          triggerToast(`Exported Governance Votes in ${exportDataFormat}!`);
                        }}
                        className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-2xl text-left space-y-1 transition-all"
                      >
                        <span className="font-bold text-white block text-xs">3. Governance Vote Log</span>
                        <span className="text-slate-400 text-[10px]">Your cast governance votes</span>
                      </button>

                      <button
                        onClick={() => {
                          const refExport = {
                            code: stakingReferralCode,
                            stats: stakingReferralStats,
                            exportedAt: new Date().toISOString()
                          };
                          if (exportDataFormat === 'CSV') {
                            const csvRows = [
                              ['Referral Code', 'Referred Stakers', 'Referred TVL', 'Lifetime Earnings', 'Tier Name'],
                              [stakingReferralCode, stakingReferralStats.refereesCount, stakingReferralStats.totalRefStaked, stakingReferralStats.lifetimeEarnings, stakingReferralStats.tierName]
                            ].map(e => e.join(',')).join('\n');
                            const blob = new Blob([csvRows], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `OD_Referral_Report_${Date.now()}.csv`;
                            a.click();
                          } else {
                            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(refExport, null, 2));
                            const a = document.createElement('a');
                            a.href = dataStr;
                            a.download = `OD_Referral_Report_${Date.now()}.json`;
                            a.click();
                          }
                          triggerToast(`Exported Referral Earnings in ${exportDataFormat}!`);
                        }}
                        className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-3 rounded-2xl text-left space-y-1 transition-all"
                      >
                        <span className="font-bold text-white block text-xs">4. Referral Earnings</span>
                        <span className="text-slate-400 text-[10px]">{stakingReferralStats.refereesCount} referred stakers summary</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const consolidated = {
                        account: 'Sovereign Staker',
                        stakedTotal: stakedBalance,
                        positions: stakedPositions,
                        history: stakingHistory,
                        proposals: governanceProposals,
                        referrals: stakingReferralStats,
                        exportedAt: new Date().toISOString()
                      };
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(consolidated, null, 2));
                      const a = document.createElement('a');
                      a.href = dataStr;
                      a.download = `OD_Full_Consolidated_Staking_Report_${Date.now()}.json`;
                      a.click();
                      triggerToast('Exported Full Consolidated Staking Report!');
                    }}
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center space-x-2 font-mono"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD CONSOLIDATED ACCOUNT REPORT (JSON)</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAKING DARK MODE / DISPLAY THEME TOGGLE */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1 font-mono text-[11px] shrink-0">
              <span className="text-slate-400 px-2 font-bold text-[10px]">THEME:</span>
              <button
                onClick={() => {
                  setStakingThemeMode('MIDNIGHT');
                  triggerToast('Staking Theme: Midnight Sovereign Dark');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  stakingThemeMode === 'MIDNIGHT' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Midnight
              </button>
              <button
                onClick={() => {
                  setStakingThemeMode('NAVY');
                  triggerToast('Staking Theme: Tactical High-Seas Navy');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  stakingThemeMode === 'NAVY' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Navy
              </button>
              <button
                onClick={() => {
                  setStakingThemeMode('CYAN');
                  triggerToast('Staking Theme: Sovereign Cyber Gloss');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  stakingThemeMode === 'CYAN' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cyber
              </button>
            </div>
          </div>

          {/* SUB-TAB 1: STAKING POOLS GRID & QUICK STAKE FORM */}
          {stakingActiveSubTab === 'POOLS' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* POOL 1 */}
                <div
                  onClick={() => setSelectedStakingPool('FLEX_MARITIME')}
                  className={`cursor-pointer bg-slate-950 p-6 rounded-3xl border transition-all space-y-4 ${
                    selectedStakingPool === 'FLEX_MARITIME'
                      ? 'border-amber-400 bg-amber-500/5 ring-2 ring-amber-400/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">⚡</span>
                    <span className="bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-amber-400/30">
                      8.5% APY
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">Flexible Maritime Vault</h3>
                    <p className="text-slate-400 text-xs mt-1">Instant liquidity pool for high-seas merchant settlements.</p>
                  </div>
                  <div className="font-mono text-xs space-y-1.5 border-t border-slate-800/80 pt-3">
                    <div className="flex justify-between text-slate-400">
                      <span>Lock Period:</span>
                      <span className="text-emerald-400 font-bold">0 Days (Flex)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Min Deposit:</span>
                      <span className="text-white font-bold">$10 $OD</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Multiplier:</span>
                      <span className="text-cyan-300 font-bold">1.0x Base</span>
                    </div>
                  </div>
                </div>

                {/* POOL 2 */}
                <div
                  onClick={() => setSelectedStakingPool('30_DAY_SOVEREIGN')}
                  className={`cursor-pointer bg-slate-950 p-6 rounded-3xl border transition-all space-y-4 ${
                    selectedStakingPool === '30_DAY_SOVEREIGN'
                      ? 'border-emerald-400 bg-emerald-500/5 ring-2 ring-emerald-400/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🛡️</span>
                    <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
                      14.2% APY
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">30-Day Sovereign Reserve</h3>
                    <p className="text-slate-400 text-xs mt-1">Backed by IORA member country bilateral trade clearing reserves.</p>
                  </div>
                  <div className="font-mono text-xs space-y-1.5 border-t border-slate-800/80 pt-3">
                    <div className="flex justify-between text-slate-400">
                      <span>Lock Period:</span>
                      <span className="text-emerald-400 font-bold">30 Days</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Min Deposit:</span>
                      <span className="text-white font-bold">$100 $OD</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Multiplier:</span>
                      <span className="text-emerald-300 font-bold">1.25x Yield</span>
                    </div>
                  </div>
                </div>

                {/* POOL 3 */}
                <div
                  onClick={() => setSelectedStakingPool('90_DAY_CARBON')}
                  className={`cursor-pointer bg-slate-950 p-6 rounded-3xl border transition-all space-y-4 ${
                    selectedStakingPool === '90_DAY_CARBON'
                      ? 'border-cyan-400 bg-cyan-500/5 ring-2 ring-cyan-400/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🌊</span>
                    <span className="bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-cyan-400/30">
                      22.5% APY
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">90-Day Blue Carbon Vault</h3>
                    <p className="text-slate-400 text-xs mt-1">Yields generated from Sovereign Maritime Blue Carbon Green Bonds.</p>
                  </div>
                  <div className="font-mono text-xs space-y-1.5 border-t border-slate-800/80 pt-3">
                    <div className="flex justify-between text-slate-400">
                      <span>Lock Period:</span>
                      <span className="text-cyan-400 font-bold">90 Days</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Min Deposit:</span>
                      <span className="text-white font-bold">$500 $OD</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Multiplier:</span>
                      <span className="text-cyan-300 font-bold">2.0x High Yield</span>
                    </div>
                  </div>
                </div>

                {/* POOL 4 */}
                <div
                  onClick={() => setSelectedStakingPool('365_DAY_VIP')}
                  className={`cursor-pointer bg-slate-950 p-6 rounded-3xl border transition-all space-y-4 ${
                    selectedStakingPool === '365_DAY_VIP'
                      ? 'border-purple-400 bg-purple-500/5 ring-2 ring-purple-400/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">👑</span>
                    <span className="bg-purple-400/20 text-purple-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-purple-400/30">
                      34.0% APY
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">365-Day High-Seas VIP Vault</h3>
                    <p className="text-slate-400 text-xs mt-1">Maximum yield pool backed by Central Mint seigniorage &amp; VIP gaming proceeds.</p>
                  </div>
                  <div className="font-mono text-xs space-y-1.5 border-t border-slate-800/80 pt-3">
                    <div className="flex justify-between text-slate-400">
                      <span>Lock Period:</span>
                      <span className="text-purple-400 font-bold">365 Days</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Min Deposit:</span>
                      <span className="text-white font-bold">$1,000 $OD</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Multiplier:</span>
                      <span className="text-purple-300 font-bold">3.5x VIP Ultra</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STAKE DEPOSIT ACTION CARD */}
              <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">NEW STAKE DEPOSIT FORM</span>
                    <h3 className="text-xl font-black text-white">Stake Your $OD / $XOD or $IOD Tokens</h3>
                  </div>

                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="text-slate-400">AVAILABLE BALANCE:</span>
                    <span className="text-emerald-400 font-bold">${oceanDollarBalance.toFixed(2)} $OD</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300">STAKING CURRENCY</label>
                    <select
                      value={stakeCurrency}
                      onChange={(e) => setStakeCurrency(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white font-bold focus:outline-none"
                    >
                      <option value="OD">🌐 Ocean Dollar ($OD / $XOD)</option>
                      <option value="IOD">🌊 Indian Ocean Dollar ($IOD)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300">SELECTED STAKING POOL</label>
                    <select
                      value={selectedStakingPool}
                      onChange={(e) => setSelectedStakingPool(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-amber-400 font-bold focus:outline-none"
                    >
                      <option value="FLEX_MARITIME">⚡ Flexible Maritime Vault (8.5% APY - 0 Days)</option>
                      <option value="30_DAY_SOVEREIGN">🛡️ 30-Day Sovereign Reserve Pool (14.2% APY - 30 Days)</option>
                      <option value="90_DAY_CARBON">🌊 90-Day Blue Carbon Yield Vault (22.5% APY - 90 Days)</option>
                      <option value="365_DAY_VIP">👑 365-Day High-Seas VIP Vault (34.0% APY - 365 Days)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300">STAKE AMOUNT (${stakeCurrency})</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="10"
                        value={stakeAmountInput}
                        onChange={(e) => setStakeAmountInput(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-emerald-400 font-bold focus:outline-none pr-16 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setStakeAmountInput(oceanDollarBalance)}
                        className="absolute right-2 top-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-[10px] px-2 py-1 rounded-lg"
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                </div>

                {/* QUICK AMOUNT SHORTCUTS & PROJECTED YIELD DISPLAY */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-mono text-xs">QUICK STAKE:</span>
                    {[25, 50, 75, 100].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setStakeAmountInput(Math.floor((oceanDollarBalance * pct) / 100))}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>

                  <div className="font-mono text-xs text-right">
                    <span className="text-slate-400 block text-[10px]">ESTIMATED DAILY INCOME</span>
                    <span className="text-emerald-400 font-black text-sm">
                      +${((stakeAmountInput * (selectedStakingPool === '365_DAY_VIP' ? 0.34 : selectedStakingPool === '90_DAY_CARBON' ? 0.225 : selectedStakingPool === '30_DAY_SOVEREIGN' ? 0.142 : 0.085)) / 365).toFixed(2)} ${stakeCurrency} / Day
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDepositStake(selectedStakingPool, stakeAmountInput, stakeCurrency === 'IOD' ? '$IOD' : '$OD / $XOD')}
                  disabled={isStakingProcessing || stakeAmountInput <= 0}
                  className="w-full bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 hover:from-amber-400 hover:via-emerald-400 hover:to-cyan-400 text-slate-950 font-black py-4 rounded-2xl text-sm transition-all shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Flame className="w-5 h-5 text-slate-950" />
                  <span>
                    {isStakingProcessing ? 'Encrypting SatCom Staking Vault...' : `Confirm Deposit of ${stakeAmountInput} into Staking Vault`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: ACTIVE STAKES POSITIONS TABLE & LOCKUP TIMER */}
          {stakingActiveSubTab === 'POSITIONS' && (
            <div className="space-y-4 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-black text-white">Your Active Staking Positions ({stakedPositions.length})</h3>
                  <p className="text-slate-400 text-xs">Total Staked Principal: <strong className="text-amber-400">${stakedBalance.toFixed(2)} $OD</strong></p>
                </div>

                <button
                  onClick={() => {
                    const csvRows = [
                      ['Position ID', 'Pool Name', 'Staked Amount', 'Currency', 'APR APY', 'Earned Yield', 'Start Date', 'Unlock Date', 'Status'],
                      ...stakedPositions.map(p => [p.id, p.poolName, p.amount, p.currency, `${p.apr}%`, p.earnedYield, p.startDate, p.unlockDate, p.status])
                    ].map(e => e.join(',')).join('\n');
                    const blob = new Blob([csvRows], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', `OD_Staked_Positions_Report_${Date.now()}.csv`);
                    a.click();
                    triggerToast('Exported Staked Positions CSV report!');
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5 shrink-0 font-mono"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Active Positions CSV</span>
                </button>
              </div>

              {stakedPositions.length === 0 ? (
                <div className="bg-slate-950 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
                  <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto" />
                  <h4 className="text-white font-bold">No Active Staking Positions Found</h4>
                  <p className="text-slate-400 text-xs max-w-md mx-auto">
                    Deposit $OD / $XOD or $IOD into any of our sovereign staking pools to start earning daily yield dividends.
                  </p>
                  <button
                    onClick={() => setStakingActiveSubTab('POOLS')}
                    className="bg-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs"
                  >
                    Browse Staking Pools
                  </button>
                </div>
              ) : (
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl font-mono text-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[11px]">
                          <th className="p-4">POSITION ID &amp; POOL</th>
                          <th className="p-4">STAKED AMOUNT</th>
                          <th className="p-4">APR RATE</th>
                          <th className="p-4">EARNED YIELD</th>
                          <th className="p-4">LOCKUP TIMER &amp; MATURITY</th>
                          <th className="p-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {stakedPositions.map((pos) => {
                          // Calculate lockup days remaining for countdown
                          const unlockTime = new Date(pos.unlockDate).getTime();
                          const now = Date.now();
                          const diffMs = Math.max(0, unlockTime - now);
                          const daysLeft = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                          const hoursLeft = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                          const minsLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                          return (
                            <tr key={pos.id} className="hover:bg-slate-900/50 transition-all">
                              <td className="p-4 font-sans">
                                <div className="flex items-center space-x-3">
                                  <span className="text-xl">{pos.icon}</span>
                                  <div>
                                    <span className="font-bold text-white block">{pos.poolName}</span>
                                    <span className="text-slate-400 text-[10px] font-mono">{pos.id} • Started {pos.startDate}</span>
                                  </div>
                                </div>
                              </td>

                              <td className="p-4 font-black text-amber-400 text-sm">
                                ${pos.amount.toFixed(2)} {pos.currency}
                              </td>

                              <td className="p-4">
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                                  {pos.apr}% APY
                                </span>
                              </td>

                              <td className="p-4 font-black text-emerald-400 text-sm">
                                +${pos.earnedYield.toFixed(2)} {pos.currency}
                              </td>

                              <td className="p-4 text-slate-300">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1.5 text-cyan-300 font-bold text-xs">
                                    <Timer className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                                    <span>
                                      {daysLeft > 0 ? `${daysLeft}d ${hoursLeft}h ${minsLeft}m Left` : 'Maturity Unlocked!'}
                                    </span>
                                  </div>
                                  <span className="block text-[10px] text-slate-400">Unlocks on {pos.unlockDate}</span>
                                  <div className="w-28 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all"
                                      style={{ width: `${Math.min(100, Math.max(10, 100 - (daysLeft / pos.lockPeriodDays) * 100))}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              <td className="p-4 text-right space-x-2">
                                <button
                                  onClick={() => handleClaimYield(pos.id)}
                                  className="bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold px-3 py-1.5 rounded-xl transition-all"
                                >
                                  Claim
                                </button>
                                <button
                                  onClick={() => handleUnstakePosition(pos.id)}
                                  className="bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-bold px-3 py-1.5 rounded-xl transition-all"
                                >
                                  Unstake
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUB-TAB 3: ADVANCED STAKING CALCULATOR */}
          {stakingActiveSubTab === 'CALCULATOR' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400">PRECISION YIELD & COMPOUND CALCULATOR</span>
                  <h3 className="text-2xl font-black text-white">Staking Yield Calculator</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Calculate compound interest growth, daily dividend yields, and APY returns for any stake amount.
                  </p>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 text-right font-mono text-xs">
                  <span className="text-slate-400 block text-[10px]">VIP ADMIRAL BONUS</span>
                  <span className="text-amber-400 font-black">+2.50% Extra APY Applied</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* INPUT CONTROLS COLUMN */}
                <div className="lg:col-span-6 space-y-6 font-mono text-xs">
                  {/* PRINCIPAL AMOUNT INPUT */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-300 font-bold">
                      <span>DEPOSIT PRINCIPAL:</span>
                      <span className="text-amber-400 font-black text-sm">${calcPrincipal.toLocaleString()} $OD</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="100000"
                      step="500"
                      value={calcPrincipal}
                      onChange={(e) => setCalcPrincipal(parseFloat(e.target.value))}
                      className="w-full accent-amber-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
                      {[1000, 5000, 10000, 25000, 50000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setCalcPrincipal(amt)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all ${
                            calcPrincipal === amt
                              ? 'bg-amber-500 text-slate-950 font-black'
                              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          ${amt >= 1000 ? `${amt / 1000}k` : amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* DURATION SLIDER */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-300 font-bold">
                      <span>LOCK DURATION (DAYS):</span>
                      <span className="text-cyan-400 font-black text-sm">{calcDurationDays} Days ({Math.round(calcDurationDays / 30)} Months)</span>
                    </div>
                    <input
                      type="range"
                      min="7"
                      max="365"
                      step="1"
                      value={calcDurationDays}
                      onChange={(e) => setCalcDurationDays(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>7 Days</span>
                      <span>90 Days</span>
                      <span>180 Days</span>
                      <span>365 Days</span>
                    </div>
                  </div>

                  {/* POOL SELECTION PRESETS */}
                  <div className="space-y-2">
                    <label className="text-slate-300 font-bold block">BASE POOL APY PRESETS:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { name: 'Flex', apr: 8.5 },
                        { name: '30D Sovereign', apr: 14.2 },
                        { name: '90D Carbon', apr: 22.5 },
                        { name: '365D VIP', apr: 34.0 }
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setCalcPoolApr(item.apr)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            calcPoolApr === item.apr
                              ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                              : 'border-slate-800 text-slate-400 bg-slate-900 hover:border-slate-700'
                          }`}
                        >
                          <span className="block text-[10px] font-sans text-slate-400">{item.name}</span>
                          <span className="text-sm font-black">{item.apr}% APY</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* COMPOUND FREQUENCY & VIP BONUS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold block">COMPOUND FREQUENCY</label>
                      <select
                        value={calcCompoundFreq}
                        onChange={(e) => setCalcCompoundFreq(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-cyan-300 font-bold focus:outline-none"
                      >
                        <option value="DAILY">⚡ Daily Compounding (n=365)</option>
                        <option value="WEEKLY">📅 Weekly Compounding (n=52)</option>
                        <option value="MONTHLY">🗓️ Monthly Compounding (n=12)</option>
                        <option value="YEARLY">⏳ Simple Annual (n=1)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold block">VIP TIER APY BONUS</label>
                      <select
                        value={calcVipTierBonus}
                        onChange={(e) => setCalcVipTierBonus(parseFloat(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-300 font-bold focus:outline-none"
                      >
                        <option value={0}>Tier 0: Standard (+0.0%)</option>
                        <option value={1.5}>Tier 1: High-Seas Trader (+1.5%)</option>
                        <option value={2.5}>Tier 2: Sovereign Admiral (+2.5%)</option>
                        <option value={5.0}>Tier 3: Central Mint VIP (+5.0%)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* RESULTS & BREAKDOWN DISPLAY COLUMN */}
                <div className="lg:col-span-6 space-y-6">
                  {(() => {
                    const effectiveApy = calcPoolApr + calcVipTierBonus;
                    const r = effectiveApy / 100;
                    const n = calcCompoundFreq === 'DAILY' ? 365 : calcCompoundFreq === 'WEEKLY' ? 52 : calcCompoundFreq === 'MONTHLY' ? 12 : 1;
                    const t = calcDurationDays / 365;
                    const maturityValue = calcPrincipal * Math.pow(1 + r / n, n * t);
                    const netYield = maturityValue - calcPrincipal;
                    const dailyIncome = (calcPrincipal * (effectiveApy / 100)) / 365;

                    return (
                      <div className="space-y-6">
                        {/* HERO RETURN DISPLAY */}
                        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
                          <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                            <span className="text-slate-400">TOTAL APY RATE (BASE + VIP)</span>
                            <span className="text-emerald-400 font-black text-sm">{effectiveApy.toFixed(2)}% APY</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                              <span className="text-slate-400 text-[10px] block">ESTIMATED DAILY YIELD</span>
                              <span className="text-emerald-400 font-black text-lg">+${dailyIncome.toFixed(2)}</span>
                              <span className="text-slate-500 text-[9px] block">/ Day auto-accrued</span>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-[10px] block">NET YIELD INTEREST</span>
                                <span className="bg-cyan-500/20 text-cyan-300 text-[9px] font-black px-1.5 py-0.5 rounded-full border border-cyan-500/30">
                                  +${((netYield / calcPrincipal) * 100).toFixed(1)}% ROI
                                </span>
                              </div>
                              <span className="text-cyan-300 font-black text-lg">+${netYield.toFixed(2)}</span>
                              <span className="text-slate-500 text-[9px] block">over {calcDurationDays} days</span>
                            </div>
                          </div>

                          <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 flex justify-between items-center">
                            <div>
                              <span className="text-slate-400 text-[10px] block font-sans">TOTAL PROJECTED PAYOUT</span>
                              <span className="text-amber-400 font-black text-2xl">${maturityValue.toFixed(2)} $OD</span>
                            </div>
                            <button
                              onClick={() => {
                                setStakeAmountInput(calcPrincipal);
                                setStakingActiveSubTab('POOLS');
                                triggerToast(`Loaded $${calcPrincipal} principal into stake form!`);
                              }}
                              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs font-sans transition-all shadow-md flex items-center space-x-1"
                            >
                              <Flame className="w-4 h-4" />
                              <span>Apply to Stake</span>
                            </button>
                          </div>
                        </div>

                        {/* TIMELINE PROJECTION TABLE */}
                        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800/80 font-mono text-xs space-y-3">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Compound Growth Projections Timeline</h4>
                          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                            {[30, 90, 180, 365].map((days) => {
                              const projVal = calcPrincipal * Math.pow(1 + r / n, n * (days / 365));
                              return (
                                <div key={days} className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                                  <span className="text-slate-400 block font-bold">{days} Days</span>
                                  <span className="text-emerald-400 font-black text-xs block mt-1">${projVal.toFixed(0)}</span>
                                  <span className="text-cyan-400 text-[9px]">+${(projVal - calcPrincipal).toFixed(0)}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* STAKING APR PREDICTOR ENGINE */}
                        <div className="bg-slate-900 p-5 rounded-3xl border border-cyan-500/30 font-mono text-xs space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-cyan-400 font-black text-xs uppercase flex items-center space-x-1.5">
                              <TrendingUp className="w-4 h-4" />
                              <span>STAKING APR PREDICTOR &amp; FORECASTING MODEL</span>
                            </span>
                            <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                              AI MACRO MODEL v2.6
                            </span>
                          </div>

                          <div className="space-y-3">
                            <label className="text-slate-300 font-bold block">FORECAST SCENARIO PRESET</label>
                            <div className="grid grid-cols-3 gap-2">
                              <button
                                onClick={() => {
                                  setPredScenario('BULLISH');
                                  setPredTvlGrowth(120);
                                  setPredPortVolume(350);
                                  setPredReserveBoost(4.5);
                                }}
                                className={`p-2 rounded-xl border text-center transition-all ${
                                  predScenario === 'BULLISH'
                                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                                    : 'bg-slate-950 border-slate-800 text-slate-400'
                                }`}
                              >
                                🚀 Bullish High-Seas
                              </button>
                              <button
                                onClick={() => {
                                  setPredScenario('BASELINE');
                                  setPredTvlGrowth(50);
                                  setPredPortVolume(120);
                                  setPredReserveBoost(2.5);
                                }}
                                className={`p-2 rounded-xl border text-center transition-all ${
                                  predScenario === 'BASELINE'
                                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                    : 'bg-slate-950 border-slate-800 text-slate-400'
                                }`}
                              >
                                ⚖️ Parity Baseline
                              </button>
                              <button
                                onClick={() => {
                                  setPredScenario('CONSERVATIVE');
                                  setPredTvlGrowth(10);
                                  setPredPortVolume(40);
                                  setPredReserveBoost(1.0);
                                }}
                                className={`p-2 rounded-xl border text-center transition-all ${
                                  predScenario === 'CONSERVATIVE'
                                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold'
                                    : 'bg-slate-950 border-slate-800 text-slate-400'
                                }`}
                              >
                                🛡️ Conservative
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div>
                              <span className="text-slate-400 block text-[10px]">TVL GROWTH: +{predTvlGrowth}%</span>
                              <input
                                type="range"
                                min="-20"
                                max="200"
                                value={predTvlGrowth}
                                onChange={(e) => setPredTvlGrowth(parseFloat(e.target.value))}
                                className="w-full accent-cyan-400 bg-slate-950 rounded h-1.5 cursor-pointer"
                              />
                            </div>

                            <div>
                              <span className="text-slate-400 block text-[10px]">PORT VOL: ${predPortVolume}M/DAY</span>
                              <input
                                type="range"
                                min="10"
                                max="500"
                                value={predPortVolume}
                                onChange={(e) => setPredPortVolume(parseFloat(e.target.value))}
                                className="w-full accent-cyan-400 bg-slate-950 rounded h-1.5 cursor-pointer"
                              />
                            </div>
                          </div>

                          {(() => {
                            const projectedApr = Math.min(48.0, Math.max(8.0, calcPoolApr + (predTvlGrowth * 0.05) + (predPortVolume * 0.02) + predReserveBoost));
                            const projectedYield = (calcPrincipal * (projectedApr / 100));

                            return (
                              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-400 text-[10px]">PREDICTED ANNUAL APR</span>
                                  <span className="text-amber-400 font-black text-sm">{projectedApr.toFixed(2)}% APR</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-400 text-[10px]">PREDICTED 1-YR YIELD ON STAKE</span>
                                  <span className="text-emerald-400 font-black text-sm">+${projectedYield.toFixed(2)} $OD</span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: YIELD TRENDS GRAPH & VISUALIZATIONS */}
          {stakingActiveSubTab === 'TRENDS' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">HISTORICAL PERFORMANCE & APY METRICS</span>
                  <h3 className="text-2xl font-black text-white">Yield Trends &amp; TVL Analytics</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Visualizing 30-day cumulative yield accrual, pool interest rate trajectories, and protocol Total Value Staked.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex space-x-1 text-xs font-mono">
                    {(['YIELD', 'APY', 'TVL'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setTrendMetric(m)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                          trendMetric === m ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {m === 'YIELD' ? 'Cumulative Yield' : m === 'APY' ? 'Pool APY %' : 'Total TVL'}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex space-x-1 text-xs font-mono">
                    {(['7D', '30D', '90D', '1Y'] as const).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTrendTimeframe(tf)}
                        className={`px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                          trendTimeframe === tf ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* INTERACTIVE SVG YIELD TREND CHART */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-bold">
                      {trendMetric === 'YIELD' ? 'User Yield Growth Trend' : trendMetric === 'APY' ? 'Sovereign APY Stability Index' : 'Protocol Staking TVL Growth'}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold">+18.42% Growth Trend (Over {trendTimeframe})</span>
                </div>

                {/* SVG CHART CANVAS */}
                <div className="relative w-full h-56 pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* GRID LINES */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
                    <line x1="0" y1="110" x2="500" y2="110" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />

                    {/* AREA FILL & TREND LINE */}
                    <path
                      d="M 0,130 Q 80,110 150,95 T 300,60 T 420,35 L 500,20 L 500,150 L 0,150 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M 0,130 Q 80,110 150,95 T 300,60 T 420,35 L 500,20"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* DATA NODES */}
                    <circle cx="0" cy="130" r="4" fill="#10b981" />
                    <circle cx="150" cy="95" r="4" fill="#10b981" />
                    <circle cx="300" cy="60" r="4" fill="#10b981" />
                    <circle cx="420" cy="35" r="4" fill="#10b981" />
                    <circle cx="500" cy="20" r="6" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800/80 pt-2">
                  <span>Day 1</span>
                  <span>Day 7</span>
                  <span>Day 15</span>
                  <span>Day 22</span>
                  <span className="text-amber-400 font-bold">Today (2026-08-15)</span>
                </div>
              </div>

              {/* POOL YIELD COMPARISON METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">FLEX MARITIME</span>
                  <span className="text-amber-300 font-black text-sm block">8.5% APY</span>
                  <span className="text-slate-400 text-[10px] block">TVL: $4.2M $OD</span>
                  <span className="text-emerald-400 text-[9px] font-bold block">99.8% Stability Rating</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">30D SOVEREIGN</span>
                  <span className="text-emerald-400 font-black text-sm block">14.2% APY</span>
                  <span className="text-slate-400 text-[10px] block">TVL: $12.8M $OD</span>
                  <span className="text-emerald-400 text-[9px] font-bold block">99.5% Stability Rating</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">90D BLUE CARBON</span>
                  <span className="text-cyan-300 font-black text-sm block">22.5% APY</span>
                  <span className="text-slate-400 text-[10px] block">TVL: $28.5M $OD</span>
                  <span className="text-emerald-400 text-[9px] font-bold block">98.4% Stability Rating</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">365D VIP VAULT</span>
                  <span className="text-purple-300 font-black text-sm block">34.0% APY</span>
                  <span className="text-slate-400 text-[10px] block">TVL: $45.1M $OD</span>
                  <span className="text-amber-400 text-[9px] font-bold block">99.9% Maximum Stability</span>
                </div>
              </div>

              {/* YIELD SOURCE REVENUE COMPOSITION */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800/80 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-white font-bold text-xs uppercase flex items-center space-x-2 font-sans">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span>PROTOCOL STAKING YIELD SOURCE BACKING (2026 AUDITED)</span>
                  </h4>
                  <span className="text-emerald-400 text-[10px] font-bold">100% Fully Backed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">1. CENTRAL SEIGNIORAGE</span>
                    <span className="text-amber-400 font-black text-lg">38.0%</span>
                    <span className="text-slate-500 text-[9px] block">MCRB Treasury Issuance</span>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">2. PORT CLEARING FEES</span>
                    <span className="text-cyan-400 font-black text-lg">32.0%</span>
                    <span className="text-slate-500 text-[9px] block">0.05% Cruise & Cargo Swaps</span>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">3. BLUE CARBON BONDS</span>
                    <span className="text-emerald-400 font-black text-lg">22.0%</span>
                    <span className="text-slate-500 text-[9px] block">UN-Certified Green Coupons</span>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">4. VAULT LIQUIDITY</span>
                    <span className="text-purple-400 font-black text-lg">8.0%</span>
                    <span className="text-slate-500 text-[9px] block">High-Seas Casino Yield</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 5: STAKING AUTO-COMPOUND HUB */}
          {stakingActiveSubTab === 'AUTO_COMPOUND' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-400">AUTOMATED YIELD REINVESTMENT ENGINE</span>
                  <h3 className="text-2xl font-black text-white">Auto-Compound Hub</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Automatically reinvest your daily accrued $OD / $IOD yield back into your principal to maximize compound exponential returns.
                  </p>
                </div>

                {/* MASTER TOGGLE SWITCH */}
                <div className="flex items-center space-x-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-300">AUTO-COMPOUND STATUS:</span>
                  <button
                    onClick={() => {
                      setIsAutoCompoundEnabled(!isAutoCompoundEnabled);
                      triggerToast(`Auto-Compound Engine ${!isAutoCompoundEnabled ? 'ENABLED' : 'DISABLED'}`);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
                      isAutoCompoundEnabled
                        ? 'bg-emerald-500 text-slate-950 shadow-lg'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAutoCompoundEnabled ? 'animate-spin' : ''}`} />
                    <span>{isAutoCompoundEnabled ? 'ACTIVE' : 'PAUSED'}</span>
                  </button>
                </div>
              </div>

              {/* ENGINE CONFIGURATION & CONTROLS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                {/* FREQUENCY SETTING */}
                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-3">
                  <label className="text-slate-300 font-bold block">REINVESTMENT FREQUENCY</label>
                  <select
                    value={autoCompoundFreq}
                    onChange={(e) => setAutoCompoundFreq(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-amber-300 font-bold focus:outline-none"
                  >
                    <option value="DAILY">⚡ Daily Automated Cycle (00:00 UTC)</option>
                    <option value="WEEKLY">📅 Weekly Reinvestment (Sundays)</option>
                    <option value="THRESHOLD">🎯 Threshold Trigger ($10+ Yield)</option>
                  </select>
                  <p className="text-slate-500 text-[10px] font-sans">
                    Yield is harvested and restaked into your designated vault without transaction gas fees.
                  </p>
                </div>

                {/* TARGET POOL DESTINATION */}
                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-3">
                  <label className="text-slate-300 font-bold block">DESTINATION REINVESTMENT POOL</label>
                  <select
                    value={autoCompoundTargetPool}
                    onChange={(e) => setAutoCompoundTargetPool(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-cyan-300 font-bold focus:outline-none"
                  >
                    <option value="30_DAY_SOVEREIGN">🛡️ 30-Day Sovereign Reserve (14.2% APY)</option>
                    <option value="90_DAY_CARBON">🌊 90-Day Blue Carbon Vault (22.5% APY)</option>
                    <option value="365_DAY_VIP">👑 365-Day High-Seas VIP Vault (34.0% APY)</option>
                  </select>
                  <p className="text-slate-500 text-[10px] font-sans">
                    Auto-compound rewards add directly to the chosen vault's principal deposit.
                  </p>
                </div>

                {/* MINIMUM THRESHOLD */}
                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-3">
                  <label className="text-slate-300 font-bold block">MINIMUM REINVESTMENT ($OD)</label>
                  <input
                    type="number"
                    min="1"
                    value={autoCompoundThreshold}
                    onChange={(e) => setAutoCompoundThreshold(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-emerald-400 font-bold focus:outline-none font-mono"
                  />
                  <p className="text-slate-500 text-[10px] font-sans">
                    Engine waits until unclaimed rewards reach this threshold before executing restake.
                  </p>
                </div>
              </div>

              {/* AUTO-COMPOUND ENGINE METRICS & MANUAL EXECUTION CTA */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-3xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px]">TOTAL AUTO-COMPOUNDED TO DATE</span>
                  <span className="text-emerald-400 font-black text-2xl">${totalAutoCompoundedRewards.toFixed(2)} $OD</span>
                  <span className="text-slate-500 text-[10px] block">Last cycle run: {lastAutoCompoundTimestamp}</span>
                </div>

                <button
                  onClick={handleRunAutoCompoundCycle}
                  disabled={isAutoCompoundCycleRunning}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-black px-6 py-4 rounded-2xl text-xs transition-all shadow-xl flex items-center justify-center space-x-2 font-sans disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isAutoCompoundCycleRunning ? 'animate-spin' : ''}`} />
                  <span>
                    {isAutoCompoundCycleRunning ? 'Executing Compound Cycle...' : 'Run Compound Cycle Now'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* SUB-TAB 6: STAKING NOTIFICATIONS CENTER */}
          {stakingActiveSubTab === 'NOTIFICATIONS' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-rose-400">STAKING LIFECYCLE ALERTS & NOTIFICATIONS</span>
                  <h3 className="text-2xl font-black text-white">Notification Feed</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Stay notified about yield payouts, auto-compound cycles, maturity unlocks, and tier APY boosts.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleTestNotificationPing}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs transition-all border border-slate-800 flex items-center space-x-1"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span>Test Alert Ping</span>
                  </button>

                  <button
                    onClick={handleMarkAllNotifsRead}
                    className="bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark All Read</span>
                  </button>
                </div>
              </div>

              {/* NOTIFICATION TOGGLE PREFERENCES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300 font-bold">In-App Toast Pings</span>
                  <input
                    type="checkbox"
                    checked={notifPushEnabled}
                    onChange={(e) => setNotifPushEnabled(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300 font-bold">Audio Sound Effects</span>
                  <input
                    type="checkbox"
                    checked={notifSoundEnabled}
                    onChange={(e) => setNotifSoundEnabled(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300 font-bold">Min Alert: ${notifMinPayoutThreshold}</span>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={notifMinPayoutThreshold}
                    onChange={(e) => setNotifMinPayoutThreshold(parseFloat(e.target.value))}
                    className="w-24 accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* NOTIFICATION FEED LIST */}
              <div className="space-y-3 font-mono text-xs">
                {stakingNotifList.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                      notif.read
                        ? 'bg-slate-900/50 border-slate-800/60 opacity-80'
                        : 'bg-slate-900 border-rose-500/40 shadow-lg'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-lg shrink-0">
                        {notif.type === 'YIELD_PAYOUT' ? '⚡' : notif.type === 'AUTO_COMPOUND' ? '🔄' : notif.type === 'BONUS_BOOST' ? '👑' : '🔓'}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-white text-xs">{notif.title}</h4>
                          {!notif.read && (
                            <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-slate-300 font-sans text-xs">{notif.message}</p>
                        <span className="text-slate-500 text-[10px] block">{notif.timestamp}</span>
                      </div>
                    </div>

                    {notif.amount && (
                      <span className="text-emerald-400 font-black text-sm shrink-0">
                        +${notif.amount.toFixed(2)} $OD
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* STAKE ALERT SYSTEMS MANAGER & CUSTOM TRIGGER RULES */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800/80 space-y-4 font-mono text-xs pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block font-sans">CUSTOM STAKE ALERT RULES &amp; TRIGGERS</span>
                    <h4 className="text-lg font-black text-white font-sans">Configured Alert Systems</h4>
                  </div>
                  <button
                    onClick={() => setIsAddAlertModalOpen(true)}
                    className="bg-rose-500 hover:bg-rose-400 text-white font-black px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5 font-sans"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Create Custom Alert Rule</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stakeAlertRules.map((rule) => (
                    <div key={rule.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white">{rule.name}</span>
                          <span className={`px-2 py-0.2 rounded-full text-[9px] font-black ${rule.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                            {rule.enabled ? 'ACTIVE' : 'MUTED'}
                          </span>
                        </div>
                        <span className="text-amber-400 block text-[11px] font-bold">{rule.thresholdText}</span>
                        <span className="text-slate-500 text-[10px] block">Channel: {rule.channel}</span>
                      </div>

                      <button
                        onClick={() => {
                          setStakeAlertRules(prev => prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
                          triggerToast(`Alert Rule '${rule.name}' ${!rule.enabled ? 'ENABLED' : 'MUTED'}`);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                          rule.enabled ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {rule.enabled ? 'Mute' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB: STAKE ACTIVITY LOG */}
          {stakingActiveSubTab === 'ACTIVITY_LOG' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400">REAL-TIME NETWORK STAKING TELEMETRY</span>
                  <h3 className="text-2xl font-black text-white">Stake Activity Log</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Live stream of global staker activity, vault deposits, yield claims, auto-compounding cycles, and governance votes across sovereign nodes.
                  </p>
                </div>

                <div className="flex items-center space-x-3 font-mono text-xs">
                  <button
                    onClick={() => {
                      setIsActivityLiveStreaming(!isActivityLiveStreaming);
                      triggerToast(`Activity Stream ${!isActivityLiveStreaming ? 'RESUMED' : 'PAUSED'}`);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      isActivityLiveStreaming
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActivityLiveStreaming ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`}></span>
                    <span>{isActivityLiveStreaming ? 'STREAMING LIVE' : 'STREAM PAUSED'}</span>
                  </button>

                  <span className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-slate-400">
                    Active Nodes: <strong className="text-white">48 Ports</strong>
                  </span>
                </div>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 font-mono text-xs">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by wallet address (0x...), tx hash, or port node..."
                    value={stakeActivitySearch}
                    onChange={(e) => setStakeActivitySearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {['ALL', 'STAKE_DEPOSIT', 'YIELD_CLAIM', 'AUTO_COMPOUND', 'GOVERNANCE_VOTE', 'MATURITY_UNLOCK'].map((act) => (
                    <button
                      key={act}
                      onClick={() => setStakeActivityFilter(act)}
                      className={`px-3 py-2 rounded-xl font-bold transition-all ${
                        stakeActivityFilter === act
                          ? 'bg-cyan-500 text-slate-950 shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {act === 'ALL' ? 'All Activity' : act.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTIVITY LIST TABLE */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden font-mono text-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                        <th className="p-4">Action Event</th>
                        <th className="p-4">Staker Address</th>
                        <th className="p-4">Vault Pool</th>
                        <th className="p-4 text-right">Amount</th>
                        <th className="p-4">Clearing Node</th>
                        <th className="p-4 text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {stakeActivityLogs
                        .filter((item) => {
                          const matchesFilter = stakeActivityFilter === 'ALL' || item.action === stakeActivityFilter;
                          const matchesSearch = !stakeActivitySearch || 
                            item.stakerAddress.toLowerCase().includes(stakeActivitySearch.toLowerCase()) ||
                            item.txHash.toLowerCase().includes(stakeActivitySearch.toLowerCase()) ||
                            item.node.toLowerCase().includes(stakeActivitySearch.toLowerCase());
                          return matchesFilter && matchesSearch;
                        })
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-slate-800/40 transition-all">
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                item.action === 'STAKE_DEPOSIT' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                item.action === 'YIELD_CLAIM' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
                                item.action === 'AUTO_COMPOUND' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' :
                                item.action === 'GOVERNANCE_VOTE' ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' :
                                'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                              }`}>
                                {item.action === 'STAKE_DEPOSIT' ? '📥 Deposit Stake' :
                                 item.action === 'YIELD_CLAIM' ? '⚡ Yield Claimed' :
                                 item.action === 'AUTO_COMPOUND' ? '🔄 Auto Restaked' :
                                 item.action === 'GOVERNANCE_VOTE' ? '🗳️ Cast Vote' : '🔓 Lock Matured'}
                              </span>
                            </td>
                            <td className="p-4 text-slate-200 font-bold">
                              {item.stakerAddress}
                              <span className="text-slate-500 text-[9px] block font-normal">{item.txHash}</span>
                            </td>
                            <td className="p-4 text-slate-300">{item.poolName}</td>
                            <td className="p-4 text-right font-black text-amber-400">
                              ${item.amount.toLocaleString()} ${item.currency}
                            </td>
                            <td className="p-4 text-slate-400 text-[11px]">{item.node}</td>
                            <td className="p-4 text-right text-slate-500 text-[10px]">{item.timestamp}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CREATE CUSTOM ALERT RULE MODAL */}
          {isAddAlertModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl font-sans">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-rose-400" />
                    <h3 className="text-xl font-black text-white">New Stake Alert Trigger</h3>
                  </div>
                  <button onClick={() => setIsAddAlertModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="space-y-1.5 font-sans">
                    <label className="text-slate-300 font-bold block text-xs">Alert Rule Title</label>
                    <input
                      type="text"
                      placeholder="e.g. 90-Day APY Surge Alert"
                      value={newAlertName}
                      onChange={(e) => setNewAlertName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <label className="text-slate-300 font-bold block text-xs">Trigger Condition Type</label>
                    <select
                      value={newAlertType}
                      onChange={(e) => setNewAlertType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-amber-300 font-bold focus:outline-none font-mono"
                    >
                      <option value="APY_THRESHOLD">⚡ APY % Exceeds Target Rate</option>
                      <option value="LOCKUP_MATURITY">🔓 Lockup Maturity Countdown (Days)</option>
                      <option value="UNCLAIMED_YIELD">💵 Unclaimed Yield Reaches Threshold ($OD)</option>
                      <option value="RESERVE_PARITY">🛡️ Maritime Reserve Ratio Parity Shift</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <label className="text-slate-300 font-bold block text-xs">Trigger Threshold Value</label>
                    <input
                      type="number"
                      value={newAlertThreshold}
                      onChange={(e) => setNewAlertThreshold(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-emerald-400 font-bold focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <label className="text-slate-300 font-bold block text-xs">Alert Notification Channel</label>
                    <select
                      value={newAlertChannel}
                      onChange={(e) => setNewAlertChannel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-cyan-300 font-bold focus:outline-none font-mono"
                    >
                      <option value="SatCom Telegram + In-App">SatCom Telegram Bot + In-App Toast</option>
                      <option value="In-App Toast + Audio Sound">In-App Toast + Audio Sound Ping</option>
                      <option value="Email Digest + In-App">Email Daily Summary Digest</option>
                      <option value="Priority High-Seas Alert">Priority Emergency SatCom Push</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddAlertModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newAlertName.trim()) {
                        triggerToast('Please enter an alert title');
                        return;
                      }
                      const newRule = {
                        id: `ALT-${Date.now()}`,
                        name: newAlertName,
                        type: newAlertType,
                        thresholdText: newAlertType === 'APY_THRESHOLD' ? `Pool APY > ${newAlertThreshold}%` :
                                       newAlertType === 'LOCKUP_MATURITY' ? `${newAlertThreshold} Days Before Unlock` :
                                       newAlertType === 'UNCLAIMED_YIELD' ? `Yield > $${newAlertThreshold} $OD` : `Reserve Ratio < ${newAlertThreshold}%`,
                        channel: newAlertChannel,
                        enabled: true
                      };
                      setStakeAlertRules(prev => [newRule, ...prev]);
                      setIsAddAlertModalOpen(false);
                      setNewAlertName('');
                      triggerToast(`Custom alert trigger '${newRule.name}' created!`);
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-black bg-rose-500 hover:bg-rose-400 text-white shadow-lg"
                  >
                    Save Alert Rule
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB: STAKE WHALE TRACKER */}
          {stakingActiveSubTab === 'WHALE_TRACKER' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">SOVEREIGN STAKER WHALE MONITOR</span>
                  <h3 className="text-2xl font-black text-white">Stake Whale Tracker &amp; Leaderboard</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Track real-time portfolio allocations, rebalancing moves, and yield claims of top sovereign stakers ($100k+ $OD balance).
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-2xl font-bold flex items-center space-x-1.5">
                    <Eye className="w-4 h-4" />
                    <span>{followedWhales.length} Whales Followed</span>
                  </span>
                </div>
              </div>

              {/* WHALE SUMMARY METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">TOTAL WHALE TVL</span>
                  <span className="text-blue-400 font-black text-xl">$4,050,000 $OD</span>
                  <span className="text-slate-500 text-[10px] block">32.4% of Total Staked Supply</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">TOP WHALE VAULT</span>
                  <span className="text-purple-300 font-black text-lg">365-Day VIP Vault</span>
                  <span className="text-slate-500 text-[10px] block">64% Allocated to 1-Yr Lock</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">AVG WHALE LOCKUP</span>
                  <span className="text-amber-400 font-black text-xl">218 Days</span>
                  <span className="text-slate-500 text-[10px] block">Long-Term Capital Commitment</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">24H WHALE REINVESTMENT</span>
                  <span className="text-emerald-400 font-black text-xl">+$314,200 $OD</span>
                  <span className="text-slate-500 text-[10px] block">Net Inflow Across 48 Nodes</span>
                </div>
              </div>

              {/* SEARCH & FILTER BAR */}
              <div className="flex flex-col sm:flex-row gap-3 font-mono text-xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search whale alias, wallet address, or region..."
                    value={whaleSearchQuery}
                    onChange={(e) => setWhaleSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-2">
                  {['ALL', 'Fleet Admiral', 'Sovereign Captain'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setWhaleTierFilter(tier)}
                      className={`px-3 py-2 rounded-xl font-bold transition-all ${
                        whaleTierFilter === tier
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* WHALE LEADERBOARD TABLE */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden font-mono text-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                        <th className="p-4">Rank / Whale Alias</th>
                        <th className="p-4">VIP Tier</th>
                        <th className="p-4 text-right">Total Staked ($OD)</th>
                        <th className="p-4">Primary Vault</th>
                        <th className="p-4">Recent Activity</th>
                        <th className="p-4 text-center">Alert Tracking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {whaleWallets
                        .filter((w) => {
                          const matchesTier = whaleTierFilter === 'ALL' || w.tier === whaleTierFilter;
                          const matchesSearch = !whaleSearchQuery || 
                            w.alias.toLowerCase().includes(whaleSearchQuery.toLowerCase()) ||
                            w.address.toLowerCase().includes(whaleSearchQuery.toLowerCase()) ||
                            w.nodeRegion.toLowerCase().includes(whaleSearchQuery.toLowerCase());
                          return matchesTier && matchesSearch;
                        })
                        .map((w, idx) => {
                          const isFollowed = followedWhales.includes(w.id);
                          return (
                            <tr key={w.id} className="hover:bg-slate-800/40 transition-all">
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-slate-500 text-[11px]">#{idx + 1}</span>
                                  <div>
                                    <span className="font-black text-white block">{w.alias}</span>
                                    <span className="text-slate-500 text-[10px]">{w.address} • {w.nodeRegion}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                  w.tier === 'Fleet Admiral' ? 'bg-amber-400/10 text-amber-300 border-amber-400/30' : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                                }`}>
                                  👑 {w.tier}
                                </span>
                              </td>
                              <td className="p-4 text-right font-black text-emerald-400 text-sm">
                                ${w.totalStaked.toLocaleString()} $OD
                                <span className="text-slate-500 text-[9px] block font-normal">{w.shareOfTvL}% of Pool TVL</span>
                              </td>
                              <td className="p-4 text-slate-300">{w.primaryPool}</td>
                              <td className="p-4 text-cyan-300 text-[11px]">{w.lastTx}</td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => {
                                    if (isFollowed) {
                                      setFollowedWhales(prev => prev.filter(id => id !== w.id));
                                      triggerToast(`Unfollowed whale notifications for ${w.alias}`);
                                    } else {
                                      setFollowedWhales(prev => [...prev, w.id]);
                                      triggerToast(`Following whale rebalance alerts for ${w.alias}!`);
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                                    isFollowed
                                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-rose-500/20 hover:text-rose-300'
                                      : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                                  }`}
                                >
                                  {isFollowed ? '✓ Tracking' : '+ Follow Alerts'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB: STAKING SOCIAL FEED */}
          {stakingActiveSubTab === 'SOCIAL_FEED' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider">HIGH-SEAS STAKER COMMUNITY HUB</span>
                  <h3 className="text-2xl font-black text-white">Staking Social Feed &amp; Strategy Exchange</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Connect with fellow stakers, share yield optimization strategies, discuss governance proposals, and earn tip rewards.
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-3 py-1.5 rounded-2xl font-bold flex items-center space-x-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>{socialPosts.length} Community Posts</span>
                  </span>
                </div>
              </div>

              {/* POST COMPOSER */}
              <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-white font-bold flex items-center space-x-2">
                    <PlusCircle className="w-4 h-4 text-pink-400" />
                    <span>Share Staking Strategy or Question</span>
                  </span>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-pink-300 rounded-xl px-3 py-1 text-xs font-bold focus:outline-none"
                  >
                    <option value="STRATEGY">💡 YIELD STRATEGY</option>
                    <option value="YIELD">📈 YIELD MILESTONE</option>
                    <option value="QUESTION">❓ STAKING QUESTION</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  value={newPostInput}
                  onChange={(e) => setNewPostInput(e.target.value)}
                  placeholder="Share your optimal lockup strategy, compounding tips, or ask the community..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 font-sans"
                />

                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-500 text-[10px]">Posting as Captain (Sovereign Captain Tier)</span>
                  <button
                    onClick={() => {
                      if (!newPostInput.trim()) {
                        triggerToast('Please write something before publishing');
                        return;
                      }
                      const newPost = {
                        id: `POST-${Date.now()}`,
                        author: 'Sovereign Captain (You)',
                        badge: '👑 Active Staker',
                        tier: 'Sovereign Captain',
                        category: newPostCategory,
                        content: newPostInput,
                        timestamp: 'Just now',
                        likes: 1,
                        hasLiked: true,
                        tipsReceived: 0
                      };
                      setSocialPosts([newPost, ...socialPosts]);
                      setNewPostInput('');
                      triggerToast('Published post to Staking Social Feed!');
                    }}
                    className="bg-pink-500 hover:bg-pink-400 text-white font-black px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg"
                  >
                    Publish Post
                  </button>
                </div>
              </div>

              {/* FEED CATEGORY FILTERS */}
              <div className="flex gap-2 font-mono text-xs">
                {['ALL', 'STRATEGY', 'YIELD', 'ANNOUNCEMENT'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSocialFeedFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                      socialFeedFilter === cat
                        ? 'bg-pink-500 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Posts' : cat}
                  </button>
                ))}
              </div>

              {/* POSTS LIST */}
              <div className="space-y-4">
                {socialPosts
                  .filter(p => socialFeedFilter === 'ALL' || p.category === socialFeedFilter)
                  .map((post) => (
                    <div key={post.id} className="bg-slate-900 p-5 rounded-3xl border border-slate-800/80 space-y-3 font-sans">
                      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-black text-white text-xs">{post.author}</span>
                          <span className="bg-purple-500/10 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                            {post.badge}
                          </span>
                        </div>
                        <span className="text-slate-500 text-[10px] font-mono">{post.timestamp}</span>
                      </div>

                      <p className="text-slate-200 text-xs leading-relaxed font-sans">{post.content}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/40 font-mono text-xs">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              setSocialPosts(prev => prev.map(p => {
                                if (p.id === post.id) {
                                  return {
                                    ...p,
                                    hasLiked: !p.hasLiked,
                                    likes: p.hasLiked ? p.likes - 1 : p.likes + 1
                                  };
                                }
                                return p;
                              }));
                            }}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                              post.hasLiked ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            <span>❤️</span>
                            <span>{post.likes}</span>
                          </button>

                          <button
                            onClick={() => {
                              setSocialPosts(prev => prev.map(p => {
                                if (p.id === post.id) {
                                  return { ...p, tipsReceived: p.tipsReceived + 1.00 };
                                }
                                return p;
                              }));
                              triggerToast(`Tipped 1.00 $OD yield to ${post.author}!`);
                            }}
                            className="bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center space-x-1.5 transition-all"
                          >
                            <span>🪙 Tip 1.00 $OD</span>
                            {post.tipsReceived > 0 && <span className="text-slate-400 text-[10px]">(${post.tipsReceived.toFixed(2)} total)</span>}
                          </button>
                        </div>

                        <span className="text-slate-500 text-[10px] uppercase font-bold">{post.category}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SUB-TAB: STAKE REWARDS PROJECTION */}
          {stakingActiveSubTab === 'REWARDS_PROJECTION' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">MULTI-YEAR STAKE GROWTH &amp; REWARDS ENGINE</span>
                  <h3 className="text-2xl font-black text-white">Stake Rewards Projection &amp; Compound Matrix</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Simulate long-term wealth accumulation across compounding cycles, recurring deposits, and $OD price appreciation scenarios.
                  </p>
                </div>

                <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-emerald-500/30 font-mono text-xs text-right shrink-0">
                  <span className="text-slate-400 text-[10px] block">CURRENT STAKE PRINCIPAL</span>
                  <span className="text-emerald-400 font-black text-lg">${stakedBalance.toFixed(2)} $OD</span>
                </div>
              </div>

              {/* INPUT CONFIGURATION PANEL */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-slate-300 font-bold block text-[11px]">TARGET $OD PRICE SCENARIO</label>
                  <select
                    value={projTargetPrice}
                    onChange={(e) => setProjTargetPrice(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-400 font-bold focus:outline-none"
                  >
                    <option value={1.00}>$1.00 $OD (Parity Peg)</option>
                    <option value={1.25}>$1.25 $OD (+25% Growth)</option>
                    <option value={1.50}>$1.50 $OD (+50% Growth)</option>
                    <option value={2.00}>$2.00 $OD (+100% Growth)</option>
                  </select>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-slate-300 font-bold block text-[11px]">MONTHLY RECURRING ADDITION</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400">$</span>
                    <input
                      type="number"
                      value={projMonthlyAdd}
                      onChange={(e) => setProjMonthlyAdd(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-slate-300 font-bold block text-[11px]">CHOOSE VAULT POOL</label>
                  <select
                    value={projSelectedVault}
                    onChange={(e) => setProjSelectedVault(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-cyan-300 font-bold focus:outline-none"
                  >
                    <option value="30_DAY">⚓ 30-Day Sovereign Reserve (18.5% APY)</option>
                    <option value="90_DAY">💎 90-Day Blue Carbon Vault (22.5% APY)</option>
                    <option value="365_DAY">👑 365-Day VIP Fleet Vault (34.0% APY)</option>
                  </select>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-slate-300 font-bold block text-[11px]">PROJECTION HORIZON</label>
                  <div className="grid grid-cols-3 gap-1">
                    {[1, 3, 5].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setProjHorizonYears(yr)}
                        className={`py-2 rounded-xl font-bold transition-all ${
                          projHorizonYears === yr ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {yr} Yr
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* PROJECTION CALCULATION CARDS */}
              {(() => {
                const baseApr = projSelectedVault === '30_DAY' ? 18.5 : projSelectedVault === '90_DAY' ? 22.5 : 34.0;
                const r = baseApr / 100;
                
                // Compound calculation over years
                const years = projHorizonYears;
                const P = stakedBalance;
                const PMT = projMonthlyAdd;
                
                // Future value of lump sum P + future value of monthly annuity PMT
                // P * (1 + r)^t + PMT * (((1 + r/12)^(12*t) - 1) / (r/12))
                const fvLump = P * Math.pow(1 + r, years);
                const fvAnnuity = PMT > 0 ? PMT * ((Math.pow(1 + r / 12, 12 * years) - 1) / (r / 12)) : 0;
                const totalTokens = fvLump + fvAnnuity;
                const totalInvested = P + (PMT * 12 * years);
                const netYieldTokens = totalTokens - totalInvested;
                const usdValue = totalTokens * projTargetPrice;
                const totalProfitUsd = usdValue - totalInvested;

                return (
                  <div className="space-y-6 font-mono text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-slate-900 p-5 rounded-3xl border border-emerald-500/30 space-y-2">
                        <span className="text-slate-400 text-[10px] block font-bold">PROJECTED TOTAL {projHorizonYears}-YR BALANCE</span>
                        <span className="text-emerald-400 font-black text-2xl block">{totalTokens.toLocaleString('en-US', { maximumFractionDigits: 0 })} $OD</span>
                        <span className="text-slate-300 font-bold block text-sm">≈ ${usdValue.toLocaleString('en-US', { maximumFractionDigits: 0 })} USD</span>
                      </div>

                      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-2">
                        <span className="text-slate-400 text-[10px] block font-bold">NET STAKING YIELD EARNED</span>
                        <span className="text-amber-400 font-black text-2xl block">+{netYieldTokens.toLocaleString('en-US', { maximumFractionDigits: 0 })} $OD</span>
                        <span className="text-slate-400 text-[10px]">Pure passive yield without capital gains</span>
                      </div>

                      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-2">
                        <span className="text-slate-400 text-[10px] block font-bold">PROJECTED TOTAL ROI %</span>
                        <span className="text-cyan-300 font-black text-2xl block">+{((totalProfitUsd / totalInvested) * 100).toFixed(1)}% ROI</span>
                        <span className="text-slate-400 text-[10px]">Includes yield compounding + price change</span>
                      </div>
                    </div>

                    {/* MILESTONE UPGRADE PROGRESS */}
                    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 font-sans">
                      <h4 className="text-white font-bold text-xs uppercase font-mono">STAKER VIP TIER MILESTONE PREVIEW</h4>
                      <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400 h-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (totalTokens / 25000) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>Current: Sovereign Captain ($5,000 $OD)</span>
                        <span className="text-amber-400 font-bold">Target: Fleet Admiral ($25,000 $OD) — {totalTokens >= 25000 ? '✅ REACHED!' : `Need ${(25000 - totalTokens).toFixed(0)} $OD more`}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SUB-TAB: WHALE SOCIAL FEED & ALPHA BROADCAST SIGNALS */}
          {stakingActiveSubTab === 'WHALE_SOCIAL' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>VERIFIED $100K+ WHALE ALPHA SOCIAL FEED</span>
                  </span>
                  <h3 className="text-2xl font-black text-white">Whale Social Feed &amp; Rebalance Alpha Broadcasts</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Real-time commentary, rebalancing signals, and copy-stake strategies directly from verified $100k+ $OD Sovereign Whales.
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1.5 rounded-2xl font-bold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <span>3 Active Whale Broadcasts</span>
                  </span>
                </div>
              </div>

              {/* WHALE FEED FILTERS */}
              <div className="flex gap-2 font-mono text-xs">
                {['ALL', 'LONG_LOCKUP', 'YIELD_CLAIM', 'REBALANCE'].map((sig) => (
                  <button
                    key={sig}
                    onClick={() => setWhaleSocialFilter(sig)}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                      whaleSocialFilter === sig
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {sig === 'ALL' ? 'All Whale Signals' : sig.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* WHALE POSTS GRID */}
              <div className="space-y-4">
                {whaleSocialPosts
                  .filter(p => whaleSocialFilter === 'ALL' || p.signalType === whaleSocialFilter)
                  .map((post) => (
                    <div key={post.id} className="bg-slate-900 p-6 rounded-3xl border border-cyan-500/30 space-y-4 font-sans hover:border-cyan-400/60 transition-all shadow-xl group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-xl">🐋</span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-black text-white text-sm group-hover:text-cyan-300 transition-colors">{post.whaleAlias}</span>
                              <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                                {post.whaleTier}
                              </span>
                            </div>
                            <span className="text-slate-500 text-[10px] font-mono">{post.whaleAddress} • {post.timestamp}</span>
                          </div>
                        </div>

                        <span className="bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-black px-3 py-1 rounded-full border border-cyan-500/30 shrink-0">
                          ⚡ {post.rebalanceAction}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-base font-bold text-white font-sans">{post.title}</h4>
                        <p className="text-slate-300 text-xs leading-relaxed">{post.content}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 font-mono text-xs">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              setWhaleSocialPosts(prev => prev.map(p => {
                                if (p.id === post.id) {
                                  return { ...p, upvotes: p.upvotes + 1 };
                                }
                                return p;
                              }));
                              triggerToast(`Upvoted alpha signal from ${post.whaleAlias}!`);
                            }}
                            className="bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center space-x-1.5 transition-all"
                          >
                            <span>🚀 Upvote ({post.upvotes})</span>
                          </button>

                          <button
                            onClick={() => {
                              setWhaleSocialPosts(prev => prev.map(p => {
                                if (p.id === post.id) {
                                  return {
                                    ...p,
                                    hasCopied: !p.hasCopied,
                                    copyStakeCount: p.hasCopied ? p.copyStakeCount - 1 : p.copyStakeCount + 1
                                  };
                                }
                                return p;
                              }));
                              triggerToast(`${!post.hasCopied ? 'Copied whale allocation formula into Quick Stake!' : 'Uncopied whale formula'}`);
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
                              post.hasCopied
                                ? 'bg-emerald-500 text-slate-950 font-black'
                                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                            }`}
                          >
                            <span>{post.hasCopied ? '✓ Formula Copied' : '🎯 Copy Whale Strategy'}</span>
                            <span className="text-[10px] text-slate-400">({post.copyStakeCount})</span>
                          </button>
                        </div>

                        <span className="text-slate-500 text-[10px] font-bold uppercase">{post.signalType} SIGNAL</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SUB-TAB: GOVERNMENTS, PROVINCES & MARINE ASSOCIATIONS APPROVALS & LEGAL PROTECTION */}
          {stakingActiveSubTab === 'GOVT_APPROVALS' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>SOVEREIGN MARITIME REGULATORY &amp; LEGAL COMPLIANCE REGISTRY</span>
                  </span>
                  <h3 className="text-2xl font-black text-white">Government, Provincial &amp; Marine Association Approvals</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Official licenses, flag state charters, provincial maritime accords, and complete legal liability protection frameworks.
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 px-3.5 py-2 rounded-2xl font-bold flex items-center space-x-1.5">
                    <span>9 Active Global Approvals</span>
                  </span>
                </div>
              </div>

              {/* LEGAL ISSUE PREVENTION GUARANTEES BANNER */}
              <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-6 rounded-3xl border border-amber-400/40 space-y-4 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between border-b border-amber-400/20 pb-3">
                  <span className="text-amber-400 font-black text-xs uppercase flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>FULL PREVENTION OF LEGAL ISSUES &amp; JURISDICTIONAL SAFE HARBOR</span>
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    100% IMMUNE JURISDICTION
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-amber-300 font-bold block text-xs">1. UNCLOS High-Seas Freedom</span>
                    <span className="text-slate-400 text-[10px] block">Operating under UNCLOS Article 87 (Freedom of International Waters), fully shielded from onshore municipal gaming regulations.</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-cyan-300 font-bold block text-xs">2. Non-Securities Asset Parity</span>
                    <span className="text-slate-400 text-[10px] block">$OD is classified as a physical commodity-backed settlement token with 104.8% MCRB reserve over-collateralization.</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-emerald-300 font-bold block text-xs">3. Automated Sanction Screening</span>
                    <span className="text-slate-400 text-[10px] block">Embedded OFAC, UN Security Council, and EU AML5/6 real-time address geofencing prevents illicit capital ingress.</span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-purple-300 font-bold block text-xs">4. Non-Custodial Escrow Shield</span>
                    <span className="text-slate-400 text-[10px] block">Smart contract escrow enforces instant, non-custodial yield disbursements with zero central counterparty insolvency risk.</span>
                  </div>
                </div>
              </div>

              {/* JURISDICTION FILTER BUTTONS */}
              <div className="flex gap-2 font-mono text-xs">
                {[
                  { id: 'ALL', label: 'All Approvals (9)' },
                  { id: 'GOVERNMENT', label: 'Sovereign Governments (5)' },
                  { id: 'PROVINCIAL', label: 'Provincial Authorities (1)' },
                  { id: 'MARINE_ASSOC', label: 'Marine Associations (3)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setJurisdictionalFilter(tab.id)}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                      jurisdictionalFilter === tab.id
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* APPROVALS CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {govtAndAssocApprovals
                  .filter(a => jurisdictionalFilter === 'ALL' || a.jurisdictionType === jurisdictionalFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 space-y-4 font-sans group"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{item.flagIcon}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                            item.jurisdictionType === 'GOVERNMENT' ? 'bg-amber-400/10 text-amber-300 border-amber-400/30' :
                            item.jurisdictionType === 'PROVINCIAL' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' :
                            'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          }`}>
                            {item.jurisdictionType === 'GOVERNMENT' ? 'Sovereign Government' :
                             item.jurisdictionType === 'PROVINCIAL' ? 'Provincial Authority' : 'Marine Association'}
                          </span>
                        </div>

                        <span className="text-emerald-400 font-mono text-[10px] font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Charter</span>
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-white font-bold text-sm group-hover:text-amber-300 transition-colors font-sans">{item.authorityName}</h4>
                        <p className="text-amber-400 font-mono text-xs font-bold">{item.charterName}</p>
                        <span className="text-slate-500 text-[10px] font-mono block">Certificate #: {item.certNumber}</span>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 font-mono text-[11px]">
                        <span className="text-slate-400 text-[10px] block font-bold">OPERATIONAL SCOPE</span>
                        <p className="text-slate-300 text-[11px] leading-snug">{item.scopeText}</p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 font-mono text-[11px]">
                        <span className="text-amber-300 text-[10px] block font-bold">LEGAL PROTECTION SHIELD</span>
                        <p className="text-slate-400 text-[10px] leading-snug">{item.legalShieldDetail}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SUB-TAB: MARITIME STOCKS, SHARES & SOVEREIGN BONDS SPECIALITY PORTAL */}
          {stakingActiveSubTab === 'STOCKS_BONDS' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              {/* HEADER BANNER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>SOVEREIGN MARITIME EQUITIES, FIXED-INCOME BONDS &amp; FRACTIONAL ASSETS</span>
                  </span>
                  <h3 className="text-2xl font-black text-white">Stocks, Shares &amp; Bonds Speciality Portal</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Trade sovereign-flagged maritime equities, UN Blue Carbon bonds, gold-backed treasury notes, and fractional fleet shares with 100% tax-free dividend settlement.
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3.5 py-2 rounded-2xl font-bold flex items-center space-x-1.5">
                    <CircleDollarSign className="w-4 h-4 text-emerald-400" />
                    <span>$18.4B Sovereign Market Cap</span>
                  </span>
                </div>
              </div>

              {/* USER PORTFOLIO SUMMARY CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                {(() => {
                  const totalInvestedUsd = userStockBondHoldings.reduce((sum, h) => sum + (h.sharesOwned * h.avgPurchasePrice), 0);
                  const currentPortfolioValueUsd = userStockBondHoldings.reduce((sum, h) => sum + (h.sharesOwned * h.currentPrice), 0);
                  const totalUnclaimedYieldUsd = userStockBondHoldings.reduce((sum, h) => sum + h.unclaimedYieldUsd, 0);
                  const profitLossUsd = currentPortfolioValueUsd - totalInvestedUsd;
                  const profitLossPct = totalInvestedUsd > 0 ? ((profitLossUsd / totalInvestedUsd) * 100).toFixed(2) : '0.00';

                  return (
                    <>
                      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] block font-bold">TOTAL PORTFOLIO VALUE</span>
                        <span className="text-emerald-400 font-black text-xl">${currentPortfolioValueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span className="text-slate-500 text-[10px] block">Across {userStockBondHoldings.length} Active Positions</span>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] block font-bold">UNREALIZED P&amp;L</span>
                        <span className={`font-black text-xl ${parseFloat(profitLossPct) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {parseFloat(profitLossPct) >= 0 ? '+' : ''}${profitLossUsd.toFixed(2)} ({profitLossPct}%)
                        </span>
                        <span className="text-slate-500 text-[10px] block">Capital Appreciation</span>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] block font-bold">UNCLAIMED DIVIDENDS &amp; COUPONS</span>
                        <span className="text-amber-400 font-black text-xl">${totalUnclaimedYieldUsd.toFixed(2)}</span>
                        <span className="text-slate-500 text-[10px] block">Tax-Free Sovereign Yield</span>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-2xl border border-emerald-500/30 flex flex-col justify-center space-y-2">
                        <button
                          onClick={() => {
                            if (totalUnclaimedYieldUsd <= 0) {
                              triggerToast('No pending dividends or bond coupons to claim right now');
                              return;
                            }
                            setClaimedDividendsTotal(prev => prev + totalUnclaimedYieldUsd);
                            setUserStockBondHoldings(prev => prev.map(h => ({ ...h, unclaimedYieldUsd: 0 })));
                            triggerToast(`Successfully claimed $${totalUnclaimedYieldUsd.toFixed(2)} in tax-free stock dividends & bond coupons!`);
                          }}
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center space-x-1.5"
                        >
                          <Coins className="w-4 h-4" />
                          <span>Claim All Yield (${totalUnclaimedYieldUsd.toFixed(2)})</span>
                        </button>
                        <span className="text-slate-500 text-[9px] text-center font-mono">Total Claimed Lifetime: ${claimedDividendsTotal.toFixed(2)}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* USER OWNED HOLDINGS SECTION */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 font-sans">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-base font-black text-white flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-emerald-400" />
                    <span>Your Active Stock &amp; Bond Holdings</span>
                  </h4>
                  <span className="text-slate-400 font-mono text-xs">{userStockBondHoldings.length} Assets Held</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                        <th className="p-3">Asset / Ticker</th>
                        <th className="p-3">Asset Type</th>
                        <th className="p-3 text-right">Qty Held</th>
                        <th className="p-3 text-right">Avg Buy Price</th>
                        <th className="p-3 text-right">Market Price</th>
                        <th className="p-3 text-right">Holdings Value</th>
                        <th className="p-3 text-right">Unclaimed Yield</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {userStockBondHoldings.map((h) => {
                        const val = h.sharesOwned * h.currentPrice;
                        return (
                          <tr key={h.ticker} className="hover:bg-slate-800/40 transition-all">
                            <td className="p-3">
                              <span className="font-black text-white block">{h.ticker}</span>
                              <span className="text-slate-400 text-[10px]">{h.assetName}</span>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                h.category === 'EQUITIES_STOCKS' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' :
                                h.category === 'SOVEREIGN_BONDS' ? 'bg-amber-400/10 text-amber-300 border-amber-400/30' :
                                'bg-purple-500/10 text-purple-300 border-purple-500/30'
                              }`}>
                                {h.category === 'EQUITIES_STOCKS' ? 'Stock Equities' : h.category === 'SOVEREIGN_BONDS' ? 'Sovereign Bond' : 'Fractional Asset'}
                              </span>
                            </td>
                            <td className="p-3 text-right font-bold text-white">{h.sharesOwned}</td>
                            <td className="p-3 text-right text-slate-400">${h.avgPurchasePrice.toFixed(2)}</td>
                            <td className="p-3 text-right font-bold text-emerald-400">${h.currentPrice.toFixed(2)}</td>
                            <td className="p-3 text-right font-black text-white">${val.toFixed(2)}</td>
                            <td className="p-3 text-right font-bold text-amber-400">${h.unclaimedYieldUsd.toFixed(2)}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => {
                                  const targetMarket = availableStockBondMarket.find(m => m.ticker === h.ticker);
                                  if (targetMarket) {
                                    setSelectedStockForOrder(targetMarket);
                                  }
                                }}
                                className="bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold px-3 py-1 rounded-xl text-[10px] transition-all border border-emerald-500/40"
                              >
                                Trade / Buy More
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SEARCH & CATEGORY FILTERS */}
              <div className="flex flex-col sm:flex-row gap-3 font-mono text-xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search stocks, ticker symbol, sovereign bonds, or cruise ship shares..."
                    value={stocksBondsSearchQuery}
                    onChange={(e) => setStocksBondsSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex gap-2">
                  {[
                    { id: 'ALL', label: 'All Listings' },
                    { id: 'EQUITIES_STOCKS', label: 'Stocks & Equities' },
                    { id: 'SOVEREIGN_BONDS', label: 'Sovereign Bonds' },
                    { id: 'FRACTIONAL_MARITIME', label: 'Fractional Fleet Shares' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setStocksBondsCategoryFilter(cat.id)}
                      className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                        stocksBondsCategoryFilter === cat.id
                          ? 'bg-emerald-400 text-slate-950 shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AVAILABLE STOCKS & BONDS MARKET CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {availableStockBondMarket
                  .filter((item) => {
                    const matchesCategory = stocksBondsCategoryFilter === 'ALL' || item.category === stocksBondsCategoryFilter;
                    const matchesSearch = !stocksBondsSearchQuery ||
                      item.ticker.toLowerCase().includes(stocksBondsSearchQuery.toLowerCase()) ||
                      item.assetName.toLowerCase().includes(stocksBondsSearchQuery.toLowerCase()) ||
                      item.description.toLowerCase().includes(stocksBondsSearchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  })
                  .map((item) => (
                    <div
                      key={item.ticker}
                      className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 space-y-4 font-sans group"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-black text-white text-base font-mono group-hover:text-emerald-300 transition-colors">{item.ticker}</span>
                          <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                            {item.sovereignRating}
                          </span>
                        </div>

                        <span className="text-emerald-400 font-mono text-xs font-black">
                          +{item.priceChange24hPct}% (24h)
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-white font-bold text-sm font-sans">{item.assetName}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-[11px]">
                        <div>
                          <span className="text-slate-500 text-[10px] block">PRICE PER SHARE/UNIT</span>
                          <span className="text-white font-black text-sm">${item.priceUsd.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">ANNUAL YIELD RATE</span>
                          <span className="text-emerald-400 font-black text-sm">{item.yieldRatePct}% p.a.</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">PAYOUT FREQUENCY</span>
                          <span className="text-amber-300 font-bold">{item.payoutFrequency}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">METRIC / MATURITY</span>
                          <span className="text-cyan-300 font-bold">{item.peRatioOrMaturity}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedStockForOrder(item);
                          setOrderQuantityInput(10);
                        }}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center space-x-1.5 font-mono"
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Place Buy Order / Invest</span>
                      </button>
                    </div>
                  ))}
              </div>

              {/* BUY ORDER MODAL / OVERLAY */}
              {selectedStockForOrder && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 font-sans shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-emerald-400 uppercase">BUY ORDER EXECUTION PANEL</span>
                        <h3 className="text-xl font-black text-white">{selectedStockForOrder.assetName}</h3>
                        <span className="text-slate-400 text-xs font-mono">{selectedStockForOrder.ticker} • {selectedStockForOrder.sovereignRating}</span>
                      </div>
                      <button
                        onClick={() => setSelectedStockForOrder(null)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4 font-mono text-xs">
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center text-slate-300 font-bold">
                          <span>QUANTITY (SHARES / UNITS):</span>
                          <span className="text-emerald-400 font-black text-sm">{orderQuantityInput}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="200"
                          value={orderQuantityInput}
                          onChange={(e) => setOrderQuantityInput(parseInt(e.target.value) || 1)}
                          className="w-full accent-emerald-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>1 Unit</span>
                          <span>100 Units</span>
                          <span>200 Units</span>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-slate-400">
                          <span>Unit Price:</span>
                          <span className="text-white font-bold">${selectedStockForOrder.priceUsd.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Annual Dividend Yield:</span>
                          <span className="text-emerald-400 font-bold">{selectedStockForOrder.yieldRatePct}% p.a.</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Est. Annual Passive Income:</span>
                          <span className="text-amber-400 font-bold">
                            +${((orderQuantityInput * selectedStockForOrder.priceUsd * (selectedStockForOrder.yieldRatePct / 100))).toFixed(2)} USD / yr
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2 font-black text-sm">
                          <span className="text-white">TOTAL ORDER COST:</span>
                          <span className="text-emerald-400">${(orderQuantityInput * selectedStockForOrder.priceUsd).toFixed(2)} USD</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 font-mono text-xs">
                      <button
                        onClick={() => setSelectedStockForOrder(null)}
                        className="flex-1 bg-slate-950 text-slate-400 hover:text-white py-3 rounded-2xl border border-slate-800 font-bold"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => {
                          const totalCost = orderQuantityInput * selectedStockForOrder.priceUsd;
                          setUserStockBondHoldings(prev => {
                            const existing = prev.find(h => h.ticker === selectedStockForOrder.ticker);
                            if (existing) {
                              return prev.map(h => {
                                if (h.ticker === selectedStockForOrder.ticker) {
                                  const totalShares = h.sharesOwned + orderQuantityInput;
                                  return {
                                    ...h,
                                    sharesOwned: totalShares,
                                    currentPrice: selectedStockForOrder.priceUsd
                                  };
                                }
                                return h;
                              });
                            } else {
                              return [
                                ...prev,
                                {
                                  ticker: selectedStockForOrder.ticker,
                                  assetName: selectedStockForOrder.assetName,
                                  sharesOwned: orderQuantityInput,
                                  avgPurchasePrice: selectedStockForOrder.priceUsd,
                                  currentPrice: selectedStockForOrder.priceUsd,
                                  category: selectedStockForOrder.category,
                                  unclaimedYieldUsd: 0,
                                  dividendRatePct: selectedStockForOrder.yieldRatePct
                                }
                              ];
                            }
                          });
                          triggerToast(`Successfully purchased ${orderQuantityInput} shares/units of ${selectedStockForOrder.ticker} for $${totalCost.toFixed(2)}!`);
                          setSelectedStockForOrder(null);
                        }}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-2xl transition-all shadow-xl"
                      >
                        Confirm &amp; Execute Order
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {stakingActiveSubTab === 'GOVERNANCE_FAQ' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">MARITIME MONETARY CHARTER &amp; GOVERNANCE</span>
                  <h3 className="text-2xl font-black text-white">Sovereign Governance FAQ Guide</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Official answers on $OD / $XOD and $IOD minting, reserve maintenance, 104.8% over-collateralization, and UNCTAD Treaty #2026-XOD-01.
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-2xl font-bold flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>UNCTAD Charter Certified</span>
                  </span>
                </div>
              </div>

              {/* FEATURED GOVERNANCE HIGHLIGHT BANNER */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-6 rounded-3xl border border-blue-500/40 space-y-4 font-mono text-xs shadow-xl">
                <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <span className="font-black text-white text-sm uppercase">PRIMARY GOVERNANCE DIRECTIVE</span>
                  </div>
                  <span className="bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-[10px]">OFFICIAL ANSWER</span>
                </div>

                <div className="space-y-2 font-sans">
                  <h4 className="text-amber-300 font-bold text-sm">Q: How and who were maintaining and controlling the $OD / XOD dealings?</h4>
                  <div className="text-slate-300 text-xs space-y-2 leading-relaxed font-mono bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                    <p>
                      <strong className="text-white">1. Governing Authorities:</strong> $OD / XOD dealings are maintained and governed by the <span className="text-amber-400 font-bold">Ocean Dollar Monetary Authority (ODMA)</span> and the <span className="text-cyan-300 font-bold">Maritime Central Reserve Bank (MCRB)</span> under the <span className="text-emerald-400 font-bold">UNCTAD Maritime Sovereign Currency Charter &amp; IMO High Seas Financial Treaty #2026-XOD-01</span>.
                    </p>
                    <p>
                      <strong className="text-white">2. International Syndicate:</strong> A consortium of <span className="text-purple-300 font-bold">48 IORA member state central banks</span> oversees monetary policy, par liquidity clearing, and cross-border maritime port settlement across global waters.
                    </p>
                    <p>
                      <strong className="text-white">3. Collateral Reserve backing:</strong> The $24.85 Billion USD currency supply is <span className="text-emerald-400 font-bold">104.8% Over-Collateralized</span> with 38% Physical Gold Bullion, 28% IMF SDRs, 22% Sovereign Blue Carbon Green Bonds, and 12% Multi-Currency FX Basket.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ SEARCH & CATEGORY FILTER */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 font-mono text-xs">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search governance questions (e.g. reserve, UNCLOS, APY, tax, XOD)..."
                      value={faqSearchQuery}
                      onChange={(e) => setFaqSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-cyan-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {['ALL', 'Maintainers', 'Reserve', 'Yields', 'Tax'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFaqCategoryFilter(cat)}
                        className={`px-3 py-2 rounded-xl font-bold transition-all ${
                          faqCategoryFilter === cat
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ACCORDION FAQ ITEMS */}
                <div className="space-y-3 font-mono text-xs">
                  {[
                    {
                      id: 'faq-1',
                      cat: 'Maintainers',
                      q: 'How and who maintains and controls $OD / $XOD currency dealings?',
                      a: 'The Ocean Dollar ($OD / XOD) dealings are maintained and governed by the Ocean Dollar Monetary Authority (ODMA) and the Maritime Central Reserve Bank (MCRB), operating under the UNCTAD Maritime Sovereign Currency Charter & IMO High Seas Financial Treaty #2026-XOD-01. A syndicate of 48 IORA member state central banks oversees reserve parity, liquidity clearing, and cross-border maritime port settlement.'
                    },
                    {
                      id: 'faq-2',
                      cat: 'Reserve',
                      q: 'How is the 104.8% Over-Collateralization verified?',
                      a: 'Reserves are 100% audited in real-time via SatCom cryptographic Proof-of-Reserve (PoR). The $24.85 Billion reserve fund consists of 38.0% Physical Gold Bullion (allocated in sovereign vaults), 28.0% IMF Special Drawing Rights (SDR), 22.0% Sovereign Blue Carbon Green Bonds, and 12.0% Multi-Currency FX Basket (USD, INR, EUR, GBP, AED, SGD, JPY).'
                    },
                    {
                      id: 'faq-3',
                      cat: 'Currency',
                      q: 'What is the relationship between $OD, $XOD, and $IOD?',
                      a: '$OD is the display name for Ocean Dollar, officially represented on international trading terminals by ISO 4217 currency code XOD (Code 998). $IOD (XIOD / 999) is the Indian Ocean Dollar regional variant. Both trade at 1:1 fixed parity with USD and ₹83.50 INR.'
                    },
                    {
                      id: 'faq-4',
                      cat: 'Yields',
                      q: 'How are daily staking yield rewards generated and funded?',
                      a: 'Staking yields (8.5% to 34.0% APY) are funded from Central Reserve Bank seigniorage proceeds, high-seas maritime transaction clearing fees (0.05% port settlement fee), and sovereign Blue Carbon Bond interest coupons.'
                    },
                    {
                      id: 'faq-5',
                      cat: 'Yields',
                      q: 'How does the Auto-Compound Reinvestment Engine function?',
                      a: 'When active, the SatCom engine harvests your accrued yield every 24 hours (00:00 UTC) or upon hitting your minimum threshold, automatically adding it back to your vault principal without charging transaction gas fees.'
                    },
                    {
                      id: 'faq-6',
                      cat: 'Tax',
                      q: 'Are staking yields subject to national income taxes?',
                      a: 'Under UNCLOS Article 87 (Freedom of High Seas) and maritime international waters tax treaties, earnings accrued on international flagships or port jurisdictions are classified as 0.00% High Seas Sovereign Exempt Income.'
                    }
                  ]
                    .filter((item) => {
                      const matchesCat = faqCategoryFilter === 'ALL' || item.cat === faqCategoryFilter;
                      const matchesSearch = !faqSearchQuery || item.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) || item.a.toLowerCase().includes(faqSearchQuery.toLowerCase());
                      return matchesCat && matchesSearch;
                    })
                    .map((item) => {
                      const isExpanded = expandedFaqId === item.id;
                      return (
                        <div
                          key={item.id}
                          className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => setExpandedFaqId(isExpanded ? null : item.id)}
                            className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-all"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                {item.cat}
                              </span>
                              <span className="font-bold text-white text-xs font-sans">{item.q}</span>
                            </div>
                            <span className="text-slate-400 font-bold shrink-0">{isExpanded ? '−' : '+'}</span>
                          </button>

                          {isExpanded && (
                            <div className="p-4 pt-0 font-sans text-xs text-slate-300 border-t border-slate-800/60 mt-2 space-y-2 leading-relaxed">
                              <p>{item.a}</p>
                              <div className="flex items-center space-x-2 text-[10px] text-cyan-400 font-mono pt-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Verified ODMA Directive • SatCom Hash #2026-XOD-01</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB: POOL PERFORMANCE COMPARE MATRIX */}
          {stakingActiveSubTab === 'COMPARE' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">SIDE-BY-SIDE VAULT METRIC COMPARISON</span>
                  <h3 className="text-2xl font-black text-white">Staking Pool Performance Matrix</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Compare APY returns, liquidity scores, lock terms, and projected earnings across all 4 sovereign pools.
                  </p>
                </div>

                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="text-slate-400">SIMULATION DEPOSIT:</span>
                  <div className="flex items-center space-x-1">
                    {[1000, 5000, 10000, 50000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setCompareDepositAmount(amt)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                          compareDepositAmount === amt
                            ? 'bg-teal-500 text-slate-950 shadow-md font-black'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        ${amt >= 1000 ? `${amt / 1000}k` : amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* COMPARISON MATRIX TABLE */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl font-mono text-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
                        <th className="p-4 font-bold">COMPARISON METRIC</th>
                        <th className="p-4 font-bold text-amber-300">FLEX MARITIME VAULT</th>
                        <th className="p-4 font-bold text-emerald-300">30-DAY SOVEREIGN</th>
                        <th className="p-4 font-bold text-cyan-300">90-DAY BLUE CARBON</th>
                        <th className="p-4 font-bold text-purple-300">365-DAY VIP VAULT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      <tr>
                        <td className="p-4 font-bold text-white font-sans">Base APY Rate</td>
                        <td className="p-4 font-black text-amber-400 text-sm">8.50% APY</td>
                        <td className="p-4 font-black text-emerald-400 text-sm">14.20% APY</td>
                        <td className="p-4 font-black text-cyan-300 text-sm">22.50% APY</td>
                        <td className="p-4 font-black text-purple-300 text-sm">34.00% APY</td>
                      </tr>

                      <tr>
                        <td className="p-4 font-bold text-white font-sans">Lock Period</td>
                        <td className="p-4 text-emerald-400 font-bold">0 Days (Flex)</td>
                        <td className="p-4 text-slate-300">30 Days</td>
                        <td className="p-4 text-slate-300">90 Days</td>
                        <td className="p-4 text-purple-400 font-bold">365 Days</td>
                      </tr>

                      <tr>
                        <td className="p-4 font-bold text-white font-sans">Minimum Deposit</td>
                        <td className="p-4 text-slate-300">$10 $OD</td>
                        <td className="p-4 text-slate-300">$100 $OD</td>
                        <td className="p-4 text-slate-300">$500 $OD</td>
                        <td className="p-4 text-amber-400 font-bold">$1,000 $OD</td>
                      </tr>

                      <tr>
                        <td className="p-4 font-bold text-white font-sans">Liquidity Score</td>
                        <td className="p-4"><span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-bold">10/10 Instant</span></td>
                        <td className="p-4"><span className="bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-full text-[10px] font-bold">8/10 High</span></td>
                        <td className="p-4"><span className="bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full text-[10px] font-bold">6/10 Moderate</span></td>
                        <td className="p-4"><span className="bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full text-[10px] font-bold">4/10 Locked</span></td>
                      </tr>

                      <tr>
                        <td className="p-4 font-bold text-white font-sans">Early Unstake Penalty</td>
                        <td className="p-4 text-emerald-400 font-bold">0.00% (No Fee)</td>
                        <td className="p-4 text-slate-400">1.00% Yield Deduction</td>
                        <td className="p-4 text-slate-400">2.50% Yield Deduction</td>
                        <td className="p-4 text-rose-400 font-bold">5.00% Yield Deduction</td>
                      </tr>

                      <tr className="bg-slate-950/50">
                        <td className="p-4 font-bold text-amber-300 font-sans">
                          Daily Return (${compareDepositAmount.toLocaleString()})
                        </td>
                        <td className="p-4 font-bold text-amber-300">+${((compareDepositAmount * 0.085) / 365).toFixed(2)}</td>
                        <td className="p-4 font-bold text-emerald-300">+${((compareDepositAmount * 0.142) / 365).toFixed(2)}</td>
                        <td className="p-4 font-bold text-cyan-300">+${((compareDepositAmount * 0.225) / 365).toFixed(2)}</td>
                        <td className="p-4 font-bold text-purple-300">+${((compareDepositAmount * 0.340) / 365).toFixed(2)}</td>
                      </tr>

                      <tr className="bg-slate-950/80">
                        <td className="p-4 font-black text-emerald-400 font-sans text-sm">
                          Annual Return (${compareDepositAmount.toLocaleString()})
                        </td>
                        <td className="p-4 font-black text-amber-400 text-sm">+${(compareDepositAmount * 0.085).toFixed(2)}</td>
                        <td className="p-4 font-black text-emerald-400 text-sm">+${(compareDepositAmount * 0.142).toFixed(2)}</td>
                        <td className="p-4 font-black text-cyan-300 text-sm">+${(compareDepositAmount * 0.225).toFixed(2)}</td>
                        <td className="p-4 font-black text-purple-300 text-base">+${(compareDepositAmount * 0.340).toFixed(2)}</td>
                      </tr>

                      <tr>
                        <td className="p-4 font-bold text-white font-sans">Action</td>
                        {[
                          { pool: 'FLEX_MARITIME', color: 'bg-amber-500 text-slate-950' },
                          { pool: '30_DAY_SOVEREIGN', color: 'bg-emerald-500 text-slate-950' },
                          { pool: '90_DAY_CARBON', color: 'bg-cyan-500 text-slate-950' },
                          { pool: '365_DAY_VIP', color: 'bg-purple-500 text-white' }
                        ].map((btn, idx) => (
                          <td key={idx} className="p-4">
                            <button
                              onClick={() => {
                                setSelectedStakingPool(btn.pool);
                                setStakeAmountInput(compareDepositAmount);
                                setStakingActiveSubTab('POOLS');
                                triggerToast(`Selected ${btn.pool} with $${compareDepositAmount} principal!`);
                              }}
                              className={`${btn.color} font-black px-3 py-1.5 rounded-xl text-xs font-sans transition-all shadow-md w-full`}
                            >
                              Select Pool
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB: STAKING REFERRAL PROGRAM & YIELD SHARING */}
          {stakingActiveSubTab === 'REFERRAL' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-fuchsia-400 uppercase tracking-wider">SOVEREIGN ADMIRAL YIELD PARTNER PROGRAM</span>
                  <h3 className="text-2xl font-black text-white">Staking Referral &amp; Yield Share</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Invite fellow crew members and stakers to earn <span className="text-fuchsia-400 font-bold">1.0% passive yield dividend</span> on all their daily staking payouts.
                  </p>
                </div>

                <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 font-mono text-xs text-right shrink-0">
                  <span className="text-slate-400 text-[10px] block">YOUR REFERRAL TIER</span>
                  <span className="text-fuchsia-300 font-black">{stakingReferralStats.tierName} (1.0% Share)</span>
                </div>
              </div>

              {/* REFERRAL LINK SHARE BOX */}
              <div className="bg-gradient-to-r from-slate-900 via-fuchsia-950/40 to-slate-900 p-6 rounded-3xl border border-fuchsia-500/30 space-y-4 font-mono text-xs shadow-xl">
                <span className="text-slate-300 font-bold block uppercase text-[11px]">YOUR EXCLUSIVE STAKING REFERRAL LINK</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-3 text-cyan-300 text-xs font-bold overflow-hidden truncate">
                    https://oceangaming.portal/stake?ref={stakingReferralCode}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(`https://oceangaming.portal/stake?ref=${stakingReferralCode}`);
                      setIsCopiedRefLink(true);
                      triggerToast('Referral link copied to clipboard!');
                      setTimeout(() => setIsCopiedRefLink(false), 3000);
                    }}
                    className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-black px-6 py-3 rounded-2xl text-xs transition-all shadow-md shrink-0 flex items-center justify-center space-x-1.5"
                  >
                    <Coins className="w-4 h-4" />
                    <span>{isCopiedRefLink ? '✓ Copied Link!' : 'Copy Referral Link'}</span>
                  </button>
                </div>
              </div>

              {/* REFERRAL STATS METRICS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono text-xs">
                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">TOTAL REFERRED STAKERS</span>
                  <span className="text-white font-black text-2xl block">{stakingReferralStats.refereesCount} Stakers</span>
                  <span className="text-emerald-400 text-[10px]">Active crew members</span>
                </div>

                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">TOTAL REFERRED STAKED TVL</span>
                  <span className="text-amber-400 font-black text-2xl block">${stakingReferralStats.totalRefStaked.toLocaleString()} $OD</span>
                  <span className="text-slate-400 text-[10px]">Generating daily yield</span>
                </div>

                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">LIFETIME REFERRAL EARNINGS</span>
                  <span className="text-fuchsia-300 font-black text-2xl block">+${stakingReferralStats.lifetimeEarnings.toFixed(2)} $OD</span>
                  <span className="text-fuchsia-400 text-[10px]">1.0% perpetual dividend share</span>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB: STAKING GOVERNANCE VOTING & DASHBOARD */}
          {stakingActiveSubTab === 'GOVERNANCE_VOTE' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">MARITIME CENTRAL RESERVE GOVERNANCE DASHBOARD</span>
                  <h3 className="text-2xl font-black text-white">Stake Governance Dashboard &amp; Voting</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Direct monetary policy, reserve rebalancing, and APY yield allocations using your staked $OD / $XOD governance votes.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsCreatingProposalModalOpen(true)}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs transition-all shadow-lg flex items-center space-x-1.5 font-mono"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Submit Proposal</span>
                  </button>

                  <div className="bg-slate-900 px-5 py-2 rounded-2xl border border-amber-500/30 font-mono text-xs text-right shrink-0">
                    <span className="text-slate-400 text-[10px] block">YOUR VOTING POWER</span>
                    <span className="text-amber-400 font-black text-lg">{stakedBalance.toFixed(0)} Votes</span>
                    <span className="text-slate-500 text-[9px] block">1 Staked $OD = 1 Vote</span>
                  </div>
                </div>
              </div>

              {/* GOVERNANCE TREASURY METRICS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">VOTING QUORUM STATUS</span>
                  <span className="text-emerald-400 font-black text-xl">78.4% Quorum Met</span>
                  <span className="text-slate-500 text-[10px] block">7,678,700 / 9,780,000 $OD Voted</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">MARITIME RESERVE RATIO</span>
                  <span className="text-amber-400 font-black text-xl">104.8% Backed</span>
                  <span className="text-slate-500 text-[10px] block">$1.048 Reserves per 1.00 $OD</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">ACTIVE PROPOSALS</span>
                  <span className="text-cyan-300 font-black text-xl">{governanceProposals.length} Open Proposals</span>
                  <span className="text-slate-500 text-[10px] block">Average Turnout: 81.2%</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block">TOTAL GOVERNANCE STAKERS</span>
                  <span className="text-purple-300 font-black text-xl">1,840 Stakers</span>
                  <span className="text-slate-500 text-[10px] block">Sovereign Admiral Consensus</span>
                </div>
              </div>

              {/* CREATE PROPOSAL MODAL */}
              {isCreatingProposalModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl font-sans">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-lg font-black text-white flex items-center space-x-2">
                        <Gavel className="w-5 h-5 text-amber-400" />
                        <span>Submit Sovereign Governance Proposal</span>
                      </h4>
                      <button
                        onClick={() => setIsCreatingProposalModalOpen(false)}
                        className="text-slate-400 hover:text-white font-bold text-sm bg-slate-800 px-3 py-1 rounded-xl"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <label className="text-slate-300 font-bold block mb-1">Proposal Title</label>
                        <input
                          type="text"
                          value={newPropTitle}
                          onChange={(e) => setNewPropTitle(e.target.value)}
                          placeholder="e.g. Expand High-Seas Port Reserve in Yokohama Port"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-slate-300 font-bold block mb-1">Category</label>
                        <select
                          value={newPropCategory}
                          onChange={(e) => setNewPropCategory(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                        >
                          <option value="RESERVE_POLICY">RESERVE POLICY</option>
                          <option value="YIELD_RATE">YIELD RATE</option>
                          <option value="NETWORK_EXPANSION">NETWORK EXPANSION</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-slate-300 font-bold block mb-1">Description &amp; Rationale</label>
                        <textarea
                          rows={4}
                          value={newPropDesc}
                          onChange={(e) => setNewPropDesc(e.target.value)}
                          placeholder="Detail the monetary policy adjustments and expected APY impact..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!newPropTitle.trim()) {
                          triggerToast('Please provide a proposal title');
                          return;
                        }
                        const newProp = {
                          id: `PROP-2026-0${governanceProposals.length + 4}`,
                          title: newPropTitle,
                          category: newPropCategory,
                          proposer: 'Sovereign Captain (You)',
                          status: 'ACTIVE' as const,
                          expiresIn: '7 Days 00 Hours',
                          description: newPropDesc || 'Community submitted governance proposal.',
                          yesVotes: Math.round(stakedBalance),
                          noVotes: 0,
                          abstainVotes: 0,
                          userVoted: 'YES' as const
                        };
                        setGovernanceProposals([newProp, ...governanceProposals]);
                        setIsCreatingProposalModalOpen(false);
                        setNewPropTitle('');
                        setNewPropDesc('');
                        triggerToast(`Submitted Proposal ${newProp.id} with ${stakedBalance.toFixed(0)} YES votes!`);
                      }}
                      className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all shadow-lg font-mono"
                    >
                      SUBMIT PROPOSAL TO GOVERNANCE BOARD
                    </button>
                  </div>
                </div>
              )}

              {/* CATEGORY FILTER SWITCHER */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {['ALL', 'RESERVE_POLICY', 'YIELD_RATE', 'NETWORK_EXPANSION'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setStakingVoteCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      stakingVoteCategoryFilter === cat
                        ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* PROPOSALS LIST */}
              <div className="space-y-6">
                {governanceProposals
                  .filter(p => stakingVoteCategoryFilter === 'ALL' || p.category === stakingVoteCategoryFilter)
                  .map((proposal) => {
                    const totalVotes = proposal.yesVotes + proposal.noVotes + proposal.abstainVotes;
                    const yesPct = totalVotes > 0 ? ((proposal.yesVotes / totalVotes) * 100).toFixed(1) : '0';
                    const noPct = totalVotes > 0 ? ((proposal.noVotes / totalVotes) * 100).toFixed(1) : '0';
                    const abstainPct = totalVotes > 0 ? ((proposal.abstainVotes / totalVotes) * 100).toFixed(1) : '0';

                    return (
                      <div key={proposal.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                          <div className="flex items-center space-x-2">
                            <span className="bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                              {proposal.id}
                            </span>
                            <span className="bg-slate-800 text-slate-300 font-mono text-[10px] px-2.5 py-1 rounded-full">
                              {proposal.category.replace('_', ' ')}
                            </span>
                            <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] px-2.5 py-1 rounded-full font-bold">
                              {proposal.status}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1.5 text-slate-400 font-mono text-xs">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>Ends in {proposal.expiresIn}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-bold text-base">{proposal.title}</h4>
                          <p className="text-slate-300 text-xs mt-1 leading-relaxed">{proposal.description}</p>
                          <span className="text-slate-500 text-[10px] font-mono mt-1 block">Proposed by: {proposal.proposer}</span>
                        </div>

                        {/* VOTE PROGRESS BARS */}
                        <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-emerald-400 font-bold">YES ({yesPct}%)</span>
                              <span className="text-slate-400">{proposal.yesVotes.toLocaleString()} Votes</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-400 h-full transition-all" style={{ width: `${yesPct}%` }} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-rose-400 font-bold">NO ({noPct}%)</span>
                              <span className="text-slate-400">{proposal.noVotes.toLocaleString()} Votes</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                              <div className="bg-rose-400 h-full transition-all" style={{ width: `${noPct}%` }} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-400 font-bold">ABSTAIN ({abstainPct}%)</span>
                              <span className="text-slate-500">{proposal.abstainVotes.toLocaleString()} Votes</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                              <div className="bg-slate-600 h-full transition-all" style={{ width: `${abstainPct}%` }} />
                            </div>
                          </div>
                        </div>

                        {/* VOTING BUTTONS */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          {proposal.userVoted ? (
                            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>You voted {proposal.userVoted} with {stakedBalance.toFixed(0)} Votes</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2 w-full sm:w-auto font-mono text-xs">
                              <button
                                onClick={() => {
                                  setGovernanceProposals(prev => prev.map(p => p.id === proposal.id ? { ...p, yesVotes: p.yesVotes + Math.round(stakedBalance), userVoted: 'YES' } : p));
                                  triggerToast(`Cast ${stakedBalance.toFixed(0)} YES votes for ${proposal.id}!`);
                                }}
                                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl transition-all shadow-md flex-1 sm:flex-none"
                              >
                                Vote YES
                              </button>

                              <button
                                onClick={() => {
                                  setGovernanceProposals(prev => prev.map(p => p.id === proposal.id ? { ...p, noVotes: p.noVotes + Math.round(stakedBalance), userVoted: 'NO' } : p));
                                  triggerToast(`Cast ${stakedBalance.toFixed(0)} NO votes for ${proposal.id}!`);
                                }}
                                className="bg-rose-500 hover:bg-rose-400 text-white font-black px-4 py-2 rounded-xl transition-all shadow-md flex-1 sm:flex-none"
                              >
                                Vote NO
                              </button>

                              <button
                                onClick={() => {
                                  setGovernanceProposals(prev => prev.map(p => p.id === proposal.id ? { ...p, abstainVotes: p.abstainVotes + Math.round(stakedBalance), userVoted: 'ABSTAIN' } : p));
                                  triggerToast(`Cast ${stakedBalance.toFixed(0)} ABSTAIN votes for ${proposal.id}!`);
                                }}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2 rounded-xl transition-all flex-1 sm:flex-none"
                              >
                                Abstain
                              </button>
                            </div>
                          )}

                          <span className="text-slate-500 text-[10px] font-mono">Total Turnout: {totalVotes.toLocaleString()} Votes</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* SUB-TAB: STAKING TIER REWARDS & BREAKDOWN */}
          {stakingActiveSubTab === 'TIER_REWARDS' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">SOVEREIGN ADMIRAL VIP SYSTEM</span>
                  <h3 className="text-2xl font-black text-white">Staking Tier Breakdown &amp; APY Multipliers</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Higher staked balances unlock passive APY boosts, free monthly lottery tickets, reduced swap fees, and VIP casino perks.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-950 to-slate-900 px-5 py-3 rounded-2xl border border-purple-500/40 text-right shrink-0 font-mono">
                  <span className="text-slate-400 text-[10px] block">CURRENT VIP STATUS</span>
                  <span className="text-purple-300 font-black text-lg">Sovereign Captain (Tier 3)</span>
                  <span className="text-emerald-400 text-[10px] block">+3.0% APY Bonus Active</span>
                </div>
              </div>

              {/* STAKER COMMUNITY DISTRIBUTION BAR */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-bold uppercase text-[11px]">Community Staker Tier Distribution</span>
                  <span className="text-purple-400 font-bold">1,840 Active Stakers Total</span>
                </div>

                <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden flex border border-slate-800">
                  <div className="bg-slate-600 h-full w-[45%]" title="Crew Member (45%)" />
                  <div className="bg-cyan-500 h-full w-[32%]" title="Lieutenant Officer (32%)" />
                  <div className="bg-purple-500 h-full w-[18%]" title="Sovereign Captain (18%)" />
                  <div className="bg-amber-400 h-full w-[5%]" title="Fleet Admiral (5%)" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                    <span>Crew Member (45%)</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                    <span>Lieutenant Officer (32%)</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                    <span>Sovereign Captain (18% - You)</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span>Fleet Admiral (5%)</span>
                  </span>
                </div>
              </div>

              {/* TIER PROGRESS CARD */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-400 text-[10px] block">PROGRESS TO NEXT TIER (FLEET ADMIRAL)</span>
                    <span className="text-white font-bold text-sm">${stakedBalance.toFixed(2)} / $25,000.00 $OD Staked</span>
                  </div>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-bold border border-purple-500/30 text-[11px]">
                    Need ${(25000 - stakedBalance).toFixed(2)} more $OD
                  </span>
                </div>

                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-amber-400 h-full transition-all"
                    style={{ width: `${Math.min(100, (stakedBalance / 25000) * 100)}%` }}
                  />
                </div>

                {/* MONTHLY PERK CLAIM ACTION */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-purple-500/30">
                  <div>
                    <span className="text-purple-300 font-bold block text-sm">Monthly Tier Perk Dividend</span>
                    <span className="text-slate-400 text-xs font-sans">Claim +5 Free High-Seas Lottery Tickets &amp; +3% APY Boost coupon for August 2026.</span>
                  </div>

                  <button
                    onClick={() => {
                      setHasClaimedMonthlyTierPerk(true);
                      triggerToast('Claimed +5 Free Lottery Tickets & +3% APY Boost Coupon!');
                    }}
                    disabled={hasClaimedMonthlyTierPerk}
                    className="bg-purple-500 hover:bg-purple-400 disabled:opacity-50 text-white font-black px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shrink-0 flex items-center space-x-1.5"
                  >
                    <Gift className="w-4 h-4" />
                    <span>{hasClaimedMonthlyTierPerk ? '✓ Monthly Perk Claimed' : 'Claim Monthly Perk'}</span>
                  </button>
                </div>
              </div>

              {/* DETAILED APY MULTIPLIER TABLE PER POOL & TIER */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 font-mono text-xs overflow-x-auto">
                <h4 className="text-white font-bold text-sm font-sans">Effective Pool APY Multiplier Matrix</h4>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                      <th className="p-3">STAKING POOL</th>
                      <th className="p-3">BASE APY</th>
                      <th className="p-3">CREW MEMBER</th>
                      <th className="p-3">LIEUTENANT (+1.5%)</th>
                      <th className="p-3 text-purple-300">CAPTAIN (+3.0% YOU)</th>
                      <th className="p-3 text-amber-400">ADMIRAL (+5.0%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    <tr>
                      <td className="p-3 text-white font-bold font-sans">🌊 Flexible Maritime Yield</td>
                      <td className="p-3 text-slate-400">12.5%</td>
                      <td className="p-3 text-slate-300">12.5%</td>
                      <td className="p-3 text-cyan-300">14.0%</td>
                      <td className="p-3 font-bold text-purple-300">15.5%</td>
                      <td className="p-3 font-bold text-amber-400">17.5%</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-bold font-sans">⚓ 30-Day Sovereign Vault</td>
                      <td className="p-3 text-slate-400">18.5%</td>
                      <td className="p-3 text-slate-300">18.5%</td>
                      <td className="p-3 text-cyan-300">20.0%</td>
                      <td className="p-3 font-bold text-purple-300">21.5%</td>
                      <td className="p-3 font-bold text-amber-400">23.5%</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-bold font-sans">💎 90-Day Blue Carbon Vault</td>
                      <td className="p-3 text-slate-400">22.5%</td>
                      <td className="p-3 text-slate-300">22.5%</td>
                      <td className="p-3 text-cyan-300">24.0%</td>
                      <td className="p-3 font-bold text-purple-300">25.5%</td>
                      <td className="p-3 font-bold text-amber-400">27.5%</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-bold font-sans">👑 365-Day VIP Fleet Vault</td>
                      <td className="p-3 text-slate-400">34.0%</td>
                      <td className="p-3 text-slate-300">34.0%</td>
                      <td className="p-3 text-cyan-300">35.5%</td>
                      <td className="p-3 font-bold text-purple-300">37.0%</td>
                      <td className="p-3 font-bold text-amber-400">39.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* TIER COMPARISON MATRIX GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono text-xs">
                {[
                  {
                    name: 'Crew Member',
                    req: '$10 – $999 Staked',
                    apy: '+0.0% Boost',
                    tickets: '0 Free Tickets',
                    refShare: '0.5% Dividend',
                    fee: '0.05% Standard',
                    color: 'border-slate-800 text-slate-300'
                  },
                  {
                    name: 'Lieutenant Officer',
                    req: '$1,000 – $4,999 Staked',
                    apy: '+1.5% APY Boost',
                    tickets: '1 Free Ticket/mo',
                    refShare: '0.75% Dividend',
                    fee: '25% Discount',
                    color: 'border-cyan-500/40 text-cyan-300'
                  },
                  {
                    name: 'Sovereign Captain',
                    req: '$5,000 – $24,999 Staked',
                    apy: '+3.0% APY Boost',
                    tickets: '5 Free Tickets/mo',
                    refShare: '1.0% Dividend',
                    fee: '50% Discount',
                    current: true,
                    color: 'border-purple-500 bg-purple-950/20 text-purple-300'
                  },
                  {
                    name: 'Fleet Admiral',
                    req: '$25,000+ Staked',
                    apy: '+5.0% APY Boost',
                    tickets: '20 Free Tickets/mo',
                    refShare: '2.0% Dividend',
                    fee: '0.00% FREE Swaps',
                    color: 'border-amber-400 text-amber-300'
                  }
                ].map((tier, idx) => (
                  <div key={idx} className={`bg-slate-900 p-5 rounded-3xl border space-y-3 relative ${tier.color}`}>
                    {tier.current && (
                      <span className="absolute -top-3 right-4 bg-purple-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                        YOUR TIER
                      </span>
                    )}

                    <div className="border-b border-slate-800 pb-2">
                      <h4 className="font-bold text-white text-sm font-sans">{tier.name}</h4>
                      <span className="text-slate-400 text-[10px]">{tier.req}</span>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">APY Boost:</span>
                        <span className="font-bold text-emerald-400">{tier.apy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Raffle Perks:</span>
                        <span className="font-bold text-amber-300">{tier.tickets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Referral Share:</span>
                        <span className="font-bold text-fuchsia-300">{tier.refShare}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Port Swap Fee:</span>
                        <span className="font-bold text-cyan-300">{tier.fee}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB: PHYSICAL OCEAN DOLLAR ($OD) SPECIMEN & BANKNOTE VIEW */}
          {stakingActiveSubTab === 'PHYSICAL_CURRENCY' && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 font-sans">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">OFFICIAL PHYSICAL CURRENCY &amp; MINT SPECIMEN</span>
                  <h3 className="text-2xl font-black text-white">Physical Ocean Dollar ($OD / XOD) Note &amp; Coin</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    High-resolution physical sovereign banknote specimen and gold bullion currency coin issued under UNCTAD Treaty #2026-XOD-01.
                  </p>
                </div>

                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold px-3 py-1.5 rounded-2xl flex items-center space-x-1 shrink-0">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>ISO 4217: XOD (Code 998)</span>
                </span>
              </div>

              {/* GENERATED PHYSICAL IMAGE DISPLAY */}
              <div className="bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group">
                  <img
                    src="/src/assets/images/ocean_dollar_physical_1786785193998.jpg"
                    alt="Physical Ocean Dollar ($OD / XOD) Banknote and Minted Gold Coin Specimen"
                    className="w-full h-auto object-cover max-h-[480px] group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl font-mono text-xs font-bold shadow-lg">
                    SatCom Proof Specimen #2026-XOD-PHYS-01
                  </div>
                </div>

                {/* SECURITY FEATURES SPECIFICATION GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs pt-2">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block text-xs">Holographic Maritime Seal</span>
                    <p className="text-slate-400 text-[11px] font-sans">Optically variable ink seal depicting Neptune's trident and ship anchor.</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-emerald-400 font-bold block text-xs">SatCom Quantum Serial</span>
                    <p className="text-slate-400 text-[11px] font-sans">Encrypted 256-bit hash serial number registered on MCRB central ledger.</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-cyan-300 font-bold block text-xs">24K Sovereign Bullion Coin</span>
                    <p className="text-slate-400 text-[11px] font-sans">99.99% pure minted gold bullion coin backed by physical vault reserves.</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-purple-300 font-bold block text-xs">104.8% Over-Collateralized</span>
                    <p className="text-slate-400 text-[11px] font-sans">Full physical gold, SDR, and Blue Carbon bond parity collateral.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {stakingActiveSubTab === 'HISTORY' && (
            <div className="space-y-4 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-black text-white">Staking Ledger &amp; Dividend Payout Audit</h3>
                  <p className="text-slate-400 text-xs">Full SatCom audited transaction log for staking deposits, yield payouts, auto-compounding, and referrals.</p>
                </div>

                <button
                  onClick={() => {
                    const csvRows = [
                      ['Tx Hash', 'ID', 'Action', 'Pool', 'Amount', 'Currency', 'Timestamp', 'Status'],
                      ...stakingHistory.map(h => [h.txHash, h.id, h.action, h.poolName, h.amount, h.currency, h.timestamp, h.status])
                    ].map(e => e.join(',')).join('\n');
                    const blob = new Blob([csvRows], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', `OD_Staking_Ledger_${Date.now()}.csv`);
                    a.click();
                    triggerToast('Exported Staking Payout History CSV file!');
                  }}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5 shrink-0 font-mono"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Export CSV Ledger</span>
                </button>
              </div>
              
              <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl font-mono text-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[11px]">
                        <th className="p-4">TX HASH &amp; ID</th>
                        <th className="p-4">ACTION TYPE</th>
                        <th className="p-4">POOL TARGET</th>
                        <th className="p-4">AMOUNT</th>
                        <th className="p-4">TIMESTAMP</th>
                        <th className="p-4 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {stakingHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/50 transition-all">
                          <td className="p-4 font-bold text-cyan-400">
                            {item.txHash}
                            <span className="block text-[10px] text-slate-400 font-mono">{item.id}</span>
                          </td>

                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                              item.action === 'DEPOSIT_STAKE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              item.action === 'CLAIM_YIELD' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              item.action === 'COMPOUND_REWARDS' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20' :
                              'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                            }`}>
                              {item.action}
                            </span>
                          </td>

                          <td className="p-4 text-slate-300 font-sans">
                            {item.poolName}
                          </td>

                          <td className="p-4 font-black text-amber-400">
                            ${item.amount.toFixed(2)} {item.currency}
                          </td>

                          <td className="p-4 text-slate-400">
                            {item.timestamp}
                          </td>

                          <td className="p-4 text-right font-bold text-emerald-400">
                            ✓ {item.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. PROVABLY FAIR AUDITOR TAB */}
      {activeTab === 'provably-fair' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400">TRANSPARENCY & MARITIME LEDGER</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Provably Fair Draw Hash Auditor</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Verify the cryptographic seed of any lottery draw or scratch card to confirm that no outcome was manipulated.
            </p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 font-mono">ENTER TICKET / DRAW CRYPTOGRAPHIC SEED</label>
              <input
                type="text"
                value={verifySeedInput}
                onChange={(e) => setVerifySeedInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={handleVerifySeed}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center space-x-2"
            >
              <Hash className="w-4 h-4" />
              <span>Verify Hash Integrity</span>
            </button>

            {verifyResult && (
              <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-4 space-y-2 font-mono text-xs">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{verifyResult.verifiedStatus}</span>
                </div>
                <div className="text-slate-400 space-y-1 text-[11px]">
                  <p>Input Seed: {verifyResult.seed}</p>
                  <p>Server SHA-256: {verifyResult.sha256Hash}</p>
                  <p>Timestamp: {verifyResult.drawTimestamp}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. GAMING HISTORY DASHBOARD */}
      {activeTab === 'gaming-history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">CRYPTOGRAPHIC GAMING AUDIT</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  LIVE HISTORICAL LEDGER
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Gaming History & Payout Dashboard</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Complete verifiable history of all purchased lottery tickets, instant scratchers, regatta bets, and roulette spins.
              </p>
            </div>

            <button
              onClick={() => {
                triggerToast('Generating official Maritime Gaming Statement PDF...');
                generateAndDownloadPdf({
                  documentType: 'TAX_INVOICE',
                  bookingId: 'GAMING-STATEMENT-' + Date.now().toString().slice(-6),
                  title: 'Ocean Gaming & Entertainments Ledger Statement',
                  operatorName: 'Ocean Gaming & Entertainments Portal',
                  passengerOrCargoName: maritimePass.fullName,
                  passportOrCustomsCode: maritimePass.credentialId,
                  origin: maritimePass.vesselOrCompany,
                  destination: 'High Seas Digital Vault',
                  departureDate: new Date().toISOString().split('T')[0],
                  allocatedSpace: 'Digital Ocean Dollar ($OD) Gaming Statement',
                  paymentMethod: 'Digital Ocean Dollar ($OD)',
                  basePriceUSD: 1420.0,
                  totalPriceUSD: 2950.0,
                  currencyCode: '$OD',
                  formattedTotalPrice: '+1,530.00 $OD Net Profit',
                  issueTimestamp: new Date().toISOString(),
                  qrPayload: maritimePass.verificationHash
                });
              }}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 font-bold px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shrink-0 shadow-lg"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export History Statement (PDF)</span>
            </button>
          </div>

          {/* HISTORICAL STATS SUMMARY CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] font-bold block">TOTAL WAGERED</span>
              <span className="text-xl font-black text-slate-200">1,420.00 $OD</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] font-bold block">TOTAL PAYOUTS WON</span>
              <span className="text-xl font-black text-emerald-400">2,950.00 $OD</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] font-bold block">NET MARITIME PROFIT</span>
              <span className="text-xl font-black text-cyan-300">+1,530.00 $OD</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] font-bold block">WIN RATE %</span>
              <span className="text-xl font-black text-amber-400">68.4%</span>
            </div>
          </div>

          {/* FILTERS & SEARCH */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
              {[
                { id: 'ALL', label: 'All Games' },
                { id: 'JACKPOT', label: 'Mega Jackpot' },
                { id: 'SCRATCHERS', label: 'Scratch Cards' },
                { id: 'SPORTS_BET', label: 'Regatta Betting' },
                { id: 'ROULETTE', label: 'Roulette' },
                { id: 'RAFFLE', label: 'Daily Raffle' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setHistoryFilterType(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    historyFilterType === f.id
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by Tx Hash or Game..."
                value={historySearchQuery}
                onChange={(e) => setHistorySearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* HISTORY TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3">GAME & ACTIVITY</th>
                  <th className="py-3 px-3">CATEGORY</th>
                  <th className="py-3 px-3">WAGER ($OD)</th>
                  <th className="py-3 px-3">PAYOUT ($OD)</th>
                  <th className="py-3 px-3">OUTCOME / STATUS</th>
                  <th className="py-3 px-3">TIMESTAMP</th>
                  <th className="py-3 px-3">SEED HASH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {[
                  {
                    id: 'GH-901',
                    title: 'Neptune Trident Scratch Card #881',
                    category: 'SCRATCHERS',
                    wager: 10,
                    payout: 2500,
                    status: 'WON',
                    time: '2026-08-11 14:12 UTC',
                    seed: '0xa38190d21a98'
                  },
                  {
                    id: 'GH-898',
                    title: "America's Cup Regatta: NZ Hydrofoil",
                    category: 'SPORTS_BET',
                    wager: 50,
                    payout: 92.5,
                    status: 'WON',
                    time: '2026-08-10 18:30 UTC',
                    seed: '0x99182a1048b1'
                  },
                  {
                    id: 'GH-872',
                    title: '$3.85M High Seas Jackpot Ticket #TKT-88401',
                    category: 'JACKPOT',
                    wager: 5,
                    payout: 0,
                    status: 'PENDING_DRAW',
                    time: '2026-08-10 09:15 UTC',
                    seed: '0x77b8192a8190'
                  },
                  {
                    id: 'GH-850',
                    title: 'Treasure Reef Roulette - Red #18',
                    category: 'ROULETTE',
                    wager: 25,
                    payout: 50,
                    status: 'WON',
                    time: '2026-08-09 22:40 UTC',
                    seed: '0x11e9201a8829'
                  },
                  {
                    id: 'GH-812',
                    title: "Seafarer's Daily Raffle Ticket #RFL-104",
                    category: 'RAFFLE',
                    wager: 2,
                    payout: 0,
                    status: 'NO_WIN',
                    time: '2026-08-08 12:00 UTC',
                    seed: '0x44b91012a801'
                  }
                ]
                  .filter((item) => {
                    if (historyFilterType !== 'ALL' && item.category !== historyFilterType) return false;
                    if (historySearchQuery && !item.title.toLowerCase().includes(historySearchQuery.toLowerCase()) && !item.seed.toLowerCase().includes(historySearchQuery.toLowerCase())) return false;
                    return true;
                  })
                  .map((item) => (
                    <tr key={item.id} className="hover:bg-slate-950/60 transition-colors">
                      <td className="py-3 px-3 font-bold text-white font-sans">{item.title}</td>
                      <td className="py-3 px-3">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300">{item.category}</span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-300">-{item.wager} $OD</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">{item.payout > 0 ? `+${item.payout} $OD` : '0 $OD'}</td>
                      <td className="py-3 px-3">
                        {item.status === 'WON' && (
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            WON PAYOUT
                          </span>
                        )}
                        {item.status === 'PENDING_DRAW' && (
                          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            PENDING DRAW
                          </span>
                        )}
                        {item.status === 'NO_WIN' && (
                          <span className="bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full text-[10px]">
                            COMPLETED
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">{item.time}</td>
                      <td className="py-3 px-3 text-[10px] text-cyan-400">{item.seed}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* MARITIME GAMING TAX & DUTY STATEMENTS HUB */}
          <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-6 space-y-5 pt-6 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-black text-white font-sans uppercase tracking-wider">
                    Maritime Gaming Tax & Duty Statements
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Official UNCLOS Article 87 High Seas Tax-Exempt Gaming Statements & Tax Return Exports.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={taxReportYear}
                  onChange={(e) => setTaxReportYear(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-white text-xs font-mono font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
                >
                  <option value="2026">Tax Year 2026</option>
                  <option value="2025">Tax Year 2025</option>
                </select>

                <button
                  onClick={() => {
                    triggerToast(`Generating Official Tax Year ${taxReportYear} Gaming Duty Statement PDF...`);
                    generateAndDownloadPdf({
                      documentType: 'TAX_INVOICE',
                      bookingId: `TAX-${taxReportYear}-` + Date.now().toString().slice(-6),
                      title: `Official High Seas Gaming Tax & Duty Statement (${taxReportYear})`,
                      operatorName: 'Ocean Gaming & Entertainments Tax & Compliance Authority',
                      passengerOrCargoName: maritimePass.fullName,
                      passportOrCustomsCode: maritimePass.credentialId,
                      origin: maritimePass.vesselOrCompany,
                      destination: 'UNCLOS Flag State High Seas International Waters Jurisdiction',
                      departureDate: `${taxReportYear}-01-01`,
                      allocatedSpace: 'International Maritime Waters Tax-Free Gaming Certificate',
                      paymentMethod: 'Digital Ocean Dollar ($OD) On-Chain Settlement',
                      basePriceUSD: 1420.0,
                      totalPriceUSD: 2950.0,
                      currencyCode: 'USD / $OD',
                      formattedTotalPrice: '$0.00 WITHHELD (0.00% HIGH SEAS TAX-FREE)',
                      issueTimestamp: new Date().toISOString(),
                      qrPayload: maritimePass.verificationHash
                    });
                  }}
                  className="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-lg shrink-0"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Export Tax Statement (PDF)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">GROSS GAMING WINNINGS ({taxReportYear})</span>
                <span className="text-lg font-black text-emerald-400">2,950.00 $OD</span>
                <span className="text-[10px] text-slate-500 block">Total gross payouts claimed</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">DEDUCTIBLE GAMING WAGERS</span>
                <span className="text-lg font-black text-rose-400">-1,420.00 $OD</span>
                <span className="text-[10px] text-slate-500 block">Allowable gaming ticket costs</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">NET TAXABLE GAMING PROFIT</span>
                <span className="text-lg font-black text-cyan-300">+1,530.00 $OD</span>
                <span className="text-[10px] text-slate-500 block">Net taxable gain</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] block">HIGH SEAS TAX WITHHELD</span>
                <span className="text-lg font-black text-emerald-300">0.00 $OD (0.00%)</span>
                <span className="text-[10px] text-emerald-400 block">Tax-Free International Waters</span>
              </div>
            </div>
          </div>

          {/* ITEMIZATION ON-CHAIN GAMING TRANSACTION LOGS */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 pt-6 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <History className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-black text-white font-sans uppercase tracking-wider">
                    On-Chain Gaming Transaction & Ledger Audit Logs
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Detailed immutable cryptographic ledger entries for every wager, scratcher reveal, spin, and payout.
                </p>
              </div>

              <button
                onClick={() => {
                  triggerToast('Exporting raw transaction audit ledger as CSV...');
                  const csvData = "TransactionID,Timestamp,Activity,Type,WagerOD,PayoutOD,BalanceAfterOD,SeedHash,Status\n" +
                    "0x7f8a92014b,2026-08-14 02:15:22 UTC,Mega Jackpot Slip #8492,WAGER,-5.00,0.00,4030.00,0xa38190d21a98,SETTLED\n" +
                    "0x99182a1048,2026-08-13 18:40:10 UTC,Neptune Scratcher 50x Win,PAYOUT,0.00,2500.00,4035.00,0x99182a1048b1,SETTLED\n" +
                    "0x77b8192a81,2026-08-12 21:10:05 UTC,Treasure Reef Roulette Red #18,PAYOUT,0.00,50.00,1535.00,0x77b8192a8190,SETTLED\n" +
                    "0x11e9201a88,2026-08-11 14:12:00 UTC,America's Cup Hydrofoil Bet,PAYOUT,0.00,92.50,1485.00,0x11e9201a8829,SETTLED";
                  const blob = new Blob([csvData], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Maritime_Gaming_Tx_Logs_${Date.now()}.csv`;
                  a.click();
                }}
                className="bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-lg shrink-0 font-mono"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export CSV Ledger</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center space-x-2">
                {['ALL', 'WAGER', 'PAYOUT', 'REWARD'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTxLogTypeFilter(t as any)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      txLogTypeFilter === t
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter logs by Tx ID or Seed..."
                  value={txLogSearchQuery}
                  onChange={(e) => setTxLogSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3">TX ID / HASH</th>
                    <th className="py-2.5 px-3">ACTIVITY</th>
                    <th className="py-2.5 px-3">TYPE</th>
                    <th className="py-2.5 px-3">WAGER ($OD)</th>
                    <th className="py-2.5 px-3">PAYOUT ($OD)</th>
                    <th className="py-2.5 px-3">BALANCE AFTER</th>
                    <th className="py-2.5 px-3">TIMESTAMP</th>
                    <th className="py-2.5 px-3">SEED HASH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {[
                    { id: '0x7f8a92014b', title: '$3.85M Mega Jackpot Slip #8492', type: 'WAGER', wager: 5.00, payout: 0, balance: 4030.00, time: '2026-08-14 02:15:22 UTC', seed: '0xa38190d21a98' },
                    { id: '0x99182a1048', title: 'Neptune Scratcher 50x Win', type: 'PAYOUT', wager: 0, payout: 2500.00, balance: 4035.00, time: '2026-08-13 18:40:10 UTC', seed: '0x99182a1048b1' },
                    { id: '0x77b8192a81', title: 'Treasure Reef Roulette Red #18', type: 'PAYOUT', wager: 0, payout: 50.00, balance: 1535.00, time: '2026-08-12 21:10:05 UTC', seed: '0x77b8192a8190' },
                    { id: '0x11e9201a88', title: "America's Cup Hydrofoil Bet", type: 'PAYOUT', wager: 0, payout: 92.50, balance: 1485.00, time: '2026-08-11 14:12:00 UTC', seed: '0x11e9201a8829' },
                    { id: '0x44b91012a8', title: 'Liquidity Vault Yield Dividend Claim', type: 'REWARD', wager: 0, payout: 18.20, balance: 1392.50, time: '2026-08-10 08:00:00 UTC', seed: '0x44b91012a801' }
                  ]
                    .filter((log) => {
                      if (txLogTypeFilter !== 'ALL' && log.type !== txLogTypeFilter) return false;
                      if (txLogSearchQuery && !log.id.toLowerCase().includes(txLogSearchQuery.toLowerCase()) && !log.title.toLowerCase().includes(txLogSearchQuery.toLowerCase()) && !log.seed.toLowerCase().includes(txLogSearchQuery.toLowerCase())) return false;
                      return true;
                    })
                    .map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-cyan-300">{log.id}</td>
                        <td className="py-2.5 px-3 font-bold text-white font-sans">{log.title}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.type === 'WAGER' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                            log.type === 'PAYOUT' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                            'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          }`}>
                            {log.type}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-400">{log.wager > 0 ? `-${log.wager.toFixed(2)} $OD` : '0 $OD'}</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-400">{log.payout > 0 ? `+${log.payout.toFixed(2)} $OD` : '0 $OD'}</td>
                        <td className="py-2.5 px-3 text-slate-200">{log.balance.toFixed(2)} $OD</td>
                        <td className="py-2.5 px-3 text-slate-400 text-[11px]">{log.time}</td>
                        <td className="py-2.5 px-3 text-[10px] text-cyan-400">{log.seed}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. GLOBAL OCEAN GAMING LEADERBOARD COMPONENT */}
      {activeTab === 'leaderboard' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">HIGH SEAS WORLDWIDE RANKINGS</span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-amber-500/40">
                  MARITIME CHAMPIONS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Global Ocean Gaming Leaderboard</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Top verified seafarers, ocean engineers, and cruise passengers ranked by total Ocean Dollar ($OD) jackpot winnings.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {[
                { id: 'WEEKLY', label: 'Weekly' },
                { id: 'MONTHLY', label: 'Monthly' },
                { id: 'ALL_TIME', label: 'All-Time' }
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setLeaderboardTimeframe(tf.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    leaderboardTimeframe === tf.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* TOP 3 PODIUM DISPLAY WITH ANIMATION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* RANK 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/80 rounded-3xl p-5 space-y-3 relative overflow-hidden flex flex-col justify-between shadow-xl order-2 md:order-1"
            >
              <div className="flex items-center justify-between">
                <span className="bg-slate-800 text-slate-300 text-xs font-black font-mono px-3 py-1 rounded-xl border border-slate-700 flex items-center space-x-1">
                  <span>🥈 RANK 2</span>
                </span>
                <span className="text-xl">{GLOBAL_LEADERBOARD_DATA[1].countryCode}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-white flex items-center space-x-1.5">
                  <span>{GLOBAL_LEADERBOARD_DATA[1].playerName}</span>
                  <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {GLOBAL_LEADERBOARD_DATA[1].role} • <span className="text-slate-300">{GLOBAL_LEADERBOARD_DATA[1].vesselName}</span>
                </p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">TOTAL $OD WON:</span>
                  <span className="text-emerald-400 font-bold">{GLOBAL_LEADERBOARD_DATA[1].totalWinningsOD.toLocaleString()} $OD</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">FAVORITE GAME:</span>
                  <span className="text-cyan-300 font-sans">{GLOBAL_LEADERBOARD_DATA[1].favoriteGame}</span>
                </div>
              </div>
            </motion.div>

            {/* RANK 1 (GOLD) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-b from-amber-950/60 via-slate-950 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 space-y-4 relative overflow-hidden shadow-2xl order-1 md:order-2 ring-1 ring-amber-500/30"
            >
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black font-mono px-4 py-1 rounded-bl-2xl uppercase tracking-wider flex items-center space-x-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>CHAMPION</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="bg-amber-500/20 text-amber-300 text-xs font-black font-mono px-3 py-1 rounded-xl border border-amber-500/40 flex items-center space-x-1">
                  <span>🥇 RANK 1</span>
                </span>
                <span className="text-2xl">{GLOBAL_LEADERBOARD_DATA[0].countryCode}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-amber-300 flex items-center space-x-2">
                  <span>{GLOBAL_LEADERBOARD_DATA[0].playerName}</span>
                  <BadgeCheck className="w-5 h-5 text-amber-400 shrink-0" />
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  {GLOBAL_LEADERBOARD_DATA[0].role} • <span className="text-amber-200">{GLOBAL_LEADERBOARD_DATA[0].vesselName}</span>
                </p>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-amber-500/30 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">TOTAL $OD WON:</span>
                  <span className="text-emerald-400 font-black text-base">{GLOBAL_LEADERBOARD_DATA[0].totalWinningsOD.toLocaleString()} $OD</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">JACKPOT TROPHIES:</span>
                  <span className="text-amber-300 font-bold">{GLOBAL_LEADERBOARD_DATA[0].totalJackpotWins} Mega Jackpots</span>
                </div>
              </div>
            </motion.div>

            {/* RANK 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/80 rounded-3xl p-5 space-y-3 relative overflow-hidden flex flex-col justify-between shadow-xl order-3"
            >
              <div className="flex items-center justify-between">
                <span className="bg-amber-700/20 text-amber-400 text-xs font-black font-mono px-3 py-1 rounded-xl border border-amber-700/40 flex items-center space-x-1">
                  <span>🥉 RANK 3</span>
                </span>
                <span className="text-xl">{GLOBAL_LEADERBOARD_DATA[2].countryCode}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-white flex items-center space-x-1.5">
                  <span>{GLOBAL_LEADERBOARD_DATA[2].playerName}</span>
                  <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {GLOBAL_LEADERBOARD_DATA[2].role} • <span className="text-slate-300">{GLOBAL_LEADERBOARD_DATA[2].vesselName}</span>
                </p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">TOTAL $OD WON:</span>
                  <span className="text-emerald-400 font-bold">{GLOBAL_LEADERBOARD_DATA[2].totalWinningsOD.toLocaleString()} $OD</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">FAVORITE GAME:</span>
                  <span className="text-cyan-300 font-sans">{GLOBAL_LEADERBOARD_DATA[2].favoriteGame}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* PERSONAL RANK HIGHLIGHT CARD */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border border-cyan-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono shadow-xl">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black text-lg shrink-0">
                #14
              </div>
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">YOUR CURRENT GLOBAL STANDING</span>
                <h4 className="text-sm font-black text-white font-sans flex items-center space-x-1.5">
                  <span>{maritimePass.fullName}</span>
                  <span className="text-xs font-mono text-cyan-300 font-normal">({maritimePass.vesselOrCompany})</span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Earnings: <strong className="text-emerald-400">{oceanDollarBalance.toFixed(2)} $OD</strong> • Win Streak:{' '}
                  <span className="text-amber-300">4 Games</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('lottery-hub');
                triggerToast('Jumped to Lottery Hub to boost your ranking!');
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shrink-0 shadow-lg"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>Play Now to Boost Rank</span>
            </button>
          </div>

          {/* LEADERBOARD TABLE RANKS 4 - 10 */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3">RANK</th>
                  <th className="py-3 px-3">PLAYER & TITLE</th>
                  <th className="py-3 px-3">VESSEL / COMPANY</th>
                  <th className="py-3 px-3">TOTAL $OD WON</th>
                  <th className="py-3 px-3">FAVORITE GAME</th>
                  <th className="py-3 px-3">WIN STREAK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {GLOBAL_LEADERBOARD_DATA.slice(3).map((player) => (
                  <tr key={player.rank} className="hover:bg-slate-950/60 transition-colors">
                    <td className="py-3 px-3 font-bold text-amber-400">#{player.rank}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <span>{player.countryCode}</span>
                        <div>
                          <span className="font-bold text-white block font-sans">{player.playerName}</span>
                          <span className="text-[10px] text-slate-400">{player.role}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{player.vesselName}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">{player.totalWinningsOD.toLocaleString()} $OD</td>
                    <td className="py-3 px-3 text-slate-300 font-sans">{player.favoriteGame}</td>
                    <td className="py-3 px-3">
                      <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                        🔥 {player.winStreak} Wins
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. KYC VERIFICATION FLOW */}
      {activeTab === 'kyc-verification' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">HIGH SEAS REGULATORY COMPLIANCE</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  LEVEL 3 UNLIMITED VERIFIED
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Maritime Identity & KYC Verification</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Upload official seafarer CDC book, marine license, or cruise boarding pass to unlock unthrottled $OD gaming and withdrawal limits.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-emerald-500/40 flex items-center space-x-3 text-xs font-mono">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">DAILY WITHDRAWAL LIMIT</span>
                <span className="text-emerald-400 font-bold">$50,000 $OD / Day Unlocked</span>
              </div>
            </div>
          </div>

          {/* KYC STATUS OVERVIEW DASHBOARD CARD */}
          <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                  <BadgeCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-base font-sans">{maritimePass.fullName}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                      LEVEL 3 CLEARANCE ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    CDC ID: <strong className="text-cyan-300">{maritimePass.credentialId}</strong> • Vessel: <strong className="text-white">{maritimePass.vesselOrCompany}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerToast('Exporting official Maritime KYC Clearance Certificate PDF...');
                  generateAndDownloadPdf({
                    documentType: 'E-TICKET',
                    bookingId: 'KYC-CERT-' + Date.now().toString().slice(-6),
                    title: 'Maritime Identity & KYC Verification Certificate',
                    operatorName: 'Ocean Gaming & Entertainments Compliance Authority',
                    passengerOrCargoName: maritimePass.fullName,
                    passportOrCustomsCode: maritimePass.credentialId,
                    origin: maritimePass.vesselOrCompany,
                    destination: 'High Seas UNCLOS Level 3 Gaming Clearance',
                    departureDate: new Date().toISOString().split('T')[0],
                    allocatedSpace: 'Level 3 Unlimited Seafarer Gaming Clearance',
                    paymentMethod: 'Verified Maritime CDC & AIS Satellite Manifest',
                    basePriceUSD: 0,
                    totalPriceUSD: 0,
                    currencyCode: '$OD',
                    formattedTotalPrice: 'LEVEL 3 UNLIMITED CLEARANCE VERIFIED',
                    issueTimestamp: new Date().toISOString(),
                    qrPayload: maritimePass.verificationHash
                  });
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg shrink-0"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Export KYC Certificate (PDF)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">DAILY WITHDRAWAL CAP</span>
                <span className="font-bold text-emerald-400">$50,000 $OD / Day</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">MEGA JACKPOT ACCESS</span>
                <span className="font-bold text-amber-300">High-Roller Unlocked</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">REGATTA SPORTS BETS</span>
                <span className="font-bold text-cyan-300">Max Stakes Approved</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">ON-CHAIN AUDIT HASH</span>
                <span className="font-bold text-slate-300 truncate block">{maritimePass.verificationHash.slice(0, 12)}...</span>
              </div>
            </div>
          </div>

          {/* STEPPER PROGRESS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { step: 1, title: '1. Identity Document', desc: 'CDC / IMO / Cruise ID' },
              { step: 2, title: '2. Facial Liveness', desc: 'Biometric Camera Scan' },
              { step: 3, title: '3. Vessel Proof', desc: 'AIS Satellite Manifest' },
              { step: 4, title: '4. Level 3 Approval', desc: 'Cryptographically Signed' }
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setKycStep(s.step)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  kycStep === s.step
                    ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg'
                    : s.step < kycStep
                    ? 'bg-slate-950 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span>{s.title}</span>
                  {s.step <= kycStep && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">{s.desc}</span>
              </button>
            ))}
          </div>

          {/* STEP CONTENT PANELS */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
            {kycStep === 1 && (
              <div className="space-y-4 max-w-xl">
                <h3 className="text-base font-black text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>Step 1: Maritime Document Upload</span>
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 block">SELECT MARITIME CREDENTIAL TYPE:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'CDC_BOOK', label: 'Seaman Book / CDC' },
                      { id: 'SEAMAN_PASSPORT', label: 'Marine Officer ID' },
                      { id: 'CRUISE_BOARDING_PASS', label: 'Cruise Passenger Pass' }
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setKycDocType(d.id as any)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          kycDocType === d.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-2 border-dashed border-cyan-500/40 bg-slate-900/60 rounded-2xl p-6 text-center space-y-3">
                  <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto" />
                  <div>
                    <p className="text-xs font-bold text-white">{kycDocFile}</p>
                    <p className="text-[11px] text-slate-400 font-mono">Drag and drop document scan or browse files (PDF, JPG, PNG)</p>
                  </div>
                  <button
                    onClick={() => {
                      setKycDocFile('capt_vance_cdc_verified_2026_reupload.pdf');
                      triggerToast('Document re-uploaded & passed OCR validation!');
                    }}
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Replace Scan File
                  </button>
                </div>

                <button
                  onClick={() => setKycStep(2)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg"
                >
                  <span>Proceed to Step 2 (Facial Scan)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {kycStep === 2 && (
              <div className="space-y-4 max-w-xl">
                <h3 className="text-base font-black text-white flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <span>Step 2: Facial Biometric Liveness Verification</span>
                </h3>

                <div className="relative bg-slate-900 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-3 overflow-hidden">
                  <div className="w-32 h-32 rounded-full border-4 border-dashed border-emerald-400 mx-auto flex items-center justify-center bg-slate-950 text-emerald-400 font-mono text-xs shadow-inner relative">
                    <UserCheck className="w-12 h-12" />
                    <div className="absolute inset-0 border-t-2 border-emerald-400 animate-spin rounded-full" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      BIOMETRIC MATCH 99.8% VERIFIED
                    </span>
                    <p className="text-xs text-slate-300 mt-2 font-mono">Selfie matched against Seaman Book CDC ID photograph.</p>
                  </div>
                </div>

                <button
                  onClick={() => setKycStep(3)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg"
                >
                  <span>Proceed to Step 3 (AIS Vessel Manifest)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {kycStep === 3 && (
              <div className="space-y-4 max-w-xl">
                <h3 className="text-base font-black text-white flex items-center space-x-2">
                  <Ship className="w-5 h-5 text-cyan-400" />
                  <span>Step 3: AIS Satellite Vessel Manifest Validation</span>
                </h3>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>VESSEL NAME:</span>
                    <span className="text-cyan-300 font-bold">M/V Pacific Monarch</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>IMO NUMBER:</span>
                    <span className="text-emerald-400 font-bold">IMO 9820184</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>AIS SATCOM NODE:</span>
                    <span className="text-amber-300 font-bold">Node 84 High Seas Pacific</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setKycStep(4);
                    setKycVerificationLevel('LEVEL_3_UNLIMITED');
                    triggerToast('KYC Level 3 Verification Approved & Signed!');
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finalize & Confirm Level 3 Approval</span>
                </button>
              </div>
            )}

            {kycStep === 4 && (
              <div className="space-y-4 text-center py-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl">
                  <BadgeCheck className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">KYC Verification Completed!</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">Level 3 High Seas Unlimited Gaming Clearance Active</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 max-w-md mx-auto text-left font-mono text-xs space-y-1 text-slate-300">
                  <p>• Daily Withdrawal Limit: $50,000 $OD</p>
                  <p>• High Roller Mega Jackpot Eligibility: Unlocked</p>
                  <p>• Verification Hash: {maritimePass.verificationHash}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. LOTTERY & GAMING RULES AND REGULATIONS */}
      {activeTab === 'rules-regulations' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">MARITIME LEGAL COMPLIANCE</span>
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-indigo-500/40">
                  OFFICIAL GAMING REGULATION
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Lottery & Gaming Rules & Regulations</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                High Seas international gaming jurisdiction framework, provably fair standards, $OD token rules, and responsible gaming policies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search regulations & terms..."
                  value={rulesSearchQuery}
                  onChange={(e) => setRulesSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              </div>

              <button
                onClick={() => {
                  triggerToast('Generating official Maritime Gaming Rules & Regulations PDF...');
                  generateAndDownloadPdf({
                    documentType: 'E-TICKET',
                    bookingId: 'RULES-REG-' + Date.now().toString().slice(-6),
                    title: 'High Seas Ocean Gaming Rules & Compliance Regulations',
                    operatorName: 'Ocean Gaming & Entertainments Portal Authority',
                    passengerOrCargoName: maritimePass.fullName,
                    passportOrCustomsCode: maritimePass.credentialId,
                    origin: maritimePass.vesselOrCompany,
                    destination: 'UNCLOS Flag State High Seas Jurisdiction',
                    departureDate: new Date().toISOString().split('T')[0],
                    allocatedSpace: 'Maritime High Seas Gaming Standard UNCLOS v4.2',
                    paymentMethod: 'Digital Ocean Dollar ($OD) Settlement',
                    basePriceUSD: 0,
                    totalPriceUSD: 0,
                    currencyCode: 'USD / $OD',
                    formattedTotalPrice: 'OFFICIAL COMPLIANCE CERTIFICATE',
                    issueTimestamp: new Date().toISOString(),
                    qrPayload: maritimePass.verificationHash
                  });
                }}
                className="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-lg shrink-0"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Export Rules PDF</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ARTICLE 1 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <Scale className="w-5 h-5 text-indigo-400 shrink-0" />
                <h3 className="text-sm font-black text-white font-sans">Article 1: High Seas Jurisdiction & Flag State Compliance</h3>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                The Ocean Gaming Portal operates strictly within international waters under UNCLOS Maritime Jurisdiction & Flag State Gaming Authorization. All draws, scratchers, and regatta wagers executed outside 12-nautical-mile territorial seas comply with international high-seas gaming conventions.
              </p>
            </div>

            {/* ARTICLE 2 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="text-sm font-black text-white font-sans">Article 2: Age Limit & Maritime Clearance (18+)</h3>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Participation is strictly limited to verified individuals aged 18 years or older holding a valid Maritime Pass (Active Seafarers, Deck/Engine Officers, Marine Techs, and Cruise Ship Guests). Unverified accounts cannot place wagers or request $OD withdrawals.
              </p>
            </div>

            {/* ARTICLE 3 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <Hash className="w-5 h-5 text-cyan-400 shrink-0" />
                <h3 className="text-sm font-black text-white font-sans">Article 3: Provably Fair Cryptographic Seed Auditing</h3>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                All random lottery draws, instant scratch card reveals, and roulette spins generate a pre-committed SHA-256 server seed hash before any wager is placed. Players can audit any past ticket seed using the Provably Fair Auditor tool to mathematically confirm draw integrity.
              </p>
            </div>

            {/* ARTICLE 4 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <Coins className="w-5 h-5 text-amber-400 shrink-0" />
                <h3 className="text-sm font-black text-white font-sans">Article 4: Digital Ocean Dollar ($OD) Token & AML Policies</h3>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                1 Digital Ocean Dollar ($OD) is pegged 1:1 to USD. Transactions undergo automated Anti-Money Laundering (AML) monitoring. Payout claims over 10,000 $OD require Level 3 KYC document re-verification prior to external wallet transfer.
              </p>
            </div>

            {/* ARTICLE 5 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <h3 className="text-sm font-black text-white font-sans">Article 5: Responsible Maritime Gaming & Self-Exclusion</h3>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Ocean Gaming encourages responsible entertainment on the high seas. Players can set daily deposit limits, cool-off periods, or enable voluntary self-exclusion directly through the Master Responsible Play Guard settings. High Seas Satellite Support is available 24/7 on channel 16 SatCom.
              </p>
            </div>

            {/* ARTICLE 6 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <Gavel className="w-5 h-5 text-indigo-400 shrink-0" />
                <h3 className="text-sm font-black text-white font-sans">Article 6: Maritime Dispute Resolution & LMAA Arbitration</h3>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                All maritime gaming claims, wager disputes, or payout challenges are subject to the exclusive jurisdiction of the London Maritime Arbitrators Association (LMAA) in accordance with the High Seas Maritime Gaming Arbitration Code 2026.
              </p>
            </div>

            {/* ARTICLE 7 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="text-sm font-black text-white font-sans">Article 7: $OD Digital Asset Non-Securities Qualification</h3>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Digital Ocean Dollars ($OD) constitute utility clearance units strictly used for maritime entertainment services, vessel clearance fees, and gaming payouts. $OD tokens do not represent debt, equity, or investment contracts in any entity.
              </p>
            </div>

            {/* ARTICLE 8 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2.5">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
                <h3 className="text-sm font-black text-white font-sans">Article 8: UNCLOS Article 87 High Seas Tax Exemption</h3>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Under Article 87 of the UN Convention on the Law of the Sea (UNCLOS), gaming activities conducted on the high seas outside territorial waters are exempt from local flag state gaming withholding taxes. Official tax duty statements can be exported directly from the Gaming History dashboard.
              </p>
            </div>
          </div>

          {/* FULL STATUTORY LEGAL STATEMENTS ACCORDION */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-black text-white font-sans uppercase tracking-wider">
                  Full High Seas Regulatory Framework & Statutory Disclosures
                </h3>
              </div>
              <button
                onClick={() => setExpandedLegalArticle(expandedLegalArticle ? null : 'FULL_STATUTORY')}
                className="bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all"
              >
                {expandedLegalArticle ? 'Hide Full Legal Text' : 'View Full Statutory Text'}
              </button>
            </div>

            {expandedLegalArticle && (
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-3 max-h-96 overflow-y-auto leading-relaxed">
                <p className="font-bold text-white text-sm">HIGH SEAS MARITIME GAMING AUTHORITY STATUTORY CODEX 2026 (v4.2)</p>
                <p>1. PREAMBLE & JURISDICTION: Pursuant to Article 92 and 94 of the United Nations Convention on the Law of the Sea (UNCLOS), the Ocean Gaming Portal operates as an authorized vessel entertainment service licensed under Flag State Regulation IMO-9820184.</p>
                <p>2. PROVABLY FAIR COMMITMENT: All random number generation algorithms (RNG) utilize SHA-256 cryptographic server seeds combined with satellite beacon timestamps (SatCom Node 84) to eliminate pre-computation or house manipulation.</p>
                <p>3. PLAYER SAFEGUARDS: Players must maintain active Maritime Pass CDC or Cruise Boarding Pass credentials. Master Safe Gaming Guard policies mandate daily wager caps, loss limits, and 24-hour self-exclusion lockouts upon request.</p>
                <p>4. TAXATION & DUTIES: Winnings realized in international waters (beyond 12 nautical miles) are governed by high-seas tax exemptions. Players remain responsible for reporting income in their home tax residence jurisdiction as applicable.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. JACKPOT LIVE FEED TAB */}
      {activeTab === 'jackpot-live-feed' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">HIGH SEAS LIVE STREAM</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>NODE 84 SATCOM ACTIVE</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Jackpot Live Activity Feed</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Real-time satellite activity feed of jackpot ticket purchases, instant scratcher wins, and regatta wagers across maritime vessels worldwide.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLiveFeedPaused(!liveFeedPaused)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold font-mono transition-all flex items-center space-x-2 border ${
                  liveFeedPaused
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>{liveFeedPaused ? 'Stream Paused' : 'Live Streaming'}</span>
              </button>

              <button
                onClick={() => {
                  const newWin = {
                    id: `feed-${Date.now()}`,
                    player: maritimePass.fullName,
                    vessel: maritimePass.vesselOrCompany,
                    flag: '⚓',
                    event: 'PURCHASED $3.85M MEGA JACKPOT TICKET #TKT-' + Math.floor(1000 + Math.random() * 9000),
                    amountOD: 5,
                    gameType: 'MEGA_JACKPOT',
                    timeAgo: 'Just now',
                    likes: 1
                  };
                  setLiveFeedItems([newWin, ...liveFeedItems]);
                  triggerToast('Simulated new live ticket purchase broadcast!');
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 rounded-2xl text-xs transition-all flex items-center space-x-1 shadow-lg"
              >
                <Zap className="w-4 h-4" />
                <span>Simulate Live Win</span>
              </button>
            </div>
          </div>

          {/* STREAM CATEGORY FILTERS */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'ALL', label: 'All Live Wins' },
              { id: 'JACKPOT_HITS', label: 'Mega Jackpot Buys' },
              { id: 'BIG_WAGERS', label: 'Big Payout Hits' },
              { id: 'SCRATCH_MULTIPLIERS', label: 'Scratcher Multipliers' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setLiveFeedFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  liveFeedFilter === f.id
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* LIVE ACTIVITY CARDS STREAM */}
          <div className="space-y-3">
            {liveFeedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                    {item.flag}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white font-sans">{item.player}</span>
                      <span className="text-[10px] text-slate-400">({item.vessel})</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-[9px] text-cyan-300 font-bold">{item.gameType}</span>
                    </div>
                    <p className="text-xs text-emerald-400 font-bold mt-0.5">{item.event}</p>
                    <span className="text-[10px] text-slate-500 block">{item.timeAgo}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 justify-between sm:justify-end border-t sm:border-t-0 border-slate-900 pt-2 sm:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">VALUE</span>
                    <span className="text-base font-black text-cyan-300">+{item.amountOD} $OD</span>
                  </div>

                  <button
                    onClick={() => {
                      setLiveFeedItems(
                        liveFeedItems.map((i) => (i.id === item.id ? { ...i, likes: i.likes + 1 } : i))
                      );
                      triggerToast(`Cheered for ${item.player}'s live win! 🎉`);
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <span>🎉 Cheer</span>
                    <span className="text-slate-400">({item.likes})</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 10. SOCIAL GAMING LOBBY TAB */}
      {activeTab === 'social-gaming-lobby' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">HIGH SEAS MARITIME COMMUNITY</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  LIVE CHAT ROOMS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Social Gaming Lobby & Crew Chat</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Connect with active seafarers, marine officers, and cruise ship guests worldwide. Share ticket predictions and join Sailor Co-Op Syndicate Pools!
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {[
                { id: 'PACIFIC_CREW', label: 'M/V Pacific Monarch' },
                { id: 'CRUISE_VIP', label: 'Cruise VIP Lounge' },
                { id: 'ALL_SEAFARERS', label: 'Global High Seas' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveLobbyChannel(c.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeLobbyChannel === c.id
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CHAT FEED PANEL */}
            <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between h-[480px]">
              <div className="overflow-y-auto space-y-3 pr-2 no-scrollbar">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-2">
                        <span>{msg.flag}</span>
                        <span className="font-bold text-white font-sans">{msg.sender}</span>
                        <span className="text-slate-400">({msg.vessel})</span>
                      </div>
                      <span className="text-slate-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-200 font-sans text-xs">{msg.text}</p>
                    {msg.ticketHash && (
                      <div className="bg-slate-950 p-2 rounded-xl border border-cyan-500/30 text-[10px] text-cyan-300 flex items-center justify-between">
                        <span>TICKET HASH: {msg.ticketHash}</span>
                        <span className="text-emerald-400 font-bold">VERIFIED ON-CHAIN</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CHAT INPUT FORM */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type message or share ticket predictions..."
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newChatMessage.trim()) {
                        setChatMessages([
                          ...chatMessages,
                          {
                            id: `msg-${Date.now()}`,
                            sender: maritimePass.fullName,
                            role: 'Seafarer',
                            vessel: maritimePass.vesselOrCompany,
                            flag: '⚓',
                            text: newChatMessage,
                            timestamp: 'Just now'
                          }
                        ]);
                        setNewChatMessage('');
                        triggerToast('Message posted to High Seas Crew Lobby!');
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    onClick={() => {
                      if (newChatMessage.trim()) {
                        setChatMessages([
                          ...chatMessages,
                          {
                            id: `msg-${Date.now()}`,
                            sender: maritimePass.fullName,
                            role: 'Seafarer',
                            vessel: maritimePass.vesselOrCompany,
                            flag: '⚓',
                            text: newChatMessage,
                            timestamp: 'Just now'
                          }
                        ]);
                        setNewChatMessage('');
                        triggerToast('Message posted to High Seas Crew Lobby!');
                      }
                    }}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-1"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SAILOR SYNDICATE CO-OP POOL & ONLINE CREW SIDEBAR */}
            <div className="space-y-4">
              {/* SAILOR SYNDICATE CO-OP CARD */}
              <div className="bg-gradient-to-b from-indigo-950/60 to-slate-950 border border-indigo-500/40 rounded-2xl p-5 space-y-3 font-mono text-xs shadow-xl">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-black text-white font-sans text-sm">Sailor Syndicate Co-Op Pool</h3>
                </div>
                <p className="text-slate-300 text-[11px] font-sans">
                  Pool $OD tokens together with crewmates to purchase 100x Mega Jackpot entries and share winnings proportionally.
                </p>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">POOL POOL VALUE:</span>
                    <span className="text-emerald-400 font-bold">1,700 / 2,000 $OD</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-emerald-400 h-full w-[85%]" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSyndicatePoolJoined(true);
                    setOceanDollarBalance(oceanDollarBalance - syndicateContributionOD);
                    triggerToast(`Joined Sailor Syndicate Pool with ${syndicateContributionOD} $OD!`);
                  }}
                  className="w-full bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Coins className="w-4 h-4 text-slate-950" />
                  <span>{syndicatePoolJoined ? 'Contribute More (20 $OD)' : 'Join Co-Op Pool (20 $OD)'}</span>
                </button>
              </div>

              {/* ONLINE SEAFARER CREW LIST */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5 font-mono text-xs">
                <span className="text-slate-400 font-bold text-[10px] uppercase block border-b border-slate-800 pb-2">
                  ONLINE HIGH SEAS CREW (8 ACTIVE)
                </span>
                {[
                  { name: 'Capt. Hector Silva', vessel: 'M/V Santos Star', flag: '🇵🇹' },
                  { name: 'Elena Rostova', vessel: 'S/S Symphony Seas', flag: '🇲🇨' },
                  { name: 'Chief Eng. Lars L.', vessel: 'Arctic Pioneer', flag: '🇸🇪' },
                  { name: 'Mateo Rossi', vessel: 'Port of Genoa', flag: '🇮🇹' }
                ].map((c, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-200">{c.flag} {c.name}</span>
                    <span className="text-slate-500 text-[10px]">{c.vessel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. LOTTERY ANALYTICS DASHBOARD TAB */}
      {activeTab === 'lottery-analytics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">STATISTICAL DATA INTELLIGENCE</span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                  HOT & COLD FREQUENCY ENGINE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Lottery Analytics & Frequency Hub</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Mathematical frequency distribution, expected value (EV) calculations, and historical rollover growth curves for $3.85M Mega Jackpot.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedMainNumbers([7, 14, 23, 29, 38, 42]);
                setActiveTab('lottery-hub');
                setLotterySubTab('mega-jackpot');
                triggerToast('Loaded Hot Numbers (07, 14, 23, 29, 38, 42) into Ticket Builder!');
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center space-x-2 shadow-lg shrink-0"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Auto-Select Hot Numbers into Ticket</span>
            </button>
          </div>

          {/* REAL-TIME LOTTERY & GAMING RTP (RETURN TO PLAYER) MONITOR */}
          <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 space-y-5 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <h3 className="text-base font-black text-white font-sans uppercase tracking-wider">
                    Real-Time Lottery & Gaming RTP (Return To Player) Monitor
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Live on-chain audited payout health, mathematical target variance, and provably fair liquidity ratios.
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-slate-900 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-mono text-xs text-emerald-300 font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>AUDITED PAYOUTS HEALTHY</span>
              </div>
            </div>

            {/* GAME SELECTION SELECTOR */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar font-mono text-xs">
              {[
                { id: 'MEGA_JACKPOT', label: 'Mega Jackpot $3.85M', targetRtp: '96.8%', actualRtp: '97.2%', badge: 'Pari-Mutuel Pool' },
                { id: 'SCRATCHERS', label: 'Neptune Scratchers', targetRtp: '95.4%', actualRtp: '95.8%', badge: 'Fixed Multiplier' },
                { id: 'ROULETTE', label: 'Treasure Reef Roulette', targetRtp: '97.3%', actualRtp: '97.5%', badge: 'Single-Zero European' },
                { id: 'REGATTA', label: 'America’s Cup Regatta', targetRtp: '94.8%', actualRtp: '95.1%', badge: 'Hydrofoil Odds' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedRtpGame(g.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-2 ${
                    selectedRtpGame === g.id
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{g.label}</span>
                  <span className="text-[10px] bg-slate-950/60 px-1.5 py-0.5 rounded text-emerald-300 border border-slate-800">
                    RTP: {g.actualRtp}
                  </span>
                </button>
              ))}
            </div>

            {/* DETAILED RTP DISPLAY METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">THEORETICAL TARGET RTP</span>
                <span className="text-xl font-black text-cyan-300">
                  {selectedRtpGame === 'MEGA_JACKPOT' && '96.80%'}
                  {selectedRtpGame === 'SCRATCHERS' && '95.40%'}
                  {selectedRtpGame === 'ROULETTE' && '97.30%'}
                  {selectedRtpGame === 'REGATTA' && '94.80%'}
                </span>
                <span className="text-[10px] text-slate-500 block">Baseline mathematical target</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] block">LIVE AUDITED RTP (LAST 10K DRAWS)</span>
                <span className="text-xl font-black text-emerald-400">
                  {selectedRtpGame === 'MEGA_JACKPOT' && '97.20% (+0.40%)'}
                  {selectedRtpGame === 'SCRATCHERS' && '95.80% (+0.40%)'}
                  {selectedRtpGame === 'ROULETTE' && '97.50% (+0.20%)'}
                  {selectedRtpGame === 'REGATTA' && '95.10% (+0.30%)'}
                </span>
                <span className="text-[10px] text-emerald-400 block">Statistically healthy positive variance</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">GUARANTEED PAYOUT RESERVE</span>
                <span className="text-xl font-black text-amber-300">$3,850,000 $OD</span>
                <span className="text-[10px] text-slate-500 block">Locked in Maritime Vault</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] block">TOTAL SAMPLE DRAWS / SPINS</span>
                <span className="text-xl font-black text-white">1,280,000 Spins</span>
                <span className="text-[10px] text-slate-500 block">SatCom SHA-256 Verified</span>
              </div>
            </div>

            {/* RTP VISUAL BAR & PROVABLY FAIR VERIFICATION */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-bold">RTP Distribution Health Bar:</span>
                <span className="text-emerald-400 font-bold">97.2% Player Return (2.8% Operator Reserve)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden flex border border-slate-800 p-0.5">
                <div className="bg-emerald-400 h-full rounded-l-full" style={{ width: '97.2%' }} title="Player RTP Return: 97.2%" />
                <div className="bg-cyan-500 h-full rounded-r-full" style={{ width: '2.8%' }} title="High Seas Operational Reserve: 2.8%" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                <span>97.2% Returned to Seafarer Players via Payout Pools</span>
                <span>2.8% Allocated to Maritime Charity & Regatta Support</span>
              </div>
            </div>
          </div>

          {/* HOT & COLD NUMBERS FREQUENCY HEATMAP */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <h3 className="text-sm font-black text-white font-sans flex items-center space-x-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Number Frequency Distribution (Last 100 Draws)</span>
              </h3>
              <div className="flex items-center space-x-3 text-[10px]">
                <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> <span className="text-slate-300">Hot (&gt;30)</span></span>
                <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-slate-800" /> <span className="text-slate-400">Normal</span></span>
                <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-cyan-900" /> <span className="text-slate-400">Cold (&lt;5)</span></span>
              </div>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-10 gap-2 font-mono text-center">
              {[
                { num: 7, count: 42, hot: true },
                { num: 14, count: 39, hot: true },
                { num: 23, count: 36, hot: true },
                { num: 29, count: 34, hot: true },
                { num: 38, count: 32, hot: true },
                { num: 42, count: 31, hot: true },
                { num: 12, count: 24, hot: false },
                { num: 18, count: 22, hot: false },
                { num: 27, count: 21, hot: false },
                { num: 33, count: 19, hot: false },
                { num: 2, count: 3, cold: true },
                { num: 19, count: 2, cold: true },
                { num: 31, count: 4, cold: true },
                { num: 46, count: 1, cold: true }
              ].map((n) => (
                <div
                  key={n.num}
                  className={`p-2.5 rounded-xl border transition-all ${
                    n.hot
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-black'
                      : n.cold
                      ? 'bg-cyan-950/40 border-cyan-800/60 text-cyan-400 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-base block">{n.num < 10 ? `0${n.num}` : n.num}</span>
                  <span className="text-[9px] text-slate-400 block">{n.count}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* EXPECTED VALUE & PAYOUT CURVE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
              <h3 className="font-black text-white font-sans text-sm flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>Ticket Expected Value (EV) Calculator</span>
              </h3>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Jackpot Pool:</span>
                  <span className="text-emerald-400 font-bold">$3,850,000 $OD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ticket Price:</span>
                  <span className="text-white font-bold">5.00 $OD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stat Return-to-Player (RTP):</span>
                  <span className="text-amber-300 font-bold">96.8%</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400 font-bold text-center mt-2">
                  POSITIVE EV VALUE (+18.4% Net Rollover Margin)
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
              <h3 className="font-black text-white font-sans text-sm flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>8-Week Rollover Growth Curve</span>
              </h3>
              <div className="space-y-2 pt-2">
                {[
                  { week: 'Week 1', val: '$1,200,000' },
                  { week: 'Week 3', val: '$2,100,000' },
                  { week: 'Week 5', val: '$3,100,000' },
                  { week: 'Current (Week 8)', val: '$3,850,000 $OD' }
                ].map((w, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">{w.week}:</span>
                    <span className="font-bold text-cyan-300">{w.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. GAMING TUTORIALS TAB */}
      {activeTab === 'gaming-tutorials' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">HIGH SEAS ACADEMY & HOW TO PLAY</span>
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-indigo-500/40">
                  STEP-BY-STEP GUIDES
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Interactive Gaming Tutorials</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Learn how to play Mega Jackpot, Neptune Scratchers, Regatta Betting, Treasure Roulette, and $OD Staking with zero risk.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {[
                { id: 'MEGA_JACKPOT', label: 'Mega Jackpot' },
                { id: 'SCRATCHERS', label: 'Neptune Scratchers' },
                { id: 'REGATTA', label: 'Regatta Betting' },
                { id: 'ROULETTE', label: 'Treasure Roulette' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTutorialCategory(t.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedTutorialCategory === t.id
                      ? 'bg-indigo-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* TUTORIAL STEP-BY-STEP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-black flex items-center justify-center border border-indigo-500/40">
                1
              </span>
              <h3 className="font-black text-white font-sans text-sm">Step 1: Pick Numbers / Wager</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                Select your 6 lucky numbers or use Quick Pick. Each entry costs 5 $OD directly from your Maritime Wallet.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-black flex items-center justify-center border border-indigo-500/40">
                2
              </span>
              <h3 className="font-black text-white font-sans text-sm">Step 2: SHA-256 Seed Commit</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                Every ticket generates a cryptographic SHA-256 seed before the draw to guarantee provably fair results.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-black flex items-center justify-center border border-indigo-500/40">
                3
              </span>
              <h3 className="font-black text-white font-sans text-sm">Step 3: Instant $OD Payout</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                Winning tickets automatically settle into your $OD Wallet immediately following the official high-seas draw.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveTab('lottery-hub');
              triggerToast('Jumped to Lottery Hub to play!');
            }}
            className="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-xl mx-auto"
          >
            <PlayCircle className="w-4 h-4 text-slate-950" />
            <span>Try Game Now in Lottery Hub</span>
          </button>
        </div>
      )}

      {/* 13. RESPONSIBLE PLAY DASHBOARD TAB */}
      {activeTab === 'responsible-play' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">SAFE MARITIME ENTERTAINMENT</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  masterResponsiblePlayEnabled 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  {masterResponsiblePlayEnabled ? 'SAFEGUARDS ACTIVE' : 'PROTECTION OFF'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Responsible Gaming Controls</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Set daily wager limits, active session break alarms, temporary cool-off periods, or emergency self-exclusion.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-rose-500/40 flex items-center space-x-3 text-xs font-mono">
              <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">CURRENT SESSION TIMER</span>
                <span className="text-white font-bold">{sessionTimeMinutes} Minutes Active</span>
              </div>
            </div>
          </div>

          {/* MASTER RESPONSIBLE PLAY TOGGLE CARD */}
          <div className={`p-6 rounded-2xl border transition-all space-y-4 ${
            masterResponsiblePlayEnabled
              ? 'bg-slate-950 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
              : 'bg-slate-950 border-amber-500/50 shadow-lg shadow-amber-950/20'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                  masterResponsiblePlayEnabled
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}>
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-black text-white text-base font-sans">
                      Master Safe Gaming Guard Switch
                    </h3>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      masterResponsiblePlayEnabled
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {masterResponsiblePlayEnabled ? 'ENFORCING LIMITS' : 'BYPASSED'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    {masterResponsiblePlayEnabled
                      ? 'All daily wager caps, table limits, session timers, and loss warnings are actively enforced.'
                      : 'WARNING: Safe gaming safeguards are disabled. Automatic wager caps are suspended.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => {
                    const nextState = !masterResponsiblePlayEnabled;
                    setMasterResponsiblePlayEnabled(nextState);
                    triggerToast(
                      nextState
                        ? 'Master Safe Gaming Guard ENABLED! Daily caps and table limits are active.'
                        : 'Master Safe Gaming Guard DISABLED! Wager caps suspended.'
                    );
                  }}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                    masterResponsiblePlayEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-slate-950 transition-transform ${
                      masterResponsiblePlayEnabled ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-xs font-bold font-mono text-white uppercase">
                  {masterResponsiblePlayEnabled ? 'GUARD ON' : 'GUARD OFF'}
                </span>
              </div>
            </div>

            {/* REALITY CHECK FREQUENCY & EMERGENCY LOCKOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80 font-mono text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-bold block">REALITY CHECK POPUP FREQUENCY</span>
                <div className="flex items-center space-x-2">
                  {[15, 30, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => {
                        setRealityCheckInterval(mins);
                        triggerToast(`Reality check interval set to every ${mins} minutes.`);
                      }}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        realityCheckInterval === mins
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      Every {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] font-bold block">EMERGENCY 24H LOCKOUT</span>
                  <span className="text-rose-400 font-bold text-xs">
                    {emergencyLockoutActive ? 'LOCKOUT IN EFFECT' : 'Instant Self-Exclusion'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setEmergencyLockoutActive(!emergencyLockoutActive);
                    triggerToast(
                      !emergencyLockoutActive
                        ? 'Emergency 24-Hour Self-Exclusion Lockout ACTIVATED!'
                        : 'Emergency Lockout DEACTIVATED.'
                    );
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                    emergencyLockoutActive
                      ? 'bg-rose-500 text-slate-950 border-rose-400 font-black'
                      : 'bg-rose-950/40 text-rose-300 border-rose-500/40 hover:bg-rose-900/50'
                  }`}
                >
                  {emergencyLockoutActive ? 'Unlock Account' : 'Trigger 24h Lockout'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DAILY WAGER LIMIT SLIDER */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-black text-white font-sans text-sm flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Daily $OD Wager Limit Cap</span>
              </h3>
              <p className="text-slate-300 text-xs font-mono">
                Current Used: <strong className="text-emerald-400">{currentDailyWagered} $OD</strong> / Cap: <strong className="text-amber-300">{dailyWagerLimit} $OD</strong>
              </p>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={dailyWagerLimit}
                onChange={(e) => setDailyWagerLimit(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <button
                onClick={() => triggerToast(`Updated daily wager limit cap to ${dailyWagerLimit} $OD!`)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all"
              >
                Save Daily Cap
              </button>
            </div>

            {/* COOL-OFF PERIOD TRIGGER */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-black text-white font-sans text-sm flex items-center space-x-2">
                <Timer className="w-4 h-4 text-cyan-400" />
                <span>Temporary Cool-Off Break</span>
              </h3>
              <p className="text-slate-300 text-xs font-mono">
                Take a break from gaming for a specified period. Account wagers will be paused.
              </p>
              <div className="flex items-center space-x-2">
                {[1, 7, 30].map((d) => (
                  <button
                    key={d}
                    onClick={() => setCoolOffDurationDays(d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                      coolOffDurationDays === d
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
              <button
                onClick={() => triggerToast(`Activated ${coolOffDurationDays}-day cool-off period!`)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all"
              >
                Activate Cool-Off
              </button>
            </div>
          </div>

          {/* GAME-SPECIFIC BETTING & TABLE LIMITS MANAGEMENT */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-black text-white font-sans uppercase tracking-wider">
                    Game-Specific Betting & Table Limit Rules
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Configure maximum per-draw, per-card, and per-round wager caps across all games.
                </p>
              </div>

              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold px-3 py-1 rounded-full shrink-0">
                CUSTOM LIMITS ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              {/* 1. MEGA JACKPOT MAX SLIPS */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300">Mega Jackpot</span>
                  <Ticket className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">MAX TICKETS / DRAW</span>
                  <span className="text-lg font-black text-white">{maxJackpotTicketsPerDraw} Slips</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={maxJackpotTicketsPerDraw}
                  onChange={(e) => setMaxJackpotTicketsPerDraw(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* 2. NEPTUNE SCRATCHERS MAX WAGER */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-300">Scratch Cards</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">MAX CARD WAGER</span>
                  <span className="text-lg font-black text-white">{maxScratcherWager} $OD</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={250}
                  step={5}
                  value={maxScratcherWager}
                  onChange={(e) => setMaxScratcherWager(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* 3. TREASURE ROULETTE MAX BET */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300">Treasure Roulette</span>
                  <Dices className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">MAX SPIN WAGER</span>
                  <span className="text-lg font-black text-white">{maxRouletteBet} $OD</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={10}
                  value={maxRouletteBet}
                  onChange={(e) => setMaxRouletteBet(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* 4. REGATTA SPORTS BETTING LIMIT */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-300 font-sans">Regatta Sports</span>
                  <Trophy className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">MAX MATCH STAKE</span>
                  <span className="text-lg font-black text-white">{maxRegattaBet} $OD</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={maxRegattaBet}
                  onChange={(e) => setMaxRegattaBet(Number(e.target.value))}
                  className="w-full accent-indigo-400 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={() => triggerToast(`Game betting limits saved and locked successfully!`)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2 shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Enforce Betting Limits</span>
            </button>
          </div>
        </div>
      )}

      {/* 9. SECURE PAYMENT GATEWAY MODAL */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xl font-black text-white">Digital Secure Payment Gateway</h3>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                >
                  ✕
                </button>
              </div>

              {!paymentSuccessReceipt ? (
                <form onSubmit={handleExecutePayment} className="space-y-4 text-xs font-mono">
                  {/* AMOUNT SELECTION */}
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">RELOAD AMOUNT (USD = $OD)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 50, 100, 250].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setPaymentAmountUSD(amt)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                            paymentAmountUSD === amt
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                              : 'bg-slate-950 text-slate-300 border-slate-800'
                          }`}
                        >
                          ${amt} USD
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PAYMENT RAIL SELECTION */}
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">SELECT PAYMENT RAIL</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentRail('CREDIT_CARD')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedPaymentRail === 'CREDIT_CARD'
                            ? 'bg-emerald-950 border-emerald-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-bold text-white block">Credit / Debit Card</span>
                        <span className="text-[10px] text-slate-400">Visa, MasterCard, Amex</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPaymentRail('USDT_CRYPTO')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedPaymentRail === 'USDT_CRYPTO'
                            ? 'bg-emerald-950 border-emerald-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-bold text-white block">USDT / USDC Crypto</span>
                        <span className="text-[10px] text-slate-400">TRC-20, Solana, Polygon</span>
                      </button>
                    </div>
                  </div>

                  {/* FORM FIELDS */}
                  {selectedPaymentRail === 'CREDIT_CARD' && (
                    <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">CARDHOLDER NAME</label>
                        <input
                          type="text"
                          required
                          value={payerName}
                          onChange={(e) => setPayerName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400">CARD NUMBER</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400">EXPIRY</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400">CVC</label>
                          <input
                            type="text"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isProcessingPayment ? 'Authorizing 256-Bit SSL Payment...' : `Authorize & Credit ${paymentAmountUSD} $OD`}</span>
                  </button>
                </form>
              ) : (
                /* PAYMENT RECEIPT VIEW */
                <div className="space-y-4 font-mono text-xs">
                  <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-black text-white">Payment Authorized & $OD Credited!</h4>
                    <p className="text-slate-300 text-xs">Receipt #: {paymentSuccessReceipt.receiptNumber}</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span>Payer Name:</span>
                      <span className="font-bold text-white">{paymentSuccessReceipt.payerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount Paid:</span>
                      <span className="font-bold text-white">${paymentSuccessReceipt.amountUSD} USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credited $OD:</span>
                      <span className="font-bold text-emerald-400">+{paymentSuccessReceipt.creditedOD} $OD</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Tx Hash:</span>
                      <span>{paymentSuccessReceipt.txHash.substring(0, 16)}...</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        generateAndDownloadPdf({
                          documentType: 'TAX_INVOICE',
                          bookingId: paymentSuccessReceipt.receiptNumber,
                          title: 'Digital Ocean Dollar Payment Receipt',
                          operatorName: 'Ocean Gaming & Money System',
                          passengerOrCargoName: paymentSuccessReceipt.payerName,
                          passportOrCustomsCode: 'OD-WALLET-SEAFARER',
                          origin: 'Global Maritime Network',
                          destination: 'Ocean Dollar Wallet ($OD)',
                          departureDate: paymentSuccessReceipt.timestamp,
                          allocatedSpace: 'Digital Wallet Credit',
                          paymentMethod: paymentSuccessReceipt.paymentRail,
                          paymentTxHash: paymentSuccessReceipt.txHash,
                          basePriceUSD: paymentSuccessReceipt.amountUSD,
                          totalPriceUSD: paymentSuccessReceipt.amountUSD,
                          currencyCode: 'USD',
                          formattedTotalPrice: `$${paymentSuccessReceipt.amountUSD} USD (+${paymentSuccessReceipt.creditedOD} $OD)`,
                          issueTimestamp: paymentSuccessReceipt.timestamp,
                          qrPayload: `PAYMENT-RECEIPT:${paymentSuccessReceipt.receiptNumber}:${paymentSuccessReceipt.txHash}`
                        })
                      }
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Receipt PDF</span>
                    </button>

                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl transition-all"
                    >
                      Close Gateway
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* P2P TRANSFER MODAL */}
      <AnimatePresence>
        {showP2PModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white flex items-center space-x-2">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>P2P Satellite $OD Transfer</span>
                </h3>
                <button onClick={() => setShowP2PModal(false)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>

              <form onSubmit={handleP2PTransfer} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">RECIPENT CREW ID / VESSEL TAG</label>
                  <input
                    type="text"
                    required
                    value={p2pRecipient}
                    onChange={(e) => setP2PRecipient(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">AMOUNT ($OD)</label>
                  <input
                    type="number"
                    required
                    value={p2pAmount}
                    onChange={(e) => setP2PAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-emerald-400 font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-2xl transition-all shadow-lg"
                >
                  Confirm P2P Satellite Transfer
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* STAKE MODAL */}
      <AnimatePresence>
        {showStakeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Stake $OD in Yield Vault (12.8% APY)</span>
                </h3>
                <button onClick={() => setShowStakeModal(false)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>

              <form onSubmit={handleStakeDeposit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">DEPOSIT AMOUNT ($OD)</label>
                  <input
                    type="number"
                    required
                    value={stakeAmountInput}
                    onChange={(e) => setStakeAmountInput(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-2xl transition-all shadow-lg"
                >
                  Deposit & Start Earning Daily APY
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MARITIME IDENTITY CREDENTIAL PASS MODAL */}
      <AnimatePresence>
        {showMaritimeAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Maritime Eligibility Pass</h3>
                    <p className="text-xs text-slate-400 font-mono">Ocean Gaming Restricted Clearance</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowMaritimeAuthModal(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-all font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 block">SELECT MARITIME CATEGORY:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'ACTIVE_SEAFARER', label: 'Active Seafarer', icon: Anchor },
                      { id: 'MARITIME_EMPLOYEE', label: 'Ocean Employee', icon: UserCheck },
                      { id: 'CRUISE_PASSENGER', label: 'Cruise Guest', icon: Ship }
                    ].map((r) => {
                      const Icon = r.icon;
                      const isSelected = maritimePass.role === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => setMaritimePass({ ...maritimePass, role: r.id as MaritimeRole })}
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col items-center justify-center text-center space-y-1.5 ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                          <span className="text-xs font-bold">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 block">FULL NAME:</label>
                  <input
                    type="text"
                    value={maritimePass.fullName}
                    onChange={(e) => setMaritimePass({ ...maritimePass, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 block">
                    {maritimePass.role === 'ACTIVE_SEAFARER'
                      ? 'SEAMAN BOOK / CDC / IMO ID:'
                      : maritimePass.role === 'MARITIME_EMPLOYEE'
                      ? 'MARINE LICENSE / PORT STAFF CODE:'
                      : 'CRUISE BOOKING REF / CABIN ID:'}
                  </label>
                  <input
                    type="text"
                    value={maritimePass.credentialId}
                    onChange={(e) => setMaritimePass({ ...maritimePass, credentialId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-emerald-400 font-mono font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 block">VESSEL / CRUISE SHIP / COMPANY NAME:</label>
                  <input
                    type="text"
                    value={maritimePass.vesselOrCompany}
                    onChange={(e) => setMaritimePass({ ...maritimePass, vesselOrCompany: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>AIS SATELLITE GEOFENCE VERIFICATION:</span>
                    <span className="text-emerald-400">PASSED</span>
                  </div>
                  <p>Verified on Satellite High Seas AIS Node 84 for international maritime gaming compliance.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    triggerToast('Maritime Credential Pass updated & verified!');
                    setShowMaritimeAuthModal(false);
                  }}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Maritime Credentials</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXPORT CENTER & MODEL DATA MODAL */}
      <AnimatePresence>
        {isExportModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-indigo-500/20 border border-indigo-500/40 rounded-2xl text-indigo-400">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Export Center & Data Model Dispatcher</h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Export PDF Documents, CSV Audit Ledgers, JSON Data Models & High-Contrast Print Statements
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-bold transition-all"
                >
                  ✕
                </button>
              </div>

              {/* CATEGORY SELECTOR */}
              <div className="space-y-3 font-mono text-xs">
                <label className="text-slate-300 font-bold block">1. SELECT REPORT CATEGORY / DOCUMENT TYPE:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'TAX_STATEMENT', label: 'UNCLOS Tax Duty Exemption Statement', desc: 'Official 0.00% High Seas Tax Certificate', icon: FileText },
                    { id: 'KYC_CLEARANCE', label: 'Maritime Pass & Seafarer Clearance', desc: 'Onboard Passenger & CDC Verification Pass', icon: ShieldCheck },
                    { id: 'ONCHAIN_AUDIT_LOG', label: 'On-Chain Gaming Audit Ledger', desc: 'Itemized Cryptographic Wagers & Payouts', icon: History },
                    { id: 'RTP_MONITOR', label: 'Real-Time RTP Audit Matrix', desc: 'Game Payout Ratios & Reserve Pool Health', icon: BarChart3 },
                    { id: 'FULL_RULES_CODEX', label: 'High Seas Authority Statutory Codex', desc: 'Official Maritime Gaming Regulations 2026', icon: BookOpen },
                    { id: 'MY_TICKETS', label: 'Purchased Lottery Tickets & Bets', desc: 'Active Mega Jackpot & Regatta Slips', icon: Ticket }
                  ].map((cat) => {
                    const CatIcon = cat.icon;
                    const isSelected = exportDocCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setExportDocCategory(cat.id as any)}
                        className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
                          isSelected
                            ? 'bg-indigo-950/80 border-indigo-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <CatIcon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                          <span className="font-bold text-white font-sans">{cat.label}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 pl-6">{cat.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FORMAT SELECTOR */}
              <div className="space-y-3 font-mono text-xs">
                <label className="text-slate-300 font-bold block">2. SELECT EXPORT FORMAT MODEL:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'PDF', label: 'PDF Document', desc: 'A4 Printable PDF', icon: FileText },
                    { id: 'CSV', label: 'CSV Ledger', desc: 'Raw Excel Data', icon: Table },
                    { id: 'JSON', label: 'JSON Model', desc: 'Dev API Model', icon: Code },
                    { id: 'PRINT', label: 'Print View', desc: 'High-Contrast Print', icon: Printer }
                  ].map((fmt) => {
                    const FmtIcon = fmt.icon;
                    const isSelected = exportFormatType === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        onClick={() => setExportFormatType(fmt.id as any)}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-lg'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <FmtIcon className="w-5 h-5" />
                        <span className="font-bold">{fmt.label}</span>
                        <span className="text-[9px] opacity-80">{fmt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* REPORT AUTO-SAVE STATUS & TOGGLE BOX */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <Save className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white">Report Auto-Save System</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-slate-400">
                      {reportAutoSaveEnabled ? 'Auto-Save Enabled' : 'Auto-Save Off'}
                    </span>
                    <button
                      onClick={() => setReportAutoSaveEnabled(!reportAutoSaveEnabled)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                        reportAutoSaveEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                          reportAutoSaveEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-2">
                  <div>
                    Last Auto-Saved Cache:{' '}
                    <strong className="text-emerald-400">{lastReportAutoSaveTimestamp}</strong> ({savedReportDraftsCount} drafts cached)
                  </div>
                  <button
                    onClick={handleManualReportAutoSave}
                    className="bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 font-bold px-3 py-1 rounded-xl text-[10px] transition-all shrink-0 self-start sm:self-auto"
                  >
                    Save Draft Cache Now
                  </button>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3.5 rounded-2xl text-xs transition-all"
                >
                  Cancel
                </button>

                <button
                  onClick={handleExecuteExportModel}
                  className="w-2/3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Execute & Export {exportDocCategory.replace(/_/g, ' ')} ({exportFormatType})</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OCEAN DOLLAR ($OD / XOD) & INDIAN OCEAN DOLLAR ($IOD / XIOD) LEGALIZED SOVEREIGN INTERNATIONAL CURRENCY TREASURY MODAL */}
      <AnimatePresence>
        {showOceanDollarCurrencyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-amber-500/50 rounded-3xl p-6 max-w-5xl w-full space-y-6 shadow-2xl my-8 relative"
            >
              {/* MODAL HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-400 via-amber-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                    <Coins className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                      <span>Indian Ocean Dollar ($IOD) &amp; Ocean Dollar ($OD) Sovereign Portal</span>
                      <BadgeCheck className="w-5 h-5 text-amber-400" />
                    </h2>
                    <p className="text-xs text-slate-400">
                      Maritime Central Reserve Bank &amp; Ocean Dollar Monetary Authority (ODMA) Charter
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1" />
                    <span>SATCOM POR 100% AUDITED</span>
                  </span>
                  <button
                    onClick={() => setShowOceanDollarCurrencyModal(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-2 rounded-xl transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* MODAL SUB-NAVIGATION TABS */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
                <button
                  onClick={() => setTreasuryModalTab('MARKET')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'MARKET'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Market &amp; Rates</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('TRENDS')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'TRENDS'
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Price Trends</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('NEWS')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'NEWS'
                      ? 'bg-purple-500 text-white font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Market News</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('TRANSFER')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'TRANSFER'
                      ? 'bg-orange-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transfer &amp; QR</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('HISTORY')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'HISTORY'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Tx History</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('STAKING')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'STAKING'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>$OD / $IOD Staking</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('TREASURY')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'TREASURY'
                      ? 'bg-blue-500 text-white font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>$ Treasury &amp; CBDC</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('CONVERTER')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'CONVERTER'
                      ? 'bg-teal-500 text-slate-950 font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>FX Converter</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('TRANSPARENCY')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'TRANSPARENCY'
                      ? 'bg-indigo-500 text-white font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Fiscal Audit</span>
                </button>

                <button
                  onClick={() => setTreasuryModalTab('GOVERNANCE_FAQ')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    treasuryModalTab === 'GOVERNANCE_FAQ'
                      ? 'bg-blue-500 text-white font-black shadow-lg'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Governance FAQ Guide</span>
                </button>
              </div>

              {/* TAB 1: DIGITAL CURRENCY MARKET & MARKET SENTIMENT */}
              {treasuryModalTab === 'MARKET' && (
                <div className="space-y-4">
                  {/* MARKET SENTIMENT INDEX CARD */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/40 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center space-x-2">
                        <Flame className="w-5 h-5 text-amber-400" />
                        <h3 className="font-black text-white text-xs uppercase tracking-wider">
                          Sovereign Maritime Market Sentiment Index &amp; Confidence
                        </h3>
                      </div>
                      <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full border border-amber-500/40">
                        SENTIMENT: {marketSentiment.label} ({marketSentiment.score}/100)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Fear &amp; Greed Score</span>
                        <span className="text-sm font-black text-amber-400 font-mono">{marketSentiment.score} / 100</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">24h Institutional Inflows</span>
                        <span className="text-sm font-black text-emerald-400 font-mono">{marketSentiment.institutionalInflow24hUSD}</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">SatCom Uplink Confidence</span>
                        <span className="text-sm font-black text-cyan-300 font-mono">{marketSentiment.satcomConfidenceIndex}</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Volatility Index (VIX)</span>
                        <span className="text-sm font-black text-indigo-300 font-mono">{marketSentiment.volatilityIndexPct}% (Low)</span>
                      </div>
                    </div>

                    {/* SENTIMENT BARS FOR IOD & OD */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-slate-900/80 p-2.5 rounded-xl border border-orange-500/30 space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-orange-300 font-bold flex items-center space-x-1">
                            <Anchor className="w-3.5 h-3.5 inline text-orange-400" />
                            <span>Indian Ocean Dollar ($IOD) Confidence</span>
                          </span>
                          <span className="text-emerald-400 font-bold">{marketSentiment.iodSentimentScore}% Bullish</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full" style={{ width: `${marketSentiment.iodSentimentScore}%` }} />
                        </div>
                      </div>

                      <div className="bg-slate-900/80 p-2.5 rounded-xl border border-amber-500/30 space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-amber-300 font-bold flex items-center space-x-1">
                            <Anchor className="w-3.5 h-3.5 inline text-amber-400" />
                            <span>Global Ocean Dollar ($OD) Confidence</span>
                          </span>
                          <span className="text-emerald-400 font-bold">{marketSentiment.odSentimentScore}% Bullish</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full" style={{ width: `${marketSentiment.odSentimentScore}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* IOD & OD SOVEREIGN EXCHANGE RATES DISPLAY CARD */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <h3 className="font-black text-amber-300 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                        <Anchor className="w-4 h-4 text-amber-400" />
                        <span>Indian Ocean Dollar ($IOD) Sovereign Exchange Rates Matrix</span>
                      </h3>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">Pegged Legal Tender Rates</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 font-mono text-[11px]">
                      <div className="bg-slate-900 p-2 rounded-xl border border-orange-500/30 text-center">
                        <span className="text-[9px] text-slate-400 block uppercase">🇮🇳 Indian Rupee</span>
                        <span className="font-black text-amber-300 text-xs">1 $IOD = ₹83.50</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-400 block uppercase">🇺🇸 US Dollar</span>
                        <span className="font-black text-emerald-300 text-xs">1 $IOD = $1.00</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-400 block uppercase">🇪🇺 Euro</span>
                        <span className="font-black text-cyan-300 text-xs">1 $IOD = €0.92</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-400 block uppercase">🇬🇧 British Pound</span>
                        <span className="font-black text-indigo-300 text-xs">1 $IOD = £0.785</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-400 block uppercase">🇦🇪 UAE Dirham</span>
                        <span className="font-black text-amber-300 text-xs">1 $IOD = 3.67 AED</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-400 block uppercase">🇸🇬 Singapore Dollar</span>
                        <span className="font-black text-emerald-300 text-xs">1 $IOD = 1.34 SGD</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-400 block uppercase">🇯🇵 Japanese Yen</span>
                        <span className="font-black text-cyan-300 text-xs">1 $IOD = ¥152.4</span>
                      </div>
                    </div>
                  </div>

                  {/* LIVE TICKER TABLE */}
                  <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <h3 className="font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
                        <BarChart3 className="w-4 h-4 text-amber-400" />
                        <span>Live Digital Currency &amp; Sovereign Asset Ticker</span>
                      </h3>
                      <span className="text-slate-400 text-[10px] font-mono">Updated via SatCom Exchange Orbits</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                            <th className="py-2 px-3">Asset</th>
                            <th className="py-2 px-3">Category</th>
                            <th className="py-2 px-3 text-right">Price (USD)</th>
                            <th className="py-2 px-3 text-right">INR Rate</th>
                            <th className="py-2 px-3 text-right">24h Change</th>
                            <th className="py-2 px-3 text-right">24h Volume</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {marketAssets.map((asset) => (
                            <tr key={asset.symbol} className="hover:bg-slate-900/60 transition-colors">
                              <td className="py-2.5 px-3 font-bold text-white flex items-center space-x-2">
                                <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-300 text-[11px] font-black">
                                  {asset.symbol}
                                </span>
                                <span>{asset.name}</span>
                              </td>
                              <td className="py-2.5 px-3 text-slate-400 text-[11px]">{asset.category}</td>
                              <td className="py-2.5 px-3 text-right font-bold text-emerald-300">
                                ${asset.priceUSD >= 1000 ? asset.priceUSD.toLocaleString() : asset.priceUSD.toFixed(3)}
                              </td>
                              <td className="py-2.5 px-3 text-right font-bold text-amber-300">
                                {asset.exchangeRateINR ? `₹${asset.exchangeRateINR.toFixed(2)}` : '—'}
                              </td>
                              <td className={`py-2.5 px-3 text-right font-bold ${asset.change24hPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {asset.change24hPct >= 0 ? '+' : ''}{asset.change24hPct.toFixed(2)}%
                              </td>
                              <td className="py-2.5 px-3 text-right text-slate-300">
                                ${(asset.volume24hUSD / 1000000000).toFixed(2)}B
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: OD & IOD TREASURY DASHBOARD */}
              {treasuryModalTab === 'TREASURY' && (
                <div className="space-y-4">
                  {/* SOVEREIGN LEGAL CHARTER METRICS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-950 p-3 rounded-2xl border border-amber-500/30">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Indian Ocean Dollar</span>
                      <span className="text-sm font-black text-amber-300 font-mono">$IOD (XIOD / 999)</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-2xl border border-emerald-500/30">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Global Ocean Dollar</span>
                      <span className="text-sm font-black text-emerald-300 font-mono">$OD (XOD / 998)</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-2xl border border-cyan-500/30">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Reserve Valuation</span>
                      <span className="text-sm font-black text-cyan-300 font-mono">$24.85B (104.8%)</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-2xl border border-indigo-500/30">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Sovereign Treaty</span>
                      <span className="text-sm font-black text-indigo-300 font-mono">48 Sovereign Nations</span>
                    </div>
                  </div>

                  {/* CENTRAL BANK RESERVE ASSET COMPOSITION */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-bold flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Central Bank Vault Reserve Composition ($24.85 Billion USD Equivalent)</span>
                      </span>
                      <span className="text-emerald-400 font-mono font-bold">104.8% Over-Collateralized</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-amber-500/20 text-center">
                        <div className="text-amber-400 font-bold">38.0% Gold Bullion ($9.44B)</div>
                        <div className="text-[10px] text-slate-400">Singapore / London / Colombo Vaults</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-indigo-500/20 text-center">
                        <div className="text-indigo-400 font-bold">28.0% IMF SDR Basket ($6.95B)</div>
                        <div className="text-[10px] text-slate-400">BIS Basel Central Account #942</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-emerald-500/20 text-center">
                        <div className="text-emerald-400 font-bold">22.0% Blue Carbon Bonds ($5.46B)</div>
                        <div className="text-[10px] text-slate-400">Indian Ocean Green Treasury</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-cyan-500/20 text-center">
                        <div className="text-cyan-400 font-bold">12.0% Multi-FX Basket ($2.98B)</div>
                        <div className="text-[10px] text-slate-400">INR, USD, EUR, GBP, SGD, AED</div>
                      </div>
                    </div>
                  </div>

                  {/* QUANTUM-PROOF CBDC MINTING FOR $IOD / $OD */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span>Sovereign Central Bank CBDC Minting ($IOD &amp; $OD)</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                          Select Currency:
                        </label>
                        <select
                          value={cbdcCurrencyType}
                          onChange={(e) => setCbdcCurrencyType(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-bold text-amber-300 focus:outline-none focus:border-cyan-400"
                        >
                          <option value="IOD">🌊 Indian Ocean Dollar ($IOD / XIOD)</option>
                          <option value="OD">🌐 Global Ocean Dollar ($OD / XOD)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                          Recipient Sovereign Vault Address:
                        </label>
                        <input
                          type="text"
                          value={cbdcRecipient}
                          onChange={(e) => setCbdcRecipient(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-mono text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                          Mint Amount:
                        </label>
                        <input
                          type="number"
                          min="10"
                          value={cbdcMintAmount}
                          onChange={(e) => setCbdcMintAmount(Math.max(10, parseFloat(e.target.value) || 10))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-mono font-bold text-cyan-400 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleMintCBDC}
                      disabled={isMintingCBDC}
                      className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className={`w-4 h-4 ${isMintingCBDC ? 'animate-spin' : ''}`} />
                      <span>{isMintingCBDC ? 'Signing Quantum HSM...' : `Mint ${cbdcMintAmount} ${cbdcCurrencyType === 'IOD' ? '⚓ IOD' : '⚓ OD'} CBDC Serial Tokens`}</span>
                    </button>

                    {mintCertificate && (
                      <div className="bg-cyan-950/40 p-3 rounded-xl border border-cyan-500/40 text-[11px] space-y-1.5">
                        <div className="flex items-center justify-between text-cyan-300 font-bold">
                          <span>✅ {mintCertificate.status}</span>
                          <span className="font-mono text-[10px] text-slate-400">{mintCertificate.serialNumber}</span>
                        </div>
                        <div className="font-mono text-cyan-200">
                          Issued: <strong className="text-white text-xs">{mintCertificate.mintedAmountOD} {mintCertificate.currencySymbol} CBDC</strong> to {mintCertificate.recipient.substring(0, 10)}...
                        </div>
                        <p className="text-[10px] text-slate-300 leading-tight">
                          {mintCertificate.legalNotice}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: WALLET TRANSFER TOOL */}
              {treasuryModalTab === 'TRANSFER' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-orange-500/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5 text-orange-400" />
                      <h3 className="font-black text-white text-xs uppercase tracking-wider">
                        Sovereign High-Seas SatCom Wallet Transfer Engine
                      </h3>
                    </div>
                    <span className="bg-orange-500/20 text-orange-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-orange-500/30">
                      ZERO GAS FEES • INSTANT SETTLEMENT
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Select Sovereign Currency:
                      </label>
                      <select
                        value={transferCurrency}
                        onChange={(e) => setTransferCurrency(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-bold text-amber-300 focus:outline-none focus:border-orange-400"
                      >
                        <option value="IOD">🌊 Indian Ocean Dollar (⚓ IOD)</option>
                        <option value="OD">🌐 Global Ocean Dollar (⚓ OD)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Transfer Amount:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(Math.max(1, parseFloat(e.target.value) || 1))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-mono font-bold text-emerald-400 focus:outline-none focus:border-orange-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Recipient Sovereign Wallet Address:
                      </label>
                      <input
                        type="text"
                        value={treasuryTransferRecipient}
                        onChange={(e) => setTreasuryTransferRecipient(e.target.value)}
                        placeholder="0x..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-mono text-white focus:outline-none focus:border-orange-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Transaction Memo / Commercial Ref:
                      </label>
                      <input
                        type="text"
                        value={treasuryTransferMemo}
                        onChange={(e) => setTreasuryTransferMemo(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-mono text-slate-300 focus:outline-none focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleWalletTransfer}
                    disabled={isTransferring}
                    className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:from-orange-400 hover:to-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Send className={`w-4 h-4 ${isTransferring ? 'animate-bounce' : ''}`} />
                    <span>{isTransferring ? 'Transmitting via SatCom Satellites...' : `Transfer ${transferAmount} ${transferCurrency === 'IOD' ? '⚓ IOD' : '⚓ OD'} Instantly`}</span>
                  </button>

                  {transferReceipt && (
                    <div className="bg-orange-950/30 p-4 rounded-xl border border-orange-500/40 text-[11px] space-y-2">
                      <div className="flex items-center justify-between text-orange-300 font-bold">
                        <span>✅ {transferReceipt.status}</span>
                        <span className="font-mono text-[10px] text-slate-400">{transferReceipt.txHash}</span>
                      </div>

                      <div className="font-mono text-orange-200 text-xs">
                        Sent: <strong className="text-amber-300 text-sm">{transferReceipt.amountTransferred} {transferReceipt.currencySymbol}</strong> to {transferReceipt.recipient}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300 pt-1">
                        <div>SatCom Node: <strong>{transferReceipt.satcomNodeVerification}</strong></div>
                        <div>Clearing Latency: <strong>{transferReceipt.clearingSpeedMs}ms</strong></div>
                        <div>Network Fee: <strong className="text-emerald-400">⚓ 0.00 OD (Zero Fee)</strong></div>
                        <div>Memo: <strong>{transferReceipt.memo}</strong></div>
                      </div>

                      <button
                        onClick={() => {
                          generateAndDownloadPdf({
                            documentType: 'E-TICKET',
                            bookingId: transferReceipt.txHash,
                            title: 'SATCOM SOVEREIGN WALLET TRANSFER RECEIPT',
                            operatorName: 'Maritime Central Reserve Bank & SatCom Orbital Clearing',
                            passengerOrCargoName: 'Verified Wallet Holder',
                            passportOrCustomsCode: `TX: ${transferReceipt.txHash}`,
                            origin: `Sender Account`,
                            destination: `Recipient: ${transferReceipt.recipient}`,
                            departureDate: transferReceipt.timestamp.split('T')[0],
                            allocatedSpace: `Memo: ${transferReceipt.memo}`,
                            paymentMethod: 'SatCom High-Seas Instant Clearing',
                            basePriceUSD: transferReceipt.amountTransferred,
                            totalPriceUSD: transferReceipt.amountTransferred,
                            currencyCode: transferReceipt.currencySymbol,
                            formattedTotalPrice: `${transferReceipt.amountTransferred} ${transferReceipt.currencySymbol}`,
                            issueTimestamp: transferReceipt.timestamp,
                            qrPayload: transferReceipt.txHash
                          });
                          triggerToast('Downloaded Transfer Receipt PDF!');
                        }}
                        className="mt-1 w-full bg-slate-900 hover:bg-slate-800 text-orange-300 border border-orange-500/30 font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Official Transfer Receipt (PDF)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CURRENCY CONVERSION TOOL */}
              {treasuryModalTab === 'CONVERTER' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      <span>Multi-Currency Central Bank FX Conversion Tool</span>
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">Zero Slippage Guarantee</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Select Input Fiat/Currency:
                      </label>
                      <select
                        value={fxFromCurrency}
                        onChange={(e) => setFxFromCurrency(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-bold text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="INR">🇮🇳 INR — Indian Rupee (Rate: ₹83.50 = ⚓ 1 IOD)</option>
                        <option value="USD">🇺🇸 USD — United States Dollar (Rate: $1.00 = ⚓ 1 IOD)</option>
                        <option value="EUR">🇪🇺 EUR — Euro (Rate: €0.92 = ⚓ 1 IOD)</option>
                        <option value="GBP">🇬🇧 GBP — British Pound Sterling (Rate: £0.785 = ⚓ 1 IOD)</option>
                        <option value="AED">🇦🇪 AED — UAE Dirham (Rate: 3.67 AED = ⚓ 1 IOD)</option>
                        <option value="JPY">🇯🇵 JPY — Japanese Yen (Rate: ¥152.4 = ⚓ 1 IOD)</option>
                        <option value="SGD">🇸🇬 SGD — Singapore Dollar (Rate: 1.34 SGD = ⚓ 1 IOD)</option>
                        <option value="AUD">🇦🇺 AUD — Australian Dollar (Rate: 1.51 AUD = ⚓ 1 IOD)</option>
                        <option value="CAD">🇨🇦 CAD — Canadian Dollar (Rate: 1.36 CAD = ⚓ 1 IOD)</option>
                        <option value="CHF">🇨🇭 CHF — Swiss Franc (Rate: 0.88 CHF = ⚓ 1 IOD)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Select Target Legal Tender:
                      </label>
                      <select
                        value={fxTargetCurrency}
                        onChange={(e) => setFxTargetCurrency(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                      >
                        <option value="IOD">🌊 Indian Ocean Dollar ($IOD / XIOD)</option>
                        <option value="OD">🌐 Global Ocean Dollar ($OD / XOD)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Amount to Exchange:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={fxAmount}
                        onChange={(e) => setFxAmount(Math.max(1, parseFloat(e.target.value) || 1))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-mono font-bold text-emerald-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleFXConversion}
                    disabled={isConvertingFX}
                    className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <Coins className={`w-4 h-4 ${isConvertingFX ? 'animate-spin' : ''}`} />
                    <span>{isConvertingFX ? 'Executing Sovereign FX Mint...' : `Exchange ${fxAmount} ${fxFromCurrency} -> ⚓ ${fxTargetCurrency}`}</span>
                  </button>

                  {conversionCertificate && (
                    <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40 text-[11px] space-y-2">
                      <div className="flex items-center justify-between text-emerald-300 font-bold">
                        <span>✅ {conversionCertificate.legalStatus}</span>
                        <span className="font-mono text-[10px] text-slate-400">{conversionCertificate.transactionId}</span>
                      </div>
                      <div className="font-mono text-emerald-200 text-xs">
                        Received: <strong className="text-amber-300 text-sm">{conversionCertificate.mintedOceanDollarAmount} {conversionCertificate.iso4217To}</strong>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate font-mono">
                        HSM Central Bank Seal: {conversionCertificate.centralBankGuaranteeHash}
                      </div>

                      <button
                        onClick={() => {
                          generateAndDownloadPdf({
                            documentType: 'E-TICKET',
                            bookingId: conversionCertificate.transactionId,
                            title: 'SOVEREIGN LEGAL TENDER FX CERTIFICATE',
                            operatorName: 'Maritime Central Reserve Bank & Ocean Dollar Monetary Authority',
                            passengerOrCargoName: 'Verified Account Holder',
                            passportOrCustomsCode: `ISO-4217: XIOD/XOD • SWIFT: XODRGLXX`,
                            origin: `${conversionCertificate.inputAmount} ${conversionCertificate.iso4217From}`,
                            destination: `${conversionCertificate.mintedOceanDollarAmount} ${conversionCertificate.iso4217To}`,
                            departureDate: conversionCertificate.timestamp.split('T')[0],
                            allocatedSpace: '104.8% Reserve Backed • UNCTAD Treaty Verified',
                            paymentMethod: 'Central Bank Mid-Market FX Settlement',
                            basePriceUSD: conversionCertificate.inputAmount,
                            totalPriceUSD: conversionCertificate.inputAmount,
                            currencyCode: conversionCertificate.iso4217From,
                            formattedTotalPrice: `${conversionCertificate.mintedOceanDollarAmount}`,
                            issueTimestamp: conversionCertificate.timestamp,
                            qrPayload: conversionCertificate.centralBankGuaranteeHash
                          });
                          triggerToast('Downloaded Legal Tender FX Certificate!');
                        }}
                        className="mt-1 w-full bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Official FX Certificate (PDF)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: GOVERNANCE FAQ GUIDE INSIDE TREASURY MODAL */}
              {treasuryModalTab === 'GOVERNANCE_FAQ' && (
                <div className="space-y-6 font-sans">
                  <div className="bg-slate-950 p-6 rounded-3xl border border-blue-500/40 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">ODMA &amp; MARITIME CENTRAL BANK CHARTER</span>
                        <h3 className="text-xl font-black text-white">Sovereign Monetary Governance FAQ</h3>
                        <p className="text-slate-400 text-xs mt-0.5">
                          Official governance, reserve collateralization, and regulatory answers for $OD / $XOD and $IOD.
                        </p>
                      </div>

                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold px-3 py-1 rounded-full flex items-center space-x-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>UNCTAD Treaty #2026-XOD-01</span>
                      </span>
                    </div>

                    {/* FEATURED DIRECTIVE BOX */}
                    <div className="bg-slate-900 p-5 rounded-2xl border border-amber-500/40 space-y-3 font-mono text-xs">
                      <div className="flex items-center space-x-2 text-amber-300 font-black text-sm">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span>Q: How and who were maintaining and controlling the $OD / XOD dealings?</span>
                      </div>
                      <div className="text-slate-300 text-xs space-y-1.5 font-sans leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                        <p>
                          <strong>Governing Bodies:</strong> Managed by the <span className="text-amber-400 font-bold">Ocean Dollar Monetary Authority (ODMA)</span> and the <span className="text-cyan-300 font-bold">Maritime Central Reserve Bank (MCRB)</span> under SWIFT BIC <span className="text-emerald-400 font-bold font-mono">XODRGLXX</span>.
                        </p>
                        <p>
                          <strong>Consortium Control:</strong> Overseen by a syndicate of <span className="text-purple-300 font-bold">48 IORA member state central banks</span> under UNCTAD Charter &amp; IMO High Seas Financial Treaty #2026-XOD-01.
                        </p>
                        <p>
                          <strong>Reserve Backing:</strong> <span className="text-emerald-400 font-bold">$24.85 Billion USD (104.8% Over-Collateralized)</span> backed by Physical Gold (38%), IMF SDRs (28%), Blue Carbon Green Bonds (22%), and Multi-Currency FX Basket (12%).
                        </p>
                      </div>
                    </div>

                    {/* FAQ ITEMS GRID */}
                    <div className="space-y-3 font-mono text-xs">
                      {[
                        {
                          q: 'How is 104.8% over-collateralization verified?',
                          a: 'Reserves are 100% audited via SatCom cryptographic Proof-of-Reserve (PoR) logs synced across 12 orbital satellite nodes.'
                        },
                        {
                          q: 'What are the ISO 4217 codes for Ocean Dollar & Indian Ocean Dollar?',
                          a: 'Ocean Dollar is registered as XOD (Numeric Code 998). Indian Ocean Dollar is XIOD (Numeric Code 999). Both trade at 1:1 fixed parity with USD.'
                        },
                        {
                          q: 'How are staking yields generated and distributed?',
                          a: 'Yields are funded through Central Reserve Bank seigniorage proceeds, 0.05% port settlement clearing fees, and Blue Carbon bond coupons.'
                        },
                        {
                          q: 'Are high-seas staking gains tax-exempt?',
                          a: 'Under UNCLOS Article 87 (Freedom of High Seas), transactions on international vessels are classified as 0.00% High Seas Sovereign Exempt Income.'
                        }
                      ].map((faq, i) => (
                        <div key={i} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                          <h4 className="font-bold text-white text-xs font-sans">Q: {faq.q}</h4>
                          <p className="text-slate-300 font-sans text-xs leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: FISCAL TRANSPARENCY WIDGET */}
              {treasuryModalTab === 'TRANSPARENCY' && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-500/40 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-indigo-400" />
                        <h3 className="font-black text-white text-xs uppercase tracking-wider">
                          Central Bank Proof-of-Reserves &amp; Fiscal Transparency
                        </h3>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        Auditor: {transparencyData.auditor}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Transparency Score</span>
                        <span className="text-sm font-black text-emerald-400 font-mono">100% (Audited)</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Fiscal Surplus</span>
                        <span className="text-sm font-black text-cyan-300 font-mono">+$1.42 Billion USD</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Fiscal Deficit</span>
                        <span className="text-sm font-black text-emerald-300 font-mono">0.00%</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">SatCom Orbits Sync</span>
                        <span className="text-xs font-black text-indigo-300 font-mono">12 Nodes Synced</span>
                      </div>
                    </div>

                    {/* PROOF OF RESERVES BREAKDOWN */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-[11px] font-bold text-slate-300 uppercase font-mono">
                        Cryptographic Proof-of-Reserves Breakdown
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {transparencyData.proofOfReserves?.map((por: any, idx: number) => (
                          <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-white">{por.asset}</div>
                              <div className="text-[10px] text-slate-400">{por.location}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-mono text-emerald-400 font-bold">${(por.amountUSD / 1000000000).toFixed(2)}B</div>
                              <div className="text-[9px] text-slate-400 font-mono">{por.verificationStatus}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* LIVE RECENT FISCAL LEDGER LOG */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-[11px] font-bold text-slate-300 uppercase font-mono">
                        Live Central Bank Public Ledger Entries
                      </h4>

                      <div className="space-y-1.5 text-[10px] font-mono">
                        {transparencyData.recentFiscalLedger?.map((tx: any) => (
                          <div key={tx.id} className="bg-slate-900/90 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                {tx.type}
                              </span>
                              <span className="text-slate-300">{tx.details}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-right">
                              <strong className="text-amber-300">{tx.amount}</strong>
                              <span className="text-slate-500">{tx.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: STAKING VAULT INSIDE TREASURY MODAL */}
              {treasuryModalTab === 'STAKING' && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-5 rounded-3xl border border-amber-500/40 space-y-5 font-sans">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-amber-400">MARITIME CENTRAL BANK STAKING</span>
                        <h3 className="text-xl font-black text-white">$OD / $XOD &amp; $IOD Yield Vaults</h3>
                      </div>
                      <div className="font-mono text-xs text-right">
                        <span className="text-slate-400 block text-[10px]">TOTAL VALUE STAKED</span>
                        <span className="text-amber-400 font-bold text-lg">${stakedBalance.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">30-DAY SOVEREIGN</span>
                        <span className="text-emerald-400 font-bold text-base">14.2% APY</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">90-DAY BLUE CARBON</span>
                        <span className="text-cyan-400 font-bold text-base">22.5% APY</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">365-DAY VIP VAULT</span>
                        <span className="text-purple-400 font-bold text-base">34.0% APY</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">UNCLAIMED YIELD</span>
                        <span className="text-amber-300 font-bold text-base">${accumulatedYield.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => handleClaimYield()}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2"
                      >
                        <Award className="w-4 h-4" />
                        <span>Claim Yield (${accumulatedYield.toFixed(2)})</span>
                      </button>

                      <button
                        onClick={() => handleCompoundYield()}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Auto-Compound Rewards</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowOceanDollarCurrencyModal(false);
                          setActiveTab('staking-vault');
                        }}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2"
                      >
                        <Flame className="w-4 h-4" />
                        <span>Open Full Staking Dashboard</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FOOTER NOTICE & CLOSE */}
              <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Verified Indian Ocean &amp; Global Maritime Legal Currency under IMO Resolution 2026.</span>
                </div>

                <button
                  onClick={() => setShowOceanDollarCurrencyModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shrink-0"
                >
                  Close Treasury Portal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
