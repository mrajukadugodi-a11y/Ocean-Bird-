import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Radio,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  Compass,
  MapPin,
  Anchor,
  FileText,
  Search,
  Filter,
  Volume2,
  VolumeX,
  ExternalLink,
  Zap,
  Eye,
  Shield,
  Siren,
  Bot,
  Sparkles,
  RefreshCw,
  ArrowUpDown,
  Activity,
  Cpu,
  Layers,
  Flame,
  LineChart,
  Bookmark,
  Send,
  CheckSquare,
  Sliders,
  LayoutDashboard,
  AlertOctagon,
  Flower2,
  BookOpen,
  ChevronRight,
  BarChart3,
  PieChart,
  Map as MapIcon,
  Download,
  Bell,
  Play,
  Square,
  Lock,
  Unlock,
  Users,
  CloudLightning,
  Target,
  Navigation,
  Gauge,
  DollarSign,
  Award,
  Camera,
  Package,
  Globe,
  Mic,
  HelpCircle,
  HeartPulse,
  Leaf,
  MessageSquare,
  CloudRain,
  Thermometer,
  Fuel,
  FileSpreadsheet,
  WifiOff,
  ShoppingBag,
  Landmark,
  TrendingUp,
  GitMerge,
  FileCheck,
  Ship,
  Fish,
  Droplets,
  ShieldCheck,
  Info,
  Languages,
  Scale,
  Waves,
  History,
  LayoutGrid,
  Newspaper
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';
import { PirateRiskScoreCard } from './piracy/PirateRiskScoreCard';
import { PiracyEvasionLogsView } from './piracy/PiracyEvasionLogsView';
import { HistoricalPirateTrendsView } from './piracy/HistoricalPirateTrendsView';
import { CollaborateReportToolModal } from './piracy/CollaborateReportToolModal';
import { AutomatedResponseDrillSimulator } from './piracy/AutomatedResponseDrillSimulator';
import { PiracyImpactCalculatorView } from './piracy/PiracyImpactCalculatorView';
import { PiracyDataExportTool } from './piracy/PiracyDataExportTool';
import { PiracyDrillTimer } from './piracy/PiracyDrillTimer';
import { PiracyTrendVisualizer } from './piracy/PiracyTrendVisualizer';
import { SmartPiracyNotificationEngine } from './piracy/SmartPiracyNotificationEngine';
import { PiracyDroneFeedView } from './piracy/PiracyDroneFeedView';
import { PiracyAutoMitigationEngine } from './piracy/PiracyAutoMitigationEngine';
import { PiracyThreatAnimationOverlay } from './piracy/PiracyThreatAnimationOverlay';
import { CrewDrillBadgesView } from './piracy/CrewDrillBadgesView';
import { SmartCargoTrackingView } from './piracy/SmartCargoTrackingView';
import { GlobalFleetInsightView } from './piracy/GlobalFleetInsightView';
import { VoiceWorkflowAutomationView } from './piracy/VoiceWorkflowAutomationView';
import { VesselHealthARView } from './piracy/VesselHealthARView';
import { CargoAISecurityAdvisor } from './piracy/CargoAISecurityAdvisor';
import { ARHelpOverlayModal } from './piracy/ARHelpOverlayModal';
import { FleetAnalyticsInsightsView } from './piracy/FleetAnalyticsInsightsView';
import { CrewWelfareAIEngine } from './piracy/CrewWelfareAIEngine';
import { MaritimeSustainabilityView } from './piracy/MaritimeSustainabilityView';
import { PredictiveCargoFlowView } from './piracy/PredictiveCargoFlowView';
import { BiometricDataMaskingView } from './piracy/BiometricDataMaskingView';
import { ARPortEntryOverlayView } from './piracy/ARPortEntryOverlayView';
import { CrewSentimentAnalysisView } from './piracy/CrewSentimentAnalysisView';
import { ShipSalesPortalView } from './piracy/ShipSalesPortalView';
import { TradeMarketingPortalView } from './piracy/TradeMarketingPortalView';
import { VesselBrokerageUI } from './piracy/VesselBrokerageUI';
import { TradeGatewayPortalView } from './piracy/TradeGatewayPortalView';
import { MarketPriceTrendsView } from './piracy/MarketPriceTrendsView';
import { InquiryWorkflowManagerView } from './piracy/InquiryWorkflowManagerView';
import { GlobalTradeMapOverlayView } from './piracy/GlobalTradeMapOverlayView';
import { TradeAnalyticsPortalView } from './piracy/TradeAnalyticsPortalView';
import { MarketComparisonToolView } from './piracy/MarketComparisonToolView';
import { TradeForecastView } from './piracy/TradeForecastView';
import { MarketWatchlistView } from './piracy/MarketWatchlistView';
import { TradeMapOverlayView } from './piracy/TradeMapOverlayView';
import { BulkInquiryToolView } from './piracy/BulkInquiryToolView';
import { TradeAlertManagerView } from './piracy/TradeAlertManagerView';
import { DealNegotiationRoomView } from './piracy/DealNegotiationRoomView';
import { TradeMapLayersView } from './piracy/TradeMapLayersView';
import { InquiryPdfGeneratorView } from './piracy/InquiryPdfGeneratorView';
import { TradeNegotiationChatView } from './piracy/TradeNegotiationChatView';
import { PdfTradeSummaryGeneratorView } from './piracy/PdfTradeSummaryGeneratorView';
import { InteractiveTradeMapOverlayView } from './piracy/InteractiveTradeMapOverlayView';
import { TradeAlertRuleEngineView } from './piracy/TradeAlertRuleEngineView';
import { VoyageSimulationView } from './piracy/VoyageSimulationView';
import { CargoDamageLoggerView } from './piracy/CargoDamageLoggerView';
import { PortPerformanceChartView } from './piracy/PortPerformanceChartView';
import { QuickSosPulseView } from './piracy/QuickSosPulseView';
import { ClimateRiskMatrixView } from './piracy/ClimateRiskMatrixView';
import { FleetEfficiencyReportView } from './piracy/FleetEfficiencyReportView';
import { HapticAlertToggleView } from './piracy/HapticAlertToggleView';
import { PdfIncidentReportView } from './piracy/PdfIncidentReportView';
import { ClimateHeatmapView } from './piracy/ClimateHeatmapView';
import { MarineFuelForecastView } from './piracy/MarineFuelForecastView';
import { ExportCsvToolView } from './piracy/ExportCsvToolView';
import { ClimateScenariosView } from './piracy/ClimateScenariosView';
import { AlertHeatmapView } from './piracy/AlertHeatmapView';
import { AutomatePortForecastView } from './piracy/AutomatePortForecastView';
import { OfflineMapSyncView } from './piracy/OfflineMapSyncView';
import { BalticCruiseFilterView } from './piracy/BalticCruiseFilterView';
import { BalticMapVisualisationView } from './piracy/BalticMapVisualisationView';
import { RegionalAlertToggleView } from './piracy/RegionalAlertToggleView';
import { BalticPortDetailsView } from './piracy/BalticPortDetailsView';
import { ClimateHistoricalTrendView } from './piracy/ClimateHistoricalTrendView';
import { MarinePollutionReportsView } from './piracy/MarinePollutionReportsView';
import { RegionalPortWeatherView } from './piracy/RegionalPortWeatherView';
import { CoastalBiodiversityMapView } from './piracy/CoastalBiodiversityMapView';
import { EmergencyChecklistsView } from './piracy/EmergencyChecklistsView';
import { WindRoseChartView } from './piracy/WindRoseChartView';
import { RegionalTimeZonesView } from './piracy/RegionalTimeZonesView';
import { AnimateTrendOnHoverView } from './piracy/AnimateTrendOnHoverView';
import { ExportToPdfView } from './piracy/ExportToPdfView';
import { SeaTemperatureTrendView } from './piracy/SeaTemperatureTrendView';
import { PortSafetyRatingView } from './piracy/PortSafetyRatingView';
import { AnimateAlertTransitionView } from './piracy/AnimateAlertTransitionView';
import { QuickExportButtonView } from './piracy/QuickExportButtonView';
import { TrendFiltersView } from './piracy/TrendFiltersView';
import { ExportAsCsvView } from './piracy/ExportAsCsvView';
import { InteractiveTooltipsView } from './piracy/InteractiveTooltipsView';
import { TrendMarkersView } from './piracy/TrendMarkersView';
import { LanguageSelectorView } from './piracy/LanguageSelectorView';
import { PortComparisonView } from './piracy/PortComparisonView';
import { SeaStateLegendView } from './piracy/SeaStateLegendView';
import { HistoricalAlertsView } from './piracy/HistoricalAlertsView';
import { ShipFuelLogsView } from './piracy/ShipFuelLogsView';
import { VoiceSearchView } from './piracy/VoiceSearchView';
import { PortTimeCardView } from './piracy/PortTimeCardView';
import { SonarSoundClipsView } from './piracy/SonarSoundClipsView';
import { ShipLocationGpsTrackerView } from './piracy/ShipLocationGpsTrackerView';
import { CategoryWiseDashboardView } from './piracy/CategoryWiseDashboardView';
import { MarineSpeciesIndexView } from './piracy/MarineSpeciesIndexView';
import { RegionalPortGuideView } from './piracy/RegionalPortGuideView';
import { RegionalAlertDashboardView } from './piracy/RegionalAlertDashboardView';
import { GeoFilterToggleView } from './piracy/GeoFilterToggleView';
import { MarineConservationNewsView } from './piracy/MarineConservationNewsView';
import { SpeciesMigrationHeatmapView } from './piracy/SpeciesMigrationHeatmapView';
import { EcoFriendlyRoutePlannerView } from './piracy/EcoFriendlyRoutePlannerView';
import { MarinePolicyHubView } from './piracy/MarinePolicyHubView';
import { CarbonDashboardView } from './piracy/CarbonDashboardView';
import { SpeciesAlertsView } from './piracy/SpeciesAlertsView';
import { PolicyAiAssistantView } from './piracy/PolicyAiAssistantView';
import { ConservationBookmarkView } from './piracy/ConservationBookmarkView';
import { ConservationTimelineView } from './piracy/ConservationTimelineView';
import { InteractivePolicyMapView } from './piracy/InteractivePolicyMapView';
import { PolicyAiSearchView } from './piracy/PolicyAiSearchView';
import { BookmarkAnalyticsView } from './piracy/BookmarkAnalyticsView';
import { ClimateMapLegendView } from './piracy/ClimateMapLegendView';
import { ClimateAlertView } from './piracy/ClimateAlertView';
import { MarineDiversityIndexView } from './piracy/MarineDiversityIndexView';
import { MigrationPathVisualizerView } from './piracy/MigrationPathVisualizerView';
import { PortEmergencyPlanView } from './piracy/PortEmergencyPlanView';
import { ClimateTrendInsightView } from './piracy/ClimateTrendInsightView';
import { SmartAlertSortingView } from './piracy/SmartAlertSortingView';
import { HistoricalClimateComparisonView } from './piracy/HistoricalClimateComparisonView';
import { PortWeatherOverlayView } from './piracy/PortWeatherOverlayView';
import { ClimateDataExportView } from './piracy/ClimateDataExportView';
import { OptimizerRegionalAlertView } from './piracy/OptimizerRegionalAlertView';
import { LocalFloraFaunaView } from './piracy/LocalFloraFaunaView';
import { ClimateWikiView } from './piracy/ClimateWikiView';
import { AlertSummariesView } from './piracy/AlertSummariesView';
import { ClimateTrendlineView } from './piracy/ClimateTrendlineView';
import { ImpactPredictionMapView } from './piracy/ImpactPredictionMapView';
import { ClimateDataCompareView } from './piracy/ClimateDataCompareView';
import { ClimateReportPdfView } from './piracy/ClimateReportPdfView';
import { MarineClimateDashboardView } from './piracy/MarineClimateDashboardView';
import { ClimateAlertWidgetsView } from './piracy/ClimateAlertWidgetsView';
import { DataAnomalyAlertView } from './piracy/DataAnomalyAlertView';
import { ScenariosSimulationView } from './piracy/ScenariosSimulationView';
import { ExportDataButtonView } from './piracy/ExportDataButtonView';

// ==========================================
// WEB AUDIO API SIREN SYNTHESIZER
// ==========================================

class MaritimeAlarmSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted() {
    return this.isMuted;
  }

  public playEmergencySiren(durationMs: number = 3000) {
    if (this.isMuted) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';

      // Alternating dual-tone emergency siren (880 Hz / 1174 Hz)
      const stepDuration = 0.25;
      const totalSteps = Math.floor(durationMs / 1000 / stepDuration);

      for (let i = 0; i < totalSteps; i++) {
        const freq = i % 2 === 0 ? 880 : 1174;
        osc.frequency.setValueAtTime(freq, now + i * stepDuration);
      }

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + durationMs / 1000);
    } catch (e) {
      console.warn('Web Audio Playback failed or was blocked by browser policy', e);
    }
  }

  public playSonarPing() {
    if (this.isMuted) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.4);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.warn('Sonar audio ping failed', e);
    }
  }
}

export const maritimeAlarmSynth = new MaritimeAlarmSynthesizer();

// ==========================================
// TYPES & MOCK DATA
// ==========================================

export interface PiracyIncident {
  id: string;
  region: string;
  location: string;
  coordinates: string;
  date: string;
  time: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
  incidentType: 'Armed Robbery' | 'Boarding Attempt' | 'Hijack Warning' | 'Suspicious Approach' | 'GPS Spoofing & Subsea Cable Interference';
  vesselTarget: string;
  status: 'ACTIVE ALERT' | 'INVESTIGATING' | 'REPELLED' | 'CLOSED';
  description: string;
  actionTaken: string;
}

export interface PiracyHotspot {
  id: string;
  name: string;
  regionCode: string;
  coordinates: { xPct: number; yPct: number }; // SVG Map relative percentages
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
  densityPct: number;
  incidentCount30d: number;
  primaryThreat: string;
  safeCorridorActive: boolean;
  recommendedSpeedKnots: number;
}

const MOCK_PIRACY_HOTSPOTS: PiracyHotspot[] = [
  {
    id: 'HOT-01',
    name: 'Bab-el-Mandeb & Southern Red Sea',
    regionCode: 'RED_SEA',
    coordinates: { xPct: 48, yPct: 42 },
    threatLevel: 'CRITICAL',
    densityPct: 94,
    incidentCount30d: 28,
    primaryThreat: 'Unmanned Surface Vessels (USV) & Armed Skiff Swarms',
    safeCorridorActive: true,
    recommendedSpeedKnots: 18.5
  },
  {
    id: 'HOT-02',
    name: 'Strait of Malacca & Singapore Strait TSS',
    regionCode: 'MALACCA',
    coordinates: { xPct: 78, yPct: 56 },
    threatLevel: 'HIGH',
    densityPct: 82,
    incidentCount30d: 19,
    primaryThreat: 'Night Boardings & Armed Robbery at Anchor',
    safeCorridorActive: true,
    recommendedSpeedKnots: 16.0
  },
  {
    id: 'HOT-03',
    name: 'Gulf of Guinea & Niger Delta Outer Bar',
    regionCode: 'GUINEA',
    coordinates: { xPct: 32, yPct: 58 },
    threatLevel: 'HIGH',
    densityPct: 78,
    incidentCount30d: 14,
    primaryThreat: 'Kidnapping for Ransom & Offshore Tanker Boardings',
    safeCorridorActive: false,
    recommendedSpeedKnots: 17.5
  },
  {
    id: 'HOT-04',
    name: 'Somali Basin & Socotra Passage HRA',
    regionCode: 'SOMALI',
    coordinates: { xPct: 55, yPct: 48 },
    threatLevel: 'ELEVATED',
    densityPct: 62,
    incidentCount30d: 9,
    primaryThreat: 'Dhow Motherships & High-Speed Skiff Chases',
    safeCorridorActive: true,
    recommendedSpeedKnots: 18.0
  },
  {
    id: 'HOT-05',
    name: 'Sulu-Celebes Sea & Sibutu Passage (Philippines)',
    regionCode: 'PHILIPPINES',
    coordinates: { xPct: 84, yPct: 52 },
    threatLevel: 'HIGH',
    densityPct: 75,
    incidentCount30d: 16,
    primaryThreat: 'Small Craft Infiltration & Tug/Barge Interceptions',
    safeCorridorActive: true,
    recommendedSpeedKnots: 15.5
  },
  {
    id: 'HOT-06',
    name: 'Baltic Sea & Danish Straits Maritime Security Zone',
    regionCode: 'BALTIC',
    coordinates: { xPct: 45, yPct: 22 },
    threatLevel: 'ELEVATED',
    densityPct: 58,
    incidentCount30d: 11,
    primaryThreat: 'Shadow Fleet Subsea Infrastructure Interference & GPS Jamming',
    safeCorridorActive: true,
    recommendedSpeedKnots: 15.0
  },
  {
    id: 'HOT-07',
    name: 'Torres Strait & Great Barrier Reef Passage (Australia)',
    regionCode: 'AUSTRALIA',
    coordinates: { xPct: 88, yPct: 72 },
    threatLevel: 'MODERATE',
    densityPct: 24,
    incidentCount30d: 3,
    primaryThreat: 'Illegal Unreported Fishing (IUF) & Border Intrusion Monitoring',
    safeCorridorActive: true,
    recommendedSpeedKnots: 14.0
  },
  {
    id: 'HOT-08',
    name: 'Cook Strait & Hauraki Shipping Lanes (New Zealand)',
    regionCode: 'NEW_ZEALAND',
    coordinates: { xPct: 94, yPct: 84 },
    threatLevel: 'MODERATE',
    densityPct: 18,
    incidentCount30d: 1,
    primaryThreat: 'Heavy Swell Navigation Alerts & Biosecurity Patrols',
    safeCorridorActive: true,
    recommendedSpeedKnots: 13.5
  },
  {
    id: 'HOT-09',
    name: 'Vung Tau Anchorage & Tonkin Approach (Vietnam)',
    regionCode: 'VIETNAM',
    coordinates: { xPct: 80, yPct: 50 },
    threatLevel: 'ELEVATED',
    densityPct: 68,
    incidentCount30d: 12,
    primaryThreat: 'Unanchored Small Boat Approaches & Theft at Night Anchorage',
    safeCorridorActive: true,
    recommendedSpeedKnots: 14.5
  }
];

const MOCK_PIRACY_INCIDENTS: PiracyIncident[] = [
  {
    id: 'PIR-2026-101',
    region: 'Australia (Torres Strait / Coral Sea)',
    location: '14 NM North of Thursday Island, Torres Strait',
    coordinates: "10° 25.1' S / 142° 12.8' E",
    date: '2026-08-07',
    time: '01:15 UTC',
    threatLevel: 'ELEVATED',
    incidentType: 'Suspicious Approach',
    vesselTarget: 'Bulk Ore Carrier',
    status: 'ACTIVE ALERT',
    description: 'Border Force Australian Maritime Security Command detected unauthorized speed skiff approaching ore carrier starboard quarter.',
    actionTaken: 'Australian Border Force patrol vessel dispatched; vessel altered course and skiff retreated.'
  },
  {
    id: 'PIR-2026-099',
    region: 'New Zealand (Cook Strait)',
    location: '8 NM East of Cape Terawhiti, Wellington Passage',
    coordinates: "41° 17.3' S / 174° 36.9' E",
    date: '2026-08-06',
    time: '22:40 UTC',
    threatLevel: 'MODERATE',
    incidentType: 'GPS Spoofing & Subsea Cable Interference',
    vesselTarget: 'Inter-Island Ro-Pax Ferry',
    status: 'INVESTIGATING',
    description: 'Intermittent GNSS positioning variance observed near Wellington subsea power and telecom cable crossing.',
    actionTaken: 'Royal New Zealand Navy Hydrographic team notified and visual watch doubled.'
  },
  {
    id: 'PIR-2026-097',
    region: 'Philippines (Sulu Sea / Sibutu Passage)',
    location: '22 NM South-West of Tawi-Tawi Island',
    coordinates: "04° 58.4' N / 119° 42.1' E",
    date: '2026-08-05',
    time: '18:30 UTC',
    threatLevel: 'CRITICAL',
    incidentType: 'Boarding Attempt',
    vesselTarget: 'Feeder Container Ship',
    status: 'REPELLED',
    description: 'Two high-speed twin-engine skiffs carrying armed individuals attempted to attach magnetic ladders to vessel hull.',
    actionTaken: 'Philippine Coast Guard Coast Watch System triggered sonic alarm and deployed escort cutter.'
  },
  {
    id: 'PIR-2026-096',
    region: 'Vietnam (Vung Tau Outer Anchorage)',
    location: '6 NM South-East of Vung Tau Port',
    coordinates: "10° 18.2' N / 107° 04.5' E",
    date: '2026-08-05',
    time: '11:10 UTC',
    threatLevel: 'HIGH',
    incidentType: 'Armed Robbery',
    vesselTarget: 'Product Tanker',
    status: 'ACTIVE ALERT',
    description: 'Unidentified wooden craft approached under cover of heavy tropical rain; intruders boarded stern store room.',
    actionTaken: 'Vietnam Coast Guard Region 3 patrol boat arrived on scene; security watch tightened.'
  },
  {
    id: 'PIR-2026-095',
    region: 'Baltic Sea / Danish Straits (Bornholm Basin)',
    location: '18 NM South-East of Bornholm Island',
    coordinates: "55° 04.2' N / 014° 51.8' E",
    date: '2026-08-05',
    time: '03:20 UTC',
    threatLevel: 'ELEVATED',
    incidentType: 'GPS Spoofing & Subsea Cable Interference',
    vesselTarget: 'LNG Carrier (Ice Class)',
    status: 'ACTIVE ALERT',
    description: 'Vessel experienced severe satellite GNSS signal spoofing and detected unflagged shadow fleet vessel loitering over undersea fiber-optic telecom cable corridor.',
    actionTaken: 'Master switched navigation to visual radar fixes and notified NATO Maritime Command (MARCOM) and Danish Joint Operations Centre.'
  },
  {
    id: 'PIR-2026-089',
    region: 'Strait of Malacca / Singapore Strait',
    location: '12 NM Off Horsburgh Lighthouse (Eastbound TSS)',
    coordinates: "01° 19.8' N / 104° 24.3' E",
    date: '2026-07-30',
    time: '02:45 UTC',
    threatLevel: 'HIGH',
    incidentType: 'Boarding Attempt',
    vesselTarget: 'Bulk Carrier (Capesize)',
    status: 'ACTIVE ALERT',
    description: '4 armed perpetrators in a fast wooden skiff approached stern using grappling hooks. Duty engineer spotted intruders and raised ship whistle alarm.',
    actionTaken: 'Master initiated evasive zig-zag maneuvers, activated fire hoses, and informed Singapore VTIS. Perpetrators aborted boarding and fled.'
  },
  {
    id: 'PIR-2026-084',
    region: 'Gulf of Aden / Bab-el-Mandeb',
    location: '28 NM South-East of Mocha, Yemen',
    coordinates: "13° 08.2' N / 043° 11.5' E",
    date: '2026-07-28',
    time: '14:20 UTC',
    threatLevel: 'CRITICAL',
    incidentType: 'Hijack Warning',
    vesselTarget: 'Chemical Tanker',
    status: 'ACTIVE ALERT',
    description: 'Multiple skiffs carrying automatic weapons and ladder equipment shadowed vessel at 22 Knots within 0.8 NM distance.',
    actionTaken: 'Armed Onboard Security Team (PCASP) fired warning flares and warning shots. Naval warship dispatched for escort.'
  },
  {
    id: 'PIR-2026-078',
    region: 'Bay of Bengal / Chattogram Outer Anchorage',
    location: 'Anchorage Alpha, Chittagong Port',
    coordinates: "22° 06.1' N / 091° 44.0' E",
    date: '2026-07-25',
    time: '23:10 UTC',
    threatLevel: 'ELEVATED',
    incidentType: 'Armed Robbery',
    vesselTarget: 'Container Ship',
    status: 'INVESTIGATING',
    description: 'Robbers boarded unobserved via anchor chain hawse pipe and stole ship store supplies (coils and tools).',
    actionTaken: 'Hawse pipe cover locked, Coast Guard patrol boat boarded to investigate incident.'
  },
  {
    id: 'PIR-2026-071',
    region: 'Somali Basin / Indian Ocean High Risk Area',
    location: '380 NM East of Socotra Island',
    coordinates: "12° 22.0' N / 059° 48.0' E",
    date: '2026-07-20',
    time: '08:15 UTC',
    threatLevel: 'HIGH',
    incidentType: 'Suspicious Approach',
    vesselTarget: 'VLCC Crude Oil Tanker',
    status: 'REPELLED',
    description: 'Dhow acting as mothership launched 2 skiffs making high-speed approach toward tanker starboard side.',
    actionTaken: 'Vessel increased speed to 18.5 Knots, crew mustered in Citadel. Naval aircraft conducted low flyby forcing skiffs to disengage.'
  }
];

// Frequency Hourly Distribution (00 to 23 Hours UTC)
const HOURLY_INCIDENT_FREQUENCY = [
  { hour: '00:00', count: 12, risk: 'HIGH' },
  { hour: '02:00', count: 24, risk: 'CRITICAL' },
  { hour: '04:00', count: 28, risk: 'CRITICAL' },
  { hour: '06:00', count: 14, risk: 'HIGH' },
  { hour: '08:00', count: 6, risk: 'LOW' },
  { hour: '10:00', count: 4, risk: 'LOW' },
  { hour: '12:00', count: 8, risk: 'MODERATE' },
  { hour: '14:00', count: 16, risk: 'HIGH' },
  { hour: '16:00', count: 11, risk: 'MODERATE' },
  { hour: '18:00', count: 15, risk: 'HIGH' },
  { hour: '20:00', count: 21, risk: 'CRITICAL' },
  { hour: '22:00', count: 19, risk: 'CRITICAL' }
];

export const MarinePiracyAlertView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SENSOR_RADAR' | 'HEAT_MAP' | 'AI_SUMMARY' | 'RESPONSE_PLAN' | 'INCIDENTS' | 'RISK_TRENDS' | 'EVASION_DRILLS' | 'SMART_ALERTS' | 'DATA_EXPORT' | 'DRONE_SURVEILLANCE' | 'SMART_CARGO' | 'FLEET_INSIGHT' | 'VOICE_AUTOMATION' | 'VESSEL_AR' | 'CREW_WELFARE' | 'SHIP_SALES' | 'TRADE_MARKETING' | 'VESSEL_BROKERAGE' | 'TRADE_GATEWAY' | 'MARKET_TRENDS' | 'INQUIRY_WORKFLOW' | 'TRADE_MAP' | 'TRADE_ANALYTICS' | 'MARKET_COMPARISON' | 'TRADE_FORECAST' | 'MARKET_WATCHLIST' | 'TRADE_MAP_OVERLAY' | 'BULK_INQUIRY' | 'TRADE_ALERT_MGR' | 'DEAL_NEGOTIATION' | 'TRADE_MAP_LAYERS' | 'INQUIRY_PDF_GEN' | 'TRADE_NEG_CHAT' | 'PDF_TRADE_SUMMARIES' | 'INTERACTIVE_TRADE_MAP' | 'TRADE_ALERT_ENGINE' | 'VOYAGE_SIM' | 'CARGO_DAMAGE_LOG' | 'PORT_PERF_CHART' | 'QUICK_SOS_PULSE' | 'CLIMATE_RISK_MATRIX' | 'FLEET_EFFICIENCY_REPORT' | 'HAPTIC_ALERT_TOGGLE' | 'PDF_INCIDENT_REPORT' | 'CLIMATE_HEATMAP' | 'MARINE_FUEL_FORECAST' | 'EXPORT_CSV_TOOL' | 'CLIMATE_SCENARIOS' | 'ALERT_HEATMAP' | 'AUTOMATE_PORT_FORECAST' | 'OFFLINE_MAP_SYNC' | 'BALTIC_CRUISE_FILTER' | 'BALTIC_MAP_VIS' | 'REGIONAL_ALERT_TOGGLE' | 'BALTIC_PORT_DETAILS' | 'CLIMATE_HISTORICAL_TREND' | 'MARINE_POLLUTION_REPORTS' | 'REGIONAL_PORT_WEATHER' | 'COASTAL_BIODIVERSITY_MAP' | 'EMERGENCY_PREPAREDNESS_CHECKLISTS' | 'WIND_ROSE_CHART' | 'REGIONAL_TIME_ZONES' | 'ANIMATE_TREND_ON_HOVER' | 'EXPORT_TO_PDF' | 'SEA_TEMP_TREND' | 'PORT_SAFETY_RATING' | 'ANIMATE_ALERT_TRANSITION' | 'QUICK_EXPORT_BUTTON' | 'TREND_FILTERS' | 'EXPORT_AS_CSV' | 'INTERACTIVE_TOOLTIPS' | 'TREND_MARKERS' | 'LANGUAGE_SELECTOR' | 'PORT_COMPARISON' | 'SEA_STATE_LEGEND' | 'HISTORICAL_ALERTS' | 'SHIP_FUEL_LOGS' | 'VOICE_SEARCH' | 'PORT_TIME_CARD' | 'SONAR_SOUND_CLIPS' | 'SHIP_LOCATION_GPS_TRACKER' | 'CATEGORY_DASHBOARD' | 'MARINE_SPECIES_INDEX' | 'REGIONAL_PORT_GUIDE' | 'REGIONAL_ALERT_DASHBOARD' | 'GEO_FILTER_TOGGLE' | 'MARINE_CONSERVATION_NEWS' | 'SPECIES_MIGRATION_HEATMAP' | 'ECO_FRIENDLY_ROUTE_PLANNER' | 'MARINE_POLICY_HUB' | 'CARBON_DASHBOARD' | 'SPECIES_ALERTS' | 'POLICY_AI_ASSISTANT' | 'CONSERVATION_BOOKMARK' | 'CONSERVATION_TIMELINE' | 'INTERACTIVE_POLICY_MAP' | 'POLICY_AI_SEARCH' | 'BOOKMARK_ANALYTICS' | 'CLIMATE_MAP_LEGEND' | 'CLIMATE_ALERT' | 'MARINE_DIVERSITY_INDEX' | 'MIGRATION_PATH_VISUALIZER' | 'PORT_EMERGENCY_PLAN' | 'CLIMATE_TREND_INSIGHT' | 'SMART_ALERT_SORTING' | 'HISTORICAL_CLIMATE_COMPARISON' | 'PORT_WEATHER_OVERLAY' | 'CLIMATE_DATA_EXPORT' | 'OPTIMIZER_REGIONAL_ALERT' | 'LOCAL_FLORA_FAUNA' | 'CLIMATE_WIKI' | 'ALERT_SUMMARIES' | 'CLIMATE_TRENDLINE' | 'IMPACT_PREDICTION_MAP' | 'CLIMATE_DATA_COMPARE' | 'CLIMATE_REPORT_PDF' | 'MARINE_CLIMATE_DASHBOARD' | 'CLIMATE_ALERT_WIDGETS' | 'DATA_ANOMALY_ALERT' | 'SCENARIOS_SIMULATION' | 'EXPORT_DATA_BUTTON'>('CATEGORY_DASHBOARD');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedThreat, setSelectedThreat] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sosTriggered, setSosTriggered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isArHelpModalOpen, setIsArHelpModalOpen] = useState<boolean>(false);

  // Super Master AI Agent Pirate Detector Sensor States
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [lradArmed, setLradArmed] = useState<boolean>(false);
  const [waterCannonsActive, setWaterCannonsActive] = useState<boolean>(true);
  const [simulatedTarget, setSimulatedTarget] = useState<boolean>(false);
  const [targetDistanceNm, setTargetDistanceNm] = useState<number>(1.8);
  const [targetBearingDeg, setTargetBearingDeg] = useState<number>(142);
  const [targetSpeedKnots, setTargetSpeedKnots] = useState<number>(24.5);
  const [aiConfidencePct, setAiConfidencePct] = useState<number>(98.6);

  // Selected Hotspot for Heat Map
  const [activeHotspot, setActiveHotspot] = useState<PiracyHotspot>(MOCK_PIRACY_HOTSPOTS[0]);

  // Response Plan Protocol Steps
  const [responseStep, setResponseStep] = useState<number>(1);
  const [responseLog, setResponseLog] = useState<string[]>([
    '02:40 UTC: Super Master AI Agent detected suspicious Doppler MMW radar return at 3.2 NM.',
    '02:42 UTC: FLIR Optical camera confirmed 4 perpetrators in fast skiff with boarding ladders.',
    '02:44 UTC: Automated BMP5 Security Hardening protocol initiated.'
  ]);

  // BMP5 Checklist state
  const [bmpChecklist, setBmpChecklist] = useState({
    citadelPrepared: true,
    razorWireRigged: true,
    fireHosesPressurized: true,
    ukmtoRegistered: true,
    extraLookoutsPosted: true,
    pcaspAssigned: false
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleChecklist = (key: keyof typeof bmpChecklist) => {
    hapticEngine.trigger('click');
    setBmpChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAudioMute = () => {
    hapticEngine.trigger('click');
    const newMuted = !isAudioMuted;
    setIsAudioMuted(newMuted);
    maritimeAlarmSynth.setMuted(newMuted);
    showToast(newMuted ? 'Audible Alarm Muted' : 'Audible Emergency Alarm Audio ENABLED');
  };

  const handleTestAudibleAlarm = () => {
    hapticEngine.trigger('alert');
    maritimeAlarmSynth.playEmergencySiren(2500);
    showToast('PLAYING TEST MARITIME EMERGENCY ALARM SIREN (880Hz / 1174Hz)');
  };

  const handleRunSensorDiagnostic = () => {
    hapticEngine.trigger('click');
    setIsScanning(true);
    maritimeAlarmSynth.playSonarPing();
    showToast('Super Master AI Agent running 360° multi-spectral radar & sonar sensor diagnostics...');
    setTimeout(() => {
      hapticEngine.trigger('success');
      showToast('All 6 Anti-Piracy AI Sensors Operational: Thermal FLIR, MMW Radar, & Hydrophones nominal.');
    }, 1200);
  };

  const handleSimulateSkiffApproach = () => {
    hapticEngine.trigger('alert');
    maritimeAlarmSynth.playEmergencySiren(3500);
    setSimulatedTarget(true);
    setTargetDistanceNm(1.8);
    setTargetSpeedKnots(26.2);
    setAiConfidencePct(99.4);
    showToast('ALERT: Super Master AI Agent detected high-speed suspicious skiff on starboard quarter!');
  };

  const handleDisengageThreat = () => {
    hapticEngine.trigger('success');
    setSimulatedTarget(false);
    showToast('Threat repelled! Super Master AI Agent confirmed skiff aborted approach and disengaged.');
  };

  const toggleLradDefense = () => {
    hapticEngine.trigger('click');
    setLradArmed(!lradArmed);
    if (!lradArmed) {
      maritimeAlarmSynth.playSonarPing();
      showToast('Super Master AI Agent: Non-Lethal LRAD Directional Sound Defense ARMED.');
    } else {
      showToast('Super Master AI Agent: LRAD Defense set to STANDBY.');
    }
  };

  const triggerSosBroadcast = () => {
    hapticEngine.trigger('alert');
    maritimeAlarmSynth.playEmergencySiren(4000);
    setSosTriggered(true);
    setTimeout(() => {
      setSosTriggered(false);
    }, 8000);
  };

  // Response Plan Action Handlers
  const handleExecuteResponseStep = (stepNumber: number, actionName: string) => {
    hapticEngine.trigger('click');
    setResponseStep(stepNumber);
    maritimeAlarmSynth.playSonarPing();
    const timestamp = new Date().toISOString().substring(11, 19);
    setResponseLog((prev) => [`${timestamp} UTC: Executed [${actionName}]`, ...prev]);
    showToast(`Response Protocol Stage ${stepNumber} Executed: ${actionName}`);
  };

  const filteredIncidents = MOCK_PIRACY_INCIDENTS.filter((item) => {
    const matchesRegion = selectedRegion === 'ALL' || item.region.includes(selectedRegion);
    const matchesThreat = selectedThreat === 'ALL' || item.threatLevel === selectedThreat;
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRegion && matchesThreat && matchesSearch;
  });

  return (
    <div id="marine-piracy-alert-view" className="space-y-6 font-mono text-xs text-slate-100">
      {/* Top PIR Security Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>IMB PIRACY REPORTING CENTRE & UKMTO HIGH RISK MONITOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              <span>Marine Piracy Alert & Security Center (PIR)</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Real-time threat feeds for Bay of Bengal, Arabian Sea, Bab-el-Mandeb, and Strait of Malacca. BMP5 security checklists and direct emergency distress broadcasting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleAudioMute}
              className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-all border ${
                isAudioMuted
                  ? 'bg-slate-950 text-slate-400 border-slate-800'
                  : 'bg-cyan-950 text-cyan-300 border-cyan-800 shadow'
              }`}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
              <span>{isAudioMuted ? 'MUTE AUDIO' : 'AUDIO ENABLED'}</span>
            </button>

            {/* Test Alarm Tone Button */}
            <button
              onClick={handleTestAudibleAlarm}
              className="px-3.5 py-2.5 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-800/80 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>TEST ALARM TONE</span>
            </button>

            {/* Emergency SOS Button */}
            <button
              onClick={triggerSosBroadcast}
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs tracking-wider uppercase transition-all shadow-xl flex items-center space-x-2 border ${
                sosTriggered
                  ? 'bg-rose-600 text-white border-rose-300 animate-ping'
                  : 'bg-rose-500/20 hover:bg-rose-500 text-rose-300 border-rose-500/50'
              }`}
            >
              <Radio className="w-4 h-4 animate-pulse text-rose-400" />
              <span>{sosTriggered ? 'SOS SENT!' : 'EMERGENCY PIRACY SOS'}</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-5 mt-5 border-t border-slate-800/80">
          <button
            onClick={() => {
              setActiveTab('CATEGORY_DASHBOARD');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CATEGORY_DASHBOARD'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-cyan-400 hover:text-white border border-cyan-800/60 font-black'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
            <span>CATEGORY DASHBOARD</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SENSOR_RADAR');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SENSOR_RADAR'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI SENSOR RADAR</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('HEAT_MAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'HEAT_MAP'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>PIRACY HEAT MAP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('AI_SUMMARY');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'AI_SUMMARY'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI SITUATION & FREQUENCY</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('RESPONSE_PLAN');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'RESPONSE_PLAN'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>RESPONSE PLAN & BMP5</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('INCIDENTS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'INCIDENTS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>INCIDENTS FEED</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('RISK_TRENDS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'RISK_TRENDS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>RISK SCORE & TRENDS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EVASION_DRILLS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EVASION_DRILLS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>EVASION & DRILLS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SMART_ALERTS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SMART_ALERTS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>SMART ALERTS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DRONE_SURVEILLANCE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'DRONE_SURVEILLANCE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>UAV DRONE & THREAT ANIMATIONS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SMART_CARGO');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SMART_CARGO'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>SMART CARGO</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('FLEET_INSIGHT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'FLEET_INSIGHT'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL FLEET</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('VOICE_AUTOMATION');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'VOICE_AUTOMATION'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>VOICE AUTOMATION</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('VESSEL_AR');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'VESSEL_AR'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VESSEL HEALTH AR</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CREW_WELFARE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CREW_WELFARE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>CREW WELFARE AI</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SHIP_SALES');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SHIP_SALES'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>SHIP SALES PORTAL</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('VESSEL_BROKERAGE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'VESSEL_BROKERAGE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>VESSEL BROKERAGE UI</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_MARKETING');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_MARKETING'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>TRADE & MARKETING PORTAL</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_GATEWAY');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_GATEWAY'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>TRADE GATEWAY PORTAL</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARKET_TRENDS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARKET_TRENDS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>MARKET PRICE TRENDS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('INQUIRY_WORKFLOW');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'INQUIRY_WORKFLOW'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>INQUIRY WORKFLOW</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_MAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_MAP'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL TRADE MAP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_ANALYTICS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_ANALYTICS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>TRADE ANALYTICS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARKET_COMPARISON');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARKET_COMPARISON'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>MARKET COMPARISON</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_FORECAST');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_FORECAST'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>TRADE FORECAST</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARKET_WATCHLIST');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARKET_WATCHLIST'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>MARKET WATCHLIST</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_MAP_OVERLAY');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_MAP_OVERLAY'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>TRADE MAP OVERLAY</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('BULK_INQUIRY');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'BULK_INQUIRY'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>BULK INQUIRY TOOL</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_ALERT_MGR');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_ALERT_MGR'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>TRADE ALERTS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DEAL_NEGOTIATION');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'DEAL_NEGOTIATION'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>DEAL NEGOTIATION</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_MAP_LAYERS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_MAP_LAYERS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>TRADE MAP LAYERS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('INQUIRY_PDF_GEN');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'INQUIRY_PDF_GEN'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>INQUIRY PDF GEN</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_NEG_CHAT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_NEG_CHAT'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>TRADE NEGOTIATION CHAT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PDF_TRADE_SUMMARIES');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PDF_TRADE_SUMMARIES'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF TRADE SUMMARIES</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('INTERACTIVE_TRADE_MAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'INTERACTIVE_TRADE_MAP'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>TRADE MAP OVERLAY</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TRADE_ALERT_ENGINE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TRADE_ALERT_ENGINE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>TRADE ALERTS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('VOYAGE_SIM');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'VOYAGE_SIM'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>VOYAGE SIMULATION</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CARGO_DAMAGE_LOG');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CARGO_DAMAGE_LOG'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CARGO DAMAGE LOGGER</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PORT_PERF_CHART');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PORT_PERF_CHART'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>PORT PERFORMANCE CHART</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('QUICK_SOS_PULSE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'QUICK_SOS_PULSE'
                ? 'bg-rose-500 text-white shadow font-black'
                : 'bg-rose-950/80 text-rose-300 hover:text-white border border-rose-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>QUICK SOS PULSE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_RISK_MATRIX');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_RISK_MATRIX'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>CLIMATE RISK MATRIX</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('FLEET_EFFICIENCY_REPORT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'FLEET_EFFICIENCY_REPORT'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>FLEET EFFICIENCY REPORT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('HAPTIC_ALERT_TOGGLE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'HAPTIC_ALERT_TOGGLE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>HAPTIC ALERT TOGGLE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PDF_INCIDENT_REPORT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PDF_INCIDENT_REPORT'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF INCIDENT REPORT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_HEATMAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_HEATMAP'
                ? 'bg-rose-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>CLIMATE HEATMAP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARINE_FUEL_FORECAST');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARINE_FUEL_FORECAST'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Fuel className="w-3.5 h-3.5" />
            <span>MARINE FUEL FORECAST</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXPORT_CSV_TOOL');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXPORT_CSV_TOOL'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXPORT CSV</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('BALTIC_CRUISE_FILTER');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'BALTIC_CRUISE_FILTER'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Ship className="w-3.5 h-3.5 text-cyan-400" />
            <span>BALTIC CRUISE FILTER</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('BALTIC_MAP_VIS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'BALTIC_MAP_VIS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>BALTIC MAP VISUALISATION</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('REGIONAL_ALERT_TOGGLE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'REGIONAL_ALERT_TOGGLE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>REGIONAL ALERT TOGGLE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('BALTIC_PORT_DETAILS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'BALTIC_PORT_DETAILS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Anchor className="w-3.5 h-3.5 text-cyan-400" />
            <span>BALTIC PORT DETAILS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_HISTORICAL_TREND');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_HISTORICAL_TREND'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLIMATE HISTORICAL TREND</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARINE_POLLUTION_REPORTS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARINE_POLLUTION_REPORTS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>MARINE POLLUTION REPORTS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('REGIONAL_PORT_WEATHER');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'REGIONAL_PORT_WEATHER'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
            <span>REGIONAL PORT WEATHER</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('COASTAL_BIODIVERSITY_MAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'COASTAL_BIODIVERSITY_MAP'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Fish className="w-3.5 h-3.5 text-emerald-400" />
            <span>COASTAL BIODIVERSITY MAP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EMERGENCY_PREPAREDNESS_CHECKLISTS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EMERGENCY_PREPAREDNESS_CHECKLISTS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>EMERGENCY CHECKLISTS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('WIND_ROSE_CHART');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'WIND_ROSE_CHART'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>WIND ROSE CHART</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('REGIONAL_TIME_ZONES');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'REGIONAL_TIME_ZONES'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>REGIONAL TIME ZONES</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ANIMATE_TREND_ON_HOVER');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ANIMATE_TREND_ON_HOVER'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>ANIMATE TREND ON HOVER</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXPORT_TO_PDF');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXPORT_TO_PDF'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXPORT TO PDF</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SEA_TEMP_TREND');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SEA_TEMP_TREND'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>SEA TEMP TREND</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PORT_SAFETY_RATING');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PORT_SAFETY_RATING'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>PORT SAFETY RATING</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ANIMATE_ALERT_TRANSITION');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ANIMATE_ALERT_TRANSITION'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
            <span>ANIMATE ALERT TRANSITION</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('QUICK_EXPORT_BUTTON');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'QUICK_EXPORT_BUTTON'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>QUICK EXPORT BUTTON</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TREND_FILTERS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TREND_FILTERS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>TREND FILTERS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXPORT_AS_CSV');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXPORT_AS_CSV'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXPORT AS CSV</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('INTERACTIVE_TOOLTIPS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'INTERACTIVE_TOOLTIPS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>TOOL TIPS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('TREND_MARKERS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'TREND_MARKERS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>TREND MARKERS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('LANGUAGE_SELECTOR');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'LANGUAGE_SELECTOR'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span>LANGUAGE SELECTOR</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PORT_COMPARISON');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PORT_COMPARISON'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>PORT COMPARISON</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SEA_STATE_LEGEND');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SEA_STATE_LEGEND'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>SEA STATE LEGEND</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('HISTORICAL_ALERTS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'HISTORICAL_ALERTS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5 text-rose-400" />
            <span>HISTORICAL ALERTS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SHIP_FUEL_LOGS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SHIP_FUEL_LOGS'
                ? 'bg-amber-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Fuel className="w-3.5 h-3.5 text-amber-400" />
            <span>SHIP FUEL LOGS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('VOICE_SEARCH');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'VOICE_SEARCH'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-cyan-400" />
            <span>VOICE SEARCH</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PORT_TIME_CARD');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PORT_TIME_CARD'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>PORT TIME CARD</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SONAR_SOUND_CLIPS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SONAR_SOUND_CLIPS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>SONAR CLIPS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SHIP_LOCATION_GPS_TRACKER');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SHIP_LOCATION_GPS_TRACKER'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span>SHIP GPS TRACKER</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARINE_SPECIES_INDEX');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARINE_SPECIES_INDEX'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Fish className="w-3.5 h-3.5 text-emerald-400" />
            <span>MARINE SPECIES INDEX</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('REGIONAL_PORT_GUIDE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'REGIONAL_PORT_GUIDE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Anchor className="w-3.5 h-3.5 text-cyan-400" />
            <span>REGIONAL PORT GUIDE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('REGIONAL_ALERT_DASHBOARD');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'REGIONAL_ALERT_DASHBOARD'
                ? 'bg-rose-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>REGIONAL ALERT DASHBOARD</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('GEO_FILTER_TOGGLE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'GEO_FILTER_TOGGLE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>GEO FILTER TOGGLE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARINE_CONSERVATION_NEWS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARINE_CONSERVATION_NEWS'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
            <span>CONSERVATION NEWS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SPECIES_MIGRATION_HEATMAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SPECIES_MIGRATION_HEATMAP'
                ? 'bg-amber-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>MIGRATION HEATMAP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ECO_FRIENDLY_ROUTE_PLANNER');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ECO_FRIENDLY_ROUTE_PLANNER'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>ECO ROUTE PLANNER</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARINE_POLICY_HUB');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARINE_POLICY_HUB'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>MARINE POLICY HUB</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CARBON_DASHBOARD');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CARBON_DASHBOARD'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>CARBON DASHBOARD</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SPECIES_ALERTS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SPECIES_ALERTS'
                ? 'bg-amber-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Fish className="w-3.5 h-3.5 text-amber-400" />
            <span>SPECIES ALERTS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('POLICY_AI_ASSISTANT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'POLICY_AI_ASSISTANT'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>POLICY AI ASSISTANT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CONSERVATION_BOOKMARK');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CONSERVATION_BOOKMARK'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>CONSERVATION BOOKMARK</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CONSERVATION_TIMELINE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CONSERVATION_TIMELINE'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>CONSERVATION TIMELINE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('INTERACTIVE_POLICY_MAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'INTERACTIVE_POLICY_MAP'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE POLICY MAP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('POLICY_AI_SEARCH');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'POLICY_AI_SEARCH'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>POLICY AI SEARCH</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('BOOKMARK_ANALYTICS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'BOOKMARK_ANALYTICS'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>BOOKMARK ANALYTICS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_MAP_LEGEND');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_MAP_LEGEND'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLIMATE MAP LEGEND</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_ALERT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_ALERT'
                ? 'bg-amber-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CloudLightning className="w-3.5 h-3.5 text-amber-400" />
            <span>CLIMATE ALERT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARINE_DIVERSITY_INDEX');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARINE_DIVERSITY_INDEX'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Fish className="w-3.5 h-3.5 text-emerald-400" />
            <span>MARINE DIVERSITY INDEX</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MIGRATION_PATH_VISUALIZER');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MIGRATION_PATH_VISUALIZER'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>MIGRATION PATH VISUALIZER</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PORT_EMERGENCY_PLAN');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PORT_EMERGENCY_PLAN'
                ? 'bg-rose-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Anchor className="w-3.5 h-3.5 text-rose-400" />
            <span>PORT EMERGENCY PLAN</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_TREND_INSIGHT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_TREND_INSIGHT'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLIMATE TREND INSIGHT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SMART_ALERT_SORTING');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SMART_ALERT_SORTING'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>SMART ALERT SORTING</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('HISTORICAL_CLIMATE_COMPARISON');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'HISTORICAL_CLIMATE_COMPARISON'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>HISTORICAL CLIMATE COMPARISON</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('PORT_WEATHER_OVERLAY');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PORT_WEATHER_OVERLAY'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
            <span>PORT WEATHER OVERLAY</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_DATA_EXPORT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_DATA_EXPORT'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>CLIMATE DATA EXPORT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('OPTIMIZER_REGIONAL_ALERT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'OPTIMIZER_REGIONAL_ALERT'
                ? 'bg-amber-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>OPTIMIZER REGIONAL ALERT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('LOCAL_FLORA_FAUNA');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'LOCAL_FLORA_FAUNA'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>LOCAL FLORA / FAUNA</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_WIKI');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_WIKI'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLIMATE WIKI</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ALERT_SUMMARIES');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ALERT_SUMMARIES'
                ? 'bg-rose-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>ALERT SUMMARIES</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_TRENDLINE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_TRENDLINE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLIMATE TRENDLINE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('IMPACT_PREDICTION_MAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'IMPACT_PREDICTION_MAP'
                ? 'bg-rose-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5 text-rose-400" />
            <span>IMPACT PREDICTION MAP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_DATA_COMPARE');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_DATA_COMPARE'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLIMATE DATA COMPARE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_REPORT_PDF');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_REPORT_PDF'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>CLIMATE REPORT PDF</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('MARINE_CLIMATE_DASHBOARD');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'MARINE_CLIMATE_DASHBOARD'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
            <span>MARINE CLIMATE DASHBOARD</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_ALERT_WIDGETS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_ALERT_WIDGETS'
                ? 'bg-amber-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>CLIMATE ALERT WIDGETS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DATA_ANOMALY_ALERT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'DATA_ANOMALY_ALERT'
                ? 'bg-rose-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>DATA ANOMALY ALERT</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('SCENARIOS_SIMULATION');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'SCENARIOS_SIMULATION'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCENARIOS SIMULATION</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('EXPORT_DATA_BUTTON');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'EXPORT_DATA_BUTTON'
                ? 'bg-emerald-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXPORT DATA BUTTON</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('CLIMATE_SCENARIOS');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'CLIMATE_SCENARIOS'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>CLIMATE SCENARIOS</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ALERT_HEATMAP');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ALERT_HEATMAP'
                ? 'bg-rose-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>ALERT HEATMAP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('AUTOMATE_PORT_FORECAST');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'AUTOMATE_PORT_FORECAST'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AUTOMATE PORT FORECAST</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('OFFLINE_MAP_SYNC');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'OFFLINE_MAP_SYNC'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>OFFLINE MAP SYNC</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('DATA_EXPORT');
              hapticEngine.trigger('click');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'DATA_EXPORT'
                ? 'bg-cyan-500 text-slate-950 shadow font-black'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>DATA EXPORT</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SOS Alert Active Notification Overlay */}
      {sosTriggered && (
        <div className="p-4 bg-rose-950 border-2 border-rose-500 rounded-2xl text-rose-200 text-xs font-mono flex items-center justify-between animate-bounce shadow-2xl">
          <div className="flex items-center space-x-3">
            <Siren className="w-6 h-6 text-rose-400 animate-spin" />
            <div>
              <p className="font-bold text-rose-100 uppercase">
                EMERGENCY DISTRESS BROADCAST ACTIVE (VHF CH 16 / INMARSAT-C)
              </p>
              <p className="text-rose-300 text-[11px]">
                Distress signal dispatched to UKMTO Maritime Trade Operations, IMB Piracy Centre & Regional Naval Taskforces.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg text-[10px]">MAYDAY PIRACY</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: SUPER MASTER AI AGENT PIRATE DETECTOR SENSOR RADAR */}
      {/* ======================================================== */}
      {activeTab === 'SENSOR_RADAR' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="text-sm font-extrabold text-white tracking-wide uppercase">
                  Super Master AI Agent — Anti-Piracy Multi-Sensor Radar
                </h3>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 text-[9px] font-black px-2.5 py-0.5 rounded-full">
                  SENSOR NODE ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Autonomous neural sensor suite combining FLIR thermal vision, MMW skiff doppler radar, hydro-acoustic hull sensors, and dark-vessel AIS anomaly classification
              </p>
            </div>

            {/* Interactive AI Sensor Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleRunSensorDiagnostic}
                className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>SENSOR DIAGNOSTICS</span>
              </button>

              <button
                onClick={toggleLradDefense}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-all border ${
                  lradArmed
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-950/50 shadow-lg font-black'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${lradArmed ? 'text-slate-950 animate-bounce' : 'text-amber-400'}`} />
                <span>{lradArmed ? 'LRAD SONIC ARMED' : 'ARM LRAD DEFENSE'}</span>
              </button>

              {!simulatedTarget ? (
                <button
                  onClick={handleSimulateSkiffApproach}
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black rounded-2xl text-xs flex items-center space-x-1.5 shadow-xl transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-white" />
                  <span>TEST SKIFF DETECTION</span>
                </button>
              ) : (
                <button
                  onClick={handleDisengageThreat}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center space-x-1.5 shadow-xl transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-950" />
                  <span>REPEL & DISENGAGE THREAT</span>
                </button>
              )}
            </div>
          </div>

          {/* Live Threat Radar Banner if Target Detected */}
          {simulatedTarget && (
            <div className="bg-rose-950/60 border-2 border-rose-500/80 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse shadow-rose-950/50 shadow-2xl">
              <div className="flex items-center space-x-3">
                <Siren className="w-7 h-7 text-rose-400 shrink-0 animate-spin" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-rose-100 uppercase">
                      SUPER MASTER AI PIRATE SENSOR ALERT: SUSPICIOUS SKIFF AT {targetDistanceNm} NM
                    </span>
                    <span className="bg-rose-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded">
                      BEARING {targetBearingDeg}°
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-300 font-sans mt-0.5">
                    FLIR Optical AI confirmed wooden skiff with 4 armed perpetrators & boarding ladders. Speed: {targetSpeedKnots} Knots. Precision: {aiConfidencePct}%.
                  </p>
                </div>
              </div>

              <button
                onClick={triggerSosBroadcast}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl border border-rose-400 shrink-0 shadow"
              >
                DISPATCH AUTOMATED MAYDAY
              </button>
            </div>
          )}

          {/* Sensor Grid Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Sensor 1: MMW Radar Skiff Detector */}
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">MMW Doppler Radar</span>
                </div>
                <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  360° ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Detects small wooden/fiberglass skiffs up to 12.4 NM in heavy sea clutter. Target velocity vector tracking online.
              </p>
              <div className="flex justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                <span>Range: 12.4 NM</span>
                <span className="text-cyan-400 font-bold">Sweep: 24 RPM</span>
              </div>
            </div>

            {/* Sensor 2: Thermal FLIR Camera AI */}
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Thermal FLIR AI Vision</span>
                </div>
                <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  NIGHT VISION ON
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Deep Neural Network classification of optical thermal profiles (recognizes grappling hooks, weapons, ladders).
              </p>
              <div className="flex justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                <span>Classifiers: 128 Models</span>
                <span className="text-amber-400 font-bold">Accuracy: 99.4%</span>
              </div>
            </div>

            {/* Sensor 3: Hydro-Acoustic Hull Contact Sensor */}
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white">Hydro-Acoustic Hull Sensor</span>
                </div>
                <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  HULL CONTACT NOMINAL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Listens for magnetic boarding clamps, underwater diver contacts, or grappling iron impacts against freeboard.
              </p>
              <div className="flex justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                <span>Sensors: 24 Transducers</span>
                <span className="text-indigo-400 font-bold">Freq: 20-100kHz</span>
              </div>
            </div>

            {/* Sensor 4: Dark-Vessel AIS Anomaly Detector */}
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">AIS Dark-Vessel Classifier</span>
                </div>
                <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  NEURAL MONITOR
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Flags unverified radar targets operating without active AIS transponders inside High Risk Area (HRA) corridors.
              </p>
              <div className="flex justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                <span>Motherships Flagged: 0</span>
                <span className="text-emerald-400 font-bold">Anomalies: 0</span>
              </div>
            </div>

            {/* Sensor 5: Non-Lethal LRAD Sonic Array */}
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">LRAD Directional Sound Cannon</span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${lradArmed ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                  {lradArmed ? 'ARMED 160 dB' : 'STANDBY'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                160 dB acoustic deterrent beam pointing system. Emits disorienting high-frequency acoustic pulse up to 3,000 meters.
              </p>
              <div className="flex justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                <span>Effective Range: 3.0 KM</span>
                <span className="text-amber-400 font-bold">Deterrence: 160 dB</span>
              </div>
            </div>

            {/* Sensor 6: Automated Citadel & Pressure Cannon Actuator */}
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">Citadel & Water Cannon Actuator</span>
                </div>
                <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-bold">
                  120 PSI READY
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Auto-pressurizes high-pressure water monitors along starboard/port gunwales upon breach protocol activation.
              </p>
              <div className="flex justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                <span>Hoses Pressurized: 6</span>
                <span className="text-cyan-400 font-bold">Pressure: 120 PSI</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FEATURE 1: PIRACY HEAT MAP COMPONENT                     */}
      {/* ======================================================== */}
      {activeTab === 'HEAT_MAP' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <MapIcon className="w-4 h-4 text-rose-400" />
                <span>Global Maritime Piracy Heat Map & Threat Corridor Overlay</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-sans">
                Real-time regional threat density matrix, high-risk corridor overlays, and recommended transit speeds
              </p>
            </div>

            <div className="flex items-center space-x-2 text-[10px]">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
                <span className="text-rose-400 font-bold">Critical Zone</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="text-amber-400 font-bold">High Risk Area</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SVG Interactive Map Canvas */}
            <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-4 relative min-h-[340px] flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="absolute top-3 left-3 z-10 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] space-y-0.5">
                <span className="text-slate-400 font-bold uppercase block">Interactive Radar Heat Canvas</span>
                <span className="text-cyan-400 font-bold">Click any hotspot node to inspect regional security brief</span>
              </div>

              {/* Vector SVG World Ocean Map Overlay */}
              <svg viewBox="0 0 1000 500" className="w-full h-full min-h-[280px] select-none">
                {/* World Map Continent Silhouettes */}
                <path
                  d="M150,120 Q200,100 280,140 Q320,180 290,260 Q220,280 180,220 Z"
                  fill="#1e293b"
                  opacity="0.4"
                />
                <path
                  d="M420,160 Q480,140 520,200 Q550,280 480,380 Q420,340 400,260 Z"
                  fill="#1e293b"
                  opacity="0.4"
                />
                <path
                  d="M580,100 Q720,80 820,150 Q880,220 800,320 Q700,300 620,200 Z"
                  fill="#1e293b"
                  opacity="0.4"
                />

                {/* Safe Shipping Corridor Lines */}
                <path
                  d="M 320,380 L 480,210 L 550,240 L 780,280 L 840,260"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  opacity="0.6"
                />

                {/* Hotspot Pulse Nodes */}
                {MOCK_PIRACY_HOTSPOTS.map((hotspot) => {
                  const isSelected = activeHotspot.id === hotspot.id;
                  const x = (hotspot.coordinates.xPct / 100) * 1000;
                  const y = (hotspot.coordinates.yPct / 100) * 500;
                  const color =
                    hotspot.threatLevel === 'CRITICAL'
                      ? '#f43f5e'
                      : hotspot.threatLevel === 'HIGH'
                      ? '#f59e0b'
                      : '#3b82f6';

                  return (
                    <g
                      key={hotspot.id}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => {
                        setActiveHotspot(hotspot);
                        hapticEngine.trigger('click');
                        maritimeAlarmSynth.playSonarPing();
                      }}
                    >
                      {/* Pulse Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={hotspot.densityPct / 4}
                        fill={color}
                        opacity={isSelected ? '0.35' : '0.18'}
                        className="animate-ping"
                      />
                      {/* Inner Solid Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? '10' : '7'}
                        fill={color}
                        stroke="#020617"
                        strokeWidth="2"
                      />
                      {/* Label Text */}
                      <text
                        x={x}
                        y={y - 14}
                        fill="#f8fafc"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="drop-shadow-md pointer-events-none"
                      >
                        {hotspot.name.split('&')[0]} ({hotspot.incidentCount30d})
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-900">
                <span>Grid projection: Mercator WGS84 • Sensor refresh rate 15s</span>
                <span className="text-emerald-400 font-bold">5 Active HRA Corridors Monitored</span>
              </div>
            </div>

            {/* Selected Hotspot Intelligence Detail Card */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] text-rose-400 font-bold uppercase block">
                      REGION CODE: {activeHotspot.regionCode}
                    </span>
                    <h4 className="text-sm font-black text-white">{activeHotspot.name}</h4>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded text-[9px] font-black border ${
                      activeHotspot.threatLevel === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : activeHotspot.threatLevel === 'HIGH'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    }`}
                  >
                    {activeHotspot.threatLevel}
                  </span>
                </div>

                {/* Threat Density Meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Threat Density Index:</span>
                    <strong className="text-cyan-400 font-bold">{activeHotspot.densityPct}%</strong>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        activeHotspot.densityPct > 85
                          ? 'bg-rose-500'
                          : activeHotspot.densityPct > 70
                          ? 'bg-amber-500'
                          : 'bg-cyan-500'
                      }`}
                      style={{ width: `${activeHotspot.densityPct}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px] space-y-1.5">
                  <span className="text-amber-400 font-bold flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Primary Threat Vector:</span>
                  </span>
                  <p className="text-slate-200 font-sans">{activeHotspot.primaryThreat}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                    <span className="text-slate-400 block">30-Day Incidents:</span>
                    <strong className="text-rose-400 text-sm font-black">{activeHotspot.incidentCount30d} Reports</strong>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
                    <span className="text-slate-400 block">Rec. Transit Speed:</span>
                    <strong className="text-emerald-400 text-sm font-black">&gt; {activeHotspot.recommendedSpeedKnots} Kts</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  showToast(`Assigned Route Escort Security for ${activeHotspot.name}`);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <Shield className="w-4 h-4 text-white" />
                <span>APPLY HRA TRANSIT PROTOCOL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FEATURE 2 & 4: AI SUMMARY & ALERT FREQUENCY ANALYSIS      */}
      {/* ======================================================== */}
      {activeTab === 'AI_SUMMARY' && (
        <div className="space-y-6">
          {/* AI Alert Executive Situation Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Super Master AI Agent — Piracy Situational Executive Summary</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-sans">
                  Deep Neural analysis of global piracy feeds, dark vessel transponders, and maritime security advisory notices
                </p>
              </div>

              <span className="text-[10px] text-emerald-300 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-xl font-bold">
                POSTURE SCORE: 98/100 DEFENSE READY
              </span>
            </div>

            {/* Executive KPI Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>30D Active Threats</span>
                </span>
                <p className="text-xl font-black text-rose-400">75 Incidents</p>
                <span className="text-[9px] text-rose-400 font-bold block">+12% vs Previous Quarter</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Repelled Approaches</span>
                </span>
                <p className="text-xl font-black text-emerald-300">92% Repel Rate</p>
                <span className="text-[9px] text-emerald-400 font-bold block">0 Successful Boardings</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Peak Risk Window</span>
                </span>
                <p className="text-xl font-black text-amber-300">01:00 - 05:00 UTC</p>
                <span className="text-[9px] text-amber-400 font-bold block">Moonless Night Tides</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <Radio className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Naval Escort Response</span>
                </span>
                <p className="text-xl font-black text-indigo-300">14.2 Mins Average</p>
                <span className="text-[9px] text-indigo-400 font-bold block">UKMTO Taskforce 151</span>
              </div>
            </div>

            {/* AI Narrative Briefing Box */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>AI SECURITY OFFICER ADVISORY NARRATIVE</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                "Anomalous skiff swarms detected in the Southern Red Sea and Bab-el-Mandeb corridor. Dark vessel activity has increased by 14% near the Singapore Strait TSS Eastbound lane during early morning hours. Recommend maintaining continuous 360° MMW radar watch, pressurizing all fire hoses along starboard gunwales, and arming the LRAD Non-Lethal Sonic Deterrent. If passing within 12 NM of Socotra Island, maintain speed exceeding 18.0 Knots to neutralize skiff overtaking vectors."
              </p>
            </div>
          </div>

          {/* Feature 4: Alert Frequency Analysis Visualizer */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>Maritime Piracy Alert Frequency & Hourly Distribution Analysis</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-sans">
                  Diurnal attack pattern mapping to assist captains in calculating safest transit time slots
                </p>
              </div>

              <span className="text-[10px] text-amber-300 bg-amber-950 border border-amber-800 px-3 py-1 rounded-xl font-bold">
                HIGH RISK HOURS: 02:00 - 04:00 UTC
              </span>
            </div>

            {/* Interactive Hourly Frequency Bar Chart */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400 font-bold">Incidents by Hour of Day (UTC):</span>
                <div className="flex items-center space-x-3 text-[9px]">
                  <span className="text-rose-400 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded bg-rose-500 inline-block" />
                    <span>Critical Risk</span>
                  </span>
                  <span className="text-amber-400 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded bg-amber-500 inline-block" />
                    <span>High Risk</span>
                  </span>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded bg-emerald-500 inline-block" />
                    <span>Low Risk</span>
                  </span>
                </div>
              </div>

              {/* Bar Chart Graphics */}
              <div className="grid grid-cols-12 gap-2 items-end h-40 pt-4 border-b border-slate-800/80 pb-2">
                {HOURLY_INCIDENT_FREQUENCY.map((item, idx) => {
                  const maxCount = 28;
                  const heightPct = (item.count / maxCount) * 100;
                  const barColor =
                    item.risk === 'CRITICAL'
                      ? 'bg-rose-500 hover:bg-rose-400'
                      : item.risk === 'HIGH'
                      ? 'bg-amber-500 hover:bg-amber-400'
                      : 'bg-emerald-500 hover:bg-emerald-400';

                  return (
                    <div key={idx} className="flex flex-col items-center space-y-1.5 h-full justify-end group cursor-pointer">
                      <span className="text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.count}
                      </span>
                      <div
                        className={`w-full ${barColor} rounded-t-md transition-all duration-300 shadow`}
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[8px] text-slate-400 font-bold">{item.hour}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
                <span>Safe Transit Window Recommendation: <strong className="text-emerald-400">08:00 - 11:00 UTC (Daylight Transit)</strong></span>
                <span className="text-cyan-400 font-bold">Analysis Based on 1,420 Historical IMB Reports</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FEATURE 3: PIRACY RESPONSE PLAN (BMP5 & SOLAS ENGINE)      */}
      {/* ======================================================== */}
      {activeTab === 'RESPONSE_PLAN' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Tactical Piracy Emergency Response Plan (BMP5 & SOLAS Engine)</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-sans">
                Interactive step-by-step emergency hardening, active non-lethal defense, and Citadel retreat protocols
              </p>
            </div>

            <span className="text-[10px] text-cyan-300 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-xl font-bold">
              STAGE {responseStep} OF 4 ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 4-Stage Tactical Response Sequence */}
            <div className="lg:col-span-2 space-y-3">
              {/* Stage 1: Detection & Verification */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  responseStep === 1 ? 'bg-cyan-950/40 border-cyan-400 shadow-lg' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-cyan-400 uppercase">STAGE 1: DISTANCE &gt; 3.0 NM</span>
                    <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>Threat Identification & Radar Verification</span>
                    </h4>
                  </div>
                  <button
                    onClick={() => handleExecuteResponseStep(1, 'Stage 1 Radar Verification')}
                    className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-lg text-[10px]"
                  >
                    EXECUTE STAGE 1
                  </button>
                </div>
                <p className="text-[10px] text-slate-300 font-sans mt-2">
                  Verify target course & speed vector using MMW Radar and Thermal FLIR. Post extra lookouts on bridge wings with night vision binoculars.
                </p>
              </div>

              {/* Stage 2: Vessel Hardening */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  responseStep === 2 ? 'bg-amber-950/40 border-amber-400 shadow-lg' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-amber-400 uppercase">STAGE 2: DISTANCE &lt; 2.0 NM</span>
                    <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Vessel Hardening & General Whistle Alarm</span>
                    </h4>
                  </div>
                  <button
                    onClick={() => handleExecuteResponseStep(2, 'Stage 2 General Alarm & Hardening')}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[10px]"
                  >
                    EXECUTE STAGE 2
                  </button>
                </div>
                <p className="text-[10px] text-slate-300 font-sans mt-2">
                  Sound ship general emergency whistle (7 short, 1 long blast). Turn on all high-power deck floodlights. Lock all accommodation doors from inside.
                </p>
              </div>

              {/* Stage 3: Active Non-Lethal Countermeasures */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  responseStep === 3 ? 'bg-rose-950/40 border-rose-400 shadow-lg' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-rose-400 uppercase">STAGE 3: DISTANCE &lt; 1.0 NM</span>
                    <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-rose-400" />
                      <span>LRAD Sonic Beam & High-Pressure Water Cannons</span>
                    </h4>
                  </div>
                  <button
                    onClick={() => handleExecuteResponseStep(3, 'Stage 3 LRAD & Water Cannons')}
                    className="px-3 py-1 bg-rose-500 hover:bg-rose-400 text-white font-black rounded-lg text-[10px]"
                  >
                    EXECUTE STAGE 3
                  </button>
                </div>
                <p className="text-[10px] text-slate-300 font-sans mt-2">
                  Aim 160 dB LRAD acoustic beam directly at approach vector. Increase speed to maximum engine power and initiate heavy zig-zag maneuvers to create wake turbulence.
                </p>
              </div>

              {/* Stage 4: Citadel Retreat & Mayday */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  responseStep === 4 ? 'bg-indigo-950/40 border-indigo-400 shadow-lg' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase">STAGE 4: BREACH IMMINENT (&lt; 0.3 NM)</span>
                    <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                      <Siren className="w-4 h-4 text-indigo-400" />
                      <span>Citadel Lockdown & UKMTO Mayday Dispatch</span>
                    </h4>
                  </div>
                  <button
                    onClick={() => handleExecuteResponseStep(4, 'Stage 4 Citadel Lockdown & Mayday')}
                    className="px-3 py-1 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-lg text-[10px]"
                  >
                    EXECUTE STAGE 4
                  </button>
                </div>
                <p className="text-[10px] text-slate-300 font-sans mt-2">
                  All non-essential crew muster inside fortified Citadel with independent satellite comms, emergency rations, and main engine override controls. Dispatch UKMTO Mayday.
                </p>
              </div>
            </div>

            {/* Tactical Execution Activity Log */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tactical Execution Audit Log</span>
                </span>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 max-h-[260px] overflow-y-auto">
                  {responseLog.map((log, idx) => (
                    <div key={idx} className="text-[9px] text-slate-300 font-mono border-b border-slate-800/60 pb-1.5 last:border-0">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  showToast('Exported Security Incident Audit Trail to PDF / Ship Logbook');
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold rounded-xl text-[10px] flex items-center justify-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>EXPORT AUDIT LOG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: INCIDENTS FEED & BMP5 CHECKLIST                   */}
      {/* ======================================================== */}
      {activeTab === 'INCIDENTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incidents Feed Column (2 Spans) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter and Search Controls */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-auto flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search location, coordinates, or incident type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-slate-300 font-bold"
                >
                  <option value="ALL">All Regions</option>
                  <option value="Australia">Australia & Torres Strait</option>
                  <option value="New Zealand">New Zealand & Cook Strait</option>
                  <option value="Philippines">Philippines & Sulu Sea</option>
                  <option value="Vietnam">Vietnam & Vung Tau Corridor</option>
                  <option value="Baltic">Baltic Sea & Danish Straits</option>
                  <option value="Malacca">Strait of Malacca</option>
                  <option value="Bab-el-Mandeb">Bab-el-Mandeb</option>
                  <option value="Bay of Bengal">Bay of Bengal</option>
                  <option value="Somali">Somali Basin</option>
                </select>

                <select
                  value={selectedThreat}
                  onChange={(e) => setSelectedThreat(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-slate-300 font-bold"
                >
                  <option value="ALL">All Threat Levels</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="ELEVATED">Elevated</option>
                </select>
              </div>
            </div>

            {/* Incidents List */}
            <div className="space-y-3">
              {filteredIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-slate-700 transition-all shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">{incident.id}</span>
                        <span className="text-[10px] text-cyan-400 font-bold">• {incident.incidentType}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{incident.region} ({incident.location})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[9px] font-black border ${
                          incident.threatLevel === 'CRITICAL'
                            ? 'bg-rose-950 text-rose-300 border-rose-800'
                            : incident.threatLevel === 'HIGH'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                        }`}
                      >
                        {incident.threatLevel}
                      </span>
                      <span className="text-[10px] text-slate-400">{incident.date} {incident.time}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs font-sans leading-relaxed">{incident.description}</p>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-300 space-y-0.5">
                    <strong className="text-emerald-400 font-bold block">Master & Patrol Response:</strong>
                    <span className="font-sans">{incident.actionTaken}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: BMP5 Security Checklist */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 h-fit shadow-2xl">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>BMP5 Security Checklist</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-sans">Best Management Practices for Vessel Hardening in High Risk Areas</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center space-x-2.5 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={bmpChecklist.citadelPrepared}
                  onChange={() => toggleChecklist('citadelPrepared')}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-200">Citadel Rations & Comms Prepared</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={bmpChecklist.razorWireRigged}
                  onChange={() => toggleChecklist('razorWireRigged')}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-200">Razor Wire Barrier Rigged on Gunwales</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={bmpChecklist.fireHosesPressurized}
                  onChange={() => toggleChecklist('fireHosesPressurized')}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-200">Fire Hoses Overboard & Pressurized</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={bmpChecklist.ukmtoRegistered}
                  onChange={() => toggleChecklist('ukmtoRegistered')}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-200">Registered with UKMTO & MSCHOA</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={bmpChecklist.extraLookoutsPosted}
                  onChange={() => toggleChecklist('extraLookoutsPosted')}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-200">Extra Bridge Wing Lookouts Posted</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={bmpChecklist.pcaspAssigned}
                  onChange={() => toggleChecklist('pcaspAssigned')}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-200">Armed Security Guard Team Onboard</span>
              </label>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  showToast('BMP5 Security Checklist Status Logged to UKMTO Portal');
                }}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-1 shadow"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                <span>CONFIRM BMP5 HARDENING</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: RISK SCORE, HISTORICAL TRENDS & IMPACT CALCULATOR   */}
      {/* ======================================================== */}
      {activeTab === 'RISK_TRENDS' && (
        <div className="space-y-6">
          <PirateRiskScoreCard freeboardMeters={4.5} vesselSpeedKnots={14.0} bmpReadinessPct={85} regionRiskLevel="HIGH" />
          <PiracyAutoMitigationEngine />
          <PiracyTrendVisualizer />
          <HistoricalPirateTrendsView />
          <PiracyImpactCalculatorView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: EVASION LOGS, DRILL SIMULATOR & REPORT TOOL        */}
      {/* ======================================================== */}
      {activeTab === 'EVASION_DRILLS' && (
        <div className="space-y-6">
          <PiracyDrillTimer />
          <CrewDrillBadgesView />
          <AutomatedResponseDrillSimulator />
          <PiracyEvasionLogsView />
          <CollaborateReportToolModal onReportSubmitted={(msg) => showToast(msg)} />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 8: SMART NOTIFICATIONS ENGINE                         */}
      {/* ======================================================== */}
      {activeTab === 'SMART_ALERTS' && (
        <div className="space-y-6">
          <SmartPiracyNotificationEngine />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 9: UAV DRONE RECON & THREAT ANIMATIONS                */}
      {/* ======================================================== */}
      {activeTab === 'DRONE_SURVEILLANCE' && (
        <div className="space-y-6">
          <PiracyDroneFeedView />
          <PiracyThreatAnimationOverlay />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 10: SMART CARGO SECURITY TRACKING & CARGO AI          */}
      {/* ======================================================== */}
      {activeTab === 'SMART_CARGO' && (
        <div className="space-y-6">
          <CargoAISecurityAdvisor />
          <PredictiveCargoFlowView />
          <SmartCargoTrackingView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 11: GLOBAL FLEET INSIGHT & SUSTAINABILITY            */}
      {/* ======================================================== */}
      {activeTab === 'FLEET_INSIGHT' && (
        <div className="space-y-6">
          <MaritimeSustainabilityView />
          <GlobalFleetInsightView />
          <FleetAnalyticsInsightsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 12: VOICE WORKFLOW EMERGENCY AUTOMATION               */}
      {/* ======================================================== */}
      {activeTab === 'VOICE_AUTOMATION' && (
        <div className="space-y-6">
          <VoiceWorkflowAutomationView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 13: VESSEL HEALTH AR HUD & PORT ENTRY                */}
      {/* ======================================================== */}
      {activeTab === 'VESSEL_AR' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setIsArHelpModalOpen(true);
                hapticEngine.trigger('click');
              }}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs flex items-center space-x-2 shadow-lg transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span>LAUNCH AR SPATIAL HELP OVERLAY</span>
            </button>
          </div>
          <ARPortEntryOverlayView />
          <VesselHealthARView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 14: CREW WELFARE, SENTIMENT & BIOMETRIC MASKING       */}
      {/* ======================================================== */}
      {activeTab === 'CREW_WELFARE' && (
        <div className="space-y-6">
          <CrewWelfareAIEngine />
          <CrewSentimentAnalysisView />
          <BiometricDataMaskingView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 15: COMMERCIAL SHIP SALES, CHARTER & PURCHASE PORTAL  */}
      {/* ======================================================== */}
      {activeTab === 'SHIP_SALES' && (
        <div className="space-y-6">
          <ShipSalesPortalView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 16: VESSEL BROKERAGE UI DESK                          */}
      {/* ======================================================== */}
      {activeTab === 'VESSEL_BROKERAGE' && (
        <div className="space-y-6">
          <VesselBrokerageUI />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 17: IMPORTER, EXPORTER & FREIGHT MARKETING PORTAL     */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_MARKETING' && (
        <div className="space-y-6">
          <TradeMarketingPortalView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 18: TRADE GATEWAY SINGLE-WINDOW PORTAL               */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_GATEWAY' && (
        <div className="space-y-6">
          <TradeGatewayPortalView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 19: MARKET PRICE TRENDS & BUNKERING RATES            */}
      {/* ======================================================== */}
      {activeTab === 'MARKET_TRENDS' && (
        <div className="space-y-6">
          <MarketPriceTrendsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 20: INQUIRY WORKFLOW DEAL PIPELINE                   */}
      {/* ======================================================== */}
      {activeTab === 'INQUIRY_WORKFLOW' && (
        <div className="space-y-6">
          <InquiryWorkflowManagerView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 21: GLOBAL MARITIME TRADE ROUTE MAP                  */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_MAP' && (
        <div className="space-y-6">
          <GlobalTradeMapOverlayView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 22: GLOBAL MARITIME TRADE ANALYTICS                  */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_ANALYTICS' && (
        <div className="space-y-6">
          <TradeAnalyticsPortalView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 23: VESSEL SEGMENT MARKET COMPARISON MATRIX          */}
      {/* ======================================================== */}
      {activeTab === 'MARKET_COMPARISON' && (
        <div className="space-y-6">
          <MarketComparisonToolView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 24: AI SEABORNE TRADE FORECAST ENGINE               */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_FORECAST' && (
        <div className="space-y-6">
          <TradeForecastView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 25: MARITIME MARKET WATCHLIST & ALERT TRACKER        */}
      {/* ======================================================== */}
      {activeTab === 'MARKET_WATCHLIST' && (
        <div className="space-y-6">
          <MarketWatchlistView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 26: TRADE MAP SPATIAL OVERLAY CONTROLS               */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_MAP_OVERLAY' && (
        <div className="space-y-6">
          <TradeMapOverlayView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 27: MULTI-VESSEL BULK RFP INQUIRY DISPATCHER        */}
      {/* ======================================================== */}
      {activeTab === 'BULK_INQUIRY' && (
        <div className="space-y-6">
          <BulkInquiryToolView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 28: MARITIME TRADE & RISK ALERT NOTIFICATION MANAGER */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_ALERT_MGR' && (
        <div className="space-y-6">
          <TradeAlertManagerView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 29: S&P DEAL & CHARTER NEGOTIATION ROOM             */}
      {/* ======================================================== */}
      {activeTab === 'DEAL_NEGOTIATION' && (
        <div className="space-y-6">
          <DealNegotiationRoomView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 30: MARITIME MAP SPATIAL LAYER STACK CONTROLS        */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_MAP_LAYERS' && (
        <div className="space-y-6">
          <TradeMapLayersView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 31: AUTOMATED INQUIRY & CONTRACT PDF GENERATOR      */}
      {/* ======================================================== */}
      {activeTab === 'INQUIRY_PDF_GEN' && (
        <div className="space-y-6">
          <InquiryPdfGeneratorView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 32: TRADE COUNTERPARTY NEGOTIATION CHAT ROOM        */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_NEG_CHAT' && (
        <div className="space-y-6">
          <TradeNegotiationChatView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 33: EXECUTIVE MARITIME PDF TRADE BRIEF SUMMARIES     */}
      {/* ======================================================== */}
      {activeTab === 'PDF_TRADE_SUMMARIES' && (
        <div className="space-y-6">
          <PdfTradeSummaryGeneratorView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 34: INTERACTIVE TRADE MAP CHOKEPOINT OVERLAY         */}
      {/* ======================================================== */}
      {activeTab === 'INTERACTIVE_TRADE_MAP' && (
        <div className="space-y-6">
          <InteractiveTradeMapOverlayView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 35: AUTOMATED TRADE & RISK EARLY WARNING ENGINE      */}
      {/* ======================================================== */}
      {activeTab === 'TRADE_ALERT_ENGINE' && (
        <div className="space-y-6">
          <TradeAlertRuleEngineView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 36: VOYAGE ROUTE & PIRACY BYPASS SIMULATION          */}
      {/* ======================================================== */}
      {activeTab === 'VOYAGE_SIM' && (
        <div className="space-y-6">
          <VoyageSimulationView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 37: CARGO DAMAGE & SHOCK INCIDENT LOGGER            */}
      {/* ======================================================== */}
      {activeTab === 'CARGO_DAMAGE_LOG' && (
        <div className="space-y-6">
          <CargoDamageLoggerView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 38: GLOBAL CONTAINER PORT PERFORMANCE MATRIX         */}
      {/* ======================================================== */}
      {activeTab === 'PORT_PERF_CHART' && (
        <div className="space-y-6">
          <PortPerformanceChartView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 39: EMERGENCY SATELLITE SOS DISTRESS BEACON PULSE   */}
      {/* ======================================================== */}
      {activeTab === 'QUICK_SOS_PULSE' && (
        <div className="space-y-6">
          <QuickSosPulseView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 40: GLOBAL OCEAN CLIMATE RISK MATRIX                 */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_RISK_MATRIX' && (
        <div className="space-y-6">
          <ClimateRiskMatrixView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 41: FLEET ENERGY EFFICIENCY & CII REPORT             */}
      {/* ======================================================== */}
      {activeTab === 'FLEET_EFFICIENCY_REPORT' && (
        <div className="space-y-6">
          <FleetEfficiencyReportView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 42: TACTILE HAPTIC VIBRATION ALERT CONTROLLER        */}
      {/* ======================================================== */}
      {activeTab === 'HAPTIC_ALERT_TOGGLE' && (
        <div className="space-y-6">
          <HapticAlertToggleView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 43: OFFICIAL PIRACY INCIDENT PDF REPORT GENERATOR    */}
      {/* ======================================================== */}
      {activeTab === 'PDF_INCIDENT_REPORT' && (
        <div className="space-y-6">
          <PdfIncidentReportView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 44: GLOBAL OCEAN CLIMATE & SEA TEMP HEATMAP          */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_HEATMAP' && (
        <div className="space-y-6">
          <ClimateHeatmapView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 45: MARINE BUNKER FUEL & EU ETS CARBON FORECAST      */}
      {/* ======================================================== */}
      {activeTab === 'MARINE_FUEL_FORECAST' && (
        <div className="space-y-6">
          <MarineFuelForecastView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 46: COMPREHENSIVE MARITIME TELEMETRY CSV EXPORTER    */}
      {/* ======================================================== */}
      {activeTab === 'EXPORT_CSV_TOOL' && (
        <div className="space-y-6">
          <ExportCsvToolView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 47: GLOBAL OCEAN CLIMATE CHANGE SCENARIOS            */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_SCENARIOS' && (
        <div className="space-y-6">
          <ClimateScenariosView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 48: REALTIME SECURITY ALERT ATTACK DENSITY HEATMAP  */}
      {/* ======================================================== */}
      {activeTab === 'ALERT_HEATMAP' && (
        <div className="space-y-6">
          <AlertHeatmapView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 49: AUTOMATED CONTAINER PORT BERTH WAIT FORECAST     */}
      {/* ======================================================== */}
      {activeTab === 'AUTOMATE_PORT_FORECAST' && (
        <div className="space-y-6">
          <AutomatePortForecastView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 51: BALTIC SEA CRUISE & PASSENGER FERRY FILTER       */}
      {/* ======================================================== */}
      {activeTab === 'BALTIC_CRUISE_FILTER' && (
        <div className="space-y-6">
          <BalticCruiseFilterView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 52: BALTIC SEA TACTICAL NAUTICAL CHART VISUALISATION */}
      {/* ======================================================== */}
      {activeTab === 'BALTIC_MAP_VIS' && (
        <div className="space-y-6">
          <BalticMapVisualisationView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 53: REGIONAL SECURITY ALERT BROADCAST TOGGLE MATRIX */}
      {/* ======================================================== */}
      {activeTab === 'REGIONAL_ALERT_TOGGLE' && (
        <div className="space-y-6">
          <RegionalAlertToggleView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 54: BALTIC MAJOR PORT OPERATIONS & TERMINAL DIRECTORY */}
      {/* ======================================================== */}
      {activeTab === 'BALTIC_PORT_DETAILS' && (
        <div className="space-y-6">
          <BalticPortDetailsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 55: CLIMATE HISTORICAL TREND                         */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_HISTORICAL_TREND' && (
        <div className="space-y-6">
          <ClimateHistoricalTrendView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 56: MARINE POLLUTION REPORTS                         */}
      {/* ======================================================== */}
      {activeTab === 'MARINE_POLLUTION_REPORTS' && (
        <div className="space-y-6">
          <MarinePollutionReportsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 57: REGIONAL PORT WEATHER                            */}
      {/* ======================================================== */}
      {activeTab === 'REGIONAL_PORT_WEATHER' && (
        <div className="space-y-6">
          <RegionalPortWeatherView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 58: COASTAL BIODIVERSITY MAP                         */}
      {/* ======================================================== */}
      {activeTab === 'COASTAL_BIODIVERSITY_MAP' && (
        <div className="space-y-6">
          <CoastalBiodiversityMapView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 59: EMERGENCY PREPAREDNESS CHECKLISTS                */}
      {/* ======================================================== */}
      {activeTab === 'EMERGENCY_PREPAREDNESS_CHECKLISTS' && (
        <div className="space-y-6">
          <EmergencyChecklistsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 60: WIND ROSE DIRECTIONAL FREQUENCY CHART            */}
      {/* ======================================================== */}
      {activeTab === 'WIND_ROSE_CHART' && (
        <div className="space-y-6">
          <WindRoseChartView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 61: REGIONAL MARITIME TIME ZONES & ETA CONVERTER     */}
      {/* ======================================================== */}
      {activeTab === 'REGIONAL_TIME_ZONES' && (
        <div className="space-y-6">
          <RegionalTimeZonesView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 62: ANIMATED TREND ON HOVER VISUALIZER               */}
      {/* ======================================================== */}
      {activeTab === 'ANIMATE_TREND_ON_HOVER' && (
        <div className="space-y-6">
          <AnimateTrendOnHoverView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 63: MARITIME SECURITY BRIEF PDF EXPORTER            */}
      {/* ======================================================== */}
      {activeTab === 'EXPORT_TO_PDF' && (
        <div className="space-y-6">
          <ExportToPdfView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 64: SEA SURFACE TEMPERATURE THERMAL TREND           */}
      {/* ======================================================== */}
      {activeTab === 'SEA_TEMP_TREND' && (
        <div className="space-y-6">
          <SeaTemperatureTrendView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 65: PORT SECURITY & ISPS SAFETY COMPLIANCE INDEX     */}
      {/* ======================================================== */}
      {activeTab === 'PORT_SAFETY_RATING' && (
        <div className="space-y-6">
          <PortSafetyRatingView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 66: ANIMATED ALERT STATE TRANSITION ENGINE           */}
      {/* ======================================================== */}
      {activeTab === 'ANIMATE_ALERT_TRANSITION' && (
        <div className="space-y-6">
          <AnimateAlertTransitionView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 67: ONE-CLICK QUICK DATA & REPORT EXPORTER          */}
      {/* ======================================================== */}
      {activeTab === 'QUICK_EXPORT_BUTTON' && (
        <div className="space-y-6">
          <QuickExportButtonView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 68: MULTI-PARAMETRIC TREND FILTERS                   */}
      {/* ======================================================== */}
      {activeTab === 'TREND_FILTERS' && (
        <div className="space-y-6">
          <TrendFiltersView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 69: TABULAR DATASET EXPORT AS CSV                    */}
      {/* ======================================================== */}
      {activeTab === 'EXPORT_AS_CSV' && (
        <div className="space-y-6">
          <ExportAsCsvView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 70: INTERACTIVE RADAR & MAP CONTEXTUAL TOOLTIPS       */}
      {/* ======================================================== */}
      {activeTab === 'INTERACTIVE_TOOLTIPS' && (
        <div className="space-y-6">
          <InteractiveTooltipsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 71: HISTORICAL TREND MILESTONE EVENT MARKERS         */}
      {/* ======================================================== */}
      {activeTab === 'TREND_MARKERS' && (
        <div className="space-y-6">
          <TrendMarkersView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 72: INTERNATIONAL BRIDGE LANGUAGE SELECTOR           */}
      {/* ======================================================== */}
      {activeTab === 'LANGUAGE_SELECTOR' && (
        <div className="space-y-6">
          <LanguageSelectorView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 73: PORT COMPARISON MATRIX                           */}
      {/* ======================================================== */}
      {activeTab === 'PORT_COMPARISON' && (
        <div className="space-y-6">
          <PortComparisonView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 74: DOUGLAS & BEAUFORT SEA STATE LEGEND              */}
      {/* ======================================================== */}
      {activeTab === 'SEA_STATE_LEGEND' && (
        <div className="space-y-6">
          <SeaStateLegendView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 75: IMO / IMB HISTORICAL ALERTS ARCHIVE              */}
      {/* ======================================================== */}
      {activeTab === 'HISTORICAL_ALERTS' && (
        <div className="space-y-6">
          <HistoricalAlertsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 76: SHIP BUNKER FUEL CONSUMPTION LOGS                */}
      {/* ======================================================== */}
      {activeTab === 'SHIP_FUEL_LOGS' && (
        <div className="space-y-6">
          <ShipFuelLogsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 77: HANDS-FREE BRIDGE VOICE SEARCH COMMANDS          */}
      {/* ======================================================== */}
      {activeTab === 'VOICE_SEARCH' && (
        <div className="space-y-6">
          <VoiceSearchView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 78: PORT TURNAROUND & LAYTIME TIME CARD              */}
      {/* ======================================================== */}
      {activeTab === 'PORT_TIME_CARD' && (
        <div className="space-y-6">
          <PortTimeCardView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 79: ACOUSTIC SONAR SOUND CLIP SYNTHESIZER           */}
      {/* ======================================================== */}
      {activeTab === 'SONAR_SOUND_CLIPS' && (
        <div className="space-y-6">
          <SonarSoundClipsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 81: CATEGORY-WISE UNIFIED MARITIME DASHBOARD         */}
      {/* ======================================================== */}
      {activeTab === 'CATEGORY_DASHBOARD' && (
        <div className="space-y-6">
          <CategoryWiseDashboardView onSelectTab={(tabKey) => setActiveTab(tabKey as any)} />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 82: MARINE SPECIES INDEX                             */}
      {/* ======================================================== */}
      {activeTab === 'MARINE_SPECIES_INDEX' && (
        <div className="space-y-6">
          <MarineSpeciesIndexView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 83: REGIONAL PORT OPERATIONAL GUIDE                  */}
      {/* ======================================================== */}
      {activeTab === 'REGIONAL_PORT_GUIDE' && (
        <div className="space-y-6">
          <RegionalPortGuideView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 84: REGIONAL SECURITY ALERT DASHBOARD                */}
      {/* ======================================================== */}
      {activeTab === 'REGIONAL_ALERT_DASHBOARD' && (
        <div className="space-y-6">
          <RegionalAlertDashboardView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 85: SPATIAL GEOGRAPHIC BOUNDARY FILTER TOGGLE        */}
      {/* ======================================================== */}
      {activeTab === 'GEO_FILTER_TOGGLE' && (
        <div className="space-y-6">
          <GeoFilterToggleView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 86: MARINE CONSERVATION NEWS HUB                     */}
      {/* ======================================================== */}
      {activeTab === 'MARINE_CONSERVATION_NEWS' && (
        <div className="space-y-6">
          <MarineConservationNewsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 87: PROTECTED SPECIES MIGRATION HEATMAP               */}
      {/* ======================================================== */}
      {activeTab === 'SPECIES_MIGRATION_HEATMAP' && (
        <div className="space-y-6">
          <SpeciesMigrationHeatmapView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 88: ECO-FRIENDLY VOYAGE ROUTE PLANNER                 */}
      {/* ======================================================== */}
      {activeTab === 'ECO_FRIENDLY_ROUTE_PLANNER' && (
        <div className="space-y-6">
          <EcoFriendlyRoutePlannerView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 89: INTERNATIONAL MARINE POLICY & LAW HUB             */}
      {/* ======================================================== */}
      {activeTab === 'MARINE_POLICY_HUB' && (
        <div className="space-y-6">
          <MarinePolicyHubView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 90: IMO CARBON INTENSITY (CII) & EEXI DASHBOARD       */}
      {/* ======================================================== */}
      {activeTab === 'CARBON_DASHBOARD' && (
        <div className="space-y-6">
          <CarbonDashboardView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 91: PROTECTED SPECIES REAL-TIME ALERTS                */}
      {/* ======================================================== */}
      {activeTab === 'SPECIES_ALERTS' && (
        <div className="space-y-6">
          <SpeciesAlertsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 92: INTERACTIVE MARINE POLICY AI ASSISTANT           */}
      {/* ======================================================== */}
      {activeTab === 'POLICY_AI_ASSISTANT' && (
        <div className="space-y-6">
          <PolicyAiAssistantView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 93: CONSERVATION & POLICY BOOKMARK MANAGER           */}
      {/* ======================================================== */}
      {activeTab === 'CONSERVATION_BOOKMARK' && (
        <div className="space-y-6">
          <ConservationBookmarkView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 94: GLOBAL MARINE CONSERVATION HISTORICAL TIMELINE   */}
      {/* ======================================================== */}
      {activeTab === 'CONSERVATION_TIMELINE' && (
        <div className="space-y-6">
          <ConservationTimelineView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 95: INTERACTIVE MARITIME POLICY & PROTECTED SEAS MAP */}
      {/* ======================================================== */}
      {activeTab === 'INTERACTIVE_POLICY_MAP' && (
        <div className="space-y-6">
          <InteractivePolicyMapView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 96: AI SEMANTIC POLICY & REGULATORY SEARCH ENGINE    */}
      {/* ======================================================== */}
      {activeTab === 'POLICY_AI_SEARCH' && (
        <div className="space-y-6">
          <PolicyAiSearchView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 97: BOOKMARK ANALYTICS & COMPLIANCE READINESS        */}
      {/* ======================================================== */}
      {activeTab === 'BOOKMARK_ANALYTICS' && (
        <div className="space-y-6">
          <BookmarkAnalyticsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 98: OCEANIC CLIMATE & METEOROLOGICAL MAP LEGEND GUIDE */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_MAP_LEGEND' && (
        <div className="space-y-6">
          <ClimateMapLegendView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 99: SEVERE OCEANIC CLIMATE RISK & EXTREME WEATHER ALERTS */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_ALERT' && (
        <div className="space-y-6">
          <ClimateAlertView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 100: GLOBAL MARINE BIODIVERSITY INDEX & ECOSYSTEM PORTAL */}
      {/* ======================================================== */}
      {activeTab === 'MARINE_DIVERSITY_INDEX' && (
        <div className="space-y-6">
          <MarineDiversityIndexView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 101: WILDLIFE MIGRATION PATH & VESSEL AVOIDANCE VISUALIZER */}
      {/* ======================================================== */}
      {activeTab === 'MIGRATION_PATH_VISUALIZER' && (
        <div className="space-y-6">
          <MigrationPathVisualizerView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 102: PORT EMERGENCY PLAN & ISPS CRISIS PROTOCOL      */}
      {/* ======================================================== */}
      {activeTab === 'PORT_EMERGENCY_PLAN' && (
        <div className="space-y-6">
          <PortEmergencyPlanView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 103: CLIMATE TREND INSIGHT & MULTI-YEAR TELEMETRY    */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_TREND_INSIGHT' && (
        <div className="space-y-6">
          <ClimateTrendInsightView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 104: SMART REAL-TIME MULTI-HAZARD ALERT SORTING      */}
      {/* ======================================================== */}
      {activeTab === 'SMART_ALERT_SORTING' && (
        <div className="space-y-6">
          <SmartAlertSortingView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 105: MULTI-EPOCH HISTORICAL CLIMATE COMPARISON      */}
      {/* ======================================================== */}
      {activeTab === 'HISTORICAL_CLIMATE_COMPARISON' && (
        <div className="space-y-6">
          <HistoricalClimateComparisonView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 106: REAL-TIME PORT WEATHER OVERLAY RADAR             */}
      {/* ======================================================== */}
      {activeTab === 'PORT_WEATHER_OVERLAY' && (
        <div className="space-y-6">
          <PortWeatherOverlayView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 107: CLIMATE & OCEANOGRAPHIC DATA EXPORTER            */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_DATA_EXPORT' && (
        <div className="space-y-6">
          <ClimateDataExportView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 108: REGIONAL ALERT NOISE OPTIMIZER ENGINE          */}
      {/* ======================================================== */}
      {activeTab === 'OPTIMIZER_REGIONAL_ALERT' && (
        <div className="space-y-6">
          <OptimizerRegionalAlertView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 109: LOCAL COASTAL & DEEPWATER FLORA & FAUNA GUIDE  */}
      {/* ======================================================== */}
      {activeTab === 'LOCAL_FLORA_FAUNA' && (
        <div className="space-y-6">
          <LocalFloraFaunaView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 110: OCEAN CLIMATE & DECARBONIZATION KNOWLEDGE WIKI */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_WIKI' && (
        <div className="space-y-6">
          <ClimateWikiView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 111: EXECUTIVE REAL-TIME HAZARD ALERT SUMMARIES     */}
      {/* ======================================================== */}
      {activeTab === 'ALERT_SUMMARIES' && (
        <div className="space-y-6">
          <AlertSummariesView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 112: MULTI-DECADE CLIMATE TRENDLINE ENGINE          */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_TRENDLINE' && (
        <div className="space-y-6">
          <ClimateTrendlineView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 113: GEOSPATIAL CLIMATE IMPACT PREDICTION MAP        */}
      {/* ======================================================== */}
      {activeTab === 'IMPACT_PREDICTION_MAP' && (
        <div className="space-y-6">
          <ImpactPredictionMapView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 114: SIDE-BY-SIDE CLIMATE & CO2 DATA COMPARATOR     */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_DATA_COMPARE' && (
        <div className="space-y-6">
          <ClimateDataCompareView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 115: EXECUTIVE CLIMATE & IMO COMPLIANCE PDF REPORT  */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_REPORT_PDF' && (
        <div className="space-y-6">
          <ClimateReportPdfView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 116: INTEGRATED MARINE OCEAN CLIMATE DASHBOARD       */}
      {/* ======================================================== */}
      {activeTab === 'MARINE_CLIMATE_DASHBOARD' && (
        <div className="space-y-6">
          <MarineClimateDashboardView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 117: MODULAR BRIDGE CLIMATE ALERT WIDGETS            */}
      {/* ======================================================== */}
      {activeTab === 'CLIMATE_ALERT_WIDGETS' && (
        <div className="space-y-6">
          <ClimateAlertWidgetsView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 118: AUTOMATED SENSOR & NAVIGATION DATA ANOMALY ALERT */}
      {/* ======================================================== */}
      {activeTab === 'DATA_ANOMALY_ALERT' && (
        <div className="space-y-6">
          <DataAnomalyAlertView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 119: INTERACTIVE CLIMATE RISK SCENARIOS SIMULATION  */}
      {/* ======================================================== */}
      {activeTab === 'SCENARIOS_SIMULATION' && (
        <div className="space-y-6">
          <ScenariosSimulationView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 120: BRIDGE & COMMAND EXECUTIVE DATA EXPORT SUITE    */}
      {/* ======================================================== */}
      {activeTab === 'EXPORT_DATA_BUTTON' && (
        <div className="space-y-6">
          <ExportDataButtonView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 80: SHIP LOCATION HIGH-PRECISION DGPS TRACKER         */}
      {/* ======================================================== */}
      {activeTab === 'SHIP_LOCATION_GPS_TRACKER' && (
        <div className="space-y-6">
          <ShipLocationGpsTrackerView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 50: LOW-BANDWIDTH OFFLINE MAP VECTOR TILE SYNC       */}
      {/* ======================================================== */}
      {activeTab === 'OFFLINE_MAP_SYNC' && (
        <div className="space-y-6">
          <OfflineMapSyncView />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 17: PIRACY DATA EXPORTER                              */}
      {/* ======================================================== */}
      {activeTab === 'DATA_EXPORT' && (
        <div className="space-y-6">
          <PiracyDataExportTool />
        </div>
      )}

      {/* AR Help Overlay Modal */}
      <ARHelpOverlayModal
        isOpen={isArHelpModalOpen}
        onClose={() => setIsArHelpModalOpen(false)}
      />
    </div>
  );
};

export default MarinePiracyAlertView;
