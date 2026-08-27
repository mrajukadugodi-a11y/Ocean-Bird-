import React, { useState } from 'react';
import {
  Eye,
  Maximize2,
  Sparkles,
  Sun,
  ShieldCheck,
  Layers,
  Search,
  RotateCcw,
  Coins,
  FileText,
  DollarSign,
  Radio,
  Check,
  Lock
} from 'lucide-react';
import oceanDollar1000NoteImg from '../assets/images/ocean_dollar_1000_note_1787143915335.jpg';
import oceanDollar100NoteImg from '../assets/images/ocean_dollar_banknote_1787143582965.jpg';
import oceanDollarNoteImg from '../assets/images/ocean_dollar_note_1787035621218.jpg';
import oceanDollarPhysicalImg from '../assets/images/ocean_dollar_physical_1786785193998.jpg';
import oceanDollarBarImg from '../assets/images/ocean_dollar_bar_1787036330529.jpg';
import oceanDollarCoinImg from '../assets/images/ocean_dollar_coin_1787036309582.jpg';
import { hapticEngine } from '../utils/hapticUtils';

export type VisDenomination = 'COIN_24K' | 'GOLD_BAR' | 'NOTE_100' | 'NOTE_1000';

interface NoteSpec {
  id: VisDenomination;
  name: string;
  img: string;
  type: 'COIN' | 'BAR' | 'BANKNOTE';
  backing: string;
  securityFeature: string;
  dimensions: string;
}

const VIS_CURRENCIES: NoteSpec[] = [
  {
    id: 'COIN_24K',
    name: 'Physical 24K Gold Sovereign Ocean Coin',
    img: oceanDollarCoinImg,
    type: 'COIN',
    backing: '1.00 oz Fine 999.9 Physical Gold',
    securityFeature: 'NTAG216 NFC Encrypted Chip & Laser Micro-Engraving',
    dimensions: '38.6 mm Diameter • 3.1 mm Thickness'
  },
  {
    id: 'GOLD_BAR',
    name: 'Sovereign Ocean Dollar Gold Bullion Ingot',
    img: oceanDollarBarImg,
    type: 'BAR',
    backing: '10.0 oz Fine 999.9 Vault Gold Bar',
    securityFeature: 'Assay Hologram Seal & Cryptographic NFC Vault Key',
    dimensions: '115 mm x 52 mm x 9 mm'
  },
  {
    id: 'NOTE_100',
    name: '$100 Ocean Dollar Flagship Polymer Note',
    img: oceanDollar100NoteImg,
    type: 'BANKNOTE',
    backing: '$100.00 USD Gold Bullion & Container Tariff Receivables',
    securityFeature: 'Dynamic 3D Poseidon Trident & UV Plankton Thread',
    dimensions: '156 mm x 66 mm Polymer Cotton Matrix'
  },
  {
    id: 'NOTE_1000',
    name: '$1000 Sovereign Institutional Settlement Note',
    img: oceanDollar1000NoteImg,
    type: 'BANKNOTE',
    backing: '$1000.00 USD Institutional Port Infrastructure Reserve',
    securityFeature: 'Quantum Plasma Holographic Foil & Iris Scanner Seed',
    dimensions: '160 mm x 68 mm Durasafe® Dual-Polymer Shield'
  }
];

export const CurrencyVisualizerView: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NoteSpec>(VIS_CURRENCIES[0]);
  const [inspectionMode, setInspectionMode] = useState<'STANDARD' | 'UV_LIGHT' | 'WATERMARK' | 'NFC_SCAN'>('STANDARD');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
    hapticEngine.trigger('click');
  };

  const handleModeSelect = (mode: 'STANDARD' | 'UV_LIGHT' | 'WATERMARK' | 'NFC_SCAN') => {
    setInspectionMode(mode);
    hapticEngine.trigger('click');
  };

  return (
    <div id="currency-visualizer-view" className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
            <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              HD CURRENCY INSPECTOR &amp; SECURITY LAB
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <Eye className="w-8 h-8 text-yellow-400" />
            <span>Interactive Currency Visualizer</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Inspect physical 24K gold coins, gold ingots, and polymer banknotes under UV luminescence, holographic tilt, and NFC microtext analysis.
          </p>
        </div>

        {/* Currency Selector Pills */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {VIS_CURRENCIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveItem(c);
                hapticEngine.trigger('click');
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                activeItem.id === c.id
                  ? 'bg-yellow-500 text-slate-950 border-yellow-400 font-black shadow-lg'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {c.name.split(' ')[0]} {c.name.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Inspection Control Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-xs font-bold uppercase">Inspection Lens:</span>
          {(['STANDARD', 'UV_LIGHT', 'WATERMARK', 'NFC_SCAN'] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleModeSelect(m)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase transition-all border ${
                inspectionMode === m
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {m.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleFlip}
            className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-yellow-400" />
            <span>Flip Obverse/Reverse</span>
          </button>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 font-mono text-xs">
        {/* Left: HD Render Box */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-slate-900/80 border-2 border-slate-800 relative overflow-hidden group shadow-2xl min-h-[380px]">
          {/* UV Light Overlay Effect */}
          {inspectionMode === 'UV_LIGHT' && (
            <div className="absolute inset-0 bg-purple-900/40 mix-blend-color-dodge pointer-events-none z-20 animate-pulse flex items-center justify-center">
              <span className="bg-purple-950 text-purple-300 border border-purple-500/60 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl">
                UV BIOLUMINESCENT THREAD ACTIVE
              </span>
            </div>
          )}

          {/* Watermark Overlay Effect */}
          {inspectionMode === 'WATERMARK' && (
            <div className="absolute inset-0 bg-cyan-950/40 mix-blend-overlay pointer-events-none z-20 flex items-center justify-center">
              <span className="bg-cyan-950 text-cyan-300 border border-cyan-500/60 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl">
                WATERMARK &amp; INTAGLIO EMBOSSING VISIBLE
              </span>
            </div>
          )}

          {/* NFC Scan Effect */}
          {inspectionMode === 'NFC_SCAN' && (
            <div className="absolute inset-0 bg-emerald-950/40 pointer-events-none z-20 flex items-center justify-center border-4 border-emerald-500/60 rounded-3xl">
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/60 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl animate-bounce">
                NFC NTAG216 CHIP VERIFIED ✓
              </span>
            </div>
          )}

          <div
            className={`transition-all duration-700 transform ${isFlipped ? 'rotate-y-180 scale-105' : 'scale-100'} max-w-lg w-full flex justify-center`}
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={activeItem.img}
              alt={activeItem.name}
              className="rounded-2xl border-2 border-yellow-500/50 shadow-2xl object-contain max-h-80 group-hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Right: Technical Spec Breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <span>Asset Mintage Specs</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Item Designation</span>
                <strong className="text-white text-sm block">{activeItem.name}</strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Reserve Backing Standard</span>
                <span className="text-amber-400 font-bold block">{activeItem.backing}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Primary Security Feature</span>
                <span className="text-emerald-400 font-bold block">{activeItem.securityFeature}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Physical Dimensions</span>
                <span className="text-slate-300 block">{activeItem.dimensions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
