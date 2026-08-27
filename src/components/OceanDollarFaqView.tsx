import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  ShieldCheck,
  Coins,
  Globe,
  Lock,
  DollarSign,
  FileText,
  Building2,
  Anchor,
  Flame,
  Award,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface FaqItem {
  id: string;
  category: 'GENERAL' | 'GOLD_BACKING' | 'NFC_SECURITY' | 'STAKING_YIELD' | 'CUSTOMS_TRADE';
  question: string;
  answer: string;
  keyTakeaway: string;
}

const FAQ_DATABASE: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'GENERAL',
    question: 'What is the Ocean Dollar ($OD) and how is it pegged?',
    answer: 'The Ocean Dollar ($OD) is a sovereign maritime currency engineered for global port settlements, maritime trade escrow, seafarer payroll, and container tariff clearances. It maintains a strict 1:1 parity with $1.00 USD, secured by physical 24K gold bullion reserves and maritime revenue streams.',
    keyTakeaway: '1 $OD = $1.00 USD Parity backed by audited physical gold bullion & port receivables.'
  },
  {
    id: 'faq-2',
    category: 'GOLD_BACKING',
    question: 'How is physical 24K gold backing verified and audited?',
    answer: 'Every Ocean Dollar token and physical banknote is backed by 0.024g of 24K fine gold bullion stored in Swiss and Singaporean deep vaults. Real-time Proof of Reserve (PoR) cryptographic attestations are updated hourly by independent maritime auditors.',
    keyTakeaway: 'Audited 24K physical gold reserves with cryptographic Proof of Reserve (PoR).'
  },
  {
    id: 'faq-3',
    category: 'NFC_SECURITY',
    question: 'How do physical Ocean Dollar 24K Gold Coins and Polymer Notes work?',
    answer: 'Physical Ocean Dollar notes and coins feature embedded NTAG216 NFC chips encrypted with FIPS 140-2 Level 4 security keys. Tapping the coin or note against any mobile device instantly verifies mintage authenticity, serial hash, and balance status on-chain.',
    keyTakeaway: 'Tap-to-verify NFC authentication protects physical coins and notes against counterfeiting.'
  },
  {
    id: 'faq-4',
    category: 'STAKING_YIELD',
    question: 'Where do Ocean Dollar staking yields (up to 24.8% APY) originate?',
    answer: 'Staking yields are generated directly from real-world maritime economic activity: Chittagong & Singapore port container handling fees, vessel demurrage penalties, reefer cold-chain power tariffs, and maritime freight escrow interest.',
    keyTakeaway: 'Yields originate from real port container tariffs, demurrage, and maritime trade fees.'
  },
  {
    id: 'faq-5',
    category: 'CUSTOMS_TRADE',
    question: 'Can Ocean Dollars be used for customs clearance and port demurrage?',
    answer: 'Yes! Port authorities in Chittagong, Singapore, Colombo, and Dubai accept $OD for automated customs gate clearance, harbor tug dispatch, and vessel anchorage fees via QR verification.',
    keyTakeaway: 'Accepted across major South Asian and Asian commercial ports for instant gate pass clearance.'
  },
  {
    id: 'faq-6',
    category: 'NFC_SECURITY',
    question: 'What happens if a physical NFC gold coin is lost or damaged?',
    answer: 'Physical NFC gold coins feature multi-sig digital vault pairing. Owners can trigger a sovereign vault freeze, proving ownership via registered biometric seed pass, to transfer the balance to a new cold vault node.',
    keyTakeaway: 'Sovereign vault freeze capabilities protect coin owners against physical loss.'
  }
];

export const OceanDollarFaqView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    hapticEngine.trigger('click');
  };

  const filteredFaqs = FAQ_DATABASE.filter((faq) => {
    const matchesCategory = activeCategory === 'ALL' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="ocean-dollar-faq-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
            <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              SOVEREIGN CURRENCY KNOWLEDGE BASE
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <HelpCircle className="w-8 h-8 text-yellow-400" />
            <span>Ocean Dollar ($OD) Knowledge Base &amp; FAQ</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Frequently asked questions about $OD peg stability, physical 24K gold NFC verification, port acceptance, and staking yield mechanics.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative shrink-0 w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search FAQ questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-500 font-sans"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {['ALL', 'GENERAL', 'GOLD_BACKING', 'NFC_SECURITY', 'STAKING_YIELD', 'CUSTOMS_TRADE'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeCategory === cat
                ? 'bg-yellow-500 text-slate-950 border-yellow-400 font-black'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4 relative z-10 font-mono text-xs">
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900 border-yellow-500/60 shadow-2xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => handleToggleExpand(faq.id)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 flex items-center justify-center font-black shrink-0">
                    ?
                  </span>
                  <span className="text-sm font-black text-white">{faq.question}</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-yellow-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-800/80 space-y-4 font-sans leading-relaxed text-slate-300">
                  <p className="text-xs pt-3">{faq.answer}</p>

                  <div className="p-4 rounded-2xl bg-yellow-950/40 border border-yellow-500/40 font-mono text-xs flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
                    <div>
                      <strong className="text-yellow-300 block font-bold text-[10px] uppercase">Key Takeaway</strong>
                      <span className="text-white font-medium">{faq.keyTakeaway}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
