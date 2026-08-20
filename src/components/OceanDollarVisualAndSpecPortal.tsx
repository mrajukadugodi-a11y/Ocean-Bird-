import React, { useState } from 'react';
import oceanDollar100NoteImg from '../assets/images/ocean_dollar_banknote_1787143582965.jpg';
import oceanDollar1000NoteImg from '../assets/images/ocean_dollar_1000_note_1787143915335.jpg';
import { 
  Sparkles, Download, ShieldCheck, Check, Copy, Sliders, Image as ImageIcon, 
  Layers, Award, FileText, CheckCircle2, Zap, Radio, Globe, DollarSign, Lock, 
  ExternalLink, Eye, ChevronRight, Compass, Anchor
} from 'lucide-react';

export type OdDenomination = '10' | '50' | '100' | '500' | '1000';
export type FoilAccentColor = 'HOLOGRAPHIC_SILVER' | 'GOLD_24K' | 'OCEAN_CYAN' | 'VIOLET_PLASMA';
export type WatermarkMotif = 'BLUE_WHALE' | 'LIGHTHOUSE_ANCHOR' | 'SEA_DRAGON' | 'POSEIDON_TRIDENT';

export const IOD_GALLERY_SERIES = [
  {
    denomination: '$10 OD',
    title: 'Fishermen & Coastal Heritage Commemorative',
    color: '#10b981',
    substrate: 'Polymer Cotton Hybrid',
    reserveBacking: '$10.00 USD Marine Conservation Fund',
    img: oceanDollar100NoteImg,
    badge: 'CIRCULATION NOTE'
  },
  {
    denomination: '$50 OD',
    title: 'Seafarer Navigation & Lighthouse Note',
    color: '#38bdf8',
    substrate: 'Durasafe® Dual-Polymer',
    reserveBacking: '$50.00 USD Port Navigation Tariff',
    img: oceanDollar100NoteImg,
    badge: 'CIRCULATION NOTE'
  },
  {
    denomination: '$100 OD',
    title: 'Commercial Port & Shipping Standard',
    color: '#f59e0b',
    substrate: 'High-Security Intaglio Polymer',
    reserveBacking: '$100.00 USD Gold & Port Revenues',
    img: oceanDollar100NoteImg,
    badge: 'FLAGSHIP STANDARD'
  },
  {
    denomination: '$500 OD',
    title: 'Maritime Logistics & Cargo Terminal Note',
    color: '#a855f7',
    substrate: 'Magnetic Security Thread Substrate',
    reserveBacking: '$500.00 USD Container Freight Receivables',
    img: oceanDollar1000NoteImg,
    badge: 'HIGH DENOMINATION'
  },
  {
    denomination: '$1,000 OD',
    title: 'Sovereign Gold Reserve Bullion Note',
    color: '#eab308',
    substrate: '24K Gold-Infused Polymer Matrix',
    reserveBacking: '1/4 oz Pure Physical Gold Vault Bullion',
    img: oceanDollar1000NoteImg,
    badge: 'SOVEREIGN RESERVE'
  }
];

export const OceanDollarVisualAndSpecPortal: React.FC = () => {
  // Visual Generator Tool State
  const [selectedDenom, setSelectedDenom] = useState<OdDenomination>('100');
  const [selectedFoil, setSelectedFoil] = useState<FoilAccentColor>('GOLD_24K');
  const [selectedWatermark, setSelectedWatermark] = useState<WatermarkMotif>('BLUE_WHALE');
  const [generatedSerial, setGeneratedSerial] = useState<string>('OD-2026-X892-GEN');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleGenerateCustomVisual = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newSerial = `OD-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}-GEN`;
      setGeneratedSerial(newSerial);
      setIsGenerating(false);
    }, 800);
  };

  const activeGalleryImg = selectedDenom === '1000' || selectedDenom === '500' ? oceanDollar1000NoteImg : oceanDollar100NoteImg;

  return (
    <div id="ocean-dollar-visual-spec-portal" className="space-y-8 font-mono text-white animate-fadeIn">
      {/* 1. INTERACTIVE GENERATE OD VISUAL TOOL */}
      <div className="bg-slate-950 border border-amber-500/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                CUSTOM CURRENCY DESIGNER
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span>Generate Ocean Dollar ($OD) Visual</span>
            </h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Customize denominations, foil metallic accents, holographic watermarks, and security micro-printing to generate custom Ocean Dollar banknote visual specimens.
            </p>
          </div>

          <button
            onClick={handleGenerateCustomVisual}
            disabled={isGenerating}
            className="py-2.5 px-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg transition-all flex items-center space-x-2 shrink-0 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'GENERATING SPECIMEN...' : 'GENERATE CUSTOM VISUAL'}</span>
          </button>
        </div>

        {/* DESIGN CONTROLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-xs">
          {/* CONTROLS SIDEBAR */}
          <div className="lg:col-span-5 space-y-4">
            {/* DENOMINATION SELECTOR */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">1. SELECT DENOMINATION:</span>
              <div className="flex flex-wrap gap-1.5">
                {(['10', '50', '100', '500', '1000'] as OdDenomination[]).map((denom) => (
                  <button
                    key={denom}
                    onClick={() => setSelectedDenom(denom)}
                    className={`px-3 py-1.5 rounded-lg font-black transition-all ${
                      selectedDenom === denom
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    ${denom} OD
                  </button>
                ))}
              </div>
            </div>

            {/* FOIL ACCENT SELECTOR */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">2. METALLIC FOIL ACCENT:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'GOLD_24K', label: '✨ 24K Gold Foil' },
                  { id: 'HOLOGRAPHIC_SILVER', label: '💿 Holographic Silver' },
                  { id: 'OCEAN_CYAN', label: '🌊 Ocean Cyan Sparkle' },
                  { id: 'VIOLET_PLASMA', label: '⚡ Violet Plasma UV' }
                ].map((foil) => (
                  <button
                    key={foil.id}
                    onClick={() => setSelectedFoil(foil.id as FoilAccentColor)}
                    className={`px-2.5 py-1.5 rounded-lg font-bold text-left transition-all ${
                      selectedFoil === foil.id
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {foil.label}
                  </button>
                ))}
              </div>
            </div>

            {/* WATERMARK MOTIF SELECTOR */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">3. EMBEDDED WATERMARK MOTIF:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'BLUE_WHALE', label: '🐋 Majestic Blue Whale' },
                  { id: 'LIGHTHOUSE_ANCHOR', label: '⚓ Coastal Lighthouse' },
                  { id: 'SEA_DRAGON', label: '🐉 3D Sea Dragon' },
                  { id: 'POSEIDON_TRIDENT', label: '🔱 Poseidon Trident' }
                ].map((wm) => (
                  <button
                    key={wm.id}
                    onClick={() => setSelectedWatermark(wm.id as WatermarkMotif)}
                    className={`px-2.5 py-1.5 rounded-lg font-bold text-left transition-all ${
                      selectedWatermark === wm.id
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {wm.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PREVIEW CANVAS CONTAINER */}
          <div className="lg:col-span-7 bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-3">
            <div className="relative overflow-hidden rounded-xl border border-amber-500/40 shadow-2xl group">
              <img
                src={activeGalleryImg}
                alt="Generated Custom Ocean Dollar Visual"
                className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur px-3 py-1 rounded-lg border border-amber-500/40 text-[11px] font-black text-amber-400">
                ${selectedDenom} OD CUSTOM SPECIMEN
              </div>
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur px-3 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300">
                SERIAL: <span className="text-amber-300 font-bold">{generatedSerial}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-mono">FOIL: {selectedFoil} | WATERMARK: {selectedWatermark}</span>
              <button
                onClick={() => {
                  setDownloadMsg(`✅ Custom $${selectedDenom} OD Banknote Visual Vector Package Downloaded!`);
                  setTimeout(() => setDownloadMsg(null), 4000);
                }}
                className="py-2 px-3 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD VISUAL (PNG/SVG)</span>
              </button>
            </div>

            {downloadMsg && (
              <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-2 rounded-xl text-xs font-bold animate-fadeIn">
                {downloadMsg}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. IOD (INTERNATIONAL OCEAN DOLLAR) GALLERY */}
      <div id="iod-gallery" className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">SOVEREIGN CURRENCY SERIES</span>
            <h2 className="text-2xl font-black text-white mt-1">International Ocean Dollar (IOD) Gallery</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Explore the complete physical currency series of the International Ocean Dollar ($OD) from circulation notes to sovereign gold reserve bullion notes.
            </p>
          </div>

          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-xl text-xs font-bold font-mono">
            5 BANKNOTE SPECIMENS IN SERIES
          </span>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {IOD_GALLERY_SERIES.map((item, idx) => (
            <div key={idx} className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between hover:border-amber-500/50 transition-all">
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-xl border border-slate-800">
                  <img src={item.img} alt={item.title} className="w-full h-36 object-cover rounded-xl" />
                  <span className="absolute top-2 right-2 bg-slate-950/90 text-amber-400 border border-amber-500/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <strong className="text-white text-base font-black">{item.denomination}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">{item.substrate}</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">{item.title}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="text-[10px] text-slate-400 font-mono">
                  BACKING: <span className="text-emerald-400 font-bold">{item.reserveBacking}</span>
                </div>
                <button
                  onClick={() => alert(`Viewing High-Res Specimen for ${item.denomination} ${item.title}`)}
                  className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>VIEW HIGH-RES SPECIMEN</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. OCEAN DOLLAR SPEC SHEET */}
      <div id="ocean-dollar-spec-sheet" className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">TECHNICAL SPECIFICATIONS &amp; ISO COMPLIANCE</span>
            <h2 className="text-2xl font-black text-white mt-1">Ocean Dollar ($OD) Official Spec Sheet</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Complete physical, chemical, micro-printing, and cryptographic specifications for the International Ocean Dollar currency substrate.
            </p>
          </div>

          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-bold font-mono">
            ISO-20022 CURRENCY CODE: XOD
          </span>
        </div>

        {/* SPECIFICATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">PHYSICAL DIMENSIONS</span>
            <strong className="text-white text-base font-black block">156 mm × 66 mm</strong>
            <span className="text-[10px] text-slate-500 font-sans block">Standard International Banknote Ratio</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">SUBSTRATE THICKNESS</span>
            <strong className="text-cyan-400 text-base font-black block">115 µm Dual-Polymer</strong>
            <span className="text-[10px] text-slate-500 font-sans block">Durasafe® High-Durability Shield</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">MICRO-PRINT RESOLUTION</span>
            <strong className="text-amber-400 text-base font-black block">12,000 DPI Intaglio</strong>
            <span className="text-[10px] text-slate-500 font-sans block">Guilloche Anti-Counterfeit Mesh</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase block">RESERVE BACKING RATIO</span>
            <strong className="text-emerald-400 text-base font-black block">100% Fully Backed</strong>
            <span className="text-[10px] text-slate-500 font-sans block">Gold, Carbon &amp; Tariff Receivables</span>
          </div>
        </div>

        {/* DETAILED SPEC TABLE */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs space-y-3">
          <strong className="text-amber-400 font-bold block text-sm border-b border-slate-800 pb-2">
            DETAILED SUBSTRATE &amp; SECURITY SPECIFICATION TABLE
          </strong>

          <div className="space-y-2 text-slate-300 font-sans text-xs">
            {[
              { label: 'Currency Code & ISO Standard', val: 'XOD (ISO 20022 Financial Transaction Messaging Standard)' },
              { label: 'Optical Security Thread', val: '3.5mm Color-Shifting Holographic Thread (Cyan to Gold under angle)' },
              { label: 'UV Fluorescent Pigment', val: '365 nm UV-A Glow: Bioluminescent wave pattern & Poseidon trident' },
              { label: 'Tactile Accessibility Features', val: '4 raised intaglio bars along top-left & top-right margins for visually impaired' },
              { label: 'Cryptographic Serial Verification', val: 'NFC Micro-tag embedded in note core with ECDSA-256 digital signature' },
              { label: 'Reserve Vault Composition', val: '40% Physical Gold Bullion ($400/oz), 35% Port Tariff Receivables, 25% Blue Carbon Offsets' }
            ].map((spec, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 gap-1 font-mono">
                <span className="text-slate-400 text-[11px] font-bold">{spec.label}:</span>
                <span className="text-amber-300 font-bold text-right text-[11px]">{spec.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
