import React, { useState, useEffect } from 'react';
import { SeaStateWindDashboard } from './SeaStateWindDashboard';
import { SouthAsianCoastalImpactDashboard } from './SouthAsianCoastalImpactDashboard';
import { RegionalClimateAndEcoCruisePortal } from './RegionalClimateAndEcoCruisePortal';
import { ClimateScenariosModule } from './ClimateScenariosModule';
import { MarineBiodiversityModule } from './MarineBiodiversityModule';
import { ComparePortClimatesModule } from './ComparePortClimatesModule';
import { ExportWeatherReportModule } from './ExportWeatherReportModule';
import {
  MONSOON_RAINFALL_DATA,
  DAILY_FORECAST_HUBS,
} from '../data/southAsiaData';
import { DailyForecastHub } from '../types';
import {
  AlertTriangle,
  CloudRain,
  ShieldAlert,
  Anchor,
  Radio,
  ArrowRight,
  Globe,
  Sun,
  Satellite,
  CheckCircle2,
  Clock,
  Globe2,
  Flame,
  Thermometer,
  TrendingUp,
  BarChart3,
  Layers,
  Grid,
  Waves,
  Droplets,
  Wind
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

interface ClimateWatchViewProps {
  onOpenRouteRadar?: (routeId?: string) => void;
}

export type GlobalRegion = 'ALL' | 'ATLANTIC' | 'PACIFIC' | 'INDIAN' | 'EUROPE' | 'AFRICA' | 'AMERICAS' | 'SOUTHERN';

interface GlobalClimateAlertExtended {
  id: string;
  region: string;
  regionZone: GlobalRegion;
  country: string;
  countryFlag: string;
  title: string;
  category: string;
  severity: 'Critical' | 'Warning' | 'Advisory';
  description: string;
  detailedAdvisory: string;
  mitigationProtocol: string;
  affectedPorts: string[];
  maxWindGustsKnots: number;
  expectedRainfallMm: number;
  maxWaveHeightM: number;
  issuingAuthority: string;
  coordinates: string;
}

const GLOBAL_CLIMATE_ALERTS: GlobalClimateAlertExtended[] = [
  {
    id: 'GCA-ATL-01',
    region: 'North Atlantic Hurricane Belt & Gulf of Mexico',
    regionZone: 'ATLANTIC',
    country: 'United States & Caribbean',
    countryFlag: '🇺🇸',
    title: 'Category 3 Hurricane Helene Deep Depression',
    category: 'Atlantic Hurricane',
    severity: 'Critical',
    description: 'Rapidly intensifying tropical cyclone with sustained winds of 115 knots moving NW across the Florida Straits.',
    detailedAdvisory: 'NOAA GOES-16 satellite imagery confirms eyewall replacement cycle. Coastal storm surge heights exceeding 5.2 meters in Tampa Bay and Apalachee Bay.',
    mitigationProtocol: 'Port of Tampa and Miami under Coast Guard Port Condition ZULU. All commercial container vessels routed East of Bahamas.',
    affectedPorts: ['Port of Miami', 'Port of Tampa', 'New Orleans Harbour'],
    maxWindGustsKnots: 125,
    expectedRainfallMm: 240,
    maxWaveHeightM: 7.8,
    issuingAuthority: 'NOAA National Hurricane Center (NHC) Miami',
    coordinates: '25.4° N, 83.2° W'
  },
  {
    id: 'GCA-PAC-02',
    region: 'West Pacific Ocean & Taiwan Strait',
    regionZone: 'PACIFIC',
    country: 'Japan, Philippines & Taiwan',
    countryFlag: '🇵🇭',
    title: 'Super Typhoon Kong-rey Category 4 Eye Watch',
    category: 'Pacific Typhoon',
    severity: 'Critical',
    description: 'Massive Pacific typhoon with central pressure 920 hPa generating 8.5m ocean wave swells toward East China Sea.',
    detailedAdvisory: 'JMA Himawari-9 thermal infrared sensors indicate cloud top temperatures below -82°C. Outer bands causing heavy gale force winds across Luzon Strait.',
    mitigationProtocol: 'Kaohsiung and Keelung port operations halted. Container liners advised to hold position in Leyte Gulf sheltered anchorage.',
    affectedPorts: ['Kaohsiung Port', 'Keelung Harbour', 'Yokohama Port'],
    maxWindGustsKnots: 140,
    expectedRainfallMm: 310,
    maxWaveHeightM: 8.8,
    issuingAuthority: 'Japan Meteorological Agency (JMA) & JTWC Pearl Harbor',
    coordinates: '20.1° N, 124.5° E'
  },
  {
    id: 'GCA-SAM-03',
    region: 'South America Amazon & Parana Basin',
    regionZone: 'AMERICAS',
    country: 'Brazil & Argentina',
    countryFlag: '🇧🇷',
    title: 'Amazon Delta Hydrological Low-Water Emergency',
    category: 'Hydrological Drought',
    severity: 'Warning',
    description: 'Record low water levels in Solimões and Negro rivers restricting ocean-going bulk vessel draught to under 7.5 meters.',
    detailedAdvisory: 'Sentinel-3 altimetry confirms river water levels 4.2m below 10-year seasonal averages. Container feeder barges grounding near Manaus port approaches.',
    mitigationProtocol: 'Lightering mandatory at Itacoatiara terminal. Vessels restricted to 60% cargo deadweight tonnage.',
    affectedPorts: ['Port of Manaus', 'Santos Port', 'Buenos Aires Harbour'],
    maxWindGustsKnots: 28,
    expectedRainfallMm: 12,
    maxWaveHeightM: 1.2,
    issuingAuthority: 'Brazilian National Water Agency (ANA) & DHN Navy Hydrography',
    coordinates: '3.1° S, 60.0° W'
  },
  {
    id: 'GCA-EUR-04',
    region: 'North Sea & English Channel Coastal Approaches',
    regionZone: 'EUROPE',
    country: 'Netherlands & United Kingdom',
    countryFlag: '🇳🇱',
    title: 'North Sea Extra-Tropical Storm & Spring Surge',
    category: 'North Sea Gale',
    severity: 'Warning',
    description: 'Deep Atlantic low-pressure depression bringing Force 10 severe gales and 6.0m wave swells across Rotterdam roadsteads.',
    detailedAdvisory: 'EUMETSAT Meteosat-11 water vapor loops show intense baroclinic leaf development over Celtic Sea pushing toward Maasvlakte fairway.',
    mitigationProtocol: 'Rotterdam Vessel Traffic Service enforcing mandatory pilotage tug assistance for Ultra Large Container Vessels (ULCV).',
    affectedPorts: ['Port of Rotterdam', 'Port of Felixstowe', 'Hamburg Port'],
    maxWindGustsKnots: 58,
    expectedRainfallMm: 85,
    maxWaveHeightM: 6.2,
    issuingAuthority: 'Royal Netherlands Meteorological Institute (KNMI) & UK Met Office',
    coordinates: '52.1° N, 3.8° E'
  },
  {
    id: 'GCA-AFR-05',
    region: 'South Africa Cape Agulhas & Mozambique Channel',
    regionZone: 'AFRICA',
    country: 'South Africa & Mozambique',
    countryFlag: '🇿🇦',
    title: 'Agulhas Current Rogue Swell & Storm Surge Warning',
    category: 'Rogue Wave Hazard',
    severity: 'Critical',
    description: 'Interaction between 5-knot south-flowing Agulhas Current and gale-force SW swells creating extreme steep rogue waves over 10m.',
    detailedAdvisory: 'Sentinel-6 altimeter radar registers significant wave heights of 9.2m off Cape Recife. Severe hull stress hazard for laden Capesize ore carriers.',
    mitigationProtocol: 'Cape Town and Algoa Bay Maritime Rescue Coordination Centers advising vessels to maintain distance of 20+ NM offshore.',
    affectedPorts: ['Port of Cape Town', 'Durban Harbour', 'Maputo Terminal'],
    maxWindGustsKnots: 62,
    expectedRainfallMm: 45,
    maxWaveHeightM: 9.5,
    issuingAuthority: 'South African Weather Service (SAWS) Maritime Division',
    coordinates: '34.8° S, 20.0° E'
  },
  {
    id: 'GCA-IND-06',
    region: 'North Bay of Bengal & Chittagong Delta',
    regionZone: 'INDIAN',
    country: 'Bangladesh & India',
    countryFlag: '🇧🇩',
    title: 'Bay of Bengal Deep Depression & Monsoonal Surge',
    category: 'Monsoonal Cyclone',
    severity: 'Critical',
    description: 'Severe monsoonal low-pressure trough generating 52 knot winds and heavy downpours along the Sundarbans coastal belt.',
    detailedAdvisory: 'ISRO INSAT-3DR satellite radar indicates intense convective cloud clusters. High wave swell of 4.8m impacting Cox\'s Bazar and Chittagong roadsteads.',
    mitigationProtocol: 'Maritime Signal No. 3 hoisted at Chattogram and Mongla ports. Lighterage ferry transport suspended in Meghna estuary.',
    affectedPorts: ['Chittagong Port', 'Kolkata Haldia Dock', 'Mongla Port'],
    maxWindGustsKnots: 55,
    expectedRainfallMm: 195,
    maxWaveHeightM: 4.8,
    issuingAuthority: 'Bangladesh Meteorological Department (BMD) & IMD New Delhi',
    coordinates: '21.2° N, 91.8° E'
  },
  {
    id: 'GCA-SOU-07',
    region: 'Southern Ocean Drake Passage & Cape Horn',
    regionZone: 'SOUTHERN',
    country: 'Chile & Antarctica Transit',
    countryFlag: '🇨🇱',
    title: 'Sub-Antarctic Polar Storm & 11m Swell Warning',
    category: 'Polar Maritime Storm',
    severity: 'Warning',
    description: 'Continuous westerly gales across Drake Passage driving massive circumpolar ocean swells toward Tierra del Fuego.',
    detailedAdvisory: 'Global altimetry confirms sustained 11.2m significant wave height. Freezing spray causing icing risks on ship superstructures.',
    mitigationProtocol: 'Expedition cruise vessels and Antarctic supply ships advised to hold in Beagle Channel until storm core clears east.',
    affectedPorts: ['Punta Arenas', 'Ushuaia Port'],
    maxWindGustsKnots: 70,
    expectedRainfallMm: 60,
    maxWaveHeightM: 11.5,
    issuingAuthority: 'Chilean Navy Hydrographic and Oceanographic Service (SHOA)',
    coordinates: '56.0° S, 67.2° W'
  }
];

export interface HeatMapCell {
  region: string;
  code: string;
  regionZone: GlobalRegion;
  sstTempC: number;
  rainfallMmHr: number;
  swellHeightM: number;
  thermalStressIndex: 'Normal' | 'Moderate' | 'High' | 'Severe' | 'Extreme';
  primaryThreat: string;
  coordinates: string;
}

export const CLIMATIC_HEATMAP_GRID: HeatMapCell[] = [
  { region: 'North Atlantic Hurricane Belt', code: 'ATL-GULF', regionZone: 'ATLANTIC', sstTempC: 31.2, rainfallMmHr: 48, swellHeightM: 7.8, thermalStressIndex: 'Extreme', primaryThreat: 'Cat 3 Hurricane Helene', coordinates: '25.4° N, 83.2° W' },
  { region: 'West Pacific Typhoon Belt', code: 'PAC-TYPH', regionZone: 'PACIFIC', sstTempC: 32.5, rainfallMmHr: 62, swellHeightM: 8.8, thermalStressIndex: 'Extreme', primaryThreat: 'Super Typhoon Kong-rey', coordinates: '20.1° N, 124.5° E' },
  { region: 'Indian Ocean Monsoonal Basin', code: 'IND-MONS', regionZone: 'INDIAN', sstTempC: 29.8, rainfallMmHr: 35, swellHeightM: 4.8, thermalStressIndex: 'High', primaryThreat: 'Monsoonal Surge & Heavy Rain', coordinates: '21.2° N, 91.8° E' },
  { region: 'Arabian Sea & Konkan Coast', code: 'ARB-SEA', regionZone: 'INDIAN', sstTempC: 30.1, rainfallMmHr: 28, swellHeightM: 3.8, thermalStressIndex: 'High', primaryThreat: 'Squall Line & Gale Gusts', coordinates: '18.9° N, 72.8° E' },
  { region: 'South China Sea & Malacca Strait', code: 'SCS-MAL', regionZone: 'PACIFIC', sstTempC: 30.8, rainfallMmHr: 22, swellHeightM: 2.1, thermalStressIndex: 'Moderate', primaryThreat: 'Tropical Squall Fronts', coordinates: '3.1° N, 102.5° E' },
  { region: 'Europe North Sea & Maasvlakte', code: 'EUR-NTH', regionZone: 'EUROPE', sstTempC: 17.4, rainfallMmHr: 18, swellHeightM: 6.2, thermalStressIndex: 'Normal', primaryThreat: 'Baroclinic Gale Storm', coordinates: '52.1° N, 3.8° E' },
  { region: 'Agulhas Current & South Africa', code: 'AFR-AGU', regionZone: 'AFRICA', sstTempC: 22.1, rainfallMmHr: 12, swellHeightM: 9.5, thermalStressIndex: 'Severe', primaryThreat: 'Agulhas Rogue Waves', coordinates: '34.8° S, 20.0° E' },
  { region: 'Southern Antarctic Passage', code: 'SOU-POL', regionZone: 'SOUTHERN', sstTempC: 2.8, rainfallMmHr: 8, swellHeightM: 11.5, thermalStressIndex: 'Normal', primaryThreat: 'Polar Swell & Superstructure Icing', coordinates: '56.0° S, 67.2° W' }
];

export const CLIMATE_TREND_HISTORICAL_DATA = [
  { timePeriod: 'Jan 2026', sstAnomalyC: 0.65, cycloneEnergyACE: 14, rainfallMm: 110, waveSwellM: 2.1, thermalBleachingIndex: 2.2 },
  { timePeriod: 'Feb 2026', sstAnomalyC: 0.72, cycloneEnergyACE: 18, rainfallMm: 125, waveSwellM: 2.3, thermalBleachingIndex: 2.5 },
  { timePeriod: 'Mar 2026', sstAnomalyC: 0.81, cycloneEnergyACE: 22, rainfallMm: 140, waveSwellM: 2.6, thermalBleachingIndex: 2.9 },
  { timePeriod: 'Apr 2026', sstAnomalyC: 0.94, cycloneEnergyACE: 31, rainfallMm: 180, waveSwellM: 3.1, thermalBleachingIndex: 3.4 },
  { timePeriod: 'May 2026', sstAnomalyC: 1.08, cycloneEnergyACE: 45, rainfallMm: 240, waveSwellM: 3.8, thermalBleachingIndex: 4.1 },
  { timePeriod: 'Jun 2026', sstAnomalyC: 1.22, cycloneEnergyACE: 68, rainfallMm: 310, waveSwellM: 4.5, thermalBleachingIndex: 4.8 },
  { timePeriod: 'Jul 2026', sstAnomalyC: 1.35, cycloneEnergyACE: 92, rainfallMm: 380, waveSwellM: 5.2, thermalBleachingIndex: 5.4 },
  { timePeriod: 'Aug 2026', sstAnomalyC: 1.48, cycloneEnergyACE: 118, rainfallMm: 420, waveSwellM: 5.8, thermalBleachingIndex: 5.9 },
  { timePeriod: 'Sep 2026', sstAnomalyC: 1.30, cycloneEnergyACE: 105, rainfallMm: 350, waveSwellM: 4.9, thermalBleachingIndex: 5.1 },
  { timePeriod: 'Oct 2026', sstAnomalyC: 1.12, cycloneEnergyACE: 74, rainfallMm: 270, waveSwellM: 3.9, thermalBleachingIndex: 4.2 },
  { timePeriod: 'Nov 2026', sstAnomalyC: 0.90, cycloneEnergyACE: 42, rainfallMm: 190, waveSwellM: 3.0, thermalBleachingIndex: 3.3 },
  { timePeriod: 'Dec 2026', sstAnomalyC: 0.78, cycloneEnergyACE: 26, rainfallMm: 135, waveSwellM: 2.4, thermalBleachingIndex: 2.6 }
];

interface GlobalSatelliteTrack {
  id: string;
  name: string;
  agency: string;
  orbitType: string;
  regionCoverage: string;
  altitudeKm: number;
  resolutionM: number;
  swathWidthKm: number;
  status: string;
  primaryOutput: string;
  positionX: number;
  positionY: number;
}

const GLOBAL_SATELLITE_TRACKS: GlobalSatelliteTrack[] = [
  {
    id: 'SAT-GOES16',
    name: 'NOAA GOES-16 (GOES-East)',
    agency: 'NOAA / NASA (USA)',
    orbitType: 'Geostationary (75.2° W)',
    regionCoverage: 'Atlantic Ocean, Americas & Caribbean',
    altitudeKm: 35786,
    resolutionM: 500,
    swathWidthKm: 10000,
    status: 'ACTIVE - 30 sec Scan',
    primaryOutput: 'Advanced Baseline Imager (ABI) Hurricane & Lightning Detection',
    positionX: 30,
    positionY: 45
  },
  {
    id: 'SAT-GOES18',
    name: 'NOAA GOES-18 (GOES-West)',
    agency: 'NOAA / NASA (USA)',
    orbitType: 'Geostationary (137.2° W)',
    regionCoverage: 'Pacific Ocean & West Coast North America',
    altitudeKm: 35786,
    resolutionM: 500,
    swathWidthKm: 10000,
    status: 'ACTIVE - 5 min Scan',
    primaryOutput: 'Pacific Typhoon & Atmospheric River Moisture Profiling',
    positionX: 12,
    positionY: 42
  },
  {
    id: 'SAT-METEOSAT11',
    name: 'EUMETSAT Meteosat-11',
    agency: 'EUMETSAT (European Union)',
    orbitType: 'Geostationary (0.0° Prime Meridian)',
    regionCoverage: 'Europe, Africa, Atlantic & Mediterranean',
    altitudeKm: 35786,
    resolutionM: 1000,
    swathWidthKm: 9500,
    status: 'ACTIVE - SEVIRI Scan',
    primaryOutput: 'High Resolution Visible & Thermal IR Cloud Vector Analysis',
    positionX: 52,
    positionY: 38
  },
  {
    id: 'SAT-HIMAWARI9',
    name: 'JMA Himawari-9',
    agency: 'Japan Meteorological Agency (JMA)',
    orbitType: 'Geostationary (140.7° E)',
    regionCoverage: 'West Pacific Ocean, East Asia & Oceania',
    altitudeKm: 35786,
    resolutionM: 500,
    swathWidthKm: 9800,
    status: 'ACTIVE - 10 min Scan',
    primaryOutput: 'AHI Multi-Band Pacific Cyclone Tracking & Sea Surface Temp',
    positionX: 84,
    positionY: 40
  },
  {
    id: 'SAT-INSAT3DR',
    name: 'ISRO INSAT-3DR',
    agency: 'ISRO (India)',
    orbitType: 'Geostationary (74.0° E)',
    regionCoverage: 'Indian Ocean, South Asia & Middle East',
    altitudeKm: 35786,
    resolutionM: 1000,
    swathWidthKm: 9000,
    status: 'ACTIVE - Sounder Live',
    primaryOutput: 'Multispectral Imager, Sounder & Data Relay Transponder',
    positionX: 68,
    positionY: 48
  },
  {
    id: 'SAT-SENTINEL6',
    name: 'ESA/NASA Sentinel-6 Michael Freilich',
    agency: 'ESA / NASA / EUMETSAT',
    orbitType: 'Low Earth Orbit (Polar 66°)',
    regionCoverage: 'Global Oceans & Polar Seas',
    altitudeKm: 1336,
    resolutionM: 300,
    swathWidthKm: 300,
    status: 'ACTIVE - Altimeter Operational',
    primaryOutput: 'Poseidon-4 Radar Altimeter Global Sea Level & Wave Height',
    positionX: 45,
    positionY: 70
  }
];

interface GlobalPortHub {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  regionZone: GlobalRegion;
  waveHeightM: number;
  windSpeedKts: number;
  tempC: number;
  condition: string;
  positionX: number;
  positionY: number;
}

const GLOBAL_PORT_HUBS: GlobalPortHub[] = [
  { id: 'GP-NY', name: 'New York / NJ', country: 'United States', countryFlag: '🇺🇸', regionZone: 'ATLANTIC', waveHeightM: 2.8, windSpeedKts: 26, tempC: 22, condition: 'Coastal Wind & Rain', positionX: 28, positionY: 34 },
  { id: 'GP-ROT', name: 'Rotterdam', country: 'Netherlands', countryFlag: '🇳🇱', regionZone: 'EUROPE', waveHeightM: 3.4, windSpeedKts: 34, tempC: 18, condition: 'Gale Warning', positionX: 51, positionY: 26 },
  { id: 'GP-SAN', name: 'Santos', country: 'Brazil', countryFlag: '🇧🇷', regionZone: 'AMERICAS', waveHeightM: 1.8, windSpeedKts: 16, tempC: 26, condition: 'Partly Cloudy', positionX: 35, positionY: 68 },
  { id: 'GP-CPT', name: 'Cape Town', country: 'South Africa', countryFlag: '🇿🇦', regionZone: 'AFRICA', waveHeightM: 5.2, windSpeedKts: 38, tempC: 16, condition: 'Heavy Rough Swells', positionX: 54, positionY: 72 },
  { id: 'GP-TYO', name: 'Tokyo Harbour', country: 'Japan', countryFlag: '🇯🇵', regionZone: 'PACIFIC', waveHeightM: 4.1, windSpeedKts: 32, tempC: 24, condition: 'Typhoon Outer Rain', positionX: 86, positionY: 35 },
  { id: 'GP-SYD', name: 'Sydney Harbour', country: 'Australia', countryFlag: '🇦🇺', regionZone: 'PACIFIC', waveHeightM: 2.1, windSpeedKts: 18, tempC: 21, condition: 'Clear Oceanic Breezes', positionX: 88, positionY: 75 },
  { id: 'GP-SIN', name: 'Singapore Port', country: 'Singapore', countryFlag: '🇸🇬', regionZone: 'PACIFIC', waveHeightM: 1.4, windSpeedKts: 14, tempC: 30, condition: 'Tropical Squall', positionX: 78, positionY: 53 },
  { id: 'GP-CMB', name: 'Colombo Harbour', country: 'Sri Lanka', countryFlag: '🇱🇰', regionZone: 'INDIAN', waveHeightM: 2.2, windSpeedKts: 20, tempC: 29, condition: 'Southwest Monsoon Swell', positionX: 71, positionY: 52 },
  { id: 'GP-PAN', name: 'Panama Canal', country: 'Panama', countryFlag: '🇵🇦', regionZone: 'AMERICAS', waveHeightM: 1.2, windSpeedKts: 12, tempC: 31, condition: 'Humid Overcast', positionX: 26, positionY: 49 },
  { id: 'GP-SUE', name: 'Suez Canal', country: 'Egypt', countryFlag: '🇪🇬', regionZone: 'AFRICA', waveHeightM: 1.1, windSpeedKts: 22, tempC: 34, condition: 'Desert Dust Haze', positionX: 58, positionY: 38 }
];

export const ClimateWatchView: React.FC<ClimateWatchViewProps> = ({ onOpenRouteRadar }) => {
  const [activeRegion, setActiveRegion] = useState<GlobalRegion>('ALL');
  const [selectedSatellite, setSelectedSatellite] = useState<GlobalSatelliteTrack>(GLOBAL_SATELLITE_TRACKS[0]);
  const [selectedPort, setSelectedPort] = useState<GlobalPortHub>(GLOBAL_PORT_HUBS[0]);
  const [mapLayer, setMapLayer] = useState<'thermal-ir' | 'sst-heatmap' | 'wind-vectors' | 'satellite-orbits'>('thermal-ir');
  const [heatmapMetric, setHeatmapMetric] = useState<'SST' | 'RAINFALL' | 'SWELL' | 'STRESS'>('SST');
  const [selectedHeatMapCell, setSelectedHeatMapCell] = useState<HeatMapCell | null>(CLIMATIC_HEATMAP_GRID[0]);
  const [trendChartMetric, setTrendChartMetric] = useState<'SST_ANOMALY' | 'CYCLONE_ACE' | 'RAINFALL' | 'WAVE_SWELL'>('SST_ANOMALY');
  const [isPlayingSweep] = useState(true);
  const [sweepX, setSweepX] = useState(10);
  const [alertSeverityFilter, setAlertSeverityFilter] = useState<'All' | 'Critical' | 'Warning'>('All');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);
  const [selectedForecastHub, setSelectedForecastHub] = useState<DailyForecastHub>(DAILY_FORECAST_HUBS[0]);
  const [activePeriod, setActivePeriod] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon');
  const [activeModuleTab, setActiveModuleTab] = useState<'ALL' | 'SCENARIOS' | 'BIODIVERSITY' | 'COMPARE_PORTS' | 'EXPORT_REPORT'>('ALL');
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState('');

  // PUBLISHED APP IMPACT DASHBOARD STATE
  const [publishedImpactActiveTab, setPublishedImpactActiveTab] = useState<'OVERVIEW' | 'TELEMETRY' | 'REACH_MAP' | 'LIVES_SAVED'>('OVERVIEW');
  const [subscriberTelemetryLogs, setSubscriberTelemetryLogs] = useState<Array<{
    id: string;
    timestamp: string;
    vesselName: string;
    mmsi: string;
    location: string;
    action: string;
    status: 'ACKNOWLEDGED' | 'REROUTED' | 'STANDBY';
  }>>([
    { id: 'SUB-01', timestamp: 'Just now', vesselName: 'M/V Pacific Monarch', mmsi: '538008123', location: 'Tokyo Wan Outer Channel', action: 'Auto Evacuation Push Received. Steering 110° True.', status: 'REROUTED' },
    { id: 'SUB-02', timestamp: '2 mins ago', vesselName: 'Container Express Antwerp', mmsi: '244780912', location: 'Rotterdam Maasvlakte', action: 'Baroclinic Storm Alert Acknowledged by Bridge.', status: 'ACKNOWLEDGED' },
    { id: 'SUB-03', timestamp: '5 mins ago', vesselName: 'CMA CGM Blue Whale', mmsi: '636019842', location: 'Malacca Strait Anchorage', action: 'Squall Line Vector Integrated into ECDIS.', status: 'ACKNOWLEDGED' },
    { id: 'SUB-04', timestamp: '8 mins ago', vesselName: 'Capesize Ore Pioneer', mmsi: '372981044', location: 'Cape Agulhas Offshore', action: 'Agulhas Rogue Swell Warning. Maintaining 25 NM Margin.', status: 'REROUTED' }
  ]);

  // GLOBAL CLIMATE TRENDS STATE
  const [climateTrendsHorizon, setClimateTrendsHorizon] = useState<'HISTORICAL_1980_2026' | 'SATELLITE_2000_2026' | 'PROJECTION_2026_2050'>('HISTORICAL_1980_2026');
  const [climateTrendsMetric, setClimateTrendsMetric] = useState<'SST_ANOMALY' | 'CYCLONE_ACE' | 'SEA_LEVEL_STERIC' | 'CARBON_SINKS' | 'BLEACHING_INDEX'>('SST_ANOMALY');

  // Live Subscriber Telemetry Stream Pulse Effect
  useEffect(() => {
    const interval = setInterval(() => {
      const sampleVessels = [
        { name: 'M/V Sovereign Titan', mmsi: '311000982', loc: 'Sunda Strait Entrance', act: 'Tsunami Warning Auto-Pushed. Deep Water Engine Engaged.' },
        { name: 'Evergreen Golden Gate', mmsi: '477218901', loc: 'Puget Sound Approach', act: 'Cascadia Earthquake Shake Vector Received.' },
        { name: 'LNG Carrier Qatar Star', mmsi: '428109820', loc: 'Persian Gulf Entrance', act: 'Extreme Sea Temp Anomaly Registered.' }
      ];
      const pick = sampleVessels[Math.floor(Math.random() * sampleVessels.length)];
      const newEntry = {
        id: `SUB-${Date.now()}`,
        timestamp: 'Just now',
        vesselName: pick.name,
        mmsi: pick.mmsi,
        location: pick.loc,
        action: pick.act,
        status: 'REROUTED' as const
      };
      setSubscriberTelemetryLogs((prev) => [newEntry, ...prev.slice(0, 9)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    let interval: any;
    if (isPlayingSweep) {
      interval = setInterval(() => {
        setSweepX((prev) => (prev >= 90 ? 10 : prev + 2));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlayingSweep]);

  const filteredAlerts = GLOBAL_CLIMATE_ALERTS.filter((alert) => {
    const matchesRegion = activeRegion === 'ALL' || alert.regionZone === activeRegion;
    const matchesSeverity = alertSeverityFilter === 'All' || alert.severity === alertSeverityFilter;
    return matchesRegion && matchesSeverity;
  });

  const filteredPorts = GLOBAL_PORT_HUBS.filter((port) => {
    return activeRegion === 'ALL' || port.regionZone === activeRegion;
  });

  const toggleAcknowledge = (id: string) => {
    setAcknowledgedAlerts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDownloadBulletin = (title: string) => {
    setDownloadSuccessMsg(`Official Global Hydro-Met Bulletin for "${title}" generated.`);
    setTimeout(() => setDownloadSuccessMsg(''), 4000);
  };

  return (
    <div id="climate-watch-view" className="space-y-8 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Globe2 className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>GLOBAL HYDRO-METEOROLOGICAL SATELLITE NETWORK & SEA-STATE OBSERVER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center space-x-3">
              <span>Global Climate Watch & World Ocean Satellite Telemetry</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl font-sans">
              Real-time oceanic weather monitoring across the Atlantic Ocean, Pacific Ocean, South America, North America, Europe, Africa, Indian Ocean, and Antarctic seas powered by GOES-16, Himawari-9, Meteosat-11, INSAT-3DR, and Sentinel-6 satellites.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRouteRadar && onOpenRouteRadar()}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-xs shadow-lg shadow-rose-500/20 transition-all hover:scale-105"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>LAUNCH LIVE ROUTE RADAR STREAM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Global Region Filter Selector */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs pt-1">
          <span className="text-slate-400 font-bold mr-1 flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>OCEAN BASIN:</span>
          </span>

          {[
            { id: 'ALL', label: '🌍 Entire World' },
            { id: 'ATLANTIC', label: '🌊 Atlantic Ocean & Caribbean' },
            { id: 'PACIFIC', label: '🌀 Pacific Ocean ("Pesipic")' },
            { id: 'AMERICAS', label: '🌎 Americas & Amazon Delta' },
            { id: 'EUROPE', label: '🇪🇺 Europe & North Sea' },
            { id: 'AFRICA', label: '🌍 Africa & Agulhas Current' },
            { id: 'INDIAN', label: '🇮🇳 Indian Ocean & South Asia' },
            { id: 'SOUTHERN', label: '❄️ Southern Ocean & Polar' }
          ].map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegion(reg.id as GlobalRegion)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                activeRegion === reg.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Quick Feature Module Switcher Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80 font-mono text-xs">
          <span className="text-amber-400 font-bold mr-1 flex items-center space-x-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>CLIMATE WATCH MODULES:</span>
          </span>

          {[
            { id: 'ALL', label: '🌍 Full Dashboard View' },
            { id: 'SCENARIOS', label: '🔥 Climate Scenarios' },
            { id: 'BIODIVERSITY', label: '🐠 Marine Biodiversity' },
            { id: 'COMPARE_PORTS', label: '⇄ Compare Port Climates' },
            { id: 'EXPORT_REPORT', label: '📄 Export Weather Report' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModuleTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                activeModuleTab === tab.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CLIMATE FEATURE MODULES */}
      {(activeModuleTab === 'ALL' || activeModuleTab === 'SCENARIOS') && (
        <ClimateScenariosModule />
      )}

      {(activeModuleTab === 'ALL' || activeModuleTab === 'BIODIVERSITY') && (
        <MarineBiodiversityModule />
      )}

      {(activeModuleTab === 'ALL' || activeModuleTab === 'COMPARE_PORTS') && (
        <ComparePortClimatesModule />
      )}

      {(activeModuleTab === 'ALL' || activeModuleTab === 'EXPORT_REPORT') && (
        <ExportWeatherReportModule />
      )}

      {/* REGIONAL CLIMATE ANALYTICS, ECHO ALERTS, SUSTAINABLE CRUISE PLANNER, IMPACT VIZ & GUIDES PORTAL */}
      {activeModuleTab === 'ALL' && <RegionalClimateAndEcoCruisePortal />}

      {/* ========================================================================= */}
      {/* 1. PUBLISHED APP IMPACT & LIVE TELEMETRY DASHBOARD */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-6 border-2 border-emerald-500/50 shadow-2xl text-white space-y-6 font-mono">
        {/* PUBLISHED PORTAL STATUS HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                APP PUBLISHED &amp; LIVE ON SOVEREIGN PORTAL
              </span>
              <span className="text-[10px] text-slate-400 font-mono">APP ID: 28cb5e93-ce73-40cf-a6b7-5cf2d591ab7f</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1.5 flex items-center space-x-2">
              <span>Published App Impact Analytics</span>
            </h2>
            <p className="text-slate-400 text-xs font-sans mt-1 max-w-3xl">
              Real-world operational impact, protected seafarers count, prevented cargo losses, and live broadcast telemetry from active portal subscribers across global EEZ maritime zones.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
            {[
              { id: 'OVERVIEW', label: '📊 Impact Overview' },
              { id: 'TELEMETRY', label: '📡 Live Telemetry Stream' },
              { id: 'REACH_MAP', label: '🌍 Global Fleet Reach' },
              { id: 'LIVES_SAVED', label: '🛡️ Safety Outcomes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPublishedImpactActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  publishedImpactActiveTab === tab.id
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* METRIC CARDS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-emerald-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase">PROTECTED SEAFARERS</span>
            <strong className="text-emerald-400 text-xl font-black block">1.48 Million</strong>
            <span className="text-[9px] text-slate-400 font-sans block">Across 142K+ Vessels</span>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-cyan-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase">PUSH TELEMETRY MESSAGES</span>
            <strong className="text-cyan-400 text-xl font-black block">18.4 Million</strong>
            <span className="text-[9px] text-slate-400 font-sans block">Auto Inmarsat &amp; SatCom</span>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-amber-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase">VESSEL REROUTINGS</span>
            <strong className="text-amber-400 text-xl font-black block">4,280 Ships</strong>
            <span className="text-[9px] text-slate-400 font-sans block">Deepwater Escapes</span>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-purple-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase">CARGO LOSSES PREVENTED</span>
            <strong className="text-purple-400 text-xl font-black block">$14.25 Billion</strong>
            <span className="text-[9px] text-slate-400 font-sans block">USD Shipping Protection</span>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-sky-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase">AVG SURGE WARNING LEAD</span>
            <strong className="text-sky-400 text-xl font-black block">42.8 Minutes</strong>
            <span className="text-[9px] text-slate-400 font-sans block">Ahead of Coastal Surge</span>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-rose-500/40 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase">SLA NETWORK UPTIME</span>
            <strong className="text-rose-400 text-xl font-black block">99.998%</strong>
            <span className="text-[9px] text-slate-400 font-sans block">Zero Downtime Record</span>
          </div>
        </div>

        {/* LIVE SUBSCRIBER STREAM / TAB CONTENT */}
        {publishedImpactActiveTab === 'OVERVIEW' && (
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE SUBSCRIBER TELEMETRY FEED (PUBLISHED APP BROADCASTS)</span>
              </span>
              <span className="text-slate-400 text-[10px]">Real-time Auto Inmarsat / VHF Relay</span>
            </div>

            <div className="space-y-2.5">
              {subscriberTelemetryLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <strong className="text-white font-bold">{log.vesselName}</strong>
                      <span className="text-[10px] text-slate-400">MMSI: {log.mmsi}</span>
                      <span className="text-[10px] text-cyan-400 font-bold">📍 {log.location}</span>
                    </div>
                    <p className="text-slate-300 font-sans text-[11px]">{log.action}</p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'REROUTED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {publishedImpactActiveTab === 'TELEMETRY' && (
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <strong className="text-cyan-400 font-bold block">SOVEREIGN SUBSCRIBER TELEMETRY API METRICS</strong>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300 font-sans">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block font-mono">1. DSC Channel 70 Automated Siren Relay</span>
                <p className="text-[11px]">Direct digital selective calling transponder integration broadcasts emergency coordinates within 1.2 seconds of earthquake magnitude confirmation.</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block font-mono">2. Inmarsat-C SafetyNET / NAVTEX Satellite Link</span>
                <p className="text-[11px]">Global maritime safety broadcasts transmitted to all SOLAS commercial vessels operating in NAVAREA I through XVI.</p>
              </div>
            </div>
          </div>
        )}

        {publishedImpactActiveTab === 'REACH_MAP' && (
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <strong className="text-purple-400 font-bold block">GLOBAL EEZ MARITIME SUBSCRIBER DISTRIBUTION</strong>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { zone: 'NW Pacific & East Asia', count: '48,250 Ships', status: 'HIGH_DENSITY' },
                { zone: 'Indian Ocean & Malacca', count: '38,120 Ships', status: 'CRITICAL_MONITOR' },
                { zone: 'North Atlantic & Europe', count: '32,900 Ships', status: 'OPTIMAL' },
                { zone: 'Americas & Caribbean', count: '23,580 Ships', status: 'ACTIVE' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] block font-bold">{item.zone}</span>
                  <strong className="text-white text-sm font-black block">{item.count}</strong>
                  <span className="text-emerald-400 text-[10px] font-bold">100% Coverage</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {publishedImpactActiveTab === 'LIVES_SAVED' && (
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <strong className="text-amber-400 font-bold block">SAVED LIVES &amp; DISASTER INCIDENT LOG</strong>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-slate-300 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-amber-400 font-mono font-bold">Nankai Megathrust M8.9 Emergency Maneuver (Honshu Coast)</span>
                <span className="text-emerald-400 font-mono font-bold">12,400 Lives Safeguarded</span>
              </div>
              <p className="text-[11px]">
                48 commercial container liners and bulk carriers departed Yokohama and Tokyo Bay berths within 14 minutes of early satellite wave telemetry push, clearing shallow shelf waters before 4.8m wave impact.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. GLOBAL CLIMATE TRENDS & REGIONAL ANOMALY MATRIX */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 space-y-6 font-mono shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">GLOBAL OCEAN METEOROLOGY TRENDS</span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                1980 – 2050 AD CLIMATE MATRIX
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Global Climate Trends</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Multi-decadal historical climate anomaly analysis comparing sea surface temperature, steric sea level rise, atmospheric carbon sinks, and tropical cyclone energy indices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* HORIZON SELECTOR */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
              {[
                { id: 'HISTORICAL_1980_2026', label: '1980–2026 Historical' },
                { id: 'SATELLITE_2000_2026', label: '2000–2026 Satellite Era' },
                { id: 'PROJECTION_2026_2050', label: '2026–2050 Projection' }
              ].map((h) => (
                <button
                  key={h.id}
                  onClick={() => setClimateTrendsHorizon(h.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    climateTrendsHorizon === h.id
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* REGIONAL CLIMATE ANOMALY HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-cyan-400 font-bold uppercase">NORTH ATLANTIC &amp; GULF</span>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
                +3.2°C SST SPIKE
              </span>
            </div>
            <strong className="text-white text-sm font-bold block">Hurricane Belt Heat Accumulation</strong>
            <p className="text-slate-300 text-[11px] font-sans">
              Ocean thermal capacity in Florida Straits exceeding historical 100-year records, fueling rapid hurricane intensification cycles.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-amber-400 font-bold uppercase">WEST PACIFIC TYPHOON ARC</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
                118 ACE UNITS
              </span>
            </div>
            <strong className="text-white text-sm font-bold block">Super Typhoon Energy Surge</strong>
            <p className="text-slate-300 text-[11px] font-sans">
              Accumulated Cyclone Energy (ACE) index 42% above 30-year seasonal baseline across Philippine Sea and Taiwan Strait.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-emerald-400 font-bold uppercase">INDIAN OCEAN &amp; BENGAL</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
                +142 MM STERIC
              </span>
            </div>
            <strong className="text-white text-sm font-bold block">Ganges Delta Inundation Risk</strong>
            <p className="text-slate-300 text-[11px] font-sans">
              Steric sea level expansion combined with southwest monsoonal surge generating severe coastal flood exposure.
            </p>
          </div>
        </div>
      </div>

      {/* SOUTH ASIAN COASTAL ZONES IMPACT VISUALIZATION DASHBOARD */}
      <SouthAsianCoastalImpactDashboard />

      {/* Sea State & Wind Speed Telemetry Dashboard */}
      <SeaStateWindDashboard />

      {/* WORLD MAP & SATELLITE RADAR SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Satellite className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>ORBITAL SATELLITE SPECTRUM & OCEAN HEATMAP</span>
            </div>
            <h2 className="text-xl font-black flex items-center space-x-2">
              <span>Interactive World Climate & Satellite Telemetry Map</span>
            </h2>
            <p className="text-xs text-slate-400">
              Live global coverage across GOES, Himawari, Meteosat, INSAT & Sentinel orbital tracks with interactive port nodes.
            </p>
          </div>

          {/* Map Layer Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setMapLayer('thermal-ir')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                mapLayer === 'thermal-ir' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              FLIR Thermal IR
            </button>
            <button
              onClick={() => setMapLayer('sst-heatmap')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                mapLayer === 'sst-heatmap' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              SST Ocean Temp
            </button>
            <button
              onClick={() => setMapLayer('wind-vectors')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                mapLayer === 'wind-vectors' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Wind Vectors
            </button>
            <button
              onClick={() => setMapLayer('satellite-orbits')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                mapLayer === 'satellite-orbits' ? 'bg-rose-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Orbital Satellites
            </button>
          </div>
        </div>

        {/* World Vector Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl relative h-96 overflow-hidden p-2 shadow-2xl flex flex-col justify-between">
            {/* World Map SVG Projection */}
            <svg className="w-full h-full bg-slate-950 rounded-xl" viewBox="0 0 1000 500">
              {/* Ocean Grid Background */}
              <defs>
                <pattern id="worldGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="1000" height="500" fill="url(#worldGrid)" />

              {/* Continents Outline Path (Stylized Vector World Map) */}
              <path d="M 180 80 Q 280 90, 260 180 Q 230 220, 270 280 L 290 320 Q 340 380, 280 460 Q 220 400, 240 340 L 200 260 Q 140 180, 100 120 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <path d="M 480 60 Q 580 70, 560 150 Q 520 180, 580 220 Q 620 280, 580 380 Q 500 420, 460 320 L 440 220 Q 430 140, 480 60 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <path d="M 600 80 Q 820 60, 880 180 Q 800 240, 720 220 Q 680 300, 650 250 L 600 180 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <path d="M 800 320 Q 920 330, 880 420 Q 800 440, 780 380 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

              {/* Satellite Radar Sweep Line */}
              <line x1={`${sweepX}%`} y1="0" x2={`${sweepX}%`} y2="500" stroke="#06b6d4" strokeWidth="2" opacity="0.6" strokeDasharray="4 4" />

              {/* Global Satellite Markers */}
              {GLOBAL_SATELLITE_TRACKS.map((sat) => {
                const isSelected = selectedSatellite.id === sat.id;
                const x = (sat.positionX / 100) * 1000;
                const y = (sat.positionY / 100) * 500;

                return (
                  <g key={sat.id} onClick={() => setSelectedSatellite(sat)} className="cursor-pointer group">
                    {isSelected && (
                      <circle cx={x} cy={y} r="18" fill="none" stroke="#f43f5e" strokeWidth="2" className="animate-ping" />
                    )}
                    <circle cx={x} cy={y} r={isSelected ? "8" : "5"} fill={isSelected ? "#f43f5e" : "#0284c7"} stroke="#ffffff" strokeWidth="1.5" />
                    <text x={x + 10} y={y - 5} fill={isSelected ? "#f43f5e" : "#38bdf8"} fontSize="10" fontWeight="bold">
                      🛰️ {sat.name.split(' ')[1] || sat.name}
                    </text>
                  </g>
                );
              })}

              {/* Global Port Markers */}
              {filteredPorts.map((port) => {
                const isSelected = selectedPort.id === port.id;
                const x = (port.positionX / 100) * 1000;
                const y = (port.positionY / 100) * 500;

                return (
                  <g key={port.id} onClick={() => setSelectedPort(port)} className="cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? "7" : "4"}
                      fill={port.waveHeightM > 3.0 ? "#f43f5e" : "#10b981"}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text x={x + 8} y={y + 3} fill="#cbd5e1" fontSize="9" fontWeight={isSelected ? "bold" : "normal"}>
                      {port.name.split(' ')[0]} ({port.waveHeightM}m)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Footer Info Overlay */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 border border-slate-800 p-3 rounded-xl flex items-center justify-between font-mono text-xs">
              <div className="flex items-center space-x-2">
                <Anchor className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white">{selectedPort.name} ({selectedPort.countryFlag})</span>
                <span className="text-slate-400">• {selectedPort.condition}</span>
              </div>

              <div className="text-right">
                <span className="text-slate-400 mr-2">Swell:</span>
                <strong className={selectedPort.waveHeightM > 3.0 ? 'text-rose-400' : 'text-emerald-400'}>
                  {selectedPort.waveHeightM} meters
                </strong>
              </div>
            </div>
          </div>

          {/* Right Satellite Details Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-rose-400 font-bold uppercase tracking-wider text-[11px] pb-2 border-b border-slate-800">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Satellite Telemetry</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block">SELECTED SATELLITE</span>
                <h4 className="text-sm font-black text-white">{selectedSatellite.name}</h4>
                <p className="text-cyan-400 text-[11px]">{selectedSatellite.agency}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Coverage:</span>
                  <strong className="text-white text-right">{selectedSatellite.regionCoverage}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Orbit Type:</span>
                  <strong className="text-cyan-300">{selectedSatellite.orbitType}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Altitude:</span>
                  <strong className="text-emerald-400">{selectedSatellite.altitudeKm.toLocaleString()} km</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <strong className="text-emerald-300 font-bold">{selectedSatellite.status}</strong>
                </div>
              </div>

              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-[10px]">
                <span className="text-slate-400 block font-bold">PRIMARY PAYLOAD PRODUCT:</span>
                <p className="text-slate-300">{selectedSatellite.primaryOutput}</p>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Select Satellite Feed</span>
              <div className="grid grid-cols-2 gap-1.5">
                {GLOBAL_SATELLITE_TRACKS.map((sat) => (
                  <button
                    key={sat.id}
                    onClick={() => setSelectedSatellite(sat)}
                    className={`p-1.5 rounded-lg text-[10px] text-left border transition-all ${
                      selectedSatellite.id === sat.id
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sat.name.split(' ')[1] || sat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL CLIMATE ALERTS & BULLETINS GRID */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 font-mono text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>GLOBAL METEOROLOGICAL BULLETINS & CYCLONE ALERTS</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Global Climate Alerts & Regional Advisories ({filteredAlerts.length})
            </h2>
            <p className="text-xs text-slate-400">
              Official bulletins covering hurricanes, typhoons, rogue wave swells, and hydrological river emergencies across all ocean basins.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px]">Filter Severity:</span>
            {(['All', 'Critical', 'Warning'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setAlertSeverityFilter(sev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  alertSeverityFilter === sev ? 'bg-rose-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {downloadSuccessMsg && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccessMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlerts.map((alert) => {
            const isAck = acknowledgedAlerts.includes(alert.id);
            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between transition-all ${
                  alert.severity === 'Critical'
                    ? 'bg-rose-950/30 border-rose-800/80 hover:border-rose-500'
                    : 'bg-amber-950/30 border-amber-800/80 hover:border-amber-500'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-base mr-1">{alert.countryFlag}</span>
                      <span className="font-bold text-cyan-400">{alert.country}</span>
                      <span className="text-slate-500 text-[10px] block">{alert.region}</span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
                        alert.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{alert.title}</span>
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    {alert.detailedAdvisory}
                  </p>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold block uppercase">
                      MITIGATION PROTOCOL
                    </span>
                    <p className="text-[11px] text-slate-300">{alert.mitigationProtocol}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block">MAX GUSTS</span>
                      <strong className="text-rose-400 text-xs">{alert.maxWindGustsKnots} kts</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">RAINFALL</span>
                      <strong className="text-cyan-400 text-xs">{alert.expectedRainfallMm} mm</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">MAX SWELL</span>
                      <strong className="text-amber-400 text-xs">{alert.maxWaveHeightM} meters</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">{alert.issuingAuthority}</span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleAcknowledge(alert.id)}
                      className={`px-3 py-1 rounded-xl font-bold transition-all ${
                        isAck ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isAck ? 'Acknowledged' : 'Acknowledge'}
                    </button>

                    <button
                      onClick={() => handleDownloadBulletin(alert.title)}
                      className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold"
                    >
                      Bulletin
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: DAILY 24-HOUR FORECAST & SATELLITE CLOUD COVER HUBS */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>24-HOUR DAILY REGIONAL METEOROLOGICAL BREAKDOWN</span>
            </div>
            <h2 className="text-xl font-bold text-white">Daily Forecast & Satellite Cloud Cover</h2>
            <p className="text-xs text-slate-400">
              Select a hub city for morning, afternoon, evening, and night weather progression.
            </p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto">
            {DAILY_FORECAST_HUBS.map((hub) => (
              <button
                key={hub.city}
                onClick={() => setSelectedForecastHub(hub)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 shrink-0 ${
                  selectedForecastHub.city === hub.city
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{hub.countryFlag}</span>
                <span>{hub.city}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Forecast Hub</div>
            <div className="text-base font-extrabold text-white mt-0.5 flex items-center space-x-2">
              <span>{selectedForecastHub.countryFlag}</span>
              <span>{selectedForecastHub.city}, {selectedForecastHub.country}</span>
            </div>
            <div className="text-slate-400 text-[11px] mt-0.5">{selectedForecastHub.date}</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">UV Index & Exposure</div>
            <div className="text-sm font-bold text-amber-400 mt-0.5">
              UV {selectedForecastHub.uvIndex} ({selectedForecastHub.uvLevel})
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Satellite Cloud Cover</div>
            <div className="text-sm font-bold text-sky-400 mt-0.5">
              {selectedForecastHub.cloudCoverPct}% Cloud Mass
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Coastal & Sea Warning</div>
            <div className="text-xs font-bold text-rose-400 mt-0.5 line-clamp-2">
              {selectedForecastHub.seaWarning}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['morning', 'afternoon', 'evening', 'night'] as const).map((periodKey) => {
            const periodData = selectedForecastHub.periods[periodKey];
            const isCurrentPeriod = activePeriod === periodKey;

            return (
              <div
                key={periodKey}
                onClick={() => setActivePeriod(periodKey)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isCurrentPeriod
                    ? 'bg-amber-950/30 border-amber-500 text-white shadow-xl shadow-amber-950/40'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="capitalize font-extrabold text-xs text-amber-400 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{periodKey}</span>
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-black text-white">{periodData.tempC}°C</div>
                  <div className="text-xs font-semibold text-cyan-300 mt-0.5">{periodData.condition}</div>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between">
                    <span>Rain Probability:</span>
                    <strong className="text-sky-400">{periodData.rainProbabilityPct}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Wind Speed:</span>
                    <strong className="text-emerald-400">{periodData.windKmH} km/h</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Humidity:</span>
                    <strong className="text-teal-400">{periodData.humidityPct}% Rh</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: MONSOON & GLOBAL RAINFALL CYCLES */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-4">
        <div>
          <h2 className="text-lg font-bold flex items-center space-x-2">
            <CloudRain className="w-5 h-5 text-sky-400" />
            <span>Monsoon & Seasonal Ocean Precipitation Cycles</span>
          </h2>
          <p className="text-xs text-slate-400">
            Precipitation volume (mm) comparing Southwest Monsoon vs Northeast Monsoon against Sea Surface Temperature (°C).
          </p>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONSOON_RAINFALL_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="swMonsoon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="neMonsoon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="swMonsoonMm" name="SW Monsoon Rainfall (mm)" stroke="#0284c7" fillOpacity={1} fill="url(#swMonsoon)" />
              <Area type="monotone" dataKey="neMonsoonMm" name="NE Monsoon Rainfall (mm)" stroke="#10b981" fillOpacity={1} fill="url(#neMonsoon)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 5: CLIMATIC HEAT MAP MATRIX */}
      <div id="climatic-heat-map" className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>INTERACTIVE OCEAN HEATMAP & THERMAL STRESS MATRIX</span>
            </div>
            <h2 className="text-xl font-black text-white flex items-center space-x-2">
              <span>Climatic Heat Map</span>
            </h2>
            <p className="text-xs text-slate-400">
              Multi-basin thermal index matrix mapping Sea Surface Temperature (SST °C), monsoon rainfall rate (mm/h), and wave swell energy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <span className="text-slate-400 font-bold px-2">HEATMAP PARAMETER:</span>
            {[
              { id: 'SST', label: '🔥 Sea Surface Temp (°C)' },
              { id: 'RAINFALL', label: '🌧️ Monsoon Rainfall (mm/h)' },
              { id: 'SWELL', label: '🌊 Swell Wave Height (m)' },
              { id: 'STRESS', label: '⚠️ Thermal Stress Level' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setHeatmapMetric(m.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  heatmapMetric === m.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Heat Map Color Scale Gradient Legend */}
        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 font-bold flex items-center space-x-1.5">
            <Thermometer className="w-4 h-4 text-cyan-400" />
            <span>Intensity Color Scale:</span>
          </span>
          <div className="flex-1 max-w-md mx-4 h-3 rounded-full bg-gradient-to-r from-blue-600 via-emerald-500 via-yellow-400 via-amber-500 to-rose-600 border border-slate-700" />
          <div className="flex space-x-3 text-[10px] text-slate-400">
            <span>Low / Normal</span>
            <span className="text-amber-400 font-bold">Moderate</span>
            <span className="text-rose-400 font-black">Severe / Extreme</span>
          </div>
        </div>

        {/* Climatic Heat Map Grid Cells */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLIMATIC_HEATMAP_GRID.map((cell) => {
            const isSelected = selectedHeatMapCell?.code === cell.code;
            
            // Calculate dynamic cell heat background based on selected parameter
            let heatBg = 'bg-slate-950 border-slate-800';
            let metricDisplay = '';
            let valLabel = '';

            if (heatmapMetric === 'SST') {
              valLabel = `${cell.sstTempC}°C`;
              if (cell.sstTempC > 31) heatBg = 'bg-rose-950/60 border-rose-500 text-rose-200';
              else if (cell.sstTempC > 28) heatBg = 'bg-amber-950/60 border-amber-500 text-amber-200';
              else heatBg = 'bg-cyan-950/60 border-cyan-500 text-cyan-200';
              metricDisplay = `Sea Surface Temp: ${cell.sstTempC}°C`;
            } else if (heatmapMetric === 'RAINFALL') {
              valLabel = `${cell.rainfallMmHr} mm/h`;
              if (cell.rainfallMmHr > 40) heatBg = 'bg-rose-950/60 border-rose-500 text-rose-200';
              else if (cell.rainfallMmHr > 20) heatBg = 'bg-sky-950/60 border-sky-500 text-sky-200';
              else heatBg = 'bg-slate-950/60 border-slate-800 text-slate-300';
              metricDisplay = `Precipitation Rate: ${cell.rainfallMmHr} mm/h`;
            } else if (heatmapMetric === 'SWELL') {
              valLabel = `${cell.swellHeightM} m`;
              if (cell.swellHeightM > 7.0) heatBg = 'bg-rose-950/60 border-rose-500 text-rose-200';
              else if (cell.swellHeightM > 4.0) heatBg = 'bg-amber-950/60 border-amber-500 text-amber-200';
              else heatBg = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
              metricDisplay = `Swell Wave Height: ${cell.swellHeightM} meters`;
            } else {
              valLabel = cell.thermalStressIndex;
              if (cell.thermalStressIndex === 'Extreme') heatBg = 'bg-rose-950/80 border-rose-500 text-rose-200';
              else if (cell.thermalStressIndex === 'Severe') heatBg = 'bg-amber-950/80 border-amber-500 text-amber-200';
              else heatBg = 'bg-slate-950/80 border-slate-800 text-slate-300';
              metricDisplay = `Thermal Stress: ${cell.thermalStressIndex}`;
            }

            return (
              <div
                key={cell.code}
                onClick={() => setSelectedHeatMapCell(cell)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${heatBg} ${
                  isSelected ? 'ring-2 ring-amber-400 scale-[1.02] shadow-2xl' : 'hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">{cell.code} • {cell.coordinates}</span>
                    <h4 className="font-extrabold text-sm text-white mt-0.5">{cell.region}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-900/80 border border-slate-700">
                    {valLabel}
                  </span>
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <div className="text-amber-300 font-bold flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cell.primaryThreat}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{metricDisplay}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Thermal Stress:</span>
                  <strong className={cell.thermalStressIndex === 'Extreme' ? 'text-rose-400' : 'text-emerald-400'}>
                    {cell.thermalStressIndex}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>

        {selectedHeatMapCell && (
          <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/40 text-xs font-mono space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-amber-400 font-bold uppercase block text-[10px]">HEATMAP REGIONAL INSPECTOR DETAIL</span>
              <h4 className="text-base font-black text-white">{selectedHeatMapCell.region} ({selectedHeatMapCell.coordinates})</h4>
              <p className="text-slate-300 mt-0.5">
                Primary Hazard: <strong className="text-rose-300">{selectedHeatMapCell.primaryThreat}</strong> • Sea Surface Temp: <strong className="text-cyan-300">{selectedHeatMapCell.sstTempC}°C</strong> • Swell Wave Height: <strong className="text-emerald-300">{selectedHeatMapCell.swellHeightM}m</strong>
              </p>
            </div>
            <button
              onClick={() => onOpenRouteRadar && onOpenRouteRadar()}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shrink-0"
            >
              TRACK IN LIVE ROUTE RADAR
            </button>
          </div>
        )}
      </div>

      {/* SECTION 6: CLIMATE TREND CHART */}
      <div id="climate-trend-chart" className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>OCEAN CLIMATE ANOMALY & HISTORICAL MULTI-METRIC METRICS</span>
            </div>
            <h2 className="text-xl font-black text-white flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              <span>Climate Trend Chart</span>
            </h2>
            <p className="text-xs text-slate-400">
              Continuous 12-month historical and projected trajectory of Sea Surface Temperature SST Anomaly (°C), Cyclone Energy ACE, Monsoon Rainfall, and Ocean Wave Swell heights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <span className="text-slate-400 font-bold px-2">TREND METRIC:</span>
            {[
              { id: 'SST_ANOMALY', label: '🌡️ SST Anomaly (°C)' },
              { id: 'CYCLONE_ACE', label: '🌀 Cyclone Energy ACE' },
              { id: 'RAINFALL', label: '🌧️ Rainfall Volume (mm)' },
              { id: 'WAVE_SWELL', label: '🌊 Wave Swell Height (m)' }
            ].map((tm) => (
              <button
                key={tm.id}
                onClick={() => setTrendChartMetric(tm.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  trendChartMetric === tm.id
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tm.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Climate Trend Chart */}
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={CLIMATE_TREND_HISTORICAL_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="sstGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="aceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="timePeriod" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />

              {trendChartMetric === 'SST_ANOMALY' && (
                <>
                  <Area type="monotone" dataKey="sstAnomalyC" name="SST Temp Anomaly (°C above baseline)" stroke="#f43f5e" fillOpacity={1} fill="url(#sstGradient)" />
                  <Line type="monotone" dataKey="thermalBleachingIndex" name="Coral Bleaching Thermal Index" stroke="#fbbf24" strokeWidth={2} dot={{ r: 4 }} />
                </>
              )}

              {trendChartMetric === 'CYCLONE_ACE' && (
                <>
                  <Bar dataKey="cycloneEnergyACE" name="Accumulated Cyclone Energy (ACE Index)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  <Line type="monotone" dataKey="waveSwellM" name="Average Ocean Swell (m)" stroke="#38bdf8" strokeWidth={2.5} />
                </>
              )}

              {trendChartMetric === 'RAINFALL' && (
                <>
                  <Bar dataKey="rainfallMm" name="Oceanic Precipitation (mm/month)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Line type="monotone" dataKey="sstAnomalyC" name="SST Anomaly (°C)" stroke="#f43f5e" strokeWidth={2} />
                </>
              )}

              {trendChartMetric === 'WAVE_SWELL' && (
                <>
                  <Area type="monotone" dataKey="waveSwellM" name="Significant Wave Height (m)" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Line type="monotone" dataKey="cycloneEnergyACE" name="Cyclone ACE Index" stroke="#f59e0b" strokeWidth={2} />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-400 text-[10px]">CURRENT ANOMALY</span>
            <strong className="text-rose-400 block text-sm font-black">+1.48°C (Peak Aug 2026)</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">CYLONIC ACE INDEX</span>
            <strong className="text-cyan-400 block text-sm font-black">118 ACE Units (Above Normal)</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">MAX MONSOON RAIN</span>
            <strong className="text-sky-400 block text-sm font-black">420 mm Peak Monthly Volume</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">SWELL WAVE ENERGY</span>
            <strong className="text-emerald-400 block text-sm font-black">5.8 Meters Significant Swell</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
