import React, { useState } from 'react';
import {
  Newspaper,
  Megaphone,
  FileText,
  Download,
  BookOpen,
  Eye,
  Plus,
  Sparkles,
  ExternalLink,
  Building2,
  DollarSign,
  CheckCircle2,
  Send,
  Calendar,
  Share2
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface PublicationItem {
  id: string;
  title: string;
  issue: string;
  category: 'TRADE_GAZETTE' | 'DUTY_FREE_CATALOG' | 'EXPO_PROSPECTUS' | 'COASTAL_LOGISTICS';
  releaseDate: string;
  pages: number;
  downloadCount: number;
  summary: string;
  imageUrl: string;
}

export interface AdBannerItem {
  id: string;
  advertiser: string;
  headline: string;
  tagline: string;
  discountCode: string;
  bannerUrl: string;
  clicks: number;
  status: 'ACTIVE' | 'FEATURED';
}

const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: 'PUB-01',
    title: 'Ocean Trade & Port Logistics Quarterly Gazette (Q3 2026)',
    issue: 'Volume 14, Issue 3',
    category: 'TRADE_GAZETTE',
    releaseDate: 'Aug 15, 2026',
    pages: 48,
    downloadCount: 3420,
    summary: 'Official report on deepwater container terminals, green tugboat fleets, and customs notary fast-track protocols across South Asian ports.',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'PUB-02',
    title: 'Official Duty-Free Shopping & Coastal Traveler Guide',
    issue: 'Autumn 2026 Edition',
    category: 'DUTY_FREE_CATALOG',
    releaseDate: 'Aug 01, 2026',
    pages: 32,
    downloadCount: 5890,
    summary: 'Comprehensive luxury watch catalog, coastal artisan handicraft directory, and tax refund procedures for international cruise passengers.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'PUB-03',
    title: 'South Asia Ocean Technology Expo Exhibitor Prospectus',
    issue: 'Expo 2026 Official Release',
    category: 'EXPO_PROSPECTUS',
    releaseDate: 'Jul 20, 2026',
    pages: 24,
    downloadCount: 2150,
    summary: 'Booth floorplan maps, floating dock vessel demonstration guidelines, and keynote speaker biographies.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  }
];

const ADS_DATA: AdBannerItem[] = [
  {
    id: 'AD-01',
    advertiser: 'Royal Ocean Duty-Free Spirits & Perfumes',
    headline: 'Buy 2 Swiss Watches, Get Exclusive Leather Travel Case Free',
    tagline: 'Available at Level 1 Duty-Free Atrium until midnight.',
    discountCode: 'ROYAL-SWISS-2026',
    bannerUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    clicks: 1240,
    status: 'FEATURED'
  },
  {
    id: 'AD-02',
    advertiser: 'Neptune SOLAS Marine Gear Outfitters',
    headline: '15% Off Satellite Emergency Beacons & Liferafts',
    tagline: 'Certified SOLAS equipment for seafarers and fishermen.',
    discountCode: 'NEPTUNE-SOLAS-15',
    bannerUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    clicks: 850,
    status: 'ACTIVE'
  }
];

interface PortAdsAndPublicationsHubProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const PortAdsAndPublicationsHub: React.FC<PortAdsAndPublicationsHubProps> = ({ triggerToast }) => {
  const [publications] = useState<PublicationItem[]>(PUBLICATIONS_DATA);
  const [adsList, setAdsList] = useState<AdBannerItem[]>(ADS_DATA);
  const [selectedPub, setSelectedPub] = useState<PublicationItem | null>(null);
  const [showAdSubmitModal, setShowAdSubmitModal] = useState(false);

  // Vendor Ad submission form state
  const [adVendorName, setAdVendorName] = useState('');
  const [adHeadline, setAdHeadline] = useState('');
  const [adTagline, setAdTagline] = useState('');
  const [adCode, setAdCode] = useState('');

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleAdClick = (id: string) => {
    setAdsList(
      adsList.map((ad) => (ad.id === id ? { ...ad, clicks: ad.clicks + 1 } : ad))
    );
    hapticEngine.trigger('click');
    const ad = adsList.find((a) => a.id === id);
    if (ad) {
      notify(`Copied Discount Code ${ad.discountCode}`, 'success', 'PROMO CODE COPIED');
    }
  };

  const handleSubmitAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adVendorName || !adHeadline) {
      notify('Please enter vendor name and ad headline.', 'warning', 'MISSING INFO');
      return;
    }

    const newAd: AdBannerItem = {
      id: `AD-${Date.now()}`,
      advertiser: adVendorName,
      headline: adHeadline,
      tagline: adTagline || 'Port Commercial Hub Partner Deal',
      discountCode: adCode || 'PORT-PROMO-2026',
      bannerUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      clicks: 1,
      status: 'ACTIVE'
    };

    setAdsList([newAd, ...adsList]);
    setShowAdSubmitModal(false);
    setAdVendorName('');
    setAdHeadline('');
    setAdTagline('');
    setAdCode('');
    hapticEngine.trigger('success');
    notify('Your advertisement campaign has been submitted for digital screen broadcast!', 'success', 'AD CAMPAIGN SUBMITTED');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Newspaper className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Port Gazette, Publications &amp; Ad Broadcast Hub</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Read official ocean trade periodicals, download duty-free catalogs, and broadcast merchant commercial ad campaigns.
            </p>
          </div>

          <button
            onClick={() => {
              setShowAdSubmitModal(true);
              hapticEngine.trigger('click');
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs font-mono transition-all shadow-lg hover:brightness-110 flex items-center justify-center space-x-2"
          >
            <Megaphone className="w-4 h-4" />
            <span>Book Merchant Ad Campaign</span>
          </button>
        </div>

        {/* Section 1: Sponsored Merchant Banner Ads Showcase */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Megaphone className="w-4 h-4 text-cyan-400" />
              <span>Port Digital Screens &amp; Banner Broadcasts</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">ACTIVE CAMPAIGNS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adsList.map((ad) => (
              <div
                key={ad.id}
                onClick={() => handleAdClick(ad.id)}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-5 space-y-3 cursor-pointer hover:border-cyan-500/50 transition-all shadow-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundImage: `url('${ad.bannerUrl}')` }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {ad.advertiser}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{ad.clicks} Engagements</span>
                </div>

                <div className="relative z-10 space-y-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {ad.headline}
                  </h4>
                  <p className="text-xs text-slate-300">{ad.tagline}</p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-xs font-mono text-amber-300 font-bold bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    CODE: {ad.discountCode}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    Claim Promotion &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Official Maritime Publications & Gazette Directory */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Official Maritime Publications &amp; Trade Periodicals</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">PDF Gazettes &amp; Catalogs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
              >
                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url('${pub.imageUrl}')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-300 text-[10px] font-mono font-bold border border-slate-700">
                    {pub.issue}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-white leading-snug">{pub.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{pub.summary}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-[11px] font-mono text-slate-500">
                      <span>{pub.pages} Pages</span>
                      <span>{pub.downloadCount} Downloads</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setSelectedPub(pub);
                          hapticEngine.trigger('click');
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono font-bold flex items-center justify-center space-x-1 border border-slate-800"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Read Online</span>
                      </button>

                      <button
                        onClick={() => {
                          hapticEngine.trigger('success');
                          notify(`Downloaded ${pub.title} (PDF)`, 'success', 'PDF DOWNLOADED');
                        }}
                        className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-black flex items-center justify-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publication Reader Modal */}
      {selectedPub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Digital Reader — {selectedPub.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPub(null)}
                className="text-slate-400 hover:text-white text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between text-slate-400 border-b border-slate-900 pb-2">
                <span>Release: {selectedPub.releaseDate}</span>
                <span className="text-amber-300 font-bold">{selectedPub.issue}</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-sans">{selectedPub.summary}</p>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-400 space-y-1">
                <p className="font-bold text-white">Featured Articles in this Edition:</p>
                <ul className="list-disc list-inside space-y-1 text-[11px]">
                  <li>JNPT &amp; Nhava Sheva Terminal Expansion Roadmap 2026-2030</li>
                  <li>Duty-Free Concessionnaire Privilege Guidelines for Seafarers</li>
                  <li>Autonomous Hydrofoil Drones &amp; Green Tugboat Fleet Telemetry</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  hapticEngine.trigger('success');
                  notify(`Downloaded Full Gazette PDF for ${selectedPub.title}`, 'success', 'DOWNLOADED');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-mono font-black text-slate-950 flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ad Campaign Booking Modal */}
      {showAdSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Submit Merchant Ad Campaign</h3>
              </div>
              <button
                onClick={() => setShowAdSubmitModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <form onSubmit={handleSubmitAd} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Vendor / Store Name</label>
                <input
                  type="text"
                  value={adVendorName}
                  onChange={(e) => setAdVendorName(e.target.value)}
                  placeholder="e.g. Royal Duty-Free, Neptune Marine Outfitters"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Ad Headline / Deal Title</label>
                <input
                  type="text"
                  value={adHeadline}
                  onChange={(e) => setAdHeadline(e.target.value)}
                  placeholder="e.g. 25% Off Fresh Catch & Seafood Kits"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Campaign Description &amp; Tagline</label>
                <input
                  type="text"
                  value={adTagline}
                  onChange={(e) => setAdTagline(e.target.value)}
                  placeholder="e.g. Valid at Pier Promenade level until Sunday."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Custom Promo Discount Code</label>
                <input
                  type="text"
                  value={adCode}
                  onChange={(e) => setAdCode(e.target.value)}
                  placeholder="e.g. SEAFOOD-DEAL-25"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono text-xs shadow-lg transition-all"
              >
                Broadcast Commercial Campaign
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
