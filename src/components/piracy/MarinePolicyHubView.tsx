import React, { useState } from 'react';
import { Scale, BookOpen, ShieldCheck, FileText, CheckCircle2, Globe, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface MarinePolicyEntry {
  id: string;
  policyTitle: string;
  authority: string;
  governingConvention: string;
  jurisdiction: string;
  complianceMandate: string;
  enforcementLevel: 'MANDATORY' | 'RECOMMENDED' | 'VOLUNTARY';
  summary: string;
}

const POLICY_HUB_DATA: MarinePolicyEntry[] = [
  {
    id: 'POL-01',
    policyTitle: 'IMO Annex VI Tier III NOx & Decarbonization Mandate',
    authority: 'International Maritime Organization (IMO)',
    governingConvention: 'MARPOL 73/78 Annex VI',
    jurisdiction: 'Global High Seas & ECA Zones',
    complianceMandate: 'Mandatory Energy Efficiency Existing Ship Index (EEXI) & Carbon Intensity Indicator (CII) logging.',
    enforcementLevel: 'MANDATORY',
    summary: 'Requires commercial vessels over 5,000 GT to record operational carbon intensity and maintain annual rating thresholds.'
  },
  {
    id: 'POL-02',
    policyTitle: 'Australian Great Barrier Reef PSSA Special Protections',
    authority: 'Australian Maritime Safety Authority (AMSA)',
    governingConvention: 'Particularly Sensitive Sea Area (PSSA)',
    jurisdiction: 'Australia (Torres Strait & Reef)',
    complianceMandate: 'Compulsory REEFREP reporting and strict adherence to designated two-way shipping routes.',
    enforcementLevel: 'MANDATORY',
    summary: 'Strict vessel reporting system, mandatory local pilotage, and heavy penalties for unauthorized anchorage.'
  },
  {
    id: 'POL-03',
    policyTitle: 'New Zealand Marine Protection Rules Part 130A (Ballast Water)',
    authority: 'Maritime New Zealand',
    governingConvention: 'BWM Convention 2004',
    jurisdiction: 'New Zealand Territorial Waters',
    complianceMandate: 'Approved Ballast Water Management System (BWMS) operation prior to EEZ entry.',
    enforcementLevel: 'MANDATORY',
    summary: 'All vessels entering NZ waters must exchange or treat ballast water to prevent invasive bio-fouling organisms.'
  },
  {
    id: 'POL-04',
    policyTitle: 'Philippines ISPS & Coast Watch Joint Security Protocol',
    authority: 'Philippine Coast Guard & PPA',
    governingConvention: 'ISPS Code & SOLAS Chapter XI-2',
    jurisdiction: 'Philippines (Sulu Sea & Visayas)',
    complianceMandate: 'Heightened Deck Watch (Level 2) and pre-arrival security notification 24 hours prior.',
    enforcementLevel: 'MANDATORY',
    summary: 'Mandatory security watchkeeping and pre-arranged naval escort coordination through Sibutu Passage.'
  },
  {
    id: 'POL-05',
    policyTitle: 'Vietnam Maritime Administration Decree 11/2021/ND-CP',
    authority: 'Vietnam Maritime Administration (VINAMARINE)',
    governingConvention: 'SOLAS / MARPOL Vietnam National Law',
    jurisdiction: 'Vietnam Ports & Anchorages',
    complianceMandate: 'Anti-pollution pledge, oil spill responder contract, and night anchorage watch protocol.',
    enforcementLevel: 'MANDATORY',
    summary: 'Requires all tankers and bulk carriers anchoring at Vung Tau or Haiphong to maintain active deck patrols.'
  }
];

export const MarinePolicyHubView: React.FC = () => {
  const [policies] = useState<MarinePolicyEntry[]>(POLICY_HUB_DATA);
  const [selectedPolicy, setSelectedPolicy] = useState<MarinePolicyEntry>(POLICY_HUB_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPolicies = policies.filter(p =>
    p.policyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>International Marine Policy, Law of the Sea & Regulatory Hub</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            UNCLOS conventions, IMO regulations, national environmental decrees, and ISPS maritime safety codes
          </p>
        </div>

        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2.5 py-1 rounded font-bold">
          IMO & MARPOL REGULATORY HUB
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search policy title, IMO convention, or country (e.g. Australia, IMO, Ballast)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Policy List */}
        <div className="lg:col-span-2 space-y-2 max-h-96 overflow-y-auto pr-1">
          {filteredPolicies.map((pol) => (
            <div
              key={pol.id}
              onClick={() => {
                setSelectedPolicy(pol);
                hapticEngine.trigger('click');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                selectedPolicy.id === pol.id
                  ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <div>
                  <span className="text-[8px] text-cyan-400 font-bold block">{pol.governingConvention}</span>
                  <h4 className="text-xs font-bold text-white">{pol.policyTitle}</h4>
                </div>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[8px] px-2 py-0.5 rounded font-bold">
                  {pol.enforcementLevel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">AUTHORITY:</span>
                  <span className="text-slate-300 font-bold">{pol.authority}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">JURISDICTION:</span>
                  <span className="text-cyan-300 font-bold">{pol.jurisdiction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Policy Detail Card */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[8px] text-cyan-400 font-bold block">{selectedPolicy.id} POLICY DOCUMENT</span>
              <h4 className="text-xs font-bold text-white">{selectedPolicy.policyTitle}</h4>
              <span className="text-[9px] text-slate-400 block font-sans">{selectedPolicy.authority}</span>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-[10px]">
              <div>
                <span className="text-slate-500 block">GOVERNING CONVENTION:</span>
                <span className="text-white font-bold">{selectedPolicy.governingConvention}</span>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <span className="text-slate-500 block">MANDATORY COMPLIANCE REQUIREMENT:</span>
                <span className="text-emerald-400 font-bold leading-relaxed block mt-0.5">{selectedPolicy.complianceMandate}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{selectedPolicy.summary}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
