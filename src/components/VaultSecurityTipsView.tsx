import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Key,
  Fingerprint,
  HardDrive,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  FileText,
  ShieldCheck,
  RefreshCw,
  Coins
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface SecurityTip {
  id: string;
  category: 'COLD_STORAGE' | 'PHYSICAL_COIN' | 'SEED_PHRASE' | 'NFC_PROTECTION' | 'CYBER_SHIELD';
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'RECOMMENDED';
  checklist: string[];
}

const SECURITY_TIPS: SecurityTip[] = [
  {
    id: 'tip-1',
    category: 'COLD_STORAGE',
    title: 'FIPS 140-2 Level 4 Hardware Cold Vault Isolation',
    description: 'Keep 80%+ of your Ocean Dollar treasury in air-gapped hardware cold vaults. Never expose cold storage private keys to internet-connected bridge terminals.',
    severity: 'CRITICAL',
    checklist: [
      'Store hardware keys in waterproof, fireproof titanium sleeves.',
      'Require 3-of-5 multisig approvals for any transfer exceeding $10,000 $OD.',
      'Regularly verify offline firmware integrity via official hash signatures.'
    ]
  },
  {
    id: 'tip-2',
    category: 'PHYSICAL_COIN',
    title: '24K Gold NFC Physical Coin Custody & Shielding',
    description: 'Physical Ocean Dollar coins contain active NTAG216 NFC chips. Protect them from unauthorized radio-frequency scanning in high-risk port areas.',
    severity: 'HIGH',
    checklist: [
      'Keep physical gold coins inside RFID-blocking Faraday leather pouches.',
      'Scan NFC chips exclusively using the verified Sovereign Ocean App.',
      'Report lost or stolen physical coins immediately for vault freeze.'
    ]
  },
  {
    id: 'tip-3',
    category: 'SEED_PHRASE',
    title: '24-Word Mnemonic Passphrase Master Preservation',
    description: 'Your 24-word recovery passphrase is the absolute key to your sovereign vault. Never store unencrypted digital copies on cloud drives or screenshots.',
    severity: 'CRITICAL',
    checklist: [
      'Stamp recovery seed words onto physical 316L stainless steel plates.',
      'Split seed words into 2 separate geographic vault safe boxes.',
      'Never reveal seed words to port agents, harbor pilots, or support chats.'
    ]
  },
  {
    id: 'tip-4',
    category: 'CYBER_SHIELD',
    title: 'Bridge Terminal ECDSA Anti-Phishing Guard',
    description: 'When logging into port terminal terminals or vessel bridge computers, verify SSL certificates and ECDSA signature hashes.',
    severity: 'RECOMMENDED',
    checklist: [
      'Verify web address matches https://ais-pre-...run.app.',
      'Enable Hardware WebAuthn YubiKey 2FA for all officer sign-ins.',
      'Use isolated browser sandboxes when accessing public harbor Wi-Fi.'
    ]
  }
];

export const VaultSecurityTipsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const handleToggleCheck = (checkKey: string) => {
    const next = new Set(completedItems);
    if (next.has(checkKey)) {
      next.delete(checkKey);
    } else {
      next.add(checkKey);
    }
    setCompletedItems(next);
    hapticEngine.trigger('click');
  };

  const filteredTips = SECURITY_TIPS.filter((tip) => activeTab === 'ALL' || tip.category === activeTab);

  return (
    <div id="vault-security-tips-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              SOVEREIGN VAULT DEFENSE PROTOCOL
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <ShieldAlert className="w-8 h-8 text-purple-400" />
            <span>Vault Security Tips &amp; Best Practices</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Essential security guidelines for cold storage vault isolation, 24K gold NFC coin protection, multisig custody, and seed phrase preservation.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {['ALL', 'COLD_STORAGE', 'PHYSICAL_COIN', 'SEED_PHRASE', 'CYBER_SHIELD'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === tab
                ? 'bg-purple-500 text-white border-purple-400 font-black'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Security Tip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-mono text-xs">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-purple-500/50 transition-all shadow-xl"
          >
            <div className="flex justify-between items-start">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                tip.severity === 'CRITICAL'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              }`}>
                {tip.severity}
              </span>
              <span className="text-[10px] text-slate-500 font-bold">{tip.category}</span>
            </div>

            <div>
              <h3 className="text-base font-black text-white">{tip.title}</h3>
              <p className="text-slate-300 text-xs font-sans mt-1 leading-relaxed">{tip.description}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Officer Checklist:</span>
              {tip.checklist.map((item, idx) => {
                const checkKey = `${tip.id}-${idx}`;
                const isChecked = completedItems.has(checkKey);

                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleCheck(checkKey)}
                    className="flex items-start space-x-2 text-xs cursor-pointer select-none group"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isChecked ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-700 bg-slate-950 group-hover:border-purple-500'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`font-sans text-[11px] leading-snug ${isChecked ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                      {item}
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
