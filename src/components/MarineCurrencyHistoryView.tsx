import React, { useState } from 'react';
import {
  History,
  Coins,
  Globe,
  Award,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileText,
  Anchor,
  Compass,
  Search,
  BookOpen
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface HistoryEra {
  id: string;
  eraYear: string;
  title: string;
  subtitle: string;
  description: string;
  keyCurrencies: string[];
  maritimeImpact: string;
  iconName: string;
}

const MARITIME_HISTORY_DATA: HistoryEra[] = [
  {
    id: 'era-1',
    eraYear: '1500 - 1800s',
    title: 'Spanish Pieces of Eight & Silver Trade Dollars',
    subtitle: 'The World’s First Global Maritime Currency Standard',
    description: 'Spanish 8 Reales silver coins minted in Mexico and Peru circulated as the universal currency of high-seas trade, accepted from Malacca to Chittagong and Boston.',
    keyCurrencies: ['Spanish 8 Reales', 'Maria Theresa Thaler', 'Dutch Lion Daalder'],
    maritimeImpact: 'Established global silver parity for spice trade and harbor dues across Indian and Atlantic oceans.',
    iconName: 'Anchor'
  },
  {
    id: 'era-2',
    eraYear: '1890 - 1930s',
    title: 'Straits Settlements Dollar & British Trade Dollars',
    subtitle: 'Colonial Maritime Trade & Spice Route Parity',
    description: 'The Straits Settlements dollar, issued by British Malaya, governed maritime tariffs across the Malacca Strait, Singapore, and Bengal ports.',
    keyCurrencies: ['Straits Dollar', 'British Trade Dollar', 'Indian Silver Rupee'],
    maritimeImpact: 'Standardized steamship coaling charges and port pilotage tariffs.',
    iconName: 'Compass'
  },
  {
    id: 'era-3',
    eraYear: '1945 - 2010s',
    title: 'Post-War Fiat & Container Clearing Scrip',
    subtitle: 'Commercial Bank Letters of Credit & Demurrage Escrow',
    description: 'Rise of paper container bills of lading, SWIFT harbor wires, and physical port clearance tokens across Asian shipping hubs.',
    keyCurrencies: ['USD Shipping Escrow', 'Port Voucher Tokens', 'Demurrage Notes'],
    maritimeImpact: 'Automated container yard gate passes, though hindered by 3-5 day banking clearance delays.',
    iconName: 'FileText'
  },
  {
    id: 'era-4',
    eraYear: '2020 - Present',
    title: 'Sovereign Ocean Dollar ($OD) & 24K Gold NFC Mintage',
    subtitle: 'The Modern Gold-Backed Sovereign Maritime Currency',
    description: 'Engineered as a 1:1 USD sovereign stable currency backed by physical 24K gold reserves and container tariff revenue, featuring tap-to-verify NTAG216 NFC coins and polymer notes.',
    keyCurrencies: ['1 $OD Gold Coin (1 oz)', '$1000 Sovereign Polymer Note', 'Digital $OD Vault Tokens'],
    maritimeImpact: 'Instant 24/7 port clearance, zero-fee seafarer payroll, and real-time Proof of Reserve auditing.',
    iconName: 'Sparkles'
  }
];

export const MarineCurrencyHistoryView: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<HistoryEra>(MARITIME_HISTORY_DATA[3]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEras = MARITIME_HISTORY_DATA.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.keyCurrencies.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div id="marine-currency-history-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              MARITIME MONETARY HERITAGE &amp; EVOLUTION
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <History className="w-8 h-8 text-cyan-400" />
            <span>Marine Currency History &amp; $OD Genesis</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Explore 500 years of high-seas trade currencies: from Spanish Pieces of Eight and Straits Settlements trade silver to the modern 24K gold-backed Ocean Dollar ($OD).
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative shrink-0 w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search currency history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 font-mono text-xs">
        {/* Left: Chronological Era Cards */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Maritime Monetary Timeline</span>
          </h3>

          <div className="space-y-4">
            {filteredEras.map((era) => {
              const isSelected = selectedEra.id === era.id;
              return (
                <div
                  key={era.id}
                  onClick={() => {
                    setSelectedEra(era);
                    hapticEngine.trigger('click');
                  }}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/40 shadow-2xl'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-3 py-0.5 rounded-full uppercase">
                      {era.eraYear}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold">ERA DETAILS →</span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white">{era.title}</h4>
                    <p className="text-amber-400 text-xs font-bold mt-0.5">{era.subtitle}</p>
                  </div>

                  <p className="text-slate-300 text-xs font-sans leading-relaxed line-clamp-2">{era.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Era Deep Dive */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border-2 border-amber-500/60 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">HISTORICAL SPECIFICATIONS</span>
              <span className="text-[10px] text-slate-400">{selectedEra.eraYear}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Era Designation</span>
                <strong className="text-white text-base block">{selectedEra.title}</strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Key Historical Currencies</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedEra.keyCurrencies.map((c, idx) => (
                    <span key={idx} className="bg-slate-950 text-amber-300 border border-slate-800 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block font-bold">High-Seas Trade Impact</span>
                <p className="text-slate-300 text-xs font-sans leading-relaxed">{selectedEra.maritimeImpact}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-300 space-y-1">
                <span className="text-[10px] font-black uppercase block">Legacy Connection to $OD</span>
                <p className="text-xs font-sans text-slate-200 leading-relaxed">
                  The Ocean Dollar ($OD) preserves 500 years of maritime monetary stability by replacing paper friction with audited 24K gold reserves &amp; instant NFC verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
