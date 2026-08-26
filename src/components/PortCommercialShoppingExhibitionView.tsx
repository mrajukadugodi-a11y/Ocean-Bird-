import React, { useState, useEffect } from 'react';
import {
  Building2,
  ShoppingBag,
  Store,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Search,
  Filter,
  Users,
  Wifi,
  Coffee,
  CheckCircle2,
  Ticket,
  QrCode,
  DollarSign,
  Briefcase,
  Utensils,
  Award,
  Globe,
  Tag,
  Download,
  Share2,
  Check,
  Zap,
  ChevronRight,
  ShieldCheck,
  Bus,
  ParkingCircle,
  Percent,
  Compass,
  FileText,
  Printer,
  Headphones,
  Laptop,
  Eye,
  BarChart3,
  Bot,
  Camera,
  Layers,
  TrendingUp,
  Activity,
  Navigation,
  Radio,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Landmark,
  MessageSquare,
  Send,
  HelpCircle,
  Flame,
  ArrowRight,
  Sliders,
  CheckSquare,
  Star,
  Bell,
  BellRing,
  Megaphone,
  Newspaper,
  CreditCard,
  BookOpen,
  Wallet,
  Cpu
} from 'lucide-react';
import { NavTabType } from './Navbar';
import { hapticEngine } from '../utils/hapticUtils';
import { indianPortsData, IndianPort } from '../data/indianPortsData';
import { PortQrCodesHub } from './port/PortQrCodesHub';
import { ExhibitionRatingSystem } from './port/ExhibitionRatingSystem';
import { PortPushNotificationSystem } from './port/PortPushNotificationSystem';
import { VirtualShopTourViewer } from './port/VirtualShopTourViewer';
import { PortAdsAndPublicationsHub } from './port/PortAdsAndPublicationsHub';
import { ExhibitionQrScanner } from './port/ExhibitionQrScanner';
import { VisitorShopReviewSystem } from './port/VisitorShopReviewSystem';
import { ExhibitionNotificationHub } from './port/ExhibitionNotificationHub';
import { VirtualB2BExhibitionTour } from './port/VirtualB2BExhibitionTour';
import { GlobalShopDirectory } from './port/GlobalShopDirectory';
import { PortLoyaltyPointsWallet } from './port/PortLoyaltyWallet';
import { MerchantSalesAnalyticsHub } from './port/MerchantSalesAnalyticsHub';
import { ArExhibitionNavigation } from './port/ArExhibitionNavigation';
import { ExhibitionEventAlerts } from './port/ExhibitionEventAlerts';
import { FirebaseAuthBar } from './port/FirebaseAuthBar';
import { StripeSubscriptionPaymentHub } from './port/StripeSubscriptionPaymentHub';
import { CloudAnalyticsTelemetryHub } from './port/CloudAnalyticsTelemetryHub';
import { DeploymentDocsHub } from './port/DeploymentDocsHub';
import { DeveloperWalletHub } from './port/DeveloperWalletHub';
import { CryptoWalletHub } from './port/CryptoWalletHub';

// Types
export interface BusinessWorkspace {
  id: string;
  name: string;
  category: 'COWORKING_POD' | 'EXECUTIVE_BOARDROOM' | 'TELEMETRY_DESK' | 'CUSTOMS_NOTARY_DESK';
  pierLocation: string;
  capacity: string;
  hourlyRateUSD: number;
  amenities: string[];
  imageUrl: string;
  availableNow: boolean;
  xPos: number; // For map percentage
  yPos: number;
}

export interface ShoppingStore {
  id: string;
  name: string;
  category: 'DUTY_FREE' | 'MARINE_GEAR' | 'COASTAL_ARTISANS' | 'SEAFOOD_MARKET' | 'TECH_GADGETS' | 'NAUTICAL_FASHION';
  floorLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'PIER_PROMENADE';
  hours: string;
  discountOffer: string;
  rating: number;
  description: string;
  imageUrl: string;
  popularItems: string[];
  residentDiscountPercent: number;
  crowdPercent: number;
  crowdLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'PEAK';
  xPos: number;
  yPos: number;
}

export interface ExpoEvent {
  id: string;
  title: string;
  category: 'TRADE_EXPO' | 'MARINE_SCIENCE' | 'COASTAL_ECO' | 'SHIPBUILDING' | 'SEAFARER_CAREER';
  hall: string;
  dateRange: string;
  status: 'NOW_OPEN' | 'UPCOMING' | 'REGISTRATION_OPEN';
  ticketPrice: string;
  organizer: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  boothsAvailable: number;
  xPos: number;
  yPos: number;
}

export interface DiningPlace {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  hours: string;
  priceRange: string;
  rating: number;
  seaView: boolean;
  imageUrl: string;
  specialty: string;
  xPos: number;
  yPos: number;
}

// Initial Data
export const WORKSPACES_DATA: BusinessWorkspace[] = [
  {
    id: 'WS-01',
    name: 'Ocean Bird Horizon Co-Working Pod 12',
    category: 'COWORKING_POD',
    pierLocation: 'Level 2, Commercial Tower A (Sea View)',
    capacity: '1 - 2 Persons',
    hourlyRateUSD: 18,
    amenities: ['Gigabit SatCom Wi-Fi', 'Triple 4K Monitors', 'Acoustic Soundproofing', 'Ergonomic Desk'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    availableNow: true,
    xPos: 32,
    yPos: 40
  },
  {
    id: 'WS-02',
    name: 'Maritime Executive Boardroom Alpha',
    category: 'EXECUTIVE_BOARDROOM',
    pierLocation: 'Level 3, Port Business Centre',
    capacity: '10 - 16 Persons',
    hourlyRateUSD: 65,
    amenities: ['4K Video Conferencing Wall', 'Customs Paperless Kiosk', 'High-Speed Color Printer', 'Coffee Barista Service'],
    imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    availableNow: true,
    xPos: 70,
    yPos: 25
  },
  {
    id: 'WS-03',
    name: 'AIS Telemetry & Shipping Trader Desk 04',
    category: 'TELEMETRY_DESK',
    pierLocation: 'Ground Floor, Promenade Arcade',
    capacity: '1 Person',
    hourlyRateUSD: 25,
    amenities: ['Live Bloomberg & AIS Feed', 'Direct Port Harbormaster Intercom', 'Dual Power Backup', 'Document Shredder'],
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    availableNow: false,
    xPos: 45,
    yPos: 65
  },
  {
    id: 'WS-04',
    name: 'Port Notary & Customs Documentation Station',
    category: 'CUSTOMS_NOTARY_DESK',
    pierLocation: 'Level 1, Maritime Transit Terminal',
    capacity: '2 - 4 Persons',
    hourlyRateUSD: 30,
    amenities: ['Certified Notary Stamp Desk', 'Biometric Signature Pad', 'Consular Document Scanner', 'Express Courier Drop'],
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    availableNow: true,
    xPos: 20,
    yPos: 75
  }
];

export const SHOPPING_DATA: ShoppingStore[] = [
  {
    id: 'SHOP-01',
    name: 'Royal Ocean Duty-Free Emporium',
    category: 'DUTY_FREE',
    floorLevel: 'LEVEL_1',
    hours: '07:00 AM - 11:00 PM Daily',
    discountOffer: '20% Off for International Transit Passengers & Resident Pass Holders',
    rating: 4.9,
    description: 'International duty-free luxury perfumes, imported chocolates, premium beverages, and travel optics with instant tax refund kiosks.',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Swiss Watches', 'Luxury Fragrances', 'Travel Chocolates', 'Polarized Sunglasses'],
    residentDiscountPercent: 20,
    crowdPercent: 88,
    crowdLevel: 'PEAK',
    xPos: 25,
    yPos: 35
  },
  {
    id: 'SHOP-02',
    name: 'South Asian Coastal Crafts & Marine Artisans',
    category: 'COASTAL_ARTISANS',
    floorLevel: 'PIER_PROMENADE',
    hours: '09:00 AM - 09:30 PM Daily',
    discountOffer: 'Buy 2 Handcrafted Wooden Ships, Get 1 Shell Craft Free',
    rating: 4.8,
    description: 'Authentic coastal artisan handicraft store showcasing hand-carved teak ship models, seashell art, local spices, and traditional sea weave textiles.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Teak Clipper Models', 'Pearl Jewelry', 'Spiced Chai Kits', 'Hand-woven Sea Bags'],
    residentDiscountPercent: 20,
    crowdPercent: 52,
    crowdLevel: 'MODERATE',
    xPos: 65,
    yPos: 75
  },
  {
    id: 'SHOP-03',
    name: 'Neptune Marine & Nautical Outfitters',
    category: 'MARINE_GEAR',
    floorLevel: 'LEVEL_1',
    hours: '08:00 AM - 08:00 PM Daily',
    discountOffer: '10% Off SOLAS Lifejackets & Waterproof Navigation Gear',
    rating: 4.7,
    description: 'Everything for coastal residents, fishermen, and yachting enthusiasts. Marine GPS receivers, foul-weather gear, VHF radios, and diving equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Waterproof Jackets', 'Marine Binoculars', 'LED Navigation Lights', 'Coastal Dry Bags'],
    residentDiscountPercent: 12,
    crowdPercent: 35,
    crowdLevel: 'LOW',
    xPos: 50,
    yPos: 28
  },
  {
    id: 'SHOP-04',
    name: 'Fresh Harbor Seafood & Organic Market',
    category: 'SEAFOOD_MARKET',
    floorLevel: 'PIER_PROMENADE',
    hours: '06:00 AM - 07:00 PM Daily',
    discountOffer: 'Direct Dockside Catch Special — 25% Off Fresh Snapper & Prawns',
    rating: 4.9,
    description: 'Daily fresh catch brought directly by local artisanal fishing boats. Ice-packed, cleaned, and vacuum-sealed for coastal residents and port visitors.',
    imageUrl: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Fresh Yellowfin Tuna', 'Giant Tiger Prawns', 'King Crab Legs', 'Smoked Salmon Fillets'],
    residentDiscountPercent: 25,
    crowdPercent: 74,
    crowdLevel: 'HIGH',
    xPos: 80,
    yPos: 60
  },
  {
    id: 'SHOP-05',
    name: 'Ocean Tech & Satellite Electronics Hub',
    category: 'TECH_GADGETS',
    floorLevel: 'LEVEL_2',
    hours: '09:00 AM - 10:00 PM Daily',
    discountOffer: 'Free SatCom Antenna Testing with any Power Bank Purchase',
    rating: 4.6,
    description: 'High-density gadgets store selling satellite phones, waterproof action cameras, high-capacity solar power banks, and SIM card activation.',
    imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Iridium Satellite Phone', '4K Waterproof Action Cam', 'Solar Power Bank 50000mAh', 'Global eSIM Cards'],
    residentDiscountPercent: 10,
    crowdPercent: 44,
    crowdLevel: 'MODERATE',
    xPos: 38,
    yPos: 52
  }
];

export const EXPO_DATA: ExpoEvent[] = [
  {
    id: 'EXPO-01',
    title: 'South Asia Ocean Technology & Green Shipbuilding Expo 2026',
    category: 'TRADE_EXPO',
    hall: 'Grand Exhibition Hall 1 & Pier 2 Floating Dock',
    dateRange: 'Aug 28 - Sep 02, 2026',
    status: 'NOW_OPEN',
    ticketPrice: 'Free Public Admission / Pass Required',
    organizer: 'International Maritime & Port Development Board',
    description: 'The region’s largest maritime technology exhibition featuring electric tugboats, LNG propulsion systems, autonomous port drones, and marine AI navigation software.',
    highlights: ['Live Floating Vessel Demonstrations', '50+ International Shipyard Exhibitors', 'Keynote Speeches by IMO Delegates'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    boothsAvailable: 14,
    xPos: 60,
    yPos: 30
  },
  {
    id: 'EXPO-02',
    title: 'Global Marine Science, Reef Preservation & Eco Expo',
    category: 'MARINE_SCIENCE',
    hall: 'Ocean Pavilion Hall 2 & Aquarium Atrium',
    dateRange: 'Sep 10 - Sep 15, 2026',
    status: 'REGISTRATION_OPEN',
    ticketPrice: 'Free Entry for Coastal Residents & Students',
    organizer: 'Global Ocean Eco Alliance',
    description: 'Interactive exhibition showcasing coral reef restoration projects, acoustic whale protection buoys, and plastic cleanup technologies.',
    highlights: ['3D Immersive Marine VR Experience', 'Youth Ocean Science Workshops', 'Live Reef Tank Exhibits'],
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    boothsAvailable: 22,
    xPos: 75,
    yPos: 45
  },
  {
    id: 'EXPO-03',
    title: 'International Seafarers & Maritime Career Convention',
    category: 'SEAFARER_CAREER',
    hall: 'Convention Center Level 3 Auditorium',
    dateRange: 'Oct 01 - Oct 04, 2026',
    status: 'UPCOMING',
    ticketPrice: 'Free Career Pass',
    organizer: 'Maritime Officers & Crew Association',
    description: 'Career fair for aspiring mariners, cadet recruits, marine engineers, and port logistics professionals. On-site interviews with top shipping lines.',
    highlights: ['On-site STCW Certification Guidance', 'Direct Hiring by 30+ Cruise & Cargo Lines', 'Simulated Bridge Navigation Test'],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    boothsAvailable: 8,
    xPos: 25,
    yPos: 20
  }
];

export const DINING_DATA: DiningPlace[] = [
  {
    id: 'DINE-01',
    name: 'The Golden Anchor Sunset Seafood Grill',
    cuisine: 'Fresh Seafood & Coastal Barbecue',
    location: 'Promenade Pier Level 3 Overlooking Harbor',
    hours: '12:00 PM - 11:30 PM',
    priceRange: '$$$',
    rating: 4.9,
    seaView: true,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    specialty: 'Grilled Lobster Tail with Garlic Herb Butter & Sunset Panorama',
    xPos: 85,
    yPos: 25
  },
  {
    id: 'DINE-02',
    name: 'Lighthouse Deck Café & Artisan Bakery',
    cuisine: 'Espresso Bar, Pastries & Light Bites',
    location: 'Lighthouse Tower Plaza Ground Floor',
    hours: '06:00 AM - 10:00 PM',
    priceRange: '$$',
    rating: 4.8,
    seaView: true,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    specialty: 'Cold Brew Sea Salt Caramel Latte & Fresh Croissants',
    xPos: 15,
    yPos: 85
  },
  {
    id: 'DINE-03',
    name: 'Spice Route Harbor Food Court',
    cuisine: 'Pan-Asian, Indian, Mediterranean & Fast Bites',
    location: 'Central Terminal Atrium Level 1',
    hours: '24 Hours Open',
    priceRange: '$',
    rating: 4.7,
    seaView: false,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    specialty: 'Coastal Fish Curry Rice Bowl & Authentic Tandoori Skewers',
    xPos: 45,
    yPos: 45
  }
];

interface PortCommercialShoppingExhibitionViewProps {
  onNavigateTab: (tab: NavTabType) => void;
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const PortCommercialShoppingExhibitionView: React.FC<PortCommercialShoppingExhibitionViewProps> = ({
  onNavigateTab,
  triggerToast
}) => {
  // Navigation Subtabs
  const [activeTab, setActiveTab] = useState<
    | 'SHOPPING'
    | 'MAP'
    | 'AR_PREVIEW'
    | 'VIRTUAL_TOUR'
    | 'VISITOR_SHOP_REVIEWS'
    | 'CROWD'
    | 'CONCIERGE'
    | 'EXPOS'
    | 'EXPO_AR'
    | 'EXPO_RATINGS'
    | 'EXPO_QR_SCANNER'
    | 'EXHIBITION_NOTIF_HUB'
    | 'VIRTUAL_B2B_EXPO_TOUR'
    | 'QR_CODES'
    | 'PUSH_NOTIFS'
    | 'ADS_PUBLICATIONS'
    | 'WORKSPACES'
    | 'DINING'
    | 'MERCHANT_ANALYTICS'
    | 'GLOBAL_SHOP_DIRECTORY'
    | 'LOYALTY_WALLET'
    | 'MERCHANT_SALES_ANALYTICS'
    | 'AR_EXHIBITION_NAV'
    | 'EXHIBITION_EVENT_ALERTS'
    | 'INDIAN_PORTS'
    | 'RESIDENT_PASS'
    | 'STRIPE_SUBSCRIPTION'
    | 'CLOUD_ANALYTICS'
    | 'DEPLOYMENT_DOCS'
    | 'DEV_WALLET'
    | 'CRYPTO_WALLET'
  >('SHOPPING');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [shopCategory, setShopCategory] = useState<string>('ALL');
  const [workspaceCategory, setWorkspaceCategory] = useState<string>('ALL');

  // Map state
  const [mapLevel, setMapLevel] = useState<'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'PIER_PROMENADE'>('LEVEL_1');
  const [selectedMapStore, setSelectedMapStore] = useState<ShoppingStore | BusinessWorkspace | DiningPlace | null>(SHOPPING_DATA[0]);

  // AR Shop Preview State
  const [arStore, setArStore] = useState<ShoppingStore>(SHOPPING_DATA[0]);
  const [ar3DMode, setAr3DMode] = useState<'WALKTHROUGH' | 'PRODUCT_TRYON' | 'SPATIAL_HUD'>('SPATIAL_HUD');

  // Expo AR State
  const [arExpo, setArExpo] = useState<ExpoEvent>(EXPO_DATA[0]);
  const [bookmarkedBooths, setBookmarkedBooths] = useState<string[]>(['Booth B-104 (Autonomous Drones)', 'Booth A-12 (LNG Engines)']);

  // Port Concierge AI State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string; time: string }>>([
    {
      sender: 'AI',
      text: 'Namaste & Welcome to Ocean Port AI Concierge! How can I assist your visit today? Ask me about duty-free discounts, co-working desks, exhibition entry passes, fresh seafood markets, or shuttle transport.',
      time: '12:00 PM'
    }
  ]);
  const [userChatInput, setUserChatInput] = useState('');
  const [voiceSpeechEnabled, setVoiceSpeechEnabled] = useState(true);

  // Indian Ports State
  const [indianPortCoastFilter, setIndianPortCoastFilter] = useState<'ALL' | 'WEST_COAST' | 'EAST_COAST' | 'ISLAND_TERRITORY'>('ALL');
  const [selectedIndianPort, setSelectedIndianPort] = useState<IndianPort | null>(indianPortsData[2]); // Default JNPT / MbPT

  // Business Desk Booking Modal State
  const [selectedWorkspace, setSelectedWorkspace] = useState<BusinessWorkspace | null>(null);
  const [bookingHours, setBookingHours] = useState<number>(2);
  const [bookingDate, setBookingDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [needCustomsNotary, setNeedCustomsNotary] = useState<boolean>(false);
  const [bookingConfirmedPass, setBookingConfirmedPass] = useState<{ id: string; qr: string } | null>(null);

  // Exhibition Pass Booking State
  const [selectedExpo, setSelectedExpo] = useState<ExpoEvent | null>(null);
  const [attendeeName, setAttendeeName] = useState('Coastal Citizen Visitor');
  const [attendeeEmail, setAttendeeEmail] = useState('citizen.visitor@oceanbird.org');
  const [passType, setPassType] = useState<'PUBLIC_ENTRY' | 'EXHIBITOR_BOOTH' | 'VIP_CONFERENCE'>('PUBLIC_ENTRY');
  const [expoPassGenerated, setExpoPassGenerated] = useState<boolean>(false);

  // Coastal Resident Pass Registration
  const [residentIdCard, setResidentIdCard] = useState('');
  const [residentName, setResidentName] = useState('');
  const [residentCity, setResidentCity] = useState('Goa / Colombo Coastal Region');
  const [isResidentPassActive, setIsResidentPassActive] = useState(false);

  // Simulated real-time crowd tick
  const [crowdSimTimer, setCrowdSimTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdSimTimer((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  // Chat Submission
  const handleSendConciergeMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userChatInput.trim()) return;

    hapticEngine.trigger('click');
    const userText = userChatInput.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsgs = [...chatMessages, { sender: 'USER' as const, text: userText, time: now }];
    setChatMessages(newMsgs);
    setUserChatInput('');

    // Generate AI response
    setTimeout(() => {
      let aiReply = "I've located that for you at Ocean Port Promenade Level 1! Follow the blue floor indicators towards Gate 3.";
      const lower = userText.toLowerCase();

      if (lower.includes('duty') || lower.includes('shop') || lower.includes('perfume')) {
        aiReply = 'Royal Ocean Duty-Free Emporium is located at Promenade Deck Level 1, Gate 4. Present your Coastal Resident Pass to receive 20% off luxury goods!';
      } else if (lower.includes('work') || lower.includes('desk') || lower.includes('wifi') || lower.includes('notary')) {
        aiReply = 'Port Business Centre features soundproof Co-Working Pods ($18/hr) and Customs Notary Desks ($30/hr) on Level 2 & 3 with gigabit satellite Wi-Fi.';
      } else if (lower.includes('expo') || lower.includes('exhibition') || lower.includes('ticket')) {
        aiReply = 'South Asia Ocean Technology Expo is now open at Grand Exhibition Hall 1. Public admission is free! Claim your entry QR badge in the Expos tab.';
      } else if (lower.includes('fish') || lower.includes('seafood') || lower.includes('food')) {
        aiReply = 'Fresh Harbor Seafood Market at Boardwalk Stall 8-12 offers fresh dockside snapper and prawns with 25% resident discounts! Sunset Grill is also open for dinner.';
      } else if (lower.includes('bus') || lower.includes('shuttle') || lower.includes('parking')) {
        aiReply = 'The Express Coastal Shuttle runs every 15 minutes to the city railway station. Parking is free for 3 hours at Level B1 with Resident Pass.';
      } else if (lower.includes('indian port') || lower.includes('mumbai') || lower.includes('jnpt') || lower.includes('cochin')) {
        aiReply = 'India has 12 Major Sea Ports and key deepwater hubs like JNPT (Nhava Sheva), Mundra, Cochin, Vizhinjam, and Visakhapatnam. View complete details under the Indian Ports Directory tab!';
      }

      setChatMessages((prev) => [...prev, { sender: 'AI' as const, text: aiReply, time: now }]);
      hapticEngine.trigger('success');
    }, 600);
  };

  // Filtered Shops
  const filteredShops = SHOPPING_DATA.filter((shop) => {
    const matchesCat = shopCategory === 'ALL' || shop.category === shopCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      shop.name.toLowerCase().includes(q) ||
      shop.description.toLowerCase().includes(q) ||
      shop.popularItems.some((item) => item.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Filtered Workspaces
  const filteredWorkspaces = WORKSPACES_DATA.filter((ws) => {
    const matchesCat = workspaceCategory === 'ALL' || ws.category === workspaceCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || ws.name.toLowerCase().includes(q) || ws.amenities.some((a) => a.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // Filtered Indian Ports
  const filteredIndianPorts = indianPortsData.filter((port) => {
    const matchesCoast = indianPortCoastFilter === 'ALL' || port.coast === indianPortCoastFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      port.name.toLowerCase().includes(q) ||
      port.state.toLowerCase().includes(q) ||
      port.code.toLowerCase().includes(q) ||
      port.cargoHandled.toLowerCase().includes(q);
    return matchesCoast && matchesSearch;
  });

  const handleBookWorkspaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkspace) return;
    hapticEngine.trigger('success');

    const totalCost = selectedWorkspace.hourlyRateUSD * bookingHours + (needCustomsNotary ? 25 : 0);
    const passId = `OB-WS-PASS-${Math.floor(100000 + Math.random() * 900000)}`;

    setBookingConfirmedPass({
      id: passId,
      qr: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${passId}`
    });

    notify(`Confirmed desk booking for ${selectedWorkspace.name}! Total: $${totalCost}`, 'success', 'BOOKING SUCCESS');
  };

  const handleRegisterExpoPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpo) return;
    hapticEngine.trigger('success');
    setExpoPassGenerated(true);
    notify(`Issued ${passType === 'PUBLIC_ENTRY' ? 'Free Entry Pass' : 'Exhibitor Badge'} for ${selectedExpo.title}`, 'success', 'EXPO PASS ISSUED');
  };

  const handleActivateResidentPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!residentName || !residentIdCard) {
      notify('Please enter your name and resident ID number', 'warning');
      return;
    }
    hapticEngine.trigger('success');
    setIsResidentPassActive(true);
    notify(`Activated Ocean Port Coastal Resident Pass for ${residentName}. 20% discount & free parking applied!`, 'success', 'RESIDENT PASS ACTIVE');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Firebase Authentication & User Profile Bar */}
      <FirebaseAuthBar triggerToast={triggerToast} />

      {/* ======================================================== */}
      {/* 1. HEADER & PUBLIC HUB HERO                              */}
      {/* ======================================================== */}
      <div className="bg-slate-900 rounded-3xl border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-amber-500/20 text-cyan-300 rounded-2xl border border-cyan-500/40 shadow-xl">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Port Commercial Hub, Duty-Free &amp; Exhibition Arenas
                </h1>
                <span className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-mono font-black px-3 py-1 rounded-full shadow-md">
                  PUBLIC, RESIDENT &amp; MARITIME PORTAL
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                Open access commercial hub featuring interactive store maps, AR shop previews, real-time crowd heatmaps, AI Port Concierge, exhibition AR overlays, merchant analytics, and complete Indian sea ports directory.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('CONCIERGE');
                hapticEngine.trigger('click');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold transition-all flex items-center space-x-2"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>AI Port Concierge</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('MAP');
                hapticEngine.trigger('click');
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs transition-all shadow-lg hover:brightness-110 flex items-center space-x-2"
            >
              <Navigation className="w-4 h-4 fill-slate-950" />
              <span>Interactive Store Map</span>
            </button>
          </div>
        </div>

        {/* Quick Resident Benefit Highlight Banner */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-lg">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-amber-300 font-bold block">Coastal Resident &amp; Public Visitor Privileges</span>
              <span className="text-slate-400">
                Get up to 25% off duty-free shopping, free 3-hour port parking validation, and complimentary Expo entry passes.
              </span>
            </div>
          </div>
          {isResidentPassActive ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-xl font-mono font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Resident Pass Active (#{residentIdCard || 'PASS-9821'})</span>
            </div>
          ) : (
            <button
              onClick={() => {
                setActiveTab('RESIDENT_PASS');
                hapticEngine.trigger('click');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono transition-all text-xs"
            >
              Claim Resident Pass
            </button>
          )}
        </div>

        {/* Navigation Sub-Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              setActiveTab('SHOPPING');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SHOPPING'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Duty-Free Shops ({SHOPPING_DATA.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MAP'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('AR_PREVIEW');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'AR_PREVIEW'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>AR Shop Preview</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('VISITOR_SHOP_REVIEWS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'VISITOR_SHOP_REVIEWS'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>Visitor Shop Reviews</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXPO_QR_SCANNER');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXPO_QR_SCANNER'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exhibition QR Scanning</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXHIBITION_NOTIF_HUB');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXHIBITION_NOTIF_HUB'
                ? 'bg-rose-500 text-white shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BellRing className="w-3.5 h-3.5 text-rose-300" />
            <span>Exhibition Notification Hub</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('GLOBAL_SHOP_DIRECTORY');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'GLOBAL_SHOP_DIRECTORY'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-300" />
            <span>Global Shop Directory</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('LOYALTY_WALLET');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'LOYALTY_WALLET'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Loyalty Points Wallet</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MERCHANT_SALES_ANALYTICS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MERCHANT_SALES_ANALYTICS'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Merchant Sales Analytics</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('AR_EXHIBITION_NAV');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'AR_EXHIBITION_NAV'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>AR Exhibition Navigation</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXHIBITION_EVENT_ALERTS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXHIBITION_EVENT_ALERTS'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Exhibition Event Alerts</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('VIRTUAL_B2B_EXPO_TOUR');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'VIRTUAL_B2B_EXPO_TOUR'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-300" />
            <span>Virtual B2B Global Expo Tour</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('QR_CODES');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'QR_CODES'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-cyan-300" />
            <span>QR Codes &amp; Gates</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PUSH_NOTIFS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PUSH_NOTIFS'
                ? 'bg-rose-500 text-white shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BellRing className="w-3.5 h-3.5 text-rose-400" />
            <span>Push Notifications</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CROWD');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CROWD'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-rose-400" />
            <span>Real-Time Crowd Heatmap</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CONCIERGE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CONCIERGE'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Concierge</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXPOS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXPOS'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Expos &amp; Halls ({EXPO_DATA.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXPO_RATINGS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXPO_RATINGS'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Expo Ratings &amp; Reviews</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXPO_AR');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXPO_AR'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Exhibition AR Overlay</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ADS_PUBLICATIONS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ADS_PUBLICATIONS'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-amber-300" />
            <span>Publications &amp; Ads</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('INDIAN_PORTS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'INDIAN_PORTS'
                ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>Indian Sea Ports Directory ({indianPortsData.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MERCHANT_ANALYTICS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MERCHANT_ANALYTICS'
                ? 'bg-purple-500 text-white shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Merchant Analytics</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('WORKSPACES');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'WORKSPACES'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Business Desks ({WORKSPACES_DATA.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DINING');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'DINING'
                ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Waterfront Dining ({DINING_DATA.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('STRIPE_SUBSCRIPTION');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'STRIPE_SUBSCRIPTION'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Stripe Subscriptions</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLOUD_ANALYTICS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLOUD_ANALYTICS'
                ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cloud Analytics</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DEPLOYMENT_DOCS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'DEPLOYMENT_DOCS'
                ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Deployment Docs</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DEV_WALLET');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'DEV_WALLET'
                ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Developer's Wallet</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CRYPTO_WALLET');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CRYPTO_WALLET'
                ? 'bg-purple-500 text-slate-950 shadow-lg font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Crypto Web3 Wallet</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TAB: DUTY-FREE & SHOPPING ARCADE                      */}
      {/* ======================================================== */}
      {activeTab === 'SHOPPING' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search duty-free stores, seafood market..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Category:</span>
              </span>

              {['ALL', 'DUTY_FREE', 'COASTAL_ARTISANS', 'MARINE_GEAR', 'SEAFOOD_MARKET', 'TECH_GADGETS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setShopCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    shopCategory === cat
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat === 'ALL' ? 'All Retail' : cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Shops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all overflow-hidden flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={shop.imageUrl}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                      {shop.category.replace('_', ' ')}
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-mono font-black px-2 py-1 rounded-lg flex items-center space-x-1 shadow-md">
                      <span>★ {shop.rating}</span>
                    </div>

                    {/* Crowd density tag */}
                    <div className="absolute bottom-3 left-3 bg-slate-950/90 text-rose-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-rose-500/30 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                      <span>Live Crowd: {shop.crowdPercent}% ({shop.crowdLevel})</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {shop.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{shop.floorLevel.replace('_', ' ')}</span>
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">{shop.description}</p>

                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Hours:</span>
                        </span>
                        <span className="font-mono text-slate-200">{shop.hours}</span>
                      </div>
                      <div className="flex items-center justify-between text-amber-300">
                        <span className="flex items-center space-x-1">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Resident Offer:</span>
                        </span>
                        <span className="font-mono font-bold">{shop.residentDiscountPercent}% OFF</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Popular Items:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {shop.popularItems.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-950 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setArStore(shop);
                      setActiveTab('AR_PREVIEW');
                      hapticEngine.trigger('click');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>AR Preview</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedMapStore(shop);
                      setActiveTab('MAP');
                      hapticEngine.trigger('click');
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-mono text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Map</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. FEATURE 1: INTERACTIVE STORE MAP                      */}
      {/* ======================================================== */}
      {activeTab === 'MAP' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>Port Commercial Complex Interactive Floor Plan &amp; Navigation</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select floor level, tap shop pins for route pathfinding, real-time crowd heat overlays, and turn-by-turn walking distance.
                </p>
              </div>

              {/* Level Selector */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {(['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'PIER_PROMENADE'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setMapLevel(lvl);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      mapLevel === lvl ? 'bg-cyan-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG / Visual Floor Plan Canvas */}
            <div className="relative w-full h-[450px] bg-slate-950 rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Floor Plan Background Grid Lines & Pier Outline */}
              <div
                className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"
              />

              {/* Outer Port Pier Geometry Visual */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
                <rect x="5%" y="10%" width="90%" height="80%" rx="24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" />

                {/* Pathfinding Line from Entry Gate (10%, 90%) to selected store */}
                {selectedMapStore && (
                  <path
                    d={`M 10 90 L 10 ${selectedMapStore.yPos} L ${selectedMapStore.xPos} ${selectedMapStore.yPos}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                    className="animate-pulse"
                  />
                )}
              </svg>

              {/* Entrance Gate Marker */}
              <div className="absolute bottom-4 left-6 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold flex items-center space-x-1 shadow-lg">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>You Are Here (Main Entry Gate)</span>
              </div>

              {/* Level Title HUD Overlay */}
              <div className="absolute top-4 left-6 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shadow-lg">
                CURRENT VIEW: {mapLevel.replace('_', ' ')}
              </div>

              {/* Map Pins for Shops */}
              {SHOPPING_DATA.filter((s) => s.floorLevel === mapLevel || mapLevel === 'PIER_PROMENADE').map((store) => (
                <button
                  key={store.id}
                  style={{ left: `${store.xPos}%`, top: `${store.yPos}%` }}
                  onClick={() => {
                    setSelectedMapStore(store);
                    hapticEngine.trigger('click');
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20 ${
                    selectedMapStore?.id === store.id ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-2xl border shadow-xl flex items-center space-x-1.5 ${
                      selectedMapStore?.id === store.id
                        ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-500/30 font-black'
                        : 'bg-slate-900/90 text-cyan-300 border-cyan-500/40'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-[11px] font-mono font-bold whitespace-nowrap max-w-[120px] truncate">
                      {store.name}
                    </span>
                  </div>
                </button>
              ))}

              {/* Map Pins for Workspaces */}
              {WORKSPACES_DATA.map((ws) => (
                <button
                  key={ws.id}
                  style={{ left: `${ws.xPos}%`, top: `${ws.yPos}%` }}
                  onClick={() => {
                    setSelectedMapStore(ws);
                    hapticEngine.trigger('click');
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 ${
                    selectedMapStore?.id === ws.id ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl border shadow-xl flex items-center space-x-1 ${
                      selectedMapStore?.id === ws.id
                        ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-500/30'
                        : 'bg-slate-900/90 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono font-bold max-w-[90px] truncate">{ws.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Store / Workspace Info Bar */}
            {selectedMapStore && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedMapStore.name}</h3>
                    <p className="text-xs font-mono text-slate-400">
                      {'pierLocation' in selectedMapStore ? selectedMapStore.pierLocation : 'floorLevel' in selectedMapStore ? selectedMapStore.floorLevel.replace('_', ' ') : 'location' in selectedMapStore ? selectedMapStore.location : 'Promenade Deck'} • Estimated Walking Time: 2 mins (65 meters)
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if ('discountOffer' in selectedMapStore) {
                        setArStore(selectedMapStore);
                        setActiveTab('AR_PREVIEW');
                      } else {
                        notify(`Launching AR direction overlay for ${selectedMapStore.name}...`, 'info');
                      }
                      hapticEngine.trigger('click');
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-xs transition-all flex items-center space-x-1.5"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Launch AR Navigation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. FEATURE 2: AR SHOP PREVIEW                            */}
      {/* ======================================================== */}
      {activeTab === 'AR_PREVIEW' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-cyan-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Camera className="w-6 h-6 text-cyan-400 animate-pulse" />
                  <h2 className="text-lg font-bold text-white">Augmented Reality (AR) Shop &amp; Product Preview</h2>
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded">
                    LIVE SPATIAL HUD
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Point device camera to view 3D store facade overlays, live resident discount banners, directional arrows, and spatial product catalogs.
                </p>
              </div>

              {/* Mode Toggles */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {(['SPATIAL_HUD', 'WALKTHROUGH', 'PRODUCT_TRYON'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setAr3DMode(m);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      ar3DMode === m ? 'bg-cyan-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* AR Viewport Container */}
            <div className="relative w-full h-[480px] rounded-3xl overflow-hidden border-2 border-cyan-500/50 bg-slate-950 shadow-2xl">
              {/* Camera Background Image Simulation */}
              <img
                src={arStore.imageUrl}
                alt={arStore.name}
                className="w-full h-full object-cover brightness-75 transition-all duration-700"
              />

              {/* AR HUD Grid & Scanlines Overlay */}
              <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-950/40" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Target Reticle in Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-24 h-24 border-2 border-cyan-400/60 rounded-full flex items-center justify-center animate-ping" />
                <div className="w-12 h-12 border-2 border-amber-400 rounded-full absolute inset-0 m-auto" />
              </div>

              {/* Floating Spatial Store HUD Card */}
              <div className="absolute top-8 left-8 right-8 md:right-auto md:max-w-md bg-slate-950/85 backdrop-blur-md border border-cyan-500/60 p-4 rounded-2xl shadow-2xl text-xs space-y-2 animate-in slide-in-from-top-4">
                <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                  <span className="text-cyan-300 font-mono font-bold flex items-center space-x-1">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>SPATIAL LOCK: {arStore.id}</span>
                  </span>
                  <span className="bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px]">
                    DISTANCE: 8.4m
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white">{arStore.name}</h3>
                <p className="text-slate-300">{arStore.discountOffer}</p>
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono pt-1">
                  <span>Resident Pass Discount: {arStore.residentDiscountPercent}% OFF</span>
                  <span>Rating: ★ {arStore.rating}</span>
                </div>
              </div>

              {/* Bottom Directional Arrow Overlay */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-950/90 border border-amber-500/50 px-6 py-2.5 rounded-full text-amber-300 font-mono font-bold text-xs flex items-center space-x-2 shadow-2xl">
                <Navigation className="w-4 h-4 text-amber-400 transform rotate-45 animate-bounce" />
                <span>WALK STRAIGHT 12 METERS &rarr; TURN LEFT AT DOCK 4</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. FEATURE 3: REAL-TIME CROWD & DENSITY MONITOR         */}
      {/* ======================================================== */}
      {activeTab === 'CROWD' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-rose-400" />
                  <h2 className="text-lg font-bold text-white">Port Commercial Complex Real-Time Crowd Heatmap</h2>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono px-2 py-0.5 rounded">
                    LIVE SENSOR TELEMETRY
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Monitored via port LiDAR footfall sensors &amp; Wi-Fi occupancy telemetry. Updated every 5 seconds.
                </p>
              </div>

              <button
                onClick={() => {
                  setCrowdSimTimer((t) => t + 1);
                  notify('Refreshed live port crowd telemetry sensors', 'success');
                  hapticEngine.trigger('click');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-bold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Refresh Live Telemetry</span>
              </button>
            </div>

            {/* Zone Crowd Heat Gauges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SHOPPING_DATA.map((shop) => (
                <div key={shop.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold truncate max-w-[150px]">{shop.name}</span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        shop.crowdLevel === 'PEAK' || shop.crowdLevel === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {shop.crowdLevel}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Occupancy Density</span>
                      <span>{shop.crowdPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          shop.crowdPercent > 75 ? 'bg-rose-500' : shop.crowdPercent > 45 ? 'bg-amber-500' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${shop.crowdPercent}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Optimal Visit Window: <span className="text-cyan-300 font-mono">14:00 - 16:00 (Low Queue)</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. FEATURE 4: PORT AI CONCIERGE ASSISTANT                */}
      {/* ======================================================== */}
      {activeTab === 'CONCIERGE' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-amber-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 text-amber-300 rounded-2xl">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Ocean Port AI Concierge &amp; Visitor Assistant</h2>
                  <p className="text-xs text-slate-400">Ask any questions about stores, customs, shuttle buses, or lost items.</p>
                </div>
              </div>

              <button
                onClick={() => setVoiceSpeechEnabled(!voiceSpeechEnabled)}
                className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center space-x-1.5 ${
                  voiceSpeechEnabled ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                {voiceSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>Voice Speech Mode</span>
              </button>
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono">Suggested Questions:</span>
              {[
                'Where is duty-free perfume?',
                'Find co-working desks with Wi-Fi',
                'How to get free coastal resident pass?',
                'Shuttle bus to city railway station',
                'Fresh seafood market hours'
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setUserChatInput(prompt);
                    hapticEngine.trigger('click');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 border border-slate-800 text-[11px] font-mono transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Box History */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 h-80 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl space-y-1 ${
                      msg.sender === 'USER'
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900 border border-amber-500/30 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75 font-mono mb-1">
                      <span>{msg.sender === 'USER' ? 'You' : 'Ocean Port AI Concierge'}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendConciergeMessage} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask Ocean Port AI Concierge..."
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono text-xs transition-all shadow-lg flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. FEATURE 5: EXHIBITION AR OVERLAY                      */}
      {/* ======================================================== */}
      {activeTab === 'EXPO_AR' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-amber-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Layers className="w-6 h-6 text-amber-400 animate-pulse" />
                  <span>Exhibition Hall AR Spatial Overlay &amp; Booth Wayfinding</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  View floating 3D booth numbers, real-time stage speaker timers, product spec sheets, and bookmark exhibitor stalls.
                </p>
              </div>

              <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                Bookmarked Booths: {bookmarkedBooths.length}
              </div>
            </div>

            {/* AR Exhibition Viewport */}
            <div className="relative w-full h-[450px] rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-slate-950 shadow-2xl">
              <img src={arExpo.imageUrl} alt={arExpo.title} className="w-full h-full object-cover brightness-75" />

              {/* Floating 3D Booth Overlay HUD Cards */}
              <div className="absolute top-12 left-12 bg-slate-950/90 backdrop-blur-md border border-cyan-500/60 p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
                <span className="bg-cyan-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px]">BOOTH B-104</span>
                <p className="text-white font-bold">Oceanic Autonomous Drones Ltd</p>
                <p className="text-slate-300 text-[11px]">Product: Subsea LiDAR Mapping Drones</p>
                <button
                  onClick={() => {
                    setBookmarkedBooths((prev) => [...prev, 'Booth B-104 (Autonomous Drones)']);
                    notify('Bookmarked Booth B-104 to your Expo Itinerary', 'success');
                    hapticEngine.trigger('click');
                  }}
                  className="mt-1 px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-mono font-bold text-[10px]"
                >
                  + Bookmark Booth
                </button>
              </div>

              <div className="absolute bottom-12 right-12 bg-slate-950/90 backdrop-blur-md border border-amber-500/60 p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
                <span className="bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px]">MAIN STAGE KEYNOTE</span>
                <p className="text-white font-bold">Topic: IMO 2030 Zero-Carbon Shipping</p>
                <p className="text-emerald-400 font-mono text-[11px]">Live Speaker: Dr. Rajiv Menon (Director, IMO)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. FEATURE 6: MERCHANT ANALYTICS DASHBOARD               */}
      {/* ======================================================== */}
      {activeTab === 'MERCHANT_ANALYTICS' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-purple-500/40 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  <span>Port Merchant &amp; Retail Vendor Business Intelligence</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Live daily sales KPIs, footfall metrics, customer resident vs tourist ratios, and campaign ROI analytics.
                </p>
              </div>

              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold px-3 py-1.5 rounded-xl">
                STORE ID: SHOP-01 (Royal Ocean Duty-Free)
              </span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Today's Total Sales</span>
                <p className="text-xl font-black font-mono text-emerald-400">$14,850 USD</p>
                <span className="text-[10px] text-emerald-400 font-mono">+18.4% vs yesterday</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Footfall Count</span>
                <p className="text-xl font-black font-mono text-cyan-300">1,240 Shoppers</p>
                <span className="text-[10px] text-cyan-400 font-mono">Peak hour: 11:00 AM</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Basket Size</span>
                <p className="text-xl font-black font-mono text-amber-300">$118.50 USD</p>
                <span className="text-[10px] text-amber-400 font-mono">3.2 Items / Order</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Resident Pass Redemptions</span>
                <p className="text-xl font-black font-mono text-purple-300">412 Pass Uses</p>
                <span className="text-[10px] text-purple-400 font-mono">62% Resident / 38% Tourist</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. FEATURE 7: ALL INDIAN SEA PORTS DIRECTORY & MAP        */}
      {/* ======================================================== */}
      {activeTab === 'INDIAN_PORTS' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-emerald-500/40 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Landmark className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-lg font-bold text-white">All Indian Sea Ports &amp; Geographical Location Directory</h2>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded">
                    17 MAJOR &amp; PRIVATE PORTS
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Complete directory with exact GPS Lat/Long coordinates, state coastlines, cargo facilities, and commercial duty-free hub statuses across India.
                </p>
              </div>

              {/* Coast Filter */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {(['ALL', 'WEST_COAST', 'EAST_COAST', 'ISLAND_TERRITORY'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setIndianPortCoastFilter(c);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      indianPortCoastFilter === c ? 'bg-emerald-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {c === 'ALL' ? 'All Coasts' : c.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Indian Ports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIndianPorts.map((port) => (
                <div
                  key={port.id}
                  className={`bg-slate-950 rounded-2xl border p-5 space-y-3 transition-all hover:border-emerald-500/60 shadow-xl ${
                    selectedIndianPort?.id === port.id ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      {port.code}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{port.state} ({port.coast.replace('_', ' ')})</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{port.name}</h3>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>GPS: {port.latLngStr}</span>
                    </p>
                  </div>

                  <div className="space-y-1 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Cargo Type:</span>
                      <span className="font-mono text-amber-300 text-right max-w-[160px] truncate">{port.cargoHandled}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Duty-Free Hub:</span>
                      <span className="font-mono text-emerald-400 font-bold">{port.dutyFreeStatus}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {port.keyFeatures.map((feat, idx) => (
                      <span key={idx} className="bg-slate-900 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800">
                        {feat}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedIndianPort(port);
                      notify(`Selected Indian Sea Port: ${port.name} (${port.latLngStr})`, 'info', 'INDIAN PORT LOCATED');
                      hapticEngine.trigger('click');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 font-mono text-xs font-bold transition-all flex items-center justify-center space-x-1.5 mt-2"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>View Geographic Coordinates</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 10. TAB: BUSINESS DESKS                                  */}
      {/* ======================================================== */}
      {activeTab === 'WORKSPACES' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  <span>Port Executive Business Centre &amp; Satellite Workspaces</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Equipped with low-latency satellite Wi-Fi, 4K meeting screens, customs notary desks, and acoustic pod isolation for maritime executives &amp; entrepreneurs.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {['ALL', 'COWORKING_POD', 'EXECUTIVE_BOARDROOM', 'TELEMETRY_DESK', 'CUSTOMS_NOTARY_DESK'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setWorkspaceCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      workspaceCategory === cat
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Spaces' : cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Workspaces List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWorkspaces.map((ws) => (
              <div
                key={ws.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-5 space-y-4 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={ws.imageUrl}
                      alt={ws.name}
                      className="w-full sm:w-40 h-32 object-cover rounded-xl border border-slate-800 shrink-0"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                          {ws.category.replace('_', ' ')}
                        </span>
                        {ws.availableNow ? (
                          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>AVAILABLE NOW</span>
                          </span>
                        ) : (
                          <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-amber-500/30">
                            OCCUPIED UNTIL 16:00
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white">{ws.name}</h3>
                      <p className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{ws.pierLocation}</span>
                      </p>
                      <p className="text-xs text-slate-300 flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Capacity: {ws.capacity}</span>
                      </p>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Facilities Included:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {ws.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center space-x-1.5 text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Hourly Rate</span>
                    <span className="text-lg font-black font-mono text-amber-400">${ws.hourlyRateUSD} / hr</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedWorkspace(ws);
                      setBookingConfirmedPass(null);
                      hapticEngine.trigger('click');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-xs transition-all shadow-lg flex items-center space-x-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Reserve Workspace Desk</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Workspace Reservation Modal */}
          {selectedWorkspace && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-cyan-500/20 text-cyan-300 rounded-xl">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Reserve Business Desk</h3>
                      <p className="text-xs font-mono text-cyan-400">{selectedWorkspace.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedWorkspace(null)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    ✕
                  </button>
                </div>

                {!bookingConfirmedPass ? (
                  <form onSubmit={handleBookWorkspaceSubmit} className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono font-bold block">Reservation Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono font-bold block">Duration (Hours)</label>
                      <select
                        value={bookingHours}
                        onChange={(e) => setBookingHours(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                      >
                        <option value={1}>1 Hour ($ {selectedWorkspace.hourlyRateUSD})</option>
                        <option value={2}>2 Hours ($ {selectedWorkspace.hourlyRateUSD * 2})</option>
                        <option value={4}>Half Day - 4 Hours ($ {selectedWorkspace.hourlyRateUSD * 4})</option>
                        <option value={8}>Full Day Pass - 8 Hours ($ {selectedWorkspace.hourlyRateUSD * 8})</option>
                      </select>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={needCustomsNotary}
                          onChange={(e) => setNeedCustomsNotary(e.target.checked)}
                          className="rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700"
                        />
                        <span>Add Port Customs Notary Fast-Track (+ $25)</span>
                      </label>
                    </div>

                    <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-xl space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Workspace Hourly Fee:</span>
                        <span className="font-mono">${selectedWorkspace.hourlyRateUSD * bookingHours}</span>
                      </div>
                      {needCustomsNotary && (
                        <div className="flex justify-between text-slate-300">
                          <span>Customs Notary Fee:</span>
                          <span className="font-mono">$25</span>
                        </div>
                      )}
                      <div className="flex justify-between text-amber-300 font-bold text-sm pt-1 border-t border-cyan-500/20">
                        <span>Total Payable:</span>
                        <span className="font-mono">${selectedWorkspace.hourlyRateUSD * bookingHours + (needCustomsNotary ? 25 : 0)} USD</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-sm shadow-lg transition-all"
                    >
                      Confirm Booking &amp; Generate Entry QR Pass
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/40 text-xs font-mono font-bold">
                      ✓ RESERVATION CONFIRMED
                    </div>
                    <img src={bookingConfirmedPass.qr} alt="Pass QR" className="w-36 h-36 mx-auto rounded-xl border border-white/20 p-2 bg-white" />
                    <p className="text-xs font-mono text-slate-400">Scan at Commercial Tower Smart Gate Terminal</p>
                    <p className="text-sm font-mono font-bold text-amber-300">Pass ID: {bookingConfirmedPass.id}</p>
                    <button
                      onClick={() => setSelectedWorkspace(null)}
                      className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 11. TAB: WATERFRONT DINING                               */}
      {/* ======================================================== */}
      {activeTab === 'DINING' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-emerald-400" />
              <span>Waterfront Promenade Dining &amp; Sea-View Cafes</span>
            </h2>
            <p className="text-xs text-slate-400">
              Fresh ocean catches, sunset dining plazas, espresso bars, and family food halls along the harbor promenade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DINING_DATA.map((dine) => (
              <div
                key={dine.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/40 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img src={dine.imageUrl} alt={dine.name} className="w-full h-full object-cover" />
                    {dine.seaView && (
                      <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 text-[10px] font-mono font-black px-2.5 py-1 rounded-full shadow-md">
                        PANORAMIC SEA VIEW
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-white">{dine.name}</h3>
                      <p className="text-xs font-mono text-emerald-400">{dine.cuisine}</p>
                    </div>

                    <p className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{dine.location}</span>
                    </p>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Chef Specialty:</span>
                      <p className="text-slate-200 font-medium">{dine.specialty}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      hapticEngine.trigger('click');
                      notify(`Reserved table request sent for ${dine.name}! Coastal Resident Pass discount applies on final bill.`, 'success', 'TABLE RESERVED');
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-mono text-xs transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Reserve Sunset View Table</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 12. TAB: EXPOS                                           */}
      {/* ======================================================== */}
      {activeTab === 'EXPOS' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Ticket className="w-5 h-5 text-amber-400" />
              <span>Ocean Port Convention &amp; Trade Exhibition Arenas</span>
            </h2>
            <p className="text-xs text-slate-400">
              Free entry passes for coastal residents, maritime professionals, and visitors. Book exhibition entry badges or reserve trade show booth spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {EXPO_DATA.map((expo) => (
              <div
                key={expo.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/40 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img src={expo.imageUrl} alt={expo.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-mono font-black px-2.5 py-1 rounded-full shadow-md">
                      {expo.status.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">{expo.title}</h3>
                      <p className="text-xs font-mono text-amber-300 mt-1 flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{expo.dateRange}</span>
                      </p>
                    </div>

                    <p className="text-xs text-slate-300">{expo.description}</p>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Hall Location:</span>
                        <span className="font-mono text-slate-200">{expo.hall}</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-400 font-bold">
                        <span>Admission Fee:</span>
                        <span className="font-mono">{expo.ticketPrice}</span>
                      </div>
                      <div className="flex items-center justify-between text-cyan-400 font-mono">
                        <span>Booths Available:</span>
                        <span>{expo.boothsAvailable} Booths</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setSelectedExpo(expo);
                      setExpoPassGenerated(false);
                      hapticEngine.trigger('click');
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono text-xs transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Get Free Entry Pass / Booth</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Expo Pass Booking Modal */}
          {selectedExpo && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Exhibition Pass Issuer</h3>
                    <p className="text-xs font-mono text-amber-400">{selectedExpo.title}</p>
                  </div>
                  <button onClick={() => setSelectedExpo(null)} className="p-1.5 text-slate-400 hover:text-white">
                    ✕
                  </button>
                </div>

                {!expoPassGenerated ? (
                  <form onSubmit={handleRegisterExpoPass} className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono font-bold block">Attendee Full Name</label>
                      <input
                        type="text"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono font-bold block">Email Address</label>
                      <input
                        type="email"
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono font-bold block">Select Pass Type</label>
                      <select
                        value={passType}
                        onChange={(e: any) => setPassType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                      >
                        <option value="PUBLIC_ENTRY">Free Public Entry Badge (All Exhibition Halls)</option>
                        <option value="VIP_CONFERENCE">VIP Conference &amp; Keynotes Badge (Free for Mariners)</option>
                        <option value="EXHIBITOR_BOOTH">Trade Exhibitor Booth Application ($ 150 USD)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono text-sm shadow-lg transition-all"
                    >
                      Issue Digital Expo Entry Pass
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/40 text-xs font-mono font-bold">
                      ✓ EXPO ENTRY BADGE ISSUED
                    </div>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 text-left space-y-2 font-mono text-xs">
                      <p className="text-white font-bold">{attendeeName}</p>
                      <p className="text-slate-400">{attendeeEmail}</p>
                      <p className="text-amber-300">Pass Type: {passType.replace('_', ' ')}</p>
                      <p className="text-cyan-400">Valid Hall: {selectedExpo.hall}</p>
                    </div>
                    <button
                      onClick={() => setSelectedExpo(null)}
                      className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold"
                    >
                      Close Pass
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 13. TAB: COASTAL RESIDENT PASS & SHUTTLE BUS              */}
      {/* ======================================================== */}
      {activeTab === 'RESIDENT_PASS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Box */}
            <div className="bg-slate-900 rounded-3xl border border-purple-500/30 p-6 space-y-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 text-purple-300 rounded-2xl">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Coastal Resident Port Pass Registration</h2>
                  <p className="text-xs text-slate-400">Free digital privilege pass for local coastal residents &amp; port workers.</p>
                </div>
              </div>

              <form onSubmit={handleActivateResidentPass} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono font-bold block">Full Resident Name</label>
                  <input
                    type="text"
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                    placeholder="e.g. Captain Ananya Silva"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono font-bold block">National ID / Resident Card Number</label>
                  <input
                    type="text"
                    value={residentIdCard}
                    onChange={(e) => setResidentIdCard(e.target.value)}
                    placeholder="e.g. CR-98214-GA"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono font-bold block">Coastal District / Town</label>
                  <input
                    type="text"
                    value={residentCity}
                    onChange={(e) => setResidentCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black font-mono text-sm shadow-lg transition-all"
                >
                  Activate Free Coastal Resident Pass
                </button>
              </form>

              {isResidentPassActive && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/40 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-purple-300 font-bold border-b border-purple-500/20 pb-2">
                    <span>OCEAN PORT RESIDENT PASS</span>
                    <span>VALID 2026-2027</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-bold">{residentName}</p>
                    <p className="text-slate-400">ID: {residentIdCard}</p>
                    <p className="text-slate-400">District: {residentCity}</p>
                  </div>
                  <div className="pt-2 text-[11px] text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>20% Duty-Free &amp; Free 3-Hour Port Parking Unlocked</span>
                  </div>
                </div>
              )}
            </div>

            {/* Shuttle Bus & Parking Info Box */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-cyan-500/20 text-cyan-300 rounded-2xl">
                  <Bus className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Public Port Access &amp; Shuttle Schedule</h2>
                  <p className="text-xs text-slate-400">Complimentary transit buses &amp; parking validation.</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span className="flex items-center space-x-2">
                      <Bus className="w-4 h-4" />
                      <span>Free Express Coastal Shuttle</span>
                    </span>
                    <span className="font-mono">Every 15 Mins</span>
                  </div>
                  <p className="text-slate-300">
                    Connects Coastal Residential Hubs &rarr; City Railway Center &rarr; Ocean Port Promenade Plaza.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span className="flex items-center space-x-2">
                      <ParkingCircle className="w-4 h-4" />
                      <span>Smart Multi-Story Port Parking</span>
                    </span>
                    <span className="font-mono">1,400 Spaces</span>
                  </div>
                  <p className="text-slate-300">
                    Free 3-hour parking for Coastal Resident Pass holders. EV fast-charging stations available at Level B2.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 14. TAB: QR CODES & GATE VERIFICATION                     */}
      {/* ======================================================== */}
      {activeTab === 'QR_CODES' && (
        <PortQrCodesHub
          residentPassId={residentIdCard || 'CR-98214-GA'}
          residentName={residentName || 'Captain Ananya Silva'}
          isResidentActive={isResidentPassActive}
          triggerToast={triggerToast}
        />
      )}

      {/* ======================================================== */}
      {/* 15. TAB: EXHIBITION RATINGS & REVIEWS                    */}
      {/* ======================================================== */}
      {activeTab === 'EXPO_RATINGS' && <ExhibitionRatingSystem triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 16. TAB: PUSH NOTIFICATIONS BROADCAST HUB                */}
      {/* ======================================================== */}
      {activeTab === 'PUSH_NOTIFS' && (
        <PortPushNotificationSystem
          onNavigateTab={(tab) => setActiveTab(tab as any)}
          triggerToast={triggerToast}
        />
      )}

      {/* ======================================================== */}
      {/* 17. TAB: 360° VIRTUAL SHOP TOUR ENGINE                   */}
      {/* ======================================================== */}
      {activeTab === 'VIRTUAL_TOUR' && <VirtualShopTourViewer triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 18. TAB: PUBLICATIONS & MERCHANT ADS HUB                */}
      {/* ======================================================== */}
      {activeTab === 'ADS_PUBLICATIONS' && <PortAdsAndPublicationsHub triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 19. TAB: EXHIBITION BOOTH & DELEGATE QR SCANNER          */}
      {/* ======================================================== */}
      {activeTab === 'EXPO_QR_SCANNER' && <ExhibitionQrScanner triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 20. TAB: VISITOR SHOP & DUTY-FREE REVIEW SYSTEM          */}
      {/* ======================================================== */}
      {activeTab === 'VISITOR_SHOP_REVIEWS' && <VisitorShopReviewSystem triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 21. TAB: B2B & EXHIBITION NOTIFICATION HUB              */}
      {/* ======================================================== */}
      {activeTab === 'EXHIBITION_NOTIF_HUB' && (
        <ExhibitionNotificationHub
          onNavigateTab={(tab) => setActiveTab(tab as any)}
          triggerToast={triggerToast}
        />
      )}

      {/* ======================================================== */}
      {/* 22. TAB: GLOBAL B2B VIRTUAL TRADE EXPO TOUR 360°        */}
      {/* ======================================================== */}
      {activeTab === 'VIRTUAL_B2B_EXPO_TOUR' && <VirtualB2BExhibitionTour triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 23. TAB: GLOBAL SHOP DIRECTORY                           */}
      {/* ======================================================== */}
      {activeTab === 'GLOBAL_SHOP_DIRECTORY' && <GlobalShopDirectory triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 24. TAB: LOYALTY POINTS WALLET                           */}
      {/* ======================================================== */}
      {activeTab === 'LOYALTY_WALLET' && <PortLoyaltyPointsWallet triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 25. TAB: MERCHANT SALES ANALYTICS                        */}
      {/* ======================================================== */}
      {activeTab === 'MERCHANT_SALES_ANALYTICS' && <MerchantSalesAnalyticsHub triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 26. TAB: AR EXHIBITION NAVIGATION                        */}
      {/* ======================================================== */}
      {activeTab === 'AR_EXHIBITION_NAV' && <ArExhibitionNavigation triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 27. TAB: EXHIBITION EVENT ALERTS                         */}
      {/* ======================================================== */}
      {activeTab === 'EXHIBITION_EVENT_ALERTS' && <ExhibitionEventAlerts triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 28. TAB: STRIPE SUBSCRIPTION PAYMENT SET-UP              */}
      {/* ======================================================== */}
      {activeTab === 'STRIPE_SUBSCRIPTION' && <StripeSubscriptionPaymentHub triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 29. TAB: CLOUD ANALYTICS & TELEMETRY HUB                */}
      {/* ======================================================== */}
      {activeTab === 'CLOUD_ANALYTICS' && <CloudAnalyticsTelemetryHub triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 30. TAB: DEPLOYMENT & HOSTING DOCS                       */}
      {/* ======================================================== */}
      {activeTab === 'DEPLOYMENT_DOCS' && <DeploymentDocsHub triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 31. TAB: DEVELOPER'S WALLET & API KEY VAULT              */}
      {/* ======================================================== */}
      {activeTab === 'DEV_WALLET' && <DeveloperWalletHub triggerToast={triggerToast} />}

      {/* ======================================================== */}
      {/* 32. TAB: CRYPTO WEB3 WALLET & ON-CHAIN ASSETS            */}
      {/* ======================================================== */}
      {activeTab === 'CRYPTO_WALLET' && <CryptoWalletHub triggerToast={triggerToast} />}
    </div>
  );
};
