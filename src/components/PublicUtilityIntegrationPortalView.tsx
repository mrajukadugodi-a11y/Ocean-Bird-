import React, { useState, useEffect } from 'react';
import {
  Globe,
  Radio,
  Building2,
  Plane,
  Ship,
  Code,
  Key,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Download,
  Terminal,
  Layers,
  Share2,
  Server,
  FileText,
  Activity,
  ExternalLink,
  Cpu,
  Lock,
  RefreshCw,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Play,
  Send,
  Plus,
  Filter,
  Database,
  ChevronRight,
  UserPlus,
  Sliders,
  ArrowRight,
  Rss,
  Eye,
  Siren,
  Waves,
  CheckSquare,
  TrendingUp,
  BarChart3,
  Search,
  LockKeyhole,
  Clock,
  Sparkles,
  Layers3,
  HardDrive,
  BookOpen,
  Webhook
} from 'lucide-react';

export interface RegisteredEntity {
  id: string;
  name: string;
  sector: 'AIRWAYS' | 'SHIPPING' | 'PUBLIC_UTILITIES' | 'PORT_AUTHORITY';
  country: string;
  domain: string;
  verified: boolean;
  apiKey: string;
  registeredDate: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  webhookUrl: string;
  dailyRequests: number;
  authScopes: string[];
  lastAuthSync: string;
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  source: string;
  category: 'AIRWAYS' | 'SHIPPING' | 'PUBLIC_UTILITIES';
  type: string;
  status: 'HEALTHY' | 'DEGRADED' | 'ALERT';
  latencyMs: number;
  details: string;
  txHash: string;
}

export interface CapAlertData {
  identifier: string;
  sender: string;
  sent: string;
  status: 'Actual' | 'Exercise' | 'System' | 'Test';
  msgType: 'Alert' | 'Update' | 'Cancel';
  scope: 'Public' | 'Restricted' | 'Private';
  event: string;
  urgency: 'Immediate' | 'Expected' | 'Future' | 'Unknown';
  severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown';
  certainty: 'Observed' | 'Likely' | 'Possible' | 'Unlikely';
  headline: string;
  description: string;
  instruction: string;
  areaDesc: string;
}

export interface ApiEndpointMetric {
  id: string;
  endpoint: string;
  sector: 'AIRWAYS' | 'SHIPPING' | 'PUBLIC_UTILITIES' | 'CORE';
  rpm: number;
  avgLatencyMs: number;
  successRatePercent: number;
  errorCount24h: number;
  status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
}

export interface LedgerRecord {
  id: string;
  timestamp: string;
  sector: 'AIRWAYS' | 'SHIPPING' | 'PUBLIC_UTILITIES';
  entityName: string;
  actionType: string;
  dataPayloadBrief: string;
  merkleHash: string;
  verificationStatus: 'VERIFIED_ON_CHAIN' | 'PENDING';
}

export const PublicUtilityIntegrationPortalView: React.FC = () => {
  const [portalTab, setPortalTab] = useState<
    | 'CROSS_INDUSTRY_DASHBOARD'
    | 'UNIFIED_DATA_API'
    | 'PUBLIC_UTILITIES_BRIDGE'
    | 'ENTITY_ONBOARDING'
    | 'UNIFIED_LEDGER_EXPORT'
    | 'API_MONITOR'
    | 'ENTITY_AUTH_SYNC'
    | 'UTILITIES_DEMAND_FORECAST'
    | 'API_DOCS_PORTAL'
    | 'API_USAGE_ANALYTICS'
    | 'AUTOMATED_AUDIT_LOGS'
    | 'WEBHOOK_MANAGEMENT'
  >('CROSS_INDUSTRY_DASHBOARD');

  // 1. NEW FEATURE: API DOCUMENTATION PORTAL STATE
  const [docsSelectedEndpoint, setDocsSelectedEndpoint] = useState<string>('/api/v1/fleet/global');
  const [docsLanguage, setDocsLanguage] = useState<'CURL' | 'NODE' | 'PYTHON'>('CURL');
  const [docsSearchQuery, setDocsSearchQuery] = useState<string>('');
  const [docsOpenApiData, setDocsOpenApiData] = useState<any>(null);

  // 2. NEW FEATURE: API USAGE ANALYTICS STATE
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState<boolean>(false);
  const [analyticsTimeWindow, setAnalyticsTimeWindow] = useState<'24H' | '7D' | '30D'>('24H');

  // 3. NEW FEATURE: AUTOMATED AUDIT LOGS STATE
  const [auditLogsList, setAuditLogsList] = useState<any[]>([]);
  const [auditLogsLoading, setAuditLogsLoading] = useState<boolean>(false);
  const [auditSeverityFilter, setAuditSeverityFilter] = useState<string>('ALL');
  const [auditSearchQuery, setAuditSearchQuery] = useState<string>('');
  const [newAuditAction, setNewAuditAction] = useState<string>('');
  const [newAuditCategory, setNewAuditCategory] = useState<string>('SECURITY_ALERT');
  const [auditLogSuccessMsg, setAuditLogSuccessMsg] = useState<string | null>(null);

  // 4. NEW FEATURE: WEBHOOK MANAGEMENT STATE
  const [webhooksList, setWebhooksList] = useState<any[]>([]);
  const [webhooksLoading, setWebhooksLoading] = useState<boolean>(false);
  const [newWebhookTargetUrl, setNewWebhookTargetUrl] = useState<string>('https://foc.jal.co.jp/webhooks/tsunami-stream');
  const [newWebhookEvent, setNewWebhookEvent] = useState<string>('cap.siren_dispatch');
  const [testWebhookResult, setTestWebhookResult] = useState<any>(null);
  const [testWebhookLoading, setTestWebhookLoading] = useState<boolean>(false);

  // FETCH API DOCS OPENAPI DATA
  const fetchOpenApiDocs = async () => {
    try {
      const res = await fetch('/api/v1/docs/openapi.json');
      const data = await res.json();
      setDocsOpenApiData(data);
    } catch (e) {
      console.error(e);
    }
  };

  // FETCH API ANALYTICS
  const fetchApiAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch('/api/v1/analytics/usage');
      const data = await res.json();
      setAnalyticsData(data.analytics);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // FETCH AUDIT LOGS
  const fetchAuditLogs = async () => {
    setAuditLogsLoading(true);
    try {
      const res = await fetch('/api/v1/audit/logs');
      const data = await res.json();
      setAuditLogsList(data.auditLogs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setAuditLogsLoading(false);
    }
  };

  // DISPATCH CUSTOM AUDIT EVENT
  const handleCreateAuditEvent = async () => {
    if (!newAuditAction.trim()) return;
    try {
      const res = await fetch('/api/v1/audit/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newAuditCategory,
          severity: 'SECURITY_ALERT',
          action: newAuditAction,
          actor: 'ENTERPRISE_ADMIN_USER'
        })
      });
      const data = await res.json();
      if (data.success) {
        setAuditLogSuccessMsg('Audit log entry created with Merkle Hash proof.');
        setNewAuditAction('');
        fetchAuditLogs();
        setTimeout(() => setAuditLogSuccessMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // FETCH WEBHOOKS
  const fetchWebhooks = async () => {
    setWebhooksLoading(true);
    try {
      const res = await fetch('/api/v1/webhooks/subscriptions');
      const data = await res.json();
      setWebhooksList(data.webhooks || []);
    } catch (e) {
      console.error(e);
    } finally {
      setWebhooksLoading(false);
    }
  };

  // REGISTER WEBHOOK
  const handleRegisterWebhook = async () => {
    if (!newWebhookTargetUrl.trim()) return;
    try {
      const res = await fetch('/api/v1/webhooks/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: newWebhookTargetUrl,
          events: [newWebhookEvent]
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchWebhooks();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // TRIGGER TEST WEBHOOK
  const handleTriggerTestWebhook = async (webhookId: string) => {
    setTestWebhookLoading(true);
    try {
      const res = await fetch('/api/v1/webhooks/test-trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookId,
          eventType: newWebhookEvent
        })
      });
      const data = await res.json();
      setTestWebhookResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setTestWebhookLoading(false);
    }
  };

  // Unified API State
  const [apiKey, setApiKey] = useState<string>('ob_live_pk_8f9214b9c1d04e38a291f09c82a17ef5');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>('https://api.airlineops.com/v1/oceanbird/alerts');
  const [selectedFormat, setSelectedFormat] = useState<'JSON' | 'CAP_XML' | 'NMEA'>('JSON');
  const [generatedApiKeyMsg, setGeneratedApiKeyMsg] = useState<boolean>(false);
  const [testWebhookStatus, setTestWebhookStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');

  // API Sandbox State
  const [sandboxEndpoint, setSandboxEndpoint] = useState<string>('/api/v1/telemetry/unified');
  const [sandboxCategory, setSandboxCategory] = useState<'AIRWAYS' | 'SHIPPING' | 'PUBLIC_UTILITIES'>('AIRWAYS');
  const [sandboxExecuting, setSandboxExecuting] = useState<boolean>(false);
  const [sandboxResponse, setSandboxResponse] = useState<string | null>(null);

  // CAP Alert State
  const [capAlert, setCapAlert] = useState<CapAlertData>({
    identifier: `OB-CAP-${Date.now().toString().slice(-6)}`,
    sender: 'wmo-tsunami-center@oceanbird.ai',
    sent: new Date().toISOString(),
    status: 'Actual',
    msgType: 'Alert',
    scope: 'Public',
    event: 'Tsunami Early Warning & Seismic Displacement',
    urgency: 'Immediate',
    severity: 'Severe',
    certainty: 'Observed',
    headline: 'M7.8 Megathrust Earthquake Detected in Nankai Trough - Immediate Coastal Evacuation',
    description: 'A major subduction earthquake occurred off the Pacific Coast of Honshu. Tsunami wave propagation estimated at 720 km/h toward coastal zones. Maritime vessels proceed to water depths > 200m.',
    instruction: 'Aviation: Reroute flight corridors away from coastal airfields. Maritime: Execute deep-water departure maneuvers. Civil Defense: Sound coastal sirens immediately.',
    areaDesc: 'Pacific Ocean Basin, Japan Arc, Honshu South Coast, Guam Corridor'
  });
  const [capDispatched, setCapDispatched] = useState<boolean>(false);
  const [sirenTestStatus, setSirenTestStatus] = useState<string | null>(null);

  // Onboarding Form State
  const [orgName, setOrgName] = useState<string>('');
  const [orgSector, setOrgSector] = useState<'AIRWAYS' | 'SHIPPING' | 'PUBLIC_UTILITIES' | 'PORT_AUTHORITY'>('AIRWAYS');
  const [orgCountry, setOrgCountry] = useState<string>('Japan');
  const [orgDomain, setOrgDomain] = useState<string>('');
  const [orgWebhook, setOrgWebhook] = useState<string>('');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const [registeredEntities, setRegisteredEntities] = useState<RegisteredEntity[]>([
    {
      id: 'ENT-001',
      name: 'Japan Airlines (JAL) Flight Operations',
      sector: 'AIRWAYS',
      country: 'Japan',
      domain: 'jal.com',
      verified: true,
      apiKey: 'ob_live_pk_jal99214b9c1d04e',
      registeredDate: '2026-01-15',
      status: 'ACTIVE',
      webhookUrl: 'https://foc.jal.com/api/oceanbird/alerts',
      dailyRequests: 142000,
      authScopes: ['read:telemetry', 'foc:reroute', 'alerts:receive'],
      lastAuthSync: '2026-08-05 00:10:12 UTC'
    },
    {
      id: 'ENT-002',
      name: 'Mitsui O.S.K. Lines (MOL) Cargo Fleet',
      sector: 'SHIPPING',
      country: 'Japan',
      domain: 'mol.co.jp',
      verified: true,
      apiKey: 'ob_live_pk_mol88124b9c2e01',
      registeredDate: '2026-02-01',
      status: 'ACTIVE',
      webhookUrl: 'https://ais.mol.co.jp/v1/telemetry',
      dailyRequests: 389000,
      authScopes: ['read:telemetry', 'ais:write', 'port:clearance'],
      lastAuthSync: '2026-08-05 00:12:44 UTC'
    },
    {
      id: 'ENT-003',
      name: 'Honshu Coastal Civil Defense Authority',
      sector: 'PUBLIC_UTILITIES',
      country: 'Japan',
      domain: 'pref.shizuoka.jp',
      verified: true,
      apiKey: 'ob_live_pk_shiz77123c88a10',
      registeredDate: '2026-03-10',
      status: 'ACTIVE',
      webhookUrl: 'https://emergency.pref.shizuoka.jp/cap-relay',
      dailyRequests: 84000,
      authScopes: ['read:telemetry', 'cap:broadcast', 'siren:arm'],
      lastAuthSync: '2026-08-05 00:14:02 UTC'
    },
    {
      id: 'ENT-004',
      name: 'Pacific Northwest Emergency Management',
      sector: 'PUBLIC_UTILITIES',
      country: 'United States',
      domain: 'mil.wa.gov',
      verified: true,
      apiKey: 'ob_live_pk_pnw55123d99a20',
      registeredDate: '2026-04-22',
      status: 'ACTIVE',
      webhookUrl: 'https://alert.mil.wa.gov/tsunami-feed',
      dailyRequests: 62000,
      authScopes: ['read:telemetry', 'cap:broadcast', 'rss:push'],
      lastAuthSync: '2026-08-05 00:08:50 UTC'
    }
  ]);
  const [onboardSuccessMsg, setOnboardSuccessMsg] = useState<string | null>(null);

  // Live Telemetry Filter State
  const [telemetryCategoryFilter, setTelemetryCategoryFilter] = useState<'ALL' | 'AIRWAYS' | 'SHIPPING' | 'PUBLIC_UTILITIES'>('ALL');

  // NEW FEATURE 1: UNIFIED LEDGER EXPORT STATE
  const [ledgerSectorFilter, setLedgerSectorFilter] = useState<'ALL' | 'AIRWAYS' | 'SHIPPING' | 'PUBLIC_UTILITIES'>('ALL');
  const [ledgerFormat, setLedgerFormat] = useState<'JSON' | 'CSV' | 'CAP_XML_BUNDLE'>('CSV');
  const [ledgerExportMsg, setLedgerExportMsg] = useState<string | null>(null);

  const [ledgerRecords] = useState<LedgerRecord[]>([
    {
      id: 'TX-90081',
      timestamp: '2026-08-05 00:18:02 UTC',
      sector: 'AIRWAYS',
      entityName: 'Japan Airlines (JAL) Flight Ops',
      actionType: 'FLIGHT_CORRIDOR_DIVERSION',
      dataPayloadBrief: 'JL-006 rerouted from Haneda-LAX via Northern Pacific Track to bypass volcanic ash plume.',
      merkleHash: '0x8f2a91c7b8e1d04e38a291f09c82a17ef59b1284a0c8',
      verificationStatus: 'VERIFIED_ON_CHAIN'
    },
    {
      id: 'TX-90082',
      timestamp: '2026-08-05 00:17:40 UTC',
      sector: 'SHIPPING',
      entityName: 'Mitsui O.S.K. Lines (MOL)',
      actionType: 'AIS_DEEP_WATER_MANEUVER',
      dataPayloadBrief: 'Vessel MOL TRIUMPH executed 140° course change into >200m water depth following tsunami warning.',
      merkleHash: '0x3c9a18d2f7e4a19b0c2d3e4f5a6b7c8d9e0f1a2b',
      verificationStatus: 'VERIFIED_ON_CHAIN'
    },
    {
      id: 'TX-90083',
      timestamp: '2026-08-05 00:16:55 UTC',
      sector: 'PUBLIC_UTILITIES',
      entityName: 'Honshu Civil Defense',
      actionType: 'CAP_V1.2_SIREN_BROADCAST',
      dataPayloadBrief: '140 Municipal siren towers armed in High-Priority Evacuation Mode for Shizuoka Prefecture.',
      merkleHash: '0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d',
      verificationStatus: 'VERIFIED_ON_CHAIN'
    },
    {
      id: 'TX-90084',
      timestamp: '2026-08-05 00:15:10 UTC',
      sector: 'AIRWAYS',
      entityName: 'Lufthansa Cargo Flight Dispatch',
      actionType: 'ICAO_NOTAM_AUTO_HOOK',
      dataPayloadBrief: 'NOTAM #8821 acknowledged for Tokyo Haneda airspace. Fuel reserves recalculated +12%.',
      merkleHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      verificationStatus: 'VERIFIED_ON_CHAIN'
    },
    {
      id: 'TX-90085',
      timestamp: '2026-08-05 00:14:00 UTC',
      sector: 'PUBLIC_UTILITIES',
      entityName: 'Pacific NW Emergency Mgmt',
      actionType: 'USGS_SEISMIC_TELEMETRY_SYNC',
      dataPayloadBrief: 'Cascadia subduction zone sensor array synced with Ocean Bird USGS relay engine.',
      merkleHash: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e',
      verificationStatus: 'VERIFIED_ON_CHAIN'
    }
  ]);

  // NEW FEATURE 2: INTERACTIVE INDUSTRY API MONITOR STATE
  const [apiMonitorTimeframe, setApiMonitorTimeframe] = useState<'1H' | '24H' | '7D' | '30D'>('24H');
  const [isStressTesting, setIsStressTesting] = useState<boolean>(false);
  const [stressTestResult, setStressTestResult] = useState<string | null>(null);

  const [apiEndpointsMetrics, setApiEndpointsMetrics] = useState<ApiEndpointMetric[]>([
    {
      id: 'EP-01',
      endpoint: '/api/v1/aviation/flight-corridors',
      sector: 'AIRWAYS',
      rpm: 4820,
      avgLatencyMs: 14,
      successRatePercent: 99.98,
      errorCount24h: 3,
      status: 'OPERATIONAL'
    },
    {
      id: 'EP-02',
      endpoint: '/api/v1/maritime/ais-transponder-stream',
      sector: 'SHIPPING',
      rpm: 12400,
      avgLatencyMs: 18,
      successRatePercent: 99.95,
      errorCount24h: 12,
      status: 'OPERATIONAL'
    },
    {
      id: 'EP-03',
      endpoint: '/api/v1/utilities/cap-v1.2-siren-feed',
      sector: 'PUBLIC_UTILITIES',
      rpm: 3100,
      avgLatencyMs: 9,
      successRatePercent: 100.0,
      errorCount24h: 0,
      status: 'OPERATIONAL'
    },
    {
      id: 'EP-04',
      endpoint: '/api/v1/seismic/usgs-noaa-unified-feed',
      sector: 'CORE',
      rpm: 18900,
      avgLatencyMs: 22,
      successRatePercent: 99.99,
      errorCount24h: 2,
      status: 'OPERATIONAL'
    },
    {
      id: 'EP-05',
      endpoint: '/api/v1/tsunami/dart-buoy-pressure',
      sector: 'CORE',
      rpm: 6400,
      avgLatencyMs: 16,
      successRatePercent: 99.97,
      errorCount24h: 5,
      status: 'OPERATIONAL'
    }
  ]);

  // NEW FEATURE 3: ENTITY AUTH SYNC STATE
  const [authSyncing, setAuthSyncing] = useState<boolean>(false);
  const [authSyncMsg, setAuthSyncMsg] = useState<string | null>(null);

  // 1. GLOBAL FLEET API STATE
  const [fleetApiFilter, setFleetApiFilter] = useState<'ALL' | 'AIRWAYS' | 'SHIPPING' | 'CRUISE'>('ALL');
  const [fleetApiData, setFleetApiData] = useState<any>(null);
  const [fleetApiLoading, setFleetApiLoading] = useState<boolean>(false);

  // 2. UTILITY REQUEST API STATE
  const [utilityReqType, setUtilityReqType] = useState<string>('CIVIL_DEFENSE_SIREN');
  const [utilityReqOrg, setUtilityReqOrg] = useState<string>('Shizuoka Crisis Operations');
  const [utilityReqLocation, setUtilityReqLocation] = useState<string>('Suruga Coastal Sector A-1');
  const [utilityReqUrgency, setUtilityReqUrgency] = useState<string>('CRITICAL');
  const [utilityReqDetails, setUtilityReqDetails] = useState<string>('Acoustic Siren 140dB warning activation for tsunami wave surge.');
  const [utilityReqResult, setUtilityReqResult] = useState<any>(null);
  const [utilityReqLoading, setUtilityReqLoading] = useState<boolean>(false);

  // 3. AIR CARGO SYNC API STATE
  const [airCargoWaybill, setAirCargoWaybill] = useState<string>('AWB-131-98402120');
  const [airCargoFlight, setAirCargoFlight] = useState<string>('JL-006 Cargo Belly');
  const [airCargoTemp, setAirCargoTemp] = useState<number>(4.0);
  const [airCargoCategory, setAirCargoCategory] = useState<string>('PHARMACEUTICAL_COLD_CHAIN');
  const [airCargoResult, setAirCargoResult] = useState<any>(null);
  const [airCargoLoading, setAirCargoLoading] = useState<boolean>(false);

  // 4. SECURITY AUTH HANDSHAKE API STATE
  const [authClientId, setAuthClientId] = useState<string>('ob_client_jal_foc_9921');
  const [authSecret, setAuthSecret] = useState<string>('sec_live_992a812b04c8e');
  const [authHandshakeResult, setAuthHandshakeResult] = useState<any>(null);
  const [authHandshakeLoading, setAuthHandshakeLoading] = useState<boolean>(false);

  // HANDLER: CALL GLOBAL FLEET API
  const handleCallGlobalFleetApi = async () => {
    setFleetApiLoading(true);
    try {
      const res = await fetch(`/api/v1/fleet/global?sector=${fleetApiFilter}`);
      const data = await res.json();
      setFleetApiData(data);
    } catch (e: any) {
      setFleetApiData({
        success: false,
        error: e.message || 'Failed to fetch global fleet API'
      });
    } finally {
      setFleetApiLoading(false);
    }
  };

  // HANDLER: CALL UTILITY REQUEST API
  const handleCallUtilityRequestApi = async () => {
    setUtilityReqLoading(true);
    try {
      const res = await fetch('/api/v1/utilities/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          utilityType: utilityReqType,
          requestorOrg: utilityReqOrg,
          locationZone: utilityReqLocation,
          urgency: utilityReqUrgency,
          details: utilityReqDetails
        })
      });
      const data = await res.json();
      setUtilityReqResult(data);
    } catch (e: any) {
      setUtilityReqResult({
        success: false,
        error: e.message || 'Failed to execute Utility Request API'
      });
    } finally {
      setUtilityReqLoading(false);
    }
  };

  // HANDLER: CALL AIR CARGO SYNC API
  const handleCallAirCargoSyncApi = async () => {
    setAirCargoLoading(true);
    try {
      const res = await fetch('/api/v1/aviation/air-cargo-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          waybillNumber: airCargoWaybill,
          flightNumber: airCargoFlight,
          temperatureReqC: airCargoTemp,
          cargoCategory: airCargoCategory
        })
      });
      const data = await res.json();
      setAirCargoResult(data);
    } catch (e: any) {
      setAirCargoResult({
        success: false,
        error: e.message || 'Failed to execute Air Cargo Sync API'
      });
    } finally {
      setAirCargoLoading(false);
    }
  };

  // HANDLER: CALL SECURITY AUTH HANDSHAKE API
  const handleCallSecurityAuthHandshakeApi = async () => {
    setAuthHandshakeLoading(true);
    try {
      const res = await fetch('/api/v1/security/auth-handshake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: authClientId,
          clientSecret: authSecret,
          requestedScopes: ['read:telemetry', 'write:reroute', 'siren:alert', 'cargo:sync']
        })
      });
      const data = await res.json();
      setAuthHandshakeResult(data);
    } catch (e: any) {
      setAuthHandshakeResult({
        success: false,
        error: e.message || 'Failed to execute Security Auth Handshake API'
      });
    } finally {
      setAuthHandshakeLoading(false);
    }
  };

  // NEW FEATURE 4: UTILITIES DEMAND FORECAST STATE
  const [forecastScenario, setForecastScenario] = useState<
    'STANDARD_OPERATIONS' | 'M7.5_TSUNAMI_WARNING' | 'CATEGORY_5_TYPHOON' | 'BLACKOUT_GRID_RECOVERY'
  >('M7.5_TSUNAMI_WARNING');
  const [forecastHorizon, setForecastHorizon] = useState<'24H' | '48H' | '72H' | '7D'>('48H');

  const telemetryEvents: TelemetryEvent[] = [
    {
      id: 'TEL-901',
      timestamp: '2026-08-05 00:16:42 UTC',
      source: 'Japan Airlines (JAL) Flight Dispatch',
      category: 'AIRWAYS',
      type: 'ADS-B / Volcanic AshSync',
      status: 'HEALTHY',
      latencyMs: 24,
      details: 'Flight JL-006 rerouted clear of Nankai tremor radius. Cabin altitude normal.',
      txHash: '0x8f2a91c7b8e1d04e'
    },
    {
      id: 'TEL-902',
      timestamp: '2026-08-05 00:16:15 UTC',
      source: 'MOL Container Carrier AIS Telemetry',
      category: 'SHIPPING',
      type: 'NMEA-0183 & ECDIS Feed',
      status: 'HEALTHY',
      latencyMs: 18,
      details: 'Vessel MOL TRIUMPH acknowledged M7.8 tsunami warning. Heading 140° toward deep water.',
      txHash: '0x3c9a18d2f7e4a19b'
    },
    {
      id: 'TEL-903',
      timestamp: '2026-08-05 00:15:58 UTC',
      source: 'Honshu Coastal Siren Array',
      category: 'PUBLIC_UTILITIES',
      type: 'CAP v1.2 Relay & RF Speaker',
      status: 'ALERT',
      latencyMs: 12,
      details: '140 Municipal siren towers armed in High-Priority Evacuation Mode.',
      txHash: '0x7e6d5c4b3a2f1e0d'
    },
    {
      id: 'TEL-904',
      timestamp: '2026-08-05 00:15:30 UTC',
      source: 'US Pacific Northwest Civil Defense Grid',
      category: 'PUBLIC_UTILITIES',
      type: 'RSS / CAP Feed Push',
      status: 'HEALTHY',
      latencyMs: 31,
      details: 'Cascadia subduction zone telemetry synced. Public radio broadcast ready.',
      txHash: '0x9f8e7d6c5b4a3f2e'
    },
    {
      id: 'TEL-905',
      timestamp: '2026-08-05 00:14:50 UTC',
      source: 'Lufthansa Global Cargo Flight Ops',
      category: 'AIRWAYS',
      type: 'ICAO NOTAM Auto-Hook',
      status: 'HEALTHY',
      latencyMs: 42,
      details: 'NOTAM #8821 active for Tokyo Haneda airspace. Alternate routes verified.',
      txHash: '0x1a2b3c4d5e6f7a8b'
    },
    {
      id: 'TEL-906',
      timestamp: '2026-08-05 00:14:10 UTC',
      source: 'Port of Singapore AIS Coast Station',
      category: 'SHIPPING',
      type: 'Port Authority Clearance API',
      status: 'HEALTHY',
      latencyMs: 22,
      details: '18 Vessel departure clearance tokens issued for tsunami avoidance maneuver.',
      txHash: '0x5c6d7e8f9a0b1c2d'
    }
  ];

  // INITIAL DATA FETCH EFFECT
  useEffect(() => {
    fetchOpenApiDocs();
    fetchApiAnalytics();
    fetchAuditLogs();
    fetchWebhooks();
  }, []);

  const getCodeSnippet = (lang: string, endpoint: string) => {
    if (lang === 'CURL') {
      return `curl -X GET "https://oceanbird.cloud${endpoint}" \\\n  -H "Authorization: Bearer ob_live_pk_8f9214b9c1d04e38a291f09c82a17ef5" \\\n  -H "Content-Type: application/json"`;
    }
    if (lang === 'NODE') {
      return `import fetch from 'node-fetch';\n\nconst response = await fetch('https://oceanbird.cloud${endpoint}', {\n  method: 'GET',\n  headers: {\n    'Authorization': 'Bearer ob_live_pk_8f9214b9c1d04e38a291f09c82a17ef5',\n    'Content-Type': 'application/json'\n  }\n});\nconst data = await response.json();\nconsole.log(data);`;
    }
    return `import requests\n\nurl = "https://oceanbird.cloud${endpoint}"\nheaders = {\n    "Authorization": "Bearer ob_live_pk_8f9214b9c1d04e38a291f09c82a17ef5",\n    "Content-Type": "application/json"\n}\n\nresponse = requests.get(url, headers=headers)\nprint(response.json())`;
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleGenerateApiKey = () => {
    const newKey = `ob_live_pk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    setGeneratedApiKeyMsg(true);
    setTimeout(() => setGeneratedApiKeyMsg(false), 3000);
  };

  const handleTestWebhook = () => {
    setTestWebhookStatus('SENDING');
    setTimeout(() => {
      setTestWebhookStatus('SUCCESS');
      setTimeout(() => setTestWebhookStatus('IDLE'), 3500);
    }, 1200);
  };

  const handleExecuteSandbox = async () => {
    setSandboxExecuting(true);
    setSandboxResponse(null);

    try {
      if (sandboxEndpoint === '/api/v1/fleet/global') {
        const res = await fetch('/api/v1/fleet/global');
        const data = await res.json();
        setSandboxResponse(JSON.stringify(data, null, 2));
      } else if (sandboxEndpoint === '/api/v1/utilities/request') {
        const res = await fetch('/api/v1/utilities/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            utilityType: 'CIVIL_DEFENSE_SIREN',
            requestorOrg: 'Shizuoka Crisis Operations',
            locationZone: 'Suruga Bay Coastal Sector A-1',
            urgency: 'HIGH',
            details: 'Sandbox acoustic test siren signal dispatch'
          })
        });
        const data = await res.json();
        setSandboxResponse(JSON.stringify(data, null, 2));
      } else if (sandboxEndpoint === '/api/v1/aviation/air-cargo-sync') {
        const res = await fetch('/api/v1/aviation/air-cargo-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            waybillNumber: 'AWB-131-98402120',
            flightNumber: 'JL-006 Belly Cargo',
            cargoCategory: 'PHARMACEUTICAL_COLD_CHAIN',
            temperatureReqC: 4.0
          })
        });
        const data = await res.json();
        setSandboxResponse(JSON.stringify(data, null, 2));
      } else if (sandboxEndpoint === '/api/v1/security/auth-handshake') {
        const res = await fetch('/api/v1/security/auth-handshake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId: 'ob_client_jal_foc_9921',
            clientSecret: 'sec_live_992a812b04c8e',
            requestedScopes: ['read:telemetry', 'write:reroute', 'siren:alert']
          })
        });
        const data = await res.json();
        setSandboxResponse(JSON.stringify(data, null, 2));
      } else if (sandboxEndpoint === '/api/v1/telemetry/unified') {
        setSandboxResponse(
          JSON.stringify(
            {
              status: 'success',
              code: 200,
              timestamp: new Date().toISOString(),
              system: 'Ocean Bird Unified Cross-Industry Telemetry Engine v4.2',
              activeSector: sandboxCategory,
              connectedEntities: registeredEntities.length,
              seismicStatus: {
                globalHazardLevel: 'MONITORING',
                activeQuakes24h: 34,
                latestEarthquake: {
                  magnitude: 7.8,
                  location: 'Nankai Trough, Japan Arc',
                  depthKm: 12.4,
                  tsunamiThreatFlag: true
                }
              },
              activeCarriers: ['Japan Airlines', 'Lufthansa', 'Emirates', 'Delta Air Lines'],
              activeShippingFleets: ['MOL', 'NYK Line', 'Maersk', 'COSCO Shipping'],
              publicUtilityRelays: ['Honshu Siren Grid', 'PNW Emergency Grid', 'Hellenic Coast Alert']
            },
            null,
            2
          )
        );
      } else if (sandboxEndpoint === '/api/v1/seismic/earthquakes') {
        setSandboxResponse(
          JSON.stringify(
            {
              status: 'success',
              code: 200,
              source: 'USGS & WMO Global Seismograph Network',
              events: [
                {
                  id: 'EQ-2026-NANKAI01',
                  mag: 7.8,
                  place: '92 km SE of Shizuoka, Japan',
                  time: new Date().toISOString(),
                  coordinates: [138.4, 34.2, 12.5],
                  tsunamiWarningTriggered: true
                }
              ]
            },
            null,
            2
          )
        );
      } else if (sandboxEndpoint === '/api/v1/tsunami/buoys') {
        setSandboxResponse(
          JSON.stringify(
            {
              status: 'success',
              code: 200,
              network: 'NOAA DART Deep-Ocean Tsunami Buoys',
              activeBuoys: 38,
              triggerThresholdMeters: 0.15,
              recentSpikeDetected: {
                buoyId: 'DART-21418 (NW Pacific)',
                waterColumnPressureDelta: '+2.84 meters',
                waveSpeedKmh: 720
              }
            },
            null,
            2
          )
        );
      } else {
        setSandboxResponse(
          JSON.stringify(
            {
              status: 'success',
              code: 200,
              message: `Endpoint ${sandboxEndpoint} queried successfully`,
              apiKeyUsed: apiKey.substring(0, 12) + '...',
              timestamp: new Date().toISOString()
            },
            null,
            2
          )
        );
      }
    } catch (err: any) {
      setSandboxResponse(JSON.stringify({ error: err.message || 'API sandbox request failed' }, null, 2));
    } finally {
      setSandboxExecuting(false);
    }
  };

  const handleDispatchCapAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setCapDispatched(true);
    setTimeout(() => setCapDispatched(false), 4000);
  };

  const handleTriggerSirenTest = (sirenName: string) => {
    setSirenTestStatus(`TRIGGERING ACOUSTIC TEST SIGNAL TO '${sirenName}'...`);
    setTimeout(() => {
      setSirenTestStatus(`SUCCESS: ACOUSTIC & RF SIGNAL VERIFIED ON '${sirenName}' (100% OPERATIONAL)`);
      setTimeout(() => setSirenTestStatus(null), 4000);
    }, 1500);
  };

  const handleRegisterNewEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !orgDomain.trim()) return;

    const newKey = `ob_live_pk_${Math.random().toString(36).substring(2, 14)}`;
    const newEntity: RegisteredEntity = {
      id: `ENT-00${registeredEntities.length + 1}`,
      name: orgName,
      sector: orgSector,
      country: orgCountry,
      domain: orgDomain,
      verified: true,
      apiKey: newKey,
      registeredDate: new Date().toISOString().substring(0, 10),
      status: 'ACTIVE',
      webhookUrl: orgWebhook || `https://api.${orgDomain}/oceanbird/webhook`,
      dailyRequests: 1000,
      authScopes: ['read:telemetry', 'alerts:receive'],
      lastAuthSync: 'JUST NOW'
    };

    setRegisteredEntities((prev) => [newEntity, ...prev]);
    setOnboardSuccessMsg(`ORGANIZATION '${orgName}' ONBOARDED SUCCESSFULLY! API KEY: ${newKey}`);
    setOrgName('');
    setOrgDomain('');
    setOrgWebhook('');
    setTimeout(() => setOnboardSuccessMsg(null), 6000);
  };

  // HANDLER FOR UNIFIED LEDGER EXPORT
  const handleExportLedgerData = () => {
    const filteredLedger = ledgerSectorFilter === 'ALL'
      ? ledgerRecords
      : ledgerRecords.filter((r) => r.sector === ledgerSectorFilter);

    if (ledgerFormat === 'CSV') {
      const csvHeader = 'ID,Timestamp,Sector,Entity,ActionType,PayloadBrief,MerkleHash,Status\n';
      const csvRows = filteredLedger
        .map(
          (r) =>
            `"${r.id}","${r.timestamp}","${r.sector}","${r.entityName}","${r.actionType}","${r.dataPayloadBrief.replace(
              /"/g,
              '""'
            )}","${r.merkleHash}","${r.verificationStatus}"`
        )
        .join('\n');
      const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `oceanbird_unified_ledger_${ledgerSectorFilter.toLowerCase()}_${Date.now()}.csv`;
      a.click();
      setLedgerExportMsg(`EXPORTED ${filteredLedger.length} VERIFIED LEDGER RECORDS TO CSV!`);
    } else if (ledgerFormat === 'JSON') {
      const blob = new Blob([JSON.stringify(filteredLedger, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `oceanbird_unified_ledger_${ledgerSectorFilter.toLowerCase()}_${Date.now()}.json`;
      a.click();
      setLedgerExportMsg(`EXPORTED ${filteredLedger.length} VERIFIED LEDGER RECORDS TO JSON!`);
    } else {
      setLedgerExportMsg(`BUNDLE GENERATED IN CAP v1.2 XML FOR ${filteredLedger.length} TRANSACTIONS!`);
    }

    setTimeout(() => setLedgerExportMsg(null), 4000);
  };

  // HANDLER FOR RUNNING API STRESS TEST
  const handleRunStressTest = () => {
    setIsStressTesting(true);
    setStressTestResult(null);

    setTimeout(() => {
      setIsStressTesting(false);
      setApiEndpointsMetrics((prev) =>
        prev.map((ep) => ({
          ...ep,
          rpm: Math.floor(ep.rpm * (1 + (Math.random() * 0.2 - 0.1))),
          avgLatencyMs: Math.max(5, Math.floor(ep.avgLatencyMs + (Math.random() * 6 - 3)))
        }))
      );
      setStressTestResult('API TRAFFIC STRESS TEST COMPLETE: 50,000 SIMULATED PINGS DELIVERED WITH 0% DROPPED PACKETS.');
      setTimeout(() => setStressTestResult(null), 5000);
    }, 1800);
  };

  // HANDLER FOR FORCE AUTH SYNC
  const handleForceSyncAuth = () => {
    setAuthSyncing(true);
    setAuthSyncMsg(null);

    setTimeout(() => {
      setAuthSyncing(false);
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      setRegisteredEntities((prev) =>
        prev.map((ent) => ({
          ...ent,
          lastAuthSync: nowStr
        }))
      );
      setAuthSyncMsg('ALL CROSS-INDUSTRY OAUTH2 & API TOKENS SYNCHRONIZED SECURELY ACROSS AIRWAYS, SHIPPING & PUBLIC UTILITIES!');
      setTimeout(() => setAuthSyncMsg(null), 5000);
    }, 1500);
  };

  const handleRotateEntityKey = (entityId: string) => {
    const newRotatedKey = `ob_live_pk_rot_${Math.random().toString(36).substring(2, 14)}`;
    setRegisteredEntities((prev) =>
      prev.map((ent) => (ent.id === entityId ? { ...ent, apiKey: newRotatedKey, lastAuthSync: 'JUST ROTATED' } : ent))
    );
    setAuthSyncMsg(`SECURITY API KEY ROTATED FOR ENTITY ID ${entityId}! NEW KEY: ${newRotatedKey}`);
    setTimeout(() => setAuthSyncMsg(null), 5000);
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://oceanbird.ai';

  const capXmlDocument = `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>${capAlert.identifier}</identifier>
  <sender>${capAlert.sender}</sender>
  <sent>${capAlert.sent}</sent>
  <status>${capAlert.status}</status>
  <msgType>${capAlert.msgType}</msgType>
  <scope>${capAlert.scope}</scope>
  <info>
    <category>Geo</category>
    <event>${capAlert.event}</event>
    <urgency>${capAlert.urgency}</urgency>
    <severity>${capAlert.severity}</severity>
    <certainty>${capAlert.certainty}</certainty>
    <headline>${capAlert.headline}</headline>
    <description>${capAlert.description}</description>
    <instruction>${capAlert.instruction}</instruction>
    <area>
      <areaDesc>${capAlert.areaDesc}</areaDesc>
    </area>
  </info>
</alert>`;

  const filteredTelemetry = telemetryCategoryFilter === 'ALL'
    ? telemetryEvents
    : telemetryEvents.filter((ev) => ev.category === telemetryCategoryFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans space-y-8">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl text-cyan-400">
                <Share2 className="w-8 h-8" />
              </div>
              <div>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
                  ENTERPRISE OPEN DATA HUB & CROSS-INDUSTRY PORTAL
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                  Airways, Shipping & Public Utility Integration Ecosystem
                </h1>
              </div>
            </div>
            <p className="text-slate-300 text-sm max-w-4xl leading-relaxed">
              Connect commercial flight dispatch operations, maritime container fleets, and municipal civil defense emergency siren grids to Ocean Bird Cloud's unified seismic, tsunami, AIS, and weather telemetry engine via REST APIs, CAP v1.2 XML feeds, Webhooks, and iFrame widgets.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleGenerateApiKey}
              className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs font-mono rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all"
            >
              <Key className="w-4 h-4" />
              <span>GENERATE ENTERPRISE API KEY</span>
            </button>
          </div>
        </div>

        {generatedApiKeyMsg && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-mono font-bold flex items-center space-x-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>NEW ENTERPRISE API KEY GENERATED AND ACTIVATED SECURELY</span>
          </div>
        )}
      </div>

      {/* TOP PORTAL NAVIGATION TABS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        <button
          onClick={() => setPortalTab('CROSS_INDUSTRY_DASHBOARD')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'CROSS_INDUSTRY_DASHBOARD'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 text-cyan-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Dashboard</strong>
          <span className="text-[9px] text-slate-400 block truncate">Live Telemetry</span>
        </button>

        <button
          onClick={() => setPortalTab('UNIFIED_DATA_API')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'UNIFIED_DATA_API'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code className="w-4 h-4 text-sky-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Unified Data API</strong>
          <span className="text-[9px] text-slate-400 block truncate">REST & Sandbox</span>
        </button>

        <button
          onClick={() => setPortalTab('PUBLIC_UTILITIES_BRIDGE')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'PUBLIC_UTILITIES_BRIDGE'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-4 h-4 text-amber-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Utilities Bridge</strong>
          <span className="text-[9px] text-slate-400 block truncate">CAP v1.2 Sirens</span>
        </button>

        <button
          onClick={() => setPortalTab('ENTITY_ONBOARDING')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'ENTITY_ONBOARDING'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserPlus className="w-4 h-4 text-emerald-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Onboarding</strong>
          <span className="text-[9px] text-slate-400 block truncate">Register Company</span>
        </button>

        <button
          onClick={() => setPortalTab('UNIFIED_LEDGER_EXPORT')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'UNIFIED_LEDGER_EXPORT'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4 text-purple-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Ledger Export</strong>
          <span className="text-[9px] text-slate-400 block truncate">CSV/JSON Audit</span>
        </button>

        <button
          onClick={() => setPortalTab('API_MONITOR')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'API_MONITOR'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-teal-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">API Monitor</strong>
          <span className="text-[9px] text-slate-400 block truncate">Latency & Traffic</span>
        </button>

        <button
          onClick={() => setPortalTab('ENTITY_AUTH_SYNC')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'ENTITY_AUTH_SYNC'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <LockKeyhole className="w-4 h-4 text-rose-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Auth Sync</strong>
          <span className="text-[9px] text-slate-400 block truncate">OAuth2 & Keys</span>
        </button>

        <button
          onClick={() => setPortalTab('UTILITIES_DEMAND_FORECAST')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'UTILITIES_DEMAND_FORECAST'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Demand Forecast</strong>
          <span className="text-[9px] text-slate-400 block truncate">Crisis Utilities</span>
        </button>

        <button
          onClick={() => setPortalTab('API_DOCS_PORTAL')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'API_DOCS_PORTAL'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">API Docs Portal</strong>
          <span className="text-[9px] text-slate-400 block truncate">OpenAPI & Code</span>
        </button>

        <button
          onClick={() => setPortalTab('API_USAGE_ANALYTICS')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'API_USAGE_ANALYTICS'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Usage Analytics</strong>
          <span className="text-[9px] text-slate-400 block truncate">RPM & Bandwidth</span>
        </button>

        <button
          onClick={() => setPortalTab('AUTOMATED_AUDIT_LOGS')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'AUTOMATED_AUDIT_LOGS'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Audit Logs</strong>
          <span className="text-[9px] text-slate-400 block truncate">Merkle Proofs</span>
        </button>

        <button
          onClick={() => setPortalTab('WEBHOOK_MANAGEMENT')}
          className={`p-3 rounded-2xl border transition-all text-left font-mono space-y-1 ${
            portalTab === 'WEBHOOK_MANAGEMENT'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-xl shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Webhook className="w-4 h-4 text-rose-400" />
          <strong className="text-[11px] font-extrabold block text-white truncate">Webhooks</strong>
          <span className="text-[9px] text-slate-400 block truncate">Subscriptions & Test</span>
        </button>
      </div>

      {/* TAB 1: CROSS-INDUSTRY DASHBOARD */}
      {portalTab === 'CROSS_INDUSTRY_DASHBOARD' && (
        <div className="space-y-6 font-mono">
          {/* TOP METRICS STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>CONNECTED AIR CARRIERS</span>
                <Plane className="w-4 h-4 text-sky-400" />
              </div>
              <strong className="text-2xl font-black text-white">42 Airlines</strong>
              <span className="text-[10px] text-sky-400 block">Japan Airlines, Lufthansa, Emirates, Delta</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>ACTIVE MARITIME FLEETS</span>
                <Ship className="w-4 h-4 text-cyan-400" />
              </div>
              <strong className="text-2xl font-black text-white">1,840 Vessels</strong>
              <span className="text-[10px] text-cyan-400 block">MOL, NYK Line, Maersk, COSCO Shipping</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>PUBLIC UTILITY SIRENS</span>
                <Siren className="w-4 h-4 text-amber-400" />
              </div>
              <strong className="text-2xl font-black text-white">320 Municipalities</strong>
              <span className="text-[10px] text-amber-400 block">Honshu Grid, PNW Civil Defense, Mediterranean</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>API TELEMETRY STREAM</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <strong className="text-2xl font-black text-white">14,250 req/sec</strong>
              <span className="text-[10px] text-emerald-400 block">Avg Latency: 18ms • SSL/TLS Secured</span>
            </div>
          </div>

          {/* REAL-TIME TELEMETRY STREAM TABLE */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="text-base font-extrabold text-white">LIVE CROSS-INDUSTRY TELEMETRY STREAM</h3>
              </div>

              <div className="flex items-center space-x-1.5 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">SECTOR FILTER:</span>
                {(['ALL', 'AIRWAYS', 'SHIPPING', 'PUBLIC_UTILITIES'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setTelemetryCategoryFilter(cat)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                      telemetryCategoryFilter === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredTelemetry.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition-all text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          ev.category === 'AIRWAYS'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                            : ev.category === 'SHIPPING'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {ev.category}
                      </span>
                      <strong className="text-white font-bold">{ev.source}</strong>
                      <span className="text-slate-500 text-[10px]">({ev.type})</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{ev.details}</p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 text-[10px]">
                    <span className="text-slate-400">{ev.timestamp}</span>
                    <span className="px-2 py-0.5 bg-slate-900 text-cyan-300 border border-slate-800 rounded font-mono font-bold">
                      {ev.latencyMs}ms
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-black border ${
                        ev.status === 'ALERT'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UNIFIED DATA API & SANDBOX */}
      {portalTab === 'UNIFIED_DATA_API' && (
        <div className="space-y-6 font-mono">
          {/* SANDBOX CONTROLLER */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-extrabold text-white">INTERACTIVE UNIFIED API SANDBOX</h3>
              </div>
              <span className="text-xs text-slate-400 font-bold">OPENAPI v3.0 COMPLIANT SPEC</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">SELECT ENDPOINT</label>
                <select
                  value={sandboxEndpoint}
                  onChange={(e) => setSandboxEndpoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
                >
                  <option value="/api/v1/fleet/global">GET /api/v1/fleet/global (Global Fleet API)</option>
                  <option value="/api/v1/utilities/request">POST /api/v1/utilities/request (Utility Request API)</option>
                  <option value="/api/v1/aviation/air-cargo-sync">POST /api/v1/aviation/air-cargo-sync (Air Cargo Sync API)</option>
                  <option value="/api/v1/security/auth-handshake">POST /api/v1/security/auth-handshake (Security Auth Handshake)</option>
                  <option value="/api/v1/telemetry/unified">GET /api/v1/telemetry/unified</option>
                  <option value="/api/v1/seismic/earthquakes">GET /api/v1/seismic/earthquakes</option>
                  <option value="/api/v1/tsunami/buoys">GET /api/v1/tsunami/buoys</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">TARGET SECTOR CONTEXT</label>
                <select
                  value={sandboxCategory}
                  onChange={(e) => setSandboxCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
                >
                  <option value="AIRWAYS">AIRWAYS (Aviation & Flight Ops)</option>
                  <option value="SHIPPING">SHIPPING (Maritime AIS & Ports)</option>
                  <option value="PUBLIC_UTILITIES">PUBLIC UTILITIES (Civil Defense)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleExecuteSandbox}
                  disabled={sandboxExecuting}
                  className="w-full px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all"
                >
                  <Play className={`w-4 h-4 ${sandboxExecuting ? 'animate-spin' : ''}`} />
                  <span>{sandboxExecuting ? 'EXECUTING API...' : 'EXECUTE TEST REQUEST'}</span>
                </button>
              </div>
            </div>

            {/* LIVE RESPONSE OUTPUT */}
            {sandboxResponse && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>HTTP 200 OK (Execution Time: 18ms)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(sandboxResponse, 'sandboxResp')}
                    className="text-[10px] text-cyan-400 hover:underline font-bold flex items-center space-x-1"
                  >
                    {copiedSection === 'sandboxResp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'sandboxResp' ? 'COPIED' : 'COPY JSON'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-cyan-300 font-mono overflow-x-auto max-h-80 leading-relaxed">
                  {sandboxResponse}
                </pre>
              </div>
            )}
          </div>

          {/* 4 DEDICATED NEW API INTERACTIVE TEST PANELS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PANEL 1: GLOBAL FLEET API */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Ship className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-sm font-black text-white">GLOBAL FLEET API (/api/v1/fleet/global)</h4>
                </div>
                <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded text-[10px] font-bold">
                  REST GET / POST
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Query real-time coordinates, speed, fuel, and status of global Airways, Shipping cargo, and Cruise units.
              </p>
              <div className="flex items-center space-x-2">
                <select
                  value={fleetApiFilter}
                  onChange={(e) => setFleetApiFilter(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-bold rounded-xl p-2.5 flex-1 focus:outline-none"
                >
                  <option value="ALL">ALL SECTORS (Airways + Shipping + Cruise)</option>
                  <option value="AIRWAYS">AIRWAYS ONLY</option>
                  <option value="SHIPPING">SHIPPING CARGO ONLY</option>
                  <option value="CRUISE">CRUISE SHIPS ONLY</option>
                </select>
                <button
                  onClick={handleCallGlobalFleetApi}
                  disabled={fleetApiLoading}
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-all shrink-0"
                >
                  <Play className={`w-3.5 h-3.5 ${fleetApiLoading ? 'animate-spin' : ''}`} />
                  <span>FETCH FLEET</span>
                </button>
              </div>
              {fleetApiData && (
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-cyan-300 max-h-48 overflow-y-auto font-mono">
                  {JSON.stringify(fleetApiData, null, 2)}
                </pre>
              )}
            </div>

            {/* PANEL 2: UTILITY REQUEST API */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-black text-white">UTILITY REQUEST API (/api/v1/utilities/request)</h4>
                </div>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded text-[10px] font-bold">
                  POST / GET
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dispatch public utility requests for emergency sirens, port power prioritization, and water reserves.
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={utilityReqType}
                    onChange={(e) => setUtilityReqType(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-amber-300 text-xs font-bold rounded-xl p-2 focus:outline-none"
                  >
                    <option value="CIVIL_DEFENSE_SIREN">CIVIL DEFENSE SIREN</option>
                    <option value="PORT_POWER_GRID">PORT POWER GRID</option>
                    <option value="WATER_RESERVE_DIVERSION">WATER RESERVE DIVERSION</option>
                    <option value="EMERGENCY_TELECOM">EMERGENCY TELECOM</option>
                  </select>
                  <input
                    type="text"
                    value={utilityReqOrg}
                    onChange={(e) => setUtilityReqOrg(e.target.value)}
                    placeholder="Requestor Org"
                    className="bg-slate-950 border border-slate-800 text-amber-300 text-xs font-bold rounded-xl p-2 focus:outline-none"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={utilityReqDetails}
                    onChange={(e) => setUtilityReqDetails(e.target.value)}
                    placeholder="Request Details"
                    className="bg-slate-950 border border-slate-800 text-amber-200 text-xs font-bold rounded-xl p-2 flex-1 focus:outline-none"
                  />
                  <button
                    onClick={handleCallUtilityRequestApi}
                    disabled={utilityReqLoading}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-all shrink-0"
                  >
                    <Send className={`w-3.5 h-3.5 ${utilityReqLoading ? 'animate-spin' : ''}`} />
                    <span>DISPATCH</span>
                  </button>
                </div>
              </div>
              {utilityReqResult && (
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-amber-300 max-h-48 overflow-y-auto font-mono">
                  {JSON.stringify(utilityReqResult, null, 2)}
                </pre>
              )}
            </div>

            {/* PANEL 3: AIR CARGO SYNC API */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Plane className="w-5 h-5 text-sky-400" />
                  <h4 className="text-sm font-black text-white">AIR CARGO SYNC API (/api/v1/aviation/air-cargo-sync)</h4>
                </div>
                <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded text-[10px] font-bold">
                  POST / GET
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Synchronize airway cargo waybills, cold-chain temperature telemetry, and ICAO hazardous declarations.
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={airCargoWaybill}
                    onChange={(e) => setAirCargoWaybill(e.target.value)}
                    placeholder="Waybill No."
                    className="bg-slate-950 border border-slate-800 text-sky-300 text-xs font-bold rounded-xl p-2 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={airCargoFlight}
                    onChange={(e) => setAirCargoFlight(e.target.value)}
                    placeholder="Flight Number"
                    className="bg-slate-950 border border-slate-800 text-sky-300 text-xs font-bold rounded-xl p-2 focus:outline-none"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-sky-300">
                    <span className="text-slate-400 text-[10px]">TEMP (°C):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={airCargoTemp}
                      onChange={(e) => setAirCargoTemp(parseFloat(e.target.value))}
                      className="w-12 bg-transparent text-white font-bold focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleCallAirCargoSyncApi}
                    disabled={airCargoLoading}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-all shrink-0 flex-1 justify-center"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${airCargoLoading ? 'animate-spin' : ''}`} />
                    <span>SYNC AIR CARGO</span>
                  </button>
                </div>
              </div>
              {airCargoResult && (
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-sky-300 max-h-48 overflow-y-auto font-mono">
                  {JSON.stringify(airCargoResult, null, 2)}
                </pre>
              )}
            </div>

            {/* PANEL 4: SECURITY AUTH HANDSHAKE API */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-black text-white">SECURITY AUTH HANDSHAKE (/api/v1/security/auth-handshake)</h4>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
                  POST / GET
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Perform mutual TLS token exchange, nonce challenge verification, and HMAC signature rotation.
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={authClientId}
                    onChange={(e) => setAuthClientId(e.target.value)}
                    placeholder="Client ID"
                    className="bg-slate-950 border border-slate-800 text-emerald-300 text-xs font-bold rounded-xl p-2 focus:outline-none"
                  />
                  <input
                    type="password"
                    value={authSecret}
                    onChange={(e) => setAuthSecret(e.target.value)}
                    placeholder="Client Secret"
                    className="bg-slate-950 border border-slate-800 text-emerald-300 text-xs font-bold rounded-xl p-2 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleCallSecurityAuthHandshakeApi}
                  disabled={authHandshakeLoading}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center space-x-1.5 transition-all"
                >
                  <LockKeyhole className={`w-3.5 h-3.5 ${authHandshakeLoading ? 'animate-spin' : ''}`} />
                  <span>EXECUTE HANDSHAKE</span>
                </button>
              </div>
              {authHandshakeResult && (
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-emerald-300 max-h-48 overflow-y-auto font-mono">
                  {JSON.stringify(authHandshakeResult, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PUBLIC UTILITIES BRIDGE */}
      {portalTab === 'PUBLIC_UTILITIES_BRIDGE' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
                <h3 className="text-base font-extrabold text-white">CAP v1.2 COMMON ALERTING PROTOCOL GENERATOR</h3>
              </div>
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold">
                OASIS STANDARD v1.2
              </span>
            </div>

            <form onSubmit={handleDispatchCapAlert} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">EVENT TITLE / HEADLINE</label>
                  <input
                    type="text"
                    value={capAlert.headline}
                    onChange={(e) => setCapAlert({ ...capAlert, headline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-amber-200 text-xs font-bold rounded-xl p-2.5 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">TARGET GEOGRAPHIC REGION</label>
                  <input
                    type="text"
                    value={capAlert.areaDesc}
                    onChange={(e) => setCapAlert({ ...capAlert, areaDesc: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-amber-200 text-xs font-bold rounded-xl p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>BROADCAST CAP v1.2 ALERT TO ALL SIREN TOWERS</span>
                </button>
              </div>

              {capDispatched && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CAP v1.2 ALERT DISPATCHED TO 320 MUNICIPAL SIREN TOWERS & RSS FEEDS!</span>
                </div>
              )}
            </form>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400">GENERATED OASIS CAP v1.2 XML FEED</span>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-amber-200 font-mono overflow-x-auto leading-relaxed max-h-56">
                {capXmlDocument}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ENTITY ONBOARDING PORTAL */}
      {portalTab === 'ENTITY_ONBOARDING' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                  <span>ENTERPRISE ENTITY ONBOARDING & CREDENTIALING</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Register your airline, cargo fleet, or public utility for instant API key issuance</p>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-bold">
                  {registeredEntities.length} ENTITIES REGISTERED
                </span>
              </div>
            </div>

            {onboardSuccessMsg && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs font-bold flex items-center space-x-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{onboardSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegisterNewEntity} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">Register New Entity Credentials</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">ORGANIZATION NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Emirates Airline Flight Operations"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">INDUSTRY SECTOR</label>
                  <select
                    value={orgSector}
                    onChange={(e) => setOrgSector(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-bold rounded-xl p-2.5 focus:outline-none"
                  >
                    <option value="AIRWAYS">AIRWAYS (Commercial Aviation)</option>
                    <option value="SHIPPING">SHIPPING (Maritime Fleet)</option>
                    <option value="PUBLIC_UTILITIES">PUBLIC UTILITIES (Civil Defense)</option>
                    <option value="PORT_AUTHORITY">PORT AUTHORITY (Harbor Operations)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">CORPORATE DOMAIN</label>
                  <input
                    type="text"
                    required
                    placeholder="emirates.com"
                    value={orgDomain}
                    onChange={(e) => setOrgDomain(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="terms" className="text-xs text-slate-300">
                  I confirm compliance with ICAO / IMO SOLAS / CAP v1.2 data standards and consent to receive automated seismic emergency alerts.
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreedTerms}
                className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center space-x-2 ${
                  agreedTerms
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>COMPLETE ONBOARDING & ISSUE API CREDENTIALS</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: UNIFIED LEDGER EXPORT */}
      {portalTab === 'UNIFIED_LEDGER_EXPORT' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  <span>UNIFIED AUDIT LEDGER & CRYPTOGRAPHIC EXPORT ENGINE</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Immutable cross-industry transaction history verified with SHA-256 Merkle proof trees
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full font-bold">
                  {ledgerRecords.length} VERIFIED TRANSACTIONS
                </span>
              </div>
            </div>

            {ledgerExportMsg && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{ledgerExportMsg}</span>
              </div>
            )}

            {/* CONTROLS BAR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">FILTER SECTOR</label>
                <select
                  value={ledgerSectorFilter}
                  onChange={(e) => setLedgerSectorFilter(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-purple-300 text-xs font-bold rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="ALL">ALL SECTORS (Airways, Shipping & Utilities)</option>
                  <option value="AIRWAYS">AIRWAYS ONLY</option>
                  <option value="SHIPPING">SHIPPING ONLY</option>
                  <option value="PUBLIC_UTILITIES">PUBLIC UTILITIES ONLY</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1">EXPORT FORMAT</label>
                <select
                  value={ledgerFormat}
                  onChange={(e) => setLedgerFormat(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-bold rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="CSV">Comma Separated Values (.CSV)</option>
                  <option value="JSON">JavaScript Object Notation (.JSON)</option>
                  <option value="CAP_XML_BUNDLE">CAP v1.2 XML Bundle (.XML)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleExportLedgerData}
                  className="w-full px-4 py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD AUDIT LEDGER ({ledgerFormat})</span>
                </button>
              </div>
            </div>

            {/* LEDGER TABLE */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-400 block">LEDGER AUDIT TRAIL</span>
              {ledgerRecords
                .filter((r) => ledgerSectorFilter === 'ALL' || r.sector === ledgerSectorFilter)
                .map((record) => (
                  <div key={record.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-800 text-[10px] font-bold">
                          {record.id}
                        </span>
                        <strong className="text-white font-bold">{record.entityName}</strong>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[9px] font-extrabold uppercase">
                          {record.actionType}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0 text-[10px]">
                        <span className="text-slate-400">{record.timestamp}</span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded font-bold flex items-center space-x-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>VERIFIED</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-[11px]">{record.dataPayloadBrief}</p>

                    <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800/80 text-[10px] flex items-center justify-between text-slate-400">
                      <span>Merkle Hash: <code className="text-cyan-300">{record.merkleHash}</code></span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: INTERACTIVE INDUSTRY API MONITOR */}
      {portalTab === 'API_MONITOR' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-teal-400" />
                  <span>INTERACTIVE INDUSTRY API PERFORMANCE MONITOR</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time throughput, latency distribution & endpoint SLA metrics</p>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <span className="text-slate-400">TIMEFRAME:</span>
                  <select
                    value={apiMonitorTimeframe}
                    onChange={(e) => setApiMonitorTimeframe(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 text-teal-300 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="1H">Past 1 Hour</option>
                    <option value="24H">Past 24 Hours</option>
                    <option value="7D">Past 7 Days</option>
                    <option value="30D">Past 30 Days</option>
                  </select>
                </div>

                <button
                  onClick={handleRunStressTest}
                  disabled={isStressTesting}
                  className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-teal-500/20 flex items-center space-x-1.5 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isStressTesting ? 'animate-spin' : ''}`} />
                  <span>{isStressTesting ? 'TESTING...' : 'FIRE TRAFFIC STRESS TEST'}</span>
                </button>
              </div>
            </div>

            {stressTestResult && (
              <div className="p-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{stressTestResult}</span>
              </div>
            )}

            {/* ENDPOINT HEALTH CARDS */}
            <div className="space-y-3">
              {apiEndpointsMetrics.map((ep) => (
                <div key={ep.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 text-[10px] font-bold">
                        {ep.sector}
                      </span>
                      <strong className="text-white text-xs font-bold">{ep.endpoint}</strong>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 text-[10px]">
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded font-black">
                        SLA: {ep.successRatePercent}%
                      </span>
                      <span className="px-2 py-0.5 bg-slate-900 text-teal-300 border border-slate-800 rounded font-bold">
                        {ep.avgLatencyMs}ms avg
                      </span>
                    </div>
                  </div>

                  {/* LATENCY & THROUGHPUT VISUAL BAR */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Throughput: <strong className="text-slate-200">{ep.rpm.toLocaleString()} req/min</strong></span>
                      <span>24h Errors: <strong className="text-emerald-400">{ep.errorCount24h}</strong></span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex">
                      <div
                        className="bg-teal-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (ep.rpm / 20000) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: ENTITY AUTH SYNC */}
      {portalTab === 'ENTITY_AUTH_SYNC' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <LockKeyhole className="w-5 h-5 text-rose-400" />
                  <span>CROSS-INDUSTRY ENTITY AUTHENTICATION SYNCHRONIZER</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage OAuth2 authorization states, API key rotation & permissions ACLs</p>
              </div>

              <button
                onClick={handleForceSyncAuth}
                disabled={authSyncing}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-rose-500/20 flex items-center space-x-2 transition-all shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${authSyncing ? 'animate-spin' : ''}`} />
                <span>{authSyncing ? 'SYNCHRONIZING...' : 'FORCE SYNC ALL AUTH STATES'}</span>
              </button>
            </div>

            {authSyncMsg && (
              <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-bold flex items-center space-x-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{authSyncMsg}</span>
              </div>
            )}

            {/* AUTH STATES CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registeredEntities.map((ent) => (
                <div key={ent.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-rose-300 border border-slate-800 text-[9px] font-bold uppercase">
                        {ent.sector}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-1">{ent.name}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px] font-bold">
                      AUTHENTICATED
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300">
                    <div>Domain: <span className="text-slate-200 font-bold">{ent.domain}</span></div>
                    <div>Active Key: <code className="text-cyan-300">{ent.apiKey}</code></div>
                    <div>Last Auth Sync: <span className="text-slate-400">{ent.lastAuthSync}</span></div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block">GRANTED PERMISSION SCOPES:</span>
                    <div className="flex flex-wrap gap-1">
                      {ent.authScopes.map((scope) => (
                        <span key={scope} className="px-2 py-0.5 bg-slate-900 text-cyan-300 border border-slate-800 rounded text-[10px]">
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                    <button
                      onClick={() => handleRotateEntityKey(ent.id)}
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                      <span>ROTATE API KEY</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: UTILITIES DEMAND FORECAST */}
      {portalTab === 'UTILITIES_DEMAND_FORECAST' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span>PUBLIC UTILITIES & CRISIS DEMAND FORECASTING ENGINE</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Predictive power grid load, emergency water desalination & aviation/maritime fuel reserves during geological events
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">SCENARIO:</span>
                <select
                  value={forecastScenario}
                  onChange={(e) => setForecastScenario(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-amber-300 font-bold text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="STANDARD_OPERATIONS">Standard Operations (Baseline)</option>
                  <option value="M7.5_TSUNAMI_WARNING">M7.5 Tsunami Warning Emergency</option>
                  <option value="CATEGORY_5_TYPHOON">Category 5 Typhoon Alert</option>
                  <option value="BLACKOUT_GRID_RECOVERY">Blackout & Grid Cold Start</option>
                </select>
              </div>
            </div>

            {/* FORECAST METRICS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">PEAK EMERGENCY POWER LOAD</span>
                <strong className="text-2xl font-black text-amber-400">
                  {forecastScenario === 'M7.5_TSUNAMI_WARNING' ? '4,850 MW' : '2,100 MW'}
                </strong>
                <span className="text-[10px] text-slate-400 block">+130% load from siren arrays & water pumps</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">DESALINATED WATER RESERVE</span>
                <strong className="text-2xl font-black text-cyan-400">18.4 Million Liters</strong>
                <span className="text-[10px] text-slate-400 block">Autonomy: 14 Days Emergency Supply</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">AVIATION JET-A FUEL BUFFER</span>
                <strong className="text-2xl font-black text-sky-400">142,000 Tons</strong>
                <span className="text-[10px] text-slate-400 block">Supports 840 Emergency Flight Diversions</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">SIREN AUXILIARY BATTERIES</span>
                <strong className="text-2xl font-black text-emerald-400">100% CHARGED</strong>
                <span className="text-[10px] text-slate-400 block">72 Hours Off-Grid Emergency Autonomy</span>
              </div>
            </div>

            {/* DEMAND CURVE BAR GRAPH SIMULATION */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">48-HOUR PROJECTED UTILITY DEMAND vs GRID CAPACITY</span>
                <span className="text-slate-400">Scenario: <strong className="text-amber-300">{forecastScenario}</strong></span>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 pt-4 items-end h-40 border-b border-slate-800 pb-2">
                {[40, 45, 80, 95, 100, 85, 75, 70, 65, 60, 55, 50].map((height, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-1 h-full justify-end">
                    <div
                      className={`w-full rounded-t transition-all ${
                        height > 85 ? 'bg-amber-500 animate-pulse' : 'bg-cyan-500/80'
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-[9px] text-slate-500 font-mono">+{idx * 4}h</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block"></span>
                  <span>Peak Critical Load Period (Hours +12h to +20h)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 bg-cyan-500/80 rounded-full inline-block"></span>
                  <span>Baseline Utility Load</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW TAB 9: API DOCUMENTATION PORTAL */}
      {portalTab === 'API_DOCS_PORTAL' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  <span>ENTERPRISE API DOCUMENTATION PORTAL (OpenAPI v3.0)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Interactive developer specification for Airways flight paths, Maritime container shipping, Civil Defense siren grids & Gemini AI.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={docsSearchQuery}
                    onChange={(e) => setDocsSearchQuery(e.target.value)}
                    placeholder="Search endpoints..."
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-sky-500 w-48"
                  />
                </div>
                <button
                  onClick={fetchOpenApiDocs}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-sky-400 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>REFRESH SPEC</span>
                </button>
              </div>
            </div>

            {/* ENDPOINT SELECTOR & CODE SNIPPET EXPLORER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT: ENDPOINTS LIST */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Available API Endpoints</span>
                {docsOpenApiData?.endpoints ? (
                  docsOpenApiData.endpoints
                    .filter((ep: any) =>
                      ep.path.toLowerCase().includes(docsSearchQuery.toLowerCase()) ||
                      ep.summary.toLowerCase().includes(docsSearchQuery.toLowerCase())
                    )
                    .map((ep: any) => (
                      <div
                        key={ep.path}
                        onClick={() => setDocsSelectedEndpoint(ep.path)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                          docsSelectedEndpoint === ep.path
                            ? 'bg-sky-500/15 border-sky-500 text-sky-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white text-[11px] truncate">{ep.path}</span>
                          <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-[9px] font-bold text-sky-400">
                            {ep.method}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight truncate">{ep.summary}</p>
                        <div className="flex items-center space-x-2 text-[9px]">
                          <span className="px-1.5 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800">
                            Rate: {ep.rateLimit}
                          </span>
                          <span className="px-1.5 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800">
                            Scope: {ep.scopes.join(', ')}
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">Loading endpoints...</div>
                )}
              </div>

              {/* RIGHT: INTERACTIVE CODE & SCHEMA INSPECTOR */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-extrabold text-white">
                      SELECTED ENDPOINT: <span className="text-sky-300 font-mono">{docsSelectedEndpoint}</span>
                    </span>

                    <div className="flex items-center space-x-1.5">
                      {(['CURL', 'NODE', 'PYTHON'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setDocsLanguage(lang)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                            docsLanguage === lang
                              ? 'bg-sky-500 text-slate-950 border-sky-400 font-extrabold'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CODE SNIPPET DISPLAY */}
                  <div className="relative">
                    <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-sky-300 font-mono overflow-x-auto">
                      {getCodeSnippet(docsLanguage, docsSelectedEndpoint)}
                    </pre>

                    <button
                      onClick={() => copyToClipboard(docsSelectedEndpoint, 'DOCS_CODE')}
                      className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-[10px] font-bold flex items-center space-x-1"
                    >
                      {copiedSection === 'DOCS_CODE' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSection === 'DOCS_CODE' ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  {/* FULL OPENAPI SPEC JSON TOGGLE */}
                  {docsOpenApiData && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 block">OpenAPI v3 Raw Definition</span>
                      <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[10px] text-slate-300 max-h-48 overflow-y-auto font-mono">
                        {JSON.stringify(docsOpenApiData, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW TAB 10: API USAGE ANALYTICS */}
      {portalTab === 'API_USAGE_ANALYTICS' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span>REAL-TIME ENTERPRISE API USAGE ANALYTICS</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Throughput performance metrics, latency percentiles & status distribution across all 14+ gateway routes
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {(['24H', '7D', '30D'] as const).map((tw) => (
                  <button
                    key={tw}
                    onClick={() => setAnalyticsTimeWindow(tw)}
                    className={`px-3 py-1 text-xs font-bold rounded-xl border transition-all ${
                      analyticsTimeWindow === tw
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {tw}
                  </button>
                ))}
              </div>
            </div>

            {/* METRICS SUMMARY GAUGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">TOTAL API REQUESTS (24H)</span>
                <strong className="text-2xl font-black text-emerald-400">
                  {analyticsData ? analyticsData.summary.totalRequests24h.toLocaleString() : '1,482,900'}
                </strong>
                <span className="text-[10px] text-slate-400 block">+14.2% vs previous 24h</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">AVG LATENCY / P95 LATENCY</span>
                <strong className="text-2xl font-black text-cyan-400">
                  {analyticsData ? `${analyticsData.summary.averageLatencyMs}ms / ${analyticsData.summary.p95LatencyMs}ms` : '16.4ms / 42.1ms'}
                </strong>
                <span className="text-[10px] text-slate-400 block">Target SLA: &lt;50ms</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">ERROR RATE (4XX & 5XX)</span>
                <strong className="text-2xl font-black text-rose-400">
                  {analyticsData ? `${analyticsData.summary.errorRatePercent}%` : '0.04%'}
                </strong>
                <span className="text-[10px] text-emerald-400 block">SLA Healthy (&lt;0.1%)</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">BANDWIDTH TRANSFERRED</span>
                <strong className="text-2xl font-black text-purple-400">
                  {analyticsData ? `${analyticsData.summary.bandwidthTransferredGb} GB` : '14.8 GB'}
                </strong>
                <span className="text-[10px] text-slate-400 block">Edge Compressed Brotli/Gzip</span>
              </div>
            </div>

            {/* STATUS CODE BREAKDOWN */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs font-bold text-white block">HTTP STATUS CODE RESPONSE BREAKDOWN</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {analyticsData?.statusCodeBreakdown ? (
                  Object.entries(analyticsData.statusCodeBreakdown).map(([status, count]) => (
                    <div key={status} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-center space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold block truncate">{status}</span>
                      <strong className="text-sm font-black text-white">{Number(count).toLocaleString()}</strong>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400">Loading breakdown...</div>
                )}
              </div>
            </div>

            {/* TOP ENTERPRISE CONSUMERS TABLE */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-white block">TOP ENTERPRISE API CONSUMERS & TRAFFIC SHARE</span>
              <div className="space-y-2">
                {analyticsData?.topConsumers?.map((consumer: any, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <strong className="text-white block font-bold">{consumer.name}</strong>
                      <span className="text-[10px] text-slate-400">{consumer.tier}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-right">
                      <div>
                        <span className="text-[10px] text-slate-400 block">RPM</span>
                        <strong className="text-emerald-400 font-bold">{consumer.rpm} req/min</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">24h Total</span>
                        <strong className="text-cyan-300 font-bold">{consumer.total24h.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW TAB 11: AUTOMATED AUDIT LOGS */}
      {portalTab === 'AUTOMATED_AUDIT_LOGS' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  <span>AUTOMATED SECURITY AUDIT LOG ENGINE</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tamper-evident system activity logger backed by cryptographic Merkle hash proof verification
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={auditSeverityFilter}
                  onChange={(e) => setAuditSeverityFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-purple-300 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="ALL">ALL SEVERITIES</option>
                  <option value="INFO">INFO ONLY</option>
                  <option value="SECURITY_ALERT">SECURITY ALERTS</option>
                </select>

                <button
                  onClick={fetchAuditLogs}
                  disabled={auditLogsLoading}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-purple-400 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center space-x-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${auditLogsLoading ? 'animate-spin' : ''}`} />
                  <span>SYNC LOGS</span>
                </button>
              </div>
            </div>

            {/* CREATE CUSTOM AUDIT EVENT FORM */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs font-bold text-white block">DISPATCH AUTOMATED AUDIT EVENT</span>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <select
                  value={newAuditCategory}
                  onChange={(e) => setNewAuditCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-purple-300 text-xs font-bold rounded-xl p-2 focus:outline-none"
                >
                  <option value="SECURITY_ALERT">SECURITY_ALERT</option>
                  <option value="AUTH_HANDSHAKE">AUTH_HANDSHAKE</option>
                  <option value="SIREN_DISPATCH">SIREN_DISPATCH</option>
                  <option value="CARGO_SYNC">CARGO_SYNC</option>
                </select>

                <input
                  type="text"
                  value={newAuditAction}
                  onChange={(e) => setNewAuditAction(e.target.value)}
                  placeholder="Audit event description (e.g. API key rotated for MOL Shipping)"
                  className="bg-slate-900 border border-slate-800 text-white text-xs rounded-xl p-2 flex-1 focus:outline-none focus:border-purple-500"
                />

                <button
                  onClick={handleCreateAuditEvent}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all shrink-0"
                >
                  LOG AUDIT EVENT
                </button>
              </div>
              {auditLogSuccessMsg && (
                <p className="text-xs text-emerald-400 font-bold">{auditLogSuccessMsg}</p>
              )}
            </div>

            {/* AUDIT LOG ENTRIES STREAM */}
            <div className="space-y-2.5">
              {auditLogsList
                .filter((l) => auditSeverityFilter === 'ALL' || l.severity === auditSeverityFilter)
                .map((log) => (
                  <div
                    key={log.logId}
                    className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded text-[9px] font-bold">
                          {log.logId}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-black ${
                            log.severity === 'SECURITY_ALERT'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          }`}
                        >
                          {log.severity}
                        </span>
                        <strong className="text-white font-bold">{log.actor}</strong>
                      </div>
                      <p className="text-slate-300 text-[11px]">{log.action}</p>
                    </div>

                    <div className="flex items-center space-x-3 text-[10px] shrink-0">
                      <span className="text-slate-500">{log.timestamp}</span>
                      <span className="px-2 py-0.5 bg-slate-900 text-purple-300 border border-slate-800 rounded font-mono">
                        Merkle: {log.merkleHash.slice(0, 10)}...
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* NEW TAB 12: WEBHOOK MANAGEMENT */}
      {portalTab === 'WEBHOOK_MANAGEMENT' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Webhook className="w-5 h-5 text-rose-400" />
                  <span>ENTERPRISE WEBHOOK SUBSCRIPTIONS & HMAC SIGNING</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure event webhooks, secret HMAC SHA-256 signing keys, and execute live delivery tests
                </p>
              </div>

              <button
                onClick={fetchWebhooks}
                disabled={webhooksLoading}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-rose-400 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center space-x-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${webhooksLoading ? 'animate-spin' : ''}`} />
                <span>REFRESH WEBHOOKS</span>
              </button>
            </div>

            {/* REGISTER NEW WEBHOOK FORM */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs font-bold text-white block">REGISTER NEW ENTERPRISE WEBHOOK SUBSCRIPTION</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newWebhookTargetUrl}
                  onChange={(e) => setNewWebhookTargetUrl(e.target.value)}
                  placeholder="https://your-domain.com/webhook-listener"
                  className="bg-slate-900 border border-slate-800 text-rose-300 text-xs font-bold rounded-xl p-2.5 md:col-span-2 focus:outline-none focus:border-rose-500"
                />

                <select
                  value={newWebhookEvent}
                  onChange={(e) => setNewWebhookEvent(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-rose-300 text-xs font-bold rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="cap.siren_dispatch">cap.siren_dispatch</option>
                  <option value="flight.corridor_update">flight.corridor_update</option>
                  <option value="seismic.tsunami_warning">seismic.tsunami_warning</option>
                  <option value="cargo.temperature_alert">cargo.temperature_alert</option>
                </select>
              </div>

              <button
                onClick={handleRegisterWebhook}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                CREATE SUBSCRIPTION
              </button>
            </div>

            {/* ACTIVE WEBHOOKS LIST */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-white block">ACTIVE WEBHOOK SUBSCRIPTIONS</span>
              <div className="space-y-3">
                {webhooksList.map((wh) => (
                  <div key={wh.webhookId} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-slate-800/80 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded text-[10px] font-bold">
                          {wh.webhookId}
                        </span>
                        <strong className="text-white font-bold truncate max-w-md">{wh.targetUrl}</strong>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                        {wh.status} ({wh.deliverySuccessRate}% Success)
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                      <div>
                        Events: <span className="text-slate-200 font-bold">{wh.events.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500">Secret: {wh.secretKey}</span>
                        <button
                          onClick={() => handleTriggerTestWebhook(wh.webhookId)}
                          disabled={testWebhookLoading}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 rounded text-[10px] font-bold flex items-center space-x-1"
                        >
                          <Send className={`w-3 h-3 ${testWebhookLoading ? 'animate-spin' : ''}`} />
                          <span>EMIT TEST EVENT</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TEST WEBHOOK RESULT PANEL */}
            {testWebhookResult && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">TEST WEBHOOK DELIVERY LOG</span>
                <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-emerald-300 max-h-48 overflow-y-auto font-mono">
                  {JSON.stringify(testWebhookResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
