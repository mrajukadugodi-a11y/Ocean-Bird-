import React, { useState } from 'react';
import { ShieldCheck, Key, CreditCard, Building2, Globe, Cpu, Zap, CheckCircle2, AlertCircle, Clock, Download, ArrowUpRight, Sparkles, RefreshCw } from 'lucide-react';

export type SubscriptionCategory =
  | 'SOVEREIGN_GOVERNMENT'
  | 'MARITIME_CRUISE_FLEETS'
  | 'FINANCIAL_INSTITUTIONS'
  | 'VALIDATOR_NODES';

interface PlanTier {
  id: string;
  name: string;
  priceUSD: number;
  priceOD: number;
  period: string;
  badge: string;
  features: string[];
  recommended?: boolean;
}

export type BillingCycle = 'MONTHLY' | 'ANNUAL' | 'QUARTERLY' | 'SOVEREIGN_3YR';

export const AppSubscriptionPortalView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SubscriptionCategory>('SOVEREIGN_GOVERNMENT');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('ANNUAL');
  const [selectedTier, setSelectedTier] = useState<string>('tier_2_pro');
  const [allocatedSeats, setAllocatedSeats] = useState<number>(25);
  const [activeApiKey, setActiveApiKey] = useState<string>('sk_live_ocean_bird_9981a3f0012e88a91');
  const [showKeySecret, setShowKeySecret] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected Addons State
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['satcom_node']);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
      triggerToast('➖ Enterprise Add-On Removed');
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
      triggerToast('➕ Enterprise Add-On Attached to Plan');
    }
  };

  const categories: { id: SubscriptionCategory; label: string; icon: any; desc: string }[] = [
    {
      id: 'SOVEREIGN_GOVERNMENT',
      label: '🏛️ Sovereign & Government Ministries',
      icon: Building2,
      desc: 'Central Banks, Maritime Authorities, Port State Controls & Navy Defense Commands'
    },
    {
      id: 'MARITIME_CRUISE_FLEETS',
      label: '🚢 Cruise Fleets & Cargo Lines',
      icon: Globe,
      desc: 'Commercial Shipping Companies, Ocean Cruise Operators & Container Terminals'
    },
    {
      id: 'FINANCIAL_INSTITUTIONS',
      label: '🏦 Financial & Bullion Custodians',
      icon: CreditCard,
      desc: 'Zurich Freeport Vaults, Commercial Banks, Escrow Providers & Commodity Traders'
    },
    {
      id: 'VALIDATOR_NODES',
      label: '⚡ Validator Nodes & Telemetry',
      icon: Cpu,
      desc: 'NFC Sensor Node Hosts, On-Chain $OD Staking Validators & SatCom Relays'
    }
  ];

  const categoryPlans: Record<SubscriptionCategory, PlanTier[]> = {
    SOVEREIGN_GOVERNMENT: [
      {
        id: 'tier_1_govt',
        name: 'Sovereign Observer',
        priceUSD: 4999,
        priceOD: 4999,
        period: 'month',
        badge: 'PILOT / STATE',
        features: [
          'National Maritime Boundary Monitoring',
          'Up to 50 Official Observer Accounts',
          'Standard API Rate Limit (100k requests/day)',
          'S-57 Nautical Vector Chart Exports',
          'Standard Email & SatCom Support'
        ]
      },
      {
        id: 'tier_2_govt',
        name: 'Sovereign Command',
        priceUSD: 24999,
        priceOD: 24999,
        period: 'month',
        badge: 'MOST POPULAR',
        recommended: true,
        features: [
          'Full EEZ Radar & Tsunami Early Warning Feed',
          'Unlimited Sovereign Government Credentials',
          'Direct Zurich Bullion Vault Multi-Sig Node',
          'Priority SatCom Telemetry Bandwidth',
          'Dedicated Harbormaster AI Chatbot Integration',
          'Custom Legal & Regulatory Audit Ledger'
        ]
      },
      {
        id: 'tier_3_govt',
        name: 'Sovereign Enterprise Nation',
        priceUSD: 99000,
        priceOD: 99000,
        period: 'month',
        badge: 'UNLIMITED STATE',
        features: [
          'Full Sovereign Codebase White-Label License',
          'Unlimited Ocean Dollar ($OD) Central Bank Mints',
          'Air-Gapped Private Satellite Infrastructure',
          'Dedicated 24/7 On-Site Swiss Vault Custodian',
          'Custom Super Master AI Defense Squad Deployment',
          'Sovereign Bond & Treasury Yield Engine'
        ]
      }
    ],
    MARITIME_CRUISE_FLEETS: [
      {
        id: 'tier_1_fleet',
        name: 'Fleet Starter',
        priceUSD: 1999,
        priceOD: 1999,
        period: 'month',
        badge: 'UP TO 5 SHIPS',
        features: [
          'Live AIS GPS Vessel Location Tracking',
          'Smart Fuel & Route Cubic Law Optimization',
          'Crew MLC 2006 Welfare Portal Access',
          'Basic Passenger E-Ticketing System'
        ]
      },
      {
        id: 'tier_2_pro',
        name: 'Global Fleet Commander',
        priceUSD: 9999,
        priceOD: 9999,
        period: 'month',
        badge: 'RECOMMENDED FLEET',
        recommended: true,
        features: [
          'Unlimited Vessel Tracking & Fleet Analytics',
          'Direct Ocean Dollar ($OD) Passenger Gaming System',
          'Collision Avoidance CPA/TCPA Radar HUD',
          'Automated Port Entry Checklist & QR Gate Pass',
          'Predictive Machinery Maintenance AI Alerts'
        ]
      },
      {
        id: 'tier_3_fleet',
        name: 'Cruise Conglomerate Enterprise',
        priceUSD: 39999,
        priceOD: 39999,
        period: 'month',
        badge: 'FULL CRUISE MATRIX',
        features: [
          'Custom Branded Passenger & Crew Mobile Apps',
          'Zero-Fee $OD On-Board Casino & Lottery Rails',
          'Global Port Terminal Priority Docking Sync',
          'Custom ESG & IMO CII Carbon Offset Registry',
          'Dedicated Technical Account Manager & AI Squad'
        ]
      }
    ],
    FINANCIAL_INSTITUTIONS: [
      {
        id: 'tier_1_fin',
        name: 'Vault Custodian Basic',
        priceUSD: 3499,
        priceOD: 3499,
        period: 'month',
        badge: 'BASIC CUSTODY',
        features: [
          'Zurich & Geneva Vault Inventory Sync',
          'Standard Assay Audit Certificate Generator',
          'Real-Time Gold Parity Price Feeds',
          'Up to $5M $OD Escrow Capacity'
        ]
      },
      {
        id: 'tier_2_fin',
        name: 'Institutional Sovereign Desk',
        priceUSD: 14999,
        priceOD: 14999,
        period: 'month',
        badge: 'INSTITUTIONAL',
        recommended: true,
        features: [
          'Instant SWIFT MT940 & SEPA Banking Bridge',
          '$100M+ Ocean Dollar ($OD) Credit Lines',
          'Biometric Dual-Key Vault Signatures',
          'Real-time NFC Sensor Ingot Telemetry',
          'Custom Risk & Whale Stress Modeling'
        ]
      },
      {
        id: 'tier_3_fin',
        name: 'Global Exchange & Bullion Reserve',
        priceUSD: 59999,
        priceOD: 59999,
        period: 'month',
        badge: 'GLOBAL VAULT',
        features: [
          'Full Bullion Reserve Sync API Access',
          'Custom Fractional Yield Pool Deployment',
          '24K Gold Ingot Tokenization Engine',
          'Zero-Latency High-Frequency Trading Gateway',
          'Automated KPMG/Swissmint Audit Reporting'
        ]
      }
    ],
    VALIDATOR_NODES: [
      {
        id: 'tier_1_node',
        name: 'Light Telemetry Node',
        priceUSD: 499,
        priceOD: 499,
        period: 'month',
        badge: 'NODE OPERATOR',
        features: [
          'Host 1 Vault NFC Sensor Telemetry Node',
          'Earn Base Staking Rewards (+8.5% APY in $OD)',
          'Automated Heartbeat & Ping Monitoring'
        ]
      },
      {
        id: 'tier_2_node',
        name: 'Master Validator Node',
        priceUSD: 2499,
        priceOD: 2499,
        period: 'month',
        badge: 'HIGH YIELD',
        recommended: true,
        features: [
          'Host Multi-Vault Telemetry Clusters',
          'Earn Enhanced Staking Rewards (+14.2% APY)',
          'Participate in On-Chain Protocol Governance',
          'Direct SatCom Bridge Connection'
        ]
      },
      {
        id: 'tier_3_node',
        name: 'Sovereign Validator Cluster',
        priceUSD: 9999,
        priceOD: 9999,
        period: 'month',
        badge: 'MAX REWARDS',
        features: [
          'Full SatCom & Telemetry Cluster Franchise',
          'Earn Maximum APY (+18.5% Staking Yield)',
          'Validator Block Proposal Rights',
          'Dedicated Hardware Enclave Protection'
        ]
      }
    ]
  };

  const handleSubscribe = (plan: PlanTier) => {
    setSelectedTier(plan.id);
    triggerToast(`🎉 Subscribed to ${plan.name} (${activeCategory.replace(/_/g, ' ')})! API credentials activated.`);
  };

  const handleGenerateNewKey = () => {
    const newKey = `sk_live_ocean_bird_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setActiveApiKey(newKey);
    triggerToast('🔑 New Production API Key generated & active!');
  };

  return (
    <div className="space-y-8 font-mono">
      {/* TOAST NOTICE */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-slate-950 font-black px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce border border-emerald-300">
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER HERO */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">ENTERPRISE SAAS &amp; SOVEREIGN LICENSING</span>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                CATEGORY-WISE SUBSCRIPTION DASHBOARD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">App Subscription &amp; Licensing Portal</h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-1 max-w-2xl">
              Select category-specific subscription plans, manage active API credentials, track quota usage, and configure sovereign enterprise licenses.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1 text-right shrink-0">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">CURRENT ACTIVE SUBSCRIPTION</span>
            <span className="text-sm font-black text-emerald-400 block">Sovereign Command Tier</span>
            <span className="text-[10px] text-slate-400 block">Renews in 24 Days • Auto-Debit Active</span>
          </div>
        </div>
      </div>

      {/* MULTI-TIER SUBSCRIPTION ANALYTICS DASHBOARD */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-cyan-500/30 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">REAL-TIME LICENSE METRICS</span>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                MULTI-TIERED ANALYTICS DASHBOARD
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-0.5">Multi-Tier Subscription &amp; Revenue Dashboard</h2>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
              🟢 MRR Growth: +14.2% YoY
            </span>
          </div>
        </div>

        {/* REVENUE & LICENSE METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">MONTHLY RECURRING REVENUE (MRR)</span>
            <span className="text-2xl font-black text-amber-400">$2,845,000</span>
            <span className="text-[10px] text-emerald-400 block">≈ 2,845,000 $OD / mo</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">ANNUALIZED RUN RATE (ARR)</span>
            <span className="text-2xl font-black text-cyan-400">$34,140,000</span>
            <span className="text-[10px] text-slate-400 block">3-Year Sovereign Contracts Included</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">ACTIVE SOVEREIGN LICENSES</span>
            <span className="text-2xl font-black text-white">1,420</span>
            <span className="text-[10px] text-cyan-400 block">Across 42 Maritime Nations</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">TOTAL ALLOCATED SEATS</span>
            <span className="text-2xl font-black text-emerald-400">28,450</span>
            <span className="text-[10px] text-slate-400 block">94.8% Active Seat Utilization</span>
          </div>
        </div>

        {/* TIER BREAKDOWN PROGRESS BARS */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase block">REVENUE CONTRIBUTION BY SUBSCRIPTION TIER:</span>
          
          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-emerald-400">Tier 3 Sovereign Enterprise ($99,000/mo) • 18 Nations</span>
                <span className="text-white font-mono">$1,782,000 (62.6%)</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '62.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-cyan-400">Tier 2 Global Fleet Commander ($24,999/mo) • 42 Fleets</span>
                <span className="text-white font-mono">$1,049,958 (36.9%)</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '36.9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-amber-400">Tier 1 Sovereign &amp; Node Starters ($499 - $4,999/mo) • 1,360 Accounts</span>
                <span className="text-white font-mono">$13,042 (0.5%)</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '0.5%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* COHORT ANALYTICS & RECENT UPGRADES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">UNIT ECONOMICS &amp; COHORT RETENTION</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">LTV : CAC Ratio</span>
                <strong className="text-emerald-400 text-sm font-black">18.4x (World Class)</strong>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Gross Logo Churn</span>
                <strong className="text-cyan-400 text-sm font-black">0.08% / month</strong>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Net Revenue Retention</span>
                <strong className="text-amber-400 text-sm font-black">138.2% NRR</strong>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">CAC Payback Period</span>
                <strong className="text-slate-200 text-sm font-black">2.1 Months</strong>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">LIVE SUBSCRIBER ACTIVITY &amp; UPGRADE FEED</span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-300">Republic of Singapore Maritime Auth</span>
                <span className="text-emerald-400 font-bold">UPGRADED → Tier 3 ($99k/mo)</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-300">Maersk Global Fleet Command</span>
                <span className="text-cyan-400 font-bold">RENEWED → 3-Year Sovereign</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-300">Rotterdam Freeport Node Cluster</span>
                <span className="text-amber-400 font-bold">+250 Seat Seats Added</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-300 block">MULTI-TIERED BILLING CYCLE &amp; DISCOUNT SCHEDULE</span>
          <span className="text-[10px] text-slate-400 font-sans">Choose billing frequency for maximum discount savings across all tiers</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'MONTHLY', label: 'Monthly (Base)' },
            { id: 'QUARTERLY', label: 'Quarterly (-10%)' },
            { id: 'ANNUAL', label: 'Annual (-20% OFF)', badge: 'POPULAR' },
            { id: 'SOVEREIGN_3YR', label: '3-Year Sovereign (-35% OFF)', badge: 'MAX DISCOUNT' }
          ].map((cycle) => (
            <button
              key={cycle.id}
              onClick={() => setBillingCycle(cycle.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === cycle.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{cycle.label}</span>
              {cycle.badge && (
                <span className={`text-[8px] px-1 py-0.2 rounded font-black uppercase ${
                  billingCycle === cycle.id ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {cycle.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-2xl text-left border transition-all space-y-2 relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
              </div>
              <h3 className={`text-xs font-black uppercase ${isActive ? 'text-white' : 'text-slate-300'}`}>{cat.label}</h3>
              <p className="text-[10px] text-slate-500 font-sans line-clamp-2">{cat.desc}</p>
            </button>
          );
        })}
      </div>

      {/* PLAN CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-black text-white uppercase">
            Available Plans for: <span className="text-cyan-400">{activeCategory.replace(/_/g, ' ')}</span>
          </h2>
          <span className="text-xs text-slate-400 font-sans">Prices in USD &amp; Ocean Dollar ($OD) at 1:1 Parity</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryPlans[activeCategory].map((plan) => {
            const isSelected = selectedTier === plan.id;

            return (
              <div
                key={plan.id}
                className={`bg-slate-900 p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-6 relative ${
                  plan.recommended
                    ? 'border-cyan-500/60 shadow-xl shadow-cyan-500/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                    ★ {plan.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">{plan.badge}</span>
                      <h3 className="text-lg font-black text-white mt-0.5">{plan.name}</h3>
                    </div>
                  </div>

                  {/* PRICE DISPLAY */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-amber-400">${plan.priceUSD.toLocaleString()}</span>
                      <span className="text-xs text-slate-400">USD / {plan.period}</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 block font-bold">≈ ${plan.priceOD.toLocaleString()} $OD (1:1 Parity)</span>
                  </div>

                  {/* FEATURE LIST */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">INCLUDED CAPABILITIES:</span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 font-sans">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 rounded-xl font-black text-xs uppercase transition-all shadow-lg ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : plan.recommended
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {isSelected ? '✓ Active Plan' : `Subscribe to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* API KEY & QUOTA MANAGEMENT SECTION */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">DEVELOPER &amp; INTEGRATION KEYS</span>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px]">
                AES-256 ENCRYPTED API CREDENTIALS
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Active Production API Key &amp; Quota Manager</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Use your active API key to authenticate requests against AIS location tracking, Zurich bullion sync, and $OD gaming APIs.
            </p>
          </div>

          <button
            onClick={handleGenerateNewKey}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 text-xs font-bold rounded-xl uppercase transition-all shrink-0 flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate New Key</span>
          </button>
        </div>

        {/* API KEY DISPLAY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">LIVE PRODUCTION SECRET KEY</span>
            <div className="flex items-center space-x-2">
              <input
                type={showKeySecret ? 'text' : 'password'}
                readOnly
                value={activeApiKey}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-amber-400 font-mono focus:outline-none"
              />
              <button
                onClick={() => setShowKeySecret(!showKeySecret)}
                className="px-3 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-bold shrink-0"
              >
                {showKeySecret ? 'Hide' : 'Show'}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeApiKey);
                  triggerToast('📋 API Key copied to clipboard!');
                }}
                className="px-3 py-3 bg-cyan-500 text-slate-950 font-black rounded-xl text-xs uppercase shrink-0"
              >
                Copy
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Header required for SDK: <code className="text-cyan-400 font-mono">X-OceanBird-Api-Key: {activeApiKey.substring(0, 16)}...</code>
            </p>
          </div>

          {/* QUOTA USAGE GAUGE */}
          <div className="md:col-span-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400 uppercase">MONTHLY API QUOTA:</span>
                <span className="text-cyan-400 font-mono">4,820,000 / 10,000,000</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800 mt-2">
                <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full" style={{ width: '48.2%' }} />
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800">
              <span>Bandwidth: <strong className="text-white">1.82 TB</strong></span>
              <span className="text-emerald-400 font-bold">48.2% Quota Used</span>
            </div>
          </div>
        </div>
      </div>

      {/* ENTERPRISE ADD-ONS SECTION */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">MODULAR ENHANCEMENTS</span>
          <h2 className="text-xl font-black text-white mt-0.5">Enterprise Add-On Modules</h2>
          <p className="text-slate-400 text-xs font-sans mt-0.5">Attach specialized dedicated infrastructure and security modules to any active plan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'satcom_node', name: '📡 Air-Gapped SatCom Relay Node', priceUSD: 2500, desc: 'Dedicated Starlink & Inmarsat C-band telemetry satellite channel for zero-latency vessel tracking.' },
            { id: 'master_ai_squad', name: '🛡️ Custom Super Master AI Defense Squad', priceUSD: 5000, desc: 'Dedicated 5-agent AI cybersecurity squad guarding API endpoints, WASM memory and preventing data theft.' },
            { id: 'swiss_vault_auditor', name: '🧈 On-Site Swiss Vault Physical Auditor', priceUSD: 3500, desc: 'Dedicated monthly physical bar inspection in Zurich-Kloten with certified KPMG assay certificates.' }
          ].map((addon) => {
            const isAttached = selectedAddons.includes(addon.id);

            return (
              <div
                key={addon.id}
                className={`bg-slate-950 p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isAttached ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-black text-white uppercase">{addon.name}</h3>
                    <span className="text-amber-400 font-bold text-xs">+${addon.priceUSD}/mo</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-2">{addon.desc}</p>
                </div>

                <button
                  onClick={() => toggleAddon(addon.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                    isAttached
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {isAttached ? '✓ Add-On Attached' : '+ Attach Add-On'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* TIER FEATURE MATRIX */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">COMPARISON MATRIX</span>
          <h2 className="text-xl font-black text-white mt-0.5">Multi-Tiered Feature Matrix</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                <th className="p-3 uppercase">Capability / Feature</th>
                <th className="p-3 text-center uppercase text-amber-400">Tier 1 Starter</th>
                <th className="p-3 text-center uppercase text-cyan-400">Tier 2 Professional</th>
                <th className="p-3 text-center uppercase text-emerald-400">Tier 3 Sovereign Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-3 text-slate-300 font-bold">API Request Quota</td>
                <td className="p-3 text-center text-slate-400">100k / day</td>
                <td className="p-3 text-center text-cyan-400 font-bold">10M / month</td>
                <td className="p-3 text-center text-emerald-400 font-bold">UNLIMITED</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300 font-bold">Zurich Vault Multi-Sig Node</td>
                <td className="p-3 text-center text-slate-500">Read-Only</td>
                <td className="p-3 text-center text-emerald-400">✓ Included</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✓ Dedicated Node</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300 font-bold">SatCom Telemetry SLA</td>
                <td className="p-3 text-center text-slate-400">99.0% SLA</td>
                <td className="p-3 text-center text-cyan-400 font-bold">99.9% High Priority</td>
                <td className="p-3 text-center text-emerald-400 font-bold">99.999% Air-Gapped</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300 font-bold">Custom White-Label Branding</td>
                <td className="p-3 text-center text-slate-500">❌</td>
                <td className="p-3 text-center text-slate-400">Partial</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✓ Full Codebase Deed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
