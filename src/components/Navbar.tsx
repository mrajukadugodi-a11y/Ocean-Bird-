import React, { useState, useEffect } from 'react';
import oceanBirdLogo from '../assets/images/ocean_bird_logo_1785499834795.jpg';
import { Compass, Ship, Globe, Globe2, Bot, ThermometerSun, Radio, LifeBuoy, DollarSign, Briefcase, Fish, Palmtree, Menu, X, Smartphone, Layers, ShieldAlert, Waves, Anchor, Fuel, Navigation, ClipboardList, Bell, Siren, Map, Activity, BarChart3, Sun, Moon, Building2, CloudRain, Wifi, WifiOff, BookOpen, Crosshair, Headphones, StickyNote, Heart, Users, Eye, CloudSun, Download, FileCheck, PenTool, Sparkles, CheckSquare, ShieldCheck, Zap, Award, Database, PlaneTakeoff, Plane, Box, Container, Ticket, Calendar, Hotel, FileText, CreditCard, Fingerprint, HardDrive, Printer, Languages, Gauge, Newspaper, Wrench, Mic, HelpCircle, MessageSquarePlus, LayoutDashboard, Cloud, Share2, Truck, Key, Brain, Clock, QrCode, Scan, MapPin, Search, BatteryCharging, Battery, Wind, Play, Pause, RotateCcw, GraduationCap, Leaf, Stethoscope, Syringe, Trophy, Rocket, Landmark, Library, Pickaxe, Link as LinkIcon, UserPlus, Image as ImageIcon, Store, ShoppingBag, Star, Wallet, TrendingUp, History, Vote } from 'lucide-react';
import { LanguageSelector } from '../utils/languageUtils';
import { AutoTranslationBar } from './AutoTranslationBar';
import { hapticEngine } from '../utils/hapticUtils';
import { PublicAuthLogoPortal, PublicUserAccount } from './PublicAuthLogoPortal';

export type NavTabType =
  | 'ocean-mining-engineering'
  | 'ocean-environment-library'
  | 'ocean-plastic-radar'
  | 'vessels-efficiency-chart'
  | 'super-master-dark-web-cyber-shield'
  | 'app-subscription-portal'
  | 'super-master-cyber-defense-squad'
  | 'public-citizen-portal'
  | 'port-commercial-hub'
  | 'home'
  | 'deployment-guide'
  | 'ocean-gaming-lottery'
  | 'stocks-shares-bonds'
  | 'business-banking'
  | 'investment-analytics'
  | 'predictive-efficiency-dashboard'
  | 'automated-maintenance-performance-super-agent'
  | 'maritime-social-portal'
  | 'troubleshooter-super-master-agent'
  | 'smart-ocean-cleanup'
  | 'maritime-ar-view'
  | 'port-carbon-gauge'
  | 'offline-sync-alert'
  | 'vessels-health-pulse'
  | 'global-fleet-chart'
  | 'cloud-dashboard'
  | 'master-claude'
  | 'global-fleet-map'
  | 'global-fleet-tracker'
  | 'global-job-alerts'
  | 'airways-jobs-portal'
  | 'airways-training-institutes'
  | 'marine-jobs-portal'
  | 'marine-training-institutes'
  | 'trip-planner'
  | 'loyalty-rewards'
  | 'multi-model-stats'
  | 'digital-passport'
  | 'app-store-release'
  | 'app-licence-issuer'
  | 'app-ownership-deed'
  | 'crew-certification'
  | 'port-drone-support'
  | 'maritime-esg-report'
  | 'vessels-cybersec'
  | 'cyber-antivirus-security'
  | 'hardware-repair-wizard'
  | 'port-authority-chatbot'
  | 'supply-chain-delays'
  | 'online-visa-application'
  | 'e-visa-application'
  | 'physical-visa-application'
  | 'online-payment-gateway'
  | 'digital-booking-manager'
  | 'hotel-booking-portal'
  | 'vessel-arrival-notifications'
  | 'interactive-sos-locator'
  | 'port-accessibility'
  | 'booking-calendar'
  | 'weather-timeline-trends'
  | 'airways-passenger'
  | 'airways-passenger-domestic'
  | 'airways-passenger-international'
  | 'airways-cargo'
  | 'airways-tracking'
  | 'cruise-passenger'
  | 'marine-passenger-domestic'
  | 'marine-passenger-international'
  | 'marine-cargo'
  | 'vessels-gps-tracker'
  | 'offline-maps'
  | 'dark-mode-analytics'
  | 'fleet-reports'
  | 'multi-language'
  | 'performance-dashboard'
  | 'automated-backup'
  | 'maritime-news'
  | 'predictive-maintenance'
  | 'voice-activated-command'
  | 'vessels-health-logs'
  | 'interactive-tour-guide'
  | 'user-feedback-portal'
  | 'tsunami-earthquake-warning'
  | 'public-utility-integration'
  | 'smart-fuel-optimizer'
  | 'voyage-carbon-offset'
  | 'emergency-ar-overlay'
  | 'offline-sync-status'
  | 'smart-fleet-analytics'
  | 'geofence-notification'
  | 'digital-cargo-signature'
  | 'safety-briefing'
  | 'weather-impact-map'
  | 'climate'
  | 'route-radar'
  | 'maritime-utilities'
  | 'fisheries'
  | 'tourism'
  | 'timetable'
  | 'nations'
  | 'rescue-telecom'
  | 'converter-translator'
  | 'marine-images-gallery'
  | 'jobs-training'
  | 'ai-analyst'
  | 'tides'
  | 'grounding'
  | 'fuel-tracker'
  | 'path-optimizer'
  | 'map-overlay'
  | 'port-checklist'
  | 'weather-alert'
  | 'piracy-alert'
  | 'nautical-chart'
  | 'ais-tracker'
  | 'fuel-analytics'
  | 'smart-anchor'
  | 'port-traffic'
  | 'marine-logbook'
  | 'collision-avoidance'
  | 'ocean-soundscapes'
  | 'quick-notes'
  | 'marine-health'
  | 'crew-welfare'
  | 'emergency-drill'
  | 'marine-weather-api'
  | 'pwa-support'
  | 'marine-ar-view'
  | 'location-nav-radio'
  | 'commercial-corridors'
  | 'port-distance'
  | 'smart-supply-chain'
  | 'crisis-simulation'
  | 'industry-auth-bridge'
  | 'global-utility-forecast'
  | 'animated-dashboard'
  | 'multi-model-analytics'
  | 'predictive-alert-history'
  | 'automated-regulation-check'
  | 'qr-check-in'
  | 'smart-load-planner'
  | 'interactive-port-map'
  | 'emergency-sos-pulse'
  | 'marine-utilities'
  | 'medical-hub'
  | 'super-master-ai-evaluator'
  | 'stocks-shares-bonds'
  | 'global-pwa-docs'
  | 'search-indexing-portal'
  | 'app-status-portal'
  | 'deep-linking-setup'
  | 'qr-code-generator'
  | 'rating-system'
  | 'event-push-system'
  | 'virtual-tour-360'
  | 'ocean-dollar-wallets'
  | 'optimized-auth-flow'
  | 'staking-roi-charts'
  | 'offline-sync-manager'
  | 'maritime-news-feed'
  | 'ocean-dollar-faq'
  | 'asset-audit-trail'
  | 'currency-visualizer'
  | 'vault-security-tips'
  | 'currency-export-tool'
  | 'ocean-dollar-staking'
  | 'marine-currency-history'
  | 'currency-security-tips'
  | 'ocean-dollar-dao-governance'
  | 'crypto-calculator'
  | 'developer-revenue-whitepaper';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  activeAlertCount: number;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  isOfflineCacheActive?: boolean;
  onToggleOfflineCache?: () => void;
  isAmbientMode?: boolean;
  onToggleAmbientMode?: () => void;
  onOpenBiometricLogin?: () => void;
  onOpenSearch?: () => void;
  onOpenHapticSettings?: () => void;
  onOpenChromeHelp?: () => void;
  onOpenDomainLinks?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeAlertCount,
  isDarkMode = true,
  onToggleDarkMode,
  isOfflineCacheActive = true,
  onToggleOfflineCache,
  isAmbientMode = false,
  onToggleAmbientMode,
  onOpenBiometricLogin,
  onOpenSearch,
  onOpenHapticSettings,
  onOpenChromeHelp,
  onOpenDomainLinks
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Session Timer State
  const [sessionSeconds, setSessionSeconds] = useState(1482); // Initial ~24 min
  const [isSessionRunning, setIsSessionRunning] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);

  // Battery Status State
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [isCharging, setIsCharging] = useState(true);
  const [showBatteryModal, setShowBatteryModal] = useState(false);

  // Weather & Toast State
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Public Sign Up & Logo Portal State
  const [showAuthLogoModal, setShowAuthLogoModal] = useState<false | true>(false);
  const [authLogoDefaultTab, setAuthLogoDefaultTab] = useState<'signup' | 'signin' | 'profile' | 'logo-generator' | 'brand-press'>('signup');
  const [loggedInUser, setLoggedInUser] = useState<PublicUserAccount | null>(null);

  useEffect(() => {
    const syncUser = () => {
      const saved = localStorage.getItem('oceanbird_public_user_account');
      if (saved) {
        try {
          setLoggedInUser(JSON.parse(saved));
        } catch (err) {
          setLoggedInUser(null);
        }
      } else {
        setLoggedInUser(null);
      }
    };
    syncUser();
    window.addEventListener('oceanbird_auth_changed', syncUser);
    return () => window.removeEventListener('oceanbird_auth_changed', syncUser);
  }, []);

  // Live Session Timer effect
  useEffect(() => {
    let timer: any;
    if (isSessionRunning) {
      timer = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSessionRunning]);

  // Battery status API integration with fallback
  useEffect(() => {
    if (typeof navigator !== 'undefined' && (navigator as any).getBattery) {
      (navigator as any).getBattery().then((batt: any) => {
        setBatteryLevel(Math.round(batt.level * 100));
        setIsCharging(batt.charging);

        batt.addEventListener('levelchange', () => setBatteryLevel(Math.round(batt.level * 100)));
        batt.addEventListener('chargingchange', () => setIsCharging(batt.charging));
      }).catch(() => {});
    }
  }, []);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 'p' || e.key === 'P') {
          e.preventDefault();
          handlePrint();
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          setActiveTab('maritime-social-portal');
          showToast('Shortcut: Switched to Maritime Social Portal');
        } else if (e.key === 't' || e.key === 'T') {
          e.preventDefault();
          setActiveTab('troubleshooter-super-master-agent');
          showToast('Shortcut: Switched to Troubleshooter AI Agent');
        } else if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          setActiveTab('dark-mode-analytics');
          showToast('Shortcut: Switched to Analytics Dashboard');
        } else if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          setActiveTab('automated-backup');
          showToast('Shortcut: Switched to Automated Backup Manager');
        } else if (e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          setActiveTab('weather-alert');
          showToast('Shortcut: Switched to Weather Alert Monitor');
        } else if (e.key === 'e' || e.key === 'E') {
          e.preventDefault();
          setActiveTab('interactive-sos-locator');
          showToast('Shortcut: Switched to Emergency SOS Locator');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    hapticEngine.trigger('success');
    setTimeout(() => setToastNotice(null), 3000);
  };

  const handlePrint = () => {
    hapticEngine.trigger('click');
    showToast('Printing / Exporting Printable Maritime Report...');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const formatSessionTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  interface NavItem {
    id: NavTabType;
    label: string;
    icon: React.FC<{ className?: string }>;
    color: string;
    badge?: string;
    count?: number;
  }

  const navItems: NavItem[] = [
    { id: 'ocean-mining-engineering', label: 'Ocean Mining & Offshore Engineering Studies Portal (Online & Offline)', icon: Pickaxe, color: 'text-amber-400', badge: 'MINING STUDIES' },
    { id: 'ocean-environment-library', label: 'Ocean Environment Knowledge & Research Library Portal', icon: Library, color: 'text-emerald-400', badge: 'RESEARCH LIBRARY' },
    { id: 'ocean-plastic-radar', label: 'Global Ocean Plastic & Microplastic Radar', icon: Waves, color: 'text-teal-400', badge: 'PLASTIC RADAR' },
    { id: 'vessels-efficiency-chart', label: 'Vessels Hydrodynamic Efficiency & Power Curve Chart', icon: Gauge, color: 'text-cyan-400', badge: 'FOC & CII CHART' },
    { id: 'super-master-dark-web-cyber-shield', label: 'Super Master AI Dark Web, Phishing & Virus Shield Agent', icon: ShieldAlert, color: 'text-rose-400', badge: 'SUPER MASTER SHIELD' },
    { id: 'app-subscription-portal', label: 'App Subscription & Category-Wise Licensing Portal', icon: CreditCard, color: 'text-cyan-400', badge: 'SUBSCRIPTION PORTAL' },
    { id: 'super-master-cyber-defense-squad', label: 'Super Master AI Cybersecurity Agent Squad (Malware, Phishing & Anti-Hack Shield)', icon: ShieldAlert, color: 'text-rose-400', badge: 'SUPER MASTER DEFENSE' },
    { id: 'public-citizen-portal', label: 'General Public Registration Portal (Email & Mobile)', icon: ShieldCheck, color: 'text-indigo-400', badge: 'PUBLIC REGISTRATION' },
    { id: 'port-commercial-hub', label: 'Port Commercial Hub, Duty-Free & Trade Expos', icon: Store, color: 'text-amber-400', badge: 'PUBLIC RETAIL & EXPO' },
    { id: 'super-master-ai-evaluator', label: 'Super Master AI Agent (Self Evaluation & Future Activity Engine)', icon: Brain, color: 'text-cyan-400', badge: 'SUPER MASTER AI' },
    { id: 'home', label: 'Home Page Command Hub', icon: Compass, color: 'text-cyan-400', badge: 'MAIN HUB' },
    { id: 'deployment-guide', label: 'Deploy, CI/CD, PWA & SEO Guide', icon: Rocket, color: 'text-cyan-400', badge: 'DEVOPS' },
    { id: 'global-pwa-docs', label: 'Global PWA Technical Docs & Diagnostics', icon: Smartphone, color: 'text-cyan-400', badge: 'PWA V3' },
    { id: 'search-indexing-portal', label: 'Search Engine Indexing & Sitemap Suite', icon: Search, color: 'text-indigo-400', badge: 'SEO / SCHEMA' },
    { id: 'app-status-portal', label: 'Global App System Status & SLA Latency', icon: Activity, color: 'text-teal-400', badge: 'STATUS SLA' },
    { id: 'deep-linking-setup', label: 'Universal Deep Linking & Route Setup', icon: LinkIcon, color: 'text-cyan-400', badge: 'DEEP LINK' },
    { id: 'qr-code-generator', label: 'Dynamic QR Code Generator & Scanner Studio', icon: QrCode, color: 'text-emerald-400', badge: 'QR STUDIO' },
    { id: 'rating-system', label: 'Maritime Services Rating & Reviews System', icon: Star, color: 'text-amber-400', badge: '5★ REVIEWS' },
    { id: 'event-push-system', label: 'Real-Time Event Push & Broadcast Engine', icon: Bell, color: 'text-cyan-400', badge: 'PUSH ALERTS' },
    { id: 'virtual-tour-360', label: '360° Immersive Virtual Tour Explorer', icon: Compass, color: 'text-purple-400', badge: '360° VR' },
    { id: 'ocean-dollar-wallets', label: 'Ocean Dollar Sovereign Multi-Wallets ($OD)', icon: Wallet, color: 'text-yellow-400', badge: '$OD WALLETS' },
    { id: 'optimized-auth-flow', label: 'Firebase Auth Bridge & Maritime Role RBAC', icon: ShieldCheck, color: 'text-purple-400', badge: 'AUTH RBAC' },
    { id: 'staking-roi-charts', label: 'Staking ROI Charts & Yield Pool Calculator', icon: TrendingUp, color: 'text-amber-400', badge: 'STAKING ROI' },
    { id: 'offline-sync-manager', label: 'Offline High Seas Sync & IndexedDB Queue', icon: WifiOff, color: 'text-emerald-400', badge: 'OFFLINE SYNC' },
    { id: 'maritime-news-feed', label: 'Live Global Maritime News & Security Feeds', icon: Newspaper, color: 'text-sky-400', badge: 'NEWS FEEDS' },
    { id: 'ocean-dollar-faq', label: 'Ocean Dollar Knowledge Base & FAQ', icon: HelpCircle, color: 'text-yellow-400', badge: '$OD FAQ' },
    { id: 'asset-audit-trail', label: 'Real-Time Asset Audit Trail & Vault Certificates', icon: FileCheck, color: 'text-emerald-400', badge: 'AUDIT TRAIL' },
    { id: 'currency-visualizer', label: 'Interactive Currency Visualizer & Security Lab', icon: Eye, color: 'text-amber-400', badge: 'VISUALIZER' },
    { id: 'vault-security-tips', label: 'Vault Security Tips & Defense Protocol', icon: ShieldAlert, color: 'text-purple-400', badge: 'SECURITY TIPS' },
    { id: 'currency-export-tool', label: 'Currency Export Tool & Report Generator', icon: Download, color: 'text-cyan-400', badge: 'EXPORT TOOL' },
    { id: 'ocean-dollar-staking', label: 'Ocean Dollar Staking & Yield Vaults ($OD)', icon: TrendingUp, color: 'text-amber-400', badge: '$OD STAKING' },
    { id: 'marine-currency-history', label: 'Marine Currency History & $OD Genesis Timeline', icon: History, color: 'text-cyan-400', badge: 'CURRENCY HISTORY' },
    { id: 'currency-security-tips', label: 'Currency Security Tips & Anti-Counterfeit Protocol', icon: ShieldAlert, color: 'text-purple-400', badge: 'CURRENCY SECURITY' },
    { id: 'ocean-dollar-dao-governance', label: 'Ocean Dollar DAO Governance Portal (Proposals & Treasury)', icon: Vote, color: 'text-cyan-400', badge: 'DAO GOVERNANCE' },
    { id: 'crypto-calculator', label: 'Crypto Calculator ($OD, Crypto, Staking & Dev Splits)', icon: DollarSign, color: 'text-cyan-400', badge: 'CRYPTO CALC' },
    { id: 'developer-revenue-whitepaper', label: 'Developer Revenue Sharing Whitepaper & Email Informing', icon: FileText, color: 'text-amber-400', badge: 'DEV WHITEPAPER' },
    { id: 'ocean-gaming-lottery', label: 'Ocean Gaming & Entertainments Portal ($OD Money System)', icon: Trophy, color: 'text-amber-400', badge: '$OD GAMING' },
    { id: 'stocks-shares-bonds', label: 'Stocks, Shares & Bonds Sovereign Exchange (Specialties Portal)', icon: DollarSign, color: 'text-emerald-400', badge: 'STOCKS & BONDS' },
    { id: 'business-banking', label: 'Business Banking Portal (Vaults, Escrow, Lines of Credit & Payroll)', icon: Landmark, color: 'text-cyan-400', badge: 'BANKING' },
    { id: 'investment-analytics', label: 'Investment Analytics (IRR, Yields, Carbon Beta & Stress Simulation)', icon: BarChart3, color: 'text-amber-400', badge: 'ANALYTICS' },
    { id: 'medical-hub', label: 'Medical Hub, Smart Health Map & Vaccination Portal', icon: Stethoscope, color: 'text-emerald-400', badge: 'MEDICAL HUB' },
    { id: 'predictive-efficiency-dashboard', label: 'Predictive Efficiency Dashboard', icon: Sparkles, color: 'text-cyan-400', badge: 'SPARKLINES AI' },
    { id: 'automated-maintenance-performance-super-agent', label: 'Automated Maintenance, Management & Performance Super Master AI Agent', icon: Bot, color: 'text-cyan-400', badge: 'SUPER MASTER AI' },
    { id: 'maritime-social-portal', label: 'Maritime Social Portal & Voice/Video Comms', icon: Share2, color: 'text-cyan-400', badge: 'VOICE & VIDEO SOCIAL' },
    { id: 'troubleshooter-super-master-agent', label: 'Trouble Shooter Super Master AI Agent', icon: Wrench, color: 'text-amber-400', badge: 'SUPER MASTER AI' },
    { id: 'smart-ocean-cleanup', label: 'Smart Ocean Clean-Up & Plastic Telemetry', icon: Waves, color: 'text-cyan-400', badge: 'CLEANUP AI' },
    { id: 'maritime-ar-view', label: 'Maritime AR View & HUD Camera Overlay', icon: Eye, color: 'text-indigo-400', badge: 'AR HUD' },
    { id: 'port-carbon-gauge', label: 'Port Carbon Gauge & Cold-Ironing', icon: Gauge, color: 'text-emerald-400', badge: 'GREEN PORT' },
    { id: 'offline-sync-alert', label: 'Offline Sync Alert & SatCom Buffer', icon: WifiOff, color: 'text-amber-400', badge: 'SATCOM' },
    { id: 'vessels-health-pulse', label: 'Vessels Health Pulse & Stethoscope', icon: Heart, color: 'text-rose-400', badge: 'PULSE' },
    { id: 'global-fleet-chart', label: 'Global Fleet Chart & Telemetry', icon: BarChart3, color: 'text-cyan-400', badge: 'CHARTS' },
    { id: 'animated-dashboard', label: 'Animated Master Command & Radar Dashboard', icon: Sparkles, color: 'text-cyan-400', badge: 'LIVE RADAR' },
    { id: 'qr-check-in', label: 'Smart QR Terminal Check-In & Gate Pass', icon: QrCode, color: 'text-cyan-400', badge: 'QR GATE' },
    { id: 'smart-load-planner', label: 'Smart Load & Stowage Bay Planner', icon: Box, color: 'text-amber-400', badge: 'STOWAGE AI' },
    { id: 'interactive-port-map', label: 'Interactive Port Terminal GIS Map', icon: MapPin, color: 'text-emerald-400', badge: 'PORT GIS' },
    { id: 'emergency-sos-pulse', label: 'Emergency SOS Pulse & Mayday Telemetry', icon: Siren, color: 'text-rose-400', badge: 'MAYDAY' },
    { id: 'smart-supply-chain', label: 'Smart Supply Chain Dashboard', icon: Truck, color: 'text-amber-400', badge: 'TEU AI' },
    { id: 'crisis-simulation', label: 'Crisis Simulation Engine', icon: Siren, color: 'text-rose-400', badge: 'DRILL' },
    { id: 'industry-auth-bridge', label: 'Industry Auth Bridge & Passkeys', icon: Key, color: 'text-cyan-400', badge: 'SSO / FIDO2' },
    { id: 'global-utility-forecast', label: 'Global Utility Forecast & Grid Radar', icon: Building2, color: 'text-emerald-400', badge: 'GRID / LNG' },
    { id: 'multi-model-analytics', label: 'Multi-Model AI Analytics & Fusion Engine', icon: Brain, color: 'text-indigo-400', badge: '4 AI MODELS' },
    { id: 'predictive-alert-history', label: 'Predictive Alert History & Verification', icon: Clock, color: 'text-blue-400', badge: 'HISTORICAL' },
    { id: 'automated-regulation-check', label: 'Automated Regulation Check & Penalty Shield', icon: FileCheck, color: 'text-emerald-400', badge: 'IMO AUDIT' },
    { id: 'cloud-dashboard', label: 'Cloud Structured Dashboard & Menu Hub', icon: LayoutDashboard, color: 'text-cyan-400', badge: 'CLOUD v3.4' },
    { id: 'master-claude', label: 'Master Claude System (Autonomous AI Orchestrator)', icon: Sparkles, color: 'text-indigo-400', badge: 'CLAUDE AI' },
    { id: 'global-fleet-map', label: 'Global Fleet Map (Worldwide Real-Time)', icon: Globe, color: 'text-cyan-400', badge: 'WORLD MAP' },
    { id: 'global-fleet-tracker', label: 'Airways, Cruise & Cargo Location Tracker', icon: Navigation, color: 'text-sky-400', badge: 'GPS/AIS' },
    { id: 'global-job-alerts', label: 'Airways & Marine Jobs Alert System (World Service)', icon: Briefcase, color: 'text-amber-400', badge: 'CAREER ALERTS' },
    { id: 'airways-jobs-portal', label: 'Airways Jobs (International & Domestic Requirements Portal)', icon: Plane, color: 'text-sky-400', badge: 'AIR JOBS' },
    { id: 'airways-training-institutes', label: 'Airways Educational & Training Institutes (Intl & Domestic)', icon: GraduationCap, color: 'text-sky-300', badge: 'AIR EDU' },
    { id: 'marine-jobs-portal', label: 'Marine Jobs (International & Domestic Requirements Portal)', icon: Anchor, color: 'text-teal-400', badge: 'SEA JOBS' },
    { id: 'marine-training-institutes', label: 'Marine Educational & Training Institutes (Intl & Domestic)', icon: BookOpen, color: 'text-emerald-400', badge: 'SEA EDU' },
    { id: 'trip-planner', label: 'AI Multi-Modal Trip Planner & Itinerary', icon: Compass, color: 'text-sky-400', badge: 'TRIP PLAN' },
    { id: 'loyalty-rewards', label: 'Frequent Flyer & Mariner Loyalty Rewards Club', icon: Award, color: 'text-amber-400', badge: 'REWARDS' },
    { id: 'multi-model-stats', label: 'Multi-Model AI Real-Time Performance Stats', icon: Brain, color: 'text-indigo-400', badge: 'AI STATS' },
    { id: 'digital-passport', label: 'Digital Passport & Seaman Book Credential Wallet', icon: Fingerprint, color: 'text-indigo-400', badge: 'E-PASSPORT' },
    { id: 'app-store-release', label: 'App Store Metadata, Privacy Policy & Version Tracker', icon: Smartphone, color: 'text-sky-400', badge: 'PLAY CONSOLE' },
    { id: 'app-licence-issuer', label: 'Software Commercial License & Enterprise Key Issuer', icon: Key, color: 'text-amber-400', badge: 'LICENSE ISSUER' },
    { id: 'app-ownership-deed', label: 'Application Master Ownership & IP Title Deed', icon: ShieldCheck, color: 'text-emerald-400', badge: 'OWNERSHIP DEED' },
    { id: 'crew-certification', label: 'Seafarer Crew STCW Certification & Endorsement Matrix', icon: Award, color: 'text-indigo-400', badge: 'STCW MATRIX' },
    { id: 'port-drone-support', label: 'Autonomous Port Drone Inspection & Cargo Operations', icon: Radio, color: 'text-sky-400', badge: 'PORT DRONES' },
    { id: 'maritime-esg-report', label: 'Maritime ESG & Sustainability Environmental Report', icon: Leaf, color: 'text-emerald-400', badge: 'IMO ESG' },
    { id: 'vessels-cybersec', label: 'Vessels Cyber-Security & IT/OT Vulnerability Check', icon: ShieldAlert, color: 'text-rose-400', badge: 'CYBER RISK' },
    { id: 'cyber-antivirus-security', label: 'AI Cyber Antivirus & Anti-Scam Protection Shield', icon: ShieldCheck, color: 'text-rose-400', badge: 'ANTIVIRUS / FRAUD' },
    { id: 'hardware-repair-wizard', label: 'Hardware Diagnostic Wizard & App Self-Repair Toolkit', icon: Wrench, color: 'text-teal-400', badge: 'SELF-HEAL / REPAIR' },
    { id: 'port-authority-chatbot', label: 'Port Authority AI Harbormaster Chatbot', icon: Bot, color: 'text-sky-400', badge: 'HARBOR AI' },
    { id: 'supply-chain-delays', label: 'Real-Time Supply Chain & Port Delay Tracker', icon: Clock, color: 'text-amber-400', badge: 'BOTTLENECK' },
    { id: 'online-visa-application', label: 'Online Visa Application & e-Visa Portal', icon: FileText, color: 'text-amber-400', badge: 'E-VISA' },
    { id: 'e-visa-application', label: 'e-Visa Online Portal (Instant Digital Approval)', icon: Sparkles, color: 'text-sky-400', badge: 'INSTANT E-VISA' },
    { id: 'physical-visa-application', label: 'Physical Visa Portal (Consulate & Stamped Passport)', icon: Building2, color: 'text-rose-400', badge: 'PHYSICAL VISA' },
    { id: 'online-payment-gateway', label: 'Online Payment Gateway Systems (Multi-Currency/UPI)', icon: CreditCard, color: 'text-emerald-400', badge: 'GATEWAY' },
    { id: 'digital-booking-manager', label: 'Full Online Digital Booking & Payment Portal', icon: Ticket, color: 'text-emerald-400', badge: 'PAYMENT/PDF' },
    { id: 'hotel-booking-portal', label: 'Port Hotels & Layover Stays (Online Booking)', icon: Hotel, color: 'text-sky-400', badge: 'HOTELS' },
    { id: 'vessel-arrival-notifications', label: 'Vessel Arrival Alerts & Dispatch Feeds', icon: Bell, color: 'text-amber-400', badge: 'NOTIFY' },
    { id: 'interactive-sos-locator', label: 'Interactive SOS & Rescue Station Locator', icon: Siren, color: 'text-rose-400', badge: 'SOS RADAR' },
    { id: 'port-accessibility', label: 'Port & Terminal Accessibility Guide', icon: Users, color: 'text-teal-400', badge: 'ISO 21902' },
    { id: 'booking-calendar', label: 'Interactive Booking & Departure Calendar', icon: Calendar, color: 'text-amber-400', badge: '.ICS CALENDAR' },
    { id: 'weather-timeline-trends', label: 'Weather Timeline & Ports Weather Trends', icon: CloudSun, color: 'text-cyan-400', badge: 'FORECAST' },
    { id: 'offline-maps', label: 'Offline Maps & Vector Chart Cache', icon: HardDrive, color: 'text-emerald-400', badge: 'S-57 CACHE' },
    { id: 'dark-mode-analytics', label: 'Dark Mode Analytics & Night Vision', icon: Eye, color: 'text-rose-400', badge: '650NM' },
    { id: 'fleet-reports', label: 'Generate Fleet Reports & SOLAS Audit', icon: Printer, color: 'text-cyan-400', badge: 'PDF/CSV' },
    { id: 'multi-language', label: 'Multi-Language Support & Dictionary', icon: Languages, color: 'text-sky-400', badge: '8 LANGS' },
    { id: 'performance-dashboard', label: 'Application Performance Dashboard', icon: Gauge, color: 'text-emerald-400', badge: '60 FPS' },
    { id: 'automated-backup', label: 'Automated Encrypted Backup & Restore', icon: Database, color: 'text-cyan-400', badge: 'CRON BACKUP' },
    { id: 'maritime-news', label: 'Maritime News Feeds & IMO Intelligence', icon: Newspaper, color: 'text-sky-400', badge: 'LIVE NEWS' },
    { id: 'predictive-maintenance', label: 'AI Predictive Maintenance & RUL', icon: Wrench, color: 'text-cyan-400', badge: 'AI ML' },
    { id: 'voice-activated-command', label: 'Voice Activated Bridge Commands', icon: Mic, color: 'text-rose-400', badge: 'VOICE STCW' },
    { id: 'vessels-health-logs', label: 'Vessels Health & Subsystem Logbook', icon: Heart, color: 'text-emerald-400', badge: 'HEALTH LOG' },
    { id: 'interactive-tour-guide', label: 'Interactive Onboarding Tour Guide', icon: HelpCircle, color: 'text-amber-400', badge: 'GUIDED TOUR' },
    { id: 'user-feedback-portal', label: 'User Feedback & Feature Suggestions Portal', icon: MessageSquarePlus, color: 'text-amber-400', badge: 'FEEDBACK' },
    { id: 'marine-images-gallery', label: 'Marine Images Gallery, AI Captioning & Optimization', icon: ImageIcon, color: 'text-cyan-300', badge: 'GALLERY / WEBP' },
    { id: 'tsunami-earthquake-warning', label: 'Global Tsunami & Earthquake Early Warning Center', icon: Waves, color: 'text-rose-400', badge: 'TSUNAMI/USGS' },
    { id: 'public-utility-integration', label: 'Airways, Shipping & Public Utility Integration Portal', icon: Share2, color: 'text-cyan-400', badge: 'API/EMBED' },
    { id: 'airways-passenger', label: 'Airways Flight Passenger Ticket Booking Portal (Combined)', icon: PlaneTakeoff, color: 'text-sky-400', badge: 'AIR PASS' },
    { id: 'airways-passenger-domestic', label: 'Airways Domestic Flight Passenger Ticket Booking Portal', icon: Plane, color: 'text-sky-400', badge: 'DOMESTIC AIR' },
    { id: 'airways-passenger-international', label: 'Airways International Flight Passenger Ticket Booking Portal', icon: Globe, color: 'text-sky-300', badge: 'INTL AIR' },
    { id: 'airways-cargo', label: 'Airways Cargo Logistics Online Booking Portal', icon: Box, color: 'text-amber-400', badge: 'AIR CARGO' },
    { id: 'airways-tracking', label: 'Airways Passenger Flight & Cargo Logistics Live Tracker', icon: Navigation, color: 'text-emerald-400', badge: 'AIR TRACKING' },
    { id: 'cruise-passenger', label: 'Marine Passenger Ticket Booking Portal (Combined)', icon: Ship, color: 'text-teal-400', badge: 'MARINE PASS' },
    { id: 'marine-passenger-domestic', label: 'Marine Domestic Passenger Ticket Booking Portal (Coastal/Ferry)', icon: Waves, color: 'text-teal-300', badge: 'DOMESTIC SEA' },
    { id: 'marine-passenger-international', label: 'Marine International Passenger Ticket Booking Portal (Cruises)', icon: Globe2, color: 'text-cyan-400', badge: 'INTL SEA' },
    { id: 'marine-cargo', label: 'Marine Cargo Logistics Online Booking Portal', icon: Container, color: 'text-emerald-400', badge: 'SEA CARGO' },
    { id: 'vessels-gps-tracker', label: 'Vessels GPS Live Navigation Tracker & AIS System', icon: Crosshair, color: 'text-rose-400', badge: 'VESSEL GPS' },
    { id: 'smart-fuel-optimizer', label: 'Smart Fuel & Speed Optimizer', icon: Fuel, color: 'text-amber-400', badge: 'CUBIC LAW' },
    { id: 'voyage-carbon-offset', label: 'Voyage Carbon Offset & Registry', icon: Award, color: 'text-emerald-400', badge: 'BLUE CO2' },
    { id: 'emergency-ar-overlay', label: 'Emergency AR Overlay & HUD', icon: Crosshair, color: 'text-rose-400', badge: 'FLIR HUD' },
    { id: 'offline-sync-status', label: 'Offline Sync & SatCom Cache', icon: Database, color: 'text-sky-400', badge: 'OFFLINE' },
    { id: 'smart-fleet-analytics', label: 'Smart Fleet Analytics & CII', icon: BarChart3, color: 'text-sky-400', badge: 'CII / EEXI' },
    { id: 'geofence-notification', label: 'Geofence Boundary & Siren', icon: ShieldAlert, color: 'text-rose-400', badge: 'SECTOR' },
    { id: 'digital-cargo-signature', label: 'Digital Cargo Signature & Seal', icon: FileCheck, color: 'text-teal-400', badge: 'SHA-256' },
    { id: 'safety-briefing', label: 'Safety Briefing & SOLAS Tool', icon: ShieldCheck, color: 'text-amber-400', badge: 'SOLAS' },
    { id: 'weather-impact-map', label: 'Weather Impact Map & Sea State', icon: CloudRain, color: 'text-cyan-400', badge: 'GIS' },
    { id: 'ai-analyst', label: 'AI Voice & Text Chatbot', icon: Bot, color: 'text-cyan-400', badge: 'AI VOICE' },
    { id: 'commercial-corridors', label: 'Commercial Shipping Corridors', icon: Globe2, color: 'text-cyan-400', badge: 'SLOCs' },
    { id: 'marine-utilities', label: 'Watchkeeper, Stability & Marine Suite', icon: ClipboardList, color: 'text-amber-400', badge: 'OOW SUITE' },
    { id: 'port-distance', label: 'Port-to-Port Distance Chart', icon: BarChart3, color: 'text-cyan-400', badge: 'CHARTS' },
    { id: 'location-nav-radio', label: 'Location & VHF Radio Nav', icon: Radio, color: 'text-cyan-400', badge: 'GPS/VHF' },
    { id: 'marine-weather-api', label: 'Marine Weather API', icon: CloudSun, color: 'text-cyan-400', badge: 'LIVE API' },
    { id: 'pwa-support', label: 'Offline PWA & Charts', icon: Download, color: 'text-teal-400', badge: 'OFFLINE' },
    { id: 'marine-ar-view', label: 'Marine AR HUD View', icon: Eye, color: 'text-rose-400', badge: 'AR HUD' },
    { id: 'marine-health', label: 'Marine Health Map', icon: Heart, color: 'text-emerald-400', badge: 'ECO' },
    { id: 'crew-welfare', label: 'Crew Welfare Portal', icon: Users, color: 'text-teal-400', badge: 'MLC 2006' },
    { id: 'emergency-drill', label: 'Emergency Drill Planner', icon: Siren, color: 'text-rose-400', badge: 'SOLAS' },
    { id: 'marine-logbook', label: 'Marine Deck Logbook', icon: BookOpen, color: 'text-cyan-400', badge: 'SOLAS' },
    { id: 'collision-avoidance', label: 'Collision Avoidance', icon: Crosshair, color: 'text-rose-400', badge: 'CPA/TCPA' },
    { id: 'ocean-soundscapes', label: 'Ocean Soundscapes', icon: Headphones, color: 'text-purple-400', badge: 'AUDIO' },
    { id: 'quick-notes', label: 'Captain Quick Notes', icon: StickyNote, color: 'text-emerald-400', badge: 'NOTES' },
    { id: 'smart-anchor', label: 'Smart Anchor Watch', icon: Anchor, color: 'text-amber-400', badge: 'GPS ALARM' },
    { id: 'port-traffic', label: 'Port Traffic Forecast', icon: Building2, color: 'text-cyan-400', badge: 'QUEUE' },
    { id: 'piracy-alert', label: 'Piracy Alert (PIR)', icon: Siren, color: 'text-rose-400', badge: 'PIR' },
    { id: 'nautical-chart', label: 'Nautical Chart View', icon: Map, color: 'text-purple-400', badge: 'ECDIS' },
    { id: 'ais-tracker', label: 'Vessels AIS Tracker', icon: Activity, color: 'text-cyan-400', badge: 'AIS' },
    { id: 'fuel-analytics', label: 'Fuel Analytics Graph', icon: BarChart3, color: 'text-emerald-400', badge: 'GRAPH' },
    { id: 'tourism', label: 'Tourism & Tickets', icon: Palmtree, color: 'text-emerald-400' },
    { id: 'path-optimizer', label: 'Vessels Path Optimizer', icon: Navigation, color: 'text-cyan-400' },
    { id: 'map-overlay', label: 'Interactive Map Overlay', icon: Layers, color: 'text-purple-400' },
    { id: 'port-checklist', label: 'Port Entry Checklist', icon: ClipboardList, color: 'text-emerald-400' },
    { id: 'weather-alert', label: 'Weather Alert', icon: Bell, color: 'text-rose-400' },
    { id: 'rescue-telecom', label: 'SOS Emergency', icon: LifeBuoy, color: 'text-rose-400', badge: 'SOS' },
    { id: 'tides', label: 'Visual Tide Analytics', icon: Waves, color: 'text-cyan-400' },
    { id: 'grounding', label: 'Search Grounding', icon: Anchor, color: 'text-amber-400' },
    { id: 'fuel-tracker', label: 'Marine Fuel Tracker', icon: Fuel, color: 'text-emerald-400' },
    { id: 'maritime-utilities', label: 'Vessel Alerts & Banks', icon: ShieldAlert, color: 'text-rose-400' },
    { id: 'fisheries', label: 'Fisheries & PFZ', icon: Fish, color: 'text-cyan-400' },
    { id: 'climate', label: 'Climate Watch', icon: ThermometerSun, color: 'text-amber-400', count: activeAlertCount },
    { id: 'route-radar', label: 'Route Radar', icon: Radio, color: 'text-rose-400' },
    { id: 'converter-translator', label: 'Rates & Translate', icon: DollarSign, color: 'text-amber-400' },
    { id: 'jobs-training', label: 'Jobs & Training', icon: Briefcase, color: 'text-emerald-400' },
    { id: 'timetable', label: 'Ports & Schedules', icon: Ship, color: 'text-cyan-400' },
    { id: 'nations', label: '8 Nations Directory', icon: Globe2, color: 'text-emerald-400' }
  ];

  const handleTabClick = (id: any) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header id="main-header" className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Brand & Mode Bar */}
          <div className="flex items-center justify-between h-16">
            {/* Logo & Branding */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/40 shadow-lg shadow-cyan-500/20 group shrink-0">
                <img
                  src={oceanBirdLogo}
                  alt="Ocean Bird Logo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                    OCEAN BIRD
                  </span>
                  <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-semibold border border-slate-700">
                    by Eastman Creation
                  </span>
                  <span className="hidden sm:flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>v3.4</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  South Asia & Indo-Pacific Navigation, Tourism, PFZ & Emergency Hub
                </p>
              </div>
            </div>

            {/* Right Desktop Quick Status & Theme Switcher */}
            <div className="flex items-center space-x-2">
              {/* Public Sign Up / Sign In Account Button */}
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setAuthLogoDefaultTab(loggedInUser ? 'profile' : 'signup');
                  setShowAuthLogoModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-black text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-cyan-500/20"
                title="Public Account Sign Up, Sign In & Passport Manager"
              >
                <UserPlus className="w-3.5 h-3.5 text-slate-950" />
                <span className="hidden sm:inline">
                  {loggedInUser ? loggedInUser.fullName.split(' ')[0] : 'PUBLIC SIGN UP'}
                </span>
              </button>

              {/* Public Logo & Branding Button */}
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setAuthLogoDefaultTab('logo-generator');
                  setShowAuthLogoModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md"
                title="Public Logo Vector Assets & White-Label Branding Suite"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">PUBLIC LOGO</span>
              </button>

              {/* Other Domain Links Hub Button */}
              {onOpenDomainLinks && (
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    onOpenDomainLinks();
                  }}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 text-teal-300 border border-teal-400/40 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-teal-500/10"
                  title="View & Open Other App Domain Links & External Web Portals"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-teal-400" />
                  <span className="hidden sm:inline">OTHER DOMAIN LINKS</span>
                </button>
              )}

              {/* Google Chrome Launch & Fix Button */}
              {onOpenChromeHelp && (
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    onOpenChromeHelp();
                  }}
                  className="px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-500/10"
                  title="Google Chrome Launch Guide, Direct URL & Diagnostic Fix"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                  <span className="hidden sm:inline">CHROME FIX & LAUNCH</span>
                </button>
              )}

              {/* Session Timer Widget */}
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setShowSessionModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md"
                title="Active Bridge Watch Duty Session Timer (Click to Manage)"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-mono text-cyan-300">{formatSessionTime(sessionSeconds)}</span>
              </button>

              {/* Battery Status Widget */}
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setShowBatteryModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md"
                title="Vessel Auxiliary Battery Bank & UPS Status"
              >
                {isCharging ? (
                  <BatteryCharging className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Battery className="w-4 h-4 text-emerald-400" />
                )}
                <span>{batteryLevel}%</span>
              </button>

              {/* Live Weather Quick Widget */}
              <button
                onClick={() => {
                  hapticEngine.trigger('click');
                  setShowWeatherModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md"
                title="Live Ocean Weather State Capsule"
              >
                <CloudSun className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">🌊 1.4m | 💨 18kts</span>
              </button>

              {/* Print Capability Button */}
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md"
                title="Print Current Maritime Page / Export PDF Report (Alt + P)"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">PRINT</span>
                <kbd className="hidden lg:inline-block text-[9px] bg-slate-950 px-1 py-0.1 rounded border border-slate-800 text-slate-400">Alt+P</kbd>
              </button>

              {onOpenSearch && (
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    onOpenSearch();
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md"
                  title="Smart AIS Search (Ctrl + K)"
                >
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">SEARCH</span>
                  <kbd className="hidden lg:inline-block text-[9px] bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800 text-slate-400">⌘K</kbd>
                </button>
              )}

              <AutoTranslationBar />

              {onOpenHapticSettings && (
                <button
                  onClick={() => {
                    hapticEngine.trigger('click');
                    onOpenHapticSettings();
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md"
                  title="Haptic Pulse Vibration Engine Settings"
                >
                  <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline">HAPTIC</span>
                </button>
              )}

              {onToggleOfflineCache && (
                <button
                  onClick={onToggleOfflineCache}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md border ${
                    isOfflineCacheActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Toggle Offline S-57 Nautical Chart Caching for Seafarers with Low Satellite Connection"
                >
                  {isOfflineCacheActive ? (
                    <>
                      <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">OFFLINE CACHE (84MB)</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3.5 h-3.5 text-slate-400" />
                      <span className="hidden sm:inline">LIVE STREAM</span>
                    </>
                  )}
                </button>
              )}

              {onToggleDarkMode && (
                <button
                  onClick={onToggleDarkMode}
                  className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md"
                  title="Toggle Light Bridge Day Mode / Dark Night Mode"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span className="hidden sm:inline">DAY MODE</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-cyan-400" />
                      <span className="hidden sm:inline">NIGHT MODE</span>
                    </>
                  )}
                </button>
              )}

              {onToggleAmbientMode && (
                <button
                  onClick={onToggleAmbientMode}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md border ${
                    isAmbientMode
                      ? 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Enable Bridge Red Night Vision Ambient Mode"
                >
                  <Eye className={`w-4 h-4 ${isAmbientMode ? 'text-rose-400' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">
                    {isAmbientMode ? 'AMBIENT RED (ON)' : 'AMBIENT MODE'}
                  </span>
                </button>
              )}

              {onOpenBiometricLogin && (
                <button
                  onClick={onOpenBiometricLogin}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-mono font-black text-xs flex items-center space-x-1.5 transition-all shadow-md"
                  title="Officer Biometric FIDO2 Login"
                >
                  <Fingerprint className="w-4 h-4 text-slate-950" />
                  <span className="hidden sm:inline">BIOMETRIC LOGIN</span>
                </button>
              )}

              <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-xs text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                <span>Responsive App Mode</span>
              </div>

              {/* Mobile Hamburger Drawer Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Smart Shortcuts Bar */}
          <div className="hidden md:flex items-center space-x-2 py-1.5 overflow-x-auto no-scrollbar border-t border-slate-800/80 bg-slate-950/60 px-2 rounded-lg my-1">
            <div className="flex items-center space-x-1 text-[10px] font-mono text-cyan-400 font-bold shrink-0 uppercase tracking-wider pr-2 border-r border-slate-800">
              <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>Smart Shortcuts:</span>
            </div>

            <button
              onClick={() => {
                setActiveTab('maritime-social-portal');
                showToast('Switched to Maritime Social Portal');
              }}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-[11px] font-bold shrink-0 transition-all hover:border-cyan-500/50"
              title="Alt + S"
            >
              <Share2 className="w-3 h-3 text-cyan-400" />
              <span>Social Portal</span>
              <kbd className="text-[9px] bg-slate-950 px-1 rounded text-slate-400 font-mono">Alt+S</kbd>
            </button>

            <button
              onClick={() => {
                setActiveTab('troubleshooter-super-master-agent');
                showToast('Switched to Troubleshooter AI Agent');
              }}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 text-[11px] font-bold shrink-0 transition-all hover:border-amber-500/50"
              title="Alt + T"
            >
              <Wrench className="w-3 h-3 text-amber-400" />
              <span>Troubleshooter</span>
              <kbd className="text-[9px] bg-slate-950 px-1 rounded text-slate-400 font-mono">Alt+T</kbd>
            </button>

            <button
              onClick={() => {
                setActiveTab('dark-mode-analytics');
                showToast('Switched to Analytics Dashboard');
              }}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800 text-[11px] font-bold shrink-0 transition-all hover:border-emerald-500/50"
              title="Alt + A"
            >
              <BarChart3 className="w-3 h-3 text-emerald-400" />
              <span>Analytics</span>
              <kbd className="text-[9px] bg-slate-950 px-1 rounded text-slate-400 font-mono">Alt+A</kbd>
            </button>

            <button
              onClick={() => {
                setActiveTab('automated-backup');
                showToast('Switched to Automated Backup Manager');
              }}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-800 text-[11px] font-bold shrink-0 transition-all hover:border-indigo-500/50"
              title="Alt + B"
            >
              <Database className="w-3 h-3 text-indigo-400" />
              <span>Auto-Backup</span>
              <kbd className="text-[9px] bg-slate-950 px-1 rounded text-slate-400 font-mono">Alt+B</kbd>
            </button>

            <button
              onClick={() => {
                setActiveTab('weather-alert');
                showToast('Switched to Weather Alert Monitor');
              }}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-[11px] font-bold shrink-0 transition-all hover:border-cyan-500/50"
              title="Alt + W"
            >
              <Bell className="w-3 h-3 text-rose-400" />
              <span>Weather</span>
              <kbd className="text-[9px] bg-slate-950 px-1 rounded text-slate-400 font-mono">Alt+W</kbd>
            </button>

            <button
              onClick={() => {
                setActiveTab('interactive-sos-locator');
                showToast('Switched to Emergency SOS');
              }}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 text-[11px] font-bold shrink-0 transition-all"
              title="Alt + E"
            >
              <LifeBuoy className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>Emergency SOS</span>
              <kbd className="text-[9px] bg-slate-950 px-1 rounded text-rose-300 font-mono">Alt+E</kbd>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 text-[11px] font-bold shrink-0 transition-all hover:border-amber-500/50"
              title="Alt + P"
            >
              <Printer className="w-3 h-3 text-amber-400" />
              <span>Print Page</span>
              <kbd className="text-[9px] bg-slate-950 px-1 rounded text-slate-400 font-mono">Alt+P</kbd>
            </button>
          </div>

          {/* Scrollable Navigation Pills Bar for Desktop & Tablet */}
          <div className="hidden xl:flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-800/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border border-teal-500/40 shadow-md shadow-teal-500/10'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] rounded-md bg-emerald-500/30 text-emerald-300 font-extrabold uppercase">
                      {item.badge}
                    </span>
                  )}
                  {item.count && item.count > 0 ? (
                    <span className="w-4 h-4 text-[10px] bg-amber-500 text-slate-950 font-black rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Slide-over Drawer for Tablet/Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end xl:hidden">
          <div className="w-4/5 max-w-sm bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-teal-400" />
                  <span className="font-extrabold text-sm text-white">App Navigation Hub</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                          : 'text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center space-y-2">
              <div className="text-[10px] text-slate-500">Seafarers & Maritime Portal App cum Website</div>
              <div className="text-xs text-teal-400 font-bold">24x7 IMO & Search-and-Rescue Operational</div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Bar on Mobile Devices (Touch Optimized) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 p-2 flex items-center justify-around xl:hidden shadow-2xl">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeTab === 'home' ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5 text-cyan-400" />
          <span>Home</span>
        </button>

        {onOpenSearch && (
          <button
            onClick={() => {
              hapticEngine.trigger('click');
              onOpenSearch();
            }}
            className="flex flex-col items-center p-1.5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-cyan-300 transition-all"
          >
            <Search className="w-5 h-5 mb-0.5 text-cyan-400" />
            <span>Search</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('tourism')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeTab === 'tourism' ? 'text-teal-400 bg-teal-500/10' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palmtree className="w-5 h-5 mb-0.5" />
          <span>Tourism</span>
        </button>

        <button
          onClick={() => setActiveTab('rescue-telecom')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeTab === 'rescue-telecom' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 hover:text-white'
          }`}
        >
          <LifeBuoy className="w-5 h-5 mb-0.5 text-rose-400 animate-pulse" />
          <span>SOS Help</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center p-1.5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>More</span>
        </button>
      </nav>

      {/* TOAST NOTICE BANNER */}
      {toastNotice && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2 animate-fadeIn">
          <CheckSquare className="w-4 h-4 text-cyan-400" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* SESSION TIMER MODAL */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 max-w-md w-full text-center space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
                <Clock className="w-4 h-4" />
                <span>Bridge Watch Duty Session Timer</span>
              </div>
              <button
                onClick={() => setShowSessionModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-2">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Active Bridge Duty Uptime</span>
              <div className="text-3xl font-black text-cyan-300 font-mono tracking-widest">
                {formatSessionTime(sessionSeconds)}
              </div>
              <p className="text-[10px] text-emerald-400 font-mono">Watch Officer Duty Shift • 4-Hour Watch Cycle</p>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => {
                  setIsSessionRunning(!isSessionRunning);
                  hapticEngine.trigger('click');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  isSessionRunning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {isSessionRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isSessionRunning ? 'PAUSE TIMER' : 'RESUME TIMER'}</span>
              </button>

              <button
                onClick={() => {
                  setSessionSeconds(0);
                  hapticEngine.trigger('click');
                  showToast('Bridge Watch Duty Timer Reset to 00:00:00');
                }}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESET</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BATTERY STATUS MODAL */}
      {showBatteryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase">
                <BatteryCharging className="w-4 h-4" />
                <span>Vessel Auxiliary Battery & UPS Telemetry</span>
              </div>
              <button
                onClick={() => setShowBatteryModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Charge State:</span>
                <span className="text-sm font-black text-emerald-300 font-mono">{batteryLevel}% ({isCharging ? 'Charging ⚡' : 'Discharging'})</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
                  style={{ width: `${batteryLevel}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 font-mono">
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">Est. Backup Time:</span>
                  <span className="text-white font-bold">6h 15m Remaining</span>
                </div>
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">System Voltage:</span>
                  <span className="text-white font-bold">24.2 V DC</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center font-mono">
              Bridge ECDIS, SatCom Terminal, and GMDSS Radio are connected to UPS #1 Bank.
            </p>
          </div>
        </div>
      )}

      {/* LIVE WEATHER QUICK MODAL */}
      {showWeatherModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
                <CloudSun className="w-4 h-4" />
                <span>Live High-Seas Weather Capsule</span>
              </div>
              <button
                onClick={() => setShowWeatherModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px]">Significant Wave</span>
                <p className="text-sm font-bold text-cyan-300">🌊 1.4 meters</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px]">Wind Velocity</span>
                <p className="text-sm font-bold text-emerald-300">💨 18 kts SW</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px]">Barometric Pressure</span>
                <p className="text-sm font-bold text-amber-300">1013.2 hPa</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px]">Sea Surface Temp</span>
                <p className="text-sm font-bold text-rose-300">🌡️ 28.4 °C</p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowWeatherModal(false);
                setActiveTab('weather-alert');
                hapticEngine.trigger('click');
              }}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>OPEN FULL WEATHER RADAR MONITOR</span>
            </button>
          </div>
        </div>
      )}

      {/* Public Signup & Logo Modal Portal */}
      <PublicAuthLogoPortal
        isOpen={showAuthLogoModal}
        onClose={() => setShowAuthLogoModal(false)}
        defaultTab={authLogoDefaultTab}
        onAccountUpdate={(user) => setLoggedInUser(user)}
      />
    </>
  );
};



