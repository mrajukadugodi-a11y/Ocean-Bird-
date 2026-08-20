import React, { useState } from 'react';
import { ShieldAlert, Anchor, PhoneCall, LifeBuoy, MapPin, CheckCircle2, AlertTriangle, FileText, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PortEmergencyPlan {
  id: string;
  portName: string;
  country: string;
  ispsLevel: 1 | 2 | 3;
  coastGuardContact: string;
  portControlVhfChannel: string;
  evacuationAnchorageCoordinates: string;
  hazmatTriageZone: string;
  emergencySteps: { stepNumber: number; title: string; action: string; completed: boolean }[];
  primaryHazards: string[];
}

const PORT_EMERGENCY_PLANS: PortEmergencyPlan[] = [
  {
    id: 'PORT-PLAN-01',
    portName: 'Port of Singapore (PSA Gateway)',
    country: 'Singapore',
    ispsLevel: 1,
    coastGuardContact: '+65 6325 2488 / VHF Ch 16',
    portControlVhfChannel: 'VHF Channel 12 / 68',
    evacuationAnchorageCoordinates: '1.2200° N, 103.8800° E (Western Eastern Anchorage)',
    hazmatTriageZone: 'Jurong Island Outer Hazmat Jetty #4',
    primaryHazards: ['High-density Vessel Collision', 'Chemical Spill Ingress', 'Subsea Cable Anchor Dragging'],
    emergencySteps: [
      { stepNumber: 1, title: 'Broadcast Distress on VHF Ch 16', action: 'Contact Singapore Port Operations Control Centre (POCC) with MAYDAY / PAN PAN', completed: true },
      { stepNumber: 2, title: 'Isolate Hazmat Cargo Valves', action: 'Trigger emergency shut-off valves (ESD) on main manifold Deck B', completed: false },
      { stepNumber: 3, title: 'Proceed to Designated Outer Anchorage', action: 'Drop anchor at Western Eastern Anchorage keeping 500m safety clearance', completed: false },
      { stepNumber: 4, title: 'Deploy Oil Containment Booms', action: 'Deploy starboard inflatable spill response booms around hull perimeter', completed: false }
    ]
  },
  {
    id: 'PORT-PLAN-02',
    portName: 'Port of Rotterdam (Maasvlakte)',
    country: 'Netherlands',
    ispsLevel: 1,
    coastGuardContact: '+31 900 0111 / VHF Ch 16',
    portControlVhfChannel: 'VHF Channel 11 (VTS Sector Maas)',
    evacuationAnchorageCoordinates: '51.9800° N, 3.9200° E (Maas North Emergency Basin)',
    hazmatTriageZone: 'Europoort Chemical Emergency Terminal 2',
    primaryHazards: ['North Sea Storm Surge', 'Ammonia Tank Leakage', 'Heavy Fog Visibility Risk'],
    emergencySteps: [
      { stepNumber: 1, title: 'Contact Harbour Master VTS Maas', action: 'Report nature of emergency and request priority tug assistance', completed: true },
      { stepNumber: 2, title: 'Activate Shipboard Oil Pollution Emergency Plan (SOPEP)', action: 'Mobilize SOPEP emergency team and seal scuppers', completed: false },
      { stepNumber: 3, title: 'Coordinate Medical Evacuation', action: 'Prepare helideck or winch area for KNRM rescue helicopter lifting', completed: false }
    ]
  },
  {
    id: 'PORT-PLAN-03',
    portName: 'Port of Yokohama (Honmoku Pier)',
    country: 'Japan',
    ispsLevel: 2,
    coastGuardContact: '+81 45 201 1118 / VHF Ch 16',
    portControlVhfChannel: 'VHF Channel 16 / 13 (Yokohama MARTIS)',
    evacuationAnchorageCoordinates: '35.4000° N, 139.7000° E (Tokyo Bay Outer Safe Basin)',
    hazmatTriageZone: 'Honmoku Pier Hazardous Material Berth #A',
    primaryHazards: ['Typhoon Wind Surge', 'Subsea Seismic Tsunami Wave', 'Liquified Gas Carrier Leak'],
    emergencySteps: [
      { stepNumber: 1, title: 'Receive Tsunami Warning Alarm', action: 'Immediately weigh anchor and head into deep ocean waters (>200m depth)', completed: true },
      { stepNumber: 2, title: 'Establish Emergency Communications', action: 'Report position and heading to Japan Coast Guard 3rd Regional HQ', completed: false },
      { stepNumber: 3, title: 'Secure All Upper Deck Cargo', action: 'Perform double turnbuckle tensioning on container stacks', completed: false }
    ]
  }
];

export const PortEmergencyPlanView: React.FC = () => {
  const [plans, setPlans] = useState<PortEmergencyPlan[]>(PORT_EMERGENCY_PLANS);
  const [selectedPlan, setSelectedPlan] = useState<PortEmergencyPlan>(PORT_EMERGENCY_PLANS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlans = plans.filter(p =>
    p.portName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStep = (planId: string, stepNum: number) => {
    setPlans(prev => prev.map(plan => {
      if (plan.id === planId) {
        const updatedSteps = plan.emergencySteps.map(s =>
          s.stepNumber === stepNum ? { ...s, completed: !s.completed } : s
        );
        return { ...plan, emergencySteps: updatedSteps };
      }
      return plan;
    }));

    if (selectedPlan.id === planId) {
      setSelectedPlan(prev => ({
        ...prev,
        emergencySteps: prev.emergencySteps.map(s =>
          s.stepNumber === stepNum ? { ...s, completed: !s.completed } : s
        )
      }));
    }
    hapticEngine.trigger('click');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Anchor className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Port Emergency & Crisis Action Response Plan Protocol</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            ISPS Code security levels, coast guard contacts, hazmat triage zones, and interactive vessel crisis checklists
          </p>
        </div>

        <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded font-bold flex items-center space-x-1">
          <LifeBuoy className="w-3.5 h-3.5 text-rose-400" />
          <span>ISPS CRISIS READY</span>
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search port by name or country (e.g. 'Singapore', 'Rotterdam', 'Yokohama')..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Port Plan Selector List */}
        <div className="lg:col-span-1 space-y-2">
          {filteredPlans.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedPlan(p);
                hapticEngine.trigger('click');
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedPlan.id === p.id
                  ? 'bg-slate-950 border-rose-500 ring-1 ring-rose-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-rose-400 font-bold">{p.id}</span>
                <span className="bg-slate-900 text-amber-300 border border-slate-800 text-[8px] px-2 py-0.5 rounded font-bold">
                  ISPS LEVEL {p.ispsLevel}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{p.portName}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{p.country}</span>
            </div>
          ))}
        </div>

        {/* Selected Port Protocol Dossier */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 font-mono">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <span className="text-[8px] text-rose-400 font-bold block">{selectedPlan.id} ACTION DOSSIER</span>
              <h4 className="text-sm font-bold text-white">{selectedPlan.portName}</h4>
              <span className="text-[10px] text-slate-400 block font-sans">{selectedPlan.country}</span>
            </div>

            <div className="text-right space-y-1">
              <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[9px] px-2.5 py-1 rounded font-bold block">
                COAST GUARD: {selectedPlan.coastGuardContact}
              </span>
              <span className="text-[9px] text-cyan-400 block font-mono font-bold">
                PORT VTS: {selectedPlan.portControlVhfChannel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px]">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-rose-400" />
                <span>EVACUATION ANCHORAGE:</span>
              </span>
              <span className="text-white font-bold block font-mono">{selectedPlan.evacuationAnchorageCoordinates}</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block flex items-center space-x-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                <span>HAZMAT TRIAGE ZONE:</span>
              </span>
              <span className="text-amber-300 font-bold block">{selectedPlan.hazmatTriageZone}</span>
            </div>
          </div>

          {/* Emergency Step Checklist */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-white uppercase flex items-center space-x-1.5 border-b border-slate-900 pb-2">
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span>Mandatory Crisis Action Checklist ({selectedPlan.emergencySteps.filter(s => s.completed).length}/{selectedPlan.emergencySteps.length} Completed)</span>
            </h5>

            <div className="space-y-2">
              {selectedPlan.emergencySteps.map((step) => (
                <div
                  key={step.stepNumber}
                  onClick={() => toggleStep(selectedPlan.id, step.stepNumber)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                    step.completed
                      ? 'bg-emerald-950/20 border-emerald-800 text-slate-300'
                      : 'bg-slate-900 border-slate-800 text-white hover:border-rose-500/50'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <CheckCircle2 className={`w-4 h-4 ${step.completed ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <div className="space-y-0.5 text-[10px]">
                    <span className="font-bold block">STEP #{step.stepNumber}: {step.title}</span>
                    <p className="font-sans text-slate-400 text-[10px]">{step.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
