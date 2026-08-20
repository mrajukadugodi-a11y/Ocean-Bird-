import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Bug,
  Terminal,
  Lock,
  Wifi,
  WifiOff,
  Radio,
  FileCode,
  Trash2,
  Play,
  Zap,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  X,
  Search,
  Eye,
  Mail,
  History,
  HardDrive,
  Database,
  Crosshair,
  Server,
  Key,
  Download,
  AlertCircle,
  FileText,
  UserX,
  Globe,
  Clock,
  Sliders,
  Cpu,
  Activity,
  SlidersHorizontal,
  Bell,
  BellRing,
  Check,
  ToggleLeft,
  ToggleRight,
  DollarSign,
  TrendingUp,
  CreditCard,
  Lightbulb,
  BarChart3,
  BarChart2,
  Box,
  PieChart,
  ArrowUpRight,
  Receipt,
  Coins,
  Target,
  Calculator,
  FileSpreadsheet,
  Award,
  Percent,
  ArrowRightLeft,
  Scale,
  Plus,
  Send,
  Landmark,
  LineChart,
  Compass,
  Layers,
  Flame,
  MapPin,
  TrendingDown,
  Hospital,
  Stethoscope,
  Plane,
  Anchor,
  UserCheck,
  Building2,
  GraduationCap,
  Phone,
  Calendar,
  Syringe,
  Map,
  QrCode
} from 'lucide-react';

export interface ThreatItem {
  id: string;
  type: 'Phishing Scammer' | 'Spoofed Signal' | 'Malicious Payload' | 'Suspicious Token' | 'Fraudulent Booking';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  source: string;
  description: string;
  detectedAt: string;
  status: 'Quarantined' | 'Blocked' | 'Pending Action' | 'Resolved';
}

export interface SmartAnomaly {
  id: string;
  title: string;
  category: 'Telemetry Spoof' | 'Storage Tampering' | 'Network Burst' | 'Credential Harvesting' | 'CAN-Bus Latency';
  riskScore: number;
  anomalyDetails: string;
  detectedAt: string;
  status: 'Active' | 'Mitigated' | 'Acknowledged';
}

export interface HardwareWidgetData {
  id: string;
  name: string;
  category: string;
  healthPercent: number;
  status: 'Optimal' | 'Warning' | 'Critical';
  metrics: { label: string; value: string }[];
  lastCalibrated: string;
}

export interface PatchItem {
  id: string;
  component: string;
  currentVersion: string;
  latestVersion: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Up-to-Date';
  cve: string;
  description: string;
  status: 'Available' | 'Updating...' | 'Up-to-Date';
}

export interface IncidentItem {
  id: string;
  severity: 'P1 - Critical' | 'P2 - High' | 'P3 - Medium' | 'P4 - Low';
  title: string;
  targetSystem: string;
  assignedResponder: string;
  status: 'Active Containment' | 'Investigating' | 'Mitigated' | 'Resolved';
  startedAt: string;
  playbookSteps: { step: string; done: boolean }[];
}

export interface SecurityKeyItem {
  id: string;
  name: string;
  type: 'RSA-4096' | 'ECDSA P-384' | 'Ed25519' | 'AES-256-GCM';
  assignedModule: string;
  createdDate: string;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Revoked';
}

export interface BiometricLogItem {
  id: string;
  officerName: string;
  authMethod: 'Fingerprint Sensor' | '3D FaceID Scan' | 'Hardware Security Key' | 'Retina Scanner';
  vesselModule: string;
  confidenceScore: number;
  ipAddress: string;
  timestamp: string;
  result: 'Granted' | 'Flagged' | 'Denied';
}

export interface SecurityPulseItem {
  id: string;
  title: string;
  pulseType: 'RF Frequency Jitter' | 'Port Security Broadcast' | 'Phishing Surge' | 'Engine Telemetry Warning';
  severity: 'Critical' | 'Warning' | 'Info';
  timestamp: string;
  details: string;
  muted: boolean;
}

export const CyberAntivirusFraudSecurityView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'dashboard'
    | 'security-overview'
    | 'incident-response'
    | 'security-trends'
    | 'quick-patch'
    | 'security-key-manager'
    | 'biometric-auth-audit'
    | 'security-pulses'
    | 'breach-recovery-guide'
    | 'revenue-analytics'
    | 'billing-portal'
    | 'tax-calculator'
    | 'payment-history'
    | 'monetization-tips'
    | 'revenue-forecast'
    | 'revenue-simulator'
    | 'automated-tax-reports'
    | 'monetization-benchmark'
    | 'roi-calculator'
    | 'currency-converter'
    | 'tax-dashboard'
    | 'revenue-alerts'
    | 'smart-tax-overview'
    | 'global-tariff-comparison'
    | 'global-tariff-heatmap'
    | 'revenue-projection-graph'
    | 'smart-revenue-projection'
    | 'currency-hedging-guide'
    | 'smart-fiscal-ai-advisor'
    | 'customizable-revenue-dashboards'
    | 'multi-currency-forecast-engine'
    | 'automated-tariff-alert'
    | 'revenue-ai-forecast'
    | 'tariff-optimization-ui'
    | 'fiscal-health-score'
    | 'multi-currency-alert'
    | 'smart-tariff-visualizer'
    | 'revenue-projection-ai'
    | 'fiscal-health-scorecard'
    | 'goods-stock-holders-info'
    | 'export-stock-tracker'
    | 'goods-insurance-portal'
    | 'insurance-dashboard'
    | 'claims-history'
    | 'smart-insurance-advisor'
    | 'auto-renewal-ui'
    | 'medical-examination-centers'
    | 'health-score'
    | 'automated-scan'
    | 'patch-checker'
    | 'hardware-widgets'
    | 'smart-anomalies'
    | 'scam-shield'
    | 'breach-recovery'
    | 'quarantine-logs'
  >('dashboard');

  // Revenue & Monetization Portal State
  const [revenueTimeframe, setRevenueTimeframe] = useState<'30D' | '90D' | '1Y'>('30D');
  const [mrrAmount, setMrrAmount] = useState(48250);
  const [billingPlan, setBillingPlan] = useState<'Starter' | 'Pro Captain' | 'Enterprise Fleet' | 'Global Custom Tier'>('Enterprise Fleet');
  const [forecastGrowthScenario, setForecastGrowthScenario] = useState<'Conservative' | 'Expected' | 'Aggressive'>('Expected');
  const [customSeatsInput, setCustomSeatsInput] = useState(25);
  const [chartMetricView, setChartMetricView] = useState<'MRR' | 'Subscribers' | 'ARPA' | 'GrossMargin'>('MRR');
  const [hoveredChartMonth, setHoveredChartMonth] = useState<number | null>(null);

  // Tax Calculator State
  const [taxJurisdiction, setTaxJurisdiction] = useState<'US-CA' | 'EU-VAT' | 'UK-VAT' | 'SG-GST' | 'UAE-CT' | 'INTL-DUTYFREE'>('EU-VAT');
  const [taxGrossRevenue, setTaxGrossRevenue] = useState(48250);
  const [withholdingRate, setWithholdingRate] = useState(5.0);
  const [corporateTaxDeduction, setCorporateTaxDeduction] = useState(12.5);

  // Enhanced Billing UI State
  const [autoRenewEnabled, setAutoRenewEnabled] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annual (15% Off)'>('Annual (15% Off)');
  const [paymentMethodType, setPaymentMethodType] = useState<'Credit Card' | 'SWIFT Bank Wire' | 'Crypto USDT'>('Credit Card');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [addonSeats, setAddonSeats] = useState(5);
  const [invoiceEmail, setInvoiceEmail] = useState('billing@maritime-fleet.org');

  // Payment History State
  const [paymentSearchQuery, setPaymentSearchQuery] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<'ALL' | 'PAID' | 'PENDING' | 'REFUNDED'>('ALL');
  const [selectedInvoiceReceiptModal, setSelectedInvoiceReceiptModal] = useState<any | null>(null);

  // Revenue Simulator State
  const [simPricePerVessel, setSimPricePerVessel] = useState(250);
  const [simTotalFleets, setSimTotalFleets] = useState(40);
  const [simVesselsPerFleet, setSimVesselsPerFleet] = useState(12);
  const [simChurnRate, setSimChurnRate] = useState(0.8);
  const [simAddonAdoption, setSimAddonAdoption] = useState(45);
  const [simCac, setSimCac] = useState(3200);
  const [simScenarioPreset, setSimScenarioPreset] = useState<'Bootstrapped' | 'Scaleup' | 'Enterprise'>('Scaleup');

  // Automated Tax Reports State
  const [taxReportPeriod, setTaxReportPeriod] = useState<'Q1 2026' | 'Q2 2026' | 'Q3 2026' | 'Q4 2026' | 'Annual 2026'>('Q3 2026');
  const [autoFilingEnabled, setAutoFilingEnabled] = useState(true);
  const [selectedTaxReportJurisdiction, setSelectedTaxReportJurisdiction] = useState<'All' | 'EU MOSS' | 'US Sales Tax' | 'UK HMRC' | 'Singapore IRAS'>('All');
  const [taxFilingStatuses, setTaxFilingStatuses] = useState<Record<string, string>>({
    'EU MOSS': 'READY FOR FILING',
    'US Sales Tax': 'SCHEDULED AUTO-FILE',
    'UK HMRC': 'DRAFT',
    'Singapore IRAS': 'FILED & CONFIRMED',
    'UAE Corporate Tax': 'EXEMPTION APPLIED'
  });

  // Monetization Benchmark State
  const [benchmarkCategory, setBenchmarkCategory] = useState<'All' | 'Unit Economics' | 'Growth & Churn' | 'Profitability'>('All');
  const [benchmarkComparisonMode, setBenchmarkComparisonMode] = useState<'Global Maritime SaaS' | 'Aviation Cyber' | 'B2B Enterprise SaaS'>('Global Maritime SaaS');

  // ROI Calculator State
  const [roiInitialInvestment, setRoiInitialInvestment] = useState(45000);
  const [roiVesselsProtected, setRoiVesselsProtected] = useState(24);
  const [roiMonthlySavingsPerVessel, setRoiMonthlySavingsPerVessel] = useState(1250);
  const [roiDowntimeCostSavedHr, setRoiDowntimeCostSavedHr] = useState(3500);
  const [roiDowntimeHoursSavedYr, setRoiDowntimeHoursSavedYr] = useState(48);
  const [roiPreset, setRoiPreset] = useState<'Small Fleet (10 Vessels)' | 'Commercial Carrier (24 Vessels)' | 'Global Fleet (100 Vessels)'>('Commercial Carrier (24 Vessels)');

  // Currency Converter State
  const [convAmount, setConvAmount] = useState(10000);
  const [convFromCurrency, setConvFromCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'SGD' | 'AED' | 'JPY'>('USD');
  const [convToCurrency, setConvToCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'SGD' | 'AED' | 'JPY'>('EUR');
  const [convLastUpdated, setConvLastUpdated] = useState<string>('Just now (ECB Live Feed)');
  const [currencyRates] = useState<Record<string, number>>({
    USD: 1.0,
    EUR: 0.915,
    GBP: 0.782,
    SGD: 1.345,
    AED: 3.673,
    JPY: 154.20
  });

  // Tax Dashboard State
  const [taxDashRegionFilter, setTaxDashRegionFilter] = useState<'All' | 'Americas' | 'EMEA' | 'APAC'>('All');
  const [taxDashStatusFilter, setTaxDashStatusFilter] = useState<'All' | 'Compliant' | 'Pending Review' | 'Exempt'>('All');
  const [taxExemptionCertificates, setTaxExemptionCertificates] = useState([
    { id: 'CERT-EU-8821', operator: 'Maersk Baltic Logistics', jurisdiction: 'EU MOSS VAT', status: 'VALID', expires: '2027-12-31' },
    { id: 'CERT-US-4019', operator: 'Pacific Cargo Transporter', jurisdiction: 'US California Sales Tax', status: 'VALID', expires: '2026-11-15' },
    { id: 'CERT-SG-9102', operator: 'Oceanic Express SG', jurisdiction: 'Singapore IRAS GST', status: 'AUDIT PENDING', expires: '2026-09-30' }
  ]);

  // Revenue Alerts State
  const [revenueAlertRules, setRevenueAlertRules] = useState([
    { id: 'ALT-101', name: 'MRR Drop Below $40,000 Threshold', metric: 'MRR', threshold: '$40,000', channel: 'Slack & Email', status: 'ACTIVE', severity: 'Critical' },
    { id: 'ALT-102', name: 'Monthly Churn Rate Spike (> 1.5%)', metric: 'Churn %', threshold: '1.5%', channel: 'PagerDuty & Webhook', status: 'ACTIVE', severity: 'High' },
    { id: 'ALT-103', name: 'High-Value Invoice Overdue (> $10,000)', metric: 'Overdue Billing', threshold: '$10,000', channel: 'In-App & Email', status: 'ACTIVE', severity: 'Medium' },
    { id: 'ALT-104', name: 'Tax Filing Deadline Approaching (< 7 Days)', metric: 'Tax Compliance', threshold: '7 Days', channel: 'Email & SMS', status: 'ACTIVE', severity: 'High' },
    { id: 'ALT-105', name: 'FX Currency Volatility Drift (> 2.0%)', metric: 'FX Rate', threshold: '2.0%', channel: 'Slack', status: 'PAUSED', severity: 'Low' }
  ]);
  const [newAlertName, setNewAlertName] = useState('');
  const [newAlertMetric, setNewAlertMetric] = useState('MRR');
  const [newAlertThreshold, setNewAlertThreshold] = useState('$50,000');

  // Smart Tax Overview State
  const [smartTaxAnnualRevenue, setSmartTaxAnnualRevenue] = useState(540000);
  const [smartTaxStandardDeduction, setSmartTaxStandardDeduction] = useState(85000);
  const [smartTaxRdCreditPct, setSmartTaxRdCreditPct] = useState(15);
  const [smartTaxJurisdictionFilter, setSmartTaxJurisdictionFilter] = useState<'All' | 'EU MOSS' | 'US State' | 'Singapore GST' | 'UK HMRC'>('All');

  // Global Tariff Comparison & Heatmap State
  const [tariffVesselClass, setTariffVesselClass] = useState<'Container Vessel' | 'Oil Tanker' | 'Bulk Carrier' | 'Cruise Ship'>('Container Vessel');
  const [tariffPortFilter, setTariffPortFilter] = useState<'All' | 'Europe' | 'Asia' | 'Americas' | 'Middle East'>('All');
  const [tariffTonnageGross, setTariffTonnageGross] = useState(45000);

  const [heatmapMetric, setHeatmapMetric] = useState<'Total Tariff Rate' | 'Cyber Security Surcharge' | 'Decarbonization Levy' | 'Pilotage Dues'>('Total Tariff Rate');
  const [heatmapRegion, setHeatmapRegion] = useState<'All' | 'Europe' | 'Asia-Pacific' | 'Americas' | 'Middle East'>('All');
  const [heatmapVesselTonnage, setHeatmapVesselTonnage] = useState(55000);

  // Revenue Projection Graph & Smart Projection State
  const [projGrowthScenario, setProjGrowthScenario] = useState<'Conservative' | 'Base Case' | 'Hypergrowth'>('Base Case');
  const [projMonthsAhead, setProjMonthsAhead] = useState<12 | 24 | 36>(12);
  const [projExpansionRate, setProjExpansionRate] = useState(15);
  const [projChurnRate, setProjChurnRate] = useState(0.8);

  const [smartProjTargetArr, setSmartProjTargetArr] = useState(1200000);
  const [smartProjVesselCount, setSmartProjVesselCount] = useState(48);
  const [smartProjExpansionPct, setSmartProjExpansionPct] = useState(22);
  const [smartProjGrossMarginPct, setSmartProjGrossMarginPct] = useState(84);
  const [smartProjAiOptimization, setSmartProjAiOptimization] = useState(true);

  // Currency Hedging Guide State
  const [hedgeExposureUsd, setHedgeExposureUsd] = useState(250000);
  const [hedgeStrategy, setHedgeStrategy] = useState<'Forward Contract' | 'Options Collar' | 'Cross-Currency Swap'>('Forward Contract');
  const [hedgeVolatilityRate, setHedgeVolatilityRate] = useState(8.5);
  const [hedgeDurationMonths, setHedgeDurationMonths] = useState(6);

  // Smart Fiscal AI Advisor State
  const [fiscalRiskTolerance, setFiscalRiskTolerance] = useState<'Balanced' | 'Conservative' | 'Aggressive'>('Balanced');
  const [fiscalOpExTarget, setFiscalOpExTarget] = useState(480000);
  const [fiscalTaxShieldPct, setFiscalTaxShieldPct] = useState(18);
  const [fiscalQueryText, setFiscalQueryText] = useState('');
  const [fiscalAiAdviceList, setFiscalAiAdviceList] = useState([
    { id: 'f1', topic: 'R&D Tax Offsets', advice: 'Reclassify autonomous AIS threat detection development under Section 41 credits to unlock ~$38,500 in quarterly tax savings.', savings: '$38,500', status: 'Recommended' },
    { id: 'f2', topic: 'Satellite Data Amortization', advice: 'Accelerate depreciation of shipboard satcom antennas under Section 179 for immediate cash flow relief.', savings: '$14,200', status: 'Pending Review' },
    { id: 'f3', topic: 'High-Seas VAT Exemption', advice: 'Structure telemetry data subscriptions delivered outside 12-nautical-mile territorial waters to qualify for 0% VAT rate.', savings: '$22,800', status: 'Applied' }
  ]);

  // Customizable Revenue Dashboards State
  const [dashVisibleWidgets, setDashVisibleWidgets] = useState({
    mrrChart: true,
    arrMetrics: true,
    churnBreakdown: true,
    regionalRevenue: true,
    vesselTierPricing: true,
    taxExemptions: true
  });
  const [dashLayoutMode, setDashLayoutMode] = useState<'Executive Grid' | 'Compact Matrix' | 'Dense Analytics'>('Executive Grid');
  const [dashPrimaryCurrency, setDashPrimaryCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'SGD'>('USD');

  // Multi Currency Forecast Engine State
  const [fxForecastBaseCurrency, setFxForecastBaseCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'SGD' | 'JPY'>('USD');
  const [fxCorridor, setFxCorridor] = useState<'USD/EUR' | 'USD/GBP' | 'USD/SGD' | 'USD/JPY'>('USD/EUR');
  const [fxHorizonMonths, setFxHorizonMonths] = useState<6 | 12 | 24>(12);
  const [fxVolScenario, setFxVolScenario] = useState<'Standard Market' | 'Low Volatility' | 'High Macro Drift (+18%)'>('Standard Market');
  const [fxHedgeCoveragePct, setFxHedgeCoveragePct] = useState(65);

  // Revenue AI Forecast State
  const [revForecastArrTarget, setRevForecastArrTarget] = useState(620000);
  const [revForecastGrowthFactor, setRevForecastGrowthFactor] = useState(22);
  const [revForecastConfidenceLevel, setRevForecastConfidenceLevel] = useState<'P10' | 'P50' | 'P90'>('P50');
  const [revForecastAiOptimization, setRevForecastAiOptimization] = useState(true);

  // Tariff Optimization UI State
  const [tariffOptSelectedPort, setTariffOptSelectedPort] = useState('Port of Rotterdam (NLRTM)');
  const [tariffOptVesselDisplacement, setTariffOptVesselDisplacement] = useState(85000);
  const [tariffOptEcoRebateActive, setTariffOptEcoRebateActive] = useState(true);
  const [tariffOptOffpeakPilotage, setTariffOptOffpeakPilotage] = useState(true);

  // Fiscal Health Score State
  const [fiscalHealthCapitalReserve, setFiscalHealthCapitalReserve] = useState(850000);
  const [fiscalHealthDebtRatio, setFiscalHealthDebtRatio] = useState(1.4);
  const [fiscalHealthTaxComplianceScore, setFiscalHealthTaxComplianceScore] = useState(98);
  const [fiscalHealthFxHedgeScore, setFiscalHealthFxHedgeScore] = useState(92);

  // Multi Currency Alert State
  const [multiCurrencyAlertThresholdPct, setMultiCurrencyAlertThresholdPct] = useState(3.5);
  const [multiCurrencySelectedCorridor, setMultiCurrencySelectedCorridor] = useState<'USD/EUR' | 'USD/GBP' | 'USD/SGD' | 'USD/JPY'>('USD/EUR');
  const [multiCurrencyAlertLog, setMultiCurrencyAlertLog] = useState([
    { id: 'mca1', corridor: 'USD/EUR', volatilityPct: '+4.2%', impact: '-$12,400', status: 'Active Alert', timestamp: '8 mins ago' },
    { id: 'mca2', corridor: 'USD/JPY', volatilityPct: '+6.8%', impact: '-$28,500', status: 'Hedge Executed', timestamp: '42 mins ago' },
    { id: 'mca3', corridor: 'USD/GBP', volatilityPct: '-2.1%', impact: '+$8,200', status: 'Monitoring', timestamp: '2 hrs ago' }
  ]);

  // Automated Tariff Alert State
  const [tariffAlertThreshold, setTariffAlertThreshold] = useState(1200);
  const [tariffAlertRegion, setTariffAlertRegion] = useState<'All Harbors' | 'EU Harbors' | 'APAC Ports' | 'Americas Coastal' | 'Middle East Gulf'>('All Harbors');
  const [tariffAlertChannels, setTariffAlertChannels] = useState({
    email: true,
    sms: false,
    webhook: true,
    inApp: true
  });
  const [tariffAlertHistory, setTariffAlertHistory] = useState([
    { id: 'ta1', port: 'Port of Rotterdam', code: 'NLRTM', alertType: 'Cyber Surcharge Surge', oldVal: '$450', newVal: '$1,850', status: 'Active Alert', timestamp: '12 mins ago' },
    { id: 'ta2', port: 'Port of Los Angeles', code: 'USLAX', alertType: 'Pilotage Fee Increase', oldVal: '$1,800', newVal: '$2,450', status: 'Acknowledged', timestamp: '1 hr ago' },
    { id: 'ta3', port: 'Shanghai Yangshan', code: 'CNSHA', alertType: 'Decarbonization Levy Shift', oldVal: '$300', newVal: '$1,250', status: 'Reroute Suggested', timestamp: '3 hrs ago' }
  ]);

  // Smart Tariff Visualizer State
  const [smartTariffSelectedTradeRoute, setSmartTariffSelectedTradeRoute] = useState<'Transpacific' | 'Transatlantic' | 'Asia-Europe' | 'Intra-APAC'>('Asia-Europe');
  const [smartTariffContainerVolume, setSmartTariffContainerVolume] = useState(650);
  const [smartTariffHsCodeFilter, setSmartTariffHsCodeFilter] = useState('');
  const [smartTariffCompareEcoLevy, setSmartTariffCompareEcoLevy] = useState(true);

  // Revenue Projection AI State
  const [revProjAiHorizonMonths, setRevProjAiHorizonMonths] = useState<6 | 12 | 24 | 36>(12);
  const [revProjAiExpansionRate, setRevProjAiExpansionRate] = useState(24);
  const [revProjAiChurnMitigation, setRevProjAiChurnMitigation] = useState(true);
  const [revProjAiScenario, setRevProjAiScenario] = useState<'Optimistic (+28%)' | 'Baseline (+18%)' | 'Macro Stress Test (-5%)'>('Baseline (+18%)');

  // Fiscal Health Scorecard State
  const [fiscalScorecardLiquidity, setFiscalScorecardLiquidity] = useState(94);
  const [fiscalScorecardSolvency, setFiscalScorecardSolvency] = useState(88);
  const [fiscalScorecardTaxCompliance, setFiscalScorecardTaxCompliance] = useState(98);
  const [fiscalScorecardFxHedging, setFiscalScorecardFxHedging] = useState(91);

  // Exporters & Importers Goods Stockholders Info State
  const [stockHolderTypeFilter, setStockHolderTypeFilter] = useState<'All' | 'Exporters' | 'Importers' | 'Warehouses'>('All');
  const [stockHolderSearchQuery, setStockHolderSearchQuery] = useState('');
  const [stockHoldersList, setStockHoldersList] = useState([
    {
      id: 'sh1',
      name: 'Pacific Rim Trade Logistics LLC',
      type: 'Exporters',
      region: 'APAC / Singapore',
      goodsCategory: 'Electronics & Semiconductor Components',
      inventoryValueUsd: '$14,250,000',
      teuCapacity: '2,400 TEU',
      bondedWarehouseCode: 'SG-BWH-8812',
      complianceScore: 99,
      contactEmail: 'logistics@pacificrimtrade.sg',
      activeShipments: 18,
      securityClearance: 'AEO Certified (Level 3)'
    },
    {
      id: 'sh2',
      name: 'EuroFreight Clearing House B.V.',
      type: 'Importers',
      region: 'Europe / Rotterdam',
      goodsCategory: 'Industrial Machinery & Precision Tools',
      inventoryValueUsd: '$28,900,000',
      teuCapacity: '4,100 TEU',
      bondedWarehouseCode: 'NL-RTM-4409',
      complianceScore: 97,
      contactEmail: 'clearance@eurofreight.nl',
      activeShipments: 24,
      securityClearance: 'C-TPAT Equivalent'
    },
    {
      id: 'sh3',
      name: 'Americas Coastal Storage Hub',
      type: 'Warehouses',
      region: 'Americas / Los Angeles',
      goodsCategory: 'Automotive Parts & EV Battery Packs',
      inventoryValueUsd: '$36,400,000',
      teuCapacity: '6,800 TEU',
      bondedWarehouseCode: 'US-LAX-1092',
      complianceScore: 95,
      contactEmail: 'ops@americascoastal.com',
      activeShipments: 32,
      securityClearance: 'US Customs Bonded'
    },
    {
      id: 'sh4',
      name: 'Nippon Transpacific Exports Co.',
      type: 'Exporters',
      region: 'APAC / Yokohama',
      goodsCategory: 'Optical Equipment & Precision Sensors',
      inventoryValueUsd: '$19,800,000',
      teuCapacity: '1,850 TEU',
      bondedWarehouseCode: 'JP-YOK-7731',
      complianceScore: 98,
      contactEmail: 'trade@nippontrans.jp',
      activeShipments: 12,
      securityClearance: 'JSCA Gold Partner'
    }
  ]);

  // Export Stock Tracker State
  const [exportStockSearchQuery, setExportStockSearchQuery] = useState('');
  const [exportStockPortFilter, setExportStockPortFilter] = useState<'All Harbors' | 'Rotterdam' | 'Singapore' | 'Los Angeles' | 'Yokohama'>('All Harbors');
  const [exportStockItems, setExportStockItems] = useState([
    {
      id: 'est-101',
      cargoId: 'CRG-8820-SG',
      commodity: 'High-Density Semiconductor Wafer Modules',
      exporter: 'Pacific Rim Microtech Corp',
      originPort: 'Singapore (SGSIN)',
      destPort: 'Rotterdam (NLRTM)',
      stockQty: '1,200 Pallets',
      teuVolume: '45 TEU',
      bondedWarehouse: 'SGSIN Terminal 4 Depot',
      valuationUsd: '$8,450,000',
      customsStatus: 'Cleared for Export',
      temperatureControlled: true,
      riskLevel: 'Low'
    },
    {
      id: 'est-102',
      cargoId: 'CRG-9402-NL',
      commodity: 'Precision Marine Propulsion Assemblies',
      exporter: 'EuroDrive Heavy Industries B.V.',
      originPort: 'Rotterdam (NLRTM)',
      destPort: 'Los Angeles (USLAX)',
      stockQty: '340 Units',
      teuVolume: '28 TEU',
      bondedWarehouse: 'NLRTM Dockside Storage B',
      valuationUsd: '$12,900,000',
      customsStatus: 'Under Customs Audit',
      temperatureControlled: false,
      riskLevel: 'Medium'
    },
    {
      id: 'est-103',
      cargoId: 'CRG-3310-US',
      commodity: 'Automotive EV Solid-State Battery Packs',
      exporter: 'Tesla-Pacific Energy Logistics',
      originPort: 'Los Angeles (USLAX)',
      destPort: 'Yokohama (JPYOK)',
      stockQty: '2,800 Modules',
      teuVolume: '82 TEU',
      bondedWarehouse: 'USLAX Pier 400 Bonded Depot',
      valuationUsd: '$21,500,000',
      customsStatus: 'Cleared for Export',
      temperatureControlled: true,
      riskLevel: 'Low'
    }
  ]);

  // Exporter & Importer Goods Insurance Portal State
  const [insuranceApplicantType, setInsuranceApplicantType] = useState<'Exporter' | 'Importer' | 'Freight Forwarder'>('Exporter');
  const [insuranceCoverageType, setInsuranceCoverageType] = useState<'All-Risks Marine Hull & Cargo' | 'Institute Cargo Clauses (A)' | 'War & Piracy Risk Surcharge' | 'Temperature Control Breakdown'>('All-Risks Marine Hull & Cargo');
  const [insuranceCargoValueUsd, setInsuranceCargoValueUsd] = useState(750000);
  const [insuranceDeductibleOption, setInsuranceDeductibleOption] = useState(5000);
  const [insuranceRouteRiskLevel, setInsuranceRouteRiskLevel] = useState<'Low Risk (Standard Corridor)' | 'Medium Risk (Monsoon Zone)' | 'High Risk (Strait Sentinel Guidance)'>('Low Risk (Standard Corridor)');
  const [insuranceApplicationsLog, setInsuranceApplicationsLog] = useState([
    {
      policyId: 'POL-2026-8801',
      applicantName: 'Pacific Rim Trade Logistics',
      type: 'Exporter',
      coverage: 'All-Risks Marine Hull & Cargo',
      declaredValue: '$1,250,000',
      annualPremium: '$4,125',
      deductible: '$5,000',
      status: 'Approved & Active',
      timestamp: 'Today, 09:15 AM'
    },
    {
      policyId: 'POL-2026-4412',
      applicantName: 'EuroFreight Clearing B.V.',
      type: 'Importer',
      coverage: 'Institute Cargo Clauses (A)',
      declaredValue: '$3,400,000',
      annualPremium: '$11,220',
      deductible: '$10,000',
      status: 'Underwriting Review',
      timestamp: 'Yesterday'
    }
  ]);

  // Insurance Dashboard State
  const [insuranceDashRouteFilter, setInsuranceDashRouteFilter] = useState<'All Routes' | 'Asia-Europe' | 'Transpacific' | 'Intra-APAC'>('All Routes');
  const [insuranceDashActivePolicies, setInsuranceDashActivePolicies] = useState([
    {
      id: 'POL-MAR-901',
      policyNumber: 'MC-2026-7782-A',
      insuredParty: 'Pacific Rim Microtech Ltd',
      route: 'Asia-Europe',
      coverageType: 'All-Risks Clause A + War Risk',
      sumInsuredUsd: '$18,500,000',
      annualPremiumUsd: '$48,200',
      deductibleUsd: '$10,000',
      expiryDate: '2027-03-15',
      status: 'Active',
      lossRatio: '0.0%'
    },
    {
      id: 'POL-MAR-902',
      policyNumber: 'MC-2026-4410-B',
      insuredParty: 'EuroDrive Heavy Industries',
      route: 'Transpacific',
      coverageType: 'Institute Cargo Clause (A)',
      sumInsuredUsd: '$22,100,000',
      annualPremiumUsd: '$62,000',
      deductibleUsd: '$15,000',
      expiryDate: '2026-11-30',
      status: 'Active',
      lossRatio: '2.4%'
    },
    {
      id: 'POL-MAR-903',
      policyNumber: 'MC-2026-1190-C',
      insuredParty: 'Tesla-Pacific Energy Logistics',
      route: 'Intra-APAC',
      coverageType: 'Temperature & Perishable Sensor Rider',
      sumInsuredUsd: '$11,800,000',
      annualPremiumUsd: '$32,300',
      deductibleUsd: '$5,000',
      expiryDate: '2027-01-20',
      status: 'Active',
      lossRatio: '1.1%'
    }
  ]);

  // Claims History State
  const [claimsFilterStatus, setClaimsFilterStatus] = useState<'All' | 'Under Review' | 'Approved & Disbursed' | 'Pending Evidence'>('All');
  const [newClaimModalOpen, setNewClaimModalOpen] = useState(false);
  const [newClaimCargoId, setNewClaimCargoId] = useState('');
  const [newClaimTitle, setNewClaimTitle] = useState('');
  const [newClaimAmountUsd, setNewClaimAmountUsd] = useState(25000);
  const [newClaimIncidentType, setNewClaimIncidentType] = useState<'Seawater Ingress' | 'Container Collision' | 'Temperature Spoilage' | 'Piracy/Theft'>('Seawater Ingress');
  const [newClaimNotes, setNewClaimNotes] = useState('');
  const [claimsList, setClaimsList] = useState([
    {
      claimId: 'CLM-2026-0041',
      policyNumber: 'MC-2026-4410-B',
      cargoId: 'CRG-9402-NL',
      title: 'Container Seal Saltwater Seepage - High Pressure Valves',
      amountUsd: '$42,500',
      incidentType: 'Seawater Ingress',
      location: 'Suez Canal Approach (27.8° N, 34.2° E)',
      surveyorReport: 'Lloyds Marine Surveyor report confirms rubber gasket failure during Sea State 6.',
      status: 'Approved & Disbursed',
      payoutProgress: 100,
      timestamp: '2026-07-18'
    },
    {
      claimId: 'CLM-2026-0089',
      policyNumber: 'MC-2026-1190-C',
      cargoId: 'CRG-3310-US',
      title: 'Cold-Chain Thermal Sensor Breach - Battery Cells',
      amountUsd: '$18,200',
      incidentType: 'Temperature Spoilage',
      location: 'Strait of Malacca (2.5° N, 101.8° E)',
      surveyorReport: 'Reefer unit power failure logged for 4.2 hours. IoT telematics data attached.',
      status: 'Under Review',
      payoutProgress: 65,
      timestamp: '2026-08-02'
    },
    {
      claimId: 'CLM-2026-0102',
      policyNumber: 'MC-2026-7782-A',
      cargoId: 'CRG-8820-SG',
      title: 'Deck Crane Heavy Slamming Impact Damage',
      amountUsd: '$31,000',
      incidentType: 'Container Collision',
      location: 'Rotterdam Terminal Pier 7',
      surveyorReport: 'Awaiting dockside bill of lading and crane telemetry logs.',
      status: 'Pending Evidence',
      payoutProgress: 25,
      timestamp: '2026-08-09'
    }
  ]);

  // Smart Insurance Advisor State
  const [advisorRiskScenario, setAdvisorRiskScenario] = useState<'Monsoon Sea Corridor Risk' | 'High-Value Semiconductor Transit' | 'Strait Piracy Escort Protocol'>('Monsoon Sea Corridor Risk');
  const [advisorCargoDeductibleSim, setAdvisorCargoDeductibleSim] = useState(10000);
  const [advisorAppliedRecommendations, setAdvisorAppliedRecommendations] = useState<string[]>([]);

  // Auto Renewal UI State
  const [autoRenewalMasterToggle, setAutoRenewalMasterToggle] = useState(true);
  const [autoRenewalPriceCapLimitPercent, setAutoRenewalPriceCapLimitPercent] = useState(8);
  const [autoRenewalNotificationWindowDays, setAutoRenewalNotificationWindowDays] = useState(30);
  const [autoRenewalPaymentMethod, setAutoRenewalPaymentMethod] = useState<'Corporate SEPA Escrow' | 'Swift Wire Transfer' | 'Enterprise Credit Line'>('Corporate SEPA Escrow');
  const [autoRenewalPolicies, setAutoRenewalPolicies] = useState([
    {
      policyId: 'POL-MAR-901',
      policyName: 'Pacific Rim All-Risks Cargo Coverage',
      route: 'Asia-Europe',
      expiryDate: '2027-03-15',
      renewalQuoteUsd: '$48,200',
      status: 'Scheduled',
      autoRenewEnabled: true
    },
    {
      policyId: 'POL-MAR-902',
      policyName: 'EuroDrive Transpacific Heavy Duty Hull Policy',
      route: 'Transpacific',
      expiryDate: '2026-11-30',
      renewalQuoteUsd: '$62,000',
      status: 'Scheduled',
      autoRenewEnabled: true
    },
    {
      policyId: 'POL-MAR-903',
      policyName: 'Tesla Energy Perishable Battery Sensor Rider',
      route: 'Intra-APAC',
      expiryDate: '2027-01-20',
      renewalQuoteUsd: '$32,300',
      status: 'Paused',
      autoRenewEnabled: false
    }
  ]);

  // Medical Examination Centre & Hospital State (Airways & Maritime Jobs & Students)
  const [medSearchQuery, setMedSearchQuery] = useState('');
  const [medCategoryFilter, setMedCategoryFilter] = useState<'All' | 'Airways (Aviation)' | 'Maritime (Seafarers)' | 'Cadets & Students'>('All');
  const [medRegionFilter, setMedRegionFilter] = useState<'All Regions' | 'Asia-Pacific' | 'Europe & UK' | 'Middle East & Africa' | 'Americas'>('All Regions');
  const [selectedDetailCenterId, setSelectedDetailCenterId] = useState<string | null>(null);
  
  // Booking Modal State
  const [medBookingModalOpen, setMedBookingModalOpen] = useState(false);
  const [medBookingCenterName, setMedBookingCenterName] = useState('');
  const [medCandidateName, setMedCandidateName] = useState('');
  const [medCandidateEmail, setMedCandidateEmail] = useState('');
  const [medCandidateType, setMedCandidateType] = useState<'Airways Job Seeker' | 'Maritime Job Seeker' | 'Aviation Cadet Student' | 'Maritime Student Cadet'>('Aviation Cadet Student');
  const [medExamPackageSelect, setMedExamPackageSelect] = useState('Airways Class 1 Initial & Renewal (FAA/EASA)');
  const [medBookingDate, setMedBookingDate] = useState('2026-08-25');

  // Fit-to-Work Self Assessment Tool State
  const [fitSelfAssessModalOpen, setFitSelfAssessModalOpen] = useState(false);
  const [fitAssessSector, setFitAssessSector] = useState<'Airways' | 'Maritime'>('Airways');
  const [fitAssessVision, setFitAssessVision] = useState<'20/20 Perfect' | 'Corrected with Lenses' | 'Color Vision Deficiency'>('20/20 Perfect');
  const [fitAssessHearing, setFitAssessHearing] = useState<'Normal Audiogram' | 'Mild Hearing Loss'>('Normal Audiogram');

  const [medCentersList, setMedCentersList] = useState([
    {
      id: 'MED-SG-01',
      name: 'Singapore Aeromedical & Maritime Medical Institute',
      hospitalAffiliation: 'Raffles Medical Group & Changi Aviation Hospital Wing',
      accreditations: ['FAA Class 1/2/3 Senior AME', 'EASA Part-MED Certified', 'UK MCA ENG1 Authorized', 'MPA Singapore Seafarer Approved', 'US Coast Guard Certified'],
      sector: 'Both Airways & Maritime',
      region: 'Asia-Pacific',
      cityCountry: 'Singapore (Changi Airport T3 & HarbourFront Hub)',
      address: '60 Airport Boulevard, #04-12 Changi Aviation Hub, Singapore 819643',
      phone: '+65 6543 2800',
      emergencyHelpline: '+65 6543 2899 (24/7 Aeromedical Flight Surgeon)',
      email: 'medicals@aeromaritime.sg',
      website: 'https://aeromaritime-medicals.sg',
      operatingHours: 'Mon - Sat: 07:30 - 18:00 SGT (Walk-ins & Online Booking)',
      targetAudience: ['Commercial Airline Pilots (Class 1)', 'Flight Attendants & Cabin Crew', 'Ship Captains & Marine Engineers (ENG1)', 'Cadet Flight Students', 'Maritime Academy Students'],
      examPackages: [
        { name: 'Airways Class 1 Initial & Renewal (FAA/EASA)', priceUsd: '$380', cadetDiscountPrice: '$285 (25% Student Discount)', duration: '2.5 Hours', testsIncluded: '12-Lead ECG, Ishihara Color Vision, Pure Tone Audiometry, Spirometry, Chest X-Ray, Blood/Urine Toxicology, Visual Acuity 6/6' },
        { name: 'Maritime ENG1 & STCW Fitness Medical', priceUsd: '$190', cadetDiscountPrice: '$140 (26% Cadet Discount)', duration: '1.5 Hours', testsIncluded: 'Physical Stamina, Audiogram, Ishihara Color Blindness, Urine Drug Screen, Dental Check, Mental Agility & Reflex Test' },
        { name: 'Cadet Student Pre-Admission Comprehensive Screening', priceUsd: '$150', cadetDiscountPrice: '$110 (Special Academy Rate)', duration: '2.0 Hours', testsIncluded: 'Complete Blood Count, Lipid Panel, ECG, Vision, Hearing, Spinal Alignment & BMI Evaluation' }
      ],
      cadetScholarshipAssistance: '25% Cadets Discount with Student ID & Academy Admission Letter',
      documentRequirements: [
        'Valid Passport or National Identity Card',
        'Previous Medical Certificate (if renewal)',
        'Flight Logbook / Maritime Continuous Discharge Certificate (CDC)',
        'Student Academy Enrollment Letter or Student ID (for Cadet discount)',
        'Prescription Glasses / Contact Lenses with optician prescription report'
      ],
      rating: 4.9,
      reviewsCount: 420
    },
    {
      id: 'MED-UK-02',
      name: 'Lloyds & Heathrow Aviation Medical & Seafarer Center',
      hospitalAffiliation: 'St. Peter\'s Specialist Hospital & Lloyds Maritime Health Wing',
      accreditations: ['UK CAA Class 1 Approved', 'EASA Certified AME', 'UK MCA ENG1 Authorized Center', 'Panama Maritime Authority Approved'],
      sector: 'Both Airways & Maritime',
      region: 'Europe & UK',
      cityCountry: 'London, United Kingdom (Heathrow Airport & Docklands)',
      address: 'Terminal 5 Aviation Health Center, Heathrow Airport, London TW6 2GA',
      phone: '+44 20 8759 4000',
      emergencyHelpline: '+44 20 8759 4999 (24/7 Aeromedical Desk)',
      email: 'uk-medicals@lloyds-aviation.co.uk',
      website: 'https://lloyds-aviation-health.co.uk',
      operatingHours: 'Mon - Fri: 08:00 - 17:30 GMT',
      targetAudience: ['Airline Pilots', 'Flight Instructors', 'Offshore Marine Crew', 'Merchant Navy Cadets', 'Aeronautical Engineering Students'],
      examPackages: [
        { name: 'UK CAA / EASA Class 1 Pilot Examination', priceUsd: '$410', cadetDiscountPrice: '$310 (Student Rate)', duration: '3.0 Hours', testsIncluded: 'Comprehensive Cardiac Assessment, 12-Lead ECG, EEG, Audiogram, Ophthalmology & Color Vision, Blood Biochemistry' },
        { name: 'UK MCA ENG1 Seafarer Medical Examination', priceUsd: '$175', cadetDiscountPrice: '$130 (Cadet Rate)', duration: '1.0 Hour', testsIncluded: 'Full Physical, Ishihara Test, Hearing Check, Urine Analysis, Medical History Audit' }
      ],
      cadetScholarshipAssistance: 'Free re-test for student cadets if minor corrective lenses are needed',
      documentRequirements: [
        'Government Photo ID / Passport',
        'CAA / MCA Reference Number',
        'Student ID Card from UK Aeronautical or Maritime College',
        'Optician Report if wearing corrective lenses'
      ],
      rating: 4.8,
      reviewsCount: 310
    },
    {
      id: 'MED-UAE-03',
      name: 'Emirates & Gulf Maritime Aeromedical Center',
      hospitalAffiliation: 'American Hospital Dubai & Dubai Healthcare City Aviation Wing',
      accreditations: ['UAE GCAA Class 1 Certified', 'FAA International AME', 'Bahrain & Saudi Maritime Authority Approved', 'STCW 2010 Compliant'],
      sector: 'Both Airways & Maritime',
      region: 'Middle East & Africa',
      cityCountry: 'Dubai, United Arab Emirates (Dubai Healthcare City)',
      address: 'Building 64, Al Razi Complex, Dubai Healthcare City, Dubai, UAE',
      phone: '+971 4 362 4700',
      emergencyHelpline: '+971 4 362 4799',
      email: 'aviation.med@gulfhealth.ae',
      website: 'https://gulfhealth-aviation-maritime.ae',
      operatingHours: 'Sun - Thu: 08:00 - 18:00 GST',
      targetAudience: ['Commercial Aviators', 'Air Cabin Crew Applicants', 'Tanker & Container Ship Officers', 'Emirates Aviation University Students'],
      examPackages: [
        { name: 'UAE GCAA & FAA Class 1 Aeromedical Initial', priceUsd: '$390', cadetDiscountPrice: '$290 (Student Discount)', duration: '2.5 Hours', testsIncluded: 'Cardiac Stress Test, Audiometry, Ophthalmology, Psychometric Fitness, Drug & Alcohol Screen' },
        { name: 'Maritime Officer Fit-for-Sea Certificate (STCW/IMO)', priceUsd: '$210', cadetDiscountPrice: '$150 (Cadet Rate)', duration: '1.5 Hours', testsIncluded: 'Physical Assessment, Vision, Hearing, Pulmonary Spirometry, Vaccinations Verification' }
      ],
      cadetScholarshipAssistance: 'Direct fast-track certification for Emirates Flight Training Academy cadets',
      documentRequirements: [
        'Emirates ID or Passport',
        'GCAA Portal Registration Code',
        'Aviation Academy / Maritime Institute Enrollment proof',
        'Passport size photographs'
      ],
      rating: 4.9,
      reviewsCount: 512
    },
    {
      id: 'MED-USA-04',
      name: 'Americas Maritime & Aeromedical Hospital Center',
      hospitalAffiliation: 'Miami International Health System & US Coast Guard Medical Center',
      accreditations: ['FAA Class 1/2/3 Senior AME', 'US Coast Guard CG-719K Authorized', 'Transport Canada Civil Aviation', 'Liberian & Marshall Islands Maritime Approved'],
      sector: 'Both Airways & Maritime',
      region: 'Americas',
      cityCountry: 'Miami, Florida, USA (Near Miami International Airport & PortMiami)',
      address: '4200 NW 36th Street, Suite 500, Miami, FL 33166',
      phone: '+1 305 871 2200',
      emergencyHelpline: '+1 305 871 2299',
      email: 'medicals@miamiaeromaritime.com',
      website: 'https://miamiaeromaritime.com',
      operatingHours: 'Mon - Fri: 07:00 - 17:00 EST',
      targetAudience: ['FAA Commercial Pilots', 'Cruise Line Officers & Crew', 'US Merchant Marine Cadets', 'Embry-Riddle Aviation Students'],
      examPackages: [
        { name: 'FAA Class 1 First-Class Medical Exam (MedXPress)', priceUsd: '$250', cadetDiscountPrice: '$180 (Flight Student Rate)', duration: '1.5 Hours', testsIncluded: 'FAA MedXPress Review, ECG (age 35+), Vision 20/20 Distant/Near, Hearing, Blood Pressure, Urinalysis' },
        { name: 'US Coast Guard CG-719K Merchant Mariner Medical Evaluation', priceUsd: '$220', cadetDiscountPrice: '$165 (Maritime Cadet Rate)', duration: '1.5 Hours', testsIncluded: 'Physical Capacity, Vision/Color Vision, Hearing Test, Physical Exam, Drug Testing (DOT 5-Panel)' }
      ],
      cadetScholarshipAssistance: 'Discounts for Embry-Riddle & SUNY Maritime College cadets',
      documentRequirements: [
        'US Driver License / Passport',
        'FAA MedXPress Confirmation Number',
        'USCG Medical Form CG-719K printed',
        'Student ID from accredited Flight School / Maritime Academy'
      ],
      rating: 4.8,
      reviewsCount: 640
    },
    {
      id: 'MED-IN-05',
      name: 'National Maritime & Aviation Medical Institute (DGCA & DGS)',
      hospitalAffiliation: 'Kokilaben Dhirubhai Ambani Hospital & Marine Medical Wing',
      accreditations: ['DGCA India Class 1 & 2 Approved AME', 'Directorate General of Shipping (DGS) Certified', 'UK MCA Recognized', 'IMO STCW Compliant'],
      sector: 'Both Airways & Maritime',
      region: 'Asia-Pacific',
      cityCountry: 'Mumbai, India (Andheri & Port Area Hub)',
      address: 'Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Mumbai 400053',
      phone: '+91 22 4269 6969',
      emergencyHelpline: '+91 22 4269 6999',
      email: 'dgca.medicals@kokilaben.com',
      website: 'https://kokilabenhospital.com/aviation-maritime',
      operatingHours: 'Mon - Sat: 08:30 - 17:00 IST',
      targetAudience: ['DGCA Commercial Pilots', 'Indigo & Air India Trainee Cadets', 'Merchant Navy Officers & Ratings', 'Tolani & AMET Maritime Students'],
      examPackages: [
        { name: 'DGCA India Class 1 Medical Renewal & Initial', priceUsd: '$180', cadetDiscountPrice: '$130 (Cadet Special)', duration: '3.0 Hours', testsIncluded: 'ECG, ENT Audiogram, Pure Tone, Ophthalmology (Cycloplegic Refraction), Clinical Biochemistry, Urine Drug Panel' },
        { name: 'DGS Approved Seafarer Fitness Certificate (Form 11)', priceUsd: '$95', cadetDiscountPrice: '$70 (Student Cadet Rate)', duration: '1.5 Hours', testsIncluded: 'Standard Physical Examination, Ishihara 38 Plates, Audiogram, Chest X-Ray, Blood Grouping & Hemoglobin' }
      ],
      cadetScholarshipAssistance: 'Special subsidies for IGRUA & Maritime Institute cadet students',
      documentRequirements: [
        'Aadhaar / Passport',
        'DGCA eGCA Medical ID Number',
        'DGS INDoS Number',
        'Academy Admission Letter / Student ID Card'
      ],
      rating: 4.9,
      reviewsCount: 890
    }
  ]);

  const [monetizationToggles, setMonetizationToggles] = useState({
    tieredEnterprise: true,
    inAppMicrotx: true,
    whiteLabelPortals: true,
    b2bApiMarketplace: true,
    paymentSurcharge: false
  });

  // Scanner State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState('Idle');
  const [scanType, setScanType] = useState<'quick' | 'deep' | 'ai-fraud' | 'auto'>('quick');

  // Automated Scan Settings
  const [autoScanEnabled, setAutoScanEnabled] = useState(true);
  const [autoScanInterval, setAutoScanInterval] = useState<'1h' | '6h' | '12h' | '24h'>('1h');
  const [autoQuarantine, setAutoQuarantine] = useState(true);
  const [autoPurgeCritical, setAutoPurgeCritical] = useState(false);
  const [lastAutoScanTime, setLastAutoScanTime] = useState('2026-08-11 01:45 UTC');
  const [nextAutoScanCountdown, setNextAutoScanCountdown] = useState('32m 18s');

  // Scam Shield State
  const [urlToTest, setUrlToTest] = useState('');
  const [scamCheckResult, setScamCheckResult] = useState<{
    status: 'safe' | 'dangerous' | null;
    score: number;
    details: string[];
  }>({ status: null, score: 0, details: [] });

  // Secure Vault & Encryption State
  const [vaultLocked, setVaultLocked] = useState(true);
  const [vaultCipher, setVaultCipher] = useState<'AES-256-GCM' | 'RSA-4096' | 'ChaCha20-Poly1305'>('AES-256-GCM');
  const [keyRotationTime, setKeyRotationTime] = useState('2026-08-11 00:00 UTC');
  const [logFilterSeverity, setLogFilterSeverity] = useState<'All' | 'Critical' | 'High' | 'Medium'>('All');
  const [logSearchTerm, setLogSearchTerm] = useState('');

  // Automated Patch Checker State
  const [isPatchScanning, setIsPatchScanning] = useState(false);
  const [patches, setPatches] = useState<PatchItem[]>([
    {
      id: 'PCH-001',
      component: 'AIS Marine Transponder Firmware',
      currentVersion: 'v4.2.1',
      latestVersion: 'v4.3.0',
      risk: 'High',
      cve: 'CVE-2026-9102',
      description: 'Neutralizes spoofed GPS positioning bursts and enhances transponder packet decryption rate.',
      status: 'Available'
    },
    {
      id: 'PCH-002',
      component: 'Crypto HSM Driver & Key Vault Enclave',
      currentVersion: 'v2.1.0',
      latestVersion: 'v2.1.2',
      risk: 'Critical',
      cve: 'CVE-2026-4410',
      description: 'Fixes side-channel padding oracle vulnerability in RSA-4096 handshake key vault.',
      status: 'Available'
    },
    {
      id: 'PCH-003',
      component: 'J1939 Engine CAN-Bus Gateway Buffer',
      currentVersion: 'v1.8.0',
      latestVersion: 'v1.8.0',
      risk: 'Up-to-Date',
      cve: 'N/A',
      description: 'CAN-Bus packet filtering engine running optimal non-blocking queue.',
      status: 'Up-to-Date'
    },
    {
      id: 'PCH-004',
      component: 'React UI Enterprise Kernel & Vite Engine',
      currentVersion: 'v18.3.1',
      latestVersion: 'v18.3.1',
      risk: 'Up-to-Date',
      cve: 'N/A',
      description: 'Client-side runtime security kernel verified with zero vulnerabilities.',
      status: 'Up-to-Date'
    }
  ]);

  // Breach Recovery UI State
  const [breachLockdownActive, setBreachLockdownActive] = useState(false);
  const [breachStep, setBreachStep] = useState<string>('Ready');
  const [breachProgress, setBreachProgress] = useState(0);
  const [breachLogs, setBreachLogs] = useState<string[]>([
    '[2026-08-11 00:00:00] System Backup Snapshot Created: SNAP-20260811-0000 (Clean Grade A+)',
    '[2026-08-11 01:30:00] Routine Integrity Check: All cryptographic checksums valid.'
  ]);

  // Security Health Score Matrix State
  const pendingPatchesCount = patches.filter(p => p.status === 'Available').length;
  const securityScoreCalculated = 100 - (pendingPatchesCount * 3) - (urlToTest.includes('scam') ? 5 : 0);
  const [securityScore, setSecurityScore] = useState(94);

  useEffect(() => {
    setSecurityScore(securityScoreCalculated < 80 ? 80 : securityScoreCalculated);
  }, [pendingPatchesCount, urlToTest]);

  const handleApplySinglePatch = (id: string) => {
    setPatches(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'Updating...' } : p))
    );
    setTimeout(() => {
      setPatches(prev =>
        prev.map(p =>
          p.id === id ? { ...p, status: 'Up-to-Date', risk: 'Up-to-Date', currentVersion: p.latestVersion } : p
        )
      );
    }, 1200);
  };

  const handleApplyAllPatches = () => {
    setIsPatchScanning(true);
    setPatches(prev => prev.map(p => ({ ...p, status: 'Updating...' })));
    setTimeout(() => {
      setPatches(prev =>
        prev.map(p => ({ ...p, status: 'Up-to-Date', risk: 'Up-to-Date', currentVersion: p.latestVersion }))
      );
      setIsPatchScanning(false);
    }, 1800);
  };

  const handleTriggerBreachRecovery = () => {
    setBreachLockdownActive(true);
    setBreachProgress(10);
    setBreachStep('Step 1/4: Isolating AIS & Network Interface Ports...');
    
    setTimeout(() => {
      setBreachProgress(35);
      setBreachStep('Step 2/4: Invalidating All Captain SSO & Auth Tokens...');
      setBreachLogs(prev => ['[EMERGENCY] Revoked all active user session tokens & JWT keys.', ...prev]);
    }, 1000);

    setTimeout(() => {
      setBreachProgress(70);
      setBreachStep('Step 3/4: Force Locking RSA-4096 Vault & HSM Cryptography...');
      setVaultLocked(true);
      setBreachLogs(prev => ['[EMERGENCY] Vault locked with AES-256-GCM hardware key isolation.', ...prev]);
    }, 2000);

    setTimeout(() => {
      setBreachProgress(100);
      setBreachStep('Step 4/4: Rolling Back Configuration to Clean Snapshot (2026-08-11 00:00 UTC)...');
      setBreachLogs(prev => ['[SUCCESS] System rolled back to safe state snapshot SNAP-20260811-0000. All threats neutralized.', ...prev]);
    }, 3200);
  };

  // Incident Response Playbooks State
  const [incidents, setIncidents] = useState<IncidentItem[]>([
    {
      id: 'INC-2026-904',
      severity: 'P1 - Critical',
      title: 'Rogue Transponder GPS Spoofing Attack in Strait of Malacca',
      targetSystem: 'AIS Marine Navigation Transponder (MMSI: 991823741)',
      assignedResponder: 'Harbormaster Cyber Unit Alpha',
      status: 'Active Containment',
      startedAt: '2026-08-11 02:10 UTC',
      playbookSteps: [
        { step: 'Isolate AIS RF Transponder input signal & switch to Inertial SatNav', done: true },
        { step: 'Issue Maritime Cyber Incident Alert to Port Authority', done: true },
        { step: 'Deploy RF Frequency Jamming Counter-measure & verify GPS lock', done: false },
        { step: 'Log cryptographic evidence to HSM Audit Enclave', done: false }
      ]
    },
    {
      id: 'INC-2026-882',
      severity: 'P2 - High',
      title: 'Credential Harvesting Phishing Link targeting Vessel Officers',
      targetSystem: 'SSO Captain Authorization Portal',
      assignedResponder: 'SOC AI Automated Defender',
      status: 'Mitigated',
      startedAt: '2026-08-10 18:45 UTC',
      playbookSteps: [
        { step: 'Blacklist phishing domain oceanbird-verify-login.xyz', done: true },
        { step: 'Revoke active OAuth JWT tokens & force password reset', done: true },
        { step: 'Notify affected crew members via secure encrypted SMS', done: true }
      ]
    }
  ]);

  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('INC-2026-904');

  const handleTogglePlaybookStep = (incId: string, stepIdx: number) => {
    setIncidents(prev =>
      prev.map(inc => {
        if (inc.id !== incId) return inc;
        const updatedSteps = inc.playbookSteps.map((s, idx) =>
          idx === stepIdx ? { ...s, done: !s.done } : s
        );
        const allDone = updatedSteps.every(s => s.done);
        return {
          ...inc,
          playbookSteps: updatedSteps,
          status: allDone ? 'Resolved' : 'Active Containment'
        };
      })
    );
  };

  // Security Key Manager State
  const [secKeys, setSecKeys] = useState<SecurityKeyItem[]>([
    {
      id: 'KEY-RSA-0941',
      name: 'AIS Satellite Transponder Signing Root Key',
      type: 'RSA-4096',
      assignedModule: 'RF VHF Navigation Transponder',
      createdDate: '2026-01-15',
      expiryDate: '2026-12-31',
      status: 'Active'
    },
    {
      id: 'KEY-ECDSA-8820',
      name: 'Captain SSO JWT OAuth Signing Key',
      type: 'ECDSA P-384',
      assignedModule: 'Captain Authorization Portal',
      createdDate: '2026-05-01',
      expiryDate: '2026-08-30',
      status: 'Expiring Soon'
    },
    {
      id: 'KEY-AES-5512',
      name: 'Engine Telemetry CAN-Bus Cipher Key',
      type: 'AES-256-GCM',
      assignedModule: 'J1939 Engine Management Unit',
      createdDate: '2026-03-10',
      expiryDate: '2027-03-10',
      status: 'Active'
    }
  ]);

  // Biometric Auth Audit Logs
  const [biometricLogs, setBiometricLogs] = useState<BiometricLogItem[]>([
    {
      id: 'BIO-9012',
      officerName: 'Captain Jonathan Vance',
      authMethod: '3D FaceID Scan',
      vesselModule: 'Bridge Master Control',
      confidenceScore: 99.8,
      ipAddress: '10.240.0.12 (Vessel LAN)',
      timestamp: '2026-08-11 02:40 UTC',
      result: 'Granted'
    },
    {
      id: 'BIO-9011',
      officerName: 'Chief Engineer Marcus Vance',
      authMethod: 'Fingerprint Sensor',
      vesselModule: 'Engine CAN-Bus Throttle Vault',
      confidenceScore: 98.5,
      ipAddress: '10.240.1.44 (Machinery Subnet)',
      timestamp: '2026-08-11 02:15 UTC',
      result: 'Granted'
    },
    {
      id: 'BIO-8998',
      officerName: 'Unknown Subject / Rogue User',
      authMethod: '3D FaceID Scan',
      vesselModule: 'SSO Authentication Portal',
      confidenceScore: 12.4,
      ipAddress: '198.51.100.89 (External Satellite IP)',
      timestamp: '2026-08-11 01:22 UTC',
      result: 'Denied'
    }
  ]);

  // Security Pulses Alert Feed
  const [securityPulses, setSecurityPulses] = useState<SecurityPulseItem[]>([
    {
      id: 'PULSE-8821',
      title: 'GPS Signal Doppler Shift Pulse Alert',
      pulseType: 'RF Frequency Jitter',
      severity: 'Critical',
      timestamp: '2 mins ago',
      details: 'Satellite doppler shift anomaly detected on VHF 161.975 MHz. Inertial Navigation recommended.',
      muted: false
    },
    {
      id: 'PULSE-8819',
      title: 'Malacca Strait Port Security Threat Broadcast',
      pulseType: 'Port Security Broadcast',
      severity: 'Warning',
      timestamp: '14 mins ago',
      details: 'Rogue AIS spoofing transponders reported in coastal sector Bravo 4.',
      muted: false
    },
    {
      id: 'PULSE-8812',
      title: 'Credential Harvesting Phishing Domain Spike',
      pulseType: 'Phishing Surge',
      severity: 'Warning',
      timestamp: '45 mins ago',
      details: 'AI Anti-Scammer Shield blocked 14 automated login attempts targeting marine crew.',
      muted: false
    }
  ]);

  // Breach Recovery Guide Interactive Flow
  const [breachRecoverySteps, setBreachRecoverySteps] = useState([
    { stepNum: 1, title: 'Network & Signal Isolation', desc: 'Sever external internet & VHF AIS input. Switch transponders to localized inertial backup.', completed: true },
    { stepNum: 2, title: 'Cryptographic Key Revocation', desc: 'Revoke active JWT bearer tokens, revoke RSA root keys, and rotate HSM vault secrets.', completed: false },
    { stepNum: 3, title: 'Malware & Firmware Purge', desc: 'Deploy automated memory purge script to clean volatile RAM enclaves and flash original firmware.', completed: false },
    { stepNum: 4, title: 'Post-Incident Forensic Backup', desc: 'Export cryptographically signed forensic logs to offline optical storage for maritime authority audit.', completed: false }
  ]);

  // Threats Data
  const [threats, setThreats] = useState<ThreatItem[]>([
    {
      id: 'THR-2026-901',
      type: 'Phishing Scammer',
      severity: 'Critical',
      source: 'SMS / Email: oceanbird-verify-login.xyz',
      description: 'Fraudulent login URL mimicking OceanBird Enterprise SSO to steal captain credentials.',
      detectedAt: '2026-08-11 02:14 UTC',
      status: 'Blocked'
    },
    {
      id: 'THR-2026-882',
      type: 'Spoofed Signal',
      severity: 'High',
      source: 'MMSI: 991823741 (Ghost Tugboat)',
      description: 'Rogue AIS transponder broadcasting spoofed GPS position near Malacca Strait.',
      detectedAt: '2026-08-10 19:40 UTC',
      status: 'Quarantined'
    },
    {
      id: 'THR-2026-740',
      type: 'Suspicious Token',
      severity: 'Medium',
      source: 'LocalStorage: auth_temp_session_key',
      description: 'Unsigned bearer token with invalid RSA signature attempt in app session storage.',
      detectedAt: '2026-08-09 11:05 UTC',
      status: 'Resolved'
    },
    {
      id: 'THR-2026-612',
      type: 'Fraudulent Booking',
      severity: 'High',
      source: 'IP: 185.220.101.4 (Stolen Card Proxy)',
      description: 'Automated bot attempt to generate 150 fake passenger tickets for Maldives Cruise.',
      detectedAt: '2026-08-08 22:18 UTC',
      status: 'Blocked'
    }
  ]);

  // Smart Anomalies State
  const [anomalies, setAnomalies] = useState<SmartAnomaly[]>([
    {
      id: 'ANOM-9021',
      title: 'Unusual AIS Transponder Burst Rate Spike',
      category: 'Telemetry Spoof',
      riskScore: 88,
      anomalyDetails: 'Transponder MMSI: 991823741 sent 450 position pings/sec (normal is 12 pings/sec). AI predicts ghost ship spoofing attempt.',
      detectedAt: '2026-08-11 02:22 UTC',
      status: 'Active'
    },
    {
      id: 'ANOM-8840',
      title: 'LocalStorage Component State Mutation Anomaly',
      category: 'Storage Tampering',
      riskScore: 74,
      anomalyDetails: 'Unsigned key `auth_session_debug` injected into browser storage outside standard React state handler.',
      detectedAt: '2026-08-11 01:50 UTC',
      status: 'Active'
    },
    {
      id: 'ANOM-7712',
      title: 'Port Engine CAN-Bus J1939 Latency Spike',
      category: 'CAN-Bus Latency',
      riskScore: 52,
      anomalyDetails: 'J1939 frame processing delay jumped from 1.2ms to 18.4ms during port maneuvering.',
      detectedAt: '2026-08-10 20:15 UTC',
      status: 'Mitigated'
    }
  ]);

  // Hardware Health Widgets Data
  const [hardwareWidgets, setHardwareWidgets] = useState<HardwareWidgetData[]>([
    {
      id: 'HW-GPS',
      name: 'GPS / GLONASS Receiver Unit',
      category: 'Satellite Navigation',
      healthPercent: 98,
      status: 'Optimal',
      metrics: [
        { label: 'Locked Satellites', value: '18 Satellites' },
        { label: 'HDOP Precision', value: '0.82 (Excellent)' },
        { label: 'Signal-to-Noise', value: '48.2 dBHz' },
        { label: 'Carrier Frequency', value: '1575.42 MHz' }
      ],
      lastCalibrated: '2026-08-11 00:00 UTC'
    },
    {
      id: 'HW-AIS',
      name: 'AIS / ADS-B Marine & Flight Transponder',
      category: 'RF Telemetry',
      healthPercent: 95,
      status: 'Optimal',
      metrics: [
        { label: 'TX Burst Power', value: '12.5 Watts' },
        { label: 'Packet Ack Rate', value: '100.0%' },
        { label: 'VSWR Antenna', value: '1.1 : 1' },
        { label: 'Channel Freq', value: '161.975 MHz' }
      ],
      lastCalibrated: '2026-08-10 18:30 UTC'
    },
    {
      id: 'HW-CAN',
      name: 'Avionics J1939 Engine CAN-Bus',
      category: 'Vehicle Control Bus',
      healthPercent: 92,
      status: 'Optimal',
      metrics: [
        { label: 'Bus Load Rate', value: '28.4%' },
        { label: 'Frame Jitter', value: '1.2 ms' },
        { label: 'Error Frame Rate', value: '0.00 %' },
        { label: 'Baud Speed', value: '250 kbps' }
      ],
      lastCalibrated: '2026-08-10 12:00 UTC'
    },
    {
      id: 'HW-SONAR',
      name: 'Dual-Frequency Seabed Acoustic Probe',
      category: 'Underwater Sonar',
      healthPercent: 97,
      status: 'Optimal',
      metrics: [
        { label: 'Current Seabed Depth', value: '142.4 meters' },
        { label: 'Acoustic Pulse', value: '50 / 200 kHz' },
        { label: 'Echo Return Lock', value: '99.1%' },
        { label: 'Water Temperature', value: '24.2 °C' }
      ],
      lastCalibrated: '2026-08-09 22:00 UTC'
    },
    {
      id: 'HW-HSM',
      name: 'Crypto Hardware Security Module (HSM)',
      category: 'Security Hardware',
      healthPercent: 100,
      status: 'Optimal',
      metrics: [
        { label: 'RSA Key Vault', value: 'RSA-4096 Locked' },
        { label: 'NFC Biometric Sensor', value: 'ISO 14443 Active' },
        { label: 'Anti-Tamper Mesh', value: '100% Intact' },
        { label: 'Chip Core Temp', value: '38.5 °C' }
      ],
      lastCalibrated: '2026-08-11 02:00 UTC'
    }
  ]);

  const handleStartScan = (type: 'quick' | 'deep' | 'ai-fraud' | 'auto') => {
    setScanType(type);
    setIsScanning(true);
    setScanProgress(0);

    const steps = [
      'Scanning local browser storage & session state...',
      'Verifying RSA signatures & auth tokens...',
      'Analyzing incoming AIS / ADS-B telemetry streams...',
      'Checking API hooks for XSS / SQL injection patterns...',
      'Cross-referencing phishing domain blacklists...',
      'AI Neural Fraud & Anomaly Verification...',
      'Finalizing threat report...'
    ];

    let currentProgress = 0;
    let stepIdx = 0;

    const interval = setInterval(() => {
      currentProgress += type === 'quick' ? 25 : 12;
      if (currentProgress > 100) currentProgress = 100;
      setScanProgress(currentProgress);

      stepIdx = Math.floor((currentProgress / 100) * (steps.length - 1));
      setScanStep(steps[stepIdx]);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setLastAutoScanTime(new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC');
      }
    }, 280);
  };

  const handleTestScamUrl = () => {
    if (!urlToTest.trim()) return;
    const lower = urlToTest.toLowerCase();
    const isSuspicious =
      lower.includes('free') ||
      lower.includes('verify') ||
      lower.includes('login-bank') ||
      lower.includes('.xyz') ||
      lower.includes('bit.ly') ||
      lower.includes('scam');

    if (isSuspicious) {
      setScamCheckResult({
        status: 'dangerous',
        score: 94,
        details: [
          'High risk: Domain contains known phishing keywords',
          'SSL Certificate mismatch with legitimate OceanBird domain',
          'Reported by 14 maritime security engines as fraudulent'
        ]
      });
      const newThreat: ThreatItem = {
        id: `THR-${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'Phishing Scammer',
        severity: 'Critical',
        source: urlToTest,
        description: 'User-scanned phishing / scam link detected and neutralized.',
        detectedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        status: 'Blocked'
      };
      setThreats(prev => [newThreat, ...prev]);
    } else {
      setScamCheckResult({
        status: 'safe',
        score: 5,
        details: [
          'Domain reputation verified clean',
          'Valid cryptographic SSL/TLS handshake',
          'No malicious redirects or fraud flags found'
        ]
      });
    }
  };

  const handleMitigateAnomaly = (id: string) => {
    setAnomalies(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Mitigated' } : a))
    );
  };

  const handleAcknowledgeAnomaly = (id: string) => {
    setAnomalies(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Acknowledged' } : a))
    );
  };

  const handleSimulateAnomaly = () => {
    const randId = `ANOM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAnom: SmartAnomaly = {
      id: randId,
      title: 'AI Detected Suspicious Remote API Probe',
      category: 'Network Burst',
      riskScore: Math.floor(65 + Math.random() * 30),
      anomalyDetails: 'Sudden burst of 85 HTTP HEAD requests from untrusted proxy IP 185.220.101.99 targeting app session endpoints.',
      detectedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      status: 'Active'
    };
    setAnomalies(prev => [newAnom, ...prev]);
  };

  const activeAnomaliesCount = anomalies.filter(a => a.status === 'Active').length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 font-sans">
      {/* SMART ANOMALY LIVE TOAST BANNER */}
      {activeAnomaliesCount > 0 && (
        <div className="bg-gradient-to-r from-rose-950 via-amber-950 to-slate-900 border-2 border-rose-500/60 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/40 shrink-0 animate-bounce">
              <BellRing className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
                  SMART ANOMALY ALERT ACTIVE
                </span>
                <span className="text-slate-400 text-xs">
                  {activeAnomaliesCount} AI Anomalies Detected
                </span>
              </div>
              <p className="text-white font-bold text-xs sm:text-sm mt-0.5">
                {anomalies.find(a => a.status === 'Active')?.title || 'Suspicious Telemetry Pattern Detected'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setActiveSubTab('smart-anomalies')}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md flex items-center space-x-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>INSPECT ANOMALIES</span>
            </button>
            <button
              onClick={() => {
                const first = anomalies.find(a => a.status === 'Active');
                if (first) handleMitigateAnomaly(first.id);
              }}
              className="px-4 py-2 bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-slate-800 font-bold text-xs rounded-xl transition-all"
            >
              AUTO-MITIGATE FIRST
            </button>
          </div>
        </div>
      )}

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldAlert className="w-64 h-64 text-rose-500" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-[11px] font-bold tracking-wider uppercase flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>CYBER SECURITY & HARDWARE HEALTH SUITE</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SHIELD ACTIVE ({securityScore}/100)</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Security Dashboard & Hardware Health Control
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-mono">
              Comprehensive defense hub featuring automated security scans, real-time hardware telemetry widgets, smart AI anomaly detection, and anti-scammer phishing protection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono">
            <button
              onClick={() => handleStartScan('quick')}
              disabled={isScanning}
              className="px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span>{isScanning ? 'SCANNING...' : 'RUN QUICK SECURITY SCAN'}</span>
            </button>
            <button
              onClick={() => handleStartScan('deep')}
              disabled={isScanning}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-slate-800 font-bold text-xs transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>DEEP AI SCAN</span>
            </button>
          </div>
        </div>

        {/* TOP METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-rose-500/20 font-mono text-xs">
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Security Posture</span>
            <span className="text-emerald-400 font-black text-sm flex items-center space-x-1 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{securityScore} / 100 Grade A+</span>
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Automated Scan</span>
            <span className="text-sky-300 font-black text-sm mt-0.5 block">
              {autoScanEnabled ? `Active (${autoScanInterval})` : 'Disabled'}
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Hardware Widgets</span>
            <span className="text-teal-300 font-black text-sm mt-0.5 block">5 / 5 Systems 100%</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Smart Anomalies</span>
            <span className="text-amber-300 font-black text-sm mt-0.5 block">
              {activeAnomaliesCount} Active Alerts
            </span>
          </div>
        </div>
      </div>

      {/* SCANNING PROGRESS OVERLAY */}
      {isScanning && (
        <div className="bg-slate-900 border-2 border-rose-500/60 rounded-3xl p-6 space-y-4 shadow-2xl animate-pulse font-mono">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bug className="w-6 h-6 text-rose-400 animate-spin" />
              <div>
                <h3 className="text-sm font-black text-white uppercase">
                  Security Scanner Engine Active ({scanType.toUpperCase()} SCAN)
                </h3>
                <p className="text-slate-400 text-xs">{scanStep}</p>
              </div>
            </div>
            <span className="text-2xl font-black text-rose-400">{scanProgress}%</span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'dashboard'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>SECURITY DASHBOARD</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security-overview')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'security-overview'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Globe className="w-4 h-4 text-sky-400" />
          <span>SECURITY OVERVIEW</span>
        </button>

        <button
          onClick={() => setActiveSubTab('incident-response')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'incident-response'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Crosshair className="w-4 h-4 text-rose-400" />
          <span>INCIDENT RESPONSE</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security-trends')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'security-trends'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>SECURITY TRENDS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quick-patch')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'quick-patch'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>QUICK PATCH UI {pendingPatchesCount > 0 && <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black animate-pulse">{pendingPatchesCount}</span>}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security-key-manager')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'security-key-manager'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Key className="w-4 h-4 text-purple-400" />
          <span>KEY MANAGER</span>
        </button>

        <button
          onClick={() => setActiveSubTab('biometric-auth-audit')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'biometric-auth-audit'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Eye className="w-4 h-4 text-sky-400" />
          <span>BIOMETRIC AUDIT</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security-pulses')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'security-pulses'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BellRing className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>SECURITY PULSES</span>
        </button>

        <button
          onClick={() => setActiveSubTab('breach-recovery-guide')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'breach-recovery-guide'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>BREACH RECOVERY GUIDE</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revenue-analytics')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'revenue-analytics'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>REVENUE ANALYTICS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('billing-portal')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'billing-portal'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4 text-sky-400" />
          <span>BILLING PORTAL</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tax-calculator')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'tax-calculator'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Receipt className="w-4 h-4 text-teal-400" />
          <span>TAX CALCULATOR</span>
        </button>

        <button
          onClick={() => setActiveSubTab('payment-history')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'payment-history'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <History className="w-4 h-4 text-amber-400" />
          <span>PAYMENT HISTORY</span>
        </button>

        <button
          onClick={() => setActiveSubTab('monetization-tips')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'monetization-tips'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>MONETIZATION TIPS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revenue-forecast')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'revenue-forecast'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>REVENUE FORECAST</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revenue-simulator')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'revenue-simulator'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>REVENUE SIMULATOR</span>
        </button>

        <button
          onClick={() => setActiveSubTab('automated-tax-reports')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'automated-tax-reports'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-teal-400" />
          <span>AUTOMATED TAX REPORTS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('monetization-benchmark')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'monetization-benchmark'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>MONETIZATION BENCHMARK</span>
        </button>

        <button
          onClick={() => setActiveSubTab('roi-calculator')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'roi-calculator'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Percent className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>ROI CALCULATOR</span>
        </button>

        <button
          onClick={() => setActiveSubTab('currency-converter')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'currency-converter'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4 text-sky-400" />
          <span>CURRENCY CONVERTER</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tax-dashboard')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'tax-dashboard'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Scale className="w-4 h-4 text-teal-400" />
          <span>TAX DASHBOARD</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revenue-alerts')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'revenue-alerts'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BellRing className="w-4 h-4 text-rose-400 animate-bounce" />
          <span>REVENUE ALERTS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('smart-tax-overview')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'smart-tax-overview'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Landmark className="w-4 h-4 text-teal-400" />
          <span>SMART TAX OVERVIEW</span>
        </button>

        <button
          onClick={() => setActiveSubTab('global-tariff-comparison')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'global-tariff-comparison'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>GLOBAL TARIFF COMPARISON</span>
        </button>

        <button
          onClick={() => setActiveSubTab('global-tariff-heatmap')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'global-tariff-heatmap'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span>GLOBAL TARIFF HEATMAP</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revenue-projection-graph')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'revenue-projection-graph'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <LineChart className="w-4 h-4 text-emerald-400" />
          <span>REVENUE PROJECTION GRAPH</span>
        </button>

        <button
          onClick={() => setActiveSubTab('smart-revenue-projection')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'smart-revenue-projection'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>SMART REVENUE PROJECTION</span>
        </button>

        <button
          onClick={() => setActiveSubTab('currency-hedging-guide')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'currency-hedging-guide'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 text-purple-400" />
          <span>CURRENCY HEDGING GUIDE</span>
        </button>

        <button
          onClick={() => setActiveSubTab('smart-fiscal-ai-advisor')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'smart-fiscal-ai-advisor'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>SMART FISCAL AI ADVISOR</span>
        </button>

        <button
          onClick={() => setActiveSubTab('customizable-revenue-dashboards')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'customizable-revenue-dashboards'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>CUSTOMIZABLE REVENUE DASHBOARDS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('multi-currency-forecast-engine')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'multi-currency-forecast-engine'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Coins className="w-4 h-4 text-sky-400" />
          <span>MULTI CURRENCY FORECAST ENGINE</span>
        </button>

        <button
          onClick={() => setActiveSubTab('automated-tariff-alert')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'automated-tariff-alert'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BellRing className="w-4 h-4 text-rose-400 animate-bounce" />
          <span>AUTOMATED TARIFF ALERT</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revenue-ai-forecast')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'revenue-ai-forecast'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>REVENUE AI FORECAST</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tariff-optimization-ui')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'tariff-optimization-ui'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Scale className="w-4 h-4 text-orange-400" />
          <span>TARIFF OPTIMIZATION UI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('fiscal-health-score')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'fiscal-health-score'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>FISCAL HEALTH SCORE</span>
        </button>

        <button
          onClick={() => setActiveSubTab('multi-currency-alert')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'multi-currency-alert'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>MULTI CURRENCY ALERT</span>
        </button>

        <button
          onClick={() => setActiveSubTab('smart-tariff-visualizer')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'smart-tariff-visualizer'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>SMART TARIFF VISUALIZER</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revenue-projection-ai')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'revenue-projection-ai'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>REVENUE PROJECTION AI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('fiscal-health-scorecard')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'fiscal-health-scorecard'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>FISCAL HEALTH SCORECARD</span>
        </button>

        <button
          onClick={() => setActiveSubTab('goods-stock-holders-info')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'goods-stock-holders-info'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Box className="w-4 h-4 text-purple-400" />
          <span>GOODS STOCKHOLDERS INFO</span>
        </button>

        <button
          onClick={() => setActiveSubTab('export-stock-tracker')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'export-stock-tracker'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>EXPORT STOCK TRACKER</span>
        </button>

        <button
          onClick={() => setActiveSubTab('goods-insurance-portal')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'goods-insurance-portal'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>GOODS INSURANCE PORTAL</span>
        </button>

        <button
          onClick={() => setActiveSubTab('insurance-dashboard')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'insurance-dashboard'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>INSURANCE DASHBOARD</span>
        </button>

        <button
          onClick={() => setActiveSubTab('claims-history')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'claims-history'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Receipt className="w-4 h-4 text-amber-400" />
          <span>CLAIMS HISTORY</span>
        </button>

        <button
          onClick={() => setActiveSubTab('smart-insurance-advisor')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'smart-insurance-advisor'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>SMART INSURANCE ADVISOR</span>
        </button>

        <button
          onClick={() => setActiveSubTab('auto-renewal-ui')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'auto-renewal-ui'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          <span>AUTO RENEWAL UI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('medical-examination-centers')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'medical-examination-centers'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Hospital className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>MEDICAL EXAM CENTRES (AIRWAYS & MARITIME)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('health-score')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'health-score'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>HEALTH SCORE ({securityScore}/100)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('automated-scan')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'automated-scan'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>AUTOMATE SECURITY SCAN</span>
        </button>

        <button
          onClick={() => setActiveSubTab('patch-checker')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'patch-checker'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-sky-400" />
          <span>AUTOMATED PATCH CHECKER</span>
        </button>

        <button
          onClick={() => setActiveSubTab('hardware-widgets')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'hardware-widgets'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4 text-teal-400" />
          <span>HARDWARE HEALTH WIDGETS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('smart-anomalies')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'smart-anomalies'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>SMART ANOMALY ALERTS ({activeAnomaliesCount})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('scam-shield')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'scam-shield'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <UserX className="w-4 h-4" />
          <span>ANTI-SCAMMER SHIELD</span>
        </button>

        <button
          onClick={() => setActiveSubTab('breach-recovery')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'breach-recovery'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>BREACH RECOVERY UI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quarantine-logs')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'quarantine-logs'
              ? 'bg-rose-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>QUARANTINE & AUDIT LOG</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE 1: SECURITY DASHBOARD */}
      {/* ========================================================================= */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-6">
          {/* TOP DASHBOARD OVERVIEW GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {/* SECURITY POSTURE SCORE GAUGE CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">System Security Score</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    SECURE
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-white">{securityScore}</span>
                  <span className="text-slate-400 text-sm">/ 100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                    style={{ width: `${securityScore}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Threat Mitigation:</span>
                  <span className="text-emerald-400 font-bold">100% Protected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Automated Scan Status:</span>
                  <span className="text-sky-300 font-bold">ACTIVE ({autoScanInterval})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hardware Telemetry:</span>
                  <span className="text-teal-300 font-bold">5 Devices Synced</span>
                </div>
              </div>
            </div>

            {/* ACTIVE DEFENSE LAYERS */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl md:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  <span>Active Defense & Threat Mitigation Layers</span>
                </h3>
                <span className="text-slate-400 text-[10px]">5 Protection Modules Running</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-white font-bold block">Automated Security Scanner</span>
                    <span className="text-slate-400 text-[10px]">Interval: {autoScanInterval} background cycle</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    ON
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-white font-bold block">AI Smart Anomaly Detector</span>
                    <span className="text-slate-400 text-[10px]">Monitors AIS & LocalStorage bursts</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    ON
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-white font-bold block">Phishing & Scam Link Guard</span>
                    <span className="text-slate-400 text-[10px]">Cross-checks maritime blacklists</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    ON
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-white font-bold block">Hardware Telemetry Monitor</span>
                    <span className="text-slate-400 text-[10px]">Real-time GPS, AIS & CAN-Bus gauges</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    ON
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HARDWARE HEALTH WIDGETS QUICK SNIPPET */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Live Hardware Health Widgets Overview</h3>
              </div>
              <button
                onClick={() => setActiveSubTab('hardware-widgets')}
                className="text-teal-400 hover:text-teal-300 text-xs font-bold flex items-center space-x-1"
              >
                <span>VIEW ALL HARDWARE GAUGES</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {hardwareWidgets.map((hw) => (
                <div key={hw.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block truncate">{hw.name}</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-lg font-black text-white">{hw.healthPercent}%</span>
                    <span className="text-[10px] text-emerald-400 font-bold">Optimal</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-teal-400 h-full rounded-full" style={{ width: `${hw.healthPercent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT THREAT FEED */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <History className="w-5 h-5 text-rose-400" />
                <span>Live Security Threat Activity Feed</span>
              </h3>
              <span className="text-slate-400 text-[10px]">{threats.length} Recorded Threats</span>
            </div>

            <div className="space-y-2.5">
              {threats.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-rose-400 font-bold">{item.id}</span>
                      <span className="text-white font-bold">{item.type}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-bold">
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">{item.description}</p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold shrink-0 text-center">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SECURITY OVERVIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'security-overview' && (
        <div className="space-y-6 font-mono text-xs">
          {/* SOC OVERVIEW HEADER CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/20 rounded-2xl border border-sky-500/40 text-sky-400">
                  <Globe className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Global Security Operations Center (SOC) Overview</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      PERIMETER SECURE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Real-time multi-layer defense status across vessel networks, crypto hardware enclaves, and anti-fraud filters.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Overall System Health</span>
                  <span className="text-2xl font-black text-emerald-400">{securityScore} / 100</span>
                </div>
                <button
                  onClick={() => setActiveSubTab('quick-patch')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>QUICK PATCH ({pendingPatchesCount})</span>
                </button>
              </div>
            </div>

            {/* KEY SOC METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Total Threat Blocks (YTD)</span>
                <span className="text-2xl font-black text-rose-400 block">1,842</span>
                <span className="text-emerald-400 text-[10px]">↑ 99.8% Auto-Mitigation</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Active Perimeter Shields</span>
                <span className="text-2xl font-black text-emerald-400 block">5 / 5</span>
                <span className="text-slate-400 text-[10px]">Web, AIS, CAN, Vault, Anti-Fraud</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Cryptographic Enclave</span>
                <span className="text-2xl font-black text-sky-400 block">{vaultCipher}</span>
                <span className="text-emerald-400 text-[10px]">Vault {vaultLocked ? 'Locked & Encrypted' : 'Unlocked'}</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Mean Detection Latency</span>
                <span className="text-2xl font-black text-teal-400 block">1.2 sec</span>
                <span className="text-slate-400 text-[10px]">Zero-Day Heuristic Scan</span>
              </div>
            </div>

            {/* PERIMETER VECTOR STATUS CARDS */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Defense Vector Security Matrix</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">1. AIS RF Radio Telemetry Shield</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">ACTIVE</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Inspects VHF NMEA packet headers for GPS spoofing and Doppler manipulation.</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">2. Captain SSO & Auth Vault</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">SECURE</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Enforces biometric multi-factor authentication with Hardware Security Module keys.</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">3. J1939 Engine CAN-Bus Buffer</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">OPTIMAL</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Filters anomalous motor ECU frames to block rogue throttle override injection.</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">4. Anti-Scammer Web Shield</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">GUARDING</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Blocks fraudulent credential harvesting links and spear-phishing domain clones.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: INCIDENT RESPONSE PLAYBOOKS */}
      {/* ========================================================================= */}
      {activeSubTab === 'incident-response' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/40 text-rose-400">
                  <Crosshair className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Incident Response & Containment Console</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                      ACTIVE PLAYBOOKS
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Standard operating procedures for P1-P4 security breaches with automated containment steps and responder dispatch.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const newInc: IncidentItem = {
                    id: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
                    severity: 'P1 - Critical',
                    title: 'Manual Incident Escalation Triggered by Officer',
                    targetSystem: 'Vessel Core Router & Navigation Enclave',
                    assignedResponder: 'Harbormaster Incident Commander',
                    status: 'Active Containment',
                    startedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
                    playbookSteps: [
                      { step: 'Isolate affected network VLAN ports', done: false },
                      { step: 'Lock encryption key vault', done: false },
                      { step: 'Notify Harbormaster Port Control', done: false }
                    ]
                  };
                  setIncidents([newInc, ...incidents]);
                  setSelectedIncidentId(newInc.id);
                }}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-md flex items-center space-x-2 shrink-0"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>DECLARE NEW INCIDENT</span>
              </button>
            </div>

            {/* INCIDENTS LIST & PLAYBOOK DETAIL GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* INCIDENTS SELECTOR COLUMN */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase">Active & Recent Security Incidents</h3>
                {incidents.map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedIncidentId(inc.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      selectedIncidentId === inc.id
                        ? 'bg-slate-950 border-rose-500/60 shadow-lg ring-1 ring-rose-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-rose-400 font-bold">{inc.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          inc.severity.startsWith('P1')
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {inc.severity}
                      </span>
                    </div>

                    <h4 className="text-white font-bold text-xs">{inc.title}</h4>
                    <p className="text-slate-400 text-[11px] truncate">{inc.targetSystem}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                      <span>Responder: {inc.assignedResponder}</span>
                      <span className={inc.status === 'Resolved' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {inc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* SELECTED INCIDENT PLAYBOOK CHECKLIST */}
              <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                {(() => {
                  const currentInc = incidents.find(i => i.id === selectedIncidentId) || incidents[0];
                  if (!currentInc) return <div className="text-slate-400">No incident selected.</div>;

                  return (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-rose-400 font-bold text-sm">{currentInc.id}</span>
                            <span className="text-white font-black text-sm">{currentInc.title}</span>
                          </div>
                          <span className="text-slate-400 text-[10px]">Target: {currentInc.targetSystem} | Logged: {currentInc.startedAt}</span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-xl text-xs font-bold ${
                            currentInc.status === 'Resolved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {currentInc.status}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Incident Mitigation Playbook Steps</span>
                        </h4>

                        <div className="space-y-2">
                          {currentInc.playbookSteps.map((step, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleTogglePlaybookStep(currentInc.id, idx)}
                              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 ${
                                step.done
                                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${step.done ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'}`}>
                                {step.done && <Check className="w-3.5 h-3.5 font-black" />}
                              </div>
                              <span className="text-xs leading-relaxed">{step.step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-900 flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Assigned: <strong className="text-white">{currentInc.assignedResponder}</strong></span>
                        <button
                          onClick={() => {
                            setVaultLocked(true);
                            alert(`Emergency lockdown executed for ${currentInc.id}. Crypto Vault locked and session keys invalidated.`);
                          }}
                          className="px-3 py-1.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold rounded-xl hover:bg-rose-500/30"
                        >
                          LOCK ENCLAVE FOR THIS INCIDENT
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SECURITY TRENDS & HISTORICAL ANALYTICS */}
      {/* ========================================================================= */}
      {activeSubTab === 'security-trends' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Security Trends & Historical Threat Analytics</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      ATTACK SURFACE REDUCED 94%
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Historical telemetry tracking attack vector frequency, mean time to respond (MTTR), and phishing block rates over 2026.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Exporting Security Trends Analysis Report (PDF/CSV)...');
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 font-bold rounded-2xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT TRENDS REPORT</span>
              </button>
            </div>

            {/* MONTHLY THREAT MITIGATION TREND BARS */}
            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Monthly Threat Activity & Block Count Trend (Jan - Aug 2026)</span>
                </h3>
                <span className="text-emerald-400 font-bold text-xs">↓ 88% Fewer Breaches</span>
              </div>

              <div className="grid grid-cols-8 gap-2 items-end h-36 pt-6 pb-2 border-b border-slate-900">
                {[
                  { month: 'Jan', val: 142, pct: 90 },
                  { month: 'Feb', val: 118, pct: 75 },
                  { month: 'Mar', val: 156, pct: 100 },
                  { month: 'Apr', val: 92,  pct: 58 },
                  { month: 'May', val: 64,  pct: 40 },
                  { month: 'Jun', val: 42,  pct: 26 },
                  { month: 'Jul', val: 28,  pct: 18 },
                  { month: 'Aug', val: 14,  pct: 9 }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group space-y-1">
                    <span className="text-[10px] text-slate-400 group-hover:text-emerald-400 font-bold transition-all">{item.val}</span>
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${item.pct}%` }}
                    />
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{item.month}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-[10px]">
                Deployment of AI Anti-Scammer Shield and CAN-Bus buffer in April resulted in a sustained 88% reduction in active threat surface.
              </p>
            </div>

            {/* ATTACK VECTOR DISTRIBUTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white">Threat Vector Distribution Breakdown</h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Credential Harvesting & Phishing</span>
                      <span className="text-amber-400 font-bold">42%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">AIS RF Telemetry Spoofing</span>
                      <span className="text-rose-400 font-bold">28%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className="bg-rose-400 h-full rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">J1939 CAN-Bus Jitter Injections</span>
                      <span className="text-sky-400 font-bold">18%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className="bg-sky-400 h-full rounded-full" style={{ width: '18%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Suspicious Bearer Token Signatures</span>
                      <span className="text-teal-400 font-bold">12%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className="bg-teal-400 h-full rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECURITY PERFORMANCE METRICS */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white">SOC Response Benchmark Metrics</h3>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Mean Time to Detect (MTTD)</span>
                    <span className="text-2xl font-black text-emerald-400 block mt-1">1.2s</span>
                    <span className="text-slate-500 text-[10px]">Target &lt; 5.0s</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Mean Time to Respond (MTTR)</span>
                    <span className="text-2xl font-black text-emerald-400 block mt-1">4.8s</span>
                    <span className="text-slate-500 text-[10px]">Target &lt; 30.0s</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Phishing Auto-Block Rate</span>
                    <span className="text-2xl font-black text-sky-400 block mt-1">99.8%</span>
                    <span className="text-slate-500 text-[10px]">Zero False Positives</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Security Index Gain</span>
                    <span className="text-2xl font-black text-amber-400 block mt-1">+38 pts</span>
                    <span className="text-slate-500 text-[10px]">Compared to Q1 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: QUICK PATCH UI */}
      {/* ========================================================================= */}
      {activeSubTab === 'quick-patch' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <Sparkles className="w-6 h-6 animate-spin" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">1-Click Quick Patch & Microcode Hotfix Engine</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      {pendingPatchesCount} HOTFIXES READY
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Instantly deploy Zero-Downtime microcode hotfixes directly into active transponder buffers and crypto key vaults.
                  </p>
                </div>
              </div>

              <button
                onClick={handleApplyAllPatches}
                disabled={isPatchScanning || pendingPatchesCount === 0}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black rounded-2xl transition-all shadow-xl flex items-center space-x-2 disabled:opacity-50 text-sm shrink-0"
              >
                <Zap className="w-5 h-5 font-black" />
                <span>{isPatchScanning ? 'APPLYING ALL QUICK PATCHES...' : 'APPLY ALL QUICK PATCHES NOW'}</span>
              </button>
            </div>

            {/* QUICK PATCH SUMMARY BAR */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-white font-bold block">Automatic Rollback Snapshot Active</span>
                  <span className="text-slate-400 text-[10px]">Clean system snapshot SNAP-20260811-0000 will automatically restore if patch installation fails.</span>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-center">
                Hot-Swap Driver Kernel: Ready
              </span>
            </div>

            {/* QUICK PATCH ITEMS LIST */}
            <div className="space-y-3">
              {patches.map((patch) => (
                <div key={patch.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-400 font-bold">{patch.id}</span>
                      <span className="text-white font-bold">{patch.component}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-bold">
                        {patch.cve}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">{patch.description}</p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="text-right text-[11px]">
                      <span className="text-slate-500 block">Current: {patch.currentVersion}</span>
                      <span className="text-emerald-400 font-bold block">Target: {patch.latestVersion}</span>
                    </div>

                    {patch.status === 'Available' ? (
                      <button
                        onClick={() => handleApplySinglePatch(patch.id)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all"
                      >
                        QUICK PATCH NOW
                      </button>
                    ) : patch.status === 'Updating...' ? (
                      <span className="px-4 py-2 bg-slate-800 text-amber-300 font-bold text-xs rounded-xl flex items-center space-x-1">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>PATCHING...</span>
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs rounded-xl flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>HOTFIX APPLIED</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SECURITY KEY MANAGER */}
      {/* ========================================================================= */}
      {activeSubTab === 'security-key-manager' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/40 text-purple-400">
                  <Key className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Cryptographic Key & HSM Hardware Vault Manager</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      FIPS 140-3 LEVEL 4 HSM
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Centralized cryptographic key store managing RSA-4096, ECDSA P-384, and AES-256-GCM cipher tokens across vessel subsystems.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    const newKey: SecurityKeyItem = {
                      id: `KEY-ECDSA-${Math.floor(1000 + Math.random() * 9000)}`,
                      name: 'Newly Provisioned ECDSA Ephemeral Key',
                      type: 'ECDSA P-384',
                      assignedModule: 'Bridge Telemetry Channel',
                      createdDate: new Date().toISOString().substring(0, 10),
                      expiryDate: '2027-08-11',
                      status: 'Active'
                    };
                    setSecKeys([newKey, ...secKeys]);
                    alert(`Provisioned new ECDSA P-384 Key Pair: ${newKey.id}`);
                  }}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Key className="w-4 h-4" />
                  <span>GENERATE NEW KEY</span>
                </button>

                <button
                  onClick={() => {
                    setKeyRotationTime(new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC');
                    alert('Executing HSM Root Key Rotation. All active sessions re-signed with zero downtime.');
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/40 font-bold rounded-2xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>ROTATE HSM KEYS</span>
                </button>
              </div>
            </div>

            {/* KEY MANAGER METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Active Cipher Keys</span>
                <span className="text-2xl font-black text-purple-400 block">{secKeys.filter(k => k.status === 'Active').length} Keys</span>
                <span className="text-emerald-400 text-[10px]">100% Cryptographic Integrity</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Keys Expiring Soon</span>
                <span className="text-2xl font-black text-amber-400 block">{secKeys.filter(k => k.status === 'Expiring Soon').length} Key</span>
                <span className="text-amber-300 text-[10px]">Rotation Scheduled</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Last Key Rotation</span>
                <span className="text-lg font-bold text-white block truncate">{keyRotationTime}</span>
                <span className="text-slate-400 text-[10px]">Auto-Rotate every 90 days</span>
              </div>
            </div>

            {/* MANAGED KEYS INVENTORY */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>Managed Cryptographic Key Store</span>
              </h3>

              <div className="space-y-2">
                {secKeys.map((key) => (
                  <div key={key.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400 font-bold">{key.id}</span>
                        <span className="text-white font-bold">{key.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold">
                          {key.type}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">Target System: <strong className="text-slate-200">{key.assignedModule}</strong> | Created: {key.createdDate} | Expires: {key.expiryDate}</p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        key.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : key.status === 'Expiring Soon'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {key.status}
                      </span>

                      <button
                        onClick={() => {
                          setSecKeys(prev => prev.map(k => k.id === key.id ? { ...k, status: 'Revoked' } : k));
                          alert(`Revoked key ${key.id}. Access for ${key.assignedModule} suspended.`);
                        }}
                        disabled={key.status === 'Revoked'}
                        className="px-3 py-1.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs rounded-xl hover:bg-rose-500/30 disabled:opacity-40"
                      >
                        REVOKE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: BIOMETRIC AUTH AUDIT */}
      {/* ========================================================================= */}
      {activeSubTab === 'biometric-auth-audit' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/20 rounded-2xl border border-sky-500/40 text-sky-400">
                  <Eye className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Biometric Auth Audit & Liveness Verification Log</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      ZERO SPOOF HARDWARE ENCLAVE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Real-time verification log for 3D FaceID, Fingerprint, and Hardware Token access across bridge and engine modules.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const simLog: BiometricLogItem = {
                    id: `BIO-${Math.floor(1000 + Math.random() * 9000)}`,
                    officerName: 'Naval Officer Sarah Connor',
                    authMethod: 'Fingerprint Sensor',
                    vesselModule: 'Navigation Chart Console',
                    confidenceScore: 99.4,
                    ipAddress: '10.240.0.18 (Vessel LAN)',
                    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
                    result: 'Granted'
                  };
                  setBiometricLogs([simLog, ...biometricLogs]);
                }}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <Eye className="w-4 h-4" />
                <span>SIMULATE BIOMETRIC SCAN</span>
              </button>
            </div>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Liveness Verification Score</span>
                <span className="text-2xl font-black text-sky-400 block">100.0%</span>
                <span className="text-emerald-400 text-[10px]">Zero Spoofing Detected</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Authentications Today</span>
                <span className="text-2xl font-black text-white block">{biometricLogs.length + 48} Passes</span>
                <span className="text-slate-400 text-[10px]">1 Unrecognized Access Blocked</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Mandatory Multi-Factor Policy</span>
                <span className="text-lg font-bold text-emerald-400 block">ENFORCED HARDWARE</span>
                <span className="text-slate-400 text-[10px]">Biometric + FIPS Token required</span>
              </div>
            </div>

            {/* AUDIT LOG LIST */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Recent Biometric Access Logs</span>
              </h3>

              <div className="space-y-2">
                {biometricLogs.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sky-400 font-bold">{log.id}</span>
                        <span className="text-white font-bold">{log.officerName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[9px] font-bold">
                          {log.authMethod}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">
                        Module: <strong className="text-slate-200">{log.vesselModule}</strong> | IP: {log.ipAddress} | Confidence: <strong className="text-sky-300">{log.confidenceScore}%</strong>
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        log.result === 'Granted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {log.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SECURITY PULSES ALERT */}
      {/* ========================================================================= */}
      {activeSubTab === 'security-pulses' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <BellRing className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Security Pulses Alert & High-Frequency Telemetry Feed</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      LIVE BROADCAST STREAM
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Broadcast radar, RF frequency anomalies, and port security pulse feeds streamed directly to bridge operators.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const testPulse: SecurityPulseItem = {
                    id: `PULSE-${Math.floor(1000 + Math.random() * 9000)}`,
                    title: 'Manual Test Pulse Broadcast Triggered',
                    pulseType: 'RF Frequency Jitter',
                    severity: 'Info',
                    timestamp: 'Just now',
                    details: 'High-frequency radar telemetry test broadcast verified by bridge security console.',
                    muted: false
                  };
                  setSecurityPulses([testPulse, ...securityPulses]);
                }}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <Radio className="w-4 h-4" />
                <span>TRIGGER PULSE BROADCAST</span>
              </button>
            </div>

            {/* PULSES FEED LIST */}
            <div className="space-y-3">
              {securityPulses.map((pulse) => (
                <div key={pulse.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-400 font-bold">{pulse.id}</span>
                      <span className="text-white font-bold">{pulse.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        pulse.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : pulse.severity === 'Warning'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {pulse.severity}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">{pulse.details}</p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-slate-500 text-[10px]">{pulse.timestamp}</span>
                    <button
                      onClick={() => {
                        setSecurityPulses(prev =>
                          prev.map(p => p.id === pulse.id ? { ...p, muted: !p.muted } : p)
                        );
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        pulse.muted
                          ? 'bg-slate-800 text-slate-500 border border-slate-700'
                          : 'bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                      }`}
                    >
                      {pulse.muted ? 'MUTED' : 'MUTE PULSE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: BREACH RECOVERY GUIDE */}
      {/* ========================================================================= */}
      {activeSubTab === 'breach-recovery-guide' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/40 text-rose-400">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Emergency Breach Recovery & Incident Manual</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                      CRITICAL PROTOCOL
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Guided 4-step emergency containment, hardware key purge, and post-breach system recovery procedure.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Downloading Emergency Maritime Cybersecurity Breach Manual (PDF)...');
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/40 font-bold rounded-2xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD FIELD MANUAL</span>
              </button>
            </div>

            {/* RECOVERY CHECKLIST */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Step-by-Step Incident Recovery Protocol</span>
              </h3>

              <div className="space-y-2">
                {breachRecoverySteps.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setBreachRecoverySteps(prev =>
                        prev.map((s, i) => i === idx ? { ...s, completed: !s.completed } : s)
                      );
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                      step.completed
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                      step.completed ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {step.completed ? <Check className="w-4 h-4 font-black" /> : <span className="text-xs font-bold text-slate-500">{step.stepNum}</span>}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-xs">{step.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EMERGENCY HOTLINE CONTACTS */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Radio className="w-4 h-4 text-rose-400" />
                <span>Emergency Cyber Response Contacts</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Global Maritime Cyber Incident Hotline</span>
                  <span className="text-rose-400 font-bold block text-sm">+1 (800) 555-CYBER</span>
                  <span className="text-slate-500 text-[10px]">24/7 Priority Emergency Channel</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Harbormaster SOC Tactical Unit</span>
                  <span className="text-amber-400 font-bold block text-sm">VHF Channel 16 / Encrypted IP</span>
                  <span className="text-slate-500 text-[10px]">Port Authority Direct Cyber Link</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Captain Cryptographic Enclave</span>
                  <span className="text-sky-400 font-bold block text-sm">Hardware Token Vault Alpha</span>
                  <span className="text-slate-500 text-[10px]">Isolated Hardware Backup Key</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: REVENUE ANALYTICS & GROWTH CHARTS */}
      {/* ========================================================================= */}
      {activeSubTab === 'revenue-analytics' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <BarChart3 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Platform Revenue Analytics & Growth Charts</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      LIVE MRR TRAJECTORY
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Real-time performance analytics tracking subscription MRR, active seats, ARPA, gross margins, and growth velocity.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(['30D', '90D', '1Y'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setRevenueTimeframe(tf)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        revenueTimeframe === tf ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => alert(`Initiating payout request for $${mrrAmount.toLocaleString()}. Funds scheduled to transfer to connected bank account.`)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Coins className="w-4 h-4" />
                  <span>REQUEST PAYOUT</span>
                </button>
              </div>
            </div>

            {/* TOP METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Monthly Recurring Revenue (MRR)</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-emerald-400">${mrrAmount.toLocaleString()}</span>
                  <span className="text-emerald-400 text-[10px] font-bold">+18.4% MoM</span>
                </div>
                <span className="text-slate-500 text-[10px]">Tracked across 70 paying orgs</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Annualized Run Rate (ARR)</span>
                <span className="text-2xl font-black text-sky-400 block">${(mrrAmount * 12).toLocaleString()}</span>
                <span className="text-sky-300 text-[10px]">Projected year-end trajectory</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Avg Revenue / Account (ARPA)</span>
                <span className="text-2xl font-black text-purple-400 block">$2,412 / mo</span>
                <span className="text-purple-300 text-[10px]">Enterprise Fleet emphasis</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Net Revenue Retention (NRR)</span>
                <span className="text-2xl font-black text-amber-400 block">118.2%</span>
                <span className="text-emerald-400 text-[10px]">0.4% Monthly Churn</span>
              </div>
            </div>

            {/* REVENUE GROWTH CHARTS SECTION */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-bold text-white uppercase">Monthly Revenue Growth & Subscriber Trajectory Chart</h3>
                </div>

                {/* METRIC TOGGLES */}
                <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {(['MRR', 'Subscribers', 'ARPA', 'GrossMargin'] as const).map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setChartMetricView(metric)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        chartMetricView === metric
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {metric === 'MRR' && 'MRR ($)'}
                      {metric === 'Subscribers' && 'Orgs / Seats'}
                      {metric === 'ARPA' && 'ARPA ($)'}
                      {metric === 'GrossMargin' && 'Margin (%)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* VISUAL GROWTH CHART BARS */}
              <div className="space-y-3">
                <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800 relative">
                  {[
                    { month: 'Jan', mrr: 18500, subs: 24, arpa: 770, margin: 82, newS: 5 },
                    { month: 'Feb', mrr: 22100, subs: 30, arpa: 736, margin: 83, newS: 7 },
                    { month: 'Mar', mrr: 26400, subs: 37, arpa: 713, margin: 84, newS: 8 },
                    { month: 'Apr', mrr: 31000, subs: 45, arpa: 688, margin: 85, newS: 9 },
                    { month: 'May', mrr: 35800, subs: 52, arpa: 688, margin: 86, newS: 8 },
                    { month: 'Jun', mrr: 40200, subs: 59, arpa: 681, margin: 87, newS: 8 },
                    { month: 'Jul', mrr: 44500, subs: 65, arpa: 684, margin: 88, newS: 7 },
                    { month: 'Aug', mrr: 48250, subs: 70, arpa: 689, margin: 89, newS: 6 },
                    { month: 'Sep (P)', mrr: 53000, subs: 77, arpa: 688, margin: 90, newS: 8 },
                    { month: 'Oct (P)', mrr: 58500, subs: 84, arpa: 696, margin: 90, newS: 8 },
                    { month: 'Nov (P)', mrr: 65000, subs: 92, arpa: 706, margin: 91, newS: 9 },
                    { month: 'Dec (P)', mrr: 72000, subs: 100, arpa: 720, margin: 92, newS: 9 }
                  ].map((data, idx) => {
                    const maxVal = chartMetricView === 'MRR' ? 75000 : chartMetricView === 'Subscribers' ? 110 : chartMetricView === 'ARPA' ? 1000 : 100;
                    const val = chartMetricView === 'MRR' ? data.mrr : chartMetricView === 'Subscribers' ? data.subs : chartMetricView === 'ARPA' ? data.arpa : data.margin;
                    const heightPercent = Math.min(100, Math.max(12, (val / maxVal) * 100));
                    const isHovered = hoveredChartMonth === idx;

                    return (
                      <div
                        key={data.month}
                        onMouseEnter={() => setHoveredChartMonth(idx)}
                        onMouseLeave={() => setHoveredChartMonth(null)}
                        className="flex-1 flex flex-col items-center group cursor-pointer relative h-full justify-end"
                      >
                        {/* HOVER TOOLTIP */}
                        {isHovered && (
                          <div className="absolute -top-20 z-20 bg-slate-900 border border-emerald-500/50 p-2.5 rounded-xl shadow-2xl text-[10px] w-36 text-center whitespace-nowrap animate-in fade-in zoom-in-95">
                            <span className="text-emerald-400 font-bold block">{data.month} Performance</span>
                            <span className="text-white font-black block text-xs">
                              {chartMetricView === 'MRR' && `$${data.mrr.toLocaleString()}`}
                              {chartMetricView === 'Subscribers' && `${data.subs} Paying Orgs`}
                              {chartMetricView === 'ARPA' && `$${data.arpa}/account`}
                              {chartMetricView === 'GrossMargin' && `${data.margin}% Margin`}
                            </span>
                            <span className="text-slate-400 text-[9px] block">+{data.newS} new orgs added</span>
                          </div>
                        )}

                        {/* BAR SVG / ELEMENT */}
                        <div className="w-full max-w-[28px] bg-slate-900 rounded-t-lg relative overflow-hidden transition-all duration-300 group-hover:scale-105" style={{ height: `${heightPercent}%` }}>
                          <div
                            className={`w-full h-full transition-all duration-500 ${
                              data.month.includes('(P)')
                                ? 'bg-gradient-to-t from-purple-900/60 to-purple-500'
                                : 'bg-gradient-to-t from-emerald-900/80 via-emerald-600 to-emerald-400'
                            }`}
                          ></div>
                        </div>

                        {/* MONTH LABEL */}
                        <span className={`text-[9px] mt-2 font-bold ${isHovered ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {data.month}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 px-2 pt-1">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 bg-emerald-500 rounded-sm inline-block"></span>
                      <span>Historical Actuals</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 bg-purple-500 rounded-sm inline-block"></span>
                      <span>AI Projected Trend</span>
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold">12-Month Compound Growth: +289%</span>
                </div>
              </div>
            </div>

            {/* REVENUE BREAKDOWN BY STREAM */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <PieChart className="w-4 h-4 text-emerald-400" />
                <span>Monetization Stream Breakdown</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-white font-bold">Enterprise Maritime & Airways Fleet Licenses</span>
                    <span className="text-emerald-400 font-bold">$28,500 / mo</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '59%' }}></div>
                  </div>
                  <p className="text-slate-400 text-xs">12 Active Fleet Accounts | $2,375 / vessel average</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-white font-bold">B2B Telemetry & Weather API Marketplace</span>
                    <span className="text-sky-400 font-bold">$12,400 / mo</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: '26%' }}></div>
                  </div>
                  <p className="text-slate-400 text-xs">8 Commercial API Subscriptions | 840k calls/mo</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-white font-bold">Digital e-Visa & Port Processing Surcharges</span>
                    <span className="text-purple-400 font-bold">$4,850 / mo</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <p className="text-slate-400 text-xs">340 Visa transactions processed | $14.26 fee per clearance</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-white font-bold">Captain Pro Individual Subscriptions</span>
                    <span className="text-amber-400 font-bold">$2,500 / mo</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <p className="text-slate-400 text-xs">50 Pro Captain seats active | $50 / seat / mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: ENHANCED BILLING UI */}
      {/* ========================================================================= */}
      {activeSubTab === 'billing-portal' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/20 rounded-2xl border border-sky-500/40 text-sky-400">
                  <CreditCard className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Enhanced Subscription & Billing Management UI</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      ACTIVE TIER: {billingPlan.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Configure subscription plans, billing cycles, payment methods, seat add-ons, promo codes, and automated tax invoices.
                  </p>
                </div>
              </div>

              {/* BILLING CYCLE SELECTOR */}
              <div className="flex items-center space-x-2 shrink-0">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(['Monthly', 'Annual (15% Off)'] as const).map((cycle) => (
                    <button
                      key={cycle}
                      onClick={() => setBillingCycle(cycle)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        billingCycle === cycle ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cycle}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PLAN SELECTION CARDS */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Target className="w-4 h-4 text-sky-400" />
                <span>Select Subscription Plan Tier</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Starter', price: 499, seats: 5, apiCalls: '100k', desc: 'Basic telemetry & incident alerts' },
                  { name: 'Pro Captain', price: 1299, seats: 15, apiCalls: '350k', desc: 'Advanced radar & weather routing' },
                  { name: 'Enterprise Fleet', price: 4500, seats: 50, apiCalls: '1M', desc: 'Full AI fraud shield & e-Visa clearance' },
                  { name: 'Global Custom Tier', price: 9800, seats: 200, apiCalls: '5M+', desc: 'Dedicated SOC hotline & custom SLA' }
                ].map((plan) => {
                  const isSelected = billingPlan === plan.name;
                  const discountFactor = billingCycle.includes('Annual') ? 0.85 : 1.0;
                  const effectivePrice = Math.round(plan.price * discountFactor);

                  return (
                    <div
                      key={plan.name}
                      onClick={() => {
                        setBillingPlan(plan.name as any);
                        alert(`Switched subscription plan to ${plan.name} ($${effectivePrice}/mo).`);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-slate-950 border-sky-400 shadow-xl shadow-sky-950/50 ring-2 ring-sky-400/20'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white uppercase">{plan.name}</span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
                              CURRENT PLAN
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px]">{plan.desc}</p>
                        <div className="pt-2">
                          <span className="text-2xl font-black text-sky-400">${effectivePrice.toLocaleString()}</span>
                          <span className="text-slate-400 text-[10px]"> / month</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-[10px] border-t border-slate-800/80 pt-2 text-slate-300">
                        <div className="flex justify-between">
                          <span>Vessel Seats:</span>
                          <span className="text-white font-bold">{plan.seats} included</span>
                        </div>
                        <div className="flex justify-between">
                          <span>API Capacity:</span>
                          <span className="text-emerald-400 font-bold">{plan.apiCalls} / mo</span>
                        </div>
                      </div>

                      <button
                        className={`w-full py-2 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1 ${
                          isSelected
                            ? 'bg-sky-500 text-slate-950 font-black'
                            : 'bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-800'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isSelected ? 'PLAN ACTIVE' : 'SELECT PLAN'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEAT ADD-ONS & PAYMENT METHOD SELECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ADDON SEATS CONFIGURATOR */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-sky-400" />
                  <span>Configure Extra Telemetry Vessel Seats</span>
                </h3>

                <p className="text-slate-400 text-xs">
                  Expand capacity with individual vessel/aircraft seats ($180 / seat / month).
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Extra Add-On Seats:</span>
                    <span className="text-sky-400 font-bold">{addonSeats} Seats (+${(addonSeats * 180).toLocaleString()} / mo)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={addonSeats}
                    onChange={(e) => setAddonSeats(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                {/* PROMO CODE REDEEMER */}
                <div className="pt-2 space-y-2">
                  <label className="text-slate-400 text-[10px] uppercase font-bold block">Apply Discount Promo Code:</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="e.g. CAPTAIN2026"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400 flex-1 font-mono uppercase"
                    />
                    <button
                      onClick={() => {
                        if (promoCode.trim().toUpperCase() === 'CAPTAIN2026' || promoCode.trim().toUpperCase() === 'MARITIME15') {
                          setAppliedDiscount(15);
                          alert('Promo Code Applied! 15% discount active on your subscription.');
                        } else {
                          alert('Invalid Promo Code. Try CAPTAIN2026 or MARITIME15.');
                        }
                      }}
                      className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-slate-950 font-bold rounded-xl text-xs transition-all shrink-0"
                    >
                      APPLY
                    </button>
                  </div>
                  {appliedDiscount > 0 && (
                    <span className="text-emerald-400 font-bold text-[10px] block">
                      ✓ Active Discount Applied: {appliedDiscount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* PAYMENT METHOD MANAGER */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Primary Corporate Payment Method</span>
                </h3>

                <div className="space-y-2">
                  {[
                    { type: 'Credit Card', label: 'Visa ending in **** 8812', sub: 'Exp 09/2028 | Primary' },
                    { type: 'SWIFT Bank Wire', label: 'JPMorgan Chase Corporate IBAN', sub: 'Wire Transfer / ACH' },
                    { type: 'Crypto USDT', label: 'USDT ERC-20 Vault Wallet', sub: '0x7F2a...9b4C | Instant Settlement' }
                  ].map((method) => (
                    <div
                      key={method.type}
                      onClick={() => setPaymentMethodType(method.type as any)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        paymentMethodType === method.type
                          ? 'bg-slate-900 border-sky-400 text-white'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <span className="font-bold block text-xs">{method.label}</span>
                        <span className="text-[10px] text-slate-500">{method.sub}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethodType === method.type ? 'border-sky-400 bg-sky-400' : 'border-slate-700'
                      }`}>
                        {paymentMethodType === method.type && <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* AUTO-RENEW TOGGLE */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                  <div>
                    <span className="text-white font-bold block text-xs">Automated Subscription Renewal</span>
                    <span className="text-slate-500 text-[10px]">Prevents maritime telemetry interruption</span>
                  </div>
                  <button
                    onClick={() => {
                      setAutoRenewEnabled(!autoRenewEnabled);
                      alert(`Auto-Renewal set to ${!autoRenewEnabled ? 'ENABLED' : 'DISABLED'}.`);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      autoRenewEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {autoRenewEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: TAX CALCULATOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'tax-calculator' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-teal-500/20 rounded-2xl border border-teal-500/40 text-teal-400">
                  <Receipt className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Global Maritime & SaaS Tax Compliance Calculator</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                      JURISDICTION: {taxJurisdiction}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Automated tax liability engine for VAT, GST, Corporate Income Tax, and Withholding Tax across global maritime jurisdictions.
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert(`Exporting Tax Statement for ${taxJurisdiction} ($${taxGrossRevenue.toLocaleString()} gross revenue). File generated: MARITIME_TAX_STATEMENT_2026.pdf`)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT TAX STATEMENT</span>
              </button>
            </div>

            {/* JURISDICTION SELECTOR GRID */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Globe className="w-4 h-4 text-teal-400" />
                <span>Select Operating Tax Jurisdiction</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { id: 'EU-VAT', label: 'EU VAT (MOSS)', rate: '21.0% VAT' },
                  { id: 'US-CA', label: 'US California', rate: '8.25% Sales' },
                  { id: 'UK-VAT', label: 'UK HMRC', rate: '20.0% VAT' },
                  { id: 'SG-GST', label: 'Singapore IRAS', rate: '9.0% GST' },
                  { id: 'UAE-CT', label: 'UAE Corporate', rate: '9.0% CT' },
                  { id: 'INTL-DUTYFREE', label: 'Intl Duty-Free', rate: '0.0% Tax' }
                ].map((jur) => (
                  <button
                    key={jur.id}
                    onClick={() => setTaxJurisdiction(jur.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      taxJurisdiction === jur.id
                        ? 'bg-teal-500/20 border-teal-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold block text-xs">{jur.label}</span>
                    <span className="text-teal-400 text-[10px] font-mono">{jur.rate}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TAX CALCULATION FORM & BREAKDOWN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* INPUT FORM */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-teal-400" />
                  <span>Taxable Revenue & Expense Inputs</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                      Monthly Gross Revenue ($):
                    </label>
                    <input
                      type="number"
                      value={taxGrossRevenue}
                      onChange={(e) => setTaxGrossRevenue(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-emerald-400 focus:outline-none focus:border-teal-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                      Withholding Tax Rate at Source (%): {withholdingRate}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="0.5"
                      value={withholdingRate}
                      onChange={(e) => setWithholdingRate(Number(e.target.value))}
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                      Monthly Deductible Cloud Infrastructure Expenses ($):
                    </label>
                    <input
                      type="number"
                      value={corporateTaxDeduction * 1000}
                      onChange={(e) => setCorporateTaxDeduction(Number(e.target.value) / 1000)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-sky-400 focus:outline-none focus:border-teal-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* TAX OUTPUT SUMMARY */}
              {(() => {
                const vatRate = taxJurisdiction === 'EU-VAT' ? 0.21 : taxJurisdiction === 'UK-VAT' ? 0.20 : taxJurisdiction === 'US-CA' ? 0.0825 : taxJurisdiction === 'SG-GST' ? 0.09 : taxJurisdiction === 'UAE-CT' ? 0.00 : 0.00;
                const vatAmount = taxGrossRevenue * vatRate;
                const withholdingAmount = taxGrossRevenue * (withholdingRate / 100);
                const taxableProfit = Math.max(0, taxGrossRevenue - (corporateTaxDeduction * 1000));
                const corpTaxRate = taxJurisdiction === 'UAE-CT' ? 0.09 : taxJurisdiction === 'INTL-DUTYFREE' ? 0.00 : 0.15;
                const corpTaxAmount = taxableProfit * corpTaxRate;
                const netTakeHome = taxGrossRevenue - vatAmount - withholdingAmount - corpTaxAmount;

                return (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-teal-500/30 space-y-4">
                    <h3 className="text-xs font-bold text-teal-400 uppercase flex items-center space-x-2">
                      <Receipt className="w-4 h-4 text-teal-400" />
                      <span>Net Tax Liability & Take-Home Summary</span>
                    </h3>

                    <div className="space-y-2 border-b border-slate-800 pb-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gross Monthly Revenue:</span>
                        <span className="text-white font-bold">${taxGrossRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sales Tax / VAT Collected ({vatRate * 100}%):</span>
                        <span className="text-rose-400 font-bold">-${vatAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Withholding Tax ({withholdingRate}%):</span>
                        <span className="text-amber-400 font-bold">-${withholdingAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Corporate Income Tax (Est. {corpTaxRate * 100}%):</span>
                        <span className="text-purple-400 font-bold">-${corpTaxAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pt-1 flex justify-between items-baseline">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Net Take-Home Revenue:</span>
                        <span className="text-slate-500 text-[9px]">After global tax obligations</span>
                      </div>
                      <span className="text-2xl font-black text-teal-400">${netTakeHome.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: PAYMENT HISTORY */}
      {/* ========================================================================= */}
      {activeSubTab === 'payment-history' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <History className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Payment & Transaction Audit History</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      OFFICIAL TRANSACTION LEDGER
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Comprehensive log of all completed transactions, invoice receipts, tax breakdowns, and payment statuses.
                  </p>
                </div>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search Invoice / Tx..."
                    value={paymentSearchQuery}
                    onChange={(e) => setPaymentSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(['ALL', 'PAID', 'PENDING', 'REFUNDED'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setPaymentStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        paymentStatusFilter === st ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* TRANSACTION HISTORY TABLE */}
            <div className="space-y-3">
              <div className="overflow-x-auto border border-slate-800 rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                      <th className="p-3">Invoice & Tx ID</th>
                      <th className="p-3">Plan / Description</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                    {[
                      {
                        txId: 'TX-9982410',
                        invoiceNo: 'INV-2026-0801',
                        date: '2026-08-01 14:22:09',
                        amount: 4500.00,
                        taxAmount: 945.00,
                        netAmount: 3555.00,
                        status: 'PAID',
                        plan: 'Enterprise Fleet License (50 Seats)',
                        paymentMethod: 'Visa **** 8812',
                        vatNumber: 'EU994012841'
                      },
                      {
                        txId: 'TX-9982105',
                        invoiceNo: 'INV-2026-0715',
                        date: '2026-07-15 09:10:44',
                        amount: 1250.00,
                        taxAmount: 112.50,
                        netAmount: 1137.50,
                        status: 'PAID',
                        plan: 'B2B API Telemetry Pass (1M Requests)',
                        paymentMethod: 'SWIFT Wire (JPMorgan)',
                        vatNumber: 'US-CA-99214'
                      },
                      {
                        txId: 'TX-9981880',
                        invoiceNo: 'INV-2026-0701',
                        date: '2026-07-01 00:01:12',
                        amount: 4500.00,
                        taxAmount: 945.00,
                        netAmount: 3555.00,
                        status: 'PAID',
                        plan: 'Enterprise Fleet License (50 Seats)',
                        paymentMethod: 'Visa **** 8812',
                        vatNumber: 'EU994012841'
                      },
                      {
                        txId: 'TX-9981200',
                        invoiceNo: 'INV-2026-0618',
                        date: '2026-06-18 18:45:00',
                        amount: 350.00,
                        taxAmount: 0.00,
                        netAmount: 350.00,
                        status: 'PENDING',
                        plan: 'Harbor e-Visa Fast Clearance Fee',
                        paymentMethod: 'Crypto USDT (0x7F2a)',
                        vatNumber: 'DUTY-FREE-PORT'
                      },
                      {
                        txId: 'TX-9979920',
                        invoiceNo: 'INV-2026-0601',
                        date: '2026-06-01 11:30:22',
                        amount: 4500.00,
                        taxAmount: 945.00,
                        netAmount: 3555.00,
                        status: 'PAID',
                        plan: 'Enterprise Fleet License (50 Seats)',
                        paymentMethod: 'Visa **** 8812',
                        vatNumber: 'EU994012841'
                      },
                      {
                        txId: 'TX-9978500',
                        invoiceNo: 'INV-2026-0512',
                        date: '2026-05-12 16:02:11',
                        amount: 150.00,
                        taxAmount: 0.00,
                        netAmount: 150.00,
                        status: 'REFUNDED',
                        plan: 'Trial Pilot Add-on Seat Refund',
                        paymentMethod: 'Visa **** 8812',
                        vatNumber: 'EU994012841'
                      }
                    ]
                      .filter((tx) => {
                        const matchesSearch = tx.invoiceNo.toLowerCase().includes(paymentSearchQuery.toLowerCase()) || tx.txId.toLowerCase().includes(paymentSearchQuery.toLowerCase()) || tx.plan.toLowerCase().includes(paymentSearchQuery.toLowerCase());
                        const matchesStatus = paymentStatusFilter === 'ALL' || tx.status === paymentStatusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((tx) => (
                        <tr key={tx.txId} className="hover:bg-slate-900 transition-all">
                          <td className="p-3">
                            <span className="text-white font-bold block">{tx.invoiceNo}</span>
                            <span className="text-slate-500 text-[9px] font-mono">{tx.txId}</span>
                          </td>
                          <td className="p-3 text-slate-300 font-bold">{tx.plan}</td>
                          <td className="p-3 text-slate-400 text-[10px]">{tx.date}</td>
                          <td className="p-3 text-slate-300">{tx.paymentMethod}</td>
                          <td className="p-3 text-emerald-400 font-black">${tx.amount.toFixed(2)}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                                tx.status === 'PAID'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                  : tx.status === 'PENDING'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setSelectedInvoiceReceiptModal(tx)}
                              className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold text-[10px] rounded-lg transition-all"
                            >
                              VIEW RECEIPT
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RECEIPT MODAL */}
          {selectedInvoiceReceiptModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Receipt className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">Official Tax Invoice Receipt</h3>
                  </div>
                  <button
                    onClick={() => setSelectedInvoiceReceiptModal(null)}
                    className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Invoice Reference:</span>
                    <span className="text-amber-400 font-bold">{selectedInvoiceReceiptModal.invoiceNo}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Transaction Hash:</span>
                    <span className="text-white font-mono">{selectedInvoiceReceiptModal.txId}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="text-slate-300">{selectedInvoiceReceiptModal.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Description:</span>
                    <span className="text-white font-bold">{selectedInvoiceReceiptModal.plan}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">Tax Reg / VAT No:</span>
                    <span className="text-sky-400 font-mono">{selectedInvoiceReceiptModal.vatNumber}</span>
                  </div>

                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal Net:</span>
                      <span>${selectedInvoiceReceiptModal.netAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Tax / VAT Included:</span>
                      <span>${selectedInvoiceReceiptModal.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-slate-800">
                      <span>Total Paid:</span>
                      <span className="text-emerald-400">${selectedInvoiceReceiptModal.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => {
                      alert(`Printing Official Invoice ${selectedInvoiceReceiptModal.invoiceNo}... PDF sent to printer.`);
                      setSelectedInvoiceReceiptModal(null);
                    }}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
                  >
                    PRINT / DOWNLOAD PDF
                  </button>
                  <button
                    onClick={() => setSelectedInvoiceReceiptModal(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: MONETIZATION TIPS */}
      {/* ========================================================================= */}
      {activeSubTab === 'monetization-tips' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <Lightbulb className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">App Portal Monetization Playbook & Strategy Advisor</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      REVENUE EXPANSION GUIDE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Proven strategies to maximize app revenues when publishing on Google AI Studio applet portal.
                  </p>
                </div>
              </div>
            </div>

            {/* STRATEGY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                    STRATEGY #1
                  </span>
                  <span className="text-emerald-400 font-bold text-xs">+45% Projected Revenue</span>
                </div>
                <h3 className="text-sm font-bold text-white">Tiered Enterprise B2B Licensing</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Offer multi-vessel and fleet-wide license tiers (Starter, Pro Captain, Enterprise Fleet). Ship operators willingly pay monthly premiums for aggregated telemetry and compliance audits.
                </p>
                <button
                  onClick={() => {
                    setMonetizationToggles(prev => ({ ...prev, tieredEnterprise: true }));
                    alert('Enabled Tiered Enterprise Licensing Model in billing configuration.');
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{monetizationToggles.tieredEnterprise ? 'MODEL ACTIVE' : 'ACTIVATE MODEL'}</span>
                </button>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold text-[10px]">
                    STRATEGY #2
                  </span>
                  <span className="text-sky-400 font-bold text-xs">+25% Projected Revenue</span>
                </div>
                <h3 className="text-sm font-bold text-white">Premium Weather & High-Def Radar Add-ons</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Gate high-frequency satellite AIS updates, Doppler radar, and wave-height forecasts behind microtransactions or monthly data pass add-ons.
                </p>
                <button
                  onClick={() => {
                    setMonetizationToggles(prev => ({ ...prev, inAppMicrotx: true }));
                    alert('Activated In-App Microtransactions for HD Radar Feed.');
                  }}
                  className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{monetizationToggles.inAppMicrotx ? 'MODEL ACTIVE' : 'ACTIVATE MODEL'}</span>
                </button>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-[10px]">
                    STRATEGY #3
                  </span>
                  <span className="text-purple-400 font-bold text-xs">+35% Projected Revenue</span>
                </div>
                <h3 className="text-sm font-bold text-white">White-Label Regional Port Portal Licensing</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  License custom-branded e-Visa, berth booking, and harbormaster AI chatbot portals directly to regional port authorities for annual SaaS retainers.
                </p>
                <button
                  onClick={() => {
                    setMonetizationToggles(prev => ({ ...prev, whiteLabelPortals: true }));
                    alert('White-Label Port Portal SaaS licensing enabled.');
                  }}
                  className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{monetizationToggles.whiteLabelPortals ? 'MODEL ACTIVE' : 'ACTIVATE MODEL'}</span>
                </button>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[10px]">
                    STRATEGY #4
                  </span>
                  <span className="text-amber-400 font-bold text-xs">+20% Projected Revenue</span>
                </div>
                <h3 className="text-sm font-bold text-white">B2B API Developer Marketplace</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Expose rate-limited API keys for external developers and logistics companies to query carbon calculations, distance matrix, and flight status.
                </p>
                <button
                  onClick={() => {
                    setMonetizationToggles(prev => ({ ...prev, b2bApiMarketplace: true }));
                    alert('B2B API Marketplace pay-per-call gateway enabled.');
                  }}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{monetizationToggles.b2bApiMarketplace ? 'MODEL ACTIVE' : 'ACTIVATE MODEL'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: REVENUE FORECAST */}
      {/* ========================================================================= */}
      {activeSubTab === 'revenue-forecast' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/40 text-purple-400">
                  <TrendingUp className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">AI Predictive 12-Month Revenue & Valuation Forecast</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      MACHINE LEARNING PROJECTION
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Predictive ARR modeling based on current adoption, expansion MRR, and seat growth trajectory.
                  </p>
                </div>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                {(['Conservative', 'Expected', 'Aggressive'] as const).map((sc) => (
                  <button
                    key={sc}
                    onClick={() => setForecastGrowthScenario(sc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      forecastGrowthScenario === sc ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>

            {/* FORECAST SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Projected 12-Month ARR</span>
                <span className="text-2xl font-black text-purple-400 block">
                  {forecastGrowthScenario === 'Conservative' ? '$650,000' : forecastGrowthScenario === 'Expected' ? '$1,015,000' : '$1,680,000'}
                </span>
                <span className="text-emerald-400 text-[10px]">
                  {forecastGrowthScenario === 'Conservative' ? '+12% YoY' : forecastGrowthScenario === 'Expected' ? '+75% YoY' : '+190% YoY'} Growth Rate
                </span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Estimated Enterprise Valuation</span>
                <span className="text-2xl font-black text-emerald-400 block">
                  {forecastGrowthScenario === 'Conservative' ? '$5.2M' : forecastGrowthScenario === 'Expected' ? '$10.1M' : '$20.1M'}
                </span>
                <span className="text-slate-400 text-[10px]">8x - 12x ARR Multiple</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">LTV / CAC Efficiency Ratio</span>
                <span className="text-2xl font-black text-sky-400 block">4.8x</span>
                <span className="text-emerald-400 text-[10px]">3.2 Month Payback Period</span>
              </div>
            </div>

            {/* QUARTERLY FORECAST PIPELINE */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span>Quarterly Revenue Trajectory (2026 - 2027)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { q: 'Q3 2026', rev: '$165,000', vessels: '22 Fleets', growth: '+15%' },
                  { q: 'Q4 2026', rev: '$210,000', vessels: '35 Fleets', growth: '+27%' },
                  { q: 'Q1 2027', rev: '$280,000', vessels: '50 Fleets', growth: '+33%' },
                  { q: 'Q2 2027', rev: '$360,000', vessels: '72 Fleets', growth: '+28%' }
                ].map((quarter) => (
                  <div key={quarter.q} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-purple-400 font-bold text-xs">{quarter.q}</span>
                    <span className="text-xl font-black text-white block">{quarter.rev}</span>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400">{quarter.vessels}</span>
                      <span className="text-emerald-400 font-bold">{quarter.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPANSION CALCULATOR */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Coins className="w-4 h-4 text-emerald-400" />
                <span>Custom Enterprise Seat Growth Simulator</span>
              </h3>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 w-full sm:w-auto">
                  <label className="text-slate-400 text-xs">Simulated Custom Vessels/Aircraft Seats Added:</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={customSeatsInput}
                      onChange={(e) => setCustomSeatsInput(Number(e.target.value))}
                      className="w-48 accent-purple-500 cursor-pointer"
                    />
                    <span className="text-white font-bold text-sm">{customSeatsInput} Seats</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 text-[10px] block uppercase">Incremental Added ARR</span>
                  <span className="text-2xl font-black text-emerald-400">+${(customSeatsInput * 180 * 12).toLocaleString()} / yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: REVENUE SIMULATOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'revenue-simulator' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <Calculator className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Interactive SaaS Revenue & Financial Outcome Simulator</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      SCENARIO ENGINE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Model MRR, ARR, LTV/CAC, and cash flow projections by adjusting pricing per vessel, active fleets, churn, add-ons, and acquisition costs.
                  </p>
                </div>
              </div>

              {/* PRESET SCENARIO BUTTONS */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                {[
                  { name: 'Bootstrapped', price: 180, fleets: 15, vessels: 8, churn: 1.2, addon: 30, cac: 2000 },
                  { name: 'Scaleup', price: 250, fleets: 40, vessels: 12, churn: 0.8, addon: 45, cac: 3200 },
                  { name: 'Enterprise', price: 420, fleets: 85, vessels: 20, churn: 0.4, addon: 70, cac: 6500 }
                ].map((sc) => (
                  <button
                    key={sc.name}
                    onClick={() => {
                      setSimScenarioPreset(sc.name as any);
                      setSimPricePerVessel(sc.price);
                      setSimTotalFleets(sc.fleets);
                      setSimVesselsPerFleet(sc.vessels);
                      setSimChurnRate(sc.churn);
                      setSimAddonAdoption(sc.addon);
                      setSimCac(sc.cac);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      simScenarioPreset === sc.name ? 'bg-emerald-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sc.name} Preset
                  </button>
                ))}
              </div>
            </div>

            {/* SIMULATOR CONTROLS & CALCULATED METRICS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CONTROLS COLUMN (SLIDERS) */}
              <div className="lg:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Financial Variables & Parameters</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* PRICE PER VESSEL */}
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Price per Vessel/Seat ($/mo):</span>
                      <span className="text-emerald-400 font-black">${simPricePerVessel}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="10"
                      value={simPricePerVessel}
                      onChange={(e) => setSimPricePerVessel(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  {/* TOTAL FLEETS */}
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Active Operator Fleets:</span>
                      <span className="text-sky-400 font-black">{simTotalFleets} Fleets</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="200"
                      value={simTotalFleets}
                      onChange={(e) => setSimTotalFleets(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  {/* VESSELS PER FLEET */}
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Vessels per Fleet (Avg):</span>
                      <span className="text-purple-400 font-black">{simVesselsPerFleet} Vessels</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={simVesselsPerFleet}
                      onChange={(e) => setSimVesselsPerFleet(Number(e.target.value))}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>

                  {/* CHURN RATE */}
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Monthly Logo Churn Rate (%):</span>
                      <span className="text-rose-400 font-black">{simChurnRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="5.0"
                      step="0.1"
                      value={simChurnRate}
                      onChange={(e) => setSimChurnRate(Number(e.target.value))}
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                  </div>

                  {/* ADDON ADOPTION */}
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Radar & Weather Add-On Adoption (%):</span>
                      <span className="text-amber-400 font-black">{simAddonAdoption}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={simAddonAdoption}
                      onChange={(e) => setSimAddonAdoption(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  {/* CAC */}
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Customer Acquisition Cost (CAC):</span>
                      <span className="text-teal-400 font-black">${simCac.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="15000"
                      step="250"
                      value={simCac}
                      onChange={(e) => setSimCac(Number(e.target.value))}
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* SIMULATED DYNAMIC OUTPUTS */}
              {(() => {
                const totalVessels = simTotalFleets * simVesselsPerFleet;
                const baseMrr = totalVessels * simPricePerVessel;
                const addonMrr = baseMrr * ((simAddonAdoption / 100) * 0.35);
                const grossMrr = baseMrr + addonMrr;
                const arr = grossMrr * 12;
                const arpa = grossMrr / simTotalFleets;
                const lifetimeMonths = Math.min(120, Math.max(1, Math.round(100 / simChurnRate)));
                const ltv = arpa * lifetimeMonths * 0.85;
                const ltvCacRatio = (ltv / simCac).toFixed(1);
                const cacPaybackMonths = (simCac / (arpa * 0.85)).toFixed(1);

                return (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-emerald-400 uppercase flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span>Simulated Financial Outcomes</span>
                      </h3>

                      <div className="space-y-3 pt-3">
                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Total Managed Vessels:</span>
                          <span className="text-white font-bold text-sm">{totalVessels.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Simulated Monthly Revenue (MRR):</span>
                          <span className="text-emerald-400 font-black text-lg">${Math.round(grossMrr).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Simulated Annual Revenue (ARR):</span>
                          <span className="text-emerald-300 font-black text-xl">${Math.round(arr).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">ARPA (per Fleet):</span>
                          <span className="text-sky-400 font-bold">${Math.round(arpa).toLocaleString()} / mo</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Customer Lifetime Value (LTV):</span>
                          <span className="text-purple-400 font-bold">${Math.round(ltv).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">LTV : CAC Ratio:</span>
                          <span className={`font-black text-sm ${Number(ltvCacRatio) >= 3.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {ltvCacRatio}x {Number(ltvCacRatio) >= 3.0 ? '✓ Healthy' : '⚠️ Sub-optimal'}
                          </span>
                        </div>

                        <div className="flex justify-between items-baseline">
                          <span className="text-slate-400 text-xs">CAC Payback Period:</span>
                          <span className="text-teal-300 font-bold">{cacPaybackMonths} Months</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Simulated Financial Model Saved!\nARR: $${Math.round(arr).toLocaleString()}\nLTV/CAC: ${ltvCacRatio}x`)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center justify-center space-x-1"
                    >
                      <Download className="w-4 h-4" />
                      <span>EXPORT SIMULATION MODEL (.CSV)</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: AUTOMATED TAX REPORTS */}
      {/* ========================================================================= */}
      {activeSubTab === 'automated-tax-reports' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-teal-500/20 rounded-2xl border border-teal-500/40 text-teal-400">
                  <FileSpreadsheet className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Automated Tax Reporting & Compliance Vault</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                      TAX AUTHORITY SYNC
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Auto-generate VAT, GST, and Corporate tax filing documentation, track filing deadlines, and dispatch tax reports.
                  </p>
                </div>
              </div>

              {/* REPORT CONTROLS & AUTOMATION TOGGLE */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold pl-1">Auto-Filing Engine:</span>
                  <button
                    onClick={() => {
                      setAutoFilingEnabled(!autoFilingEnabled);
                      alert(`Automated Tax Authority Direct Filing set to ${!autoFilingEnabled ? 'ENABLED' : 'DISABLED'}.`);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      autoFilingEnabled ? 'bg-teal-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {autoFilingEnabled ? 'ACTIVE' : 'OFF'}
                  </button>
                </div>

                <button
                  onClick={() => alert(`Generating Complete Automated Tax Package for Period ${taxReportPeriod}... File: MARITIME_SAAS_TAX_AUDIT_${taxReportPeriod.replace(' ', '_')}.pdf`)}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>GENERATE TAX PACKAGE</span>
                </button>
              </div>
            </div>

            {/* JURISDICTIONAL FILING SCHEDULE CARDS */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Globe className="w-4 h-4 text-teal-400" />
                <span>Global Jurisdictional Tax Filing Schedule & Status</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { jurisdiction: 'EU MOSS VAT', rate: '21.0%', due: '2026-09-30', liability: '$10,132.50', status: taxFilingStatuses['EU MOSS'] || 'READY FOR FILING' },
                  { jurisdiction: 'US California Sales Tax', rate: '8.25%', due: '2026-10-15', liability: '$3,980.60', status: taxFilingStatuses['US Sales Tax'] || 'SCHEDULED AUTO-FILE' },
                  { jurisdiction: 'UK HMRC VAT', rate: '20.0%', due: '2026-11-07', liability: '$8,420.00', status: taxFilingStatuses['UK HMRC'] || 'DRAFT' },
                  { jurisdiction: 'Singapore IRAS GST', rate: '9.0%', due: '2026-10-31', liability: '$4,342.50', status: taxFilingStatuses['Singapore IRAS'] || 'FILED & CONFIRMED' },
                  { jurisdiction: 'UAE Corporate Tax', rate: '0.0%', due: '2026-12-31', liability: '$0.00', status: taxFilingStatuses['UAE Corporate Tax'] || 'EXEMPTION APPLIED' }
                ].map((item) => (
                  <div key={item.jurisdiction} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-white">{item.jurisdiction}</span>
                        <span className="text-teal-400 font-mono text-[10px]">{item.rate}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Filing Deadline:</span>
                        <span className="text-amber-400 font-bold">{item.due}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Est. Tax Liability:</span>
                        <span className="text-emerald-400 font-black">{item.liability}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                        item.status.includes('FILED') ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        item.status.includes('SCHEDULED') ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' :
                        'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {item.status}
                      </span>
                      <button
                        onClick={() => {
                          setTaxFilingStatuses(prev => ({ ...prev, [item.jurisdiction.split(' ')[0]]: 'FILED & CONFIRMED' }));
                          alert(`Tax Report Submitted for ${item.jurisdiction}! Confirmation ID: TX-GOV-${Math.floor(100000 + Math.random() * 900000)}`);
                        }}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-teal-500 hover:text-slate-950 text-teal-300 font-bold text-[10px] rounded-lg transition-all"
                      >
                        SUBMIT REPORT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DEDUCTIONS & R&D TAX CREDITS */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <span>Tax Deductions & Maritime R&D Credit Ledger</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Cloud Infrastructure Expense</span>
                  <span className="text-emerald-400 font-bold text-sm">-$12,500 / month</span>
                  <span className="text-slate-500 text-[9px] block">Fully deductible (100% OPEX)</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Cybersecurity R&D Tax Credit</span>
                  <span className="text-sky-400 font-bold text-sm">-$7,200 offset</span>
                  <span className="text-slate-500 text-[9px] block">15% Maritime AI Innovation Offset</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">International Port Duty Exemption</span>
                  <span className="text-purple-400 font-bold text-sm">-$8,000 / month</span>
                  <span className="text-slate-500 text-[9px] block">Duty-Free High Seas Telemetry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: MONETIZATION BENCHMARK */}
      {/* ========================================================================= */}
      {activeSubTab === 'monetization-benchmark' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Platform Monetization & Unit Economics Benchmark</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      TOP 8% PERCENTILE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Benchmark platform ARPA, LTV/CAC, gross margins, and churn against global maritime and enterprise SaaS peer groups.
                  </p>
                </div>
              </div>

              {/* PEER GROUP FILTER */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                {(['Global Maritime SaaS', 'Aviation Cyber', 'B2B Enterprise SaaS'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setBenchmarkComparisonMode(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      benchmarkComparisonMode === mode ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* BENCHMARK METRICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { metric: 'ARPA (Avg Revenue / Org)', current: '$1,206 / mo', benchmark: '$850 / mo', percentile: 'Top 10%', status: '+41.8% Outperforming' },
                { metric: 'Monthly Logo Churn Rate', current: '0.4%', benchmark: '1.8%', percentile: 'Top 3%', status: '77.7% Lower Churn' },
                { metric: 'SaaS Gross Margin %', current: '88.5%', benchmark: '76.0%', percentile: 'Top 5%', status: '+12.5% Higher Margin' },
                { metric: 'LTV : CAC Ratio', current: '4.8x', benchmark: '3.2x', percentile: 'Top 12%', status: '+1.6x Capital Efficient' },
                { metric: 'CAC Payback Period', current: '3.2 Months', benchmark: '7.5 Months', percentile: 'Top 7%', status: '2.3x Faster Recovery' },
                { metric: 'Net Revenue Retention (NRR)', current: '118%', benchmark: '106%', percentile: 'Top 8%', status: '+12.0% Expansion Growth' }
              ].map((item) => (
                <div key={item.metric} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-300 font-bold text-xs">{item.metric}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
                      {item.percentile}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <span className="text-slate-500 text-[9px] uppercase block">Platform Current</span>
                      <span className="text-lg font-black text-white">{item.current}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 text-[9px] uppercase block">Industry Avg ({benchmarkComparisonMode})</span>
                      <span className="text-slate-400 font-bold text-sm">{item.benchmark}</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>

                  <span className="text-emerald-400 text-[10px] font-bold block">✓ {item.status}</span>
                </div>
              ))}
            </div>

            {/* AI OPTIMIZATION PLAYBOOK RECOMMENDATIONS */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Monetization Optimization Recommendations (Path to Top 1%)</span>
              </h3>

              <div className="space-y-2">
                {[
                  { title: 'Enforce Annual Upfront Contract Discounts', impact: '+18% LTV Boost', desc: 'Incentivize 12-month prepayments with 15% discount to drastically decrease capital costs.' },
                  { title: 'Automate API Rate Limit Surcharges', impact: '+22% Expansion MRR', desc: 'Charge $0.005 per additional AIS telemetry query past tier limits.' },
                  { title: 'Introduce Enterprise White-Label Harbor Port License', impact: '+$8,500 / account', desc: 'Package port authority customized portals for regional harbormaster hubs.' }
                ].map((rec, i) => (
                  <div key={i} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-400 font-bold">{rec.title}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">{rec.impact}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{rec.desc}</p>
                    </div>

                    <button
                      onClick={() => alert(`Applied Recommendation: ${rec.title}`)}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[10px] transition-all shrink-0"
                    >
                      APPLY NOW
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: ROI CALCULATOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'roi-calculator' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <Percent className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Enterprise ROI & Financial Value Generator</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      CAPITAL EFFICIENCY
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Calculate net ROI, payback timeline, and downtime cost savings from deploying cybersecurity and vessel telemetry.
                  </p>
                </div>
              </div>

              {/* FLEET PRESET BUTTONS */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                {[
                  { name: 'Small Fleet (10 Vessels)', inv: 25000, vessels: 10, sav: 1000, dtCost: 2500, dtHrs: 24 },
                  { name: 'Commercial Carrier (24 Vessels)', inv: 45000, vessels: 24, sav: 1250, dtCost: 3500, dtHrs: 48 },
                  { name: 'Global Fleet (100 Vessels)', inv: 120000, vessels: 100, sav: 1500, dtCost: 5000, dtHrs: 120 }
                ].map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setRoiPreset(p.name as any);
                      setRoiInitialInvestment(p.inv);
                      setRoiVesselsProtected(p.vessels);
                      setRoiMonthlySavingsPerVessel(p.sav);
                      setRoiDowntimeCostSavedHr(p.dtCost);
                      setRoiDowntimeHoursSavedYr(p.dtHrs);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      roiPreset === p.name ? 'bg-emerald-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTROLS & DYNAMIC CALCULATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SLIDERS */}
              <div className="lg:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                  <span>ROI Parameters & Cost Offsets</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Initial Platform Investment:</span>
                      <span className="text-emerald-400 font-black">${roiInitialInvestment.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="250000"
                      step="5000"
                      value={roiInitialInvestment}
                      onChange={(e) => setRoiInitialInvestment(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Vessels in Fleet:</span>
                      <span className="text-sky-400 font-black">{roiVesselsProtected} Vessels</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="150"
                      value={roiVesselsProtected}
                      onChange={(e) => setRoiVesselsProtected(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Monthly Fraud/Incident Savings / Vessel:</span>
                      <span className="text-purple-400 font-black">${roiMonthlySavingsPerVessel.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="250"
                      max="5000"
                      step="250"
                      value={roiMonthlySavingsPerVessel}
                      onChange={(e) => setRoiMonthlySavingsPerVessel(Number(e.target.value))}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Downtime Hour Cost Saved ($/hr):</span>
                      <span className="text-amber-400 font-black">${roiDowntimeCostSavedHr.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="500"
                      value={roiDowntimeCostSavedHr}
                      onChange={(e) => setRoiDowntimeCostSavedHr(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Avoided Downtime Hours per Year:</span>
                      <span className="text-teal-400 font-black">{roiDowntimeHoursSavedYr} Hours / Year</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="200"
                      step="5"
                      value={roiDowntimeHoursSavedYr}
                      onChange={(e) => setRoiDowntimeHoursSavedYr(Number(e.target.value))}
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* CALCULATED OUTPUTS */}
              {(() => {
                const annualDirectSavings = roiVesselsProtected * roiMonthlySavingsPerVessel * 12;
                const annualDowntimeSavings = roiDowntimeCostSavedHr * roiDowntimeHoursSavedYr;
                const totalAnnualValue = annualDirectSavings + annualDowntimeSavings;
                const netAnnualBenefit = totalAnnualValue - roiInitialInvestment;
                const netRoiPct = Math.round((netAnnualBenefit / roiInitialInvestment) * 100);
                const paybackMonths = ((roiInitialInvestment / (totalAnnualValue / 12))).toFixed(1);
                const threeYearNetValue = (totalAnnualValue * 3) - roiInitialInvestment;

                return (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-emerald-400 uppercase flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span>ROI Financial Summary</span>
                      </h3>

                      <div className="space-y-3 pt-3">
                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Total Annual Value Generated:</span>
                          <span className="text-white font-bold text-sm">${totalAnnualValue.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Net 1-Year ROI (%):</span>
                          <span className="text-emerald-400 font-black text-xl">+{netRoiPct}%</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Investment Payback Timeline:</span>
                          <span className="text-sky-400 font-bold text-sm">{paybackMonths} Months</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">3-Year Net Financial Value:</span>
                          <span className="text-emerald-300 font-black text-lg">${threeYearNetValue.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline">
                          <span className="text-slate-400 text-xs">Capital Efficiency Rating:</span>
                          <span className="text-amber-400 font-bold">AAA (Exceptional)</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`ROI Report Generated!\n1-Year ROI: +${netRoiPct}%\nPayback: ${paybackMonths} Months\n3-Year Benefit: $${threeYearNetValue.toLocaleString()}`)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center justify-center space-x-1"
                    >
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD EXECUTIVE ROI REPORT (.PDF)</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: CURRENCY CONVERTER */}
      {/* ========================================================================= */}
      {activeSubTab === 'currency-converter' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/20 rounded-2xl border border-sky-500/40 text-sky-400">
                  <ArrowRightLeft className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Multi-Currency Conversion & Global Rates Engine</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      LIVE FX REFRESH
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Convert international fleet subscriptions, harbor tariffs, and maritime license billing into localized currencies.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Rates: <strong className="text-white">{convLastUpdated}</strong></span>
                <button
                  onClick={() => {
                    setConvLastUpdated(`Refreshed at ${new Date().toLocaleTimeString()} (ECB Feed)`);
                    alert('Exchange rates synchronized with ECB live forex market feed.');
                  }}
                  className="p-1 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                  title="Refresh FX Rates"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>
            </div>

            {/* CONVERTER INPUT CARD */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-sky-400" />
                  <span>Interactive Billing Currency Converter</span>
                </h3>

                <div className="space-y-4">
                  {/* AMOUNT INPUT */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px] font-bold">Subscription Amount:</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={convAmount}
                        onChange={(e) => setConvAmount(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  {/* CURRENCY SELECTORS WITH SWAP */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 space-y-1">
                      <label className="text-slate-400 text-[11px] font-bold">From Currency:</label>
                      <select
                        value={convFromCurrency}
                        onChange={(e) => setConvFromCurrency(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-sky-500"
                      >
                        {Object.keys(currencyRates).map((curr) => (
                          <option key={curr} value={curr}>{curr}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        const temp = convFromCurrency;
                        setConvFromCurrency(convToCurrency);
                        setConvToCurrency(temp);
                      }}
                      className="p-2.5 bg-slate-900 hover:bg-sky-500 hover:text-slate-950 text-sky-400 border border-slate-800 rounded-xl transition-all self-end mb-0.5"
                      title="Swap Currencies"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>

                    <div className="flex-1 space-y-1">
                      <label className="text-slate-400 text-[11px] font-bold">To Currency:</label>
                      <select
                        value={convToCurrency}
                        onChange={(e) => setConvToCurrency(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-sky-500"
                      >
                        {Object.keys(currencyRates).map((curr) => (
                          <option key={curr} value={curr}>{curr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* CALCULATED CONVERSION RESULT */}
                  {(() => {
                    const fromRate = currencyRates[convFromCurrency] || 1.0;
                    const toRate = currencyRates[convToCurrency] || 1.0;
                    const convertedVal = (convAmount / fromRate) * toRate;
                    const unitRate = (1 / fromRate) * toRate;

                    return (
                      <div className="p-4 bg-slate-900/80 rounded-xl border border-sky-500/30 space-y-2">
                        <span className="text-slate-400 text-[10px] block uppercase font-bold">Converted Total Output:</span>
                        <div className="flex justify-between items-baseline">
                          <span className="text-2xl font-black text-sky-400">{convertedVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {convToCurrency}</span>
                          <span className="text-slate-400 text-xs font-bold">1 {convFromCurrency} = {unitRate.toFixed(4)} {convToCurrency}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* GLOBAL TARIFF PRICING MATRIX IN ALL CURRENCIES */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span>Global Fleet Plan Matrix (Multi-Currency)</span>
                </h3>

                <div className="space-y-2">
                  {[
                    { name: 'Starter Captain Plan', baseUsd: 1490 },
                    { name: 'Pro Fleet Plan', baseUsd: 4850 },
                    { name: 'Enterprise Maritime Tier', baseUsd: 12500 }
                  ].map((plan) => (
                    <div key={plan.name} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-white">
                        <span>{plan.name}</span>
                        <span className="text-emerald-400">${plan.baseUsd.toLocaleString()} USD / mo</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-400 pt-1">
                        <div>EUR: <strong className="text-slate-200">€{(plan.baseUsd * currencyRates.EUR).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></div>
                        <div>GBP: <strong className="text-slate-200">£{(plan.baseUsd * currencyRates.GBP).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></div>
                        <div>SGD: <strong className="text-slate-200">S${(plan.baseUsd * currencyRates.SGD).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></div>
                        <div>AED: <strong className="text-slate-200">{(plan.baseUsd * currencyRates.AED).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: TAX DASHBOARD */}
      {/* ========================================================================= */}
      {activeSubTab === 'tax-dashboard' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-teal-500/20 rounded-2xl border border-teal-500/40 text-teal-400">
                  <Scale className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Global Tax Executive Dashboard & Compliance Hub</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                      98.4% AUDIT PREPAREDNESS
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Comprehensive overview of global tax liabilities, remittance balances, exemption certificates, and filing schedules.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert('Tax Compliance Audit Package Exported! Included: Audit Logs, Exemption Certificates, and Remittance Receipts.')}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT TAX AUDIT VAULT</span>
                </button>
              </div>
            </div>

            {/* KEY TAX METRICS STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Total YTD Tax Collected</span>
                <span className="text-xl font-black text-white">$26,875.60</span>
                <span className="text-emerald-400 text-[10px] font-bold block">✓ Accrued across 5 jurisdictions</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Remitted Tax to Authorities</span>
                <span className="text-xl font-black text-teal-400">$18,455.00</span>
                <span className="text-slate-400 text-[10px] font-bold block">Q1-Q2 2026 Cleared</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Pending Remittance Due</span>
                <span className="text-xl font-black text-amber-400">$8,420.60</span>
                <span className="text-amber-300 text-[10px] font-bold block">Next Filing: 2026-09-30</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Active Exemption Certificates</span>
                <span className="text-xl font-black text-sky-400">{taxExemptionCertificates.length} Valid Certs</span>
                <span className="text-sky-300 text-[10px] font-bold block">Duty-Free Carrier Exemptions</span>
              </div>
            </div>

            {/* REGIONAL TAX NEXUS & EXEMPTION VAULT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* JURISDICTION TABLE */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-teal-400" />
                  <span>Tax Nexus Jurisdictions & Filings</span>
                </h3>

                <div className="space-y-2">
                  {[
                    { jurisdiction: 'EU MOSS VAT', rate: '21.0%', balance: '$10,132.50', status: 'Ready for Remittance' },
                    { jurisdiction: 'US California Sales Tax', rate: '8.25%', balance: '$3,980.60', status: 'Auto-Scheduled' },
                    { jurisdiction: 'UK HMRC VAT', rate: '20.0%', balance: '$8,420.00', status: 'Drafting' },
                    { jurisdiction: 'Singapore IRAS GST', rate: '9.0%', balance: '$4,342.50', status: 'Filed & Remitted' }
                  ].map((j) => (
                    <div key={j.jurisdiction} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-white">{j.jurisdiction}</span>
                          <span className="text-teal-400 text-[10px] font-mono">({j.rate})</span>
                        </div>
                        <span className="text-slate-400 text-[10px]">Due Balance: <strong className="text-emerald-400">{j.balance}</strong></span>
                      </div>

                      <button
                        onClick={() => alert(`Initiating Tax Remittance Wire Transfer for ${j.jurisdiction} (${j.balance})...`)}
                        className="px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[10px] rounded-lg transition-all"
                      >
                        REMIT NOW
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* TAX EXEMPTION CERTIFICATE VAULT */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-teal-400" />
                    <span>Maritime Exemption Certificate Vault</span>
                  </h3>
                  <button
                    onClick={() => {
                      const newCert = {
                        id: `CERT-INT-${Math.floor(1000 + Math.random() * 9000)}`,
                        operator: 'Global Sea Transport Ltd',
                        jurisdiction: 'International Waters',
                        status: 'VALID',
                        expires: '2028-01-01'
                      };
                      setTaxExemptionCertificates([...taxExemptionCertificates, newCert]);
                      alert('New Maritime Tax Exemption Certificate Uploaded & Validated!');
                    }}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-teal-500 hover:text-slate-950 text-teal-300 font-bold text-[10px] rounded-lg border border-slate-800 transition-all flex items-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>ADD CERTIFICATE</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {taxExemptionCertificates.map((cert) => (
                    <div key={cert.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white">{cert.operator}</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[9px] font-mono">{cert.id}</span>
                        </div>
                        <div className="text-slate-400 text-[10px] mt-0.5">
                          {cert.jurisdiction} • Expires: <span className="text-amber-400">{cert.expires}</span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: REVENUE ALERTS */}
      {/* ========================================================================= */}
      {activeSubTab === 'revenue-alerts' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/40 text-rose-400">
                  <BellRing className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Real-Time Revenue & Billing Alert Center</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                      MONITORING ACTIVE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Configure thresholds and dispatch instant alerts for MRR drops, churn spikes, overdue invoices, and tax deadlines.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert('Triggering Test Revenue Alert across Slack, Email, and Webhook channels...\nNotification Sent Successfully!')}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>TEST ALL ALERTS</span>
                </button>
              </div>
            </div>

            {/* ACTIVE REVENUE ALERT RULES GRID */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <Bell className="w-4 h-4 text-rose-400" />
                <span>Active Revenue & Financial Threshold Triggers</span>
              </h3>

              <div className="space-y-2">
                {revenueAlertRules.map((rule) => (
                  <div key={rule.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{rule.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                          rule.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                          rule.severity === 'High' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                          'bg-sky-500/20 text-sky-300 border-sky-500/30'
                        }`}>
                          {rule.severity}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 text-[9px] font-mono">{rule.id}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] flex items-center space-x-3">
                        <span>Metric: <strong className="text-slate-200">{rule.metric}</strong></span>
                        <span>Threshold: <strong className="text-emerald-400">{rule.threshold}</strong></span>
                        <span>Channel: <strong className="text-purple-400">{rule.channel}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => {
                          setRevenueAlertRules(revenueAlertRules.map(r => r.id === rule.id ? { ...r, status: r.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : r));
                        }}
                        className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all ${
                          rule.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {rule.status}
                      </button>

                      <button
                        onClick={() => {
                          setRevenueAlertRules(revenueAlertRules.filter(r => r.id !== rule.id));
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-all"
                        title="Delete Alert Rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CREATE NEW CUSTOM REVENUE ALERT FORM */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <Plus className="w-4 h-4 text-rose-400" />
                <span>Create New Custom Revenue Alert Trigger</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] font-bold uppercase">Alert Rule Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Unusual High Refund Spike"
                    value={newAlertName}
                    onChange={(e) => setNewAlertName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] font-bold uppercase">Target Metric:</label>
                  <select
                    value={newAlertMetric}
                    onChange={(e) => setNewAlertMetric(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-rose-500"
                  >
                    <option value="MRR">MRR Threshold</option>
                    <option value="Churn %">Churn Rate Spike</option>
                    <option value="Overdue Billing">Overdue Invoice</option>
                    <option value="Tax Compliance">Tax Deadline</option>
                    <option value="FX Rate">FX Currency Volatility</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] font-bold uppercase">Threshold Value:</label>
                  <input
                    type="text"
                    placeholder="e.g. > $5,000"
                    value={newAlertThreshold}
                    onChange={(e) => setNewAlertThreshold(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (!newAlertName) return alert('Please enter an alert rule name.');
                  const createdRule = {
                    id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
                    name: newAlertName,
                    metric: newAlertMetric,
                    threshold: newAlertThreshold,
                    channel: 'Slack & Email',
                    status: 'ACTIVE',
                    severity: 'High'
                  };
                  setRevenueAlertRules([...revenueAlertRules, createdRule]);
                  setNewAlertName('');
                  alert(`New Revenue Alert Created: ${createdRule.name}`);
                }}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>SAVE & ACTIVATE REVENUE ALERT RULE</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SMART TAX OVERVIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'smart-tax-overview' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-teal-500/20 rounded-2xl border border-teal-500/40 text-teal-400">
                  <Landmark className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Smart AI Tax Overview & Strategy Analyzer</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                      TAX AI ENGINE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Simulate gross revenue tax liabilities, model R&D cybersecurity write-offs, and discover high-value maritime deductions.
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert('Smart Tax Strategy Report Generated!\nExported file: MARITIME_SMART_TAX_STRATEGY_2026.pdf')}
                className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>GENERATE SMART TAX STRATEGY</span>
              </button>
            </div>

            {/* CONTROLS & DYNAMIC TAX MODELING */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SLIDERS */}
              <div className="lg:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-teal-400" />
                  <span>Interactive Tax Model Inputs</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Gross Annual Revenue:</span>
                      <span className="text-teal-400 font-black">${smartTaxAnnualRevenue.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="2000000"
                      step="25000"
                      value={smartTaxAnnualRevenue}
                      onChange={(e) => setSmartTaxAnnualRevenue(Number(e.target.value))}
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Standard OPEX Deductions:</span>
                      <span className="text-sky-400 font-black">${smartTaxStandardDeduction.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="300000"
                      step="5000"
                      value={smartTaxStandardDeduction}
                      onChange={(e) => setSmartTaxStandardDeduction(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">R&D Cyber Innovation Credit (%):</span>
                      <span className="text-purple-400 font-black">{smartTaxRdCreditPct}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={smartTaxRdCreditPct}
                      onChange={(e) => setSmartTaxRdCreditPct(Number(e.target.value))}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <label className="text-slate-300 font-bold text-xs block">Tax Jurisdiction Focus:</label>
                    <select
                      value={smartTaxJurisdictionFilter}
                      onChange={(e) => setSmartTaxJurisdictionFilter(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                    >
                      <option value="All">All Regions (Global Aggregate)</option>
                      <option value="EU MOSS">EU MOSS VAT (21%)</option>
                      <option value="US State">US State Sales Tax (8.25%)</option>
                      <option value="Singapore GST">Singapore IRAS GST (9%)</option>
                      <option value="UK HMRC">UK HMRC VAT (20%)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* DYNAMIC CALCULATED TAX OBLIGATIONS */}
              {(() => {
                const taxableBase = Math.max(0, smartTaxAnnualRevenue - smartTaxStandardDeduction);
                const grossTaxRate = smartTaxJurisdictionFilter === 'EU MOSS' ? 0.21 :
                                   smartTaxJurisdictionFilter === 'US State' ? 0.0825 :
                                   smartTaxJurisdictionFilter === 'Singapore GST' ? 0.09 :
                                   smartTaxJurisdictionFilter === 'UK HMRC' ? 0.20 : 0.18;
                const initialTaxLiability = taxableBase * grossTaxRate;
                const rdTaxOffset = initialTaxLiability * (smartTaxRdCreditPct / 100);
                const netTaxLiability = Math.max(0, initialTaxLiability - rdTaxOffset);
                const effectiveRate = ((netTaxLiability / smartTaxAnnualRevenue) * 100).toFixed(1);

                return (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-teal-500/30 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-teal-400 uppercase flex items-center space-x-2">
                        <Scale className="w-4 h-4 text-teal-400" />
                        <span>Calculated Tax Summary</span>
                      </h3>

                      <div className="space-y-3 pt-3">
                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Taxable Base Revenue:</span>
                          <span className="text-white font-bold text-sm">${taxableBase.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Gross Tax Liability:</span>
                          <span className="text-slate-300 font-bold">${Math.round(initialTaxLiability).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">R&D Tax Offset ({smartTaxRdCreditPct}%):</span>
                          <span className="text-emerald-400 font-bold">-${Math.round(rdTaxOffset).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Net Final Tax Due:</span>
                          <span className="text-teal-400 font-black text-xl">${Math.round(netTaxLiability).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline">
                          <span className="text-slate-400 text-xs">Effective Rate on Revenue:</span>
                          <span className="text-amber-400 font-bold text-sm">{effectiveRate}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-[11px] text-teal-300 space-y-1">
                      <span className="font-bold block">✓ Optimization Tip Applied:</span>
                      <span>Combining R&D credits with OPEX deductions reduces total tax burden by ${Math.round(smartTaxStandardDeduction * grossTaxRate + rdTaxOffset).toLocaleString()}.</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* AI TAX RECOMMENDATIONS */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>AI Tax Maximization Recommendations</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { title: 'Pre-Pay Satellite Data Subscriptions', savings: 'Save ~$12,400', desc: 'Pre-paying annual satellite AIS bandwidth counts as a 100% current fiscal year write-off.' },
                  { title: 'Section 41 Cyber R&D Credit', savings: 'Save ~$15,800', desc: 'Incorporate shipboard endpoint malware detector development under software R&D credits.' },
                  { title: 'High Seas Duty Exemption', savings: 'Save ~$9,200', desc: 'Telecommunications delivered outside 12-nautical-mile territorial limits qualify for 0% VAT.' }
                ].map((rec, i) => (
                  <div key={i} className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-white font-bold text-xs">{rec.title}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">{rec.savings}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">{rec.desc}</p>
                    </div>

                    <button
                      onClick={() => alert(`Applied Tax Strategy: ${rec.title}`)}
                      className="w-full py-1.5 bg-slate-900 hover:bg-teal-500 hover:text-slate-950 text-teal-300 font-bold text-[10px] rounded-lg transition-all border border-slate-800 mt-2"
                    >
                      APPLY STRATEGY
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: GLOBAL TARIFF COMPARISON */}
      {/* ========================================================================= */}
      {activeSubTab === 'global-tariff-comparison' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Global Maritime Port & Harbor Tariff Matrix</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      6 GLOBAL HUBS
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Compare harbour dues, pilotage fees, cybersecurity inspection surcharges, and decarbonization tariffs across international ports.
                  </p>
                </div>
              </div>

              {/* VESSEL CLASS FILTER */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                {(['Container Vessel', 'Oil Tanker', 'Bulk Carrier', 'Cruise Ship'] as const).map((vc) => (
                  <button
                    key={vc}
                    onClick={() => setTariffVesselClass(vc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      tariffVesselClass === vc ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {vc.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* TONNAGE SLIDER & REGIONAL FILTER */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Gross Registered Tonnage (GRT):</span>
                  <span className="text-amber-400 font-black">{tariffTonnageGross.toLocaleString()} GRT</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="5000"
                  value={tariffTonnageGross}
                  onChange={(e) => setTariffTonnageGross(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-xs font-bold">Region:</span>
                {(['All', 'Europe', 'Asia', 'Americas', 'Middle East'] as const).map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setTariffPortFilter(reg)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      tariffPortFilter === reg ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* PORT TARIFF CARDS MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Port of Rotterdam', country: 'Netherlands (EU)', region: 'Europe', baseRate: 0.18, cyberSurcharge: 450, ecoDiscount: 0.15, status: 'Green Tariff' },
                { name: 'Port of Singapore', country: 'Singapore (APAC)', region: 'Asia', baseRate: 0.14, cyberSurcharge: 300, ecoDiscount: 0.20, status: 'Lowest Fee Hub' },
                { name: 'Port of Los Angeles', country: 'United States', region: 'Americas', baseRate: 0.22, cyberSurcharge: 650, ecoDiscount: 0.05, status: 'High Security Zone' },
                { name: 'Jebel Ali Port', country: 'Dubai (UAE)', region: 'Middle East', baseRate: 0.12, cyberSurcharge: 250, ecoDiscount: 0.10, status: 'Duty-Free Freezone' },
                { name: 'Shanghai Yangshan', country: 'China (APAC)', region: 'Asia', baseRate: 0.16, cyberSurcharge: 400, ecoDiscount: 0.12, status: 'High Traffic' },
                { name: 'Port of Hamburg', country: 'Germany (EU)', region: 'Europe', baseRate: 0.20, cyberSurcharge: 500, ecoDiscount: 0.18, status: 'Elbe Eco Zone' }
              ]
              .filter(p => tariffPortFilter === 'All' || p.region === tariffPortFilter)
              .map((port) => {
                const multiplier = tariffVesselClass === 'Oil Tanker' ? 1.3 : tariffVesselClass === 'Cruise Ship' ? 1.5 : 1.0;
                const grossFee = Math.round((tariffTonnageGross * port.baseRate * multiplier) + port.cyberSurcharge);
                const discountVal = Math.round(grossFee * port.ecoDiscount);
                const netFee = grossFee - discountVal;

                return (
                  <div key={port.name} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-white font-bold text-xs block">{port.name}</span>
                          <span className="text-slate-400 text-[10px]">{port.country}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
                          {port.status}
                        </span>
                      </div>

                      <div className="space-y-2 pt-3">
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>Base Harbour Dues:</span>
                          <span className="text-slate-200 font-bold">${Math.round(tariffTonnageGross * port.baseRate * multiplier).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>Cyber & AIS Tariff:</span>
                          <span className="text-sky-400 font-bold">+${port.cyberSurcharge}</span>
                        </div>

                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>Eco Decarbon Incentive:</span>
                          <span className="text-emerald-400 font-bold">-${discountVal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-t border-slate-900 pt-2">
                          <span className="text-slate-300 text-xs font-bold">Estimated Port Tariff:</span>
                          <span className="text-amber-400 font-black text-base">${netFee.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Optimal Route Calculation Saved for ${port.name}!\nNet Tariff: $${netFee.toLocaleString()}`)}
                      className="w-full py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold text-[10px] rounded-xl transition-all border border-slate-800"
                    >
                      CALCULATE PORT ROUTE
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: GLOBAL TARIFF HEATMAP */}
      {/* ========================================================================= */}
      {activeSubTab === 'global-tariff-heatmap' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-500/20 rounded-2xl border border-orange-500/40 text-orange-400">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Global Maritime Port Tariff & Surcharge Heatmap</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-bold">
                      LIVE DENSITY HEATMAP
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Visual tariff density matrix highlighting cost intensity, cybersecurity surcharges, and environmental levies across global trade hubs.
                  </p>
                </div>
              </div>

              {/* HEATMAP METRIC SELECTOR */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                {(['Total Tariff Rate', 'Cyber Security Surcharge', 'Decarbonization Levy', 'Pilotage Dues'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setHeatmapMetric(m)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      heatmapMetric === m ? 'bg-orange-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* HEATMAP FILTERS & TONNAGE CONTROL */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Vessel Displacement (GRT):</span>
                  <span className="text-orange-400 font-black">{heatmapVesselTonnage.toLocaleString()} GRT</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={heatmapVesselTonnage}
                  onChange={(e) => setHeatmapVesselTonnage(Number(e.target.value))}
                  className="w-full accent-orange-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-xs font-bold">Region Filter:</span>
                {(['All', 'Europe', 'Asia-Pacific', 'Americas', 'Middle East'] as const).map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setHeatmapRegion(reg)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      heatmapRegion === reg ? 'bg-orange-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* HEATMAP COLOR SCALE LEGEND */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between gap-2 text-[10px] text-slate-400">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Low Cost / Eco Discounted (&lt; $12k)
              </span>
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Moderate Tariff ($12k - $20k)
              </span>
              <span className="font-bold text-rose-400 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> High Density Surcharge (&gt; $20k)
              </span>
            </div>

            {/* PORT HEATMAP GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { port: 'Port of Rotterdam', code: 'NLRTM', region: 'Europe', baseRate: 0.21, cyberSurcharge: 600, ecoLevy: 250, pilotage: 1800, intensity: 82 },
                { port: 'Port of Singapore', code: 'SGSIN', region: 'Asia-Pacific', baseRate: 0.13, cyberSurcharge: 320, ecoLevy: 180, pilotage: 1200, intensity: 48 },
                { port: 'Port of Los Angeles', code: 'USLAX', region: 'Americas', baseRate: 0.25, cyberSurcharge: 850, ecoLevy: 400, pilotage: 2400, intensity: 94 },
                { port: 'Jebel Ali Port', code: 'AEJEA', region: 'Middle East', baseRate: 0.11, cyberSurcharge: 200, ecoLevy: 100, pilotage: 950, intensity: 32 },
                { port: 'Shanghai Yangshan', code: 'CNSHA', region: 'Asia-Pacific', baseRate: 0.17, cyberSurcharge: 450, ecoLevy: 300, pilotage: 1500, intensity: 65 },
                { port: 'Port of Hamburg', code: 'DEHAM', region: 'Europe', baseRate: 0.22, cyberSurcharge: 550, ecoLevy: 350, pilotage: 2100, intensity: 88 },
                { port: 'Port of Santos', code: 'BRSSZ', region: 'Americas', baseRate: 0.18, cyberSurcharge: 380, ecoLevy: 220, pilotage: 1400, intensity: 58 },
                { port: 'Port of Sydney', code: 'AUSYD', region: 'Asia-Pacific', baseRate: 0.20, cyberSurcharge: 490, ecoLevy: 280, pilotage: 1750, intensity: 74 },
                { port: 'Port of Durban', code: 'ZADUR', region: 'Middle East', baseRate: 0.15, cyberSurcharge: 280, ecoLevy: 150, pilotage: 1100, intensity: 42 }
              ]
              .filter(p => heatmapRegion === 'All' || p.region === heatmapRegion)
              .map((p) => {
                const totalTariff = Math.round(heatmapVesselTonnage * p.baseRate + p.cyberSurcharge + p.ecoLevy + p.pilotage);
                const displayVal = heatmapMetric === 'Cyber Security Surcharge' ? `$${p.cyberSurcharge}` :
                                   heatmapMetric === 'Decarbonization Levy' ? `$${p.ecoLevy}` :
                                   heatmapMetric === 'Pilotage Dues' ? `$${p.pilotage}` : `$${totalTariff.toLocaleString()}`;

                const heatColor = totalTariff > 20000 ? 'border-rose-500/50 bg-rose-500/10 text-rose-300' :
                                  totalTariff > 12000 ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' :
                                  'border-emerald-500/50 bg-emerald-500/10 text-emerald-300';

                return (
                  <div key={p.port} className={`p-4 rounded-2xl border ${heatColor} transition-all space-y-3 flex flex-col justify-between shadow-lg hover:scale-[1.02]`}>
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-white font-black text-sm block">{p.port}</span>
                          <span className="text-slate-400 text-[10px] font-mono">{p.code} • {p.region}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${heatColor}`}>
                          INTENSITY {p.intensity}%
                        </span>
                      </div>

                      <div className="pt-3 space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Selected Metric Value:</span>
                          <span className="text-white font-black text-sm">{displayVal}</span>
                        </div>

                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div
                            style={{ width: `${p.intensity}%` }}
                            className={`h-full ${totalTariff > 20000 ? 'bg-rose-500' : totalTariff > 12000 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          ></div>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                          <span>Cyber Surcharge: <strong className="text-slate-200">${p.cyberSurcharge}</strong></span>
                          <span>Pilotage: <strong className="text-slate-200">${p.pilotage}</strong></span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Tariff Heatmap Inspection saved for ${p.port}!\nMetric: ${heatmapMetric}\nTotal Cost: $${totalTariff.toLocaleString()}`)}
                      className="w-full py-1.5 bg-slate-900 hover:bg-orange-500 hover:text-slate-950 text-orange-300 font-bold text-[10px] rounded-xl transition-all border border-slate-800 mt-2"
                    >
                      INSPECT PORT TARIFF DENSITY
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: REVENUE PROJECTION GRAPH */}
      {/* ========================================================================= */}
      {activeSubTab === 'revenue-projection-graph' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <LineChart className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Interactive Revenue Growth Projection Engine</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      12-36 MO FORECAST
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Simulate monthly recurring revenue (MRR) trajectories based on expansion sales, churn mitigation, and new vessel onboarding.
                  </p>
                </div>
              </div>

              {/* SCENARIO SELECTOR */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                {(['Conservative', 'Base Case', 'Hypergrowth'] as const).map((sc) => (
                  <button
                    key={sc}
                    onClick={() => setProjGrowthScenario(sc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      projGrowthScenario === sc ? 'bg-emerald-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTROLS & TIMELINE */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Expansion MRR Rate:</span>
                  <span className="text-emerald-400 font-black">+{projExpansionRate}% / yr</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={projExpansionRate}
                  onChange={(e) => setProjExpansionRate(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Logo Churn Rate:</span>
                  <span className="text-rose-400 font-black">{projChurnRate}% / mo</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={projChurnRate}
                  onChange={(e) => setProjChurnRate(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2">
                <span className="text-slate-400 font-bold text-xs">Forecast Horizon:</span>
                {([12, 24, 36] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setProjMonthsAhead(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      projMonthsAhead === m ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

            {/* VISUAL REVENUE PROJECTION CHART (SVG) */}
            {(() => {
              const baseMom = projGrowthScenario === 'Conservative' ? 1.05 : projGrowthScenario === 'Base Case' ? 1.12 : 1.22;
              const months = Array.from({ length: 12 }, (_, i) => i + 1);
              const initialMrr = 45000;
              const dataPoints = months.map(m => {
                const val = Math.round(initialMrr * Math.pow(baseMom, m - 1) * (1 + (projExpansionRate / 100) * (m / 12)) * (1 - (projChurnRate / 100) * m));
                return { month: `M${m}`, mrr: val };
              });
              const maxMrr = Math.max(...dataPoints.map(d => d.mrr));
              const endMrr = dataPoints[dataPoints.length - 1].mrr;
              const endArr = endMrr * 12;

              return (
                <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-5">
                  <div className="flex justify-between items-baseline border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">12-Month Projected End MRR</span>
                      <span className="text-2xl font-black text-emerald-400">${endMrr.toLocaleString()} / mo</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Projected Run-Rate ARR</span>
                      <span className="text-xl font-black text-white">${endArr.toLocaleString()} / yr</span>
                    </div>
                  </div>

                  {/* SVG BAR CHART */}
                  <div className="space-y-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">12-Month Growth Trajectory Chart</span>
                    <div className="h-44 w-full flex items-end justify-between gap-1 pt-4 pb-2 border-b border-slate-800 px-2">
                      {dataPoints.map((dp, idx) => {
                        const heightPct = Math.max(12, Math.round((dp.mrr / maxMrr) * 100));
                        return (
                          <div key={dp.month} className="flex-1 flex flex-col items-center gap-1 group relative">
                            {/* HOVER TOOLTIP */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-900 border border-emerald-500 text-emerald-300 font-bold text-[9px] px-2 py-0.5 rounded shadow-lg transition-all pointer-events-none whitespace-nowrap z-10">
                              ${dp.mrr.toLocaleString()}
                            </div>
                            <div
                              style={{ height: `${heightPct}%` }}
                              className={`w-full rounded-t-lg transition-all duration-300 ${
                                idx === dataPoints.length - 1 ? 'bg-emerald-400 shadow-md shadow-emerald-500/30' : 'bg-slate-800 group-hover:bg-emerald-500/70'
                              }`}
                            ></div>
                            <span className="text-[9px] text-slate-500 font-mono">{dp.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] uppercase block font-bold">Month 6 Forecast</span>
                      <span className="text-white font-bold text-sm">${dataPoints[5].mrr.toLocaleString()} / mo</span>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] uppercase block font-bold">CAC Recovery Point</span>
                      <span className="text-sky-400 font-bold text-sm">Month 3.2</span>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[10px] uppercase block font-bold">Profitability Break-Even</span>
                      <span className="text-emerald-400 font-bold text-sm">ACHIEVED ✓</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SMART REVENUE PROJECTION */}
      {/* ========================================================================= */}
      {activeSubTab === 'smart-revenue-projection' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/40 text-cyan-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Smart Machine Learning AI Revenue Forecast Engine</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                      PROBABILISTIC P10/P50/P90
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Monte Carlo probabilistic fleet ARR modeling, vessel expansion vectors, and AI-driven retention optimization.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSmartProjAiOptimization(!smartProjAiOptimization)}
                className={`px-4 py-2.5 font-bold rounded-xl transition-all shadow-md flex items-center space-x-1.5 shrink-0 ${
                  smartProjAiOptimization
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>AI RETENTION OPTIMIZER: {smartProjAiOptimization ? 'ENABLED ✓' : 'DISABLED'}</span>
              </button>
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Target Annual ARR:</span>
                  <span className="text-cyan-400 font-black">${smartProjTargetArr.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="5000000"
                  step="100000"
                  value={smartProjTargetArr}
                  onChange={(e) => setSmartProjTargetArr(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Active Fleet Vessels:</span>
                  <span className="text-sky-400 font-black">{smartProjVesselCount} Ships</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={smartProjVesselCount}
                  onChange={(e) => setSmartProjVesselCount(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Expansion ARR Rate:</span>
                  <span className="text-emerald-400 font-black">+{smartProjExpansionPct}% / yr</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={smartProjExpansionPct}
                  onChange={(e) => setSmartProjExpansionPct(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Gross Margin:</span>
                  <span className="text-purple-400 font-black">{smartProjGrossMarginPct}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="1"
                  value={smartProjGrossMarginPct}
                  onChange={(e) => setSmartProjGrossMarginPct(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>
            </div>

            {/* CONFIDENCE BAND CARDS */}
            {(() => {
              const aiBonus = smartProjAiOptimization ? 1.15 : 1.0;
              const baseArr = smartProjTargetArr * aiBonus;
              const p10Arr = Math.round(baseArr * 0.82);
              const p50Arr = Math.round(baseArr);
              const p90Arr = Math.round(baseArr * 1.34);
              const grossProfit = Math.round((p50Arr * smartProjGrossMarginPct) / 100);

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 space-y-2">
                      <span className="text-rose-400 text-[10px] uppercase font-black block">P10 Conservative Downside</span>
                      <span className="text-2xl font-black text-white">${p10Arr.toLocaleString()}</span>
                      <p className="text-slate-400 text-[10px]">Accounts for geopolitical shipping headwinds & bandwidth cost spikes.</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/50 space-y-2">
                      <span className="text-cyan-400 text-[10px] uppercase font-black block">P50 Expected Base Target</span>
                      <span className="text-2xl font-black text-cyan-300">${p50Arr.toLocaleString()}</span>
                      <p className="text-slate-400 text-[10px]">Net Gross Profit Generation: <strong className="text-emerald-400">${grossProfit.toLocaleString()}</strong></p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-2">
                      <span className="text-emerald-400 text-[10px] uppercase font-black block">P90 Aggressive Upside</span>
                      <span className="text-2xl font-black text-white">${p90Arr.toLocaleString()}</span>
                      <p className="text-slate-400 text-[10px]">Includes accelerated 5G maritime satellite cross-selling across fleet.</p>
                    </div>
                  </div>

                  {/* QUARTERLY MILESTONE TIMELINE */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      <span>4-Quarter Smart Revenue Milestone Forecast</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      {[
                        { q: 'Q1 2026', mrr: Math.round(p50Arr / 12 * 0.88), growth: '+12%', milestone: '3 New Enterprise Fleets Signed' },
                        { q: 'Q2 2026', mrr: Math.round(p50Arr / 12 * 0.96), growth: '+18%', milestone: 'Smart Tax & AI Shield Cross-Sell' },
                        { q: 'Q3 2026', mrr: Math.round(p50Arr / 12 * 1.05), growth: '+24%', milestone: 'APAC Hub Regional Expansion' },
                        { q: 'Q4 2026', mrr: Math.round(p50Arr / 12 * 1.15), growth: '+32%', milestone: 'Full Autonomous Retainer Target' }
                      ].map((item) => (
                        <div key={item.q} className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-cyan-400 font-bold text-xs">{item.q}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">{item.growth}</span>
                          </div>
                          <span className="text-lg font-black text-white block">${item.mrr.toLocaleString()} / mo</span>
                          <span className="text-[10px] text-slate-400 block border-t border-slate-800/60 pt-1.5">{item.milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: CURRENCY HEDGING GUIDE */}
      {/* ========================================================================= */}
      {activeSubTab === 'currency-hedging-guide' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/40 text-purple-400">
                  <Layers className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Maritime Forex & Currency Risk Hedging Playbook</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      RISK MITIGATION
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Protect international vessel contract revenues against currency exchange volatility using forwards, collars, and swaps.
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert(`Automated FX Hedging Strategy Executed!\nLocked $${hedgeExposureUsd.toLocaleString()} exposure under ${hedgeStrategy}.`)}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>EXECUTE HEDGING STRATEGY</span>
              </button>
            </div>

            {/* CONTROLS & STRATEGY SELECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                  <span>Unhedged FX Exposure & Parameters</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">International FX Exposure ($):</span>
                      <span className="text-purple-400 font-black">${hedgeExposureUsd.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="25000"
                      max="1000000"
                      step="25000"
                      value={hedgeExposureUsd}
                      onChange={(e) => setHedgeExposureUsd(Number(e.target.value))}
                      className="w-full accent-purple-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Estimated FX Volatility Drift (%):</span>
                      <span className="text-rose-400 font-black">{hedgeVolatilityRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="20.0"
                      step="0.5"
                      value={hedgeVolatilityRate}
                      onChange={(e) => setHedgeVolatilityRate(Number(e.target.value))}
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <label className="text-slate-300 font-bold text-xs block">Hedging Strategy Mechanism:</label>
                    <select
                      value={hedgeStrategy}
                      onChange={(e) => setHedgeStrategy(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="Forward Contract">Fixed Rate Forward Contract</option>
                      <option value="Options Collar">Zero-Cost Options Collar</option>
                      <option value="Cross-Currency Swap">Cross-Currency Interest Swap</option>
                    </select>
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <label className="text-slate-300 font-bold text-xs block">Contract Duration:</label>
                    <div className="flex gap-2 pt-1">
                      {([3, 6, 12] as const).map((dur) => (
                        <button
                          key={dur}
                          onClick={() => setHedgeDurationMonths(dur)}
                          className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                            hedgeDurationMonths === dur ? 'bg-purple-500 text-white font-black' : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          {dur} Months
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RISK SCENARIO DYNAMIC OUTPUT */}
              {(() => {
                const potentialUnhedgedLoss = Math.round(hedgeExposureUsd * (hedgeVolatilityRate / 100));
                const hedgingCost = hedgeStrategy === 'Options Collar' ? 0 : Math.round(hedgeExposureUsd * 0.008);
                const protectedFloor = hedgeExposureUsd - hedgingCost;

                return (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-purple-500/30 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-purple-400 uppercase flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-purple-400" />
                        <span>Hedging Protection Summary</span>
                      </h3>

                      <div className="space-y-3 pt-3">
                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Unhedged Risk Downside:</span>
                          <span className="text-rose-400 font-bold">-${potentialUnhedgedLoss.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Hedging Execution Fee:</span>
                          <span className="text-slate-300 font-bold">${hedgingCost.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Protected Revenue Floor:</span>
                          <span className="text-emerald-400 font-black text-lg">${protectedFloor.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline">
                          <span className="text-slate-400 text-xs">Risk Reduction Level:</span>
                          <span className="text-purple-300 font-bold">98.5% Capital Shield</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-[11px] text-purple-300 space-y-1">
                      <span className="font-bold block">✓ Strategy Insight:</span>
                      <span>{hedgeStrategy} locks your exchange rate for {hedgeDurationMonths} months, completely eliminating exposure to sudden market volatility.</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* STEP-BY-STEP HEDGING PLAYBOOK */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Maritime FX Hedging Execution Playbook</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { step: '01', name: 'Identify Foreign Revenue', desc: 'Audit non-USD vessel subscription contracts across EUR, GBP, SGD.' },
                  { step: '02', name: 'Select Lock Instrument', desc: 'Choose between fixed Forward Rate or Zero-Cost Options Collar.' },
                  { step: '03', name: 'Bind Clearing Agreement', desc: 'Connect platform wallet to institutional forex clearing desk.' },
                  { step: '04', name: 'Automate Settlement', desc: 'Auto-convert port revenues directly into treasury currency.' }
                ].map((st) => (
                  <div key={st.step} className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold font-mono">{st.step}</span>
                    <span className="text-white font-bold text-xs block pt-1">{st.name}</span>
                    <p className="text-slate-400 text-[10px]">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SMART FISCAL AI ADVISOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'smart-fiscal-ai-advisor' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <Lightbulb className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Smart Fiscal AI Advisor & Maritime Copilot</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      FISCAL AI ACTIVE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Autonomous financial planning copilot for tax minimization, OpEx optimization, and maritime capital allocation.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-slate-400 font-bold text-[11px]">Risk Profile:</span>
                {(['Conservative', 'Balanced', 'Aggressive'] as const).map((profile) => (
                  <button
                    key={profile}
                    onClick={() => setFiscalRiskTolerance(profile)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      fiscalRiskTolerance === profile
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>

            {/* INTERACTIVE INPUT SLIDERS & DIAGNOSTIC SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  <span>Fiscal Parameters & OpEx Target</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Annual Target OpEx Budget:</span>
                      <span className="text-amber-400 font-black">${fiscalOpExTarget.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="1500000"
                      step="25000"
                      value={fiscalOpExTarget}
                      onChange={(e) => setFiscalOpExTarget(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Target Tax Shield Percentage:</span>
                      <span className="text-emerald-400 font-black">{fiscalTaxShieldPct}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="35"
                      step="1"
                      value={fiscalTaxShieldPct}
                      onChange={(e) => setFiscalTaxShieldPct(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* AI QUERY PROMPT CONSOLE */}
                <div className="pt-2">
                  <span className="text-slate-400 font-bold text-xs block mb-1.5">Ask Fiscal AI Advisor:</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. How can we optimize satcom bandwidth write-offs in Q3?"
                      value={fiscalQueryText}
                      onChange={(e) => setFiscalQueryText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && fiscalQueryText.trim()) {
                          const query = fiscalQueryText.trim();
                          setFiscalAiAdviceList(prev => [
                            {
                              id: `f-${Date.now()}`,
                              topic: 'Custom Query Insight',
                              advice: `AI Recommendation for "${query}": Reallocate $${Math.round(fiscalOpExTarget * 0.12).toLocaleString()} to software R&D credits under Section 41.`,
                              savings: `$${Math.round(fiscalOpExTarget * 0.08).toLocaleString()}`,
                              status: 'Recommended'
                            },
                            ...prev
                          ]);
                          setFiscalQueryText('');
                        }
                      }}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => {
                        if (fiscalQueryText.trim()) {
                          const query = fiscalQueryText.trim();
                          setFiscalAiAdviceList(prev => [
                            {
                              id: `f-${Date.now()}`,
                              topic: 'Custom Query Insight',
                              advice: `AI Recommendation for "${query}": Reallocate $${Math.round(fiscalOpExTarget * 0.12).toLocaleString()} to software R&D credits under Section 41.`,
                              savings: `$${Math.round(fiscalOpExTarget * 0.08).toLocaleString()}`,
                              status: 'Recommended'
                            },
                            ...prev
                          ]);
                          setFiscalQueryText('');
                        }
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all shadow-md shrink-0 flex items-center space-x-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>ASK AI</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* DYNAMIC FISCAL DIAGNOSTICS */}
              {(() => {
                const calculatedSavings = Math.round(fiscalOpExTarget * (fiscalTaxShieldPct / 100));
                const efficiencyGain = fiscalRiskTolerance === 'Aggressive' ? '24.2%' : fiscalRiskTolerance === 'Balanced' ? '18.5%' : '12.0%';

                return (
                  <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-amber-400 uppercase flex items-center space-x-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>Fiscal Diagnostic Overview</span>
                      </h3>

                      <div className="space-y-3 pt-3">
                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Estimated Tax Shield Savings:</span>
                          <span className="text-emerald-400 font-black text-lg">${calculatedSavings.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">OpEx Capital Efficiency:</span>
                          <span className="text-amber-300 font-bold">{efficiencyGain} Improvement</span>
                        </div>

                        <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-xs">Liquidity Buffer Score:</span>
                          <span className="text-sky-400 font-bold">96 / 100 (Optimal)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 space-y-1">
                      <span className="font-bold block">✓ AI Fiscal Strategy Active:</span>
                      <span>Your {fiscalRiskTolerance.toLowerCase()} profile unlocks up to ${calculatedSavings.toLocaleString()} in tax write-offs across fleet software and satcom hardware.</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* AI FISCAL RECOMMENDATIONS LIST */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI-Generated Actionable Fiscal Recommendations</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {fiscalAiAdviceList.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-400 font-bold text-xs">{item.topic}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
                          {item.savings}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-2">{item.advice}</p>
                    </div>

                    <button
                      onClick={() => {
                        alert(`Strategy Applied: ${item.topic}\nQuarterly Savings Realized: ${item.savings}`);
                        setFiscalAiAdviceList(prev => prev.map(f => f.id === item.id ? { ...f, status: 'Applied ✓' } : f));
                      }}
                      className="w-full py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold text-[10px] rounded-xl transition-all border border-slate-800"
                    >
                      {item.status === 'Applied ✓' ? 'APPLIED ✓' : 'EXECUTE FISCAL STRATEGY'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: CUSTOMIZABLE REVENUE DASHBOARDS */}
      {/* ========================================================================= */}
      {activeSubTab === 'customizable-revenue-dashboards' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <Sliders className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Customizable Executive Revenue Dashboard Studio</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      MODULAR LAYOUT STUDIO
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Tailor widgets, select layout density, and customize primary metrics for board-level financial reporting.
                  </p>
                </div>
              </div>

              {/* CURRENCY & LAYOUT CONTROLS */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(['USD', 'EUR', 'GBP', 'SGD'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setDashPrimaryCurrency(curr)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        dashPrimaryCurrency === curr ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>

                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(['Executive Grid', 'Compact Matrix', 'Dense Analytics'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setDashLayoutMode(mode)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        dashLayoutMode === mode ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* WIDGET TOGGLES TOOLBAR */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold text-xs uppercase block">Toggle Active Dashboard Widgets:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'mrrChart', label: 'MRR & ARR Waterfall' },
                  { key: 'arrMetrics', label: 'Fleet ARPU Metrics' },
                  { key: 'churnBreakdown', label: 'Churn & Expansion' },
                  { key: 'regionalRevenue', label: 'Regional Contribution' },
                  { key: 'vesselTierPricing', label: 'Vessel Tier Matrix' },
                  { key: 'taxExemptions', label: 'Tax Offsets & Exemption' }
                ].map((w) => {
                  const isVisible = dashVisibleWidgets[w.key as keyof typeof dashVisibleWidgets];
                  return (
                    <button
                      key={w.key}
                      onClick={() => setDashVisibleWidgets(prev => ({ ...prev, [w.key]: !prev[w.key as keyof typeof dashVisibleWidgets] }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 ${
                        isVisible
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                          : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isVisible ? 'opacity-100' : 'opacity-20'}`} />
                      <span>{w.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DYNAMIC MODULAR DASHBOARD GRID */}
            <div className={`grid gap-4 ${
              dashLayoutMode === 'Compact Matrix' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
              dashLayoutMode === 'Dense Analytics' ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {/* CURRENCY SYMBOL MAPPING */}
              {(() => {
                const sym = dashPrimaryCurrency === 'EUR' ? '€' : dashPrimaryCurrency === 'GBP' ? '£' : dashPrimaryCurrency === 'SGD' ? 'S$' : '$';
                const rate = dashPrimaryCurrency === 'EUR' ? 0.92 : dashPrimaryCurrency === 'GBP' ? 0.79 : dashPrimaryCurrency === 'SGD' ? 1.34 : 1.0;

                return (
                  <>
                    {dashVisibleWidgets.mrrChart && (
                      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-white font-bold text-xs">MRR & ARR Waterfall</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">+18.4% YoY</span>
                          </div>
                          <div className="pt-3 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Monthly Recurring Revenue:</span>
                              <span className="text-emerald-400 font-black">{sym}{Math.round(45000 * rate).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Annual Run-Rate ARR:</span>
                              <span className="text-white font-black">{sym}{Math.round(540000 * rate).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[10px] text-slate-400">
                          Active ARR run rate is ahead of Q3 targets by 6.2%.
                        </div>
                      </div>
                    )}

                    {dashVisibleWidgets.arrMetrics && (
                      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-white font-bold text-xs">Fleet ARPU & Unit Economics</span>
                            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">HEALTHY</span>
                          </div>
                          <div className="pt-3 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Average Revenue Per Vessel:</span>
                              <span className="text-sky-400 font-black">{sym}{Math.round(1850 * rate).toLocaleString()} / mo</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Customer Lifetime Value (LTV):</span>
                              <span className="text-emerald-400 font-black">{sym}{Math.round(62000 * rate).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[10px] text-slate-400">
                          LTV/CAC ratio stands at 4.8x across container fleets.
                        </div>
                      </div>
                    )}

                    {dashVisibleWidgets.churnBreakdown && (
                      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-white font-bold text-xs">Net Expansion & Logo Retention</span>
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">118% NRR</span>
                          </div>
                          <div className="pt-3 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Gross Logo Churn Rate:</span>
                              <span className="text-rose-400 font-bold">0.6% / mo</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Fleet Expansion Rate:</span>
                              <span className="text-purple-400 font-bold">+2.2% / mo</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[10px] text-slate-400">
                          Expansion ARR offsets gross churn by 3.6x.
                        </div>
                      </div>
                    )}

                    {dashVisibleWidgets.regionalRevenue && (
                      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-white font-bold text-xs">Regional Revenue Allocation</span>
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">GLOBAL</span>
                          </div>
                          <div className="pt-3 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-300">
                              <span>Europe (EU MOSS):</span>
                              <span className="font-bold">{sym}{Math.round(220000 * rate).toLocaleString()} (41%)</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Asia-Pacific (APAC):</span>
                              <span className="font-bold">{sym}{Math.round(180000 * rate).toLocaleString()} (33%)</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[10px] text-slate-400">
                          APAC shows strongest quarter-over-quarter expansion (+28%).
                        </div>
                      </div>
                    )}

                    {dashVisibleWidgets.vesselTierPricing && (
                      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-white font-bold text-xs">Vessel Tier Matrix</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">TIERED</span>
                          </div>
                          <div className="pt-3 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-300">
                              <span>Autonomous AI Threat Shield:</span>
                              <span className="font-bold text-emerald-400">{sym}{Math.round(2400 * rate).toLocaleString()} / vessel</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>Standard AIS Monitor:</span>
                              <span className="font-bold text-slate-300">{sym}{Math.round(850 * rate).toLocaleString()} / vessel</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[10px] text-slate-400">
                          74% of clients are on Autonomous Threat Shield Tier.
                        </div>
                      </div>
                    )}

                    {dashVisibleWidgets.taxExemptions && (
                      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-white font-bold text-xs">Tax Offsets Realized</span>
                            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold">SAVINGS</span>
                          </div>
                          <div className="pt-3 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-300">
                              <span>R&D Section 41 Offsets:</span>
                              <span className="font-bold text-teal-300">{sym}{Math.round(38500 * rate).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span>High-Seas VAT Realization:</span>
                              <span className="font-bold text-emerald-400">{sym}{Math.round(22800 * rate).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[10px] text-slate-400">
                          Total tax burden reduced by 22.4% this fiscal period.
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: MULTI CURRENCY FORECAST ENGINE */}
      {/* ========================================================================= */}
      {activeSubTab === 'multi-currency-forecast-engine' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/20 rounded-2xl border border-sky-500/40 text-sky-400">
                  <Coins className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Multi-Currency Revenue & Cashflow Forecast Engine</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      FX FORECAST ENGINE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Simulate cross-border revenue conversion across USD, EUR, GBP, SGD, and JPY under varying forex volatility scenarios.
                  </p>
                </div>
              </div>

              {/* BASE CURRENCY SELECTOR */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                {(['USD', 'EUR', 'GBP', 'SGD', 'JPY'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setFxForecastBaseCurrency(curr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      fxForecastBaseCurrency === curr ? 'bg-sky-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTROLS */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Active FX Corridor:</label>
                <select
                  value={fxCorridor}
                  onChange={(e) => setFxCorridor(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="USD/EUR">USD / EUR (Eurozone Vessel Contracts)</option>
                  <option value="USD/GBP">USD / GBP (UK Maritime Operations)</option>
                  <option value="USD/SGD">USD / SGD (Singapore Port Hub)</option>
                  <option value="USD/JPY">USD / JPY (Japan Shipping Lines)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Macro Volatility Scenario:</label>
                <select
                  value={fxVolScenario}
                  onChange={(e) => setFxVolScenario(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="Standard Market">Standard Market (+2.5% Drift)</option>
                  <option value="Low Volatility">Low Volatility (+0.5% Drift)</option>
                  <option value="High Macro Drift (+18%)">High Macro Drift (+18.0% Volatility)</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Hedging Coverage Target:</span>
                  <span className="text-sky-400 font-black">{fxHedgeCoveragePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={fxHedgeCoveragePct}
                  onChange={(e) => setFxHedgeCoveragePct(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>
            </div>

            {/* LIVE EXCHANGE RATE MATRIX & CONVERSION FORECAST */}
            {(() => {
              const baseUsdArr = 540000;
              const rateMap = { EUR: 0.92, GBP: 0.79, SGD: 1.34, JPY: 154.2 };
              const targetRate = fxCorridor === 'USD/EUR' ? rateMap.EUR : fxCorridor === 'USD/GBP' ? rateMap.GBP : fxCorridor === 'USD/SGD' ? rateMap.SGD : rateMap.JPY;
              const targetSymbol = fxCorridor === 'USD/EUR' ? '€' : fxCorridor === 'USD/GBP' ? '£' : fxCorridor === 'USD/SGD' ? 'S$' : '¥';

              const convertedArr = Math.round(baseUsdArr * targetRate);
              const driftFactor = fxVolScenario === 'High Macro Drift (+18%)' ? 0.18 : fxVolScenario === 'Low Volatility' ? 0.005 : 0.025;
              const unhedgedRisk = Math.round(convertedArr * driftFactor * (1 - fxHedgeCoveragePct / 100));
              const protectedArr = convertedArr - unhedgedRisk;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/30 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Base ARR (USD Target)</span>
                      <span className="text-xl font-black text-white">${baseUsdArr.toLocaleString()}</span>
                      <span className="text-[10px] text-sky-400 font-bold block pt-1">Corridor Rate: 1 USD = {targetRate} {fxCorridor.split('/')[1]}</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/30 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Local Currency Forecast</span>
                      <span className="text-xl font-black text-sky-300">{targetSymbol}{convertedArr.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 block pt-1">Target currency yield under base market rates</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Hedged Net Floor ({fxHedgeCoveragePct}%)</span>
                      <span className="text-xl font-black text-emerald-400">{targetSymbol}{protectedArr.toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-300 font-bold block pt-1">Max FX Volatility Loss: -{targetSymbol}{unhedgedRisk.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 12-MONTH MULTI-CURRENCY CONVERSION TABLE */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                      <ArrowRightLeft className="w-4 h-4 text-sky-400" />
                      <span>12-Month Multi-Currency Cashflow Forecast Matrix</span>
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="py-2 px-3 font-bold">CURRENCY CORRIDOR</th>
                            <th className="py-2 px-3 font-bold">SPOT EXCHANGE RATE</th>
                            <th className="py-2 px-3 font-bold">ANNUAL REVENUE YIELD</th>
                            <th className="py-2 px-3 font-bold">HEDGED SHIELD FLOOR</th>
                            <th className="py-2 px-3 font-bold">RISK STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-300">
                          <tr className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-3 font-bold text-white">USD / EUR (Eurozone)</td>
                            <td className="py-2.5 px-3">0.92 EUR / USD</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-400">€496,800</td>
                            <td className="py-2.5 px-3 font-bold text-sky-300">€488,100</td>
                            <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">PROTECTED</span></td>
                          </tr>
                          <tr className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-3 font-bold text-white">USD / GBP (United Kingdom)</td>
                            <td className="py-2.5 px-3">0.79 GBP / USD</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-400">£426,600</td>
                            <td className="py-2.5 px-3 font-bold text-sky-300">£419,200</td>
                            <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">PROTECTED</span></td>
                          </tr>
                          <tr className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-3 font-bold text-white">USD / SGD (Singapore Hub)</td>
                            <td className="py-2.5 px-3">1.34 SGD / USD</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-400">S$723,600</td>
                            <td className="py-2.5 px-3 font-bold text-sky-300">S$711,000</td>
                            <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">PROTECTED</span></td>
                          </tr>
                          <tr className="hover:bg-slate-900/60">
                            <td className="py-2.5 px-3 font-bold text-white">USD / JPY (Japan Shipping)</td>
                            <td className="py-2.5 px-3">154.20 JPY / USD</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-400">¥83,268,000</td>
                            <td className="py-2.5 px-3 font-bold text-sky-300">¥81,819,000</td>
                            <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">MONITORING</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: AUTOMATED TARIFF ALERT */}
      {/* ========================================================================= */}
      {activeSubTab === 'automated-tariff-alert' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/40 text-rose-400">
                  <BellRing className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Automated Port Tariff Sentinel & Surcharge Alert Hub</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                      SENTINEL ACTIVE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Real-time automated alerting engine for port tariff hikes, cyber surcharges, pilotage fee shifts, and eco-levy changes.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const newAlert = {
                    id: `ta-${Date.now()}`,
                    port: 'Port of Hamburg',
                    code: 'DEHAM',
                    alertType: 'Cyber Security Tariff Hike',
                    oldVal: '$500',
                    newVal: '$1,650',
                    status: 'Active Alert',
                    timestamp: 'Just now'
                  };
                  setTariffAlertHistory(prev => [newAlert, ...prev]);
                  alert('Test Tariff Sentinel Trigger Executed!\nSimulated unexpected tariff surge at Port of Hamburg.');
                }}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <Zap className="w-4 h-4" />
                <span>TRIGGER SENTINEL TEST</span>
              </button>
            </div>

            {/* THRESHOLD & NOTIFICATION CHANNEL CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-rose-400" />
                  <span>Sentinel Trigger Sensitivity Parameters</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Alert Trigger Fee Threshold:</span>
                      <span className="text-rose-400 font-black">${tariffAlertThreshold.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="100"
                      value={tariffAlertThreshold}
                      onChange={(e) => setTariffAlertThreshold(Number(e.target.value))}
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <label className="text-slate-300 font-bold text-xs block">Harbor Region Watchlist:</label>
                    <select
                      value={tariffAlertRegion}
                      onChange={(e) => setTariffAlertRegion(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-rose-500"
                    >
                      <option value="All Harbors">All International Ports</option>
                      <option value="EU Harbors">EU Harbors (Rotterdam, Hamburg, Antwerp)</option>
                      <option value="APAC Ports">APAC Hubs (Singapore, Shanghai, Busan)</option>
                      <option value="Americas Coastal">Americas Coastal Ports (LA, Long Beach, Santos)</option>
                      <option value="Middle East Gulf">Middle East Gulf Ports (Jebel Ali, Ras Laffan)</option>
                    </select>
                  </div>
                </div>

                {/* NOTIFICATION CHANNEL TOGGLES */}
                <div className="pt-2">
                  <span className="text-slate-400 font-bold text-xs block mb-2">Automated Alert Delivery Channels:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'email', label: 'Email Digest' },
                      { key: 'sms', label: 'SMS Sentinel' },
                      { key: 'webhook', label: 'Fleet API Webhook' },
                      { key: 'inApp', label: 'In-App Popups' }
                    ].map((ch) => {
                      const isActive = tariffAlertChannels[ch.key as keyof typeof tariffAlertChannels];
                      return (
                        <button
                          key={ch.key}
                          onClick={() => setTariffAlertChannels(prev => ({ ...prev, [ch.key]: !prev[ch.key as keyof typeof tariffAlertChannels] }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 ${
                            isActive
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                              : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                          }`}
                        >
                          <Check className={`w-3.5 h-3.5 ${isActive ? 'opacity-100' : 'opacity-20'}`} />
                          <span>{ch.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SENTINEL STATUS CARD */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-rose-500/30 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-rose-400 uppercase flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Sentinel Watch Status</span>
                  </h3>

                  <div className="space-y-3 pt-3">
                    <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Monitored Global Ports:</span>
                      <span className="text-white font-bold">148 Commercial Hubs</span>
                    </div>

                    <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Trigger Threshold:</span>
                      <span className="text-rose-400 font-bold">&gt; ${tariffAlertThreshold.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs">Active Alerts Pending:</span>
                      <span className="text-amber-400 font-black text-lg">{tariffAlertHistory.filter(a => a.status === 'Active Alert').length} Alerts</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-[11px] text-rose-300 space-y-1">
                  <span className="font-bold block">✓ Sentinel Active:</span>
                  <span>Scans global port authority gazettes every 15 minutes for unexpected surcharge changes.</span>
                </div>
              </div>
            </div>

            {/* LIVE TARIFF ALERT FEED */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Bell className="w-4 h-4 text-rose-400" />
                <span>Live Port Tariff Alert Notifications</span>
              </h3>

              <div className="space-y-3">
                {tariffAlertHistory.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-xs">{item.port} ({item.code})</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          item.status === 'Active Alert' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-slate-500 text-[10px]">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-300 text-xs">
                        {item.alertType}: Tariff jumped from <strong className="text-slate-400">{item.oldVal}</strong> to <strong className="text-rose-400">{item.newVal}</strong>.
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setTariffAlertHistory(prev => prev.map(a => a.id === item.id ? { ...a, status: 'Acknowledged' } : a));
                          alert(`Alert Acknowledged for ${item.port}`);
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-[10px] rounded-xl border border-slate-800 transition-all"
                      >
                        ACKNOWLEDGE
                      </button>
                      <button
                        onClick={() => alert(`Reroute Calculation Triggered for ${item.port}!\nSelecting optimal lower-tariff harbor.`)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] rounded-xl transition-all shadow-sm"
                      >
                        REROUTE FLEET
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: REVENUE AI FORECAST */}
      {/* ========================================================================= */}
      {activeSubTab === 'revenue-ai-forecast' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <TrendingUp className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Machine Learning AI Revenue Forecast Engine</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      PROBABILISTIC AI FORECAST
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Predictive ARR modeling engine driven by vessel adoption curves, satellite upsell rates, and AI retention optimization.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-slate-400 font-bold text-xs">Confidence Band:</span>
                {(['P10', 'P50', 'P90'] as const).map((conf) => (
                  <button
                    key={conf}
                    onClick={() => setRevForecastConfidenceLevel(conf)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      revForecastConfidenceLevel === conf
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {conf}
                  </button>
                ))}
              </div>
            </div>

            {/* FORECAST PARAMETERS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Base ARR Target:</span>
                  <span className="text-emerald-400 font-black">${revForecastArrTarget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="3000000"
                  step="50000"
                  value={revForecastArrTarget}
                  onChange={(e) => setRevForecastArrTarget(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">YoY Fleet Growth Factor:</span>
                  <span className="text-sky-400 font-black">+{revForecastGrowthFactor}% / yr</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={revForecastGrowthFactor}
                  onChange={(e) => setRevForecastGrowthFactor(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-white font-bold text-xs block">AI Optimization Engine:</span>
                  <span className="text-slate-400 text-[10px]">Boost forecast with churn prevention models</span>
                </div>
                <button
                  onClick={() => setRevForecastAiOptimization(!revForecastAiOptimization)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    revForecastAiOptimization ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {revForecastAiOptimization ? 'ON ✓' : 'OFF'}
                </button>
              </div>
            </div>

            {/* DYNAMIC PROJECTION SUMMARY */}
            {(() => {
              const aiFactor = revForecastAiOptimization ? 1.12 : 1.0;
              const bandMultiplier = revForecastConfidenceLevel === 'P90' ? 1.28 : revForecastConfidenceLevel === 'P10' ? 0.82 : 1.0;
              const projectedArr = Math.round(revForecastArrTarget * (1 + revForecastGrowthFactor / 100) * aiFactor * bandMultiplier);
              const mrrYield = Math.round(projectedArr / 12);
              const satcomUpsell = Math.round(projectedArr * 0.24);

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-2">
                      <span className="text-emerald-400 text-[10px] uppercase font-bold block">12-Month Projected ARR</span>
                      <span className="text-2xl font-black text-white">${projectedArr.toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-300 font-bold block">Selected Band: {revForecastConfidenceLevel} Confidence</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/40 space-y-2">
                      <span className="text-sky-400 text-[10px] uppercase font-bold block">Monthly Recurring Run-Rate</span>
                      <span className="text-2xl font-black text-sky-300">${mrrYield.toLocaleString()} / mo</span>
                      <span className="text-[10px] text-slate-400 block">Net average MRR across active fleet contracts</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-2">
                      <span className="text-purple-400 text-[10px] uppercase font-bold block">Satcom & AI Shield Upsell</span>
                      <span className="text-2xl font-black text-purple-300">${satcomUpsell.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 block">High-margin add-on subscription yield</span>
                    </div>
                  </div>

                  {/* QUARTERLY AI FORECAST TRAJECTORY */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span>Quarterly AI Revenue Trajectory</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      {[
                        { q: 'Q1 Projected', arr: Math.round(projectedArr * 0.88), growth: '+14%' },
                        { q: 'Q2 Projected', arr: Math.round(projectedArr * 0.95), growth: '+19%' },
                        { q: 'Q3 Projected', arr: Math.round(projectedArr * 1.04), growth: '+26%' },
                        { q: 'Q4 Projected', arr: Math.round(projectedArr * 1.15), growth: '+34%' }
                      ].map((item) => (
                        <div key={item.q} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-slate-400 text-[10px] font-bold block">{item.q}</span>
                          <span className="text-base font-black text-white block">${item.arr.toLocaleString()}</span>
                          <span className="text-emerald-400 text-[9px] font-bold block">{item.growth} vs Prior Qtr</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: TARIFF OPTIMIZATION UI */}
      {/* ========================================================================= */}
      {activeSubTab === 'tariff-optimization-ui' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-500/20 rounded-2xl border border-orange-500/40 text-orange-400">
                  <Scale className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Harbor Tariff & Maritime Surcharge Optimization Studio</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-bold">
                      COST REDUCTION STUDIO
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Calculate eco-rebates, pilotage off-peak discounts, and green vessel incentives to minimize port entry expenses.
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert(`Tariff Optimization Plan Applied for ${tariffOptSelectedPort}!\nCalculated Savings Realized.`)}
                className="px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl transition-all shadow-md shrink-0 flex items-center space-x-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>APPLY OPTIMIZED ROUTE TARIFF</span>
              </button>
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Target Port Commercial Hub:</label>
                <select
                  value={tariffOptSelectedPort}
                  onChange={(e) => setTariffOptSelectedPort(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Port of Rotterdam (NLRTM)">Port of Rotterdam (NLRTM)</option>
                  <option value="Port of Singapore (SGSIN)">Port of Singapore (SGSIN)</option>
                  <option value="Port of Los Angeles (USLAX)">Port of Los Angeles (USLAX)</option>
                  <option value="Jebel Ali Port (AEJEA)">Jebel Ali Port (AEJEA)</option>
                  <option value="Shanghai Yangshan (CNSHA)">Shanghai Yangshan (CNSHA)</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Vessel Displacement:</span>
                  <span className="text-orange-400 font-black">{tariffOptVesselDisplacement.toLocaleString()} GRT</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={tariffOptVesselDisplacement}
                  onChange={(e) => setTariffOptVesselDisplacement(Number(e.target.value))}
                  className="w-full accent-orange-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setTariffOptEcoRebateActive(!tariffOptEcoRebateActive)}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    tariffOptEcoRebateActive ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  Eco Discount: {tariffOptEcoRebateActive ? 'ON ✓' : 'OFF'}
                </button>
                <button
                  onClick={() => setTariffOptOffpeakPilotage(!tariffOptOffpeakPilotage)}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    tariffOptOffpeakPilotage ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  Off-Peak Pilotage: {tariffOptOffpeakPilotage ? 'ON ✓' : 'OFF'}
                </button>
              </div>
            </div>

            {/* COST COMPARISON CARDS */}
            {(() => {
              const baseTariff = Math.round(tariffOptVesselDisplacement * 0.22);
              const ecoRebate = tariffOptEcoRebateActive ? Math.round(baseTariff * 0.15) : 0;
              const pilotageSavings = tariffOptOffpeakPilotage ? 1200 : 0;
              const netTariff = baseTariff - ecoRebate - pilotageSavings;
              const totalSavings = ecoRebate + pilotageSavings;

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Standard Unoptimized Tariff</span>
                    <span className="text-xl font-black text-rose-400">${baseTariff.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 block">Peak arrival fees & standard pilotage</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Optimized Net Harbor Cost</span>
                    <span className="text-xl font-black text-emerald-300">${netTariff.toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-400 font-bold block">Net Tariff Discount: {Math.round((totalSavings / baseTariff) * 100)}%</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-orange-500/40 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Realized Cost Reduction</span>
                    <span className="text-xl font-black text-orange-400">${totalSavings.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block">Rebates & pilotage scheduling savings</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: FISCAL HEALTH SCORE */}
      {/* ========================================================================= */}
      {activeSubTab === 'fiscal-health-score' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Maritime Enterprise Fiscal Health Index</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      RATING: EXCELLENT
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Comprehensive fiscal health evaluation combining working capital ratio, tax compliance score, and debt service coverage.
                  </p>
                </div>
              </div>

              {/* FISCAL SCORE GAUGE DISPLAY */}
              {(() => {
                const calculatedScore = Math.min(100, Math.round(
                  (fiscalHealthCapitalReserve / 1000000) * 20 +
                  (2.0 - fiscalHealthDebtRatio) * 25 +
                  (fiscalHealthTaxComplianceScore * 0.3) +
                  (fiscalHealthFxHedgeScore * 0.25)
                ));

                return (
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-500/40 flex items-center space-x-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Overall Fiscal Index</span>
                      <span className="text-2xl font-black text-amber-300">{calculatedScore} / 100</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-xs">
                      {calculatedScore >= 90 ? 'A+' : calculatedScore >= 80 ? 'A' : 'B'}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Working Capital Reserve:</span>
                  <span className="text-amber-400 font-black">${fiscalHealthCapitalReserve.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="2000000"
                  step="50000"
                  value={fiscalHealthCapitalReserve}
                  onChange={(e) => setFiscalHealthCapitalReserve(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Debt Service Coverage:</span>
                  <span className="text-sky-400 font-black">{fiscalHealthDebtRatio}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="3.0"
                  step="0.1"
                  value={fiscalHealthDebtRatio}
                  onChange={(e) => setFiscalHealthDebtRatio(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Tax Compliance Score:</span>
                  <span className="text-emerald-400 font-black">{fiscalHealthTaxComplianceScore} / 100</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  step="1"
                  value={fiscalHealthTaxComplianceScore}
                  onChange={(e) => setFiscalHealthTaxComplianceScore(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">FX Hedge Score:</span>
                  <span className="text-purple-400 font-black">{fiscalHealthFxHedgeScore} / 100</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={fiscalHealthFxHedgeScore}
                  onChange={(e) => setFiscalHealthFxHedgeScore(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>
            </div>

            {/* HEALTH SCORE MATRIX BREAKDOWN */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] font-bold block">SOLVENCY BUFFER</span>
                <span className="text-base font-black text-white block">${fiscalHealthCapitalReserve.toLocaleString()}</span>
                <span className="text-emerald-400 text-[9px] font-bold block">✓ 14.2 Months Runway</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] font-bold block">DEBT COVERAGE RATIO</span>
                <span className="text-base font-black text-white block">{fiscalHealthDebtRatio}x DSCR</span>
                <span className="text-sky-300 text-[9px] font-bold block">✓ Low Financial Leverage</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] font-bold block">TAX AUDIT READY</span>
                <span className="text-base font-black text-white block">{fiscalHealthTaxComplianceScore}% Grade</span>
                <span className="text-emerald-400 text-[9px] font-bold block">✓ Section 41 Validated</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] font-bold block">FOREX PROTECTION</span>
                <span className="text-base font-black text-white block">{fiscalHealthFxHedgeScore}% Covered</span>
                <span className="text-purple-300 text-[9px] font-bold block">✓ 4 FX Corridors Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: MULTI CURRENCY ALERT */}
      {/* ========================================================================= */}
      {activeSubTab === 'multi-currency-alert' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/20 rounded-2xl border border-sky-500/40 text-sky-400">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Multi-Currency Forex Volatility Alert Sentinel</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      FX SENTINEL ACTIVE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Automated real-time alert trigger for cross-border currency rate shifts and foreign revenue conversion losses.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const newAlert = {
                    id: `mca-${Date.now()}`,
                    corridor: multiCurrencySelectedCorridor,
                    volatilityPct: `+${(multiCurrencyAlertThresholdPct + 1.2).toFixed(1)}%`,
                    impact: `-$${Math.round(multiCurrencyAlertThresholdPct * 4500).toLocaleString()}`,
                    status: 'Active Alert',
                    timestamp: 'Just now'
                  };
                  setMultiCurrencyAlertLog(prev => [newAlert, ...prev]);
                  alert(`FX Sentinel Test Triggered for ${multiCurrencySelectedCorridor}!\nVolatility shift exceeded ${multiCurrencyAlertThresholdPct}%.`);
                }}
                className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl transition-all shadow-md shrink-0 flex items-center space-x-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>TRIGGER FX ALERT TEST</span>
              </button>
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">FX Volatility Sensitivity Threshold:</span>
                  <span className="text-sky-400 font-black">+{multiCurrencyAlertThresholdPct}% Shift</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={multiCurrencyAlertThresholdPct}
                  onChange={(e) => setMultiCurrencyAlertThresholdPct(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Watch Corridor:</label>
                <select
                  value={multiCurrencySelectedCorridor}
                  onChange={(e) => setMultiCurrencySelectedCorridor(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="USD/EUR">USD / EUR Corridor (Eurozone Fleet)</option>
                  <option value="USD/GBP">USD / GBP Corridor (UK Maritime)</option>
                  <option value="USD/SGD">USD / SGD Corridor (Singapore Hub)</option>
                  <option value="USD/JPY">USD / JPY Corridor (Japan Shipping)</option>
                </select>
              </div>
            </div>

            {/* FX ALERT HISTORY FEED */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Bell className="w-4 h-4 text-sky-400" />
                <span>Live Multi-Currency Volatility Alert Notifications</span>
              </h3>

              <div className="space-y-3">
                {multiCurrencyAlertLog.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-xs">{item.corridor}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          item.status === 'Active Alert' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-slate-500 text-[10px]">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-300 text-xs">
                        Exchange rate drift of <strong className="text-sky-300">{item.volatilityPct}</strong> detected. Projected net revenue impact: <strong className="text-rose-400">{item.impact}</strong>.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setMultiCurrencyAlertLog(prev => prev.map(m => m.id === item.id ? { ...m, status: 'Hedge Executed' } : m));
                        alert(`Forward Lock Hedge Contract Executed for ${item.corridor}!`);
                      }}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-slate-950 font-bold text-[10px] rounded-xl transition-all shadow-sm shrink-0"
                    >
                      EXECUTE FORWARD LOCK
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SMART TARIFF VISUALIZER */}
      {/* ========================================================================= */}
      {activeSubTab === 'smart-tariff-visualizer' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/40 text-cyan-400">
                  <BarChart2 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Smart Tariff & Maritime Levy Visualizer</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                      REAL-TIME TARIFF SIMULATOR
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Visual breakdown of port entry duties, environmental surcharges, and HS-code specific cross-border tax loads.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => alert(`Exported Smart Tariff Estimation Report for Route: ${smartTariffSelectedTradeRoute}`)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT TARIFF REPORT</span>
                </button>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Trade Corridor Route:</label>
                <select
                  value={smartTariffSelectedTradeRoute}
                  onChange={(e) => setSmartTariffSelectedTradeRoute(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="Asia-Europe">Asia - Europe Corridor (Shanghai to Rotterdam)</option>
                  <option value="Transpacific">Transpacific Corridor (Ningbo to Los Angeles)</option>
                  <option value="Transatlantic">Transatlantic Corridor (Hamburg to New York)</option>
                  <option value="Intra-APAC">Intra-APAC Corridor (Singapore to Tokyo)</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Shipment Container Volume:</span>
                  <span className="text-cyan-400 font-black">{smartTariffContainerVolume} TEU</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={smartTariffContainerVolume}
                  onChange={(e) => setSmartTariffContainerVolume(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-white font-bold text-xs block">Compare Eco Levy Discounts:</span>
                  <span className="text-slate-400 text-[10px]">Include EU-ETS & IMO Green vessel rebates</span>
                </div>
                <button
                  onClick={() => setSmartTariffCompareEcoLevy(!smartTariffCompareEcoLevy)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    smartTariffCompareEcoLevy ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {smartTariffCompareEcoLevy ? 'ACTIVE ✓' : 'OFF'}
                </button>
              </div>
            </div>

            {/* DYNAMIC CALCULATED TARIFF METRICS */}
            {(() => {
              const baseDutyPerTeu = smartTariffSelectedTradeRoute === 'Asia-Europe' ? 380 : smartTariffSelectedTradeRoute === 'Transpacific' ? 420 : 310;
              const ecoLevyPerTeu = smartTariffCompareEcoLevy ? 45 : 120;
              const TotalBaseDuty = smartTariffContainerVolume * baseDutyPerTeu;
              const TotalEcoLevy = smartTariffContainerVolume * ecoLevyPerTeu;
              const NetEstimatedTariff = TotalBaseDuty + TotalEcoLevy;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/40 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Base Customs Duty</span>
                      <span className="text-xl font-black text-cyan-300">${TotalBaseDuty.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 block">${baseDutyPerTeu} / TEU average rate</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Decarbonization / Eco Surcharge</span>
                      <span className="text-xl font-black text-emerald-300">${TotalEcoLevy.toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        {smartTariffCompareEcoLevy ? '✓ IMO Green Vessel Rebate Applied (-$75/TEU)' : 'Standard Carbon Surcharge Rate'}
                      </span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Projected Port Tariff</span>
                      <span className="text-xl font-black text-purple-300">${NetEstimatedTariff.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 block">Net estimated port entry & clearance duty</span>
                    </div>
                  </div>

                  {/* VISUAL TARIFF BAR GRAPH REPRESENTATION */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                      <PieChart className="w-4 h-4 text-cyan-400" />
                      <span>Tariff Cost Ratio Distribution</span>
                    </h3>

                    <div className="w-full bg-slate-900 h-6 rounded-full overflow-hidden flex border border-slate-800">
                      <div
                        style={{ width: `${Math.round((TotalBaseDuty / NetEstimatedTariff) * 100)}%` }}
                        className="bg-cyan-500 h-full flex items-center justify-center text-[9px] font-black text-slate-950"
                      >
                        Customs Duty ({Math.round((TotalBaseDuty / NetEstimatedTariff) * 100)}%)
                      </div>
                      <div
                        style={{ width: `${Math.round((TotalEcoLevy / NetEstimatedTariff) * 100)}%` }}
                        className="bg-emerald-500 h-full flex items-center justify-center text-[9px] font-black text-slate-950"
                      >
                        Eco Surcharge ({Math.round((TotalEcoLevy / NetEstimatedTariff) * 100)}%)
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: REVENUE PROJECTION AI */}
      {/* ========================================================================= */}
      {activeSubTab === 'revenue-projection-ai' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">AI Revenue Projection & Forecast Matrix</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      PROBABILISTIC AI FORECASTING
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Machine learning model forecasting recurring subscription yields, satcom module expansions, and enterprise retention rates.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {(['Optimistic (+28%)', 'Baseline (+18%)', 'Macro Stress Test (-5%)'] as const).map((scen) => (
                  <button
                    key={scen}
                    onClick={() => setRevProjAiScenario(scen)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all text-[10px] ${
                      revProjAiScenario === scen
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {scen}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Forecast Time Horizon:</label>
                <div className="flex gap-2">
                  {([6, 12, 24, 36] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setRevProjAiHorizonMonths(m)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        revProjAiHorizonMonths === m ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Account Expansion Rate:</span>
                  <span className="text-emerald-400 font-black">+{revProjAiExpansionRate}% / yr</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={revProjAiExpansionRate}
                  onChange={(e) => setRevProjAiExpansionRate(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-white font-bold text-xs block">AI Churn Prevention:</span>
                  <span className="text-slate-400 text-[10px]">Auto-renegotiate expiring fleet licenses</span>
                </div>
                <button
                  onClick={() => setRevProjAiChurnMitigation(!revProjAiChurnMitigation)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    revProjAiChurnMitigation ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {revProjAiChurnMitigation ? 'ON ✓' : 'OFF'}
                </button>
              </div>
            </div>

            {/* DYNAMIC PROJECTION RESULTS */}
            {(() => {
              const baseArr = 520000;
              const scenarioMult = revProjAiScenario.includes('+28%') ? 1.28 : revProjAiScenario.includes('-5%') ? 0.95 : 1.18;
              const churnMult = revProjAiChurnMitigation ? 1.08 : 1.0;
              const projectedArr = Math.round(baseArr * Math.pow(1 + (revProjAiExpansionRate / 100) * (revProjAiHorizonMonths / 12), 1.1) * scenarioMult * churnMult);
              const projectedMrr = Math.round(projectedArr / 12);

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Projected ARR ({revProjAiHorizonMonths} Mo)</span>
                    <span className="text-2xl font-black text-white">${projectedArr.toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-400 font-bold block">Scenario: {revProjAiScenario}</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/40 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Projected MRR Run Rate</span>
                    <span className="text-2xl font-black text-sky-300">${projectedMrr.toLocaleString()} / mo</span>
                    <span className="text-[10px] text-slate-400 block">Net average monthly recurring revenue</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Gross Margin</span>
                    <span className="text-2xl font-black text-purple-300">84.5%</span>
                    <span className="text-[10px] text-slate-400 block">High-margin software & API subscriptions</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: FISCAL HEALTH SCORECARD */}
      {/* ========================================================================= */}
      {activeSubTab === 'fiscal-health-scorecard' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Executive Fiscal Health & Compliance Scorecard</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      SCORECARD GRADE: AAA
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Comprehensive solvency, liquidity, tax readiness, and hedging performance assessment scorecard.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-amber-500/40 flex items-center space-x-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Overall Fiscal Rating</span>
                  <span className="text-2xl font-black text-amber-300">93 / 100</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-xs">
                  AAA
                </div>
              </div>
            </div>

            {/* SCORECARD GAUGES */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-bold text-xs">Liquidity Ratio</span>
                  <span className="text-emerald-400 font-black text-sm">{fiscalScorecardLiquidity}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${fiscalScorecardLiquidity}%` }} className="bg-emerald-400 h-full rounded-full" />
                </div>
                <span className="text-[10px] text-slate-400 block">Current ratio & cash reserves</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-bold text-xs">Solvency Buffer</span>
                  <span className="text-sky-400 font-black text-sm">{fiscalScorecardSolvency}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${fiscalScorecardSolvency}%` }} className="bg-sky-400 h-full rounded-full" />
                </div>
                <span className="text-[10px] text-slate-400 block">Debt-to-equity resilience</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-bold text-xs">Tax Compliance</span>
                  <span className="text-amber-400 font-black text-sm">{fiscalScorecardTaxCompliance}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${fiscalScorecardTaxCompliance}%` }} className="bg-amber-400 h-full rounded-full" />
                </div>
                <span className="text-[10px] text-slate-400 block">Cross-border audit readiness</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-bold text-xs">FX Hedging</span>
                  <span className="text-purple-400 font-black text-sm">{fiscalScorecardFxHedging}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${fiscalScorecardFxHedging}%` }} className="bg-purple-400 h-full rounded-full" />
                </div>
                <span className="text-[10px] text-slate-400 block">Forward contract protection</span>
              </div>
            </div>

            {/* AUDIT CHECKLIST */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Executive Fiscal Audit Readiness Checklist</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: 'Section 41 R&D Maritime Tax Credits Validated', status: 'Passed ✓', color: 'text-emerald-400' },
                  { label: 'IMO 2030 Decarbonization Tariff Exemptions Verified', status: 'Passed ✓', color: 'text-emerald-400' },
                  { label: 'Cross-Border VAT / GST Corridor Lock Active', status: 'Passed ✓', color: 'text-emerald-400' },
                  { label: 'Currency Volatility Emergency Reserve Shielded', status: 'Active Shield ✓', color: 'text-sky-400' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300 text-xs font-bold">{item.label}</span>
                    <span className={`text-xs font-black ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: EXPORTERS & IMPORTERS GOODS STOCKHOLDERS DETAILED INFO */}
      {/* ========================================================================= */}
      {activeSubTab === 'goods-stock-holders-info' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/40 text-purple-400">
                  <Box className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Exporters & Importers Goods Stockholders Directory</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      GLOBAL BONDED WAREHOUSE LOG
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Comprehensive inventory holdings, bonded warehouse codes, TEU capacities, and security clearance for major international traders.
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert('Exporting Stockholders Registry CSV Manifest...')}
                className="px-4 py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl transition-all shadow-md shrink-0 flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT MANIFEST CSV</span>
              </button>
            </div>

            {/* SEARCH & FILTERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Search Stockholder or Bonded Code:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={stockHolderSearchQuery}
                    onChange={(e) => setStockHolderSearchQuery(e.target.value)}
                    placeholder="Search company, TEU volume, or warehouse code..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-3 pr-3 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Stockholder Entity Category:</label>
                <div className="flex gap-2">
                  {(['All', 'Exporters', 'Importers', 'Warehouses'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setStockHolderTypeFilter(cat)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        stockHolderTypeFilter === cat
                          ? 'bg-purple-500 text-slate-950 font-black'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DIRECTORY LIST */}
            <div className="space-y-4">
              {stockHoldersList
                .filter(sh => stockHolderTypeFilter === 'All' || sh.type === stockHolderTypeFilter)
                .filter(sh =>
                  stockHolderSearchQuery === '' ||
                  sh.name.toLowerCase().includes(stockHolderSearchQuery.toLowerCase()) ||
                  sh.goodsCategory.toLowerCase().includes(stockHolderSearchQuery.toLowerCase()) ||
                  sh.bondedWarehouseCode.toLowerCase().includes(stockHolderSearchQuery.toLowerCase())
                )
                .map((sh) => (
                  <div key={sh.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 hover:border-purple-500/50 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-bold text-white">{sh.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            sh.type === 'Exporters' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                            sh.type === 'Importers' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {sh.type}
                          </span>
                          <span className="text-slate-500 text-[10px] font-bold">{sh.region}</span>
                        </div>
                        <p className="text-slate-400 text-xs mt-1">
                          Goods Category: <strong className="text-purple-300">{sh.goodsCategory}</strong>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => alert(`Requested Physical Stock Audit for ${sh.name} (${sh.bondedWarehouseCode})`)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-[10px] font-bold transition-all"
                        >
                          REQUEST AUDIT
                        </button>
                        <button
                          onClick={() => alert(`Inquiring Bonded Manifest details for ${sh.contactEmail}`)}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-slate-950 font-black rounded-xl text-[10px] transition-all shadow-sm"
                        >
                          CONTACT STOCKHOLDER
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] font-bold block">INVENTORY VALUE</span>
                        <span className="text-emerald-400 font-black text-sm">{sh.inventoryValueUsd}</span>
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] font-bold block">TEU HOLDING CAPACITY</span>
                        <span className="text-purple-300 font-black text-sm">{sh.teuCapacity}</span>
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] font-bold block">BONDED WAREHOUSE CODE</span>
                        <span className="text-sky-300 font-black text-sm">{sh.bondedWarehouseCode}</span>
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] font-bold block">SECURITY CLEARANCE</span>
                        <span className="text-amber-300 font-black text-sm">{sh.securityClearance}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: EXPORT STOCK TRACKER */}
      {/* ========================================================================= */}
      {activeSubTab === 'export-stock-tracker' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <BarChart3 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Global Maritime Export Stock & Cargo Inventory Tracker</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      LIVE BONDED STOCK MONITOR
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Track exported commodities, bonded harbor warehouse reserves, temperature-sensitive cargo, and port clearance readiness.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    const cargoId = `CRG-${Math.floor(1000 + Math.random() * 9000)}-EX`;
                    const newItem = {
                      id: `est-${Date.now()}`,
                      cargoId,
                      commodity: 'High-Value Industrial Equipment & Electronics',
                      exporter: 'Global Sea Freight Enterprise',
                      originPort: 'Singapore (SGSIN)',
                      destPort: 'Los Angeles (USLAX)',
                      stockQty: '850 Units',
                      teuVolume: '36 TEU',
                      bondedWarehouse: 'SGSIN Terminal 2 Bonded',
                      valuationUsd: '$5,200,000',
                      customsStatus: 'Cleared for Export',
                      temperatureControlled: true,
                      riskLevel: 'Low'
                    };
                    setExportStockItems(prev => [newItem, ...prev]);
                    alert(`New Export Cargo Stock Logged: ${cargoId}!`);
                  }}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>LOG NEW EXPORT STOCK</span>
                </button>
              </div>
            </div>

            {/* CONTROLS & SEARCH */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Search Cargo SKU / Commodity / Exporter:</label>
                <input
                  type="text"
                  value={exportStockSearchQuery}
                  onChange={(e) => setExportStockSearchQuery(e.target.value)}
                  placeholder="Search cargo ID, commodity, or exporter..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-3 pr-3 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Filter Origin Harbor:</label>
                <div className="flex gap-2">
                  {(['All Harbors', 'Rotterdam', 'Singapore', 'Los Angeles', 'Yokohama'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setExportStockPortFilter(p)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        exportStockPortFilter === p
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STOCK SUMMARY METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Stock Valuation</span>
                <span className="text-xl font-black text-emerald-300">$42,850,000</span>
                <span className="text-[10px] text-slate-400 block">3 Active Export Manifests</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Container TEU Volume</span>
                <span className="text-xl font-black text-sky-300">155 TEU</span>
                <span className="text-[10px] text-slate-400 block">82% Temp-controlled storage</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Customs Audit Compliance</span>
                <span className="text-xl font-black text-purple-300">100% Passed</span>
                <span className="text-[10px] text-emerald-400 font-bold block">✓ Zero Clearance Delays</span>
              </div>
            </div>

            {/* EXPORT STOCK ITEMS FEED */}
            <div className="space-y-3">
              {exportStockItems
                .filter(item => exportStockPortFilter === 'All Harbors' || item.originPort.includes(exportStockPortFilter))
                .filter(item =>
                  exportStockSearchQuery === '' ||
                  item.cargoId.toLowerCase().includes(exportStockSearchQuery.toLowerCase()) ||
                  item.commodity.toLowerCase().includes(exportStockSearchQuery.toLowerCase()) ||
                  item.exporter.toLowerCase().includes(exportStockSearchQuery.toLowerCase())
                )
                .map((item) => (
                  <div key={item.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-400 font-bold text-xs">{item.cargoId}</span>
                        <span className="text-white font-black text-xs">{item.commodity}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          item.customsStatus === 'Cleared for Export' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {item.customsStatus}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-slate-400 text-[10px]">Valuation: <strong className="text-white">{item.valuationUsd}</strong></span>
                        <button
                          onClick={() => alert(`Initiated Customs Re-Inspection for Cargo ID ${item.cargoId}`)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-[10px] font-bold"
                        >
                          AUDIT CARGO
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">Exporter Entity</span>
                        <span className="text-slate-200 font-bold">{item.exporter}</span>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">Corridor Route</span>
                        <span className="text-sky-300 font-bold">{item.originPort} → {item.destPort}</span>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">Volume / Storage</span>
                        <span className="text-purple-300 font-bold">{item.stockQty} ({item.teuVolume})</span>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">Bonded Location</span>
                        <span className="text-amber-300 font-bold">{item.bondedWarehouse}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: EXPORTER & IMPORTER GOODS INSURANCE APPLICATION PORTAL */}
      {/* ========================================================================= */}
      {activeSubTab === 'goods-insurance-portal' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/20 rounded-2xl border border-sky-500/40 text-sky-400">
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Exporter & Importer Marine Cargo Insurance Application Portal</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      INSTANT POLICY UNDERWRITING
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Apply for cross-border transit insurance, calculate marine risk premiums, and issue instant certificates of coverage.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-sky-500/40 flex items-center space-x-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Underwriting Risk Score</span>
                  <span className="text-2xl font-black text-sky-300">LOW RISK (A+)</span>
                </div>
              </div>
            </div>

            {/* APPLICATION CALCULATOR FORM */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span>New Cargo Coverage Application Form</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Applicant Role Category:</label>
                  <div className="flex gap-2">
                    {(['Exporter', 'Importer', 'Freight Forwarder'] as const).map((role) => (
                      <button
                        key={role}
                        onClick={() => setInsuranceApplicantType(role)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          insuranceApplicantType === role ? 'bg-sky-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Coverage Type Clause:</label>
                  <select
                    value={insuranceCoverageType}
                    onChange={(e) => setInsuranceCoverageType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-sky-500"
                  >
                    <option value="All-Risks Marine Hull & Cargo">All-Risks Marine Hull & Cargo</option>
                    <option value="Institute Cargo Clauses (A)">Institute Cargo Clauses (A) Full Cover</option>
                    <option value="War & Piracy Risk Surcharge">War & Piracy Risk Surcharge Protection</option>
                    <option value="Temperature Control Breakdown">Temperature Control & Perishable Breakdown</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Corridor Risk Rating:</label>
                  <select
                    value={insuranceRouteRiskLevel}
                    onChange={(e) => setInsuranceRouteRiskLevel(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-sky-500"
                  >
                    <option value="Low Risk (Standard Corridor)">Low Risk (Standard Corridor)</option>
                    <option value="Medium Risk (Monsoon Zone)">Medium Risk (Monsoon Zone)</option>
                    <option value="High Risk (Strait Sentinel Guidance)">High Risk (Strait Sentinel Guidance)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-bold">Declared Cargo Valuation:</span>
                    <span className="text-sky-400 font-black">${insuranceCargoValueUsd.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={insuranceCargoValueUsd}
                    onChange={(e) => setInsuranceCargoValueUsd(Number(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-bold">Deductible Limit Choice:</span>
                    <span className="text-emerald-400 font-black">${insuranceDeductibleOption.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="25000"
                    step="1000"
                    value={insuranceDeductibleOption}
                    onChange={(e) => setInsuranceDeductibleOption(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* ESTIMATED PREMIUM SUMMARY & SUBMIT */}
              {(() => {
                const rate = insuranceRouteRiskLevel.includes('High') ? 0.0065 : insuranceRouteRiskLevel.includes('Medium') ? 0.0042 : 0.0028;
                const basePremium = Math.round(insuranceCargoValueUsd * rate);
                const deductibleDiscount = Math.round(insuranceDeductibleOption * 0.1);
                const finalAnnualPremium = Math.max(350, basePremium - deductibleDiscount);

                return (
                  <div className="p-4 bg-slate-900 rounded-xl border border-sky-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Calculated Instant Policy Premium</span>
                      <span className="text-2xl font-black text-white">${finalAnnualPremium.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ voyage policy</span></span>
                      <span className="text-[10px] text-emerald-400 block font-bold">✓ Instant Maritime Certificate Generation Ready</span>
                    </div>

                    <button
                      onClick={() => {
                        const policyId = `POL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                        const newApp = {
                          policyId,
                          applicantName: `Enterprise Cargo Hub (${insuranceApplicantType})`,
                          type: insuranceApplicantType,
                          coverage: insuranceCoverageType,
                          declaredValue: `$${insuranceCargoValueUsd.toLocaleString()}`,
                          annualPremium: `$${finalAnnualPremium.toLocaleString()}`,
                          deductible: `$${insuranceDeductibleOption.toLocaleString()}`,
                          status: 'Approved & Active',
                          timestamp: 'Just now'
                        };
                        setInsuranceApplicationsLog(prev => [newApp, ...prev]);
                        alert(`Insurance Policy Application Submitted & Approved!\nPolicy Number: ${policyId}\nAnnual Premium: $${finalAnnualPremium.toLocaleString()}`);
                      }}
                      className="px-5 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl transition-all shadow-md shrink-0 flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>SUBMIT & BIND INSURANCE POLICY</span>
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* ACTIVE POLICY APPLICATIONS LOG */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Submitted Cargo Insurance Applications & Certificates</span>
              </h3>

              <div className="space-y-3">
                {insuranceApplicationsLog.map((pol) => (
                  <div key={pol.policyId} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sky-400 font-bold text-xs">{pol.policyId}</span>
                        <span className="text-white font-bold text-xs">{pol.applicantName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          pol.status === 'Approved & Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {pol.status}
                        </span>
                        <span className="text-slate-500 text-[10px]">{pol.timestamp}</span>
                      </div>

                      <p className="text-slate-300 text-xs">
                        Coverage: <strong className="text-purple-300">{pol.coverage}</strong> | Declared Value: <strong className="text-white">{pol.declaredValue}</strong> | Deductible: <strong className="text-emerald-400">{pol.deductible}</strong>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-sky-300 font-black text-sm">{pol.annualPremium}</span>
                      <button
                        onClick={() => alert(`Downloading Certificate of Coverage PDF for Policy ${pol.policyId}`)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded-lg border border-slate-700 transition-all flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>CERTIFICATE PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: INSURANCE DASHBOARD */}
      {/* ========================================================================= */}
      {activeSubTab === 'insurance-dashboard' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Executive Marine Insurance Operations Dashboard</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      PORTFOLIO GRADE: AAA
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Real-time marine insurance coverage monitoring, active cargo sum insured, loss ratio health, and corridor risk tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => alert('Exporting Insurance Operations Master CSV Report...')}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT MASTER REPORT</span>
                </button>
              </div>
            </div>

            {/* DASHBOARD METRICS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Sum Insured</span>
                <span className="text-xl font-black text-emerald-300">$52,400,000</span>
                <span className="text-[10px] text-slate-400 block">3 Portfolio Fleet Policies</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Annual Premium Outlay</span>
                <span className="text-xl font-black text-sky-300">$142,500 / yr</span>
                <span className="text-[10px] text-emerald-400 font-bold block">✓ No Overdue Payments</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Loss Ratio Health</span>
                <span className="text-xl font-black text-purple-300">1.17%</span>
                <span className="text-[10px] text-slate-400 block">Industry avg: 4.8%</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Active Claims Filed</span>
                <span className="text-xl font-black text-amber-300">3 Claims</span>
                <span className="text-[10px] text-amber-400 font-bold block">$91,700 Total In-Process</span>
              </div>
            </div>

            {/* ROUTE FILTER CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-0.5">
                <span className="text-white font-bold text-xs">Filter Corridor Route:</span>
                <p className="text-slate-400 text-[10px]">Filter portfolio policies by international maritime lane</p>
              </div>

              <div className="flex gap-2">
                {(['All Routes', 'Asia-Europe', 'Transpacific', 'Intra-APAC'] as const).map((rt) => (
                  <button
                    key={rt}
                    onClick={() => setInsuranceDashRouteFilter(rt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      insuranceDashRouteFilter === rt
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {rt}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTIVE POLICY PORTFOLIO TABLE */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Active Marine Insurance Policy Portfolio</span>
              </h3>

              <div className="space-y-3">
                {insuranceDashActivePolicies
                  .filter(pol => insuranceDashRouteFilter === 'All Routes' || pol.route === insuranceDashRouteFilter)
                  .map((pol) => (
                    <div key={pol.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/50 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-emerald-400 font-bold text-xs">{pol.policyNumber}</span>
                            <h4 className="text-white font-black text-sm">{pol.insuredParty}</h4>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                              {pol.status}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs mt-0.5">
                            Corridor: <strong className="text-sky-300">{pol.route}</strong> | Clause: <strong className="text-purple-300">{pol.coverageType}</strong>
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => alert(`Downloading Certificate PDF for Policy ${pol.policyNumber}`)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-[10px] font-bold transition-all flex items-center space-x-1"
                          >
                            <Download className="w-3.5 h-3.5 text-emerald-400" />
                            <span>CERTIFICATE PDF</span>
                          </button>
                          <button
                            onClick={() => alert(`Opening Policy Modification Portal for ${pol.policyNumber}`)}
                            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-[10px] transition-all shadow-sm"
                          >
                            MODIFY COVERAGE
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                          <span className="text-slate-500 text-[9px] font-bold block uppercase">SUM INSURED</span>
                          <span className="text-emerald-300 font-black text-sm">{pol.sumInsuredUsd}</span>
                        </div>

                        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                          <span className="text-slate-500 text-[9px] font-bold block uppercase">ANNUAL PREMIUM</span>
                          <span className="text-sky-300 font-black text-sm">{pol.annualPremiumUsd}</span>
                        </div>

                        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                          <span className="text-slate-500 text-[9px] font-bold block uppercase">DEDUCTIBLE LIMIT</span>
                          <span className="text-purple-300 font-black text-sm">{pol.deductibleUsd}</span>
                        </div>

                        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                          <span className="text-slate-500 text-[9px] font-bold block uppercase">POLICY EXPIRY</span>
                          <span className="text-amber-300 font-black text-sm">{pol.expiryDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* COVERAGE CLAUSE RATIO DISTRIBUTION */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <PieChart className="w-4 h-4 text-emerald-400" />
                <span>Coverage Clause Risk Distribution</span>
              </h3>

              <div className="w-full bg-slate-900 h-6 rounded-full overflow-hidden flex border border-slate-800">
                <div style={{ width: '52%' }} className="bg-emerald-500 h-full flex items-center justify-center text-[9px] font-black text-slate-950">
                  Institute Cargo Clause A (52%)
                </div>
                <div style={{ width: '30%' }} className="bg-sky-500 h-full flex items-center justify-center text-[9px] font-black text-slate-950">
                  War Risk Rider (30%)
                </div>
                <div style={{ width: '18%' }} className="bg-purple-500 h-full flex items-center justify-center text-[9px] font-black text-slate-950">
                  Thermal Sensor (18%)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: CLAIMS HISTORY */}
      {/* ========================================================================= */}
      {activeSubTab === 'claims-history' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400">
                  <Receipt className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Marine Cargo Incident & Claims Management History</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                      LLOYDS SURVEYOR CERTIFIED
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Track loss claims, marine surveyor assessment logs, damage evidence files, and payout disbursements.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setNewClaimModalOpen(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>FILE NEW INCIDENT CLAIM</span>
              </button>
            </div>

            {/* INLINE NEW CLAIM FORM MODAL */}
            {newClaimModalOpen && (
              <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/50 space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>File New Maritime Cargo Incident Claim</span>
                  </h3>
                  <button onClick={() => setNewClaimModalOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold text-xs block">Cargo Tracking ID:</label>
                    <input
                      type="text"
                      value={newClaimCargoId}
                      onChange={(e) => setNewClaimCargoId(e.target.value)}
                      placeholder="e.g. CRG-8820-SG"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold text-xs block">Incident Type:</label>
                    <select
                      value={newClaimIncidentType}
                      onChange={(e) => setNewClaimIncidentType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option value="Seawater Ingress">Seawater Ingress</option>
                      <option value="Container Collision">Container Collision</option>
                      <option value="Temperature Spoilage">Temperature Spoilage</option>
                      <option value="Piracy/Theft">Piracy / Theft</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Estimated Loss Amount:</span>
                      <span className="text-amber-400 font-black">${newClaimAmountUsd.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="200000"
                      step="5000"
                      value={newClaimAmountUsd}
                      onChange={(e) => setNewClaimAmountUsd(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Incident Description & Evidence Notes:</label>
                  <input
                    type="text"
                    value={newClaimTitle}
                    onChange={(e) => setNewClaimTitle(e.target.value)}
                    placeholder="Brief description of cargo damage or loss location..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setNewClaimModalOpen(false)}
                    className="px-3 py-1.5 bg-slate-900 text-slate-400 rounded-xl text-xs font-bold hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newClaimCargoId || !newClaimTitle) {
                        alert('Please fill out Cargo ID and Incident Description.');
                        return;
                      }
                      const claimId = `CLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                      const newClaim = {
                        claimId,
                        policyNumber: 'MC-2026-7782-A',
                        cargoId: newClaimCargoId,
                        title: newClaimTitle,
                        amountUsd: `$${newClaimAmountUsd.toLocaleString()}`,
                        incidentType: newClaimIncidentType,
                        location: 'International Waters Corridor',
                        surveyorReport: 'Submitted directly via Maritime Sentinel Claims Gateway. Surveyor pending.',
                        status: 'Under Review',
                        payoutProgress: 20,
                        timestamp: 'Just now'
                      };
                      setClaimsList(prev => [newClaim, ...prev]);
                      setNewClaimModalOpen(false);
                      setNewClaimCargoId('');
                      setNewClaimTitle('');
                      alert(`Claim ${claimId} successfully logged and sent to Lloyd's surveyor!`);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-md"
                  >
                    SUBMIT CLAIM
                  </button>
                </div>
              </div>
            )}

            {/* FILTER CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-white font-bold text-xs">Filter Claim Status:</span>
              <div className="flex gap-2">
                {(['All', 'Under Review', 'Approved & Disbursed', 'Pending Evidence'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setClaimsFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      claimsFilterStatus === st
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* CLAIMS FEED LIST */}
            <div className="space-y-4">
              {claimsList
                .filter(cl => claimsFilterStatus === 'All' || cl.status === claimsFilterStatus)
                .map((cl) => (
                  <div key={cl.claimId} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-amber-400 font-bold text-xs">{cl.claimId}</span>
                          <span className="text-slate-400 text-xs">({cl.policyNumber})</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            cl.status === 'Approved & Disbursed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            cl.status === 'Under Review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {cl.status}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1">{cl.title}</h3>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-amber-300 font-black text-base">{cl.amountUsd}</span>
                        <button
                          onClick={() => alert(`Disbursing payout funds for claim ${cl.claimId}...`)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-[10px] transition-all shadow-sm"
                        >
                          PAYOUT STATUS
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-slate-500 text-[10px] font-bold block uppercase">INCIDENT DETAILS</span>
                        <p className="text-slate-300">Cargo ID: <strong className="text-white">{cl.cargoId}</strong> | Location: <strong className="text-sky-300">{cl.location}</strong></p>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-slate-500 text-[10px] font-bold block uppercase">SURVEYOR REPORT</span>
                        <p className="text-slate-300 italic">{cl.surveyorReport}</p>
                      </div>
                    </div>

                    {/* PAYOUT PROGRESS BAR */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-400">Claim Settlement Progress:</span>
                        <span className="text-amber-300 font-bold">{cl.payoutProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div style={{ width: `${cl.payoutProgress}%` }} className="bg-amber-400 h-full rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: SMART INSURANCE ADVISOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'smart-insurance-advisor' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/40 text-purple-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">AI Smart Marine Insurance & Deductible Advisor</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      GEMINI NEURAL UNDERWRITER
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Autonomous AI policy optimization, corridor risk mitigation, deductible tuning, and rider recommendations.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-purple-500/40 flex items-center space-x-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">AI Premium Savings Unlocked</span>
                  <span className="text-2xl font-black text-purple-300">$14,800 / yr</span>
                </div>
              </div>
            </div>

            {/* SCENARIO SELECTOR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Corridor Risk Scenario:</label>
                <select
                  value={advisorRiskScenario}
                  onChange={(e) => setAdvisorRiskScenario(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="Monsoon Sea Corridor Risk">Monsoon Sea Corridor Risk (Bay of Bengal)</option>
                  <option value="High-Value Semiconductor Transit">High-Value Semiconductor Transit ($15M+)</option>
                  <option value="Strait Piracy Escort Protocol">Strait Piracy Escort Protocol (Horn of Africa)</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Deductible Simulator:</span>
                  <span className="text-purple-400 font-black">${advisorCargoDeductibleSim.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="50000"
                  step="2500"
                  value={advisorCargoDeductibleSim}
                  onChange={(e) => setAdvisorCargoDeductibleSim(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Simulated Annual Outlay</span>
                <span className="text-lg font-black text-white">
                  ${Math.round(48000 - (advisorCargoDeductibleSim * 0.25)).toLocaleString()} <span className="text-xs text-emerald-400 font-bold">(-{Math.round((advisorCargoDeductibleSim / 50000) * 20)}%)</span>
                </span>
                <span className="text-[10px] text-slate-400 block">Higher deductible lowers upfront premium</span>
              </div>
            </div>

            {/* DYNAMIC AI RECOMMENDATION CARDS */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Recommended Underwriting Optimizations</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-3">
                  <div className="flex items-center space-x-2 text-purple-300 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Attach Telematics Thermal Sensor Rider</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Installing IoT cold-chain temperature telemetry sensors reduces perishable cargo spoil risk by 84%. Insurance underwriter grants an instant 12% discount.
                  </p>
                  <button
                    onClick={() => {
                      setAdvisorAppliedRecommendations(prev => [...prev, 'Thermal Rider']);
                      alert('Thermal Telematics Rider applied to Policy POL-MAR-903! Premium reduced by $3,876/yr.');
                    }}
                    className="w-full py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md"
                  >
                    APPLY TELEMATICS RIDER (-$3,876/yr)
                  </button>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-sky-500/40 space-y-3">
                  <div className="flex items-center space-x-2 text-sky-300 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Optimize Deductible Tier to $10,000</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Based on 36 months of zero-loss history on Transpacific routes, increasing deductible from $5,000 to $10,000 optimizes risk/reward ratio.
                  </p>
                  <button
                    onClick={() => {
                      setAdvisorAppliedRecommendations(prev => [...prev, '$10k Deductible']);
                      alert('Deductible tier updated to $10,000 for Transpacific fleet policy!');
                    }}
                    className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md"
                  >
                    TUNE DEDUCTIBLE TIER (-$4,200/yr)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: AUTO RENEWAL UI */}
      {/* ========================================================================= */}
      {activeSubTab === 'auto-renewal-ui' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/40 text-cyan-400">
                  <RefreshCw className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Autonomous Marine Policy Auto-Renewal Engine</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                      SEAMLESS RENEWAL ACTIVE
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Automate policy renewals before expiry, set rate increase caps, and link enterprise corporate escrow accounts.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-950 rounded-2xl border border-cyan-500/40 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Engine Status</span>
                  <span className={`text-sm font-black ${autoRenewalMasterToggle ? 'text-cyan-300' : 'text-slate-500'}`}>
                    {autoRenewalMasterToggle ? 'AUTONOMOUS ACTIVE' : 'PAUSED'}
                  </span>
                </div>
                <button
                  onClick={() => setAutoRenewalMasterToggle(!autoRenewalMasterToggle)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                    autoRenewalMasterToggle ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {autoRenewalMasterToggle ? 'ON ✓' : 'OFF'}
                </button>
              </div>
            </div>

            {/* RENEWAL ENGINE CONFIGURATION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Max Auto-Approve Price Cap:</span>
                  <span className="text-cyan-400 font-black">+{autoRenewalPriceCapLimitPercent}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={autoRenewalPriceCapLimitPercent}
                  onChange={(e) => setAutoRenewalPriceCapLimitPercent(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Requires manual confirmation if price hikes exceed cap</span>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Notification Trigger Window:</label>
                <div className="flex gap-2">
                  {([15, 30, 45, 60] as const).map((days) => (
                    <button
                      key={days}
                      onClick={() => setAutoRenewalNotificationWindowDays(days)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        autoRenewalNotificationWindowDays === days ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {days}d Prior
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold text-xs block">Linked Corporate Payment Gateway:</label>
                <select
                  value={autoRenewalPaymentMethod}
                  onChange={(e) => setAutoRenewalPaymentMethod(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="Corporate SEPA Escrow">Corporate SEPA Escrow Account (*4401)</option>
                  <option value="Swift Wire Transfer">Swift Wire Transfer Clearance (*8812)</option>
                  <option value="Enterprise Credit Line">Enterprise Credit Line (*9012)</option>
                </select>
              </div>
            </div>

            {/* SCHEDULED RENEWAL POLICIES */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <span>Scheduled Policy Auto-Renewal Portfolio</span>
              </h3>

              <div className="space-y-3">
                {autoRenewalPolicies.map((pol) => (
                  <div key={pol.policyId} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-cyan-500/40 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-bold text-xs">{pol.policyId}</span>
                        <h4 className="text-white font-bold text-xs">{pol.policyName}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          pol.autoRenewEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {pol.autoRenewEnabled ? 'Auto-Renew ON' : 'Auto-Renew Paused'}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">
                        Corridor: <strong className="text-sky-300">{pol.route}</strong> | Expiry Date: <strong className="text-amber-300">{pol.expiryDate}</strong>
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Renewal Quote</span>
                        <span className="text-sky-300 font-black text-sm">{pol.renewalQuoteUsd}</span>
                      </div>

                      <button
                        onClick={() => {
                          setAutoRenewalPolicies(prev =>
                            prev.map(p => p.policyId === pol.policyId ? { ...p, autoRenewEnabled: !p.autoRenewEnabled } : p)
                          );
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                          pol.autoRenewEnabled ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {pol.autoRenewEnabled ? 'ENABLED ✓' : 'ENABLE'}
                      </button>

                      <button
                        onClick={() => alert(`Initiating manual immediate renewal execution for ${pol.policyId}...`)}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-[10px] transition-all shadow-sm"
                      >
                        RENEW NOW
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: MEDICAL EXAMINATION CENTRES & HOSPITALS (AIRWAYS & MARITIME) */}
      {/* ========================================================================= */}
      {activeSubTab === 'medical-examination-centers' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            {/* TOP HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-start space-x-3">
                <div className="p-3.5 bg-teal-500/20 rounded-2xl border border-teal-500/40 text-teal-400 shrink-0">
                  <Hospital className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-bold text-white">Global Airways & Maritime Medical Examination Centres & Hospitals</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                      ICAO / IMO / FAA / EASA / MCA CERTIFIED
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    Official medical centers, accredited hospital wings, examination packages, cadet discounts, and appointment booking for job seekers & students seeking Aviation and Maritime careers.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setFitSelfAssessModalOpen(true)}
                  className="px-4 py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>FIT-TO-WORK SELF ASSESSMENT</span>
                </button>

                <button
                  onClick={() => {
                    setMedBookingCenterName(medCentersList[0].name);
                    setMedBookingModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl transition-all shadow-md flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK MEDICAL APPOINTMENT</span>
                </button>
              </div>
            </div>

            {/* QUICK STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-teal-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
                  <Plane className="w-3.5 h-3.5 text-sky-400" />
                  <span>Airways Medicals</span>
                </span>
                <span className="text-lg font-black text-teal-300">Class 1, 2 & 3 Pilot AME</span>
                <span className="text-[10px] text-slate-400 block">FAA, EASA, CAA, DGCA, GCAA</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-sky-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
                  <Anchor className="w-3.5 h-3.5 text-teal-400" />
                  <span>Maritime Medicals</span>
                </span>
                <span className="text-lg font-black text-sky-300">ENG1 & STCW Fit-for-Sea</span>
                <span className="text-[10px] text-slate-400 block">UK MCA, USCG, DGS, Panama</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  <span>Student Cadet Subsidies</span>
                </span>
                <span className="text-lg font-black text-purple-300">Up to 30% Student Discount</span>
                <span className="text-[10px] text-emerald-400 font-bold block">✓ With Academy Admission Letter</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Hospitals</span>
                </span>
                <span className="text-lg font-black text-amber-300">5 Global Hub Centers</span>
                <span className="text-[10px] text-slate-400 block">Singapore, UK, UAE, USA, India</span>
              </div>
            </div>

            {/* SEARCH & FILTER CONTROLS */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={medSearchQuery}
                    onChange={(e) => setMedSearchQuery(e.target.value)}
                    placeholder="Search medical center, hospital name, city, test type (e.g., ENG1, FAA Class 1, Ishihara, ECG)..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* REGION FILTER */}
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-xs font-bold shrink-0">Region:</span>
                  <select
                    value={medRegionFilter}
                    onChange={(e) => setMedRegionFilter(e.target.value as any)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                  >
                    <option value="All Regions">All Global Regions</option>
                    <option value="Asia-Pacific">Asia-Pacific</option>
                    <option value="Europe & UK">Europe & UK</option>
                    <option value="Middle East & Africa">Middle East & Africa</option>
                    <option value="Americas">Americas</option>
                  </select>
                </div>
              </div>

              {/* CATEGORY TABS */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-bold text-xs self-center mr-2">Target Applicant Sector:</span>
                {(['All', 'Airways (Aviation)', 'Maritime (Seafarers)', 'Cadets & Students'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMedCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      medCategoryFilter === cat
                        ? 'bg-teal-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* MEDICAL CENTERS DIRECTORY CARDS */}
            <div className="space-y-6">
              {medCentersList
                .filter(center => {
                  if (medRegionFilter !== 'All Regions' && center.region !== medRegionFilter) return false;
                  if (medCategoryFilter === 'Airways (Aviation)' && !center.sector.includes('Airways')) return false;
                  if (medCategoryFilter === 'Maritime (Seafarers)' && !center.sector.includes('Maritime')) return false;
                  if (medCategoryFilter === 'Cadets & Students' && !center.cadetScholarshipAssistance) return false;
                  if (medSearchQuery) {
                    const q = medSearchQuery.toLowerCase();
                    return center.name.toLowerCase().includes(q) ||
                      center.cityCountry.toLowerCase().includes(q) ||
                      center.hospitalAffiliation.toLowerCase().includes(q) ||
                      center.accreditations.some(a => a.toLowerCase().includes(q));
                  }
                  return true;
                })
                .map((center) => (
                  <div key={center.id} className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-5 hover:border-teal-500/50 transition-all shadow-lg">
                    {/* CENTER HEADER */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                            {center.region}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                            {center.sector}
                          </span>
                          <span className="text-amber-400 font-bold text-xs flex items-center space-x-1">
                            <span>★ {center.rating}</span>
                            <span className="text-slate-500 text-[10px]">({center.reviewsCount} applicant reviews)</span>
                          </span>
                        </div>

                        <h3 className="text-base font-black text-white">{center.name}</h3>
                        <p className="text-slate-400 text-xs">
                          Hospital Wing: <strong className="text-sky-300">{center.hospitalAffiliation}</strong> | Location: <strong className="text-teal-300">{center.cityCountry}</strong>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => setSelectedDetailCenterId(selectedDetailCenterId === center.id ? null : center.id)}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-teal-400" />
                          <span>{selectedDetailCenterId === center.id ? 'HIDE DETAILS' : 'FULL DETAILS'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setMedBookingCenterName(center.name);
                            setMedBookingModalOpen(true);
                          }}
                          className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>BOOK APPOINTMENT</span>
                        </button>
                      </div>
                    </div>

                    {/* ACCREDITATIONS & ADDRESS INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
                        <span className="text-slate-400 text-[10px] font-bold block uppercase flex items-center space-x-1">
                          <Award className="w-3.5 h-3.5 text-teal-400" />
                          <span>Official Regulatory Accreditations & Certifications</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {center.accreditations.map((acc, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-teal-950 text-teal-300 border border-teal-800/60 text-[10px] font-bold">
                              ✓ {acc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                        <span className="text-slate-400 text-[10px] font-bold block uppercase flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          <span>Contact, Address & Helpline</span>
                        </span>
                        <p className="text-slate-300 font-bold">{center.address}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-[11px]">
                          <span>Phone: <strong className="text-white">{center.phone}</strong></span>
                          <span>24/7 Helpline: <strong className="text-rose-400">{center.emergencyHelpline}</strong></span>
                          <span>Email: <strong className="text-sky-300">{center.email}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* EXAMINATION PACKAGES TABLE */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-teal-400" />
                        <span>Available Medical Examination Packages & Pricing</span>
                      </h4>

                      <div className="space-y-3">
                        {center.examPackages.map((pkg, idx) => (
                          <div key={idx} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 hover:border-teal-500/40 transition-all">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                              <div>
                                <h5 className="text-xs font-bold text-teal-300">{pkg.name}</h5>
                                <span className="text-slate-400 text-[10px]">Estimated Duration: <strong className="text-white">{pkg.duration}</strong></span>
                              </div>

                              <div className="flex items-center space-x-3 text-xs">
                                <div className="text-right">
                                  <span className="text-slate-400 text-[9px] block uppercase font-bold">Standard Price</span>
                                  <span className="text-white font-bold">{pkg.priceUsd}</span>
                                </div>
                                <div className="text-right bg-purple-950/60 px-2.5 py-1 rounded-xl border border-purple-800/60">
                                  <span className="text-purple-300 text-[9px] block uppercase font-bold">Cadet Student Rate</span>
                                  <span className="text-purple-300 font-black">{pkg.cadetDiscountPrice}</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-slate-300 text-[11px]">
                              <strong className="text-slate-400">Tests & Diagnostics Included:</strong> {pkg.testsIncluded}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* STUDENT SCHOLARSHIP ASSISTANCE & DOCUMENT CHECKLIST */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 bg-purple-950/20 rounded-2xl border border-purple-500/30 space-y-1">
                        <span className="text-purple-300 text-[10px] font-bold block uppercase flex items-center space-x-1">
                          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                          <span>Student Cadet Scholarship & Subsidy Support</span>
                        </span>
                        <p className="text-slate-300 text-xs font-bold">{center.cadetScholarshipAssistance}</p>
                      </div>

                      <div className="p-3.5 bg-sky-950/20 rounded-2xl border border-sky-500/30 space-y-1">
                        <span className="text-sky-300 text-[10px] font-bold block uppercase flex items-center space-x-1">
                          <FileText className="w-3.5 h-3.5 text-sky-400" />
                          <span>Document Requirements for Candidates & Students</span>
                        </span>
                        <p className="text-slate-300 text-[11px]">
                          {center.documentRequirements.join(' • ')}
                        </p>
                      </div>
                    </div>

                    {/* EXPANDABLE FULL DETAILS DRAWER */}
                    {selectedDetailCenterId === center.id && (
                      <div className="p-5 bg-slate-900 rounded-2xl border border-teal-500/40 space-y-4 animate-fadeIn">
                        <h4 className="text-xs font-bold text-teal-300 uppercase flex items-center space-x-2 border-b border-slate-800 pb-2">
                          <Building2 className="w-4 h-4" />
                          <span>Full Hospital Infrastructure & Aeromedical Team Details</span>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                            <span className="text-slate-400 font-bold block uppercase text-[10px]">Senior Medical Examiners (AME)</span>
                            <p className="text-slate-200">Dr. Marcus Vance (FAA Senior AME #4920)</p>
                            <p className="text-slate-200">Dr. Sarah Jenkins (EASA & UK MCA Chief Doctor)</p>
                          </div>

                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                            <span className="text-slate-400 font-bold block uppercase text-[10px]">On-site Diagnostic Facilities</span>
                            <p className="text-slate-300">• 12-Lead Digital ECG & Echocardiogram</p>
                            <p className="text-slate-300">• Pure-Tone Soundproof Audiometry Booth</p>
                            <p className="text-slate-300">• Ishihara & Lantern Color Vision Testing</p>
                          </div>

                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                            <span className="text-slate-400 font-bold block uppercase text-[10px]">Operating Hours & Walk-In Slots</span>
                            <p className="text-teal-300 font-bold">{center.operatingHours}</p>
                            <p className="text-slate-400 text-[10px]">Express 2-hour medical clearance certificate issuance for urgent vessel embarkation or flight academy enrollment.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* APPOINTMENT BOOKING MODAL */}
          {medBookingModalOpen && (
            <div className="p-6 bg-slate-900 border border-teal-500/50 rounded-3xl space-y-5 shadow-2xl animate-fadeIn">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-teal-400" />
                  <h3 className="text-sm font-bold text-white">Book Certified Medical Examination Appointment</h3>
                </div>
                <button onClick={() => setMedBookingModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Medical Center Selected:</label>
                  <input
                    type="text"
                    value={medBookingCenterName}
                    readOnly
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-teal-300 font-bold text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Candidate / Student Category:</label>
                  <select
                    value={medCandidateType}
                    onChange={(e) => setMedCandidateType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                  >
                    <option value="Aviation Cadet Student">Aviation Cadet Student (Flight Academy Applicant)</option>
                    <option value="Maritime Student Cadet">Maritime Student Cadet (Merchant Navy Cadet)</option>
                    <option value="Airways Job Seeker">Airways Job Seeker (Licensed Pilot / Cabin Crew)</option>
                    <option value="Maritime Job Seeker">Maritime Job Seeker (Seafarer / Marine Engineer)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Full Name of Applicant:</label>
                  <input
                    type="text"
                    value={medCandidateName}
                    onChange={(e) => setMedCandidateName(e.target.value)}
                    placeholder="e.g. Captain Jonathan Ross or Cadet Alex Mercer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Email Address:</label>
                  <input
                    type="email"
                    value={medCandidateEmail}
                    onChange={(e) => setMedCandidateEmail(e.target.value)}
                    placeholder="e.g. candidate@aviation-academy.edu"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Preferred Medical Examination Package:</label>
                  <select
                    value={medExamPackageSelect}
                    onChange={(e) => setMedExamPackageSelect(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                  >
                    <option value="Airways Class 1 Initial & Renewal (FAA/EASA)">Airways Class 1 Pilot Initial & Renewal ($285 Cadet Rate)</option>
                    <option value="Maritime ENG1 & STCW Fitness Medical">Maritime ENG1 & STCW Fit-for-Sea ($140 Cadet Rate)</option>
                    <option value="Cadet Student Pre-Admission Screening">Cadet Student Pre-Admission Screening ($110 Student Special)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Appointment Date:</label>
                  <input
                    type="date"
                    value={medBookingDate}
                    onChange={(e) => setMedBookingDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-800/40 text-purple-300 text-xs flex items-center justify-between">
                <span>Student Cadet Discount Applied automatically with valid Student ID.</span>
                <span className="font-bold text-emerald-400">✓ 25% Off Guaranteed</span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setMedBookingModalOpen(false)}
                  className="px-4 py-2 bg-slate-950 text-slate-400 rounded-xl text-xs font-bold hover:text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (!medCandidateName || !medCandidateEmail) {
                      alert('Please provide your name and email address.');
                      return;
                    }
                    const ticketId = `MED-TKT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
                    alert(`Appointment Confirmed!\n\nBooking Reference: ${ticketId}\nCenter: ${medBookingCenterName}\nDate: ${medBookingDate}\nCandidate: ${medCandidateName}\n\nConfirmation slip sent to ${medCandidateEmail}.`);
                    setMedBookingModalOpen(false);
                  }}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-xs shadow-md"
                >
                  CONFIRM APPOINTMENT & GENERATE SLIP
                </button>
              </div>
            </div>
          )}

          {/* FIT-TO-WORK SELF ASSESSMENT TOOL MODAL */}
          {fitSelfAssessModalOpen && (
            <div className="p-6 bg-slate-900 border border-purple-500/50 rounded-3xl space-y-5 shadow-2xl animate-fadeIn">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-bold text-white">Aviation & Maritime Fit-to-Work Self Assessment Tool</h3>
                </div>
                <button onClick={() => setFitSelfAssessModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Career Pathway Sector:</label>
                  <select
                    value={fitAssessSector}
                    onChange={(e) => setFitAssessSector(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Airways">Airways (Commercial Pilot / Cabin Crew)</option>
                    <option value="Maritime">Maritime (Deck Officer / Engineer / Seafarer)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Visual Acuity & Color Vision:</label>
                  <select
                    value={fitAssessVision}
                    onChange={(e) => setFitAssessVision(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="20/20 Perfect">20/20 Perfect Uncorrected Vision</option>
                    <option value="Corrected with Lenses">Corrected to 20/20 with Lenses/Glasses</option>
                    <option value="Color Vision Deficiency">Color Vision Deficiency (Ishihara Plate Missed)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold text-xs block">Audiometry Hearing Check:</label>
                  <select
                    value={fitAssessHearing}
                    onChange={(e) => setFitAssessHearing(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Normal Audiogram">Normal Audiogram (500Hz - 3000Hz clear)</option>
                    <option value="Mild Hearing Loss">Mild High-Frequency Hearing Loss</option>
                  </select>
                </div>
              </div>

              {/* ASSESSMENT RESULT */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Self-Assessment Result Evaluation</span>
                </h4>

                {fitAssessVision === '20/20 Perfect' && fitAssessHearing === 'Normal Audiogram' && (
                  <p className="text-emerald-300 text-xs font-bold">
                    ✓ ELIGIBLE FOR CLASS 1 AIRWAYS PILOT & ENG1 MARITIME SEAFARER FIT-TO-WORK CERTIFICATE. You meet all standard ICAO, FAA, EASA, and UK MCA health benchmarks!
                  </p>
                )}

                {fitAssessVision === 'Corrected with Lenses' && (
                  <p className="text-sky-300 text-xs">
                    ⓘ ELIGIBLE WITH CORRECTION LIMITATION. Lenses permitted under FAA Class 1 / EASA Part-MED and ENG1 provided spare prescription spectacles are carried during flight or vessel duty.
                  </p>
                )}

                {fitAssessVision === 'Color Vision Deficiency' && (
                  <p className="text-amber-300 text-xs">
                    ⚠ SPECIAL ASSESSMENT REQUIRED. Color vision deficiency requires a Holmes-Wright Lantern or CAD (Color Assessment & Diagnosis) test at an authorized aeromedical hospital.
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setFitSelfAssessModalOpen(false)}
                  className="px-5 py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-xl text-xs shadow-md"
                >
                  CLOSE ASSESSMENT
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {activeSubTab === 'health-score' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/40 text-emerald-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Security Health Score Evaluator</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      GRADE A+
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Multi-dimensional risk scoring engine inspecting access control, cryptography, patch compliance, and firewall integrity.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Overall Health Score</span>
                  <span className="text-3xl font-black text-emerald-400">{securityScore} / 100</span>
                </div>
                <button
                  onClick={handleApplyAllPatches}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>OPTIMIZE TO 100%</span>
                </button>
              </div>
            </div>

            {/* SCORE PILLARS BREAKDOWN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">1. Access & MFA</span>
                  <span className="text-emerald-400 font-bold">25 / 25</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-slate-500 text-[10px]">Captain SSO & Biometric HSM Token active.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">2. Encryption Vault</span>
                  <span className="text-emerald-400 font-bold">25 / 25</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-slate-500 text-[10px]">{vaultCipher} Hardware Key Isolation.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">3. Patch Compliance</span>
                  <span className={pendingPatchesCount > 0 ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                    {25 - (pendingPatchesCount * 3)} / 25
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className={pendingPatchesCount > 0 ? "bg-amber-400 h-full rounded-full" : "bg-emerald-400 h-full rounded-full"}
                    style={{ width: `${((25 - (pendingPatchesCount * 3)) / 25) * 100}%` }}
                  />
                </div>
                <p className="text-slate-500 text-[10px]">
                  {pendingPatchesCount > 0 ? `${pendingPatchesCount} Patches Pending` : 'All Systems Up-to-Date'}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">4. AIS & Network Firewall</span>
                  <span className="text-emerald-400 font-bold">25 / 25</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-slate-500 text-[10px]">Zero spoofed telemetry pings allowed.</p>
              </div>
            </div>

            {/* ACTIONABLE SECURITY RECOMMENDATIONS */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Security Posture Optimization Recommendations</span>
              </h3>

              <div className="space-y-2">
                {pendingPatchesCount > 0 ? (
                  <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-amber-300 font-bold block">Apply Firmware Security Updates ({pendingPatchesCount})</span>
                      <span className="text-slate-400 text-[10px]">
                        Updating AIS Transponder & HSM Crypto drivers will boost security score by +{pendingPatchesCount * 3} points.
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveSubTab('patch-checker')}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl"
                    >
                      GO TO PATCH CHECKER
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-emerald-300 font-bold">
                      ✓ All security recommendations applied! System is operating at peak 100/100 defense rating.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: AUTOMATED PATCH CHECKER */}
      {/* ========================================================================= */}
      {activeSubTab === 'patch-checker' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-sky-500/20 rounded-2xl border border-sky-500/40 text-sky-400">
                  <RefreshCw className={`w-6 h-6 ${isPatchScanning ? 'animate-spin' : ''}`} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Automated Vulnerability Patch Checker</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      AUTO-HOTFIX READY
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Scans transponder microcode, CAN-Bus driver modules, and NPM enterprise packages against official CVE threat feeds.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleApplyAllPatches}
                  disabled={isPatchScanning || pendingPatchesCount === 0}
                  className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-2xl transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isPatchScanning ? 'PATCHING ALL...' : 'APPLY ALL HOTFIXES'}</span>
                </button>
              </div>
            </div>

            {/* PATCH LIST */}
            <div className="space-y-3">
              {patches.map((patch) => (
                <div
                  key={patch.id}
                  className={`p-4 rounded-2xl border transition-all space-y-2 ${
                    patch.status === 'Available'
                      ? 'bg-slate-950 border-amber-500/40'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sky-400 font-bold text-xs">{patch.id}</span>
                        <span className="text-white font-bold">{patch.component}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            patch.risk === 'Critical'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : patch.risk === 'High'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {patch.risk} Risk ({patch.cve})
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">{patch.description}</p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-right text-[11px]">
                        <span className="text-slate-500 block">Version: {patch.currentVersion}</span>
                        <span className="text-sky-300 font-bold">Target: {patch.latestVersion}</span>
                      </div>

                      {patch.status === 'Available' ? (
                        <button
                          onClick={() => handleApplySinglePatch(patch.id)}
                          className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md"
                        >
                          APPLY HOTFIX
                        </button>
                      ) : patch.status === 'Updating...' ? (
                        <span className="px-3.5 py-1.5 bg-slate-800 text-amber-300 font-bold text-xs rounded-xl flex items-center space-x-1">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>INSTALLING...</span>
                        </span>
                      ) : (
                        <span className="px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs rounded-xl flex items-center space-x-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>UP-TO-DATE</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE: BREACH RECOVERY UI */}
      {/* ========================================================================= */}
      {activeSubTab === 'breach-recovery' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-400 animate-pulse">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Breach Containment & Recovery Console</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase">
                      EMERGENCY RECOVERY READY
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    One-click emergency system lockdown, active token revocation, vault re-encryption, and state snapshot rollback wizard.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleTriggerBreachRecovery}
                  disabled={breachLockdownActive && breachProgress < 100}
                  className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-xl flex items-center space-x-2 disabled:opacity-50"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>TRIGGER EMERGENCY BREACH LOCKDOWN</span>
                </button>
              </div>
            </div>

            {/* RECOVERY PROGRESS BAR */}
            {breachLockdownActive && (
              <div className="p-5 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold text-xs uppercase">{breachStep}</span>
                  <span className="text-white font-black text-sm">{breachProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${breachProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* EMERGENCY PROTOCOL STEPS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Network Isolation</span>
                <p className="text-slate-400 text-[10px]">Cuts untrusted WebSocket & radio telemetry ports.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">2. Session Revocation</span>
                <p className="text-slate-400 text-[10px]">Purges all active captain SSO bearer tokens.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">3. Vault Lock</span>
                <p className="text-slate-400 text-[10px]">Rotates RSA-4096 HSM key & locks storage.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">4. Snapshot Restore</span>
                <p className="text-slate-400 text-[10px]">Rolls back state to clean backup SNAP-20260811.</p>
              </div>
            </div>

            {/* BREACH CONTAINMENT AUDIT LOG STREAM */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Emergency Recovery Activity Terminal</span>
              <div className="font-mono text-[11px] text-slate-300 space-y-1 max-h-40 overflow-y-auto">
                {breachLogs.map((log, i) => (
                  <div key={i} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeSubTab === 'automated-scan' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-sky-400" />
                <div>
                  <h2 className="text-base font-bold text-white">Automated Security Scan Configuration</h2>
                  <p className="text-slate-400 text-xs">
                    Schedule background security scans to periodically audit LocalStorage, API hooks, and AIS telemetry without manual intervention.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleStartScan('auto')}
                disabled={isScanning}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-lg flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>RUN AUTOMATED SCAN NOW</span>
              </button>
            </div>

            {/* AUTOMATED CONTROLS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">Automated Scan Engine</span>
                  <button
                    onClick={() => setAutoScanEnabled(!autoScanEnabled)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      autoScanEnabled
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {autoScanEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 text-[10px] font-bold uppercase block">Automated Scan Frequency Interval</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['1h', '6h', '12h', '24h'] as const).map((interval) => (
                      <button
                        key={interval}
                        onClick={() => setAutoScanInterval(interval)}
                        className={`py-2 rounded-xl text-center font-bold border transition-all ${
                          autoScanInterval === interval
                            ? 'bg-sky-500 text-slate-950 border-sky-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        Every {interval.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Automated Scan:</span>
                    <span className="text-sky-300 font-bold">{lastAutoScanTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Next Scheduled Scan:</span>
                    <span className="text-amber-300 font-bold">{nextAutoScanCountdown}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-white font-bold text-sm block">Automated Remediation Rules</span>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-white font-bold block">Auto-Quarantine Suspicious Tokens</span>
                      <span className="text-slate-400 text-[10px]">Isolate compromised LocalStorage keys automatically</span>
                    </div>
                    <button
                      onClick={() => setAutoQuarantine(!autoQuarantine)}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        autoQuarantine ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {autoQuarantine ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-white font-bold block">Auto-Purge Critical Threats</span>
                      <span className="text-slate-400 text-[10px]">Automatically delete verified phishing payloads</span>
                    </div>
                    <button
                      onClick={() => setAutoPurgeCritical(!autoPurgeCritical)}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        autoPurgeCritical ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {autoPurgeCritical ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 3: HARDWARE HEALTH WIDGETS */}
      {/* ========================================================================= */}
      {activeSubTab === 'hardware-widgets' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-teal-400" />
                <h2 className="text-base font-bold text-white">Live Hardware Sensor Health Widgets</h2>
              </div>
              <span className="text-slate-400 text-xs">5 Connected Sensor Telemetry Units</span>
            </div>

            <p className="text-slate-400 text-xs">
              Live diagnostic widgets streaming real-time hardware metrics for navigation, communications, engine CAN-Bus, sonar seabed transducers, and crypto security chips.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hardwareWidgets.map((hw) => (
                <div key={hw.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-teal-500/40 transition-all shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <div>
                      <span className="text-[10px] text-teal-400 font-bold uppercase block">{hw.category}</span>
                      <h3 className="text-sm font-bold text-white">{hw.name}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      {hw.healthPercent}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Hardware Health Index</span>
                      <span className="text-teal-300">{hw.status}</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className="bg-teal-400 h-full rounded-full" style={{ width: `${hw.healthPercent}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-900 text-xs">
                    {hw.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between text-[11px]">
                        <span className="text-slate-400">{m.label}:</span>
                        <span className="text-slate-200 font-bold">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[10px] text-slate-500 flex justify-between border-t border-slate-900">
                    <span>Calibrated: {hw.lastCalibrated}</span>
                    <button
                      onClick={() => alert(`Recalibrated ${hw.name} successfully!`)}
                      className="text-teal-400 hover:text-teal-300 font-bold"
                    >
                      Recalibrate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 4: SMART ANOMALY ALERTS */}
      {/* ========================================================================= */}
      {activeSubTab === 'smart-anomalies' && (
        <div className="space-y-6 font-mono">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-rose-400" />
                <h2 className="text-base font-bold text-white">AI Neural Smart Anomaly Detection & Alerts</h2>
              </div>
              <button
                onClick={handleSimulateAnomaly}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>SIMULATE ANOMALY SPIKE</span>
              </button>
            </div>

            <p className="text-slate-400 text-xs">
              AI neural models continuously inspect telemetry pulse shapes, AIS transponder burst rates, and LocalStorage mutations to instantly alert crew to subtle cyber or physical anomalies.
            </p>

            <div className="space-y-4">
              {anomalies.map((anom) => (
                <div
                  key={anom.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    anom.status === 'Active'
                      ? 'bg-rose-950/40 border-rose-500/50 shadow-lg'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-rose-400 font-bold text-xs">{anom.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-700 text-[10px] font-bold">
                          {anom.category}
                        </span>
                        <span className="text-slate-400 text-[10px]">{anom.detectedAt}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{anom.title}</h3>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                        AI Risk Score: {anom.riskScore}%
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">{anom.anomalyDetails}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                    <span className="text-slate-400 text-[10px]">
                      Status: <strong className="text-white">{anom.status}</strong>
                    </span>

                    <div className="flex items-center space-x-2">
                      {anom.status === 'Active' && (
                        <>
                          <button
                            onClick={() => handleAcknowledgeAnomaly(anom.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-bold"
                          >
                            Acknowledge
                          </button>
                          <button
                            onClick={() => handleMitigateAnomaly(anom.id)}
                            className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 text-[11px] font-black shadow-md"
                          >
                            Auto-Mitigate Anomaly
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 5: ANTI-SCAMMER & PHISHING SHIELD */}
      {/* ========================================================================= */}
      {activeSubTab === 'scam-shield' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Search className="w-5 h-5 text-rose-400" />
              <h2 className="text-base font-bold text-white">Phishing Link & Scammer URL Analyzer</h2>
            </div>

            <p className="text-slate-400">
              Paste suspicious SMS links, emails, port payment requests, or booking URLs to test against the OceanBird Anti-Fraud Blacklist database.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g., https://oceanbird-verify-login.xyz or suspicious-booking.net"
                value={urlToTest}
                onChange={(e) => setUrlToTest(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 text-white p-3.5 rounded-2xl text-xs font-mono focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={handleTestScamUrl}
                className="px-6 py-3.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs rounded-2xl transition-all font-mono shrink-0"
              >
                ANALYZE FOR FRAUD
              </button>
            </div>

            {scamCheckResult.status && (
              <div
                className={`p-5 rounded-2xl border font-mono space-y-3 ${
                  scamCheckResult.status === 'dangerous'
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {scamCheckResult.status === 'dangerous' ? (
                      <AlertTriangle className="w-6 h-6 text-rose-400" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    )}
                    <span className="font-bold text-sm">
                      {scamCheckResult.status === 'dangerous'
                        ? 'FRAUDULENT / PHISHING URL DETECTED!'
                        : 'URL VERIFIED SAFE'}
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-950 border border-current font-bold">
                    Risk Score: {scamCheckResult.score}%
                  </span>
                </div>

                <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
                  {scamCheckResult.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 6: QUARANTINE VAULT & AUDIT LOG */}
      {/* ========================================================================= */}
      {activeSubTab === 'quarantine-logs' && (
        <div className="space-y-6 font-mono text-xs">
          {/* SECURE VAULT ENCRYPTION CONTROL CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-2xl border ${vaultLocked ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'}`}>
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white">Secure Vault Encryption Engine</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${vaultLocked ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}`}>
                      {vaultLocked ? 'VAULT LOCKED (ENCRYPTED)' : 'VAULT UNLOCKED (DECRYPTED)'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Military-grade encrypted enclave protecting quarantined malware payloads, stolen token signatures, and captain credentials.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setVaultLocked(!vaultLocked)}
                  className={`px-4 py-2 rounded-2xl font-black text-xs transition-all shadow-md flex items-center space-x-2 ${
                    vaultLocked
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      : 'bg-rose-500 hover:bg-rose-400 text-slate-950'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  <span>{vaultLocked ? 'UNLOCK VAULT' : 'LOCK VAULT'}</span>
                </button>
                <button
                  onClick={() => {
                    const now = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
                    setKeyRotationTime(now);
                    alert(`RSA-4096 Hardware Key re-generated successfully at ${now}`);
                  }}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white rounded-2xl font-bold text-xs transition-all"
                >
                  ROTATE ENCRYPTION KEY
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Active Encryption Cipher</span>
                <select
                  value={vaultCipher}
                  onChange={(e) => setVaultCipher(e.target.value as any)}
                  className="bg-transparent text-teal-300 font-bold focus:outline-none cursor-pointer mt-0.5"
                >
                  <option value="AES-256-GCM" className="bg-slate-900 text-white">AES-256-GCM Hardware Vault</option>
                  <option value="RSA-4096" className="bg-slate-900 text-white">RSA-4096 Asymmetric Enclave</option>
                  <option value="ChaCha20-Poly1305" className="bg-slate-900 text-white">ChaCha20-Poly1305 Stream</option>
                </select>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Last Key Rotation</span>
                <span className="text-sky-300 font-bold block mt-0.5">{keyRotationTime}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Hardware Security Module (HSM)</span>
                <span className="text-emerald-400 font-bold block mt-0.5">FIPS 140-2 Level 3 Active</span>
              </div>
            </div>
          </div>

          {/* AUTOMATED THREAT LOGS TOOLBAR & FEED */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Automated Security Threat Audit Logs</h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search threat logs..."
                  value={logSearchTerm}
                  onChange={(e) => setLogSearchTerm(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white px-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-amber-500"
                />

                {/* Severity Filter */}
                <select
                  value={logFilterSeverity}
                  onChange={(e) => setLogFilterSeverity(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl text-xs focus:outline-none"
                >
                  <option value="All">All Severities</option>
                  <option value="Critical">Critical Only</option>
                  <option value="High">High Only</option>
                  <option value="Medium">Medium Only</option>
                </select>

                <button
                  onClick={() => {
                    const jsonStr = JSON.stringify(threats, null, 2);
                    const blob = new Blob([jsonStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `threat_logs_${Date.now()}.json`;
                    a.click();
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 rounded-xl font-bold text-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT LOGS</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {threats
                .filter((t) => {
                  if (logFilterSeverity !== 'All' && t.severity !== logFilterSeverity) return false;
                  if (logSearchTerm.trim() !== '') {
                    const q = logSearchTerm.toLowerCase();
                    return (
                      t.type.toLowerCase().includes(q) ||
                      t.source.toLowerCase().includes(q) ||
                      t.description.toLowerCase().includes(q)
                    );
                  }
                  return true;
                })
                .map((t) => (
                  <div key={t.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-400 font-bold text-sm">{t.type} ({t.id})</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          {t.severity} Severity
                        </span>
                      </div>
                      <span className="text-slate-500 text-[10px]">{t.detectedAt}</span>
                    </div>

                    <p className="text-slate-300">
                      {vaultLocked ? '•••••••••••••••• [Encrypted Vault Payload — Unlock Vault to view details]' : t.description}
                    </p>

                    <div className="flex items-center justify-between text-slate-500 text-[10px] pt-2 border-t border-slate-900">
                      <span>Source: {t.source}</span>
                      <span className="text-emerald-400 font-bold">{t.status}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
