import React, { useState } from 'react';
import {
  Compass,
  Maximize2,
  Volume2,
  VolumeX,
  Building2,
  FileText,
  Calendar,
  Globe,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  DollarSign,
  Download
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface B2BBoothHotspot {
  id: string;
  boothNumber: string;
  companyName: string;
  country: string;
  category: 'GREEN_SHIPBUILDING' | 'AUTONOMOUS_DRONES' | 'HYDROGRAPHIC_SONAR' | 'PORT_AUTOMATION';
  headline: string;
  description: string;
  wholesaleStartingPrice: number;
  pdfSpecSheet: string;
  image: string;
  hotspotX: number; // percentage for hotspot pin positioning
  hotspotY: number;
}

const B2B_HOTSPOTS: B2BBoothHotspot[] = [
  {
    id: 'B2B-MDL',
    boothNumber: 'Booth B-104',
    companyName: 'Mazagon Dock Shipbuilders Ltd',
    country: 'India 🇮🇳',
    category: 'GREEN_SHIPBUILDING',
    headline: '70T Bollard Pull Electric-LNG Hybrid Tugboat Fleet',
    description: 'Zero-emission port tugboat engineered for major container harbor operations with dual fuel LNG + battery pack.',
    wholesaleStartingPrice: 4200000,
    pdfSpecSheet: 'MDL_Electric_LNG_Tugboat_Specs_2026.pdf',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    hotspotX: 28,
    hotspotY: 42
  },
  {
    id: 'B2B-SONAR',
    boothNumber: 'Booth A-42',
    companyName: 'SonarTech Hydrographic Solutions',
    country: 'Singapore 🇸🇬',
    category: 'HYDROGRAPHIC_SONAR',
    headline: 'Deep-Water Multi-Beam 3D Bathymetry Survey Drone',
    description: 'Autonomous surface vessel equipped with 400kHz multi-beam sonar for automated port channel dredging surveys.',
    wholesaleStartingPrice: 185000,
    pdfSpecSheet: 'SonarTech_3D_Bathymetry_Drone_v4.pdf',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    hotspotX: 68,
    hotspotY: 38
  },
  {
    id: 'B2B-NAV',
    boothNumber: 'Pier 2 Dock',
    companyName: 'OceanNav Robotics Global',
    country: 'Germany 🇩🇪',
    category: 'AUTONOMOUS_DRONES',
    headline: 'AI Autonomous Port Security & Patrol Hydrofoil',
    description: 'Solar-assisted 45-knot hydrofoil patrol craft featuring thermal FLIR cameras and satellite AI perimeter monitoring.',
    wholesaleStartingPrice: 650000,
    pdfSpecSheet: 'OceanNav_Hydrofoil_Patrol_B2B_Catalog.pdf',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    hotspotX: 52,
    hotspotY: 65
  }
];

interface VirtualB2BExhibitionTourProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const VirtualB2BExhibitionTour: React.FC<VirtualB2BExhibitionTourProps> = ({ triggerToast }) => {
  const [selectedPavilion, setSelectedPavilion] = useState<'HALL_1_MAIN' | 'PAVILION_GREEN_TECH' | 'PIER_2_DOCK'>('HALL_1_MAIN');
  const [activeHotspot, setActiveHotspot] = useState<B2BBoothHotspot | null>(B2B_HOTSPOTS[0]);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'INR' | 'AED'>('USD');
  const [audioAmbient, setAudioAmbient] = useState(false);
  const [showB2bRFQModal, setShowB2bRFQModal] = useState(false);
  const [rfqUnits, setRfqUnits] = useState(2);
  const [rfqNotes, setRfqNotes] = useState('');

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const formatCurrency = (valUSD: number) => {
    switch (currency) {
      case 'EUR':
        return `€${(valUSD * 0.92).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      case 'INR':
        return `₹${(valUSD * 83.5).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      case 'AED':
        return `${(valUSD * 3.67).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED`;
      default:
        return `$${valUSD.toLocaleString()}`;
    }
  };

  const handleSendB2BRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeHotspot) return;

    hapticEngine.trigger('success');
    notify(
      `Submitted B2B RFQ for ${rfqUnits}x units of ${activeHotspot.headline} to ${activeHotspot.companyName}!`,
      'success',
      'B2B PROCUREMENT QUOTE SENT'
    );
    setShowB2bRFQModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Global B2B Virtual Trade Exhibition Tour 360°</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Immersive virtual floor tour of international maritime pavilions, live B2B booth spec sheets, and wholesale RFQ quotes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Currency Selector */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {(['USD', 'EUR', 'INR', 'AED'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    currency === curr ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Audio Ambience */}
            <button
              onClick={() => {
                setAudioAmbient(!audioAmbient);
                hapticEngine.trigger('click');
              }}
              className={`p-2 rounded-xl text-xs font-mono border transition-all ${
                audioAmbient
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              {audioAmbient ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Pavilion Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'HALL_1_MAIN', label: 'Hall 1: Grand Trade Floor' },
            { id: 'PAVILION_GREEN_TECH', label: 'Pavilion B: Green Shipbuilding' },
            { id: 'PIER_2_DOCK', label: 'Pier 2: Floating Vessel Sea-Trials' }
          ].map((pav) => (
            <button
              key={pav.id}
              onClick={() => {
                setSelectedPavilion(pav.id as any);
                hapticEngine.trigger('click');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedPavilion === pav.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {pav.label}
            </button>
          ))}
        </div>

        {/* 360 Interactive Virtual Viewport */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 min-h-[360px] sm:min-h-[420px] shadow-2xl group">
          <img
            src={activeHotspot?.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'}
            alt="Virtual Exhibition Floor"
            className="w-full h-full min-h-[360px] sm:min-h-[420px] object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Hotspot Pins Overlay */}
          {B2B_HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => {
                setActiveHotspot(spot);
                hapticEngine.trigger('click');
              }}
              style={{ top: `${spot.hotspotY}%`, left: `${spot.hotspotX}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-2 shadow-2xl ${
                activeHotspot?.id === spot.id
                  ? 'bg-cyan-500 text-slate-950 border-white scale-110 z-20 font-black'
                  : 'bg-slate-950/80 text-white border-cyan-400/60 hover:scale-105 z-10'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold">{spot.boothNumber}</span>
            </button>
          ))}

          {/* Top Info HUD */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-cyan-300 font-bold">
              🌐 GLOBAL B2B VIRTUAL EXPO TOUR
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
              LIVE DELEGATES: 1,480 ONLINE
            </span>
          </div>
        </div>

        {/* Selected Booth Details & Action Card */}
        {activeHotspot && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                    {activeHotspot.boothNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{activeHotspot.country}</span>
                  <h3 className="text-base font-bold text-white">{activeHotspot.companyName}</h3>
                </div>
                <h4 className="text-sm font-bold text-cyan-400 mt-1">{activeHotspot.headline}</h4>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">STARTING WHOLESALE RFQ</span>
                <span className="text-lg font-black font-mono text-emerald-400">
                  {formatCurrency(activeHotspot.wholesaleStartingPrice)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeHotspot.description}</p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  notify(
                    `Downloaded technical spec sheet: ${activeHotspot.pdfSpecSheet}`,
                    'success',
                    'PDF DOWNLOADED'
                  );
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono flex items-center space-x-2 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download Technical PDF Specs</span>
              </button>

              <button
                onClick={() => {
                  setShowB2bRFQModal(true);
                  hapticEngine.trigger('click');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black font-mono text-xs shadow-lg hover:brightness-110 flex items-center space-x-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Private B2B RFQ Quote &amp; 1-on-1 Meeting</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* B2B Procurement RFQ Modal */}
      {showB2bRFQModal && activeHotspot && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Request Global B2B RFQ Quote</h3>
              </div>
              <button
                onClick={() => setShowB2bRFQModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <form onSubmit={handleSendB2BRFQ} className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">{activeHotspot.boothNumber} • {activeHotspot.companyName}</span>
                <p className="text-xs font-bold text-white">{activeHotspot.headline}</p>
                <span className="text-xs font-mono text-emerald-400 block font-bold">
                  Unit Base Price: {formatCurrency(activeHotspot.wholesaleStartingPrice)}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Procurement Unit Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={rfqUnits}
                  onChange={(e) => setRfqUnits(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Technical Requirements / Customization Notes</label>
                <textarea
                  value={rfqNotes}
                  onChange={(e) => setRfqNotes(e.target.value)}
                  placeholder="e.g. Requesting delivery schedule for Indian West Coast port fleet by Q1 2027..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Estimated Total Procurement Quote:</span>
                <span className="text-sm font-black text-emerald-400">
                  {formatCurrency(activeHotspot.wholesaleStartingPrice * rfqUnits)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-xs shadow-lg transition-all"
              >
                Submit Official B2B Quote Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
