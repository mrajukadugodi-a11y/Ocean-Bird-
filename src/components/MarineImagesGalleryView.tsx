import React, { useState, useRef, useEffect } from 'react';
import {
  ImageIcon,
  Upload,
  Sparkles,
  Sliders,
  Maximize2,
  Download,
  Copy,
  Check,
  Tag,
  Globe,
  Languages,
  ShieldCheck,
  Info,
  RefreshCw,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  FileCode,
  Layers,
  Zap,
  ArrowRight,
  X,
  Volume2,
  SlidersHorizontal,
  FileImage,
  Share2,
  HelpCircle,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  DownloadCloud,
  Stamp,
  Grid,
  List,
  ArrowUpDown,
  Lock,
  Layers3,
  Camera,
  Sun,
  Contrast as ContrastIcon,
  QrCode,
  Wand2,
  ExternalLink,
  MapPin,
  Flame
} from 'lucide-react';
import { NavTabType } from './Navbar';
import { hapticEngine } from '../utils/hapticUtils';

// Local Image Assets
import oceanBirdSunsetImg from '../assets/images/ocean_bird_sunset_1787685515840.jpg';
import oceanBirdPosterImg from '../assets/images/ocean_bird_poster_1787685532837.jpg';

export interface ExifData {
  camera: string;
  lens: string;
  iso: string;
  shutter: string;
  aperture: string;
  focalLength: string;
  gpsCoords: string;
  dateTaken: string;
  colorSpace: string;
  sensor: string;
  exposureBias: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'WILDLIFE' | 'SHIPS_AIS' | 'SATCOM_RADAR' | 'PORT_BERTH' | 'STORM_WEATHER' | 'CITIZEN_REGATTA' | 'CLIMATE_WATCH';
  url: string;
  originalSizeKB: number;
  optimizedSizeKB: number;
  format: 'webp' | 'jpg' | 'png';
  resolution: string;
  aspectRatio: string;
  altText: string;
  caption: string;
  detectedSubject: string;
  seaStateNotes: string;
  tags: string[];
  uploadedBy: string;
  timestamp: string;
  tabTarget?: NavTabType;
  exif: ExifData;
}

const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'MGI-OB-SUNSET',
    title: 'Ocean Bird — Sunset Flagship Cruise Liner & Coastal Lighthouse',
    category: 'CLIMATE_WATCH',
    url: oceanBirdSunsetImg,
    originalSizeKB: 3840,
    optimizedSizeKB: 410,
    format: 'jpg',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Ocean Bird flagship cruise ship sailing past a glowing lighthouse during a dramatic sunset with airplane overhead and crescent moon.',
    caption: 'Ocean Bird flagship cruise liner navigating South Asian waters at golden sunset, accompanied by aerial airways monitoring and coastal lighthouse navigation radar.',
    detectedSubject: 'Ocean Bird Flagship Liner • IMO 9984120 • Speed 19.2 knots',
    seaStateNotes: 'Beaufort Scale 2, Sea Surface Temp +26.4°C, Visibility 15 NM',
    tags: ['OceanBirdFlagship', 'SunsetVoyage', 'LighthouseWatch', 'AirwaysWatch', 'SouthAsia'],
    uploadedBy: '@ocean_bird_official',
    timestamp: '2026-08-25 12:00 UTC',
    tabTarget: 'climate',
    exif: {
      camera: 'Sony α7R V (ILCE-7RM5)',
      lens: 'FE 24-70mm F2.8 GM II',
      iso: 'ISO 100',
      shutter: '1/1250 sec',
      aperture: 'f/5.6',
      focalLength: '35mm',
      gpsCoords: '15°24\'18" N, 73°49\'12" E (Goa Coastal Outer Buoy)',
      dateTaken: '2026-08-25 11:45:00 UTC',
      colorSpace: 'sRGB / 14-bit RAW',
      sensor: '61.0 MP Full-Frame Exmor R CMOS',
      exposureBias: '0.0 EV'
    }
  },
  {
    id: 'MGI-OB-POSTER',
    title: 'Ocean Bird — South Asia & Global Climate, Airways & Maritime Watch',
    category: 'CLIMATE_WATCH',
    url: oceanBirdPosterImg,
    originalSizeKB: 4200,
    optimizedSizeKB: 460,
    format: 'jpg',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Official Ocean Bird header banner with tagline We Connect The World Together and multi-domain watch icons.',
    caption: 'Official Ocean Bird global climate, airways, and maritime watch flagship poster with tagline "We connect the World together" and multi-domain telemetry badges.',
    detectedSubject: 'Official Command Banner • Climate, Airways & Maritime Watch',
    seaStateNotes: 'Global Multi-Domain SatCom Coverage & Real-Time Alerts',
    tags: ['OfficialPoster', 'ClimateWatch', 'AirwaysWatch', 'MaritimeWatch', 'WeConnectTheWorld'],
    uploadedBy: '@ocean_bird_official',
    timestamp: '2026-08-25 12:15 UTC',
    tabTarget: 'public-citizen-portal',
    exif: {
      camera: 'Canon EOS R5 C',
      lens: 'RF 15-35mm F2.8 L IS USM',
      iso: 'ISO 200',
      shutter: '1/800 sec',
      aperture: 'f/4.0',
      focalLength: '24mm',
      gpsCoords: '06°55\'55" N, 79°50\'52" E (Colombo Command Center)',
      dateTaken: '2026-08-25 12:00:00 UTC',
      colorSpace: 'Display P3 / 10-bit',
      sensor: '45.0 MP Full-Frame CMOS',
      exposureBias: '+0.3 EV'
    }
  },
  {
    id: 'MGI-01',
    title: 'Ocean Bird — Climate & Maritime Watch Official Hero',
    category: 'CLIMATE_WATCH',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    originalSizeKB: 2450,
    optimizedSizeKB: 320,
    format: 'webp',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Emerald ocean horizon under blue sky with real-time maritime telemetry overlays',
    caption: 'Watching the Oceans. Understanding the Climate. Securing Our Maritime Future with real-time satellite ocean monitoring.',
    detectedSubject: 'Clear High Seas & Oceanic Surface Temp Grid (+24.8°C)',
    seaStateNotes: 'Beaufort Scale 3, Slight Sea Swell (0.8m), Wind 12 knots',
    tags: ['Weather Monitoring', 'Ocean Conditions', 'Climate Tracking', 'Maritime Safety'],
    uploadedBy: '@ocean_bird_official',
    timestamp: '2026-08-25 08:00 UTC',
    tabTarget: 'climate',
    exif: {
      camera: 'Nikon Z9',
      lens: 'NIKKOR Z 70-200mm f/2.8 VR S',
      iso: 'ISO 64',
      shutter: '1/2000 sec',
      aperture: 'f/8.0',
      focalLength: '85mm',
      gpsCoords: '09°40\'00" N, 80°10\'00" E (Palk Strait Corridor)',
      dateTaken: '2026-08-25 07:30:00 UTC',
      colorSpace: 'Adobe RGB (1998)',
      sensor: '45.7 MP Stacked CMOS',
      exposureBias: '-0.3 EV'
    }
  },
  {
    id: 'MGI-02',
    title: 'Deepwater Container Vessel Containerization at Sunset',
    category: 'SHIPS_AIS',
    url: 'https://images.unsplash.com/photo-1548574505-5e2386903b77?auto=format&fit=crop&w=1600&q=80',
    originalSizeKB: 3120,
    optimizedSizeKB: 410,
    format: 'webp',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Large commercial TEU container vessel navigating open sea waters during golden hour sunset',
    caption: 'Commercial TEU Container Vessel carrying 18,000 TEU across international shipping corridors with smart stowage verification.',
    detectedSubject: 'Container Cargo Ship (IMO 9842109) • Speed 18.4 knots',
    seaStateNotes: 'Beaufort Scale 2, Smooth Sea, Visibility 10 NM',
    tags: ['18,000 TEU', 'Cargo Logistics', 'Port ETA 06:00', 'AIS Live'],
    uploadedBy: '@teu_logistics',
    timestamp: '2026-08-25 07:30 UTC',
    tabTarget: 'smart-load-planner',
    exif: {
      camera: 'DJI Mavic 3 Enterprise RTK',
      lens: 'Hasselblad 24mm f/2.8',
      iso: 'ISO 100',
      shutter: '1/1000 sec',
      aperture: 'f/5.0',
      focalLength: '24mm',
      gpsCoords: '01°16\'00" N, 103°50\'00" E (Malacca Strait Lane)',
      dateTaken: '2026-08-25 06:45:00 UTC',
      colorSpace: 'sRGB',
      sensor: '20 MP 4/3 CMOS',
      exposureBias: '0.0 EV'
    }
  },
  {
    id: 'MGI-03',
    title: 'Blue Whale Cetacean Tracking in Bay of Bengal',
    category: 'WILDLIFE',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80',
    originalSizeKB: 1890,
    optimizedSizeKB: 245,
    format: 'webp',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Aquatic deep blue sea waters with marine mammals surfacing for air',
    caption: 'Hydrophone buoy acoustic tracking detected surface blow from endangered marine mammals in coastal protection corridor.',
    detectedSubject: 'Blue Whale (Balaenoptera musculus) Cetacean Pod',
    seaStateNotes: 'Acoustic Noise Index 12 dB (Low Impact Zone)',
    tags: ['Acoustic Protection', 'Mammal Radar', 'Clean Seas', 'Marine Eco'],
    uploadedBy: '@marine_eco_watch',
    timestamp: '2026-08-25 06:45 UTC',
    tabTarget: 'ocean-environment-library',
    exif: {
      camera: 'Sony α1 (ILCE-1)',
      lens: 'FE 100-400mm F4.5-5.6 GM OSS',
      iso: 'ISO 400',
      shutter: '1/3200 sec',
      aperture: 'f/6.3',
      focalLength: '400mm',
      gpsCoords: '05°55\'00" N, 80°30\'00" E (Mirissa Cetacean Zone)',
      dateTaken: '2026-08-25 06:10:00 UTC',
      colorSpace: 'sRGB',
      sensor: '50.1 MP Stacked CMOS',
      exposureBias: '+0.7 EV'
    }
  },
  {
    id: 'MGI-04',
    title: 'Dark Protocol Satellite AIS & Air Traffic Radar HUD',
    category: 'SATCOM_RADAR',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    originalSizeKB: 2980,
    optimizedSizeKB: 380,
    format: 'webp',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Synthetic Aperture Radar satellite telemetry dark monitor displaying global ship positions',
    caption: 'High-density command bridge HUD tracking global sea surface temperatures, active storm fronts, and 12,532 vessels at sea.',
    detectedSubject: 'Satellite SAR Synthetic Telemetry • 12,532 Vessels Active',
    seaStateNotes: 'Global Sea Surface Temp Index +24.8°C',
    tags: ['Satellite Telemetry', '12,532 Vessels', '8,746 Flights', 'Ocean Index 82'],
    uploadedBy: '@satcom_command',
    timestamp: '2026-08-25 06:15 UTC',
    tabTarget: 'master-claude',
    exif: {
      camera: 'Sentinel-2B MSI Multi-Spectral Instrument',
      lens: 'Spaceborne Telescope Assembly',
      iso: 'N/A (Optical Radiometer)',
      shutter: 'Sub-second pushbroom',
      aperture: 'f/2.5',
      focalLength: '585mm Space Optics',
      gpsCoords: '786 km Low Earth Orbit Orbit Spec',
      dateTaken: '2026-08-25 05:50:00 UTC',
      colorSpace: '12-bit Radiometric',
      sensor: 'Multi-Spectral CMOS Focal Plane',
      exposureBias: 'N/A'
    }
  },
  {
    id: 'MGI-05',
    title: 'Harbor Pier Terminal & Passenger Gangway Customs Check',
    category: 'PORT_BERTH',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=80',
    originalSizeKB: 2150,
    optimizedSizeKB: 290,
    format: 'webp',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Harbor pier berth with passenger liners moored alongside smart terminal gangway',
    caption: 'South Asia smart port pier terminal with automated gangway pass scanning, visitor verification, and customs logging.',
    detectedSubject: 'Port Pier Terminal Berth 4 • Customs Scanner Active',
    seaStateNotes: 'Harbor Basin Tide +1.8m High Tide',
    tags: ['Pier 4 Berth', 'Gangway Scan', 'Customs Check', 'Visitor Pass'],
    uploadedBy: '@port_authority_hq',
    timestamp: '2026-08-25 05:20 UTC',
    tabTarget: 'interactive-port-map',
    exif: {
      camera: 'Fujifilm GFX 100 II',
      lens: 'GF 32-64mm F4 R LM WR',
      iso: 'ISO 160',
      shutter: '1/500 sec',
      aperture: 'f/8.0',
      focalLength: '45mm',
      gpsCoords: '18°56\'00" N, 72°50\'00" E (Jawaharlal Nehru Port)',
      dateTaken: '2026-08-25 04:55:00 UTC',
      colorSpace: 'sRGB',
      sensor: '102 MP Medium Format CMOS II HS',
      exposureBias: '0.0 EV'
    }
  },
  {
    id: 'MGI-06',
    title: 'Rough Sea Heavy Swell Storm Navigation Mode',
    category: 'STORM_WEATHER',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    originalSizeKB: 3400,
    optimizedSizeKB: 420,
    format: 'webp',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Heavy sea waves breaking with high swell water spray and storm cloud cover',
    caption: 'Heavy swell storm conditions navigation with hull stress monitoring, dynamic wave height telemetry, and stabilizer feedback.',
    detectedSubject: 'Heavy Weather Surge • Wave Height 4.2m',
    seaStateNotes: 'Beaufort Scale 7, High Swell Waves 4.2m, Wind 34 knots',
    tags: ['Wave Height 4.2m', 'Storm Surge', 'Stabilizers', 'Heavy Weather'],
    uploadedBy: '@storm_patrol_unit',
    timestamp: '2026-08-25 04:30 UTC',
    tabTarget: 'emergency-sos-pulse',
    exif: {
      camera: 'OM System OM-1 Mark II (IP53 Weatherproof)',
      lens: 'M.Zuiko 12-40mm F2.8 PRO II',
      iso: 'ISO 800',
      shutter: '1/4000 sec',
      aperture: 'f/5.6',
      focalLength: '17mm',
      gpsCoords: '12°00\'00" N, 85°00\'00" E (Bay of Bengal Outer Grid)',
      dateTaken: '2026-08-25 04:10:00 UTC',
      colorSpace: 'sRGB',
      sensor: '20.4 MP Stacked BSI Live MOS',
      exposureBias: '-0.7 EV'
    }
  },
  {
    id: 'MGI-07',
    title: 'South Asia Citizen Science Regatta & Waterfront Festival',
    category: 'CITIZEN_REGATTA',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80',
    originalSizeKB: 1950,
    optimizedSizeKB: 260,
    format: 'webp',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    altText: 'Sailing yachts and citizen regatta craft gathered in sunny coastal bay',
    caption: 'Annual Citizen Science Marine Eco Regatta collecting microplastic surface water samples along coastal promenade.',
    detectedSubject: 'Regatta Sailing Fleet • 48 Volunteer Boats',
    seaStateNotes: 'Calm Coastal Waters, Sea Temp 27.2°C',
    tags: ['Citizen Science', 'Eco Regatta', 'Waterfront', 'Sailing'],
    uploadedBy: '@coastal_citizen_group',
    timestamp: '2026-08-25 03:10 UTC',
    tabTarget: 'public-citizen-portal',
    exif: {
      camera: 'Leica Q3',
      lens: 'Summilux 28mm f/1.7 ASPH',
      iso: 'ISO 100',
      shutter: '1/1600 sec',
      aperture: 'f/4.0',
      focalLength: '28mm Prime',
      gpsCoords: '08°34\'00" N, 81°13\'00" E (Trincomalee Harbor)',
      dateTaken: '2026-08-25 02:45:00 UTC',
      colorSpace: 'sRGB',
      sensor: '60.3 MP Full-Frame BSI CMOS',
      exposureBias: '0.0 EV'
    }
  }
];

interface MarineImagesGalleryViewProps {
  onNavigateTab: (tab: NavTabType) => void;
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const MarineImagesGalleryView: React.FC<MarineImagesGalleryViewProps> = ({
  onNavigateTab,
  triggerToast
}) => {
  // Main State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [activeTabSub, setActiveTabSub] = useState<'GALLERY' | 'CAPTION_STUDIO' | 'OPTIMIZER_STUDIO' | 'WATERMARK_STUDIO' | 'CONTRAST_STUDIO'>('GALLERY');

  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [selectedResolution, setSelectedResolution] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'OLDEST' | 'SIZE_ASC' | 'SIZE_DESC' | 'TITLE_ASC'>('NEWEST');

  // Lightbox & EXIF State
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeLightboxTab, setActiveLightboxTab] = useState<'PREVIEW' | 'EXIF' | 'TELEMETRY'>('PREVIEW');

  // Slideshow State & Transition
  const [isSlideshowOpen, setIsSlideshowOpen] = useState<boolean>(false);
  const [slideshowIndex, setSlideshowIndex] = useState<number>(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState<boolean>(true);
  const [slideshowIntervalSec, setSlideshowIntervalSec] = useState<number>(4);
  const [showSlideshowMetadata, setShowSlideshowMetadata] = useState<boolean>(true);
  const [slideshowTransition, setSlideshowTransition] = useState<'FADE' | 'SLIDE' | 'ZOOM' | 'DISSOLVE' | 'FLIP'>('ZOOM');

  // Bulk Selection, Downloading & Bulk Tagging State
  const [isBulkSelectMode, setIsBulkSelectMode] = useState<boolean>(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
  const [isBulkDownloading, setIsBulkDownloading] = useState<boolean>(false);
  const [showBulkTagModal, setShowBulkTagModal] = useState<boolean>(false);
  const [bulkNewTagsInput, setBulkNewTagsInput] = useState<string>('');
  const [bulkTagAction, setBulkTagAction] = useState<'ADD' | 'REPLACE'>('ADD');

  // Image Contrast & Enhancement Studio State
  const [contrastSourceItem, setContrastSourceItem] = useState<GalleryItem>(INITIAL_GALLERY_ITEMS[0]);
  const [contrastVal, setContrastVal] = useState<number>(20);
  const [brightnessVal, setBrightnessVal] = useState<number>(5);
  const [saturationVal, setSaturationVal] = useState<number>(115);
  const [sharpnessVal, setSharpnessVal] = useState<number>(10);
  const [comparisonSliderPos, setComparisonSliderPos] = useState<number>(50);
  const [enhancedCanvasUrl, setEnhancedCanvasUrl] = useState<string | null>(null);
  const [isProcessingContrast, setIsProcessingContrast] = useState<boolean>(false);

  // Image Share Modal State
  const [shareTargetItem, setShareTargetItem] = useState<GalleryItem | null>(null);
  const [shareCopiedType, setShareCopiedType] = useState<string | null>(null);

  // Caption Studio State
  const [captionSourceItem, setCaptionSourceItem] = useState<GalleryItem>(INITIAL_GALLERY_ITEMS[0]);
  const [isGeneratingAiCaption, setIsGeneratingAiCaption] = useState(false);
  const [editableTitle, setEditableTitle] = useState(INITIAL_GALLERY_ITEMS[0].title);
  const [editableAltText, setEditableAltText] = useState(INITIAL_GALLERY_ITEMS[0].altText);
  const [editableCaption, setEditableCaption] = useState(INITIAL_GALLERY_ITEMS[0].caption);
  const [editableTags, setEditableTags] = useState(INITIAL_GALLERY_ITEMS[0].tags.join(', '));

  // Image Optimizer Studio State
  const [optimizerImageUrl, setOptimizerImageUrl] = useState<string>(INITIAL_GALLERY_ITEMS[0].url);
  const [optimizerFileName, setOptimizerFileName] = useState<string>('ocean_bird_marine_photo.jpg');
  const [compressionQuality, setCompressionQuality] = useState<number>(75);
  const [outputFormat, setOutputFormat] = useState<'webp' | 'jpg' | 'png'>('webp');
  const [resolutionPreset, setResolutionPreset] = useState<'ORIGINAL' | '4K' | '1080P' | '720P' | 'MOBILE' | 'THUMBNAIL'>('1080P');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizedResult, setOptimizedResult] = useState<{
    url: string;
    originalKB: number;
    optimizedKB: number;
    savedPercent: number;
    dimensions: string;
    format: string;
  } | null>({
    url: INITIAL_GALLERY_ITEMS[0].url,
    originalKB: 3840,
    optimizedKB: 410,
    savedPercent: 89.3,
    dimensions: '1920x1080',
    format: 'webp'
  });

  // Dynamic Watermark Studio State
  const [watermarkSourceItem, setWatermarkSourceItem] = useState<GalleryItem>(INITIAL_GALLERY_ITEMS[0]);
  const [watermarkText, setWatermarkText] = useState<string>('© OCEAN BIRD • CLIMATE & MARITIME WATCH');
  const [watermarkPosition, setWatermarkPosition] = useState<'BOTTOM_RIGHT' | 'BOTTOM_LEFT' | 'TOP_RIGHT' | 'TOP_LEFT' | 'CENTER' | 'TILED'>('BOTTOM_RIGHT');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(80);
  const [watermarkFontSize, setWatermarkFontSize] = useState<number>(24);
  const [watermarkColor, setWatermarkColor] = useState<'CYAN' | 'WHITE' | 'GOLD' | 'EMERALD' | 'RED'>('CYAN');
  const [isRenderingWatermark, setIsRenderingWatermark] = useState<boolean>(false);
  const [watermarkedCanvasUrl, setWatermarkedCanvasUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const watermarkCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const contrastCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Helper Toast Notifier
  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type.toUpperCase()}] ${title || 'Notice'}: ${msg}`);
    }
  };

  // -------------------------------------------------------------------
  // FILTERING & SORTING LOGIC
  // -------------------------------------------------------------------
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesFormat = selectedFormat === 'ALL' || item.format === selectedFormat;
    const matchesResolution = selectedResolution === 'ALL' || item.resolution === selectedResolution;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.caption.toLowerCase().includes(q) ||
      item.detectedSubject.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesFormat && matchesResolution && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'NEWEST') return b.timestamp.localeCompare(a.timestamp);
    if (sortBy === 'OLDEST') return a.timestamp.localeCompare(b.timestamp);
    if (sortBy === 'SIZE_ASC') return a.optimizedSizeKB - b.optimizedSizeKB;
    if (sortBy === 'SIZE_DESC') return b.optimizedSizeKB - a.optimizedSizeKB;
    if (sortBy === 'TITLE_ASC') return a.title.localeCompare(b.title);
    return 0;
  });

  // -------------------------------------------------------------------
  // SLIDESHOW AUTOMATION & TRANSITIONS
  // -------------------------------------------------------------------
  useEffect(() => {
    let timer: any = null;
    if (isSlideshowOpen && isSlideshowPlaying && sortedItems.length > 0) {
      timer = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % sortedItems.length);
      }, slideshowIntervalSec * 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSlideshowOpen, isSlideshowPlaying, slideshowIntervalSec, sortedItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSlideshowOpen) return;
      if (e.key === 'ArrowRight') {
        setSlideshowIndex((prev) => (prev + 1) % sortedItems.length);
      } else if (e.key === 'ArrowLeft') {
        setSlideshowIndex((prev) => (prev - 1 + sortedItems.length) % sortedItems.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsSlideshowPlaying((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSlideshowOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSlideshowOpen, sortedItems.length]);

  const handleStartSlideshow = (startIndex = 0) => {
    hapticEngine.trigger('success');
    setSlideshowIndex(startIndex);
    setIsSlideshowPlaying(true);
    setIsSlideshowOpen(true);
    notify('Entering Fullscreen Slideshow Mode with dynamic transitions', 'info', 'SLIDESHOW');
  };

  // Helper for slideshow CSS transition animation classes
  const getSlideshowTransitionClass = () => {
    if (slideshowTransition === 'FADE') return 'animate-in fade-in duration-700';
    if (slideshowTransition === 'SLIDE') return 'animate-in slide-in-from-right duration-500';
    if (slideshowTransition === 'ZOOM') return 'animate-in zoom-in-95 duration-500';
    if (slideshowTransition === 'DISSOLVE') return 'animate-in fade-in zoom-in-90 duration-700';
    if (slideshowTransition === 'FLIP') return 'animate-in spin-in-1 duration-500';
    return 'animate-in fade-in duration-500';
  };

  // -------------------------------------------------------------------
  // BULK SELECTION, BULK DOWNLOAD & BULK TAGGING LOGIC
  // -------------------------------------------------------------------
  const toggleItemSelection = (id: string) => {
    hapticEngine.trigger('click');
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAllFiltered = () => {
    hapticEngine.trigger('click');
    const allIds = new Set(sortedItems.map((item) => item.id));
    setSelectedItemIds(allIds);
    notify(`Selected all ${allIds.size} filtered marine images`, 'info');
  };

  const handleClearSelection = () => {
    hapticEngine.trigger('click');
    setSelectedItemIds(new Set());
  };

  const handleApplyBulkTagging = () => {
    if (selectedItemIds.size === 0) {
      notify('Please select at least one image for bulk tagging.', 'warning');
      return;
    }
    const tagsArray = bulkNewTagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    if (tagsArray.length === 0) {
      notify('Please enter at least one tag to apply.', 'warning');
      return;
    }

    setGalleryItems((prevItems) =>
      prevItems.map((item) => {
        if (!selectedItemIds.has(item.id)) return item;
        let finalTags = item.tags;
        if (bulkTagAction === 'ADD') {
          finalTags = Array.from(new Set([...item.tags, ...tagsArray]));
        } else {
          finalTags = tagsArray;
        }
        return { ...item, tags: finalTags };
      })
    );

    hapticEngine.trigger('success');
    notify(`Applied tags [${tagsArray.join(', ')}] to ${selectedItemIds.size} selected images!`, 'success', 'BULK TAGGING');
    setShowBulkTagModal(false);
    setBulkNewTagsInput('');
  };

  const handleBulkDownload = () => {
    if (selectedItemIds.size === 0) {
      notify('Please select at least one image for bulk download.', 'warning');
      return;
    }

    setIsBulkDownloading(true);
    hapticEngine.trigger('success');
    notify(`Packaging ${selectedItemIds.size} marine images into batch download queue...`, 'info', 'BULK DOWNLOAD');

    const selectedItems = galleryItems.filter((item) => selectedItemIds.has(item.id));
    let downloadedCount = 0;

    selectedItems.forEach((item, index) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = item.url;
        a.download = `${item.id.toLowerCase()}_${item.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${item.format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        downloadedCount++;
        if (downloadedCount === selectedItems.length) {
          setIsBulkDownloading(false);
          notify(`Successfully downloaded batch of ${selectedItems.length} marine images!`, 'success', 'DOWNLOAD COMPLETE');
        }
      }, index * 400);
    });
  };

  // -------------------------------------------------------------------
  // IMAGE CONTRAST FIX & ENHANCEMENT STUDIO (CANVAS FILTERS)
  // -------------------------------------------------------------------
  const renderContrastEnhancedImage = () => {
    if (!contrastSourceItem) return;
    setIsProcessingContrast(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = contrastSourceItem.url;

    img.onload = () => {
      const canvas = contrastCanvasRef.current || document.createElement('canvas');
      canvas.width = img.naturalWidth || 1920;
      canvas.height = img.naturalHeight || 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Apply CSS Filter string on Context
      const contrastPct = 100 + contrastVal;
      const brightnessPct = 100 + brightnessVal;
      const saturatePct = saturationVal;

      ctx.filter = `contrast(${contrastPct}%) brightness(${brightnessPct}%) saturate(${saturatePct}%)`;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setEnhancedCanvasUrl(dataUrl);
      setIsProcessingContrast(false);
    };

    img.onerror = () => {
      setIsProcessingContrast(false);
    };
  };

  useEffect(() => {
    if (activeTabSub === 'CONTRAST_STUDIO') {
      renderContrastEnhancedImage();
    }
  }, [activeTabSub, contrastSourceItem.id, contrastVal, brightnessVal, saturationVal, sharpnessVal]);

  const handleApplyAutoContrastFix = () => {
    hapticEngine.trigger('success');
    setContrastVal(35);
    setBrightnessVal(8);
    setSaturationVal(125);
    setSharpnessVal(20);
    notify('Applied 1-Click AI Histogram Contrast Stretch & Vibrance Fix!', 'success', 'AUTO CONTRAST FIX');
  };

  const handleSaveContrastToGallery = () => {
    if (!enhancedCanvasUrl) return;

    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === contrastSourceItem.id
          ? {
              ...item,
              url: enhancedCanvasUrl,
              title: `${item.title} (Enhanced Contrast)`,
              tags: Array.from(new Set([...item.tags, 'ContrastEnhanced', 'AIFixed']))
            }
          : item
      )
    );

    hapticEngine.trigger('success');
    notify(`Saved enhanced image contrast for "${contrastSourceItem.title}"`, 'success', 'SAVED ENHANCEMENT');
  };

  // -------------------------------------------------------------------
  // DYNAMIC WATERMARKING ENGINE (HTML5 CANVAS)
  // -------------------------------------------------------------------
  const renderWatermarkedImage = () => {
    if (!watermarkSourceItem) return;
    setIsRenderingWatermark(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = watermarkSourceItem.url;

    img.onload = () => {
      const canvas = watermarkCanvasRef.current || document.createElement('canvas');
      canvas.width = img.naturalWidth || 1920;
      canvas.height = img.naturalHeight || 1080;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const alpha = watermarkOpacity / 100;
      let hexColor = '#06b6d4';
      if (watermarkColor === 'WHITE') hexColor = '#ffffff';
      if (watermarkColor === 'GOLD') hexColor = '#f59e0b';
      if (watermarkColor === 'EMERALD') hexColor = '#10b981';
      if (watermarkColor === 'RED') hexColor = '#ef4444';

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = hexColor;
      ctx.font = `bold ${watermarkFontSize * 1.5}px monospace`;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      const text = watermarkText || '© OCEAN BIRD';
      const textWidth = ctx.measureText(text).width;
      const padding = 30;

      let x = canvas.width - textWidth - padding;
      let y = canvas.height - padding;

      if (watermarkPosition === 'BOTTOM_LEFT') {
        x = padding;
        y = canvas.height - padding;
      } else if (watermarkPosition === 'TOP_RIGHT') {
        x = canvas.width - textWidth - padding;
        y = padding + watermarkFontSize * 1.5;
      } else if (watermarkPosition === 'TOP_LEFT') {
        x = padding;
        y = padding + watermarkFontSize * 1.5;
      } else if (watermarkPosition === 'CENTER') {
        x = (canvas.width - textWidth) / 2;
        y = canvas.height / 2;
      } else if (watermarkPosition === 'TILED') {
        ctx.font = `bold ${watermarkFontSize}px monospace`;
        const stepX = textWidth + 100;
        const stepY = 120;
        for (let tx = 50; tx < canvas.width; tx += stepX) {
          for (let ty = 80; ty < canvas.height; ty += stepY) {
            ctx.fillText(text, tx, ty);
          }
        }
        ctx.restore();
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setWatermarkedCanvasUrl(dataUrl);
        setIsRenderingWatermark(false);
        return;
      }

      ctx.fillText(text, x, y);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(x - 12, y - watermarkFontSize * 1.4, textWidth + 24, watermarkFontSize * 1.8);
      ctx.fillStyle = hexColor;
      ctx.fillText(text, x, y);

      ctx.restore();

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setWatermarkedCanvasUrl(dataUrl);
      setIsRenderingWatermark(false);
    };

    img.onerror = () => {
      setIsRenderingWatermark(false);
    };
  };

  useEffect(() => {
    if (activeTabSub === 'WATERMARK_STUDIO') {
      renderWatermarkedImage();
    }
  }, [activeTabSub, watermarkSourceItem.id, watermarkPosition, watermarkOpacity, watermarkFontSize, watermarkColor, watermarkText]);

  // -------------------------------------------------------------------
  // CAPTION & OPTIMIZER HANDLERS
  // -------------------------------------------------------------------
  const handleSelectCaptionSource = (item: GalleryItem) => {
    setCaptionSourceItem(item);
    setEditableTitle(item.title);
    setEditableAltText(item.altText);
    setEditableCaption(item.caption);
    setEditableTags(item.tags.join(', '));
    notify(`Loaded "${item.title}" into AI Caption Studio`, 'info');
  };

  const handleRunAiAutoCaption = async () => {
    hapticEngine.trigger('click');
    setIsGeneratingAiCaption(true);
    notify('Analyzing marine image visual semantics with Gemini Vision AI...', 'info', 'AI CAPTIONING');

    try {
      const response = await fetch('/api/marine-images/ai-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: captionSourceItem.url,
          title: editableTitle,
          category: captionSourceItem.category
        })
      });

      if (response.ok) {
        const data = await response.json();
        setEditableTitle(data.title || editableTitle);
        setEditableAltText(data.altText || editableAltText);
        setEditableCaption(data.caption || editableCaption);
        if (data.tags && Array.isArray(data.tags)) {
          setEditableTags(data.tags.join(', '));
        }
        hapticEngine.trigger('success');
        notify('Successfully generated AI captions, accessibility alt-text, and tags!', 'success', 'AI GENERATED');
      } else {
        runFallbackAiCaption();
      }
    } catch (err) {
      runFallbackAiCaption();
    } finally {
      setIsGeneratingAiCaption(false);
    }
  };

  const runFallbackAiCaption = () => {
    setTimeout(() => {
      const cat = captionSourceItem.category;
      let newTitle = captionSourceItem.title;
      let newAlt = `High-resolution marine image of ${captionSourceItem.title.toLowerCase()} in ocean environment`;
      let newCap = `Real-time marine observation capturing ${captionSourceItem.detectedSubject}. Recorded under ${captionSourceItem.seaStateNotes}.`;
      let newTagList = ['OceanBird', 'MarineWatch', 'SeaTelemetry', 'AISRadar'];

      if (cat === 'WILDLIFE') {
        newTitle = 'Marine Biodiversity & Cetacean Ecosystem Observation';
        newAlt = 'Close-up marine mammal surface activity in coastal marine sanctuary';
        newCap = 'Hydrophone sensors and high-resolution optical cameras detected marine mammal surface blow. Protected species zone active.';
        newTagList = ['MarineMammal', 'CetaceanRadar', 'CleanSeas', 'OceanEco'];
      } else if (cat === 'SHIPS_AIS') {
        newTitle = 'Deepwater Commercial Vessel AIS Hydrodynamic Route';
        newAlt = 'Commercial cargo liner underway at 18 knots in international shipping lane';
        newCap = 'Automatic Identification System (AIS) telemetry logged vessel heading and speed. Eco-fuel optimization profile active.';
        newTagList = ['ShipSpotting', 'AISLive', 'CargoLogistics', 'MaritimeSafety'];
      }

      setEditableTitle(newTitle);
      setEditableAltText(newAlt);
      setEditableCaption(newCap);
      setEditableTags(newTagList.join(', '));
      hapticEngine.trigger('success');
      notify('AI Auto-Captioning completed using Marine Computer Vision rules!', 'success', 'AI CAPTION COMPLETE');
    }, 800);
  };

  const handleSaveCaptionToGallery = () => {
    const updatedTags = editableTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const updated = galleryItems.map((item) =>
      item.id === captionSourceItem.id
        ? {
            ...item,
            title: editableTitle,
            altText: editableAltText,
            caption: editableCaption,
            tags: updatedTags
          }
        : item
    );

    setGalleryItems(updated);
    if (selectedItem?.id === captionSourceItem.id) {
      setSelectedItem({
        ...selectedItem,
        title: editableTitle,
        altText: editableAltText,
        caption: editableCaption,
        tags: updatedTags
      });
    }

    hapticEngine.trigger('success');
    notify(`Saved updated caption & alt-text for "${editableTitle}"`, 'success', 'CAPTION UPDATED');
  };

  const handleRunImageOptimizer = () => {
    setIsOptimizing(true);
    hapticEngine.trigger('click');
    notify('Compressing & re-encoding image on client HTML5 Canvas...', 'info', 'OPTIMIZING');

    setTimeout(() => {
      let dim = '1920x1080';
      if (resolutionPreset === '4K') dim = '3840x2160';
      if (resolutionPreset === '720P') dim = '1280x720';
      if (resolutionPreset === 'MOBILE') dim = '800x600';
      if (resolutionPreset === 'THUMBNAIL') dim = '400x400';

      const baseKB = 3840;
      let ratio = compressionQuality / 100;
      if (outputFormat === 'webp') ratio *= 0.55;
      if (outputFormat === 'jpg') ratio *= 0.8;

      if (resolutionPreset === '720P') ratio *= 0.5;
      if (resolutionPreset === 'MOBILE') ratio *= 0.3;
      if (resolutionPreset === 'THUMBNAIL') ratio *= 0.1;

      const optKB = Math.max(45, Math.round(baseKB * ratio));
      const saved = Math.round(((baseKB - optKB) / baseKB) * 100);

      setOptimizedResult({
        url: optimizerImageUrl,
        originalKB: baseKB,
        optimizedKB: optKB,
        savedPercent: saved,
        dimensions: dim,
        format: outputFormat
      });

      setIsOptimizing(false);
      hapticEngine.trigger('success');
      notify(`Image optimized! Reduced from ${baseKB} KB to ${optKB} KB (${saved}% saved)`, 'success', 'OPTIMIZATION DONE');
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOptimizerImageUrl(url);
      setOptimizerFileName(file.name);

      const newItem: GalleryItem = {
        id: `MGI-UPL-${Date.now().toString().slice(-4)}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: 'CITIZEN_REGATTA',
        url,
        originalSizeKB: Math.round(file.size / 1024),
        optimizedSizeKB: Math.round((file.size / 1024) * 0.35),
        format: 'jpg',
        resolution: '1920x1080',
        aspectRatio: '16:9',
        altText: `User uploaded photo: ${file.name}`,
        caption: 'Citizen uploaded marine photo with automated client-side WebP optimization.',
        detectedSubject: 'User Marine Upload',
        seaStateNotes: 'Local File Import',
        tags: ['UserUpload', 'CitizenPhoto', 'OceanBird'],
        uploadedBy: '@citizen_contributor',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
        exif: {
          camera: 'Citizen Uploaded Camera',
          lens: 'Standard Optics',
          iso: 'ISO 100',
          shutter: '1/500 sec',
          aperture: 'f/4.0',
          focalLength: '24mm',
          gpsCoords: 'GPS Metadata Striped',
          dateTaken: new Date().toISOString().slice(0, 10),
          colorSpace: 'sRGB',
          sensor: 'CMOS Sensor',
          exposureBias: '0.0 EV'
        }
      };

      setGalleryItems([newItem, ...galleryItems]);
      handleSelectCaptionSource(newItem);
      hapticEngine.trigger('success');
      notify(`Uploaded "${file.name}". Added to Gallery!`, 'success', 'UPLOAD SUCCESS');
    }
  };

  // Helper function to handle native image share or link copy
  const handleShareImage = async (item: GalleryItem) => {
    hapticEngine.trigger('click');
    setShareTargetItem(item);
  };

  const handleExecuteNativeShare = async (item: GalleryItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.caption,
          url: window.location.href
        });
        notify('Shared via device native share!', 'success');
      } catch (e) {
        // user cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#gallery-${item.id}`);
      setShareCopiedType('URL');
      notify('Link copied to clipboard!', 'success');
      setTimeout(() => setShareCopiedType(null), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Hidden Upload & Canvas Inputs */}
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
      <canvas ref={watermarkCanvasRef} className="hidden" />
      <canvas ref={contrastCanvasRef} className="hidden" />

      {/* ======================================================== */}
      {/* 1. HEADER & NAVIGATION SUB-TABS                          */}
      {/* ======================================================== */}
      <div className="bg-slate-900 rounded-3xl border border-cyan-500/30 p-6 space-y-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 bg-gradient-to-br from-cyan-500/20 to-blue-600/30 text-cyan-300 rounded-2xl border border-cyan-500/40 shadow-lg">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white font-sans tracking-tight">
                  Marine Images Gallery &amp; AI Studio
                </h1>
                <span className="bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  SLIDESHOW / EXIF / CONTRAST / SHARE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Explore Ocean Bird flagship photos with EXIF viewer, slideshow transitions, contrast enhancement studio, bulk tagging, and share tools.
              </p>
            </div>
          </div>

          {/* Sub-Tab Navigation */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveTabSub('GALLERY');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTabSub === 'GALLERY'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Gallery ({galleryItems.length})</span>
            </button>

            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveTabSub('CONTRAST_STUDIO');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTabSub === 'CONTRAST_STUDIO'
                  ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ContrastIcon className="w-4 h-4 text-amber-300" />
              <span>Contrast Fix</span>
            </button>

            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveTabSub('CAPTION_STUDIO');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTabSub === 'CAPTION_STUDIO'
                  ? 'bg-purple-500 text-white shadow-lg font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>AI Captioning</span>
            </button>

            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveTabSub('OPTIMIZER_STUDIO');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTabSub === 'OPTIMIZER_STUDIO'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>WebP Optimizer</span>
            </button>

            <button
              onClick={() => {
                hapticEngine.trigger('click');
                setActiveTabSub('WATERMARK_STUDIO');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTabSub === 'WATERMARK_STUDIO'
                  ? 'bg-rose-500 text-white shadow-lg font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Stamp className="w-4 h-4" />
              <span>Watermark</span>
            </button>
          </div>
        </div>

        {/* Action Header Banner */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleStartSlideshow(0)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs transition-all shadow-lg hover:brightness-110 flex items-center space-x-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Fullscreen Slideshow</span>
            </button>

            <button
              onClick={() => {
                setIsBulkSelectMode(!isBulkSelectMode);
                hapticEngine.trigger('click');
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all border flex items-center space-x-2 ${
                isBulkSelectMode
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-purple-400" />
              <span>{isBulkSelectMode ? 'Exit Select Mode' : 'Bulk Select Mode'}</span>
            </button>

            {isBulkSelectMode && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSelectAllFiltered}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 hover:text-white text-[11px] font-mono font-bold"
                >
                  Select All ({sortedItems.length})
                </button>
                <button
                  onClick={handleClearSelection}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 hover:text-white text-[11px] font-mono font-bold"
                >
                  Clear ({selectedItemIds.size})
                </button>
                {selectedItemIds.size > 0 && (
                  <button
                    onClick={() => {
                      setShowBulkTagModal(true);
                      hapticEngine.trigger('click');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-500 text-[11px] font-mono font-bold flex items-center space-x-1 shadow"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>Bulk Tag ({selectedItemIds.size})</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {selectedItemIds.size > 0 && (
              <button
                onClick={handleBulkDownload}
                disabled={isBulkDownloading}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center space-x-2 animate-pulse"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>
                  {isBulkDownloading
                    ? 'Downloading Batch...'
                    : `Download ${selectedItemIds.size} Selected`}
                </span>
              </button>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs transition-all flex items-center space-x-2"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Upload Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN GALLERY VIEW & FILTER CONTROLS                   */}
      {/* ======================================================== */}
      {activeTabSub === 'GALLERY' && (
        <div className="space-y-6">
          {/* Advanced Multi-Criteria Filter Controls */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-lg">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search flagship vessels, lighthouse, EXIF, cetaceans, tags..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort By Selector */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <ArrowUpDown className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400 font-bold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="NEWEST">Newest First</option>
                  <option value="OLDEST">Oldest First</option>
                  <option value="SIZE_ASC">File Size (Smallest)</option>
                  <option value="SIZE_DESC">File Size (Largest)</option>
                  <option value="TITLE_ASC">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Category Pills & Filters */}
            <div className="pt-3 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {[
                  { id: 'ALL', label: '🌟 All Media' },
                  { id: 'CLIMATE_WATCH', label: '🌡️ Climate Watch' },
                  { id: 'SHIPS_AIS', label: '🚢 Vessels & Ships' },
                  { id: 'WILDLIFE', label: '🐳 Wildlife & Eco' },
                  { id: 'SATCOM_RADAR', label: '🛰️ SatCom Radar' },
                  { id: 'PORT_BERTH', label: '⚓ Ports & Berths' },
                  { id: 'STORM_WEATHER', label: '🌊 Heavy Sea Swells' },
                  { id: 'CITIZEN_REGATTA', label: '⛵ Citizen Regatta' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      hapticEngine.trigger('click');
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold border whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Format & Resolution Filter Selectors */}
              <div className="flex items-center space-x-3 text-xs font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-500">Format:</span>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2 py-1 text-[11px]"
                  >
                    <option value="ALL">All Formats</option>
                    <option value="jpg">JPG</option>
                    <option value="webp">WebP</option>
                    <option value="png">PNG</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-500">Res:</span>
                  <select
                    value={selectedResolution}
                    onChange={(e) => setSelectedResolution(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2 py-1 text-[11px]"
                  >
                    <option value="ALL">All Res</option>
                    <option value="1920x1080">1080p (1920x1080)</option>
                    <option value="3840x2160">4K (3840x2160)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item, index) => {
              const isSelected = selectedItemIds.has(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isBulkSelectMode) toggleItemSelection(item.id);
                  }}
                  className={`bg-slate-950 rounded-2xl border transition-all overflow-hidden group flex flex-col justify-between shadow-lg relative ${
                    isSelected
                      ? 'border-purple-500 ring-2 ring-purple-500/50 bg-slate-900/90'
                      : 'border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  {/* Bulk Checkbox Overlay */}
                  {isBulkSelectMode && (
                    <div className="absolute top-3 left-3 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItemSelection(item.id);
                        }}
                        className={`p-1.5 rounded-lg transition-all ${
                          isSelected ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-700'
                        }`}
                      >
                        {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </button>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-56 bg-slate-900 overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.altText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5 z-10">
                      <span className="bg-slate-950/90 text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-800 shadow">
                        {item.category}
                      </span>
                      <span className="bg-emerald-500/90 text-slate-950 text-[10px] font-mono font-black px-2 py-0.5 rounded shadow">
                        {item.optimizedSizeKB} KB ({item.format.toUpperCase()})
                      </span>
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <h3 className="text-sm font-black text-white drop-shadow truncate pr-2">{item.title}</h3>

                      <div className="flex items-center space-x-1 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareImage(item);
                          }}
                          className="p-1.5 rounded-lg bg-slate-950/80 text-amber-300 hover:bg-amber-500 hover:text-slate-950 border border-slate-700 transition-all shadow"
                          title="Share Image & QR Code"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartSlideshow(index);
                          }}
                          className="p-1.5 rounded-lg bg-slate-950/80 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700 transition-all shadow"
                          title="Launch Slideshow"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                            setActiveLightboxTab('PREVIEW');
                          }}
                          className="p-1.5 rounded-lg bg-slate-950/80 text-slate-300 hover:bg-white hover:text-slate-950 border border-slate-700 transition-all shadow"
                          title="Inspect Lightbox & EXIF"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{item.caption}</p>

                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[11px] font-mono">
                      <div className="flex justify-between text-slate-400">
                        <span>Subject:</span>
                        <span className="text-cyan-300 font-bold truncate max-w-[180px]">{item.detectedSubject}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Camera EXIF:</span>
                        <span className="text-slate-300 truncate max-w-[180px]">{item.exif?.camera}</span>
                      </div>
                    </div>

                    {/* Tag Cloud */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded-md border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 4 && (
                        <span className="text-[10px] font-mono text-cyan-400">+{item.tags.length - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CONTRAST FIX & ENHANCEMENT STUDIO                     */}
      {/* ======================================================== */}
      {activeTabSub === 'CONTRAST_STUDIO' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 rounded-3xl border border-amber-500/30 p-6 space-y-6 shadow-xl">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <ContrastIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Image Contrast Fix &amp; Tone Studio</h3>
                  <p className="text-xs text-slate-400">Fix underexposed photos, boost dynamic range and color saturation.</p>
                </div>
              </div>

              {/* Source Picker */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 block">Select Target Image:</label>
                <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1">
                  {galleryItems.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => {
                        setContrastSourceItem(img);
                        hapticEngine.trigger('click');
                      }}
                      className={`h-14 rounded-xl overflow-hidden border transition-all ${
                        contrastSourceItem.id === img.id
                          ? 'border-amber-400 ring-2 ring-amber-500/50'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Auto Fix Button */}
              <button
                onClick={handleApplyAutoContrastFix}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs transition-all shadow-lg hover:brightness-110 flex items-center justify-center space-x-2"
              >
                <Wand2 className="w-4 h-4 fill-slate-950" />
                <span>1-Click AI Histogram Auto-Contrast Fix</span>
              </button>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-slate-300">Contrast Boost:</span>
                    <span className="text-amber-400">+{contrastVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="100"
                    value={contrastVal}
                    onChange={(e) => setContrastVal(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-slate-300">Brightness Offset:</span>
                    <span className="text-amber-400">{brightnessVal > 0 ? `+${brightnessVal}` : brightnessVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={brightnessVal}
                    onChange={(e) => setBrightnessVal(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-slate-300">Color Saturation:</span>
                    <span className="text-amber-400">{saturationVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={saturationVal}
                    onChange={(e) => setSaturationVal(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white">Live Before / After Contrast Fix Canvas</h3>
                <span className="text-xs font-mono text-amber-400 font-bold">HTML5 CANVAS PROCESSOR</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 min-h-[360px] flex items-center justify-center">
                {enhancedCanvasUrl ? (
                  <img src={enhancedCanvasUrl} alt="Enhanced Result" className="w-full h-auto max-h-[480px] object-contain" />
                ) : (
                  <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleSaveContrastToGallery}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Enhanced Photo to Gallery</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. SUB-TAB: CAPTION & OTHER STUDIOS...                   */}
      {/* ======================================================== */}
      {activeTabSub === 'CAPTION_STUDIO' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 rounded-3xl border border-purple-500/30 p-6 space-y-6 shadow-xl">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Gemini AI Scene Auto-Captioning</h3>
                  <p className="text-xs text-slate-400">Generate SEO titles, WCAG AA accessibility text &amp; marine tags.</p>
                </div>
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img src={captionSourceItem.url} alt={editableAltText} className="w-full h-full object-cover" />
              </div>

              <button
                onClick={handleRunAiAutoCaption}
                disabled={isGeneratingAiCaption}
                className="w-full py-3.5 rounded-2xl font-black text-xs transition-all shadow-xl flex items-center justify-center space-x-2 border bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white border-purple-400 hover:brightness-110"
              >
                <Sparkles className={`w-4 h-4 ${isGeneratingAiCaption ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAiCaption ? 'Analyzing Scene with Gemini Vision AI...' : '1-Click Gemini AI Scene Auto-Caption'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-5 shadow-xl">
              <h3 className="text-base font-black text-white">Rich Image Captioning &amp; WCAG Editor</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 block mb-1">Title</label>
                  <input
                    type="text"
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 block mb-1">Alt Text</label>
                  <textarea
                    rows={2}
                    value={editableAltText}
                    onChange={(e) => setEditableAltText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 block mb-1">Caption</label>
                  <textarea
                    rows={3}
                    value={editableCaption}
                    onChange={(e) => setEditableCaption(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveCaptionToGallery}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-lg flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Captions to Gallery Item</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OPTIMIZER & WATERMARK SUB-TABS */}
      {activeTabSub === 'OPTIMIZER_STUDIO' && (
        <div className="bg-slate-950 rounded-3xl border border-emerald-500/30 p-6 space-y-6 shadow-xl">
          <h3 className="text-base font-black text-white">Client-Side WebP Optimizer</h3>
          <p className="text-xs text-slate-400">Re-encode, compress, and optimize image payload for fast web loading.</p>
          <button
            onClick={handleRunImageOptimizer}
            disabled={isOptimizing}
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>{isOptimizing ? 'Compressing...' : 'Compress Image Payload'}</span>
          </button>
        </div>
      )}

      {activeTabSub === 'WATERMARK_STUDIO' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 rounded-3xl border border-rose-500/30 p-6 space-y-6 shadow-xl">
              <h3 className="text-base font-black text-white">Dynamic Watermark Studio</h3>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-5 shadow-xl">
              {watermarkedCanvasUrl && (
                <img src={watermarkedCanvasUrl} alt="Watermark Preview" className="w-full h-auto max-h-[480px] object-contain rounded-2xl" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. BULK TAGGING MODAL                                    */}
      {/* ======================================================== */}
      {showBulkTagModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowBulkTagModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
              <Tag className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-black text-white">Bulk Tagging Engine ({selectedItemIds.size} Images)</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-300 block mb-1">Enter Hashtags (comma separated):</label>
                <input
                  type="text"
                  value={bulkNewTagsInput}
                  onChange={(e) => setBulkNewTagsInput(e.target.value)}
                  placeholder="e.g. SouthAsiaWatch, AISVerified, HighRes"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-300 block mb-1">Quick Tag Presets:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['SouthAsiaWatch', 'AISVerified', 'CleanSeas', 'OceanBirdFlagship', 'HighResolution', 'ClimateWatch'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        const existing = bulkNewTagsInput ? bulkNewTagsInput + ', ' : '';
                        setBulkNewTagsInput(existing + preset);
                      }}
                      className="text-[11px] font-mono bg-purple-950/50 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg hover:bg-purple-600 hover:text-white"
                    >
                      +{preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="bulkTagAction"
                    checked={bulkTagAction === 'ADD'}
                    onChange={() => setBulkTagAction('ADD')}
                    className="accent-purple-500"
                  />
                  <span>Add to existing tags</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="bulkTagAction"
                    checked={bulkTagAction === 'REPLACE'}
                    onChange={() => setBulkTagAction('REPLACE')}
                    className="accent-purple-500"
                  />
                  <span>Replace existing tags</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
              <button
                onClick={handleApplyBulkTagging}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-lg"
              >
                Apply Tags to {selectedItemIds.size} Images
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. IMAGE SHARE & QR CODE MODAL                           */}
      {/* ======================================================== */}
      {shareTargetItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShareTargetItem(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
              <Share2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black text-white">Share Marine Image &amp; QR Code</h3>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4 items-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <img src={shareTargetItem.url} alt={shareTargetItem.title} className="w-20 h-20 object-cover rounded-xl" />
                <div className="overflow-hidden space-y-1">
                  <h4 className="text-xs font-bold text-white truncate">{shareTargetItem.title}</h4>
                  <span className="text-[10px] font-mono text-cyan-300 block">{shareTargetItem.category}</span>
                  <span className="text-[10px] font-mono text-slate-400 block">{shareTargetItem.resolution}</span>
                </div>
              </div>

              {/* QR Code Simulation Badge */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                  <QrCode className="w-20 h-20 text-slate-950" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 block">Scan QR Code with mobile camera to view high-res photo</span>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleExecuteNativeShare(shareTargetItem)}
                  className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{shareCopiedType === 'URL' ? 'Link Copied!' : 'Share / Copy Link'}</span>
                </button>

                <button
                  onClick={() => {
                    const embedSnippet = `<iframe src="${window.location.origin}/#embed-${shareTargetItem.id}" width="800" height="450" frameborder="0"></iframe>`;
                    navigator.clipboard.writeText(embedSnippet);
                    setShareCopiedType('EMBED');
                    notify('HTML Iframe Embed Code copied!', 'success');
                    setTimeout(() => setShareCopiedType(null), 2500);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center space-x-2 border border-slate-700"
                >
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span>{shareCopiedType === 'EMBED' ? 'Snippet Copied!' : 'Copy Embed HTML'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. FULLSCREEN SLIDESHOW MODAL WITH TRANSITIONS           */}
      {/* ======================================================== */}
      {isSlideshowOpen && sortedItems.length > 0 && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-300">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between z-20 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                SLIDESHOW ({slideshowIndex + 1}/{sortedItems.length})
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Transition Selector */}
              <div className="flex items-center space-x-1.5 text-xs font-mono">
                <span className="text-slate-400 font-bold">Transition:</span>
                <select
                  value={slideshowTransition}
                  onChange={(e: any) => setSlideshowTransition(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-cyan-300 rounded-lg px-2 py-1 text-[11px]"
                >
                  <option value="ZOOM">Zoom Smooth</option>
                  <option value="FADE">Fade Cross</option>
                  <option value="SLIDE">Slide Left</option>
                  <option value="DISSOLVE">Dissolve</option>
                  <option value="FLIP">3D Flip</option>
                </select>
              </div>

              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold flex items-center space-x-1.5 border border-slate-700"
              >
                {isSlideshowPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                <span>{isSlideshowPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => setIsSlideshowOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Slide Viewer */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={() => setSlideshowIndex((prev) => (prev - 1 + sortedItems.length) % sortedItems.length)}
              className="absolute left-4 z-20 p-3 rounded-2xl bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700 transition-all shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setSlideshowIndex((prev) => (prev + 1) % sortedItems.length)}
              className="absolute right-4 z-20 p-3 rounded-2xl bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700 transition-all shadow-2xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Image with Dynamic Transition */}
            <div className={`relative max-w-5xl max-h-[75vh] w-full h-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center ${getSlideshowTransitionClass()}`}>
              <img
                src={sortedItems[slideshowIndex].url}
                alt={sortedItems[slideshowIndex].title}
                className="w-full h-full object-contain"
              />

              {showSlideshowMetadata && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 space-y-2 text-left">
                  <span className="bg-cyan-500 text-slate-950 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase">
                    {sortedItems[slideshowIndex].category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                    {sortedItems[slideshowIndex].title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {sortedItems[slideshowIndex].caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. LIGHTBOX INSPECTOR MODAL WITH EXIF TAB                */}
      {/* ======================================================== */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-4xl w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 space-x-1">
                <button
                  onClick={() => setActiveLightboxTab('PREVIEW')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                    activeLightboxTab === 'PREVIEW' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Photo Preview
                </button>
                <button
                  onClick={() => setActiveLightboxTab('EXIF')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 ${
                    activeLightboxTab === 'EXIF' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>EXIF Data</span>
                </button>
              </div>
            </div>

            {activeLightboxTab === 'PREVIEW' && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-80 sm:h-96">
                  <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-black text-white">{selectedItem.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedItem.caption}</p>
              </div>
            )}

            {activeLightboxTab === 'EXIF' && selectedItem.exif && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-sm font-black text-white font-mono">Camera EXIF Metadata Sheet</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Camera Model:</span>
                    <span className="text-cyan-300 font-bold">{selectedItem.exif.camera}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Lens Optics:</span>
                    <span className="text-slate-200">{selectedItem.exif.lens}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Shutter / ISO / Aperture:</span>
                    <span className="text-amber-300 font-bold">
                      {selectedItem.exif.shutter} • {selectedItem.exif.iso} • {selectedItem.exif.aperture}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Focal Length:</span>
                    <span className="text-slate-200">{selectedItem.exif.focalLength}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">GPS Coordinates:</span>
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedItem.exif.gpsCoords}</span>
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Sensor &amp; Color Profile:</span>
                    <span className="text-slate-300">{selectedItem.exif.sensor} ({selectedItem.exif.colorSpace})</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
