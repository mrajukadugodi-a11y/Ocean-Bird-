import React, { useState } from 'react';
import { MessageSquarePlus, Star, ThumbsUp, Send, CheckCircle2, Filter, UserCheck, ShieldCheck, Sparkles, AlertCircle, MessageCircle, Tag, TrendingUp, Download, Building2, Ship, Award, Trophy, Zap, Clock, ArrowRight, Check, ChevronDown, ChevronUp, Layers, Flame, Bot, Cpu, RefreshCw, Play, CheckCircle } from 'lucide-react';

export type FeedbackStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'IN_BACKLOG' | 'IN_DEVELOPMENT' | 'RELEASED';

export interface StatusHistoryStep {
  status: FeedbackStatus;
  timestamp: string;
  note: string;
}

export interface FeedbackEntry {
  id: string;
  timestamp: string;
  authorName: string;
  role: 'Captain / Master Mariner' | 'Chief Engineer' | 'Logistics Freight Forwarder' | 'Port Customs Agent' | 'STCW Crew Member';
  vesselOrCompany: string;
  category: 'Feature Suggestion' | 'Bug Report' | 'AIS & Navigation' | 'Performance & Latency' | 'General Rating';
  ratingStars: number;
  subject: string;
  message: string;
  status: FeedbackStatus;
  upvotes: number;
  xpEarned: number;
  badgeAwarded?: string;
  managementResponse?: string;
  targetReleaseVersion?: string;
  statusHistory: StatusHistoryStep[];
  aiPriority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  aiAnalysisSummary?: string;
}

export interface UserRewardBadge {
  id: string;
  title: string;
  description: string;
  xpValue: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export const INITIAL_USER_BADGES: UserRewardBadge[] = [
  {
    id: 'stcw-pioneer',
    title: 'STCW Innovator',
    description: 'Submitted 3+ verified bridge feature suggestions',
    xpValue: 150,
    unlocked: true,
    unlockedAt: '2026-08-01'
  },
  {
    id: 'master-contributor',
    title: 'Master Contributor',
    description: 'Earned 50+ upvotes from maritime community',
    xpValue: 300,
    unlocked: true,
    unlockedAt: '2026-08-03'
  },
  {
    id: 'safety-sentinel',
    title: 'Safety Sentinel',
    description: 'Reported verified navigation/weather telemetry report',
    xpValue: 200,
    unlocked: true,
    unlockedAt: '2026-08-04'
  },
  {
    id: 'voice-champion',
    title: 'Voice Command Champion',
    description: 'Tested and reviewed hands-free audio bridge shortcuts',
    xpValue: 100,
    unlocked: false
  }
];

export const STATUS_LIFECYCLE: { key: FeedbackStatus; label: string; stepNumber: number; color: string }[] = [
  { key: 'SUBMITTED', label: '1. Submitted', stepNumber: 1, color: 'text-slate-400 bg-slate-800 border-slate-700' },
  { key: 'UNDER_REVIEW', label: '2. Under Review', stepNumber: 2, color: 'text-amber-300 bg-amber-500/20 border-amber-500/40' },
  { key: 'IN_BACKLOG', label: '3. Roadmap Backlog', stepNumber: 3, color: 'text-purple-300 bg-purple-500/20 border-purple-500/40' },
  { key: 'IN_DEVELOPMENT', label: '4. Active Engineering', stepNumber: 4, color: 'text-cyan-300 bg-cyan-500/20 border-cyan-500/40' },
  { key: 'RELEASED', label: '5. Production Released', stepNumber: 5, color: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40' }
];

export const INITIAL_FEEDBACK_ENTRIES: FeedbackEntry[] = [
  {
    id: 'FBD-2026-0801',
    timestamp: '2026-08-04 06:15 UTC',
    authorName: 'Capt. R. K. Sharma',
    role: 'Captain / Master Mariner',
    vesselOrCompany: 'M/V Desh Shanti (Shipping Corp of India)',
    category: 'AIS & Navigation',
    ratingStars: 5,
    subject: 'Offline S-57 Nautical Vector Chart Caching is exceptional',
    message: 'The ability to download vector bathymetry charts for the Malacca Strait prior to entering low-connectivity zones saved our bridge team significant time.',
    status: 'RELEASED',
    upvotes: 42,
    xpEarned: 250,
    badgeAwarded: 'STCW Innovator',
    targetReleaseVersion: 'v2.4.0-Live',
    aiPriority: 'HIGH',
    aiAnalysisSummary: 'S-57 vector tile cache validated for SOLAS/ECDIS offline compliance.',
    managementResponse: 'Thank you Captain. We have deployed S-57 vector tile caching globally across all 8 South Asian maritime zones.',
    statusHistory: [
      { status: 'SUBMITTED', timestamp: '2026-08-01 08:00 UTC', note: 'Feedback logged via satellite bridge terminal.' },
      { status: 'UNDER_REVIEW', timestamp: '2026-08-01 14:20 UTC', note: 'Approved by Chief Navigation Architect.' },
      { status: 'IN_BACKLOG', timestamp: '2026-08-02 09:10 UTC', note: 'Prioritized for S-57 tile engine overhaul.' },
      { status: 'IN_DEVELOPMENT', timestamp: '2026-08-03 11:00 UTC', note: 'Implemented offline IndexedDB vector cache.' },
      { status: 'RELEASED', timestamp: '2026-08-04 06:15 UTC', note: 'Deployed in Ocean Bird Release v2.4.0.' }
    ]
  },
  {
    id: 'FBD-2026-0802',
    timestamp: '2026-08-03 19:40 UTC',
    authorName: 'Eng. Sarah Al-Mansoor',
    role: 'Chief Engineer',
    vesselOrCompany: 'Fujairah Bunkering Services',
    category: 'Feature Suggestion',
    ratingStars: 4,
    subject: 'Add viscosity temperature correction curves for Bio-Fuel blends',
    message: 'Would love to see automatic kinematic viscosity curves when blending 30% FAME biodiesel with VLSFO in the Smart Fuel Optimizer tab.',
    status: 'IN_DEVELOPMENT',
    upvotes: 28,
    xpEarned: 150,
    targetReleaseVersion: 'v2.5.0-Q4',
    aiPriority: 'CRITICAL',
    aiAnalysisSummary: 'ISO 8217:2024 compliance requires ASTM D445 viscosity formulas in Smart Fuel module.',
    managementResponse: 'In engineering build! Bio-fuel blending specs (ISO 8217:2024) algorithms are currently in testing.',
    statusHistory: [
      { status: 'SUBMITTED', timestamp: '2026-08-03 19:40 UTC', note: 'Suggestion submitted with fuel density charts.' },
      { status: 'UNDER_REVIEW', timestamp: '2026-08-04 02:15 UTC', note: 'Validated by Fuel & Bunkering Engineering Unit.' },
      { status: 'IN_BACKLOG', timestamp: '2026-08-04 05:00 UTC', note: 'Added to Q4 Carbon & Fuel Optimization Sprint.' },
      { status: 'IN_DEVELOPMENT', timestamp: '2026-08-04 07:30 UTC', note: 'Engineering team drafting ASTM D445 viscosity formulas.' }
    ]
  },
  {
    id: 'FBD-2026-0803',
    timestamp: '2026-08-03 11:20 UTC',
    authorName: 'Vikram Mehta',
    role: 'Logistics Freight Forwarder',
    vesselOrCompany: 'JNPT Port Container Clearance Hub',
    category: 'Performance & Latency',
    ratingStars: 5,
    subject: 'Voice activated bridge command response time is instantaneous',
    message: 'Hands-free voice recognition worked effortlessly even with engine room background noise. Extremely helpful for high-stress port entries.',
    status: 'RELEASED',
    upvotes: 35,
    xpEarned: 100,
    badgeAwarded: 'Master Contributor',
    targetReleaseVersion: 'v2.3.8-Live',
    aiPriority: 'MEDIUM',
    aiAnalysisSummary: 'Voice engine benchmarked at <180ms latency in noisy bridge environments.',
    managementResponse: 'Voice model fine-tuning with Web Speech API noise filtering was completed in release v2.3.8.',
    statusHistory: [
      { status: 'SUBMITTED', timestamp: '2026-08-03 11:20 UTC', note: 'Performance feedback logged.' },
      { status: 'UNDER_REVIEW', timestamp: '2026-08-03 12:00 UTC', note: 'Reviewed by STCW Speech Engineering.' },
      { status: 'RELEASED', timestamp: '2026-08-03 15:30 UTC', note: 'Marked resolved as existing feature.' }
    ]
  }
];

export const UserFeedbackPortalView: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>(INITIAL_FEEDBACK_ENTRIES);
  const [badges, setBadges] = useState<UserRewardBadge[]>(INITIAL_USER_BADGES);
  const [userXp, setUserXp] = useState<number>(650);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [expandedTrackerId, setExpandedTrackerId] = useState<string | null>('FBD-2026-0801');
  const [selectedBadgeDetail, setSelectedBadgeDetail] = useState<UserRewardBadge | null>(null);

  // AI Automation States
  const [autoPilotEnabled, setAutoPilotEnabled] = useState<boolean>(true);
  const [isAiTriaging, setIsAiTriaging] = useState<boolean>(false);
  const [aiTriageLogs, setAiTriageLogs] = useState<string | null>(null);
  const [aiAssistantPreview, setAiAssistantPreview] = useState<{
    category: string;
    priority: string;
    advice: string;
  } | null>(null);

  // Manual Status Override Handler
  const handleManualStatusChange = (ticketId: string, newStatus: FeedbackStatus) => {
    const timestampNow = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
    setFeedbackList((prev) =>
      prev.map((item) => {
        if (item.id === ticketId) {
          return {
            ...item,
            status: newStatus,
            statusHistory: [
              ...item.statusHistory,
              {
                status: newStatus,
                timestamp: timestampNow,
                note: `Manual Officer Override: Changed status to ${newStatus}.`
              }
            ]
          };
        }
        return item;
      })
    );
  };

  // New feedback form state
  const [authorName, setAuthorName] = useState<string>('');
  const [role, setRole] = useState<FeedbackEntry['role']>('Captain / Master Mariner');
  const [vesselOrCompany, setVesselOrCompany] = useState<string>('');
  const [category, setCategory] = useState<FeedbackEntry['category']>('Feature Suggestion');
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  // Real-time AI typing assist preview
  const handleMessageChange = (text: string) => {
    setMessage(text);
    if (text.length > 15 && autoPilotEnabled) {
      const isBug = text.toLowerCase().includes('bug') || text.toLowerCase().includes('error') || text.toLowerCase().includes('fail');
      const isFuel = text.toLowerCase().includes('fuel') || text.toLowerCase().includes('bunker') || text.toLowerCase().includes('engine');
      const isNav = text.toLowerCase().includes('chart') || text.toLowerCase().includes('ais') || text.toLowerCase().includes('radar') || text.toLowerCase().includes('route');

      setAiAssistantPreview({
        category: isBug ? 'Bug Report' : isFuel ? 'Bunkering & Fuel' : isNav ? 'AIS & Navigation' : 'Feature Suggestion',
        priority: isBug ? 'HIGH' : 'MEDIUM',
        advice: 'AI Agent will automatically analyze this ticket upon submission, generate an official engineering response, and assign +50 XP.'
      });
    } else {
      setAiAssistantPreview(null);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !subject || !message) return;

    setIsAiTriaging(true);
    const ticketId = `FBD-${Date.now().toString().slice(-6)}`;
    const timestampNow = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';

    let initialCategory = category;
    let initialStatus: FeedbackStatus = 'UNDER_REVIEW';
    let initialResponse = 'Thank you for your feedback. Our AI agent has queued this ticket for maritime engineering review.';
    let initialTarget = 'v2.5.0-Roadmap';
    let earnedXp = 50;
    let badgeEarned: string | undefined = undefined;
    let aiPriorityVal: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'HIGH';
    let aiSummary = 'Auto-triaged by Ocean Bird AI Automation Engine.';

    // Call server-side Gemini AI Auto-Triage Endpoint if available
    try {
      const res = await fetch('/api/gemini/auto-triage-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message, authorName, role, vesselOrCompany, ratingStars })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.triageResult) {
          const tr = data.triageResult;
          if (tr.category) initialCategory = tr.category as any;
          if (tr.assignedStatus) initialStatus = tr.assignedStatus as any;
          if (tr.managementResponse) initialResponse = tr.managementResponse;
          if (tr.targetReleaseVersion) initialTarget = tr.targetReleaseVersion;
          if (tr.xpReward) earnedXp = tr.xpReward;
          if (tr.badgeAwarded) badgeEarned = tr.badgeAwarded;
          if (tr.priority) aiPriorityVal = tr.priority as any;
          if (tr.aiAnalysisSummary) aiSummary = tr.aiAnalysisSummary;
        }
      }
    } catch (err) {
      console.warn('AI triage fallback active:', err);
    }

    const newEntry: FeedbackEntry = {
      id: ticketId,
      timestamp: timestampNow,
      authorName,
      role,
      vesselOrCompany: vesselOrCompany || 'Independent Maritime Officer',
      category: initialCategory,
      ratingStars,
      subject,
      message,
      status: initialStatus,
      upvotes: 1,
      xpEarned: earnedXp,
      badgeAwarded: badgeEarned,
      managementResponse: initialResponse,
      targetReleaseVersion: initialTarget,
      aiPriority: aiPriorityVal,
      aiAnalysisSummary: aiSummary,
      statusHistory: [
        { status: 'SUBMITTED', timestamp: timestampNow, note: 'Ticket logged and registered.' },
        { status: initialStatus, timestamp: timestampNow, note: `AI Automation Agent auto-triaged ticket as [${initialCategory}] with ${aiPriorityVal} priority.` }
      ]
    };

    setFeedbackList([newEntry, ...feedbackList]);
    setSubmittedTicketId(ticketId);
    setUserXp((prev) => prev + earnedXp);
    setExpandedTrackerId(ticketId);
    setIsAiTriaging(false);

    // Reset form
    setAuthorName('');
    setVesselOrCompany('');
    setSubject('');
    setMessage('');
    setAiAssistantPreview(null);
  };

  // AI Lifecycle Progress Automation Trigger
  const handleAiAdvanceLifecycle = async (fb: FeedbackEntry) => {
    setIsAiTriaging(true);
    const timestampNow = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';

    try {
      const res = await fetch('/api/gemini/auto-progress-lifecycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: fb.id,
          currentStatus: fb.status,
          subject: fb.subject,
          message: fb.message
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.lifecycleProgress) {
          const lp = data.lifecycleProgress;
          const nextStatus = lp.nextStatus as FeedbackStatus;

          setFeedbackList((prev) =>
            prev.map((item) => {
              if (item.id === fb.id) {
                const updatedHistory = [
                  ...item.statusHistory,
                  { status: nextStatus, timestamp: timestampNow, note: lp.stepNote || `AI Agent advanced lifecycle to ${nextStatus}.` }
                ];
                return {
                  ...item,
                  status: nextStatus,
                  managementResponse: lp.managementUpdate || item.managementResponse,
                  targetReleaseVersion: lp.targetReleaseVersion || item.targetReleaseVersion,
                  statusHistory: updatedHistory
                };
              }
              return item;
            })
          );
        }
      }
    } catch (err) {
      console.error('Lifecycle advance error:', err);
    } finally {
      setIsAiTriaging(false);
    }
  };

  // Bulk AI Auto-Triage All Unresolved Tickets
  const handleBulkAiTriage = async () => {
    setIsAiTriaging(true);
    setAiTriageLogs('Initiating full AI automation scan across all maritime feedback tickets...');

    setTimeout(() => {
      setFeedbackList((prev) =>
        prev.map((item) => {
          if (item.status === 'SUBMITTED') {
            return {
              ...item,
              status: 'UNDER_REVIEW',
              managementResponse: `AI Agent verified ticket ${item.id}. Assigned to Q4 maritime navigation engineering sprint.`,
              targetReleaseVersion: 'v2.5.0-Roadmap',
              aiPriority: 'HIGH',
              statusHistory: [
                ...item.statusHistory,
                { status: 'UNDER_REVIEW', timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC', note: 'AI Bulk Automation Agent assigned to review queue.' }
              ]
            };
          }
          return item;
        })
      );
      setAiTriageLogs('Full AI Automation Sweep Completed! All feedback tickets triaged and roadmap versions assigned.');
      setIsAiTriaging(false);
    }, 1200);
  };

  const handleUpvote = (id: string) => {
    setFeedbackList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item))
    );
    setUserXp((prev) => prev + 10);
  };

  const userLevel = Math.floor(userXp / 200) + 1;
  const xpInCurrentLevel = userXp % 200;

  const filteredFeedback = feedbackList.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div id="user-feedback-portal-view" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>FULL AI AUTOMATED SEAFARER FEEDBACK & ENGINEERING ROADMAP PORTAL</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <MessageSquarePlus className="w-6 h-6 text-amber-400" />
            <span>User Feedback & AI Automated Feature Portal</span>
          </h2>
          <p className="text-xs text-slate-400">
            Submit feature ideas with full AI auto-triage, track real-time engineering lifecycle status, rate maritime modules, and earn contributor badges.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-xs">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-bold">COMMUNITY RATING</span>
            <strong className="text-amber-400 text-sm flex items-center space-x-1">
              <span>4.9 / 5.0</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </strong>
          </div>
        </div>
      </div>

      {/* FULL AI AUTOMATION CONTROL BAR */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-950 to-cyan-500/10 border border-amber-500/40 rounded-2xl p-4 font-mono text-xs space-y-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold text-white">GEMINI AI AUTOMATION ENGINE</span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>24/7 AUTO-PILOT ONLINE</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Automatic feedback classification, sentiment score, AI management replies & roadmap lifecycle progression.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setAutoPilotEnabled(!autoPilotEnabled)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                autoPilotEnabled
                  ? 'bg-amber-500 text-slate-950 border border-amber-400 shadow-md'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>AI AUTO-PILOT: {autoPilotEnabled ? 'ENABLED' : 'MANUAL'}</span>
            </button>

            <button
              onClick={handleBulkAiTriage}
              disabled={isAiTriaging}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold flex items-center space-x-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAiTriaging ? 'animate-spin' : ''}`} />
              <span>AI BULK TRIAGE ALL</span>
            </button>
          </div>
        </div>

        {aiTriageLogs && (
          <div className="p-2.5 bg-slate-950 border border-amber-500/30 rounded-xl text-amber-300 text-[11px] flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{aiTriageLogs}</span>
            </span>
            <button onClick={() => setAiTriageLogs(null)} className="text-[10px] text-slate-400 hover:text-white">DISMISS</button>
          </div>
        )}
      </div>

      {/* Gamification Rewards Banner & Level XP Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-4 font-mono text-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-bold uppercase">
                  LEVEL {userLevel} CONTRIBUTOR
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{userXp} TOTAL XP</span>
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-1">Captain & Officer Innovation Rewards</h3>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center space-x-4 shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">LEVEL {userLevel} PROGRESS</span>
              <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all"
                  style={{ width: `${(xpInCurrentLevel / 200) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-xs font-extrabold text-amber-300">{xpInCurrentLevel} / 200 XP</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-800/80">
          {badges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => setSelectedBadgeDetail(badge)}
              className={`p-2.5 rounded-xl border flex items-center space-x-2 text-left transition-all hover:scale-[1.02] cursor-pointer ${
                badge.unlocked
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60 hover:opacity-80'
              }`}
            >
              <Award className={`w-5 h-5 shrink-0 ${badge.unlocked ? 'text-amber-400' : 'text-slate-600'}`} />
              <div className="overflow-hidden">
                <strong className="text-xs font-bold block truncate">{badge.title}</strong>
                <span className="text-[9px] block text-slate-400 truncate">
                  {badge.unlocked ? `Unlocked • +${badge.xpValue} XP` : `Locked • +${badge.xpValue} XP`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadgeDetail && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 font-mono text-xs shadow-2xl relative animate-fade-in">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">{selectedBadgeDetail.title}</h3>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">
                    {selectedBadgeDetail.unlocked ? '✅ BADGE UNLOCKED' : '🔒 BADGE LOCKED'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedBadgeDetail(null)}
                className="text-slate-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">{selectedBadgeDetail.description}</p>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">XP Reward Value:</span>
                <span className="text-amber-300 font-bold">+{selectedBadgeDetail.xpValue} XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Unlock Requirement:</span>
                <span className="text-slate-200 font-semibold">Active Maritime Contributor</span>
              </div>
              {selectedBadgeDetail.unlockedAt && (
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5 mt-1.5">
                  <span className="text-slate-400">Unlocked On:</span>
                  <span className="text-emerald-400 font-mono">{selectedBadgeDetail.unlockedAt}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedBadgeDetail(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            >
              CLOSE BADGE DETAILS
            </button>
          </div>
        </div>
      )}

      {submittedTicketId && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-mono font-bold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>AI AUTO-TRIAGED! Feedback Ticket {submittedTicketId} submitted directly to Ocean Bird Platform Management.</span>
          </div>
          <button
            onClick={() => setSubmittedTicketId(null)}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Main Grid: Form on Left, Submissions Feed on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Submission Form with AI Co-Pilot */}
        <form onSubmit={handleSubmitFeedback} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs lg:col-span-1">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
              <Send className="w-4 h-4 text-amber-400" />
              <span>Submit Feedback or Suggestion</span>
            </h3>
            {autoPilotEnabled && (
              <span className="text-[10px] text-amber-400 font-bold flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>AI Auto-Triage Active</span>
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Your Name / Rank:</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Capt. Arjun Nair"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Maritime Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="Captain / Master Mariner">Captain / Master Mariner</option>
                <option value="Chief Engineer">Chief Engineer</option>
                <option value="Logistics Freight Forwarder">Logistics Freight Forwarder</option>
                <option value="Port Customs Agent">Port Customs Agent</option>
                <option value="STCW Crew Member">STCW Crew Member</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Vessel or Organization:</label>
              <input
                type="text"
                value={vesselOrCompany}
                onChange={(e) => setVesselOrCompany(e.target.value)}
                placeholder="e.g. MV Cordelia Empress / JNPT"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Feature Suggestion">Feature Suggestion</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="AIS & Navigation">AIS & Navigation</option>
                  <option value="Performance & Latency">Performance & Latency</option>
                  <option value="General Rating">General Rating</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Platform Rating:</label>
                <div className="flex items-center space-x-1 py-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingStars(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Subject Title:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of feedback..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Detailed Description:</label>
              <textarea
                value={message}
                onChange={(e) => handleMessageChange(e.target.value)}
                rows={4}
                placeholder="Explain the suggestion, issue, or performance experience in detail..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                required
              />
            </div>

            {/* AI Assistant Real-Time Preview */}
            {aiAssistantPreview && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1 font-mono text-[11px] animate-fade-in">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>AI AUTO-ASSIST PREVIEW</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    PRIORITY: {aiAssistantPreview.priority}
                  </span>
                </div>
                <p className="text-slate-300">{aiAssistantPreview.advice}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isAiTriaging}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-[1.01]"
          >
            {isAiTriaging ? (
              <>
                <RefreshCw className="w-4 h-4 text-slate-950 animate-spin" />
                <span>GEMINI AI TRIAGING...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-slate-950" />
                <span>SUBMIT FEEDBACK (+50 XP)</span>
              </>
            )}
          </button>
        </form>

        {/* Feedback History & Suggestions Directory */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-amber-400" />
              <span>Seafarer & Agent Suggestions Feed ({filteredFeedback.length})</span>
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'SUBMITTED', 'UNDER_REVIEW', 'IN_DEVELOPMENT', 'RELEASED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    selectedStatus === st
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Cards List */}
          <div className="space-y-4">
            {filteredFeedback.map((fb) => {
              const isExpanded = expandedTrackerId === fb.id;
              const currentStepObj = STATUS_LIFECYCLE.find((s) => s.key === fb.status) || STATUS_LIFECYCLE[0];

              return (
                <div key={fb.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <strong className="text-white text-xs font-bold">{fb.authorName}</strong>
                        {fb.aiPriority && (
                          <span className={`px-1.5 py-0.2 rounded text-[8px] font-black uppercase ${
                            fb.aiPriority === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                            fb.aiPriority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            AI PRIORITY: {fb.aiPriority}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block">{fb.role} • {fb.vesselOrCompany}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= fb.ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Status Indicator & Manual Override */}
                      {!autoPilotEnabled ? (
                        <select
                          value={fb.status}
                          onChange={(e) => handleManualStatusChange(fb.id, e.target.value as FeedbackStatus)}
                          className="bg-slate-950 text-amber-300 border border-amber-500/40 text-[9px] font-bold rounded px-1.5 py-0.5 focus:outline-none cursor-pointer"
                        >
                          <option value="SUBMITTED">1. SUBMITTED</option>
                          <option value="UNDER_REVIEW">2. UNDER_REVIEW</option>
                          <option value="IN_BACKLOG">3. IN_BACKLOG</option>
                          <option value="IN_DEVELOPMENT">4. IN_DEVELOPMENT</option>
                          <option value="RELEASED">5. RELEASED</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${currentStepObj.color}`}>
                          {fb.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-xs">{fb.subject}</h4>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">{fb.message}</p>
                    {fb.aiAnalysisSummary && (
                      <p className="text-[10px] text-amber-400/90 mt-1 italic font-mono flex items-center space-x-1">
                        <Bot className="w-3 h-3 text-amber-400 inline shrink-0" />
                        <span>AI Analysis: {fb.aiAnalysisSummary}</span>
                      </p>
                    )}
                  </div>

                  {/* Status Lifecycle Progress Stepper */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>ENGINEERING ROADMAP STATUS LIFECYCLE</span>
                      </span>
                      <div className="flex items-center space-x-2">
                        {fb.targetReleaseVersion && (
                          <span className="text-cyan-400 font-mono">Target: {fb.targetReleaseVersion}</span>
                        )}
                        {fb.status !== 'RELEASED' && (
                          <button
                            onClick={() => handleAiAdvanceLifecycle(fb)}
                            disabled={isAiTriaging}
                            className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[9px] font-bold flex items-center space-x-1 transition-all"
                          >
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>AI ADVANCE STEP</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-1 pt-1">
                      {STATUS_LIFECYCLE.map((step) => {
                        const isDone = step.stepNumber <= currentStepObj.stepNumber;
                        const isCurrent = step.key === fb.status;

                        return (
                          <div key={step.key} className="flex flex-col items-center space-y-1 text-center">
                            <div
                              className={`w-full h-1.5 rounded-full ${
                                isCurrent
                                  ? 'bg-amber-400 animate-pulse ring-2 ring-amber-400/50'
                                  : isDone
                                  ? 'bg-emerald-500'
                                  : 'bg-slate-800'
                              }`}
                            />
                            <span className={`text-[9px] font-bold ${isCurrent ? 'text-amber-300' : isDone ? 'text-emerald-400' : 'text-slate-600'}`}>
                              {step.label.split(' ')[1]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Toggle Detailed Audit History */}
                  <div className="pt-1">
                    <button
                      onClick={() => setExpandedTrackerId(isExpanded ? null : fb.id)}
                      className="text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
                    >
                      <span>{isExpanded ? 'HIDE DETAILED STATUS TIMELINE' : 'VIEW DETAILED STATUS TIMELINE & AUDIT LOGS'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-[11px]">
                        <span className="text-xs font-bold text-slate-300 block border-b border-slate-800 pb-1">
                          Lifecycle Status Audit Timeline ({fb.statusHistory.length} Steps)
                        </span>
                        <div className="space-y-2 pt-1">
                          {fb.statusHistory.map((history, hIdx) => (
                            <div key={hIdx} className="flex items-start space-x-2 text-slate-300">
                              <div className="mt-1 w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                              <div className="space-y-0.5">
                                <div className="flex items-center space-x-2">
                                  <strong className="text-white text-xs">{history.status}</strong>
                                  <span className="text-[10px] text-slate-500">{history.timestamp}</span>
                                </div>
                                <p className="text-[10px] text-slate-400">{history.note}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {fb.managementResponse && (
                          <div className="mt-3 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-1">
                            <span className="text-amber-300 font-bold text-[10px] flex items-center space-x-1">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>MANAGEMENT RESPONSE NOTE:</span>
                            </span>
                            <p className="text-slate-300 text-[11px] italic">{fb.managementResponse}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                    <span>{fb.timestamp} • Ticket {fb.id} • +{fb.xpEarned} XP</span>

                    <button
                      onClick={() => handleUpvote(fb.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold flex items-center space-x-1 transition-all"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>UPVOTE ({fb.upvotes}) (+10 XP)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

