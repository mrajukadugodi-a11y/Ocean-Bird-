import React, { useState, useRef } from 'react';
import { AssetAuthenticityBadge } from './AssetAuthenticityBadge';
import oceanDollar1000NoteImg from '../assets/images/ocean_dollar_1000_note_1787143915335.jpg';
import oceanDollar100NoteImg from '../assets/images/ocean_dollar_banknote_1787143582965.jpg';
import oceanDollarNoteImg from '../assets/images/ocean_dollar_note_1787035621218.jpg';
import oceanDollarPhysicalImg from '../assets/images/ocean_dollar_physical_1786785193998.jpg';
import oceanDollarBarImg from '../assets/images/ocean_dollar_bar_1787036330529.jpg';
import oceanDollarCoinImg from '../assets/images/ocean_dollar_coin_1787036309582.jpg';
import { 
  Sparkles, Download, ShieldCheck, Check, Copy, Sliders, Image as ImageIcon, 
  Layers, Award, FileText, CheckCircle2, Zap, Radio, Globe, DollarSign, Lock, Unlock, PlusCircle,
  ExternalLink, Eye, ChevronRight, Compass, Anchor, Upload, Trash2, RefreshCw, 
  Maximize2, Cpu, Filter, Search, Sun, Moon, Info, ShieldAlert, Coins
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export type OdDenomination = '10' | '20' | '50' | '100' | '500' | '1000';
export type FoilAccentColor = 'HOLOGRAPHIC_SILVER' | 'GOLD_24K' | 'OCEAN_CYAN' | 'VIOLET_PLASMA';
export type WatermarkMotif = 'BLUE_WHALE' | 'LIGHTHOUSE_ANCHOR' | 'SEA_DRAGON' | 'POSEIDON_TRIDENT';

export interface DenominationDetail {
  denomination: OdDenomination;
  valUSD: number;
  label: string;
  title: string;
  color: string;
  bgGradient: string;
  borderAccent: string;
  substrate: string;
  reserveBacking: string;
  securityFeature: string;
  img: string;
  badge: string;
  watermark: string;
  microtext: string;
}

export const DENOMINATIONS_DATA: Record<OdDenomination, DenominationDetail> = {
  '10': {
    denomination: '10',
    valUSD: 10,
    label: '$10 OD',
    title: 'Fishermen & Coastal Heritage Commemorative',
    color: '#10b981',
    bgGradient: 'from-emerald-950/40 via-slate-900 to-slate-950',
    borderAccent: 'border-emerald-500/50',
    substrate: 'Polymer Cotton Hybrid (85 g/m²)',
    reserveBacking: '$10.00 USD Marine Conservation & Fisheries Fund',
    securityFeature: 'Optically Variable Bioluminescent Plankton Thread',
    img: oceanDollarNoteImg,
    badge: 'CIRCULATION NOTE',
    watermark: '🐋 Blue Whale Sentinel',
    microtext: 'OCEAN-DOLLAR-MARITIME-HERITAGE-10-SERIES-2026'
  },
  '20': {
    denomination: '20',
    valUSD: 20,
    label: '$20 OD',
    title: 'Ferdinand Magellan Global Navigation Note',
    color: '#06b6d4',
    bgGradient: 'from-cyan-950/40 via-slate-900 to-slate-950',
    borderAccent: 'border-cyan-500/50',
    substrate: 'Polymer Cotton Matrix (95 g/m²)',
    reserveBacking: '$20.00 USD Maritime Navigation & Cartography Reserve',
    securityFeature: 'Optically Variable Magellanic Compass Holographic Strip',
    img: oceanDollarNoteImg,
    badge: 'CIRCULATION NOTE',
    watermark: '🧭 Magellanic Compass Rose & Anchor',
    microtext: 'FERDINAND-MAGELLAN-GLOBAL-CIRCUMNAVIGATION-20-OD-2026'
  },
  '50': {
    denomination: '50',
    valUSD: 50,
    label: '$50 OD',
    title: 'Seafarer Navigation & Lighthouse Note',
    color: '#38bdf8',
    bgGradient: 'from-sky-950/40 via-slate-900 to-slate-950',
    borderAccent: 'border-sky-500/50',
    substrate: 'Durasafe® Dual-Polymer Shield (105 µm)',
    reserveBacking: '$50.00 USD Port Navigation & Beacon Tariff Fund',
    securityFeature: 'Lighthouse Beacon Holographic Foil Strip',
    img: oceanDollarPhysicalImg,
    badge: 'CIRCULATION NOTE',
    watermark: '⚓ Lighthouse & Compass Rose',
    microtext: 'SEAFARER-NAVIGATION-LIGHTHOUSE-50-ISO20022'
  },
  '100': {
    denomination: '100',
    valUSD: 100,
    label: '$100 OD',
    title: 'Commercial Port & Shipping Flagship Standard',
    color: '#f59e0b',
    bgGradient: 'from-amber-950/40 via-slate-900 to-slate-950',
    borderAccent: 'border-amber-500/50',
    substrate: 'High-Security Intaglio Polymer Matrix (115 µm)',
    reserveBacking: '$100.00 USD Gold Bullion & Container Tariff Receivables',
    securityFeature: 'Dynamic 3D Color-ShiftingPoseidon Trident',
    img: oceanDollar100NoteImg,
    badge: 'FLAGSHIP STANDARD',
    watermark: '🔱 Poseidon Golden Trident',
    microtext: 'COMMERCIAL-PORT-SHIPPING-STANDARD-100-FULL-BACKED'
  },
  '500': {
    denomination: '500',
    valUSD: 500,
    label: '$500 OD',
    title: 'Maritime Logistics & Cargo Terminal Note',
    color: '#a855f7',
    bgGradient: 'from-purple-950/40 via-slate-900 to-slate-950',
    borderAccent: 'border-purple-500/50',
    substrate: 'Magnetic Security Substrate with RFID Microchip',
    reserveBacking: '$500.00 USD Container Freight Receivables & Carbon Credits',
    securityFeature: 'Encrypted Quantum Serial Barcode & Purple UV Glow',
    img: oceanDollarPhysicalImg,
    badge: 'HIGH DENOMINATION',
    watermark: '🐉 Sea Dragon Logistics Guardian',
    microtext: 'MARITIME-LOGISTICS-FREIGHT-RECEIVABLES-500-SECURITY'
  },
  '1000': {
    denomination: '1000',
    valUSD: 1000,
    label: '$1,000 OD',
    title: 'Sovereign Gold Reserve Bullion Note',
    color: '#eab308',
    bgGradient: 'from-yellow-950/50 via-slate-900 to-slate-950',
    borderAccent: 'border-yellow-500/60',
    substrate: '24K Gold-Infused Metallic Polymer Matrix',
    reserveBacking: '1/4 oz Pure Physical 999.9 Vault Gold Bullion',
    securityFeature: 'Embedded Micro-Gold Foil Flakes & ECDSA Signature',
    img: oceanDollar1000NoteImg,
    badge: 'SOVEREIGN RESERVE',
    watermark: '👑 Sovereign Crown & Gold Anchor',
    microtext: 'SOVEREIGN-GOLD-BULLION-RESERVE-1000-XOD-VAULTED'
  }
};

export interface GoldCoinDetail {
  denomination: OdDenomination;
  valUSD: number;
  label: string;
  shape: 'ROUND' | 'OVAL';
  obverseDescription: string;
  reverseExplorer: string;
  dobDod: string;
  quote: string;
  roleTitle: string;
  motto: string;
  purity: string;
  weight: string;
  explorerTitle: string;
}

export const GOLD_COINS_DATA: Record<OdDenomination, GoldCoinDetail> = {
  '10': {
    denomination: '10',
    valUSD: 10,
    label: '$10 OD Gold Coin',
    shape: 'ROUND',
    obverseDescription: 'Sailing Galleon Vessel in Heavy Sea, Anchor & "Freedom • Voyage • Discovery"',
    reverseExplorer: 'Amerigo Vespucy (Amerigo Vespucci)',
    explorerTitle: 'Amerigo Vespucy',
    dobDod: 'DOB: 9 MARCH 1454  ★  DOD: 22 FEBRUARY 1512',
    quote: '"He whose name gave the world a new identity and a new continent."',
    roleTitle: 'EXPLORER • NAVIGATOR • VISIONARY',
    motto: 'FREEDOM • VOYAGE • DISCOVERY',
    purity: '24K Gold (999.9 Fine Pure)',
    weight: '1/10 Troy Oz (3.11 grams)'
  },
  '20': {
    denomination: '20',
    valUSD: 20,
    label: '$20 OD Oval Sovereign Coin',
    shape: 'OVAL',
    obverseDescription: 'Oval Sailing Ship, Compass Rose, World Map Dotted Route & Anchor Seal',
    reverseExplorer: 'Ferdinand Magellan',
    explorerTitle: 'Ferdinand Magellan',
    dobDod: 'DOB: 1480  ★  DOD: 27 APRIL 1521',
    quote: '"Portuguese explorer, first to lead the expedition that circumnavigated the Earth."',
    roleTitle: 'ONE OCEAN • ONE HUMANITY • ONE FUTURE',
    motto: 'EXPLORE • DISCOVER • RESPECT • PROTECT',
    purity: '24K Gold (999.9 Fine Pure)',
    weight: '1/5 Troy Oz (6.22 grams)'
  },
  '50': {
    denomination: '50',
    valUSD: 50,
    label: '$50 OD Gold Coin',
    shape: 'ROUND',
    obverseDescription: 'Sailing Vessel on Open Waves with Star Border & Anchor Emblem',
    reverseExplorer: 'Bhartalomia Dayason (Bartolomeu Dias)',
    explorerTitle: 'Bhartalomia Dayason',
    dobDod: 'DOB: 1450  ★  DOD: 1525',
    quote: '"The map is not the land, but it guides us across the unknown."',
    roleTitle: 'CARTOGRAPHER • EXPLORER • PIONEER',
    motto: 'FREEDOM • VOYAGE • DISCOVERY',
    purity: '24K Gold (999.9 Fine Pure)',
    weight: '1/2 Troy Oz (15.55 grams)'
  },
  '100': {
    denomination: '100',
    valUSD: 100,
    label: '$100 OD Gold Coin',
    shape: 'ROUND',
    obverseDescription: 'Full-Rigged Galleon Flagship with Micro-Guilloche Compass Border',
    reverseExplorer: 'Christopher Columbus',
    explorerTitle: 'Christopher Columbus',
    dobDod: 'DOB: 31 OCTOBER 1451  ★  DOD: 20 MAY 1506',
    quote: '"You can never cross the ocean until you have the courage to lose sight of the shore."',
    roleTitle: 'EXPLORER • DISCOVERER • PIONEER',
    motto: 'FREEDOM • VOYAGE • DISCOVERY',
    purity: '24K Gold (999.9 Fine Pure)',
    weight: '1.00 Troy Oz (31.1 grams)'
  },
  '500': {
    denomination: '500',
    valUSD: 500,
    label: '$500 OD Gold Coin',
    shape: 'ROUND',
    obverseDescription: 'Heavy Galleon Flagship Navigating Stormy Reefs & Compass Rosette',
    reverseExplorer: 'Vasco Da Gama',
    explorerTitle: 'Vasco Da Gama',
    dobDod: 'DOB: 1460  ★  DOD: 24 DECEMBER 1524',
    quote: '"He who does not courage the sea, can only see the shore."',
    roleTitle: 'EXPLORER • NAVIGATOR • PIONEER',
    motto: 'FREEDOM • VOYAGE • DISCOVERY',
    purity: '24K Gold (999.9 Fine Pure)',
    weight: '5.00 Troy Oz (155.5 grams)'
  },
  '1000': {
    denomination: '1000',
    valUSD: 1000,
    label: '$1,000 OD Sovereign Master Coin',
    shape: 'ROUND',
    obverseDescription: 'Master Galleon Flagship with 24K Deep Relief Engraving & Anchor Badge',
    reverseExplorer: 'Marco Polo',
    explorerTitle: 'Marco Polo',
    dobDod: 'DOB: 15 SEPTEMBER 1254  ★  DOD: 8 JANUARY 1324',
    quote: '"The journey of a thousand miles begins with a single step."',
    roleTitle: 'EXPLORER • TRAVELER • LEGEND',
    motto: 'FREEDOM • VOYAGE • DISCOVERY',
    purity: '24K Gold (999.9 Fine Vault Master)',
    weight: '10.00 Troy Oz (311.0 grams)'
  }
};

export interface UploadedSpecimenNote {
  id: string;
  name: string;
  denominationDetected: string;
  valUSD: number;
  serialNumber: string;
  authenticityScore: number;
  uploadedAt: string;
  imgUrl: string;
  status: 'VERIFIED_GENUINE' | 'PENDING_REVIEW' | 'COLLECTOR_SPECIMEN';
  notes?: string;
  type: 'BANKNOTE' | 'CRYPTO_GOLD_COIN' | 'BULLION_BAR';
  isColdStorage?: boolean;
  explorer?: string;
  badgeType?: 'GENUINE_99_8' | 'ISO_20022' | 'ECDSA_NFC' | '24K_GOLD' | 'POLYMER_COTTON';
}

const SAMPLE_USER_SPECIMENS: UploadedSpecimenNote[] = [
  {
    id: 'specimen-001',
    name: 'Specimen $1,000 Sovereign Bullion Note (Marco Polo Edition)',
    denominationDetected: '$1,000 OD',
    valUSD: 1000,
    serialNumber: 'OD-2026-GOLD-0019',
    authenticityScore: 99.8,
    uploadedAt: 'Aug 26, 2026',
    imgUrl: oceanDollar1000NoteImg,
    status: 'VERIFIED_GENUINE',
    notes: '24K Gold Flake verification confirmed via optical scanner.',
    type: 'BANKNOTE',
    isColdStorage: true,
    explorer: 'Marco Polo',
    badgeType: '24K_GOLD'
  },
  {
    id: 'specimen-002',
    name: 'Specimen $20 Magellan Global Navigation Banknote',
    denominationDetected: '$20 OD',
    valUSD: 20,
    serialNumber: 'OD-2026-MAG-9921',
    authenticityScore: 99.6,
    uploadedAt: 'Aug 26, 2026',
    imgUrl: oceanDollarNoteImg,
    status: 'VERIFIED_GENUINE',
    notes: 'Magellanic Compass rose watermark and micro-print validated.',
    type: 'BANKNOTE',
    isColdStorage: false,
    explorer: 'Ferdinand Magellan',
    badgeType: 'POLYMER_COTTON'
  },
  {
    id: 'specimen-003',
    name: 'Ocean Dollar Crypto 24K Gold Sovereign Coin ($1,000 OD)',
    denominationDetected: '$1,000 OD',
    valUSD: 1000,
    serialNumber: 'XOD-COIN-9999-VAULT',
    authenticityScore: 99.9,
    uploadedAt: 'Aug 26, 2026',
    imgUrl: oceanDollarCoinImg,
    status: 'VERIFIED_GENUINE',
    notes: '1 oz Physical 999.9 Fine Gold Coin with ECDSA Encrypted NFC Chip.',
    type: 'CRYPTO_GOLD_COIN',
    isColdStorage: true,
    explorer: 'Marco Polo',
    badgeType: 'ECDSA_NFC'
  },
  {
    id: 'specimen-004',
    name: 'Specimen $100 Christopher Columbus Flagship Note',
    denominationDetected: '$100 OD',
    valUSD: 100,
    serialNumber: 'OD-2026-COL-1492',
    authenticityScore: 99.7,
    uploadedAt: 'Aug 26, 2026',
    imgUrl: oceanDollar100NoteImg,
    status: 'VERIFIED_GENUINE',
    notes: 'Intaglio micro-guilloche & oceanic compass foil strip authenticated.',
    type: 'BANKNOTE',
    isColdStorage: false,
    explorer: 'Christopher Columbus',
    badgeType: 'ISO_20022'
  },
  {
    id: 'specimen-005',
    name: 'Ocean Dollar 100g Physical Gold Bullion Bar',
    denominationDetected: '$1,000 OD',
    valUSD: 1000,
    serialNumber: 'BAR-XOD-2026-9999',
    authenticityScore: 100.0,
    uploadedAt: 'Aug 25, 2026',
    imgUrl: oceanDollarBarImg,
    status: 'VERIFIED_GENUINE',
    notes: '24K Sealed Vault Bar stored in Zurich Freeport Vault.',
    type: 'BULLION_BAR',
    isColdStorage: true,
    explorer: 'Vasco Da Gama',
    badgeType: 'GENUINE_99_8'
  },
  {
    id: 'specimen-006',
    name: 'Specimen $50 Bartolomeu Dias Cartography Note',
    denominationDetected: '$50 OD',
    valUSD: 50,
    serialNumber: 'OD-2026-DIAS-5021',
    authenticityScore: 99.4,
    uploadedAt: 'Aug 25, 2026',
    imgUrl: oceanDollarPhysicalImg,
    status: 'VERIFIED_GENUINE',
    notes: 'Bioluminescent plankton thread and Cape compass seal confirmed.',
    type: 'BANKNOTE',
    isColdStorage: false,
    explorer: 'Bartolomeu Dias',
    badgeType: 'GENUINE_99_8'
  }
];

export const OceanDollarVisualAndSpecPortal: React.FC = () => {
  // Navigation & Sub-views
  const [activeTab, setActiveTab] = useState<'DIGITAL_VAULT' | 'DENOM_TRACKER' | 'DENOMINATIONS' | 'CRYPTO_COINS' | 'SPECIMEN_UPLOAD' | 'DESIGNER' | 'SPECS'>('DENOMINATIONS');

  // Selected Denomination for Visualizer
  const [selectedDenom, setSelectedDenom] = useState<OdDenomination>('1000');
  const [selectedFoil, setSelectedFoil] = useState<FoilAccentColor>('GOLD_24K');
  const [selectedWatermark, setSelectedWatermark] = useState<WatermarkMotif>('BLUE_WHALE');
  const [generatedSerial, setGeneratedSerial] = useState<string>('OD-2026-X892-GEN');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [uvLightMode, setUvLightMode] = useState<boolean>(false);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  // Crypto Gold Coin Showcase State
  const [activeCoinTab, setActiveCoinTab] = useState<'COIN_24K' | 'GOLD_BAR' | 'PROOFE_CAMEO'>('COIN_24K');
  const [selectedCoinDenom, setSelectedCoinDenom] = useState<OdDenomination>('1000');
  const [coinFlipped, setCoinFlipped] = useState<boolean>(false);

  // Specimen Upload State
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedSpecimens, setUploadedSpecimens] = useState<UploadedSpecimenNote[]>(SAMPLE_USER_SPECIMENS);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedSpecimenForModal, setSelectedSpecimenForModal] = useState<UploadedSpecimenNote | null>(null);
  const [uploadDragOver, setUploadDragOver] = useState<boolean>(false);

  // Currency Gallery Filters
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<'ALL' | 'BANKNOTE' | 'CRYPTO_GOLD_COIN' | 'BULLION_BAR'>('ALL');
  const [galleryDenomFilter, setGalleryDenomFilter] = useState<'ALL' | '10' | '20' | '50' | '100' | '500' | '1000'>('ALL');
  const [galleryStatusFilter, setGalleryStatusFilter] = useState<'ALL' | 'VERIFIED_GENUINE' | 'PENDING_REVIEW' | 'COLLECTOR_SPECIMEN'>('ALL');
  const [galleryExplorerFilter, setGalleryExplorerFilter] = useState<string>('ALL');
  const [gallerySearchQuery, setGallerySearchQuery] = useState<string>('');

  // Digital Vault State & Audit Log
  const [vaultActivityLog, setVaultActivityLog] = useState([
    { id: 'act-1', timestamp: '12:04 PM', action: 'Cold Storage Vault Sealed', itemTitle: 'Specimen $1,000 Sovereign Bullion Note', serial: 'OD-2026-GOLD-0019', status: 'SECURED' },
    { id: 'act-2', timestamp: '11:42 AM', action: 'ECDSA NFC Scan Complete', itemTitle: 'Ocean Dollar Crypto 24K Gold Sovereign Coin', serial: 'XOD-COIN-9999-VAULT', status: 'VERIFIED' },
    { id: 'act-3', timestamp: '10:15 AM', action: 'Deposit Vault Asset', itemTitle: 'Specimen $20 Magellan Banknote', serial: 'OD-2026-MAG-9921', status: 'ACTIVE' }
  ]);

  // Asset Auth Badge Modal State
  const [selectedAuthBadgeModal, setSelectedAuthBadgeModal] = useState<{ specimen: UploadedSpecimenNote; badgeType: string } | null>(null);
  const [isAuthRescanning, setIsAuthRescanning] = useState<boolean>(false);

  // Multi-Currency Converter
  const [converterCurrency, setConverterCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY' | 'GOLD_GRAMS'>('USD');

  const currentNote = DENOMINATIONS_DATA[selectedDenom];
  const currentCoin = GOLD_COINS_DATA[selectedCoinDenom];

  // Vault Portfolio Calculations
  const totalVaultValuationOD = uploadedSpecimens.reduce((acc, s) => acc + (s.valUSD || 100), 0);
  const coldVaultValuationOD = uploadedSpecimens.filter(s => s.isColdStorage).reduce((acc, s) => acc + (s.valUSD || 100), 0);
  const hotVaultValuationOD = totalVaultValuationOD - coldVaultValuationOD;

  const handleToggleColdStorage = (id: string) => {
    setUploadedSpecimens(uploadedSpecimens.map(item => {
      if (item.id === id) {
        const nextCold = !item.isColdStorage;
        const newAct = {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: nextCold ? 'Locked to Cold Storage' : 'Unlocked to Hot Vault',
          itemTitle: item.name,
          serial: item.serialNumber,
          status: nextCold ? 'SECURED' : 'UNLOCKED'
        };
        setVaultActivityLog([newAct, ...vaultActivityLog]);
        return { ...item, isColdStorage: nextCold };
      }
      return item;
    }));
    hapticEngine.trigger('click');
  };

  const handleRunAuthRescan = (specimen: UploadedSpecimenNote) => {
    setIsAuthRescanning(true);
    hapticEngine.trigger('click');
    setTimeout(() => {
      setIsAuthRescanning(false);
      hapticEngine.trigger('success');
    }, 1200);
  };

  const filteredSpecimens = uploadedSpecimens.filter(s => {
    if (galleryCategoryFilter !== 'ALL' && s.type !== galleryCategoryFilter) return false;
    if (galleryDenomFilter !== 'ALL' && !s.denominationDetected.includes(galleryDenomFilter)) return false;
    if (galleryStatusFilter !== 'ALL' && s.status !== galleryStatusFilter) return false;
    if (galleryExplorerFilter !== 'ALL' && s.explorer !== galleryExplorerFilter) return false;
    if (gallerySearchQuery.trim() !== '') {
      const q = gallerySearchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchSerial = s.serialNumber.toLowerCase().includes(q);
      const matchNotes = (s.notes || '').toLowerCase().includes(q);
      const matchExplorer = (s.explorer || '').toLowerCase().includes(q);
      if (!matchName && !matchSerial && !matchNotes && !matchExplorer) return false;
    }
    return true;
  });

  const handleGenerateCustomVisual = () => {
    setIsGenerating(true);
    hapticEngine.trigger('click');
    setTimeout(() => {
      const newSerial = `OD-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}-GEN`;
      setGeneratedSerial(newSerial);
      setIsGenerating(false);
      hapticEngine.trigger('success');
    }, 800);
  };

  // Upload handler for user specimen files
  const handleFileUpload = (files: FileList | null, forcedName?: string, forcedDenom?: string, forcedType?: 'BANKNOTE' | 'CRYPTO_GOLD_COIN' | 'BULLION_BAR') => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploading(true);
    hapticEngine.trigger('click');

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgDataUrl = e.target?.result as string;

      setTimeout(() => {
        // AI OCR Simulation to detect denomination and generate serial number
        const isCoinUpload = forcedType === 'CRYPTO_GOLD_COIN' || file.name.toLowerCase().includes('coin') || file.name.toLowerCase().includes('gold');
        const detectedDenomList: OdDenomination[] = ['1000', '500', '100', '50', '20', '10'];
        const detectedDenomKey = forcedDenom || detectedDenomList[Math.floor(Math.random() * detectedDenomList.length)];
        const detectedDenom = DENOMINATIONS_DATA[detectedDenomKey as OdDenomination] || DENOMINATIONS_DATA['1000'];

        const newSpecimen: UploadedSpecimenNote = {
          id: `specimen-${Date.now()}`,
          name: forcedName || file.name.replace(/\.[^/.]+$/, '') || (isCoinUpload ? 'Ocean Dollar 24K Gold Crypto Coin' : `Uploaded ${detectedDenom.label} Specimen`),
          denominationDetected: isCoinUpload ? '1 XOD Crypto Gold Coin ($1,000 OD)' : detectedDenom.label,
          valUSD: isCoinUpload ? 1000 : detectedDenom.valUSD,
          serialNumber: isCoinUpload ? `XOD-COIN-${Math.floor(1000 + Math.random() * 9000)}-GOLD` : `OD-2026-USER-${Math.floor(1000 + Math.random() * 9000)}`,
          authenticityScore: Number((98.8 + Math.random() * 1.1).toFixed(1)),
          uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          imgUrl: imgDataUrl,
          status: 'VERIFIED_GENUINE',
          notes: isCoinUpload
            ? '1 oz Pure Physical 999.9 Fine Gold Coin verified with encrypted on-chain hash.'
            : 'Banknote specimen scanned with 99.4% OCR confidence & watermark validation.',
          type: isCoinUpload ? 'CRYPTO_GOLD_COIN' : 'BANKNOTE',
          isColdStorage: false,
          badgeType: isCoinUpload ? 'ECDSA_NFC' : 'POLYMER_COTTON'
        };

        setUploadedSpecimens([newSpecimen, ...uploadedSpecimens]);
        setIsUploading(false);
        hapticEngine.trigger('success');
      }, 1200);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadPresetSample = (type: 'MAGELLAN_20' | 'CRYPTO_GOLD_COIN') => {
    setIsUploading(true);
    hapticEngine.trigger('click');

    setTimeout(() => {
      if (type === 'MAGELLAN_20') {
        const sample20: UploadedSpecimenNote = {
          id: `specimen-mag20-${Date.now()}`,
          name: 'Uploaded Ferdinand Magellan $20 Navigation Note',
          denominationDetected: '$20 OD',
          valUSD: 20,
          serialNumber: `OD-2026-MAG-${Math.floor(1000 + Math.random() * 9000)}`,
          authenticityScore: 99.7,
          uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          imgUrl: oceanDollarNoteImg,
          status: 'VERIFIED_GENUINE',
          notes: '$20 OD Magellanic compass watermark & guilloche intaglio print verified.',
          type: 'BANKNOTE',
          isColdStorage: false,
          explorer: 'Ferdinand Magellan',
          badgeType: 'POLYMER_COTTON'
        };
        setUploadedSpecimens([sample20, ...uploadedSpecimens]);
      } else {
        const sampleGoldCoin: UploadedSpecimenNote = {
          id: `specimen-gold-${Date.now()}`,
          name: 'Uploaded Ocean Dollar Crypto 24K Sovereign Gold Coin',
          denominationDetected: '1 XOD Coin ($1,000 OD)',
          valUSD: 1000,
          serialNumber: `XOD-2026-COIN-${Math.floor(1000 + Math.random() * 9000)}`,
          authenticityScore: 99.9,
          uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          imgUrl: oceanDollarCoinImg,
          status: 'VERIFIED_GENUINE',
          notes: '1 oz 999.9 Vault Gold Bullion with ECDSA encrypted cryptographic NFC chip.',
          type: 'CRYPTO_GOLD_COIN',
          isColdStorage: true,
          explorer: 'Marco Polo',
          badgeType: 'ECDSA_NFC'
        };
        setUploadedSpecimens([sampleGoldCoin, ...uploadedSpecimens]);
      }
      setIsUploading(false);
      hapticEngine.trigger('success');
    }, 1000);
  };

  const handleDeleteSpecimen = (id: string) => {
    setUploadedSpecimens(uploadedSpecimens.filter((s) => s.id !== id));
    if (selectedSpecimenForModal?.id === id) {
      setSelectedSpecimenForModal(null);
    }
    hapticEngine.trigger('click');
  };

  return (
    <div id="ocean-dollar-visual-spec-portal" className="space-y-6 font-mono text-white animate-fadeIn">
      {/* Top Banner & Hub Title */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-cyan-500/20 text-amber-400 rounded-2xl border border-amber-500/40 shadow-xl">
              <DollarSign className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Ocean Dollars ($OD) Banknotes &amp; Gold Coin Portal
                </h2>
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
                  ISO-20022 CODE: XOD
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 max-w-3xl">
                Explore sovereign Ocean Dollars across all 6 official denominations ($10 - $1,000 OD), inspect 24K Gold Crypto Sovereign Coins, manage your Digital Vault cold storage, track global denomination supply metrics, and verify asset authenticity.
              </p>
            </div>
          </div>

          {/* Quick Denomination Switch Pills */}
          <div className="flex items-center space-x-1.5 bg-slate-950 p-2 rounded-2xl border border-slate-800 shrink-0">
            {(['1000', '500', '100', '50', '20', '10'] as OdDenomination[]).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelectedDenom(d);
                  setActiveTab('DENOMINATIONS');
                  hapticEngine.trigger('click');
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  selectedDenom === d
                    ? 'bg-amber-500 text-slate-950 shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                ${d} OD
              </button>
            ))}
          </div>
        </div>

        {/* Portal Navigation Bar */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('DIGITAL_VAULT');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'DIGITAL_VAULT'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Digital Vault UI</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DENOM_TRACKER');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'DENOM_TRACKER'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Denomination Tracker</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DENOMINATIONS');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'DENOMINATIONS'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4 text-amber-300" />
            <span>Banknote Series ($10 - $1000)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CRYPTO_COINS');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'CRYPTO_COINS'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>Crypto 24K Gold Coins</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SPECIMEN_UPLOAD');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'SPECIMEN_UPLOAD'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Filter className="w-4 h-4 text-purple-400" />
            <span>Currency Gallery &amp; Filter ({uploadedSpecimens.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DESIGNER');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'DESIGNER'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Visual Designer</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SPECS');
              hapticEngine.trigger('click');
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'SPECS'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Technical Specs</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 0-A: DIGITAL VAULT UI                                 */}
      {/* ======================================================== */}
      {activeTab === 'DIGITAL_VAULT' && (
        <div className="space-y-6 animate-fade-in">
          {/* Vault Header & Portfolio Valuation Card */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    SECURE COLD &amp; HOT DIGITAL VAULT
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
                  <Lock className="w-8 h-8 text-emerald-400" />
                  <span>Authenticated Specimen &amp; Sovereign Vault</span>
                </h3>
                <p className="text-slate-400 text-xs font-sans mt-1">
                  Manage your authenticated Ocean Dollar banknotes, 24K crypto gold coins, and cold storage reserve holdings with real-time multi-currency valuation.
                </p>
              </div>

              {/* Currency Converter Switcher */}
              <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 shrink-0">
                <span className="text-[11px] font-bold text-slate-400 px-2">Valuation Currency:</span>
                {(['USD', 'EUR', 'GBP', 'JPY', 'GOLD_GRAMS'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setConverterCurrency(curr);
                      hapticEngine.trigger('click');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      converterCurrency === curr
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr === 'GOLD_GRAMS' ? '24K GOLD' : curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Valuation & Security Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-sans">Total Vault Holdings Valuation</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {converterCurrency === 'USD' && `$${totalVaultValuationOD.toLocaleString()} USD`}
                  {converterCurrency === 'EUR' && `€${Math.round(totalVaultValuationOD * 0.92).toLocaleString()} EUR`}
                  {converterCurrency === 'GBP' && `£${Math.round(totalVaultValuationOD * 0.78).toLocaleString()} GBP`}
                  {converterCurrency === 'JPY' && `¥${Math.round(totalVaultValuationOD * 152).toLocaleString()} JPY`}
                  {converterCurrency === 'GOLD_GRAMS' && `${(totalVaultValuationOD * 0.0125).toFixed(2)} oz 24K Gold`}
                </div>
                <span className="text-[10px] text-slate-400 font-mono block pt-1">
                  {uploadedSpecimens.length} Authenticated Assets Registered
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-sans">Cold Hardware Vault</span>
                <div className="text-2xl font-black text-cyan-400 font-mono">
                  ${coldVaultValuationOD.toLocaleString()} OD
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${totalVaultValuationOD > 0 ? (coldVaultValuationOD / totalVaultValuationOD) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-sans">Hot Active Liquid Vault</span>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  ${hotVaultValuationOD.toLocaleString()} OD
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${totalVaultValuationOD > 0 ? (hotVaultValuationOD / totalVaultValuationOD) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-sans">Vault HSM Security Rating</span>
                <div className="text-2xl font-black text-purple-400 font-mono">256-BIT FIPS</div>
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-bold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>MULTISIG (3/5 GOVERNORS)</span>
                </div>
              </div>
            </div>

            {/* Vault Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('SPECIMEN_UPLOAD');
                  hapticEngine.trigger('click');
                }}
                className="py-3 px-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg transition-all flex items-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Deposit New Specimen to Vault</span>
              </button>

              <button
                onClick={() => {
                  uploadedSpecimens.forEach(s => {
                    if (!s.isColdStorage) handleToggleColdStorage(s.id);
                  });
                }}
                className="py-3 px-5 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs uppercase rounded-2xl transition-all flex items-center space-x-2"
              >
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Lock All Assets to Cold Hardware</span>
              </button>

              <button
                onClick={() => {
                  setDownloadMsg('Vault Proof of Reserves Certificate Generated!');
                  setTimeout(() => setDownloadMsg(null), 3000);
                  hapticEngine.trigger('success');
                }}
                className="py-3 px-5 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs uppercase rounded-2xl transition-all flex items-center space-x-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Export Vault Reserve Certificate</span>
              </button>
            </div>
          </div>

          {/* Vault Asset Inventory Table */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-black text-white flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Vault Asset Inventory ({uploadedSpecimens.length} Registered Items)</span>
              </h4>
              <span className="text-xs text-slate-400 font-sans">Real-time On-Chain Hardware State</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase">
                    <th className="pb-3 font-bold">Asset</th>
                    <th className="pb-3 font-bold">Denomination</th>
                    <th className="pb-3 font-bold">Serial Number</th>
                    <th className="pb-3 font-bold">Authenticity Badge</th>
                    <th className="pb-3 font-bold">Storage State</th>
                    <th className="pb-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {uploadedSpecimens.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-950/60 transition-colors">
                      <td className="py-3.5 pr-4 flex items-center space-x-3">
                        <img src={item.imgUrl} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-slate-800 shrink-0" />
                        <div>
                          <strong className="text-white font-bold block">{item.name}</strong>
                          <span className="text-[10px] text-slate-400">{item.type.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-2 font-black text-amber-400">{item.denominationDetected}</td>
                      <td className="py-3.5 px-2 text-slate-300 font-bold">{item.serialNumber}</td>
                      <td className="py-3.5 px-2">
                        <button
                          onClick={() => setSelectedAuthBadgeModal({ specimen: item, badgeType: item.badgeType || 'ISO_20022' })}
                          className="bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/50 px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center space-x-1 cursor-pointer transition-all"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>{item.badgeType || 'ISO_20022'} AUTH</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase inline-flex items-center space-x-1 ${
                          item.isColdStorage
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {item.isColdStorage ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          <span>{item.isColdStorage ? 'COLD STORAGE' : 'HOT VAULT'}</span>
                        </span>
                      </td>
                      <td className="py-3.5 pl-2 text-right space-x-2">
                        <button
                          onClick={() => handleToggleColdStorage(item.id)}
                          className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-[10px] font-bold transition-all"
                        >
                          {item.isColdStorage ? 'Unlock' : 'Lock Cold'}
                        </button>
                        <button
                          onClick={() => handleDeleteSpecimen(item.id)}
                          className="px-2.5 py-1.5 bg-slate-950 hover:bg-rose-950 text-rose-400 border border-slate-800 rounded-xl text-[10px] font-bold transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vault Audit Activity Log */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-black text-white flex items-center space-x-2">
                <Radio className="w-5 h-5 text-cyan-400" />
                <span>Vault Security Audit Trail Log</span>
              </h4>
              <span className="text-xs text-slate-400 font-sans">Live On-Chain Cryptographic Events</span>
            </div>

            <div className="space-y-2">
              {vaultActivityLog.map((log) => (
                <div key={log.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                    <strong className="text-cyan-300 font-bold">{log.action}</strong>
                    <span className="text-slate-300 text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">{log.itemTitle} ({log.serial})</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-black">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 0-B: DENOMINATION TRACKER                            */}
      {/* ======================================================== */}
      {activeTab === 'DENOM_TRACKER' && (
        <div className="space-y-6 animate-fade-in">
          {/* Global Supply & Minting Header */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    GLOBAL CURRENCY METRICS &amp; SUPPLY ANALYTICS
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
                  <Radio className="w-8 h-8 text-cyan-400" />
                  <span>Ocean Dollar Denomination Tracker</span>
                </h3>
                <p className="text-slate-400 text-xs font-sans mt-1">
                  Track total mintage, circulating volume, collateral reserve ratio, security ratings, and explorer tributes across all official Ocean Dollar currency denominations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 font-mono text-xs space-y-1">
                <span className="text-slate-400 block">Total Sovereign Supply Mintage</span>
                <span className="text-2xl font-black text-amber-400 block">$125,850,000 OD</span>
                <span className="text-[10px] text-emerald-400 font-bold block">100% Backed by Physical Reserve Vaults</span>
              </div>
            </div>

            {/* Denomination Metrics Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(Object.keys(DENOMINATIONS_DATA) as OdDenomination[]).map((denomKey) => {
                const item = DENOMINATIONS_DATA[denomKey];
                return (
                  <div
                    key={denomKey}
                    className="p-6 rounded-3xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-2xl font-black text-amber-400 block">${item.denomination} OD</span>
                          <span className="text-xs font-bold text-slate-300 block font-sans">{item.title}</span>
                        </div>
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-black px-2.5 py-1 rounded-full uppercase">
                          {item.badge}
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs font-mono">
                        <div className="flex justify-between text-slate-400">
                          <span>Security Features:</span>
                          <span className="text-emerald-400 font-bold">5/5 Ultra-High Security</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Substrate Material:</span>
                          <span className="text-cyan-300 font-bold">{item.substrate ? item.substrate.split(' ')[0] : 'Polymer'}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Circulating Volume:</span>
                          <span className="text-amber-400 font-bold">${(item.valUSD * 12500).toLocaleString()} OD</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDenom(denomKey);
                        setActiveTab('DENOMINATIONS');
                        hapticEngine.trigger('click');
                      }}
                      className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect ${item.denomination} OD Specimen</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: DENOMINATION SERIES ($10, $50, $100, $500, $1000)   */}
      {/* ======================================================== */}
      {activeTab === 'DENOMINATIONS' && (
        <div className="space-y-6 animate-fade-in">
          {/* Active Denomination Inspector Card */}
          <div className={`bg-gradient-to-br ${currentNote.bgGradient} rounded-3xl p-6 sm:p-8 border ${currentNote.borderAccent} shadow-2xl space-y-6 relative`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {currentNote.badge}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
                  <span>${currentNote.denomination} OD</span>
                  <span className="text-lg text-slate-400 font-bold font-sans">({currentNote.title})</span>
                </h3>
              </div>

              {/* Controls: UV Light & Download Note */}
              <div className="flex items-center space-x-3 shrink-0 flex-wrap gap-2">
                <button
                  onClick={() => {
                    setUvLightMode(!uvLightMode);
                    hapticEngine.trigger('click');
                  }}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs border transition-all flex items-center space-x-2 ${
                    uvLightMode
                      ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/40'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <span>{uvLightMode ? 'UV LIGHT ACTIVE (365nm)' : 'ENABLE UV LIGHT SCAN'}</span>
                </button>

                <button
                  onClick={() => {
                    setDownloadMsg(`Downloaded $${currentNote.denomination} OD Banknote Vector & Specimen Sheet!`);
                    setTimeout(() => setDownloadMsg(null), 4000);
                    hapticEngine.trigger('success');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD NOTE SPECIMEN</span>
                </button>
              </div>
            </div>

            {/* Note Visual Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 relative group">
                <div className={`relative overflow-hidden rounded-2xl border-2 ${currentNote.borderAccent} shadow-2xl bg-slate-950 transition-all duration-500 ${uvLightMode ? 'brightness-125 saturate-200 shadow-purple-500/30' : ''}`}>
                  <img
                    src={currentNote.img}
                    alt={`Ocean Dollar $${currentNote.denomination} Banknote Specimen`}
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* UV Overlay Effect */}
                  {uvLightMode && (
                    <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[1px] mix-blend-color-dodge pointer-events-none flex flex-col justify-between p-6 border-2 border-purple-400/80 animate-pulse">
                      <div className="flex justify-between items-center text-purple-200 font-mono text-xs font-black">
                        <span>[UV FLUORESCENT SCAN 365nm]</span>
                        <span>BIOLUMINESCENT POSEIDON TRIDENT DETECTED</span>
                      </div>
                      <div className="text-center text-purple-200 font-mono text-xs font-black tracking-widest bg-purple-950/80 py-2 rounded-xl border border-purple-400/60">
                        MICRO-PRINT: {currentNote.microtext}
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-black text-amber-400 shadow-xl">
                    ${currentNote.denomination} OD OFFICIAL SPECIMEN
                  </div>
                </div>

                {downloadMsg && (
                  <div className="mt-3 bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-3 rounded-2xl text-xs font-bold text-center animate-fadeIn">
                    {downloadMsg}
                  </div>
                )}
              </div>

              {/* Note Technical Breakdown Details */}
              <div className="lg:col-span-5 space-y-4 text-xs font-mono">
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">BANKNOTE TITLE &amp; MOTIF</span>
                  <p className="text-white font-bold text-sm">{currentNote.title}</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">SUBSTRATE COMPOSITION</span>
                  <p className="text-cyan-300 font-bold">{currentNote.substrate}</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">RESERVE VAULT BACKING</span>
                  <p className="text-emerald-400 font-bold">{currentNote.reserveBacking}</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">PRIMARY OPTICAL SECURITY</span>
                  <p className="text-amber-300 font-bold">{currentNote.securityFeature}</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">EMBEDDED WATERMARK</span>
                  <p className="text-purple-300 font-bold">{currentNote.watermark}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ALL 6 DENOMINATIONS COMPARISON GRID */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">SOVEREIGN BANKNOTE GALLERY</span>
                <h3 className="text-2xl font-black text-white mt-1">Complete Denomination Series ($10 - $1,000 OD)</h3>
                <p className="text-slate-400 text-xs font-sans mt-1">
                  Click any banknote note below to inspect its unique physical substrate, microtext, and vault reserve backing.
                </p>
              </div>

              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-bold font-mono">
                6 OFFICIAL DENOMINATIONS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {(['10', '20', '50', '100', '500', '1000'] as OdDenomination[]).map((denomKey) => {
                const note = DENOMINATIONS_DATA[denomKey];
                const isSelected = selectedDenom === denomKey;

                return (
                  <div
                    key={denomKey}
                    onClick={() => {
                      setSelectedDenom(denomKey);
                      hapticEngine.trigger('click');
                    }}
                    className={`bg-slate-950 rounded-2xl border p-3.5 space-y-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected ? 'border-amber-400 shadow-xl shadow-amber-500/20 bg-amber-950/20' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-slate-800">
                      <img src={note.img} alt={note.title} className="w-full h-24 object-cover rounded-xl" />
                      <span className="absolute top-1.5 right-1.5 bg-slate-950/90 text-amber-400 text-[8px] font-black px-1.5 py-0.5 rounded-full">
                        {note.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <strong className="text-white text-base font-black">${note.denomination} OD</strong>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">${note.valUSD} USD</span>
                      </div>
                      <p className="text-slate-300 font-sans text-[10px] line-clamp-2">{note.title}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-400 flex items-center justify-between">
                      <span>Watermark:</span>
                      <span className="text-amber-300 font-bold truncate max-w-[100px]">{note.watermark}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CRYPTO GOLD COINS & PHYSICAL BULLION VAULT         */}
      {/* ======================================================== */}
      {activeTab === 'CRYPTO_COINS' && (
        <div className="space-y-6 animate-fade-in font-mono">
          {/* Main Gold Coin Inspector Card */}
          <div className="bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border border-amber-500/60 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Header & Sub-Navigation Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="bg-amber-500/20 text-yellow-300 border border-amber-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    24K PURE GOLD BULLION BACKED (999.9 FINE)
                  </span>
                  {currentCoin.shape === 'OVAL' && (
                    <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                      ✨ OVAL SOVEREIGN COIN
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
                  <Coins className="w-8 h-8 text-amber-400" />
                  <span>Ocean Dollar Crypto Currency Gold Coin Hub</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl font-sans">
                  Inspect official 24K Pure Gold Ocean Dollar Crypto Coins ($10 to $1,000 OD). Each coin features an iconic maritime explorer, custom quote, and an on-chain ECDSA encrypted NFC microchip.
                </p>
              </div>

              {/* Denomination Quick Selectors for Gold Coins */}
              <div className="flex items-center space-x-1.5 bg-slate-950 p-2 rounded-2xl border border-slate-800 shrink-0 overflow-x-auto scrollbar-none">
                {(Object.keys(GOLD_COINS_DATA) as OdDenomination[]).map((denomKey) => {
                  const coin = GOLD_COINS_DATA[denomKey];
                  const isSelected = selectedCoinDenom === denomKey;
                  return (
                    <button
                      key={denomKey}
                      onClick={() => {
                        setSelectedCoinDenom(denomKey);
                        hapticEngine.trigger('click');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-lg scale-105'
                          : 'bg-slate-900 text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>${denomKey}</span>
                      {coin.shape === 'OVAL' && <span className="text-[9px]">楕</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Coin Inspection Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Coin Visual Render Stage */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative group overflow-hidden rounded-3xl border-2 border-amber-500/60 bg-slate-950 p-6 text-center shadow-2xl flex flex-col items-center justify-center">
                  <div className={`relative flex items-center justify-center transition-all duration-700 ${currentCoin.shape === 'OVAL' ? 'w-80 h-56 sm:w-96 sm:h-64' : 'w-64 h-64 sm:w-80 sm:h-80'}`}>
                    <img
                      src={activeCoinTab === 'GOLD_BAR' ? oceanDollarBarImg : oceanDollarCoinImg}
                      alt={currentCoin.label}
                      className={`w-full h-full object-contain ${currentCoin.shape === 'OVAL' ? 'rounded-full scale-105' : 'rounded-2xl'} drop-shadow-[0_20px_35px_rgba(234,179,8,0.35)] transition-transform duration-700 ${
                        coinFlipped ? 'rotate-y-180 scale-105' : 'hover:scale-105'
                      }`}
                    />

                    {coinFlipped && (
                      <div className="absolute inset-0 bg-amber-950/95 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2 border-2 border-amber-400 animate-fade-in">
                        <Coins className="w-10 h-10 text-amber-400 animate-spin" />
                        <h4 className="text-base font-black text-amber-300 uppercase">{currentCoin.reverseExplorer}</h4>
                        <p className="text-xs text-emerald-300 font-bold font-mono">{currentCoin.dobDod}</p>
                        <p className="text-xs text-slate-200 font-serif italic max-w-xs">{currentCoin.quote}</p>
                        <span className="text-[10px] font-mono text-cyan-300 font-bold bg-slate-950 px-3 py-1 rounded-full border border-cyan-500/40">
                          {currentCoin.roleTitle}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-3 mt-4 flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setCoinFlipped(!coinFlipped);
                        hapticEngine.trigger('click');
                      }}
                      className="py-2.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{coinFlipped ? 'SHOW OBVERSE FACE (SHIP)' : 'FLIP / REVERSE EXPLORER SIDE'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('SPECIMEN_UPLOAD');
                        setTimeout(() => fileInputRef.current?.click(), 300);
                        hapticEngine.trigger('click');
                      }}
                      className="py-2.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-black text-xs shadow-lg transition-all flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>UPLOAD YOUR GOLD COIN IMAGE</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Coin Specifications & Tokenomics Panel */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/40 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-amber-400 font-bold text-xs uppercase flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>COIN SPECIFICATION DETAILS</span>
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold">${currentCoin.denomination} OD SOVEREIGN</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">DENOMINATION:</span>
                      <strong className="text-amber-300 font-black">${currentCoin.denomination} Ocean Dollar</strong>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">COIN SHAPE:</span>
                      <strong className="text-cyan-300 font-black">{currentCoin.shape === 'OVAL' ? 'Oval Sovereign' : 'Round Sovereign'}</strong>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">HISTORICAL EXPLORER:</span>
                      <strong className="text-white font-black">{currentCoin.explorerTitle}</strong>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">PURITY / METAL:</span>
                      <strong className="text-amber-300 font-black">{currentCoin.purity}</strong>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">PHYSICAL WEIGHT:</span>
                      <strong className="text-emerald-400 font-black">{currentCoin.weight}</strong>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">SECURITY MICROCHIP:</span>
                      <strong className="text-purple-300 font-black">ECDSA Encrypted NFC</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-amber-400 text-[10px] font-bold block">HISTORICAL MOTTO &amp; QUOTE:</span>
                    <p className="text-xs text-slate-200 font-serif italic">{currentCoin.quote}</p>
                    <span className="text-[10px] text-cyan-400 font-mono block mt-1">{currentCoin.dobDod}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-cyan-400 font-bold text-xs">ON-CHAIN VAULT RESERVES</span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold">● VERIFIED LIVE</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Token Symbol:</span>
                      <span className="text-white font-bold">XOD-GOLD</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Network Standard:</span>
                      <span className="text-amber-300 font-bold">ISO-20022 / Multichain</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Vault Reserve Backing:</span>
                      <span className="text-emerald-400 font-bold">100% Sealed 24K Physical Bullion</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400 flex justify-between items-center">
                      <span className="truncate max-w-[240px]">0x71a9...8401XODVaultGoldReserve</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('0x71a982938401XODVaultGoldReserve');
                          alert('Crypto Gold Coin Contract Address Copied!');
                        }}
                        className="text-amber-400 hover:text-amber-300 font-bold shrink-0 ml-2"
                      >
                        COPY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Gold Coin Denominations Grid */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-black text-white flex items-center space-x-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>Complete Ocean Dollar 24K Gold Coin Series ($10 - $1,000 OD)</span>
              </h4>
              <span className="text-xs text-slate-400 font-sans">6 Sovereign Explorer Denominations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(GOLD_COINS_DATA) as OdDenomination[]).map((denomKey) => {
                const coin = GOLD_COINS_DATA[denomKey];
                const isSelected = selectedCoinDenom === denomKey;
                return (
                  <div
                    key={denomKey}
                    onClick={() => {
                      setSelectedCoinDenom(denomKey);
                      hapticEngine.trigger('click');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 shadow-xl'
                        : 'bg-slate-950 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-400 font-black text-base">${coin.denomination} OD</span>
                        {coin.shape === 'OVAL' && (
                          <span className="bg-cyan-500/20 text-cyan-300 text-[9px] px-2 py-0.5 rounded-full border border-cyan-500/40 font-bold">
                            OVAL
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 text-[10px] font-bold">{coin.weight}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>Reverse Explorer:</span>
                        <span className="text-amber-300">{coin.explorerTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans line-clamp-2 italic">{coin.quote}</p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                      <span>{coin.purity}</span>
                      <span className="text-emerald-400 font-bold">ECDSA NFC REGISTERED</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: UPLOAD & AUTHENTICATE SPECIMEN NOTES               */}
      {/* ======================================================== */}
      {activeTab === 'SPECIMEN_UPLOAD' && (
        <div className="space-y-6 animate-fade-in">
          {/* Upload Dropzone Container */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">SPECIMEN AUTHENTICATION SCANNER</span>
                <h3 className="text-2xl font-black text-white mt-1 flex items-center space-x-2">
                  <Upload className="w-6 h-6 text-cyan-400" />
                  <span>Upload &amp; Scan Specimen Currency Notes &amp; Gold Coins</span>
                </h3>
                <p className="text-slate-400 text-xs font-sans mt-1">
                  Upload your specimen currency note or crypto gold coin images for real-time AI OCR scanning, denomination detection, and serial registration in your digital vault.
                </p>
              </div>

              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />

                {/* Preset sample upload triggers */}
                <button
                  onClick={() => handleUploadPresetSample('MAGELLAN_20')}
                  disabled={isUploading}
                  className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs rounded-2xl transition-all"
                >
                  + SAMPLE $20 OD NOTE
                </button>

                <button
                  onClick={() => handleUploadPresetSample('CRYPTO_GOLD_COIN')}
                  disabled={isUploading}
                  className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-2xl transition-all"
                >
                  + SAMPLE 24K GOLD COIN
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  <Upload className={`w-4 h-4 ${isUploading ? 'animate-bounce' : ''}`} />
                  <span>{isUploading ? 'SCANNING SPECIMEN...' : 'CHOOSE IMAGE FILE'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Drag & Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setUploadDragOver(true);
              }}
              onDragLeave={() => setUploadDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setUploadDragOver(false);
                handleFileUpload(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center space-y-4 cursor-pointer transition-all ${
                uploadDragOver
                  ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
                  : 'border-slate-800 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-950'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
                <Upload className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-1">
                <p className="text-base font-bold text-white font-mono">
                  Drag &amp; Drop your Specimen Currency Note image here
                </p>
                <p className="text-xs text-slate-400 font-sans">
                  Supports JPG, PNG, WEBP, and SVG high-resolution banknote scans up to 25MB.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[10px] font-mono text-cyan-300 pt-2">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI OCR Denomination Scanner</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Watermark &amp; Foil Authenticator</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Vault Serial Registry</span>
                </span>
              </div>
            </div>

            {/* Currency Gallery & Filter Section */}
            <div className="space-y-6 pt-6 border-t border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
                <div>
                  <h4 className="text-xl font-black text-white flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-purple-400" />
                    <span>Currency Gallery &amp; Specimen Filter</span>
                  </h4>
                  <p className="text-slate-400 text-xs font-sans mt-0.5">
                    Filter authenticated banknote specimens and 24K gold coins by category, denomination, explorer tribute, or security badge.
                  </p>
                </div>
                <div className="text-xs text-purple-300 font-bold bg-purple-950/60 border border-purple-500/40 px-3 py-1.5 rounded-full self-start md:self-auto">
                  Showing {filteredSpecimens.length} of {uploadedSpecimens.length} Vault Items
                </div>
              </div>

              {/* Gallery Filter Controls Bar */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  {/* Search Query Input */}
                  <div className="lg:col-span-4 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search title, serial number, explorer..."
                      value={gallerySearchQuery}
                      onChange={(e) => setGallerySearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all text-xs"
                    />
                    {gallerySearchQuery && (
                      <button
                        onClick={() => setGallerySearchQuery('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  <div className="lg:col-span-3 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
                    {[
                      { id: 'ALL', label: 'ALL' },
                      { id: 'BANKNOTE', label: '💵 BANKNOTES' },
                      { id: 'CRYPTO_GOLD_COIN', label: '🪙 GOLD COINS' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setGalleryCategoryFilter(cat.id as any);
                          hapticEngine.trigger('click');
                        }}
                        className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                          galleryCategoryFilter === cat.id
                            ? 'bg-purple-600 text-white shadow-md font-black'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Denomination Select Dropdown */}
                  <div className="lg:col-span-2">
                    <select
                      value={galleryDenomFilter}
                      onChange={(e) => {
                        setGalleryDenomFilter(e.target.value as any);
                        hapticEngine.trigger('click');
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-bold focus:outline-none focus:border-purple-500 text-xs"
                    >
                      <option value="ALL">Denom: ALL ($10 - $1000)</option>
                      <option value="10">$10 OD</option>
                      <option value="20">$20 OD</option>
                      <option value="50">$50 OD</option>
                      <option value="100">$100 OD</option>
                      <option value="500">$500 OD</option>
                      <option value="1000">$1,000 OD</option>
                    </select>
                  </div>

                  {/* Explorer Tribute Select Dropdown */}
                  <div className="lg:col-span-3">
                    <select
                      value={galleryExplorerFilter}
                      onChange={(e) => {
                        setGalleryExplorerFilter(e.target.value);
                        hapticEngine.trigger('click');
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-bold focus:outline-none focus:border-purple-500 text-xs"
                    >
                      <option value="ALL">Explorer: ALL TRIBUTES</option>
                      <option value="Ferdinand Magellan">Ferdinand Magellan</option>
                      <option value="Amerigo Vespucci">Amerigo Vespucci</option>
                      <option value="Bartolomeu Dias">Bartolomeu Dias</option>
                      <option value="Christopher Columbus">Christopher Columbus</option>
                      <option value="Vasco Da Gama">Vasco Da Gama</option>
                      <option value="Marco Polo">Marco Polo</option>
                    </select>
                  </div>
                </div>

                {/* Clear Active Filters Bar */}
                {(gallerySearchQuery || galleryCategoryFilter !== 'ALL' || galleryDenomFilter !== 'ALL' || galleryExplorerFilter !== 'ALL') && (
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-[11px]">
                    <span className="text-purple-300 font-sans">Active Filter applied</span>
                    <button
                      onClick={() => {
                        setGallerySearchQuery('');
                        setGalleryCategoryFilter('ALL');
                        setGalleryDenomFilter('ALL');
                        setGalleryExplorerFilter('ALL');
                        hapticEngine.trigger('click');
                      }}
                      className="text-rose-400 hover:text-rose-300 font-bold underline"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Filtered Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpecimens.map((specimen) => (
                  <div
                    key={specimen.id}
                    className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4 hover:border-purple-500/50 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-xl border border-slate-800">
                        <img
                          src={specimen.imgUrl}
                          alt={specimen.name}
                          className="w-full h-40 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                        />
                        <AssetAuthenticityBadge
                          assetId={specimen.id || specimen.serialNumber}
                          assetName={specimen.name}
                          variant="watermark"
                        />
                        <span className="absolute top-2 right-2 bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 text-[9px] font-black px-2.5 py-1 rounded-full uppercase">
                          {specimen.status.replace('_', ' ')}
                        </span>
                        {specimen.isColdStorage && (
                          <span className="absolute top-2 left-2 bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 text-[9px] font-black px-2.5 py-1 rounded-full uppercase flex items-center space-x-1">
                            <Lock className="w-3 h-3" />
                            <span>COLD VAULT</span>
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 font-mono">
                        <div className="flex justify-between items-center">
                          <strong className="text-white text-base font-bold truncate">{specimen.name}</strong>
                          <span className="text-xs text-amber-400 font-bold shrink-0 ml-2">{specimen.denominationDetected}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">SERIAL: {specimen.serialNumber}</p>
                        {specimen.explorer && (
                          <p className="text-[10px] text-purple-300">TRIBUTE: {specimen.explorer}</p>
                        )}
                      </div>

                      {/* Asset Auth Badge Display */}
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                        <button
                          onClick={() => {
                            setSelectedAuthBadgeModal({ specimen, badgeType: specimen.badgeType || 'ISO_20022' });
                            hapticEngine.trigger('click');
                          }}
                          className="w-full py-1.5 px-3 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 rounded-xl text-[10px] font-black uppercase flex items-center justify-between transition-all"
                        >
                          <span className="flex items-center space-x-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>BADGE: {specimen.badgeType || 'ISO_20022'}</span>
                          </span>
                          <span className="text-[9px] text-emerald-400 underline">Audit COA</span>
                        </button>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1">
                        <div className="flex justify-between text-slate-400">
                          <span>Authenticity Rating:</span>
                          <span className="text-emerald-400 font-bold">{specimen.authenticityScore}% Genuine</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${specimen.authenticityScore}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setSelectedSpecimenForModal(specimen)}
                        className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition-all flex items-center justify-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Certificate</span>
                      </button>

                      <button
                        onClick={() => handleToggleColdStorage(specimen.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all text-[10px] font-bold"
                        title="Toggle Cold Storage Lock"
                      >
                        {specimen.isColdStorage ? <Lock className="w-4 h-4 text-cyan-400" /> : <Unlock className="w-4 h-4 text-amber-400" />}
                      </button>

                      <button
                        onClick={() => handleDeleteSpecimen(specimen.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSpecimens.length === 0 && (
                <div className="p-12 text-center bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
                  <Filter className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-white font-bold font-mono">No Specimen Assets Match Your Active Filters</p>
                  <button
                    onClick={() => {
                      setGallerySearchQuery('');
                      setGalleryCategoryFilter('ALL');
                      setGalleryDenomFilter('ALL');
                      setGalleryExplorerFilter('ALL');
                    }}
                    className="py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Reset Filter Controls
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: CUSTOM VISUAL DESIGNER TOOL                        */}
      {/* ======================================================== */}
      {activeTab === 'DESIGNER' && (
        <div className="bg-slate-950 border border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                  CUSTOM BANKNOTE STUDIO
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mt-1 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span>Generate Custom Ocean Dollar ($OD) Visual</span>
              </h3>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-xs font-mono">
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
                  src={currentNote.img}
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
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: TECHNICAL SECURITY & ISO SPECS                    */}
      {/* ======================================================== */}
      {activeTab === 'SPECS' && (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in font-mono">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">TECHNICAL SPECIFICATIONS &amp; ISO COMPLIANCE</span>
              <h3 className="text-2xl font-black text-white mt-1">Ocean Dollar ($OD) Official Spec Sheet</h3>
              <p className="text-slate-400 text-xs font-sans mt-1">
                Complete physical, chemical, micro-printing, and cryptographic specifications for the International Ocean Dollar currency substrate.
              </p>
            </div>

            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-bold">
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
        </div>
      )}

      {/* SPECIMEN INSPECTION MODAL */}
      {selectedSpecimenForModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl max-w-lg w-full space-y-6 font-mono text-xs animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Certificate of Specimen Authenticity</h3>
              </div>
              <button
                onClick={() => setSelectedSpecimenForModal(null)}
                className="p-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-slate-800">
                <img src={selectedSpecimenForModal.imgUrl} alt={selectedSpecimenForModal.name} className="w-full h-48 object-cover rounded-2xl" />
                <span className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  {selectedSpecimenForModal.status}
                </span>
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-slate-400">
                  <span>Specimen Title:</span>
                  <span className="text-white font-bold">{selectedSpecimenForModal.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Detected Denomination:</span>
                  <span className="text-amber-400 font-bold">{selectedSpecimenForModal.denominationDetected}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Assigned Serial Number:</span>
                  <span className="text-cyan-400 font-bold">{selectedSpecimenForModal.serialNumber}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>AI OCR Authenticity Score:</span>
                  <span className="text-emerald-400 font-bold">{selectedSpecimenForModal.authenticityScore}% Genuine</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Registration Date:</span>
                  <span className="text-slate-300">{selectedSpecimenForModal.uploadedAt}</span>
                </div>
              </div>

              {selectedSpecimenForModal.notes && (
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 text-[11px]">
                  <strong>Security Note:</strong> {selectedSpecimenForModal.notes}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  alert(`Certificate of Authenticity for ${selectedSpecimenForModal.serialNumber} downloaded to PC.`);
                  setSelectedSpecimenForModal(null);
                }}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PRINTABLE CERTIFICATE</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ASSET AUTH BADGE AUDIT MODAL */}
      {selectedAuthBadgeModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/50 shadow-2xl max-w-lg w-full space-y-6 font-mono text-xs animate-scale-up relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-white text-base">Asset Authenticity Provenance Badge</h3>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">{selectedAuthBadgeModal.badgeType} COMPLIANT</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAuthBadgeModal(null)}
                className="p-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30">
                <img src={selectedAuthBadgeModal.specimen.imgUrl} alt={selectedAuthBadgeModal.specimen.name} className="w-full h-44 object-cover rounded-2xl" />
                {isAuthRescanning && (
                  <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                    <span className="text-emerald-300 font-bold animate-pulse">RUNNING AI DEEP SCAN...</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-slate-400">
                  <span>Badge Type:</span>
                  <span className="text-emerald-400 font-black">{selectedAuthBadgeModal.badgeType}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Asset Name:</span>
                  <span className="text-white font-bold">{selectedAuthBadgeModal.specimen.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Serial Hash:</span>
                  <span className="text-cyan-400 font-bold">{selectedAuthBadgeModal.specimen.serialNumber}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>AI Authenticity Score:</span>
                  <span className="text-emerald-400 font-bold">{selectedAuthBadgeModal.specimen.authenticityScore}% GENUINE</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cold Storage Status:</span>
                  <span className="text-cyan-300 font-bold">{selectedAuthBadgeModal.specimen.isColdStorage ? 'COLD HARDWARE' : 'ACTIVE VAULT'}</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl space-y-1 text-[11px] text-emerald-200">
                <strong className="block text-emerald-300 font-bold">Provenance Certificate Specs:</strong>
                <p>Guilloche intaglio micro-mesh verified. ISO-20022 messaging protocol registered under XOD ledger.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => handleRunAuthRescan(selectedAuthBadgeModal.specimen)}
                disabled={isAuthRescanning}
                className="flex-1 py-3 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{isAuthRescanning ? 'RE-SCANNING...' : 'RUN RE-SCAN'}</span>
              </button>

              <button
                onClick={() => {
                  setDownloadMsg(`COA Certificate for ${selectedAuthBadgeModal.specimen.serialNumber} Exported!`);
                  setTimeout(() => setDownloadMsg(null), 3000);
                  setSelectedAuthBadgeModal(null);
                  hapticEngine.trigger('success');
                }}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT CERTIFICATE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
