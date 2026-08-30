import React, { useState, useEffect, useRef } from 'react';
import { Navbar, NavTabType } from './components/Navbar';
import { DebugConsole } from './components/DebugConsole';
import { OtherDomainLinksModal } from './components/OtherDomainLinksModal';
import { HomePageView } from './components/HomePageView';
import { CloudStructuredDashboardView } from './components/CloudStructuredDashboardView';
import { ClimateWatchView } from './components/ClimateWatchView';
import { LiveRouteRadarView } from './components/LiveRouteRadarView';
import { MaritimeUtilitiesView } from './components/MaritimeUtilitiesView';
import { CruiseTimetable } from './components/CruiseTimetable';
import { SouthAsiaNationsView } from './components/SouthAsiaNationsView';
import { AIVoiceTextChatbot } from './components/AIVoiceTextChatbot';
import { SeafarerRescueTelecomView } from './components/SeafarerRescueTelecomView';
import { MarineConverterTranslatorView } from './components/MarineConverterTranslatorView';
import { MarineJobsAndTrainingView } from './components/MarineJobsAndTrainingView';
import { FisheriesAndSeaHubView } from './components/FisheriesAndSeaHubView';
import { MarineTourismBookingInsuranceView } from './components/MarineTourismBookingInsuranceView';
import { VisualTideAnalytics } from './components/VisualTideAnalytics';
import { SearchGroundingView } from './components/SearchGroundingView';
import { MarineFuelTracker } from './components/MarineFuelTracker';
import { VesselPathOptimizer } from './components/VesselPathOptimizer';
import { InteractiveMapOverlay } from './components/InteractiveMapOverlay';
import { PortEntryChecklist } from './components/PortEntryChecklist';
import { WeatherAlertMonitor } from './components/WeatherAlertMonitor';
import { MarinePiracyAlertView } from './components/MarinePiracyAlertView';
import { NauticalChartView } from './components/NauticalChartView';
import { VesselsAISTrackerView } from './components/VesselsAISTrackerView';
import { FuelAnalyticsGraphView } from './components/FuelAnalyticsGraphView';
import { SmartAnchorWatchView } from './components/SmartAnchorWatchView';
import { PortTrafficForecastView } from './components/PortTrafficForecastView';
import { MarineLogbookView } from './components/MarineLogbookView';
import { CollisionAvoidanceView } from './components/CollisionAvoidanceView';
import { OceanSoundscapesView } from './components/OceanSoundscapesView';
import { CaptainQuickNotesView } from './components/CaptainQuickNotesView';
import { MarineHealthMapView } from './components/MarineHealthMapView';
import { CrewWelfarePortalView } from './components/CrewWelfarePortalView';
import { EmergencyDrillPlannerView } from './components/EmergencyDrillPlannerView';
import { MarineWeatherApiView } from './components/MarineWeatherApiView';
import { OfflinePwaSupportView } from './components/OfflinePwaSupportView';
import { MarineArView } from './components/MarineArView';
import { LocationTrackerDigitalNavRadioView } from './components/LocationTrackerDigitalNavRadioView';
import { CommercialCorridorsView } from './components/CommercialCorridorsView';
import { PortToPortDistanceView } from './components/PortToPortDistanceView';
import { MarineUtilitiesView } from './components/MarineUtilitiesView';
import { SmartFleetAnalyticsView } from './components/SmartFleetAnalyticsView';
import { GeofenceNotificationView } from './components/GeofenceNotificationView';
import { DigitalCargoSignatureView } from './components/DigitalCargoSignatureView';
import { SafetyBriefingToolView } from './components/SafetyBriefingToolView';
import { WeatherImpactMapView } from './components/WeatherImpactMapView';
import { SmartFuelOptimizerView } from './components/SmartFuelOptimizerView';
import { VoyageCarbonOffsetView } from './components/VoyageCarbonOffsetView';
import { EmergencyArOverlayView } from './components/EmergencyArOverlayView';
import { OfflineSyncStatusView } from './components/OfflineSyncStatusView';
import { AirwaysPassengerPortal } from './components/AirwaysPassengerPortal';
import { AirwaysCargoPortal } from './components/AirwaysCargoPortal';
import { AirwaysBookingAndFlightTracker } from './components/AirwaysBookingAndFlightTracker';
import { CruisePassengerPortal } from './components/CruisePassengerPortal';
import { MarineCargoPortal } from './components/MarineCargoPortal';
import { GlobalFleetMapView } from './components/GlobalFleetMapView';
import { GlobalFleetLocationTracker } from './components/GlobalFleetLocationTracker';
import { GlobalJobAlertsPortal } from './components/GlobalJobAlertsPortal';
import { OnlineVisaApplicationPortal } from './components/OnlineVisaApplicationPortal';
import { OnlinePaymentGatewayPortal } from './components/OnlinePaymentGatewayPortal';
import { DigitalBookingManagerView } from './components/DigitalBookingManagerView';
import { HotelBookingPortal } from './components/HotelBookingPortal';
import { VesselArrivalNotificationsView } from './components/VesselArrivalNotificationsView';
import { InteractiveSosLocatorView } from './components/InteractiveSosLocatorView';
import { PortAccessibilityView } from './components/PortAccessibilityView';
import { BookingCalendarView } from './components/BookingCalendarView';
import { WeatherTimelineAndPortTrendsView } from './components/WeatherTimelineAndPortTrendsView';
import { BiometricLoginModal } from './components/BiometricLoginModal';
import { OfflineMapsManager } from './components/OfflineMapsManager';
import { DarkModeAnalyticsView } from './components/DarkModeAnalyticsView';
import { FleetReportGenerator } from './components/FleetReportGenerator';
import { MultiLanguagePortal } from './components/MultiLanguagePortal';
import { PerformanceDashboardView } from './components/PerformanceDashboardView';
import { AutomatedBackupManager } from './components/AutomatedBackupManager';
import { MaritimeNewsFeedView } from './components/MaritimeNewsFeedView';
import { PredictiveMaintenanceView } from './components/PredictiveMaintenanceView';
import { VoiceActivatedCommandsView } from './components/VoiceActivatedCommandsView';
import { UserFeedbackPortalView } from './components/UserFeedbackPortalView';
import { GlobalTsunamiEarthquakeWarningView } from './components/GlobalTsunamiEarthquakeWarningView';
import { PublicUtilityIntegrationPortalView } from './components/PublicUtilityIntegrationPortalView';
import { MasterClaudeSystemView } from './components/MasterClaudeSystemView';
import { VesselsHealthLogsView } from './components/VesselsHealthLogsView';
import { InteractiveTourGuideView } from './components/InteractiveTourGuideView';
import { SmartSupplyChainDashboardView } from './components/SmartSupplyChainDashboardView';
import { CrisisSimulationEngineView } from './components/CrisisSimulationEngineView';
import { IndustryAuthBridgeView } from './components/IndustryAuthBridgeView';
import { GlobalUtilityForecastView } from './components/GlobalUtilityForecastView';
import { MultiModelAnalyticsView } from './components/MultiModelAnalyticsView';
import { TripPlannerView } from './components/TripPlannerView';
import { LoyaltyRewardsPortalView } from './components/LoyaltyRewardsPortalView';
import { DigitalPassportPortalView } from './components/DigitalPassportPortalView';
import { AppStoreReleaseManagerView } from './components/AppStoreReleaseManagerView';
import { AppLicenseManagerView } from './components/AppLicenseManagerView';
import { AppOwnershipCertificateView } from './components/AppOwnershipCertificateView';
import { CrewCertificationTrackerView } from './components/CrewCertificationTrackerView';
import { PortDroneSupportView } from './components/PortDroneSupportView';
import { PublicCitizenParticipantPortalView } from './components/PublicCitizenParticipantPortalView';
import { PortCommercialShoppingExhibitionView } from './components/PortCommercialShoppingExhibitionView';
import { MarineImagesGalleryView } from './components/MarineImagesGalleryView';
import { AppSubscriptionPortalView } from './components/AppSubscriptionPortalView';
import { AppDownloadAndSubscribePortal } from './components/AppDownloadAndSubscribePortal';
import { SuperMasterCyberDefenseSquadView } from './components/SuperMasterCyberDefenseSquadView';
import { ViewModeSwitchBar } from './components/ViewModeSwitchBar';
import { AndroidDeviceContainer } from './components/AndroidDeviceContainer';
import { MaritimeESGReportView } from './components/MaritimeESGReportView';
import { OceanGamingLotteryPortalView } from './components/OceanGamingLotteryPortalView';
import { StocksSharesBondsPortalView } from './components/StocksSharesBondsPortalView';
import { DeploymentGuideView } from './components/DeploymentGuideView';
import { HealthHubAndVaccinationPortal } from './components/HealthHubAndVaccinationPortal';
import { VesselsCyberSecCheckView } from './components/VesselsCyberSecCheckView';
import { CyberAntivirusFraudSecurityView } from './components/CyberAntivirusFraudSecurityView';
import { HardwareRepairWizardView } from './components/HardwareRepairWizardView';
import { RealtimeDisasterToast } from './components/RealtimeDisasterToast';
import { PortAuthorityChatbotView } from './components/PortAuthorityChatbotView';
import { SupplyChainDelayTrackerView } from './components/SupplyChainDelayTrackerView';
import { PredictiveAlertHistoryView } from './components/PredictiveAlertHistoryView';
import { AutomatedRegulationCheckView } from './components/AutomatedRegulationCheckView';
import { AnimatedDashboardView } from './components/AnimatedDashboardView';
import { QrCheckInView } from './components/QrCheckInView';
import { SmartLoadPlannerView } from './components/SmartLoadPlannerView';
import { InteractivePortMapView } from './components/InteractivePortMapView';
import { EmergencySosPulseView } from './components/EmergencySosPulseView';
import { GlobalFleetChartView } from './components/GlobalFleetChartView';
import { TroubleshooterSuperMasterAgentView } from './components/TroubleshooterSuperMasterAgentView';
import { SuperMasterAiEvaluatorView } from './components/SuperMasterAiEvaluatorView';
import { PredictiveEfficiencyDashboard } from './components/PredictiveEfficiencyDashboard';
import { AutomatedMaintenanceManagementPerformanceSuperAgentView } from './components/AutomatedMaintenanceManagementPerformanceSuperAgentView';
import { MaritimeSocialMediaPortalView } from './components/MaritimeSocialMediaPortalView';
import { SmartOceanCleanUpView } from './components/SmartOceanCleanUpView';
import { PortCarbonGaugeView } from './components/PortCarbonGaugeView';
import { OfflineSyncAlertView } from './components/OfflineSyncAlertView';
import { VesselsHealthPulseView } from './components/VesselsHealthPulseView';
import { SmartSearchModal } from './components/SmartSearchModal';
import { HapticPulseController } from './components/HapticPulseController';
import { ChromeBrowserDiagnosticModal } from './components/ChromeBrowserDiagnosticModal';
import { Footer } from './components/Footer';
import { VesselEfficiencyChartPortal } from './components/VesselEfficiencyChartPortal';
import { SuperMasterDarkWebAndCyberShieldAgent } from './components/SuperMasterDarkWebAndCyberShieldAgent';
import { OceanPlasticRadarPortal } from './components/OceanPlasticRadarPortal';
import { OceanEnvironmentLibraryPortal } from './components/OceanEnvironmentLibraryPortal';
import { OceanMiningEngineeringPortalView } from './components/OceanMiningEngineeringPortalView';
import { GlobalPwaDocsView } from './components/GlobalPwaDocsView';
import { SearchIndexingPortalView } from './components/SearchIndexingPortalView';
import { AppStatusPortalView } from './components/AppStatusPortalView';
import { DeepLinkingSetupView } from './components/DeepLinkingSetupView';
import { QrGeneratorStudio } from './components/QrGeneratorStudio';
import { RatingSystemView } from './components/RatingSystemView';
import { EventPushManagerView } from './components/EventPushManagerView';
import { VirtualTourExplorerView } from './components/VirtualTourExplorerView';
import { OceanDollarWalletsView } from './components/OceanDollarWalletsView';
import { OptimizedAuthFlowView } from './components/OptimizedAuthFlowView';
import { StakingRoiChartsView } from './components/StakingRoiChartsView';
import { OfflineSyncManagerView } from './components/OfflineSyncManagerView';
import { OceanDollarFaqView } from './components/OceanDollarFaqView';
import { AssetAuditTrailView } from './components/AssetAuditTrailView';
import { CurrencyVisualizerView } from './components/CurrencyVisualizerView';
import { VaultSecurityTipsView } from './components/VaultSecurityTipsView';
import { CurrencyExportToolView } from './components/CurrencyExportToolView';
import { OceanDollarStakingView } from './components/OceanDollarStakingView';
import { MarineCurrencyHistoryView } from './components/MarineCurrencyHistoryView';
import { CurrencySecurityTipsView } from './components/CurrencySecurityTipsView';
import { OceanDollarDaoGovernancePortalView } from './components/OceanDollarDaoGovernancePortalView';
import { CryptoCalculatorView } from './components/CryptoCalculatorView';
import { DeveloperRevenueWhitepaperView } from './components/DeveloperRevenueWhitepaperView';
import { OceanDesalinationAndResearchPortalView } from './components/OceanDesalinationAndResearchPortalView';
import { ToastContainer, ToastItem } from './components/ToastContainer';
import { REGIONAL_CLIMATE_ALERTS } from './data/southAsiaData';
import { ClimateAlert } from './types';

// Sample pool of simulated severe weather alerts for dynamic changes
const DYNAMIC_SEVERE_WEATHER_POOL: Omit<ClimateAlert, 'id' | 'timestamp'>[] = [
  {
    region: 'North Bay of Bengal & Sundarbans',
    severity: 'Critical',
    category: 'Cyclone',
    title: 'Super Severe Tropical Cyclone Advisory (Cat 3)',
    description: 'Rapidly intensifying cyclonic vortex generating gale winds above 55 knots and storm surge waves over 4.5 meters. Vessel transit suspended.',
    affectedPorts: ['Chittagong', 'Mongla', 'Kolkata']
  },
  {
    region: 'Central Arabian Sea & Konkan Coast',
    severity: 'Warning',
    category: 'Marine Swell',
    title: 'Heavy Ocean Swell & Gale Force Squall Warning',
    description: 'Deep monsoonal trough driving sustained 35-knot gust lines and steep rough swells across Mumbai outer anchorages.',
    affectedPorts: ['Mumbai', 'Mormugao (Goa)', 'Karachi']
  },
  {
    region: 'Southern Sri Lanka & Dondra Shipping Pass',
    severity: 'Critical',
    category: 'Monsoon',
    title: 'Sudden Monsoon Squall Line & Sea State Surge',
    description: 'Severe squall front moving through Dondra Head traffic separation scheme. Wave heights spiking to 3.8m with heavy sea spray.',
    affectedPorts: ['Galle Harbour', 'Colombo Harbour']
  },
  {
    region: 'Malacca Strait Entrance & Phuket',
    severity: 'Warning',
    category: 'Flood Alert',
    title: 'Tropical Squall & High Coastal Surge Warning',
    description: 'Heavy precipitation squalls reducing nautical visibility below 2.5 NM with high tide coastal surges along western approaches.',
    affectedPorts: ['Port Klang', 'Penang Port', 'Phuket']
  },
  {
    region: 'Laccadive Sea & One and Half Degree Channel',
    severity: 'Advisory',
    category: 'Marine Swell',
    title: 'Inter-Island Swell & Coral Atoll High Rollers',
    description: 'Long-period ocean swells reaching 2.4 meters. Passenger ferries and small craft advised to exercise extreme caution in shallow passes.',
    affectedPorts: ['Malé Commercial Port', 'Kochi Port']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('home');
  const [initialRouteId, setInitialRouteId] = useState<string>('india-national');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isOfflineCacheActive, setIsOfflineCacheActive] = useState<boolean>(true);
  const [isAmbientMode, setIsAmbientMode] = useState<boolean>(false);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isHapticModalOpen, setIsHapticModalOpen] = useState<boolean>(false);
  const [isChromeModalOpen, setIsChromeModalOpen] = useState<boolean>(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState<boolean>(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'android'>('desktop');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  // Severe Climate Alerts State & Toast Notification Engine
  const [climateAlerts, setClimateAlerts] = useState<ClimateAlert[]>(REGIONAL_CLIMATE_ALERTS);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isSimulatingFeeder, setIsSimulatingFeeder] = useState<boolean>(true);
  const prevAlertsJsonRef = useRef<string>('');

  // Handle initial deep-linking from URL query parameters (e.g. ?tab=climate&alertId=GCA-ATL-01)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const alertIdParam = params.get('alertId') || params.get('alert') || params.get('event');
    if (alertIdParam || tabParam === 'climate') {
      setActiveTab('climate');
    } else if (tabParam) {
      setActiveTab(tabParam as NavTabType);
    }
  }, []);
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 8000);
    return () => clearTimeout(timer);
  }, [toasts]);

  // Listen to changes in REGIONAL_CLIMATE_ALERTS / climateAlerts
  useEffect(() => {
    const currentJson = JSON.stringify(climateAlerts);

    if (!prevAlertsJsonRef.current) {
      // First load: Trigger initial toast for top critical alert to inform user
      const criticalAlert = climateAlerts.find((a) => a.severity === 'Critical') || climateAlerts[0];
      if (criticalAlert) {
        const initialToast: ToastItem = {
          id: `toast-init-${Date.now()}`,
          alert: criticalAlert,
          createdAt: new Date().toLocaleTimeString(),
          type: 'critical'
        };
        setToasts([initialToast]);
      }
      prevAlertsJsonRef.current = currentJson;
      return;
    }

    if (prevAlertsJsonRef.current !== currentJson) {
      // Data changed! Identify the latest changed/added alert
      const latestAlert = climateAlerts[0];
      if (latestAlert) {
        const newToast: ToastItem = {
          id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          alert: latestAlert,
          createdAt: new Date().toLocaleTimeString(),
          type: latestAlert.severity === 'Critical' ? 'critical' : 'updated'
        };
        setToasts((prev) => [newToast, ...prev].slice(0, 4)); // Max 4 visible toasts
      }
      prevAlertsJsonRef.current = currentJson;
    }
  }, [climateAlerts]);

  // Live simulation trigger function
  const handleSimulateAlertChange = () => {
    const randomTemplate = DYNAMIC_SEVERE_WEATHER_POOL[Math.floor(Math.random() * DYNAMIC_SEVERE_WEATHER_POOL.length)];
    const timeNow = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';

    const newAlert: ClimateAlert = {
      id: `ALT-SIM-${Date.now()}`,
      region: randomTemplate.region,
      severity: randomTemplate.severity as any,
      category: randomTemplate.category as any,
      title: randomTemplate.title,
      description: randomTemplate.description,
      timestamp: timeNow,
      affectedPorts: randomTemplate.affectedPorts
    };

    setClimateAlerts((prev) => [newAlert, ...prev]);
  };

  // Periodic automatic weather data feeder simulation
  useEffect(() => {
    let interval: any;
    if (isSimulatingFeeder) {
      interval = setInterval(() => {
        handleSimulateAlertChange();
      }, 18000); // Trigger every 18s
    }
    return () => clearInterval(interval);
  }, [isSimulatingFeeder]);

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleViewAlertDetails = (alert: ClimateAlert) => {
    setActiveTab('climate');
    // Remove viewed toast
    setToasts((prev) => prev.filter((t) => t.alert.id !== alert.id));
  };

  const handleOpenRouteRadar = (routeId?: string) => {
    if (routeId) {
      setInitialRouteId(routeId);
    }
    setActiveTab('route-radar');
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative ${
        isDarkMode
          ? 'bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950'
          : 'bg-slate-100 text-slate-900 selection:bg-sky-500 selection:text-white'
      }`}
    >
      {/* Toast Notification System Component */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
        onViewAlert={handleViewAlertDetails}
        onSimulateAlertChange={handleSimulateAlertChange}
        isSimulating={isSimulatingFeeder}
        onToggleSimulation={() => setIsSimulatingFeeder(!isSimulatingFeeder)}
      />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeAlertCount={climateAlerts.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isOfflineCacheActive={isOfflineCacheActive}
        onToggleOfflineCache={() => setIsOfflineCacheActive(!isOfflineCacheActive)}
        isAmbientMode={isAmbientMode}
        onToggleAmbientMode={() => setIsAmbientMode(!isAmbientMode)}
        onOpenBiometricLogin={() => setIsBiometricModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenHapticSettings={() => setIsHapticModalOpen(true)}
        onOpenChromeHelp={() => setIsChromeModalOpen(true)}
        onOpenDomainLinks={() => setIsDomainModalOpen(true)}
      />

      {/* Global Desktop vs Android Mobile View Mode Switcher */}
      <ViewModeSwitchBar
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        orientation={orientation}
        setOrientation={setOrientation}
      />

      {/* Red Ambient Night Vision Bridge Glow Overlay */}
      {isAmbientMode && (
        <div className="fixed inset-0 pointer-events-none bg-rose-950/20 mix-blend-color-burn z-30 ring-8 ring-rose-500/10 transition-all duration-700" />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 xl:pb-8">
        {activeTab === 'ocean-mining-engineering' && <OceanMiningEngineeringPortalView />}
        {activeTab === 'ocean-environment-library' && <OceanEnvironmentLibraryPortal />}
        {activeTab === 'ocean-plastic-radar' && <OceanPlasticRadarPortal />}
        {activeTab === 'vessels-efficiency-chart' && <VesselEfficiencyChartPortal />}
        {activeTab === 'super-master-dark-web-cyber-shield' && <SuperMasterDarkWebAndCyberShieldAgent />}
        {activeTab === 'app-subscription-portal' && <AppDownloadAndSubscribePortal />}
        {activeTab === 'super-master-cyber-defense-squad' && <SuperMasterCyberDefenseSquadView />}
        {activeTab === 'public-citizen-portal' && <PublicCitizenParticipantPortalView />}
        {activeTab === 'port-commercial-hub' && (
          <PortCommercialShoppingExhibitionView
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'marine-images-gallery' && (
          <MarineImagesGalleryView
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'super-master-ai-evaluator' && <SuperMasterAiEvaluatorView />}
        {activeTab === 'home' && (
          <HomePageView
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenSearch={() => setIsSearchModalOpen(true)}
          />
        )}
        {activeTab === 'deployment-guide' && <DeploymentGuideView />}
        {activeTab === 'ocean-gaming-lottery' && <OceanGamingLotteryPortalView />}
        {activeTab === 'stocks-shares-bonds' && <StocksSharesBondsPortalView />}
        {activeTab === 'business-banking' && <StocksSharesBondsPortalView initialTab="BUSINESS_BANKING_PORTAL" />}
        {activeTab === 'investment-analytics' && <StocksSharesBondsPortalView initialTab="INVESTMENT_ANALYTICS" />}
        {activeTab === 'medical-hub' && <HealthHubAndVaccinationPortal />}
        {activeTab === 'predictive-efficiency-dashboard' && <PredictiveEfficiencyDashboard />}
        {activeTab === 'automated-maintenance-performance-super-agent' && <AutomatedMaintenanceManagementPerformanceSuperAgentView />}
        {activeTab === 'maritime-social-portal' && <MaritimeSocialMediaPortalView />}
        {activeTab === 'troubleshooter-super-master-agent' && <TroubleshooterSuperMasterAgentView />}
        {activeTab === 'smart-ocean-cleanup' && <SmartOceanCleanUpView />}
        {activeTab === 'maritime-ar-view' && <MarineArView />}
        {activeTab === 'port-carbon-gauge' && <PortCarbonGaugeView />}
        {activeTab === 'offline-sync-alert' && <OfflineSyncAlertView />}
        {activeTab === 'vessels-health-pulse' && <VesselsHealthPulseView />}
        {activeTab === 'global-fleet-chart' && <GlobalFleetChartView />}
        {activeTab === 'animated-dashboard' && (
          <AnimatedDashboardView onNavigateTab={(tabId) => setActiveTab(tabId as any)} />
        )}
        {activeTab === 'qr-check-in' && <QrCheckInView />}
        {activeTab === 'smart-load-planner' && <SmartLoadPlannerView />}
        {activeTab === 'interactive-port-map' && <InteractivePortMapView />}
        {activeTab === 'emergency-sos-pulse' && <EmergencySosPulseView />}
        {activeTab === 'smart-supply-chain' && <SmartSupplyChainDashboardView />}
        {activeTab === 'crisis-simulation' && <CrisisSimulationEngineView />}
        {activeTab === 'industry-auth-bridge' && <IndustryAuthBridgeView />}
        {activeTab === 'global-utility-forecast' && <GlobalUtilityForecastView />}
        {activeTab === 'multi-model-analytics' && <MultiModelAnalyticsView />}
        {activeTab === 'predictive-alert-history' && <PredictiveAlertHistoryView />}
        {activeTab === 'automated-regulation-check' && <AutomatedRegulationCheckView />}
        {activeTab === 'cloud-dashboard' && (
          <CloudStructuredDashboardView
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
            activeAlertCount={climateAlerts.length}
            isOfflineCacheActive={isOfflineCacheActive}
          />
        )}
        {activeTab === 'master-claude' && <MasterClaudeSystemView />}
        {activeTab === 'global-fleet-map' && (
          <GlobalFleetMapView onSelectUnitForDetail={() => setActiveTab('global-fleet-tracker')} />
        )}
        {activeTab === 'global-fleet-tracker' && <GlobalFleetLocationTracker />}
        {activeTab === 'global-job-alerts' && <GlobalJobAlertsPortal />}
        {activeTab === 'airways-jobs-portal' && <GlobalJobAlertsPortal initialPortalTab="jobs_requirements" initialSector="airways" />}
        {activeTab === 'airways-training-institutes' && <GlobalJobAlertsPortal initialPortalTab="educational_institutes" initialSector="airways" />}
        {activeTab === 'marine-jobs-portal' && <GlobalJobAlertsPortal initialPortalTab="jobs_requirements" initialSector="cruise_marine" />}
        {activeTab === 'marine-training-institutes' && <GlobalJobAlertsPortal initialPortalTab="educational_institutes" initialSector="cruise_marine" />}
        {activeTab === 'trip-planner' && <TripPlannerView />}
        {activeTab === 'loyalty-rewards' && <LoyaltyRewardsPortalView />}
        {activeTab === 'multi-model-stats' && <MultiModelAnalyticsView />}
        {activeTab === 'digital-passport' && <DigitalPassportPortalView />}
        {activeTab === 'app-store-release' && <AppStoreReleaseManagerView />}
        {activeTab === 'app-licence-issuer' && <AppLicenseManagerView />}
        {activeTab === 'app-ownership-deed' && <AppOwnershipCertificateView />}
        {activeTab === 'crew-certification' && <CrewCertificationTrackerView />}
        {activeTab === 'port-drone-support' && <PortDroneSupportView />}
        {activeTab === 'maritime-esg-report' && <MaritimeESGReportView />}
        {activeTab === 'vessels-cybersec' && <VesselsCyberSecCheckView />}
        {activeTab === 'cyber-antivirus-security' && <CyberAntivirusFraudSecurityView />}
        {activeTab === 'hardware-repair-wizard' && <HardwareRepairWizardView />}
        {activeTab === 'port-authority-chatbot' && <PortAuthorityChatbotView />}
        {activeTab === 'supply-chain-delays' && <SupplyChainDelayTrackerView />}
        {(activeTab === 'online-visa-application' || activeTab === 'e-visa-application' || activeTab === 'physical-visa-application') && <OnlineVisaApplicationPortal />}
        {activeTab === 'online-payment-gateway' && <OnlinePaymentGatewayPortal />}
        {activeTab === 'digital-booking-manager' && <DigitalBookingManagerView />}
        {activeTab === 'hotel-booking-portal' && <HotelBookingPortal />}
        {activeTab === 'vessel-arrival-notifications' && <VesselArrivalNotificationsView />}
        {activeTab === 'interactive-sos-locator' && <InteractiveSosLocatorView />}
        {activeTab === 'port-accessibility' && <PortAccessibilityView />}
        {activeTab === 'booking-calendar' && <BookingCalendarView />}
        {activeTab === 'weather-timeline-trends' && <WeatherTimelineAndPortTrendsView />}
        {activeTab === 'airways-passenger' && <AirwaysPassengerPortal />}
        {activeTab === 'airways-passenger-domestic' && <AirwaysPassengerPortal initialScope="Domestic" />}
        {activeTab === 'airways-passenger-international' && <AirwaysPassengerPortal initialScope="International" />}
        {activeTab === 'airways-cargo' && <AirwaysCargoPortal />}
        {activeTab === 'airways-tracking' && <AirwaysBookingAndFlightTracker />}
        {activeTab === 'cruise-passenger' && <CruisePassengerPortal />}
        {activeTab === 'marine-passenger-domestic' && <CruisePassengerPortal initialScope="Domestic Coastal India" />}
        {activeTab === 'marine-passenger-international' && <CruisePassengerPortal initialScope="International Oceanic" />}
        {activeTab === 'marine-cargo' && <MarineCargoPortal />}
        {activeTab === 'vessels-gps-tracker' && <VesselsAISTrackerView />}
        {activeTab === 'offline-maps' && <OfflineMapsManager />}
        {activeTab === 'dark-mode-analytics' && <DarkModeAnalyticsView />}
        {activeTab === 'fleet-reports' && <FleetReportGenerator />}
        {activeTab === 'multi-language' && <MultiLanguagePortal />}
        {activeTab === 'performance-dashboard' && <PerformanceDashboardView />}
        {activeTab === 'automated-backup' && <AutomatedBackupManager />}
        {activeTab === 'maritime-news' && <MaritimeNewsFeedView />}
        {activeTab === 'predictive-maintenance' && <PredictiveMaintenanceView />}
        {activeTab === 'voice-activated-command' && (
          <VoiceActivatedCommandsView
            onExecuteAction={(actionId) => {
              if (actionId === 'toggle-night') setIsAmbientMode(!isAmbientMode);
              if (actionId === 'open-maps') setActiveTab('offline-maps');
              if (actionId === 'fleet-report') setActiveTab('fleet-reports');
              if (actionId === 'emergency') setActiveTab('emergency-ar-overlay');
              if (actionId === 'engine-status') setActiveTab('vessels-health-logs');
            }}
          />
        )}
        {activeTab === 'vessels-health-logs' && <VesselsHealthLogsView />}
        {activeTab === 'interactive-tour-guide' && (
          <InteractiveTourGuideView
            onNavigateToTab={(tabId) => setActiveTab(tabId as NavTabType)}
          />
        )}
        {activeTab === 'user-feedback-portal' && <UserFeedbackPortalView />}
        {activeTab === 'tsunami-earthquake-warning' && <GlobalTsunamiEarthquakeWarningView />}
        {activeTab === 'public-utility-integration' && <PublicUtilityIntegrationPortalView />}
        {activeTab === 'smart-fuel-optimizer' && <SmartFuelOptimizerView />}
        {activeTab === 'voyage-carbon-offset' && <VoyageCarbonOffsetView />}
        {activeTab === 'emergency-ar-overlay' && <EmergencyArOverlayView />}
        {activeTab === 'offline-sync-status' && <OfflineSyncStatusView />}
        {activeTab === 'smart-fleet-analytics' && <SmartFleetAnalyticsView />}
        {activeTab === 'geofence-notification' && <GeofenceNotificationView />}
        {activeTab === 'digital-cargo-signature' && <DigitalCargoSignatureView />}
        {activeTab === 'safety-briefing' && <SafetyBriefingToolView />}
        {activeTab === 'weather-impact-map' && <WeatherImpactMapView />}
        {activeTab === 'marine-utilities' && <MarineUtilitiesView />}
        {activeTab === 'port-distance' && <PortToPortDistanceView />}
        {activeTab === 'commercial-corridors' && <CommercialCorridorsView />}
        {activeTab === 'location-nav-radio' && <LocationTrackerDigitalNavRadioView />}
        {activeTab === 'marine-weather-api' && <MarineWeatherApiView />}
        {activeTab === 'pwa-support' && <OfflinePwaSupportView />}
        {activeTab === 'global-pwa-docs' && <GlobalPwaDocsView />}
        {activeTab === 'search-indexing-portal' && <SearchIndexingPortalView />}
        {activeTab === 'app-status-portal' && <AppStatusPortalView />}
        {activeTab === 'deep-linking-setup' && (
          <DeepLinkingSetupView
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
          />
        )}
        {activeTab === 'qr-code-generator' && <QrGeneratorStudio />}
        {activeTab === 'rating-system' && <RatingSystemView />}
        {activeTab === 'event-push-system' && <EventPushManagerView />}
        {activeTab === 'virtual-tour-360' && <VirtualTourExplorerView />}
        {activeTab === 'ocean-dollar-wallets' && <OceanDollarWalletsView />}
        {activeTab === 'optimized-auth-flow' && <OptimizedAuthFlowView />}
        {activeTab === 'staking-roi-charts' && <StakingRoiChartsView />}
        {activeTab === 'offline-sync-manager' && <OfflineSyncManagerView />}
        {activeTab === 'maritime-news-feed' && <MaritimeNewsFeedView />}
        {activeTab === 'ocean-dollar-faq' && <OceanDollarFaqView />}
        {activeTab === 'asset-audit-trail' && <AssetAuditTrailView />}
        {activeTab === 'currency-visualizer' && <CurrencyVisualizerView />}
        {activeTab === 'vault-security-tips' && <VaultSecurityTipsView />}
        {activeTab === 'currency-export-tool' && <CurrencyExportToolView />}
        {activeTab === 'ocean-dollar-staking' && <OceanDollarStakingView />}
        {activeTab === 'marine-currency-history' && <MarineCurrencyHistoryView />}
        {activeTab === 'currency-security-tips' && <CurrencySecurityTipsView />}
        {activeTab === 'ocean-dollar-dao-governance' && <OceanDollarDaoGovernancePortalView />}
        {activeTab === 'crypto-calculator' && <CryptoCalculatorView />}
        {activeTab === 'developer-revenue-whitepaper' && <DeveloperRevenueWhitepaperView />}
        {activeTab === 'ocean-desalination-research' && <OceanDesalinationAndResearchPortalView />}
        {activeTab === 'laboratory-practice-library' && <OceanDesalinationAndResearchPortalView />}
        {activeTab === 'marine-ar-view' && <MarineArView />}
        {activeTab === 'marine-health' && <MarineHealthMapView />}
        {activeTab === 'crew-welfare' && <CrewWelfarePortalView />}
        {activeTab === 'emergency-drill' && <EmergencyDrillPlannerView />}
        {activeTab === 'marine-logbook' && <MarineLogbookView />}
        {activeTab === 'collision-avoidance' && <CollisionAvoidanceView />}
        {activeTab === 'ocean-soundscapes' && <OceanSoundscapesView />}
        {activeTab === 'quick-notes' && <CaptainQuickNotesView />}
        {activeTab === 'smart-anchor' && <SmartAnchorWatchView />}
        {activeTab === 'port-traffic' && <PortTrafficForecastView />}
        {activeTab === 'piracy-alert' && <MarinePiracyAlertView />}
        {activeTab === 'nautical-chart' && <NauticalChartView />}
        {activeTab === 'ais-tracker' && <VesselsAISTrackerView />}
        {activeTab === 'fuel-analytics' && <FuelAnalyticsGraphView />}
        {activeTab === 'tourism' && <MarineTourismBookingInsuranceView />}
        {activeTab === 'path-optimizer' && <VesselPathOptimizer />}
        {activeTab === 'map-overlay' && <InteractiveMapOverlay />}
        {activeTab === 'port-checklist' && <PortEntryChecklist />}
        {activeTab === 'weather-alert' && <WeatherAlertMonitor />}
        {activeTab === 'rescue-telecom' && <SeafarerRescueTelecomView />}
        {activeTab === 'tides' && <VisualTideAnalytics />}
        {activeTab === 'grounding' && <SearchGroundingView />}
        {activeTab === 'fuel-tracker' && <MarineFuelTracker />}
        {activeTab === 'maritime-utilities' && <MaritimeUtilitiesView />}
        {activeTab === 'fisheries' && <FisheriesAndSeaHubView />}
        {activeTab === 'climate' && <ClimateWatchView onOpenRouteRadar={handleOpenRouteRadar} />}
        {activeTab === 'route-radar' && (
          <LiveRouteRadarView
            initialSelectedId={initialRouteId}
            onOpenAiAnalyst={() => setActiveTab('ai-analyst')}
          />
        )}
        {activeTab === 'timetable' && <CruiseTimetable />}
        {activeTab === 'nations' && <SouthAsiaNationsView onSelectRoute={handleOpenRouteRadar} />}
        {activeTab === 'converter-translator' && <MarineConverterTranslatorView />}
        {activeTab === 'jobs-training' && <MarineJobsAndTrainingView />}
        {activeTab === 'ai-analyst' && <AIVoiceTextChatbot />}
      </main>

      {/* Floating Quick Voice & Text AI Chat Trigger Button */}
      {activeTab !== 'ai-analyst' && (
        <button
          onClick={() => setActiveTab('ai-analyst')}
          className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-extrabold text-xs rounded-full shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 border border-cyan-400/40"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
          <span>AI Voice Assistant</span>
        </button>
      )}

      <Footer onOpenDomainLinks={() => setIsDomainModalOpen(true)} />

      <OtherDomainLinksModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
      />

      <BiometricLoginModal
        isOpen={isBiometricModalOpen}
        onClose={() => setIsBiometricModalOpen(false)}
      />

      <SmartSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectResult={(tab) => setActiveTab(tab)}
      />

      <HapticPulseController
        isOpen={isHapticModalOpen}
        onClose={() => setIsHapticModalOpen(false)}
      />

      <ChromeBrowserDiagnosticModal
        isOpen={isChromeModalOpen}
        onClose={() => setIsChromeModalOpen(false)}
      />

      {/* Global Real-Time Automated Disaster Toast Notification */}
      <RealtimeDisasterToast
        onOpenCommandCenter={() => {
          setActiveTab('tsunami-earthquake-warning');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Developer Debug Console Floating Tool */}
      <DebugConsole />
    </div>
  );
}




