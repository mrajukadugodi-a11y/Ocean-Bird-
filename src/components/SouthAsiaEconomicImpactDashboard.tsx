import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, 
  CartesianGrid, Legend, LineChart, Line, ComposedChart 
} from 'recharts';
import { 
  DollarSign, TrendingDown, Building, Truck, ShieldAlert, Globe, Activity, 
  Clock, Download, RefreshCw, AlertTriangle, Anchor, ArrowUpRight, Check, Copy,
  BarChart2, FileSpreadsheet, HardHat, Factory, Radio, Sliders, ShieldCheck, Zap
} from 'lucide-react';

export type ClimateEventSeverity = 'CAT1_STORM' | 'CAT3_SEVERE_CYCLONE' | 'CAT5_SUPER_CYCLONE' | 'MEGATHRUST_TSUNAMI';
export type SouthAsiaRegionFilter = 'ALL_SOUTH_ASIA' | 'BANGLADESH' | 'INDIA_WEST' | 'INDIA_EAST' | 'PAKISTAN' | 'SRI_LANKA';
export type TradeScenarioMode = 'NORMAL_OPS' | 'PORT_LOCKOUT' | 'STRAIT_DIVERTED' | 'TOTAL_BLOCKADE';

export interface RegionalGdpData {
  regionId: SouthAsiaRegionFilter;
  regionName: string;
  flag: string;
  annualGdpBaselineBillionUsd: number;
  projectedGdpLossBillionUsd: number;
  gdpLossPercent: number;
  infrastructureRepairBillionUsd: number;
  dailyTradeLossMillionUsd: number;
  haltedShippingTeu: number;
  recoveryMonths: number;
}

export const SOUTH_ASIA_GDP_BASELINE: Record<SouthAsiaRegionFilter, RegionalGdpData> = {
  ALL_SOUTH_ASIA: {
    regionId: 'ALL_SOUTH_ASIA',
    regionName: 'Entire South Asian Coastal Zone',
    flag: '🌏',
    annualGdpBaselineBillionUsd: 4250,
    projectedGdpLossBillionUsd: 46.3,
    gdpLossPercent: 1.09,
    infrastructureRepairBillionUsd: 13.4,
    dailyTradeLossMillionUsd: 185,
    haltedShippingTeu: 142000,
    recoveryMonths: 18
  },
  BANGLADESH: {
    regionId: 'BANGLADESH',
    regionName: 'Bangladesh (Ganges & Chittagong Delta)',
    flag: '🇧🇩',
    annualGdpBaselineBillionUsd: 460,
    projectedGdpLossBillionUsd: 12.8,
    gdpLossPercent: 2.78,
    infrastructureRepairBillionUsd: 3.8,
    dailyTradeLossMillionUsd: 48,
    haltedShippingTeu: 38500,
    recoveryMonths: 24
  },
  INDIA_WEST: {
    regionId: 'INDIA_WEST',
    regionName: 'India West Coast (Mumbai & Konkan)',
    flag: '🇮🇳',
    annualGdpBaselineBillionUsd: 1250,
    projectedGdpLossBillionUsd: 14.5,
    gdpLossPercent: 1.16,
    infrastructureRepairBillionUsd: 4.2,
    dailyTradeLossMillionUsd: 62,
    haltedShippingTeu: 45000,
    recoveryMonths: 14
  },
  INDIA_EAST: {
    regionId: 'INDIA_EAST',
    regionName: 'India East Coast (Coromandel & Bengal)',
    flag: '🇮🇳',
    annualGdpBaselineBillionUsd: 1100,
    projectedGdpLossBillionUsd: 9.8,
    gdpLossPercent: 0.89,
    infrastructureRepairBillionUsd: 2.7,
    dailyTradeLossMillionUsd: 38,
    haltedShippingTeu: 28000,
    recoveryMonths: 12
  },
  PAKISTAN: {
    regionId: 'PAKISTAN',
    regionName: 'Pakistan (Indus Delta & Karachi)',
    flag: '🇵🇰',
    annualGdpBaselineBillionUsd: 370,
    projectedGdpLossBillionUsd: 6.2,
    gdpLossPercent: 1.68,
    infrastructureRepairBillionUsd: 1.8,
    dailyTradeLossMillionUsd: 24,
    haltedShippingTeu: 18500,
    recoveryMonths: 20
  },
  SRI_LANKA: {
    regionId: 'SRI_LANKA',
    regionName: 'Sri Lanka (Colombo & Galle)',
    flag: '🇱🇰',
    annualGdpBaselineBillionUsd: 85,
    projectedGdpLossBillionUsd: 3.0,
    gdpLossPercent: 3.53,
    infrastructureRepairBillionUsd: 0.9,
    dailyTradeLossMillionUsd: 13,
    haltedShippingTeu: 12000,
    recoveryMonths: 16
  }
};

export interface InfrastructureRoiProject {
  id: string;
  projectName: string;
  location: string;
  countryFlag: string;
  capexBillionUsd: number;
  tenYearAvoidedLossBillionUsd: number;
  roiRatioMultiplier: number;
  netSavingsBillionUsd: number;
  status: 'PRIORITY_EXECUTION' | 'UNDER_CONSTRUCTION' | 'PLANNED';
  coordinates: string;
}

export const INFRASTRUCTURE_ROI_MAPS: InfrastructureRoiProject[] = [
  {
    id: 'ROI-01',
    projectName: 'Sundarbans Estuarine Tidal Surge Barrier',
    location: 'West Bengal & Chittagong Outer Shelf',
    countryFlag: '🇧🇩🇮🇳',
    capexBillionUsd: 1.25,
    tenYearAvoidedLossBillionUsd: 15.4,
    roiRatioMultiplier: 12.3,
    netSavingsBillionUsd: 14.15,
    status: 'PRIORITY_EXECUTION',
    coordinates: '21.8° N, 89.2° E'
  },
  {
    id: 'ROI-02',
    projectName: 'JNPT Nhava Sheva Deepwater Storm Barrier',
    location: 'Mumbai Outer Anchorage (Maharashtra)',
    countryFlag: '🇮🇳',
    capexBillionUsd: 0.85,
    tenYearAvoidedLossBillionUsd: 9.2,
    roiRatioMultiplier: 10.8,
    netSavingsBillionUsd: 8.35,
    status: 'PRIORITY_EXECUTION',
    coordinates: '18.9° N, 72.9° E'
  },
  {
    id: 'ROI-03',
    projectName: 'Colombo Container Terminal Breakwater Extension',
    location: 'Colombo South Harbour',
    countryFlag: '🇱🇰',
    capexBillionUsd: 0.62,
    tenYearAvoidedLossBillionUsd: 5.4,
    roiRatioMultiplier: 8.7,
    netSavingsBillionUsd: 4.78,
    status: 'UNDER_CONSTRUCTION',
    coordinates: '6.9° N, 79.8° E'
  },
  {
    id: 'ROI-04',
    projectName: 'Karachi Port Qasim Channel Protection Dyke',
    location: 'Indus Delta Entrance',
    countryFlag: '🇵🇰',
    capexBillionUsd: 0.48,
    tenYearAvoidedLossBillionUsd: 3.9,
    roiRatioMultiplier: 8.1,
    netSavingsBillionUsd: 3.42,
    status: 'PLANNED',
    coordinates: '24.8° N, 67.1° E'
  },
  {
    id: 'ROI-05',
    projectName: 'Kamarajar Ennore Thermal Seawall Shield',
    location: 'Coromandel Coast (Tamil Nadu)',
    countryFlag: '🇮🇳',
    capexBillionUsd: 0.52,
    tenYearAvoidedLossBillionUsd: 4.8,
    roiRatioMultiplier: 9.2,
    netSavingsBillionUsd: 4.28,
    status: 'UNDER_CONSTRUCTION',
    coordinates: '13.2° N, 80.3° E'
  }
];

export const REGIONAL_GDP_FORECAST_TIMELINE = [
  { year: '2026', UnmitigatedGdpTrillion: 4.25, MitigatedGdpTrillion: 4.25, ClimatePenaltyPercent: -1.09 },
  { year: '2027', UnmitigatedGdpTrillion: 4.38, MitigatedGdpTrillion: 4.52, ClimatePenaltyPercent: -1.45 },
  { year: '2028', UnmitigatedGdpTrillion: 4.49, MitigatedGdpTrillion: 4.81, ClimatePenaltyPercent: -1.88 },
  { year: '2029', UnmitigatedGdpTrillion: 4.58, MitigatedGdpTrillion: 5.12, ClimatePenaltyPercent: -2.35 },
  { year: '2030', UnmitigatedGdpTrillion: 4.65, MitigatedGdpTrillion: 5.48, ClimatePenaltyPercent: -2.95 }
];

export const SouthAsiaEconomicImpactDashboard: React.FC = () => {
  const [severity, setSeverity] = useState<ClimateEventSeverity>('CAT5_SUPER_CYCLONE');
  const [selectedRegionKey, setSelectedRegionKey] = useState<SouthAsiaRegionFilter>('ALL_SOUTH_ASIA');
  const [tradeScenario, setTradeScenario] = useState<TradeScenarioMode>('PORT_LOCKOUT');
  const [liveTickerLossUsd, setLiveTickerLossUsd] = useState<number>(14820500);
  const [copiedBulletin, setCopiedBulletin] = useState(false);
  const [alertBroadcastSent, setAlertBroadcastSent] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'SCENARIOS' | 'ROI_MAPS' | 'GDP_FORECAST' | 'DISRUPTION_ALERT'>('SCENARIOS');

  const regionData = SOUTH_ASIA_GDP_BASELINE[selectedRegionKey];

  // Severity Multiplier
  const severityMultiplier = 
    severity === 'CAT1_STORM' ? 0.35 :
    severity === 'CAT3_SEVERE_CYCLONE' ? 0.70 :
    severity === 'CAT5_SUPER_CYCLONE' ? 1.00 : 1.75;

  // Trade Scenario Multiplier
  const scenarioTradeMultiplier = 
    tradeScenario === 'NORMAL_OPS' ? 0.2 :
    tradeScenario === 'PORT_LOCKOUT' ? 1.0 :
    tradeScenario === 'STRAIT_DIVERTED' ? 1.54 : 2.40;

  const adjustedGdpLoss = (regionData.projectedGdpLossBillionUsd * severityMultiplier).toFixed(2);
  const adjustedRepairCost = (regionData.infrastructureRepairBillionUsd * severityMultiplier).toFixed(2);
  const adjustedTradeLoss = (regionData.dailyTradeLossMillionUsd * severityMultiplier * scenarioTradeMultiplier).toFixed(1);
  const adjustedHaltedTeu = Math.round(regionData.haltedShippingTeu * severityMultiplier * scenarioTradeMultiplier);
  const adjustedGdpPercent = (regionData.gdpLossPercent * severityMultiplier).toFixed(2);

  // Live Ticker Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTickerLossUsd((prev) => prev + Math.floor(Math.random() * 450) + 120);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyBulletin = () => {
    const summary = `[SOUTH ASIA ECONOMIC IMPACT ASSESSMENT] Scenario: ${tradeScenario} | Event: ${severity} | Region: ${regionData.regionName}. Projected GDP Loss: $${adjustedGdpLoss}B USD (${adjustedGdpPercent}%). Infrastructure Repair: $${adjustedRepairCost}B USD. Daily Trade Loss: $${adjustedTradeLoss}M USD/day (${adjustedHaltedTeu.toLocaleString()} TEUs halted).`;
    navigator.clipboard.writeText(summary);
    setCopiedBulletin(true);
    setTimeout(() => setCopiedBulletin(false), 3000);
  };

  const handleTriggerDisruptionAlert = () => {
    setAlertBroadcastSent(true);
    setTimeout(() => setAlertBroadcastSent(false), 5000);
  };

  const handleExportAssessmentReport = () => {
    const data = {
      reportTitle: `South Asian Climate Economic & Trade Impact Assessment`,
      generatedAt: new Date().toISOString(),
      parameters: {
        severity,
        tradeScenario,
        selectedRegion: regionData
      },
      metrics: {
        projectedGdpLossBillionUsd: adjustedGdpLoss,
        infrastructureRepairBillionUsd: adjustedRepairCost,
        dailyTradeLossMillionUsd: adjustedTradeLoss,
        haltedShippingTeu: adjustedHaltedTeu,
        gdpLossPercent: adjustedGdpPercent
      },
      infrastructureRoiMaps: INFRASTRUCTURE_ROI_MAPS,
      regionalGdpForecastTimeline: REGIONAL_GDP_FORECAST_TIMELINE
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `south_asia_economic_impact_report_${Date.now()}.json`;
    a.click();
    setExportSuccessMsg(`✅ Official South Asia Climate Economic Impact Report Exported.`);
    setTimeout(() => setExportSuccessMsg(null), 4000);
  };

  return (
    <div id="south-asia-economic-impact-dashboard" className="bg-slate-950 border border-emerald-500/50 rounded-2xl p-6 text-white space-y-6 font-mono shadow-2xl animate-fadeIn">
      {/* TOP HEADER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
              REAL-TIME MACRO-ECONOMIC RISK ENGINE
            </span>
            <span className="text-[10px] text-slate-400">LIVE TICKER: ${liveTickerLossUsd.toLocaleString()} USD LOSS</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1.5 flex items-center space-x-2">
            <span>South Asian Climate Economic Impact Dashboard</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1 max-w-3xl">
            Simulated GDP loss projections, trade scenarios, infrastructure ROI maps, regional GDP forecasts, and real-time trade disruption alerts across South Asian coastal maritime zones.
          </p>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'SCENARIOS', label: '🚢 Trade Scenarios' },
            { id: 'ROI_MAPS', label: '🏗️ Infrastructure ROI' },
            { id: 'GDP_FORECAST', label: '📈 GDP Forecast' },
            { id: 'DISRUPTION_ALERT', label: '⚠️ Disruption Alert' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTROLS ROW: SEVERITY & REGION FILTER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
        {/* SEVERITY SELECTOR */}
        <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-slate-400 font-bold block uppercase">EVENT SEVERITY:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'CAT1_STORM', label: '🌤️ Cat 1 Monsoon Storm' },
              { id: 'CAT3_SEVERE_CYCLONE', label: '🌀 Cat 3 Severe Cyclone' },
              { id: 'CAT5_SUPER_CYCLONE', label: '💥 Cat 5 Super Cyclone' },
              { id: 'MEGATHRUST_TSUNAMI', label: '⚡ Megathrust Tsunami' }
            ].map((sev) => (
              <button
                key={sev.id}
                onClick={() => setSeverity(sev.id as ClimateEventSeverity)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  severity === sev.id
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {sev.label}
              </button>
            ))}
          </div>
        </div>

        {/* REGION FILTER */}
        <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-slate-400 font-bold block uppercase">SOUTH ASIAN REGION:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {(Object.keys(SOUTH_ASIA_GDP_BASELINE) as SouthAsiaRegionFilter[]).map((key) => {
              const item = SOUTH_ASIA_GDP_BASELINE[key];
              const isSelected = selectedRegionKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRegionKey(key)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {item.flag} {item.regionName.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* KEY MACRO-ECONOMIC METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-rose-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block">PROJECTED GDP LOSS</span>
          <strong className="text-rose-400 text-2xl font-black block">${adjustedGdpLoss} Billion</strong>
          <span className="text-[10px] text-slate-500 font-sans block">{adjustedGdpPercent}% of Annual Regional Baseline</span>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block">INFRASTRUCTURE REPAIR</span>
          <strong className="text-amber-400 text-2xl font-black block">${adjustedRepairCost} Billion</strong>
          <span className="text-[10px] text-slate-500 font-sans block">Seaports, Bridges, Grids &amp; Dykes</span>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-2xl border border-cyan-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block">DAILY MARITIME TRADE LOSS</span>
          <strong className="text-cyan-400 text-2xl font-black block">${adjustedTradeLoss} Million/day</strong>
          <span className="text-[10px] text-slate-500 font-sans block">Demurrage &amp; Supply Chain Delays</span>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-2xl border border-purple-500/40 space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase block">HALTED FREIGHT VOLUME</span>
          <strong className="text-purple-400 text-2xl font-black block">{adjustedHaltedTeu.toLocaleString()} TEUs/day</strong>
          <span className="text-[10px] text-slate-500 font-sans block">Estimated Recovery: {regionData.recoveryMonths} Months</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TRADE SCENARIOS SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'SCENARIOS' && (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-5 text-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <strong className="text-amber-400 font-bold flex items-center space-x-2 text-sm">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>TRADE SCENARIOS SIMULATOR</span>
              </strong>
              <p className="text-slate-400 text-[11px] font-sans mt-0.5">
                Simulate supply chain bottlenecks, container tariffs, demurrage fees, and route diversions across South Asian maritime corridors.
              </p>
            </div>

            {/* TRADE SCENARIO MODE SELECTOR */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {[
                { id: 'NORMAL_OPS', label: '🟢 Normal Operations' },
                { id: 'PORT_LOCKOUT', label: '⚠️ Port Berth Lockout' },
                { id: 'STRAIT_DIVERTED', label: '🌀 Malacca Diverted (+54% Surcharge)' },
                { id: 'TOTAL_BLOCKADE', label: '⛔ Total Coastal Blockade' }
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setTradeScenario(sc.id as TradeScenarioMode)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    tradeScenario === sc.id
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">CONTAINER DEMURRAGE PENALTY</span>
              <strong className="text-rose-400 text-lg font-black block">${(parseFloat(adjustedTradeLoss) * 0.45).toFixed(1)}M USD / day</strong>
              <span className="text-slate-500 font-sans text-[11px]">Incurred by 48+ delayed container liners at outer anchorage</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">FREIGHT TARIFF SURCHARGE</span>
              <strong className="text-amber-400 text-lg font-black block">+${(scenarioTradeMultiplier * 420).toFixed(0)} USD / TEU</strong>
              <span className="text-slate-500 font-sans text-[11px]">War &amp; Climate Risk Surcharge added to Rotterdam/East Asia routes</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">TRANSIT DELAY TIME</span>
              <strong className="text-cyan-400 text-lg font-black block">+{(scenarioTradeMultiplier * 8.5).toFixed(1)} Days Transit Lead</strong>
              <span className="text-slate-500 font-sans text-[11px]">Rerouting around Sri Lanka / Andaman Sea shipping lanes</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INFRASTRUCTURE ROI MAPS */}
      {/* ========================================================================= */}
      {activeTab === 'ROI_MAPS' && (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
            <strong className="text-cyan-400 font-bold flex items-center space-x-2 text-sm">
              <Building className="w-4 h-4 text-cyan-400" />
              <span>CLIMATE ADAPTATION INFRASTRUCTURE ROI MAPS</span>
            </strong>
            <span className="text-slate-400 text-[10px]">10-Year Avoided Loss Ratio Analysis</span>
          </div>

          <div className="space-y-2.5">
            {INFRASTRUCTURE_ROI_MAPS.map((project) => (
              <div key={project.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{project.countryFlag}</span>
                    <strong className="text-white text-sm font-bold">{project.projectName}</strong>
                    <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-mono">
                      📍 {project.coordinates}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] font-sans">{project.location}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 shrink-0 text-right font-mono">
                  <div>
                    <span className="text-slate-500 text-[9px] block uppercase font-bold">CAPEX</span>
                    <strong className="text-slate-300 text-xs">${project.capexBillionUsd}B USD</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[9px] block uppercase font-bold">10-YR AVOIDED LOSS</span>
                    <strong className="text-emerald-400 text-xs">${project.tenYearAvoidedLossBillionUsd}B USD</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[9px] block uppercase font-bold">ROI MULTIPLIER</span>
                    <strong className="text-amber-400 text-sm font-black">{project.roiRatioMultiplier}x ROI</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: REGIONAL GDP FORECAST */}
      {/* ========================================================================= */}
      {activeTab === 'GDP_FORECAST' && (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
            <strong className="text-emerald-400 font-bold flex items-center space-x-2 text-sm">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>REGIONAL GDP GROWTH &amp; CLIMATE MITIGATION FORECAST (2026–2030)</span>
            </strong>
            <span className="text-slate-400 text-[10px]">Trillion USD Baseline</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={REGIONAL_GDP_FORECAST_TIMELINE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981', borderRadius: '0.75rem', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="UnmitigatedGdpTrillion" name="Unmitigated GDP ($ Trillion)" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="MitigatedGdpTrillion" name="Mitigated Adaptation GDP ($ Trillion)" stroke="#10b981" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: TRADE DISRUPTION ALERT & EXPORT REPORT */}
      {/* ========================================================================= */}
      {activeTab === 'DISRUPTION_ALERT' && (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/40 space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <strong className="text-amber-400 font-bold flex items-center space-x-2 text-sm">
              <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>TRADE DISRUPTION ALERT BROADCAST SYSTEM</span>
            </strong>
            <span className="text-rose-400 font-mono font-bold">STATUS: CRITICAL BOTTLENECK</span>
          </div>

          <p className="text-slate-300 font-sans text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed">
            "WARNING: Severe maritime trade bottleneck active in South Asian coastal sector ({regionData.regionName}). Daily trade disruption losses reaching <strong>${adjustedTradeLoss} Million USD/day</strong>. Estimated <strong>{adjustedHaltedTeu.toLocaleString()} TEUs</strong> stalled at outer berths. Recommend immediate diversion to deepwater anchorages."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleTriggerDisruptionAlert}
              disabled={alertBroadcastSent}
              className="py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all uppercase flex items-center space-x-1.5 disabled:opacity-50"
            >
              <span>📡 {alertBroadcastSent ? 'DISRUPTION ALERT BROADCAST SENT TO IMO & ECDIS' : 'PUSH TRADE DISRUPTION ALERT TO IMO & ECDIS'}</span>
            </button>

            <button
              onClick={handleCopyBulletin}
              className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
            >
              <span>{copiedBulletin ? '✓ COPIED' : '📋 COPY DISRUPTION BULLETIN'}</span>
            </button>
          </div>
        </div>
      )}

      {/* FOOTER ACTIONS: EXPORT REPORT */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-xs">
        <span className="text-slate-500 font-mono">ISO-20022 Financial Standard Climate Compliance</span>
        <button
          onClick={handleExportAssessmentReport}
          className="py-2.5 px-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT CLIMATE IMPACT REPORT (JSON)</span>
        </button>
      </div>

      {exportSuccessMsg && (
        <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 p-2.5 rounded-xl text-xs font-bold animate-fadeIn">
          {exportSuccessMsg}
        </div>
      )}
    </div>
  );
};
