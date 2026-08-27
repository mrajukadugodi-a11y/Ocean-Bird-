import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  MapPin,
  Eye,
  Layers,
  ChevronRight,
  ChevronLeft,
  Glasses,
  ShieldCheck,
  Ship,
  DollarSign,
  Building2,
  Anchor,
  HelpCircle,
  X
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface TourHotspot {
  id: string;
  xPercent: number; // 0 - 100 on panorama
  yPercent: number; // 0 - 100
  title: string;
  badge: string;
  description: string;
  telemetryMetric?: string;
  audioNarrationText: string;
}

export interface TourScene {
  id: string;
  name: string;
  category: 'NAVIGATION' | 'GOLD_VAULT' | 'CRUISE_SUITE' | 'PORT_TERMINAL' | 'ENGINE_ROOM';
  description: string;
  bgGradient: string;
  compassHeading: number;
  hotspots: TourHotspot[];
  icon: React.ElementType;
}

const TOUR_SCENES: TourScene[] = [
  {
    id: 'bridge-deck',
    name: 'Bridge & Navigation Command Deck',
    category: 'NAVIGATION',
    description: 'Master Mariner STCW watchkeeping command center equipped with satellite ECDIS vector charts and AIS collision avoidance radar.',
    bgGradient: 'from-slate-950 via-cyan-950 to-slate-900',
    compassHeading: 340,
    icon: Ship,
    hotspots: [
      {
        id: 'hs-ecdis',
        xPercent: 28,
        yPercent: 42,
        title: 'S-57 ECDIS Vector Chart Table',
        badge: 'PRIMARY NAVIGATION',
        description: 'Real-time vector bathymetry charts displaying tidal streams and vessel AIS vectors in Malacca Strait.',
        telemetryMetric: 'Draft: 12.4m | CPA: 2.8 NM',
        audioNarrationText: 'You are viewing the primary Electronic Chart Display and Information System table configured for STCW bridge watchkeeping.'
      },
      {
        id: 'hs-helm',
        xPercent: 54,
        yPercent: 52,
        title: 'Main Steering Helm & Autopilot',
        badge: 'HELM CONTROL',
        description: 'Dual hydraulic steering actuators with adaptive gyro-heading maintenance.',
        telemetryMetric: 'Rudder Angle: 0.0° | Heading: 340°',
        audioNarrationText: 'The main steering helm is linked directly to dual hydraulic steering pumps with instant manual override.'
      },
      {
        id: 'hs-telegraph',
        xPercent: 78,
        yPercent: 48,
        title: 'Main Engine Telegraph & RPM Console',
        badge: 'PROPULSION',
        description: 'Digital electronic telegraph communicating desired engine speed to the Engine Control Room.',
        telemetryMetric: 'Engine Telegraph: Full Ahead (84 RPM)',
        audioNarrationText: 'The main engine telegraph currently indicates Full Ahead at 84 revolutions per minute.'
      }
    ]
  },
  {
    id: 'gold-vault',
    name: 'Ocean Dollar Sovereign Gold Reserve Vault',
    category: 'GOLD_VAULT',
    description: 'Fortress cold storage facility holding 100% physical 24K gold bullion stacks and HSM encrypted hardware wallet nodes.',
    bgGradient: 'from-amber-950 via-slate-950 to-stone-900',
    compassHeading: 90,
    icon: DollarSign,
    hotspots: [
      {
        id: 'hs-gold-stack',
        xPercent: 35,
        yPercent: 50,
        title: 'Physical 24K Gold Bullion Stacks',
        badge: 'CURRENCY RESERVE',
        description: 'Serialized 400 oz gold bars providing 100% physical backing for circulating Ocean Dollar ($OD) currency notes.',
        telemetryMetric: 'Reserve Total: 124,500 Oz Fine Gold',
        audioNarrationText: 'These 24K physical gold bars guarantee sovereign redeemability for all Ocean Dollar notes worldwide.'
      },
      {
        id: 'hs-hsm-node',
        xPercent: 68,
        yPercent: 38,
        title: 'HSM 256-Bit Hardware Security Node',
        badge: 'CRYPTOGRAPHIC VAULT',
        description: 'FIPS 140-2 Level 4 certified hardware security module holding multisig governor keys.',
        telemetryMetric: 'Status: HSM ACTIVE | Multisig: 3/5',
        audioNarrationText: 'The FIPS 140-2 Level 4 security module enforces multi-signature consensus for cold vault balance transfers.'
      }
    ]
  },
  {
    id: 'cruise-suite',
    name: 'Royal Ocean Suite Luxury Cruise Stateroom',
    category: 'CRUISE_SUITE',
    description: 'Top-tier luxury passenger suite featuring private wrap-around ocean balcony and smart digital stateroom automation.',
    bgGradient: 'from-slate-950 via-purple-950 to-slate-900',
    compassHeading: 180,
    icon: Anchor,
    hotspots: [
      {
        id: 'hs-balcony',
        xPercent: 22,
        yPercent: 45,
        title: 'Private Ocean Terrace & Hot Tub',
        badge: 'LUXURY AMENITY',
        description: 'Heated hydrotherapy pool overlooking open ocean waves with ambient LED lighting.',
        telemetryMetric: 'Water Temp: 38°C | Panoramic View',
        audioNarrationText: 'The private balcony hydrotherapy spa offers uninterrupted 180-degree ocean views.'
      },
      {
        id: 'hs-concierge-panel',
        xPercent: 62,
        yPercent: 55,
        title: 'Digital Passenger Concierge Touchscreen',
        badge: 'SMART ROOM',
        description: 'Order room service, book shore excursions, or adjust suite lighting and climate.',
        telemetryMetric: 'Room Temp: 21.5°C | Service: Active',
        audioNarrationText: 'Use the interactive stateroom tablet to customize lighting scenes, ambient soundscapes, or order gourmet dining.'
      }
    ]
  },
  {
    id: 'port-terminal',
    name: 'Chittagong Deepwater Container Terminal',
    category: 'PORT_TERMINAL',
    description: 'High-speed automated transshipment hub featuring AI OCR gantry cranes and cold-chain reefer monitoring.',
    bgGradient: 'from-blue-950 via-slate-950 to-cyan-950',
    compassHeading: 45,
    icon: Building2,
    hotspots: [
      {
        id: 'hs-gantry-crane',
        xPercent: 45,
        yPercent: 35,
        title: 'Automated Dual-Trolley Gantry Crane #3',
        badge: 'PORT INFRASTRUCTURE',
        description: 'Lifts up to 65 metric tons per movement with automated laser container alignment.',
        telemetryMetric: 'Throughput: 42 Moves / Hour',
        audioNarrationText: 'Gantry Crane #3 operates continuous automated container offloading with laser guidance.'
      }
    ]
  }
];

export const VirtualTourExplorerView: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [panAngle, setPanAngle] = useState<number>(0); // -180 to 180
  const [selectedHotspot, setSelectedHotspot] = useState<TourHotspot | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [vrMode, setVrMode] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const scene = TOUR_SCENES[currentSceneIndex];
  const SceneIcon = scene.icon;

  // Handle Speech Narration
  const handleSpeakNarration = (text: string) => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
    hapticEngine.trigger('click');
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const currentHeading = (scene.compassHeading + panAngle + 360) % 360;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl animate-fade-in relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              360° IMMERSIVE VIRTUAL TOUR &amp; EXPLORER
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <Compass className="w-8 h-8 text-cyan-400" />
            <span>360° Virtual Tour Explorer</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Explore interactive 360° panoramas of vessel navigation command decks, Ocean Dollar gold reserve vaults, luxury cruise suites, and deepwater container terminals.
          </p>
        </div>

        {/* Scene Navigation Selector Buttons */}
        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto max-w-full">
          {TOUR_SCENES.map((sc, idx) => {
            const Icon = sc.icon;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setCurrentSceneIndex(idx);
                  setSelectedHotspot(null);
                  setPanAngle(0);
                  hapticEngine.trigger('click');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                  currentSceneIndex === idx
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{sc.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {toastMsg && (
        <div className="bg-cyan-950 border border-cyan-500/50 text-cyan-300 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Interactive 360 Panorama Stage */}
      <div className="relative z-10 space-y-4">
        <div className={`relative overflow-hidden rounded-3xl border-2 border-slate-800 bg-gradient-to-br ${scene.bgGradient} min-h-[420px] sm:min-h-[500px] flex flex-col justify-between p-6 transition-all shadow-2xl`}>

          {/* Top HUD Bar */}
          <div className="flex justify-between items-center relative z-20">
            <div className="flex items-center space-x-3 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800">
              <SceneIcon className="w-5 h-5 text-cyan-400" />
              <div>
                <strong className="text-white text-sm block font-black">{scene.name}</strong>
                <span className="text-[10px] text-cyan-300">360° PANORAMA ACTIVE</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Heading Indicator */}
              <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-800 flex items-center space-x-2 text-xs font-mono">
                <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
                <span>HDG: <strong className="text-amber-400">{currentHeading.toFixed(0)}°</strong></span>
              </div>

              {/* VR Mode Toggle */}
              <button
                onClick={() => {
                  setVrMode(!vrMode);
                  hapticEngine.trigger('click');
                  showToast(vrMode ? 'VR Mode Deactivated' : 'VR Stereoscopic Mode Active');
                }}
                className={`px-3 py-1.5 rounded-2xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                  vrMode ? 'bg-purple-600 text-white border-purple-400 font-black' : 'bg-slate-950/80 text-slate-300 border-slate-800'
                }`}
              >
                <Glasses className="w-4 h-4" />
                <span>{vrMode ? 'VR ACTIVE' : 'VR MODE'}</span>
              </button>
            </div>
          </div>

          {/* Virtual Panorama Canvas Layer with Interactive Hotspots */}
          <div className={`relative w-full h-80 rounded-2xl border border-slate-800/80 overflow-hidden flex items-center justify-center my-4 ${vrMode ? 'grid grid-cols-2 gap-2' : ''}`}>
            {/* Simulated 360 Grid lines */}
            <div
              className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] transition-transform duration-300"
              style={{ transform: `translateX(${panAngle * 2}px)` }}
            />

            {/* Simulated Horizon Grid Line */}
            <div className="absolute w-full h-[1px] bg-cyan-500/40 top-1/2 -translate-y-1/2" />

            {/* Hotspots Render */}
            {scene.hotspots.map((hs) => {
              const adjustedX = Math.min(Math.max(hs.xPercent + (panAngle / 4), 10), 90);
              return (
                <button
                  key={hs.id}
                  onClick={() => {
                    setSelectedHotspot(hs);
                    hapticEngine.trigger('click');
                  }}
                  style={{ left: `${adjustedX}%`, top: `${hs.yPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-30"
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-7 w-7 bg-cyan-500 text-slate-950 font-black text-xs items-center justify-center border-2 border-white shadow-xl group-hover:scale-125 transition-transform">
                      ✦
                    </span>
                  </span>
                  <span className="absolute top-9 left-1/2 -translate-x-1/2 bg-slate-950/90 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold px-2 py-0.5 rounded-lg whitespace-nowrap shadow-lg">
                    {hs.title}
                  </span>
                </button>
              );
            })}

            <div className="text-center font-mono text-xs text-slate-400 pointer-events-none">
              <span className="block font-bold text-white uppercase text-sm">{scene.name}</span>
              <span className="text-[10px]">Use Pan Controls Below to Pan 360°</span>
            </div>
          </div>

          {/* Bottom Controls Bar: Rotation & Hotspots */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 relative z-20 pt-2 border-t border-slate-800/80">
            {/* Pan Left / Right Controls */}
            <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">360° Pan:</span>
              <button
                onClick={() => {
                  setPanAngle(prev => Math.max(prev - 30, -150));
                  hapticEngine.trigger('click');
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 text-xs font-bold"
              >
                ◄ Pan Left
              </button>
              <button
                onClick={() => {
                  setPanAngle(0);
                  hapticEngine.trigger('click');
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold"
              >
                Reset Center
              </button>
              <button
                onClick={() => {
                  setPanAngle(prev => Math.min(prev + 30, 150));
                  hapticEngine.trigger('click');
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 text-xs font-bold"
              >
                Pan Right ►
              </button>
            </div>

            {/* Active Scene Description */}
            <p className="text-slate-300 text-xs font-sans max-w-md text-right hidden sm:block">
              {scene.description}
            </p>
          </div>
        </div>

        {/* Selected Hotspot Detailed Modal */}
        {selectedHotspot && (
          <div className="p-6 rounded-3xl bg-slate-900 border-2 border-cyan-500 shadow-2xl space-y-4 font-mono text-xs animate-fadeIn">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  {selectedHotspot.badge}
                </span>
                <h3 className="text-lg font-black text-white mt-1">{selectedHotspot.title}</h3>
              </div>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-1 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-200 text-xs font-sans leading-relaxed">
              {selectedHotspot.description}
            </p>

            {selectedHotspot.telemetryMetric && (
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-cyan-400 font-mono font-bold text-xs flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Telemetry: {selectedHotspot.telemetryMetric}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => handleSpeakNarration(selectedHotspot.audioNarrationText)}
                className="py-2.5 px-5 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-black text-xs uppercase rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'Stop Audio' : 'Play Audio Guide'}</span>
              </button>

              <span className="text-[10px] text-slate-400">STCW Officer Verified Telemetry</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
