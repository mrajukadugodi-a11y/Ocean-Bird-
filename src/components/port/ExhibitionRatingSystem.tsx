import React, { useState } from 'react';
import {
  Star,
  Award,
  ThumbsUp,
  MessageSquare,
  Plus,
  Filter,
  CheckCircle2,
  Calendar,
  Sparkles,
  Building2,
  Tag,
  UserCheck
} from 'lucide-react';
import { hapticEngine } from '../../utils/hapticUtils';

export interface ExpoReview {
  id: string;
  expoId: string;
  expoTitle: string;
  reviewerName: string;
  reviewerRole: string;
  rating: number; // 1 to 5
  tags: string[];
  comment: string;
  date: string;
  upvotes: number;
}

const INITIAL_REVIEWS: ExpoReview[] = [
  {
    id: 'REV-01',
    expoId: 'EXPO-01',
    expoTitle: 'South Asia Ocean Technology & Green Shipbuilding Expo 2026',
    reviewerName: 'Commander Vikram Mehta',
    reviewerRole: 'Chief Naval Architect, Mazagon Dock',
    rating: 5,
    tags: ['Electric Propulsion Demos', 'Great Acoustics', '50+ Key Vendors'],
    comment: 'Exceptional showcase of zero-emission LNG tugboats and autonomous hydrofoil drones. The live vessel demonstrations at Pier 2 were world class!',
    date: 'Aug 25, 2026',
    upvotes: 42
  },
  {
    id: 'REV-02',
    expoId: 'EXPO-01',
    expoTitle: 'South Asia Ocean Technology & Green Shipbuilding Expo 2026',
    reviewerName: 'Elena Rostova',
    reviewerRole: 'Logistics Director, Baltic Ocean Freight',
    rating: 4,
    tags: ['AI Port Drones', 'Good Networking', 'Easy Registration'],
    comment: 'Very impressed with the maritime AI navigation systems. Fast-track entry pass via QR code worked smoothly at Hall 1.',
    date: 'Aug 24, 2026',
    upvotes: 28
  },
  {
    id: 'REV-03',
    expoId: 'EXPO-02',
    expoTitle: 'Global Marine Science, Reef Preservation & Eco Expo',
    reviewerName: 'Dr. Aarav Nambiar',
    reviewerRole: 'Senior Marine Biologist, NIO Goa',
    rating: 5,
    tags: ['3D VR Reef Walkthrough', 'Kid-Friendly', 'Coral Restoration'],
    comment: 'The 3D immersive underwater VR experience in Hall 2 gave an astounding view of coral reef restoration technology. Must-visit for ocean scientists and families!',
    date: 'Aug 23, 2026',
    upvotes: 35
  },
  {
    id: 'REV-04',
    expoId: 'EXPO-03',
    expoTitle: 'International Seafarers & Maritime Career Convention',
    reviewerName: 'Karan Sharma',
    reviewerRole: 'Third Officer Cadet',
    rating: 5,
    tags: ['Bridge Simulator', 'On-site STCW Guidance', 'Direct Hiring'],
    comment: 'Landed 2 job interviews directly at the convention hall! The bridge navigation simulator challenge was incredibly realistic.',
    date: 'Aug 20, 2026',
    upvotes: 51
  }
];

interface ExhibitionRatingSystemProps {
  triggerToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
}

export const ExhibitionRatingSystem: React.FC<ExhibitionRatingSystemProps> = ({ triggerToast }) => {
  const [reviews, setReviews] = useState<ExpoReview[]>(INITIAL_REVIEWS);
  const [filterExpo, setFilterExpo] = useState<string>('ALL');
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New review form state
  const [formExpoTitle, setFormExpoTitle] = useState('South Asia Ocean Technology & Green Shipbuilding Expo 2026');
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Maritime Industry Visitor');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [formTagInput, setFormTagInput] = useState('');
  const [formTags, setFormTags] = useState<string[]>(['Interactive Booths', 'High Tech']);

  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    if (triggerToast) {
      triggerToast(msg, type, title);
    } else {
      console.log(`[${type}] ${title}: ${msg}`);
    }
  };

  const handleAddTag = () => {
    if (formTagInput.trim() && !formTags.includes(formTagInput.trim())) {
      setFormTags([...formTags, formTagInput.trim()]);
      setFormTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormTags(formTags.filter((t) => t !== tag));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      notify('Please enter your name and review comment.', 'warning', 'MISSING INFO');
      return;
    }

    const newRev: ExpoReview = {
      id: `REV-${Date.now()}`,
      expoId: formExpoTitle.includes('Green Shipbuilding') ? 'EXPO-01' : 'EXPO-02',
      expoTitle: formExpoTitle,
      reviewerName: formName,
      reviewerRole: formRole,
      rating: formRating,
      tags: formTags.length ? formTags : ['Verified Attendee'],
      comment: formComment,
      date: 'Just Now',
      upvotes: 1
    };

    setReviews([newRev, ...reviews]);
    setShowReviewModal(false);
    setFormName('');
    setFormComment('');
    hapticEngine.trigger('success');
    notify('Thank you! Your exhibition review has been published.', 'success', 'REVIEW SUBMITTED');
  };

  const handleUpvote = (id: string) => {
    setReviews(
      reviews.map((rev) => (rev.id === id ? { ...rev, upvotes: rev.upvotes + 1 } : rev))
    );
    hapticEngine.trigger('click');
    notify('Upvoted review as helpful!', 'info', 'UPVOTED');
  };

  const filteredReviews =
    filterExpo === 'ALL'
      ? reviews
      : reviews.filter((r) => r.expoTitle.toLowerCase().includes(filterExpo.toLowerCase()));

  // Stats
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              <h2 className="text-xl font-bold text-white">Maritime Trade Expo Ratings &amp; Attendee Reviews</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Verified feedback, delegate ratings, keynote acoustics ratings, and booth exhibit highlights.
            </p>
          </div>

          <button
            onClick={() => {
              setShowReviewModal(true);
              hapticEngine.trigger('click');
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs font-mono transition-all shadow-lg hover:brightness-110 flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Exhibition Review</span>
          </button>
        </div>

        {/* Aggregate Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 items-center">
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-2 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0">
            <span className="text-5xl font-black text-white font-mono">{avgRating}</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(Number(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">Based on {reviews.length} Verified Reviews</span>
          </div>

          <div className="md:col-span-8 space-y-2 text-xs font-mono">
            {[5, 4, 3, 2, 1].map((ratingVal) => {
              const count = reviews.filter((r) => r.rating === ratingVal).length;
              const pct = Math.round((count / reviews.length) * 100) || 0;
              return (
                <div key={ratingVal} className="flex items-center space-x-3">
                  <span className="w-12 text-slate-400 font-bold flex items-center space-x-1">
                    <span>{ratingVal}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  </span>
                  <div className="flex-1 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-slate-400">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-slate-400 font-bold">Filter Expo:</span>
            <select
              value={filterExpo}
              onChange={(e) => setFilterExpo(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs font-mono rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Trade Expos ({reviews.length})</option>
              <option value="Green Shipbuilding">South Asia Ocean Technology Expo</option>
              <option value="Marine Science">Global Marine Science &amp; Reef Expo</option>
              <option value="Seafarers">Seafarers &amp; Maritime Career Convention</option>
            </select>
          </div>

          <span className="text-xs font-mono text-slate-500">Showing {filteredReviews.length} reviews</span>
        </div>

        {/* Review Cards Grid */}
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>{rev.reviewerName}</span>
                    <span className="text-xs font-normal text-slate-400">({rev.reviewerRole})</span>
                  </h4>
                  <p className="text-[11px] font-mono text-cyan-400">{rev.expoTitle}</p>
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
                  {rev.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono text-amber-300 border border-amber-500/20"
                    >
                      #{tag}
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

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="text-base font-bold text-white">Rate Exhibition &amp; Delegate Experience</h3>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Select Exhibition Event</label>
                <select
                  value={formExpoTitle}
                  onChange={(e) => setFormExpoTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                >
                  <option value="South Asia Ocean Technology & Green Shipbuilding Expo 2026">
                    South Asia Ocean Technology &amp; Green Shipbuilding Expo 2026
                  </option>
                  <option value="Global Marine Science, Reef Preservation & Eco Expo">
                    Global Marine Science, Reef Preservation &amp; Eco Expo
                  </option>
                  <option value="International Seafarers & Maritime Career Convention">
                    International Seafarers &amp; Maritime Career Convention
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold block">Your Full Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Commander Vikram Mehta"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 font-bold block">Industry Role / Organization</label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Naval Architect, Shipping Manager"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Overall Rating (1 - 5 Stars)</label>
                <div className="flex space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800 justify-center">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setFormRating(starVal)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          starVal <= formRating ? 'text-amber-400 fill-amber-400' : 'text-slate-800'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Review Comments &amp; Highlights</label>
                <textarea
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Share details regarding keynote presentations, booth exhibits, acoustics, or fast-track entry..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">Highlight Tags</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formTagInput}
                    onChange={(e) => setFormTagInput(e.target.value)}
                    placeholder="e.g. Electric Boats, Clear Sound"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white rounded-xl"
                  >
                    Add Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formTags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-slate-950 text-[10px] font-mono text-amber-300 border border-amber-500/30 flex items-center space-x-1"
                    >
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-slate-500 hover:text-rose-400 ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black font-mono text-xs shadow-lg transition-all"
              >
                Publish Exhibition Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
