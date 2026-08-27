import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Ship,
  Globe,
  Radio,
  Siren,
  Wrench,
  Bot,
  Sparkles,
  Waves,
  ShieldAlert,
  MapPin,
  QrCode,
  Box,
  Truck,
  Heart,
  Briefcase,
  Fuel,
  Gauge,
  Calendar,
  CloudSun,
  ArrowRight,
  Zap,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  ChevronRight,
  Eye,
  Anchor,
  Share2,
  Users,
  Key,
  HardDrive,
  Star,
  Plus,
  X,
  Sliders,
  Thermometer,
  Wind,
  Droplets,
  ZapOff,
  Flame,
  Check,
  Bookmark,
  Shield,
  BarChart2,
  Download,
  Copy,
  Volume2,
  VolumeX,
  FileText,
  RefreshCw,
  SlidersHorizontal,
  AlertOctagon,
  Bell,
  Image as ImageIcon,
  Maximize2,
  Wallet,
  TrendingUp,
  ShieldCheck,
  WifiOff,
  Newspaper,
  DollarSign,
  HelpCircle,
  FileCheck,
  History,
  Vote
} from 'lucide-react';
import { NavTabType } from './Navbar';
import { hapticEngine } from '../utils/hapticUtils';
import oceanBirdSunsetImg from '../assets/images/ocean_bird_sunset_1787685515840.jpg';
import oceanBirdPosterImg from '../assets/images/ocean_bird_poster_1787685532837.jpg';

export interface OceanBirdWelcomeImage {
  id: string;
  title: string;
  badge: string;
  category: 'Climate & Maritime Watch' | 'Sky & Ocean Watch' | 'Global Dashboard' | 'Maritime Operations' | 'Emergency & Seismic' | 'Satellite Telemetry' | 'Weather & Safety' | 'Cargo & Shipping' | 'Port GIS';
  description: string;
  url: string;
  tags: string[];
  tabTarget?: NavTabType;
}

export const OCEAN_BIRD_WELCOME_IMAGES: OceanBirdWelcomeImage[] = [
  {
    id: 'ob-hero-sunset',
    title: 'Ocean Bird — Sunset Flagship Cruise Liner & Coastal Lighthouse',
    badge: 'FLAGSHIP SUNSET VOYAGE',
    category: 'Climate & Maritime Watch',
    description: 'Ocean Bird flagship cruise liner navigating South Asian waters at golden sunset, accompanied by aerial airways monitoring and coastal lighthouse navigation radar.',
    url: oceanBirdSunsetImg,
    tags: ['Flagship Liner', 'Sunset Voyage', 'Lighthouse Watch', 'Airways Telemetry', 'South Asia'],
    tabTarget: 'marine-images-gallery'
  },
  {
    id: 'ob-hero-poster',
    title: 'Ocean Bird — South Asia & Global Climate, Airways & Maritime Watch',
    badge: 'OFFICIAL COMMAND POSTER',
    category: 'Sky & Ocean Watch',
    description: 'Official Ocean Bird global climate, airways, and maritime watch flagship poster with tagline "We connect the World together" and multi-domain telemetry badges.',
    url: oceanBirdPosterImg,
    tags: ['Official Poster', 'Climate Watch', 'Airways Watch', 'Maritime Watch', 'We Connect The World'],
    tabTarget: 'marine-images-gallery'
  },
  {
    id: 'ob-hero-01',
    title: 'Ocean Bird — Climate & Maritime Watch Official Hero',
    badge: 'OFFICIAL HERO BANNER',
    category: 'Climate & Maritime Watch',
    description: 'Watching the Oceans. Understanding the Climate. Securing Our Maritime Future. Real-time insights, smarter decisions, and safer seas for global maritime traffic.',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    tags: ['Weather Monitoring', 'Ocean Conditions', 'Climate Tracking', 'Maritime Traffic', 'Maritime Safety'],
    tabTarget: 'climate'
  },
  {
    id: 'ob-hero-02',
    title: 'Ocean Bird — Climate, Maritime & Airways Multi-Domain Watch',
    badge: 'MULTI-DOMAIN WATCH',
    category: 'Sky & Ocean Watch',
    description: 'Watch the Oceans. Monitor the Skies. Protect Our Planet. Integrated satellite weather monitoring connecting ocean shipping lanes with global flight airways.',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80',
    tags: ['Maritime Traffic', 'Airways Watch', 'Intelligent Alerts', 'Global Coverage', 'Safety Alerts'],
    tabTarget: 'global-fleet-map'
  },
  {
    id: 'ob-hero-03',
    title: 'Ocean Bird — Global Command Portal Dashboard Showcase',
    badge: 'COMMAND PORTAL UI',
    category: 'Global Dashboard',
    description: 'Stay Informed. Stay Ahead. Stay Connected. Unified Glassmorphism dashboard with live flight tracking, ship tracking, weather radar, and seafarer job alerts.',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80',
    tags: ['Active Flights: 3,456', 'Ships in Transit: 1,284', 'Ports Online: 563', 'Alerts Today: 178'],
    tabTarget: 'ais-tracker'
  },
  {
    id: 'ob-hero-04',
    title: 'Ocean Bird — South Asia Maritime & Cruise Liner Flagship',
    badge: 'FLAGSHIP VESSEL',
    category: 'Maritime Operations',
    description: 'To gather connect to the world. Ocean Bird flagship cruise liner navigating South Asian waters with eco-hybrid propulsion and satellite telemetry.',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=80',
    tags: ['South Asia Watch', 'Maritime Transit', 'Passenger Safety', 'Clean Seas Protocol'],
    tabTarget: 'public-citizen-portal'
  },
  {
    id: 'ob-hero-05',
    title: 'Ocean Bird — Ocean Cruise Vessel at High Seas',
    badge: 'PASSENGER LINER',
    category: 'Maritime Operations',
    description: 'Deepwater passenger liner cruising under clear blue skies with continuous environmental monitoring and real-time passenger welfare tracking.',
    url: 'https://images.unsplash.com/photo-1548574505-5e2386903b77?auto=format&fit=crop&w=1600&q=80',
    tags: ['High Seas Route', 'Passenger Comfort', 'SatCom Link', 'Acoustic Protection'],
    tabTarget: 'crew-welfare'
  },
  {
    id: 'ob-hero-06',
    title: 'Ocean Bird — All-in-One Global Platform & Tsunami/Seismic Warning',
    badge: 'EARLY WARNING RADAR',
    category: 'Emergency & Seismic',
    description: 'Your All-in-One Global Platform for a Safer, Smarter, Sustainable Future. Includes instant Tsunami Warning (Mag 7.8) and Earthquake Early Indicators.',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80',
    tags: ['Tsunami Alert Mag 7.8', 'Earthquake Alert Mag 6.9', 'Seismic Sensor Grid', 'Global Emergency Network'],
    tabTarget: 'tsunami-earthquake-warning'
  },
  {
    id: 'ob-hero-07',
    title: 'Ocean Bird — Dark Protocol Satellite AIS & Air Traffic Radar',
    badge: 'DARK MODE HUD',
    category: 'Satellite Telemetry',
    description: 'High-density dark command bridge monitor tracking global temperature (+24.8°C), sea surface temperatures, active storms, and 12,532 ships at sea.',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    tags: ['Satellite Telemetry', '12,532 Vessels', '8,746 Flights', 'Ocean Health Index: 82'],
    tabTarget: 'master-claude'
  },
  {
    id: 'ob-hero-08',
    title: 'Ocean Bird — Luxury Cruise Liner Daylight Voyage',
    badge: 'OCEAN VOYAGE',
    category: 'Maritime Operations',
    description: 'Daylight ocean transit with automated vessel collision avoidance sweeps and real-time speed/heading telemetry.',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=80',
    tags: ['Daylight Sweep', 'AIS Telemetry', 'Passenger Deck', 'Open Waters'],
    tabTarget: 'ais-tracker'
  },
  {
    id: 'ob-hero-09',
    title: 'Ocean Bird — Sunset Golden Hour Ocean Transit',
    badge: 'GOLDEN HOUR',
    category: 'Weather & Safety',
    description: 'Ocean Bird liner sailing through warm golden sunset light with real-time solar radiation, sea surface temp logging, and weather telemetry.',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80',
    tags: ['Sunset Route', 'Solar Radiation', 'Sea Surface Temp', 'Coastal Patrol'],
    tabTarget: 'climate'
  },
  {
    id: 'ob-hero-10',
    title: 'Ocean Bird — Rough Sea & Storm Navigation Mode',
    badge: 'STORM NAVIGATION',
    category: 'Weather & Safety',
    description: 'Heavy swell and storm conditions navigation with hull stress monitoring, dynamic wave height telemetry, and automated stabilizer feedback.',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    tags: ['Wave Height 4.2m', 'Storm Surge', 'Stabilizer System', 'Heavy Weather Protocol'],
    tabTarget: 'emergency-sos-pulse'
  },
  {
    id: 'ob-hero-11',
    title: 'Ocean Bird — Clear Horizon Open Water Voyage',
    badge: 'OPEN WATER',
    category: 'Maritime Operations',
    description: 'Clear weather ocean transit with optimal fuel efficiency and zero-emission auxiliary sea breeze power optimization.',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80',
    tags: ['Zero Emission Mode', 'Horizon Tracking', 'Smooth Transit', 'Clean Seas'],
    tabTarget: 'smart-fuel-optimizer'
  },
  {
    id: 'ob-hero-12',
    title: 'Ocean Bird — Commercial TEU Container Vessel in Deep Waters',
    badge: 'CARGO LOGISTICS',
    category: 'Cargo & Shipping',
    description: 'Deepwater container vessel carrying 18,000 TEU across international shipping lanes with automated load bay stowage verification.',
    url: 'https://images.unsplash.com/photo-1548574505-5e2386903b77?auto=format&fit=crop&w=1600&q=80',
    tags: ['18,000 TEU', 'Smart Cargo Stacker', 'Fuel Optimizer', 'Port ETA 06:00'],
    tabTarget: 'smart-load-planner'
  },
  {
    id: 'ob-hero-13',
    title: 'Ocean Port Commercial Hub, Duty-Free & Trade Expos',
    badge: 'PUBLIC & RESIDENT HUB',
    category: 'Maritime Operations',
    description: 'Commercial business centre, duty-free emporiums, trade exhibition halls, and waterfront dining open to general public, coastal residents & visitors.',
    url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1600&q=80',
    tags: ['Duty-Free Shopping', 'Co-Working Desks', 'Trade Expo Pass', 'Sunset Dining', 'Resident Pass'],
    tabTarget: 'port-commercial-hub'
  },
  {
    id: 'ob-hero-14',
    title: 'Ocean Bird — Harbor Pier Berth & Passenger Terminal',
    badge: 'PORT BERTH',
    category: 'Port GIS',
    description: 'Liners berthing at South Asia smart port pier terminal with automated gangway pass scanning and customs verification.',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=80',
    tags: ['Pier 4 Berth', 'Gangway Scan', 'Customs Check', 'Visitor Pass'],
    tabTarget: 'interactive-port-map'
  },
  {
    id: 'ob-hero-14-night',
    title: 'Ocean Bird — Night Navigation & Lunar Waterway Transit',
    badge: 'NIGHT NAVIGATION',
    category: 'Satellite Telemetry',
    description: 'Night vision radar navigation under moonlight with automated thermal imaging and vessel collision avoidance sweeps.',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    tags: ['Thermal HUD', 'Night Radar', 'Moonlight Track', 'Collision Warning'],
    tabTarget: 'maritime-ar-view'
  },
  {
    id: 'ob-hero-15',
    title: 'Ocean Bird — Coastal Mountain Fjord Pass Arrival',
    badge: 'FJORD ARRIVAL',
    category: 'Maritime Operations',
    description: 'Cruising through scenic coastal mountain passages with environmental acoustic protection for marine life and marine mammal radar.',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80',
    tags: ['Acoustic Protection', 'Mammal Radar', 'Scenic Pass', 'Green Port'],
    tabTarget: 'ocean-environment-library'
  }
];

interface HomePageViewProps {
  onNavigateTab: (tab: NavTabType) => void;
  onOpenSearch: () => void;
}

interface FavouriteLink {
  id: string;
  label: string;
  tab: NavTabType;
  iconName: string;
  category: string;
  badge?: string;
}

export const HomePageView: React.FC<HomePageViewProps> = ({ onNavigateTab, onOpenSearch }) => {
  const [localTime, setLocalTime] = useState<string>('');
  const [utcTime, setUtcTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [selectedClimateRegion, setSelectedClimateRegion] = useState<'BAY_OF_BENGAL' | 'ARABIAN_SEA' | 'MALACCA_STRAIT' | 'GLOBAL'>('BAY_OF_BENGAL');

  // Welcome Hero Images Showcase State (15 Images)
  const [activeHeroImageId, setActiveHeroImageId] = useState<string>('ob-hero-01');
  const [selectedIntroImage, setSelectedIntroImage] = useState<OceanBirdWelcomeImage | null>(null);
  const [welcomeCategoryFilter, setWelcomeCategoryFilter] = useState<string>('ALL');
  const [welcomeViewMode, setWelcomeViewMode] = useState<'GRID' | 'CAROUSEL'>('GRID');
  const [welcomeCarouselIndex, setWelcomeCarouselIndex] = useState<number>(0);

  // 1. Climate Risk Index (CRI) States
  const [simulatedWarming, setSimulatedWarming] = useState<number>(1.5); // +1.5°C to +3.0°C
  const [criViewMode, setCriViewMode] = useState<'OVERVIEW' | 'BREAKDOWN' | 'SIMULATOR'>('OVERVIEW');

  // 2. Adaptive Alert UI States
  const [alertFilter, setAlertFilter] = useState<'ALL' | 'EMERGENCY' | 'WEATHER' | 'SECURITY' | 'ENGINE'>('ALL');
  const [alertDisplayMode, setAlertDisplayMode] = useState<'STANDARD' | 'HIGH_CONTRAST' | 'NIGHT_PULSE'>('STANDARD');
  const [isAudioAlertMuted, setIsAudioAlertMuted] = useState(false);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);

  // 3. Quick Data Snapshot States
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false);
  const [copiedSnapshot, setCopiedSnapshot] = useState(false);
  const [snapshotTimestamp, setSnapshotTimestamp] = useState<string>('');

  // Interactive Favourite Links State
  const [favourites, setFavourites] = useState<FavouriteLink[]>([
    { id: 'fav-1', label: 'Vessels AIS Tracker', tab: 'ais-tracker', iconName: 'Ship', category: 'Navigation', badge: 'LIVE AIS' },
    { id: 'fav-2', label: 'Emergency SOS Pulse', tab: 'emergency-sos-pulse', iconName: 'Siren', category: 'Safety', badge: '24/7 MAYDAY' },
    { id: 'fav-3', label: 'Master AI Claude System', tab: 'master-claude', iconName: 'Sparkles', category: 'AI Bridge', badge: 'SUPER AI' },
    { id: 'fav-4', label: 'Climate Watch Radar', tab: 'climate', iconName: 'CloudSun', category: 'Weather', badge: 'RADAR' },
    { id: 'fav-5', label: 'Smart Load & Bay Planner', tab: 'smart-load-planner', iconName: 'Box', category: 'Port & Cargo', badge: 'STOWAGE' },
    { id: 'fav-6', label: 'Crew Welfare Portal', tab: 'crew-welfare', iconName: 'Heart', category: 'Crew', badge: 'MLC 2006' }
  ]);

  const [isAddingFavourite, setIsAddingFavourite] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString());
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hapticEngine.trigger('click');
    onOpenSearch();
  };

  const removeFavourite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    hapticEngine.trigger('click');
    setFavourites(prev => prev.filter(item => item.id !== id));
  };

  const addFavouriteLink = (newFav: Omit<FavouriteLink, 'id'>) => {
    hapticEngine.trigger('success');
    const newId = `fav-${Date.now()}`;
    setFavourites(prev => [...prev, { ...newFav, id: newId }]);
    setIsAddingFavourite(false);
  };

  // Candidate tools to add as favourite
  const candidateFavourites: Omit<FavouriteLink, 'id'>[] = [
    { label: 'Ocean Dollar Sovereign Multi-Wallets ($OD)', tab: 'ocean-dollar-wallets', iconName: 'Wallet', category: 'Sovereign Finance', badge: '$OD WALLETS' },
    { label: 'Firebase Auth Bridge & Maritime Role RBAC', tab: 'optimized-auth-flow', iconName: 'ShieldCheck', category: 'Security Auth', badge: 'AUTH RBAC' },
    { label: 'Staking ROI Charts & Pool Calculator', tab: 'staking-roi-charts', iconName: 'TrendingUp', category: 'Yield & ROI', badge: 'STAKING ROI' },
    { label: 'Offline High Seas Sync & IndexedDB Queue', tab: 'offline-sync-manager', iconName: 'WifiOff', category: 'Offline Engine', badge: 'OFFLINE SYNC' },
    { label: 'Live Global Maritime News & Security Feeds', tab: 'maritime-news-feed', iconName: 'Newspaper', category: 'Live Intelligence', badge: 'NEWS FEEDS' },
    { label: 'Ocean Dollar Knowledge Base & FAQ', tab: 'ocean-dollar-faq', iconName: 'HelpCircle', category: 'Sovereign $OD', badge: '$OD FAQ' },
    { label: 'Real-Time Asset Audit Trail & Vault Certificates', tab: 'asset-audit-trail', iconName: 'FileCheck', category: 'Audit & PoR', badge: 'AUDIT TRAIL' },
    { label: 'Interactive Currency Visualizer & Security Lab', tab: 'currency-visualizer', iconName: 'Eye', category: 'Currency Lab', badge: 'VISUALIZER' },
    { label: 'Vault Security Tips & Defense Protocol', tab: 'vault-security-tips', iconName: 'ShieldAlert', category: 'Vault Security', badge: 'SECURITY TIPS' },
    { label: 'Currency Export Tool & Report Generator', tab: 'currency-export-tool', iconName: 'Download', category: 'Export & Report', badge: 'EXPORT TOOL' },
    { label: 'Ocean Dollar Staking & Gold Yield Vaults', tab: 'ocean-dollar-staking', iconName: 'TrendingUp', category: '$OD Staking', badge: 'STAKING V2' },
    { label: 'Marine Currency History & Evolution', tab: 'marine-currency-history', iconName: 'History', category: 'History & Heritage', badge: 'HERITAGE' },
    { label: 'Currency Security Tips & Anti-Counterfeit Protocol', tab: 'currency-security-tips', iconName: 'ShieldAlert', category: 'Currency Security', badge: 'SECURITY TIPS' },
    { label: 'Ocean Dollar DAO Governance Portal', tab: 'ocean-dollar-dao-governance', iconName: 'Vote', category: 'DAO Governance', badge: 'GOVERNANCE' },
    { label: 'Ocean Mining & Offshore Engineering Studies', tab: 'ocean-mining-engineering', iconName: 'Pickaxe', category: 'Mining & Eng', badge: 'MINING STUDIES' },
    { label: 'Ocean Environment Research Library', tab: 'ocean-environment-library', iconName: 'BookOpen', category: 'Archive', badge: 'RESEARCH' },
    { label: 'Global Ocean Plastic & Microplastic Radar', tab: 'ocean-plastic-radar', iconName: 'Waves', category: 'Satellite Radar', badge: 'PLASTIC RADAR' },
    { label: 'Vessels Efficiency & Power Curve Chart', tab: 'vessels-efficiency-chart', iconName: 'Gauge', category: 'FOC & CII', badge: 'EFFICIENCY' },
    { label: 'Super Master Dark Web & Virus Shield', tab: 'super-master-dark-web-cyber-shield', iconName: 'ShieldAlert', category: 'Cyber AI', badge: 'DARK WEB AI' },
    { label: 'Interactive Port Map GIS', tab: 'interactive-port-map', iconName: 'MapPin', category: 'Port GIS', badge: 'GIS' },
    { label: 'Smart Fuel Optimizer', tab: 'smart-fuel-optimizer', iconName: 'Fuel', category: 'Engine', badge: 'CII' },
    { label: 'Global Job Alerts', tab: 'global-job-alerts', iconName: 'Briefcase', category: 'Seafarers', badge: 'JOBS' },
    { label: 'Tsunami & Earthquake Warning', tab: 'tsunami-earthquake-warning', iconName: 'Waves', category: 'Safety', badge: 'TSUNAMI' },
    { label: 'Troubleshooter AI Agent', tab: 'troubleshooter-super-master-agent', iconName: 'Wrench', category: 'AI Bridge', badge: 'AI AGENT' },
    { label: 'Medical Hub & Vaccination Portal', tab: 'medical-hub', iconName: 'Stethoscope', category: 'Health & Medical', badge: 'MEDICAL' },
    { label: 'Maritime AR View HUD', tab: 'maritime-ar-view', iconName: 'Eye', category: 'HUD', badge: 'AR' }
  ];

  // Climate Statistics Regional Telemetry Map
  const climateTelemetryMap = {
    BAY_OF_BENGAL: {
      status: 'CRITICAL STORM ALERT',
      statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      sst: '30.8 °C',
      sAnom: '+1.85 °C',
      ohc: '118 kJ/cm²',
      cyclones: '1 Active (Cat 3)',
      waveHeight: '4.8 m',
      pressure: '984 hPa',
      co2: '424 ppm',
      seaLevelRise: '+4.2 mm/yr'
    },
    ARABIAN_SEA: {
      status: 'MONSOON SWELL WARNING',
      statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      sst: '29.2 °C',
      sAnom: '+1.20 °C',
      ohc: '92 kJ/cm²',
      cyclones: '0 Active',
      waveHeight: '3.4 m',
      pressure: '1004 hPa',
      co2: '424 ppm',
      seaLevelRise: '+3.8 mm/yr'
    },
    MALACCA_STRAIT: {
      status: 'MODERATE SQUALLS',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      sst: '29.8 °C',
      sAnom: '+0.95 °C',
      ohc: '85 kJ/cm²',
      cyclones: '0 Active',
      waveHeight: '1.6 m',
      pressure: '1009 hPa',
      co2: '424 ppm',
      seaLevelRise: '+3.5 mm/yr'
    },
    GLOBAL: {
      status: 'GLOBAL WATCH HIGH RISK',
      statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      sst: '21.1 °C (Mean)',
      sAnom: '+1.42 °C',
      ohc: '104 kJ/cm²',
      cyclones: '4 Active Globally',
      waveHeight: '2.8 m Avg',
      pressure: '1013 hPa',
      co2: '424.1 ppm',
      seaLevelRise: '+3.9 mm/yr'
    }
  };

  const currentClimate = climateTelemetryMap[selectedClimateRegion];

  // Regional Climate Risk Index Datasets
  const regionalClimateRiskMap = {
    BAY_OF_BENGAL: {
      criScore: Math.min(98, Math.round(84 + (simulatedWarming - 1.5) * 8)),
      level: 'CRITICAL SEVERE RISK',
      color: 'text-rose-400 bg-rose-500/20 border-rose-500/40',
      gaugeGradient: 'from-amber-500 via-rose-500 to-red-600',
      sstAnomaly: '+1.85 °C',
      waveSeverityScore: 88,
      cycloneRiskScore: 92,
      portInundationScore: 78,
      ciiPenaltyRiskScore: 82,
      advisory: 'Cat 3 Cyclone Mocha II track crossing Chittagong approaches. Surge +4.5m.',
      recommendedSpeed: 'Reduce by 4.5 knots or reroute via Andaman Channel.'
    },
    ARABIAN_SEA: {
      criScore: Math.min(95, Math.round(58 + (simulatedWarming - 1.5) * 7)),
      level: 'ELEVATED RISK',
      color: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
      gaugeGradient: 'from-teal-500 via-amber-500 to-rose-500',
      sstAnomaly: '+1.20 °C',
      waveSeverityScore: 54,
      cycloneRiskScore: 60,
      portInundationScore: 48,
      ciiPenaltyRiskScore: 62,
      advisory: 'South-West Monsoon swell active near Socotra & Lakshadweep Sea.',
      recommendedSpeed: 'Maintain 12.5 knots with wave-heading autopilot tuning.'
    },
    MALACCA_STRAIT: {
      criScore: Math.min(90, Math.round(36 + (simulatedWarming - 1.5) * 6)),
      level: 'MODERATE RISK',
      color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
      gaugeGradient: 'from-emerald-500 via-teal-500 to-amber-500',
      sstAnomaly: '+0.95 °C',
      waveSeverityScore: 30,
      cycloneRiskScore: 25,
      portInundationScore: 42,
      ciiPenaltyRiskScore: 45,
      advisory: 'Sumatra squalls expected during late night transit. Visibility 3.5 NM.',
      recommendedSpeed: 'Normal transit speed. Maintain extra lookouts.'
    },
    GLOBAL: {
      criScore: Math.min(95, Math.round(65 + (simulatedWarming - 1.5) * 7.5)),
      level: 'GLOBAL WATCH HIGH RISK',
      color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40',
      gaugeGradient: 'from-cyan-500 via-amber-500 to-rose-500',
      sstAnomaly: '+1.42 °C',
      waveSeverityScore: 68,
      cycloneRiskScore: 71,
      portInundationScore: 60,
      ciiPenaltyRiskScore: 66,
      advisory: 'Global ocean surface warming driving +12% increase in tropical storm intensity.',
      recommendedSpeed: 'Implement AI VPO (Vessel Path Optimizer) for all ocean voyages.'
    }
  };

  const currentCRI = regionalClimateRiskMap[selectedClimateRegion];

  // Adaptive Alerts Dataset
  const rawAdaptiveAlerts = [
    {
      id: 'alt-101',
      category: 'EMERGENCY',
      title: 'MAYDAY DISTRESS DISPATCH — MV SEA WARRIOR',
      location: 'Lat 14.22° N, Long 88.45° E (Bay of Bengal)',
      message: 'Engine room flooding following steering gear failure in gale sea state 7.',
      timestamp: '08:14 UTC',
      level: 'CRITICAL MAYDAY',
      levelColor: 'bg-rose-500 text-slate-950 border-rose-400 animate-pulse',
      tab: 'emergency-sos-pulse' as NavTabType
    },
    {
      id: 'alt-102',
      category: 'WEATHER',
      title: 'SUPER CYCLONE GALE FORCE WARNING — CAT 3',
      location: 'Kolkata & Chittagong Port Approaches',
      message: 'Sustained winds 65 knots, gusts 80 knots. Deep water anchorage required.',
      timestamp: '08:02 UTC',
      level: 'SEVERE WEATHER',
      levelColor: 'bg-rose-950 text-rose-300 border-rose-500/50',
      tab: 'climate' as NavTabType
    },
    {
      id: 'alt-103',
      category: 'SECURITY',
      title: 'PIRACY & ARMED ROBBERY HIGH-RISK ZONE',
      location: 'Gulf of Aden / Bab-el-Mandeb Strait',
      message: 'Unflagged skiffs approaching container vessels at 22 knots. Citadel drill active.',
      timestamp: '07:45 UTC',
      level: 'PIRACY ADVISORY',
      levelColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      tab: 'piracy-alert' as NavTabType
    },
    {
      id: 'alt-104',
      category: 'ENGINE',
      title: 'MAIN ENGINE CYLINDER #4 THERMAL ANOMALY',
      location: 'Onboard MV DESH SHANTI (Exhaust Temp 485°C)',
      message: 'Exhaust temperature elevated above safety threshold. AI Engineer recommends fuel rack trim.',
      timestamp: '07:20 UTC',
      level: 'ENGINE DIAGNOSTIC',
      levelColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      tab: 'troubleshooter-super-master-agent' as NavTabType
    }
  ];

  const filteredAlerts = rawAdaptiveAlerts.filter(a => alertFilter === 'ALL' || a.category === alertFilter);

  const toggleAcknowledgeAlert = (id: string) => {
    hapticEngine.trigger('click');
    setAcknowledgedAlerts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleTakeSnapshot = () => {
    hapticEngine.trigger('success');
    const now = new Date();
    setSnapshotTimestamp(now.toUTCString());
    setIsSnapshotModalOpen(true);
  };

  const snapshotDataFormatted = `
=== OCEAN BIRD MARITIME BRIDGE SNAPSHOT ===
Timestamp: ${snapshotTimestamp || new Date().toUTCString()}
Bridge Status: OPERATIONAL • SATELLITE LINK ACTIVE (INMARSAT-C)
------------------------------------------------
• Active Tracked Vessels: 1,248 Vessels (AIS Satellite)
• Regional Focus: ${selectedClimateRegion.replace(/_/g, ' ')}
• Climate Risk Index (CRI): ${currentCRI.criScore}/100 [${currentCRI.level}]
• Sea Surface Temp Anomaly: ${currentCRI.sstAnomaly}
• Active SOLAS Alerts: ${rawAdaptiveAlerts.length} Alerts (${acknowledgedAlerts.length} Acknowledged)
• Active Mayday Status: 1 Active Emergency Dispatch
• Fleet CII Carbon Compliance Rate: 94.2% (IMO 2030 Grade A)
• Port Terminal Status: JNPT / Chittagong / Colombo Operating Normally
------------------------------------------------
Generated by Ocean Bird Autonomous Command Hub
`.trim();

  const handleCopySnapshot = () => {
    navigator.clipboard.writeText(snapshotDataFormatted);
    hapticEngine.trigger('success');
    setCopiedSnapshot(true);
    setTimeout(() => setCopiedSnapshot(false), 3000);
  };

  const mainCategoryCards = [
    {
      title: 'Navigation & Fleet Radar',
      description: 'Real-time global vessel tracking, AIS positioning, live route radar, and ECDIS nautical charts.',
      icon: Ship,
      color: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/40 text-cyan-300',
      badge: 'LIVE AIS',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      links: [
        { label: 'Global Fleet Map', tab: 'global-fleet-map' as NavTabType, icon: Globe },
        { label: 'Vessels AIS Tracker', tab: 'ais-tracker' as NavTabType, icon: Ship },
        { label: 'Route Radar & AIS', tab: 'route-radar' as NavTabType, icon: Radio },
        { label: 'Nautical Chart View', tab: 'nautical-chart' as NavTabType, icon: Compass },
        { label: 'Maritime AR View HUD', tab: 'maritime-ar-view' as NavTabType, icon: Eye }
      ]
    },
    {
      title: 'Safety, SOS & Climate Shield',
      description: '24x7 Coast Guard Mayday dispatch, tsunami early warning, piracy alerts, and weather radar.',
      icon: Siren,
      color: 'from-rose-500/20 to-amber-500/20 border-rose-500/40 text-rose-300',
      badge: '24x7 MAYDAY',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      links: [
        { label: 'Emergency SOS Pulse', tab: 'emergency-sos-pulse' as NavTabType, icon: Siren },
        { label: 'Tsunami & Earthquake Warning', tab: 'tsunami-earthquake-warning' as NavTabType, icon: Waves },
        { label: 'Climate Watch Radar', tab: 'climate' as NavTabType, icon: CloudSun },
        { label: 'Piracy Alert Center', tab: 'piracy-alert' as NavTabType, icon: ShieldAlert },
        { label: 'Collision Avoidance', tab: 'collision-avoidance' as NavTabType, icon: Zap }
      ]
    },
    {
      title: 'Autonomous AI Bridge Agents',
      description: 'AI Chief Engineer diagnostics, predictive maintenance, voice command engine, and Claude orchestrator.',
      icon: Bot,
      color: 'from-indigo-500/20 to-cyan-500/20 border-indigo-500/40 text-indigo-300',
      badge: 'SUPER MASTER AI',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      links: [
        { label: 'Master Claude System', tab: 'master-claude' as NavTabType, icon: Sparkles },
        { label: 'Maintenance Super Agent', tab: 'automated-maintenance-performance-super-agent' as NavTabType, icon: Bot },
        { label: 'Troubleshooter AI Agent', tab: 'troubleshooter-super-master-agent' as NavTabType, icon: Wrench },
        { label: 'Predictive Maintenance', tab: 'predictive-maintenance' as NavTabType, icon: Activity },
        { label: 'Voice Commands Engine', tab: 'voice-activated-command' as NavTabType, icon: Radio }
      ]
    },
    {
      title: 'Port Terminals & Supply Chain',
      description: 'Smart load bay planner, terminal GIS maps, QR gate check-in, and TEU supply chain analytics.',
      icon: Truck,
      color: 'from-amber-500/20 to-emerald-500/20 border-amber-500/40 text-amber-300',
      badge: 'TEU & STOWAGE',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      links: [
        { label: 'Smart Load & Bay Planner', tab: 'smart-load-planner' as NavTabType, icon: Box },
        { label: 'Interactive Port Map GIS', tab: 'interactive-port-map' as NavTabType, icon: MapPin },
        { label: 'QR Gate Check-In', tab: 'qr-check-in' as NavTabType, icon: QrCode },
        { label: 'Smart Supply Chain', tab: 'smart-supply-chain' as NavTabType, icon: Truck },
        { label: 'Port Traffic Forecast', tab: 'port-traffic' as NavTabType, icon: Calendar }
      ]
    },
    {
      title: 'Seafarers, Crew & Career Hub',
      description: 'Crew welfare management, maritime job alerts, e-Visa portal, and social video communications.',
      icon: Users,
      color: 'from-teal-500/20 to-cyan-500/20 border-teal-500/40 text-teal-300',
      badge: 'MLC 2006',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      links: [
        { label: 'Crew Welfare Portal', tab: 'crew-welfare' as NavTabType, icon: Heart },
        { label: 'Maritime Social Portal', tab: 'maritime-social-portal' as NavTabType, icon: Share2 },
        { label: 'Global Job Alerts', tab: 'global-job-alerts' as NavTabType, icon: Briefcase },
        { label: 'Online e-Visa Portal', tab: 'online-visa-application' as NavTabType, icon: Key },
        { label: 'Jobs & Training Academy', tab: 'jobs-training' as NavTabType, icon: Users }
      ]
    },
    {
      title: 'Sustainability & Fleet Utilities',
      description: 'Fuel optimization, CII ratings, port carbon gauge, ocean cleanup, and offline backup tools.',
      icon: Fuel,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
      badge: 'IMO CII / IMO 2030',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      links: [
        { label: 'Smart Fuel Optimizer', tab: 'smart-fuel-optimizer' as NavTabType, icon: Fuel },
        { label: 'Port Carbon Gauge', tab: 'port-carbon-gauge' as NavTabType, icon: Gauge },
        { label: 'Smart Ocean Clean-Up', tab: 'smart-ocean-cleanup' as NavTabType, icon: Waves },
        { label: 'Automated Backup Manager', tab: 'automated-backup' as NavTabType, icon: HardDrive },
        { label: 'Voyage Carbon Offset', tab: 'voyage-carbon-offset' as NavTabType, icon: Sparkles }
      ]
    },
    {
      title: 'Sovereign Ocean Dollar, Auth & Offline Suite',
      description: 'Interactive $OD multi-wallets, 24K physical gold backing, staking ROI charts, Firebase Auth RBAC, offline sync, and maritime news.',
      icon: DollarSign,
      color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300',
      badge: 'SOVEREIGN $OD & AUTH',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      links: [
        { label: 'Ocean Dollar Multi-Wallets', tab: 'ocean-dollar-wallets' as NavTabType, icon: Wallet },
        { label: 'Firebase Auth Bridge & RBAC', tab: 'optimized-auth-flow' as NavTabType, icon: ShieldCheck },
        { label: 'Staking ROI & Yield Pools', tab: 'staking-roi-charts' as NavTabType, icon: TrendingUp },
        { label: 'Offline High Seas Sync', tab: 'offline-sync-manager' as NavTabType, icon: WifiOff },
        { label: 'Live Maritime News Feeds', tab: 'maritime-news-feed' as NavTabType, icon: Newspaper },
        { label: 'Ocean Dollar FAQ & KB', tab: 'ocean-dollar-faq' as NavTabType, icon: HelpCircle },
        { label: 'Asset Audit Trail & PoR', tab: 'asset-audit-trail' as NavTabType, icon: FileCheck },
        { label: 'HD Currency Visualizer', tab: 'currency-visualizer' as NavTabType, icon: Eye },
        { label: 'Vault Security Protocol', tab: 'vault-security-tips' as NavTabType, icon: ShieldAlert },
        { label: 'Currency Export Tool', tab: 'currency-export-tool' as NavTabType, icon: Download },
        { label: 'Ocean Dollar Staking Vaults', tab: 'ocean-dollar-staking' as NavTabType, icon: TrendingUp },
        { label: 'Marine Currency History', tab: 'marine-currency-history' as NavTabType, icon: History },
        { label: 'Currency Security Tips', tab: 'currency-security-tips' as NavTabType, icon: ShieldAlert },
        { label: 'Ocean Dollar DAO Governance', tab: 'ocean-dollar-dao-governance' as NavTabType, icon: Vote }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn font-mono text-white">
      {/* ======================================================== */}
      {/* 1. WELCOME BANNER (DIRECT USER FEATURE)                  */}
      {/* ======================================================== */}
      {showWelcomeBanner && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 p-5 sm:p-6 shadow-2xl transition-all">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shrink-0 shadow-lg">
                <Compass className="w-7 h-7 text-cyan-300 animate-spin-slow" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-black uppercase">
                    OFFICER ON BRIDGE
                  </span>
                  <span className="text-xs text-slate-400 font-bold">
                    Watch Duty: 0800 - 1200 hrs
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  Welcome aboard, Captain / Bridge Officer! 👋
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  Ocean Bird Command Portal initialized. All 60+ bridge modules, AIS satellite telemetry, AI Chief Engineer diagnostics, and Coast Guard Mayday channels are active.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  onNavigateTab('ais-tracker');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center space-x-1.5"
              >
                <Ship className="w-3.5 h-3.5 text-slate-950" />
                <span>My Vessel Tracker</span>
              </button>
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setShowWelcomeBanner(false);
                }}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Dismiss Banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. HERO COMMAND HUB HEADER & PROMINENT SEARCH BAR        */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-900 to-slate-950">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Status Badges Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                BRIDGE COMMAND SYSTEM OPERATIONAL • ONLINE
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-bold">
              <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-300">{utcTime || 'UTC Live'}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>SatCom Signal: 99% (Inmarsat-C)</span>
              </div>
            </div>
          </div>

          {/* Hero Welcome Title */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>OCEAN BIRD MARITIME & SEAFARER PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              Maritime Operational Command Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Unified South Asia & Indo-Pacific bridge suite for vessel navigation, AI engine diagnostics, port terminal GIS, weather radar, seafarer welfare, and 24x7 emergency response.
            </p>
          </div>

          {/* ======================================================== */}
          {/* PROMINENT SEARCH BAR & SEARCH BUTTON                     */}
          {/* ======================================================== */}
          <div className="pt-2">
            <form onSubmit={handleSearchSubmit} className="relative max-w-3xl">
              <div className="relative flex items-center bg-slate-950 border-2 border-cyan-500/50 hover:border-cyan-400 focus-within:border-cyan-300 rounded-2xl p-2 shadow-2xl transition-all group">
                <Search className="w-6 h-6 text-cyan-400 ml-3 shrink-0 group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => {
                    hapticEngine.trigger('click');
                    onOpenSearch();
                  }}
                  placeholder="Search vessels (e.g. 'MV DESH SHANTI'), ports ('JNPT'), alerts, crew, or jump to tab..."
                  className="w-full bg-transparent text-white placeholder-slate-500 text-sm font-bold px-4 focus:outline-none cursor-pointer"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => {
                    hapticEngine.trigger('click');
                    onOpenSearch();
                  }}
                  className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center space-x-2 shrink-0 transition-all hover:scale-105 active:scale-95"
                >
                  <Search className="w-4 h-4 text-slate-950" />
                  <span>SEARCH DATABASE</span>
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-slate-950 text-cyan-300 rounded border border-cyan-400/40">
                    ⌘K
                  </kbd>
                </button>
              </div>

              {/* Fast Tag Suggestions */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                <span className="text-slate-500 font-bold text-[11px] uppercase">Quick Search:</span>
                {[
                  { label: '📷 Upload Marine Images', tab: 'public-citizen-portal' as NavTabType },
                  { label: '⚒️ Ocean Mining Studies', tab: 'ocean-mining-engineering' as NavTabType },
                  { label: '🚢 Vessels AIS Proximity Radar', tab: 'ais-tracker' as NavTabType },
                  { label: '🚨 Global Emergency Map', tab: 'emergency-sos-pulse' as NavTabType },
                  { label: '📄 Auto PDF Exporter', tab: 'public-citizen-portal' as NavTabType },
                  { label: '🤖 AI Master', tab: 'master-claude' as NavTabType },
                  { label: '💼 Job Alerts', tab: 'global-job-alerts' as NavTabType }
                ].map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      hapticEngine.trigger('click');
                      onNavigateTab(tag.tab);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] font-bold transition-all"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2B. OCEAN BIRD WELCOME & PLATFORM SHOWCASE GALLERY      */}
      {/* ======================================================== */}
      <div className="bg-slate-900/90 rounded-3xl border border-cyan-500/30 p-6 space-y-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/20 text-cyan-300 rounded-2xl border border-cyan-500/30">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-black text-white font-sans">Ocean Bird Welcome &amp; Platform Introduction Gallery</h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  15 GRAPHICS LOADED
                </span>
              </div>
              <p className="text-xs text-slate-400">Explore official Ocean Bird platform welcome visuals, climate watch banners, and maritime command center artwork.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setWelcomeViewMode(welcomeViewMode === 'GRID' ? 'CAROUSEL' : 'GRID')}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-cyan-300 hover:border-cyan-500/50 transition-all flex items-center space-x-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>{welcomeViewMode === 'GRID' ? 'Switch to Spotlight' : 'Show All 15 Grid'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          {['ALL', 'Climate & Maritime Watch', 'Sky & Ocean Watch', 'Global Dashboard', 'Maritime Operations', 'Emergency & Seismic', 'Satellite Telemetry', 'Cargo & Shipping', 'Port GIS'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                hapticEngine.trigger('click');
                setWelcomeCategoryFilter(cat);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap transition-all ${
                welcomeCategoryFilter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? '🌟 All 15 Welcome Graphics' : cat}
            </button>
          ))}
        </div>

        {/* Welcome Images Content Display */}
        {welcomeViewMode === 'GRID' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OCEAN_BIRD_WELCOME_IMAGES
              .filter((img) => welcomeCategoryFilter === 'ALL' || img.category === welcomeCategoryFilter)
              .map((item) => {
                const isActive = activeHeroImageId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`bg-slate-950 rounded-2xl border transition-all overflow-hidden group space-y-3 flex flex-col justify-between p-3 ${
                      isActive ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        <span className="bg-cyan-500/90 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded shadow">
                          {item.badge}
                        </span>
                        {isActive && (
                          <span className="bg-emerald-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded shadow animate-pulse">
                            ACTIVE HERO THEME
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          hapticEngine.trigger('click');
                          setSelectedIntroImage(item);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors border border-slate-700"
                        title="Expand Image Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-xs font-black text-white drop-shadow truncate">{item.title}</h4>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-normal px-1">{item.description}</p>

                    <div className="flex flex-wrap gap-1 px-1">
                      {item.tags.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="bg-slate-900 text-cyan-300 text-[9px] font-mono px-2 py-0.5 rounded border border-slate-800">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          hapticEngine.trigger('click');
                          setSelectedIntroImage(item);
                        }}
                        className="flex-1 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-mono font-bold border border-slate-800 transition-colors text-center"
                      >
                        Inspect Full Size
                      </button>

                      {item.tabTarget && (
                        <button
                          onClick={() => {
                            hapticEngine.trigger('click');
                            onNavigateTab(item.tabTarget!);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-[10px] font-mono font-bold border border-cyan-500/30 transition-all flex items-center space-x-1"
                        >
                          <span>Open Module</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          /* Spotlight Carousel View */
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 relative overflow-hidden">
            {(() => {
              const currentImg = OCEAN_BIRD_WELCOME_IMAGES[welcomeCarouselIndex % OCEAN_BIRD_WELCOME_IMAGES.length];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
                    <img
                      src={currentImg.url}
                      alt={currentImg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-cyan-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg">
                      {currentImg.badge}
                    </span>
                    <button
                      onClick={() => setSelectedIntroImage(currentImg)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/90 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40 flex items-center space-x-1.5 shadow-lg"
                    >
                      <Maximize2 className="w-4 h-4 text-cyan-400" />
                      <span>Expand Lightbox</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                        WELCOME GRAPHIC {welcomeCarouselIndex + 1} OF {OCEAN_BIRD_WELCOME_IMAGES.length}
                      </span>
                      <h3 className="text-xl font-black text-white font-sans">{currentImg.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{currentImg.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {currentImg.tags.map((tag, idx) => (
                        <span key={idx} className="bg-slate-900 text-cyan-300 text-xs font-mono px-2.5 py-1 rounded-lg border border-slate-800">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-3 pt-4">
                      <button
                        onClick={() => {
                          setWelcomeCarouselIndex((prev) => (prev > 0 ? prev - 1 : OCEAN_BIRD_WELCOME_IMAGES.length - 1));
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-800"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={() => {
                          setWelcomeCarouselIndex((prev) => (prev + 1) % OCEAN_BIRD_WELCOME_IMAGES.length);
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg"
                      >
                        Next Graphic →
                      </button>
                      {currentImg.tabTarget && (
                        <button
                          onClick={() => onNavigateTab(currentImg.tabTarget!)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg"
                        >
                          Launch Feature Module
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 3. QUICK ACTIONS BAR & QUICK DATA SNAPSHOT TOOL          */}
      {/* ======================================================== */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white">Bridge Quick Actions & Data Snapshot</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleTakeSnapshot}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              <span>Take Bridge Snapshot</span>
            </button>
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">1-CLICK COMMAND EXECUTION</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              title: 'Emergency SOS',
              subtitle: 'Coast Guard Dispatch',
              icon: Siren,
              color: 'from-rose-500/20 to-rose-950/40 border-rose-500/50 text-rose-300',
              btnBg: 'bg-rose-500 text-slate-950 hover:bg-rose-400',
              tab: 'emergency-sos-pulse' as NavTabType,
              haptic: 'error'
            },
            {
              title: 'Voice Commands',
              subtitle: 'AI Bridge Control',
              icon: Radio,
              color: 'from-cyan-500/20 to-slate-900 border-cyan-500/40 text-cyan-300',
              btnBg: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
              tab: 'voice-activated-command' as NavTabType,
              haptic: 'click'
            },
            {
              title: 'Engine Diagnostics',
              subtitle: 'AI Chief Maintenance',
              icon: Wrench,
              color: 'from-amber-500/20 to-slate-900 border-amber-500/40 text-amber-300',
              btnBg: 'bg-amber-500 text-slate-950 hover:bg-amber-400',
              tab: 'automated-maintenance-performance-super-agent' as NavTabType,
              haptic: 'click'
            },
            {
              title: 'Stowage Planner',
              subtitle: 'TEU Cargo Bay Check',
              icon: Box,
              color: 'from-emerald-500/20 to-slate-900 border-emerald-500/40 text-emerald-300',
              btnBg: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400',
              tab: 'smart-load-planner' as NavTabType,
              haptic: 'click'
            },
            {
              title: 'Global Fleet AIS',
              subtitle: 'Live Ship Radar',
              icon: Globe,
              color: 'from-indigo-500/20 to-slate-900 border-indigo-500/40 text-indigo-300',
              btnBg: 'bg-indigo-500 text-slate-950 hover:bg-indigo-400',
              tab: 'global-fleet-map' as NavTabType,
              haptic: 'click'
            },
            {
              title: 'Crew Welfare Log',
              subtitle: 'MLC Hours & Medical',
              icon: Heart,
              color: 'from-teal-500/20 to-slate-900 border-teal-500/40 text-teal-300',
              btnBg: 'bg-teal-500 text-slate-950 hover:bg-teal-400',
              tab: 'crew-welfare' as NavTabType,
              haptic: 'click'
            }
          ].map((action, idx) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  hapticEngine.trigger(action.haptic as any);
                  onNavigateTab(action.tab);
                }}
                className={`p-3.5 rounded-2xl bg-gradient-to-b ${action.color} border hover:scale-105 transition-all text-left flex flex-col justify-between space-y-3 group shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                    <ActionIcon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">
                    {action.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {action.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. FAVOURITE LINKS (DIRECT USER FEATURE)                 */}
      {/* ======================================================== */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="text-base font-extrabold text-white">Favourite & Bookmarked Links</h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
              {favourites.length} PINNED
            </span>
          </div>

          <button
            onClick={() => {
              hapticEngine.trigger('click');
              setIsAddingFavourite(!isAddingFavourite);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            {isAddingFavourite ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{isAddingFavourite ? 'Close Selector' : 'Add Favourite Link'}</span>
          </button>
        </div>

        {/* Dynamic Add Favourite Tool Selector Drawer */}
        {isAddingFavourite && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 animate-fadeIn">
            <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
              <span>Select Module to Pin to Favourites:</span>
              <span className="text-[10px] text-slate-400">1-Click Quick Bookmark</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {candidateFavourites.map((cand, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => addFavouriteLink(cand)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400 text-left flex items-center justify-between transition-all text-xs group"
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <Bookmark className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-bold text-slate-200 group-hover:text-white truncate">{cand.label}</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bookmarked Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {favourites.map((fav) => (
            <div
              key={fav.id}
              onClick={() => {
                hapticEngine.trigger('click');
                onNavigateTab(fav.tab);
              }}
              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer flex items-center justify-between transition-all group hover:scale-[1.02] shadow-lg"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                      {fav.label}
                    </span>
                    {fav.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-900 text-cyan-300 border border-slate-800">
                        {fav.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">
                    {fav.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1 shrink-0">
                <button
                  onClick={(e) => removeFavourite(fav.id, e)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-slate-800 transition-colors"
                  title="Remove Favourite"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. CLIMATE STATISTICS TELEMETRY (DIRECT USER FEATURE)     */}
      {/* ======================================================== */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
              <Thermometer className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-white">Ocean & Climate Statistics Telemetry</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${currentClimate.statusColor}`}>
                  {currentClimate.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-time satellite SST anomaly, Ocean Heat Content (OHC), atmospheric pressure & carbon metrics
              </p>
            </div>
          </div>

          {/* Region Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            {(['BAY_OF_BENGAL', 'ARABIAN_SEA', 'MALACCA_STRAIT', 'GLOBAL'] as const).map((region) => (
              <button
                key={region}
                onClick={() => {
                  hapticEngine.trigger('click');
                  setSelectedClimateRegion(region);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedClimateRegion === region
                    ? 'bg-cyan-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {region.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Climate Statistics Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'Sea Surface Temp', value: currentClimate.sst, sub: 'Satellite Moderate', icon: Thermometer, color: 'text-rose-400' },
            { label: 'SST Anomaly', value: currentClimate.sAnom, sub: 'Above 1990 Baseline', icon: Flame, color: 'text-amber-400' },
            { label: 'Ocean Heat (OHC)', value: currentClimate.ohc, sub: 'Upper 700m Layer', icon: Droplets, color: 'text-cyan-400' },
            { label: 'Tropical Cyclones', value: currentClimate.cyclones, sub: 'JTWC Active Alerts', icon: Wind, color: 'text-rose-400' },
            { label: 'Swell Wave Height', value: currentClimate.waveHeight, sub: 'Significant Wave', icon: Waves, color: 'text-sky-400' },
            { label: 'Barometric Press.', value: currentClimate.pressure, sub: 'Ship Transducer', icon: Gauge, color: 'text-indigo-400' },
            { label: 'Atmospheric CO2', value: currentClimate.co2, sub: 'Mauna Loa Station', icon: CloudSun, color: 'text-emerald-400' },
            { label: 'Sea Level Rise', value: currentClimate.seaLevelRise, sub: 'Altimeter Rate', icon: Activity, color: 'text-teal-400' }
          ].map((stat, sIdx) => {
            const StatIcon = stat.icon;
            return (
              <div key={sIdx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <StatIcon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className={`text-sm font-black font-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-200 truncate">{stat.label}</div>
                <div className="text-[9px] text-slate-500 truncate">{stat.sub}</div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            Telemetry source: NOAA Coral Reef Watch / Copernicus Marine Service / IMO GHG Protocol
          </span>
          <button
            onClick={() => {
              hapticEngine.trigger('click');
              onNavigateTab('climate');
            }}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold flex items-center space-x-2 transition-all"
          >
            <CloudSun className="w-4 h-4 text-cyan-400" />
            <span>Open Interactive Climate Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5B. CLIMATE RISK INDEX (CRI) MATRIX & SIMULATOR          */}
      {/* ======================================================== */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-white">Climate Risk Index (CRI) Matrix</h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-black border border-cyan-500/30">
                  IMO 2030 COMPLIANT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Composite 0-100 environmental risk index for route planning, port inundation & carbon surcharge
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            {(['OVERVIEW', 'BREAKDOWN', 'SIMULATOR'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  hapticEngine.trigger('click');
                  setCriViewMode(mode);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  criViewMode === mode
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* CRI Gauge Header Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
          {/* Radial CRI Score Visualizer */}
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              {/* SVG Ring Gauge */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-rose-500"
                  strokeDasharray={`${currentCRI.criScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white font-mono">{currentCRI.criScore}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">/ 100 CRI</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${currentCRI.color}`}>
                {currentCRI.level}
              </span>
              <h4 className="text-sm font-extrabold text-white">
                {selectedClimateRegion.replace(/_/g, ' ')} REGIONAL INDEX
              </h4>
              <p className="text-xs text-slate-400">
                SST Anomaly: <span className="text-amber-400 font-bold">{currentCRI.sstAnomaly}</span>
              </p>
            </div>
          </div>

          {/* Advisory & Speed Recommendation */}
          <div className="lg:col-span-2 space-y-2 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>NAVIGATIONAL ADVISORY: {currentCRI.advisory}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-bold">Recommended Speed Trim: </span>
                <span className="text-cyan-300 font-bold">{currentCRI.recommendedSpeed}</span>
              </div>
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  onNavigateTab('smart-fuel-optimizer');
                }}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black hover:bg-cyan-500 hover:text-slate-950 transition-all shrink-0 ml-2"
              >
                APPLY TRIM
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Breakdown Bars */}
        {criViewMode === 'BREAKDOWN' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            {[
              { label: 'Wave & Swell Severity', score: currentCRI.waveSeverityScore, color: 'bg-sky-500', text: 'text-sky-300' },
              { label: 'Cyclone Track Threat', score: currentCRI.cycloneRiskScore, color: 'bg-rose-500', text: 'text-rose-300' },
              { label: 'Port Inundation Surge', score: currentCRI.portInundationScore, color: 'bg-amber-500', text: 'text-amber-300' },
              { label: 'CII Carbon Surcharge', score: currentCRI.ciiPenaltyRiskScore, color: 'bg-emerald-500', text: 'text-emerald-300' }
            ].map((sub, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">{sub.label}</span>
                  <span className={`font-black font-mono ${sub.text}`}>{sub.score} / 100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full ${sub.color} transition-all duration-500`} style={{ width: `${sub.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode 2: Simulator Slider */}
        {criViewMode === 'SIMULATOR' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-extrabold text-white">Global Warming Stress Simulator</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                +{simulatedWarming.toFixed(1)} °C WARMING SCENARIO
              </span>
            </div>

            <input
              type="range"
              min="1.5"
              max="3.0"
              step="0.1"
              value={simulatedWarming}
              onChange={(e) => {
                setSimulatedWarming(parseFloat(e.target.value));
                hapticEngine.trigger('click');
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">Simulated CRI Score:</span>
                <span className="text-lg font-black text-rose-400 font-mono">{currentCRI.criScore} / 100</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">Estimated Voyage Delay:</span>
                <span className="text-lg font-black text-amber-300 font-mono">+{(simulatedWarming * 4.2).toFixed(1)} Hours</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-bold block">EU ETS Carbon Penalty:</span>
                <span className="text-lg font-black text-emerald-300 font-mono">+${Math.round(simulatedWarming * 14500)} USD / Voyage</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 5C. ADAPTIVE ALERT UI PANEL                              */}
      {/* ======================================================== */}
      <div className={`p-6 rounded-3xl border space-y-5 shadow-2xl transition-all ${
        alertDisplayMode === 'HIGH_CONTRAST'
          ? 'bg-black border-yellow-400'
          : alertDisplayMode === 'NIGHT_PULSE'
          ? 'bg-rose-950/40 border-rose-500/60'
          : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300">
              <Bell className="w-6 h-6 text-rose-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-white">Adaptive Priority Alert Dispatch</h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-black border border-rose-500/30">
                  {filteredAlerts.length} ACTIVE DISPATCHES
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Context-aware bridge notifications categorized by SOLAS severity, weather, security & diagnostics
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Audio Alert Toggle */}
            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setIsAudioAlertMuted(!isAudioAlertMuted);
              }}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all ${
                isAudioAlertMuted
                  ? 'bg-slate-950 text-slate-500 border-slate-800'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
              title="Toggle Audio Pulse Alert"
            >
              {isAudioAlertMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
              <span className="hidden sm:inline">{isAudioAlertMuted ? 'Muted' : 'Audio Live'}</span>
            </button>

            {/* Display Mode Theme Switcher */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
              {(['STANDARD', 'HIGH_CONTRAST', 'NIGHT_PULSE'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    hapticEngine.trigger('click');
                    setAlertDisplayMode(mode);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition-all ${
                    alertDisplayMode === mode
                      ? 'bg-rose-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1">Filter:</span>
          {(['ALL', 'EMERGENCY', 'WEATHER', 'SECURITY', 'ENGINE'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                hapticEngine.trigger('click');
                setAlertFilter(cat);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                alertFilter === cat
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Adaptive Alert Cards List */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const isAck = acknowledgedAlerts.includes(alert.id);
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isAck
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    : 'bg-slate-950 border-slate-800 hover:border-cyan-500/40 shadow-lg'
                }`}
              >
                <div className="space-y-1 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${alert.levelColor}`}>
                      {alert.level}
                    </span>
                    <span className="text-xs text-slate-400 font-bold font-mono">{alert.timestamp}</span>
                    <span className="text-xs text-cyan-300 font-bold">{alert.location}</span>
                  </div>
                  <h4 className="text-sm font-black text-white">{alert.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => toggleAcknowledgeAlert(alert.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1 ${
                      isAck
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAck ? 'Acknowledged' : 'Ack Alert'}</span>
                  </button>

                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      onNavigateTab(alert.tab);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center space-x-1"
                  >
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK DATA SNAPSHOT MODAL */}
      {isSnapshotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-extrabold text-white">Bridge Quick Data Snapshot</h3>
              </div>
              <button
                onClick={() => setIsSnapshotModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-80">
              {snapshotDataFormatted}
            </pre>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">Ready for Bridge Logbook & SOLAS Export</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopySnapshot}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center space-x-1.5"
                >
                  {copiedSnapshot ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSnapshot ? 'Copied to Clipboard!' : 'Copy Telemetry'}</span>
                </button>
                <button
                  onClick={() => setIsSnapshotModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. REAL-TIME FLEET & BRIDGE METRIC COUNTERS              */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Vessels Tracked', value: '1,248', sub: 'Live AIS Signals', color: 'text-cyan-400', icon: Ship, tab: 'ais-tracker' as NavTabType },
          { label: 'Severe Weather Alerts', value: '5 Critical', sub: 'Bay of Bengal / Arabian Sea', color: 'text-rose-400', icon: AlertTriangle, tab: 'climate' as NavTabType },
          { label: 'Port Terminals', value: '142 Docks', sub: 'South Asia & Global', color: 'text-amber-400', icon: MapPin, tab: 'interactive-port-map' as NavTabType },
          { label: 'Active Seafarers', value: '8,920 Crew', sub: 'MLC Compliant', color: 'text-teal-400', icon: Heart, tab: 'crew-welfare' as NavTabType },
          { label: 'Port Cold-Ironing', value: '94.2%', sub: 'CII Emission Score', color: 'text-emerald-400', icon: Gauge, tab: 'port-carbon-gauge' as NavTabType },
          { label: 'Search & Rescue', value: '24x7 Ready', sub: 'Coast Guard Standby', color: 'text-indigo-400', icon: Siren, tab: 'interactive-sos-locator' as NavTabType }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <button
              key={index}
              onClick={() => {
                hapticEngine.trigger('click');
                onNavigateTab(metric.tab);
              }}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all hover:scale-105 group space-y-2 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
              </div>
              <div>
                <div className={`text-lg font-black font-mono ${metric.color}`}>{metric.value}</div>
                <div className="text-[11px] font-bold text-slate-200 truncate">{metric.label}</div>
                <div className="text-[10px] text-slate-500 truncate">{metric.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 7. CATEGORIZED MAIN MODULE LAUNCHPADS                    */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-white">Maritime Operational Launchpad</h2>
          </div>
          <button
            onClick={() => {
              hapticEngine.trigger('click');
              onOpenSearch();
            }}
            className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search All 60+ Modules</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCategoryCards.map((cat, idx) => {
            const MainIcon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 flex flex-col justify-between shadow-xl hover:border-slate-700 transition-all group"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-all">
                      <MainIcon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className={`px-2.5 py-0.5 text-[10px] font-black rounded-full uppercase border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Module Direct Links List */}
                  <div className="space-y-1.5 pt-2">
                    {cat.links.map((link, lIdx) => {
                      const LinkIcon = link.icon;
                      return (
                        <button
                          key={lIdx}
                          onClick={() => {
                            hapticEngine.trigger('click');
                            onNavigateTab(link.tab);
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/40 text-left flex items-center justify-between transition-all text-xs text-slate-300 hover:text-white group/btn"
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <LinkIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="font-bold truncate">{link.label}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover/btn:text-cyan-400 transition-colors shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 8. CRITICAL CLIMATE & SAFETY BROADCAST TICKER             */}
      {/* ======================================================== */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-rose-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-500/50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-rose-400 uppercase tracking-widest">
                CRITICAL MARITIME ADVISORY
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                ACTIVE
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              Super Severe Tropical Cyclone Advisory (Cat 3) — Bay of Bengal & Sundarbans
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Gale force winds above 55 knots with surge waves exceeding 4.5 meters. Vessel transit suspended near Chittagong & Kolkata approaches.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => {
              hapticEngine.trigger('click');
              onNavigateTab('climate');
            }}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <span>VIEW FULL CLIMATE RADAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Ocean Bird Welcome Graphics */}
      {selectedIntroImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-4xl w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedIntroImage(null)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                {selectedIntroImage.badge}
              </span>
              <span className="text-slate-400 text-xs font-mono">{selectedIntroImage.category}</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-72 sm:h-96">
              <img
                src={selectedIntroImage.url}
                alt={selectedIntroImage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-black text-white font-sans">{selectedIntroImage.title}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">{selectedIntroImage.description}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedIntroImage.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-950 text-cyan-300 text-xs font-mono px-3 py-1 rounded-xl border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveHeroImageId(selectedIntroImage.id);
                  hapticEngine.trigger('success');
                  setSelectedIntroImage(null);
                }}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg flex items-center space-x-2 ${
                  activeHeroImageId === selectedIntroImage.id
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {activeHeroImageId === selectedIntroImage.id
                    ? 'Selected Active Welcome Theme'
                    : 'Set as Active App Welcome Hero Background'}
                </span>
              </button>

              <div className="flex items-center space-x-2">
                {selectedIntroImage.tabTarget && (
                  <button
                    onClick={() => {
                      const tab = selectedIntroImage.tabTarget!;
                      setSelectedIntroImage(null);
                      onNavigateTab(tab);
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg flex items-center space-x-2"
                  >
                    <span>Launch Feature Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedIntroImage(null)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
