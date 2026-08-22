import React, { useState, useMemo } from 'react';
import fishermenTrawlerImg from '../assets/images/fishermen_trawler_ocean_1785486842546.jpg';
import {
  POTENTIAL_FISHING_ZONES,
  FISH_MARKET_RATES,
  FISHERMEN_SAFETY_ADVISORIES,
} from '../data/southAsiaData';
import {
  WORLDWIDE_FISHERIES_PORTS,
  GLOBAL_SEAFOOD_MARKETS,
  GLOBAL_FISHERIES_TRADE_REPORTS,
  GLOBAL_TRADE_DATE_ANALYTICS,
  PORT_INVENTORY_DATA,
  AUTOMATED_REPORT_SCHEDULES,
  GLOBAL_MARKET_SYNC_FEEDS,
  SAMPLE_COMPLIANCE_PRESETS,
  INITIAL_B2B_CONTRACTS,
  TradeDateAnalyticsPoint,
} from '../data/worldwideFisheriesData';
import {
  WorldwideFisheriesPort,
  GlobalSeafoodMarketAndTrade,
  GlobalFisheriesTradeReport,
  PortInventoryStock,
  AutomatedTradeReportConfig,
  GlobalMarketSyncFeed,
  TradeComplianceCheckRequest,
  TradeComplianceResult,
  B2bSeafoodContract,
} from '../types';
import { FisheriesGisMapOverlay } from './FisheriesGisMapOverlay';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  Fish,
  Compass,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Anchor,
  ShieldAlert,
  ThermometerSun,
  Waves,
  Zap,
  Calculator,
  CheckCircle2,
  Globe,
  Globe2,
  FileText,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  Building2,
  BarChart3,
  Scale,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Ship,
  ExternalLink,
  Layers,
  Award,
  Box,
  Calendar,
  FileSpreadsheet,
  Printer,
  Map as MapIcon,
  RefreshCw,
  Radio,
  Warehouse,
  Send,
  Clock,
  CheckCircle,
  Play,
  RotateCcw,
  Sliders,
  ShieldCheck,
  FileCheck2,
  FileSignature,
  XCircle,
  AlertCircle,
  Plus,
} from 'lucide-react';

export const FisheriesAndSeaHubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'global-ports'
    | 'gis-map'
    | 'compliance-ai'
    | 'trade-visualizer'
    | 'contract-export'
    | 'port-inventory'
    | 'global-market-sync'
    | 'import-export'
    | 'automated-reports'
    | 'trade-analytics'
    | 'global-markets'
    | 'pfz'
    | 'local-market'
    | 'safety'
    | 'calculator'
  >('global-ports');

  // --- TAB 1: WORLDWIDE PORTS STATE ---
  const [portContinentFilter, setPortContinentFilter] = useState<string>('ALL');
  const [portSearchTerm, setPortSearchTerm] = useState<string>('');
  const [portSortBy, setPortSortBy] = useState<'volume' | 'value' | 'vessels'>('value');
  const [selectedPortDetail, setSelectedPortDetail] = useState<WorldwideFisheriesPort | null>(null);

  // --- TAB 2: IMPORT/EXPORT REPORTS STATE ---
  const [selectedReportId, setSelectedReportId] = useState<string>(GLOBAL_FISHERIES_TRADE_REPORTS[0].id);
  const [copiedReportMsg, setCopiedReportMsg] = useState<boolean>(false);

  // --- TAB 3: TRADE DATE ANALYTICS STATE ---
  const [analyticsStartDate, setAnalyticsStartDate] = useState<string>('2024 Q1');
  const [analyticsEndDate, setAnalyticsEndDate] = useState<string>('2026 Q3');
  const [analyticsMetric, setAnalyticsMetric] = useState<'value' | 'volume' | 'species'>('value');

  // --- TAB 4: GLOBAL MARKETS STATE ---
  const [marketCategoryFilter, setMarketCategoryFilter] = useState<string>('ALL');
  const [marketSearchTerm, setMarketSearchTerm] = useState<string>('');

  // --- FEATURE 1: GLOBAL MARKET SYNC STATE ---
  const [syncFeeds, setSyncFeeds] = useState<GlobalMarketSyncFeed[]>(GLOBAL_MARKET_SYNC_FEEDS);
  const [isSyncingMarkets, setIsSyncingMarkets] = useState<boolean>(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);

  // --- FEATURE 2: PORT INVENTORY TRACKER STATE ---
  const [inventorySearchTerm, setInventorySearchTerm] = useState<string>('');
  const [inventoryStatusFilter, setInventoryStatusFilter] = useState<string>('ALL');
  const [selectedInventoryPort, setSelectedInventoryPort] = useState<PortInventoryStock | null>(null);

  // --- FEATURE 3: AUTOMATED TRADE REPORTS STATE ---
  const [reportSchedules, setReportSchedules] = useState<AutomatedTradeReportConfig[]>(AUTOMATED_REPORT_SCHEDULES);
  const [isGeneratingDispatch, setIsGeneratingDispatch] = useState<boolean>(false);
  const [generatedDispatchOutput, setGeneratedDispatchOutput] = useState<string | null>(null);

  // --- FEATURE 4: TRADE COMPLIANCE AI STATE ---
  const [complianceForm, setComplianceForm] = useState<TradeComplianceCheckRequest>(SAMPLE_COMPLIANCE_PRESETS[0]);
  const [complianceResult, setComplianceResult] = useState<TradeComplianceResult | null>(null);
  const [isAuditingCompliance, setIsAuditingCompliance] = useState<boolean>(false);

  // --- FEATURE 5: CONTRACT EXPORT TOOL STATE ---
  const [b2bContracts, setB2bContracts] = useState<B2bSeafoodContract[]>(INITIAL_B2B_CONTRACTS);
  const [selectedContract, setSelectedContract] = useState<B2bSeafoodContract>(INITIAL_B2B_CONTRACTS[0]);
  const [copiedContractMsg, setCopiedContractMsg] = useState<boolean>(false);

  // --- FEATURE 6: TRADE DATA VISUALIZER STATE ---
  const [visualizerMetric, setVisualizerMetric] = useState<'value' | 'volume' | 'price' | 'tariff'>('value');

  // --- TAB 8: CALCULATOR STATE ---
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(FISH_MARKET_RATES[0].id);
  const [catchWeightKg, setCatchWeightKg] = useState<number>(150);
  const [dieselLiters, setDieselLiters] = useState<number>(60);
  const [dieselPricePerLiter, setDieselPricePerLiter] = useState<number>(92);

  const selectedFish = FISH_MARKET_RATES.find((f) => f.id === selectedSpeciesId) || FISH_MARKET_RATES[0];
  const grossRevenueLocal = catchWeightKg * selectedFish.pricePerKgLocalCurrency;
  const dieselCostLocal = dieselLiters * dieselPricePerLiter;
  const netProfitLocal = grossRevenueLocal - dieselCostLocal;
  const netProfitUSD = (
    netProfitLocal / (grossRevenueLocal / (catchWeightKg * selectedFish.pricePerKgUSD || 1))
  ).toFixed(2);

  // Filtered Ports
  const filteredPorts = WORLDWIDE_FISHERIES_PORTS.filter((p) => {
    const matchesContinent = portContinentFilter === 'ALL' || p.continent === portContinentFilter;
    const matchesSearch =
      p.portName.toLowerCase().includes(portSearchTerm.toLowerCase()) ||
      p.cityName.toLowerCase().includes(portSearchTerm.toLowerCase()) ||
      p.country.toLowerCase().includes(portSearchTerm.toLowerCase()) ||
      p.primarySpecies.some((s) => s.toLowerCase().includes(portSearchTerm.toLowerCase())) ||
      p.oceanBasin.toLowerCase().includes(portSearchTerm.toLowerCase());
    return matchesContinent && matchesSearch;
  }).sort((a, b) => {
    if (portSortBy === 'volume') return b.annualCatchVolumeMT - a.annualCatchVolumeMT;
    if (portSortBy === 'vessels') return b.registeredVesselsCount - a.registeredVesselsCount;
    return b.annualSeafoodTradeUSD - a.annualSeafoodTradeUSD;
  });

  // Filtered Global Markets
  const filteredMarkets = GLOBAL_SEAFOOD_MARKETS.filter((m) => {
    const matchesCategory = marketCategoryFilter === 'ALL' || m.category === marketCategoryFilter;
    const matchesSearch =
      m.speciesName.toLowerCase().includes(marketSearchTerm.toLowerCase()) ||
      m.scientificName.toLowerCase().includes(marketSearchTerm.toLowerCase()) ||
      m.primaryExportingCountries.some((c) => c.toLowerCase().includes(marketSearchTerm.toLowerCase())) ||
      m.primaryImportingCountries.some((c) => c.toLowerCase().includes(marketSearchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Filtered Port Inventories
  const filteredInventories = PORT_INVENTORY_DATA.filter((inv) => {
    const matchesStatus = inventoryStatusFilter === 'ALL' || inv.warehouseStatus === inventoryStatusFilter;
    const matchesSearch =
      inv.portName.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
      inv.cityName.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
      inv.country.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
      inv.speciesBreakdown.some((s) => s.species.toLowerCase().includes(inventorySearchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Filtered Trade Date Analytics Time Series
  const filteredAnalyticsData = useMemo(() => {
    const startIndex = GLOBAL_TRADE_DATE_ANALYTICS.findIndex((p) => p.period === analyticsStartDate);
    const endIndex = GLOBAL_TRADE_DATE_ANALYTICS.findIndex((p) => p.period === analyticsEndDate);

    const start = startIndex >= 0 ? startIndex : 0;
    const end = endIndex >= 0 ? endIndex : GLOBAL_TRADE_DATE_ANALYTICS.length - 1;

    return GLOBAL_TRADE_DATE_ANALYTICS.slice(Math.min(start, end), Math.max(start, end) + 1);
  }, [analyticsStartDate, analyticsEndDate]);

  // Active Report
  const activeReport =
    GLOBAL_FISHERIES_TRADE_REPORTS.find((r) => r.id === selectedReportId) || GLOBAL_FISHERIES_TRADE_REPORTS[0];

  // --- ACTIONS ---
  const handleTriggerMarketSync = () => {
    setIsSyncingMarkets(true);
    setSyncSuccessMsg(null);

    setTimeout(() => {
      setIsSyncingMarkets(false);
      setSyncSuccessMsg('Global Seafood B2B Exchanges Synced! Updated 14,310 Commodity Live Bids.');
      setSyncFeeds((prev) =>
        prev.map((f) => ({
          ...f,
          lastSyncedAt: 'Just Now',
          latencyMs: Math.floor(Math.random() * 30) + 18,
          activeListingsCount: f.activeListingsCount + Math.floor(Math.random() * 25),
        }))
      );
      setTimeout(() => setSyncSuccessMsg(null), 4000);
    }, 1200);
  };

  const handleGenerateAutomatedDispatch = () => {
    setIsGeneratingDispatch(true);
    setGeneratedDispatchOutput(null);

    setTimeout(() => {
      setIsGeneratingDispatch(false);
      const timestamp = new Date().toISOString();
      const output = `[AUTOMATED AI TRADE DISPATCH GENERATED - ${timestamp}]
AUTHORITY   : IMO / FAO GLOBAL MARITIME NETWORK
SCOPE       : AUTOMATED REAL-TIME PRICE & CATCH DISPATCH

SUMMARY ANALYSIS:
- Global Seafood Export Momentum: Strong (+7.4% YoY Q3 2026 forecast)
- Primary Volume Leader: Farmed Vannamei Shrimp (1.46M MT) & Atlantic Salmon (1.08M MT)
- High-Value Sashimi Index: Tokyo Toyosu Super-Frozen Bluefin Tuna steady at $24.50 USD/kg
- Cold Logistics Alert: Peru Chimbote Anchoveta Silos operating at 92% capacity
- IUU Compliance Audit: Tier 1 (SIMP & EU Traceability Verified)

DISPATCH DISTRIBUTION COMPLETE TO 12 REGISTERED MARITIME ENDPOINTS.`;

      setGeneratedDispatchOutput(output);
      setReportSchedules((prev) =>
        prev.map((s) => ({
          ...s,
          lastGeneratedTimestamp: timestamp,
          generatedReportCount: s.generatedReportCount + 1,
        }))
      );
    }, 1500);
  };

  // --- HANDLER FOR TRADE COMPLIANCE AI ---
  const handleRunComplianceAudit = (reqData: TradeComplianceCheckRequest = complianceForm) => {
    setIsAuditingCompliance(true);
    setComplianceResult(null);

    setTimeout(() => {
      setIsAuditingCompliance(false);

      const hasMissingCert = !reqData.hasSimpApproval || !reqData.hasEuCatchCert;
      const score = hasMissingCert ? (reqData.hasEuCatchCert ? 68 : 38) : 98;
      const riskLevel: 'LOW_RISK_APPROVED' | 'MODERATE_RISK_AUDIT' | 'HIGH_RISK_REJECTED' =
        score >= 90 ? 'LOW_RISK_APPROVED' : score >= 60 ? 'MODERATE_RISK_AUDIT' : 'HIGH_RISK_REJECTED';

      const estTariffPct = reqData.exporterCountry === 'Peru' && reqData.importerCountry === 'United States' ? 0.0 : 4.5;
      const dutyUSD = (reqData.declaringValueUSD * estTariffPct) / 100;

      const flagged: string[] = [];
      if (!reqData.hasSimpApproval) flagged.push('SIMP (US Seafood Import Monitoring Program) harvest audit trail missing.');
      if (!reqData.hasEuCatchCert) flagged.push('EU Catch Certificate digital signature key unverified.');
      if (reqData.quantityMT > 100) flagged.push('High-volume consignment (>100 MT) triggers mandatory port cold storage inspection.');

      const actions: string[] = [];
      if (score >= 90) {
        actions.push('Clear for immediate customs clearance and green lane port dispatch.');
        actions.push('Issue Automated Customs Digital Audit Badge #IMO-2026-GREEN.');
      } else {
        actions.push('Upload verified SIMP harvest declaration before vessel arrival.');
        actions.push('Request secondary health certificate from exporting port authority.');
      }

      setComplianceResult({
        overallRiskLevel: riskLevel,
        complianceScorePct: score,
        iuuStatus: 'CLEARED - Vessel IMO matches authorized RFMO fishing fleet database.',
        simpStatus: reqData.hasSimpApproval ? 'VERIFIED_OK' : 'MISSING_ACTION_REQUIRED',
        euCertStatus: reqData.hasEuCatchCert ? 'VALIDATED_DIGITAL_STAMP' : 'REQUIRES_REVERIFICATION',
        tariffEstimatePct: estTariffPct,
        estimatedTariffUSD: dutyUSD,
        spsHealthCheck: reqData.hasHealthCertificate ? 'PASSED - Cold Chain Log -20°C Compliant' : 'PENDING_PORT_LAB',
        flaggedRisks: flagged.length > 0 ? flagged : ['None. Full regulatory compliance achieved.'],
        recommendedActions: actions,
        auditRefCode: `AUD-AI-${Math.floor(100000 + Math.random() * 900000)}`,
        generatedAt: new Date().toISOString()
      });
    }, 1200);
  };

  // --- HANDLERS FOR B2B CONTRACT EXPORT TOOL ---
  const handleCopyContractText = () => {
    const text = `================================================================================
B2B INTERNATIONAL SEAFOOD SALES CONTRACT
Contract ID: ${selectedContract.contractId}
Date       : ${selectedContract.createdDate}
Status     : ${selectedContract.status}
================================================================================

1. PARTIES TO CONTRACT:
   SELLER: ${selectedContract.sellerCompany} (${selectedContract.sellerCountry})
   BUYER : ${selectedContract.buyerCompany} (${selectedContract.buyerCountry})

2. COMMODITY & SPECIFICATIONS:
   Species / Grade  : ${selectedContract.speciesGrade}
   Processing Format: ${selectedContract.processingFormat}
   Total Quantity   : ${selectedContract.quantityMT} Metric Tons
   Storage Temp Req : ${selectedContract.storageTempReqC}°C

3. FINANCIAL & COMMERCIAL TERMS:
   Incoterm 2020    : ${selectedContract.incoterm}
   Unit Price       : $${selectedContract.pricePerKgUSD.toFixed(2)} USD / kg
   Total Value      : $${selectedContract.totalContractValueUSD.toLocaleString()} USD
   Payment Terms    : ${selectedContract.paymentTerms}

4. LOGISTICS & DISCHARGE:
   Port of Loading  : ${selectedContract.portOfLoading}
   Port of Discharge: ${selectedContract.portOfDischarge}
   Shipment Window  : ${selectedContract.shipmentWindowStart} to ${selectedContract.shipmentWindowEnd}

5. GOVERNING LAW & ARBITRATION:
   Jurisdiction     : ${selectedContract.governingLaw}
================================================================================`;

    navigator.clipboard.writeText(text);
    setCopiedContractMsg(true);
    setTimeout(() => setCopiedContractMsg(false), 3000);
  };

  const handleDownloadContractJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedContract, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${selectedContract.contractId}_official_contract.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // --- EXPORT HANDLERS ---
  const handleCopyReportText = () => {
    const reportText = `[IMO / FAO WORLDWIDE FISHERIES TRADE BULLETIN]
REPORT TITLE: ${activeReport.reportTitle}
PERIOD      : ${activeReport.reportingPeriod}
SCOPE       : ${activeReport.regionScope}

TRADE BALANCE METRICS:
• Export Volume: ${activeReport.exportVolumeMT.toLocaleString()} MT ($${(activeReport.exportValueUSD / 1e9).toFixed(2)} Billion USD)
• Import Volume: ${activeReport.importVolumeMT.toLocaleString()} MT ($${(activeReport.importValueUSD / 1e9).toFixed(2)} Billion USD)
• IUU Rating   : ${activeReport.iuuComplianceRating}

TOP EXPORTERS:
${activeReport.topExporters.map((e) => `  - ${e.flag} ${e.country}: ${e.sharePct}% ($${(e.valueUSD / 1e9).toFixed(2)}B USD)`).join('\n')}

TOP IMPORTERS:
${activeReport.topImporters.map((i) => `  - ${i.flag} ${i.country}: ${i.sharePct}% ($${(i.valueUSD / 1e9).toFixed(2)}B USD)`).join('\n')}

MAJOR TRADED SPECIES:
${activeReport.majorTradedSpecies.map((s) => `  - ${s.species}: ${s.volumeMT.toLocaleString()} MT (Avg $${s.avgPricePerKgUSD.toFixed(2)} USD/kg)`).join('\n')}

SUSTAINABILITY & TRADE POLICY:
${activeReport.sustainabilityOverview}
${activeReport.tradeTariffAndPolicyInsight}`;

    navigator.clipboard.writeText(reportText);
    setCopiedReportMsg(true);
    setTimeout(() => setCopiedReportMsg(false), 3000);
  };

  const handleExportReportCSV = () => {
    const headers = ['Report Title', 'Reporting Period', 'Region Scope', 'Export Volume (MT)', 'Export Value (USD)', 'Import Volume (MT)', 'Import Value (USD)', 'IUU Rating'];
    const row = [
      `"${activeReport.reportTitle}"`,
      `"${activeReport.reportingPeriod}"`,
      `"${activeReport.regionScope}"`,
      activeReport.exportVolumeMT,
      activeReport.exportValueUSD,
      activeReport.importVolumeMT,
      activeReport.importValueUSD,
      `"${activeReport.iuuComplianceRating}"`
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), row.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${activeReport.id}_trade_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportReportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activeReport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${activeReport.id}_trade_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportPortDatabaseCSV = () => {
    const headers = [
      'Port Name',
      'City',
      'Country',
      'Continent',
      'Ocean Basin',
      'UN LOCODE',
      'Annual Catch Volume (MT)',
      'Annual Trade Value (USD)',
      'Registered Vessels',
      'Cold Storage Capacity (MT)',
      'Primary Species'
    ];

    const rows = filteredPorts.map((p) => [
      `"${p.portName}"`,
      `"${p.cityName}"`,
      `"${p.country}"`,
      `"${p.continent}"`,
      `"${p.oceanBasin}"`,
      `"${p.unLocode}"`,
      p.annualCatchVolumeMT,
      p.annualSeafoodTradeUSD,
      p.registeredVesselsCount,
      p.coldStorageCapacityMT,
      `"${p.primarySpecies.join('; ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'global_fisheries_ports_database.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="fisheries-and-sea-hub-view" className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 rounded-2xl p-6 border border-cyan-900/50 shadow-2xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>GEOGRAPHICALLY WORLDWIDE FISHERIES, PORTS, MARKETS & TRADE INTELLIGENCE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center space-x-3">
              <span>Worldwide Fisheries Ports & Global Trade Portal</span>
            </h1>
            <p className="text-slate-300 text-sm">
              Global directory of major international fisheries ports, real-time GIS map overlays, time-series trade date analytics, wholesale market prices, live exchange market sync, port inventory cold storage trackers, and automated trade report generation across all continents.
            </p>
          </div>

          <div className="relative w-full lg:w-72 h-36 rounded-xl overflow-hidden border border-cyan-500/30 shrink-0 shadow-lg group">
            <img
              src={fishermenTrawlerImg}
              alt="Worldwide Commercial Fishing Fleet Trawler"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Worldwide Fishing Fleet</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/30 text-cyan-300 text-[9px] font-bold">
                  GLOBAL FAO FEED
                </span>
              </div>
              <p className="text-[10px] text-cyan-200">Live GIS Map & Trade Analytics Stream</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('global-ports')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'global-ports'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>Worldwide Ports ({WORLDWIDE_FISHERIES_PORTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gis-map')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'gis-map'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-4 h-4 text-emerald-400" />
              <span>GIS Map & Warehouses</span>
            </button>

            <button
              onClick={() => setActiveTab('compliance-ai')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'compliance-ai'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span>Trade Compliance AI</span>
            </button>

            <button
              onClick={() => setActiveTab('trade-visualizer')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'trade-visualizer'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieChart className="w-4 h-4 text-cyan-300" />
              <span>Trade Data Visualizer</span>
            </button>

            <button
              onClick={() => setActiveTab('contract-export')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'contract-export'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSignature className="w-4 h-4 text-purple-300" />
              <span>Contract Export Tool</span>
            </button>

            <button
              onClick={() => setActiveTab('port-inventory')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'port-inventory'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Warehouse className="w-4 h-4 text-amber-400" />
              <span>Port Inventory Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('global-market-sync')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'global-market-sync'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Global Market Sync</span>
            </button>

            <button
              onClick={() => setActiveTab('import-export')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'import-export'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Import & Export Data Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('automated-reports')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'automated-reports'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Automated Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('trade-analytics')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'trade-analytics'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Trade Date Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('global-markets')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'global-markets'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Markets & Pricing ({GLOBAL_SEAFOOD_MARKETS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pfz')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'pfz'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Satellite PFZ</span>
            </button>

            <button
              onClick={() => setActiveTab('local-market')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'local-market'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Auction Rates</span>
            </button>

            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'safety'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>EEZ & Swell Safety</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Profit Estimator</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: WORLDWIDE GEOGRAPHICAL FISHERIES PORTS DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'global-ports' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
                  <Anchor className="w-4 h-4 text-cyan-400" />
                  <span>INTERNATIONAL COMMERCIAL FISHING HARBORS & PROCESSING HUBS</span>
                </div>
                <h2 className="text-xl font-bold text-white">Geographically Worldwide Fisheries Ports Directory</h2>
                <p className="text-xs text-slate-300">
                  Comprehensive intelligence across premier fisheries ports in North America, South America, Europe, Africa, Asia, Oceania, and the Middle East.
                </p>
              </div>

              {/* CSV Export & Quick Stat Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExportPortDatabaseCSV}
                  className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold rounded-xl transition-all flex items-center space-x-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Export Database CSV</span>
                </button>

                <div className="flex items-center space-x-3 text-xs bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 shrink-0 font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Landing Vol</span>
                    <span className="text-cyan-300 font-bold">13.8M MT</span>
                  </div>
                  <div className="border-r border-slate-800 h-6"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Trade Value</span>
                    <span className="text-emerald-400 font-bold">$31.2B USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-xs">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search port name, country, species, or ocean..."
                  value={portSearchTerm}
                  onChange={(e) => setPortSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              {/* Continent Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={portContinentFilter}
                  onChange={(e) => setPortContinentFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-bold focus:outline-none"
                >
                  <option value="ALL">🌍 All Continents</option>
                  <option value="Asia">🌏 Asia</option>
                  <option value="Europe">🌍 Europe</option>
                  <option value="North America">🌎 North America</option>
                  <option value="South America">🌎 South America</option>
                  <option value="Africa">🌍 Africa</option>
                  <option value="Oceania">🌏 Oceania</option>
                  <option value="Middle East">🕌 Middle East</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold shrink-0">Sort:</span>
                <select
                  value={portSortBy}
                  onChange={(e) => setPortSortBy(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-bold focus:outline-none"
                >
                  <option value="value">💵 Highest Seafood Trade Value ($ USD)</option>
                  <option value="volume">⚓ Largest Catch Landing Volume (MT)</option>
                  <option value="vessels">🚢 Most Registered Fleet Vessels</option>
                </select>
              </div>
            </div>
          </div>

          {/* Worldwide Ports Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPorts.map((port) => (
              <div
                key={port.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{port.countryFlag}</span>
                        <span className="text-xs text-slate-400 font-bold uppercase">{port.country} • {port.continent}</span>
                      </div>
                      <h3 className="font-extrabold text-base text-white mt-0.5 leading-snug group-hover:text-cyan-300 transition-colors">
                        {port.portName}
                      </h3>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        LOCODE: {port.unLocode} • {port.oceanBasin}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px] border border-cyan-500/30 shrink-0 font-mono">
                      {port.cityName}
                    </span>
                  </div>

                  {/* Key Numerical Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Annual Trade Value</span>
                      <div className="font-mono text-emerald-400 font-black text-sm">
                        ${(port.annualSeafoodTradeUSD / 1e6).toLocaleString()} M USD
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">Catch Landing Vol</span>
                      <div className="font-mono text-cyan-300 font-black text-sm">
                        {(port.annualCatchVolumeMT / 1000).toLocaleString()}k Metric Tons
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">Registered Fleet</span>
                      <div className="font-mono text-white font-bold flex items-center space-x-1">
                        <Ship className="w-3.5 h-3.5 text-slate-400" />
                        <span>{port.registeredVesselsCount.toLocaleString()} Vessels</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block">Cold Storage Cap</span>
                      <div className="font-mono text-amber-300 font-bold">
                        {(port.coldStorageCapacityMT / 1000).toLocaleString()}k MT
                      </div>
                    </div>
                  </div>

                  {/* Primary Target Species */}
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center justify-between">
                      <span>Primary Landed Species</span>
                      <span className="text-cyan-400">{port.processingPlantsCount} Processing Plants</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {port.primarySpecies.slice(0, 4).map((sp, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-950 text-cyan-200 px-2 py-0.5 rounded border border-slate-800"
                        >
                          🐟 {sp}
                        </span>
                      ))}
                      {port.primarySpecies.length > 4 && (
                        <span className="text-[10px] text-slate-400 font-mono py-0.5">
                          +{port.primarySpecies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Certifications & Auction */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Auction Format:</span>
                      <span className="text-amber-300 font-bold">{port.auctionType}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] text-slate-400 overflow-x-auto">
                      <Award className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{port.sustainabilityCertifications.join(' • ')}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 font-mono">
                    📍 {port.lat.toFixed(2)}°N, {port.lng.toFixed(2)}°E
                  </span>

                  <button
                    onClick={() => setSelectedPortDetail(port)}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
                  >
                    <span>Inspect Port Data</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE GIS TRADE MAP OVERLAY */}
      {/* ========================================================================= */}
      {activeTab === 'gis-map' && (
        <FisheriesGisMapOverlay
          ports={filteredPorts}
          pfzZones={POTENTIAL_FISHING_ZONES}
          safetyAdvisories={FISHERMEN_SAFETY_ADVISORIES}
          onSelectPort={(port) => setSelectedPortDetail(port)}
        />
      )}

      {/* ========================================================================= */}
      {/* FEATURE: TRADE COMPLIANCE AI INSPECTOR */}
      {/* ========================================================================= */}
      {activeTab === 'compliance-ai' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-5 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>AI CUSTOMS & MARITIME TRADE COMPLIANCE ENGINE</span>
                </div>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  Automated Seafood Consignment Compliance AI Inspector
                </h2>
                <p className="text-xs text-slate-300">
                  Instant AI verification against global RFMO vessel blacklists, US SIMP traceability, EU Catch Certificates, CITES endangered species permits, and tariff schedules.
                </p>
              </div>

              {/* Sample Presets */}
              <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs shrink-0">
                <span className="text-slate-400 text-[10px] font-bold uppercase px-1">Presets:</span>
                {SAMPLE_COMPLIANCE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setComplianceForm(preset);
                      handleRunComplianceAudit(preset);
                    }}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono text-[11px] rounded-lg border border-slate-700 transition-all flex items-center space-x-1"
                  >
                    <span>{preset.exporterCountry} → {preset.importerCountry}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Form & Result Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Input Column */}
              <div className="lg:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-cyan-300 flex items-center space-x-2">
                  <Sliders className="w-4 h-4" />
                  <span>Consignment Declaration Parameters</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Consignment Reference</label>
                    <input
                      type="text"
                      value={complianceForm.consignmentId}
                      onChange={(e) => setComplianceForm({ ...complianceForm, consignmentId: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Catch Date</label>
                    <input
                      type="date"
                      value={complianceForm.catchDate}
                      onChange={(e) => setComplianceForm({ ...complianceForm, catchDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Exporter Country</label>
                    <input
                      type="text"
                      value={complianceForm.exporterCountry}
                      onChange={(e) => setComplianceForm({ ...complianceForm, exporterCountry: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Importer Country</label>
                    <input
                      type="text"
                      value={complianceForm.importerCountry}
                      onChange={(e) => setComplianceForm({ ...complianceForm, importerCountry: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Species Name</label>
                    <input
                      type="text"
                      value={complianceForm.speciesName}
                      onChange={(e) => setComplianceForm({ ...complianceForm, speciesName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">HS Code Tariff</label>
                    <input
                      type="text"
                      value={complianceForm.hsCode}
                      onChange={(e) => setComplianceForm({ ...complianceForm, hsCode: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-cyan-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Catch Vessel IMO</label>
                    <input
                      type="text"
                      value={complianceForm.vesselNameIMO}
                      onChange={(e) => setComplianceForm({ ...complianceForm, vesselNameIMO: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Quantity (Metric Tons)</label>
                    <input
                      type="number"
                      value={complianceForm.quantityMT}
                      onChange={(e) => setComplianceForm({ ...complianceForm, quantityMT: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Invoice Value ($ USD)</label>
                    <input
                      type="number"
                      value={complianceForm.declaringValueUSD}
                      onChange={(e) => setComplianceForm({ ...complianceForm, declaringValueUSD: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-emerald-400 font-mono"
                    />
                  </div>
                </div>

                {/* Verification Toggles */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 text-[10px] font-bold block uppercase">Accompanying Documentation Keys:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={complianceForm.hasSimpApproval}
                        onChange={(e) => setComplianceForm({ ...complianceForm, hasSimpApproval: e.target.checked })}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                      <span className="text-[11px] text-slate-200">US SIMP Approval</span>
                    </label>

                    <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={complianceForm.hasEuCatchCert}
                        onChange={(e) => setComplianceForm({ ...complianceForm, hasEuCatchCert: e.target.checked })}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                      <span className="text-[11px] text-slate-200">EU Catch Certificate</span>
                    </label>

                    <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={complianceForm.hasCitesPermit}
                        onChange={(e) => setComplianceForm({ ...complianceForm, hasCitesPermit: e.target.checked })}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                      <span className="text-[11px] text-slate-200">CITES Species Permit</span>
                    </label>

                    <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={complianceForm.hasHealthCertificate}
                        onChange={(e) => setComplianceForm({ ...complianceForm, hasHealthCertificate: e.target.checked })}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                      <span className="text-[11px] text-slate-200">SPS Health Cert</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => handleRunComplianceAudit()}
                  disabled={isAuditingCompliance}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  {isAuditingCompliance ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Auditing IMO / FAO / Customs Databases...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-slate-950" />
                      <span>Execute AI Compliance Risk & Duty Audit</span>
                    </>
                  )}
                </button>
              </div>

              {/* Output Certificate Column */}
              <div className="lg:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                {isAuditingCompliance ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-3 py-12 text-center">
                    <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                    <p className="text-xs text-slate-300 font-mono">
                      Querying RFMO IUU Vessel Registries, US SIMP database, and EU TRACES customs API...
                    </p>
                  </div>
                ) : complianceResult ? (
                  <div className="space-y-4">
                    {/* Badge & Score */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div>
                        <span className="text-slate-400 text-[10px] font-mono block">AUDIT CODE: {complianceResult.auditRefCode}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          {complianceResult.overallRiskLevel === 'LOW_RISK_APPROVED' ? (
                            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>LOW RISK - PASSED ALL CHECKS</span>
                            </span>
                          ) : complianceResult.overallRiskLevel === 'MODERATE_RISK_AUDIT' ? (
                            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center space-x-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>MODERATE RISK - AUDIT WARNING</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/40 flex items-center space-x-1">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>HIGH RISK - CONSIGNMENT BLOCKED</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block">Compliance Score</span>
                        <span className="text-xl font-black font-mono text-cyan-300">{complianceResult.complianceScorePct}%</span>
                      </div>
                    </div>

                    {/* Calculated Duty Breakdown */}
                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Estimated Tariff Rate</span>
                        <span className="text-emerald-400 font-bold font-mono text-sm">{complianceResult.tariffEstimatePct.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Calculated Customs Duty</span>
                        <span className="text-emerald-400 font-bold font-mono text-sm">${complianceResult.estimatedTariffUSD.toLocaleString()} USD</span>
                      </div>
                    </div>

                    {/* Verification Checks */}
                    <div className="space-y-1.5 text-xs">
                      <span className="text-slate-400 text-[10px] font-bold uppercase block">Verification Audits:</span>
                      <div className="text-[11px] space-y-1 font-mono">
                        <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-200">
                          🛡️ <span className="text-cyan-300">IUU Status:</span> {complianceResult.iuuStatus}
                        </div>
                        <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-200">
                          📄 <span className="text-cyan-300">SIMP Audit:</span> {complianceResult.simpStatus}
                        </div>
                        <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-200">
                          🧪 <span className="text-cyan-300">SPS Health Log:</span> {complianceResult.spsHealthCheck}
                        </div>
                      </div>
                    </div>

                    {/* Flagged Risks */}
                    <div className="space-y-1 text-xs">
                      <span className="text-amber-400 text-[10px] font-bold uppercase block">Flagged Compliance Risk Factors:</span>
                      <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        {complianceResult.flaggedRisks.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-1 text-xs">
                      <span className="text-cyan-400 text-[10px] font-bold uppercase block">Regulatory Next Steps:</span>
                      <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        {complianceResult.recommendedActions.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-2 py-12 text-center">
                    <ShieldCheck className="w-8 h-8 text-slate-600" />
                    <p className="text-xs text-slate-400">
                      Configure parameters and click "Execute AI Compliance Audit" or select a preset above.
                    </p>
                  </div>
                )}

                {complianceResult && (
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Generated: {complianceResult.generatedAt.split('T')[0]}
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Official Certificate</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: TRADE DATA VISUALIZER */}
      {/* ========================================================================= */}
      {activeTab === 'trade-visualizer' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-6 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <PieChart className="w-4 h-4 text-cyan-400" />
                  <span>INTERACTIVE VISUAL TRADE DATA ANALYTICS & TARIFF MATRIX</span>
                </div>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  Global Seafood Trade Data Visualizer
                </h2>
                <p className="text-xs text-slate-300">
                  Visual breakdown of international trade balances, commodity price index trends, trade corridor tariffs, and species volume growth across major economic blocks.
                </p>
              </div>

              {/* Metric Switcher */}
              <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0 font-mono">
                <span className="text-slate-400 text-[10px] uppercase font-bold px-1">Metric:</span>
                <button
                  onClick={() => setVisualizerMetric('value')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    visualizerMetric === 'value' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Value ($ USD)
                </button>
                <button
                  onClick={() => setVisualizerMetric('volume')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    visualizerMetric === 'volume' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  Volume (MT)
                </button>
              </div>
            </div>

            {/* Visualizer Chart 1: Regional Trade Balances */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-cyan-300">Regional Trade Volume & Value Comparison ($ Billion USD)</h3>
                  <p className="text-[11px] text-slate-400">Export vs Import values across major economic trade zones.</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">Total World B2B Trade: $184.5B USD</span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { region: 'Asia-Pacific', exportUSD: 54.2, importUSD: 58.1 },
                      { region: 'Europe (EU)', exportUSD: 42.5, importUSD: 48.9 },
                      { region: 'North America', exportUSD: 28.4, importUSD: 36.2 },
                      { region: 'Latin America', exportUSD: 31.8, importUSD: 14.5 },
                      { region: 'Africa & Indian Oc.', exportUSD: 16.5, importUSD: 12.1 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="region" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="exportUSD" name="Export Value ($B USD)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="importUSD" name="Import Value ($B USD)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visualizer Chart 2 & Tariff Table Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Species Commodity Index Chart */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-bold text-sm text-amber-300">Species Price Trend Index ($ USD / kg)</h3>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { quarter: '2025 Q1', BluefinTuna: 21.0, Salmon: 9.2, Shrimp: 7.8, Anchoveta: 1.5 },
                        { quarter: '2025 Q3', BluefinTuna: 22.5, Salmon: 9.8, Shrimp: 8.2, Anchoveta: 1.55 },
                        { quarter: '2026 Q1', BluefinTuna: 23.8, Salmon: 10.2, Shrimp: 8.5, Anchoveta: 1.60 },
                        { quarter: '2026 Q3', BluefinTuna: 24.5, Salmon: 10.8, Shrimp: 8.8, Anchoveta: 1.65 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="quarter" stroke="#64748b" fontSize={10} />
                      <YAxis stroke="#64748b" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', color: '#fff' }} />
                      <Area type="monotone" dataKey="BluefinTuna" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} name="Sashimi Bluefin ($/kg)" />
                      <Area type="monotone" dataKey="Salmon" stroke="#10b981" fill="#10b981" fillOpacity={0.15} name="Atlantic Salmon ($/kg)" />
                      <Area type="monotone" dataKey="Shrimp" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.15} name="Vannamei Shrimp ($/kg)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Major Corridor Tariff Rates Matrix */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h3 className="font-bold text-sm text-purple-300">Corridor Duty & Tariff Rates Matrix</h3>
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                        <th className="py-2 px-2">Export Origin</th>
                        <th className="py-2 px-2">Destination</th>
                        <th className="py-2 px-2">Commodity</th>
                        <th className="py-2 px-2 text-right">Tariff Rate</th>
                        <th className="py-2 px-2 text-right">FTA Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      <tr>
                        <td className="py-2 px-2">Peru 🇵🇪</td>
                        <td className="py-2 px-2">USA 🇺🇸</td>
                        <td className="py-2 px-2 text-slate-300">Shrimp & Fishmeal</td>
                        <td className="py-2 px-2 text-right font-bold text-emerald-400">0.0%</td>
                        <td className="py-2 px-2 text-right text-emerald-400">US-Peru FTA</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">Spain 🇪🇸</td>
                        <td className="py-2 px-2">Japan 🇯🇵</td>
                        <td className="py-2 px-2 text-slate-300">Bluefin Tuna</td>
                        <td className="py-2 px-2 text-right font-bold text-cyan-300">2.5%</td>
                        <td className="py-2 px-2 text-right text-cyan-300">EU-Japan EPA</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">China 🇨🇳</td>
                        <td className="py-2 px-2">USA 🇺🇸</td>
                        <td className="py-2 px-2 text-slate-300">Processed Tilapia</td>
                        <td className="py-2 px-2 text-right font-bold text-rose-400">12.5%</td>
                        <td className="py-2 px-2 text-right text-slate-400">MFN Rate</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">India 🇮🇳</td>
                        <td className="py-2 px-2">EU 🇪🇺</td>
                        <td className="py-2 px-2 text-slate-300">Frozen Prawns</td>
                        <td className="py-2 px-2 text-right font-bold text-amber-300">4.2%</td>
                        <td className="py-2 px-2 text-right text-amber-300">GSP Standard</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: CONTRACT EXPORT TOOL */}
      {/* ========================================================================= */}
      {activeTab === 'contract-export' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-6 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                  <FileSignature className="w-4 h-4 text-purple-400" />
                  <span>STANDARDIZED B2B SEAFOOD SALES CONTRACT EXPORT TOOL</span>
                </div>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  International B2B Contract Generator & Legal Exporter
                </h2>
                <p className="text-xs text-slate-300">
                  Draft Incoterms 2020 sales contracts (FOB, CIF, CFR, DDP), cold storage specs, and legal arbitration clauses with one-click multi-format export.
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs shrink-0 font-mono">
                <button
                  onClick={handleCopyContractText}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold rounded-lg border border-slate-700 transition-all flex items-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{copiedContractMsg ? 'Copied Text!' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={handleDownloadContractJson}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold rounded-lg border border-slate-700 transition-all flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>JSON Record</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-slate-950 font-extrabold rounded-lg transition-all flex items-center space-x-1.5 shadow-md"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-950" />
                  <span>Print / PDF Export</span>
                </button>
              </div>
            </div>

            {/* Contract Builder & Live Document Preview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Column */}
              <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-purple-300 flex items-center space-x-2">
                  <Sliders className="w-4 h-4" />
                  <span>Contract Terms Builder</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Select Contract Record</label>
                    <select
                      value={selectedContract.contractId}
                      onChange={(e) => {
                        const found = b2bContracts.find((c) => c.contractId === e.target.value);
                        if (found) setSelectedContract(found);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-purple-300 font-mono font-bold"
                    >
                      {b2bContracts.map((c) => (
                        <option key={c.contractId} value={c.contractId}>
                          {c.contractId} - {c.speciesGrade.slice(0, 25)}...
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 text-[10px] block font-bold mb-1">Seller Company</label>
                      <input
                        type="text"
                        value={selectedContract.sellerCompany}
                        onChange={(e) => setSelectedContract({ ...selectedContract, sellerCompany: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 text-[10px] block font-bold mb-1">Buyer Company</label>
                      <input
                        type="text"
                        value={selectedContract.buyerCompany}
                        onChange={(e) => setSelectedContract({ ...selectedContract, buyerCompany: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block font-bold mb-1">Species / Grade Specification</label>
                    <input
                      type="text"
                      value={selectedContract.speciesGrade}
                      onChange={(e) => setSelectedContract({ ...selectedContract, speciesGrade: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 text-[10px] block font-bold mb-1">Incoterms 2020</label>
                      <select
                        value={selectedContract.incoterm}
                        onChange={(e: any) => setSelectedContract({ ...selectedContract, incoterm: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-cyan-300 font-mono"
                      >
                        <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Ins & Freight)</option>
                        <option value="FOB (Free on Board)">FOB (Free on Board)</option>
                        <option value="CFR (Cost & Freight)">CFR (Cost & Freight)</option>
                        <option value="DDP (Delivered Duty Paid)">DDP (Delivered Duty Paid)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 text-[10px] block font-bold mb-1">Payment Terms</label>
                      <select
                        value={selectedContract.paymentTerms}
                        onChange={(e: any) => setSelectedContract({ ...selectedContract, paymentTerms: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-emerald-300 font-mono"
                      >
                        <option value="Letter of Credit (L/C 100% Sight)">L/C 100% Sight</option>
                        <option value="Telegraphic Transfer (T/T 30% Advance / 70% BL)">T/T 30/70 BL</option>
                        <option value="CAD (Cash Against Documents)">CAD Cash Against Docs</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 text-[10px] block font-bold mb-1">Quantity (MT)</label>
                      <input
                        type="number"
                        value={selectedContract.quantityMT}
                        onChange={(e) => {
                          const mt = parseFloat(e.target.value) || 0;
                          setSelectedContract({
                            ...selectedContract,
                            quantityMT: mt,
                            totalContractValueUSD: mt * 1000 * selectedContract.pricePerKgUSD
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 text-[10px] block font-bold mb-1">Unit Price ($ / kg)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={selectedContract.pricePerKgUSD}
                        onChange={(e) => {
                          const p = parseFloat(e.target.value) || 0;
                          setSelectedContract({
                            ...selectedContract,
                            pricePerKgUSD: p,
                            totalContractValueUSD: selectedContract.quantityMT * 1000 * p
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-emerald-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between font-mono">
                    <span className="text-slate-400 text-[11px]">Total Contract Value:</span>
                    <span className="text-emerald-400 font-black text-sm">
                      ${selectedContract.totalContractValueUSD.toLocaleString()} USD
                    </span>
                  </div>
                </div>
              </div>

              {/* Rendered Document Column */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-purple-500/30 space-y-5 text-slate-200 font-sans shadow-2xl relative">
                {/* Contract Document Banner */}
                <div className="border-b-2 border-purple-500/40 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest block">
                      OFFICIAL B2B INTERNATIONAL SEAFOOD SALES AGREEMENT
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">
                      REF: {selectedContract.contractId}
                    </h3>
                  </div>

                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded border border-emerald-500/40">
                    {selectedContract.status}
                  </span>
                </div>

                {/* Contract Body Sections */}
                <div className="space-y-4 text-xs">
                  {/* Parties */}
                  <div className="grid grid-cols-2 gap-4 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold block uppercase">SELLER / EXPORTER</span>
                      <div className="font-bold text-white mt-0.5">{selectedContract.sellerCompany}</div>
                      <div className="text-[11px] text-slate-400">{selectedContract.sellerCountry}</div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] font-bold block uppercase">BUYER / IMPORTER</span>
                      <div className="font-bold text-white mt-0.5">{selectedContract.buyerCompany}</div>
                      <div className="text-[11px] text-slate-400">{selectedContract.buyerCountry}</div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-1.5 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <span className="text-purple-300 text-[10px] font-bold uppercase block">1. COMMODITY & COLD CHAIN REQUIREMENTS</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div><span className="text-slate-400">Species Grade:</span> {selectedContract.speciesGrade}</div>
                      <div><span className="text-slate-400">Processing:</span> {selectedContract.processingFormat}</div>
                      <div><span className="text-slate-400">Volume:</span> {selectedContract.quantityMT} MT</div>
                      <div><span className="text-slate-400">Storage Temp:</span> {selectedContract.storageTempReqC}°C</div>
                    </div>
                  </div>

                  {/* Logistics & Payment */}
                  <div className="space-y-1.5 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <span className="text-purple-300 text-[10px] font-bold uppercase block">2. LOGISTICS, DISCHARGE & PAYMENT</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div><span className="text-slate-400">Loading Port:</span> {selectedContract.portOfLoading}</div>
                      <div><span className="text-slate-400">Discharge Port:</span> {selectedContract.portOfDischarge}</div>
                      <div><span className="text-slate-400">Incoterm:</span> {selectedContract.incoterm}</div>
                      <div><span className="text-slate-400">Payment Terms:</span> {selectedContract.paymentTerms}</div>
                    </div>
                  </div>

                  {/* Legal Clause */}
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-[10px] text-slate-400 space-y-1">
                    <span className="text-purple-300 font-bold block uppercase">3. MARITIME ARBITRATION & FORCE MAJEURE CLAUSE</span>
                    <p className="leading-relaxed">
                      This contract is subject to London Maritime Arbitrators Association (LMAA) terms and UNCITRAL rules. Any breach of cold chain (-18°C / -60°C requirement) verified by port data loggers shall entitle buyer to full inspection compensation.
                    </p>
                  </div>
                </div>

                {/* Signatures */}
                <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-6 text-[10px] font-mono">
                  <div className="border-t border-dashed border-slate-700 pt-2">
                    <span className="text-slate-400">Authorized Signature (Seller)</span>
                    <div className="text-cyan-300 font-bold mt-1">{selectedContract.sellerCompany}</div>
                  </div>

                  <div className="border-t border-dashed border-slate-700 pt-2 text-right">
                    <span className="text-slate-400">Authorized Signature (Buyer)</span>
                    <div className="text-emerald-300 font-bold mt-1">{selectedContract.buyerCompany}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 1: PORT INVENTORY COLD STORAGE & STOCK TRACKER */}
      {/* ========================================================================= */}
      {activeTab === 'port-inventory' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                  <Warehouse className="w-4 h-4 text-amber-400" />
                  <span>COLD STORAGE LOGISTICS & PORT STOCK WAREHOUSE TRACKER</span>
                </div>
                <h2 className="text-xl font-bold text-white">Global Port Inventory & Cold Storage Stock Tracker</h2>
                <p className="text-xs text-slate-300">
                  Real-time occupancy tracking, super-freezer storage vaults, reefer container counts, species storage temperatures, and warehouse capacity alerts.
                </p>
              </div>

              {/* Stat Pills */}
              <div className="flex items-center space-x-3 text-xs bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 shrink-0 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">Total Vault Storage</span>
                  <span className="text-amber-400 font-bold">1,205,000 MT</span>
                </div>
                <div className="border-r border-slate-800 h-6"></div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Avg Utilization</span>
                  <span className="text-cyan-300 font-bold">79.2% Occupied</span>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by port, species, or UN/LOCODE..."
                  value={inventorySearchTerm}
                  onChange={(e) => setInventorySearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold shrink-0">Warehouse Status:</span>
                <select
                  value={inventoryStatusFilter}
                  onChange={(e) => setInventoryStatusFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-300 font-bold focus:outline-none"
                >
                  <option value="ALL">🏢 All Warehouse Statuses</option>
                  <option value="OPERATIONAL_NORMAL">🟢 Operational Normal</option>
                  <option value="NEAR_CAPACITY_ALERT">⚠️ Near Capacity Alert (&gt;80%)</option>
                  <option value="HIGH_DEMAND_VACANCY">🔵 High Demand Vacancy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Port Inventory Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInventories.map((inv) => (
              <div
                key={inv.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-2xl hover:border-amber-500/50 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{inv.countryFlag}</span>
                      <span className="text-xs text-slate-400 font-mono font-bold">{inv.unLocode} • {inv.country}</span>
                    </div>
                    <h3 className="font-extrabold text-base text-white mt-0.5">{inv.portName}</h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-lg font-bold text-[10px] border font-mono ${
                      inv.warehouseStatus === 'NEAR_CAPACITY_ALERT'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                        : inv.warehouseStatus === 'HIGH_DEMAND_VACANCY'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {inv.warehouseStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Capacity Meter Bar */}
                <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Capacity Occupancy:</span>
                    <span className="font-bold text-amber-300">
                      {inv.currentOccupiedMT.toLocaleString()} / {inv.totalCapacityMT.toLocaleString()} MT ({inv.utilizationPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        inv.utilizationPct >= 85
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                      }`}
                      style={{ width: `${inv.utilizationPct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Logistics Metrics */}
                <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Frozen Stock</span>
                    <span className="text-cyan-300 font-bold">{(inv.frozenStockMT / 1000).toFixed(1)}k MT</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Chilled / Fresh</span>
                    <span className="text-emerald-400 font-bold">{inv.freshChilledStockMT.toLocaleString()} MT</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Reefer Plug Containers</span>
                    <span className="text-amber-300 font-bold">{inv.reeferContainersOnSite} Units</span>
                  </div>
                </div>

                {/* Species Vault Breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Current Species Stocked & Vault Storage Temp
                  </span>
                  <div className="space-y-1.5">
                    {inv.speciesBreakdown.map((sp, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-slate-950 rounded-lg text-xs font-mono"
                      >
                        <span className="text-slate-200 font-medium">🐟 {sp.species}</span>
                        <div className="flex items-center space-x-3 text-right">
                          <span className="text-cyan-300 font-bold">{sp.volumeMT.toLocaleString()} MT</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 text-[10px]">
                            {sp.tempStorageC}°C
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Timestamp Footer */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Audit Timestamp: {new Date(inv.lastAuditTimestamp).toLocaleString()}</span>
                  <span className="text-cyan-400 font-bold">Verified Cold Logistics Feed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 2: GLOBAL MARKET LIVE SYNC */}
      {/* ========================================================================= */}
      {activeTab === 'global-market-sync' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase">
                  <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>REAL-TIME B2B SEAFOOD EXCHANGES LIVE API MARKET SYNC</span>
                </div>
                <h2 className="text-xl font-bold text-white">Global Seafood Exchange Market Live Sync</h2>
                <p className="text-xs text-slate-300">
                  Automated WebSocket & REST API synchronization across major global seafood auction centers and benchmark indexes.
                </p>
              </div>

              {/* Sync Trigger Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleTriggerMarketSync}
                  disabled={isSyncingMarkets}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg hover:scale-105 transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncingMarkets ? 'animate-spin' : ''}`} />
                  <span>{isSyncingMarkets ? 'Syncing Exchanges...' : 'Sync Market Prices Now'}</span>
                </button>
              </div>
            </div>

            {syncSuccessMsg && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold font-mono animate-fadeIn flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{syncSuccessMsg}</span>
              </div>
            )}
          </div>

          {/* Sync Feeds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {syncFeeds.map((feed, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{feed.countryFlag}</span>
                      <span className="text-xs text-slate-400 font-mono">{feed.location}</span>
                    </div>
                    <h3 className="font-extrabold text-base text-white mt-0.5">{feed.exchangeName}</h3>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30 font-mono flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>{feed.status.replace(/_/g, ' ')}</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Last Synced</span>
                    <span className="text-cyan-300 font-bold">{feed.lastSyncedAt}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">API Latency</span>
                    <span className="text-emerald-400 font-bold">{feed.latencyMs} ms</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Active Listings</span>
                    <span className="text-amber-300 font-bold">{feed.activeListingsCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-mono">
                  <span className="text-slate-500">Traded Benchmark: </span>
                  <span className="text-white font-bold">{feed.primaryTradedCommodity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 3: AUTOMATED TRADE REPORTS GENERATOR */}
      {/* ========================================================================= */}
      {activeTab === 'automated-reports' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>AUTOMATED SCHEDULED TRADE REPORT DISPATCHES</span>
                </div>
                <h2 className="text-xl font-bold text-white">Automated Fisheries Trade Reports Generator</h2>
                <p className="text-xs text-slate-300">
                  Schedule automated daily, weekly, and monthly trade balance summaries dispatches to maritime authorities, brokers, and customs auditors.
                </p>
              </div>

              <button
                onClick={handleGenerateAutomatedDispatch}
                disabled={isGeneratingDispatch}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg hover:scale-105 transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isGeneratingDispatch ? 'animate-spin' : ''}`} />
                <span>{isGeneratingDispatch ? 'Generating AI Dispatch...' : 'Trigger Automated AI Dispatch'}</span>
              </button>
            </div>

            {/* AI Generated Output Display Box */}
            {generatedDispatchOutput && (
              <div className="p-4 bg-slate-950 border border-cyan-500/50 rounded-xl space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-bold">
                  <span>AI AUTOMATED DISPATCH GENERATED</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedDispatchOutput)}
                    className="text-slate-400 hover:text-white text-[10px] underline"
                  >
                    Copy Text
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap bg-slate-900 p-3 rounded-lg border border-slate-800">
                  {generatedDispatchOutput}
                </pre>
              </div>
            )}
          </div>

          {/* Report Schedules List */}
          <div className="space-y-4">
            {reportSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-3 shadow-xl hover:border-cyan-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                      {schedule.frequency}
                    </span>
                    <span className="text-slate-400">• {schedule.regionScope}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-white">{schedule.reportName}</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Recipients: {schedule.autoRecipients.join(', ')}
                  </p>
                </div>

                <div className="flex items-center space-x-4 shrink-0 font-mono text-xs">
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">{schedule.generatedReportCount} Dispatches Sent</span>
                    <span className="text-[10px] text-slate-500">Delivery: {schedule.deliveryChannel}</span>
                  </div>

                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: WORLDWIDE IMPORT & EXPORT DATA REPORTS & EXPORT ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'import-export' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <FileText className="w-4 h-4" />
              <span>STANDARDIZED IMO / FAO GLOBAL FISHERIES TRADE & CUSTOMS INTELLIGENCE</span>
            </div>
            <h2 className="text-xl font-bold text-white">Worldwide Import & Export Fisheries Trade Data Reports</h2>
            <p className="text-xs text-slate-300">
              Annual and quarterly trade balance reports detailing global seafood export volumes, import valuations, trade partner shares, species flows, and IUU compliance ratings with multi-format export capabilities.
            </p>
          </div>

          {/* Report Selector Pills */}
          <div className="flex flex-wrap gap-3">
            {GLOBAL_FISHERIES_TRADE_REPORTS.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReportId(report.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex-1 min-w-[280px] ${
                  selectedReportId === report.id
                    ? 'bg-slate-900 border-cyan-400 text-white shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-cyan-400 font-mono">{report.regionScope}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                    {report.reportingPeriod}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-white">{report.reportTitle}</h3>
                <div className="mt-2 text-xs font-mono flex items-center justify-between text-slate-300">
                  <span>Exports: ${(report.exportValueUSD / 1e9).toFixed(1)}B</span>
                  <span>Imports: ${(report.importValueUSD / 1e9).toFixed(1)}B</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Report Inspector Dashboard */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-2xl">
            {/* Header with Export Action Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-cyan-400 font-bold font-mono uppercase">
                  ACTIVE REPORT • {activeReport.regionScope} ({activeReport.reportingPeriod})
                </span>
                <h3 className="text-xl font-black text-white mt-1">{activeReport.reportTitle}</h3>
              </div>

              {/* Multi-Format Export Action Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {copiedReportMsg && (
                  <span className="text-emerald-400 font-bold text-xs flex items-center space-x-1 animate-fadeIn mr-2">
                    <Check className="w-4 h-4" />
                    <span>Copied Dispatch!</span>
                  </span>
                )}

                <button
                  onClick={handleExportReportCSV}
                  className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>CSV</span>
                </button>

                <button
                  onClick={handleExportReportJSON}
                  className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <Box className="w-4 h-4 text-amber-400" />
                  <span>JSON</span>
                </button>

                <button
                  onClick={handleCopyReportText}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-black text-xs uppercase rounded-xl shadow-lg hover:scale-105 transition-all flex items-center space-x-1.5"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Dispatch</span>
                </button>
              </div>
            </div>

            {/* Macro Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-bold flex items-center justify-between">
                  <span>Total Export Valuation</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ${(activeReport.exportValueUSD / 1e9).toFixed(2)} Billion
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Volume: {activeReport.exportVolumeMT.toLocaleString()} Metric Tons
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-bold flex items-center justify-between">
                  <span>Total Import Valuation</span>
                  <ArrowDownRight className="w-4 h-4 text-cyan-400" />
                </span>
                <div className="text-2xl font-black text-cyan-300 font-mono">
                  ${(activeReport.importValueUSD / 1e9).toFixed(2)} Billion
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Volume: {activeReport.importVolumeMT.toLocaleString()} Metric Tons
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-bold block">IUU Fishing Compliance</span>
                <div className="text-lg font-black text-amber-300 font-mono flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>{activeReport.iuuComplianceRating}</span>
                </div>
                <div className="text-[10px] text-slate-400">Vessel Traceability Audit Verified</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-bold block">Top Export Commodity</span>
                <div className="text-sm font-extrabold text-white font-mono truncate">
                  {activeReport.majorTradedSpecies[0]?.species || 'Seafood Commodities'}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  Avg ${activeReport.majorTradedSpecies[0]?.avgPricePerKgUSD.toFixed(2)} USD/kg
                </div>
              </div>
            </div>

            {/* Top Exporters vs Importers Side-by-Side Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Exporters Table */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Top Seafood Exporting Nations</span>
                </h4>
                <div className="space-y-2 text-xs">
                  {activeReport.topExporters.map((exp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{exp.flag}</span>
                        <span className="font-bold text-white">{exp.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-black">${(exp.valueUSD / 1e9).toFixed(2)}B USD</div>
                        <div className="text-[10px] text-slate-400">{exp.sharePct}% Global Share</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Importers Table */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-extrabold text-sm text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-cyan-400" />
                  <span>Top Seafood Importing Markets</span>
                </h4>
                <div className="space-y-2 text-xs">
                  {activeReport.topImporters.map((imp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{imp.flag}</span>
                        <span className="font-bold text-white">{imp.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-cyan-300 font-black">${(imp.valueUSD / 1e9).toFixed(2)}B USD</div>
                        <div className="text-[10px] text-slate-400">{imp.sharePct}% Market Share</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Traded Species & Policy Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-800 text-xs">
              <div className="space-y-2">
                <h4 className="font-bold text-white flex items-center space-x-2">
                  <Fish className="w-4 h-4 text-cyan-400" />
                  <span>Major Traded Seafood Species Volume</span>
                </h4>
                <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {activeReport.majorTradedSpecies.map((sp, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-900 pb-2 last:border-none">
                      <span className="text-slate-300 font-semibold">{sp.species}</span>
                      <div className="text-right font-mono">
                        <span className="text-cyan-300 font-bold">{sp.volumeMT.toLocaleString()} MT</span>
                        <span className="text-slate-500 text-[10px] block">
                          Avg ${sp.avgPricePerKgUSD.toFixed(2)} USD / kg
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">
                    Sustainability & Catch Certification
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">{activeReport.sustainabilityOverview}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block">
                    Customs Tariffs & Policy Insight
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">{activeReport.tradeTariffAndPolicyInsight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: TIME-SERIES TRADE DATE ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === 'trade-analytics' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>TIME-SERIES SEAFOOD TRADE DATE RANGE & VOLUME VELOCITY ANALYTICS</span>
                </div>
                <h2 className="text-xl font-bold text-white">Seafood Trade Date Analytics (2024 - 2026)</h2>
                <p className="text-xs text-slate-300">
                  Analyze quarterly and annual trends in global seafood trade valuations, export volumes, average commodity prices, and species growth velocity.
                </p>
              </div>

              {/* Date Range Picker Controls */}
              <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Start:</span>
                  <select
                    value={analyticsStartDate}
                    onChange={(e) => setAnalyticsStartDate(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-cyan-300 font-bold focus:outline-none"
                  >
                    {GLOBAL_TRADE_DATE_ANALYTICS.map((p) => (
                      <option key={p.period} value={p.period}>
                        {p.period}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="text-slate-600">→</span>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">End:</span>
                  <select
                    value={analyticsEndDate}
                    onChange={(e) => setAnalyticsEndDate(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-cyan-300 font-bold focus:outline-none"
                  >
                    {GLOBAL_TRADE_DATE_ANALYTICS.map((p) => (
                      <option key={p.period} value={p.period}>
                        {p.period}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Metric Mode Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">Primary Chart Metric:</span>
                <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setAnalyticsMetric('value')}
                    className={`px-3 py-1 rounded font-bold transition-all ${
                      analyticsMetric === 'value' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Valuation ($ Billions)
                  </button>
                  <button
                    onClick={() => setAnalyticsMetric('volume')}
                    className={`px-3 py-1 rounded font-bold transition-all ${
                      analyticsMetric === 'volume' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Export Volume (Million MT)
                  </button>
                  <button
                    onClick={() => setAnalyticsMetric('species')}
                    className={`px-3 py-1 rounded font-bold transition-all ${
                      analyticsMetric === 'species' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Key Commodities (K Metric Tons)
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-mono">
                Showing {filteredAnalyticsData.length} Quarterly Periods
              </div>
            </div>
          </div>

          {/* Chart Display Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-sm text-cyan-300 uppercase tracking-wider flex items-center justify-between">
              <span>
                {analyticsMetric === 'value' && 'Global Trade Valuation ($ USD Billions)'}
                {analyticsMetric === 'volume' && 'Global Seafood Export Volume (Million MT)'}
                {analyticsMetric === 'species' && 'Key Commodity Volume Breakdown (Shrimp, Salmon, Tuna)'}
              </span>
              <span className="text-emerald-400 font-mono text-xs">
                Avg Growth: +{filteredAnalyticsData[filteredAnalyticsData.length - 1]?.yoyGrowthPct || 6.8}% YoY
              </span>
            </h3>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                {analyticsMetric === 'value' ? (
                  <AreaChart data={filteredAnalyticsData}>
                    <defs>
                      <linearGradient id="colorExport" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorImport" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} unit="B" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="exportValueBillionUSD"
                      name="Export Value ($B)"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorExport)"
                    />
                    <Area
                      type="monotone"
                      dataKey="importValueBillionUSD"
                      name="Import Value ($B)"
                      stroke="#06b6d4"
                      fillOpacity={1}
                      fill="url(#colorImport)"
                    />
                  </AreaChart>
                ) : analyticsMetric === 'volume' ? (
                  <BarChart data={filteredAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} unit="M MT" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                    />
                    <Legend />
                    <Bar dataKey="exportVolumeMillionMT" name="Export Vol (M MT)" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                ) : (
                  <BarChart data={filteredAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} unit="k MT" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                    />
                    <Legend />
                    <Bar dataKey="shrimpVolumeKMT" name="Shrimp (k MT)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="salmonVolumeKMT" name="Salmon (k MT)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="tunaVolumeKMT" name="Tuna (k MT)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: GLOBAL SEAFOOD COMMODITY MARKETS */}
      {/* ========================================================================= */}
      {activeTab === 'global-markets' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>COMMODITY BENCHMARKS & MARKETING CHANNELS</span>
                </div>
                <h2 className="text-xl font-bold text-white">Global Seafood Markets & Pricing Benchmarks</h2>
                <p className="text-xs text-slate-300">
                  Wholesale benchmark prices ($ USD / kg), 30-day price trends, and primary trade marketing channels for major commercial marine species.
                </p>
              </div>
            </div>

            {/* Category & Search Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search species, scientific name, or country..."
                  value={marketSearchTerm}
                  onChange={(e) => setMarketSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={marketCategoryFilter}
                  onChange={(e) => setMarketCategoryFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-bold focus:outline-none"
                >
                  <option value="ALL">🐟 All Species Categories</option>
                  <option value="Pelagic Fish">Pelagic Fish</option>
                  <option value="Demersal Fish">Demersal Fish</option>
                  <option value="Crustacean">Crustacean</option>
                  <option value="Mollusks & Cephalopods">Mollusks & Cephalopods</option>
                  <option value="Aquaculture / Farmed">Aquaculture / Farmed</option>
                  <option value="Fishmeal & Oil">Fishmeal & Oil</option>
                </select>
              </div>
            </div>
          </div>

          {/* Markets Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <div
                key={market.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px] font-mono border border-cyan-500/30">
                        {market.category}
                      </span>
                      <h3 className="font-extrabold text-base text-white mt-1.5">{market.speciesName}</h3>
                      <p className="text-[11px] text-slate-400 italic">{market.scientificName}</p>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-xs text-slate-400 block">Benchmark Price</span>
                      <span className="text-xl font-black text-emerald-400">
                        ${market.globalWholesalePricePerKgUSD.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">USD / kg</span>
                    </div>
                  </div>

                  {/* 30D Trend & Demand Pill */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                    <div className="flex items-center space-x-1">
                      <span className="text-slate-400 text-[10px]">30d Trend:</span>
                      <span
                        className={`font-bold flex items-center ${
                          market.priceTrendPct30d >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {market.priceTrendPct30d >= 0 ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                        <span>{market.priceTrendPct30d > 0 ? `+${market.priceTrendPct30d}` : market.priceTrendPct30d}%</span>
                      </span>
                    </div>

                    <span className="text-amber-300 font-bold text-[10px]">{market.marketDemandLevel}</span>
                  </div>

                  {/* Exporting & Importing Nations */}
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase block">Primary Exporters:</span>
                      <div className="text-slate-200 font-mono text-[11px]">
                        {market.primaryExportingCountries.join(' • ')}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase block">Primary Importers:</span>
                      <div className="text-cyan-300 font-mono text-[11px]">
                        {market.primaryImportingCountries.join(' • ')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Marketing Channels:</span>
                  <div className="flex flex-wrap gap-1">
                    {market.primaryMarketingChannels.map((ch, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                        📦 {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 9: SATELLITE PFZ HOTSPOTS */}
      {/* ========================================================================= */}
      {activeTab === 'pfz' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
              <Compass className="w-4 h-4" />
              <span>SATELLITE CHLOROPHYLL & SEA SURFACE TEMPERATURE HOTSPOTS</span>
            </div>
            <h2 className="text-xl font-bold text-white">Potential Fishing Zones (PFZ) Satellite Feed</h2>
            <p className="text-xs text-slate-300">
              MODIS & Sentinel satellite ocean color telemetry identifying oceanic fronts and high-density fish congregation zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POTENTIAL_FISHING_ZONES.map((pfz) => (
              <div
                key={pfz.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-cyan-400 font-bold font-mono">{pfz.advisoryConfidence}</span>
                    <h3 className="font-bold text-base text-white mt-0.5">{pfz.zoneName}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                    PFZ ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Sea Surface Temp</span>
                    <span className="text-amber-300 font-bold">{pfz.seaSurfaceTempC}°C</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Chlorophyll-a</span>
                    <span className="text-emerald-400 font-bold">{pfz.chlorophyllMgM3} mg/m³</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Congregated Fish Species:</span>
                  <div className="flex flex-wrap gap-1">
                    {pfz.targetSpecies.map((sp, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-950 text-cyan-200 px-2 py-0.5 rounded border border-slate-800">
                        🐟 {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 10: LOCAL AUCTION RATES */}
      {/* ========================================================================= */}
      {activeTab === 'local-market' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
              <DollarSign className="w-4 h-4" />
              <span>WHOLESALE HARBOR AUCTION RATE BENCHMARKS</span>
            </div>
            <h2 className="text-xl font-bold text-white">Daily Fish Harbor Auction Rates</h2>
            <p className="text-xs text-slate-300">
              Live landed harbor prices, size grade brackets, and price trends across major regional seafood auctions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FISH_MARKET_RATES.map((rate) => (
              <div
                key={rate.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-slate-400 italic">{rate.localName}</span>
                    <h3 className="font-extrabold text-base text-white mt-0.5">{rate.speciesName}</h3>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xl font-black text-emerald-400">
                      ${rate.pricePerKgUSD.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">USD / kg</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Harbor Auction Rate</span>
                    <span className="text-cyan-300 font-bold">{rate.currencySymbol}{rate.pricePerKgLocalCurrency} / kg</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Quality Grade</span>
                    <span className="text-amber-300 font-bold">{rate.qualityGrade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 11: EEZ & SWELL SAFETY ADVISORIES */}
      {/* ========================================================================= */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>MARITIME NAVIGATION & SWELL SAFETY ADVISORIES</span>
            </div>
            <h2 className="text-xl font-bold text-white">Fishermen Safety & EEZ Boundary Warnings</h2>
            <p className="text-xs text-slate-300">
              Live weather advisories, high wave warnings, and EEZ border proximity alerts to protect artisan and commercial fishing crews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FISHERMEN_SAFETY_ADVISORIES.map((adv) => (
              <div
                key={adv.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-rose-400 font-mono font-bold">{adv.region}</span>
                    <h3 className="font-extrabold text-base text-white mt-0.5">{adv.region} EEZ Advisory</h3>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] font-mono ${
                      adv.alertLevel.includes('WARNING')
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {adv.alertLevel}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {adv.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                  <div>Swell Height: <span className="text-amber-300 font-bold">{adv.waveHeightMeters}m</span></div>
                  <div>Wind Speed: <span className="text-cyan-300 font-bold">{adv.windSpeedKnots} knots</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 12: TRIP PROFIT ESTIMATOR */}
      {/* ========================================================================= */}
      {activeTab === 'calculator' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
              <Calculator className="w-4 h-4" />
              <span>VOYAGE PROFITABILITY & DIESEL BREAK-EVEN ESTIMATOR</span>
            </div>
            <h2 className="text-xl font-bold text-white">Fishermen Fishing Voyage Profit Estimator</h2>
            <p className="text-xs text-slate-300">
              Calculate projected gross revenue, fuel cost deductions, and net crew dividend share prior to voyage departure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-800">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Target Catch Species:</label>
                <select
                  value={selectedSpeciesId}
                  onChange={(e) => setSelectedSpeciesId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-bold text-xs focus:outline-none"
                >
                  {FISH_MARKET_RATES.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.speciesName} (₹{f.pricePerKgLocalCurrency} / kg)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Estimated Catch Weight (kg):</label>
                <input
                  type="number"
                  value={catchWeightKg}
                  onChange={(e) => setCatchWeightKg(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">Diesel Fuel (Liters):</label>
                  <input
                    type="number"
                    value={dieselLiters}
                    onChange={(e) => setDieselLiters(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">Diesel Rate (₹/Liter):</label>
                  <input
                    type="number"
                    value={dieselPricePerLiter}
                    onChange={(e) => setDieselPricePerLiter(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Summary Card */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-cyan-400 uppercase tracking-wider mb-3">
                  Trip Voyage Financial Projections
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-slate-900">
                    <span className="text-slate-400">Gross Catch Value:</span>
                    <span className="text-cyan-300 font-bold">₹{grossRevenueLocal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-900">
                    <span className="text-slate-400">Diesel Fuel Expense:</span>
                    <span className="text-rose-400 font-bold">-₹{dieselCostLocal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800 text-sm">
                    <span className="text-white font-bold">Net Voyage Profit:</span>
                    <span className="text-emerald-400 font-black">₹{netProfitLocal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Net Dividend ($ USD)</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">${netProfitUSD} USD</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
