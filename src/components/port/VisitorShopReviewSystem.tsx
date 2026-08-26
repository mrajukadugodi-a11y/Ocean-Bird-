import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  ThumbsUp,
  MessageSquare,
  Plus,
  Filter,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Building2,
  Sparkles,
  Receipt,
  UserCheck
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';
import { SHOPPING_DATA, DINING_DATA, ShoppingStore, DiningPlace } from '../PortCommercialShoppingExhibitionView';

export interface ShopReview {
  id: string;
  storeId: string;
  storeName: string;
  reviewerName: string;
  reviewerType: 'CRUISE_PASSENGER' | 'COASTAL_RESIDENT' | 'SEAFARER' | 'PORT_VISITOR';
  rating: number; // 1 - 5
  pricingRating: number;
  refundSpeedRating: number;
  comment: string;
  isReceiptVerified: boolean;
  date: string;
  upvotes: number;
  tags: string[];
}

const INITIAL_SHOP_REVIEWS: ShopReview[] = [
  {
    id: 'SREV-01',
    storeId: 'SHOP-01',
    storeName: 'Royal Ocean Duty-Free Emporium',
    reviewerName: 'Maya Deshmukh',
    reviewerType: 'CRUISE_PASSENGER',
    rating: 5,
    pricingRating: 5,
    refundSpeedRating: 5,
    comment: 'Scanned my Duty-Free QR code at checkout and received an instant 20% tax refund straight to my travel card. Fantastic luxury watch and perfume collection!',
    isReceiptVerified: true,
    date: 'Aug 25, 2026',
    upvotes: 38,
    tags: ['Instant Tax Refund', 'Authentic Swiss Watches', 'Fast Checkout']
  },
  {
    id: 'SREV-02',
    storeId: 'SHOP-02',
    storeName: 'Maritime Artisans & Coastal Craft Hub',
    reviewerName: 'Capt. Jonathan Vance',
    reviewerRole: 'Fleet Captain',
    reviewerType: 'SEAFARER',
    rating: 5,
    pricingRating: 4,
    refundSpeedRating: 5,
    comment: 'Purchased a hand-carved teak ship model and brass chronometer. Coastal Resident pass gave me 20% discount!',
    isReceiptVerified: true,
    date: 'Aug 24, 2026',
    upvotes: 24,
    tags: ['Teak Handcrafts', 'Resident Discount', 'Great Souvenirs']
  } as any,
  {
    id: 'SREV-03',
    storeId: 'DINE-01',
    storeName: 'The Golden Anchor Sunset Seafood Grill',
    reviewerName: 'Rohan & Ananya Kapoor',
    reviewerType: 'COASTAL_RESIDENT',
    rating: 5,
    pricingRating: 5,
    refundSpeedRating: 4,
    comment: 'The fresh dockside yellowfin tuna steaks and butter garlic prawns on the outdoor terrace overlooking Pier 2 were unmatched. Highly recommended!',
    isReceiptVerified: true,
    date: 'Aug 22, 2026',
    upvotes: 49,
    tags: ['Sunset Terrace View', 'Fresh Dockside Catch', 'Outdoor Dining']
  }
];

interface VisitorShopReviewSystemProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const VisitorShopReviewSystem: React.FC<VisitorShopReviewSystemProps> = ({ triggerToast }) => {
  const [reviews, setReviews] = useState<ShopReview[]>(INITIAL_SHOP_REVIEWS);
  const [filterStoreId, setFilterStoreId] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [formStoreName, setFormStoreName] = useState('Royal Ocean Duty-Free Emporium');
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState<ShopReview['reviewerType']>('COASTAL_RESIDENT');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [formVerifiedReceipt, setFormVerifiedReceipt] = useState(true);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleUpvote = (id: string) => {
    setReviews(
      reviews.map((rev) => (rev.id === id ? { ...rev, upvotes: rev.upvotes + 1 } : rev))
    );
    hapticEngine.trigger('click');
    notify('Upvoted shop review as helpful!', 'info', 'HELPFUL UPVOTE');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      notify('Please enter your name and review experience.', 'warning', 'MISSING INFO');
      return;
    }

    const newRev: ShopReview = {
      id: `SREV-${Date.now()}`,
      storeId: 'SHOP-CUSTOM',
      storeName: formStoreName,
      reviewerName: formName,
      reviewerType: formType,
      rating: formRating,
      pricingRating: formRating,
      refundSpeedRating: formRating,
      comment: formComment,
      isReceiptVerified: formVerifiedReceipt,
      date: 'Just Now',
      upvotes: 1,
      tags: ['Verified Shop Visitor', 'Port Duty-Free']
    };

    setReviews([newRev, ...reviews]);
    setShowAddModal(false);
    setFormName('');
    setFormComment('');
    hapticEngine.trigger('success');
    notify('Thank you! Your shop review has been published.', 'success', 'REVIEW SUBMITTED');
  };

  const filteredReviews =
    filterStoreId === 'ALL'
      ? reviews
      : reviews.filter((r) => r.storeName.toLowerCase().includes(filterStoreId.toLowerCase()));

  const avgScore = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Port Visitor Shop &amp; Duty-Free Review Hub</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Verified reviews for duty-free boutiques, coastal handicraft hubs, seafood markets, and waterfront dining.
            </p>
          </div>

          <button
            onClick={() => {
              setShowAddModal(true);
              hapticEngine.trigger('click');
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs font-mono transition-all shadow-lg hover:brightness-110 flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write Visitor Shop Review</span>
          </button>
        </div>

        {/* Aggregate Stats */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center justify-center text-center space-y-1 border-b md:border-b-0 md:border-r border-slate-900 pb-4 md:pb-0">
            <span className="text-4xl font-black text-white font-mono">{avgScore} / 5.0</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-[10px] font-mono text-slate-400">Based on {reviews.length} Verified Visitor Ratings</span>
          </div>

          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <div className="flex justify-between">
              <span>Duty-Free Tax Refund Speed:</span>
              <span className="text-emerald-400 font-bold">4.9 / 5.0 (Instant)</span>
            </div>
            <div className="flex justify-between">
              <span>Price Transparency:</span>
              <span className="text-cyan-400 font-bold">4.8 / 5.0 (Verified)</span>
            </div>
            <div className="flex justify-between">
              <span>Coastal Resident Discount Honor:</span>
              <span className="text-amber-400 font-bold">100% Guaranteed</span>
            </div>
          </div>

          <div className="flex items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center space-x-2">
            <Receipt className="w-8 h-8 text-emerald-400 shrink-0" />
            <div className="text-left space-y-0.5">
              <span className="text-xs font-bold text-white block">Receipt-Verified Reviews</span>
              <span className="text-[10px] font-mono text-slate-400">Scan QR receipt at store for instant verified badge</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-slate-400 font-bold">Select Store:</span>
            <select
              value={filterStoreId}
              onChange={(e) => setFilterStoreId(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs font-mono rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Stores &amp; Dining ({reviews.length})</option>
              <option value="Royal Ocean Duty-Free">Royal Ocean Duty-Free Emporium</option>
              <option value="Maritime Artisans">Maritime Artisans &amp; Craft Hub</option>
              <option value="Golden Anchor">The Golden Anchor Sunset Seafood Grill</option>
            </select>
          </div>

          <span className="text-xs font-mono text-slate-500">Showing {filteredReviews.length} shop reviews</span>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">{rev.reviewerName}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 text-[10px] font-mono">
                      {rev.reviewerType.replace('_', ' ')}
                    </span>
                    {rev.isReceiptVerified && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold flex items-center space-x-1 border border-emerald-500/30">
                        <Receipt className="w-3 h-3 text-emerald-400" />
                        <span>VERIFIED RECEIPT</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-cyan-300 font-bold">{rev.storeName}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-500">{rev.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">&quot;{rev.comment}&quot;</p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {rev.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono text-cyan-300 border border-cyan-500/20"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleUpvote(rev.id)}
                  className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white border border-slate-800 flex items-center space-x-1.5 transition-all"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Helpful ({rev.upvotes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Write Port Store Visitor Review</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Select Port Store / Dining</label>
                <select
                  value={formStoreName}
                  onChange={(e) => setFormStoreName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                >
                  <option value="Royal Ocean Duty-Free Emporium">Royal Ocean Duty-Free Emporium</option>
                  <option value="Maritime Artisans & Coastal Craft Hub">Maritime Artisans &amp; Coastal Craft Hub</option>
                  <option value="The Golden Anchor Sunset Seafood Grill">The Golden Anchor Sunset Seafood Grill</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold block">Your Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Maya Deshmukh"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold block">Visitor Category</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  >
                    <option value="CRUISE_PASSENGER">Cruise Passenger</option>
                    <option value="COASTAL_RESIDENT">Coastal Resident</option>
                    <option value="SEAFARER">Seafarer / Crew</option>
                    <option value="PORT_VISITOR">General Visitor</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Rating (1 - 5 Stars)</label>
                <div className="flex space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800 justify-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormRating(s)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${s <= formRating ? 'text-amber-400 fill-amber-400' : 'text-slate-800'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Review Experience</label>
                <textarea
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Share details on duty-free discount application, staff hospitality, stock availability..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="receipt-check"
                  checked={formVerifiedReceipt}
                  onChange={(e) => setFormVerifiedReceipt(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-800"
                />
                <label htmlFor="receipt-check" className="text-xs font-mono text-slate-300 cursor-pointer">
                  Attach Verified Digital Duty-Free QR Receipt
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black font-mono text-xs shadow-lg transition-all"
              >
                Publish Visitor Shop Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
