import React, { useState, useMemo } from 'react';
import {
  Scale,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  Download,
  Copy,
  Check,
  RefreshCcw,
  Search,
  Filter,
  Layers,
  BarChart3,
  Compass,
  Zap,
  Info,
  ShieldCheck,
  Anchor,
  Activity,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ReferenceLine,
  Legend,
  Cell
} from 'recharts';

export interface CargoItem {
  id: string;
  description: string;
  category: 'CONTAINER' | 'BULK' | 'LIQUID_BALLAST' | 'HEAVY_LIFT' | 'HAZMAT_IMDG';
  location: 'HOLD_1' | 'HOLD_2' | 'HOLD_3' | 'HOLD_4' | 'DECK_FORWARD' | 'DECK_AFT' | 'PORT_TANK' | 'STBD_TANK';
  massMT: number;
  lcg: number; // Longitudinal distance from midship (meters, + for Forward, - for Aft)
  vcg: number; // Vertical distance above Keel (meters)
  tcg: number; // Transverse distance from centerline (meters, + for Starboard, - for Port)
  imdgClass?: string; // Optional IMDG code e.g. "Class 3 (Flammable Liquid)"
}

export interface VesselHydrostaticPreset {
  id: string;
  name: string;
  type: string;
  lightshipMassMT: number;
  lightshipLCG: number;
  lightshipVCG: number;
  lightshipTCG: number;
  kmMetacenterMeters: number;
  lcbMeters: number;
  mtcMetersPerTonne: number; // Moment to change trim 1 cm
  maxDraftMeters: number;
  maxDwtMT: number;
}

const VESSEL_PRESETS: VesselHydrostaticPreset[] = [
  {
    id: 'VESSEL-01',
    name: 'MV South Asia Express',
    type: '14,200 TEU Container Vessel',
    lightshipMassMT: 38500,
    lightshipLCG: -2.5,
    lightshipVCG: 11.2,
    lightshipTCG: 0.0,
    kmMetacenterMeters: 18.50,
    lcbMeters: -1.2,
    mtcMetersPerTonne: 1250,
    maxDraftMeters: 15.5,
    maxDwtMT: 122000
  },
  {
    id: 'VESSEL-02',
    name: 'MV Bengal Titan',
    type: '81,500 DWT Bulk Carrier',
    lightshipMassMT: 14200,
    lightshipLCG: 1.0,
    lightshipVCG: 7.8,
    lightshipTCG: 0.0,
    kmMetacenterMeters: 10.20,
    lcbMeters: 0.5,
    mtcMetersPerTonne: 680,
    maxDraftMeters: 14.5,
    maxDwtMT: 81500
  },
  {
    id: 'VESSEL-03',
    name: 'MT Arabian Voyager',
    type: '300,000 DWT VLCC Crude Tanker',
    lightshipMassMT: 42000,
    lightshipLCG: -0.8,
    lightshipVCG: 12.5,
    lightshipTCG: 0.0,
    kmMetacenterMeters: 21.40,
    lcbMeters: -0.4,
    mtcMetersPerTonne: 2100,
    maxDraftMeters: 20.2,
    maxDwtMT: 299800
  }
];

const INITIAL_MANIFEST: CargoItem[] = [
  {
    id: 'MF-101',
    description: 'Tier 1-3 ISO Dry Containers (General Cargo)',
    category: 'CONTAINER',
    location: 'HOLD_1',
    massMT: 12500,
    lcg: 45.0,
    vcg: 8.5,
    tcg: 0.2,
  },
  {
    id: 'MF-102',
    description: 'Grain & Heavy Steel Coils',
    category: 'BULK',
    location: 'HOLD_2',
    massMT: 18400,
    lcg: 22.0,
    vcg: 6.8,
    tcg: -0.1,
  },
  {
    id: 'MF-103',
    description: 'Reefer Containers & Dry Freight',
    category: 'CONTAINER',
    location: 'HOLD_3',
    massMT: 15200,
    lcg: -18.0,
    vcg: 9.2,
    tcg: 0.0,
  },
  {
    id: 'MF-104',
    description: 'Heavy Machinery & Mining Equipment',
    category: 'HEAVY_LIFT',
    location: 'HOLD_4',
    massMT: 9800,
    lcg: -42.0,
    vcg: 5.4,
    tcg: -0.3,
  },
  {
    id: 'MF-105',
    description: 'Port Double Bottom Ballast Water',
    category: 'LIQUID_BALLAST',
    location: 'PORT_TANK',
    massMT: 2200,
    lcg: 5.0,
    vcg: 1.8,
    tcg: -8.5,
  },
  {
    id: 'MF-106',
    description: 'Starboard Double Bottom Ballast Water',
    category: 'LIQUID_BALLAST',
    location: 'STBD_TANK',
    massMT: 2150,
    lcg: 5.0,
    vcg: 1.8,
    tcg: 8.5,
  },
  {
    id: 'MF-107',
    description: 'Class 3 Flammable Liquid Drums (IMDG)',
    category: 'HAZMAT_IMDG',
    location: 'DECK_FORWARD',
    massMT: 850,
    lcg: 58.0,
    vcg: 14.2,
    tcg: 1.2,
    imdgClass: 'Class 3 (Flammable Liquid)'
  }
];

export const CargoStabilityManifest: React.FC<{ isNightModeActive?: boolean }> = ({ isNightModeActive = false }) => {
  const [selectedVesselPreset, setSelectedVesselPreset] = useState<VesselHydrostaticPreset>(VESSEL_PRESETS[0]);
  const [manifestItems, setManifestItems] = useState<CargoItem[]>(INITIAL_MANIFEST);

  const [freeSurfaceMomentMTM, setFreeSurfaceMomentMTM] = useState<number>(1850); // Free surface moment (m-MT)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('ALL');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Form State for Adding / Editing Cargo Item
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [itemDescription, setItemDescription] = useState<string>('');
  const [itemCategory, setItemCategory] = useState<CargoItem['category']>('CONTAINER');
  const [itemLocation, setItemLocation] = useState<CargoItem['location']>('HOLD_1');
  const [itemMass, setItemMass] = useState<number>(1000);
  const [itemLcg, setItemLcg] = useState<number>(10.0);
  const [itemVcg, setItemVcg] = useState<number>(8.0);
  const [itemTcg, setItemTcg] = useState<number>(0.0);
  const [itemImdg, setItemImdg] = useState<string>('');

  // Default coordinate lookup helpers based on location
  const handleLocationChange = (loc: CargoItem['location']) => {
    setItemLocation(loc);
    switch (loc) {
      case 'HOLD_1': setItemLcg(45.0); setItemVcg(7.5); setItemTcg(0.0); break;
      case 'HOLD_2': setItemLcg(20.0); setItemVcg(7.0); setItemTcg(0.0); break;
      case 'HOLD_3': setItemLcg(-20.0); setItemVcg(7.0); setItemTcg(0.0); break;
      case 'HOLD_4': setItemLcg(-45.0); setItemVcg(7.5); setItemTcg(0.0); break;
      case 'DECK_FORWARD': setItemLcg(52.0); setItemVcg(14.0); setItemTcg(0.0); break;
      case 'DECK_AFT': setItemLcg(-52.0); setItemVcg(14.0); setItemTcg(0.0); break;
      case 'PORT_TANK': setItemLcg(0.0); setItemVcg(2.0); setItemTcg(-8.5); break;
      case 'STBD_TANK': setItemLcg(0.0); setItemVcg(2.0); setItemTcg(8.5); break;
    }
  };

  const handleOpenAddForm = () => {
    setEditingItemId(null);
    setItemDescription('');
    setItemCategory('CONTAINER');
    handleLocationChange('HOLD_1');
    setItemMass(1500);
    setItemImdg('');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (item: CargoItem) => {
    setEditingItemId(item.id);
    setItemDescription(item.description);
    setItemCategory(item.category);
    setItemLocation(item.location);
    setItemMass(item.massMT);
    setItemLcg(item.lcg);
    setItemVcg(item.vcg);
    setItemTcg(item.tcg);
    setItemImdg(item.imdgClass || '');
    setIsFormOpen(true);
  };

  const handleSaveCargoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemDescription.trim() || itemMass <= 0) return;

    if (editingItemId) {
      setManifestItems(prev => prev.map(it => it.id === editingItemId ? {
        ...it,
        description: itemDescription,
        category: itemCategory,
        location: itemLocation,
        massMT: itemMass,
        lcg: itemLcg,
        vcg: itemVcg,
        tcg: itemTcg,
        imdgClass: itemImdg.trim() || undefined
      } : it));
    } else {
      const newItem: CargoItem = {
        id: `MF-${Date.now().toString().slice(-4)}`,
        description: itemDescription,
        category: itemCategory,
        location: itemLocation,
        massMT: itemMass,
        lcg: itemLcg,
        vcg: itemVcg,
        tcg: itemTcg,
        imdgClass: itemImdg.trim() || undefined
      };
      setManifestItems(prev => [newItem, ...prev]);
    }

    setIsFormOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setManifestItems(prev => prev.filter(it => it.id !== id));
  };

  // --- HYDROSTATIC & STABILITY CALCULATIONS ---
  const stabilityCalculations = useMemo(() => {
    const cargoMassTotal = manifestItems.reduce((acc, curr) => acc + curr.massMT, 0);

    // Sum of Moments
    const longMomentCargo = manifestItems.reduce((acc, curr) => acc + (curr.massMT * curr.lcg), 0);
    const vertMomentCargo = manifestItems.reduce((acc, curr) => acc + (curr.massMT * curr.vcg), 0);
    const transMomentCargo = manifestItems.reduce((acc, curr) => acc + (curr.massMT * curr.tcg), 0);

    // Lightship moments
    const lsMass = selectedVesselPreset.lightshipMassMT;
    const longMomentLS = lsMass * selectedVesselPreset.lightshipLCG;
    const vertMomentLS = lsMass * selectedVesselPreset.lightshipVCG;
    const transMomentLS = lsMass * selectedVesselPreset.lightshipTCG;

    // Displacement (Total Vessel Weight)
    const totalDisplacement = lsMass + cargoMassTotal;

    // System Center of Gravity (CoG) coordinates: LCG, VCG (KG), TCG
    const lcg = (longMomentLS + longMomentCargo) / Math.max(totalDisplacement, 1);
    const vcg = (vertMomentLS + vertMomentCargo) / Math.max(totalDisplacement, 1); // Solid KG
    const tcg = (transMomentLS + transMomentCargo) / Math.max(totalDisplacement, 1);

    // Free surface correction (FSC) = FSM / Displacement
    const fsc = freeSurfaceMomentMTM / Math.max(totalDisplacement, 1);
    const fluidVCG = vcg + fsc; // Fluid KG

    // Metacentric Height (GM)
    const km = selectedVesselPreset.kmMetacenterMeters;
    const solidGM = km - vcg;
    const fluidGM = km - fluidVCG;

    // Longitudinal Trim (m) = Displacement * (LCG - LCB) / (MTC * 100)
    const lcb = selectedVesselPreset.lcbMeters;
    const mtc = selectedVesselPreset.mtcMetersPerTonne;
    const trimMomentMTM = totalDisplacement * (lcg - lcb);
    const trimMeters = trimMomentMTM / (mtc * 100);

    // Draft Estimates
    const baseDraft = 4.0 + (cargoMassTotal / selectedVesselPreset.maxDwtMT) * (selectedVesselPreset.maxDraftMeters - 4.0);
    const draftAft = baseDraft - (trimMeters / 2);
    const draftForward = baseDraft + (trimMeters / 2);

    // Transverse List Angle (Degrees)
    // tan(theta) = TCG / GM
    const listRad = Math.atan2(tcg, Math.max(fluidGM, 0.05));
    const listDeg = (listRad * 180) / Math.PI;

    // Bending Moment Stress Index (% of maximum)
    // Heavy loads at ends (Hold 1 / Hold 4) increase sagging/hogging stress
    const hold1And4Mass = manifestItems
      .filter(i => i.location === 'HOLD_1' || i.location === 'HOLD_4')
      .reduce((a, b) => a + b.massMT, 0);
    const bendingMomentPercent = Math.min(Math.round(45 + (hold1And4Mass / Math.max(cargoMassTotal, 1)) * 45), 100);

    return {
      cargoMassTotal,
      totalDisplacement,
      lcg,
      vcg,
      tcg,
      fsc,
      fluidVCG,
      solidGM,
      fluidGM,
      trimMeters,
      draftAft,
      draftForward,
      listDeg,
      bendingMomentPercent
    };
  }, [manifestItems, selectedVesselPreset, freeSurfaceMomentMTM]);

  // Hold-by-Hold Mass Breakdown for Chart
  const holdBreakdownChartData = useMemo(() => {
    const locations: CargoItem['location'][] = [
      'HOLD_1',
      'HOLD_2',
      'HOLD_3',
      'HOLD_4',
      'DECK_FORWARD',
      'DECK_AFT',
      'PORT_TANK',
      'STBD_TANK'
    ];

    const labelsMap: Record<CargoItem['location'], string> = {
      HOLD_1: 'Hold 1 (Fwd)',
      HOLD_2: 'Hold 2',
      HOLD_3: 'Hold 3',
      HOLD_4: 'Hold 4 (Aft)',
      DECK_FORWARD: 'Deck Fwd',
      DECK_AFT: 'Deck Aft',
      PORT_TANK: 'Port Ballast',
      STBD_TANK: 'Stbd Ballast'
    };

    return locations.map(loc => {
      const mass = manifestItems
        .filter(i => i.location === loc)
        .reduce((sum, item) => sum + item.massMT, 0);
      return {
        location: labelsMap[loc],
        massMT: mass,
        rawLoc: loc
      };
    });
  }, [manifestItems]);

  // GZ Stability Righting Arm Curve Data
  const gzCurveData = useMemo(() => {
    const data = [];
    const gm = Math.max(stabilityCalculations.fluidGM, 0.01);
    for (let deg = 0; deg <= 60; deg += 5) {
      const rad = (deg * Math.PI) / 180;
      // Approximate GZ formula: GZ = GM * sin(phi) + 0.5 * BM * tan^2(phi) * sin(phi)
      const gz = gm * Math.sin(rad) + 0.15 * Math.pow(Math.tan(rad / 1.5), 2) * Math.sin(rad);
      data.push({
        angle: `${deg}°`,
        degrees: deg,
        gzMeters: parseFloat(gz.toFixed(3)),
        minSolasLimit: deg <= 30 ? parseFloat((0.05 + deg * 0.005).toFixed(3)) : 0.20
      });
    }
    return data;
  }, [stabilityCalculations.fluidGM]);

  // Preset Load Scenario Handlers
  const handleApplyPresetScenario = (scenario: 'CONTAINER' | 'BULK' | 'UNBALANCED_LIST' | 'TRIM_STERN') => {
    if (scenario === 'CONTAINER') {
      setManifestItems([
        { id: 'MF-C1', description: 'Container Tier 1-4 Forward', category: 'CONTAINER', location: 'HOLD_1', massMT: 14500, lcg: 42.0, vcg: 8.5, tcg: 0.0 },
        { id: 'MF-C2', description: 'Container Tier 1-4 Midship', category: 'CONTAINER', location: 'HOLD_2', massMT: 18000, lcg: 15.0, vcg: 8.2, tcg: 0.0 },
        { id: 'MF-C3', description: 'Container Tier 1-4 Aft', category: 'CONTAINER', location: 'HOLD_3', massMT: 16500, lcg: -15.0, vcg: 8.2, tcg: 0.0 },
        { id: 'MF-C4', description: 'Engine Room Fuel Oil Tanks', category: 'LIQUID_BALLAST', location: 'HOLD_4', massMT: 8500, lcg: -40.0, vcg: 4.5, tcg: 0.0 },
      ]);
      setFreeSurfaceMomentMTM(1200);
    } else if (scenario === 'BULK') {
      setManifestItems([
        { id: 'MF-B1', description: 'Iron Ore Concentrate Hold 1', category: 'BULK', location: 'HOLD_1', massMT: 18000, lcg: 40.0, vcg: 5.5, tcg: 0.0 },
        { id: 'MF-B2', description: 'Iron Ore Concentrate Hold 2', category: 'BULK', location: 'HOLD_2', massMT: 22000, lcg: 12.0, vcg: 5.2, tcg: 0.0 },
        { id: 'MF-B3', description: 'Iron Ore Concentrate Hold 3', category: 'BULK', location: 'HOLD_3', massMT: 21000, lcg: -12.0, vcg: 5.2, tcg: 0.0 },
        { id: 'MF-B4', description: 'Iron Ore Concentrate Hold 4', category: 'BULK', location: 'HOLD_4', massMT: 16000, lcg: -40.0, vcg: 5.8, tcg: 0.0 },
      ]);
      setFreeSurfaceMomentMTM(800);
    } else if (scenario === 'UNBALANCED_LIST') {
      setManifestItems([
        { id: 'MF-L1', description: 'Heavy Steel Coils Port Side', category: 'HEAVY_LIFT', location: 'HOLD_2', massMT: 14000, lcg: 15.0, vcg: 6.0, tcg: -4.5 },
        { id: 'MF-L2', description: 'General Cargo Starboard', category: 'CONTAINER', location: 'HOLD_2', massMT: 6000, lcg: 15.0, vcg: 8.0, tcg: 3.0 },
        { id: 'MF-L3', description: 'Port Ballast Tank Empty', category: 'LIQUID_BALLAST', location: 'PORT_TANK', massMT: 200, lcg: 0.0, vcg: 1.5, tcg: -8.5 },
        { id: 'MF-L4', description: 'Starboard Ballast Tank Full', category: 'LIQUID_BALLAST', location: 'STBD_TANK', massMT: 3500, lcg: 0.0, vcg: 1.5, tcg: 8.5 },
      ]);
      setFreeSurfaceMomentMTM(2500);
    } else if (scenario === 'TRIM_STERN') {
      setManifestItems([
        { id: 'MF-T1', description: 'Light Cargo Forward Hold 1', category: 'CONTAINER', location: 'HOLD_1', massMT: 4000, lcg: 45.0, vcg: 9.0, tcg: 0.0 },
        { id: 'MF-T2', description: 'Heavy Ballast & Bunkers Aft Hold 4', category: 'LIQUID_BALLAST', location: 'HOLD_4', massMT: 24000, lcg: -42.0, vcg: 4.2, tcg: 0.0 },
      ]);
      setFreeSurfaceMomentMTM(1500);
    }
  };

  const handleCopyManifestSummary = () => {
    const summaryText = `
VESSEL CARGO STABILITY & MANIFEST REPORT
Vessel: ${selectedVesselPreset.name} (${selectedVesselPreset.type})
Total Displacement: ${stabilityCalculations.totalDisplacement.toLocaleString()} MT
Cargo Total Mass: ${stabilityCalculations.cargoMassTotal.toLocaleString()} MT

CENTER OF GRAVITY (CoG) COORDINATES:
- LCG (Longitudinal): ${stabilityCalculations.lcg.toFixed(2)} m (${stabilityCalculations.lcg >= 0 ? 'Fwd' : 'Aft'})
- VCG / Solid KG: ${stabilityCalculations.vcg.toFixed(2)} m
- Fluid VCG / Fluid KG: ${stabilityCalculations.fluidVCG.toFixed(2)} m (FSC: +${stabilityCalculations.fsc.toFixed(2)} m)
- TCG (Transverse): ${stabilityCalculations.tcg.toFixed(2)} m (${stabilityCalculations.tcg >= 0 ? 'Stbd' : 'Port'})

METACENTRIC STABILITY:
- Solid GM: ${stabilityCalculations.solidGM.toFixed(2)} m
- Corrected Fluid GM: ${stabilityCalculations.fluidGM.toFixed(2)} m (SOLAS Min: 0.15 m)
- List Angle: ${Math.abs(stabilityCalculations.listDeg).toFixed(1)}° (${stabilityCalculations.listDeg > 0 ? 'Starboard' : stabilityCalculations.listDeg < 0 ? 'Port' : 'Even Keel'})
- Trim: ${stabilityCalculations.trimMeters.toFixed(2)} m (${stabilityCalculations.trimMeters > 0 ? 'By Bow' : 'By Stern'})
- Estimated Drafts: Fwd ${stabilityCalculations.draftForward.toFixed(2)} m | Aft ${stabilityCalculations.draftAft.toFixed(2)} m
- Hull Bending Stress: ${stabilityCalculations.bendingMomentPercent}% of Max

STATUS: ${stabilityCalculations.fluidGM >= 0.15 ? 'COMPLIANT WITH SOLAS INTACT STABILITY CODE' : 'NON-COMPLIANT (CRITICAL TENDER GM)'}
`.trim();

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const filteredManifestItems = manifestItems.filter(item => {
    const matchesLoc = locationFilter === 'ALL' || item.location === locationFilter;
    const matchesQuery = item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.imdgClass && item.imdgClass.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLoc && matchesQuery;
  });

  return (
    <div className={`border rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6 ${
      isNightModeActive ? 'bg-red-950/80 border-red-900 text-red-100' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Top Header & Vessel Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4 animate-pulse" />
            <span>REAL-TIME CARGO STABILITY & MANIFEST ENGINE</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <span>Cargo Weight Distribution & Center of Gravity (CoG) Calculator</span>
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-0.5 max-w-2xl">
            Manage cargo manifest lots, perform real-time 3D Center of Gravity (CoG) vectoring, calculate metacentric stability (GM), draft, list, trim, and verify IMO SOLAS IS Code 2008 criteria.
          </p>
        </div>

        {/* Vessel Preset Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center space-x-2 text-xs">
            <Anchor className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex-1">
              <span className="text-[9px] text-slate-500 uppercase block font-bold">ACTIVE VESSEL HYDROSTATICS:</span>
              <select
                value={selectedVesselPreset.id}
                onChange={(e) => {
                  const preset = VESSEL_PRESETS.find(p => p.id === e.target.value);
                  if (preset) setSelectedVesselPreset(preset);
                }}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                {VESSEL_PRESETS.map(preset => (
                  <option key={preset.id} value={preset.id} className="bg-slate-900 text-white">
                    {preset.name} ({preset.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCopyManifestSummary}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-950"
          >
            {copiedSummary ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSummary ? 'SUMMARY COPIED' : 'EXPORT STABILITY SHEET'}</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid (CoG, GM, List, Trim, Stress) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Displacement */}
        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">DISPLACEMENT (&Delta;)</span>
          <strong className="text-lg font-black text-white font-mono block">
            {stabilityCalculations.totalDisplacement.toLocaleString()} MT
          </strong>
          <span className="text-[10px] text-slate-400 block font-sans">
            Cargo: {stabilityCalculations.cargoMassTotal.toLocaleString()} MT
          </span>
        </div>

        {/* Metacentric Height GM */}
        <div className={`p-3.5 bg-slate-950 border rounded-2xl space-y-1 ${
          stabilityCalculations.fluidGM < 0.15 ? 'border-rose-600/80 bg-rose-950/20' : 'border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">FLUID GM (CORRECTED)</span>
            {stabilityCalculations.fluidGM < 0.15 ? (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </div>
          <strong className={`text-lg font-black font-mono block ${
            stabilityCalculations.fluidGM < 0.15 ? 'text-rose-400' : 'text-emerald-300'
          }`}>
            {stabilityCalculations.fluidGM.toFixed(2)} M
          </strong>
          <span className="text-[10px] text-slate-400 block font-sans">
            KM: {selectedVesselPreset.kmMetacenterMeters}m | FSC: -{stabilityCalculations.fsc.toFixed(2)}m
          </span>
        </div>

        {/* Center of Gravity Coordinates */}
        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">CENTER OF GRAVITY (CoG)</span>
          <strong className="text-sm font-bold text-cyan-300 font-mono block">
            VCG: {stabilityCalculations.vcg.toFixed(2)} M
          </strong>
          <span className="text-[10px] text-slate-400 block font-sans">
            LCG: {stabilityCalculations.lcg.toFixed(1)}m | TCG: {stabilityCalculations.tcg.toFixed(2)}m
          </span>
        </div>

        {/* Transverse List Angle */}
        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">TRANSVERSE LIST</span>
          <strong className={`text-lg font-black font-mono block ${
            Math.abs(stabilityCalculations.listDeg) > 5.0 ? 'text-amber-400' : 'text-white'
          }`}>
            {Math.abs(stabilityCalculations.listDeg).toFixed(1)}° {stabilityCalculations.listDeg > 0 ? 'STBD' : stabilityCalculations.listDeg < 0 ? 'PORT' : 'EVEN'}
          </strong>
          <span className="text-[10px] text-slate-400 block font-sans">
            {Math.abs(stabilityCalculations.listDeg) > 5.0 ? 'Exceeds 5° Limit' : 'Balanced Trim'}
          </span>
        </div>

        {/* Trim & Draft */}
        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">LONGITUDINAL TRIM</span>
          <strong className="text-sm font-bold text-amber-300 font-mono block">
            {Math.abs(stabilityCalculations.trimMeters).toFixed(2)} M ({stabilityCalculations.trimMeters >= 0 ? 'STERN' : 'BOW'})
          </strong>
          <span className="text-[10px] text-slate-400 block font-sans">
            Fwd: {stabilityCalculations.draftForward.toFixed(1)}m | Aft: {stabilityCalculations.draftAft.toFixed(1)}m
          </span>
        </div>

        {/* Hull Stress Bending Moment */}
        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">HULL BENDING STRESS</span>
          <strong className={`text-lg font-black font-mono block ${
            stabilityCalculations.bendingMomentPercent > 85 ? 'text-rose-400' : 'text-purple-300'
          }`}>
            {stabilityCalculations.bendingMomentPercent}% MAX
          </strong>
          <span className="text-[10px] text-slate-400 block font-sans">
            Sagging/Hogging Stress
          </span>
        </div>
      </div>

      {/* Preset Loading Scenarios Bar */}
      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center space-x-2 text-slate-400 font-bold">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>LOAD PRESET SCENARIOS:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleApplyPresetScenario('CONTAINER')}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 hover:text-white rounded-lg transition-all"
          >
            Full Container Load
          </button>
          <button
            onClick={() => handleApplyPresetScenario('BULK')}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 hover:text-white rounded-lg transition-all"
          >
            Heavy Bulk Load
          </button>
          <button
            onClick={() => handleApplyPresetScenario('UNBALANCED_LIST')}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-amber-500 text-amber-300 rounded-lg transition-all"
          >
            Unbalanced Port List Test
          </button>
          <button
            onClick={() => handleApplyPresetScenario('TRIM_STERN')}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-cyan-500 text-cyan-300 rounded-lg transition-all"
          >
            Heavy Stern Trim Test
          </button>
        </div>
      </div>

      {/* Middle Grid: Real-time Weight Distribution Chart & CoG Crosshair Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Hold-by-Hold Weight Distribution */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Weight Distribution per Hold & Compartment (MT)</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono font-bold">TOTAL: {stabilityCalculations.cargoMassTotal.toLocaleString()} MT</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={holdBreakdownChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="location" stroke="#64748b" fontSize={10} tickLine={false} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} MT`, 'Mass']}
                />
                <Bar dataKey="massMT" radius={[6, 6, 0, 0]}>
                  {holdBreakdownChartData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={
                        entry.rawLoc.includes('HOLD')
                          ? '#10b981'
                          : entry.rawLoc.includes('DECK')
                          ? '#06b6d4'
                          : '#8b5cf6'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: IMO SOLAS GZ Stability Curve (Righting Arm vs Heel Angle) */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-bold text-white text-xs uppercase flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>IMO SOLAS GZ Statical Stability Righting Arm Curve</span>
            </h4>
            <span className="text-[10px] text-cyan-300 font-mono font-bold">
              GM: {stabilityCalculations.fluidGM.toFixed(2)}m
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gzCurveData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="angle" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} unit="m" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }} />
                <ReferenceLine y={0.20} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'SOLAS Min GZ (0.2m)', fill: '#f59e0b', fontSize: 9 }} />
                <Line type="monotone" dataKey="gzMeters" name="GZ Righting Arm (m)" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 3, fill: '#38bdf8' }} />
                <Line type="monotone" dataKey="minSolasLimit" name="SOLAS Limit Criteria" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interactive Cargo Manifest Lot Table Section */}
      <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="font-bold text-white text-sm">Cargo Manifest Lot Registry</h4>
              <span className="text-[10px] text-slate-400 font-sans">
                Individual weight lots, hold locations, and 3D spatial vectors (LCG, VCG, TCG)
              </span>
            </div>
          </div>

          {/* Controls: Search, Location Filter, Add Item */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search manifest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 w-36 sm:w-48"
              />
            </div>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Locations</option>
              <option value="HOLD_1">Hold 1 (Forward)</option>
              <option value="HOLD_2">Hold 2</option>
              <option value="HOLD_3">Hold 3</option>
              <option value="HOLD_4">Hold 4 (Aft)</option>
              <option value="DECK_FORWARD">Deck Forward</option>
              <option value="DECK_AFT">Deck Aft</option>
              <option value="PORT_TANK">Port Ballast Tank</option>
              <option value="STBD_TANK">Starboard Ballast Tank</option>
            </select>

            <button
              onClick={handleOpenAddForm}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-950"
            >
              <Plus className="w-4 h-4" />
              <span>ADD CARGO ITEM</span>
            </button>
          </div>
        </div>

        {/* Add / Edit Form Modal Drawer */}
        {isFormOpen && (
          <form onSubmit={handleSaveCargoItem} className="p-4 bg-slate-900 border border-emerald-500/50 rounded-2xl space-y-4 font-sans animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <strong className="text-white text-xs font-mono uppercase flex items-center space-x-2">
                <Edit2 className="w-4 h-4 text-emerald-400" />
                <span>{editingItemId ? 'Edit Cargo Manifest Item' : 'Add New Cargo Item to Manifest'}</span>
              </strong>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">DESCRIPTION / LOT NAME</label>
                <input
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="e.g., Heavy Machinery Lot B"
                  required
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">CATEGORY</label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value as any)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                >
                  <option value="CONTAINER">Container Cargo</option>
                  <option value="BULK">Dry Bulk Cargo</option>
                  <option value="HEAVY_LIFT">Heavy Lift / Machinery</option>
                  <option value="LIQUID_BALLAST">Liquid / Ballast / Fuel</option>
                  <option value="HAZMAT_IMDG">HAZMAT (IMDG Dangerous Goods)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">LOCATION / HOLD</label>
                <select
                  value={itemLocation}
                  onChange={(e) => handleLocationChange(e.target.value as any)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                >
                  <option value="HOLD_1">Hold 1 (Forward)</option>
                  <option value="HOLD_2">Hold 2</option>
                  <option value="HOLD_3">Hold 3</option>
                  <option value="HOLD_4">Hold 4 (Aft)</option>
                  <option value="DECK_FORWARD">Deck Forward</option>
                  <option value="DECK_AFT">Deck Aft</option>
                  <option value="PORT_TANK">Port Ballast Tank</option>
                  <option value="STBD_TANK">Starboard Ballast Tank</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">MASS (METRIC TONS - MT)</label>
                <input
                  type="number"
                  value={itemMass}
                  onChange={(e) => setItemMass(parseFloat(e.target.value) || 0)}
                  min={1}
                  required
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-emerald-300 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">LCG (LONGITUDINAL DISTANCE - M)</label>
                <input
                  type="number"
                  step="0.1"
                  value={itemLcg}
                  onChange={(e) => setItemLcg(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-cyan-300 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">VCG (VERTICAL HEIGHT ABOVE KEEL - M)</label>
                <input
                  type="number"
                  step="0.1"
                  value={itemVcg}
                  onChange={(e) => setItemVcg(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-300 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">TCG (TRANSVERSE DISTANCE - M)</label>
                <input
                  type="number"
                  step="0.1"
                  value={itemTcg}
                  onChange={(e) => setItemTcg(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-purple-300 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">IMDG HAZARD CLASS (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="e.g. Class 3 Flammable"
                  value={itemImdg}
                  onChange={(e) => setItemImdg(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-rose-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                {editingItemId ? 'Update Manifest Item' : 'Add to Manifest'}
              </button>
            </div>
          </form>
        )}

        {/* Table View */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 font-sans">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-[10px] text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3">ID / Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Hold / Location</th>
                <th className="p-3 text-right">Mass (MT)</th>
                <th className="p-3 text-center">LCG (m)</th>
                <th className="p-3 text-center">VCG (m)</th>
                <th className="p-3 text-center">TCG (m)</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950">
              {filteredManifestItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3 font-medium text-white">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">{item.id}</span>
                      <span>{item.description}</span>
                      {item.imdgClass && (
                        <span className="px-2 py-0.5 bg-rose-950 border border-rose-800 text-rose-300 text-[9px] rounded font-bold">
                          {item.imdgClass}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[10px] rounded font-mono font-bold text-slate-300">
                      {item.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-cyan-300">
                    {item.location.replace('_', ' ')}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-300">
                    {item.massMT.toLocaleString()} MT
                  </td>
                  <td className="p-3 text-center font-mono text-slate-300">
                    {item.lcg > 0 ? `+${item.lcg}` : item.lcg}
                  </td>
                  <td className="p-3 text-center font-mono text-slate-300">
                    {item.vcg}
                  </td>
                  <td className="p-3 text-center font-mono text-slate-300">
                    {item.tcg > 0 ? `+${item.tcg}` : item.tcg}
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEditForm(item)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 rounded-lg transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredManifestItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-500 italic">
                    No cargo manifest items match your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
