import React, { useState, useEffect } from 'react';
import { NavTabType } from './Navbar';
import {
  Cloud,
  CloudCog,
  Server,
  Database,
  Activity,
  Cpu,
  Globe,
  Radio,
  Search,
  Zap,
  HardDrive,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  LayoutDashboard,
  ShieldCheck,
  Terminal,
  Grid,
  Layers,
  Compass,
  Ship,
  Award,
  Fingerprint,
  Smartphone,
  Navigation,
  Briefcase,
  FileText,
  CreditCard,
  Ticket,
  Hotel,
  Bell,
  Siren,
  Users,
  Calendar,
  CloudSun,
  Eye,
  Printer,
  Languages,
  Gauge,
  Newspaper,
  Wrench,
  Mic,
  Heart,
  Waves,
  PlaneTakeoff,
  Box,
  Container,
  Fuel,
  BarChart3,
  ShieldAlert,
  FileCheck,
  CloudRain,
  Bot,
  Truck,
  Key,
  Building2,
  Leaf,
  Clock,
  Globe2,
  Brain,
  Sparkles,
  QrCode,
  Scan,
  MapPin,
  ClipboardList,
  Download,
  BookOpen,
  Crosshair,
  Headphones,
  StickyNote,
  Anchor,
  Map,
  Palmtree,
  LifeBuoy,
  Fish,
  ThermometerSun,
  DollarSign,
  Wifi,
  WifiOff,
  ExternalLink,
  ChevronRight,
  Lock
} from 'lucide-react';

interface CloudStructuredDashboardViewProps {
  onNavigateToTab: (tabId: NavTabType) => void;
  activeAlertCount?: number;
  isOfflineCacheActive?: boolean;
}

interface CloudMicroservice {
  id: string;
  name: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
  latencyMs: number;
  uptime: string;
  region: string;
  iops: number;
}

interface CloudModuleCategory {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  badgeColor: string;
  items: {
    tabId: NavTabType;
    label: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    badge: string;
    color: string;
    cloudStatus: 'ACTIVE' | 'SYNCED' | 'STANDBY';
  }[];
}

export const CloudStructuredDashboardView: React.FC<CloudStructuredDashboardViewProps> = ({
  onNavigateToTab,
  activeAlertCount = 5,
  isOfflineCacheActive = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeCloudRegion, setActiveCloudRegion] = useState<string>('asia-southeast1 (Singapore)');
  const [isSimulatingSync, setIsSimulatingSync] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('JUST NOW (0s ago)');
  const [logFilter, setLogFilter] = useState<'ALL' | 'INFO' | 'WARN' | 'SATELLITE'>('ALL');
  const [consoleLogs, setConsoleLogs] = useState<Array<{ id: string; time: string; type: 'INFO' | 'WARN' | 'SATELLITE'; text: string }>>([
    { id: '1', time: '23:48:02 UTC', type: 'SATELLITE', text: 'Inmarsat FleetXpress SATCOM Link: Downlink 12.4 Mbps, Uplink 4.8 Mbps [STRONG]' },
    { id: '2', time: '23:48:05 UTC', type: 'INFO', text: 'Cloud Firestore Database: Synced 1,240 Vessel GPS coordinates across 8 ocean basins.' },
    { id: '3', time: '23:48:10 UTC', type: 'WARN', text: 'NOAA Swell Alert Pipeline: Wave height spike detected in Bay of Bengal (3.8m).' },
    { id: '4', time: '23:48:15 UTC', type: 'INFO', text: 'AIS Ground Station Gateway: Streamed 14,890 NMEA-0183 sentences to Cloud Analytics engine.' },
    { id: '5', time: '23:48:18 UTC', type: 'SATELLITE', text: 'Starlink Maritime Direct Terminal: Latency 28ms to Singapore Edge Cluster.' }
  ]);

  const [microservices, setMicroservices] = useState<CloudMicroservice[]>([
    { id: 'srv-1', name: 'AIS Live Decoder Gateway', status: 'OPERATIONAL', latencyMs: 14, uptime: '99.99%', region: 'asia-southeast1', iops: 4200 },
    { id: 'srv-2', name: 'NOAA & USGS GIS Pipeline', status: 'OPERATIONAL', latencyMs: 22, uptime: '99.95%', region: 'us-east4', iops: 1850 },
    { id: 'srv-3', name: 'SOLAS SOS & Rescue Dispatch', status: 'OPERATIONAL', latencyMs: 8, uptime: '100.00%', region: 'europe-west3', iops: 620 },
    { id: 'srv-4', name: 'Weather Satellite Raster Cache', status: 'OPERATIONAL', latencyMs: 31, uptime: '99.92%', region: 'ap-south1', iops: 3100 },
    { id: 'srv-5', name: 'Digital Visa & Payment Gateway', status: 'OPERATIONAL', latencyMs: 19, uptime: '99.98%', region: 'asia-southeast1', iops: 940 },
    { id: 'srv-6', name: 'AI Voice & LLM Inference Node', status: 'OPERATIONAL', latencyMs: 45, uptime: '99.90%', region: 'us-east4', iops: 1280 }
  ]);

  // Periodic simulated live logs generator
  useEffect(() => {
    const interval = setInterval(() => {
      const times = new Date().toISOString().replace('T', ' ').substring(11, 19) + ' UTC';
      const templates = [
        { type: 'INFO' as const, text: `Cloud Firestore: Batch commit executed for AIS vessel position cache (${Math.floor(Math.random() * 50 + 10)} records).` },
        { type: 'SATELLITE' as const, text: `Iridium Certus Satellite Relay: Handshake completed with MMSI 419001284 [Ping ${Math.floor(Math.random() * 20 + 20)}ms].` },
        { type: 'WARN' as const, text: `Geofence Monitor: Vessel entered high-density traffic corridor near Malacca Strait.` },
        { type: 'INFO' as const, text: `e-Visa Gateway: Verified biometric token for crew member transit passport.` }
      ];
      const randomLog = templates[Math.floor(Math.random() * templates.length)];
      setConsoleLogs((prev) => [{ id: `log-${Date.now()}`, time: times, ...randomLog }, ...prev].slice(0, 15));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleManualCloudSync = () => {
    setIsSimulatingSync(true);
    setTimeout(() => {
      setIsSimulatingSync(false);
      setLastSyncTime('JUST NOW (Synced)');
      const timeNow = new Date().toISOString().replace('T', ' ').substring(11, 19) + ' UTC';
      setConsoleLogs((prev) => [
        { id: `sync-${Date.now()}`, time: timeNow, type: 'INFO', text: 'FULL CLOUD SNAPSHOT SYNCED: All local offline caches & SOLAS logs mirrored to cloud database.' },
        ...prev
      ]);
    }, 1500);
  };

  const cloudCategories: CloudModuleCategory[] = [
    {
      id: 'terminal-emergency-stowage',
      title: 'Terminal Check-In, Stowage, Port GIS & Emergency SOS',
      description: 'STCW QR gate pass check-in, visual 3D stowage bay load planner, interactive port terminal GIS map & pulsing Mayday SOS pulse.',
      icon: Siren,
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
      items: [
        { tabId: 'qr-check-in', label: 'Smart QR Terminal Check-In & Gate Pass', description: 'STCW seafarer shore pass & ISO 17712 container seal QR scanner', icon: QrCode, badge: 'QR GATE', color: 'text-cyan-400', cloudStatus: 'ACTIVE' },
        { tabId: 'smart-load-planner', label: 'Smart Load & Stowage Bay Planner', icon: Box, description: 'Container bay weight grid, IMDG rules & GM stability optimizer', badge: 'STOWAGE AI', color: 'text-amber-400', cloudStatus: 'ACTIVE' },
        { tabId: 'interactive-port-map', label: 'Interactive Port Terminal GIS Map', description: 'Live berth occupancy, crane moves/hr & depth soundings map', icon: MapPin, badge: 'PORT GIS', color: 'text-emerald-400', cloudStatus: 'ACTIVE' },
        { tabId: 'emergency-sos-pulse', label: 'Emergency SOS Pulse & Mayday Telemetry', description: 'Pulsing EPIRB distress signal & Coast Guard MRCC payload', icon: Siren, badge: 'MAYDAY SOS', color: 'text-rose-400', cloudStatus: 'ACTIVE' }
      ]
    },
    {
      id: 'animated-command-ai',
      title: 'Animated Radar, Multi-Model AI & Automated Auditing',
      description: 'Master command animated dashboard, neural model fusion, alert history archive & IMO regulation checks.',
      icon: Sparkles,
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
      items: [
        { tabId: 'animated-dashboard', label: 'Animated Command & Radar Dashboard', description: 'Real-time multi-dimensional sweeping radar & live telemetry', icon: Sparkles, badge: 'LIVE RADAR', color: 'text-cyan-400', cloudStatus: 'ACTIVE' },
        { tabId: 'multi-model-analytics', label: 'Multi-Model AI Analytics', description: 'Gemini 1.5, ECMWF & Claude 3.5 neural ensemble benchmarks', icon: Brain, badge: '4 AI MODELS', color: 'text-indigo-400', cloudStatus: 'ACTIVE' },
        { tabId: 'predictive-alert-history', label: 'Predictive Alert History', description: 'Historical post-event verification & damage mitigation logs', icon: Clock, badge: 'HISTORICAL', color: 'text-blue-400', cloudStatus: 'ACTIVE' },
        { tabId: 'automated-regulation-check', label: 'Automated Regulation Check', description: 'IMO CII rating, MARPOL Annex VI & EU ETS carbon compliance', icon: FileCheck, badge: 'IMO AUDIT', color: 'text-emerald-400', cloudStatus: 'ACTIVE' }
      ]
    },
    {
      id: 'supply-crisis-auth',
      title: 'Smart Supply Chain, Crisis Simulation & Enterprise Auth',
      description: 'Container logistics tracking, crisis drill engine, enterprise passkey authentication & global utility grid forecast.',
      icon: Truck,
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      items: [
        { tabId: 'smart-supply-chain', label: 'Smart Supply Chain Dashboard', description: 'TEU container telemetry, reefer temperature & AI dispatch bypass', icon: Truck, badge: 'TEU AI', color: 'text-amber-400', cloudStatus: 'ACTIVE' },
        { tabId: 'crisis-simulation', label: 'Crisis Simulation Engine', description: 'Interactive multi-scenario disaster drill simulator & decision tree', icon: Siren, badge: 'DRILL', color: 'text-rose-400', cloudStatus: 'ACTIVE' },
        { tabId: 'industry-auth-bridge', label: 'Industry Auth Bridge & Passkeys', description: 'IMO vessel ID, Port OAuth2, SAML SSO & FIDO2 biometric passkeys', icon: Key, badge: 'SSO / FIDO2', color: 'text-cyan-400', cloudStatus: 'ACTIVE' },
        { tabId: 'global-utility-forecast', label: 'Global Utility Forecast & Grid Radar', description: 'Shore power MW capacity, LNG bunkering rates & water reserves', icon: Building2, badge: 'GRID / LNG', color: 'text-emerald-400', cloudStatus: 'ACTIVE' }
      ]
    },
    {
      id: 'fleet-tracking',
      title: 'Global Fleet & AIS Telemetry Cloud',
      description: 'Real-time worldwide satellite tracking, AIS feeds, vessel locations & shipping corridors.',
      icon: Globe,
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
      items: [
        { tabId: 'global-fleet-map', label: 'Global Fleet Map', description: 'Interactive worldwide map of merchant & passenger fleets', icon: Globe, badge: 'WORLD MAP', color: 'text-cyan-400', cloudStatus: 'ACTIVE' },
        { tabId: 'global-fleet-tracker', label: 'Airways & Fleet Location Tracker', description: 'Live GPS & AIS positioning for air/sea transit', icon: Navigation, badge: 'GPS/AIS', color: 'text-sky-400', cloudStatus: 'ACTIVE' },
        { tabId: 'ais-tracker', label: 'Vessels AIS Tracker', description: 'NMEA-0183 live stream decoder & vessel AIS details', icon: Activity, badge: 'AIS STREAM', color: 'text-cyan-400', cloudStatus: 'SYNCED' },
        { tabId: 'commercial-corridors', label: 'Commercial Shipping Corridors', description: 'SLOCs, maritime pinch points & choke zone traffic', icon: Globe2, badge: 'SLOCs', color: 'text-cyan-400', cloudStatus: 'SYNCED' },
        { tabId: 'port-distance', label: 'Port-to-Port Distance Chart', description: 'Nautical miles calculator & voyage turnarounds', icon: BarChart3, badge: 'CHARTS', color: 'text-cyan-400', cloudStatus: 'SYNCED' },
        { tabId: 'vessel-arrival-notifications', label: 'Vessel Arrival Alerts', description: 'Dispatch notifications, ETA alerts & harbour feeds', icon: Bell, badge: 'NOTIFY', color: 'text-amber-400', cloudStatus: 'ACTIVE' }
      ]
    },
    {
      id: 'weather-climate',
      title: 'Oceanography & Weather GIS Cloud Engine',
      description: 'Severe storm alerts, USGS seismic warnings, wave swells, tides & climate GIS analytics.',
      icon: CloudRain,
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      items: [
        { tabId: 'tsunami-earthquake-warning', label: 'Tsunami & Earthquake Warning Center', description: 'USGS live seismic feeds & ocean tsunami siren alerts', icon: Waves, badge: 'TSUNAMI/USGS', color: 'text-rose-400', cloudStatus: 'ACTIVE' },
        { tabId: 'climate', label: 'Climate Watch', description: 'Regional climate advisories & cyclone tracking', icon: ThermometerSun, badge: 'CLIMATE', color: 'text-amber-400', cloudStatus: 'ACTIVE' },
        { tabId: 'weather-impact-map', label: 'Weather Impact Map & Sea State', description: 'Wind vector overlays, wave heights & storm paths', icon: CloudRain, badge: 'GIS RASTER', color: 'text-cyan-400', cloudStatus: 'SYNCED' },
        { tabId: 'weather-timeline-trends', label: 'Weather Timeline & Port Trends', description: 'Historical port barometric pressure & wave trends', icon: CloudSun, badge: 'FORECAST', color: 'text-cyan-400', cloudStatus: 'SYNCED' },
        { tabId: 'tides', label: 'Visual Tide Analytics', description: 'High/low tide height curves & astronomical tidal data', icon: Waves, badge: 'TIDAL GIS', color: 'text-cyan-400', cloudStatus: 'SYNCED' },
        { tabId: 'marine-weather-api', label: 'Marine Weather Live API', description: 'API endpoints for wave height, swell & sea surface temp', icon: CloudSun, badge: 'LIVE API', color: 'text-cyan-400', cloudStatus: 'ACTIVE' }
      ]
    },
    {
      id: 'safety-emergency',
      title: 'SOLAS Safety, Piracy & Emergency Microservices',
      description: '24/7 SAR dispatch, piracy threat intelligence, AR HUD emergency overlays & safety briefings.',
      icon: Siren,
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
      items: [
        { tabId: 'interactive-sos-locator', label: 'Interactive SOS & Rescue Locator', description: 'GMDSS station search & Coast Guard rescue beacon', icon: Siren, badge: 'SOS RADAR', color: 'text-rose-400', cloudStatus: 'ACTIVE' },
        { tabId: 'rescue-telecom', label: 'Seafarer Rescue Telecom', icon: LifeBuoy, description: 'Satellite distress calling & VHF CH 16 bridge emergency', badge: 'GMDSS', color: 'text-rose-400', cloudStatus: 'ACTIVE' },
        { tabId: 'piracy-alert', label: 'Marine Piracy Alert (PIR)', description: 'IMB Piracy Reporting Centre real-time incident map', icon: ShieldAlert, badge: 'PIRACY', color: 'text-rose-400', cloudStatus: 'ACTIVE' },
        { tabId: 'collision-avoidance', label: 'Collision Avoidance (CPA/TCPA)', description: 'Radar target vectors, closest point of approach warning', icon: Crosshair, badge: 'CPA/TCPA', color: 'text-rose-400', cloudStatus: 'SYNCED' },
        { tabId: 'geofence-notification', label: 'Geofence Boundary & Siren', description: 'Automated perimeter detection & territorial water alarm', icon: ShieldAlert, badge: 'SECTOR', color: 'text-rose-400', cloudStatus: 'ACTIVE' },
        { tabId: 'emergency-ar-overlay', label: 'Emergency AR Overlay HUD', description: 'FLIR thermal night camera HUD for man-overboard rescue', icon: Eye, badge: 'FLIR HUD', color: 'text-rose-400', cloudStatus: 'STANDBY' }
      ]
    },
    {
      id: 'vessel-engineering',
      title: 'Vessel Engineering, ECDIS & AI Operations',
      description: 'Predictive maintenance ML models, fuel optimizers, digital logbooks & anchor watches.',
      icon: Wrench,
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      items: [
        { tabId: 'predictive-maintenance', label: 'AI Predictive Maintenance', description: 'Machine learning RUL models for diesel engines & pumps', icon: Wrench, badge: 'AI ML', color: 'text-cyan-400', cloudStatus: 'ACTIVE' },
        { tabId: 'vessels-health-logs', label: 'Vessels Health & Subsystem Logbook', description: 'Engine oil pressure, generator loads & battery telemetry', icon: Heart, badge: 'HEALTH LOG', color: 'text-emerald-400', cloudStatus: 'ACTIVE' },
        { tabId: 'smart-fuel-optimizer', label: 'Smart Fuel & Speed Optimizer', description: 'Cubic law speed curve optimization & fuel saver', icon: Fuel, badge: 'CUBIC LAW', color: 'text-amber-400', cloudStatus: 'SYNCED' },
        { tabId: 'marine-logbook', label: 'Marine Deck Logbook', description: 'SOLAS official deck log, watchkeeper sign-offs & weather', icon: BookOpen, badge: 'SOLAS', color: 'text-cyan-400', cloudStatus: 'SYNCED' },
        { tabId: 'smart-anchor', label: 'Smart Anchor Watch Alarm', description: 'GPS drag alarm, swinging circle radius & seabed depth', icon: Anchor, badge: 'GPS ALARM', color: 'text-amber-400', cloudStatus: 'SYNCED' },
        { tabId: 'nautical-chart', label: 'Nautical Vector Chart View', description: 'S-57/S-63 ECDIS vector layers & bathymetric depth contours', icon: Map, badge: 'ECDIS', color: 'text-purple-400', cloudStatus: 'ACTIVE' }
      ]
    },
    {
      id: 'passenger-commercial',
      title: 'Commercial Portals, e-Visa & Online Bookings',
      description: 'Airways/marine tickets, port hotels, online visa application & crypto/fiat payment gateways.',
      icon: Ticket,
      badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
      items: [
        { tabId: 'online-visa-application', label: 'Online Visa Application Portal', description: 'e-Visa processing, crew transit permits & passport upload', icon: FileText, badge: 'E-VISA', color: 'text-amber-400', cloudStatus: 'ACTIVE' },
        { tabId: 'digital-passport', label: 'Digital Passport & Seaman Book Credential', description: 'ICAO e-Passport, CDC seaman book, biometric QR & border stamps', icon: Fingerprint, badge: 'E-PASSPORT', color: 'text-indigo-400', cloudStatus: 'ACTIVE' },
        { tabId: 'app-store-release', label: 'App Store Metadata, Privacy Policy & Version Tracker', description: 'Google Play Console launch guide, store metadata, privacy model & version changelog', icon: Smartphone, badge: 'PLAY CONSOLE', color: 'text-sky-400', cloudStatus: 'ACTIVE' },
        { tabId: 'app-licence-issuer', label: 'Software Commercial License & Key Issuer', description: 'Enterprise software license key generator, cryptographic signature & seat manager', icon: Key, badge: 'LICENSE ISSUER', color: 'text-amber-400', cloudStatus: 'ACTIVE' },
        { tabId: 'app-ownership-deed', label: 'Application Master Ownership & IP Title Deed', description: 'Official digital app ownership deed, copyright filing, owner registration & RSA-4096 signature', icon: ShieldCheck, badge: 'OWNERSHIP DEED', color: 'text-emerald-400', cloudStatus: 'ACTIVE' },
        { tabId: 'crew-certification', label: 'Seafarer Crew STCW Certification & Endorsement Matrix', description: 'IMO STCW 2010 Certificate of Competency, CDC seaman book expiry & Flag State verification', icon: Award, badge: 'STCW MATRIX', color: 'text-indigo-400', cloudStatus: 'ACTIVE' },
        { tabId: 'port-drone-support', label: 'Autonomous Port Drone Inspection & Cargo Operations', description: 'Harbor drone fleet radar, ship hull ultrasonic thickness survey & anchorage light cargo dispatch', icon: Radio, badge: 'PORT DRONES', color: 'text-sky-400', cloudStatus: 'ACTIVE' },
        { tabId: 'maritime-esg-report', label: 'Maritime ESG & Sustainability Environmental Report', description: 'IMO CII Grade A rating, MARPOL CO2 emissions & MLC 2006 compliance', icon: Leaf, badge: 'IMO ESG', color: 'text-emerald-400', cloudStatus: 'ACTIVE' },
        { tabId: 'vessels-cybersec', label: 'Vessels Cyber-Security & IT/OT Check', description: 'IMO MSC.428(98) vessel cybersecurity audit, ECDIS anti-spoofing & SATCOM firewall', icon: ShieldAlert, badge: 'CYBER RISK', color: 'text-rose-400', cloudStatus: 'ACTIVE' },
        { tabId: 'port-authority-chatbot', label: 'Port Authority AI Harbormaster Chatbot', description: 'Interactive AI port agent for berthing, customs clearance & pilotage dispatch', icon: Bot, badge: 'HARBOR AI', color: 'text-sky-400', cloudStatus: 'ACTIVE' },
        { tabId: 'supply-chain-delays', label: 'Real-Time Supply Chain & Port Delay Tracker', description: 'Global seaport berth congestion, container backlog radar & AI ETA predictor', icon: Clock, badge: 'BOTTLENECK', color: 'text-amber-400', cloudStatus: 'ACTIVE' },
        { tabId: 'trip-planner', label: 'AI Multi-Modal Trip Planner', description: 'Multi-leg flight, cruise, hotel & ferry itinerary optimizer with budget calculator', icon: Compass, badge: 'TRIP PLAN', color: 'text-sky-400', cloudStatus: 'ACTIVE' },
        { tabId: 'loyalty-rewards', label: 'Frequent Flyer & Mariner Loyalty Club', description: 'Mariner miles tracking, tier status rewards, perks & suite upgrades', icon: Award, badge: 'REWARDS', color: 'text-amber-400', cloudStatus: 'ACTIVE' },
        { tabId: 'online-payment-gateway', label: 'Online Payment Gateway', description: 'Secure checkout for port fees, bunker fuels & bookings', icon: CreditCard, badge: 'GATEWAY', color: 'text-emerald-400', cloudStatus: 'ACTIVE' },
        { tabId: 'digital-booking-manager', label: 'Digital Booking & PDF Tickets', description: 'Passenger ticket manager & instant PDF receipt issuer', icon: Ticket, badge: 'PAYMENT/PDF', color: 'text-emerald-400', cloudStatus: 'ACTIVE' },
        { tabId: 'hotel-booking-portal', label: 'Port Hotels & Layover Stays', description: 'Crew layover rooms & seafarer harbour hotel bookings', icon: Hotel, badge: 'HOTELS', color: 'text-sky-400', cloudStatus: 'SYNCED' },
        { tabId: 'airways-passenger', label: 'Airways Passenger Portal', description: 'International & domestic flight bookings for crew transit', icon: PlaneTakeoff, badge: 'AIR PASS', color: 'text-sky-400', cloudStatus: 'ACTIVE' },
        { tabId: 'marine-cargo', label: 'Marine Cargo & Courier Logistics', description: 'Container tracking, bill of lading & customs clearance', icon: Container, badge: 'SEA CARGO', color: 'text-emerald-400', cloudStatus: 'ACTIVE' }
      ]
    },
    {
      id: 'cloud-utilities',
      title: 'Cloud Infrastructure, Voice AI & Offline S-57 Cache',
      description: 'Voice STCW commands, AI chatbot, multi-language dictionary, backup & PDF report generator.',
      icon: CloudCog,
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      items: [
        { tabId: 'ai-analyst', label: 'AI Voice & Text Assistant', description: 'Gemini-powered maritime intelligence voice chatbot', icon: Bot, badge: 'AI VOICE', color: 'text-cyan-400', cloudStatus: 'ACTIVE' },
        { tabId: 'voice-activated-command', label: 'Voice Activated Commands', description: 'STCW bridge voice commands & hands-free controls', icon: Mic, badge: 'VOICE STCW', color: 'text-rose-400', cloudStatus: 'ACTIVE' },
        { tabId: 'offline-maps', label: 'Offline Vector Charts Manager', description: 'S-57 chart tile cache for low satellite bandwidth', icon: HardDrive, badge: 'S-57 CACHE', color: 'text-emerald-400', cloudStatus: 'SYNCED' },
        { tabId: 'fleet-reports', label: 'Fleet Reports & SOLAS Audit', description: 'Export PDF/CSV inspection reports & bridge log digests', icon: Printer, badge: 'PDF/CSV', color: 'text-cyan-400', cloudStatus: 'ACTIVE' },
        { tabId: 'automated-backup', label: 'Automated Encrypted Backup', description: 'Automated cloud snapshot, restore points & cron backups', icon: Database, badge: 'BACKUP', color: 'text-cyan-400', cloudStatus: 'ACTIVE' },
        { tabId: 'performance-dashboard', label: 'Application Performance Dashboard', description: 'System health, 60 FPS rendering metrics & memory load', icon: Gauge, badge: '60 FPS', color: 'text-emerald-400', cloudStatus: 'ACTIVE' }
      ]
    }
  ];

  // Filtered list based on search and category
  const filteredCategories = cloudCategories.map((cat) => {
    if (selectedCategory !== 'ALL' && cat.id !== selectedCategory) {
      return { ...cat, items: [] };
    }

    const filteredItems = cat.items.filter((item) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    });

    return { ...cat, items: filteredItems };
  }).filter((cat) => cat.items.length > 0);

  const totalServicesCount = cloudCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* CLOUD DASHBOARD HERO HEADER & CLUSTER TOPOLOGY */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-extrabold text-xs flex items-center space-x-1.5">
                <Cloud className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>OCEAN BIRD CLOUD ARCHITECTURE v3.4</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>MULTI-REGION ACTIVE</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs flex items-center space-x-1">
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                <span>SATELLITE SYNC OK</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Structured Cloud Operational Dashboard & Microservice Hub
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Centralized cloud-native command console providing instant access to {totalServicesCount}+ maritime services, real-time satellite telemetry, USGS earthquake warnings, SOLAS emergency dispatch, and AI predictive engines.
            </p>
          </div>

          {/* Right Action & Cloud Region Controls */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shrink-0 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>CLOUD REGION NODE</span>
              </span>
              <span className="text-emerald-400 font-mono">100% ONLINE</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold block">PRIMARY EXECUTION REGION:</label>
              <select
                value={activeCloudRegion}
                onChange={(e) => setActiveCloudRegion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-cyan-300 font-bold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400"
              >
                <option value="asia-southeast1 (Singapore)">asia-southeast1 (Singapore - Primary)</option>
                <option value="ap-south1 (Mumbai)">ap-south1 (Mumbai - South Asia Hub)</option>
                <option value="europe-west3 (Frankfurt)">europe-west3 (Frankfurt - IMO Center)</option>
                <option value="us-east4 (N. Virginia)">us-east4 (N. Virginia - AI Node)</option>
              </select>
            </div>

            <div className="pt-1 flex items-center justify-between gap-2">
              <button
                onClick={handleManualCloudSync}
                disabled={isSimulatingSync}
                className="w-full py-2 px-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-lg disabled:opacity-50 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-slate-950 ${isSimulatingSync ? 'animate-spin' : ''}`} />
                <span>{isSimulatingSync ? 'SYNCING CLOUD...' : 'FORCE CLOUD SNAPSHOT SYNC'}</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-400 font-mono text-center pt-1">
              LAST SNAPSHOT: <strong className="text-slate-200">{lastSyncTime}</strong>
            </div>
          </div>
        </div>

        {/* Quick Cloud Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-between">
              <span>CLOUD SERVICES</span>
              <Grid className="w-3.5 h-3.5 text-cyan-400" />
            </span>
            <div className="text-xl font-black text-white">{totalServicesCount} ACTIVE</div>
            <span className="text-[10px] text-emerald-400 font-semibold block">6 Modular Categories</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-between">
              <span>ACTIVE CLIMATE ALERTS</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            </span>
            <div className="text-xl font-black text-amber-300">{activeAlertCount} CRITICAL</div>
            <span className="text-[10px] text-slate-400 font-semibold block">USGS & NOAA Feeds</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-between">
              <span>OFFLINE CHART CACHE</span>
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <div className="text-xl font-black text-emerald-300">{isOfflineCacheActive ? '84 MB CACHED' : 'DISABLED'}</div>
            <span className="text-[10px] text-emerald-400 font-semibold block">S-57 Vector Contours</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block flex items-center justify-between">
              <span>AVG API LATENCY</span>
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            </span>
            <div className="text-xl font-black text-cyan-300">18 ms</div>
            <span className="text-[10px] text-cyan-400 font-semibold block">Edge CDN Network</span>
          </div>
        </div>
      </div>

      {/* FAST CLOUD COMMAND SEARCH & CATEGORY FILTER MATRIX */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all cloud services, tools, APIs, bookings, or portals (e.g. 'tsunami', 'visa', 'ai', 'fuel')..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              ALL MODULES ({totalServicesCount})
            </button>
            {cloudCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.title.split(' ')[0]} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STRUCTURED CLOUD MODULES CATEGORIES GRID */}
      <div className="space-y-6">
        {filteredCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.id} className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-2xl border ${category.badgeColor}`}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-white">{category.title}</h2>
                    <p className="text-xs text-slate-400">{category.description}</p>
                  </div>
                </div>

                <span className="text-xs text-slate-500 font-mono self-start sm:self-auto">
                  {category.items.length} SERVICES AVAILABLE
                </span>
              </div>

              {/* Grid of Services in Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.tabId}
                      onClick={() => onNavigateToTab(item.tabId)}
                      className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 hover:shadow-xl hover:shadow-cyan-500/5"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40">
                              <ItemIcon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <span className="font-extrabold text-xs text-white group-hover:text-cyan-300 transition-colors">
                              {item.label}
                            </span>
                          </div>

                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-slate-950 border border-slate-800 text-cyan-300">
                            {item.badge}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                        <span className="flex items-center space-x-1 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>{item.cloudStatus}</span>
                        </span>

                        <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center space-x-0.5">
                          <span>LAUNCH SERVICE</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* CLOUD MICROSERVICES HEALTH & TELEMETRY MONITOR */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>CLOUD MICROSERVICES INFRASTRUCTURE & API NODES</span>
          </div>

          <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>6 / 6 NODES HEALTHY (0 CRITICAL FAULTS)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {microservices.map((srv) => (
            <div key={srv.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <strong className="text-white font-bold">{srv.name}</strong>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  {srv.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-400 pt-1">
                <div>
                  <span className="block">LATENCY</span>
                  <strong className="text-cyan-300 font-bold">{srv.latencyMs}ms</strong>
                </div>
                <div>
                  <span className="block">UPTIME</span>
                  <strong className="text-emerald-400 font-bold">{srv.uptime}</strong>
                </div>
                <div>
                  <span className="block">THROUGHPUT</span>
                  <strong className="text-amber-300 font-bold">{srv.iops} IOPS</strong>
                </div>
              </div>

              <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-800/60 flex items-center justify-between">
                <span>REGION: {srv.region}</span>
                <span>TLS 1.3 ENCRYPTED</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REAL-TIME CLOUD CONSOLE STREAMING LOGS */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
            <Terminal className="w-5 h-5 text-amber-400" />
            <span>REAL-TIME CLOUD STREAMING LOGS & TELEMETRY FEEDS</span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-slate-400 mr-1">FILTER:</span>
            {(['ALL', 'INFO', 'WARN', 'SATELLITE'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setLogFilter(type)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[10px] ${
                  logFilter === type
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2 max-h-64 overflow-y-auto text-xs">
          {consoleLogs
            .filter((log) => logFilter === 'ALL' || log.type === logFilter)
            .map((log) => (
              <div key={log.id} className="flex items-start space-x-2.5 text-[11px] font-mono border-b border-slate-800/40 pb-1.5">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-black shrink-0 ${
                  log.type === 'WARN'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : log.type === 'SATELLITE'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {log.type}
                </span>
                <span className="text-slate-200">{log.text}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
