import React, { useState, useEffect, useRef } from 'react';
import { Search, Ship, MapPin, Users, AlertTriangle, Box, Compass, ArrowRight, X, Clock, Sparkles, Filter, Check } from 'lucide-react';
import { NavTabType } from './Navbar';
import { hapticEngine } from '../utils/hapticUtils';

export interface SearchResultItem {
  id: string;
  type: 'tab' | 'vessel' | 'port' | 'crew' | 'alert' | 'cargo';
  title: string;
  subtitle: string;
  tabTarget: NavTabType;
  badge?: string;
  badgeColor?: string;
}

const SEARCH_DATABASE: SearchResultItem[] = [
  // NAVIGATION TABS & NEW FEATURES
  { id: 's-home', type: 'tab', title: 'Home Page Command Hub', subtitle: 'Main maritime operational launchpad, live fleet metrics, climate radar & quick search', tabTarget: 'home' as NavTabType, badge: 'MAIN HUB', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
  { id: 's-maint-super', type: 'tab', title: 'Automated Maintenance, Management & Performance Super Master AI Agent', subtitle: 'AI autonomous predictive maintenance, fleet governance, parts reorder, and propulsion tuning', tabTarget: 'automated-maintenance-performance-super-agent' as NavTabType, badge: 'SUPER MASTER AI', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
  { id: 's-social', type: 'tab', title: 'Maritime Social Media Portal & Voice/Video Calls', subtitle: 'Connect with captains, engineers, & pilots via posts, messages, voice & video calls', tabTarget: 'maritime-social-portal' as NavTabType, badge: 'SOCIAL & COMMS', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
  { id: 's-ts', type: 'tab', title: 'Trouble Shooter Super Master AI Agent', subtitle: 'Chief Engineer 24/7 technical diagnostics for engines, radar, reefer, satcom, & SOLAS', tabTarget: 'troubleshooter-super-master-agent' as NavTabType, badge: 'SUPER MASTER AI', badgeColor: 'bg-amber-500/20 text-amber-300' },
  { id: 's-clean', type: 'tab', title: 'Smart Ocean Clean-Up & Plastic Telemetry', subtitle: 'AI autonomous plastic skimmers & debris heatmaps', tabTarget: 'smart-ocean-cleanup' as NavTabType, badge: 'CLEANUP', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
  { id: 's-ar', type: 'tab', title: 'Maritime AR View & Camera HUD Overlay', subtitle: 'Simulated AR HUD, AIS targets, collision vectors, depth sonar', tabTarget: 'maritime-ar-view' as NavTabType, badge: 'AR HUD', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
  { id: 's-carbon', type: 'tab', title: 'Port Carbon Gauge & Cold-Ironing Emissions', subtitle: 'IMO CII ratings, berth CO2 rate, shore power grid & air quality', tabTarget: 'port-carbon-gauge' as NavTabType, badge: 'GREEN PORT', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
  { id: 's-sync', type: 'tab', title: 'Offline Sync Alert & SatCom Buffer Hub', subtitle: 'Zero-data-loss satellite packet buffer & force flush', tabTarget: 'offline-sync-alert' as NavTabType, badge: 'SATCOM', badgeColor: 'bg-amber-500/20 text-amber-300' },
  { id: 's-pulse', type: 'tab', title: 'Vessels Health Pulse & Stethoscope ECG', subtitle: 'Real-time main engine ECG waveform, cylinder temp, & health score', tabTarget: 'vessels-health-pulse' as NavTabType, badge: 'PULSE', badgeColor: 'bg-rose-500/20 text-rose-300' },

  { id: 's-1', type: 'tab', title: 'Global Fleet Chart & Analytics', subtitle: 'View ocean distribution, CII rating, and fuel curves', tabTarget: 'global-fleet-chart' as NavTabType, badge: 'CHART', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
  { id: 's-2', type: 'tab', title: 'Smart QR Terminal Check-In & Gate Pass', subtitle: 'Biometric QR shore pass scanner & gate validation', tabTarget: 'qr-check-in' as NavTabType, badge: 'QR GATE', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
  { id: 's-3', type: 'tab', title: 'Global Fleet Map (Worldwide AIS)', subtitle: 'Real-time global vessel positions and weather radar', tabTarget: 'global-fleet-map' as NavTabType, badge: 'MAP', badgeColor: 'bg-sky-500/20 text-sky-300' },
  { id: 's-4', type: 'tab', title: 'Emergency SOS Pulse & Mayday Telemetry', subtitle: 'Direct satellite beacon alert and Coast Guard dispatch', tabTarget: 'emergency-sos-pulse' as NavTabType, badge: 'MAYDAY', badgeColor: 'bg-rose-500/20 text-rose-300' },
  { id: 's-5', type: 'tab', title: 'Smart Stowage Bay & Cargo Load Planner', subtitle: 'Container stability, TEU bay weights, & hazardous goods', tabTarget: 'smart-load-planner' as NavTabType, badge: 'STOWAGE', badgeColor: 'bg-amber-500/20 text-amber-300' },
  { id: 's-6', type: 'tab', title: 'Interactive Port Terminal GIS Map', subtitle: 'Berth allocation, crane scheduling, and draft charts', tabTarget: 'interactive-port-map' as NavTabType, badge: 'GIS', badgeColor: 'bg-teal-500/20 text-teal-300' },
  { id: 's-7', type: 'tab', title: 'AI Predictive Maintenance & Engine RUL', subtitle: 'Scavenge air temperature, vibration, and piston ring health', tabTarget: 'predictive-maintenance' as NavTabType, badge: 'AI ML', badgeColor: 'bg-indigo-500/20 text-indigo-300' },

  // VESSELS
  { id: 'v-1', type: 'vessel', title: 'MV DESH SHANTI (IMO 9821092)', subtitle: 'Oil Tanker • En Route to Mumbai High Outer Anchorage • 14.2 Knots', tabTarget: 'vessels-health-logs' as NavTabType, badge: 'TANKER', badgeColor: 'bg-amber-500/20 text-amber-300' },
  { id: 'v-2', type: 'vessel', title: 'EVER GIVEN II (IMO 9988123)', subtitle: 'ULCS Container Ship • Bay of Bengal Transit • 18.5 Knots • 20,100 TEU', tabTarget: 'global-fleet-map' as NavTabType, badge: 'CONTAINER', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
  { id: 'v-3', type: 'vessel', title: 'OCEAN BIRD COMMAND (IMO 9123847)', subtitle: 'Autonomous Research Flagship • Malacca Strait Separation Scheme', tabTarget: 'ais-tracker' as NavTabType, badge: 'FLAGSHIP', badgeColor: 'bg-emerald-500/20 text-emerald-300' },

  // PORTS
  { id: 'p-1', type: 'port', title: 'Jawaharlal Nehru Port Trust (JNPT / Nhava Sheva)', subtitle: 'Primary Container Terminal • Navi Mumbai, India • 28 Vessels Berthing', tabTarget: 'interactive-port-map' as NavTabType, badge: 'PORT', badgeColor: 'bg-sky-500/20 text-sky-300' },
  { id: 'p-2', type: 'port', title: 'Chittagong Deepwater Seaport (CGP)', subtitle: 'Bay of Bengal Logistics Hub • Bangladesh • Draft 9.5m', tabTarget: 'port-traffic' as NavTabType, badge: 'PORT', badgeColor: 'bg-sky-500/20 text-sky-300' },
  { id: 'p-3', type: 'port', title: 'Colombo Harbour Commercial Terminal', subtitle: 'Sri Lanka Main Transshipment Port • 4 Kranes Operating', tabTarget: 'port-distance' as NavTabType, badge: 'PORT', badgeColor: 'bg-sky-500/20 text-sky-300' },

  // CREW
  { id: 'c-1', type: 'crew', title: 'Capt. Ananya Sharma (Master Mariner)', subtitle: 'Commanding Officer MV DESH SHANTI • STCW Master Unlimited Cert', tabTarget: 'crew-welfare' as NavTabType, badge: 'CAPTAIN', badgeColor: 'bg-teal-500/20 text-teal-300' },
  { id: 'c-2', type: 'crew', title: 'Chief Eng. Marcus Vance (Chief Engineer)', subtitle: 'EVER GIVEN II Main Engine Technical Officer • MAN B&W 11G95ME-C9.5', tabTarget: 'crew-welfare' as NavTabType, badge: 'CHIEF ENG', badgeColor: 'bg-indigo-500/20 text-indigo-300' },

  // ALERTS & CARGO
  { id: 'a-1', type: 'alert', title: 'Cyclone Warning: Bay of Bengal Trough (Cat 3)', subtitle: 'Severe gale force winds exceeding 55 knots • High swell surge 4.5m', tabTarget: 'climate' as NavTabType, badge: 'CRITICAL', badgeColor: 'bg-rose-500/20 text-rose-300' },
  { id: 'g-1', type: 'cargo', title: 'Hazmat Class 3 Flammable Liquid Manifest', subtitle: 'Container MAEU-882190-2 • Stowage Deck 4 Bay 12', tabTarget: 'smart-load-planner' as NavTabType, badge: 'HAZMAT', badgeColor: 'bg-amber-500/20 text-amber-300' }
];

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (tabId: NavTabType) => void;
}

export const SmartSearchModal: React.FC<SmartSearchModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'tab' | 'vessel' | 'port' | 'crew' | 'alert'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredResults = SEARCH_DATABASE.filter((item) => {
    const matchesCat = categoryFilter === 'all' || item.type === categoryFilter;
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleSelect = (item: SearchResultItem) => {
    hapticEngine.trigger('click');
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches((prev) => [query.trim(), ...prev].slice(0, 5));
    }
    onSelectResult(item.tabTarget);
    onClose();
  };

  const getItemIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'vessel':
        return <Ship className="w-4 h-4 text-amber-400" />;
      case 'port':
        return <MapPin className="w-4 h-4 text-sky-400" />;
      case 'crew':
        return <Users className="w-4 h-4 text-teal-400" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'cargo':
        return <Box className="w-4 h-4 text-cyan-400" />;
      default:
        return <Compass className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-white relative">
        {/* Search Bar Input */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search vessels, ports, officers, climate alerts, or jump to tab (e.g. 'JNPT', 'Desh Shanti', 'QR Check-In')..."
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500 font-bold"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-500 hover:text-slate-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded-md border border-slate-700 font-bold">
            ESC
          </kbd>
        </div>

        {/* Filter Category Pills */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-slate-500 font-bold uppercase text-[10px] mr-1 shrink-0">Filter:</span>
          {[
            { id: 'all', label: 'All Items' },
            { id: 'tab', label: 'Navigation Tabs' },
            { id: 'vessel', label: 'Ships & Fleet' },
            { id: 'port', label: 'Ports & Docks' },
            { id: 'crew', label: 'Crew & Officers' },
            { id: 'alert', label: 'Alerts & Weather' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id as any);
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-all border ${
                categoryFilter === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center space-y-2 text-slate-500">
              <Search className="w-8 h-8 mx-auto opacity-40 text-cyan-400" />
              <p className="text-xs font-bold text-slate-400">No maritime records found matching "{query}"</p>
              <p className="text-[11px] text-slate-500">Try searching for 'Fleet', 'Tanker', 'JNPT', 'Captain', or 'QR'</p>
            </div>
          ) : (
            filteredResults.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  selectedIndex === index
                    ? 'bg-cyan-950/60 border-cyan-500/60 shadow-lg text-white'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {getItemIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs truncate text-white">{item.title}</span>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-bold uppercase ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-cyan-400 text-xs font-bold shrink-0">
                  <span className="hidden sm:inline">Jump To</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Smart Search indexing 60+ navigation tabs and global AIS records</span>
          </div>
          <button onClick={onClose} className="hover:text-slate-300">
            Press ESC to close
          </button>
        </div>
      </div>
    </div>
  );
};
