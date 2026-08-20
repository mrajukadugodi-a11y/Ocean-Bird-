import React, { useState } from 'react';
import { ShoppingBag, Anchor, ExternalLink, DollarSign, Search, Filter, ShieldCheck, Mail, Phone, Plus, CheckCircle2, Award, Landmark, LifeBuoy, Ship } from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ShipListing {
  id: string;
  name: string;
  vesselType: 'CONTAINER' | 'TANKER' | 'BULKER' | 'LNG' | 'LINER' | 'TIMBER' | 'LUXURY_YACHT' | 'FISHERIES' | 'BOATS_WORKBOATS' | 'TUG_SUPPORT';
  saleType: 'FOR_SALE' | 'CHARTER_BAREBOAT' | 'CHARTER_TIME' | 'FOR_RENT_LEASE' | 'MARITIME_LENDING';
  yearBuilt: number;
  capacityDwtTeu: string;
  priceUsd: string;
  flagClass: string;
  currentLocation: string;
  brokerContact: string;
  brokerEmail: string;
  verifiedSeller: boolean;
  imageUrl: string;
  directPortalLink?: string;
}

const INITIAL_SHIP_LISTINGS: ShipListing[] = [
  {
    id: 'SHIP-SALE-101',
    name: 'M/V Poseidon Trader',
    vesselType: 'CONTAINER',
    saleType: 'FOR_SALE',
    yearBuilt: 2019,
    capacityDwtTeu: '8,500 TEU / 102,000 DWT',
    priceUsd: '$48,500,000',
    flagClass: 'Marshall Islands (DNV Class)',
    currentLocation: 'Anchorage Port of Singapore',
    brokerContact: 'Global Maritime Shipbrokers Ltd',
    brokerEmail: 'chartering@globalmaritimebroker.com',
    verifiedSeller: true,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80',
    directPortalLink: 'https://maritime-broker-portal-example.com/container/poseidon'
  },
  {
    id: 'SHIP-SALE-102',
    name: 'M/V Atlantic Queen Liner',
    vesselType: 'LINER',
    saleType: 'FOR_SALE',
    yearBuilt: 2021,
    capacityDwtTeu: '2,200 Passengers / 45,000 GT',
    priceUsd: '$120,000,000',
    flagClass: 'Bahamas (RINA Class)',
    currentLocation: 'Miami Cruise Terminal',
    brokerContact: 'TransOceanic Liner Sales Group',
    brokerEmail: 'liners@transoceanicsales.com',
    verifiedSeller: true,
    imageUrl: 'https://images.unsplash.com/photo-1548574505-5e238690323f?auto=format&fit=crop&w=600&q=80',
    directPortalLink: 'https://transoceanicsales.com/liners/atlantic-queen'
  },
  {
    id: 'SHIP-SALE-103',
    name: 'M/V Boreal Timber Express',
    vesselType: 'TIMBER',
    saleType: 'CHARTER_TIME',
    yearBuilt: 2018,
    capacityDwtTeu: '38,000 DWT Log & Woodchip',
    priceUsd: '$18,500 / Day',
    flagClass: 'Panama (ClassNK)',
    currentLocation: 'Vancouver Woodchip Pier',
    brokerContact: 'Pacific Northwest Timber Shipping',
    brokerEmail: 'logs@pnwshipping.com',
    verifiedSeller: true,
    imageUrl: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=600&q=80',
    directPortalLink: 'https://pnwshipping.com/timber/boreal'
  },
  {
    id: 'SHIP-SALE-104',
    name: 'M/Y Solitude Superyacht',
    vesselType: 'LUXURY_YACHT',
    saleType: 'FOR_RENT_LEASE',
    yearBuilt: 2023,
    capacityDwtTeu: '68 Meter Tri-Deck / 12 Guests',
    priceUsd: '$380,000 / Week',
    flagClass: 'Cayman Islands (Red Ensign)',
    currentLocation: 'Monaco Port Hercules',
    brokerContact: 'Monaco Luxury Yacht Brokers',
    brokerEmail: 'charter@monacoyachts.mc',
    verifiedSeller: true,
    imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&q=80',
    directPortalLink: 'https://monacoyachts.mc/superyachts/solitude'
  },
  {
    id: 'SHIP-SALE-105',
    name: 'F/V Arctic Deep Trawler',
    vesselType: 'FISHERIES',
    saleType: 'FOR_SALE',
    yearBuilt: 2020,
    capacityDwtTeu: '85m Pelagic Factory Trawler',
    priceUsd: '$19,200,000',
    flagClass: 'Norway (DNV GL Certified)',
    currentLocation: 'Aalesund Fishery Harbor',
    brokerContact: 'Nordic Fisheries Ship Sales',
    brokerEmail: 'trawlers@nordicfishships.no',
    verifiedSeller: true,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    directPortalLink: 'https://nordicfishships.no/trawler/arctic-deep'
  },
  {
    id: 'SHIP-SALE-106',
    name: 'P/B Sentinel Fast Workboat',
    vesselType: 'BOATS_WORKBOATS',
    saleType: 'FOR_RENT_LEASE',
    yearBuilt: 2022,
    capacityDwtTeu: '28m Offshore Crew Transfer Boat',
    priceUsd: '$4,500 / Day',
    flagClass: 'UK MCA Workboat Code Cat 1',
    currentLocation: 'Rotterdam Offshore Base',
    brokerContact: 'Workboat Rentals Europe',
    brokerEmail: 'crewtenders@workboatrentals.eu',
    verifiedSeller: true,
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    directPortalLink: 'https://workboatrentals.eu/sentinel'
  },
  {
    id: 'SHIP-SALE-107',
    name: 'Global Vessel Mortgage & Lending Portal',
    vesselType: 'TANKER',
    saleType: 'MARITIME_LENDING',
    yearBuilt: 2024,
    capacityDwtTeu: 'Up to $150M Syndicated Loan',
    priceUsd: '3.8% Fixed APR Financing',
    flagClass: 'Global Maritime Bank Consortium',
    currentLocation: 'London Financial Center',
    brokerContact: 'Maritime Capital & Ship Financing Bank',
    brokerEmail: 'lending@maritimecapitalbank.com',
    verifiedSeller: true,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    directPortalLink: 'https://maritimecapitalbank.com/ship-mortgage-loans'
  }
];

export const ShipSalesPortalView: React.FC = () => {
  const [listings] = useState<ShipListing[]>(INITIAL_SHIP_LISTINGS);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [saleTypeFilter, setSaleTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInquiryShip, setSelectedInquiryShip] = useState<ShipListing | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
  const [inquirySent, setInquirySent] = useState<boolean>(false);

  const filteredListings = listings.filter((ship) => {
    const matchesType = typeFilter === 'ALL' || ship.vesselType === typeFilter;
    const matchesSaleType = saleTypeFilter === 'ALL' || ship.saleType === saleTypeFilter;
    const matchesSearch =
      ship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.capacityDwtTeu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.currentLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSaleType && matchesSearch;
  });

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    hapticEngine.trigger('success');
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setSelectedInquiryShip(null);
    }, 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white uppercase flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>Commercial Ships, Liners, Yachts, Fisheries & Workboats Sales, Rental & Lending Portal</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-sans">
            Verified global exchange for buying, selling, renting/leasing, chartering, and financing container liners, timber ships, luxury yachts, trawlers & workboats
          </p>
        </div>

        <button
          onClick={() => {
            setIsListModalOpen(true);
            hapticEngine.trigger('click');
          }}
          className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>LIST VESSEL / FINANCING</span>
        </button>
      </div>

      {/* Transaction Type Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-2 rounded-2xl border border-slate-800">
        <span className="text-[10px] text-slate-400 font-bold px-2 flex items-center space-x-1">
          <DollarSign className="w-3 h-3 text-cyan-400" />
          <span>TRANSACTION PORTAL:</span>
        </span>
        {[
          { id: 'ALL', label: 'ALL LISTINGS' },
          { id: 'FOR_SALE', label: 'BUYING & SELLING' },
          { id: 'FOR_RENT_LEASE', label: 'RENTAL & LEASE' },
          { id: 'MARITIME_LENDING', label: 'LENDING & FINANCING' },
          { id: 'CHARTER_TIME', label: 'CHARTERING' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSaleTypeFilter(tab.id);
              hapticEngine.trigger('click');
            }}
            className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
              saleTypeFilter === tab.id
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ship, yacht, or port..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto justify-start sm:justify-end">
          {[
            { id: 'ALL', name: 'ALL TYPES' },
            { id: 'LINER', name: 'LINERS' },
            { id: 'TIMBER', name: 'TIMBER SHIPS' },
            { id: 'LUXURY_YACHT', name: 'LUXURY YACHTS' },
            { id: 'FISHERIES', name: 'FISHERIES' },
            { id: 'BOATS_WORKBOATS', name: 'BOATS & TENDERS' },
            { id: 'CONTAINER', name: 'CONTAINERS' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setTypeFilter(cat.id);
                hapticEngine.trigger('click');
              }}
              className={`px-2.5 py-1 rounded-xl text-[9px] font-bold border transition-all ${
                typeFilter === cat.id
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Vessel Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredListings.map((ship) => (
          <div
            key={ship.id}
            className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="relative h-36 bg-slate-900 overflow-hidden">
                <img
                  src={ship.imageUrl}
                  alt={ship.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[9px] font-bold text-cyan-300 border border-slate-800">
                  {ship.saleType.replace(/_/g, ' ')}
                </div>
                {ship.verifiedSeller && (
                  <div className="absolute top-2 right-2 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-emerald-300 border border-emerald-800 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>VERIFIED EXCHANGE</span>
                  </div>
                )}
              </div>

              <div className="p-3.5 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{ship.name}</h4>
                    <span className="text-[10px] text-slate-400 block font-sans">
                      {ship.vesselType.replace(/_/g, ' ')} • Built {ship.yearBuilt}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    {ship.priceUsd}
                  </span>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Spec / Capacity:</span>
                    <span className="text-slate-200 font-bold">{ship.capacityDwtTeu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location / Base:</span>
                    <span className="text-cyan-300 font-bold">{ship.currentLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 pt-0 flex space-x-2">
              <button
                onClick={() => {
                  setSelectedInquiryShip(ship);
                  hapticEngine.trigger('click');
                }}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-800 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>INQUIRE / LEASE</span>
              </button>

              {ship.directPortalLink && (
                <a
                  href={ship.directPortalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl flex items-center justify-center"
                  title="Direct Portal Link"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Modal */}
      {selectedInquiryShip && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase">Vessel Purchase, Lease & Financing Portal</span>
                <h4 className="text-sm font-bold text-white">{selectedInquiryShip.name}</h4>
              </div>
              <button
                onClick={() => setSelectedInquiryShip(null)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded-lg border border-slate-800"
              >
                CLOSE
              </button>
            </div>

            {inquirySent ? (
              <div className="bg-emerald-950/80 border border-emerald-500 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="text-xs font-bold text-emerald-200 block">INQUIRY & LOAN REQUEST TRANSMITTED</span>
                <p className="text-[10px] text-emerald-300 font-sans">
                  The shipbroker / financial agent {selectedInquiryShip.brokerContact} will contact your representative.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3 font-sans text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">BROKER / FINANCING EMAIL:</label>
                  <input
                    type="text"
                    disabled
                    value={selectedInquiryShip.brokerEmail}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">YOUR ORGANISATION NAME:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pacific Liner & Yacht Fleet Management"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">INQUIRY TYPE:</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono">
                    <option>Purchase Outright (MOA Agreement)</option>
                    <option>Rental / Short Term Lease (1-6 Months)</option>
                    <option>Maritime Loan & Hull Lending Financing</option>
                    <option>Bareboat / Time Charter Party</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs shadow transition-all font-mono"
                >
                  TRANSMIT PORTAL INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Post Listing Modal */}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-white uppercase">List Vessel / Yacht / Lending Facility</h4>
              <button
                onClick={() => setIsListModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded-lg border border-slate-800"
              >
                CLOSE
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2 text-[10px] text-slate-300 font-sans">
              <span className="text-cyan-300 font-bold block font-mono">Verified Maritime Exchange Portal:</span>
              <p>Submit Liner, Timber Ship, Luxury Yacht, Fisheries, or Workboat credentials along with Class Certificate and MOA/Lease/Lending terms.</p>
            </div>

            <button
              onClick={() => {
                hapticEngine.trigger('success');
                setIsListModalOpen(false);
              }}
              className="w-full py-2.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs font-mono shadow"
            >
              SUBMIT VESSEL PORTAL LISTING
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
