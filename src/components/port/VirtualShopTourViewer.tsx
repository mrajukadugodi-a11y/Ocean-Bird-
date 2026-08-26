import React, { useState } from 'react';
import {
  Compass,
  Eye,
  Camera,
  Volume2,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Tag,
  CheckCircle2,
  RotateCcw,
  Maximize2,
  Layers,
  ChevronRight,
  Info,
  DollarSign
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';
import { SHOPPING_DATA, ShoppingStore } from '../PortCommercialShoppingExhibitionView';

interface TourSpot {
  id: string;
  name: string;
  xPercent: number;
  yPercent: number;
  itemName: string;
  priceUSD: number;
  residentPriceUSD: number;
  description: string;
}

const VIEWPOINTS = [
  { id: 'ENTRANCE', label: '1. Store Entrance Foyer', angle: 0 },
  { id: 'MAIN_SHOWCASE', label: '2. Central Display Showcase', angle: 90 },
  { id: 'VIP_LOUNGE', label: '3. Luxury VIP Lounge', angle: 180 },
  { id: 'CHECKOUT_TERRACE', label: '4. Waterfront Checkout & Café', angle: 270 }
];

const MOCK_HOTSPOTS: Record<string, TourSpot[]> = {
  ENTRANCE: [
    {
      id: 'SPOT-01',
      name: 'Duty-Free Perfumes Showcase',
      xPercent: 30,
      yPercent: 45,
      itemName: 'Royal Ocean Oud Perfume (100ml)',
      priceUSD: 145,
      residentPriceUSD: 116,
      description: 'Exclusive duty-free fragrance infused with sea salt, ambergris, and coastal sandalwood.'
    },
    {
      id: 'SPOT-02',
      name: 'Swiss Chronometer Display',
      xPercent: 70,
      yPercent: 55,
      itemName: 'Nautical Diver Titanium Watch 300M',
      priceUSD: 890,
      residentPriceUSD: 712,
      description: 'Automatic COSC-certified diver chronometer with luminescent bezel and sapphire crystal.'
    }
  ],
  MAIN_SHOWCASE: [
    {
      id: 'SPOT-03',
      name: 'Handcrafted Teak Clipper Model',
      xPercent: 40,
      yPercent: 50,
      itemName: '18th Century Teak Galleon Ship Model',
      priceUSD: 320,
      residentPriceUSD: 256,
      description: 'Hand-carved by coastal master artisans using reclaimed maritime teak wood.'
    },
    {
      id: 'SPOT-04',
      name: 'High-Capacity SatCom Phone Desk',
      xPercent: 80,
      yPercent: 40,
      itemName: 'Iridium Extreme Global Satellite Phone',
      priceUSD: 1250,
      residentPriceUSD: 1125,
      description: 'Global satellite voice & emergency SOS coverage for seafarers and offshore mariners.'
    }
  ],
  VIP_LOUNGE: [
    {
      id: 'SPOT-05',
      name: 'Artisanal Pearl & Shell Jewelry',
      xPercent: 50,
      yPercent: 60,
      itemName: 'South Sea Cultured Pearl Necklace',
      priceUSD: 640,
      residentPriceUSD: 512,
      description: 'Naturally harvested coastal pearls set in 18k solid gold chain.'
    }
  ],
  CHECKOUT_TERRACE: [
    {
      id: 'SPOT-06',
      name: 'Fresh Dockside Seafood Express Counter',
      xPercent: 60,
      yPercent: 50,
      itemName: 'Vacuum-Packed Fresh Yellowfin Tuna Steak (1kg)',
      priceUSD: 38,
      residentPriceUSD: 28.5,
      description: 'Direct dockside catch packed on ice with leak-proof insulated travel cooler bag.'
    }
  ]
};

interface VirtualShopTourViewerProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const VirtualShopTourViewer: React.FC<VirtualShopTourViewerProps> = ({ triggerToast }) => {
  const [selectedStore, setSelectedStore] = useState<ShoppingStore>(SHOPPING_DATA[0]);
  const [currentViewpoint, setCurrentViewpoint] = useState<string>('ENTRANCE');
  const [activeSpot, setActiveSpot] = useState<TourSpot | null>(null);
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleRotateLeft = () => {
    setRotationDegree((prev) => prev - 45);
    hapticEngine.trigger('click');
  };

  const handleRotateRight = () => {
    setRotationDegree((prev) => prev + 45);
    hapticEngine.trigger('click');
  };

  const currentHotspots = MOCK_HOTSPOTS[currentViewpoint] || [];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Compass className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
              <h2 className="text-xl font-bold text-white">360° Interactive Virtual Shop Tour Engine</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Immersive spatial walkthrough of duty-free boutiques, coastal artisan markets, and marine technology hubs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setAmbientAudio(!ambientAudio);
                hapticEngine.trigger('click');
                notify(
                  !ambientAudio
                    ? 'Ambient Store Soundscape Activated (Ocean Waves & Soft Lounge)'
                    : 'Ambient Sound Muted',
                  'info',
                  'AUDIO SOUNDSCAPE'
                );
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                ambientAudio
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {ambientAudio ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{ambientAudio ? 'Store Audio: ON' : 'Store Audio: Muted'}</span>
            </button>
          </div>
        </div>

        {/* Store Selector Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {SHOPPING_DATA.map((shop) => (
            <button
              key={shop.id}
              onClick={() => {
                setSelectedStore(shop);
                setActiveSpot(null);
                hapticEngine.trigger('click');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedStore.id === shop.id
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {shop.name}
            </button>
          ))}
        </div>

        {/* 360 Viewport Container */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 min-h-[420px] sm:min-h-[480px] flex flex-col justify-between p-6 shadow-2xl">
          {/* Background Panorama Image with CSS Transform Rotation */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('${selectedStore.imageUrl}')`,
              transform: `scale(1.1) rotate(${rotationDegree * 0.05}deg)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
          </div>

          {/* Top HUD Controls */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-cyan-400">VIRTUAL TOUR VIEWPOINT</span>
              <h3 className="text-sm font-bold text-white">{selectedStore.name}</h3>
            </div>

            {/* Viewpoint Switcher Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {VIEWPOINTS.map((vp) => (
                <button
                  key={vp.id}
                  onClick={() => {
                    setCurrentViewpoint(vp.id);
                    setActiveSpot(null);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    currentViewpoint === vp.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {vp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Hotspots Layer */}
          <div className="relative z-10 my-auto h-64 sm:h-80">
            {currentHotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => {
                  setActiveSpot(spot);
                  hapticEngine.trigger('click');
                }}
                className="absolute group transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus:outline-none"
                style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/30 border-2 border-cyan-400 animate-ping absolute" />
                  <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black font-mono text-xs flex items-center justify-center shadow-xl border-2 border-white group-hover:bg-amber-400">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute left-10 top-0 bg-slate-950/90 text-white font-mono text-[10px] px-2.5 py-1 rounded-lg border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {spot.itemName}
                </div>
              </button>
            ))}
          </div>

          {/* Bottom HUD Rotation Controls & Hotspot Info Card */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md p-2 rounded-2xl border border-slate-800">
              <button
                onClick={handleRotateLeft}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono rounded-xl border border-slate-800 flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Rotate Left (-45°)</span>
              </button>
              <button
                onClick={handleRotateRight}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono rounded-xl border border-slate-800 flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400 transform scale-x-[-1]" />
                <span>Rotate Right (+45°)</span>
              </button>
            </div>

            {/* Selected Hotspot Details Box */}
            {activeSpot ? (
              <div className="bg-slate-950/95 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/50 max-w-md w-full space-y-2 text-xs font-mono">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-sm">{activeSpot.itemName}</h4>
                  <button
                    onClick={() => setActiveSpot(null)}
                    className="text-slate-500 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-slate-300 text-[11px]">{activeSpot.description}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                  <div className="space-x-2">
                    <span className="text-slate-400 line-through">${activeSpot.priceUSD} USD</span>
                    <span className="text-emerald-400 font-bold">${activeSpot.residentPriceUSD} USD (Resident)</span>
                  </div>
                  <button
                    onClick={() => {
                      hapticEngine.trigger('success');
                      notify(`Added ${activeSpot.itemName} to Port Shopping Cart!`, 'success', 'ADDED TO CART');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[11px]"
                  >
                    Buy Item
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-xs font-mono text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Click pulsing tags on display shelves to inspect items &amp; prices.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
