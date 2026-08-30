import React, { useState } from 'react';
import {
  Landmark,
  Droplets,
  Compass,
  MapPin,
  Waves,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Printer,
  BookOpen,
  Info,
  Building2,
  Zap,
  ShieldCheck,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Share2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// Web Audio Haptic Feedback Utility
const playHaptic = (type: 'light' | 'medium' | 'success' | 'warning' = 'light') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'light') {
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'medium') {
      osc.frequency.setValueAtTime(580, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.06);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'warning') {
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (e) {
    // Ignore audio context restriction if user hasn't interacted yet
  }
};

interface CoastalNode {
  id: string;
  name: string;
  location: string;
  seaBody: 'Bay of Bengal' | 'Arabian Sea';
  designedCapacityMld: number;
  estCapexCroresInr: number;
  targetBeneficiaries: string;
  cauveryOffsetTmc: number;
  pipelineLengthKm: number;
  elevationLiftMeters: number;
  description: string;
  keyHighlight: string;
}

const COASTAL_DESAL_NODES: CoastalNode[] = [
  {
    id: 'NODE-CHENNAI',
    name: 'Chennai Metropolitan SWRO Megacluster',
    location: 'Nemmeli & Minjur, Tamil Nadu',
    seaBody: 'Bay of Bengal',
    designedCapacityMld: 550,
    estCapexCroresInr: 4800,
    targetBeneficiaries: 'Greater Chennai City, Industrial Parks & Domestic Grid',
    cauveryOffsetTmc: 7.1,
    pipelineLengthKm: 42,
    elevationLiftMeters: 25,
    description: 'Deploys large-scale Sea Water Reverse Osmosis (SWRO) along the Chennai coast. Offsets city municipal reliance on Veeranam tank & Cauvery river transfers, allowing freshwater to stay in agricultural rivers.',
    keyHighlight: 'Replaces ~7.1 TMC/year of freshwater diversion from Cauvery basin dams.'
  },
  {
    id: 'NODE-CUDDALORE',
    name: 'Cuddalore-Nagapattinam Delta Grid Node',
    location: 'Coastal Cuddalore / Nagapattinam, Tamil Nadu',
    seaBody: 'Bay of Bengal',
    designedCapacityMld: 400,
    estCapexCroresInr: 3500,
    targetBeneficiaries: 'Tanjore Delta Coastal Districts & Industrial Chemical Hubs',
    cauveryOffsetTmc: 5.2,
    pipelineLengthKm: 85,
    elevationLiftMeters: 18,
    description: 'Supplies high-purity desalinated water to coastal power stations, chemical hubs, and towns, while creating a barrier injection stream against sea water intrusion into delta farmland.',
    keyHighlight: 'Protects delta agricultural groundwater from seawater contamination during lean monsoon seasons.'
  },
  {
    id: 'NODE-KARAIKAL',
    name: 'Karaikal Tail-End Emergency Desalination Station',
    location: 'Karaikal, Puducherry Union Territory',
    seaBody: 'Bay of Bengal',
    designedCapacityMld: 100,
    estCapexCroresInr: 920,
    targetBeneficiaries: 'Karaikal Domestic Towns & Agricultural Border Villages',
    cauveryOffsetTmc: 1.3,
    pipelineLengthKm: 15,
    elevationLiftMeters: 10,
    description: 'Addresses chronic tail-end water shortages in the Cauvery delta where river flow dries up before reaching Puducherry coastal territory.',
    keyHighlight: 'Guarantees 100% year-round municipal drinking water security regardless of river flow disputes.'
  },
  {
    id: 'NODE-MANGALORE',
    name: 'Mangalore-Udupi Arabian Sea Desalination Station',
    location: 'Mangalore Coast, Karnataka',
    seaBody: 'Arabian Sea',
    designedCapacityMld: 250,
    estCapexCroresInr: 2200,
    targetBeneficiaries: 'Mangalore Refineries, Petrochemicals & Coastal Urban Belt',
    cauveryOffsetTmc: 3.2,
    pipelineLengthKm: 30,
    elevationLiftMeters: 45,
    description: 'Provides industrial water directly from the Arabian Sea to refineries and factories. Prevents upstream river diversion, keeping Western Ghats freshwater flowing into Karnataka river networks.',
    keyHighlight: 'Frees up inland freshwater for agriculture and Karnataka municipal reservoirs.'
  },
  {
    id: 'NODE-BLR-CONVEYANCE',
    name: 'Bengaluru-Mysuru High-Lift Desalination Conveyance Grid',
    location: 'Coast to Inland Plateau Pipeline Corridor',
    seaBody: 'Bay of Bengal',
    designedCapacityMld: 300,
    estCapexCroresInr: 6500,
    targetBeneficiaries: 'Bengaluru Metropolitan Area & Mysuru Industrial Corridor',
    cauveryOffsetTmc: 3.9,
    pipelineLengthKm: 280,
    elevationLiftMeters: 920,
    description: 'Feasibility model for pumping desalinated sea water from the Bay of Bengal coast up to the Deccan Plateau (920m elevation) powered by dedicated solar & wind microgrids.',
    keyHighlight: 'Protects IT & urban economy during severe El Niño droughts without depleting KRS Dam reserves.'
  }
];

export const CauveryDesalCaseStudyView: React.FC = () => {
  // Simulator Interactive States
  const [droughtSeverityPct, setDroughtSeverityPct] = useState<number>(35); // 0% to 60%
  const [tnDemandTmc, setTnDemandTmc] = useState<number>(177); // Supreme Court allocated baseline ~177.25 TMC
  const [kaReservoirStoragePct, setKaReservoirStoragePct] = useState<number>(60); // 20% to 100%
  const [desalDeploymentMld, setDesalDeploymentMld] = useState<number>(800); // 100 to 1600 MLD
  const [solarPpaEnabled, setSolarPpaEnabled] = useState<boolean>(true);

  // Selected Node State
  const [selectedNodeId, setSelectedNodeId] = useState<string>('NODE-CHENNAI');

  // FAQ Accordion State
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Calculations
  // Baseline natural flow shortfall during drought:
  // Baseline shortage increases with drought severity and low reservoir storage
  const rawDeficitTmc = Math.round(
    ((droughtSeverityPct / 100) * 85 + (1 - kaReservoirStoragePct / 100) * 45) * 10
  ) / 10; // e.g., 30-70 TMC deficit

  // 1 MLD for 365 days = 365,000 m³ = 0.00001289 TMC per year
  // 1000 MLD = ~12.89 TMC / year
  const desalAnnualTmc = Math.round((desalDeploymentMld * 365 * 1000 * 3.53147e-11) * 10) / 10;
  
  // Remaining deficit after desal offset
  const netDeficitTmc = Math.max(0, Math.round((rawDeficitTmc - desalAnnualTmc) * 10) / 10);

  // Dispute Risk Index (0 - 100%)
  const disputeRiskPct = Math.min(
    100,
    Math.max(10, Math.round((netDeficitTmc / Math.max(1, rawDeficitTmc)) * 100 * (1 + droughtSeverityPct / 100 * 0.4)))
  );

  // Cost per m3 calculation (INR & USD)
  // Baseline SWRO power = 3.2 kWh/m3. Grid tariff = INR 7.50/kWh. Solar PPA = INR 3.20/kWh.
  const powerCostPerM3 = solarPpaEnabled ? 3.2 * 3.20 : 3.2 * 7.50; // 10.24 vs 24.00 INR
  const opexCapexPerM3 = 28.50; // Membranes, chemicals, labor, maintenance
  const totalCostInrPerM3 = Math.round((powerCostPerM3 + opexCapexPerM3) * 100) / 100; // ~INR 38.74 to 52.50
  const totalCostUsdPerM3 = Math.round((totalCostInrPerM3 / 84) * 100) / 100; // ~$0.46 to $0.62 / m3

  const activeNode = COASTAL_DESAL_NODES.find((n) => n.id === selectedNodeId) || COASTAL_DESAL_NODES[0];

  // PDF Export Trigger
  const handlePrintPdfReport = () => {
    playHaptic('success');
    const printWindow = window.open('', '_blank', 'width=950,height=900');
    if (!printWindow) {
      alert('Please allow popups to generate and print the Cauvery Basin Desalination Feasibility Report.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cauvery River Basin Water Dispute & Coastal Desalination Feasibility Report</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; padding: 20px; line-height: 1.5; }
            .header { border-bottom: 3px solid #0284c7; padding-bottom: 15px; margin-bottom: 20px; }
            .title { font-size: 20px; font-weight: 900; color: #0f172a; text-transform: uppercase; }
            .subtitle { font-size: 12px; color: #0284c7; font-weight: 700; margin-top: 4px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 15px 0; }
            .card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px; font-size: 11px; }
            .card strong { display: block; font-size: 14px; color: #0369a1; margin-top: 4px; }
            h2 { font-size: 13px; font-weight: 800; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 20px; text-transform: uppercase; color: #334155; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10px; }
            th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
            th { background: #f1f5f9; font-weight: 800; }
            .callout { background: #e0f2fe; border-left: 4px solid #0284c7; padding: 10px; border-radius: 4px; font-size: 11px; margin-top: 15px; }
            .footer { margin-top: 30px; font-size: 9px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px; }
            .btn-print { background: #0284c7; color: white; padding: 8px 16px; border: none; font-weight: bold; border-radius: 6px; cursor: pointer; float: right; }
            @media print { .btn-print { display: none; } }
          </style>
        </head>
        <body>
          <button class="btn-print" onclick="window.print()">🖨️ Print PDF</button>
          <div class="header">
            <div class="title">Cauvery River Basin Water Dispute & Coastal Desalination Feasibility Study</div>
            <div class="subtitle">Educational & Public Policy Engineering Brief • South India Water Security Portal</div>
          </div>

          <div class="grid">
            <div class="card">
              <span>Simulated Drought Severity Index</span>
              <strong>${droughtSeverityPct}% (El Niño Condition)</strong>
            </div>
            <div class="card">
              <span>Upstream Reservoir Retention (KRS/Kabini)</span>
              <strong>${kaReservoirStoragePct}% Storage</strong>
            </div>
            <div class="card">
              <span>Simulated Coastal SWRO Deployment</span>
              <strong>${desalDeploymentMld} MLD (${desalAnnualTmc} TMC/year)</strong>
            </div>
            <div class="card">
              <span>Inter-State Conflict Risk Reduction</span>
              <strong>From High to ${disputeRiskPct < 35 ? 'LOW / PEACEFUL' : disputeRiskPct < 65 ? 'MODERATE' : 'ELEVATED'} (${disputeRiskPct}% Risk Score)</strong>
            </div>
          </div>

          <h2>1. Water Deficit & SWRO Offset Summary</h2>
          <div class="callout">
            <strong>Key Insight:</strong> By deploying ${desalDeploymentMld} MLD of coastal SWRO along the Tamil Nadu & Karnataka coastlines, ${desalAnnualTmc} TMC of non-river water is created per year. This offsets ${Math.round((desalAnnualTmc / Math.max(1, rawDeficitTmc)) * 100)}% of the predicted drought water deficit, preserving natural river flow for agricultural irrigation in the Cauvery Delta.
          </div>

          <h2>2. Strategic Coastal Desalination Grid Nodes</h2>
          <table>
            <thead>
              <tr>
                <th>Node Name</th>
                <th>Location</th>
                <th>Capacity (MLD)</th>
                <th>Cauvery River Offset</th>
                <th>Estimated CAPEX</th>
              </tr>
            </thead>
            <tbody>
              ${COASTAL_DESAL_NODES.map(
                (n) => `
                <tr>
                  <td><strong>${n.name}</strong></td>
                  <td>${n.location} (${n.seaBody})</td>
                  <td>${n.designedCapacityMld} MLD</td>
                  <td>${n.cauveryOffsetTmc} TMC/yr</td>
                  <td>₹${n.estCapexCroresInr.toLocaleString()} Cr</td>
                </tr>
              `
              ).join('')}
            </tbody>
          </table>

          <h2>3. Economic Feasibility & Solar Energy Integration</h2>
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Solar PPA Integration (${solarPpaEnabled ? 'ACTIVE' : 'INACTIVE'})</th>
                <th>Standard Grid Power Tariff</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Power Cost per m³</td>
                <td>₹${(3.2 * 3.20).toFixed(2)} ($0.12 USD)</td>
                <td>₹${(3.2 * 7.50).toFixed(2)} ($0.29 USD)</td>
              </tr>
              <tr>
                <td>Total Cost per m³ (LCOW)</td>
                <td><strong>₹${totalCostInrPerM3.toFixed(2)} ($${totalCostUsdPerM3.toFixed(2)} USD)</strong></td>
                <td>₹${(24.00 + opexCapexPerM3).toFixed(2)} ($${((24.00 + opexCapexPerM3) / 84).toFixed(2)} USD)</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            Ocean Desalination & Engineering Research Portal • Cauvery Basin Case Study Brief • Generated on ${new Date().toLocaleDateString()}
          </div>
          <script>
            window.onload = function() { setTimeout(function() { window.print(); }, 400); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Case Study Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-cyan-950 border-2 border-cyan-500/40 p-6 sm:p-8">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black font-mono uppercase tracking-wider flex items-center space-x-1">
                <Landmark className="w-3.5 h-3.5 text-cyan-400" />
                <span>SOUTH INDIA WATER SECURITY &amp; PUBLIC POLICY CASE STUDY</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black font-mono uppercase tracking-wider flex items-center space-x-1">
                <Waves className="w-3.5 h-3.5 text-emerald-400" />
                <span>CAUVERY RIVER BASIN &amp; COASTAL DESAL ALTERNATIVES</span>
              </span>
            </div>

            <button
              onClick={handlePrintPdfReport}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all scale-100 hover:scale-[1.03]"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>EXPORT CASE STUDY PDF</span>
            </button>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
              <Compass className="w-7 h-7 text-cyan-400 shrink-0" />
              <span>Cauvery Basin Water Dispute &amp; Coastal Ocean Desalination Solution</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-4xl leading-relaxed">
              An educational &amp; professional research module designed for public citizens, engineers, and policy planners. Explores how deploying Sea Water Reverse Osmosis (SWRO) along the Bay of Bengal (Tamil Nadu / Puducherry) and Arabian Sea (Karnataka) creates net-new freshwater to substitute river abstraction—replacing inter-state water sharing conflicts with sustainable ocean water security.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">River Basin Area</span>
              <strong className="text-white text-sm">81,155 km²</strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Basin Population</span>
              <strong className="text-cyan-300 text-sm">~35+ Million</strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Drought Deficit Range</span>
              <strong className="text-amber-300 text-sm">25 to 70 TMC/yr</strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Coastal Desal Potential</span>
              <strong className="text-emerald-300 text-sm">1,600+ MLD</strong>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Interactive Water Deficit & Inter-State Conflict Risk Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-black text-white font-mono">
                1. INTERACTIVE CAUVERY BASIN WATER DEFICIT &amp; DESAL OFFSET SIMULATOR
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Simulate how varying monsoon rainfall, reservoir levels, and coastal SWRO capacities impact river deficits and resolve inter-state dispute risks.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold self-start sm:self-auto">
            LIVE SIMULATION ENGINE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5 p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="font-mono font-black text-xs text-slate-300 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Hydrological &amp; Infrastructure Controls</span>
            </h4>

            {/* Slider 1: Drought Severity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Monsoon Drought Severity:</span>
                <strong className={droughtSeverityPct > 40 ? 'text-rose-400' : 'text-amber-300'}>
                  {droughtSeverityPct}% {droughtSeverityPct > 40 ? '(El Niño Drought)' : '(Moderate Shortfall)'}
                </strong>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={droughtSeverityPct}
                onChange={(e) => {
                  setDroughtSeverityPct(Number(e.target.value));
                  playHaptic('light');
                }}
                className="w-full accent-cyan-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0% (Normal Monsoon)</span>
                <span>30%</span>
                <span>60% (Severe Drought)</span>
              </div>
            </div>

            {/* Slider 2: Upstream Karnataka Reservoir Storage */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Upstream Reservoir Storage (KRS/Kabini):</span>
                <strong className="text-cyan-300">{kaReservoirStoragePct}% Storage</strong>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={kaReservoirStoragePct}
                onChange={(e) => {
                  setKaReservoirStoragePct(Number(e.target.value));
                  playHaptic('light');
                }}
                className="w-full accent-blue-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20% (Low Storage)</span>
                <span>60%</span>
                <span>100% (Full Storage)</span>
              </div>
            </div>

            {/* Slider 3: Proposed Coastal Desal Infrastructure Deployment */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Deployed Coastal SWRO Capacity:</span>
                <strong className="text-emerald-400 font-bold">{desalDeploymentMld} MLD</strong>
              </div>
              <input
                type="range"
                min={100}
                max={1600}
                step={100}
                value={desalDeploymentMld}
                onChange={(e) => {
                  setDesalDeploymentMld(Number(e.target.value));
                  playHaptic('medium');
                }}
                className="w-full accent-emerald-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>100 MLD</span>
                <span>800 MLD</span>
                <span>1,600 MLD (~20.6 TMC/yr)</span>
              </div>
            </div>

            {/* Solar PPA Power Integration Toggle */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <Zap className={`w-4 h-4 ${solarPpaEnabled ? 'text-amber-400' : 'text-slate-500'}`} />
                <div>
                  <span className="text-white block font-bold">Solar &amp; Offshore Wind PPA</span>
                  <span className="text-[10px] text-slate-400">Lowers tariff from ₹7.50 to ₹3.20/kWh</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSolarPpaEnabled(!solarPpaEnabled);
                  playHaptic('light');
                }}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                  solarPpaEnabled
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                {solarPpaEnabled ? 'ENABLED' : 'GRID ONLY'}
              </button>
            </div>
          </div>

          {/* Real-time Output Metrics & Visualizer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: Estimated Annual Deficit */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Raw Basin Shortfall</span>
                <strong className="text-xl font-mono text-rose-400 block">{rawDeficitTmc} TMC</strong>
                <span className="text-[10px] text-slate-500 block font-sans">Natural river deficit during drought</span>
              </div>

              {/* Card 2: SWRO Desal Water Created */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 block uppercase">Coastal SWRO Offset</span>
                <strong className="text-xl font-mono text-emerald-300 block">{desalAnnualTmc} TMC/yr</strong>
                <span className="text-[10px] text-slate-500 block font-sans">
                  ({Math.round((desalDeploymentMld * 365) / 1000)} Million m³/yr created)
                </span>
              </div>

              {/* Card 3: Remaining Net Deficit */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Net River Shortfall</span>
                <strong className={`text-xl font-mono block ${netDeficitTmc === 0 ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {netDeficitTmc} TMC
                </strong>
                <span className="text-[10px] text-slate-500 block font-sans">
                  {netDeficitTmc === 0 ? '100% Deficit Solved by Desal!' : 'Remaining river deficit'}
                </span>
              </div>
            </div>

            {/* Inter-State Dispute Risk Gauge Bar */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Inter-State Dispute Vulnerability Score:</span>
                </span>
                <strong
                  className={`px-3 py-1 rounded-full border text-xs ${
                    disputeRiskPct < 35
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : disputeRiskPct < 65
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {disputeRiskPct < 35
                    ? 'LOW (PEACEFUL BASIN BALANCE)'
                    : disputeRiskPct < 65
                    ? 'MODERATE TENSION'
                    : 'HIGH INTER-STATE DISPUTE RISK'}
                </strong>
              </div>

              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    disputeRiskPct < 35 ? 'bg-emerald-400' : disputeRiskPct < 65 ? 'bg-amber-400' : 'bg-rose-500'
                  }`}
                  style={{ width: `${disputeRiskPct}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                {disputeRiskPct < 35
                  ? '✅ Deploying coastal SWRO creates sufficient non-river freshwater to meet municipal and industrial demands in coastal cities, enabling 100% of upstream river water to remain dedicated to agricultural irrigation in Tamil Nadu and Karnataka.'
                  : disputeRiskPct < 65
                  ? '⚠️ Coastal desalination offsets over half the water shortfall. Increasing SWRO capacity by 300 MLD would completely eliminate river water tension during dry seasons.'
                  : '🚨 High risk of river dispute due to severe drought and unmitigated urban abstraction from rivers. Expanding coastal ocean desalination is strongly recommended.'}
              </p>
            </div>

            {/* Levelized Cost of Water (LCOW) Economics */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white font-bold flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>Desalinated Water Levelized Cost (LCOW)</span>
                </span>
                <span className="text-[10px] text-slate-400">Includes CAPEX + OPEX + Power</span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Cost per Cubic Meter (m³)</span>
                  <strong className="text-cyan-300 text-base">₹{totalCostInrPerM3.toFixed(2)} / m³</strong>
                  <span className="text-[10px] text-slate-500 block">(${totalCostUsdPerM3.toFixed(2)} USD)</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Cost per Household (100 L/day)</span>
                  <strong className="text-emerald-300 text-base">
                    ₹{((totalCostInrPerM3 * 100 * 30) / 1000).toFixed(1)} / month
                  </strong>
                  <span className="text-[10px] text-slate-500 block">(Less than ₹4.00 per day)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Interactive Coastal Grid & Pipeline Network Node Explorer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-black text-white font-mono">
                2. SOUTH INDIA COASTAL DESALINATION &amp; PIPELINE GRID MAP
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Select key desalination plant nodes along the Bay of Bengal &amp; Arabian Sea coastlines to examine technical capacities and river relief impact.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold self-start sm:self-auto">
            5 STRATEGIC INFRASTRUCTURE NODES
          </span>
        </div>

        {/* Node Tabs Selector */}
        <div className="flex flex-wrap gap-2">
          {COASTAL_DESAL_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <button
                key={node.id}
                onClick={() => {
                  setSelectedNodeId(node.id);
                  playHaptic('light');
                }}
                className={`px-4 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{node.name.split(' ')[0]} Hub</span>
              </button>
            );
          })}
        </div>

        {/* Selected Node Details Card */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold">
                {activeNode.seaBody} Coastal Infrastructure
              </span>
              <h4 className="text-xl font-black text-white font-mono mt-1">{activeNode.name}</h4>
              <p className="text-xs text-slate-400 font-sans">{activeNode.location}</p>
            </div>

            <div className="flex items-center space-x-3 font-mono text-right">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Desal Capacity</span>
                <strong className="text-emerald-400 text-lg">{activeNode.designedCapacityMld} MLD</strong>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-[10px] text-slate-400 block uppercase">River Offset</span>
                <strong className="text-cyan-300 text-lg">{activeNode.cauveryOffsetTmc} TMC/yr</strong>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeNode.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Estimated CAPEX</span>
              <strong className="text-white text-sm">₹{activeNode.estCapexCroresInr.toLocaleString()} Crores</strong>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Conveyance Pipeline</span>
              <strong className="text-white text-sm">{activeNode.pipelineLengthKm} km Length</strong>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Elevation Static Lift</span>
              <strong className="text-white text-sm">{activeNode.elevationLiftMeters} meters</strong>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">Beneficiary Region</span>
              <strong className="text-cyan-300 text-xs truncate block">{activeNode.targetBeneficiaries}</strong>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30 text-xs text-emerald-200 font-sans flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-mono text-emerald-300 block mb-0.5">Hydrological Impact:</strong>
              <span>{activeNode.keyHighlight}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Educational Public Citizen Knowledge Base & Policy FAQ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-lg font-black text-white font-mono">
              3. PUBLIC CITIZEN EDUCATIONAL KNOWLEDGE BASE &amp; POLICY FAQ
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Clear, accessible scientific &amp; engineering answers for citizens, students, and civil society.
            </p>
          </div>
        </div>

        <div className="space-y-3 font-sans">
          {[
            {
              q: 'How does coastal ocean desalination resolve the inter-state Cauvery water dispute?',
              a: 'The Cauvery river dispute is fundamentally a zero-sum conflict: during monsoon droughts, whatever water upstream reservoirs release to downstream agriculture leaves less water for upstream cities like Bengaluru and Mysuru. Ocean desalination along the Bay of Bengal (Chennai/Cuddalore) and Arabian Sea (Mangalore) creates net-new freshwater from non-exhaustible sea water. When coastal cities and power plants switch to desalinated ocean water, hundreds of millions of liters of freshwater are preserved in river reservoirs for farmers in Tamil Nadu and Karnataka.'
            },
            {
              q: 'Is desalinated water expensive compared to traditional river dams?',
              a: 'Historically, desalinated water cost over ₹90/m³. However, modern Sea Water Reverse Osmosis (SWRO) with isobaric Energy Recovery Devices (ERD) and dedicated Solar PV power purchase agreements (PPAs) has reduced energy consumption to ~3.2 kWh/m³. This drops the cost of desalinated water to ~₹38–₹42 per 1,000 liters (kiloliter). Considering that constructing new dams requires thousands of acres of land acquisition, village displacement, and environmental forest clearing, coastal SWRO is highly cost-effective and rapidly deployable.'
            },
            {
              q: 'Does ocean desalination harm marine life in the Bay of Bengal or Arabian Sea?',
              a: 'Modern SWRO plants use strict environmental engineering standards: (1) Sub-sea intake velocity is kept under 0.15 meters/second, allowing fish and plankton to easily swim away. (2) Concentrated brine is returned to the ocean via multi-port diffuser nozzles located 1.5 to 2 km offshore in deep water, diluting brine back to ambient ocean salinity within meters without impacting marine ecology.'
            },
            {
              q: 'Can desalinated sea water be safely used for drinking and domestic cooking?',
              a: 'Yes. Desalinated water passes through multi-stage RO membranes that remove 99.8% of dissolved salts, bacteria, and minerals. Before being fed into municipal drinking grids, the water undergoes remineralization (adding calcium hydroxide and carbon dioxide) to meet Indian Standard BIS 10500 drinking water norms, ensuring optimal mineral taste and pipe corrosion protection.'
            },
            {
              q: 'How can public citizens support water security initiatives in South India?',
              a: 'Public citizens can advocate for hybrid municipal water grids (combining rainwater harvesting, treated wastewater reuse for industries, and coastal ocean desalination for drinking water), supporting renewable-powered desal plants to build a drought-proof future.'
            }
          ].map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => {
                    setExpandedFaqIndex(isExpanded ? null : idx);
                    playHaptic('light');
                  }}
                  className="w-full p-4 text-left font-mono text-xs sm:text-sm font-bold text-white flex items-center justify-between space-x-3 hover:bg-slate-900/60"
                >
                  <span className="flex items-center space-x-2 text-cyan-300">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-950">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
