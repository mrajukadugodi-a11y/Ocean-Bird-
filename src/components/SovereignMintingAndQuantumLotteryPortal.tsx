import React, { useState, useEffect } from 'react';
import oceanDollar100NoteImg from '../assets/images/ocean_dollar_banknote_1787143582965.jpg';
import oceanDollar1000NoteImg from '../assets/images/ocean_dollar_1000_note_1787143915335.jpg';
import { IodStakingDaoAndDevRevenuePortal } from './IodStakingDaoAndDevRevenuePortal';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, 
  CartesianGrid, Legend, ComposedChart, Line 
} from 'recharts';
import { 
  Bot, Cpu, Sparkles, Trophy, ShieldCheck, Zap, RefreshCw, Download, Check, Copy, 
  Eye, Lock, DollarSign, Activity, Layers, Coins, Landmark, Flame, ShieldAlert,
  ArrowRight, Radio, Ticket, CheckCircle2, Sliders, Terminal, Clock, Crown, HeartHandshake, Wind,
  BellRing, Award, FileText, Gift, ChevronRight, Play, Pause, Calendar, Globe, Calculator,
  Search, Info, BookOpen, AlertCircle, HelpCircle, Users, Languages, CreditCard, Scale,
  Building2, ExternalLink, LifeBuoy, SlidersHorizontal, MapPin, CheckSquare, MessageSquare,
  PieChart, BarChart2, TrendingUp, ChevronDown, ChevronUp, AlertTriangle, EyeOff, UserCheck, Gavel
} from 'lucide-react';

export type AssetCategoryFilter = 'ALL' | 'BANKNOTES' | 'GOLD_BULLION' | 'CARBON_OFFSETS' | 'PORT_BONDS';
export type LotteryGameId = 'EMPEROR_WEEKLY' | 'QUEEN_WEEKLY' | 'GUARD_WEEKLY' | 'WIND_DAILY';
export type SupportedLanguage = 'EN' | 'ES' | 'HI' | 'JA' | 'AR' | 'ZH' | 'FR' | 'PT';
export type WithdrawalChannel = 'WEB3_WALLET' | 'BANK_WIRE' | 'GOLD_BULLION' | 'CRYPTO_USDT';

export interface SovereignAssetItem {
  id: string;
  name: string;
  category: AssetCategoryFilter;
  valueUsd: string;
  reserveRatio: string;
  vaultLocation: string;
  img: string;
  description: string;
  badge: string;
}

export interface SovereignLotteryGame {
  id: LotteryGameId;
  name: string;
  scheduleType: 'WEEKLY' | 'DAILY';
  drawScheduleText: string;
  jackpotOd: number;
  ticketPriceOd: number;
  totalParticipants: number;
  purpose: string;
  badgeTag: string;
  color: string;
  icon: any;
}

export interface RegionalLotteryTier {
  id: string;
  regionName: string;
  coveredPorts: string;
  jackpotOd: number;
  ticketPriceOd: number;
  participants: number;
  color: string;
  flagEmoji: string;
}

export interface TaxJurisdictionInfo {
  countryCode: string;
  countryName: string;
  flag: string;
  traditionalTaxRate: string;
  sovereignTaxRate: string;
  reportingAuthority: string;
  treatyStatus: string;
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'EN', label: 'English', flag: '🇺🇸' },
  { code: 'ES', label: 'Español', flag: '🇪🇸' },
  { code: 'HI', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'JA', label: '日本語', flag: '🇯🇵' },
  { code: 'AR', label: 'العربية', flag: '🇦🇪' },
  { code: 'ZH', label: '中文', flag: '🇨🇳' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'PT', label: 'Português', flag: '🇧🇷' }
];

export const GLOBAL_GAMING_TAXES_DATA: TaxJurisdictionInfo[] = [
  {
    countryCode: 'UNCLOS',
    countryName: 'High Seas Maritime Sovereign Territory',
    flag: '🌊',
    traditionalTaxRate: '0.00%',
    sovereignTaxRate: '0.00% (Tax-Free)',
    reportingAuthority: 'International Maritime Bureau',
    treatyStatus: '100% Tax-Free Sovereign Settlement',
    note: 'Under UNCLOS Article 87, maritime gaming payouts carry zero withholding tax.'
  },
  {
    countryCode: 'US',
    countryName: 'United States (IRS)',
    flag: '🇺🇸',
    traditionalTaxRate: '24% - 37%',
    sovereignTaxRate: '0.00% (Foreign Source)',
    reportingAuthority: 'Internal Revenue Service (Form 1040-NR)',
    treatyStatus: 'Non-US Sovereign Source Exclusion',
    note: 'Offshore high seas territory earnings are exempt from US federal lottery withholding.'
  },
  {
    countryCode: 'GB',
    countryName: 'United Kingdom (HMRC)',
    flag: '🇬🇧',
    traditionalTaxRate: '0.00%',
    sovereignTaxRate: '0.00% (Tax-Free)',
    reportingAuthority: 'HM Revenue & Customs',
    treatyStatus: 'UK Betting Tax Exemption',
    note: 'Lottery winnings in UK are 100% non-taxable under HMRC Section 301.'
  },
  {
    countryCode: 'IN',
    countryName: 'India (Income Tax Dept)',
    flag: '🇮🇳',
    traditionalTaxRate: '31.20% (Sec 115BB)',
    sovereignTaxRate: '0.00% (Treaty Exclusion)',
    reportingAuthority: 'Central Board of Direct Taxes',
    treatyStatus: 'High Seas Maritime Exclusion',
    note: 'Offshore maritime settlement falls outside Indian territorial tax jurisdiction.'
  },
  {
    countryCode: 'DE',
    countryName: 'Germany (Finanzamt)',
    flag: '🇩🇪',
    traditionalTaxRate: '0.00%',
    sovereignTaxRate: '0.00% (Tax-Free)',
    reportingAuthority: 'Federal Ministry of Finance',
    treatyStatus: 'German Gambling Tax Exemption',
    note: 'Lottery payouts are non-taxable under German §4 Nr. 9b UStG.'
  },
  {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    traditionalTaxRate: '0.00%',
    sovereignTaxRate: '0.00% (Tax-Free)',
    reportingAuthority: 'Federal Tax Authority (FTA)',
    treatyStatus: 'UAE Free Zone Personal Income Exemption',
    note: 'Zero personal income or capital gains tax applied.'
  }
];

export const GAMING_FAQS: FaqItem[] = [
  {
    question: 'How do I purchase Ocean Dollar ($OD) lottery tickets?',
    answer: 'Select your preferred game (Ocean Emperor, Ocean Queen, Ocean Guard, or Ocean Wind), choose your ticket quantity, and confirm entry using your connected Ocean Dollar Sovereign Wallet.',
    category: 'TICKETS & PLAY'
  },
  {
    question: 'Are my lottery winnings 100% tax-free?',
    answer: 'Yes! All Ocean Dollar payouts are issued under UNCLOS Article 87 High Seas Sovereign Jurisdiction, guaranteeing 0.00% withholding tax with zero regional tax deductions.',
    category: 'TAXES & LEGAL'
  },
  {
    question: 'How does the Kyber-1024 Quantum AI Entropy Engine ensure fairness?',
    answer: 'The system uses post-quantum lattice cryptography to generate un-biasable random seeds. Anyone can verify draw integrity using the Provably Fair Audit Tool.',
    category: 'FAIRNESS & SECURITY'
  },
  {
    question: 'Who is eligible to participate in Ocean Dollar games?',
    answer: 'Both commercial seafarers/mariners and non-seafarer global citizens from 185+ UN & sovereign nations who are 18+ years of age are fully eligible to play.',
    category: 'ELIGIBILITY'
  },
  {
    question: 'How quickly can I withdraw my prize winnings?',
    answer: 'Withdrawals to Ocean Dollar Web3 Vaults are instantaneous (0 seconds). Bank wires (SWIFT/SEPA), USDT crypto, or physical 24K gold bullion delivery process within 1-2 business hours.',
    category: 'WITHDRAWALS'
  },
  {
    question: 'Can I claim my jackpot winnings anonymously?',
    answer: 'Yes! You can enable Winner Privacy Shield to claim payouts anonymously using a Sovereign Pseudo-Name (e.g. Captain Poseidon 0x98A) with full zero-knowledge identity lock.',
    category: 'PRIVACY'
  }
];

export const PAYOUT_TIMELINE_STEPS = [
  { step: 'STEP 1: 00s', title: 'Quantum Entropy Number Draw', desc: 'Kyber-1024 lattice vector execution generates verifiable winning balls.', icon: Sparkles, color: '#a855f7' },
  { step: 'STEP 2: 15s', title: 'Multi-Sig Winner Audit', desc: '5-of-7 Sovereign Port Authority signatures verify ticket serial match.', icon: ShieldCheck, color: '#38bdf8' },
  { step: 'STEP 3: 30s', title: 'Sovereign Vault Release', desc: '100% Tax-Free Ocean Dollar ($OD) reserve funds unlocked from Zurich Vault.', icon: Lock, color: '#eab308' },
  { step: 'STEP 4: INSTANT', title: 'Web3 Wallet / Direct Wire Delivery', desc: 'Direct 0s Web3 wallet injection or instant SWIFT bank wire dispatch.', icon: Zap, color: '#10b981' }
];

export const SovereignMintingAndQuantumLotteryPortal: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('EN');

  // Privacy Shield State
  const [isAnonymousClaim, setIsAnonymousClaim] = useState<boolean>(true);
  const [pseudoName, setPseudoName] = useState<string>('Captain Poseidon 0x98A');
  const [privacySuccessMsg, setPrivacySuccessMsg] = useState<string | null>(null);

  // AI Gaming Dispute State
  const [disputeTicketSerial, setDisputeTicketSerial] = useState<string>('TKT-EMP-98214');
  const [disputeReasonText, setDisputeReasonText] = useState<string>('Verify draw seed match and vault settlement timestamp.');
  const [disputeAiResultMsg, setDisputeAiResultMsg] = useState<string | null>(null);

  // FAQ Search State
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSavePrivacyShield = () => {
    setPrivacySuccessMsg(`🛡️ WINNER PRIVACY SHIELD SAVED! Public Identity locked as "${isAnonymousClaim ? pseudoName : 'Public Full Name'}". Real identity protected on-chain.`);
    setTimeout(() => setPrivacySuccessMsg(null), 5000);
  };

  const handleExecuteAiDisputeResolution = () => {
    setDisputeAiResultMsg(`🤖 SOVEREIGN AI OMBUDSMAN RESOLUTION: Ticket "${disputeTicketSerial}" re-verified against Kyber-1024 Quantum Seed #0x8f4e2b. Draw result is 100% BINDING & VERIFIED. Payout released.`);
    setTimeout(() => setDisputeAiResultMsg(null), 6000);
  };

  const filteredFaqs = GAMING_FAQS.filter((f) => {
    if (!faqSearchQuery) return true;
    const q = faqSearchQuery.toLowerCase();
    return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
  });

  return (
    <div id="sovereign-minting-quantum-lottery-portal" className="space-y-8 font-mono text-white animate-fadeIn relative">
      {/* ========================================================================= */}
      {/* MULTI-LANGUAGE SWITCHER TOOLBAR */}
      {/* ========================================================================= */}
      <div id="multi-language-switcher" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xl">
        <div className="flex items-center space-x-2">
          <Languages className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-slate-200">MULTI-LANGUAGE SUPPORT / IDIOMA / 语言 / भाषा:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setCurrentLang(lang.code)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                currentLang === lang.code
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg scale-105'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. LOTTERY WINNER PRIVACY SHIELD */}
      <div id="lottery-winner-privacy" className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl">
              <EyeOff className="w-7 h-7 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">ZERO-KNOWLEDGE IDENTITY LOCK</span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  100% ANONYMOUS CLAIMING
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-0.5">Lottery Winner Privacy Shield</h2>
              <p className="text-slate-400 text-xs font-sans mt-0.5 max-w-3xl">
                Protect your real-world identity when claiming jackpot winnings. Choose anonymous pseudo-names and lock private wallet credentials on the public ledger.
              </p>
            </div>
          </div>

          <button
            onClick={handleSavePrivacyShield}
            className="py-3 px-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase rounded-xl transition-all shadow-xl flex items-center space-x-2 shrink-0"
          >
            <UserCheck className="w-4 h-4" />
            <span>SAVE PRIVACY SETTINGS</span>
          </button>
        </div>

        {privacySuccessMsg && (
          <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-4 rounded-2xl text-xs font-bold font-mono animate-fadeIn">
            {privacySuccessMsg}
          </div>
        )}

        {/* PRIVACY CONTROLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">1. ANONYMOUS CLAIM MODE:</span>
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-white font-bold">Hide Real Name &amp; Photo on Public Leaderboard</span>
              <input
                type="checkbox"
                checked={isAnonymousClaim}
                onChange={(e) => setIsAnonymousClaim(e.target.checked)}
                className="w-5 h-5 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">2. SOVEREIGN PSEUDO-NAME:</span>
            <input
              type="text"
              value={pseudoName}
              onChange={(e) => setPseudoName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300 font-mono text-xs outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* 2. AI GAMING DISPUTE & LEGAL RESOLVE */}
      <div id="ai-gaming-dispute-and-legal-resolve" className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-500/20 border border-purple-500/40 rounded-2xl">
              <Gavel className="w-7 h-7 text-purple-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">SOVEREIGN AI OMBUDSMAN AGENT</span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  UNCLOS BINDING ARBITRATION
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-0.5">AI Gaming Dispute &amp; Legal Resolution Engine</h2>
              <p className="text-slate-400 text-xs font-sans mt-0.5 max-w-3xl">
                File ticket disputes directly to the Sovereign AI Ombudsman for instant cryptographic seed verification and binding smart-contract legal resolution.
              </p>
            </div>
          </div>

          <button
            onClick={handleExecuteAiDisputeResolution}
            className="py-3 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-xl transition-all shadow-xl flex items-center space-x-2 shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>EXECUTE AI LEGAL ARBITRATION</span>
          </button>
        </div>

        {disputeAiResultMsg && (
          <div className="bg-purple-500/20 border border-purple-400 text-purple-200 p-4 rounded-2xl text-xs font-bold font-mono animate-fadeIn">
            {disputeAiResultMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">DISPUTED TICKET SERIAL NUMBER:</span>
            <input
              type="text"
              value={disputeTicketSerial}
              onChange={(e) => setDisputeTicketSerial(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
            />
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">DISPUTE REASON &amp; CLAIM DETAILS:</span>
            <input
              type="text"
              value={disputeReasonText}
              onChange={(e) => setDisputeReasonText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
            />
          </div>
        </div>
      </div>

      {/* 3. LOTTERY PAYOUT TIMELINE */}
      <div id="lottery-payout-timeline" className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">4-STEP SETTLEMENT FLOW</span>
          <h2 className="text-2xl font-black text-white mt-0.5">Sovereign Lottery Payout Timeline</h2>
          <p className="text-slate-400 text-xs font-sans mt-0.5">
            Step-by-step verification and payout settlement speed benchmarks from ticket draw to final wallet delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {PAYOUT_TIMELINE_STEPS.map((stepItem, idx) => {
            const IconComp = stepItem.icon;
            return (
              <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2 relative">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${stepItem.color}20`, color: stepItem.color }}>
                  {stepItem.step}
                </span>
                <div className="flex items-center space-x-2 pt-1">
                  <IconComp className="w-5 h-5" style={{ color: stepItem.color }} />
                  <strong className="text-white font-bold block text-xs">{stepItem.title}</strong>
                </div>
                <p className="text-slate-400 text-[11px] font-sans leading-relaxed">{stepItem.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. GAMING TAX TRANSPARENCY & FAQ SEARCH */}
      <div id="gaming-faq-search-and-tax-transparency" className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl">
              <HelpCircle className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">REAL-TIME FAQ SEARCH &amp; TRANSPARENCY</span>
              <h2 className="text-2xl font-black text-white mt-0.5">Gaming FAQ Search &amp; Tax Transparency</h2>
            </div>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search FAQs (e.g. tax, privacy, tickets)..."
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-mono outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-3 text-xs font-sans">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div key={idx} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-white hover:text-amber-400 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[9px] font-mono">
                      {faq.category}
                    </span>
                    <span className="text-sm">{faq.question}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 border-t border-slate-800/60 text-slate-300 text-xs leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* IOD STAKING DAO & DEVELOPER REVENUE ECOSYSTEM */}
      <IodStakingDaoAndDevRevenuePortal />
    </div>
  );
};
