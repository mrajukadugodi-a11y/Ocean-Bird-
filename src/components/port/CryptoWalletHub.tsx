import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
  Zap,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Coins,
  Cpu,
  Globe,
  Sliders,
  Send,
  Download,
  Lock,
  Layers,
  Sparkles,
  ChevronRight,
  Plus,
  Bell,
  BellOff,
  DollarSign,
  Euro,
  PoundSterling,
  JapaneseYen,
  Eye,
  Percent,
  Flame,
  X,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  priceUSD: number;
  change24h: number;
  network: string;
  iconBg: string;
  isStaked?: boolean;
  stakedBalance?: number;
  apy?: number;
  marketCapUSD?: number;
  volume24hUSD?: number;
  sparkline?: number[];
}

export interface CryptoTransaction {
  id: string;
  hash: string;
  type: 'TRANSFER_SENT' | 'TRANSFER_RECEIVED' | 'SWAP' | 'NFT_MINT' | 'STAKING_REWARD' | 'STAKE_DEPOSIT' | 'UNSTAKE_CLAIM' | 'DUTY_FREE_PAYMENT';
  assetSymbol: string;
  amount: number;
  amountUSD: number;
  counterparty: string;
  timestamp: string;
  blockNumber: number;
  gasFeeUSD: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  network: string;
}

export interface StakingPool {
  id: string;
  assetSymbol: string;
  assetName: string;
  baseApy: number;
  bonusApy: number;
  totalStakedUSD: number;
  userStaked: number;
  earnedRewards: number;
  lockupDays: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  iconBg: string;
  autoCompound: boolean;
}

export interface WalletNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'STAKING_REWARD' | 'TRANSFER' | 'GAS_SPIKE' | 'SECURITY' | 'PRICE_ALERT';
  isRead: boolean;
  linkText?: string;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rateVsUSD: number;
  name: string;
}

const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', rateVsUSD: 1.0, name: 'US Dollar' },
  { code: 'EUR', symbol: '€', rateVsUSD: 0.92, name: 'Euro' },
  { code: 'GBP', symbol: '£', rateVsUSD: 0.79, name: 'British Pound' },
  { code: 'JPY', symbol: '¥', rateVsUSD: 155.0, name: 'Japanese Yen' },
  { code: 'SGD', symbol: 'S$', rateVsUSD: 1.35, name: 'Singapore Dollar' },
  { code: 'AUD', symbol: 'A$', rateVsUSD: 1.52, name: 'Australian Dollar' },
  { code: 'AED', symbol: 'د.إ', rateVsUSD: 3.67, name: 'UAE Dirham' },
  { code: 'BTC', symbol: '₿', rateVsUSD: 0.000015, name: 'Bitcoin' }
];

const INITIAL_ASSETS: CryptoAsset[] = [
  {
    id: 'asset-eth',
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 4.85,
    priceUSD: 3420.50,
    change24h: 3.45,
    network: 'Ethereum Mainnet',
    iconBg: 'from-blue-600 to-indigo-700',
    isStaked: true,
    stakedBalance: 2.0,
    apy: 4.2,
    marketCapUSD: 410000000000,
    volume24hUSD: 15400000000,
    sparkline: [3300, 3320, 3290, 3380, 3400, 3390, 3420.50]
  },
  {
    id: 'asset-usdc',
    symbol: 'USDC',
    name: 'USD Coin (Circle)',
    balance: 12450.00,
    priceUSD: 1.00,
    change24h: 0.01,
    network: 'Ethereum Mainnet',
    iconBg: 'from-blue-500 to-cyan-600',
    marketCapUSD: 34000000000,
    volume24hUSD: 5200000000,
    sparkline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
  },
  {
    id: 'asset-sol',
    symbol: 'SOL',
    name: 'Solana Native',
    balance: 82.40,
    priceUSD: 185.20,
    change24h: -1.82,
    network: 'Solana Mainnet',
    iconBg: 'from-purple-600 to-indigo-600',
    marketCapUSD: 85000000000,
    volume24hUSD: 3800000000,
    sparkline: [192, 189, 191, 188, 184, 186, 185.20]
  },
  {
    id: 'asset-od',
    symbol: '$OD',
    name: 'Ocean Duty-Free Token',
    balance: 145000.00,
    priceUSD: 0.085,
    change24h: 12.40,
    network: 'Maritime Web3 Subnet',
    iconBg: 'from-cyan-500 to-emerald-500',
    isStaked: true,
    stakedBalance: 50000,
    apy: 18.5,
    marketCapUSD: 125000000,
    volume24hUSD: 14200000,
    sparkline: [0.072, 0.075, 0.074, 0.078, 0.081, 0.083, 0.085]
  },
  {
    id: 'asset-matic',
    symbol: 'POL',
    name: 'Polygon Ecosystem Token',
    balance: 3200.00,
    priceUSD: 0.68,
    change24h: 2.15,
    network: 'Polygon POS',
    iconBg: 'from-purple-500 to-pink-600',
    marketCapUSD: 6800000000,
    volume24hUSD: 420000000,
    sparkline: [0.65, 0.66, 0.64, 0.67, 0.66, 0.67, 0.68]
  }
];

const INITIAL_STAKING_POOLS: StakingPool[] = [
  {
    id: 'pool-od',
    assetSymbol: '$OD',
    assetName: 'Ocean Duty-Free Maritime Vault',
    baseApy: 14.0,
    bonusApy: 4.5,
    totalStakedUSD: 4250000,
    userStaked: 50000,
    earnedRewards: 1240.50,
    lockupDays: 30,
    riskLevel: 'LOW',
    iconBg: 'from-cyan-500 to-emerald-500',
    autoCompound: true
  },
  {
    id: 'pool-eth',
    assetSymbol: 'ETH',
    assetName: 'Lido Liquid Staked Ethereum',
    baseApy: 3.8,
    bonusApy: 0.4,
    totalStakedUSD: 85400000,
    userStaked: 2.0,
    earnedRewards: 0.084,
    lockupDays: 0,
    riskLevel: 'LOW',
    iconBg: 'from-blue-600 to-indigo-700',
    autoCompound: false
  },
  {
    id: 'pool-sol',
    assetSymbol: 'SOL',
    assetName: 'Marinade Liquid Staked Solana',
    baseApy: 6.8,
    bonusApy: 0.6,
    totalStakedUSD: 18900000,
    userStaked: 0,
    earnedRewards: 0,
    lockupDays: 7,
    riskLevel: 'LOW',
    iconBg: 'from-purple-600 to-indigo-600',
    autoCompound: true
  },
  {
    id: 'pool-usdc',
    assetSymbol: 'USDC',
    assetName: 'Aave Maritime Yield Vault',
    baseApy: 5.5,
    bonusApy: 1.3,
    totalStakedUSD: 12400000,
    userStaked: 0,
    earnedRewards: 0,
    lockupDays: 0,
    riskLevel: 'LOW',
    iconBg: 'from-blue-500 to-cyan-600',
    autoCompound: true
  }
];

const INITIAL_NOTIFICATIONS: WalletNotification[] = [
  {
    id: 'notif-001',
    title: 'Staking Yield Distributed',
    message: 'Received +450 $OD (+$38.25 USD) from Maritime Vault auto-compounding pool.',
    timestamp: '10 mins ago',
    type: 'STAKING_REWARD',
    isRead: false,
    linkText: 'View Staking Pool'
  },
  {
    id: 'notif-[002]',
    title: 'Ocean Token Price Surge',
    message: '$OD is up +12.4% in the last 24h, reaching a new 30-day high of $0.085.',
    timestamp: '2 hours ago',
    type: 'PRICE_ALERT',
    isRead: false,
    linkText: 'Inspect Asset'
  },
  {
    id: 'notif-003',
    title: 'Gas Optimization Alert',
    message: 'Ethereum Mainnet gas dropped to 14 Gwei. Ideal window for asset transfers.',
    timestamp: '5 hours ago',
    type: 'GAS_SPIKE',
    isRead: true
  },
  {
    id: 'notif-004',
    title: 'Security Session Authorized',
    message: 'MetaMask hardware enclave session extended for 30 days on Maritime Subnet.',
    timestamp: '1 day ago',
    type: 'SECURITY',
    isRead: true
  }
];

const INITIAL_TXS: CryptoTransaction[] = [
  {
    id: 'tx-001',
    hash: '0x8f92a4b71c038e9d98402a11f8e32901c89a771b2a',
    type: 'DUTY_FREE_PAYMENT',
    assetSymbol: '$OD',
    amount: 1200,
    amountUSD: 102.00,
    counterparty: '0x99A4...MerchantVault',
    timestamp: 'Aug 26, 2026 15:42 UTC',
    blockNumber: 20491823,
    gasFeeUSD: 0.12,
    status: 'COMPLETED',
    network: 'Maritime Web3 Subnet'
  },
  {
    id: 'tx-002',
    hash: '0x3a1f99d428e1c072b84f931a77e201b88c42a001d',
    type: 'TRANSFER_SENT',
    assetSymbol: 'USDC',
    amount: 500,
    amountUSD: 500.00,
    counterparty: 'captain.sol (0x7C4e...88A2)',
    timestamp: 'Aug 26, 2026 12:15 UTC',
    blockNumber: 20491102,
    gasFeeUSD: 1.45,
    status: 'COMPLETED',
    network: 'Ethereum Mainnet'
  },
  {
    id: 'tx-003',
    hash: '0x5b9922e1a3d90218f440c982b1139e88410b29c9a',
    type: 'STAKING_REWARD',
    assetSymbol: '$OD',
    amount: 450,
    amountUSD: 38.25,
    counterparty: '0x0000...StakingPool',
    timestamp: 'Aug 25, 2026 23:00 UTC',
    blockNumber: 20488900,
    gasFeeUSD: 0.05,
    status: 'COMPLETED',
    network: 'Maritime Web3 Subnet'
  },
  {
    id: 'tx-004',
    hash: '0x1029e88a31c049d2b7e120893aa415c9028e1122a',
    type: 'TRANSFER_RECEIVED',
    assetSymbol: 'ETH',
    amount: 1.5,
    amountUSD: 5130.75,
    counterparty: 'admiral.eth (0x11A2...44F9)',
    timestamp: 'Aug 24, 2026 18:30 UTC',
    blockNumber: 20481230,
    gasFeeUSD: 2.10,
    status: 'COMPLETED',
    network: 'Ethereum Mainnet'
  }
];

interface CryptoWalletHubProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const CryptoWalletHub: React.FC<CryptoWalletHubProps> = ({ triggerToast }) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TRANSFER' | 'STAKING' | 'VISUALIZATION' | 'HISTORY' | 'ANALYTICS'>('OVERVIEW');

  // Multi-Currency State
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyConfig>(CURRENCIES[0]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState<boolean>(false);

  // Wallet Connection State
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string>('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('Ethereum Mainnet');
  const [connectedProvider, setConnectedProvider] = useState<string>('MetaMask Wallet');
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  // Notifications State
  const [notifications, setNotifications] = useState<WalletNotification[]>(INITIAL_NOTIFICATIONS);
  const [showNotifDrawer, setShowNotifDrawer] = useState<boolean>(false);

  // Asset & Staking State
  const [assets, setAssets] = useState<CryptoAsset[]>(INITIAL_ASSETS);
  const [stakingPools, setStakingPools] = useState<StakingPool[]>(INITIAL_STAKING_POOLS);
  const [transactions, setTransactions] = useState<CryptoTransaction[]>(INITIAL_TXS);

  // Staking Modal State
  const [selectedStakingPool, setSelectedStakingPool] = useState<StakingPool | null>(null);
  const [stakeModalMode, setStakeModalMode] = useState<'STAKE' | 'UNSTAKE'>('STAKE');
  const [stakeAmountInput, setStakeAmountInput] = useState<string>('');
  const [isProcessingStake, setIsProcessingStake] = useState<boolean>(false);

  // Asset Visualisation Detail State
  const [selectedVisualAsset, setSelectedVisualAsset] = useState<CryptoAsset>(INITIAL_ASSETS[3]); // Default $OD

  // Transfer Form State
  const [transferAssetSymbol, setTransferAssetSymbol] = useState<string>('ETH');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [gasSpeed, setGasSpeed] = useState<'LOW' | 'STANDARD' | 'FAST' | 'INSTANT'>('STANDARD');
  const [isExecutingTransfer, setIsExecutingTransfer] = useState<boolean>(false);
  const [transferStep, setTransferStep] = useState<'IDLE' | 'ESTIMATING' | 'SIGNING' | 'BROADCASTING' | 'SUCCESS'>('IDLE');
  const [lastTxHash, setLastTxHash] = useState<string>('');

  // History Filter State
  const [historySearch, setHistorySearch] = useState<string>('');
  const [historyTypeFilter, setHistoryTypeFilter] = useState<string>('ALL');

  // Analytics View State
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'24H' | '7D' | '30D' | '1Y'>('7D');

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  // Format Helper for Multi-Currency
  const formatVal = (amountUSD: number) => {
    const converted = amountUSD * selectedCurrency.rateVsUSD;
    if (selectedCurrency.code === 'BTC') {
      return `${selectedCurrency.symbol}${converted.toFixed(6)}`;
    }
    if (selectedCurrency.code === 'JPY') {
      return `${selectedCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${selectedCurrency.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculations
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;
  const totalPortfolioUSD = assets.reduce((acc, curr) => acc + curr.balance * curr.priceUSD, 0);
  const totalStakedUSD = stakingPools.reduce((acc, curr) => {
    const asset = assets.find((a) => a.symbol === curr.assetSymbol);
    return acc + curr.userStaked * (asset?.priceUSD || 1);
  }, 0);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedAddress(true);
    hapticEngine.trigger('success');
    notify('Copied wallet address to clipboard!', 'success', 'ADDRESS COPIED');
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    hapticEngine.trigger('success');
    notify('Marked all notifications as read', 'info', 'NOTIFICATIONS READ');
  };

  // Stake Execution
  const handleExecuteStakeOrUnstake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStakingPool || !stakeAmountInput || Number(stakeAmountInput) <= 0) {
      notify('Please enter a valid amount!', 'warning', 'INVALID AMOUNT');
      return;
    }

    const val = Number(stakeAmountInput);
    const asset = assets.find((a) => a.symbol === selectedStakingPool.assetSymbol);
    if (stakeModalMode === 'STAKE' && asset && val > asset.balance) {
      notify(`Insufficient ${asset.symbol} balance for staking!`, 'error', 'INSUFFICIENT BALANCE');
      return;
    }

    setIsProcessingStake(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setIsProcessingStake(false);
      const isStake = stakeModalMode === 'STAKE';

      // Update Staking Pool userStaked
      setStakingPools(
        stakingPools.map((p) => {
          if (p.id === selectedStakingPool.id) {
            return {
              ...p,
              userStaked: isStake ? p.userStaked + val : Math.max(0, p.userStaked - val)
            };
          }
          return p;
        })
      );

      // Update Asset Balance
      if (asset) {
        setAssets(
          assets.map((a) => {
            if (a.symbol === asset.symbol) {
              return {
                ...a,
                balance: isStake ? a.balance - val : a.balance + val,
                stakedBalance: isStake ? (a.stakedBalance || 0) + val : Math.max(0, (a.stakedBalance || 0) - val),
                isStaked: true
              };
            }
            return a;
          })
        );
      }

      // Record Transaction
      const generatedHash = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const newTx: CryptoTransaction = {
        id: `tx-stake-${Date.now()}`,
        hash: generatedHash,
        type: isStake ? 'STAKE_DEPOSIT' : 'UNSTAKE_CLAIM',
        assetSymbol: selectedStakingPool.assetSymbol,
        amount: val,
        amountUSD: val * (asset?.priceUSD || 1),
        counterparty: selectedStakingPool.assetName,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString() + ' UTC',
        blockNumber: 20492100,
        gasFeeUSD: 0.25,
        status: 'COMPLETED',
        network: selectedNetwork
      };
      setTransactions([newTx, ...transactions]);

      // Add Notification
      const newNotif: WalletNotification = {
        id: `notif-${Date.now()}`,
        title: isStake ? 'Staking Deposit Confirmed' : 'Unstake Withdrawal Processed',
        message: `${isStake ? 'Staked' : 'Unstaked'} ${val} ${selectedStakingPool.assetSymbol} in ${selectedStakingPool.assetName}.`,
        timestamp: 'Just now',
        type: 'STAKING_REWARD',
        isRead: false
      };
      setNotifications([newNotif, ...notifications]);

      setSelectedStakingPool(null);
      setStakeAmountInput('');
      hapticEngine.trigger('success');
      notify(
        `${isStake ? 'Staked' : 'Unstaked'} ${val} ${selectedStakingPool.assetSymbol} successfully!`,
        'success',
        isStake ? 'STAKE CONFIRMED' : 'UNSTAKE CONFIRMED'
      );
    }, 1200);
  };

  // Claim All Rewards
  const handleClaimAllYield = (pool: StakingPool) => {
    if (pool.earnedRewards <= 0) {
      notify('No pending yield rewards to claim!', 'info', 'NO YIELD AVAILABLE');
      return;
    }

    hapticEngine.trigger('click');
    const rewardVal = pool.earnedRewards;

    setStakingPools(
      stakingPools.map((p) => (p.id === pool.id ? { ...p, earnedRewards: 0 } : p))
    );

    // Add to notification
    const newNotif: WalletNotification = {
      id: `notif-claim-${Date.now()}`,
      title: 'Yield Rewards Claimed',
      message: `Claimed ${rewardVal} ${pool.assetSymbol} yield rewards into your spot wallet.`,
      timestamp: 'Just now',
      type: 'STAKING_REWARD',
      isRead: false
    };
    setNotifications([newNotif, ...notifications]);

    hapticEngine.trigger('success');
    notify(`Claimed ${rewardVal} ${pool.assetSymbol} yield rewards!`, 'success', 'YIELD CLAIMED');
  };

  // Transfer Execution
  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientAddress.trim() || !transferAmount || Number(transferAmount) <= 0) {
      notify('Please enter a valid recipient address and amount!', 'warning', 'INVALID TRANSFER');
      return;
    }

    const selectedAsset = assets.find((a) => a.symbol === transferAssetSymbol);
    if (!selectedAsset || Number(transferAmount) > selectedAsset.balance) {
      notify('Insufficient token balance for this transfer!', 'error', 'INSUFFICIENT BALANCE');
      return;
    }

    setIsExecutingTransfer(true);
    setTransferStep('ESTIMATING');
    hapticEngine.trigger('click');

    setTimeout(() => {
      setTransferStep('SIGNING');
      hapticEngine.trigger('click');

      setTimeout(() => {
        setTransferStep('BROADCASTING');
        hapticEngine.trigger('click');

        setTimeout(() => {
          const generatedHash = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
          setLastTxHash(generatedHash);
          setTransferStep('SUCCESS');
          setIsExecutingTransfer(false);

          const transferVal = Number(transferAmount);
          setAssets(
            assets.map((a) => (a.symbol === transferAssetSymbol ? { ...a, balance: a.balance - transferVal } : a))
          );

          const newTx: CryptoTransaction = {
            id: `tx-${Date.now()}`,
            hash: generatedHash,
            type: 'TRANSFER_SENT',
            assetSymbol: transferAssetSymbol,
            amount: transferVal,
            amountUSD: transferVal * selectedAsset.priceUSD,
            counterparty: recipientAddress.length > 16 ? `${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}` : recipientAddress,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString() + ' UTC',
            blockNumber: Math.floor(20490000 + Math.random() * 5000),
            gasFeeUSD: gasSpeed === 'LOW' ? 0.45 : gasSpeed === 'FAST' ? 2.50 : gasSpeed === 'INSTANT' ? 4.20 : 1.20,
            status: 'COMPLETED',
            network: selectedNetwork
          };
          setTransactions([newTx, ...transactions]);

          const notif: WalletNotification = {
            id: `notif-tx-${Date.now()}`,
            title: 'Outbound Transfer Completed',
            message: `Sent ${transferVal} ${transferAssetSymbol} to ${recipientAddress.slice(0, 8)}...`,
            timestamp: 'Just now',
            type: 'TRANSFER',
            isRead: false
          };
          setNotifications([notif, ...notifications]);

          hapticEngine.trigger('success');
          notify(`Transferred ${transferVal} ${transferAssetSymbol} successfully!`, 'success', 'TRANSACTION CONFIRMED');
        }, 1200);
      }, 1000);
    }, 800);
  };

  return (
    <div className="space-y-6 relative">
      {/* Top Header Card */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-br from-indigo-500/20 via-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-2xl border border-cyan-500/40 shadow-xl">
              <Cpu className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Maritime Web3 Crypto Wallet Hub
                </h2>
                <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-md">
                  STAKING &amp; MULTI-CURRENCY
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Multi-chain crypto wallet with asset visualization, high-yield staking vaults, multi-currency balance conversion, and real-time Web3 notification alerts.
              </p>
            </div>
          </div>

          {/* Right Controls: Multi-Currency & Notification Bell & Account Bar */}
          <div className="flex items-center space-x-3 shrink-0 flex-wrap gap-2">
            {/* Multi-Currency Dropdown */}
            <div className="relative font-mono">
              <button
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  hapticEngine.trigger('click');
                }}
                className="px-3 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 font-bold text-xs hover:border-cyan-500 transition-all flex items-center space-x-1.5"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>{selectedCurrency.code} ({selectedCurrency.symbol})</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-50 p-2 space-y-1 animate-scale-up">
                  <div className="text-[10px] text-slate-400 px-3 py-1 uppercase font-bold">Select Currency</div>
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setShowCurrencyDropdown(false);
                        hapticEngine.trigger('click');
                        notify(`Switched wallet currency to ${curr.name} (${curr.symbol})`, 'info', 'CURRENCY UPDATED');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between ${
                        selectedCurrency.code === curr.code
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <span>{curr.name}</span>
                      <span className="font-mono font-bold">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDrawer(!showNotifDrawer);
                  hapticEngine.trigger('click');
                }}
                className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white relative transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-mono font-black text-[10px] flex items-center justify-center animate-pulse">
                    {unreadNotifCount}
                  </span>
                )}
              </button>
            </div>

            {/* Account Bar */}
            <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 font-mono text-xs">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{selectedNetwork}</span>
              </div>

              <div className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-slate-900 text-cyan-400 font-bold border border-cyan-500/30">
                <span>{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</span>
                <button onClick={handleCopyAddress} className="text-slate-400 hover:text-white">
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('OVERVIEW');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'OVERVIEW' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Wallet Overview</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('STAKING');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'STAKING' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-purple-400" />
            <span>Crypto Staking Vaults</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('VISUALIZATION');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'VISUALIZATION' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Asset Visualisation</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRANSFER');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'TRANSFER' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4 text-amber-400" />
            <span>Transfer Asset Tool</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('HISTORY');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'HISTORY' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Transaction History</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ANALYTICS');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'ANALYTICS' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-cyan-300" />
            <span>Balance Analytics</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* WALLET NOTIFICATIONS DRAWER MODAL                        */}
      {/* ======================================================== */}
      {showNotifDrawer && (
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4 animate-scale-up">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white font-mono text-sm">Web3 Wallet Notification Center</h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                {notifications.length} Alerts
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleMarkAllNotifsRead}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-mono font-bold"
              >
                Mark all as read
              </button>
              <button
                onClick={() => setShowNotifDrawer(false)}
                className="p-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl border font-mono text-xs transition-all flex items-start space-x-3 ${
                  notif.isRead
                    ? 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                    : 'bg-slate-950 border-cyan-500/40 text-white shadow-md'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    notif.type === 'STAKING_REWARD'
                      ? 'bg-purple-500/20 text-purple-300'
                      : notif.type === 'TRANSFER'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : notif.type === 'PRICE_ALERT'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {notif.type === 'STAKING_REWARD' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : notif.type === 'TRANSFER' ? (
                    <Send className="w-4 h-4" />
                  ) : notif.type === 'PRICE_ALERT' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs">{notif.title}</span>
                    <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: OVERVIEW & ASSET HOLDINGS                         */}
      {/* ======================================================== */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6 animate-fade-in">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {/* Net Worth */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="flex items-center space-x-1.5">
                  <Wallet className="w-4 h-4 text-cyan-400" />
                  <span>TOTAL WALLET NET WORTH</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  +4.82% (24h)
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-black text-white">
                  {formatVal(totalPortfolioUSD)}
                </div>
                <div className="text-xs text-cyan-400 font-bold">
                  Multi-Currency Base: {selectedCurrency.code}
                </div>
              </div>
            </div>

            {/* Staked Vault Value */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="flex items-center space-x-1.5">
                  <Lock className="w-4 h-4 text-purple-400" />
                  <span>TOTAL STAKED VAULTS</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                  18.5% MAX APY
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-black text-purple-300">
                  {formatVal(totalStakedUSD)}
                </div>
                <div className="text-xs text-purple-400 font-bold">
                  Auto-compounding Active
                </div>
              </div>
            </div>

            {/* Unread Alerts */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span className="flex items-center space-x-1.5">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span>WALLET NOTIFICATIONS</span>
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold">{unreadNotifCount} Unread</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Stay informed on staking rewards, security alerts, and network gas windows.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowNotifDrawer(true);
                  hapticEngine.trigger('click');
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 hover:text-white font-mono text-xs font-bold transition-all"
              >
                Open Notification Drawer
              </button>
            </div>
          </div>

          {/* Portfolio Table */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-mono">Crypto Portfolio ({assets.length})</h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-4">Asset</th>
                    <th className="p-4">Network</th>
                    <th className="p-4">Unit Price ({selectedCurrency.code})</th>
                    <th className="p-4">24h Change</th>
                    <th className="p-4">Holdings Balance</th>
                    <th className="p-4">Total Value ({selectedCurrency.code})</th>
                    <th className="p-4 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {assets.map((asset) => {
                    const valueUSD = asset.balance * asset.priceUSD;
                    return (
                      <tr key={asset.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${asset.iconBg} text-white font-black flex items-center justify-center text-xs shadow-md`}>
                              {asset.symbol.slice(0, 3)}
                            </div>
                            <div>
                              <div className="font-bold text-white flex items-center space-x-1">
                                <span>{asset.name}</span>
                                {asset.isStaked && (
                                  <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] font-bold">
                                    STAKED
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-cyan-400 font-bold">{asset.symbol}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 text-[10px] border border-slate-800">
                            {asset.network}
                          </span>
                        </td>

                        <td className="p-4 text-slate-200 font-bold">
                          {formatVal(asset.priceUSD)}
                        </td>

                        <td className="p-4">
                          <span
                            className={`font-bold flex items-center space-x-1 ${
                              asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {asset.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            <span>{asset.change24h >= 0 ? `+${asset.change24h}%` : `${asset.change24h}%`}</span>
                          </span>
                        </td>

                        <td className="p-4 font-bold text-white">
                          {asset.balance.toLocaleString()} {asset.symbol}
                        </td>

                        <td className="p-4 font-black text-cyan-300">
                          {formatVal(valueUSD)}
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedVisualAsset(asset);
                              setActiveTab('VISUALIZATION');
                              hapticEngine.trigger('click');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
                          >
                            Visualize
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

      {/* ======================================================== */}
      {/* TAB 2: CRYPTO STAKING VAULTS                             */}
      {/* ======================================================== */}
      {activeTab === 'STAKING' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Lock className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">High-Yield Web3 Crypto Staking Vaults</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Stake your crypto assets to earn auto-compounded yield, maritime protocol fees, and validator rewards.
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold">
              Total Staked: {formatVal(totalStakedUSD)}
            </div>
          </div>

          {/* Staking Pools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
            {stakingPools.map((pool) => {
              const totalApy = pool.baseApy + pool.bonusApy;
              const userStakedUSD = pool.userStaked * (assets.find((a) => a.symbol === pool.assetSymbol)?.priceUSD || 1);

              return (
                <div key={pool.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${pool.iconBg} text-white font-black flex items-center justify-center text-sm shadow-lg`}>
                        {pool.assetSymbol.slice(0, 3)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{pool.assetName}</h4>
                        <span className="text-xs text-cyan-400 font-bold">{pool.assetSymbol} Pool</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/30">
                      {totalApy.toFixed(1)}% APY
                    </span>
                  </div>

                  {/* APY Breakdown & Lockup */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">BASE APY</span>
                      <span className="font-bold text-slate-200">{pool.baseApy}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">BONUS APY</span>
                      <span className="font-bold text-purple-400">+{pool.bonusApy}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">LOCKUP</span>
                      <span className="font-bold text-slate-200">{pool.lockupDays === 0 ? 'Flexible' : `${pool.lockupDays} Days`}</span>
                    </div>
                  </div>

                  {/* User Staked & Earned Rewards */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Your Staked Balance:</span>
                      <span className="text-white font-bold">
                        {pool.userStaked} {pool.assetSymbol} ({formatVal(userStakedUSD)})
                      </span>
                    </div>

                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Earned Yield Rewards:</span>
                      <span className="text-emerald-400 font-bold">
                        {pool.earnedRewards} {pool.assetSymbol}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedStakingPool(pool);
                        setStakeModalMode('STAKE');
                        hapticEngine.trigger('click');
                      }}
                      className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 text-white font-black text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Deposit &amp; Stake</span>
                    </button>

                    {pool.userStaked > 0 && (
                      <button
                        onClick={() => {
                          setSelectedStakingPool(pool);
                          setStakeModalMode('UNSTAKE');
                          hapticEngine.trigger('click');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition-all"
                      >
                        Unstake
                      </button>
                    )}

                    {pool.earnedRewards > 0 && (
                      <button
                        onClick={() => handleClaimAllYield(pool)}
                        className="px-4 py-2.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 transition-all"
                      >
                        Claim Rewards
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STAKE / UNSTAKE MODAL */}
      {selectedStakingPool && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl max-w-md w-full space-y-6 font-mono text-xs animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white text-base">
                  {stakeModalMode === 'STAKE' ? 'Stake Tokens into Vault' : 'Unstake Tokens from Vault'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStakingPool(null)}
                className="p-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleExecuteStakeOrUnstake} className="space-y-4">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Target Staking Pool:</span>
                <span className="text-white font-bold">{selectedStakingPool.assetName}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-slate-300 font-bold">
                  <span>Enter Amount ({selectedStakingPool.assetSymbol})</span>
                  <button
                    type="button"
                    onClick={() => {
                      const asset = assets.find((a) => a.symbol === selectedStakingPool.assetSymbol);
                      if (stakeModalMode === 'STAKE' && asset) {
                        setStakeAmountInput(asset.balance.toString());
                      } else {
                        setStakeAmountInput(selectedStakingPool.userStaked.toString());
                      }
                    }}
                    className="text-cyan-400 hover:text-cyan-300 text-[11px]"
                  >
                    Set MAX
                  </button>
                </div>

                <input
                  type="number"
                  step="any"
                  value={stakeAmountInput}
                  onChange={(e) => setStakeAmountInput(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-base font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-300 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Estimated Annual Yield:</span>
                  <span>{(selectedStakingPool.baseApy + selectedStakingPool.bonusApy).toFixed(1)}% APY</span>
                </div>
                <div className="text-[10px] text-slate-400">Auto-compounded daily into smart contract vault.</div>
              </div>

              <button
                type="submit"
                disabled={isProcessingStake}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                {isProcessingStake ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Signing Staking Contract...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm {stakeModalMode === 'STAKE' ? 'Deposit & Stake' : 'Unstake Withdrawal'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ASSET VISUALISATION & METRICS                     */}
      {/* ======================================================== */}
      {activeTab === 'VISUALIZATION' && (
        <div className="space-y-6 animate-fade-in font-mono">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Eye className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Interactive Crypto Asset Visualisation</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Explore price action sparklines, market cap metrics, 24h trading volumes, and technical performance indicators.
              </p>
            </div>

            {/* Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-bold">Select Token:</span>
              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
                {assets.map((a) => (
                  <button
                    key={a.symbol}
                    onClick={() => {
                      setSelectedVisualAsset(a);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      selectedVisualAsset.symbol === a.symbol
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {a.symbol}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedVisualAsset.iconBg} text-white font-black flex items-center justify-center text-xl shadow-xl`}>
                  {selectedVisualAsset.symbol.slice(0, 3)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{selectedVisualAsset.name}</h3>
                  <span className="text-xs text-cyan-400 font-bold">{selectedVisualAsset.network}</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-3xl font-black text-white">
                  {formatVal(selectedVisualAsset.priceUSD)}
                </div>
                <div className={`text-xs font-bold flex items-center sm:justify-end space-x-1 ${selectedVisualAsset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedVisualAsset.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{selectedVisualAsset.change24h >= 0 ? `+${selectedVisualAsset.change24h}% (24h)` : `${selectedVisualAsset.change24h}% (24h)`}</span>
                </div>
              </div>
            </div>

            {/* SVG Candle / Sparkline Visualizer */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>PRICE PERFORMANCE SPARKLINE</span>
                <span className="text-emerald-400 font-bold">RSI: 58 (Bullish Trend)</span>
              </div>

              <div className="h-56 w-full bg-slate-950 rounded-2xl p-4 border border-slate-800 relative flex items-end justify-between gap-2 overflow-hidden">
                {selectedVisualAsset.sparkline?.map((val, idx) => {
                  const min = Math.min(...(selectedVisualAsset.sparkline || [1]));
                  const max = Math.max(...(selectedVisualAsset.sparkline || [1]));
                  const heightPct = Math.max(15, Math.min(100, ((val - min) / (max - min || 1)) * 100));

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500/20 to-cyan-400 transition-all group-hover:brightness-125"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[9px] text-slate-500 mt-2 font-mono">D{idx + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Market Cap</span>
                <div className="font-black text-white">{formatVal(selectedVisualAsset.marketCapUSD || 100000000)}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">24h Trading Volume</span>
                <div className="font-black text-cyan-400">{formatVal(selectedVisualAsset.volume24hUSD || 5000000)}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Circulating Supply</span>
                <div className="font-black text-white">{selectedVisualAsset.balance.toLocaleString()} {selectedVisualAsset.symbol}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Smart Contract</span>
                <div className="font-black text-purple-400">Verified EIP-20</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: TRANSFER ASSET TOOL                               */}
      {/* ======================================================== */}
      {activeTab === 'TRANSFER' && (
        <div className="space-y-6 animate-fade-in max-w-3xl mx-auto font-mono">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Transfer Asset Tool</h3>
                <p className="text-xs text-slate-400">
                  Send crypto tokens, stablecoins, or $OD Duty-Free assets across supported multi-chains.
                </p>
              </div>
            </div>

            <form onSubmit={handleExecuteTransfer} className="space-y-5 text-xs">
              {/* Asset Selection */}
              <div className="space-y-2">
                <label className="text-slate-300 font-bold block">1. Select Asset to Send</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {assets.map((a) => (
                    <button
                      type="button"
                      key={a.symbol}
                      onClick={() => {
                        setTransferAssetSymbol(a.symbol);
                        hapticEngine.trigger('click');
                      }}
                      className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                        transferAssetSymbol === a.symbol
                          ? 'bg-cyan-500/20 border-cyan-500 text-white ring-1 ring-cyan-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="font-black text-sm block">{a.symbol}</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Bal: {a.balance}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Address */}
              <div className="space-y-2">
                <label className="text-slate-300 font-bold block">2. Recipient Address / ENS Name</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x... or captain.eth"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-slate-300 font-bold">3. Transfer Amount</label>
                  <button
                    type="button"
                    onClick={() => {
                      const asset = assets.find((a) => a.symbol === transferAssetSymbol);
                      if (asset) setTransferAmount(asset.balance.toString());
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-bold text-[11px]"
                  >
                    Set MAX Balance
                  </button>
                </div>

                <input
                  type="number"
                  step="any"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-base font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={isExecutingTransfer}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                {isExecutingTransfer ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Processing Transfer...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm &amp; Broadcast Transfer</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: TRANSACTION HISTORY                               */}
      {/* ======================================================== */}
      {activeTab === 'HISTORY' && (
        <div className="space-y-6 animate-fade-in font-mono">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Blockchain Transaction History</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                On-chain records of transfers, staking deposits, and duty-free token settlements.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Tx Hash</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Valuation ({selectedCurrency.code})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-cyan-400">
                      {`${tx.hash.slice(0, 10)}...${tx.hash.slice(-6)}`}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-950 text-slate-300 border border-slate-800">
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{tx.timestamp}</td>
                    <td className="p-4 font-bold text-white">{tx.amount} {tx.assetSymbol}</td>
                    <td className="p-4 font-bold text-cyan-300">{formatVal(tx.amountUSD)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: BALANCE ANALYTICS                                 */}
      {/* ======================================================== */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-6 animate-fade-in font-mono">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white">Portfolio Balance Analytics</h3>
              <p className="text-xs text-slate-400">Asset distribution and multi-currency growth metrics.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-cyan-300">{formatVal(totalPortfolioUSD)}</div>
              <div className="text-xs text-emerald-400 font-bold">+14.2% Growth</div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="text-xs text-slate-300 font-bold">Holdings Ratio</h4>
            <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
              {assets.map((a) => {
                const pct = Math.round(((a.balance * a.priceUSD) / totalPortfolioUSD) * 100);
                return (
                  <div
                    key={a.id}
                    className={`h-full bg-gradient-to-r ${a.iconBg}`}
                    style={{ width: `${pct}%` }}
                    title={`${a.symbol}: ${pct}%`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
