import React, { useState } from 'react';
import { Globe, Building2, ExternalLink, ShieldCheck, Mail, Search, Filter, Megaphone, ArrowUpRight, CheckCircle2, UserPlus } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface TradePartner {
  id: string;
  companyName: string;
  partnerType: 'IMPORTER' | 'EXPORTER' | 'CUSTOMS_BROKER' | 'MARITIME_MARKETING';
  commodityCategory: 'AGRICULTURE' | 'ENERGY_OIL' | 'MINING_METALS' | 'HIGH_TECH' | 'PHARMA';
  primaryTradeLane: string;
  countryHQ: string;
  verifiedBadge: boolean;
  annualVolumeTons: string;
  portalUrl: string;
  contactEmail: string;
  description: string;
}

const INITIAL_TRADE_PARTNERS: TradePartner[] = [
  {
    id: 'TRADE-101',
    companyName: 'TransGlobal Grain Exporters Inc',
    partnerType: 'EXPORTER',
    commodityCategory: 'AGRICULTURE',
    primaryTradeLane: 'Transpacific (North America -> Asia)',
    countryHQ: 'United States',
    verifiedBadge: true,
    annualVolumeTons: '4,800,000 MT / Year',
    portalUrl: 'https://transglobalgrain-example.com',
    contactEmail: 'export-desk@transglobalgrain.com',
    description: 'Tier-1 bulk agricultural exporter specializing in wheat, soybeans, and corn with direct berth access at Port of Vancouver and New Orleans.'
  },
  {
    id: 'TRADE-102',
    companyName: 'Nordic Clean Energy Imports AG',
    partnerType: 'IMPORTER',
    commodityCategory: 'ENERGY_OIL',
    primaryTradeLane: 'Middle East -> Northern Europe',
    countryHQ: 'Germany',
    verifiedBadge: true,
    annualVolumeTons: '12,500,000 MT LNG / Crude',
    portalUrl: 'https://nordiccleanenergy-example.com',
    contactEmail: 'procurement@nordicenergy.de',
    description: 'Major European LNG & green ammonia buyer and terminal operator providing long-term off-take contracts for energy tankers.'
  },
  {
    id: 'TRADE-103',
    companyName: 'Euro-Asia Logistics & Customs Clearance',
    partnerType: 'CUSTOMS_BROKER',
    commodityCategory: 'HIGH_TECH',
    primaryTradeLane: 'Asia-Europe (Rotterdam / Hamburg)',
    countryHQ: 'Netherlands',
    verifiedBadge: true,
    annualVolumeTons: '350,000 TEU Processed',
    portalUrl: 'https://euroasiacustoms-example.com',
    contactEmail: 'clearance@euroasiacustoms.nl',
    description: 'Express customs brokerage, bonded warehousing, and EU import compliance for high-value containerized electronics.'
  },
  {
    id: 'TRADE-104',
    companyName: 'Oceanic Freight Marketing Agency',
    partnerType: 'MARITIME_MARKETING',
    commodityCategory: 'HIGH_TECH',
    primaryTradeLane: 'Global Shipping Lanes',
    countryHQ: 'Singapore',
    verifiedBadge: true,
    annualVolumeTons: 'Global Maritime PR & B2B Leads',
    portalUrl: 'https://oceanicmarketing-example.com',
    contactEmail: 'campaigns@oceanicmarketing.sg',
    description: 'Specialized shipping PR, chartering lead generation, and digital B2B maritime trade marketing for shipowners and logistics brokers.'
  }
];

export const TradeMarketingPortalView: React.FC = () => {
  const [partners] = useState<TradePartner[]>(INITIAL_TRADE_PARTNERS);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [commodityFilter, setCommodityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPartner, setSelectedPartner] = useState<TradePartner | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [quoteSent, setQuoteSent] = useState<boolean>(false);

  const filteredPartners = partners.filter((p) => {
    const matchesType = typeFilter === 'ALL' || p.partnerType === typeFilter;
    const matchesCommodity = commodityFilter === 'ALL' || p.commodityCategory === commodityFilter;
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.primaryTradeLane.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.countryHQ.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCommodity && matchesSearch;
  });

  const handleSendQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    hapticEngine.trigger('success');
    setQuoteSent(true);
    setTimeout(() => {
      setQuoteSent(false);
      setSelectedPartner(null);
    }, 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Global Importer, Exporter & Freight Marketing Directory Portal</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Verified network directory connecting cargo importers, exporters, customs clearance brokers, and shipping marketing agencies
          </p>
        </div>

        <button
          onClick={() => {
            setIsRegisterModalOpen(true);
            hapticEngine.trigger('click');
          }}
          className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>REGISTER TRADE AGENCY</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search company, country, or trade lane..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto justify-start sm:justify-end">
          {['ALL', 'IMPORTER', 'EXPORTER', 'CUSTOMS_BROKER', 'MARITIME_MARKETING'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setTypeFilter(type);
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-xl text-[9px] font-bold border transition-all ${
                typeFilter === type
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl flex flex-col justify-between space-y-3 transition-all group"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-cyan-400 font-bold block">{partner.countryHQ} • {partner.partnerType.replace(/_/g, ' ')}</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {partner.companyName}
                  </h4>
                </div>

                {partner.verifiedBadge && (
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[8px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>VERIFIED TRADE PORTAL</span>
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{partner.description}</p>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Trade Lane:</span>
                  <span className="text-cyan-300 font-bold">{partner.primaryTradeLane}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Annual Trade Volume:</span>
                  <span className="text-emerald-400 font-bold">{partner.annualVolumeTons}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => {
                  setSelectedPartner(partner);
                  hapticEngine.trigger('click');
                }}
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>CONNECT / REQUEST QUOTE</span>
              </button>

              <a
                href={partner.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl flex items-center justify-center"
                title="Visit Direct Trade Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Connect / Request Quote Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase">Trade Partner Connect</span>
                <h4 className="text-sm font-bold text-white">{selectedPartner.companyName}</h4>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded-lg border border-slate-800"
              >
                CLOSE
              </button>
            </div>

            {quoteSent ? (
              <div className="bg-emerald-950/80 border border-emerald-500 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="text-xs font-bold text-emerald-200 block">TRADE REQUEST TRANSMITTED</span>
                <p className="text-[10px] text-emerald-300 font-sans">
                  Your inquiry has been routed to {selectedPartner.contactEmail}. They will respond with freight rate quotes and cargo contract terms.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendQuoteRequest} className="space-y-3 font-sans text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">COMPANY EMAIL:</label>
                  <input
                    type="text"
                    disabled
                    value={selectedPartner.contactEmail}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">YOUR ORGANISATION / FLEET:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Global Maritime Logistics LLC"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">TRADE SERVICE INQUIRY:</label>
                  <textarea
                    rows={3}
                    placeholder="Specify commodity volume, load/discharge ports, and required shipment dates..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs shadow transition-all font-mono"
                >
                  TRANSMIT TRADE QUOTE REQUEST
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Register Partner Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-white uppercase">Register Importer / Exporter / Marketing Agency</h4>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded-lg border border-slate-800"
              >
                CLOSE
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2 text-[10px] text-slate-300 font-sans">
              <span className="text-emerald-400 font-bold block font-mono">Directory Verification Standards:</span>
              <p>Registered trade partners undergo LEI (Legal Entity Identifier) and IMO compliance verification to ensure secure maritime transaction links.</p>
            </div>

            <button
              onClick={() => {
                hapticEngine.trigger('success');
                setIsRegisterModalOpen(false);
              }}
              className="w-full py-2.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs font-mono shadow"
            >
              SUBMIT TRADE PORTAL REGISTRATION
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
