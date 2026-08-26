import React, { useState } from 'react';
import {
  Wallet,
  CreditCard,
  Key,
  ShieldCheck,
  RefreshCw,
  Download,
  TrendingUp,
  Coins,
  Zap,
  BarChart3,
  Lock,
  Unlock,
  Copy,
  Check,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  AlertCircle,
  Eye,
  EyeOff,
  DollarSign,
  Globe,
  Activity,
  Terminal,
  Sliders,
  Receipt,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Filter,
  Search
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface DeveloperApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  fullSecret: string;
  environment: 'PRODUCTION' | 'SANDBOX' | 'TEST';
  scopes: string[];
  createdDate: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export interface DeveloperTransaction {
  id: string;
  txHash: string;
  date: string;
  type: 'TOP_UP' | 'API_GAS' | 'EARNINGS_PAYOUT' | 'BOUNTY_REWARD';
  amountUSD: number;
  creditsOD: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface ApiEndpointQuota {
  serviceName: string;
  endpoint: string;
  requests24h: number;
  quotaLimit24h: number;
  avgLatencyMs: number;
  unitCostUSD: number;
  totalSpentUSD: number;
}

const INITIAL_API_KEYS: DeveloperApiKey[] = [
  {
    id: 'key-live-1',
    name: 'Maritime Commercial Hub Production Gateway',
    keyPrefix: 'pk_live_maritime_89f',
    fullSecret: 'pk_live_maritime_89f92a4b71c038e9d98402a11',
    environment: 'PRODUCTION',
    scopes: ['read:port_telemetry', 'write:duty_free_orders', 'rpc:stripe_payouts'],
    createdDate: 'Aug 10, 2026',
    lastUsed: '2 mins ago',
    status: 'active'
  },
  {
    id: 'key-sandbox-2',
    name: 'Developer Sandbox Testing Key',
    keyPrefix: 'pk_test_ocean_sandbox_31a',
    fullSecret: 'pk_test_ocean_sandbox_31a89c3104e76092b',
    environment: 'SANDBOX',
    scopes: ['read:all', 'write:test_sandbox'],
    createdDate: 'Aug 20, 2026',
    lastUsed: '1 hour ago',
    status: 'active'
  },
  {
    id: 'key-ai-3',
    name: 'Gemini Port Concierge AI Proxy Key',
    keyPrefix: 'pk_live_gemini_proxy_77e',
    fullSecret: 'pk_live_gemini_proxy_77e9102485bb290',
    environment: 'PRODUCTION',
    scopes: ['ai:generate_content', 'ai:voice_synthesis'],
    createdDate: 'Jul 28, 2026',
    lastUsed: 'Just now',
    status: 'active'
  }
];

const INITIAL_TRANSACTIONS: DeveloperTransaction[] = [
  {
    id: 'tx-1092',
    txHash: '0x8f9a...31b9',
    date: 'Aug 26, 2026 14:32 UTC',
    type: 'EARNINGS_PAYOUT',
    amountUSD: 450.00,
    creditsOD: 90000,
    description: 'Applet Revenue Payout (85% Split) -> Stripe Vault',
    status: 'completed'
  },
  {
    id: 'tx-1091',
    txHash: '0x7c4e...88a2',
    date: 'Aug 26, 2026 11:15 UTC',
    type: 'API_GAS',
    amountUSD: -12.40,
    creditsOD: -2480,
    description: 'Micro-Gas Settlement: 6,200 Gemini AI & Maps RPC Requests',
    status: 'completed'
  },
  {
    id: 'tx-1090',
    txHash: '0x3a1f...99d4',
    date: 'Aug 25, 2026 18:00 UTC',
    type: 'TOP_UP',
    amountUSD: 200.00,
    creditsOD: 40000,
    description: 'Developer Wallet Auto-Recharge via Stripe Card •••• 4242',
    status: 'completed'
  },
  {
    id: 'tx-1089',
    txHash: '0x5b99...22e1',
    date: 'Aug 24, 2026 09:40 UTC',
    type: 'BOUNTY_REWARD',
    amountUSD: 150.00,
    creditsOD: 30000,
    description: 'Developer Hackathon Bounty: 3D AR Vessel Preview Integration',
    status: 'completed'
  }
];

const INITIAL_ENDPOINTS: ApiEndpointQuota[] = [
  {
    serviceName: 'Gemini AI Inference Proxy',
    endpoint: '/api/v1/gemini/chat-concierge',
    requests24h: 42800,
    quotaLimit24h: 100000,
    avgLatencyMs: 140,
    unitCostUSD: 0.0002,
    totalSpentUSD: 8.56
  },
  {
    serviceName: 'Google Maps Geocoding & Routes',
    endpoint: '/api/v1/maps/route-matrix',
    requests24h: 18400,
    quotaLimit24h: 50000,
    avgLatencyMs: 65,
    unitCostUSD: 0.0001,
    totalSpentUSD: 1.84
  },
  {
    serviceName: 'Firebase Firestore Data Sync',
    endpoint: '/api/v1/firestore/document-sync',
    requests24h: 89200,
    quotaLimit24h: 250000,
    avgLatencyMs: 22,
    unitCostUSD: 0.00005,
    totalSpentUSD: 4.46
  },
  {
    serviceName: 'Stripe Webhook Event Pipeline',
    endpoint: '/api/v1/stripe/webhook-listener',
    requests24h: 1250,
    quotaLimit24h: 10000,
    avgLatencyMs: 45,
    unitCostUSD: 0.0005,
    totalSpentUSD: 0.62
  }
];

interface DeveloperWalletHubProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const DeveloperWalletHub: React.FC<DeveloperWalletHubProps> = ({ triggerToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'API_KEYS' | 'METERING' | 'TRANSACTIONS' | 'WITHDRAWAL'>('OVERVIEW');

  // Wallet State
  const [creditBalanceUSD, setCreditBalanceUSD] = useState<number>(437.60);
  const [revenueEarnedUSD, setRevenueEarnedUSD] = useState<number>(1240.00);
  const [autoRechargeEnabled, setAutoRechargeEnabled] = useState<boolean>(true);
  const [autoRechargeAmount, setAutoRechargeAmount] = useState<number>(100);

  // API Keys State
  const [apiKeys, setApiKeys] = useState<DeveloperApiKey[]>(INITIAL_API_KEYS);
  const [showCreateKeyModal, setShowCreateKeyModal] = useState<boolean>(false);
  const [newKeyName, setNewKeyName] = useState<string>('');
  const [newKeyEnv, setNewKeyEnv] = useState<'PRODUCTION' | 'SANDBOX'>('SANDBOX');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [revealedKeyIds, setRevealedKeyIds] = useState<string[]>([]);

  // Transactions State
  const [transactions, setTransactions] = useState<DeveloperTransaction[]>(INITIAL_TRANSACTIONS);
  const [txFilterType, setTxFilterType] = useState<string>('ALL');
  const [txSearchQuery, setTxSearchQuery] = useState<string>('');

  // Top Up & Withdrawal Modal State
  const [showTopUpModal, setShowTopUpModal] = useState<boolean>(false);
  const [topUpInputUSD, setTopUpInputUSD] = useState<number>(50);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawAmountUSD, setWithdrawAmountUSD] = useState<number>(500);
  const [payoutBankName, setPayoutBankName] = useState<string>('HDFC International Maritime Branch');

  // Simulation State
  const [isSimulatingApiCall, setIsSimulatingApiCall] = useState<boolean>(false);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleCopyKey = (keyItem: DeveloperApiKey) => {
    navigator.clipboard.writeText(keyItem.fullSecret);
    setCopiedKeyId(keyItem.id);
    hapticEngine.trigger('success');
    notify(`Copied API Key secret for ${keyItem.name}`, 'success', 'KEY COPIED');
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleToggleRevealKey = (keyId: string) => {
    hapticEngine.trigger('click');
    if (revealedKeyIds.includes(keyId)) {
      setRevealedKeyIds(revealedKeyIds.filter((id) => id !== keyId));
    } else {
      setRevealedKeyIds([...revealedKeyIds, keyId]);
    }
  };

  const handleCreateNewApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    hapticEngine.trigger('success');
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const prefix = newKeyEnv === 'PRODUCTION' ? 'pk_live_dev_' : 'pk_test_dev_';

    const newKeyObj: DeveloperApiKey = {
      id: `key-dev-${Date.now()}`,
      name: newKeyName.trim(),
      keyPrefix: `${prefix}${randomHex.slice(0, 4)}`,
      fullSecret: `${prefix}${randomHex}`,
      environment: newKeyEnv,
      scopes: newKeyEnv === 'PRODUCTION' ? ['read:all', 'write:all', 'rpc:execute'] : ['read:sandbox', 'write:sandbox'],
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsed: 'Never',
      status: 'active'
    };

    setApiKeys([newKeyObj, ...apiKeys]);
    setShowCreateKeyModal(false);
    setNewKeyName('');
    notify(`Created new ${newKeyEnv} API key: ${newKeyObj.name}`, 'success', 'API KEY GENERATED');
  };

  const handleRevokeApiKey = (keyId: string) => {
    hapticEngine.trigger('alert');
    setApiKeys(apiKeys.map((k) => (k.id === keyId ? { ...k, status: 'revoked' as const } : k)));
    notify(`Revoked API key permissions for key ID ${keyId}`, 'warning', 'KEY REVOKED');
  };

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topUpInputUSD <= 0) return;

    hapticEngine.trigger('success');
    setCreditBalanceUSD((prev) => prev + topUpInputUSD);

    const newTx: DeveloperTransaction = {
      id: `tx-${Date.now()}`,
      txHash: `0x${Math.floor(Math.random() * 1e16).toString(16)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString() + ' UTC',
      type: 'TOP_UP',
      amountUSD: topUpInputUSD,
      creditsOD: topUpInputUSD * 200,
      description: `Manual Wallet Top-Up via Stripe Card (${topUpInputUSD * 200} $OD Credits)`,
      status: 'completed'
    };

    setTransactions([newTx, ...transactions]);
    setShowTopUpModal(false);
    notify(`Successfully deposited $${topUpInputUSD}.00 USD into Developer Wallet!`, 'success', 'WALLET TOP-UP COMPLETE');
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmountUSD <= 0 || withdrawAmountUSD > revenueEarnedUSD) return;

    hapticEngine.trigger('success');
    setRevenueEarnedUSD((prev) => prev - withdrawAmountUSD);

    const newTx: DeveloperTransaction = {
      id: `tx-${Date.now()}`,
      txHash: `0x${Math.floor(Math.random() * 1e16).toString(16)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString() + ' UTC',
      type: 'EARNINGS_PAYOUT',
      amountUSD: -withdrawAmountUSD,
      creditsOD: -withdrawAmountUSD * 200,
      description: `Developer Revenue Withdrawal -> ${payoutBankName}`,
      status: 'completed'
    };

    setTransactions([newTx, ...transactions]);
    setShowWithdrawModal(false);
    notify(`Initiated $${withdrawAmountUSD}.00 USD payout transfer to ${payoutBankName}`, 'success', 'WITHDRAWAL INITIATED');
  };

  const handleSimulateApiGasDeduction = () => {
    setIsSimulatingApiCall(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      setIsSimulatingApiCall(false);
      const gasCost = 0.50;
      setCreditBalanceUSD((prev) => Math.max(0, prev - gasCost));

      const newTx: DeveloperTransaction = {
        id: `tx-${Date.now()}`,
        txHash: `0x${Math.floor(Math.random() * 1e16).toString(16)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString() + ' UTC',
        type: 'API_GAS',
        amountUSD: -gasCost,
        creditsOD: -100,
        description: 'Simulated Developer Micro-Gas: 2,500 Gemini AI & Maps API Requests',
        status: 'completed'
      };

      setTransactions([newTx, ...transactions]);
      notify(`Deducted -$0.50 USD gas fee for 2,500 API calls`, 'info', 'GAS FEE DEDUCTED');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-amber-500/20 text-cyan-400 rounded-2xl border border-cyan-500/40 shadow-xl">
              <Wallet className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Developer API Credit Wallet &amp; Key Vault
                </h2>
                <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 text-xs font-mono font-black px-3 py-1 rounded-full shadow-md">
                  ADMIRAL ARCHITECT TIER (85/15 SPLIT)
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Manage developer API credits, monitor real-time inference gas metering, rotate API keys, and transfer applet monetization payouts via Stripe Connect.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => {
                setShowTopUpModal(true);
                hapticEngine.trigger('click');
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black font-mono text-xs transition-all shadow-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Top-Up Developer Wallet</span>
            </button>
            <button
              onClick={() => {
                setShowWithdrawModal(true);
                hapticEngine.trigger('click');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-mono text-xs font-bold border border-amber-500/40 transition-all flex items-center space-x-2"
            >
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
              <span>Withdraw Revenue</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveSubTab('OVERVIEW');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeSubTab === 'OVERVIEW' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Wallet Overview</span>
          </button>
          <button
            onClick={() => {
              setActiveSubTab('API_KEYS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeSubTab === 'API_KEYS' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>API Secret Keys ({apiKeys.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveSubTab('METERING');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeSubTab === 'METERING' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>API Consumption Metering</span>
          </button>
          <button
            onClick={() => {
              setActiveSubTab('TRANSACTIONS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeSubTab === 'TRANSACTIONS' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Receipt className="w-3.5 h-3.5 text-indigo-400" />
            <span>Transaction Ledger</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUBTAB 1: WALLET OVERVIEW & BALANCE VAULT                */}
      {/* ======================================================== */}
      {activeSubTab === 'OVERVIEW' && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {/* Developer Credit Vault */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="flex items-center space-x-1.5">
                  <Coins className="w-4 h-4 text-cyan-400" />
                  <span>DEVELOPER CREDIT VAULT</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                  AUTO-RECHARGE ACTIVE
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-black text-white">
                  ${creditBalanceUSD.toFixed(2)}
                  <span className="text-xs text-slate-400 font-normal"> USD</span>
                </div>
                <div className="text-xs text-cyan-400 font-bold">
                  ≈ {(creditBalanceUSD * 200).toLocaleString()} $OD Developer Credits
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Gas Cost per 1K API Calls:</span>
                <span className="text-emerald-400 font-bold">$0.20 USD</span>
              </div>
            </div>

            {/* Earned Revenue Share */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>MONETIZATION REVENUE</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  STRIPE CONNECT LINKED
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-black text-amber-300">
                  ${revenueEarnedUSD.toFixed(2)}
                  <span className="text-xs text-slate-400 font-normal"> USD</span>
                </div>
                <div className="text-xs text-amber-400/80 font-bold">
                  Available for Immediate Payout
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Developer Split:</span>
                <span className="text-amber-300 font-bold">85% (15% Platform Fee)</span>
              </div>
            </div>

            {/* Quick Actions & Gas Simulator */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span className="flex items-center space-x-1.5">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <span>GAS SIMULATOR</span>
                  </span>
                  <span className="text-[10px] text-indigo-300">SANDBOX TEST</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Test micro-gas deductions on live API calls (deducts -$0.50 USD for 2,500 inference cycles).
                </p>
              </div>

              <button
                onClick={handleSimulateApiGasDeduction}
                disabled={isSimulatingApiCall}
                className="w-full py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2"
              >
                {isSimulatingApiCall ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Simulating 2,500 Requests...</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4" />
                    <span>Simulate API Call (-$0.50)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Developer Staking & Auto-Recharge Settings */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5">
            <h3 className="text-sm font-mono font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Wallet Auto-Recharge &amp; Threshold Rules</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-bold">Auto-Recharge Trigger</span>
                  <input
                    type="checkbox"
                    checked={autoRechargeEnabled}
                    onChange={(e) => {
                      setAutoRechargeEnabled(e.target.checked);
                      hapticEngine.trigger('click');
                    }}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Automatically charge your primary Stripe payment card when credit balance drops below <strong>$20.00 USD</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-slate-300 font-bold block">Recharge Amount</span>
                <div className="flex items-center space-x-2">
                  {[50, 100, 250, 500].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setAutoRechargeAmount(amt);
                        hapticEngine.trigger('click');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        autoRechargeAmount === amt
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 2: API KEYS & SECRET VAULT                        */}
      {/* ======================================================== */}
      {activeSubTab === 'API_KEYS' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Key className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Developer API Secret Keys</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Authenticate server-side API requests, webhook listeners, and AI inference proxies securely.
              </p>
            </div>

            <button
              onClick={() => {
                setShowCreateKeyModal(true);
                hapticEngine.trigger('click');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-black shadow-lg flex items-center space-x-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Generate New API Key</span>
            </button>
          </div>

          {/* API Keys List */}
          <div className="space-y-4">
            {apiKeys.map((keyItem) => {
              const isRevealed = revealedKeyIds.includes(keyItem.id);
              const isCopied = copiedKeyId === keyItem.id;
              return (
                <div
                  key={keyItem.id}
                  className={`bg-slate-900 p-5 rounded-2xl border transition-all ${
                    keyItem.status === 'revoked'
                      ? 'border-rose-900/50 opacity-60'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-sm font-bold text-white font-mono">{keyItem.name}</h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            keyItem.environment === 'PRODUCTION'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {keyItem.environment}
                        </span>
                        {keyItem.status === 'revoked' && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold">
                            REVOKED
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono pt-1">
                        <span>Created: {keyItem.createdDate}</span>
                        <span>•</span>
                        <span>Last used: {keyItem.lastUsed}</span>
                      </div>
                    </div>

                    {/* Secret Mask / Reveal & Actions */}
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 flex items-center space-x-2">
                        <span>
                          {isRevealed
                            ? keyItem.fullSecret
                            : `${keyItem.keyPrefix}••••••••••••••••••••`}
                        </span>
                        <button
                          onClick={() => handleToggleRevealKey(keyItem.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <button
                        onClick={() => handleCopyKey(keyItem)}
                        disabled={keyItem.status === 'revoked'}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                        title="Copy Secret Key"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {keyItem.status === 'active' && (
                        <button
                          onClick={() => handleRevokeApiKey(keyItem.id)}
                          className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-mono text-xs font-bold border border-rose-500/30"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Scopes Badges */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center space-x-2 font-mono text-[10px]">
                    <span className="text-slate-500 font-bold">AUTHORIZED SCOPES:</span>
                    {keyItem.scopes.map((scope) => (
                      <span key={scope} className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 3: API CONSUMPTION METERING                       */}
      {/* ======================================================== */}
      {activeSubTab === 'METERING' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">API Service Telemetry &amp; Gas Metering</h3>
            </div>
            <p className="text-xs text-slate-400">
              Track 24-hour API request volumes, average latency response times, and per-endpoint micro-gas consumption.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Service &amp; Endpoint</th>
                  <th className="p-4">24h Requests</th>
                  <th className="p-4">Quota Utilization</th>
                  <th className="p-4">Avg Latency</th>
                  <th className="p-4">Unit Rate</th>
                  <th className="p-4 text-right">Total Spent (24h)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {INITIAL_ENDPOINTS.map((item) => {
                  const percent = Math.round((item.requests24h / item.quotaLimit24h) * 100);
                  return (
                    <tr key={item.endpoint} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white">{item.serviceName}</div>
                        <div className="text-[11px] text-cyan-400">{item.endpoint}</div>
                      </td>
                      <td className="p-4 text-slate-300 font-bold">{item.requests24h.toLocaleString()} reqs</td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-400">{percent}% of quota</span>
                            <span className="text-slate-500">{item.quotaLimit24h.toLocaleString()} max</span>
                          </div>
                          <div className="w-32 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-emerald-400 font-bold">{item.avgLatencyMs} ms</td>
                      <td className="p-4 text-slate-400">${item.unitCostUSD}</td>
                      <td className="p-4 text-right font-bold text-white">${item.totalSpentUSD.toFixed(2)} USD</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 4: TRANSACTION LEDGER                             */}
      {/* ======================================================== */}
      {activeSubTab === 'TRANSACTIONS' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Receipt className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Developer Transaction History Ledger</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Complete audit log of wallet deposits, micro-gas deductions, hackathon bounty rewards, and Stripe payouts.
              </p>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto pb-1">
              {['ALL', 'TOP_UP', 'API_GAS', 'EARNINGS_PAYOUT', 'BOUNTY_REWARD'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setTxFilterType(type);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3 py-1.5 rounded-xl uppercase font-bold transition-all ${
                    txFilterType === type
                      ? 'bg-indigo-500 text-white font-black'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Tx Hash / ID</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Amount USD</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {transactions
                  .filter((tx) => txFilterType === 'ALL' || tx.type === txFilterType)
                  .map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-cyan-400">{tx.txHash}</td>
                      <td className="p-4 text-slate-400 text-[11px]">{tx.date}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-950 text-indigo-300 font-bold text-[10px] border border-slate-800">
                          {tx.type}
                        </span>
                      </td>
                      <td className="p-4 text-slate-200">{tx.description}</td>
                      <td
                        className={`p-4 font-black ${
                          tx.amountUSD >= 0 ? 'text-emerald-400' : 'text-slate-300'
                        }`}
                      >
                        {tx.amountUSD >= 0 ? `+$${tx.amountUSD.toFixed(2)}` : `-$${Math.abs(tx.amountUSD).toFixed(2)}`} USD
                      </td>
                      <td className="p-4 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          COMPLETED
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top-Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-mono">Top-Up Developer Wallet</h3>
              </div>
              <button
                onClick={() => setShowTopUpModal(false)}
                className="text-slate-400 hover:text-white font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-slate-300 font-bold block">Select Deposit Amount (USD)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setTopUpInputUSD(amt);
                        hapticEngine.trigger('click');
                      }}
                      className={`py-2 rounded-xl font-bold transition-all ${
                        topUpInputUSD === amt
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Custom Amount ($)</label>
                <input
                  type="number"
                  min="10"
                  max="5000"
                  value={topUpInputUSD}
                  onChange={(e) => setTopUpInputUSD(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Developer Credits Received:</span>
                  <span className="text-emerald-400 font-bold">{(topUpInputUSD * 200).toLocaleString()} $OD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Payment Gateway:</span>
                  <span className="text-white font-bold">Stripe 3D Secure</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black font-mono text-xs transition-all shadow-lg hover:brightness-110"
              >
                Confirm Deposit of ${topUpInputUSD}.00 USD
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-mono">Withdraw Monetization Revenue</h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-slate-400 hover:text-white font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Available Earnings:</span>
                  <span className="text-amber-300 font-bold">${revenueEarnedUSD.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Withdrawal Amount ($USD)</label>
                <input
                  type="number"
                  min="10"
                  max={revenueEarnedUSD}
                  value={withdrawAmountUSD}
                  onChange={(e) => setWithdrawAmountUSD(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block">Payout Destination Account</label>
                <input
                  type="text"
                  value={payoutBankName}
                  onChange={(e) => setPayoutBankName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black font-mono text-xs transition-all shadow-lg hover:brightness-110"
              >
                Initiate Transfer of ${withdrawAmountUSD}.00 USD
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
