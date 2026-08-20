import React, { useState, useEffect } from 'react';
import { OfflineFlightCacheManager } from './OfflineFlightCacheManager';
import { AirwaysBookingAndFlightTracker } from './AirwaysBookingAndFlightTracker';
import { AirwaysPassengerPortal } from './AirwaysPassengerPortal';
import { AirwaysCargoPortal } from './AirwaysCargoPortal';
import { CruisePassengerPortal } from './CruisePassengerPortal';
import { MarineCargoPortal } from './MarineCargoPortal';
import coralAtollImg from '../assets/images/coral_atoll_maldives_1785486802722.jpg';
import luxuryCruiseImg from '../assets/images/luxury_cruise_yacht_1785486817197.jpg';
import deepSeaDiverImg from '../assets/images/deep_sea_diver_reef_1785486831225.jpg';
import fishermenTrawlerImg from '../assets/images/fishermen_trawler_ocean_1785486842546.jpg';
import {
  MARINE_TOURISM_PACKAGES,
  MARITIME_INSURANCE_PLANS,
  CRUISE_TIMETABLES,
} from '../data/southAsiaData';
import {
  MarineTourismPackage,
  MaritimeInsurancePlan,
  TicketBooking,
  CargoBooking,
  IssuedInsurancePolicy,
  AgentInquiry,
  MultiModalBooking,
  LoyaltyMember,
  CargoManifestRecord,
  CargoManifestItem,
} from '../types';
import {
  Compass,
  Ship,
  Palmtree,
  Ticket,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Calendar,
  User,
  FileText,
  Printer,
  Sparkles,
  ArrowRight,
  Filter,
  Star,
  MapPin,
  Clock,
  Shield,
  LifeBuoy,
  Anchor,
  QrCode,
  Lock,
  Plus,
  Zap,
  Building2,
  Briefcase,
  Key,
  Users,
  Code,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Percent,
  AlertCircle,
  X,
  Search,
  Download,
  RefreshCw,
  ArrowUpRight,
  Box,
  Package,
  PackageCheck,
  Truck,
  Scale,
  Layers,
  Container,
  FileCheck,
  Calculator,
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  Luggage,
  Cloud,
  Crown,
  Gift,
  Award,
  Route,
  Milestone,
  FileSpreadsheet,
  TrendingUp,
  Navigation,
  Share2,
  Tag,
  Sliders,
  ArrowLeft,
  AlertTriangle,
  CloudRain,
  Wind,
  Thermometer,
  Sun,
  ShieldAlert,
  Upload,
  XCircle,
  Coins,
  ArrowRightLeft,
  Radio,
  BarChart3,
  PieChart,
  Activity,
  Wifi,
  WifiOff,
  BellRing,
  Volume2,
  VolumeX,
  Database,
  Server,
  Send,
  RotateCcw,
  Gauge,
  Boxes,
  TrendingDown,
  Globe,
  Code2,
  Flame,
  Radar,
  Brain,
  Leaf,
} from 'lucide-react';

export const MarineTourismBookingInsuranceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'tourism'
    | 'booking'
    | 'multimodal'
    | 'manifest'
    | 'export-manifest'
    | 'cargo-notification'
    | 'visual-manifest'
    | 'multi-cargo-tracking'
    | 'loyalty'
    | 'timeline'
    | 'predictive-delay'
    | 'currency-calc'
    | 'route-weather'
    | 'bulk-import'
    | 'smart-fleet'
    | 'incident-reporting'
    | 'port-density'
    | 'offline-alerts'
    | 'calendar'
    | 'tracking'
    | 'history'
    | 'agent-tieup'
    | 'insurance'
    | 'smart-rerouting'
    | 'global-logistics'
    | 'multimodal-api'
    | 'smart-manifest-ai'
    | 'logistics-heatmap'
    | 'logistics-perks'
    | 'predictive-route-alert'
    | 'maritime-esg'
    | 'digital-signature'
    | 'dynamic-slotting'
    | 'predictive-supply-hub'
    | 'offline-flight-cache'
    | 'airways-booking-tracker'
    | 'airways-passenger-portal'
    | 'airways-cargo-portal'
    | 'cruise-passenger-portal'
    | 'marine-cargo-portal'
  >('tourism');

  // ==========================================
  // 1. PREDICTIVE DELAY TOOL STATES & ENGINE
  // ==========================================
  const [delaySelectedRoute, setDelaySelectedRoute] = useState('Mumbai Port 🚢 Kochi Transshipment Port');
  const [delaySwellHeight, setDelaySwellHeight] = useState<number>(2.4);
  const [delayWindSpeedKnots, setDelayWindSpeedKnots] = useState<number>(28);
  const [delayMonsoonIndex, setDelayMonsoonIndex] = useState<number>(6);
  const [delayPortCongestionPct, setDelayPortCongestionPct] = useState<number>(65);
  const [delayVesselClass, setDelayVesselClass] = useState<'High-Speed Cruise Liner' | 'Heavy Container Vessel' | 'Inter-Island Fast Ferry'>('High-Speed Cruise Liner');

  const calculateDelayMetrics = () => {
    let baseDelayMins = 0;
    if (delaySwellHeight > 2.0) baseDelayMins += (delaySwellHeight - 2.0) * 45;
    if (delayWindSpeedKnots > 20) baseDelayMins += (delayWindSpeedKnots - 20) * 8;
    baseDelayMins += delayMonsoonIndex * 15;
    baseDelayMins += (delayPortCongestionPct / 100) * 120;
    if (delayVesselClass === 'Heavy Container Vessel') baseDelayMins *= 1.35;
    if (delayVesselClass === 'Inter-Island Fast Ferry') baseDelayMins *= 0.85;

    const roundedDelayMins = Math.round(baseDelayMins);
    const delayHours = (roundedDelayMins / 60).toFixed(1);

    let riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe Critical' = 'Low';
    let riskColor = 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    if (roundedDelayMins > 45 && roundedDelayMins <= 120) {
      riskLevel = 'Moderate';
      riskColor = 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    } else if (roundedDelayMins > 120 && roundedDelayMins <= 300) {
      riskLevel = 'High';
      riskColor = 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    } else if (roundedDelayMins > 300) {
      riskLevel = 'Severe Critical';
      riskColor = 'text-rose-400 bg-rose-500/20 border-rose-500/30';
    }

    const onTimeProbPct = Math.max(12, Math.min(98, Math.round(100 - (roundedDelayMins / 4.5))));

    return {
      roundedDelayMins,
      delayHours,
      riskLevel,
      riskColor,
      onTimeProbPct,
      weatherPct: Math.round(((delaySwellHeight * 10 + delayWindSpeedKnots) / (delaySwellHeight * 10 + delayWindSpeedKnots + delayPortCongestionPct || 1)) * 100),
      congestionPct: Math.round((delayPortCongestionPct / (delaySwellHeight * 10 + delayWindSpeedKnots + delayPortCongestionPct || 1)) * 100),
    };
  };

  const delayMetrics = calculateDelayMetrics();

  // ==========================================
  // 2. MULTI-CURRENCY CALCULATOR STATES & RATES
  // ==========================================
  const [calcSourceAmount, setCalcSourceAmount] = useState<number>(450);
  const [calcSourceCurrency, setCalcSourceCurrency] = useState<string>('USD');
  const [calcTargetCurrency, setCalcTargetCurrency] = useState<string>('INR');
  const [customRateOverride, setCustomRateOverride] = useState<boolean>(false);
  const [customRateInput, setCustomRateInput] = useState<number>(83.5);
  const [currencyCopied, setCurrencyCopied] = useState<boolean>(false);

  const CURRENCY_RATES: Record<string, { rateUSD: number; symbol: string; name: string }> = {
    USD: { rateUSD: 1.0, symbol: '$', name: 'US Dollar' },
    INR: { rateUSD: 83.5, symbol: '₹', name: 'Indian Rupee' },
    LKR: { rateUSD: 305.0, symbol: 'Rs', name: 'Sri Lankan Rupee' },
    MVR: { rateUSD: 15.45, symbol: 'Rf', name: 'Maldivian Rufiyaa' },
    BDT: { rateUSD: 117.2, symbol: '৳', name: 'Bangladeshi Taka' },
    SGD: { rateUSD: 1.34, symbol: 'S$', name: 'Singapore Dollar' },
    EUR: { rateUSD: 0.92, symbol: '€', name: 'Euro' },
    GBP: { rateUSD: 0.78, symbol: '£', name: 'British Pound' },
    AED: { rateUSD: 3.67, symbol: 'AED', name: 'UAE Dirham' },
  };

  const calculateConvertedAmount = (amountUSD: number, targetCurr: string) => {
    const targetObj = CURRENCY_RATES[targetCurr] || CURRENCY_RATES['USD'];
    if (customRateOverride && targetCurr === calcTargetCurrency) {
      return (amountUSD * customRateInput).toFixed(2);
    }
    return (amountUSD * targetObj.rateUSD).toFixed(2);
  };

  const convertFromSourceToTarget = () => {
    const srcObj = CURRENCY_RATES[calcSourceCurrency] || CURRENCY_RATES['USD'];
    const amountInUSD = calcSourceAmount / srcObj.rateUSD;
    return calculateConvertedAmount(amountInUSD, calcTargetCurrency);
  };

  // ==========================================
  // 3. ROUTE WEATHER OVERLAY STATES & DATA
  // ==========================================
  const [selectedWeatherRoute, setSelectedWeatherRoute] = useState<string>('Arabian Sea High-Speed Seaway Corridor');
  const [weatherTimeframe, setWeatherTimeframe] = useState<'24h' | '48h' | '72h'>('24h');
  const [selectedWaypointIdx, setSelectedWaypointIdx] = useState<number>(0);

  const ROUTE_WEATHER_DATA: Record<
    string,
    {
      corridorName: string;
      overallCondition: string;
      waveHeightM: number;
      windKnots: number;
      visibilityNM: number;
      seaTempC: number;
      rainProbPct: number;
      alertMessage: string | null;
      waypoints: {
        name: string;
        latLng: string;
        waveM: number;
        windKnots: number;
        status: 'Safe Passage' | 'Cautionary Swell' | 'Severe Weather Alert';
        advisory: string;
      }[];
    }
  > = {
    'Arabian Sea High-Speed Seaway Corridor': {
      corridorName: 'Arabian Sea High-Speed Seaway Corridor (Mumbai 🚢 Kochi)',
      overallCondition: 'Moderate Ocean Swell with Clear Skies',
      waveHeightM: 2.1,
      windKnots: 22,
      visibilityNM: 14,
      seaTempC: 28.5,
      rainProbPct: 20,
      alertMessage: 'Monsoon sea spray active near Cape Comorin. Vessels advised to maintain standard cruising draft.',
      waypoints: [
        { name: 'Waypoint Alpha (Mumbai Port Outer Light)', latLng: '18°57\'N 72°50\'E', waveM: 1.4, windKnots: 15, status: 'Safe Passage', advisory: 'Smooth sea conditions. Standard pilot speed.' },
        { name: 'Waypoint Bravo (Goa Deep Anchorage)', latLng: '15°24\'N 73°47\'E', waveM: 2.2, windKnots: 24, status: 'Cautionary Swell', advisory: 'Swell rising to 2.2m. Secure deck cargo.' },
        { name: 'Waypoint Charlie (Kochi Transshipment Channel)', latLng: '09°58\'N 76°14\'E', waveM: 1.8, windKnots: 18, status: 'Safe Passage', advisory: 'Clear entry into harbour channel.' },
      ],
    },
    'Maldives Atoll Inter-Island Seaway': {
      corridorName: 'Maldives Atoll Inter-Island Seaway (Malé ⛴️ Maafushi ⛴️ Addu)',
      overallCondition: 'Calm Crystal Lagoon Waters',
      waveHeightM: 0.8,
      windKnots: 11,
      visibilityNM: 18,
      seaTempC: 30.2,
      rainProbPct: 5,
      alertMessage: null,
      waypoints: [
        { name: 'Malé Commercial Pier', latLng: '04°10\'N 73°30\'E', waveM: 0.6, windKnots: 9, status: 'Safe Passage', advisory: 'Ideal glass-bottom water conditions.' },
        { name: 'South Malé Coral Channel', latLng: '03°55\'N 73°28\'E', waveM: 0.9, windKnots: 12, status: 'Safe Passage', advisory: 'Sub-surface current 1.1 knots.' },
      ],
    },
    'Bay of Bengal Deep Sea Highway': {
      corridorName: 'Bay of Bengal Deep Sea Highway (Chittagong 🚢 Cox\'s Bazar)',
      overallCondition: 'Tropical Squall & Heavy Wave Action',
      waveHeightM: 3.6,
      windKnots: 38,
      visibilityNM: 6,
      seaTempC: 29.1,
      rainProbPct: 75,
      alertMessage: 'CYCLONIC SQUALL WARNING: Wind gusts exceeding 38 knots in outer channel.',
      waypoints: [
        { name: 'Chittagong Outer Anchorage', latLng: '22°14\'N 91°48\'E', waveM: 3.2, windKnots: 32, status: 'Cautionary Swell', advisory: 'Tug assistance recommended.' },
        { name: 'Cox\'s Bazar Bay Fairway', latLng: '21°26\'N 91°58\'E', waveM: 4.1, windKnots: 42, status: 'Severe Weather Alert', advisory: 'Hold anchorage until storm passes.' },
      ],
    },
  };

  // ==========================================
  // 4. BULK BOOKING IMPORT STATES & LOGIC
  // ==========================================
  const [bulkImportMode, setBulkImportMode] = useState<'csv' | 'json'>('csv');
  const [bulkRawText, setBulkRawText] = useState<string>(
`PNR,PassengerName,PassportID,Email,Phone,PackageTitle,TravelDate,Passengers,CabinClass,FareUSD
OB-BLK-1001,Dr. Evelyn Vance,P882910,evelyn@maritime.org,+91 98765 11223,Lakshadweep Coral Atolls Expedition,2026-08-20,2,Royal Deluxe Suite,1250
OB-BLK-1002,Capt. Michael Chang,S940182,chang@singapore.sg,+65 9123 8899,Singapore Marina Yacht Excursion,2026-08-22,1,Business Ocean View,250
OB-BLK-1003,Fatima Al-Mansoori,A774012,fatima@uae.ae,+971 50 123 4567,Maldives Island Hopping Luxury Cruise,2026-08-25,3,Royal Deluxe Suite,1800
OB-BLK-1004,David Miller,US-99201,dmiller@ny.us,+1 212 555 0192,Kerala Backwaters Houseboat Cruise,2026-08-28,2,Economy Deck,320`
  );

  const [parsedBulkRecords, setParsedBulkRecords] = useState<{
    id: string;
    pnr: string;
    passengerName: string;
    passportId: string;
    email: string;
    packageTitle: string;
    travelDate: string;
    passengers: number;
    cabinClass: 'Economy Deck' | 'Business Ocean View' | 'Royal Deluxe Suite';
    fareUSD: number;
    isValid: boolean;
    errorMsg?: string;
  }[]>([]);

  const [isBulkImporting, setIsBulkImporting] = useState<boolean>(false);
  const [bulkImportSuccessMsg, setBulkImportSuccessMsg] = useState<string | null>(null);

  const parseBulkInput = () => {
    if (!bulkRawText.trim()) {
      setParsedBulkRecords([]);
      return;
    }

    if (bulkImportMode === 'json') {
      try {
        const jsonArr = JSON.parse(bulkRawText);
        if (Array.isArray(jsonArr)) {
          const parsed = jsonArr.map((item, idx) => ({
            id: `BLK-${idx + 1}`,
            pnr: item.pnr || `OB-BLK-${1000 + idx}`,
            passengerName: item.passengerName || item.name || 'Group Passenger',
            passportId: item.passportId || item.passport || 'NOT-PROVIDED',
            email: item.email || 'group@maritime.org',
            packageTitle: item.packageTitle || 'Coastal Expedition Tour',
            travelDate: item.travelDate || '2026-08-20',
            passengers: Number(item.passengers || item.passengerCount) || 1,
            cabinClass: (item.cabinClass || 'Business Ocean View') as any,
            fareUSD: Number(item.fareUSD || item.totalFareUSD) || 350,
            isValid: true,
          }));
          setParsedBulkRecords(parsed);
          return;
        }
      } catch (err) {
        // Handle invalid JSON gracefully
      }
    }

    const lines = bulkRawText.trim().split('\n');
    if (lines.length <= 1) {
      setParsedBulkRecords([]);
      return;
    }

    const records = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      if (cols.length >= 6) {
        const pnr = cols[0] || `OB-BLK-${1000 + i}`;
        const passengerName = cols[1] || 'Guest Passenger';
        const passportId = cols[2] || 'PASSPORT-PENDING';
        const email = cols[3] || 'passenger@marine.org';
        const packageTitle = cols[5] || 'Coastal Cruise Transit';
        const travelDate = cols[6] || '2026-08-25';
        const passengers = Number(cols[7]) || 1;
        const cabinClass = (cols[8] || 'Business Ocean View') as any;
        const fareUSD = Number(cols[9]) || 400;

        const isValid = passengerName.length > 2 && email.includes('@');
        records.push({
          id: `BLK-${i}`,
          pnr,
          passengerName,
          passportId,
          email,
          packageTitle,
          travelDate,
          passengers,
          cabinClass,
          fareUSD,
          isValid,
          errorMsg: !isValid ? 'Invalid name or email syntax' : undefined,
        });
      }
    }
    setParsedBulkRecords(records);
  };

  useEffect(() => {
    parseBulkInput();
  }, [bulkRawText, bulkImportMode]);

  const handleExecuteBulkImport = () => {
    if (parsedBulkRecords.length === 0) return;
    setIsBulkImporting(true);

    setTimeout(() => {
      const newBookings: TicketBooking[] = parsedBulkRecords
        .filter((r) => r.isValid)
        .map((r, idx) => ({
          bookingId: `PNT-BLK-${Math.floor(100000 + Math.random() * 900000)}`,
          pnr: r.pnr,
          passengerName: r.passengerName,
          passportOrGovtId: r.passportId,
          nationality: 'Corporate / Group Travel',
          email: r.email,
          phone: '+91 90000 00000',
          packageOrVesselTitle: r.packageTitle,
          departurePort: 'Primary Departure Hub',
          destinationPort: 'Destination Coastal Terminal',
          travelDate: r.travelDate,
          passengerCount: r.passengers,
          cabinClass: r.cabinClass,
          totalFareUSD: r.fareUSD,
          paymentMethod: 'Wire Transfer',
          paymentStatus: 'COMPLETED',
          transactionRef: `TXN-BULK-${Date.now()}-${idx}`,
          qrToken: `QR-BULK-${r.pnr}`,
          seatNumbers: [`GRP-CABIN-${idx + 1}`],
          insuranceAdded: true,
          insurancePolicyId: `POL-BULK-${1000 + idx}`,
          bookingTimestamp: '2026-08-01 02:20 UTC',
        }));

      setConfirmedBookings((prev) => [...newBookings, ...prev]);
      setIsBulkImporting(false);
      setBulkImportSuccessMsg(`Successfully imported ${newBookings.length} corporate passenger tickets into Master Booking History!`);
    }, 800);
  };

  // ==========================================
  // 5. SMART FLEET MANAGER STATES & HANDLERS
  // ==========================================
  interface FleetVessel {
    id: string;
    name: string;
    vesselCode: string;
    type: 'Luxury Cruise Liner' | 'Fast Passenger Catamaran' | 'Container Freighter' | 'Deep Sea Trawler' | 'Hydrofoil Express';
    flagCountry: string;
    status: 'In Transit' | 'Docked at Berth' | 'Anchored Outer Sea' | 'Under Maintenance';
    speedKnots: number;
    maxSpeedKnots: number;
    engineHealthPct: number;
    fuelLevelPct: number;
    crewCount: number;
    passengerOccupancyPct: number;
    latLng: string;
    headingDeg: number;
    nextPort: string;
    eta: string;
    throttleMode: 'Eco Cruising' | 'Sprint Velocity' | 'Harbor Patrol';
    biofoulingIndex: number;
    aisUplinkStatus: string;
  }

  const [fleetVessels, setFleetVessels] = useState<FleetVessel[]>([
    {
      id: 'VES-101',
      name: 'MV Ocean Pearl Empress',
      vesselCode: 'IMO-9884210',
      type: 'Luxury Cruise Liner',
      flagCountry: 'India 🇮🇳',
      status: 'In Transit',
      speedKnots: 22.4,
      maxSpeedKnots: 28.0,
      engineHealthPct: 96,
      fuelLevelPct: 82,
      crewCount: 48,
      passengerOccupancyPct: 88,
      latLng: '16°42\'N 72°10\'E',
      headingDeg: 165,
      nextPort: 'Kochi Transshipment Terminal',
      eta: '2026-08-01 18:30 UTC',
      throttleMode: 'Eco Cruising',
      biofoulingIndex: 2,
      aisUplinkStatus: 'Connected (Satellite-12)',
    },
    {
      id: 'VES-102',
      name: 'Royal Lakshadweep Express',
      vesselCode: 'IMO-9421102',
      type: 'Fast Passenger Catamaran',
      flagCountry: 'India 🇮🇳',
      status: 'In Transit',
      speedKnots: 31.0,
      maxSpeedKnots: 36.0,
      engineHealthPct: 91,
      fuelLevelPct: 64,
      crewCount: 18,
      passengerOccupancyPct: 94,
      latLng: '10°34\'N 72°38\'E',
      headingDeg: 210,
      nextPort: 'Kavaratti Atoll Pier',
      eta: '2026-08-01 14:15 UTC',
      throttleMode: 'Sprint Velocity',
      biofoulingIndex: 1,
      aisUplinkStatus: 'Connected (Satellite-12)',
    },
    {
      id: 'VES-103',
      name: 'Colpetty Malé Inter-Atoll Flyer',
      vesselCode: 'IMO-9110284',
      type: 'Hydrofoil Express',
      flagCountry: 'Maldives 🇲🇻',
      status: 'Docked at Berth',
      speedKnots: 0.0,
      maxSpeedKnots: 40.0,
      engineHealthPct: 88,
      fuelLevelPct: 95,
      crewCount: 12,
      passengerOccupancyPct: 0,
      latLng: '04°10\'N 73°30\'E',
      headingDeg: 0,
      nextPort: 'Addu Atoll Commercial Terminal',
      eta: '2026-08-02 06:00 UTC',
      throttleMode: 'Harbor Patrol',
      biofoulingIndex: 3,
      aisUplinkStatus: 'Connected (Satellite-12)',
    },
    {
      id: 'VES-104',
      name: 'Bay Bounty Container Carrier',
      vesselCode: 'IMO-9752109',
      type: 'Container Freighter',
      flagCountry: 'Sri Lanka 🇱🇰',
      status: 'Anchored Outer Sea',
      speedKnots: 1.2,
      maxSpeedKnots: 21.0,
      engineHealthPct: 79,
      fuelLevelPct: 45,
      crewCount: 26,
      passengerOccupancyPct: 0,
      latLng: '06°55\'N 79°50\'E',
      headingDeg: 80,
      nextPort: 'Colombo Outer Harbour',
      eta: '2026-08-01 22:00 UTC',
      throttleMode: 'Eco Cruising',
      biofoulingIndex: 5,
      aisUplinkStatus: 'Mesh Relay Active',
    },
  ]);

  const [selectedFleetVesselId, setSelectedFleetVesselId] = useState<string>('VES-101');
  const [isScanningFleetDiagnostic, setIsScanningFleetDiagnostic] = useState<boolean>(false);
  const [fleetDiagnosticNotice, setFleetDiagnosticNotice] = useState<string | null>(null);

  const handleUpdateThrottleMode = (vesselId: string, newMode: 'Eco Cruising' | 'Sprint Velocity' | 'Harbor Patrol') => {
    setFleetVessels((prev) =>
      prev.map((v) => {
        if (v.id === vesselId) {
          let newSpeed = v.speedKnots;
          if (newMode === 'Eco Cruising') newSpeed = Math.min(22, v.maxSpeedKnots * 0.7);
          if (newMode === 'Sprint Velocity') newSpeed = Math.min(v.maxSpeedKnots, v.maxSpeedKnots * 0.95);
          if (newMode === 'Harbor Patrol') newSpeed = 8.5;
          return { ...v, throttleMode: newMode, speedKnots: parseFloat(newSpeed.toFixed(1)) };
        }
        return v;
      })
    );
  };

  const handleRunFleetDiagnostic = (vesselName: string) => {
    setIsScanningFleetDiagnostic(true);
    setFleetDiagnosticNotice(null);
    setTimeout(() => {
      setIsScanningFleetDiagnostic(false);
      setFleetDiagnosticNotice(`Full engine telematics scan completed for ${vesselName}. Cylinder pressure nominal, zero oil leaks detected.`);
    }, 700);
  };

  // ==========================================
  // 6. INCIDENT REPORTING STATES & HANDLERS
  // ==========================================
  interface MarineIncident {
    id: string;
    incidentNo: string;
    title: string;
    vesselOrLocation: string;
    severity: 'Low' | 'Moderate' | 'High' | 'Critical MAYDAY';
    type: 'Engine Overheat' | 'Coral Reef Scraping' | 'Medical Evacuation' | 'Oil Bunkering Spill' | 'Squall Blindness Hazard';
    reportedAt: string;
    reporterName: string;
    coordinates: string;
    description: string;
    status: 'Under Investigation' | 'Coast Guard Dispatched' | 'Action Pending' | 'Resolved & Closed';
    assignedTeam: string;
    resolutionNotes?: string;
  }

  const [incidentsList, setIncidentsList] = useState<MarineIncident[]>([
    {
      id: 'INC-2001',
      incidentNo: 'MAR-INC-8821',
      title: 'Starboard Auxiliary Engine Overheat',
      vesselOrLocation: 'MV Ocean Pearl Empress (IMO-9884210)',
      severity: 'Moderate',
      type: 'Engine Overheat',
      reportedAt: '2026-08-01 01:15 UTC',
      reporterName: 'Chief Engineer K. Sharma',
      coordinates: '16°42\'N 72°10\'E',
      description: 'Coolant line temperature spike detected on starboard generator 2. Throttled down to 60% capacity. Auxiliary coolant pumps engaged.',
      status: 'Under Investigation',
      assignedTeam: 'Onboard Technical Duty Team',
      resolutionNotes: 'Filter flushed and temperature stabilized.',
    },
    {
      id: 'INC-2002',
      incidentNo: 'MAR-INC-8822',
      title: 'Uncharted Coral Shoal Warning Near Lagoon Entry',
      vesselOrLocation: 'Kavaratti Lagoon Fairway, Lakshadweep',
      severity: 'High',
      type: 'Coral Reef Scraping',
      reportedAt: '2026-08-01 00:40 UTC',
      reporterName: 'First Mate Alex Vance',
      coordinates: '10°32\'N 72°36\'E',
      description: 'Echosounder registered sudden depth drop from 18m to 3.2m near channel marker #4. High risk of bottom scraping for deep-draft vessels.',
      status: 'Coast Guard Dispatched',
      assignedTeam: 'Lakshadweep Maritime Safety Authority',
      resolutionNotes: 'Temporary buoy deployed to re-route incoming vessels.',
    },
    {
      id: 'INC-2003',
      incidentNo: 'MAR-INC-8823',
      title: 'Passenger Severe Dehydration Medical Evacuation',
      vesselOrLocation: 'Colpetty Malé Flyer',
      severity: 'Critical MAYDAY',
      type: 'Medical Evacuation',
      reportedAt: '2026-07-31 22:10 UTC',
      reporterName: 'Ship Medical Officer Dr. Nair',
      coordinates: '04°15\'N 73°25\'E',
      description: 'Passenger suffering acute cardiovascular emergency. Sea King helicopter airlift requested to Malé General Hospital.',
      status: 'Resolved & Closed',
      assignedTeam: 'Maldives Coast Guard Search & Rescue',
      resolutionNotes: 'Airmed evacuation completed at 22:50 UTC. Patient stable.',
    },
  ]);

  const [newIncTitle, setNewIncTitle] = useState('');
  const [newIncVessel, setNewIncVessel] = useState('MV Ocean Pearl Empress');
  const [newIncSeverity, setNewIncSeverity] = useState<'Low' | 'Moderate' | 'High' | 'Critical MAYDAY'>('Moderate');
  const [newIncType, setNewIncType] = useState<'Engine Overheat' | 'Coral Reef Scraping' | 'Medical Evacuation' | 'Oil Bunkering Spill' | 'Squall Blindness Hazard'>('Squall Blindness Hazard');
  const [newIncLat, setNewIncLat] = useState('15°30\'N');
  const [newIncLng, setNewIncLng] = useState('73°10\'E');
  const [newIncDesc, setNewIncDesc] = useState('');
  const [newIncReporter, setNewIncReporter] = useState('Officer Alex Vance');
  const [isSubmittingIncident, setIsSubmittingIncident] = useState(false);
  const [incidentSuccessNotice, setIncidentSuccessNotice] = useState<string | null>(null);
  const [activeIncidentModal, setActiveIncidentModal] = useState<MarineIncident | null>(null);

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncTitle || !newIncDesc) return;

    setIsSubmittingIncident(true);
    setTimeout(() => {
      const created: MarineIncident = {
        id: `INC-${Date.now()}`,
        incidentNo: `MAR-INC-${Math.floor(1000 + Math.random() * 9000)}`,
        title: newIncTitle,
        vesselOrLocation: newIncVessel,
        severity: newIncSeverity,
        type: newIncType,
        reportedAt: '2026-08-01 02:25 UTC',
        reporterName: newIncReporter,
        coordinates: `${newIncLat} ${newIncLng}`,
        description: newIncDesc,
        status: newIncSeverity === 'Critical MAYDAY' ? 'Coast Guard Dispatched' : 'Under Investigation',
        assignedTeam: 'Central Maritime Safety Operations',
      };

      setIncidentsList((prev) => [created, ...prev]);
      setIsSubmittingIncident(false);
      setNewIncTitle('');
      setNewIncDesc('');
      setIncidentSuccessNotice(`Incident report ${created.incidentNo} successfully filed and dispatched to Coast Guard Maritime Rescue Coordination Centre!`);
    }, 600);
  };

  const handleResolveIncident = (incId: string) => {
    setIncidentsList((prev) =>
      prev.map((i) => (i.id === incId ? { ...i, status: 'Resolved & Closed', resolutionNotes: 'Resolved by duty officer inspection & clearance.' } : i))
    );
  };

  // ==========================================
  // 7. PORT DENSITY CHARTS STATES & DATA
  // ==========================================
  interface PortDensityData {
    portId: string;
    portName: string;
    country: string;
    region: 'India' | 'Sri Lanka & Maldives' | 'Bay of Bengal' | 'Southeast Asia';
    capacityTEUorPassengers: string;
    currentOccupancyPct: number;
    waitingAnchorageCount: number;
    avgTurnaroundHours: number;
    craneUtilizationPct: number;
    peakTrafficHours: string;
    congestionIndex: 'Optimal' | 'Moderate Density' | 'Heavy Bottleneck';
    hourlyTraffic24h: number[];
  }

  const [portDensityList] = useState<PortDensityData[]>([
    {
      portId: 'PORT-BOM',
      portName: 'Mumbai Port Trust & JNPT Hub',
      country: 'India 🇮🇳',
      region: 'India',
      capacityTEUorPassengers: '5.2M TEU / 850k Passengers',
      currentOccupancyPct: 78,
      waitingAnchorageCount: 14,
      avgTurnaroundHours: 18.5,
      craneUtilizationPct: 84,
      peakTrafficHours: '08:00 - 12:00 & 16:00 - 20:00',
      congestionIndex: 'Moderate Density',
      hourlyTraffic24h: [40, 35, 30, 25, 30, 50, 75, 90, 95, 88, 80, 75, 70, 72, 85, 92, 98, 85, 70, 60, 52, 48, 42, 40],
    },
    {
      portId: 'PORT-COK',
      portName: 'Kochi Vallarpadam Transshipment Terminal',
      country: 'India 🇮🇳',
      region: 'India',
      capacityTEUorPassengers: '1.8M TEU / 320k Passengers',
      currentOccupancyPct: 54,
      waitingAnchorageCount: 4,
      avgTurnaroundHours: 12.0,
      craneUtilizationPct: 62,
      peakTrafficHours: '10:00 - 14:00',
      congestionIndex: 'Optimal',
      hourlyTraffic24h: [20, 18, 15, 12, 20, 35, 50, 65, 70, 78, 80, 75, 60, 55, 62, 68, 70, 60, 50, 40, 30, 25, 22, 20],
    },
    {
      portId: 'PORT-CMB',
      portName: 'Colombo Harbour South Container Terminal',
      country: 'Sri Lanka 🇱🇰',
      region: 'Sri Lanka & Maldives',
      capacityTEUorPassengers: '7.0M TEU / 450k Passengers',
      currentOccupancyPct: 91,
      waitingAnchorageCount: 22,
      avgTurnaroundHours: 26.4,
      craneUtilizationPct: 94,
      peakTrafficHours: '06:00 - 22:00 Continuous',
      congestionIndex: 'Heavy Bottleneck',
      hourlyTraffic24h: [70, 68, 65, 60, 62, 75, 88, 95, 98, 96, 94, 92, 90, 91, 95, 97, 99, 95, 88, 82, 78, 75, 72, 70],
    },
    {
      portId: 'PORT-MLE',
      portName: 'Malé Central Pier & Ferry Hub',
      country: 'Maldives 🇲🇻',
      region: 'Sri Lanka & Maldives',
      capacityTEUorPassengers: '450k TEU / 1.2M Inter-Atoll Ferries',
      currentOccupancyPct: 68,
      waitingAnchorageCount: 6,
      avgTurnaroundHours: 8.5,
      craneUtilizationPct: 70,
      peakTrafficHours: '07:00 - 11:00 & 15:00 - 18:00',
      congestionIndex: 'Moderate Density',
      hourlyTraffic24h: [15, 10, 8, 5, 12, 40, 70, 88, 92, 85, 72, 65, 60, 68, 82, 90, 85, 70, 55, 40, 30, 22, 18, 15],
    },
    {
      portId: 'PORT-CGP',
      portName: 'Chittagong Deep Sea Anchorage',
      country: 'Bangladesh 🇧🇩',
      region: 'Bay of Bengal',
      capacityTEUorPassengers: '3.1M TEU / 120k Passengers',
      currentOccupancyPct: 88,
      waitingAnchorageCount: 19,
      avgTurnaroundHours: 22.1,
      craneUtilizationPct: 89,
      peakTrafficHours: '09:00 - 17:00',
      congestionIndex: 'Heavy Bottleneck',
      hourlyTraffic24h: [50, 48, 45, 40, 42, 58, 76, 88, 94, 95, 92, 90, 88, 89, 91, 93, 95, 90, 82, 74, 66, 60, 55, 52],
    },
    {
      portId: 'PORT-SIN',
      portName: 'Singapore Pasir Panjang Gateway',
      country: 'Singapore 🇸🇬',
      region: 'Southeast Asia',
      capacityTEUorPassengers: '37.5M TEU / 3.4M Cruise Passengers',
      currentOccupancyPct: 65,
      waitingAnchorageCount: 8,
      avgTurnaroundHours: 10.2,
      craneUtilizationPct: 76,
      peakTrafficHours: '24/7 Precision Automated Berth Routing',
      congestionIndex: 'Optimal',
      hourlyTraffic24h: [60, 58, 55, 55, 58, 62, 68, 72, 75, 74, 72, 70, 68, 70, 72, 74, 76, 74, 70, 68, 65, 62, 60, 60],
    },
  ]);

  const [selectedPortRegion, setSelectedPortRegion] = useState<string>('All');
  const [selectedPortId, setSelectedPortId] = useState<string>('PORT-BOM');

  const filteredPortList = portDensityList.filter((p) => selectedPortRegion === 'All' || p.region === selectedPortRegion);
  const activePortDetail = portDensityList.find((p) => p.portId === selectedPortId) || portDensityList[0];

  // ==========================================
  // 8. OFFLINE ALERT SYSTEMS STATES & HANDLERS
  // ==========================================
  interface OfflineAlert {
    id: string;
    alertCode: string;
    type: 'DISTRESS_SOS' | 'SQUALL_WARNING' | 'SHALLOW_CORAL_REEF' | 'ROUGE_WAVE';
    priority: 'EMERGENCY' | 'CRITICAL' | 'ADVISORY';
    timestamp: string;
    message: string;
    coordinates: string;
    syncStatus: 'Queued Locally (Offline)' | 'Synced to Coastal Relay';
  }

  const [isNetworkSimulatedOffline, setIsNetworkSimulatedOffline] = useState<boolean>(true);
  const [offlineAlertsQueue, setOfflineAlertsQueue] = useState<OfflineAlert[]>([
    {
      id: 'OFF-101',
      alertCode: 'ALT-SOS-0091',
      type: 'DISTRESS_SOS',
      priority: 'EMERGENCY',
      timestamp: '2026-08-01 02:18 UTC',
      message: 'Local distress broadcast beacon activated. High risk of heavy squall in Sector 4.',
      coordinates: '15°12\'N 73°20\'E',
      syncStatus: 'Queued Locally (Offline)',
    },
    {
      id: 'OFF-102',
      alertCode: 'ALT-SQL-0042',
      type: 'SQUALL_WARNING',
      priority: 'CRITICAL',
      timestamp: '2026-08-01 01:50 UTC',
      message: 'Monsoon sea gust 35 knots registered on local barometer sensor.',
      coordinates: '10°10\'N 72°40\'E',
      syncStatus: 'Queued Locally (Offline)',
    },
    {
      id: 'OFF-103',
      alertCode: 'ALT-CRL-0012',
      type: 'SHALLOW_CORAL_REEF',
      priority: 'ADVISORY',
      timestamp: '2026-07-31 23:30 UTC',
      message: 'Local depth chart cached offline. Uncharted coral shoal flagged at 3.5m depth.',
      coordinates: '04°08\'N 73°29\'E',
      syncStatus: 'Synced to Coastal Relay',
    },
  ]);

  const [offlineNewDistressDesc, setOfflineNewDistressDesc] = useState('');
  const [offlineNewDistressType, setOfflineNewDistressType] = useState<'DISTRESS_SOS' | 'SQUALL_WARNING' | 'SHALLOW_CORAL_REEF' | 'ROUGE_WAVE'>('DISTRESS_SOS');
  const [sirenActive, setSirenActive] = useState<boolean>(false);
  const [offlineSyncNotice, setOfflineSyncNotice] = useState<string | null>(null);

  const handleQueueOfflineDistress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offlineNewDistressDesc) return;

    const newAlert: OfflineAlert = {
      id: `OFF-${Date.now()}`,
      alertCode: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      type: offlineNewDistressType,
      priority: offlineNewDistressType === 'DISTRESS_SOS' ? 'EMERGENCY' : 'CRITICAL',
      timestamp: '2026-08-01 02:30 UTC',
      message: offlineNewDistressDesc,
      coordinates: '16°40\'N 72°15\'E',
      syncStatus: isNetworkSimulatedOffline ? 'Queued Locally (Offline)' : 'Synced to Coastal Relay',
    };

    setOfflineAlertsQueue((prev) => [newAlert, ...prev]);
    setOfflineNewDistressDesc('');
    setOfflineSyncNotice(
      isNetworkSimulatedOffline
        ? `Alert ${newAlert.alertCode} safely saved to device IndexedDB offline storage & VHF local radio queue!`
        : `Alert ${newAlert.alertCode} broadcasted immediately via live satellite relay!`
    );
  };

  const handleSyncOfflineQueue = () => {
    setOfflineAlertsQueue((prev) => prev.map((a) => ({ ...a, syncStatus: 'Synced to Coastal Relay' })));
    setOfflineSyncNotice('All queued offline alert logs successfully synced to Coast Guard Central Data Hub!');
  };

  // ==========================================
  // 9. EXPORT MANIFEST GENERATOR STATES & ENGINE
  // ==========================================
  interface ExportManifestRecord {
    id: string;
    manifestNo: string;
    vesselName: string;
    voyageNo: string;
    exporterShipper: string;
    consignee: string;
    originPort: string;
    destinationPort: string;
    customsDeclNo: string;
    totalUnits: number;
    totalWeightMT: number;
    dgClass: string;
    customsClearanceStatus: 'Cleared & Released' | 'Pending Inspection' | 'In Bond Hold';
    digitalHashHMAC: string;
    ediFormat: 'UN/EDIFACT CUSCAR' | 'JSON-LD WCO Schema' | 'XML Customs Portal';
  }

  const [exportManifests, setExportManifests] = useState<ExportManifestRecord[]>([
    {
      id: 'EXP-M-801',
      manifestNo: 'EXP-2026-IND-091',
      vesselName: 'Lakshadweep Samudra Cargo Express',
      voyageNo: 'VY-2026-08',
      exporterShipper: 'Apex Marine Commodities Ltd (Mumbai)',
      consignee: 'Maldives State Trading Organization (Malé)',
      originPort: 'JNPT Mumbai, India 🇮🇳',
      destinationPort: 'Malé Commercial Harbour, Maldives 🇲🇻',
      customsDeclNo: 'IN-CUS-2026-881204',
      totalUnits: 142,
      totalWeightMT: 840.5,
      dgClass: 'None (General Cargo & Foodstuffs)',
      customsClearanceStatus: 'Cleared & Released',
      digitalHashHMAC: 'sha256:7f8a91b2c3d4e5f60182938475a6b7c890123456789abcdef0123456789a',
      ediFormat: 'UN/EDIFACT CUSCAR',
    },
    {
      id: 'EXP-M-802',
      manifestNo: 'EXP-2026-LKA-044',
      vesselName: 'Bay Bounty Container Carrier',
      voyageNo: 'VY-2026-12',
      exporterShipper: 'Lanka Ocean Logistics PLC (Colombo)',
      consignee: 'Chittagong Maritime Terminal Corp (Bangladesh)',
      originPort: 'Colombo Port, Sri Lanka 🇱🇰',
      destinationPort: 'Chittagong Port, Bangladesh 🇧🇩',
      customsDeclNo: 'LK-CUS-2026-110293',
      totalUnits: 98,
      totalWeightMT: 1250.0,
      dgClass: 'IMDG Class 3 (Flammable Liquids)',
      customsClearanceStatus: 'Pending Inspection',
      digitalHashHMAC: 'sha256:3a4b5c6d7e8f901234567890abcdef12345678901234567890abcdef1234',
      ediFormat: 'JSON-LD WCO Schema',
    },
    {
      id: 'EXP-M-803',
      manifestNo: 'EXP-2026-BGD-119',
      vesselName: 'Bengal Delta Feeder',
      voyageNo: 'VY-2026-03',
      exporterShipper: 'Garment Exporters Guild (Chittagong)',
      consignee: 'Singapore Port World Terminal',
      originPort: 'Chittagong Port, Bangladesh 🇧🇩',
      destinationPort: 'Pasir Panjang Terminal, Singapore 🇸🇬',
      customsDeclNo: 'BD-CUS-2026-990142',
      totalUnits: 310,
      totalWeightMT: 2100.8,
      dgClass: 'None (Textiles & Apparel)',
      customsClearanceStatus: 'Cleared & Released',
      digitalHashHMAC: 'sha256:99887766554433221100aabbccddeeff00112233445566778899aabbccdd',
      ediFormat: 'XML Customs Portal',
    },
  ]);

  const [selectedExportManifestId, setSelectedExportManifestId] = useState<string>('EXP-M-801');
  const [exportManifestFilterPort, setExportManifestFilterPort] = useState<string>('All');
  const [exportSearchQuery, setExportSearchQuery] = useState<string>('');
  const [copiedEdiNotice, setCopiedEdiNotice] = useState<boolean>(false);
  const [exportSuccessNotice, setExportSuccessNotice] = useState<string>('');

  // Form for New Export Manifest
  const [newExpVessel, setNewExpVessel] = useState('Lakshadweep Samudra Cargo Express');
  const [newExpShipper, setNewExpShipper] = useState('');
  const [newExpConsignee, setNewExpConsignee] = useState('');
  const [newExpOrigin, setNewExpOrigin] = useState('JNPT Mumbai Port');
  const [newExpDest, setNewExpDest] = useState('Malé Commercial Harbour');
  const [newExpUnits, setNewExpUnits] = useState<number>(65);
  const [newExpWeight, setNewExpWeight] = useState<number>(350);
  const [newExpDgClass, setNewExpDgClass] = useState('None (General Cargo)');
  const [newExpFormat, setNewExpFormat] = useState<'UN/EDIFACT CUSCAR' | 'JSON-LD WCO Schema' | 'XML Customs Portal'>('UN/EDIFACT CUSCAR');

  const activeExportManifest = exportManifests.find((m) => m.id === selectedExportManifestId) || exportManifests[0];

  const handleCreateExportManifest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpShipper || !newExpConsignee) return;

    const newRecord: ExportManifestRecord = {
      id: `EXP-M-${Date.now()}`,
      manifestNo: `EXP-2026-CUSTOMS-${Math.floor(100 + Math.random() * 900)}`,
      vesselName: newExpVessel,
      voyageNo: `VY-2026-${Math.floor(10 + Math.random() * 90)}`,
      exporterShipper: newExpShipper,
      consignee: newExpConsignee,
      originPort: newExpOrigin,
      destinationPort: newExpDest,
      customsDeclNo: `CUS-DECL-${Math.floor(100000 + Math.random() * 900000)}`,
      totalUnits: Number(newExpUnits),
      totalWeightMT: Number(newExpWeight),
      dgClass: newExpDgClass,
      customsClearanceStatus: 'Cleared & Released',
      digitalHashHMAC: `sha256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      ediFormat: newExpFormat,
    };

    setExportManifests((prev) => [newRecord, ...prev]);
    setSelectedExportManifestId(newRecord.id);
    setNewExpShipper('');
    setNewExpConsignee('');
    setExportSuccessNotice(`Export Manifest ${newRecord.manifestNo} created & signed with HMAC digital customs notary!`);
  };

  const handleCopyEdiPayload = () => {
    navigator.clipboard.writeText(`
UNB+UNOA:2+CUSTOMS_IND+PORT_MAL+260801:0240+901'
UNH+1+CUSCAR:D:95B:UN'
BGM+851+${activeExportManifest.manifestNo}+9'
RFF+ACE:${activeExportManifest.customsDeclNo}'
TDT+20+${activeExportManifest.voyageNo}+1++:${activeExportManifest.vesselName}'
LOC+5+${activeExportManifest.originPort}'
LOC+61+${activeExportManifest.destinationPort}'
NAD+CZ+${activeExportManifest.exporterShipper}'
NAD+CN+${activeExportManifest.consignee}'
MEA+AAE+G+KGM:${activeExportManifest.totalWeightMT * 1000}'
FTX+AAA+++DG CLASS: ${activeExportManifest.dgClass}'
AUT+${activeExportManifest.digitalHashHMAC}'
UNT+12+1'
UNZ+1+901'
    `.trim());
    setCopiedEdiNotice(true);
    setTimeout(() => setCopiedEdiNotice(false), 2500);
  };

  // ==========================================
  // 10. CARGO NOTIFICATION & ALERTS ENGINE
  // ==========================================
  interface CargoNotificationLog {
    id: string;
    cargoRef: string;
    consigneeContact: string;
    channel: 'SMS' | 'WhatsApp' | 'Webhook' | 'Email';
    eventTrigger: 'Customs Cleared' | 'Vessel Departure' | 'Delay Alert' | 'Discharged at Port' | 'Out for Delivery';
    timestamp: string;
    messageBody: string;
    deliveryStatus: 'Delivered (100%)' | 'In Flight Mesh' | 'Queued Retry';
  }

  const [cargoNotifications, setCargoNotifications] = useState<CargoNotificationLog[]>([
    {
      id: 'NOTIF-901',
      cargoRef: 'CRGO-8842 / BL-8842-COK',
      consigneeContact: '+960 771-8821 (Malé Resort Supplies)',
      channel: 'WhatsApp',
      eventTrigger: 'Customs Cleared',
      timestamp: '2026-08-01 02:10 UTC',
      messageBody: 'Your cargo container CRGO-8842 cleared Malé Customs Terminal. Gate Pass #GP-9921 generated.',
      deliveryStatus: 'Delivered (100%)',
    },
    {
      id: 'NOTIF-902',
      cargoRef: 'CRGO-9012 / BL-9012-CMB',
      consigneeContact: 'webhook://api.shipping.lk/v1/events',
      channel: 'Webhook',
      eventTrigger: 'Delay Alert',
      timestamp: '2026-08-01 01:30 UTC',
      messageBody: 'Swell alert in Gulf of Mannar. Vessel IMO-9752109 ETA revised +2.5 hours.',
      deliveryStatus: 'Delivered (100%)',
    },
    {
      id: 'NOTIF-903',
      cargoRef: 'CRGO-7731 / BL-7731-BOM',
      consigneeContact: '+91 98200-11234 (Apex Logistics)',
      channel: 'SMS',
      eventTrigger: 'Vessel Departure',
      timestamp: '2026-07-31 22:45 UTC',
      messageBody: 'Container loaded onto Bay Bounty Container Carrier. Departure confirmed from Pier 04.',
      deliveryStatus: 'Delivered (100%)',
    },
  ]);

  const [notifCargoRefInput, setNotifCargoRefInput] = useState('CRGO-8842');
  const [notifContactInput, setNotifContactInput] = useState('+960 788-9900');
  const [notifChannel, setNotifChannel] = useState<'SMS' | 'WhatsApp' | 'Webhook' | 'Email'>('WhatsApp');
  const [notifEvent, setNotifEvent] = useState<'Customs Cleared' | 'Vessel Departure' | 'Delay Alert' | 'Discharged at Port' | 'Out for Delivery'>('Customs Cleared');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifSuccessNotice, setNotifSuccessNotice] = useState('');

  const handleSendCargoNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifCargoRefInput || !notifContactInput) return;

    const newLog: CargoNotificationLog = {
      id: `NOTIF-${Date.now()}`,
      cargoRef: notifCargoRefInput,
      consigneeContact: notifContactInput,
      channel: notifChannel,
      eventTrigger: notifEvent,
      timestamp: '2026-08-01 02:40 UTC',
      messageBody: notifMessage || `Alert for ${notifCargoRefInput}: Event '${notifEvent}' triggered successfully.`,
      deliveryStatus: 'Delivered (100%)',
    };

    setCargoNotifications((prev) => [newLog, ...prev]);
    setNotifSuccessNotice(`Notification dispatched to ${notifContactInput} via ${notifChannel}!`);
    setNotifMessage('');
  };

  // ==========================================
  // 11. VISUAL MANIFEST DECK & CONTAINER BAY MAP
  // ==========================================
  interface ContainerCell {
    bay: string;
    tier: number;
    col: number;
    containerId: string;
    blNumber: string;
    cargoType: 'Refrigerated Reefer ❄️' | 'Hazardous DG ⚠️' | 'Standard Dry 📦' | 'Flat Rack 📐' | 'Empty Bay ⬜';
    weightMT: number;
    destination: string;
    temperatureCelsius?: number;
    sealNo: string;
  }

  const [selectedVisualVessel, setSelectedVisualVessel] = useState<string>('Bay Bounty Container Carrier');
  const [visualDeckFilterType, setVisualDeckFilterType] = useState<string>('All');
  const [inspectedContainer, setInspectedContainer] = useState<ContainerCell | null>({
    bay: 'Bay 01 (Forward Deck)',
    tier: 4,
    col: 1,
    containerId: 'CRGO-8842',
    blNumber: 'BL-8842-COK',
    cargoType: 'Refrigerated Reefer ❄️',
    weightMT: 24.5,
    destination: 'Malé Commercial Harbour',
    temperatureCelsius: -18,
    sealNo: 'SEAL-99812',
  });

  const containerBayMapData: ContainerCell[] = [
    { bay: 'Bay 01 (Forward Deck)', tier: 4, col: 1, containerId: 'CRGO-8842', blNumber: 'BL-8842-COK', cargoType: 'Refrigerated Reefer ❄️', weightMT: 24.5, destination: 'Malé Commercial Harbour', temperatureCelsius: -18, sealNo: 'SEAL-99812' },
    { bay: 'Bay 01 (Forward Deck)', tier: 4, col: 2, containerId: 'CRGO-9012', blNumber: 'BL-9012-CMB', cargoType: 'Hazardous DG ⚠️', weightMT: 28.0, destination: 'Chittagong Port', sealNo: 'SEAL-44120' },
    { bay: 'Bay 01 (Forward Deck)', tier: 4, col: 3, containerId: 'CRGO-7731', blNumber: 'BL-7731-BOM', cargoType: 'Standard Dry 📦', weightMT: 19.2, destination: 'Colombo Harbour', sealNo: 'SEAL-88219' },
    { bay: 'Bay 01 (Forward Deck)', tier: 3, col: 1, containerId: 'CRGO-1102', blNumber: 'BL-1102-MAL', cargoType: 'Refrigerated Reefer ❄️', weightMT: 22.0, destination: 'Malé Commercial Harbour', temperatureCelsius: -20, sealNo: 'SEAL-11092' },
    { bay: 'Bay 01 (Forward Deck)', tier: 3, col: 2, containerId: 'CRGO-3391', blNumber: 'BL-3391-JNP', cargoType: 'Flat Rack 📐', weightMT: 35.0, destination: 'Kochi Port', sealNo: 'SEAL-33104' },
    { bay: 'Bay 01 (Forward Deck)', tier: 3, col: 3, containerId: 'CRGO-5542', blNumber: 'BL-5542-CGP', cargoType: 'Standard Dry 📦', weightMT: 18.0, destination: 'Chittagong Port', sealNo: 'SEAL-55201' },
    { bay: 'Bay 03 (Midship Deck)', tier: 4, col: 1, containerId: 'CRGO-6671', blNumber: 'BL-6671-MLE', cargoType: 'Standard Dry 📦', weightMT: 21.4, destination: 'Malé Commercial Harbour', sealNo: 'SEAL-66102' },
    { bay: 'Bay 03 (Midship Deck)', tier: 4, col: 2, containerId: 'CRGO-2289', blNumber: 'BL-2289-COK', cargoType: 'Hazardous DG ⚠️', weightMT: 29.8, destination: 'Colombo Harbour', sealNo: 'SEAL-22901' },
    { bay: 'Bay 03 (Midship Deck)', tier: 4, col: 3, containerId: 'CRGO-4410', blNumber: 'BL-4410-BOM', cargoType: 'Refrigerated Reefer ❄️', weightMT: 23.1, destination: 'JNPT Mumbai', temperatureCelsius: -15, sealNo: 'SEAL-44019' },
    { bay: 'Bay 03 (Midship Deck)', tier: 3, col: 1, containerId: 'CRGO-9920', blNumber: 'BL-9920-MLE', cargoType: 'Standard Dry 📦', weightMT: 20.0, destination: 'Malé Commercial Harbour', sealNo: 'SEAL-99012' },
    { bay: 'Bay 03 (Midship Deck)', tier: 3, col: 2, containerId: 'CRGO-8811', blNumber: 'BL-8811-CGP', cargoType: 'Standard Dry 📦', weightMT: 17.5, destination: 'Chittagong Port', sealNo: 'SEAL-88102' },
    { bay: 'Bay 03 (Midship Deck)', tier: 3, col: 3, containerId: 'CRGO-7700', blNumber: 'BL-7700-CMB', cargoType: 'Flat Rack 📐', weightMT: 31.2, destination: 'Colombo Harbour', sealNo: 'SEAL-77091' },
  ];

  // ==========================================
  // 12. MULTI-CARGO BATCH TRACKING STATES
  // ==========================================
  interface BatchCargoItem {
    id: string;
    containerId: string;
    blNumber: string;
    vesselName: string;
    cargoCategory: string;
    origin: string;
    destination: string;
    currentLocation: string;
    progressPct: number;
    eta: string;
    status: 'In Transit' | 'Customs Cleared' | 'Port Docked' | 'Monsoon Delay';
    weightMT: number;
    consignee: string;
  }

  const [batchSearchInput, setBatchSearchInput] = useState<string>(
    'CRGO-8842, CRGO-9012, CRGO-7731, CRGO-1102, CRGO-3391'
  );
  const [activeBatchItems, setActiveBatchItems] = useState<BatchCargoItem[]>([
    {
      id: 'B-101',
      containerId: 'CRGO-8842',
      blNumber: 'BL-8842-COK',
      vesselName: 'Lakshadweep Samudra Cargo Express',
      cargoCategory: 'Chilled Produce & Island Provisions',
      origin: 'Kochi Port (India)',
      destination: 'Malé Commercial Harbour (Maldives)',
      currentLocation: '8°20\'N 74°10\'E (Arabian Sea)',
      progressPct: 75,
      eta: '2026-08-01 18:00 UTC',
      status: 'In Transit',
      weightMT: 24.5,
      consignee: 'Maldives State Trading Organization',
    },
    {
      id: 'B-102',
      containerId: 'CRGO-9012',
      blNumber: 'BL-9012-CMB',
      vesselName: 'Bay Bounty Container Carrier',
      cargoCategory: 'Industrial Machinery & Spare Parts',
      origin: 'Colombo Port (Sri Lanka)',
      destination: 'Chittagong Port (Bangladesh)',
      currentLocation: 'Bay of Bengal Off-Coast',
      progressPct: 40,
      eta: '2026-08-03 08:30 UTC',
      status: 'Monsoon Delay',
      weightMT: 28.0,
      consignee: 'Chittagong Port Authority',
    },
    {
      id: 'B-103',
      containerId: 'CRGO-7731',
      blNumber: 'BL-7731-BOM',
      vesselName: 'Lakshadweep Samudra Cargo Express',
      cargoCategory: 'Solar PV Panels & Storage Batteries',
      origin: 'JNPT Mumbai (India)',
      destination: 'Kavaratti Atoll Pier',
      currentLocation: 'Kavaratti Port Terminal',
      progressPct: 100,
      eta: 'Arrived (2026-07-31)',
      status: 'Customs Cleared',
      weightMT: 19.2,
      consignee: 'Lakshadweep Renewable Power Board',
    },
    {
      id: 'B-104',
      containerId: 'CRGO-1102',
      blNumber: 'BL-1102-MAL',
      vesselName: 'Colpetty Malé Inter-Atoll Flyer',
      cargoCategory: 'Luxury Resort Beverage Logistics',
      origin: 'Malé Port',
      destination: 'Addu Atoll Commercial Terminal',
      currentLocation: 'Addu Berth 02',
      progressPct: 95,
      eta: '2026-08-01 15:00 UTC',
      status: 'Port Docked',
      weightMT: 22.0,
      consignee: 'Soneva Fushi Logistics Dept',
    },
    {
      id: 'B-105',
      containerId: 'CRGO-3391',
      blNumber: 'BL-3391-JNP',
      vesselName: 'Bay Bounty Container Carrier',
      cargoCategory: 'Construction Steel Girders',
      origin: 'JNPT Mumbai',
      destination: 'Kochi Port Terminal',
      currentLocation: 'En-route Off Mangalore Coast',
      progressPct: 60,
      eta: '2026-08-02 12:00 UTC',
      status: 'In Transit',
      weightMT: 35.0,
      consignee: 'Cochin Shipyard Infrastructure',
    },
  ]);

  const [batchNotice, setBatchNotice] = useState<string>('');

  const handleProcessBatchSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setBatchNotice(`Batch query executed for ${batchSearchInput.split(',').length} B/L references. Unified tracking table updated!`);
  };

  // ==========================================
  // 13. SMART CARGO REROUTING STATES & LOGIC
  // ==========================================
  const [selectedRerouteShipmentId, setSelectedRerouteShipmentId] = useState<string>('REROUTE-9082');
  const [selectedRerouteOption, setSelectedRerouteOption] = useState<'optionA' | 'optionB' | 'optionC'>('optionA');
  const [rerouteNotice, setRerouteNotice] = useState<string | null>(null);

  const REROUTE_SHIPMENTS = [
    {
      id: 'REROUTE-9082',
      shipmentName: 'Malé Atoll Express Cargo (OB-CRG-9082)',
      vesselName: 'Lakshadweep Samudra Cargo Express',
      currentRoute: 'Kochi Port (IN) ➔ Malé Commercial Harbour (MV)',
      hazardAlert: 'Category 3 Tropical Cyclone & Monsoonal Sea Swell (5.2m waves)',
      cargoValueUSD: '$420,000',
      options: {
        optionA: {
          title: 'Route A: Direct High-Sea Deep Bypass',
          distanceNM: '+120 NM',
          etaImpact: '+6 Hours',
          fuelCostDeltaUSD: '+$450 USD',
          co2Savings: '-12% Emissions (Optimized Speed)',
          riskLevel: 'Low Risk',
          description: 'Detours around the cyclone core via deep ocean waters south of Nine Degree Channel.',
        },
        optionB: {
          title: 'Route B: Inshore Archipelago Channel Passage',
          distanceNM: '+85 NM',
          etaImpact: '+3.5 Hours',
          fuelCostDeltaUSD: '+$280 USD',
          co2Savings: '-8% Emissions',
          riskLevel: 'Moderate Risk (Shallow Waters)',
          description: 'Navigates sheltered island lagoons with shallower draft restrictions.',
        },
        optionC: {
          title: 'Route C: Temporary Holding Anchorage at Cochin Port',
          distanceNM: '0 NM (Hold)',
          etaImpact: '+24 Hours',
          fuelCostDeltaUSD: '+$150 USD Port Holding Fee',
          co2Savings: 'Zero Voyage Fuel Consumption',
          riskLevel: 'Minimal Risk',
          description: 'Waits out storm cell at safe outer anchorage before resuming original path.',
        },
      },
    },
    {
      id: 'REROUTE-4412',
      shipmentName: 'Bay Bounty Container Carrier (OB-CRG-4412)',
      vesselName: 'Bay Bounty Container Carrier',
      currentRoute: 'Colombo Port (LK) ➔ Chittagong Port (BD)',
      hazardAlert: 'Port Congestion Queue (18 Ships Waiting at Chittagong Anchorage)',
      cargoValueUSD: '$1,250,000',
      options: {
        optionA: {
          title: 'Route A: Transshipment Divert to Mongla Port',
          distanceNM: '+45 NM',
          etaImpact: '-14 Hours (Saves Queue Time)',
          fuelCostDeltaUSD: '+$320 USD',
          co2Savings: '-18% Waiting Fuel Burn',
          riskLevel: 'Optimal Efficiency',
          description: 'Reroutes cargo to Mongla Port with instant rail transfer to Dhaka.',
        },
        optionB: {
          title: 'Route B: Speed Throttling Eco-Sailing',
          distanceNM: '0 NM',
          etaImpact: '+18 Hours',
          fuelCostDeltaUSD: '-$620 USD (Fuel Saved)',
          co2Savings: '-25% Fuel Burn',
          riskLevel: 'Low Risk',
          description: 'Slows voyage speed from 22 knots to 12 knots to align arrival with berth opening.',
        },
        optionC: {
          title: 'Route C: Secondary Feeder Vessel Lighterage',
          distanceNM: '+20 NM',
          etaImpact: '+5 Hours',
          fuelCostDeltaUSD: '+$500 USD Lighterage',
          co2Savings: 'Neutral',
          riskLevel: 'Moderate Handling Risk',
          description: 'Unloads containers onto shallow-draft feeder barges at outer sea.',
        },
      },
    },
  ];

  const handleExecuteReroute = () => {
    const shipment = REROUTE_SHIPMENTS.find((s) => s.id === selectedRerouteShipmentId) || REROUTE_SHIPMENTS[0];
    const opt = shipment.options[selectedRerouteOption];
    setRerouteNotice(`Shipment ${shipment.shipmentName} reroute EXECUTED! Vessel trajectory updated to '${opt.title}'. Coastal AIS relays notified.`);
  };

  // ==========================================
  // 14. GLOBAL LOGISTICS DASHBOARD STATES
  // ==========================================
  const [globalLogisticsRegion, setGlobalLogisticsRegion] = useState<string>('All');

  const GLOBAL_LOGISTICS_HUBS = [
    { name: 'Colombo Hub', country: 'Sri Lanka 🇱🇰', region: 'South Asia', teuCapacity: '7.2M TEU/yr', activeShips: 38, avgWaitHours: 4.2, congestion: 'Low Congestion', efficiencyScore: 94 },
    { name: 'Singapore Port', country: 'Singapore 🇸🇬', region: 'Southeast Asia', teuCapacity: '37.5M TEU/yr', activeShips: 112, avgWaitHours: 2.1, congestion: 'Optimal', efficiencyScore: 98 },
    { name: 'JNPT Mumbai', country: 'India 🇮🇳', region: 'South Asia', teuCapacity: '5.1M TEU/yr', activeShips: 29, avgWaitHours: 8.5, congestion: 'Moderate', efficiencyScore: 88 },
    { name: 'Malé Commercial Harbour', country: 'Maldives 🇲🇻', region: 'South Asia', teuCapacity: '450K TEU/yr', activeShips: 14, avgWaitHours: 3.0, congestion: 'Optimal', efficiencyScore: 91 },
    { name: 'Chittagong Terminal', country: 'Bangladesh 🇧🇩', region: 'South Asia', teuCapacity: '3.1M TEU/yr', activeShips: 45, avgWaitHours: 24.0, congestion: 'High Congestion', efficiencyScore: 72 },
    { name: 'Jebel Ali Dubai', country: 'UAE 🇦🇪', region: 'Middle East', teuCapacity: '14.1M TEU/yr', activeShips: 84, avgWaitHours: 3.8, congestion: 'Optimal', efficiencyScore: 96 },
  ];

  // ==========================================
  // 15. MULTI-MODE BOOKING API STATES
  // ==========================================
  const [apiBearerToken] = useState<string>('ob_live_pk_889210491823901');
  const [apiJsonRequest, setApiJsonRequest] = useState<string>(
    JSON.stringify(
      {
        passengerName: 'Captain Alex Vance',
        passportId: 'A88920182',
        legs: [
          { mode: 'AIR', origin: 'BOM', destination: 'MLE', carrier: 'OceanAir Express' },
          { mode: 'SEA', origin: 'Malé Port', destination: 'Addu Atoll', vessel: 'Lakshadweep Samudra' },
        ],
        cargoItems: [{ description: 'Maritime Equipment', weightKg: 120 }],
      },
      null,
      2
    )
  );
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiIsSending, setApiIsSending] = useState<boolean>(false);
  const [apiCopiedCode, setApiCopiedCode] = useState<boolean>(false);

  const handleTestMultiModeApi = (e: React.FormEvent) => {
    e.preventDefault();
    setApiIsSending(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiIsSending(false);
      setApiResponse({
        status: 200,
        statusText: 'OK',
        timestamp: new Date().toISOString(),
        data: {
          pnr: `MM-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'CONFIRMED',
          totalAmountUSD: 680,
          qrValidationToken: 'QR-TOKEN-OB-MM-889123',
          legsConfirmed: [
            { sequence: 1, mode: 'Air Flight', pnr: 'AIR-99201', seat: '14B' },
            { sequence: 2, mode: 'Ocean Cruise', pnr: 'SEA-88412', cabin: 'Suite 204' },
            { sequence: 3, mode: 'Island Shuttle', pnr: 'SHT-11029', seat: 'VVIP-01' },
          ],
          message: 'Multi-Modal itinerary successfully booked via OceanBird v2 API.',
        },
      });
    }, 600);
  };

  // ==========================================
  // 16. SMART MANIFEST AI STATES & LOGIC
  // ==========================================
  const SMART_MANIFEST_SAMPLES = [
    {
      id: 'sample-male',
      title: 'Malé Atoll Resort Supplies (OB-MNF-9921)',
      raw: `BILL OF LADING / PACKING MANIFEST Ref: OB-MNF-9921
Consignor: Maldivian Resort Supply Co., Male
Consignee: Villa Nautica Resort Atoll
Items:
1. 12 TEU Structural Steel Beams & Girders (HS Code: 7216) - 18,400 kg
2. 4 Reefer Containers Refrigerated Butter & Dairy (HS Code: 0401) - 6,200 kg
3. 2 Container Lithium-Ion Battery Energy Storage Systems (UN3481, IMO Class 9 Dangerous Goods) - 4,800 kg
Declaration: Standard marine Bill of Lading attached. MSDS provided for batteries.`,
    },
    {
      id: 'sample-colombo',
      title: 'Colombo Tea & Chemical Solvents (OB-MNF-4410)',
      raw: `BILL OF LADING / PACKING MANIFEST Ref: OB-MNF-4410
Consignor: Ceylon Spice & Tea Exporters, Colombo
Consignee: Hamburg Trade Logistics
Items:
1. 20 TEU Premium Pure Black Ceylon Tea (HS Code: 0902) - 24,000 kg
2. 3 IMO Class 3 Flammable Liquid Solvents Drums (UN1263 Paint Material) - 3,100 kg
3. 2 Containers Cardamom & Cinnamon Spices (HS Code: 0908) - 2,900 kg
Declaration: Phytosanitary Certificate pending verification from Colombo Port.`,
    },
    {
      id: 'sample-kochi',
      title: 'Kochi Industrial Diesel Engines (OB-MNF-7723)',
      raw: `BILL OF LADING / PACKING MANIFEST Ref: OB-MNF-7723
Consignor: Cochin Shipyard & Heavy Eng, Kochi
Consignee: Port Blair Harbour Board, Andaman
Items:
1. 8 Heavy Duty Marine Winches (HS Code: 8425) - 14,200 kg
2. 2 Auxiliary Shipboard Diesel Generator Engines (HS Code: 8408) - 11,800 kg
3. 1 High-Pressure Compressed Gas Cylinder Rack (UN1002 IMO Class 2.2 Non-Flammable Gas) - 1,400 kg
Declaration: Weight distribution verified. Deck loading permit attached.`,
    },
  ];

  const [smartManifestText, setSmartManifestText] = useState<string>(SMART_MANIFEST_SAMPLES[0].raw);
  const [smartManifestIsAnalyzing, setSmartManifestIsAnalyzing] = useState<boolean>(false);
  const [smartManifestAuditResult, setSmartManifestAuditResult] = useState<{
    score: number;
    status: 'CLEARED' | 'HAZMAT_INSPECTION_REQ' | 'DOCUMENTATION_HOLD';
    hsCodes: { code: string; name: string; rate: string; compliance: string }[];
    hazmats: { class: string; un: string; description: string; protocol: string }[];
    weightBalancePct: number;
    estimatedTariffUSD: number;
    aiRecommendations: string[];
  }>({
    score: 94,
    status: 'HAZMAT_INSPECTION_REQ',
    hsCodes: [
      { code: '7216', name: 'Structural Steel Beams & Girders', rate: '2.5% Custom Duty', compliance: 'VERIFIED ✅' },
      { code: '0401', name: 'Refrigerated Dairy & Butter', rate: '0.0% Essential Food Waiver', compliance: 'VERIFIED ✅' },
    ],
    hazmats: [
      {
        class: 'Class 9',
        un: 'UN3481',
        description: 'Lithium-Ion Battery Storage Systems',
        protocol: 'Temperature & thermal runaway monitoring required on deck.',
      },
    ],
    weightBalancePct: 91,
    estimatedTariffUSD: 1450,
    aiRecommendations: [
      'Ensure IMO Class 9 Dangerous Goods placard is clearly displayed on container #2.',
      'Verify temperature data logger calibration for the 4 reefer dairy containers prior to boarding.',
      'Customs duty exemption applies under Maldives Resort Infrastructure Tariff Act.',
    ],
  });

  const handleAnalyzeManifestAI = () => {
    setSmartManifestIsAnalyzing(true);
    setTimeout(() => {
      setSmartManifestIsAnalyzing(false);
      const containsHazmat = smartManifestText.toLowerCase().includes('class') || smartManifestText.toLowerCase().includes('un') || smartManifestText.toLowerCase().includes('flammable');
      const containsDocHold = smartManifestText.toLowerCase().includes('pending') || smartManifestText.toLowerCase().includes('missing');

      let computedStatus: 'CLEARED' | 'HAZMAT_INSPECTION_REQ' | 'DOCUMENTATION_HOLD' = 'CLEARED';
      let score = 98;
      if (containsHazmat) {
        computedStatus = 'HAZMAT_INSPECTION_REQ';
        score = 88;
      }
      if (containsDocHold) {
        computedStatus = 'DOCUMENTATION_HOLD';
        score = 76;
      }

      setSmartManifestAuditResult({
        score,
        status: computedStatus,
        hsCodes: [
          { code: '8425', name: 'Heavy Industrial Winches', rate: '3.0% Duty', compliance: 'VERIFIED ✅' },
          { code: '8408', name: 'Marine Propulsion Engines', rate: '1.5% Duty', compliance: 'VERIFIED ✅' },
        ],
        hazmats: containsHazmat
          ? [
              {
                class: 'Class 3 / Class 9',
                un: 'UN1263 / UN3481',
                description: 'Hazardous Liquids / Battery Assemblies',
                protocol: 'Stowage Category A away from living quarters with fire suppression ready.',
              },
            ]
          : [],
        weightBalancePct: 92,
        estimatedTariffUSD: Math.floor(1200 + Math.random() * 2500),
        aiRecommendations: [
          'AI manifest audit complete. Cargo description mapped to international HS codes.',
          containsHazmat ? 'Hazmat Declaration form IMO-11B verified by AI engine.' : 'No dangerous goods flagged.',
          containsDocHold ? 'Action required: Obtain missing Phytosanitary / Port Origin seals from issuer.' : 'All shipping documentation compliant.',
        ],
      });
    }, 700);
  };

  // ==========================================
  // 17. GLOBAL LOGISTICS HEAT MAP STATES
  // ==========================================
  const [logisticsHeatMapMetric, setLogisticsHeatMapMetric] = useState<'density' | 'congestion' | 'swell' | 'fuel'>('density');
  const [logisticsHeatMapSearch, setLogisticsHeatMapSearch] = useState<string>('');

  const GLOBAL_HEATMAP_ZONES = [
    {
      id: 'hm-1',
      name: 'Malacca Strait Chokepoint',
      region: 'Southeast Asia',
      densityScore: 98,
      congestionText: 'CRITICAL (8.5h Delay)',
      swellM: 1.8,
      fuelPriceUSD: 640,
      heatBadge: 'CRITICAL HOTSPOT 🔴',
      activeShips: 142,
      activeTEU: '54,200 TEU',
      description: 'World’s highest vessel density maritime pass. Heavy container queue approaching Singapore anchorage.',
    },
    {
      id: 'hm-2',
      name: 'Nine Degree Channel (Lakshadweep)',
      region: 'South Asia',
      densityScore: 68,
      congestionText: 'LOW (0.8h Delay)',
      swellM: 4.8,
      fuelPriceUSD: 590,
      heatBadge: 'HIGH SEA SWELL 🟠',
      activeShips: 28,
      activeTEU: '18,400 TEU',
      description: 'Monsoonal wave heights reaching 4.8m. Deep-sea vessels navigating with speed throttled to 12 knots.',
    },
    {
      id: 'hm-3',
      name: 'Colombo Outer Anchorage',
      region: 'South Asia',
      densityScore: 84,
      congestionText: 'MODERATE (2.4h Delay)',
      swellM: 2.2,
      fuelPriceUSD: 585,
      heatBadge: 'ACTIVE TRANSSHIPMENT 🟡',
      activeShips: 46,
      activeTEU: '38,100 TEU',
      description: 'Major South Asian transshipment hub. Container crane productivity at 91% capacity.',
    },
    {
      id: 'hm-4',
      name: 'Suez Canal Southern Entrance',
      region: 'Middle East',
      densityScore: 91,
      congestionText: 'HIGH (5.2h Delay)',
      swellM: 1.4,
      fuelPriceUSD: 655,
      heatBadge: 'CONVOY BOTTLENECK 🔴',
      activeShips: 89,
      activeTEU: '72,800 TEU',
      description: 'Northbound convoys proceeding under pilotage guidance. Waiting times expanding at Red Sea entry.',
    },
    {
      id: 'hm-5',
      name: 'Malé Commercial Harbour Lagoon',
      region: 'South Asia',
      densityScore: 52,
      congestionText: 'OPTIMAL (0.2h Delay)',
      swellM: 1.1,
      fuelPriceUSD: 610,
      heatBadge: 'CLEAR PASSAGE 🟢',
      activeShips: 16,
      activeTEU: '4,500 TEU',
      description: 'Inter-island supply barges landing smoothly at North Malé Atoll berths.',
    },
    {
      id: 'hm-6',
      name: 'Bay of Bengal Trade Corridor',
      region: 'South Asia',
      densityScore: 74,
      congestionText: 'HIGH (18.0h Chittagong Queue)',
      swellM: 3.2,
      fuelPriceUSD: 600,
      heatBadge: 'PORT CONGESTION 🟠',
      activeShips: 52,
      activeTEU: '29,000 TEU',
      description: 'Chittagong port gantry crane queue causing feeder vessel backlog across outer bay.',
    },
  ];

  // ==========================================
  // 18. LOGISTICS TIER PERKS STATES
  // ==========================================
  const [logisticsTier] = useState<'Bronze Shipper' | 'Silver Carrier' | 'Gold Fleet Master' | 'Diamond Global Titan'>('Gold Fleet Master');
  const [claimedPerks, setClaimedPerks] = useState<string[]>(['perk-berth-01']);
  const [logisticsPerksNotice, setLogisticsPerksNotice] = useState<string | null>(null);

  const LOGISTICS_PERKS_LIST = [
    {
      id: 'perk-berth-01',
      title: '24/7 Priority Berth Discharge Allocation',
      category: 'Port Pilotage',
      tierRequired: 'Gold Fleet Master',
      valueUSD: '$1,800 Value',
      description: 'Guarantees immediate pilot boat greeting and priority crane quay placement within 45 minutes of port arrival.',
    },
    {
      id: 'perk-demurrage-02',
      title: '7-Day Zero Demurrage Container Extension',
      category: 'Storage Waiver',
      tierRequired: 'Gold Fleet Master',
      valueUSD: '$2,400 Waiver',
      description: 'Waives daily container storage fees for up to 7 additional days at Colombo, JNPT Mumbai, or Singapore Port.',
    },
    {
      id: 'perk-fuel-03',
      title: '$45 / MT Marine Bunkering Fuel Subsidy',
      category: 'Fuel Savings',
      tierRequired: 'Diamond Global Titan',
      valueUSD: '$4,500 / Voyage',
      description: 'Direct discount on Low Sulfur Fuel Oil (VLSFO) refuelling barges across Indian Ocean ports.',
    },
    {
      id: 'perk-customs-04',
      title: 'Customs Express Green-Lane Seal',
      category: 'Customs Fast-Track',
      tierRequired: 'Silver Carrier',
      valueUSD: 'Bypasses Inspection Queue',
      description: 'Pre-vetted AI customs clearance seal authorizing instant container release without physical gate holds.',
    },
  ];

  const handleClaimPerk = (perkId: string, title: string) => {
    if (claimedPerks.includes(perkId)) return;
    setClaimedPerks([...claimedPerks, perkId]);
    setLogisticsPerksNotice(`Perk '${title}' successfully claimed & applied to your Gold Fleet Master profile!`);
    setTimeout(() => setLogisticsPerksNotice(null), 4000);
  };

  // ==========================================
  // 19. PREDICTIVE ROUTE ALERT STATES
  // ==========================================
  const [predictiveAlertFilter, setPredictiveAlertFilter] = useState<'All' | 'Critical' | 'High' | 'Warning' | 'Info'>('All');
  const [predictiveAlertBroadcastNotice, setPredictiveAlertBroadcastNotice] = useState<string | null>(null);

  const PREDICTIVE_ROUTE_ALERTS = [
    {
      id: 'ALT-9901',
      title: 'Tropical Cyclonic Swell Cell in Laccadive Sea',
      severity: 'Critical' as const,
      affectedVessels: 14,
      impactWindow: 'Next 6-12 Hours',
      predictedDelayHours: 8.5,
      region: 'Arabian Sea / South Asia',
      protocol: 'Reroute via Nine Degree Channel Deep Bypass or throttle speed to 10 knots.',
    },
    {
      id: 'ALT-8822',
      title: 'Chittagong Outer Anchorage Gantry Crane Queue Backlog',
      severity: 'High' as const,
      affectedVessels: 22,
      impactWindow: '24-48 Hours',
      predictedDelayHours: 18.0,
      region: 'Bay of Bengal',
      protocol: 'Divert perishable cargo to Mongla Port lighterage or request slow-steaming ETA alignment.',
    },
    {
      id: 'ALT-7734',
      title: 'Malé Harbour Shallow Lagoon Spring Tide Low-Water Draft Warning',
      severity: 'Warning' as const,
      affectedVessels: 6,
      impactWindow: 'Next 4 Hours',
      predictedDelayHours: 3.0,
      region: 'Maldivian Waters',
      protocol: 'Delay heavy draft container landing until high tide peak at 18:30 UTC.',
    },
    {
      id: 'ALT-6610',
      title: 'Singapore Bunkering Barge Supply Queue',
      severity: 'Info' as const,
      affectedVessels: 35,
      impactWindow: '12-24 Hours',
      predictedDelayHours: 2.0,
      region: 'Strait of Malacca',
      protocol: 'Pre-book bunkering slot via OceanBird API to lock in guaranteed fuel barge timeline.',
    },
  ];

  const handleBroadcastRouteAlert = () => {
    setPredictiveAlertBroadcastNotice('PREDICTIVE ROUTE ALERT BROADCAST EXECUTED! Automated AIS VHF emergency bulletins and fleet captain mobile notifications dispatched.');
    setTimeout(() => setPredictiveAlertBroadcastNotice(null), 5000);
  };

  // ==========================================
  // 20. MARITIME ESG REPORT STATES & LOGIC
  // ==========================================
  const [esgVesselFilter, setEsgVesselFilter] = useState<string>('All Vessels');
  const [esgNotice, setEsgNotice] = useState<string | null>(null);

  // Carbon Tax & Compliance Estimator States
  const [carbonVoyageDays, setCarbonVoyageDays] = useState<number>(10);
  const [carbonDailyFuelTons, setCarbonDailyFuelTons] = useState<number>(30);
  const [carbonFuelType, setCarbonFuelType] = useState<string>('VLSFO (Very Low Sulfur)');
  const [carbonTaxRatePerTon, setCarbonTaxRatePerTon] = useState<number>(90);
  const [carbonTaxJurisdiction, setCarbonTaxJurisdiction] = useState<string>('EU ETS Maritime Framework');

  const getEmissionsFactor = (fuel: string) => {
    if (fuel.includes('HFO')) return 3.114;
    if (fuel.includes('VLSFO')) return 3.151;
    if (fuel.includes('LNG')) return 2.750;
    if (fuel.includes('Biofuel')) return 2.180;
    return 3.0;
  };

  const getBiofuelDiscount = (fuel: string) => {
    if (fuel.includes('Biofuel')) return 0.30;
    if (fuel.includes('LNG')) return 0.15;
    return 0.0;
  };

  const calcTotalFuelTons = carbonVoyageDays * carbonDailyFuelTons;
  const calcEmissionsFactor = getEmissionsFactor(carbonFuelType);
  const calcGrossCo2Tons = calcTotalFuelTons * calcEmissionsFactor;
  const calcBiofuelDiscount = getBiofuelDiscount(carbonFuelType);
  const calcNetCo2Tons = calcGrossCo2Tons * (1 - calcBiofuelDiscount);
  const calcGrossTaxLiability = calcGrossCo2Tons * carbonTaxRatePerTon;
  const calcNetTaxLiability = calcNetCo2Tons * carbonTaxRatePerTon;
  const calcTaxSavings = calcGrossTaxLiability - calcNetTaxLiability;

  const ESG_FLEET_DATA = [
    {
      vesselName: 'Lakshadweep Samudra Cargo Express',
      imoNumber: 'IMO-9821041',
      ciiRating: 'A (Super Efficient)',
      co2TonnesPerVoyage: 18.4,
      eexiScore: 92.5,
      biofuelBlendPct: 30,
      soxScrubberStatus: 'Active - Zero Sox',
      ballastCompliance: '100% Cleared (UV Bio-Filter)',
      carbonCreditsEarned: 1420,
    },
    {
      vesselName: 'Bay Bounty Container Carrier',
      imoNumber: 'IMO-9410298',
      ciiRating: 'B (High Performance)',
      co2TonnesPerVoyage: 42.1,
      eexiScore: 86.0,
      biofuelBlendPct: 20,
      soxScrubberStatus: 'Active - Closed Loop',
      ballastCompliance: '100% Cleared (Ozone Purger)',
      carbonCreditsEarned: 2150,
    },
    {
      vesselName: 'Malé Atoll Inter-Island Shuttle',
      imoNumber: 'IMO-9912044',
      ciiRating: 'A (Electric Hybrid)',
      co2TonnesPerVoyage: 4.2,
      eexiScore: 98.0,
      biofuelBlendPct: 50,
      soxScrubberStatus: 'N/A (Battery Solar Drive)',
      ballastCompliance: 'Zero Ballast Discharge',
      carbonCreditsEarned: 890,
    },
  ];

  const handleGenerateEsgCert = () => {
    setEsgNotice('Official IMO MARPOL Annex VI & CII Carbon Intensity Compliance Certificate GENERATED! Downloaded as verified PDF seal.');
    setTimeout(() => setEsgNotice(null), 5000);
  };

  // ==========================================
  // 21. DIGITAL CARGO SIGNATURE STATES & LOGIC
  // ==========================================
  const [digitalSignerRole, setDigitalSignerRole] = useState<'Shipper' | 'Carrier Master' | 'Port Customs Authority' | 'Consignee'>('Carrier Master');
  const [digitalSignerName, setDigitalSignerName] = useState<string>('Captain Alex Vance');
  const [digitalDocReference, setDigitalDocReference] = useState<string>('OB-eBL-2026-889201');
  const [digitalSignatureResult, setDigitalSignatureResult] = useState<{
    isSigned: boolean;
    signedAt?: string;
    signatureHash?: string;
    verificationQr?: string;
  }>({
    isSigned: true,
    signedAt: '2026-08-01 02:45 UTC',
    signatureHash: '0x8f2a99e1c028a410b991823efca40192a88e91024',
    verificationQr: 'QR-CRYPT-OB-EBL-889201',
  });

  const handleExecuteDigitalSignature = () => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    const fakeHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setDigitalSignatureResult({
      isSigned: true,
      signedAt: timestamp,
      signatureHash: fakeHash,
      verificationQr: `QR-CRYPT-${digitalDocReference}-${Math.floor(1000 + Math.random() * 9000)}`,
    });
  };

  // ==========================================
  // 22. DYNAMIC PORT SLOTTING STATES & LOGIC
  // ==========================================
  const [slottingPort, setSlottingPort] = useState<string>('Colombo Port (LK)');
  const [slottingDate, setSlottingDate] = useState<string>('2026-08-10');
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('10:00 - 12:00 UTC (Berth #04)');
  const [slottingNotice, setSlottingNotice] = useState<string | null>(null);

  const PORT_SLOTS = [
    { time: '06:00 - 08:00 UTC', berth: 'Berth #01 (Deep-Water Gantry)', status: 'BOOKED', vessel: 'Bay Bounty Carrier' },
    { time: '08:00 - 10:00 UTC', berth: 'Berth #02 (Reefer Feeder)', status: 'AVAILABLE', vessel: 'Open Slot' },
    { time: '10:00 - 12:00 UTC (Berth #04)', berth: 'Berth #04 (Container Master Quay)', status: 'SELECTED', vessel: 'Reserved for Alex Vance' },
    { time: '12:00 - 14:00 UTC', berth: 'Berth #03 (Bulk Terminal)', status: 'AVAILABLE', vessel: 'Open Slot' },
    { time: '14:00 - 16:00 UTC', berth: 'Berth #05 (Heavy Lift)', status: 'LIMITED', vessel: '2 Ships Waiting' },
  ];

  const handleConfirmPortSlot = () => {
    setSlottingNotice(`Gantry Crane & Pilotage Slot '${selectedSlotTime}' at ${slottingPort} CONFIRMED for ${slottingDate}! Berth dispatch token issued.`);
    setTimeout(() => setSlottingNotice(null), 5000);
  };

  // ==========================================
  // 23. PREDICTIVE SUPPLY HUB STATES & LOGIC
  // ==========================================
  const [supplyCategoryFilter, setSupplyCategoryFilter] = useState<string>('All');
  const [supplyDispatchNotice, setSupplyDispatchNotice] = useState<string | null>(null);

  const PREDICTIVE_SUPPLY_ITEMS = [
    {
      id: 'SUP-01',
      itemName: 'Low Sulfur Fuel Oil (VLSFO Bunkering)',
      hubLocation: 'Colombo Supply Hub 🇱🇰',
      category: 'Bunkering Fuel',
      currentStock: '14,200 MT',
      runoutDays: 4.2,
      demandStatus: 'Critical Reorder (18 Cargo Ships En Route)',
      recommendedOrderQty: '3,500 MT',
    },
    {
      id: 'SUP-02',
      itemName: 'Synthetic Marine Cylinder Lube Oil 50W',
      hubLocation: 'JNPT Mumbai Hub 🇮🇳',
      category: 'Engine Lube',
      currentStock: '2,100 Drums',
      runoutDays: 2.1,
      demandStatus: 'Low Stock Alert (High Main Engine Consumption)',
      recommendedOrderQty: '800 Drums',
    },
    {
      id: 'SUP-03',
      itemName: 'Reefer Container High-Voltage Power Plug Racks',
      hubLocation: 'Malé Commercial Terminal 🇲🇻',
      category: 'Electrical Plugs',
      currentStock: '64 Racks',
      runoutDays: 14.0,
      demandStatus: 'Optimal Stock Level',
      recommendedOrderQty: '10 Racks',
    },
    {
      id: 'SUP-04',
      itemName: 'Desalinated Potable Fresh Water Delivery Barge',
      hubLocation: 'Port Blair Anchorage 🇮🇳',
      category: 'Fresh Water',
      currentStock: '95,000 Liters',
      runoutDays: 5.8,
      demandStatus: 'Moderate Replenishment Recommended',
      recommendedOrderQty: '25,000 Liters',
    },
  ];

  const handleTriggerSupplyDispatch = (itemName: string, qty: string) => {
    setSupplyDispatchNotice(`AUTOMATED SUPPLY DISPATCH EXECUTED! Dispatching ${qty} of '${itemName}'. Supply barge notified for priority delivery.`);
    setTimeout(() => setSupplyDispatchNotice(null), 5000);
  };

  // Filter states for Tourism
  const [tourismSearch, setTourismSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');

  // Booking Form States
  const [selectedPackage, setSelectedPackage] = useState<MarineTourismPackage | null>(MARINE_TOURISM_PACKAGES[0]);
  const [passengerName, setPassengerName] = useState('Captain Alex Vance');
  const [passportId, setPassportId] = useState('A89420185');
  const [nationality, setNationality] = useState('Indian');
  const [email, setEmail] = useState('alex.vance@maritime.org');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [passengerCount, setPassengerCount] = useState(2);
  const [travelDate, setTravelDate] = useState('2026-08-15');
  const [cabinClass, setCabinClass] = useState<'Economy Deck' | 'Business Ocean View' | 'Royal Deluxe Suite'>('Business Ocean View');
  const [paymentMethod, setPaymentMethod] = useState<'Credit / Debit Card' | 'UPI / NetBanking' | 'Wire Transfer' | 'Marine Digital Wallet' | 'Terminal Cash Counter'>('Credit / Debit Card');
  const [addInsurance, setAddInsurance] = useState(true);

  // Card Payment Gateway Input States
  const [cardNumber, setCardNumber] = useState('4532 8912 3341 8890');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('889');
  const [cardHolder, setCardHolder] = useState('Alex Vance');
  const [upiId, setUpiId] = useState('alexvance@okicici');
  const [walletBalance] = useState(2450);

  // Agent Code & Discount Validation States
  const [agentCodeInput, setAgentCodeInput] = useState('');
  const [isValidatingAgentCode, setIsValidatingAgentCode] = useState(false);
  const [agentValidationResult, setAgentValidationResult] = useState<{
    valid: boolean;
    discountPercent?: number;
    agencyName?: string;
    message?: string;
  } | null>(null);

  // Confirmed Bookings list
  const [confirmedBookings, setConfirmedBookings] = useState<TicketBooking[]>([
    {
      bookingId: 'PNT-884210',
      pnr: 'OB-88219-2026',
      passengerName: 'Sarah Jenkins',
      passportOrGovtId: 'P9402183',
      nationality: 'Singaporean',
      email: 'sarah.j@singapore.sg',
      phone: '+65 9123 4567',
      packageOrVesselTitle: 'Singapore Marina & Southern Islands Yacht Excursion',
      departurePort: 'Marina Bay Cruise Centre Singapore',
      destinationPort: 'Lazarus Island Lagoon',
      travelDate: '2026-08-10',
      passengerCount: 2,
      cabinClass: 'Royal Deluxe Suite',
      totalFareUSD: 512,
      paymentMethod: 'Credit / Debit Card',
      paymentStatus: 'COMPLETED',
      transactionRef: 'TXN-SG-9948201',
      qrToken: 'OB-QR-88219-VERIFIED',
      seatNumbers: ['DECK-VIP-04', 'DECK-VIP-05'],
      insuranceAdded: true,
      insurancePolicyId: 'POL-SG-4482',
      bookingTimestamp: '2026-07-30 14:22 UTC',
    },
    {
      bookingId: 'PNT-771920',
      pnr: 'OB-77401-2026',
      passengerName: 'Capt. Rajesh Kumar',
      passportOrGovtId: 'IND-P8829102',
      nationality: 'Indian',
      email: 'rajesh.kumar@maritime.in',
      phone: '+91 98765 43210',
      packageOrVesselTitle: 'Lakshadweep Coral Atolls & Coral Lagoon Expedition',
      departurePort: 'Kochi Port (Cochin), India',
      destinationPort: 'Agatti Atoll, Lakshadweep',
      travelDate: '2026-08-15',
      passengerCount: 2,
      cabinClass: 'Business Ocean View',
      totalFareUSD: 1220,
      paymentMethod: 'UPI / NetBanking',
      paymentStatus: 'COMPLETED',
      transactionRef: 'TXN-OB-9921448',
      qrToken: 'OB-QR-77401-VERIFIED',
      seatNumbers: ['DECK-B-14', 'DECK-B-15'],
      insuranceAdded: true,
      insurancePolicyId: 'POL-OB-99120',
      bookingTimestamp: '2026-07-31 04:30 UTC',
    },
    {
      bookingId: 'PNT-661204',
      pnr: 'OB-66102-2026',
      passengerName: 'Amina Zahir',
      passportOrGovtId: 'MV-992184',
      nationality: 'Maldivian',
      email: 'amina.z@maldives.mv',
      phone: '+960 331 4455',
      packageOrVesselTitle: 'Maldives Atoll Hopper & Liveaboard Safari',
      departurePort: 'Male Commercial Harbour, Maldives',
      destinationPort: 'Ari Atoll Reef Lagoon',
      travelDate: '2026-08-25',
      passengerCount: 1,
      cabinClass: 'Economy Deck',
      totalFareUSD: 650,
      paymentMethod: 'Marine Digital Wallet',
      paymentStatus: 'PROCESSING',
      transactionRef: 'TXN-MV-4412091',
      qrToken: 'OB-QR-66102-VERIFIED',
      seatNumbers: ['DECK-C-08'],
      insuranceAdded: false,
      bookingTimestamp: '2026-07-31 02:15 UTC',
    },
    {
      bookingId: 'AIR-902104',
      pnr: 'FL-AI-9021-2026',
      passengerName: 'Dr. Vikramaditya Sen',
      passportOrGovtId: 'IND-P902810',
      nationality: 'Indian',
      email: 'vikram.sen@airways.in',
      phone: '+91 98102 99441',
      packageOrVesselTitle: 'Intl Flight: Air India AI-342 (DEL Terminal 3 ✈️ SIN Changi T2)',
      departurePort: 'DEL - Indira Gandhi Int\'l, New Delhi (Gate 18)',
      destinationPort: 'SIN - Changi Int\'l, Singapore',
      travelDate: '2026-08-12',
      passengerCount: 2,
      cabinClass: 'Business Ocean View' as any,
      totalFareUSD: 1360,
      paymentMethod: 'Credit / Debit Card',
      paymentStatus: 'COMPLETED',
      transactionRef: 'TXN-AIR-9921004',
      qrToken: 'AIR-QR-FL-AI-9021-2026-E-TICKET-VERIFIED',
      seatNumbers: ['14A', '14B'],
      insuranceAdded: true,
      insurancePolicyId: 'POL-AIR-3301',
      bookingTimestamp: '2026-08-01 01:10 UTC',
      bookingType: 'passenger',
    },
    {
      bookingId: 'AIR-441209',
      pnr: 'FL-6E-4412-2026',
      passengerName: 'Priya Sharma',
      passportOrGovtId: 'IND-A332918',
      nationality: 'Indian',
      email: 'priya.sharma@techm.com',
      phone: '+91 98200 44112',
      packageOrVesselTitle: 'Domestic Flight: IndiGo 6E-208 (BOM Terminal 2 ✈️ MAA Terminal 1)',
      departurePort: 'BOM - Chhatrapati Shivaji Int\'l, Mumbai (Gate 06)',
      destinationPort: 'MAA - Chennai Int\'l, Chennai',
      travelDate: '2026-08-18',
      passengerCount: 1,
      cabinClass: 'Economy Deck' as any,
      totalFareUSD: 110,
      paymentMethod: 'UPI / NetBanking',
      paymentStatus: 'COMPLETED',
      transactionRef: 'TXN-AIR-4412901',
      qrToken: 'AIR-QR-FL-6E-4412-2026-E-TICKET-VERIFIED',
      seatNumbers: ['08C'],
      insuranceAdded: false,
      bookingTimestamp: '2026-08-01 00:45 UTC',
      bookingType: 'passenger',
    }
  ]);

  const [activeConfirmedBooking, setActiveConfirmedBooking] = useState<TicketBooking | null>(confirmedBookings[0]);

  // Visual Booking Modal Flow States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Agent Tie-Up Inquiry Form States
  const [agencyName, setAgencyName] = useState('Eastman Travels & Maritime Voyages');
  const [agencyType, setAgencyType] = useState<'Tour Operator' | 'Travel Agency' | 'Cruise Aggregator' | 'Charter Fleet Operator' | 'Hotel & Resort Group'>('Tour Operator');
  const [contactPerson, setContactPerson] = useState('Eastman Creation Lead');
  const [agentEmail, setAgentEmail] = useState('partners@eastmancreation.com');
  const [agentPhone, setAgentPhone] = useState('+91 98765 11223');
  const [agentCountry, setAgentCountry] = useState('India');
  const [monthlyVolume, setMonthlyVolume] = useState('250 - 500 passengers');
  const [preferredTieUp, setPreferredTieUp] = useState<'B2B Commission Agent' | 'GDS API Integration' | 'Bulk Allotment Purchase' | 'White Label Booking Portal'>('B2B Commission Agent');
  const [agentNotes, setAgentNotes] = useState('Seeking preferred B2B ticketing tie-up for South Asian cruise & ferry routes.');

  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [submittedInquiryResult, setSubmittedInquiryResult] = useState<AgentInquiry | null>(null);
  const [agentPartnersList, setAgentPartnersList] = useState<AgentInquiry[]>([]);

  // Insurance Policy Generator Form States
  const [selectedInsurancePlan, setSelectedInsurancePlan] = useState<MaritimeInsurancePlan>(MARITIME_INSURANCE_PLANS[0]);
  const [insuredPersonName, setInsuredPersonName] = useState('Captain Alex Vance');
  const [insuredGovtId, setInsuredGovtId] = useState('A89420185');
  const [policyDays, setPolicyDays] = useState(14);
  const [issuedPolicies, setIssuedPolicies] = useState<IssuedInsurancePolicy[]>([
    {
      policyNumber: 'POL-MAR-90214',
      insuredPersonName: 'Sarah Jenkins',
      govtIdPassport: 'P9402183',
      planName: 'Ocean Tourist Transit & Cruise Shield',
      coverageLimitUSD: 100000,
      startDate: '2026-08-10',
      endDate: '2026-08-24',
      premiumPaidUSD: 168,
      status: 'ACTIVE',
      issuedTimestamp: '2026-07-30 14:23 UTC',
      issuingUnderwriter: 'Lloyds Marine Asia Underwriters',
    },
  ]);

  // BOOKING CALENDAR STATES
  const [calendarMonth, setCalendarMonth] = useState<'2026-08' | '2026-09' | '2026-10'>('2026-08');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('2026-08-15');

  // BOOKING STATUS TRACKING STATES
  const [pnrSearchInput, setPnrSearchInput] = useState('OB-77401-2026');
  const [trackedBooking, setTrackedBooking] = useState<TicketBooking | null>(confirmedBookings[1] || confirmedBookings[0]);

  // BOOKING HISTORY TABLE STATES
  const [historySearch, setHistorySearch] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState<'All' | 'COMPLETED' | 'PENDING' | 'PROCESSING'>('All');
  const [receiptModalBooking, setReceiptModalBooking] = useState<TicketBooking | null>(null);

  // CARGO BOOKING & FREIGHT ENGINE STATES
  const [bookingMode, setBookingMode] = useState<'passenger' | 'airways-passenger' | 'cargo' | 'airways-cargo'>('passenger');

  // AIRWAYS FLIGHT PASSENGER TICKET STATES
  const [flightScope, setFlightScope] = useState<'International' | 'Domestic'>('International');
  const [tripType, setTripType] = useState<'One-Way' | 'Round-Trip'>('One-Way');
  const [airwaysOriginAirport, setAirwaysOriginAirport] = useState('BOM - Chhatrapati Shivaji Int\'l, Mumbai (India)');
  const [airwaysDestAirport, setAirwaysDestAirport] = useState('SIN - Changi Int\'l, Singapore');
  const [airlineCarrier, setAirlineCarrier] = useState('Air India (AI)');
  const [flightDepartureDate, setFlightDepartureDate] = useState('2026-08-14');
  const [flightReturnDate, setFlightReturnDate] = useState('2026-08-21');
  const [flightClass, setFlightClass] = useState<'Economy Class' | 'Premium Economy Class' | 'Business Class' | 'First Class Suite'>('Business Class');
  const [flightPassengers, setFlightPassengers] = useState(1);
  const [addExtraBaggage, setAddExtraBaggage] = useState(true);
  const [addInflightGourmet, setAddInflightGourmet] = useState(false);
  const [addFastTrackSecurity, setAddFastTrackSecurity] = useState(true);
  const [addAirportLounge, setAddAirportLounge] = useState(true);

  // AIRWAYS AIR CARGO EXPRESS LOGISTICS STATES
  const [airCargoServiceLevel, setAirCargoServiceLevel] = useState<
    | 'Express Priority Air Freight (24-48 Hrs)'
    | 'Standard Commercial Air Freight (3-5 Days)'
    | 'Temperature-Controlled Pharma & Perishable Air Cargo'
    | 'Dangerous Goods (ICAO/IATA Hazmat Class)'
    | 'Valuables & High-Security Precious Freight'
  >('Express Priority Air Freight (24-48 Hrs)');
  const [airCargoConsignorName, setAirCargoConsignorName] = useState('E-Tech Global Logistics Ltd');
  const [airCargoConsignorCompany, setAirCargoConsignorCompany] = useState('New Delhi Freight Hub');
  const [airCargoConsigneeName, setAirCargoConsigneeName] = useState('Changi Cargo Express');
  const [airCargoConsigneeCompany, setAirCargoConsigneeCompany] = useState('Singapore Air Cargo Terminal');
  const [airCargoContactEmail, setAirCargoContactEmail] = useState('cargo@etechlogistics.in');
  const [airCargoContactPhone, setAirCargoContactPhone] = useState('+91 98112 33445');
  const [airCargoOriginHub, setAirCargoOriginHub] = useState('DEL Air Cargo Complex, New Delhi (India)');
  const [airCargoDestHub, setAirCargoDestHub] = useState('SIN Changi Cargo Terminal, Singapore');
  const [airCargoCarrier, setAirCargoCarrier] = useState('Singapore Airlines Cargo (SQ Cargo)');
  const [airCargoDepartureDate, setAirCargoDepartureDate] = useState('2026-08-16');
  const [airCargoWeightKg, setAirCargoWeightKg] = useState(320);
  const [airCargoLengthCm, setAirCargoLengthCm] = useState(120);
  const [airCargoWidthCm, setAirCargoWidthCm] = useState(80);
  const [airCargoHeightCm, setAirCargoHeightCm] = useState(100);
  const [airCargoIataCode, setAirCargoIataCode] = useState('IATA-DEL-9921');
  const [addRampEscort, setAddRampEscort] = useState(true);
  const [addIataHazmatSeal, setAddIataHazmatSeal] = useState(false);
  const [addDryIceTempControl, setAddDryIceTempControl] = useState(true);

  const [consignorName, setConsignorName] = useState('Capt. Jonathan Vance');
  const [consignorCompany, setConsignorCompany] = useState('Apex Oceanic Forwarders Ltd');
  const [consigneeName, setConsigneeName] = useState('Kochi Transshipment Terminal');
  const [consigneeCompany, setConsigneeCompany] = useState('Southern Sea Freight Logistics');
  const [cargoContactEmail, setCargoContactEmail] = useState('freight@apexoceanic.com');
  const [cargoContactPhone, setCargoContactPhone] = useState('+91 98765 22441');
  const [cargoCategory, setCargoCategory] = useState<
    | 'Dry Container (20ft/40ft TEU)'
    | 'Reefer Cold Chain Container'
    | 'Hazardous Chemicals (IMO Class)'
    | 'Heavy Machinery & Breakbulk'
    | 'Automobile RoRo'
    | 'Express Marine Freight Parcel'
  >('Dry Container (20ft/40ft TEU)');
  const [cargoWeightTons, setCargoWeightTons] = useState(18.5);
  const [cargoVolumeCbm, setCargoVolumeCbm] = useState(32);
  const [cargoOriginPort, setCargoOriginPort] = useState('JNPT Mumbai, India');
  const [cargoDestPort, setCargoDestPort] = useState('Colombo Harbour, Sri Lanka');
  const [cargoVesselName, setCargoVesselName] = useState('MV Indus Cargo Pioneer');
  const [cargoDepartureDate, setCargoDepartureDate] = useState('2026-08-18');
  const [customsCodeInput, setCustomsCodeInput] = useState('CUST-IN-889420');
  const [hazmatClassInput, setHazmatClassInput] = useState('IMO Class 3 (Flammable Liquid)');
  const [reeferTempSetting, setReeferTempSetting] = useState(-18);
  const [cargoPaymentMethod, setCargoPaymentMethod] = useState<'Credit / Debit Card' | 'Wire Transfer' | 'Marine Digital Wallet' | 'Letter of Credit (L/C)'>('Credit / Debit Card');

  const [confirmedCargoBookings, setConfirmedCargoBookings] = useState<CargoBooking[]>([
    {
      bookingId: 'CRG-881920',
      billOfLading: 'BL-IND-884910-2026',
      consignorName: 'Capt. Jonathan Vance',
      consignorCompany: 'Apex Oceanic Forwarders Ltd',
      consigneeName: 'Kochi Transshipment Terminal',
      consigneeCompany: 'Southern Sea Freight Logistics',
      contactEmail: 'freight@apexoceanic.com',
      contactPhone: '+91 98765 22441',
      cargoCategory: 'Dry Container (20ft/40ft TEU)',
      cargoWeightTons: 18.5,
      cargoVolumeCbm: 32,
      originPort: 'JNPT Mumbai, India',
      destinationPort: 'Colombo Harbour, Sri Lanka',
      vesselName: 'MV Indus Cargo Pioneer',
      departureDate: '2026-08-18',
      totalFreightFeeUSD: 2450,
      paymentMethod: 'Credit / Debit Card',
      paymentStatus: 'COMPLETED',
      customsDeclarationCode: 'CUST-IN-889420',
      hazmatClass: 'Non-Hazardous Commercial Freight',
      trackingStatus: 'ONBOARD_VESSEL',
      bookingTimestamp: '2026-07-30 08:15 UTC',
    },
    {
      bookingId: 'ACG-991204',
      billOfLading: 'AWB-098-8849102-2026',
      consignorName: 'E-Tech Global Logistics Ltd',
      consignorCompany: 'New Delhi Freight Hub',
      consigneeName: 'Changi Cargo Express',
      consigneeCompany: 'Singapore Air Cargo Terminal',
      contactEmail: 'cargo@etechlogistics.in',
      contactPhone: '+91 98112 33445',
      cargoCategory: 'Express Priority Air Freight (24-48 Hrs)' as any,
      cargoWeightTons: 0.32,
      cargoVolumeCbm: 0.96,
      originPort: 'DEL Air Cargo Complex, New Delhi',
      destinationPort: 'SIN Changi Cargo Terminal, Singapore',
      vesselName: 'Singapore Airlines Cargo (SQ Cargo)',
      departureDate: '2026-08-16',
      totalFreightFeeUSD: 1850,
      paymentMethod: 'Credit / Debit Card',
      paymentStatus: 'COMPLETED',
      customsDeclarationCode: 'IATA-DEL-9921',
      trackingStatus: 'ONBOARD_VESSEL' as any,
      bookingTimestamp: '2026-08-01 01:20 UTC',
    },
    {
      bookingId: 'CRG-771024',
      billOfLading: 'BL-SG-992102-2026',
      consignorName: 'Sarah Lim',
      consignorCompany: 'Singa ColdChain Marine Logistics',
      consigneeName: 'Malé Marine Fisheries Depot',
      consigneeCompany: 'Maldives Seafood Imports',
      contactEmail: 'slim@singacoldchain.sg',
      contactPhone: '+65 6789 1234',
      cargoCategory: 'Reefer Cold Chain Container',
      cargoWeightTons: 12.0,
      cargoVolumeCbm: 24,
      originPort: 'Marina Bay Terminal Singapore',
      destinationPort: 'Malé Commercial Harbour, Maldives',
      vesselName: 'MV Maldivian Express Reefer',
      departureDate: '2026-08-22',
      totalFreightFeeUSD: 3800,
      paymentMethod: 'Letter of Credit (L/C)',
      paymentStatus: 'COMPLETED',
      customsDeclarationCode: 'CUST-SG-441209',
      temperatureSettingC: -18,
      trackingStatus: 'PORT_GATE_IN',
      bookingTimestamp: '2026-07-31 11:20 UTC',
    },
  ]);

  const [activeCargoBooking, setActiveCargoBooking] = useState<CargoBooking | null>(confirmedCargoBookings[0]);
  const [billOfLadingModal, setBillOfLadingModal] = useState<CargoBooking | null>(null);
  const [historyCategoryTab, setHistoryCategoryTab] = useState<'passenger' | 'cargo'>('passenger');

  // Dedicated QR Boarding Pass Modal State
  const [qrBoardingPassModalBooking, setQrBoardingPassModalBooking] = useState<TicketBooking | null>(null);

  // Status Tracking Category & Cargo Tracking States
  const [trackingCategoryTab, setTrackingCategoryTab] = useState<'passenger' | 'cargo'>('passenger');
  const [cargoSearchInput, setCargoSearchInput] = useState('BL-IND-884910-2026');
  const [trackedCargoBooking, setTrackedCargoBooking] = useState<CargoBooking | null>(confirmedCargoBookings[0] || null);

  // Bulk Cargo Estimator Tool States
  const [isBulkEstimatorOpen, setIsBulkEstimatorOpen] = useState(false);
  const [estimatorCategory, setEstimatorCategory] = useState<
    | 'Dry Container (20ft/40ft TEU)'
    | 'Reefer Cold Chain Container'
    | 'Hazardous Chemicals (IMO Class)'
    | 'Heavy Machinery & Breakbulk'
    | 'Automobile RoRo'
  >('Dry Container (20ft/40ft TEU)');
  const [estimatorTeuCount, setEstimatorTeuCount] = useState(8);
  const [estimatorWeightTons, setEstimatorWeightTons] = useState(120);
  const [estimatorOriginPort, setEstimatorOriginPort] = useState('JNPT Mumbai, India');
  const [estimatorDestPort, setEstimatorDestPort] = useState('Colombo Harbour, Sri Lanka');
  const [addColdChain, setAddColdChain] = useState(true);
  const [addHazmatClearance, setAddHazmatClearance] = useState(false);
  const [addHeavyLiftCrane, setAddHeavyLiftCrane] = useState(false);
  const [addFastTrack, setAddFastTrack] = useState(true);

  // Bulk Freight Estimator Calculation Engine
  let estBaseTeuRate = 1200;
  if (estimatorCategory.includes('Reefer')) estBaseTeuRate = 1800;
  if (estimatorCategory.includes('Hazardous')) estBaseTeuRate = 2200;
  if (estimatorCategory.includes('Heavy Machinery')) estBaseTeuRate = 1600;
  if (estimatorCategory.includes('Automobile')) estBaseTeuRate = 1400;

  const estBaseOceanFreight = estBaseTeuRate * estimatorTeuCount;
  const estWeightCharge = Math.round(estimatorWeightTons * 18);
  const estColdChainFee = addColdChain ? estimatorTeuCount * 250 : 0;
  const estHazmatFee = addHazmatClearance ? estimatorTeuCount * 400 : 0;
  const estHeavyLiftFee = addHeavyLiftCrane ? estimatorTeuCount * 500 : 0;
  const estFastTrackFee = addFastTrack ? estimatorTeuCount * 350 : 0;

  const estGrossTotalUSD = estBaseOceanFreight + estWeightCharge + estColdChainFee + estHazmatFee + estHeavyLiftFee + estFastTrackFee;

  let estBulkDiscountPercent = 0;
  if (estimatorTeuCount >= 20) estBulkDiscountPercent = 25;
  else if (estimatorTeuCount >= 10) estBulkDiscountPercent = 18;
  else if (estimatorTeuCount >= 5) estBulkDiscountPercent = 10;

  const estDiscountAmountUSD = Math.round((estGrossTotalUSD * estBulkDiscountPercent) / 100);
  const estNetFreightTotalUSD = estGrossTotalUSD - estDiscountAmountUSD;

  const applyEstimatorToBooking = () => {
    setBookingMode('cargo');
    setCargoCategory(estimatorCategory as any);
    setCargoWeightTons(estimatorWeightTons);
    setCargoVolumeCbm(estimatorTeuCount * 33);
    setCargoOriginPort(estimatorOriginPort);
    setCargoDestPort(estimatorDestPort);
    setIsBulkEstimatorOpen(false);
    setActiveTab('booking');
  };

  // ==========================================
  // 1. MULTI-MODAL BOOKINGS STATES
  // ==========================================
  const [multiModalBookings, setMultiModalBookings] = useState<MultiModalBooking[]>([
    {
      id: 'MM-9901-2026',
      pnr: 'MM-SG-9901-2026',
      passengerName: 'Captain Alex Vance',
      passportId: 'IND-A89420185',
      email: 'alex.vance@maritime.org',
      phone: '+91 98765 43210',
      cruiseLeg: {
        vesselName: 'MV Royal Indus Empress (Mumbai Port 🚢 Kochi Port)',
        route: 'Mumbai Port 🚢 Kochi Transshipment Port',
        travelDate: '2026-08-10',
        cabinClass: 'Royal Suite Deck',
        fareUSD: 450,
      },
      flightLeg: {
        carrier: 'Air India (AI-342)',
        flightNo: 'AI-342',
        route: 'Cochin Int\'l COK ✈️ Singapore Changi SIN',
        flightDate: '2026-08-12',
        flightClass: 'Business Class Suite',
        fareUSD: 680,
      },
      shuttleLeg: {
        provider: 'Marina Bay Express Van Shuttle',
        transferRoute: 'Changi T2 Terminal ↔️ Marina Bay Cruise Center',
        transferTime: '2026-08-12 14:30 UTC',
        fareUSD: 40,
      },
      totalFareUSD: 1003, // $1170 - 15% ($167)
      discountUSD: 167,
      baggageCheckThrough: true,
      paymentMethod: 'Credit / Debit Card',
      paymentStatus: 'COMPLETED',
      qrToken: 'MM-QR-SG-9901-MASTER-PASS-2026',
      timestamp: '2026-07-30 09:10 UTC',
    },
    {
      id: 'MM-8820-2026',
      pnr: 'MM-MV-8820-2026',
      passengerName: 'Sarah Jenkins',
      passportId: 'UK-P9402183',
      email: 'sarah.jenkins@voyage.co.uk',
      phone: '+44 7911 123456',
      cruiseLeg: {
        vesselName: 'Maldives Inter-Island Coral Express Ferry',
        route: 'Malé Commercial Harbour ⛴️ Maafushi Island Lagoon',
        travelDate: '2026-08-20',
        cabinClass: 'Ocean View Upper Deck',
        fareUSD: 95,
      },
      flightLeg: {
        carrier: 'SriLankan Airlines (UL-102)',
        flightNo: 'UL-102',
        route: 'Colombo CMB ✈️ Velana Int\'l Malé MLE',
        flightDate: '2026-08-20',
        flightClass: 'Economy Class',
        fareUSD: 210,
      },
      shuttleLeg: {
        provider: 'Velana Airport Speedboat Shuttle Service',
        transferRoute: 'Airport Island Pier ↔️ Malé Jetty Terminal',
        transferTime: '2026-08-20 11:15 UTC',
        fareUSD: 25,
      },
      totalFareUSD: 280, // $330 - 15% ($50)
      discountUSD: 50,
      baggageCheckThrough: true,
      paymentMethod: 'UPI / NetBanking',
      paymentStatus: 'COMPLETED',
      qrToken: 'MM-QR-MV-8820-MASTER-PASS-2026',
      timestamp: '2026-08-01 02:00 UTC',
    },
  ]);

  const [mmPassengerName, setMmPassengerName] = useState('Captain Alex Vance');
  const [mmPassportId, setMmPassportId] = useState('IND-A89420185');
  const [mmEmail, setMmEmail] = useState('alex.vance@maritime.org');
  const [mmPhone, setMmPhone] = useState('+91 98765 43210');

  const [mmCruiseRoute, setMmCruiseRoute] = useState('MV Royal Indus Empress (Mumbai Port 🚢 Kochi Port)');
  const [mmCruiseClass, setMmCruiseClass] = useState('Royal Suite Deck');
  const [mmCruiseDate, setMmCruiseDate] = useState('2026-08-15');
  const [mmCruiseFare, setMmCruiseFare] = useState(450);

  const [mmFlightCarrier, setMmFlightCarrier] = useState('Air India (AI-342)');
  const [mmFlightRoute, setMmFlightRoute] = useState('Cochin Int\'l COK ✈️ Singapore Changi SIN');
  const [mmFlightClass, setMmFlightClass] = useState('Business Class Suite');
  const [mmFlightDate, setMmFlightDate] = useState('2026-08-17');
  const [mmFlightFare, setMmFlightFare] = useState(680);

  const [mmShuttleProvider, setMmShuttleProvider] = useState('Marina Bay Express Van Shuttle');
  const [mmShuttleRoute, setMmShuttleRoute] = useState('Changi T2 Terminal ↔️ Marina Bay Cruise Center');
  const [mmShuttleFare, setMmShuttleFare] = useState(40);

  const [mmBaggageCheckThrough, setMmBaggageCheckThrough] = useState(true);
  const [selectedMultiModalPass, setSelectedMultiModalPass] = useState<MultiModalBooking | null>(multiModalBookings[0]);

  // Multi-Modal Pricing Calculation
  const mmSubtotalFareUSD = mmCruiseFare + mmFlightFare + mmShuttleFare;
  const mmBundleDiscountUSD = Math.round(mmSubtotalFareUSD * 0.15); // 15% bundle discount
  const mmTotalPayableUSD = mmSubtotalFareUSD - mmBundleDiscountUSD;

  const handleCreateMultiModalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    setTimeout(() => {
      const newPass: MultiModalBooking = {
        id: `MM-${Math.floor(1000 + Math.random() * 9000)}-2026`,
        pnr: `MM-SG-${Math.floor(1000 + Math.random() * 9000)}-2026`,
        passengerName: mmPassengerName,
        passportId: mmPassportId,
        email: mmEmail,
        phone: mmPhone,
        cruiseLeg: {
          vesselName: mmCruiseRoute,
          route: mmCruiseRoute,
          travelDate: mmCruiseDate,
          cabinClass: mmCruiseClass,
          fareUSD: mmCruiseFare,
        },
        flightLeg: {
          carrier: mmFlightCarrier,
          flightNo: mmFlightCarrier.split(' ')[2] || 'FL-902',
          route: mmFlightRoute,
          flightDate: mmFlightDate,
          flightClass: mmFlightClass,
          fareUSD: mmFlightFare,
        },
        shuttleLeg: {
          provider: mmShuttleProvider,
          transferRoute: mmShuttleRoute,
          transferTime: `${mmFlightDate} 12:00 UTC`,
          fareUSD: mmShuttleFare,
        },
        totalFareUSD: mmTotalPayableUSD,
        discountUSD: mmBundleDiscountUSD,
        baggageCheckThrough: mmBaggageCheckThrough,
        paymentMethod: paymentMethod,
        paymentStatus: 'COMPLETED',
        qrToken: `MM-QR-PASS-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      };

      setMultiModalBookings([newPass, ...multiModalBookings]);
      setSelectedMultiModalPass(newPass);
      setIsSubmittingBooking(false);
      alert(`Multi-Modal Combined Ticket Issued Successfully! Unified PNR: ${newPass.pnr}`);
    }, 900);
  };

  // ==========================================
  // 2. CARGO MANIFEST STATES
  // ==========================================
  const [cargoManifests, setCargoManifests] = useState<CargoManifestRecord[]>([
    {
      manifestId: 'MANIFEST-OCN-8802',
      transportType: 'Ocean Vessel',
      carrierOrVessel: 'MV Indus Cargo Pioneer',
      voyageOrFlightNo: 'VOY-2026-IND-08',
      originHub: 'JNPT Port, Mumbai (India)',
      destinationHub: 'Colombo Port, Sri Lanka',
      departureDate: '2026-08-18',
      totalContainersOrParcels: 42,
      totalWeightKg: 840000,
      totalVolumeCbm: 1380,
      customsSealCode: 'SEAL-IMO-889420-CUSTOMS',
      hazmatComplianceCode: 'IMO-CLASS-3-CLEARED',
      captainPilotName: 'Capt. Jonathan Vance (Master of Vessel)',
      manifestStatus: 'VERIFIED_OFFICIAL',
      generatedTimestamp: '2026-07-30 08:30 UTC',
      items: [
        {
          itemId: 'ITEM-01',
          billOfLadingOrAwb: 'BL-IND-884910-2026',
          description: 'Industrial Textile & Cotton Yarn Bales (40ft High Cube)',
          consignor: 'Apex Oceanic Forwarders Ltd',
          consignee: 'Southern Sea Freight Logistics',
          packageType: '40ft TEU Container',
          weightKg: 18500,
          volumeCbm: 32,
          customsStatus: 'CLEARED',
        },
        {
          itemId: 'ITEM-02',
          billOfLadingOrAwb: 'BL-SG-992102-2026',
          description: 'Reefer Frozen Seafood & Tuna Loins (-18°C Cold Chain)',
          consignor: 'Singa ColdChain Marine Logistics',
          consignee: 'Maldives Seafood Imports',
          packageType: '20ft Reefer TEU',
          weightKg: 12000,
          volumeCbm: 24,
          customsStatus: 'CLEARED',
        },
        {
          itemId: 'ITEM-03',
          billOfLadingOrAwb: 'BL-COK-441029-2026',
          description: 'Organic Kerala Spices & Black Pepper Drums',
          consignor: 'Malabar Agro Exports Ltd',
          consignee: 'Colombo Wholesale Spice Traders',
          packageType: '20ft Dry TEU',
          weightKg: 14200,
          volumeCbm: 28,
          customsStatus: 'CLEARED',
        },
      ],
    },
    {
      manifestId: 'MANIFEST-AIR-9901',
      transportType: 'Air Cargo Flight',
      carrierOrVessel: 'Singapore Airlines Cargo (SQ Cargo)',
      voyageOrFlightNo: 'SQ-732-CARGO',
      originHub: 'DEL Air Cargo Complex, New Delhi',
      destinationHub: 'SIN Changi Cargo Terminal, Singapore',
      departureDate: '2026-08-16',
      totalContainersOrParcels: 18,
      totalWeightKg: 14500,
      totalVolumeCbm: 42,
      customsSealCode: 'IATA-SEAL-SQ732-DEL',
      hazmatComplianceCode: 'ICAO-PHARMA-TEMP-CONTROL',
      captainPilotName: 'Capt. Marcus Sterling (Chief Flight Officer)',
      manifestStatus: 'VERIFIED_OFFICIAL',
      generatedTimestamp: '2026-08-01 01:25 UTC',
      items: [
        {
          itemId: 'AIR-ITEM-01',
          billOfLadingOrAwb: 'AWB-098-8849102-2026',
          description: 'Critical Life-Saving Vaccines & Biotech Vials (+2°C to +8°C)',
          consignor: 'E-Tech Global Logistics Ltd',
          consignee: 'Singapore Air Cargo Terminal',
          packageType: 'IATA Cold-Chain Pallet ULD',
          weightKg: 320,
          volumeCbm: 0.96,
          customsStatus: 'CLEARED',
        },
        {
          itemId: 'AIR-ITEM-02',
          billOfLadingOrAwb: 'AWB-098-9941028-2026',
          description: 'Precision Microchip Semiconductors & Optoelectronic Modules',
          consignor: 'Delhi Micro-Systems Pvt Ltd',
          consignee: 'Changi High-Tech Distributors',
          packageType: 'Anti-Static Security Cargo Crate',
          weightKg: 680,
          volumeCbm: 1.8,
          customsStatus: 'CLEARED',
        },
      ],
    },
  ]);

  const [manifestSearch, setManifestSearch] = useState('');
  const [manifestTypeFilter, setManifestTypeFilter] = useState<'All' | 'Ocean Vessel' | 'Air Cargo Flight'>('All');
  const [activeManifestModal, setActiveManifestModal] = useState<CargoManifestRecord | null>(cargoManifests[0]);

  // Manifest Generator Form States
  const [isGenerateManifestModalOpen, setIsGenerateManifestModalOpen] = useState(false);
  const [genTransportType, setGenTransportType] = useState<'Ocean Vessel' | 'Air Cargo Flight'>('Ocean Vessel');
  const [genCarrierOrVessel, setGenCarrierOrVessel] = useState('MV Indus Cargo Pioneer');
  const [genVoyageOrFlightNo, setGenVoyageOrFlightNo] = useState('VOY-2026-SAARC-09');
  const [genOriginHub, setGenOriginHub] = useState('JNPT Port, Mumbai (India)');
  const [genDestHub, setGenDestHub] = useState('Colombo Port, Sri Lanka');
  const [genDepartureDate, setGenDepartureDate] = useState('2026-08-25');
  const [genCustomsSealCode, setGenCustomsSealCode] = useState('SEAL-IMO-CUSTOMS-2026');
  const [genCaptainPilotName, setGenCaptainPilotName] = useState('Capt. Jonathan Vance');

  const handleGenerateOfficialManifest = (e: React.FormEvent) => {
    e.preventDefault();
    const newManifest: CargoManifestRecord = {
      manifestId: `MANIFEST-${genTransportType === 'Ocean Vessel' ? 'OCN' : 'AIR'}-${Math.floor(1000 + Math.random() * 9000)}`,
      transportType: genTransportType,
      carrierOrVessel: genCarrierOrVessel,
      voyageOrFlightNo: genVoyageOrFlightNo,
      originHub: genOriginHub,
      destinationHub: genDestHub,
      departureDate: genDepartureDate,
      totalContainersOrParcels: 12,
      totalWeightKg: genTransportType === 'Ocean Vessel' ? 340000 : 8500,
      totalVolumeCbm: genTransportType === 'Ocean Vessel' ? 580 : 28,
      customsSealCode: genCustomsSealCode,
      hazmatComplianceCode: 'IMO/ICAO-CLEARED-CLASS-0',
      captainPilotName: genCaptainPilotName,
      manifestStatus: 'VERIFIED_OFFICIAL',
      generatedTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      items: [
        {
          itemId: 'ITEM-GEN-01',
          billOfLadingOrAwb: `${genTransportType === 'Ocean Vessel' ? 'BL' : 'AWB'}-${Math.floor(100000 + Math.random() * 900000)}`,
          description: 'Commercial Export Goods & Sealed Pallets',
          consignor: 'Apex Freight Forwarders',
          consignee: 'Global Transshipment Hub',
          packageType: genTransportType === 'Ocean Vessel' ? '40ft Dry TEU' : 'Air Cargo Container',
          weightKg: 12500,
          volumeCbm: 22,
          customsStatus: 'CLEARED',
        },
      ],
    };

    setCargoManifests([newManifest, ...cargoManifests]);
    setActiveManifestModal(newManifest);
    setIsGenerateManifestModalOpen(false);
    alert(`Official Cargo Manifest ${newManifest.manifestId} Generated and Verified!`);
  };

  // ==========================================
  // 3. LOYALTY TIERS STATES
  // ==========================================
  const [loyaltyMember, setLoyaltyMember] = useState<LoyaltyMember>({
    memberId: 'MARINER-ELITE-99201',
    name: 'Captain Alex Vance',
    email: 'alex.vance@maritime.org',
    tier: 'Platinum Voyager',
    pointsBalance: 18450,
    totalMilesSailedFlown: 42800,
    tripsCompleted: 28,
    freeLoungePasses: 4,
    upgradeVouchers: 2,
    nextTierProgressPct: 68, // 18450 / 35000 approx
    joinedDate: '2024-03-15',
  });

  const [loyaltyRedeemedPerks, setLoyaltyRedeemedPerks] = useState<{ id: string; perkName: string; pointsUsed: number; couponCode: string; date: string }[]>([
    {
      id: 'RED-991',
      perkName: '🥂 Executive Airport Lounge Pass',
      pointsUsed: 1200,
      couponCode: 'LOUNGE-PASS-VIP-991',
      date: '2026-07-28',
    },
  ]);

  const [redeemedCouponModal, setRedeemedCouponModal] = useState<{ perkName: string; code: string } | null>(null);

  // Loyalty Miles Earnings Calculator
  const [calcDistanceNM, setCalcDistanceNM] = useState(1250);
  const [calcClassMultiplier, setCalcClassMultiplier] = useState(1.5); // 1x, 1.5x, 2x, 3x

  const calculatedPointsEarned = Math.round(calcDistanceNM * calcClassMultiplier);

  const handleRedeemPerk = (perkName: string, requiredPoints: number) => {
    if (loyaltyMember.pointsBalance < requiredPoints) {
      alert(`Insufficient Mariner Miles balance! You need ${requiredPoints} pts but have ${loyaltyMember.pointsBalance} pts.`);
      return;
    }

    const code = `PERK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBalance = loyaltyMember.pointsBalance - requiredPoints;

    setLoyaltyMember({
      ...loyaltyMember,
      pointsBalance: newBalance,
      nextTierProgressPct: Math.min(100, Math.round((newBalance / 35000) * 100)),
    });

    const newRedemption = {
      id: `RED-${Math.floor(100 + Math.random() * 900)}`,
      perkName,
      pointsUsed: requiredPoints,
      couponCode: code,
      date: new Date().toISOString().substring(0, 10),
    };

    setLoyaltyRedeemedPerks([newRedemption, ...loyaltyRedeemedPerks]);
    setRedeemedCouponModal({ perkName, code });
  };

  // ==========================================
  // 4. VISUAL BOOKING TIMELINE STATES
  // ==========================================
  const [timelineSelectedPnr, setTimelineSelectedPnr] = useState('MM-SG-9901-2026');
  const [timelineCategoryTab, setTimelineCategoryTab] = useState<'passenger' | 'airways' | 'multimodal' | 'cargo'>('multimodal');

  // Load Agent Partners from API on mount
  useEffect(() => {
    fetchAgentPartners();
  }, []);

  const fetchAgentPartners = async () => {
    try {
      const res = await fetch('/api/agent/partners');
      if (res.ok) {
        const data = await res.json();
        if (data.partners) setAgentPartnersList(data.partners);
      }
    } catch (err) {
      console.warn('Unable to fetch agent partners from backend:', err);
    }
  };

  // Agent Code Validation API Call
  const handleValidateAgentCode = async () => {
    if (!agentCodeInput.trim()) return;
    setIsValidatingAgentCode(true);
    setAgentValidationResult(null);
    try {
      const res = await fetch('/api/agent/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentCode: agentCodeInput.trim() }),
      });
      const data = await res.json();
      setAgentValidationResult(data);
    } catch (err) {
      setAgentValidationResult({ valid: false, message: 'Server error checking agent code.' });
    } finally {
      setIsValidatingAgentCode(false);
    }
  };

  // Agent Inquiry Tie-Up Application API Call
  const handleAgentInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingInquiry(true);
    try {
      const res = await fetch('/api/agent/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agencyName,
          agencyType,
          contactPerson,
          email: agentEmail,
          phone: agentPhone,
          country: agentCountry,
          monthlyPassengerVolume: monthlyVolume,
          preferredTieUpType: preferredTieUp,
          notes: agentNotes,
        }),
      });
      const data = await res.json();
      if (data.success && data.partner) {
        setSubmittedInquiryResult(data.partner);
        setAgentPartnersList([data.partner, ...agentPartnersList]);
        setAgentCodeInput(data.partner.agentCode); // Auto-fill code into booking engine
      }
    } catch (err) {
      console.error('Agent tie-up inquiry error:', err);
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // Issue Insurance Policy Handler
  const handleIssuePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    const newPolNum = `POL-MAR-${Math.floor(10000 + Math.random() * 90000)}`;
    const totalPremiumUSD = selectedInsurancePlan.dailyPremiumUSD * policyDays;

    const newPolicy: IssuedInsurancePolicy = {
      policyNumber: newPolNum,
      insuredPersonName,
      govtIdPassport: insuredGovtId,
      planName: selectedInsurancePlan.planName,
      coverageLimitUSD: selectedInsurancePlan.coverageLimitUSD,
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date(Date.now() + policyDays * 86400000).toISOString().substring(0, 10),
      premiumPaidUSD: totalPremiumUSD,
      status: 'ACTIVE',
      issuedTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      issuingUnderwriter: 'Global Marine & Seafarer Lloyds Mutual',
    };

    setIssuedPolicies([newPolicy, ...issuedPolicies]);
  };

  // Cargo Freight Rate calculation
  let baseRatePerTon = 120;
  if (cargoCategory.includes('Reefer')) baseRatePerTon = 220;
  if (cargoCategory.includes('Hazardous')) baseRatePerTon = 280;
  if (cargoCategory.includes('Heavy Machinery')) baseRatePerTon = 180;
  if (cargoCategory.includes('Express')) baseRatePerTon = 310;

  const grossCargoFreightUSD = Math.round(cargoWeightTons * baseRatePerTon + cargoVolumeCbm * 15);
  const cargoAgentDiscountUSD = agentValidationResult?.valid ? Math.round(grossCargoFreightUSD * 0.10) : 0;
  const totalCalculatedCargoFeeUSD = Math.max(0, grossCargoFreightUSD - cargoAgentDiscountUSD);

  // Cargo Freight Booking API Handler
  const handleCompleteCargoBookingApi = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);

    try {
      const payload = {
        consignorName,
        consignorCompany,
        consigneeName,
        consigneeCompany,
        contactEmail: cargoContactEmail,
        contactPhone: cargoContactPhone,
        cargoCategory,
        cargoWeightTons,
        cargoVolumeCbm,
        originPort: cargoOriginPort,
        destinationPort: cargoDestPort,
        vesselName: cargoVesselName,
        departureDate: cargoDepartureDate,
        paymentMethod: cargoPaymentMethod,
        customsDeclarationCode: customsCodeInput,
        hazmatClass: hazmatClassInput,
        temperatureSettingC: cargoCategory.includes('Reefer') ? reeferTempSetting : undefined,
      };

      const res = await fetch('/api/cargo-bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.cargoBooking) {
        setConfirmedCargoBookings([data.cargoBooking, ...confirmedCargoBookings]);
        setActiveCargoBooking(data.cargoBooking);
        setBillOfLadingModal(data.cargoBooking);
        setHistoryCategoryTab('cargo');
        setActiveTab('history');
      } else {
        const fallbackId = `CRG-${Math.floor(100000 + Math.random() * 900000)}`;
        const fallbackBL = `BL-OB-${Math.floor(100000 + Math.random() * 900000)}-2026`;
        const localCargo: CargoBooking = {
          bookingId: fallbackId,
          billOfLading: fallbackBL,
          consignorName,
          consignorCompany,
          consigneeName,
          consigneeCompany,
          contactEmail: cargoContactEmail,
          contactPhone: cargoContactPhone,
          cargoCategory,
          cargoWeightTons,
          cargoVolumeCbm,
          originPort: cargoOriginPort,
          destinationPort: cargoDestPort,
          vesselName: cargoVesselName,
          departureDate: cargoDepartureDate,
          totalFreightFeeUSD: totalCalculatedCargoFeeUSD,
          paymentMethod: cargoPaymentMethod,
          paymentStatus: 'COMPLETED',
          customsDeclarationCode: customsCodeInput,
          hazmatClass: hazmatClassInput,
          temperatureSettingC: cargoCategory.includes('Reefer') ? reeferTempSetting : undefined,
          trackingStatus: 'MANIFESTED',
          bookingTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        };
        setConfirmedCargoBookings([localCargo, ...confirmedCargoBookings]);
        setActiveCargoBooking(localCargo);
        setBillOfLadingModal(localCargo);
        setHistoryCategoryTab('cargo');
        setActiveTab('history');
      }
    } catch (err) {
      console.error('Cargo booking submission error:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Create Booking API Handler
  const handleCompleteBookingApi = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmittingBooking(true);

    try {
      const payload = {
        packageTitle: selectedPackage ? selectedPackage.title : 'Ocean Cruise Voyage',
        packageId: selectedPackage ? selectedPackage.id : undefined,
        departurePort: selectedPackage ? selectedPackage.departurePort : 'Central Terminal',
        destinationPort: selectedPackage && selectedPackage.stops[0] ? selectedPackage.stops[selectedPackage.stops.length - 1] : 'Island Gateway',
        travelDate,
        passengerCount,
        cabinClass,
        passengerName,
        passportOrGovtId: passportId,
        nationality,
        email,
        phone,
        paymentMethod,
        insuranceAdded: addInsurance,
        agentCode: agentCodeInput.trim() || undefined,
      };

      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setConfirmedBookings([data.booking, ...confirmedBookings]);
        setActiveConfirmedBooking(data.booking);
        setTrackedBooking(data.booking);

        if (isBookingModalOpen) {
          setBookingStep(4);
        } else {
          setActiveTab('history');
        }
      }
    } catch (err) {
      console.error('Booking submission API error:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Track PNR Search Handler
  const handleTrackPnrSearch = async () => {
    if (!pnrSearchInput.trim()) return;
    const match = confirmedBookings.find(
      (b) => b.pnr.toLowerCase() === pnrSearchInput.trim().toLowerCase() || b.bookingId.toLowerCase() === pnrSearchInput.trim().toLowerCase()
    );
    if (match) {
      setTrackedBooking(match);
    } else {
      try {
        const res = await fetch(`/api/bookings?pnr=${encodeURIComponent(pnrSearchInput.trim())}`);
        if (res.ok) {
          const data = await res.json();
          if (data.found && data.booking) {
            setTrackedBooking(data.booking);
          }
        }
      } catch (e) {
        console.warn('Backend search error', e);
      }
    }
  };

  // Track Cargo B/L Search Handler
  const handleTrackCargoSearch = () => {
    if (!cargoSearchInput.trim()) return;
    const match = confirmedCargoBookings.find(
      (c: any) =>
        (c.billOfLading && c.billOfLading.toLowerCase() === cargoSearchInput.trim().toLowerCase()) ||
        (c.billOfLadingNo && c.billOfLadingNo.toLowerCase() === cargoSearchInput.trim().toLowerCase()) ||
        (c.cargoBookingId && c.cargoBookingId.toLowerCase() === cargoSearchInput.trim().toLowerCase()) ||
        (c.customsCode && c.customsCode.toLowerCase() === cargoSearchInput.trim().toLowerCase())
    );
    if (match) {
      setTrackedCargoBooking(match);
    } else {
      setTrackedCargoBooking(null);
    }
  };

  // CSV Export for Booking History
  const exportBookingsToCSV = () => {
    const headers = ['PNR', 'Booking ID', 'Passenger Name', 'Passport/ID', 'Email', 'Package', 'Travel Date', 'Cabin', 'Passengers', 'Total Fare ($)', 'Payment Status', 'Timestamp'];
    const rows = confirmedBookings.map(b => [
      b.pnr,
      b.bookingId,
      `"${b.passengerName}"`,
      b.passportOrGovtId,
      b.email,
      `"${b.packageOrVesselTitle}"`,
      b.travelDate,
      b.cabinClass,
      b.passengerCount,
      b.totalFareUSD,
      b.paymentStatus,
      `"${b.bookingTimestamp}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ocean_bird_bookings_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Tourism Packages
  const filteredPackages = MARINE_TOURISM_PACKAGES.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(tourismSearch.toLowerCase()) ||
      pkg.regionLocation.toLowerCase().includes(tourismSearch.toLowerCase()) ||
      pkg.departurePort.toLowerCase().includes(tourismSearch.toLowerCase()) ||
      pkg.vesselName.toLowerCase().includes(tourismSearch.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    const matchesCountry = selectedCountry === 'All' || pkg.country.includes(selectedCountry);

    return matchesSearch && matchesCategory && matchesCountry;
  });

  // Price calculations
  const basePricePerPerson = selectedPackage ? selectedPackage.priceUSD : 500;
  const classMultiplier = cabinClass === 'Royal Deluxe Suite' ? 1.8 : cabinClass === 'Business Ocean View' ? 1.3 : 1.0;
  const insuranceFeePerPerson = addInsurance ? 24 : 0;
  const grossTotalUSD = Math.round((basePricePerPerson * classMultiplier + insuranceFeePerPerson) * passengerCount);
  const discountUSD = agentValidationResult?.valid ? Math.round(grossTotalUSD * 0.10) : 0;
  const totalCalculatedFareUSD = Math.max(0, grossTotalUSD - discountUSD);

  // Airways Flight Ticket Price Calculations
  let baseFlightFarePerPerson = flightScope === 'Domestic' ? 95 : 320;
  if (airwaysDestAirport.includes('Singapore') || airwaysOriginAirport.includes('Singapore')) baseFlightFarePerPerson = 380;
  if (airwaysDestAirport.includes('Dubai') || airwaysOriginAirport.includes('Dubai')) baseFlightFarePerPerson = 410;
  if (airwaysDestAirport.includes('Maldives') || airwaysOriginAirport.includes('Maldives')) baseFlightFarePerPerson = 310;
  if (airwaysDestAirport.includes('Bangkok') || airwaysOriginAirport.includes('Bangkok')) baseFlightFarePerPerson = 280;

  const flightClassMultiplier =
    flightClass === 'First Class Suite' ? 3.5 : flightClass === 'Business Class' ? 2.2 : flightClass === 'Premium Economy Class' ? 1.4 : 1.0;

  const extraBaggageFee = addExtraBaggage ? 45 : 0;
  const inflightGourmetFee = addInflightGourmet ? 25 : 0;
  const fastTrackFee = addFastTrackSecurity ? 35 : 0;
  const loungeFee = addAirportLounge ? 50 : 0;

  const grossFlightFarePerPerson = Math.round(baseFlightFarePerPerson * flightClassMultiplier + extraBaggageFee + inflightGourmetFee + fastTrackFee + loungeFee);
  const totalGrossFlightFareUSD = grossFlightFarePerPerson * flightPassengers * (tripType === 'Round-Trip' ? 1.85 : 1.0);
  const flightDiscountUSD = agentValidationResult?.valid ? Math.round(totalGrossFlightFareUSD * 0.10) : 0;
  const totalCalculatedFlightFareUSD = Math.max(0, Math.round(totalGrossFlightFareUSD - flightDiscountUSD));

  // Airways Express Air Cargo Logistics Price Calculations
  const volumetricWeightKg = Math.round((airCargoLengthCm * airCargoWidthCm * airCargoHeightCm) / 6000);
  const chargeableAirCargoWeightKg = Math.max(airCargoWeightKg, volumetricWeightKg);

  let airCargoRatePerKg = 4.50;
  if (airCargoServiceLevel.includes('Standard Commercial')) airCargoRatePerKg = 2.80;
  if (airCargoServiceLevel.includes('Temperature-Controlled')) airCargoRatePerKg = 6.20;
  if (airCargoServiceLevel.includes('Dangerous Goods')) airCargoRatePerKg = 7.80;
  if (airCargoServiceLevel.includes('Valuables')) airCargoRatePerKg = 8.50;

  const baseAirFreightFee = Math.round(chargeableAirCargoWeightKg * airCargoRatePerKg);
  const rampEscortFee = addRampEscort ? 150 : 0;
  const iataHazmatSealFee = addIataHazmatSeal ? 250 : 0;
  const dryIceFee = addDryIceTempControl ? 200 : 0;

  const grossAirCargoFeeUSD = baseAirFreightFee + rampEscortFee + iataHazmatSealFee + dryIceFee;
  const airCargoAgentDiscountUSD = agentValidationResult?.valid ? Math.round(grossAirCargoFeeUSD * 0.10) : 0;
  const totalCalculatedAirCargoFeeUSD = Math.max(0, grossAirCargoFeeUSD - airCargoAgentDiscountUSD);

  // AIRWAYS FLIGHT BOOKING SUBMISSION API
  const handleCompleteAirwaysFlightBookingApi = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    try {
      const carrierPrefix = airlineCarrier.includes('Air India') ? 'AI' : airlineCarrier.includes('Singapore') ? 'SQ' : airlineCarrier.includes('IndiGo') ? '6E' : airlineCarrier.includes('Emirates') ? 'EK' : 'FL';
      const pnrNum = `FL-${carrierPrefix}-${Math.floor(1000 + Math.random() * 9000)}-2026`;
      const seatNums = Array.from({ length: flightPassengers }, (_, i) => `${Math.floor(10 + i * 2)}${['A', 'B', 'C', 'D', 'E', 'F'][i % 6]}`);

      const newBooking: TicketBooking = {
        bookingId: `AIR-${Math.floor(100000 + Math.random() * 900000)}`,
        pnr: pnrNum,
        passengerName,
        passportOrGovtId: passportId,
        nationality,
        email,
        phone,
        packageOrVesselTitle: `${flightScope} Flight: ${airlineCarrier} (${airwaysOriginAirport.split(' - ')[0]} ✈️ ${airwaysDestAirport.split(' - ')[0]})`,
        departurePort: `${airwaysOriginAirport} (Gate ${Math.floor(1 + Math.random() * 20)})`,
        destinationPort: airwaysDestAirport,
        travelDate: flightDepartureDate,
        passengerCount: flightPassengers,
        cabinClass: flightClass as any,
        totalFareUSD: totalCalculatedFlightFareUSD,
        paymentMethod,
        paymentStatus: 'COMPLETED',
        transactionRef: `TXN-AIR-${Math.floor(1000000 + Math.random() * 9000000)}`,
        qrToken: `AIR-QR-${pnrNum}-E-TICKET-VERIFIED`,
        seatNumbers: seatNums,
        insuranceAdded: addInsurance,
        insurancePolicyId: addInsurance ? `POL-AIR-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
        bookingTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        bookingType: 'passenger',
      };

      setConfirmedBookings([newBooking, ...confirmedBookings]);
      setActiveConfirmedBooking(newBooking);
      setTrackedBooking(newBooking);
      setReceiptModalBooking(newBooking);
    } catch (err) {
      console.error('Airways flight booking submission error:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // AIRWAYS EXPRESS AIR CARGO SUBMISSION API
  const handleCompleteAirCargoBookingApi = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    try {
      const awbNum = `AWB-098-${Math.floor(1000000 + Math.random() * 9000000)}-2026`;
      const newCargo: CargoBooking = {
        bookingId: `ACG-${Math.floor(100000 + Math.random() * 900000)}`,
        billOfLading: awbNum,
        consignorName: airCargoConsignorName,
        consignorCompany: airCargoConsignorCompany,
        consigneeName: airCargoConsigneeName,
        consigneeCompany: airCargoConsigneeCompany,
        contactEmail: airCargoContactEmail,
        contactPhone: airCargoContactPhone,
        cargoCategory: airCargoServiceLevel as any,
        cargoWeightTons: Number((chargeableAirCargoWeightKg / 1000).toFixed(2)),
        cargoVolumeCbm: Number(((airCargoLengthCm * airCargoWidthCm * airCargoHeightCm) / 1000000).toFixed(2)),
        originPort: airCargoOriginHub,
        destinationPort: airCargoDestHub,
        vesselName: airCargoCarrier,
        departureDate: airCargoDepartureDate,
        totalFreightFeeUSD: totalCalculatedAirCargoFeeUSD,
        paymentMethod: cargoPaymentMethod,
        paymentStatus: 'COMPLETED',
        customsDeclarationCode: airCargoIataCode,
        trackingStatus: 'MANIFESTED' as any,
        bookingTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      };

      setConfirmedCargoBookings([newCargo, ...confirmedCargoBookings]);
      setActiveCargoBooking(newCargo);
      setTrackedCargoBooking(newCargo);
      setBillOfLadingModal(newCargo);
    } catch (err) {
      console.error('Air cargo booking submission error:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Calendar Scheduled Voyages Mapping
  const scheduledVoyagesMap: Record<string, { title: string; port: string; seatsLeft: number; packageId: string; flag: string }[]> = {
    '2026-08-05': [{ title: 'Singapore Marina Bay Excursion', port: 'Singapore', seatsLeft: 12, packageId: 'pkg-sg-01', flag: '🇸🇬' }],
    '2026-08-10': [{ title: 'Singapore Marina & Southern Islands', port: 'Singapore', seatsLeft: 8, packageId: 'pkg-sg-01', flag: '🇸🇬' }],
    '2026-08-15': [{ title: 'Lakshadweep Coral Atolls Expedition', port: 'Kochi Port', seatsLeft: 18, packageId: 'pkg-in-01', flag: '🇮🇳' }],
    '2026-08-20': [{ title: 'Andaman Deep Sea Reef Diver Voyage', port: 'Port Blair', seatsLeft: 14, packageId: 'pkg-in-02', flag: '🇮🇳' }],
    '2026-08-25': [{ title: 'Maldives Atoll Hopper Safari', port: 'Male Harbour', seatsLeft: 6, packageId: 'pkg-mv-01', flag: '🇲🇻' }],
    '2026-09-02': [{ title: 'Sri Lanka Galle Coastal Odyssey', port: 'Galle Harbour', seatsLeft: 22, packageId: 'pkg-lk-01', flag: '🇱🇰' }],
    '2026-09-12': [{ title: 'Sundarbans Mangrove Eco Cruise', port: 'Mongla Port', seatsLeft: 15, packageId: 'pkg-bd-01', flag: '🇧🇩' }],
    '2026-09-18': [{ title: 'Lakshadweep Coral Atolls Expedition', port: 'Kochi Port', seatsLeft: 25, packageId: 'pkg-in-01', flag: '🇮🇳' }],
    '2026-10-05': [{ title: 'Maldives Luxury Cruise Yacht', port: 'Male Harbour', seatsLeft: 10, packageId: 'pkg-mv-01', flag: '🇲🇻' }],
    '2026-10-15': [{ title: 'Andaman Deep Sea Reef Diver Voyage', port: 'Port Blair', seatsLeft: 20, packageId: 'pkg-in-02', flag: '🇮🇳' }],
  };

  // Filtered History Table list
  const filteredHistory = confirmedBookings.filter((b) => {
    const matchesSearch =
      b.pnr.toLowerCase().includes(historySearch.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(historySearch.toLowerCase()) ||
      b.passengerName.toLowerCase().includes(historySearch.toLowerCase()) ||
      b.email.toLowerCase().includes(historySearch.toLowerCase()) ||
      b.packageOrVesselTitle.toLowerCase().includes(historySearch.toLowerCase());

    const matchesStatus = historyStatusFilter === 'All' || b.paymentStatus === historyStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const openVisualBookingModal = (pkg: MarineTourismPackage) => {
    setSelectedPackage(pkg);
    setBookingStep(1);
    setIsBookingModalOpen(true);
  };

  return (
    <div id="marine-tourism-booking-insurance-view" className="space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-sky-950 rounded-2xl p-6 border border-teal-800/40 shadow-2xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 font-semibold text-xs mb-1">
              <Palmtree className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>SOUTH ASIA & INDO-PACIFIC OCEAN TOURISM, BOOKING API & B2B HUB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center space-x-3">
              <span>Marine Tourism, Ticket Booking & Agent Tie-Up Hub</span>
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Explore coastal expeditions, book passenger cruise tickets via live API, apply B2B agent tie-up codes, and issue high-sea travel insurance.
            </p>
          </div>

          {/* Navigation Tab Switcher */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('tourism')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'tourism'
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palmtree className="w-4 h-4" />
              <span>Tour Packages</span>
            </button>

            <button
              onClick={() => setActiveTab('booking')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'booking'
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Book Ticket & Gateway</span>
            </button>

            <button
              onClick={() => setActiveTab('multimodal')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'multimodal'
                  ? 'bg-indigo-400 text-slate-950 shadow-lg shadow-indigo-400/20'
                  : 'text-indigo-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Multi-Modal Bookings</span>
            </button>

            <button
              onClick={() => setActiveTab('manifest')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'manifest'
                  ? 'bg-purple-400 text-slate-950 shadow-lg shadow-purple-400/20'
                  : 'text-purple-400 hover:text-white'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Cargo Manifest</span>
            </button>

            <button
              onClick={() => setActiveTab('loyalty')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'loyalty'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                  : 'text-amber-400 hover:text-white'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Loyalty Tiers Badge</span>
            </button>

            <button
              onClick={() => setActiveTab('smart-rerouting')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'smart-rerouting'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Smart Cargo Rerouting</span>
            </button>

            <button
              onClick={() => setActiveTab('global-logistics')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'global-logistics'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Global Logistics Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('multimodal-api')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'multimodal-api'
                  ? 'bg-indigo-400 text-slate-950 shadow-lg shadow-indigo-400/20'
                  : 'text-indigo-300 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Multi-Mode Booking API</span>
            </button>

            <button
              onClick={() => setActiveTab('smart-manifest-ai')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'smart-manifest-ai'
                  ? 'bg-purple-400 text-slate-950 shadow-lg shadow-purple-400/20'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Smart Manifest AI</span>
            </button>

            <button
              onClick={() => setActiveTab('logistics-heatmap')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'logistics-heatmap'
                  ? 'bg-rose-400 text-slate-950 shadow-lg shadow-rose-400/20'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Global Logistics Heat Map</span>
            </button>

            <button
              onClick={() => setActiveTab('logistics-perks')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'logistics-perks'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Logistics Tier Perks</span>
            </button>

            <button
              onClick={() => setActiveTab('predictive-route-alert')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'predictive-route-alert'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'text-rose-400 hover:text-white'
              }`}
            >
              <Radar className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Predictive Route Alert</span>
            </button>

            <button
              onClick={() => setActiveTab('maritime-esg')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'maritime-esg'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'text-emerald-400 hover:text-white'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Maritime ESG Report</span>
            </button>

            <button
              onClick={() => setActiveTab('digital-signature')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'digital-signature'
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20'
                  : 'text-cyan-300 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Digital Cargo Signature</span>
            </button>

            <button
              onClick={() => setActiveTab('dynamic-slotting')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'dynamic-slotting'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Dynamic Port Slotting</span>
            </button>

            <button
              onClick={() => setActiveTab('predictive-supply-hub')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'predictive-supply-hub'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>Predictive Supply Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('airways-booking-tracker')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'airways-booking-tracker'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20 font-black'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              <PlaneTakeoff className="w-4 h-4 text-sky-400" />
              <span>Airways Radar & Booking</span>
            </button>

            <button
              onClick={() => setActiveTab('airways-passenger-portal')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'airways-passenger-portal'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20 font-black'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4 text-sky-400" />
              <span>Airways Passenger Ticket Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('airways-cargo-portal')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'airways-cargo-portal'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 font-black'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Box className="w-4 h-4 text-amber-400" />
              <span>Airways Cargo & Courier Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('cruise-passenger-portal')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'cruise-passenger-portal'
                  ? 'bg-teal-400 text-slate-950 shadow-lg shadow-teal-400/20 font-black'
                  : 'text-teal-300 hover:text-white'
              }`}
            >
              <Ship className="w-4 h-4 text-teal-400" />
              <span>Cruise Ship Ticket Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('marine-cargo-portal')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'marine-cargo-portal'
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20 font-black'
                  : 'text-cyan-300 hover:text-white'
              }`}
            >
              <Container className="w-4 h-4 text-cyan-400" />
              <span>Marine Cargo & Courier Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('offline-flight-cache')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'offline-flight-cache'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20 font-black'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4 text-sky-400" />
              <span>Offline Flight SW Cache</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'timeline'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'text-emerald-400 hover:text-white'
              }`}
            >
              <Milestone className="w-4 h-4" />
              <span>Visual Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab('predictive-delay')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'predictive-delay'
                  ? 'bg-orange-400 text-slate-950 shadow-lg shadow-orange-400/20'
                  : 'text-orange-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Predictive Delay</span>
            </button>

            <button
              onClick={() => setActiveTab('currency-calc')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'currency-calc'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Multi-Currency Calc</span>
            </button>

            <button
              onClick={() => setActiveTab('route-weather')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'route-weather'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              <CloudRain className="w-4 h-4" />
              <span>Route Weather</span>
            </button>

            <button
              onClick={() => setActiveTab('bulk-import')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'bulk-import'
                  ? 'bg-pink-400 text-slate-950 shadow-lg shadow-pink-400/20'
                  : 'text-pink-300 hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Bulk Import</span>
            </button>

            <button
              onClick={() => setActiveTab('smart-fleet')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'smart-fleet'
                  ? 'bg-indigo-400 text-slate-950 shadow-lg shadow-indigo-400/20'
                  : 'text-indigo-300 hover:text-white'
              }`}
            >
              <Ship className="w-4 h-4" />
              <span>Smart Fleet</span>
            </button>

            <button
              onClick={() => setActiveTab('incident-reporting')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'incident-reporting'
                  ? 'bg-rose-400 text-slate-950 shadow-lg shadow-rose-400/20'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Incident Reporting</span>
            </button>

            <button
              onClick={() => setActiveTab('port-density')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'port-density'
                  ? 'bg-violet-400 text-slate-950 shadow-lg shadow-violet-400/20'
                  : 'text-violet-300 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Port Density Charts</span>
            </button>

            <button
              onClick={() => setActiveTab('offline-alerts')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'offline-alerts'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <WifiOff className="w-4 h-4" />
              <span>Offline Alert Systems</span>
            </button>

            <button
              onClick={() => setActiveTab('export-manifest')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'export-manifest'
                  ? 'bg-teal-400 text-slate-950 shadow-lg shadow-teal-400/20'
                  : 'text-teal-300 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Manifest</span>
            </button>

            <button
              onClick={() => setActiveTab('cargo-notification')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'cargo-notification'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <BellRing className="w-4 h-4" />
              <span>Cargo Notification</span>
            </button>

            <button
              onClick={() => setActiveTab('visual-manifest')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'visual-manifest'
                  ? 'bg-fuchsia-400 text-slate-950 shadow-lg shadow-fuchsia-400/20'
                  : 'text-fuchsia-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Visual Manifest</span>
            </button>

            <button
              onClick={() => setActiveTab('multi-cargo-tracking')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'multi-cargo-tracking'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20'
                  : 'text-sky-300 hover:text-white'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>Multi Cargo Tracking</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'calendar'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'tracking'
                  ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Status Tracking</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'history'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Booking History ({confirmedBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('agent-tieup')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'agent-tieup'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-amber-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Agent Tie-Up & B2B</span>
            </button>

            <button
              onClick={() => setActiveTab('insurance')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'insurance'
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Insurance</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: MARINE TOURISM PACKAGES */}
      {activeTab === 'tourism' && (
        <div className="space-y-6">
          {/* Quick Dedicated Online Booking Portals Launcher */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 rounded-2xl border border-sky-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-sky-400 tracking-widest block">
                  ONLINE BOOKING PORTALS (SEPARATE SERVICES)
                </span>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-sky-400" />
                  <span>Choose Your Booking Service Portal</span>
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                4 Separate Portals Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              {/* Option 1: Airways Passenger Portal */}
              <div className="p-4 bg-slate-900 border border-sky-500/40 hover:border-sky-400 rounded-xl space-y-3 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-sky-400 font-extrabold text-xs mb-1">
                    <PlaneTakeoff className="w-4 h-4" />
                    <span>Airways Flight Passenger</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Domestic & International flight passenger ticket booking with seat selection & e-boarding pass.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('airways-passenger-portal')}
                  className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-lg text-xs transition-all flex items-center justify-center space-x-1"
                >
                  <span>LAUNCH PASSENGER PORTAL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Option 2: Airways Cargo & Courier */}
              <div className="p-4 bg-slate-900 border border-amber-500/40 hover:border-amber-400 rounded-xl space-y-3 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-xs mb-1">
                    <Box className="w-4 h-4" />
                    <span>Airways Cargo & Courier</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Air cargo freight & express courier parcel booking with IATA volumetric weight & Air Waybill (AWB).
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('airways-cargo-portal')}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-xs transition-all flex items-center justify-center space-x-1"
                >
                  <span>LAUNCH AIR CARGO PORTAL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Option 3: Cruise Passenger Portal */}
              <div className="p-4 bg-slate-900 border border-teal-500/40 hover:border-teal-400 rounded-xl space-y-3 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-teal-400 font-extrabold text-xs mb-1">
                    <Ship className="w-4 h-4" />
                    <span>Cruise Ship Passenger</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Domestic coastal & international cruise passenger ticket booking with stateroom cabin choices.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('cruise-passenger-portal')}
                  className="w-full py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-lg text-xs transition-all flex items-center justify-center space-x-1"
                >
                  <span>LAUNCH CRUISE PORTAL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Option 4: Marine Cargo & Courier */}
              <div className="p-4 bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 rounded-xl space-y-3 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-cyan-400 font-extrabold text-xs mb-1">
                    <Container className="w-4 h-4" />
                    <span>Marine Cargo & Courier</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Sea container shipping & courier freight booking with port-to-port routes & Bill of Lading (B/L).
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('marine-cargo-portal')}
                  className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-lg text-xs transition-all flex items-center justify-center space-x-1"
                >
                  <span>LAUNCH MARINE CARGO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search package title, island destination, vessel name, or departure port..."
                  value={tourismSearch}
                  onChange={(e) => setTourismSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-teal-300 px-3 py-2.5 rounded-xl font-bold focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Luxury Cruise">Luxury Cruise</option>
                  <option value="Island Hopping">Island Hopping</option>
                  <option value="Eco Mangrove Safari">Eco Mangrove Safari</option>
                  <option value="Reef & Diving Expedition">Reef & Diving Expedition</option>
                  <option value="Coastal Heritage Voyage">Coastal Heritage Voyage</option>
                </select>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-teal-300 px-3 py-2.5 rounded-xl font-bold focus:outline-none"
                >
                  <option value="All">All Countries</option>
                  <option value="India">India</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Bangladesh">Bangladesh</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid of Tourism Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const cardImg =
                pkg.category === 'Island Hopping'
                  ? coralAtollImg
                  : pkg.category === 'Luxury Cruise'
                  ? luxuryCruiseImg
                  : pkg.category === 'Reef & Diving Expedition'
                  ? deepSeaDiverImg
                  : fishermenTrawlerImg;

              return (
                <div
                  key={pkg.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-white shadow-xl hover:border-teal-500/50 transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={cardImg}
                      alt={pkg.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800 flex items-center space-x-1.5">
                      <span className="text-base">{pkg.countryFlag}</span>
                      <span className="text-[10px] text-teal-300 font-bold uppercase">{pkg.country}</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-500/30 text-[10px] font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{pkg.rating}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="font-extrabold text-base text-white leading-snug">{pkg.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{pkg.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div>
                          <span className="text-slate-500 text-[10px]">Vessel & Type</span>
                          <div className="font-bold text-white truncate">{pkg.vesselName}</div>
                          <div className="text-[10px] text-teal-400">{pkg.vesselType}</div>
                        </div>

                        <div>
                          <span className="text-slate-500 text-[10px]">Duration & Port</span>
                          <div className="font-bold text-amber-300">{pkg.durationDays} Days Tour</div>
                          <div className="text-[10px] text-slate-400 truncate">{pkg.departurePort}</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Package Highlights</div>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {pkg.highlights.map((h, idx) => (
                            <li key={idx} className="flex items-center space-x-1.5 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-400">Price per Guest</div>
                          <div className="text-xl font-black text-emerald-400 font-mono">
                            ${pkg.priceUSD} <span className="text-xs text-slate-400 font-normal">({pkg.priceLocal})</span>
                          </div>
                        </div>

                        <span className="text-[10px] text-slate-400 font-mono">Seats: {pkg.availableSeats} Left</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openVisualBookingModal(pkg)}
                          className="py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                        >
                          <Zap className="w-3.5 h-3.5 fill-slate-950" />
                          <span>VISUAL WIZARD</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedPackage(pkg);
                            setActiveTab('booking');
                          }}
                          className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 border border-slate-700"
                        >
                          <Ticket className="w-3.5 h-3.5 text-teal-400" />
                          <span>BOOK NOW</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TICKET BOOKING & PAYMENT GATEWAY UI */}
      {activeTab === 'booking' && (
        <div className="space-y-6">
          {/* Mode Switcher: 4-Way Portal Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 bg-slate-900 p-2.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setBookingMode('passenger')}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                bookingMode === 'passenger'
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Ship className="w-4 h-4 shrink-0" />
              <span>🚢 CRUISE & FERRY TICKET</span>
            </button>

            <button
              type="button"
              onClick={() => setBookingMode('airways-passenger')}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                bookingMode === 'airways-passenger'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Plane className="w-4 h-4 shrink-0" />
              <span>✈️ AIRWAYS FLIGHT TICKET</span>
            </button>

            <button
              type="button"
              onClick={() => setBookingMode('cargo')}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                bookingMode === 'cargo'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Box className="w-4 h-4 shrink-0" />
              <span>📦 OCEAN FREIGHT CARGO</span>
            </button>

            <button
              type="button"
              onClick={() => setBookingMode('airways-cargo')}
              className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                bookingMode === 'airways-cargo'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <PlaneTakeoff className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>🛫 EXPRESS AIR CARGO</span>
            </button>
          </div>

          {bookingMode === 'airways-passenger' ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase">
                    <Plane className="w-4 h-4" />
                    <span>AIRWAYS FLIGHT TICKET BOOKING PORTAL (DOMESTIC & INTERNATIONAL)</span>
                  </div>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 font-mono px-2.5 py-1 rounded-full border border-sky-500/30">
                    IATA & GDS Connected
                  </span>
                </div>
                <h2 className="text-xl font-black text-white">Book Airways Flight Tickets Across SAARC & Global Corridors</h2>
                <p className="text-xs text-slate-300">
                  Select international or domestic routes, passenger details, cabin class suites, airport lounges, and issue verified E-Tickets with QR Boarding Passes.
                </p>
              </div>

              {/* Quick Select Popular Flights Bar */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                  <PlaneTakeoff className="w-3.5 h-3.5 text-sky-400" />
                  <span>Popular Quick Flight Deals & Featured Corridors</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { origin: 'DEL - Indira Gandhi Int\'l, New Delhi (India)', dest: 'SIN - Changi Int\'l, Singapore', carrier: 'Air India (AI)', scope: 'International' as const, class: 'Business Class' as const, fare: 380, label: 'DEL ✈️ SIN • Air India' },
                    { origin: 'BOM - Chhatrapati Shivaji Int\'l, Mumbai (India)', dest: 'MLE - Velana Int\'l, Malé (Maldives)', carrier: 'Air India (AI)', scope: 'International' as const, class: 'Business Class' as const, fare: 310, label: 'BOM ✈️ MLE • Air India' },
                    { origin: 'MAA - Chennai Int\'l, Chennai (India)', dest: 'CMB - Bandaranaike Int\'l, Colombo (Sri Lanka)', carrier: 'SriLankan Airlines (UL)', scope: 'International' as const, class: 'Economy Class' as const, fare: 145, label: 'MAA ✈️ CMB • SriLankan' },
                    { origin: 'BOM - Chhatrapati Shivaji Int\'l, Mumbai (India)', dest: 'DEL - Indira Gandhi Int\'l, New Delhi (India)', carrier: 'IndiGo (6E)', scope: 'Domestic' as const, class: 'Economy Class' as const, fare: 75, label: 'BOM ✈️ DEL • IndiGo 6E' },
                    { origin: 'COK - Cochin Int\'l, Kochi (India)', dest: 'AGX - Agatti Airport, Lakshadweep (India)', carrier: 'Alliance Air (9I)', scope: 'Domestic' as const, class: 'Economy Class' as const, fare: 120, label: 'COK ✈️ AGX • Lakshadweep' },
                    { origin: 'DAC - Hazrat Shahjalal Int\'l, Dhaka (Bangladesh)', dest: 'BKK - Suvarnabhumi Int\'l, Bangkok (Thailand)', carrier: 'Biman Bangladesh (BG)', scope: 'International' as const, class: 'Economy Class' as const, fare: 210, label: 'DAC ✈️ BKK • Biman' },
                  ].map((deal, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFlightScope(deal.scope);
                        setAirwaysOriginAirport(deal.origin);
                        setAirwaysDestAirport(deal.dest);
                        setAirlineCarrier(deal.carrier);
                        setFlightClass(deal.class);
                      }}
                      className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 rounded-xl text-left transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">{deal.label}</div>
                        <div className="text-[10px] text-slate-400">{deal.scope} • {deal.class}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-sky-400 font-mono">${deal.fare}</div>
                        <div className="text-[9px] text-teal-400 font-bold">1-Click Select</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flight Form Grid */}
              <form onSubmit={handleCompleteAirwaysFlightBookingApi} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Controls (2 Cols) */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl">
                  {/* Flight Scope & Trip Type Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-800 pb-5">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Flight Category Scope</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
                        <button
                          type="button"
                          onClick={() => setFlightScope('International')}
                          className={`py-2 rounded-lg font-bold transition-all ${
                            flightScope === 'International'
                              ? 'bg-sky-500 text-slate-950 shadow font-black'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          🌐 International
                        </button>
                        <button
                          type="button"
                          onClick={() => setFlightScope('Domestic')}
                          className={`py-2 rounded-lg font-bold transition-all ${
                            flightScope === 'Domestic'
                              ? 'bg-sky-500 text-slate-950 shadow font-black'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          🇮🇳 Domestic
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1.5">Trip Type Journey</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
                        <button
                          type="button"
                          onClick={() => setTripType('One-Way')}
                          className={`py-2 rounded-lg font-bold transition-all ${
                            tripType === 'One-Way'
                              ? 'bg-amber-500 text-slate-950 shadow font-black'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          ➡️ One-Way
                        </button>
                        <button
                          type="button"
                          onClick={() => setTripType('Round-Trip')}
                          className={`py-2 rounded-lg font-bold transition-all ${
                            tripType === 'Round-Trip'
                              ? 'bg-amber-500 text-slate-950 shadow font-black'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          🔄 Round-Trip
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Route & Carrier Selection */}
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Departure Airport (Origin)</label>
                        <select
                          value={airwaysOriginAirport}
                          onChange={(e) => setAirwaysOriginAirport(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-sky-300 font-bold focus:outline-none focus:border-sky-500"
                        >
                          <option value="DEL - Indira Gandhi Int'l, New Delhi (India)">DEL - New Delhi (India)</option>
                          <option value="BOM - Chhatrapati Shivaji Int'l, Mumbai (India)">BOM - Mumbai (India)</option>
                          <option value="MAA - Chennai Int'l, Chennai (India)">MAA - Chennai (India)</option>
                          <option value="COK - Cochin Int'l, Kochi (India)">COK - Kochi (India)</option>
                          <option value="SIN - Changi Int'l, Singapore">SIN - Singapore Changi</option>
                          <option value="CMB - Bandaranaike Int'l, Colombo (Sri Lanka)">CMB - Colombo (Sri Lanka)</option>
                          <option value="MLE - Velana Int'l, Malé (Maldives)">MLE - Malé (Maldives)</option>
                          <option value="DAC - Hazrat Shahjalal Int'l, Dhaka (Bangladesh)">DAC - Dhaka (Bangladesh)</option>
                          <option value="CGP - Shah Amanat Int'l, Chittagong (Bangladesh)">CGP - Chittagong (Bangladesh)</option>
                          <option value="KTM - Tribhuvan Int'l, Kathmandu (Nepal)">KTM - Kathmandu (Nepal)</option>
                          <option value="PBH - Paro Int'l, Paro (Bhutan)">PBH - Paro (Bhutan)</option>
                          <option value="DXB - Dubai Int'l, Dubai (UAE)">DXB - Dubai (UAE)</option>
                          <option value="BKK - Suvarnabhumi Int'l, Bangkok (Thailand)">BKK - Bangkok (Thailand)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Destination Airport</label>
                        <select
                          value={airwaysDestAirport}
                          onChange={(e) => setAirwaysDestAirport(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                        >
                          <option value="SIN - Changi Int'l, Singapore">SIN - Singapore Changi</option>
                          <option value="CMB - Bandaranaike Int'l, Colombo (Sri Lanka)">CMB - Colombo (Sri Lanka)</option>
                          <option value="MLE - Velana Int'l, Malé (Maldives)">MLE - Malé (Maldives)</option>
                          <option value="DEL - Indira Gandhi Int'l, New Delhi (India)">DEL - New Delhi (India)</option>
                          <option value="BOM - Chhatrapati Shivaji Int'l, Mumbai (India)">BOM - Mumbai (India)</option>
                          <option value="MAA - Chennai Int'l, Chennai (India)">MAA - Chennai (India)</option>
                          <option value="COK - Cochin Int'l, Kochi (India)">COK - Kochi (India)</option>
                          <option value="AGX - Agatti Airport, Lakshadweep (India)">AGX - Agatti Lakshadweep</option>
                          <option value="DAC - Hazrat Shahjalal Int'l, Dhaka (Bangladesh)">DAC - Dhaka (Bangladesh)</option>
                          <option value="KTM - Tribhuvan Int'l, Kathmandu (Nepal)">KTM - Kathmandu (Nepal)</option>
                          <option value="DXB - Dubai Int'l, Dubai (UAE)">DXB - Dubai (UAE)</option>
                          <option value="BKK - Suvarnabhumi Int'l, Bangkok (Thailand)">BKK - Bangkok (Thailand)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Airline Carrier Operator</label>
                        <select
                          value={airlineCarrier}
                          onChange={(e) => setAirlineCarrier(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-bold focus:outline-none"
                        >
                          <option value="Air India (AI)">Air India (AI)</option>
                          <option value="Singapore Airlines (SQ)">Singapore Airlines (SQ)</option>
                          <option value="Emirates Airways (EK)">Emirates Airways (EK)</option>
                          <option value="SriLankan Airlines (UL)">SriLankan Airlines (UL)</option>
                          <option value="Maldivian Air (Q2)">Maldivian Air (Q2)</option>
                          <option value="IndiGo Airways (6E)">IndiGo Airways (6E)</option>
                          <option value="Qatar Airways (QR)">Qatar Airways (QR)</option>
                          <option value="Biman Bangladesh (BG)">Biman Bangladesh (BG)</option>
                          <option value="Drukair Royal Bhutan (KB)">Drukair Royal Bhutan (KB)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Cabin Class Suite</label>
                        <select
                          value={flightClass}
                          onChange={(e) => setFlightClass(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-amber-300 font-bold focus:outline-none"
                        >
                          <option value="Economy Class">Economy Class (Standard Seat)</option>
                          <option value="Premium Economy Class">Premium Economy Class (Extra Legroom)</option>
                          <option value="Business Class">Business Class (Flat-Bed Suite)</option>
                          <option value="First Class Suite">First Class Suite (Private Cabin & Champagne)</option>
                        </select>
                      </div>
                    </div>

                    {/* Schedule & Passengers */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Departure Date</label>
                        <input
                          type="date"
                          required
                          value={flightDepartureDate}
                          onChange={(e) => setFlightDepartureDate(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                        />
                      </div>

                      {tripType === 'Round-Trip' && (
                        <div>
                          <label className="font-bold text-slate-300 block mb-1">Return Date</label>
                          <input
                            type="date"
                            required
                            value={flightReturnDate}
                            onChange={(e) => setFlightReturnDate(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                      )}

                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Passenger Count</label>
                        <select
                          value={flightPassengers}
                          onChange={(e) => setFlightPassengers(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-bold"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                            <option key={n} value={n}>
                              {n} Passenger{n > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Passenger Contact Credentials */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="font-bold text-sky-400 text-xs flex items-center space-x-1.5">
                        <User className="w-4 h-4" />
                        <span>Lead Passenger Credentials & Passport Verification</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Full Name (As on Passport)"
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Passport Number / Govt ID"
                          value={passportId}
                          onChange={(e) => setPassportId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Contact Phone / WhatsApp"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* In-Flight Extras & Airport Lounge */}
                    <div className="space-y-2">
                      <label className="font-bold text-slate-300 block">Airways Add-on Hospitality & Extras</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <label className="flex items-center space-x-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-sky-500/40">
                          <input
                            type="checkbox"
                            checked={addExtraBaggage}
                            onChange={(e) => setAddExtraBaggage(e.target.checked)}
                            className="rounded text-sky-500 focus:ring-0 bg-slate-900 border-slate-700"
                          />
                          <div className="flex-1">
                            <span className="font-bold text-white block">🧳 Extra Baggage (+15kg)</span>
                            <span className="text-[10px] text-slate-400">+$45 / Person</span>
                          </div>
                        </label>

                        <label className="flex items-center space-x-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-sky-500/40">
                          <input
                            type="checkbox"
                            checked={addInflightGourmet}
                            onChange={(e) => setAddInflightGourmet(e.target.checked)}
                            className="rounded text-sky-500 focus:ring-0 bg-slate-900 border-slate-700"
                          />
                          <div className="flex-1">
                            <span className="font-bold text-white block">🍽️ Inflight Gourmet Meal</span>
                            <span className="text-[10px] text-slate-400">+$25 / Person</span>
                          </div>
                        </label>

                        <label className="flex items-center space-x-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-sky-500/40">
                          <input
                            type="checkbox"
                            checked={addFastTrackSecurity}
                            onChange={(e) => setAddFastTrackSecurity(e.target.checked)}
                            className="rounded text-sky-500 focus:ring-0 bg-slate-900 border-slate-700"
                          />
                          <div className="flex-1">
                            <span className="font-bold text-white block">⚡ Fast-Track Security</span>
                            <span className="text-[10px] text-slate-400">+$35 / Person</span>
                          </div>
                        </label>

                        <label className="flex items-center space-x-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-sky-500/40">
                          <input
                            type="checkbox"
                            checked={addAirportLounge}
                            onChange={(e) => setAddAirportLounge(e.target.checked)}
                            className="rounded text-sky-500 focus:ring-0 bg-slate-900 border-slate-700"
                          />
                          <div className="flex-1">
                            <span className="font-bold text-white block">🥂 Executive Airport Lounge</span>
                            <span className="text-[10px] text-slate-400">+$50 / Person</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Agent Code & Payment Gateway Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">B2B Agent Discount Code</label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="e.g. EASTMAN10"
                            value={agentCodeInput}
                            onChange={(e) => setAgentCodeInput(e.target.value.toUpperCase())}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-300 font-mono font-bold"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (agentCodeInput.trim().toUpperCase() === 'EASTMAN10') {
                                setAgentValidationResult({ valid: true, discountPercent: 10, agencyName: 'Eastman Travel Group', message: '10% Agent Discount Applied!' });
                              } else {
                                setAgentValidationResult({ valid: false, message: 'Invalid or expired agent code.' });
                              }
                            }}
                            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 rounded-xl border border-slate-700"
                          >
                            Apply
                          </button>
                        </div>
                        {agentValidationResult && (
                          <div className={`text-[11px] font-bold mt-1 ${agentValidationResult.valid ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {agentValidationResult.message}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Payment Method</label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-bold"
                        >
                          <option value="Credit / Debit Card">Credit / Debit Card</option>
                          <option value="UPI / NetBanking">UPI / NetBanking</option>
                          <option value="Wire Transfer">Wire Transfer</option>
                          <option value="Marine Digital Wallet">Airways Digital Wallet</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Flight Fare Summary Card (1 Col) */}
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-5 shadow-xl">
                    <div className="border-b border-slate-800 pb-3">
                      <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">LIVE AIRWAYS TICKET SUMMARY</div>
                      <h3 className="text-lg font-black text-white mt-1">{airlineCarrier}</h3>
                      <p className="text-xs text-slate-400 font-mono">{airwaysOriginAirport.split(' - ')[0]} ✈️ {airwaysDestAirport.split(' - ')[0]}</p>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Flight Scope:</span>
                        <span className="font-bold text-sky-300">{flightScope} ({tripType})</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Cabin Suite:</span>
                        <span className="font-bold text-amber-300">{flightClass}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Passengers:</span>
                        <span className="font-bold text-white">{flightPassengers} Person{flightPassengers > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Travel Date:</span>
                        <span className="font-mono text-slate-200">{flightDepartureDate}</span>
                      </div>

                      {flightDiscountUSD > 0 && (
                        <div className="flex justify-between text-amber-400 font-bold border-t border-slate-800 pt-2">
                          <span>B2B Agent Discount (10%):</span>
                          <span className="font-mono">-${flightDiscountUSD} USD</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                        <span className="font-extrabold text-white">Total Amount Payable:</span>
                        <span className="text-2xl font-black text-sky-400 font-mono">
                          ${totalCalculatedFlightFareUSD} <span className="text-xs text-slate-400 font-normal">USD</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs text-slate-400">
                      <div className="flex items-center space-x-1 text-sky-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Instant E-Ticket & PNR Guarantee</span>
                      </div>
                      <p className="text-[11px]">
                        Generates a verified PNR, assigned seat numbers, terminal gate details, and printable QR Boarding Pass upon completion.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingBooking}
                      className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center space-x-2"
                    >
                      {isSubmittingBooking ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Plane className="w-5 h-5" />
                          <span>ISSUE AIRWAYS FLIGHT TICKET (${totalCalculatedFlightFareUSD})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : bookingMode === 'airways-cargo' ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase">
                    <PlaneTakeoff className="w-4 h-4" />
                    <span>EXPRESS AIR CARGO & FREIGHT LOGISTICS PORTAL</span>
                  </div>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-mono px-2.5 py-1 rounded-full border border-indigo-500/30">
                    ICAO & IATA Cargo Certified
                  </span>
                </div>
                <h2 className="text-xl font-black text-white">Air Cargo Express Dispatch & Volumetric Chargeable Weight Engine</h2>
                <p className="text-xs text-slate-300">
                  Book priority air freight, pharma cold-chain parcels, hazmat chemicals, and generate official IATA Air Waybills (AWB) with live tracking.
                </p>
              </div>

              {/* Air Cargo Form Grid */}
              <form onSubmit={handleCompleteAirCargoBookingApi} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Controls (2 Cols) */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl">
                  {/* Service Level Selection */}
                  <div>
                    <label className="font-bold text-slate-300 text-xs block mb-1.5">Air Cargo Service Level Category</label>
                    <select
                      value={airCargoServiceLevel}
                      onChange={(e) => setAirCargoServiceLevel(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-indigo-300 font-bold focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Express Priority Air Freight (24-48 Hrs)">Express Priority Air Freight (24-48 Hrs)</option>
                      <option value="Standard Commercial Air Freight (3-5 Days)">Standard Commercial Air Freight (3-5 Days)</option>
                      <option value="Temperature-Controlled Pharma & Perishable Air Cargo">Temperature-Controlled Pharma & Perishable Air Cargo (-20°C)</option>
                      <option value="Dangerous Goods (ICAO/IATA Hazmat Class)">Dangerous Goods (ICAO/IATA Hazmat Class)</option>
                      <option value="Valuables & High-Security Precious Freight">Valuables & High-Security Precious Freight</option>
                    </select>
                  </div>

                  {/* Shipper & Consignee Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-indigo-400 flex items-center space-x-1.5">
                        <Truck className="w-4 h-4" />
                        <span>Consignor / Shipper (Sender)</span>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Shipper Contact Person"
                        value={airCargoConsignorName}
                        onChange={(e) => setAirCargoConsignorName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Shipper Company / Hub"
                        value={airCargoConsignorCompany}
                        onChange={(e) => setAirCargoConsignorCompany(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-amber-400 flex items-center space-x-1.5">
                        <PackageCheck className="w-4 h-4" />
                        <span>Consignee / Receiver</span>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Consignee Contact Person"
                        value={airCargoConsigneeName}
                        onChange={(e) => setAirCargoConsigneeName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Consignee Company / Cargo Hub"
                        value={airCargoConsigneeCompany}
                        onChange={(e) => setAirCargoConsigneeCompany(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Origin & Destination Hubs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Origin Air Cargo Hub</label>
                      <select
                        value={airCargoOriginHub}
                        onChange={(e) => setAirCargoOriginHub(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-indigo-300 font-bold focus:outline-none"
                      >
                        <option value="DEL Air Cargo Complex, New Delhi (India)">DEL Air Cargo Complex, New Delhi</option>
                        <option value="BOM Air Cargo Terminal, Mumbai (India)">BOM Air Cargo Terminal, Mumbai</option>
                        <option value="SIN Changi Cargo Terminal, Singapore">SIN Changi Cargo Terminal, Singapore</option>
                        <option value="CMB Air Cargo Hub, Colombo (Sri Lanka)">CMB Air Cargo Hub, Colombo</option>
                        <option value="MLE Cargo Terminal, Malé (Maldives)">MLE Cargo Terminal, Malé</option>
                        <option value="DAC Air Cargo Complex, Dhaka (Bangladesh)">DAC Air Cargo Complex, Dhaka</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Destination Air Cargo Hub</label>
                      <select
                        value={airCargoDestHub}
                        onChange={(e) => setAirCargoDestHub(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-amber-300 font-bold focus:outline-none"
                      >
                        <option value="SIN Changi Cargo Terminal, Singapore">SIN Changi Cargo Terminal, Singapore</option>
                        <option value="DEL Air Cargo Complex, New Delhi (India)">DEL Air Cargo Complex, New Delhi</option>
                        <option value="BOM Air Cargo Terminal, Mumbai (India)">BOM Air Cargo Terminal, Mumbai</option>
                        <option value="CMB Air Cargo Hub, Colombo (Sri Lanka)">CMB Air Cargo Hub, Colombo</option>
                        <option value="MLE Cargo Terminal, Malé (Maldives)">MLE Cargo Terminal, Malé</option>
                        <option value="DXB Cargo Mega Terminal, Dubai (UAE)">DXB Cargo Mega Terminal, Dubai</option>
                      </select>
                    </div>
                  </div>

                  {/* Carrier & Departure Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Air Cargo Carrier Airline</label>
                      <select
                        value={airCargoCarrier}
                        onChange={(e) => setAirCargoCarrier(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-bold"
                      >
                        <option value="Singapore Airlines Cargo (SQ Cargo)">Singapore Airlines Cargo (SQ Cargo)</option>
                        <option value="Emirates SkyCargo (EK Cargo)">Emirates SkyCargo (EK Cargo)</option>
                        <option value="Air India Cargo (AI Cargo)">Air India Cargo (AI Cargo)</option>
                        <option value="Qatar Airways Cargo (QR Cargo)">Qatar Airways Cargo (QR Cargo)</option>
                        <option value="Cathay Cargo (CX Cargo)">Cathay Cargo (CX Cargo)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Cargo Flight Departure Date</label>
                      <input
                        type="date"
                        required
                        value={airCargoDepartureDate}
                        onChange={(e) => setAirCargoDepartureDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Volumetric Weight Calculator Engine */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="font-bold text-indigo-400 flex items-center space-x-1.5">
                        <Scale className="w-4 h-4" />
                        <span>Volumetric Chargeable Weight Calculator (IATA Standard L×W×H / 6000)</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
                        Chargeable: {chargeableAirCargoWeightKg} KG
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 font-bold">Actual Weight (KG)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={airCargoWeightKg}
                          onChange={(e) => setAirCargoWeightKg(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-indigo-300 font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 font-bold">Length (CM)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={airCargoLengthCm}
                          onChange={(e) => setAirCargoLengthCm(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 font-bold">Width (CM)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={airCargoWidthCm}
                          onChange={(e) => setAirCargoWidthCm(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 font-bold">Height (CM)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={airCargoHeightCm}
                          onChange={(e) => setAirCargoHeightCm(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Actual Weight: <strong className="text-white">{airCargoWeightKg} kg</strong></span>
                      <span>Volumetric Dim Weight: <strong className="text-amber-300">{volumetricWeightKg} kg</strong></span>
                      <span>Chargeable Weight: <strong className="text-emerald-400 font-black">{chargeableAirCargoWeightKg} kg</strong></span>
                    </div>
                  </div>

                  {/* Handling Add-ons */}
                  <div className="space-y-2 text-xs">
                    <label className="font-bold text-slate-300 block">Air Cargo Ground Handling & Hazmat Options</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <label className="flex items-center space-x-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addRampEscort}
                          onChange={(e) => setAddRampEscort(e.target.checked)}
                          className="rounded text-indigo-500 focus:ring-0 bg-slate-900 border-slate-700"
                        />
                        <div>
                          <span className="font-bold text-white block">🛩️ Tarmac Ramp Escort</span>
                          <span className="text-[10px] text-slate-400">+$150</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addIataHazmatSeal}
                          onChange={(e) => setAddIataHazmatSeal(e.target.checked)}
                          className="rounded text-indigo-500 focus:ring-0 bg-slate-900 border-slate-700"
                        />
                        <div>
                          <span className="font-bold text-white block">🔒 IATA Hazmat Seal</span>
                          <span className="text-[10px] text-slate-400">+$250</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addDryIceTempControl}
                          onChange={(e) => setAddDryIceTempControl(e.target.checked)}
                          className="rounded text-indigo-500 focus:ring-0 bg-slate-900 border-slate-700"
                        />
                        <div>
                          <span className="font-bold text-white block">❄️ Dry Ice Temp Control</span>
                          <span className="text-[10px] text-slate-400">+$200</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Air Cargo Quote Card (1 Col) */}
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-5 shadow-xl">
                    <div className="border-b border-slate-800 pb-3">
                      <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">AIR WAYBILL (AWB) FREIGHT QUOTE</div>
                      <h3 className="text-lg font-black text-white mt-1">{airCargoCarrier}</h3>
                      <p className="text-xs text-slate-400 font-mono">{airCargoOriginHub.split(',')[0]} ✈️ {airCargoDestHub.split(',')[0]}</p>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Service Category:</span>
                        <span className="font-bold text-indigo-300 truncate max-w-[150px]">{airCargoServiceLevel.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Chargeable Weight:</span>
                        <span className="font-bold text-emerald-400 font-mono">{chargeableAirCargoWeightKg} KG</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Rate per KG:</span>
                        <span className="font-bold text-white font-mono">${airCargoRatePerKg.toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Base Air Freight:</span>
                        <span className="font-bold text-white font-mono">${baseAirFreightFee} USD</span>
                      </div>

                      {airCargoAgentDiscountUSD > 0 && (
                        <div className="flex justify-between text-amber-400 font-bold border-t border-slate-800 pt-2">
                          <span>B2B Agent Discount (10%):</span>
                          <span className="font-mono">-${airCargoAgentDiscountUSD} USD</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                        <span className="font-extrabold text-white">Total Freight Fee:</span>
                        <span className="text-2xl font-black text-indigo-400 font-mono">
                          ${totalCalculatedAirCargoFeeUSD} <span className="text-xs text-slate-400 font-normal">USD</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs text-slate-400">
                      <div className="flex items-center space-x-1 text-indigo-400 font-bold">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Automated IATA Air Waybill (AWB)</span>
                      </div>
                      <p className="text-[11px]">
                        Submitting issues an official AWB manifest with tracking number, customs clearance code, and air cargo terminal seal.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingBooking}
                      className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-black rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2"
                    >
                      {isSubmittingBooking ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <PlaneTakeoff className="w-5 h-5" />
                          <span>DISPATCH AIR CARGO & ISSUE AWB (${totalCalculatedAirCargoFeeUSD})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : bookingMode === 'cargo' ? (
            <form onSubmit={handleCompleteCargoBookingApi} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cargo & Shipper Specifications (2 cols) */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                    <Box className="w-5 h-5 text-amber-400" />
                    <span>Cargo Specification & Consignee Manifest</span>
                  </h3>
                  <span className="text-xs text-amber-300 font-bold bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
                    B/L Manifest Engine
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Shipper & Receiver Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-teal-400 flex items-center space-x-1.5">
                        <Truck className="w-4 h-4 text-teal-400" />
                        <span>Consignor / Shipper (Sender)</span>
                      </div>
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          required
                          placeholder="Contact Person (e.g. Capt. Jonathan Vance)"
                          value={consignorName}
                          onChange={(e) => setConsignorName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Company / Shipping Agency"
                          value={consignorCompany}
                          onChange={(e) => setConsignorCompany(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-amber-400 flex items-center space-x-1.5">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        <span>Consignee / Receiver (Destination)</span>
                      </div>
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          required
                          placeholder="Receiving Agent / Person"
                          value={consigneeName}
                          onChange={(e) => setConsigneeName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Company / Terminal Logistics"
                          value={consigneeCompany}
                          onChange={(e) => setConsigneeCompany(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Email & Mobile Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Contact Email (for Digital Bill of Lading)</label>
                      <input
                        type="email"
                        required
                        value={cargoContactEmail}
                        onChange={(e) => setCargoContactEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Contact Mobile / Dispatch Hotline</label>
                      <input
                        type="tel"
                        required
                        value={cargoContactPhone}
                        onChange={(e) => setCargoContactPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Cargo Classification & Freight Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-300">Cargo Classification Category</label>
                      <select
                        value={cargoCategory}
                        onChange={(e) => setCargoCategory(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-amber-300 font-bold focus:outline-none"
                      >
                        <option value="Dry Container (20ft/40ft TEU)">Dry Container (20ft/40ft TEU Standard Freight)</option>
                        <option value="Reefer Cold Chain Container">Reefer Cold Chain Container (Temperature Controlled)</option>
                        <option value="Hazardous Chemicals (IMO Class)">Hazardous Chemicals (IMO Class 1-9 Hazmat)</option>
                        <option value="Heavy Machinery & Breakbulk">Heavy Machinery & Industrial Breakbulk</option>
                        <option value="Automobile RoRo">Automobile & Vehicle Roll-On Roll-Off (RoRo)</option>
                        <option value="Express Marine Freight Parcel">Express Marine Freight Parcel / LCL Air-Sea</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Departure Date</label>
                      <input
                        type="date"
                        required
                        value={cargoDepartureDate}
                        onChange={(e) => setCargoDepartureDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Cargo Weight & Volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Gross Cargo Weight (Metric Tons)</label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          min="0.5"
                          max="1000"
                          value={cargoWeightTons}
                          onChange={(e) => setCargoWeightTons(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono font-bold focus:outline-none"
                        />
                        <span className="absolute right-3 top-2 text-[10px] text-slate-500">TONS</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Total Volume (Cubic Meters / CBM)</label>
                      <div className="relative">
                        <input
                          type="number"
                          step="1"
                          min="1"
                          max="5000"
                          value={cargoVolumeCbm}
                          onChange={(e) => setCargoVolumeCbm(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono font-bold focus:outline-none"
                        />
                        <span className="absolute right-3 top-2 text-[10px] text-slate-500">CBM</span>
                      </div>
                    </div>
                  </div>

                  {/* Ports & Assigned Vessel */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Port of Origin (Loading)</label>
                      <select
                        value={cargoOriginPort}
                        onChange={(e) => setCargoOriginPort(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="JNPT Mumbai, India">JNPT Mumbai, India</option>
                        <option value="Kochi Port (Cochin), India">Kochi Port (Cochin), India</option>
                        <option value="Chittagong Port, Bangladesh">Chittagong Port, Bangladesh</option>
                        <option value="Colombo Harbour, Sri Lanka">Colombo Harbour, Sri Lanka</option>
                        <option value="Marina Bay Terminal Singapore">Marina Bay Terminal Singapore</option>
                        <option value="Malé Commercial Port, Maldives">Malé Commercial Port, Maldives</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Port of Discharge (Destination)</label>
                      <select
                        value={cargoDestPort}
                        onChange={(e) => setCargoDestPort(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Colombo Harbour, Sri Lanka">Colombo Harbour, Sri Lanka</option>
                        <option value="Malé Commercial Port, Maldives">Malé Commercial Port, Maldives</option>
                        <option value="Kochi Port (Cochin), India">Kochi Port (Cochin), India</option>
                        <option value="JNPT Mumbai, India">JNPT Mumbai, India</option>
                        <option value="Chittagong Port, Bangladesh">Chittagong Port, Bangladesh</option>
                        <option value="Port of Hamburg, Germany">Port of Hamburg, Germany</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Assigned Cargo Vessel / Line</label>
                      <input
                        type="text"
                        required
                        value={cargoVesselName}
                        onChange={(e) => setCargoVesselName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Customs & Hazmat / Reefer Dynamic Fields */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">Customs Clearance & Regulatory Declaration</span>
                      <span className="text-[10px] text-teal-400 font-mono">IMO Marine Security Compliant</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 block">Customs Entry Declaration Code</label>
                        <input
                          type="text"
                          value={customsCodeInput}
                          onChange={(e) => setCustomsCodeInput(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono uppercase"
                        />
                      </div>

                      {cargoCategory.includes('Hazardous') ? (
                        <div className="space-y-1">
                          <label className="text-[10px] text-rose-400 font-bold block">IMO Hazmat Class Code</label>
                          <input
                            type="text"
                            value={hazmatClassInput}
                            onChange={(e) => setHazmatClassInput(e.target.value)}
                            className="w-full bg-rose-950/40 border border-rose-500/50 rounded-lg px-2.5 py-1.5 text-xs text-rose-300 font-mono"
                          />
                        </div>
                      ) : cargoCategory.includes('Reefer') ? (
                        <div className="space-y-1">
                          <label className="text-[10px] text-sky-400 font-bold block">Reefer Temperature Setting (°C)</label>
                          <input
                            type="number"
                            value={reeferTempSetting}
                            onChange={(e) => setReeferTempSetting(Number(e.target.value))}
                            className="w-full bg-sky-950/40 border border-sky-500/50 rounded-lg px-2.5 py-1.5 text-xs text-sky-300 font-mono font-bold"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 block">Cargo Handling Protocol</label>
                          <input
                            type="text"
                            value="Standard Container Stack / Dry Storage"
                            readOnly
                            className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-400"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Gateway for Cargo */}
                  <div className="pt-2 border-t border-slate-800 space-y-3">
                    <label className="font-bold text-slate-200 text-xs block">Payment Instrument / Freight Gateway</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { key: 'Credit / Debit Card', label: 'Card Payment', icon: CreditCard },
                        { key: 'Letter of Credit (L/C)', label: 'Letter of Credit (L/C)', icon: FileCheck },
                        { key: 'Wire Transfer', label: 'Bank Wire Swift', icon: Building2 },
                        { key: 'Marine Digital Wallet', label: 'Marine Wallet', icon: Zap },
                      ].map((item) => {
                        const IconComp = item.icon;
                        const isSel = cargoPaymentMethod === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setCargoPaymentMethod(item.key as any)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                              isSel
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold shadow-lg shadow-amber-500/10'
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-1">
                              <IconComp className={`w-4 h-4 ${isSel ? 'text-amber-400' : 'text-slate-500'}`} />
                              {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                            </div>
                            <div className="font-semibold text-[10px] text-white">{item.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Summary & Payment Checkout Card (1 col) */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span>Ocean Freight Tariff Invoice</span>
                  </h3>

                  <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-slate-400">
                      <span>Base Freight (${baseRatePerTon}/Ton x {cargoWeightTons} Tons):</span>
                      <span className="font-mono text-white">${cargoWeightTons * baseRatePerTon} USD</span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>Volume Charge ({cargoVolumeCbm} CBM x $15):</span>
                      <span className="font-mono text-white">${cargoVolumeCbm * 15} USD</span>
                    </div>

                    {cargoAgentDiscountUSD > 0 && (
                      <div className="flex justify-between text-amber-400 font-bold">
                        <span>Agent Partner Discount (10% OFF):</span>
                        <span className="font-mono">-${cargoAgentDiscountUSD} USD</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                      <span className="font-extrabold text-white">Total Freight Fee:</span>
                      <span className="text-2xl font-black text-amber-400 font-mono">
                        ${totalCalculatedCargoFeeUSD} <span className="text-xs text-slate-400 font-normal">USD</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs text-slate-400">
                    <div className="flex items-center space-x-1 text-amber-400 font-bold">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Automated Bill of Lading (B/L) Generation</span>
                    </div>
                    <p className="text-[11px]">
                      Submitting issues an official IMO-certified Bill of Lading with tracking code, customs clearance seal, and printable manifest.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  {isSubmittingBooking ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Box className="w-5 h-5" />
                      <span>SUBMIT CARGO FREIGHT BOOKING & ISSUE B/L</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase">
                    <CreditCard className="w-4 h-4" />
                    <span>OFFICIAL MARITIME TICKET & PAYMENT GATEWAY UI</span>
                  </div>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-500/30">
                    POST /api/bookings/create
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">Passenger Voyage Reservation & Interactive Gateway</h2>
                <p className="text-xs text-slate-300">
                  Select cruise package, apply B2B agent tie-up codes (e.g. EASTMAN10), enter guest credentials, select payment gateway method, and execute instant ticket booking.
                </p>
              </div>

              <form onSubmit={handleCompleteBookingApi} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Passenger Credentials Form (2 cols) */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                      <User className="w-4 h-4 text-teal-400" />
                      <span>Passenger & Voyage Credentials</span>
                    </h3>

                    <span className="text-xs text-teal-300 font-bold">Live API Connected</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Selected Marine Tourism Package / Voyage</label>
                      <select
                        value={selectedPackage ? selectedPackage.id : ''}
                        onChange={(e) => {
                          const found = MARINE_TOURISM_PACKAGES.find((p) => p.id === e.target.value);
                          if (found) setSelectedPackage(found);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-teal-300 font-bold focus:outline-none"
                      >
                        {MARINE_TOURISM_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.countryFlag} {pkg.title} — ${pkg.priceUSD} USD / Guest ({pkg.departurePort})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Lead Passenger Full Name (as in Passport)</label>
                        <input
                          type="text"
                          required
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Passport / National ID Number</label>
                        <input
                          type="text"
                          required
                          value={passportId}
                          onChange={(e) => setPassportId(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Nationality</label>
                        <input
                          type="text"
                          required
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Email Address (for Digital Ticket)</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Mobile Phone / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Travel Date</label>
                        <input
                          type="date"
                          required
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Number of Passengers</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={passengerCount}
                          onChange={(e) => setPassengerCount(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Cabin & Seating Class</label>
                        <select
                          value={cabinClass}
                          onChange={(e) => setCabinClass(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-teal-300 font-bold focus:outline-none"
                        >
                          <option value="Economy Deck">Economy Deck (1.0x Base)</option>
                          <option value="Business Ocean View">Business Ocean View (1.3x Base)</option>
                          <option value="Royal Deluxe Suite">Royal Deluxe Suite (1.8x Base)</option>
                        </select>
                      </div>
                    </div>

                    {/* B2B Agent Tie-Up Discount Validation Box */}
                    <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-amber-300 text-xs flex items-center space-x-1.5">
                          <Percent className="w-4 h-4 text-amber-400" />
                          <span>B2B Agent / Partner Tie-Up Code (Optional)</span>
                        </label>

                        <span className="text-[10px] text-slate-400">Try code: <code className="text-amber-300 font-mono">EASTMAN10</code></span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Enter Agent Code (e.g. EASTMAN10)"
                          value={agentCodeInput}
                          onChange={(e) => setAgentCodeInput(e.target.value.toUpperCase())}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 tracking-wider focus:outline-none uppercase"
                        />

                        <button
                          type="button"
                          onClick={handleValidateAgentCode}
                          disabled={isValidatingAgentCode || !agentCodeInput.trim()}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center space-x-1 shrink-0"
                        >
                          {isValidatingAgentCode ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          <span>Validate Code</span>
                        </button>
                      </div>

                      {agentValidationResult && (
                        <div className={`p-2.5 rounded-lg text-xs font-bold flex items-center space-x-2 ${
                          agentValidationResult.valid
                            ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                            : 'bg-rose-950/50 border border-rose-500/40 text-rose-300'
                        }`}>
                          {agentValidationResult.valid ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                          <span>{agentValidationResult.message} ({agentValidationResult.agencyName})</span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Payment Gateway UI Options */}
                    <div className="pt-3 border-t border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-slate-200 text-xs flex items-center space-x-1.5">
                          <CreditCard className="w-4 h-4 text-teal-400" />
                          <span>Select Interactive Payment Gateway Method</span>
                        </label>
                        <span className="text-[10px] text-emerald-400 font-mono">256-Bit SSL Encrypted</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { key: 'Credit / Debit Card', label: 'Credit / Debit Card', icon: CreditCard },
                          { key: 'UPI / NetBanking', label: 'UPI / Instant QR', icon: QrCode },
                          { key: 'Marine Digital Wallet', label: 'Marine Wallet', icon: Zap },
                          { key: 'Wire Transfer', label: 'Bank Wire Swift', icon: Building2 },
                          { key: 'Terminal Cash Counter', label: 'Terminal Counter', icon: User },
                        ].map((item) => {
                          const IconComp = item.icon;
                          const isSel = paymentMethod === item.key;
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setPaymentMethod(item.key as any)}
                              className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                                isSel
                                  ? 'bg-teal-500/20 text-teal-300 border-teal-500 font-bold shadow-lg shadow-teal-500/10'
                                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full mb-1">
                                <IconComp className={`w-4 h-4 ${isSel ? 'text-teal-400' : 'text-slate-500'}`} />
                                {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
                              </div>
                              <div className="font-semibold text-[11px] text-white">{item.label}</div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Payment Sub-Form Input Fields */}
                      {paymentMethod === 'Credit / Debit Card' && (
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 animate-fadeIn">
                          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                            <span className="font-bold text-white">Card Payment Details</span>
                            <span className="text-teal-400 font-mono">Visa / Mastercard / Amex</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400">Card Number</label>
                              <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="4532 0000 0000 0000"
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400">Cardholder Name</label>
                              <input
                                type="text"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value)}
                                placeholder="Full Name"
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400">Expiry (MM/YY)</label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="08/28"
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400">CVV Security Code</label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="•••"
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'UPI / NetBanking' && (
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 animate-fadeIn">
                          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                            <span className="font-bold text-white">UPI & Instant Bank Transfer</span>
                            <span className="text-emerald-400 font-mono">GPay / PhonePe / Paytm</span>
                          </div>
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="bg-white p-2 rounded-xl border border-slate-700 shrink-0">
                              <QrCode className="w-20 h-20 text-slate-950" />
                            </div>
                            <div className="space-y-2 text-xs flex-1">
                              <label className="text-[10px] text-slate-400 block">Virtual Payment Address (VPA)</label>
                              <input
                                type="text"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-teal-300 font-mono"
                              />
                              <p className="text-[10px] text-slate-400">
                                Scan QR with any UPI app or enter VPA address to receive auto-debit confirmation.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'Marine Digital Wallet' && (
                        <div className="p-4 bg-slate-950 border border-teal-500/30 rounded-xl space-y-2 animate-fadeIn">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-teal-300">Marine Digital Wallet Connected</span>
                            <span className="text-emerald-400 font-mono font-black">${walletBalance}.00 USD Credits</span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            1-Click checkout active! Deducts directly from your verified Seafarer Wallet account without OTP delays.
                          </p>
                        </div>
                      )}

                      {/* Insurance Option */}
                      <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <div className="font-bold text-white text-xs">Add High-Sea Travel & Delay Insurance ($24 / guest)</div>
                            <div className="text-[10px] text-slate-400">Covers emergency air evacuation, storm delay ($300/day), & baggage loss</div>
                          </div>
                        </div>

                        <input
                          type="checkbox"
                          checked={addInsurance}
                          onChange={(e) => setAddInsurance(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Summary & Payment Checkout Card (1 col) */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-2xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>Payment Invoice Summary</span>
                    </h3>

                    <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-slate-400">
                        <span>Base Package Fare ({passengerCount} x ${basePricePerPerson}):</span>
                        <span className="font-mono text-white">${basePricePerPerson * passengerCount} USD</span>
                      </div>

                      <div className="flex justify-between text-slate-400">
                        <span>Cabin Upgrade ({cabinClass}):</span>
                        <span className="font-mono text-white">
                          ${Math.round(basePricePerPerson * (classMultiplier - 1) * passengerCount)} USD
                        </span>
                      </div>

                      {addInsurance && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Maritime Travel Insurance Cover:</span>
                          <span className="font-mono">${insuranceFeePerPerson * passengerCount} USD</span>
                        </div>
                      )}

                      {discountUSD > 0 && (
                        <div className="flex justify-between text-amber-400 font-bold">
                          <span>B2B Agent Discount (10% OFF):</span>
                          <span className="font-mono">-${discountUSD} USD</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                        <span className="font-extrabold text-white">Total Amount Payable:</span>
                        <span className="text-2xl font-black text-emerald-400 font-mono">
                          ${totalCalculatedFareUSD} <span className="text-xs text-slate-400 font-normal">USD</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs text-slate-400">
                      <div className="flex items-center space-x-1 text-teal-400 font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Secure IMO & GDS Merchant Encryption</span>
                      </div>
                      <p className="text-[11px]">
                        Instant PNR ID & verified digital boarding pass generated directly via Express backend API.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
                  >
                    {isSubmittingBooking ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>EXECUTE PAYMENT & ISSUE TICKET (${totalCalculatedFareUSD})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* ==========================================
          TAB 2A: MULTI-MODAL BOOKINGS VIEW
         ========================================== */}
      {activeTab === 'multimodal' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 p-6 rounded-2xl border border-indigo-800/40 text-white space-y-2 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>UNIFIED MULTI-MODAL JOURNEY PLANNER & COMBINED ITINERARY ENGINE</span>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-mono px-2.5 py-1 rounded-full border border-indigo-500/30">
                15% MULTI-MODAL BUNDLE SAVINGS ACTIVE
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">Multi-Modal Booking & Master Itinerary Pass</h2>
            <p className="text-xs text-slate-300 max-w-3xl">
              Seamlessly combine Maritime Cruise / Ferry + Airways Flights + Ground Airport/Port Express Shuttles into a single unified ticket with guaranteed transfer connections and automatic luggage check-through.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Multi-Modal Form (2 cols) */}
            <form onSubmit={handleCreateMultiModalBooking} className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span>Configure Multi-Modal Itinerary Segments</span>
                </h3>
                <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Connection Guarantee Included</span>
                </span>
              </div>

              {/* Passenger Details */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 1: Lead Passenger Credentials</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Passenger Full Name</label>
                    <input
                      type="text"
                      required
                      value={mmPassengerName}
                      onChange={(e) => setMmPassengerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Passport / National ID No</label>
                    <input
                      type="text"
                      required
                      value={mmPassportId}
                      onChange={(e) => setMmPassportId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Contact Email</label>
                    <input
                      type="email"
                      required
                      value={mmEmail}
                      onChange={(e) => setMmEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={mmPhone}
                      onChange={(e) => setMmPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Segment 1: Cruise / Ferry */}
              <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-teal-400 flex items-center space-x-2">
                    <Ship className="w-4 h-4 text-teal-400" />
                    <span>SEGMENT 1: MARITIME CRUISE / FERRY TRANSIT</span>
                  </div>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 font-mono px-2 py-0.5 rounded">
                    Fare: ${mmCruiseFare} USD
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-400 block mb-1">Select Vessel & Seaway Route</label>
                    <select
                      value={mmCruiseRoute}
                      onChange={(e) => setMmCruiseRoute(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs font-bold"
                    >
                      <option value="MV Royal Indus Empress (Mumbai Port 🚢 Kochi Port)">
                        MV Royal Indus Empress (Mumbai Port 🚢 Kochi Transshipment Port)
                      </option>
                      <option value="Maldives Inter-Island Coral Express Ferry (Malé ⛴️ Maafushi)">
                        Maldives Inter-Island Coral Express Ferry (Malé Commercial Harbour ⛴️ Maafushi Island)
                      </option>
                      <option value="Chittagong Coastal Cruiser (Chittagong 🚢 Cox's Bazar)">
                        Chittagong Coastal Cruiser (Chittagong Seaport 🚢 Cox's Bazar Bay)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Sailing Date</label>
                    <input
                      type="date"
                      value={mmCruiseDate}
                      onChange={(e) => setMmCruiseDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Segment 2: Airways Flight */}
              <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sky-400 flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-sky-400" />
                    <span>SEGMENT 2: AIRWAYS FLIGHT TRANSIT</span>
                  </div>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 font-mono px-2 py-0.5 rounded">
                    Fare: ${mmFlightFare} USD
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Carrier Flight</label>
                    <select
                      value={mmFlightCarrier}
                      onChange={(e) => setMmFlightCarrier(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs font-bold"
                    >
                      <option value="Air India (AI-342)">Air India (AI-342)</option>
                      <option value="SriLankan Airlines (UL-102)">SriLankan Airlines (UL-102)</option>
                      <option value="IndiGo Express (6E-208)">IndiGo Express (6E-208)</option>
                      <option value="Singapore Airlines (SQ-421)">Singapore Airlines (SQ-421)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Flight Route</label>
                    <input
                      type="text"
                      value={mmFlightRoute}
                      onChange={(e) => setMmFlightRoute(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Flight Departure Date</label>
                    <input
                      type="date"
                      value={mmFlightDate}
                      onChange={(e) => setMmFlightDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Segment 3: Express Ground Shuttle */}
              <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-amber-400 flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <span>SEGMENT 3: PORT-TO-AIRPORT EXPRESS GROUND SHUTTLE</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded">
                    Fare: ${mmShuttleFare} USD
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Shuttle Service Provider</label>
                    <input
                      type="text"
                      value={mmShuttleProvider}
                      onChange={(e) => setMmShuttleProvider(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Transfer Route Corridor</label>
                    <input
                      type="text"
                      value={mmShuttleRoute}
                      onChange={(e) => setMmShuttleRoute(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Baggage Lock Option */}
              <div className="p-3 bg-indigo-950/40 border border-indigo-500/40 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Luggage className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Automatic Baggage Direct Check-Through</div>
                    <div className="text-[10px] text-slate-400">
                      Bags are transferred directly from vessel hold to aircraft cargo hold without manual re-claim.
                    </div>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={mmBaggageCheckThrough}
                  onChange={(e) => setMmBaggageCheckThrough(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingBooking}
                className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-2"
              >
                {isSubmittingBooking ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Layers className="w-5 h-5" />
                    <span>ISSUE COMBINED MULTI-MODAL MASTER PASS (${mmTotalPayableUSD} USD)</span>
                  </>
                )}
              </button>
            </form>

            {/* Multi-Modal Passes List (1 col) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                  <Ticket className="w-4 h-4 text-indigo-400" />
                  <span>Active Multi-Modal Passes ({multiModalBookings.length})</span>
                </h3>
              </div>

              <div className="space-y-4">
                {multiModalBookings.map((pass) => (
                  <div key={pass.id} className="p-4 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl space-y-3 transition-all">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block">UNIFIED PNR</span>
                        <strong className="text-indigo-400 font-mono text-sm">{pass.pnr}</strong>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                        ISSUED & VERIFIED
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Passenger:</span>
                        <strong className="text-white">{pass.passengerName}</strong>
                      </div>

                      {/* Visual Segments Flow */}
                      <div className="p-2.5 bg-slate-900 rounded-lg space-y-1.5 text-[10px]">
                        <div className="flex items-center text-teal-300 space-x-1">
                          <Ship className="w-3 h-3 shrink-0" />
                          <span className="truncate">{pass.cruiseLeg.vesselName}</span>
                        </div>
                        <div className="flex items-center text-sky-300 space-x-1">
                          <Plane className="w-3 h-3 shrink-0" />
                          <span className="truncate">{pass.flightLeg.carrier} ({pass.flightLeg.route})</span>
                        </div>
                        <div className="flex items-center text-amber-300 space-x-1">
                          <Truck className="w-3 h-3 shrink-0" />
                          <span className="truncate">{pass.shuttleLeg.provider}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400">Total Fare Paid:</span>
                        <span className="font-black text-indigo-300 text-sm">${pass.totalFareUSD} USD</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedMultiModalPass(pass)}
                      className="w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold rounded-lg text-xs border border-indigo-500/30 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>INSPECT UNIFIED MASTER PASS</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2B: CARGO MANIFEST VIEW
         ========================================== */}
      {activeTab === 'manifest' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-purple-800/40 text-white space-y-2 shadow-2xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase">
                <FileCheck className="w-4 h-4 text-purple-400" />
                <span>OFFICIAL IMO & IATA CARGO MANIFEST & CUSTOMS REGISTRY</span>
              </div>
              <button
                onClick={() => setIsGenerateManifestModalOpen(true)}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-lg shadow-purple-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>GENERATE NEW CARGO MANIFEST</span>
              </button>
            </div>
            <h2 className="text-2xl font-black text-white">Cargo Manifest Verification & Clearance</h2>
            <p className="text-xs text-slate-300 max-w-3xl">
              Inspect official, IMO & IATA certified cargo manifest documents for Ocean Container Freighters and Air Cargo Carriers. Verify Bill of Lading, ULD parcel weights, customs seal stamps, and Captain/Pilot signoffs.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search manifest ID, vessel/flight, consignor, or customs code..."
                value={manifestSearch}
                onChange={(e) => setManifestSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
              {(['All', 'Ocean Vessel', 'Air Cargo Flight'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setManifestTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    manifestTypeFilter === type
                      ? 'bg-purple-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Manifest Records Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cargoManifests
              .filter((m) => {
                const matchesSearch =
                  m.manifestId.toLowerCase().includes(manifestSearch.toLowerCase()) ||
                  m.carrierOrVessel.toLowerCase().includes(manifestSearch.toLowerCase()) ||
                  m.originHub.toLowerCase().includes(manifestSearch.toLowerCase()) ||
                  m.destinationHub.toLowerCase().includes(manifestSearch.toLowerCase());
                const matchesType = manifestTypeFilter === 'All' || m.transportType === manifestTypeFilter;
                return matchesSearch && matchesType;
              })
              .map((manifest) => (
                <div
                  key={manifest.manifestId}
                  className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 text-white space-y-4 transition-all shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        {manifest.transportType === 'Ocean Vessel' ? (
                          <Ship className="w-4 h-4 text-teal-400" />
                        ) : (
                          <Plane className="w-4 h-4 text-sky-400" />
                        )}
                        <strong className="text-purple-300 font-mono text-sm">{manifest.manifestId}</strong>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{manifest.generatedTimestamp}</span>
                    </div>

                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-mono font-bold border border-emerald-500/30 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{manifest.manifestStatus}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Carrier / Vessel</span>
                      <strong className="text-white">{manifest.carrierOrVessel}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Voyage / Flight No</span>
                      <strong className="text-amber-300 font-mono">{manifest.voyageOrFlightNo}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Origin Hub</span>
                      <span className="text-slate-300">{manifest.originHub}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Destination Hub</span>
                      <span className="text-slate-300">{manifest.destinationHub}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Gross Weight</span>
                      <strong className="text-emerald-400 font-mono">{(manifest.totalWeightKg / 1000).toFixed(1)} Tons ({manifest.totalWeightKg.toLocaleString()} kg)</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Customs Seal Stamp</span>
                      <span className="text-purple-300 font-mono text-[10px]">{manifest.customsSealCode}</span>
                    </div>
                  </div>

                  {/* Items Breakdown Snippet */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Manifest Cargo Items ({manifest.items.length} Listed)
                    </span>
                    {manifest.items.map((item) => (
                      <div key={item.itemId} className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] flex items-center justify-between">
                        <div>
                          <strong className="text-white block">{item.billOfLadingOrAwb}</strong>
                          <span className="text-[10px] text-slate-400">{item.description}</span>
                        </div>
                        <span className="text-amber-300 font-mono text-[10px] shrink-0 font-bold">{item.weightKg} kg</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center space-x-2">
                    <button
                      onClick={() => setActiveManifestModal(manifest)}
                      className="flex-1 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold rounded-xl text-xs border border-purple-500/30 transition-all flex items-center justify-center space-x-2"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>VIEW & PRINT OFFICIAL MANIFEST SHEET</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2C: LOYALTY TIERS VIEW
         ========================================== */}
      {activeTab === 'loyalty' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Member Tier Dashboard */}
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/40 text-white space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
                  <Crown className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-extrabold text-white">{loyaltyMember.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wide">
                      {loyaltyMember.tier}
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 font-mono">Member ID: {loyaltyMember.memberId}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/80 border border-amber-500/30 rounded-xl text-right">
                <span className="text-[10px] text-slate-400 block font-bold">MARINER MILES BALANCE</span>
                <span className="text-2xl font-black text-amber-400">{loyaltyMember.pointsBalance.toLocaleString()} PTS</span>
              </div>
            </div>

            {/* Tier Progress Bar */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Progress to Next Tier: <strong className="text-amber-300">Mariner Elite Ambassador (35,000 pts)</strong></span>
                <span className="font-bold text-amber-400">{loyaltyMember.nextTierProgressPct}%</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                  style={{ width: `${loyaltyMember.nextTierProgressPct}%` }}
                />
              </div>
            </div>

            {/* Loyalty Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Completed Trips</span>
                <strong className="text-white text-base">{loyaltyMember.tripsCompleted} Voyages & Flights</strong>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Miles Sailed / Flown</span>
                <strong className="text-cyan-300 text-base">{loyaltyMember.totalMilesSailedFlown.toLocaleString()} Miles</strong>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Free Lounge Passes</span>
                <strong className="text-emerald-400 text-base">{loyaltyMember.freeLoungePasses} Active Passes</strong>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Suite Upgrade Vouchers</span>
                <strong className="text-amber-300 text-base">{loyaltyMember.upgradeVouchers} Available</strong>
              </div>
            </div>
          </div>

          {/* 4 Loyalty Tiers Grid */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Loyalty Tier Status Hierarchy & Privilege Matrix</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: 'Silver Mariner',
                  pts: '0 - 5,000 Pts',
                  color: 'border-slate-700 bg-slate-900',
                  badge: 'bg-slate-700 text-slate-200',
                  benefits: ['5% Cruise & Flight Fare Discount', 'Standard Seat Selection', '10kg Extra Baggage'],
                },
                {
                  name: 'Gold Captain',
                  pts: '5,001 - 15,000 Pts',
                  color: 'border-amber-600/40 bg-amber-950/20',
                  badge: 'bg-amber-600 text-slate-950 font-bold',
                  benefits: ['10% Cruise & Flight Fare Discount', 'Priority Boarding & Fast-Track', '2x Airport Lounge Passes/Yr', '20kg Extra Baggage'],
                },
                {
                  name: 'Platinum Voyager',
                  pts: '15,001 - 35,000 Pts',
                  color: 'border-amber-400 bg-amber-950/40 ring-2 ring-amber-400/50',
                  badge: 'bg-amber-400 text-slate-950 font-black',
                  isCurrent: true,
                  benefits: ['15% Fare Discount Across All Segments', 'Free Suite Cabin Upgrade (Subject to Avail)', 'Unlimited Port & Airport Lounge', '30kg Extra Baggage', 'Zero Cancellation Fees'],
                },
                {
                  name: 'Mariner Elite Ambassador',
                  pts: '35,000+ Pts',
                  color: 'border-emerald-500/50 bg-emerald-950/20',
                  badge: 'bg-emerald-400 text-slate-950 font-black',
                  benefits: ['20% Fare Discount', 'Guaranteed Royal Suite Cabin Upgrade', 'Helicopter Airport Transfer', '24x7 Dedicated Concierge', '1 Free Companion Ticket / Year'],
                },
              ].map((t) => (
                <div key={t.name} className={`p-5 rounded-2xl border ${t.color} text-white space-y-3 relative shadow-xl`}>
                  {t.isCurrent && (
                    <span className="absolute -top-3 right-4 px-3 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider shadow">
                      YOUR CURRENT TIER
                    </span>
                  )}
                  <div>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-mono ${t.badge}`}>{t.name}</span>
                    <div className="text-xs text-slate-400 mt-1">{t.pts}</div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300">
                    {t.benefits.map((b, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Perks Redemption Store & Miles Calculator (2 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Perks Store (2 cols) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <h3 className="font-extrabold text-base text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Gift className="w-5 h-5 text-amber-400" />
                <span>Mariner Perks Redemption Store</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: '🎟️ Free Ocean Suite Cabin Upgrade', pts: 3000, desc: 'Instant upgrade to Royal Suite on any voyage.' },
                  { name: '🥂 Executive Airport & Port Lounge Pass', pts: 1200, desc: 'Complimentary gourmet buffet, Wi-Fi, & lounge access.' },
                  { name: '🚁 Helicopter Airport Transfer Voucher', pts: 8000, desc: '1-Way helipad shuttle transfer from airport to port terminal.' },
                  { name: '🛡️ Marine Insurance Policy Waiver', pts: 800, desc: 'Waives 100% of high-sea travel insurance premium.' },
                ].map((perk) => (
                  <div key={perk.name} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">{perk.name}</div>
                      <p className="text-[11px] text-slate-400 mt-1">{perk.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <strong className="text-amber-400 font-mono text-xs">{perk.pts.toLocaleString()} PTS</strong>
                      <button
                        onClick={() => handleRedeemPerk(perk.name, perk.pts)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-xs transition-all shadow-md shadow-amber-500/20"
                      >
                        REDEEM
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Miles Earnings Calculator (1 col) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <h3 className="font-extrabold text-base text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Calculator className="w-5 h-5 text-cyan-400" />
                <span>Miles Earnings Estimator</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Trip Distance (Nautical Miles / Flight Miles)</label>
                  <input
                    type="number"
                    value={calcDistanceNM}
                    onChange={(e) => setCalcDistanceNM(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Cabin / Flight Class Multiplier</label>
                  <select
                    value={calcClassMultiplier}
                    onChange={(e) => setCalcClassMultiplier(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300 font-bold"
                  >
                    <option value={1.0}>Economy Class Deck (1.0x)</option>
                    <option value={1.5}>Business Ocean View (1.5x)</option>
                    <option value={2.0}>Royal Deluxe Suite (2.0x)</option>
                    <option value={3.0}>First Class Presidential Suite (3.0x)</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-xl space-y-1 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block">ESTIMATED MARINER MILES EARNED</span>
                  <div className="text-3xl font-black text-amber-400">+{calculatedPointsEarned.toLocaleString()} PTS</div>
                  <p className="text-[10px] text-teal-400">Miles credited automatically upon journey completion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2D: VISUAL BOOKING TIMELINE VIEW
         ========================================== */}
      {activeTab === 'timeline' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 p-6 rounded-2xl border border-emerald-800/40 text-white space-y-2 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
                <Milestone className="w-4 h-4 text-emerald-400" />
                <span>INTERACTIVE VISUAL BOOKING LIFECYCLE & LIVE PROGRESS TIMELINE</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2.5 py-1 rounded-full border border-emerald-500/30">
                LIVE SATELLITE GPS ACTIVE
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">Visual Booking Journey Lifecycle</h2>
            <p className="text-xs text-slate-300 max-w-3xl">
              Inspect step-by-step milestone progress, payment clearance, customs seals, port gate-in, and live ocean / air transit tracking for any passenger ticket or cargo shipment.
            </p>
          </div>

          {/* Interactive PNR / Booking Selector */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="font-bold text-slate-300 shrink-0">Select Journey Category:</span>
              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {(['multimodal', 'passenger', 'airways', 'cargo'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setTimelineCategoryTab(cat);
                      if (cat === 'multimodal') setTimelineSelectedPnr(multiModalBookings[0]?.pnr || 'MM-SG-9901-2026');
                      if (cat === 'passenger') setTimelineSelectedPnr(confirmedBookings[0]?.pnr || 'OB-77401-2026');
                      if (cat === 'airways') setTimelineSelectedPnr('FL-AI-9021-2026');
                      if (cat === 'cargo') setTimelineSelectedPnr(confirmedCargoBookings[0]?.billOfLading || 'BL-IND-884910-2026');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      timelineCategoryTab === cat
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center space-x-2">
              <label className="font-bold text-slate-300 shrink-0">Active PNR / B/L:</label>
              <input
                type="text"
                value={timelineSelectedPnr}
                onChange={(e) => setTimelineSelectedPnr(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-300 font-mono font-bold text-xs w-full sm:w-64 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Live Horizontal Progress Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">PNR / TRACKING ID</span>
                <strong className="text-xl font-black text-emerald-400 font-mono">{timelineSelectedPnr}</strong>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-bold">CURRENT STATUS</span>
                <span className="px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-xs font-mono font-black border border-sky-500/30">
                  IN TRANSIT (65% COMPLETED)
                </span>
              </div>
            </div>

            {/* Progress Meter Bar */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Departure Hub</span>
                <span>Sea Waypoint Channel</span>
                <span>Destination Port Arrival</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-teal-500 via-sky-400 to-emerald-400 rounded-full w-[65%] transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Vertical Step-by-Step Milestone Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl">
            <h3 className="font-extrabold text-base text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>Step-by-Step Operational Milestone Log</span>
            </h3>

            <div className="relative border-l-2 border-slate-800 pl-6 ml-4 space-y-8">
              {/* Milestone 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-lg shadow-emerald-500/20">
                  ✓
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">1. Order Reservation & PNR Creation</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">COMPLETED</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Booking PNR issued via GDS API. Seat / Cabin credentials allocated and confirmed.
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">Timestamp: 2026-08-01 01:10 UTC</span>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-lg shadow-emerald-500/20">
                  ✓
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">2. Payment Merchant Clearance & Settlement</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">COMPLETED</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Merchant gateway authorization successful. Digital invoice & QR E-Ticket generated.
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">Transaction Ref: TXN-AIR-9921004</span>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-lg shadow-emerald-500/20">
                  ✓
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">3. Port Customs & Maritime Insurance Verification</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">COMPLETED</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Immigration pre-clearance completed. Underwriter policy attached: POL-AIR-3301.
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">Customs Clearance Stamp: CUST-IMO-889410</span>
                </div>
              </div>

              {/* Milestone 4 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-lg shadow-sky-500/20 animate-pulse">
                  🚢
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sky-300 text-sm">4. Departed Departure Terminal & Live Seaway / Flight Transit</span>
                    <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-mono">IN PROGRESS</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Vessel / Aircraft currently cruising in open seaway channel. Satellite GPS: Lat 18°57'N, Lng 72°50'E.
                  </p>
                  <span className="text-[10px] text-sky-400 font-mono block">Sailing Speed: 22.4 Knots | Sea Condition: Calm Swell (1.2m)</span>
                </div>
              </div>

              {/* Milestone 5 */}
              <div className="relative opacity-60">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs">
                  5
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-400 text-sm">5. Destination Berth / Gate Arrival & Luggage Claim</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">SCHEDULED</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Estimated Time of Arrival: 2026-08-12 14:00 UTC (ETA Countdown: 18h 45m).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKING CALENDAR VIEW */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>VOYAGE DEPARTURE CALENDAR & SEAT AVAILABILITY SCHEDULE</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">Interactive Cruise Departure Calendar</h2>
              </div>

              {/* Month Selector Buttons */}
              <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {[
                  { key: '2026-08', label: 'August 2026' },
                  { key: '2026-09', label: 'September 2026' },
                  { key: '2026-10', label: 'October 2026' },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setCalendarMonth(m.key as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calendarMonth === m.key
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Grid (2 cols) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-extrabold text-base text-white">
                  {calendarMonth === '2026-08' ? 'August 2026 Schedule' : calendarMonth === '2026-09' ? 'September 2026 Schedule' : 'October 2026 Schedule'}
                </span>
                <span className="text-xs text-slate-400">Click any date to inspect available cruises</span>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 pb-2 border-b border-slate-800/60">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>

              {/* Month Days Grid */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateStr = `${calendarMonth}-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                  const hasVoyage = Boolean(scheduledVoyagesMap[dateStr]);
                  const isSelected = selectedCalendarDate === dateStr;

                  return (
                    <div
                      key={dateStr}
                      onClick={() => setSelectedCalendarDate(dateStr)}
                      className={`min-h-[70px] p-2 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 shadow-lg shadow-cyan-500/20 text-white'
                          : hasVoyage
                          ? 'bg-teal-950/40 border-teal-500/40 hover:border-teal-400 text-white'
                          : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`font-mono text-xs ${isSelected ? 'font-black text-cyan-300' : 'font-bold'}`}>
                          {dayNum}
                        </span>
                        {hasVoyage && (
                          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                        )}
                      </div>

                      {hasVoyage ? (
                        <div className="mt-1 space-y-0.5">
                          <span className="text-[9px] bg-teal-500/20 text-teal-300 font-bold px-1 rounded block truncate">
                            {scheduledVoyagesMap[dateStr][0].flag} {scheduledVoyagesMap[dateStr][0].port}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[9px] text-slate-600 block">Standard</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Date Details Panel (1 col) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Voyages for {selectedCalendarDate}</span>
                  </h3>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">
                    {scheduledVoyagesMap[selectedCalendarDate] ? 'Scheduled' : 'Open Charter'}
                  </span>
                </div>

                {scheduledVoyagesMap[selectedCalendarDate] ? (
                  <div className="space-y-3">
                    {scheduledVoyagesMap[selectedCalendarDate].map((v, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-teal-500/30 rounded-xl space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{v.flag}</span>
                          <div>
                            <div className="font-extrabold text-sm text-white">{v.title}</div>
                            <div className="text-[10px] text-teal-400">Departure Port: {v.port}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                          <span className="text-slate-400">Available Seats:</span>
                          <span className="font-mono text-emerald-400 font-bold">{v.seatsLeft} Vacancies</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-2">
                    <Palmtree className="w-8 h-8 text-slate-600 mx-auto" />
                    <div className="font-bold text-xs text-slate-300">No Scheduled Public Cruise on This Date</div>
                    <p className="text-[10px] text-slate-500">
                      Private yacht charter & custom island transfers are available for booking.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setTravelDate(selectedCalendarDate);
                  setActiveTab('booking');
                }}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
              >
                <span>SELECT THIS DATE & PROCEED TO BOOK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BOOKING STATUS TRACKING VIEW */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase">
                  <Clock className="w-4 h-4" />
                  <span>REAL-TIME MARITIME TRACKING ENGINE (PNR & B/L)</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">Live Passenger & Cargo Status Tracker</h2>
              </div>

              {/* Category Switcher: Ticket vs Cargo B/L */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setTrackingCategoryTab('passenger')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    trackingCategoryTab === 'passenger'
                      ? 'bg-sky-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Passenger PNR Tracker</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTrackingCategoryTab('cargo')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    trackingCategoryTab === 'cargo'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Cargo B/L Freight Tracker</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              {trackingCategoryTab === 'cargo'
                ? 'Enter Bill of Lading reference (e.g. BL-IND-884910-2026 or BL-SG-992102-2026) to view vessel position, TEU status, and port customs milestones.'
                : 'Enter your PNR code (e.g. OB-77401-2026 or OB-88219-2026) to view immigration clearance, seat allocation, and live vessel gate status.'}
            </p>
          </div>

          {trackingCategoryTab === 'cargo' ? (
            /* CARGO B/L TRACKER */
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Enter Bill of Lading B/L Reference (e.g. BL-IND-884910-2026)..."
                    value={cargoSearchInput}
                    onChange={(e) => setCargoSearchInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-10 pr-4 py-3 rounded-xl font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  onClick={handleTrackCargoSearch}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>TRACK CARGO SHIPMENT</span>
                </button>
              </div>

              {trackedCargoBooking ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-8 shadow-xl">
                  {/* Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span>Bill of Lading:</span>
                        <span className="font-mono font-bold text-amber-400 text-sm">{trackedCargoBooking.billOfLading}</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-white mt-1">{trackedCargoBooking.cargoCategory}</h3>
                      <div className="text-xs text-slate-400 flex items-center space-x-3 mt-1">
                        <span>Shipper: <strong className="text-white">{trackedCargoBooking.consignorName} ({trackedCargoBooking.consignorCompany})</strong></span>
                        <span>•</span>
                        <span>Consignee: <strong className="text-amber-300">{trackedCargoBooking.consigneeName}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs rounded-full border border-amber-500/40 flex items-center space-x-1.5 font-mono">
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span>STATUS: {trackedCargoBooking.trackingStatus || 'ONBOARD_VESSEL'}</span>
                      </span>
                    </div>
                  </div>

                  {/* 6-Stage Cargo Milestone Timeline */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ocean Cargo Transport Milestone Progress</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                      {[
                        { step: 1, title: 'B/L Manifested', code: 'MANIFESTED', active: true },
                        { step: 2, title: 'Port Gate Entry', code: 'PORT_GATE_IN', active: ['PORT_GATE_IN', 'ONBOARD_VESSEL', 'IN_TRANSIT', 'CUSTOMS_CLEARANCE', 'DELIVERED'].includes(trackedCargoBooking.trackingStatus || 'ONBOARD_VESSEL') },
                        { step: 3, title: 'Onboard Vessel', code: 'ONBOARD_VESSEL', active: ['ONBOARD_VESSEL', 'IN_TRANSIT', 'CUSTOMS_CLEARANCE', 'DELIVERED'].includes(trackedCargoBooking.trackingStatus || 'ONBOARD_VESSEL') },
                        { step: 4, title: 'In Transit Ocean', code: 'IN_TRANSIT', active: ['IN_TRANSIT', 'CUSTOMS_CLEARANCE', 'DELIVERED'].includes(trackedCargoBooking.trackingStatus || 'ONBOARD_VESSEL') },
                        { step: 5, title: 'Customs Clear', code: 'CUSTOMS_CLEARANCE', active: ['CUSTOMS_CLEARANCE', 'DELIVERED'].includes(trackedCargoBooking.trackingStatus || 'ONBOARD_VESSEL') },
                        { step: 6, title: 'Consignee Delivery', code: 'DELIVERED', active: trackedCargoBooking.trackingStatus === 'DELIVERED' },
                      ].map((s) => (
                        <div
                          key={s.step}
                          className={`p-3 rounded-xl border text-xs space-y-1 ${
                            s.active
                              ? 'bg-amber-950/60 border-amber-500/50 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                              {s.step}
                            </span>
                            {s.active && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                          </div>
                          <div className="font-bold text-[11px] text-white pt-1">{s.title}</div>
                          <div className="text-[9px] text-slate-400 font-mono truncate">{s.code}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cargo Technical Specs Card */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">Vessel Name & Route</div>
                      <div className="font-bold text-white text-xs">{trackedCargoBooking.vesselName}</div>
                      <div className="text-amber-400 text-[10px]">{trackedCargoBooking.originPort} → {trackedCargoBooking.destinationPort}</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">Cargo Weight & Volume</div>
                      <div className="font-bold text-emerald-400 font-mono text-xs">{trackedCargoBooking.cargoWeightTons} Metric Tons</div>
                      <div className="text-slate-400 text-[10px]">{trackedCargoBooking.cargoVolumeCbm} CBM Volume</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">Customs & Cold Chain</div>
                      <div className="font-mono font-bold text-sky-400 text-xs truncate">{trackedCargoBooking.customsDeclarationCode || 'CUST-VERIFIED'}</div>
                      <div className="text-teal-400 text-[10px]">
                        {trackedCargoBooking.temperatureSettingC !== undefined ? `Reefer Temp: ${trackedCargoBooking.temperatureSettingC}°C` : 'IMO Compliant'}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="text-slate-500 text-[10px]">Total Ocean Freight Fee</div>
                      <div className="text-lg font-black text-amber-400 font-mono">${trackedCargoBooking.totalFreightFeeUSD} USD</div>
                      <button
                        onClick={() => setBillOfLadingModal(trackedCargoBooking)}
                        className="mt-2 w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all flex items-center justify-center space-x-1"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>VIEW B/L DOCUMENT</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 space-y-2">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <div className="font-bold text-sm">No Cargo Record Found</div>
                  <p className="text-xs text-slate-500">Please check your Bill of Lading (B/L) reference number.</p>
                </div>
              )}
            </div>
          ) : (
            /* PASSENGER PNR TRACKER */
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Enter PNR or Booking Reference (e.g. OB-77401-2026)..."
                    value={pnrSearchInput}
                    onChange={(e) => setPnrSearchInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-10 pr-4 py-3 rounded-xl font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  onClick={handleTrackPnrSearch}
                  className="w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>TRACK PASSENGER PNR</span>
                </button>
              </div>

              {trackedBooking ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-8 shadow-xl">
                  {/* Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span>PNR Reference:</span>
                        <span className="font-mono font-bold text-sky-400 text-sm">{trackedBooking.pnr}</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-white mt-1">{trackedBooking.packageOrVesselTitle}</h3>
                      <div className="text-xs text-slate-400 flex items-center space-x-3 mt-1">
                        <span>Lead Passenger: <strong className="text-white">{trackedBooking.passengerName}</strong></span>
                        <span>•</span>
                        <span>Date: <strong className="text-amber-300">{trackedBooking.travelDate}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-full border border-emerald-500/40 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{trackedBooking.paymentStatus}</span>
                      </span>

                      <button
                        onClick={() => setQrBoardingPassModalBooking(trackedBooking)}
                        className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center space-x-1 shadow-md"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>QR BOARDING PASS</span>
                      </button>
                    </div>
                  </div>

                  {/* 5-Stage Visual Progress Tracker */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Voyage Boarding Progress Timeline</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {[
                        { step: 1, title: 'Payment Verified', sub: 'Invoice Completed', active: true },
                        { step: 2, title: 'Immigration Clearance', sub: 'Port Security Approved', active: true },
                        { step: 3, title: 'Cabin Allocated', sub: `Seats: ${trackedBooking.seatNumbers?.join(', ') || 'DECK-B'}`, active: true },
                        { step: 4, title: 'QR Boarding Pass', sub: 'Pass Active', active: true },
                        { step: 5, title: 'Vessel Boarding', sub: 'Gate 4 Open', active: trackedBooking.paymentStatus === 'COMPLETED' },
                      ].map((s) => (
                        <div
                          key={s.step}
                          className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                            s.active
                              ? 'bg-sky-950/60 border-sky-500/50 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="w-5 h-5 rounded-full bg-sky-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                              {s.step}
                            </span>
                            {s.active && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                          </div>
                          <div className="font-bold text-xs text-white pt-1">{s.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{s.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Voyage & Port Gate Details Card */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">Departure Terminal & Port</div>
                      <div className="font-bold text-white text-xs">{trackedBooking.departurePort}</div>
                      <div className="text-sky-400 text-[10px]">Boarding Gate 4 • Pier 2</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">Seating & Cabin Class</div>
                      <div className="font-bold text-amber-300 text-xs">{trackedBooking.cabinClass}</div>
                      <div className="text-slate-400 text-[10px]">Seats: {trackedBooking.seatNumbers?.join(', ')}</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">Digital Verification Token</div>
                      <div className="font-mono font-bold text-emerald-400 text-xs truncate">{trackedBooking.qrToken || 'OB-QR-VERIFIED'}</div>
                      <div className="text-slate-400 text-[10px]">256-Bit IMO Security Signed</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 space-y-2">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <div className="font-bold text-sm">No Booking Found</div>
                  <p className="text-xs text-slate-500">Please enter a valid PNR number or search standard mock booking.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: BOOKING HISTORY TABLE VIEW */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
                  <FileText className="w-4 h-4" />
                  <span>MARITIME TICKET & CARGO FREIGHT AUDIT TRAIL</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">Booking & Freight Manifest History</h2>
              </div>

              <div className="flex items-center space-x-2">
                {/* Category Switcher: Passenger Tickets vs Cargo B/L */}
                <div className="flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setHistoryCategoryTab('passenger')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      historyCategoryTab === 'passenger'
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Passenger ({confirmedBookings.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHistoryCategoryTab('cargo')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      historyCategoryTab === 'cargo'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Cargo B/L ({confirmedCargoBookings.length})</span>
                  </button>
                </div>

                <button
                  onClick={exportBookingsToCSV}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-2 shrink-0 border border-slate-700"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>EXPORT CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder={
                  historyCategoryTab === 'cargo'
                    ? "Search cargo by B/L number, shipper, consignee, or vessel..."
                    : "Search passenger by name, PNR, email, or package title..."
                }
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {(['All', 'COMPLETED', 'PENDING', 'PROCESSING'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setHistoryStatusFilter(status)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    historyStatusFilter === status
                      ? historyCategoryTab === 'cargo' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          {historyCategoryTab === 'cargo' ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">B/L Reference</th>
                    <th className="p-4">Shipper & Consignee</th>
                    <th className="p-4">Cargo & Category</th>
                    <th className="p-4">Weight / Volume</th>
                    <th className="p-4">Origin & Destination</th>
                    <th className="p-4 text-right">Freight Charge</th>
                    <th className="p-4 text-center">Bill of Lading</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {confirmedCargoBookings.length > 0 ? (
                    confirmedCargoBookings.map((c: any) => (
                      <tr key={c.billOfLadingNo} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-amber-400">{c.billOfLadingNo}</div>
                          <div className="text-[10px] text-slate-500">ID: {c.cargoBookingId}</div>
                        </td>

                        <td className="p-4 font-sans">
                          <div className="font-bold text-white">{c.consignorName}</div>
                          <div className="text-[10px] text-slate-400">To: {c.consigneeName} ({c.consigneeCompany})</div>
                        </td>

                        <td className="p-4 font-sans">
                          <div className="font-bold text-slate-200">{c.cargoCategory}</div>
                          <div className="text-[10px] text-amber-400 font-mono">{c.vesselName}</div>
                        </td>

                        <td className="p-4 font-sans">
                          <div className="font-bold text-emerald-400 font-mono">{c.cargoWeightTons} Tons</div>
                          <div className="text-[10px] text-slate-400">{c.cargoVolumeCbm} CBM</div>
                        </td>

                        <td className="p-4 font-sans">
                          <div className="font-bold text-slate-300">{c.originPort}</div>
                          <div className="text-[10px] text-teal-400">→ {c.destinationPort}</div>
                        </td>

                        <td className="p-4 text-right font-black text-amber-400 text-sm">
                          ${c.totalFreightUSD} <span className="text-[10px] text-slate-500 font-normal">USD</span>
                        </td>

                        <td className="p-4 text-center font-sans">
                          <button
                            onClick={() => setBillOfLadingModal(c)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-[11px] font-bold transition-all border border-slate-700 flex items-center space-x-1 mx-auto"
                          >
                            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                            <span>View B/L</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 font-sans">
                        No cargo freight bookings recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">PNR & Booking ID</th>
                    <th className="p-4">Passenger Details</th>
                    <th className="p-4">Package / Cruise Route</th>
                    <th className="p-4">Travel Date & Cabin</th>
                    <th className="p-4 text-right">Total Fare</th>
                    <th className="p-4">Payment Status</th>
                    <th className="p-4 text-center">Receipt & Pass</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((b) => (
                      <tr key={b.bookingId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-sky-400">{b.pnr}</div>
                          <div className="text-[10px] text-slate-500">{b.bookingId}</div>
                        </td>

                        <td className="p-4 font-sans">
                          <div className="font-bold text-white">{b.passengerName}</div>
                          <div className="text-[10px] text-slate-400">{b.email} • {b.passportOrGovtId}</div>
                        </td>

                        <td className="p-4 font-sans">
                          <div className="font-bold text-slate-200 line-clamp-1">{b.packageOrVesselTitle}</div>
                          <div className="text-[10px] text-teal-400">{b.departurePort}</div>
                        </td>

                        <td className="p-4 font-sans">
                          <div className="font-bold text-amber-300">{b.travelDate}</div>
                          <div className="text-[10px] text-slate-400">{b.cabinClass} ({b.passengerCount} Guest)</div>
                        </td>

                        <td className="p-4 text-right font-black text-emerald-400 text-sm">
                          ${b.totalFareUSD} <span className="text-[10px] text-slate-500 font-normal">USD</span>
                        </td>

                        <td className="p-4 font-sans">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              b.paymentStatus === 'COMPLETED'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            {b.paymentStatus}
                          </span>
                        </td>

                        <td className="p-4 text-center font-sans">
                          <button
                            onClick={() => setReceiptModalBooking(b)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-[11px] font-bold transition-all border border-slate-700 flex items-center space-x-1 mx-auto"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>View Ticket</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 font-sans">
                        No ticket bookings found matching search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: AGENT TIE-UP & B2B INQUIRY LOGIC */}
      {activeTab === 'agent-tieup' && (
        <div className="space-y-8">
          {/* Overview Banner */}
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-2xl p-6 text-white space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>OFFICIAL EASTMAN CREATION B2B AGENT & OPERATOR TIE-UP PORTAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Become an Authorized Ocean Bird Booking Partner & GDS Agent
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Travel agencies, tour operators, cruise aggregators, and charter fleets can tie up with Ocean Bird to access wholesale group rates, receive up to <strong>15% commission</strong> per booking, and integrate our REST GDS Booking API.
            </p>

            {/* B2B Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                  <Percent className="w-4 h-4" />
                  <span>15% Commission</span>
                </div>
                <p className="text-[11px] text-slate-400">Automated B2B payout per guest ticket issued.</p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                  <Code className="w-4 h-4" />
                  <span>REST GDS Booking API</span>
                </div>
                <p className="text-[11px] text-slate-400">Direct API integration for your agency website or mobile app.</p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                  <Ship className="w-4 h-4" />
                  <span>Bulk Allotments</span>
                </div>
                <p className="text-[11px] text-slate-400">Hold up to 50 cabin seats with flexible 72-hour hold periods.</p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                  <span>White-Label Tickets</span>
                </div>
                <p className="text-[11px] text-slate-400">Boarding passes styled with your agency logo & brand name.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column (2 cols) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Submit Agency Tie-Up Application</span>
                </h3>
                <span className="text-xs text-amber-300 font-bold">Instant Auto-Approval</span>
              </div>

              <form onSubmit={handleAgentInquirySubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Travel Agency / Company Name</label>
                    <input
                      type="text"
                      required
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Operator Type</label>
                    <select
                      value={agencyType}
                      onChange={(e) => setAgencyType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
                    >
                      <option value="Tour Operator">Tour Operator</option>
                      <option value="Travel Agency">Travel Agency</option>
                      <option value="Cruise Aggregator">Cruise Aggregator</option>
                      <option value="Charter Fleet Operator">Charter Fleet Operator</option>
                      <option value="Hotel & Resort Group">Hotel & Resort Group</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Contact Person Name</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Business Email</label>
                    <input
                      type="email"
                      required
                      value={agentEmail}
                      onChange={(e) => setAgentEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={agentPhone}
                      onChange={(e) => setAgentPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Country of Operation</label>
                    <input
                      type="text"
                      required
                      value={agentCountry}
                      onChange={(e) => setAgentCountry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Monthly Passenger Volume</label>
                    <select
                      value={monthlyVolume}
                      onChange={(e) => setMonthlyVolume(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
                    >
                      <option value="50 - 100 passengers">50 - 100 passengers</option>
                      <option value="100 - 250 passengers">100 - 250 passengers</option>
                      <option value="250 - 500 passengers">250 - 500 passengers</option>
                      <option value="1000+ passengers">1000+ passengers</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Preferred Tie-Up Type</label>
                    <select
                      value={preferredTieUp}
                      onChange={(e) => setPreferredTieUp(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
                    >
                      <option value="B2B Commission Agent">B2B Commission Agent</option>
                      <option value="GDS API Integration">GDS API Integration</option>
                      <option value="Bulk Allotment Purchase">Bulk Allotment Purchase</option>
                      <option value="White Label Booking Portal">White Label Booking Portal</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Additional Partnership Requirements / Notes</label>
                  <textarea
                    rows={2}
                    value={agentNotes}
                    onChange={(e) => setAgentNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  {isSubmittingInquiry ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>SUBMIT PARTNERSHIP APPLICATION & GENERATE API KEY</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Approved Partners List (1 col) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Active B2B Partners ({agentPartnersList.length})</span>
              </h3>

              <div className="space-y-3">
                {agentPartnersList.map((partner) => (
                  <div key={partner.inquiryId} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{partner.agencyName}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">APPROVED</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Agent Code: <strong className="text-amber-300 font-mono">{partner.agentCode}</strong></span>
                      <span>Comm: <strong className="text-emerald-400">{partner.commissionRatePercent}%</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: MARITIME INSURANCE VIEW */}
      {activeTab === 'insurance' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>HIGH-SEA TOURIST & SEAFARER INSURANCE UNDERWRITING</span>
            </div>
            <h2 className="text-xl font-bold text-white">Issue Maritime Travel Protection Policy</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleIssuePolicy} className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <h3 className="font-bold text-base text-white border-b border-slate-800 pb-2">Policy Issue Form</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Select Protection Plan</label>
                  <select
                    value={selectedInsurancePlan.id}
                    onChange={(e) => {
                      const found = MARITIME_INSURANCE_PLANS.find((p) => p.id === e.target.value);
                      if (found) setSelectedInsurancePlan(found);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-emerald-300 font-bold focus:outline-none"
                  >
                    {MARITIME_INSURANCE_PLANS.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.planName} — Limit: ${plan.coverageLimitUSD.toLocaleString()} ($
                        {plan.dailyPremiumUSD}/day)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Insured Full Name</label>
                    <input
                      type="text"
                      required
                      value={insuredPersonName}
                      onChange={(e) => setInsuredPersonName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Passport / Govt ID</label>
                    <input
                      type="text"
                      required
                      value={insuredGovtId}
                      onChange={(e) => setInsuredGovtId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Coverage Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={policyDays}
                    onChange={(e) => setPolicyDays(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
                >
                  ISSUE INSURANCE POLICY (${selectedInsurancePlan.dailyPremiumUSD * policyDays} USD)
                </button>
              </div>
            </form>

            {/* Issued Policies Column */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <h3 className="font-bold text-base border-b border-slate-800 pb-2">Issued Marine Policies</h3>
              <div className="space-y-3">
                {issuedPolicies.map((pol) => (
                  <div key={pol.policyNumber} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-300 font-mono">{pol.policyNumber}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">ACTIVE</span>
                    </div>
                    <div className="font-bold text-white">{pol.insuredPersonName}</div>
                    <div className="text-[10px] text-slate-400">Cover: ${pol.coverageLimitUSD.toLocaleString()} USD</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TICKET RECEIPT PREVIEW MODAL */}
      {receiptModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white space-y-6 shadow-2xl relative">
            <button
              onClick={() => setReceiptModalBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-950"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-center space-x-2 text-teal-400 font-bold text-xs uppercase">
                <Ship className="w-4 h-4" />
                <span>OCEAN BIRD DIGITAL BOARDING PASS & RECEIPT</span>
              </div>
              <h3 className="text-xl font-black text-white">{receiptModalBooking.packageOrVesselTitle}</h3>
              <p className="text-xs text-slate-400 font-mono">PNR: {receiptModalBooking.pnr}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Passenger Name:</span>
                <span className="font-bold text-white">{receiptModalBooking.passengerName}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Passport / Govt ID:</span>
                <span className="font-mono text-slate-300">{receiptModalBooking.passportOrGovtId}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Travel Date & Cabin:</span>
                <span className="font-bold text-amber-300">{receiptModalBooking.travelDate} ({receiptModalBooking.cabinClass})</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Departure Port:</span>
                <span className="font-bold text-teal-400">{receiptModalBooking.departurePort}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Total Paid Amount:</span>
                <span className="text-xl font-black text-emerald-400 font-mono">${receiptModalBooking.totalFareUSD} USD</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-700 flex items-center justify-between">
              <QrCode className="w-16 h-16 text-slate-950 shrink-0" />
              <div className="text-right text-slate-950 font-mono text-[10px] space-y-0.5">
                <div className="font-bold text-xs">VERIFIED DIGITAL PASS</div>
                <div>{receiptModalBooking.qrToken || 'OB-QR-VERIFIED'}</div>
                <div className="text-emerald-700 font-bold">256-Bit IMO IMO Security</div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT RECEIPT / BOARDING PASS</span>
            </button>
          </div>
        </div>
      )}

      {/* BILL OF LADING MODAL PREVIEW */}
      {billOfLadingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 text-white space-y-5 shadow-2xl relative">
            <button
              onClick={() => setBillOfLadingModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-950"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                <Box className="w-4 h-4" />
                <span>OFFICIAL OCEAN BIRD MARITIME FREIGHT — BILL OF LADING (B/L)</span>
              </div>
              <h3 className="text-xl font-black text-amber-400 font-mono">{(billOfLadingModal as any).billOfLadingNo || (billOfLadingModal as any).billOfLading}</h3>
              <p className="text-xs text-slate-400">IMO Security Seal • Custom Clearance Code: {(billOfLadingModal as any).customsCode || 'CUST-OK-2026'}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-teal-400 font-bold uppercase">Shipper / Consignor</div>
                <div className="font-bold text-white">{billOfLadingModal.consignorName}</div>
                <div className="text-[10px] text-slate-400">{billOfLadingModal.consignorCompany}</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-amber-400 font-bold uppercase">Consignee / Destination</div>
                <div className="font-bold text-white">{billOfLadingModal.consigneeName}</div>
                <div className="text-[10px] text-slate-400">{billOfLadingModal.consigneeCompany}</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Cargo Category:</span>
                <span className="font-bold text-amber-300">{billOfLadingModal.cargoCategory}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Weight & Volume:</span>
                <span className="font-bold text-emerald-400 font-mono">{billOfLadingModal.cargoWeightTons} Tons / {billOfLadingModal.cargoVolumeCbm} CBM</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Origin & Destination Ports:</span>
                <span className="font-bold text-slate-200">{billOfLadingModal.originPort} → {billOfLadingModal.destinationPort}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Vessel & Departure:</span>
                <span className="font-bold text-teal-400">{billOfLadingModal.vesselName} ({billOfLadingModal.departureDate})</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Total Freight Charges:</span>
                <span className="text-xl font-black text-amber-400 font-mono">${(billOfLadingModal as any).totalFreightUSD || (billOfLadingModal as any).totalFreightFeeUSD} USD</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-700 flex items-center justify-between">
              <QrCode className="w-16 h-16 text-slate-950 shrink-0" />
              <div className="text-right text-slate-950 font-mono text-[10px] space-y-0.5">
                <div className="font-bold text-xs">VERIFIED B/L MANIFEST</div>
                <div>{(billOfLadingModal as any).billOfLadingNo || (billOfLadingModal as any).billOfLading}</div>
                <div className="text-amber-700 font-bold">Port Gate Security Clearance OK</div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT OFFICIAL BILL OF LADING (B/L)</span>
            </button>
          </div>
        </div>
      )}

      {/* DEDICATED QR BOARDING PASS MODAL */}
      {qrBoardingPassModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 text-white space-y-5 shadow-2xl relative">
            <button
              onClick={() => setQrBoardingPassModalBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-950"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
                <QrCode className="w-4 h-4" />
                <span>OFFICIAL DIGITAL QR BOARDING PASS</span>
              </div>
              <h3 className="text-2xl font-black text-emerald-400 font-mono tracking-wider">{qrBoardingPassModalBooking.pnr}</h3>
              <p className="text-xs text-slate-400">IMO Security Signed • Gate Boarding Verified</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Passenger Name</div>
                <div className="font-bold text-white text-sm">{qrBoardingPassModalBooking.passengerName}</div>
                <div className="text-[10px] text-teal-400">{qrBoardingPassModalBooking.passportOrGovtId || 'ID VERIFIED'}</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Cabin Class & Seats</div>
                <div className="font-bold text-amber-300 text-sm">{qrBoardingPassModalBooking.cabinClass}</div>
                <div className="text-[10px] text-slate-300 font-mono">Seats: {qrBoardingPassModalBooking.seatNumbers?.join(', ') || 'VIP-DECK'}</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Cruise / Voyage Vessel:</span>
                <span className="font-bold text-white">{qrBoardingPassModalBooking.packageOrVesselTitle}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Departure Terminal:</span>
                <span className="font-bold text-sky-400">{qrBoardingPassModalBooking.departurePort} (Gate 4 • Pier 2)</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Travel Date & Time:</span>
                <span className="font-bold text-amber-300 font-mono">{qrBoardingPassModalBooking.travelDate} (08:30 AM IST)</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Verification Status:</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  IMMIGRATION CLEARED
                </span>
              </div>
            </div>

            {/* Visual QR Barcode Box */}
            <div className="bg-white p-4 rounded-xl border border-slate-700 flex items-center justify-between">
              <QrCode className="w-20 h-20 text-slate-950 shrink-0" />
              <div className="text-right text-slate-950 font-mono text-xs space-y-1">
                <div className="font-black text-sm text-slate-900">OCEAN BIRD EXPRESS PASS</div>
                <div className="text-[11px] font-bold text-slate-700">{qrBoardingPassModalBooking.qrToken || 'OB-QR-PASS-VERIFIED'}</div>
                <div className="text-emerald-700 font-extrabold text-[10px]">SCAN AT PORT GATE 4</div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT DIGITAL BOARDING PASS</span>
            </button>
          </div>
        </div>
      )}

      {/* BULK CARGO FREIGHT ESTIMATOR MODAL */}
      {isBulkEstimatorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsBulkEstimatorOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-950"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                <Calculator className="w-4 h-4" />
                <span>BULK MARITIME FREIGHT CALCULATOR & VOLUME ESTIMATOR</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">Interactive Ocean Freight Cost Estimator</h3>
              <p className="text-xs text-slate-400">
                Calculate real-time B2B ocean shipping estimates with volume tier discounts and value-added freight handling fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Form Controls Column */}
              <div className="space-y-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Cargo Category & Handling Type</label>
                  <select
                    value={estimatorCategory}
                    onChange={(e) => setEstimatorCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="Dry Container (20ft/40ft TEU)">Dry Container (20ft/40ft TEU)</option>
                    <option value="Reefer Cold Chain Container">Reefer Cold Chain Container</option>
                    <option value="Hazardous Chemicals (IMO Class)">Hazardous Chemicals (IMO Class)</option>
                    <option value="Heavy Machinery & Breakbulk">Heavy Machinery & Breakbulk</option>
                    <option value="Automobile RoRo">Automobile RoRo Transport</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-300">Container Volume (TEUs):</label>
                    <span className="font-mono font-bold text-amber-400 text-sm">{estimatorTeuCount} TEU</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={estimatorTeuCount}
                    onChange={(e) => setEstimatorTeuCount(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                    <span>1 TEU (Standard)</span>
                    <span>10 TEU (18% Off)</span>
                    <span>50 TEU (25% Off)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-300">Total Cargo Weight (Metric Tons):</label>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{estimatorWeightTons} Tons</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="1000"
                    step="5"
                    value={estimatorWeightTons}
                    onChange={(e) => setEstimatorWeightTons(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Origin Port</label>
                    <input
                      type="text"
                      value={estimatorOriginPort}
                      onChange={(e) => setEstimatorOriginPort(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Destination Port</label>
                    <input
                      type="text"
                      value={estimatorDestPort}
                      onChange={(e) => setEstimatorDestPort(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Service Checkboxes */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="font-bold text-slate-400 text-[11px]">Surcharges & Terminal Services:</div>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addColdChain}
                      onChange={(e) => setAddColdChain(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>Cold Chain Temperature Monitoring (+$250/TEU)</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addHazmatClearance}
                      onChange={(e) => setAddHazmatClearance(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>IMO Hazmat Customs Escort Seal (+$400/TEU)</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addHeavyLiftCrane}
                      onChange={(e) => setAddHeavyLiftCrane(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>Heavy Crane & Breakbulk Crane Rigging (+$500/TEU)</span>
                  </label>

                  <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addFastTrack}
                      onChange={(e) => setAddFastTrack(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>Fast-Track Express Ocean Voyage (+$350/TEU)</span>
                  </label>
                </div>
              </div>

              {/* Estimate Calculation Breakdown Column */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3 font-mono text-xs">
                  <div className="font-bold text-amber-400 text-sm border-b border-slate-800 pb-2 flex items-center justify-between">
                    <span>Freight Summary</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-sans">
                      {estBulkDiscountPercent > 0 ? `${estBulkDiscountPercent}% BULK SAVINGS` : 'STANDARD TIER'}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Base Ocean Freight ({estimatorTeuCount} TEU):</span>
                    <span>${estBaseOceanFreight.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Weight Tonnage Surcharge ({estimatorWeightTons} T):</span>
                    <span>${estWeightCharge.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Surcharges & Special Services:</span>
                    <span>
                      ${(estColdChainFee + estHazmatFee + estHeavyLiftFee + estFastTrackFee).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                    <span>Gross Subtotal:</span>
                    <span>${estGrossTotalUSD.toLocaleString()}</span>
                  </div>

                  {estDiscountAmountUSD > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Volume Bulk Discount ({estBulkDiscountPercent}%):</span>
                      <span>-${estDiscountAmountUSD.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="p-3 bg-slate-900 border border-amber-500/40 rounded-xl space-y-1 mt-4">
                    <div className="text-[10px] text-slate-400 font-sans">NET ESTIMATED FREIGHT COST</div>
                    <div className="text-2xl font-black text-amber-400">${estNetFreightTotalUSD.toLocaleString()} USD</div>
                    <div className="text-[10px] text-teal-400 font-sans">Includes Port Handling & IMO Security Clearance</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={applyEstimatorToBooking}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>APPLY ESTIMATE TO CARGO BOOKING</span>
                  </button>

                  <button
                    onClick={() => setIsBulkEstimatorOpen(false)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-bold rounded-xl text-xs border border-slate-800"
                  >
                    Close Estimator
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: PREDICTIVE DELAY TOOL
         ========================================== */}
      {activeTab === 'predictive-delay' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 p-6 rounded-2xl border border-orange-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-orange-400 font-bold text-xs">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <span>AI-POWERED VOYAGE & FLIGHT DELAY FORECASTING MODEL</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Predictive Delay Risk & Reliability Analyzer</h2>
            <p className="text-xs text-slate-300">
              Analyze maritime ocean swells, wind velocity, monsoon indexes, and port congestion to forecast vessel and flight arrival delays with machine learning precision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Input Parameters */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Voyage & Weather Parameters</span>
                <span className="text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded font-mono">LIVE MODEL</span>
              </h3>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Select Voyage / Flight Corridor</label>
                <select
                  value={delaySelectedRoute}
                  onChange={(e) => setDelaySelectedRoute(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-orange-500"
                >
                  <option value="Mumbai Port 🚢 Kochi Transshipment Port">Mumbai Port 🚢 Kochi Transshipment Corridor</option>
                  <option value="Colpetty Malé ⛴️ Addu Atoll Ferry">Colpetty Malé ⛴️ Addu Atoll Express Ferry</option>
                  <option value="Singapore Strait 🚢 Malacca Transshipment Highway">Singapore Strait 🚢 Malacca Transshipment Highway</option>
                  <option value="Chittagong Bay 🚢 Cox's Bazar Coastal Route">Chittagong Bay 🚢 Cox's Bazar Coastal Route</option>
                  <option value="BOM Mumbai (India) ✈️ SIN Changi (Singapore)">BOM Mumbai (India) ✈️ SIN Changi (Singapore) Flight</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Carrier / Vessel Class</label>
                <select
                  value={delayVesselClass}
                  onChange={(e) => setDelayVesselClass(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="High-Speed Cruise Liner">High-Speed Cruise Liner / Fast Craft</option>
                  <option value="Heavy Container Vessel">Heavy Container Cargo Vessel</option>
                  <option value="Inter-Island Fast Ferry">Inter-Island Fast Ferry / Catamaran</option>
                </select>
              </div>

              {/* Slider 1: Swell Height */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="font-bold">Significant Ocean Swell Height:</span>
                  <span className="text-orange-400 font-mono font-bold">{delaySwellHeight} meters</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="7.0"
                  step="0.1"
                  value={delaySwellHeight}
                  onChange={(e) => setDelaySwellHeight(parseFloat(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Slider 2: Wind Speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="font-bold">Surface Wind Speed:</span>
                  <span className="text-orange-400 font-mono font-bold">{delayWindSpeedKnots} knots</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={delayWindSpeedKnots}
                  onChange={(e) => setDelayWindSpeedKnots(parseInt(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Slider 3: Monsoon Index */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="font-bold">Monsoon Squall Index (1-10):</span>
                  <span className="text-amber-400 font-mono font-bold">{delayMonsoonIndex} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={delayMonsoonIndex}
                  onChange={(e) => setDelayMonsoonIndex(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Slider 4: Port Congestion */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="font-bold">Port Pilot & Anchorage Congestion:</span>
                  <span className="text-purple-400 font-mono font-bold">{delayPortCongestionPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={delayPortCongestionPct}
                  onChange={(e) => setDelayPortCongestionPct(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            {/* Right Output Prediction Card */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">PREDICTIVE MODEL FORECAST</span>
                    <h3 className="font-extrabold text-lg text-white">{delaySelectedRoute}</h3>
                  </div>
                  <div className={`px-4 py-2 rounded-xl border text-xs font-black uppercase text-center ${delayMetrics.riskColor}`}>
                    {delayMetrics.riskLevel} DELAY RISK
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block">Forecasted Delay Duration</span>
                    <strong className="text-3xl font-black text-orange-400 font-mono">
                      +{delayMetrics.delayHours} <span className="text-sm font-sans">Hours</span>
                    </strong>
                    <span className="text-[10px] text-slate-400 block">({delayMetrics.roundedDelayMins} minutes cumulative)</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block">On-Time Arrival Probability</span>
                    <strong className="text-3xl font-black text-emerald-400 font-mono">
                      {delayMetrics.onTimeProbPct}%
                    </strong>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                      <div className="bg-emerald-400 h-full transition-all" style={{ width: `${delayMetrics.onTimeProbPct}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Delay Drivers Breakdown */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-300 block">Primary Delay Contributors</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">Weather & Sea Drag:</span>
                      <strong className="text-orange-400 font-mono">{delayMetrics.weatherPct}%</strong>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">Port Anchorage Queue:</span>
                      <strong className="text-purple-400 font-mono">{delayMetrics.congestionPct}%</strong>
                    </div>
                  </div>
                </div>

                {/* AI Operational Recommendation */}
                <div className="p-4 bg-orange-950/40 border border-orange-500/30 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-orange-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Route Optimization Advisory</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {delayMetrics.roundedDelayMins > 120
                      ? 'Severe ocean swell and port backlog detected. Recommending a 12° starboard course adjustment to bypass outer squall, saving an estimated 1.8 hours. Contact harbor pilot for priority berth assignment.'
                      : 'Favorable sailing corridor with minor swell resistance. Standard cruising speed of 22 knots recommended for optimal fuel efficiency and on-time arrival.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: MULTI-CURRENCY CALCULATOR
         ========================================== */}
      {activeTab === 'currency-calc' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <Coins className="w-5 h-5 text-emerald-400" />
              <span>SOUTH ASIAN & GLOBAL MARITIME CURRENCY CONVERTER</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Multi-Currency Fare & Tariff Calculator</h2>
            <p className="text-xs text-slate-300">
              Convert ticket fares, cargo freight rates, and port tariffs instantly across regional South Asian and international maritime currencies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Converter Panel */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 text-xs">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
                Currency Exchange Converter
              </h3>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Amount to Convert</label>
                <input
                  type="number"
                  value={calcSourceAmount}
                  onChange={(e) => setCalcSourceAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-lg font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">From Currency</label>
                  <select
                    value={calcSourceCurrency}
                    onChange={(e) => setCalcSourceCurrency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  >
                    {Object.keys(CURRENCY_RATES).map((code) => (
                      <option key={code} value={code}>
                        {code} - {CURRENCY_RATES[code].name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">To Currency</label>
                  <select
                    value={calcTargetCurrency}
                    onChange={(e) => setCalcTargetCurrency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  >
                    {Object.keys(CURRENCY_RATES).map((code) => (
                      <option key={code} value={code}>
                        {code} - {CURRENCY_RATES[code].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conversion Result Readout Box */}
              <div className="p-5 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-2 text-center">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-mono">CONVERTED RESULT</span>
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  {CURRENCY_RATES[calcTargetCurrency]?.symbol} {convertFromSourceToTarget()} {calcTargetCurrency}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  1 USD = {CURRENCY_RATES[calcTargetCurrency]?.rateUSD} {calcTargetCurrency}
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${convertFromSourceToTarget()} ${calcTargetCurrency}`);
                    setCurrencyCopied(true);
                    setTimeout(() => setCurrencyCopied(false), 2000);
                  }}
                  className="mt-3 w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  {currencyCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{currencyCopied ? 'COPIED TO CLIPBOARD' : 'COPY CONVERSION RESULT'}</span>
                </button>
              </div>

              {/* Custom Rate Override Toggle */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customRateOverride}
                    onChange={(e) => setCustomRateOverride(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Enable Custom B2B Tariff Rate Override</span>
                </label>

                {customRateOverride && (
                  <div className="pt-2">
                    <label className="text-[10px] text-slate-400 block mb-1">Custom Exchange Rate (1 USD = {calcTargetCurrency})</label>
                    <input
                      type="number"
                      step="0.01"
                      value={customRateInput}
                      onChange={(e) => setCustomRateInput(parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right All Currencies Matrix & Fare Cards */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
                  Multi-Currency Fare Conversion Matrix ({calcSourceAmount} {calcSourceCurrency})
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.keys(CURRENCY_RATES).map((code) => {
                    const srcObj = CURRENCY_RATES[calcSourceCurrency] || CURRENCY_RATES['USD'];
                    const amountInUSD = calcSourceAmount / srcObj.rateUSD;
                    const val = calculateConvertedAmount(amountInUSD, code);
                    const currObj = CURRENCY_RATES[code];

                    return (
                      <div key={code} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>{currObj.name}</span>
                          <span className="font-bold text-teal-400">{code}</span>
                        </div>
                        <div className="text-lg font-black text-white font-mono">
                          {currObj.symbol} {val}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sample Ticket Fare Conversions */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
                  Sample Ticket Fares in {calcTargetCurrency}
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">Economy Deck Pass</span>
                      <span className="text-[10px] text-slate-400">Base fare: $120 USD</span>
                    </div>
                    <strong className="text-emerald-400 font-mono text-base">
                      {CURRENCY_RATES[calcTargetCurrency]?.symbol} {calculateConvertedAmount(120, calcTargetCurrency)} {calcTargetCurrency}
                    </strong>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">Royal Deluxe Suite</span>
                      <span className="text-[10px] text-slate-400">Base fare: $850 USD</span>
                    </div>
                    <strong className="text-emerald-400 font-mono text-base">
                      {CURRENCY_RATES[calcTargetCurrency]?.symbol} {calculateConvertedAmount(850, calcTargetCurrency)} {calcTargetCurrency}
                    </strong>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">20ft Container Ocean Freight</span>
                      <span className="text-[10px] text-slate-400">Base rate: $1,450 USD</span>
                    </div>
                    <strong className="text-emerald-400 font-mono text-base">
                      {CURRENCY_RATES[calcTargetCurrency]?.symbol} {calculateConvertedAmount(1450, calcTargetCurrency)} {calcTargetCurrency}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: ROUTE WEATHER OVERLAY
         ========================================== */}
      {activeTab === 'route-weather' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-sky-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs">
              <CloudRain className="w-5 h-5 text-sky-400" />
              <span>LIVE MARITIME METEOROLOGICAL & WAVE OVERLAY</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Route Weather & Sea Condition Overlay</h2>
            <p className="text-xs text-slate-300">
              Inspect real-time wave heights, surface wind knot speeds, storm squalls, and navigation safety advisories across primary maritime corridors.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex-1 max-w-md">
                <label className="text-[10px] text-slate-400 font-mono block mb-1">SELECT MARITIME CORRIDOR</label>
                <select
                  value={selectedWeatherRoute}
                  onChange={(e) => {
                    setSelectedWeatherRoute(e.target.value);
                    setSelectedWaypointIdx(0);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-white focus:border-sky-500"
                >
                  {Object.keys(ROUTE_WEATHER_DATA).map((k) => (
                    <option key={k} value={k}>
                      {ROUTE_WEATHER_DATA[k].corridorName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {(['24h', '48h', '72h'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setWeatherTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      weatherTimeframe === tf ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf} Forecast
                  </button>
                ))}
              </div>
            </div>

            {/* Active Storm Alert Banner if exists */}
            {ROUTE_WEATHER_DATA[selectedWeatherRoute]?.alertMessage && (
              <div className="p-4 bg-rose-950/60 border border-rose-500/50 rounded-xl flex items-center space-x-3 text-rose-300 text-xs font-bold">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-bounce" />
                <span>{ROUTE_WEATHER_DATA[selectedWeatherRoute].alertMessage}</span>
              </div>
            )}

            {/* High-Sea Weather Overview Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center">
                <span className="text-[10px] text-slate-400 block font-mono">WAVE HEIGHT</span>
                <strong className="text-xl font-black text-sky-400 font-mono">
                  {ROUTE_WEATHER_DATA[selectedWeatherRoute]?.waveHeightM} m
                </strong>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center">
                <span className="text-[10px] text-slate-400 block font-mono">WIND VELOCITY</span>
                <strong className="text-xl font-black text-amber-400 font-mono">
                  {ROUTE_WEATHER_DATA[selectedWeatherRoute]?.windKnots} kts
                </strong>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center">
                <span className="text-[10px] text-slate-400 block font-mono">VISIBILITY</span>
                <strong className="text-xl font-black text-emerald-400 font-mono">
                  {ROUTE_WEATHER_DATA[selectedWeatherRoute]?.visibilityNM} NM
                </strong>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center">
                <span className="text-[10px] text-slate-400 block font-mono">SEA TEMP</span>
                <strong className="text-xl font-black text-rose-400 font-mono">
                  {ROUTE_WEATHER_DATA[selectedWeatherRoute]?.seaTempC} °C
                </strong>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block font-mono">RAIN PROBABILITY</span>
                <strong className="text-xl font-black text-indigo-400 font-mono">
                  {ROUTE_WEATHER_DATA[selectedWeatherRoute]?.rainProbPct}%
                </strong>
              </div>
            </div>

            {/* Interactive Waypoint Stepper Cards */}
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-white text-xs uppercase tracking-wider text-slate-300">
                Route Waypoint Conditions ({ROUTE_WEATHER_DATA[selectedWeatherRoute]?.waypoints.length} WAYPOINTS)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ROUTE_WEATHER_DATA[selectedWeatherRoute]?.waypoints.map((wp, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedWaypointIdx(idx)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                      selectedWaypointIdx === idx
                        ? 'bg-slate-950 border-sky-500 shadow-lg shadow-sky-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white text-xs">{wp.name}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                        wp.status === 'Safe Passage' ? 'bg-emerald-500/20 text-emerald-400' :
                        wp.status === 'Cautionary Swell' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>
                        {wp.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono">{wp.latLng}</div>

                    <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800 text-slate-300">
                      <span>Wave: <strong className="text-sky-400">{wp.waveM}m</strong></span>
                      <span>Wind: <strong className="text-amber-400">{wp.windKnots} kts</strong></span>
                    </div>

                    <p className="text-[10px] text-slate-400 italic pt-1">{wp.advisory}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: BULK BOOKING IMPORT
         ========================================== */}
      {activeTab === 'bulk-import' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-pink-950 via-slate-900 to-purple-950 p-6 rounded-2xl border border-pink-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-pink-400 font-bold text-xs">
              <Upload className="w-5 h-5 text-pink-400" />
              <span>CORPORATE & LOGISTICS BULK MANIFEST BATCH IMPORT</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Bulk Passenger & Group Ticket Import Tool</h2>
            <p className="text-xs text-slate-300">
              Batch import CSV or JSON booking files for corporate marine travel, group cruises, and logistics passenger lists with automated field validation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Raw Text Input Area */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-extrabold text-white text-sm">Batch Import Data Payload</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setBulkImportMode('csv')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      bulkImportMode === 'csv' ? 'bg-pink-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    CSV Format
                  </button>
                  <button
                    onClick={() => setBulkImportMode('json')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      bulkImportMode === 'json' ? 'bg-purple-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    JSON Payload
                  </button>
                </div>
              </div>

              <div>
                <textarea
                  rows={12}
                  value={bulkRawText}
                  onChange={(e) => setBulkRawText(e.target.value)}
                  placeholder={bulkImportMode === 'csv' ? 'Paste CSV content here...' : 'Paste JSON array here...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-[11px] focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    setBulkImportMode('csv');
                    setBulkRawText(
`PNR,PassengerName,PassportID,Email,Phone,PackageTitle,TravelDate,Passengers,CabinClass,FareUSD
OB-BLK-1001,Dr. Evelyn Vance,P882910,evelyn@maritime.org,+91 98765 11223,Lakshadweep Coral Atolls Expedition,2026-08-20,2,Royal Deluxe Suite,1250
OB-BLK-1002,Capt. Michael Chang,S940182,chang@singapore.sg,+65 9123 8899,Singapore Marina Yacht Excursion,2026-08-22,1,Business Ocean View,250
OB-BLK-1003,Fatima Al-Mansoori,A774012,fatima@uae.ae,+971 50 123 4567,Maldives Island Hopping Luxury Cruise,2026-08-25,3,Royal Deluxe Suite,1800`
                    );
                  }}
                  className="text-pink-400 hover:underline text-[10px] font-bold flex items-center space-x-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Load Sample Corporate CSV</span>
                </button>

                <button
                  onClick={() => setBulkRawText('')}
                  className="text-slate-400 hover:text-rose-400 text-[10px] font-bold"
                >
                  Clear Editor
                </button>
              </div>
            </div>

            {/* Right Parsed Data Grid & Confirm Button */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-extrabold text-white text-sm">Parsed Batch Manifest Records</h3>
                    <span className="text-[10px] text-slate-400">Automated syntax & email validation log</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold font-mono">
                    {parsedBulkRecords.filter((r) => r.isValid).length} Valid Records
                  </span>
                </div>

                {bulkImportSuccessMsg && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{bulkImportSuccessMsg}</span>
                  </div>
                )}

                {/* Data Grid Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">PNR</th>
                        <th className="p-2.5">Passenger</th>
                        <th className="p-2.5">Passport</th>
                        <th className="p-2.5">Tour / Vessel</th>
                        <th className="p-2.5 text-right">Fare ($)</th>
                        <th className="p-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {parsedBulkRecords.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-500 font-sans text-xs">
                            No batch records parsed. Paste CSV or JSON content in the left editor.
                          </td>
                        </tr>
                      ) : (
                        parsedBulkRecords.map((r) => (
                          <tr key={r.id}>
                            <td className="p-2.5 font-bold text-pink-300">{r.pnr}</td>
                            <td className="p-2.5 text-white font-sans">{r.passengerName}</td>
                            <td className="p-2.5 text-slate-400">{r.passportId}</td>
                            <td className="p-2.5 text-slate-300 font-sans">{r.packageTitle}</td>
                            <td className="p-2.5 text-right text-emerald-400 font-bold">${r.fareUSD}</td>
                            <td className="p-2.5 text-center">
                              {r.isValid ? (
                                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Ready</span>
                              ) : (
                                <span className="text-[9px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold">Invalid</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <button
                  disabled={parsedBulkRecords.filter((r) => r.isValid).length === 0 || isBulkImporting}
                  onClick={handleExecuteBulkImport}
                  className="w-full py-3.5 bg-pink-500 hover:bg-pink-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center space-x-2"
                >
                  {isBulkImporting ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>
                    {isBulkImporting
                      ? 'IMPORTING BATCH RECORDS...'
                      : `EXECUTE BULK IMPORT (${parsedBulkRecords.filter((r) => r.isValid).length} RECORDS)`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: SMART FLEET MANAGER
         ========================================== */}
      {activeTab === 'smart-fleet' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 p-6 rounded-2xl border border-indigo-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs">
              <Ship className="w-5 h-5 text-indigo-400" />
              <span>REAL-TIME TELEMATICS & AUTOMATED VESSEL CONTROL HUB</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Smart Fleet Manager & AIS Telemetry Control</h2>
            <p className="text-xs text-slate-300">
              Monitor live vessel positions, engine health index, throttle modes, fuel consumption, and satellite AIS uplinks across the active maritime fleet.
            </p>
          </div>

          {/* Top Fleet Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">ACTIVE FLEET</span>
              <strong className="text-2xl font-black text-indigo-400 font-mono">{fleetVessels.length} Vessels</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">AVG ENGINE HEALTH</span>
              <strong className="text-2xl font-black text-emerald-400 font-mono">
                {Math.round(fleetVessels.reduce((a, b) => a + b.engineHealthPct, 0) / fleetVessels.length)}%
              </strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">VESSELS IN TRANSIT</span>
              <strong className="text-2xl font-black text-sky-400 font-mono">
                {fleetVessels.filter((v) => v.status === 'In Transit').length}
              </strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">AVG PAX OCCUPANCY</span>
              <strong className="text-2xl font-black text-amber-400 font-mono">
                {Math.round(fleetVessels.reduce((a, b) => a + b.passengerOccupancyPct, 0) / fleetVessels.length)}%
              </strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 font-mono block">AIS SATELLITE LINK</span>
              <strong className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded inline-block mt-1">
                ONLINE (100%)
              </strong>
            </div>
          </div>

          {fleetDiagnosticNotice && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{fleetDiagnosticNotice}</span>
            </div>
          )}

          {/* Vessels Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fleetVessels.map((v) => (
              <div
                key={v.id}
                className={`bg-slate-900 border rounded-2xl p-5 space-y-4 transition-all ${
                  selectedFleetVesselId === v.id ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-white text-base">{v.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{v.flagCountry}</span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 block">{v.vesselCode} • {v.type}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                      v.status === 'In Transit'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : v.status === 'Docked at Berth'
                        ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    ● {v.status}
                  </span>
                </div>

                {/* Telematics Bar Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Cruising Speed:</span>
                      <strong className="text-indigo-400 font-mono">{v.speedKnots} / {v.maxSpeedKnots} kts</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-400 h-full" style={{ width: `${(v.speedKnots / v.maxSpeedKnots) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Engine Health:</span>
                      <strong className="text-emerald-400 font-mono">{v.engineHealthPct}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full" style={{ width: `${v.engineHealthPct}%` }}></div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Fuel Reserve:</span>
                      <strong className="text-amber-400 font-mono">{v.fuelLevelPct}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full" style={{ width: `${v.fuelLevelPct}%` }}></div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Pax Occupancy:</span>
                      <strong className="text-purple-400 font-mono">{v.passengerOccupancyPct}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-400 h-full" style={{ width: `${v.passengerOccupancyPct}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Location & Heading */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono flex justify-between items-center text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[9px]">CURRENT COORDS</span>
                    <strong className="text-white">{v.latLng}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[9px]">NEXT PORT ETA</span>
                    <strong className="text-sky-400">{v.nextPort}</strong>
                  </div>
                </div>

                {/* Throttle Mode Toggle Controls */}
                <div className="space-y-2 pt-1 text-xs">
                  <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block">THROTTLE MODE OVERRIDE</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Eco Cruising', 'Sprint Velocity', 'Harbor Patrol'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => handleUpdateThrottleMode(v.id, mode)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          v.throttleMode === mode
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => handleRunFleetDiagnostic(v.name)}
                    disabled={isScanningFleetDiagnostic}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanningFleetDiagnostic ? 'animate-spin text-indigo-400' : ''}`} />
                    <span>Run Engine Diagnostic</span>
                  </button>

                  <button
                    onClick={() => setSelectedFleetVesselId(v.id)}
                    className="py-2 px-3 text-indigo-400 hover:underline font-bold text-xs"
                  >
                    View AIS Telemetry Log →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: INCIDENT REPORTING
         ========================================== */}
      {activeTab === 'incident-reporting' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 p-6 rounded-2xl border border-rose-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>IMO ISM CODE COMPLIANT MARITIME SAFETY & HAZARD LOG</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Incident & Safety Hazard Reporting System</h2>
            <p className="text-xs text-slate-300">
              Log engine failures, coral reef scrapings, medical MAYDAYs, squall hazards, or bunkering spills directly to Coast Guard Maritime Rescue Coordination Centres.
            </p>
          </div>

          {incidentSuccessNotice && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{incidentSuccessNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left File New Incident Form */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>File New Incident / Safety Hazard Report</span>
              </h3>

              <form onSubmit={handleCreateIncident} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Incident Headline</label>
                  <input
                    type="text"
                    required
                    value={newIncTitle}
                    onChange={(e) => setNewIncTitle(e.target.value)}
                    placeholder="e.g. Auxiliary Generator Coolant Line Spike"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Vessel / Location</label>
                    <input
                      type="text"
                      required
                      value={newIncVessel}
                      onChange={(e) => setNewIncVessel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Severity Level</label>
                    <select
                      value={newIncSeverity}
                      onChange={(e) => setNewIncSeverity(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    >
                      <option value="Low">Low (Informational)</option>
                      <option value="Moderate">Moderate (Operational)</option>
                      <option value="High">High (Safety Risk)</option>
                      <option value="Critical MAYDAY">Critical MAYDAY</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Incident Category</label>
                    <select
                      value={newIncType}
                      onChange={(e) => setNewIncType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    >
                      <option value="Engine Overheat">Engine Overheat / Breakdown</option>
                      <option value="Coral Reef Scraping">Coral Reef Scraping Hazard</option>
                      <option value="Medical Evacuation">Medical Evacuation Request</option>
                      <option value="Oil Bunkering Spill">Oil Bunkering Spill Hazard</option>
                      <option value="Squall Blindness Hazard">Squall Blindness Hazard</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Reporting Officer</label>
                    <input
                      type="text"
                      value={newIncReporter}
                      onChange={(e) => setNewIncReporter(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Latitude</label>
                    <input
                      type="text"
                      value={newIncLat}
                      onChange={(e) => setNewIncLat(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Longitude</label>
                    <input
                      type="text"
                      value={newIncLng}
                      onChange={(e) => setNewIncLng(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Detailed Situation Summary</label>
                  <textarea
                    rows={4}
                    required
                    value={newIncDesc}
                    onChange={(e) => setNewIncDesc(e.target.value)}
                    placeholder="Describe environmental conditions, damages, or immediate actions taken..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingIncident}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center space-x-2"
                >
                  {isSubmittingIncident ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{isSubmittingIncident ? 'DISPATCHING INCIDENT LOG...' : 'SUBMIT & DISPATCH INCIDENT LOG'}</span>
                </button>
              </form>
            </div>

            {/* Right Incidents Log Feed */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-white text-sm">Active IMO Safety Incidents Log ({incidentsList.length})</h3>
                  <span className="text-[10px] text-rose-400 font-mono bg-rose-500/10 px-2.5 py-1 rounded font-bold">
                    LIVE COAST GUARD FEED
                  </span>
                </div>

                <div className="space-y-3">
                  {incidentsList.map((inc) => (
                    <div
                      key={inc.id}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 transition-all hover:border-slate-700"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-xs">{inc.title}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({inc.incidentNo})</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{inc.vesselOrLocation} • {inc.coordinates}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                              inc.severity === 'Critical MAYDAY'
                                ? 'bg-rose-500 text-slate-950 font-black animate-pulse'
                                : inc.severity === 'High'
                                ? 'bg-orange-500/20 text-orange-400'
                                : inc.severity === 'Moderate'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {inc.severity}
                          </span>

                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                              inc.status === 'Resolved & Closed'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-sky-500/20 text-sky-400'
                            }`}
                          >
                            {inc.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{inc.description}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-slate-400 font-mono pt-1">
                        <span>Reported by: <strong className="text-slate-200">{inc.reporterName}</strong> at {inc.reportedAt}</span>

                        <div className="flex items-center space-x-2">
                          {inc.status !== 'Resolved & Closed' && (
                            <button
                              onClick={() => handleResolveIncident(inc.id)}
                              className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded font-bold transition-all"
                            >
                              Resolve & Close Incident
                            </button>
                          )}

                          <button
                            onClick={() => setActiveIncidentModal(inc)}
                            className="px-2.5 py-1 bg-slate-800 text-slate-200 hover:bg-slate-700 rounded font-bold"
                          >
                            Full Log Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: PORT DENSITY CHARTS
         ========================================== */}
      {activeTab === 'port-density' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-purple-950 p-6 rounded-2xl border border-violet-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-violet-400 font-bold text-xs">
              <BarChart3 className="w-5 h-5 text-violet-400" />
              <span>SOUTH ASIAN MAJOR MARITIME PORT DENSITY & CONGESTION MODEL</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Port Density & Berth Congestion Analytics</h2>
            <p className="text-xs text-slate-300">
              Analyze hourly container berth occupancy, outer sea anchorage queues, crane utilization percentages, and peak traffic bottlenecks across South Asian sea corridors.
            </p>
          </div>

          {/* Region Selector Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {(['All', 'India', 'Sri Lanka & Maldives', 'Bay of Bengal', 'Southeast Asia'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedPortRegion(reg)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedPortRegion === reg
                    ? 'bg-violet-500 text-slate-950 border-violet-400 shadow-lg shadow-violet-500/20 font-extrabold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {reg === 'All' ? 'All South Asian Ports' : reg}
              </button>
            ))}
          </div>

          {/* Active Port Detailed Metrics */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">SELECTED PORT TERMINAL</span>
                <h3 className="font-extrabold text-xl text-white">{activePortDetail.portName}</h3>
                <span className="text-xs text-slate-400">{activePortDetail.country} • {activePortDetail.capacityTEUorPassengers}</span>
              </div>

              <div
                className={`px-4 py-2 rounded-xl border text-xs font-black uppercase text-center ${
                  activePortDetail.congestionIndex === 'Optimal'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : activePortDetail.congestionIndex === 'Moderate Density'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
              >
                {activePortDetail.congestionIndex}
              </div>
            </div>

            {/* 4 Key Port Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 block">Berth Occupancy</span>
                <strong className="text-2xl font-black text-violet-400">{activePortDetail.currentOccupancyPct}%</strong>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-violet-400 h-full" style={{ width: `${activePortDetail.currentOccupancyPct}%` }}></div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 block">Anchorage Queue</span>
                <strong className="text-2xl font-black text-amber-400">{activePortDetail.waitingAnchorageCount} Vessels</strong>
                <span className="text-[9px] text-slate-500 block">Waiting outer anchorage</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 block">Avg Turnaround</span>
                <strong className="text-2xl font-black text-sky-400">{activePortDetail.avgTurnaroundHours} Hours</strong>
                <span className="text-[9px] text-slate-500 block">Unloading to clearance</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 block">Gantry Crane Usage</span>
                <strong className="text-2xl font-black text-emerald-400">{activePortDetail.craneUtilizationPct}%</strong>
                <span className="text-[9px] text-slate-500 block">Container gang active</span>
              </div>
            </div>

            {/* 24-Hour Traffic Bar Chart Visualization */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white uppercase tracking-wider text-slate-300">
                  24-Hour Port Traffic & Congestion Distribution (00:00 - 24:00)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Peak: {activePortDetail.peakTrafficHours}</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="h-32 flex items-end justify-between gap-1 pt-4 px-2">
                  {activePortDetail.hourlyTraffic24h.map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative">
                      {/* Hover Tooltip */}
                      <div className="absolute -top-8 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all font-mono pointer-events-none z-10 whitespace-nowrap">
                        {idx.toString().padStart(2, '0')}:00 - {val}%
                      </div>

                      <div
                        className={`w-full rounded-t transition-all ${
                          val > 85 ? 'bg-rose-500' : val > 65 ? 'bg-violet-500' : 'bg-emerald-400'
                        }`}
                        style={{ height: `${val}%` }}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[9px] font-mono text-slate-400 border-t border-slate-800 pt-2 px-1">
                  <span>00:00</span>
                  <span>04:00</span>
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                  <span>24:00</span>
                </div>
              </div>
            </div>

            {/* Ports Cards Selector */}
            <div className="space-y-3 pt-2">
              <span className="font-bold text-slate-300 text-xs uppercase tracking-wider block">
                Select Port to Inspect Analytics
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filteredPortList.map((p) => (
                  <button
                    key={p.portId}
                    onClick={() => setSelectedPortId(p.portId)}
                    className={`p-3.5 rounded-xl border text-left transition-all space-y-1.5 ${
                      selectedPortId === p.portId
                        ? 'bg-slate-950 border-violet-500 shadow-md shadow-violet-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <strong className="text-white text-xs block font-bold">{p.portName}</strong>
                      <span className="text-[10px] text-violet-400 font-mono font-bold">{p.currentOccupancyPct}%</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.country}</div>
                    <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
                      <span>Queue: {p.waitingAnchorageCount} ships</span>
                      <span>Turnaround: {p.avgTurnaroundHours}h</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: OFFLINE ALERT SYSTEMS
         ========================================== */}
      {activeTab === 'offline-alerts' && (
        <div className="space-y-6 animate-fadeIn">
          <div
            className={`p-6 rounded-2xl border transition-all space-y-3 ${
              sirenActive
                ? 'bg-gradient-to-r from-rose-950 via-red-900 to-amber-950 border-rose-500 shadow-2xl shadow-rose-500/30 animate-pulse'
                : 'bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border-amber-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <WifiOff className="w-5 h-5 text-amber-400" />
                <span>OFFLINE-FIRST VHF MESH RADIO & INDEXED-DB EMERGENCY ENGINE</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsNetworkSimulatedOffline(!isNetworkSimulatedOffline)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                    isNetworkSimulatedOffline
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {isNetworkSimulatedOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                  <span>{isNetworkSimulatedOffline ? 'SIMULATED NETWORK: OFFLINE' : 'SIMULATED NETWORK: ONLINE'}</span>
                </button>

                <button
                  onClick={() => setSirenActive(!sirenActive)}
                  className={`p-2 rounded-xl border text-xs font-bold ${
                    sirenActive ? 'bg-rose-500 text-slate-950 border-rose-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {sirenActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-white">Offline Emergency Warning & Distress Broadcast</h2>
            <p className="text-xs text-slate-300">
              Guarantees zero data loss in deep ocean dead zones. Safety alerts and MAYDAY broadcasts are stored in local IndexedDB storage and relayed via low-frequency VHF mesh radio.
            </p>
          </div>

          {offlineSyncNotice && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{offlineSyncNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Queue New Offline Distress Broadcast Form */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2 flex items-center space-x-2">
                <Radio className="w-4 h-4 text-amber-400" />
                <span>Queue VHF Offline Emergency Broadcast</span>
              </h3>

              <form onSubmit={handleQueueOfflineDistress} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Broadcast Category</label>
                  <select
                    value={offlineNewDistressType}
                    onChange={(e) => setOfflineNewDistressType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="DISTRESS_SOS">DISTRESS SOS MAYDAY (Highest Priority)</option>
                    <option value="SQUALL_WARNING">Monsoon Tropical Squall Advisory</option>
                    <option value="SHALLOW_CORAL_REEF">Uncharted Coral Shoal Warning</option>
                    <option value="ROUGE_WAVE">Rogue Wave Anomaly Alert</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Emergency Description</label>
                  <textarea
                    rows={4}
                    required
                    value={offlineNewDistressDesc}
                    onChange={(e) => setOfflineNewDistressDesc(e.target.value)}
                    placeholder="Enter vessel coordinates, damage state, or marine hazard location..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-[11px] font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>Local Storage State:</span>
                    <strong className="text-amber-400">142.8 MB Cached Offline</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>VHF Mesh Frequency:</span>
                    <strong className="text-sky-400">156.800 MHz (Ch 16)</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  <Radio className="w-4 h-4" />
                  <span>BROADCAST & QUEUE OFFLINE EMERGENCY</span>
                </button>
              </form>
            </div>

            {/* Right Offline Alerts Storage Queue */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-extrabold text-white text-sm">Offline Device Alert Storage & VHF Queue ({offlineAlertsQueue.length})</h3>
                    <span className="text-[10px] text-slate-400">IndexedDB local queue</span>
                  </div>

                  <button
                    onClick={handleSyncOfflineQueue}
                    className="py-2 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold rounded-xl text-xs transition-all flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sync Offline Queue Now</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {offlineAlertsQueue.map((alt) => (
                    <div key={alt.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-amber-400 font-mono text-xs">{alt.alertCode}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{alt.type}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                              alt.priority === 'EMERGENCY' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {alt.priority}
                          </span>

                          <span
                            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                              alt.syncStatus === 'Synced to Coastal Relay'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {alt.syncStatus}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-white leading-relaxed">{alt.message}</p>

                      <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                        <span>Coordinates: {alt.coordinates}</span>
                        <span>Logged at {alt.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: EXPORT MANIFEST
         ========================================== */}
      {activeTab === 'export-manifest' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 p-6 rounded-2xl border border-teal-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs">
              <FileSpreadsheet className="w-5 h-5 text-teal-400" />
              <span>WCO & UN/EDIFACT COMPLIANT MARITIME EXPORT MANIFEST HUB</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Export Manifest Generator & Digital Customs Inspector</h2>
            <p className="text-xs text-slate-300">
              Generate, sign, and validate international export cargo manifests. Supports UN/EDIFACT CUSCAR, WCO JSON-LD, and cryptographic HMAC-SHA256 notary signatures for South Asian port authorities.
            </p>
          </div>

          {/* Top Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">TOTAL EXPORT MANIFESTS</span>
              <strong className="text-2xl font-black text-teal-400 font-mono">{exportManifests.length} Active</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">AGGREGATE EXPORT TONNAGE</span>
              <strong className="text-2xl font-black text-emerald-400 font-mono">
                {exportManifests.reduce((a, b) => a + b.totalWeightMT, 0).toLocaleString()} MT
              </strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">HMAC DIGITAL NOTARY</span>
              <strong className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded inline-block mt-1">
                100% VALIDATED
              </strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">CLEARANCE RELEASE RATE</span>
              <strong className="text-2xl font-black text-sky-400 font-mono">
                {Math.round((exportManifests.filter((m) => m.customsClearanceStatus === 'Cleared & Released').length / exportManifests.length) * 100)}%
              </strong>
            </div>
          </div>

          {exportSuccessNotice && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{exportSuccessNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Create Export Manifest Form */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-teal-400" />
                <span>Create New Export Manifest & Customs Filing</span>
              </h3>

              <form onSubmit={handleCreateExportManifest} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Carrier Vessel</label>
                  <select
                    value={newExpVessel}
                    onChange={(e) => setNewExpVessel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Lakshadweep Samudra Cargo Express">Lakshadweep Samudra Cargo Express (IMO-9821041)</option>
                    <option value="Bay Bounty Container Carrier">Bay Bounty Container Carrier (IMO-9752109)</option>
                    <option value="Bengal Delta Feeder">Bengal Delta Feeder (IMO-9331042)</option>
                    <option value="Royal Maldivian Atoll Logistics">Royal Maldivian Atoll Logistics (IMO-9110284)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Exporter / Shipper</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Marine Ltd"
                      value={newExpShipper}
                      onChange={(e) => setNewExpShipper(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Consignee</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maldives State Trading"
                      value={newExpConsignee}
                      onChange={(e) => setNewExpConsignee(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Origin Port</label>
                    <input
                      type="text"
                      value={newExpOrigin}
                      onChange={(e) => setNewExpOrigin(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Destination Port</label>
                    <input
                      type="text"
                      value={newExpDest}
                      onChange={(e) => setNewExpDest(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Units (TEU)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newExpUnits}
                      onChange={(e) => setNewExpUnits(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Weight (MT)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newExpWeight}
                      onChange={(e) => setNewExpWeight(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">DG Code</label>
                    <select
                      value={newExpDgClass}
                      onChange={(e) => setNewExpDgClass(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-[10px]"
                    >
                      <option value="None (General Cargo)">None (General)</option>
                      <option value="IMDG Class 3 (Flammable Liquids)">Class 3 (Flammables)</option>
                      <option value="IMDG Class 9 (Marine Pollutant)">Class 9 (Pollutants)</option>
                      <option value="IMDG Class 2 (Compressed Gas)">Class 2 (Gas)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">EDI Schema Format</label>
                  <select
                    value={newExpFormat}
                    onChange={(e) => setNewExpFormat(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="UN/EDIFACT CUSCAR">UN/EDIFACT CUSCAR (International Standard)</option>
                    <option value="JSON-LD WCO Schema">JSON-LD WCO Schema (API Customs Portal)</option>
                    <option value="XML Customs Portal">XML Customs Portal (National Gateway)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-teal-400/20 flex items-center justify-center space-x-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>GENERATE & SIGN EXPORT MANIFEST</span>
                </button>
              </form>
            </div>

            {/* Right: Export Manifest Inspector & Payload Viewer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">ACTIVE MANIFEST INSPECTOR</span>
                    <strong className="text-white text-base font-black">{activeExportManifest.manifestNo}</strong>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                        activeExportManifest.customsClearanceStatus === 'Cleared & Released'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      ● {activeExportManifest.customsClearanceStatus}
                    </span>
                  </div>
                </div>

                {/* Manifest Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">Vessel & Voyage</span>
                    <strong className="text-white block font-bold">{activeExportManifest.vesselName}</strong>
                    <span className="text-[10px] text-teal-400 font-mono">{activeExportManifest.voyageNo}</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">Customs Declaration #</span>
                    <strong className="text-sky-400 font-mono block font-bold">{activeExportManifest.customsDeclNo}</strong>
                    <span className="text-[10px] text-slate-400">EDI: {activeExportManifest.ediFormat}</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">Exporter (Shipper)</span>
                    <strong className="text-slate-200 block text-[11px]">{activeExportManifest.exporterShipper}</strong>
                    <span className="text-[10px] text-slate-400">{activeExportManifest.originPort}</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">Consignee</span>
                    <strong className="text-slate-200 block text-[11px]">{activeExportManifest.consignee}</strong>
                    <span className="text-[10px] text-slate-400">{activeExportManifest.destinationPort}</span>
                  </div>
                </div>

                {/* Digital Signature & Cargo Summary */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>HMAC SHA-256 DIGITAL NOTARY STAMP:</span>
                    <span className="text-emerald-400 font-bold">VERIFIED AUTHENTIC</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] text-teal-300 break-all select-all">
                    {activeExportManifest.digitalHashHMAC}
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300 pt-1">
                    <span>Total Cargo Units: <strong className="text-white">{activeExportManifest.totalUnits} TEU</strong></span>
                    <span>Total Tonnage: <strong className="text-white">{activeExportManifest.totalWeightMT} MT</strong></span>
                    <span>Hazard: <strong className="text-amber-400">{activeExportManifest.dgClass}</strong></span>
                  </div>
                </div>

                {/* Live EDI Payload Viewer */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                      Live EDIFACT / Customs Message Stream
                    </span>
                    <button
                      onClick={handleCopyEdiPayload}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 text-[10px] font-bold rounded flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedEdiNotice ? 'Copied to Clipboard!' : 'Copy EDI Payload'}</span>
                    </button>
                  </div>

                  <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] font-mono text-teal-300 overflow-x-auto leading-tight">
{`UNB+UNOA:2+CUSTOMS_IND+PORT_MAL+260801:0240+901'
UNH+1+CUSCAR:D:95B:UN'
BGM+851+${activeExportManifest.manifestNo}+9'
RFF+ACE:${activeExportManifest.customsDeclNo}'
TDT+20+${activeExportManifest.voyageNo}+1++:${activeExportManifest.vesselName}'
LOC+5+${activeExportManifest.originPort}'
LOC+61+${activeExportManifest.destinationPort}'
NAD+CZ+${activeExportManifest.exporterShipper}'
NAD+CN+${activeExportManifest.consignee}'
MEA+AAE+G+KGM:${activeExportManifest.totalWeightMT * 1000}'
FTX+AAA+++DG CLASS: ${activeExportManifest.dgClass}'
AUT+${activeExportManifest.digitalHashHMAC}'
UNT+12+1'
UNZ+1+901'`}
                  </pre>
                </div>

                {/* Select Manifest Record List */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="font-bold text-slate-300 text-xs block">All Registered Export Manifests</span>
                  <div className="space-y-2">
                    {exportManifests.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedExportManifestId(m.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex justify-between items-center ${
                          selectedExportManifestId === m.id
                            ? 'bg-slate-950 border-teal-500 text-white shadow-md'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div>
                          <strong className="text-xs block font-bold">{m.manifestNo} • {m.vesselName}</strong>
                          <span className="text-[10px] text-slate-400">{m.exporterShipper} → {m.consignee}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-mono text-teal-400 block font-bold">{m.totalWeightMT} MT</span>
                          <span className="text-[9px] text-slate-400">{m.ediFormat}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: CARGO NOTIFICATION
         ========================================== */}
      {activeTab === 'cargo-notification' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <BellRing className="w-5 h-5 text-emerald-400" />
              <span>REAL-TIME CARGO MILESTONE & CONSIGNEE NOTIFICATION HUB</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Cargo Milestone Notification & Webhook Dispatcher</h2>
            <p className="text-xs text-slate-300">
              Configure automated SMS, WhatsApp, Webhook, and Email alerts to consignees, port forwarders, and logistics managers upon key cargo milestones.
            </p>
          </div>

          {notifSuccessNotice && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notifSuccessNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Dispatch Custom Notification Form */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2 flex items-center space-x-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Dispatch Instant Cargo Milestone Alert</span>
              </h3>

              <form onSubmit={handleSendCargoNotification} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Cargo ID / B/L Ref</label>
                  <input
                    type="text"
                    required
                    value={notifCargoRefInput}
                    onChange={(e) => setNotifCargoRefInput(e.target.value)}
                    placeholder="e.g. CRGO-8842"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Consignee Contact / Webhook URL</label>
                  <input
                    type="text"
                    required
                    value={notifContactInput}
                    onChange={(e) => setNotifContactInput(e.target.value)}
                    placeholder="e.g. +960 771-8821 or webhook URL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Channel</label>
                    <select
                      value={notifChannel}
                      onChange={(e) => setNotifChannel(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    >
                      <option value="WhatsApp">WhatsApp Message</option>
                      <option value="SMS">SMS Cellular Alert</option>
                      <option value="Webhook">REST Webhook API</option>
                      <option value="Email">Email Dispatch</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Milestone Event</label>
                    <select
                      value={notifEvent}
                      onChange={(e) => setNotifEvent(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-[10px]"
                    >
                      <option value="Customs Cleared">Customs Cleared</option>
                      <option value="Vessel Departure">Vessel Departure</option>
                      <option value="Delay Alert">Delay Alert (Monsoon)</option>
                      <option value="Discharged at Port">Discharged at Port</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Message Body</label>
                  <textarea
                    rows={3}
                    value={notifMessage}
                    onChange={(e) => setNotifMessage(e.target.value)}
                    placeholder="Enter custom message text or leave blank for auto-template..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-emerald-400/20 flex items-center justify-center space-x-2"
                >
                  <BellRing className="w-4 h-4" />
                  <span>DISPATCH NOTIFICATION ALERT</span>
                </button>
              </form>
            </div>

            {/* Right: Live Notifications Log Stream */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-extrabold text-white text-sm">Dispatched Cargo Notification Logs ({cargoNotifications.length})</h3>
                    <span className="text-[10px] text-slate-400">Automated multi-channel dispatch history</span>
                  </div>

                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded font-bold">
                    SATELLITE & MESH GATEWAY ONLINE
                  </span>
                </div>

                <div className="space-y-3">
                  {cargoNotifications.map((log) => (
                    <div key={log.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-emerald-400 font-mono text-xs">{log.cargoRef}</span>
                          <span className="text-[10px] text-slate-400 font-mono">via {log.channel}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {log.eventTrigger}
                          </span>
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                            {log.deliveryStatus}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-white leading-relaxed">{log.messageBody}</p>

                      <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                        <span>Recipient: {log.consigneeContact}</span>
                        <span>Sent at {log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: VISUAL MANIFEST DECK & BAY MAP
         ========================================== */}
      {activeTab === 'visual-manifest' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-fuchsia-950 via-slate-900 to-purple-950 p-6 rounded-2xl border border-fuchsia-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-fuchsia-400 font-bold text-xs">
              <Layers className="w-5 h-5 text-fuchsia-400" />
              <span>INTERACTIVE VESSEL CONTAINER BAY STOWAGE MAP</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Visual Manifest & Deck Stowage Map</h2>
            <p className="text-xs text-slate-300">
              Interactive 2D container deck layout map. Inspect reefer temperatures, hazardous material stowage codes, bay/tier weights, and vessel metacentric stability symmetry.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-300">Vessel Selection:</span>
              <select
                value={selectedVisualVessel}
                onChange={(e) => setSelectedVisualVessel(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white rounded-xl text-xs p-2 font-bold"
              >
                <option value="Bay Bounty Container Carrier">Bay Bounty Container Carrier (IMO-9752109)</option>
                <option value="Lakshadweep Samudra Cargo Express">Lakshadweep Samudra Cargo Express (IMO-9821041)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-300">Filter Type:</span>
              {['All', 'Refrigerated Reefer ❄️', 'Hazardous DG ⚠️', 'Standard Dry 📦'].map((t) => (
                <button
                  key={t}
                  onClick={() => setVisualDeckFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                    visualDeckFilterType === t
                      ? 'bg-fuchsia-500 text-slate-950 border-fuchsia-400 font-black'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Deck Weight & Metacentric Balance Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">PORT / STARBOARD BALANCE</span>
              <strong className="text-fuchsia-400 text-lg font-bold">50.8% / 49.2%</strong>
              <span className="text-[9px] text-emerald-400 block">Symmetric (Safe)</span>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">METACENTRIC HEIGHT (GM)</span>
              <strong className="text-emerald-400 text-lg font-bold">2.45 Meters</strong>
              <span className="text-[9px] text-slate-500 block">Optimal Stability</span>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">VESSEL TRIM ANGLE</span>
              <strong className="text-sky-400 text-lg font-bold">+0.15° Bow Trim</strong>
              <span className="text-[9px] text-slate-500 block">Ideal Eco-Cruising</span>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">ACTIVE REEFER POWER</span>
              <strong className="text-purple-400 text-lg font-bold">480V / 60Hz Plugged</strong>
              <span className="text-[9px] text-emerald-400 block">100% Temp Monitored</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: 2D Interactive Container Bay Map */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-white text-sm">Vessel Deck Stowage Grid (Bays & Tiers)</h3>
                <span className="text-[10px] text-fuchsia-400 font-mono">CLICK CELL TO INSPECT</span>
              </div>

              {/* Bay 01 Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-fuchsia-300 font-mono">Forward Deck — Bay 01</span>
                <div className="grid grid-cols-3 gap-3">
                  {containerBayMapData
                    .filter((c) => c.bay.includes('Bay 01') && (visualDeckFilterType === 'All' || c.cargoType === visualDeckFilterType))
                    .map((item) => (
                      <button
                        key={item.containerId}
                        onClick={() => setInspectedContainer(item)}
                        className={`p-3 rounded-xl border text-left transition-all space-y-1.5 ${
                          inspectedContainer?.containerId === item.containerId
                            ? 'bg-fuchsia-950 border-fuchsia-400 shadow-lg shadow-fuchsia-500/20'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-slate-400">T{item.tier}-C{item.col}</span>
                          <span className="text-[10px] font-bold text-fuchsia-400">{item.weightMT} MT</span>
                        </div>
                        <strong className="text-white text-xs block font-bold font-mono">{item.containerId}</strong>
                        <span className="text-[9px] text-slate-300 block">{item.cargoType}</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Bay 03 Section */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <span className="text-xs font-bold text-purple-300 font-mono">Midship Deck — Bay 03</span>
                <div className="grid grid-cols-3 gap-3">
                  {containerBayMapData
                    .filter((c) => c.bay.includes('Bay 03') && (visualDeckFilterType === 'All' || c.cargoType === visualDeckFilterType))
                    .map((item) => (
                      <button
                        key={item.containerId}
                        onClick={() => setInspectedContainer(item)}
                        className={`p-3 rounded-xl border text-left transition-all space-y-1.5 ${
                          inspectedContainer?.containerId === item.containerId
                            ? 'bg-fuchsia-950 border-fuchsia-400 shadow-lg shadow-fuchsia-500/20'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-slate-400">T{item.tier}-C{item.col}</span>
                          <span className="text-[10px] font-bold text-purple-400">{item.weightMT} MT</span>
                        </div>
                        <strong className="text-white text-xs block font-bold font-mono">{item.containerId}</strong>
                        <span className="text-[9px] text-slate-300 block">{item.cargoType}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Right: Inspected Container Detail Panel */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2 flex items-center space-x-2">
                <Box className="w-4 h-4 text-fuchsia-400" />
                <span>Container Stowage Telemetry Inspector</span>
              </h3>

              {inspectedContainer ? (
                <div className="space-y-3">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block">CONTAINER ID</span>
                        <strong className="text-lg font-black text-fuchsia-400 font-mono">{inspectedContainer.containerId}</strong>
                      </div>
                      <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded">
                        {inspectedContainer.bay}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px]">
                      <div>
                        <span className="text-slate-500 text-[9px] block">BILL OF LADING</span>
                        <strong>{inspectedContainer.blNumber}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[9px] block">GROSS WEIGHT</span>
                        <strong className="text-emerald-400">{inspectedContainer.weightMT} MT</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[9px] block">DESTINATION PORT</span>
                        <strong>{inspectedContainer.destination}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[9px] block">SEAL NUMBER</span>
                        <strong className="text-sky-400">{inspectedContainer.sealNo}</strong>
                      </div>
                    </div>

                    {inspectedContainer.temperatureCelsius !== undefined && (
                      <div className="p-2.5 bg-purple-950/60 border border-purple-500/40 rounded-xl text-purple-300 flex justify-between items-center font-mono">
                        <span>Reefer Setpoint Temp:</span>
                        <strong className="text-white text-sm font-bold">{inspectedContainer.temperatureCelsius}°C</strong>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-slate-300">
                    <span className="text-[10px] text-slate-400 font-mono block">CARGO TYPE & CLASSIFICATION</span>
                    <strong className="text-white block font-bold">{inspectedContainer.cargoType}</strong>
                    <p className="text-[10px] text-slate-400 pt-1">
                      Stowage position tier verified for optimal center-of-gravity balance and roll stabilization.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 font-mono text-xs">
                  Click any container cell on the left deck grid to inspect full stowage parameters.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: MULTI-CARGO TRACKING
         ========================================== */}
      {activeTab === 'multi-cargo-tracking' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-blue-950 p-6 rounded-2xl border border-sky-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs">
              <Boxes className="w-5 h-5 text-sky-400" />
              <span>UNIFIED MULTI-CARGO BATCH & MULTI-B/L COMMAND CENTER</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Multi-Cargo & Batch B/L Tracking Dashboard</h2>
            <p className="text-xs text-slate-300">
              Track multiple Bill of Lading (B/L) numbers or container references simultaneously. Get unified voyage progress bars, aggregated tonnage totals, and instant delay warnings.
            </p>
          </div>

          {/* Batch Query Search Bar */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <form onSubmit={handleProcessBatchSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={batchSearchInput}
                  onChange={(e) => setBatchSearchInput(e.target.value)}
                  placeholder="Enter comma-separated container IDs or B/L numbers (e.g. CRGO-8842, CRGO-9012)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>QUERY BATCH CONTAINERS</span>
              </button>
            </form>

            {batchNotice && (
              <span className="text-[11px] text-sky-300 font-bold font-mono block pt-1">{batchNotice}</span>
            )}
          </div>

          {/* Aggregated KPI Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">BATCH CONTAINER COUNT</span>
              <strong className="text-2xl font-black text-sky-400 font-mono">{activeBatchItems.length} Cargo Units</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">TOTAL BATCH WEIGHT</span>
              <strong className="text-2xl font-black text-emerald-400 font-mono">
                {activeBatchItems.reduce((a, b) => a + b.weightMT, 0)} MT
              </strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">AVG JOURNEY PROGRESS</span>
              <strong className="text-2xl font-black text-purple-400 font-mono">
                {Math.round(activeBatchItems.reduce((a, b) => a + b.progressPct, 0) / activeBatchItems.length)}%
              </strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">ON-TIME DELIVERY RATE</span>
              <strong className="text-2xl font-black text-indigo-400 font-mono">
                {Math.round((activeBatchItems.filter((i) => i.status !== 'Monsoon Delay').length / activeBatchItems.length) * 100)}%
              </strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 font-mono block">ACTIVE DELAY ALERTS</span>
              <strong className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2.5 py-1 rounded inline-block mt-1">
                {activeBatchItems.filter((i) => i.status === 'Monsoon Delay').length} SHIPMENT DELAYED
              </strong>
            </div>
          </div>

          {/* Unified Multi-Cargo Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-sm">Active Multi-Cargo Batch Status Matrix</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert('Batch Tracking Report exported to CSV!')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <span>Export Batch CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                    <th className="pb-3">Container & B/L Ref</th>
                    <th className="pb-3">Carrier Vessel</th>
                    <th className="pb-3">Route (Origin → Dest)</th>
                    <th className="pb-3">Journey Progress</th>
                    <th className="pb-3">ETA / Status</th>
                    <th className="pb-3 text-right">Consignee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {activeBatchItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-950/60 transition-all">
                      <td className="py-3">
                        <strong className="text-white block font-mono">{item.containerId}</strong>
                        <span className="text-[10px] text-sky-400 font-mono">{item.blNumber}</span>
                      </td>

                      <td className="py-3">
                        <span className="text-slate-200 block font-bold">{item.vesselName}</span>
                        <span className="text-[10px] text-slate-400">{item.cargoCategory}</span>
                      </td>

                      <td className="py-3">
                        <span className="text-slate-300 block">{item.origin} →</span>
                        <span className="text-slate-300 font-bold">{item.destination}</span>
                      </td>

                      <td className="py-3 w-36">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                          <span>Progress:</span>
                          <span className="text-sky-400 font-bold">{item.progressPct}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.progressPct === 100 ? 'bg-emerald-400' : item.status === 'Monsoon Delay' ? 'bg-amber-400' : 'bg-sky-400'
                            }`}
                            style={{ width: `${item.progressPct}%` }}
                          ></div>
                        </div>
                      </td>

                      <td className="py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase mb-1 ${
                            item.status === 'Customs Cleared'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : item.status === 'Monsoon Delay'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-sky-500/20 text-sky-400'
                          }`}
                        >
                          ● {item.status}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">{item.eta}</span>
                      </td>

                      <td className="py-3 text-right">
                        <span className="text-slate-200 block font-bold text-[11px]">{item.consignee}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.weightMT} MT</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* ==========================================
          TAB: LOYALTY TIERS BADGE & PERKS PORTAL
         ========================================== */}
      {activeTab === 'loyalty' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950 p-6 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>FREQUENT MARINER & FREIGHT SHIPPER LOYALTY PROGRAM</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Loyalty Tier Badges & VVIP Perk Redemption</h2>
            <p className="text-xs text-slate-300">
              Earn Nautical Miles on every passenger cruise ticket, multi-modal itinerary, and cargo shipment B/L. Unlock priority berths, freight discounts, and captain lounge access.
            </p>
          </div>

          {/* Member Profile Badge Hero Card */}
          <div className="p-6 bg-slate-900 border border-amber-500/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-3 z-10">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/30">
                  <Crown className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-extrabold text-white">Captain Alex Vance</h3>
                    <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-[10px] font-bold font-mono uppercase">
                      Gold Captain Tier 👑
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Member ID: OB-LOY-99120 • Joined Jan 2024</span>
                </div>
              </div>

              {/* Miles Balance & Progress Bar */}
              <div className="space-y-1.5 max-w-md pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Nautical Miles Balance:</span>
                  <strong className="text-amber-400 font-black text-sm">24,850 NM</strong>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full" style={{ width: '82%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Gold Tier (20,000 NM)</span>
                  <span className="text-amber-300 font-bold">5,150 NM needed for Diamond Fleet Admiral 💎</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 z-10">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono block">FREIGHT DISCOUNT</span>
                <strong className="text-emerald-400 text-lg font-black font-mono">15% OFF</strong>
                <span className="text-[9px] text-slate-500 block">Applied automatically</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono block">VVIP LOUNGE</span>
                <strong className="text-amber-400 text-lg font-black font-mono">UNLOCKED</strong>
                <span className="text-[9px] text-slate-500 block">All South Asia Ports</span>
              </div>
            </div>
          </div>

          {/* Tier Level Comparison Cards */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm">Loyalty Membership Tiers & Privileges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <strong className="text-amber-700 font-black text-sm">BRONZE MARINER</strong>
                  <span className="text-[10px] text-slate-400 font-mono">0 - 5,000 NM</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>5% Freight Surcharge Waiver</li>
                  <li>Standard Port Lounge Access</li>
                  <li>Email Booking Confirmations</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-300 font-black text-sm">SILVER NAVIGATOR</strong>
                  <span className="text-[10px] text-slate-400 font-mono">5,000 - 20,000 NM</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>10% Ocean Freight Discount</li>
                  <li>Express Customs Clearance Tag</li>
                  <li>Free Date Rescheduling</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-900 border border-amber-500/50 rounded-2xl space-y-3 shadow-lg shadow-amber-500/10 bg-gradient-to-b from-slate-900 to-amber-950/20">
                <div className="flex justify-between items-center">
                  <strong className="text-amber-400 font-black text-sm">GOLD CAPTAIN 👑</strong>
                  <span className="text-[10px] text-amber-300 font-mono font-bold">CURRENT TIER</span>
                </div>
                <ul className="text-xs text-slate-200 space-y-1.5 list-disc list-inside">
                  <li>15% Passage & Freight Discount</li>
                  <li>Priority Berth Allocation</li>
                  <li>Complimentary VVIP Galley Dining</li>
                  <li>Zero Cancellation Fee</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-900 border border-purple-500/40 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <strong className="text-purple-300 font-black text-sm">DIAMOND ADMIRAL 💎</strong>
                  <span className="text-[10px] text-slate-400 font-mono">30,000+ NM</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>25% Off All Bookings</li>
                  <li>Dedicated Account Manager</li>
                  <li>Guaranteed Cabin Upgrades</li>
                  <li>Helicopter Pad Access at Sea</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Redeemable Perk Vouchers */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="font-extrabold text-white text-sm flex items-center space-x-2">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Redeem Nautical Miles for VVIP Perks</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                  <strong className="text-amber-300 text-sm block">15% Freight Discount Coupon</strong>
                  <p className="text-slate-400 text-[11px] pt-1">Applies instantly to next ocean cargo container booking.</p>
                </div>
                <button
                  onClick={() =>
                    setRedeemedCouponModal({
                      perkName: '15% Cargo Freight Discount Voucher',
                      code: 'LOY-FRT-15-X992',
                    })
                  }
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-all"
                >
                  Redeem (1,500 NM)
                </button>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                  <strong className="text-amber-300 text-sm block">Priority Berth Express Pass</strong>
                  <p className="text-slate-400 text-[11px] pt-1">Fast-track pilot boat docking at Colombo or Malé Port.</p>
                </div>
                <button
                  onClick={() =>
                    setRedeemedCouponModal({
                      perkName: 'Priority Berth Express Port Pass',
                      code: 'LOY-BRTH-PASS-881',
                    })
                  }
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-all"
                >
                  Redeem (2,500 NM)
                </button>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                  <strong className="text-amber-300 text-sm block">VVIP Island Speedboat Shuttle</strong>
                  <p className="text-slate-400 text-[11px] pt-1">Complimentary luxury catamaran transfer to resort atolls.</p>
                </div>
                <button
                  onClick={() =>
                    setRedeemedCouponModal({
                      perkName: 'VVIP Island Speedboat Shuttle Voucher',
                      code: 'LOY-SHTL-VVIP-004',
                    })
                  }
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-all"
                >
                  Redeem (3,000 NM)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: SMART CARGO REROUTING
         ========================================== */}
      {activeTab === 'smart-rerouting' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>DYNAMIC OCEAN PATHING & WEATHER DETOUR ENGINE</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Smart Cargo Rerouting & Squall Bypass Engine</h2>
            <p className="text-xs text-slate-300">
              Automated route optimization for vessels encountering tropical cyclones, monsoonal sea swells, or severe port anchorage queues. Real-time ETA, fuel burn, and CO2 recalculations.
            </p>
          </div>

          {rerouteNotice && (
            <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{rerouteNotice}</span>
            </div>
          )}

          {/* Active Reroute Cargo Selection */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-sm">Select Active Shipment Facing Maritime Hazard</h3>
              <span className="text-[10px] text-emerald-400 font-mono">LIVE AIS REROUTE MONITORS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REROUTE_SHIPMENTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedRerouteShipmentId(s.id)}
                  className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
                    selectedRerouteShipmentId === s.id
                      ? 'bg-slate-950 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <strong className="text-white text-xs font-bold">{s.shipmentName}</strong>
                    <span className="text-[10px] text-amber-400 font-mono font-bold">{s.cargoValueUSD} Cargo</span>
                  </div>
                  <span className="text-[11px] text-slate-300 block">{s.currentRoute}</span>
                  <div className="p-2 bg-rose-950/50 border border-rose-500/30 rounded text-[10px] text-rose-300 font-bold flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{s.hazardAlert}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detour Options Breakdown */}
          {(() => {
            const shipment = REROUTE_SHIPMENTS.find((s) => s.id === selectedRerouteShipmentId) || REROUTE_SHIPMENTS[0];
            return (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">REROUTE ANALYSIS FOR</span>
                    <h3 className="font-extrabold text-lg text-white">{shipment.shipmentName}</h3>
                  </div>
                  <span className="text-xs text-slate-300 font-mono">Vessel: {shipment.vesselName}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['optionA', 'optionB', 'optionC'] as const).map((key) => {
                    const opt = shipment.options[key];
                    const isSelected = selectedRerouteOption === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedRerouteOption(key)}
                        className={`p-5 rounded-2xl border text-left transition-all space-y-4 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-slate-950 border-emerald-400 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-400'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <strong className="text-white text-xs font-black">{opt.title}</strong>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                opt.riskLevel.includes('Low') || opt.riskLevel.includes('Optimal')
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {opt.riskLevel}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-300 leading-relaxed">{opt.description}</p>
                        </div>

                        <div className="space-y-1.5 pt-3 border-t border-slate-800/80 font-mono text-[11px]">
                          <div className="flex justify-between text-slate-400">
                            <span>Distance Delta:</span>
                            <strong className="text-white">{opt.distanceNM}</strong>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>ETA Impact:</span>
                            <strong className="text-amber-400">{opt.etaImpact}</strong>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Fuel / Cost Delta:</span>
                            <strong className="text-sky-400">{opt.fuelCostDeltaUSD}</strong>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>CO2 Emissions:</span>
                            <strong className="text-emerald-400">{opt.co2Savings}</strong>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleExecuteReroute}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
                  >
                    <Compass className="w-4 h-4" />
                    <span>EXECUTE DYNAMIC CARGO DETOUR & BROADCAST TO SHIP AIS</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ==========================================
          TAB: GLOBAL LOGISTICS DASHBOARD
         ========================================== */}
      {activeTab === 'global-logistics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-blue-950 p-6 rounded-2xl border border-sky-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs">
              <Globe className="w-5 h-5 text-sky-400" />
              <span>UNIFIED GLOBAL MARITIME & AIR FREIGHT COMMAND CENTER</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Global Logistics & Transshipment Control Center</h2>
            <p className="text-xs text-slate-300">
              Monitor active TEU volume, vessel densities, and transshipment port congestion across global maritime trade corridors.
            </p>
          </div>

          {/* Top KPI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 block">ACTIVE GLOBAL TEU VOLUME</span>
              <strong className="text-2xl font-black text-sky-400">184,500 TEU</strong>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 block">GLOBAL ON-TIME RATE</span>
              <strong className="text-2xl font-black text-emerald-400">88.4%</strong>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 block">ACTIVE FLEET VESSELS</span>
              <strong className="text-2xl font-black text-amber-400">412 Ships</strong>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 block">AVG PORT CLEARANCE</span>
              <strong className="text-2xl font-black text-purple-400">5.8 Hours</strong>
            </div>
          </div>

          {/* Region Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {(['All', 'South Asia', 'Southeast Asia', 'Middle East'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setGlobalLogisticsRegion(reg)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  globalLogisticsRegion === reg
                    ? 'bg-sky-400 text-slate-950 border-sky-300 font-black'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {reg} Region Hubs
              </button>
            ))}
          </div>

          {/* Global Hubs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLOBAL_LOGISTICS_HUBS.filter((h) => globalLogisticsRegion === 'All' || h.region === globalLogisticsRegion).map((hub) => (
              <div key={hub.name} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{hub.name}</h4>
                    <span className="text-[10px] text-slate-400">{hub.country}</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                      hub.congestion.includes('Optimal') || hub.congestion.includes('Low')
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : hub.congestion.includes('Moderate')
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {hub.congestion}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Annual Capacity</span>
                    <strong className="text-white">{hub.teuCapacity}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Active Ships</span>
                    <strong className="text-sky-400">{hub.activeShips} Ships</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Avg Anchorage Wait</span>
                    <strong className="text-amber-400">{hub.avgWaitHours} h</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Efficiency Rating</span>
                    <strong className="text-emerald-400">{hub.efficiencyScore}/100</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: MULTI-MODE BOOKING API
         ========================================== */}
      {activeTab === 'multimodal-api' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 rounded-2xl border border-indigo-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>DEVELOPER REST API & MULTI-MODAL BOOKING SANDBOX</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Multi-Mode Booking API Playground</h2>
            <p className="text-xs text-slate-300">
              Integrate multi-leg passenger & cargo transportation bookings via RESTful JSON endpoints. Test Bearer token authorization and retrieve live PNR response objects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: API Request Builder */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-indigo-300">HTTP POST REQUEST BUILDER</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">POST v2 /multimodal/book</span>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-sans font-bold">API Authorization Header:</label>
                <input
                  type="text"
                  readOnly
                  value={`Bearer ${apiBearerToken}`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300 text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-sans font-bold">JSON Payload Body:</label>
                <textarea
                  rows={12}
                  value={apiJsonRequest}
                  onChange={(e) => setApiJsonRequest(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300 text-[11px] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={handleTestMultiModeApi}
                disabled={apiIsSending}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs transition-all font-sans flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20"
              >
                <Send className="w-4 h-4" />
                <span>{apiIsSending ? 'SENDING REQUEST...' : 'EXECUTE API CALL (POST)'}</span>
              </button>
            </div>

            {/* Right: API Response & Code Snippets */}
            <div className="lg:col-span-6 space-y-4 font-mono text-xs">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-300 font-sans">HTTP RESPONSE PREVIEW</span>
                  {apiResponse && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">
                      200 OK • {apiResponse.timestamp.slice(11, 19)} UTC
                    </span>
                  )}
                </div>

                {apiResponse ? (
                  <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sky-300 text-[11px] overflow-x-auto">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                ) : (
                  <div className="p-12 text-center text-slate-500 font-sans text-xs border border-dashed border-slate-800 rounded-xl">
                    Click 'EXECUTE API CALL' to test the multi-mode booking API endpoint and inspect response payload.
                  </div>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-300 font-sans text-xs">cURL Code Snippet</span>
                  <button
                    onClick={() => {
                      setApiCopiedCode(true);
                      setTimeout(() => setApiCopiedCode(false), 1500);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-sans text-[10px] font-bold"
                  >
                    {apiCopiedCode ? 'Copied!' : 'Copy cURL'}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl text-amber-300 text-[10px] overflow-x-auto whitespace-pre-wrap">
                  {`curl -X POST https://api.oceanbird-maritime.com/v2/multimodal/book \\
  -H "Authorization: Bearer ${apiBearerToken}" \\
  -H "Content-Type: application/json" \\
  -d '${apiJsonRequest.replace(/\n/g, '')}'`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: SMART MANIFEST AI
         ========================================== */}
      {activeTab === 'smart-manifest-ai' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-purple-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>AI-POWERED BILL OF LADING & SHIPPING MANIFEST AUDIT</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Smart Manifest AI Scanner & Compliance Engine</h2>
            <p className="text-xs text-slate-300">
              Instantly audit shipping manifests, detect dangerous goods (IMO Hazmat), map international HS commodity codes, and verify weight distribution & customs duty exemptions.
            </p>
          </div>

          {/* Sample Presets Selector */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-slate-300 block">Load Sample Packing Manifest Preset:</span>
            <div className="flex flex-wrap gap-2">
              {SMART_MANIFEST_SAMPLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSmartManifestText(s.raw)}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-purple-300 border border-slate-800 rounded-xl text-xs font-bold transition-all"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Manifest Area */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-purple-300 font-sans">RAW SHIPPING MANIFEST / B/L OCR TEXT</span>
                <span className="text-[10px] text-slate-500 font-mono">AI AUDIT V2.4</span>
              </div>

              <textarea
                rows={12}
                value={smartManifestText}
                onChange={(e) => setSmartManifestText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-purple-200 text-[11px] focus:outline-none focus:border-purple-500 font-mono"
              />

              <button
                onClick={handleAnalyzeManifestAI}
                disabled={smartManifestIsAnalyzing}
                className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs transition-all font-sans flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20"
              >
                <Brain className="w-4 h-4" />
                <span>{smartManifestIsAnalyzing ? 'AI COMPLIANCE SCANNING...' : 'RUN AI MANIFEST COMPLIANCE SCAN'}</span>
              </button>
            </div>

            {/* AI Audit Output Results */}
            <div className="lg:col-span-6 space-y-4 text-xs font-sans">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">AI AUDIT SCORE</span>
                    <strong className="text-xl font-black text-white">{smartManifestAuditResult.score} / 100</strong>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase font-mono ${
                      smartManifestAuditResult.status === 'CLEARED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : smartManifestAuditResult.status === 'HAZMAT_INSPECTION_REQ'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {smartManifestAuditResult.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* HS Codes Mapped */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-300 block">Identified HS Commodity Tariff Codes:</span>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {smartManifestAuditResult.hsCodes.map((hs, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <strong className="text-purple-300">HS {hs.code}</strong> - <span className="text-slate-300">{hs.name}</span>
                        </div>
                        <span className="text-emerald-400 font-bold">{hs.compliance}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hazmat Warnings */}
                {smartManifestAuditResult.hazmats.length > 0 && (
                  <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center space-x-2 text-amber-300 font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>DANGEROUS GOODS (HAZMAT) DETECTED</span>
                    </div>
                    {smartManifestAuditResult.hazmats.map((hz, i) => (
                      <div key={i} className="text-slate-300 text-[11px] space-y-0.5">
                        <strong className="text-amber-200">{hz.class} ({hz.un})</strong>: {hz.description}
                        <p className="text-slate-400 text-[10px] font-mono">{hz.protocol}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Metrics: Tariff Estimate & Weight Balance */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">ESTIMATED CUSTOMS TARIFF</span>
                    <strong className="text-emerald-400 text-sm font-black">${smartManifestAuditResult.estimatedTariffUSD} USD</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">WEIGHT DISTRIBUTION BALANCE</span>
                    <strong className="text-sky-400 text-sm font-black">{smartManifestAuditResult.weightBalancePct}% OPTIMAL</strong>
                  </div>
                </div>

                {/* AI Checklist Recommendations */}
                <div className="space-y-2 pt-2">
                  <span className="font-bold text-slate-300 block">AI Audit Recommendations:</span>
                  <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
                    {smartManifestAuditResult.aiRecommendations.map((rec, i) => (
                      <li key={i} className="leading-relaxed">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: GLOBAL LOGISTICS HEAT MAP
         ========================================== */}
      {activeTab === 'logistics-heatmap' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 p-6 rounded-2xl border border-rose-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs">
              <Flame className="w-5 h-5 text-rose-400 animate-bounce" />
              <span>GLOBAL OCEAN SHIPPING HEAT MAP & CHOKEPOINT RADAR</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Global Logistics & Sea Lane Density Heat Map</h2>
            <p className="text-xs text-slate-300">
              Live heat visualizer for container vessel traffic density, anchorage queue congestion index, monsoonal sea swell heights, and marine bunkering fuel prices.
            </p>
          </div>

          {/* Metric Selector Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="text-slate-400 mr-2">Heat Map Metric:</span>
              <button
                onClick={() => setLogisticsHeatMapMetric('density')}
                className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                  logisticsHeatMapMetric === 'density' ? 'bg-rose-500 text-white border-rose-400 font-black' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                Traffic Density
              </button>
              <button
                onClick={() => setLogisticsHeatMapMetric('congestion')}
                className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                  logisticsHeatMapMetric === 'congestion' ? 'bg-amber-500 text-slate-950 border-amber-400 font-black' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                Port Congestion Index
              </button>
              <button
                onClick={() => setLogisticsHeatMapMetric('swell')}
                className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                  logisticsHeatMapMetric === 'swell' ? 'bg-sky-500 text-slate-950 border-sky-400 font-black' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                Monsoonal Sea Swell (m)
              </button>
              <button
                onClick={() => setLogisticsHeatMapMetric('fuel')}
                className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                  logisticsHeatMapMetric === 'fuel' ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                Bunkering Fuel ($/MT)
              </button>
            </div>

            <input
              type="text"
              placeholder="Search sea lane or port..."
              value={logisticsHeatMapSearch}
              onChange={(e) => setLogisticsHeatMapSearch(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 w-full sm:w-64"
            />
          </div>

          {/* Heat Map Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLOBAL_HEATMAP_ZONES.filter(
              (z) => z.name.toLowerCase().includes(logisticsHeatMapSearch.toLowerCase()) || z.region.toLowerCase().includes(logisticsHeatMapSearch.toLowerCase())
            ).map((zone) => (
              <div key={zone.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{zone.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{zone.region}</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 text-rose-300 rounded">
                    {zone.heatBadge}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">{zone.description}</p>

                {/* Heat Intensity Visual Meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Traffic Intensity Score</span>
                    <strong className="text-rose-400 font-bold">{zone.densityScore} / 100</strong>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                      style={{ width: `${zone.densityScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Metric Summary Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Queue Delay</span>
                    <strong className="text-amber-400">{zone.congestionText}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Sea Swell</span>
                    <strong className="text-sky-400">{zone.swellM} meters</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Active Cargo</span>
                    <strong className="text-white">{zone.activeTEU}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Fuel Price</span>
                    <strong className="text-emerald-400">${zone.fuelPriceUSD} / MT</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: LOGISTICS TIER PERKS
         ========================================== */}
      {activeTab === 'logistics-perks' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950 p-6 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
              <Award className="w-5 h-5 text-amber-400" />
              <span>EXCLUSIVE FREIGHT SHIPPER & CARRIER TIER PRIVILEGES</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Logistics & Freight Shipper Tier Perks Hub</h2>
            <p className="text-xs text-slate-300">
              Claim exclusive berth priorities, demurrage extensions, bunkering subsidies, and fast-track customs green-lane access earned through container voyage volume.
            </p>
          </div>

          {logisticsPerksNotice && (
            <div className="p-3.5 bg-amber-950/80 border border-amber-500/40 rounded-xl text-amber-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{logisticsPerksNotice}</span>
            </div>
          )}

          {/* Current Shipper Status Hero */}
          <div className="p-6 bg-slate-900 border border-amber-500/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold font-mono">
                  {logisticsTier} 👑
                </span>
                <span className="text-xs text-slate-400 font-mono">Account: Captain Alex Vance (OB-LOG-9921)</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">2,850 TEU Shipped Year-to-Date</h3>
              <p className="text-xs text-slate-300 max-w-lg">
                Your account holds Gold Fleet Master status. Unlock 24/7 priority berth allocation, 7-day demurrage waivers, and priority fuel bunkering.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center shrink-0 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">UNCLAIMED TIER REWARDS</span>
              <strong className="text-amber-400 text-2xl font-black font-mono">3 Claimable Perks</strong>
            </div>
          </div>

          {/* Claimable Perks Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LOGISTICS_PERKS_LIST.map((perk) => {
              const isClaimed = claimedPerks.includes(perk.id);
              return (
                <div key={perk.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded">
                        {perk.category}
                      </span>
                      <strong className="text-emerald-400 font-mono text-xs">{perk.valueUSD}</strong>
                    </div>

                    <h4 className="font-extrabold text-white text-sm">{perk.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{perk.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">Tier Required: {perk.tierRequired}</span>
                    <button
                      onClick={() => handleClaimPerk(perk.id, perk.title)}
                      disabled={isClaimed}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isClaimed
                          ? 'bg-slate-800 text-slate-500 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                      }`}
                    >
                      {isClaimed ? 'PERK CLAIMED ✅' : 'CLAIM THIS PERK'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: PREDICTIVE ROUTE ALERT
         ========================================== */}
      {activeTab === 'predictive-route-alert' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 p-6 rounded-2xl border border-rose-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs">
              <Radar className="w-5 h-5 text-rose-400 animate-pulse" />
              <span>PREDICTIVE MARITIME HAZARD & DELAY RADAR</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Predictive AI Route Alert Engine</h2>
            <p className="text-xs text-slate-300">
              Real-time predictive hazard monitoring across active sea lanes. AI calculates weather threat cells, port anchorage crane backlogs, and shallow tide draft risks before impact.
            </p>
          </div>

          {predictiveAlertBroadcastNotice && (
            <div className="p-3.5 bg-rose-950/90 border border-rose-500/50 rounded-xl text-rose-200 text-xs font-bold flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{predictiveAlertBroadcastNotice}</span>
            </div>
          )}

          {/* Filter Controls & Broadcast Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="text-slate-400 mr-2">Severity Filter:</span>
              {(['All', 'Critical', 'High', 'Warning', 'Info'] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setPredictiveAlertFilter(sev)}
                  className={`px-3 py-1.5 rounded-xl border transition-all ${
                    predictiveAlertFilter === sev
                      ? 'bg-rose-500 text-white border-rose-400 font-black'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            <button
              onClick={handleBroadcastRouteAlert}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-lg shadow-rose-500/20 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>BROADCAST PREDICTIVE ALERTS TO ALL CAPTAINS</span>
            </button>
          </div>

          {/* Alerts Cards List */}
          <div className="space-y-4">
            {PREDICTIVE_ROUTE_ALERTS.filter((a) => predictiveAlertFilter === 'All' || a.severity === predictiveAlertFilter).map((alert) => (
              <div key={alert.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase font-mono ${
                        alert.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : alert.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : alert.severity === 'Warning'
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      }`}
                    >
                      {alert.severity} RISK
                    </span>
                    <h4 className="font-extrabold text-white text-sm">{alert.title}</h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Region: {alert.region}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Affected Vessels</span>
                    <strong className="text-amber-400">{alert.affectedVessels} Fleet Ships</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Threat Impact Window</span>
                    <strong className="text-sky-400">{alert.impactWindow}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block">Predicted ETA Delay</span>
                    <strong className="text-rose-400">+{alert.predictedDelayHours} Hours</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono font-bold block">RECOMMENDED AI REROUTE PROTOCOL:</span>
                  <p className="text-xs text-emerald-300 font-sans">{alert.protocol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: MARITIME ESG REPORT
         ========================================== */}
      {activeTab === 'maritime-esg' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <Leaf className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span>IMO DECARBONIZATION & MARPOL ANNEX VI COMPLIANCE</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Maritime ESG & Fleet Emissions Audit Engine</h2>
            <p className="text-xs text-slate-300">
              Track carbon intensity indicator (CII) ratings, Energy Efficiency Existing Ship Index (EEXI) scores, B20 biofuel blend usage, and ballast water bio-treatment verification.
            </p>
          </div>

          {esgNotice && (
            <div className="p-3.5 bg-emerald-950/90 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{esgNotice}</span>
            </div>
          )}

          {/* KPI Dashboard Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 block">FLEET CII RATING</span>
              <strong className="text-emerald-400 text-xl font-black">Grade A (IMO Vetted)</strong>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 block">AVG EEXI EFFICIENCY</span>
              <strong className="text-sky-400 text-xl font-black">92.2 / 100 Index</strong>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 block">BIOFUEL B20 BLEND</span>
              <strong className="text-amber-400 text-xl font-black">33.4% Fleet Avg</strong>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 block">CARBON CREDITS EARNED</span>
              <strong className="text-teal-300 text-xl font-black">4,460 MT Credits</strong>
            </div>
          </div>

          {/* Controls & Export Certificate Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 font-bold">Vessel Fleet Filter:</span>
              <select
                value={esgVesselFilter}
                onChange={(e) => setEsgVesselFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="All Vessels">All Registered Fleet Ships</option>
                {ESG_FLEET_DATA.map((v) => (
                  <option key={v.imoNumber} value={v.vesselName}>
                    {v.vesselName} ({v.imoNumber})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateEsgCert}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>GENERATE OFFICIAL IMO ESG AUDIT CERTIFICATE</span>
            </button>
          </div>

          {/* Fleet ESG Breakdown Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <span className="font-extrabold text-white text-xs">REGISTERED VESSEL ENVIRONMENTAL METRICS</span>
              <span className="text-[10px] text-emerald-400 font-mono">MARPOL ANNEX VI VERIFIED ✅</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Vessel & IMO</th>
                    <th className="p-3">CII Rating</th>
                    <th className="p-3">EEXI Score</th>
                    <th className="p-3">CO2 / Voyage</th>
                    <th className="p-3">Biofuel %</th>
                    <th className="p-3">Ballast Water</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                  {ESG_FLEET_DATA.filter(
                    (v) => esgVesselFilter === 'All Vessels' || v.vesselName === esgVesselFilter
                  ).map((vessel) => (
                    <tr key={vessel.imoNumber} className="hover:bg-slate-950/50">
                      <td className="p-3">
                        <strong className="text-white block font-sans">{vessel.vesselName}</strong>
                        <span className="text-slate-500 text-[10px]">{vessel.imoNumber}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold">
                          {vessel.ciiRating}
                        </span>
                      </td>
                      <td className="p-3 text-sky-400 font-bold">{vessel.eexiScore}</td>
                      <td className="p-3 text-amber-300">{vessel.co2TonnesPerVoyage} MT</td>
                      <td className="p-3 text-emerald-400 font-bold">{vessel.biofuelBlendPct}% B20</td>
                      <td className="p-3 text-slate-300 text-[10px]">{vessel.ballastCompliance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Maritime Carbon Tax & Compliance Estimator */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>EU ETS & IMO MARITIME CARBON COMPLIANCE ESTIMATOR</span>
                </div>
                <h3 className="text-base font-extrabold text-white">Maritime Carbon Tax & Compliance Cost Calculator</h3>
                <p className="text-xs text-slate-400">
                  Calculate projected carbon allowances, CII penalties, and biofuel offset tax reductions based on voyage duration and vessel emissions profiles.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-mono text-[11px] font-bold border border-emerald-500/30 self-start sm:self-center">
                EU ETS Phase 2026 Ready
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Input Parameters Panel */}
              <div className="lg:col-span-6 space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Voyage Duration */}
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 block">
                      VOYAGE DURATION (DAYS): <span className="text-emerald-400 text-xs font-mono">{carbonVoyageDays} Days</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={45}
                      value={carbonVoyageDays}
                      onChange={(e) => setCarbonVoyageDays(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>1 Day (Coastal)</span>
                      <span>45 Days (Ocean Transit)</span>
                    </div>
                  </div>

                  {/* Daily Fuel Consumption */}
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 block">
                      DAILY FUEL CONSUMPTION: <span className="text-emerald-400 text-xs font-mono">{carbonDailyFuelTons} MT/Day</span>
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={150}
                      value={carbonDailyFuelTons}
                      onChange={(e) => setCarbonDailyFuelTons(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>5 MT (Shuttle)</span>
                      <span>150 MT (Mega Carrier)</span>
                    </div>
                  </div>
                </div>

                {/* Fuel Grade / Biofuel Blend Selection */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">PRIMARY FUEL GRADE & DECARBONIZATION BLEND</label>
                  <select
                    value={carbonFuelType}
                    onChange={(e) => setCarbonFuelType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                  >
                    <option value="HFO (Heavy Fuel Oil)">HFO - Heavy Fuel Oil (3.114 tCO2/t fuel)</option>
                    <option value="VLSFO (Very Low Sulfur)">VLSFO - Very Low Sulfur Fuel Oil (3.151 tCO2/t fuel)</option>
                    <option value="LNG (Liquefied Natural Gas)">LNG - Liquefied Natural Gas (2.750 tCO2/t fuel - 15% Green Credit)</option>
                    <option value="B30 Biofuel Blend">B30 Biofuel Blend (2.180 tCO2/t fuel - 30% Biofuel Carbon Offset)</option>
                  </select>
                </div>

                {/* Regulatory Framework & Carbon Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">REGULATORY JURISDICTION</label>
                    <select
                      value={carbonTaxJurisdiction}
                      onChange={(e) => setCarbonTaxJurisdiction(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                    >
                      <option value="EU ETS Maritime Framework">EU ETS Maritime (European Union Phase-In)</option>
                      <option value="IMO GHG Fuel Standard">IMO GHG Fuel Global Standard</option>
                      <option value="South Asia Green Shipping Corridor">South Asia Green Shipping Corridor</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">ALLOWANCE PRICE ($/TON CO2)</label>
                    <input
                      type="number"
                      value={carbonTaxRatePerTon}
                      onChange={(e) => setCarbonTaxRatePerTon(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Quick Carbon Price Presets */}
                <div className="flex items-center space-x-2 text-[10px] font-mono">
                  <span className="text-slate-500 font-bold">Benchmark Presets:</span>
                  {[60, 90, 120, 150].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setCarbonTaxRatePerTon(rate)}
                      className={`px-2 py-1 rounded border transition-all ${
                        carbonTaxRatePerTon === rate
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      ${rate}/t
                    </button>
                  ))}
                </div>
              </div>

              {/* Output & Tax Breakdown Display Panel */}
              <div className="lg:col-span-6 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs font-mono flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-bold">PROJECTED CARBON TAX & EMISSIONS SUMMARY</span>
                    <span className="text-emerald-400 text-[10px] font-bold">{carbonTaxJurisdiction}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-500 block">TOTAL FUEL CONSUMED</span>
                      <strong className="text-white text-sm">{calcTotalFuelTons.toLocaleString()} MT</strong>
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-500 block">GROSS CO2 EMISSIONS</span>
                      <strong className="text-amber-400 text-sm">{calcGrossCo2Tons.toFixed(1)} MT CO₂</strong>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 border border-emerald-500/30 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Gross Carbon Tax Liability:</span>
                      <span className="text-slate-400 font-bold">${calcGrossTaxLiability.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>

                    {calcBiofuelDiscount > 0 && (
                      <div className="flex justify-between items-center text-emerald-400 font-bold text-[11px]">
                        <span>Biofuel / Green Fuel Offset ({Math.round(calcBiofuelDiscount * 100)}%):</span>
                        <span>-${calcTaxSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      </div>
                    )}

                    <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-white font-extrabold text-sm">
                      <span>NET ESTIMATED TAX LIABILITY:</span>
                      <span className="text-emerald-400 text-base">${calcNetTaxLiability.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-200 font-sans leading-relaxed flex items-start space-x-2">
                    <Leaf className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>CII Rating Guidance:</strong> Using <strong>{carbonFuelType}</strong> for this {carbonVoyageDays}-day voyage emits approximately {calcNetCo2Tons.toFixed(1)} MT net CO₂, qualifying your ship for an <strong>IMO Grade A Carbon Intensity Certificate</strong>.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setEsgNotice(`Maritime Carbon Tax Compliance Estimate ($${calcNetTaxLiability.toLocaleString('en-US', { maximumFractionDigits: 0 })}) attached to voyage manifest!`);
                    setTimeout(() => setEsgNotice(null), 5000);
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
                >
                  <Coins className="w-4 h-4" />
                  <span>ATTACH ESTIMATED CARBON TAX TO VOYAGE MANIFEST</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: DIGITAL CARGO SIGNATURE
         ========================================== */}
      {activeTab === 'digital-signature' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-cyan-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
              <QrCode className="w-5 h-5 text-cyan-400" />
              <span>CRYPTOGRAPHIC e-BL ELECTRONIC BILL OF LADING SIGNATURE ENGINE</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Digital Cargo Signature & Chain of Custody</h2>
            <p className="text-xs text-slate-300">
              Sign and verify electronic Bills of Lading (e-BL), customs clearance releases, and vessel captain handovers with Ed25519 public-key encryption and SHA-256 tamper-proof timestamps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Signature Input Panel */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
                Execute Digital Signature Seal
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">SIGNER ROLE</label>
                  <select
                    value={digitalSignerRole}
                    onChange={(e) => setDigitalSignerRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Shipper">Shipper (Consignor Authorized Officer)</option>
                    <option value="Carrier Master">Carrier Master (Ship Captain / Pilot)</option>
                    <option value="Port Customs Authority">Port Customs Authority Officer</option>
                    <option value="Consignee">Consignee (Cargo Receiver)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">SIGNER FULL NAME</label>
                  <input
                    type="text"
                    value={digitalSignerName}
                    onChange={(e) => setDigitalSignerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">CARGO e-BL DOCUMENT REF</label>
                  <input
                    type="text"
                    value={digitalDocReference}
                    onChange={(e) => setDigitalDocReference(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 font-mono text-[10px] text-slate-400">
                  <span className="text-cyan-400 font-bold block">CRYPTOGRAPHIC KEY PAIR:</span>
                  <p>Public Key: 0x9f182...40182a</p>
                  <p>Algorithm: Ed25519-EdDSA + SHA256</p>
                </div>

                <button
                  onClick={handleExecuteDigitalSignature}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20"
                >
                  SIGN & APPLY CRYPTOGRAPHIC SEAL TO e-BL
                </button>
              </div>
            </div>

            {/* Verification Status Card */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs font-sans">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="font-extrabold text-white text-sm">CRYPTOGRAPHIC VERIFICATION SEAL</span>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-mono font-bold">
                  VERIFIED VALID ✅
                </span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">DOCUMENT REFERENCE</span>
                  <strong className="text-cyan-300 text-sm">{digitalDocReference}</strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">AUTHENTICATED SIGNER</span>
                  <strong className="text-white text-xs">{digitalSignerName} ({digitalSignerRole})</strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">TIMESTAMP SEAL</span>
                  <strong className="text-emerald-400 text-xs">{digitalSignatureResult.signedAt}</strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">SHA-256 SIGNATURE HASH</span>
                  <span className="text-[10px] text-slate-400 break-all block">{digitalSignatureResult.signatureHash}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">ON-CHAIN VERIFICATION TOKEN</span>
                  <span className="text-[10px] text-purple-300 font-bold block">{digitalSignatureResult.verificationQr}</span>
                </div>
              </div>

              <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-[11px] text-cyan-200 leading-relaxed">
                This electronic Bill of Lading signature is legally binding under UNCITRAL Model Law on Electronic Transferable Records (MLETR) & IMO FAL Convention.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: DYNAMIC PORT SLOTTING
         ========================================== */}
      {activeTab === 'dynamic-slotting' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-sky-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs">
              <Clock className="w-5 h-5 text-sky-400" />
              <span>DYNAMIC PORT BERTH & GANTRY CRANE SLOTTING ENGINE</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Dynamic Port Slotting & Pilotage Scheduling</h2>
            <p className="text-xs text-slate-300">
              Reserve gantry crane berth windows, align slow-steaming arrival speeds, and eliminate port anchorage idle delays with guaranteed arrival time slots.
            </p>
          </div>

          {slottingNotice && (
            <div className="p-3.5 bg-sky-950/90 border border-sky-500/50 rounded-xl text-sky-200 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{slottingNotice}</span>
            </div>
          )}

          {/* Port Selector & Date Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block font-bold mb-1">TARGET PORT</label>
                <select
                  value={slottingPort}
                  onChange={(e) => setSlottingPort(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Colombo Port (LK)">Colombo Port (Sri Lanka)</option>
                  <option value="JNPT Mumbai (IN)">JNPT Mumbai (India)</option>
                  <option value="Malé Harbour (MV)">Malé Commercial Harbour (Maldives)</option>
                  <option value="Singapore Port (SG)">Singapore Container Terminal</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block font-bold mb-1">ARRIVAL DATE</label>
                <input
                  type="date"
                  value={slottingDate}
                  onChange={(e) => setSlottingDate(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleConfirmPortSlot}
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-sky-500/20 shrink-0"
            >
              CONFIRM & LOCK BERTH SLOT RESERVATION
            </button>
          </div>

          {/* Slot Grid Selection */}
          <div className="space-y-3">
            <span className="font-extrabold text-white text-xs block">Available Gantry Crane Berth Windows:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PORT_SLOTS.map((slot, i) => {
                const isSelected = selectedSlotTime.includes(slot.time);
                return (
                  <div
                    key={i}
                    onClick={() => slot.status !== 'BOOKED' && setSelectedSlotTime(`${slot.time} (${slot.berth})`)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                        : slot.status === 'BOOKED'
                        ? 'bg-slate-950 border-slate-800/60 opacity-50 cursor-not-allowed'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-mono">
                      <strong className="text-sky-300 font-bold">{slot.time}</strong>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          slot.status === 'BOOKED'
                            ? 'bg-rose-500/20 text-rose-300'
                            : slot.status === 'SELECTED' || isSelected
                            ? 'bg-sky-500/20 text-sky-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {isSelected ? 'SELECTED' : slot.status}
                      </span>
                    </div>

                    <p className="text-xs text-white font-bold">{slot.berth}</p>
                    <span className="text-[10px] text-slate-400 block font-mono">Current Allocation: {slot.vessel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: PREDICTIVE SUPPLY HUB
         ========================================== */}
      {activeTab === 'predictive-supply-hub' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 p-6 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
              <Boxes className="w-5 h-5 text-amber-400" />
              <span>AI MARINE SUPPLY HUB & AUTOMATED REPLENISHMENT ENGINE</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Predictive Marine Supply Hub & Demand Forecast</h2>
            <p className="text-xs text-slate-300">
              AI-driven inventory forecasting for bunkering fuel, main engine lubricants, reefer electrical gear, and fresh water. Triggers automated supply barge dispatch before stockout.
            </p>
          </div>

          {supplyDispatchNotice && (
            <div className="p-3.5 bg-amber-950/90 border border-amber-500/50 rounded-xl text-amber-200 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{supplyDispatchNotice}</span>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex items-center space-x-2 bg-slate-900 p-3 rounded-2xl border border-slate-800 text-xs font-bold">
            <span className="text-slate-400">Category Filter:</span>
            {['All', 'Bunkering Fuel', 'Engine Lube', 'Electrical Plugs', 'Fresh Water'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSupplyCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  supplyCategoryFilter === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Inventory Items Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PREDICTIVE_SUPPLY_ITEMS.filter(
              (item) => supplyCategoryFilter === 'All' || item.category === supplyCategoryFilter
            ).map((item) => (
              <div key={item.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{item.itemName}</h4>
                      <span className="text-[10px] text-amber-300 font-mono">{item.hubLocation}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[10px] font-mono font-bold">
                      {item.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">CURRENT STOCK</span>
                      <strong className="text-white">{item.currentStock}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">RUNOUT PROJECTION</span>
                      <strong className={item.runoutDays < 3 ? 'text-rose-400' : 'text-emerald-400'}>
                        {item.runoutDays} Days Left
                      </strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-200/90 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    AI Demand Alert: {item.demandStatus}
                  </p>
                </div>

                <button
                  onClick={() => handleTriggerSupplyDispatch(item.itemName, item.recommendedOrderQty)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
                >
                  DISPATCH EMERGENCY REPLENISHMENT ({item.recommendedOrderQty})
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Airways Flight Booking & Live Radar Tracker View */}
      {activeTab === 'airways-booking-tracker' && (
        <AirwaysBookingAndFlightTracker />
      )}

      {/* 1. Airways Passenger Ticket Portal Option */}
      {activeTab === 'airways-passenger-portal' && (
        <AirwaysPassengerPortal />
      )}

      {/* 2. Airways Cargo & Courier Logistics Portal Option */}
      {activeTab === 'airways-cargo-portal' && (
        <AirwaysCargoPortal />
      )}

      {/* 3. Cruise Ship Passenger Ticket Portal Option */}
      {activeTab === 'cruise-passenger-portal' && (
        <CruisePassengerPortal />
      )}

      {/* 4. Marine Cargo & Courier Logistics Portal Option */}
      {activeTab === 'marine-cargo-portal' && (
        <MarineCargoPortal />
      )}

      {/* Offline Flight Booking & Tracking Cache View */}
      {activeTab === 'offline-flight-cache' && (
        <OfflineFlightCacheManager />
      )}
      {selectedMultiModalPass && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl max-w-2xl w-full p-6 text-white space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h3 className="font-extrabold text-lg text-white">UNIFIED MULTI-MODAL MASTER BOARDING PASS</h3>
              </div>
              <button
                onClick={() => setSelectedMultiModalPass(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 rounded-2xl border border-indigo-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">UNIFIED MASTER PNR</span>
                  <strong className="text-xl font-black text-indigo-400 font-mono">{selectedMultiModalPass.pnr}</strong>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-700 shrink-0">
                  <QrCode className="w-16 h-16 text-slate-950" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-slate-800 py-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">Lead Passenger</span>
                  <strong className="text-white">{selectedMultiModalPass.passengerName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Passport No</span>
                  <span className="text-indigo-300 font-mono font-bold">{selectedMultiModalPass.passportId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Baggage Tag Lock</span>
                  <span className="text-emerald-400 font-mono text-[11px]">{(selectedMultiModalPass as any).baggageTagCode || (selectedMultiModalPass as any).tagCode || 'TAG-9082'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Status</span>
                  <span className="text-emerald-300 font-bold">Guaranteed Connection</span>
                </div>
              </div>

              {/* Connected Segments Details */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">Connected Voyage & Flight Segments</span>

                <div className="p-3 bg-slate-900 rounded-xl border border-teal-500/30 space-y-1">
                  <div className="flex items-center justify-between text-teal-300 font-bold">
                    <span className="flex items-center space-x-1">
                      <Ship className="w-4 h-4" />
                      <span>{selectedMultiModalPass.cruiseLeg.vesselName}</span>
                    </span>
                    <span className="font-mono text-[10px]">Cabin: {(selectedMultiModalPass.cruiseLeg as any).cabinType || selectedMultiModalPass.cruiseLeg.cabinClass}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Route: {selectedMultiModalPass.cruiseLeg.route}</div>
                  <div className="text-[10px] text-slate-400">Sailing Date: {(selectedMultiModalPass.cruiseLeg as any).departureDate || selectedMultiModalPass.cruiseLeg.travelDate}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-sky-500/30 space-y-1">
                  <div className="flex items-center justify-between text-sky-300 font-bold">
                    <span className="flex items-center space-x-1">
                      <Plane className="w-4 h-4" />
                      <span>{selectedMultiModalPass.flightLeg.carrier}</span>
                    </span>
                    <span className="font-mono text-[10px]">{(selectedMultiModalPass.flightLeg as any).classType || selectedMultiModalPass.flightLeg.flightClass}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Route: {selectedMultiModalPass.flightLeg.route}</div>
                  <div className="text-[10px] text-slate-400">Departure: {selectedMultiModalPass.flightLeg.flightDate}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/30 space-y-1">
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span className="flex items-center space-x-1">
                      <Truck className="w-4 h-4" />
                      <span>{selectedMultiModalPass.shuttleLeg.provider}</span>
                    </span>
                    <span className="font-mono text-[10px]">Guaranteed Express</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Transfer Route: {selectedMultiModalPass.shuttleLeg.transferRoute}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT MASTER PASS & BAGGAGE LABELS</span>
              </button>
              <button
                onClick={() => setSelectedMultiModalPass(null)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: INSPECT & PRINT CARGO MANIFEST
         ========================================== */}
      {activeManifestModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-purple-500/50 rounded-2xl max-w-3xl w-full p-6 text-white space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-400" />
                <h3 className="font-extrabold text-lg text-white">OFFICIAL IMO / IATA CARGO MANIFEST SHEET</h3>
              </div>
              <button
                onClick={() => setActiveManifestModal(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">MANIFEST REGISTRY NO</span>
                  <strong className="text-xl font-black text-purple-300">{activeManifestModal.manifestId}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">CUSTOMS SEAL STAMP</span>
                  <strong className="text-amber-400">{activeManifestModal.customsSealCode}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">Carrier Vessel / Aircraft</span>
                  <strong className="text-white">{activeManifestModal.carrierOrVessel}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Voyage / Flight</span>
                  <span className="text-amber-300">{activeManifestModal.voyageOrFlightNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Origin Port</span>
                  <span className="text-slate-300">{activeManifestModal.originHub}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Destination Port</span>
                  <span className="text-slate-300">{activeManifestModal.destinationHub}</span>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <span className="font-bold text-slate-300 block text-xs">CARGO PARCEL MANIFEST LOG ({activeManifestModal.items.length} ITEMS)</span>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">B/L or AWB No</th>
                        <th className="p-2.5">Description</th>
                        <th className="p-2.5">Consignor</th>
                        <th className="p-2.5">Consignee</th>
                        <th className="p-2.5 text-right">Weight (KG)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {activeManifestModal.items.map((item) => (
                        <tr key={item.itemId}>
                          <td className="p-2.5 font-bold text-purple-300">{item.billOfLadingOrAwb}</td>
                          <td className="p-2.5 text-white">{item.description}</td>
                          <td className="p-2.5 text-slate-400">{item.consignor}</td>
                          <td className="p-2.5 text-slate-400">{item.consignee}</td>
                          <td className="p-2.5 text-right text-amber-300 font-bold">{item.weightKg.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px]">
                <span>Total Gross Tonnage: <strong className="text-emerald-400 font-bold">{(activeManifestModal.totalWeightKg / 1000).toFixed(1)} Metric Tons</strong></span>
                <span>Signoff: <strong className="text-purple-300">{(activeManifestModal as any).captainPilotSignoff || (activeManifestModal as any).captainSignoff || 'Capt. J. Miller'}</strong></span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT IMO / IATA MANIFEST DOCUMENT</span>
              </button>
              <button
                onClick={() => setActiveManifestModal(null)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 3: GENERATE NEW MANIFEST FORM
         ========================================== */}
      {isGenerateManifestModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-purple-500/50 rounded-2xl max-w-xl w-full p-6 text-white space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-purple-400" />
                <h3 className="font-extrabold text-lg text-white">Generate Official Cargo Manifest</h3>
              </div>
              <button
                onClick={() => setIsGenerateManifestModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleGenerateOfficialManifest} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Transport Category</label>
                  <select
                    value={genTransportType}
                    onChange={(e) => setGenTransportType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Ocean Vessel">Ocean Container Vessel (IMO)</option>
                    <option value="Air Cargo Flight">Air Cargo Carrier Flight (IATA)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Carrier / Vessel Name</label>
                  <input
                    type="text"
                    required
                    value={genCarrierOrVessel}
                    onChange={(e) => setGenCarrierOrVessel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Voyage or Flight No</label>
                  <input
                    type="text"
                    required
                    value={genVoyageOrFlightNo}
                    onChange={(e) => setGenVoyageOrFlightNo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Departure Date</label>
                  <input
                    type="date"
                    required
                    value={genDepartureDate}
                    onChange={(e) => setGenDepartureDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Origin Port / Hub</label>
                  <input
                    type="text"
                    required
                    value={genOriginHub}
                    onChange={(e) => setGenOriginHub(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Destination Port / Hub</label>
                  <input
                    type="text"
                    required
                    value={genDestHub}
                    onChange={(e) => setGenDestHub(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Customs Seal Code</label>
                  <input
                    type="text"
                    required
                    value={genCustomsSealCode}
                    onChange={(e) => setGenCustomsSealCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-purple-300 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Captain / Pilot Signoff</label>
                  <input
                    type="text"
                    required
                    value={genCaptainPilotName}
                    onChange={(e) => setGenCaptainPilotName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-purple-500/20"
              >
                CREATE OFFICIAL MANIFEST & SEAL DOCUMENT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 4: LOYALTY PERK VOUCHER REDEEMED
         ========================================== */}
      {redeemedCouponModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-md w-full p-6 text-white space-y-4 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black mx-auto shadow-lg shadow-amber-500/30">
              <Gift className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-white">Loyalty Perk Voucher Issued!</h3>
            <p className="text-xs text-slate-300">{redeemedCouponModal.perkName}</p>

            <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">REDEMPTION VOUCHER CODE</span>
              <strong className="text-2xl font-black text-amber-400 font-mono tracking-wider">{redeemedCouponModal.code}</strong>
            </div>

            <p className="text-[11px] text-teal-400">
              Present this voucher code at port lounge / check-in desk or apply during checkout.
            </p>

            <button
              onClick={() => setRedeemedCouponModal(null)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              DONE & RETURN TO LOYALTY PORTAL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
