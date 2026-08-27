import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Eye,
  Lock,
  Radio,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  FileText,
  AlertTriangle,
  RefreshCw,
  Coins,
  Sun
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface CurrencyTip {
  id: string;
  category: 'PHYSICAL_NOTE' | 'GOLD_COIN_NFC' | 'DIGITAL_VAULT' | 'PORT_AGENT_ESCROW';
  title: string;
  summary: string;
  detailedSteps: string[];
  securityLevel: 'MAXIMUM' | 'HIGH' | 'ESSENTIAL';
}

const CURRENCY_TIPS_DATA: CurrencyTip[] = [
  {
    id: 'ctip-1',
    category: 'GOLD_COIN_NFC',
    title: 'Tap-to-Verify 24K Gold Coin Authenticity',
    summary: 'Validate physical 24K gold $OD coins using NTAG216 NFC chip signature checks before accepting trade settlements.',
    detailedSteps: [
      'Bring mobile device within 2 cm of the coin obverse center.',
      'Ensure the Sovereign Ocean App returns a green "SHA-256 Validated" checkmark.',
      'Verify the coin serial number matches the Swiss vault physical certificate.'
    ],
    securityLevel: 'MAXIMUM'
  },
  {
    id: 'ctip-2',
    category: 'PHYSICAL_NOTE',
    title: 'Polymer Note UV & Intaglio Microtext Inspection',
    summary: 'Inspect $100 and $1000 Ocean Dollar polymer banknotes for 3D holographic trident threads and UV bioluminescent ink.',
    detailedSteps: [
      'Hold banknote up to light to reveal the Poseidon Trident watermark.',
      'Examine the micro-text "OCEAN DOLLAR $OD" under 10x magnification.',
      'Ensure the raised intaglio ink texture is tactile along the note borders.'
    ],
    securityLevel: 'HIGH'
  },
  {
    id: 'ctip-3',
    category: 'DIGITAL_VAULT',
    title: 'Air-Gapped Cold Storage & Multisig Clearance',
    summary: 'Protect institutional $OD reserves using 3-of-5 multisig hardware vaults with time-locked execution.',
    detailedSteps: [
      'Store private seeds in offline FIPS 140-2 Level 4 titanium capsules.',
      'Enable biometric officer sign-offs for transfers exceeding $5,000 $OD.',
      'Never copy private keys or QR seeds over unencrypted port Wi-Fi.'
    ],
    securityLevel: 'MAXIMUM'
  },
  {
    id: 'ctip-4',
    category: 'PORT_AGENT_ESCROW',
    title: 'Harbor Pilot & Demurrage Escrow Hash Lock',
    summary: 'When disbursing vessel demurrage or harbor tug fees, use cryptographic hash time-locked contracts (HTLC).',
    detailedSteps: [
      'Lock $OD in escrow until container gate receipt is digitally signed.',
      'Verify harbor agent public address before releasing funds.',
      'Maintain automated audit logs for customs tariff compliance.'
    ],
    securityLevel: 'ESSENTIAL'
  }
];

export const CurrencySecurityTipsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleToggleStep = (key: string) => {
    const next = new Set(checkedItems);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setCheckedItems(next);
    hapticEngine.trigger('click');
  };

  const filteredTips = CURRENCY_TIPS_DATA.filter(
    (t) => activeCategory === 'ALL' || t.category === activeCategory
  );

  return (
    <div id="currency-security-tips-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              CURRENCY DEFENSE &amp; ANTI-COUNTERFEIT PROTOCOL
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <ShieldAlert className="w-8 h-8 text-purple-400" />
            <span>Currency Security Tips &amp; Anti-Counterfeit Guide</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Essential procedures for verifying 24K physical gold NFC coins, inspecting polymer banknote security threads, and executing safe harbour disbursements.
          </p>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2 relative z-10 font-mono text-xs">
        {['ALL', 'GOLD_COIN_NFC', 'PHYSICAL_NOTE', 'DIGITAL_VAULT', 'PORT_AGENT_ESCROW'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeCategory === cat
                ? 'bg-purple-500 text-white border-purple-400 font-black'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tips Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-mono text-xs">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-purple-500/50 transition-all shadow-xl"
          >
            <div className="flex justify-between items-start">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                tip.securityLevel === 'MAXIMUM'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              }`}>
                {tip.securityLevel}
              </span>
              <span className="text-[10px] text-slate-500 font-bold">{tip.category}</span>
            </div>

            <div>
              <h3 className="text-base font-black text-white">{tip.title}</h3>
              <p className="text-slate-300 text-xs font-sans mt-1 leading-relaxed">{tip.summary}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Officer Verification Steps:</span>
              {tip.detailedSteps.map((step, idx) => {
                const key = `${tip.id}-${idx}`;
                const isChecked = checkedItems.has(key);

                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleStep(key)}
                    className="flex items-start space-x-2 text-xs cursor-pointer select-none group"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isChecked ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-700 bg-slate-950 group-hover:border-purple-500'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`font-sans text-[11px] leading-snug ${isChecked ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
