import React, { useState } from 'react';
import {
  Globe,
  ShoppingBag,
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  Percent,
  Receipt,
  ExternalLink,
  Sparkles,
  Store,
  Tag,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface GlobalPortStore {
  id: string;
  name: string;
  portName: string;
  country: string;
  countryFlag: string;
  category: 'DUTY_FREE_LUXURY' | 'MARINE_EQUIPMENT' | 'COASTAL_CRAFTS' | 'SEAFOOD_DELI' | 'TECH_GADGETS' | 'NAUTICAL_FASHION';
  terminalFloor: string;
  openingHours: string;
  taxRefundType: 'INSTANT_ON_SPOT' | 'GATE_CLAIM_STATION' | 'DIGITAL_APP_REFUND';
  discountOffer: string;
  rating: number;
  featuredProducts: { name: string; priceUSD: number; image: string }[];
  isVerifiedDutyFree: boolean;
  phone: string;
}

const GLOBAL_STORES_DATA: GlobalPortStore[] = [
  {
    id: 'GSTORE-01',
    name: 'Royal Ocean Duty-Free Emporium',
    portName: 'Mumbai International Cruise Terminal',
    country: 'India',
    countryFlag: '🇮🇳',
    category: 'DUTY_FREE_LUXURY',
    terminalFloor: 'Terminal Pier 1, Level 2',
    openingHours: '24/7 Cruise Operations',
    taxRefundType: 'INSTANT_ON_SPOT',
    discountOffer: '20% OFF Swiss Watches & Perfumes',
    rating: 4.9,
    featuredProducts: [
      {
        name: 'Omega Seamaster Planet Ocean Chronometer',
        priceUSD: 4800,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80'
      },
      {
        name: 'Chanel Bleu de Chanel Parfum 100ml',
        priceUSD: 165,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=80'
      }
    ],
    isVerifiedDutyFree: true,
    phone: '+91 22 2261 9000'
  },
  {
    id: 'GSTORE-02',
    name: 'Singapore Marina Bay Cruise Duty-Free',
    portName: 'Marina Bay Cruise Centre',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    category: 'TECH_GADGETS',
    terminalFloor: 'Level 1 Departure Concourse',
    openingHours: '06:00 AM - 11:30 PM',
    taxRefundType: 'INSTANT_ON_SPOT',
    discountOffer: '7% GST Instant Exemption',
    rating: 4.9,
    featuredProducts: [
      {
        name: 'Garmin Quatix 7 Pro Marine Smartwatch',
        priceUSD: 990,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80'
      }
    ],
    isVerifiedDutyFree: true,
    phone: '+65 6513 2288'
  },
  {
    id: 'GSTORE-03',
    name: 'Maritime Artisans & Coastal Craft Hub',
    portName: 'Kochi Port Trust Heritage Terminal',
    country: 'India',
    countryFlag: '🇮🇳',
    category: 'COASTAL_CRAFTS',
    terminalFloor: 'Willingdon Island Pier Concourse',
    openingHours: '08:00 AM - 10:00 PM',
    taxRefundType: 'DIGITAL_APP_REFUND',
    discountOffer: '15% Resident Pass Exemption',
    rating: 4.8,
    featuredProducts: [
      {
        name: 'Hand-Carved Teakwood Brass Ship Wheel',
        priceUSD: 240,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80'
      }
    ],
    isVerifiedDutyFree: true,
    phone: '+91 484 266 6581'
  },
  {
    id: 'GSTORE-04',
    name: 'Dubai Port Rashid Gold & Luxury Bazaar',
    portName: 'Mina Rashid Cruise Terminal 3',
    country: 'UAE',
    countryFlag: '🇦🇪',
    category: 'DUTY_FREE_LUXURY',
    terminalFloor: 'VIP Concourse Level 3',
    openingHours: '24 Hours',
    taxRefundType: 'INSTANT_ON_SPOT',
    discountOffer: '0% VAT Duty-Free Exemption',
    rating: 5.0,
    featuredProducts: [
      {
        name: '24K Gold Minted Maritime Commemorative Coin',
        priceUSD: 1250,
        image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=500&q=80'
      }
    ],
    isVerifiedDutyFree: true,
    phone: '+971 4 301 9300'
  },
  {
    id: 'GSTORE-05',
    name: 'Puducherry Promenade Duty-Free & Crafts Bazaar',
    portName: 'Puducherry Port & Harbour',
    country: 'India',
    countryFlag: '🇮🇳',
    category: 'COASTAL_CRAFTS',
    terminalFloor: 'Goubert Avenue Pier Concourse',
    openingHours: '08:00 AM - 10:30 PM',
    taxRefundType: 'INSTANT_ON_SPOT',
    discountOffer: '18% GST Exemption & Heritage Crafts',
    rating: 4.9,
    featuredProducts: [
      {
        name: 'Handcrafted Auroville Essential Oils & Leather Goods',
        priceUSD: 45,
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=500&q=80'
      }
    ],
    isVerifiedDutyFree: true,
    phone: '+91 413 233 4000'
  }
];

interface GlobalShopDirectoryProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const GlobalShopDirectory: React.FC<GlobalShopDirectoryProps> = ({ triggerToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStore, setSelectedStore] = useState<GlobalPortStore | null>(GLOBAL_STORES_DATA[0]);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const filteredStores = GLOBAL_STORES_DATA.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.portName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'ALL' || s.country === selectedCountry;
    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;

    return matchesSearch && matchesCountry && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Global Cruise Port &amp; Duty-Free Directory</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Browse verified duty-free shops, marine gear suppliers, and luxury boutiques across major international cruise hubs.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
              {GLOBAL_STORES_DATA.length} PORTS LISTED
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search store, port name, or city..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Countries / Hubs</option>
            <option value="India">India 🇮🇳</option>
            <option value="Singapore">Singapore 🇸🇬</option>
            <option value="UAE">UAE 🇦🇪</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Categories</option>
            <option value="DUTY_FREE_LUXURY">Duty-Free Luxury</option>
            <option value="TECH_GADGETS">Marine Tech &amp; Wearables</option>
            <option value="COASTAL_CRAFTS">Coastal Artisans</option>
          </select>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              onClick={() => {
                setSelectedStore(store);
                hapticEngine.trigger('click');
              }}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                selectedStore?.id === store.id
                  ? 'bg-cyan-950/30 border-cyan-500 shadow-xl'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-base">{store.countryFlag}</span>
                  <h3 className="text-sm font-bold text-white">{store.name}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-400">{store.rating}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs font-mono">
                <div className="flex items-center space-x-1.5 text-cyan-300">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{store.portName}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{store.terminalFloor}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{store.openingHours}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                  {store.discountOffer}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hapticEngine.trigger('success');
                    notify(`Calling ${store.name} Concierge: ${store.phone}`, 'info', 'CONCIERGE CONNECT');
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-400 border border-slate-800 flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Call Store</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
