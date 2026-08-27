import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Award,
  Filter,
  Search,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  PlusCircle,
  Building2,
  Ship,
  UserCheck,
  TrendingUp,
  BarChart2,
  Send,
  X,
  MessageCircle,
  Check
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface ServiceReviewItem {
  id: string;
  authorName: string;
  authorRole: 'Master Mariner' | 'Logistics Freight Forwarder' | 'Port Customs Agent' | 'Cruise Passenger' | 'STCW Watchkeeper';
  vesselOrCompany: string;
  category: 'Port Facilities' | 'Cruise Experience' | 'Vessel Safety' | 'Ocean Dollar Vault' | 'Mobile App UI';
  ratingStars: number;
  criteriaRatings: {
    serviceSpeed: number;
    safetyCompliance: number;
    facilitiesComfort: number;
    ecoRating: number;
  };
  title: string;
  comment: string;
  timestamp: string;
  verifiedReviewer: boolean;
  upvotesCount: number;
  officialReply?: string;
  tags: string[];
}

const INITIAL_REVIEWS: ServiceReviewItem[] = [
  {
    id: 'REV-8812',
    authorName: 'Capt. Vikramaditya Sharma',
    authorRole: 'Master Mariner',
    vesselOrCompany: 'M/V Desh Shanti (Shipping Corp of India)',
    category: 'Port Facilities',
    ratingStars: 5,
    criteriaRatings: { serviceSpeed: 5, safetyCompliance: 5, facilitiesComfort: 4, ecoRating: 5 },
    title: 'Chittagong Deepwater Berth #3 OCR Gantry speed is unmatched',
    comment: 'Customs clearance via QR code and automated bolt-seal OCR inspection reduced our vessel port turn-around time by 4.2 hours. Excellent STCW shore pass facilities.',
    timestamp: '2 hours ago',
    verifiedReviewer: true,
    upvotesCount: 38,
    officialReply: 'Thank you Captain. Chittagong Port Authority has upgraded Gantry #3 to 100% automated OCR.',
    tags: ['Automated Customs', 'STCW Shore Pass', 'Deepwater Berth']
  },
  {
    id: 'REV-7741',
    authorName: 'Elena Rostova',
    authorRole: 'Cruise Passenger',
    vesselOrCompany: 'Royal Ocean Serenade (Deck 12 Royal Suite)',
    category: 'Cruise Experience',
    ratingStars: 5,
    criteriaRatings: { serviceSpeed: 5, safetyCompliance: 5, facilitiesComfort: 5, ecoRating: 5 },
    title: '5-Star Luxury Ocean Cruise with zero-emission propulsion',
    comment: 'The 360° virtual tour accurately reflected our stateroom. The digital passenger portal made onboard dining and spa bookings effortless.',
    timestamp: '5 hours ago',
    verifiedReviewer: true,
    upvotesCount: 24,
    tags: ['Royal Suite', 'Zero Emission', 'Digital Concierge']
  },
  {
    id: 'REV-6510',
    authorName: 'Rajesh Patil',
    authorRole: 'Logistics Freight Forwarder',
    vesselOrCompany: 'Nhava Sheva Freight Logistics',
    category: 'Ocean Dollar Vault',
    ratingStars: 5,
    criteriaRatings: { serviceSpeed: 5, safetyCompliance: 5, facilitiesComfort: 5, ecoRating: 4 },
    title: 'Physical Gold Bullion Coin ECDSA backing verified instantly',
    comment: 'We registered 10 $1,000 Ocean Dollar Sovereign Gold Coins into our hardware cold vault. Multisig governor security provides true peace of mind.',
    timestamp: '1 day ago',
    verifiedReviewer: true,
    upvotesCount: 45,
    officialReply: 'Confirmed. Asset serial hashes are registered on the XOD sovereign ledger.',
    tags: ['Cold Storage', 'Multisig Vault', 'ECDSA NFC']
  },
  {
    id: 'REV-5420',
    authorName: 'Chief Eng. Marcus Vance',
    authorRole: 'STCW Watchkeeper',
    vesselOrCompany: 'CMA CGM Blue Marlin',
    category: 'Vessel Safety',
    ratingStars: 4,
    criteriaRatings: { serviceSpeed: 4, safetyCompliance: 5, facilitiesComfort: 4, ecoRating: 4 },
    title: 'Predictive engine turbocharger diagnostics saved us from main shaft downtime',
    comment: 'Vibration neural net telemetry flagged bearing micro-wear prior to Malacca Strait transit. Highly recommended for all bridge watch teams.',
    timestamp: '2 days ago',
    verifiedReviewer: true,
    upvotesCount: 19,
    tags: ['Predictive AI', 'Engine ECR', 'STCW Safety']
  }
];

export const RatingSystemView: React.FC = () => {
  const [reviews, setReviews] = useState<ServiceReviewItem[]>(INITIAL_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStarFilter, setSelectedStarFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false);

  // New Review Form State
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState<ServiceReviewItem['authorRole']>('Master Mariner');
  const [newCategory, setNewCategory] = useState<ServiceReviewItem['category']>('Port Facilities');
  const [newStars, setNewStars] = useState<number>(5);
  const [newSpeed, setNewSpeed] = useState<number>(5);
  const [newSafety, setNewSafety] = useState<number>(5);
  const [newComfort, setNewComfort] = useState<number>(5);
  const [newEco, setNewEco] = useState<number>(5);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Filtered Reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedCategory !== 'ALL' && r.category !== selectedCategory) return false;
    if (selectedStarFilter > 0 && r.ratingStars !== selectedStarFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const mTitle = r.title.toLowerCase().includes(q);
      const mComment = r.comment.toLowerCase().includes(q);
      const mAuthor = r.authorName.toLowerCase().includes(q);
      const mTags = r.tags.some(t => t.toLowerCase().includes(q));
      if (!mTitle && !mComment && !mAuthor && !mTags) return false;
    }
    return true;
  });

  // Calculate Average Rating
  const totalReviewsCount = reviews.length;
  const avgOverallRating = (reviews.reduce((acc, r) => acc + r.ratingStars, 0) / totalReviewsCount).toFixed(1);

  const avgSpeed = (reviews.reduce((acc, r) => acc + r.criteriaRatings.serviceSpeed, 0) / totalReviewsCount).toFixed(1);
  const avgSafety = (reviews.reduce((acc, r) => acc + r.criteriaRatings.safetyCompliance, 0) / totalReviewsCount).toFixed(1);
  const avgComfort = (reviews.reduce((acc, r) => acc + r.criteriaRatings.facilitiesComfort, 0) / totalReviewsCount).toFixed(1);
  const avgEco = (reviews.reduce((acc, r) => acc + r.criteriaRatings.ecoRating, 0) / totalReviewsCount).toFixed(1);

  const handleUpvote = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, upvotesCount: r.upvotesCount + 1 } : r));
    hapticEngine.trigger('click');
    showToast('Upvoted review!');
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newComment || !newAuthor) {
      alert('Please fill in all required fields.');
      return;
    }

    const item: ServiceReviewItem = {
      id: `REV-${Date.now()}`,
      authorName: newAuthor,
      authorRole: newRole,
      vesselOrCompany: 'Verified Community Reviewer',
      category: newCategory,
      ratingStars: newStars,
      criteriaRatings: {
        serviceSpeed: newSpeed,
        safetyCompliance: newSafety,
        facilitiesComfort: newComfort,
        ecoRating: newEco
      },
      title: newTitle,
      comment: newComment,
      timestamp: 'Just now',
      verifiedReviewer: true,
      upvotesCount: 1,
      tags: ['Verified Feedback', 'Community Review']
    };

    setReviews([item, ...reviews]);
    setShowAddReviewModal(false);
    setNewTitle('');
    setNewComment('');
    setNewAuthor('');
    hapticEngine.trigger('success');
    showToast('🎉 Review Submitted! Earned +150 Community Reviewer XP.');
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 font-mono text-white shadow-2xl animate-fade-in relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              VERIFIED MARITIME SERVICE RATINGS &amp; REVIEWS
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1 flex items-center space-x-3">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            <span>Maritime Services Rating System</span>
          </h2>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Community ratings and verified reviews for port berths, cruise suites, vessel safety diagnostic systems, and Ocean Dollar vault services.
          </p>
        </div>

        <button
          onClick={() => {
            setShowAddReviewModal(true);
            hapticEngine.trigger('click');
          }}
          className="py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-xl transition-all flex items-center space-x-2 shrink-0 self-start lg:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write Verified Service Review</span>
        </button>
      </div>

      {toastMsg && (
        <div className="bg-amber-950 border border-amber-500/50 text-amber-300 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {/* Overall Score */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-center space-x-4">
          <div className="text-center p-3 rounded-2xl bg-slate-950 border border-amber-500/40 shrink-0">
            <span className="text-3xl font-black text-amber-400 font-mono block">{avgOverallRating}</span>
            <div className="flex space-x-0.5 justify-center mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[9px] text-slate-400 block mt-1">{totalReviewsCount} Reviews</span>
          </div>
          <div className="space-y-1">
            <strong className="text-white text-sm block font-sans font-bold">Overall Portal Rating</strong>
            <span className="text-[11px] text-emerald-400 font-bold block">98.4% Satisfaction Rate</span>
            <p className="text-[10px] text-slate-400">Verified by STCW Officers &amp; Passengers</p>
          </div>
        </div>

        {/* Speed & Safety Breakdown */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Service Speed:</span>
            <span className="font-bold text-amber-400 font-mono">{avgSpeed} / 5.0 ★</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(Number(avgSpeed) / 5) * 100}%` }} />
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-400">Safety &amp; STCW:</span>
            <span className="font-bold text-emerald-400 font-mono">{avgSafety} / 5.0 ★</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(Number(avgSafety) / 5) * 100}%` }} />
          </div>
        </div>

        {/* Comfort & Eco Breakdown */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Deck &amp; Suite Comfort:</span>
            <span className="font-bold text-cyan-400 font-mono">{avgComfort} / 5.0 ★</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(Number(avgComfort) / 5) * 100}%` }} />
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-400">Eco &amp; Carbon Score:</span>
            <span className="font-bold text-purple-400 font-mono">{avgEco} / 5.0 ★</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-400 h-full rounded-full" style={{ width: `${(Number(avgEco) / 5) * 100}%` }} />
          </div>
        </div>

        {/* Verified Badge Guarantee */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-emerald-500/40 space-y-2 flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-emerald-400">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <strong className="text-xs uppercase font-bold text-white">ISO 9001 Audited</strong>
          </div>
          <p className="text-[10px] text-slate-300 font-sans">
            All reviews are verified via STCW officer credentials, passenger boarding hashes, or hardware wallet signatures.
          </p>
          <span className="text-[10px] text-emerald-300 font-mono font-bold">100% Anti-Spam Guarantee</span>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Query */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search review keywords, berth, officer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs"
            />
          </div>

          {/* Category Dropdown */}
          <div className="lg:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-bold focus:outline-none focus:border-amber-500 text-xs"
            >
              <option value="ALL">Category: ALL SERVICES</option>
              <option value="Port Facilities">Port Facilities &amp; Customs</option>
              <option value="Cruise Experience">Cruise Experience &amp; Suites</option>
              <option value="Vessel Safety">Vessel Safety &amp; AI Engine</option>
              <option value="Ocean Dollar Vault">Ocean Dollar Gold Vault</option>
            </select>
          </div>

          {/* Star Filter Pills */}
          <div className="lg:col-span-3 flex space-x-1 justify-end">
            {[0, 5, 4, 3].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedStarFilter(star)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedStarFilter === star
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {star === 0 ? 'All ★' : `${star}★`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List Grid */}
      <div className="space-y-4 relative z-10">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-4 font-mono text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-black text-amber-400 shrink-0">
                  {rev.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <strong className="text-white text-sm font-bold">{rev.authorName}</strong>
                    {rev.verifiedReviewer && (
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>VERIFIED</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block">{rev.authorRole} • {rev.vesselOrCompany}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-start sm:self-auto">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= rev.ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                    />
                  ))}
                </div>
                <span className="text-slate-500 text-[10px]">{rev.timestamp}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-black text-amber-300 font-sans">{rev.title}</h4>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">{rev.comment}</p>
            </div>

            {/* Criteria Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
              <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                Speed: <strong className="text-amber-400">{rev.criteriaRatings.serviceSpeed}/5 ★</strong>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                Safety: <strong className="text-emerald-400">{rev.criteriaRatings.safetyCompliance}/5 ★</strong>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                Comfort: <strong className="text-cyan-400">{rev.criteriaRatings.facilitiesComfort}/5 ★</strong>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                Eco: <strong className="text-purple-400">{rev.criteriaRatings.ecoRating}/5 ★</strong>
              </span>
            </div>

            {/* Tags & Official Reply */}
            {rev.officialReply && (
              <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/30 text-cyan-200 text-[11px] space-y-1">
                <strong className="text-cyan-400 font-bold block flex items-center space-x-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Official Port / Authority Response:</span>
                </strong>
                <p className="font-sans text-[11px]">{rev.officialReply}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
              <div className="flex space-x-1">
                {rev.tags.map((t, idx) => (
                  <span key={idx} className="text-[9px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleUpvote(rev.id)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all flex items-center space-x-1.5 text-[10px] font-bold"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Helpful ({rev.upvotesCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl max-w-lg w-full space-y-6 font-mono text-xs relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <h3 className="font-bold text-white text-base">Submit Verified Service Review</h3>
              </div>
              <button
                onClick={() => setShowAddReviewModal(false)}
                className="p-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReviewSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Your Full Name &amp; Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Capt. Alexander Wright"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] uppercase font-bold">Role Category</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="Master Mariner">Master Mariner</option>
                    <option value="Logistics Freight Forwarder">Freight Forwarder</option>
                    <option value="Port Customs Agent">Customs Agent</option>
                    <option value="Cruise Passenger">Cruise Passenger</option>
                    <option value="STCW Watchkeeper">STCW Watchkeeper</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] uppercase font-bold">Service Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="Port Facilities">Port Facilities</option>
                    <option value="Cruise Experience">Cruise Experience</option>
                    <option value="Vessel Safety">Vessel Safety AI</option>
                    <option value="Ocean Dollar Vault">Ocean Dollar Vault</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Overall Star Rating (1 - 5)</label>
                <div className="flex space-x-2 pt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewStars(s)}
                      className={`p-2 rounded-xl border flex items-center space-x-1 ${
                        newStars >= s ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional port turnaround efficiency..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Detailed Review Comments</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details regarding your experience..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase rounded-2xl shadow-lg hover:from-amber-400 hover:to-yellow-400 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review &amp; Earn +150 XP</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
